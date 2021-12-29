<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="档案地址">
        <el-row>
          <el-select v-model="form.profile_location_province" placeholder="请选择" @change="selectProfileProvince">
            <el-option
              v-for="(item,index) of form.profile_location_province_arr"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select v-model="form.profile_location_city" placeholder="请选择" @change="selectProfileCity">
            <el-option v-for="(item,index) of form.profile_location_city_arr" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select placeholder="请选择" v-model="form.profile_location_region">
            <el-option
              v-for="(item,index) of form.profile_location_region_arr"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-row>
      </el-form-item>
      <el-form-item label="档案详细地址">
        <el-input v-model="form.profile_address" />
      </el-form-item>
      <el-form-item label="邮政编码">
        <el-input v-model="form.post_code" />
      </el-form-item>
      <el-form-item label="户籍地址">
        <el-row>
          <el-select v-model="form.residence_location_province" placeholder="请选择" @change="selectResidenceProvince">
            <el-option
              v-for="(item,index) of form.residence_location_province_arr"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select v-model="form.residence_location_city" placeholder="请选择" @change="selectResidenceCity">
            <el-option v-for="(item,index) of form.residence_location_city_arr" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select placeholder="请选择" v-model="form.residence_location_region">
            <el-option
              v-for="(item,index) of form.residence_location_region_arr"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-row>
      </el-form-item>

      <el-form-item label="户口详细地址">
        <el-input v-model="form.residence_address" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getData, postData } from '@/api/profile'
import { province } from '@/assets/map'
export default {
  data() {
    return {
      form: {
        profile_location_arr: [1, 3, 4],
        profile_location_province_arr: [],
        profile_location_city_arr: [],
        profile_location_region_arr: [],
        profile_location_province: '',
        profile_location_city: '',
        profile_location_region: '',
        profile_address: '',
        post_code: '',
        residence_location_arr: [1, 3, 4],
        residence_location_province_arr: [],
        residence_location_city_arr: [],
        residence_location_region_arr: [],
        residence_location_province: '',
        residence_location_city: '',
        residence_location_region: '',
        residence_address: ''
      }
    }
  },
  created() {
    this.form.profile_location_province_arr = province
    this.form.residence_location_province_arr = province
    this.fetchData()
  },
  methods: {
    selectProfileProvince(id) {
      this.form.profile_location_city_arr = []
      this.form.profile_location_region_arr = []
      this.form.profile_location_city = ''
      this.form.profile_location_region = ''
      for (const item of this.form.profile_location_province_arr) {
        if (id == item.id) {
          this.form.profile_location_city_arr = item.children
        }
      }
    },
    selectProfileCity(id) {
      this.form.profile_location_region_arr = []
      this.form.profile_location_region = ''
      for (const item of this.form.profile_location_city_arr) {
        if (id == item.id) {
          this.form.profile_location_region_arr = item.children
        }
      }
    },
    selectResidenceProvince(id) {
      this.form.residence_location_city_arr = []
      this.form.residence_location_region_arr = []
      this.form.residence_location_city = ''
      this.form.residence_location_region = ''
      for (const item of this.form.residence_location_province_arr) {
        if (id == item.id) {
          this.form.residence_location_city_arr = item.children
        }
      }
    },
    selectResidenceCity(id) {
      this.form.residence_location_region_arr = []
      this.form.residence_location_region = ''
      for (const item of this.form.residence_location_city_arr) {
        if (id == item.id) {
          this.form.residence_location_region_arr = item.children
        }
      }
    },
    fetchData() {
      getData().then(response => {
        const profileInfo = response.profileInfo
        this.form.profile_location_province = profileInfo.profileLocationProvince
        this.selectProfileProvince(profileInfo.profileLocationProvince)
        this.form.profile_location_city = profileInfo.profileLocationCity
        this.selectProfileCity(profileInfo.profileLocationCity)
        this.form.profile_location_region = profileInfo.profileLocationCounty
        this.form.profile_address = profileInfo.profileAddress
        this.form.post_code = profileInfo.postCode
        this.form.residence_location_province = profileInfo.residenceLocationProvince
        this.selectResidenceProvince(profileInfo.residenceLocationProvince)
        this.form.residence_location_city = profileInfo.residenceLocationCity
        this.selectResidenceCity(profileInfo.residenceLocationCity)
        this.form.residence_location_region = profileInfo.residenceLocationCounty
        this.form.residence_address = profileInfo.residenceAddress
      })
    },
    onSubmit() {
      const { profile_location_province,
        profile_location_city,
        profile_location_region,
        profile_address,
        post_code,
        residence_location_province,
        residence_location_city,
        residence_location_region,
        residence_address } = this.form
      const pData = { profileLocationProvince: profile_location_province,
        profileLocationCity: profile_location_city,
        profileLocationCounty: profile_location_region,
        profileAddress: profile_address,
        postCode: post_code,
        residenceLocationProvince: residence_location_province,
        residenceLocationCity: residence_location_city,
        residenceLocationCounty: residence_location_region,
        residenceAddress: residence_address }
      new Promise((resolve, reject) => {
        postData({ profileInfo: pData }).then(response => {
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

