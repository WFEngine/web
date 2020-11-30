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
                    :counter="100"
                  ></v-text-field>
                </v-row>
                <v-row v-else class="row_text_field__md__lg">
                  <v-text-field
                    v-model="user.email"
                    :rules="validations.email"
                    :label="$t('auth.login.emailPlaceholder')"
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
                    :counter="50"
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
                    :counter="50"
                  ></v-text-field>
                </v-row>
                <!-- Password Field !-->
                <!-- Login Button !-->
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
                    @click="logIn(1)"
                  >
                    {{ $t("auth.login.loginButton") }}
                  </v-btn>
                </v-row>
                <v-row class="card-action-row row_text_field__md__lg" v-else>
                  <v-btn
                    :disabled="!formValid"
                    block
                    class="gradient white--text"
                    @click="logIn(1)"
                  >
                    {{ $t("auth.login.loginButton") }}
                  </v-btn>
                </v-row>
                <v-row class="card-action-row mt-2">
                  <v-tooltip right>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on" icon @click="logIn(2)">
                        <svg width="32" height="32" viewBox="0 0 24 24">
                          <path
                            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                          />
                        </svg>
                      </v-btn>
                    </template>
                    <span>{{ $t("auth.login.githubLoginButton") }}</span>
                  </v-tooltip>
                </v-row>
                <!-- Login Button !-->
                <!-- Sign Up !-->
                <v-row class="card-action-row mt-4">
                  <span class="caption link" @click="redirectRegister">{{
                    $t("auth.login.signUp")
                  }}</span>
                </v-row>
                <!-- Sign Up !-->
                <!-- Forgot Password !-->
                <v-row class="card-action-row mt-1">
                  <span class="caption link" @click="redirectRegister()">{{
                    $t("auth.login.forgotPassword")
                  }}</span>
                </v-row>
                <!-- Forgot Password !-->
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
import Token from "../../entities/auth/token";
import { LOGIN, GET_USER } from "../../store/modules/auth/actions.type";
import { ShowErrorMessage } from "../../common/alerts";
import jwtService from "../../common/jwt.service";
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
      formValid: false,
    };
  },
  methods: {
    redirectRegister() {
      this.$router.push({
        path: "/auth/register",
      });
    },
    logIn(loginType) {
      this.user.loginType = loginType;
      this.$store
        .dispatch(LOGIN, this.user)
        .then(() => {
          if (this.user.loginType === 1) window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          ShowErrorMessage(err.message);
        });
    },
  },
  created() {
    if (this.$route.query.status) {
      var status = this.$route.query.status;
      var token = this.$route.query.token;
      if (status === "error") {
        ShowErrorMessage(this.$t("auth.login.loginFailed"));
      } else {
        var tokenObj = new Token(token);
        jwtService.saveToken(tokenObj);
        this.$store
          .dispatch(GET_USER)
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            ShowErrorMessage(err.message);
          });
      }
    }
  },
};
</script>

<style scope>
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
