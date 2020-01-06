jQuery(document).ready(function ($) {

    var lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));


    //open/close lateral filter
    $('.cd-filter-trigger').on('click', function () {
        triggerFilter(true);
    });
    $('.cd-filter .cd-close').on('click', function () {
        triggerFilter(false);
    });

    function triggerFilter($bool) {
        var elementsToTrigger = $([$('.cd-filter-trigger'), $('.cd-filter'), $('.cd-tab-filter'), $('.cd-gallery')]);
        elementsToTrigger.each(function () {
            $(this).toggleClass('filter-is-visible', $bool);
        });
    }
    //fix lateral filter and gallery on scrolling
    $(window).on('scroll', function () {
        //(!window.requestAnimationFrame) ? fixGallery() : window.requestAnimationFrame(fixGallery);
    });
});