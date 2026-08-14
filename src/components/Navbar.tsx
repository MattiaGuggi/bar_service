'use client'
import { useRouter, usePathname } from "next/navigation";
import { Sparkles, Wine, User } from "lucide-react";

const navOptions = [
  { label: "Home", path: "/", icon: Sparkles },
  { label: "Drinks", path: "/drinks", icon: Wine },
  { label: "Profile", path: "/profile", icon: User },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
      <nav className="flex items-center justify-between p-1.5 rounded-2xl bg-stone-900/90 border border-amber-500/20 backdrop-blur-2xl shadow-xl shadow-black/80">
        {navOptions.map((opt) => {
          const Icon = opt.icon;
          const isActive = pathname === opt.path;

          return (
            <button
              key={opt.path}
              onClick={() => router.push(opt.path)}
              className={`relative flex items-center justify-center gap-2 flex-1 py-2.5 px-4 rounded-xl text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                isActive
                  ? "text-amber-100"
                  : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/60"
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-xl bg-linear-to-r from-amber-600 via-orange-600 to-amber-700 shadow-md shadow-amber-900/40" />
              )}
              <Icon className={`w-4 h-4 relative z-10 ${isActive ? "text-amber-100" : "text-stone-400"}`} />
              <span className="relative z-10">{opt.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};

export default Navbar;