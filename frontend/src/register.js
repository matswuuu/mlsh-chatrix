    $(document).ready(() => {
        // Set the refferer input value if a cookie exists
        if (getCookie('refferer')) {
            $("#refferer-input").val(getCookie('refferer'));
        }

        // Register button click event
        $("#register-button").click((e) => {
            e.preventDefault();
            $("#register-button").prop("disabled", true);

            grecaptcha.ready(() => {
                grecaptcha.execute("6LeeckMcAAAAAIic_KiRyVVFWuOgx8QFQ-Eqps1T", { action: "register" })
                    .then((token) => {
                        $.post("/api/auth/register", {
                            username: $("#username-input").val(),
                            email: $("#email-input").val(),
                            password: $("#password-input").val(),
                            mojang_username: '',
                            captcha: token,
                            refferer: $("#refferer-input").val() || getCookie('refferer'),
                        }, (data) => {
                            $("#register-button").prop("disabled", false);

                            if (!data.success) {
                                $('#confirm-button').prop('disabled', false);
                                displayError(data.error);
                                return;
                            }

                            note({
                                content: getTranslation(results, 'register-confirm'),
                                type: 'info',
                                time: 30
                            });

                            setTimeout(() => {
                                window.location = '/launcher';
                            }, 3000);
                        });
                    });
            });
        });

        // Regex patterns for validation
        const usernameRegex = /(?:^([a-zA-Z0-9_]{4,16})$|^([а-яА-Я0-9_]{4,16})$)/;
        const passwordRegex = /^(?=.*[A-ZА-Я])(?=.*[0-9])(?=.*[a-zа-я]).{8,}$/;
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        let lastUsernameValue;
        let lastEmailValue;
        let lastMojangUsernameValue;

        // Input validation functions
        function inputNone(inputId) {
            $(`#${inputId}-error-block`).removeClass("input-error input-accept box-input-active");
        }

        function inputSuccess(inputId) {
            $(`#${inputId}-error-block`).removeClass("input-error").addClass("input-accept").removeClass("box-input-active");
        }

        function inputError(inputId, error) {
            $(`#${inputId}-error-block`).removeClass("input-error input-accept").addClass("input-error");

            if (error !== undefined) {
                $(`#${inputId}-error`).text(getTranslation(errors, error));
                $(`#${inputId}-error-block`).removeClass("box-input-active").addClass("box-input-active");
            }
        }

        function checkWholeValidity() {
            const enabled = $("#username-error-block").hasClass("input-accept") &&
                $("#email-error-block").hasClass("input-accept") &&
                $("#password-error-block").hasClass("input-accept") &&
                $("#repeat-password-error-block").hasClass("input-accept") &&
                !$("#mojang-username-error-block").hasClass("input-error") &&
                $("#agreed-input").is(":checked");

            $("#register-button").prop("disabled", !enabled);
        }

        // Username input event handler
        $("#username-input").on("keyup keypress change input", (event) => {
            const currentValue = $(event.target).val();
            if (currentValue === lastUsernameValue) return;

            lastUsernameValue = currentValue;

            if (currentValue === "") {
                inputNone("username");
                checkWholeValidity();
                return;
            }

            if (!usernameRegex.test(currentValue)) {
                inputError("username", "username-format-incorrect");
                checkWholeValidity();
                return;
            }

            grecaptcha.ready(() => {
                grecaptcha.execute("6LeeckMcAAAAAIic_KiRyVVFWuOgx8QFQ-Eqps1T", { action: "check_username" })
                    .then((token) => {
                        $.post("/api/auth/register/username_available", {
                            username: currentValue,
                            captcha: token
                        }, (data) => {
                            if (currentValue !== $(event.target).val()) return;

                            if (!data.success) {
                                displayError(data.error);
                                return;
                            }

                            if (!data.result.available) {
                                inputError("username", "username-unavailable");
                                checkWholeValidity();
                                return;
                            }

                            inputSuccess("username");
                            checkWholeValidity();
                        });
                    });
            });
        });

        // Email input event handler
        $("#email-input").on("keyup keypress change input", (event) => {
            const currentValue = $(event.target).val();
            if (currentValue === lastEmailValue) return;

            lastEmailValue = currentValue;

            if (currentValue === "") {
                inputNone("email");
                checkWholeValidity();
                return;
            }

            if (!emailRegex.test(currentValue)) {
                inputError("email", "email-format-incorrect");
                checkWholeValidity();
                return;
            }

            $.post("/api/auth/register/email_available", { email: currentValue }, (data) => {
                if (currentValue !== $(event.target).val()) return;

                if (!data.success) {
                    displayError(data.error);
                    return;
                }

                if (!data.result.available) {
                    inputError("email", "email-unavailable");
                    checkWholeValidity();
                    return;
                }

                inputSuccess("email");
                checkWholeValidity();
            });
        });

        // Password input event handler
        $("#password-input").on("keyup keypress change input", (event) => {
            const currentValue = $(event.target).val();

            if (currentValue === "") {
                inputNone("password");
                checkWholeValidity();
                return;
            }

            if (!passwordRegex.test(currentValue)) {
                inputError("password", "password-format-incorrect");
                checkWholeValidity();
                return;
            }

            inputSuccess("password");
            $("#repeat-password-input").trigger("change");
            checkWholeValidity();
        });

        // Repeat password input event handler
        $("#repeat-password-input").on("keyup keypress change input", (event) => {
            const currentValue = $(event.target).val();

            if (currentValue === "") {
                inputNone("repeat-password");
                checkWholeValidity();
                return;
            }

            if (!passwordRegex.test(currentValue)) {
                inputError("repeat-password", "password-format-incorrect");
                checkWholeValidity();
                return;
            }

            if (currentValue !== $("#password-input").val()) {
                inputError("repeat-password", "repeat-password-incorrect");
                checkWholeValidity();
                return;
            }

            inputSuccess("repeat-password");
            checkWholeValidity();
        });

        // Mojang username input event handler
        $("#mojang-username-input").on("keyup keypress change input", (event) => {
            const currentValue = $(event.target).val();
            if (currentValue === lastMojangUsernameValue) return;

            lastMojangUsernameValue = currentValue;

            if (currentValue === "") {
                inputNone("mojang-username");
                checkWholeValidity();
                return;
            }

            $.post("/api/auth/register/mojang_username_exists", { mojang_username: currentValue }, (data) => {
                if (currentValue !== $(event.target).val()) return;

                if (!data.success) {
                    displayError(data.error);
                    return;
                }

                if (!data.result.exists) {
                    inputError("mojang-username", "mojang-username-does-not-exist");
                    checkWholeValidity();
                    return;
                }

                inputSuccess("mojang-username");
                checkWholeValidity();
            });
        });

        // Agreement checkbox change event handler
        $("#agreed-input").on("change", () => {
            checkWholeValidity();
        });
    });

// Function to get cookie value by name
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }

    return null;
}