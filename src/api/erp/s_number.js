import request from '@/utils/request'

// 查询序列号列表
export function listS_number(query) {
  return request({
    url: '/erp/s_number/list',
    method: 'get',
    params: query
  })
}

// 查询序列号详细
export function getS_number(id) {
  return request({
    url: '/erp/s_number/' + id,
    method: 'get'
  })
}

// 新增序列号
export function addS_number(data) {
  return request({
    url: '/erp/s_number',
    method: 'post',
    data: data
  })
}

// 修改序列号
export function updateS_number(data) {
  return request({
    url: '/erp/s_number',
    method: 'put',
    data: data
  })
}

// 删除序列号
export function delS_number(id) {
  return request({
    url: '/erp/s_number/' + id,
    method: 'delete'
  })
}
