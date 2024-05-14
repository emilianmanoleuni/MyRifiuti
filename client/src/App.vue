<template>
  <header>
  </header>

  <v-layout v-if="!isLoginOrRegister">
    <v-app-bar>
      <v-img src="/logo.png" class="logoImage" contain height="50" alt="Logo"></v-img>
      <v-app-bar-title class="text-h5">MyRifiuti</v-app-bar-title>
      <v-spacer></v-spacer> 
      <v-btn class="topButton" variant="elevated" color="buttons" text :to="{ name: 'homepage' }">Calendario</v-btn>
      <v-btn class="topButton" variant="elevated" color="buttons" text :to="{ name: '' }">Gruppi</v-btn>
      <v-btn class="topButton" variant="elevated" color="buttons" text :to="{ name: 'map' }">Mappa</v-btn>
      <v-btn class="topButton" variant="elevated" color="buttons" text :to="{ name: '' }">Segnalazioni</v-btn>
      <v-btn class="topButton" variant="elevated" color="buttons" text :to="{ name: '' }">Profilo</v-btn>
    </v-app-bar>
  </v-layout>

  <RouterView/>

  <v-layout class="footer">
      <v-footer class="d-flex flex-column" color="footer">
        <span class="text-caption">
          MyRifiuti &nbsp;- &nbsp;Universita di Trento &nbsp;- &nbsp;Manole Emilian, Rigotti Leonardo, Pieropan Lorenzo
        </span>
      </v-footer>
    </v-layout>
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'

const route = useRoute()

const isLoginOrRegister = computed(() => {
  return route.name === 'login' || route.name === 'register'
})


</script>

<style scoped>
  .mainBody{
    margin-top: 65px;
  }
  .logoImage{
    margin-left: -30px;
    margin-right: -40px;
  }
  .topButton{
      margin-right: 10px;
  }
  .footer{
      min-width: 100%;
      position: fixed;
      bottom: 0;
    }




header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
