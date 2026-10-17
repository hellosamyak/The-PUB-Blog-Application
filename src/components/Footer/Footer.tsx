import { type ReactNode } from "react";
import { Link } from "react-router";
import Logo from "../Logo";

function Footer(): ReactNode {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-slate-200/80 bg-[#f8f3ea]/80 py-10 dark:border-slate-800 dark:bg-slate-950/70">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:items-start">
          <div>
            <div className="mb-4 inline-flex items-center rounded-2xl border border-slate-200 bg-white/70 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/70">
              <Logo width="82px" />
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
              A quiet corner for bold ideas, thoughtful stories, and the people who love to read them.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              Explore the journal
            </h3>
            <ul className="flex flex-wrap gap-x-5 gap-y-3">
              <li><Link className="text-sm font-medium text-slate-700 transition hover:text-amber-700 dark:text-slate-200 dark:hover:text-amber-300" to="/">Home</Link></li>
              <li><Link className="text-sm font-medium text-slate-700 transition hover:text-amber-700 dark:text-slate-200 dark:hover:text-amber-300" to="/all-posts">All posts</Link></li>
              <li><Link className="text-sm font-medium text-slate-700 transition hover:text-amber-700 dark:text-slate-200 dark:hover:text-amber-300" to="/login">Sign in</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200/80 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} The PUB. Made for curious minds.</p>
          <a className="font-medium transition hover:text-amber-700 dark:hover:text-amber-300" href="https://github.com/hellosamyak">Built by hellosamyak <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
