import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", label: "🏠 Стадо" },
  { path: "/add-tag", label: "➕ Бирка" },
  { path: "/settings", label: "⚙️" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border px-4 py-3">
        <div className="container flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground tracking-tight">
            🐄 МалМон
          </h1>
          <span className="text-xs text-muted-foreground">MVP</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container py-4 pb-20">{children}</main>

      {/* Bottom nav — mobile-first */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <div className="container flex justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
