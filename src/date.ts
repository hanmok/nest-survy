export const convertToKoreanDate = (date: Date): string => {
  const newDate = date;
  newDate.setHours(newDate.getHours() + 9);
  const result = newDate.toISOString().split('T')[0];
  return result;
};
