import VueRouter from "vue-router";
import axios from "axios";

import IndexLayout from './views/index/IndexLayout';
import Index from './views/index';
import BuyLayout from './views/buy';
import Carlist from './views/buy/carlist';
import Ai from './views/buy/ai';
import Sifa from './views/buy/sifa';
import Sale from './views/sale';
import User from './views/user';
import Park from './views/park';
import Carpic from './views/carpic';
import Login from './views/login';

export default (store) => {
    const router = new VueRouter({
        routes: [
            {
                // 共同的头部
                "path" : "/index", 
                "component" : IndexLayout,
                "children" : [
                    // 首页
                    {
                        "path" : "index", 
                        "component" : Index,
                        "name" : "index"
                    },
                    // 买车栏目
                    {
                        "path" : "buy", 
                        "component" : BuyLayout,
                        "name" : "buy",
                        "children" : [
                            {
                                "path" : "",
                                "redirect": {"name": "carlist"}
                            },
                            {
                                "path" : "carlist", 
                                "component" : Carlist,
                                "name" : "carlist"
                            },
                            {
                                "path" : "ai", 
                                "component" : Ai,
                                "name" : "ai"
                            },
                            {
                                "path" : "sifa", 
                                "component" : Sifa,
                                "name" : "sifa"
                            }
                            
                        ]
                    },
                    // 卖车栏目
                    {
                        "path" : "sale", 
                        "component" : Sale,
                        "name" : "sale"
                    },
                    // 卖车栏目
                    {
                        "path" : "user", 
                        "component" : User,
                        "name" : "user"
                    },
                    // 卖车栏目
                    {
                        "path" : "park", 
                        "component" : Park,
                        "name" : "park"
                    }
                ]
            },
            {
                "path" : "carpic",
                "component" : Carpic,
                "name" : "carpic"
            },
            {
                "path" : "login",
                "component" : Login,
                "name" : "login"
            },
            {
                "path" : "*",
                "redirect" : {"name" : "login"}
            }
        ]
    });
   //每当用户切换路由的时候做的事情
   router.afterEach(async function (to, from){
        //如果用户访问的不是login，要判断是否已经登录
        if(to.fullPath != "/login"){
            const {status, info} = await axios.get("/api/me").then(data=>data.data);
            if(status == 1){
                store.commit("meStore/changeInfo",info);
            }else{
                router.push({"name" : "login"});
                return;
            }
        }
        
        // 有（）中的组件，buy、sale、park...
        if(/\/index\/(\w+)/.test(to.fullPath)){
            store.commit("routerStore/changeColumnname",
             {"cn" : to.fullPath.match(/\/index\/(\w+)/)[1]})
        }
        if(/\/index\/\w+\/(\w+)/.test(to.fullPath)){
            store.commit("routerStore/changeCol2ndname", 
            {"cn" : to.fullPath.match(/\/index\/\w+\/(\w+)/)[1]})
        }
    })
    return router;
   
}