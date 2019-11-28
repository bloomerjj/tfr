/*
    The following scripts are pulled from the previous iteration of the Tymlos HCP website developed by Hangar.

    These were originally modules written in es2015 - they were converted to JS at babeljs.io

*/

'use strict';



(function() {




    // UTILS


    var siteUtils = {
        checkBrowsers: function checkBrowsers(theBrowsers) {
            var sAgent = window.navigator.userAgent;
            var Idx = sAgent.indexOf("MSIE");
            var idWin = sAgent.indexOf("Windows");

            var isAllowedBrowser = false;
            if (theBrowsers == 'IE11') {
                if (!!navigator.userAgent.match(/Trident\/7\./)) {
                    isAllowedBrowser = true;
                }
            } else if (theBrowsers == 'FF') {
                if (!!navigator.userAgent.match(/Firefox/)) {
                    isAllowedBrowser = true;
                }
            } else if (theBrowsers = 'ChromeWin') {
                if (navigator.userAgent.indexOf("Chrome") !== -1 && navigator.userAgent.indexOf("Windows") !== -1) {
                    isAllowedBrowser = true;
                }
            }
            return isAllowedBrowser;
        },
        checkZoom: function checkZoom() {
            var zoom = detectZoom.zoom();
            var device = detectZoom.device();
            var zoomObj = { level: 0, pixelAspect: 0 };

            if (zoom > 0) {
                zoomObj.level = zoom;
                zoomObj.pixelAspect = device;
            }
            return zoomObj;
        },
        checkRatio: function checkRatio() {
            var browserZoomLevel = Math.round(window.devicePixelRatio * 100);
            if (browserZoomLevel > 100) {
                return true;
            }
        }
    };




    // ZOOM



    // this happens before export:


    var _utils = siteUtils;

    var _utils2 = _interopRequireDefault(_utils);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }



    // the follow is in the export:
    var actualAspect = 0;
    var refresh = function refresh(isResize) {

        if (_utils2.default.checkBrowsers('IE11')) {
            var zoomVal = _utils2.default.checkZoom();
            if (isResize) {
                if (actualAspect !== zoomVal.pixelAspect) {
                    actualAspect = zoomVal.pixelAspect;
                    // console.log('Zoom with resize: ', zoomVal.level, 'Aspect: ', zoomVal.pixelAspect);
                    if (zoomVal.level >= 1.25) {
                        $('body').addClass('ie-custom');
                    } else {
                        $('body').removeClass('ie-custom');
                    }
                }
            } else {
                // console.log('Zoom:', zoomVal.level);
                if (zoomVal.level >= 1.25) {
                    $('body').addClass('ie-custom');
                }
            }
        } else if (_utils2.default.checkBrowsers('ChromeWin')) {
            if (_utils2.default.checkRatio()) {
                $('body').addClass('chrome-custom');
            }
        }
    };

    $(document).ready(function () {
        refresh(false);

        $(window).on('resize', function () {
            refresh(true);
        });
    });



})();