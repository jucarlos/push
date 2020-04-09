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

        // console.log(e);
        console.log( e.data.text());

        const title = e.data.text();
        const options = {};

        e.waitUntil( self.registration.showNotification( title, options ));

    });

    


}());