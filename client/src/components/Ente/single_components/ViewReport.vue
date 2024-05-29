<template>
    <v-dialog v-model="dialogVisible" class="viewReport">
        <v-card>
            <v-card-title class="text-h4 titleViewReport"> {{ report.title }}</v-card-title>
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
                                {{ report._id }}<br>
                                {{ report.createdAt }}<br>
                                {{ report.type }}
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
                                {{ report.road }}<br>
                                {{ report.roadNumber }}<br>
                                {{ report.cap }}<br>
                                {{ report.zone }}
                            </v-col>
                        </v-row>
                        <v-divider :thickness="3"></v-divider>
                        <p class="text-h6 contentReport subTitleContentReport">Descrizione</p>
                        <span class="contentReport">{{ report.description }}</span>
                    </v-col>
                    <v-col cols="5">
                        <v-row cols="12">
                            <v-col cols="9">
                                <v-select
                                    variant="solo"
                                    :color="statusTypeColor(report)"
                                    class="selectStatusReport"
                                    v-model="report.status"
                                    :items="statusType"
                                    label="Aggiorna lo stato:"
                                    dense
                                ></v-select>
                            </v-col>
                            <v-col cols="3" class="d-flex align-center mb-6">
                                <v-btn variant="elevated" color="buttons" @click="saveReportStatus">Salva</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn class="closeViewReportBtn" variant="elevated" color="buttons" @click="closeViewReport">Chiudi</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>            
</template>

<script>
import { EnteMixin } from '../mixin/EnteMixin';

export default {
    mixins: [EnteMixin],
    props: {
        report: {
            type: Object
        },
        statusType: {
            type: Array
        }
    },
    methods: {
        closeViewReport() {
            this.$emit('emitCloseViewReport');
        },
        async saveReportStatus() {
            this.$emit('emitSaveReportStatus');
        },
    }
};
</script>

<style scoped>
</style>

<style src="../style/style.css"></style>