<template>
    <div>
        <Drawer title="车辆对比" :closable="false" :value="isOpen" @on-close="changeHandler">
            {{arr}}
        </Drawer>
    </div>
</template>

<script>
    export default {
        props : ["isOpen", "arr"],
        methods : {
            changeHandler(){
                this.$emit("close");
            }
        }
    }
</script>

<style scoped>

</style>