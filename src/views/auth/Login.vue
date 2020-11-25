<template>
  <v-container fluid fill-height>
    <v-row class="card-action-row">
      <v-col class="col-md-3 col-xs-12 col-sm-6">
        <v-card class="mx-auto my-12" elevation="12">
          <v-card-actions>
            <v-col class="col-md-12">
              <!-- Logo Field !-->
              <v-row class="card-action-row">
                <v-img
                  src="https://avatars1.githubusercontent.com/u/74700089?s=200&v=4"
                  max-width="120"
                  max-height="120"
                ></v-img>
              </v-row>
              <!-- Logo Field !-->
              <v-form>
                <!-- Title Field !-->
                <v-row class="card-action-row mt-2">
                  <h1 class="title text-center">
                    {{ $t("auth.login.title") }}
                  </h1>
                </v-row>
                <!-- Title Field !-->
                <!-- Email Field !-->
                <v-row
                  v-if="
                    $vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly
                  "
                  class="row_text_field__xs__sm"
                >
                  <v-text-field
                    v-model="user.email"
                    :rules="validations.email"
                    :label="$t('auth.login.emailPlaceholder')"
                  ></v-text-field>
                </v-row>
                <v-row v-else class="row_text_field__md__lg">
                  <v-text-field
                    v-model="user.email"
                    :rules="validations.email"
                    :label="$t('auth.login.emailPlaceholder')"
                  ></v-text-field>
                </v-row>
                <!-- Email Field !-->
                <!-- Password Field !-->
                <v-row
                  v-if="
                    $vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly
                  "
                  class="row_text_field__xs__sm"
                >
                  <v-text-field
                    :type="passwordFieldType"
                    v-model="user.password"
                    :rules="validations.password"
                    :label="$t('auth.login.passwordPlaceholder')"
                    :append-icon="
                      passwordFieldType === 'password'
                        ? 'fa-eye'
                        : 'fa-eye-slash'
                    "
                    @click:append="
                      passwordFieldType =
                        passwordFieldType === 'password' ? 'text' : 'password'
                    "
                  ></v-text-field>
                </v-row>
                <v-row v-else class="row_text_field__md__lg">
                  <v-text-field
                    :type="passwordFieldType"
                    v-model="user.password"
                    :rules="validations.password"
                    :label="$t('auth.login.passwordPlaceholder')"
                    :append-icon="
                      passwordFieldType === 'password'
                        ? 'fa-eye'
                        : 'fa-eye-slash'
                    "
                    @click:append="
                      passwordFieldType =
                        passwordFieldType === 'password' ? 'text' : 'password'
                    "
                  ></v-text-field>
                </v-row>
                <!-- Password Field !-->
              </v-form>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Login from "../../entities/auth/login";
export default {
  data() {
    return {
      user: new Login(),
      validations: {
        email: [
          (v) => !!v || this.$t("base.required"),
          (v) => /.+@.+/.test(v) || this.$t("base.emailValidationError"),
        ],
        password: [(v) => !!v || this.$t("base.required")],
      },
      passwordFieldType: "password",
    };
  },
};
</script>

<style scope>
.v-main__wrap {
  background: rgb(52, 52, 76);
  background: linear-gradient(
    90deg,
    rgba(52, 52, 76, 1) 0%,
    rgba(19, 156, 148, 1) 35%,
    rgba(32, 76, 116, 1) 100%
  );
}
.card-action-row {
  align-content: center;
  justify-content: center;
}
.row_text_field__xs__sm {
  margin-left: 16px;
  margin-right: 16px;
}
.row_text_field__md__lg {
  margin-left: 32px;
  margin-right: 32px;
}
</style>
