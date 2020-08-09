import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.itedu.me',
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
