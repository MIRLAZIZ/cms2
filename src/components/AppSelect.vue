<template>
  <v-select
    :label="label"
    :reduce="reduce"
    :options="searchText ? localOptions : options.results"
    :getOptionLabel="getOptionLabel"
    :placeholder="placeholder"
    :multiple="multiple"
    v-model="selected"
    @open="onOpen"
    @close="onClose"
    @search="
      (val, loading) => {
        loading(true)
        fetchOptions(val).then(() => loading(false))
      }
    "
    @input="onSelected"
  >
    <template #list-footer>
      <li v-show="options.next" ref="load" class="loader">
        Loading more options...
      </li>
    </template>
  </v-select>
</template>

<script>
  import VSelect from 'vue-select'

  export default {
    props: {
      state: {
        type: [Object, Array],
      },
      autoFetch: {
        type: Boolean,
        default() {
          return true
        },
      },
      label: {
        type: String,
        required: false,
      },
      placeholder: {
        type: String,
        required: false,
        default: '',
      },
      options: {
        type: Object,
        required: false,
        default() {
          return {
            next: null,
            timer: null,
          }
        },
      },
      getOptionLabel: {
        type: Function,
        required: false,
      },
      reduce: {
        type: Function,
        required: false,
        default: v => v,
      },
      multiple: {
        type: Boolean,
        required: false,
        default: false,
      },
      lazyFetchData: {
        type: Function,
        required: false,
      },
      pageSize: {
        type: Number,
        required: false,
        default: 15,
      },
      search: {
        type: Function,
        required: false,
        default() {
          return new Promise((resolve, reject) => {
            setTimeout(() => resolve([]), 100)
          })
        },
      },
      value: {
        type: [Array, Object, String, Number],
      },
      filters: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    data() {
      return {
        observer: null,
        selectLoading: false,
        localOptions: [],
        searchText: '',
        selected: null,
      }
    },
    methods: {
      onOpen() {
        this.$nextTick(() => {
          if (this.$refs.load) {
            this.observer.observe(this.$refs.load)
          }
        })
      },
      onSelected(value) {
        // this.$emit("input", this.selected);
        this.$emit('input', value)
      },
      onClose() {
        this.observer.disconnect()
      },
      fetchOptions(val) {
        this.searchText = val
        if (this.timer) {
          clearTimeout(this.timer)
        }

        return new Promise((resolve, reject) => {
          this.timer = setTimeout(() => {
            if (!this.searchText) {
              return resolve()
            }
            this.lazyFetchData({ ...this.filters, search: val, page_size: 15 })
              .then(data => {
                this.localOptions = data.results
              })
              .finally(() => {
                resolve()
              })
          }, 500)
        })
      },
    },




    mounted() {
      if (!this.options.results.length && this.autoFetch) {
        this.lazyFetchData({ ...this.filters, page_size: 15 })
      }
      this.observer = new IntersectionObserver(
        async ([{ isIntersecting, target }]) => {
          if (!isIntersecting || this.selectLoading) {
            return
          }
          if (!this.options.next) {
            return
          }
          this.selectLoading = true
          const ul = target.offsetParent
          const scrollTop = target.offsetParent.scrollTop
          await this.lazyFetchData({
            ...this.filters,
            page: this.options.next,
            page_size: this.pageSize,
          })
          this.selectLoading = false
          await this.$nextTick()
          ul.scrollTop = scrollTop
        },
      )
      this.selected = this.value
    },
    watch: {
      value(newValue) {
        this.selected = newValue
      },
    },
    components: {
      VSelect,
    },
  }
</script>

<style scoped>
  .loader {
    text-align: center;
    color: #bbbbbb;
  }
</style>
