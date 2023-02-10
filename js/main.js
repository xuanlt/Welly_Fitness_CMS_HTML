jQuery(document).ready(function($) {

    //Function layout
    function sidebar_layout() {
        let window_height = $(window).outerHeight();

        //Sidebar 
        let sidebar_header_height = $('.site-sidebar .sidebar-header').outerHeight();
        let sidebar_footer_height = $('.site-sidebar .sidebar-footer').outerHeight();

        $('.site-sidebar .sidebar-content').css('height', window_height - sidebar_header_height - sidebar_footer_height + 'px');
        submenu_sidebar_collapsed();
    }

    sidebar_layout();
    // Sidebar
    if (($(window).width() < 540) && ($('body').hasClass('.sidebar-collapsed') == false)) {
        $('.btn-sidebar-toggle').click();
    }

    //Sub Menu when Sidebar Collaped
    function submenu_sidebar_collapsed() {

        if ($('.sidebar-collapsed').length != 0) {
            $('.tree .treeview').each(function() {
                let window_height = $(window).height();
                let el_this_height = $(this).height();
                let el_menu_height = $(this).find('.treeview-menu').outerHeight();
                let el_offet_top = $(this).offset().top;
                let el_offet_bottom = window_height - $(this).offset().top - el_this_height;

                if (el_menu_height > el_offet_bottom) {
                    $(this).find('.treeview-menu').css({
                        'top': 'auto',
                        'bottom': el_offet_bottom
                    });
                } else {
                    $(this).find('.treeview-menu').css({
                        'top': el_offet_top,
                        'bottom': 'auto'
                    });
                }

            });
        }
    }

    //Site Sidebar Scroll
    $(function() {
        $(".sidebar-content").niceScroll({
            cursorcolor: 'rgba(255,255,255,0.2)',
            cursorwidth: '2px',
            cursorborder: 'none',
            railalign: 'left'
        });
    });

    $(".sidebar-content").scroll(function() {
        submenu_sidebar_collapsed();
    });



    //Sidebar Toggle 
    $(".item-sidebar-toggle > .nav-link, .btn-sidebar-toggle").click(function(e) {
        e.preventDefault();
        $(".item-sidebar-toggle > .nav-link, .btn-sidebar-toggle").toggleClass('active');
        $(".item-sidebar-toggle > .nav-link, .btn-sidebar-toggle").find('.fa-solid').toggleClass('fa-angles-left fa-angles-right');
        $('body').toggleClass('sidebar-collapsed');
        sidebar_layout();
    });


    //Sub Menu Toggle
    $('.tree .treeview:has(.treeview-menu) > a').click(function(e) {
        e.preventDefault();
        //Open
        $(this).parent().toggleClass('menu-opened active');
        $(this).parent().find('.treeview-menu').toggle();

        //Close
        $('.tree .treeview > a').not($(this)).parent().removeClass('menu-opened active');
        $('.tree .treeview').not($(this)).find('.treeview-menu').hide();
    });

    // Setup Nicescroll
    $(function() {
        $(".nicescroll").niceScroll({
            cursorcolor: 'rgba(0,0,0,0.2)',
            cursorwidth: '6px',
            cursorborder: 'none'
        });
    });

    //Window resize
    $(window).resize(function() {
        sidebar_layout();
    });
});