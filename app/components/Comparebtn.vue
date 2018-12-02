<template>
    <div>
        <Comparecar :isOpen="isOpen" :arr = "getCompareArr" @close ="closeDraw"></Comparecar>
        <div class = "comparebtn" @click="showDraw">
            {{getCompareArr.length}}
        </div>
    </div>
</template>

<script>
    import Comparecar from './Comparecar';
    export default {
        data(){
            return {
                isOpen : false
            }
        },
        methods : {
            showDraw(){
                this.isOpen = true ;
            },
            closeDraw(){
                this.isOpen = false ;
            }
        },
        components : {
            Comparecar
        },
        computed : {
            getCompareArr(){
                return this.$store.state.compareStore.arr;
            }
        }
    }
</script>

<style scoped lang = "less">
    .comparebtn{
        position: fixed;
        right: 30px;
        bottom: 60px;
        width: 50px;
        height: 50px;
        background: rgb(253, 156, 10);
        border-radius: 50%;
        z-index: 100;
        color: #fff;
        font-size: 30px;
        text-align: center;
        line-height: 50px;
        font-weight: bold;
        cursor: pointer;
    }
</style>