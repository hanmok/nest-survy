// import { SelectableOption } from './../../selectable-option/selectable-option.entity';
import { Section } from 'src/section/section.entity';
import { connection } from '../connection';
const DataLoader = require('dataloader');
const getSectionTable = () => connection.table<Section>('section');

export async function getSectionById(id) {
  return await getSectionTable().first().where({ id });
}

export async function getSectionsBySurveyId(survey_id) {
  return await getSectionTable()
    .select()
    .where({ survey_id: parseInt(survey_id) });
}

export const sectionLoader = new DataLoader(async (ids) => {
  console.log('[sectionLoader] ids:', ids);
  const readonlyIds: readonly string[] = ids as readonly string[];
  const sections = await getSectionTable().select().whereIn('id', readonlyIds);
  return readonlyIds.map((id) =>
    sections.find((section) => section.id === parseInt(id)),
  );
});
