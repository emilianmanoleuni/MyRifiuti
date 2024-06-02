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
                        <v-btn variant="elevated" color="buttons" @click="removeMember" :to="{ name: 'groups' }">Esci dal gruppo</v-btn>
                    </v-list>
                </div>
                <div v-else-if="!showAddForm && !showCreateForm">
                    Nessun gruppo trovato per questo utente.
                    <v-btn variant="elevated" color="buttons" @click="openAddForm">Partecipa ad un gruppo</v-btn>
                    <v-btn variant="elevated" color="buttons" @click="openCreateForm">Crea un gruppo</v-btn>
                </div>
            </v-card-text>
        </v-card>
        <v-card v-if="showAddForm" class="fixed inset-0 flex items-center
                   justify-center bg-gray-900
                   bg-opacity-50 transition-opacity
                   duration-300">
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
                <v-btn class="buttons" variant="elevated" color="buttons" @click="closeAddForm" block>Chiudi form</v-btn>
              </v-form>
            </v-card-text>
        </v-card>
        <v-card v-if="showCreateForm" class="fixed inset-0 flex items-center
                   justify-center bg-gray-900
                   bg-opacity-50 transition-opacity
                   duration-300">
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
                <v-btn class="buttons" variant="elevated" color="buttons" @click="closeCreateForm" block>Chiudi form</v-btn>
              </v-form>
            </v-card-text>
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
import GroupService from '../services/GroupService'
import AuthenticationService from '../services/AuthenticationService'
import { and } from '@vuelidate/validators'

export default {
    data(){
        return{
            groupId: null, 
            role: null,
            roles: ['paper', 'glass', 'residue', 'plastic'],
            groupComponents: [],
            showAddForm: false,
            showCreateForm: false,
            errors: ''
        }
    },
    setup() {
        const store = useStore()
        const isUserLoggedIn = computed(() => store.state.isUserLoggedIn)
        const userId = computed(() => store.state.user)
        return {
            isUserLoggedIn,
            userId
        }
    },
    mounted(){
        this.getGroup();
    },
    methods: {
        getGroup(){
            this.groupComponents = []
            this.groupId = null
            GroupService.getGroup(this.userId._id)
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
        },
        addMember(){
            this.showAddForm = false;
            GroupService.addMember({
                groupId: this.groupId,
                userId: this.userId._id,
                role: this.role
            })
            .then(response => {
                this.getGroup();
                console.log(response);
            })
            .catch(msg => {
                console.log(msg);
            })
        },
        removeMember(){
            GroupService.removeMember({
                groupId: this.groupId,
                userId: this.userId._id
            })
            .then(response => {
                this.getGroup();
                console.log(response);
            })
            .catch(msg => {
                console.log(msg);
            })
        },
        openAddForm(){
            this.showAddForm = true;

        },
        closeAddForm(){
            this.showAddForm = false;
        },
        openCreateForm(){
            this.showCreateForm = true;
        },
        closeCreateForm(){
            this.showCreateForm = false;
        },
        createGroup(){
            this.showCreateForm = false;
            GroupService.createGroup({
                userId: this.userId._id,
                role: this.role
            })
            .then(response => {
                this.groupId = response;
                this.getGroup();
            })
            .catch(msg => {
                console.log(msg);
            })
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
