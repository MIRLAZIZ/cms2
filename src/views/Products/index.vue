<template>
  <div>
    <b-card>
      <b-row>
        <b-col lg="3" md="4">
          <b-form-group>
          <AppSearchInput class="mt-2" @callback="searchUser" :label="$t('products_list.search')" />
        </b-form-group>
        </b-col>
        <b-col lg="3" md="4">
          <SelectField
            :fieldModel.sync="params.category"
            :options="GET_CATEGORIES.results"
            :label="$t('products_list.category')"
            name="category"
            selectLabel="title"
            :getOptionalLabel="getOptionalLabel"
            :reduce="item => item.id"
            :requireField="''"
            :placeholder="$t('products_list.category')"
          />
        </b-col>

        <b-col lg="3" md="4">
          <SelectField
            :fieldModel.sync="params.status"
            :options="statusOptions"
            :label="$t('products_list.status')"
            name="status"
            :selectLabel="$i18n.locale"
            :reduce="app => app.value"
            :requireField="''"
            :placeholder="$t('products_list.status')"
          />
        </b-col>
        <BCol lg="3">
          <BRow>
        <b-col>
          <BButton
            variant="outline-primary"
            class="d-flex align-items-center justify-content-center form-control mt-2 p-50"
            @click="refresh"
            >{{ $t('products_list.apply') }}
          </BButton>
        </b-col>
        <b-col>
          <BButton
            variant="outline-danger"
            class="d-flex align-items-center justify-content-center form-control mt-2 p-50"
            @click="handleEmpty"
            >{{ $t('products_list.reset') }}
          </BButton>
        </b-col>
          </BRow>
        </BCol>
      </b-row>
    </b-card>
    <b-card>
      <div class="d-flex justify-content-end">
        <b-button variant="primary" class="mb-1" @click="routeToCreateProduct">
          <feather-icon icon="PlusIcon" />
          {{ $t('general.add') }}
        </b-button>
      </div>
      <Table :fields="fields" @delete-product="deleteProduct" />

      <Pagination
        :users_count="GET_PRODUCTS.count"
        @changePaginationValue="changePaginationValue"
      />
    </b-card>
  </div>
</template>

<script>
  import { BButton, BCard, BRow, BCol } from 'bootstrap-vue'
  import AppSearchInput from '@/components/AppSearchInput.vue'
  import SelectField from '@/components/SelectField.vue'
  import Pagination from '@/components/Pagination.vue'
  import { mapActions, mapGetters } from 'vuex'
  import Table from './components/ProductsTable.vue'

  export default {
    components: {
      BButton,
      BCard,
      BRow,
      BCol,
      Table,
      AppSearchInput,
      Pagination,
      SelectField,
    },
    data() {
      return {
        params: {
          category: '',
          status: '',
          search: '',
          page: 1,
          page_size: 10,
        },

        statusOptions: [
          { ru: 'Активный', uz: 'Faol', value: true },
          { ru: 'Не активный', uz: "Faol emas", value: false },
        ],

        fields: [
          {
            key: 'id',
            label: 'ID',
            tdClass: 'text-center align-middle',
            thClass: 'text-center align-middle',
          },
          {
            key: 'title',
            label: 'products_list.product',
            thClass: 'text-center align-middle',
          },
          {
            key: 'category',
            label: 'products_list.category',
            tdClass: 'text-center align-middle',
            thClass: 'text-center align-middle',
          },
          {
            key: 'status',
            label: 'products_list.status',
            thClass: 'text-center align-middle',
            tdClass: 'text-center align-middle',
          },

          {
            key: 'actions',
            label: 'actions',
            tdClass: 'text-center align-middle',
            thClass: 'text-center align-middle',
          },
        ],
      }
    },

    computed: {
      ...mapGetters('products', ['GET_PRODUCTS']),
      ...mapGetters('knowledgeBase', ['GET_CATEGORIES']),
    },

    mounted() {
      this.refresh()
      this.FETCH_CATEGORIES()
    },

    methods: {
      ...mapActions('products', ['FETCH_PRODUCTS', 'DELETE_PRODUCT']),
      ...mapActions('knowledgeBase', ['FETCH_CATEGORIES']),

      refresh() {
        this.FETCH_PRODUCTS(this.params)
      },

      getOptionalLabel(el) {
        if (el.title) {
          return el.title[this.$i18n.locale]
        }
      },

      async deleteProduct(id) {
        try {
          const response = await this.$_showAreYouSureModal()

          if (response) {
            if (this.GET_PRODUCTS.results.length === 1) {
              if (this.params.page > 1) --this.params.page
            }
            await this.DELETE_PRODUCT(id)
            await this.refresh()
            this.$_successToast(this.$t('success'))
          }
        } catch (er) {
          this.$_errorToast(this.$t('error'))
        }
      },

      handleEmpty() {
        this.params.search = ''
        this.params.category = ''
        this.params.status = ''

        this.refresh()
      },

      routeToCreateProduct() {
        this.$router.push('/products/create-product')
      },

      searchUser(text) {
        this.params.search = text
        this.params.page = 1
        this.refresh()
      },
      changePaginationValue({ page, page_size }) {
        this.params.page = page
        this.params.page_size = page_size
        this.refresh()
      },

      myChange() {
        console.log('MY Change')
      },
    },
  }
</script>
