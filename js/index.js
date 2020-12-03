// 数据传输
$(function () {
    // 柱状图1
    //实例化对象
    var myChart1 = echarts.init(document.querySelector('.bar .chart'));
    //指定配置项和数据
    var option1 = {
        //修改图表颜色
        color: ['#2f89cf'],
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        //修改图表的大小
        grid: {
            left: '0%',
            top: '10px',
            right: '0%',
            bottom: '4%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: [],
            axisTick: {
                alignWithLabel: true,
                show: false,
            },
            //修改标签刻度的相关样式
            axisLabel: {
                color: "rgba(255,255,255,.6)",
                fontSize: "12",
            },
            //不显示X坐标轴
            axisLine: {
                show: false,
            }
        }],
        yAxis: [{
            type: 'value',
            //修改标签刻度的相关样式
            axisLabel: {
                color: "rgba(255,255,255,.6)",
                fontSize: "12",
            },
            //修改线条的颜色
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)",
                    width: 1,
                }
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)",
                    width: 1,
                }
            }
        }],
        series: [{
            name: '当天用电量',
            type: 'bar',
            barWidth: '35%',
            data: [0.2, 0.2, 0.3, 0.1, 0.6, 0.5, 0.5],
            itemStyle: {
                // 修改柱子圆角
                barBorderRadius: 5
            }
        }]
    };
    //把配置项给实例对象
    myChart1.setOption(option1);
    //让图表跟随屏幕自动的去适应
    window.addEventListener('resize', function () {
        myChart1.resize();
    })

    // 折线图1
    //实例化对象
    var myChart2 = echarts.init(document.querySelector('.line .chart'));
    var option2 = {
        //通过color修改两条线的颜色
        color: ['#00f2f1', '#ed3f35', '#660099', '#ff9933', '#ffde33', '#009966'],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            // series如果有name值，则此处可以不写data值
            textStyle: {
                //修改图例组件的文字颜色
                color: "#4c9bfd",
            },
            // 10% 必须加引号
            right: "14%",
            // padding: 3,
            // itemGap: 3,
            itemWidth: 15,
            itemHeight: 8,
        },
        grid: {
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            show: true, //显示边框
            borderColor: '#012f4a',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            // 不显示刻度
            axisTick: {
                show: false
            },
            // 刻度标签颜色
            axisLabel: {
                color: "#4c9bfd"
            },
            axisLine: {
                show: false,
            }
        },
        yAxis: {
            type: 'value',
            // 不显示刻度
            scale: 'true',
            axisTick: {
                show: false
            },
            // 刻度标签颜色
            axisLabel: {
                color: "#4c9bfd"
            },
            axisLine: {
                show: true,
            },
            splitLine: {
                lineStyle: {
                    color: '#012f4a' // 分割线颜色
                }
            }
        },
        series: [{
                name: '1号电压表',
                type: 'line',
                smooth: true,
                data: [215, 220, 225, 220, 215, 218, 223, 221, 217, 220, 222, 218]
            },
            {
                name: '2号电压表',
                type: 'line',
                smooth: true,
                data: [225, 220, 215, 220, 222, 224, 219, 224, 225, 222, 218, 219]
            },
            {
                name: '3号电压表',
                type: 'line',
                smooth: true,
                data: []
            },
            {
                name: '4号电压表',
                type: 'line',
                smooth: true,
                data: []
            },
            {
                name: '5号电压表',
                type: 'line',
                smooth: true,
                data: []
            },
            {
                name: '6号电压表',
                type: 'line',
                smooth: true,
                data: []
            }
        ]
    };
    //把配置项给实例对象
    myChart2.setOption(option2);
    //让图表跟随屏幕自动的去适应
    window.addEventListener('resize', function () {
        myChart2.resize();
    });


    let data = {};
    let url = window.location.search.substr(1);
    data[url.split("=")[0]] = url.split("=")[1];
    console.log(url);
    console.log(data.user);

    // 存储pic2配置信息
    var pic2_fig = {};




    // MQTT连接 
    const options = {
        clean: true, // 保留回话
        connectTimeout: 4000, // 超时时间
        // 认证信息
        clientId: 'test_zww_01',
        username: 'zhaowenwen',
        password: '123456',
    }
    const connectUrl = 'ws://111.230.186.85:9765/mqtt'
    const client = mqtt.connect(connectUrl, options)

    client.on('connect', (clientId) => {
        console.log('Client connected:' + clientId)
        // Subscribe
        client.subscribe('test/libo/test_lb_01/biaohe', {
            qos: 0
        })
        //   test/libo/test_lb_01/biaohe
    })

    client.on('reconnect', (error) => {
        console.log('正在重连:', error)
    })

    client.on('error', (error) => {
        console.log('连接失败:', error)
    })

    client.on('message', (topic, message) => {
        res = JSON.parse(message.toString());
        console.log(res);
        if (res.device == "meter1") {
            let data = res.dataValues.split(",");
            $("#meter1 .dataval").each(function (key) {
                $(this).html(data[key]);
            });
        } else if (res.device == "meter2") {
            let data = res.dataValues.split(",");
            $("#meter2 .dataval").each(function (key) {
                $(this).html(data[key]);
            });
        } else if (res.device == "meter3") {
            let data = res.dataValues.split(",");
            $("#meter3 .dataval").each(function (key) {
                $(this).html(data[key]);
            });
        } else if (res.device == "meter4") {
            let data = res.dataValues.split(",");
            $("#meter4 .dataval").each(function (key) {
                $(this).html(data[key]);
            });
        } else if (res.device == "meter5") {
            let data = res.dataValues.split(",");
            $("#meter5 .dataval").each(function (key) {
                $(this).html(data[key]);
            });
        } else if (res.device == "meter6") {
            let data = res.dataValues.split(",");
            $("#meter6 .dataval").each(function (key) {
                $(this).html(data[key]);
            });
        };
    });


    // Socket(data, function (res) {
    //     res = JSON.parse(res);
    //     console.log(res);
    //     let statu = res.mode;
    //     console.log(statu);
    //     var config = '';
    //     // 检测接收的数据
    //     if (statu == 'set') {
    //         // 中间显示的配置信息
    //         config = res.data;
    //         // console.log(config);
    //         $.each(config, function (key, value) {
    //             $(`.${value}`).attr('id', key);
    //         });
    //     } else if (statu == 'pic1') {
    //         // 可视化图表1
    //         let date = res.date;
    //         option1.xAxis[0].data = date;
    //         let data1 = eval('(' + res.data + ')');
    //         let data2 = res.data;
    //         option1.series[0].data = data2;
    //         myChart1.setOption(option1);
    //     } else if (statu == 'pic2') {
    //         // 可视化图表2
    //         var fig2 = res.data.split(",")
    //         $.each(fig2, function (index, value) {
    //             pic2_fig[value] = [225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225, 225];
    //         });
    //         console.log(fig2);
    //     } else if (statu == 'real') {
    //         // 中间部位实时数据
    //         let noun = res.data;
    //         $.each(noun, function (key, value) {
    //             $('#' + key).html(value);
    //             let rel_key = key;
    //             let rel_val = value;
    //             // 将实时上传的数据添加到pic2配置对象中
    //             $.each(pic2_fig, function (fig_key, fig_value) {
    //                 if (rel_key == fig_key) {
    //                     fig_value.shift();
    //                     fig_value.push(parseFloat(rel_val));
    //                 }
    //             });
    //         });
    //         console.log(pic2_fig);
    //         // 数据实例化到页面中
    //         var pic2_index = 0;
    //         $.each(pic2_fig, function (fig_key, fig_value) {
    //             option2.series[pic2_index].data = fig_value;
    //             console.log(pic2_index);
    //             pic2_index += 1;
    //         });
    //         myChart2.setOption(option2);
    //     }
    // });

});

// 柱状图2
$(function () {
    //实例化对象
    var myChart = echarts.init(document.querySelector('.bar2 .chart'));
    // 声明颜色数组
    var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
    //指定配置项和数据
    var option = {
        grid: {
            top: '10%',
            left: '22%',
            bottom: '10%',
            // containLabel: true
        },
        xAxis: {
            show: false,
            // type: 'value',
            // boundaryGap: [0, 0.01]
        },
        yAxis: [{
                //类目轴，适用于离散的类目数据
                type: 'category',
                //不显示y轴线条
                axisLine: {
                    show: false
                },
                // 不显示刻度
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#fff"
                },
                data: ["HTML5", "CSS3", "javascript", "VUE", "NODE"],
                inverse: true,
            },
            {
                show: true,
                data: [702, 350, 610, 793, 664],
                //类目轴，适用于离散的类目数据
                type: 'category',
                //不显示y轴线条
                axisLine: {
                    show: false,
                },
                // 不显示刻度
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        color: "#fff"
                    }
                },

            },
        ],
        series: [{
                name: '条',
                type: 'bar',
                // 柱子之间的距离
                barCategoryGap: 50,
                //柱子的宽度
                barWidth: 10,
                data: [70, 34, 60, 78, 69],
                yAxisIndex: 0,
                //显示柱子内的文字
                label: {
                    show: true,
                    position: 'inside',
                    //自动解析data里面的数据
                    formatter: "{c}%",
                },
                //修改第一组柱子的圆角
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 20,
                    //修改柱子的颜色
                    color: function (params) {
                        return myColor[params.dataIndex];
                    },
                }
            },
            {
                name: '框',
                type: 'bar',
                data: [100, 100, 100, 100, 100],
                yAxisIndex: 1,
                // 柱子之间的距离
                barCategoryGap: 50,
                barWidth: 15,
                itemStyle: {
                    color: "none",
                    borderColor: "#00c1de",
                    borderWidth: 3,
                    barBorderRadius: 15
                },

            }
        ]
    };
    //把配置项给实例
    myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize();
    })
});

// 折线图1
$(function () {

});

// 折线图2
$(function () {
    var myChart = echarts.init(document.querySelector('.line2 .chart'));
    var option = {
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            top: "0%",
            data: ['电压情况', '电流情况', ],
            textStyle: {
                color: "rgba(255, 255, 255, .5)",
                fontSize: "12",
            }
        },
        grid: {
            left: "10",
            top: "30",
            right: "10",
            bottom: "10",
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "26", "28", "29", "30"],
            // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12
                }
            },
            // x轴线的颜色为   rgba(255,255,255,.2)
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.2)"
                }
            },
        }],
        yAxis: [{
            type: 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)"
                }
            },
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12
                }
            },
            // 修改分割线的颜色
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)"
                }
            }
        }],
        series: [{
                name: '电压情况',
                type: 'line',
                smooth: true,
                // 单独修改线的样式
                lineStyle: {
                    color: "#0184d5",
                    width: 2
                },
                areaStyle: {
                    // 渐变色，只需要复制即可
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [{
                                offset: 0,
                                color: "rgba(1, 132, 213, 0.4)" // 渐变色的起始颜色
                            },
                            {
                                offset: 0.8,
                                color: "rgba(1, 132, 213, 0.1)" // 渐变线的结束颜色
                            }
                        ],
                        false
                    ),
                    shadowColor: "rgba(0, 0, 0, 0.1)"
                },
                //设置拐点
                symbol: "circle",
                //拐点大小
                symbolSize: 8,
                // 开始不显示拐点， 鼠标经过显示
                showSymbol: false,
                // 设置拐点颜色以及边框
                itemStyle: {
                    color: "#0184d5",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                },
                data: [30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 20, 60, 50, 40],
            },
            {
                name: '电流情况',
                type: 'line',
                smooth: true,
                lineStyle: {
                    normal: {
                        color: "#00d887",
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [{
                                    offset: 0,
                                    color: "rgba(0, 216, 135, 0.4)"
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(0, 216, 135, 0.1)"
                                }
                            ],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.1)"
                    }
                },
                // 设置拐点 小圆点
                symbol: "circle",
                // 拐点大小
                symbolSize: 5,
                // 设置拐点颜色以及边框
                itemStyle: {
                    color: "#00d887",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                },
                // 开始不显示拐点， 鼠标经过显示
                showSymbol: false,
                data: [130, 10, 20, 40, 30, 40, 80, 60, 20, 40, 90, 40, 20, 140, 30, 40, 130, 20, 20, 40, 80, 70, 30, 40, 30, 120, 20, 99, 50, 20],
            },
        ]
    };
    //把配置项给实例对象
    myChart.setOption(option);
    //让图表跟随屏幕自动的去适应
    window.addEventListener('resize', function () {
        myChart.resize();
    });
});

// 饼形图1
$(function () {
    var myChart = echarts.init(document.querySelector(".pie .chart"));
    var option = {
        color: [
            "#065aab",
            "#066eab",
            "#0682ab",
            "#0696ab",
            "#06a0ab",
        ],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            bottom: "0%",
            itemWidth: 10,
            itemHeight: 10,
            data: ["0岁以下", "20-29岁", "30-39岁", "40-49岁", "50岁以上"],
            // 修改图例组件的文字为 12px
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            }
        },
        series: [{
            name: '年龄分布',
            type: 'pie',
            //可以修改饼形图的大小，第一个值 内圆半径，第二个值 外圆半径
            radius: ['40%', '60%'],
            center: ['50%', '45%'],
            avoidLabelOverlap: false,
            //图形上的文字
            label: {
                show: false,
                position: 'center'
            },
            //链接文字和图形的线
            labelLine: {
                show: false
            },
            data: [{
                    value: 1,
                    name: "0岁以下"
                },
                {
                    value: 4,
                    name: "20-29岁"
                },
                {
                    value: 2,
                    name: "30-39岁"
                },
                {
                    value: 2,
                    name: "40-49岁"
                },
                {
                    value: 1,
                    name: "50岁以上"
                }
            ],
        }]
    };
    myChart.setOption(option);
    //让图表跟随屏幕自动的去适应
    window.addEventListener('resize', function () {
        myChart.resize();
    });
});

// 饼形图2
$(function () {
    var myChart = echarts.init(document.querySelector(".pie2 .chart"));
    var option = {
        color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            bottom: "0%",
            itemWidth: 8,
            itemHeight: 9,
            // 修改图例组件的文字为 12px
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            }
        },
        series: [{
            name: '地区分布',
            type: 'pie',
            radius: ["10%", "70%"],
            center: ['50%', '45%'],
            label: {
                fontSize: 10,
            },
            labelLine: {
                //链接图形的线条
                length: 6,
                //链接文字的线条
                length2: 8,
            },
            roseType: 'radius',
            data: [{
                    value: 20,
                    name: '云南'
                },
                {
                    value: 26,
                    name: '北京'
                },
                {
                    value: 24,
                    name: '山东'
                },
                {
                    value: 25,
                    name: '河北'
                },
                {
                    value: 20,
                    name: '江苏'
                },
                {
                    value: 25,
                    name: '浙江'
                },
                {
                    value: 30,
                    name: '四川'
                },
                {
                    value: 42,
                    name: '湖北'
                }
            ]
        }]
    };
    myChart.setOption(option);
    //让图表跟随屏幕自动的去适应
    window.addEventListener('resize', function () {
        myChart.resize();
    });
});