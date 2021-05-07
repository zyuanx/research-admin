import {
    login,
    logout,
    getInfo
} from "@/api/auth"
import {
    getToken,
    setToken,
    removeToken
} from "@/utils/auth"
import router, {
    resetRouter
} from "@/router"


const state = {
    token: getToken(),
    username: "",
    nickname: "",
    avatar: "",
    roles: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERNAME: (state, username) => {
        state.username = username
    },
    SET_NICKNAME: (state, nickname) => {
        state.nickname = nickname
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    // user login
    login({
        commit
    }, userInfo) {
        const {
            username,
            password
        } = userInfo
        return new Promise((resolve, reject) => {
            login({
                username: username.trim(),
                password: password
            }).then(response => {
                const {
                    data
                } = response
                commit("SET_TOKEN", data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({
        commit
    }) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                const {
                    data
                } = response

                if (!data) {
                    reject("Verification failed, please Login again.")
                }
                // data.user.roles = data.user.roles.map(x => x.title)
                const {
                    username,
                    nickname,
                    avatar,
                    roles,
                } = data.user
                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                    // reject("getInfo: roles must be a non-null array!")
                    reject("无权限")
                }
                commit("SET_USERNAME", username)
                commit("SET_NICKNAME", nickname)
                commit("SET_AVATAR", avatar)
                commit("SET_ROLES", roles)
                resolve(data.user)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({
        commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit("SET_TOKEN", "")
                commit("SET_ROLES", [])
                removeToken() // must remove  token  first
                resetRouter()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({
        commit
    }) {
        return new Promise(resolve => {
            commit("SET_TOKEN", "")
            commit("SET_ROLES", [])
            removeToken() // must remove  token  first
            resolve()
        })
    },
    async changeRoles({
        commit,
        dispatch
    }, role) {
        const token = role + "-token"

        commit("SET_TOKEN", token)
        setToken(token)

        const {
            roles
        } = await dispatch("getInfo")
        resetRouter()

        // generate accessible routes map based on roles
        const accessRoutes = await dispatch("permission/generateRoutes", roles, {
            root: true
        })
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        // reset visited views and cached views
        dispatch("tagsView/delAllViews", null, {
            root: true
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
