<template>
  <v-row
    class="ma-2"
    v-if="activity.Blocks != undefined"
  >
    <draggable
      class="dragArea"
      :list="activity.Blocks"
      :group="{ name: 'g1' }"
      style="width: 100%"
    >
      <v-expansion-panel v-for="item in activity.Blocks" :key="item.UniqueKey">
        <v-expansion-panel-header>
          {{ item.Name }}
          <template v-slot:actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="item.IsContainer"
                  icon
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="variableButtonClick(item)"
                >
                  <v-icon color="primary">fa fa-meteor</v-icon>
                </v-btn>
              </template>
              <span>{{ $t("workflowdesigner.variables") }}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="configClick(item)"
                >
                  <v-icon color="primary">fa fa-cog</v-icon>
                </v-btn>
              </template>
              <span>{{ $t("workflowdesigner.configs") }}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="removeItem(item)"
                >
                  <v-icon color="primary">fa fa-trash</v-icon>
                </v-btn>
              </template>
              <span>{{ $t("base.remove") }}</span>
            </v-tooltip>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-expansion-panels multiple>
            <activity-item
              v-if="item.Blocks != undefined"
              :activity="item"
              :variables="variables"
            ></activity-item>
          </v-expansion-panels>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </draggable>
    <console-writeline
      ref="console-writeline"
      :activity="selectedActivity"
    ></console-writeline>
    <console-readline
      ref="console-readline"
      :activity="selectedActivity"
      :variables="variables"
    ></console-readline>
    <console-write
      ref="console-write"
      :activity="selectedActivity"
    ></console-write>
    <console-title
      ref="console-title"
      :activity="selectedActivity"
    ></console-title>
    <basic-assign
      ref="basic-assign"
      :activity="selectedActivity"
      :variables="variables"
    ></basic-assign>
    <basic-random
      ref="basic-random"
      :activity="selectedActivity"
      :variables="variables"
    ></basic-random>
    <basic-if
      ref="basic-condition-if"
      :activity="selectedActivity"
      :variables="variables"
      :variableTypes="variableTypes"
    ></basic-if>
    <basic-switch
      ref="basic-switch-switch"
      :activity="selectedActivity"
      :variables="variables"
    ></basic-switch>
    <basic-while
      ref="basic-while"
      :activity="selectedActivity"
      :variables="variables"
    ></basic-while>
    <basic-dowhile
      ref="basic-dowhile"
      :activity="selectedActivity"
      :variables="variables"
    ></basic-dowhile>
    <basic-for
    ref="basic-for"
    :activity="selectedActivity"
    :variables="variables"
    ></basic-for>
  </v-row>
</template>

<script>
import draggable from "vuedraggable";

//#region Console Activities
import writeline from "../../../Activity/Console/writeline";
import readline from "../../../Activity/Console/readline";
import write from "../../../Activity/Console/write";
import title from "../../../Activity/Console/title";
//#endregion

//#region  Basic Activities
import assing from "../../../Activity/Basic/Assign";
import random from "../../../Activity/Basic/Random";
import condition from "../../../Activity/Basic/Condition";
import switchActivity from "../../../Activity/Basic/Switch";
import whileActivity from "../../../Activity/Basic/While";
import doWhileActivity from '../../../Activity/Basic/DoWhile';
import forActivity from '../../../Activity/Basic/For'
//#endregion

export default {
  name: "activity-item",
  props: {
    activity: {
      required: true,
      default: [],
    },
    variables: {
      required: true,
      default: [],
    },
  },
  components: {
    draggable,
    "console-writeline": writeline,
    "console-readline": readline,
    "console-write": write,
    "console-title": title,
    "basic-assign": assing,
    "basic-random": random,
    "basic-if": condition,
    "basic-switch": switchActivity,
    "basic-while": whileActivity,
    "basic-dowhile":doWhileActivity,
    "basic-for" : forActivity
  },
  data() {
    return {
      selectedActivity: {},
      variableTypes: [],
    };
  },
  methods: {
    variableButtonClick(activity) {
      this.selectedActivity = activity;
      this.$emit("variableButtonClick", activity);
    },
    configClick(item) {
      var itemNamePieces = item.Name.split(".");
      itemNamePieces.splice(0, 2);
      var refName = itemNamePieces.join("-").toLowerCase();
      var ref = this.$refs[refName];
      if (!ref) return;
      this.selectedActivity = item;
      ref.openDialog();
    },
    removeItem(item) {
      var indexOf = this.activity.Blocks.indexOf(item);
      if (indexOf == -1) return;
      this.activity.Blocks.splice(indexOf, 1);
    },
    // initializeVariables(item) {
    //   if (Object.prototype.hasOwnProperty.call(item, "Variables")) {
    //     item.Variables.map((m) => {
    //       this.variables.push(m);
    //     });
    //   } else if (Object.prototype.hasOwnProperty.call(item, "Blocks")) {
    //     item.Blocks.map((m) => {
    //       this.initializeVariables(m);
    //     });
    //   }

    //   if (this.allVariables.length > 0) {
    //     this.allVariables.map((m) => {
    //       var variableIndex = this.variables.indexOf(m);
    //       if (variableIndex < 0) this.variables.push(m);
    //     });
    //   }
    // },
  },
  watch: {
    activity: {
      deep: true,
      handler() {
        // this.variables = [];
        // this.initializeVariables(val);
      },
    },
    selectedActivity: {
      deep: true,
      handler() {
        // this.variables = [];
        // this.initializeVariables(this.activity);
      },
    },
  },
};
</script>


