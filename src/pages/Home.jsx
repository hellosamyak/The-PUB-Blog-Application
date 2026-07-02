import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.rows)
            }
        })
    }, [])

    if (!authStatus) {
        return (
            <div className="w-full py-12 sm:py-16">
                <Container>
                    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
                        <div className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(255,249,240,0.88))] p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-sm sm:p-8 lg:p-10 dark:border-slate-800 dark:bg-[linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.95))] dark:shadow-[0_24px_70px_rgba(0,0,0,0.4)]">
                            <div className="absolute inset-x-8 top-8 h-px bg-linear-to-r from-transparent via-amber-300/70 to-transparent dark:via-amber-400/70" />
                            <div className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
                                Write. Publish. Share.
                            </div>
                            <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-slate-50">
                                PUB is the clean, distraction-free blogging platform built for writers who just want to write.
                            </h1>
                            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                                Start with a clear idea, publish without friction, and share stories from a focused space that keeps attention on the writing.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    to="/signup"
                                    className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-amber-400 dark:text-slate-950 dark:shadow-amber-500/15 dark:hover:bg-amber-300"
                                >
                                    Create account
                                </Link>
                                <Link
                                    to="/login"
                                    className="rounded-full border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 transition duration-200 hover:-translate-y-0.5 hover:border-amber-300 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-amber-400 dark:hover:text-white"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                            <div className="rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/85 dark:shadow-[0_18px_40px_rgba(0,0,0,0.3)]">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                                    What it feels like
                                </p>
                                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-100">
                                    Reading first, noisy UI last.
                                </h2>
                                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                    The layout gives every story room to breathe, with a feed that behaves more like an online magazine than a basic dashboard.
                                </p>
                            </div>
                            <div className="rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/85 dark:shadow-[0_18px_40px_rgba(0,0,0,0.3)]">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                                    Built for
                                </p>
                                <div className="mt-4 grid gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                                    <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/80">Writers publishing posts</div>
                                    <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/80">Readers browsing featured stories</div>
                                    <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-800/80">Drafts, edits, and live updates</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <div className="rounded-3xl border border-white/70 bg-white/75 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/85 dark:shadow-[0_12px_30px_rgba(0,0,0,0.3)]">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700 dark:text-amber-300">Feature 01</p>
                            <h3 className="mt-3 text-lg font-semibold text-slate-950 dark:text-slate-100">Editorial story cards</h3>
                            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">A cleaner feed with stronger imagery and hierarchy for every post.</p>
                        </div>
                        <div className="rounded-3xl border border-white/70 bg-white/75 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/85 dark:shadow-[0_12px_30px_rgba(0,0,0,0.3)]">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700 dark:text-amber-300">Feature 02</p>
                            <h3 className="mt-3 text-lg font-semibold text-slate-950 dark:text-slate-100">Focused writing tools</h3>
                            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">A publishing flow designed to feel more like a magazine editor than a form.</p>
                        </div>
                        <div className="rounded-3xl border border-white/70 bg-white/75 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/85 dark:shadow-[0_12px_30px_rgba(0,0,0,0.3)]">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700 dark:text-amber-300">Feature 03</p>
                            <h3 className="mt-3 text-lg font-semibold text-slate-950 dark:text-slate-100">Calm reading experience</h3>
                            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Article typography, spacing, and contrast tuned for longer reads.</p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-10 sm:py-14'>
            <Container>
                <div className="mb-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                    <div className="space-y-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.36em] text-amber-700 dark:text-amber-300">
                            The PUB Journal
                        </p>
                        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-slate-50">
                            A modern editorial homepage for stories worth reading.
                        </h1>
                        <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                            Browse the latest posts in a visual grid designed like a publication landing page, with stronger hierarchy and more breathing room around every story.
                        </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:justify-self-end">
                        <div className="rounded-3xl border border-white/70 bg-white/75 px-5 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/85 dark:shadow-[0_12px_30px_rgba(0,0,0,0.3)]">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                                Stories
                            </p>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-100">
                                {posts.length}
                            </p>
                        </div>
                        <div className="rounded-3xl border border-white/70 bg-white/75 px-5 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/85 dark:shadow-[0_12px_30px_rgba(0,0,0,0.3)]">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                                Reading mode
                            </p>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-100">
                                On
                            </p>
                        </div>
                    </div>
                </div>
                <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home