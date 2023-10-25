// import { connection} from './connection'
import { User } from 'src/user/user.entity';
import { connection } from './connection';
// import DataLoader from 'dataloader';
const DataLoader = require('dataloader');
const getUserTable = () => connection.table<User>('user');

export async function getUsers() {
  return await getUserTable(); // 싹다 가져오기!
}

export async function getUserById(id) {
  const sth = await getUserTable().first();
  return await getUserTable().first().where({ id });
}

export const userLoader = new DataLoader(async (ids) => {
  console.log('[userLoader] ids:', ids);
  const readonlyIds: readonly string[] = ids as readonly string[];
  const users = await getUserTable().select().whereIn('id', readonlyIds);
  return readonlyIds.map((id) =>
    users.find((user) => user.id === parseInt(id)),
  );
});
