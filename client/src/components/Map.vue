<template>
    <v-container class="mainBody">
        <v-card>
            <v-card-title class="text-body-2">Filtra per:</v-card-title>
            <v-btn size="small" :variant="buttonType === 'outlined' ? 'outlined' : 'elevated'" color="buttons" class="buttonsFilter" @click="filterAll(this)">Tutto</v-btn>
            <v-btn size="small" :variant="buttonType === 'outlined' && selectedButton !== 'Tutto' ? 'elevated' : 'outlined'" color="buttonsLight" class="buttonsFilter" @click="filterCRM(this)">CRM</v-btn>
            <v-btn size="small" :variant="buttonType === 'outlined' && selectedButton !== 'Tutto' ? 'elevated' : 'outlined'" color="buttonsLight" class="buttonsFilter" @click="filterCestini(this)">CESTINI</v-btn>
        </v-card>
        <br>
        <v-card>
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
            const window = new google.maps.InfoWindow();
            const map = new google.maps.Map( 
                document.getElementById("Gmap"),
                this.mapOptions 
            );
            const pathImg = "../../public/";
            const borders = new google.maps.GroundOverlay(pathImg.concat("borders.png"), this.imageBounds);
            if(this.$store.state.isUserLoggedIn){
                const highlightedBorders = new google.maps.GroundOverlay(pathImg.concat(this.$store.state.user.zone, ".png"), this.imageBounds);
                highlightedBorders.setMap(map);
            }
            DatabaseService.getMarker()
            .then(markerArray => {
                markerArray.forEach((marker) => {
                const mapMarker = new google.maps.Marker({
                                    position: {
                                    lat: marker.lat,
                                    lng: marker.lng,
                                    },
                                map,
                                title: marker.label,
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
        changeButtonStatus(){
            this.buttonType = 'elevated';
        },
        filterAll(){
            this.selectedButton = 'Tutto';
            this.changeButtonStatus();
        },
        filterCRM(){
            this.selectedButton = 'CRM';
            this.changeButtonStatus();
        },
        filterCestini(){
            this.selectedButton = 'CESTINI';
            this.changeButtonStatus();
        },
        navigateTo (route){
            this.$router.push(route)
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