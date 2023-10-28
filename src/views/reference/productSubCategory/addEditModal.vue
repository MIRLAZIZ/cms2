<template>
  <b-modal
    id="modal-product-sub"
    title="Добавление подкатегории"
    cancel-variant="outline-secondary"
    cancel-title="Отменить"
    ok-title="Сохранить"
    ok-variant="success"
    centered
  >

    <b-tabs>
      <b-tab title="RU">
        <label>Наименование подкатегории ru:</label>
        <b-form-input

        />
      </b-tab>

      <b-tab title="UZ">
        <label>Наименование подкатегории: uz:</label>
        <b-form-input

        />
      </b-tab>

      <b-tab title="O`Z">
        <label>Наименование подкатегории: o'z:</label>
        <b-form-input

        />
      </b-tab>
    </b-tabs>

    <div>
      <label>Группа продуктов:</label>
      <v-select
        label="title"
        :options="[]"
      />
    </div>

    <div>
      <label>Категория продуктов:</label>
      <v-select
        label="title"
        :options="[]"
      />
    </div>

  </b-modal>
</template>

<script>
  import {
    BModal,
    VBModal,
    BFormInput,
    BTabs,
    BTab,
  } from 'bootstrap-vue'
  import Ripple from 'vue-ripple-directive'
  import vSelect from 'vue-select'

  export default {
    directives: {
      'b-modal': VBModal,
      Ripple,
    },
    components: {
      BFormInput,
      BModal,
      BTabs,
      BTab,
      vSelect,
    },
  }
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
