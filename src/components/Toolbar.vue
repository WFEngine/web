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
            <v-list-item @click="$router.push({path:'/project/new'})">
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
            <v-list-item>
              <v-row class="ma-0">
                {{ $t("dashboard.profile") }}
              </v-row>
            </v-list-item>
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
import { LOGOUT_USER } from "../store/modules/auth/actions.type";
import { ShowErrorMessage } from "../common/alerts";
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
    refreshPage(){
      window.location.reload();
    }
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
