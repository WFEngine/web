<template>
  <v-expansion-panels v-if="isMainCondition">
    <v-expansion-panel v-for="(item, i) in activity.Arguments" v-bind:key="i">
      <v-expansion-panel-header class="pa-2">
        {{ item.Name }}
        <template v-slot:actions>
          <v-row class="ma-0 text-align" align="center">
            <v-btn icon>
              <v-icon>fa fa-plus</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>far fa-object-group</v-icon>
            </v-btn>
            <v-switch v-model="item.Operator" :label="item.Operator" false-value="AND" true-value="OR"></v-switch>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
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
  },
  methods:{
      createConditionGroup(){

      },
      createCondition(){
          
      }
  }
};
</script>