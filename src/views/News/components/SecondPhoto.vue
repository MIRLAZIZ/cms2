<template>
  <div
    style="max-width: 100%; min-width: 100%"
    class="d-flex flex-column justify-content-center align-items-center"
  >
    <div
      class="
        d-flex
        align-items-center
        justify-content-center
        main-div
        flex-wrap
      "
    >
      <span class="second-photo-span m-50 w-100" v-if="photos == 0">{{
        $t('shop_list.images')
      }}</span>
      <span v-else></span>
      <div
        v-for="(photo, index) in photos"
        :key="index"
        class="d-flex justify-content-end mx-25 my-25 photo"
      >
        <feather-icon
          icon="XIcon"
          class="trash-icon"
          size="18"
          @click="deleteFile(photo, index)"
        /><br />

        <BImg
          class="img"
          :src="photo.image"
          style="max-width: 150px; max-height: 90px"
        />
      </div>
    </div>
    <BRow class="d-flex align-items-center justify-content-center mt-1">
      <div>
        <BButton
          onclick="secondPhotosUpload.click()"
          class="d-flex button_images mt-50"
          >{{ $t('shop_list.select_images') }}</BButton
        >
        <!-- <feather-icon icon="PlusIcon" class="plusIcon" size="40" /> -->

        <BFormFile
          id="secondPhotosUpload"
          style="display: none"
          multiple
          @input="fileInput"
        />
        <!-- v-model="images" -->
      </div>
    </BRow>
  </div>
</template>

<script>
import { BImg, BFormFile, BButton, BRow } from 'bootstrap-vue'
import { mapActions } from 'vuex'

export default {
  components: {
    BImg,
    BFormFile,
    BButton,
    BRow,
  },
  data() {
    return {
      photos: [],
    }
  },
  props: {
    images: {
      type: Array,
      default() {
        return []
      },
    },
  },
  watch: {
    images: {
      // прослуска событий внутри массивов и объектов
      handler() {
        this.photos = this.images
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions('news', ['DELETE_SECOND_PHOTO']),
    emitUpdate() {
      this.$emit('update:images', this.photos)
    },
    deleteFile(file, index) {
      let id = file.id
      if (file.id) {
        this.DELETE_SECOND_PHOTO(
          // id: file.id,
          id,
        ).then(r => {
            this.$_DeleteToast()
            this.photos.splice(index, 1)
            this.emitUpdate()
            .catch(err => {
            this.$_errorToast()
          })
          })
        } else {
          this.photos.splice(index, 1)
          this.emitUpdate()
        }
      },
    async fileInput(file) {
      let files = []
      if (Array.isArray(file)) {
        files = file
      } else {
        files = [file]
      }

      let RF = _file => {
        return new Promise((resolve, reject) => {
          let reader = new FileReader()
          reader.readAsDataURL(_file)
          reader.onload = e => resolve(e.target.result)
          reader.onerror = e => reject(e)
        })
      }

      for await (let f of files) {
        await RF(f).then(result => {
          this.photos.push({
            id: null,
            image: result,
            binary: f,
          })
        })
      }
      this.emitUpdate()
    },
  },
}
</script>

<style scoped>
.btn_hover {
  transition: all 0.3s linear;
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s linear;
  position: absolute;
}
.plusIcon:hover {
  background: #93a7e8 !important;
  /*#93a7e8 фиолетовый */
  color: white !important;
}
.trash-icon {
  color: rgb(254, 75, 75);
  cursor: pointer;
  position: absolute;
}
.plusIcon {
  color: #93a7e8;
  cursor: pointer;
  position: absolute;
  z-index: 2;
  pointer-events: none;
  border: 1px solid;
  border-radius: 5px;
}

.main-div {
  border: 2px dashed grey;
  background-color: #f4f4f4;
}
.photo {
  border: 0.2px solid grey;
  background-color: #f4f4f4;
}
</style>
