<template>
    <v-container class="mainBody">
        <v-card v-if="isUserLoggedIn" class="soonOrLoginBox" align="center">
            <v-card-title class="text-h6 soonOrLoginContent">Soon</v-card-title>
        </v-card>
        <v-card v-if="!isUserLoggedIn" class="soonOrLoginBox" align="center">
            <v-card-title class="text-h6 soonOrLoginContent">Please Login first:</v-card-title>
            <v-btn variant="elevated" color="buttons" :to="{ name: 'login' }">Login</v-btn>
        </v-card>
    </v-container>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const isUserLoggedIn = computed(() => store.state.isUserLoggedIn)

    return {
      isUserLoggedIn
    }
  }
}
</script>

<style scoped>
    .soonOrLoginBox{
        height: 300px;
    }
    .soonOrLoginContent{
        margin-top: 80px;
    }
</style>
