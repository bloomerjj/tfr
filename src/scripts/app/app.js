(function() {
    'use strict';
    //Running simple bar script
    new SimpleBar(document.getElementById('scroll-wrapper'));

    angular.module('cdmp', ['cdmp.services', 'cdmp.controllers', 'cdmp.directives', 'cdmp.filters', /*'ngRoute',*/ 'ngSanitize', /*'ngCookies',*/ 'matchmedia-ng', 'duScroll', 'ngMask', 'rcMailgun', 'templates'])

    .config(['AnalyticsProvider',
        function(AnalyticsProvider) {

            // Setup Analytics
            var isProd = /www.tymloshcp.com$/i.test(window.location.host);

            if (isProd) {

                AnalyticsProvider.setAccount([{
                    tracker: 'UA-96389313-1',
                    name: 'default',
                    trackEvent: true
                }]);

            } else {

                AnalyticsProvider.setAccount([{
                    tracker: 'UA-103195825-1',
                    name: 'default',
                    trackEvent: true
                }
                // ,
                // {
                //     tracker: 'UA-100965381-1',
                //     name: 'defaultCDM',
                //     trackEvent: true
                // }
                ]);

                // Turn on to load debug version of analytics (prints a lot of stuff to the console)
                // AnalyticsProvider.enterDebugMode(true);
            }

            // Track all routes (default is true).
            AnalyticsProvider.trackPages(true);

            // Use ga.js (classic) instead of analytics.js (universal)
            // By default, universal analytics is used, unless this is called with a falsey value.
            AnalyticsProvider.useAnalytics(true);

            // set to true when using angular routing
            AnalyticsProvider.ignoreFirstPageLoad(false);

            // TODO: UPDATE ME TO THE LATEST VERSION OF ANGULAR-ANALYTICS
            // CDMP Internal GA Code: UA-36227063-2


        }
    ])

    .run(['$rootScope',

        function($rootScope) {

            // master init stuff relevant to the whole app

        }
    ]);

}).call(this);
