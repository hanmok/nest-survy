// import { SelectableOption } from './../../selectable-option/selectable-option.entity';
import { Section } from 'src/section/section.entity';
import { connection } from './connection';

const getSectionTable = () => connection.table<Section>('section');

export async function getSectionById(id) {
  return await getSectionTable().first().where({ id });
}

export async function getSectionsBySurveyId(survey_id) {
  return await getSectionTable()
    .select()
    .where({ survey_id: parseInt(survey_id) });
}
