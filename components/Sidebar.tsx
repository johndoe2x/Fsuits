"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/rule-of-72", label: "Rule of 72", icon: "📈" },
  { href: "/compound-interest", label: "Compound Interest", icon: "💰", disabled: true },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-slate-200">
        <h1 className="text-xl font-bold text-blue-600">FSuits</h1>
        <p className="text-xs text-slate-500 mt-1">Financial Tools</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.href}>
            {item.disabled ? (
              <span className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 text-sm cursor-not-allowed opacity-50">
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </span>
            ) : (
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600 border-l-2 border-blue-600"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 text-xs text-slate-500">
        <p>© 2026 FSuits</p>
      </div>
    </aside>
  );
}
