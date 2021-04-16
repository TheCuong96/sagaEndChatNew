/*for frontend==============================================================*/

$(window).ready(function () {
    $(".js-seclect2").select2();
    collapseSidebar();
    headerAction();
    chatbot();
    toggleSwitch();
    login();
    $('.js-datepicker').datepicker();
});

$(window).resize(function () {
    var windowWidth = $(window).width();
    if (windowWidth < 1201) {
        $(".sidebar__logo").addClass('hide');
        $('.sidebar').addClass('hide')
    } else {
        $(".sidebar__logo").removeClass('hide');
        $('.sidebar').removeClass('hide')
    }
});

//Sidebar
function collapseSidebar() {

    //icon open header on mobile
    $('.header_text_center .icon').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
            $('.user').removeClass('active')
        } else {
            $(this).addClass('active')
            $('.user').addClass('active')
        }
    })

    //icon bar show/hide sidebar
    $('.sidebar__toggle_icon').click(function () {
        if ($('.sidebar__logo').hasClass('hide') && $('.sidebar').hasClass('hide')) {
            $('.sidebar__logo').removeClass('hide')
            $('.sidebar').removeClass('hide')
        } else {
            $('.sidebar__logo').addClass('hide')
            $('.sidebar').addClass('hide')
        }
    })

    //click item on sidebar
    $('.nav-link').click(function () {
        $(this).closest('.nav').find('.nav-link').removeClass('active')
        $(this).closest('.nav-item').find('.nav-link').addClass('active')
    })
}

//header action
function headerAction() {

    //click show dropdown user
    $('.user__wrap').click(function () {
        $('.user__actions').toggleClass('active')
    })

}

// -----------------login----------------
function login() {
    $('.input-icon').click(function () {
        let input = $('.password').find(".form-control");
        $(this).toggleClass("fa-eye fa-eye-slash");
        input.attr('type') === 'password' ? input.attr('type', 'text') : input.attr('type', 'password');
    });
}


//-------------Chatbot----------------

function chatbot() {
    let string = function (no) {
        return '<div class="chatbot__content" question-id="' + no + '"><input class="switch-input new-question-text active" value="" /><div class="list-icon"><i class="fas fa-check icon icon-add-new active"></i> <i class="fas fa-times icon icon-no-add" style="display: block"></i><i class="fas fa-trash-alt icon icon-del"></i><i class="las la-pencil-alt  icon icon-edit"></i></div></div>'
    }

    let oldValueInput = null;

    // event add in dropdown
    $('.chatbot__crud.question .add').click(function (e) {
        let date = new Date()
        let no = date.getMilliseconds();
        // $(".chatbot__content").find('.switch-input').attr('readonly', 'false').removeClass('active')
        $(this).closest('.chatbot__crud').find('.icon').hide()

        let array = $(this).closest('.chatbot__crud').find('.chatbot__box')[0].children
        console.log({ array });
        for (var i = 0; i < array.length; i++) {

            let array2 = array[i].children;

            for (var j = 0; j < array2.length; j++) {

                if (array2[j].className.indexOf("switch-input") != -1 && array2[j].defaultValue == '') {
                    console.log({ arr: array2[j] });
                    array[i].remove()
                }
            }
        }
        $(this).closest('.chatbot__crud').find('.chatbot__box').append(string(no))

    })

    // event edit in dropdown
    $('.chatbot__crud.question .edit').click(function () {
        let id = $(this).closest('.chatbot__content ').attr('question-id');
        $(this).closest('.chatbot__crud').find('.icon').hide()
        $(this).closest('.chatbot__crud').find('.icon-edit').show()
        $(".chatbot__content").find('.switch-input').attr('readonly', 'true').removeClass('active')

        let array = $(this).closest('.chatbot__crud').find('.chatbot__box')[0].children
        console.log(array);
        for (var i = 0; i < array.length; i++) {

            let array2 = array[i].children;

            for (var j = 0; j < array2.length; j++) {
                if (array2[j].defaultValue == '') {

                    array[i].remove()
                }
            }
        }
    })

    // event delete in dropdown
    $('.chatbot__crud.question .del').click(function () {
        $(this).closest('.chatbot__crud ').find('.icon').hide()
        $(this).closest('.chatbot__crud ').find('.icon-del').show()
        $(".chatbot__content").find('.switch-input').attr('readonly', 'true').removeClass('active')

        let array = $(this).closest('.chatbot__crud').find('.chatbot__box')[0].children
        console.log(array);
        for (var i = 0; i < array.length; i++) {

            let array2 = array[i].children;
            console.log(array2)
            for (var j = 0; j < array2.length; j++) {
                if (array2[j].defaultValue == '') {
                    array[i].remove()
                }
            }
        }

    })

    $('.chatbot__crud.answer .edit').click(function () {
        $(this).closest('.chatbot__crud').find('.icon').hide()
        $(this).closest('.chatbot__crud').find('.icon-edit').show()
    })

    // $('.chatbot__crud.answer .del').click(function () {
    //     $(this).closest('.chatbot__crud ').find('.icon').hide()
    //     $(this).closest('.chatbot__crud ').find('.icon-del').show()
    // })

    // after new data, event delete input
    $('body').on('click', '.chatbot__crud.question .chatbot__content .icon-del', function () {
        let id = $(this).closest('.chatbot__content ').attr('question-id');
        $(".chatbot__content[question-id='" + id + "']").remove()
    })

    ///cancel edit
    $('body').on('click', '.chatbot__crud.question .chatbot__content .icon-cancel', function () {
        let id = $(this).closest('.chatbot__content ').attr('question-id');
        $(".chatbot__content[question-id='" + id + "']").find('.switch-input').val(oldValueInput);
        $(this).closest('.chatbot__content').find('.icon').hide();
        $(this).closest('.chatbot__content').find('.icon-edit').show()
        $(".chatbot__content[question-id='" + id + "']").find('.switch-input').attr('readonly', 'true').removeClass('active')

    })

    ///Không add câu hỏi mới vào lúc thêm mới question (icon X)
    $('body').on('click', '.chatbot__crud.question .chatbot__content .icon-no-add', function () {
        let id = $(this).closest('.chatbot__content ').attr('question-id');
        $(".chatbot__content[question-id='" + id + "']").remove()
    })

    $('body').on('click', '.chatbot__crud.answer .chatbot__content .icon-del', function () {
        let id = $(this).closest('.chatbot__content ').attr('answer-id');
    })

    // after new data, event edit input
    $('body').on('click', '.chatbot__crud.question .chatbot__content .icon-edit', function () {
        let id = $(this).closest('.chatbot__content ').attr('question-id');
        $(".chatbot__content[question-id='" + id + "']").find('.switch-input').removeAttr('readonly').addClass('active')
        $(this).closest('.chatbot__content').find('.icon').show()
        $(this).closest('.chatbot__content').find('.icon-edit').hide()
        $(this).closest('.chatbot__content').find('.icon-del').hide()
        let valueInput = $(this).closest('.chatbot__content ').find('.switch-input').val();
        oldValueInput = valueInput;
    })

    $('body').on('click', '.chatbot__crud.answer .chatbot__content .icon-edit', function () {
        let id = $(this).closest('.chatbot__content ').attr('answer-id');
        $(".chatbot__content[answer-id='" + id + "']").find('.switch-input').removeAttr('readonly').addClass('active')
        $(this).closest('.chatbot__content').find('.icon').show()
        $(this).closest('.chatbot__content').find('.icon-edit').hide()
    })
    // after new data, event add input
    $('body').on('click', '.chatbot__crud.question .chatbot__content .icon-add', function () {
        let id = $(this).closest('.chatbot__content ').attr('question-id');
        $(".chatbot__content[question-id='" + id + "']").find('.switch-input').attr('readonly', 'true').removeClass('active')
        $(this).closest(".chatbot__content[question-id='" + id + "']").find('.icon').hide()
        $(this).closest('.chatbot__content').find('.icon-edit').show()
        // $(this).closest('.chatbot__content').find('.icon-del').show()

    })
    //Thêm mới 1 question new-question-text
    $('body').on('click', '.chatbot__crud.question .chatbot__content .icon-add-new', function () {
        let id = $(this).closest('.chatbot__content ').attr('question-id');
        $(".chatbot__content[question-id='" + id + "']").find('.switch-input').attr('readonly', 'true').removeClass('active')
        let value = $(".chatbot__content[question-id='" + id + "']").find('.new-question-text').val()
        $(".chatbot__content[question-id='" + id + "']").find('.new-question-text').attr('value', value)
        $(this).closest(".chatbot__content[question-id='" + id + "']").find('.icon').hide()
        $(this).removeClass('icon-add-new')
        $(this).addClass('icon-add')

        $(this).closest(".chatbot__content[question-id='" + id + "']").find('.icon-no-add').addClass('icon-cancel')
        $(this).closest(".chatbot__content[question-id='" + id + "']").find('.icon-cancel').removeClass('icon-no-add')
    })

    $('body').on('click', '.chatbot__crud.answer .chatbot__content .icon-add', function () {
        let id = $(this).closest('.chatbot__content ').attr('answer-id');
        $(".chatbot__content[answer-id='" + id + "']").find('.switch-input').attr('readonly', 'true').removeClass('active')
        $(this).closest(".chatbot__content[answer-id='" + id + "']").find('.icon').hide();
    })

    $(".card").blur(function () {
        $(this).hide();
    });
}
//-------------toggleSwitch----------------

function toggleSwitch() {
    $('.custom-switch').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
        } else {
            $(this).addClass('active')
        }
    })
}