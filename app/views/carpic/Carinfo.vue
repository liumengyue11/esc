<template>
    <div>
        <!-- rounding四舍五入，（1）：一位小数 -->
        <h1>{{carinfo.brand}}{{carinfo.series}}{{carinfo.color}}色{{carinfo.price | rounding(0)}}万</h1>
        <!-- getyearfromtimestamp：将时间戳变为年份 -->
        <h3>{{carinfo.km / 10000 | rounding(1)}}万公里{{carinfo.engine}}{{carinfo.gearbox}}{{carinfo.exhaust}}{{carinfo.buydate | getyearfromtimestamp}}年</h3>
    </div>
</template>

<script>
    export default {
        computed : {
            carinfo(){
                return this.$store.state.carinfoStore.result;
            }
        }
    }
</script>

<style scoped>

</style>