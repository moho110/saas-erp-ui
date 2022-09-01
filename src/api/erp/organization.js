import request from '@/utils/request'

// 查询机构列表
export function listOrganization(query) {
  return request({
    url: '/erp/organization/list',
    method: 'get',
    params: query
  })
}

// 查询机构详细
export function getOrganization(id) {
  return request({
    url: '/erp/organization/' + id,
    method: 'get'
  })
}

// 新增机构
export function addOrganization(data) {
  return request({
    url: '/erp/organization',
    method: 'post',
    data: data
  })
}

// 修改机构
export function updateOrganization(data) {
  return request({
    url: '/erp/organization',
    method: 'put',
    data: data
  })
}

// 删除机构
export function delOrganization(id) {
  return request({
    url: '/erp/organization/' + id,
    method: 'delete'
  })
}
