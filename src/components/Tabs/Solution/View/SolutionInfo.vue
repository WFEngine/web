<template>
  <v-row class="ma-0">
    <v-col cols="12" class="pa-0">
      <v-card>
        <v-card-text>
          <v-treeview
            :items="treeViewItems"
            activatable
            item-key="name"
            open-all
          >
            <template v-slot:prepend="{ item }">
              <v-icon>
                {{ item.icon }}
              </v-icon>
            </template>
          </v-treeview>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    solution: {
      required: true,
    },
  },
  data() {
    return {
      treeViewItems: [],
    };
  },
  created() {
    if (!this.solution) this.$router.push({ path: "/solution" });
    var treeViewItem = {
      name: this.solution.organizationName,
      icon: "fas fa-building",
      children: [
        {
          name: this.solution.name,
          icon: "fa fa-code",
          children: [
            {
              name: this.$t("solution.view.projects"),
              icon: "fa fa-code-branch",
              children: this.solution.projects.map((project) => {
                return { name: project.name, icon: "fa fa-code" };
              }),
            },
            {
              name: this.$t("solution.view.collaborator"),
              icon: "fa fa-users",
              children: this.solution.collaborators.map((collaborator) => {
                return { name: collaborator.userName, icon: "fa fa-user" };
              }),
            },
          ],
        },
      ],
    };
    this.treeViewItems.push(treeViewItem);
  },
};
</script>