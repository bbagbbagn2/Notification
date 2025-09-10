const ONE_MINUTE = 60;
const ONE_HOUR = 3600;
const ONE_DAY = 86400;

export function formatPostDate(postDate: Date): string {
  const currentDate = new Date();
  const date = new Date(postDate);
  const elapsedMilliseconds = currentDate.getTime() - date.getTime();
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

  // 월, 년 계산
  const yearsDiff = currentDate.getFullYear() - date.getFullYear();
  const monthsDiff = currentDate.getMonth() - date.getMonth() + yearsDiff * 12;

  switch (true) {
    case elapsedSeconds < ONE_HOUR: {
      const minutes = Math.floor(elapsedSeconds / ONE_MINUTE);
      return `${minutes}분 전`;
    }
    case elapsedSeconds < ONE_DAY: {
      const hours = Math.floor(elapsedSeconds / ONE_HOUR);
      return `${hours}시간 전`;
    }
    case elapsedSeconds < ONE_DAY * 30 : {
      const days = Math.floor(elapsedSeconds / ONE_DAY);
      return `${days}일 전`;
    }
    case monthsDiff < 12 : {
      return `${monthsDiff}개월 전`;
    }
    default: {
      const years = Math.floor(monthsDiff / 12);
      return `${years}년 전`;
    }
  }
}
