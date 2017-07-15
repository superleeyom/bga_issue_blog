import Vue from 'vue'
import axios from 'axios'
import {
  Pagination,
  Input,
  Tag,
  Card,
  Loading,
  Message,
  Table,
  TableColumn,
  Row,
  Col
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Input)
Vue.use(Tag)
Vue.use(Card)
Vue.use(Loading)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.component(Message.name, Message)
Vue.prototype.$message = Message

import lodash from 'lodash'
import moment from 'moment'
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/github.css'
import 'github-markdown-css/github-markdown.css'

import App from './App'
import store from './store'
import router from './router'
import './css/main.css'

import {gitHubApi, isGetLabelsUrl} from './utils'
import {showMessage, successMessage, errorMessage, warningMessage, infoMessage} from './utils/toastUtil'

Vue.prototype._ = lodash
moment.locale('zh-cn')
Vue.prototype.$moment = moment
Vue.prototype.$http = axios
Vue.prototype.$highlight = highlight
Vue.prototype.$showMessage = showMessage
Vue.prototype.$successMessage = successMessage
Vue.prototype.$errorMessage = errorMessage
Vue.prototype.$warningMessage = warningMessage
Vue.prototype.$gitHubApi = gitHubApi
Vue.prototype.$infoMessage = infoMessage

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return Vue.prototype.$highlight.highlightAuto(code).value
  }
})
Vue.prototype.$marked = marked

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

let loadingInstance

// request拦截器
axios.interceptors.request.use((config) => {
  let isGetLabels = config && config.url === `https://api.github.com/repos/${vm.$store.getters.context}/labels`
  if (!isGetLabels) {
    loadingInstance = Loading.service({
      text: '拼命加载中...'
    })
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// response拦截器
axios.interceptors.response.use((response) => {
  let isGetLabels = isGetLabelsUrl(vm, response.config)
  if (isGetLabels) {
    return response
  } else {
    setTimeout(() => {
      loadingInstance.close()
    }, 500)
    return response
  }
}, (error) => {
  let isGetLabels = isGetLabelsUrl(vm, error.config)
  if (!isGetLabels) {
    loadingInstance.close()
    console.error('response', JSON.stringify(error))

    if (error.response && error.response.statusText) {
      vm.$errorMessage(error.response.status + ' ' + error.response.statusText)
    }
  }

  return Promise.reject(error.response)
})
