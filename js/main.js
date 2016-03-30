$(function () {
    var START_DELAY_TIME = 600;
    var INTERVAL_TIME = 200;
    var SHOW_TIME = 1000;

    function toggle(cls) {
        return function (ev) {
            $(ev.target).closest('.extra').toggleClass(cls);
        }
    }
    
    $(".extra")
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
