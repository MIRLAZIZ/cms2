<template>
  <div>
 
    <p class="clearfix mb-0">
      <span class="float-md-left d-block d-md-inline-block mt-25">
        COPYRIGHT © {{ new Date().getFullYear() }}
        <b-link
          class="ml-25"
          href="http://zk.uz"
          target="_blank"
        >Alraqam company</b-link>, All rights Reserved
      <!-- <span class="d-none d-sm-inline-block">, All rights Reserved</span> -->
      </span>
    </p>
  </div>
</template>

<script>
import { BLink } from 'bootstrap-vue'


export default {
  components: {
    BLink,
  
  }
}
</script>
