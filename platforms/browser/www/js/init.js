

//
var FormLogin = $('#idFormLogin');
FormLogin.submit(function(){}).validationEngine({
    onValidationComplete: function(form, status) {

        //
        if (status == true) {

            $.ajax({
                url: WebSite +'/LeaveGroup&b=Delete',
                type: 'post',
                dataType: 'json',
                data: FromGroupDelete.find("input[type='hidden'], :input:not(:hidden)").serialize() +'&id='+ $('#Group_id').val(),
                success: function(Json){

                    if( Json['Result'] ==true ) {

                        HoyoToast.Success({
                            Message: '<span>完成！</span>',
                            Time: 3000,
                            Position: ''
                        });

                        $('.modal').modal('close');

                        leave(); // 重新讀取群組清單
                        cMain.html(''); // 清空 main

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
