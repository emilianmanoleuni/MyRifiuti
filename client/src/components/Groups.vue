<template>
    <v-container class="mainBody">
        <v-row>
            <v-col cols="2">
                <v-card align="center">
                    <v-card-title class="text-h5">Gruppi</v-card-title>
                </v-card>
            </v-col>
            <v-col></v-col>
            <v-col cols="4"></v-col>
        </v-row>
        <v-row cols="12">
            <v-col cols="12">
                <v-card v-if="isUserLoggedIn" class="soonOrLoginBox" align="center">
                    <v-card-title class="text-h6 soonOrLoginContent">Soon</v-card-title>
                </v-card>
                <v-card v-if="!isUserLoggedIn" class="soonOrLoginBox" align="center">
                    <v-card-title class="text-h6 soonOrLoginContent">Please Login first:</v-card-title>
                    <v-btn variant="elevated" color="buttons" :to="{ name: 'login' }">Login</v-btn>
                </v-card>
            </v-col>
        </v-row>
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
</style>
