<template>
    <div>
         <Modal
            :value="true"
            :width="modalW"
            title="更改头像"
            @on-cancel="cancel">
            <div v-if="step == 1">
                <input type="file" ref="file" hidden @change="changeHandler">
                <Button @click="choosePic">从本地计算机中选择图片...</Button>
            </div>
            <div v-if="step == 2">
                <Progress :percent="percent" status="active" />
            </div>
            <div v-if="step == 3" style="overflow : hidden">
                <div v-if="picurl"  :style="{width : picW + 180 + 'px', height : picH + 'px'}">
                    <Cutpic   :picurl="picurl" :picW="picW" :picH="picH" :picRealW="picRealW" :picRealH="picRealH" :cutinfo="cutinfo"></Cutpic>
                </div>
                
                <div class = "right"></div>
            </div>
            <div slot="footer">
                <Button>取消</Button>
                <Button type="primary" v-if="step == 3" @click="submitHandler">确定</Button>
            </div>
        </Modal>

        
    </div>
</template>

<script>
    import Cutpic from './Cutpic';
    import axios from 'axios';
    export default {
        data(){
            return {
                step : 1,
                percent : 0,
                // 图片地址
                picurl : "",
                // 图片真实宽高
                picRealW : 0,
                picRealH : 0,
                // 图片最小、最大宽高
                picMinW : 300,
                picMaxW : 500,
                picMinH : 200,
                picMaxH : 400,
                // 显示的宽高
                picW : 0,
                picH : 0,
                cutinfo : {
                    cut_rect_x : 0,
                    cut_rect_y : 0,
                    cut_rect_w : 80,
                    cut_rect_h : 80,
                }
            }
        },
        computed: {
            modalW(){
                if(!this.picurl){
                    return "500px";
                }
                return this.picW + 180 + 'px';
            }
        },
         mounted() {
              this.setImg()  
         },
        methods: {
            cancel () {
                this.$emit("close");
            },
           
            changeHandler() {
                var self = this;
                var files = this.$refs.file.files[0];
                var form = new FormData();
                form.append("avatar", files);
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if(xhr.readyState == 4){
                        // 返回字符串，变为对象
                       var obj = JSON.parse(xhr.responseText);
                       self.picurl = obj.filename;
                       self.picRealW = obj.width;
                       self.picRealH = obj.height;
                       self.setImg();
                    }
                },
                xhr.upload.onprogress = function (e) {
                    self.percent = e.loaded / e.total * 100;
                    self.step = 3;
                }
                xhr.open("POST", "/api/upavatar", true);
                xhr.send(form); 
                this.step = 2;
            },
            setImg(){
                this.picW = this.picRealW;
                this.picH = this.picRealH;
                if(this.picRealW > this.picMaxW){
                    this.picW = this.picMaxW;
                    this.picH = (this.picMaxW / this.picRealW) * this.picRealH; 
                }
                if(this.picRealH > this.picMaxH && this.picRealW <= this.picMaxW){
                    this.picH = this.picMaxH;
                    this.picW = (this.picMaxH / this.picRealH) * this.picRealW; 
                }
                console.log(this.picW, this.picH)
            },
            choosePic(){
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click", false, false);
                this.$refs.file.dispatchEvent(evt);
            },
            submitHandler(){
                axios.post("/api/cut",{
                    picurl : this.picurl,
                    cut_rect_x : this.cutinfo.cut_rect_x,
                    cut_rect_y : this.cutinfo.cut_rect_y,
                    cut_rect_w : this.cutinfo.cut_rect_w,
                    cut_rect_h : this.cutinfo.cut_rect_h,
                    picRealW : this.picRealW,
                    picRealH : this.picRealH,
                    picW : this.picW,
                    picH : this.picH
                });
                this.$emit("close");
                window.location.reload();
            }
        },
        components : {
            Cutpic
        }
    }
</script>

<style scoped lang = "less">
    .img{
        float: left;
    }

</style>