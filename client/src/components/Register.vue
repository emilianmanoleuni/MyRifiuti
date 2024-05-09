<template>
    <div>
        <h1>Register</h1>
        <label for="name">Name:</label>
        <input type="text" name="name" v-model="name" placeholder="name">
        <span class="error" v-if="serverErrors.name">{{ serverErrors.name }}</span>
        <br>
        <label for="surname">Surname:</label>
        <input type="text" name="surname" v-model="surname" placeholder="surname">
        <span class="error" v-if="serverErrors.surname">{{ serverErrors.surname }}</span>
        <br>
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email" placeholder="email">
        <span class="error" v-if="serverErrors.email">{{ serverErrors.email }}</span>
        <br>
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" placeholder="password">
        <span class="error" v-if="serverErrors.password">{{ serverErrors.password }}</span>
        <br>
        <button @click="register">Register</button>
        <span class="error" v-if="serverErrors.general">{{ serverErrors.general }}</span>
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
            password: '',
            serverErrors: {}
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
        async register() {
            try {
                const response = await AuthenticationService.register({
                    name: this.name,
                    surname: this.surname,
                    email: this.email,
                    password: this.password
                });
                console.log(response.data);
                this.$store.dispatch('setToken', response.data.token);
                this.$store.dispatch('setUser', response.data.user);
                this.$router.push('/');  // Redirect to FirstPage
            } catch (error) {
                if (error.response && error.response.data && error.response.data.errors) {
                    // Clean errors if already exists
                    this.serverErrors = {};

                    // Push errors to struct Error
                    error.response.data.errors.forEach(err => {
                        this.serverErrors[err.path] = err.msg;
                    });
                } else {
                    this.serverErrors.general = 'An error occurred, please try again.';
                    console.error('Registration error:', error);
                }
            }
        }
    }
}
</script>

<style scoped>
.error {
    color: red;
}
</style>