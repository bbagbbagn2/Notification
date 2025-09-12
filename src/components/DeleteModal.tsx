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
          <ModalMessage>
            Are you sure you want to delete this document? This action cannot be
            undone.
          </ModalMessage>
        </MessageWrapper>
        <ButtonWrapper>
          <CancelButton onClick={setModal}>Cancel</CancelButton>
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
  background: #131313;
  box-shadow: 0 0 3px rgba(255, 255, 255, 0.2);
  width: 400px;
  padding: 24px;
  border-radius: 4px;
`;

const MessageWrapper = styled.div`
  margin-bottom: 32px;
`;

const ModalTitle = styled.div`
  font-size: 18px;
  line-height: 28px;
  font-weight: 600;
`;

const ModalMessage = styled.div`
  font-size: 14px;
  color: #777777;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  padding: 10px 60px;
  border-radius: 4px;
  color: #000;
  font-size: 14px;
  font-weight: 600;
`;

const CancelButton = styled(StyledButton)`
  background-color: #fff;
`;

const DeleteButton = styled(StyledButton)`
  background-color: #eaf207;
`;
