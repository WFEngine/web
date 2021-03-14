<template>
  <v-row>
    <v-col
      cols="12"
      md="10"
      lg="10"
      xl="10"
      offset-md="1"
      offset-lg="1"
      offset-xl="1"
    >
      <v-card>
        <v-toolbar class="gradient" dark>
          <h1 class="title">Cases</h1>
          <v-spacer></v-spacer>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon dark v-bind="attrs" v-on="on">
                <v-icon>fa fa-spa</v-icon>
              </v-btn>
            </template>
            <span>Create Case</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon dark v-bind="attrs" v-on="on">
                <v-icon>fa fa-spa</v-icon>
              </v-btn>
            </template>
            <span>Create Default</span>
          </v-tooltip>
        </v-toolbar>

        <v-card-actions></v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>