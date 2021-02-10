<template>
  <v-app>
    <v-navigation-drawer
      v-bind:style="{ 'max-height': innerHeight + 'px' }"
      permanent
      expand-on-hover
    >
      <v-list>
        <v-list-group :value="true" prepend-icon="fa fa-tools">
          <template v-slot:activator>
            <v-list-item-title>Toolbar</v-list-item-title>
          </template>

          <v-list-group :value="true" no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Console</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon>fa fa-terminal</v-icon>
              </v-list-item-icon>
            </template>

            <v-list-item>
              <v-list-item-title>WriteLine</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>


<script>
export default {
  data() {
    return {
      innerHeight: window.innerHeight - 50,
    };
  },
  methods: {
    onResized() {
      this.innerHeight = window.innerHeight - 50;
    },
  },
  created() {
    this.resizeEventListener = window.addEventListener(
      "resize",
      this.onResized,
      false
    );
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResized, false);
  },
};
</script>