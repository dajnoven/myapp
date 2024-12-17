
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

    // Анімація кнопки реєстрації
    $(".btn-signup").click(function () {
        $(".nav").toggleClass("nav-up");
        $(".form-signup-left").toggleClass("form-signup-down");
        $(".success").toggleClass("success-left");
        $(".frame").toggleClass("frame-short");
    });

    // Анімація кнопки входу
    $(".btn-signin").click(function () {
        $(".btn-animate").toggleClass("btn-animate-grow");
        $(".welcome").toggleClass("welcome-left");
        $(".cover-photo").toggleClass("cover-photo-down");
        $(".frame").toggleClass("frame-short");
        $(".profile-photo").toggleClass("profile-photo-down");
        $(".btn-goback").toggleClass("btn-goback-up");
        $(".forgot").toggleClass("forgot-fade");
    });

    // Показати/сховати пароль
    $('.toggle-password').click(function () {
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

    // Обробка відправки форми входу
    $('#login-form').on('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        try {
            const response = await fetch($(this).attr('action'), {
                method: 'POST',
                body: formData
            });

            if (response.redirected) {
                window.location.href = response.url;
                return;
            }

            const data = await response.json();

            if (response.ok) {
                showNotification('success', data.success);
                setTimeout(() => {
                    window.location.href = '/order_form';
                }, 2000);
            } else {
                showNotification('error', data.error);
            }
        } catch (error) {
            showNotification('error', 'Щось пішло не так. Спробуйте ще раз.');
        }
    });

    // Обробка відправки форми реєстрації
    $('#register-form').on('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        try {
            const response = await fetch($(this).attr('action'), {
                method: 'POST',
                body: formData
            });

            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();

                if (response.ok) {
                    showNotification('success', data.success);
                    setTimeout(() => {
                        window.location.href = '/order_form';
                    }, 2000);
                } else {
                    showNotification('error', data.error);
                }
            } else {
                const errorText = await response.text();
                showNotification('error', 'Сталася помилка серверу. Спробуйте пізніше.');
                console.error('Помилка сервера:', errorText);
            }

        } catch (error) {
            showNotification('error', 'Щось пішло не так. Спробуйте ще раз.');
            console.error('Помилка:', error);
        }
    });
});
