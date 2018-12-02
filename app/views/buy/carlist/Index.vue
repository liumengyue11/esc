<template>
    <div>
        <MyFilter></MyFilter>
        <div class = "h20"></div>
        <Tablelist></Tablelist>
        <Comparebtn></Comparebtn>
    </div>
</template>

<script>
    import MyFilter from './MyFilter';
    import Tablelist from './Tablelist';
    import Comparebtn from '../../../components/Comparebtn';

    export default {
        beforeCreate() {
            this.$store.dispatch("findcarStore/init");
        },
        components : {
            Tablelist,
            MyFilter,
            Comparebtn
        }
    }
</script>

<style scoped lang = "less">
    .h20{
        height:20px;
    }
</style>