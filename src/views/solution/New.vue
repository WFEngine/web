<template>
  <v-row class="ma-2">
    <v-col cols="12" md="4" lg="4" xl="4">
      <v-card elevation="12">
        <v-toolbar class="gradient">
          <v-btn icon @click="$router.go(-1)">
            <v-icon color="white">fa fa-arrow-left</v-icon>
          </v-btn>
          <h1 class="title white--text">{{ $t("solution.new.title") }}</h1>
        </v-toolbar>
        <v-card-actions>
          <v-col cols="12">
            <v-form v-model="formValid">
              <!-- Solution Name !-->
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="solution.Name"
                    :rules="validations.Name"
                    :label="$t('solution.new.name')"
                    :counter="50"
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- Package Version !-->
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="solution.PackageVersionId"
                    :items="packageVersions"
                    :rules="validations.PackageVersion"
                    :label="$t('solution.new.packageVersion')"
                    item-text="version"
                    item-value="id"
                  ></v-select>
                </v-col>
              </v-row>
              <!-- Package Version !-->
              <!-- Solution Name !-->
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="solution.Description"
                    :rules="validations.Description"
                    :label="$t('solution.new.description')"
                    :counter="255"
                    rows="1"
                    auto-grow
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!formValid"
                  class="mr-2"
                  color="primary"
                  @click="saveSolution()"
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
import Solution from "../../entities/solution/new";
import { INSERT_SOLUTION } from "../../store/modules/solution/actions.type";
import { GET_PACKAGE_VERSIONS } from "../../store/modules/packageversion/actions.type";
import { ShowErrorMessage, ShowSuccessMessage } from "../../common/alerts";
export default {
  name: "NewSolution",
  data() {
    return {
      formValid: false,
      solution: new Solution(),
      packageVersions: [],
      validations: {
        Name: [
          (v) => !!v || this.$t("base.required"),
          (v) => !v || v.length <= 50 || this.$t("base.maximum50Character"),
        ],
        Description: [
          (v) => !v || v.length <= 255 || this.$t("base.maximum255Character"),
        ],
        PackageVersion:[
          (v) => v > 0 ||this.$t('base.required')
        ]
      },
    };
  },
  methods: {
    saveSolution() {
      this.$store
        .dispatch(INSERT_SOLUTION, this.solution)
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
      .dispatch(GET_PACKAGE_VERSIONS)
      .then(() => {
        this.packageVersions = this.$store.getters.getPackageVersions;
      })
      .catch((err) => {
        ShowErrorMessage(err.message);
      });
  },
};
</script>
