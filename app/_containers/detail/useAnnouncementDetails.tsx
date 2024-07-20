import { useEffect, useState } from 'react';
import { getAnnouncementById } from '@/app/_services/announcement';

type DetailData = {
  title: string;
  content: string;
  createdAt: string;
};

export function useAnnouncement(id: number) {
  const [announcement, setAnnouncement] = useState<DetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getAnnouncementById(id)
      .then((data) => {
        setAnnouncement(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch announcement');
        setLoading(false);
        console.log(error);
      });
  }, [id]);

  return { announcement, loading, error };
}