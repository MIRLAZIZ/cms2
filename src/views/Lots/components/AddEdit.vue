<template>
  <div>
    <b-card>
      <h5 v-if="!view">Добавление лота</h5>

      <b-row>
        <b-col class="col-md-3 col-12 mt-2" v-if="!view">
          <b-form-group>
            <h5 class="title">Категория:</h5>
            <v-select
              v-model="lot.category"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :get-option-label="el => {
                return el.title[$i18n.locale]
              }"
              :reduce="p=>p.id"
              :options="GET_LOTS_DETAIL_CATEGORY.results"
              @input="fetchCategory"
            />
          </b-form-group>

          <b-form-group>
            <h5 class="title">Бренды товаров:</h5>
            <v-select
              v-model="lot.brands"
              :get-option-label="el => {
                return el.title[$i18n.locale]
              }"
              :reduce="p=>p.id"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="GET_LOTS_DETAIL_BRAND.results"
              :disabled="!lot.category"
              @input="fetchCategory"
            />
          </b-form-group>

          <b-form-group class="mt-2">
            <h5 class="title">Товары:</h5>
            <v-select
              label="title"
              v-model="lot.product"
              :options="GET_LOTS_DETAIL_PRODUCT.results"
              :disabled="!lot.brands"
            >
              <template #option="{ title,category, product_images }">
                <div class="d-flex align-items-center">
                  <b-img
                    class="img__select mr-1"
                    fluid
                    width="50"
                    :src="product_images[0].image"
                    alt="Фото родителя"
                  />
                  <div class="d-flex flex-column">
                    <div class="title">{{ category.title }}</div>
                    <div class="description">{{ title }}</div>
                  </div>
                </div>
              </template>
            </v-select>
          </b-form-group>
        </b-col>

        <b-col :class="view ? 'col-md-10 m-auto' : 'col-md-8 col-12 ml-auto'">
          <b-row class="right" v-if="lot.product">
            <b-col class="col-md-12">
              <h3>{{ lot.product.title }}</h3>
            </b-col>

            <b-col class="col-md-2 col-12 flex__column__img">
              <div
                v-for="(item) in lot.product.product_images"
                :key="item.id"
              >
                <img
                  class="mb-50"
                  :src="item.image"
                  alt=""
                >
              </div>
            </b-col>

            <b-col class="col-md-4 col-12 d-flex align-items-center justify-content-center">
              <b-img
                class="image__thumb"
                :src="lot.product.product_images[0].image"
                alt="/"
              />
            </b-col>

            <b-col class="col-md-5 desc mt-1">
              <h5 class="cost">{{ lot.product.price }} сум</h5>


              <p>Коротко товаре</p>

              <p class="all_desc">
                {{ lot.product.product_description }}
              </p>

              <p>Доставка</p>

              <p class="all_desc">Доставка по Ташкенту бесплатная</p>
            </b-col>
          </b-row>

          <template v-else>
            <div class="shadow no__data mb-2">
              <p>Выберите товар</p>
            </div>
          </template>

          <validation-observer ref="lotValidation" v-if="!view">
            <b-row class="mt-3">
              <b-col class="col-md-4 mb-1">
                <h5 class="title">
                  Стартовая цена:
                </h5>
                <validation-provider
                  #default="{ errors }"
                  name="Стартовая цена"
                  rules="required"
                >
                  <b-form-input
                    type="number"
                    v-model="lot.start_price"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>

              <b-col class="col-md-4 mb-1">
                <h5 class="title">
                  Цена повышения:
                </h5>
                <validation-provider
                  #default="{ errors }"
                  name="Цена повышения"
                  rules="required"
                >
                  <b-form-input
                    type="number"
                    v-model="lot.bids_step"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>

              <b-col class="col-md-4 mb-1">
                <h5 class="title">
                  Интервал между стуками:
                </h5>
                <validation-provider
                  #default="{ errors }"
                  name="Интервал между стуками"
                  rules="required"
                >
                  <!--                  <cleave-->
                  <!--                    v-model="lot.bids_raise_interval"-->
                  <!--                    id="time"-->
                  <!--                    class="form-control"-->
                  <!--                    :raw="false"-->
                  <!--                    :options="options.time"-->
                  <!--                  />-->
                  <flat-pickr
                    v-model="lot.bids_raise_interval"
                    class="form-control"
                    :config="{
                      enableTime: true,
                       noCalendar: true,
                        dateFormat: 'H:i',
                        }"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>

              <b-col class="col-md-4 mb-1">
                <h5 class="title">
                  Количество стуков:
                </h5>
                <validation-provider
                  #default="{ errors }"
                  name="Количество стуков"
                  rules="required"
                >
                  <b-form-input
                    type="number"
                    v-model="lot.bids_amount"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>

              <b-col class="col-md-4 mb-1">
                <h5 class="title">
                  Дата и время начала:
                </h5>
                <validation-provider
                  #default="{ errors }"
                  name="Дата и время начала"
                  rules="required"
                >
                  <flat-pickr
                    v-model="lot.time_starting"
                    class="form-control"
                    :config="{
                      enableTime: true,
                      dateFormat: 'Y-m-d H:i'
                    }"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>

              <b-col class="col-md-4 mb-1">
                <h5 class="title">
                  Дата и время конца:
                </h5>
                <validation-provider
                  #default="{ errors }"
                  name="Дата и время конца"
                  rules="required"
                >
                  <flat-pickr
                    v-model="lot.time_ending"
                    class="form-control"
                    :config="{
                      enableTime: true,
                      dateFormat: 'Y-m-d H:i'
                    }"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>

              <b-col class="col-md-4 mb-1">
                <h5 class="title">
                  Статус:
                </h5>
                <validation-provider
                  #default="{ errors }"
                  name="Дата и время конца"
                  rules="required"
                >
                  <v-select
                    v-model="lot.status"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :get-option-label="el => {
                      return el.title[$i18n.locale]
                    }"
                    :reduce="p=>p.value"
                    :options="statusList"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-col>

              <b-col class="col-md-4 mt-2 ml-auto text-right">
                <b-button
                  :variant="$route.params.id ? 'primary' : 'secondary'"
                  @click="onSubmitDraft"
                >
                  Черновик
                </b-button>

                <b-button
                  class="ml-1"
                  :variant="$route.params.id ? 'warning' : 'success'"
                  @click="onSubmit"
                >
                  {{ $route.params.id ? 'Редактировать' : 'Сохранить' }}
                </b-button>
              </b-col>
            </b-row>
          </validation-observer>
        </b-col>
      </b-row>

      <b-button
        @click="$router.push('/lots')"
        v-if="view"
        class="float-right"
      >
        Назад
      </b-button>
    </b-card>
  </div>
</template>

<script>
  import {
    BCard,
    BButton,
    BFormInput,
    BImg,
    BRow,
    BCol,
    BFormGroup,
  } from 'bootstrap-vue'
  import flatPickr from 'vue-flatpickr-component'
  import vSelect from 'vue-select'
  import Cleave from 'vue-cleave-component'
  import { required } from '@core/utils/validations/validations'
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: {
      BCard,
      BButton,
      BFormInput,
      BImg,
      BRow,
      BCol,
      BFormGroup,
      vSelect,
      flatPickr,
      Cleave,
      ValidationProvider,
      ValidationObserver,
    },
    props: {
      view: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        required,
        filteredSelects: {
          category: null,
          brands: null,
        },
        lot: {
          category: null,
          brands: null,

          product: null,
          start_price: null,
          bids_step: null,
          bids_raise_interval: null,
          bids_amount: null,
          time_starting: null,
          time_ending: null,
          status: null,
        },
        options: {
          time: {
            time: true,
            timePattern: ['h', 'm'],
          },
        },
        statusList: [
          {
            title: {
              uz: 'Faol',
              ru: 'Активный',
            },
            value: true,
          },
          {
            title: {
              uz: 'Faol emas',
              ru: 'Не активный',
            },
            value: false,
          },
        ],
      }
    },
    mounted() {
      this.FETCH_LOTS_DETAIL_CATEGORY()
      this.FETCH_LOTS_DETAIL_BRAND()
      this.FETCH_LOTS_DETAIL_PRODUCT()
      this.FETCH_LOTS()

      if (this.$route.params.id) {
        this.FETCH_LOTS_DETAIL_PRODUCT_ID(this.$route.params.id)
          .then(res => {
            const {
              product,
              category,
              brands,
              start_price,
              bids_step,
              bids_raise_interval,
              bids_amount,
              time_starting,
              time_ending,
              status,
            } = this.GET_LOTS_DETAIL_PRODUCT_ID

            this.lot.product = product
            this.lot.category = category.id
            this.lot.brands = brands.id
            this.lot.start_price = start_price
            this.lot.bids_step = bids_step
            this.lot.bids_raise_interval = bids_raise_interval
            this.lot.bids_amount = bids_amount
            this.lot.time_starting = time_starting
            this.lot.time_ending = time_ending
            this.lot.status = status
          })
      }
    },

    methods: {
      ...mapActions('lots', ['FETCH_LOTS_DETAIL_CATEGORY', 'FETCH_LOTS_DETAIL_BRAND', 'FETCH_LOTS_DETAIL_PRODUCT', 'CREATE_LOT', 'FETCH_LOTS', 'FETCH_LOTS_DETAIL_PRODUCT_ID', 'UPDATE_LOTS_DETAIL_PRODUCT_ID']),

      onSubmit() {
        this.$refs.lotValidation.validate()
          .then(success => {
            if (success) {
              if (this.$route.params.id) {
                const {
                  product,
                  ...rest
                } = this.lot
                this.UPDATE_LOTS_DETAIL_PRODUCT_ID({
                  id: this.$route.params.id,
                  saves: 'done',
                  product: product.id,
                  ...rest,
                })
                  .then(() => {
                    this.FETCH_LOTS()
                    this.$router.push('/lots')
                  })
              } else {
                const {
                  product,
                  category,
                  brands,
                  ...rest
                } = this.lot

                this.CREATE_LOT({
                  saves: 'done',
                  category: category.id,
                  brands: brands.id,
                  product: product.id,
                  ...rest,
                })
                  .then(() => {
                    this.FETCH_LOTS()
                    this.$router.push('/lots')
                  })
              }
            }
          })
      },

      onSubmitDraft() {
        this.$refs.lotValidation.validate()
          .then(success => {
            if (success) {
              if (this.$route.params.id) {
                const {
                  product,
                  ...rest
                } = this.lot
                this.UPDATE_LOTS_DETAIL_PRODUCT_ID({
                  id: this.$route.params.id,
                  saves: 'draft',
                  product: product.id,
                  ...rest,
                })
                  .then(() => {
                    this.FETCH_LOTS()
                    this.$router.push('/lots')
                  })
              } else {
                const {
                  product,
                  ...rest
                } = this.lot

                this.CREATE_LOT({
                  saves: 'draft',
                  product: product.id,
                  ...rest,
                })
                  .then(() => {
                    this.FETCH_LOTS()
                    this.$router.push('/lots')
                  })
              }
            }
          })
      },

      fetchCategory() {
        const { category, brands } = this.lot
        this.FETCH_LOTS_DETAIL_PRODUCT({ category, brands })
        this.lot.product = null
      },
    },
    computed: {
      ...mapGetters('lots', ['GET_LOTS_DETAIL_PRODUCT', 'GET_LOTS_DETAIL_CATEGORY', 'GET_LOTS_DETAIL_BRAND', 'GET_LOTS_DETAIL_PRODUCT_ID']),
    },

  }
</script>
<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
  @import "../main.css";
</style>
