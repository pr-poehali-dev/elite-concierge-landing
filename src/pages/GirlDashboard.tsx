import { useState } from "react";
import Icon from "@/components/ui/icon";

type GirlSection = "offers" | "messages" | "profile" | "schedule" | "settings" | "manager";

interface GirlDashboardProps {
  onNavigate: (page: string) => void;
}

const MOCK_OFFERS = [
  { id: 1, title: "Вечер в частной галерее", date: "15 марта 2026", location: "Москва, Арбат", host: "Член клуба Black", tags: ["Искусство", "Ужин"], status: "new", hostLevel: "Black" },
  { id: 2, title: "Яхт-вечеринка у берегов Монако", date: "22 марта 2026", location: "Монако, порт Геркулес", host: "Член клуба Obsidian", tags: ["Яхта", "Вечеринка"], status: "new", hostLevel: "Obsidian" },
  { id: 3, title: "Ужин в ресторане Alain Ducasse", date: "28 марта 2026", location: "Париж, Hôtel Plaza Athénée", host: "Член клуба Black", tags: ["Гастрономия"], status: "viewed", hostLevel: "Black" },
  { id: 4, title: "Частный концерт в особняке", date: "5 апреля 2026", location: "Лондон, Белгравия", host: "Член клуба Silver", tags: ["Музыка", "Светская жизнь"], status: "accepted", hostLevel: "Silver" },
  { id: 5, title: "Уикенд в Дубае", date: "12 апреля 2026", location: "Дубай, Пальма Джумейра", host: "Член клуба Obsidian", tags: ["Путешествие", "Яхта", "Пляж"], status: "new", hostLevel: "Obsidian" },
];

const MOCK_SCHEDULE = [
  { date: "15 мар", event: "Галерея на Арбате", status: "confirmed", host: "Black" },
  { date: "22 мар", event: "Яхта, Монако", status: "pending", host: "Obsidian" },
  { date: "5 апр", event: "Концерт, Лондон", status: "confirmed", host: "Silver" },
  { date: "12 апр", event: "Дубай, уикенд", status: "new", host: "Obsidian" },
];

const GIRL_LEVEL_CONFIG = [
  { level: 1, name: "Newcomer", desc: "Только начинаете. Доступны базовые предложения.", color: "text-muted-foreground", events: "0-5 встреч" },
  { level: 2, name: "Rising", desc: "Хороший старт. Больше предложений и выбор событий.", color: "text-blue-400", events: "6-15 встреч" },
  { level: 3, name: "Elite", desc: "Высокий рейтинг. Приоритет на лучшие события.", color: "text-gold", events: "16-30 встреч" },
  { level: 4, name: "Diamond", desc: "Высший уровень. Эксклюзивные предложения Obsidian.", color: "text-purple-400", events: "30+ встреч" },
];

export default function GirlDashboard({ onNavigate }: GirlDashboardProps) {
  const [section, setSection] = useState<GirlSection>("offers");

  const navItems: { key: GirlSection; icon: string; label: string; badge?: number }[] = [
    { key: "offers", icon: "Sparkles", label: "Предложения", badge: 3 },
    { key: "schedule", icon: "Calendar", label: "График" },
    { key: "messages", icon: "MessageSquare", label: "Сообщения", badge: 1 },
    { key: "profile", icon: "User", label: "Профиль" },
    { key: "manager", icon: "Headphones", label: "Менеджер" },
    { key: "settings", icon: "Settings", label: "Настройки" },
  ];

  const currentLevel = 3;
  const levelInfo = GIRL_LEVEL_CONFIG[currentLevel - 1];

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 flex-shrink-0 border-r border-border flex flex-col h-screen sticky top-0">
        <div className="px-6 py-8 border-b border-border">
          <div className="font-display text-xl tracking-[0.3em] text-gold mb-1">NOIR</div>
          <div className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">Личный кабинет</div>
        </div>

        {/* Level badge */}
        <div className="px-4 py-4 border-b border-border">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="ShieldCheck" fallback="Shield" size={12} className="text-gold" />
            <span className="font-ui text-[0.55rem] tracking-[0.15em] uppercase text-gold">Верифицирована</span>
          </div>
          <div className="bg-card border border-border px-3 py-2">
            <div className="flex items-center justify-between mb-1">
              <span className={`font-ui text-[0.6rem] tracking-[0.15em] uppercase ${levelInfo.color}`}>{levelInfo.name}</span>
              <span className="font-ui text-[0.5rem] text-muted-foreground">Уровень {currentLevel}</span>
            </div>
            <div className="h-0.5 bg-border">
              <div className="h-full bg-gold" style={{ width: "65%" }} />
            </div>
          </div>
        </div>

        <nav className="flex-1 py-6">
          {navItems.map((item) => (
            <button key={item.key} onClick={() => setSection(item.key)}
              className={`sidebar-item w-full justify-between ${section === item.key ? "active" : ""}`}>
              <span className="flex items-center gap-3">
                <Icon name={item.icon} fallback="Circle" size={15} />
                {item.label}
              </span>
              {item.badge && (
                <span className="font-ui text-[0.5rem] bg-gold text-background px-1.5 py-0.5 min-w-[18px] text-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-4 py-6 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-gold/10 border border-gold/30 flex items-center justify-center overflow-hidden">
              <span className="font-display text-gold">А</span>
            </div>
            <div>
              <div className="font-ui text-xs text-foreground font-light">Александра К.</div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span className="font-ui text-[0.5rem] text-muted-foreground">Активна</span>
              </div>
            </div>
          </div>
          <button onClick={() => onNavigate("landing")} className="sidebar-item w-full text-left">
            <Icon name="LogOut" fallback="Circle" size={14} />
            Выйти
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="border-b border-border px-10 py-6 flex items-center justify-between sticky top-0 bg-background z-10">
          <div>
            <div className="font-ui text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground mb-1">
              {navItems.find(n => n.key === section)?.label}
            </div>
            <h1 className="font-display text-2xl font-light">
              {section === "offers" && "Актуальные предложения"}
              {section === "schedule" && "Мой график"}
              {section === "messages" && "Сообщения"}
              {section === "profile" && "Мой профиль"}
              {section === "manager" && "Связь с менеджером"}
              {section === "settings" && "Настройки"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 border border-border flex items-center justify-center hover:border-gold/40 transition-colors relative">
              <Icon name="Bell" fallback="Circle" size={15} className="text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-gold rounded-full" />
            </button>
          </div>
        </div>

        <div className="p-10">
          {section === "offers" && <OffersSection offers={MOCK_OFFERS} />}
          {section === "schedule" && <ScheduleSection schedule={MOCK_SCHEDULE} />}
          {section === "messages" && <GirlMessagesSection />}
          {section === "profile" && <GirlProfileSection levelConfig={GIRL_LEVEL_CONFIG} currentLevel={currentLevel} />}
          {section === "manager" && <ManagerSection />}
          {section === "settings" && <GirlSettingsSection />}
        </div>
      </main>
    </div>
  );
}

function OffersSection({ offers }: { offers: typeof MOCK_OFFERS }) {
  const [activeOffer, setActiveOffer] = useState<number | null>(null);
  const [accepted, setAccepted] = useState<number[]>([4]);
  const [declined, setDeclined] = useState<number[]>([]);
  const newCount = offers.filter(o => o.status === "new").length;

  const hostLevelColor = { Silver: "text-muted-foreground", Black: "text-gold", Obsidian: "text-purple-400" };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-10">
        {[
          { label: "Новых", val: newCount, icon: "Sparkles" },
          { label: "Принято", val: accepted.length, icon: "Check" },
          { label: "Всего встреч", val: 12, icon: "Calendar" },
          { label: "Рейтинг", val: "4.9", icon: "Star" },
        ].map(s => (
          <div key={s.label} className="card-dark p-5 flex items-center gap-4">
            <Icon name={s.icon} fallback="Circle" size={16} className="text-gold" />
            <div>
              <div className="font-display text-3xl text-gold font-light">{s.val}</div>
              <div className="font-ui text-[0.55rem] text-muted-foreground tracking-[0.15em] uppercase">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {offers.map((offer) => {
          const isAccepted = accepted.includes(offer.id);
          const isDeclined = declined.includes(offer.id);

          return (
            <div key={offer.id}
              className={`border transition-all duration-300 ${activeOffer === offer.id ? "border-gold" : "border-border hover:border-gold/30"} ${isDeclined ? "opacity-40" : ""}`}>
              <div className="p-6 flex items-start justify-between gap-6 cursor-pointer"
                onClick={() => setActiveOffer(activeOffer === offer.id ? null : offer.id)}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    {offer.status === "new" && !isAccepted && !isDeclined && (
                      <span className="font-ui text-[0.5rem] tracking-[0.2em] uppercase bg-gold text-background px-2 py-0.5">Новое</span>
                    )}
                    {isAccepted && (
                      <span className="font-ui text-[0.5rem] tracking-[0.2em] uppercase bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5">Принято</span>
                    )}
                    {isDeclined && (
                      <span className="font-ui text-[0.5rem] tracking-[0.2em] uppercase bg-muted text-muted-foreground border border-border px-2 py-0.5">Отклонено</span>
                    )}
                    <span className="font-ui text-[0.6rem] text-muted-foreground">{offer.date}</span>
                    <span className={`font-ui text-[0.55rem] tracking-[0.15em] uppercase ${hostLevelColor[offer.hostLevel as keyof typeof hostLevelColor]}`}>
                      {offer.hostLevel}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-light mb-2">{offer.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="MapPin" fallback="Circle" size={11} className="text-muted-foreground" />
                    <span className="font-ui text-xs text-muted-foreground font-light">{offer.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {offer.tags.map(t => (
                      <span key={t} className="font-ui text-[0.5rem] border border-gold/20 text-gold/60 px-2 py-0.5 tracking-wide">{t}</span>
                    ))}
                  </div>
                </div>
                <Icon name={activeOffer === offer.id ? "ChevronUp" : "ChevronDown"} fallback="Circle" size={16} className="text-muted-foreground flex-shrink-0 mt-1" />
              </div>

              {activeOffer === offer.id && (
                <div className="px-6 pb-6 border-t border-border pt-5">
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="font-ui text-[0.6rem] tracking-[0.15em] uppercase text-muted-foreground mb-1">Организатор</div>
                      <div className={`font-ui text-sm font-light ${hostLevelColor[offer.hostLevel as keyof typeof hostLevelColor]}`}>{offer.host}</div>
                    </div>
                    <div>
                      <div className="font-ui text-[0.6rem] tracking-[0.15em] uppercase text-muted-foreground mb-1">Дата</div>
                      <div className="font-ui text-sm font-light text-foreground">{offer.date}</div>
                    </div>
                  </div>
                  <div className="bg-card/40 border border-border p-4 mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Lock" fallback="Circle" size={11} className="text-gold" />
                      <span className="font-ui text-[0.6rem] tracking-[0.15em] uppercase text-gold">Контакты доступны после принятия</span>
                    </div>
                    <p className="font-ui text-xs font-light text-muted-foreground tracking-wide">
                      После принятия предложения ваш менеджер предоставит контакты и детали встречи.
                    </p>
                  </div>
                  {!isAccepted && !isDeclined && (
                    <div className="flex gap-3">
                      <button onClick={() => setAccepted(a => [...a, offer.id])} className="btn-gold flex-1 py-3">Принять предложение</button>
                      <button onClick={() => setDeclined(d => [...d, offer.id])} className="btn-outline-gold px-6 py-3">Отклонить</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScheduleSection({ schedule }: { schedule: typeof MOCK_SCHEDULE }) {
  const statusConfig = {
    confirmed: { label: "Подтверждено", color: "text-green-400", bg: "bg-green-400/10" },
    pending: { label: "Ожидает", color: "text-gold", bg: "bg-gold/10" },
    new: { label: "Новое", color: "text-blue-400", bg: "bg-blue-400/10" },
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="border border-border p-7">
          <div className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground mb-2">Ближайшее событие</div>
          <h3 className="font-display text-2xl font-light mb-1">Галерея на Арбате</h3>
          <div className="flex items-center gap-2">
            <Icon name="Calendar" fallback="Circle" size={12} className="text-gold" />
            <span className="font-ui text-sm text-muted-foreground font-light">15 марта 2026</span>
          </div>
        </div>
        <div className="border border-border p-7">
          <div className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground mb-2">Этот месяц</div>
          <div className="font-display text-5xl text-gold font-light mb-1">{schedule.length}</div>
          <div className="font-ui text-xs text-muted-foreground tracking-wide">запланированных событий</div>
        </div>
      </div>

      <div className="border border-border overflow-hidden">
        <div className="px-7 py-4 border-b border-border">
          <h2 className="font-display text-xl font-light">Расписание</h2>
        </div>
        <div className="divide-y divide-border">
          {schedule.map((s, i) => {
            const st = statusConfig[s.status as keyof typeof statusConfig];
            return (
              <div key={i} className="px-7 py-5 flex items-center justify-between hover:bg-card/20 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="w-12 text-center">
                    <div className="font-display text-2xl text-gold font-light">{s.date.split(" ")[0]}</div>
                    <div className="font-ui text-[0.55rem] text-muted-foreground uppercase tracking-wide">{s.date.split(" ")[1]}</div>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div>
                    <div className="font-ui text-sm font-light text-foreground mb-0.5">{s.event}</div>
                    <div className="font-ui text-[0.6rem] text-muted-foreground tracking-wide">Член клуба {s.host}</div>
                  </div>
                </div>
                <span className={`font-ui text-[0.55rem] tracking-[0.15em] uppercase ${st.color} ${st.bg} px-3 py-1`}>{st.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GirlMessagesSection() {
  const [msg, setMsg] = useState("");
  const messages = [
    { from: "me", text: "Добрый день! Хотела уточнить детали встречи в пятницу.", time: "09:10" },
    { from: "other", text: "Добрый! Всё по плану. Встреча в галерее в 19:30. Дресс-код: smart casual. Адрес пришлю за день.", time: "09:45" },
    { from: "me", text: "Отлично, спасибо! Что-то нужно взять с собой?", time: "09:50" },
    { from: "other", text: "Ничего особого. Просто будьте собой — это всегда лучший выбор.", time: "10:05" },
  ];

  return (
    <div className="flex gap-6 h-[75vh]">
      <div className="w-72 flex-shrink-0 border border-border flex flex-col">
        <div className="px-5 py-4 border-b border-border">
          <span className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">Переписка</span>
        </div>
        {[
          { name: "Менеджер NOIR", last: "Всё по плану. Встреча в галерее...", time: "10:05", unread: 1, avatar: "N" },
        ].map((c, i) => (
          <div key={i} className="px-5 py-4 border-b border-border bg-gold/5 border-l-2 border-l-gold">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gold/10 border border-gold/20 flex items-center justify-center">
                <span className="font-display text-gold text-sm">{c.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-ui text-xs font-light text-foreground">{c.name}</span>
                  <span className="font-ui text-[0.55rem] text-muted-foreground">{c.time}</span>
                </div>
                <p className="font-ui text-[0.6rem] text-muted-foreground truncate">{c.last}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="px-5 py-4 border-b border-border opacity-50">
          <p className="font-ui text-[0.6rem] text-muted-foreground text-center tracking-wide">
            Переписка с членами клуба появляется после одобрения встречи
          </p>
        </div>
      </div>

      <div className="flex-1 border border-border flex flex-col">
        <div className="px-7 py-4 border-b border-border flex items-center gap-3">
          <div className="w-8 h-8 bg-gold/10 border border-gold/20 flex items-center justify-center">
            <span className="font-display text-gold text-sm">N</span>
          </div>
          <div>
            <div className="font-ui text-xs font-light text-foreground">Менеджер NOIR</div>
            <div className="font-ui text-[0.55rem] text-muted-foreground">Ваш персональный менеджер</div>
          </div>
        </div>
        <div className="flex-1 p-7 overflow-auto space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              {m.from !== "me" && (
                <div className="w-7 h-7 bg-gold/10 border border-gold/20 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <span className="font-display text-gold text-xs">N</span>
                </div>
              )}
              <div className={`px-5 py-3 max-w-[65%] ${m.from === "me" ? "bg-gold/10 border border-gold/20" : "bg-card border border-border"}`}>
                <p className="font-ui text-xs font-light text-foreground leading-relaxed tracking-wide">{m.text}</p>
                <span className="font-ui text-[0.5rem] text-muted-foreground mt-1 block">{m.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="px-7 py-4 border-t border-border flex gap-3">
          <input value={msg} onChange={e => setMsg(e.target.value)}
            className="flex-1 bg-transparent border border-border px-4 py-3 font-ui text-xs font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors"
            placeholder="Написать менеджеру..." />
          <button onClick={() => setMsg("")} className="btn-gold px-5 py-3">
            <Icon name="Send" fallback="Circle" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function GirlProfileSection({ levelConfig, currentLevel }: { levelConfig: typeof GIRL_LEVEL_CONFIG; currentLevel: number }) {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Александра Крылова", age: "24", city: "Москва", height: "172",
    bio: "Увлекаюсь современным искусством и гастрономией. Люблю нестандартные форматы встреч и людей с историей.",
    interests: ["Галереи", "Рестораны Мишлен", "Театр", "Яхты", "Кино"],
    languages: ["Русский", "English"],
    availability: ["Москва", "Дубай"],
  });

  const levelInfo = levelConfig[currentLevel - 1];

  return (
    <div className="max-w-3xl">
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-6">
          <div className="relative w-20 h-20">
            <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop"
              alt="Фото" className="w-full h-full object-cover" />
            {editing && (
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center cursor-pointer hover:bg-background/80 transition-colors">
                <Icon name="Camera" fallback="Circle" size={16} className="text-gold" />
              </div>
            )}
          </div>
          <div>
            <h2 className="font-display text-3xl font-light">{profile.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Icon name="ShieldCheck" fallback="Circle" size={12} className="text-gold" />
              <span className="font-ui text-xs text-gold tracking-wide">Верифицирована</span>
              <span className="text-border">·</span>
              <span className={`font-ui text-xs ${levelInfo.color} tracking-wide`}>{levelInfo.name}</span>
            </div>
          </div>
        </div>
        <button onClick={() => setEditing(!editing)} className={editing ? "btn-gold py-2 px-5" : "btn-outline-gold py-2 px-5"}>
          {editing ? "Сохранить" : "Редактировать"}
        </button>
      </div>

      {/* Level progress */}
      <div className="border border-border p-7 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl font-light">Мой уровень</h3>
          <span className={`font-ui text-[0.6rem] tracking-[0.15em] uppercase ${levelInfo.color}`}>{levelInfo.name} · {currentLevel}/4</span>
        </div>
        <div className="flex gap-2 mb-5">
          {levelConfig.map((l) => (
            <div key={l.level} className={`flex-1 h-1.5 ${l.level <= currentLevel ? "bg-gold" : "bg-border"}`} />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {levelConfig.map(l => (
            <div key={l.level} className={`p-4 border ${l.level === currentLevel ? "border-gold/50 bg-gold/5" : "border-border opacity-50"}`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`font-ui text-[0.6rem] tracking-[0.15em] uppercase ${l.color}`}>{l.name}</span>
                {l.level === currentLevel && <span className="font-ui text-[0.5rem] tracking-wide text-gold">◆ Ваш уровень</span>}
              </div>
              <p className="font-ui text-[0.6rem] text-muted-foreground tracking-wide leading-relaxed">{l.desc}</p>
              <div className="font-ui text-[0.55rem] text-muted-foreground/60 mt-1">{l.events}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-3 gap-4">
          {[
            { label: "Встреч", val: "12" },
            { label: "Рейтинг", val: "4.9" },
            { label: "Отзывов", val: "10" },
          ].map(s => (
            <div key={s.label} className="text-center border border-border py-4">
              <div className="font-display text-3xl text-gold font-light">{s.val}</div>
              <div className="font-ui text-[0.55rem] text-muted-foreground tracking-wide uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Основная информация */}
      <div className="border border-border p-7 mb-5 space-y-5">
        <h3 className="font-display text-xl font-light border-b border-border pb-4">Основная информация</h3>
        {[
          { label: "Имя", field: "name" as const },
          { label: "Возраст", field: "age" as const },
          { label: "Город", field: "city" as const },
          { label: "Рост (см)", field: "height" as const },
        ].map(item => (
          <div key={item.label}>
            <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">{item.label}</label>
            {editing ? (
              <input value={profile[item.field]} onChange={e => setProfile(p => ({ ...p, [item.field]: e.target.value }))}
                className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors" />
            ) : (
              <div className="font-ui text-sm font-light text-foreground">{profile[item.field]}</div>
            )}
          </div>
        ))}
        <div>
          <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">О себе</label>
          {editing ? (
            <textarea value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
              rows={4} className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors resize-none" />
          ) : (
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide">{profile.bio}</p>
          )}
        </div>
      </div>

      {/* Interests & availability */}
      <div className="grid grid-cols-2 gap-5 mb-5">
        <div className="border border-border p-7">
          <h3 className="font-display text-xl font-light mb-4">Интересы</h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map(i => (
              <span key={i} className="font-ui text-[0.55rem] tracking-[0.15em] uppercase border border-gold/30 text-gold/80 px-3 py-1">{i}</span>
            ))}
          </div>
        </div>
        <div className="border border-border p-7">
          <h3 className="font-display text-xl font-light mb-4">Города</h3>
          <div className="flex flex-wrap gap-2">
            {profile.availability.map(c => (
              <span key={c} className="font-ui text-[0.55rem] tracking-[0.15em] uppercase border border-border text-muted-foreground px-3 py-1">{c}</span>
            ))}
          </div>
          <div className="mt-4">
            <div className="font-ui text-[0.55rem] tracking-[0.15em] uppercase text-muted-foreground mb-2">Языки</div>
            <div className="flex gap-2">
              {profile.languages.map(l => (
                <span key={l} className="font-ui text-[0.55rem] border border-border text-muted-foreground px-3 py-1">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Фото галерея */}
      <div className="border border-border p-7">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-xl font-light">Фотографии</h3>
          {editing && (
            <button className="font-ui text-[0.6rem] tracking-[0.15em] uppercase text-gold border border-gold/30 px-3 py-1.5 hover:bg-gold/5 transition-colors flex items-center gap-2">
              <Icon name="Plus" fallback="Circle" size={11} />
              Добавить
            </button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[1,2,3,4].map(i => (
            <div key={i} className={`aspect-square overflow-hidden border border-border ${i === 4 && editing ? "border-dashed border-gold/30 flex items-center justify-center bg-gold/5 cursor-pointer" : ""}`}>
              {i < 4 ? (
                <img src={`https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&q=${i * 20}`}
                  alt="" className="w-full h-full object-cover" />
              ) : editing ? (
                <Icon name="Plus" fallback="Circle" size={20} className="text-gold/50" />
              ) : (
                <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop"
                  alt="" className="w-full h-full object-cover opacity-60" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ManagerSection() {
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const messages = [
    { from: "manager", text: "Добрый день, Александра! Я ваш персональный менеджер. Готова помочь по любым вопросам.", time: "09:00" },
    { from: "manager", text: "На следующей неделе у вас два предложения. Хотите, я помогу с выбором?", time: "09:01" },
  ];

  return (
    <div className="max-w-2xl">
      <div className="border border-gold/20 bg-gold/5 p-7 mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gold/10 border border-gold/30 flex items-center justify-center">
            <Icon name="User" fallback="Circle" size={18} className="text-gold" />
          </div>
          <div>
            <h3 className="font-display text-xl font-light">Ваш персональный менеджер</h3>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              <span className="font-ui text-xs text-muted-foreground">Онлайн · Обычно отвечает в течение 15 минут</span>
            </div>
          </div>
        </div>
        <p className="font-ui text-xs font-light text-muted-foreground leading-relaxed tracking-wide">
          Ваш менеджер доступен 7 дней в неделю. Вы можете обсудить любые вопросы: предложения, график, предпочтения или просто получить совет.
        </p>
      </div>

      <div className="border border-border h-80 flex flex-col mb-4">
        <div className="flex-1 p-6 overflow-auto space-y-4">
          {messages.map((m, i) => (
            <div key={i} className="flex gap-3">
              {m.from === "manager" && (
                <div className="w-7 h-7 bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="User" fallback="Circle" size={11} className="text-gold" />
                </div>
              )}
              <div className="bg-card border border-border px-5 py-3 max-w-[80%]">
                <p className="font-ui text-xs font-light text-foreground leading-relaxed tracking-wide">{m.text}</p>
                <span className="font-ui text-[0.5rem] text-muted-foreground mt-1 block">{m.time}</span>
              </div>
            </div>
          ))}
          {sent && (
            <div className="flex justify-end">
              <div className="bg-gold/10 border border-gold/20 px-5 py-3 max-w-[80%]">
                <p className="font-ui text-xs font-light text-foreground leading-relaxed tracking-wide">{msg}</p>
                <span className="font-ui text-[0.5rem] text-muted-foreground mt-1 block">Только что</span>
              </div>
            </div>
          )}
        </div>
        <div className="px-5 py-4 border-t border-border flex gap-3">
          <input value={sent ? "" : msg} onChange={e => { setMsg(e.target.value); setSent(false); }}
            className="flex-1 bg-transparent border border-border px-4 py-3 font-ui text-xs font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors"
            placeholder="Написать менеджеру..." />
          <button onClick={() => { if (msg) setSent(true); }} className="btn-gold px-5 py-3">
            <Icon name="Send" fallback="Circle" size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: "Calendar", label: "Обсудить график" },
          { icon: "HelpCircle", label: "Задать вопрос" },
          { icon: "Flag", label: "Сообщить о проблеме" },
        ].map(btn => (
          <button key={btn.label} className="border border-border p-5 hover:border-gold/40 transition-all group text-center">
            <Icon name={btn.icon} fallback="Circle" size={16} className="text-muted-foreground group-hover:text-gold transition-colors mx-auto mb-2" />
            <span className="font-ui text-[0.6rem] tracking-wide text-muted-foreground group-hover:text-foreground transition-colors">{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function GirlSettingsSection() {
  const [notifications, setNotifications] = useState({
    newOffers: true, messages: true, manager: true, news: false,
  });
  const [privacy, setPrivacy] = useState({ showOnline: true, showCity: true });
  const [preferences, setPreferences] = useState({
    cities: ["Москва", "Дубай"],
    formats: ["Ужин", "Мероприятия"],
    minLevel: "Silver",
  });

  return (
    <div className="max-w-2xl space-y-6">
      {/* Preferences */}
      <div className="border border-border p-8">
        <h2 className="font-display text-2xl font-light mb-6">Предпочтения</h2>
        <div className="space-y-5">
          <div>
            <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-3">Минимальный уровень участника</label>
            <div className="flex gap-2">
              {["Silver", "Black", "Obsidian"].map(l => (
                <button key={l} onClick={() => setPreferences(p => ({ ...p, minLevel: l }))}
                  className={`font-ui text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 border transition-all ${preferences.minLevel === l ? "border-gold text-gold bg-gold/5" : "border-border text-muted-foreground"}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-3">Форматы встреч</label>
            <div className="flex flex-wrap gap-2">
              {["Ужин", "Мероприятия", "Путешествия", "Яхты", "Деловые"].map(f => (
                <button key={f} onClick={() => setPreferences(p => ({
                  ...p, formats: p.formats.includes(f) ? p.formats.filter(x => x !== f) : [...p.formats, f]
                }))} className={`font-ui text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 border transition-all ${preferences.formats.includes(f) ? "border-gold text-gold bg-gold/5" : "border-border text-muted-foreground"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="border border-border p-8">
        <h2 className="font-display text-2xl font-light mb-6">Уведомления</h2>
        <div className="space-y-4">
          {[
            { key: "newOffers" as const, label: "Новые предложения" },
            { key: "messages" as const, label: "Сообщения" },
            { key: "manager" as const, label: "Сообщения от менеджера" },
            { key: "news" as const, label: "Новости и журнал NOIR" },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <span className="font-ui text-sm font-light text-foreground tracking-wide">{item.label}</span>
              <button onClick={() => setNotifications(n => ({ ...n, [item.key]: !n[item.key] }))}
                className={`w-10 h-5 rounded-full transition-all relative ${notifications[item.key] ? "bg-gold" : "bg-border"}`}>
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${notifications[item.key] ? "right-0.5" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div className="border border-border p-8">
        <h2 className="font-display text-2xl font-light mb-6">Приватность</h2>
        <div className="space-y-4">
          {[
            { key: "showOnline" as const, label: "Показывать статус онлайн" },
            { key: "showCity" as const, label: "Показывать город в профиле" },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <span className="font-ui text-sm font-light text-foreground tracking-wide">{item.label}</span>
              <button onClick={() => setPrivacy(p => ({ ...p, [item.key]: !p[item.key] }))}
                className={`w-10 h-5 rounded-full transition-all relative ${privacy[item.key] ? "bg-gold" : "bg-border"}`}>
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${privacy[item.key] ? "right-0.5" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-border p-8">
        <h2 className="font-display text-2xl font-light mb-2">Безопасность</h2>
        <p className="font-ui text-xs text-muted-foreground tracking-wide mb-5">Управление паролем аккаунта</p>
        <button className="font-ui text-xs tracking-[0.15em] uppercase border border-border text-muted-foreground px-5 py-3 hover:border-gold/40 transition-colors flex items-center gap-2">
          <Icon name="Key" fallback="Circle" size={13} />
          Сменить пароль
        </button>
      </div>
    </div>
  );
}
