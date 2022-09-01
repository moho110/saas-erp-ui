import request from '@/utils/request'

// 查询仓库列表
export function listDepot(query) {
  return request({
    url: '/erp/depot/list',
    method: 'get',
    params: query
  })
}

// 查询仓库详细
export function getDepot(id) {
  return request({
    url: '/erp/depot/' + id,
    method: 'get'
  })
}

// 新增仓库
export function addDepot(data) {
  return request({
    url: '/erp/depot',
    method: 'post',
    data: data
  })
}

// 修改仓库
export function updateDepot(data) {
  return request({
    url: '/erp/depot',
    method: 'put',
    data: data
  })
}

// 删除仓库
export function delDepot(id) {
  return request({
    url: '/erp/depot/' + id,
    method: 'delete'
  })
}
