import { Genre } from 'src/genre/genre.entity';
import { connection } from '../connection';
const DataLoader = require('dataloader');

const getGenreTable = () => connection.table<Genre>('genre');

export async function getGenres() {
  return await getGenreTable();
}

export async function genGenresWith(ids) {
  const readonlyIds = ids as readonly string[];
  return await getGenreTable().whereIn('id', readonlyIds);
}

export async function getGenreById(id) {
  return await getGenreTable().first().where({ id });
}

export const genreLoader = new DataLoader(async (ids) => {
  console.log('[genreLoader] ids:', ids);
  const readonlyIds = ids as readonly string[];
  const genres = await getGenreTable().select().whereIn('id', readonlyIds);
  return readonlyIds.map((id) =>
    genres.find((genre) => genre.id === parseInt(id)),
  );
});
