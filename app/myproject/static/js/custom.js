jQuery(document).ready(function ($) {

    $(document).ready(function () {
        var max_fields = 10; //maximum input boxes allowed
        var wrapper = $(".input_fields_wrap"); //Fields wrapper
        var wrapper_project = $(".input_fields_wrap_project"); //Fields wrapper
        var add_button = $(".add_field_button"); //Add button ID

        var content_project = $(".content-project");

        var add_button_project = $(".add_field_project_button"); //Add button ID

        var x = 1; //initlal text box count
        $(add_button).click(function (e) { //on add input button click
            e.preventDefault();
            if (x < max_fields) { //max input box allowed
                x++; //text box increment
                $(wrapper).append('<div><input class="field-show" type="text" name="mytext[]"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
            }
        });

        $(wrapper).on("click", ".remove_field", function (e) { //user click on remove text
            e.preventDefault();
            $(this).parent('div').remove();
            x--;
        })


        $(add_button_project).click(function (e) { //on add input button click
            e.preventDefault();
            $(this).css('display', 'none');
            $(content_project).show(1000);
        });


        $(wrapper_project).on("click", ".close-block", function (e) { //user click on remove text
            e.preventDefault();

            $(content_project).hide(1000);
            $(add_button_project).css('display', 'block');
        })

        // $(wrapper_project).on("click",".button-add", function(e){ //user click on remove text
        //     // e.preventDefault();
        //
        //     $(content_project).hide( 1000 );
        //
        //     $(add_button_project).css('display', 'block');
        // })


        $(".add-form-content-1").submit(function (event) {

            event.preventDefault();


            var data_title = '1';

            var data_url = $(this).attr('action');


            console.log(data_url);

            $.ajax({
                type: "POST",
                url: data_url,
                data: $(this).serialize(),

                success: function (res) {

                    console.log(res);

                    window.location.href = window.location;
                },
                error: function () {
                    console.log("Error !!!")
                }
            });


        });


        console.log('test script')


        $(document).on('click', '.todo-option', function () {

            $(this).children(".block-setting").toggle();

            // $('.todo-list').hide(1000);
            // $('.add-form').show(1000);

            // menu(a);
        });


        $(document).on('click', '.get-today-todo', function (e) {


            e.preventDefault();

            var d = new Date();


            var month = d.getMonth() + 1;
            var day = d.getDate();


            var output = d.getFullYear() + '-' +
                (month < 10 ? '0' : '') + month + '-' +
                (day < 10 ? '0' : '') + day;


            console.log(output);


            $.get("http://127.0.0.1:8000/todo/API/?date=" + output + "&end_date=" + output, function (data) {

                function render() {
                    $("#sortable >.list-todo").remove();
                    for (var i = 0; i < data.length; i++) {
                        var person = data[i];
                        var clone = $("#templates>.list-todo").clone();
                        clone.find(".todo-title").text(person.title);
                        clone.find(".project-title").text(person.project_title);
                        clone.find(".project-color").text(person.color);
                        clone.find(".delete-id").attr('data-id', person.id);

                        clone.find(".delete-form-content").attr('action', '/todo/' + person.id + '/delete/');

                        clone.find(".edit-id-modal").attr('data-target', '#todo_' + person.id);

                        clone.find(".modal.fade").attr('id', 'todo_' + person.id);

                        clone.find(".edit-form-todo").attr('action', '/todo/' + person.id + '/update/');

                        clone.find(".title-todo").attr('value', person.title);



                        console.log(person)

                        $("#sortable").prepend(clone);
                    }
                }

                render();


            }, "json");


        });

        $(document).on('click', 'a.todo_api', function (e) {

            e.preventDefault();

            var url_api = $(this).data('url');


            $.get( url_api + "?status_display=True", function (data) {


                function render() {
                    $("#sortable >.list-todo").remove();
                    for (var i = 0; i < data.length; i++) {
                        var person = data[i];
                        var clone = $("#templates>.list-todo").clone();
                        clone.find(".todo-title").text(person.title);
                        clone.find(".project-title").text(person.project_title);
                        clone.find(".project-color").text(person.color);
                        clone.find(".delete-form-content delete-id").data('id', person.id);


                        $("#sortable").prepend(clone);
                    }
                }

                render();


            }, "json");


        });


        $(document).on('click', '.get-today-seven', function (e) {


            e.preventDefault();

            var d = new Date();


            var month = d.getMonth() + 1;
            var day = d.getDate();


            var output = d.getFullYear() + '-' +
                (month < 10 ? '0' : '') + month + '-' +
                (day < 10 ? '0' : '') + day;


            console.log(output);


            var currentDate = new Date(new Date().getTime() + 168 * 60 * 60 * 1000);


            var day_todo = currentDate.getDate()
            var month_todo = currentDate.getMonth() + 1;
            var year_todo = currentDate.getFullYear()


            var seven_day = year_todo + "-" + (month_todo < 10 ? '0' : '') + month_todo + "-" + (day_todo < 10 ? '0' : '') + day_todo;


            console.log(seven_day);

            $.get("http://127.0.0.1:8000/todo/API/?date=" + output + "&end_date=" + seven_day, function (data) {


                function render() {
                    $("#sortable >.list-todo").remove();
                    for (var i = 0; i < data.length; i++) {
                        var person = data[i];
                        var clone = $("#templates>.list-todo").clone();
                        clone.find(".todo-title").text(person.title);
                        clone.find(".project-title").text(person.project_title);
                        clone.find(".project-color").text(person.color);
                        clone.find(".delete-form-content delete-id").data('id', person.id);


                        $("#sortable").prepend(clone);
                    }
                }

                render();


            }, "json");


        });


        // Getter


// Setter
        $("#id_date_todo").datepicker();


        var data;
        /*----------Creating Slug------------|START-------*/
        var slug = function (str) {
            var $slug = '';
            var trimmed = $.trim(str);
            $slug = trimmed.replace(/[^a-z0-9-]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
            return $slug.toLowerCase();
        }
        /*----------Creating Slug------------|END-------*/
        /*-------Ace Editor----------|START--------*/
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/json");

        /*-------Ace Editor----------|END--------*/
        function createItem(obj) {
            var $obj = null;
            if (obj.name) {
                $obj = $('<a>').attr('href', obj.functionality).text(obj.name);
                $obj = $('<li>').append($obj);
                if (obj.children) {
                    $obj.append(createItem(obj.children));
                }
            } else if (obj.length) {
                $obj = $('<ul>');
                for (var i = 0, l = obj.length; i < l; i++) {
                    $obj.append(createItem(obj[i]));
                }
            }
            return $obj;
        }

        function menu(ul) {
            var li = $(ul).append('<li> <div class="child-wrap"> <div class="drag"><i class="fa fa-bars" aria-hidden="true"></i></div> <div class="toggle"><i class="fa fa-caret-down" aria-hidden="true"></i></div> <div class="input-menu-items"> <input type="text" class="cm-text-data" value="Hello" placeholder="text"> <input type="text" class="cm-text-function" value="Hello" placeholder="functionality"> </div> <div class="clone"><i class="fa fa-clone" aria-hidden="true"></i></div> <div class="delete"><i class="fa fa-trash-o" aria-hidden="true"></i></div> </div><ul class="sub-menu"></ul></li>');
        }

        var a = $('#sortable');
        $(document).on('click', '.add-form', function () {

            $('.todo-list').show(1000);
            $(this).hide(1000);

            // menu(a);
        });


        $(document).on('click', '.form-close', function () {

            $('.todo-list').hide(1000);
            $('.add-form').show(1000);

            // menu(a);
        });

        $(document).on('click', '.todo-list .clone', function () {
            // var b = $(this).closest('.child-wrap').nextAll('.sub-menu');
            console.log('CLONE ')
            // menu(b);
        });
        $(document).on('click', '.code,.menu-prev', function () {
            function FetchChild() {
                var data = [];
                $("#sortable > li").each(function () {
                    data.push(buildJSON($(this)));
                });
                return data;
            }

            function buildJSON($li) {
                var subObj = {
                    name: $li.find(".child-wrap .input-menu-items input.cm-text-data").val(),
                    functionality: $li.find(".child-wrap .input-menu-items input.cm-text-function").val()
                };
                $li.children("ul").children().each(function () {
                    if (!subObj.children) {
                        subObj.children = [];
                    }
                    subObj.children.push(buildJSON($(this)));
                });
                return subObj;
            }

            var obj = FetchChild();
            //$("[output]").html(JSON.stringify(obj, null, 2));
            editor.setValue(JSON.stringify(obj, null, 2));
            //$('menu').empty();
            data = createItem(obj);
            $('menu').html(data);
        });
        $(document).ready(function () {
            var drake = dragula($("#sortable").toArray(), {
                mirrorContainer: $("#sortable")[0]
            });
        });
        $(document).on("click", "#sortable div.toggle", function () {
            $(this).toggleClass("toggle-active");
            $(this).closest(".child-wrap").next("ul").toggle();
        });
        $(document).on("click", "#sortable div.delete", function () {
            $(this).closest("li").remove();

            $(".delete-form-content").submit(function (event) {

                console.log('DDDD FORM');

                event.preventDefault();

                var data_url = $(this).attr('action');


                console.log(data_url);


            });


        });
        $(document).on("click", ".code", function () {
            $('body').toggleClass('code-view');
        });
        $(document).on("click", ".editor-wrapper h2 span", function () {
            $('body').removeClass('code-view');
        });
        $(document).on("click", ".menu-prev", function () {
            $('body').toggleClass('menu-view');
        });
        $(document).on("click", "close", function () {
            $('body').removeClass('menu-view');
        });
        $(document).on("click", function (e) {
            $('body').removeClass('code-view');
        });
        $(document).on("click", ".editor-wrapper,.nav-app-option", function (e) {
            e.stopPropagation();
        });

        /*---------Flex Modal---------*/
        var getModalData;
        $("[modal-click]").click(function () {
            getModalData = $(this).attr("modal-click");
            $('[modal-data="' + getModalData + '"]').addClass("modal-open");
            $(".modals-overlay").toggleClass("overlay-open");
            $('.cm-model-wrapper').addClass('model-wrap-open');
        });
        $(".modals-overlay,.cm-model-wrapper").click(function (e) {
            $('[modal-data="' + getModalData + '"]').removeClass("modal-open");
            $(".modals-overlay").removeClass("overlay-open");
            $('.cm-model-wrapper').removeClass('model-wrap-open');
        });
        $("[modal-data]").click(function (e) {
            e.stopPropagation();
        });
        $("[model-close]").click(function () {
            $(this).addClass('loading');
            setTimeout(function () {
                $('[modal-data="' + getModalData + '"]').removeClass("modal-open");
                $(".modals-overlay").removeClass("overlay-open");
                $('.cm-model-wrapper').removeClass('model-wrap-open');
                $('.btn-def').removeClass('loading');
                $('[modal-data] .cm-project-setting-inner-wrapper input, [modal-data] .cm-project-setting-inner-wrapper textarea').val("");
            }, 1000);
        });
        /*---------END Flex Modal---------*/
        $(document).on('click', '.cm-project-list ul li', function () {
            $(this).addClass('active-data').siblings().removeClass('active-data');
        });
        $(document).ready(function () {
            var urlDecode = location.hash;
            $('[href="' + urlDecode + '"]').parent('li').addClass('active-data');
        });
        $('.advanced.setting-inner').click(function () {
            $(this).next('.cm-adv-form-wrapper').slideToggle();
            $(this).toggleClass('adv-open')
        });
        /*------------------Testing-----------------------*/
        $('.editor-wrapper h2 span').click(function () {
            var JSONToDOM = JSON.parse(editor.getValue(), null, 2);

            function createDomww(obj) {
                var $obj = null;
                if (obj.name) {
                    $obj = $('<li>').append('<div class="child-wrap"> <div class="drag"><i class="fa fa-bars" aria-hidden="true"></i></div> <div class="toggle"><i class="fa fa-caret-down" aria-hidden="true"></i></div> <div class="input-menu-items"> <input type="text" class="cm-text-data" value="' + obj.name + '" placeholder="text"> <input type="text" class="cm-text-function" value="' + obj.functionality + '" placeholder="functionality"> </div> <div class="clone"><i class="fa fa-clone" aria-hidden="true"></i></div> <div class="delete"><i class="fa fa-trash-o" aria-hidden="true"></i></div> </div><ul class="sub-menu"></ul>');
                    if (obj.children) {
                        $obj.append(createDomww(obj.children));
                    }
                } else if (obj.length) {
                    $obj = $('<ul class="sub-menu">');

                    for (var i = 0, l = obj.length; i < l; i++) {
                        $obj.append(createDomww(obj[i]));
                    }
                }
                return $obj;
            }

            $('.cm-dynamic-data').empty();
            $('.cm-dynamic-data').append(createDomww(JSONToDOM));
            setTimeout(function () {
                $('.cm-dynamic-data > ul').attr('id', 'sortable').removeAttr('class');
                var drake = dragula($("#sortable").toArray(), {
                    mirrorContainer: $("#sortable")[0]
                });
            }, 1);
        });








        $('#text').val($('#colorinput').val());

            $('#text').change(function() {
              $('#colorinput').val($('#text').val());
              $('.color-picker').attr('data-value', $('#text').val());
              $('.paper-button').css('background-color', $('#text').val());
            });

            $('#colorinput').change(function() {
              $('#text').val($(this).val().toUpperCase());
              $('.color-picker').attr('data-value', $(this).val().toUpperCase());
            });

            $('.paper-button').click(function(e) {
              let cx = e.clientX;
              console.log(cx);
              let transform = cx - 155;
              console.log(transform);
              // $('.translate').css("transform", 'translate(' + transform + 'px)');
              $('.color-picker').css("transform", "scale(1,1)");
              // $(this).addClass('opened');
            });

            $('#close').click(function() {
              $('.color-picker').css('transform', 'scale(0,0)');
            });

            function rgb2hex(rgb) {
                rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                function hex(x) {
                    return ("0" + parseInt(x).toString(16)).slice(-2);
                }
                return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
            }

            $('.color-picker > div:not(#close)').click(function() {
              let bg = $(this).css('background-color');
              $('.paper-button').css('background-color', bg);
              $('#colorinput').val(rgb2hex($(this).css('background-color')));
              $('#colorinput').change();
            });










    });


});


