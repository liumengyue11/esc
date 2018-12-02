<template>
    <div>
        <div class="cut_wrap" :style ="{width : picW + 'px', height : picH + 'px'}">
            <img :src="`http://127.0.0.1:3000/${picurl}`" :style="{width : picW + 'px', height : picH + 'px'}">
            <div class = "mask"></div>
            <div class = "cut">
                <img 
                    :src="`http://127.0.0.1:3000/${picurl}`"
                    :style="{'width' : picW + 'px', 'height' : picH + 'px', 'left' : -cutinfo.cut_rect_x -1 + 'px', 'top' : -cutinfo.cut_rect_y - 1 + 'px'}"
                >
                <div class = "t"></div>
                <div class = "r"></div>
                <div class = "b"></div>
                <div class = "l"></div>
            </div>
        </div>
        <div class = "priview">
                <div class = "p_box" v-for="w in p_arr" :style="{width: w + 'px', height : w + 'px'}">
                    <img 
                        :src="`http://127.0.0.1:3000/${picurl}`" 
                        :style="{'left' : -cutinfo.cut_rect_x / cutinfo.cut_rect_w * w + 'px', 'top' :  -cutinfo.cut_rect_y / cutinfo.cut_rect_h * w + 'px','width' : w * (picW / cutinfo.cut_rect_w) + 'px', 'height' : w * (picH / cutinfo.cut_rect_h) + 'px'}"
                    >
                    
                </div>
        </div>
    </div>
</template>

<script>
    export default {
        props : ["picurl","picW","picH","cutinfo"],
        data(){
            return {
                p_arr : [120, 80, 60]
            }
        },
        mounted() {
            var self = this;
            $(".cut").draggable({
                containment: "parent",
                drag(event, ui){
                    var left = ui.position.left;
                    var top = ui.position.top;
                    self.cutinfo.cut_rect_x = left;
                    self.cutinfo.cut_rect_y = top;
                }
            });
            $('.cut').resizable({
                 //箍住
                containment : "parent",
                //比例
                aspectRatio  : true ,
                resize(event, ui){
                   const width = ui.size.width;
                   const height = ui.size.height;
                   self.cutinfo.cut_rect_w = width;
                   self.cutinfo.cut_rect_h = height;
                }
            })
        },
    }
</script>

<style scoped lang = "less">
    .cut_wrap{
        position: relative;
        float: left;
        .cut{
            position: absolute;
            top: 0;
            left: 0;
            width: 80px;
            height: 80px;
            z-index: 100;
            overflow: hidden;
            img{
                position: relative;
            }
            &>div{
                position: absolute;
            }
            .t{
                top: 0;
                left: 0;
                height: 0;
                width: 5000px;
                border: 1.2px dotted orange;
                animation: move_r 100s linear 0s infinite;
            }
            .r{
                top: 0;
                right: 0;
                height: 5000px;
                width: 0;
                border: 1.2px dotted orange;
                animation: move_b 100s linear 0s infinite;
            }
            .b{
                bottom: 0;
                left: 0;
                height: 0;
                width: 5000px;
                border: 1.2px dotted orange;
                animation: move_l 100s linear 0s infinite;
            }
            .l{
                top: 0;
                left: 0;
                height: 5000px;
                width: 0;
                border: 1.2px dotted orange;
                animation: move_t 100s linear 0s infinite;
            }
            
            @-webkit-keyframes move_r{
                from{
                    left:-2500px;
                }
                to{
                    left:0;
                }
            }
            @-webkit-keyframes move_b{
                from{
                    top:-2500px;
                }
                to{
                    top:0;
                }
            }
            @-webkit-keyframes move_l{
                from{
                    left:0px;
                }
                to{
                    left:-2500px;
                }
            }
            @-webkit-keyframes move_t{
                from{
                    top:0;
                }
                to{
                    top:-2500px;
                }
            }
        }
        .mask{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            opacity: 0.5;
        }
    }
    .priview{
        float: left;
        margin-left: 20px;
        .p_box{
            border: 1px solid #000;
            margin-bottom: 20px;
            overflow: hidden;
            img{
                position: relative;
            }
        }
    }
   
    
</style>