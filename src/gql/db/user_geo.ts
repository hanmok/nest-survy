import { UserGeo } from 'src/user_geo/user_geo.entity';
import { connection } from '../connection';
// import { UserGeo } from 'src/user_geo/user-geo.entity';

const getUserGeoTable = () => connection.table<UserGeo>('user_geo');

export async function getUserGeoByUserId(user_id) {
  const user_geos = (await getUserGeoTable()).filter(
    (user_geo) => user_geo.user_id === user_id,
  );

  return user_geos;
}

export async function getAllUserGeo() {
  return await getUserGeoTable();
}
