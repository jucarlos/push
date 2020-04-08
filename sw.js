(function () {
    'use strict';

    // console.log( ' SW Hola Mundo');

    self.addEventListener('install', e => {


       console.log( e );
    });

    
    self.addEventListener('activate', e => {

        console.log( e );


    });

    self.addEventListener('fetch', ( e ) => {
        console.log(e);

    });
    


}());