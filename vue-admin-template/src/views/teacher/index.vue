<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="trData" stripe style="width: 100%" row-class-name="hidden">
      <el-table-column label="序号" type="index" width="100"></el-table-column>
      <el-table-column prop="username" label="学生姓名" ></el-table-column>
      <el-table-column prop="originalUniversity" label="推荐单位" ></el-table-column>
      <el-table-column prop="originalMajor" label="本科专业" ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <div v-if="props.row.isAdmitted === 1">
            已录取</div>
          <div v-else>
            <el-button type="primary" @click=admitted(props.row.applicationID) size="mini">录取</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getData, postData } from '@/api/teacher'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'name',
      'university',
      'major'
    ])
  },
  data() {
    return {
      trData: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const unv = this.university
      const maj = this.major
      const pData = { university: unv, major: maj }
      getData(pData).then(response => {
        this.trData = response.teaApplication
      })
    },
    admitted(id) {
      new Promise((resolve, reject) => {
        postData({ applicationID: id }).then(response => {
          location.reload()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      this.$message('change!')
      this.fetchData()
    }
  }
}
</script>
