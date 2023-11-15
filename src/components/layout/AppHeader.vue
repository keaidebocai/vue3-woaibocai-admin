<script setup lang="ts">
import { useTokenStore } from '@/stores/mytoken'
import { isCollapse } from './isCollapse'
import { getUserInfo, logout } from '@/api/users'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useTokenStore()
//获取用户信息
const userInfo = ref({ avatar: '', nickName: '' })
getUserInfo().then((res) => {
  userInfo.value = res.data.data
})
//退出

const handleLogout = async () => {
  //出发事件的时候在获取新值
  const logoutTokens = {
    token: store.token?.token,
    refresh_token: store.token?.refresh_token
  }
  //1.询问，确认
  await ElMessageBox.confirm('确认要退出吗?', '退出询问', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch(() => {
    ElMessage.info('取消推出操作')
    return new Promise(() => {})
  })
  //2.执行退出
  await logout(logoutTokens).catch(() => {})
  //清空token，跳转到登录页面
  store.saveToken('')
  router.push({ name: 'login' })
}
</script>

<template>
  <el-header>
    <!-- 图标 -->
    <el-icon @click="isCollapse = !isCollapse">
      <IEpExpand v-show="isCollapse" />
      <IEpFold v-show="!isCollapse" />
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="32" :src="userInfo.avatar" />
        <el-icon class="el-icon--right">
          <IEpArrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ userInfo.nickName }}</el-dropdown-item>
          <el-dropdown-item divided @click="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<style lang="scss" scoped>
.el-header {
  display: flex;
  align-items: center;
  background-color: #dedfe0;
  .el-icon {
    margin-right: 17px;
  }
}
.el-dropdown {
  margin-left: auto;
  .el-dropdown-link {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
