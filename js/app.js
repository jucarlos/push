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

    

}());