<template>
  <v-row class="ma-0">
    <v-col class="pa-0">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>
            <h1 class="title">{{ wfObjectContent.Name }}</h1>
            <h1 class="caption">{{ wfObjectContent.Description }}</h1>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="toolbarDialog = true">
            <v-icon>fa fa-plus</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>fa fa-save</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-actions>
          <toolbar
            :activities="activities"
            :show="toolbarDialog"
            v-on:dialogClosed="toolbarClosed"
            v-on:activityDbClick="activityAdded"
          ></toolbar>
          <v-row>
            <v-col cols="12">
              <v-expansion-panels>
                <draggable class="item-container" style="width: 100%">
                  <v-expansion-panel
                    v-for="item in wfObjectContent.Blocks"
                    :key="item.UniqueKey"
                  >
                    <v-expansion-panel-header>
                      {{ item.Name }}

                      <template v-slot:actions>
                        <v-icon color="error"> fa fa-cog </v-icon>
                      </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-expansion-panels>
                        <v-expansion-panel
                          v-for="q in wfObjectContent.Blocks"
                          :key="q.UniqueKey"
                        >
                          <v-expansion-panel-header>
                            {{ q.Name }}</v-expansion-panel-header
                          >
                          <v-expansion-panel-content>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </draggable>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import toolbar from "../../components/Tabs/Workflow/Designer/Toolbar";
import { GET_SOLUTION } from "../../store/modules/solution/actions.type";
import { ShowErrorMessage } from "../../common/alerts";
import { GET_ACTIVITIES } from "../../store/modules/activities/actions.type";
import getActivitiesEntity from "../../entities/activities/get";
import generateGuid from "../../common/guid";

import draggable from "vuedraggable";
export default {
  components: {
    toolbar,
    draggable,
  },
  data() {
    return {
      toolbarShow: true,
      solution: {},
      wfObject: {},
      wfObjectContent: {},
      activities: [],
      toolbarDialog: false,
    };
  },
  methods: {
    getSolution() {
      var req = {
        id: this.$route.params.solutionid,
      };
      this.$store
        .dispatch(GET_SOLUTION, req)
        .then(() => {
          this.solution = this.$store.getters.getSolution;

          this.solution.projects
            .filter((x) => x.id == parseInt(this.$route.params.projectid))
            .map((project) => {
              project.wfObjects
                .filter((x) => x.id == parseInt(this.$route.params.wfobjectid))
                .map((wfObject) => {
                  this.wfObject = wfObject;
                });
            });
        })
        .catch((err) => {
          ShowErrorMessage(err.message);
        });
    },
    getActivities() {
      var req = Object.assign({}, getActivitiesEntity);
      req.projectId = this.$route.params.projectid;
      this.$store
        .dispatch(GET_ACTIVITIES, req)
        .then(() => {
          this.activities = this.$store.getters.getActivies;
        })
        .catch((err) => {
          ShowErrorMessage(err.message);
        });
    },
    toolbarClosed() {
      this.toolbarDialog = false;
    },
    activityAdded(activity) {
      this.wfObjectContent.Blocks.push({
        UniqueKey: generateGuid(),
        Name: activity.activityName,
        IsContainer: this.activityIsContainer(activity),
        AssemblyName: activity.assemblyName,
        Variables: [],
        Arguments: [],
        Blocks: [],
      });
    },
    activityIsContainer(activity) {
      console.log(activity);
      return false;
    },
  },
  watch: {
    wfObject: {
      handler: function (val) {
        this.wfObjectContent = JSON.parse(val.value);
      },
    },
  },
  created() {
    this.getSolution();
    this.getActivities();
  },
};
</script>