'use client';

import styled from 'styled-components';
import NavLeftContainer from './NavLeft';
import NavRightContainer from './NavRight';

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderInner>
        <NavLeftContainer />
        <NavRightContainer />
      </HeaderInner>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: relative;
  width: 100%;
  height: 56px;
  background-color: #0D0D0D;
  z-index: 90;
`;

const HeaderInner = styled.div`
  padding: 10px 80px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;