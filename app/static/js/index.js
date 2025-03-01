$(document).ready(function () {
    let isSubmitting = false;

    $(".btn").click(function () {
        $(".form-signin").toggleClass("form-signin-left");
        $(".form-signup").toggleClass("form-signup-left");
        $(".frame").toggleClass("frame-long");
        $(".signup-inactive").toggleClass("signup-active");
        $(".signin-active").toggleClass("signin-inactive");
        $(".forgot").toggleClass("forgot-left");
        $(this).removeClass("idle").addClass("active");
    });

    $('.toggle-password').click(function () {
        $(this).toggleClass('fa-eye fa-eye-slash');
        const input = $(this).siblings('input');
        input.attr('type', input.attr('type') === 'password' ? 'text' : 'password');
    });

    function showNotification(type, message) {
        Swal.fire({
            icon: type,
            title: message,
            showConfirmButton: false,
            timer: 3000
        });
    }

    async function handleFormSubmit(event, form, successRedirect) {
        event.preventDefault();

        if (isSubmitting) return;
        isSubmitting = true;

        const submitButton = $(form).find('button[type="submit"]');
        submitButton.prop('disabled', true);

        const formData = new FormData(form);
        console.log("Отправка данных:", Object.fromEntries(formData));

        try {
            const response = await fetch($(form).attr('action'), {
                method: 'POST',
                body: formData
            });

            let data;
            try {
                data = await response.json();
            } catch (error) {
                console.error("Ошибка при разборе JSON:", error);
                showNotification('error', `Помилка сервера (${response.status})`);
                isSubmitting = false;
                submitButton.prop('disabled', false);
                return;
            }

            if (response.status === 400) {
                showNotification('error', data.error || 'Невірні дані. Спробуйте ще раз.');
            } else if (!response.ok) {
                showNotification('error', `Помилка сервера (${response.status}): ${response.statusText}`);
            } else if (data.success) {
                showNotification('success', data.success);

                document.getElementById("check").classList.add("checkmark");

                triggerSuccessAnimations();
                setTimeout(() => window.location.href = successRedirect, 4000);
            }
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
            showNotification('error', 'Щось пішло не так. Спробуйте ще раз.');
        } finally {
            isSubmitting = false;
            submitButton.prop('disabled', false);
        }
    }


    function triggerSuccessAnimations() {
        $(".btn-animate").addClass("btn-animate-grow");
        $(".welcome").addClass("welcome-left");
        $(".cover-photo").addClass("cover-photo-down");
        $(".frame").addClass("frame-short");
        $(".profile-photo").addClass("profile-photo-down");
        $(".btn-goback").addClass("btn-goback-up");
        $(".forgot").addClass("forgot-fade");
        // $("#check").addClass("checked");
    }

    $('#login-form').on('submit', function (event) {
        // showNotification('info', 'Надсилаємо дані...');
        handleFormSubmit(event, this, '/order_form');
    });

    $('#register-form').on('submit', function (event) {
        showNotification('info', 'Надсилаємо дані...');
        handleFormSubmit(event, this, '/');
    });

});



