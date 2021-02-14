<template>
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
              <v-btn v-if="item.IsContainer" icon dark v-bind="attrs" v-on="on">
                <v-icon color="primary">fa fa-meteor</v-icon>
              </v-btn>
            </template>
            <span>Variables</span>
          </v-tooltip>   
           <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon dark v-bind="attrs" v-on="on">
                <v-icon color="primary">fa fa-cog</v-icon>
              </v-btn>
            </template>
            <span>Configs</span>
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
</template>

<script>
import draggable from "vuedraggable";
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
  },
  methods: {},
};
</script>


