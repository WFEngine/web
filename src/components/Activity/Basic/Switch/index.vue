<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    v-if="Object.keys(activity).length > 0"
  >
    <v-card>
      <v-toolbar dark class="gradient" tile>
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ activity.ActivityName }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-actions>
        <v-row class="ma-0">
          <v-col class="pa-0" cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
            <v-card>
              <v-tabs
                v-model="tab"
                background-color="#34344C"
                centered
                dark
                icons-and-text
              >
                <v-tabs-slider></v-tabs-slider>

                <v-tab href="#caseItem">
                  {{$t('activity.basic.switch.caseItem')}}
                  <v-icon>fa fa-spa</v-icon>
                </v-tab>

                <v-tab href="#cases">
                  {{$t('activity.basic.switch.cases')}}
                  <v-icon>fa fa-project-diagram</v-icon>
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item :value="'caseItem'">
                  <case-tab
                    :activity="activity"
                    :variables="variables"
                  ></case-tab>
                </v-tab-item>
                <v-tab-item :value="'cases'">
                  <cases-tab
                    :activity="activity"
                    :variables="variables"
                    :variableTypes="variableTypes"
                    :activities="activities"
                  ></cases-tab>
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
import caseTab from "./CaseTab";
import cases from "./Cases";
import getVariableType from "../../../../entities/variabletype/get";
import { GET_VARIABLE_TYPES } from "../../../../store/modules/variabletype/actions.type";
import { ShowErrorMessage } from "../../../../common/alerts";
export default {
  props: {
    activity: {
      required: true,
    },
    variables: {
      required: true,
    },
  },
  components: {
    "case-tab": caseTab,
    "cases-tab": cases,
  },
  data() {
    return {
      dialog: false,
      tab: "",
      variableTypes: [],
      activities : []
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    getVariableTypes() {
      var req = Object.assign({}, getVariableType);
      req.ProjectId = parseInt(this.$route.params.projectid);
      this.$store
        .dispatch(GET_VARIABLE_TYPES, req)
        .then(() => {
          this.variableTypes = this.$store.getters.getVariableTypes;
        })
        .catch((err) => {
          ShowErrorMessage(err.message);
        });
    },
  },
  created() {
    if (this.variableTypes.length == 0) {
      this.getVariableTypes();
      this.activities = this.$store.getters.getActivities;      
    }
  },
  watch: {
    activity: {
      deep: true,
      handler() {
        if (this.dialog) {
          if (this.activity.Arguments.length < 1) {
            this.activity.Arguments.push({
              Name: "ConditionItem",
              ArgumentType: "WFEngine.Activities.Basic.Switch.ConditionItem",
              IsVariable: true,
              IsConstant: false,
              IsValue: false,
              Value: [""],
            });
          }
        }
      },
    },
  },
};
</script>