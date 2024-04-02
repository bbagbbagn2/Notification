"use client";

import MainContainer from "./_containers/main/Container";

const ANNOUNCEMENT_API_URL = "http://localhost:3000/api/announcement";

export default function MainPage() {
  return <MainContainer ApiURL={ANNOUNCEMENT_API_URL} />;
}
