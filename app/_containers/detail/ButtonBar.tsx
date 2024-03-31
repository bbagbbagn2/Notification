import React from "react";
import styled from "styled-components";
import Link from "next/link";
import ButtonComponents from "@/app/_components/Button";
import useDeleteAnnouncement from "./useDelete";

export default function ButtonBar({ params }: { params: { id: number } }) {
  const { handleDelete } = useDeleteAnnouncement();

  return (
    <ButtonBox>
      <Link href="/">
        <ButtonComponents text="목록으로" />
      </Link>
      <Link href={`/announcement/edit/${params.id}`}>
        <ButtonComponents color="#ff5c00" textColor="#fff" text="수정" />
      </Link>
      <ButtonComponents
        color="#ff0000"
        textColor="#fff"
        text="삭제"
        onClick={() => handleDelete(params.id)}
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
