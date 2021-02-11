<template>
  <v-list>
    <v-list-group
      v-for="item in activities"
      v-bind:key="'activitytype' + item.id"
      :value="false"
      no-action
      sub-group
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item
        v-for="activity in item.activities"
        v-bind:key="'actitiy' + activity.id"
        @dblclick="activityDdClick(activity)"
        href="#"
      >
        <v-list-item-title>{{ activity.name }}</v-list-item-title>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
export default {
  props: {
    activities: {
      required: true,
      default: [],
    },
  },
  methods: {
    activityDdClick(activity) {
      this.$emit("activityAdded", activity);
    },
  },
};
</script>