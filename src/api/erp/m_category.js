import request from '@/utils/request'

// 查询产品类型列表
export function listM_category(query) {
  return request({
    url: '/erp/m_category/list',
    method: 'get',
    params: query
  })
}

// 查询产品类型详细
export function getM_category(id) {
  return request({
    url: '/erp/m_category/' + id,
    method: 'get'
  })
}

// 新增产品类型
export function addM_category(data) {
  return request({
    url: '/erp/m_category',
    method: 'post',
    data: data
  })
}

// 修改产品类型
export function updateM_category(data) {
  return request({
    url: '/erp/m_category',
    method: 'put',
    data: data
  })
}

// 删除产品类型
export function delM_category(id) {
  return request({
    url: '/erp/m_category/' + id,
    method: 'delete'
  })
}
