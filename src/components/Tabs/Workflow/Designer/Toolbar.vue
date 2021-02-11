<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark class="gradient" tile>
        <v-btn icon dark @click="dialogClosed">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Toolbar</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-actions>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-tabs
                v-model="tab"
                background-color="#34344C"
                centered
                dark
                icons-and-text
              >
                <v-tabs-slider></v-tabs-slider>

                <v-tab href="#activities-tab">
                  Activities
                  <v-icon>fa fa-tools</v-icon>
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item :value="'activities-tab'">
                  <activity-tab
                    :activities="activities"
                    v-on:activityAdded="activityDbClick"
                  ></activity-tab>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import activityTab from "./Activities";
export default {
  props: {
    show: {
      required: true,
      type: Boolean,
      default: false,
    },
    activities: {
      required: true,
      default: [],
    },
  },
  components: {
    "activity-tab": activityTab,
  },
  data() {
    return {
      tab: null,
    };
  },
  methods: {
    dialogClosed() {
      this.$emit("dialogClosed");
    },
    activityDbClick(activity) {
      this.$emit("activityDbClick", activity);
    },
  },
  beforeDestroy() {
    this.tab = null;
  },
};
</script>