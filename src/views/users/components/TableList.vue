<template>
  <div>
    <b-table :fields="fields" :items="GET_TABLE.results">
      <template #head(actions)>
        <span class="text-center w-100 mx-auto d-block">
          {{ $t('actions') }}
        </span>
      </template>

      <template #head(image)>
        {{ $t('photo') }}
      </template>

      <template #head(category)>
        {{ $t('category') }}
      </template>

      <template #head(lang)>
        {{ $t('lang') }}
      </template>

      <template #head(created_date)>
        {{ $t('date') }}
      </template>

      <template #head(is_active)>
        {{ $t('status') }}
      </template>

      <template #head(is_banner)>
        {{ $t('type') }}
      </template>

      <template #cell(image)="data">
        <div>
          <b-img
            class="img"
            v-if="data.item.main_photo"
            :src="data.item.main_photo"
            style="max-width: 150px; max-height: 90px"
          />
          <span v-else class="mx-auto">
            {{ $t('Нет фото') }}
          </span>
        </div>
      </template>

      <template #cell(category)="data">
        <span>
          <span v-if="data.item.category.title == null"> - </span>
          <span v-else>
            <h5>
              {{ data.item.category.title[$i18n.locale] }}
            </h5>
          </span>
        </span>
        <span>
          <span v-if="data.item.short_decrp == null"> - </span>
          <span v-else>
            <div v-if="data.item.short_decrp.length < 30">
              {{ data.item.short_decrp }}
            </div>
            <div v-else-if="data.item.short_decrp.length > 30">
              {{ data.item.short_decrp.substring(0, 30) }}...
            </div>
            <span class="text-muted"> </span>
          </span>
        </span>
      </template>

      <template #cell(is_active)="data">
        <b-form-checkbox
          v-model="data.item.is_active"
          class="custom-control-success"
          name="check-button"
          switch
          @change="changeStatus(data.item.id, data.item.is_active)"
        />
      </template>

      <template #cell(short_decrp)="data">
        <div v-if="data.item.short_decrp > 25">
          {{ data.item.short_decrp }}
        </div>
        <div v-else>{{ data.item.short_decrp.substring(0, 25) }}...</div>
      </template>

      <template #cell(lang)="data">
        <b-badge variant="light-info" v-if="data.item.lang == 'ru'">
          RU
        </b-badge>
        <b-badge variant="light-success" v-else-if="data.item.lang == 'uz'">
          UZ
        </b-badge>
      </template>

      <template #cell(is_banner)="data">
        <b-badge v-if="data.item.is_banner" class="mr-1" variant="primary">
          {{ $t('is_banner') }}
        </b-badge>
        <b-badge v-else class="mr-1" variant="warning">
          {{ $t('is_not_banner') }}
        </b-badge>
      </template>

      <template #cell(created_date)="data">
        <span>
          <span v-if="data.item.pub_time">
            <span class="font-weight-bold h5">
              {{ data.item.pub_time.split(':')[0] }}:{{
                data.item.pub_time.split(':')[1]
              }}
            </span>
          </span>
          <span v-else>-</span>
        </span>
        <span>
          <span v-if="data.item.pub_date">
            <h6 class="text-muted">
              {{ data.item.pub_date }}
            </h6>
          </span>
          <span v-else>-</span>
        </span>
      </template>

      <template #cell(actions)="data">
        <div class="d-flex justify-content-center align-items-center">
          <b-button
            variant="warning"
            size="sm"
            class="mr-50"
            @click="d(data.item.id)"
          >
            <feather-icon icon="EditIcon" size="16" />
          </b-button>

          <b-button
            variant="danger"
            size="sm"
            @click="deleteNews(data.item.id)"
          >
            <feather-icon icon="TrashIcon" size="16" />
          </b-button>
        </div>
      </template>
     
    </b-table>
  </div>
</template>
<script>
  import {  BTable,
    BFormCheckbox,
    BButton,
    BCard,
    BRow,
    BCol,
    BImg,
    BBadge,
    BMedia,
    BMediaAside,
    BMediaBody,
    BFormRating, } from 'bootstrap-vue'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    components: {
      BTable,
    BFormCheckbox,
    BButton,
    BCard,
    BRow,
    BCol,
    BImg,
    BBadge,
    BMedia,
    BMediaAside,
    BMediaBody,
    BFormRating,
    },
    props: {
      fields: {
        type: Array,
        default: [],
      },
    },
    computed :{
      ...mapGetters('table', ['GET_TABLE']),


    },
    methods: {
      ...mapActions('table', ['FETCH_TABLE']),
    },
    mounted() {
      this.FETCH_TABLE()
    },
  }
</script>
<style></style>
