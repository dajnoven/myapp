$(document).ready(function () {
    // Обробка кліків по кнопкам "Увійти" та "Зареєструватися"
    $(".btn").click(function () {
        $(".form-signin").toggleClass("form-signin-left");
        $(".form-signup").toggleClass("form-signup-left");
        $(".frame").toggleClass("frame-long");
        $(".signup-inactive").toggleClass("signup-active");
        $(".signin-active").toggleClass("signin-inactive");
        $(".forgot").toggleClass("forgot-left");
        $(this).removeClass("idle").addClass("active");
    });

    // **Удаляем анимации из обработчика клика по кнопке регистрации**
    // $(".btn-signup").click(function () {
    //     $(".nav").toggleClass("nav-up");
    //     $(".form-signup-left").toggleClass("form-signup-down");
    //     $(".success").toggleClass("success-left");
    //     $(".frame").toggleClass("frame-short");
    // });

    // **Удаляем анимации из обработчика клика по кнопке входа**
    // $(".btn-signin").click(function () {
    //     $(".btn-animate").toggleClass("btn-animate-grow");
    //     $(".welcome").toggleClass("welcome-left");
    //     $(".cover-photo").toggleClass("cover-photo-down");
    //     $(".frame").toggleClass("frame-short");
    //     $(".profile-photo").toggleClass("profile-photo-down");
    //     $(".btn-goback").toggleClass("btn-goback-up");
    //     $(".forgot").toggleClass("forgot-fade");
    // });

    // Показати/сховати пароль
    $('.toggle-password').click(function () {
        $(this).toggleClass('fa-eye fa-eye-slash');
        const input = $($(this).attr('toggle'));
        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
        } else {
            input.attr('type', 'password');
        }
    });


    // Функція для показу повідомлень
    function showNotification(type, message) {
        Swal.fire({
            icon: type, // 'success', 'error', 'warning', 'info'
            title: message,
            showConfirmButton: false,
            timer: 3000
        });
    }


    // **Обробка відправки форми входу**
    $('#login-form').on('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        try {
            const response = await fetch($(this).attr('action'), {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                // Успешный вход
                showNotification('success', data.success);

                // **Запускаем анимации после успешного входа**
                $(".btn-animate").addClass("btn-animate-grow");
                $(".welcome").addClass("welcome-left");
                $(".cover-photo").addClass("cover-photo-down");
                $(".frame").addClass("frame-short");
                $(".profile-photo").addClass("profile-photo-down");
                $(".btn-goback").addClass("btn-goback-up");
                $(".forgot").addClass("forgot-fade");

                // Перенаправление или другие действия
                setTimeout(() => {
                    window.location.href = '/order_form';
                }, 5000);
            } else {
                // Ошибка входа
                showNotification('error', data.error);
            }
        } catch (error) {
            // Сетевая или серверная ошибка
            showNotification('error', 'Щось пішло не так. Спробуйте ще раз.');
        }
    });

    // **Обробка відправки форми реєстрації**
    $('#register-form').on('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        try {
            const response = await fetch($(this).attr('action'), {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                // Успешная регистрация
                showNotification('success', data.success);

                // **Запускаем анимации после успешной регистрации**
                $(".nav").addClass("nav-up");
                $(".form-signup").addClass("form-signup-down");
                $(".success").addClass("success-left");
                $(".frame").addClass("frame-short");

                // Перенаправление или другие действия
                setTimeout(() => {
                    window.location.href = '/order_form';
                }, 5000);
            } else {
                // Ошибка регистрации
                showNotification('error', data.error);
            }
        } catch (error) {
            // Сетевая или серверная ошибка
            showNotification('error', 'Щось пішло не так. Спробуйте ще раз.');
        }
    });
});