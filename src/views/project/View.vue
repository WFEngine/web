<template>
  <v-row class="ma-2">
    <v-col cols="12">
      <v-card>
        <v-tabs
          v-model="currentTab"
          background-color="#34344C"
          centered
          dark
          icons-and-text
        >
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#projectInfo">
           {{$t('project.view.title')}}
            <v-icon>fa fa-code</v-icon>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-if="isShow" v-model="currentTab">
          <v-tab-item :value="'projectInfo'"> 
              <project-info :project="project" :wfObjects="wfObjects"></project-info>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { ShowErrorMessage } from "../../common/alerts";
import { GET_PROJECT } from "../../store/modules/project/actions.type";
import projectInfo from "../../components/Tabs/Project/ProjectInfo";
export default {
  components:{
      "project-info": projectInfo
  },
  data() {
    return {
      isShow: false,
      currentTab: "projectInfo",
      project: {},
      wfObjects:[]
    };
  },
  created() {
    var requestObject = {
      id: this.$route.params.id,
    };
    this.$store
      .dispatch(GET_PROJECT, requestObject)
      .then(() => {
        this.project = this.$store.getters.getProject;
        this.wfObjects = this.$store.getters.getProjectWFObjects;
      })
      .catch((err) => {
        ShowErrorMessage(err.message);
      })
      .finally(() => {
        this.isShow = true;
      });
  },
};
</script>