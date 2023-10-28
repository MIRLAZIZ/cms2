<template>
  <div>
    <b-table
      :items="GET_LOTS.results"
      :fields="fields"
      bordered
      responsive
      show-empty
      :empty-text="$t('Нет данных')"
    >
      <template #cell(id)="data">
        <div>{{ data.item.id }}</div>
      </template>

      <template #cell(number_of_stats2)="">
        <!--        <div>{{ data.item.number_of_stats }}</div>-->
        <div>no-data</div>
      </template>

      <template #cell(product)="data">
        <b-media no-body class="d-flex align-items-center">
          <b-media-aside>
            <b-avatar
              v-if="data.item.product.product_images[0]"
              :src="data.item.product.product_images[0].image"
              rounded
              size="125"
              class="mr-75"
            />
            <b-avatar v-else rounded size="125" class="mr-75" />
          </b-media-aside>

          <b-media-body>
            <h5 class="font-weight-bolder text-capitalize">
              {{ data.item.product.title }}
            </h5>
            <p class="text__now text-truncate">
              {{ data.item.product.product_description }}
            </p>
          </b-media-body>
        </b-media>
      </template>

      <template #cell(number_of_stats)="data">
        <div>{{ data.item.product.category.title }}</div>
      </template>

      <template #cell(time)="data">
        <div>{{ data.item.time_left }}</div>
      </template>

      <template #cell(members)="">
        <div>no-data</div>
      </template>

      <template #cell(date_ending)="data">
        <h6 class="font-weight-bolder mb-0">
          {{ getHours(data.item.time_ending) }}
        </h6>
        <small class="text-muted">
          {{ getDate(data.item.time_ending) }}
        </small>
      </template>

      <template #cell(actions)="data">
        <div class="d-flex justify-content-center align-items-center">
          <b-button
            variant="success"
            size="sm"
            class="mr-50"
            @click="$emit('edit-view', data.item.id)"
          >
            <feather-icon icon="EyeIcon" size="16" />
          </b-button>

          <b-button
            variant="warning"
            size="sm"
            class="mr-50"
            @click="$emit('edit-product', data.item.id)"
          >
            <feather-icon icon="EditIcon" size="16" />
          </b-button>

          <b-button
            variant="danger"
            size="sm"
            @click="$emit('delete-product', data.item.id)"
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
    BAvatar,
    BBadge,
    BMedia,
    BMediaAside,
    BMediaBody,
    BFormRating,
  } from 'bootstrap-vue'
  import { mapGetters } from 'vuex'
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
      BAvatar,
      BMedia,
      BMediaAside,
      BMediaBody,
      BFormRating,
    },

    mixins: [extra],
    props: {
      fields: {
        type: Array,
        default: [],
      },
    },

    computed: {
      ...mapGetters('lots', ['GET_LOTS']),
    },

    methods: {
      getDate(date) {
        if (date) return moment(date).format('DD.MM.YYYY')
      },
      getHours(date) {
        if (date) return moment(date).format('HH:mm')
      },
    },
  }
</script>
<style>
  .text__now {
    width: 200px;
  }
</style>
