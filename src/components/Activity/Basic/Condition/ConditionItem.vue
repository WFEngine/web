<template>
  <v-col cols="12">
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
                  <v-btn icon dark v-bind="attrs" v-on="on">
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
        </v-expansion-panel>
        <div v-else>
          {{ condition }}
        </div>
      </v-expansion-panels>
    </div>
  </v-col>
</template>

<script>
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
          Value: [],
        },
        RightItem: {
          Name: "RightItem",
          ArgumentType: "",
          IsVariable: false,
          IsConstant: false,
          IsValue: false,
          Value: [],
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
        console.log(this.parentCondition);
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
  },
};
</script>