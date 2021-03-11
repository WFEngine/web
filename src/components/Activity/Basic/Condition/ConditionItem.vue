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
                  <v-btn
                    v-if="
                      conditionItem.ArgumentType ==
                      'WFEngine.Activities.Basic.Condition.ConditionGroup'
                    "
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
                  <v-btn icon dark v-bind="attrs" v-on="on">
                    <v-icon color="primary">fa fa-plus</v-icon>
                  </v-btn>
                </template>
                <span>Add Item</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon dark v-bind="attrs" v-on="on">
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
            ></condition-item>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-else>
        <v-expansion-panels multiple>
            <v-expansion-panel>{{condition}}</v-expansion-panel>
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
    variables: {
      required: true,
    },
    isMainCondition: {
      required: true,
    },
  },
  methods: {
    createConditionGroup(item) {
      console.log(item);
    },
    createConditionItem(item) {
      console.log(item);
    },
  },
};
</script>