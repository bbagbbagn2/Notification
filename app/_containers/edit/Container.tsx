'use client';

import { useState, useEffect } from 'react';
import InnerContainer from '@/app/_components/innerContainer';
import PageHeader from '@/app/_components/PageHeader';
import TitleWrapper from './Content/TitleBox';
import ContentWrapper from './Content/ContentBox';
import DateWrapper from './Content/DateBox';
import ButtonBar from './ButtonBar';

const POST_API_URL = `${process.env.NEXT_PUBLIC_FE_URL}/api/post/`;

export default function EditContainer({ params }: { params: { id: number } }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${POST_API_URL}${params.id}`);

      const data = await res.json();
      setTitle(data.post.title);
      setContent(data.post.content);
      setDate(data.post.createdAt);
    }

    fetchData();
  }, [params.id]);

  return (
    <InnerContainer paddingBottom="242px">
      <PageHeader />
      <TitleWrapper title={title} setTitle={setTitle} />
      <ContentWrapper content={content} setContent={setContent} />
      <DateWrapper date={date} />
      <ButtonBar id={params.id} title={title} content={content} />
    </InnerContainer>
  );
}
