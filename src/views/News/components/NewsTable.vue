<template>
  <div>
    <b-table
      :items="GET_NEWS.results"
      :fields="fields"
      responsive
      bordered
      show-empty
      :empty-text="this.$t('Нет данных')"
    >
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
  import {
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
  } from 'bootstrap-vue'
  import { mapGetters, mapActions } from 'vuex'
  import moment from 'moment'
  import extra from '@/mixins/extra'

  export default {
    components: {
      BTable,
      BButton,
      BFormCheckbox,
      BCard,
      BRow,
      BCol,
      BBadge,
      BImg,
      BMedia,
      BMediaAside,
      BMediaBody,
      BFormRating,
    },

    data() {
      return {}
    },

    mixins: [extra],
    props: {
      fields: {
        type: Array,
        default: [],
      },
    },

    computed: {
      ...mapGetters('news', ['GET_NEWS']),
    },

    methods: {
      ...mapActions('news', [
        'FETCH_NEWS',
        'CHANGE_STATUS_BY_ID',
        'DELETE_NEWS',
      ]),

      // const formData = new FormData()
      //           formData.append('image', this.ins.image)
      //           formData.append('type', this.ins.type)
      //           formData.append('title', this.ins.title)
      //           this.CREATE_INSTRUMENTS_MODEL_VARIANT(formData)
      //             .then(() => {
      //               this.FETCH_INSTRUMENTS_MODEL_VARIANT({ type: this.type })
      //             })

      changeStatus(id, is_active) {
        this.CHANGE_STATUS_BY_ID({
          id,
          is_active,
        })
      },

      d(id) {
        this.$router.push(
          {
            name: 'news-edit',
            params: { id },
          },
          'news-edit',
        )
      },

      refresh() {
        this.FETCH_NEWS()
      },

      deleteNews(id) {
        this.$_showAreYouSureModal().then(val => {
          if (val) {
            this.DELETE_NEWS(id).then(() => {
              this.refresh()
              this.$_successToast(this.$t('general.success'))
            })
          }
        })
      },

      routerFunction(data, id) {
        this.$router.push(`/news-edit/${id}`)
      },
      getDate(date) {
        if (date) return moment(date).format('DD.MM.YYYY')
      },
      getHours(date) {
        if (date) return moment(date).format('HH:mm')
      },
    },
  }
</script>
