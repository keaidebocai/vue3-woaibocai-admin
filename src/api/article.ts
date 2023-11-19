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
  records: [{
    id: string
    title: string
    isTop: string
    viewCount: number
    isCommont: string
    status: string
    isDeleted: number
    createTime: string
    updateTime: string
  }] 
}>
type selectArticleStatus = {
    title: string
    isTop: string
    isCommont: string
    status: string
    orderBy: string
}
export const FindAllPage = (current: number,size: number,queryCriteria: selectArticleStatus) => {
    return request<FindAllPage>({
      url: BaseURl + `findAllPage/${current}/${size}`,
      method: 'post',
      data: queryCriteria
    })
  }
  //更新文章状态
type blogRow = {
    id: string,
    title: string,
    isTop: string,
    isCommont: string,
    status: string,
  }
  export const UpdateArticleStatus = (blogArticleRow: blogRow) => {
    return request({
      url: BaseURl + `updateArticleStatus`,
      method: 'post',
      data: blogArticleRow
    })
  }
  //删除文章
  export const DeleteById = (id) => {
    return request({
      url: BaseURl + `deleteById/${id}`,
      method: 'delete',
    })
  }
  
