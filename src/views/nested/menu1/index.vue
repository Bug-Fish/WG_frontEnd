<template>
  <div class="app-container">
    <!--表单-->
    <br>

    <el-form :inline="true" class="demo-form-inline">
<!--      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
      <el-row :gutter="1">
        <el-col :span="6"><div class="grid-content bg-purple">&nbsp;</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">
          <el-form-item>
            <el-select v-model="searchObj.month" clearable placeholder="请选择月份">
              <el-option label="一月" value="maskfre_jan"/>
              <el-option label="二月" value="maskfre_feb"/>
              <el-option label="三月" value="maskfre_mar"/>
              <el-option label="四月" value="maskfre_apr"/>
              <el-option label="五月" value="maskfre_may"/>
              <el-option label="一月至五月" value="maskfre_sum"/>
            </el-select>
          </el-form-item>
        </div></el-col>
        <el-col :span="2"><div class="grid-content bg-purple">
          <el-button
            :disabled="btnDisabled"
            type="primary"
            icon="el-icon-search"
            @click="showChart()">查询</el-button>
        </div></el-col>
      </el-row>

<!--      <el-form-item>-->
<!--        <el-date-picker-->
<!--          v-model="searchObj.begin"-->
<!--          type="date"-->
<!--          placeholder="选择开始日期"-->
<!--          value-format="yyyy-MM-dd" />-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-date-picker-->
<!--          v-model="searchObj.end"-->
<!--          type="date"-->
<!--          placeholder="选择截止日期"-->
<!--          value-format="yyyy-MM-dd" />-->
<!--      </el-form-item>-->

    </el-form>
    <div class="chart-container">
      <div id="chart" class="chart" style="height:500px;width:100%" />
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import maskApi from '@/api/mask'
  export default {
    data() {
      return {
        searchObj: {},
        btnDisabled: false,
        chart: null,
        title: '',
        xData: [],
        yData: []
      }
    },
    created() {

    },
    methods: {
      showChart(){
        maskApi.getMask(this.searchObj)
          .then(response=>{
            console.log(response)
            this.xData=response.data.provinceList
            this.yData=response.data.numList
            this.setChart()
          })
      },
//       setChart() {
//         this.initChartData()
//         this.setChart()
//       },
// // 准备图表数据
//       initChartData() {
//       },
// 设置图标参数
      setChart() {
// 基于准备好的dom，初始化echarts实例
        this.chart = echarts.init(document.getElementById('chart'))
// console.log(this.chart)
// 指定图表的配置项和数据
        var option = {
          color: ['#db8d5c'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
  // x轴是类目轴（离散数据）,必须通过data设置类目数据
          xAxis: {
            type: 'category',
            // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data: this.xData,
            axisTick: {
              alignWithLabel: true
            }
          },
// y轴是数据轴（连续数据）
          yAxis: {
            type: 'value'
          },
// 系列列表。每个系列通过 type 决定自己的图表类型
          series: [{
// 系列中的数据内容数组
//             data: [820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 1320,820, 932, 901, 934, 1290, 1330],
// 折线图
            data: this.yData,
            type: 'bar'
          }]
        }
        this.chart.setOption(option)
      }
    }
  }
</script>
