// import { SelectableOption } from './../../selectable-option/selectable-option.entity';
// import { Section } from 'src/section/section.entity';
import { Question } from 'src/question/question.entity';
import { connection } from './connection';

const getQuestionTable = () => connection.table<Question>('question');

// export async function getQuestionById(id) {
//   return await getQuestionTable().first().where({ id });
// }

export async function getQuestionsBySectionId(section_id) {
  return await getQuestionTable()
    .select()
    .where({ section_id: parseInt(section_id) });
}
