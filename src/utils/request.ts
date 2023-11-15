import axios, { type AxiosRequestHeaders } from 'axios'
import { useTokenStore } from '@/stores/mytoken'
import { refreshToken } from '@/api/users'
import router from '@/router/index'
const request = axios.create({
  baseURL: 'http://localhost:16289/'
})

//请求拦截器
request.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders
  }
  const store = useTokenStore()
  config.headers.Authorization = 'Bearer ' + store.token?.token

  return config
})

//响应拦截器
request.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      //刷新token
      const { data } = await refreshToken()
      if (data.code === 200) {
        //保存新token
        useTokenStore().saveToken(data.data)
        //重新请求之前的接口，并且返回结果
        return request(error.config)
      } else {
        //跳转登陆界面
        ElMessage.error('刷新Token失败,需要重新登录才可以!')
        router.push({ name: 'login' })
        return
      }
    }
    return Promise.reject(error)
  }
)

export default request
