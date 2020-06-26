<template>
  <div class="app-container">
<!--    表格可视化-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="genQuery.provinceName" placeholder="请输入地区"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="genQuery.now" clearable placeholder="现有确诊/人">
          <el-option :value="1" label=">=1"/>
          <el-option :value="5" label=">=5"/>
          <el-option :value="10" label=">=10"/>
          <el-option :value="20" label=">=20"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="genQuery.sum" clearable placeholder="累计确诊/人">
          <el-option :value="50" label=">=50"/>
          <el-option :value="100" label=">=100"/>
          <el-option :value="500" label=">=500"/>
          <el-option :value="1000" label=">=1000"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="genQuery.cue" clearable placeholder="累计治愈/人">
          <el-option :value="50" label=">=50"/>
          <el-option :value="100" label=">=100"/>
          <el-option :value="500" label=">=500"/>
          <el-option :value="1000" label=">=1000"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="genQuery.dead" clearable placeholder="累计死亡/人">
          <el-option :value="1" label=">=1"/>
          <el-option :value="3" label=">=3"/>
          <el-option :value="5" label=">=5"/>
          <el-option :value="1000" label=">=1000"/>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="添加时间">-->
<!--        <el-date-picker-->
<!--          v-model="searchObj.begin"-->
<!--          type="datetime"-->
<!--          placeholder="选择开始时间"-->
<!--          value-format="yyyy-MM-dd HH:mm:ss"-->
<!--          default-time="00:00:00"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-date-picker-->
<!--          v-model="searchObj.end"-->
<!--          type="datetime"-->
<!--          placeholder="选择截止时间"-->
<!--          value-format="yyyy-MM-dd HH:mm:ss"-->
<!--          default-time="00:00:00"-->
<!--        />-->
<!--      </el-form-item>-->
      <br>
      <el-row justify="end">
        <el-col :span="2" :offset="17"><div class="grid-content bg-purple"><el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button></div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple-light"><el-button type="default" @click="resetData()">清空</el-button></div></el-col>
      </el-row>
<!--      <div>-->
<!--        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->

<!--        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->

<!--      </div>-->
      <br>
    </el-form>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="provinceName"
        label="地区"
        width="150">
      </el-table-column>
      <el-table-column
        prop="now"
        label="现有确诊/人"
        width="150">
      </el-table-column>
      <el-table-column
        prop="sum"
        label="累计确诊/人"
        width="150">
      </el-table-column>
      <el-table-column
        prop="cue"
        label="累计治愈/人"
        width="150">
      </el-table-column>
      <el-table-column
        prop="dead"
        label="累计死亡/人"
        width="150">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        >
      </el-table-column>

<!--      <el-table-column prop="address" label="操作">-->
<!--        <template slot-scope="scope">-->
<!--          <router-link to="'/table/edit/'+scope.row.id">-->
<!--            <el-button type="primary" plain><i class="el-icon-edit"></i>修改</el-button>-->
<!--          </router-link>-->
<!--        </template>-->
<!--      </el-table-column>-->


<!--      <el-table-column-->
<!--        prop=""-->
<!--        label="操作"-->
<!--        <el-button type="primary" round>主要按钮</el-button>-->
<!--        width="180">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="address"-->
<!--        label="地址">-->
<!--      </el-table-column>-->
    </el-table>

    <!--分页-->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total,prev,pager,next,jumper"
      @current-change="getList"
    />

  </div>
</template>

<script>
  import {getCity} from '@/api/table'
  //import { getList } from '@/api/table'
  //import { getList } from '../../api/map'
  import table from '@/api/table'
  export default {
    data(){//定义变量和初始变量
      return{
        list:null,
        page:1,
        limit:8,
        genQuery:{
          provinceName:"",
          cue:"",
          dead:"",
          now:"",
          sum:""
        },
        total:5
      }
    },
    created() {
      this.getList()
    },
    methods:{
      getList(page=1){
        this.page=page
        table.getCity(this.page,this.limit,this.genQuery)
        .then(response=>{
          this.list=response.data.record
          this.total=response.data.total
          console.log(this.list)
        })
        .catch(error=>{
          console.log(error)
        })
      },
      resetData(){
        this.genQuery={}
        this.getList()
      }
    }

  }
</script>
<!--<template>-->
<!--  <div class="app-container">-->
<!--    <el-table-->
<!--      v-loading="listLoading"-->
<!--      :data="list"-->
<!--      element-loading-text="Loading"-->
<!--      border-->
<!--      fit-->
<!--      highlight-current-row>-->
<!--      <el-table-column align="center" label="ID" width="95">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.$index }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="Title">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.row.title }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="Author" width="110" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ scope.row.author }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="Pageviews" width="110" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.row.pageviews }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column class-name="status-col" label="Status" width="110" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column align="center" prop="created_at" label="Display_time" width="200">-->
<!--        <template slot-scope="scope">-->
<!--          <i class="el-icon-time"/>-->
<!--          <span>{{ scope.row.display_time }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { getList } from '@/api/table'-->

<!--export default {-->
<!--  filters: {-->
<!--    statusFilter(status) {-->
<!--      const statusMap = {-->
<!--        published: 'success',-->
<!--        draft: 'gray',-->
<!--        deleted: 'danger'-->
<!--      }-->
<!--      return statusMap[status]-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      list: null,-->
<!--      listLoading: true-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    this.fetchData()-->
<!--  },-->
<!--  methods: {-->
<!--    fetchData() {-->
<!--      this.listLoading = true-->
<!--      getList(this.listQuery).then(response => {-->
<!--        this.list = response.data.items-->
<!--        this.listLoading = false-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
