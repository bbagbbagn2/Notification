'use client';

import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa6';

export default function PageHeader() {
  return (
    <PageHeaderContainer>
      <PageHeaderTitle>Documents</PageHeaderTitle>
      <ButtonContainer>
        <FaPlus />
        Add New Document
      </ButtonContainer>
    </PageHeaderContainer>
  );
}

const PageHeaderContainer = styled.div`
  margin-top: 32px;
  margin-bottom: 50px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PageHeaderTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  line-height: 100%;
`;

const ButtonContainer = styled.button`
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: #eaf207;
  font-size: 14px;
  color: #0d0d0d;
  border: 1px solid #eaf207;
  border-radius: 60px;
`;
