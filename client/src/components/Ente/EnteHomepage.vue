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
        <v-row>
            <highcharts :options="chartOptions"></highcharts>
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
                                            <v-btn class="statusBtn" :color="statusTypeColor(report)">{{ report.status }}</v-btn>
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
            nReports: 0,
            nOpenedReports: 0,
            nRunningReports: 0,
            nClosedReports: 0,
            chartOptions: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
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
                    data: [0,0,0],
                    colorByPoint: true,
                    color: ['red', 'yellow', 'green']
                }]
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
                this.nReports = response.data.nReports
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
            this.chartOptions.series[0].data = [
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
                default:
                    return 'gray'
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
