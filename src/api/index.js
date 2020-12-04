import axiosIns from '@/utils/axios';

export function getCaptcha() {
  return axiosIns({
    url: `/getCaptcha`,
    method: 'get'
  });
}
