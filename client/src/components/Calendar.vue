<template>
  <div>
    <v-select
      v-model="selectedLocation"
      :items="locations"
      label="Seleziona circoscrizione"
      dense
      style="margin-top: 90px;" 
    ></v-select>

    <div class="calendar-container" style="margin-top: 20px;"> 
      <VCalendar :attributes="attributes" class="calendar" expanded />
    </div>

    <div v-if="$store.state.isUserLoggedIn" class="text-block">
      <p>zona - {{ $store.state.user.zone }} - selezionare la zona nel menù a tendina</p>
    </div>
    <div v-else class="text-block">
      <p>navigazione anonima</p>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, watchEffect } from 'vue'
import 'v-calendar/style.css';


const selectedLocation = ref('');
const locations = [
  'RAVINA - ROMAGNANO',
  'POVO - VILLAZZANO',
  'ARGENTARIO',
  'BONDONE - SARGAGNA',
  'MATTARELLO',
  'S. GIUSEPPE - S.CHIARA',
  'CRISTO RE - SAN MARTINO',
  'PIDEDICASTELLO - SOLTERI - VELA - CAMPOTRENTINO',
  'VIA KOFLER - CASTELLER',
  'GARDOLO',
  'GARDOLO ZONA INDUSTRIALE - MEANO',
  'OLTREFERSINA'
];


const getWeekdayNumber = (location, wasteType) => {
  const schedules = {
  "RAVINA - ROMAGNANO": {
    organico: 3, // Tuesday
    carta: 4, // Wednesday
    "imballaggi leggeri": 6, // Friday
    residuo: 4, // Wednesday
    vetro: 4 // Wednesday
  },
  "POVO - VILLAZZANO": {
    organico: 2, // Monday
    carta: 5, // Thursday
    "imballaggi leggeri": 6, // Friday
    residuo: 2, // Monday
    vetro: 2 // Monday
  },
  ARGENTARIO: {
    organico: 3, // Tuesday
    carta: 6, // Friday
    "imballaggi leggeri": 4, // Wednesday
    residuo: 4, // Wednesday
    vetro: 4 // Wednesday
  },
  "BONDONE - SARGAGNA": {
    organico: 2, // Monday
    carta: 4, // Wednesday
    "imballaggi leggeri": 5, // Thursday
    residuo: 2, // Monday
    vetro: 2 // Monday
  },
  MATTARELLO: {
    organico: 3, // Tuesday
    carta: 4, // Wednesday
    "imballaggi leggeri": 3, // Tuesday
    residuo: 7, // Friday
    vetro: 7 // Friday
  },
  "S. GIUSEPPE - S.CHIARA": {
    organico: 3, // Tuesday
    carta: 6, // Friday
    "imballaggi leggeri": 4, // Wednesday
    residuo: 3, // Tuesday
    vetro: 3 // Tuesday
  },
  "CRISTO RE - SAN MARTINO": {
    organico: 2, // Monday
    carta: 2, // Monday
    "imballaggi leggeri": 3, // Tuesday
    residuo: 5, // Thursday
    vetro: 5 // Thursday
  },
  "PIDEDICASTELLO - SOLTERI - VELA - CAMPOTRENTINO": {
    organico: 2, // Monday
    carta: 2, // Monday
    "imballaggi leggeri": 3, // Tuesday
    residuo: 5, // Thursday
    vetro: 5 // Thursday
  },
  "VIA KOFLER - CASTELLER": {
    organico: 3, // Tuesday
    carta: 6, // Friday
    "imballaggi leggeri": 2, // Monday
    residuo: 3, // Tuesday
    vetro: 3 // Tuesday
  },
  "GARDOLO": {
    organico: 3, // Tuesday
    carta: 3, // Tuesday
    "imballaggi leggeri": 6, // Friday
    residuo: 4, // Wednesday
    vetro: 4 // Wednesday
  },
  "GARDOLO ZONA INDUSTRIALE - MEANO": {
    organico: 2, // Monday
    carta: 2, // Monday
    "imballaggi leggeri": 5, // Thursday
    residuo: 5, // Thursday
    vetro: 4 // Wednesday
  },
  "OLTREFERSINA": {
    organico: 2, // Monday
    carta: 2, // Monday
    "imballaggi leggeri": 4, // Wednesday
    residuo: 5, // Thursday
    vetro: 2 // Monday
  }
};


  return schedules[location][wasteType];
  
};

const todos = ref([]);

const attributes = computed(() => [
  // Attributes for todos
  ...todos.value.map(todo => ({
    dates: todo.dates,
    dot: {
      color: todo.color,
      ...(todo.isComplete && { class: 'opacity-75' }),
    },
    popover: {
      label: todo.description,
    },
  })),
]);

// Watch for changes in selectedLocation and update todos accordingly
watchEffect(() => {
  // Clear existing todos
  todos.value = [];

  // Add todos for the selected location
  if (selectedLocation.value) {
    todos.value.push(
      {
        description: 'Organico',
        isComplete: false,
        dates: { repeat: { weekdays: getWeekdayNumber(selectedLocation.value, 'organico') } },
        color: 'green',
      },
      {
        description: 'Carta',
        isComplete: false,
        dates: { repeat: { weekdays: getWeekdayNumber(selectedLocation.value, 'carta') } },
        color: 'blue',
      },
      {
        description: 'Imballaggi leggeri',
        isComplete: false,
        dates: { repeat: { weekdays: getWeekdayNumber(selectedLocation.value, 'imballaggi leggeri') } },
        color: 'yellow',
      },
      {
        description: 'Residuo',
        isComplete: false,
        dates: { repeat: { weekdays: getWeekdayNumber(selectedLocation.value, 'residuo') } },
        color: 'red',
      },
      {
        description: 'Vetro',
        isComplete: false,
        dates: { repeat: { weekdays: getWeekdayNumber(selectedLocation.value, 'vetro') } },
        color: 'purple',
      }
    );
  }
});

</script>

<script>
export default {
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  }
}
</script>

<style scoped>
.calendar-container {
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar {
  width: 70%; /* Adjust the width as needed */
  height: 100%; /* Adjust the height as needed */
}

.calendar .vcal-date-cell {
  font-size: 90px; /* Adjust the font size as needed */
}
</style>
