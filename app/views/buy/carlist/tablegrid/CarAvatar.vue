<template>
    <div class = "box">
        <router-link :to="{'name' : 'carpic' , 'params' : {'id' : row.id}}">
            <img :src="`http://127.0.0.1:3000/images/carimages_small/${row.id}/view/${row.avatar}`">
        </router-link>
        <span class = "add" v-if="!isInCompare" @click="addCompare">加入对比</span>
        <span class = "yijiia" v-if="isInCompare">已加入对比</span>
        <span class = "del" v-if="isInCompare" @click="delCompare">取消对比</span>
    </div>
</template>

<script>
    export default {
        props : ["row"],
        data(){
            return {
                isInCompare : false
            }
        },
        created() {
            this.checkIn();

        },
        computed : {
            getCompareArr(){
                return this.$store.state.compareStore.arr;
            }
        },
        methods : {
            addCompare(){
                if(this.getCompareArr.length < 5){
                    this.$store.commit("compareStore/addCar",{carinfo : this.row})
                }else{
                        this.$Message.warning('最多只能对比5辆车！');
                }
            },
            delCompare(){
                 this.$store.commit("compareStore/delCar",{id : this.row.id});

            },
            checkIn(){
                for(let i = 0; i < this.getCompareArr.length; i++){
                    if(this.row.id == this.getCompareArr[i].id){
                        this.isInCompare = true;
                        return;
                    }
                }
                // 不在getCompareArr里
                this.isInCompare = false;
            }
        },
        watch : {
            getCompareArr(){
                this.checkIn();
            }
        }
    }
</script>

<style scoped lang = "less">
    img{
        width: 100%;
    }
    .box{
        position: relative;
        .add{
            display: none;
            position: absolute;
            right: 0;
            top: 0;
            width: 60px;
            height: 20px;
            text-align: center;
            color : #fff;
            background: orange;
            cursor: pointer;
        }
        .yijiia{
            position: absolute;
            right: 0;
            top: 0;
            width: 60px;
            height: 20px;
            text-align: center;
            color : #fff;
            background: green;
            cursor: pointer;
        }
        .del{
            display: none;
            position: absolute;
            right: 0;
            top: 0;
            width: 60px;
            height: 20px;
            text-align: center;
            color : #fff;
            background: red;
            cursor: pointer;
        }
        /* v-if控制只显示add或del */
        &:hover .add{
            display: block;
        }

        &:hover .yijia{
            display: none;
        }
         &:hover .del{
            display: block;
        }

    }

</style>