import { Post } from '@/app/_types/Post';

async function fetchPosts(url: string): Promise<Post[]> {
  const res = await fetch(url);
  const data = await res.json();
  return data.posts || [];
}

export { fetchPosts };
