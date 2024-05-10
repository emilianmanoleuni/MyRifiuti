<template>
    <v-app>
      <v-app-bar app dense>
        <v-img src="/logo.png" class="logoImage" contain height="50" alt="Logo"></v-img>
        <v-toolbar-title>MyRifiuti</v-toolbar-title>
        <v-spacer></v-spacer> <!-- This pushes the menu items to the right -->
        <v-btn class="topButton" variant="elevated" color="buttons" text :to="{ name: 'homepageregistereduser' }">Calendario</v-btn>
        <v-btn class="topButton" variant="elevated" color="buttons" text :to="{ name: '' }">Gruppi</v-btn>
        <v-btn class="topButton" variant="elevated" color="buttons" text :to="{ name: '' }">Mappa</v-btn>
        <v-btn class="topButton" variant="elevated" color="buttons" text :to="{ name: '' }">Segnalazioni</v-btn>
      </v-app-bar>
  
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
  </template>

<script>

</script>

<style scoped>
    .logoImage{
        margin-right: 20px;
    }
    .topButton{
        margin-right: 10px;
    }
</style>
