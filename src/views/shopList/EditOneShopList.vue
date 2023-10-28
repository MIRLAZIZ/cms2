<template>
  <div>
    <ValidationObserver ref="editShopValidation">
      <BForm @submit.prevent="handleSubmit(onSubmit)">
        <BRow>
          <BCol cols="12" md="12" xl="6">
            <BCard>
              <BRow>
                <BCol class="d-flex justify-content-center mb-2">
                  <MainPhotoUpload :main_photo.sync="formData.main_photo" />
                </BCol>
              </BRow>
              <hr />
              <BRow class="d-flex mt-3 mb-3">
                <BCol class="d-flex justify-content-center">
                  <SecondPhotoMy :images.sync="formData.images" />
                </BCol>
              </BRow>
            </BCard>
          </BCol>
          <BCol cols="12" md="12" xl="6">
            <BCard>
              <BCol>
                <BRow class="d-flex align-items-start justify-content-center">
                  <BCol class="" cols="12" sm md="5" lg="5" xl="5">
                    <BFormGroup>
                      <label>{{ $t('shop_list.type_cashback') }}:</label>
                      <ValidationProvider
                        #default="{ errors }"
                        :name="$t('shop_list.type_cashback')"
                        rules="required"
                      >
                        <v-select
                          class="style-vselect"
                          v-model="formData.cash"
                          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                          :label="$i18n.locale"
                          :options="option"
                          :placeholder="$t('shop_list.type_cashback')"
                        />

                        <small class="text-danger">{{ errors[0] }}</small>
                      </ValidationProvider>
                    </BFormGroup>
                  </BCol>
                  <BCol cols="12" sm="8" md="5" lg="5" xl="5">
                    <BFormGroup>
                      <label>{{ $t('shop_list.koordinats') }}: </label>
                      <BFormInput
                        v-if="this.formData.location.lat != 0"
                        :value="
                          this.formData.location.lat.toFixed(4) +
                            '     |     ' +
                            this.formData.location.lng.toFixed(4)
                        "
                        readonly
                      />
                      <BFormInput
                        v-else
                        :value="$t('shop_list.location_not_specified')"
                        readonly
                      />
                    </BFormGroup>
                  </BCol>
                  <BCol
                    class="d-flex justify-content-end"
                    cols="4"
                    sm="4"
                    md="2"
                    lg="2"
                    xl="2"
                  >
                    <BFormGroup>
                      <label>{{ $t('shop_list.location') }}: </label><br />

                      <BButton
                        style="width: 70px"
                        @click="onOpenAddLocationModal"
                        variant="info"
                        ><feather-icon icon="MapPinIcon" size="16" />
                      </BButton>
                    </BFormGroup>
                  </BCol>
                </BRow>
                <BRow>
                  <BCol>
                    <BFormGroup>
                      <label>{{ $t('shop_list.shopname') }}:</label>
                      <ValidationProvider
                        #default="{ errors }"
                        :name="$t('shop_list.shopname')"
                        rules="required"
                      >
                        <BFormInput
                          size="lg"
                          :placeholder="$t('apartments.title')"
                          v-model="formData.title"
                        />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </ValidationProvider>
                    </BFormGroup>
                  </BCol>
                </BRow>
                <BRow>
                  <BCol cols="12" sm md lg xl>
                    <BFormGroup>
                      <label>{{ $t('shop_list.region') }}:</label>
                      <ValidationProvider
                        #default="{ errors }"
                        :name="$t('shop_list.region')"
                        rules="required"
                      >
                        <v-select
                          v-model="formData.region"
                          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                          :options="getRegion"
                          :reduce="getRegion => getRegion.id"
                          :getOptionLabel="
                            v => (v.name && v.name[$i18n.locale]) || ''
                          "
                          :placeholder="$t('shop_list.region')"
                          @input="fetchOneRegion"
                        />

                        <small class="text-danger">{{ errors[0] }}</small>
                      </ValidationProvider>
                    </BFormGroup>
                  </BCol>

                  <BCol cols="12" sm md lg xl>
                    <BFormGroup>
                      <label>{{ $t('shop_list.district') }}:</label>
                      <ValidationProvider
                        #default="{ errors }"
                        :name="$t('shop_list.district')"
                        rules="required"
                      >
                        <v-select
                          v-if="formData.region"
                          v-model="formData.district"
                          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                          :placeholder="$t('shop_list.district')"
                          :options="getDistrict"
                          :getOptionLabel="
                            v => (v.name && v.name[$i18n.locale]) || ''
                          "
                        />
                        <v-select
                          v-else
                          disabled
                          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                          :placeholder="$t('shop_list.district')"
                        />

                        <small class="text-danger">{{ errors[0] }}</small>
                      </ValidationProvider>
                    </BFormGroup>
                  </BCol>
                </BRow>
                <BRow class="mb-1">
                  <BCol>
                    <BFormGroup>
                      <label>{{ $t('shop_list.address') }}:</label>
                      <BTabs>
                        <ValidationProvider
                          #default="{ errors }"
                          :name="$t('shop_list.address')"
                          rules="required"
                        >
                          <BTab
                            :title="lang.toUpperCase()"
                            v-for="(lang, index) in getLangs"
                            :key="index"
                          >
                            <BFormTextarea
                              v-model="formData.address[lang]"
                              rows="3"
                            />
                          </BTab>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </ValidationProvider>
                      </BTabs>
                    </BFormGroup>
                  </BCol>
                </BRow>

                <BRow class="mb-1">
                  <BCol cols="12">
                    <BButton
                      @click="onOpenWorkingHoursModal"
                      variant="success"
                      class="mb-1"
                    >
                      {{ $t('shop_list.work_time') }}
                    </BButton>

                    <BTable
                      col
                      sm
                      md
                      lg
                      xl
                      responsive
                      v-if="formData.work_time.length == 7"
                      bordered
                      :fields="fields"
                      :items="getActiveWorkingDayList"
                      class="text-center"
                    >
                      <template #head()="data">
                        <span>{{ $t(data.label) }}</span>
                      </template>
                      <template #cell(title)="props">
                        {{ props.value[$i18n.locale] }}
                      </template>
                    </BTable>
                    <BTable
                      col
                      sm
                      md
                      lg
                      xl
                      responsive
                      v-else
                      bordered
                      :fields="fields"
                      :items="getActiveWorkingDayList"
                      class="text-center"
                    >
                      <template #head()="data">
                        <span>{{ $t(data.label) }}</span>
                      </template>
                      <template #cell(title)="props">
                        {{ props.value[$i18n.locale] }}
                      </template>
                    </BTable>
                  </BCol>
                </BRow>
                <BRow>
                  <BCol>
                    <BFormGroup>
                      <label>{{ $t('shop_list.phone_numbers') }}</label>
                      <ValidationProvider
                        #default="{ errors }"
                        :name="$t('shop_list.phone_numbers')"
                        rules="required"
                      >
                        <BFormTags
                          v-model="formData.phones.number"
                          :placeholder="$t('shop_list.phone_numbers')"
                          :tag-validator="tagValidator"
                          :addButtonText="$t('shop_list.add')"
                          addButtonVariant="outline-primary"
                          :invalidTagText="$t('shop_list.invalid_number')"
                        >
                        </BFormTags>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </ValidationProvider>
                      <template #description>
                        <div id="tags-validation-help">
                          {{ $t('shop_list.phones_description') }}
                        </div>
                      </template>
                    </BFormGroup>
                  </BCol>
                </BRow>
              </BCol>
            </BCard>
          </BCol>
        </BRow>
        <AddLocationModal
          :marker="formData.location"
          @submit="latlng => (formData.location = latlng)"
        />
        <div>
          <EditWorkingHours
            v-if="formData.work_time.length == 7"
            :week="formData.work_time"
            @workDays="setWorkTime"
          />
          <AddWorkingHours v-else @workDays="setWorkTime" />
        </div>
      </BForm>
      <BCard>
        <BRow>
          <BCol class="d-flex justify-content-end" col>
            <BButton
              variant="outline-danger"
              @click="redirectShoplist"
              class="d-flex align-items-center"
              >{{ $t('shop_list.cancel') }}
            </BButton>

            <BButton
              type="submit"
              variant="primary"
              class="ml-1 btn_hover"
              @click="onSubmit"
              >{{ $t('shop_list.save_changes') }}
            </BButton>
          </BCol>
        </BRow>
      </BCard>
    </ValidationObserver>
  </div>
</template>

<script>
  import { required } from '@validations'
  import MainPhotoUpload from './components/MainPhotoUpload.vue'
  import AddLocationModal from './components/AddLocationModal.vue'
  import EditWorkingHours from './components/EditWorkingHours.vue'
  import AddWorkingHours from './components/AddWorkingHours.vue'
  import SecondPhotoMy from './components/SecondPhotoMy.vue'
  import vSelect from 'vue-select'
  import { mapActions, mapGetters } from 'vuex'

  import {
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BButton,
    BForm,
    BFormTextarea,
    BFormTags,
    BInputGroup,
    BFormTag,
    BTable,
    BTab,
    BTabs,
    BImg,
  } from 'bootstrap-vue'
  import { title } from '@/@core/utils/filter'
  import { image } from 'vee-validate/dist/rules'

  export default {
    components: {
      BCard,
      BRow,
      BCol,
      BFormGroup,
      BFormInput,
      BFormSelect,
      BButton,
      BForm,
      BFormTextarea,
      BFormTags,
      BInputGroup,
      BFormTag,
      BTable,
      BTab,
      BTabs,
      BImg,
      EditWorkingHours,
      AddWorkingHours,
      vSelect,
      MainPhotoUpload,
      AddLocationModal,
      SecondPhotoMy,
    },
    data() {
      return {
        newTag: '',
        phonesVal: [],
        dirty: false,
        required,
        option: [
          { ru: 'С кешбэком', uz: 'Cashback bilan', value: true },
          { ru: 'Без кешбэка', uz: "Keshbek yo'q", value: false },
        ],
        fields: [
          {
            key: 'title',
            label: 'shop_list.day',
          },
          {
            key: 'start_time',
            label: 'shop_list.open_time',
          },
          {
            key: 'end_time',
            label: 'shop_list.close_time',
          },
        ],

        formData: {
          title: '',
          work_time: [],
          location: {
            lat: 0,
            lng: 0,
          },
          address: {},
          phones: [],
          region: null,
          district: null,
          cash: {},
          main_photo: null,
          images: [],
        },
      }
    },
    computed: {
      ...mapGetters('shopList', ['ONESHOP', 'SHOPREGION', 'ONESHOPREGION']),

      getLangs() {
        return ['ru', 'uz']
      },

      getActiveWorkingDayList() {
        return this.formData.work_time.filter(item => item.is_active)
      },
      getRegion() {
        return this.SHOPREGION.results
      },
      getDistrict() {
        return this.ONESHOPREGION.district
      },
    },

    mounted() {
      this.fetchOneShopList()
      // this.FETCH_ONE_SHOP_LIST_PHOTOS(this.$route.params.id).then(r => {
      //   this.formData.images = r.data
      // })
      this.FETCH_SHOP_REGION()
    },
    methods: {
      ...mapActions('shopList', [
        'EDIT_SHOP_LIST',
        'FETCH_ONE_SHOP_LIST',
        'FETCH_ONE_SHOP_LIST_PHOTOS',
        'ADD_images',
        'FETCH_SHOP_REGION',
        'FETCH_ONE_SHOP_REGION',
        'DELETE_SHOP_LIST',
      ]),

      setMainPhoto(v) {
        this.formData.main_photo = v
      },

      async redirectShoplist() {
        let success = await this.$refs.editShopValidation.validate()
        if (!success) return
        
        this.$router.push('/shoplist/')
      },

      tagValidator(tag) {
        // Individual tag validator function
        return Number(tag) && tag.length == 13
      },
      setWorkTime(workDays) {
        this.formData.work_time = JSON.parse(JSON.stringify(workDays))
      },

      async fetchOneRegion() {
        let id = this.formData.region
        await this.FETCH_ONE_SHOP_REGION(id).then(res => {
          let district = res.district
          this.formData.district = district.id
        })
      },

      async fetchOneShopList() {
        let id = this.$route.params.id
        await this.FETCH_ONE_SHOP_LIST(id).then(res => {
          let {
            title,
            work_time,
            location,
            address,
            phones,
            region,
            district,
            cash,
            main_photo,
            images,
          } = res

          this.formData = {
            title,
            work_time,
            location,
            address: address || {},
            phones,
            region: region && region.id,
            district,
            cash,
            main_photo,
            images,
          }
          this.FETCH_ONE_SHOP_REGION(this.formData.region)
        })
      },

      onOpenAddLocationModal() {
        console.log(this.SHOPREGION)
        this.$nextTick(() => {
          this.$bvModal.show('modal-addlocation')
        })
      },
      onOpenWorkingHoursModal() {
        this.$nextTick(() => {
          this.$bvModal.show('modal-workHours')
        })
      },

      async onSubmit() {
        let success = await this.$refs.editShopValidation.validate()
        if (!success) return

        let {
          title,
          main_photo,
          images,
          location,
          cash,
          region,
          district,
          address,
          work_time,
          phones,
        } = this.formData
        let req = new FormData()
        req.append('id', this.$route.params.id)
        if (typeof main_photo != 'string' && main_photo != null) {
          req.append('main_photo', main_photo)
        }
        if (images) {
        images.forEach(item => {
          if (item.binary) {
            req.append('images', item.binary)
          }
        })
        }
        req.append('cash', cash.value)
        req.append('title', title)
        req.append('address', JSON.stringify(address))
        req.append('region', region)
        req.append('district', district.id)
        req.append('location', JSON.stringify(location))
        req.append('work_time', JSON.stringify(work_time))
        req.append('phones', JSON.stringify(phones.number))

        this.$_UploadToast()

        this.EDIT_SHOP_LIST(req)
          .then(() => {
            this.$_okToast()
            this.$router.push('/shoplist/')
          })
          .catch(() => {
            this.$_errorToast()
          })
      },
    },
  }
</script>

<style scoped lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';

  #main_img {
    display: flex;
    height: 40vh;
  }
  .tableWorkingHours {
    border: solid #d8d6de 0.2px;
  }
  * ::placeholder {
    color: #c9c9d1;
  }
</style>
