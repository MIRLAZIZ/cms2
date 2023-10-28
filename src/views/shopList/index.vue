<template>
  <div>
    <BCard>
      <BRow class="d-flex justify-content-between align-items-center">
        <BCol cols="12" md="6" xl>
          <BFormGroup>
            <label>{{ $t('generals.search') }}</label>
            <BFormInput
              id="basicInput"
              v-model="filterData.title"
              @input="fetchData"
              :placeholder="$t('generals.search')"
            />
          </BFormGroup>
        </BCol>
        <BCol cols="12" md="6" xl="2">
          <BFormGroup>
            <label>{{ $t('shop_list.type_cashback') }}</label>
            <v-select
            id="type_cashback"
              v-model="filterData.cash"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :label="$i18n.locale"
              :options="option"
              @input="fetchData"
              :reduce="(f) => f.value"
              :placeholder="$t('shop_list.type_cashback')"
            />
          </BFormGroup>
        </BCol>
        <BCol cols="12" md="6" xl>
          <BFormGroup>
            <label>{{ $t('shop_list.region') }}</label>
            <v-select
              v-model="filterData.region"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="getRegion"
              @input="fetchData"
              :reduce="getRegion => getRegion.id"
              :getOptionLabel="
                v => (v.name && v.name[$i18n.locale]) || ''
              "
              :placeholder="$t('shop_list.region')"
            />
          </BFormGroup>
        </BCol>
        <BCol cols="12" md="6" xl>
          <BFormGroup>
            <label>{{ $t('shop_list.district') }}</label>
            <v-select
              v-model="filterData.district"
              v-if="filterData.region"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="getDistrict"
              @input="fetchData"
              :reduce="getDistrict => getDistrict.id"
              :getOptionLabel="
                v => (v.name && v.name[$i18n.locale]) || ''
              "
              :placeholder="$t('shop_list.district')"
            />
            <v-select
            v-model="filterData.district"
            v-else
            disabled
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :placeholder="$t('shop_list.district')"
          />
          </BFormGroup>
        </BCol>
        
        <BCol cols="12" md xl="2" class="d-flex justify-content-end mt-25">
          <BButton
            variant="success"
            @click="onOpenAddShopName"
          >
          <feather-icon icon="PlusIcon"></feather-icon>
            {{$t('shop_list.add_shop')}}
          </BButton>
        </BCol>
      </BRow>
    </BCard>

    <BCard>
      <BTable
        bordered
        responsive
        :fields="fields"
        :items="SHOPLIST.results"
        class="text-center"
      >
      <template #head()="data">
<div class="d-flex justify-content-center align-items-center">
        <span>{{ $t(data.label) }}</span>
        </div>
      </template>
        <template #cell(main_photo)="props"> 
          <b-img
            v-if="props.value"
            :src="props.value"
            rounded
            class="main_image"
          />
          <div
            v-else
            rounded
            class="div-photo d-flex justify-content-center align-items-center"
          >
          <span
            ><strong>{{
              $t('shop_list.photo')
            }}</strong></span
          >
          </div>
        </template>
        <template #cell(cash)="props">
          {{props.value[$i18n.locale]}}
        </template>
        <template #cell(title)="props">
<strong>
          {{props.value}}
          </strong>
        </template>
        <!-- <template #cell(address)="props" style="min-height: 200px">
          {{props.value[$i18n.locale]}}
        </template> -->
        <template #cell(region)="item">
          <!-- {{props.value[$i18n.locale]}} -->
          <div style="min-width: 200px">
          {{item.value && item.value.name[$i18n.locale]}} <br />
          {{item.item.district && item.item.district.name[$i18n.locale]}} <br />
          {{item.item.address && item.item.address[$i18n.locale]}} <br />
          </div>
        </template>
        <!-- <template #cell(district.name)="props">
          {{props.value[$i18n.locale]}}
        </template> -->
        <template #cell(phones)="props" > 
          <div v-if="props.item.phones.number" style="min-width:150px">
            <!-- {{props.item.phones.number[0]}} -->
          <div v-for="(phone,index) in props.item.phones.number" :key="index" class="d-flex justify-content-start align-items-center mb-25">
            <feather-icon class=" mr-50" icon="PhoneIcon"></feather-icon>
          <span class="d-flex ">{{phone}}</span>
          </div>
          </div>
          <!-- <div v-else>
            <span> {{$t('shop_list.phones_not_specified')}}</span>
          </div> -->
        </template>
        <template #cell(actions)="props">
          <div class="text-nowrap">
            <BButton
              class="p-50 mr-1"
              variant="warning"
              @click="editData(props.item)"
            >
              <feather-icon icon="EditIcon"></feather-icon>
            </BButton>
            <BButton
              class="p-50"
              variant="danger"
              @click="deleteData(props.item)"
            >
              <feather-icon icon="XIcon"></feather-icon>
            </BButton>
          </div>
        </template>
        <template #cell(location)="{ item }">
          <div v-if="item.location.lat != 0">
            <BButton
              class="p-50"
              variant="info"
              @click="onOpenLocationModal(item.location)"
            >
              <feather-icon icon="MapPinIcon"></feather-icon>
            </BButton>
          </div>
          <!-- <div v-else>
            {{$t('shop_list.location_not_specified')}}
          </div> -->
        </template>
        <template #cell(work_time)="{ item }">
          <div v-if="item.work_time.length">
            <BButton
              class="p-50"
              variant="success"
              @click="onOpenWorkingHoursModal(item.work_time)"
            >
              <feather-icon icon="EyeIcon"></feather-icon>
            </BButton>
          </div>
          <!-- <div v-else>
            {{$t('shop_list.working_time_not_specified')}}
          </div> -->
        </template>
      </BTable>
      </BCard>
      <BCard>
      <div class="d-flex justify-content-between flex-wrap">
        <div class="d-flex align-items-center mb-0 mt-1">
          <span class="text-nowrap">{{$t('pagination.show_from')}}</span>
          <BFormSelect
            v-model="filterData.page_size"
            @input="fetchData"
            :options="[10, 20, 30]"
            class="mx-1"
          />
          <span class="text-nowrap">{{$t('pagination.lines')}}</span>
        </div>
        <div>
          <BPagination
            v-model="filterData.page"
            :total-rows="SHOPLIST.count"
            :per-page="filterData.page_size"
            first-number
            last-number
            align="right"
            prev-class="prev-item"
            next-class="next-item"
            class="mt-1 mb-0"
            @input="fetchData"
          >
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </BPagination>
        </div>
      </div>
      </BCard>
      <AddShopName />
      <LocationModal :marker="localtion" />
      <WorkingHours :items="working_time_table" />
    
  </div>
</template>

<script>
import AddShopName from './components/AddShopName.vue';
import LocationModal from './components/LocationModal.vue';
import WorkingHours from './components/WorkingHours.vue';

import { mapActions, mapGetters } from 'vuex';

import vSelect from 'vue-select';

import {
  BCard,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BButton,
  BTable,
  BPagination,
  BImg,
  BContainer,
} from 'bootstrap-vue';

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BButton,
    BTable,
    BPagination,
    BImg,
    BContainer,
    vSelect,
    AddShopName,
    LocationModal,
    WorkingHours,
  },
  data() {
    return {
      emptyDistrict: '',
      timer: null,
      selected: null,
      localtion: {
        lat: '',
        lng: '',
      },
      working_time_table: [
        {
          is_active: true,
          title: '',
          start_time: '',
          end_time: '',
        },
      ],
      option: [
        { ru: 'С кешбэком', uz: 'Cashback bilan', value: true },
        { ru: 'Без кешбэка', uz: "Keshbek yo'q", value: false },
      ],
      filterData: {
        title: '',
        page: 1,
        page_size: 10,
        cash: null,
        region: null,
        district: null
      },
      fields: [
        {
          key: 'main_photo',
          label: 'shop_list.photo',
          thClass: 'text-center align-middle',
            tdClass: 'd-flex justify-content-center align-middle',
        },
        {
          key: 'title',
          label: 'shop_list.shopname',
          sortable: true,
          thClass: 'text-center align-middle',
            tdClass: 'text-center align-middle',
        },
          {
            key: 'cash',
            label: 'shop_list.type_cashback',
            sortable: true,
            thClass: 'text-center align-middle',
            tdClass: 'text-center align-middle',
          },
        {
          key: 'region',
          label: 'shop_list.address',
          sortable: true,
          thClass: 'text-center align-middle',
            tdClass: 'text-center align-middle',
        },
        // {
        //   key: 'district.name',
        //   label: 'shop_list.district',
        // },
        // {
        //   key: 'address',
        //   label: 'shop_list.address',
        // },
        {
          key: 'location',
          label: 'shop_list.location',
          thClass: 'text-center align-middle',
            tdClass: 'text-center align-middle',
        },

        {
          key: 'phones',
          label: 'shop_list.phone_numbers',
          thClass: 'text-center align-middle',
            tdClass: 'text-center align-middle',
        },
        {
          key: 'work_time',
          label: 'shop_list.work_time',
          thClass: 'text-center align-middle',
          thStyle: { width: '50px'},
            tdClass: 'text-center align-middle',
        },
        {
          key: 'actions',
          label: 'shop_list.actions',
          thClass: 'text-center align-middle',
          
            tdClass: 'text-center align-middle',
        },
      ],
    };
  },
  computed: {
    ...mapGetters('shopList', ['SHOPLIST', 'SHOPREGION', 'ONESHOPREGION']),

  getRegion() {
        return this.SHOPREGION.results
      },
      getDistrict() {
        return this.ONESHOPREGION.district
      },
  },

mounted() {
  this.fetchData();
  this.FETCH_SHOP_REGION();
  },
  methods: {
    ...mapActions('shopList', ['FETCH_SHOP_LIST', 'DELETE_SHOP_LIST', 'FETCH_SHOP_REGION', 'FETCH_ONE_SHOP_REGION']),


    clearDistrictSearch() {
      this.filterData.district = ''
    },
  
     fetchData() {  //Фильтры
    // console.log(this.filterData.region);
        if (this.filterData.region == null) {
          this.filterData.district = ''
        }
        let { title,
        page,
        page_size,
        cash,
        region,
        district } = this.filterData;

      let req = {
        title,
        page,
        page_size,
        cash,
        region,
        district
      };


      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.FETCH_SHOP_LIST(req);
        this.FETCH_ONE_SHOP_REGION(this.filterData.region)
      }, 500);
      
    },
    
    editData(item) {
      this.$router.push(`/shoplist/edit-shoplist/${item.id}`);
    },
    onOpenLocationModal(e) {
      this.localtion = e;
      this.$nextTick(() => {
        this.$bvModal.show('modal-location');
      });
    },
    onOpenWorkingHoursModal(e) {
      this.working_time_table = e;
      this.$nextTick(() => {
        this.$bvModal.show('modal-workingHours');
      });
    },
    onOpenAddShopName() {
      console.log(this.SHOPLIST);
      this.$nextTick(() => {
        this.$bvModal.show('modal-center');
      });
    },
    deleteData(item) {
      this.$bvModal
        .msgBoxConfirm( this.$t('shop_list.want_to_delete'), {
          title: this.$t('shop_list.delete'),
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: this.$t('shop_list.yes'),
          cancelTitle: this.$t('shop_list.no'),
          hideHeaderClose: false,
          centered: true,
        })
        .then((accept) => {
          if (accept) {
            let req = { id: item.id };
            this.DELETE_SHOP_LIST(req)
              .then(() => {
                this.$_DeleteToast();
                this.fetchData();
              })
              .catch(() => {
                this.$_errorToast();
              });
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.main_image {
  height: 90px;
  width: 150px;
}
* ::placeholder {
    color: #c9c9d1 !important
  }
    .div-photo {
    width: 150px;
    height: 90px;
    border: 1px solid grey;
    border-radius: 0.3em;
    background-color: #f4f4f4;
  }
</style>
