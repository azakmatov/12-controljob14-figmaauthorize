window.onload = () => {
    let fullName = $('#fullName');
    let userName = $('#userName');
    let email = $('#email');
    let password = $('#password');
    let repeatPassword = $('#repeatPassword');
    let agreeDiv = $('.agree');
    let agree = $('#registrationAgree');
    let agreeLabel = $('.agree__label');
    let button = $('.action__button');
    let popup = $('.pop');
    let popupAction = $('#popup__action');
    let title = document.getElementsByTagName('h1')[0];
    let alreadyHide = document.getElementsByClassName('alreadyHide');
    let linkTarget = $('.link__target');
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    let inputColumns = $('.form__input');
    let buttonFlag = false;
    let hasError = false;
    let error = $('.error');

    let person = {};
    let clients = '';
    let clientsArray = [];

    button.click(buttonClick);

    popupAction.click(() => {
        popup.dialog('close');
        fullName.val('');
        userName.val('');
        email.val('');
        password.val('');
        repeatPassword.val('');
        agree.prop('checked', false);
    });

    function alreadyHaveAnAccount(num, name = '') {
        if (num === 0) {
            title.innerText = 'Log in to the system';
            linkTarget.text('Registration');
            for (let i = 0; i < alreadyHide.length; i++) {
                alreadyHide[i].classList.add('hidden');
            }
            button.text('Sign In');
            buttonFlag = true;
            prepareButtonClick();
            button.click(buttonClick);
            linkTarget.click((e) => {
                e.preventDefault();
                buttonFlag = false;
                location.reload();
            });
        } else if (num === 1) {
            title.innerText = 'Welcome, ' + name;
            button.text('Exit');
            $('.description').hide();
            $('.form__label').hide();
            userName.hide();
            password.hide();
            linkTarget.hide();
            button.click(() => {
                location.reload();
            });
        }
    }

    linkTarget.click((e) => {
        alreadyHaveAnAccount(0);
    });

    function prepareButtonClick() {
        hasError = false;
        error.hide();
        inputColumns.css('border', 'none');
        inputColumns.css('border-bottom', '1px solid #C6C6C4');
        agreeLabel.css('color', '#636363');
        agree.css('box-shadow', 'none');
        userName.next().text('"User Name" обязателен, может содержать только буквы, цифры, символ подчёркивания и тире.');
        password.next().text('"Password" обязателен, минимальная длина 8 символов, должен содержать большие, маленькие буквы, цифры и символы');
    }

    function buttonClick() {
        prepareButtonClick();
        if (!buttonFlag) {
            agreeDiv.css('border', 'none');

            if (!(/\D([a-zA-Zа-яА-Я]+\s*\D)+$/.test(fullName.val()))) {
                fullName.next().show();
                fullName.css('border', '1px solid red');
                hasError = true;
            }

            if (!(/^\w+[-_]*[а-яА-Я]*\d*[-_]*$/.test(userName.val()))) {
                userName.next().show();
                userName.css('border', '1px solid red');
                hasError = true;
            }

            if (!(EMAIL_REGEXP.test(email.val()))) {
                email.next().show();
                email.css('border', '1px solid red');
                hasError = true;
            }

            if ((!(/[a-z]+[A-Z]+[0-9]+[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+|[a-z]+[A-Z]+[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+[0-9]+|[a-z]+[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+[A-Z]+[0-9]+|[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+[a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+|[a-z]+[0-9]+[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+[A-Z]+|[a-z]+[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+[0-9]+[A-Z]+|[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+[a-z]+[0-9]+[A-Z]+|[A-Z]+[a-z]+[0-9]+[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+|[A-Z]+[a-z]+[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+[0-9]+|[A-Z]+[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+[a-z]+[0-9]+|[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+|[A-Z]+[0-9]+[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+[a-z]+|[A-Z]+[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+[0-9]+[a-z]+|[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+[A-Z]+[0-9]+[a-z]+|[0-9]+[a-z]+[A-Z]+[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+|[0-9]+[a-z]+[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+[A-Z]+|[0-9]+[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+[a-z]+[A-Z]+|[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+|[0-9]+[A-Z]+[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+[a-z]+|[0-9]+[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+[A-Z]+[a-z]+|[\/\*\-\+\.\,\\\|\!\@\#\$\%\(\)\_\=\<\>\?\”\’\:\;\~\`]+[0-9]+[A-Z]+[a-z]+/.test(password.val()))) |
                (password.val().length < 8)) {
                password.next().show();
                password.css('border', '1px solid red');
                hasError = true;
            }

            if ((password.val() !== repeatPassword.val()) | (repeatPassword.val() === '')) {
                repeatPassword.next().show();
                repeatPassword.css('border', '1px solid red');
                hasError = true;
            }

            if (!agree.prop('checked')) {
                agreeDiv.next().show();
                agreeLabel.css('color', 'red');
                agree.css('box-shadow', '0 0 0 2px red');
                hasError = true;
            }

            if (!hasError) {
                person = {
                    fullName: fullName.val(),
                    userName: userName.val(),
                    password: password.val()
                };
                clients = localStorage.getItem('clients');
                clientsArray = [];
                if (clients) {
                    clientsArray = JSON.parse(clients);
                }
                clientsArray.push(person);
                localStorage.setItem('clients', JSON.stringify(clientsArray));
                fullName.val('');
                userName.val('');
                email.val('');
                password.val('');
                repeatPassword.val('');
                agree.prop('checked', false);
                popup.dialog({
                    close: function () {
                        alreadyHaveAnAccount(0);
                    },
                });
            }
        } else {
            if (!userName.val()) {
                userName.next().text('Имя пользователя не может быть пустым').show();
                userName.css('border', '1px solid red');
                hasError = true;
            }

            if (!password.val()) {
                password.next().text('Пароль не может быть пустым').show();
                password.css('border', '1px solid red');
                hasError = true;
            }

            if (!hasError) {
                person = {
                    userName: userName.val(),
                    password: password.val()
                };
                clients = localStorage.getItem('clients');
                clientsArray = [];
                if (clients) {
                    clientsArray = JSON.parse(clients);
                }

                if (clientsArray.findIndex(el => el.userName === person.userName) !== -1) {
                    let index = clientsArray.findIndex(el => el.userName === person.userName);
                    if (clientsArray[index].password === person.password) {
                        alreadyHaveAnAccount(1, clientsArray[index].fullName);
                    } else {
                        password.next().text('Неверный пароль');
                        password.next().show();
                        password.css('border', '1px solid red');
                    }
                } else {
                    userName.next().text('Такой пользователь не зарегистрирован');
                    userName.next().show();
                    userName.css('border', '1px solid red');
                }

                // let user = clientsArray.find((element) => element.userName === person.userName);
                // if (user) {
                //     if (user.password === person.password) {
                //         // console.log('Личный кабинет');
                //     } else {
                //         password.next().text('Неверный пароль');
                //         password.next().show();
                //         password.css('border', '1px solid red');
                //     }
                //
                // } else {
                //     userName.next().text('Такой пользователь не зарегистрирован');
                //     userName.next().show();
                //     userName.css('border', '1px solid red');
                // }
            }
        }
    }
}