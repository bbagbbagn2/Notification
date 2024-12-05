'use client';

import styled from 'styled-components';
import colors from '@/app/_styles/theme';
import { ReactNode } from 'react';

type PostContainerProps = {
  children: ReactNode;
};

export default function PostContainer({ children }: PostContainerProps) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  margin-top: 12px;
  margin-bottom: 32px;
  width: 100%;
  height: 100%;
  border-top: 1px solid ${colors.bg300};
  border-bottom: 1px solid ${colors.bg300};
`;
