<template>
    <div>
        <div v-if = "carinfo.images" @mouseleave = "backpage">
            <div class = "huoche" :style ="{left : -300 * page + 'px'}">
                <ul v-for = "i in totalPage">
                    <li v-for = "j in 6" :key="j" v-if ="getImgName(i, j)"
                    :class ="{cur: nowIdx == (i - 1) * 6 + (j - 1)}"
                    @click="changeNowIdx((i - 1) * 6 + (j - 1))">
                        <Tupian :picurl="`http://127.0.0.1:3000/images/carimages_small/${id}/${nowAlbum}/${getImgName(i,j)}`" :w="140" :h="93"></Tupian>
                    </li>
                </ul>
            </div>
            <div class = "nav">
                <span v-for = "i in totalPage" :key = "i" 
                :style = "{width : 299/totalPage + 'px'}"
                :class = "{cur : page == i - 1}"
                @mouseenter="changePage(i - 1)"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
       computed : {
           id(){
               return this.$route.params.id;
           },
           carinfo(){
               return this.$store.state.carinfoStore.result;
           },
           nowIdx(){
               return this.$store.state.carinfoStore.nowIdx;
           },
           nowAlbum(){
               return this.$store.state.carinfoStore.nowAlbum;
           },
           totalPage(){
               return Math.ceil(this.carinfo.images[this.nowAlbum].length/6);
           }
       } ,
       methods : {
           getImgName(i, j){
               return this.carinfo.images[this.nowAlbum][(i - 1) * 6 + (j - 1)];
           },
           changePage(page){
               this.page = page;
           },
           backpage(){
               this.page = parseInt(this.nowIdx/6);
           },
           changeNowIdx(nowIdx){
               this.$store.commit("carinfoStore/changeNowIdx", {nowIdx})
           }
       },
       data(){
           return {
               page : 0
           }
       },
       watch : {
           nowIdx(v){
               this.page = parseInt(v/6);
           }
       }
    }
</script>

<style scoped lang = "less">
    .huoche{
        position: relative;
        width: 8000px;
        transition: all 0.5s ease 0s;
        ul{
            float: left;
            list-style: none;
            width: 300px;
            li{
                float: left;
                width: 140px;
                height: 93px;
                margin-right: 9px;
                margin-bottom: 10px;
                position: relative;

                &::before{
                    content : "";
                    width : 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    position: absolute;
                }
                &.cur::before{
                    opacity: 0;
                }

            }
        }
    }
    .nav{
        width: 299px;
        clear : both;
        span{
            float: left;
            height: 10px;
            background: #eee;
            border-right: 10px solid #000;
            &.cur{
                background: orange;
            }
        }
        
    }
    
</style>