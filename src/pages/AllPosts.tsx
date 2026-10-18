import { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/config'
import type { BlogPostRow } from '../appwrite/config'

function AllPosts() {
    const [posts, setPosts] = useState<BlogPostRow[]>([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.rows)
            }
        })
    }, [])
    return (
        <section aria-labelledby="archive-heading" className='w-full py-10 sm:py-14'>
            <Container>
                <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-700 dark:text-amber-300">The archive</p>
                        <h1 id="archive-heading" className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl dark:text-slate-50">Every story, in one place.</h1>
                        <p className="mt-3 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">Browse the full collection from the PUB community.</p>
                    </div>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{posts.length} stories</span>
                </div>
                <ul className='grid list-none gap-6 p-0 sm:grid-cols-2 xl:grid-cols-4'>
                    {posts.map((post) => (
                        <li key={post.$id}>
                            <PostCard {...post} />
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    )
}

export default AllPosts