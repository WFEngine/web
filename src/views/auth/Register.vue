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
                  :src="require('../../assets/logo.png')"
                  max-width="120"
                  max-height="120"
                ></v-img>
              </v-row>
              <!-- Logo Field !-->
              <v-form v-model="formValid">
                <!-- Title Field !-->
                <v-row class="card-action-row mt-2">
                  <h1 class="title text-center">
                    {{ $t("auth.register.title") }}
                  </h1>
                </v-row>
                <!-- Title Field !-->

                <!-- Organization Name Field !-->
                <v-row
                  v-if="
                    $vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly
                  "
                  class="row_text_field__xs__sm"
                >
                  <v-text-field
                    v-model="user.name"
                    :label="$t('auth.register.namePlaceholder')"
                    :rules="validations.name"
                    :counter="100"
                  ></v-text-field>
                </v-row>
                <v-row v-else class="row_text_field__md__lg">
                  <v-text-field
                    v-model="user.name"
                    :label="$t('auth.register.namePlaceholder')"
                    :rules="validations.name"
                    :counter="100"
                  ></v-text-field>
                </v-row>
                <!-- Organization Name Field !-->
                <!-- Email Field !-->
                <v-row
                  v-if="
                    $vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly
                  "
                  class="row_text_field__xs__sm"
                >
                  <v-text-field
                    v-model="user.email"
                    :label="$t('auth.register.emailPlaceholder')"
                    :rules="validations.email"
                    :counter="100"
                  ></v-text-field>
                </v-row>
                <v-row v-else class="row_text_field__md__lg">
                  <v-text-field
                    v-model="user.email"
                    :label="$t('auth.register.emailPlaceholder')"
                    :rules="validations.email"
                    :counter="100"
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
                    v-model="user.password"
                    :type="passwordFieldType"
                    :label="$t('auth.register.passwordPlaceholder')"
                    :rules="validations.password"
                    :append-icon="
                      passwordFieldType === 'password'
                        ? 'fa-eye'
                        : 'fa-eye-slash'
                    "
                    @click:append="
                      passwordFieldType =
                        passwordFieldType === 'password' ? 'text' : 'password'
                    "
                    :counter="50"
                  ></v-text-field>
                </v-row>
                <v-row v-else class="row_text_field__md__lg">
                  <v-text-field
                    v-model="user.password"
                    :type="passwordFieldType"
                    :label="$t('auth.register.passwordPlaceholder')"
                    :rules="validations.password"
                    :append-icon="
                      passwordFieldType === 'password'
                        ? 'fa-eye'
                        : 'fa-eye-slash'
                    "
                    @click:append="
                      passwordFieldType =
                        passwordFieldType === 'password' ? 'text' : 'password'
                    "
                    :counter="50"
                  ></v-text-field>
                </v-row>
                <!-- Password Field !-->
                <!-- Organization Name!-->
                <v-row
                  v-if="
                    $vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly
                  "
                  class="row_text_field__xs__sm"
                >
                  <v-text-field
                    v-model="user.organizationName"
                    :label="$t('auth.register.organizationNamePlaceHolder')"
                    :rules="validations.organizationName"
                    :counter="50"
                  ></v-text-field>
                </v-row>
                <v-row v-else class="row_text_field__md__lg">
                  <v-text-field
                    v-model="user.organizationName"
                    :label="$t('auth.register.organizationNamePlaceHolder')"
                    :rules="validations.organizationName"
                    :counter="50"
                  ></v-text-field>
                </v-row>
                <!-- Organization Name!-->
                <!-- Sign Up Button !-->
                <v-row
                  class="card-action-row row_text_field__xs__sm"
                  v-if="
                    $vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly
                  "
                >
                  <v-btn
                    :disabled="!formValid"
                    block
                    class="gradient white--text"
                    @click="register"
                  >
                    {{ $t("auth.register.registerButton") }}
                  </v-btn>
                </v-row>
                <v-row class="card-action-row row_text_field__md__lg" v-else>
                  <v-btn
                    :disabled="!formValid"
                    block
                    class="gradient white--text"
                    @click="register"
                  >
                    {{ $t("auth.register.registerButton") }}
                  </v-btn>
                </v-row>
                <!-- Sign Up Button !-->
                <!-- Log In Redirect !-->
                <v-row class="card-action-row mt-4">
                  <span class="caption link" @click="redirectLogin">{{
                    $t("auth.register.logIn")
                  }}</span>
                </v-row>
                <!-- Log In Redirect !-->
              </v-form>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Register from "../../entities/auth/register";
import { ShowSuccessMessage, ShowErrorMessage } from "../../common/alerts";
import { REGISTER } from "../../store/modules/auth/actions.type";
export default {
  data() {
    return {
      formValid: false,
      user: new Register(),
      validations: {
        name: [(v) => !!v || this.$t("base.required")],
        email: [
          (v) => !!v || this.$t("base.required"),
          (v) => /.+@.+/.test(v) || this.$t("base.emailValidationError"),
        ],
        password: [(v) => !!v || this.$t("base.required")],
        organizationName: [(v) => !!v || this.$t("base.required")],
      },
      passwordFieldType: "password",
    };
  },
  methods: {
    redirectLogin() {
      this.$router.push({
        path: "/auth/login",
      });
    },
    register() {
      this.$store
        .dispatch(REGISTER, this.user)
        .then(() => {
          ShowSuccessMessage();
          this.$router.push({
            path:'/auth/login'
          })
        })
        .catch((err) => {
          ShowErrorMessage(err.message);
        });
    },
  },
};
</script>

<style scoped>
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
.link {
  cursor: pointer;
}
</style>
