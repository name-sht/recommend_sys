<template>
  <div class="app-container">
    <div v-if="rows >= 3">
      志愿数已达上限
    </div>
    <div v-else>
      <el-button class="btnAdd" type="primary" @click="dialogVisible = true">新增志愿</el-button>
    </div>
    <el-dialog title="新增志愿" :visible.sync="dialogVisible" width="35%">
      <el-form label-width="90px" :label-position="left">
        <el-form-item label="志愿学校">
          <el-input v-model="input.university"></el-input>
        </el-form-item>
        <el-form-item label="志愿专业">
          <el-input v-model="input.major"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false;branchAdd()">确 定</el-button>
      </span>
    </el-dialog>

    <el-table v-loading="loading" :data="trData" stripe style="width: 100%">
      <el-table-column label="平行志愿顺序" type="index" width="100"></el-table-column>
      <el-table-column prop="university" label="志愿学校" ></el-table-column>
      <el-table-column prop="major" label="志愿专业" ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <div v-if="props.row.isAdmitted === 1">
            已被录取</div>
          <div v-else>
            <el-button type="primary" @click="changeBranch = true;selectid(props.row.applicationID)" size="mini">修改</el-button>
            <el-button @click="remove(props.row.applicationID)" title="删除" type="danger" size="mini">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改志愿信息：" :visible.sync="changeBranch" width="35%">
      <el-form label-width="90px" :label-position="left">
        <el-form-item label="志愿学校">
          <el-input v-model="form.university" class="inputId"></el-input>
        </el-form-item>
        <el-form-item label="志愿专业">
          <el-input v-model="form.major" class="inputName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeBranch = false">取 消</el-button>
        <el-button type="primary" @click="changeBranch = false;branchchange()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getData, postData, putData, deleteData } from '@/api/wish'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      dialogVisible: false,
      changeBranch: false,
      input: {
        university: '',
        major: ''
      },
      form: {
        id: '',
        university: '',
        major: ''
      },
      trData: []
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'university',
      'major'
    ]),
    rows() {
      return this.trData.length
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
    branchAdd() {
      const { university, major } = this.input
      const pData = {
        university: university,
        major: major
      }
      new Promise((resolve, reject) => {
        putData({ stuApplication: pData }).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      this.$message('create!')
      this.fetchData()
    },
    remove(id) {
      new Promise((resolve, reject) => {
        deleteData({ applicationID: id }).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
      this.$message('delete!')
      this.fetchData()
    },
    selectid(id) {
      this.form.id = id
    },
    branchchange() {
      const { university, major, id } = this.form
      const pData = {
        applicationID: id,
        university: university,
        major: major
      }
      new Promise((resolve, reject) => {
        postData({ stuApplication: pData }).then(response => {
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

<style scoped>
.line{
  text-align: center;
}
</style>
