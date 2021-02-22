<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    v-if="Object.keys(activity).length > 0"
  >
    <v-card>
      <v-card-title>
        <span class="headline">
          {{ activity.Name }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form>
            <v-row>
              <v-col cols="10" offset="1"> </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeDialog">
          {{ $t("base.close") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    activity: {
      required: true,
      default: {},
    },
    variables: {
      required: true,
      default: [],
    },
  },
  data() {
    return {
      dialog: false,
      variableName: "",
      startValue: 0,
      endValue: 0,
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    getArgument(index) {
      if (this.activity.Arguments.length < index) return null;
      return this.activity.Arguments[index];
    },
  },
  watch: {
    activity: {
      deep: true,
      handler(val) {
          console.log(val)
      },
    },
  },
};
</script>