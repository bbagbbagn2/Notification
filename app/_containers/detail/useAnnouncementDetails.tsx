import { useEffect, useState } from 'react';
import { getAnnouncementById } from '@/app/_services/announcement';

type DetailData = {
  title: string;
  content: string;
  createdAt: string;
};

export function useAnnouncement(id: number) {
  const [state, setState] = useState<{
    announcement: DetailData | null;
    loading: boolean;
    error: string | null;
  }>({
    announcement: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchAnnouncement = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const data = await getAnnouncementById(id);
        setState({ announcement: data, loading: false, error: null });
      } catch (err) {
        console.error('Failed to fetch announcement:', err);
        setState({
          announcement: null,
          loading: false,
          error: 'Failed to fetch announcement. Please try again later.',
        });
      }
    };

    fetchAnnouncement();
  }, [id]);

  return state;
}