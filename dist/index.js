module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;!function (e, n) {
     true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
        return n(e);
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : n(e, !0);
}(window, function (e, n) {
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
    function visibleObserver(_ref) {
        var _ref$container = _ref.container,
            container = _ref$container === undefined ? document : _ref$container,
            el = _ref.el,
            _ref$threshold = _ref.threshold,
            threshold = _ref$threshold === undefined ? 0 : _ref$threshold,
            show = _ref.show,
            hide = _ref.hide;

        var init = function init(e) {
            var scrollTop = getScrollTop(container);
            var offsetTop = getOffsetTop(el, container);
            var windowHeight = getWindowHeight(container);

            if (scrollTop + windowHeight > offsetTop - threshold) {
                show();
            } else {
                hide();
            }
        };

        container.addEventListener('scroll', init, {
            passive: true
        });

        var destory = function destory() {
            container.removeEventListener('scroll', init);
        };

        return { destory: destory };
    }

    function getScrollTop(target) {
        if (target === document) {
            return window.pageYOffset || //用于FF
            document.documentElement.scrollTop || document.body.scrollTop || 0;
        }

        return target.scrollTop;
    }

    function getScrollHeight(elem) {
        if (elem === document) {
            return document.documentElement.scrollHeight || document.body.scrollHeight;
        }

        return elem.scrollHeight;
    }

    function getWindowHeight(elem) {
        if (elem === document) {
            return document.documentElement.clientHeight;
        }

        return elem.offsetHeight;
    }

    function getOffsetLeft(elem) {
        return elem.offsetParent ? elem.offsetLeft + getOffsetLeft(elem.offsetParent) : elem.offsetLeft;
    }

    function getOffsetTop(elem, container) {
        if (container.style) container.style.position = 'relative';
        return elem.offsetParent && elem.offsetParent !== container ? elem.offsetTop + getOffsetTop(elem.offsetParent, container) : elem.offsetTop;
    }

    return n && (e.visibleObserver = visibleObserver), visibleObserver;
});

/***/ })
/******/ ]);