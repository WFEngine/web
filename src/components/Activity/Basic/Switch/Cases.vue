<template>
  <v-row>
    <v-col
      cols="12"
      md="10"
      lg="10"
      xl="10"
      offset-md="1"
      offset-lg="1"
      offset-xl="1"
    >
      <v-card>
        <v-toolbar class="gradient" dark>
          <h1 class="title">Cases</h1>
          <v-spacer></v-spacer>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="createCase()" icon dark v-bind="attrs" v-on="on">
                <v-icon>fa fa-spa</v-icon>
              </v-btn>
            </template>
            <span>Create Case</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="createDefault()"
                icon
                dark
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>fa fa-spa</v-icon>
              </v-btn>
            </template>
            <span>Create Default</span>
          </v-tooltip>
        </v-toolbar>

        <v-card-actions>
          <v-expansion-panels multiple>
          <v-expansion-panel v-for="(item,index) in getCaseArguments()" v-bind:key="'code-blocks-'+index">
            <v-expansion-panel-header>
              {{item.ArgumentType}}
            </v-expansion-panel-header>
            </v-expansion-panel>    
          </v-expansion-panels>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    activity: {
      required: true,
    },
    variables: {
      required: true,
    },
  },
  methods: {
    createCase() {
      this.activity.Arguments.push({
        Name: "Case",
        ArgumentType: "WFEngine.Activities.Basic.Switch.Case",
        IsVariable: false,
        IsConstant: false,
        Value: [
          {
            Value: {
              Name: "Item",
              ArgumentType: "System.Int32",
              IsVariable: false,
              IsConstant: false,
              IsValue: true,
              Value: [1],
            },
            Blocks: [],
          },
        ],
      });
    },
    createDefault() {
      if (
        this.activity.Arguments.filter(
          (x) => x.ArgumentType == "WFEngine.Activities.Basic.Switch.Case"
        ).length < 1
      )
        return;

      if (
        this.activity.Arguments.filter(
          (x) => x.ArgumentType == "WFEngine.Activities.Basic.Switch.Default"
        ).length > 0
      )
        return;
      this.activity.Arguments.push({
        Name: "Case",
        ArgumentType: "WFEngine.Activities.Basic.Switch.Default",
        IsVariable: false,
        IsConstant: false,
        Value: [
          {
            Blocks: [],
          },
        ],
      });
    },
    getCaseArguments(){
      return this.activity.Arguments.filter(
        x=>x.ArgumentType == 'WFEngine.Activities.Basic.Switch.Case'
        || 
        x.ArgumentType == 'WFEngine.Activities.Basic.Switch.Default'
        )
    }
  },
};
</script>