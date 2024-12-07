const POST_API_URL = `${process.env.NEXT_PUBLIC_FE_URL}/api/post/`;

async function fetchPosts(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Post 정보를 가져오는 데 실패했습니다.');
  }
  
  const data = await res.json();
  return data;
}

async function getPostById(id: number) {
  const res = await fetch(`${POST_API_URL}${id}`);

  if (!res.ok) {
    throw new Error('Post 정보를 가져오는 데 실패했습니다.');
  }

  const data = await res.json();
  return data.post;
}

async function deletePost(id: number) {
  const options = { method: 'DELETE' };
  const res = await fetch(`${POST_API_URL}${id}`, options);

  if (!res.ok) {
    throw new Error('Post 삭제에 실패했습니다.');
  }

  return res.json();
}

async function handlePost(id: number, title: string, content: string) {
  const options = { method: 'PUT', body: JSON.stringify({ title, content }) };
  const res = await fetch(`${POST_API_URL}${id}`, options);

  console.log(res);

  if (!res.ok) {
    throw new Error('Post 수정에 실패했습니다.');
  }

  return res.json();
}

export { fetchPosts, getPostById, deletePost, handlePost };
