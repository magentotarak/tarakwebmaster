require(["jquery",
    "bootstrap4",
    'svg4everybody',
    'aos',
    'wow'], function ($, bootstrap, svg4everybody) {
    
    // Page padding
    if ($('.scs-page').length != 0 && $('.header').length != 0) {
        $('.scs-page').css('padding-top', $('.header').height());
    }
    window.onresize = function () {
        if ($('.scs-page').length != 0 && $('.header').length != 0) {
            $('.scs-page').css('padding-top', $('.header').height());
        }
    };
    
    $(document).ready(function () {
        //SVG
        svg4everybody();

        // Init animation
        new WOW().init();

        //MENU
        $('.menu-trigger').click(function () {
            $('body').toggleClass('menu-on');
        });

        //MEGA
        $('.mega-trigger').click(function (e) {
            e.preventDefault();
            var megaTarget = $(this).data('mega');

            $(this).siblings('.mega-trigger').removeClass('active');
            $('.mega').not('.mega#' + megaTarget).removeClass('on');

            $('.mega#' + megaTarget).toggleClass('on');
            $(this).toggleClass('active');
        });
        $(document).mouseup(function (e) {
            var container = $('.mega');
            var trigger = $('.mega-trigger');

            if (!container.is(e.target) && container.has(e.target).length === 0 && !trigger.is(e.target) && trigger.has(e.target).length === 0) {
                $('.mega-trigger').removeClass('active');
                $('.mega').removeClass('on');
            }
        });

        // Bootstrap tooltip fixes
        if ($('[data-toggle="tooltip"]').length != 0) {
            $('[data-toggle="tooltip"]').tooltip({container: 'body', trigger: 'hover'});
        }

        // Select2 for styling selects
        if ($('.js-select-styled').length != 0) {
            $('.js-select-styled').select2({
                minimumResultsForSearch: Infinity
            });
        }

        // Add to compare toggle
        $(".products__compare").one('click', function () {
            var icon = $(this).attr('icon-url');
            if ($(this).hasClass('added')) {
                $(this).find('.products__compare-text').text("Add to compare");
                $(this).find('.products__compare-icon').html('<svg role="img"><use xlink:href="'+icon+'"></use></svg>');
                $(this).removeClass('added');
            } else {
                $(this).addClass('added');
                $(this).find('.products__compare-text').text("Added to compare");
                $(this).find('.products__compare-icon').html('<i class="el ei-check"></i>');
            }
        });

        //Sign in
        $('.signin-trigger, .aside__close').click(function () {
            $('body').toggleClass('signin-on');
        });

        //Pay
        $('.pay').click(function () {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        });

        // move top links to menu section on smaller screens
        moveTopLinks = function () {
            if ($(window).innerWidth() > 767) {
                if ($('.header .header-section nav.header__menu .header__info').length && $('.header .header__stripe .header__info').length == 0) {
                    $('.header .header-section nav.header__menu .header__info').removeClass('header__info--mobile d-block d-md-none');
                    $('.header .header__stripe .container').append($('.header .header-section nav.header__menu .header__info'));
                }
            } else {
                if ($('.header .header-section nav.header__menu .header__info').length == 0 && $('.header .header__stripe .header__info').length) {
                    $('.header .header__stripe .header__info').addClass('header__info--mobile d-block d-md-none')
                    $('.header .header-section nav.header__menu').append($('.header .header__stripe .header__info'));
                }
            }
        };

        // move top links
        moveTopLinks();

        // And recheck when window gets resized.
        $(window).bind('resize', function () {
            moveTopLinks();
        });
        
        // move product sorting dropdown in compare section on category page
        if ($('.catalog-category-view .toolbar-wrapper .sort-toolbar-products').length && $('.catalog-category-view .compare-sort-container .row').length) {
            $('.catalog-category-view .compare-sort-container .row').append($('.catalog-category-view .toolbar-wrapper .sort-toolbar-products'));
        } else {
            $('.catalog-category-view .toolbar-wrapper .sort-toolbar-products').removeClass('col-md-4 text-md-right');
            $('.catalog-category-view .toolbar-wrapper').removeClass('no-display');
        }
    });
});
