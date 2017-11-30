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

                        window.localStorage.setItem("Token", Json['Data']['Token']);

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
                data: FormJoin.find("input[type='hidden'], :input:not(:hidden)").serialize() +'&Token='+ $Token,
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

    $.ajax({
        url: WebSite +'/APPv1/?a=User&b=PDUList',
        type: 'post',
        dataType: 'json',
        data: {
            Token: $Token
        },
        success: function(Json){

            if( Json['Result'] ==true ) {

                var t = '';
                $.each( Json['Data']['Device'], function(k,v){
                    t = $('#idTab2Template').clone().html();

                    t = str_replace('{{title}}', ((v['Name']!='')? v['Name']: v['URL']), t);
                    t = str_replace('{{LastTime}}', v['LastTime'], t);
                    t = str_replace('{{content}}', '', t);
                    t = str_replace('{{link}}', '', t);
                });

                $('#idTab2PDUOne').html(t);

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

//
function maintain(){
    var m = '';
    m = $('#idTab4Template').clone().html();
    m = str_replace('{{Token}}', $Token, m);
    $('#idTab4Show').html(m);
}

//
$(function(){

    if (idTabs.length) {

        idTabs.find('li').click(function(){
            console.log();

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
