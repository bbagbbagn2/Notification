const ONE_MINUTE = 60;
const ONE_HOUR = 3600;
const ONE_DAY = 86400;

export function formatPostDate(postDate: string): string {
  const currentDate = new Date();
  const date = new Date(postDate);
  const elapsedMilliseconds = currentDate.getTime() - date.getTime();
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

  switch (true) {
    case elapsedSeconds < ONE_MINUTE:
      return "방금 전";
    case elapsedSeconds < ONE_HOUR:
      return `${Math.floor(elapsedSeconds / ONE_MINUTE)}분 전`;
    case elapsedSeconds < ONE_DAY:
      return `${Math.floor(elapsedSeconds / ONE_HOUR)}시간 전`;
    default:
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}. ${month}. ${day}`;
  }
}
