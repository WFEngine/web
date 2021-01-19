<template>
  <v-row class="ma-0">
    <v-col cols="12" class="pa-0">
      <v-card>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="projetcs"
            :no-data-text="$t('base.noDataText')"
          >
            <template v-slot:item.projectType="{ item }">
              {{ $t(item.projectType) }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                icon
                @click="
                  $router.push({ name: 'viewproject', params: { id: item.id } })
                "
              >
                <v-icon>fa fa-eye</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="
                  $router.push({
                    name: 'updateproject',
                    params: { id: item.id },
                  })
                "
              >
                <v-icon>fa fa-edit</v-icon>
              </v-btn>
              <v-btn icon @click="deleteProject(item)">
                <v-icon>fa fa-trash</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { DELETE_PROJECT } from "../../../../store/modules/project/actions.type";
import {
  ShowConfirmDialog,
  ShowSuccessMessage,
  ShowErrorMessage,
} from "../../../../common/alerts";
export default {
  props: {
    solution: {
      required: true,
    },
  },
  data() {
    return {
      headers: [
        {
          text: this.$t("solution.view.table.projectName"),
          align: "left",
          value: "name",
        },
        {
          text: this.$t("solution.view.table.projectType"),
          align: "left",
          value: "projectType",
        },
        {
          text: this.$t("solution.view.table.projectDescription"),
          align: "left",
          value: "description",
        },
        {
          text: "İşlemler",
          align: "left",
          value: "actions",
        },
      ],
      projetcs: this.solution.projects,
    };
  },
  methods: {
    deleteProject(item) {
      var index = this.projetcs.indexOf(item);
      console.log(index);
      ShowConfirmDialog(this.$t("solution.view.deleteProject")).then(() => {
        this.$store
          .dispatch(DELETE_PROJECT, item)
          .then(() => {
            ShowSuccessMessage();
            this.projetcs.splice(index, 1);
          })
          .catch((err) => {
            ShowErrorMessage(err.message);
          });
      });
    },
  },
  created() {
    if (!this.solution) this.$router.push({ path: "/solution" });
  },
};
</script>