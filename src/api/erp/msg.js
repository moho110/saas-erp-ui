import request from '@/utils/request'

// 查询消息列表
export function listMsg(query) {
  return request({
    url: '/erp/msg/list',
    method: 'get',
    params: query
  })
}

// 查询消息详细
export function getMsg(id) {
  return request({
    url: '/erp/msg/' + id,
    method: 'get'
  })
}

// 新增消息
export function addMsg(data) {
  return request({
    url: '/erp/msg',
    method: 'post',
    data: data
  })
}

// 修改消息
export function updateMsg(data) {
  return request({
    url: '/erp/msg',
    method: 'put',
    data: data
  })
}

// 删除消息
export function delMsg(id) {
  return request({
    url: '/erp/msg/' + id,
    method: 'delete'
  })
}
