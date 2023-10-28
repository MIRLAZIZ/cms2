<template>
  <form-wizard
    color="#FFCD00"
    title="Добавить продукт"
    :subtitle="null"
    :finish-button-text="$t('general.save')"
    :back-button-text="$t('general.back')"
    :next-button-text="$t('general.next')"
    class="mb-3 p-2"
    @on-complete="onSubmit(true)"
  >
    <tab-content
      title="Информация о товаре"
      icon="feather icon-shopping-cart"
      :before-change="validationForm1"
    >
      <validation-observer ref="AddProductRef">
        <ProductFormFields :productData="productData" />
      </validation-observer>
      <b-img :src="myimg" />
    </tab-content>

    <tab-content
      title="Фотография товара"
      icon="feather icon-image"
      :before-change="validationForm2"
    >
      <div class="d-flex justify-content-center">
        <draggable
          class="drag-grid"
          @end="dragHandler($event)"
          :move="checkMove"
          :list="productData.product_images"
        >
          <div
            v-for="(item, index) in numberOfPics"
            :key="item"
            class="d-flex justify-content-center"
          >
            <ImageBox
              @handle-fileto-array="handleFileToArray"
              @handle-reset-image="handleResetImage"
              @set-images-empty="setImagesEmpty"
              :index="index"
              :list="productData.product_images"
            />
          </div>
        </draggable>
        <!-- </b-card> -->
      </div>
    </tab-content>

    <tab-content title="Информация о доставка " icon="feather icon-truck">
      <Delivery :items="productData.delivery" :product_id="product_id" />
    </tab-content>
  </form-wizard>
</template>

<script>
  import { BImg } from 'bootstrap-vue'
  import Delivery from './components/Delivery.vue'
  import ProductFormFields from './components/ProductFormFields.vue'
  import ImageBox from './components/ImageBox.vue'
  import draggable from 'vuedraggable'
  import { required } from '@validations'
  import { ValidationObserver } from 'vee-validate'
  import { FormWizard, TabContent } from 'vue-form-wizard'
  import { mapActions, mapGetters } from 'vuex'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'

  export default {
    components: {
      BImg,
      FormWizard,
      TabContent,
      draggable,
      ValidationObserver,
      ProductFormFields,
      Delivery,
      ImageBox,
    },

    data() {
      return {
        required,
        myimg: '',
        numberOfPics: [0, 1, 2, 3, 4, 5],
        product_id: '',
        productData: {
          title: {
            uz: '',
            ru: '',
            eng: '',
          },
          delivery: [],
          brands: '',
          character_category: '',
          category: '',
          status: false,
          product_type: '',
          price: '',
          price_old: '',
          characters: {},
          product_images: [],
          product_description: {
            uz: '',
            ru: '',
            eng: '',
          },
          qqs: '',
        },
      }
    },

    computed: {
      ...mapGetters('knowledgeBase', [
        'GET_CHARACTERS',
        'GET_CHARACTER_CATEGORY',
      ]),
      ...mapGetters('products', ['GET_ONE_PRODUCT']),
    },

    async mounted() {
      this.FETCH_BRANDS()
      this.FETCH_CATEGORIES()
      this.FETCH_PRODUCT_TYPE()

      if (this.$route.params.id) {
        this.FETCH_ONE_PRODUCT(this.$route.params.id).then(res => {

          const {
            title,
            brands,
            category,
            price,
            price_old,
            product_type,
            status,
            images,
          } = this.GET_ONE_PRODUCT

          this.productData.title = { ...title }
          this.productData.brands = brands.id
          this.productData.category = category.id
          this.productData.price = price
          this.productData.price_old = price_old
          this.productData.status = status
          this.productData.product_type = product_type.id
          console.log('images', images)

          for (let key in images) {
            this.getBase64FromUrl(images[key]).then(res =>
              this.productData.product_images.push(res),
            )

            // this.productData.product_images.push(image)
          }
        })
      }
    },

    methods: {
      ...mapActions('products', [
        'CREATE_PRODUCT',
        'FETCH_ONE_PRODUCT',
        'UPDATE_TEMP_PRODUCT',
        'CREATE_TEMP_PRODUCT',
        'FETCH_TEMP_DELIVERY_INFO',
      ]),
      ...mapActions('knowledgeBase', [
        'FETCH_BRANDS',
        'FETCH_CATEGORIES',
        'FETCH_PRODUCT_TYPE',
        'FETCH_CHARACTERS',
        'FETCH_CHARACTER_CATEGORY',
      ]),

      async toFile(value) {
        const data = fetch(value)
        const blob = await data.blob()
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = () => {
          const base64data = reader.result

          return base64data
        }

        // fetch(value)
        //   .then(data => {
        //     data.blob()
        //   })
        //   .then(blob => {
        //     const reader = new FileReader()
        //     reader.readAsDataUrl(blob)
        //     reader.onload = () => {
        //       const base64data = reader.result
        //       return base64data
        //     }
        //   })
      },

      async getBase64FromUrl(url) {
        const data = await fetch(url)
        const blob = await data.blob()
        return new Promise(resolve => {
          const reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onloadend = () => {
            const base64data = reader.result
            resolve(base64data)
          }
        })
      },

      validationForm1() {
        return new Promise((resolve, reject) => {
          this.$refs.AddProductRef.validate().then(success => {
            if (success) {
              resolve(true)
            } else {
              reject()
            }
          })
        })
      },

      validationForm2() {
        return new Promise((resolve, reject) => {
          this.$refs.AddProductRef.validate().then(success => {
            if (success) {
              this.onSubmit(false).then(() => {
                if (this.product_id) {
                  this.FETCH_TEMP_DELIVERY_INFO({
                    product: this.product_id,
                  })
                }
              })
              resolve(true)
            } else {
              reject()
            }
          })
        })
      },

      addAddresss(data) {
        this.productData.delivery.push(data)
      },

      deleteAddress(id) {
        this.productData.delivery = this.productData.delivery.filter(
          item => item.id !== id,
        )
      },

      setImagesEmpty() {
        this.productData.product_images = []
      },

      checkMove(e) {
        if (e.draggedContext.futureIndex == 0 && e.willInsertAfter == true)
          return false

        if (e.draggedContext.index >= this.productData.product_images.length)
          return false
        // else true
      },

      dragHandler(e) {
        let dragElement = this.productData.product_images[e.oldIndex]
        let dragNumber = this.numberOfPics[e.oldIndex]

        this.numberOfPics.splice(e.oldIndex, 1)
        this.numberOfPics.splice(e.newIndex, 0, dragNumber)

        if (!!dragElement) {
          return
        }

        if (!!dragElement) {
          this.productData.product_images.splice(e.oldIndex, 1)
          this.productData.product_images.splice(e.newIndex, 0, dragElement)
        }
      },

      handleResetImage(index) {
        this.productData.product_images.splice(index, 1)

        if (this.productData.product_images.length - 1 > index) {
          for (
            let key = index;
            key < this.productData.product_images.length - 1;
            key++
          ) {
            this.productData.product_images[
              key
            ] = this.productData.product_images[key + 1]
          }
        }
      },

      handleFileToArray(imageData) {
        if (!!imageData) {
          this.productData.product_images.push(imageData)
        }

        console.log(this.productData.product_images)
      },

      async onSubmit(is_send) {
        this.$refs.AddProductRef.validate().then(async success => {
          if (!success) {
            return
          }

          const formData = new FormData()

          formData.append('brands', this.productData.brands)
          formData.append(
            'character_category',
            this.productData.character_category,
          )
          formData.append('category', this.productData.category)
          formData.append('status', this.productData.status)
          formData.append('product_type', this.productData.product_type)
          formData.append('price', this.productData.price)
          formData.append('price_old', this.productData.price_old)
          formData.append('deep_description', '')
          formData.append('qqs', this.productData.qqs),
            formData.append(
              'product_description',
              JSON.stringify(this.productData.product_description),
            )
          formData.append('title', JSON.stringify(this.productData.title))
          formData.append(
            'characters',
            JSON.stringify(this.productData.characters),
          )

          for (let image of this.productData.product_images) {
            formData.append('images', image)
          }

          if (is_send) {
            formData.append('temp_id', this.product_id)
            try {
              if (this.$route.params.id) {
                this.UPDATE_TEMP_PRODUCT({
                  id: this.$route.params.id,
                  ...formData,
                })
              } else {
                this.CREATE_PRODUCT(formData)
              }
              this.$nextTick(() => {
                this.$_successToast(this.$t('success'))
                this.$router.push('/products')
              })
            } catch (err) {
              console.log(err)
              this.$_errorToast(this.$t('error'))
            }
          } else {
            try {
              if (this.product_id) {
                this.UPDATE_TEMP_PRODUCT({ id: this.product_id, ...formData })
              } else {
                const { data } = await this.CREATE_PRODUCT(formData)
                this.product_id = data.id
              }
            } catch (err) {
              console.log(err)
              this.$_errorToast(this.$t('error'))
            }
          }
        })
      },
    },

    watch: {
      'productData.product_type': {
        handler() {
          this.FETCH_CHARACTER_CATEGORY({
            product_type: this.productData.product_type,
          })

          // if (product_type) {
          // }
        },
      },
      'productData.character_category': {
        async handler() {
          let { character_category } = this.productData

          if (character_category) {
            await this.FETCH_CHARACTERS({ character_category })
            const { field_name } = this.GET_CHARACTER_CATEGORY.results.find(
              c => c.id == character_category,
            )

            this.$set(this.productData.characters, field_name, [])

            this.GET_CHARACTERS.results.map(item => {
              this.productData.characters[field_name].push({
                ...item,
                value: '',
              })
            })
          }
        },
      },
    },
  }
</script>

<style scoped>
  .drag-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    grid-template-rows: repeat(2, 1fr);
  }
  @media screen and (max-width: 560px) {
    .drag-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 5px;
      grid-template-rows: repeat(3, 1fr);
    }
  }

  @media screen and (max-width: 450px) {
    .drag-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      grid-gap: 5px;
      grid-template-rows: repeat(6, 1fr);
    }
  }
</style>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-wizard.scss';
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
