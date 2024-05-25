const ANNOUNCEMENT_API_URL = '/api/announcement/';

async function getAnnouncementById(id: number) {
  const res = await fetch(`${ANNOUNCEMENT_API_URL}${id}`);
  const data = await res.json();
  return data.post;
}

async function deleteAnnouncement(id: number) {
  const res = fetch(`${ANNOUNCEMENT_API_URL}${id}`, {
    method: 'DELETE',
  });
  return res;
}

export { getAnnouncementById, deleteAnnouncement };
