import request from '@/utils/request'

// 查询经手人列表
export function listPerson(query) {
  return request({
    url: '/erp/person/list',
    method: 'get',
    params: query
  })
}

// 查询经手人详细
export function getPerson(id) {
  return request({
    url: '/erp/person/' + id,
    method: 'get'
  })
}

// 新增经手人
export function addPerson(data) {
  return request({
    url: '/erp/person',
    method: 'post',
    data: data
  })
}

// 修改经手人
export function updatePerson(data) {
  return request({
    url: '/erp/person',
    method: 'put',
    data: data
  })
}

// 删除经手人
export function delPerson(id) {
  return request({
    url: '/erp/person/' + id,
    method: 'delete'
  })
}
