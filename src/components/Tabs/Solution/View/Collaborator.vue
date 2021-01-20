<template>
  <v-row class="ma-0">
    <v-col cols="12" class="pa-0">
      <v-card>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="collaborators"
            :no-data-text="$t('base.noDataText')"
          >
            <template v-slot:item.avatar="{ item }">
              <v-avatar color="teal" size="42">
                <v-img :src="item.avatar"></v-img>
              </v-avatar>
            </template>
            <template v-slot:item.collaboratorTypeName="{ item }">
              {{ $t(item.collaboratorTypeName) }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    collaborators: {
      required: true,
    },
  },
  data() {
    return {
      headers: [
        {
          text: this.$t("solution.view.collaboratorTable.avatar"),
          align: "center",
          value: "avatar",
        },
        {
          text: this.$t("solution.view.collaboratorTable.organizationName"),
          align: "center",
          value: "organizationName",
        },
        {
          text: this.$t("solution.view.collaboratorTable.userName"),
          align: "center",
          value: "userName",
        },
        {
          text: this.$t("solution.view.collaboratorTable.email"),
          align: "center",
          value: "email",
        },
        {
          text: this.$t("solution.view.collaboratorTable.collaboratorType"),
          align: "center",
          value: "collaboratorTypeName",
        },
      ],
    };
  },
};
</script>