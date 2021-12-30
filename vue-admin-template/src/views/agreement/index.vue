<template>
  <div class="app-container">
    <div class="app-title"> 2021年推免生系统通知 </div>
    <div class="app-thing0">
      (一)推免生如对系统自动填入的基本学籍（学历）信息有疑问，请尽快向就读高校的学籍管理部门咨询。<br>
      (二)推免生选择报考志愿时，应符合研究生报名条件和招生单位提出的学业要求，并按招生单位要求提供相关材料。<br>
      (三)推免生通过系统接受招生单位发放的待录取通知后，如拟取消，应在遵守推免政策规定的基础上，向相关招生单位提出申请，招生单位如同意，可通过系统取消待录取通知，并由推免生通过系统予以确认。相关待录取取消后, 推免生可接受其他单位的复试、待录取通知。<br>
      (四)招生单位可通过系统查询报考该单位所有推免生的当前报考状态，即者考生接收的所有复试通知或待录取通知<br>
      (五)为顺利完成报名和录取工作，请推免生认真了解系统各项提示信息，及时登录系统查看招生单位发送的复试通知和待录取通知，并与招生单位保持密切联系。<br>
      (六)推免生不进行现场确认，以"推免服务系统"最终报考录最取信息为准。推免生因填写信息虚假、错误造成的后果由本人承担。<br>
      (七)10月25日前未落实接收单位的推免生不再保留推免生资格，仍可报名参加全国硕士研究生招生考试。已被招生单位拟录取的推免生，不得再报名参加全国硕士研究生招生考试，否则取消其推免录取资格。<br>
      (八)凡是违反政策、弄虚作假的，不论何时，一经查实，一律取消推免生资格，并按照《国家教育考试违规处理办法》等有关规定严肃处理。 "推免服务系统"提供代收推免报名费服务，推免生对报名费如口有疑问，请咨询推荐高校所在省教育招生考试<br>
    </div>
    <el-button v-if="this.form.hasAgreedNotice===0" type="primary" @click="onSubmit1">知情</el-button>
    <div class="else" v-else :disabled="true">
      <el-button> 已知情</el-button>
    </div>
    <div class="space"><br></div>
    <div class="app-title"> 2021年推免生报名诚信承诺书 </div>
    <div class="app-thing">我是参加2021年全国硕士研究生招生的推免生，
    我已了解《教育部办公厅关于进一步完善推荐优秀应届本科毕业 (教学厅(2014)5号)、《2021年全国硕士研究生招生工作管理规定》 生免试攻读研究生工作的通知》 (教学[2020]6号）
    以及《国家教育考试违规处理办法》 (教育部令第33号）等相关规定，
    为维护推免招生工作的严肃性和公平性，保障自身合法权益，
    我郑重承诺以下事项:<br>
    1.网上报名时所提交的报名信息及相关材料真实、准确。如有虚假、错误信息和弄虚作假行为，本人承担由此造成的一切后果。<br>
    2.在推免生選选及复试中诚实守信，自觉遵守考试纪律和考场规则。
    如有违纪、违规行为，将接受推荐高校、招生单位及相关教育招生考试机构根据国家有关规定所作出的处罚。
      如有违法行为，将接受国家相关法律法规的惩罚。<br></div>
        <el-button v-if="this.form.hasAgreedHonest===0" type="primary" @click="onSubmit">知情同意</el-button>
        <div class="else" v-else disabled="true">
          <el-button> 已同意</el-button>
        </div>
  </div>
</template>

<script>
import { getData, postData } from '@/api/agreement'
export default {
  data() {
    return {
      form: {
        hasAgreedNotice: 0,
        hasAgreedHonest: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getData().then(response => {
        const baseInfo = response.agreement
        this.form.hasAgreedHonest = baseInfo.hasAgreedHonest
        this.form.hasAgreedNotice = baseInfo.hasAgreedNotice
      })
    },
    onSubmit() {
      const { hasAgreedNotice } = this.form
      const pData = { hasAgreedHonest: 1,
        hasAgreedNotice: hasAgreedNotice
      }
      new Promise((resolve, reject) => {
        postData({ agreement: pData }).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      this.fetchData()
      this.$message('submit!')
    },
    onSubmit1() {
      const { hasAgreedHonest } = this.form
      const pData = { hasAgreedHonest: hasAgreedHonest,
        hasAgreedNotice: 1
      }
      new Promise((resolve, reject) => {
        postData({ agreement: pData }).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      this.fetchData()
      this.$message('submit!')
    }
  }
}
</script>

<style lang="scss" scoped>
.app{
  &-container {
    margin-top: 5%;
    margin-left: 15%;
    margin-right: 15%;
    background: #dde1e7;
  }
  &-title{
    text-align: center;
  }
  &-thing{
    text-align: justify;
    text-indent: 33px;
  }
  &-thing0{
    text-align: justify;
  }
}
</style>

