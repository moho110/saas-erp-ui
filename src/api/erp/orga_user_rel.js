import request from '@/utils/request'

// 查询机构用户关系列表
export function listOrga_user_rel(query) {
  return request({
    url: '/erp/orga_user_rel/list',
    method: 'get',
    params: query
  })
}

// 查询机构用户关系详细
export function getOrga_user_rel(id) {
  return request({
    url: '/erp/orga_user_rel/' + id,
    method: 'get'
  })
}

// 新增机构用户关系
export function addOrga_user_rel(data) {
  return request({
    url: '/erp/orga_user_rel',
    method: 'post',
    data: data
  })
}

// 修改机构用户关系
export function updateOrga_user_rel(data) {
  return request({
    url: '/erp/orga_user_rel',
    method: 'put',
    data: data
  })
}

// 删除机构用户关系
export function delOrga_user_rel(id) {
  return request({
    url: '/erp/orga_user_rel/' + id,
    method: 'delete'
  })
}
