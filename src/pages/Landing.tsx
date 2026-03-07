import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/41bc0668-f498-4798-94c6-bfbfd41c0775/files/93888d34-e36c-4c3a-9be6-8ee94d1aaa8c.jpg";
const LIFESTYLE_IMG = "https://cdn.poehali.dev/projects/41bc0668-f498-4798-94c6-bfbfd41c0775/files/b03dd757-bf0a-4561-8ded-9aefd8898383.jpg";
const SUITE_IMG = "https://cdn.poehali.dev/projects/41bc0668-f498-4798-94c6-bfbfd41c0775/files/3664e9ef-75a4-4def-84a6-f596c6f80e23.jpg";

type Page = "home" | "philosophy" | "membership" | "journal" | "about" | "faq" | "press" | "careers" | "privacy" | "contacts" | "security";

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
      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : ""}`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-20">
          <button onClick={() => navigate("home")} className="font-display text-xl tracking-[0.3em] text-gold font-light uppercase">
            NOIR
          </button>
          <div className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => navigate(item.key as Page)}
                className={`font-ui text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-300 ${activePage === item.key ? "text-gold" : "text-muted-foreground hover:text-foreground"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate("member")} className="hidden md:block btn-outline-gold text-xs">
              Войти
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-muted-foreground hover:text-gold transition-colors">
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border px-8 py-6 flex flex-col gap-5">
            {NAV_ITEMS.map((item) => (
              <button key={item.key} onClick={() => navigate(item.key as Page)}
                className="font-ui text-[0.65rem] tracking-[0.2em] uppercase text-left text-muted-foreground hover:text-gold transition-colors">
                {item.label}
              </button>
            ))}
            <button onClick={() => onNavigate("member")} className="btn-outline-gold text-xs w-full mt-2">Войти</button>
          </div>
        )}
      </nav>

      {/* PAGES */}
      {activePage === "home" && <HomePage navigate={navigate} onNavigate={onNavigate} />}
      {activePage === "philosophy" && <PhilosophyPage />}
      {activePage === "membership" && <MembershipPage onNavigate={onNavigate} />}
      {activePage === "journal" && <JournalPage />}
      {activePage === "about" && <AboutPage />}
      {activePage === "faq" && <FAQPage />}
      {activePage === "press" && <PressPage />}
      {activePage === "careers" && <CareersPage />}
      {activePage === "privacy" && <PrivacyPage />}
      {activePage === "contacts" && <ContactsPage />}
      {activePage === "security" && <SecurityPage />}

      {/* FOOTER */}
      <footer className="border-t border-border mt-24">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="font-display text-2xl text-gold tracking-[0.3em] mb-4">NOIR</div>
              <p className="text-muted-foreground text-xs font-ui font-light leading-relaxed tracking-wide">
                Элитный международный<br/>консьерж-сервис
              </p>
            </div>
            <div>
              <div className="font-ui text-[0.6rem] tracking-[0.25em] uppercase text-gold mb-4">Клуб</div>
              <div className="flex flex-col gap-3">
                {["Философия", "Членство", "Журнал", "О нас"].map(l => (
                  <button key={l} onClick={() => navigate(l === "Философия" ? "philosophy" : l === "Членство" ? "membership" : l === "Журнал" ? "journal" : "about")}
                    className="text-muted-foreground text-xs font-ui font-light hover:text-gold transition-colors text-left tracking-wide">{l}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-ui text-[0.6rem] tracking-[0.25em] uppercase text-gold mb-4">Компания</div>
              <div className="flex flex-col gap-3">
                {[["press", "Пресса"], ["careers", "Карьера"], ["contacts", "Контакты"], ["security", "Безопасность"]].map(([k, l]) => (
                  <button key={k} onClick={() => navigate(k as Page)}
                    className="text-muted-foreground text-xs font-ui font-light hover:text-gold transition-colors text-left tracking-wide">{l}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-ui text-[0.6rem] tracking-[0.25em] uppercase text-gold mb-4">Контакт</div>
              <div className="flex flex-col gap-3 text-muted-foreground text-xs font-ui font-light">
                <span>+7 (495) 000-00-00</span>
                <span>concierge@noir.club</span>
                <span>Москва · Дубай · Лондон</span>
                <span>Монако · Нью-Йорк</span>
              </div>
            </div>
          </div>
          <div className="gold-line mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-[0.6rem] font-ui tracking-[0.15em] uppercase">
              © 2026 NOIR Concierge Society. Все права защищены.
            </p>
            <button onClick={() => navigate("privacy")}
              className="text-muted-foreground text-[0.6rem] font-ui tracking-[0.15em] uppercase hover:text-gold transition-colors">
              Политика конфиденциальности
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ navigate, onNavigate }: { navigate: (p: Page) => void; onNavigate: (p: string) => void }) {
  return (
    <>
      {/* HERO */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="NOIR" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-background/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 pt-20">
          <div className="max-w-xl">
            <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-8 opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
              Членство по приглашению
            </p>
            <h1 className="font-display text-6xl md:text-8xl font-light text-foreground leading-none mb-6 opacity-0 animate-fade-up delay-200" style={{ animationFillMode: 'forwards' }}>
              Жизнь<br />
              <em className="text-gold not-italic">без</em><br />
              границ
            </h1>
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide max-w-sm mb-12 opacity-0 animate-fade-up delay-300" style={{ animationFillMode: 'forwards' }}>
              Международный консьерж-сервис для тех, кто ценит абсолютную эксклюзивность. Доступ к невозможному — наша специализация.
            </p>
            <div className="flex gap-4 flex-wrap opacity-0 animate-fade-up delay-400" style={{ animationFillMode: 'forwards' }}>
              <button onClick={() => navigate("membership")} className="btn-gold">Подать заявку</button>
              <button onClick={() => navigate("philosophy")} className="btn-outline-gold">Узнать больше</button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 animate-fade-in delay-600" style={{ animationFillMode: 'forwards' }}>
          <span className="font-ui text-[0.55rem] tracking-[0.3em] uppercase text-muted-foreground">Прокрутить</span>
          <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {[
              { num: "12", label: "Лет безупречной репутации" },
              { num: "47", label: "Городов присутствия" },
              { num: "2 400+", label: "Членов клуба" },
              { num: "24/7", label: "Персональный менеджер" },
            ].map((s) => (
              <div key={s.label} className="py-12 px-8 border-r border-border last:border-r-0 text-center">
                <div className="font-display text-5xl text-gold font-light mb-3">{s.num}</div>
                <div className="font-ui text-[0.65rem] text-muted-foreground tracking-[0.15em] uppercase leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-4">Что мы делаем</p>
            <h2 className="font-display text-5xl md:text-6xl font-light">Ваш личный<br /><em className="text-gold not-italic">запрос — наш приоритет</em></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              { icon: "Plane", title: "Путешествия", desc: "Частные перелёты, яхты, закрытые острова. Весь мир — по вашему расписанию." },
              { icon: "Star", title: "События", desc: "Закрытые вечера, премьеры, аукционы Christie's. Доступ туда, куда нет входа для других." },
              { icon: "Shield", title: "Безопасность", desc: "Личная охрана, верификация окружения, конфиденциальность переговоров." },
              { icon: "Home", title: "Недвижимость", desc: "Виллы, пентхаусы, исторические резиденции. По всему миру — без посредников." },
              { icon: "Heart", title: "Здоровье", desc: "Лучшие клиники мира, персональные врачи, превентивная медицина." },
              { icon: "Gem", title: "Люкс-услуги", desc: "Ювелирные дома, haute couture, кастомные автомобили — только оригинал." },
            ].map((s) => (
              <div key={s.title} className="bg-background p-10 group hover:bg-card transition-colors duration-300">
                <div className="w-10 h-10 flex items-center justify-center mb-6 border border-border group-hover:border-gold/40 transition-colors">
                  <Icon name={s.icon} fallback="Star" size={16} className="text-gold" />
                </div>
                <h3 className="font-display text-2xl font-light mb-3 group-hover:text-gold transition-colors">{s.title}</h3>
                <p className="font-ui text-xs text-muted-foreground font-light leading-relaxed tracking-wide">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIFESTYLE IMAGE */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img src={LIFESTYLE_IMG} alt="Lifestyle" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            <div>
              <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-6">Наш подход</p>
              <h2 className="font-display text-4xl md:text-5xl font-light leading-tight mb-8">
                Мы не выполняем<br />
                запросы. Мы<br />
                <em className="text-gold not-italic">предугадываем</em><br />
                желания.
              </h2>
              <div className="gold-line w-16 mb-8" />
              <p className="font-ui text-sm text-muted-foreground font-light leading-relaxed tracking-wide mb-6">
                Каждый член NOIR получает персонального менеджера, который живёт в его часовом поясе, говорит на его языке и знает его предпочтения наизусть.
              </p>
              <p className="font-ui text-sm text-muted-foreground font-light leading-relaxed tracking-wide mb-10">
                Мы не агентство. Мы — расширение вашей жизни.
              </p>
              <button onClick={() => navigate("philosophy")} className="btn-outline-gold">Наша философия</button>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={SUITE_IMG} alt="Suite" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
          <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-6">Ограниченный доступ</p>
          <h2 className="font-display text-5xl md:text-7xl font-light mb-6">
            Готовы стать<br />
            <em className="text-gold not-italic">членом клуба?</em>
          </h2>
          <p className="font-ui text-sm text-muted-foreground font-light leading-relaxed tracking-wide max-w-lg mx-auto mb-12">
            Членство в NOIR открыто только по приглашению или рекомендации действующего члена клуба. Список ожидания ограничен.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => navigate("membership")} className="btn-gold">Подать заявку</button>
            <button onClick={() => navigate("contacts")} className="btn-outline-gold">Связаться с нами</button>
          </div>
        </div>
      </section>
    </>
  );
}

function PhilosophyPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-8">
        <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-6">Философия</p>
        <h1 className="font-display text-6xl md:text-7xl font-light leading-none mb-16">
          Абсолютная<br /><em className="text-gold not-italic">дискретность</em>
        </h1>
        <div className="gold-line w-24 mb-16" />
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <p className="font-ui text-sm font-light leading-relaxed tracking-wide text-muted-foreground">
              NOIR был создан с единственной миссией: дать людям с безупречным вкусом доступ к тому, что недоступно никому другому. Не за деньги — за принадлежность к кругу.
            </p>
            <p className="font-ui text-sm font-light leading-relaxed tracking-wide text-muted-foreground">
              Мы верим, что истинная роскошь — это не вещи. Это время. Это возможность жить так, как ты хочешь, без ограничений и компромиссов.
            </p>
          </div>
          <div className="space-y-8">
            <p className="font-ui text-sm font-light leading-relaxed tracking-wide text-muted-foreground">
              Наши члены — предприниматели, артисты, политики, наследники. Люди, чьи имена не произносят вслух. Именно для них мы работаем — незаметно, точно, безупречно.
            </p>
            <p className="font-ui text-sm font-light leading-relaxed tracking-wide text-muted-foreground">
              Три принципа, которые никогда не меняются: конфиденциальность, совершенство, скорость.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-border mt-20">
          {[
            { title: "Конфиденциальность", desc: "Ни одно имя, ни один запрос не покидает наш круг. Никогда." },
            { title: "Совершенство", desc: "Мы не принимаем «достаточно хорошо». Только безупречное." },
            { title: "Скорость", desc: "Ваш запрос — наш приоритет прямо сейчас, в эту минуту." },
          ].map((p) => (
            <div key={p.title} className="bg-background p-10">
              <div className="w-8 h-px bg-gold mb-6" />
              <h3 className="font-display text-2xl font-light mb-4">{p.title}</h3>
              <p className="font-ui text-xs text-muted-foreground font-light leading-relaxed tracking-wide">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MembershipPage({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-8">
        <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-6">Членство</p>
        <h1 className="font-display text-6xl md:text-7xl font-light leading-none mb-16">
          Три уровня<br /><em className="text-gold not-italic">принадлежности</em>
        </h1>
        <div className="gold-line w-24 mb-16" />
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {[
            {
              tier: "Silver", price: "€ 25 000", period: "в год",
              features: ["Персональный менеджер", "24/7 поддержка", "Доступ к закрытым событиям", "Travel-консьерж", "Верификация партнёров"],
              note: "Вступление по приглашению"
            },
            {
              tier: "Black", price: "€ 75 000", period: "в год",
              features: ["Всё из Silver", "Приоритетный доступ", "Личный ассистент 24/7", "Медицинский консьерж", "Юридическое сопровождение", "Охрана по запросу"],
              note: "Ограничено 200 членами", highlight: true
            },
            {
              tier: "Obsidian", price: "По запросу", period: "",
              features: ["Без ограничений", "Команда под запрос", "Приоритет над всеми", "Анонимность гарантирована", "Персональный офис"],
              note: "5 мест. Только по рекомендации"
            },
          ].map((m) => (
            <div key={m.tier} className={`bg-background p-10 relative ${m.highlight ? "ring-1 ring-gold/40" : ""}`}>
              {m.highlight && <div className="absolute top-0 left-0 right-0 h-px bg-gold" />}
              <div className="font-ui text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-2">{m.tier}</div>
              <div className="font-display text-4xl font-light mb-1">{m.price}</div>
              {m.period && <div className="font-ui text-xs text-muted-foreground mb-8">{m.period}</div>}
              {!m.period && <div className="mb-8" />}
              <div className="space-y-3 mb-10">
                {m.features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-gold rounded-full flex-shrink-0" />
                    <span className="font-ui text-xs text-muted-foreground font-light tracking-wide">{f}</span>
                  </div>
                ))}
              </div>
              <div className="gold-line mb-6" />
              <p className="font-ui text-[0.6rem] text-muted-foreground tracking-[0.15em] uppercase mb-6">{m.note}</p>
              <button onClick={() => {}} className={m.highlight ? "btn-gold w-full" : "btn-outline-gold w-full"}>
                Подать заявку
              </button>
            </div>
          ))}
        </div>
        <div className="mt-16 p-10 card-dark text-center">
          <p className="font-ui text-xs text-muted-foreground font-light tracking-wide mb-4">
            Уже являетесь членом? Войдите в личный кабинет
          </p>
          <button onClick={() => onNavigate("member")} className="btn-outline-gold">Войти в кабинет</button>
        </div>
      </div>
    </div>
  );
}

function JournalPage() {
  const articles = [
    { cat: "Путешествия", title: "Марракеш без туристов: резиденция Бернара Кушнера", date: "15 февраля 2026" },
    { cat: "Гастрономия", title: "Стол у шеф-повара: три ужина, которых не существует в меню", date: "8 февраля 2026" },
    { cat: "Искусство", title: "Частная коллекция Пино: что остаётся за закрытыми дверями", date: "1 февраля 2026" },
    { cat: "Яхты", title: "Средиземное море в феврале: маршрут для тех, кто избегает толпы", date: "24 января 2026" },
    { cat: "Мода", title: "Haute Couture без показа: личный визит к Демне", date: "17 января 2026" },
    { cat: "Недвижимость", title: "Вилла на мысе Антиб: что значит жить у воды круглый год", date: "10 января 2026" },
  ];
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-8">
        <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-6">Журнал</p>
        <h1 className="font-display text-6xl font-light leading-none mb-16">
          Избранное<br /><em className="text-gold not-italic">для избранных</em>
        </h1>
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {articles.map((a) => (
            <div key={a.title} className="bg-background p-10 group cursor-pointer hover:bg-card transition-colors">
              <div className="font-ui text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3">{a.cat}</div>
              <h3 className="font-display text-2xl font-light leading-snug mb-4 group-hover:text-gold transition-colors">{a.title}</h3>
              <div className="flex items-center justify-between">
                <span className="font-ui text-[0.6rem] text-muted-foreground tracking-wide">{a.date}</span>
                <Icon name="ArrowRight" size={14} className="text-muted-foreground group-hover:text-gold transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-8">
        <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-6">О нас</p>
        <h1 className="font-display text-6xl font-light leading-none mb-16">
          Основаны в тишине.<br /><em className="text-gold not-italic">Работаем в тени.</em>
        </h1>
        <div className="gold-line w-24 mb-16" />
        <div className="space-y-6 mb-20">
          <p className="font-ui text-sm font-light leading-relaxed tracking-wide text-muted-foreground">
            NOIR основан в 2014 году группой людей, которые сами были участниками консьерж-сервисов и понимали, чего им не хватало. Безупречности. Настоящей.
          </p>
          <p className="font-ui text-sm font-light leading-relaxed tracking-wide text-muted-foreground">
            Штаб-квартиры в Москве, Дубае и Лондоне. Представительства в 47 городах мира. Команда из 340 человек — бывших дипломатов, военных, управляющих luxury-отелей, финансистов.
          </p>
          <p className="font-ui text-sm font-light leading-relaxed tracking-wide text-muted-foreground">
            Мы никогда не рекламировались. Рост — только через рекомендации. Это и есть лучшая верификация качества.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {[
            { num: "340", label: "Специалистов" },
            { num: "47", label: "Городов" },
            { num: "12", label: "Лет работы" },
          ].map((s) => (
            <div key={s.label} className="bg-background p-10 text-center">
              <div className="font-display text-5xl text-gold font-light mb-3">{s.num}</div>
              <div className="font-ui text-[0.6rem] text-muted-foreground tracking-[0.2em] uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    { q: "Как стать членом NOIR?", a: "Членство доступно только по приглашению действующего члена клуба или по рекомендации. Вы также можете оставить заявку в листе ожидания — мы свяжемся при наличии мест." },
    { q: "Сколько стоит членство?", a: "Базовое членство Silver стартует от €25 000 в год. Уровни Black и Obsidian — по запросу. В стоимость входят все базовые сервисы и персональный менеджер." },
    { q: "Как обеспечивается конфиденциальность?", a: "Все сотрудники NOIR подписывают пожизненные NDA. Данные хранятся на изолированных серверах в юрисдикциях с наивысшей защитой. Никакие данные не передаются третьим лицам ни при каких условиях." },
    { q: "В каких городах работает NOIR?", a: "Основные офисы: Москва, Дубай, Лондон, Монако, Нью-Йорк. Представители — в 47 городах по всему миру. Мы работаем везде, где вы находитесь." },
    { q: "Можно ли отменить членство?", a: "Членство ежегодное. Вы можете не продлевать его в конце периода. Возврат средств за неиспользованный период рассматривается индивидуально." },
    { q: "Есть ли семейное членство?", a: "Да. К членству можно добавить супруга(у) и детей старше 18 лет. Условия — по запросу у вашего менеджера." },
  ];
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-8">
        <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-6">FAQ</p>
        <h1 className="font-display text-6xl font-light leading-none mb-16">Частые<br /><em className="text-gold not-italic">вопросы</em></h1>
        <div className="gold-line w-24 mb-12" />
        <div className="divide-y divide-border">
          {items.map((item, i) => (
            <div key={i} className="py-6">
              <button className="w-full flex items-center justify-between text-left gap-6" onClick={() => setOpen(open === i ? null : i)}>
                <span className="font-ui text-sm font-light tracking-wide">{item.q}</span>
                <Icon name={open === i ? "Minus" : "Plus"} size={14} className="text-gold flex-shrink-0" />
              </button>
              {open === i && (
                <p className="font-ui text-xs text-muted-foreground font-light leading-relaxed tracking-wide mt-4 pr-8 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PressPage() {
  const press = [
    { pub: "Forbes", title: "NOIR: сервис, о котором не говорят", year: "2025" },
    { pub: "The Financial Times", title: "Inside the world's most secretive concierge club", year: "2025" },
    { pub: "Tatler Russia", title: "Невидимый сервис для видимых людей", year: "2024" },
    { pub: "Business Insider", title: "The concierge services you can't Google", year: "2024" },
    { pub: "Vogue Business", title: "Ultra-luxury concierge: the new black", year: "2024" },
    { pub: "Коммерсантъ", title: "Невидимые помощники: как работают элитные консьержи", year: "2023" },
  ];
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-8">
        <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-6">Пресса</p>
        <h1 className="font-display text-6xl font-light leading-none mb-16">
          Нас<br /><em className="text-gold not-italic">цитируют</em>
        </h1>
        <div className="gold-line w-24 mb-12" />
        <div className="divide-y divide-border">
          {press.map((p) => (
            <div key={p.title} className="py-8 flex items-center justify-between gap-6 group cursor-pointer">
              <div>
                <div className="font-ui text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-2">{p.pub}</div>
                <h3 className="font-display text-xl font-light group-hover:text-gold transition-colors">{p.title}</h3>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-ui text-[0.6rem] text-muted-foreground">{p.year}</span>
                <Icon name="ExternalLink" size={12} className="text-muted-foreground group-hover:text-gold transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CareersPage() {
  const jobs = [
    { title: "Старший персональный менеджер", loc: "Дубай", type: "Full-time" },
    { title: "Travel Specialist", loc: "Лондон", type: "Full-time" },
    { title: "Менеджер по развитию", loc: "Москва", type: "Full-time" },
    { title: "VIP Event Coordinator", loc: "Монако", type: "Full-time" },
  ];
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-8">
        <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-6">Карьера</p>
        <h1 className="font-display text-6xl font-light leading-none mb-10">
          Работа на<br /><em className="text-gold not-italic">высшем уровне</em>
        </h1>
        <p className="font-ui text-sm text-muted-foreground font-light leading-relaxed tracking-wide mb-16 max-w-lg">
          Мы ищем исключительных людей — тех, кто умеет работать безупречно, держать слово и мыслить на несколько шагов вперёд.
        </p>
        <div className="divide-y divide-border mb-16">
          {jobs.map((j) => (
            <div key={j.title} className="py-8 flex items-center justify-between gap-6 group">
              <div>
                <h3 className="font-display text-xl font-light mb-1 group-hover:text-gold transition-colors">{j.title}</h3>
                <div className="flex gap-4">
                  <span className="font-ui text-[0.6rem] text-muted-foreground tracking-wide">{j.loc}</span>
                  <span className="font-ui text-[0.6rem] text-muted-foreground tracking-wide">·</span>
                  <span className="font-ui text-[0.6rem] text-muted-foreground tracking-wide">{j.type}</span>
                </div>
              </div>
              <button className="btn-outline-gold text-xs">Откликнуться</button>
            </div>
          ))}
        </div>
        <div className="card-dark p-10">
          <p className="font-display text-xl font-light mb-3">Не нашли подходящую позицию?</p>
          <p className="font-ui text-xs text-muted-foreground font-light tracking-wide mb-6">Отправьте резюме — мы всегда в поиске людей с безупречным бэкграундом.</p>
          <button className="btn-gold">Отправить резюме</button>
        </div>
      </div>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-8">
        <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-6">Правовая информация</p>
        <h1 className="font-display text-5xl font-light leading-none mb-16">Политика конфиденциальности</h1>
        <div className="gold-line w-24 mb-12" />
        <div className="space-y-10 font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide">
          {[
            { title: "1. Сбор данных", text: "Мы собираем только те данные, которые необходимы для оказания услуг: имя, контактная информация, платёжные реквизиты. Никакие данные не собираются без явного согласия пользователя." },
            { title: "2. Хранение и защита", text: "Все данные хранятся на изолированных серверах с шифрованием AES-256. Мы используем многоуровневую аутентификацию и регулярные аудиты безопасности независимыми организациями." },
            { title: "3. Передача третьим лицам", text: "NOIR никогда не продаёт и не передаёт персональные данные третьим лицам. Исключение — случаи, прямо предусмотренные законодательством, и только в минимально необходимом объёме." },
            { title: "4. Права пользователей", text: "Вы имеете право на доступ к своим данным, их исправление, удаление и переносимость. Запросы обрабатываются в течение 72 часов через вашего персонального менеджера." },
            { title: "5. Cookies", text: "Сайт использует технические cookies для корректной работы. Аналитические cookies используются только с вашего согласия и могут быть отключены в настройках браузера." },
          ].map((s) => (
            <div key={s.title}>
              <h3 className="font-display text-xl font-light text-foreground mb-3">{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-8">
        <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-6">Контакты</p>
        <h1 className="font-display text-6xl font-light leading-none mb-16">
          Мы всегда<br /><em className="text-gold not-italic">на связи</em>
        </h1>
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-12">
            {[
              { city: "Москва", addr: "Тверская ул., 20", phone: "+7 (495) 000-00-00", email: "moscow@noir.club" },
              { city: "Дубай", addr: "DIFC, Gate Village 3", phone: "+971 4 000-0000", email: "dubai@noir.club" },
              { city: "Лондон", addr: "Mayfair, Berkeley Sq.", phone: "+44 20 0000-0000", email: "london@noir.club" },
            ].map((office) => (
              <div key={office.city}>
                <div className="font-ui text-[0.6rem] tracking-[0.3em] uppercase text-gold mb-3">{office.city}</div>
                <div className="font-ui text-xs text-muted-foreground font-light space-y-1 tracking-wide">
                  <p>{office.addr}</p>
                  <p>{office.phone}</p>
                  <p>{office.email}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="card-dark p-10">
            <h3 className="font-display text-2xl font-light mb-8">Написать нам</h3>
            <div className="space-y-4">
              <div>
                <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Имя</label>
                <input className="w-full bg-muted border border-border px-4 py-3 text-xs font-ui font-light tracking-wide focus:outline-none focus:border-gold/50 transition-colors" placeholder="Ваше имя" />
              </div>
              <div>
                <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Email</label>
                <input className="w-full bg-muted border border-border px-4 py-3 text-xs font-ui font-light tracking-wide focus:outline-none focus:border-gold/50 transition-colors" placeholder="email@example.com" />
              </div>
              <div>
                <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Сообщение</label>
                <textarea className="w-full bg-muted border border-border px-4 py-3 text-xs font-ui font-light tracking-wide focus:outline-none focus:border-gold/50 transition-colors h-28 resize-none" placeholder="Ваш запрос..." />
              </div>
              <button className="btn-gold w-full mt-2">Отправить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecurityPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-8">
        <p className="font-ui text-[0.6rem] tracking-[0.4em] uppercase text-gold mb-6">Безопасность</p>
        <h1 className="font-display text-6xl font-light leading-none mb-16">
          Ваши данные —<br /><em className="text-gold not-italic">под нашей защитой</em>
        </h1>
        <div className="gold-line w-24 mb-16" />
        <div className="grid md:grid-cols-2 gap-px bg-border mb-16">
          {[
            { icon: "Lock", title: "AES-256 шифрование", desc: "Все данные зашифрованы военным стандартом на всех этапах передачи и хранения." },
            { icon: "Eye", title: "Zero-Knowledge", desc: "Даже наши сотрудники не имеют доступа к данным, которые вы не раскрываете лично." },
            { icon: "ShieldCheck", title: "ISO 27001", desc: "Сертифицированная система управления информационной безопасностью." },
            { icon: "Server", title: "Изолированные серверы", desc: "Данные хранятся в закрытых дата-центрах в юрисдикциях с наивысшей защитой." },
          ].map((s) => (
            <div key={s.title} className="bg-background p-10">
              <div className="w-10 h-10 flex items-center justify-center mb-6 border border-border">
                <Icon name={s.icon} fallback="Shield" size={16} className="text-gold" />
              </div>
              <h3 className="font-display text-xl font-light mb-3">{s.title}</h3>
              <p className="font-ui text-xs text-muted-foreground font-light leading-relaxed tracking-wide">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="card-dark p-10 text-center">
          <p className="font-display text-2xl font-light mb-3">Обнаружили уязвимость?</p>
          <p className="font-ui text-xs text-muted-foreground font-light tracking-wide mb-6">Свяжитесь с нашей командой безопасности. Мы рассмотрим каждое сообщение.</p>
          <a href="mailto:security@noir.club" className="btn-outline-gold inline-block">security@noir.club</a>
        </div>
      </div>
    </div>
  );
}