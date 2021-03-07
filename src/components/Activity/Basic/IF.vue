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
          <v-col
            class="pa-0"
            cols="12"
            xs="12"
            sm="12"
            md="6"
            lg="6"
            xl="6"
            offset-md="3"
            offset-lg="3"
            offset-xl="3"
          >
            <v-card>
              <v-toolbar class="gradient" dark>
                <h1 class="title">Condition Designer</h1>
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
                  <span>Create Condition Group</span>
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
                  <span>Create Else</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-actions>
                <v-expansion-panels multiple>
                  <condition-item
                    :condition="activity"
                    :variables="variables"
                    :isMainCondition="true"
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
import conditionItem from "./Condition/ConditionItem";
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
        Blocks: [],
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
        this.activity.Arguments.push({
          Name:'Else',
          ArgumentType:'WFEngine.Activies.Basic.Condition.Else',
          IsVariable:false,
          IsConstant:false,
          Value:[],
          Blocks:[]
        })
    },
  },
};
</script>