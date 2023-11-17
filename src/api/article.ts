import request from '../utils/request'
const BaseURl = 'admin/api/manager/article/'
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
  records: {
    id: number
    title: string
    isTop: string
    viewCount: number
    isCommont: string
    status: string
    isDeleted: number
    createTime: string
    updateTime: string
  } 
}>
type selectArticleStatus = {
    title: string
    isTop: string
    isCommont: string
    status: string
    orderBy: string
}
export const findAllPage = (current: number,size: number,queryCriteria: selectArticleStatus) => {
    return request<FindAllPage>({
      url: BaseURl + `findAllPage/${current}/${size}`,
      method: 'post',
      data: queryCriteria
    })
  }
