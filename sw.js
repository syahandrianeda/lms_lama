const staticCacheName = "statis15";
const dynamicChace = "dinamis015";
const assets = [
    "/","/index.html","/css/w3.css",
    "/css/firststyle.css","/css/css_siswa.css", "/css/css_timeline.css",
    "/css/csssiswa.css","/css/index.html","/css/stylegurukelas.css","/css/w3-theme-blue-grey.css",
    "/img/Gambar%20Orangtua%20copy.png","/img/anaksd.png","/img/PTK.png","/img/eabsensi.webp",
    "/img/icons/pic144.png","/img/lamaso.webp","/img/192.png","/img/L_vT86_100px.png","/img/barloading.gif",
    "/img/bgwa2.png","/img/bgwa3.png","/img/pngegg%20(1).png","/img/pngegg%20(12).png","/img/pngegg%20(13).png","/img/pngegg%20(15).png",
    "/img/pngegg%20(17).png","/img/pngegg%20(14).png","/img/pngegg%20(2).png","/img/pngegg%20(3).png",
    "/img/pngegg%20(4).png","/img/akarkuadrat.PNG","/img/akarkubik.PNG","/img/lg_absensi.png",
    "/img/lg_datakelas.png","/img/lg_frame.webp","/img/lg_kehadiran.webp","/img/lg_kurikulum.png",
    "/img/lg_nilaii.webp","/img/lg_pembelajaran.png","/img/lg_rapor.webp","/img/pangkat.PNG",
    "/img/pecahanbiasa.PNG",
    "/img/pecahancampuran.PNG",
    "/img/arsipsurat.png",
    "/img/galeri.jpg",
    "/img/studio.png",
    "/img/googlemeet.png",
    "/img/hero-bg.png",
    "/img/arsipsurat.jpg",
    "/img/bg_offline.webp",
    "/img/kotadepok.png",
    
    "/img/rubrik1.PNG",
    "/img/rubrik2.PNG",
    "/img/rubrik3.PNG",
    "/img/rubrik4.PNG",
    "/img/rubrik5.PNG",
    
    "/img/sdnratujaya1-transparent.png",
    "/img/sdnratujaya1-transparent2.png",
    "/statis/app.js",
    "/statis/main.js",
    "/statis/gk.js",
    "/statis/guru.js",
    "/statis/exceltabel.js",
    "/statis/excelstaff.js",
    "/statis/excelkepsek.js",
    "/statis/gmp.js",
    "/statis/kepsek.js",
    "/statis/ortu.js",
    "/statis/siswa.js",
    "/idsekolah.js",
    "/statis/staff.js",
    "/timekbm.js",
    "/statis/update.json",
    "/statis/dataakreditasi.json",
    "/statis/wsyg_ade.js",
    "/statis/newhome.js",
    "/statis/rpp.js",
    "/statis/barcode.js",
    "/statis/editortooltip.js",
    "/statis/staff_bukuinduk.js",
    "/statis/bukuinduk.js",
    "/user/gmp.html",
    "/user/guru.html",
    "/user/kepsek.html",
    "/user/offline.html",
    "/user/siswa.html",
    "/user/orangtua.html",
    "/user/staff.html","/statis/staffbukuinduk.js"






];


const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
};

self.addEventListener('install', evt => {
    evt.waitUntil( // jangan ada skripWait di proses instal

        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);

        }).catch(err => console.log(err))
    );
});


self.addEventListener('activate', evt => {

    console.log('server worker berahsil diaktivasi')
    evt.waitUntil(
        caches.keys().then(keys => {
            //         //console.log(keys);
            return Promise.all(keys.filter(key => key !== staticCacheName && key !== dynamicChace)
                .map(key => caches.delete(key))
                //             .map(key => caches.delete(key))
            );
            //     })
            // );
        })
    )
})
self.addEventListener('fetch', evt => {

    // console.log(evt.request.url);https://script.google.com/macros/
    if (evt.request.url.indexOf('https://script.google.com') == -1 && assets.indexOf(evt.request.url) == -1 && evt.request.url.indexOf('https://drive.google.com') == -1) {
        evt.respondWith(
            caches.match(evt.request).then(cacheRes => {
                return cacheRes || fetch(evt.request).then(async fetchRes => {
                    const cache = await caches.open(dynamicChace);
                    cache.put(evt.request.url, fetchRes.clone());
                    // check cached items size
                    limitCacheSize(dynamicChace, 5);
                    return fetchRes;
                }).catch(er=>{console.log("errror dari sini: "+ er)});
            }).catch((er) => {
                //console.log("errror di sini kapan munculnya")
                console.log(er)
                if (evt.request.url.indexOf('.html') > -1) {
                    return caches.match('/user/offline.html');
                }
            })
        );
    }else{
    }
    // // console.log('fetch event', evt);
})

////////////////////////
self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    console.log(event.data);
});
