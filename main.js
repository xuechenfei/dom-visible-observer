import visibleObserver from './index.js'

window.onload = function() {
    visibleObserver({
      el: document.getElementById('lazy'),
      threshold: -100,
      show() {
        console.log('show')
      },
      hide() {
        console.log('hide')
      }
    })
}

window.showMask = function() {
    var container = document.querySelector(
        '.mask-container'
    )
    container.style.display = 'block'
    ModalHelper.afterOpen();
    visibleObserver({
        container: document.querySelector(
            '.scroll-container'
        ),
        el: document.getElementById('lazy2'),
        show() {
            console.log('show2')
        },
        hide() {
            console.log('hide2')
        }
    })
}
let ModalHelper = (function(bodyCls) {
    let scrollTop // 在闭包中定义一个用来保存滚动位置的变量
    return {
        afterOpen: function() {
            //弹出之后记录保存滚动位置，并且给body添加.modal-open
            scrollTop =
                document.scrollingElement
                    .scrollTop
            document.body.classList.add(bodyCls)
            document.body.style.top =
                -scrollTop + 'px'
        },
        beforeClose: function() {
            //关闭时将.modal-open移除并还原之前保存滚动位置
            document.body.classList.remove(
                bodyCls
            )
            document.scrollingElement.scrollTop = scrollTop
        }
    }
})('modal-open')

document.write('<h1>Hell Wo</h1>')
