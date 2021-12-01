<template>
  <div class="app-container">
    <div class="text">平行志愿1:</div>
    <el-form ref="form1" :model="form" label-width="120px">
      <el-form-item label="院校名称">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="非军人" value="1" />
          <el-option label="军人" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="专业名称">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="共青团员" value="1" />
          <el-option label="群众" value="2" />
          <el-option label="共产党员" value="3" />
          <el-option label="其他" value="4" />
        </el-select>
      </el-form-item>
    <div class="text">平行志愿2:</div>
      <el-form-item label="院校名称">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="非军人" value="1" />
          <el-option label="军人" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="专业名称">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="共青团员" value="1" />
          <el-option label="群众" value="2" />
          <el-option label="共产党员" value="3" />
          <el-option label="其他" value="4" />
        </el-select>
      </el-form-item>
    <div class="text">平行志愿3:</div>
      <el-form-item label="院校名称">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="非军人" value="1" />
          <el-option label="军人" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="专业名称">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="共青团员" value="1" />
          <el-option label="群众" value="2" />
          <el-option label="共产党员" value="3" />
          <el-option label="其他" value="4" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

