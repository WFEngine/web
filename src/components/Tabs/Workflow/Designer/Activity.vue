<template>
  <v-row class="ma-2">
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
            <activity-item :activity="item"></activity-item>
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
//#endregion

export default {
  name: "activity-item",
  props: {
    activity: {
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
  },
  data() {
    return {
      selectedActivity: {},
      variables: [],
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
    initializeVariables(item) {
      if (Object.prototype.hasOwnProperty.call(item, "Variables")) {
        item.Variables.map((m) => {
          this.variables.push(m);
        });
      } else if (Object.prototype.hasOwnProperty.call(item, "Blocks")) {
        item.Blocks.map((m) => {
          this.initializeVariables(m);
        });
      }
    },
  },
  watch: {
    activity: {
      deep: true,
      handler(val) {
        this.variables = [];
        this.initializeVariables(val);
      },
    },
    selectedActivity: {
      deep: true,
      handler() {
        this.variables = [];
        this.initializeVariables(this.activity);
      },
    },
  },
};
</script>


