<script setup lang="ts">
import { findAllPage } from '@/api/article'
import { ref, onMounted } from 'vue'

//定义分页列表
const defaultFrom = [
  {
    id: 0,
    title: '666',
    isTop: '',
    viewCount: 0,
    isCommont: '',
    status: '',
    isDeleted: 0,
    createTime: '2023-11-17',
    updateTime: '',
  },
]
const blogArticle = ref(defaultFrom)
const pages = {
  current: 1,
  size: 5
}
const paramPages = ref(pages)
const total = ref(0)
const handleClick = async () => {

}
const selectArticleStatus = {
    title: '',
    isTop: '',
    isCommont: '',
    status: '',
    orderBy: ''
}
//查询条件
const onSubmit =  () => {
  fetchData()
}
const queryCriteria = ref(selectArticleStatus)
//刷新数据
const fetchData = async () => {
  const { data } = await findAllPage(paramPages.value.current,paramPages.value.size,queryCriteria.value)
  console.log(data.data.records)
  paramPages.value.current = data.data.current
  paramPages.value.size = data.data.size
  total.value = data.data.total
  blogArticle.value = data.data.records
}
//=======================加载数据=========================
onMounted(() => {
  fetchData()
})

</script>
<!-- id: '',
title: '',
isTop: 1,
viewCount: 1,
isCommont: 1,
status: 1,
isDeleted: 0,
createTime: '',
updateTime: '', -->
<template>
  <div>
    <el-form :inline="true" :model="queryCriteria" class="demo-form-inline">
    <el-form-item label="标题:">
      <el-input v-model="queryCriteria.title" placeholder="请输入文章标题" clearable />
    </el-form-item>
    <!-- 置顶 -->
    <el-form-item label="是否置顶:" style="width: 180px;">
      <el-select
        v-model="queryCriteria.isTop"
        placeholder="请选择"
        clearable
      >
        <el-option label="全部" value="" />
        <el-option label="是" value="1" />
        <el-option label="否" value="0" />
      </el-select>
    </el-form-item>
    <!-- 评论 -->
    <el-form-item label="是否允许评论:" style="width: 180px;">
      <el-select
        v-model="queryCriteria.isCommont"
        placeholder="请选择"
        clearable
      >
        <el-option label="全部" value="" />
        <el-option label="允许" value="1" />
        <el-option label="不允许" value="0" />
      </el-select>
    </el-form-item>
    <!-- 发布 -->
    <el-form-item label="是否发布:" style="width: 180px;">
      <el-select
        v-model="queryCriteria.status"
        placeholder="请选择"
        clearable
      >
        <el-option label="全部" value="" />
        <el-option label="已发布" value="1" />
        <el-option label="未发布" value="0" />
      </el-select>
    </el-form-item>
    <!-- 排序 -->
    <el-form-item label="排序根据" style="width: 180px;">
      <el-select
        v-model="queryCriteria.orderBy"
        placeholder="从高到低"
        clearable
      >
        <el-option label="任意" value="" />
        <el-option label="创建时间" value="1" />
        <el-option label="浏览量" value="0" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>

    <el-table :data="blogArticle" style="width: 100%">
    <el-table-column fixed prop="title" label="标题" width="150" />
    <el-table-column prop="isTop" label="置顶" width="120" #default="scope">
      {{ scope.row.isTop == 1 ? '是' : '否' }}
    </el-table-column>
    <el-table-column prop="viewCount" label="浏览量" width="120" #default="scope">
      {{ scope.row.viewCount }}
    </el-table-column>
    <el-table-column prop="isCommont" label="评论" width="120" #default="scope">
      {{ scope.row.isCommont == 1 ? '允许' : '不允许' }}
    </el-table-column>
    <el-table-column prop="status" label="发布" width="120" #default="scope">
      {{ scope.row.status == 1 ? '已发布' : '未发布' }}
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" width="200" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick"
          >编辑</el-button
        >
        <el-button link type="primary" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="paramPages.current"
      v-model:page-size="paramPages.size"
      :page-sizes="[3,5,10,20,50,100]"
      :small="small"
      :disabled="false"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :jumper="paramPages.current"
      @jumper-change="fetchData()"
      @size-change="fetchData()"
      @current-change="fetchData()"
    />
    
  </div>
  </div>
</template>

<style lang="scss" scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}

.demo-form-inline .el-input {
  --el-input-width: 220px;
}

</style>
