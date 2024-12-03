import { useEffect, RefObject } from 'react';
import { getPostById } from '@/app/_services/postService';
import { formatPostDate } from '@/app/_utils/dateUtils';

type useDetailsProps = {
  id: number;
  titleRef: RefObject<HTMLParagraphElement>;
  contentRef: RefObject<HTMLParagraphElement>;
  dateRef: RefObject<HTMLParagraphElement>;
};

export default function useAnnouncementDetails({
  id,
  titleRef,
  contentRef,
  dateRef,
}: useDetailsProps) {
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const data = await getPostById(id);
        if (data) {
          updateRefs({
            ...data,
            createdAt: formatPostDate(data.createdAt),
          });
        } else {
          console.error('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [id]);
  
  const updateRefs = (data: {
    title: string;
    content: string;
    createdAt: string;
  }) => {
    if (titleRef.current) titleRef.current.innerText = data.title;
    if (contentRef.current) contentRef.current.innerText = data.content;
    if (dateRef.current)
      dateRef.current.innerText = formatPostDate(data.createdAt);
  };
}
