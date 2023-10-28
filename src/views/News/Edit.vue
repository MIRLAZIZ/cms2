<template>
  <div>
    <validation-observer ref="simpleRules">
      <b-row>
        <b-col md="5">
          <b-card>
            <MainPhoto :main_photo.sync="main_photo" />
          </b-card>
          <b-card>
            <SecondPhoto :images.sync="image" />
          </b-card>
        </b-col>
        <b-col md="7">
          <b-card class="d-flex flex-column justify-content-between">
            <div>
              <b-row>
                <b-col md="12" class="mb-1">
                  <label for="textarea-default">
                    {{ this.$t('naming') }}:
                  </label>
                  <validation-provider
                    #default="{ errors }"
                    :name="this.$t('naming').toLowerCase()"
                    rules="required"
                  >
                    <b-form-input
                      :state="errors.length > 0 ? false : null"
                      size="lg"
                      v-model="title"
                      :placeholder="$t('naming')"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>
              </b-row>

              <b-row>
                <!-- short description -->
                <b-col md="12" class="mb-1">
                  <label for="textarea-default">
                    {{ this.$t('short-desc') }}:
                  </label>
                  <validation-provider
                    #default="{ errors }"
                    :name="this.$t('short-desc').toLowerCase()"
                    rules="required"
                  >
                    <b-form-input
                      :state="errors.length > 0 ? false : null"
                      v-model="short_decrp"
                      :placeholder="$t('description')"
                    />
                    <small class="text-danger">
                      {{ errors[0] }}
                    </small>
                  </validation-provider>
                </b-col>
              </b-row>

              <b-row>
                <!-- category -->
                <b-col md="6">
                  <label for="">
                    {{ $t('category:') }}
                  </label>
                  <validation-provider
                    #default="{ errors }"
                    :name="$t('category').toLowerCase()"
                    rules="required"
                  >
                    <v-select
                      v-model="category"
                      :state="errors.length > 0 ? false : null"
                      :reduce="p => p.id"
                      :get-option-label="
                        el => {
                          return el.title[$i18n.locale]
                        }
                      "
                      :options="GET_CATEGORIES.results"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>

                <!-- type -->
                <b-col md="6">
                  <label for="">
                    {{ $t('type:') }}
                  </label>
                  <validation-provider
                    #default="{ errors }"
                    :name="$t('type').toLowerCase()"
                    rules="required"
                  >
                    <v-select
                      v-model="is_banner"
                      :get-option-label="
                        el => {
                          return el.title
                        }
                      "
                      :options="type_options"
                      :reduce="p => p.banner_value"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>
              </b-row>

              <b-row>
                <!-- date picker  -->
                <b-col md="6" class="mt-1">
                  <div class="w-100">
                    <b-form-group class="w-100">
                      <label for="">
                        {{ $t('edit-news.date:') }}
                      </label>
                      <validation-provider
                        #default="{ errors }"
                        :name="$t('date').toLowerCase()"
                        rules="required"
                      >
                        <b-input-group>
                          <flat-pickr
                            id="datepicker-sm"
                            v-model="pub_date"
                            class="form-control date-picker"
                            @change="changeDate(date)"
                          />

                          <flat-pickr
                            v-model="pub_time"
                            class="form-control date-picker"
                            @change="changeTime(pub_time)"
                            @input="changeTime(pub_time)"
                            :config="{
                              enableTime: true,
                              noCalendar: true,
                              time_24hr: true,
                            }"
                          />

                          <!-- <b-form-timepicker
                          v-model="pub_time"
                          format="HH:mm"
                          class="form-control"
                          locale="ru"
                          placeholder="-- : --"
                          @input="changeTime(pub_time)"
                          @change="changeTime(pub_time)"
                        ></b-form-timepicker> -->
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </div>
                </b-col>

                <!-- language -->
                <b-col lg="4" md="4" sm="10" class="mt-1">
                  <validation-provider
                    #default="{ errors }"
                    :name="$t('lang').toLowerCase()"
                    rules="required"
                  >
                    <label for="">
                      {{ $t('language') + ':' }}
                    </label>
                    <v-select
                      v-model="lang"
                      :get-option-label="
                        el => {
                          return el.title
                        }
                      "
                      :options="langs"
                      :reduce="p => p.key"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-col>

                <!-- status -->
                <b-col
                  sm="2"
                  class="
                    d-flex
                    justify-content-center
                    flex-column
                    align-items-center
                  "
                >
                  <label for="">
                    {{ $t('status') + ':' }}
                  </label>
                  <b-form-checkbox
                    v-model="is_active"
                    class="custom-control-success"
                    name="check-button"
                    switch
                  />
                </b-col>
              </b-row>

              <b-row>
                <!-- description -->
                <b-col md="12" class="mb-1">
                  <label for="textarea-default">
                    {{ $t('description') + ':' }}
                  </label>
                  <b-form-textarea
                    v-model="description"
                    :placeholder="$t('description') + '...'"
                    rows="5"
                  />
                </b-col>
              </b-row>
            </div>

            <b-row class="d-flex justify-content-end align-items-center">
              <b-button
                @click="cancel"
                type="reset"
                variant="outline-danger"
                class="mt-2"
              >
                {{ $t('cancel') }}
              </b-button>

              <b-button
                @click="onSubmit"
                v-if="this.$route.path == '/news-create'"
                type="submit"
                variant="success"
                class="mt-2 mx-1"
              >
                {{ $t('add') }}
              </b-button>

              <b-button
                @click="onSubmit($route.params.id)"
                v-else
                type="submit"
                variant="success"
                class="mt-2 mx-1"
              >
                {{ $t('save') }}
              </b-button>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </validation-observer>
  </div>
</template>

<script>
  import { ValidationProvider, ValidationObserver } from 'vee-validate'
  import { required, email } from '@validations'
  import { mapActions, mapGetters } from 'vuex'
  import MainPhoto from './components/MainPhoto.vue'
  import SecondPhoto from './components/SecondPhoto.vue'
  import SelectField from '@/components/SelectField.vue'
  import flatPickr from 'vue-flatpickr-component'
  import { BFormTimepicker } from 'bootstrap-vue'
  import {
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BFormTextarea,
    BFormCheckbox,
    BButton,
  } from 'bootstrap-vue'
  import vSelect from 'vue-select'

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
      BFormTimepicker,
      MainPhoto,
      SecondPhoto,
      SelectField,
      vSelect,
      flatPickr,
      BCard,
      BFormGroup,
      BInputGroup,
      BFormTextarea,
      BFormInput,
      BRow,
      BCol,
      BFormCheckbox,
      BButton,
    },

    data() {
      return {
        emailValue: '',
        name: '',
        required,
        email,

        title: '',
        main_photo: null,
        image: [],
        category: null,
        lang: null,
        is_active: false,
        is_banner: null,
        short_decrp: '',
        created_date: null,
        pub_date: null,
        pub_time: null,
        created_time: null,
        description: '',
        type_options: [
          {
            title: this.$t('is_banner'),
            banner_value: true,
          },
          {
            title: this.$t('is_not_banner'),
            banner_value: false,
          },
        ],
        langs: [
          {
            key: 'uz',
            title: "O'zbek",
          },
          {
            key: 'ru',
            title: 'Русский',
          },
        ],
      }
    },

    computed: {
      ...mapGetters('news', ['GET_CATEGORIES']),
    },

    methods: {
      ...mapActions('news', [
        'CREATE_NEWS',
        'UPDATE_NEWS',
        'FETCH_CATEGORIES',
        'FETCH_NEWS_BY_ID',
      ]),

      // validationForm() {
      //   this.$refs.simpleRules.validate().then(success => {
      //     if (success) {
      //       // eslint-disable-next-line
      //       alert('form submitted!')
      //     }
      //   })
      // },

      // changeDate(date) {
      //   alert(date)
      //   this.pub_date = date
      // },

      // changeTime(time) {
      //   // alert(time)
      //   this.pub_time = time
      // },

      // changeMainPhoto(file) {
      //   this.main_photo = file
      // },

      // updateSecondPhoto(value) {
      //   this.image.push(value)
      // },

      async onSubmit(id) {
        let success = await this.$refs.simpleRules.validate()
        if (!success) return

        let {
          main_photo,
          image,
          category,
          lang,
          is_active,
          is_banner,
          short_decrp,
          created_date,
          created_time,
          pub_date,
          pub_time,
          title,
          description,
        } = this
        let req = new FormData()
        req.append('id', this.$route.params.id)
        if (typeof main_photo != 'string' && main_photo != null) {
          req.append('main_photo', main_photo)
        }
        if (image) {
          image.forEach(item => {
            if (item.binary) {
              req.append('image', item.binary)
            }
          })
        }
        req.append('category', category)
        req.append('lang', lang)
        req.append('is_active', is_active)
        req.append('is_banner', is_banner)
        req.append('short_decrp', short_decrp)
        req.append('created_date', created_date)
        req.append('created_time', created_time)
        req.append('description', description)
        req.append('pub_date', pub_date)
        req.append('pub_time', pub_time)
        req.append('title', title)

        this.$_UploadToast()

        if (this.$route.path == '/news-create') {
          this.CREATE_NEWS(req)
            .then(() => {
              this.$_okToast()
              this.$router.push('/news')
            })
            .catch(err => {
              this.$_errorToast()
              console.log(err)
              this.$router.push('/news')
            })
        } else {
          this.UPDATE_NEWS({ id: this.$route.params.id, data: req })
            .then(() => {
              this.$_okToast()
              this.$router.push('/news')
            })
            .catch(err => {
              this.$_errorToast()
              console.log(err)
              this.$router.push('/news')
            })
        }
      },

      cancel() {
        this.category = ''
        this.lang = null
        this.is_active = false
        this.is_banner = null
        this.short_decrp = null
        this.created_date = null
        this.created_time = null
        this.pub_date = null
        this.pub_time = null
        this.description = ''
        this.title = ''
        this.image = []
        this.$router.push('/news')
      },
    },

    async mounted() {
      await this.FETCH_CATEGORIES()
      if (this.$route.params.id) {
        const {
          lang,
          main_photo,
          image,
          category,
          is_active,
          is_banner,
          description,
          short_decrp,
          pub_date,
          pub_time,
          title,
          created_date,
        } = await this.FETCH_NEWS_BY_ID(this.$route.params.id)
        this.is_active = is_active
        this.lang = lang
        this.image = image
        ;(this.main_photo = main_photo), (this.category = category.id)
        this.is_banner = is_banner
        this.description = description
        this.short_decrp = short_decrp
        this.pub_date = pub_date
        this.created_date = created_date
        this.pub_time = pub_time
        this.title = title
        console.log('title ', this.title)
      }
    },
  }
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>

<style>
  .date-picker {
    padding: 10px !important;
    height: 100% !important;
  }
</style>
