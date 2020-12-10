import axiosIns from '@/utils/axios';

export function getCaptcha() {
  return axiosIns({
    url: `/getCaptcha`,
    method: 'get'
  });
}

export function register(data) {
  return axiosIns({
    url: `/register`,
    method: 'post',
    data
  });
}

export function login(data) {
  return axiosIns({
    url: `/login`,
    method: 'post',
    data
  });
}
