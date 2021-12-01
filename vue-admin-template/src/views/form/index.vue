<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="姓名拼音">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="现役类型">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="非军人" value="1" />
          <el-option label="军人" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="政治面貌">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="共青团员" value="1" />
          <el-option label="群众" value="2" />
          <el-option label="共产党员" value="3" />
          <el-option label="其他" value="4" />
        </el-select>
      </el-form-item>
      <el-form-item label="出生地">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="籍贯所在地">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="出生日期">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="民族">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="共青团员" value="1" />
          <el-option label="群众" value="2" />
          <el-option label="共产党员" value="3" />
          <el-option label="其他" value="4" />
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.resource">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
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

