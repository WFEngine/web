<template>
  <v-col class="pa-0" cols="12">
    <!-- Main Condition Item !-->
    <div v-if="isMainCondition">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(item, index) in condition.Arguments"
          v-bind:key="index"
        >
          <v-expansion-panel-header>
            {{ item.Name }}

            <template v-slot:actions>
              <!-- Create Condition Group Button !-->
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon dark v-bind="attrs" v-on="on">
                    <v-icon>fa fa-layer-group</v-icon>
                  </v-btn>
                </template>
                <span>Create Condition Group</span>
              </v-tooltip>
              <!-- Create Condition Group Button !-->
              <!-- Create Condition Item Button !-->
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon dark v-bind="attrs" v-on="on">
                    <v-icon>fa fa-plus</v-icon>
                  </v-btn>
                </template>
                <span>Create Condition Item</span>
              </v-tooltip>
              <!-- Create Condition Item Button !-->
              <!-- Remove Item Button !-->
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon dark v-bind="attrs" v-on="on">
                    <v-icon>fa fa-trash</v-icon>
                  </v-btn>
                </template>
                <span>Remove Item</span>
              </v-tooltip>
              <!-- Remove Item Button !-->
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content> </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <!-- Main Condition Item !-->
    <!-- Parent Condition Item !-->
    <div v-else></div>
    <!-- Parent Condition Item !-->
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
};
</script>