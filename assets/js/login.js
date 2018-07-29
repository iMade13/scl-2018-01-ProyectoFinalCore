$('#loginAdmin-link').click(function(e) {
    $("#login-admin").delay(100).fadeIn(100);
    $("#login-recepcion").fadeOut(100);
    $('#loginRecep-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
});
$('#loginRecep-link').click(function(e) {
    $("#login-recepcion").delay(100).fadeIn(100);
    $("#login-admin").fadeOut(100);
    $('#loginAdmin-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
});