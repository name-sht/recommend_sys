<template>
  <div class="app-container">
    <div class="title-container">
      <h3 class="title">学信网注册系统</h3>
    </div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phoneNumber" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item label="学校">
        <el-select v-model="form.university" placeholder="please select">
          <el-option label="复旦大学" value="复旦大学" />
          <el-option label="同济大学" value="同济大学" />
          <el-option label="上海交通大学" value="上海交通大学" />
          <el-option label="华东理工大学" value="华东理工大学" />
          <el-option label="上海理工大学" value="上海理工大学" />
          <el-option label="上海海事大学" value="上海海事大学" />
          <el-option label="东华大学" value="东华大学" />
          <el-option label="上海海洋大学" value="上海海洋大学" />
          <el-option label="清华大学" value="清华大学" />
        </el-select>
      </el-form-item>
      <el-form-item label="专业">
        <el-select v-model="form.major" placeholder="please select">
          <el-option label="软件工程" value="软件工程" />
          <el-option label="炼金工程" value="炼金工程" />
          <el-option label="中国现当代文学" value="中国现当代文学" />
          <el-option label="无线电物理" value="无线电物理" />
          <el-option label="逻辑学" value="逻辑学" />
          <el-option label="体育教育训练学" value="体育教育训练学" />
          <el-option label="西班牙语语言文学" value="西班牙语语言文学" />
          <el-option label="运筹学与控制论" value="运筹学与控制论" />
        </el-select>
      </el-form-item>
      <el-form-item label="身份">
        <el-radio v-model="form.gender" label=0>学生</el-radio>
        <el-radio v-model="form.gender" label=1>老师</el-radio>
      </el-form-item>
      <el-form-item>
        <el-row>
        <el-button type="primary" @click="onSubmit">注册</el-button>
        <el-button @click="onCancel">登录</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postData } from '@/api/register'
export default {
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      form: {
        username: '',
        password: '',
        phoneNumber: '',
        university: '',
        major: '',
        identity: 0
      }
    }
  },
  methods: {
    onSubmit() {
      const { username,
        password,
        phoneNumber,
        university,
        major,
        identity
      } = this.form
      const pData = { username: username,
        password: password,
        phoneNumber: phoneNumber,
        university: university,
        major: major,
        identity: identity }
      new Promise((resolve, reject) => {
        postData(pData).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      this.$message('submit!')
    },
    onCancel() {
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #d9d5ca;
$light_gray:#fff;
$cursor: #fff;
.app-container {
  min-height: 100%;
  margin-top: 7%;
  margin-left: 30%;
  width: 40%;
  overflow: hidden;
  .title-container {
    .title {
      font-size: 26px;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .el-form{
    .el-form-item{
      .el-input{
        input {
          background: transparent;
          border: 0px;
          -webkit-appearance: none;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: $light_gray;
          height: 47px;
          caret-color: $cursor;
      }
    }
  }
}
}

</style>

