(function () {
    
    let url = window.location.href;

    let swLocation = '/push/sw.js';

    // Verificar si podemos usar sw
    if ( navigator.serviceWorker ){

        if ( url.includes('localhost') ) {
            swLocation = '/sw.js';
        }
        navigator.serviceWorker.register(swLocation);
    }

    notificarme();

    // Notificaciones
    function notificarme() {

        if ( !window.Notification ) {
            console.log('Este navegador no soporta push');
            return;
        }

        if ( Notification.permission === 'granted') {
            new Notification('Hola Amigo - granted ');
        } else if ( Notification.permission !== 'denied' || Notification.permission === 'default') {
            Notification.requestPermission( ( permi ) => {

                console.log( permi );

                if ( permi === 'granted') {
                    new Notification('Gracias por contestar');
                }
            });
        }

    }





    

}());