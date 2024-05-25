import { ReactNode } from 'react';
import styled from 'styled-components';

type InnerContainerProps = {
  children: ReactNode;
  paddingBottom?: string;
};

export default function InnerContainer({
  children,
  paddingBottom,
}: InnerContainerProps) {
  return (
    <Layout>
      <Container paddingBottom={paddingBottom}>{children}</Container>
    </Layout>
  );
}

const Layout = styled.div`
  padding-inline: 15%;
  position: relative;
  background-color: var(--color-white);
`;

const Container = styled.div<InnerContainerProps>`
  padding-inline: 14.285%;
  padding-bottom: ${(props) => props.paddingBottom};
`;
