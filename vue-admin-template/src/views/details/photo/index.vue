<template>
  <div id="apps">
    <img :src="photoUrl" style="width:100px; height:130px">
    <div class="text">
      <br>必须上传本人近期一寸正面免冠彩色头像照片（参照居民身份证照片样式） :<br>
      1.格式 jpg 或 jpeg，大小 20K - 500K<br>
      2.照片背景为单色（白色、蓝色、红色均可），人像清晰，神态自然，无明显畸变<br>
      3.上传的照片文件名称不要包含空格等持殊字符<br>
      4.本人近期照片不允许做处理．否则可能影晌复试录取<br>
      5.文件名不能包含特殊的字符，如＠、=、＞、＜等<br><br>
    </div>
    <el-upload
      class="upload-demo"
      accept="image/jpeg,image/jpg,image/png"
      action
      :http-request="uploadFile"
      :show-file-list="false"
    >
      <el-button size="small" type="primary">点击上传照片</el-button>
    </el-upload>
  </div>
</template>
<script>
import { postData } from '@/api/photo'

export default {
  inject: ['reload'],
  data() {
    return {
      photoUrl: '',
      flag: true
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const url = 'api/load_image' + '?t=' + Math.random() * 100000

      this.photoUrl = url
    },
    uploadFile(file) {
      const formDatas = new FormData()
      formDatas.append('image', file.file)
      new Promise((resolve, reject) => {
        postData(formDatas).then(response => {
          location.reload()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      this.$message('submit!')
    }
  }

}
</script>

<style lang="scss" scoped>
#apps{
  margin-top: 10%;
  margin-left: 25%;
}
</style>
