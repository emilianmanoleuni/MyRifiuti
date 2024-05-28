<template>
    <v-container class="loginEnteBlock">
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
                    <v-card-title class="text-h4">Ente Login</v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                label="Ente"
                                prepend-icon="mdi-account"
                                type="username"
                                v-model="username"
                                placeholder="Inserisci l'ente"
                                outlined
                            ></v-text-field>
                                
                            <v-text-field
                                label="Password"
                                prepend-icon="mdi-lock"
                                type="password"
                                v-model="password"
                                placeholder=" Inserisci la password"
                                outlined
                            ></v-text-field>
                
                            <v-alert
                                v-if="serverErrors"
                                type="error"
                                style="margin-bottom: 15px;"
                                dense
                            >{{ serverErrors }}</v-alert>
                                
                            <v-row cols="12">
                                <v-col>
                                    <v-btn class="enteBackButton" color="buttonsLight" :to="{ name: 'login' }" block>Back</v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn class="enteLoginButton" variant="elevated" color="buttons" @click="loginEnte" block>Login</v-btn>
                                </v-col>
                            </v-row>

                        </v-form>
                    </v-card-text>
                </v-card>
                <v-card class="alertEnteLogin">
                    <v-card-title class="text-h6" align="center">Attenzione questa è un'area riservata!</v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
//import { username } from '@vuelidate/validators';

export default{
    data() {
        return {
            username: '',
            password: '',
            serverErrors: '',
        }
    },
    methods: {
        async loginEnte() {
            try {
                const response = await AuthenticationService.loginEnte({
                    username: this.username,
                    password: this.password
                });
                console.log('Logged in:', response)
                this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setUser', response.data.username)
                this.$router.push({name: 'enteHomepage'})
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
    .loginEnteBlock{
        margin-top: 70px;
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
    .enteBackButton{
        
    }
    .enteLoginButton{
        
    }
    .alertEnteLogin{
        margin-top: 15px;
        background-color: rgb(255, 255, 0);
    }
</style>
