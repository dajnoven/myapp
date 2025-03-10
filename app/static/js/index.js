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

        if (!validateForm(form)) {
            isSubmitting = false;
            submitButton.prop('disabled', false);
            return;
        }

        const formData = new FormData(form);

        try {
            const response = await fetch($(form).attr('action'), {
                method: 'POST',
                body: formData
            });

            let data;
            try {
                data = await response.json();
            } catch (error) {
                console.error("Помилка при розборі JSON:", error);
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
                // showNotification('success', data.success);

                if ($(form).attr('id') === 'register-form') {
                    setTimeout(() => applySignupAnimations(), 1000);
                } else if ($(form).attr('id') === 'login-form') {
                    setTimeout(() => applyLoginAnimations(), 100);
                }

                setTimeout(() => window.location.href = successRedirect, 4000);
            }
        } catch (error) {
            console.error('Помилка при відправці форми:', error);
            showNotification('error', 'Щось пішло не так. Спробуйте ще раз.');
        } finally {
            isSubmitting = false;
            submitButton.prop('disabled', false);
        }
    }

    function validateForm(form) {
        let isValid = true;
        $(form).find("input").each(function () {
            if ($(this).val().trim() === "") {
                isValid = false;
                $(this).addClass("error");
            } else {
                $(this).removeClass("error");
            }
        });

        if (!isValid) {
            showNotification('error', 'Будь ласка, заповніть усі поля.');
        }
        return isValid;
    }

    function applySignupAnimations() {
        $("#check").addClass("checkmark");
        $(".nav").addClass("nav-up");
        $(".form-signup-left").addClass("form-signup-down");
        $(".success").addClass("success-left");
        $(".frame").addClass("frame-short");

        // $(".form-signup .cover-photo").removeClass("cover-photo-down");
        // $(".form-signup .profile-photo").removeClass("profile-photo-down");
        // $(".form-signup .btn-goback").removeClass("btn-goback-up");
        // $(".form-signup .forgot").removeClass("forgot-fade");
        // $(".form-signup .welcome").removeClass("welcome-left");
        // $(".form-signup").removeClass("welcome-left");

    }

    function applyLoginAnimations() {
        $(".btn-animate").addClass("btn-animate-grow");
        $(".welcome").addClass("welcome-left");
        $(".frame").addClass("frame-short");
        $(".cover-photo").addClass("cover-photo-down");
        $(".profile-photo").addClass("profile-photo-down");
        $(".btn-goback").addClass("btn-goback-up");
        $(".forgot").addClass("forgot-fade");

    }

    $('#login-form').on('submit', function (event) {
        handleFormSubmit(event, this, '/order_form');
    });

    $('#register-form').on('submit', function (event) {
        showNotification('info', 'Надсилаємо дані... Будь ласка, зачекайте');
        handleFormSubmit(event, this, '/');
    });
});
