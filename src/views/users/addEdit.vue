<template>
  <div>
    <b-card>
      <b-row>
        <b-col cols="12" class="" style="height: auto;">
          <div style="width: 90px; height: 100px;">
            <b-img
              v-if="url"
              :src="url"
              alt=""
              style="width: 100%; height: 100%;"
              class="rounded"
            />
            <div
              v-else
              class="rounded border d-flex align-items-center justify-content-center"
              style="width: 90px; height: 100px;"
            >
              rasm yo'q
            </div>
          </div>
          <!-- <b-form-file
      v-model="user.photo"
    ></b-form-file> -->
        </b-col>

        <b-col class="  mt-1" cols="12"
          ><label
            for="userImg"
            class="btn btn-info btn-sm mb-0"
            style="width: 90px;"
          >
            yuklash
          </label>
          <input
            ref="upload"
            type="file"
            id="userImg"
            class="d-none"
            @change="changeImg"
          />
        </b-col>
        <b-col md="10" class="ml-2">
          <b-row>
            <b-col cols="12" class="mt-xs-2"> </b-col>
          </b-row>
        </b-col>
      </b-row>
      <!-- -----------------------------forma----------------------------- -->

      <ValidationObserver ref="createUser">
        <b-row class="mt-3">
          <!-- full_name -->
          <b-col md="4">
            <validation-provider
              #default="{ errors }"
              :name="$t('administration.password')"
              rules="required"
            >
              <b-form-group label="ism familiya">
                <b-form-input
                  v-model="user.full_name"
                  :state="errors.length > 0 ? false : null"
                />
              </b-form-group>

              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>

          <!-- email -->
          <b-col md="4">
            <validation-provider
              #default="{ errors }"
              name="email"
              rules="required"
            >
              <b-form-group label="email">
                <b-form-input
                  v-model="user.email"
                  :state="errors.length > 0 ? false : null"
                />
              </b-form-group>

              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>

          <!-- phone -->
          <b-col md="4">
            <validation-provider
              #default="{ errors }"
              name="phone"
              rules="required"
            >
              <b-form-group label="telifon nomer">
                <b-form-input
                  type="number"
                  v-model="user.phone"
                  :state="errors.length > 0 ? false : null"
                />
              </b-form-group>

              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>

          <!-- birthday -->
          <b-col md="4">
            <validation-provider #default="{ errors }" name="tugilgan kun">
              <b-form-group label="Tug'ilgani kun ">
                <!-- <b-form-input
                  v-model="user.birthday"
                  
                  type="date"
                /> -->
                <b-form-datepicker
                  direction="down"
                  v-model="user.birthday"
                ></b-form-datepicker>
              </b-form-group>

              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>

          <!-- --------------------------Parol-------------------------- -->
          <b-col md="4">
            <validation-provider
              #default="{ errors }"
              name="parol"
              rules="required"
            >
              <b-form-group label="Parol">
                <b-form-input
                  v-model="user.password"
                  :state="errors.length > 0 ? false : null"
                  type="password"
                />
              </b-form-group>

              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>

          <!-- Parolni tasdiqlang -->
          <b-col md="4">
            <validation-provider
              #default="{ errors }"
              name="Parolni tasdiqlang"
              rules="required"
            >
              <b-form-group label="Parolni tasdiqlang">
                <b-form-input
                  v-model="user.confirm_password"
                  :state="errors.length > 0 ? false : null"
                  type="password"
                />
              </b-form-group>

              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>

          <!-- cite -->
          <b-col md="4">
            <validation-provider
              #default="{ errors }"
              name="shahar"
              rules="required"
            >
              <b-form-group label="Shahar">
                <b-form-input
                  v-model="user.city"
                  :state="errors.length > 0 ? false : null"
                />
              </b-form-group>

              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>

          <!-- region -->
          <b-col md="4">
            <validation-provider
              #default="{ errors }"
              name="Tuman"
              rules="required"
            >
              <b-form-group label="Tuman">
                <b-form-input
                  v-model="user.region"
                  :state="errors.length > 0 ? false : null"
                />
              </b-form-group>

              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>

          <!-- street -->
          <b-col md="4">
            <validation-provider
              #default="{ errors }"
              name="ko'cha"
              rules="required"
            >
              <b-form-group label="Ko'cha">
                <b-form-input
                  v-model="user.street"
                  :state="errors.length > 0 ? false : null"
                />
              </b-form-group>

              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>

          <!-- <b-col md="4">
            <validation-provider
              #default="{ errors }"
              name="$t('administration.password')"
              rules="required"
            >
              <b-form-group label="ism familiya">
                <b-form-input
                  v-model="password"
                  :state="errors.length > 0 ? false : null"
                />
              </b-form-group>

              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col> -->

          <!-- <b-col md="4">
            <validation-provider
          #default="{ errors }"
          name="$t('media.icon')"
          rules="required"
        >
          <b-form-group label="$t('media.icon') + ':'">
            <v-select
              label="name"
              v-model="icon"
              class="bg-white rounded"
              :options="[1, 2, 3, 4, 5]"
            />
        :reduce="options => options.id" 
          </b-form-group>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
          </b-col> -->

          <b-col md="4">
            <validation-provider
              #default="{ errors }"
              name="role"
              rules="required"
            >
              <b-form-group label="role">
                <v-select
                  label="label"
                  v-model="user.role"
                  class="bg-white rounded"
                  :options="GET_ROLE"
                  :reduce="options => options.name"
                />
              </b-form-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-col>
        </b-row>
      </ValidationObserver>
      <b-row>
        <b-col cols="6">
          <div v-if="error.length" class="border border-danger p-2 w-75">
            <div class="d-flex justify-content-end">
              <feather-icon icon="XIcon" class="errorX" @click="error = []" />
            </div>

            <p v-for="(item, idx) in error" :key="idx" class="text-danger">
              {{ item }}
            </p>
          </div>
        </b-col>
        <b-col cols="6" class="d-flex justify-content-end align-items-start">
          <b-button variant="danger">orqaga</b-button>
          <b-button class="ml-2" variant="info" @click="saveUser"
            >saqlash</b-button
          >
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>
<script>
  import vSelect from 'vue-select'
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import { required } from '@validations'
  import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

  import {
    BInputGroup,
    BFormInput,
    BFormGroup,
    BFormCheckbox,
    BRow,
    BCol,
    BCard,
    BButton,
    BImg,
    BInputGroupAppend,
    BFormDatepicker,
    BFormFile,
  } from 'bootstrap-vue'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    components: {
      ValidationObserver,
      ValidationProvider,
      BInputGroup,
      BFormInput,
      BFormGroup,
      BFormCheckbox,
      BRow,
      BCol,
      BCard,
      BButton,
      vSelect,
      BImg,
      BInputGroupAppend,
      BFormDatepicker,
      BFormFile,
      FeatherIcon,
    },
    data() {
      return {
        password: null,
        required,
        title: null,
        icon: null,
        user: {
          full_name: null, // *
          email: null, //
          photo: null, //
          state: "O'zbekiston", //?
          city: 'Toshkent', //?
          region: null, //
          street: null, //
          role: null, // select
          language: 'uz', //tanlov yo'q
          password: null, //
          confirm_password: null, //
          phone: null, //
          birthday: null, //
        },
        error: [],
        url: null,
      }
    },
    methods: {
      ...mapActions('users', ['CREATE_USER', 'FETCH_ROLE']),
      saveUser() {
        this.$refs.createUser.validate().then(success => {
          const userData = new FormData()
          userData.append('full_name', this.user.full_name)
          userData.append('email', this.user.email)
          userData.append('photo', this.user.photo)
          userData.append('state', this.user.state)
          userData.append('city', this.user.city)
          userData.append('region', this.user.region)
          userData.append('street', this.user.street)
          userData.append('role', this.user.role)
          userData.append('language', this.user.language)
          userData.append('password', this.user.password)
          userData.append('confirm_password', this.user.confirm_password)
          userData.append('phone', this.user.phone)
          userData.append('birthday', this.user.birthday)
          if (success) {
            this.CREATE_USER(userData)
              .then(res => {
                console.log(res)

                this.$_okToast()
                // this.$router.push('/users')
              })
              .catch(error => {
                let errorData = error.response.data.message
                let data
                for (let key in errorData) {
                  for (let i = 0; i < errorData[key].length; i++) {
                    this.error.push(errorData[key][i])
                    console.log(errorData[key][i])
                  }

                  // data = errorData[key];
                  // console.log(data);
                }
                // this.$_errorToast({message:data })
              })
          }
        })
      },
      changeImg(e) {
        this.user.photo = e.target.files[0]
        this.url = URL.createObjectURL(e.target.files[0])
        console.log(this.url)
      },
    },
    computed: {
      ...mapGetters('users', ['GET_ROLE']),
    },
    mounted() {
      this.FETCH_ROLE()
    },
  }
</script>
<style lang="scss">
  @import '@core/scss/vue/pages/page-auth.scss';
  .errorX {
    cursor: pointer;
  }
</style>

<!-- 

  




birthday : bu yerda avval yil keyin oy keyin kun bolishi shart -->
