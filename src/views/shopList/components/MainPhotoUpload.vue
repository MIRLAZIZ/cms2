<template>
  <BContainer class="mt-2" style="width: 100%">
    <BRow>
      <BCol class="d-flex justify-content-center">
        <div v-if="photo">
          <BImg id="main_img" rounded :src="photo" thumbnail />
        </div>
        <div
          class="div-photo d-flex justify-content-center align-items-center"
          v-else
        >
          <span class="main-photo mb-2"
            ><strong>{{ $t('shop_list.main_photo') }}</strong></span
          >
        </div>
      </BCol>
    </BRow>
    <BRow class="d-flex justify-content-center">
      <BCol cols="6">
        <div class="d-flex justify-content-center mt-2 mb-1">
          <BButton onclick="mainPhotoUpload.click()">{{
            $t('shop_list.select_main_photo')
          }}</BButton>
          <BFormFile
            id="mainPhotoUpload"
            style="display: none"
            v-model="photo"
            placeholder="Имя файла"
            browseText="Выбрать"
            @input="fileInput"
          />
        </div>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script>
import { mapActions } from 'vuex'
import {
  BFormGroup,
  BImg,
  BAvatar,
  BFormFile,
  BCol,
  BRow,
  BContainer,
  BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BFormGroup,
    BImg,
    BAvatar,
    BFormFile,
    BCol,
    BRow,
    BContainer,
    BButton,
  },
  data() {
    return {
      photo: null,
    }
  },
  props: {
    main_photo: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    main_photo: {
      // прослуска событий внутри массивов и объектов
      handler() {
        this.photo = JSON.parse(JSON.stringify(this.main_photo))
      },
    },
  },
  methods: {
    ...mapActions('shopList', ['ADD_SHOP_LIST']),

    emitUpdate() {
      this.$emit('update:main_photo', this.photo)
    },

    fileInput(file) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => (this.photo = reader.result)
      this.emitUpdate()
    },
  },
}
</script>

<style scoped>
#main_img {
  width: auto;
  height: auto;
  /* max-width: 100%; */
  max-height: 400px;
}
.div-photo {
  width: 100%;
  height: 20em;
  border: 1px solid grey;
  border-radius: 0.3em;
  background-color: #f4f4f4;
}
.main-photo {
  font-size: 2em;
}
</style>
