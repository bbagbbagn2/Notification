'use client';

import MainContainer from './_containers/main/Container';

const API_ANNOUNCEMENT_URL = `${process.env.NEXT_PUBLIC_FE_URL}/api/announcement`;

export default function MainPage() {
  return <MainContainer ApiURL={API_ANNOUNCEMENT_URL} />;
}
