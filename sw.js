(function () {
    'use strict';

    // console.log( ' SW Hola Mundo');

    self.addEventListener('install', e => {


       // console.log( e );
    });

    
    self.addEventListener('activate', e => {

        // console.log( e );


    });

    self.addEventListener('fetch', ( e ) => {
        // console.log(e);

    });

    // Escuchar push
    self.addEventListener('push', e => {

      
      const data = JSON.parse ( e.data.text() );
      const title  = data.titulo;

      // https://developers.google.com/web/fundamentals/push-notifications/display-a-notification

      const opciones = {
        body: data.cuerpo,
        icon: 'images/icons/icon-72x72.png',
        badge: 'img/badgeFondoBlanco.png',
        image: 'img/papascomunica.jpg',
        //vibrate: [500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500],
        openUrl: '/',
        data: {
           // url: 'https://google.com',
            url: '/',
            id: '1234',
        },
        // actions : [
        //     {
        //         action: 'actualiar',
        //         title: 'Actualizar',
        //         icon: 'img/badgeFondoBlanco.png'
        //     },
        //     {
        //         action: 'eliminar',
        //         title: 'Eliminar',
        //         icon: 'img/badgeFondoBlanco.png'
        //     }
        // ]


      };

      e.waitUntil( self.registration.showNotification( title, opciones ));

    });

    // Cuando se cierra la notificación
    self.addEventListener('notificationclose', e => {



    });

    // Cuando se hace click en la notificación
    self.addEventListener('notificationclick', e => {

        const notificacion = e.notification;
        const accion  = e.action;
        
        // console.log({ notificacion, accion } );

        const respuesta = clients.matchAll()
        .then( clientes => {

            let cliente = clientes.find( c => {
                return c.visibilityState === 'visible';
            });

            
            if ( cliente !== undefined ) {
                cliente.navigate( notificacion.data.url);
                cliente.focus();
            } else {
                clients.openWindow( notificacion.data.url );
            }
            
            return notificacion.close();
        });

        e.waitUntil ( respuesta );

    });


    


}());