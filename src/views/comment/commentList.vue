<script lang="ts" setup>
import { DeleteById, FindAllPage } from '@/api/comment'
import { onMounted, ref } from 'vue'
//================分页===============
//初始页数
const paramPages = {
  current: 1,
  size: 5
}
const page = ref(paramPages)
const total = ref(0)
const fetchData = async() => {
    const { data } = await FindAllPage(page.value.current,page.value.size,query.value)
    commentData.value = data.data.records
    total.value = data.data.total
    page.value.current = data.data.current
    page.value.size = data.data.size
}
//删除评论
const deleteById = async id => {
    ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    })
    .then(async () => {
        await DeleteById(id)
        ElMessage.success('删除成功')
        fetchData()
    })
}
//=======================加载数据=========================
onMounted(() => {
  fetchData()
})
const tableData = [{
    id: '',
    content: '',
    blogArticleId: '',
    articleTitle: '',
    toCommentUserId: '',
    toCommentUserNickName: '',
    toCommentId: '',
    toCommentNickName: '',
    commentLikeCount: 0,
    createTime: ''
}]
const commentData = ref(tableData)
//查询数据
const queryData = {
    content: '',
    articleTitle: '',
    toCommentUserNickName: '',
    toCommentNickName: ''

}
const query = ref(queryData)
const queryDataClick = () => {
    fetchData()
}
</script>

<template>
    <div>
        <el-form :inline="true" :model="query" style="width: 300">
            <el-form-item label="评论关键字">
                <el-input v-model="query.content" placeholder="如: 你'redis'用的真好!"/>
            </el-form-item>
            <el-form-item label="文章">
                <el-input v-model="query.articleTitle" placeholder="输入文章标题"/>
            </el-form-item>
            <el-form-item label="评论者">
                <el-input v-model="query.toCommentUserNickName" placeholder="评论者"/>
            </el-form-item>
            <el-form-item label="接收评论者">
                <el-input v-model="query.toCommentNickName" placeholder="接收评论者"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="queryDataClick">查他！</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="commentData" style="width: 100%">
        <el-table-column fixed prop="createTime" label="时间" width="150" />
        <el-table-column prop="content" label="评论内容" width="120">
            <template #default="scope">
                <el-popover
                placement="bottom"
                :title="scope.row.toCommentUserNickName"
                :width="200"
                trigger="hover"
                :content="scope.row.content"
            >
                <template #reference>
                <el-button type="text" size="small">查看内容</el-button>
                </template>
            </el-popover>
            </template>
        </el-table-column>
        <el-table-column prop="articleTitle" label="文章名" width="120" />
        <el-table-column prop="toCommentUserNickName" label="发评论的昵称" width="120" />
        <el-table-column prop="toCommentNickName" label="收评论的昵称" width="120" />
        <el-table-column prop="commentLikeCount" label="点赞数" width="120" />
        <el-table-column fixed="right" label="Operations" width="150">
            <template #default="scope">
            <el-button type="primary" size="small" @click="deleteById(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="page.current"
          v-model:page-size="page.size"
          :page-sizes="[3,5,10,20,50,100]"
          :small="small"
          :disabled="false"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :jumper="page.current"
          @jumper-change="fetchData()"
          @size-change="fetchData()"
          @current-change="fetchData()"
        />
    </div>
</div>
</template>
<style lang="scss" scoped>
.demo-pagination-block  {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}

.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
  
  
  