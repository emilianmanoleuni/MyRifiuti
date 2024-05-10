<template>
    <h1>Map</h1>
    <h1 v-if="$store.state.isUserLoggedIn">Sei loggato</h1>
    <div>
        <div id="Gmap">

        </div>
    </div>
    <button @click="navigateTo({name: 'homepage'})">HomePage</button>
    <button @click="navigateTo({name: 'map'})">Map</button>
    <br>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'

import store from '@/store/store';

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
            markers: [
                {
                    lat: 46.10545314902608, 
                    lng: 11.101276873613214,
                    label: "CRM Gardolo"
                },
                {
                    lat: 46.08891705707912, 
                    lng: 11.135367335099385,
                    label: "CRM Argentario"
                },
                {
                    lat: 46.063658777361454, 
                    lng: 11.150853685743687,
                    label: "CRM Povo"
                },
                {
                    lat: 46.01504102186188, 
                    lng: 11.12441783438013,
                    label: "CRM Mattarello"
                },
                {
                    lat: 46.063658777167184, 
                    lng: 11.109654954791342,
                    label: "Centro integrato"
                },
                {
                    lat: 46.08723727053129, 
                    lng: 11.049230151597078,
                    label: "CRM Sopramonte"
                }
            ],
        };
    },
    created(){
        this.loader
        .load()
        .then((google) => {
            const window = new google.maps.InfoWindow();
            const map = new google.maps.Map( 
                document.getElementById("Gmap"),
                this.mapOptions 
            );
            this.markers.forEach((marker) => {
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
            const pathImg = "../../public/";
            const borders = new google.maps.GroundOverlay(pathImg.concat("borders.png"), this.imageBounds);
            if(this.$store.state.isUserLoggedIn){
                const highlightedBorders = new google.maps.GroundOverlay(pathImg.concat(this.$store.state.user.zone, ".png"), this.imageBounds);
                highlightedBorders.setMap(map);
            }
            borders.setMap(map);
            console.log(this.$store.state.user)
        })
        .catch((msg) => console.log(msg) );
    },
    methods: {
        navigateTo (route){
            this.$router.push(route)
        }
    }
}
</script>

<style scoped>

#Gmap {
    height: 500px;
    width: 1000px;
}

</style>