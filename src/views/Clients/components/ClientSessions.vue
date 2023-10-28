<template>
  <div>
    <div>
      <!-- <h3 class="h4">Сессии</h3> -->
      <b-card>
        <b-card-title>
          Сессии
        </b-card-title>
        <b-list-group>
          <b-list-group-item>
            <b-row class="align-items-center">
              <b-col cols="4" class="d-flex">
                <!-- <b-avatar
                  src="@/assets/images/icons/android-brands.svg"
                  size="40"
                    
                  class="mr-1 bg-transparent"
                /> -->
                <img src="@/assets/images/icons/android-brands.svg" alt="android-logo" width="45" height="45" class="mr-1">
                <div class="d-flex flex-column justify-column-center">
                  <b>Android</b>
                  <span>192.168.31</span>
                </div>
              </b-col>
              <b-col cols="4" class="text-center">
                <span>18:00</span>
              </b-col>
                <b-col cols="4" class="text-center">
                <span>Tashkent, Uzbekistan</span>
              </b-col>
            </b-row>
          </b-list-group-item>
          <b-list-group-item>
            <b-row class="align-items-center">
              <b-col cols="4" class="d-flex">
                <!-- <b-avatar
                  src="../../../assets/images/icons/windows-brands.svg"
                  size="40"
                  variant="light"
                  class="mr-1 bg-transparent"
                /> -->
                <img src="@/assets/images/icons/windows-brands.svg" alt="windows-logo" width="45" height="45" class="mr-1">
                <div class="d-flex flex-column justify-column-center">
                  <b class="text-center">Windows</b>
                  <span>192.168.31</span>
                </div>
              </b-col>
              <b-col cols="4" class="text-center">
                <span>22:00</span>
              </b-col>
                <b-col cols="4" class="text-center">
                <span>Tashkent, Uzbekistan</span>
              </b-col>
            </b-row>
          </b-list-group-item>
      
        </b-list-group>
      </b-card>
    </div>
  </div>
</template>

<script>
  import {
    BCard,
    BRow,
    BCol,
    BListGroup,
    BListGroupItem,
    BBadge,
    BButton,
    BAvatar,
    BCardTitle,
  } from 'bootstrap-vue'


  export default {
    data() {
      return {
    
      }
    },

    components: {
      BCard,
      BRow,
      BCol,
      BListGroup,
      BListGroupItem,
      BBadge,
      BButton,
      BAvatar,
      BCardTitle,
    },

  }
</script>
