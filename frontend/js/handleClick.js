$(document).ready(function () {
    const originalSVG = $('.config').html();
    const goBackSVG = `
<svg viewBox="0 0 2000 2000" version="1.1" xmlns="http://www.w3.org/2000/svg" height="50pt" width="50pt">
    <path d="M863.702 960l520.212-519.957c64.477-64.444 64.474-168.117.498-232.062-64.423-64.39-167.926-63.722-232.177.497L535.42 824.991c-37.06 37.041-52.817 87.042-47.37 135.009-5.447 47.967 10.31 97.968 47.37 135.009l616.816 616.513c64.251 64.22 167.754 64.887 232.177.497 63.976-63.945 63.979-167.618-.498-232.062L863.702 960z" stroke="none" stroke-width="1" fill-rule="evenodd"/>
</svg>
`
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
            $(this).html(goBackSVG);
        }
    });
});
