import styled from 'styled-components';

export default function Empty() {
  return (
    <EmptyWrapper>
      <Text>공지사항이 없습니다.</Text>
    </EmptyWrapper>
  );
}

const EmptyWrapper = styled.div`
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
  padding: 74.5px 0;
  text-align: center;
`;

const Text = styled.p`
  color: #707070;
  font-size: 16px;
  font-weight: 400;
  line-height: 180%;
  letter-spacing: -0.08px;
`;
