<template>
  <div>
    <b-card class="card__tabs">
      <b-tabs
        pills
        vertical
        nav-wrapper-class="nav-vertical"
      >
        <b-tab
          active
          title="Группа продуктов"
          lazy
        >
          <ProductGroup />
        </b-tab>

        <b-tab
          title="Категория продуктов"
          lazy
        >
          <ProductCategory />
        </b-tab>

        <b-tab
          title="Подкатегория продуктов"
          lazy
        >
          <ProductSubCategory />
        </b-tab>

        <b-tab
          title="Характеристика продуктов"
          lazy
        >
          <ProsuctCharacter />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
  import {
    BTabs,
    BTab,
    BCardText,
    BCard,
  } from 'bootstrap-vue'
  import ProductGroup from '@/views/reference/productGroup'
  import ProductCategory from '@/views/reference/productCategory/productCategory'
  import ProductSubCategory from '@/views/reference/productSubCategory'
  import ProsuctCharacter from '@/views/reference/prosuctCharacter'

  export default {
    data() {
      return {}
    },
    components: {
      BTabs,
      BTab,
      BCardText,
      BCard,
      ProductGroup,
      ProductCategory,
      ProductSubCategory,
      ProsuctCharacter,
    },
  }
</script>

<style>
  .card__tabs .nav-pills .nav-link, .nav-tabs .nav-link {
    display: flex;
    align-items: center;
    justify-content: start !important;
  }
</style>
