import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.30/vue.esm-browser.min.js'

let productModel = {}
let deleteModel = {}

const App = {
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'sausage',
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: []
      }
    }
  },
  methods: {
    checkLogin() {
      let url = `${this.apiUrl}/api/user/check`
      axios.post(url)
        .then(res => {
          this.getProducts()
        })
        .catch(err => {
          console.dir(err.response)
          alert('登入失敗')
          window.location = 'https://b9111426.github.io/Vue--course-second-week-homework'
        })
    },
    getProducts() {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`
      axios.get(url)
        .then((res) => {
          this.products = res.data.products
          console.log(this.products)
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    openModal(status, product) {
      if (status === 'isNew') {
        this.tempProduct = {
          imagesUrl: []
        }
        productModel.show()
        this.isNew = true
      } else if (status === 'edit') {
        this.tempProduct = { ...product }
        productModel.show()
        this.isNew = false
      }
      else if (status === 'delete') {
        this.tempProduct = { ...product }
        deleteModel.show()
      }
    },
    updateProduct() {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`
      let method = 'post'
      const productData = { data: this.tempProduct }

      if (!this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`
        method = 'put'
      }

      axios[method](url, productData)
        .then((res) => {
          this.getProducts()
          productModel.hide()
        })
    },
    deleteProduct() {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`
      axios.delete(url)
        .then(() => {
          this.getProducts()
          deleteModel.hide()
        })

    },
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    axios.defaults.headers.common.Authorization = token
    this.checkLogin()

    productModel = new bootstrap.Modal(document.getElementById('productModal'), { keyboard: false })
    deleteModel = new bootstrap.Modal(document.getElementById('delProductModal'), { keyboard: false })
  }
}
createApp(App).mount('#app')
