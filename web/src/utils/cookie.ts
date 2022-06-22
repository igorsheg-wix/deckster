export function getCookie(cookieName: string) {
  var name = cookieName + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim()
    if (c.indexOf(name) == 0) {
      return c.substring(name.length)
    }
  }
  return undefined
}
