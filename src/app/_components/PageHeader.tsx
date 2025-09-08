'use client';

import styled from 'styled-components';
import colors from '../../styles/theme';

export default function PageHeader() {
  return (
    <Wrapper>
      <p>공지사항</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 60px;
  height: 40px;

  & > p {
    color: ${colors.text};
    font-size: 16px;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: -0.08px;
  }
`;
