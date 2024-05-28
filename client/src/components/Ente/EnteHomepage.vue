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
        <v-row class="firstLineDashBoardWidgets">
            <v-col cols="6">
                <v-card class="firstLineDashBoardWidgetsCell">
                    <v-card-title class="text-h7" align="center">Benvenuto!</v-card-title>
                    <v-card-text class="text-h8 nReportsWidgetValue" align="center"> 
                        Dalla seguente dashboard puoi visualizzare alcune delle informazioni principali. <br>
                        Per maggiori dettagli utilizzare le sezioni apposite nella barra di navigazione <br>
                        poste in alto.
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="2">
                <v-card class="firstLineDashBoardWidgetsCell">
                    <v-card-title class="text-h7" align="center">Segnalazioni Attuali:</v-card-title>
                    <p class="text-h3 nReportsWidgetValue" ref="nReportsWidget" align="center">Caricamento...</p>                    
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card class="firstLineDashBoardWidgetsCell">
                    <highcharts :options="chartReportStatusOptions" class="chartReportStatusOptions"></highcharts>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-card class="homepageReportBlock">
                <v-card-title class="text-h5" align="center">Ultime segnalazioni</v-card-title>
                <v-divider :thickness="4" style="margin-left: 15px; margin-right: 15px;"></v-divider>
                <v-col cols="12">
                    <v-list>
                        <v-list-item-group>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-row class="reportHomeCell" cols="12">
                                        <v-col cols="2">
                                            <v-card-title class="text-h5">{{ reportsSections[0] }}</v-card-title>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-card-title class="text-h5">{{ reportsSections[1] }}</v-card-title>
                                        </v-col>
                                        <v-col cols="3">
                                            <v-card-title class="text-h5">{{ reportsSections[2] }}</v-card-title>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-card-title class="text-h5">{{ reportsSections[3] }}</v-card-title>
                                        </v-col>
                                        <v-col cols="1"> 
                                            <v-card-title class="text-h5">{{ reportsSections[4] }}</v-card-title>
                                        </v-col>
                                        <v-col cols="1">
                                            <v-card-title class="text-h5">{{ reportsSections[5] }}</v-card-title>
                                        </v-col>
                                        <v-col cols="1" style="margin-left: -7px">
                                            <v-card-title class="text-h5">{{ reportsSections[6] }}</v-card-title>
                                        </v-col>
                                    </v-row> 
                                    <v-divider :thickness="3"></v-divider>  
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>            
                        <v-list-item-group>
                            <v-list-item v-for="report in slicedReports" :key="report._id">
                                <v-list-item-content>
                                    <v-row class="reportHomeOrizontalCell" cols="12">
                                        <v-col cols="2">
                                            <v-list-item-title>{{ report.createdAt }}</v-list-item-title>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-list-item-title>{{ report.type }}</v-list-item-title>
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
                                            <v-btn class="statusBtn" :color="statusTypeColor(report)">{{ report.status }}</v-btn>
                                        </v-col>
                                        <v-col cols="1">
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
                <v-card-title class="text-h4 titleViewReport"> {{ selectedReport.title }}</v-card-title>
                <v-card-text>
                    <v-row cols="12">
                        <v-col cols="7">
                            <v-divider :thickness="3"></v-divider>
                            <p class="text-h6 contentReport subTitleContentReport">Report Info</p>
                            <v-row cols="12" class="contentReport">
                                <v-col cols="5">
                                    <p>ID :</p>
                                    <p>Data - Ora:</p> 
                                    <p class="lastContentRowReport">Tipo di Segnalazione:</p>
                                </v-col>
                                <v-col cols="7">
                                    {{ selectedReport._id }}<br>
                                    {{ selectedReport.createdAt }}<br>
                                    {{ selectedReport.type }}
                                </v-col>
                            </v-row>
                            <v-divider :thickness="3"></v-divider>
                            <p class="text-h6 contentReport subTitleContentReport">Posizione</p>
                            <v-row cols="12" class="contentReport">
                                <v-col cols="5">
                                    <p>Via:</p> 
                                    <p>Civico:</p> 
                                    <p>CAP:</p> 
                                    <p class="lastContentRowReport">Zona:</p> 
                                </v-col>
                                <v-col cols="7">
                                    {{ selectedReport.road }}<br>
                                    {{ selectedReport.roadNumber }}<br>
                                    {{ selectedReport.cap }}<br>
                                    {{ selectedReport.zone }}
                                </v-col>
                            </v-row>
                            <v-divider :thickness="3"></v-divider>
                            <p class="text-h6 contentReport subTitleContentReport">Descrizione</p>
                            <span class="contentReport">{{ selectedReport.description }}</span>
                        </v-col>
                        <v-col cols="5">
                            <v-row cols="12">
                                <v-col cols="9">
                                    <v-select
                                        variant="solo"
                                        :color="statusTypeColor(selectedReport)"
                                        class="selectStatusReport"
                                        v-model="selectedReport.status"
                                        :items="statusType"
                                        label="Aggiorna lo stato:"
                                        dense
                                    ></v-select>
                                </v-col>
                                <v-col cols="3" class="d-flex align-center mb-6">
                                    <v-btn variant="elevated" color="buttons" @click="saveReportStatus(selectedReport)">Salva</v-btn>
                                </v-col>
                            </v-row>
                            
                        </v-col>
                    </v-row>

                </v-card-text>
                <v-card-action>
                    <v-btn class="closeViewReportBtn" variant="elevated" color="buttons" @click="dialog=false">Chiudi</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import ReportsFunctions from './composables/ReportsFunctions';

import { computed } from 'vue'
import { useStore } from 'vuex'
import ReportService from '@/services/ReportService';
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';

highcharts3d(Highcharts); // Enable 3D module

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
            reportsSections: ["Data - Ora", "Tipo", "Titolo", "Zona", "CAP", "Stato", "Vedi"],
            reports: [],
            slicedReports: [],
            statusType: [], // 0 Aperta 1 - In Corso - 2 Risolta
            dialog: false,
            selectedReport: {},
            nReports: 0,
            nOpenedReports: 0,
            nRunningReports: 0,
            nClosedReports: 0,
            chartReportStatusOptions: {
                chart: {
                    type: 'column',
                    renderTo: 'chartReportStatusOptions',
                    options3d: {
                        enabled: true,
                        alpha: 15,
                        beta: 15,
                        depth: 70,
                        viewDistance: 25
                    },
                    marginTop: 30,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 25,
                },
                title: {
                    text: 'Numero di Segnalazioni per Stato',
                },
                xAxis: {
                    categories: ['Aperta', 'In corso', 'Risolta']
                },
                yAxis: {
                    title: {
                        text: 'Numero di report'
                    }
                },
                series: [{
                    name: 'Stato del report',
                    data: [
                        { name: 'Aperta', y: 0, color: '#f44a3e' },
                        { name: 'In corso', y: 0, color: '#f5e239' },
                        { name: 'Risolta', y: 0, color: '#53b257' }
                    ],
                    colorByPoint: true
                }],
                legend: {
                    enabled: true
                },
                plotOptions: {
                    series: {
                        showInLegend: false,
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.y}'
                        }
                    }
                }
            }
        }
    },
    mounted() {
        this.initializeData();
    },
    methods: {
        async initializeData() {
            try {
                await this.fetchStatusType(), //Importat to do before filtering api
                await Promise.all([
                    this.fetchAllReports(),
                    this.fetchNumberOfAllReports(),
                    this.fetchNumberOfAllStatusTypeReports()
                ]);
            } catch (error) {
                console.error('Error initializing data: ', error);
            }
        },
        async fetchAllReports() {
            try {
                const response = await ReportService.getAllReports()
                this.reports = response.data;
                this.reports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                this.slicedReports = this.reports.slice(0, 8);
                this.updateChart();
            } catch(error) {
                console.error('Error fetching reports:', error);
            }
        },
        async fetchStatusType() {
            try {
                const response = await ReportService.getStatusTypes()
                this.statusType = response.data
            } catch(error) {
                console.error('Error fetching status type');
            }
        },
        async fetchNumberOfAllReports() {
            try {
                const response = await ReportService.getNumberOfAllReports()
                this.nReports = response.data.count
                this.$refs.nReportsWidget.textContent = this.nReports;
                this.updateChart();
            } catch(error) {
                console.error('Error fetching number of reports type');
            }
        },
        async fetchNumberOfAllStatusTypeReports() {
            try {
                const responseOpened = await ReportService.getNumberByStatusOfReports( this.statusType[0] )
                this.nOpenedReports = responseOpened.data.count[0].count
                const responseRunning = await ReportService.getNumberByStatusOfReports( this.statusType[1] )
                this.nRunningReports = responseRunning.data.count[0].count
                const responseClosed = await ReportService.getNumberByStatusOfReports( this.statusType[2] )
                this.nClosedReports = responseClosed.data.count[0].count
                this.updateChart();
            } catch(error) {
                console.error('Error fetching number of reports type status');
            }
        },
        vediReport(report){
            this.selectedReport = report
            this.dialog = true
        },
        async saveReportStatus(report){
            try {
                await ReportService.saveReportStatus({
                    _id : report._id,
                    status : report.status
                }).then(this.fetchNumberOfAllStatusTypeReports());
            } catch(error) {
                console.error('Error saving report status');
            }
        },
        async updateChart() {
            this.chartReportStatusOptions.series[0].data = [
                    this.nOpenedReports,
                    this.nRunningReports,
                    this.nClosedReports,
                ];
        },
    },
    computed: {
        statusTypeColor(){
            return (report) => {
                switch(report.status){
                case 'APERTA':
                    return 'red'
                case 'IN CORSO':
                    return 'yellow'
                case 'RISOLTA':
                    return 'green'
                }
            }
        }
    },
    components: {
        HighchartsVue
    }
};
</script>

<style scoped>
    .firstLineDashBoardWidgets{
        width: auto;
        height: 400px;
        margin-bottom: 33px;
    }
    .firstLineDashBoardWidgetsCell{
        width: auto;
        height: 100%;
    }
    .nReportsWidgetValue{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 70%;
    }
    .chartReportStatusOptions{
        margin-top: 8px;
    }
    .homepageReportBlock{
        margin-left: 12px;
        margin-right: 12px;
        width: 100%;
        height: auto;
    }
    .reportHomeOrizontalCell{
        height: 70px;
    }
    .statusBtn{
        width: 70%;
    }
    .viewReport{
        min-width: 700px;
        max-width: 1200px;
    }
    .titleViewReport{
        margin-top: 15px;
        margin-left: 15px;
        margin-bottom: -10px;
    }
    .subTitleContentReport{
        margin-top: 5px;
    }
    .contentReport{
        margin-left: 5px;
        margin-right: 5px;
    }
    .lastContentRowReport{
        margin-bottom: 5px;
    }
    .closeViewReportBtn{
        margin: 15px;
    }
</style>
