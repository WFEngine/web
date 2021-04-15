<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    v-if="dialog"
  >
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods:{
      openDialog(){
          this.dialog = true;
      },
      closeDialog(){
          this.dialog = false;
      }
  }
};
</script>