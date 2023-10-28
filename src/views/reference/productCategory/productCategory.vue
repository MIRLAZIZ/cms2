<template>
  <div>
    <filters
      @buttonAction="openModal"
      @setFilterData="setFilterData"
    />

    <Tables
      :img="true"
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
            key: 'category',
            label: 'Категория',
            thClass: 'tableHeadClass',
          },
          {
            key: 'imgK',
            label: 'Фотография',
            thClass: 'tableHeadClass',
          },
          {
            key: 'group',
            label: 'Группа',
            thClass: 'tableHeadClass',
          },
          {
            key: 'actions',
            label: 'Действия',
            thClass: 'tableHeadClass',
          },
        ],
        data: [
          {
            id: 1,
            category: 'Смартфоны и телефоны',
            imgK: 'https://picsum.photos/200',
            group: 'Смартфоны, телефоны, гаджеты, аксессуары',
          },
          {
            id: 2,
            category: 'Смартфоны и телефоны',
            imgK: 'https://picsum.photos/200',
            group: 'Смартфоны, телефоны, гаджеты, аксессуары',
          },
          {
            id: 3,
            category: 'Смартфоны и телефоны',
            imgK: 'https://picsum.photos/200',
            group: 'Смартфоны, телефоны, гаджеты, аксессуары',
          },
        ],
      }
    },
    methods: {
      openModal() {
        this.$bvModal.show('modal-product-category')
      },

      setFilterData() {

      },

      editData(data) {
        this.$bvModal.show('modal-product-category')
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
