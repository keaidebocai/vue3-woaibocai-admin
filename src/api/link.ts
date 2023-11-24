import request from '../utils/request'
const BaseURl = 'admin/api/manager/link/'
//提取公共的类型
type CommonReturn<T = string> = {
  code: number
  message: string
  data: T
}
//获取所有文章
type FindAllPage = CommonReturn<{
  size: number
  current: number
  total: number
  records: [{
    id: string
    linkName: string
    logo: string
    description: string
    address: string
    status: string
    createTime: string
    updateTime: string
  }] 
}>
type Query = {
    linkName: string
}
export const FindAllPage = (current: number,size: number,queryDate: Query) => {
    return request<FindAllPage>({
      url: BaseURl + `list/${current}/${size}`,
      method: 'post',
      data: queryDate
    })
  }
//更新友链审核
type linkStatus = {
    id: string
    status: string
}
export const PutLinkStatus = (linkStatus: linkStatus) => {
    return request<CommonReturn>({
      url: BaseURl + `putStatus`,
      method: 'put',
      data: linkStatus
    })
}
//删除友链
export const DeletedById = (id: string) => {
    return request<CommonReturn>({
      url: BaseURl + `delete/${id}`,
      method: 'delete'
    })
}
//添加友链
type InsertLinkDto = {
    linkName: string
    logo: string
    description: string
    address: string
}
export const InsertLink = (insertLink: InsertLinkDto) => {
    return request<CommonReturn>({
      url: BaseURl + `insertLink`,
      method: 'post',
      data: insertLink
    })
}