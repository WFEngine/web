<template>
  <v-row class="ma-2">
    <v-col cols="12" md="4" lg="4" xl="4">
      <v-card elevation="12">
        <v-toolbar class="gradient">
          <v-btn icon @click="$router.go(-1)">
            <v-icon color="white">fa fa-arrow-left</v-icon>
          </v-btn>
          <h1 class="title white--text">{{ $t("wfObject.update.title") }}</h1>
        </v-toolbar>
        <v-card-actions>
          <v-col cols="12">
            <v-form v-model="formValid">
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="wfObject.name"
                    :rules="validations.name"
                    :label="$t('wfObject.update.name')"
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
                  @click="updateWFObject()"
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
import { ShowSuccessMessage, ShowErrorMessage } from "../../common/alerts";
import { GET_WF_OBJECT,UPDATE_WF_OBJECT } from "../../store/modules/wfobject/actions.type";
import wfObjectGetEntity from "../../entities/wfobject/get";
import wfObjectUpdateEntity from "../../entities/wfobject/update";
export default {
  data() {
    return {
      wfObject: {},
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
    updateWFObject() {
      var req = Object.assign({}, wfObjectUpdateEntity);
      req.ProjectId = this.$route.params.projectid;
      req.WFObjectId = this.$route.params.wfobjectid;
      req.Name = this.wfObject.name;
      this.$store.dispatch(UPDATE_WF_OBJECT,req).then((payload)=>{
        ShowSuccessMessage(payload.message)
        this.$router.go(-1)
      }).catch((err)=>{
        ShowErrorMessage(err.message);
      })      
    },
  },
  created() {
    var getObject = Object.assign({}, wfObjectGetEntity);
    getObject.ProjectId = this.$route.params.projectid;
    getObject.WFObjectId = this.$route.params.wfobjectid;
    this.$store
      .dispatch(GET_WF_OBJECT, getObject)
      .then(() => {
        this.wfObject = this.$store.getters.getWfObject;
      })
      .catch((err) => {
        ShowErrorMessage(err.message);
      });
  },
};
</script>