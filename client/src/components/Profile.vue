<template>
    <v-container class="mainBody">
        <v-row>
            <v-col cols="2">
                <v-card align="center">
                    <v-card-title class="text-h5">Profilo</v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row cols="12">
            <v-col cols="12">
                <v-card class="profileBlock">
                    <v-card-title class="text-h7">Cambia la tua zona d'interesse</v-card-title>
                    <v-divider :thickness="3" class="divider"></v-divider>
                    <v-row cols="12" class="rowSetting">
                        <v-col cols="1"></v-col>
                        <v-col cols="1">
                            <v-card-title class="text-h7 settingTitle">Zona:</v-card-title>
                        </v-col>
                        <v-col cols="4">
                            <v-select
                                v-model="selectedLocation"
                                :items="locations"
                                label="Seleziona circoscrizione"
                                dense
                                style="margin-top: 10px;" 
                            ></v-select>
                        </v-col>
                        <v-col cols="1">
                            <v-btn variant="elevated" color="buttons applyBtnUpdateZone" @click="updateUserZone">Salva</v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';
import MapService  from '@/services/MapService';
import store from '@/store/store';

export default {
    data() {
        return {
            selectedLocation: '',
            locations: [],
        }
    },
    async mounted(){
        this.getUserZones();
        this.getZones();
    },
    methods: {
        getUserZones(){
            try {
                if(this.$store.state.isUserLoggedIn){
                    this.selectedLocation = this.$store.state.user.zone
                } else {
                    console.error('User not logged in')
                }
            } catch(error) {
                console.error('Error retrieving user zone')
            }
            
        },
        async updateUserZone(){
            try {
                const response = await AuthenticationService.updateUserZone({
                    userId: this.$store.state.user._id,
                    zone: this.selectedLocation,
                })

                //Update Local Storage
                if(response.statusText === "OK"){
                    this.$store.dispatch('updateUserZone', this.selectedLocation)
                }
            } catch(error) {
                console.error('Error updating user zone')
            }
        },
        async getZones(){
            try {
                const response = await MapService.getZone();
                this.locations = response;
            } catch(error) {
                console.error('Error retrieving zones')
            }
        }
    }
}
</script>

<style scoped>
    .profileBlock{
        height: auto;
    }
    .divider{
        margin-left: 15px;
        margin-right: 15px;
    }
    .rowSetting{
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .settingTitle{
        margin-top: 13px;
    }
    .applyBtnUpdateZone{
        margin-top: 19px;
    }
</style>
