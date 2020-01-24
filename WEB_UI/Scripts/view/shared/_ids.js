(function ($) {
    "use strict"; // Start of use strict

     //jQuery for page scrolling feature - requires jQuery Easing plugin
    //$('a.page-scroll').bind('click', function (event) {
    //    var $anchor = $(this);
    //    $('html, body').stop().animate({
    //        scrollTop: ($($anchor.attr('href')).offset().top - 50)
    //    }, 1250, 'easeInOutExpo');
    //    event.preventDefault();
    //});

    // Highlight the top nav as scrolling occurs
    //$('body').scrollspy({
    //    target: '.navbar-fixed-top',
    //    offset: 51
    //});

    //// Closes the Responsive Menu on Menu Item Click
    //$('.navbar-collapse ul li a').click(function () {
    //    $('.navbar-toggler:visible').click();
    //});

    //// Offset for Main Navigation
    //$('#mainNav').position({
    //    offset: {
    //        top: 100
    //    }
    //});

    $(window).on('scroll', function (event) {
        var scrollValue = $(window).scrollTop();
        if (scrollValue > 51) {
            $('#mainNav').removeClass('bg-x').addClass('bg-dark');
        } else {
            $('#mainNav').removeClass('bg-dark').addClass('bg-x');
        }
    });

    // Initialize and Configure Scroll Reveal Animation
    window.sr = ScrollReveal();
    sr.reveal('.sr-icons', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 200);
    sr.reveal('.sr-button', {
        duration: 1000,
        delay: 200
    });
    sr.reveal('.sr-contact', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 300);

    // Initialize and Configure Magnific Popup Lightbox Plugin
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });

})(jQuery); // End of use strict
