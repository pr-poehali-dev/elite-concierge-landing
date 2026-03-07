import { useState } from "react";
import Icon from "@/components/ui/icon";

type AdminSection = "overview" | "users" | "girls" | "messages" | "invites" | "waitlist" | "settings" | "analytics";

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

const MOCK_MEMBERS = [
  { id: 1, name: "Алексей Воронов", tier: "Black", city: "Москва", since: "2021", status: "active", email: "a.v@private.com" },
  { id: 2, name: "Дмитрий Лебедев", tier: "Obsidian", city: "Дубай", since: "2020", status: "active", email: "d.l@private.com" },
  { id: 3, name: "Михаил Соколов", tier: "Silver", city: "Лондон", since: "2023", status: "active", email: "m.s@private.com" },
  { id: 4, name: "Андрей Кузнецов", tier: "Black", city: "Монако", since: "2022", status: "suspended", email: "a.k@private.com" },
];

const MOCK_GIRLS_ADMIN = [
  { id: 1, name: "Александра К.", city: "Москва", status: "verified", rating: 4.9, events: 8 },
  { id: 2, name: "Виктория М.", city: "Дубай", status: "verified", rating: 4.8, events: 12 },
  { id: 3, name: "Елена С.", city: "Лондон", status: "pending", rating: 0, events: 0 },
  { id: 4, name: "Анастасия Р.", city: "Монако", status: "verified", rating: 5.0, events: 5 },
];

const MOCK_INVITES = [
  { code: "NOIR-2024-A1B2", tier: "Black", used: false, createdBy: "Алексей В.", created: "01.03.2026" },
  { code: "NOIR-2024-C3D4", tier: "Silver", used: true, usedBy: "Михаил С.", created: "15.02.2026" },
  { code: "NOIR-2024-E5F6", tier: "Black", used: false, createdBy: "Система", created: "10.02.2026" },
];

const MOCK_WAITLIST = [
  { id: 1, name: "Сергей Петров", email: "s.p@mail.com", city: "Москва", date: "05.03.2026", ref: "Алексей В." },
  { id: 2, name: "Николай Власов", email: "n.v@mail.com", city: "Дубай", date: "03.03.2026", ref: "Прямая заявка" },
  { id: 3, name: "Игорь Тарасов", email: "i.t@mail.com", city: "Лондон", date: "01.03.2026", ref: "Дмитрий Л." },
];

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [section, setSection] = useState<AdminSection>("overview");

  const navItems: { key: AdminSection; icon: string; label: string; badge?: number }[] = [
    { key: "overview", icon: "LayoutDashboard", label: "Обзор" },
    { key: "analytics", icon: "BarChart2", label: "Аналитика" },
    { key: "users", icon: "Users", label: "Члены", badge: MOCK_MEMBERS.length },
    { key: "girls", icon: "UserCheck", label: "Девушки", badge: 1 },
    { key: "messages", icon: "MessageSquare", label: "Сообщения", badge: 3 },
    { key: "invites", icon: "Key", label: "Инвайт-коды" },
    { key: "waitlist", icon: "Clock", label: "Лист ожидания", badge: MOCK_WAITLIST.length },
    { key: "settings", icon: "Settings", label: "Настройки" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* SIDEBAR */}
      <aside className="w-64 flex-shrink-0 border-r border-border flex flex-col h-screen sticky top-0">
        <div className="px-6 py-8 border-b border-border">
          <div className="font-display text-xl tracking-[0.3em] text-gold mb-1">NOIR</div>
          <div className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">Admin Panel</div>
        </div>
        <div className="px-4 py-3 border-b border-border bg-gold/5">
          <div className="flex items-center gap-2">
            <Icon name="ShieldAlert" fallback="Shield" size={12} className="text-gold" />
            <span className="font-ui text-[0.55rem] tracking-[0.15em] uppercase text-gold">Superadmin доступ</span>
          </div>
        </div>
        <nav className="flex-1 py-6 overflow-auto">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              className={`sidebar-item w-full justify-between ${section === item.key ? "active" : ""}`}
            >
              <span className="flex items-center gap-3">
                <Icon name={item.icon} fallback="Circle" size={15} />
                {item.label}
              </span>
              {item.badge && (
                <span className="font-ui text-[0.55rem] bg-gold/10 text-gold border border-gold/20 px-1.5 py-0.5 min-w-[20px] text-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="px-4 py-6 border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gold/10 border border-gold/20 flex items-center justify-center">
              <Icon name="Shield" fallback="Circle" size={13} className="text-gold" />
            </div>
            <div>
              <div className="font-ui text-xs text-foreground font-light">Super Admin</div>
              <div className="font-ui text-[0.55rem] text-muted-foreground uppercase tracking-wide">Полный доступ</div>
            </div>
          </div>
          <button onClick={() => onNavigate("landing")} className="sidebar-item w-full text-left">
            <Icon name="LogOut" fallback="Circle" size={14} />
            Выйти
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-auto">
        <div className="border-b border-border px-10 py-6 flex items-center justify-between sticky top-0 bg-background z-10">
          <div>
            <div className="font-ui text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground mb-1">
              Управление
            </div>
            <h1 className="font-display text-2xl font-light">
              {section === "overview" && "Обзор системы"}
              {section === "analytics" && "Аналитика"}
              {section === "users" && "Члены клуба"}
              {section === "girls" && "Девушки"}
              {section === "messages" && "Все сообщения"}
              {section === "invites" && "Инвайт-коды"}
              {section === "waitlist" && "Лист ожидания"}
              {section === "settings" && "Настройки системы"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 border border-border flex items-center justify-center hover:border-gold/40 transition-colors relative">
              <Icon name="Bell" fallback="Circle" size={15} className="text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-gold rounded-full" />
            </button>
            <button className="btn-gold py-2 px-4 text-xs">
              <span className="flex items-center gap-2">
                <Icon name="Plus" fallback="Circle" size={13} />
                Добавить
              </span>
            </button>
          </div>
        </div>

        <div className="p-10">
          {section === "overview" && <OverviewSection />}
          {section === "analytics" && <AnalyticsSection />}
          {section === "users" && <UsersSection members={MOCK_MEMBERS} />}
          {section === "girls" && <GirlsAdminSection girls={MOCK_GIRLS_ADMIN} />}
          {section === "messages" && <AdminMessagesSection />}
          {section === "invites" && <InvitesSection invites={MOCK_INVITES} />}
          {section === "waitlist" && <WaitlistSection waitlist={MOCK_WAITLIST} />}
          {section === "settings" && <AdminSettingsSection />}
        </div>
      </main>
    </div>
  );
}

function OverviewSection() {
  const stats = [
    { label: "Активных членов", val: "2 412", change: "+12 этот месяц", icon: "Users" },
    { label: "Девушек", val: "847", change: "+34 ожидают верификации", icon: "UserCheck" },
    { label: "Запросов консьержа", val: "1 204", change: "За 30 дней", icon: "Star" },
    { label: "Выручка (месяц)", val: "€ 4.2M", change: "+8% к прошлому", icon: "TrendingUp" },
  ];
  const recent = [
    { action: "Новый член Silver", name: "Михаил Тарасов", time: "5 мин назад" },
    { action: "Верификация девушки", name: "Екатерина В.", time: "23 мин назад" },
    { action: "Запрос консьержа", name: "Дмитрий Л. → частный борт", time: "1 час назад" },
    { action: "Инвайт активирован", name: "NOIR-2024-C3D4", time: "2 часа назад" },
    { action: "Заявка в лист ожидания", name: "Игорь Тарасов", time: "3 часа назад" },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="card-dark p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">{s.label}</div>
              <div className="w-7 h-7 border border-border flex items-center justify-center">
                <Icon name={s.icon} fallback="Circle" size={12} className="text-gold" />
              </div>
            </div>
            <div className="font-display text-3xl text-gold font-light mb-1">{s.val}</div>
            <div className="font-ui text-[0.55rem] text-muted-foreground tracking-wide">{s.change}</div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-border p-8">
          <h3 className="font-display text-xl font-light mb-6">Последние действия</h3>
          <div className="space-y-4">
            {recent.map((r, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <div className="font-ui text-xs font-light">{r.action}</div>
                  <div className="font-ui text-[0.6rem] text-muted-foreground tracking-wide">{r.name}</div>
                </div>
                <span className="font-ui text-[0.55rem] text-muted-foreground whitespace-nowrap">{r.time}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-border p-8">
          <h3 className="font-display text-xl font-light mb-6">Требует внимания</h3>
          <div className="space-y-4">
            {[
              { label: "Верификация ожидает", count: "1 девушка", icon: "AlertCircle", color: "text-gold" },
              { label: "Лист ожидания", count: "3 заявки", icon: "Clock", color: "text-gold" },
              { label: "Жалобы", count: "0", icon: "Flag", color: "text-muted-foreground" },
              { label: "Платежи на проверке", count: "2", icon: "CreditCard", color: "text-gold" },
            ].map((a) => (
              <div key={a.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name={a.icon} fallback="Circle" size={14} className={a.color} />
                  <span className="font-ui text-xs font-light">{a.label}</span>
                </div>
                <span className={`font-ui text-xs font-light ${a.color}`}>{a.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsSection() {
  const months = ["Окт", "Ноя", "Дек", "Янв", "Фев", "Мар"];
  const values = [68, 72, 85, 79, 91, 100];
  const maxVal = Math.max(...values);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: "Конверсия заявок", val: "34%", trend: "+5%" },
          { label: "Retention (год)", val: "89%", trend: "+2%" },
          { label: "NPS", val: "72", trend: "+8" },
        ].map((s) => (
          <div key={s.label} className="card-dark p-6 text-center">
            <div className="font-display text-4xl text-gold font-light mb-1">{s.val}</div>
            <div className="font-ui text-[0.6rem] text-muted-foreground tracking-[0.15em] uppercase mb-2">{s.label}</div>
            <div className="font-ui text-[0.6rem] text-green-400">{s.trend} к прошлому периоду</div>
          </div>
        ))}
      </div>
      <div className="border border-border p-8 mb-6">
        <h3 className="font-display text-xl font-light mb-8">Рост членов клуба</h3>
        <div className="flex items-end gap-4 h-40">
          {months.map((m, i) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gold/20 relative" style={{ height: `${(values[i] / maxVal) * 100}%` }}>
                <div className="absolute inset-x-0 bottom-0 bg-gold" style={{ height: `${60 + i * 4}%` }} />
              </div>
              <span className="font-ui text-[0.55rem] text-muted-foreground">{m}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-border p-8">
          <h3 className="font-display text-xl font-light mb-6">Тиры членства</h3>
          <div className="space-y-3">
            {[
              { tier: "Silver", pct: 45, count: 1085 },
              { tier: "Black", pct: 52, count: 1254 },
              { tier: "Obsidian", pct: 3, count: 73 },
            ].map((t) => (
              <div key={t.tier}>
                <div className="flex justify-between mb-1">
                  <span className="font-ui text-xs font-light">{t.tier}</span>
                  <span className="font-ui text-xs text-muted-foreground">{t.count}</span>
                </div>
                <div className="h-1 bg-muted">
                  <div className="h-full bg-gold transition-all" style={{ width: `${t.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-border p-8">
          <h3 className="font-display text-xl font-light mb-6">Топ городов</h3>
          <div className="space-y-3">
            {[
              { city: "Москва", pct: 38 },
              { city: "Дубай", pct: 24 },
              { city: "Лондон", pct: 18 },
              { city: "Монако", pct: 12 },
              { city: "Нью-Йорк", pct: 8 },
            ].map((c) => (
              <div key={c.city} className="flex items-center gap-3">
                <span className="font-ui text-xs font-light w-20">{c.city}</span>
                <div className="flex-1 h-1 bg-muted">
                  <div className="h-full bg-gold/60" style={{ width: `${c.pct}%` }} />
                </div>
                <span className="font-ui text-xs text-muted-foreground w-8 text-right">{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function UsersSection({ members }: { members: typeof MOCK_MEMBERS }) {
  const tierColor = (tier: string) => tier === "Obsidian" ? "text-foreground" : tier === "Black" ? "text-gold" : "text-muted-foreground";
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <input className="flex-1 bg-muted border border-border px-4 py-2.5 text-xs font-ui font-light focus:outline-none focus:border-gold/50 transition-colors" placeholder="Поиск по имени, email..." />
        <select className="bg-muted border border-border px-4 py-2.5 text-xs font-ui font-light text-muted-foreground focus:outline-none">
          <option>Все тиры</option>
          <option>Silver</option>
          <option>Black</option>
          <option>Obsidian</option>
        </select>
      </div>
      <div className="border border-border">
        <div className="grid grid-cols-6 gap-4 p-4 border-b border-border">
          {["Имя", "Тир", "Город", "С", "Email", "Действия"].map((h) => (
            <div key={h} className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">{h}</div>
          ))}
        </div>
        {members.map((m) => (
          <div key={m.id} className="grid grid-cols-6 gap-4 p-4 border-b border-border last:border-0 hover:bg-card transition-colors items-center">
            <div>
              <div className="font-ui text-xs font-light">{m.name}</div>
              <div className={`w-1.5 h-1.5 rounded-full mt-1 inline-block ${m.status === "active" ? "bg-green-400" : "bg-muted-foreground"}`} />
            </div>
            <div className={`font-ui text-xs font-light ${tierColor(m.tier)}`}>{m.tier}</div>
            <div className="font-ui text-xs text-muted-foreground font-light">{m.city}</div>
            <div className="font-ui text-xs text-muted-foreground font-light">{m.since}</div>
            <div className="font-ui text-[0.6rem] text-muted-foreground font-light truncate">{m.email}</div>
            <div className="flex gap-2">
              <button className="w-7 h-7 border border-border flex items-center justify-center hover:border-gold/40 transition-colors">
                <Icon name="Edit" fallback="Circle" size={11} className="text-muted-foreground" />
              </button>
              <button className="w-7 h-7 border border-border flex items-center justify-center hover:border-destructive/40 transition-colors">
                <Icon name="Ban" fallback="Circle" size={11} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GirlsAdminSection({ girls }: { girls: typeof MOCK_GIRLS_ADMIN }) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <input className="flex-1 bg-muted border border-border px-4 py-2.5 text-xs font-ui font-light focus:outline-none focus:border-gold/50" placeholder="Поиск..." />
        <select className="bg-muted border border-border px-4 py-2.5 text-xs font-ui font-light text-muted-foreground focus:outline-none">
          <option>Все статусы</option>
          <option>Верифицирована</option>
          <option>На проверке</option>
          <option>Заблокирована</option>
        </select>
      </div>
      <div className="border border-border">
        <div className="grid grid-cols-6 gap-4 p-4 border-b border-border">
          {["Имя", "Город", "Статус", "Рейтинг", "Событий", "Действия"].map((h) => (
            <div key={h} className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">{h}</div>
          ))}
        </div>
        {girls.map((g) => (
          <div key={g.id} className="grid grid-cols-6 gap-4 p-4 border-b border-border last:border-0 hover:bg-card transition-colors items-center">
            <div className="font-ui text-xs font-light">{g.name}</div>
            <div className="font-ui text-xs text-muted-foreground font-light">{g.city}</div>
            <div>
              <span className={`font-ui text-[0.55rem] tracking-wide px-2 py-0.5 ${g.status === "verified" ? "bg-green-400/10 text-green-400 border border-green-400/20" : "bg-gold/10 text-gold border border-gold/20"}`}>
                {g.status === "verified" ? "Верифицирована" : "На проверке"}
              </span>
            </div>
            <div className="font-ui text-xs text-muted-foreground">{g.rating > 0 ? `★ ${g.rating}` : "—"}</div>
            <div className="font-ui text-xs text-muted-foreground">{g.events}</div>
            <div className="flex gap-2">
              {g.status === "pending" && (
                <button className="font-ui text-[0.55rem] tracking-wide bg-gold/10 text-gold border border-gold/20 px-2 py-1 hover:bg-gold/20 transition-colors">
                  Верифицировать
                </button>
              )}
              <button className="w-7 h-7 border border-border flex items-center justify-center hover:border-gold/40 transition-colors">
                <Icon name="Eye" fallback="Circle" size={11} className="text-muted-foreground" />
              </button>
              <button className="w-7 h-7 border border-border flex items-center justify-center hover:border-destructive/40 transition-colors">
                <Icon name="Ban" fallback="Circle" size={11} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminMessagesSection() {
  return (
    <div className="border border-border">
      <div className="grid grid-cols-5 gap-4 p-4 border-b border-border">
        {["От", "Кому", "Тема", "Время", "Действия"].map((h) => (
          <div key={h} className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">{h}</div>
        ))}
      </div>
      {[
        { from: "Алексей В.", to: "Менеджер", subj: "Запрос: частный борт Москва → Дубай", time: "10:32" },
        { from: "Александра К.", to: "Виктория М.", subj: "Привет после вечера в галерее", time: "09:15" },
        { from: "Дмитрий Л.", to: "Поддержка", subj: "Вопрос по оплате членства", time: "08:44" },
      ].map((m, i) => (
        <div key={i} className="grid grid-cols-5 gap-4 p-4 border-b border-border last:border-0 hover:bg-card transition-colors items-center">
          <div className="font-ui text-xs font-light">{m.from}</div>
          <div className="font-ui text-xs text-muted-foreground font-light">{m.to}</div>
          <div className="font-ui text-xs text-muted-foreground font-light truncate">{m.subj}</div>
          <div className="font-ui text-xs text-muted-foreground">{m.time}</div>
          <div className="flex gap-2">
            <button className="w-7 h-7 border border-border flex items-center justify-center hover:border-gold/40 transition-colors">
              <Icon name="Eye" fallback="Circle" size={11} className="text-muted-foreground" />
            </button>
            <button className="w-7 h-7 border border-border flex items-center justify-center hover:border-destructive/40 transition-colors">
              <Icon name="Trash2" fallback="Circle" size={11} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function InvitesSection({ invites }: { invites: typeof MOCK_INVITES }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="font-ui text-xs text-muted-foreground font-light">Активных: {invites.filter(i => !i.used).length} · Использованных: {invites.filter(i => i.used).length}</p>
        <button className="btn-gold py-2 px-5 text-xs">Создать код</button>
      </div>
      <div className="border border-border">
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-border">
          {["Код", "Тир", "Статус", "Создан", "Действия"].map((h) => (
            <div key={h} className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">{h}</div>
          ))}
        </div>
        {invites.map((inv, i) => (
          <div key={i} className="grid grid-cols-5 gap-4 p-4 border-b border-border last:border-0 items-center hover:bg-card transition-colors">
            <div className="font-ui text-xs font-mono font-light text-gold">{inv.code}</div>
            <div className="font-ui text-xs text-muted-foreground">{inv.tier}</div>
            <div>
              <span className={`font-ui text-[0.55rem] tracking-wide px-2 py-0.5 ${inv.used ? "bg-muted text-muted-foreground border border-border" : "bg-gold/10 text-gold border border-gold/20"}`}>
                {inv.used ? `Использован · ${inv.usedBy}` : "Активен"}
              </span>
            </div>
            <div className="font-ui text-xs text-muted-foreground">{inv.created}</div>
            <div className="flex gap-2">
              {!inv.used && (
                <button className="w-7 h-7 border border-border flex items-center justify-center hover:border-gold/40 transition-colors" title="Копировать">
                  <Icon name="Copy" fallback="Circle" size={11} className="text-muted-foreground" />
                </button>
              )}
              <button className="w-7 h-7 border border-border flex items-center justify-center hover:border-destructive/40 transition-colors">
                <Icon name="Trash2" fallback="Circle" size={11} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WaitlistSection({ waitlist }: { waitlist: typeof MOCK_WAITLIST }) {
  return (
    <div>
      <div className="border border-border mb-6">
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-border">
          {["Имя", "Email", "Город", "Рекомендация", "Действия"].map((h) => (
            <div key={h} className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">{h}</div>
          ))}
        </div>
        {waitlist.map((w) => (
          <div key={w.id} className="grid grid-cols-5 gap-4 p-4 border-b border-border last:border-0 items-center hover:bg-card transition-colors">
            <div>
              <div className="font-ui text-xs font-light">{w.name}</div>
              <div className="font-ui text-[0.55rem] text-muted-foreground">{w.date}</div>
            </div>
            <div className="font-ui text-[0.6rem] text-muted-foreground font-light truncate">{w.email}</div>
            <div className="font-ui text-xs text-muted-foreground font-light">{w.city}</div>
            <div className="font-ui text-xs text-muted-foreground font-light">{w.ref}</div>
            <div className="flex gap-2">
              <button className="font-ui text-[0.55rem] tracking-wide bg-gold/10 text-gold border border-gold/20 px-2 py-1 hover:bg-gold/20 transition-colors">
                Пригласить
              </button>
              <button className="w-7 h-7 border border-border flex items-center justify-center hover:border-destructive/40 transition-colors">
                <Icon name="X" fallback="Circle" size={11} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminSettingsSection() {
  return (
    <div className="max-w-xl space-y-8">
      <div className="border border-border p-8">
        <h3 className="font-display text-2xl font-light mb-6">Параметры клуба</h3>
        <div className="space-y-5">
          {[
            { label: "Максимум членов", val: "2500" },
            { label: "Лист ожидания открыт", val: "Да" },
            { label: "Автоверификация девушек", val: "Выкл." },
            { label: "Минимальный возраст", val: "21 год" },
          ].map((f) => (
            <div key={f.label} className="flex items-center justify-between border-b border-border pb-4 last:border-0">
              <span className="font-ui text-xs font-light">{f.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-ui text-xs text-muted-foreground">{f.val}</span>
                <button className="w-6 h-6 border border-border flex items-center justify-center hover:border-gold/40 transition-colors">
                  <Icon name="Edit" fallback="Circle" size={10} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-border p-8">
        <h3 className="font-display text-2xl font-light mb-6">Администраторы</h3>
        <div className="space-y-3 mb-6">
          {[
            { name: "Super Admin", role: "Полный доступ", status: "active" },
            { name: "Наталья С.", role: "Менеджеры", status: "active" },
          ].map((a) => (
            <div key={a.name} className="flex items-center justify-between">
              <div>
                <div className="font-ui text-xs font-light">{a.name}</div>
                <div className="font-ui text-[0.6rem] text-muted-foreground">{a.role}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <button className="font-ui text-[0.55rem] text-muted-foreground hover:text-gold transition-colors">Изменить</button>
              </div>
            </div>
          ))}
        </div>
        <button className="btn-outline-gold py-2 text-xs">Добавить администратора</button>
      </div>
      <div className="border border-destructive/30 p-8">
        <h3 className="font-display text-xl font-light mb-3 text-destructive">Системные операции</h3>
        <div className="space-y-3">
          <button className="w-full btn-outline-gold border-muted text-muted-foreground py-2 text-xs hover:border-gold hover:text-gold">Экспорт базы данных</button>
          <button className="w-full btn-outline-gold border-muted text-muted-foreground py-2 text-xs hover:border-gold hover:text-gold">Создать резервную копию</button>
          <button className="w-full btn-outline-gold border-destructive/30 text-destructive/70 py-2 text-xs hover:border-destructive hover:text-destructive">Очистить кэш системы</button>
        </div>
      </div>
    </div>
  );
}
