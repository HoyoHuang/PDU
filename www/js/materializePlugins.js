var HoyoToast = {

    Success: function($var){
        var Message = $var['Message'] || 'Success';
        var autoClose = $var['autoClose'] || 2000;
        var Position = $var['Position'] || '';

        var $toastContent = $('<span>'+ Message +'</span>');
        Materialize.toast($toastContent, autoClose);

        $('.toast').addClass('gradient-45deg-green-teal');
        //$('#toast-container').css('right', );
    },

    Fail: function($var){
        var Message = $var['Message'] || 'Success';
        var autoClose = $var['autoClose'] || 2000;
        var Position = $var['Position'] || '';

        //var $toastContent = $('<span>'+ Message +'</span><button class="btn-flat toast-action">Undo</button>');
        Materialize.toast(Message, autoClose);

        $('.toast').addClass('gradient-45deg-red-pink');

        switch(Position){
            case 'center':
                var $css = {
                    left: '50%',
                    top: '10%',
                    transform: 'translateX( -50%)',
                    right: 'auto'
                };
                $('#toast-container').css( $css );
                break;
        }

    }
};
