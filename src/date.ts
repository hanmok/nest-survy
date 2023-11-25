export const convertToKoreanDate = (date: Date) => {
  const newDate = date;
  newDate.setHours(newDate.getHours() + 9);
  const result = newDate.toISOString().split('T')[0];
  return result;
};
