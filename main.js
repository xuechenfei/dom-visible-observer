import visibleObserver from './index.js'

window.onload = function() {
  LazyLoad({
    el: document.getElementById('lazy'),
    show() {
      console.log('show')
    },
    hide() {
      console.log('hide')
    }
  })
  LazyLoad({
    container: document.querySelector('.scroll-container'),
    el: document.getElementById('lazy2'),
    show() {
      console.log('show2')
    },
    hide() {
      console.log('hide2')
    }
  })
}

document.write('<h1>Hell Wo</h1>')
