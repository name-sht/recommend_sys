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
          <el-select v-model="input.university" placeholder="please select">
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
        <el-form-item label="志愿专业">
          <el-select v-model="input.major" placeholder="please select">
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
        <el-form-item label="志愿专业">
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
          location.reload()
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
          location.reload()
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

<style scoped>
.line{
  text-align: center;
}
</style>
