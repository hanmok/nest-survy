// import { connection} from './connection'
import { connection } from './connection';

const getUserTable = () => connection.table('user');

export async function getUsers() {
  return await getUserTable(); // 싹다 가져오기!
}

export async function getUser(id) {
  const sth = await getUserTable().first();
  return await getUserTable().first().where({ id });
}
