<template>
  <b-row>
    <b-col md="1">
      <div class="d-flex justify-content-between align-items-center">
        <span class="text-nowrap mr-1">{{ $t('pagination.show_from') }}</span>
        <b-form-select
          v-model="pagination_data.page_size"
          :options="['3', '5', '10']"
          class="w-auto"
          @change="changePaginationValue"
        />
        <span class="text-nowrap ml-1"> {{ $t('pagination.lines') }} </span>
      </div>
    </b-col>
    <b-col md="5" class="ml-auto">
      <b-pagination
        v-model="pagination_data.page"
        :per-page="pagination_data.page_size"
        :total-rows="users_count"
        align="right"
        aria-controls="my-table"
        first-number
        last-number
        @input="changePaginationValue"
      >
      </b-pagination>
    </b-col>
  </b-row>
</template>

<script>
import { BFormSelect, BPagination, BRow, BCol } from 'bootstrap-vue'

export default {
  props: {
    users_count: {
      type: Number,
      default: () => 0,
    },
  },
  components: {
    BFormSelect,
    BPagination,
    BRow,
    BCol,
  },
  data() {
    return {
      pagination_data: {
        page: 1,
        page_size: 5,
      },
    }
  },
  methods: {
    changePaginationValue() {
      this.$emit('changePaginationValue', this.pagination_data)
      
    },
  },
}
</script>

<style></style>
