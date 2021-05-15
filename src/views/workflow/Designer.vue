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
          <v-btn icon @click="save">
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
                  :variables="variables"
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
import { ShowErrorMessage,ShowSuccessMessage } from "../../common/alerts";
import { GET_ACTIVITIES } from "../../store/modules/activities/actions.type";
import getActivitiesEntity from "../../entities/activities/get";
import generateGuid from "../../common/guid";
import saveEntity from '../../entities/wfobject/save'
import {SAVE_WF_OBJECT} from '../../store/modules/wfobject/actions.type'
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
      variables: [],
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
    setVariables(block) {
      if (block.Variables != undefined && block.Variables.length > 0) {
        block.Variables.map((m) => {
          this.variables.push(m);
        });
      }

      if (block.Blocks != undefined && block.Blocks.length > 0) {
        block.Blocks.map((m) => {
          this.setVariables(m);
        });
      }
    },
    save() {
      var projectid = parseInt(this.$route.params.projectid);
      var wfObjectid = parseInt(this.$route.params.wfobjectid);
      var req = Object.assign({},saveEntity)
      req.ProjectId = projectid;
      req.WFObjectId = wfObjectid;
      req.Content = JSON.stringify(this.wfObjectContent);
      this.$store.dispatch(SAVE_WF_OBJECT,req).then(()=>{
        ShowSuccessMessage();
      }).catch((err)=>{
        ShowErrorMessage(err.message)
      })
    },
  },
  watch: {
    wfObject: {
      deep: true,
      handler: function (val) {
        this.wfObjectContent = JSON.parse(val.value);
      },
    },
    wfObjectContent: {
      deep: true,
      handler: function () {
        this.variables = [];
        this.wfObjectContent.Blocks.map((m) => {
          this.setVariables(m);
        });
      },
    },
  },
  created() {
    this.getSolution();
    this.getActivities();
  },
};
</script>