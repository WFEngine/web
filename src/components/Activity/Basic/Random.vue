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
                  :label="$t('activity.basic.random.variableName')"
                ></v-text-field>
              </v-col>
              <v-col cols="10" offset="1">
                <v-text-field
                  v-model="startValue"
                  :label="$t('activity.basic.random.startValue')"
                ></v-text-field>
              </v-col>
              <v-col cols="10" offset="1">
                <v-text-field
                  v-model="endValue"
                  :label="$t('activity.basic.random.endValue')"
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
      startValue: 0,
      endValue: 0,
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
          var startValue = this.startValue;

          if (!/^[0-9]+$/.test(startValue)) {
            this.activity.Arguments[1].Value[0] = [startValue];
          } else {
            if (startValue.startsWith("$"))
              startValue = startValue.substring(1);
            this.variables
              .filter((y) => y.Name == startValue)
              .map((m) => {
                this.activity.Arguments[1].Value[0] = m;
              });
          }

          var endValue = this.endValue;

          if (!/^[0-9]+$/.test(endValue)) {
            this.activity.Arguments[2].Value[0] = endValue;
          } else {
            if (endValue.startsWith("$")) endValue = endValue.substring(1);
            this.variables
              .filter((y) => y.Name == endValue)
              .map((m) => {
                this.activity.Arguments[2].Value[0] = m;
              });
          }

          if (this.activity.Arguments.length > 0) {
            this.activity.Arguments[0].Value[0] = ["$" + m.Name];
            this.activity.Arguments[1].Value[0] = [startValue];
            this.activity.Arguments[2].Value[0] = [endValue];

            // this.activity.Arguments[2].Value[0] = [this.endValue];
          } else {
            this.activity.Arguments.push({
              Name: "ReturnValue",
              ArgumentType: m.Type,
              IsVariable: true,
              IsConstant: false,
              Value: ["$" + m.Name],
            });
            this.activity.Arguments.push({
              Name: "StartRange",
              ArgumentType: "System.Int32",
              IsVariable: true,
              IsConstant: false,
              Value: [startValue],
            });
            this.activity.Arguments.push({
              Name: "EndRange",
              ArgumentType: "System.Int32",
              IsVariable: true,
              IsConstant: false,
              Value: [endValue],
            });
          }
          return;
        });
    },
    getArgument(index) {
      if (this.activity.Arguments.length < index) return null;
      return this.activity.Arguments[index];
    },
  },
  watch: {
    activity: {
      deep: true,
      handler(val) {
        if (this.dialog && val.Arguments.length == 3) {
          this.variableName = this.activity.Arguments[0].Value[0];
          this.startValue = this.activity.Arguments[1].Value[0];
          this.endValue = this.activity.Arguments[2].Value[0];
        }
      },
    },
  },
};
</script>