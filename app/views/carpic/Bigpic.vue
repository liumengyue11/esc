<template>
    <div>
        <div class = "lefts">
            <div class = "inner">
                <div class = "picbox" ref = "picbox">
                    <img class = "imgs" ref = "img">
                    <img class = "load" ref = "load" src="images/loading.svg">
                    <div class = "l"  @click="goPrev()"></div>
                    <div class = "r"  @click="goNext()"></div>
                    <button class = "lbtn" @click="goPrev()">&lt;</button>
                    <button class = "rbtn" @click="goNext()">&gt;</button>
                </div>
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
           } 
        },
         mounted() {
            //监听窗口改变尺寸
            window.addEventListener("resize" , this.setMargin ,true);
        },
        //当组件下树的时候去掉监听
        destroyed() {
            window.removeEventListener("resize" ,  this.setMargin ,true);
        },
        methods : {
            goNext(){
                this.$store.dispatch("carinfoStore/goNext")
            },
            goPrev(){
                this.$store.dispatch("carinfoStore/goPrev")
            },
            changePic(){
                var smallpic = `http://127.0.0.1:3000/images/carimages_small/${this.id}/${this.nowAlbum}/${this.carinfo.images[this.nowAlbum][this.nowIdx]}`;
                var bigpic = `http://127.0.0.1:3000/images/carimages/${this.id}/${this.nowAlbum}/${this.carinfo.images[this.nowAlbum][this.nowIdx]}`;
                this.$refs.img.style.display = 'none';
                this.$refs.load.style.display = 'block';
                var smallimg = new Image();
                smallimg.src = smallpic;
                var bigimg = new Image();
                bigimg.src = bigpic;
                var self = this;

                smallimg.onload = function () {
                    self.$refs.img.style.display = 'block';
                    self.$refs.img.src = smallimg.src;
                    self.$refs.load.style.display = 'none';
                   
                }
                bigimg.onload = function () {
                    self.$refs.img.src = bigimg.src;
                    self.setMargin();
                }
            },
            setMargin(){
                //拉回自己的一半
                var imgW = (document.documentElement.clientWidth - 320) * 0.9;
                this.$refs.picbox.style.width = imgW+ 'px';
                this.$refs.picbox.style.marginLeft = -imgW / 2 + 'px';
                //高度已经自动变化了，img就有这个特点，改变width，高度就会变化。
                var imgH = parseInt(getComputedStyle(this.$refs.img)["height"]);
                this.$refs.picbox.style.marginTop = -imgH / 2 + 'px';
            }
        },
        watch : {
            nowIdx(){
                this.changePic();
            },
            nowAlbum(){
                this.changePic();
            },
            carinfo(){
                this.changePic();
            }
        }
    }
</script>

<style scoped lang = "less">
    .lefts{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding-right: 320px;
         .inner{
            position: relative;
            height:100%;
            .picbox{
                position: absolute;
                left: 50%;
                top: 50%;

                .imgs{
                    width: 100%;
                }
                .load{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 200px;
                    height: 200px;
                    transform: translate(-50%, -60%)
                }
                .lbtn{
                    position: absolute;
                    top: 50%;
                    left: 0;
                    margin-top: -25px;
                    width: 30px;
                    height: 50px;
                    color: #fff;
                    background:rgba(0, 0, 0, 0.2);
                    border: 1px solid #666;
                    cursor:pointer;
                   
                }
                .rbtn{
                    position: absolute;
                    top: 50%;
                    right: 0;
                    margin-top: -25px;
                    width: 30px;
                    height: 50px;
                    color: #fff;
                    background:rgba(0, 0, 0, 0.2);
                    border: 1px solid #666;
                    cursor:pointer;
                }
                .l{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 50%;
                    height: 100%;
                    cursor: url(/images/cursor_left.cur),auto;
                }
                .r{
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 50%;
                    height: 100%;
                    cursor: url(/images/cursor_right.cur), auto;
                }
                
            }
        }
    }
</style>