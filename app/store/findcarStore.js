import axios from "axios";
import querystring from 'querystring';

export default {
    namespaced : true,
    state : {
        results : [],
        total : 0,
        page : 1,
        pagesize : 10,
        sortby : "id",
        sortdirection : 1,
        filters : [],
        series : "",
        brand : ""
    },
    mutations : {
        changeResults(state, {results}){
            state.results = results;
        },
        changeTotal(state, {total}){
            state.total = total;
        },
        changePage(state, {page}){
            state.page = page;
        },
        changePagesize(state, {pagesize}){
            state.pagesize = pagesize;
        },
        changeSortby(state, {sortby}){
            state.sortby = sortby;
        },
        changeSortdirection(state, {sortdirection}){
            state.sortdirection = sortdirection;
        },
        changeSeries(state, {series}){
            state.series = series;
        },
        changeBrand(state, {brand}){
            
            state.brand = brand;
        },
        // 增加筛选条件
        addFilter(state, {k, v}){
            state.filters.push({k, v});
        },
        // 修改筛选条件
        updateFilter(state, {k, v}){
            state.filters = state.filters.map(item => item.k == k ? {...item, v} : item);
        },
        delFilter(state, {k}){
            state.filters = state.filters.filter(item => item.k != k);
        }
    },
    actions : {
        async init({commit, state}){
            const {page, pagesize, sortby, sortdirection, filters, series,brand} = state;
            // 将filters数组变为对象
            var filterObj = {
                page,
                pagesize,
                sortby,
                sortdirection,
                series,
                brand
            };
            for(let i = 0; i < filters.length; i++){
                filterObj[filters[i].k] = filters[i].v;
            }
            
            const {results, total} = await axios.get("/api/findcar?" + querystring.stringify(filterObj)).then(data => data.data);
            commit("changeResults", {results});
            commit("changeTotal", {total});
        },
        changePage({commit, dispatch}, {page}){
            commit("changePage",{page});
            dispatch("init");
        },
        changePagesize({commit, dispatch}, {pagesize}){
            commit("changePagesize",{pagesize});
            commit("changePage",{page : 1});
            dispatch("init");
        },
        changeSort({commit, dispatch}, {sortby, sortdirection}){
            commit("changeSortby",{sortby});
            commit("changeSortdirection",{sortdirection : sortdirection == "asc" ? 1 : -1});
            commit("changePage",{page : 1});
            dispatch("init");
        },
        changeFilters({commit, state, dispatch}, {k, v}){
            var isExist = false;
            // 遍历k是否存在
            state.filters.forEach(item => {
                if(item.k == k){
                    isExist = true;
                }
            })
            
            if(isExist){
                commit("updateFilter",{k, v});
            }else{
                commit("addFilter",{k, v});
            }

            commit("changePage",{page : 1});
            dispatch("init");
        },
        delFilter({commit, dispatch}, {k}){
            commit("delFilter",{k});
            commit("changePage",{page : 1});
            dispatch("init");
        },
        changeSeries({commit, dispatch}, {series}){
            commit("changeSeries",{series});
            commit("changePage",{page : 1});
            dispatch("init");
        },
        changeBrand({commit, dispatch}, {brand}){
            commit("changeSeries",{series : ""});
            commit("changeBrand",{brand});
            commit("changePage",{page : 1});
            dispatch("init");
        }
    }
}