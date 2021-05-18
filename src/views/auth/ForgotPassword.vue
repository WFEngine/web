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
                    {{ $t("auth.recoverPassword.title") }}
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
                    :label="$t('auth.recoverPassword.emailPlaceholder')"
                    :rules="validations.email"
                    :counter="100"
                  ></v-text-field>
                </v-row>
                <v-row v-else class="row_text_field__md__lg">
                  <v-text-field
                    v-model="user.email"
                    :label="$t('auth.recoverPassword.emailPlaceholder')"
                    :rules="validations.email"
                    :counter="100"
                  ></v-text-field>
                </v-row>
                <!-- Email Field !-->
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
                    @click="forgotPassword"
                  >
                    {{ $t("auth.recoverPassword.recoverPasswordButton") }}
                  </v-btn>
                </v-row>
                <v-row class="card-action-row row_text_field__md__lg" v-else>
                  <v-btn
                    :disabled="!formValid"
                    block
                    class="gradient white--text"
                    @click="forgotPassword"
                  >
                    {{ $t("auth.recoverPassword.recoverPasswordButton") }}
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
import RecoverPassword from "../../entities/auth/recoverpassword";
import {RECOVER_PASSWORD} from '../../store/modules/auth/actions.type';
import {ShowSuccessMessage,ShowErrorMessage} from '../../common/alerts'
export default {
  data() {
    return {
      formValid: false,
      user: new RecoverPassword(),
      validations: {
        email: [
          (v) => !!v || this.$t("base.required"),
          (v) => /.+@.+/.test(v) || this.$t("base.emailValidationError"),
        ],
      },
    };
  },
  methods: {
    redirectLogin() {
      this.$router.push({
        path: "/auth/login",
      });
    },
    forgotPassword() {
      this.$store.dispatch(RECOVER_PASSWORD,this.user).then((payload)=>{
        ShowSuccessMessage(payload.message)
      }).catch((err)=>{
        ShowErrorMessage(err.message)
      })
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
