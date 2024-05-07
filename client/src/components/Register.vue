<template>
    <div>
        <h1>Register</h1>
        <input type="text" name="name" v-model="name" placeholder="name">
        <br>
        <input type="text" name="surname" v-model="surname" placeholder="surname">
        <br>
        <input type="email" name="email" v-model="email" placeholder="email">
        <br>
        <input type="password" name="password" v-model="password" placeholder="password">
        <br>
        <button @click="register">Sign In</button>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
    data () {
        return {
            name: '',
            surname: '',
            email: '',
            password: ''
        }
    },
    methods: {
        async register () {
            const response = await AuthenticationService.register({
                name: this.name,
                surname: this.surname,
                email: this.email,
                password: this.password
            })
            console.log(response.email)
        }
    }
}
</script>

<style scoped>

</style>
