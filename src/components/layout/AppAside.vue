<script setup lang="ts">
import { isCollapse } from './isCollapse'
</script>

<template>
  <el-aside>
    <el-scrollbar>
      <el-menu router unique-opened :collapse="isCollapse">
        <a href="/" class="logo">
          <img src="@/assets/bclogo.svg" />
          <h1>我爱菠菜</h1>
        </a>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><IEpSetting /></el-icon><span>文章管理</span>
          </template>
          <el-menu-item index="/article">
            <el-icon><IEpSetting /></el-icon><span>文章列表</span>
          </el-menu-item>

          <el-menu-item index="/writeArticle">
            <el-icon><IEpSetting /></el-icon><span>写文章</span>
          </el-menu-item>

        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><IEpSetting /></el-icon><span>标签管理</span>
          </template>
          <el-menu-item index="/tagList">
            <el-icon><IEpSetting /></el-icon><span>标签列表</span>
          </el-menu-item>
          
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <el-icon><IEpSetting /></el-icon><span>友链管理</span>
          </template>
          <el-menu-item index="/friendsList">
            <el-icon><IEpSetting /></el-icon><span>友链列表</span>
          </el-menu-item>
        </el-sub-menu>
<!-- categoryList -->
        <el-sub-menu index="4">
          <template #title>
            <el-icon><IEpSetting /></el-icon><span>分类管理</span>
          </template>
          <el-menu-item index="/categoryList">
            <el-icon><IEpSetting /></el-icon><span>分类列表</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="5">
          <template #title>
            <el-icon><IEpSetting /></el-icon><span>评论管理</span>
          </template>
          <el-menu-item index="/commentList">
            <el-icon><IEpSetting /></el-icon><span>评论列表</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="course">
          <el-icon><IEpSetting /></el-icon><span>课程管理</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
  background-color: #e9e9eb;
  height: 100vh;
  width: auto;
}
.el-menu {
  background-color: #e9e9eb;
  border-right: none;
  width: 200px;
  &.el-menu--collapse {
    width: 60px;
    & h1 {
      display: none;
    }
  }
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  text-decoration: none;
  color: black;
  img {
    width: 32px;
    height: 32px;
  }
}
</style>
