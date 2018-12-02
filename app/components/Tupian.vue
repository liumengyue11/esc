<template>
    <div>
        <div v-if = "isLoader">
            <img :src="picurl" :style ="{width : w + 'px', height : h + 'px'}" >
        </div>
        <div v-else class = "loadingbox" :style ="{'width' : w + 'px', 'height' : h + 'px', 'position': 'relative','line-height' : h + 'px'}">
            <img src="/images/loading.svg" :style ="{width : w/2 + 'px'}">
        </div>
        
    </div>
</template>

<script>
    export default {
        props : ["picurl", "w" , "h"],
        data(){
           return {
               isLoader : false
           }
        },
        methods : {
            loadPic(){
                var img = new Image();
                img.src = this.picurl;
                var self = this;
                img.onload = function () {
                    self.isLoader = true;
                }
            }
        },
        created() {
            this.loadPic();
        },
        watch : {
            // 当picurl变化时
            picurl(){
                this.isLoader = false;
                this.loadPic();
            }
        }
    }
</script>

<style scoped lang = "less">
    .loadingbox{
        text-align: center;
    }
</style>