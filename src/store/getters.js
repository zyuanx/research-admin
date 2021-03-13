const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    username: state => state.user.username,
    nickname: state => state.user.nickname,
    roles: state => state.user.roles,
    permission_routes: state => state.permission.routes,
}
export default getters
