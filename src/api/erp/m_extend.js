import request from '@/utils/request'

// 查询产品价格扩展列表
export function listM_extend(query) {
  return request({
    url: '/erp/m_extend/list',
    method: 'get',
    params: query
  })
}

// 查询产品价格扩展详细
export function getM_extend(id) {
  return request({
    url: '/erp/m_extend/' + id,
    method: 'get'
  })
}

// 新增产品价格扩展
export function addM_extend(data) {
  return request({
    url: '/erp/m_extend',
    method: 'post',
    data: data
  })
}

// 修改产品价格扩展
export function updateM_extend(data) {
  return request({
    url: '/erp/m_extend',
    method: 'put',
    data: data
  })
}

// 删除产品价格扩展
export function delM_extend(id) {
  return request({
    url: '/erp/m_extend/' + id,
    method: 'delete'
  })
}
