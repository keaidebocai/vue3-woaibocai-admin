import request from '../utils/request'
const BaseURl = 'admin/api/manager/comment/'
//提取公共的类型
type CommonReturn<T = string> = {
  code: number
  message: string
  data: T
}
type QueryData = {
    content: string
    articleTitle: string
    toCommentUserNickName: string
    toCommentNickName: string

}
export const FindAllPage = (current: number,size: number,query: QueryData) => {
    return request({
      url: BaseURl + `getCommentList/${current}/${size}`,
      method: 'post',
      data: query
    })
}
//DeleteById
export const DeleteById = (id: string) => {
  return request({
    url: BaseURl + `delete/${id}`,
    method: 'delete'
  })
}