<script lang="ts" setup>
import { InsertLink, DeletedById, PutLinkStatus, FindAllPage } from '@/api/link'
import { onMounted, ref } from 'vue'
//分页
const pages = {
  current: 1,
  size: 5
}
const paramPages = ref(pages)
const total = ref(0)
const tableData = [
  {
    id: '',
    linkName: '',
    logo: '',
    description: '',
    address: '',
    status: '',
    createTime: '',
    updateTime: ''
  }
]
//列表数据
const friendLink = ref(tableData)
const insertLink = ref({
    linkName: '',
    logo: '',
    description: '',
    address: ''
})
//更改审核状态
const linkStatus = ref({
    id: '',
    status: ''
})
const JoinToMyBlog = async(row) => {
    linkStatus.value.id = row.id
    linkStatus.value.status = row.status
    //status=1是通过的意思
    const { data } = await PutLinkStatus(linkStatus.value)
    ElMessage.success(data.message)
    fetchData()
}
//删除友链
const deleted = async id =>{
    ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
})
.then(async () => {
    const {data} = await DeletedById(id)
    ElMessage.success(data.message)
    fetchData()
  })
}
//查询数据
const query = {
    linkName: ''
}
const queryData = ref(query)
//查询条件
const onSubmit =  () => {
  fetchData()
}
//============添加弹框==============
const dialogVisible = ref(false)
const editOfLink = () => {
    insertLink.value = {
        linkName: '',
        logo: '',
        description: '',
        address: ''
    }
    dialogVisible.value = true
}
//弹框里的取消键
const quitInertLink = () => {
    dialogVisible.value = false
}
//弹窗里的确认件，添加link
const insertLinkEdit = async() => {
    
    const {data} = await InsertLink(insertLink.value)
    if(data.code === 200) {
        ElMessage.success(data.message)
    }else {
        ElMessage.error(data.message)
    }
    dialogVisible.value = false
    fetchData()
}
//初始化数据
const fetchData = async() => {
    const { data } = await FindAllPage(paramPages.value.current,paramPages.value.size,queryData.value)
    friendLink.value = data.data.records
    paramPages.value.current = data.data.current
    paramPages.value.size = data.data.size
    total.value = data.data.total
}
onMounted(() => {
    fetchData()
})
</script>

<template>
  <div>
    <!-- 搜索框 -->
    <el-form :inline="true" :model="queryData" class="demo-form-inline">
        <el-form-item label="搜索">
        <el-input v-model="queryData.linkName" placeholder="请输入关键词" clearable />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查它！</el-button>
        <el-button type="primary" :icon="Edit" @click="editOfLink">添加</el-button>
        </el-form-item>
    </el-form>
        <el-table :data="friendLink" style="width: 100%">
        <el-table-column prop="linkName" label="名称" width="150" />
        <el-table-column label="头像" width="65">
            <template #default="scope">
                <el-avatar :src="scope.row.logo" />
            </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="address" label="网络地址">
            <template #default="scope">
                <a :href="scope.row.address" target="_blank">
                  {{ scope.row.address }}
                </a>
            </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80" #default="scope">
            {{ scope.row.status == 0 ? '已发布':'未发布' }}
        </el-table-column>
        <el-table-column prop="createTime" label="请求时间" width="150" />
        <el-table-column fixed="right" label="操作" width="180"  #default="scope">
                <el-button type="primary" size="small" @click="JoinToMyBlog(scope.row)">
                    {{ scope.row.status == 0? '下架':'发布' }}
                </el-button>
                <el-button type="danger" size="small" @click="deleted(scope.row.id)">删除</el-button>
        </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
        <el-pagination
        v-model:current-page="paramPages.current"
        v-model:page-size="paramPages.size"
        :page-sizes="[1,5,10,20,50,100]"
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
    <!-- 添加弹框 -->
    <el-dialog v-model="dialogVisible" title="添加友链" width="30%">
      <el-form
        label-width="115px"
        :model="insertLink"
        style="max-width: 460px"
      >
        <el-form-item label="友链名称">
          <el-input v-model="insertLink.linkName" />
        </el-form-item>
        <el-form-item label="logo">
          <el-input v-model="insertLink.logo" />
        </el-form-item>
        <el-form-item label="网络地址">
          <el-input v-model="insertLink.address" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="insertLink.description" type="textarea"/>
        </el-form-item>

        <el-form-item>
          <template #default>
            <el-button type="primary" @click="insertLinkEdit">确定</el-button>
            <el-button type="danger" @click="quitInertLink">取消</el-button>
          </template>
        </el-form-item>
      </el-form>
    </el-dialog>
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