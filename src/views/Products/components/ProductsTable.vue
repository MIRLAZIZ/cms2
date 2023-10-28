<template>
  <div>
    <b-table
      :items="GET_PRODUCTS.results"
      :fields="fields"
      bordered
      responsive
      show-empty
      :empty-text="$t('Нет данных')"
    >
      

      <template #head()="data">
        <div class="d-flex justify-content-center align-items-center">
          <span>{{ $t(data.label) }}</span>
        </div>
      </template>

      <template #emptyfiltered="scope">
        <h4 class="text-center">{{ scope.emptyFilteredText }}</h4>
      </template>

      <template #cell(id)="data">
        <div>{{ data.item.id }}</div>
      </template>

      <template #cell(title)="data">
        <b-media no-body>
          <b-media-aside
            ><b-avatar
              v-if="data.item.images"
              :src="data.item.images"
              rounded
              size="125"
              class="mr-75"
            />
            <b-avatar v-else rounded size="125" class="mr-75" />
          </b-media-aside>

          <b-media-body>
            <h4>{{ data.item.title.uz }}</h4>

            <div class="d-flex justify-content-start ">
              <h4>
                <b-badge variant="light-success"
                  >{{ data.item.price }} UZS</b-badge
                >
              </h4>
            </div>

            <div class="line-through d-flex justify-content-start  ">
              <h5 class="text-danger">{{ data.item.price_old }} UZS</h5>
            </div>

            <div>
              <b-form-rating
                id="rating-lg-no-border"
                v-model="data.item.rating"
                no-border
                variant="warning"
                class="p-0"
                inline
              />
            </div>
          </b-media-body>
        </b-media>
      </template>

      <template #cell(category)="data">
        <div>{{ data.item.category.title[$i18n.locale] }}</div>
      </template>

      <template #cell(status)="data">
        <b-form-checkbox
          v-model="data.item.status"
          class="custom-control-primary"
          name="check-button"
          switch
          disabled
        >
          <span class="switch-icon-left">
            <feather-icon icon="CheckIcon" />
          </span>
          <span class="switch-icon-right">
            <feather-icon icon="XIcon" />
          </span>
        </b-form-checkbox>
      </template>

      <!-- <template #cell(see-detail.vue)="">

      </template> -->

      <template #cell(actions)="data">
        <span class="text-nowrap">
          <b-button variant="success" class="btn-sm mr-50">
            <feather-icon icon="EyeIcon" size="16" />
          </b-button>
          <b-button
            variant="warning"
            class="btn-sm mr-50"
            @click="$router.push(`/products/edit-product/${data.item.id}`)"
          >
            <feather-icon icon="EditIcon" size="16" />
          </b-button>
          <b-button
            variant="danger"
            class="btn-sm"
            @click="$emit('delete-product', data.item.id)"
          >
            <feather-icon icon="TrashIcon" size="16" />
          </b-button>
        </span>
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

    props: {
      fields: {
        type: Array,
        default: [],
      },
    },
    data() {
      return {
        value: '',
      }
    },

    computed: {
      ...mapGetters('products', ['GET_PRODUCTS']),
    },
  }
</script>

<style scoped>
  .line-through {
    text-decoration: line-through;
    text-decoration-color: red;
    font-style: italic;
  }
</style>
