<template>
  <div class="dashboard-container">
    <div class="dashboard-text">用户: {{ name }}</div>
    <div class="dashboard-text">学校: {{ university }}</div>
    <div class="dashboard-text">专业: {{ major }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'name',
      'university',
      'major',
      'roles'
    ])
  },
  created() {
    this.log()
  },
  methods: {
    log(){
      console.log(1)
      console.log(this.image)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    left: 30%;
    width: 40%;
    top: 100px;
    height: 400px;
    position: absolute;
    background: #c9ced5;
  }
  &-text {
    margin: 60px;
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
