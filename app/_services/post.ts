async function fetchPosts(url: string) {
  const res = await fetch(url);
  return res.json();
}

export { fetchPosts };
