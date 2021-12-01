<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="学校名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="学术论文或著作">
        <el-input v-model="form.name" type="textarea"/>
      </el-form-item>
      <div class="text">学习与工作经历:</div>
      <el-form-item label="起止年月">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="学习或工作单位">
        <el-input v-model="form.name" />
      </el-form-item>
        <el-form-item label="起止年月">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="学习或工作单位">
          <el-input v-model="form.name" />
        </el-form-item>
          <el-form-item label="起止年月">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="学习或工作单位">
            <el-input v-model="form.name" />
          </el-form-item>
            <el-form-item label="起止年月">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="学习或工作单位">
              <el-input v-model="form.name" />
            </el-form-item>
      <el-form-item label="奖励或处分">
        <el-input v-model="form.name" type="textarea"/>
      </el-form-item>
      <el-form-item label="作弊情况">
        <el-input v-model="form.name" type="textarea"/>
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

