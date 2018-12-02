<template>
    <div class = "bg">
        <div class = "login">
             <Form ref="formInline" :model="formInline">
                <h2>二手车交易市场内部系统</h2>
                <div style = "height : 20px"></div>
                <FormItem prop="username">
                    <Input type="text" v-model="formInline.username" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit">登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data(){
            return {
                formInline : {
                    username : "",
                    password : ""
                }
            }
        },
        methods : {
            handleSubmit(){
                axios.post("/api/login",{
                    username : this.formInline.username,
                    password : this.formInline.password
                }).then(data=>{
                    if(data.data.result == 1){
                        this.$router.push({"name": "index"});
                    }else{
                        this.$Message.error('用户名或密码错误！');
                        
                    }
                });
            }
        }
    }
</script>

<style scoped lang = "less">
    .bg{
        position: fixed;
        width: 100%;
        height: 100%;
        background-image:-webkit-radial-gradient(left bottom, #033253, #048ea5);
        .login{
            position: absolute;
            left: 50%;
            top: 50%;
            width: 500px;
            height: 260px;
            margin-left: -250px;
            margin-top: -130px;
            background: #fff;
            box-sizing: border-box;
            border-radius: 5px;
            padding: 20px;
        }
    }
</style>