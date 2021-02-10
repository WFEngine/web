<template>
  <v-app>
    <v-container class="pt-0">
      <v-row>
        <toolbar></toolbar>
        <v-row class="mt-0">
          <v-col class="pt-0" cols="12">
            <v-card>
              <v-toolbar>
                <v-toolbar-title>
                  <h1 class="title">{{wfObjectContent.Name}}</h1>
                  <h1 class="caption">{{wfObjectContent.Description}}</h1>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>fa fa-save</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-actions> </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import toolbar from "../../components/Tabs/Workflow/Designer/Toolbar";
import { GET_SOLUTION } from "../../store/modules/solution/actions.type";
import { ShowErrorMessage } from "../../common/alerts";
export default {
  components: {
    toolbar,
  },
  data() {
    return {
      toolbarShow: true,
      solution: {},
      wfObject: {},
      wfObjectContent: {},
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
  },
  watch: {
    wfObject: {
      handler: function (val) {
        this.wfObjectContent = JSON.parse(val.value);
      },
    },
  },
  created() {
    this.getSolution();
  },
};
</script>