import request from '@/utils/request'

// 查询功能模块列表
export function listFunction(query) {
  return request({
    url: '/erp/function/list',
    method: 'get',
    params: query
  })
}

// 查询功能模块详细
export function getFunction(id) {
  return request({
    url: '/erp/function/' + id,
    method: 'get'
  })
}

// 新增功能模块
export function addFunction(data) {
  return request({
    url: '/erp/function',
    method: 'post',
    data: data
  })
}

// 修改功能模块
export function updateFunction(data) {
  return request({
    url: '/erp/function',
    method: 'put',
    data: data
  })
}

// 删除功能模块
export function delFunction(id) {
  return request({
    url: '/erp/function/' + id,
    method: 'delete'
  })
}
