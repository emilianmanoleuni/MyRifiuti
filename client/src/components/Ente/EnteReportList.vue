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
                            <v-col cols="2" align="left">
                                <v-card-text class="titleFilterCols">Filtra per:</v-card-text>
                                <v-btn variant="elevated" color="buttons" class="filterOrderButtons" @click="filterStatusType">PROVA</v-btn>
                            </v-col>
                            <v-col cols="6" align="left">
                                ciao
                            </v-col>
                            <v-col cols="2" align="left">
                                <v-card-text class="titleFilterCols">Filtra per Stato:</v-card-text>
                                <v-btn :variant="filterStatusOpen ? 'elevated' : 'outlined'" color="red" class="filterOrderButtons" @click="handleStatusFilter(0)">{{ statusType[0] }}</v-btn>
                                <v-btn :variant="filterStatusRunning ? 'elevated' : 'outlined'" color="yellow" class="filterOrderButtons" @click="handleStatusFilter(1)">{{ statusType[1] }}</v-btn>
                                <v-btn :variant="filterStatusClosed ? 'elevated' : 'outlined'" color="green" class="filterOrderButtons" @click="handleStatusFilter(2)">{{ statusType[2] }}</v-btn>
                            </v-col>
                            <v-btn variant="elevated" color="buttons" class="filterResetBtn" @click="handleResetButton">RESET</v-btn>
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
            isDescendingDate: true,
            filterStatusOpen: true,
            filterStatusRunning: true,
            filterStatusClosed: true,
                            
        }        
    },
    mounted() {
        this.elaborateReportsListData();
    },
    methods: {
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
        handleStatusFilter(type) {
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
            this.filterStatusType(this.statusType[type])        
        },
        handleResetButton() {
            this.isDescendingDate = true
            this.filterStatusOpen = true
            this.filterStatusRunning = true
            this.filterStatusClosed = true
            this.resetSortOrFilter()
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
.filterResetBtn{
    width: 100%;
    margin-top: 7px;
    margin-bottom: 7px;
}
</style>

<style src="./style/style.css"></style>