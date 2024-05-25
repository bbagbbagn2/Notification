import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import ButtonComponents from '@/app/_components/Button';
import { deleteAnnouncement } from '@/app/_services/announcement';

export default function ButtonBar({ params }: { params: { id: number } }) {
  async function handleDelete() {
    const shouldDelete = window.confirm('정말 삭제하시겠습니까?');

    if (shouldDelete) {
      try {
        const res = await deleteAnnouncement(params.id);
        if (res.status === 200) {
          window.location.href = '/';
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <ButtonBox>
      <Link href="/">
        <ButtonComponents text="목록으로" />
      </Link>
      <Link href={`/announcement/edit/${params.id}`}>
        <ButtonComponents
          color="#ff5c00"
          textColor="var(--color-white)"
          text="수정"
        />
      </Link>
      <ButtonComponents
        color="#ff0000"
        textColor="var(--color-white)"
        text="삭제"
        onClick={() => handleDelete()}
      />
    </ButtonBox>
  );
}

const ButtonBox = styled.div`
  margin-bottom: 64px;
  display: flex;
  align-items: center;
  gap: 16px;
`;
