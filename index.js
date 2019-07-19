function LazyLoad({
  el,
  threshold = 0,
  src,
  show,
  hide,
  container = document
}) {
  const init = function(e) {
    let scrollTop = getScrollTop(container)
    let offsetTop = getOffsetTop(el, container)
    let windowHeight = getWindowHeight(container)

    if (scrollTop + windowHeight > offsetTop - threshold) {
      show()
    } else {
      hide()
    }
  }

  container.addEventListener('scroll', init, {
    passive: true
  })

  const destory = () => {
    container.removeEventListener('scroll', init)
  }

  return { destory }
}

function getScrollTop(target) {
  if (target === document) {
    return (
      window.pageYOffset || //用于FF
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    )
  }

  return target.scrollTop
}

function getScrollHeight(elem) {
  if (elem === document) {
    return (
      document.documentElement.scrollHeight ||
      document.body.scrollHeight
    )
  }

  return elem.scrollHeight
}

function getWindowHeight(elem) {
  if (elem === document) {
    return document.documentElement.clientHeight
  }

  return elem.offsetHeight
}

function getOffsetLeft(elem) {
  return elem.offsetParent
    ? elem.offsetLeft + getOffsetLeft(elem.offsetParent)
    : elem.offsetLeft
}

function getOffsetTop(elem, container) {
  if (container.style) container.style.position = 'relative'
  return elem.offsetParent &&
    elem.offsetParent !== container
    ? elem.offsetTop +
        getOffsetTop(elem.offsetParent, container)
    : elem.offsetTop
}

export default LazyLoad
