<template>
  <div>
    <b-card class="py-1">
      <b-row>
        <b-col sm="6">
          <b-input-group>
            <b-input-group-prepend is-text>
              <feather-icon icon="SearchIcon" />
            </b-input-group-prepend>
            <b-form-input
              :placeholder="$t('products_list.search')"
            />
          </b-input-group>
        </b-col>
        <b-col sm="6" class=" d-flex justify-content-end align-items-center">
          <b-button variant="success" @click="$routr.push('/create')">
            <feather-icon icon="PlusIcon" /> {{ $t('general.add') }}
          </b-button>fsdfas
        </b-col>
      </b-row>
    </b-card>
    <b-card>
      <TableList :fields="fields" />
    </b-card>
  </div>
</template>
<script>
  import {
    BCard,
    BRow,
    BCol,
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,
    BFormGroup,
    BButton,
  } from 'bootstrap-vue'
  import TableList from './components/TableList.vue'
  export default {
    components: {
      BCard,
      BRow,
      BCol,
      BInputGroup,
      BInputGroupPrepend,
      BFormInput,
      BFormGroup,
      BButton,
      TableList,
    },
    data() {
      return {
        fields: [
          {
            key: 'image',
            label: this.$t('photo'),
            width: '40px',
            thClass: 'text-center',
            tdClass: 'text-center px-0',
          },
          {
            key: 'category',
            label: this.$t('category'),
            width: '200px',
            thClass: 'text-center',
            tdClass: 'text-left',
          },
          {
            key: 'lang',
            label: 'Язык',
            width: '200px',
            thClass: 'text-center',
            tdClass: 'text-center',
          },
          {
            key: 'created_date',
            label: 'Время',
            width: '200px',
            thClass: 'text-center',
            tdClass: 'text-right',
          },
          {
            key: 'is_banner',
            label: 'Тип',
            width: '200px',
            thClass: 'text-center',
            tdClass: 'text-center',
          },
          {
            key: 'is_active',
            label: 'Статус',
            width: '200px',
            thClass: 'text-center',
            tdClass: 'text-center',
          },
          {
            key: 'actions',
            label: 'Действия',
            width: '200px',
          },
        ],
      }
    },
    methods: {},
  }
</script>
<style></style>
