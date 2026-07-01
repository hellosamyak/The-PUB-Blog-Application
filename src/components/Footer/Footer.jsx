import { Link } from "react-router";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="relative mt-16 overflow-hidden border-t border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,248,236,0.95))] py-8 sm:py-10 dark:border-slate-800 dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.95),rgba(15,23,42,0.98))]">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-start">
          <div>
            <div className="mb-4 inline-flex items-center">
              <Logo width="100px" />
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
              A modern publishing surface for writing, reading, and managing stories with a clean editorial feel.
            </p>
            <p className="mt-5 text-xs font-medium uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              &copy; Copyright {new Date().getFullYear()}. All rights reserved by <a className="cursor-pointer text-slate-800 transition hover:text-black dark:text-slate-200 dark:hover:text-white" href="https://github.com/hellosamyak">hellosamyak</a>
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
              Quick Links
            </h3>
            <ul className="flex flex-wrap gap-x-5 gap-y-3">
              <li><Link className="text-sm font-medium text-slate-800 transition hover:text-amber-700 dark:text-slate-200 dark:hover:text-amber-300" to="/">Home</Link></li>
              <li><Link className="text-sm font-medium text-slate-800 transition hover:text-amber-700 dark:text-slate-200 dark:hover:text-amber-300" to="/login">Login</Link></li>
              <li><Link className="text-sm font-medium text-slate-800 transition hover:text-amber-700 dark:text-slate-200 dark:hover:text-amber-300" to="/signup">Sign up</Link></li>
            </ul>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              A small editorial footer, kept lean so the page feels calmer and easier to scan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
