<template>
    <div>

        <div v-drag-and-drop:options="options">
            
            <h3>备选列表项:</h3>
            <ul>
                <li v-for ="item in unexist()" :key="item.e" :data-e="item.e">{{item.c}}</li>
            </ul>
            <h3>当前列表项</h3>
            <ul id = "list">
                <li v-for ="item in exist()" :key="item.e" :data-e="item.e">{{item.c}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    var allcols = [
        {"c" : "发动机" , "e" : "engine"},
        {"c" : "购买日期" , "e" : "buydate"},
        {"c" : "是否有牌" , "e" : "license"},
        {"c" : "排放" , "e" : "exhaust"},
        {"c" : "形象照" , "e" : "avatar"},
        {"c" : "ID" , "e" : "id"},
        {"c" : "品牌" , "e" : "brand"},
        {"c" : "车系" , "e" : "series"},
        {"c" : "颜色" , "e" : "color"},
        {"c" : "售价" , "e" : "price"},
        {"c" : "公里数" , "e" : "km"},
        {"c" : "变速箱" , "e" : "gearbox"},
        {"c" : "燃料" , "e" : "fuel"}
    ]
    export default {
        props : ["colSort"],
        data(){
            return {
                options : {
                    dropzoneSelector: 'ul',
                    draggableSelector: 'li',
                    excludeOlderBrowsers: true,
                    multipleDropzonesItemsDraggingEnabled: true,
                    showDropzoneAreas: true,
                    onDrop: function(event) {},
                    onDragstart: function(event) {},
                    onDragend: function(event) {}
                }
            }
        },
        methods : {
            // 当前列表
            exist(){
                var arr = [];
                allcols.forEach(item =>{
                    if(this.colSort.includes(item.e)){
                        arr.push(item);
                    }
                });
                return arr;
            },
            // 备选
            unexist(){
                var arr = [];
                allcols.forEach(item =>{
                    if(!this.colSort.includes(item.e)){
                        arr.push(item);
                    }
                });
                return arr;
            },
        }
    }
</script>

<style scoped lang = "less">
    ul{
        list-style: none;
        overflow: hidden;
        li{
            float: left;
            margin-right: 5px;
            padding: 5px;
            border:1px solid skyblue;
            border-radius: 5px;
        }
    }

</style>