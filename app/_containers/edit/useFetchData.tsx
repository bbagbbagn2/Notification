import { useEffect, useRef } from 'react';
import { getAnnouncementById } from '@/app/_services/announcement';
import { Post } from '@/app/_types/Post';

export function useFetchData(id: number, callback: (data: Post) => void) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data: Post = await getAnnouncementById(id);
        callback(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id, callback]);

  return ref;
}
