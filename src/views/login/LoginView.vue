<template>
  <div class="login">
    <el-form
      :model="form"
      ref="formRef"
      :rules="rules"
      label-width="120px"
      label-position="top"
      size="large"
      @keyup.enter="onSubmit"
      :loading="isLoading"
    >
      <h2>登录</h2>
      <el-form-item label="用户名:" prop="userName">
        <el-input v-model="form.userName" :prefix-icon="User" placeholder="输入你的用户名/手机号" />
      </el-form-item>
      <el-form-item label="密&emsp;码:" prop="password">
        <el-input
          v-model="form.password"
          show-password
          :prefix-icon="Lock"
          placeholder="请输入你的密码"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="isLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { login } from '@/api/users'
import type { FormRules, FormInstance } from 'element-plus'
import { useTokenStore } from '@/stores/mytoken' //解构会失去响应性没当然可以保义正storeToRefs(store)
import { useRouter, useRoute } from 'vue-router'
const store = useTokenStore()
const router = useRouter()
const route = useRoute()
//图标引入
import { User, Lock } from '@element-plus/icons-vue'
//表单的响应式数据
const formData = {
  userName: 'admin',
  password: '123456'
}
const form = ref(formData)
//登陆事件
const onSubmit = async () => {
  isLoading.value = true
  //表单校验
  await formRef.value?.validate().catch((err) => {
    ElMessage.error('表单校验失败...')
    isLoading.value = false
    throw err
    //return new Promise(() => {})
  })

  //正式发送登录请求
  const data = await login(form.value).then((res) => {
    if (res.data.code === 200) {
      ElMessage.success('登陆成功!')
      return res.data
    } else {
      ElMessage.error(res.data.message)
      isLoading.value = false
      throw new Error('登录信息有误!')
    }
  })
  //保存tokrn信息
  store.saveToken(data.data)
  isLoading.value = false

  //跳转到主页面
  router.push((route.query.redirect as string) || '/')
}
//定义表单校验规则 elementPlus 和 TS 泛型的增益效果
const rules = reactive<FormRules>({
  userName: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    { min: 5, message: '账户必须大于5位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度必须在6~18位', trigger: 'blur' }
  ]
})
//是否定义加载中
const isLoading = ref(false)
const formRef = ref<FormInstance>()
</script>

<style lang="scss" scoped>
.login {
  background-color: #00aaff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    width: 300px;
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
  }
  .el-form-item {
    margin-top: 20px;
  }
  .el-button {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
