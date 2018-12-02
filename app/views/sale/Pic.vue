<template>
    <div>
        <div :class ="{pic : true, done : percent == 100}"
        :style="{'width' : w + 'px', 'height' : h + 'px', 
        'background-image' : `url(${picbase64})`, 
        'backgroung-size' : 'cover', 
        'background-position' : 'center, center'
        }">
            <div class = "progressbar">
                <span :style ="{width : percent + '%'}"></span>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        props : ["file"],
        data(){
            return {
                w : 180,
                h : 120,
                percent : 0,
                picbase64 : ""
            }
        },
        mounted() {
            // 创建预览图
            var self = this;
            var fileread = new FileReader();
            fileread.readAsDataURL(this.file);
            fileread.onload = function (event) {
                self.picbase64 = event.srcElement.result;
            }
            // 创建虚拟表单
            var form = new FormData();
            form.append("tupian", this.file);
            
            
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if(xhr.readyState == 4){
                    
                }
            };
            // 上传进度
            xhr.upload.onprogress = function(event){
                self.percent = (event.loaded / event.total) * 100;
            }
            xhr.open("POST", "/api/uppic", true);
            xhr.send(form)
        },
        
    }
</script>

<style scoped lang="less">
    .pic{
        position: relative;
        float: left;
        margin-right: 10px;
        margin-bottom: 0;
        border-radius: 5px;
        
        bottom: 1px solid skyblue;
            &::before{
                content : "";
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 5px;
                background: skyblue;
                opacity: 1;
                transform: all 0.5s ease 0;
            }
            &.done::before{
                opacity: 0;
            }
            .progressbar{
                position: absolute;
                width: 160px;
                height: 16px;
                left: 50%;
                top: 50%;
                margin-left: -80px;
                margin-top: -8px;
                background: #000;
                border-radius: 8px;
                span{
                    display: block;
                    width: 30px;
                    height: 16px;
                    border-radius: 8px;
                    background: orange;
                    transform: all 0.4s ease 0s;
                }
            }   
            &.done .progressbar{
               display: none;
            }
    }
</style>