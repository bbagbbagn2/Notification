import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ButtonComponents from "@/app/_components/Button";

const updateAnnouncement = async (data: {
  id: number;
  title: string;
  content: string;
}) => {
  const res = await fetch(`http://localhost:3000/api/announcement/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({ title: data.title, content: data.content }),
    //@ts-ignore
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};

export default function ButtonBar({ params }: { params: { id: number } }) {
  const router = useRouter();

  function handleCancel() {
    router.back();
  }

  async function handleSave() {
    // 여기에서 제목을 가져와서 업데이트를 수행합니다.
    const title = document.getElementById("title")?.innerText ?? "";
    await updateAnnouncement({ id: params.id, title, content: "" });
  }

  return (
    <ButtonBox>
      <ButtonComponents text="취소" onClick={handleCancel} />
      <Link href={`/announcement/detail/${params.id}`}>
        <ButtonComponents
          color="#ff5c00"
          textColor="var(--color-white)"
          text="저장"
          onClick={handleSave}
        />
      </Link>
    </ButtonBox>
  );
}

const ButtonBox = styled.div`
  margin-bottom: 64px;
  display: flex;
  align-items: center;
  gap: 16px;
`;
