import Link from "next/link"
import styled from "styled-components"

import Logo from "./Logo"

export default function Header() {
    return (
        <HeaderLayout>
            <HeaderCol>
                <HeaderContainer>
                    <HeaderBox>
                        <LeftContainer>
                            <LogoBox>
                                <Logo />
                            </LogoBox>
                            <HomeBox>
                                <Link href="/">
                                    <HomeParagraph>홈</HomeParagraph>
                                </Link>
                            </HomeBox>
                        </LeftContainer>

                        <RightContainer>
                            <NotificationBox>
                                <Link href="/">
                                    <NotificationParagraph>공지</NotificationParagraph>
                                </Link>
                            </NotificationBox>
                            <AlarmBox>
                                <AlarmParagraph>알림</AlarmParagraph>
                                <AlarmBedge />
                            </AlarmBox>
                            <UserBox>
                                <UserParagraph>내 정보</UserParagraph>
                            </UserBox>
                        </RightContainer>
                    </HeaderBox>
                </HeaderContainer>
            </HeaderCol>
        </HeaderLayout>
    );
}

const HeaderLayout = styled.header`
    position: relative;
    height: 56px;
    display: block;
    z-index: 90;
    background-color: #001E4C;
`;

const HeaderCol = styled.div`
    position: fixed;
    width: 100%;
    height: auto;
    z-index: 80;
`;

const HeaderContainer = styled.div`
    position: relative;
    z-index: 90;
`;

const HeaderBox = styled.div`
    margin: 0 auto;
    padding: 10px 20px;
    display: grid;
    grid-template-columns: 259px auto;
    justify-content: space-between;
`;

const LeftContainer = styled.div`
    width: 259px;
    height: 36px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
`;

const LogoBox = styled.div``;

const HomeBox = styled.div`
    display: grid;
    justify-content: flex-end;
`;

const HomeParagraph = styled.p`
    margin: 0;
    padding: 0;
    color: #FFF;
    font-size: 18px;
    font-weight: 400;
    line-height: 18px;
`;

const RightContainer = styled.div`
    width: 184px;
    height: 36px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
`;

const NotificationBox = styled.div``;
const NotificationParagraph = styled.p`
    color: #FFF;
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
`;

const AlarmBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 4px;
    column-gap: 2px;
`;
const AlarmParagraph = styled(NotificationParagraph)`
    font-weight: 400;
`;
const AlarmBedge = styled.div`
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #EC5F50; 
`;

const UserBox = styled.div``;
const UserParagraph = styled(AlarmParagraph)``;