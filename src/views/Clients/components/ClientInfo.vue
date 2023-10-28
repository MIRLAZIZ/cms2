<template>
  <div>
    <b-card no-body>
      <b-list-group>
        <b-list-group-item>
          <div class="d-flex justify-content-between">
            <span>
              <feather-icon icon="UsersIcon" size="16" class="mr-75" />
              <span>Фамилия</span>
            </span>
            <span>Michail</span>
          </div>
        </b-list-group-item>
        <b-list-group-item>
          <div class="d-flex justify-content-between">
            <span>
              <feather-icon icon="UsersIcon" size="16" class="mr-75" />
              <span>Имя</span>
            </span>
            <span>Jackson</span>
          </div>
        </b-list-group-item>
        <b-list-group-item>
          <div class="d-flex justify-content-between">
            <span>
              <feather-icon icon="UsersIcon" size="16" class="mr-75" />
              <span>Отчество</span>
            </span>
            <span>Jackson</span>
          </div>
        </b-list-group-item>
        <b-list-group-item>
          <div class="d-flex justify-content-between">
            <span>
              <feather-icon icon="CalendarIcon" size="16" class="mr-75" />
              <span>День рождения</span>
            </span>
            <span>31.12.2022</span>
          </div>
        </b-list-group-item>
        <b-list-group-item>
          <div class="d-flex justify-content-between">
            <span>
              <feather-icon icon="UsersIcon" size="16" class="mr-75" />
              <span>Пол</span>
            </span>
            <span>M</span>
          </div>
        </b-list-group-item>
      </b-list-group>
    </b-card>

    <div class="text-right">
      <b-card no-body>
        <b-list-group>
          <b-list-group-item v-if="state">
            <div class="d-flex justify-content-between">
              <span>
                <feather-icon icon="CreditCardIcon" size="16" class="mr-75" />
                <span>8600 2565 0025 2256</span>
              </span>
            </div>
          </b-list-group-item>
            <b-list-group-item v-else>
            <div class="d-flex justify-content-between">
              <span>
                <feather-icon icon="CreditCardIcon" size="16" class="mr-75" />
              
              </span>
              <span>
                <b-button v-b-modal.add-card-modal size="sm" variant="success">
                  <feather-icon icon="PlusIcon" />
                </b-button>
              </span>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </div>
    <AddCardModal />
    <EditCardModal :item="edit_item" />
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
  } from 'bootstrap-vue'

  import AddCardModal from './addCardModal.vue'
  import EditCardModal from './editCardModal.vue'
  export default {
    data() {
      return {
        edit_item: '',
        state: false
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
      AddCardModal,
      EditCardModal,
    },

    methods: {
      give(item) {
        this.edit_item = item
        console.log(item)
      },

      deleteUser(id) {
        this.$bvModal
          .msgBoxConfirm(this.$t('general.asking'), {
            title: this.$t('confirm'),
            size: 'sm',
            okVariant: 'primary',
            okTitle: this.$t('yes'),
            cancelTitle: this.$t('no'),
            cancelVariant: 'danger',
            hideHeaderClose: false,
            centered: true,
          })
          .then(async value => {
            if (value) {
              try {
                this.$_successToast('Success')
              } catch (err) {
                this.$_errorToast('Error')
              }
            }
          })
      },
    },
  }
</script>
