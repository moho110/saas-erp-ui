import request from '@/utils/request'

// 查询产品扩展字段列表
export function listM_property(query) {
  return request({
    url: '/erp/m_property/list',
    method: 'get',
    params: query
  })
}

// 查询产品扩展字段详细
export function getM_property(id) {
  return request({
    url: '/erp/m_property/' + id,
    method: 'get'
  })
}

// 新增产品扩展字段
export function addM_property(data) {
  return request({
    url: '/erp/m_property',
    method: 'post',
    data: data
  })
}

// 修改产品扩展字段
export function updateM_property(data) {
  return request({
    url: '/erp/m_property',
    method: 'put',
    data: data
  })
}

// 删除产品扩展字段
export function delM_property(id) {
  return request({
    url: '/erp/m_property/' + id,
    method: 'delete'
  })
}
