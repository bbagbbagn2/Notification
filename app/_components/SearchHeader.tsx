'use client';

import styled from 'styled-components';
import SearchInput from './SearchInput';
import colors from '../_styles/theme';

export default function SearchHeader() {
  return (
    <HeaderContainer>
      <div>
        <HeaderTitle>공지사항</HeaderTitle>
      </div>
      <SearchInput />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  margin-top: 60px;
  height: 64px;
  display: flex;
  justify-content: space-between;
`;

const HeaderTitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: -0.16px;
  color: ${colors.text};
`;
