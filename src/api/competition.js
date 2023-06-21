import request from "@/utils/request";

// 查询比赛类别
export function getCompetitionCategory() {
  return request({
    url: `/competition/category/list`,
    method: "get",
  });
}
// 根据categoryId查询比赛详细信息
export function getCompetitionInfo(params) {
  return request({
    url: `/competition/competition/list`,
    method: "get",
    params: params,
  });
}

export function getCompCategoryId(id) {
  return request({
    url: `/competition/category/` + id,
    method: "get",
  });
}
// 根据Id查询比赛详细信息
export function getCompInfoById(id) {
  return request({
    url: "/competition/competition/" + id,
    method: "get",
  });
}
// 新增报名信息
export function addComInfo(params) {
  return request({
    url: "/competition/information",
    method: "post",
    data: params,
  });
}
// 根据competition/userId查询报名信息
export function getCompetUserById(params) {
  return request({
    url: `/competition/information/list`,
    method: "get",
    params: params,
  });
}
// 创建队伍
export function addComTeam(params) {
  return request({
    url: "/competition/team",
    method: "post",
    data: params,
  });
}
// 修改队伍
export function modifyComTeam(params) {
  return request({
    url: "/competition/team",
    method: "put",
    data: params,
  });
}
// 查询队伍信息
export function getTeamInfo(params) {
  return request({
    url: `/competition/team/list`,
    method: "get",
    params: params,
  });
}
// 查询队伍人员信息
export function getMembersInfo(params) {
  return request({
    url: `/competition/member/teamMemberVOList`,
    method: "get",
    params: params,
  });
}
// 删除队伍
export function delTeam(id) {
  return request({
    url: "/competition/team/" + id,
    method: "delete",
  });
}
// 申请加入队伍
export function applyTeam(params) {
  return request({
    url: "/competition/member",
    method: "post",
    data: params,
  });
}
// 同意审批
export function agreeApply(params) {
  return request({
    url: "/competition/member",
    method: "put",
    data: params,
  });
}
// 拒绝审批
export function refuseApply(id) {
  return request({
    url: "/competition/member/" + id,
    method: "delete",
  });
}
// 提交作品
export function submitWork(params) {
  return request({
    url: "/competition/work",
    method: "post",
    data: params,
  });
}
// 查看该学生所在队伍提交作品
export function getCommitted(params) {
  return request({
    url: "/competition/work/query",
    method: "get",
    params: params,
  });
}
// 查看我的成绩
export function getResults(params) {
  return request({
    url: "/competition/exportPDF/award",
    method: "get",
    params: params,
  });
}
// 下载证书PDF
export function getPdf(params) {
  return request({
    url: "/competition/exportPDF/getPDF",
    method: "get",
    params: params,
  });
}

// 新增代表团
export function registration(data) {
  return request({
    url: "/representative/registration",
    method: "post",
    data: data,
  });
}

// 修改代表团
export function editTeam(data) {
  return request({
    url: "/representative/registration",
    method: "put",
    data: data,
  });
}

// 查询代表团、团队
export function getTeam(params) {
  return request({
    url: "/representative/registration/list",
    method: "get",
    params: params,
  });
}

// 新增运动员
export function addPerson(data) {
  return request({
    url: "/athlete/registration",
    method: "post",
    data: data,
  });
}

// 查询团队下运动员列表
export function getPerson(params) {
  return request({
    url: "/athlete/registration/list",
    method: "get",
    params: params,
  });
}

// 删除运动员
export function deletePerson(ids) {
  return request({
    url: `/athlete/registration/${ids}`,
    method: "delete",
  });
}

// 根据运动员id上传作品
export function uploadZuopin(data) {
  return request({
    url: `/athlete/work/addAthleteWork`,
    method: "post",
    data: data,
  });
}

// 获取所有人成绩
export function getAllAward(params) {
  return request({
    url: `/competition/exportPDF/allAward`,
    method: "get",
    params: params,
  });
}

// 获取本队伍成绩
export function getMyTeamAward(params) {
  return request({
    url: `/competition/exportPDF/teamAward`,
    method: "get",
    params: params,
  });
}

// 根据分类（学校、教师、学生） 下载证书pdf
export function selectDownloadPdf(params) {
  return request({
    url: `/competition/exportPDF/select`,
    method: "get",
    params: params,
  });
}

// 根据姓名 证书编号 查询证书信息
export function getAirAward(params) {
  return request({
    url: `/competition/exportPDF/getAirAward`,
    method: "get",
    params: params,
  });
}


