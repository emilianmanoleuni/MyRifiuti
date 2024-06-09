<template>
    <v-container class="mainBody">
        <v-row>
            <v-col cols="2">
                <v-card align="center">
                    <v-card-title class="text-h5">Calendario</v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="blockCalendar">
            <v-col cols="9">
                <v-card>
                    <v-row cols="12" class="selectZoneBox">
                        <v-select
                            v-if="!isUserLoggedIn"
                            v-model="selectedLocation"
                            :items="locations"
                            label="Seleziona circoscrizione"
                            dense
                            style="margin-top: 10px;" 
                        ></v-select>
                    </v-row>

                    <v-row cols="12" class="calendarBox">
                        <v-col cols="12">
                            <VCalendar :attributes="attributes" class="vc-container" expanded/>
                        </v-col>
                    </v-row>
                    
                    
                </v-card>
            </v-col>
            <v-col cols="3">
                <v-card class="align-self-end filterBlock">
                    <v-card-title align="center" class="text-h7 titleFilter">Filtra per:</v-card-title>
                    <v-row cols="12" class="boxBtnsFilter">
                        <v-col cols="12" >
                            <v-btn size="medium" :variant="filterTuttoStatus ? 'elevated' : 'outlined'" color="buttons" class="buttonsFilter" @click="filterAll()">Tutto</v-btn>
                            <br>
                            <v-btn size="medium" :variant="filterOrganicoStatus ? 'elevated' : 'outlined'" color="organic" class="buttonsFilter" @click="filterOrganico()">ORGANICO</v-btn>
                            <br>
                            <v-btn size="medium" :variant="filterImballaggiLeggeriStatus ? 'elevated' : 'outlined'" color="plastic" class="buttonsFilter" @click="filterImballaggiLeggeri()">IMBALLAGGI LEGGERI</v-btn>
                            <br>
                            <v-btn size="medium" :variant="filterCartaStatus ? 'elevated' : 'outlined'" color="paper" class="buttonsFilter" @click="filterCarta()">CARTA</v-btn>
                            <br>
                            <v-btn size="medium" :variant="filterResiduoStatus ? 'elevated' : 'outlined'" color="residue" class="buttonsFilter" @click="filterResiduo()">RESIDUO</v-btn>
                            <br>
                            <v-btn size="medium" :variant="filterVetroStatus ? 'elevated' : 'outlined'" color="glass" class="buttonsFilter" @click="filterVetro()">VETRO</v-btn>
                        </v-col>
                    </v-row>
                    
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { ref, computed, watchEffect } from 'vue'
import 'v-calendar/style.css';
import AuthenticationService from '@/services/AuthenticationService';
import CalendarService from '@/services/CalendarService'
import MapService from '@/services/MapService'

import { useStore } from 'vuex'
const store = useStore()

export default {
    setup() {
        const store = useStore()
        const isUserLoggedIn = computed(() => store.state.isUserLoggedIn)

        return {
            isUserLoggedIn
        }
    },
    data() {
        return {
            selectedLocation: '',
            locations: [],
            filterTuttoStatus: true,
            filterOrganicoStatus: true,
            filterImballaggiLeggeriStatus: true,
            filterCartaStatus: true,
            filterResiduoStatus: true,
            filterVetroStatus: true,
            todos: [],
            user: {}
        }
    },
    async mounted(){
        if (this.isUserLoggedIn) {
            await this.fetchUserData();
        } else {
            this.locations = await MapService.getZone();
        }
    },
    computed: {
        attributes() {
            return this.todos.map(todo => ({
                dates: todo.dates,
                dot: {
                    color: todo.color,
                    ...(todo.isComplete && { class: 'opacity-75' }),
                },
                popover: {
                    label: todo.description,
                },
            }));
        }
    },
    watch: {
        selectedLocation(newLocation) {
            if (!this.isUserLoggedIn) {
                this.updateTodos(newLocation);
            } 
        }
    },
    methods: {
        async fetchUserData() {
            try {
                const userId = this.$store.state.user._id;
                const response = await AuthenticationService.getUserZone(userId);
                this.user = response.data;
                this.selectedLocation = this.user.zone;
                this.updateTodos(this.selectedLocation);
            } catch (error) {
                console.error('Errore nel recupero della zona');
            }
        },
        async getWasteDayNumber(location, wasteType) {
            try {
                const wasteDayNumber = await CalendarService.getWasteDayNumber(location, wasteType);
                return wasteDayNumber;
            } catch (error) {
                console.error('Errore nel recupero dei numeri dei giorni della settimana:', error);
                return null;
            }
        },
        async updateTodos(location) {
            this.todos = []; //Clear
            if (location) {
                try {
                    const organicoPromise = this.filterOrganicoStatus ? this.getWasteDayNumber(location, 'organic') : null;
                    const plasticPromise = this.filterImballaggiLeggeriStatus ? this.getWasteDayNumber(location, 'plastic') : null;
                    const paperPromise = this.filterCartaStatus ? this.getWasteDayNumber(location, 'paper') : null;
                    const residuePromise = this.filterResiduoStatus ? this.getWasteDayNumber(location, 'residue') : null;
                    const glassPromise = this.filterVetroStatus ? this.getWasteDayNumber(location, 'glass') : null;
            
                    const [organico, plastic, paper, residue, glass] = await Promise.all([
                        organicoPromise,
                        plasticPromise,
                        paperPromise,
                        residuePromise,
                        glassPromise
                    ]);

                    if (this.filterOrganicoStatus && organico !== null) {
                        this.todos.push({
                            description: 'Organico',
                            isComplete: false,
                            dates: { repeat: { weekdays: organico } },
                            color: 'gray',
                        });
                    }

                    if (this.filterImballaggiLeggeriStatus && plastic !== null) {
                        this.todos.push({
                            description: 'Imballaggi leggeri',
                            isComplete: false,
                            dates: { repeat: { weekdays: plastic } },
                            color: 'blue',
                        });
                    }

                    if (this.filterCartaStatus && paper !== null) {
                        this.todos.push({
                            description: 'Carta',
                            isComplete: false,
                            dates: { repeat: { weekdays: paper } },
                            color: 'yellow',
                        });
                    }

                    if (this.filterResiduoStatus && residue !== null) {
                        this.todos.push({
                            description: 'Residuo',
                            isComplete: false,
                            dates: { repeat: { weekdays: residue } },
                            color: 'teal',
                        });
                    }

                    if (this.filterVetroStatus && glass !== null) {
                        this.todos.push({
                            description: 'Vetro',
                            isComplete: false,
                            dates: { repeat: { weekdays: glass } },
                            color: 'green',
                        });
                    }
                } catch (error) {
                    console.error('Errore nell\'aggiornamento dei compiti:', error);
                }
            }
        },
        async filterAll(){
            this.filterTuttoStatus = true;
            this.filterOrganicoStatus = true;
            this.filterImballaggiLeggeriStatus = true;
            this.filterCartaStatus = true;
            this.filterResiduoStatus = true;
            this.filterVetroStatus = true;

            await this.updateTodos(this.selectedLocation);
        },
        async filterOrganico(){
            this.filterTuttoStatus = false;
            this.filterOrganicoStatus = true;
            this.filterImballaggiLeggeriStatus = false;
            this.filterCartaStatus = false;
            this.filterResiduoStatus = false;
            this.filterVetroStatus = false;

            await this.updateTodos(this.selectedLocation);
        },
        async filterImballaggiLeggeri(){
            this.filterTuttoStatus = false;
            this.filterOrganicoStatus = false;
            this.filterImballaggiLeggeriStatus = true;
            this.filterCartaStatus = false;
            this.filterResiduoStatus = false;
            this.filterVetroStatus = false;
            
            await this.updateTodos(this.selectedLocation);
        },
        async filterCarta(){
            this.filterTuttoStatus = false;
            this.filterOrganicoStatus = false;
            this.filterImballaggiLeggeriStatus = false;
            this.filterCartaStatus = true;
            this.filterResiduoStatus = false;
            this.filterVetroStatus = false;

            await this.updateTodos(this.selectedLocation);
        },
        async filterResiduo(){
            this.filterTuttoStatus = false;
            this.filterOrganicoStatus = false;
            this.filterImballaggiLeggeriStatus = false;
            this.filterCartaStatus = false;
            this.filterResiduoStatus = true;
            this.filterVetroStatus = false;

            await this.updateTodos(this.selectedLocation);
        },
        async filterVetro(){
            this.filterTuttoStatus = false;
            this.filterTuttoStatus = false;
            this.filterOrganicoStatus = false;
            this.filterImballaggiLeggeriStatus = false;
            this.filterCartaStatus = false;
            this.filterResiduoStatus = false;
            this.filterVetroStatus = true;

            await this.updateTodos(this.selectedLocation);
        }
    }
};
</script>

<style scoped>
    .selectZoneBox{
        margin-top: 15px;
        margin-left: 24px;
        margin-right: 24px;
        margin-bottom: -20px;
    }
    .calendarBox{
        margin: 10px;
        height: auto;
        width: auto;
    }
    .vc-day{
        min-height: 100px;  
    }
    .titleFilter{
        margin-top: 5px;
        margin-bottom: 5px;
    }    
    .boxBtnsFilter{
        margin-left: 15px;
        margin-right: 15px;
        margin-bottom: 5px;
    }
    .buttonsFilter{
        height: 35px;
        width: 100%;
        margin-bottom: 15px;
    }
</style>
