import axios from 'axios';
import AsyncStorage from '../../utils/asyncStorage';

const instance = axios.create({
  baseURL: 'https://api.itedu.me',
  timeout: 10000,
});

instance.interceptors.request.use(
  async (config) => {
    const request = config;
    try {
      request.headers['Content-Type'] = 'application/json';
      const token = await AsyncStorage.getAccessToken();
      request.headers.Authorization = `Bearer ${token}`;
    } catch (e) {
      console.log('request interceptor', e);
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return request;
    }
  },
  (error) => {
    console.log('request error', error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

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
