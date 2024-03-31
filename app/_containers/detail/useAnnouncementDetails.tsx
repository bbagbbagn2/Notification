import { useEffect, RefObject } from "react";
import { getAnnouncementById } from "@/app/_services/announcement";
import { formatPostDate } from "@/app/_utils/dateUtils";

type useAnnouncementDetailsProps = {
  id: number;
  titleRef: RefObject<HTMLParagraphElement>;
  contentRef: RefObject<HTMLParagraphElement>;
  dateRef: RefObject<HTMLParagraphElement>;
};

function useAnnouncementDetails({
  id,
  titleRef,
  contentRef,
  dateRef,
}: useAnnouncementDetailsProps) {
  useEffect(() => {
    getAnnouncementById(id)
      .then((data) => {
        if (titleRef.current && contentRef.current && dateRef.current) {
          titleRef.current.innerText = data.title;
          contentRef.current.innerText = data.content;
          dateRef.current.innerText = formatPostDate(data.createdAt);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, titleRef, contentRef, dateRef]);
}

export default useAnnouncementDetails;
