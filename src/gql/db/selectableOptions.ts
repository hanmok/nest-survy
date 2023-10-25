import logObject from 'src/util/logObject';
import { SelectableOption } from './../../selectable-option/selectable-option.entity';
import { connection } from '../connection';

const DataLoader = require('dataloader');

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

export const selectableOptionLoader = new DataLoader(async (ids) => {
  console.log('[selectableOptionLoader] ids:', ids);
  const readonlyIds: readonly string[] = ids as readonly string[];
  logObject('readonlyIds', readonlyIds);
  const selectableOptions = await getSelectableOptionTable()
    .select()
    .whereIn('id', readonlyIds);
  const ret = readonlyIds.map((id) =>
    selectableOptions.find((so) => so.id === parseInt(id)),
  );

  logObject('returning selectable Options: ', ret);

  return ret;
});

// [db] select * from `survey` where `id` = '844' limit 1
// [db] select * from `section` where `survey_id` = 844
// [db] select * from `question` where `section_id` = 972952454
// [db] select * from `question_type` where `id` = 100 limit 1
// [db] select * from `selectable_option` where `question_id` = 456904
// [db] select * from `question_type` where `id` = 200 limit 1
// [db] select * from `selectable_option` where `question_id` = 456914
// [db] select * from `question_type` where `id` = 300 limit 1
// [db] select * from `selectable_option` where `question_id` = 456924
