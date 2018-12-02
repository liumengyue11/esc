export default {
    namespaced : true,
    state : {
        columnname : "", //栏目名称
        col2ndname : ""  //二级栏目名称
    },
    mutations : {
        changeColumnname(state, {cn}){
            state.columnname = cn
        },
        changeCol2ndname(state, {cn}){
            state.col2ndname = cn
        }
    }
}