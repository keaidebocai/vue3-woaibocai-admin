<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { InsertCategory, DeleteById, FindAllPage } from '@/api/category'
import { Edit } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus/es'
//列表数据
const tableData = {
    id: '',
    categoryName: '',
    description: ''
}

const categoryData = ref([tableData])
//初始化数据
const query = {
    categoryName: ''
}
const queryData = ref(query)
//初始页数
const paramPages = {
  current: 1,
  size: 5
}
const page = ref(paramPages)
const total = ref(0)
const fetchData = async () => {
    const { data }  = await FindAllPage(page.value.current,page.value.size,queryData.value)
    console.log(data.data.records)
    page.value.current = data.data.current
    page.value.size = data.data.size
    total.value = data.data.total
    categoryData.value = data.data.records
}
//标签添加弹框
const insertCategory = ref(tableData)
const dialogVisible = ref(false)
const EditDate = () => {
  dialogVisible.value = true
  insertCategory.value = {
    id: '',
    categoryName: '',
    description: ''
  }
}
const quitInsertCategory = () => {
  dialogVisible.value = false
  insertCategory.value = {
    id: '',
    categoryName: '',
    description: ''
  }
}
const insertCategoryEdit = async () =>{
  const { data } = await InsertCategory(insertCategory.value)
  if(data.code === 205) {
    ElMessage.error(data.message)
  }
  if (data.code === 200) {
    dialogVisible.value = false
  }
  if (data.code === 114) {
    dialogVisible.value = false
    ElMessage.success(data.message)
  }
  fetchData()
}
//=========删除按钮======================
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
//===========编辑tag
const editOfCategory = async row => {
  dialogVisible.value = true
  insertCategory.value = row
  console.log(insertCategory.value.id)
}
//查询条件
const onSubmit =  () => {
  fetchData()
}
//=======================加载数据=========================
onMounted(() => {
  fetchData()
})
</script>

<template>
<div>
  <!-- 搜索框 -->
  <el-form :inline="true" :model="queryData" class="demo-form-inline">
    <el-form-item label="搜索">
      <el-input v-model="queryData.categoryName" placeholder="请输入关键词" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查它！</el-button>
      <el-button type="primary" :icon="Edit" @click="EditDate">添加</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="categoryData" style="width: 100%">
    <el-table-column prop="categoryName" label="标签名"/>
    <el-table-column prop="description" label="备注"/>
    <el-table-column fixed="right" label="操作" width="140">
      <template #default="scope">
        <el-button type="primary" size="small" @click="editOfCategory(scope.row)">编辑</el-button>
        <el-button type="danger" size="small" @click="deleteById(scope.row.id)">删除</el-button>
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
    <!-- 添加弹框 -->
    <el-dialog v-model="dialogVisible" title="添加标签" width="30%">
      <el-form
        label-width="115px"
        :model="insertCategory"
        style="max-width: 460px"
      >
        <el-form-item label="标签名">
          <el-input v-model="insertCategory.categoryName" />
        </el-form-item>
        <el-form-item label="标签备注">
          <el-input v-model="insertCategory.description" />
        </el-form-item>
        <el-form-item>
          <template #default>
            <el-button type="primary" @click="insertCategoryEdit()">确定</el-button>
            <el-button type="danger" @click="quitInsertCategory">取消</el-button>
          </template>
        </el-form-item>
      </el-form>
    </el-dialog>
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