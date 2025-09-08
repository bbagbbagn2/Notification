'use client';

import styled from 'styled-components';

type ButtonProps = {
  text: string;
  onClick?: () => void;
  color?: string;
  textColor?: string;
};

export default function ButtonComponents({
  color,
  textColor,
  text,
  onClick,
}: ButtonProps) {
  return (
    <Button color={color} onClick={onClick}>
      <Text color={textColor}>{text}</Text>
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
