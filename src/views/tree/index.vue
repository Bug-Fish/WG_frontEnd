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
      var map = L.map('map',{
        center: [31.87, 110.55],
        zoom: 5
      });
      const txUrl = 'http://rt{s}.map.gtimg.com/realtimerender?z={z}&x={x}&y={y}&type=vector&style=0';
      const options = {
        subdomains: '0123',
        getUrlArgs: function (tilePoint) {
          return {
            z: tilePoint.z,
            x: tilePoint.x,
            y: Math.pow(2, tilePoint.z) - 1 - tilePoint.y
          };
        }
      };
      //const txLayer = L.tileLayer.webdogTileLayer(txUrl,options).addTo(map);
      const txLayer = L.tileLayer(txUrl,{subdomains: '0123',tms:true}).addTo(map);


      // L.tileLayer(
      //   "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
      //   {
      //     subdomains: ["1", "2", "3", "4"],
      //     attribution: "高德"
      //   }
      // ).addTo(map);

      //esri.basemapLayer("Gray").addTo(map);
      // esri.dynamicMapLayer({
      //   url:"http://localhost:6080/arcgis/rest/services/webgisthree/MapServer",
      //   opacity: 1
      // }).addTo(map);



      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '安徽省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 985, name: '治愈'},
                {value: 6, name: '死亡'},
                {value: 0, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '北京市疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 593, name: '治愈'},
                {value: 9, name: '死亡'},
                {value: 3, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '重庆市疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 579, name: '治愈'},
                {value: 6, name: '死亡'},
                {value: 0, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '福建省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 358, name: '治愈'},
                {value: 1, name: '死亡'},
                {value: 1, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '甘肃省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 139, name: '治愈'},
                {value: 2, name: '死亡'},
                {value: 0, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '广东省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 1596, name: '治愈'},
                {value: 8, name: '死亡'},
                {value: 5, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '广西壮族自治区疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 254, name: '治愈'},
                {value: 2, name: '死亡'},
                {value: 0, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '贵州省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 147, name: '治愈'},
                {value: 2, name: '死亡'},
                {value: 0, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '海南省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 169, name: '治愈'},
                {value: 6, name: '死亡'},
                {value: 1, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '河北省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 328, name: '治愈'},
                {value: 6, name: '死亡'},
                {value: 0, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '河南省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 1276, name: '治愈'},
                {value: 22, name: '死亡'},
                {value: 0, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '黑龙江省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 945, name: '治愈'},
                {value: 13, name: '死亡'},
                {value: 0, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '湖北省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 68135, name: '治愈'},
                {value: 4512, name: '死亡'},
                {value: 3, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '湖南省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 1019, name: '治愈'},
                {value: 4, name: '死亡'},
                {value: 0, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '吉林省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 155, name: '治愈'},
                {value: 2, name: '死亡'},
                {value: 6, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '江苏省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 653, name: '治愈'},
                {value: 0, name: '死亡'},
                {value: 0, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '江西省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 937, name: '治愈'},
                {value: 1, name: '死亡'},
                {value: 0, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '辽宁省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 149, name: '治愈'},
                {value: 2, name: '死亡'},
                {value: 0, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '内蒙古自治区疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 235, name: '治愈'},
                {value: 1, name: '死亡'},
                {value: 25, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '宁夏回族自治区疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 75, name: '治愈'},
                {value: 0, name: '死亡'},
                {value: 0, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '青海省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 18, name: '治愈'},
                {value: 0, name: '死亡'},
                {value: 0, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '山东省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 792, name: '治愈'},
                {value: 7, name: '死亡'},
                {value: 5, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '山西省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 198, name: '治愈'},
                {value: 0, name: '死亡'},
                {value: 0, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '陕西省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 309, name: '治愈'},
                {value: 3, name: '死亡'},
                {value: 1, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '上海市疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 673, name: '治愈'},
                {value: 7, name: '死亡'},
                {value: 5, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '四川省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 577, name: '治愈'},
                {value: 3, name: '死亡'},
                {value: 16, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '天津市疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 192, name: '治愈'},
                {value: 3, name: '死亡'},
                {value: 1, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '西藏藏族自治区疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 1, name: '治愈'},
                {value: 0, name: '死亡'},
                {value: 0, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '新疆维吾尔自治区疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 76, name: '治愈'},
                {value: 3, name: '死亡'},
                {value: 0, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '云南省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 185, name: '治愈'},
                {value: 2, name: '死亡'},
                {value: 0, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '浙江省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 1268, name: '治愈'},
                {value: 1, name: '死亡'},
                {value: 0, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '香港特别行政区疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 1087, name: '治愈'},
                {value: 4, name: '死亡'},
                {value: 46, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '澳门特别行政区疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
            // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 45, name: '治愈'},
                {value: 0, name: '死亡'},
                {value: 0, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        //this.chart.setOption(option)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      })

      var myIcon = L.icon({
        iconUrl: 'src/assets/index_images/navigator1.png',
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
            text: '台湾省疫情概况',
            //subtext: '数据来自新浪微博',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['现有', '治愈', '死亡']
           // data: ['西凉', '益州', '兖州']
          },
          series: [
            {
              type: 'pie',
              radius: '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data: [
                {value: 443, name: '治愈'},
                {value: 7, name: '死亡'},
                {value: 9, name: '现有'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
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
