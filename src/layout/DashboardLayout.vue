<template>
  <v-app>
    <v-main>
      <toolbar :show="sidebarShow" v-on:sidebarClosed="sidebarStatusChanged"></toolbar>
      <sidebar :show="sidebarShow" v-on:sidebarClosed="sidebarClosed"></sidebar>
      <v-main class="pa-0">
        <router-view></router-view>
      </v-main>
    </v-main>
  </v-app>
</template>

<script>
import sidebar from "../components/Sidebar";
import toolbar from "../components/Toolbar";
export default {
  components: {
    sidebar,
    toolbar,
  },
  data() {
    return {
      sidebarShow: true,
    };
  },
  methods: {
    sidebarClosed(value) {
      this.sidebarShow = value;
    },
    sidebarStatusChanged(){
      this.sidebarShow = !this.sidebarShow;
    }
  },
};
</script>
