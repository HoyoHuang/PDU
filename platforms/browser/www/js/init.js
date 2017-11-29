

//
var FormLogin = $('#idFormLogin');
FormLogin.submit(function(){}).validationEngine({
    onValidationComplete: function(form, status) {

        console.log(status);
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
