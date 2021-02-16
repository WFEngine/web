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
                  {{$t('workflowdesigner.activities')}}
                  <v-icon>fa fa-tools</v-icon>
                </v-tab>
                <v-tab href="#variable-tab">
                  {{$t('workflowdesigner.variables')}}
                  <v-icon>fa fa-meteor</v-icon>
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item :value="'activities-tab'">
                  <activity-tab
                    :activities="activities"
                    v-on:activityAdded="activityDbClick"
                  ></activity-tab>
                </v-tab-item>
                <v-tab-item :value="'variable-tab'">
                  <variable-tab :activity="selectedActivity"></variable-tab>
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
import variableTab from './Variables'
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
    selectedActivity:{
      required:true,
      default : {}
    }
  },
  components: {
    "activity-tab": activityTab,
    "variable-tab":variableTab
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
  watch:{
    show:{
      handler(val){
        if(!val)
        this.tab = null;      
      }
    }
  }
};
</script>