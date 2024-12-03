import React from 'react';
import InnerContainer from '@/app/_components/innerContainer';
import ButtonBar from '@/app/_containers/detail/ButtonBar';
import Content from '@/app/_containers/detail/Content';
import PageHeader from '../../_components/PageHeader';

export default function Container({ params }: { params: { id: number } }) {
  console.log(params);

  return (
    <InnerContainer paddingBottom="0">
      <PageHeader />
      <Content id={params.id} />
      <ButtonBar id={params.id} />
    </InnerContainer>
  );
}
