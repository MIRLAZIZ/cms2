<template>
  <b-row class="d-flex align-items-end">
    <b-col md="2">
      <b-form-group>
        <label>
          {{ $t('generals.search') }}...
        </label>

        <b-form-input
          v-model="filterData.search"
          :placeholder="$t('generals.search')"
          class="d-inline-block mb-0"
          type="search"
          @input="setFilterData"
        />
      </b-form-group>
    </b-col>

    <b-col md="2" class="text-right ml-auto mb-1">
      <b-button
        variant="success"
        @click="$emit('buttonAction')"
      >
        <feather-icon
          icon="PlusIcon"
        />
        <span class="ml-50">
          {{ $t('generals.add') }}
        </span>
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
  import {
    BFormGroup,
    BFormInput,
    BButton,
    BRow,
    BCol,
  } from 'bootstrap-vue'
  import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
  import VSelect from 'vue-select'

  export default {
    components: {
      BFormGroup,
      BFormInput,
      BButton,
      FeatherIcon,
      BRow,
      BCol,
      VSelect,
    },
    data() {
      return {
        filterData: {
          search: '',
        },
      }
    },
    methods: {
      setFilterData() {
        this.$emit('setFilterData', this.filterData)
      },
    },
    mounted() {
    },
  }
</script>

<style lang="scss">
  @import "@core/scss/vue/libs/vue-select.scss";
</style>
