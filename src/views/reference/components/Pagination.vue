<template>
  <b-row class="mt-2">
    <b-col md="1">
      <b-form-select
        v-model="pagination_data.page_size"
        :options="['3', '5', '10']"
        class="w-auto"
        @change="changePaginationValue"
      />
    </b-col>
    <b-col md="5" class="ml-auto">
      <b-pagination
        v-model="pagination_data.page"
        :per-page="pagination_data.page_size"
        :total-rows="users_count"
        align="right"
        aria-controls=""
        first-number
        last-number
        @input="changePaginationValue"
      >
      </b-pagination>
    </b-col>
  </b-row>
</template>

<script>
  import { BFormSelect, BPagination, BRow, BCol } from "bootstrap-vue";

  export default {
    props: {
      users_count: {
        type: Number,
        default: 0,
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
      };
    },
    methods: {
      changePaginationValue() {
        this.$emit("changePaginationValue", this.pagination_data);
      },
    },
  };
</script>
