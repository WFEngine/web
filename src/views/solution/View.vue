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

          <v-tab href="#solutionInfo">
            {{ $t("solution.view.solutionInfo") }}
            <v-icon>fa fa-project-diagram</v-icon>
          </v-tab>

          <v-tab href="#projects">
            {{ $t("solution.view.projects") }}
            <v-icon>fa fa-code-branch</v-icon>
          </v-tab>

          <v-tab href="#collaborators">
            {{ $t("solution.view.collaborator") }}
            <v-icon>fa fa-users</v-icon>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-if="isShow" v-model="currentTab">
          <v-tab-item :value="'solutionInfo'">
            <solution-info :solution="solution"></solution-info>
          </v-tab-item>
          <v-tab-item :value="'projects'">
            <projects :solution="solution"></projects>
          </v-tab-item>
          <v-tab-item :value="'collaborators'">
            <collaborator :collaborators="solution.collaborators"></collaborator>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { ShowErrorMessage } from "../../common/alerts";
import { GET_SOLUTION } from "../../store/modules/solution/actions.type";
import solutionInfoTab from "../../components/Tabs/Solution/View/SolutionInfo";
import projectsTab from "../../components/Tabs/Solution/View/Projects";
import collaboratorType from "../../components/Tabs/Solution/View/Collaborator";
export default {
  components: {
    "solution-info": solutionInfoTab,
    projects: projectsTab,
    collaborator: collaboratorType,
  },
  data() {
    return {
      isShow: false,
      currentTab: 0,
      solution: {},
    };
  },
  created() {
    var requestObject = {
      id: this.$route.params.id,
    };
    this.$store
      .dispatch(GET_SOLUTION, requestObject)
      .then(() => {
        this.solution = this.$store.getters.getSolution;
      })
      .catch((err) => {
        ShowErrorMessage(err.message);
        this.$router.push({ path: "/solution" });
      })
      .finally(() => {
        this.isShow = true;
      });
  },
};
</script>
