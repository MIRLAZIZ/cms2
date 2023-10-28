<template>
  <b-modal
    id="modal-product-group"
    title="Добавление группы"
    cancel-variant="outline-secondary"
    cancel-title="Отменить"
    ok-title="Сохранить"
    ok-variant="success"
    centered
  >

    <b-tabs>
      <b-tab title="RU">
        <label>Наименование группы ru:</label>
        <b-form-input

        />
      </b-tab>

      <b-tab title="UZ">
        <label>Наименование группы uz:</label>
        <b-form-input

        />
      </b-tab>

      <b-tab title="O`Z">
        <label>Наименование группы o'z:</label>
        <b-form-input

        />
      </b-tab>
    </b-tabs>

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
    },
  }
</script>

<style scoped>

</style>
