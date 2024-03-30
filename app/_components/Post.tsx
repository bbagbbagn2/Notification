import { Post } from "@prisma/client";

interface PostProps {
    posts: Array<Post>;
}

export default function Posts ({ posts }: PostProps) {
    return (
        <>
        {posts.map((post) => {
           <div> {post.title} </div>
        })}
        </>
    )
}