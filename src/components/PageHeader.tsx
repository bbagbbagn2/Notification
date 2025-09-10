'use client';

import styled from 'styled-components';
import colors from '../styles/theme';

export default function PageHeader() {
  return (
    <PageHeaderContainer>
      <PageHeaderTitle>All docs</PageHeaderTitle>
      <ButtonContainer>Start a new document</ButtonContainer>
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
  color: ${colors.text};
`;

const ButtonContainer = styled.button`
  padding: 8px 12px;
  background-color: #EAF207;
  color: #0D0D0D;
  border-radius: 4px;
  border: 1px solid #EAF207;
`;
