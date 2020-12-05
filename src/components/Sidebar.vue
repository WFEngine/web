<template>
  <div>
    <v-navigation-drawer
      app
      fixed
      inset
      v-model="show"
      color="#34344C"
      @transitionend="sidebarClosed"
    >
      <v-app-bar height="52" elevation="2" color="#34344C">
        <v-toolbar-title class="pa-0">
          <span class="white--text">WFEngine</span>
        </v-toolbar-title>
      </v-app-bar>
      <v-list v-if="solutions.length > 0">
        <v-list-item @click="$router.push({ path: '/dashboard' })">
          <v-list-item-icon>
            <v-icon color="white">fa fa-tachometer-alt</v-icon>
          </v-list-item-icon>
          <span class="white--text"> {{ $t("dashboard.title") }} </span>
        </v-list-item>
        <v-list-item @click="$router.push({ path: '/solution/list' })">
          <v-list-item-icon>
            <v-icon color="white">fa fa-code</v-icon>
          </v-list-item-icon>
          <span class="white--text">{{ $t("dashboard.solutions") }}</span>
        </v-list-item>
        <v-list-item v-for="(item, index) in solutions" v-bind:key="index">
          <v-list-item-icon>
            <v-icon color="white">fa fa-project-diagram</v-icon>
          </v-list-item-icon>
          <span class="white--text"> {{ item.name }}</span>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item>
          <v-list-item-icon>
            <v-icon color="white">fa fa-tachometer-alt</v-icon>
          </v-list-item-icon>
          <span class="white--text"> {{ $t("dashboard.title") }} </span>
        </v-list-item>
        <v-list-item @click="$router.push({ path: '/solution/new' })">
          <v-list-item-icon>
            <v-icon color="white">fa fa-plus</v-icon>
          </v-list-item-icon>
          <span class="white--text"> {{ $t("dashboard.newSolution") }} </span>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style>
.v-list-item {
  cursor: pointer;
}
</style>

<script>
import { GET_SOLUTIONS } from "../store/modules/solution/actions.type";
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
      solutions: [],
    };
  },
  methods: {
    sidebarClosed() {
      if (!this.show) {
        this.$emit("sidebarClosed", this.show);
      }
    },
  },
  created() {
    this.$store
      .dispatch(GET_SOLUTIONS)
      .then(() => {
        this.solutions = this.$store.getters.getSolutions;
      })
      .catch((err) => {
        ShowErrorMessage(err.message);
      });
  },
};
</script>
