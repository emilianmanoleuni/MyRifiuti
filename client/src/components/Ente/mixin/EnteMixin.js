import { computed } from 'vue'
import { useStore } from 'vuex'
import ReportService from '@/services/ReportService';
import MailService from '@/services/MailService';
import AuthenticationService from '@/services/AuthenticationService';
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
import Accessibility from "highcharts/modules/accessibility";


highcharts3d(Highcharts); // Enable 3D module

export const EnteMixin = {
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
            selectedReport: {},
            dialogVisible: false,
            nReports: 0,
            nOpenedReports: 0,
            nRunningReports: 0,
            nClosedReports: 0,
            nOpenedReportsPercent: 0,
            nRunningReportsPercent: 0,
            nClosedReportsPercent: 0,
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
                        text: 'Numero di Segnalazioni'
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
    methods: {
        /*  INITIALIZING DATA AND PROCESSING FOR LOADING PAGES  */
        async initializeData() {
            try {
                await this.fetchStatusType(), //Importat to do before filtering api
                await this.fetchAllReports(),
                await Promise.all([
                    this.fetchNumberOfAllReports(),
                    this.fetchNumberOfAllStatusTypeReports()
                ]);
            } catch (error) {
                console.error('Error initializing data: ', error);
            }
        },
        async elaborateHomepageData(){
            try {
                await this.initializeData();
                await this.fetchAndSliceReportsForDashboard();
            } catch (error) {
                console.error('Error elaborating homepage data');
            }
        },
        async elaborateReportsListData(){
            try {
                await this.initializeData();
                await this.sliceReportsList(0, this.nReports);
            } catch (error) {
                console.error('Error elaborating repots data');
            }
        },
        async elaborateReportsAnalyticsData(){
            try {
                await this.initializeData();
            } catch (error) {
                console.error('Error elaborating analytics data');
            }
        },
        
        /*  FETCHING FROM DB DATA  */
        async fetchAllReports() {
            try {
                const response = await ReportService.getAllReports()
                this.reports = response.data;
                this.reports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); //Auto ordering from last to older
            } catch(error) {
                console.error('Error fetching reports');
            }
        },
        async fetchAndSliceReportsForDashboard() {
            try {
                this.slicedReports = this.reports;
                this.slicedReports = this.slicedReports.slice(0, 8);
            } catch (error) {
                console.error('Error fetching homepage reports');
            }
        },
        async sliceReportsList(indexList, nToList) {
            try {
                this.slicedReports = this.reports;
                this.slicedReports = this.slicedReports.slice(indexList, nToList);
            } catch (error) {
                console.error('Error slicing reports');
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
                if(this.$route.name === 'enteHomepage' || this.$route.name === 'enteAnalytics'){
                    this.$refs.nReportsWidget.textContent = this.nReports;
                }
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
                
                //Update Analytics
                if(this.$route.name === 'enteAnalytics'){
                    this.$refs.nReportOpensWidget.textContent = this.nOpenedReports;
                    this.$refs.nReportsRunningWidget.textContent = this.nRunningReports;
                    this.$refs.nReportsClosedWidget.textContent = this.nClosedReports;

                    this.nOpenedReportsPercent =  (this.nOpenedReports / this.nReports * 100).toFixed(2);
                    this.nRunningReportsPercent = (this.nRunningReports / this.nReports * 100).toFixed(2);
                    this.nClosedReportsPercent = (this.nClosedReports / this.nReports * 100).toFixed(2);

                    this.$refs.nReportOpensWidgetPercent.textContent = this.nOpenedReportsPercent + '%';
                    this.$refs.nReportsRunningWidgetPercent.textContent = this.nRunningReportsPercent + '%';
                    this.$refs.nReportsClosedWidgetPercent.textContent = this.nClosedReportsPercent + '%';
                }
                this.updateChart();
            } catch(error) {
                console.error('Error fetching number of reports type status');
            }
        },
        /*  FILTERING  ACTIONS  */
        resetSortOrFilter()  {
            try {
                this.slicedReports = this.reports
            } catch(error){
                console.error("Error reset filtering") 
            }
        },
        sortAscendingDate() {
            try {
                this.slicedReports.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            } catch(error){
                console.error("Error reset filtering") 
            }
        },
        sortDescendingDate() {
            try {
                this.slicedReports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            } catch(error){
                console.error("Error filtering") 
            }
        },
        filterType(type){
            try {
                this.slicedReports = this.slicedReports.filter( report => report.type === type);
            } catch(error){
                console.error("Error filtering") 
            }
        },
        filterCap(cap){
            try {
                this.slicedReports = this.slicedReports.filter( report => report.cap.toString().trim() === cap.toString().trim());
            } catch(error){
                console.error("Error filtering") 
            }
        },
        filterZone(zone) {
            try {
                this.slicedReports = this.slicedReports.filter( report => report.zone === zone);
            } catch(error){
                console.error("Error filtering") 
            }
        },
        filterStatusType(type) {
            try {
                this.slicedReports = this.slicedReports.filter( report => report.status === type);
            } catch(error){
                console.error("Error filtering") 
            }
        },
        /*  VIEW REPORT  */
        openViewReport(report){
            try {
                this.selectedReport = report
                this.dialogVisible = true
            } catch(error) {
                console.error("Error opening report")
            }
        },
        closeViewReport(){
            try {
                this.dialogVisible = false 
            } catch(error) {
                console.error("Error closing report")
            }
        },
        async saveReportStatus(){
            try {
                await ReportService.saveReportStatus({
                    _id : this.selectedReport._id,
                    status : this.selectedReport.status
                });
                const userName = (await AuthenticationService.getUserName(this.selectedReport.user)).data.username
                const userEmail = await (await AuthenticationService.getEmail(this.selectedReport.user)).data.email
                console.log(userName)
                console.log(userEmail)
                await MailService.sendReportUpdateEmail({
                    userName: userName,
                    userEmail: userEmail,
                    reportId: this.selectedReport._id,
                    status: this.selectedReport.status
                })
                await this.fetchNumberOfAllStatusTypeReports();
                this.updateChart();
            } catch(error) {
                console.error('Error saving report status');
            }
        },
        /*  CHARTS AND ANALYTICS  */
        async updateChart() {
            try{
                this.chartReportStatusOptions.series[0].data = [
                    this.nOpenedReports,
                    this.nRunningReports,
                    this.nClosedReports,
                ];
            } catch(error) {
                console.error("Error updating Statuses Chart")
            }
            
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
}