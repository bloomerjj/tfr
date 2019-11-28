(function() {
    $( document ).ready(function() {
        // give some time for older browsers to render before the valus are calculated;
        setTimeout(positionLine, 250);

        var line = $('.connecting-line');
        var topNumber = $('.number1');
        var bottomNumber = $('.number3');
        var topContainer = $('.bubble1-container');
        var lineHeight, lineTopPosition, lineLeftPosition,
            topNumberTopPosition, bottomNumberTopPosition,
            topNumberLeftPosition, topContainerTopPosition,
            topContainerLeftPosition;

        $( window ).resize(function() {
            positionLine();
        });

        function positionLine(){
            line = $('.connecting-line');
            topNumber = $('.number1');
            bottomNumber = $('.number3');
            topContainer = $('.bubble1-container');

            topNumberTopPosition = topNumber[0].getBoundingClientRect().top;
            topNumberLeftPosition = topNumber[0].getBoundingClientRect().left;
            topContainerTopPosition = topContainer[0].getBoundingClientRect().top;
            topContainerLeftPosition = topContainer[0].getBoundingClientRect().left;
            bottomNumberTopPosition = bottomNumber[0].getBoundingClientRect().top;

            lineHeight = bottomNumberTopPosition - topNumberTopPosition;
            lineTopPosition = topNumberTopPosition - topContainerTopPosition;
            lineLeftPosition = topNumberLeftPosition - topContainerLeftPosition;

            line.css('height', lineHeight);    // leaving some space above and below
            line.css('top', lineTopPosition + 2);
            line.css('left', (lineLeftPosition + (topNumber.width() / 2)) - 1);     // half the button's width
        }
    });
})();
