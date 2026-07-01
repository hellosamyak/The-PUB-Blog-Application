import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-10 sm:py-14">
            <Container>
                <article className="mx-auto max-w-4xl">
                    <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/85 dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="max-h-[34rem] w-full rounded-3xl object-cover"
                        />

                        {isAuthor && (
                            <div className="absolute right-5 top-5 flex gap-2 sm:right-6 sm:top-6">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-emerald-600" className="shadow-lg shadow-emerald-600/20">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-rose-600" className="shadow-lg shadow-rose-600/20" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="mb-6 space-y-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
                            Post
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                            {post.title}
                        </h1>
                    </div>
                    <div className="browser-css rounded-[1.75rem] border border-white/70 bg-white/80 px-5 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:px-8 sm:py-8 dark:border-slate-800 dark:bg-slate-900/85 dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                        {parse(post.content)}
                    </div>
                </article>
            </Container>
        </div>
    ) : null;
}