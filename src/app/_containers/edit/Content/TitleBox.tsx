'use client';

import styled from 'styled-components';

type TitleWrapperProps = {
  title: string;
  setTitle: (value: string) => void;
};

export default function TitleWrapper({ title, setTitle }: TitleWrapperProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  return <TitleBox defaultValue={title} onChange={handleTitleChange} />;
}

const TitleBox = styled.textarea`
  padding: 16px 12px;
  width: 100%;
  border: 0.8px solid #dedede;
  border-radius: 6px;
  color: #222;
  font-size: 32px;
  font-weight: 600;
  line-height: 122%;
  letter-spacing: -0.16px;
  overflow: hidden;

  &:hover,
  &:active {
    border: 0.8px solid #222222;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    border: 0.8px solid #dedede;
    background-color: #eff0f3;
  }
`;
