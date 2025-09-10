'use client';

import styled from 'styled-components';
import colors from '../../styles/theme';

export default function NavRightContainer() {
  return (
    <NavRight>
      <AlarmWrapper>
        <NavText>알림</NavText>
        <AlarmBedge />
      </AlarmWrapper>
      <NavText>내 정보</NavText>
    </NavRight>
  );
}

const NavRight = styled.div`
  display: flex;
  place-items: center;
  gap: 16px;
  justify-content: space-between;
`;

const NavText = styled.p`
  color: white;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
`;

const AlarmWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4px;
  column-gap: 2px;
`;

const AlarmBedge = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #EEF279;
`;
