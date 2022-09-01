import request from '@/utils/request'

// 查询多单位列表
export function listUnit(query) {
  return request({
    url: '/erp/unit/list',
    method: 'get',
    params: query
  })
}

// 查询多单位详细
export function getUnit(id) {
  return request({
    url: '/erp/unit/' + id,
    method: 'get'
  })
}

// 新增多单位
export function addUnit(data) {
  return request({
    url: '/erp/unit',
    method: 'post',
    data: data
  })
}

// 修改多单位
export function updateUnit(data) {
  return request({
    url: '/erp/unit',
    method: 'put',
    data: data
  })
}

// 删除多单位
export function delUnit(id) {
  return request({
    url: '/erp/unit/' + id,
    method: 'delete'
  })
}
