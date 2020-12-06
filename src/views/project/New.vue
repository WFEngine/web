<template>
  <v-row class="ma-2">
    <v-col cols="12" md="4" lg="4" xl="4">
      <v-card elevation="12">
        <v-toolbar class="gradient">
          <v-btn icon @click="$router.go(-1)">
            <v-icon color="white">fa fa-arrow-left</v-icon>
          </v-btn>
          <h1 class="title white--text">{{ $t("project.create.title") }}</h1>
        </v-toolbar>
        <v-card-actions>
          <v-col cols="12">
            <v-form v-model="formValid">
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="project.SolutionId"
                    :rules="validations.solution"
                    :items="solutions"
                    item-text="name"
                    item-value="id"
                    :label="$t('project.create.solutionPlaceholder')"
                    :no-data-text="$t('base.noDataText')"
                  >
                  </v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="project.ProjectTypeId"
                    :rules="validations.projectType"
                    :items="projectTypes"
                    item-text="name"
                    item-value="id"
                    :label="$t('project.create.projectType')"
                    :no-data-text="$t('base.noDataText')"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="project.Name"
                    :rules="validations.name"
                    :label="$t('project.create.name')"
                    :counter="50"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="project.Description"
                    :rules="validations.description"
                    :label="$t('project.create.description')"
                    :counter="255"
                    rows="1"
                    auto-grow
                  >
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!formValid"
                  class="mr-2"
                  color="primary"
                  @click="saveProjcet()"
                >
                  <v-icon left>fa fa-check</v-icon>
                  <span>{{ $t("base.save") }}</span>
                </v-btn>
              </v-row>
            </v-form>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { GET_SOLUTIONS } from "../../store/modules/solution/actions.type";
import {
  SAVE_PROJECT,
  GET_PROJECT_TYPES,
} from "../../store/modules/project/actions.type";
import { ShowSuccessMessage, ShowErrorMessage } from "../../common/alerts";
import Project from "../../entities/project/new";
export default {
  data() {
    return {
      formValid: false,
      solutions: [],
      projectTypes: [],
      project: new Project(),
      validations: {
        solution: [(v) => v > 0 || this.$t("base.required")],
        projectType: [(v) => v > 0 || this.$t("base.required")],
        name: [
          (v) => !!v || this.$t("base.required"),
          (v) => !v || v.length <= 50 || this.$t("base.maximum50Character"),
        ],
        description: [
          (v) => !v || v.length <= 255 || this.$t("base.maximum255Character"),
        ],
      },
    };
  },
  methods: {
    saveProjcet() {
      this.$store
        .dispatch(SAVE_PROJECT, this.project)
        .then((response) => {
          ShowSuccessMessage(response.message);
          this.$router.go(-1);
        })
        .catch((err) => {
          ShowErrorMessage(err.message);
        });
    },
  },
  created() {
    this.$store
      .dispatch(GET_SOLUTIONS)
      .then(() => {
        this.solutions = this.$store.getters.getSolutions;

        this.$store
          .dispatch(GET_PROJECT_TYPES)
          .then(() => {
            var _projectTypes = this.$store.getters.getProjectTypes;
            _projectTypes.map((item) => {
              var projectTypeItem = {
                id: item.id,
                name: this.$t(item.globalName),
              };
              this.projectTypes.push(projectTypeItem);
            });
          })
          .catch((err) => {
            ShowErrorMessage(err.message);
          });
      })
      .catch((err) => {
        ShowErrorMessage(err.message);
      });
  },
};
</script>
