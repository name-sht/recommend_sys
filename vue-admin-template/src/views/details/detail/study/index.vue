<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="学校名称">
        <el-input v-model="form.schoolName" />
      </el-form-item>
      <el-form-item label="学术论文或著作">
        <el-input v-model="form.writing" type="textarea" />
      </el-form-item>
      <div class="text">学习与工作经历:</div>
      <el-form-item label="起止年月">
        <el-input v-model="form.interval0" />
      </el-form-item>
      <el-form-item label="学习或工作单位">
        <el-input v-model="form.workPlace0" />
      </el-form-item>
      <el-form-item label="起止年月">
        <el-input v-model="form.interval1" />
      </el-form-item>
      <el-form-item label="学习或工作单位">
        <el-input v-model="form.workPlace1" />
      </el-form-item>
      <el-form-item label="起止年月">
        <el-input v-model="form.interval2" />
      </el-form-item>
      <el-form-item label="学习或工作单位">
        <el-input v-model="form.workPlace2" />
      </el-form-item>
      <el-form-item label="起止年月">
        <el-input v-model="form.interval3" />
      </el-form-item>
      <el-form-item label="学习或工作单位">
        <el-input v-model="form.workPlace3" />
      </el-form-item>
      <el-form-item label="奖励或处分">
        <el-input v-model="form.awardPunishment" type="textarea" />
      </el-form-item>
      <el-form-item label="作弊情况">
        <el-input v-model="form.cheating" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getData, postData, getWork, postWork } from '@/api/study'

export default {
  data() {
    return {
      form: {
        name: '',
        schoolName: '',
        writing: '',
        awardPunishment: '',
        cheating: '',
        experienceID0: '',
        interval0: '',
        workPlace0: '',
        experienceID1: '',
        interval1: '',
        workPlace1: '',
        experienceID2: '',
        interval2: '',
        workPlace2: '',
        experienceID3: '',
        interval3: '',
        workPlace3: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getData().then(response => {
        const studyInfo = response.studyInfo
        this.form.schoolName = studyInfo.schoolName
        this.form.writing = studyInfo.writing
        this.form.awardPunishment = studyInfo.awardPunishment
        this.form.cheating = studyInfo.cheating
      })
      getWork().then(response => {
        const experienceInfo = response.experiencesInfo
        console.log(experienceInfo)
        this.form.interval0 = experienceInfo[0].interval
        this.form.workPlace0 = experienceInfo[0].work_place
        this.form.experienceID0 = experienceInfo[0].experienceID
        this.form.interval1 = experienceInfo[1].interval
        this.form.workPlace1 = experienceInfo[1].work_place
        this.form.experienceID1 = experienceInfo[1].experienceID
        this.form.interval2 = experienceInfo[2].interval
        this.form.workPlace2 = experienceInfo[2].work_place
        this.form.experienceID2 = experienceInfo[2].experienceID
        this.form.interval3 = experienceInfo[3].interval
        this.form.workPlace3 = experienceInfo[3].work_place
        this.form.experienceID3 = experienceInfo[3].experienceID
      })
    },
    onSubmit() {
      const {schoolName,
        writing,
        awardPunishment,
        cheating,
        experienceID0,
        interval0,
        workPlace0,
        experienceID1,
        interval1,
        workPlace1,
        experienceID2,
        interval2,
        workPlace2,
        experienceID3,
        interval3,
        workPlace3
      } = this.form
      const sData = { schoolName: schoolName,
        writing: writing,
        awardPunishment: awardPunishment,
        cheating: cheating }
      const wData = [
        { experienceID: experienceID0,
          interval: interval0,
          workPlace: workPlace0
        },
        { experienceID: experienceID1,
          interval: interval1,
          workPlace: workPlace1
        },
        { experienceID: experienceID2,
          interval: interval2,
          workPlace: workPlace2
        },
        { experienceID: experienceID3,
          interval: interval3,
          workPlace: workPlace3
        }
      ]
      new Promise((resolve, reject) => {
        postData({ studyInfo: sData }).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      new Promise((resolve, reject) => {
        postWork({ experiencesInfo: wData[0] }).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      new Promise((resolve, reject) => {
        postWork({ experiencesInfo: wData[1] }).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      new Promise((resolve, reject) => {
        postWork({ experiencesInfo: wData[2] }).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      new Promise((resolve, reject) => {
        postWork({ experiencesInfo: wData[3] }).then(response => {
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

