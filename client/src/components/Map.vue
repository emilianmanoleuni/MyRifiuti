<template>
    <h1>Map</h1>
    <div>
        <div id="Gmap" style="height: 100%;">

        </div>
    </div>
    <button @click="navigateTo({name: 'homepage'})">HomePage</button>
    <button @click="navigateTo({name: 'map'})">Map</button>
    <br>
</template>

<script>

export default{
    data(){
        return{
            map: null
        }
    },
    mounted(){
        this.initMap()
    },
    methods: {
        navigateTo (route){
            this.$router.push(route)
        },
        initMap(){
            this.map = new google.maps.Map(document.getElementById('Gmap'), {
                center: { lat: 100, lng: 100 },
                zoom: 8
            })
        }
    }
}
</script>

<style scoped>

</style>
