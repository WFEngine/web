<template>
  <v-row class="ma-0">
    <v-col cols="12" class="pa-0">
      <v-data-table
        :headers="headers"
        :items="activity.Variables"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-btn
              v-if="Object.keys(activity).length > 0"
              color="primary"
              dark
              class="mb-2"
              @click="openDialog"
            >
              {{ $t("workflowdesigner.newVariable") }}
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.Actions="{ item }">
          <v-btn icon @click="deleteVariable(item)">
            <v-icon>fa fa-trash</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-col>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">
              {{ $t("workflowdesigner.newVariable") }}
            </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form v-model="formValid">
                <v-row>
                  <v-col cols="10" offset="1">
                    <v-text-field
                      v-model="variable.name"
                      :label="$t('workflowdesigner.variableName')"
                      :rules="validation.name"
                      :counter="35"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="10" offset="1">
                    <v-autocomplete
                      v-model="variable.type"
                      :items="variableTypes"
                      :rules="validation.variableType"
                      :label="$t('workflowdesigner.variableType')"
                      item-text="type"
                      item-value="id"
                    ></v-autocomplete>
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
            <v-btn
              color="primary darken-1"
              text
              :disabled="!formValid"
              @click="saveVariable"
            >
              {{ $t("base.save") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-row>
</template>

<script>
import { GET_VARIABLE_TYPES } from "../../../../store/modules/variabletype/actions.type";
import getVariableTypeEntity from "../../../../entities/variabletype/get";
import { ShowErrorMessage } from "../../../../common/alerts";
import generateGuid from "../../../../common/guid";
export default {
  props: {
    activity: {
      required: true,
      default: {},
    },
  },
  data() {
    return {
      dialog: false,
      variable: {
        name: "",
        type: -1,
      },
      validation: {
        name: [
          (v) => !!v || this.$t("base.required"),
          (v) => !v || v.length <= 35 || this.$t("base.maximum35Character"),
          (v) => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(v) || this.$t("base.required"),
        ],
        variableType: [(v) => v > 0 || this.$t("base.required")],
      },
      formValid: false,
      variableTypes: [],
      headers: [
        {
          text: this.$t("workflowdesigner.variableName"),
          align: "start",
          sortable: false,
          value: "Name",
        },
        {
          text: this.$t("workflowdesigner.variableType"),
          align: "start",
          sortable: false,
          value: "Type",
        },
        {
          text: this.$t("base.actions"),
          align: "start",
          sortable: false,
          value: "Actions",
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
      this.variable.name = "";
      this.variable.type = -1;
    },
    saveVariable() {
      if (Object.keys(this.activity).length < 1) return;
      this.activity.Variables.push({
        UniqueKey: generateGuid(),
        Name: this.variable.name,
        Type: this.variableTypes.filter((x) => x.id == this.variable.type)[0]
          .type,
        IsVariable: true,
        Value: [],
      });
      this.closeDialog();
    },
    deleteVariable(variable) {
      var indexOf = this.activity.Variables.indexOf(variable);
      if (indexOf == -1) return;
      this.activity.Variables.splice(indexOf, 1);
    },
    getVariableTypes() {
      var obj = Object.assign({}, getVariableTypeEntity);
      obj.ProjectId = parseInt(this.$route.params.projectid);
      this.$store
        .dispatch(GET_VARIABLE_TYPES, obj)
        .then(() => {
          this.variableTypes = this.$store.getters.getVariableTypes;
        })
        .catch((err) => {
          ShowErrorMessage(err.message);
        });
    },
  },
  created() {
    this.getVariableTypes();
  },
};
</script>