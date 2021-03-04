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
        <v-row>
          <v-col cols="10" offset="1" class="pa-1">
            <v-card>
              <v-toolbar color="gradient">
                <h1 class="title white--text">Condition Builder</h1>
                <v-spacer> </v-spacer>
                <v-btn icon dark @click="createConditionGroup()">
                  <v-icon>fa fa-plus</v-icon></v-btn
                >
                <v-btn icon dark @click="createElseCondition()">
                  <v-icon>fa fa-plus</v-icon></v-btn
                >
              </v-toolbar>
              <v-card-actions>
                <condition-builder
                  :activity="activity"
                  :variables="variables"
                  :isMainCondition="true"
                  :isHideDesigner="false"
                ></condition-builder>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import conditionBuilder from "./Condition/ConditionBuilder";
export default {
  name:'if',
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
  components: {
    "condition-builder": conditionBuilder,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    createConditionGroup() {
      this.activity.Arguments.push({
        Name: "ConditionGroup",
        ArgumentType: "WFEngine.Activities.Basic.Condition.ConditionGroup",
        IsVariable: false,
        IsConstant: false,
        Value: [],
        Operator: "AND",
      });
    },
    createElseCondition() {
      if(this.activity.Arguments.filter(x=>x.ArgumentType == 'WFEngine.Activities.Basic.Condition.Else').length>0)
      return;
      if(this.activity.Arguments.filter(x=>x.ArgumentType== 'WFEngine.Activities.Basic.Condition.ConditionGroup').length<1)
      return;
      this.activity.Arguments.push({
        Name: "Else",
        ArgumentType: "WFEngine.Activities.Basic.Condition.Else",
        IsVariable: false,
        IsConstant: false,
        Value: [
          {
            Name: "ConditionGroup",
            ArgumentType: "WFEngine.Activities.Basic.Condition.ConditionGroup",
            IsVariable: false,
            IsConstant: false,
            Value: [],
            Operator: "AND",
          },
        ],
      });
    },
  },
};
</script>