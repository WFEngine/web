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
          <v-btn icon @click="downloadWorkFlow">
            <v-icon>fa fa-download</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>fa fa-save</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-actions>
          <toolbar
            :activities="activities"
            :show="toolbarDialog"
            :selectedActivity="selectedActivity"
            v-on:dialogClosed="toolbarClosed"
            v-on:activityDbClick="activityAdded"
            v-on:selectedActivityRemove="selectedActivityRemoved"
            ref="toolbar"
          ></toolbar>
          <v-row>
            <v-col cols="12">
              <v-expansion-panels multiple>
                <activity
                  :activity="wfObjectContent"
                  v-on:variableButtonClick="variableButtonClicked"
                ></activity>
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
import activity from "../../components/Tabs/Workflow/Designer/Activity";
export default {
  components: {
    toolbar,
    activity,
  },
  data() {
    return {
      solution: {},
      wfObject: {},
      wfObjectContent: {},
      activities: [],
      toolbarDialog: false,
      selectedActivity: {},
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
    downloadWorkFlow() {
      var dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(this.wfObjectContent));
      var dlAnchorElem = document.getElementById("downloadAnchorElem");
      dlAnchorElem.setAttribute("href", dataStr);
      dlAnchorElem.setAttribute("download", "scene.json");
      dlAnchorElem.click();
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