'use client';

import styled from 'styled-components';
import SearchInput from './SearchInput';
import colors from '../../styles/theme';

export default function SearchHeader() {
  return (
    <HeaderContainer>
      <HeaderTitle>All docs</HeaderTitle>
      <SearchInput />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  margin-top: 32px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
`;

const HeaderTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  line-height: 100%;
  color: ${colors.text};
`;
