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
              <v-toolbar class="gradient" dark>
                <h1 class="title">
                  {{ $t("activity.condition.conditionDesigner") }}
                </h1>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="createConditionGroup()"
                      icon
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>fa fa-layer-group</v-icon>
                    </v-btn>
                  </template>
                  <span>{{
                    $t("activity.condition.createConditionGroup")
                  }}</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="createElseCondition()"
                      icon
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>fa fa-plus</v-icon>
                    </v-btn>
                  </template>
                  <span>{{
                    $t("activity.condition.createElseCondition")
                  }}</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-actions>
                <v-expansion-panels multiple>
                  <condition-item
                    :condition="activity.Arguments"
                    :variables="variables"
                    :isMainCondition="true"
                    :variableTypes="variableTypes"
                  ></condition-item>
                </v-expansion-panels>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ShowErrorMessage } from "../../../../common/alerts";
import { GET_VARIABLE_TYPES } from "../../../../store/modules/variabletype/actions.type";
import getVariableTypeEntity from "../../../../entities/variabletype/get";
import conditionItem from "./ConditionItem";
export default {
  name: "if",
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
    "condition-item": conditionItem,
  },
  data() {
    return {
      dialog: false,
      variableTypes: [],
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
        Name: "WFEngine.Activities.Basic.ConditionGroup",
        ArgumentType: "WFEngine.Activities.Basic.Condition.ConditionGroup",
        IsVariable: false,
        IsConstant: false,
        IsValue: false,
        Value: [
          {
            ArgumentType: "WFEngine.Activities.Basic.Condition.ConditionGroup",
            ParentConditions: [],
            ConditionItem: {},
            Operator: "AND",
            Blocks: [],
          },
        ],
      });
    },
    createElseCondition() {
      if (
        this.activity.Arguments.filter(
          (x) =>
            x.ArgumentType ==
            "WFEngine.Activities.Basic.Condition.ConditionGroup"
        ).length < 1
      )
        return;
      if (
        this.activity.Arguments.filter(
          (x) => x.ArgumentType == "WFEngine.Activities.Basic.Condition.Else"
        ).length > 0
      )
        return;

      this.activity.Arguments.push({
        Name: "WFEngine.Activities.Basic.Condition.Else",
        ArgumentType: "WFEngine.Activities.Basic.Condition.Else",
        IsVariable: false,
        IsConstant: false,
        Value: [
          {
            ArgumentType: "WFEngine.Activities.Basic.Condition.Else",
            ParentConditions: [],
            ConditionItem: {},
            Operator: "AND",
            Blocks: [],
          },
        ],
      });
    },
    getVariableTypes() {
      var obj = Object.assign({}, getVariableTypeEntity);
      obj.ProjectId = parseInt(this.$route.params.projectid);
      this.$store
        .dispatch(GET_VARIABLE_TYPES, obj)
        .then(() => {
          this.variableTypes = this.$store.getters.getVariableTypes;
        })
        .catch((err) => {
          ShowErrorMessage(err.message);
        });
    },
  },
  watch: {
    dialog: {
      handler() {
        if (this.dialog) {
          if (this.variableTypes.length == 0) {
            this.getVariableTypes();
          }
        }
      },
    },
  },
};
</script>