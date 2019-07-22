/**
 * @description: 侦测dom是否在当前可视窗口
 * @param
 *  container 滚动容器
 *  el 侦测的dom
 *  threshold 插值 number类型
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
    const init = function(e) {
        let scrollTop = getScrollTop(container)
        let offsetTop = getOffsetTop(el, container)
        let windowHeight = getWindowHeight(container)

        if (
            scrollTop + windowHeight >
            offsetTop - threshold
        ) {
            show && show()
        } else {
            hide && hide()
        }
    }
    init();

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
    if (container.style)
        container.style.position = 'relative'
    return elem.offsetParent &&
        elem.offsetParent !== container
        ? elem.offsetTop +
              getOffsetTop(elem.offsetParent, container)
        : elem.offsetTop
}

export default visibleObserver
