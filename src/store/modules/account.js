/**
 * Created by bingoogolapple on 2017/5/31.
 */
const state = {
  gitHubUsername: 'bingoogolapple',
  weiBoUsername: 'bingoogol'
}

const mutations = {}

const actions = {}

const getters = {
  weiBoUsername: (state) => {
    return state.weiBoUsername
  },
  gitHubUsername: (state) => {
    return state.gitHubUsername
  },
  context: (state) => {
    return `${state.gitHubUsername}/${state.gitHubUsername}.github.io`
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}