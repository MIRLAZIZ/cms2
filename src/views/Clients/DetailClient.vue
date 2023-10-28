<template>
  <div>
    <b-row>
      <b-col cols="3">
        <ClientInfo />
      </b-col>
      <b-col cols="6">
        <ClientRight />
      </b-col>
      <b-col cols="3">
        <ClientSessions />
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import { BRow, BCol, BCard } from 'bootstrap-vue'

  import ClientInfo from './components/ClientInfo.vue'
  import ClientRight from './components/ClientRight.vue'
  import ClientSessions from './components/ClientSessions.vue'
  export default {
    components: {
      BRow,
      BCol,
      BCard,
      ClientInfo,
      ClientRight,
      ClientSessions
    },
  }
</script>
