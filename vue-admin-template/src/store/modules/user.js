import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    major: '',
    university: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_MAJOR: (state, major) => {
    state.major = major
  },
  SET_UNIVERSITY: (state, university) => {
    state.university = university
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, identity } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', 'admin-token')//data.token
        setToken('admin-token')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      //getInfo(state.token).then(response => {
      getInfo().then(response => {
        const accountInfo = response.accountInfo
        if (!accountInfo) {
          return reject('Verification failed, please Login again.')
        }
        const { username, identity, university, major } = accountInfo
        let role = ''
        if (identity === 0) { role = 'student' } else { role = 'teacher' }
        const res = {
          username: username,
          roles: [role],
          university: university,
          major: major
        }
        commit('SET_NAME', username)
        commit('SET_MAJOR', major)
        commit('SET_UNIVERSITY', university)
        commit('SET_ROLES', role)
        commit('SET_AVATAR', 'api/load_image')
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

