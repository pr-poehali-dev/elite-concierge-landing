import { useState } from "react";
import Landing from "./Landing";
import MemberDashboard from "./MemberDashboard";
import GirlDashboard from "./GirlDashboard";
import AdminDashboard from "./AdminDashboard";
import ManagerDashboard from "./ManagerDashboard";

type AppPage = "landing" | "member" | "girl" | "admin" | "manager";

export default function Index() {
  const [page, setPage] = useState<AppPage>("landing");

  const navigate = (p: string) => setPage(p as AppPage);

  if (page === "member") return <MemberDashboard onNavigate={navigate} />;
  if (page === "girl") return <GirlDashboard onNavigate={navigate} />;
  if (page === "admin") return <AdminDashboard onNavigate={navigate} />;
  if (page === "manager") return <ManagerDashboard onNavigate={navigate} />;

  return (
    <>
      <Landing onNavigate={navigate} />
      {/* DEV SWITCHER */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-1.5">
        <div className="bg-card border border-border px-3 py-2 text-[0.5rem] font-ui tracking-[0.15em] uppercase text-muted-foreground text-center">
          Demo
        </div>
        {[
          { key: "landing", label: "Лендинг" },
          { key: "member", label: "Член клуба" },
          { key: "girl", label: "Участница" },
          { key: "manager", label: "Менеджер" },
          { key: "admin", label: "Админ" },
        ].map((item) => (
          <button key={item.key} onClick={() => setPage(item.key as AppPage)}
            className={`font-ui text-[0.55rem] tracking-[0.15em] uppercase px-4 py-2 border transition-all text-left ${page === item.key ? "border-gold text-gold bg-gold/5" : "border-border text-muted-foreground bg-card hover:border-gold/30"}`}>
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}
