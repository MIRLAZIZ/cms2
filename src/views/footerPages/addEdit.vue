<template>
  <div>
    <b-card>
      <b-tabs>
        <b-tab
          active
          title="RU"
        >
          <div style="width: 250px" class="my-2">
            <label>Название страницы</label>
            <b-form-input
              v-model="lang.title.ru"
            />
          </div>

          <quill-editor
            v-model="lang.content.ru"
          />
        </b-tab>

        <b-tab
          title="UZ"
        >
          <div style="width: 250px" class="my-2">
            <label>Название страницы</label>
            <b-form-input
              v-model="lang.title.uz"
            />
          </div>

          <quill-editor
            v-model="lang.content.uz"
          />
        </b-tab>

        <b-tab
          title="O`Z"
        >
          <div style="width: 250px" class="my-2">
            <label>Название страницы</label>
            <b-form-input
              v-model="lang.title.oz"
            />
          </div>

          <quill-editor
            v-model="lang.content.oz"
          />
        </b-tab>
      </b-tabs>


      <div class="d-flex align-items-center justify-content-between mt-1">
        <div>
          <label>Отображение</label>
          <b-form-checkbox
            v-model="lang.content_visible"
            class="custom-control-success"
            name="check-button"
            switch
          />
        </div>

        <div>
          <b-button
            @click="draftSubmit"
            :variant="$route.params.id ? 'primary' : 'secondary'"
          >
            Черновик
          </b-button>

          <b-button
            @click="onSubmit"
            :variant="$route.params.id ? 'warning' :'success'"
            class="ml-1"
          >
            Сохранить
          </b-button>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
  import {
    BCard,
    BTab,
    BButton,
    BTabs,
    BFormInput,
    BFormCheckbox,
  } from 'bootstrap-vue'
  import { quillEditor } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: {
      quillEditor,
      BCard,
      BTab,
      BTabs,
      BButton,
      BFormInput,
      BFormCheckbox,
    },
    data() {
      return {
        lang: {
          content_visible: false,
          title: {
            uz: '',
            ru: '',
            oz: '',
          },
          content: {
            uz: '',
            ru: '',
            oz: '',
          },
        },
      }
    },

    mounted() {
      if (this.$route.params.id) {
        this.FETCH_PAGES_ID(this.$route.params.id)
          .then(() => {
            const {
              content_visible,
              title,
              content,
            } = this.GET_PAGES_ID

            this.lang.content_visible = content_visible
            this.lang.title = title
            this.lang.content = content
          })
      }
    },

    methods: {
      ...mapActions('footerPages', ['CREATE_PAGES', 'FETCH_PAGES', 'FETCH_PAGES_ID', 'UPDATE_PAGES']),

      onSubmit() {
        if (this.$route.params.id) {
          this.UPDATE_PAGES({
            id: this.$route.params.id,
            status: 'done',
            ...this.lang,
          })
            .then(() => {
              this.FETCH_PAGES()
              this.$router.push('/pages')
              this.$_successToast('success')
            })
        } else {
          this.CREATE_PAGES({
            status: 'done',
            ...this.lang,
          })
            .then(() => {
              this.FETCH_PAGES()
              this.$router.push('/pages')
              this.$_successToast('success')
            })
        }
      },

      draftSubmit() {
        if (this.$route.params.id) {
          this.UPDATE_PAGES({
            id: this.$route.params.id,
            status: 'draft',
            ...this.lang,
          })
            .then(() => {
              this.FETCH_PAGES()
              this.$router.push('/pages')
              this.$_successToast('success')
            })
        } else {
          this.CREATE_PAGES({
            status: 'draft',
            ...this.lang,
          })
            .then(() => {
              this.FETCH_PAGES()
              this.$router.push('/pages')
              this.$_successToast('success')
            })
        }
      },
    },

    computed: {
      ...mapGetters('footerPages', ['GET_PAGES_ID']),
    },
  }
</script>

<style scoped>

</style>
