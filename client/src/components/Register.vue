<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <h1>Register</h1>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Name"
                v-model="name"
                :error-messages="serverErrors.name"
                placeholder="Enter your name"
                outlined
              ></v-text-field>

              <v-text-field
                label="Surname"
                v-model="surname"
                :error-messages="serverErrors.surname"
                placeholder="Enter your surname"
                outlined
              ></v-text-field>

              <v-text-field
                label="Email"
                v-model="email"
                :error-messages="serverErrors.email"
                placeholder="Enter your email"
                type="email"
                outlined
              ></v-text-field>
              
              <v-select
                label="Pick-up zone"
                :items="circoscrizioni"
                :error-messages="serverErrors.zone"
                v-model="zone"
              ></v-select>

              <v-text-field
                label="Password"
                v-model="password"
                :error-messages="serverErrors.password"
                placeholder="Enter your password"
                type="password"
                outlined
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="elevated" color="buttons" @click="register">Register</v-btn>
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
      AuthenticationService.getZone()
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
  .error {
      color: red;
  }
</style>