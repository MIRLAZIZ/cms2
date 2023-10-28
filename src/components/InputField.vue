<template>
  <b-form-group :label-for="name">
    <validation-provider
      #default="{ errors }"
      :name="name"
      :rules="requireField"
    >
      <label for="example-datepicker">{{ label }}:</label>
      <b-form-input
        :value="fieldModel"
        @input="$emit('update:fieldModel', $event)"
        :id="name"
        :name="name"
        :type="type"
      />
      <small class="text-danger">{{ errors[0] }}</small>
    </validation-provider>
  </b-form-group>
</template>

<script>
  import { BFormGroup, BFormInput } from 'bootstrap-vue'
  import { ValidationProvider } from 'vee-validate'

  export default {
    components: {
      BFormGroup,
      BFormInput,
      ValidationProvider,
    },
    props: {
      label: {
        type: String,
        required: true,
      },

      fieldModel: {
        type: [String, Number, Boolean],
      },

      name: {
        type: String,
        default: 'field',
      },

      requireField: {
        type: String,
        default: 'required',
      },

      type: {
        type: String,
        default: 'text',
      },
    },
  }
</script>
