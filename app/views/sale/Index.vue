<template>
    <div>
         <Layout style = "padding : 50px">
            <Card>
                <Steps :current="step-1">
                    <Step :title="setTitle(1)" content="完善信息"></Step>
                    <Step :title="setTitle(2)" content="上传图片"></Step>
                    <Step :title="setTitle(3)" content="这里是该步骤的描述信息"></Step>
                    <Step :title="setTitle(4)" content="这里是该步骤的描述信息"></Step>
                </Steps>
            </Card>
            <div class = "h10"></div>
            <Card>
                <div :is="'Step'+step"></div>
            </Card>
         </Layout>
    </div>
</template>

<script>
    import Step1 from './Step1';
    import Step2 from './Step2';
    import Step3 from './Step3';
    import Step4 from './Step4';
    export default {
        computed : {
            step(){
                return this.$store.state.stepStore.step;
            }
        },
        methods : {
            setTitle(n){
                if(n > this.step){
                    return "待进行";
                }else if(n == this.step){
                    return "进行中";
                }else{
                    return "已完成";
                }
            }
        },
        components : {
            Step1,Step2,Step3,Step4
        }
    }
</script>

<style scoped lang = "less">
    .h10{
        height: 10px;
    }
</style>