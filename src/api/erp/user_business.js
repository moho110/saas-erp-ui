import request from '@/utils/request'

// 查询用户/角色/模块关系列表
export function listUser_business(query) {
  return request({
    url: '/erp/user_business/list',
    method: 'get',
    params: query
  })
}

// 查询用户/角色/模块关系详细
export function getUser_business(id) {
  return request({
    url: '/erp/user_business/' + id,
    method: 'get'
  })
}

// 新增用户/角色/模块关系
export function addUser_business(data) {
  return request({
    url: '/erp/user_business',
    method: 'post',
    data: data
  })
}

// 修改用户/角色/模块关系
export function updateUser_business(data) {
  return request({
    url: '/erp/user_business',
    method: 'put',
    data: data
  })
}

// 删除用户/角色/模块关系
export function delUser_business(id) {
  return request({
    url: '/erp/user_business/' + id,
    method: 'delete'
  })
}
