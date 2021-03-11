<template>
  <v-col cols="12">
    <wf-designer-toolbar
      :activities="activities"
      :show="toolbarDialog"
      :selectedActivity="selectedActivity"
      v-on:dialogClosed="toolbarClosed"
      v-on:activityDbClick="activityAdded"
      v-on:selectedActivityRemove="selectedActivityRemoved"
      ref="if-condition-toolbar"
    ></wf-designer-toolbar>

    <div v-if="isMainCondition">
      <v-expansion-panels
        multiple
        v-for="(item, index) in condition"
        v-bind:key="'expansion-panels-' + index"
        tile
      >
        <v-expansion-panel
          v-for="(conditionItem, conditionIndex) in item.Value"
          v-bind:key="'condition-item' + conditionIndex"
        >
          <v-expansion-panel-header expand-icon="mdi-menu-down">
            <span>{{ item.Name }} </span>

            <template v-slot:actions>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="addItem(conditionItem)"
                    icon
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="primary">fa fa-plus</v-icon>
                  </v-btn>
                </template>
                <span>Add Item</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="removeItem(conditionItem)"
                    icon
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="primary">fa fa-trash</v-icon>
                  </v-btn>
                </template>
                <span>Remove Condition Item</span>
              </v-tooltip>
              <v-switch
                v-if="
                  conditionItem.ArgumentType ==
                  'WFEngine.Activities.Basic.Condition.ConditionGroup'
                "
                class="ma-0"
                v-model="conditionItem.Operator"
                :label="conditionItem.Operator"
                true-value="AND"
                false-value="OR"
              ></v-switch>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <condition-item
              :condition="conditionItem"
              :variables="variables"
              :isMainCondition="false"
              :parentCondition="item"
            ></condition-item>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-else>
      <v-expansion-panels multiple>
        <v-expansion-panel
          v-if="
            condition.ArgumentType ==
            'WFEngine.Activities.Basic.Condition.ConditionGroup'
          "
        >
          <v-expansion-panel-header>
            {{ condition.ArgumentType }}

            <template v-slot:actions>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="createConditionGroup(condition)"
                    icon
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="primary">fa fa-layer-group</v-icon>
                  </v-btn>
                </template>
                <span>Create Condition Group</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="createConditionItem(condition)"
                    icon
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="primary">fa fa-plus</v-icon>
                  </v-btn>
                </template>
                <span>Add Condition Item</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="removeItem(condition)"
                    icon
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon color="primary">fa fa-trash</v-icon>
                  </v-btn>
                </template>
                <span>Remove Condition Item</span>
              </v-tooltip>
              <v-switch
                class="ma-0"
                v-model="condition.Operator"
                :label="condition.Operator"
                true-value="AND"
                false-value="OR"
              ></v-switch>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <condition-item
              v-for="(
                parentCondition, parentConditionIndex
              ) in condition.ParentConditions"
              v-bind:key="'parent-condition-' + parentConditionIndex"
              :condition="parentCondition"
              :variables="variables"
              :isMainCondition="false"
              :parentCondition="condition"
            ></condition-item>
            <condition-item
              v-if="condition.ConditionItem.LeftItem != undefined"
              :condition="condition.ConditionItem"
              :variables="variables"
              :isMainCondition="false"
              :parentCondition="condition"
            ></condition-item>
          </v-expansion-panel-content>
          <v-expansion-panels multiple>
            <activity-item
              :activity="condition"
              v-on:variableButtonClick="variableButtonClicked"
            ></activity-item>
          </v-expansion-panels>
        </v-expansion-panel>

        <v-expansion-panel v-else>
          <v-row class="ma-0">
            <v-col cols="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="condition.LeftItem.Value[0]"
                :label="'Left Item'"
                @change="leftItemChanged(condition)"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" lg="4" xl="4">
              <v-select
                v-model="condition.Operator"
                :label="'Operator'"
                :items="conditions"
                item-text="Label"
                item-value="Label"
              ></v-select>
            </v-col>
            <v-col cols="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="condition.RightItem.Value[0]"
                :label="'Right Item'"
                @change="rightItemChanged(condition)"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="condition.LeftItem.ArgumentType"
                :label="'Left Item Type'"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" lg="4" xl="4"></v-col>
            <v-col cols="12" md="4" lg="4" xl="4">
              <v-text-field
                v-model="condition.RightItem.ArgumentType"
                :label="'Right Item Type'"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-col>
</template>

<script>
import generateGuid from "../../../../common/guid";
import conditions from "./ConditionType";
export default {
  name: "condition-item",
  props: {
    condition: {
      required: true,
    },
    parentCondition: {
      required: false,
    },
    variables: {
      required: true,
    },
    isMainCondition: {
      required: true,
    },
  },
  data() {
    return {
      toolbarDialog: false,
      activities: [],
      selectedActivity: {},
      conditions: conditions,
      variableTypes: [],
    };
  },
  methods: {
    createConditionGroup(item) {
      item.ParentConditions.push({
        ArgumentType: "WFEngine.Activities.Basic.Condition.ConditionGroup",
        ParentConditions: [],
        ConditionItem: {},
        Operator: "AND",
        Blocks: [],
      });
    },
    createConditionItem(item) {
      item.ConditionItem = {
        LeftItem: {
          Name: "LeftItem",
          ArgumentType: "",
          IsVariable: false,
          IsConstant: false,
          IsValue: false,
          Value: [""],
        },
        RightItem: {
          Name: "RightItem",
          ArgumentType: "",
          IsVariable: false,
          IsConstant: false,
          IsValue: false,
          Value: [""],
        },
        Operator: "Is Greater Than",
      };
    },
    removeItem(item) {
      if (this.isMainCondition) {
        this.condition.map((m) => {
          var indexOf = m.Value.indexOf(item);
          if (indexOf > -1) {
            m.Value.splice(indexOf, 1);
            return;
          }
        });
      } else {
        if (this.parentCondition.Value != undefined) {
          var indexOf = this.parentCondition.Value.indexOf(item);
          if (indexOf > -1) {
            this.parentCondition.Value.splice(indexOf, 1);
            return;
          }
        } else if (this.parentCondition.ParentConditions != undefined) {
          var parentIndexOf = this.parentCondition.ParentConditions.indexOf(
            item
          );
          if (parentIndexOf > -1) {
            this.parentCondition.ParentConditions.splice(parentIndexOf, 1);
            return;
          }
        }
      }
    },
    addItem(item) {
      this.toolbarDialog = true;
      this.selectedActivity = item;
      this.variableTypes = this.$store.getters.getVariableTypes;
    },
    toolbarClosed() {
      this.toolbarDialog = false;
      this.variableTypes = this.$store.getters.getVariableTypes;
    },
    activityAdded(activity) {
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
      this.selectedActivity = activity;
      this.toolbarDialog = true;
      this.$refs["if-condition-toolbar"].setActiveTab("variable-tab");
    },
    leftItemChanged(item) {
      console.log(item);
    },
    rightItemChanged(item) {
      console.log(item);
    },
  },
  created() {
    this.activities = this.$store.getters.getActivies;
  },
};
</script>