<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    v-if="Object.keys(activity).length > 0"
  >
    <v-card>
      <v-toolbar dark class="gradient" tile>
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ activity.ActivityName }}</v-toolbar-title>
      </v-toolbar>
      <v-card-actions>
        <v-row class="ma-0">
          <v-col
            cols="12"
            offset-md="1"
            offset-lg="1"
            offset-xl="1"
            md="10"
            lg="10"
            xl="10"
            class="pa-0"
          >
            <v-card>
              <v-toolbar class="gradient" dark>
                <h1 class="title">While</h1>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>fa fa-plus</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-actions>
                <v-row class="ma-0">
                  <v-col cols="12" md="4" lg="4" xl="4">
                    <v-text-field
                      v-model="activity.Arguments[0].Value[0].LeftItem.Value[0]"
                      outlined
                      label="Left Item"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="4" xl="4">
                    <v-autocomplete
                      v-model="activity.Arguments[0].Value[0].Operator"
                      :items="conditions"
                      item-text="Label"
                      item-value="Label"
                      outlined
                      label="Operator"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="4" lg="4" xl="4">
                    <v-text-field
                      v-model="
                        activity.Arguments[0].Value[0].RightItem.Value[0]
                      "
                      outlined
                      label="Right Item"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import getVariableType from "../../../../entities/variabletype/get";
import { GET_VARIABLE_TYPES } from "../../../../store/modules/variabletype/actions.type";
import { ShowErrorMessage } from "../../../../common/alerts";
import conditions from "../Condition/ConditionType";
export default {
  props: {
    activity: {
      required: true,
    },
    variables: {
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      tab: "",
      variableTypes: [],
      activities: [],
      conditions: conditions,
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    getVariableTypes() {
      var req = Object.assign({}, getVariableType);
      req.ProjectId = parseInt(this.$route.params.projectid);
      this.$store
        .dispatch(GET_VARIABLE_TYPES, req)
        .then(() => {
          this.variableTypes = this.$store.getters.getVariableTypes;
        })
        .catch((err) => {
          ShowErrorMessage(err.message);
        });
    },
  },
  created() {
    if (this.variableTypes.length == 0) {
      this.getVariableTypes();
      this.activities = this.$store.getters.getActivities;
    }
  },
  watch: {
    activity: {
      handler() {
        if (this.dialog) {
          if (this.activity.Arguments.length < 1) {
            this.activity.Arguments.push({
              Name: "Condition",
              ArgumentType: "WFEngine.Activities.Basic.Condition.ConditionItem",
              IsVariable: false,
              IsConstant: false,
              Value: [
                {
                  LeftItem: {
                    Name: "LeftItem",
                    ArgumentType: "",
                    IsVariable: false,
                    IsValue: false,
                    IsConstant: false,
                    Value: [""],
                  },
                  RightItem: {
                    Name: "RightItem",
                    ArgumentType: "System.Int32",
                    IsVariable: false,
                    IsConstant: false,
                    IsValue: false,
                    Value: [""],
                  },
                  Operator: "",
                },
              ],
            });
          }

          console.log(this.activity);
        }
      },
    },
  },
};
</script>