var GPHY_DomainArr = [{ pcDomain: "www.ythuayi.com", mbDomain: "m.ythuayi.com" }];
/**
 * @preserve Tiny-Loader: A small loader that load CSS/JS in best way for page performanceIs.
 * @modify  VinLexn 20170307
 * @version 1.0.1
 * @copyright The Youzan Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */
(function (window, document) {
    "use strict";
    var cssExpr = new RegExp("\\.css");
    var nHead = document.head || document.getElementsByTagName("head")[0];
    var isOldWebKit = +navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i, "$1") < 536;
    function isReady(node) {
        return node.readyState === "complete" || node.readyState === "loaded";
    }
    function loadCss(url, setting, callback) {
        var node = document.createElement("link");
        node.rel = "stylesheet";
        addOnload(node, callback, "css");
        node.async = true;
        node.href = url;
        nHead.appendChild(node);
    }
    function loadJs(url, setting, callback) {
        var node = document.createElement("script");
        node.charset = "utf-8";
        addOnload(node, callback, "js");
        node.async = !setting.sync;
        node.src = url;
        document.body.appendChild(node);
    }
    function pollCss(node, callback) {
        var isLoaded;
        if (node.sheet) {
            isLoaded = true;
        }
        setTimeout(function () {
            if (isLoaded) {
                callback();
            } else {
                pollCss(node, callback);
            }
        }, 20);
    }
    function addOnload(node, callback, type) {
        var supportOnload = "onload" in node;
        var isCSS = type === "css";
        if (isCSS && (isOldWebKit || !supportOnload)) {
            setTimeout(function () {
                pollCss(node, callback);
            }, 1);
            return;
        }
        if (supportOnload) {
            node.onload = onload;
            node.onerror = function () {
                node.onerror = null;
                window._cdnFallback(node);
            };
        } else {
            node.onreadystatechange = function () {
                if (isReady(node)) {
                    onload();
                }
            };
        }
        function onload() {
            node.onload = node.onreadystatechange = null;
            node = null;
            callback();
        }
    }
    function loadItem(url, list, setting, callback) {
        if (!url) {
            setTimeout(function () {
                onFinishLoading();
            });
            return;
        }
        if (cssExpr.test(url)) {
            loadCss(url, setting, onFinishLoading);
        } else {
            loadJs(url, setting, onFinishLoading);
        }
        function onFinishLoading() {
            var urlIndex = list.indexOf(url);
            if (urlIndex > -1) {
                list.splice(urlIndex, 1);
            }
            if (list.length === 0) {
                callback();
            }
        }
    }
    function doInit(list, setting, callback) {
        var cb = function () {
            callback && callback();
        };
        list = Array.prototype.slice.call(list || []);
        if (list.length === 0) {
            cb();
            return;
        }
        for (var i = 0, len = list.length; i < len; i++) {
            loadItem(list[i], list, setting, cb);
        }
    }
    function ready(node, callback) {
        if (isReady(node)) {
            callback();
        } else {
            var timeLeft = 1500;
            var isExecute = false;
            window.addEventListener("load", function () {
                if (!isExecute) {
                    callback();
                    isExecute = true;
                }
            });
            setTimeout(function () {
                if (!isExecute) {
                    callback();
                    isExecute = true;
                }
            }, timeLeft);
        }
    }
    var GPHY_Loader = {
        async: function (list, callback) {
            ready(document, function () {
                doInit(list, {}, callback);
            });
        },
        sync: function (list, callback) {
            ready(document, function () {
                doInit(list, {
                    sync: true
                }, callback);
            });
        }
    };
    window.GPHY_Loader = GPHY_Loader;
    return GPHY_Loader;
})(window, document);
/**
 * @preserve PcUrl Convert To MobUrl
 * @modify  VinLexn 20170307
 * @version 1.0.1
 */
(function () {
    var GP_ISDEBUG = false;
    var reWriteUrl = function (url) {
        var goToUrl = url;
        if (url) {
            var urlPath = window.location.pathname;
            var domainArr = GPHY_DomainArr;
            var urlStr = url.toLowerCase();
            for (var i = 0; i < domainArr.length; i++) {
                if (urlStr.indexOf(domainArr[i].pcDomain) != -1) {
                    try {
                        var pageUrl = document.getElementsByTagName("meta")["page-url"].content;
                        if (GP_ISDEBUG) {
                            console.log(pageUrl);
                        }
                        if (pageUrl != "" && pageUrl != "undefined") {
                            urlPath = pageUrl;
                        }
                    } catch (e) {
                        if (GP_ISDEBUG) {
                            console.log(e);
                        }
                    }
                    goToUrl = domainArr[i].mbDomain + urlPath;
                    break;
                }
            }
            return goToUrl;
        }
    };
    try {
        if (/Android|webOS|iPhone|iPad|Windows Phone|iPod|BlackBerry|SymbianOS|Nokia|Mobile/i.test(navigator.userAgent)) {
            var url = window.location.href;
            if (url.indexOf("?mobile") < 0) {
                try {
                    var toUrl = window.location.protocol + "//" + reWriteUrl(url);
                    window.location.href = toUrl;
                } catch (e) {
                    if (GP_ISDEBUG) {
                        console.log(e);
                    }
                }
            }
        }
    } catch (e) {
        if (GP_ISDEBUG) {
            console.log(e);
        }
    }
})();