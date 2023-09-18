
"use client";
// import React, { useState } from "react"
//import { Router } from "next/router"
import styled from "styled-components"

export default function App() {
  // const currentDate = new Date();
  // const formatedDate = currentDate.toLocaleDateString();

  return (
      <PageLayout>
        <PageContainer>
          <NotificationBox>
            <NotificationParagraph>공지사항</NotificationParagraph>
          </NotificationBox>
          <form>
          <TitleBox>
            <TitleBoxInput
            type="text"
            name="title"/>
          </TitleBox>
          <DateBox>
            {/* <DateParagraph>{formatedDate}</DateParagraph> */}
          </DateBox>
          <Contour />
          <ButtonBox>
            <CancelButton>
              <CancelParapraph>취소</CancelParapraph>
            </CancelButton>
            <SaveButton type="submit">
              <SaveParapraph>저장</SaveParapraph>
            </SaveButton>
          </ButtonBox>
          </form>
        </PageContainer>
      </PageLayout>
  );
}

const PageLayout = styled.div`
  padding: 0 15%;
  position: relative;
  height: 90vh;
  background-color: #FFF;
  z-index: 1;
`;

const PageContainer = styled.div`
  margin: 0 auto;
  padding: 0 14.287%;
  padding-top: 60px;
  padding-bottom: 64px;
  width: 100%;
  height: 100%;
`;

const NotificationBox = styled.div`
  padding-bottom: 24px;
  position: relative;
  width: 100%;
  height: 40px;
 `;

const NotificationParagraph = styled.p`
  color: #222;
  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: -0.08px;
`;

const TitleBox = styled.div`
  margin-bottom: 16px;
  padding: 16px 12px;
  position: relative;
  width: 100%;
  height: auto;
  border: 0.8px solid #222;
  border-radius: 6px;
  background-color: #FFF;
 `;

const TitleBoxInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  color: #222;
  font-size: 32px;
  font-weight: 600;
  line-height: 122%;
  letter-spacing: -0.16px;

  &:focus {
    outline: none;
  }
`;

const DateBox = styled.div`
  posiiton: relative;
  width: 100%;
  height: auto;
`;

const DateParagraph = styled.p`
  color: #787878;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: -0.08px;
`;

const Contour = styled.div`
    width: 100%;
    height: 16px;
`;

const ButtonBox = styled.div`
  width: 100%;
  height: auto;
`;

const CancelButton = styled.button`
  margin-right: 16px;
  padding: 8px 12px;
  border: 0.5px solid #DEDEDE;
  border-radius: 6px;
  background-color: #FFF;
  cursor: pointer;
`;
const CancelParapraph = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.08px;
`;

const SaveButton = styled.button`
  padding: 8px 12px;
  border: 0.5px solid #FF5C00;
  border-radius: 6px;
  background-color: #FF5C00;
  cursor: pointer;
`;
const SaveParapraph = styled(CancelParapraph)`
  color: #FFF;
`;
const EmptyMessageContainer = styled.div`
    margin: 0 auto;
    padding: 8px 13.75%;
    height: 178px;
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

const SearchBox = styled.div`
    padding: 8px 12px;
    width: 280px;
    height: 40px;
    display: grid;
    grid-template-columns: 1fr 24px;
    align-items: center;
    background-color: #FFF;
    border: 0.8px solid #222222;
    border-radius: 6px;
`;

const SearchInput = styled.input`
    width: 100%;
    color:  #222222;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: -0.08px;
    border: 0;

    &::placeholder {
        color: #CBCBCB;
    }

    &:focus {
        outline: none;
    }
`;