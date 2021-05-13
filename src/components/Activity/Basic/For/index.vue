<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    v-if="dialog"
  >
    <wf-designer-toolbar
      :activities="activities"
      :show="toolbarDialog"
      :selectedActivity="selectedActivity"
      v-on:dialogClosed="toolbarClosed"
      v-on:activityDbClick="activityAdded"
      v-on:selectedActivityRemove="selectedActivityRemoved"
      ref="toolbar"
    ></wf-designer-toolbar>
    <v-card>
      <v-toolbar dark class="gradient" tile>
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ activity.ActivityName }}</v-toolbar-title>
      </v-toolbar>
      <v-card-actions>
        <v-row class="ma-0">
          <v-col
            cols="12"
            offset-md="1"
            offset-lg="1"
            offset-xl="1"
            md="10"
            lg="10"
            xl="10"
            class="pa-0"
          >
            <v-card>
              <v-toolbar class="gradient" dark>
                <h1 class="title">For</h1>
                <v-spacer></v-spacer>
                <v-btn icon @click="toolbarDialog = true">
                  <v-icon>fa fa-plus</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-actions>
                <v-row class="ma-0">
                  <v-col
                    cols="12"
                    md="4"
                    lg="4"
                    xl="4"
                    offset-md="1"
                    offset-lg="1"
                    offset-xl="1"
                  >
                    <v-text-field
                      v-model="activity.Arguments[0].Value[0]"
                      :label="$t('activity.basic.for.startValue')"
                      outlined
                      @change="startValueChanged"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" lg="6" xl="6">
                    <v-autocomplete
                      v-model="activity.Arguments[0].ArgumentType"
                      :label="$t('activity.basic.for.startValueType')"
                      :items="variableTypes"
                      item-text="type"
                      item-value="type"
                      outlined
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="4" lg="4" xl="4">
                    <v-text-field
                      v-model="activity.Arguments[1].Value[0].LeftItem.Value[0]"
                      :label="$t('activity.basic.for.leftItem')"
                      @change="leftItemChanged"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4" xl="4">
                    <v-autocomplete
                      v-model="activity.Arguments[1].Value[0].Operator"
                      :items="conditionTypes"
                      item-text="Label"
                      item-value="Label"
                      outlined
                      :label="$t('activity.basic.for.operator')"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="4" lg="4" xl="4">
                    <v-text-field
                      v-model="
                        activity.Arguments[1].Value[0].RightItem.Value[0]
                      "
                      :label="$t('activity.basic.for.rightItem')"
                      @change="rightItemChanged"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4" xl="4">
                    <v-autocomplete
                      v-model="
                        activity.Arguments[1].Value[0].LeftItem.ArgumentType
                      "
                      :label="$t('activity.basic.for.leftItemType')"
                      @change="rightItemChanged"
                      outlined
                      :items="variableTypes"
                      item-text="type"
                      item-value="type"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="4" lg="4" xl="4" offset="4">
                    <v-autocomplete
                      v-model="
                        activity.Arguments[1].Value[0].RightItem.ArgumentType
                      "
                      :label="$t('activity.basic.for.rightItemType')"
                      @change="rightItemChanged"
                      outlined
                      :items="variableTypes"
                      item-text="type"
                      item-value="type"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" class="pa-0">
                    <v-card>
                      <v-expansion-panels multiple>
                        <activity-item
                          v-if="activity.Blocks != undefined && dialog"
                          :activity="activity"
                          :variables="variables"
                          v-on:variableButtonClick="variableButtonClicked"
                        ></activity-item>
                      </v-expansion-panels>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import getVariableType from "../../../../entities/variabletype/get";
import { GET_VARIABLE_TYPES } from "../../../../store/modules/variabletype/actions.type";
import { ShowErrorMessage } from "../../../../common/alerts";
import conditionTypes from "../Condition/ConditionType";
import generateGuid from "../../../../common/guid";
export default {
  props: {
    activity: {
      required: true,
    },
    variables: {
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      toolbarDialog: false,
      variableTypes: [],
      conditionTypes: conditionTypes,
      selectedActivity: {},
      activities: [],
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    startValueChanged() {
      var variableName = this.activity.Arguments[0].Value[0];
      if (variableName.startsWith("$"))
        variableName = variableName.substring(1);
      this.variables
        .filter((x) => x.Name == variableName)
        .map((m) => {
          this.activity.Arguments[0].IsVariable = true;
          this.activity.Arguments[0].ArgumentType = m.Type;
          this.activity.Arguments[2].ArgumentType = m.Type;
          return;
        });
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
    leftItemChanged() {
      var variableName = this.activity.Arguments[1].Value[0].LeftItem.Value[0];
      if (variableName.startsWith("$"))
        variableName = variableName.substring(1);
      this.variables
        .filter((x) => x.Name == variableName)
        .map((m) => {
          this.activity.Arguments[1].Value[0].LeftItem.IsVariable = true;
          this.activity.Arguments[1].Value[0].LeftItem.ArgumentType = m.Type;
          return;
        });
    },
    rightItemChanged() {
      var variableName = this.activity.Arguments[1].Value[0].RightItem.Value[0];
      if (variableName.startsWith("$"))
        variableName = variableName.substring(1);
      this.variables
        .filter((x) => x.Name == variableName)
        .map((m) => {
          this.activity.Arguments[1].Value[0].RightItem.IsVariable = true;
          this.activity.Arguments[1].Value[0].RightItem.ArgumentType = m.Type;
          return;
        });
    },
    activityAdded(activity) {
      this.activity.Blocks.push({
        UniqueKey: generateGuid(),
        Name: activity.activityName,
        IsContainer: this.activityIsContainer(activity),
        AssemblyName: activity.assemblyName,
        ActivityName: activity.activityName,
        Variables: [],
        Arguments: [],
        Blocks: [],
      });
    },
    activityIsContainer(activity) {
      switch (activity.activityName) {
        case "WFEngine.Activities.Basic.Container":
          return true;
        default:
          return false;
      }
    },
    selectedActivityRemoved() {
      this.selectedActivity = {};
    },
    variableButtonClicked(activity) {
      this.selectedActivity = activity;
      this.toolbarDialog = true;
      this.$refs.toolbar.setActiveTab("variable-tab");
    },
    toolbarClosed() {
      this.toolbarDialog = false;
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
      handler() {
        if (this.dialog) {
          if (this.activity.Arguments.length < 1) {
            this.activity.Arguments.push({
              Name: "StartValue",
              ArgumentType: "",
              IsVariable: false,
              IsConstant: false,
              Value: [""],
            });

            this.activity.Arguments.push({
              Name: "ConditionItem",
              ArgumentType: "WFEngine.Activities.Basic.Condition.ConditionItem",
              IsVariable: false,
              IsConstant: false,
              Value: [
                {
                  LeftItem: {
                    Name: "",
                    ArgumentType: "",
                    IsVariable: false,
                    IsConstant: false,
                    IsValue: false,
                    Value: [""],
                  },
                  RightItem: {
                    Name: "",
                    ArgumentType: "",
                    IsVariable: false,
                    IsConstant: false,
                    IsValue: false,
                    Value: [""],
                  },
                  Operator: "",
                },
              ],
            });

            this.activity.Arguments.push({
              Name: "counter",
              ArgumentType: "",
              IsVariable: true,
              IsConstant: false,
              Value: [""],
            });
          }
        }
      },
    },
  },
};
</script>