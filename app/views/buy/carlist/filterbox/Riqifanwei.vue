<template>
    <div>
        <DatePicker type="daterange" placeholder="Select date" :clearable = 'false' style="width: 200px" 
        :value ="date"
        @on-change = "changeFilter"></DatePicker>
    </div>
</template>

<script>
    export default {
        props : ["english"],
        computed :{
            getdatefromfilter(){
                return this.$store.state.findcarStore.filters.filter(item => item.k == this.english)[0];
            },
            date : {
                get(){
                    if(this.getdatefromfilter){
                        return this.getdatefromfilter.v.split("to").map(item => new Date(Number(item)));
                    }else{
                        return []
                        
                    }
                }
            }
        },
        methods : {
            changeFilter(v){
                this.$store.dispatch("findcarStore/changeFilters", {k : this.english, 
                v : v.map(item => Date.parse(item)).join("to")});
            }
        }
    }
</script>

<style scoped>

</style>