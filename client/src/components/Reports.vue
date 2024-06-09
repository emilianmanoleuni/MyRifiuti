<template>
    <v-container class="mainBody">
        <v-row>
            <v-col cols="2">
                <v-card align="center">
                    <v-card-title class="text-h5">Segnalazioni</v-card-title>
                </v-card>
            </v-col>
            <v-col></v-col>
            <v-col cols="4"></v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card v-if="isUserLoggedIn" class="reportBox" align="center">
                    <v-card-title class="text-h5 titleReportPage">Modulo</v-card-title>
                    <v-row cols="12">
                        <v-col cols="12">
                            <v-form v-if="isUserLoggedIn" class="formBox">
                                <v-select
                                    class="selectorTypeOfReport"
                                    v-model="selectedTypeOfReport"
                                    :items="typesOfReports"
                                    :error-messages="serverErrors.reportType"
                                    label="Seleziona il tipo di segnalazione"
                                    dense
                                    style="margin-top: 15px;" 
                                ></v-select>
                                <v-text-field
                                    label="Titolo"
                                    class="titleField"
                                    v-model="reportTitle"
                                    :error-messages="serverErrors.reportTitle"
                                    placeholder="Titolo"
                                    outlined
                                ></v-text-field>
                                <v-row justify="center">
                                    <v-col cols="7" md="7">
                                        <v-text-field
                                            label="Via"
                                            class="viaField"
                                            v-model="reportRoad"
                                            :error-messages="serverErrors.reportRoad"
                                            placeholder="Via"
                                            outlined
                                        ></v-text-field>
                                    </v-col>    
                                    <v-col cols="2" md="2">
                                        <v-text-field
                                            label="Civico"
                                            class="civicoField"
                                            v-model="reportRoadNumber"
                                            :error-messages="serverErrors.reportRoadNumber"
                                            placeholder="Civico"
                                            outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="3" md="3">
                                        <v-select
                                            label="CAP"
                                            v-model="selectedCapOfReport"
                                            class="capField"
                                            :items="capOfReports"
                                            :error-messages="serverErrors.reportCap"
                                            placeholder="CAP"
                                            dense
                                        ></v-select>
                                    </v-col>
                                </v-row>
                                <v-select
                                    label="Seleziona la zona"
                                    v-model="selectedZoneOfReport"
                                    class="zoneField"
                                    :items="zones"
                                    :error-messages="serverErrors.reportZone"
                                    dense
                                ></v-select>
                                <v-textarea
                                    label="Descrivi il problema qui. Massimo 200 caratteri."
                                    class="reportDescription"
                                    v-model="reportDescription"
                                    :error-messages="serverErrors.reportDescription"
                                    plaveholder="Descrivi il problema qui. Massimo 200 caratteri"
                                    outlined
                                ></v-textarea>
                                <p class="subText">*Tutti i campi sono obbligatori affinché il personale adetto possa gestire al meglio la segnalazione</p>
                                <v-btn class="buttonReport" variant="elevated" color="buttons" @click="sendReport">Invia</v-btn>
                            </v-form>
                        </v-col>    
                    </v-row>
                </v-card>
                <v-card v-if="!isUserLoggedIn" class="soonOrLoginBox" align="center">
                    <v-card-title class="text-h6 soonOrLoginContent">Please Login first:</v-card-title>
                    <v-btn variant="elevated" color="buttons" :to="{ name: 'login' }">Login</v-btn>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { required, helpers, maxLength } from '@vuelidate/validators'
import MapService from '@/services/MapService'
import ReportService from '@/services/ReportService';

export default {
    setup() {
        const store = useStore()
        const isUserLoggedIn = computed(() => store.state.isUserLoggedIn)   
        const userId = computed(() => store.state.user)

        return {
            isUserLoggedIn,
            userId
        }
    },
    data(){
        return {
            typesOfReports : [], 
            selectedTypeOfReport: '',
            reportTitle: '',
            reportRoad: '',
            reportRoadNumber: '',
            capOfReports : [],
            selectedCapOfReport: '',
            zones: [],
            selectedZoneOfReport: '',
            reportDescription: '',
            serverErrors: {}
        }
    },
    validators(){
        return{
            form: {
                selectedTypeOfReport: { required },
                reportTitle: { required },
                reportRoad: { required },
                reportRoadNumber: { required },
                selectedCapOfReport: { required },
                selectedZoneOfReport: { required },
                reportDescription: { required, maxLength: maxLength(200) },
            }
        }
    },
    mounted(){
        this.initialize();
    },
    methods: {
        async initialize(){
            await this.getReportTypes();
            await this.getZones();
            await this.getCaps();
        },
        async getReportTypes() {
            try{
                const response = await ReportService.getReportTypes()
                this.typesOfReports = response.data
            } catch (error) {
                console.error("Error retrieving report types")
            }
        },
        async sendReport(){
            try{
                const response = await ReportService.sendReport({
                    reportType: this.selectedTypeOfReport,
                    reportTitle: this.reportTitle,
                    reportRoad: this.reportRoad,
                    reportRoadNumber: this.reportRoadNumber,
                    reportCap: this.selectedCapOfReport,
                    reportZone: this.selectedZoneOfReport,
                    reportDescription: this.reportDescription,
                    reportUserId: this.userId
                    //status directly assigned in backend
                });
                this.$router.go(0)   //reload
            } catch(error) {
                if (error.response && error.response.data && error.response.data.errors) {
                    // Clean errors if already exists
                    this.serverErrors = {};

                    // Push errors to struct Error
                    error.response.data.errors.forEach(err => {
                        this.serverErrors[err.path] = err.msg;
                    });
                } else {
                    this.serverErrors.general = 'An error occurred, please try again.';
                    console.error('Report error:', error);
                }
            }
        },
        async getCaps() {
            try {
                const response = await ReportService.getReportCaps()
                this.capOfReports = response.data
            } catch(error) {
                console.error("Error retrieving CAPS")
            }
        },
        async getZones(){
            try {
                await MapService.getZone()
                        .then(zoneArray => {
                            this.zones = [...zoneArray];
                        })
            } catch (error) {
                console.error("Error retrieving zones")
            }
        }
    }
}
</script>

<style scoped>
    .reportBox{
        height: auto;
    }
    .formBox{
        width: 90%;
    }
    .titleReportPage{
        margin-top: 10px;
    }
    .selectorTypeOfReport{
        margin-left: 15px;
        margin-right: 15px;
    }
    .titleField{
        margin-left: 15px;
        margin-right: 15px;
    }
    .viaField{
        margin-left: 15px;
    }
    .civicoField{

    }
    .capField{
        margin-right: 15px;
    }
    .zoneField{
        margin-left: 15px;
        margin-right: 15px;
    }
    .reportDescription{
        margin-left: 15px;
        margin-right: 15px;
        height: 200px;
    }
    .subText{
        font-size: 14px;;
        margin-top: -0px;
    }
    .buttonReport{
        margin-top: 15px;
        margin-bottom: 20px;
    }
</style>
