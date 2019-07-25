/**
 * @description: 侦测dom是否在当前可视窗口
 * @param
 *  container 滚动容器
 *  el 侦测的dom
 *  threshold 差值 number类型
 *  show 当el显示在当前可视窗口时的回调函数
 *  hide 当el不在当前可视窗口时的回调函数
 * @return
 *  destory 取消此次侦测
 */
function visibleObserver({
    container = document,
    el,
    threshold = 0,
    show,
    hide
}) {
    const init = throttle(function(e) {
        let scrollTop = getScrollTop(container)
        let offsetTop = getOffsetTop(el, container)
        let offsetHeight = el.offsetHeight
        let windowHeight = getWindowHeight(container)

        if (
            scrollTop + windowHeight >
                offsetTop - threshold &&
            offsetTop + offsetHeight + threshold > scrollTop
        ) {
            show && show()
        } else {
            hide && hide()
        }
    }, 100)
    init()

    container.addEventListener('scroll', init, {
        passive: true
    })

    const destroy = () => {
        container.removeEventListener('scroll', init)
    }

    return { destroy }
}

function throttle(func, wait) {
    let lastTime = null
    let timeout
    return function() {
        let context = this
        let now = new Date()
        if (now - lastTime - wait > 0) {
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            func.apply(context, arguments)
            lastTime = now
        } else if (!timeout) {
            timeout = setTimeout(() => {
                // 改变执行上下文环境
                func.apply(context, arguments)
            }, wait)
        }
    }
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
    return elem.offsetParent &&
        elem.offsetParent !== container
        ? elem.offsetTop +
              getOffsetTop(elem.offsetParent, container)
        : elem.offsetTop
}

export default visibleObserver
