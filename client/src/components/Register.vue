<template>
    <div>
        <h1>Register</h1>
        <label for="name">Name:</label>
        <input type="text" name="name" v-model="name" placeholder="name">
        <br>
        <label for="surname">Surname:</label>
        <input type="text" name="surname" v-model="surname" placeholder="surname">
        <br>
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email" placeholder="email">
        <div class="error" v-html="error"></div>
        <br>
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" placeholder="password">
        <br>
        <button @click="register">Register</button>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import { required, email, minLength, helpers } from '@vuelidate/validators'

export default {
    data () {
        return {
            name: '',
            surname: '',
            email: '',
            password: ''
        }
    },
    validations() {
        return {
            form: {
                name: { required },
                surname: { required },
                email: { 
                    required, 
                    email,
                    isUnique: helpers.withAsync(async () => {
                        try {
                            const response = await AuthenticationService.checkEmail('/api/checkEmail', { email: this.form.email });
                            return response.data.isUnique; // Il server deve restituire { isUnique: true } o { isUnique: false }
                        } catch (e) {
                            return false;
                        }
                    })
                },
                password: { required, minLength: minLength(6) }
            } 
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
.error {
    color: red;
}
</style>
