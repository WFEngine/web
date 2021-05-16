<template>
  <v-row class="ma-0">
    <v-col cols="12" md="4" lg="4" xl="4">
      <v-hover v-slot:default="{ hover }">
        <v-card :elevation="hover ? 12 : 2">
          <v-card-text class="pa-0">
            <v-sheet height="100%" width="100%" class="pa-2 gradient">
              <v-row class="ma-0" justify="center" align="center">
                <v-col class="pa-1 text-left" cols="6">
                  <v-icon size="64" color="white">fa fa-code</v-icon>
                </v-col>
                <v-col class="pa-2 text-right" cols="6">
                  <h1 class="display-1 white--text">{{ solutionCount }}</h1>
                  <h1 class="title white--text">
                    {{ $t("dashboard.solutions") }}
                  </h1>
                </v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
          <v-card-text class="pa-0">
            <v-sheet height="100%" width="100%" class="pa-2">
              <v-row class="ma-0" justify="center" align="center">
                <v-col class="pa-1 text-left" cols="6">
                  <h1 class="caption">{{ $t("dashboard.viewDetails") }}</h1>
                </v-col>
                <v-col class="pa-1 text-right" cols="6">
                  <v-btn
                    icon
                    small
                    @click="$router.push({ path: '/solution/list' })"
                  >
                    <v-icon color="black">fa fa-arrow-right</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>
    <v-col cols="12" md="4" lg="4" xl="4">
      <v-hover v-slot:default="{ hover }">
        <v-card :elevation="hover ? 12 : 2">
          <v-card-text class="pa-0">
            <v-sheet height="100%" width="100%" class="pa-2 gradient">
              <v-row class="ma-0" justify="center" align="center">
                <v-col class="pa-1 text-left" cols="6">
                  <v-icon size="64" color="white">fa fa-project-diagram</v-icon>
                </v-col>
                <v-col class="pa-2 text-right" cols="6">
                  <h1 class="display-1 white--text">{{ projectCount }}</h1>
                  <h1 class="title white--text">
                    {{ $t("dashboard.projects") }} 
                  </h1>
                </v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
          <v-card-text class="pa-0">
            <v-sheet height="100%" width="100%" class="pa-2">
              <v-row class="ma-0" justify="center" align="center">
                <v-col class="pa-1 text-left" cols="6">
                  <h1 class="caption">{{ $t("dashboard.viewDetails") }}</h1>
                </v-col>
                <v-col class="pa-1 text-right" cols="6">
                  <v-btn
                    icon
                    small
                  >
                    <v-icon color="black">fa fa-arrow-right</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>
    <v-col cols="12" md="4" lg="4" xl="4">
      <v-hover v-slot:default="{ hover }">
        <v-card :elevation="hover ? 12 : 2">
          <v-card-text class="pa-0">
            <v-sheet height="100%" width="100%" class="pa-2 gradient">
              <v-row class="ma-0" justify="center" align="center">
                <v-col class="pa-1 text-left" cols="6">
                  <v-icon size="64" color="white">fa-snowplow</v-icon>
                </v-col>
                <v-col class="pa-2 text-right" cols="6">
                  <h1 class="display-1 white--text">{{ workflowCount }}</h1>
                  <h1 class="title white--text">
                    {{ $t("dashboard.solutions") }}
                  </h1>
                </v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
          <v-card-text class="pa-0">
            <v-sheet height="100%" width="100%" class="pa-2">
              <v-row class="ma-0" justify="center" align="center">
                <v-col class="pa-1 text-left" cols="6">
                  <h1 class="caption">{{ $t("dashboard.viewDetails") }}</h1>
                </v-col>
                <v-col class="pa-1 text-right" cols="6">
                  <v-btn
                    icon
                    small
                  >
                    <v-icon color="black">fa fa-arrow-right</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
import { ShowErrorMessage } from "../../common/alerts";
import { GET_DASHBOARD } from "../../store/modules/dashboard/actions.type";
export default {
  data() {
    return {
      solutionCount: 0,
      projectCount: 0,
      workflowCount: 0,
    };
  },
  created() {
    this.$store
      .dispatch(GET_DASHBOARD)
      .then(() => {
        this.solutionCount = this.$store.getters.getSolutionCount;
        this.projectCount = this.$store.getters.getProjectCount;
        this.workflowCount = this.$store.getters.getWorkflowCount;
      })
      .catch((err) => {
        ShowErrorMessage(err.message);
      });
  },
};
</script>
