<template>
  <div>
    <BModal
      id="modal-workHours"
      no-close-on-backdrop
      centered
      :title="$t('shop_list.work_time')"
      :ok-title="$t('shop_list.save')"
      :cancel-title="$t('shop_list.back')"
      @ok="onSubmit"
      @show="setLocaleWeek"
    >
      <BRow
        v-for="(day, index) in localeWeek"
        :key="index"
        class="d-flex justify-content-between mb-1"
      >
        <BCol cols="4" class="d-flex align-items-center">
          <BFormCheckbox v-model="day.is_active" name="check-button" inline>
            {{ day.title[$i18n.locale] }}
          </BFormCheckbox>
        </BCol>
        <BCol class="d-flex">
          <BCol cols="6">
            <BFormTimepicker
              placeholder=""
              :labelCloseButton="$t('shop_list.close')"
              v-if="day.is_active"
              v-model="day.start_time"
            />
            <BFormTimepicker placeholder="" disabled v-else />
          </BCol>
          <BCol cols="6">
            <BFormTimepicker
              placeholder=""
              :labelCloseButton="$t('shop_list.close')"
              v-if="day.is_active"
              v-model="day.end_time"
            />
            <BFormTimepicker placeholder="" disabled v-else />
          </BCol>
        </BCol>
      </BRow>
    </BModal>
    
  </div>
</template>

<script>
import {
  BModal,
  BRow,
  BCol,
  BFormCheckbox,
  BFormTimepicker,
  BFormGroup,
} from 'bootstrap-vue';
import vSelect from 'vue-select';

export default {
  components: {
    BModal,
    BRow,
    BCol,
    BFormCheckbox,
    BFormTimepicker,
    BFormGroup,
    vSelect,
  },
  props: {
    week: {
      type: Array,
      default() {
        return [
          {
            is_active: true,
            title: {ru: '', uz: ''},
            start_time: '',
            end_time: '',
          },
        ];
      },
    },
  },

  data() {
    return {
      workDays: {},
      localeWeek: [],
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.$emit('workDays', this.localeWeek);
    },
    setLocaleWeek() {
      this.localeWeek = JSON.parse(JSON.stringify(this.week));
    },
  },
};
</script>

<style></style>
