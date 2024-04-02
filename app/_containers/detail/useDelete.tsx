import { useState } from "react";
import { deleteAnnouncement } from "@/app/_services/announcement";

export default function useDeleteAnnouncement() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      const res = await deleteAnnouncement(id);
      if (res.status === 200) {
        window.location.href = "/";
      } else {
        setDeleteError("Failed to delete announcement");
      }
    } catch (error) {
      console.error(error);
      setDeleteError("An error occurred while deleting the announcement");
    } finally {
      setIsDeleting(false);
    }
  };

  return { handleDelete, isDeleting, deleteError };
}
