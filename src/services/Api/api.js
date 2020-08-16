import axios from 'axios';
import { BASE_URL } from '../../constants';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

async function Api({ method = 'get', url, params = {}, body = {}, headers = {} }) {
  const extra = {};
  if (method !== 'get') {
    extra.data = body;
  }
  const { data } = await instance({
    method,
    url,
    params,
    headers,
    ...extra,
  });
  return data;
}

export { instance as AxiosInstance };
export default Api;
