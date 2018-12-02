export default {
    namespaced : true,
    state : {
        step : 1
    },
    mutations : {
        changeStep(state, {step}){
            alert(step)
            state.step = step;
        }
    },
    actions :{

    }
}