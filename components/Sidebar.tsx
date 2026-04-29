"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/Fsuits/", label: "Dashboard", icon: "📊" },
  { href: "/Fsuits/rule-of-72", label: "Rule of 72", icon: "📈" },
  { href: "/Fsuits/compound-interest", label: "Compound Interest", icon: "💰" },
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
          <Link
            key={item.href}
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
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 text-xs text-slate-500">
        <p>© 2026 FSuits</p>
      </div>
    </aside>
  );
}
