export default {
    namespaced : true,
    state : {
        arr : []
    },
    mutations : {
        addCar(state, {carinfo}){
           state.arr.push(carinfo);
        },
        delCar(state, {id}){
            state.arr = state.arr.filter(item=>item.id != id);
        }
    },
    actions : {
        
    }
}