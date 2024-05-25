'use client';

import React from 'react';
import Container from '@/app/_containers/detail/Container';

export default function Details({ params }: { params: { id: number } }) {
  return <Container params={{ id: params.id }} />;
}
