import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteAnnouncement } from '@/app/_services/announcement';

const DELETE_ERROR_MESSAGE = 'Failed to delete announcement';
const DELETE_NETWORK_ERROR_MESSAGE =
  'An error occurred while deleting the announcement';

export default function useDeleteAnnouncement() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      setIsDeleting(true);
      setDeleteError(null);

      const res = await deleteAnnouncement(id);
      if (res.status === 200) {
        router.push('/');
      } else {
        setDeleteError(DELETE_ERROR_MESSAGE);
      }
    } catch (error) {
      console.error(error);
      setDeleteError(DELETE_NETWORK_ERROR_MESSAGE);
    } finally {
      setIsDeleting(false);
    }
  };

  return { handleDelete, isDeleting, deleteError };
}
