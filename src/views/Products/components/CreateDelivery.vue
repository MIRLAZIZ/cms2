<template>
  <b-modal
    id="create-delivery-modal"
    cancel-variant="outline-secondary"
    centered
    no-close-on-backdrop
    :title="$t('general.add')"
    :ok-title="$t('general.save')"
    :cancel-title="$t('general.cancel')"
    @ok="onSubmit"
    @show="showModal"
  >
    <validation-observer ref="LeadRef">
      <b-form-radio-group
        v-model="is_province"
        :options="options"
        class="demo-inline-spacing mb-1"
        value-field="value"
        text-field="text"
      />

      <div v-if="is_province">
        <b-form-group label="Область">
          <validation-provider
            #default="{ errors }"
            name="Провинция"
            rules="required"
          >
            <v-select
              label="title"
              v-model="province"
              @input="selectProvince"
              :options="GET_PROVINCE.results"
              :get-option-label="el => el.title[$i18n.locale]"
              :reduce="i => i.id"
              class="bg-white "
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <b-form-group label="Регион">
          <validation-provider
            #default="{ errors }"
            name="Регион"
            rules="required"
          >
            <div class="d-flex justify-content-between">
              <v-select
                label="title"
                :disabled="province ? false : true"
                v-model="region"
                :options="GET_REGION.results"
                :get-option-label="el => el.title[$i18n.locale]"
                :reduce="i => i.id"
                class="bg-white flex-grow-1"
              />
              <b-button class="ml-1 btn-sm" variant="success">
                <feather-icon icon="PlusIcon" />
              </b-button>
            </div>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <b-form-group label="Сумм за  км ">
          <validation-provider
            #default="{ errors }"
            name="Сумм за  км "
            rules="required"
          >
            <div class="d-flex justify-content-between align-items-center">
              <b-form-input v-model="price" :disabled="is_free" />
              <b-form-checkbox
                v-model="is_free"
                class="custom-control-primary ml-1 "
                name="check-button"
                switch
              />
            </div>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </div>

      <div v-else>
        <b-form-group label="Сумм за  км ">
          <div class="d-flex justify-content-between align-items-center">
            <b-form-input v-model="price" :disabled="is_free" />
            <b-form-checkbox
              v-model="is_free"
              class="custom-control-primary ml-1 "
              name="check-button"
              switch
            />
          </div>
        </b-form-group>
      </div>
    </validation-observer>
  </b-modal>
</template>

<script>
  import { ValidationProvider, ValidationObserver } from 'vee-validate'
  import { FormWizard, TabContent } from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import { mapActions, mapGetters } from 'vuex'

  import {
    BFormGroup,
    BButton,
    BModal,
    BTabs,
    BTab,
    BFormCheckbox,
    BFormRadioGroup,
    BFormInput,
  } from 'bootstrap-vue'
  import vSelect from 'vue-select'

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
      BFormGroup,
      BFormCheckbox,
      BFormInput,
      BButton,
      BFormRadioGroup,
      BTabs,
      FormWizard,
      TabContent,

      BTab,
      BModal,
      vSelect,
    },

    data() {
      return {
        is_free: false,
        is_province: true,
        region: '',
        province: '',
        price: '',
        options: [
          { text: 'Область ', value: true },
          { text: 'Весь Узбекистан', value: false },
        ],
      }
    },
    props: {
      product: {
        type: [Number, String],
        required: true,
      },
      editData: {
        type: Object,
        required: false,
      },
      isEdit: {
        type: Boolean,
        required: true,
      },
    },
    mounted() {
      this.FETCH_PROVINCE()
    },

    computed: {
      ...mapGetters('knowledgeBase', ['GET_PROVINCE', 'GET_REGION']),
    },

    methods: {
      ...mapActions('products', [
        'CREATE_TEMP_DELIVERY_INFO',
        'FETCH_TEMP_DELIVERY_INFO',
        'UPDATE_TEMP_DELIVERY_INFO',
      ]),

      ...mapActions('knowledgeBase', ['FETCH_PROVINCE', 'FETCH_REGION']),

      showModal() {
        if (this.isEdit) {
          const { province, region, is_province, price } = this.editData

          this.province = province
          this.region = region
          this.is_province = is_province
          this.price = price
        } else {
          this.province = ''
          this.region = ''
          this.is_province = true
          this.price = ''
          this.is_free = false
        }
      },

      async onSubmit(evt) {
        evt.preventDefault()

        this.$refs.LeadRef.validate().then(async success => {
          if (!success) {
            return
          }

          let exportData = {
            is_province: this.is_province,
            region: this.region,
            province: this.province,
            product: this.product,
            price: this.price,
          }

          if (!this.is_province) {
            exportData.region = null
            exportData.province = null
          }

          if (this.isEdit) {
            exportData.id = this.editData.id
          }

          let action = this.isEdit
            ? this.UPDATE_TEMP_DELIVERY_INFO
            : this.CREATE_TEMP_DELIVERY_INFO

          try {
            await action(exportData)
            this.FETCH_TEMP_DELIVERY_INFO({
              product: this.product,
            })
            this.$nextTick(() => {
              this.$_successToast('success')
              this.$bvModal.hide('create-delivery-modal')
            })
          } catch (err) {
            console.log(err)
            this.$_errorToast(this.$t('error'))
          }
        })
      },

      selectProvince(value) {
        this.region = ''
        if (value) {
          this.FETCH_REGION({
            province: value,
          })
        }
      },
    },

    watch: {
      is_free() {
        this.price = ''
      },
    },
  }
</script>
