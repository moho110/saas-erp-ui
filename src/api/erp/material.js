import request from '@/utils/request'

// 查询产品列表
export function listMaterial(query) {
  return request({
    url: '/erp/material/list',
    method: 'get',
    params: query
  })
}

// 查询产品详细
export function getMaterial(id) {
  return request({
    url: '/erp/material/' + id,
    method: 'get'
  })
}

// 新增产品
export function addMaterial(data) {
  return request({
    url: '/erp/material',
    method: 'post',
    data: data
  })
}

// 修改产品
export function updateMaterial(data) {
  return request({
    url: '/erp/material',
    method: 'put',
    data: data
  })
}

// 删除产品
export function delMaterial(id) {
  return request({
    url: '/erp/material/' + id,
    method: 'delete'
  })
}
