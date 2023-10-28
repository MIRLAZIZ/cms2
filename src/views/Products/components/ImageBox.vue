<template>
  <div class="image-container" :class="base64Img ? 'item-image' : ''">
    <!-- <b-img :src="list[0]" /> -->
    <!-- <pre>    {{ list[index] }}</pre>
    <pre>{{base64Img}}</pre> -->

    <div
      v-if="base64Img || list[index]"
      :class="index == 0 ? 'main-image' : ''"
    >
      <b-img
        :src="base64Img || list[index]"
        class="product-image cursor-pointer"
        thumbnail
      />
    </div>

    <div v-else :class="index == 0 ? 'main-image' : ''">
      <b-img
        :src="require('@/assets/images/pages/empty.png')"
        class="product-image cursor-pointer"
        thumbnail
      />
    </div>

    <div v-if="index == 0" class="position-absolute lenta-main">
      <b-badge variant="success">Main</b-badge>
    </div>

    <div
      class="button-image2 w-100 d-flex justify-content-between"
      v-if="list.length == index && !base64Img"
    >
      <span class="btn btn-info btn-file form-control">
        <feather-icon icon="PlusIcon" />
        <input type="file" @input="fileAdd" />
      </span>
    </div>

    <div
      class="button-image w-100 d-flex justify-content-between"
      v-if="base64Img || list[index]"
    >
      <span
        class="btn btn-info btn-file form-control btn-warning
      "
      >
        <feather-icon icon="EditIcon" />
        <input type="file" @input="fileChange" />
      </span>
    </div>
  </div>
</template>

<script>
  import { BButton, BBadge, BImg } from 'bootstrap-vue'

  export default {
    components: {
      BImg,
      BBadge,
      BButton,
    },

    data() {
      return {
        base64Img: '',
      }
    },
    props: {
      index: {
        type: Number,
        required: true,
      },

      list: {
        type: Array,
        required: true,
      },
    },

    mounted() {
      this.$emit('set-images-empty')

      // const reader = new FileReader()

      // reader.readAsDataURL(this.list[this.index])
      // reader.onload = () => (this.base64Img = reader.result)
      // reader.onerror = error => console.error(error)
    },

    methods: {
      handleReset(index) {
        this.base64Img = ''
        this.$emit('handle-reset-image', index)
      },

      fileChange(e) {
        this.handleReset()
        this.$emit('handle-fileto-array', e.target.files[0])

        const reader = new FileReader()
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0])
          reader.onload = () => (this.base64Img = reader.result)
          reader.onerror = error => console.error(error)
        }
      },

      fileAdd(e) {
        this.$emit('handle-fileto-array', e.target.files[0])

        console.log('EVENT', e)

        const reader = new FileReader()
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0])
          reader.onload = () => (this.base64Img = reader.result)
          reader.onerror = error => console.error(error)
        }
      },
    },
  }
</script>

<style scoped>
  .product-image {
    object-fit: fill;
    width: 240px;
    height: 200px;
  }
  .product-image:hover {
    opacity: 0.8;
  }

  .image-container {
    position: relative;
    width: 240px;
    height: 200px;
  }

  .main-image {
    position: absolute;
    /* border: 10px solid #FFCD00; */
  }

  .button-image2 {
    position: absolute;
    bottom: 0;
  }

  .button-image {
    position: absolute;
    bottom: 0;
    display: none !important;
  }

  .lenta-main {
    bottom: top;
  }

  .btn-file {
    position: relative;
    overflow: hidden;
  }
  .btn-file input[type='file'] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    background: white;
    cursor: inherit;
    display: block;
  }

  @media screen and (max-width: 992px) {
    .image-container {
      width: 160px;
      height: 120px;
    }

    .product-image {
      object-fit: fill;
      width: 160px;
      height: 120px;
    }
  }
</style>

<style lang="scss">
  .image-container {
    &:hover {
      .button-image {
        display: flex !important;
      }
    }
  }
</style>
