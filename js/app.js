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



     // Notificaciones
    function verificaSuscripcion( activado ) {

        return true;

    }

    function enviarNotificacion() {

        const notificationOpts = {
            body: 'Una notificación con opciones',
            icon: 'images/icons/icon-72x72.png'
        };

        const n =  new Notification('Hola Amigo', notificationOpts);

        n.onclick = () => {
            console.log(n);
        };
    }
    function notificarme() {

        if ( !window.Notification ) {
            console.log('Este navegador no soporta push');
            return;
        }

        if ( Notification.permission === 'granted') {
            enviarNotificacion();
        } else if ( Notification.permission !== 'denied' || Notification.permission === 'default') {
            Notification.requestPermission( ( permi ) => {

                console.log( permi );

                if ( permi === 'granted') {
                    enviarNotificacion();
                }
            });
        }

    }

    function getPubliKey() {

        const url = 'https://backend-marco.herokuapp.com/push/key';
         return fetch( url )
        .then( res => res.arrayBuffer())
        .then ( key => new Uint8Array(key));
    }


    getPubliKey().then( console.log );




    

}());