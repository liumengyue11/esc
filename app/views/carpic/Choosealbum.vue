<template>
    <div>
        <ul v-if = "carinfo.images">
            <li v-for = "item in arr" :key = "item.english"
            :class = "{cur : item.english == nowAlbum}"
            @click="changeNowAlbum(item.english)">
                {{item.chinese}}（{{carinfo.images[item.english].length}}）
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        computed : {
            carinfo(){
                return this.$store.state.carinfoStore.result;
            },
            nowAlbum(){
                return this.$store.state.carinfoStore.nowAlbum;
            }
        },
        methods : {
            changeNowAlbum(nowAlbum){
                this.$store.dispatch("carinfoStore/changeNowAlbum",{nowAlbum})
            }
        },
        data(){
            return {
                arr : [
                    {
                        "chinese" : "外观",
                        "english" : "view"
                    },
                    {
                        "chinese" : "内饰",
                        "english" : "inner"
                    },
                    {
                        "chinese" : "结构及发动机",
                        "english" : "engine"
                    },
                    {
                        "chinese" : "更多细节",
                        "english" : "more"
                    }
                ]
            }
        }
    }
</script>

<style scoped lang = "less">
    ul{
        list-style: none;

        li{
            float: left;
            width: 140px;
            height: 40px;
            color: #000;
            text-align: center;
            line-height: 40px;
            font-size: 16px;
            background: #eee;
            margin-right: 9px;
            margin-bottom: 10px;
            cursor: pointer;

            &.cur{
                background: orange;
            }
        }

    }
</style>