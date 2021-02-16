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
              <v-btn v-if="item.IsContainer" icon dark v-bind="attrs" v-on="on" @click="variableButtonClick(item)">
                <v-icon color="primary">fa fa-meteor</v-icon>
              </v-btn>
            </template>
            <span>{{$t('workflowdesigner.variables')}}</span>
          </v-tooltip>   
           <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon dark v-bind="attrs" v-on="on" @click="configClick(item)">
                <v-icon color="primary">fa fa-cog</v-icon>
              </v-btn>
            </template>
            <span>{{$t('workflowdesigner.configs')}}</span>
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
  <console-writeline ref="console-writeline" :activity="selectedActivity"></console-writeline>
  </v-row>
</template>

<script>
import draggable from "vuedraggable";

//#region Console Activities
import writeline from '../../../../activities/console/writeline'
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
    "console-writeline":writeline
  },
  data(){
    return{
      selectedActivity : {}
    }
  },
  methods: {
    variableButtonClick(activity){
      this.selectedActivity = activity;      
      this.$emit('variableButtonClick',activity)
    },
    configClick(item){
      var itemNamePieces = item.Name.split('.');
      itemNamePieces.splice(0,2)
      var refName = itemNamePieces.join('-').toLowerCase();
      var ref = this.$refs[refName]
      if(!ref)
      return;
      this.selectedActivity = item;
      ref.openDialog();
    }
  },
};
</script>


