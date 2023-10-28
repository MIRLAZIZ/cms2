<template>
  <b-modal
    id="add-card-modal"
    :title="$t('general.add')"
    size="lg"
    :ok-title="$t('save')"
    :cancel-title="$t('cancel')"
    cancel-variant="danger"
    ok-variant="success"
    no-close-on-backdrop
    centered
    @ok="onSubmit"
  >
    <b-row>
      <b-col cols="12">
        <b-form-group :label="$t('credit_card.number')">
          <b-form-input v-model="client.first_name" />
        </b-form-group>
      </b-col>
    </b-row>
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
        this.$_successToast('Success')

        this.$nextTick(() => {
          this.$bvModal.hide('edit-modal')
          this.clear()
        })
      } catch (err) {
        this.$_errorToast('Error')
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
