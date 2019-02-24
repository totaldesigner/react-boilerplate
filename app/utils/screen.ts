export function getWindowHeight() {
  return window.innerHeight
  || (document.documentElement && document.documentElement.clientHeight)
  || document.body.clientHeight
}

export function getWindowWidth() {
  return window.innerWidth
  || (document.documentElement && document.documentElement.clientWidth)
  || document.body.clientWidth
}
