(function() {
    'use strict';

    angular.module('cdmp.controllers')

    .controller('MainController', ['$scope', '$rootScope', '$window', '$document', '$timeout', '$http', '$location', 'matchmedia', 'ModalService', 'Analytics', '_', 'he', 'parseUri',
        function($scope, $rootScope, $window, $document, $timeout, $http, $location, matchmedia, ModalService, Analytics, _, he, parseUri) {




// VARIABLES 



            $rootScope.emailPattern = /^.+@[^\.].*\.[a-zA-Z]{2,}$/;
            $rootScope.passwordPattern = /^(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?=.*[a-zA-Z]).*$/;
            $rootScope.datePattern = /^\d{2}\/\d{2}\/\d{4}$/;

            // Media Queries and Watchers Logic

            var mediaQueries = {
                sm: 'only screen and (max-width: 640px)',
                md: 'only screen and (min-width: 641px) and (max-width: 1024px)',
                lg: 'only screen and (min-width: 1025px)',
                p: '(orientation: portrait)',
                l: '(orientation: landscape)'
            };

            // Changed to put it on the rootScope so services can access it too.
            $rootScope.mq = {};

            _.each(mediaQueries, function(value, key) {

                $rootScope.mq[key] = matchmedia.is(value);

                matchmedia.on(value, function(mediaQueryList) {
                    $rootScope.mq[key] = mediaQueryList.matches;
                });

            });




            $scope.stickyFooterOpen = false;
            $scope.mobileMenuOpen = false;


// FUNCTIONS

            

            $scope.scrollTo = function(sel, dur, offset) {

                // Get the element
                var el = angular.element(sel);

                // Check if the element exists
                if (el.length > 0) {

                    // If it exists, scroll there!
                    $document.scrollToElement(el, offset || 0, dur || 0);
                }

            };

            $scope.showChart = function(imgUrl, selected){
                var referenceText = $('.hideOnSpine.disclaimer');

                var chart = $(".chart"),
                    chartMbl = $(".chart-mbl");
                chart.attr("srcset", "img/lg/"+imgUrl+".png");
                chartMbl.attr("srcset", "img/smr/"+imgUrl+".png");
                if (chart.filter('img').attr('src')) {
                    chart.filter('img').attr("src", "img/lg/"+imgUrl+".png");
                }
                $(".chart-btn").removeClass("active");
                $("."+selected).addClass("active");

                if (selected === 'spine') {
                    referenceText.css('display','none');
                } else {
                    referenceText.css('display','block');
                }
            };
            
            $scope.toggleAccordion = function(element){
                angular.element(element).toggleClass('accordion-closed');
            };

            // Modal stuff
            $scope.showModal = function(name, controller, scope) {

                $rootScope.$emit('close:modal');

                ModalService
                    .showModal({
                        // scope: scope || $scope,
                        templateUrl: 'views/modal/' + name + '.html',
                        controller: controller || 'ModalController'
                    })
                    .then(function(modal) {
                        // modal.element.show();
                    });
            };


            $scope.showStickyFooter = function() {
                $scope.stickyFooterOpen = true;
            };
            $scope.hideStickyFooter = function() {
                $scope.stickyFooterOpen = false;
            };

            $scope.toggleMobileMenu = function() {

                $scope.mobileMenuOpen = !$scope.mobileMenuOpen;

                $scope.$broadcast('navToggle', { isOpen: $scope.mobileMenuOpen });
            };

            // this is a handy function but i'm not actually going to need it
            // this compares a string in title case for the title of a page to the file name
            $scope.getCurrentPage = function() {


                function toTitleCase(str) {
                    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
                };

                var urlArray = $location.absUrl().split('/');

                var page = urlArray.pop().replace('.html', '').split('-');

                $scope.pageString = '';

                for (var i=0; i<page.length; i++) {

                    if (i !== 0) {
                        $scope.pageString += ' ';
                    }
                    $scope.pageString += page[i];
                }

                $scope.pageString = toTitleCase($scope.pageString);
            };



            $scope.isActivePage = function(str) {
                var pathname = location.pathname;

                pathname = pathname.split('/').pop();

                return (str === pathname);
            };


            $scope.goToAnchor = function(file, selector) {
                var offset = 0;

                // if its on mobile we need to open that accordion as well.
                if ($rootScope.mq['sm'] || $rootScope.mq['md']) {

                    offset = 60;

                }
            
                $location.path(selector);
                var sectionString = $location.path().split('#').pop().replace('/', '');

                // console.log(sectionString)
                $scope.scrollTo('#' + sectionString, 250, offset);

                

                // $scope.currentSubNav = '';
                $scope.mobileMenuOpen = false;

                $scope.$broadcast('anchorLink', { location: sectionString });
            };

            // Get the subnav for the page with anchor links BUT ONLY if its already on that page.
            // This prevents user from being able to see anchor subnav from other pages, but allows full functionality of the nav on that page..
            $scope.getAnchorSubnav = function(filePath, sectionName) {

                // if(event !== undefined) {
                //     event.preventDefault();
                // }

                $scope.currentSubNav = ''; 

                // var currentUrl = $location.absUrl(); 

                // if (currentUrl.indexOf(filePath) > -1) {
                    $scope.currentSubNav = sectionName;
                // }
            };

            $scope.openSubNav = function(sectionName) {
                $scope.currentSubNav = sectionName;
            };
            $scope.closeSubNav = function() {
                $scope.currentSubNav = $scope.defaultSubNav || '';
            };



            // ISI
            $scope.closeIsiIndication = function() {
                $scope.isiIndicationViewed = true;
                $window.sessionStorage.setItem('isiIndicationViewed', true);
            };
            $scope.minimizeIsi = function() {
                angular.element('.button--minimize').hide();
                angular.element('.button--expand').css('display','inline-block');
                angular.element('.wrap--content.back-top').css('bottom','78px');
                angular.element('.footer--sticky').addClass('minimizedIsi');
                $scope.isiMinimized = true;
            };




// INIT

            // if the url has anchor link in it, automatically scroll to it.
            // this will fire both when the anchor link is on the current page and on an external
            $scope.$on('$locationChangeStart', function() {

                var locationString = $location.path().split('#').pop().replace('/', '');


                $scope.goToAnchor(locationString);

            });




            $scope.isiIndicationViewed = false;//$window.sessionStorage.getItem('isiIndicationViewed') === 'true';
            $scope.isiMinimized = false;




// EVENT LISTENERS


            $scope.$watch('mobileMenuOpen', function(newValue, oldValue) {

                $(document).off('touchmove');

                if (newValue === true) {

                    $(document).on('touchmove', function (e) {
                        e.preventDefault();
                    });
                } else {

                    $(document).on('touchmove', function (e) {
                        return true;
                    });
                }
            });



        }
    ]);

}).call(this);
