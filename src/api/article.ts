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
  records: [
    {
      id: string
      title: string
      isTop: string
      viewCount: number
      isCommont: string
      status: string
      isDeleted: number
      createTime: string
      updateTime: string
    }
  ]
}>
type selectArticleStatus = {
  title: string
  isTop: string
  isCommont: string
  status: string
  orderBy: string
}
export const FindAllPage = (current: number, size: number, queryCriteria: selectArticleStatus) => {
  return request<FindAllPage>({
    url: BaseURl + `findAllPage/${current}/${size}`,
    method: 'post',
    data: queryCriteria
  })
}
//更新文章状态
type blogRow = {
  id: string
  title: string
  isTop: string
  isCommont: string
  status: string
}
export const UpdateArticleStatus = (blogArticleRow: blogRow) => {
  return request({
    url: BaseURl + `updateArticleStatus`,
    method: 'post',
    data: blogArticleRow
  })
}
//删除文章
export const DeleteById = (id, url) => {
  return request({
    url: BaseURl + `deleteById/${id}/${url}`,
    method: 'delete'
  })
}
//添加文章
export const WriteArticle = (write) => {
  return request({
    url: BaseURl + `writeArticle`,
    method: 'post',
    data: write
  })
}
//修改文章数据回显 updateArticleData/{id}
export const UpdateArticleData = (id) => {
  return request({
    url: BaseURl + `updateArticleData/${id}`,
    method: 'get'
  })
}
//修改文章 updateArticle
export const UpdateArticle = (write) => {
  return request({
    url: BaseURl + `updateArticle`,
    method: 'put',
    data: write
  })
}
// 批量上传图片
// ('http://localhost:16288/api/blog/cos/userUpload', {
//     method: 'post',
//     body: data
//     // headers: {
//     //   "Content-Type": "multipart/form-data",
//     // },
//   })
export const UserOnUploadImage = (data: FormData) => {
  return request({
    url: 'http://localhost:16288/api/blog/cos/userUpload',
    method: 'post',
    data: data
  })
}
