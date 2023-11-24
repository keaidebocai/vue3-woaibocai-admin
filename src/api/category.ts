import request from '../utils/request'
const BaseURl = 'admin/api/manager/category/'
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
    categoryName: string
    description: string
  }] 
}>
type Query = {
    categoryName: string
}
export const FindAllPage = (current: number,size: number,queryDate: Query) => {
    return request<FindAllPage>({
      url: BaseURl + `list/${current}/${size}`,
      method: 'post',
      data: queryDate
    })
  }
//删除
export const DeleteById = (id: string) => {
    return request<CommonReturn<string>>({
      url: BaseURl + `delete/${id}`,
      method: 'delete'
    })
}
//修改InsertCategory
type updateData = {
    id: string
    categoryName: string
    description: string
}
export const InsertCategory = (insertCategory: updateData) => {
    return request<CommonReturn<string>>({
      url: BaseURl + `putOfCategory`,
      method: 'put',
      data: insertCategory
    })
}