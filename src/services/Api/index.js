import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.itedu.me',
  timeout: 10000,
});

// instance.interceptors.request.use(
//   (config) => {
//     console.log('config', config);
//     return config;
//   },
//   (error) => {
//     console.log('request error', error);
//     return Promise.reject(error);
//   },
// );

// instance.interceptors.response.use(
//   (config) => {
//     console.log('config', config);
//     return config;
//   },
//   (error) => {
//     console.log('response error', JSON.stringify(error));
//     return Promise.reject(error);
//   },
// );

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

export default Api;
