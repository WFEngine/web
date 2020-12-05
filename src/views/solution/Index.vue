<template>
  <v-row class="ma-2">
    <v-col cols="12">
      <v-card class="elevation-12">
        <v-toolbar class="gradient">
          <v-btn icon @click="$router.go(-1)">
            <v-icon color="white">fa fa-arrow-left</v-icon>
          </v-btn>
          <h1 class="title white--text">
            {{ $t("dashboard.solutions") }}
          </h1>
          <v-spacer></v-spacer>
          <v-btn icon @click="$router.push({ path: '/solution/new' })">
            <v-icon color="white">fa fa-plus</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-actions>
          <v-row>
            <v-col cols="12">
              <v-data-table
                :headers="headers"
                :items="solutions"
                :expanded.sync="expanded"
                :single-expand="true"
                show-expand
              >
                <template v-slot:item.actions="{ item }">
                  <v-btn icon @click="update(item)">
                    <v-icon>fa fa-edit</v-icon>
                  </v-btn>
                  <v-btn icon @click="update(item)">
                    <v-icon>fa fa-trash</v-icon>
                  </v-btn>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length">
                    <v-expansion-panels
                      v-if="item.projects.length > 0"
                      class="pa-2"
                    >
                      <v-expansion-panel
                        v-for="(project, index) in item.projects"
                        :key="index"
                      >
                        <v-expansion-panel-header>
                          <span> {{ project.name }}</span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content v-if="project.description">
                          <span>{{ project.description }}</span>
                        </v-expansion-panel-content>
                        <v-expansion-panel-content v-else>
                          <span>Proje Açıklaması Bulunamadı</span>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>

                    <span v-else>
                      <v-btn
                        color="#34344C"
                        @click="$router.push({ path: '/project/new' })"
                      >
                        <v-icon left color="white">fa fa-plus</v-icon>
                        <span class="white--text">
                          {{ $t("dashboard.newProject") }}
                        </span>
                      </v-btn>
                    </span>
                  </td>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { GET_SOLUTIONS } from "../../store/modules/solution/actions.type";
import { ShowErrorMessage } from "../../common/alerts";
export default {
  data() {
    return {
      expanded: [],
      headers: [
        {
          text: "Firma Adı",
          align: "left",
          sortable: true,
          value: "organizationName",
        },
        {
          text: "Çözüm Adı",
          align: "left",
          sortable: true,
          value: "name",
        },
        {
          text: "Çözüm Açıklaması",
          align: "left",
          sortable: true,
          value: "description",
        },
        {
          text: "İşlemler",
          align: "left",
          sortable: false,
          value: "actions",
        },
      ],
      solutions: [],
    };
  },
  methods: {
    delete(item) {
      console.log(item);
    },
    update(item) {
      console.log(item);
    },
  },
  created() {
    this.$store
      .dispatch(GET_SOLUTIONS)
      .then(() => {
        this.solutions = this.$store.getters.getSolutions;
      })
      .catch((err) => {
        ShowErrorMessage(err.message);
      });
  },
};
</script>
