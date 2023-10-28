export default {
  methods: {
    $_convertToBase64(element) {
      return new Promise((resolve, reject) => {
        const file = element
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function () {
          resolve(reader.result)
        }
        reader.onerror = error => reject(error)
      })
    },
    $_toFormData(item) {
      const form_data = new FormData()
      // eslint-disable-next-line no-restricted-syntax
      for (const key in item) {
        if (Array.isArray(item[key])) {
          item[key].forEach(e => {
            form_data.append(key, e)
          })
        } else {
          form_data.append(key, item[key])
        }
      }
      // for log results

      // for (const pair of form_data.entries()) {
      //   console.log(`${pair[0]}, ${pair[1]}`)
      // }
      return form_data
    },
    $_objectToFormData(obj, form, namespace) {
      const fd = form || new FormData()
      let formKey
      // eslint-disable-next-line no-restricted-syntax
      for (const property in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(property)) {
          if (namespace) {
            formKey = `${namespace}.${property}`
          } else {
            formKey = property
          }

          // if the property is an object, but not a File,
          // use recursivity.
          if (Array.isArray(obj[property])) {
            obj[property].forEach(e => {
              fd.append(property, e)
            })
          } else if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
            this.$_objectToFormData(obj[property], fd, property)
          } else {
            // if it's a string or a File object
            fd.append(formKey, obj[property])
          }
        }
      }

      return fd
    },
  },
}
