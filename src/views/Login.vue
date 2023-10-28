<template>
  <div class="auth-wrapper auth-v2">
    
    <b-row class="auth-inner m-0">
      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-0"
        
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center">
          <img
            :src="imgUrl"
            alt="Login V2"
            style="width:100%; height:100%;"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
        lg="4"
        class="auth-bg"
      >
        <!-- class="d-flex align-items-center auth-bg px-2 p-lg-5" -->
      <b-row class="d-flex justify-content-end pr-4 pt-2">
          <locale />
        </b-row>
        <b-row class="d-flex align-items-center px-2 h-75">
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title
            title-tag="h2"
            class="font-weight-bold mb-1"
          >
          <strong>CMS</strong>
           
             <!-- 👋 -->
          </b-card-title>

          <!-- form -->
          <validation-observer ref="loginValidation">
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent
            >
              <!-- email -->
              <b-form-group
                label="login"
                label-for="login-email"
              >
                <validation-provider
                  #default="{ errors }"
                  :name="$t('general.phone')"
                  rules="required"
                >
                  <!--                  <b-form-input-->
                  <!--                      id="login-email"-->
                  <!--                      v-model="username"-->
                  <!--                      :state="errors.length > 0 ? false:null"-->
                  <!--                      name="login-email"-->
                  <!--                      placeholder="Логин"-->
                  <!--                  />-->

                  <b-input-group>
                    <!-- <b-input-group-prepend is-text>
                      (+998)
                    </b-input-group-prepend> -->
                    <b-form-input
                      id="phone"
                      v-model="username"
                      class="form-control"
                      :raw="false"
                      
                  
                    />
                  </b-input-group>

                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">{{ $t('administration.password') }}</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  :name="$t('administration.password')"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"/>
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                @click="validationForm"
              >
                <span>{{ $t('general.login') }}</span>
              </b-button>
            </b-form>
          </validation-observer>
        </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Cleave from 'vue-cleave-component'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BCardTitle, BImg, BForm, BButton,BInputGroupPrepend
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from '@/store/index'
import useJwt from '@/auth/jwt/useJwt'
import 'cleave.js/dist/addons/cleave-phone.uz'
import Locale from '@/@core/layouts/components/app-navbar/components/Locale.vue'

export default {
  components: {
    BInputGroupPrepend,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    ValidationProvider,
    ValidationObserver,
    Cleave,
    Locale,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      password: '',
      username: '',
      sideImg: require('@/assets/images/logo/novoe-logo-1.png'),
      // validation rulesimport store from '@/store/index'
      required,
      email,
      options:{
        phone: {
          phone: true,
          phoneRegionCode: 'UZ',
        },
      }
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/logo/novoe-logo-1.png')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    validationForm() {
      this.$refs.loginValidation.validate().then(() => {
        useJwt.login({ email: this.username, password: this.password }).then(resp => {
          useJwt.setToken(resp.data.token)
          // useJwt.setRefreshToken(resp.data.refresh)
          const { user_data } = resp.data
          useJwt.setUserData(user_data)
            const ability = [{ action: 'manage', subject: 'all' }]
            useJwt.setUserAbilities(ability)
            this.$ability.update(ability)
          this.$router.push('/')
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Вход в систему успешно`,
              icon: 'EditIcon',
              variant: 'success',
            },
          })
        }).catch(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Неправильный логин или пароль',
              icon: 'AlertOctagonIcon',
              variant: 'danger',
            },
          })
        })
      })
    },
  }

}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>

