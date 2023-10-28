<template>
  <div>


  <b-row> 
    <b-col cols="12" class="d-flex justify-content-end mb-3">
      <b-button variant="primary" @click="$router.push('/create')">yangiqo'shish</b-button>
    </b-col>
  </b-row>
    <b-card>
      <span class="spa h6">{{ $t('search') }}</span>
      <b-row class="d-flex align-items-center justify-content-between mb-3">
        <b-col class="col-lg-3 col-md-6 col-12">
          <AppSearchInput
            :placeholder="$t('search')"
            @callback="search"
            class="search-input"
          />
        </b-col>
      </b-row>
      <b-table :items="GET_USERS.data" :fields="fields" responsive>
        <template #head()="data">
          <span>{{ $t(data.label) }}</span>
        </template>

        <template #cell(phone_number)="row">
          <div>
            <div class="mr-1">
              <span
                v-if="row.item.phone_number"
                class="fs-14px text-black text-dark"
                ><feather-icon
                  class="mr-50 text-black"
                  icon="PhoneIcon"
                  size="18"
                />+{{ row.item.phone_number }}</span
              >
              <span v-else class="fs-14px text-muted">{{
                $t('empty_text')
              }}</span>
            </div>
          </div>
        </template>

        <template #cell(sms)="row">
          <div>
            <div>
              <span v-if="row.item.sms" class="fs-14px text-black text-dark">{{
                row.item.sms
              }}</span>
              <span v-else class="fs-14px text-muted">{{
                $t('empty_text')
              }}</span>
            </div>
          </div>
        </template>

        <template #cell(full_name)="row">
          <div>
            <div>
              <span
                v-if="row.item.full_name"
                class="fs-14px text-black text-dark"
                >{{ row.item.full_name }}</span
              >
              <span v-else class="fs-14px text-muted">{{
                $t('empty_text')
              }}</span>
            </div>
          </div>
        </template>

        <template #cell(data)="row">
          <div>
            <div>
              <span v-if="row.item.data" class="fs-14px text-black text-dark">{{
                row.item.data
              }}</span>
              <span v-else class="fs-14px text-muted">{{
                $t('empty_text')
              }}</span>
            </div>
          </div>
        </template>

        <template #cell(gender)="row">
          <span v-if="row.item.gender" class="fs-14px text-black text-dark">
            {{ $t('gender.man') }}
          </span>
          <span v-else class="fs-14px text-muted">
            {{ $t('gender.woman') }}
          </span>
        </template>

        <template #cell(is_active)="row">
          <b-form-checkbox
            :checked="row.item.is_active"
            class="custom-control-success"
            name="check-button"
            switch
            disabled
          />
        </template>

        <template #cell(actions)="row">
          <div class=" d-flex">

            <b-button
              class="mr-1"
              size="sm"
              variant="warning"
              @click="giveItem(row.item)"
            >
              <feather-icon icon="EditIcon" />
            </b-button> 

            <b-button
              class="mr-1"
              size="sm"
              variant="danger"
              @click="deleteUser(row.item.id)"
            >
              <feather-icon icon="Trash2Icon" />
            </b-button> 
            <b-button
              v-if="$can('delete', 'auth/user')"
              size="sm"
              variant="info"
              @click="$router.push(`/clients/detail/${row.item.id}`)"
            >
              <feather-icon icon="ChevronRightIcon" />
            </b-button>
          </div>
        </template>
      </b-table>
    </b-card>
    <!-- </b-col> -->

    <!-- <b-col cols="12"> -->
    <b-card>
      <div class="d-flex justify-content-between">
        <div class="d-flex align-items-center mb-0">
          <span class="text-nowrap text-black ml-1">
            {{ $t('pagination.show_from') }}
          </span>
          <b-form-select
            v-model="filterData.page_size"
            :options="['10', '15', '20']"
            class="mx-1 text-black"
            @change="changePerPage"
          />
          <span class="text-nowrap"> {{ $t('pagination.lines') }} </span>
        </div>

        <b-pagination
          v-model="filterData.page"
          :per-page="filterData.page_size"
          align="right"
          aria-controls="my-table"
          first-number
          last-number
          @input="changePage"
          class="mt-1"
        >
        </b-pagination>
      </div>
    </b-card>



    <pre>
      {{ GET_USERS }}
    </pre>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VSelect from 'vue-select'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

import {
  BAvatar,
  BAvatarGroup,
  BBadge,
  BButton,
  BCard,
  BCol,
  BFormGroup,
  BFormSelect,
  BPagination,
  BRow,
  BTable,
  BFormCheckbox,
} from 'bootstrap-vue'

import AppSearchInput from './components/AppSearchInput.vue'

export default {
  components: {
    // BModal,
    BButton,
    FeatherIcon,
    BPagination,
    BFormSelect,
    // BInputGroupPrepend,
    // BInputGroup,
    BFormGroup,
    // BFormInput,
    BRow,
    BCol,
    VSelect,
    // VBToggle,
    BCard,
    BTable,
    // BBadge,
    BAvatarGroup,
    BFormCheckbox,
    BAvatar,
    AppSearchInput,
  },
  data() {
    return {
      edit_item: {},
      filterData: {
        page: 1,
        page_size: 10,
        search: '',
      },
    
      fields: [
        {
          label: 'Ismi familiya',
          key: 'full_name',
          thClass: 'text-center align-middle',
          tdClass: 'text-center align-middle',
        },
        {
          label: 'email',
          key: 'email',
          thClass: 'text-center align-middle',
          tdClass: 'text-center align-middle',
        },
        {
          label: 'phone',
          key: 'phone',
          thClass: 'text-center align-middle',
          tdClass: 'text-center align-middle',
        },
        {
          label: 'city',
          key: 'city',
          thClass: 'text-center align-middle width-150',
          tdClass: 'text-center align-middle',
        },
        {
          label: 'region',
          key: 'region',
          thClass: 'text-center align-middle',
          tdClass: 'text-center align-middle',
        },
        {
          label: 'street',
          key: 'street',
          thClass: 'text-center align-middle',
          tdClass: 'text-center align-middle',
        },
      
        {
          label: 'client_list.status',
          key: 'is_active',
          thClass: 'text-center align-middle',
          tdClass: 'text-center align-middle',
        },
        {
          label: 'actions',
          key: 'actions',
          thClass: 'text-center align-middle width-150',
          tdClass: 'text-left align-middle',
        
        },
        
      ],
    }
  },
  computed: {
    ...mapGetters('users', ['GET_USERS']),
  },

  methods: {
    ...mapActions('users', ['FETCH_USERS', 'USER_DELATE']),
    refresh() {
      this.FETCH_USERS()
    },
    deleteUser(id ) {
      this.$_showAreYouSureModal()
      .then(val => {
        if(val) {
         this.USER_DELATE(id)

        }
      })      

    },

   
    search(text) {
      this.filterData.search = text
      this.refresh(this.filterData)
    },
    changePage(value) {
      this.currentPage = value
      this.refresh(this.filterData)
    },
    changePerPage() {
      this.refresh(this.filterData)
    },
  },

  async mounted() {
    this.refresh()
    // this.FETCH_CLIENTS_LIST()
    // this.FETCH_USERS()
  },
}
</script>

<style lang="scss" scoped>
@import '@core/scss/vue/libs/vue-select.scss';

@font-face {
  font-family: 'Font Awesome 6 Free';
  font-style: normal;
  font-weight: 900;
  font-display: block;
  src: url('../../assets/fonts/fa-solid-900.woff2') format('woff2'),
    url('../../assets/fonts/fa-solid-900.ttf') format('truetype');
}
</style>
