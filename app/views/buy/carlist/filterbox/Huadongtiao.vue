<template>
    <div>
        <Row>
            <Col span = "12">
                <Slider range :min ="min/conversion" :max ="max/conversion" :value ="v" 
                @on-change ="changeV" @on-input ="changingV"></Slider>
            </Col>
            <Col span = "11" offset = "1">
                <Input style = "width : 60px" v-model ="v1"/>
                ~
                <Input style = "width : 60px" v-model ="v2"/>
                <Button type = "info" @click = 'submitdate'>确定</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        props : ["options", "english", "min", "max", "conversion"],
        data(){
            return {
                v1 : this.min/this.conversion,
                v2 : this.max/this.conversion
            }
        },
        computed :{
            getdatefromfilters(){
                return this.$store.state.findcarStore.filters.filter(item=>item.k == this.english)[0];
            },
            v : {
                get(){
                    if(this.getdatefromfilters){
                        this.v1 = this.getdatefromfilters.v.split("to")[0] / this.conversion;
                        this.v2 = this.getdatefromfilters.v.split("to")[1] / this.conversion;
                        return this.getdatefromfilters.v.split("to").map(item => item/this.conversion);
                    }else{
                        return [this.min, this.max];
                    }
                }
            }
        },
        methods : {
            changeV(v){
                this.$store.dispatch("findcarStore/changeFilters", {k : this.english, v : v.map(item => item * this.conversion).join("to")});
            },
            submitdate(){
                
                if(isNaN(this.v1) || isNaN(this.v2)){
                    this.$Message.error('请输入数值！');
                    return;
                }
                if(this.v1 < 0 || this.v2 < 0){
                    this.$Message.error('数值不能为负！');
                    return;
                }
                if(this.v1 > this.v2){
                    this.$Message.error('最大值不能小于最小值！');
                    return;
                }
                this.$store.dispatch("findcarStore/changeFilters", {k : this.english, v : [this.v1 * this.conversion, this.v2 * this.conversion].join("to")});
            },
            changingV(v){
                this.v1 = v[0],
                this.v2 = v[1]
            }
        }
    }
</script>

<style scoped lang = "less">
    
</style>