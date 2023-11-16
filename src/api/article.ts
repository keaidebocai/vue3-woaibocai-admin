import request from '../utils/request'
const BaseURl = 'admin/api/manager/article/'
//获取所有文章
export const findAllPage = (current,size) => {
    return request({
      url: BaseURl + `findAllPage/${current}/${size}`,
      method: 'get'
    })
  }
