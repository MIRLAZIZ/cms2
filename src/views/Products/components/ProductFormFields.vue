<template>
  <div>
    <b-row>
      <b-col md="6">
        <InputField
          :fieldModel.sync="productData.title.uz"
          label="Наименование товара"
          name="name"
        />
      </b-col>
      <b-col md="6">
        <SelectField
          :fieldModel.sync="productData.brands"
          :options="GET_BRANDS.results"
          label="Бренд"
          name="brand"
          selectLabel="title"
          :getOptionalLabel="el => el.title[$i18n.locale]"
          :reduce="item => item.id"
        />
      </b-col>
      <b-col md="6">
        <div class="d-flex justify-content-between">
          <div class="flex-grow-1">
            <InputField
              :fieldModel.sync="productData.price"
              label="Цена товара"
              name="price"
              type="number"
            />
          </div>

          <div class="ml-1">
            <label for="example-datepicker">НДС</label>
            <BFormCheckbox
              v-model="productData.qqs"
              class="custom-control-primary"
              name="check-button"
              switch
            />
          </div>
        </div>
      </b-col>
      <b-col md="6">
        <div class="d-flex justify-content-between">
          <div class="flex-grow-1">
            <InputField
              :fieldModel.sync="productData.price_old"
              label="Старая цена товара"
              type="number"
              name="price_old"
            />
          </div>

          <div class="ml-1">
            <label for="example-datepicker">Скидка:</label>
            <BFormCheckbox
              class="custom-control-primary"
              name="check-button"
              switch
            />
          </div>
        </div>
      </b-col>

      <b-col md="6">
        <SelectField
          :fieldModel.sync="productData.category"
          :options="GET_CATEGORIES.results"
          label="Категория"
          name="category"
          selectLabel="title"
          :getOptionalLabel="el => el.title[$i18n.locale]"
          :reduce="item => item.id"
        />
      </b-col>
      <b-col md="6">
        <SelectField
          :fieldModel.sync="productData.status"
          :options="statusOptions"
          label="Статус продукта"
          selectLabel="title"
          name="istatus"
          :getOptionalLabel="el => el.title[$i18n.locale]"
          :reduce="item => item.value"
        />
      </b-col>
      <b-col md="6">
        <SelectField
          :fieldModel.sync="productData.product_type"
          :options="GET_PRODUCT_TYPE.results"
          label="Тип товара"
          name="product_type"
          selectLabel="title"
          :getOptionalLabel="el => el.title[$i18n.locale]"
          :reduce="item => item.id"
        />
      </b-col>
      <b-col md="6">
        <!-- {{GET_CHARACTER_CATEGORY}} -->
        <SelectField
          :fieldModel.sync="productData.character_category"
          :options="GET_CHARACTER_CATEGORY.results"
          label="Характеристика товара"
          selectLabel="title"
          name="characteristics"
          :requireField="''"
          :getOptionalLabel="el => el.title[$i18n.locale]"
          :reduce="item => item.id"
          :isDisabled="!productData.product_type"
        />
      </b-col>
      <b-col md="12">
        <label for="textarea-default"
          >Описание продукта (коротко о товаре)</label
        >
        <BFormTextarea
          v-model="productData.product_description.uz"
          id="textarea-default"
          placeholder="Textarea"
          rows="4"
          no-resize
        />
      </b-col>
    </b-row>
    <div
      md="12"
      v-for="(item, index) of productData.characters"
      :key="index"
      class="mt-2"
    >
      <b-row
        v-for="key in item.filter(
          i => i.character_category == productData.character_category,
        )"
        :key="key.id"
      >
        <b-col md="6">
          <InputField
            :name="$t(key.title[$i18n.locale])"
            :fieldModel.sync="key.value"
            :label="$t(key.title[$i18n.locale])"
            :requireField="''"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { BRow, BCol, BFormTextarea, BFormCheckbox } from 'bootstrap-vue'
import InputField from '@/components/InputField.vue'
import SelectField from '@/components/SelectField.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { mapGetters } from 'vuex'

export default {
  components: {
    BRow,
    BFormTextarea,
    BFormCheckbox,
    BCol,
    ValidationProvider,
    ValidationObserver,
    InputField,
    SelectField,
  },
  props: {
    productData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      statusOptions: [
        {
          value: true,
          title: { ru: 'Активный ', uz: 'Aktiv' },
        },
        {
          value: false,
          title: { ru: 'Не активный  ', uz: 'Aktiv emas' },
        },
      ],
    }
  },

  computed: {
    ...mapGetters('knowledgeBase', [
      'GET_BRANDS',
      'GET_CATEGORIES',
      'GET_PRODUCT_TYPE',
      'GET_CHARACTERS',
      'GET_PRODUCT_TYPE',
      'GET_CHARACTER_CATEGORY',
    ]),
  },
}
</script>

<style></style>
