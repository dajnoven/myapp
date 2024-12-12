$(function () {
    $(".btn").click(function () {
        $(".form-signin").toggleClass("form-signin-left");
        $(".form-signup").toggleClass("form-signup-left");
        $(".frame").toggleClass("frame-long");
        $(".signup-inactive").toggleClass("signup-active");
        $(".signin-active").toggleClass("signin-inactive");
        $(".forgot").toggleClass("forgot-left");
        $(this).removeClass("idle").addClass("active");
    });
});

$(function () {
    $(".btn-signup").click(function () {
        $(".nav").toggleClass("nav-up");
        $(".form-signup-left").toggleClass("form-signup-down");
        $(".success").toggleClass("success-left");
        $(".frame").toggleClass("frame-short");
    });
});

$(function () {
    $(".btn-signin").click(function () {
        $(".btn-animate").toggleClass("btn-animate-grow");
        $(".welcome").toggleClass("welcome-left");
        $(".cover-photo").toggleClass("cover-photo-down");
        $(".frame").toggleClass("frame-short");
        $(".profile-photo").toggleClass("profile-photo-down");
        $(".btn-goback").toggleClass("btn-goback-up");
        $(".forgot").toggleClass("forgot-fade");
    });
});

$(document).ready(function () {
    // Проверка регистрации
    $('#register-form').submit(function (event) {
        const username = $('#username').val(); // Убедитесь, что поле username существует
        const email = $('#email').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirmpassword').val();
        const usernameRegex = /^[a-zA-Z0-9_]+$/;

        if (!usernameRegex.test(username)) {
            showError('username', 'Логин может содержать только буквы, цифры и "_".');
            event.preventDefault();
        }

        if (password !== confirmPassword) {
            showError('confirmpassword', 'Пароли не совпадают.');
            event.preventDefault();
        }

        // Проверка на существующий e-mail
        $.ajax({
            url: '/check_email',
            type: 'POST',
            data: { email: email },
            success: function(response) {
                if (response.exists) {
                    showError('email', 'Ця електронна адреса вже зареєстрована.');
                    event.preventDefault();
                } else {
                    $('#register-form').off('submit').submit(); // Отправить форму, если email корректный
                }
            }
        });
    });

    // Показать/скрыть пароль
    $('.toggle-password').click(function () {
        const input = $($(this).attr('toggle'));
        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
        } else {
            input.attr('type', 'password');
        }
    });

    // Вход без учета регистра
    $('#login-form').submit(function () {
        let username = $('#login-username').val();
        $('#login-username').val(username.toLowerCase());
    });

    // Функция для показа ошибок
    function showError(inputId, message) {
        const inputElement = $('#' + inputId);
        inputElement.addClass('error');
        inputElement.after('<span class="error-message">' + message + '</span>');
    }
});