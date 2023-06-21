import request from "@/utils/request";

export function getAllLabel() {
  return request({
    url: "/course/label",
    method: "get",
  });
}

export function getAllCourse(query) {
  return request({
    url: "/course/list",
    method: "get",
    params: query,
  });
}

export function getCourseDetail(id) {
  return request({
    url: `/course/detail/${id}`,
    method: "get",
  });
}

export function getVideoDetail(id) {
  return request({
    url: `/course/video/${id}`,
    method: "get",
  });
}

export function hasBoughtCourse(query) {
  return request({
    url: "/personal/myCourse",
    method: "get",
    params: query,
  });
}
//  新用户第一次登陆自动生成token
export function hasPermission(id) {
  return request({
    url: `/course/permission/${id}`,
    method: "get",
  });
}

export function documentList(id) {
  return request({
    url: `/course/document/${id}`,
    method: "get",
  });
}

// 获取某课程所有评论
export function getAllComments(query) {
  return request({
    url: `/comment/root`,
    method: "post",
    data: query,
  });
}
// 查看评论回复
export function getReply(query) {
  return request({
    url: `/comment/replay`,
    method: "post",
    data: query,
  });
}
// 新增评论
export function addComment(query) {
  return request({
    url: `/comment`,
    method: "post",
    data: query,
  });
}

// 获取课程对应作业列表
export function getAllTask(param) {
  return request({
    url: "/course/homework/list",
    method: "get",
    params: param,
  });
}

// 用户提交自己的作业
export function addMyTask(data) {
  return request({
    url: "/course/homework",
    method: "post",
    data: data,
  });
}

//  查询用户提交记录
export function getMyTask(param) {
  return request({
    url: "/course/homework/my",
    method: "get",
    params: param,
  });
}

//  用户撤回自己的作业
export function deleteMyTask(id) {
  return request({
    url: `/course/homework/${id}`,
    method: "delete",
  });
}

//  根据课程id获取课程推广图
export function getPic(courseId) {
  return request({
    url: `/system/course/promotion-picture/${courseId}`,
    method: "get",
  });
}
