<template>
    <v-container class="mainBody">
        <v-row>
            <v-col cols="2">
                <v-card align="center">
                    <v-card-title class="text-h5">Calendario</v-card-title>
                </v-card>
            </v-col>
            <v-col></v-col>
            <v-col cols="4">
                
            </v-col>
        </v-row>
        <v-row class="blockCalendar">
            <v-col cols="10">
                <v-card>
                    //CALENDAR
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
export default{
    data(){
        return{
            filterTuttoStatus: true,
            filterOrganicoStatus: true,
            filterImballaggiLeggeriStatus: true,
            filterCartaStatus:  true,
            filterResiduoStatus: true,
            filterVetroStatus: true,
        }
    },
    methods: {
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
        },
        navigateTo (route){
            this.$router.push(route)
        },
    }
}
</script>

<style scoped>
    .buttonsFilter{
        width: 94%;
        margin: 5px;
    }
</style>
