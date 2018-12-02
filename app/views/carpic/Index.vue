<template>
    <div class = "carpic">
        <div class = "left">
            <Bigpic></Bigpic>
        </div>
        <div class = "right">
            <div>
                <Carinfo></Carinfo>
            </div>
            <div>
                <Choosealbum></Choosealbum>
            </div>
            <div>
                <Smallpic></Smallpic>
            </div>
        </div>
        <Comparebtn></Comparebtn>
    </div>
</template>

<script>
    import Bigpic from './Bigpic';
    import Carinfo from './Carinfo';
    import Choosealbum from './Choosealbum';
    import Smallpic from './Smallpic';
    import Comparebtn from '../../components/Comparebtn';
    export default {
        components : {
            Bigpic,Carinfo,Choosealbum,Smallpic,Comparebtn
        },
        beforeCreate() {
            this.$store.dispatch("carinfoStore/init",{"id" : this.$route.params.id})
        },
    }
</script>

<style scoped lang = "less">
    .carpic{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        color:#fff;
        min-height: 600px;
        background: #000;
        padding-right: 320px;

        .right{
            position: absolute;
            top: 0;
            right: 0;
            width: 320px;
            height: 100%;
            padding: 10px;
            border-left: 1px solid #888;

            &>div{
                overflow: hidden;
                margin-bottom: 20px;
                clear : both;
            }
        }
    }
</style>