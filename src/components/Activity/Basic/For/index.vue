<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    v-if="dialog"
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
                <h1 class="title">For</h1>
                <v-spacer></v-spacer>
                <v-btn icon @click="toolbarDialog = true">
                  <v-icon>fa fa-plus</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-actions>
                <v-row class="ma-0">
                  <v-col
                    cols="12"
                    md="4"
                    lg="4"
                    xl="4"
                    offset-md="1"
                    offset-lg="1"
                    offset-xl="1"
                  >
                    <v-text-field
                      v-model="activity.Arguments[0].Value[0]"
                      label="Start Value"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4"
                    lg="4"
                    xl="4"
                    offset-md="1"
                    offset-lg="1"
                    offset-xl="1"
                  >
                    <v-autocomplete
                      v-model="activity.Arguments[0].ArgumentType"
                      label="Start Value Type"
                      outlined
                    ></v-autocomplete>
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
      toolbarDialog: false,
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
  },
  watch: {
    activity: {
      handler() {
        if (this.dialog) {
          if (this.activity.Arguments.length < 1) {
            this.activity.Arguments.push({
              Name: "StartValue",
              ArgumentType: "System.Int32",
              IsVariable: false,
              IsConstant: false,
              Value: [""],
            });

            this.activity.Arguments.push({
              Name: "ConditionItem",
              ArgumentType: "WFEngine.Activities.Basic.Condition.ConditionItem",
              IsVariable: false,
              IsConstant: false,
              Value: [
                {
                  LeftItem: {
                    Name: "",
                    ArgumentType: "",
                    IsVariable: false,
                    IsConstant: false,
                    IsValue: false,
                    Value: [""],
                  },
                  RightItem: {
                    Name: "",
                    ArgumentType: "",
                    IsVariable: false,
                    IsConstant: false,
                    IsValue: false,
                    Value: [""],
                  },
                  Operator: "",
                },
              ],
            });

            this.activity.Arguments.push({
              Name: "counter",
              ArgumentType: "",
              IsVariable: true,
              IsConstant: false,
              Value: [""],
            });
          }
        }
      },
    },
  },
};
</script>