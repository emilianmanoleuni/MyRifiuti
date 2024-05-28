import { ref, computed } from 'vue';
import ReportService from '@/services/ReportService';

export default function useReports() {
    const reportsSections = ref(["Data - Ora", "Titolo", "Zona", "CAP", "Stato", "Vedi"]);
    const reports = ref([]);
    const statusType = ref([]); // 0 Aperta, 1 - In Corso, 2 - Risolta
    const dialog = ref(false);
    const selectedReport = ref({});
    const nReports = ref(0);
    const nOpenedReports = ref(0);
    const nRunningReports = ref(0);
    const nClosedReports = ref(0);
    const chartOptions = ref({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Numero di report per stato'
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
            data: [0, 0, 0],
            colorByPoint: true,
            colors: ['red', 'yellow', 'green']
        }]
    });

    const initializeData = async () => {
        try {
            await fetchStatusType(); // Important to do before filtering API
            await Promise.all([
                fetchAllReports(),
                fetchNumberOfAllReports(),
                fetchNumberOfAllStatusTypeReports()
            ]);
        } catch (error) {
            console.error('Error initializing data: ', error);
        }
    };

    const fetchAllReports = async () => {
        try {
            const response = await ReportService.getAllReports();
            reports.value = response.data;
            updateChart();
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    const fetchStatusType = async () => {
        try {
            const response = await ReportService.getStatusTypes();
            statusType.value = response.data;
        } catch (error) {
            console.error('Error fetching status type', error);
        }
    };

    const fetchNumberOfAllReports = async () => {
        try {
            const response = await ReportService.getNumberOfAllReports();
            nReports.value = response.data.nReports;
        } catch (error) {
            console.error('Error fetching number of reports type', error);
        }
    };

    const fetchNumberOfAllStatusTypeReports = async () => {
        try {
            const responseOpened = await ReportService.getNumberByStatusOfReports(statusType.value[0]);
            nOpenedReports.value = responseOpened.data.count[0].count;
            const responseRunning = await ReportService.getNumberByStatusOfReports(statusType.value[1]);
            nRunningReports.value = responseRunning.data.count[0].count;
            const responseClosed = await ReportService.getNumberByStatusOfReports(statusType.value[2]);
            nClosedReports.value = responseClosed.data.count[0].count;
            updateChart();
        } catch (error) {
            console.error('Error fetching number of reports type status', error);
        }
    };

    const vediReport = (report) => {
        selectedReport.value = report;
        dialog.value = true;
    };

    const saveReportStatus = async (report) => {
        try {
            await ReportService.saveReportStatus({
                _id: report._id,
                status: report.status
            });
            await fetchNumberOfAllStatusTypeReports();
        } catch (error) {
            console.error('Error saving report status', error);
        }
    };

    const updateChart = () => {
        chartOptions.value.series[0].data = [
            nOpenedReports.value,
            nRunningReports.value,
            nClosedReports.value,
        ];
    };

    const statusTypeColor = (report) => {
        switch (report.status) {
            case 'APERTA':
                return 'red';
            case 'IN CORSO':
                return 'yellow';
            case 'RISOLTA':
                return 'green';
            default:
                return 'gray';
        }
    };

    return {
        reportsSections,
        reports,
        statusType,
        dialog,
        selectedReport,
        nReports,
        nOpenedReports,
        nRunningReports,
        nClosedReports,
        chartOptions,
        initializeData,
        fetchAllReports,
        fetchStatusType,
        fetchNumberOfAllReports,
        fetchNumberOfAllStatusTypeReports,
        vediReport,
        saveReportStatus,
        updateChart,
        statusTypeColor
    };
}
