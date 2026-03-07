import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/41bc0668-f498-4798-94c6-bfbfd41c0775/files/93888d34-e36c-4c3a-9be6-8ee94d1aaa8c.jpg";
const LIFESTYLE_IMG = "https://cdn.poehali.dev/projects/41bc0668-f498-4798-94c6-bfbfd41c0775/files/b03dd757-bf0a-4561-8ded-9aefd8898383.jpg";
const SUITE_IMG = "https://cdn.poehali.dev/projects/41bc0668-f498-4798-94c6-bfbfd41c0775/files/3664e9ef-75a4-4def-84a6-f596c6f80e23.jpg";

type Page = "home" | "philosophy" | "membership" | "journal" | "about" | "contacts" | "auth";
type AuthMode = "login" | "register" | "waitlist";

interface LandingProps {
  onNavigate: (page: string) => void;
}

const NAV_ITEMS = [
  { key: "philosophy", label: "Философия" },
  { key: "membership", label: "Членство" },
  { key: "journal", label: "Журнал" },
  { key: "about", label: "О нас" },
  { key: "contacts", label: "Контакты" },
];

export default function Landing({ onNavigate }: LandingProps) {
  const [activePage, setActivePage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (page: Page) => {
    setActivePage(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/97 backdrop-blur-sm border-b border-border" : ""}`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-20">
          <button onClick={() => navigate("home")} className="font-display text-xl tracking-[0.3em] text-gold font-light uppercase">
            NOIR
          </button>
          <div className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <button key={item.key} onClick={() => navigate(item.key as Page)}
                className={`font-ui text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-300 ${activePage === item.key ? "text-gold" : "text-muted-foreground hover:text-foreground"}`}>
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("auth")} className="hidden md:block btn-outline-gold text-xs py-2 px-5">Войти</button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-muted-foreground hover:text-gold transition-colors">
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border px-8 py-6 flex flex-col gap-5">
            {NAV_ITEMS.map((item) => (
              <button key={item.key} onClick={() => navigate(item.key as Page)}
                className="font-ui text-[0.65rem] tracking-[0.2em] uppercase text-left text-muted-foreground hover:text-gold transition-colors">
                {item.label}
              </button>
            ))}
            <button onClick={() => navigate("auth")} className="btn-outline-gold text-xs w-full mt-2">Войти</button>
          </div>
        )}
      </nav>

      {activePage === "home" && <HomePage navigate={navigate} onNavigate={onNavigate} />}
      {activePage === "philosophy" && <PhilosophyPage navigate={navigate} />}
      {activePage === "membership" && <MembershipPage navigate={navigate} />}
      {activePage === "journal" && <JournalPage />}
      {activePage === "about" && <AboutPage navigate={navigate} />}
      {activePage === "contacts" && <ContactsPage />}
      {activePage === "auth" && <AuthPage onNavigate={onNavigate} navigate={navigate} />}

      <footer className="border-t border-border mt-24">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="font-display text-2xl text-gold tracking-[0.3em] mb-4">NOIR</div>
              <p className="text-muted-foreground text-xs font-ui font-light leading-relaxed tracking-wide">
                Элитный международный<br/>консьерж-клуб
              </p>
              <div className="flex gap-3 mt-5">
                {["Telegram", "Instagram", "LinkedIn"].map(s => (
                  <button key={s} className="w-8 h-8 border border-border flex items-center justify-center hover:border-gold/40 hover:text-gold text-muted-foreground transition-all">
                    <Icon name={s === "Telegram" ? "Send" : s === "Instagram" ? "Camera" : "Briefcase"} fallback="Circle" size={12} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-ui text-[0.6rem] tracking-[0.25em] uppercase text-gold mb-4">Клуб</div>
              <div className="flex flex-col gap-3">
                {[["philosophy","Философия"],["membership","Членство"],["journal","Журнал"],["about","О нас"]].map(([k,l]) => (
                  <button key={k} onClick={() => navigate(k as Page)} className="text-muted-foreground text-xs font-ui font-light hover:text-gold transition-colors text-left tracking-wide">{l}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-ui text-[0.6rem] tracking-[0.25em] uppercase text-gold mb-4">Вступление</div>
              <div className="flex flex-col gap-3">
                <button onClick={() => navigate("auth")} className="text-muted-foreground text-xs font-ui font-light hover:text-gold transition-colors text-left tracking-wide">Войти</button>
                <button onClick={() => navigate("auth")} className="text-muted-foreground text-xs font-ui font-light hover:text-gold transition-colors text-left tracking-wide">Регистрация</button>
                <button onClick={() => navigate("auth")} className="text-muted-foreground text-xs font-ui font-light hover:text-gold transition-colors text-left tracking-wide">Лист ожидания</button>
                <button onClick={() => navigate("contacts")} className="text-muted-foreground text-xs font-ui font-light hover:text-gold transition-colors text-left tracking-wide">Контакты</button>
              </div>
            </div>
            <div>
              <div className="font-ui text-[0.6rem] tracking-[0.25em] uppercase text-gold mb-4">Города</div>
              <div className="flex flex-col gap-2 text-muted-foreground text-xs font-ui font-light">
                {["Москва","Дубай","Лондон","Монако","Нью-Йорк","Париж"].map(c => (
                  <span key={c}>{c}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="gold-line mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-[0.6rem] font-ui tracking-[0.15em] uppercase">
              © 2026 NOIR Concierge Society. Все права защищены.
            </p>
            <p className="text-muted-foreground text-[0.6rem] font-ui tracking-[0.1em]">
              Строго конфиденциально · Только по приглашению
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── HOME PAGE ─────────────────────────────────────────────────────────── */
function HomePage({ navigate, onNavigate }: { navigate: (p: Page) => void; onNavigate: (p: string) => void }) {
  return (
    <>
      {/* HERO */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="NOIR" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-transparent" />
          <div className="absolute inset-0 bg-background/25" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 pt-20 w-full">
          <div className="max-w-xl">
            <p className="font-ui text-[0.6rem] tracking-[0.5em] uppercase text-gold mb-8 opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
              Только по приглашению · С 2019 года
            </p>
            <h1 className="font-display text-6xl md:text-8xl font-light text-foreground leading-none mb-6 opacity-0 animate-fade-up delay-200" style={{ animationFillMode: 'forwards' }}>
              Жизнь<br />
              <em className="text-gold not-italic">без</em><br />
              границ
            </h1>
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide max-w-sm mb-12 opacity-0 animate-fade-up delay-300" style={{ animationFillMode: 'forwards' }}>
              Международный закрытый клуб для людей, которые ценят абсолютную эксклюзивность. Достойные люди. Исключительные встречи. Настоящая свобода.
            </p>
            <div className="flex gap-4 flex-wrap opacity-0 animate-fade-up delay-400" style={{ animationFillMode: 'forwards' }}>
              <button onClick={() => navigate("membership")} className="btn-gold">Узнать о членстве</button>
              <button onClick={() => navigate("philosophy")} className="btn-outline-gold">Наша философия</button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 animate-fade-up delay-600" style={{ animationFillMode: 'forwards' }}>
          <span className="font-ui text-[0.5rem] tracking-[0.4em] uppercase text-muted-foreground">Прокрутите</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent" />
        </div>
      </section>

      {/* NUMBERS */}
      <section className="py-24 border-y border-border">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-border">
            {[
              { num: "2 400+", label: "Членов клуба" },
              { num: "6", label: "Городов присутствия" },
              { num: "850+", label: "Верифицированных участниц" },
              { num: "7", label: "Лет безупречной работы" },
            ].map((s) => (
              <div key={s.label} className="px-10 py-6 text-center">
                <div className="font-display text-5xl text-gold font-light mb-2">{s.num}</div>
                <div className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY PREVIEW */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-5">Философия</p>
              <h2 className="font-display text-5xl md:text-6xl font-light leading-tight mb-8">
                Заслужено.<br/>
                <em className="text-gold not-italic">Не куплено.</em>
              </h2>
              <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide mb-6">
                NOIR — не сервис. Это сообщество. Здесь нельзя просто заплатить и войти. Членство в NOIR заслуживается: через рекомендации, через личные качества, через вклад в культуру клуба.
              </p>
              <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide mb-10">
                Мы создали пространство, где встречаются люди схожего уровня — те, кто добился своего не случайно. Здесь рождаются партнёрства, дружба и воспоминания на всю жизнь.
              </p>
              <button onClick={() => navigate("philosophy")} className="btn-outline-gold">Читать подробнее</button>
            </div>
            <div className="relative">
              <img src={LIFESTYLE_IMG} alt="Lifestyle" className="w-full aspect-[4/5] object-cover" />
              <div className="absolute -bottom-6 -left-6 w-48 border border-gold/30 bg-background p-5">
                <div className="font-display text-3xl text-gold mb-1">∞</div>
                <p className="font-ui text-[0.6rem] tracking-[0.15em] uppercase text-muted-foreground">Безграничные<br/>возможности</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP TIERS PREVIEW */}
      <section className="py-28 bg-card/30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-4">Уровни</p>
            <h2 className="font-display text-5xl font-light">Ваш статус определяет<br/><em className="text-gold not-italic">ваши возможности</em></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tier: "Silver", desc: "Вход в мир NOIR. Базовые привилегии, лучшие события.", perks: ["Приглашения на закрытые вечера","Доступ к 30% каталога","Персональный менеджер"] },
              { tier: "Black", desc: "Элита клуба. Расширенный доступ и приоритетный сервис.", perks: ["Неограниченный доступ к каталогу","Приоритет на мероприятиях","Персональный консьерж 24/7","Право выдавать инвайты"], featured: true },
              { tier: "Obsidian", desc: "Высший уровень. Для тех, кто формирует правила.", perks: ["Всё уровня Black","Участие в закрытых решениях","VIP-доступ к частным событиям","Статус соучредителя"] },
            ].map((t) => (
              <div key={t.tier} className={`p-8 border transition-all duration-300 ${t.featured ? "border-gold bg-gold/5" : "border-border hover:border-gold/40"}`}>
                {t.featured && <div className="font-ui text-[0.5rem] tracking-[0.3em] uppercase bg-gold text-background px-3 py-1 inline-block mb-4">Наиболее popular</div>}
                <div className="font-display text-3xl text-gold mb-3">{t.tier}</div>
                <p className="font-ui text-xs font-light text-muted-foreground leading-relaxed mb-6 tracking-wide">{t.desc}</p>
                <div className="space-y-2 mb-8">
                  {t.perks.map(p => (
                    <div key={p} className="flex items-center gap-3">
                      <Icon name="Check" fallback="Circle" size={11} className="text-gold flex-shrink-0" />
                      <span className="font-ui text-xs font-light text-foreground/80 tracking-wide">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="font-ui text-xs text-muted-foreground tracking-wide mb-6">Уровень присваивается клубом — не выбирается самостоятельно</p>
            <button onClick={() => navigate("membership")} className="btn-gold">Подробнее о членстве</button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-4">Как это работает</p>
            <h2 className="font-display text-5xl font-light">Путь в NOIR</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-0">
            {[
              { n: "01", title: "Рекомендация или заявка", desc: "Вас рекомендует действующий член или вы подаёте заявку через лист ожидания" },
              { n: "02", title: "Проверка и анкета", desc: "Менеджер связывается, задаёт вопросы и изучает вашу кандидатуру" },
              { n: "03", title: "Решение клуба", desc: "Совет клуба рассматривает кандидатуру. Срок — от 3 до 14 дней" },
              { n: "04", title: "Добро пожаловать", desc: "Вы получаете учётные данные, персонального менеджера и доступ к клубу" },
            ].map((s, i) => (
              <div key={s.n} className="relative px-8 py-10 border-r border-border last:border-r-0">
                <div className="font-display text-6xl text-gold/10 font-light leading-none mb-4">{s.n}</div>
                <h3 className="font-display text-xl font-light mb-3 leading-snug">{s.title}</h3>
                <p className="font-ui text-xs font-light text-muted-foreground leading-relaxed tracking-wide">{s.desc}</p>
                {i < 3 && <div className="hidden md:block absolute top-12 right-0 translate-x-1/2 z-10 text-gold/30">
                  <Icon name="ChevronRight" fallback="Circle" size={16} />
                </div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIFESTYLE */}
      <section className="py-28 bg-card/20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-4">Стиль жизни NOIR</p>
            <h2 className="font-display text-5xl font-light">Каждая встреча — <em className="text-gold not-italic">событие</em></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "Plane", title: "Частная авиация", desc: "Борты и маршруты под любой запрос. Без ожидания в очередях." },
              { icon: "Utensils", title: "Гастрономия", desc: "Столики в лучших ресторанах мира. Закрытые дегустации с шефами." },
              { icon: "Gem", title: "Закрытые события", desc: "Вечера в частных галереях, яхтах, виллах. Только для членов." },
              { icon: "Car", title: "Транспорт", desc: "Автомобили, яхты, вертолёты — всё по одному звонку менеджеру." },
              { icon: "Building", title: "Резиденции", desc: "Частные апартаменты и виллы в 6 городах присутствия клуба." },
              { icon: "Shield", title: "Конфиденциальность", desc: "Абсолютная дискретность. Никаких публичных упоминаний без согласия." },
            ].map((item) => (
              <div key={item.title} className="p-8 border border-border hover:border-gold/40 transition-all duration-300 group">
                <div className="w-10 h-10 border border-border group-hover:border-gold/40 flex items-center justify-center mb-5 transition-all">
                  <Icon name={item.icon} fallback="Circle" size={16} className="text-muted-foreground group-hover:text-gold transition-colors" />
                </div>
                <h3 className="font-display text-xl font-light mb-3">{item.title}</h3>
                <p className="font-ui text-xs font-light text-muted-foreground leading-relaxed tracking-wide">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNAL PREVIEW */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-4">Журнал</p>
              <h2 className="font-display text-5xl font-light">Последние публикации</h2>
            </div>
            <button onClick={() => navigate("journal")} className="btn-outline-gold hidden md:block">Все материалы</button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tag: "Стиль жизни", title: "Монако в апреле: гид по закрытым событиям", date: "4 марта 2026", img: SUITE_IMG },
              { tag: "Гастрономия", title: "Пять ужинов, которые изменили наш взгляд на кухню", date: "28 фев 2026", img: LIFESTYLE_IMG },
              { tag: "Философия", title: "Почему настоящая роскошь — это время, а не деньги", date: "20 фев 2026", img: HERO_IMG },
            ].map((a) => (
              <div key={a.title} className="group cursor-pointer" onClick={() => navigate("journal")}>
                <div className="overflow-hidden mb-5 aspect-[16/10]">
                  <img src={a.img} alt={a.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <span className="font-ui text-[0.55rem] tracking-[0.25em] uppercase text-gold">{a.tag}</span>
                <h3 className="font-display text-xl font-light mt-2 mb-2 group-hover:text-gold transition-colors leading-snug">{a.title}</h3>
                <span className="font-ui text-[0.6rem] text-muted-foreground tracking-wide">{a.date}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 md:hidden">
            <button onClick={() => navigate("journal")} className="btn-outline-gold">Все материалы</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={SUITE_IMG} alt="CTA" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="relative z-10 text-center px-8">
          <p className="font-ui text-[0.6rem] tracking-[0.5em] uppercase text-gold mb-6">Готовы к следующему уровню?</p>
          <h2 className="font-display text-5xl md:text-7xl font-light mb-8 max-w-2xl mx-auto leading-tight">
            Начните свой путь<br/>в <em className="text-gold not-italic">NOIR</em>
          </h2>
          <p className="font-ui text-sm font-light text-muted-foreground max-w-sm mx-auto mb-12 tracking-wide leading-relaxed">
            Если вас рекомендовал действующий член — у вас уже есть шанс. Если нет — подайте заявку в лист ожидания.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => navigate("auth")} className="btn-gold">Зарегистрироваться</button>
            <button onClick={() => navigate("contacts")} className="btn-outline-gold">Задать вопрос</button>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── PHILOSOPHY PAGE ──────────────────────────────────────────────────── */
function PhilosophyPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-8">
        {/* Hero */}
        <div className="max-w-3xl mb-24">
          <p className="font-ui text-[0.6rem] tracking-[0.5em] uppercase text-gold mb-6">Философия</p>
          <h1 className="font-display text-6xl md:text-8xl font-light leading-none mb-10">
            Мы верим в<br/><em className="text-gold not-italic">заслуженное</em>
          </h1>
          <p className="font-ui text-base font-light text-muted-foreground leading-relaxed tracking-wide">
            NOIR родился из простой идеи: лучшие люди заслуживают лучших встреч. Не тех, кого можно купить за деньги — а тех, кого можно найти только в правильном окружении.
          </p>
        </div>

        <div className="gold-line mb-24" />

        {/* Core values */}
        <div className="grid md:grid-cols-2 gap-20 mb-28">
          <div>
            <div className="font-display text-8xl text-gold/10 font-light leading-none mb-6">01</div>
            <h2 className="font-display text-3xl font-light mb-5">Качество, а не количество</h2>
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide mb-4">
              Мы намеренно ограничиваем размер клуба. 2 400 членов — это осознанный выбор, а не случайность. Каждый новый участник рассматривается лично. Мы не растём ради роста.
            </p>
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide">
              Когда вы входите в NOIR, вы знаете: каждый человек рядом прошёл ту же проверку, что и вы. Это создаёт особую атмосферу доверия.
            </p>
          </div>
          <div>
            <div className="font-display text-8xl text-gold/10 font-light leading-none mb-6">02</div>
            <h2 className="font-display text-3xl font-light mb-5">Членство заслуживается</h2>
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide mb-4">
              Нельзя просто купить место в NOIR. Ваш уровень — Silver, Black или Obsidian — определяется клубом на основе вашего вклада, личных качеств и того, как вы взаимодействуете с сообществом.
            </p>
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide">
              Уровень растёт со временем. Это путь, а не транзакция.
            </p>
          </div>
          <div>
            <div className="font-display text-8xl text-gold/10 font-light leading-none mb-6">03</div>
            <h2 className="font-display text-3xl font-light mb-5">Дискретность — наш фундамент</h2>
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide mb-4">
              Ни одно имя не звучит публично без явного согласия. Ни одна встреча не становится публичной историей. Что происходит в NOIR — остаётся в NOIR.
            </p>
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide">
              Мы не используем социальные сети для демонстрации. Наша репутация строится на слове членов — и это сильнее любой рекламы.
            </p>
          </div>
          <div>
            <div className="font-display text-8xl text-gold/10 font-light leading-none mb-6">04</div>
            <h2 className="font-display text-3xl font-light mb-5">Взаимное уважение</h2>
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide mb-4">
              Все участницы клуба — равноправные члены сообщества. Они выбирают сами, с кем и когда встречаться. Ни одна встреча не происходит без взаимного желания.
            </p>
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide">
              Нарушение этого принципа — немедленное и окончательное исключение из клуба.
            </p>
          </div>
        </div>

        {/* Quote */}
        <div className="border-l-2 border-gold pl-10 py-4 mb-28 max-w-2xl">
          <blockquote className="font-display text-3xl font-light text-foreground leading-relaxed mb-4">
            «Мы не продаём роскошь. Мы создаём пространство, где роскошь — это люди вокруг тебя.»
          </blockquote>
          <cite className="font-ui text-[0.65rem] tracking-[0.2em] uppercase text-gold not-italic">Основатель NOIR</cite>
        </div>

        {/* Safety & Ethics */}
        <div className="bg-card/40 border border-border p-10 mb-16">
          <div className="flex items-center gap-4 mb-6">
            <Icon name="Shield" fallback="Circle" size={20} className="text-gold" />
            <h2 className="font-display text-3xl font-light">Безопасность и этика</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: "Верификация", d: "Все участники клуба проходят проверку личности. Мы знаем, кто находится в клубе." },
              { t: "Анонимность", d: "Личные данные хранятся в зашифрованном виде. Третьи стороны не имеют доступа." },
              { t: "Кодекс", d: "Нарушение этических норм влечёт немедленное исключение без возможности восстановления." },
            ].map(item => (
              <div key={item.t}>
                <div className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-gold mb-2">{item.t}</div>
                <p className="font-ui text-xs font-light text-muted-foreground leading-relaxed tracking-wide">{item.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button onClick={() => navigate("membership")} className="btn-gold">Узнать о членстве</button>
        </div>
      </div>
    </div>
  );
}

/* ─── MEMBERSHIP PAGE ──────────────────────────────────────────────────── */
function MembershipPage({ navigate }: { navigate: (p: Page) => void }) {
  const tiers = [
    {
      name: "Silver",
      subtitle: "Первый шаг",
      desc: "Вход в мир NOIR. Присваивается новым членам клуба после прохождения верификации.",
      color: "border-border",
      textColor: "text-muted-foreground",
      perks: [
        "Доступ к 30% каталога участниц",
        "Приглашения на Silver-события",
        "Персональный менеджер",
        "Мессенджер внутри платформы",
        "Доступ к журналу клуба",
      ],
      how: "Рекомендация действующего члена или лист ожидания"
    },
    {
      name: "Black",
      subtitle: "Элита клуба",
      desc: "Второй уровень для тех, кто активно участвует в жизни клуба и демонстрирует высокие личные стандарты.",
      color: "border-gold",
      textColor: "text-gold",
      perks: [
        "Неограниченный доступ к каталогу",
        "Приоритет на всех мероприятиях",
        "Персональный консьерж 24/7",
        "Право выдавать до 3 инвайтов в год",
        "Доступ к закрытым событиям",
        "Ранний доступ к новым участницам",
      ],
      how: "Присваивается клубом на основе активности и вклада"
    },
    {
      name: "Obsidian",
      subtitle: "Высший уровень",
      desc: "Для тех, кто формирует культуру клуба. Самый редкий уровень — не более 50 человек одновременно.",
      color: "border-gold/60",
      textColor: "text-gold",
      perks: [
        "Всё уровня Black",
        "Участие в закрытых советах клуба",
        "Неограниченные инвайты",
        "VIP-доступ к частным событиям",
        "Статус соучредителя сообщества",
        "Эксклюзивные мероприятия Obsidian",
        "Прямая линия с основателем",
      ],
      how: "Только по решению совета клуба. Нельзя запросить."
    },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <p className="font-ui text-[0.6rem] tracking-[0.5em] uppercase text-gold mb-5">Членство</p>
          <h1 className="font-display text-6xl md:text-7xl font-light mb-8 leading-tight">
            Членство заслуживается.<br/>
            <em className="text-gold not-italic">Не покупается.</em>
          </h1>
          <p className="font-ui text-sm font-light text-muted-foreground max-w-lg mx-auto leading-relaxed tracking-wide">
            В NOIR нет прайс-листа. Ваш уровень — это отражение того, кто вы есть и что вносите в жизнь клуба. Уровень растёт по мере вашего вклада и личных качеств.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {tiers.map((t) => (
            <div key={t.name} className={`border ${t.color} p-10 flex flex-col`}>
              <div>
                <div className={`font-ui text-[0.55rem] tracking-[0.3em] uppercase ${t.textColor} mb-2`}>{t.subtitle}</div>
                <div className="font-display text-4xl font-light mb-4">{t.name}</div>
                <div className="gold-line mb-6" />
                <p className="font-ui text-xs font-light text-muted-foreground leading-relaxed tracking-wide mb-8">{t.desc}</p>
                <div className="space-y-3 mb-8">
                  {t.perks.map(p => (
                    <div key={p} className="flex items-start gap-3">
                      <Icon name="Check" fallback="Circle" size={11} className={`${t.textColor} flex-shrink-0 mt-0.5`} />
                      <span className="font-ui text-xs font-light text-foreground/80 tracking-wide leading-relaxed">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-auto pt-6 border-t border-border">
                <div className="font-ui text-[0.55rem] tracking-[0.15em] uppercase text-muted-foreground mb-2">Как получить</div>
                <p className="font-ui text-xs font-light text-foreground/70 leading-relaxed tracking-wide">{t.how}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Progression */}
        <div className="bg-card/30 border border-border p-12 mb-16">
          <h2 className="font-display text-3xl font-light mb-8">Как растёт ваш уровень</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: "Heart", title: "Участие", desc: "Регулярное посещение событий и активность в клубе" },
              { icon: "Star", title: "Репутация", desc: "Оценки от других членов и участниц после встреч" },
              { icon: "Users", title: "Рекомендации", desc: "Качество людей, которых вы привели в клуб" },
              { icon: "Award", title: "Вклад", desc: "Инициативы, идеи, поддержка культуры клуба" },
            ].map(item => (
              <div key={item.title}>
                <div className="w-9 h-9 border border-border flex items-center justify-center mb-4">
                  <Icon name={item.icon} fallback="Circle" size={14} className="text-gold" />
                </div>
                <h3 className="font-display text-lg font-light mb-2">{item.title}</h3>
                <p className="font-ui text-xs font-light text-muted-foreground leading-relaxed tracking-wide">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Entry paths */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="border border-border p-10">
            <div className="flex items-center gap-3 mb-5">
              <Icon name="Key" fallback="Circle" size={18} className="text-gold" />
              <h2 className="font-display text-2xl font-light">Есть инвайт?</h2>
            </div>
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide mb-6">
              Если у вас есть персональный инвайт-код от действующего члена NOIR — вы уже сделали первый шаг. Перейдите к регистрации.
            </p>
            <button onClick={() => navigate("auth")} className="btn-gold">Активировать инвайт</button>
          </div>
          <div className="border border-border p-10">
            <div className="flex items-center gap-3 mb-5">
              <Icon name="Clock" fallback="Circle" size={18} className="text-gold" />
              <h2 className="font-display text-2xl font-light">Лист ожидания</h2>
            </div>
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide mb-6">
              Нет инвайта? Подайте заявку — расскажите о себе, и мы свяжемся с вами, когда появится возможность.
            </p>
            <button onClick={() => navigate("auth")} className="btn-outline-gold">Подать заявку</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── JOURNAL PAGE ─────────────────────────────────────────────────────── */
type JournalArticle = { id: number; tag: string; title: string; excerpt: string; date: string; img: string; readTime: string; author: string };

const JOURNAL_ARTICLES: JournalArticle[] = [
  { id: 1, tag: "Стиль жизни", title: "Монако в апреле: гид по закрытым событиям сезона", excerpt: "Апрель в Монако — это не Гран-При. Это ещё несколько недель до него, когда город принадлежит тем, кто умеет находить правильные двери.", date: "4 марта 2026", img: SUITE_IMG, readTime: "7 мин", author: "Редакция NOIR" },
  { id: 2, tag: "Гастрономия", title: "Пять ужинов, которые изменили наш взгляд на кухню", excerpt: "Мы провели февраль за столами, о которых не пишут в гидах. Вот что осталось в памяти — и почему.", date: "28 февраля 2026", img: LIFESTYLE_IMG, readTime: "10 мин", author: "Гастрономический редактор" },
  { id: 3, tag: "Философия", title: "Почему настоящая роскошь — это время, а не деньги", excerpt: "Мы перестали считать деньги маркером успеха. Настоящий ресурс — это время, и то, как вы им распоряжаетесь.", date: "20 февраля 2026", img: HERO_IMG, readTime: "5 мин", author: "Основатель NOIR" },
  { id: 4, tag: "Путешествия", title: "Дубай не для туристов: частные маршруты членов клуба", excerpt: "Дубай принято показывать башнями и пляжами. Члены NOIR давно нашли другой город — тихий, закрытый, настоящий.", date: "15 февраля 2026", img: SUITE_IMG, readTime: "8 мин", author: "Travel редактор" },
  { id: 5, tag: "Культура", title: "Искусство как инвестиция: взгляд изнутри", excerpt: "Наш член Obsidian-уровня, арт-дилер с 20-летним опытом, рассказывает, как думать об искусстве как об активе — и как получать от него удовольствие.", date: "8 февраля 2026", img: LIFESTYLE_IMG, readTime: "12 мин", author: "Специальный автор" },
  { id: 6, tag: "Психология", title: "Одиночество на вершине: почему богатые люди ищут сообщество", excerpt: "Парадокс достатка: чем больше у вас есть, тем сложнее найти людей, с которыми это можно разделить по-настоящему.", date: "1 февраля 2026", img: HERO_IMG, readTime: "9 мин", author: "Редакция NOIR" },
];

const ALL_TAGS = ["Все", "Стиль жизни", "Гастрономия", "Философия", "Путешествия", "Культура", "Психология"];

function JournalPage() {
  const [tag, setTag] = useState("Все");
  const [openArticle, setOpenArticle] = useState<JournalArticle | null>(null);

  const filtered = tag === "Все" ? JOURNAL_ARTICLES : JOURNAL_ARTICLES.filter(a => a.tag === tag);

  if (openArticle) {
    return (
      <div className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-8">
          <button onClick={() => setOpenArticle(null)}
            className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-12 font-ui text-xs tracking-[0.2em] uppercase">
            <Icon name="ArrowLeft" fallback="Circle" size={14} />
            Все материалы
          </button>
          <p className="font-ui text-[0.6rem] tracking-[0.35em] uppercase text-gold mb-4">{openArticle.tag}</p>
          <h1 className="font-display text-5xl md:text-6xl font-light leading-tight mb-6">{openArticle.title}</h1>
          <div className="flex items-center gap-6 mb-10">
            <span className="font-ui text-xs text-muted-foreground tracking-wide">{openArticle.author}</span>
            <span className="w-1 h-1 bg-border rounded-full" />
            <span className="font-ui text-xs text-muted-foreground tracking-wide">{openArticle.date}</span>
            <span className="w-1 h-1 bg-border rounded-full" />
            <div className="flex items-center gap-1">
              <Icon name="Clock" fallback="Circle" size={11} className="text-muted-foreground" />
              <span className="font-ui text-xs text-muted-foreground tracking-wide">{openArticle.readTime}</span>
            </div>
          </div>
          <div className="gold-line mb-10" />
          <img src={openArticle.img} alt={openArticle.title} className="w-full aspect-[16/7] object-cover mb-12" />
          <div className="prose-noir max-w-none">
            <p className="font-ui text-sm font-light text-foreground/90 leading-relaxed tracking-wide mb-6 text-lg">
              {openArticle.excerpt}
            </p>
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide mb-6">
              Это не просто слова — это наблюдение, которое сформировалось за годы работы с людьми, у которых есть абсолютно всё. И вот что странно: именно у них часто острее всего ощущение нехватки чего-то важного.
            </p>
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide mb-6">
              NOIR не предлагает решений. Но создаёт пространство, где подобные вопросы задают вслух — и где рядом находятся люди, которые понимают, о чём речь. Без объяснений. Без зависти. Без суждений.
            </p>
            <blockquote className="border-l-2 border-gold pl-8 py-2 my-10">
              <p className="font-display text-2xl font-light text-foreground leading-relaxed">
                «Самая редкая роскошь — это быть собой в компании людей, которым это интересно.»
              </p>
            </blockquote>
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide mb-6">
              Именно поэтому мы не растём быстро. Именно поэтому каждый новый член — это решение, а не транзакция. Качество сообщества — наш главный актив, и мы берём его серьёзно.
            </p>
          </div>
          <div className="gold-line mt-16 mb-10" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-ui text-[0.55rem] tracking-[0.25em] uppercase text-gold border border-gold/30 px-3 py-1">{openArticle.tag}</span>
            </div>
            <button onClick={() => setOpenArticle(null)} className="btn-outline-gold py-2 px-6 text-xs">Вернуться к журналу</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16">
          <p className="font-ui text-[0.6rem] tracking-[0.5em] uppercase text-gold mb-5">Журнал</p>
          <h1 className="font-display text-6xl md:text-7xl font-light mb-6 leading-none">Взгляд изнутри</h1>
          <p className="font-ui text-sm font-light text-muted-foreground max-w-lg leading-relaxed tracking-wide">
            Материалы для людей, которые думают иначе. О жизни, стиле, культуре и людях.
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {ALL_TAGS.map(t => (
            <button key={t} onClick={() => setTag(t)}
              className={`font-ui text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 border transition-all ${tag === t ? "border-gold text-gold bg-gold/5" : "border-border text-muted-foreground hover:border-gold/30"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Featured */}
        {tag === "Все" && (
          <div className="mb-12 group cursor-pointer" onClick={() => setOpenArticle(JOURNAL_ARTICLES[0])}>
            <div className="grid md:grid-cols-2 gap-0 border border-border hover:border-gold/40 transition-all duration-300 overflow-hidden">
              <div className="overflow-hidden aspect-[4/3] md:aspect-auto">
                <img src={JOURNAL_ARTICLES[0].img} alt={JOURNAL_ARTICLES[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-10 flex flex-col justify-center">
                <span className="font-ui text-[0.55rem] tracking-[0.3em] uppercase text-gold border border-gold/30 px-3 py-1 inline-block mb-4 w-fit">Главное</span>
                <h2 className="font-display text-4xl font-light mb-4 leading-snug group-hover:text-gold transition-colors">{JOURNAL_ARTICLES[0].title}</h2>
                <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide mb-6">{JOURNAL_ARTICLES[0].excerpt}</p>
                <div className="flex items-center gap-4">
                  <span className="font-ui text-xs text-muted-foreground">{JOURNAL_ARTICLES[0].date}</span>
                  <span className="font-ui text-xs text-muted-foreground">· {JOURNAL_ARTICLES[0].readTime}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {(tag === "Все" ? filtered.slice(1) : filtered).map((a) => (
            <div key={a.id} className="group cursor-pointer" onClick={() => setOpenArticle(a)}>
              <div className="overflow-hidden mb-5 aspect-[16/10] border border-border">
                <img src={a.img} alt={a.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-ui text-[0.5rem] tracking-[0.25em] uppercase text-gold border border-gold/30 px-2 py-0.5">{a.tag}</span>
                <span className="font-ui text-[0.55rem] text-muted-foreground">{a.readTime}</span>
              </div>
              <h3 className="font-display text-xl font-light mb-2 group-hover:text-gold transition-colors leading-snug">{a.title}</h3>
              <p className="font-ui text-xs font-light text-muted-foreground leading-relaxed tracking-wide mb-3 line-clamp-2">{a.excerpt}</p>
              <span className="font-ui text-[0.6rem] text-muted-foreground tracking-wide">{a.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ABOUT PAGE ───────────────────────────────────────────────────────── */
function AboutPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-20 items-start mb-28">
          <div>
            <p className="font-ui text-[0.6rem] tracking-[0.5em] uppercase text-gold mb-5">О нас</p>
            <h1 className="font-display text-6xl md:text-7xl font-light leading-none mb-8">
              Семь лет.<br/><em className="text-gold not-italic">Одна идея.</em>
            </h1>
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide mb-5">
              NOIR был основан в 2019 году с одной мыслью: собрать в одном месте людей, которые не нуждаются в объяснениях. Тех, кто достиг своего — и хочет жить полностью, а не напоказ.
            </p>
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide mb-5">
              За семь лет клуб вырос до 2 400 членов в шести городах. Мы не рекламировались. Мы не покупали аудиторию. Каждый новый участник пришёл по рекомендации.
            </p>
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide">
              Это медленный рост — и мы им гордимся.
            </p>
          </div>
          <div className="relative">
            <img src={SUITE_IMG} alt="About" className="w-full aspect-square object-cover" />
          </div>
        </div>

        <div className="gold-line mb-20" />

        {/* Team */}
        <div className="mb-24">
          <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-4">Команда</p>
          <h2 className="font-display text-4xl font-light mb-12">Люди за кулисами</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "Александр М.", role: "Основатель", bio: "Предприниматель. Создал NOIR как ответ на вопрос, который сам искал годами." },
              { name: "Елена В.", role: "Директор по развитию", bio: "20 лет в luxury-индустрии. Формирует стандарты клуба." },
              { name: "Кирилл О.", role: "Head of Security", bio: "Специалист по кибербезопасности. Гарантирует конфиденциальность каждого члена." },
              { name: "Мария С.", role: "Директор по клиентам", bio: "Обеспечивает, чтобы каждый член чувствовал себя приоритетом номер один." },
            ].map(p => (
              <div key={p.name} className="border border-border p-7 hover:border-gold/30 transition-all duration-300">
                <div className="w-12 h-12 bg-gold/5 border border-gold/20 flex items-center justify-center mb-5">
                  <span className="font-display text-gold text-lg">{p.name[0]}</span>
                </div>
                <div className="font-display text-xl font-light mb-1">{p.name}</div>
                <div className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-gold mb-4">{p.role}</div>
                <p className="font-ui text-xs font-light text-muted-foreground leading-relaxed tracking-wide">{p.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cities */}
        <div className="mb-24">
          <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-4">Присутствие</p>
          <h2 className="font-display text-4xl font-light mb-12">Шесть городов. Один стандарт.</h2>
          <div className="grid md:grid-cols-3 gap-0 divide-x divide-y divide-border">
            {[
              { city: "Москва", desc: "Штаб-квартира. Открыто с 2019.", members: "800+" },
              { city: "Дубай", desc: "Центральный хаб MENA региона.", members: "400+" },
              { city: "Лондон", desc: "Европейский офис. Открыт с 2021.", members: "350+" },
              { city: "Монако", desc: "Сезонное присутствие. Апрель–октябрь.", members: "200+" },
              { city: "Нью-Йорк", desc: "Американский офис. Открыт с 2022.", members: "400+" },
              { city: "Париж", desc: "Открыт в 2023. Быстро растущий хаб.", members: "250+" },
            ].map(c => (
              <div key={c.city} className="p-8 hover:bg-card/30 transition-colors">
                <div className="font-display text-2xl font-light mb-1">{c.city}</div>
                <div className="font-ui text-[0.6rem] tracking-[0.15em] text-gold uppercase mb-3">{c.members} членов</div>
                <p className="font-ui text-xs font-light text-muted-foreground tracking-wide">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="bg-card/30 border border-border p-14 text-center mb-16">
          <Icon name="Diamond" fallback="Circle" size={24} className="text-gold mx-auto mb-6" />
          <h2 className="font-display text-4xl font-light mb-6 max-w-xl mx-auto leading-tight">
            Наша миссия — создавать пространство, где достойные люди находят друг друга
          </h2>
          <p className="font-ui text-sm font-light text-muted-foreground max-w-md mx-auto leading-relaxed tracking-wide">
            Не сервис. Не агентство. Живое сообщество людей, которые выбирают качество во всём — и в окружении в первую очередь.
          </p>
        </div>

        <div className="text-center">
          <button onClick={() => navigate("membership")} className="btn-gold mr-4">Стать частью NOIR</button>
          <button onClick={() => navigate("contacts")} className="btn-outline-gold">Связаться с нами</button>
        </div>
      </div>
    </div>
  );
}

/* ─── CONTACTS PAGE ────────────────────────────────────────────────────── */
function ContactsPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="max-w-2xl mb-16">
          <p className="font-ui text-[0.6rem] tracking-[0.5em] uppercase text-gold mb-5">Контакты</p>
          <h1 className="font-display text-6xl font-light leading-none mb-6">Свяжитесь<br/><em className="text-gold not-italic">с нами</em></h1>
          <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide">
            Мы отвечаем на все запросы в течение 24 часов. По вопросам членства — только через форму ниже.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            {sent ? (
              <div className="border border-gold/30 bg-gold/5 p-12 text-center">
                <Icon name="CheckCircle" fallback="Circle" size={40} className="text-gold mx-auto mb-5" />
                <h3 className="font-display text-3xl font-light mb-3">Сообщение отправлено</h3>
                <p className="font-ui text-sm font-light text-muted-foreground tracking-wide">
                  Мы свяжемся с вами в течение 24 часов.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Имя</label>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors"
                      placeholder="Ваше имя" required />
                  </div>
                  <div>
                    <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Email</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors"
                      placeholder="your@email.com" required />
                  </div>
                </div>
                <div>
                  <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Тема</label>
                  <select value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}
                    className="w-full bg-background border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors">
                    <option value="">Выберите тему</option>
                    <option>Вопрос о членстве</option>
                    <option>Лист ожидания</option>
                    <option>Партнёрство</option>
                    <option>Пресса и медиа</option>
                    <option>Другое</option>
                  </select>
                </div>
                <div>
                  <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Сообщение</label>
                  <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    rows={6} className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors resize-none"
                    placeholder="Ваш вопрос или предложение..." required />
                </div>
                <button type="submit" className="btn-gold w-full">Отправить сообщение</button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="border border-border p-7">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Mail" fallback="Circle" size={15} className="text-gold" />
                <span className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">Email</span>
              </div>
              <p className="font-ui text-sm font-light text-foreground">concierge@noir.club</p>
              <p className="font-ui text-xs text-muted-foreground mt-1 tracking-wide">Для членов и запросов</p>
            </div>
            <div className="border border-border p-7">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Send" fallback="Circle" size={15} className="text-gold" />
                <span className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">Telegram</span>
              </div>
              <p className="font-ui text-sm font-light text-foreground">@noir_concierge</p>
              <p className="font-ui text-xs text-muted-foreground mt-1 tracking-wide">Только для членов клуба</p>
            </div>
            <div className="border border-border p-7">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Clock" fallback="Circle" size={15} className="text-gold" />
                <span className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">Время ответа</span>
              </div>
              <p className="font-ui text-sm font-light text-foreground">До 24 часов</p>
              <p className="font-ui text-xs text-muted-foreground mt-1 tracking-wide">Для действующих членов — до 2 часов</p>
            </div>
            <div className="border border-gold/20 bg-gold/5 p-7">
              <Icon name="Lock" fallback="Circle" size={15} className="text-gold mb-3" />
              <p className="font-ui text-xs font-light text-muted-foreground leading-relaxed tracking-wide">
                Все обращения строго конфиденциальны. Мы никогда не раскрываем информацию о запросах третьим сторонам.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── AUTH PAGE ────────────────────────────────────────────────────────── */
function AuthPage({ onNavigate, navigate }: { onNavigate: (p: string) => void; navigate: (p: Page) => void }) {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-lg mx-auto px-8">
        <div className="text-center mb-12">
          <div className="font-display text-3xl tracking-[0.3em] text-gold mb-2">NOIR</div>
          <div className="gold-line my-6" />
          <div className="flex justify-center gap-0 border border-border overflow-hidden mb-2">
            {([["login","Войти"],["register","Регистрация"],["waitlist","Лист ожидания"]] as [AuthMode, string][]).map(([m, l]) => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex-1 font-ui text-[0.6rem] tracking-[0.15em] uppercase py-3 transition-all ${mode === m ? "bg-gold text-background" : "text-muted-foreground hover:text-foreground"}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {mode === "login" && <LoginForm onNavigate={onNavigate} />}
        {mode === "register" && <RegisterForm onNavigate={onNavigate} />}
        {mode === "waitlist" && <WaitlistForm navigate={navigate} />}
      </div>
    </div>
  );
}

function LoginForm({ onNavigate }: { onNavigate: (p: string) => void }) {
  const [form, setForm] = useState({ login: "", password: "" });
  const [role, setRole] = useState<"member" | "girl">("member");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate(role);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-card/30 border border-border p-4 mb-6">
        <p className="font-ui text-[0.6rem] tracking-[0.15em] uppercase text-muted-foreground mb-3">Вход как</p>
        <div className="flex gap-3">
          <button type="button" onClick={() => setRole("member")}
            className={`flex-1 py-2 font-ui text-[0.6rem] tracking-[0.15em] uppercase border transition-all ${role === "member" ? "border-gold text-gold bg-gold/5" : "border-border text-muted-foreground"}`}>
            Член клуба
          </button>
          <button type="button" onClick={() => setRole("girl")}
            className={`flex-1 py-2 font-ui text-[0.6rem] tracking-[0.15em] uppercase border transition-all ${role === "girl" ? "border-gold text-gold bg-gold/5" : "border-border text-muted-foreground"}`}>
            Участница
          </button>
        </div>
      </div>
      <div>
        <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Логин</label>
        <input value={form.login} onChange={e => setForm(f => ({ ...f, login: e.target.value }))}
          className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors"
          placeholder="Ваш логин от менеджера" required />
      </div>
      <div>
        <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Пароль</label>
        <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors"
          placeholder="••••••••••" required />
      </div>
      <button type="submit" className="btn-gold w-full mt-2">Войти в NOIR</button>
      <p className="font-ui text-[0.6rem] text-center text-muted-foreground tracking-wide mt-4">
        Логин и пароль выдаются вашим персональным менеджером после верификации
      </p>
    </form>
  );
}

function RegisterForm({ onNavigate }: { onNavigate: (p: string) => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ invite: "", name: "", email: "", city: "", about: "" });

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };
  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  if (step === 3) return (
    <div className="text-center py-8">
      <Icon name="CheckCircle" fallback="Circle" size={48} className="text-gold mx-auto mb-6" />
      <h3 className="font-display text-3xl font-light mb-3">Заявка отправлена</h3>
      <p className="font-ui text-sm font-light text-muted-foreground tracking-wide leading-relaxed">
        Менеджер свяжется с вами в течение 24 часов для подтверждения и выдачи учётных данных.
      </p>
    </div>
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-8">
        {[1, 2].map(n => (
          <div key={n} className={`flex items-center gap-2 ${n > 1 ? "flex-1" : ""}`}>
            {n > 1 && <div className={`flex-1 h-px ${step >= n ? "bg-gold" : "bg-border"}`} />}
            <div className={`w-7 h-7 border flex items-center justify-center font-ui text-[0.6rem] ${step >= n ? "border-gold text-gold" : "border-border text-muted-foreground"}`}>{n}</div>
          </div>
        ))}
      </div>

      {step === 1 && (
        <form onSubmit={handleInvite} className="space-y-5">
          <div>
            <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Инвайт-код</label>
            <input value={form.invite} onChange={e => setForm(f => ({ ...f, invite: e.target.value }))}
              className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors tracking-[0.1em]"
              placeholder="NOIR-XXXX-XXXX" required />
            <p className="font-ui text-[0.6rem] text-muted-foreground tracking-wide mt-2">Получите код от действующего члена клуба</p>
          </div>
          <button type="submit" className="btn-gold w-full">Проверить инвайт</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleFinish} className="space-y-5">
          <p className="font-ui text-[0.6rem] tracking-[0.2em] text-gold uppercase mb-2 flex items-center gap-2">
            <Icon name="Check" fallback="Circle" size={11} />
            Инвайт подтверждён
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Имя</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors"
                placeholder="Ваше имя" required />
            </div>
            <div>
              <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Город</label>
              <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors"
                placeholder="Москва" required />
            </div>
          </div>
          <div>
            <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Email</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors"
              placeholder="your@email.com" required />
          </div>
          <div>
            <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Расскажите о себе</label>
            <textarea value={form.about} onChange={e => setForm(f => ({ ...f, about: e.target.value }))}
              rows={4} className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors resize-none"
              placeholder="Чем занимаетесь, как узнали о NOIR, что ищете в клубе..." required />
          </div>
          <button type="submit" className="btn-gold w-full">Подать заявку</button>
        </form>
      )}
    </div>
  );
}

function WaitlistForm({ navigate }: { navigate: (p: Page) => void }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", city: "", about: "", source: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) return (
    <div className="text-center py-8">
      <Icon name="Clock" fallback="Circle" size={48} className="text-gold mx-auto mb-6" />
      <h3 className="font-display text-3xl font-light mb-3">Вы в листе ожидания</h3>
      <p className="font-ui text-sm font-light text-muted-foreground tracking-wide leading-relaxed">
        Мы рассматриваем каждую заявку вручную. Срок — от 2 до 6 недель. Если ваша кандидатура нас заинтересует — мы свяжемся.
      </p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="border border-gold/20 bg-gold/5 p-4 mb-4">
        <p className="font-ui text-[0.6rem] tracking-wide text-muted-foreground leading-relaxed">
          Нет инвайта — не проблема. Расскажите о себе, и мы рассмотрим вашу кандидатуру самостоятельно. Это займёт время, но мы серьёзно подходим к каждой заявке.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Имя</label>
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors"
            placeholder="Имя" required />
        </div>
        <div>
          <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Город</label>
          <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
            className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors"
            placeholder="Ваш город" required />
        </div>
      </div>
      <div>
        <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Email</label>
        <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors"
          placeholder="your@email.com" required />
      </div>
      <div>
        <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Откуда узнали о NOIR?</label>
        <input value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))}
          className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors"
          placeholder="Имя человека, который рассказал, или источник" />
      </div>
      <div>
        <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Расскажите о себе</label>
        <textarea value={form.about} onChange={e => setForm(f => ({ ...f, about: e.target.value }))}
          rows={5} className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors resize-none"
          placeholder="Кто вы, чем занимаетесь, что ищете в клубе. Чем искреннее — тем лучше." required />
      </div>
      <button type="submit" className="btn-gold w-full">Отправить заявку</button>
    </form>
  );
}
