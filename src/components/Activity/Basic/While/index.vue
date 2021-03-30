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
        <v-row class="ma-0"></v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import getVariableType from "../../../../entities/variabletype/get";
import { GET_VARIABLE_TYPES } from "../../../../store/modules/variabletype/actions.type";
import { ShowErrorMessage } from "../../../../common/alerts";

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
        }
      },
    },
  },
};
</script>