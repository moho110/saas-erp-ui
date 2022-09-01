import request from '@/utils/request'

// 查询单据主列表
export function listDepot_head(query) {
  return request({
    url: '/erp/depot_head/list',
    method: 'get',
    params: query
  })
}

// 查询单据主详细
export function getDepot_head(id) {
  return request({
    url: '/erp/depot_head/' + id,
    method: 'get'
  })
}

// 新增单据主
export function addDepot_head(data) {
  return request({
    url: '/erp/depot_head',
    method: 'post',
    data: data
  })
}

// 修改单据主
export function updateDepot_head(data) {
  return request({
    url: '/erp/depot_head',
    method: 'put',
    data: data
  })
}

// 删除单据主
export function delDepot_head(id) {
  return request({
    url: '/erp/depot_head/' + id,
    method: 'delete'
  })
}
