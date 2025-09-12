'use client';

import { ReactNode } from 'react';
import styled from 'styled-components';

type ButtonProps = {
  text: string;
  onClick?: () => void;
  color?: string;
  textColor?: string;
  children?: ReactNode;
};

export default function ButtonComponents({
  color,
  textColor,
  text,
  onClick,
  children,
}: ButtonProps) {
  return (
    <Button color={color} onClick={onClick}>
      <Text color={textColor}>{text}</Text>
      {children}
    </Button>
  );
}

const Button = styled.button`
  padding: 12px;
  border-radius: 6px;
  border: solid 1px ${(props) => (props.color ? props.color : '#dedede')};
  background-color: ${(props) =>
    props.color ? props.color : 'var(--color-white)'};
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.08px;
  color: ${(props) => props.color};
`;
