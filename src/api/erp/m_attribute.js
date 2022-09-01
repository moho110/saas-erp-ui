import request from '@/utils/request'

// 查询产品属性列表
export function listM_attribute(query) {
  return request({
    url: '/erp/m_attribute/list',
    method: 'get',
    params: query
  })
}

// 查询产品属性详细
export function getM_attribute(id) {
  return request({
    url: '/erp/m_attribute/' + id,
    method: 'get'
  })
}

// 新增产品属性
export function addM_attribute(data) {
  return request({
    url: '/erp/m_attribute',
    method: 'post',
    data: data
  })
}

// 修改产品属性
export function updateM_attribute(data) {
  return request({
    url: '/erp/m_attribute',
    method: 'put',
    data: data
  })
}

// 删除产品属性
export function delM_attribute(id) {
  return request({
    url: '/erp/m_attribute/' + id,
    method: 'delete'
  })
}
