(function () {
    
    let url = window.location.href;

    let swLocation = '/push/sw.js';

    let urlServices = 'https://backend-marco.herokuapp.com/';

    let swReg;

    // Verificar si podemos usar sw
    if ( navigator.serviceWorker ){

        if ( url.includes('localhost') ) {
            swLocation = '/sw.js';
            urlServices= 'http://10.128.222.79:3000/';
        }

        window.addEventListener('load', () => {

            
            navigator.serviceWorker.register(swLocation)
            .then ( ( reg ) => {

                swReg = reg;

                // si registra cualquier cosa distinta de undefines
                // es que ya podemos llamar a la función que verifica
                // la suscripbión. 
                // llamo a verificaSuscrpcion sin paréntesis porque 
                // quiereo que la llame inmediatamente
                swReg.pushManager.getSubscription()
                .then( verificaSuscripcion );

            });
        });
    }



     // Notificaciones
    function verificaSuscripcion( activadas ) {

        //console.log( 'Activadas: ', activadas );
        //console.log( 'Permision:', Notification.permission);

        if ( !window.Notification ) {
            //console.log('Este navegador no soporta push');
            return;
        }

        if ( Notification.permission === 'granted' && activadas === null ){
            // Por si no tiene bien las subscripcion
            subscribir();
        }
        

     
        if ( Notification.permission !== 'granted') {
            //     enviarNotificacion();
            // } else

      //  if ( Notification.permission !== 'denied' || Notification.permission === 'default') {

            //console.log('ENTRANDO');

            Notification.requestPermission( permi => {

                if ( permi === 'granted' ) {
                    subscribir();
                    
                }
            });
        }

        // if ( Notification.permission === 'granted') {
        //     enviarNotificacion();
        // } else if ( Notification.permission !== 'denied' || Notification.permission === 'default') {
        //     Notification.requestPermission( ( permi ) => {

        //         console.log( permi );

        //         if ( permi === 'granted') {
        //             enviarNotificacion();
        //         }
        //     });
        // }

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

    function getPubliKey() {

        
        return fetch( urlServices + 'push/key' )
        .then( res => res.arrayBuffer())
        .then ( key => new Uint8Array(key));
    }

    function subscribir() {

        //console.log(' SUBSCRIBIENDO');

        if ( !swReg ) return console.log('No hay sw');

        getPubliKey().then( ( key ) => {

            swReg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: key
            })
            .then ( res => res.toJSON() )
            .then ( suscripcion  => {

                fetch( urlServices + 'push/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify( suscripcion )
                })
                .then ( verificaSuscripcion )
                .catch ( cancelarSubscripcion );

              //  console.log( suscripcion );
               // verificaSuscripcion( suscripcion );

            } );


        });


        
    }


    //getPubliKey().then( console.log );


    // Para desactivar las subscripciones también manualmente
    function cancelarSubscripcion() {

        swReg.pushManager.getSubscription()
        .then ( subs => {
            subs.unsubscribe().
            then ( () => verificaSuscripcion( false ));

        });
    }



    

}());