<template>
    <h1>HomePage</h1>
    <button @click="navigateTo({name: 'homepage'})">HomePage</button>
    <button @click="navigateTo({name: 'map'})">Map</button>
    <br>
</template>

<script>
export default{
    methods: {
        navigateTo (route){
            this.$router.push(route)
        },
    }
}
</script>

<style scoped>

</style>
