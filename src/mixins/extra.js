export default {
  methods: {
    $_moneyFormatter(num) {
      return new Intl.NumberFormat('ru-Ru', {
        style: 'currency',
        currency: 'UZS',
      }).format(num)
    },
    $_dateTimeFormatter(date) {
      return new Date(date).toLocaleString()
    },

    $_dateFormatter(date) {
      const a = new Date(date).toLocaleString()
      const b = new Date(date).toLocaleDateString()
      
      return `${a} fdasfs ${b}`
    },
  },
}
