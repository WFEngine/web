<template>
  <div>
    <v-app-bar class="gradient" height="52">
      <v-app-bar-nav-icon @click="sidebarStatusChange">
        <v-icon color="white">fa fa-bars</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="pa-0" v-if="!show">
        <span class="white--text">WFEngine</span>
      </v-toolbar-title>
      <v-row class="ml-2">
        <v-spacer></v-spacer>
        <!-- Language Menu !-->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar class="avatar mr-1" v-on="on" v-bind="attrs">
              <country-flag
                v-if="currentUser.LanguageId == 1"
                country="tr"
                size="normal"
                rounded="true"
              />
              <country-flag v-else country="us" size="normal" rounded="true" />
            </v-avatar>
          </template>

          <v-list>
            <v-list-item>
              <v-avatar class="avatar mr-1" @click="changeLanguage(1)">
                <country-flag country="tr" size="normal" rounded="true" />
              </v-avatar>
            </v-list-item>
            <v-list-item>
              <v-avatar class="avatar mr-1" @click="changeLanguage(2)">
                <country-flag country="us" size="normal" rounded="true" />
              </v-avatar>
            </v-list-item>
            <!-- Log Out Item !-->
          </v-list>
        </v-menu>
        <!-- Language Menu !-->
        <!-- Ad New Item Menu !-->
        <v-btn icon @click="refreshPage">
          <v-icon color="white">fa fa-sync-alt</v-icon>
        </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mr-2" icon v-on="on" v-bind="attrs">
              <v-icon class="white--text">fa fa-plus</v-icon>
            </v-btn>
          </template>
          <v-list>
            <!-- New Solution Item !-->
            <v-list-item @click="$router.push({ path: '/solution/new' })">
              <v-row class="ma-0">
                {{ $t("dashboard.newSolution") }}
              </v-row>
            </v-list-item>
            <!-- New Solution Item !-->

            <!-- New Project Item !-->
            <v-list-item @click="$router.push({ path: '/project/new' })">
              <v-row class="ma-0">
                {{ $t("dashboard.newProject") }}
              </v-row>
            </v-list-item>
            <!-- New Project Item !-->
          </v-list>
        </v-menu>
        <!-- Ad New Item Menu !-->

        <!-- Settings Menu!-->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar
              class="avatar mr-1"
              v-if="currentUser.Avatar"
              v-on="on"
              v-bind="attrs"
            >
              <v-img
                :src="currentUser.Avatar"
                max-width="62"
                max-height="62"
              ></v-img>
            </v-avatar>
          </template>

          <v-list>
            <!-- Profile Item !-->
            <!-- <v-list-item>
              <v-row class="ma-0">
                {{ $t("dashboard.profile") }}
              </v-row>
            </v-list-item> -->
            <!-- Profile Item !-->
            <!-- Log Out Item !-->
            <v-list-item @click="logOut">
              <v-row class="ma-0">
                {{ $t("dashboard.logout") }}
              </v-row>
            </v-list-item>
            <!-- Log Out Item !-->
          </v-list>
        </v-menu>
        <!-- Settings Menu!-->
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
import user from "../common/user.service";
import organization from "../common/organization.service";
import { LOGOUT_USER,CHANGE_LANGUAGE,GET_USER } from "../store/modules/auth/actions.type";
import { ShowErrorMessage,ShowSuccessMessage } from "../common/alerts";
import updateLanguageEntity from '../entities/auth/updatelanguage'
export default {
  props: {
    show: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      currentUser: user.getUser(),
      currentOrganization: organization.getOrganization(),
    };
  },
  methods: {
    sidebarStatusChange() {
      this.$emit("sidebarClosed");
    },
    logOut() {
      this.$store
        .dispatch(LOGOUT_USER)
        .then(() => {
          this.$router.push({
            path: "/auth/login",
          });
        })
        .catch((err) => {
          ShowErrorMessage(err.message);
        });
    },
    refreshPage() {
      window.location.reload();
    },
    changeLanguage(languageId) {
      var userLanguage = Object.assign({},updateLanguageEntity);
      userLanguage.LanguageId = languageId;
      
      this.$store.dispatch(CHANGE_LANGUAGE,userLanguage).then((payload)=>{
        ShowSuccessMessage(payload.message);
        this.$store.dispatch(GET_USER).then((payload)=>{
          ShowSuccessMessage(payload.message)
          this.refreshPage();
        }).catch((err)=>{
          ShowErrorMessage(err.message);
        })
      }).catch((err)=>{
        ShowErrorMessage(err.message);
      })

    },
  },
};
</script>

<style scoped>
.v-toolbar__content {
  margin: 0px !important;
  padding: 0px !important;
}
.avatar {
  cursor: pointer;
}
.v-list-item {
  cursor: pointer;
}
</style>
