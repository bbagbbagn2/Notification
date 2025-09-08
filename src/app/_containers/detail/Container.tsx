import InnerContainer from '@/src/app/_components/innerContainer';
import ButtonBar from '@/src/app/_containers/detail/ButtonBar';
import Content from '@/src/app/_containers/detail/Content';
import PageHeader from '../../_components/PageHeader';

export default function Container({ params }: { params: { id: number } }) {
  return (
    <InnerContainer paddingBottom="0">
      <PageHeader />
      <Content id={params.id} />
      <ButtonBar id={params.id} />
    </InnerContainer>
  );
}
