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
      @show="week"
    >
      <BRow
        v-for="(day, index) in week"
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
  // props: {
  //   week: {
  //     type: Array,
  //     default() {
  //       return [
  //         {
  //           is_active: true,
  //           title: '',
  //           start_time: '',
  //           end_time: '',
  //         },
  //       ];
  //     },
  //   },
  // },

  data() {
    return {
      workDays: {},
      localeWeek: [],
      week: [
        {
          is_active: true,
          title:  {ru: 'Понедельник', uz: 'Dushanba'},
          start_time: '00:00:00',
          end_time: '00:00:00',
        },
        {
          is_active: true,
          title:  {ru: 'Вторник', uz: 'Seshanba'},
          start_time: '00:00:00',
          end_time: '00:00:00',
        },
        {
          is_active: true,
          title:  {ru: 'Среда', uz: 'Chorshanba'},
          start_time: '00:00:00',
          end_time: '00:00:00',
        },
        {
          is_active: true,
          title:  {ru: 'Четверг', uz: 'Payshanba'},
          start_time: '00:00:00',
          end_time: '00:00:00',
        },
        {
          is_active: true,
          title:  {ru: 'Пятница', uz: 'Juma'},
          start_time: '00:00:00',
          end_time: '00:00:00',
        },
        {
          is_active: true,
          title:  {ru: 'Суббота', uz: 'Shanba'},
          start_time: '00:00:00',
          end_time: '00:00:00',
        },
        {
          is_active: true,
          title:  {ru: 'Воскресенье', uz: 'Yakshanba'},
          start_time: '00:00:00',
          end_time: '00:00:00',
        },
      ],
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      let times;
      
        times = this.week.filter((item) => item.is_active);

        // times.push(this.workDays);
        // this.workDays = times
        let context = times
      // console.log(this.workDays)
      this.$emit('workDays', context);

      // this.$emit('workDays', this.localeWeek);
    },
    // setLocaleWeek() {
    //   this.localeWeek = JSON.parse(JSON.stringify(this.week));
    // },
  },
};
</script>

<style></style>
