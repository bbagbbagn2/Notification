import MainContainer from './_containers/main/Container';

const API_POST_URL = `${process.env.NEXT_PUBLIC_FE_URL}/api/post`;

export default function MainPage() {
  return <MainContainer ApiURL={API_POST_URL} />;
}
