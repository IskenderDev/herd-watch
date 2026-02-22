import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import { PawPrint, Settings, Tag } from "lucide-react";

const navItems = [
  { path: "/", label: "Стадо", icon: PawPrint },
  { path: "/add-tag", label: "Бирка", icon: Tag },
  { path: "/settings", label: "Настройки", icon: Settings },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card">
      <div className="container flex items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                "flex flex-col items-center gap-1 px-3 py-1 text-xs transition-all duration-200",
                isActive
                  ? "rounded-full bg-green-600 px-4 py-1 text-white"
                  : "text-gray-500 hover:text-foreground",
              )}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
