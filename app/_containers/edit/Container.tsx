'use client';

import React from 'react';
import InnerContainer from '@/app/_components/innerContainer';
import PageHeader from '@/app/_components/PageHeader';
import TitleWrapper from './Content/TitleBox';
import ContentWrapper from './Content/ContentBox';
import DateWrapper from './Content/DateBox';
import ButtonBar from './ButtonBar';

export default function EditContainer({
  params,
}: {
  params: { id: number; title: string; content: string };
}) {
  return (
    <InnerContainer paddingBottom="242px">
      <PageHeader />
      <TitleWrapper params={{ id: params.id }} />
      <ContentWrapper params={{ id: params.id }} />
      <DateWrapper params={{ id: params.id }} />
      <ButtonBar id={params.id} title={params.title} content={params.content} />
    </InnerContainer>
  );
}
