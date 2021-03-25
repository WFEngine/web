<template>
  <v-row>
    <wf-designer-toolbar
      :activities="activities"
      :show="toolbarShow"
      :selectedActivity="selectedActivity"
      v-on:dialogClosed="toolbarClosed"
      v-on:activityDbClick="activityAdded"
      v-on:selectedActivityRemove="selectedActivityRemoved"
      ref="toolbar"
    ></wf-designer-toolbar>
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
            <v-expansion-panel
              v-for="(item, index) in getCaseArguments()"
              v-bind:key="'code-blocks-' + index"
            >
              <v-expansion-panel-header>
                {{ item.ArgumentType }}

                <template v-slot:actions>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        @click="addItem(item)"
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
                      <v-btn icon dark v-bind="attrs" v-on="on">
                        <v-icon color="primary">fa fa-trash</v-icon>
                      </v-btn>
                    </template>
                    <span>Remove Item</span>
                  </v-tooltip>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div
                  v-if="
                    item.ArgumentType == 'WFEngine.Activities.Basic.Switch.Case'
                  "
                >
                  <v-row class="ma-0">
                    <v-col
                      cols="12"
                      md="4"
                      lg="4"
                      xl="4"
                      offset-md="2"
                      offset-lg="2"
                      offset-xl="2"
                    >
                      <v-text-field
                        v-model="item.Value[0].Value.Value[0]"
                        outlined
                        label="Case Value"
                        @change="caseValueChanged(item)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" lg="4" xl="4">
                      <v-autocomplete
                        v-model="item.Value[0].Value.ArgumentType"
                        outlined
                        label="Case Value Type"
                        :items="variableTypes"
                        item-text="type"
                        item-value="type"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </div>                
                <v-expansion-panels multiple>
                  <activity-item
                    :activity="item.Value[0]"
                    v-on:variableButtonClick="variableButtonClicked"
                  ></activity-item>
                </v-expansion-panels>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import generateGuid from "../../../../common/guid";
export default {
  props: {
    activity: {
      required: true,
    },
    variables: {
      required: true,
    },
    variableTypes: {
      required: true,
    },
    activities: {
      required: true,
    },
  },
  data() {
    return {
      toolbarShow: false,
      selectedActivity: {},
    };
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
              ArgumentType: "",
              IsVariable: false,
              IsConstant: false,
              IsValue: true,
              Value: [""],
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
    getCaseArguments() {
      return this.activity.Arguments.filter(
        (x) =>
          x.ArgumentType == "WFEngine.Activities.Basic.Switch.Case" ||
          x.ArgumentType == "WFEngine.Activities.Basic.Switch.Default"
      );
    },
    caseValueChanged(item) {
      var value = item.Value[0].Value.Value[0];

      if (value.toString().startsWith("$")) {
        value = value.substring(1);
      }

      var isFounded = false;
      this.variables
        .filter((x) => x.Name == value)
        .map((m) => {
          isFounded = true;
          item.Value[0].Value.ArgumentType = m.Type;
          item.Value[0].Value.IsVariable = true;
          item.Value[0].Value.IsConstant = false;
        });

      if (isFounded) return;
      item.Value[0].Value.IsVariable = false;
    },
    addItem(item) {
      this.selectedActivity = item;
      this.toolbarShow = true;
    },
    toolbarClosed() {
      this.toolbarShow = false;
    },
    activityAdded(activity) {
      this.selectedActivity.Value[0].Blocks.push({
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
      this.$refs.toolbar.setActiveTab("variable-tab");
    },
  },
};
</script>