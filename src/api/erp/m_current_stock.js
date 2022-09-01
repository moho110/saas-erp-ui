import request from '@/utils/request'

// 查询产品当前库存列表
export function listM_current_stock(query) {
  return request({
    url: '/erp/m_current_stock/list',
    method: 'get',
    params: query
  })
}

// 查询产品当前库存详细
export function getM_current_stock(id) {
  return request({
    url: '/erp/m_current_stock/' + id,
    method: 'get'
  })
}

// 新增产品当前库存
export function addM_current_stock(data) {
  return request({
    url: '/erp/m_current_stock',
    method: 'post',
    data: data
  })
}

// 修改产品当前库存
export function updateM_current_stock(data) {
  return request({
    url: '/erp/m_current_stock',
    method: 'put',
    data: data
  })
}

// 删除产品当前库存
export function delM_current_stock(id) {
  return request({
    url: '/erp/m_current_stock/' + id,
    method: 'delete'
  })
}
