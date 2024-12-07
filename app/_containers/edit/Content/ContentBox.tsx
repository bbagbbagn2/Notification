'use client';

import styled from 'styled-components';

type ContentWrapperProps = {
  content: string;
  setContent: (value: string) => void;
};

export default function ContentWrapper({
  content,
  setContent,
}: ContentWrapperProps) {
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
  };

  return (
    <ContentTextarea defaultValue={content} onChange={handleContentChange} />
  );
}

const ContentTextarea = styled.textarea`
  margin: 32px 5px;
  margin-bottom: 16px;
  min-height: 300px;
  border: none;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
  width: 100%;
  overflow: hidden;
`;
