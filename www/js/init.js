var idTabs = $('#idTabs');


//
var FormLogin = $('#idFormLogin');
FormLogin.submit(function(){}).validationEngine({
    onValidationComplete: function(form, status) {

        //
        if (status == true) {

            $.ajax({
                url: WebSite +'/APPv1/?a=User&b=Login',
                type: 'post',
                dataType: 'json',
                data: FormLogin.find("input[type='hidden'], :input:not(:hidden)").serialize(), // +'&id='+ $('#Group_id').val(),
                success: function(Json){

                    if( Json['Result'] ==true ) {

                        window.localStorage.Username = Json['Data']['Username'];
                        window.localStorage.Token = Json['Data']['Token'];
                        //window.localStorage.setItem("Token", Json['Data']['Token']);

                        HoyoToast.Success({
                            Message: '<span>完成！</span>',
                            Time: 3000,
                            Position: ''
                        });

                        $('#idAreaLogin').addClass('hide');
                        $('#idAreaUser').removeClass('hide');
                        idTabs.tabs('select_tab', 'idTab1');

                    }
                    else {

                        HoyoToast.Fail({
                            Message: '<span>錯誤！'+ Json['Message'] +'</span>',
                            Time: 3000,
                            Position: ''
                        });
                    }

                },
                error: function(xhr, status, error){
                    if ( status =='error' ) {
                        HoyoToast.Fail({
                            Message: '<span>錯誤！和主機 ('+ WebSite +') 連線發生錯誤</span>',
                            Time: 3000,
                            Position: ''
                        });
                    }
                }
            });

        }
    },

    validationEventTrigger: '',
    autoHidePrompt: true,
    autoHideDelay: 3000,
    promptPosition: "bottomLeft: 45",
    validateNonVisibleFields: false,
    prettySelect: true,
    scroll:false
});

//
var FormJoin = $('#idFormJoin');
FormJoin.submit(function(){}).validationEngine({
    onValidationComplete: function(form, status) {

        //
        if (status == true) {

            $.ajax({
                url: WebSite +'/APPv1/?a=PDU&b=Join',
                type: 'post',
                dataType: 'json',
                data: FormJoin.find("input[type='hidden'], :input:not(:hidden)").serialize() +'&Token='+ window.localStorage.Token,
                success: function(Json){

                    if( Json['Result'] ==true ) {

                        HoyoToast.Success({
                            Message: '<span>完成！</span>',
                            Time: 3000,
                            Position: ''
                        });

                        document.getElementById('idFormJoin').reset();
                    }
                    else {

                        HoyoToast.Fail({
                            Message: '<span>錯誤！'+ Json['Message'] +'</span>',
                            Time: 3000,
                            Position: ''
                        });
                    }

                },
                error: function(xhr, status, error){
                    if ( status =='error' ) {
                        HoyoToast.Fail({
                            Message: '<span>錯誤！和主機 ('+ WebSite +') 連線發生錯誤</span>',
                            Time: 3000,
                            Position: ''
                        });
                    }
                }
            });

        }
    },

    validationEventTrigger: '',
    autoHidePrompt: true,
    autoHideDelay: 3000,
    promptPosition: "bottomLeft: 45",
    validateNonVisibleFields: false,
    prettySelect: true,
    scroll:false
});

//
function searchPDU(){

    $('#idTab2Content').addClass('hide');
    $('#idTab2Loading').removeClass('hide');

    $.ajax({
        url: WebSite +'/APPv1/?a=User&b=PDUList',
        type: 'post',
        dataType: 'json',
        data: {
            Token: window.localStorage.Token
        },
        success: function(Json){

            if ( Json['Login'] =='Y' ) {

                setTimeout(function () {
                    $('#idTab2Content').removeClass('hide');
                    $('#idTab2Loading').addClass('hide');
                }, 1000);

                var t='', h='', gt='', gh='';

                if (Json['Result'] == true) {

                    if ( Array.isArray(Json['Data']['Device']) ) {
                        $.each(Json['Data']['Device'], function (k, v) {
                            t = $('#idTab2Template').clone().html();

                            t = str_replace('{{title}}', ((v['Name'] != '') ? v['Name'] : v['URL']), t);
                            t = str_replace('{{LastTime}}', v['LastTime'], t);
                            t = str_replace('{{content}}', '', t);
                            t = str_replace('{{link}}', '', t);
                            t = str_replace('{{id}}', v['id'], t);
                            h += t;
                        });
                    }
                    else{
                        h += '<div class="card col s12 offset-m1 m4">尚未新增 PDU</div>';
                    }

                    // 分群
                    if ( Array.isArray(Json['Data']['Group']) ) {
                        $.each(Json['Data']['Group'], function (k, v) {
                            gt = $('#idTab2TemplateGroup').clone().html();

                            gt = str_replace('{{link}}', '', gt);
                            gh += gt;
                        });
                    }
                    else{
                        gh += '<div class="card col s12 offset-m1 m4">尚未新增分群</div>';
                    }

                }
                else {
                    h += '<div class="card col s12 offset-m1 m4">尚未新增 PDU</div>';
                    gh += '<div class="card col s12 offset-m1 m4">尚未新增分群</div>';

                    HoyoToast.Fail({
                        Message: '<span>錯誤！' + Json['Message'] + '</span>',
                        Time: 3000,
                        Position: ''
                    });
                }

                $('#idTab2PDUOne').html(h);
                $('#idTab2PDUGroup').html(gh);
            }

            // Token 錯誤
            else{
                $('#idAreaLogin').removeClass('hide');
                $('#idAreaUser').addClass('hide')
            }

        },
        error: function(xhr, status, error){
            if ( status =='error' ) {
                HoyoToast.Fail({
                    Message: '<span>錯誤！和主機 ('+ WebSite +') 連線發生錯誤</span>',
                    Time: 3000,
                    Position: ''
                });
            }
        }
    });

}

//
$(document).on('click', '.pduReal', function(){

    var $id = $(this).data('id');

    $('.Page').addClass('hide');
    $('#idPage3').removeClass('hide');

    $('.content').addClass('hide');
    $('.loading').removeClass('hide');

    $.ajax({
        url: WebSite +'/APPv1/?a=PDU&b=Real',
        type: 'post',
        dataType: 'json',
        data: {
            Token: window.localStorage.Token
        },
        success: function(Json){

            if ( Json['Login'] =='Y' ) {

                setTimeout(function () {
                    $('.content').removeClass('hide');
                    $('.loading').addClass('hide');
                }, 300);

            }

            // Token 錯誤
            else{
                $('.Page').addClass('hide');
                $('#idAreaLogin').removeClass('hide');
            }

        },
        error: function(xhr, status, error){
            if ( status =='error' ) {
                HoyoToast.Fail({
                    Message: '<span>錯誤！和主機 ('+ WebSite +') 連線發生錯誤</span>',
                    Time: 3000,
                    Position: ''
                });
            }
        }
    });

});

// 按下返回
$(document).on('click', '.returnAreaUser', function(){

    $('.Page').addClass('hide');
    $('#idAreaUser').removeClass('hide');

});


//
function maintain(){
    var m = '';
    m = $('#idTab4Template').clone().html();
    m = str_replace('{{Username}}', window.localStorage.Username, m);
    m = str_replace('{{Token}}', window.localStorage.Token, m);
    m = str_replace('{{Version}}', Version, m);
    $('#idTab4Show').html(m);
}

//
$(function(){

    if (idTabs.length) {

        idTabs.find('li').click(function(){

            var tab = $(this).data('tab');
            switch(tab){
                case 'A':
                    break;

                case 'B':
                    searchPDU();
                    break;

                case 'C':
                    maintain();
                    break;

            }

        });

        idTabs.tabs({
            //swipeable: true,
            //onShow: function(tab){
            //    console.log($(tab));
            //}
        });
    }

});
