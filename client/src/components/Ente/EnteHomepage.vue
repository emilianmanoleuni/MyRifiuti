<template>
    <v-container class="mainBody">
        <v-row>
            <v-col cols="2">
                <v-card align="center">
                    <v-card-title class="text-h5">Homepage</v-card-title>
                </v-card>
            </v-col>
            <v-col></v-col>
            <v-col cols="4"></v-col>
        </v-row>
        <v-row class="listReportsBlock">
            <v-card class="homepageReportBlock">
                <v-col cols="12">
                    <v-list class="listReportsBlock">
                        <v-list-item-group>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-row class="reportHomeCell" cols="12">
                                        <v-col cols="3">
                                            <v-card-title class="text-h5">{{ reportsSections[0] }}</v-card-title>
                                        </v-col>
                                        <v-col cols="3">
                                            <v-card-title class="text-h5">{{ reportsSections[1] }}</v-card-title>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-card-title class="text-h5">{{ reportsSections[2] }}</v-card-title>
                                        </v-col>
                                        <v-col cols="1">
                                            <v-card-title class="text-h5">{{ reportsSections[3] }}</v-card-title>
                                        </v-col>
                                        <v-col cols="1">
                                            <v-card-title class="text-h5">{{ reportsSections[4] }}</v-card-title>
                                        </v-col>
                                        <v-col cols="1">
                                            <v-card-title class="text-h5">{{ reportsSections[5] }}</v-card-title>
                                        </v-col>
                                    </v-row> 
                                    <v-divider :thickness="3"></v-divider>  
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>            
                        <v-list-item-group>
                            <v-list-item v-for="report in reports" :key="report._id">
                                <v-list-item-content>
                                    <v-row class="reportHomeCell" cols="12">
                                        <v-col cols="3">
                                            <v-list-item-title>{{ report.createdAt }}</v-list-item-title>
                                        </v-col>
                                        <v-col cols="3">
                                            <v-list-item-title>{{ report.title }}</v-list-item-title>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-list-item-title>{{ report.zone }}</v-list-item-title>
                                        </v-col>
                                        <v-col cols="1">
                                            <v-list-item-title>{{ report.cap }}</v-list-item-title>
                                        </v-col>
                                        <v-col cols="1">
                                            <v-btn color=red>{{ report.status }}</v-btn>
                                        </v-col>
                                        <v-col cols="1" style="margin-left: 5px;">
                                            <v-btn color=green @click="vediReport(report)">Vedi</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-list-item-content>
                                <v-divider :thickness="3"></v-divider>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-col>
            </v-card>
        </v-row>
        <v-dialog v-model="dialog" class="viewReport">
            <v-card>
                <v-card-title> {{ selectedReport.title }}</v-card-title>
                <v-card-text>
                    <p>Data - Ora:</p> {{ selectedReport.createdAt }}
                    <p>Tipo di Segnalazione:</p> {{ selectedReport.type }}
                    <p>Stato della segnalazione:</p> {{ selectedReport.status }}
                    <p>Via:</p> {{ selectedReport.road }}
                    <p>Civico:</p> {{ selectedReport.roadNumber }}
                    <p>CAP:</p> {{ selectedReport.cap }}
                    <p>Zona:</p> {{ selectedReport.zone }}
                    <p>Descrizione:</p> {{ selectedReport.description }}
                </v-card-text>
                <v-card-action>
                    <v-btn class="closeViewReportBtn" variant="elevated" color="buttons" @click="dialog=false">Chiudi</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { computed, resolveComponent } from 'vue'
import { useStore } from 'vuex'
import ReportService from '@/services/ReportService';
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
            reportsSections: ["Data - Ora", "Titolo", "Zona", "CAP", "Stato", "Vedi"],
            reports: [],
            statusType: [], // 0 Aperta 1 - In Corso - 2 Risolta
            dialog: false,
            selectedReport: {},
        }
    },
    mounted() {
        this.fetchAllReports();
        this.fetchStatusType();
    },
    methods: {
        async fetchAllReports() {
            try {
                const response = await ReportService.getAllReports()
                this.reports = response.data;
            } catch(error) {
                console.error('Error fetching reports:', error);
            }
        },
        async fetchStatusType() {
            try {
                console.response = await ReportService.getStatusType()
                this.statusType = response.data;
            } catch(error) {
                console.error('Error fetching status type');
            }
        },
        vediReport(report){
            this.selectedReport = report
            this.dialog = true
        }
    }
};
</script>

<style scoped>
    .homepageReportBlock{
        width: 100%;
        height: 1000px;
    }
    .reportHomeSections{
        width: 100%
    }
    .reportHomeCell{
        height: 70px;
    }
    .viewReport{
        width: 1300px;
        height: 1000px;
    }
    .closeViewReportBtn{
        margin: 15px;
    }
</style>
