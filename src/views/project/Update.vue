<template>
  <v-row class="ma-0">
    <v-col cols="12" md="4" lg="4" xl="4">
      <v-card elevation="12">
        <v-toolbar class="gradient">
          <v-btn icon @click="$router.go(-1)">
            <v-icon color="white">fa fa-arrow-left</v-icon>
          </v-btn>
          <h1 class="title white--text">{{ $t("project.update.title") }}</h1>
        </v-toolbar>
        <v-card-actions>
          <v-col cols="12">
            <v-form v-model="formValid">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="project.name"
                    :rules="validations.name"
                    :counter="50"
                    :label="$t('project.update.name')"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="project.description"
                    :rules="validations.description"
                    :label="$t('project.update.description')"
                    :counter="255"
                    rows="1"
                    auto-grow
                  >
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="project.projectTypeId"
                    :items="projectTypes"
                    :rules="validations.projectType"
                    item-text="name"
                    item-value="id"
                    :label="$t('project.update.projectType')"
                    :no-data-text="$t('base.noDataText')"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!formValid"
                  class="mr-2"
                  color="primary"
                  @click="updateProject()"
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
import {
  GET_PROJECT,
  GET_PROJECT_TYPES,
  UPDATE_PROJECT,
} from "../../store/modules/project/actions.type";
import updateEntity from "../../entities/project/update";
import { ShowSuccessMessage, ShowErrorMessage } from "../../common/alerts";
export default {
  data() {
    return {
      project: {},
      projectTypes: [],
      formValid: false,
      validations: {
        name: [
          (v) => !!v || this.$t("base.required"),
          (v) => !v || v.length <= 50 || this.$t("base.maximum50Character"),
        ],
        description: [
          (v) => !v || v.length <= 255 || this.$t("base.maximum255Character"),
        ],
        projectType: [(v) => v > 0 || this.$t("base.required")],
      },
    };
  },
  methods: {
    updateProject() {
      var requestObject = new updateEntity();
      requestObject.Id = this.project.id;
      requestObject.ProjectTypeId = this.project.projectTypeId;
      requestObject.Name = this.project.name;
      requestObject.Description = this.project.description;
      this.$store
        .dispatch(UPDATE_PROJECT, requestObject)
        .then(() => {
          ShowSuccessMessage();
          this.$router.go(-1);
        })
        .catch((err) => {
          ShowErrorMessage(err.message);
        });
    },
  },
  created() {
    var requestItem = {
      id: this.$route.params.id,
    };

    this.$store
      .dispatch(GET_PROJECT, requestItem)
      .then(() => {
        this.project = this.$store.getters.getProject;

        this.$store
          .dispatch(GET_PROJECT_TYPES)
          .then(() => {
            var projectTypes = this.$store.getters.getProjectTypes;
            projectTypes.map((item) => {
              this.projectTypes.push({
                id: item.id,
                name: this.$t(item.globalName),
              });
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