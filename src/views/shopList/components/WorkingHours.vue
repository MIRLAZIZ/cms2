<template>
  <div>
    <BModal
      sm
      col
      md
      lg
      xl
      id="modal-workingHours"
      centered
      size="lg"
      :title="$t('shop_list.shop_work_time')"
      ok-only
      :ok-title="$t('shop_list.close')"
    >
      <BTable
        :fields="fields"
        :items="getActiveWorkingDayList"
        class="text-center"
        responsive
      >
        <template #cell(title)="props">
          {{ props.value[$i18n.locale] }}
        </template>
      </BTable>
    </BModal>
  </div>
</template>

<script>
import { BModal, BContainer, BTable } from 'bootstrap-vue'

export default {
  components: {
    BModal,
    BTable,
    BContainer,
  },
  props: {
    items: {
      type: Array,
      default() {
        return [
          {
            is_active: true,
            title: '',
            start_time: '',
            end_time: '',
          },
        ]
      },
    },
  },

  data() {
    return {
      fields: [
        {
          key: 'title',
          label: this.$t('shop_list.day'),
        },
        {
          key: 'start_time',
          label: this.$t('shop_list.open_time'),
        },
        {
          key: 'end_time',
          label: this.$t('shop_list.close_time'),
        },
      ],
    }
  },

  methods: {
    getActiveWorkingDayList() {
      return this.items.filter(item => item.is_active)
    },
  },
}
</script>

<style></style>
