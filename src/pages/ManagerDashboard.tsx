import { useState } from "react";
import Icon from "@/components/ui/icon";

type ManagerSection = "overview" | "members" | "girls" | "requests" | "messages" | "schedule" | "waitlist" | "profile";

interface ManagerDashboardProps {
  onNavigate: (page: string) => void;
}

const MOCK_MY_MEMBERS = [
  { id: 1, name: "Алексей Воронов", tier: "Black", city: "Москва", lastActive: "Сегодня", nextEvent: "15 мар", unread: 2 },
  { id: 2, name: "Михаил Соколов", tier: "Silver", city: "Лондон", lastActive: "Вчера", nextEvent: "28 мар", unread: 0 },
  { id: 3, name: "Сергей Морозов", tier: "Silver", city: "Париж", lastActive: "3 дня назад", nextEvent: "—", unread: 1 },
];

const MOCK_MY_GIRLS = [
  { id: 1, name: "Александра К.", city: "Москва", status: "online", level: 3, nextEvent: "15 мар", unread: 1 },
  { id: 2, name: "Елена С.", city: "Лондон", status: "pending_verify", level: 0, nextEvent: "—", unread: 0 },
  { id: 3, name: "Диана В.", city: "Париж", status: "online", level: 2, nextEvent: "5 апр", unread: 0 },
];

const MOCK_PENDING_REQUESTS = [
  { id: 1, member: "Алексей В.", girl: "Александра К.", type: "Ужин", date: "15 мар", city: "Москва", urgent: true },
  { id: 2, member: "Михаил С.", girl: "Виктория М.", type: "Мероприятие", date: "28 мар", city: "Лондон", urgent: false },
];

const MOCK_SCHEDULE_MGR = [
  { date: "15 мар", event: "Ужин", member: "Алексей В.", girl: "Александра К.", city: "Москва", status: "confirmed" },
  { date: "28 мар", event: "Мероприятие", member: "Михаил С.", girl: "Виктория М.", city: "Лондон", status: "pending" },
  { date: "5 апр", event: "Концерт", member: "Сергей М.", girl: "Диана В.", city: "Париж", status: "confirmed" },
];

const MOCK_CHATS = [
  { id: 1, name: "Алексей Воронов", type: "member", last: "Хотел уточнить статус запроса по яхте.", time: "10:32", unread: 2 },
  { id: 2, name: "Александра К.", type: "girl", last: "Добрый! Всё по плану, буду в 19:30.", time: "10:05", unread: 1 },
  { id: 3, name: "Михаил Соколов", type: "member", last: "Спасибо за подтверждение!", time: "Вчера", unread: 0 },
  { id: 4, name: "Диана В.", type: "girl", last: "Можно уточнить дресс-код?", time: "Вчера", unread: 0 },
];

export default function ManagerDashboard({ onNavigate }: ManagerDashboardProps) {
  const [section, setSection] = useState<ManagerSection>("overview");

  const navItems: { key: ManagerSection; icon: string; label: string; badge?: number }[] = [
    { key: "overview", icon: "LayoutDashboard", label: "Обзор" },
    { key: "members", icon: "Users", label: "Мои члены", badge: MOCK_MY_MEMBERS.length },
    { key: "girls", icon: "UserCheck", label: "Мои участницы", badge: 1 },
    { key: "requests", icon: "FileText", label: "Запросы", badge: MOCK_PENDING_REQUESTS.length },
    { key: "messages", icon: "MessageSquare", label: "Сообщения", badge: 3 },
    { key: "schedule", icon: "Calendar", label: "Расписание" },
    { key: "waitlist", icon: "Clock", label: "Лист ожидания" },
    { key: "profile", icon: "User", label: "Мой профиль" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 flex-shrink-0 border-r border-border flex flex-col h-screen sticky top-0">
        <div className="px-6 py-8 border-b border-border">
          <div className="font-display text-xl tracking-[0.3em] text-gold mb-1">NOIR</div>
          <div className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">Manager Panel</div>
        </div>
        <div className="px-4 py-3 border-b border-border bg-card/30">
          <div className="flex items-center gap-2">
            <Icon name="Briefcase" fallback="Circle" size={12} className="text-gold" />
            <span className="font-ui text-[0.55rem] tracking-[0.15em] uppercase text-gold">Менеджер клуба</span>
          </div>
        </div>
        <nav className="flex-1 py-6 overflow-auto">
          {navItems.map((item) => (
            <button key={item.key} onClick={() => setSection(item.key)}
              className={`sidebar-item w-full justify-between ${section === item.key ? "active" : ""}`}>
              <span className="flex items-center gap-3">
                <Icon name={item.icon} fallback="Circle" size={15} />
                {item.label}
              </span>
              {item.badge != null && (
                <span className="font-ui text-[0.5rem] bg-gold text-background px-1.5 py-0.5 min-w-[18px] text-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="px-4 py-6 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-gold/10 border border-gold/30 flex items-center justify-center">
              <span className="font-display text-gold">И</span>
            </div>
            <div>
              <div className="font-ui text-xs text-foreground font-light">Ирина Соколова</div>
              <div className="font-ui text-[0.5rem] text-muted-foreground">3 члена · 3 участницы</div>
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
            <div className="font-ui text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground mb-1">Менеджер</div>
            <h1 className="font-display text-2xl font-light">
              {navItems.find(n => n.key === section)?.label}
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
          {section === "overview" && <ManagerOverview onNavigate={setSection} />}
          {section === "members" && <ManagerMembers members={MOCK_MY_MEMBERS} />}
          {section === "girls" && <ManagerGirls girls={MOCK_MY_GIRLS} />}
          {section === "requests" && <ManagerRequests requests={MOCK_PENDING_REQUESTS} />}
          {section === "messages" && <ManagerMessages chats={MOCK_CHATS} />}
          {section === "schedule" && <ManagerSchedule schedule={MOCK_SCHEDULE_MGR} />}
          {section === "waitlist" && <ManagerWaitlist />}
          {section === "profile" && <ManagerProfile />}
        </div>
      </main>
    </div>
  );
}

function ManagerOverview({ onNavigate }: { onNavigate: (s: ManagerSection) => void }) {
  const stats = [
    { label: "Мои члены", val: "3", icon: "Users", section: "members" as ManagerSection },
    { label: "Мои участницы", val: "3", icon: "UserCheck", section: "girls" as ManagerSection },
    { label: "Ожидают решения", val: "2", icon: "FileText", section: "requests" as ManagerSection },
    { label: "Встреч в этом месяце", val: "3", icon: "Calendar", section: "schedule" as ManagerSection },
  ];
  const tasks = [
    { label: "Верифицировать Елену С.", priority: "high", type: "Верификация", time: "Срочно" },
    { label: "Одобрить запрос Алексея В.", priority: "high", type: "Запрос", time: "Сегодня" },
    { label: "Проверить анкету из WL", priority: "medium", type: "Лист ожидания", time: "До пятницы" },
    { label: "Обновить профиль Дианы В.", priority: "low", type: "Профиль", time: "На неделе" },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map(s => (
          <div key={s.label} onClick={() => onNavigate(s.section)}
            className="card-dark p-6 cursor-pointer hover:border-gold/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">{s.label}</div>
              <Icon name={s.icon} fallback="Circle" size={13} className="text-gold" />
            </div>
            <div className="font-display text-5xl text-gold font-light">{s.val}</div>
          </div>
        ))}
      </div>

      {/* Tasks */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="border border-border">
          <div className="px-7 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-display text-xl font-light">Задачи на сегодня</h3>
            <span className="font-ui text-[0.55rem] bg-gold text-background px-2 py-0.5">{tasks.filter(t => t.priority === "high").length} срочных</span>
          </div>
          <div className="divide-y divide-border">
            {tasks.map((t, i) => (
              <div key={i} className="px-7 py-4 flex items-center gap-4 hover:bg-card/20 transition-colors">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${t.priority === "high" ? "bg-gold" : t.priority === "medium" ? "bg-blue-400" : "bg-border"}`} />
                <div className="flex-1">
                  <div className="font-ui text-xs font-light text-foreground">{t.label}</div>
                  <div className="font-ui text-[0.55rem] text-muted-foreground">{t.type}</div>
                </div>
                <span className="font-ui text-[0.55rem] text-muted-foreground">{t.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border">
          <div className="px-7 py-4 border-b border-border">
            <h3 className="font-display text-xl font-light">Ближайшие встречи</h3>
          </div>
          <div className="divide-y divide-border">
            {MOCK_SCHEDULE_MGR.map((s, i) => (
              <div key={i} className="px-7 py-4 hover:bg-card/20 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-ui text-xs font-light text-foreground">{s.event} · {s.city}</span>
                  <span className="font-ui text-[0.6rem] text-gold">{s.date}</span>
                </div>
                <div className="font-ui text-[0.6rem] text-muted-foreground">{s.member} + {s.girl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Unread messages */}
      <div className="border border-border">
        <div className="px-7 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-display text-xl font-light">Непрочитанные сообщения</h3>
          <button onClick={() => onNavigate("messages")} className="font-ui text-[0.6rem] tracking-[0.15em] uppercase text-gold hover:underline">Все чаты</button>
        </div>
        <div className="divide-y divide-border">
          {MOCK_CHATS.filter(c => c.unread > 0).map(c => (
            <div key={c.id} onClick={() => onNavigate("messages")}
              className="px-7 py-4 flex items-center gap-4 hover:bg-card/20 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                <span className="font-display text-gold text-sm">{c.name[0]}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-ui text-xs font-light text-foreground">{c.name}</span>
                  <span className={`font-ui text-[0.5rem] tracking-[0.15em] uppercase border px-1.5 py-0.5 ${c.type === "member" ? "border-gold/30 text-gold" : "border-border text-muted-foreground"}`}>
                    {c.type === "member" ? "Член" : "Участница"}
                  </span>
                </div>
                <p className="font-ui text-[0.6rem] text-muted-foreground">{c.last}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="font-ui text-[0.55rem] text-muted-foreground">{c.time}</span>
                <span className="w-5 h-5 bg-gold text-background rounded-full font-ui text-[0.55rem] flex items-center justify-center">{c.unread}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ManagerMembers({ members }: { members: typeof MOCK_MY_MEMBERS }) {
  const [active, setActive] = useState<number | null>(null);
  const [msgOpen, setMsgOpen] = useState<number | null>(null);
  const [msg, setMsg] = useState("");
  const tierColor = { Silver: "text-muted-foreground", Black: "text-gold", Obsidian: "text-purple-400" };

  return (
    <div>
      <div className="space-y-4">
        {members.map(m => (
          <div key={m.id} className={`border transition-all ${active === m.id ? "border-gold" : "border-border hover:border-gold/30"}`}>
            <div className="p-6 flex items-center justify-between cursor-pointer" onClick={() => setActive(active === m.id ? null : m.id)}>
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <span className="font-display text-gold">{m.name[0]}</span>
                </div>
                <div>
                  <div className="font-ui text-sm font-light text-foreground">{m.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`font-ui text-[0.55rem] tracking-[0.15em] uppercase ${tierColor[m.tier as keyof typeof tierColor]}`}>{m.tier}</span>
                    <span className="text-border">·</span>
                    <span className="font-ui text-[0.55rem] text-muted-foreground">{m.city}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                {m.unread > 0 && (
                  <span className="w-5 h-5 bg-gold text-background rounded-full font-ui text-[0.55rem] flex items-center justify-center">{m.unread}</span>
                )}
                <div className="text-right">
                  <div className="font-ui text-[0.55rem] text-muted-foreground">Последняя активность</div>
                  <div className="font-ui text-xs text-foreground">{m.lastActive}</div>
                </div>
                <Icon name={active === m.id ? "ChevronUp" : "ChevronDown"} fallback="Circle" size={14} className="text-muted-foreground" />
              </div>
            </div>

            {active === m.id && (
              <div className="px-6 pb-6 border-t border-border pt-5">
                <div className="grid md:grid-cols-3 gap-5 mb-5">
                  <div className="border border-border p-4">
                    <div className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground mb-1">Ближайшая встреча</div>
                    <div className="font-ui text-sm font-light text-foreground">{m.nextEvent}</div>
                  </div>
                  <div className="border border-border p-4">
                    <div className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground mb-1">Уровень</div>
                    <div className={`font-ui text-sm font-light ${tierColor[m.tier as keyof typeof tierColor]}`}>{m.tier}</div>
                  </div>
                  <div className="border border-border p-4">
                    <div className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground mb-1">Город</div>
                    <div className="font-ui text-sm font-light text-foreground">{m.city}</div>
                  </div>
                </div>

                {msgOpen === m.id ? (
                  <div className="border border-border p-5 animate-fade-up" style={{ animationFillMode: "forwards" }}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">Написать {m.name}</span>
                      <button onClick={() => setMsgOpen(null)} className="text-muted-foreground hover:text-gold transition-colors">
                        <Icon name="X" fallback="Circle" size={14} />
                      </button>
                    </div>
                    <textarea value={msg} onChange={e => setMsg(e.target.value)}
                      rows={3} className="w-full bg-transparent border border-border px-4 py-3 font-ui text-xs font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors resize-none mb-3"
                      placeholder="Сообщение..." />
                    <div className="flex gap-2">
                      <button onClick={() => { setMsgOpen(null); setMsg(""); }} className="btn-gold flex-1 py-2">Отправить</button>
                      <button onClick={() => setMsgOpen(null)} className="btn-outline-gold px-4 py-2">Отмена</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button onClick={() => setMsgOpen(m.id)} className="btn-gold py-2 px-5 flex items-center gap-2">
                      <Icon name="MessageSquare" fallback="Circle" size={13} />
                      Написать
                    </button>
                    <button className="btn-outline-gold py-2 px-5">Профиль</button>
                    <button className="font-ui text-[0.6rem] tracking-[0.15em] uppercase border border-border text-muted-foreground px-4 py-2 hover:border-gold/40 transition-colors">История встреч</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ManagerGirls({ girls }: { girls: typeof MOCK_MY_GIRLS }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Верифицированы", val: girls.filter(g => g.status !== "pending_verify").length },
          { label: "Ожидают проверки", val: girls.filter(g => g.status === "pending_verify").length },
          { label: "Онлайн сейчас", val: girls.filter(g => g.status === "online").length },
        ].map(s => (
          <div key={s.label} className="card-dark p-5 text-center">
            <div className="font-display text-3xl text-gold font-light">{s.val}</div>
            <div className="font-ui text-[0.55rem] text-muted-foreground tracking-wide uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {girls.map(g => (
          <div key={g.id} className={`border transition-all ${active === g.id ? "border-gold" : g.status === "pending_verify" ? "border-gold/30" : "border-border hover:border-gold/30"}`}>
            <div className="p-6 flex items-center justify-between cursor-pointer" onClick={() => setActive(active === g.id ? null : g.id)}>
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10">
                  <div className="w-full h-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <span className="font-display text-gold">{g.name[0]}</span>
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-background ${g.status === "online" ? "bg-green-400" : "bg-gold"}`} />
                </div>
                <div>
                  <div className="font-ui text-sm font-light text-foreground">{g.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-ui text-[0.55rem] text-muted-foreground">{g.city}</span>
                    {g.level > 0 && (
                      <>
                        <span className="text-border">·</span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: g.level }).map((_, i) => (
                            <span key={i} className="w-1 h-1 bg-gold rounded-full" />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {g.status === "pending_verify" && (
                  <span className="font-ui text-[0.5rem] tracking-[0.15em] uppercase text-gold bg-gold/10 px-2 py-0.5">Нужна верификация</span>
                )}
                {g.unread > 0 && (
                  <span className="w-5 h-5 bg-gold text-background rounded-full font-ui text-[0.55rem] flex items-center justify-center">{g.unread}</span>
                )}
                <Icon name={active === g.id ? "ChevronUp" : "ChevronDown"} fallback="Circle" size={14} className="text-muted-foreground" />
              </div>
            </div>

            {active === g.id && (
              <div className="px-6 pb-6 border-t border-border pt-5">
                {g.status === "pending_verify" && (
                  <div className="border border-gold/20 bg-gold/5 p-5 mb-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon name="AlertCircle" fallback="Circle" size={15} className="text-gold" />
                      <span className="font-ui text-xs text-gold tracking-wide">Требует верификации</span>
                    </div>
                    <p className="font-ui text-xs font-light text-muted-foreground tracking-wide mb-4">
                      Участница загрузила документы и анкету. Проверьте данные и подтвердите верификацию.
                    </p>
                    <div className="flex gap-3">
                      <button className="font-ui text-[0.6rem] tracking-[0.15em] uppercase border border-green-500/40 text-green-400 px-4 py-2 hover:bg-green-500/5 transition-colors flex items-center gap-2">
                        <Icon name="Check" fallback="Circle" size={11} />
                        Верифицировать
                      </button>
                      <button className="font-ui text-[0.6rem] tracking-[0.15em] uppercase border border-border text-muted-foreground px-4 py-2 hover:border-gold/40 transition-colors">Запросить доп. данные</button>
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <button className="btn-gold py-2 px-5 flex items-center gap-2">
                    <Icon name="MessageSquare" fallback="Circle" size={13} />
                    Написать
                  </button>
                  <button className="btn-outline-gold py-2 px-5">Профиль</button>
                  <button className="font-ui text-[0.6rem] tracking-[0.15em] uppercase border border-border text-muted-foreground px-4 py-2 hover:border-gold/40 transition-colors">Изменить уровень</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ManagerRequests({ requests }: { requests: typeof MOCK_PENDING_REQUESTS }) {
  const [processed, setProcessed] = useState<Record<number, "approved" | "declined">>({});

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Ожидают решения", val: requests.length - Object.keys(processed).length },
          { label: "Одобрено", val: Object.values(processed).filter(v => v === "approved").length },
          { label: "Отклонено", val: Object.values(processed).filter(v => v === "declined").length },
        ].map(s => (
          <div key={s.label} className="card-dark p-5 text-center">
            <div className="font-display text-3xl text-gold font-light">{s.val}</div>
            <div className="font-ui text-[0.55rem] text-muted-foreground tracking-wide uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {requests.map(r => {
          const status = processed[r.id];
          return (
            <div key={r.id} className={`border p-7 transition-all ${r.urgent && !status ? "border-gold/40" : "border-border"}`}>
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {r.urgent && !status && (
                      <span className="font-ui text-[0.5rem] tracking-[0.2em] uppercase bg-gold text-background px-2 py-0.5">Срочно</span>
                    )}
                    {status === "approved" && (
                      <span className="font-ui text-[0.5rem] tracking-[0.2em] uppercase text-green-400 bg-green-400/10 px-2 py-0.5">Одобрен</span>
                    )}
                    {status === "declined" && (
                      <span className="font-ui text-[0.5rem] tracking-[0.2em] uppercase text-destructive bg-destructive/10 px-2 py-0.5">Отклонён</span>
                    )}
                    {!status && (
                      <span className="font-ui text-[0.5rem] tracking-[0.2em] uppercase text-gold bg-gold/10 px-2 py-0.5">Ожидает решения</span>
                    )}
                  </div>
                  <h3 className="font-display text-2xl font-light mb-1">{r.type}</h3>
                  <p className="font-ui text-xs text-muted-foreground tracking-wide">{r.date} · {r.city}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5 mb-6">
                <div className="border border-border p-5">
                  <div className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground mb-2">Запрашивает</div>
                  <div className="font-ui text-sm font-light text-foreground">{r.member}</div>
                  <div className="font-ui text-[0.6rem] text-muted-foreground">Член клуба</div>
                </div>
                <div className="border border-border p-5">
                  <div className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground mb-2">Запрашиваемая участница</div>
                  <div className="font-ui text-sm font-light text-foreground">{r.girl}</div>
                  <div className="font-ui text-[0.6rem] text-muted-foreground">Участница клуба</div>
                </div>
              </div>

              {!status && (
                <div className="border border-border p-5 mb-5">
                  <div className="font-ui text-[0.6rem] tracking-[0.15em] uppercase text-muted-foreground mb-3">Решение менеджера</div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setProcessed(p => ({ ...p, [r.id]: "approved" }))}
                      className="flex-1 font-ui text-[0.6rem] tracking-[0.15em] uppercase border border-green-500/40 text-green-400 py-3 hover:bg-green-500/5 transition-colors flex items-center justify-center gap-2">
                      <Icon name="Check" fallback="Circle" size={12} />
                      Одобрить встречу
                    </button>
                    <button onClick={() => setProcessed(p => ({ ...p, [r.id]: "declined" }))}
                      className="flex-1 font-ui text-[0.6rem] tracking-[0.15em] uppercase border border-destructive/40 text-destructive/70 py-3 hover:bg-destructive/5 transition-colors flex items-center justify-center gap-2">
                      <Icon name="X" fallback="Circle" size={12} />
                      Отклонить
                    </button>
                  </div>
                </div>
              )}

              {status === "approved" && (
                <div className="border border-green-500/20 bg-green-500/5 p-5">
                  <p className="font-ui text-xs font-light text-green-400/80 tracking-wide">
                    Встреча одобрена. Оба участника получили уведомление. Контакты предоставлены.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ManagerMessages({ chats }: { chats: typeof MOCK_CHATS }) {
  const [active, setActive] = useState<number | null>(1);
  const [msg, setMsg] = useState("");
  const activeChat = chats.find(c => c.id === active);

  return (
    <div className="flex gap-6 h-[75vh]">
      <div className="w-72 flex-shrink-0 border border-border flex flex-col">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <span className="font-ui text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">Все чаты</span>
          <span className="font-ui text-[0.55rem] bg-gold text-background px-2 py-0.5">
            {chats.reduce((a, c) => a + c.unread, 0)} новых
          </span>
        </div>
        <div className="flex-1 overflow-auto divide-y divide-border">
          {chats.map(c => (
            <div key={c.id} onClick={() => setActive(c.id)}
              className={`px-5 py-4 cursor-pointer hover:bg-card/20 transition-colors ${active === c.id ? "bg-gold/5 border-l-2 border-l-gold" : ""}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-gold text-sm">{c.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-ui text-xs font-light text-foreground">{c.name}</span>
                      <span className={`font-ui text-[0.45rem] tracking-wide uppercase border px-1.5 ${c.type === "member" ? "border-gold/30 text-gold" : "border-border text-muted-foreground"}`}>
                        {c.type === "member" ? "Член" : "Участница"}
                      </span>
                    </div>
                    <span className="font-ui text-[0.5rem] text-muted-foreground">{c.time}</span>
                  </div>
                  <p className="font-ui text-[0.55rem] text-muted-foreground truncate">{c.last}</p>
                </div>
                {c.unread > 0 && (
                  <span className="w-4 h-4 bg-gold text-background rounded-full font-ui text-[0.5rem] flex items-center justify-center flex-shrink-0">{c.unread}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 border border-border flex flex-col">
        {activeChat ? (
          <>
            <div className="px-7 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <span className="font-display text-gold text-sm">{activeChat.name[0]}</span>
                </div>
                <div>
                  <div className="font-ui text-xs font-light text-foreground">{activeChat.name}</div>
                  <div className="font-ui text-[0.55rem] text-muted-foreground">
                    {activeChat.type === "member" ? "Член клуба" : "Участница клуба"}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-7 h-7 border border-border flex items-center justify-center hover:border-gold/40 transition-colors">
                  <Icon name="User" fallback="Circle" size={12} className="text-muted-foreground" />
                </button>
                <button className="w-7 h-7 border border-border flex items-center justify-center hover:border-gold/40 transition-colors">
                  <Icon name="MoreHorizontal" fallback="Circle" size={12} className="text-muted-foreground" />
                </button>
              </div>
            </div>
            <div className="flex-1 p-7 overflow-auto space-y-4">
              <div className="flex gap-3">
                <div className="w-7 h-7 bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-display text-gold text-xs">{activeChat.name[0]}</span>
                </div>
                <div className="bg-card border border-border px-5 py-3 max-w-[65%]">
                  <p className="font-ui text-xs font-light text-foreground leading-relaxed tracking-wide">{activeChat.last}</p>
                  <span className="font-ui text-[0.5rem] text-muted-foreground mt-1 block">{activeChat.time}</span>
                </div>
              </div>
            </div>
            <div className="px-7 py-4 border-t border-border flex gap-3">
              <input value={msg} onChange={e => setMsg(e.target.value)}
                className="flex-1 bg-transparent border border-border px-4 py-3 font-ui text-xs font-light text-foreground focus:outline-none focus:border-gold/60 transition-colors"
                placeholder={`Ответить ${activeChat.name}...`} />
              <button onClick={() => setMsg("")} className="btn-gold px-5 py-3">
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

function ManagerSchedule({ schedule }: { schedule: typeof MOCK_SCHEDULE_MGR }) {
  const statusConfig = {
    confirmed: { label: "Подтверждено", color: "text-green-400", bg: "bg-green-400/10" },
    pending: { label: "Ожидает", color: "text-gold", bg: "bg-gold/10" },
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Встреч этот месяц", val: schedule.length },
          { label: "Подтверждено", val: schedule.filter(s => s.status === "confirmed").length },
          { label: "Ожидают", val: schedule.filter(s => s.status === "pending").length },
        ].map(s => (
          <div key={s.label} className="card-dark p-5 text-center">
            <div className="font-display text-3xl text-gold font-light">{s.val}</div>
            <div className="font-ui text-[0.55rem] text-muted-foreground tracking-wide uppercase">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="border border-border overflow-hidden">
        <div className="grid grid-cols-5 px-7 py-3 border-b border-border bg-card/30">
          {["Дата","Тип","Член клуба","Участница","Статус"].map(h => (
            <div key={h} className="font-ui text-[0.55rem] tracking-[0.2em] uppercase text-muted-foreground">{h}</div>
          ))}
        </div>
        <div className="divide-y divide-border">
          {schedule.map((s, i) => {
            const st = statusConfig[s.status as keyof typeof statusConfig];
            return (
              <div key={i} className="grid grid-cols-5 px-7 py-4 hover:bg-card/20 transition-colors items-center">
                <div className="font-ui text-sm font-light text-gold">{s.date}</div>
                <div className="font-ui text-xs text-foreground font-light">{s.event}</div>
                <div className="font-ui text-xs text-muted-foreground">{s.member}</div>
                <div className="font-ui text-xs text-muted-foreground">{s.girl}</div>
                <span className={`font-ui text-[0.5rem] tracking-[0.15em] uppercase px-2 py-0.5 w-fit ${st.color} ${st.bg}`}>{st.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ManagerWaitlist() {
  const waitlist = [
    { name: "Сергей Петров", city: "Москва", date: "05.03.2026", ref: "Алексей В.", score: 78, about: "Предприниматель, 35 лет. Интересуется яхтами и гастрономией." },
  ];

  return (
    <div>
      <div className="border border-border p-7 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Icon name="Info" fallback="Circle" size={15} className="text-gold" />
          <span className="font-ui text-[0.6rem] tracking-[0.15em] uppercase text-gold">Ваши заявки на рассмотрении</span>
        </div>
        <p className="font-ui text-xs font-light text-muted-foreground tracking-wide">
          Ниже показаны заявки из листа ожидания, назначенные вам для рассмотрения. После одобрения вы выдаёте инвайт-код.
        </p>
      </div>
      {waitlist.map((w, i) => (
        <div key={i} className="border border-border p-7">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="font-display text-2xl font-light mb-1">{w.name}</h3>
              <div className="flex items-center gap-3">
                <span className="font-ui text-xs text-muted-foreground">{w.city}</span>
                <span className="text-border">·</span>
                <span className="font-ui text-xs text-muted-foreground">Заявка от {w.date}</span>
                <span className="text-border">·</span>
                <span className="font-ui text-xs text-muted-foreground">Реферал: {w.ref}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-ui text-[0.55rem] text-muted-foreground mb-1">Балл</div>
              <div className="font-display text-3xl text-gold font-light">{w.score}</div>
            </div>
          </div>
          <div className="border border-border p-5 mb-5">
            <div className="font-ui text-[0.6rem] tracking-[0.15em] uppercase text-muted-foreground mb-2">О себе</div>
            <p className="font-ui text-sm font-light text-foreground leading-relaxed tracking-wide">{w.about}</p>
          </div>
          <div className="flex gap-3">
            <button className="font-ui text-[0.6rem] tracking-[0.15em] uppercase border border-green-500/40 text-green-400 px-5 py-2.5 hover:bg-green-500/5 transition-colors flex items-center gap-2">
              <Icon name="Check" fallback="Circle" size={11} />
              Одобрить и выдать инвайт
            </button>
            <button className="font-ui text-[0.6rem] tracking-[0.15em] uppercase border border-border text-muted-foreground px-5 py-2.5 hover:border-gold/40 transition-colors">Запросить доп. информацию</button>
            <button className="font-ui text-[0.6rem] tracking-[0.15em] uppercase border border-destructive/40 text-destructive/70 px-5 py-2.5 hover:border-destructive/60 transition-colors">Отклонить</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ManagerProfile() {
  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-16 h-16 bg-gold/10 border border-gold/30 flex items-center justify-center">
          <span className="font-display text-gold text-3xl">И</span>
        </div>
        <div>
          <h2 className="font-display text-3xl font-light">Ирина Соколова</h2>
          <div className="font-ui text-[0.6rem] tracking-[0.15em] uppercase text-gold mt-1">Персональный менеджер NOIR</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { label: "Клиентов", val: "6" },
          { label: "Встреч организовано", val: "48" },
          { label: "Средний рейтинг", val: "4.95" },
          { label: "В команде с", val: "2022" },
        ].map(s => (
          <div key={s.label} className="card-dark p-5 text-center">
            <div className="font-display text-3xl text-gold font-light">{s.val}</div>
            <div className="font-ui text-[0.55rem] text-muted-foreground tracking-wide uppercase">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="border border-border p-7">
        <h3 className="font-display text-xl font-light mb-4">Специализация</h3>
        <div className="flex flex-wrap gap-2">
          {["Москва","Лондон","Париж","Гастрономия","Мероприятия","Путешествия"].map(t => (
            <span key={t} className="font-ui text-[0.55rem] tracking-[0.15em] uppercase border border-gold/30 text-gold/80 px-3 py-1">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
