import appwriteService from "../appwrite/config";
import { Link } from "react-router";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/85 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)] dark:border-slate-800/80 dark:bg-slate-900/85 dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        <div className="aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800">
          {featuredImage ? (
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(15,23,42,0.08),rgba(217,119,6,0.12))] text-sm font-medium text-slate-500 dark:bg-[linear-gradient(135deg,rgba(148,163,184,0.18),rgba(245,158,11,0.12))] dark:text-slate-300">
              No image
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700 dark:text-amber-300">
            Featured story
          </p>
          <h2 className="text-lg font-semibold leading-snug text-slate-950 sm:text-xl dark:text-slate-100">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
