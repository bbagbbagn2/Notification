import EditContainer from '@/src/app/_containers/edit/Container';

export default function Edit({ params }: { params: { id: number } }) {
  return <EditContainer params={{ id: params.id }} />;
}
