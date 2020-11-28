<template>
  <div>
    <v-overlay v-if="$store.getters.isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <router-view></router-view>
  </div>
</template>

<style>
.row {
  margin: 0px;
}
.col {
  padding: 0px;
}
.gradient {
  background: rgb(52, 52, 76);
  background: linear-gradient(
    90deg,
    rgba(52, 52, 76, 1) 0%,
    rgba(19, 156, 148, 1) 35%,
    rgba(32, 76, 116, 1) 100%
  );
}
</style>
