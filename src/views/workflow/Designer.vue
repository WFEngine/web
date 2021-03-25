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
          <a id="downloadAnchorElem" style="display: none"></a>
          <v-btn icon @click="showWorkFlow">
            <v-icon>fa fa-database</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>fa fa-save</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-actions>
          <wf-designer-toolbar
            :activities="activities"
            :show="toolbarDialog"
            :selectedActivity="selectedActivity"
            v-on:dialogClosed="toolbarClosed"
            v-on:activityDbClick="activityAdded"
            v-on:selectedActivityRemove="selectedActivityRemoved"
            ref="toolbar"
          ></wf-designer-toolbar>
          <v-row>
            <v-col cols="12">
              <v-expansion-panels multiple>
                <activity-item
                  :activity="wfObjectContent"
                  v-on:variableButtonClick="variableButtonClicked"
                ></activity-item>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
      <v-row justify="center">
        <v-dialog v-model="jsonDialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">JSON</span>
            </v-card-title>
            <v-card-text>
              <json-viewer :value="wfObjectContent"></json-viewer>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="jsonDialog = false">
                {{ $t("base.close") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { GET_SOLUTION } from "../../store/modules/solution/actions.type";
import { ShowErrorMessage } from "../../common/alerts";
import { GET_ACTIVITIES } from "../../store/modules/activities/actions.type";
import getActivitiesEntity from "../../entities/activities/get";
import generateGuid from "../../common/guid";
export default {
  data() {
    return {
      solution: {},
      wfObject: {},
      wfObjectContent: {},
      activities: [],
      toolbarDialog: false,
      selectedActivity: {},
      jsonDialog: false,
      variableTypes: [],
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
          this.activities = this.$store.getters.getActivities;
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
        ActivityName: activity.activityName,
        Variables: [],
        Arguments: [],
        Blocks: [],
      });
    },
    activityIsContainer(activity) {
      switch (activity.activityName) {
        case "WFEngine.Activities.Basic.Container":
          return true;
        default:
          return false;
      }
    },
    variableButtonClicked(activity) {
      this.selectedActivity = activity;
      this.toolbarDialog = true;
      this.$refs.toolbar.setActiveTab("variable-tab");
    },
    selectedActivityRemoved() {
      this.selectedActivity = {};
    },
    showWorkFlow() {
      this.jsonDialog = true;
      console.log(JSON.stringify(this.wfObjectContent));
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