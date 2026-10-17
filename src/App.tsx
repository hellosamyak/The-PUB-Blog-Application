import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store/store";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router";

function App() {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return window.localStorage.getItem("pub-theme") || "light";
  });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("pub-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return !loading ? (
    <div className="min-h-screen bg-[linear-gradient(180deg,#faf7f1_0%,#f3eee5_55%,#eee7dc_100%)] text-slate-900 dark:bg-[linear-gradient(180deg,#070b16_0%,#0b1220_55%,#111827_100%)] dark:text-slate-100">
      <div className="flex min-h-screen w-full flex-col">
        <Header theme={theme} onThemeToggle={toggleTheme} />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
