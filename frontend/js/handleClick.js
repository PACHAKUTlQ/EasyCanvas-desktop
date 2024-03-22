$(document).ready(function () {
    const originalSVG = $('.config').html();
    $('.config').on('click', function () {
        if ($(this).hasClass('go-back')) {
            window.runtime.WindowUnmaximise();
            // If the button is in the "Go Back" state, empty and hide the page-container, and revert to the default state
            $('.page-container').empty().hide();
            $(this).removeClass('go-back');
            $(this).html(originalSVG);
            location.reload();
        } else {
            window.runtime.WindowMaximise();
            // If the button is in the default state, load config.html
            $('.page-container').load('config.html', function () {
                $(this).children().css('width', '100%');
                $(this).show();
            });
            $(this).addClass('go-back');
            $(this).html('<b>⮪</b>');
        }
    });
});
