<template>
    <v-container class="mainBody">
        <v-row>
            <v-col cols="2">
                <v-card align="center">
                    <v-card-title class="text-h5">Calendario</v-card-title>
                </v-card>
            </v-col>
            <v-col></v-col>
            <v-col cols="4"></v-col>
        </v-row>
        <v-row class="blockCalendar">
            <v-col cols="10">
                <v-card>
                    <!-- INTEGRAZIONE -->
                    <v-select
                        v-model="selectedLocation"
                        :items="locations"
                        label="Seleziona circoscrizione"
                        dense
                        style="margin-top: 10px;" 
                    ></v-select>

                    <div class="calendar-container" style="margin-top: 20px;"> 
                        <VCalendar :attributes="attributes" class="calendar" expanded />
                    </div>

                    <div v-if="$store.state.isUserLoggedIn" class="text-block">
                        <p>zona - {{ $store.state.user.zone }} - selezionare la zona nel menù a tendina</p>
                    </div>
                    <div v-else class="text-block">
                        <p>navigazione anonima</p>
                    </div>
                    <!-- INTEGRAZIONE -->
                </v-card>
            </v-col>
            <v-col cols="2">
                <v-card class="align-self-end filterBlock">
                    <v-card-title align="center" class="text-body-2">Filtra per:</v-card-title>
                    <v-btn size="small" :variant="filterTuttoStatus ? 'elevated' : 'outlined'" color="buttons" class="buttonsFilter" @click="filterAll()">Tutto</v-btn>
                    <br>
                    <v-btn size="small" :variant="filterOrganicoStatus ? 'elevated' : 'outlined'" color="organic" class="buttonsFilter" @click="filterOrganico()">ORGANICO</v-btn>
                    <br>
                    <v-btn size="small" :variant="filterImballaggiLeggeriStatus ? 'elevated' : 'outlined'" color="plastic" class="buttonsFilter" @click="filterImballaggiLeggeri()">IMBALLAGGI LEGGERI</v-btn>
                    <br>
                    <v-btn size="small" :variant="filterCartaStatus ? 'elevated' : 'outlined'" color="paper" class="buttonsFilter" @click="filterCarta()">CARTA</v-btn>
                    <br>
                    <v-btn size="small" :variant="filterResiduoStatus ? 'elevated' : 'outlined'" color="residue" class="buttonsFilter" @click="filterResiduo()">RESIDUO</v-btn>
                    <br>
                    <v-btn size="small" :variant="filterVetroStatus ? 'elevated' : 'outlined'" color="glass" class="buttonsFilter" @click="filterVetro()">VETRO</v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { ref, computed, watchEffect } from 'vue'
import 'v-calendar/style.css';

export default {
    data() {
        return {
            selectedLocation: '',
            locations: [
                'RAVINA - ROMAGNANO',
                'POVO - VILLAZZANO',
                'ARGENTARIO',
                'BONDONE - SARGAGNA',
                'MATTARELLO',
                'S. GIUSEPPE - S.CHIARA',
                'CRISTO RE - SAN MARTINO',
                'PIDEDICASTELLO - SOLTERI - VELA - CAMPOTRENTINO',
                'VIA KOFLER - CASTELLER',
                'GARDOLO',
                'GARDOLO ZONA INDUSTRIALE - MEANO',
                'OLTREFERSINA'
            ],
            filterTuttoStatus: true,
            filterOrganicoStatus: true,
            filterImballaggiLeggeriStatus: true,
            filterCartaStatus: true,
            filterResiduoStatus: true,
            filterVetroStatus: true,
            todos: []
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
        selectedLocation: {
            immediate: true,
            handler(newLocation) {
                this.updateTodos(newLocation);
            }
        }
    },
    methods: {
        getWeekdayNumber(location, wasteType) {
            const schedules = {
                "RAVINA - ROMAGNANO": {
                    organico: 3, // Tuesday
                    carta: 4, // Wednesday
                    "imballaggi leggeri": 6, // Friday
                    residuo: 4, // Wednesday
                    vetro: 4 // Wednesday
                },
                "POVO - VILLAZZANO": {
                    organico: 2, // Monday
                    carta: 5, // Thursday
                    "imballaggi leggeri": 6, // Friday
                    residuo: 2, // Monday
                    vetro: 2 // Monday
                },
                ARGENTARIO: {
                    organico: 3, // Tuesday
                    carta: 6, // Friday
                    "imballaggi leggeri": 4, // Wednesday
                    residuo: 4, // Wednesday
                    vetro: 4 // Wednesday
                },
                "BONDONE - SARGAGNA": {
                    organico: 2, // Monday
                    carta: 4, // Wednesday
                    "imballaggi leggeri": 5, // Thursday
                    residuo: 2, // Monday
                    vetro: 2 // Monday
                },
                MATTARELLO: {
                    organico: 3, // Tuesday
                    carta: 4, // Wednesday
                    "imballaggi leggeri": 3, // Tuesday
                    residuo: 7, // Friday
                    vetro: 7 // Friday
                },
                "S. GIUSEPPE - S.CHIARA": {
                    organico: 3, // Tuesday
                    carta: 6, // Friday
                    "imballaggi leggeri": 4, // Wednesday
                    residuo: 3, // Tuesday
                    vetro: 3 // Tuesday
                },
                "CRISTO RE - SAN MARTINO": {
                    organico: 2, // Monday
                    carta: 2, // Monday
                    "imballaggi leggeri": 3, // Tuesday
                    residuo: 5, // Thursday
                    vetro: 5 // Thursday
                },
                "PIDEDICASTELLO - SOLTERI - VELA - CAMPOTRENTINO": {
                    organico: 2, // Monday
                    carta: 2, // Monday
                    "imballaggi leggeri": 3, // Tuesday
                    residuo: 5, // Thursday
                    vetro: 5 // Thursday
                },
                "VIA KOFLER - CASTELLER": {
                    organico: 3, // Tuesday
                    carta: 6, // Friday
                    "imballaggi leggeri": 2, // Monday
                    residuo: 3, // Tuesday
                    vetro: 3 // Tuesday
                },
                "GARDOLO": {
                    organico: 3, // Tuesday
                    carta: 3, // Tuesday
                    "imballaggi leggeri": 6, // Friday
                    residuo: 4, // Wednesday
                    vetro: 4 // Wednesday
                },
                "GARDOLO ZONA INDUSTRIALE - MEANO": {
                    organico: 2, // Monday
                    carta: 2, // Monday
                    "imballaggi leggeri": 5, // Thursday
                    residuo: 5, // Thursday
                    vetro: 4 // Wednesday
                },
                "OLTREFERSINA": {
                    organico: 2, // Monday
                    carta: 2, // Monday
                    "imballaggi leggeri": 4, // Wednesday
                    residuo: 5, // Thursday
                    vetro: 2 // Monday
                }
            };
            return schedules[location][wasteType];
        },
        updateTodos(location) {
            this.todos = [];
            if (location) {
                this.todos.push(
                    {
                        description: 'Organico',
                        isComplete: false,
                        dates: { repeat: { weekdays: this.getWeekdayNumber(location, 'organico') } },
                        color: 'green',
                    },
                    {
                        description: 'Carta',
                        isComplete: false,
                        dates: { repeat: { weekdays: this.getWeekdayNumber(location, 'carta') } },
                        color: 'blue',
                    },
                    {
                        description: 'Imballaggi leggeri',
                        isComplete: false,
                        dates: { repeat: { weekdays: this.getWeekdayNumber(location, 'imballaggi leggeri') } },
                        color: 'yellow',
                    },
                    {
                        description: 'Residuo',
                        isComplete: false,
                        dates: { repeat: { weekdays: this.getWeekdayNumber(location, 'residuo') } },
                        color: 'red',
                    },
                    {
                        description: 'Vetro',
                        isComplete: false,
                        dates: { repeat: { weekdays: this.getWeekdayNumber(location, 'vetro') } },
                        color: 'gray',
                    },
                );
            }
        },
        filterAll(){
            this.filterTuttoStatus = true;
            this.filterOrganicoStatus = true;
            this.filterImballaggiLeggeriStatus = true;
            this.filterCartaStatus = true;
            this.filterResiduoStatus = true;
            this.filterVetroStatus = true;
        },
        filterOrganico(){
            this.filterTuttoStatus = false;
            this.filterOrganicoStatus = true;
            this.filterImballaggiLeggeriStatus = false;
            this.filterCartaStatus = false;
            this.filterResiduoStatus = false;
            this.filterVetroStatus = false;

            //Chiamata api
        },
        filterImballaggiLeggeri(){
            this.filterTuttoStatus = false;
            this.filterOrganicoStatus = false;
            this.filterImballaggiLeggeriStatus = true;
            this.filterCartaStatus = false;
            this.filterResiduoStatus = false;
            this.filterVetroStatus = false;
            
            //Chiamata api
        },
        filterCarta(){
            this.filterTuttoStatus = false;
            this.filterOrganicoStatus = false;
            this.filterImballaggiLeggeriStatus = false;
            this.filterCartaStatus = true;
            this.filterResiduoStatus = false;
            this.filterVetroStatus = false;

            //Chiamata api
        },
        filterResiduo(){
            this.filterTuttoStatus = false;
            this.filterOrganicoStatus = false;
            this.filterImballaggiLeggeriStatus = false;
            this.filterCartaStatus = false;
            this.filterResiduoStatus = true;
            this.filterVetroStatus = false;

            //Chiamata api
        },
        filterVetro(){
            this.filterTuttoStatus = false;
            this.filterTuttoStatus = false;
            this.filterOrganicoStatus = false;
            this.filterImballaggiLeggeriStatus = false;
            this.filterCartaStatus = false;
            this.filterResiduoStatus = false;
            this.filterVetroStatus = true;

            //Chiamata api
        }
    }
};
</script>

<style scoped>
    .buttonsFilter{
        width: 94%;
        margin: 5px;
    }
</style>
