<template>
  <div>
    <b-card>
      <b-row>
        <b-col class="col-md-2 ml-auto text-right">
          <b-button
            variant="success"
            @click="$router.push('/pages/add')"
          >
            <feather-icon
              icon="PlusIcon"
            />
            {{ $t('general.add') }}
          </b-button>
        </b-col>

        <b-col class="col-md-12 mt-1">
          <b-table
            :fields="fields"
            :items="GET_PAGES.results"
            show-empty
            responsive
            class="table-bordered"
            :empty-text="$t('empty_text')"
          >
            <template #head()="props">
              <span>{{ $t(props.label) }}</span>
            </template>

            <template #cell(title)="props">
              <span>{{ props.item.title[$i18n.locale] }}</span>
            </template>

            <template #cell(status)="props">
              <b-button
                size="sm"
                :variant="props.item.status === 'done' ? 'gradient-success' : 'gradient-secondary'"
                class="rounded-pill"
              >
                {{ props.item.status === 'done' ? 'Активный' : 'Черновик' }}
              </b-button>
            </template>

            <template #cell(content_visible)="props">
              <b-form-checkbox
                :checked="props.item.content_visible"
                disabled
                class="custom-control-success"
                name="check-button"
                switch
              />
            </template>

            <template #cell(actions)="props">
              <div class="d-flex align-items-center justify-content-center">
                <b-button
                  size="sm"
                  class="mr-1"
                  variant="primary"
                  @click="$router.push(`/pages/${props.item.id}`)"
                >
                  <feather-icon
                    icon="EditIcon"
                    size="15"
                  />
                </b-button>

                <b-button
                  @click="handleDelete(props)"
                  size="sm"
                  class="mr-1"
                  variant="danger"
                >
                  <feather-icon
                    icon="TrashIcon"
                    size="15"
                  />
                </b-button>
              </div>
            </template>

            <template #cell(content)="{value}">
              <div class="text-justify text__just pr-2" v-html="value[$i18n.locale]">
                {{ value }}
              </div>
            </template>
          </b-table>

          <Pagination
            class="mt-2"
            @changePaginationValue="FETCH_PAGES"
            :users_count="GET_PAGES.count"
          />

        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
  import {
    BCard,
    BButton,
    BTable,
    BRow,
    BCol,
    BFormCheckbox,
  } from 'bootstrap-vue'
  import Pagination from '@/components/Pagination'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: {
      BCard,
      BButton,
      BTable,
      BRow,
      BCol,
      BFormCheckbox,
      Pagination,
    },
    data() {
      return {
        fields: [
          {
            label: '№',
            key: 'id',
            thClass: 'text-center',
            tdClass: 'text-center',
          },
          {
            label: 'Страницы',
            key: 'title',
            thClass: 'text-center',
            tdClass: 'text-center',
          },
          {
            label: 'Статус',
            key: 'status',
            thClass: 'text-center',
            tdClass: 'text-center',
          },
          {
            label: 'Отображение',
            key: 'content_visible',
            thClass: 'text-center',
            tdClass: 'text-center',
          },
          {
            label: 'Действия',
            key: 'actions',
            thClass: 'text-center',
            tdClass: 'text-center',
          },
          {
            label: 'Просмотр содержимого',
            key: 'content',
            thClass: 'text-center w-50',
            tdClass: 'text-center w-50',
          },
        ],
      }
    },
    mounted() {
      this.FETCH_PAGES()
    },
    methods: {
      ...mapActions('footerPages', ['FETCH_PAGES', 'DELETE_PAGES']),

      handleDelete(props) {
        this.$_showAreYouSureModal()
          .then(val => {
            if (val) {
              this.DELETE_PAGES(props.item.id)
              .then(() =>{
                this.FETCH_PAGES()
                this.$_successToast(this.$t('success'))
              })
            }
          })
      },
    },
    computed: {
      ...mapGetters('footerPages', ['GET_PAGES']),
    },
  }
</script>

<style>
  .text__just {
    /*width: 400px;*/
    height: 150px;
    margin-bottom: 15px;
    overflow: auto;
  }
</style>
