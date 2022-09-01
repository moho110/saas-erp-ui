import request from '@/utils/request'

// 查询系统参数列表
export function listSys_config(query) {
  return request({
    url: '/erp/sys_config/list',
    method: 'get',
    params: query
  })
}

// 查询系统参数详细
export function getSys_config(id) {
  return request({
    url: '/erp/sys_config/' + id,
    method: 'get'
  })
}

// 新增系统参数
export function addSys_config(data) {
  return request({
    url: '/erp/sys_config',
    method: 'post',
    data: data
  })
}

// 修改系统参数
export function updateSys_config(data) {
  return request({
    url: '/erp/sys_config',
    method: 'put',
    data: data
  })
}

// 删除系统参数
export function delSys_config(id) {
  return request({
    url: '/erp/sys_config/' + id,
    method: 'delete'
  })
}
