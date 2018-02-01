var log = console.log.bind(console)

var ajax = function(method, path, data, callback) {
    var r = new XMLHttpRequest()
    r.open(method, path, true)
    // r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = () => {
        if (r.readyState == 4) {
            callback(r.response)
        }
    }
    r.send(data)
}

var getResult = function(ws) {
    var result = ws["result"]
    return result
}

var unitDays = function (r) {
    var [today, future] = [r['today'], r['future']];
    today['date'] = today['date_y']
    return [today, ...future]
}

// class data {
//     constructor() {
//         this.where = []
//         this.minWeather = []
//         this.maxWeather = []
//         this.date = []
//     }
//
//     appendData() {
//         this.where = [this.where, ...wetherDict['where']]
//         this.minWeather = [this.minWeather, ...wetherDict['minWeather']]
//         this.maxWeather = [this.maxWeather, ...wetherDict['maxWeather']]
//         this.date = [this.date, ...wetherDict['date']]
//     }
// }
//
// const d = new data()

var fromWeathers = function(value) {
    var weatherDict = {
        'minWeather': fromTemperature(value['temperature'])[0],
        'maxWeather': fromTemperature(value['temperature'])[1],
        'date': value['date'],
    }
    return weatherDict
}

var splitData = function (ds) {
    var [where, minWeather, maxWeather, date] = [[], [], [], []]
    // log('ds', ds)
    var where = ds[0]['city']
    for (var i = 0; i < ds.length; i++) {
        var d = ds[i]
        var w = fromWeathers(d)
        log('w', w)
        minWeather = [...minWeather, w['minWeather']]
        maxWeather = [...maxWeather, w['maxWeather']]
        date = [...date, w['date']]
        log(minWeather, maxWeather, date)
    }
    return [where, minWeather, maxWeather, date]
}

var fromTemperature = function(t) {
    log('温度', t)
    var [min, max] = t.split('~')
    min = min.slice(0, -1)
    max = max.slice(0, -1)
    return [min, max]
}
var __main = function() {
    var o = {
    	"resultcode":"200",
    	"reason":"查询成功",
    	"result":{
    		"sk":{
    			"temp":"12",
    			"wind_direction":"南风",
    			"wind_strength":"2级",
    			"humidity":"47%",
    			"time":"09:50"
    		},
    		"today":{
    			"temperature":"8℃~16℃",
    			"weather":"多云",
    			"weather_id":{
    				"fa":"01",
    				"fb":"01"
    			},
    			"wind":"南风3-4 级",
    			"week":"星期六",
    			"city":"苏州",
    			"date_y":"2017年11月25日",
    			"dressing_index":"较冷",
    			"dressing_advice":"建议着厚外套加毛衣等服装。年老体弱者宜着大衣、呢外套加羊毛衫。",
    			"uv_index":"弱",
    			"comfort_index":"",
    			"wash_index":"较适宜",
    			"travel_index":"较适宜",
    			"exercise_index":"较适宜",
    			"drying_index":""
    		},
    		"future":[
    			{
    				"temperature":"8℃~16℃",
    				"weather":"多云",
    				"weather_id":{
    					"fa":"01",
    					"fb":"01"
    				},
    				"wind":"南风3-4 级",
    				"week":"星期六",
    				"date":"20171125"
    			},
    			{
    				"temperature":"6℃~16℃",
    				"weather":"多云",
    				"weather_id":{
    					"fa":"01",
    					"fb":"01"
    				},
    				"wind":"西北风3-4 级",
    				"week":"星期日",
    				"date":"20171126"
    			},
    			{
    				"temperature":"9℃~16℃",
    				"weather":"多云",
    				"weather_id":{
    					"fa":"01",
    					"fb":"01"
    				},
    				"wind":"东南风3-4 级",
    				"week":"星期一",
    				"date":"20171127"
    			},
    			{
    				"temperature":"11℃~18℃",
    				"weather":"多云转阴",
    				"weather_id":{
    					"fa":"01",
    					"fb":"02"
    				},
    				"wind":"西南风微风",
    				"week":"星期二",
    				"date":"20171128"
    			},
    			{
    				"temperature":"10℃~17℃",
    				"weather":"小雨",
    				"weather_id":{
    					"fa":"07",
    					"fb":"07"
    				},
    				"wind":"东北风4-5 级",
    				"week":"星期三",
    				"date":"20171129"
    			},
    			{
    				"temperature":"11℃~18℃",
    				"weather":"多云转阴",
    				"weather_id":{
    					"fa":"01",
    					"fb":"02"
    				},
    				"wind":"西南风微风",
    				"week":"星期四",
    				"date":"20171130"
    			},
    			{
    				"temperature":"9℃~16℃",
    				"weather":"多云",
    				"weather_id":{
    					"fa":"01",
    					"fb":"01"
    				},
    				"wind":"东南风3-4 级",
    				"week":"星期五",
    				"date":"20171201"
    			}
    		]
    	},
    	"error_code":0
    }
    var r = getResult(o)
    var days = unitDays(r)
    var [where, minWeather, maxWeather, date] = splitData(days)

    // 基于准备好的 dom，初始化 echarts 实例
    var myChart = echarts.init(document.querySelector('#main'))

    log('uuju', [where, minWeather, maxWeather, date])
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: where,
        },
        tooltip: {},
        legend: {
            data:['天气预报'],
        },
        xAxis: {
            data: date
        },
        yAxis: {},
        series: [{
            name: '天气预报',
            type: 'bar',
            barWidth: 50,
            data: maxWeather
        }]
    };

    
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
}
// var __main = function() {
//     var m = 'GET'
//     var url = "http://v.juhe.cn/weather/index?cityname=%E8%8B%8F%E5%B7%9E&dtype=&format=2&key=9b02fd2d790e92979b35ab9b7fd3642e"
//     var d = ''
//     var o = {}
//     ajax(m, url, d, function(r) {
//         var o = JSON.parse(r)
//         var r = getResult(o)
//         var days = unitDays(r)
//         var data = splitData(days)
//         const w = fromWeathers(data)
//         if (status != 'ok') {
//             log('status不等于ok', status)
//         } else {
//             const [time, tmp] = fromDays(weather)
//             log(time, tmp)
//             // 基于准备好的 dom，初始化 echarts 实例
//             var myChart = echarts.init(document.querySelector('#main'))
//
//             // 指定图表的配置项和数据
//             var option = {
//                 title: {
//                     text: where
//                 },
//                 tooltip: {},
//                 legend: {
//                     data:['天气预报']
//                 },
//                 xAxis: {
//                     data: time
//                 },
//                 yAxis: {},
//                 series: [{
//                     name: '天气预报',
//                     type: 'bar',
//                     data: tmp
//                 }]
//             };
//
//             // 使用刚指定的配置项和数据显示图表。
//             myChart.setOption(option)
//         }
//     })
//
//
//
// }
__main()

// {
// 	"resultcode":"200",
// 	"reason":"查询成功",
// 	"result":{
// 		"sk":{
// 			"temp":"12",
// 			"wind_direction":"南风",
// 			"wind_strength":"2级",
// 			"humidity":"47%",
// 			"time":"09:50"
// 		},
// 		"today":{
// 			"temperature":"8℃~16℃",
// 			"weather":"多云",
// 			"weather_id":{
// 				"fa":"01",
// 				"fb":"01"
// 			},
// 			"wind":"南风3-4 级",
// 			"week":"星期六",
// 			"city":"苏州",
// 			"date_y":"2017年11月25日",
// 			"dressing_index":"较冷",
// 			"dressing_advice":"建议着厚外套加毛衣等服装。年老体弱者宜着大衣、呢外套加羊毛衫。",
// 			"uv_index":"弱",
// 			"comfort_index":"",
// 			"wash_index":"较适宜",
// 			"travel_index":"较适宜",
// 			"exercise_index":"较适宜",
// 			"drying_index":""
// 		},
// 		"future":[
// 			{
// 				"temperature":"8℃~16℃",
// 				"weather":"多云",
// 				"weather_id":{
// 					"fa":"01",
// 					"fb":"01"
// 				},
// 				"wind":"南风3-4 级",
// 				"week":"星期六",
// 				"date":"20171125"
// 			},
// 			{
// 				"temperature":"6℃~16℃",
// 				"weather":"多云",
// 				"weather_id":{
// 					"fa":"01",
// 					"fb":"01"
// 				},
// 				"wind":"西北风3-4 级",
// 				"week":"星期日",
// 				"date":"20171126"
// 			},
// 			{
// 				"temperature":"9℃~16℃",
// 				"weather":"多云",
// 				"weather_id":{
// 					"fa":"01",
// 					"fb":"01"
// 				},
// 				"wind":"东南风3-4 级",
// 				"week":"星期一",
// 				"date":"20171127"
// 			},
// 			{
// 				"temperature":"11℃~18℃",
// 				"weather":"多云转阴",
// 				"weather_id":{
// 					"fa":"01",
// 					"fb":"02"
// 				},
// 				"wind":"西南风微风",
// 				"week":"星期二",
// 				"date":"20171128"
// 			},
// 			{
// 				"temperature":"10℃~17℃",
// 				"weather":"小雨",
// 				"weather_id":{
// 					"fa":"07",
// 					"fb":"07"
// 				},
// 				"wind":"东北风4-5 级",
// 				"week":"星期三",
// 				"date":"20171129"
// 			},
// 			{
// 				"temperature":"11℃~18℃",
// 				"weather":"多云转阴",
// 				"weather_id":{
// 					"fa":"01",
// 					"fb":"02"
// 				},
// 				"wind":"西南风微风",
// 				"week":"星期四",
// 				"date":"20171130"
// 			},
// 			{
// 				"temperature":"9℃~16℃",
// 				"weather":"多云",
// 				"weather_id":{
// 					"fa":"01",
// 					"fb":"01"
// 				},
// 				"wind":"东南风3-4 级",
// 				"week":"星期五",
// 				"date":"20171201"
// 			}
// 		]
// 	},
// 	"error_code":0
// }






// {
// 	"resultcode":"200",
// 	"reason":"successed!",
// 	"result":{
// 		"sk":{
// 			"temp":"12",
// 			"wind_direction":"南风",
// 			"wind_strength":"2级",
// 			"humidity":"47%",
// 			"time":"09:50"
// 		},
// 		"today":{
// 			"temperature":"8℃~16℃",
// 			"weather":"多云",
// 			"weather_id":{
// 				"fa":"01",
// 				"fb":"01"
// 			},
// 			"wind":"南风3-4 级",
// 			"week":"星期六",
// 			"city":"苏州",
// 			"date_y":"2017年11月25日",
// 			"dressing_index":"较冷",
// 			"dressing_advice":"建议着厚外套加毛衣等服装。年老体弱者宜着大衣、呢外套加羊毛衫。",
// 			"uv_index":"弱",
// 			"comfort_index":"",
// 			"wash_index":"较适宜",
// 			"travel_index":"较适宜",
// 			"exercise_index":"较适宜",
// 			"drying_index":""
// 		},
// 		"future":{
// 			"day_20171125":{
// 				"temperature":"8℃~16℃",
// 				"weather":"多云",
// 				"weather_id":{
// 					"fa":"01",
// 					"fb":"01"
// 				},
// 				"wind":"南风3-4 级",
// 				"week":"星期六",
// 				"date":"20171125"
// 			},
// 			"day_20171126":{
// 				"temperature":"6℃~16℃",
// 				"weather":"多云",
// 				"weather_id":{
// 					"fa":"01",
// 					"fb":"01"
// 				},
// 				"wind":"西北风3-4 级",
// 				"week":"星期日",
// 				"date":"20171126"
// 			},
// 			"day_20171127":{
// 				"temperature":"9℃~16℃",
// 				"weather":"多云",
// 				"weather_id":{
// 					"fa":"01",
// 					"fb":"01"
// 				},
// 				"wind":"东南风3-4 级",
// 				"week":"星期一",
// 				"date":"20171127"
// 			},
// 			"day_20171128":{
// 				"temperature":"11℃~18℃",
// 				"weather":"多云转阴",
// 				"weather_id":{
// 					"fa":"01",
// 					"fb":"02"
// 				},
// 				"wind":"西南风微风",
// 				"week":"星期二",
// 				"date":"20171128"
// 			},
// 			"day_20171129":{
// 				"temperature":"10℃~17℃",
// 				"weather":"小雨",
// 				"weather_id":{
// 					"fa":"07",
// 					"fb":"07"
// 				},
// 				"wind":"东北风4-5 级",
// 				"week":"星期三",
// 				"date":"20171129"
// 			},
// 			"day_20171130":{
// 				"temperature":"9℃~16℃",
// 				"weather":"多云",
// 				"weather_id":{
// 					"fa":"01",
// 					"fb":"01"
// 				},
// 				"wind":"东南风3-4 级",
// 				"week":"星期四",
// 				"date":"20171130"
// 			},
// 			"day_20171201":{
// 				"temperature":"9℃~16℃",
// 				"weather":"多云",
// 				"weather_id":{
// 					"fa":"01",
// 					"fb":"01"
// 				},
// 				"wind":"东南风3-4 级",
// 				"week":"星期五",
// 				"date":"20171201"
// 			}
// 		}
// 	},
// 	"error_code":0
// }
