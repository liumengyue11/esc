<template>
    <div>
         <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" 
                :active-name="$store.state.routerStore.columnname"
                @on-select = "change">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="index">
                            <Icon type="ios-navigate"></Icon>
                            首页
                        </MenuItem>
                        <MenuItem name="buy">
                            <Icon type="ios-keypad"></Icon>
                            买车
                        </MenuItem>
                        <MenuItem name="sale">
                            <Icon type="ios-analytics"></Icon>
                            卖车
                        </MenuItem>
                        <MenuItem name="user">
                            <Icon type="ios-paper"></Icon>
                            用户
                        </MenuItem>
                         <MenuItem name="park">
                            <Icon type="ios-paper"></Icon>
                            停车场
                        </MenuItem>
                        <div style="color : white">
                            <Poptip>
                                <div slot="content">
                                    <ul>
                                        <li><a href="javascript:void(0)" @click="showModal">更改头像</a></li>
                                        <li><a href="javascript:void(0)">退出登录</a></li>
                                    </ul>
                                </div>
                                <Avatar style="cursor: pointer" v-if="!info.avatar" icon="ios-person" />
                                <Avatar style="cursor: pointer" v-if="info.avatar" :src="`http://127.0.0.1:3000/images/avatars/${info.username}.jpg`" />
                            </Poptip>
                            欢迎你，{{info.name}}
                        </div>
                    </div>
                </Menu>
            </Header>
        </Layout>
        <Changeavatar v-if="isShowModal" @close="closeModal"></Changeavatar>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                isShowModal : false
            }
        },
        methods : {
            change(n){
                if(n == "buy"){
                    n = "carlist";
                }
                this.$router.push({"name" : n});             
            },
            showModal(){
                this.isShowModal = true;
            },
            closeModal(){
                this.isShowModal = false;
            }
        },
        computed : {
            info(){
                return this.$store.state.meStore;
            }
        }
    }
</script>

<style scoped lang = "less">
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 600px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .layout-footer-center{
        text-align: center;
    }
</style>