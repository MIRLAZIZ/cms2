<template>
  <div class="mt-2">
    <div class="d-flex justify-content-between mb-0">
      <div class="d-flex align-items-center">
        <span class="text-nowrap text-black ml-1">
          {{ $t('pagination.show_from') }}
        </span>
        <b-form-select
          v-model="params.page_size"
          :options="pageOptions"
          class="mx-1"
          @change="changePerPage"
        />
        <span class="text-nowrap"> {{ $t('pagination.lines') }} </span>
      </div>
      <b-pagination
        v-model="params.page"
        :total-rows="rows"
        :per-page="params.page_size"
        first-number
        last-number
        align="right"
        prev-class="prev-item"
        next-class="next-item"
        @change="changePage"
      >
        <template #prev-text>
          <feather-icon icon="ChevronLeftIcon" size="18" />
        </template>
        <template #next-text>
          <feather-icon icon="ChevronRightIcon" size="18" />
        </template>
      </b-pagination>
    </div>
  </div>
</template>

<script>
import { BPagination, BFormSelect, BCard } from 'bootstrap-vue'

export default {
  name: 'Pagination',
  components: {
    BPagination,
    BFormSelect,
    BCard,
  },
  props: {
    rows: {
      type: Number,
      required: false,
      default: 1,
    },
    nobody: {
      type: Boolean,
      default: false,
      required: false,
    },
    params: {
      type: Object,
      default: () => ({
        page_size: 10,
        page: 1,
      }),
    },
  },
  data() {
    return {
      pageOptions: [3, 5, 10],
    }
  },
  methods: {
    changePerPage(size) {
      this.params.page_size = size
      this.params.page = 1
      this.$emit('refresh', this.params)
    },
    changePage(value) {
      this.params.page = value
      this.$emit('refresh', this.params)
    },
  },
}
</script>
<style>
</style>
