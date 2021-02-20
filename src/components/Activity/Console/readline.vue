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
              <v-col cols="10" offset="1">
                <v-text-field
                  v-model="variableName"
                  :label="$t('activity.console.readline.variableName')"
                ></v-text-field>
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
import { ShowErrorMessage } from "../../../common/alerts";
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
      variableName: "",
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;

      if (!this.variableName) return;

      var variableName = this.variableName;
      if (variableName.startsWith("$"))
        variableName = variableName.substring(1);
      this.variables
        .filter((x) => x.Name == variableName)
        .map((m) => {
          if (this.activity.Arguments.length > 0) {
            this.activity.Arguments[0].Value = ["$" + m.Name];
          } else {
            this.activity.Arguments.push({
              Name: "ReturnValue",
              ArgumentType: m.Type,
              IsVariable: true,
              IsConstant: false,
              Value: ["$" + m.Name],
            });
          }
          return;
        });

      if (this.activity.Arguments.length == 0) {
        ShowErrorMessage();
      }

      return;
    },
  },
  watch:{
    activity:{
      deep:true,
      handler(val){
        if(val.Arguments.length >0){
          this.variableName = val.Arguments[0].Value;
        }else{
          this.variableName = "";
        }
      }
    }
  }
};
</script>