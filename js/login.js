const App = {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      const url = 'https://vue3-course-api.hexschool.io/v2'
      axios.post(`${url}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
          window.location = './products.html'
        })
        .catch(err => {
          console.dir(err)
          alert(err.data.message)
        })
    }
  }
}
Vue.createApp(App).mount('#app')
