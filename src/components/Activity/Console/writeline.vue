<template>
  <div class="text-center">
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
              <v-row v-if="getArgument() != null">
                <v-col cols="10" offset="1">
                  <v-text-field
                    v-if="getArgument() != null"
                    v-model="getArgument().Value[0]"
                    :label="$t('activity.console.writeline.message')"
                  ></v-text-field>
                </v-col>
                <v-col cols="10" offset="1">
                  <v-checkbox
                    v-if="getArgument() != null"
                    v-model="getArgument().IsVariable"
                    :label="$t('activity.console.writeline.isVariable')"
                  ></v-checkbox>
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
  </div>
</template>

<script>
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
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    getArgument() {
      if (this.activity.Arguments.length == 0) return null;
      return this.activity.Arguments[0];
    },
  },
  watch: {
    activity: {
      deep: true,
      handler(val) {
        if (this.dialog && val.Arguments.length == 0) {
          val.Arguments.push({
            Name: "Message",
            ArgumentType: "System.String",
            IsVariable: false,
            IsConstant: false,
            IsValue: false,
            Value: [],
          });
        }
      },
    },
  },
};
</script>