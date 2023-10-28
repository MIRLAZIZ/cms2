<template>
  <b-modal
    id="modal-product-category"
    title="Добавление категории"
    cancel-variant="outline-secondary"
    cancel-title="Отменить"
    ok-title="Сохранить"
    ok-variant="success"
    centered
  >
    <b-tabs>
      <b-tab title="RU">
        <label>Группа продуктов ru:</label>
        <b-form-input />

        <label>Наименование категории ru:</label>
        <b-form-input />
      </b-tab>

      <b-tab title="UZ">
        <label>Группа продуктов uz:</label>
        <b-form-input />

        <label>Наименование категории uz:</label>
        <b-form-input />
      </b-tab>

      <b-tab title="O`Z">
        <label>Группа продуктов o'z:</label>
        <b-form-input />

        <label>Наименование категории o'z:</label>
        <b-form-input />
      </b-tab>
    </b-tabs>

    <div class="mt-2">
      <label>Фотография категории:</label>
      <b-form-file
        placeholder="Загрузить файл"
        browse-text="Загрузить"
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
    BFormFile,
  } from 'bootstrap-vue'
  import Ripple from 'vue-ripple-directive'

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
      BFormFile,
    },
  }
</script>

<style scoped>

</style>
