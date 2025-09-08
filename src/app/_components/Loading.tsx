'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { IconLoading } from '@/public/svgs';

export default function Loading() {
  return (
    <LoadingWrapper>
      <Image src={IconLoading} alt="Loading" />
    </LoadingWrapper>
  );
}

const LoadingWrapper = styled.div`
    margin: 69px 368px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
