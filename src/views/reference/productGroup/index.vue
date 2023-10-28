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
            group: 'Смартфоны, телефоны, гаджеты, аксессуары',
          },
        ],
      }
    },

    methods: {
      openModal() {
        this.$bvModal.show('modal-product-group')
      },

      editData(data) {
        this.$bvModal.show('modal-product-group')
        console.log(data.item)
      },

      setFilterData() {

      },

      deleteData(id) {
        this.$_showAreYouSureModal()
          .then(value => {
            if (value) {
              alert(id)
            }
          })
      },
    },
  }
</script>

<style scoped>

</style>
