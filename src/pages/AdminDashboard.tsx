import { useState } from "react";
import Icon from "@/components/ui/icon";

type AdminSection = "overview" | "analytics" | "members" | "girls" | "messages" | "events" | "invites" | "waitlist" | "requests" | "settings";

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

const MOCK_MEMBERS = [
  { id: 1, name: "Алексей Воронов", tier: "Black", city: "Москва", since: "2021", status: "active", email: "a.v@private.com", events: 24, rating: 4.8 },
  { id: 2, name: "Дмитрий Лебедев", tier: "Obsidian", city: "Дубай", since: "2020", status: "active", email: "d.l@private.com", events: 48, rating: 4.9 },
  { id: 3, name: "Михаил Соколов", tier: "Silver", city: "Лондон", since: "2023", status: "active", email: "m.s@private.com", events: 6, rating: 4.5 },
  { id: 4, name: "Андрей Кузнецов", tier: "Black", city: "Монако", since: "2022", status: "suspended", email: "a.k@private.com", events: 15, rating: 3.2 },
  { id: 5, name: "Сергей Морозов", tier: "Silver", city: "Париж", since: "2024", status: "active", email: "s.m@private.com", events: 3, rating: 4.6 },
];

const MOCK_GIRLS_ADMIN = [
  { id: 1, name: "Александра К.", city: "Москва", status: "verified", rating: 4.9, events: 12, level: 3, joined: "2023" },
  { id: 2, name: "Виктория М.", city: "Дубай", status: "verified", rating: 4.8, events: 20, level: 4, joined: "2022" },
  { id: 3, name: "Елена С.", city: "Лондон", status: "pending", rating: 0, events: 0, level: 0, joined: "2026" },
  { id: 4, name: "Анастасия Р.", city: "Монако", status: "verified", rating: 5.0, events: 9, level: 3, joined: "2023" },
  { id: 5, name: "Диана В.", city: "Париж", status: "pending", rating: 0, events: 0, level: 0, joined: "2026" },
];

const MOCK_INVITES = [
  { code: "NOIR-2026-A1B2", tier: "Black", used: false, createdBy: "Алексей В.", created: "01.03.2026" },
  { code: "NOIR-2026-C3D4", tier: "Silver", used: true, usedBy: "Михаил С.", created: "15.02.2026" },
  { code: "NOIR-2026-E5F6", tier: "Black", used: false, createdBy: "Система", created: "10.02.2026" },
  { code: "NOIR-2026-G7H8", tier: "Obsidian", used: false, createdBy: "Дмитрий Л.", created: "05.02.2026" },
];

const MOCK_WAITLIST = [
  { id: 1, name: "Сергей Петров", email: "s.p@mail.com", city: "Москва", date: "05.03.2026", ref: "Алексей В.", score: 78 },
  { id: 2, name: "Николай Власов", email: "n.v@mail.com", city: "Дубай", date: "03.03.2026", ref: "Прямая заявка", score: 45 },
  { id: 3, name: "Игорь Тарасов", email: "i.t@mail.com", city: "Лондон", date: "01.03.2026", ref: "Дмитрий Л.", score: 91 },
];

const MOCK_REQUESTS = [
  { id: 1, member: "Алексей В.", girl: "Александра К.", type: "Ужин", date: "15 мар", status: "pending", city: "Москва" },
  { id: 2, member: "Дмитрий Л.", girl: "Анастасия Р.", type: "Яхта", date: "22 мар", status: "approved", city: "Монако" },
  { id: 3, member: "Михаил С.", girl: "Виктория М.", type: "Мероприятие", date: "28 мар", status: "pending", city: "Лондон" },
  { id: 4, member: "Сергей М.", girl: "Диана В.", type: "Ужин", date: "5 апр", status: "declined", city: "Париж" },
];

const MOCK_MESSAGES_ADMIN = [
  { id: 1, from: "Алексей В.", to: "Менеджер", text: "Хотел уточнить статус запроса по яхте.", time: "10:32", flagged: false },
  { id: 2, from: "Елена С.", to: "Менеджер", text: "Когда будет рассмотрена моя верификация?", time: "09:15", flagged: false },
  { id: 3, from: "Николай В.", to: "Менеджер", text: "Можно перенести встречу на другую дату?", time: "Вчера", flagged: true },
];

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [section, setSection] = useState<AdminSection>("overview");

  const navItems: { key: AdminSection; icon: string; label: string; badge?: number }[] = [
    { key: "overview", icon: "LayoutDashboard", label: "Обзор" },
    { key: "analytics", icon: "BarChart2", label: "Аналитика" },
    { key: "members", icon: "Users", label: "Члены клуба", badge: MOCK_MEMBERS.length },
    { key: "girls", icon: "UserCheck", label: "Участницы", badge: 2 },
    { key: "requests", icon: "FileText", label: "Запросы", badge: 2 },
    { key: "messages", icon: "MessageSquare", label: "Сообщения", badge: 1 },
    { key: "events", icon: "Calendar", label: "Мероприятия" },
    { key: "invites", icon: "Key", label: "Инвайты" },
    { key: "waitlist", icon: "Clock", label: "Лист ожидания", badge: MOCK_WAITLIST.length },
    { key: "settings", icon: "Settings", label: "Настройки" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
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
        <nav className="flex-1 py-4 overflow-auto">
          {navItems.map((item) => (
            <button key={item.key} onClick={() => setSection(item.key)}
              className={`sidebar-item w-full justify-between ${section === item.key ? "active" : ""}`}>
              <span className="flex items-center gap-3">
                <Icon name={item.icon} fallback="Circle" size={14} />
                {item.label}
              </span>
              {item.badge != null && (
                <span className="font-ui text-[0.5rem] bg-gold/10 text-gold border border-gold/20 px-1.5 py-0.5 min-w-[20px] text-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="px-4 py-6 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
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

      <main className="flex-1 overflow-auto">
        <div className="border-b border-border px-10 py-6 flex items-center justify-between sticky top-0 bg-background z-10">
          <div>
            <div className="font-ui text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground mb-1">Управление</div>
            <h1 className="font-display text-2xl font-light">
              {navItems.find(n => n.key === section)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 border border-border flex items-center justify-center hover:border-gold/40 transition-colors relative">
              <Icon name="Bell" fallback="Circle" size={15} className="text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-gold rounded-full" />
            </button>
            <button className="btn-gold py-2 px-4 text-xs flex items-center gap-2">
              <Icon name="Plus" fallback="Circle" size={13} />
              Добавить
            </button>
          </div>
        </div>

        <div className="p-10">
          {section === "overview" && <OverviewSection onNavigate={setSection} />}
          {section === "analytics" && <AnalyticsSection />}
          {section === "members" && <MembersSection members={MOCK_MEMBERS} />}
          {section === "girls" && <GirlsAdminSection girls={MOCK_GIRLS_ADMIN} />}
          {section === "requests" && <RequestsSection requests={MOCK_REQUESTS} />}
          {section === "messages" && <AdminMessagesSection messages={MOCK_MESSAGES_ADMIN} />}
          {section === "events" && <EventsSection />}
          {section === "invites" && <InvitesSection invites={MOCK_INVITES} />}
          {section === "waitlist" && <WaitlistSection waitlist={MOCK_WAITLIST} />}
          {section === "settings" && <AdminSettingsSection />}
        </div>
      </main>
    </div>
  );
}

function OverviewSection({ onNavigate }: { onNavigate: (s: AdminSection) => void }) {
  const stats = [
    { label: "Активных членов", val: "2 412", change: "+12 этот месяц", icon: "Users", section: "members" as AdminSection },
    { label: "Участниц клуба", val: "847", change: "+34 ожидают верификации", icon: "UserCheck", section: "girls" as AdminSection },
    { label: "Запросов", val: "204", change: "За 30 дней", icon: "FileText", section: "requests" as AdminSection },
    { label: "Выручка (месяц)", val: "€ 4.2M", change: "+8% к прошлому", icon: "TrendingUp", section: "analytics" as AdminSection },
  ];
  const recent = [
    { action: "Новый член Silver", name: "Михаил Тарасов", time: "5 мин назад", icon: "UserPlus" },
    { action: "Верификация участницы", name: "Екатерина В. — одобрена", time: "23 мин назад", icon: "UserCheck" },
    { action: "Запрос консьержа", name: "Дмитрий Л. → частный борт", time: "1 час назад", icon: "Star" },
    { action: "Инвайт активирован", name: "NOIR-2026-C3D4", time: "2 часа назад", icon: "Key" },
    { action: "Заявка на встречу", name: "Алексей В. + Александра К.", time: "3 часа назад", icon: "FileText" },
    { action: "Новая заявка WL", name: "Игорь Тарасов, Лондон", time: "4 часа назад", icon: "Clock" },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} onClick={() => onNavigate(s.section)}
            className="card-dark p-6 cursor-pointer hover:border-gold/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">{s.label}</div>
              <div className="w-7 h-7 border border-border flex items-center justify-center">
                <Icon name={s.icon} fallback="Circle" size={12} className="text-gold" />
              </div>
            </div>
            <div className="font-display text-4xl text-gold font-light mb-2">{s.val}</div>
            <div className="font-ui text-[0.55rem] text-muted-foreground tracking-wide">{s.change}</div>
          </div>
        ))}
      </div>

      {/* Mini chart */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="md:col-span-2 border border-border p-7">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-xl font-light">Активность за 7 дней</h3>
            <span className="font-ui text-[0.55rem] tracking-[0.15em] uppercase text-gold">Запросы · Встречи</span>
          </div>
          <div className="flex items-end gap-3 h-28">
            {[40,65,45,80,55,90,70].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-gold/20 relative" style={{ height: `${h}%` }}>
                  <div className="absolute bottom-0 left-0 right-0 bg-gold/60 transition-all" style={{ height: `${h * 0.6}%` }} />
                </div>
                <span className="font-ui text-[0.5rem] text-muted-foreground">
                  {["Пн","Вт","Ср","Чт","Пт","Сб","Вс"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-border p-7">
          <h3 className="font-display text-xl font-light mb-5">По городам</h3>
          <div className="space-y-3">
            {[
              { city: "Москва", pct: 33 },
              { city: "Дубай", pct: 17 },
              { city: "Нью-Йорк", pct: 17 },
              { city: "Лондон", pct: 15 },
              { city: "Монако", pct: 10 },
              { city: "Париж", pct: 8 },
            ].map(c => (
              <div key={c.city}>
                <div className="flex justify-between mb-1">
                  <span className="font-ui text-[0.6rem] text-foreground/80 tracking-wide">{c.city}</span>
                  <span className="font-ui text-[0.6rem] text-gold">{c.pct}%</span>
                </div>
                <div className="h-1 bg-border">
                  <div className="h-full bg-gold/50" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="border border-border">
        <div className="px-7 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-display text-xl font-light">Последние события</h3>
          <span className="font-ui text-[0.55rem] tracking-[0.15em] uppercase text-muted-foreground">Реальное время</span>
        </div>
        <div className="divide-y divide-border">
          {recent.map((r, i) => (
            <div key={i} className="px-7 py-4 flex items-center gap-5 hover:bg-card/20 transition-colors">
              <div className="w-7 h-7 border border-border flex items-center justify-center flex-shrink-0">
                <Icon name={r.icon} fallback="Circle" size={11} className="text-gold" />
              </div>
              <div className="flex-1">
                <span className="font-ui text-xs font-light text-muted-foreground tracking-wide">{r.action}: </span>
                <span className="font-ui text-xs font-light text-foreground tracking-wide">{r.name}</span>
              </div>
              <span className="font-ui text-[0.55rem] text-muted-foreground flex-shrink-0">{r.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsSection() {
  const [period, setPeriod] = useState("month");

  const kpis = [
    { label: "Всего членов", val: "2 412", delta: "+5.2%", up: true },
    { label: "Новых за период", val: "47", delta: "+12%", up: true },
    { label: "Участниц", val: "847", delta: "+8.1%", up: true },
    { label: "Встреч", val: "1 204", delta: "+15%", up: true },
    { label: "Средний рейтинг", val: "4.85", delta: "+0.1", up: true },
    { label: "Конверсия WL", val: "23%", delta: "-2%", up: false },
    { label: "Выручка", val: "€4.2M", delta: "+8%", up: true },
    { label: "Ср. чек", val: "€1 740", delta: "+3.5%", up: true },
  ];

  return (
    <div>
      {/* Period selector */}
      <div className="flex gap-2 mb-8">
        {[["week","Неделя"],["month","Месяц"],["quarter","Квартал"],["year","Год"]].map(([k,l]) => (
          <button key={k} onClick={() => setPeriod(k)}
            className={`font-ui text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 border transition-all ${period === k ? "border-gold text-gold bg-gold/5" : "border-border text-muted-foreground"}`}>
            {l}
          </button>
        ))}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {kpis.map(k => (
          <div key={k.label} className="card-dark p-5">
            <div className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground mb-2">{k.label}</div>
            <div className="font-display text-3xl text-gold font-light mb-1">{k.val}</div>
            <div className={`font-ui text-[0.55rem] flex items-center gap-1 ${k.up ? "text-green-400" : "text-red-400"}`}>
              <Icon name={k.up ? "TrendingUp" : "TrendingDown"} fallback="Circle" size={10} />
              {k.delta} к прошлому
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="border border-border p-7">
          <h3 className="font-display text-xl font-light mb-6">Новые члены по месяцам</h3>
          <div className="flex items-end gap-2 h-32">
            {[28,35,42,38,50,47,55,61,49,58,65,72].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-gold" style={{ height: `${(h / 72) * 100}%`, opacity: i === 11 ? 1 : 0.4 + i * 0.05 }} />
                {i % 3 === 0 && <span className="font-ui text-[0.45rem] text-muted-foreground">{["Янв","Апр","Июл","Окт"][i/3]}</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="border border-border p-7">
          <h3 className="font-display text-xl font-light mb-6">Распределение по уровням</h3>
          <div className="space-y-4">
            {[
              { tier: "Silver", pct: 55, count: "1 327" },
              { tier: "Black", pct: 40, count: "965" },
              { tier: "Obsidian", pct: 5, count: "120" },
            ].map(t => (
              <div key={t.tier}>
                <div className="flex justify-between mb-1.5">
                  <span className="font-ui text-xs text-foreground/80 tracking-wide">{t.tier}</span>
                  <span className="font-ui text-xs text-gold">{t.count} ({t.pct}%)</span>
                </div>
                <div className="h-2 bg-border">
                  <div className="h-full bg-gold" style={{ width: `${t.pct}%`, opacity: t.tier === "Silver" ? 0.5 : t.tier === "Black" ? 0.75 : 1 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="border border-border p-7">
          <h3 className="font-display text-xl font-light mb-5">Топ городов по встречам</h3>
          <div className="space-y-3">
            {[["Москва","412"],["Дубай","298"],["Нью-Йорк","201"],["Лондон","185"],["Монако","108"]].map(([c,n]) => (
              <div key={c} className="flex justify-between items-center">
                <span className="font-ui text-xs font-light text-muted-foreground tracking-wide">{c}</span>
                <span className="font-display text-lg text-gold">{n}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-border p-7">
          <h3 className="font-display text-xl font-light mb-5">Популярные типы встреч</h3>
          <div className="space-y-3">
            {[["Ужин","38%"],["Мероприятие","27%"],["Путешествие","18%"],["Яхта","12%"],["Деловая","5%"]].map(([t,p]) => (
              <div key={t} className="flex justify-between items-center">
                <span className="font-ui text-xs font-light text-muted-foreground tracking-wide">{t}</span>
                <span className="font-ui text-xs text-gold">{p}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-border p-7">
          <h3 className="font-display text-xl font-light mb-5">Конверсия воронки</h3>
          <div className="space-y-3">
            {[
              { step: "Заявки (WL)", val: "348", pct: 100 },
              { step: "Рассмотрено", val: "156", pct: 45 },
              { step: "Одобрено", val: "80", pct: 23 },
              { step: "Активированы", val: "47", pct: 14 },
            ].map(s => (
              <div key={s.step}>
                <div className="flex justify-between mb-1">
                  <span className="font-ui text-[0.6rem] text-muted-foreground tracking-wide">{s.step}</span>
                  <span className="font-ui text-[0.6rem] text-foreground">{s.val}</span>
                </div>
                <div className="h-1 bg-border">
                  <div className="h-full bg-gold/60" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MembersSection({ members }: { members: typeof MOCK_MEMBERS }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? members : members.filter(m => m.tier.toLowerCase() === filter || m.status === filter);
  const tierColor = { Silver: "text-muted-foreground", Black: "text-gold", Obsidian: "text-purple-400" };

  return (
    <div>
      <div className="flex gap-2 mb-6 flex-wrap">
        {[["all","Все"],["silver","Silver"],["black","Black"],["obsidian","Obsidian"],["suspended","Заморожены"]].map(([k,l]) => (
          <button key={k} onClick={() => setFilter(k)}
            className={`font-ui text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 border transition-all ${filter === k ? "border-gold text-gold bg-gold/5" : "border-border text-muted-foreground"}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="border border-border overflow-hidden">
        <div className="grid grid-cols-6 px-7 py-3 border-b border-border bg-card/30">
          {["Участник","Уровень","Город","С нами","Встреч","Статус"].map(h => (
            <div key={h} className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">{h}</div>
          ))}
        </div>
        <div className="divide-y divide-border">
          {filtered.map(m => (
            <>
              <div key={m.id} onClick={() => setSelected(selected === m.id ? null : m.id)}
                className="grid grid-cols-6 px-7 py-4 hover:bg-card/20 transition-colors cursor-pointer items-center">
                <div>
                  <div className="font-ui text-sm font-light text-foreground">{m.name}</div>
                  <div className="font-ui text-[0.55rem] text-muted-foreground">{m.email}</div>
                </div>
                <div className={`font-ui text-[0.65rem] tracking-[0.15em] uppercase ${tierColor[m.tier as keyof typeof tierColor]}`}>{m.tier}</div>
                <div className="font-ui text-xs text-muted-foreground font-light">{m.city}</div>
                <div className="font-ui text-xs text-muted-foreground font-light">С {m.since}</div>
                <div className="font-ui text-xs text-foreground">{m.events}</div>
                <div>
                  <span className={`font-ui text-[0.5rem] tracking-[0.15em] uppercase px-2 py-0.5 ${m.status === "active" ? "text-green-400 bg-green-400/10" : "text-destructive bg-destructive/10"}`}>
                    {m.status === "active" ? "Активен" : "Заморожен"}
                  </span>
                </div>
              </div>
              {selected === m.id && (
                <div className="px-7 py-5 bg-card/30 border-t border-gold/20">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="font-ui text-[0.6rem] tracking-[0.15em] uppercase text-muted-foreground mb-2">Рейтинг участника</div>
                      <div className="flex items-center gap-2">
                        <Icon name="Star" fallback="Circle" size={13} className="text-gold" />
                        <span className="font-display text-2xl text-gold font-light">{m.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 items-start">
                      <button className="font-ui text-[0.6rem] tracking-[0.15em] uppercase border border-gold/40 text-gold px-4 py-2 hover:bg-gold/5 transition-colors">
                        Изменить уровень
                      </button>
                      <button className="font-ui text-[0.6rem] tracking-[0.15em] uppercase border border-border text-muted-foreground px-4 py-2 hover:border-gold/40 transition-colors">
                        Написать
                      </button>
                      <button className="font-ui text-[0.6rem] tracking-[0.15em] uppercase border border-destructive/40 text-destructive/70 px-4 py-2 hover:border-destructive/60 transition-colors">
                        {m.status === "active" ? "Заморозить" : "Разморозить"}
                      </button>
                    </div>
                    <div>
                      <div className="font-ui text-[0.6rem] tracking-[0.15em] uppercase text-muted-foreground mb-2">Генерировать инвайт</div>
                      <button className="font-ui text-[0.6rem] tracking-[0.15em] uppercase border border-border text-muted-foreground px-4 py-2 hover:border-gold/40 transition-colors flex items-center gap-2">
                        <Icon name="Key" fallback="Circle" size={11} />
                        Создать инвайт
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

function GirlsAdminSection({ girls }: { girls: typeof MOCK_GIRLS_ADMIN }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? girls : girls.filter(g => g.status === filter);

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {[["all","Все"],["verified","Верифицированы"],["pending","Ожидают"]].map(([k,l]) => (
          <button key={k} onClick={() => setFilter(k)}
            className={`font-ui text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 border transition-all ${filter === k ? "border-gold text-gold bg-gold/5" : "border-border text-muted-foreground"}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="border border-border overflow-hidden">
        <div className="grid grid-cols-5 px-7 py-3 border-b border-border bg-card/30">
          {["Участница","Город","Встреч","Рейтинг","Статус"].map(h => (
            <div key={h} className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">{h}</div>
          ))}
        </div>
        <div className="divide-y divide-border">
          {filtered.map(g => (
            <>
              <div key={g.id} onClick={() => setSelected(selected === g.id ? null : g.id)}
                className="grid grid-cols-5 px-7 py-4 hover:bg-card/20 transition-colors cursor-pointer items-center">
                <div>
                  <div className="font-ui text-sm font-light text-foreground">{g.name}</div>
                  <div className="font-ui text-[0.55rem] text-muted-foreground">С {g.joined} года</div>
                </div>
                <div className="font-ui text-xs text-muted-foreground font-light">{g.city}</div>
                <div className="font-display text-xl text-gold font-light">{g.events}</div>
                <div className="font-ui text-xs text-foreground">{g.rating > 0 ? g.rating : "—"}</div>
                <div>
                  <span className={`font-ui text-[0.5rem] tracking-[0.15em] uppercase px-2 py-0.5 ${g.status === "verified" ? "text-green-400 bg-green-400/10" : "text-gold bg-gold/10"}`}>
                    {g.status === "verified" ? "Верифицирована" : "Ожидает"}
                  </span>
                </div>
              </div>
              {selected === g.id && (
                <div className="px-7 py-5 bg-card/30 border-t border-gold/20">
                  <div className="flex gap-3 flex-wrap">
                    {g.status === "pending" && (
                      <button className="font-ui text-[0.6rem] tracking-[0.15em] uppercase border border-green-500/40 text-green-400 px-4 py-2 hover:bg-green-500/5 transition-colors flex items-center gap-2">
                        <Icon name="Check" fallback="Circle" size={11} />
                        Верифицировать
                      </button>
                    )}
                    <button className="font-ui text-[0.6rem] tracking-[0.15em] uppercase border border-gold/40 text-gold px-4 py-2 hover:bg-gold/5 transition-colors">Изменить уровень</button>
                    <button className="font-ui text-[0.6rem] tracking-[0.15em] uppercase border border-border text-muted-foreground px-4 py-2 hover:border-gold/40 transition-colors">Написать</button>
                    <button className="font-ui text-[0.6rem] tracking-[0.15em] uppercase border border-destructive/40 text-destructive/70 px-4 py-2 hover:border-destructive/60 transition-colors">Заморозить</button>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

function RequestsSection({ requests }: { requests: typeof MOCK_REQUESTS }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? requests : requests.filter(r => r.status === filter);
  const statusConfig = {
    pending: { label: "Ожидает", color: "text-gold", bg: "bg-gold/10" },
    approved: { label: "Одобрен", color: "text-green-400", bg: "bg-green-400/10" },
    declined: { label: "Отклонён", color: "text-destructive", bg: "bg-destructive/10" },
  };

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {[["all","Все"],["pending","Ожидают"],["approved","Одобрены"],["declined","Отклонены"]].map(([k,l]) => (
          <button key={k} onClick={() => setFilter(k)}
            className={`font-ui text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 border transition-all ${filter === k ? "border-gold text-gold bg-gold/5" : "border-border text-muted-foreground"}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="border border-border overflow-hidden">
        <div className="grid grid-cols-6 px-7 py-3 border-b border-border bg-card/30">
          {["Член клуба","Участница","Тип","Дата","Город","Статус"].map(h => (
            <div key={h} className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">{h}</div>
          ))}
        </div>
        <div className="divide-y divide-border">
          {filtered.map(r => {
            const s = statusConfig[r.status as keyof typeof statusConfig];
            return (
              <div key={r.id} className="grid grid-cols-6 px-7 py-4 hover:bg-card/20 transition-colors items-center group">
                <div className="font-ui text-sm font-light text-foreground">{r.member}</div>
                <div className="font-ui text-sm font-light text-foreground">{r.girl}</div>
                <div className="font-ui text-xs text-muted-foreground">{r.type}</div>
                <div className="font-ui text-xs text-muted-foreground">{r.date}</div>
                <div className="font-ui text-xs text-muted-foreground">{r.city}</div>
                <div className="flex items-center gap-2">
                  <span className={`font-ui text-[0.5rem] tracking-[0.15em] uppercase px-2 py-0.5 ${s.color} ${s.bg}`}>{s.label}</span>
                  {r.status === "pending" && (
                    <div className="hidden group-hover:flex gap-1">
                      <button className="w-5 h-5 bg-green-500/10 border border-green-500/30 flex items-center justify-center hover:bg-green-500/20 transition-colors">
                        <Icon name="Check" fallback="Circle" size={9} className="text-green-400" />
                      </button>
                      <button className="w-5 h-5 bg-destructive/10 border border-destructive/30 flex items-center justify-center hover:bg-destructive/20 transition-colors">
                        <Icon name="X" fallback="Circle" size={9} className="text-destructive" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AdminMessagesSection({ messages }: { messages: typeof MOCK_MESSAGES_ADMIN }) {
  const [active, setActive] = useState<number | null>(1);
  const [reply, setReply] = useState("");
  const activeMsg = messages.find(m => m.id === active);

  return (
    <div className="flex gap-6 h-[70vh]">
      <div className="w-80 flex-shrink-0 border border-border flex flex-col">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <span className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">Все чаты</span>
          <span className="font-ui text-[0.55rem] bg-gold text-background px-2 py-0.5">{messages.length}</span>
        </div>
        <div className="flex-1 overflow-auto divide-y divide-border">
          {messages.map(m => (
            <div key={m.id} onClick={() => setActive(m.id)}
              className={`px-5 py-4 cursor-pointer hover:bg-card/20 transition-colors ${active === m.id ? "bg-gold/5 border-l-2 border-l-gold" : ""}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-ui text-xs font-light text-foreground">{m.from}</span>
                <div className="flex items-center gap-2">
                  {m.flagged && <Icon name="Flag" fallback="Circle" size={10} className="text-destructive" />}
                  <span className="font-ui text-[0.55rem] text-muted-foreground">{m.time}</span>
                </div>
              </div>
              <div className="font-ui text-[0.6rem] text-muted-foreground mb-0.5">→ {m.to}</div>
              <p className="font-ui text-[0.6rem] text-muted-foreground truncate">{m.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 border border-border flex flex-col">
        {activeMsg ? (
          <>
            <div className="px-7 py-4 border-b border-border flex items-center justify-between">
              <div>
                <div className="font-ui text-xs font-light text-foreground">{activeMsg.from} → {activeMsg.to}</div>
                <div className="font-ui text-[0.55rem] text-muted-foreground">{activeMsg.time}</div>
              </div>
              <div className="flex gap-2">
                <button className="w-7 h-7 border border-border flex items-center justify-center hover:border-gold/40 transition-colors">
                  <Icon name="Flag" fallback="Circle" size={11} className={activeMsg.flagged ? "text-destructive" : "text-muted-foreground"} />
                </button>
                <button className="w-7 h-7 border border-border flex items-center justify-center hover:border-gold/40 transition-colors">
                  <Icon name="Archive" fallback="Circle" size={11} className="text-muted-foreground" />
                </button>
              </div>
            </div>
            <div className="flex-1 p-7">
              <div className="bg-card border border-border p-5 max-w-[70%]">
                <p className="font-ui text-sm font-light text-foreground leading-relaxed tracking-wide">{activeMsg.text}</p>
                <span className="font-ui text-[0.5rem] text-muted-foreground mt-2 block">{activeMsg.time}</span>
              </div>
            </div>
            <div className="px-7 py-4 border-t border-border flex gap-3">
              <input value={reply} onChange={e => setReply(e.target.value)}
                className="flex-1 bg-transparent border border-border px-4 py-3 font-ui text-xs font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors"
                placeholder="Ответить от имени менеджера..." />
              <button onClick={() => setReply("")} className="btn-gold px-5 py-3">
                <Icon name="Send" fallback="Circle" size={14} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Icon name="MessageSquare" fallback="Circle" size={32} className="text-muted-foreground/30" />
          </div>
        )}
      </div>
    </div>
  );
}

function EventsSection() {
  const events = [
    { name: "Закрытый вечер в галерее", date: "15 мар 2026", city: "Москва", guests: 24, status: "confirmed" },
    { name: "Яхт-вечеринка", date: "22 мар 2026", city: "Монако", guests: 18, status: "confirmed" },
    { name: "Гастрономический ужин", date: "28 мар 2026", city: "Париж", guests: 12, status: "planning" },
    { name: "Частный концерт", date: "5 апр 2026", city: "Лондон", guests: 30, status: "planning" },
  ];

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Запланировано", val: "4", icon: "Calendar" },
          { label: "В этом месяце", val: "2", icon: "Clock" },
          { label: "Участников", val: "84", icon: "Users" },
        ].map(s => (
          <div key={s.label} className="card-dark p-6 flex items-center gap-4">
            <Icon name={s.icon} fallback="Circle" size={16} className="text-gold" />
            <div>
              <div className="font-display text-3xl text-gold font-light">{s.val}</div>
              <div className="font-ui text-[0.55rem] text-muted-foreground tracking-wide uppercase">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="border border-border overflow-hidden">
        <div className="grid grid-cols-5 px-7 py-3 border-b border-border bg-card/30">
          {["Мероприятие","Дата","Город","Гостей","Статус"].map(h => (
            <div key={h} className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">{h}</div>
          ))}
        </div>
        <div className="divide-y divide-border">
          {events.map((e, i) => (
            <div key={i} className="grid grid-cols-5 px-7 py-4 hover:bg-card/20 transition-colors items-center">
              <div className="font-ui text-sm font-light text-foreground">{e.name}</div>
              <div className="font-ui text-xs text-muted-foreground">{e.date}</div>
              <div className="font-ui text-xs text-muted-foreground">{e.city}</div>
              <div className="font-display text-xl text-gold font-light">{e.guests}</div>
              <span className={`font-ui text-[0.5rem] tracking-[0.15em] uppercase px-2 py-0.5 w-fit ${e.status === "confirmed" ? "text-green-400 bg-green-400/10" : "text-gold bg-gold/10"}`}>
                {e.status === "confirmed" ? "Подтверждено" : "Планируется"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InvitesSection({ invites }: { invites: typeof MOCK_INVITES }) {
  const [generating, setGenerating] = useState(false);
  const [newTier, setNewTier] = useState("Silver");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="grid grid-cols-3 gap-4 flex-1 mr-6">
          {[
            { label: "Всего кодов", val: invites.length },
            { label: "Активных", val: invites.filter(i => !i.used).length },
            { label: "Использованных", val: invites.filter(i => i.used).length },
          ].map(s => (
            <div key={s.label} className="card-dark p-5 text-center">
              <div className="font-display text-3xl text-gold font-light">{s.val}</div>
              <div className="font-ui text-[0.55rem] text-muted-foreground tracking-wide uppercase">{s.label}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setGenerating(true)} className="btn-gold flex items-center gap-2">
          <Icon name="Plus" fallback="Circle" size={13} />
          Создать инвайт
        </button>
      </div>

      {generating && (
        <div className="border border-gold/30 bg-gold/5 p-7 mb-6 animate-fade-up" style={{ animationFillMode: "forwards" }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-xl font-light">Новый инвайт-код</h3>
            <button onClick={() => setGenerating(false)} className="text-muted-foreground hover:text-gold transition-colors">
              <Icon name="X" fallback="Circle" size={16} />
            </button>
          </div>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Уровень</label>
              <div className="flex gap-2">
                {["Silver", "Black", "Obsidian"].map(t => (
                  <button key={t} onClick={() => setNewTier(t)}
                    className={`font-ui text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 border transition-all ${newTier === t ? "border-gold text-gold bg-gold/5" : "border-border text-muted-foreground"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => setGenerating(false)} className="btn-gold py-2.5 px-6">Сгенерировать</button>
          </div>
        </div>
      )}

      <div className="border border-border overflow-hidden">
        <div className="grid grid-cols-5 px-7 py-3 border-b border-border bg-card/30">
          {["Код","Уровень","Создан","Кем","Статус"].map(h => (
            <div key={h} className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">{h}</div>
          ))}
        </div>
        <div className="divide-y divide-border">
          {invites.map((inv, i) => (
            <div key={i} className="grid grid-cols-5 px-7 py-4 hover:bg-card/20 transition-colors items-center">
              <div className="font-ui text-xs font-light text-foreground tracking-[0.1em]">{inv.code}</div>
              <div className="font-ui text-xs text-gold tracking-[0.15em] uppercase">{inv.tier}</div>
              <div className="font-ui text-xs text-muted-foreground">{inv.created}</div>
              <div className="font-ui text-xs text-muted-foreground">{inv.createdBy}</div>
              <div>
                {inv.used ? (
                  <div>
                    <span className="font-ui text-[0.5rem] tracking-wide text-muted-foreground bg-muted px-2 py-0.5">Использован</span>
                    {inv.usedBy && <div className="font-ui text-[0.55rem] text-muted-foreground mt-1">{inv.usedBy}</div>}
                  </div>
                ) : (
                  <span className="font-ui text-[0.5rem] tracking-wide text-green-400 bg-green-400/10 px-2 py-0.5">Активен</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WaitlistSection({ waitlist }: { waitlist: typeof MOCK_WAITLIST }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Всего заявок", val: waitlist.length },
          { label: "Средний балл", val: Math.round(waitlist.reduce((a, w) => a + w.score, 0) / waitlist.length) },
          { label: "Одобрено в этом месяце", val: 12 },
        ].map(s => (
          <div key={s.label} className="card-dark p-5 text-center">
            <div className="font-display text-3xl text-gold font-light">{s.val}</div>
            <div className="font-ui text-[0.55rem] text-muted-foreground tracking-wide uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="border border-border overflow-hidden">
        <div className="grid grid-cols-6 px-7 py-3 border-b border-border bg-card/30">
          {["Заявитель","Email","Город","Дата","Реферал","Балл"].map(h => (
            <div key={h} className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">{h}</div>
          ))}
        </div>
        <div className="divide-y divide-border">
          {waitlist.map(w => (
            <>
              <div key={w.id} onClick={() => setSelected(selected === w.id ? null : w.id)}
                className="grid grid-cols-6 px-7 py-4 hover:bg-card/20 transition-colors cursor-pointer items-center">
                <div className="font-ui text-sm font-light text-foreground">{w.name}</div>
                <div className="font-ui text-xs text-muted-foreground font-light">{w.email}</div>
                <div className="font-ui text-xs text-muted-foreground">{w.city}</div>
                <div className="font-ui text-xs text-muted-foreground">{w.date}</div>
                <div className="font-ui text-xs text-muted-foreground">{w.ref}</div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-border max-w-16">
                    <div className="h-full bg-gold" style={{ width: `${w.score}%` }} />
                  </div>
                  <span className="font-ui text-xs text-gold">{w.score}</span>
                </div>
              </div>
              {selected === w.id && (
                <div className="px-7 py-5 bg-card/30 border-t border-gold/20">
                  <div className="flex gap-3">
                    <button className="font-ui text-[0.6rem] tracking-[0.15em] uppercase border border-green-500/40 text-green-400 px-4 py-2 hover:bg-green-500/5 transition-colors flex items-center gap-2">
                      <Icon name="Check" fallback="Circle" size={11} />
                      Одобрить и выдать инвайт
                    </button>
                    <button className="font-ui text-[0.6rem] tracking-[0.15em] uppercase border border-border text-muted-foreground px-4 py-2 hover:border-gold/40 transition-colors">Запросить доп. информацию</button>
                    <button className="font-ui text-[0.6rem] tracking-[0.15em] uppercase border border-destructive/40 text-destructive/70 px-4 py-2 hover:border-destructive/60 transition-colors">Отклонить</button>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminSettingsSection() {
  const [settings, setSettings] = useState({
    autoVerify: false, waitlistOpen: true, maxMembers: "2500", maxObsidian: "50",
    maintenanceMode: false, strictInviteOnly: false,
  });

  return (
    <div className="max-w-2xl space-y-6">
      <div className="border border-border p-8">
        <h2 className="font-display text-2xl font-light mb-6">Ограничения клуба</h2>
        <div className="space-y-5">
          <div>
            <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Максимум членов клуба</label>
            <input value={settings.maxMembers} onChange={e => setSettings(s => ({ ...s, maxMembers: e.target.value }))}
              className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors" />
          </div>
          <div>
            <label className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Максимум Obsidian</label>
            <input value={settings.maxObsidian} onChange={e => setSettings(s => ({ ...s, maxObsidian: e.target.value }))}
              className="w-full bg-transparent border border-border px-4 py-3 font-ui text-sm font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors" />
          </div>
        </div>
      </div>

      <div className="border border-border p-8">
        <h2 className="font-display text-2xl font-light mb-6">Режимы работы</h2>
        <div className="space-y-4">
          {[
            { key: "waitlistOpen" as const, label: "Принимать заявки в лист ожидания", desc: "Если выключено — форма на сайте будет скрыта" },
            { key: "autoVerify" as const, label: "Автоверификация участниц", desc: "Опасно: включайте только для тестирования" },
            { key: "strictInviteOnly" as const, label: "Только по инвайтам (без WL)", desc: "Закрыть лист ожидания, оставить только инвайты" },
            { key: "maintenanceMode" as const, label: "Режим обслуживания", desc: "Сайт будет недоступен для пользователей" },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
              <div>
                <span className="font-ui text-sm font-light text-foreground tracking-wide block">{item.label}</span>
                <span className="font-ui text-[0.6rem] text-muted-foreground tracking-wide">{item.desc}</span>
              </div>
              <button onClick={() => setSettings(s => ({ ...s, [item.key]: !s[item.key] }))}
                className={`w-10 h-5 rounded-full transition-all relative flex-shrink-0 ${settings[item.key] ? (item.key === "maintenanceMode" ? "bg-destructive" : "bg-gold") : "bg-border"}`}>
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${settings[item.key] ? "right-0.5" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-border p-8">
        <h2 className="font-display text-2xl font-light mb-6">Безопасность системы</h2>
        <div className="space-y-3">
          {[
            { icon: "Download", label: "Экспорт базы данных" },
            { icon: "RefreshCw", label: "Очистить кэш системы" },
            { icon: "FileText", label: "Скачать логи активности" },
          ].map(btn => (
            <button key={btn.label} className="w-full flex items-center justify-between border border-border px-5 py-4 hover:border-gold/40 transition-colors group">
              <div className="flex items-center gap-3">
                <Icon name={btn.icon} fallback="Circle" size={14} className="text-muted-foreground group-hover:text-gold transition-colors" />
                <span className="font-ui text-sm font-light text-foreground tracking-wide">{btn.label}</span>
              </div>
              <Icon name="ChevronRight" fallback="Circle" size={14} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
