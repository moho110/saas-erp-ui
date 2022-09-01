import request from '@/utils/request'

// 查询收支项目列表
export function listIn_out_item(query) {
  return request({
    url: '/erp/in_out_item/list',
    method: 'get',
    params: query
  })
}

// 查询收支项目详细
export function getIn_out_item(id) {
  return request({
    url: '/erp/in_out_item/' + id,
    method: 'get'
  })
}

// 新增收支项目
export function addIn_out_item(data) {
  return request({
    url: '/erp/in_out_item',
    method: 'post',
    data: data
  })
}

// 修改收支项目
export function updateIn_out_item(data) {
  return request({
    url: '/erp/in_out_item',
    method: 'put',
    data: data
  })
}

// 删除收支项目
export function delIn_out_item(id) {
  return request({
    url: '/erp/in_out_item/' + id,
    method: 'delete'
  })
}
