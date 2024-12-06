import { useEffect, useRef } from 'react';
import { Post } from '@prisma/client';

const DETAIL_API_URL = `${process.env.NEXT_PUBLIC_FE_URL}/api/post/`;

export function useFetchData(id: number, callback: (data: Post) => void) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${DETAIL_API_URL}${id}`);

        if (!res.ok) {
          throw new Error('Failed to fetch post data');
        }

        const data = await res.json();

        if (data === null) {
          // 데이터가 null일 경우 처리할 로직을 작성합니다.
          console.error('Post not found');
          return;
        }

        callback(data);

        if (ref.current) {
          // 데이터를 텍스트 영역에 설정
          ref.current.value = data.title; // 예시: 제목을 설정
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id, callback]);

  return ref;
}
