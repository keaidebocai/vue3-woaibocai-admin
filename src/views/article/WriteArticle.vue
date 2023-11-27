<script lang="ts" setup>
import { CategorySelector } from '@/api/category'
import { UpdateArticle, UpdateArticleData, WriteArticle } from '@/api/article'
import { GetAllTagAndId } from '@/api/tag'
import { onMounted, ref } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
//===============写文章接口的数据初始化============
const writeData = {
    id:'',
    blogCategoryId: '',
    tags: [],
    //标题
    title: '',
    //摘要
    summary: '',
    //缩略图
    thumbnail: '',
    //文章内容
    content: '',
    //是否发布
    status: '',
    //文章是否允许评论
    isCommont: '',
    //文章是否置顶
    isTop: ''

}
const write = ref(writeData)
//分类选择器
const category = [
    {
        value: '',
        label: ''
    }
]
const categoryList = ref(category)
const categoryData = async() => {
    const { data } = await CategorySelector()
    categoryList.value = data.data
}
const goOnWeb = async() => {
    ElMessageBox.confirm('确认提交文章?, 如需修改状态请到文章列表!', '提交文章', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'info',
    })
    .then(async () => {
        if(write.value.id){
            //如果有id那就是更新文章
            await UpdateArticle(write.value)
        } else {
            await WriteArticle(write.value)
        }
        
        //跳转到主页面
        router.push('/article')
        ElMessage.success('提交成功')
    })
}
//已存在的标签
const tagData = async() => {
    const { data } = await GetAllTagAndId()
    liveTags.value = data.data
}
//=======================加载数据=========================
onMounted(() => {
    const articleId = route.params.id
    if(articleId){
        console.log(articleId)
        const fetchData = async(articleId) => {
            const { data } = await UpdateArticleData(articleId)
            write.value = data.data
            // dynamicTags.value = data.data.tags
            // console.log(dynamicTags.value)
        }
        fetchData(articleId)
    }
    
    categoryData()
    tagData()
})
//==========================标签================================
import { ElInput } from 'element-plus'
const dynamicTags = ref([])
const liveTags = ref()

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
  write.value.tags.splice(write.value.tags.indexOf(tag),1)
  liveTags.value.push(tag)
  if(dynamicTags.value[0] == null){
    tagFlag.value = false
  }
}
const tagFlag = ref(false)
const handleInputConfirm = (tag) => {
    if (dynamicTags.value != null){
        tagFlag.value = true
    }
    dynamicTags.value.push(tag)
    liveTags.value.splice(liveTags.value.indexOf(tag),1)
    // dynamicTags.value = write.value.tags
    write.value.tags.push(tag)
}
//=============图片上传=====================
const handleSuccess = (response, file)=> {
    // 上传成功后获取服务器返回的图片URL，并将其赋值给imageUrl
    console.log(response.data)
    write.value.thumbnail = response.data
}
</script>
<template>
    <div>
        <div>
            <el-form :inline="true" style="width: 300">
                <el-form-item label="分类:">
                    <el-select v-model="write.blogCategoryId" filterable clearable placeholder="尝试一下搜索">
                        <el-option
                            v-for="item in categoryList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <!-- 置顶 -->
                <el-form-item label="是否置顶:" style="width: 180px;">
                <el-select
                    v-model="write.isTop"
                    placeholder="请选择"
                    clearable
                >
                    <el-option label="是" value="1" />
                    <el-option label="否" value="0" />
                </el-select>
                </el-form-item>
                <!-- 评论 -->
                <el-form-item label="是否允许评论:" style="width: 180px;">
                <el-select
                    v-model="write.isCommont"
                    placeholder="请选择"
                    clearable
                >
                    <el-option label="允许" value="1" />
                    <el-option label="不允许" value="0" />
                </el-select>
                </el-form-item>
                <!-- 发布 -->
                <el-form-item label="是否发布:" style="width: 180px;">
                    <el-select
                        v-model="write.status"
                        placeholder="请选择"
                        clearable
                    >
                        <el-option label="已发布" value="1" />
                        <el-option label="未发布" value="0" />
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form :inline="true">
                <el-form-item label="标签:" >
                    {{ tagFlag === true ? '': '选则右边的标签' }}
                    <el-tag
                        v-for="tag in dynamicTags"
                        :key="tag"
                        class="mx-1"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)"
                    >
                        {{ tag.name }}
                    </el-tag>
                </el-form-item>
                <el-form-item label="可选标签:" >
                    <el-tag
                        v-for="tag in liveTags"
                        :key="tag"
                        class="mx-1"
                        :disable-transitions="false"
                        @click="handleInputConfirm(tag)"
                    >
                    {{ tag.name }}
                </el-tag>
                </el-form-item>
            </el-form>
            <el-form :inline="true">
                <el-form-item label="文章标题:" >
                    <el-input placeholder="文章标题" v-model="write.title" type="textarea" />
                </el-form-item>
                <el-form-item label="摘要:" >
                    <el-input placeholder="摘要" v-model="write.summary" type="textarea" />
                </el-form-item>
                <!-- 图片上传 -->
                    <el-upload
                        action="http://localhost:16288/bcblog/cos/uploadThumbnail"
                        :on-success="handleSuccess"
                        :show-file-list="false"
                        >
                        <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                    </el-upload>
                    <img v-if="write.thumbnail" :src="write.thumbnail" alt="Uploaded Image" style="width: 540px;height: 300px;">
            </el-form>
            
        </div>
        
        <MdEditor v-model="write.content" />
        <el-button type="primary" @click="goOnWeb">编写完成!</el-button>
    </div>
</template>

<style lang="scss" scoped>
</style>