'use client';

import { useEffect } from 'react';
import styled from 'styled-components';

interface ModalProps {
  setModal: () => void;
}

export default function DeleteModal({ setModal }: ModalProps) {
  const prevantModalOff = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <ModalOverlay onClick={setModal}>
      <ModalWrapper onClick={prevantModalOff}>
        <MessageWrapper>
            <ModalTitle>Delete document</ModalTitle>
            <ModalMessage>Are you sure you want to delete this document? This action cannot be undone.</ModalMessage>
        </MessageWrapper>
        <ButtonWrapper>
            <CancelButton>Cancel</CancelButton>
            <DeleteButton>Delete</DeleteButton>
        </ButtonWrapper>
      </ModalWrapper>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = styled.div`
  background-color: #141414;
  width: 400px;
  padding: 24px;
  border-radius: 4px;
`;

const MessageWrapper = styled.div`
    
`

const ModalTitle = styled.div`
    font-size: 18px;
    line-height: 28px;
    font-weight: 600;
`

const ModalMessage = styled.div`
    font-size: 14px;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 32px;
`

const StyledButton = styled.button`
    padding: 10px 60px;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
`

const CancelButton = styled(StyledButton)`
    background-color: black;
`

const DeleteButton = styled(StyledButton)`
    background-color: #EF4444;
`