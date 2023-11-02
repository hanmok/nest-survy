import { UserGenre } from 'src/user_genre/user_genre.entity';
import { connection } from '../connection';

const getUserGenreTable = () => connection.table<UserGenre>('user_genre');

export async function getUserGenreByUserId(user_id) {
  const user_genres = (await getUserGenreTable()).filter(
    (user_genre) => user_genre.user_id === user_id,
  );

  return user_genres;
}
