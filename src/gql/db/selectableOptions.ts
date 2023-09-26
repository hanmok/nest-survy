import { SelectableOption } from './../../selectable-option/selectable-option.entity';
import { connection } from './connection';

const getSelectableOptionTable = () =>
  connection.table<SelectableOption>('selectable_option');

export async function getSelectableOptionByQuestionId(questionId: string) {
  return await getSelectableOptionTable()
    .select()
    .where({ question_id: parseInt(questionId) });
}
