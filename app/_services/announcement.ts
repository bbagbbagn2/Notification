const POST_API_URL = '/api/post/';

async function getPostById(id: number) {
  const res = await fetch(`${POST_API_URL}${id}`);
  if (!res.ok) {
    throw new Error('Post 정보를 가져오는 데 실패했습니다.');
  }
  const data = await res.json();
  return data.post;
}

async function deletePost(id: number) {
  const res = await fetch(`${POST_API_URL}${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Post 삭제에 실패했습니다.');
  }

  const data = await res.json();
  return data;
}

export { getPostById, deletePost };
