import axios from 'axios';
import { Loading, Message } from 'element-ui';
const axiosIns = axios.create({});

axiosIns.defaults.baseURL = 'http://localhost:3000';

let loadings = null;
// const XAuthorization = 'X-Authorization';
axiosIns.interceptors.request.use(function (config) {
  let token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
  if (token) {
    config.headers['X-Authorization'] = token;
  } else {
    config.headers['X-Authorization'] = 'no login';
  }
  console.log(config);
  if (config.loading) {
    loadings = Loading.service({
      background: 'rgba(0, 0, 0, 0.1)'
    });
  }
  return config;
});

axiosIns.interceptors.response.use(function (response) {
  let data = response.data;
  let headers = response.headers;
  let resToken = headers['x-authorization'];
  if (response.config.loading) {
    loadings.close();
  }
  if (resToken) {
    sessionStorage.setItem('jwtToken', resToken);
  }
  if (Math.abs(data.code) === 401) {
    localStorage.clear();
    sessionStorage.clear();
    Message({
      message: data.message || data.resultDesc || '登录超时',
      type: 'warning',
      duration: 2 * 1000
    });
    setTimeout(function () {
      window.location.reload();
    }, 2000);
    return false;
  }
  return Promise.resolve(data);
}, function (error) {
  error = error || 'Request error';
  return Promise.reject(error);
});

export default axiosIns;
