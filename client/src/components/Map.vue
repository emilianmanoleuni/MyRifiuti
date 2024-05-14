<template>
    <v-container class="mainBody">
        <v-row>
            <v-col cols="2">
                <v-card align="center">
                    <v-card-title class="text-h5">Mappa</v-card-title>
                </v-card>
            </v-col>
            <v-col></v-col>
            <v-col cols="4">
                <v-card class="align-self-end filterBlock">
                    <v-row>
                        <v-col cols="4">
                            <v-card-title class="text-body-2">Filtra per:</v-card-title>
                        </v-col>
                        <v-col cols="8" class="justify-end">
                            <v-btn size="small" :variant="filterAllStatus ? 'elevated' : 'outlined'" color="buttons" class="buttonsFilter" @click="filterAll()">Tutto</v-btn>
                            <v-btn size="small" :variant="filterCRMStatus ? 'elevated' : 'outlined'" color="buttons" class="buttonsFilter" @click="filterCRM()">CRM</v-btn>
                            <v-btn size="small" :variant="filterCestiniStatus ? 'elevated' : 'outlined'" color="buttons" class="buttonsFilter" @click="filterCestini()">CESTINI</v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        
        <v-card class="mapBlock">
            <div id="Gmap"></div>
        </v-card>
    </v-container>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'
import DatabaseService from '../services/DatabaseService'

export default{
    data(){
        return{
            filterAllStatus: true,      //Default
            filterCRMStatus: false,
            filtedCestiniStatus: false,
            loader: new Loader({
                apiKey: "AIzaSyAbvNOHAXW3QpDlSVDjqEVg4domRS-CTXU"
            }),
            mapOptions: {
                center: { 
                    lat: 46.06701012436948,  
                    lng: 11.121270724400874 
                },
                zoom: 11,
                disableDefaultUI: false,
            },
            imageBounds: {
                north: 46.1522083,
                south: 45.9757438,
                east: 11.1938382,
                west: 11.0214333, 
            },
        };
    },
    mounted(){
        this.loader
        .load()
        .then((google) => {
            const imgRoot = "./";
            const window = new google.maps.InfoWindow();
            const map = new google.maps.Map( 
                document.getElementById("Gmap"),
                this.mapOptions 
            );
            const borders = new google.maps.GroundOverlay(imgRoot.concat("borders.png"), this.imageBounds);
            if(this.$store.state.isUserLoggedIn){
                const highlightedBorders = new google.maps.GroundOverlay(pathImg.concat(this.$store.state.user.zone, ".png"), this.imageBounds);
                highlightedBorders.setMap(map);
            }
            DatabaseService.getMarker()
            .then(markerArray => {
                markerArray.forEach((marker) => {
                    let pathImg = imgRoot;
                    if(marker.label.includes("CRM")){
                        pathImg = pathImg.concat("CRM.png")
                    } else {
                        pathImg = pathImg.concat(marker.label, ".png") //CRM.png, Centro integrato.png, cestino.png
                    }
                    console.log(pathImg)
                    const mapMarker = new google.maps.Marker({
                                position: {
                                    lat: marker.lat,
                                    lng: marker.lng,
                                },
                                map,
                                title: marker.label,
                                icon: pathImg
                                });
                    mapMarker.addListener("click", () => {
                    window.close();
                    window.setContent(mapMarker.getTitle());
                    window.open(mapMarker.getMap(), mapMarker);
                    }) 
                });
            })
            .catch(msg => {
                console.log(msg);
            });
            borders.setMap(map);
        })
        .catch((msg) => console.log(msg) );
    },
    methods: {
        filterAll(){
            this.filterAllStatus = !this.filterAllStatus;
            this.filterCRMStatus = false;
            this.filterCestiniStatus = false;
            //Chiamata api
        },
        filterCRM(){
            this.filterCRMStatus = !this.filterCRMStatus;
            this.filterCestiniStatus = false;
            this.filterAllStatus = false;
            //Chiamata api
        },
        filterCestini(){
            this.filterCestiniStatus = !this.filterCestiniStatus;
            this.filterAllStatus = false;
            this.filterCRMStatus = false;
            //Chiamata api
        }
    }
}
</script>

<style scoped>

    #Gmap {
        margin: 15px;
        height: 600px;
        width: auto;
    }
    .filterBlock{
        margin-top: 16px;
    }
    .mapBlock{
        margin-top: 10px;
    }
    .buttonsFilter{
        margin-top: 5px;
        margin-right: 5px;
        margin-bottom: 5px;
    }
    .logoImage{
        margin-right: 20px;
    }
    .topButton{
        margin-right: 10px;
    }

</style>