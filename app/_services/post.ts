async function fetchPosts(url: string) {
  const res = await fetch(url);
  const data = await res.json();
  return data.posts;
}

export { fetchPosts };
