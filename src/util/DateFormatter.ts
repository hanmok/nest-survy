export function formateDate(date: string) {
  const dateObject = new Date(date);

  // 년 월 일 시간 분 추출
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
  const day = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
