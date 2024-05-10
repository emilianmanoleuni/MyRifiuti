<template>
    <v-container>
        <h1>HomePage Registered User</h1>
        <v-btn @click="navigateTo({name: 'homepage'})">HomePage</v-btn>
        <v-btn @click="navigateTo({name: 'map'})">Map</v-btn>
        <br>
        <h2 v-if="$store.state.isUserLoggedIn">SONO LOGGATO</h2>
    </v-container>
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
