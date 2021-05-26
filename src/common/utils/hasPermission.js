import store from '../../store'

export function hasPermiss (permission) {
  const myPermissions = store.getters.permissionList
  var permissstr = ''
  for (var i = 0; i < myPermissions.length; i++) {
    permissstr += myPermissions[i].buttonNo
  }
  return permissstr.indexOf(permission) > -1
}
