<template>
  <v-card>
    <v-card-actions>
      <v-row>
        <v-col cols="12" md="3" lg="3" xl="3">
          <v-text-field
            v-if="getCaseArgument().Value != undefined"
            v-model="getCaseArgument().Value[0]"
            :label="$t('activity.basic.switch.caseItem')"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
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
    getCaseArgument() {
      var argument = undefined;

      this.activity.Arguments.filter(
        (x) =>
          x.ArgumentType === "WFEngine.Activities.Basic.Switch.ConditionItem"
      ).map((m) => {
        argument = m;
        return;
      });

      return argument;
    },
  },
};
</script>
