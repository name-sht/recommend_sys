const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  university: state => state.user.university,
  major: state => state.user.major,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes
}
export default getters
