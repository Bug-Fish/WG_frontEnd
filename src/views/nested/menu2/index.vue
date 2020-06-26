<template>
  <div id="map"></div>
</template>

<script>
  import * as L from 'leaflet'
  import echarts from 'echarts'
  import senApi from '@/api/sen'
  var esri = require('esri-leaflet')
  //Vue.L = Vue.prototype.$L = L

  var map;
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        //  province:['安徽','北京','重庆','福建','甘肃','广东','广西','贵州','海南','河北','河南','黑龙江','湖北',
        //    '湖南','吉林','江苏','江西','辽宁','内蒙古','宁夏','青海','山东','山西','陕西','上海','四川','天津','西藏','新疆','云南','浙江','香港','澳门','台湾'],
        // addValue:'match'
        // province:[{id:"1",text:"安徽"},
        //           {id:"2",text:"安徽"},
        //           {id:"3",text:"安徽"},
        //   {id:"4",text:"安徽"},
        //   {id:"5",text:"安徽"},
        //   {id:"6",text:"安徽"}]
        Data: []
      }
    },
    created() {
      senApi.getSen()
        .then(response=>{
          this.Data=response.data.all
          console.log(this.Data)

          // this.yData=response.data.numList
          // this.setChart()
        })
    },
    mounted() {
      map = L.map('map',{
        center: [31.87, 110.55],
        zoom: 5
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
      //   url:"http://localhost:6080/arcgis/rest/services/webgisthree/MapServer",
      //   opacity: 1
      // }).addTo(map);



      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([31.52,117.17], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '安徽人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [29.73,39.7,59.16,17.72,9.85],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([40.55,116.24], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '北京人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [37.79,57.84,67.95,53.68,33.84],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([29.59 ,106.54], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '重庆人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [27.37,46.22,60.44,24.48,23.73],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([26.05 ,119.18], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '福建人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [10.74,14.34,21.37,6.8,3.57],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([36.04 ,103.51], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '甘肃人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [4.17,5.58,8.24,2.08,1.37],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([23.08 ,113.14], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '广东人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [47.89,63.97,95.06,29.07,15.88],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([22.48 ,108.19], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '广西人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [7.62,10.18,15.14,4.38,2.52],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([26.35 ,106.42], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '贵州人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [4.41,5.9,8.72,2.24,1.45],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([20.02 ,110.20], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '海南人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [5.07,6.83,9.78,1.27,1.63],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([38.02 ,114.30], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '河北人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [9.84,13.18,19.38,4.46,3.22],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([34.46 ,113.40], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '河南人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [38.28,51.26,75.46,17.82,12.54],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([46.44 ,126.36], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '黑龙江人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [28.35,37.93,56.05,14.35,9.32],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([30.35 ,114.17], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '湖北人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [84.05,90.55,100,96.53,66.23],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([28.12 ,112.59], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '湖南人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [30.57,40.8,60.94,18.98,10.15],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([43.54 ,125.19], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '吉林人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [4.65,6.28,8.84,2.34,1.53],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([32.03 ,118.46], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '江苏人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [19.59,26.12,39.18,13.06,6.53],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([28.40 ,115.55], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '江西人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [28.11,37.49,56.17,18.39,9.36],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([41.48 ,123.25], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '辽宁人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [4.47,5.98,8.84,2.28,1.47],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([40.48 ,111.41], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '内蒙古人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [7.05,9.66,12.55,4.1,2.34],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([38.27 ,106.16], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '宁夏人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [2.25,3,4.5,1.5,0.75],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([36.38 ,101.48], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '青海人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [0.54,0.72,1.08,0.36,0.18],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([36.40 ,117.00], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '山东人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [23.76,31.8,46.87,13.34,7.85],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([37.54 ,112.33], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '山西人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [5.94,7.92,11.88,3.96,1.98],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([34.17 ,108.57], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '陕西人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [9.27,12.4,18.33,5.12,3.06],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([31.14 ,121.29], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '上海人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [20.2,57.04,69.73,40.96,24.66],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([30.40 ,104.04], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '四川人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [17.33,23.27,33.51,10.33,5.74],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([39.02 ,117.12], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '天津人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [25.76,37.72,51.31,52.78,31.89],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([29.39 ,91.08], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '西藏人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [0.3,0.4,2.96,1.92,0],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([43.45 ,87.36], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '新疆人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [2.28,3.07,4.41,0.47,0.73],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([25.04 ,102.42], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '云南人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [5.55,7.42,11,3,1.83],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([30.16 ,120.10], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '浙江人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [38.04,50.73,76.03,25.01,12.67],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([22.35 ,114.15], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '香港人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [32.64,63.98,72.26,79.88,50.83],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([22.15 ,113.5], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '澳门人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [9.35,51.8,52.7,30.9,13.45],
            type: 'line',
            smooth: true
          }]
        }
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator.png',
        iconSize: [20, 40],
        // iconAnchor: [22, 94],
        // popupAnchor: [-13, -76],
        // //shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      var marker =L.marker([25.03 ,121.30], {icon: myIcon}).addTo(map);
      var content = '<div style="width: 300px; height: 300px;" id="marker"></div>';
      marker.bindPopup(content, {});
      marker.on('popupopen', function(e) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('marker'));
        var option = {
          title: {
            text: '台湾人民疫情忧虑指数变化',
            subtext: '数据来自官方微博及加权回归拟合',
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
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
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
            data: [23.3,67.88,65.69,63.32,14.36],
            type: 'line',
            smooth: true
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
