<template>
    <v-container class="loginBlock">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-row class="topBlockLogoName">
              <v-col cols="6">
                <v-img class="topImage" src="/logo.png" height="60"></v-img>
              </v-col>
              <v-col cols="6">
                <v-card-title class="text-h3 topTitle">MyRifiuti</v-card-title>
              </v-col>
            </v-row>
            <v-card-title class="text-h4">Login</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Email"
                  prepend-icon="mdi-email"
                  type="email"
                  v-model="email"
                  placeholder="Inserisci la tua email"
                  outlined
                ></v-text-field>
                
                <v-text-field
                  label="Password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="password"
                  placeholder="Inserisci la tua password"
                  outlined
                ></v-text-field>
  
                <v-alert
                  v-if="serverErrors"
                  type="error"
                  style="margin-bottom: 15px;"
                  dense
                >{{ serverErrors }}</v-alert>
                
                <v-btn class="buttonsFirstPage" variant="elevated" color="buttons" @click="login" block>Login</v-btn>
                <v-btn class="buttonsFirstPage" variant="outlined" color="buttons" text :to="{ name: 'register' }" block>Register</v-btn>
                <v-btn class="buttonsFirstPage" variant="outlined" color="buttons" text :to="{ name: 'homepage' }" block>Continua come Anonimo</v-btn>
  
                <div class="text-center mt-3">
                  Sei un Ente? <v-btn color="buttonsLight" text :to="{ name: 'enteLogin' }">Clicca qui</v-btn>
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
            serverErrors: '',
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
                this.$router.push({name: 'homepage'})
            } catch (error) {
                if (error.response && error.response.data) {
                    this.serverErrors = 'Login non corretto riprovare';
                } else {
                    this.serverErrors.general = 'An error occurred, please try again.';
                }
                console.error('Login failed:', error);
            }
        }
    }
}
</script>

<style scoped>
    .loginBlock{
      margin-top: 200px;
      width: 60%;
    }
    .topBlockLogoName{
      margin-top: 2px;
    }
    .topImage{
      margin-top: 15px;
    }
    .topTitle{
      margin-left: -100px;
    }
    .error {
    color: red;
    }
    .buttonsFirstPage{
      margin-bottom: 5px; 
    }
</style>
