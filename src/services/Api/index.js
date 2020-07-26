import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.itedu.me',
  timeout: 10000,
});

async function Api({ method = 'get', url, params = {}, body = {}, header = {} }) {
  const { data } = await instance({
    method,
    url,
    params,
    data: body,
    header,
  });
  return data;
}

export default Api;
