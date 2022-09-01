import request from '@/utils/request'

// 查询单据编号列表
export function listSequence(query) {
  return request({
    url: '/erp/sequence/list',
    method: 'get',
    params: query
  })
}

// 查询单据编号详细
export function getSequence(seqName) {
  return request({
    url: '/erp/sequence/' + seqName,
    method: 'get'
  })
}

// 新增单据编号
export function addSequence(data) {
  return request({
    url: '/erp/sequence',
    method: 'post',
    data: data
  })
}

// 修改单据编号
export function updateSequence(data) {
  return request({
    url: '/erp/sequence',
    method: 'put',
    data: data
  })
}

// 删除单据编号
export function delSequence(seqName) {
  return request({
    url: '/erp/sequence/' + seqName,
    method: 'delete'
  })
}
