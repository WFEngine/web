<template>
    <h1 class="title">Update Item</h1>
</template>

<script>
export default {
    created(){
        var requestItem = {
            id : this.$route.parmas.id
        }

        console.log(requestItem)
    }
}
</script>