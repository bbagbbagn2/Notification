'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ButtonComponents from '@/src/app/_components/Button';
import { deletePost } from '@/src/app/_services/post';
import DeleteModal from '@/src/components/DeleteModal';
import colors from '@/src/styles/theme';

type ButtonBarProps = {
  id: number;
};

export default function ButtonBar({ id }: ButtonBarProps) {
  const [modalStatus, setModalStatus] = useState(false);
  const router = useRouter();

  const handleModalStatus = () => {
    setModalStatus(!modalStatus);
    console.log(modalStatus);
  };

  async function handleDelete() {
    try {
      const res = await deletePost(id);

      if (res.message === 'Success') {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setModalStatus(false);
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
        onClick={handleModalStatus}
      />

      {modalStatus && (
        <DeleteModal setModal={handleModalStatus} onDelete={handleDelete} />
      )}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  margin-bottom: 64px;
  display: flex;
  align-items: center;
  gap: 16px;
`;
