import { useState } from "react";
import Icon from "@/components/ui/icon";

type GirlSection = "offers" | "messages" | "profile" | "settings" | "manager";

interface GirlDashboardProps {
  onNavigate: (page: string) => void;
}

const MOCK_OFFERS = [
  { id: 1, title: "Вечер в частной галерее", date: "15 марта 2026", location: "Москва, Арбат", host: "Член клуба Black", reward: "Закрытая информация", tags: ["Искусство", "Ужин"], status: "new" },
  { id: 2, title: "Яхт-вечеринка у берегов Монако", date: "22 марта 2026", location: "Монако, порт Геркулес", host: "Член клуба Obsidian", reward: "Закрытая информация", tags: ["Яхта", "Вечеринка"], status: "new" },
  { id: 3, title: "Ужин в ресторане Alain Ducasse", date: "28 марта 2026", location: "Париж, Hôtel Plaza Athénée", host: "Член клуба Black", reward: "Закрытая информация", tags: ["Гастрономия"], status: "viewed" },
  { id: 4, title: "Частный концерт в особняке", date: "5 апреля 2026", location: "Лондон, Белгравия", host: "Член клуба Silver", reward: "Закрытая информация", tags: ["Музыка", "Светская жизнь"], status: "viewed" },
];

export default function GirlDashboard({ onNavigate }: GirlDashboardProps) {
  const [section, setSection] = useState<GirlSection>("offers");

  const navItems: { key: GirlSection; icon: string; label: string }[] = [
    { key: "offers", icon: "Sparkles", label: "Предложения" },
    { key: "messages", icon: "MessageSquare", label: "Сообщения" },
    { key: "profile", icon: "User", label: "Профиль" },
    { key: "settings", icon: "Settings", label: "Настройки" },
    { key: "manager", icon: "HeadphonesIcon", label: "Менеджер" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* SIDEBAR */}
      <aside className="w-64 flex-shrink-0 border-r border-border flex flex-col h-screen sticky top-0">
        <div className="px-6 py-8 border-b border-border">
          <div className="font-display text-xl tracking-[0.3em] text-gold mb-1">NOIR</div>
          <div className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">Личный кабинет</div>
        </div>

        {/* Verification badge */}
        <div className="px-4 py-4 border-b border-border">
          <div className="flex items-center gap-2 bg-gold/5 border border-gold/20 px-3 py-2">
            <Icon name="ShieldCheck" fallback="Shield" size={12} className="text-gold" />
            <span className="font-ui text-[0.55rem] tracking-[0.15em] uppercase text-gold">Верифицирована</span>
          </div>
        </div>

        <nav className="flex-1 py-6">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              className={`sidebar-item w-full ${section === item.key ? "active" : ""}`}
            >
              <Icon name={item.icon} fallback="Circle" size={15} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-4 py-6 border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gold/10 border border-gold/20 flex items-center justify-center overflow-hidden">
              <span className="font-display text-gold text-sm">А</span>
            </div>
            <div>
              <div className="font-ui text-xs text-foreground font-light">Александра К.</div>
              <div className="font-ui text-[0.55rem] text-muted-foreground uppercase tracking-wide">Активна</div>
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
              {navItems.find(n => n.key === section)?.label}
            </div>
            <h1 className="font-display text-2xl font-light">
              {section === "offers" && "Актуальные предложения"}
              {section === "messages" && "Сообщения"}
              {section === "profile" && "Мой профиль"}
              {section === "settings" && "Настройки"}
              {section === "manager" && "Связь с менеджером"}
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
          {section === "messages" && <GirlMessagesSection />}
          {section === "profile" && <GirlProfileSection />}
          {section === "settings" && <GirlSettingsSection />}
          {section === "manager" && <ManagerSection />}
        </div>
      </main>
    </div>
  );
}

function OffersSection({ offers }: { offers: typeof MOCK_OFFERS }) {
  const [activeOffer, setActiveOffer] = useState<number | null>(null);
  const newCount = offers.filter(o => o.status === "new").length;

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="card-dark p-6 text-center">
          <div className="font-display text-4xl text-gold font-light mb-2">{newCount}</div>
          <div className="font-ui text-[0.6rem] text-muted-foreground tracking-[0.15em] uppercase">Новых предложений</div>
        </div>
        <div className="card-dark p-6 text-center">
          <div className="font-display text-4xl text-gold font-light mb-2">8</div>
          <div className="font-ui text-[0.6rem] text-muted-foreground tracking-[0.15em] uppercase">Принято</div>
        </div>
        <div className="card-dark p-6 text-center">
          <div className="font-display text-4xl text-gold font-light mb-2">4.9</div>
          <div className="font-ui text-[0.6rem] text-muted-foreground tracking-[0.15em] uppercase">Рейтинг</div>
        </div>
      </div>

      <div className="space-y-4">
        {offers.map((offer) => (
          <div key={offer.id}
            className={`border transition-all duration-300 cursor-pointer ${activeOffer === offer.id ? "border-gold bg-gold/3" : "border-border hover:border-gold/30"} ${offer.status === "new" ? "" : "opacity-70"}`}
            onClick={() => setActiveOffer(activeOffer === offer.id ? null : offer.id)}>
            <div className="p-6 flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {offer.status === "new" && (
                    <span className="font-ui text-[0.5rem] tracking-[0.2em] uppercase bg-gold text-background px-2 py-0.5">Новое</span>
                  )}
                  <span className="font-ui text-[0.6rem] text-muted-foreground">{offer.date}</span>
                </div>
                <h3 className="font-display text-xl font-light mb-2">{offer.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="MapPin" fallback="Circle" size={11} className="text-muted-foreground" />
                  <span className="font-ui text-xs text-muted-foreground font-light">{offer.location}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {offer.tags.map(t => (
                    <span key={t} className="font-ui text-[0.55rem] border border-gold/20 text-gold/60 px-2 py-0.5 tracking-wide">{t}</span>
                  ))}
                </div>
              </div>
              <Icon name={activeOffer === offer.id ? "ChevronUp" : "ChevronDown"} fallback="Circle" size={16} className="text-muted-foreground flex-shrink-0 mt-1" />
            </div>
            {activeOffer === offer.id && (
              <div className="px-6 pb-6 border-t border-border pt-5 animate-fade-up" style={{ animationFillMode: "forwards" }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Icon name="User" fallback="Circle" size={12} className="text-muted-foreground" />
                    <span className="font-ui text-xs text-muted-foreground font-light">{offer.host}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="btn-gold flex-1">Принять предложение</button>
                  <button className="btn-outline-gold flex-1">Задать вопрос</button>
                  <button className="font-ui text-[0.6rem] uppercase tracking-[0.15em] px-6 text-muted-foreground hover:text-foreground transition-colors">Отклонить</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function GirlMessagesSection() {
  const messages = [
    { id: 1, from: "Ваш менеджер Ирина", text: "Добрый день! Проверьте новое предложение от члена Black.", time: "11:20", unread: true },
    { id: 2, from: "NOIR Support", text: "Ваш профиль прошёл обновление верификации.", time: "Вчера", unread: false },
  ];
  const [active, setActive] = useState<number | null>(1);

  return (
    <div className="flex gap-6 h-[70vh]">
      <div className="w-72 flex-shrink-0 border border-border overflow-auto">
        {messages.map((m) => (
          <div key={m.id} onClick={() => setActive(m.id)}
            className={`p-4 border-b border-border cursor-pointer transition-colors ${active === m.id ? "bg-gold/5 border-l-2 border-l-gold" : "hover:bg-card"}`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`font-ui text-xs font-light ${m.unread ? "text-foreground" : "text-muted-foreground"}`}>{m.from}</span>
              <span className="font-ui text-[0.55rem] text-muted-foreground">{m.time}</span>
            </div>
            <p className="font-ui text-[0.65rem] text-muted-foreground truncate">{m.text}</p>
            {m.unread && <div className="w-1.5 h-1.5 bg-gold rounded-full mt-1" />}
          </div>
        ))}
      </div>
      <div className="flex-1 border border-border flex flex-col">
        {active ? (
          <>
            <div className="p-5 border-b border-border">
              <div className="font-ui text-sm font-light">{messages.find(m => m.id === active)?.from}</div>
            </div>
            <div className="flex-1 p-6 overflow-auto">
              <div className="bg-card border border-border p-4 max-w-sm">
                <p className="font-ui text-xs font-light text-muted-foreground leading-relaxed">
                  {messages.find(m => m.id === active)?.text}
                </p>
                <span className="font-ui text-[0.55rem] text-muted-foreground mt-2 block">{messages.find(m => m.id === active)?.time}</span>
              </div>
            </div>
            <div className="p-4 border-t border-border flex gap-3">
              <input className="flex-1 bg-muted border border-border px-4 py-2.5 text-xs font-ui font-light focus:outline-none focus:border-gold/50 transition-colors" placeholder="Ответить..." />
              <button className="btn-gold px-4 py-2">
                <Icon name="Send" fallback="ArrowRight" size={14} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground font-ui text-xs tracking-wide">
            Выберите диалог
          </div>
        )}
      </div>
    </div>
  );
}

function GirlProfileSection() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-start gap-8 mb-12">
        <div className="relative">
          <div className="w-24 h-24 bg-gold/10 border border-gold/20 flex items-center justify-center overflow-hidden">
            <span className="font-display text-5xl text-gold font-light">А</span>
          </div>
          <button className="absolute -bottom-2 -right-2 w-7 h-7 bg-gold flex items-center justify-center">
            <Icon name="Camera" fallback="Edit" size={11} className="text-background" />
          </button>
        </div>
        <div className="flex-1">
          <h2 className="font-display text-3xl font-light mb-1">Александра Кравцова</h2>
          <div className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-gold mb-3">Верифицирована · Активна</div>
          <div className="flex items-center gap-2">
            <Icon name="Star" fallback="Circle" size={12} className="text-gold" />
            <span className="font-ui text-xs text-muted-foreground">4.9 рейтинг</span>
          </div>
        </div>
        <button className="btn-outline-gold py-2">Редактировать</button>
      </div>

      <div className="grid gap-px bg-border mb-8">
        {[
          { label: "Возраст", value: "24 года" },
          { label: "Город", value: "Москва" },
          { label: "Рост", value: "172 см" },
          { label: "Языки", value: "Русский, English, Français" },
          { label: "Образование", value: "МГУ, юридический" },
          { label: "О себе", value: "Увлекаюсь искусством, путешествиями, гастрономией" },
        ].map((f) => (
          <div key={f.label} className="bg-background flex items-center justify-between p-5">
            <span className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">{f.label}</span>
            <span className="font-ui text-sm font-light">{f.value}</span>
          </div>
        ))}
      </div>

      <div className="border border-border p-6 mb-6">
        <h3 className="font-display text-xl font-light mb-4">Предпочтения мероприятий</h3>
        <div className="flex flex-wrap gap-2">
          {["Искусство", "Гастрономия", "Путешествия", "Культура", "Светские события", "Яхты"].map(t => (
            <span key={t} className="font-ui text-[0.6rem] tracking-wide border border-gold/30 text-gold/70 px-3 py-1.5 cursor-pointer hover:border-gold hover:text-gold transition-colors">{t}</span>
          ))}
        </div>
      </div>

      <div className="border border-border p-6">
        <h3 className="font-display text-xl font-light mb-4">Фотографии профиля</h3>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="aspect-square bg-muted border border-border flex items-center justify-center">
              <Icon name="Image" fallback="Circle" size={16} className="text-muted-foreground" />
            </div>
          ))}
          <div className="aspect-square border border-dashed border-gold/30 flex items-center justify-center cursor-pointer hover:border-gold/60 transition-colors">
            <Icon name="Plus" fallback="Circle" size={16} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}

function GirlSettingsSection() {
  const [privacy, setPrivacy] = useState(true);
  const [visible, setVisible] = useState(true);

  return (
    <div className="max-w-xl space-y-8">
      <div className="border border-border p-8">
        <h3 className="font-display text-2xl font-light mb-6">Видимость профиля</h3>
        <div className="space-y-5">
          {[
            { label: "Профиль активен", desc: "Виден членам клуба", val: visible, set: setVisible },
            { label: "Приватный режим", desc: "Только прямые приглашения", val: privacy, set: setPrivacy },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between">
              <div>
                <div className="font-ui text-xs font-light">{s.label}</div>
                <div className="font-ui text-[0.6rem] text-muted-foreground tracking-wide">{s.desc}</div>
              </div>
              <button onClick={() => s.set(!s.val)}
                className={`w-10 h-5 relative transition-colors ${s.val ? "bg-gold" : "bg-muted"}`}>
                <span className={`absolute top-0.5 w-4 h-4 bg-background transition-transform ${s.val ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-border p-8">
        <h3 className="font-display text-2xl font-light mb-6">Уведомления</h3>
        <div className="space-y-4 text-xs font-ui font-light text-muted-foreground">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="accent-gold" />
            <span>Новые предложения</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="accent-gold" />
            <span>Сообщения от менеджера</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="accent-gold" />
            <span>Email-дайджест (еженедельно)</span>
          </label>
        </div>
      </div>
    </div>
  );
}

function ManagerSection() {
  return (
    <div className="max-w-2xl">
      <div className="border border-gold/20 bg-gold/5 p-8 mb-8">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-16 h-16 bg-gold/10 border border-gold/20 flex items-center justify-center">
            <span className="font-display text-3xl text-gold font-light">И</span>
          </div>
          <div>
            <h3 className="font-display text-2xl font-light">Ирина Смирнова</h3>
            <div className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-gold">Ваш персональный менеджер</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              <span className="font-ui text-[0.6rem] text-muted-foreground">Сейчас онлайн</span>
            </div>
          </div>
        </div>
        <p className="font-ui text-xs text-muted-foreground font-light leading-relaxed tracking-wide mb-5">
          Я всегда готова помочь с любыми вопросами — от технических до личных. Пишите в любое время.
        </p>
        <div className="flex gap-3">
          <button className="btn-gold flex-1 py-2.5">Написать сообщение</button>
          <button className="btn-outline-gold py-2.5 px-5">
            <Icon name="Phone" fallback="Circle" size={14} />
          </button>
        </div>
      </div>
      <div className="border border-border p-8">
        <h3 className="font-display text-2xl font-light mb-6">Отправить запрос</h3>
        <div className="space-y-4">
          <div>
            <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Тема</label>
            <select className="w-full bg-muted border border-border px-4 py-3 text-xs font-ui font-light text-foreground focus:outline-none focus:border-gold/50 transition-colors">
              <option>Вопрос о предложении</option>
              <option>Изменение профиля</option>
              <option>Технический вопрос</option>
              <option>Другое</option>
            </select>
          </div>
          <div>
            <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Сообщение</label>
            <textarea className="w-full bg-muted border border-border px-4 py-3 text-xs font-ui font-light tracking-wide focus:outline-none focus:border-gold/50 transition-colors h-28 resize-none" placeholder="Опишите ваш вопрос..." />
          </div>
          <button className="btn-gold">Отправить</button>
        </div>
      </div>
    </div>
  );
}
