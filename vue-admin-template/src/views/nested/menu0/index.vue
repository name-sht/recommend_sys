<template>
  <div id="app">
    <a class="btn" @click="toggleShow">设置头像</a>
    <my-upload
           @crop-success="cropSuccess"
           @crop-upload-success="cropUploadSuccess"
           @crop-upload-fail="cropUploadFail"
           v-model="show"
           :width="200"
           :height="200"
           img-format="png"
           :size="size"
           langType='zh'
           :noRotate='false'
           field="Avatar1"
           url="https://httpbin.org/post"></my-upload>
    <img :src="imgDataUrl">
  </div>
</template>
<script>
import 'babel-polyfill'; // es6 shim
import myUpload from 'vue-image-crop-upload/upload-2.vue';
export default {
  data() {
    return {
      imgDataUrl: "",
      show: false,
      size:2.1
    }
  },
  components: {
    "my-upload": myUpload

  },
  methods: {

    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
      console.log('-------- crop success --------',imgDataUrl, field);
    },
    //上传成功回调
    cropUploadSuccess(jsonData, field){
      console.log('-------- upload success --------');
      this.imgDataUrl = jsonData.files.Avatar1;
      console.log(jsonData);
      console.log('field: ' + field);
    },
    //上传失败回调
    cropUploadFail(status, field){
      console.log('-------- upload fail --------');
      console.log('上传失败状态'+ status);
      console.log('field: ' + field);
    }
  }

}
</script>
