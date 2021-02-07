<template>
  <v-row class="ma-2">
    <v-col cols="12" md="4" lg="4" xl="4">
      <v-card elevation="12">
        <v-toolbar class="gradient">
          <v-btn icon @click="$router.go(-1)">
            <v-icon color="white">fa fa-arrow-left</v-icon>
          </v-btn>
          <h1 class="title white--text">{{ $t("wfObject.new.title") }}</h1>
        </v-toolbar>
        <v-card-actions>
          <v-col cols="12">
            <v-form v-model="formValid">
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="wfObject.Name"
                    :rules="validations.name"
                    :label="$t('wfObject.new.name')"
                    :counter="50"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!formValid"
                  class="mr-2"
                  color="primary"
                  @click="saveWFObject()"
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
import wfObjectEntity from "../../entities/wfobject/new";
import enumWFObject from "../../enums/enumWFObjectType";
import { INSERT_WF_OBJECT } from "../../store/modules/wfobject/actions.type";
import { ShowSuccessMessage, ShowErrorMessage } from "../../common/alerts";
export default {
  data() {
    return {
      wfObject: Object.assign({}, wfObjectEntity),
      formValid: false,
      validations: {
        name: [
          (v) => !!v || this.$t("base.required"),
          (v) => !v || v.length <= 50 || this.$t("base.maximum50Character"),
        ],
      },
    };
  },
  methods: {
    saveWFObject() {
      this.wfObject.WfObjectTypeId = enumWFObject.WorkFlow;
      this.wfObject.ProjectId = this.$route.params.projectid;
      this.$store
        .dispatch(INSERT_WF_OBJECT, this.wfObject)
        .then((payload) => {
          ShowSuccessMessage(payload.message);
          this.$router.go(-1);
        })
        .catch((err) => {
          ShowErrorMessage(err.message);
        });
    },
  },
};
</script>