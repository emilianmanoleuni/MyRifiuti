<template>
    <v-container class="registerBlock">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-img src="/logo.png" height="60"></v-img>
            <v-card-title class="text-h3">MyRifiuti</v-card-title>
            <v-card-title class="text-h4">Login</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Email"
                  prepend-icon="mdi-email"
                  type="email"
                  v-model="email"
                  placeholder="Enter your email"
                  outlined
                ></v-text-field>
                
                <v-text-field
                  label="Password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="password"
                  placeholder="Enter your password"
                  outlined
                ></v-text-field>
  
                <v-alert
                  v-if="serverErrors"
                  type="error"
                  dense
                >{{ serverErrors }}</v-alert>
                
                <v-btn class="buttonsFirstPage" variant="elevated" color="buttons" @click="login" block>Login</v-btn>
                <v-btn class="buttonsFirstPage" variant="outlined" color="buttons" text @click="navigateTo({name: 'register'})" block>Register</v-btn>
                <v-btn class="buttonsFirstPage" variant="outlined" color="buttons" text @click="navigateTo({name: 'homepage'})" block>Continua come Anonimo</v-btn>
  
                <div class="text-center mt-3">
                  Sei un Ente? <v-btn text @click="ente" color="buttonsLight">Clicca qui</v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  

<script>
import AuthenticationService from '@/services/AuthenticationService'
import { email } from '@vuelidate/validators';

export default{
    data() {
        return {
            email: '',
            password: '',
            serverErrors: ''
        }
    },
    methods: {
        async login() {
            try {
                const response = await AuthenticationService.login({
                    email: this.email,
                    password: this.password
                });
                console.log('Logged in:', response)
                this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setUser', response.data.user)
                this.$emit('update-is-form', false);
                this.$router.push({name: 'homepage'})
            } catch (error) {
                if (error.response && error.response.data) {
                    this.serverErrors = 'Login non corretto riprovare';
                } else {
                    this.serverErrors.general = 'An error occurred, please try again.';
                }
                console.error('Login failed:', error);
            }
        },
        navigateTo (route){
            this.$router.push(route)
        }
    }
}
</script>

<style scoped>
    .error {
    color: red;
    }
    .buttonsFirstPage{
      margin-bottom: 5px; 
    }
</style>
