import request from '@/utils/request'

// 查询单据子列表
export function listDepot_item(query) {
  return request({
    url: '/erp/depot_item/list',
    method: 'get',
    params: query
  })
}

// 查询单据子详细
export function getDepot_item(id) {
  return request({
    url: '/erp/depot_item/' + id,
    method: 'get'
  })
}

// 新增单据子
export function addDepot_item(data) {
  return request({
    url: '/erp/depot_item',
    method: 'post',
    data: data
  })
}

// 修改单据子
export function updateDepot_item(data) {
  return request({
    url: '/erp/depot_item',
    method: 'put',
    data: data
  })
}

// 删除单据子
export function delDepot_item(id) {
  return request({
    url: '/erp/depot_item/' + id,
    method: 'delete'
  })
}
