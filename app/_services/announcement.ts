export const getAnnouncementById = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/announcement/${id}`);
  const data = await res.json();
  return data.post;
};

export const deleteAnnouncement = async (id: number) => {
  const res = fetch(`http://localhost:3000/api/announcement/${id}`, {
    method: "DELETE",
  });
  return res;
};
