<template>
  <div>
    <v-navigation-drawer
      app
      fixed
      inset
      v-model="show"
      color="#34344C"
      @transitionend="sidebarClosed"
    ></v-navigation-drawer>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      required: true,
      type: Boolean,
    },
  },
  methods: {
    sidebarClosed() {
      if (!this.show) {
        this.$emit("sidebarClosed", this.show);
      }
    },
  },
};
</script>
