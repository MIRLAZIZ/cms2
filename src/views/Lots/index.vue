<template>
  <div>
    <b-card>
      <b-row>
        <b-col lg="3" md="4">
          <b-form-group>
            <AppSearchInput class="mt-2" @callback="searchUser" :label="$t('lots_list.search')" />
          </b-form-group>
        </b-col>

        <b-col lg="3" md="4">
          <b-form-group>
            <label>{{$t('lots_list.category')}}</label>

            <v-select
              v-model="params.category"
              :reduce="p => p.id"
              :get-option-label="
                el => {
                  return el.title[$i18n.locale]
                }
              "
              :options="GET_CATEGORIES.results"
            />
          </b-form-group>
        </b-col>

        <b-col lg="3" md="4">
          <b-form-group>
            <label for="example-datepicker2">
              {{ $t('lots_list.status') }}
            </label>
            <v-select
              id="example-datepicker2"
              v-model="params.status"
              :get-option-label="
                el => {
                  return el.title[$i18n.locale]
                }
              "
              :options="statusOptions"
              :reduce="p => p.value"
            />
          </b-form-group>
        </b-col>

        <b-col lg="3">
          <BRow>
          <BCol>
          <b-button
          variant="outline-primary"
          class="d-flex align-items-center justify-content-center form-control mt-2 p-50" 
          @click="refresh">
            {{ $t('products_list.apply') }}
          </b-button>
          </BCol>
          <BCol>
          <b-button 
          variant="outline-danger" 
          class="d-flex align-items-center justify-content-center form-control mt-2 p-50" 
          @click="handleEmpty">
            {{ $t('products_list.reset') }}
          </b-button>
          </BCol>
          </BRow>
        </b-col>
      </b-row>
    </b-card>

    <b-card>
      <div class="d-flex justify-content-end">
        <b-button
          variant="success"
          class="mb-1"
          @click="$router.push('/lots/add')"
        >
          <feather-icon icon="PlusIcon" />
          {{ $t('general.add') }}
        </b-button>
      </div>

      <LotsTable
        :fields="fields"
        @edit-product="editLot"
        @edit-view="editView"
        @delete-product="deleteLot"
      />

      <Pagination
        :users_count="GET_LOTS.count"
        @changePaginationValue="FETCH_LOTS"
      />
    </b-card>
  </div>
</template>

<script>
  import {
    BAvatar,
    BBadge,
    BButton,
    BCard,
    BCol,
    BFormCheckbox,
    BFormGroup,
    BFormRating,
    BMedia,
    BRow,
    BTable,
  } from 'bootstrap-vue'
  import AppSearchInput from '@/components/AppSearchInput.vue'
  import AppSelect from '@/components/AppSelect.vue'
  import vSelect from 'vue-select'
  import Pagination from '@/components/Pagination.vue'
  import { mapActions, mapGetters } from 'vuex'
  import LotsTable from './components/LotsTable.vue'

  export default {
    components: {
      BTable,
      LotsTable,
      BFormGroup,
      BButton,
      BFormCheckbox,
      BCard,
      BRow,
      BCol,
      BBadge,
      BAvatar,
      BMedia,
      BFormRating,
      AppSelect,
      vSelect,
      AppSearchInput,
      Pagination,
    },
    data() {
      return {
        params: {
          category: null,
          status: null,
          search: null,
          page: 1,
          page_size: 10,
        },

        statusOptions: [
          {
            value: true,
            title: {
              ru: 'Активный',
              uz: 'Faol',
            },
          },
          {
            value: false,
            title: {
              ru: 'Не активный',
              uz: 'Faol emas',
            },
          },
        ],

        fields: [
          {
            key: 'id',
            label: 'ID',
            tdClass: 'text-center align-middle',
            thClass: 'text-center align-middle',
          },
          {
            key: 'product',
            label: 'Продукт ',
          },
          {
            key: 'number_of_stats2',
            label: 'Количество статвок ',
            tdClass: 'text-center align-middle',
            thClass: 'text-center align-middle',
          },
          {
            key: 'members',
            label: 'Участники ',
            thClass: 'text-center align-middle',
            tdClass: 'text-center align-middle',
          },
          {
            key: 'bids_amount',
            label: 'Количество стуков ',
            thClass: 'text-center align-middle',
            tdClass: 'text-center align-middle',
          },
          {
            key: 'time',
            label: 'Оставшееся время ',
            tdClass: 'text-center align-middle',
            thClass: 'text-center align-middle',
          },
          {
            key: 'date_ending',
            label: 'Дата завершения  ',
            tdClass: 'text-center align-middle',
            thClass: 'text-center align-middle',
          },
          {
            key: 'actions',
            label: 'Действия ',
            tdClass: 'text-center align-middle',
            thClass: 'text-center align-middle',
          },
        ],
      }
    },

    mounted() {
      this.refresh()
      this.FETCH_CATEGORIES()
    },

    methods: {
      ...mapActions('lots', ['FETCH_LOTS', 'DELETE_LOT']),
      ...mapActions('knowledgeBase', ['FETCH_CATEGORIES']),

      refresh() {
        this.FETCH_LOTS(this.params)
      },

      deleteLot(id) {
        this.$_showAreYouSureModal().then(val => {
          if (val) {
            this.DELETE_LOT(id).then(() => {
              this.refresh()
              this.$_successToast(this.$t('success'))
            })
          } else {
            this.$_errorToast(this.$t('error'))
          }
        })
      },

      editLot(id) {
        this.$router.push(`/lots/edit/${id}`)
      },

      editView(id) {
        this.$router.push(`/lots/view/${id}`)
      },

      handleEmpty() {
        this.params = {
          search: null,
          category: null,
          status: null,
        }
        this.refresh()
      },

      searchUser(text) {
        this.params.search = text
        this.params.page = 1
        this.refresh()
      },
    },

    computed: {
      ...mapGetters('lots', ['GET_LOTS']),
      ...mapGetters('knowledgeBase', ['GET_CATEGORIES']),
    },
  }
</script>
