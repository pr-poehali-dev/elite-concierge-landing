import { useState } from "react";
import Icon from "@/components/ui/icon";

type MemberSection = "girls" | "messages" | "concierge" | "profile" | "settings";

interface MemberDashboardProps {
  onNavigate: (page: string) => void;
}

const MOCK_GIRLS = [
  { id: 1, name: "Александра", age: 24, city: "Москва", status: "online", tags: ["Светская жизнь", "Путешествия", "Искусство"], height: "172", bio: "Увлекаюсь современным искусством и гастрономией. Люблю нестандартные форматы встреч.", interests: ["Галереи", "Рестораны Мишлен", "Театр", "Яхты"], img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=750&fit=crop", level: 3, events: 12, rating: 4.9 },
  { id: 2, name: "Виктория", age: 26, city: "Дубай", status: "online", tags: ["Бизнес", "Спорт", "Мода"], height: "168", bio: "Предпринимательница. Ценю людей с амбициями и чувством юмора. Активный образ жизни.", interests: ["Теннис", "Яхты", "Бизнес-форумы", "Путешествия"], img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=750&fit=crop", level: 4, events: 20, rating: 4.8 },
  { id: 3, name: "Елена", age: 23, city: "Лондон", status: "offline", tags: ["Искусство", "Мода", "Культура"], height: "175", bio: "Арт-куратор. Живу между Лондоном и Парижем. Влюблена в архитектуру и высокую кухню.", interests: ["Contemporary art", "Мода", "Музеи", "Гастрономия"], img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=750&fit=crop", level: 2, events: 5, rating: 4.7 },
  { id: 4, name: "Анастасия", age: 25, city: "Монако", status: "online", tags: ["Яхты", "Гастрономия", "Формула-1"], height: "170", bio: "Живу в Монако с 2022 года. Страсть — море и гоночный спорт. Ищу настоящего партнёра.", interests: ["Формула-1", "Яхты", "Diving", "Гастрономия"], img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=750&fit=crop", level: 3, events: 9, rating: 5.0 },
  { id: 5, name: "Мария", age: 27, city: "Нью-Йорк", status: "offline", tags: ["Финансы", "Культура", "Музыка"], height: "165", bio: "Инвестиционный аналитик на Уолл-стрит. Обожаю джаз, оперу и долгие разговоры за бокалом вина.", interests: ["Джаз", "Опера", "Инвестиции", "Классическая литература"], img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=750&fit=crop", level: 3, events: 7, rating: 4.9 },
  { id: 6, name: "Диана", age: 22, city: "Париж", status: "online", tags: ["Мода", "Путешествия", "Фотография"], height: "173", bio: "Фэшн-фотограф. Снимаю для Vogue Paris. Мир — моя студия, жизнь — мой проект.", interests: ["Фотография", "Haute couture", "Путешествия", "Кино"], img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=750&fit=crop", level: 2, events: 4, rating: 4.8 },
];

const MOCK_MESSAGES = [
  { id: 1, from: "Персональный менеджер", text: "Добрый день! Ваш столик в Eleven Madison Park подтверждён на 19:00.", time: "10:32", unread: true, avatar: "М" },
  { id: 2, from: "Менеджер NOIR", text: "Напоминаем о закрытом вечере в пятницу. Дресс-код: black tie.", time: "09:15", unread: true, avatar: "N" },
  { id: 3, from: "Travel Desk", text: "Борт готов. Вылет из Шереметьево в 14:00, ангар B.", time: "Вчера", unread: false, avatar: "T" },
  { id: 4, from: "Консьерж-служба", text: "Яхта 'Azimut 78' забронирована на 22-24 марта. Порт — Монако.", time: "Вчера", unread: false, avatar: "K" },
];

const MOCK_CONCIERGE_REQUESTS = [
  { id: 1, type: "Ресторан", desc: "Столик на 2 в Eleven Madison Park, 19 марта", status: "done", date: "10.03.2026" },
  { id: 2, type: "Авиация", desc: "Частный борт Москва–Монако, 22 марта", status: "process", date: "09.03.2026" },
  { id: 3, type: "Яхта", desc: "Аренда яхты 22-24 марта, Монако", status: "done", date: "08.03.2026" },
  { id: 4, type: "Отель", desc: "Пентхаус в Hôtel de Paris, 22-24 марта", status: "process", date: "07.03.2026" },
];

export default function MemberDashboard({ onNavigate }: MemberDashboardProps) {
  const [section, setSection] = useState<MemberSection>("girls");
  const [selectedGirl, setSelectedGirl] = useState<typeof MOCK_GIRLS[0] | null>(null);

  const navItems: { key: MemberSection; icon: string; label: string; badge?: number }[] = [
    { key: "girls", icon: "Users", label: "Девушки" },
    { key: "messages", icon: "MessageSquare", label: "Сообщения", badge: 2 },
    { key: "concierge", icon: "Star", label: "Консьерж" },
    { key: "profile", icon: "User", label: "Профиль" },
    { key: "settings", icon: "Settings", label: "Настройки" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 flex-shrink-0 border-r border-border flex flex-col h-screen sticky top-0">
        <div className="px-6 py-8 border-b border-border">
          <div className="font-display text-xl tracking-[0.3em] text-gold mb-1">NOIR</div>
          <div className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">Member Dashboard</div>
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
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-gold/10 border border-gold/30 flex items-center justify-center">
              <span className="font-display text-gold">A</span>
            </div>
            <div>
              <div className="font-ui text-xs text-foreground font-light">Алексей В.</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="font-ui text-[0.5rem] tracking-[0.15em] uppercase text-gold">Black</span>
                <span className="w-1 h-1 bg-gold/40 rounded-full" />
                <span className="font-ui text-[0.5rem] text-muted-foreground">Уровень 4</span>
              </div>
            </div>
          </div>
          <button onClick={() => onNavigate("landing")} className="sidebar-item w-full text-left mt-2">
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
              {section === "girls" && "Каталог участниц"}
              {section === "messages" && "Сообщения"}
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
          {section === "girls" && !selectedGirl && <GirlsSection girls={MOCK_GIRLS} onSelect={setSelectedGirl} />}
          {section === "girls" && selectedGirl && <GirlProfileFull girl={selectedGirl} onBack={() => setSelectedGirl(null)} />}
          {section === "messages" && <MessagesSection messages={MOCK_MESSAGES} />}
          {section === "concierge" && <ConciergeSection requests={MOCK_CONCIERGE_REQUESTS} />}
          {section === "profile" && <MemberProfileSection />}
          {section === "settings" && <MemberSettingsSection />}
        </div>
      </main>
    </div>
  );
}

function GirlsSection({ girls, onSelect }: { girls: typeof MOCK_GIRLS; onSelect: (g: typeof MOCK_GIRLS[0]) => void }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const cities = ["all", "Москва", "Дубай", "Лондон", "Монако", "Нью-Йорк", "Париж"];

  const filtered = girls.filter(g => {
    const cityMatch = filter === "all" || g.city === filter;
    const searchMatch = !search || g.name.toLowerCase().includes(search.toLowerCase()) || g.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return cityMatch && searchMatch;
  });

  return (
    <div>
      <div className="flex gap-4 mb-6 items-center flex-wrap">
        <div className="relative">
          <Icon name="Search" fallback="Circle" size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="bg-card border border-border pl-9 pr-4 py-2 font-ui text-xs font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors w-52"
            placeholder="Поиск..." />
        </div>
      </div>
      <div className="flex gap-2 mb-8 flex-wrap">
        {cities.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`font-ui text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 border transition-all ${filter === c ? "border-gold text-gold bg-gold/5" : "border-border text-muted-foreground hover:border-gold/30"}`}>
            {c === "all" ? "Все города" : c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((girl) => (
          <div key={girl.id} onClick={() => onSelect(girl)}
            className="group cursor-pointer overflow-hidden border border-border hover:border-gold/40 transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img src={girl.img} alt={girl.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-background/60 backdrop-blur-sm px-2 py-1">
                <span className={`w-1.5 h-1.5 rounded-full ${girl.status === "online" ? "bg-green-400" : "bg-muted-foreground/50"}`} />
                <span className="font-ui text-[0.5rem] text-muted-foreground uppercase tracking-wide">{girl.status === "online" ? "Онлайн" : "Офлайн"}</span>
              </div>
              <div className="absolute top-3 left-3">
                <div className="flex gap-1">
                  {Array.from({ length: girl.level }).map((_, i) => (
                    <span key={i} className="w-1.5 h-1.5 bg-gold rounded-full" />
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="font-display text-xl font-light">{girl.name}, {girl.age}</div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="MapPin" fallback="Circle" size={10} className="text-muted-foreground" />
                  <span className="font-ui text-[0.6rem] text-muted-foreground tracking-wide">{girl.city}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {girl.tags.slice(0, 2).map(t => (
                    <span key={t} className="font-ui text-[0.5rem] tracking-wide border border-gold/30 text-gold/70 px-2 py-0.5">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-3 border-t border-border bg-card/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="Star" fallback="Circle" size={10} className="text-gold" />
                  <span className="font-ui text-[0.55rem] text-muted-foreground">{girl.rating}</span>
                  <span className="text-border">·</span>
                  <span className="font-ui text-[0.55rem] text-muted-foreground">{girl.events} встреч</span>
                </div>
                <span className="font-ui text-[0.5rem] tracking-[0.15em] uppercase text-gold/60">Открыть профиль →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GirlProfileFull({ girl, onBack }: { girl: typeof MOCK_GIRLS[0]; onBack: () => void }) {
  const [showRequest, setShowRequest] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [requestForm, setRequestForm] = useState({ type: "", date: "", location: "", message: "" });

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSent(true);
    setShowRequest(false);
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-8 font-ui text-xs tracking-[0.2em] uppercase">
        <Icon name="ArrowLeft" fallback="Circle" size={14} />
        Назад к каталогу
      </button>

      <div className="grid md:grid-cols-3 gap-10">
        {/* LEFT: photos & info */}
        <div>
          <div className="relative overflow-hidden aspect-[3/4] mb-5">
            <img src={girl.img} alt={girl.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4">
              <div className="flex gap-1">
                {Array.from({ length: girl.level }).map((_, i) => (
                  <span key={i} className="w-2 h-2 bg-gold rounded-full" />
                ))}
              </div>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-background/70 backdrop-blur-sm px-2 py-1">
              <span className={`w-1.5 h-1.5 rounded-full ${girl.status === "online" ? "bg-green-400" : "bg-muted-foreground/50"}`} />
              <span className="font-ui text-[0.5rem] text-muted-foreground uppercase">{girl.status === "online" ? "Онлайн" : "Офлайн"}</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 mb-5">
            {[girl.img, girl.img, girl.img].map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Встреч", val: girl.events },
              { label: "Рейтинг", val: girl.rating },
              { label: "Уровень", val: girl.level },
            ].map(s => (
              <div key={s.label} className="border border-border p-3 text-center">
                <div className="font-display text-2xl text-gold font-light">{s.val}</div>
                <div className="font-ui text-[0.5rem] text-muted-foreground tracking-wide uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: details */}
        <div className="md:col-span-2">
          <div className="mb-8">
            <h1 className="font-display text-4xl font-light mb-2">{girl.name}, {girl.age}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                <Icon name="MapPin" fallback="Circle" size={12} className="text-muted-foreground" />
                <span className="font-ui text-sm text-muted-foreground font-light">{girl.city}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="Ruler" fallback="Circle" size={12} className="text-muted-foreground" />
                <span className="font-ui text-sm text-muted-foreground font-light">{girl.height} см</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {girl.tags.map(t => (
                <span key={t} className="font-ui text-[0.55rem] tracking-[0.15em] uppercase border border-gold/30 text-gold/80 px-3 py-1">{t}</span>
              ))}
            </div>
          </div>

          <div className="border border-border p-7 mb-5">
            <h2 className="font-display text-xl font-light mb-3">О себе</h2>
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide">{girl.bio}</p>
          </div>

          <div className="border border-border p-7 mb-5">
            <h2 className="font-display text-xl font-light mb-4">Интересы</h2>
            <div className="flex flex-wrap gap-2">
              {girl.interests.map(i => (
                <div key={i} className="flex items-center gap-2 bg-card border border-border px-3 py-2">
                  <Icon name="Heart" fallback="Circle" size={10} className="text-gold" />
                  <span className="font-ui text-xs font-light text-foreground/80 tracking-wide">{i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact lock */}
          <div className="border border-gold/20 bg-gold/5 p-7 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <Icon name="Lock" fallback="Circle" size={16} className="text-gold" />
              <h3 className="font-display text-lg font-light">Связь только после одобрения</h3>
            </div>
            <p className="font-ui text-xs font-light text-muted-foreground leading-relaxed tracking-wide mb-5">
              Написать {girl.name} можно только после того, как ваш запрос на встречу будет рассмотрен и одобрен менеджером. Это защищает всех участников.
            </p>
            {requestSent ? (
              <div className="flex items-center gap-3 bg-gold/10 border border-gold/30 px-5 py-3">
                <Icon name="Clock" fallback="Circle" size={14} className="text-gold" />
                <span className="font-ui text-xs tracking-wide text-gold">Запрос отправлен — ожидайте ответа менеджера</span>
              </div>
            ) : (
              <button onClick={() => setShowRequest(true)} className="btn-gold py-3 px-6">
                Отправить запрос на встречу
              </button>
            )}
          </div>

          {/* Request form */}
          {showRequest && !requestSent && (
            <div className="border border-border bg-card/30 p-8 animate-fade-up" style={{ animationFillMode: "forwards" }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-light">Запрос на встречу с {girl.name}</h3>
                <button onClick={() => setShowRequest(false)} className="text-muted-foreground hover:text-gold transition-colors">
                  <Icon name="X" fallback="Circle" size={16} />
                </button>
              </div>
              <form onSubmit={handleRequest} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Тип события</label>
                    <select value={requestForm.type} onChange={e => setRequestForm(f => ({ ...f, type: e.target.value }))}
                      className="w-full bg-background border border-border px-4 py-3 font-ui text-xs font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors" required>
                      <option value="">Выберите</option>
                      <option>Ужин</option>
                      <option>Частное мероприятие</option>
                      <option>Деловая встреча</option>
                      <option>Путешествие</option>
                      <option>Вечеринка</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Дата</label>
                    <input type="date" value={requestForm.date} onChange={e => setRequestForm(f => ({ ...f, date: e.target.value }))}
                      className="w-full bg-background border border-border px-4 py-3 font-ui text-xs font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors" required />
                  </div>
                </div>
                <div>
                  <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Место / Город</label>
                  <input value={requestForm.location} onChange={e => setRequestForm(f => ({ ...f, location: e.target.value }))}
                    className="w-full bg-transparent border border-border px-4 py-3 font-ui text-xs font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors"
                    placeholder="Например: Москва, ресторан Selfie" required />
                </div>
                <div>
                  <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Сообщение для менеджера</label>
                  <textarea value={requestForm.message} onChange={e => setRequestForm(f => ({ ...f, message: e.target.value }))}
                    rows={3} className="w-full bg-transparent border border-border px-4 py-3 font-ui text-xs font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors resize-none"
                    placeholder="Расскажите о формате встречи, пожеланиях..." />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="btn-gold flex-1 py-3">Отправить запрос</button>
                  <button type="button" onClick={() => setShowRequest(false)} className="btn-outline-gold px-6 py-3">Отмена</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MessagesSection({ messages }: { messages: typeof MOCK_MESSAGES }) {
  const [active, setActive] = useState<number | null>(1);
  const [msg, setMsg] = useState("");

  const activeMsg = messages.find(m => m.id === active);

  return (
    <div className="flex gap-6 h-[75vh]">
      <div className="w-72 flex-shrink-0 border border-border flex flex-col">
        <div className="px-5 py-4 border-b border-border">
          <span className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">Чаты</span>
        </div>
        <div className="flex-1 overflow-auto">
          {messages.map((m) => (
            <button key={m.id} onClick={() => setActive(m.id)}
              className={`w-full px-5 py-4 border-b border-border text-left hover:bg-card/30 transition-colors ${active === m.id ? "bg-gold/5 border-l-2 border-l-gold" : ""}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-gold text-sm">{m.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-ui text-xs font-light text-foreground truncate">{m.from}</span>
                    <span className="font-ui text-[0.55rem] text-muted-foreground flex-shrink-0">{m.time}</span>
                  </div>
                  <p className="font-ui text-[0.6rem] text-muted-foreground truncate font-light">{m.text}</p>
                </div>
                {m.unread && <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 border border-border flex flex-col">
        {activeMsg ? (
          <>
            <div className="px-7 py-4 border-b border-border flex items-center gap-3">
              <div className="w-8 h-8 bg-gold/10 border border-gold/20 flex items-center justify-center">
                <span className="font-display text-gold text-sm">{activeMsg.avatar}</span>
              </div>
              <div>
                <div className="font-ui text-xs font-light text-foreground">{activeMsg.from}</div>
                <div className="font-ui text-[0.55rem] text-muted-foreground tracking-wide">Служба NOIR</div>
              </div>
            </div>
            <div className="flex-1 p-7 overflow-auto space-y-5">
              <div className="flex gap-3">
                <div className="w-7 h-7 bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-display text-gold text-xs">{activeMsg.avatar}</span>
                </div>
                <div className="bg-card border border-border px-5 py-4 max-w-[70%]">
                  <p className="font-ui text-xs font-light text-foreground leading-relaxed tracking-wide">{activeMsg.text}</p>
                  <span className="font-ui text-[0.5rem] text-muted-foreground mt-2 block">{activeMsg.time}</span>
                </div>
              </div>
            </div>
            <div className="px-7 py-4 border-t border-border flex gap-3">
              <input value={msg} onChange={e => setMsg(e.target.value)}
                className="flex-1 bg-transparent border border-border px-4 py-3 font-ui text-xs font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors"
                placeholder="Сообщение..." />
              <button onClick={() => setMsg("")} className="btn-gold px-5 py-3">
                <Icon name="Send" fallback="Circle" size={14} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Icon name="MessageSquare" fallback="Circle" size={32} className="mx-auto mb-3 opacity-30" />
              <p className="font-ui text-xs tracking-wide">Выберите чат</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ConciergeSection({ requests }: { requests: typeof MOCK_CONCIERGE_REQUESTS }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ category: "", desc: "", date: "", budget: "", notes: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setShowForm(false);
    setForm({ category: "", desc: "", date: "", budget: "", notes: "" });
  };

  const statusConfig = {
    done: { label: "Выполнено", color: "text-green-400", bg: "bg-green-400/10" },
    process: { label: "В работе", color: "text-gold", bg: "bg-gold/10" },
    pending: { label: "Ожидает", color: "text-muted-foreground", bg: "bg-muted/30" },
  };

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {[
          { label: "Запросов всего", val: requests.length + (sent ? 1 : 0), icon: "Star" },
          { label: "В работе", val: requests.filter(r => r.status === "process").length, icon: "Clock" },
          { label: "Выполнено", val: requests.filter(r => r.status === "done").length + (sent ? 1 : 0), icon: "CheckCircle" },
        ].map(s => (
          <div key={s.label} className="card-dark p-6 flex items-center gap-5">
            <div className="w-10 h-10 border border-gold/20 flex items-center justify-center flex-shrink-0">
              <Icon name={s.icon} fallback="Circle" size={16} className="text-gold" />
            </div>
            <div>
              <div className="font-display text-3xl text-gold font-light">{s.val}</div>
              <div className="font-ui text-[0.55rem] text-muted-foreground tracking-[0.15em] uppercase">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="grid md:grid-cols-4 gap-3 mb-10">
        {[
          { icon: "Plane", label: "Авиация", desc: "Частные борты" },
          { icon: "Utensils", label: "Рестораны", desc: "Лучшие столики" },
          { icon: "Anchor", label: "Яхты", desc: "Чартер и аренда" },
          { icon: "Building2", label: "Отели", desc: "Лучшие номера" },
          { icon: "Car", label: "Транспорт", desc: "Премиум авто" },
          { icon: "Gem", label: "Ювелирные", desc: "VIP-покупки" },
          { icon: "Music", label: "Мероприятия", desc: "Закрытые события" },
          { icon: "Heart", label: "Особые запросы", desc: "Любые желания" },
        ].map(c => (
          <button key={c.label} onClick={() => { setShowForm(true); setForm(f => ({ ...f, category: c.label })); }}
            className="border border-border hover:border-gold/40 p-5 text-left transition-all group">
            <Icon name={c.icon} fallback="Circle" size={16} className="text-muted-foreground group-hover:text-gold transition-colors mb-3" />
            <div className="font-ui text-xs font-light text-foreground tracking-wide">{c.label}</div>
            <div className="font-ui text-[0.55rem] text-muted-foreground tracking-wide">{c.desc}</div>
          </button>
        ))}
      </div>

      {/* New request form */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-light">Мои запросы</h2>
        <button onClick={() => setShowForm(true)} className="btn-gold py-2 px-5">
          <span className="flex items-center gap-2">
            <Icon name="Plus" fallback="Circle" size={13} />
            Новый запрос
          </span>
        </button>
      </div>

      {showForm && (
        <div className="border border-gold/30 bg-gold/5 p-8 mb-8 animate-fade-up" style={{ animationFillMode: "forwards" }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-xl font-light">Новый запрос консьержу</h3>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-gold transition-colors">
              <Icon name="X" fallback="Circle" size={16} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Категория</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full bg-background border border-border px-4 py-3 font-ui text-xs font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors" required>
                  <option value="">Выберите категорию</option>
                  {["Авиация","Рестораны","Яхты","Отели","Транспорт","Ювелирные","Мероприятия","Особый запрос"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Дата</label>
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  className="w-full bg-background border border-border px-4 py-3 font-ui text-xs font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors" />
              </div>
            </div>
            <div>
              <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Описание запроса</label>
              <input value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
                className="w-full bg-transparent border border-border px-4 py-3 font-ui text-xs font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors"
                placeholder="Например: частный борт Москва–Дубай на 4 персоны, 25 марта" required />
            </div>
            <div>
              <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Бюджет (опционально)</label>
              <input value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                className="w-full bg-transparent border border-border px-4 py-3 font-ui text-xs font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors"
                placeholder="Например: до €50,000 или без ограничений" />
            </div>
            <div>
              <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Дополнительные пожелания</label>
              <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                rows={3} className="w-full bg-transparent border border-border px-4 py-3 font-ui text-xs font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors resize-none"
                placeholder="Любые детали, предпочтения..." />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn-gold flex-1 py-3">Отправить запрос</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline-gold px-6">Отмена</button>
            </div>
          </form>
        </div>
      )}

      {/* Requests list */}
      <div className="space-y-3">
        {sent && (
          <div className="border border-gold/30 bg-gold/5 p-5 flex items-center justify-between animate-fade-up" style={{ animationFillMode: "forwards" }}>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 border border-gold/30 flex items-center justify-center">
                <Icon name="Clock" fallback="Circle" size={13} className="text-gold" />
              </div>
              <div>
                <div className="font-ui text-xs font-light text-foreground">{form.category || "Новый запрос"}</div>
                <div className="font-ui text-[0.6rem] text-muted-foreground tracking-wide">Только что</div>
              </div>
            </div>
            <span className="font-ui text-[0.55rem] tracking-[0.15em] uppercase text-gold bg-gold/10 px-3 py-1">Принято</span>
          </div>
        )}
        {requests.map(r => {
          const s = statusConfig[r.status as keyof typeof statusConfig];
          return (
            <div key={r.id} className="border border-border p-5 flex items-center justify-between hover:border-gold/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 border border-border flex items-center justify-center">
                  <Icon name="Star" fallback="Circle" size={12} className="text-muted-foreground" />
                </div>
                <div>
                  <div className="font-ui text-xs font-light text-foreground">{r.type}</div>
                  <div className="font-ui text-[0.6rem] text-muted-foreground tracking-wide mb-0.5">{r.desc}</div>
                  <div className="font-ui text-[0.55rem] text-muted-foreground">{r.date}</div>
                </div>
              </div>
              <span className={`font-ui text-[0.55rem] tracking-[0.15em] uppercase ${s.color} ${s.bg} px-3 py-1`}>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MemberProfileSection() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Алексей Воронов", city: "Москва", age: "38", phone: "+7 (985) ···-····",
    about: "Предприниматель. Интересуюсь яхтами, гастрономией и нестандартными путешествиями.",
    interests: ["Яхты", "Гастрономия", "Авиация", "Искусство", "Путешествия"],
    languages: ["Русский", "English", "Français"],
  });

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-display text-4xl">
            А
          </div>
          <div>
            <h2 className="font-display text-3xl font-light">{profile.name}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="font-ui text-[0.6rem] tracking-[0.2em] uppercase border border-gold text-gold px-3 py-1">Black</span>
              <span className="font-ui text-xs text-muted-foreground">Уровень 4 · Член с 2021</span>
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
          <h3 className="font-display text-xl font-light">Прогресс уровня</h3>
          <span className="font-ui text-[0.6rem] tracking-[0.15em] uppercase text-gold">Black → Obsidian</span>
        </div>
        <div className="h-1 bg-border mb-3">
          <div className="h-full bg-gold w-[65%] transition-all" />
        </div>
        <div className="flex justify-between">
          <span className="font-ui text-[0.55rem] text-muted-foreground tracking-wide">65% до следующего уровня</span>
          <span className="font-ui text-[0.55rem] text-gold tracking-wide">Obsidian</span>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { label: "Встреч", val: "24", max: "30" },
            { label: "Рейтинг", val: "4.8", max: "5.0" },
            { label: "Инвайтов", val: "3", max: "—" },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl text-gold font-light">{s.val}</div>
              <div className="font-ui text-[0.55rem] text-muted-foreground tracking-wide">{s.label}</div>
              {s.max !== "—" && <div className="font-ui text-[0.5rem] text-muted-foreground/60">из {s.max}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="border border-border p-7 mb-6 space-y-5">
        {[
          { label: "Город", field: "city" as const, val: profile.city },
          { label: "Возраст", field: "age" as const, val: profile.age },
        ].map(item => (
          <div key={item.label}>
            <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">{item.label}</label>
            {editing ? (
              <input value={item.val} onChange={e => setProfile(p => ({ ...p, [item.field]: e.target.value }))}
                className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors" />
            ) : (
              <div className="font-ui text-sm font-light text-foreground">{item.val}</div>
            )}
          </div>
        ))}
        <div>
          <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">О себе</label>
          {editing ? (
            <textarea value={profile.about} onChange={e => setProfile(p => ({ ...p, about: e.target.value }))}
              rows={3} className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors resize-none" />
          ) : (
            <p className="font-ui text-sm font-light text-muted-foreground leading-relaxed tracking-wide">{profile.about}</p>
          )}
        </div>
      </div>

      {/* Interests & languages */}
      <div className="grid grid-cols-2 gap-5">
        <div className="border border-border p-7">
          <h3 className="font-display text-xl font-light mb-4">Интересы</h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map(i => (
              <span key={i} className="font-ui text-[0.55rem] tracking-[0.15em] uppercase border border-gold/30 text-gold/80 px-3 py-1">{i}</span>
            ))}
          </div>
        </div>
        <div className="border border-border p-7">
          <h3 className="font-display text-xl font-light mb-4">Языки</h3>
          <div className="flex flex-wrap gap-2">
            {profile.languages.map(l => (
              <span key={l} className="font-ui text-[0.55rem] tracking-[0.15em] uppercase border border-border text-muted-foreground px-3 py-1">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MemberSettingsSection() {
  const [notifications, setNotifications] = useState({
    newGirls: true, events: true, messages: true, concierge: true, newsletter: false,
  });
  const [privacy, setPrivacy] = useState({
    showOnline: true, showCity: true, allowMessages: false,
  });
  const [security, setSecurity] = useState({ twofa: false });

  return (
    <div className="max-w-2xl space-y-6">
      <div className="border border-border p-8">
        <h2 className="font-display text-2xl font-light mb-6">Уведомления</h2>
        <div className="space-y-4">
          {[
            { key: "newGirls" as const, label: "Новые участницы в моих городах" },
            { key: "events" as const, label: "Приглашения на мероприятия" },
            { key: "messages" as const, label: "Новые сообщения" },
            { key: "concierge" as const, label: "Обновления запросов консьержа" },
            { key: "newsletter" as const, label: "Журнал и рассылка NOIR" },
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

      <div className="border border-border p-8">
        <h2 className="font-display text-2xl font-light mb-6">Приватность</h2>
        <div className="space-y-4">
          {[
            { key: "showOnline" as const, label: "Показывать статус онлайн" },
            { key: "showCity" as const, label: "Показывать город в профиле" },
            { key: "allowMessages" as const, label: "Получать сообщения от участниц" },
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
        <p className="font-ui text-xs text-muted-foreground tracking-wide mb-6">Управление паролем и двухфакторной аутентификацией</p>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between border border-border px-5 py-4 hover:border-gold/40 transition-colors group">
            <div className="flex items-center gap-3">
              <Icon name="Key" fallback="Circle" size={14} className="text-muted-foreground group-hover:text-gold transition-colors" />
              <span className="font-ui text-sm font-light text-foreground tracking-wide">Сменить пароль</span>
            </div>
            <Icon name="ChevronRight" fallback="Circle" size={14} className="text-muted-foreground" />
          </button>
          <div className="flex items-center justify-between border border-border px-5 py-4">
            <div className="flex items-center gap-3">
              <Icon name="Shield" fallback="Circle" size={14} className="text-muted-foreground" />
              <div>
                <span className="font-ui text-sm font-light text-foreground tracking-wide block">Двухфакторная аутентификация</span>
                <span className="font-ui text-[0.6rem] text-muted-foreground">Дополнительная защита аккаунта</span>
              </div>
            </div>
            <button onClick={() => setSecurity(s => ({ ...s, twofa: !s.twofa }))}
              className={`w-10 h-5 rounded-full transition-all relative ${security.twofa ? "bg-gold" : "bg-border"}`}>
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${security.twofa ? "right-0.5" : "left-0.5"}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="border border-destructive/30 p-8">
        <h2 className="font-display text-2xl font-light mb-2 text-destructive/80">Опасная зона</h2>
        <p className="font-ui text-xs text-muted-foreground tracking-wide mb-5">Действия без возможности отмены</p>
        <button className="font-ui text-xs tracking-[0.15em] uppercase border border-destructive/40 text-destructive/70 px-5 py-3 hover:border-destructive/60 transition-colors">
          Запросить удаление аккаунта
        </button>
      </div>
    </div>
  );
}
