import axios from 'axios';
export default {
    namespaced : true,
    state : {
        nowAlbum : "view",
        nowIdx : 0,
        result : {}
    },
    mutations : {
        changeCarinfo(state,{result}){
            state.result = result
        },
        changeNowAlbum(state,{nowAlbum}){
            state.nowAlbum = nowAlbum
        },
        changeNowIdx(state,{nowIdx}){
            state.nowIdx = nowIdx
        }
    },
    actions : {
        async init({commit}, {id}){
            const {result} = await axios.get("/api/carinfo?id=" + id).then(data => data.data);
            commit("changeCarinfo", {result})
        },
        changeNowAlbum({commit}, {nowAlbum}){
            commit("changeNowAlbum", {nowAlbum});
            commit("changeNowIdx", {nowIdx : 0});
        },
        goNext({commit, state}){
            if(state.nowIdx < state.result.images[state.nowAlbum].length -1){
                commit("changeNowIdx",{nowIdx : state.nowIdx + 1})
            }else{
                commit("changeNowIdx",{nowIdx : 0})
                var arr = ["view", "inner", "engine", "more"];
                // 当前图集序号
                var nowAlbumIdx = arr.indexOf(state.nowAlbum);
                // 下一图集序号
                var nextAlbumIdx = (nowAlbumIdx + 1) % 4;
                commit("changeNowAlbum",{nowAlbum : arr[nextAlbumIdx]})
            }
        },
        goPrev({commit, state}){
            if(state.nowIdx > 0){
                commit("changeNowIdx",{nowIdx : state.nowIdx - 1})
            }else{
                var arr = ["view", "inner", "engine", "more"];
                // 当前图集序号
                var nowAlbumIdx = arr.indexOf(state.nowAlbum);
                // 上一图集序号
                var prevAlbumIdx = nowAlbumIdx - 1 >= 0 ? nowAlbumIdx - 1 : 3;
                commit("changeNowAlbum",{nowAlbum : arr[prevAlbumIdx]});
                commit("changeNowIdx",{nowIdx : state.result.images[state.nowAlbum].length - 1 });
            }
        }
    }
}