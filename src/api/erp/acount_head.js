import request from '@/utils/request'

// 查询财务主列表
export function listAcount_head(query) {
  return request({
    url: '/erp/acount_head/list',
    method: 'get',
    params: query
  })
}

// 查询财务主详细
export function getAcount_head(id) {
  return request({
    url: '/erp/acount_head/' + id,
    method: 'get'
  })
}

// 新增财务主
export function addAcount_head(data) {
  return request({
    url: '/erp/acount_head',
    method: 'post',
    data: data
  })
}

// 修改财务主
export function updateAcount_head(data) {
  return request({
    url: '/erp/acount_head',
    method: 'put',
    data: data
  })
}

// 删除财务主
export function delAcount_head(id) {
  return request({
    url: '/erp/acount_head/' + id,
    method: 'delete'
  })
}
