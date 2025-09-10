'use client';

import styled from 'styled-components';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa6";
import colors from '../../styles/theme';

export default function NavRightContainer() {
  return (
    <NavRight>
      <NavList>
        <NavItem>
          <FaMagnifyingGlass />
        </NavItem>
        <NavItem>
          <AlarmWrapper>
            <FaRegBell />
            <AlarmBedge />
          </AlarmWrapper>
        </NavItem>
        <NavItem>
          <NavText>내 정보</NavText>
        </NavItem>
      </NavList>
    </NavRight>
  );
}

const NavRight = styled.div`
  display: flex;
  align-items: center;
`;

const NavList = styled.ul`
  display: flex;
  place-items: center;
  gap: 16px;
  justify-content: space-between;
`;

const NavItem = styled.li`
  padding: 2px;
  display: flex;
  align-items: center;
  color: white;
`;
const NavText = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
`;

const AlarmWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const AlarmBedge = styled.div`
  position: absolute;
  right: 146px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #eef279;
`;
