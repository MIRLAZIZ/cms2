<template>
  <b-modal
    id="edit-client-modal"
    :title="$t('administration.edit')"
    size="lg"
    :ok-title="$t('save')"
    :cancel-title="$t('cancel')"
    cancel-variant="danger"
    ok-variant="success"
    no-close-on-backdrop
    centered
    @show="onShow"
    @ok="onSubmit"
  >
    <b-row>
      <b-col cols="6">
        <b-col cols="12">
          <b-form-group :label="$t('general.name')">
            <b-form-input v-model="client.first_name" />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group :label="$t('general.surname')">
            <b-form-input v-model="client.last_name" />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group :label="$t('general.patronymic')">
            <b-form-input v-model="client.middle_name" />
          </b-form-group>
        </b-col>
      </b-col>

      <b-col cols="6" class="m-auto">
        <b-col cols="12" class="mb-3">
          <b-form-checkbox
            name="check-button"
            switch
            checked="true"
            inline
            v-model="client.gender"
            v-if="client.gender"
          >
            {{ $t('task_manager.active') }}
          </b-form-checkbox>
          <b-form-checkbox
            v-model="client.gender"
            name="check-button"
            switch
            v-else
            inline
          >
            {{ $t('task_manager.not_active') }}
          </b-form-checkbox>
        </b-col>
        <b-col cols="12">
          <datepicker
            id="to_data"
            :placeholder="$t('client_list.birth_day')"
            v-model="client.birth_day"
            :bootstrap-styling="true"
            :clear-button="true"
            :language="ru"
            :calendar-button="true"
            format="dd.MM.yyyy"
            calendar-button-icon="fa fa-calendar"
            clear-button-icon="fa fa-times"
            input-class="bg-white"
          />
        </b-col>
      </b-col>
    </b-row>
    <!-- <b-row>
      <b-col cols="12">
        <b-form-group :label="$t('name_product')">
          <b-form-input v-model="product.title" />
        </b-form-group>
      </b-col>

      <b-col cols="10">
        <b-form-group :label="$t('cost')">
          <b-form-input v-model="product.price" />
        </b-form-group>
      </b-col>

      <b-col cols="2">
        <b-form-group :label="$t('status')">
          <b-form-checkbox switch v-model="product.is_active"></b-form-checkbox>
        </b-form-group>
      </b-col>

      <b-col cols="12">
        <b-form-group :label="$t('description')">
          <b-form-textarea v-model="product.description" />
        </b-form-group>
      </b-col>
    </b-row> -->
  </b-modal>
</template>

<script>
import {
  BModal,
  BFormInput,
  BFormTextarea,
  BFormGroup,
  BFormCheckbox,
  BRow,
  BCol,
} from 'bootstrap-vue'
import Datepicker from 'vuejs-datepicker'
import { mapActions } from 'vuex'

export default {
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      loading: false,
      client: {
        first_name: '',
        last_name: '',
        middle_name: '',
        gender: false,
        birth_day: '',
      },
    }
  },
  methods: {
    onShow() {
      this.client = JSON.parse(JSON.stringify(this.item))
      console.log(this.item)
    },

    async onSubmit(bvModalEvt) {
      bvModalEvt.preventDefault()

      // this.$refs.newUserValidation.validate().then(async success => {
      //   if (!success) {
      //     return
      //   }
      try {
        // await this.UPDATE_PRODUCT({
        //   data: this.product,
        //   id: this.item.id,
        // })
        this.$_successToast(this.$t('general.success'))

        this.$nextTick(() => {
          this.$bvModal.hide('edit-modal')
          this.clear()
        })
      } catch (err) {
        this.$_errorToast(this.$t('general.error'))
      }
    },
    clear() {
      this.product = {
        title: '',
        price: 0,
        is_active: false,
      }
    },
  },
  components: {
    BRow,
    BCol,
    BModal,
    BFormInput,
    BFormTextarea,
    BFormGroup,
    BFormCheckbox,
    Datepicker,
  },
}
</script>

<style>
.editor .ql-editor.ql-blank {
  min-height: 260px !important;
}
.editor .ql-editor {
  min-height: 260px !important;
}
</style>
