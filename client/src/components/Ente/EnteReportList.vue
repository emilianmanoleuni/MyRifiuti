<template>
    <v-container class="mainBody">
        <v-row cols="2" align="center">
            <v-col cols="2">
                <v-card align="center" class="topPageTitle">
                    <v-card-title class="text-h5 ">Segnalazioni</v-card-title>
                </v-card>
            </v-col>
            <v-col></v-col>
            <v-col cols="4"></v-col>
        </v-row>
        <v-row cols="12">
            <v-col cols="12">
                <v-card class="filterMainBlock">
                    <v-col cols="12" style="">
                        <v-row>
                            <v-card-title class="titleFilter">Filtri</v-card-title>
                            <v-divider :thickness="3"></v-divider>
                            <v-col cols="2" align="left">
                                <v-card-text class="titleFilterCols">Ordina dal:</v-card-text>
                                <v-btn :variant="isDescendingDate ? 'elevated' : 'outlined'" color="buttons" class="filterOrderButtons" @click="handleDateSort('LastFirst')">Più recente</v-btn>
                                <v-btn :variant="!isDescendingDate ? 'elevated' : 'outlined'" color="buttons" class="filterOrderButtons" @click="handleDateSort('OldestFirst')">Meno recente</v-btn>
                            </v-col>
                            <v-col cols="3" align="left">
                                <v-card-text class="titleFilterCols">Filtra per Tipo:</v-card-text>
                                <v-select
                                    label="Seleziona il Tipo"
                                    v-model="selectedTypeToFilter"
                                    class="largeFilterMenu"
                                    :items="reportTypes"
                                    dense
                                ></v-select>
                                <v-row cols="12">
                                    <v-col cols="9">
                                        <v-btn variant="elevated" color="buttons" class="applyBtn" @click="handleFilter()">APPLICA</v-btn>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-btn variant="outlined" color="buttons" class="resetApplyBtn" @click="handleResetType()">RESET</v-btn>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="2" align="left">
                                <v-card-text class="titleFilterCols">Filtra per CAP:</v-card-text>
                                <v-select
                                    label="Seleziona il CAP"
                                    v-model="selectedCapToFilter"
                                    class="largeFilterMenu"
                                    :items="caps"
                                    dense
                                ></v-select>
                                <v-row cols="12">
                                    <v-col cols="8">
                                        <v-btn variant="elevated" color="buttons" class="applyBtn" @click="handleFilter()">APPLICA</v-btn>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-btn variant="outlined" color="buttons" class="resetApplyBtn" @click="handleResetCap()">RESET</v-btn>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="3" align="left">
                                <v-card-text class="titleFilterCols">Filtra per Zona:</v-card-text>
                                <v-select
                                    label="Seleziona la zona"
                                    v-model="selectedZoneToFilter"
                                    class="largeFilterMenu"
                                    :items="zones"
                                    dense
                                ></v-select>
                                <v-row cols="12">
                                    <v-col cols="9">
                                        <v-btn variant="elevated" color="buttons" class="applyBtn" @click="handleFilter()">APPLICA</v-btn>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-btn variant="outlined" color="buttons" class="resetApplyBtn" @click="handleResetZone()">RESET</v-btn>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="2" align="left">
                                <v-card-text class="titleFilterCols">Filtra per Stato:</v-card-text>
                                <v-btn :variant="filterStatusOpen ? 'elevated' : 'outlined'" color="red" class="filterOrderButtons" @click="handleFilter(0)">{{ statusType[0] }}</v-btn>
                                <v-btn :variant="filterStatusRunning ? 'elevated' : 'outlined'" color="yellow" class="filterOrderButtons" @click="handleFilter(1)">{{ statusType[1] }}</v-btn>
                                <v-btn :variant="filterStatusClosed ? 'elevated' : 'outlined'" color="green" class="filterOrderButtons" @click="handleFilter(2)">{{ statusType[2] }}</v-btn>
                            </v-col>
                            <v-row>
                                <v-col>
                                    <v-btn variant="elevated" color="buttons" class="filterResetBtn" @click="handleResetButton">Cancella tutti i filtri</v-btn>
                                </v-col>
                            </v-row>        
                        </v-row>    
                    </v-col>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card class="reportBlock">
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
                                       <v-list-item-title align="center" style="margin-right: 20px;">{{ report.cap }}</v-list-item-title>
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
import MapService from '@/services/MapService';
import ViewReport from './single_components/ViewReport.vue'
import ReportService from '@/services/ReportService';

export default {
    mixins: [EnteMixin],
    data() {
        return {
            reportTypes: [],
            selectedTypeToFilter: '',
            caps: [],
            selectedCapToFilter: '',
            zones: [],
            selectedZoneToFilter: '',
            isDescendingDate: true,
            filterStatusMem: -1,
            filterStatusOpen: true,
            filterStatusRunning: true,
            filterStatusClosed: true,
        }        
    },
    mounted() {
        this.elaborateReportsListData();
        this.getTypes();
        this.getCaps();
        this.getZones();
    },
    methods: {
        handleFilter(status){
            this.resetSortOrFilter();
            this.handleTypeToFilter();
            this.handleCapToFilter();
            this.handleZoneToFilter();
            this.handleStatusFilter(status);
        },
        handleDateSort(order) {
            switch(order){
                case 'LastFirst':
                    this.isDescendingDate = true
                    this.sortDescendingDate()
                    break;
                case 'OldestFirst':
                    this.isDescendingDate = false
                    this.sortAscendingDate()
                    break;
            }
        },
        handleTypeToFilter() {
            if(this.selectedTypeToFilter != ''){
                this.filterType(this.selectedTypeToFilter);
            } 
        },
        handleCapToFilter() {
            if(this.selectedCapToFilter != ''){
                this.filterCap(this.selectedCapToFilter);
            } 
        },
        handleZoneToFilter() {
            if(this.selectedZoneToFilter != ''){
                this.filterZone(this.selectedZoneToFilter);
            } 
        },  
        handleStatusFilter(type) {
            //Complex, using 3 status to determine memory
            //Set Filter Booleans to also set Btn selected
            switch(type){
                case 0:
                    this.filterStatusOpen = true
                    this.filterStatusRunning = false
                    this.filterStatusClosed = false
                    break;
                case 1:
                    this.filterStatusOpen = false
                    this.filterStatusRunning = true
                    this.filterStatusClosed = false
                    break;
                case 2:
                    this.filterStatusOpen = false
                    this.filterStatusRunning = false
                    this.filterStatusClosed = true
                    break;
            }
            //Avoid false filtering --> Filter only if one condition
            if(this.filterStatusOpen && !this.filterStatusRunning && !this.filterStatusClosed ||
                !this.filterStatusOpen && this.filterStatusRunning && !this.filterStatusClosed ||
                !this.filterStatusOpen && !this.filterStatusRunning && this.filterStatusClosed)
            {
                //""MEMORY OF STATUS FILTER for combined filtering""
                switch(true){
                    case this.filterStatusOpen && !this.filterStatusRunning && !this.filterStatusClosed:
                        this.filterStatusType(this.statusType[0])
                        break;
                    case !this.filterStatusOpen && this.filterStatusRunning && !this.filterStatusClosed:
                        this.filterStatusType(this.statusType[1])
                        break;
                    case !this.filterStatusOpen && !this.filterStatusRunning && this.filterStatusClosed:
                        this.filterStatusType(this.statusType[2])
                        break;
                }
            }
        },
        handleResetButton() {
            this.selectedTypeToFilter = ''
            this.selectedCapToFilter = ''
            this.selectedZoneToFilter = ''
            this.isDescendingDate = true
            this.filterStatusOpen = true
            this.filterStatusRunning = true
            this.filterStatusClosed = true
            this.resetSortOrFilter()
        },
        handleResetType(){
            this.selectedTypeToFilter = '',
            this.handleFilter()
        },
        handleResetCap(){
            this.selectedCapToFilter = '',
            this.handleFilter()
        },
        handleResetZone(){
            this.selectedZoneToFilter = '',
            this.handleFilter()
        },
        async getTypes(){
            try {
                const response = await ReportService.getReportTypes()
                this.reportTypes = response.data
            } catch(error) {
                console.error("Error retrieving types of reports")
            }
        },
        async getCaps(){
            try {
                const response = await ReportService.getReportCaps()
                this.caps = response.data
            } catch(error) {
                console.error("Error retrieving CAPS")
            }
        },
        async getZones(){
            try {
                MapService.getZone()
                .then(zoneArray => {
                    this.zones = [...zoneArray];
                })
            } catch(error) {
                console.error("Error retrieving zones")
            }
        }
    },
    components: {
        ViewReport
    }
};
</script>

<style scoped>
.filterMainBlock{
    height: auto;
}
.titleFilter{
    margin-left: 15px;
    margin-top: 5px;
    margin-bottom: 5px;
}
.titleFilterCols{
    margin-left: 5px;
    margin-top: -15px;
    margin-bottom: -10px;
}
.filterOrderButtons{
    width: 83%;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 7px;
    margin-bottom: 7px;
}
.applyBtn{
    width: 100%;
    margin-left: 15px;
    margin-top: 7px;
}
.resetApplyBtn{
    width: 100%;
    margin-left: 15px;
    margin-top: 7px;
}
.largeFilterMenu{
    width: 100%;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 7px;
    margin-bottom: 15px;
}
.filterResetBtn{
    width: 96%;
    margin-left: 28px;
    margin-right: 28px;
    margin-top: 7px;
    margin-bottom: 25px;
}
</style>

<style lang="css">
    @import url('./style/shared.css');
</style>