<template>
  <div>
    <v-app-bar class="gradient" height="52">
      <v-app-bar-nav-icon @click="sidebarStatusChange">
        <v-icon color="white">fa fa-bars</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="pa-0">
        <span class="white--text">WFEngine</span>
      </v-toolbar-title>
      <v-row class="ml-2">
        <v-spacer></v-spacer>
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-avatar class=" avatar" v-if="currentUser.Avatar" v-on="on">
              <v-img
                :src="currentUser.Avatar"
                max-width="62"
                max-height="62"
              ></v-img>
            </v-avatar>
          </template>

          <v-list>
            <v-list-item>
              <v-row class="ma-0">
                qwe
              </v-row>
            </v-list-item>
            <v-list-item @click="changeLanguage('en')">
              <v-row class="ma-0">
                qwe
              </v-row>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
import user from "../common/user.service";
import organization from "../common/organization.service";
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
</style>
