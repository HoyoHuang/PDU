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

                        localStorage.setItem("Token", Json['Data']['Token']);

                        HoyoToast.Success({
                            Message: '<span>完成！</span>',
                            Time: 3000,
                            Position: ''
                        });

                        $('#idAreaLogin').addClass('hide');
                        $('#idAreaUser').removeClass('hide')

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
                    console.log(JSON.stringify(xhr));
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
                data: FormJoin.find("input[type='hidden'], :input:not(:hidden)").serialize(), // +'&id='+ $('#Group_id').val(),
                success: function(Json){

                    if( Json['Result'] ==true ) {

                        localStorage.setItem("Token", Json['Data']['Token']);

                        HoyoToast.Success({
                            Message: '<span>完成！</span>',
                            Time: 3000,
                            Position: ''
                        });

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
                    console.log(JSON.stringify(xhr));
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

                var h = '';
                $('#idTab2PDUOne').html(h);

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
            console.log(JSON.stringify(xhr));
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

            }

        });

        idTabs.tabs({ 'swipeable': true });
    }

});
