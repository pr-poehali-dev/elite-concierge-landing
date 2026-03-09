"""Модуль аутентификации для клуба NOIR.

Обрабатывает регистрацию, вход, выход и получение данных текущего пользователя.
Использует PostgreSQL для хранения пользователей, инвайт-кодов и сессий.
"""

import hashlib
import json
import os
import re
import uuid
from datetime import datetime, timedelta, timezone

import psycopg2
import psycopg2.extras

SCHEMA = "t_p2841448_elite_concierge_land"

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Authorization",
    "Content-Type": "application/json",
}


def get_connection():
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    conn.autocommit = True
    return conn


def response(status_code: int, body: dict) -> dict:
    return {
        "statusCode": status_code,
        "headers": CORS_HEADERS,
        "body": json.dumps(body),
    }


def hash_password(password: str) -> str:
    salt = os.urandom(32)
    dk = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 600000)
    return f"pbkdf2:sha256:600000${salt.hex()}${dk.hex()}"


def verify_password(password: str, stored_hash: str) -> bool:
    try:
        parts = stored_hash.split("$")
        if len(parts) != 3:
            return False
        salt = bytes.fromhex(parts[1])
        expected_hash = parts[2]
        dk = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 600000)
        return dk.hex() == expected_hash
    except Exception:
        return False


def extract_token(headers: dict) -> str | None:
    auth = headers.get("x-authorization", "")
    if auth.startswith("Bearer "):
        return auth[7:]
    return None


def user_dict(row: dict) -> dict:
    return {
        "id": str(row["id"]),
        "email": row["email"],
        "role": row["role"],
        "first_name": row["first_name"],
        "last_name": row["last_name"],
        "tier": row["tier"],
        "status": row["status"],
        "avatar_url": row["avatar_url"],
    }


def create_session(conn, user_id: str) -> str:
    token = str(uuid.uuid4())
    expires_at = datetime.now(timezone.utc) + timedelta(days=30)
    with conn.cursor() as cur:
        cur.execute(
            f"INSERT INTO {SCHEMA}.sessions (user_id, token, expires_at) "
            f"VALUES (%s, %s, %s)",
            (user_id, token, expires_at),
        )
    return token


def handle_register(body_str: str) -> dict:
    try:
        data = json.loads(body_str or "{}")
    except json.JSONDecodeError:
        return response(400, {"error": "Некорректный JSON"})

    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    first_name = (data.get("first_name") or "").strip()
    last_name = (data.get("last_name") or "").strip()
    invite_code = (data.get("invite_code") or "").strip()

    if not email or not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email):
        return response(400, {"error": "Некорректный email"})
    if len(password) < 8:
        return response(400, {"error": "Пароль должен быть не менее 8 символов"})
    if not first_name:
        return response(400, {"error": "Имя обязательно"})
    if not last_name:
        return response(400, {"error": "Фамилия обязательна"})
    if not invite_code:
        return response(400, {"error": "Инвайт-код обязателен"})

    conn = get_connection()
    try:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(
                f"SELECT * FROM {SCHEMA}.invite_codes "
                f"WHERE code = %s AND is_active = true",
                (invite_code,),
            )
            code_row = cur.fetchone()
            if not code_row:
                return response(400, {"error": "Недействительный инвайт-код"})
            if code_row["uses_count"] >= code_row["max_uses"]:
                return response(400, {"error": "Инвайт-код исчерпан"})

            cur.execute(
                f"SELECT id FROM {SCHEMA}.users WHERE email = %s",
                (email,),
            )
            if cur.fetchone():
                return response(409, {"error": "Пользователь с таким email уже существует"})

            role = code_row["type"]
            password_hash = hash_password(password)
            user_id = str(uuid.uuid4())

            cur.execute(
                f"INSERT INTO {SCHEMA}.users "
                f"(id, email, password_hash, first_name, last_name, role, status, tier, is_verified, avatar_url) "
                f"VALUES (%s, %s, %s, %s, %s, %s, 'active', 'silver', false, NULL) "
                f"RETURNING *",
                (user_id, email, password_hash, first_name, last_name, role),
            )
            user = cur.fetchone()

            cur.execute(
                f"UPDATE {SCHEMA}.invite_codes SET uses_count = uses_count + 1 WHERE id = %s",
                (code_row["id"],),
            )

        token = create_session(conn, user_id)
        return response(201, {"token": token, "user": user_dict(user)})
    finally:
        conn.close()


def handle_login(body_str: str) -> dict:
    try:
        data = json.loads(body_str or "{}")
    except json.JSONDecodeError:
        return response(400, {"error": "Некорректный JSON"})

    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not email or not password:
        return response(400, {"error": "Email и пароль обязательны"})

    conn = get_connection()
    try:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(
                f"SELECT * FROM {SCHEMA}.users WHERE email = %s",
                (email,),
            )
            user = cur.fetchone()

        if not user or not verify_password(password, user["password_hash"]):
            return response(401, {"error": "Неверный email или пароль"})

        token = create_session(conn, str(user["id"]))
        return response(200, {"token": token, "user": user_dict(user)})
    finally:
        conn.close()


def handle_logout(headers: dict) -> dict:
    token = extract_token(headers)
    if not token:
        return response(401, {"error": "Токен не предоставлен"})

    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                f"DELETE FROM {SCHEMA}.sessions WHERE token = %s",
                (token,),
            )
        return response(200, {"message": "Выход выполнен"})
    finally:
        conn.close()


def handle_me(headers: dict) -> dict:
    token = extract_token(headers)
    if not token:
        return response(401, {"error": "Токен не предоставлен"})

    conn = get_connection()
    try:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(
                f"SELECT u.* FROM {SCHEMA}.sessions s "
                f"JOIN {SCHEMA}.users u ON u.id = s.user_id "
                f"WHERE s.token = %s AND s.expires_at > NOW()",
                (token,),
            )
            user = cur.fetchone()

        if not user:
            return response(401, {"error": "Сессия недействительна или истекла"})

        return response(200, {"user": user_dict(user)})
    finally:
        conn.close()


def handler(event: dict, context) -> dict:
    """Обработчик HTTP-запросов аутентификации клуба NOIR.

    Маршрутизирует запросы к соответствующим обработчикам на основе метода и пути.
    Поддерживает: POST /register, POST /login, POST /logout, GET /me.
    """
    if event.get("httpMethod") == "OPTIONS":
        return response(200, {})

    method = event.get("httpMethod", "")
    path = event.get("path", "")
    headers = event.get("headers", {})
    body = event.get("body", "")

    if path.endswith("/register") and method == "POST":
        return handle_register(body)
    if path.endswith("/login") and method == "POST":
        return handle_login(body)
    if path.endswith("/logout") and method == "POST":
        return handle_logout(headers)
    if path.endswith("/me") and method == "GET":
        return handle_me(headers)

    return response(404, {"error": "Маршрут не найден"})
