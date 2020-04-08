(function () {
    'use strict';

    // Verificar si podemos usar sw
    if ( navigator.serviceWorker ){
        navigator.serviceWorker.register('/sw.js');
    }

    

}());