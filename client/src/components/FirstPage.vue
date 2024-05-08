<template>
    <div class="registerBlock">
        <img src="../assets/logo.svg">
        <h1>Login</h1>
        <input type="email" name="email" v-model="email" placeholder="email">
        <br>
        <input type="password" name="password" v-model="password" placeholder="password">
        <br>
        <button @click="login">Login</button>
        <button @click="navigateTo({name: 'register'})">Register</button>
        <br>
        <button @click="navigateTo({name: 'homepage'})">Continua come Anonimo</button>
        <br>
        Sei un Ente? Clicca<a @click="ente"> qui</a>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import { email } from '@vuelidate/validators';

export default{
    data() {
        return {
            form: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async login() {
            try {
                const response = await AuthenticationService.login({
                    email: this.email,
                    password: this.password
                });
                console.log('Logged in:', response);
                // Handle successful login
            } catch (error) {
                console.error('Login failed:', error);
                console.log('Login failed:', error);
            }
        },
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
