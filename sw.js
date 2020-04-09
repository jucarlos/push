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
        badge: 'img/badgejccm.png',
        imagen: 'img/papascomunica.jpg',
        vibrate: [500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500],
        openUrl: '/'


      };


        

      e.waitUntil( self.registration.showNotification( title, opciones ));

    });

    


}());