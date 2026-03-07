import { useState } from "react";
import Icon from "@/components/ui/icon";

type MemberSection = "girls" | "messages" | "concierge" | "profile" | "settings";

interface MemberDashboardProps {
  onNavigate: (page: string) => void;
}

const MOCK_GIRLS = [
  { id: 1, name: "Александра", age: 24, city: "Москва", status: "online", tags: ["Светская жизнь", "Путешествия"], img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop" },
  { id: 2, name: "Виктория", age: 26, city: "Дубай", status: "online", tags: ["Бизнес", "Спорт"], img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop" },
  { id: 3, name: "Елена", age: 23, city: "Лондон", status: "offline", tags: ["Искусство", "Мода"], img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop" },
  { id: 4, name: "Анастасия", age: 25, city: "Монако", status: "online", tags: ["Яхты", "Гастрономия"], img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop" },
  { id: 5, name: "Мария", age: 27, city: "Нью-Йорк", status: "offline", tags: ["Финансы", "Культура"], img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop" },
  { id: 6, name: "Диана", age: 22, city: "Париж", status: "online", tags: ["Мода", "Путешествия"], img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop" },
];

const MOCK_MESSAGES = [
  { id: 1, from: "Персональный менеджер", text: "Добрый день! Ваш столик в Eleven Madison Park подтверждён на 19:00.", time: "10:32", unread: true },
  { id: 2, from: "Александра К.", text: "Рада встрече на вечере в пятницу!", time: "09:15", unread: true },
  { id: 3, from: "Travel Desk", text: "Борт готов. Вылет из Шереметьево в 14:00, ангар B.", time: "Вчера", unread: false },
  { id: 4, from: "Виктория М.", text: "Спасибо за чудесный вечер ✦", time: "Вчера", unread: false },
];

export default function MemberDashboard({ onNavigate }: MemberDashboardProps) {
  const [section, setSection] = useState<MemberSection>("girls");
  const [selectedGirl, setSelectedGirl] = useState<number | null>(null);

  const navItems: { key: MemberSection; icon: string; label: string }[] = [
    { key: "girls", icon: "Users", label: "Девушки" },
    { key: "messages", icon: "MessageSquare", label: "Сообщения" },
    { key: "concierge", icon: "Star", label: "Консьерж" },
    { key: "profile", icon: "User", label: "Профиль" },
    { key: "settings", icon: "Settings", label: "Настройки" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* SIDEBAR */}
      <aside className="w-64 flex-shrink-0 border-r border-border flex flex-col h-screen sticky top-0">
        <div className="px-6 py-8 border-b border-border">
          <div className="font-display text-xl tracking-[0.3em] text-gold mb-1">NOIR</div>
          <div className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">Member Dashboard</div>
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
            <div className="w-8 h-8 bg-gold/10 border border-gold/20 flex items-center justify-center">
              <span className="font-display text-gold text-sm">A</span>
            </div>
            <div>
              <div className="font-ui text-xs text-foreground font-light">Алексей В.</div>
              <div className="font-ui text-[0.55rem] text-muted-foreground uppercase tracking-wide">Black Member</div>
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
        {/* Header */}
        <div className="border-b border-border px-10 py-6 flex items-center justify-between sticky top-0 bg-background z-10">
          <div>
            <div className="font-ui text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground mb-1">
              {navItems.find(n => n.key === section)?.label}
            </div>
            <h1 className="font-display text-2xl font-light">
              {section === "girls" && "Актуальные профили"}
              {section === "messages" && "Входящие сообщения"}
              {section === "concierge" && "Консьерж-сервис"}
              {section === "profile" && "Мой профиль"}
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
          {section === "girls" && <GirlsSection girls={MOCK_GIRLS} selected={selectedGirl} onSelect={setSelectedGirl} />}
          {section === "messages" && <MessagesSection messages={MOCK_MESSAGES} />}
          {section === "concierge" && <ConciergeSection />}
          {section === "profile" && <MemberProfileSection />}
          {section === "settings" && <MemberSettingsSection />}
        </div>
      </main>
    </div>
  );
}

function GirlsSection({ girls, selected, onSelect }: { girls: typeof MOCK_GIRLS; selected: number | null; onSelect: (id: number) => void }) {
  const [filter, setFilter] = useState("all");
  const cities = ["all", "Москва", "Дубай", "Лондон", "Монако", "Нью-Йорк", "Париж"];

  return (
    <div>
      <div className="flex gap-2 mb-8 flex-wrap">
        {cities.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`font-ui text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 border transition-all ${filter === c ? "border-gold text-gold bg-gold/5" : "border-border text-muted-foreground hover:border-gold/30"}`}>
            {c === "all" ? "Все города" : c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {girls.filter(g => filter === "all" || g.city === filter).map((girl) => (
          <div key={girl.id} onClick={() => onSelect(girl.id === selected ? null : girl.id)}
            className={`group cursor-pointer overflow-hidden border transition-all duration-300 ${selected === girl.id ? "border-gold" : "border-border hover:border-gold/40"}`}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <img src={girl.img} alt={girl.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <div className="absolute top-3 right-3">
                <span className={`w-2 h-2 rounded-full block ${girl.status === "online" ? "bg-green-400" : "bg-muted-foreground"}`} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="font-display text-lg font-light">{girl.name}, {girl.age}</div>
                <div className="font-ui text-[0.6rem] text-muted-foreground tracking-wide mb-3">{girl.city}</div>
                <div className="flex flex-wrap gap-1">
                  {girl.tags.map(t => (
                    <span key={t} className="font-ui text-[0.5rem] tracking-wide border border-gold/30 text-gold/70 px-2 py-0.5">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            {selected === girl.id && (
              <div className="p-4 border-t border-gold/30 bg-gold/5 flex gap-2">
                <button className="btn-gold flex-1 py-2 text-[0.6rem]">Написать</button>
                <button className="btn-outline-gold flex-1 py-2 text-[0.6rem]">Запрос</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesSection({ messages }: { messages: typeof MOCK_MESSAGES }) {
  const [active, setActive] = useState<number | null>(1);
  return (
    <div className="flex gap-6 h-[70vh]">
      <div className="w-72 flex-shrink-0 border border-border overflow-auto">
        {messages.map((m) => (
          <div key={m.id} onClick={() => setActive(m.id)}
            className={`p-4 border-b border-border cursor-pointer transition-colors ${active === m.id ? "bg-gold/5 border-l-2 border-l-gold" : "hover:bg-card"}`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`font-ui text-xs font-light ${m.unread ? "text-foreground font-normal" : "text-muted-foreground"}`}>{m.from}</span>
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
              <input className="flex-1 bg-muted border border-border px-4 py-2.5 text-xs font-ui font-light focus:outline-none focus:border-gold/50 transition-colors" placeholder="Написать сообщение..." />
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

function ConciergeSection() {
  const services = [
    { icon: "Plane", title: "Частный перелёт", desc: "Организация борта, маршрут по запросу", status: "active" },
    { icon: "Hotel", title: "Размещение", desc: "Резервирование лучших апартаментов", status: "active" },
    { icon: "Car", title: "Трансфер", desc: "Личный водитель и люкс-автомобиль", status: "active" },
    { icon: "UtensilsCrossed", title: "Рестораны", desc: "Столики у шефа, закрытые ужины", status: "active" },
    { icon: "Shield", title: "Охрана", desc: "Профессиональная охрана по запросу", status: "active" },
    { icon: "HeartPulse", title: "Медицина", desc: "Лучшие клиники и врачи по всему миру", status: "active" },
  ];
  return (
    <div>
      <div className="bg-gold/5 border border-gold/20 p-6 mb-8 flex items-center gap-4">
        <div className="w-10 h-10 bg-gold/10 border border-gold/20 flex items-center justify-center">
          <Icon name="User" fallback="Circle" size={15} className="text-gold" />
        </div>
        <div>
          <div className="font-ui text-xs font-light text-foreground mb-0.5">Ваш менеджер: Наталья Соколова</div>
          <div className="font-ui text-[0.6rem] text-muted-foreground tracking-wide">Доступна 24/7 · +7 (495) 000-01-23</div>
        </div>
        <button className="ml-auto btn-gold py-2 text-[0.6rem]">Написать</button>
      </div>
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {services.map((s) => (
          <div key={s.title} className="card-dark p-6 group cursor-pointer">
            <div className="w-9 h-9 border border-border flex items-center justify-center mb-4 group-hover:border-gold/40 transition-colors">
              <Icon name={s.icon} fallback="Star" size={14} className="text-gold" />
            </div>
            <h3 className="font-display text-lg font-light mb-2">{s.title}</h3>
            <p className="font-ui text-xs text-muted-foreground font-light tracking-wide mb-4">{s.desc}</p>
            <button className="btn-outline-gold w-full py-2 text-[0.6rem]">Сделать запрос</button>
          </div>
        ))}
      </div>
      <div className="border border-border p-8">
        <h3 className="font-display text-2xl font-light mb-6">Произвольный запрос</h3>
        <textarea className="w-full bg-muted border border-border px-4 py-3 text-xs font-ui font-light tracking-wide focus:outline-none focus:border-gold/50 transition-colors h-28 resize-none mb-4" placeholder="Опишите ваш запрос максимально подробно..." />
        <button className="btn-gold">Отправить менеджеру</button>
      </div>
    </div>
  );
}

function MemberProfileSection() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-8 mb-12">
        <div className="w-20 h-20 bg-gold/10 border border-gold/20 flex items-center justify-center">
          <span className="font-display text-4xl text-gold font-light">A</span>
        </div>
        <div>
          <h2 className="font-display text-3xl font-light mb-1">Алексей Воронов</h2>
          <div className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-gold">Black Member · с 2021</div>
        </div>
        <button className="ml-auto btn-outline-gold py-2">Редактировать</button>
      </div>
      <div className="grid gap-px bg-border mb-8">
        {[
          { label: "Email", value: "a.voronov@private.com" },
          { label: "Телефон", value: "+7 (999) *** **01" },
          { label: "Город", value: "Москва" },
          { label: "Часовой пояс", value: "UTC+3 (Москва)" },
          { label: "Язык", value: "Русский, English" },
          { label: "Менеджер", value: "Наталья Соколова" },
        ].map((f) => (
          <div key={f.label} className="bg-background flex items-center justify-between p-5">
            <span className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">{f.label}</span>
            <span className="font-ui text-sm font-light text-foreground">{f.value}</span>
          </div>
        ))}
      </div>
      <div className="border border-border p-6">
        <h3 className="font-display text-xl font-light mb-4">Предпочтения</h3>
        <div className="flex flex-wrap gap-2">
          {["Частные перелёты", "Медицина VIP", "Гастрономия", "Искусство", "Яхты", "Высокая мода"].map(t => (
            <span key={t} className="font-ui text-[0.6rem] tracking-wide border border-gold/30 text-gold/70 px-3 py-1.5">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MemberSettingsSection() {
  const [notifications, setNotifications] = useState(true);
  const [twofa, setTwofa] = useState(true);
  return (
    <div className="max-w-xl space-y-8">
      <div className="border border-border p-8">
        <h3 className="font-display text-2xl font-light mb-6">Уведомления</h3>
        <div className="space-y-4">
          {[
            { label: "Новые профили", desc: "Когда появляются новые участницы" },
            { label: "Ответы менеджера", desc: "Уведомления о новых сообщениях" },
            { label: "Запросы консьержа", desc: "Статус ваших запросов" },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between">
              <div>
                <div className="font-ui text-xs font-light">{n.label}</div>
                <div className="font-ui text-[0.6rem] text-muted-foreground tracking-wide">{n.desc}</div>
              </div>
              <button onClick={() => setNotifications(!notifications)}
                className={`w-10 h-5 relative transition-colors ${notifications ? "bg-gold" : "bg-muted"}`}>
                <span className={`absolute top-0.5 w-4 h-4 bg-background transition-transform ${notifications ? "translate-x-5" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-border p-8">
        <h3 className="font-display text-2xl font-light mb-6">Безопасность</h3>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="font-ui text-xs font-light">Двухфакторная аутентификация</div>
            <div className="font-ui text-[0.6rem] text-muted-foreground tracking-wide">Дополнительная защита аккаунта</div>
          </div>
          <button onClick={() => setTwofa(!twofa)}
            className={`w-10 h-5 relative transition-colors ${twofa ? "bg-gold" : "bg-muted"}`}>
            <span className={`absolute top-0.5 w-4 h-4 bg-background transition-transform ${twofa ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
        </div>
        <button className="btn-outline-gold py-2 text-xs">Изменить пароль</button>
      </div>
      <div className="border border-destructive/30 p-8">
        <h3 className="font-display text-xl font-light mb-3 text-destructive">Опасная зона</h3>
        <p className="font-ui text-xs text-muted-foreground font-light tracking-wide mb-5">Приостановить или закрыть членство. Это действие необратимо.</p>
        <button className="btn-outline-gold border-destructive/30 text-destructive/70 py-2 text-xs hover:border-destructive hover:text-destructive">Закрыть членство</button>
      </div>
    </div>
  );
}
