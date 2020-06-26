<template>
  <div id="map"></div>
</template>

<script>
  import * as L from 'leaflet'
  import echarts from 'echarts'
  var esri = require('esri-leaflet')
  //Vue.L = Vue.prototype.$L = L

  var map;
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted() {
      map = L.map('map',{
        center: [31.87, 110.55],
        zoom: 6
      });
      L.tileLayer(
        "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        {
          subdomains: ["1", "2", "3", "4"],
          attribution: "高德"
        }
      ).addTo(map);

      //esri.basemapLayer("Gray").addTo(map);
      // esri.dynamicMapLayer({
      //   url:"http://localhost:6080/arcgis/rest/services/webgisfour/MapServer",
      //   opacity: 1
      // }).addTo(map);


      var marker = L.marker([30.598964,114.311011]).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '武汉市疫情概况',
            subtext: '数据来自官方微博',
            left: 'center',
            align: 'right'
          },
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
            data: ['确诊', '死亡', '治愈'],
            //data: this.xData,
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
             data: [50340,3869,46471],
            // 折线图
            //data: this.yData,
            type: 'bar'
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    })

      var marker1 = L.marker([39.915351,116.403613]).addTo(map);
      var content1 = '<div style="width: 300px; height: 300px;" id="marker1"></div>';
      marker1.bindPopup(content1, {});
      marker1.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('marker1'));
        var option1 = {
          title: {
            text: '北京市疫情概况',
            subtext: '数据来自官方微博',
            left: 'center',
            align: 'right'
          },
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
            data: ['确诊', '死亡', '治愈'],
            //data: this.xData,
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
            data: [700,9,584],
            // 折线图
            //data: this.yData,
            type: 'bar'
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option1);
      })

      var marker = L.marker([31.222095,121.477665]).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '上海市疫情概况',
            subtext: '数据来自官方微博',
            left: 'center',
            align: 'right'
          },
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
            data: ['确诊', '死亡', '治愈'],
            //data: this.xData,
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
            data: [695,7, 667],
            // 折线图
            //data: this.yData,
            type: 'bar'
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var marker = L.marker([23.134273,113.26798]).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '广州市疫情概况',
            subtext: '数据来自官方微博',
            left: 'center',
            align: 'right'
          },
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
            data: ['确诊', '死亡', '治愈'],
            //data: this.xData,
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
            data: [544,1,515],
            // 折线图
            //data: this.yData,
            type: 'bar'
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })


      var marker = L.marker([22.412849,114.148755]).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '香港特区疫情概况',
            subtext: '数据来自官方微博',
            left: 'center',
            align: 'right'
          },
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
            data: ['确诊', '死亡', '治愈'],
            //data: this.xData,
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
            data: [1112,4,1067],
            // 折线图
            //data: this.yData,
            type: 'bar'
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var marker = L.marker([30.703279,104.080794]).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '成都市疫情概况',
            subtext: '数据来自官方微博',
            left: 'center',
            align: 'right'
          },
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
            data: ['确诊', '死亡', '治愈'],
            //data: this.xData,
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
            data: [588, 3, 564],
            // 折线图
            //data: this.yData,
            type: 'bar'
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var marker = L.marker([29.558943,106.552688]).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '重庆市疫情概况',
            subtext: '数据来自官方微博',
            left: 'center',
            align: 'right'
          },
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
            data: ['确诊', '死亡', '治愈'],
            //data: this.xData,
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
            data: [582,6, 573],
            // 折线图
            //data: this.yData,
            type: 'bar'
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })


    }
  }
</script>


<style scoped>
  #map {
    width: 100%;
    height: calc(100vh);
  }
</style>
