'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ButtonComponents from '@/app/_components/Button';
import { deletePost } from '@/app/_services/post';
import colors from '@/app/_styles/theme';

type ButtonBarProps = {
  id: number;
};

export default function ButtonBar({ id }: ButtonBarProps) {
  const router = useRouter();

  async function handleDelete() {
    const shouldDelete = window.confirm('정말 삭제하시겠습니까?');

    if (shouldDelete) {
      try {
        const res = await deletePost(id);

        if (res.message === 'Success') {
          router.push('/');
          router.refresh();
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <ButtonContainer>
      <Link href="/">
        <ButtonComponents text="목록으로" textColor={colors.text} />
      </Link>
      <Link href={`/post/edit/${id}`}>
        <ButtonComponents
          color="#ff5c00"
          textColor={colors.white}
          text="수정"
        />
      </Link>
      <ButtonComponents
        color="#ff0000"
        textColor={colors.white}
        text="삭제"
        onClick={() => handleDelete()}
      />
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  margin-bottom: 64px;
  display: flex;
  align-items: center;
  gap: 16px;
`;
