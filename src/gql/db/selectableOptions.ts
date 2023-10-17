import { SelectableOption } from './../../selectable-option/selectable-option.entity';
import { connection } from './connection';

const getSelectableOptionTable = () =>
  connection.table<SelectableOption>('selectable_option');

export async function getSelectableOptionByQuestionId(questionId: number) {
  return await getSelectableOptionTable()
    .select()
    .where({ question_id: questionId });
}

export async function getSelectableOptionById(id) {
  return await getSelectableOptionTable().first().where({ id });
}
