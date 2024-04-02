import styled from "styled-components";
import SearchInput from "../../_components/SearchInput";

export default function SearchHeader() {
  return (
    <TitleBox>
      <div>
        <TitleHeading>공지사항</TitleHeading>
      </div>
      <SearchInput />
    </TitleBox>
  );
}

const TitleBox = styled.div`
  margin-top: 60px;
  height: 64px;
  display: flex;
  justify-content: space-between;
`;

const TitleHeading = styled.h2`
  font-size: 32px;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: -0.16px;
`;
