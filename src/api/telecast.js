import request from "@/utils/request";

export function getTelecast(params) {
  return request({
    url: '/live/list',
    method: "get",
    params: params
  });
}

export function createPushAddress(data) {
  return request({
    url: '/live/createPushAddress',
    method: "post",
    data: data
  });
}

export function updatePushAddress(data) {
  return request({
    url: '/live/updatePushAddress',
    method: "put",
    data: data
  });
}

export function createPullAddress(params) {
  return request({
    url: '/live/createPullAddress',
    method: "get",
    params: params
  });
}
