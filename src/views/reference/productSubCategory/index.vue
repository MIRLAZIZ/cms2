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
            label: 'Подкатегория',
            key: 'sub',
            thClass: 'tableHeadClass',
          },
          {
            label: 'Категория',
            key: 'cat',
            thClass: 'tableHeadClass',
          },
          {
            label: 'Группа',
            key: 'gr',
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
            sub: 'Apple',
            cat: 'Смартфоны и телефоны',
            gr: 'Смартфоны, телефоны, гаджеты, аксессуары',
          },
        ],
      }
    },
    methods: {
      openModal() {
        this.$bvModal.show('modal-product-sub')
      },

      setFilterData() {

      },

      editData(data) {
        this.$bvModal.show('modal-product-sub')
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

<style scoped>

</style>
