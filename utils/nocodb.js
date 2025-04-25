// utils/nocodb.js
import axios from 'axios';

export async function fetchTable(tableName) {
  const url = `${process.env.NOCODB_URL}/api/v1/db/data/noco/${tableName}`;
  const res = await axios.get(url, {
    headers: {
      accept: 'application/json',
      'xc-token': process.env.NOCODB_API_KEY
    }
  });
  return res.data;
}
