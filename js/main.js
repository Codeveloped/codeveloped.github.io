$( document ).ready(function() {

    var toggleCaption = function(e, clicked) {

        // Don't hover so return
        if(e.data('dontHover') && !clicked) {
            e.data('dontHover', false);
            return
        }

        // Return if caption is locked and hovered.
        if(e.data('clickLock') && !clicked) return;

        // Toggle caption if not clicked and set state for next event
        if(!e.data('clickLock') && !clicked) {
            e.data('keepOpen', e.is(":hidden"));
            e.toggle();
            return
        }

        // We only end up here when clicked
        // If caption is closed then keep it closed on hoover exit.
        if(!e.is(":hidden")) e.data('dontHover', true);
        // If caption is opened by hover, don't toggle it again.
        if(!e.data('keepOpen')) e.toggle();
        // Toggle lock to make hover act properly
        e.data('clickLock', !e.data('clickLock'));
        // Set state for next event
        e.data('keepOpen', false);

    };


    $(".box").hover(function(){
        toggleCaption( $( this ).find( ".image-title"), false )
    }).click(function(){
        toggleCaption( $( this ).find( ".image-title"), true )
    });

});
