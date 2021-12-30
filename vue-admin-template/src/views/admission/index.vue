<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="trData" stripe style="width: 100%">
      <el-table-column prop="university" label="志愿学校" />
      <el-table-column prop="major" label="志愿专业" />
      <el-table-column label="录取状态">
        <template slot-scope="props">
          <div v-if="props.row.isAdmitted === 1">
            已录取</div>
          <div v-else>
            待录取</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <div v-if="props.row.isAdmitted === 0">
            尚未录取</div>
          <div v-else-if="props.row.isConfirmed === 1">
            已接受录取</div>
          <div v-else-if="get_admit===true">
            已接受其他志愿</div>
          <div v-else>
            <el-button type="primary" size="mini" @click="admitted(props.row.applicationID)">接受</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getData, postData } from '@/api/admission'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'name',
      'university',
      'major'
    ]),
    get_admit() {
      const c = this.trData.map(
        row => row.isConfirmed).reduce(
        (acc, cur) => (cur + acc), 0
      )
      console.log(c)
      return c === 1
    }
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
      const pData = this.name
      getData(pData).then(response => {
        this.trData = response.stuApplication
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
    },
    hidden({ row, rowIndex }) {
      if (row.isAdmitted === 0) {
        return 'hid'
      }
      return ''
    }
  }
}
</script>
