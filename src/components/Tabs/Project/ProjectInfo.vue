<template>
  <v-row class="ma-0">
    <v-col cols="12" class="pa-0">
      <v-card>
        <v-card-text>
          <v-row class="ma-0">
            <v-col cols="12" class="pa-0">
              <v-treeview :items="treeViewItems" activatable item-key="name">
                <template v-slot:prepend="{ item }">
                  <v-icon>
                    {{ item.icon }}
                  </v-icon>
                </template>

                <template v-slot:item="{ item }">
                  {{ item }}
                </template>
              </v-treeview>
            </v-col>
            <v-col cols="6">
              <v-card>
                <v-toolbar>
                  <h1 class="title">
                    {{ $t("wfObjectType.workflow") }}
                  </h1>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>fa fa-plus</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-data-table
                  :headers="workflowTableHeaders"
                  :items="workflowItems"
                  :no-data-text="$t('base.noDataText')"
                >
                  <template v-slot:item.actions="{ item }">
                    <v-btn icon @click="openDesigner(item)">
                      <v-icon>fas fa-drafting-compass</v-icon>
                    </v-btn>
                    <v-btn icon @click="updateWFObject(item)">
                      <v-icon>fa fa-edit</v-icon>
                    </v-btn>
                    <v-btn icon @click="deleteWFObject(item)">
                      <v-icon>fa fa-trash</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    project: {
      required: true,
    },
    wfObjects: {
      required: true,
    },
  },
  data() {
    return {
      treeViewItems: [],
      workflowTableHeaders: [
        {
          text: this.$t("project.view.projectInfo.workflowTableHeader.name"),
          align: "left",
          value: "name",
        },
        {
          text: this.$t("base.actions"),
          align: "left",
          sortable: false,
          value: "actions",
        },
      ],
      workflowItems: [],
    };
  },
  methods: {
    initializeTreeView() {
      this.treeViewItems = [];
      var treeViewItem = {
        name: this.project.organizationName,
        icon: "fas fa-building",
        children: [],
      };
      var treeViewSolutionItem = {
        name: this.project.solutionName,
        icon: "fa fa-project-diagram",
        children: [],
      };
      var treeViewProjectItem = {
        name: this.project.name,
        icon: "fa fa-project-diagram",
        children: [],
      };
      treeViewSolutionItem.children.push(treeViewProjectItem);
      var groupBy = this.lodash.groupBy(this.wfObjects, "wfObjectTypeId");
      Object.keys(groupBy).map((key) => {
        var wfObjectItem = {};
        groupBy[key].map((item, index) => {
          if (index == 0) {
            wfObjectItem.name = this.$t(item.wfObjectTypeName);
            switch (item.wfObjectTypeId) {
              case 1:
                wfObjectItem.icon = "fa fa-network-wired";
                break;
            }
            wfObjectItem.children = [];
          }
          wfObjectItem.children.push({
            name: item.name,
            icon: "fa fa-circle",
            children: [],
          });
        });
        treeViewProjectItem.children.push(wfObjectItem);
      });
      treeViewItem.children.push(treeViewSolutionItem);
      this.treeViewItems.push(treeViewItem);
    },
    initailizeWorkflowTable() {
      this.workflowItems = [];
      this.wfObjects
        .filter((x) => x.wfObjectTypeId === 1)
        .map((item) => {
          this.workflowItems.push(item);
        });
    },
    openDesigner(item) {
      console.log(item);
    },
    updateWFObject(item) {
      console.log(item);
    },
    deleteWFObject(item){
        console.log(item)
    }
  },
  created() {
    this.initializeTreeView();
    this.initailizeWorkflowTable();
  },
};
</script>