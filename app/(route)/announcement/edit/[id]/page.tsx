'use client';

import React from 'react';
import EditContainer from '@/app/_containers/edit/Container';

export default function Edit({
  params,
}: {
  params: { id: number; title: string; content: string };
}) {
  return (
    <EditContainer
      params={{ id: params.id, title: params.title, content: params.content }}
    />
  );
}
