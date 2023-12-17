import { SurveyDto } from './survey/survey.dto';
export const convertToKoreanDate = (date: Date): string => {
  const newDate = date;
  newDate.setHours(newDate.getHours() + 9);
  const result = newDate.toISOString().split('T')[0];
  return result;
};

export const sortStringInDecendingOrder = (
  dateA: string,
  dateB: string,
  isDecending: boolean = true,
) => {
  console.log('first: ', dateA);
  console.log('second:', dateB);
  const first = new Date(dateA);
  const second = new Date(dateB);
  const diff = first.getTime() - second.getTime();
  return isDecending ? -1 * diff : diff;
};
