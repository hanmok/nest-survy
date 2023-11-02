import { Geo } from 'src/geo/Geo.entity';
import { connection } from '../connection';

const getGeoTable = () => connection.table<Geo>('geo');

export async function getGeos() {
  return await getGeoTable();
}

export async function getGeoById(id) {
  return await getGeoTable().first().where({ id });
}
