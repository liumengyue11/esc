<template>
    <div>
        <Row>
            <Col span = "3">品牌/车系</Col>
            <Col span = "21">
               <Biaoqianye :arr = "arr"></Biaoqianye>
            </Col>
        </Row>
        <div class="h10"></div>
        <!-- 筛选条件 -->
        <Row v-for ="item in filterterm" :key="item.english">
            <Col span = "3">{{item.chinese}}</Col>
            <Col span = "21">
                <Fuxuankuang v-if="item.type == 'Fuxuankuang'" :options ='item.options' :english="item.english"></Fuxuankuang>
                <Huadongtiao v-if="item.type == 'Huadongtiao'" :options ='item.options' :english="item.english" :min = "item.min" :max = "item.max" :conversion = "item.conversion"></Huadongtiao>
                <Riqifanwei v-if="item.type == 'Riqifanwei'"  :english="item.english"></Riqifanwei>
                
            </Col>
        </Row>
        <!-- 标签 -->
        <div class="h10"></div>
        <Row>
            <Col span = "3">当前</Col>
            <Col span = "21">
                <Tag v-for="item in filters" :key="item.k" closable @on-close="handleClose(item.k)">
                    {{getK(item.k)}}：{{getV(item.k, item.v)}}
                </Tag>
            </Col>
        </Row>
       
    </div>
</template>

<script>
    import moment from 'moment';
    import filterterm from './filterterm';
    import Fuxuankuang from './filterbox/Fuxuankuang';
    import Huadongtiao from './filterbox/Huadongtiao';
    import Riqifanwei from './filterbox/Riqifanwei';
    import Biaoqianye from './filterbox/Biaoqianye';
    export default {
        data(){
            return {
                filterterm,
                arr : [
                    {
                        brands : '大众',
                        series : ["高尔夫", "帕萨特"]
                    },
                    {
                        brands : '奥迪',
                        series : ["A6L", "Q5", "TT"]
                    },
                    {
                        brands : '宝马',
                        series : ["5系", "3系", "X5", "X6"]
                    },
                    {
                        brands : '奔驰',
                        series : ["C级", "E级", "GLK级"]
                    },
                    {
                        brands : '标致',
                        series : ["308", "408"]
                    },
                    {
                        brands : '丰田',
                        series : ["卡罗拉", "汉兰达", "凯美瑞"]
                    },
                    {
                        brands : '路虎',
                        carsystem : ["发现"]
                    },
                    {
                        brands : 'MINI',
                        series : ["Mini", "coupe"]
                    },
                    {
                        brands : '日产',
                        series : ["天籁", "骐达", "逍客"]
                    },
                    {
                        brands : '特斯拉',
                        series : ["MODELS", "MODELX"]
                    },
                    {
                        brands : '五菱',
                        series : ["宏光", "帕萨特"]
                    },
                    {
                        brands : '雪佛兰',
                        series : ["科鲁兹", "迈锐宝"]
                    }
                ]
            }
        },
        computed : {
            filters(){
                return this.$store.state.findcarStore.filters;
            }
        },
        methods : {
            // 获得中文名
            getK(k){
                return this.filterterm.filter(item => item.english == k)[0].chinese;
            },
            // 规整v，替换v、to
            getV(k,v){
                var type = this.filterterm.filter(item => item.english == k)[0].type;
                if(type == "Fuxuankuang"){
                    return v.replace(/v/g, "、");
                }else if(type == "Riqifanwei"){
                    return v.split("to").map(item => moment(Number(item)).format("YYYY年MM月DD日")).join(" 到 ");
                }else if(type == "Biaoqianye"){
                    return v;
                }
                if(k == "price"){
                    return v.split("to").join(" 到 ");
                }else if(k == "km"){
                    return v.split("to").map(item => item / 10000).join(" 到 ");
                }
            },
            handleClose(k){
                this.$store.dispatch("findcarStore/delFilter",{k});
            }

        },
        components : {
            Fuxuankuang,Huadongtiao,Riqifanwei,Biaoqianye
        }
    }
</script>

<style scoped lang="less">
    .h10{
        height: 10px;
    }
    
</style>