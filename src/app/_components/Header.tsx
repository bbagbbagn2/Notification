'use client';

import Link from 'next/link';
import styled from 'styled-components';
import Logo from './BrandLogo';
import colors from '../../styles/theme';

export default function Header() {
  return (
    <HeaderLayout>
      <Container>
        <LeftContainer>
          <Logo />
        </LeftContainer>
        <RightContainer>
          <AlarmBox>
            <Text>알림</Text>
            <AlarmBedge />
          </AlarmBox>
          <Text>내 정보</Text>
        </RightContainer>
      </Container>
    </HeaderLayout>
  );
}

const HeaderLayout = styled.header`
  position: relative;
  width: 100%;
  height: 56px;
  background-color: ${colors.primary};
  z-index: 90;
`;

const Container = styled.div`
  padding: 10px 80px;;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  width: 259px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RightContainer = styled.div`
  display: flex;
  place-items: center;
  gap: 16px;
  justify-content: space-between;
`;

const Text = styled.p`
  color: ${colors.primary300};
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
`;

const AlarmBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 4px;
  column-gap: 2px;
`;

const AlarmBedge = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${colors.primary300};
`;
