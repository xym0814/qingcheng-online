import request from "@/utils/request";

// 查询考试列表
export function getExamination(params) {
  return request({
    url: `/exam/exam-info/list`,
    method: "get",
    params: params,
  });
}

// 查询考试详情
export function getExamInfo() {
  return request({
    url: `/exam/exam-info/selectOne`,
    method: "get",
  });
}

// 根据试卷id获取试卷
export function getPaper(params) {
  return request({
    url: "/exam/exam-paper/selectOne",
    method: "get",
    params: params,
  });
}

// 根据试题id获取试题
export function getQuestion(params) {
  return request({
    url: "/exam/exam-questions/selectOne",
    method: "get",
    params: params,
  });
}

// 进入考试试卷时，先提交一次试卷记录表
export function examFirstPost(data) {
  return request({
    url: "/exam/user-paper-record/save",
    method: "post",
    data: data,
  });
}

// 提交每一次答案
export function examAnswerPost(data) {
  return request({
    url: "/exam/user-question-record/save",
    method: "post",
    data: data,
  });
}

// 提交每一次答案之后修改答案
export function examAnswerPut(data) {
  return request({
    url: "/exam/user-question-record/update",
    method: "put",
    data: data,
  });
}

// 获取考试次数
export function getExamTimes(params) {
  return request({
    url: "/exam/user-paper-record/seniority",
    method: "get",
    params: params,
  });
}

// 提交按钮确认提交考试
export function submitPut(params) {
  return request({
    url: "/exam/user-paper-record/submit",
    method: "put",
    params: params,
  });
}

//  客观题自动判卷
export function scorePost(params) {
  return request({
    url: "/exam/user-question-record/judge-total",
    method: "post",
    params: params,
  });
}

// 获取考试结果
export function getExamScore(params) {
  return request({
    url: "/exam/user-paper-record/list",
    method: "get",
    params: params,
  });
}

// 获取试题乱序结果
export function getQuestionDisorder(params) {
  return request({
    url: "/exam/user-disorder-paper/disorder-paper",
    method: "get",
    params: params,
  });
}

// 获取选项乱序结果
export function getOptionDisorder(params) {
  return request({
    url: "/exam/user-disorder-paper/disorder-option",
    method: "get",
    params: params,
  });
}
