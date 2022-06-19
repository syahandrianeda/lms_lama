// const versisw = new Date().getTime();
// const tesstatis = "versi222";
// const tesdinamis = "versi222";

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js')
//         .then((reg) => {
//             console.log('Teregistrasi', reg);


//         })
//         .catch((er) => console.log("Gagal Teregistrasi", er));

// }

/// coba versi https://whatwebcando.today/articles/handling-service-worker-updates/


function invokeServiceWorkerUpdateFlow(registration) {
    // TODO implement your own UI notification element
    // notification.show("New version of the app is available. Refresh now?");

    // let Notification = document.getElementById("tesBanerr");
    // notification.show("Versi terbaru dari aplikasi ini sudah tersedia, perbarui sekarang?");
    // notification.addEventListener('click', () => {
    //     if (registration.waiting) {
    //         // let waiting Service Worker know it should became active
    //         registration.waiting.postMessage('SKIP_WAITING')
    //     }
    // })

    // let teks;
    if (registration.waiting) {

        teks = registration.waiting.postMessage('SKIP_WAITING')
    }
    console.log(teks)
    let konfirm = confirm("Versi terbaru dari aplikasi ini sudah tersedia (pesan ini akan muncul beberapa kali sebagai tahap upgrade), perbarui sekarang!");
    konfirm = true;
    if (konfirm) {
        console.log(teks)
    }



}

// check if the browser supports serviceWorker at all
if ('serviceWorker' in navigator) {
    // wait for the page to load
    window.addEventListener('load', async () => {
        // register the service worker from the file specified
        const registration = await navigator.serviceWorker.register('/sw.js')

        // ensure the case when the updatefound event was missed is also handled
        // by re-invoking the prompt when there's a waiting Service Worker
        if (registration.waiting) {
            invokeServiceWorkerUpdateFlow(registration)
        }

        // detect Service Worker update available and wait for it to become installed
        registration.addEventListener('updatefound', () => {
            if (registration.installing) {
                // wait until the new Service worker is actually installed (ready to take over)
                registration.installing.addEventListener('statechange', () => {
                    if (registration.waiting) {
                        // if there's an existing controller (previous Service Worker), show the prompt
                        if (navigator.serviceWorker.controller) {
                            invokeServiceWorkerUpdateFlow(registration)
                        } else {
                            // otherwise it's the first install, nothing to do
                            console.log('Service Worker initialized for the first time')
                        }
                    }
                })
            }
        })


        // detect controller change and refresh the page
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
                window.location.reload()
                refreshing = true
            }
        })

    })
}