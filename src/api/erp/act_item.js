import request from '@/utils/request'

// 查询财务子列表
export function listAct_item(query) {
  return request({
    url: '/erp/act_item/list',
    method: 'get',
    params: query
  })
}

// 查询财务子详细
export function getAct_item(id) {
  return request({
    url: '/erp/act_item/' + id,
    method: 'get'
  })
}

// 新增财务子
export function addAct_item(data) {
  return request({
    url: '/erp/act_item',
    method: 'post',
    data: data
  })
}

// 修改财务子
export function updateAct_item(data) {
  return request({
    url: '/erp/act_item',
    method: 'put',
    data: data
  })
}

// 删除财务子
export function delAct_item(id) {
  return request({
    url: '/erp/act_item/' + id,
    method: 'delete'
  })
}
