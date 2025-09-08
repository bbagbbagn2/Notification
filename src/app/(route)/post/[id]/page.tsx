'use client';

import React from 'react';
import Container from '@/src/app/_containers/detail/Container';

export default function PostDetailPage({ params }: { params: { id: number } }) {
  return <Container params={{ id: params.id }} />;
}
