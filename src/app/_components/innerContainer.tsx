'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';

type InnerContainerProps = {
  children: ReactNode;
  paddingBottom?: string;
};

export default function InnerContainer({
  children,
  paddingBottom = '0',
}: InnerContainerProps) {
  return (
    <Layout>
      <Container $paddingBottom={paddingBottom}>{children}</Container>
    </Layout>
  );
}

const Layout = styled.div`
  padding-inline: 15%;
  position: relative;
`;

const Container = styled.div<{ $paddingBottom: string }>`
  padding-inline: 14.285%;
  padding-bottom: ${(props) => props.$paddingBottom || '0'};
`;
