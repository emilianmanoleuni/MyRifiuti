<template>
    <div class="registerBlock">
        <img src="../assets/logo.svg">
        <h1>Sign In</h1>
        <input type="email" name="email" v-model="email" placeholder="email">
        <br>
        <input type="password" name="password" v-model="password" placeholder="password">
        <br>
        <button @click="signIn">Sign In</button>
        <button @click="navigateTo({name: 'register'})">Register</button>
        <br>
        <button @click="anonimous">Continua come Anonimo</button>
        <br>
        Sei un Ente? Clicca<a @click="ente"> qui</a>
    </div>
</template>

<script>
export default{
    methods: {
        navigateTo (route){
            this.$router.push(route)
        }
    }
}
</script>

<style scoped>
    div.registerBlock{
        width: 350px;
        height: 400px;
        background-color: rgb(0, 82, 66);
    }
</style>
