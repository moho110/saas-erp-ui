import request from '@/utils/request'

// 查询产品初始库存列表
export function listInit_stock(query) {
  return request({
    url: '/erp/init_stock/list',
    method: 'get',
    params: query
  })
}

// 查询产品初始库存详细
export function getInit_stock(id) {
  return request({
    url: '/erp/init_stock/' + id,
    method: 'get'
  })
}

// 新增产品初始库存
export function addInit_stock(data) {
  return request({
    url: '/erp/init_stock',
    method: 'post',
    data: data
  })
}

// 修改产品初始库存
export function updateInit_stock(data) {
  return request({
    url: '/erp/init_stock',
    method: 'put',
    data: data
  })
}

// 删除产品初始库存
export function delInit_stock(id) {
  return request({
    url: '/erp/init_stock/' + id,
    method: 'delete'
  })
}
