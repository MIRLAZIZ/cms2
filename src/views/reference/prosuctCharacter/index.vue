<template>
  <div>
    <filters
      @buttonAction="openModal"
      @setFilterData="setFilterData"
    />

    <Tables
      :fields="fields"
      :data="data"
      @editAction="editData"
      @deleteAction="deleteData"
    />

    <Paginations />

    <addEditModal />
  </div>
</template>

<script>
  import filters from '@/views/reference/components/Filter'
  import Tables from '@/views/reference/components/Table'
  import Paginations from '@/views/reference/components/Pagination'
  import addEditModal from './addEditModal'

  export default {
    components: {
      filters,
      Tables,
      Paginations,

      addEditModal,
    },
    data() {
      return {
        fields: [
          {
            key: 'id',
            label: '№',
            thClass: 'tableHeadClass',
          },
          {
            label: 'Наименование характеристки',
            key: 'category',
            thClass: 'tableHeadClass',
          },
          {
            label: 'Детали характеристики',
            key: 'dt',
            thClass: 'tableHeadClass',
          },
          {
            label: 'Опции характеристики',
            key: 'chr',
            thClass: 'tableHeadClass',
          },
          {
            label: 'Категория',
            key: 'ct',
            thClass: 'tableHeadClass',
          },
          {
            label: 'Действия',
            key: 'actions',
            thClass: 'tableHeadClass',
          },
        ],
        data: [
          {
            id: 1,
            category: 'Общие характеристики смартфона',
            dt: 'Версия ОС',
            chr: 'Android 10.0',
            ct: 'Смартфоны и телефоны',
          },
        ],
      }
    },
    methods: {
      openModal() {
        this.$bvModal.show('modal-product-chr')
      },

      setFilterData() {

      },

      editData(data) {
        this.$bvModal.show('modal-product-chr')
      },

      deleteData(id) {
        this.$_showAreYouSureModal()
          .then(val => {
            if (val) {
              alert(id)
            }
          })
      },
    },
  }
</script>
