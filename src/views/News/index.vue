
<template>
  <div>
home page    
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="">
  
</style>


<!-- <template>
  <div>
    <b-card>
      <b-row>
        <b-col sm="3">
          <AppSearchInput
            :label="this.$t('search') + ':'"
            @callback="searchUser"
          />
        </b-col>

        <b-col sm="3">
          <label for="">
            {{ $t('category:') }}
          </label>
          <v-select
            v-model="category"
            :reduce="p => p.id"
            :get-option-label="
              el => {
                return el.title[$i18n.locale]
              }
            "
            :options="GET_CATEGORIES.results"
            @input="changeCategory"
          />
        </b-col>

        <b-col sm="3">
          <label for="">
            {{ $t('type:') }}
          </label>
          <v-select
            v-model="post_type.title"
            :reduce="p => p.is_banner"
            :get-option-label="
              el => {
                return el.title
              }
            "
            :options="post_type"
            @input="
              changePostType(
                post_type.find(p => p.is_banner === post_type.title),
              )
            "
          />
        </b-col>

        <b-col sm="3" class="d-flex justify-content-end">
          <b-button
            variant="success"
            class="mt-2 w-50"
            @click="$router.push('/news-create')"
          >
            <feather-icon icon="PlusIcon" /> {{ $t('general.add') }}
          </b-button>
        </b-col>
      </b-row>
    </b-card>

    <b-card>
      <NewsTable
        :fields="fields"
        @edit-product="editLot"
        @edit-view="editView"
        @delete-product="deleteNews"
      />
      <Pagination
        :users_count="GET_NEWS.count"
        @changePaginationValue="FETCH_NEWS"
      />
    </b-card>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import NewsTable from './components/NewsTable.vue'
  import Pagination from '@/components/Pagination.vue'
  // import FlatPickr from 'vue-flatpickr-component'
  import flatPickr from 'vue-flatpickr-component'
  import vSelect from 'vue-select'
  import {
    BCard,
    BModal,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
  } from 'bootstrap-vue'
  import AppSearchInput from '@/components/AppSearchInput.vue'
  import SelectField from '@/components/SelectField.vue'
  import products from '@/router/products'

  export default {
    components: {
      NewsTable,
      Pagination,
      flatPickr,
      vSelect,
      BRow,
      BModal,
      BCard,
      BCol,
      BButton,
      BFormGroup,
      BFormInput,
      AppSearchInput,
      SelectField,
    },

    data() {
      return {
        category: '',
        post_type: [
          {
            title: this.$t('is_banner'),
            is_banner: true,
          },
          {
            title: this.$t('is_not_banner'),
            is_banner: false,
          },
        ],
        params: {
          category: null,
          status: null,
          search: null,
          page: 1,
          page_size: 10,
        },

        fields: [
          {
            key: 'image',
            label: this.$t('photo'),
            width: '40px',
            thClass: 'text-center',
            tdClass: 'text-center px-0',
          },
          {
            key: 'category',
            label: this.$t('category'),
            width: '200px',
            thClass: 'text-center',
            tdClass: 'text-left',
          },
          {
            key: 'lang',
            label: 'Язык',
            width: '200px',
            thClass: 'text-center',
            tdClass: 'text-center',
          },
          {
            key: 'created_date',
            label: 'Время',
            width: '200px',
            thClass: 'text-center',
            tdClass: 'text-right',
          },
          {
            key: 'is_banner',
            label: 'Тип',
            width: '200px',
            thClass: 'text-center',
            tdClass: 'text-center',
          },
          {
            key: 'is_active',
            label: 'Статус',
            width: '200px',
            thClass: 'text-center',
            tdClass: 'text-center',
          },
          {
            key: 'actions',
            label: 'Действия',
            width: '200px',
          },
        ],
      }
    },

    async mounted() {
      await this.FETCH_CATEGORIES()
      this.refresh()
    },

    methods: {
      ...mapActions('news', ['FETCH_NEWS', 'DELETE_NEWS']),
      ...mapActions('knowledgeBase', ['FETCH_CATEGORIES']),

      refresh() {
        this.FETCH_NEWS(this.params)
        console.log(this.FETCH_NEWS(this.params))
      },

      deleteNews(id) {
        if (val) {
          this.DELETE_NEWS(id).then(() => {
            this.refresh()
            this.$_successToast(this.$t('general.success'))
          })
        } else {
          this.$_errorToast(this.$t('general.error'))
        }
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
        this.refresh()
      },

      changeCategory(category) {
        if (category !== null) {
          this.params.search = category[this.$i18n.locale]
          this.refresh()
        } else {
          this.params.search = null
          this.refresh()
        }
      },

      changePostType(value) {
        this.params.is_banner = value.is_banner
        this.refresh()
      },
    },

    computed: {
      ...mapGetters('news', ['GET_NEWS']),
      ...mapGetters('knowledgeBase', ['GET_CATEGORIES']),
    },
  }
</script> -->
