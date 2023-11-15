import { defineStore } from 'pinia'
//主要是为了使用token的时候给你类型提示
interface Token {
  token: string
  refresh_token: string
}

export const useTokenStore = defineStore('mytoken', () => {
  //ref相当于state
  const tokenJson = ref('')
  //ref相当于getter,后端返回的数据时Json字符串，不是对象！！！！！
  const token = computed<Token>(() => {
    try {
      return JSON.parse(tokenJson.value || window.localStorage.getItem('TokenInfo') || '{}')
    } catch (err) {
      ElMessage.error('json字符串格式错误,转化对象失败!')
      window.localStorage.setItem('TokenInfo', '')
      throw err
    }
  })

  //function相当于actions
  function saveToken(data: string) {
    tokenJson.value = data
    window.localStorage.setItem('TokenInfo', data)
  }

  //向外暴露
  return { token, saveToken }
})
