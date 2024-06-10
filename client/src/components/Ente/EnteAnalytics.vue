<template>
    <v-container class="mainBody">
        <v-row>
            <v-col cols="2">
                <v-card align="center" class="topPageTitle">
                    <v-card-title class="text-h5 ">Analitiche</v-card-title>
                </v-card>
            </v-col>
            <v-col></v-col>
            <v-col cols="4"></v-col>
        </v-row>
        <v-row class="firstLineDashBoardWidgets">
            <v-col cols="8">
                <v-card class="firstLineDashBoardWidgetsCell">
                    <v-card-title class="text-h7" align="center">Segnalazioni Attuali</v-card-title>
                    <v-row cols="12" class="nReportsWidgetValue">
                        <v-col align="center">
                            <v-card-text class="text-h5" ref="nReportsTot">Totali</v-card-text>
                            <p class="text-h3 nReportsWidgetValue" ref="nReportsWidget" align="center">Caricamento...</p>
                            <p class="text-h7 nReportsWidgetValuePercent" align="center">100%</p>
                        </v-col>
                        <v-col align="center">
                            <v-card-text class="text-h5">Aperta</v-card-text>
                            <p class="text-h3 nReportsWidgetValue" ref="nReportOpensWidget" align="center">Caricamento...</p>
                            <p class="text-h7 nReportsWidgetValuePercent" ref="nReportOpensWidgetPercent" align="center">Caricamento...</p>
                        </v-col>
                        <v-col align="center">
                            <v-card-text class="text-h5">In Corso</v-card-text>
                            <p class="text-h3 nReportsWidgetValue" ref="nReportsRunningWidget" align="center">Caricamento...</p>
                            <p class="text-h7 nReportsWidgetValuePercent" ref="nReportsRunningWidgetPercent" align="center">Caricamento...</p>
                        </v-col>
                        <v-col align="center">
                            <v-card-text class="text-h5">Risolta</v-card-text>
                            <p class="text-h3 nReportsWidgetValue" ref="nReportsClosedWidget" align="center">Caricamento...</p>
                            <p class="text-h7 nReportsWidgetValuePercent" ref="nReportsClosedWidgetPercent" align="center">Caricamento...</p>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card class="firstLineDashBoardWidgetsCell">
                    <highcharts :options="chartReportStatusOptions" class="chartReportStatusOptions"></highcharts>
                </v-card>
            </v-col>
        </v-row>
        <v-row cols="12">
            <v-col cols="12">
                <v-card class="secondLineDashBoardWidgetCell">
                    <v-card-title class="text-h7" align="center">Numero di Segnalazioni per Zona</v-card-title>
                    <highcharts :options="chartReportsZones" class="chartReportsZones"></highcharts>
                </v-card>
            </v-col>
        </v-row>
        <v-row cols="12">
            <v-col cols="12">
                <v-card class="thirdLineDashBoardWidgetCell">
                    <v-card-title class="text-h7" align="center">Stato delle Segnalazioni per Zona</v-card-title>
                    <highcharts :options="chartReportsStatusZones" class="chartReportsStatusZones"></highcharts>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ReportService from '@/services/ReportService';
import MapService from '@/services/MapService';
import { EnteMixin } from './mixin/EnteMixin';

export default {
    mixins: [EnteMixin],
    data() {
        return {
            zones: [],
            nZones : 0,
            reportsForZones: {},
            statusesForEachZone: {},
            /* Chart Reports Status Zones second Line Dashboard Analytics */
            chartReportsZones: {
                chart: {
                    type: 'bar',
                    renderTo: 'chartReportsZones',
                    options3d: {
                        enabled: true,
                        alpha: 5,
                        beta: 10,
                        depth: 70,
                        viewDistance: 50
                    },
                    marginTop: -10,
                    marginLeft: 200,
                    marginRight: 20,
                    marginBottom: 100,
                },
                title: {
                    text: '',
                },

                xAxis: {
                    labels: {
                        //skew3d: true,
                        style: {
                            fontSize: '16px'
                        }
                    }
                },

                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    title: {
                        text: 'Numero di Segnalazioni',
                        //skew3d: true,
                        style: {
                            fontSize: '16px'
                        },
                        y: 15,
                        x: -100,
                    }
                },

                tooltip: {
                    headerFormat: '<b>{point.key}</b><br>',
                    pointFormat: '<span style="color:{series.color}">\u25CF</span> ' +
                        '{series.name}: {point.y}'
                },
    
                xAxis: {
                    categories: [],
                    crosshair: true,
                    accessibility: {
                        description: 'Zona'
                    }
                },

                series: [{
                    name: 'Segnalazioni',
                    data: [],
                    color: '#53b257'
                }]
            },
            chartReportsStatusZones: {
                chart: {
                    type: 'column',
                    renderTo: 'chartReportsStatusZones',
                    options3d: {
                        enabled: true,
                        alpha: 5,
                        beta: 10,
                        depth: 70,
                        viewDistance: 50
                    },
                    marginTop: -10,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 110,
                },
                title: {
                    text: '',
                },

                xAxis: {
                    labels: {
                        //skew3d: true,
                        style: {
                            fontSize: '16px'
                        }
                    }
                },    

                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    title: {
                        text: 'Numero di Segnalazioni',
                        //skew3d: true,
                        style: {
                            fontSize: '16px'
                        },
                        x: -10,
                    }
                },

                tooltip: {
                    headerFormat: '<b>{point.key}</b><br>',
                    pointFormat: '<span style="color:{series.color}">\u25CF</span> ' +
                        '{series.name}: {point.y}'
                },

                legend: {
                    enabled: true,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    y: -80,
                    x: 5,
                    floating: true,
                    backgroundColor: '#FFFFFF'
                },
                    
                xAxis: {
                    categories: [],
                    crosshair: true,
                    accessibility: {
                        description: 'Zona'
                    }
                },

                series: [{
                    name: 'Aperta',
                    data: [],
                    color: '#f44a3e'
                }, {
                    name: 'In corso',
                    data: [],
                    color: '#f5e239'
                }, {
                    name: 'Risolta',
                    data: [],
                    color: '#53b257'
                }]
            },
        }     
    },
    mounted() {
        this.initializeAnalytics();
    },
    methods: {
        async initializeAnalytics() {
            await this.elaborateReportsAnalyticsData();
            await this.getZones();
            await this.getAllZonesStatuses();
            await this.getAllZonesNumberReports();
            await this.updateZoneNumberReportsChart();
            await this.updateAllZoneStatusesChart();
        },
        async getAllZonesNumberReports(){
            try {
                const response = await ReportService.getNumerReportsForZones();
                this.reportsForZones = response.data.zoneCounts
            } catch(error) {
                console.log("Error retrieving number of reports for each zones")
            }
        },
        async getAllZonesStatuses() {
            try {
                const response = await ReportService.getAllZonesStatuses()
                this.statusesForEachZone = response.data.zoneStatusCounts
            } catch(error) {
                console.log("Error retrieving statuses of the zones")
            }
        },
        async getNumberZones(){
            try {
                const response = await ReportService.getNumberZones()
                this.nZones = response.data.nZones
            } catch(error) {
                console.log("Error retrieving number of the Zones")
            }
        },
        async getZones() {
            try {
                const response = await MapService.getZone()
                this.zones = response;
            } catch(error) {
                console.log("Error retrieving the Zones")
            }
        }, 
        async updateAllZoneStatusesChart() {
            try {
                this.chartReportsStatusZones.xAxis.categories = this.zones

                // Middle arrays
                let opened = []
                let running = []
                let closed = []

                // Populate arrays
                this.zones.forEach( zone => {
                    opened.push(this.statusesForEachZone[zone][this.statusType[0]])
                    running.push(this.statusesForEachZone[zone][this.statusType[1]])
                    closed.push(this.statusesForEachZone[zone][this.statusType[2]])
                })
                
                //Set series
                this.chartReportsStatusZones.series[0].data = opened
                this.chartReportsStatusZones.series[1].data = running
                this.chartReportsStatusZones.series[2].data = closed
            } catch(error) {
                console.log("Error updating Zones' statuses Chart")
            }
        },
        async updateZoneNumberReportsChart() {
            try {
                this.chartReportsZones.xAxis.categories = this.zones

                //Middle array
                let counts = []

                // Populate
                this.zones.forEach( zone => {
                    counts.push(this.reportsForZones[zone])
                })

                //Set series
                this.chartReportsZones.series[0].data = counts
            } catch(error) {
                console.log("Error updating Zones' statuses Chart")
            }
        },
    },
    components: {
    }
};
</script>

<style scoped>
    .nReportsWidgetValue{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 70%;
    }
    .chartReportsZones{
        width: 100%;
        height: 100%; 
    }
    .chartReportsStatusZones{
        width: 100%;
        height: 100%;
    }
</style>

<style lang="css">
    @import url('./style/shared.css');
</style>
