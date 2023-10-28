<template>
  <div>
    <b-table
      responsive
      :items="data"
      :fields="fields"
      hover
      class="mb-0 reference-table"
      show-empty
    >
      <template #empty>
        <span class="text-center">{{ $t('Нет данных') }}</span>
      </template>

      <template #head()="props">
        <span>
          {{ $t(props.field.i18n) || props.label }}
        </span>
      </template>

      <slot />

      <template #cell(imgK)="data" v-if="img">
        <div>
          <b-img style="height: 100px" :src="data.value" alt="img" />
        </div>
      </template>

      <template #cell(actions)="data">
        <div>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="warning"
            @click="$emit('editAction', data)"
            size="sm"
          >
            <feather-icon
              icon="EditIcon"
            />
          </b-button>

          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="danger"
            @click="$emit('deleteAction', data.item.id)"
            size="sm"
            class="ml-25"
          >
            <feather-icon
              icon="TrashIcon"
            />
          </b-button>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
  import {
    BCard,
    BTable,
    BAvatar,
    BButton,
    BImg,
  } from 'bootstrap-vue'
  import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
  import Ripple from 'vue-ripple-directive'

  export default {
    props: {
      data: {
        type: Array,
        default: () => [],
      },
      fields: {
        type: Array,
        default: () => [],
      },
      img: {
        type: Boolean,
        default: false,
      },
    },
    components: {
      BCard,
      BTable,
      BAvatar,
      FeatherIcon,
      BButton,
      BImg,
    },
    directives: {
      Ripple,
    },
  }
</script>
