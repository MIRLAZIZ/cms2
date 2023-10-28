<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-1">
      <h3>Добавить доставка</h3>
      <b-button @click="addModal" variant="primary">
        <feather-icon icon="PlusIcon" />
        {{ $t('general.add') }}
      </b-button>
    </div>

    <b-table
      bordered
      responsive
      :fields="fields"
      :items="GET_TEMP_DELIVERY_INFO.results"
      show-empty
    >
      <template #empty>
        <h4 class="text-center">{{ $t('administration.no_records') }}</h4>
      </template>

      <template #emptyfiltered="scope">
        <h4 class="text-center">{{ scope.emptyFilteredText }}</h4>
      </template>

      <template #cell(address)="data">
        <div v-if="data.item.province">
          <div v-if="data.item.province">
            {{ data.item.province.title[$i18n.locale] }}
          </div>
          <div v-if="data.item.region" class="text-muted">
            {{ data.item.region.title[$i18n.locale] }}
          </div>
        </div>
        <div v-else>
          UZBEKISTAN
        </div>
      </template>

      <template #cell(summ)="data">
        <div>{{ data.item.price }}</div>
      </template>

      <template #cell(actions)="data">
        <span class="text-nowrap">
          <b-button
            variant="warning"
            class="btn-sm mr-50"
            @click="editModal(data.item)"
          >
            <feather-icon icon="EditIcon" size="16" />
          </b-button>
          <b-button
            variant="danger"
            class="btn-sm"
            @click="deleteTempDeliveryInfo(data.item.id)"
          >
            <feather-icon icon="TrashIcon" size="16" />
          </b-button>
        </span>
      </template>
    </b-table>
    <Pagination
      v-if="GET_TEMP_DELIVERY_INFO.count"
      :users_count="GET_TEMP_DELIVERY_INFO.count"
      @changePaginationValue="changePaginationValue"
    />

    <createDeliveryModal
      :product="product_id"
      :editData="editItem"
      :isEdit="isEdit"
    />
  </div>
</template>

<script>
  import { BTable, BButton } from 'bootstrap-vue'
  import createDeliveryModal from './CreateDelivery.vue'
  import { mapActions, mapGetters } from 'vuex'
  import Pagination from '@/components/Pagination.vue'

  export default {
    components: {
      createDeliveryModal,
      BTable,
      Pagination,
      BButton,
    },
    data() {
      return {
        isEdit: false,
        params: {
          page: 1,
          page_size: 5,
        },

        editItem: {},

        fields: [
          {
            key: 'address',
            label: 'Адрес',
            tdClass: 'text-center align-middle',
            thClass: 'text-center align-middle',
          },
          {
            key: 'summ',
            label: 'Сум за км',
            tdClass: 'text-center align-middle',
            thClass: 'text-center align-middle',
          },
          {
            key: 'actions',
            label: 'Действия',
            tdClass: 'text-center align-middle',
            thClass: 'text-center align-middle',
          },
        ],
      }
    },
    props: {
      items: {
        type: Array,
        required: true,
      },
      product_id: {
        type: [Number, String],
        required: true,
      },
    },

    computed: {
      ...mapGetters('products', ['GET_TEMP_DELIVERY_INFO']),
    },

    methods: {
      ...mapActions('products', [
        'DELETE_TEMP_DELIVERY_INFO',
        'FETCH_TEMP_DELIVERY_INFO',
      ]),

      editModal(value) {
        this.editItem = {
          id: value.id,
          product: value.product,
          is_province: value.is_province,
          price: value.price,
          region: value.region ? value.region.id : null,
          province: value.province ? value.province.id : null,
        }

        this.isEdit = true
        this.$nextTick(() => {
          this.$bvModal.show('create-delivery-modal')
        })
      },

      addModal() {
        this.editItem = {}
        this.isEdit = false

        this.$nextTick(() => {
          this.$bvModal.show('create-delivery-modal')
        })
      },

      changePaginationValue({ page, page_size }) {
        this.params.page = page
        this.params.page_size = page_size
        this.FETCH_TEMP_DELIVERY_INFO({
          product: this.product_id,
          ...this.params,
        })
      },

      async deleteTempDeliveryInfo(id) {
        try {
          const response = await this.$_showAreYouSureModal()

          if (response) {
            if (this.GET_TEMP_DELIVERY_INFO.results.length === 1) {
              if (this.params.page > 1) --this.params.page
            }

            await this.DELETE_TEMP_DELIVERY_INFO(id)
            await this.FETCH_TEMP_DELIVERY_INFO({
              product: this.product_id,
              ...this.params,
            })
            this.$_successToast(this.$t('success'))
          }
        } catch (er) {
          this.$_errorToast(this.$t('error'))
        }
      },
    },
  }
</script>

<style></style>
