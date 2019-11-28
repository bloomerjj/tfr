(function() {
    
    $( document ).ready(function() {

        $( window ).resize(function() {
            backtoTopPosition($(this));
        });

        $( window ).scroll(function() {
            backtoTopPosition($(this));  
        });

        function backtoTopPosition($this){
            var asideIsiHeight = $('.aside--isi').outerHeight();
            var footerHeight = $('.footer--global').outerHeight();
            var isiTrayHeight = $('.footer--sticky').outerHeight();
            var positionRight = $('.aside--isi .wrap--content').width();
            var backtoTop = $('.back-top.wrap--content');
            var backtoTopWidth = $('.back-top.wrap--content').width();

            if ($($this).scrollTop() >= 100) { // show back to top
                $(backtoTop).css('display','block');
                //$(backtoTop).css( "left", positionRight - backtoTopWidth);
            } else {
                $(backtoTop).css('display','none');
            }
            console.log(elementInViewport($('.aside--isi')));

            
            if(elementInViewport($('.sticky-footer-marker.desktop'))){
                $(backtoTop).removeClass('bottom-position');
                $(backtoTop).css('position','absolute');
                $(backtoTop).css( "bottom", asideIsiHeight + footerHeight + 15);
                
            }else{
                $(backtoTop).css('position','fixed');
                $(backtoTop).addClass('bottom-position');
            }
            if(elementInViewport($('.sticky-footer-marker.mobile'))){
                $(backtoTop).removeClass('bottom-position');
                $(backtoTop).css('position','absolute');
                $(backtoTop).css( "bottom", asideIsiHeight + footerHeight + 15);
            }else{
                $(backtoTop).css('position','fixed');
                $(backtoTop).addClass('bottom-position');
            }
            
        }

        function elementInViewport(el) {
            if (typeof jQuery === "function" && el instanceof jQuery) {
                el = el[0];
            }
            var top = el.offsetTop;
            var left = el.offsetLeft;
            var width = el.offsetWidth;
            var height = el.offsetHeight;

            while(el.offsetParent) {
                el = el.offsetParent;
                top += el.offsetTop;
                left += el.offsetLeft;
            }

            return (
                top < (window.pageYOffset + window.innerHeight) &&
                left < (window.pageXOffset + window.innerWidth) &&
                (top + height) > window.pageYOffset &&
                (left + width) > window.pageXOffset
            );
        }
    });
})();
