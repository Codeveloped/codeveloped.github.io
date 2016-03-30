$(function () {
    var START_DELAY_TIME = 700;
    var INTERVAL_TIME = 300;
    var SHOW_TIME = 1200;

    function toggle(cls) {
        return function (ev) {
            $(ev.target).closest('.box').toggleClass(cls);
        }
    }
    
    $(".box")
        .click(toggle('click-visible'))
        .hover(toggle('hover-visible'), toggle('hover-visible'))
        .each(function (idx, box) {
            var $box = $(box);
            setTimeout(function () {
                $box.addClass('noticeme');
                setTimeout(function () {
                    $box.removeClass('noticeme');
                }, SHOW_TIME);
            }, START_DELAY_TIME + idx * INTERVAL_TIME);
        });

});
