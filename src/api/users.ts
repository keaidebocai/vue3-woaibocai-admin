import { useTokenStore } from '@/stores/mytoken'
import request from '../utils/request'
//提取公共的类型
type CommonReturn<T = string> = {
  code: number
  message: string
  data: T
}
//用户登录-参数类型
type LoginInfo = {
  userName: string
  password: string
}
//用户登录-返回
type LoginResult = CommonReturn
//用户请求登录
export const login = (loginInfo: LoginInfo) => {
  return request<LoginResult>({
    url: 'admin/api/manager/login',
    method: 'post',
    // data: loginDto
    data: loginInfo
  })
}
//获取用户信息
type UserInfo = CommonReturn<{
  userName: string
  avatar: string
  nickName: string
}>
// type UserInfo = {
//   code: number
//   message: string
//   data: {
//     userName: string
//     avatar: string
//     nickName: string
//   }
// }
export const getUserInfo = () => {
  return request<UserInfo>({
    method: 'get',
    url: 'admin/api/manager/userInfo'
  })
}

//退出
export const logout = (logoutTokens) => {
  return request({
    method: 'post',
    url: 'admin/api/manager/logout',
    data: logoutTokens
  })
}
//刷新token
type RToken = CommonReturn<{
  token: string
  refresh_token: string
}>
export const refreshToken = () => {
  return request<RToken>({
    method: 'post',
    url: 'admin/api/manager/authorizations',
    data: `refresh_token=${useTokenStore().token?.refresh_token}`
  })
}
