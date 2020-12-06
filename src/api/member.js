import axiosIns from '@/utils/axios';

export function addMember(data) {
  return axiosIns({
    url: `/member/addMember`,
    method: 'post',
    data
  });
}

export function updateMember(data) {
  return axiosIns({
    url: `/member/updateMember`,
    method: 'post',
    data
  });
}

export function getMemberList(data) {
  return axiosIns({
    url: `/member/getMemberList`,
    method: 'get',
    params: data
  });
}

export function operateMoney(data) {
  return axiosIns({
    url: `/member/operateMoney`,
    method: 'post',
    data
  });
}

export function getConsumeRecord(data) {
  return axiosIns({
    url: `/member/getConsumeRecord`,
    method: 'get',
    params: data
  });
}
