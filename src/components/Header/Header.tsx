import { useEffect, useState } from "react";
import Container from "../Container/Container";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

interface HeaderProps {
  theme?: string;
  onThemeToggle: () => void;
}

function Header({ theme = "light", onThemeToggle }: HeaderProps) {
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  const menuButtonClassName =
    "inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition duration-200 hover:bg-amber-50 hover:text-amber-800 dark:text-slate-300 dark:hover:bg-amber-400/10 dark:hover:text-amber-300";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-[#f8f3ea]/85 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/85">
      <Container>
        <nav aria-label="Primary navigation" className="relative flex items-center gap-3 py-3 md:gap-6">
          <div className="shrink-0">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <Logo width="86px" />
            </Link>
          </div>

          <span className="hidden h-5 w-px bg-slate-300 md:block dark:bg-slate-700" />
          <p className="hidden text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 lg:block dark:text-slate-400">
            Stories worth sharing
          </p>

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={onThemeToggle}
              aria-pressed={theme === "dark"}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-600 transition duration-200 hover:border-amber-300 hover:bg-white hover:text-amber-800 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-amber-400 dark:hover:bg-slate-800 dark:hover:text-amber-300"
            >
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
                  <path d="M12 3v2m0 14v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2m14 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
                  <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-expanded={menuOpen}
              aria-controls="mobile-header-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-600 transition duration-200 hover:border-amber-300 hover:bg-white hover:text-amber-800 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-amber-400 dark:hover:bg-slate-800 dark:hover:text-amber-300 md:hidden"
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
                  <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>

          <div className="hidden md:flex md:flex-wrap md:items-center md:justify-end md:gap-1">
            {navItems.map((item) =>
              item.active ? (
                <Link key={item.name} to={item.slug} className={menuButtonClassName}>
                  {item.name}
                </Link>
              ) : null,
            )}
            {authStatus && <LogoutBtn />}
          </div>

          {menuOpen && (
            <div
              id="mobile-header-menu"
              className="absolute left-0 right-0 top-full mt-3 rounded-3xl border border-white/70 bg-white/95 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:hidden"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) =>
                  item.active ? (
                    <Link
                      key={item.name}
                      to={item.slug}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-amber-300 hover:bg-white hover:text-slate-950 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-amber-400 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      {item.name}
                    </Link>
                  ) : null,
                )}
                {authStatus && (
                  <div className="pt-1">
                    <LogoutBtn />
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
