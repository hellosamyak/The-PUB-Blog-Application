import { useState, useEffect } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from '../appwrite/config'
import type { BlogPostRow } from '../appwrite/config'
import { useParams, useNavigate } from 'react-router'

function EditPost() {
    const [post, setPost] = useState<BlogPostRow | null>(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
    return post ?
        (
            <div className='py-8'>
                <Container>
                    <PostForm post={post} />
                </Container>
            </div>
        )
        : null
}

export default EditPost;