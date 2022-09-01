import request from '@/utils/request'

// 查询供应商/客户信息列表
export function listSupplier(query) {
  return request({
    url: '/erp/supplier/list',
    method: 'get',
    params: query
  })
}

// 查询供应商/客户信息详细
export function getSupplier(id) {
  return request({
    url: '/erp/supplier/' + id,
    method: 'get'
  })
}

// 新增供应商/客户信息
export function addSupplier(data) {
  return request({
    url: '/erp/supplier',
    method: 'post',
    data: data
  })
}

// 修改供应商/客户信息
export function updateSupplier(data) {
  return request({
    url: '/erp/supplier',
    method: 'put',
    data: data
  })
}

// 删除供应商/客户信息
export function delSupplier(id) {
  return request({
    url: '/erp/supplier/' + id,
    method: 'delete'
  })
}
