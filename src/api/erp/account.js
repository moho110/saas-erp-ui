import request from '@/utils/request'

// 查询账户信息列表
export function listAccount(query) {
  return request({
    url: '/erp/account/list',
    method: 'get',
    params: query
  })
}

// 查询账户信息详细
export function getAccount(id) {
  return request({
    url: '/erp/account/' + id,
    method: 'get'
  })
}

// 新增账户信息
export function addAccount(data) {
  return request({
    url: '/erp/account',
    method: 'post',
    data: data
  })
}

// 修改账户信息
export function updateAccount(data) {
  return request({
    url: '/erp/account',
    method: 'put',
    data: data
  })
}

// 删除账户信息
export function delAccount(id) {
  return request({
    url: '/erp/account/' + id,
    method: 'delete'
  })
}
