"use client";

import React, {
  useState,
  useRef,
  ChangeEvent,
  Fragment,
  useEffect,
} from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";

type UpadateAnnouncementParams = {
  title: string;
  content: string;
  id: number;
};

const updateAnnouncement = async (data: UpadateAnnouncementParams) => {
  const res = fetch(`http://localhost:3000/api/announcement/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({ title: data.title, content: data.content }),
    //@ts-ignore
    "Content-Type": "application/json",
  });
  return (await res).json();
};

const getAnnouncementById = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/announcement/${id}`);
  const data = await res.json();
  return data.post;
};

export default function Edit({ params }: { params: { id: number } }) {
  const currentDate = new Date();
  const formatedDate = currentDate.toLocaleDateString();

  const [title, setTitle] = useState<string>("");
  const textareaRef = React.createRef<HTMLTextAreaElement>();

  const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    autoResizeTextarea();
  }
  
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const contentRef = useRef<Editor | null>(null);
  const [initialContent, setInitialContent] = useState("");
  const tinymcePlugins = ["link", "lists", "autoresize"];
  const tinymceToolbar =
    "blocks fontfamily |" +
    "bold italic underline strikethrough |" +
    "alignleft aligncenter alignright alignjustify |" +
    "bullist numlist blockquote link";

  useEffect(() => {
    getAnnouncementById(params.id)
      .then((data) => {
        if (titleRef.current && contentRef.current) {
          titleRef.current.value = data.title;
          setInitialContent(data.content);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const autoResizeTextarea = () => {
    const textarea = titleRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && contentRef.current) {
      await updateAnnouncement({
        title: titleRef.current?.value,
        content: contentRef.current.editor?.getContent() || initialContent,
        id: params.id,
      });
      router.push("/");
    }
  };

  const router = useRouter();
  const handleCancel = () => {
    router.back();
  };

  return (
    <Fragment>
      <PageLayout>
        <PageContainer>
          <NotificationBox>
            <NotificationParagraph>공지사항</NotificationParagraph>
          </NotificationBox>
          <form onSubmit={handleSubmit}>
            <TitleBox>
              <TitleBoxTextArea
                rows={1}
                spellCheck="false"
                ref={titleRef}
                onInput={autoResizeTextarea}
                maxLength={100}
              />
            </TitleBox>
            <EditWrapper>
              <Editor
                apiKey="68pzucurv0v0a40d8321m0d64yekfzb9mzq31ks3cbqojdur"
                init={{
                  plugins: tinymcePlugins,
                  toolbar: tinymceToolbar,
                  min_height: 500,
                  menubar: false,
                  branding: false,
                  statusbar: false,
                  block_formats: "제목1=h2;제목2=h3;제목3=h4;본문=p;",
                }}
              />
            </EditWrapper>
            <ButtonBox>
              <CancelButton onClick={handleCancel}>
                <CancelParapraph>취소</CancelParapraph>
              </CancelButton>
              <SaveButton type="submit">
                <SaveParapraph>저장</SaveParapraph>
              </SaveButton>
            </ButtonBox>
          </form>
        </PageContainer>
      </PageLayout>
    </Fragment>
  );
}

const PageLayout = styled.div`
  padding-inline: 15%;
  position: relative;
  background-color: #fff;
`;

const PageContainer = styled.div`
  padding-inline: 14.287%;
  padding-bottom: 242px;
`;

const NotificationBox = styled.div`
  margin-top: 60px;
  position: relative;
  width: 100%;
  height: 40px;
`;

const NotificationParagraph = styled.p`
  color: #222;
  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: -0.08px;
`;

const TitleBox = styled.div`
  margin-bottom: 16px;
  width: 100%;
`;

const TitleBoxTextArea = styled.textarea`
  padding: 16px 12px;
  width: 100%;
  height: 100%;
  border: 0.8px solid #dedede;
  border-radius: 6px;
  color: #222;
  font-size: 32px;
  font-weight: 600;
  line-height: 122%;
  letter-spacing: -0.16px;
  resize: none;

  &:hover,
  &:active {
    border: 0.8px solid #222222;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    border: 0.8px solid #dedede;
    background-color: #eff0f3;
  }
`;

const DateBox = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

const DateParagraph = styled.p`
  color: #787878;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: -0.08px;
`;
const EditWrapper = styled.div`
  margin-top: 32px;
  padding: 3px;
  border-top: 1px solid #dedede;
  border-bottom: 1px solid #dedede;
`

const ButtonBox = styled.div`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 64px;
`;

const CancelButton = styled.button`
  margin-right: 16px;
  padding: 8px 12px;
  border: 0.5px solid #dedede;
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
`;
const CancelParapraph = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: -0.08px;
`;

const SaveButton = styled.button`
  padding: 8px 12px;
  border: 0.5px solid #ff5c00;
  border-radius: 6px;
  background-color: #ff5c00;
  cursor: pointer;
`;
const SaveParapraph = styled(CancelParapraph)`
  color: #fff;
`;
