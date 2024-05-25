import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import ButtonComponents from '@/app/_components/Button';

const API_EDIT_URL = `/api/announcement`;

const updateAnnouncement = async (data: {
  id: number;
  title: string;
  content: string;
}) => {
  const res = await fetch(`${API_EDIT_URL}/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify({ title: data.title, content: data.content }),
    //@ts-ignore
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseJson = await res.json();
  
  console.log(responseJson);
  return responseJson;
};

interface ButtonProps {
  id: number;
  title: string;
  content: string;
}

export default function ButtonBar({ id, title, content }: ButtonProps) {
  const router = useRouter();

  function handleCancel() {
    router.back();
  }

  // 제목을 가져와서 업데이트
  function handleSave() {
    updateAnnouncement({ id, title, content: content });
  }

  return (
    <ButtonBox>
      <ButtonComponents text="취소" onClick={handleCancel} />
      <ButtonComponents
        color="#ff5c00"
        textColor="var(--color-white)"
        text="저장"
        onClick={handleSave}
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
