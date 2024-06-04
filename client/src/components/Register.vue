<template>
  <v-container class="registerBlock" j>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-row class="topBlockLogoName">
            <v-col cols="6">
              <v-img class="topImage" src="/logo.png" height="60"></v-img>
            </v-col>
            <v-col cols="6">
              <v-card-title class="text-h3 topTitle">MyRifiuti</v-card-title>
            </v-col>
          </v-row>
          <v-card-title class="text-h4">Register</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Nome"
                v-model="name"
                :error-messages="serverErrors.name"
                placeholder="Inserisci il tuo nome"
                outlined
              ></v-text-field>

              <v-text-field
                label="Cognome"
                v-model="surname"
                :error-messages="serverErrors.surname"
                placeholder="Inserisci il tuo cognome"
                outlined
              ></v-text-field>

              <v-text-field
                label="Email"
                v-model="email"
                :error-messages="serverErrors.email"
                placeholder="Inserisci la tua mail"
                type="email"
                outlined
              ></v-text-field>
              
              <v-select
                label="Zona di raccolta"
                :items="circoscrizioni"
                :error-messages="serverErrors.zone"
                v-model="zone"
              ></v-select>

              <v-text-field
                label="Password"
                v-model="password"
                :error-messages="serverErrors.password"
                placeholder="Inserisci la tua password"
                :type="showPassword ? 'text' : 'password'"
                outlined
                @click:append-inner="showPassword = !showPassword"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end bottomButtons">
            <v-btn class="backRegisterButton" variant="elevated" color="buttonsLight" :to="{ name: 'login' }">Back</v-btn>
            <v-btn class="registerButton" variant="elevated" color="buttons" @click="register">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-alert
      v-if="serverErrors.general"
      type="error"
      dense
    >{{ serverErrors.general }}</v-alert>
  </v-container>
</template>


<script>
import AuthenticationService from '@/services/AuthenticationService'
import MapService from '@/services/MapService'
import { required, email, minLength, helpers } from '@vuelidate/validators'

export default {
    data () {
        return {
            name: '',
            surname: '',
            email: '',
            zone: '',
            password: '',
            circoscrizioni: [],
            showPassword: false,
            serverErrors: {},
        }
    },
    validations() {
        return {
            form: {
                name: { required },
                surname: { required },
                zone: { required },
                email: { required, email},
                password: { required, minLength: minLength(6) }
            } 
        }
    },
    mounted(){
      MapService.getZone()
      .then(zoneArray => {
        console.log(zoneArray)
        this.circoscrizioni = [...zoneArray];
      })
      .catch(msg => {
        console.log(msg);
      })
    },
    methods: {
        async register() {
            try {
                const response = await AuthenticationService.register({
                    name: this.name,
                    surname: this.surname,
                    zone: this.zone,
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
  .registerBlock{
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
  .bottomButtons{
    margin-top: -25px;
  }
  .backRegisterButton{
    margin-bottom: 5px;
  }
  .registerButton{
   margin-bottom: 5px;
   margin-right: 8px;
  }
</style>