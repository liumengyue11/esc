<template>
    <div>
        <input type="file" ref = "file" hidden multiple @change="up"/>
        <Button @click="choosePic">选择图片</Button>
        <div class="box" ref = "box">
            <Pic v-for="(item, index) in files" :key="index" :file="item"></Pic>
        </div>
    </div>
</template>

<script>
    import Pic from './Pic';
    export default {
        data(){
            return {
                files : []
            }
        },
        mounted() {
            var pic = this.$refs.box;
            $(pic).sortable();
            this.$refs.box.addEventListener("dragenter", function (e) {
                 e.stopPropagation(); 
                 e.preventDefault(); 
            }, false);
            this.$refs.box.addEventListener("dragover", function (e) {
                e.stopPropagation(); 
                e.preventDefault(); 
            }, false);
            var self = this;
            this.$refs.box.addEventListener("drop", function (e) {
                e.stopPropagation(); 
                e.preventDefault(); 
                self.files.push(...e.dataTransfer.files);
            }, false); 
        },
        methods : {
           choosePic(){
               var ent = document.createEvent("MouseEvents");
               ent.initMouseEvent("click", false, false);
               this.$refs.file.dispatchEvent(ent);
           },
           up(){
                var files = this.$refs.file.files;
                for(let i = 0; i < files.length; i++){
                    this.files.push(files[i]);
                }
           }
        },
        components : {
            Pic
        }
    }
</script>

<style scoped lang="less">
    .box{
        min-height: 120px;
        border:1px dotted #000;
        overflow: hidden;
        padding: 10px;
        margin: 20px;
    }
</style>