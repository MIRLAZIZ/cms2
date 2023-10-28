<template>
  <div>
    <ValidationObserver ref="addShopValidation">
      <BModal
        id="modal-center"
        centered
        :title="$t('shop_list.add_shop')"
        :cancel-title="$t('client.cancel')"
        :ok-title="$t('shop_list.add_shop')"
        @ok.prevent="saveEdit"
      >
        <BFormGroup>
          <label>{{ $t('shop_list.enter_shopname') }}</label>
          <ValidationProvider
            #default="{ errors }"
            :name="$t('shop_list.enter_shopname')"
            rules="required"
          >
            <BFormInput
              id="basicInput"
              :placeholder="$t('shop_list.enter_shopname')"
              v-model="formData.title"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </ValidationProvider>
        </BFormGroup>
      </BModal>
    </ValidationObserver>
  </div>
</template>

<script>
  import { required } from '@validations'
  import { BModal, BFormGroup, BFormInput } from 'bootstrap-vue'
  import { mapActions } from 'vuex'
  export default {
    components: {
      BModal,
      BFormGroup,
      BFormInput,
    },
    data() {
      return {
        required,
        formData: {
          title: '',
          location: {
            lat: 0,
            lng: 0,
          },
        },
      }
    },
    methods: {
      ...mapActions('shopList', ['ADD_SHOP_LIST', 'EDIT_SHOP_LIST']),
      async saveEdit() {
        let success = await this.$refs.addShopValidation.validate()
        if (!success) return
        let {
          title,
          main_photo,
          images,
          location,
          cash,
          region,
          district,
          address,
          work_time,
          phones,
        } = this.formData

        let req = {
          title,
          main_photo,
          images,
          location,
          cash,
          region,
          district,
          address,
          work_time,
          phones,
        }
        this.ADD_SHOP_LIST(req)
          .then(req => {
            this.$_okToast()
            this.$router.push(`/shoplist/edit-shoplist/${req.data.id}`)
          })
          .catch(err => {
            this.$_errorToast()
            console.log(err)
          })
      },
    },
  }
</script>

<style scoped land="scss">
  * ::placeholder {
    color: #c9c9d1;
  }
</style>
