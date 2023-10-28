<template>
  <b-modal
    id="modal-product-chr"
    title="Добавление подкатегории"
    cancel-variant="outline-secondary"
    cancel-title="Отменить"
    ok-title="Сохранить"
    ok-variant="success"
    centered
  >
    <b-tabs>
      <b-tab title="RU">
        <label>Наименование характеристики ru:</label>
        <b-form-input />

        <label>Детали характеристики ru:</label>
        <b-form-input />
      </b-tab>

      <b-tab title="UZ">
        <label>Наименование характеристики uz:</label>
        <b-form-input />

        <label>Детали характеристики uz:</label>
        <b-form-input />
      </b-tab>

      <b-tab title="O`Z">
        <label>Наименование характеристики o'z:</label>
        <b-form-input />

        <label>Детали характеристики o'z:</label>
        <b-form-input />
      </b-tab>
    </b-tabs>

    <label>Категория продуктов:</label>
    <v-select
      label="title"
      :options="[]"
    />

    <b-form
      class="mt-1"
      @submit.prevent="repeateAgain"
    >
      <label>Опции характеристики:</label>
      <div
        v-for="(item,index) in items"
        :id="item.id"
        :key="item.id"
      >

        <div class="d-flex align-items-center mb-50">
          <b-form-input />

          <b-button
            class="ml-50"
            size="sm"
            variant="danger"
            @click="removeItem(index)"
          >
            <feather-icon
              icon="XIcon"
            />
          </b-button>
        </div>
      </div>

      <b-button
        size="sm"
        variant="success"
        class="float-right mt-50"
        @click="repeateAgain"
      >
        <feather-icon
          icon="PlusIcon"
          class="mr-25"
        />
      </b-button>
    </b-form>

  </b-modal>
</template>

<script>
  import {
    BModal,
    VBModal,
    BFormInput,
    BTabs,
    BTab,
    BButton,
    BForm,
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
      BButton,
      BForm,
    },
    data() {
      return {
        items: [],
      }
    },
    methods: {
      repeateAgain() {
        this.items.push([])
      },

      removeItem(index) {
        this.items.splice(index, 1)
      },
    },
  }
</script>
