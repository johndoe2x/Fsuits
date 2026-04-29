"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/rule-of-72", label: "Rule of 72", icon: "📊" },
  { href: "/compound-interest", label: "Compound Interest", icon: "💰", disabled: true },
  { href: "/investment-return", label: "Investment Return", icon: "📈", disabled: true },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-white p-6 min-h-screen flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-blue-400">FSuits</h1>
        <p className="text-sm text-slate-400 mt-1">Financial Tools</p>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {menuItems.map((item) => (
          <div key={item.href}>
            {item.disabled ? (
              <span className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 cursor-not-allowed opacity-50">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </span>
            ) : (
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div className="text-xs text-slate-500 border-t border-slate-700 pt-4">
        <p>© 2026 FSuits</p>
        <p className="mt-1">Financial Tools Suite</p>
      </div>
    </aside>
  );
}
