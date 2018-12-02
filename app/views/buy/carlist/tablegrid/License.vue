<template>
    <div>
        {{license ? "是" : "否"}}
    </div>
</template>

<script>
    export default {
        props : ["license"]
    }
</script>

<style scoped>

</style>