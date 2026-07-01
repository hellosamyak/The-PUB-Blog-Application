import { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref,
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 inline-block pl-1 text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`${className} w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-900 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 focus:border-amber-300 focus:bg-white focus:ring-4 focus:ring-amber-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-amber-400 dark:focus:bg-slate-900 dark:focus:ring-amber-500/20`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
