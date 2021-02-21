<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    v-if="Object.keys(activity).length > 0"
  >
    <v-card>
      <v-card-title>
        <span class="headline">
          {{ activity.Name }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form>
            <v-row>
              <v-col cols="12" md="6" xl="6" lg="6" class="pa-1">
                <v-select
                  v-model="selectedVariable"
                  :items="variables"
                  item-text="Name"
                  item-value="UniqueKey"
                  :label="$t('activity.basic.assign.variableName')"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6" xl="6" lg="6" class="pa-1">
                <v-text-field
                  v-model="variableValue"
                  :label="$t('activity.basic.assign.variableValue')"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" xl="12" lg="12" class="pa-0">
                <v-btn color="primary" class="float-right" @click="addAssign">
                  <v-icon left> fa fa-check </v-icon>
                  <span>{{ $t("base.save") }}</span>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-data-table
                  v-if="activity.Arguments"
                  :items="activity.Arguments"
                  :headers="tableHeaders"
                  class="elevation-1"
                ></v-data-table>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeDialog">
          {{ $t("base.close") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    activity: {
      required: true,
      default: {},
    },
    variables: {
      required: true,
      default: [],
    },
  },
  data() {
    return {
      dialog: false,
      formValid: false,
      selectedVariable: "",
      variableValue: "",
      tableHeaders: [
        {
          text: this.$t("activity.basic.assign.variableName"),
          align: "left",
          value: "Name",
        },
        {
          text: this.$t("activity.basic.assign.variableValue"),
          align: "left",
          value: "Value",
        },
      ],
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    addAssign() {
      if (!this.selectedVariable) return;
      var selectedVariable = this.selectedVariable;
      this.variables
        .filter((x) => x.UniqueKey == selectedVariable)
        .map((m) => {
          this.activity.Arguments.push({
            Name: m.Name,
            ArgumentType: m.Type,
            IsVariable: m.IsVariable,
            IsConstant: false,
            Value: [this.variableValue],
          });
          this.clearValue();
          return;
        });
    },
    clearValue() {
      this.selectedVariable = "";
      this.variableValue = "";
    },
  },
  watch: {
    activity: {
      deep: true,
      handler() {
      },
    },
  },
};
</script>