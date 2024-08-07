const ANNOUNCEMENT_API_URL = '/api/announcement/';

async function getAnnouncementById(id: number) {
  const res = await fetch(`${ANNOUNCEMENT_API_URL}${id}`);
  if (!res.ok) {
    throw new Error('Announcement 정보를 가져오는 데 실패했습니다.');
  }
  const data = await res.json();
  return data.post;
}

async function deleteAnnouncement(id: number) {
  const res = await fetch(`${ANNOUNCEMENT_API_URL}${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Announcement 삭제에 실패했습니다.');
  }
  return res;
}

export { getAnnouncementById, deleteAnnouncement };
