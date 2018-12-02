<template>
    <div>
        <Tabs  @on-click="changeBrand">
            <TabPane v-for="item in arr" :key="item.brands"  :label="item.brands" >
                <span  v-for="i in item.series" :key="i" @click="changeSeries(i)">{{i}}</span>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    export default {
        props : ["arr"],
        computed : {
            brand(){
                return this.$store.state.findcarStore.brand;
            }
        },
        methods : {
            changeBrand(n){
                this.$store.dispatch("findcarStore/changeBrand",{brand: this.arr[n].brands});
            },
            changeSeries(series){
                this.$store.dispatch("findcarStore/changeSeries",{series});
            }
        }
    }
</script>

<style scoped lang="less">
    span{
        margin-left: 20px;
        cursor: pointer;
        &:hover{
            color : blue;
        }
       
    }
</style>