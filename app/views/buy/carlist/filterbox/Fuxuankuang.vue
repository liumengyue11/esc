<template>
    <div>
        <CheckboxGroup v-model = "date">
            <Checkbox v-for="item in options" :key="item" :label="item"></Checkbox>
        </CheckboxGroup>
    </div>
</template>

<script>
    export default {
        props : ["options", "english"],
        computed : {
            getdatefromfilter(){
                // 得到与自己English相同的对象
                return this.$store.state.findcarStore.filters.filter(item=>item.k == this.english)[0]
            },
            date : {
                get(){
                    // 如果filters中有此筛选项
                    if(this.getdatefromfilter){
                        return this.getdatefromfilter.v.split("v");
                    }else{
                        return [];
                    }
                },
                set(v){
                    this.$store.dispatch("findcarStore/changeFilters", {k : this.english , v : v.join("v")})
                }
            }
        }
    }
</script>

<style scoped>

</style>