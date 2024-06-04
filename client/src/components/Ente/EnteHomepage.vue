<template>
    <v-container class="mainBody">
        <v-row>
            <v-col cols="2">
                <v-card align="center" class="topPageTitle">
                    <v-card-title class="text-h5 ">Homepage</v-card-title>
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
            <v-col>
                <v-card class="reportBlock">
                    <v-card-title class="text-h5" align="center">Ultime segnalazioni</v-card-title>
                    <v-divider :thickness="4" style="margin-left: 15px; margin-right: 15px;"></v-divider>
                    <v-col cols="12">
                        <v-list>
                            <v-list-item>
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
                            </v-list-item>
                                <v-list-item v-for="report in slicedReports" :key="report._id">
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
                                            <v-btn color=green @click="openViewReport(report)">Vedi</v-btn>
                                        </v-col>
                                    </v-row>
                                <v-divider :thickness="3"></v-divider>
                            </v-list-item>       
                        </v-list>
                    </v-col>
                </v-card>
            </v-col>
        </v-row>
        <ViewReport
            v-if="dialogVisible" 
            v-model="dialogVisible"
            :report="selectedReport"
            :statusType="statusType"
            @emitCloseViewReport="closeViewReport"
            @emitSaveReportStatus="saveReportStatus"
        ></ViewReport>
    </v-container>
</template>

<script>
import { EnteMixin } from './mixin/EnteMixin';
import ViewReport from './single_components/ViewReport.vue'

export default {
    mixins: [EnteMixin],
    data() {
        return {
            
        }     
    },
    mounted() {
        this.elaborateHomepageData();
    },
    methods: {

    },
    components: {
        ViewReport
    }
};
</script>

<style scoped>

</style>

<style src="./style/style.css"></style>