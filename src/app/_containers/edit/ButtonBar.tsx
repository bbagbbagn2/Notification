import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import ButtonComponents from '@/app/_components/Button';
import { handlePost } from '@/app/_services/post';

interface ButtonProps {
  id: number;
  title: string;
  content: string;
}

export default function ButtonBar({ id, title, content }: ButtonProps) {
  const router = useRouter();

  function handleCancel() {
    router.back();
    router.refresh();
  }

  async function handleSave() {
    try {
      const updatedPost = await handlePost(id, title, content);
      console.log('Post updated successfully:', updatedPost);

      router.back();
      router.refresh();
    } catch (error) {
      console.error('Error saving post:', error);
    }
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
