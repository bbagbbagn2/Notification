const POST_API_URL = `${process.env.NEXT_PUBLIC_FE_URL}/api/post/`;

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

  console.log(res);
  if (!res.ok) {
    throw new Error('Post 삭제에 실패했습니다.');
  }

  return res.json();
}

export { getPostById, deletePost };
