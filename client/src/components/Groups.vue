<template>
  <v-container class="mainBody">
      <v-row>
        <v-col cols="2">
          <v-card align="center">
            <v-card-title class="text-h5">Gruppi</v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row cols="12">
        <v-col cols="12">
          <v-card v-if="isUserLoggedIn" align="center">
                  <div v-if="groupId && !showAddForm && !showCreateForm">
                      <v-list>
                          <v-card-title class="text-h7 titleGroup">Il tuo gruppo {{ groupId }}</v-card-title>
                          <v-divider :thickness="3" class="dividerGroup"></v-divider>
                          <v-list-item>
                            <v-row cols="12" class="rowMember">
                              <v-col cols="4"></v-col>
                              <v-col cols="2">
                                <v-list-item-title class="text-h6">Membro</v-list-item-title>
                              </v-col>
                              <v-col cols="2">
                                <v-list-item-title class="text-h6">Ruolo</v-list-item-title>
                              </v-col>
                              <v-col cols="4"></v-col>
                            </v-row>
                          </v-list-item>
                          <v-list-item class="dividerMemberRole">
                            <v-row>
                              <v-col cols="4"></v-col>
                                <v-col cols="4">
                                  <v-divider :thickness="3"></v-divider>   
                                </v-col>
                              <v-col cols="4"></v-col>
                            </v-row>
                          </v-list-item>
                          <v-list-item v-for="(member, index) in groupComponents" :key="index">
                            <v-row cols="12" class="rowMember">
                              <v-col cols="4"></v-col>
                              <v-col cols="2">
                                <v-list-item-title align="center">{{ member.username }}</v-list-item-title>
                              </v-col>
                              <v-col cols="2">
                                <v-btn size="small" label variant="elevated" class="ruoloChip":color="setColorRole(member.role)">{{ member.role }}</v-btn>
                              </v-col>
                              <v-col cols="4"></v-col>
                            </v-row>       
                          </v-list-item>
                          <v-list-item class="dividerMemberRole">
                            <v-row>
                              <v-col cols="4"></v-col>
                                <v-col cols="4">
                                  <v-divider :thickness="3"></v-divider>   
                                </v-col>
                              <v-col cols="4"></v-col>
                            </v-row>
                          </v-list-item>
                          <v-card-text>Vuoi aggiungere al gruppo un tuo familiare/conquilino? Condividigli l'ID del gruppo!</v-card-text>
                          <v-btn class="leaveGroupBtn" variant="elevated" color="red" @click="removeMember" :to="{ name: 'groups' }">Esci dal gruppo</v-btn>
                      </v-list>
                  </div>
                  <div v-else-if="!showAddForm && !showCreateForm">
                      <v-card-title class="text-h6 noGroup">Nessun gruppo trovato per questo utente.</v-card-title>
                      <v-row cols="12" class="buttonsGroups">
                        <v-col cols="4"></v-col>
                        <v-col cols="2">
                          <v-btn variant="elevated" color="buttons" @click="openAddForm" block>Partecipa ad un gruppo</v-btn>
                        </v-col>
                        <v-col cols="2">
                          <v-btn variant="elevated" color="buttons" @click="openCreateForm" block>Crea un gruppo</v-btn>
                        </v-col>
                        <v-col cols="4"></v-col>
                      </v-row>
                  </div>
          </v-card>
          <v-dialog v-model="showAddForm" persistent min-width="25%" max-width="25%">
              <v-card>
                  <v-card-title class="text-h5 dialogTitle">Partecipa ad un gruppo</v-card-title>
                  <v-divider :thickness="3" class="dividerDialog"></v-divider>
                  <v-row cols="12">
                    <v-col cols="12">
                      <v-form class="formBlock">
                          <v-text-field
                              class="vselectDialog"
                              label="ID Gruppo"
                              type="text"
                              v-model="groupId"
                              placeholder="Inserisci l'ID del gruppo"
                              outlined
                          ></v-text-field>
                          
                          <v-select
                              class="vselectDialog"
                              label="Ruolo"
                              :items="roles"
                              v-model="role"
                          ></v-select>
        
                          <v-alert
                              v-if="errors"
                              class="allertRequired"
                              type="error"
                              dense
                          >{{ errors }}</v-alert>
                      </v-form>
                    </v-col>
                  </v-row>
                  <v-row cols="12" class="dialogBtns">
                    <v-col cols="6">
                      <v-btn class="buttons" variant="elevated" color="red" @click="closeAddForm" block>CHIUDI</v-btn>
                    </v-col>
                    <v-col cols="6">
                      <v-btn class="buttons" variant="elevated" color="buttons" @click="addMember" block>UNISCITI</v-btn>
                    </v-col>
                  </v-row>
              </v-card>
          </v-dialog>
          <v-dialog v-model="showCreateForm" persistent min-width="25%" max-width="25%">
              <v-card>
                  <v-card-title class="text-h5 dialogTitle">Crea un gruppo</v-card-title>
                  <v-divider :thickness="3" class="dividerDialog"></v-divider>
                  <v-row cols="12">
                    <v-col cols="12">
                      <v-form class="formBlock">
                        <v-select
                          class="vselectDialog"
                          label="Ruolo"
                          :items="roles"
                          v-model="role"
                        ></v-select>
            
                        <v-alert
                          class="allertRequired"
                          v-if="errors"
                          type="error"
                          dense
                          >{{ errors }}</v-alert>
                      </v-form>
                    </v-col>
                  </v-row>
                  <v-row cols="12" class="dialogBtns">
                    <v-col cols="6">
                      <v-btn class="dialogBtn" variant="elevated" color="red" @click="closeCreateForm" block>CHIUDI</v-btn>
                    </v-col>
                    <v-col cols="6">
                      <v-btn class="dialogBtn" variant="elevated" color="buttons" @click="createGroup" block>CREA</v-btn>                    </v-col>
                  </v-row>
              </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      <v-card v-if="!isUserLoggedIn" class="soonOrLoginBox" align="center">
          <v-card-title class="text-h6 soonOrLoginContent">Per proseguire eseguire il login:</v-card-title>
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
      roles: ['Imballaggi Leggeri', 'Vetro', 'Carta', 'Residuo', 'Organico'],
      groupComponents: [],
      showAddForm: false,
      showCreateForm: false,
      errors: '',
    };
  },
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
    setColorRole(role){
      switch(role){
        case'Imballaggi Leggeri':
          return 'plastic'
        case'Vetro':
          return 'glass'
        case'Carta':
          return 'paper'
        case'Residuo':
          return 'residue'
        case'Organico':
          return 'organic'
      }
    }
  },
};
</script>

<style scoped>
.mainBody {
}
.soonOrLoginBox {
  height: 300px;
}
.soonOrLoginContent {
  margin-top: 80px;
  margin-bottom: 15px;
}
.allertRequired{
  margin-top: 15px;
  margin-left: 7px;
  margin-right: 22px;
}
.noGroup{
  margin-top: 15px;
}
.buttonsGroups{
  margin-top: 5px;
  margin-bottom: 15px;
}
.titleGroup{
  margin-top: 5px;
  margin-bottom: 10px;
}
.dividerGroup{
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 20px;
}
.dividerMemberRole{
  margin-top: -25px;
  margin-bottom: -20px;
}
.rowMember{
  margin-top: 5px;
  margin-bottom: 5px;
}
.ruoloChip{
  width: 70%;
}
.dialogTitle{
  margin-top: 15px;
  margin-left: 15px;
  margin-bottom: 10px;
}
.formBlock{
  margin-left: 15px;
  margin-left: 15px;
}
.vselectDialog{
  margin-top: 25px;
  margin-left: 7px;
  margin-bottom: -15px;
  width: 95%;
}
.dividerDialog{
  margin-left: 10px;
  margin-right: 10px;
}
.dialogBtns{
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 15px;
}
.leaveGroupBtn{
  margin-top: 20px;
  margin-bottom: 15px;
}
</style>
