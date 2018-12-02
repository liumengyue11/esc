<template>
    <div>
         <Row>
            <Col span = "1" offset = "23">
                <Button type="primary" shape="circle" icon="md-settings" style = "font-size: 22px" @click="changeShow(true)"></Button>
            </Col>
        </Row>
        <div class = "h10"></div>
        <Table :columns="cols" :data="results" @on-sort-change ="changeSort"></Table> 
        <div class = "h10"></div>
        <Page :total="total" :current="page" :page-size ="pagesize" show-sizer
        @on-change="changePage" @on-page-size-change ="changePagesize"/>

         <Modal
            v-model="show"
            title="修改列表项"
            @on-ok="ok"
            @on-cancel="cancel">
            <div ref = "modalbox" v-if = "show">
                <SetModal :colSort = "colSort"></SetModal>
            </div>
        </Modal>
    </div>
</template>

<script>
    import colConfig from './colConfig';
    import SetModal from './SetModal';
    export default {
        data(){
            return {
                //列排序
                colSort : ["avatar" , "id" ,  "brand" , "series" , "price" , "km"],
                cols : [],
                show : false
            }
        },
        created() {
            this.setCols();
        },
        mounted() {
            $(".ivu-table-tbody").sortable();
            
        },
        computed : {
           results(){
               return this.$store.state.findcarStore.results;
           },
           total(){
               return this.$store.state.findcarStore.total;
           },
           page(){
               return this.$store.state.findcarStore.page;
           },
           pagesize(){
               return this.$store.state.findcarStore.pagesize;
           }
       },
       methods : {

           setCols(){
               this.cols = [];
               for(let i = 0; i < this.colSort.length; i++){
                   for(let j = 0; j < colConfig.length; j++){
                       if(this.colSort[i] == colConfig[j].key){
                           this.cols.push(colConfig[j]);
                       }
                   }
               }
           },
           changePage(page){
               this.$store.dispatch("findcarStore/changePage", {page});
           },
           changePagesize(pagesize){
               this.$store.dispatch("findcarStore/changePagesize", {pagesize});
           },
           changeSort({key, order}){
               this.$store.dispatch("findcarStore/changeSort", {sortby : key, sortdirection : order});
           },
           changeShow(n){
               this.show = n
           },
           ok(){
               var arr = [];
                $(this.$refs.modalbox).find("#list li").each(function(){
                    arr.push($(this).attr("data-e"));
                });
                //改变colSort
               this.colSort = arr;
                //改变cols    
               this.setCols()
                //关闭模态框
               this.show = false;
           },
           cancel(){
              this.show = false 
           }
       },
       components : {
           SetModal
       }
    }
</script>

<style scoped lang = "less">
    .h10{
        height: 10px;
    }
</style>