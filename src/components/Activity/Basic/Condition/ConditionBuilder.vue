<template>
  <v-row class="ma-0">
    <toolbar
      :activities="activities"
      :show="toolbarDialog"
      :selectedActivity="selectedActivity"
      v-on:dialogClosed="closeToolbarDialog"
      v-on:activityDbClick="activityAdded"
      v-on:selectedActivityRemove="selectedActivityRemoved"
      :hideVariables="true"
      ref="ifToolbar"
    >
    </toolbar>
    <v-expansion-panels v-if="isMainCondition">
      <v-expansion-panel v-for="(item, i) in activity.Arguments" v-bind:key="i">
        <v-expansion-panel-header class="pa-2">
          <span
            v-if="
              item.ArgumentType ==
                'WFEngine.Activities.Basic.Condition.ConditionGroup' ||
              item.ArgumentType == 'WFEngine.Activities.Basic.Condition.Else'
            "
            >{{ item.Name }}</span
          >
          <span v-else>WFEngine.Activities.Basic.Condition.ConditionItem</span>
          <template
            v-slot:actions
            v-if="
              item.ArgumentType ==
              'WFEngine.Activities.Basic.Condition.ConditionGroup'
            "
          >
            <v-row class="ma-0 text-align" align="center">
              <v-btn
                icon
                v-if="
                  item.ArgumentType ==
                  'WFEngine.Activities.Basic.Condition.ConditionGroup'
                "
                @click="createCondition(item)"
              >
                <v-icon>fa fa-plus</v-icon>
              </v-btn>
              <v-btn icon @click="createConditionGroup(item)">
                <v-icon>far fa-object-group</v-icon>
              </v-btn>
              <v-btn icon @click="removeItem(item)">
                <v-icon>fa fa-trash</v-icon>
              </v-btn>
              <v-btn icon @click="openToolbar(item)">
                <v-icon>fa fa-cog</v-icon>
              </v-btn>
              <v-switch
                v-model="item.Operator"
                :label="item.Operator"
                false-value="AND"
                true-value="OR"
              ></v-switch>
            </v-row>
          </template>
          <template v-slot:actions v-else>
            <v-row class="ma-0 text-align" align="center">
              <v-btn
                icon
                v-if="
                  item.ArgumentType !=
                  'WFEngine.Activities.Basic.Condition.Else'
                "
                @click="createCondition(item)"
              >
                <v-icon>fa fa-plus</v-icon>
              </v-btn>
              <v-btn
                icon
                v-if="
                  item.ArgumentType ==
                  'WFEngine.Activities.Basic.Condition.Else'
                "
                @click="openToolbar(item)"
              >
                <v-icon>fa fa-cog</v-icon>
              </v-btn>
              <v-btn
                icon
                v-if="
                  item.ArgumentType ==
                  'WFEngine.Activities.Basic.Condition.Else'
                "
                @click="createConditionGroup(item)"
              >
                <v-icon>far fa-object-group</v-icon>
              </v-btn>
              <v-btn icon @click="removeItem(item)">
                <v-icon>fa fa-trash</v-icon>
              </v-btn>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-if="item.Value != undefined && item.Value.length > 0">
            <condition-builder
              :activity="item"
              :variables="variables"
              :isMainCondition="false"
              :isHideDesigner="true"
              :parentItem="item"
            ></condition-builder>
          </div>
          <div>
            <v-expansion-panels multiple>
              <activity-item
                :activity="item"
                v-on:variableButtonClick="variableButtonClicked"
              ></activity-item>
            </v-expansion-panels>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- Parent Conditions !-->
    <v-expansion-panels v-else>
      <v-expansion-panel v-for="(item, i) in activity.Value" v-bind:key="i">
        <v-expansion-panel-header class="pa-2">
          <span
            v-if="
              item.ArgumentType ==
              'WFEngine.Activities.Basic.Condition.ConditionGroup'
            "
            >{{ item.Name }}</span
          >
          <span v-else>WFEngine.Activities.Basic.Condition.ConditionItem</span>
          <template
            v-slot:actions
            v-if="
              item.ArgumentType ==
              'WFEngine.Activities.Basic.Condition.ConditionGroup'
            "
          >
            <v-row class="ma-0 text-align" align="center">
              <v-btn
                icon
                v-if="
                  item.ArgumentType ==
                  'WFEngine.Activities.Basic.Condition.ConditionGroup'
                "
                @click="createCondition(item)"
              >
                <v-icon>fa fa-plus</v-icon>
              </v-btn>
              <v-btn icon @click="createConditionGroup(item)">
                <v-icon>far fa-object-group</v-icon>
              </v-btn>
              <v-btn icon @click="removeItem(item)">
                <v-icon>fa fa-trash</v-icon>
              </v-btn>
              <v-switch
                v-model="item.Operator"
                :label="item.Operator"
                false-value="AND"
                true-value="OR"
              ></v-switch>
            </v-row>
          </template>
          <template v-slot:actions v-else>
            <v-row class="ma-0 text-align" align="center">
              <v-btn
                icon
                v-if="
                  item.ArgumentType !=
                    'WFEngine.Activities.Basic.Condition.Else' &&
                  item.Type !=
                    'WFEngine.Activities.Basic.Condition.ConditionItem'
                "
                @click="createCondition(parentItem)"
              >
                <v-icon>fa fa-plus</v-icon>
              </v-btn>
              <v-btn
                icon
                v-if="
                  item.ArgumentType ==
                  'WFEngine.Activities.Basic.Condition.Else'
                "
                @click="createConditionGroup(item)"
              >
                <v-icon>far fa-object-group</v-icon>
              </v-btn>
              <v-btn icon @click="removeItem(item)">
                <v-icon>fa fa-trash</v-icon>
              </v-btn>
            </v-row>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div
            v-if="
              item.ArgumentType ==
              'WFEngine.Activities.Basic.Condition.ConditionGroup'" >
            <condition-builder
              :activity="item"
              :variables="variables"
              :isMainCondition="false"
              :isHideDesigner="true"
            ></condition-builder>
          </div>
          <div v-else>
            <v-row class="ma-0">
              <v-col cols="4">
                <v-text-field></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field></v-text-field>
              </v-col>
            </v-row>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
import toolbar from "../../../Tabs/Workflow/Designer/Toolbar";
import generateGuid from "../../../../common/guid";
export default {
  name: "condition-builder",
  props: {
    activity: {
      required: true,
      default: {},
    },
    variables: {
      required: true,
      default: [],
    },
    isMainCondition: {
      required: true,
      default: false,
    },
    isHideDesigner: {
      required: true,
      default: false,
    },
    parentItem: {
      required: false,
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    toolbar: toolbar
  },
  data() {
    return {
      activities: [],
      toolbarDialog: false,
      selectedActivity: {},
    };
  },
  methods: {
    createConditionGroup(item) {
      item.Value.push({
        Name: "ConditionGroup",
        ArgumentType: "WFEngine.Activities.Basic.Condition.ConditionGroup",
        IsVariable: false,
        IsConstant: false,
        Value: [],
        Operator: "AND",
        Blocks: [],
      });
    },
    createCondition(item) {
      item.Value.push({
        Type: "WFEngine.Activities.Basic.Condition.ConditionItem",
        Conditions: [
          {
            Name: "ConditionGroup",
            ArgumentType: "WFEngine.Activities.Basic.Condition.ConditionItem",
            IsVariable: true,
            IsConstant: false,
            Value: {
              LeftItem: {
                Name: "",
                ArgumentType: "",
                IsVariable: true,
                IsConstant: false,
                Value: [],
              },
              RightItem: {
                Name: "",
                ArgumentType: "",
                IsVariable: false,
                IsConstant: false,
                IsValue: false,
                Value: [],
              },
              Operator: "",
            },
          },
        ],
      });
    },
    removeItem(item) {
      if (this.isMainCondition) {
        var mainIndexOf = this.activity.Arguments.indexOf(item);
        if (mainIndexOf == -1) return;
        this.activity.Arguments.splice(mainIndexOf, 1);
      } else if (!this.isMainCondition) {
        var parentIndexOf = this.activity.Value.indexOf(item);
        if (parentIndexOf == -1) return;
        this.activity.Value.splice(parentIndexOf, 1);
      }
    },
    openToolbar(item) {
      this.toolbarDialog = true;
      this.selectedActivity = item;
    },
    closeToolbarDialog() {
      this.toolbarDialog = false;
    },
    activityAdded(activity) {
      if (
        this.selectedActivity.Blocks.length == 0 &&
        !this.activityIsContainer(activity)
      )
        return;
      this.selectedActivity.Blocks.push({
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
    selectedActivityRemoved() {
      this.selectedActivity = {};
    },
    activityIsContainer(activity) {
      switch (activity.activityName) {
        case "WFEngine.Activities.Basic.Container":
          return true;
        default:
          return false;
      }
    },
    variableButtonClicked(activity) {
      console.log(activity);
      this.selectedActivity = activity;
      this.toolbarDialog = true;
      this.$refs.ifToolbar.setActiveTab("variable-tab");
    },
  },
  created() {
    this.activities = this.$store.getters.getActivies;
  },
};
</script>