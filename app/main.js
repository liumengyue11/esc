import Vue from 'vue';
import Vuex from 'vuex';
import iview from 'iview';
import VueRouter from 'vue-router';
import VueDraggable from 'vue-draggable';


import App from './App';
import getRouter from "./router";
import storeObj from './store';
import rounding from './filter/rounding';
import qianfenfu from './filter/qianfenfu';
import getyearfromtimestamp from './filter/getyearfromtimestamp';
import Tupian from './components/Tupian';
import Changeavatar from './components/changeavatar';

Vue.use(Vuex);
Vue.use(iview);
Vue.use(VueRouter);
Vue.use(VueDraggable);

// 定义过滤器
Vue.filter("rounding" , rounding);
Vue.filter("qianfenfu" , qianfenfu);
Vue.filter("getyearfromtimestamp" , getyearfromtimestamp);
Vue.component("Tupian", Tupian);
Vue.component("Changeavatar", Changeavatar);

// 创建store对象
const store = new Vuex.Store(storeObj);
new Vue({
    el : "#app",
    render(h){
        return h(App);
    },
    // 配置路由,router文件中要用到store
    router : getRouter(store),
    store
})