export default [
    {
        "chinese" : "颜色",
        "english" : "color",
        "type" : "Fuxuankuang",
        "options" : ["红", "橙","黄","绿","蓝","黑","白","灰","银灰","咖啡","香槟"]
    },
    {
        "chinese" : "发动机",
        "english" : "engine",
        "type" : "Fuxuankuang",
        "options" : ["1.0L","1.2L", "1.6L", "1.8L","2.0L","3.0L","4.0L", "5.0L", "1.6T"]
    },
    {
        "chinese" : "排放标准",
        "english" : "exhaust",
        "type" : "Fuxuankuang",
        "options" : ["国一","国二","国三","国四","国五", "国六"]
    },
    {
        "chinese" : "变速箱",
        "english" : "gearbox",
        "type" : "Fuxuankuang",
        "options" : ["手动","自动","手自一体"]
    },
    {
        "chinese" : "燃料",
        "english" : "fuel",
        "type" : "Fuxuankuang",
        "options" : ["汽油","柴油","纯电动","油电混合"]
    },
    {
        "chinese" : "售价（万元）",
        "english" : "price",
        "type" : "Huadongtiao",
        "min" : 0,
        "max" : 120,
        "conversion" : 1
    },
    {
        "chinese" : "公里数（万公里）",
        "english" : "km",
        "type" : "Huadongtiao",
        "min" : 0,
        "max" : 2000000,        //真值
        "conversion" : 10000    //将10000当做1
    },
    {
        "chinese" : "购买日期",
        "english" : "buydate",
        "type" : "Riqifanwei"
    }
]