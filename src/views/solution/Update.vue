<template>
  <v-row class="ma-2">
    <v-col cols="12" md="4" lg="4" xl="4">
      <v-card elevation="12">
        <v-toolbar class="gradient">
          <v-btn icon @click="$router.go(-1)">
            <v-icon color="white">fa fa-arrow-left</v-icon>
          </v-btn>
          <h1 class="title white--text">{{ $t("solution.update.title") }}</h1>
        </v-toolbar>
        <v-card-actions>
          <v-col cols="12">
            <v-form v-model="formValid">
              <!-- Solution Name !-->
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="solution.name"
                    :rules="validations.Name"
                    :label="$t('solution.update.name')"
                    :counter="50"
                  ></v-text-field>
                </v-col>
              </v-row>
              <!-- Solution Name !-->
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="solution.description"
                    :rules="validations.Description"
                    :label="$t('solution.update.description')"
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
import {
  GET_SOLUTION,
  UPDATE_SOLUTION,
} from "../../store/modules/solution/actions.type";
import { ShowErrorMessage, ShowSuccessMessage } from "../../common/alerts";
export default {
  data() {
    return {
      formValid: false,
      solution: {},
      validations: {
        Name: [
          (v) => !!v || this.$t("base.required"),
          (v) => !v || v.length <= 50 || this.$t("base.maximum50Character"),
        ],
        Description: [
          (v) => !v || v.length <= 255 || this.$t("base.maximum255Character"),
        ],
      },
    };
  },
  methods: {
    saveSolution() {
      var requestObject = {
        Id: this.solution.id,
        Name: this.solution.name,
        Description: this.solution.description,
      };
      this.$store
        .dispatch(UPDATE_SOLUTION, requestObject)
        .then(() => {
          ShowSuccessMessage();
          this.$router.push({ path: "/solution" });
        })
        .catch((err) => {
          ShowErrorMessage(err.message);
        });
    },
  },
  created() {
    var solutionId = this.$route.params.id;
    if (solutionId < 1) {
      this.$router.push({ path: "/solution" });
    } else {
      var payload = {
        id: solutionId,
      };
      this.$store
        .dispatch(GET_SOLUTION, payload)
        .then(() => {
          this.solution = this.$store.getters.getSolution;
        })
        .catch((err) => {
          ShowErrorMessage(err.message);
        });
    }
  },
};
</script>
