'use client';

import styled from 'styled-components';
import Logo from '../../app/_components/BrandLogo';

export default function NavLeftContainer() {
  return (
    <NavLeft>
      <Logo />
    </NavLeft>
  );
}

const NavLeft = styled.div`
  width: 259px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
