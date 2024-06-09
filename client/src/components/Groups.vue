<template>
  <v-container class="mainBody">
      <v-card v-if="isUserLoggedIn" align="center">
          <v-card-title class="text-h6">Gruppi</v-card-title>
          <v-card-text>
              <div v-if="groupId && !showAddForm && !showCreateForm">
                  <v-list>
                      <h3>Il tuo gruppo: {{ groupId }}</h3>
                      <v-list-item v-for="(member, index) in groupComponents" :key="index">
                          <v-list-item-content>
                              <v-list-item-title>{{ member.username }} - {{ member.role }}</v-list-item-title>
                          </v-list-item-content>
                      </v-list-item>
                      <v-btn variant="elevated" color="red" @click="removeMember" :to="{ name: 'groups' }">Esci dal gruppo</v-btn>
                  </v-list>
              </div>
              <div v-else-if="!showAddForm && !showCreateForm">
                  <p>Nessun gruppo trovato per questo utente.</p>
                  <v-btn variant="elevated" color="buttons" @click="openAddForm">Partecipa ad un gruppo</v-btn>
                  <v-btn variant="elevated" color="buttons" @click="openCreateForm">Crea un gruppo</v-btn>
              </div>
          </v-card-text>
      </v-card>
      <v-dialog v-model="showAddForm" persistent max-width="600px">
          <v-card>
              <v-card-title>
                  <span class="text-h5">Partecipa ad un gruppo</span>
              </v-card-title>
              <v-card-text>
                  <v-form>
                      <v-text-field
                          label="Group ID"
                          type="text"
                          v-model="groupId"
                          placeholder="Enter group ID"
                          outlined
                      ></v-text-field>
                      
                      <v-select
                          label="Role"
                          :items="roles"
                          v-model="role"
                      ></v-select>
    
                      <v-alert
                          v-if="errors"
                          type="error"
                          dense
                      >{{ errors }}</v-alert>
                      
                      <v-btn class="buttons" variant="elevated" color="buttons" @click="addMember">Invia</v-btn>
                      <v-btn class="buttons" variant="elevated" color="red" @click="closeAddForm">Chiudi form</v-btn>
                  </v-form>
              </v-card-text>
          </v-card>
      </v-dialog>
      <v-dialog v-model="showCreateForm" persistent max-width="600px">
          <v-card>
              <v-card-title>
                  <span class="text-h5">Crea un gruppo</span>
              </v-card-title>
              <v-card-text>
                  <v-form>
                      <v-select
                          label="Role"
                          :items="roles"
                          v-model="role"
                      ></v-select>
    
                      <v-alert
                          v-if="errors"
                          type="error"
                          dense
                      >{{ errors }}</v-alert>
                      
                      <v-btn class="buttons" variant="elevated" color="buttons" @click="createGroup">Invia</v-btn>
                      <v-btn class="buttons" variant="elevated" color="red" @click="closeCreateForm">Chiudi form</v-btn>
                  </v-form>
              </v-card-text>
          </v-card>
      </v-dialog>
      <v-card v-if="!isUserLoggedIn" class="soonOrLoginBox" align="center">
          <v-card-title class="text-h6 soonOrLoginContent">Please Login first:</v-card-title>
          <v-btn variant="elevated" color="buttons" :to="{ name: 'login' }">Login</v-btn>
      </v-card>
    </v-container>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import GroupService from '../services/GroupService'
import AuthenticationService from '../services/AuthenticationService'
import { and } from '@vuelidate/validators'

export default {
  data() {
    return {
      groupId: null,
      role: null,
      roles: ['Imballaggi leggeri', 'Vetro', 'Carta', 'Residuo', 'Organico'],
      groupComponents: [],
      showAddForm: false,
      showCreateForm: false,
      errors: '',
    };
  },
  setup() {
    const store = useStore();
    const isUserLoggedIn = computed(() => store.state.isUserLoggedIn);
    const userId = computed(() => store.state.user);
    return {
      isUserLoggedIn,
      userId,
    };
  },
  mounted() {
    this.getGroup();
  },
  methods: {
    async getGroup(){
        try{
            this.groupComponents = []
            this.groupId = null
            await GroupService.getGroup(this.userId._id)
            .then((groupObject) => {
                this.groupId = groupObject._id;
                groupObject.members.forEach((member) => {
                    AuthenticationService.getUserName(member.userId)
                    .then((usernameObject) => {
                        this.groupComponents.push({ username: usernameObject.data.username, role: member.role })
                    })
                })
            })
            .catch(msg => {
                console.log(msg);
            });
        } catch (error) {
            console.error(error);
        }
    },
    async addMember() {
      try {
        await GroupService.addMember({
          groupId: this.groupId,
          userId: this.userId._id,
          role: this.role,
        });
        this.getGroup();
        this.showAddForm = false;
        this.errors = ''
      } catch (error) {
        console.error(error);
        if(error.response && error.response.data){
            this.errors = error.response.data.error
        } else {
            this.errors = 'An error occured, please try again'
            console.error('Server errror: ', error);
        }
      }
    },
    async removeMember() {
      try {
        await GroupService.removeMember({
          groupId: this.groupId,
          userId: this.userId._id,
        });
        this.groupId = null;
        this.role = '';
        this.getGroup();
      } catch (msg) {
        console.error(msg);
      }
    },
    openAddForm() {
      this.showAddForm = true;
    },
    closeAddForm() {
      this.showAddForm = false;
      this.groupId = null;
      this.role = null;
      this.errors = ''
    },
    openCreateForm() {
      this.showCreateForm = true;
    },
    closeCreateForm() {
      this.showCreateForm = false;
      this.groupId = null;
      this.role = null;
      this.errors = ''
    },
    async createGroup() {
      try {
        const response = await GroupService.createGroup({
          userId: this.userId._id,
          role: this.role,
        });
        this.groupId = response;
        this.getGroup();
        this.showCreateForm = false;
        this.errors = ''
    } catch (error) {
        console.error(error);
        if(error.response && error.response.data){
           this.errors = error.response.data.error
        } else {
            this.errors = 'An error occured, please try again'
            console.error('Server errror: ', error);
        }
      }
    },
  },
};
</script>

<style scoped>
.mainBody {
    padding: 20px;
}
.soonOrLoginBox {
    height: 300px;
}
.soonOrLoginContent {
    margin-top: 80px;
}
.v-dialog .v-card {
    width: 100%;
    max-width: 600px;
    padding: 20px;
}
.v-card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.v-card-text {
    padding: 0 20px 20px 20px;
}
.v-btn {
    margin: 5px;
}
</style>
