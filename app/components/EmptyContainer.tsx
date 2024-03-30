import styled from "styled-components"

export default function Empty() {
    return (
        <EmptyMessageContainer>
            <EmptyMessageBox>
                <EmptyMessageParagraph>공지사항이 없습니다.</EmptyMessageParagraph>
            </EmptyMessageBox>
        </EmptyMessageContainer>
    );
}

const EmptyMessageContainer = styled.div`
    height: 100%;
    border-top: 1px solid #DEDEDE;
    border-bottom: 1px solid #DEDEDE;
`;

const EmptyMessageBox = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
`;

const EmptyMessageParagraph = styled.p`
    color: #707070; 
    font-size: 16px;
    font-weight: 400;
    line-height: 180%;
    letter-spacing: -0.08px;
`;