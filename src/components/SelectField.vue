<template>
  <b-form-group>
    <validation-provider
      #default="{ errors }"
      :rules="requireField"
      :name="name"
    >
      <label for="example-datepicker">{{ label }}</label>

      <v-select
        :value="fieldModel"
        @input="$emit('update:fieldModel', $event)"
        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
        :options="options"
        :label="selectLabel"
        :get-option-label="getOptionalLabel"
        :reduce="reduce"
        :disabled="isDisabled"
      />
      <small class="text-danger">{{ errors[0] }}</small>
    </validation-provider>
  </b-form-group>
</template>
<script>
  import { BFormGroup, BFormInput } from 'bootstrap-vue'
  import { ValidationProvider } from 'vee-validate'
  import vSelect from 'vue-select'

  export default {
    components: {
      BFormGroup,
      BFormInput,
      ValidationProvider,
      vSelect,
    },
    props: {
      fieldModel: {
        type: [String, Number, Boolean, null],
        // required: true,
      },

      options: {
        type: Array,
        required: true,
      },

      label: {
        type: String,
        required: true,
      },

      selectLabel: {
        type: String,
        required: true,
      },

      name: {
        type: String,
        default: 'selectField',
      },

      requireField: {
        type: String,
        default: 'required',
      },

      getOptionalLabel: {
        type: Function,
        required: false,
      },

      reduce: {
        type: Function,
        required: false,
      },

      isDisabled: {
        type: Boolean,
        required: false,
      },
    },

    methods: {
      myChange() {
        console.log('MY Change')
      },
    },
  }
</script>

<style scoped lang="scss">


</style>
