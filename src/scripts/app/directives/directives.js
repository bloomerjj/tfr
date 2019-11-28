(function() {
    'use strict';

    angular.module('cdmp.directives', [])


    // track-event="['category', 'action', 'label']"
    /*.directive('trackEvent', ['Analytics', '$parse',
        function (Analytics, $parse) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var eventType = attrs.trackEventType || 'click';

                    element.on(eventType + '.ga', function(event) {

                        console.log("TRACKING AN EVENT of type " + eventType);

                        // Array is ordered as such:
                        // [category, action, label, value]
                        var trackArray;

                        try {
                            trackArray = scope.$eval(attrs.trackEvent);

                        } catch (exception) {
                            // something messed up
                            trackArray = null;
                        }

                        if (trackArray) {
                            ga('send', 'event', trackArray[0], trackArray[1], trackArray[2]);
                            // Analytics.trackEvent.apply(this, trackArray);
                        }
                    });

                    scope.$on('$destroy', function() {
                        element.off('.ga');
                    });

                }
            };
        }
    ])*/

    .directive('trackEvent', ['Analytics', '$parse',
        function (Analytics, $parse) {
          return {
            restrict: 'A',
            link: function (scope, element, attrs) {

              var options = $parse(attrs.trackEvent);
              var getHref = (attrs.href);
              var target = (attrs.target);

              element.bind('click', function (e) {

                if(attrs.trackEventIf){
                  if(!scope.$eval(attrs.trackEventIf)){
                    return; // Cancel this event if we don't pass the ga-track-event-if condition
                  }
                }

                console.log("TrackEvent Directive : Options sent to track thing => " + options(scope) );
                if (options.length > 1) {

                  console.log("TrackEvent Directive : CALLING FUNCTION" );

                  Analytics.trackEvent.apply(Analytics, options(scope));

                  if(typeof getHref !== 'undefined' ) {
                    e.preventDefault();

                    setTimeout(function(){
                        if (target === '_blank') {
                            window.open(getHref);
                        }else{
                            window.location = getHref;
                        }
                    }, 500);
                  }
                }
              });
            }
          };
        }
    ])

    .directive('showFocus', ['$timeout',
        function($timeout) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    var timeout;

                    scope.$watch(attrs.showFocus, function(newValue, oldValue) {

                        if (newValue) {

                            $timeout.cancel(timeout);

                            // something is bluring it, setting timeout to 150
                            timeout = $timeout(function() {
                                element.focus();
                            }, 150);
                        }

                    });
                }
            };
        }
    ])

    .directive('mobiscroll', ['$rootScope', '$window', '$timeout', 'moment',
        function($rootScope, $window, $timeout, moment) {
            return {
                restrict: 'A',
                require: 'ngModel',
                // scope: true,
                link: function(scope, element, attrs, ctrl) {

                    scope.subtract = function(number, period) {
                        return moment().subtract(number, period).toDate();
                    };

                    scope.add = function(number, period) {
                        return moment().add(number, period).toDate();
                    };

                    scope.today = function() {
                        return new Date();
                    };

                    scope.yesterday = function() {
                        return moment().subtract(1, 'days').toDate();
                    };

                    scope.tomorrow = function() {
                        return moment().add(1, 'days').toDate();
                    };

                    var maxDate = scope.$eval(attrs.maxDate) || null;
                    var minDate = scope.$eval(attrs.minDate) || null;

                    var watcher;

                    element
                        .mobiscroll()
                        .calendar({
                            animate: false,
                            buttons: [],
                            closeOnSelect: false,
                            context: '.injector--mobiscroll',
                            focusOnClose: false,
                            maxDate: maxDate,
                            minDate: minDate,
                            scrollLock: false,
                            tap: false,
                            theme: 'mobiscroll',
                            lang: $rootScope.lang,
                            onBeforeShow: function(inst) {

                                if (scope.mq.sm) {
                                    inst.settings.display = 'bottom';
                                } else {
                                    inst.settings.display = 'modal';
                                }

                                if (moment(ctrl.$viewValue, $rootScope.dateFormat).isValid()) {
                                    inst.setDate(moment(ctrl.$viewValue, $rootScope.dateFormat).toDate());
                                }

                                $('.injector--mobiscroll').addClass('open');

                                angular.element($window)
                                    .on('resize.mobiscroll', function(e) {
                                        element.mobiscroll('position', true);
                                    })
                                    .on('orientationchange.mobiscroll', function(e) {
                                        element.mobiscroll('cancel');
                                    });

                            },
                            onShow: function(html, valueText, inst) {

                                // Remove the selected state from the button if there is no date value yet

                                if (!inst.getValues()[0]) {
                                    $('.dw-cal-day.dw-sel', html).removeClass('dw-sel');
                                }

                            },
                            onClose: function(valueText, btn, inst) {

                                $('.injector--mobiscroll').removeClass('open');

                                angular.element($window).off('.mobiscroll');

                                element.trigger('blur');

                            }

                        });

                    element.siblings('.icon, .blocker').on('click.mobiscroll', function(e) {
                        if (!element.is(':disabled')) {
                            element.mobiscroll('show');
                        }
                    });

                    // Only way i could get mobiscroll to do a timeout delay.

                    scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                        if (newValue === oldValue) {
                            return;
                        }

                        if (element.mobiscroll('isVisible')) {

                            $timeout(function() {
                                element.mobiscroll('select');
                            }, 0);

                        }
                    });

                    scope.$watch('mq.sm', function(newValue, oldValue) {
                        element.mobiscroll('cancel');
                    });

                    scope.$on('$destroy', function(e) {
                        element.mobiscroll('destroy');
                        element.siblings('.icon, .blocker').off('.mobiscroll');
                    });
                }
            };
        }
    ])

    .directive('uppercase', ['_',
        function(_) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ctrl) {

                    // View -> Model
                    ctrl.$parsers.push(function(data) {

                        if (!data) {
                            return;
                        }

                        return data.toUpperCase();

                    });

                    // Model -> View
                    ctrl.$formatters.push(function(data) {

                        if (!data) {
                            return;
                        }

                        return data.toUpperCase();

                    });
                }
            };
        }
    ])

    .directive('lowercase', ['_',
        function(_) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ctrl) {

                    // View -> Model
                    ctrl.$parsers.push(function(data) {

                        if (!data) {
                            return;
                        }

                        return data.toUpperCase();

                    });

                    // Model -> View
                    ctrl.$formatters.push(function(data) {

                        if (!data) {
                            return;
                        }

                        return data.toLowerCase();

                    });
                }
            };
        }
    ])

    .directive('capitalize', ['_',
        function(_) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ctrl) {

                    // View -> Model
                    ctrl.$parsers.push(function(data) {

                        if (!data) {
                            return;
                        }

                        return data.toUpperCase();

                    });

                    // Model -> View
                    ctrl.$formatters.push(function(data) {

                        if (!data) {
                            return;
                        }

                        return _.map(data.split(' '), function(val) {
                            return _.capitalize(val.toLowerCase());
                        }).join(' ');

                    });
                }
            };
        }
    ])

    .directive('equals', [
        function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ctrl) {

                    scope.$watchCollection('[' + attrs.ngModel + ',' + attrs.equals + ']', function(newValue, oldValue) {
                        ctrl.$setValidity('equals', newValue[0] && newValue[1] && newValue[0] === newValue[1]);
                    });
                }
            };
        }
    ])

    .directive('initModel', ['safeApply',
        function(safeApply) {
            return {
                priority: 450,
                restrict: 'A',
                require: 'ngModel',
                compile: function() {
                    return {
                        pre: function(scope, element, attrs, ctrl) {

                            if (attrs.initModel) {
                                scope.$eval(attrs.ngModel + ' = ' + attrs.initModel);
                            } else {
                                scope.$eval(attrs.ngModel + ' = undefined');
                            }

                        },
                        post: function(scope, element, attrs, ctrl) {

                            // if (attrs.initModel) {

                            //     safeApply(function() {
                            //         ctrl.$setViewValue(scope.$eval(attrs.initModel));
                            //         ctrl.$render();
                            //     }, scope);

                            // }

                        }
                    };
                }
            };
        }
    ])

    .directive('disableWhen', ['safeApply', '$timeout',
        function(safeApply, $timeout) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    scope.$watch(function() {

                        return scope.$eval(attrs.disableWhen);

                    }, function(newValue, oldValue) {

                        if (newValue === true) {

                            element.on('focus.disableWhen', 'input, button, select', function(e) {

                                if (scope.$eval(attrs.disableWhen)) {
                                    $(e.currentTarget).blur();
                                }

                            });

                            element.on('keypress.disableWhen', 'input, button, select', function(e) {

                                if (scope.$eval(attrs.disableWhen)) {
                                    e.preventDefault();
                                }

                            });

                        } else {

                            element.off('.disableWhen');

                        }

                    });
                }
            };
        }
    ])

    .directive('resetWhen', ['safeApply', '$timeout',
        function(safeApply, $timeout) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ctrl) {

                    scope.$watch(function() {

                        return scope.$eval(attrs.resetWhen);

                    }, function(newValue, oldValue) {

                        // Needed to add an initialized variable to the scope
                        // The controller sometimes sets the data in the user is logged in

                        if (newValue === true) {

                            if (scope.$eval('initialized')) {

                                $timeout(function() {
                                    if (attrs.resetTo) {
                                        scope.$eval(attrs.ngModel + ' = ' + attrs.resetTo);
                                    } else {
                                        scope.$eval(attrs.ngModel + ' = undefined');
                                    }
                                });
                            }
                        }
                    });

                }
            };
        }
    ])

    // All global stuff
    .directive('primeDirective', ['$rootScope', '$window', '$document', '$timeout', '$interval', 'safeApply', 'bowser',
        function($rootScope, $window, $document, $timeout, $interval, safeApply, bowser) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    // Keyboard fix

                    var interval;
                    var oldHeight;
                    var scrollTop;

                    function opened() {
                        // console.log('opened');

                        $interval.cancel(interval);

                        oldHeight = window.innerHeight;

                        interval = $interval(intervalHandler, 500);

                        $document.find('html').addClass('keyboard-open');

                        // scrollTop = angular.element($window).scrollTop();

                    }

                    function closed() {
                        // console.log('closed');

                        $interval.cancel(interval);

                        oldHeight = 0;

                        $document.find('html').removeClass('keyboard-open');

                        // angular.element($window).scrollTop(scrollTop);

                    }

                    function intervalHandler() {
                        // console.log('intervalHandler');

                        if (oldHeight === 0) {
                            return;
                        }

                        var newHeight = window.innerHeight;
                        var diff = Math.abs(oldHeight - newHeight);
                        var perc = Math.round((diff / oldHeight) * 100);

                        if (newHeight > oldHeight) {
                            closed();
                        } else {
                            oldHeight = newHeight;
                        }
                    }

                    element.on('click.keyboardFix focus.keyboardFix', 'input:not([type="checkbox"]):not([type="radio"])', function(e) {
                        if (scope.mq.sm) {
                            opened();
                        }
                    });

                    element.on('blur.keyboardFix', 'input:not([type="checkbox"]):not([type="radio"])', function(e) {
                        if (scope.mq.sm) {
                            closed();
                        }
                    });

                    angular.element($window).on('orientationchange.keyboardFix', function(e) {
                        if (scope.mq.sm) {
                            angular.element(document.activeElement).blur();
                        }
                    });

                    scope.$watch('mq.sm', function(newValue, oldValue) {
                        if (newValue === false && newValue !== oldValue) {
                            closed();
                        }
                    });

                    // Fixed position scroll fix

                    var windowScrollLeft = angular.element($window).scrollLeft();

                    angular.element('.scroll-fix').scrollLeft(windowScrollLeft);

                    angular.element($window).on('scroll.scrollFix', function(e) {

                        var scrollLeft = angular.element(this).scrollLeft();

                        if (scrollLeft !== windowScrollLeft) {

                            angular.element('.scroll-fix').scrollLeft(scrollLeft);

                            windowScrollLeft = scrollLeft;
                        }

                    });

                    scope.$on('$destroy', function() {
                        closed();
                        element.off('.keyboardFix');
                        angular.element($window).off('.keyboardFix, .scrollFix');
                    });

                    // IE8 tab fix

                    if (bowser.msie === true && parseInt(bowser.version, 10) === 8) {

                        element.on('keydown.ie8TabFix', 'input, textarea, select, button', function(e) {
                            if (e.which === 9) {
                                e.preventDefault();
                            }
                        });

                        scope.$on('$destroy', function() {
                            element.off('keydown.ie8TabFix');
                        });

                    }

                }
            };
        }
    ])

    .directive('toggleParentClass', ['$document',
        function($document) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    element.on('click.toggleParentClass', function(e) {
                        element.parent().toggleClass(attrs.toggleParentClass);
                    });

                    scope.$on('$destroy', function(e) {
                        element.off('.toggleParentClass');
                    });

                }
            };
        }
    ])

    .directive('toggleClass', ['$document',
        function($document) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    element.on('click.toggleClass', function(e) {
                        element.toggleClass(attrs.toggleClass);
                    });

                    scope.$on('$destroy', function(e) {
                        element.off('.toggleClass');
                    });

                }
            };
        }
    ])

    .directive('accordion', ['$rootScope', '$parse', '_',
        function($rootScope, $parse, _) {
            return {
                restrict: 'A',
                scope: true,
                link: function(scope, element, attrs) {

                    var uniqueId = _.uniqueId();

                    var query = _.contains(scope.mq, attrs.accordionQuery) ? attrs.accordionQuery : false;

                    // hacky or clever, you decide.
                    var initialOpen = scope.open = element.hasClass('open');

                    var autoClose = scope.$eval(attrs.accordianAutoclose) ? true : false;

                    element.on('click.accordion', '.accordion__header', function(e) {
                        scope.open = !scope.open;
                        scope.$digest();

                        if (autoClose && scope.open && !scope.mq.sm) {
                            $rootScope.$emit('accordion:opened', {
                                uniqueId: uniqueId
                            });
                        }
                    });

                    if (query) {

                        scope.$watchCollection('[open, mq.' + query + ']', function(newValue, oldValue) {

                            if (newValue[0] === true && newValue[1] === true) {
                                element.addClass('open');
                            } else {
                                element.removeClass('open');
                            }

                        });

                    } else {

                        scope.$watch('open', function(newValue, oldValue) {

                            if (typeof newValue === 'undefined') {
                                return;
                            }

                            if (newValue === true) {
                                element.addClass('open');
                            } else {
                                element.removeClass('open');
                            }
                        });
                    }

                    // // Incase you open them all in sm, and resize to lg
                    // scope.$watch('mq.lg', function(newValue, oldValue) {
                    //     if (newValue === true) {
                    //         scope.open = initialOpen;
                    //     }
                    // });

                    // Reset on breakpoint change
                    scope.$watch('mq', function(newValue, oldValue) {

                        if (newValue === oldValue) {
                            return;
                        }

                        scope.open = initialOpen;

                    }, true);

                    var openListener;

                    if (autoClose) {
                        openListener = $rootScope.$on('accordion:opened', function(event, data) {
                            if (data.uniqueId !== uniqueId && !scope.mq.sm) {
                                scope.open = false;
                                scope.$digest();
                            }
                        });
                    } else {
                        openListener = _.noop;
                    }

                    scope.$on('$destroy', function() {
                        openListener();
                        element.off('.accordion');
                    });

                }
            };
        }
    ])

    .directive('input', ['$rootScope', '$timeout', '_',
        function($rootScope, $timeout, _) {
            return {
                restrict: 'E',
                link: function(scope, element, attrs) {

                    element.on('keyup', function(e) {
                        if (e.which === 13) {
                            element.blur();
                        }
                    });
                }
            };
        }
    ])

    .directive('setType', [
        function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    if (attrs.hasOwnProperty('placeholder')) {
                        // type is set in placeholder directive
                        return;
                    }

                    try {

                        element.attr('type', attrs.setType);

                    } catch (e) {

                        if (attrs.setType === 'password') {

                            element.addClass('font--password');

                            // disable cut/copy/paste

                            element.on('cut copy paste', function(e) {
                                e.preventDefault();
                            });

                        }

                    } finally {

                    }

                }
            };
        }
    ])

    .directive('placeholder', ['$timeout',
        function($timeout) {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function(scope, element, attrs, ctrl) {

                    // Allows us to use 'text' for those browsers that don't allow changing type
                    // But change type for those that support it, IE9
                    var originalType = attrs.setType || attrs.type;

                    // Some browsers do not allow us to change the type, IE8
                    var canChangeType = (function() {

                        var canChange = true;

                        try {

                            element.attr('type', originalType);

                        } catch (e) {

                            canChange = false;

                            if (originalType === 'password') {

                                element.addClass('font--password');

                                // disable cut/copy/paste

                                element.on('cut copy paste', function(e) {
                                    e.preventDefault();
                                });

                            }

                        } finally {

                        }

                        return canChange;

                    })();

                    if ('placeholder' in document.createElement('input') && 'placeholder' in document.createElement('textarea')) {
                        // has native support
                        return;
                    }


                    element.on('focus.placeholder', function(e) {

                        if (element.val() === attrs.placeholder) {

                            element.val('');

                            element.removeClass('placeholder');

                            if (canChangeType) {
                                element.attr('type', originalType);
                            }
                        }
                    });

                    element.on('blur.placeholder', function(e) {

                        if (!element.val()) {

                            element.val(attrs.placeholder);

                            element.addClass('placeholder');

                            if (canChangeType) {
                                element.attr('type', 'text');
                            }
                        }
                    });

                    scope.$on('$destroy', function(e) {
                        element.off('.placeholder');
                    });

                    $timeout(function() {

                        if (!element.val()) {

                            element.val(attrs.placeholder);

                            element.addClass('placeholder');

                            if (canChangeType) {
                                element.attr('type', 'text');
                            }

                        }
                    });

                    if (ctrl) {

                        // View -> Model
                        ctrl.$parsers.push(function(data) {
                            if (!data) {
                                return;
                            }

                            if (data === attrs.placeholder) {
                                element.addClass('placeholder');
                                return;
                            } else {
                                element.removeClass('placeholder');
                            }

                            return data;
                        });

                        // Model -> View
                        ctrl.$formatters.push(function(data) {
                            if (!data) {
                                return;
                            }

                            if (data === attrs.placeholder) {
                                element.addClass('placeholder');
                            } else {
                                element.removeClass('placeholder');
                            }

                            return data;
                        });

                    }
                }
            };
        }
    ])

    .directive('watchHeight', ['$window', 'safeApply',
        function($window, safeApply) {
            return {
                link: function(scope, element, attrs) {

                    // scope.$watch(function() {
                    //     scope[attrs.watchHeight] = element.height();
                    // });

                    safeApply(function() {
                        scope[attrs.watchHeight] = element.height();
                    }, scope);

                    angular.element($window).on('resize.watchHeight', function(e) {
                        safeApply(function() {
                            scope[attrs.watchHeight] = element.height();
                        }, scope);
                    });

                    scope.$on('$destroy', function() {
                        angular.element($window).off('.watchHeight');
                    });
                }
            };
        }
    ])

    .directive('modal', ['$window',
        function($rootScope, $window) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    element.on('click.modal', function(e) {

                        // Check if we're at the desktop breakpoint
                        if (scope.mq.lg) {

                            // Prevent click from redirecting user (if its an anchor)
                            e.preventDefault();

                            var modal = attrs.href.substr(0, attrs.href.lastIndexOf('.')) || attrs.href;

                            // Call show modal function with modal name
                            scope.showModal(modal);

                        }

                    });

                    scope.$on('$destroy', function() {
                        element.off('.modal');
                    });
                }
            };
        }
    ])

    .directive('smClick', ['$parse', 'safeApply',
        function($parse, safeApply) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    var fn = $parse(attrs.smClick);

                    element.on('click.smClick', function(event) {

                        if (scope.mq.sm) {

                            safeApply(fn(scope, {
                                $event: event
                            }), scope);

                        }

                    });

                    scope.$on('$destroy', function() {
                        element.off('.smClick');
                    });
                }
            };
        }
    ])

    .directive('mdClick', ['$parse', 'safeApply',
        function($parse, safeApply) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    var fn = $parse(attrs.smClick);

                    element.on('click.mdClick', function(event) {

                        if (scope.mq.md) {

                            safeApply(fn(scope, {
                                $event: event
                            }), scope);

                        }

                    });

                    scope.$on('$destroy', function() {
                        element.off('.smClick');
                    });
                }
            };
        }
    ])

    .directive('lgClick', ['$parse', 'safeApply',
        function($parse, safeApply) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    var fn = $parse(attrs.lgClick);

                    element.on('click.lgClick', function(event) {

                        if (scope.mq.lg) {

                            safeApply(fn(scope, {
                                $event: event
                            }), scope);

                        }

                    });

                    scope.$on('$destroy', function() {
                        element.off('.lgClick');
                    });
                }
            };
        }
    ])


    .directive('isiTray', ['$parse', 'safeApply',
        function($parse, safeApply) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    scope.isiTrayHidden = false;

                    var determineTargetMarkers = function() {

                        if (scope.mq.lg || scope.mq.xl) {
                            scope.targetMarkers = $('.sticky-footer-marker.desktop');
                        } else {
                            scope.targetMarkers = $('.sticky-footer-marker.mobile');
                        }

                    };

                    var getIsiTrayStatus = function() {


                        // this variable represents whether or not all the markers have been scrolled onto the screen or not.
                        // it will only be false if ALL the target markers are onscreen or above the viewport
                        var someMarkersOffscreen = false;

                        scope.targetMarkers.each(function() {

                            var markerPosition = $(this).offset().top;
                            var windowBottom;

                            if (scope.mq.lg || scope.mq.xl) {
                                windowBottom = $(window).scrollTop() + $(window).height();
                            } else {
                                windowBottom = $(window).scrollTop() + $(window).height() + 150;
                            }

                            if (markerPosition > windowBottom) {
                                someMarkersOffscreen = true;
                            }
                        });

                        // do this outside the each() loop to avoid flashing.
                        scope.isiTrayHidden = !someMarkersOffscreen;

                        scope.$apply();
                    };

                    $(window).on('scroll', function(e) {
                        getIsiTrayStatus();
                        scope.$digest();
                    });

                    $(window).on('resize', function() {

                        determineTargetMarkers();
                        getIsiTrayStatus();
                        scope.$digest();
                    });

                    $(document).ready(function() {
                        determineTargetMarkers();
                        getIsiTrayStatus();
                    });
                }
            };
        }
    ])


    .directive('scrollDownArrow', ['$parse', 'safeApply',
        function($parse, safeApply) {
            return {
                restrict: 'A',
                scope: true,
                link: function(scope, element, attrs) {

                    if (sessionStorage.hideScrollArrow) {
                        $(element).hide();
                    }


                    $(window).on('scroll', function() {
                        $(element).hide(250);

                        sessionStorage.hideScrollArrow = true;
                    });

                }
            };
        }
    ])



    .directive('setDesktopSubnavPosition', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                $(window).load(setLeftOffset);

                $(window).on('resize', setLeftOffset);

                $(element).on('mouseover', setLeftOffset);

                if ($('html').hasClass('eq-ie11')) {

                    // this is a horrible, horrible workaround for the offset being calculated before the font loads in IE11, resulting an incorrect value
                    // I think it is due to IE11 firing the window.load event earlier than other browsers
                    // TODO: figure something out that is less horrible

                    $(window).load(function() {
                        $timeout(function() {
                            console.log('set left offset ie11');
                            setLeftOffset();
                        }, 500);
                    });
                };

                scope.$watch(function() {
                    return element.attr('class');
                }, setLeftOffset);


                function setLeftOffset() {

                    if ($(element).hasClass('current') && (scope.mq.lg || scope.mq.xl)) {

                        var leftOffset = $(element).offset().left - $('.main-nav').offset().left;

                        var paddingAdjust = 20;

                        if ($(element).is(':first-of-type')) {
                            paddingAdjust = 7;
                        }

                        $('.main-nav__sub-level').css('padding-left', leftOffset + paddingAdjust + 'px');
                    }
                }

            }
        };
    }])

    .directive('stickyScroll', [function() {
        return {
            restrict: 'A',
            scope: true,
            link: function(scope, element, attrs) {

                // the scroll top value when the violator bar is in its original position
                var threshold = $('.utility-nav').height();

                var lastScrollTop = 0;

                scope.navOpen = false;

                $(window).scroll( function(e) {

                    var st = $(this).scrollTop();

                    if (!scope.navOpen) {

                        // Scrolling Down
                        if (st > lastScrollTop) {


                            // the threshold allow bar to scroll out of sight when you scroll the page as it would normally
                            if (st > threshold) {

                                scope.showBar = false;

                                // once its out of site we change the position so there's no jump
                                scope.isFixed = true;
                            }

                        // Scrolling Up
                        } else {

                            // console.log('scroll up');

                            scope.showBar = true;

                            // reset the positioning of the bar only at the very top of page
                            // this eliminates the jump since the fixed position is equivalent to the static position
                            if (st === 0) {
                                scope.isFixed = false;
                            }
                        }
                    }

                    scope.$digest();

                    lastScrollTop = st;
                });


                scope.$on('navToggle', function(event, data) {
                    scope.navOpen = scope.isFixed = data.isOpen;
                });
            }
        };
    }])


    // this is unrelated to the above accordion directive.
    .directive('accordionSection', [function() {
        return {
            restrict: 'A',
            scope: true,
            link: function(scope, element, attrs) {

                scope.sectionOpen = false;

                scope.toggleSection = function() {

                    // console.log('al;ksdf;jlaksdjf');

                    scope.sectionOpen = !scope.sectionOpen;
                };

                scope.$on('anchorLink', function(event, data) {

                    console.log('open accordion');

                    if (data.location === attrs.accordionSection) {
                        scope.sectionOpen = true;
                    }
                });
            }
        };
    }])

    .directive('svgColorManagement', [
        function() {
            return {
                restrict: 'C',
                link: function(scope, element, attrs) {
                    var number,
                        selector,
                        colorToFill = '#ce009f',
                        colorToReset = '#f48020';
                    element.bind('mouseenter', function(){
                        //IDENTIFIER
                        number = attrs.number;
                        //NUMBER ELEMENT
                        angular.element('.number'+number).find('svg > circle').attr('fill', colorToFill);
                        //SVG CIRCLES
                        selector = "svg path[fill*='" + colorToReset + "'], svg path[fill*='" + colorToReset.toUpperCase() + "']";
                        angular.element('.icon'+number).find(selector).attr('fill', colorToFill);
                        //TEXT ELEMENTS
                        angular.element('.text-color-changing-'+number).css('color', colorToFill);
                    });
                    element.bind('mouseleave', function(){
                        //IDENTIFIER
                        number = attrs.number;
                        //NUMBER ELEMENT
                        angular.element('.number'+number).find('svg > circle').attr('fill', colorToReset);
                        //SVG CIRCLES
                        selector = "svg path[fill*='" + colorToFill + "'], svg path[fill*='" + colorToFill.toUpperCase() + "']";
                        angular.element('.icon'+number).find(selector).attr('fill', colorToReset);
                        //TEXT ELEMENTS
                        angular.element('.text-color-changing-'+number).css('color', colorToReset);
                    });
                    element.bind('click', function() {
                        switch(attrs.number) {
                            case "1":
                                window.open('https://www.tymloshcp.com/first-and-future-fractures.html', '_blank');
                                break;
                            case "2":
                                window.open('https://www.tymloshcp.com/bone-quality.html', '_blank');
                                break;
                            case "3":
                                window.open('https://www.tymloshcp.com/TYMLOS-vs-placebo.html', '_blank');
                                break;
                        }
                    });
                }
            };
        }
    ])

    .directive('videoPlayer', function() {
            return {
                restrict: 'E',
                link: function(scope, element, attrs) {
                    scope.video = attrs.video;
                    scope.overlay = attrs.overlay;
                    scope.videoId = attrs.videoId;
                },
                template: '<div class="video-player"><video controls preload="auto"><source id="{{videoId}}" src="{{video}}" type="video/mp4"></source></video><img class="video-overlay" src={{overlay}}></div>'
            };
        })

    ;

}).call(this);
