'use client';

import styled from 'styled-components';
import BrandLogo from '../BrandLogo';

export default function NavLeftContainer() {
  return (
    <NavLeft>
      <BrandLogo />
    </NavLeft>
  );
}

const NavLeft = styled.div`
  width: 259px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
