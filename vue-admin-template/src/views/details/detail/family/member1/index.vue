<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="关系">
        <el-input v-model="form.relationship" />
      </el-form-item>

      <el-form-item label="电话">
        <el-input v-model="form.phoneNumber" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getData, postData } from '@/api/member'
export default {
  data() {
    return {
      form: {
        memberID: '',
        profileID: '',
        name: '',
        relationship: '',
        phoneNumber: '',
        address: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getData().then(response => {
        const memberInfo = response.membersInfo[0]
        this.form.memberID = memberInfo.memberID
        this.form.profileID = memberInfo.profileID
        this.form.name = memberInfo.name
        this.form.phoneNumber = memberInfo.phoneNumber
        this.form.relationship = memberInfo.relationship
        this.form.address = memberInfo.address
      })
    },
    onSubmit() {
      const { memberID,
        profileID,
        name,
        relationship,
        phoneNumber,
        address
      } = this.form
      const pData = {
        memberID: memberID,
        profileID: profileID,
        name: name,
        relationship: relationship,
        phoneNumber: phoneNumber,
        address: address
      }
      new Promise((resolve, reject) => {
        postData({ memberInfo: pData }).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
      this.fetchData()
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

