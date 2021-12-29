<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="证件号码">
        <el-input v-model="form.identityNumber" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="姓名拼音">
        <el-input v-model="form.namePinYin" />
      </el-form-item>
      <el-form-item label="现役类型">
        <el-select v-model="form.militaryType" placeholder="please select your zone">
          <el-option label="非军人" value="1" />
          <el-option label="军人" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="政治面貌">
        <el-select v-model="form.politicalStatus" placeholder="please select your zone">
          <el-option label="共青团员" value="1" />
          <el-option label="群众" value="2" />
          <el-option label="共产党员" value="3" />
          <el-option label="其他" value="4" />
        </el-select>
      </el-form-item>
      <el-form-item label="婚姻状态">
        <el-select v-model="form.martialStatus" placeholder="please select your zone">
          <el-option label="已婚" value="1" />
          <el-option label="未婚" value="2" />
          <el-option label="离异" value="3" />
          <el-option label="丧偶" value="4" />
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="form.gender" label=1>男</el-radio>
        <el-radio v-model="form.gender" label=2>女</el-radio>
      </el-form-item>
      <el-form-item label="档案地址">
        <el-row>
          <el-select v-model="form.birthLocationProvince" placeholder="请选择" @change="selectBirthProvince">
            <el-option
              v-for="(item,index) of form.birthLocationProvince_arr"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select v-model="form.birthLocationCity" placeholder="请选择" @change="selectBirthCity">
            <el-option v-for="(item,index) of form.birthLocationCity_arr" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select placeholder="请选择" v-model="form.birthLocationCounty">
            <el-option
              v-for="(item,index) of form.birthLocationCounty_arr"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-row>
      </el-form-item>
      <el-form-item label="档案地址">
        <el-row>
          <el-select v-model="form.nativeLocationProvince" placeholder="请选择" @change="selectNativeProvince">
            <el-option
              v-for="(item,index) of form.nativeLocationProvince_arr"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select v-model="form.nativeLocationCity" placeholder="请选择" @change="selectNativeCity">
            <el-option v-for="(item,index) of form.nativeLocationCity_arr" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select placeholder="请选择" v-model="form.nativeLocationCounty">
            <el-option
              v-for="(item,index) of form.nativeLocationCounty_arr"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getData, postData } from '@/api/base'
import { province } from '@/assets/map'
export default {
  data() {
    return {
      form: {
        identityNumber: '',
        name: '',
        namePinYin: '',
        militaryType: '',
        politicalStatus: '',
        gender: '',
        martialStatus: '',
        birthLocation_arr: [1, 3, 4],
        birthLocationProvince_arr: [],
        birthLocationCity_arr: [],
        birthLocationCounty_arr: [],
        birthLocationProvince: '',
        birthLocationCity: '',
        birthLocationCounty: '',
        nativeLocation_arr: [1, 3, 4],
        nativeLocationProvince_arr: [],
        nativeLocationCity_arr: [],
        nativeLocationCounty_arr: [],
        nativeLocationProvince: '',
        nativeLocationCity: '',
        nativeLocationCounty: '',
        imageID: ''
      }
    }
  },
  created() {
    this.form.birthLocationProvince_arr = province
    this.form.nativeLocationProvince_arr = province
    this.fetchData()
  },
  methods: {
    selectBirthProvince(id) {
      this.form.birthLocationCity_arr = []
      this.form.birthLocationCounty_arr = []
      this.form.birthLocationCity = ''
      this.form.birthLocationCounty = ''
      for (const item of this.form.birthLocationProvince_arr) {
        if (id == item.id) {
          this.form.birthLocationCity_arr = item.children
        }
      }
    },
    selectBirthCity(id) {
      this.form.birthLocationCounty_arr = []
      this.form.birthLocationCounty = ''
      for (const item of this.form.birthLocationCity_arr) {
        if (id == item.id) {
          this.form.birthLocationCounty_arr = item.children
        }
      }
    },
    selectNativeProvince(id) {
      this.form.nativeLocationCity_arr = []
      this.form.nativeLocationCounty_arr = []
      this.form.nativeLocationCity = ''
      this.form.nativeLocationCounty = ''
      for (const item of this.form.nativeLocationProvince_arr) {
        if (id == item.id) {
          this.form.nativeLocationCity_arr = item.children
        }
      }
    },
    selectNativeCity(id) {
      this.form.nativeLocationCounty_arr = []
      this.form.nativeLocationCounty = ''
      for (const item of this.form.nativeLocationCity_arr) {
        if (id == item.id) {
          this.form.nativeLocationCounty_arr = item.children
        }
      }
    },

    fetchData() {
      getData().then(response => {
        const baseInfo = response.stuBasicInfo
        this.form.identityNumber = baseInfo.identityNumber
        this.form.name = baseInfo.name
        this.form.namePinYin = baseInfo.namePinYin
        if (baseInfo.militaryType !== 0) { this.form.militaryType = baseInfo.militaryType.toString() }
        if (baseInfo.politicalStatus !== 0) { this.form.politicalStatus = baseInfo.politicalStatus.toString() }
        if (baseInfo.gender !== 0) { this.form.gender = baseInfo.gender.toString() }
        if (baseInfo.martialStatus !== 0) { this.form.martialStatus = baseInfo.martialStatus.toString() }
        this.form.birthLocationProvince = baseInfo.birthLocationProvince
        this.selectBirthProvince(baseInfo.birthLocationProvince)
        this.form.birthLocationCity = baseInfo.birthLocationCity
        this.selectBirthCity(baseInfo.birthLocationCity)
        this.form.birthLocationCounty = baseInfo.birthLocationCounty
        this.form.nativeLocationProvince = baseInfo.nativeLocationProvince
        this.selectNativeProvince(baseInfo.nativeLocationProvince)
        this.form.nativeLocationCity = baseInfo.nativeLocationCity
        this.selectNativeCity(baseInfo.nativeLocationCity)
        this.form.nativeLocationCounty = baseInfo.nativeLocationCounty
        this.form.imageID = baseInfo.imageID
      })
    },
    onSubmit() {
      const { identityNumber,
        name,
        namePinYin,
        militaryType,
        politicalStatus,
        gender,
        martialStatus,
        birthLocationProvince,
        birthLocationCity,
        birthLocationCounty,
        nativeLocationProvince,
        nativeLocationCity,
        nativeLocationCounty,
        imageID
      } = this.form
      var mt=+militaryType
      var ms=+martialStatus
      var ps=+politicalStatus
      var g=+gender
      var i=+imageID
      const pData = { identityNumber: identityNumber,
        name: name,
        namePinYin: namePinYin,
        militaryType: mt,
        politicalStatus: ps,
        gender: g,
        martialStatus: ms,
        birthLocationProvince: birthLocationProvince,
        birthLocationCity: birthLocationCity,
        birthLocationCounty: birthLocationCounty,
        nativeLocationProvince: nativeLocationProvince,
        nativeLocationCity: nativeLocationCity,
        nativeLocationCounty: nativeLocationCounty,
        imageID: i }
      new Promise((resolve, reject) => {
        postData({ stuBasicInfo: pData }).then(response => {
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

