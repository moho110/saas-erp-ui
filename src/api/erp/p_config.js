import request from '@/utils/request'

// 查询平台参数列表
export function listP_config(query) {
  return request({
    url: '/erp/p_config/list',
    method: 'get',
    params: query
  })
}

// 查询平台参数详细
export function getP_config(id) {
  return request({
    url: '/erp/p_config/' + id,
    method: 'get'
  })
}

// 新增平台参数
export function addP_config(data) {
  return request({
    url: '/erp/p_config',
    method: 'post',
    data: data
  })
}

// 修改平台参数
export function updateP_config(data) {
  return request({
    url: '/erp/p_config',
    method: 'put',
    data: data
  })
}

// 删除平台参数
export function delP_config(id) {
  return request({
    url: '/erp/p_config/' + id,
    method: 'delete'
  })
}
