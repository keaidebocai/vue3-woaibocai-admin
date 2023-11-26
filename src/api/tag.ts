import type { type } from 'os'
import request from '../utils/request'
const BaseURl = 'admin/api/manager/tag/'
//提取公共的类型
type CommonReturn<T = string> = {
  code: number
  message: string
  data: T
}
//获取条件分页查询
type FindAllPage = CommonReturn<{
  size: number
  current: number
  total: number
  records: [{
    id: string
    tagName: string
    remark: string
  }] 
}>
type Query = {
    tagName: string
}
export const FindAllPage = (current: number,size: number,queryData: Query) => {
    return request<FindAllPage>({
      url: BaseURl + `findByTageName/${current}/${size}`,
      method: 'post',
      data: queryData
    })
}
//添加/更改标签，交给后端去处理，主要看有没有id
type tableData = {
  tagName: string
  remark: string
}
export const InsertTag = (insertTag: tableData) => {
  return request<CommonReturn>({
    url: BaseURl + `insertTag`,
    method: 'post',
    data: insertTag
  })
}
//删除文章
export const DeleteById = (id) => {
  return request({
    url: BaseURl + `deleteById/${id}`,
    method: 'delete',
  })
}
//获取所有tag信息方便展示 getAllTagAndId
export const GetAllTagAndId = () => {
  return request({
    url: BaseURl + `getAllTagAndId`,
    method: 'get'
  })
}