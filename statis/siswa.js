//KUMPULAN VARIABLE ARRAY

let jsonguru = [], //sekali klik
    //jsondatasiswa=[],  // sekali klik
    jsondatamurid = [],  // sekali klik
    jsonabsen = [], // jika ada perubahan, mungkin diberi setInterval
    jsondatapendaftar = [],  //jika ada pendaftar guru baru
    arraysiswatidakaktif = []; // jika ada pendaftar siswa baru;


// KUMPULAN VARIABLE STRING
let jumlahseluruhsiswadisekolah = "",
    tekstapel = "",
    awalmasuksekolah = "",
    angkasemester = "";


// VARIABEL URL GS include idSS DAN PENGGANTINYA; 
let url_login_guru;
let url_login_siswa;

let url_data_siswa;
let url_data_absen;
let url_data_pembelajaran;
let url_data_nilai;
let url_data_kurikulum;

// variabel nilai-nilai
let nilairespon = [];
let nilairesponkronologi = [];
let kronologijson = [];



const anjangsanaguru = () => {
    alert("Maaf, fitur belum tersedia")
}


const setCookie = (cname, cvalue) => {
    var dt = new Date();
    let d = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 23, 59, 59)

    var expires = "expires=" + d;
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const getCookie = (cname) => {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const checkCookie = (dicek) => {
    var ceken = getCookie(dicek);
    if (ceken != "") {
        // alert("Welcome again " + ceken);
        return ceken;

    } else {
        return ""

    }
};




function logout() {

    w3_close();
    let nilaikuki = getCookie("lamankode");
    let nilaipukul = getCookie("ketpukul");
    let nilaikethadir = getCookie("kethadir")
    let nilaisrcImg = getCookie("srcImg")

    var dt = new Date();
    let d = new Date(dt.getFullYear() - 1, dt.getMonth(), dt.getDate(), 0, 0, 0, 0)

    var expires = "expires=" + d;
    document.cookie = "lamankode=" + nilaikuki + ";" + expires + ";path=/";
    document.cookie = "ketpukul=" + nilaipukul + ";" + expires + ";path=/";
    document.cookie = "kethadir=" + nilaikethadir + ";" + expires + ";path=/";
    document.cookie = "srcImg=" + nilaisrcImg + ";" + expires + ";path=/";


    window.localStorage.clear();
    window.location.replace("/index.html");
}

var mySidebar = document.getElementById("mySidebar"); // Get the Sidebar
var overlayBg = document.getElementById("myOverlay"); // Get the DIV with overlay effect


function w3_open() { // Toggle between showing and hiding the sidebar, and add overlay effect
    if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
        overlayBg.style.display = "none";
    } else {
        mySidebar.style.display = 'block';
        overlayBg.style.display = "block";
    }
}

function w3_close() { // Close the sidebar with the close button
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
}

const cekDiskLocalStorage = async () => {
    if (navigator.storage && navigator.storage.estimate) {
        const quota = await navigator.storage.estimate();


        const percentageUsed = (quota.usage / quota.quota) * 100;
        console.log(`dipake: ${quota.usage}`)
        console.log(`You've used ${percentageUsed}% of the available storage.`);
        const remaining = quota.quota - quota.usage;
        console.log(`You can write up to ${remaining} more bytes.`);
    }
}



const tampilinsublamansiswa = (fitur) => {
    //datakelas
    let divpesan = document.querySelector(".pesankhususgurukelas");
    if (fitur == "libur") {
        lamansiswa.style.display = "none";
        lamanlibur.style.display = "block";
        lamanmateri.style.display = "none"
        if(divpesan.className.indexOf("w3-hide")==-1){
            divpesan.className += " w3-hide";
        }

        document.getElementById("mySidebar").scrollIntoView();
    } else if (fitur == "aktifsudahabsen") {
        lamansiswa.style.display = "block";
        document.querySelector(".sudahabsen").style.display = "none"
        document.querySelector(".belumabsen").style.display = "none"
        lamanlibur.style.display = "none";
        lamanmateri.style.display = "none";
        panggilmateri();
        panggildatagooglemeet();


        document.getElementById("mySidebar").scrollIntoView();

    } else if (fitur == "aktifbelumabsen") {
        lamansiswa.style.display = "block";
        document.querySelector(".sudahabsen").style.display = "none"
        document.querySelector(".belumabsen").style.display = "inline-block"
        lamanlibur.style.display = "none";
        lamanmateri.style.display = "none";
        if(divpesan.className.indexOf("w3-hide")==-1){
            divpesan.className += " w3-hide";
        }

    } else if (fitur == 3) { // ketika siswa udah mengeklik materi dan sudah ditampilkan materi;
        panggilmateri();
        document.querySelector(".sudahabsen").style.display = "none"
        ///-------------------------------------------------------

        document.getElementById("mySidebar").scrollIntoView();
    } else if (fitur == 4) { // lamansudah aktif;
        lamansiswa.style.display = "block";
        document.querySelector(".sudahabsen").style.display = "none"
        document.querySelector(".belumabsen").style.display = "none"
        lamanlibur.style.display = "none";
        lamanmateri.style.display = "block"


        document.getElementById("lamanmateri").scrollIntoView();


    }

    w3_close();



}

const StringTanggal = (tgl) => { //parameter tgl bentuk tgl
    let m = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let y = tgl.getFullYear();
    let string = y + "-" + m + "-" + d;
    //console.log(string)
    return string
}

const NamaHariIniLengkap = () => {
    let tgl = new Date();
    let m = tgl.getMonth();
    let sm = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let day = tgl.getDay()
    let y = tgl.getFullYear();
    let string = y + "-" + sm + "-" + d;
    let arraynamaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    //console.log(string)

    let hari = arraynamaHari[day] + ", " + tanggalfull(string)

    return hari
}

const NamaHaridariIndex = (index) => {
    let arraynamabulan = ["Mg", "Sn", "Sl", "Rb", "Km", "Jm", "Sb"];
    return arraynamabulan[index]


}

function tanggalfull(tgl) {
    var d = new Date(tgl);
    var tgl = d.getDate();
    var bln = d.getMonth();
    var thn = d.getFullYear();
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return tgl + " " + bulan[bln] + " " + thn;
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    };
    return i;
}

function deleteZero(i) {
    if (i.slice(0, 1) == "0") {
        i = i.slice(1, 2);
    };
    return i;
}

function uploadfilebantu2gagal() {


    //define the width to resize e.g 600px
    var resize_width = 150; //without px

    //get the image selected
    var item = document.querySelector('#lampirkanpotoabsen').files[0];

    //create a FileReader
    var reader = new FileReader();

    //image turned to base64-encoded Data URI.
    reader.readAsDataURL(item);
    reader.name = item.name; //get the image's name
    reader.size = item.size; //get the image's size
    reader.onload = function (event) {
        var img = new Image(); //create a image
        img.src = event.target.result; //result is base64-encoded Data URI
        img.name = event.target.name; //set name (optional)
        img.size = event.target.size; //set size (optional)
        img.onload = function (el) {
            var elem = document.createElement('canvas'); //create a canvas

            //scale the image to 600 (width) and keep aspect ratio
            var scaleFactor = resize_width / el.target.width;
            elem.width = resize_width;
            elem.height = el.target.height * scaleFactor;

            //draw in canvas
            var ctx = elem.getContext('2d');
            ctx.drawImage(el.target, 0, 0, elem.width, elem.height);

            //get the base64-encoded Data URI from the resize image
            var srcEncoded = ctx.canvas.toDataURL(el.target, 'image/jpeg', 0);

            //assign it to thumb src
            var poto = document.querySelector('#potosiswa')
            poto.src = srcEncoded;


            //document.querySelector('#fileContent').value = srcEncoded;

            //   document.bantukirim.fileContent.value = srcEncoded;
            //document.getElementById("formidentitas").style.display="block";
            /*Now you can send "srcEncoded" to the server and
            convert it to a png o jpg. Also can send
            "el.target.name" that is the file's name.*/

            //buat element input dengan attribute name: data/fileContent, 

            kodefilepotosiswaabsen.innerHTML = "";

            var inputbase64 = document.createElement("input");
            inputbase64.setAttribute("name", "fileContent");
            inputbase64.value = srcEncoded.replace(/^.*,/, '');

            var inputfilename = document.createElement("input");
            inputfilename.setAttribute("name", "filename");
            inputfilename.value = "avatar_" + namebantukirim.value.toUpperCase().replace(/\s+/, "_");

            var inputmimetype = document.createElement("input");
            inputmimetype.setAttribute("name", "mimeType")
            inputmimetype.value = "data:image/jpeg"; //e.target.result.match(/^.*(?=;)/)[0]
            //sekarang kita taroh di sini:
            //document.getElementById("idpoto_potoguru").value = srcEncode; //oFREvent.target.result;
            // buat generate input
            kodefilepotosiswaabsen.appendChild(inputbase64);
            kodefilepotosiswaabsen.appendChild(inputfilename);
            kodefilepotosiswaabsen.appendChild(inputmimetype);
            //console.log(inputbase64.length)


        }
        loginbantu.style.display = "inline-block";
    }

    let a = new Date();
    let b = a.getDate();
    let c = a.getMonth() + 1;
    let d = a.getFullYear()
    let idok = b + "" + addZero(c) + "" + d;
    document.bantukirim.tokensiswa.value = tokensiswa;
    document.bantukirim.id.value = idok;
    document.bantukirim.kelas.value = namakelas;
    document.bantukirim.name.value = namasiswa;
    //document.bantukirim.name.value = namasiswa;
    document.bantuisi.style.display = "none";
    document.querySelector(".inginkirim").style.display = "block";
    thankyou_messagekirim.innerHTML = "Data Siap Dikirim"
}

function uploadfilebantu() {
    
    //define the width to resize e.g 600px
    var resize_width = 150; //without px
    //get the image selected
    var item = document.querySelector('#lampirkanpotoabsen').files[0];
    //create a FileReader
    var reader = new FileReader();
    //image turned to base64-encoded Data URI.
    reader.readAsDataURL(item);
    reader.name = item.name; //get the image's name
    reader.size = item.size; //get the image's size
    reader.onload = function (event) {
        var img = new Image(); //create a image
        img.src = event.target.result; //result is base64-encoded Data URI

        img.size = event.target.size; //set size (optional)
        img.onload = function (el) {
            var elem = document.createElement('canvas'); //create a canvas
            //scale the image to 600 (width) and keep aspect ratio
            var scaleFactor = resize_width / el.target.width;
            elem.width = resize_width;
            elem.height = el.target.height * scaleFactor;
            //draw in canvas
            var ctx = elem.getContext('2d');
            ctx.drawImage(el.target, 0, 0, elem.width, elem.height);
            //get the base64-encoded Data URI from the resize image
            var srcEncoded = ctx.canvas.toDataURL(el.target, 'image/jpeg', 0);
            //assign it to thumb src

            var poto = document.querySelector('#potosiswa')
            poto.src = "/img/barloading.gif";

            kodefilepotosiswaabsen.innerHTML = "";

            // var inputbase64 = document.createElement("input");
            // inputbase64.setAttribute("name", "fileContent");
            // inputbase64.value = srcEncoded.replace(/^.*,/, '');

            // var inputfilename = document.createElement("input");
            // inputfilename.setAttribute("name", "filename");
            // inputfilename.value = "avatar_" + namebantukirim.value.toUpperCase().replace(/\s+/, "_");

            // var inputmimetype = document.createElement("input");
            // inputmimetype.setAttribute("name", "mimeType")
            // inputmimetype.value = "data:image/jpeg"; //e.target.result.match(/^.*(?=;)/)[0]
            //sekarang kita taroh di sini:

            // buat generate input
            // kodefilepotosiswaabsen.appendChild(inputbase64);
            // kodefilepotosiswaabsen.appendChild(inputfilename);
            // kodefilepotosiswaabsen.appendChild(inputmimetype);
            let d_bs64 = srcEncoded.replace(/^.*,/, '');
            let d_fname = "avatar_" + namebantukirim.value.toUpperCase().replace(/\s+/, "_");
            let d_mtp = srcEncoded.match(/^.*(?=;)/)[0];
            let data = new FormData();
            data.append("action", "uploaddulu");
            data.append("filename", d_fname);
            data.append("fileContent", d_bs64);
            data.append("mimeType", d_mtp);
            data.append("kelas", namakelas);


            var url = url_absensiswa + "?action=uploaddulu";
            fetch(url, {
                method: 'post',
                body: data
            }).then(m => m.json())
                .then(k => {
                    var inputbase64 = document.createElement("input");
                    inputbase64.setAttribute("name", "fileContent");
                    poto.src = (k.idfile == "") ? "/img/NO+GAGAL.png" : "https://drive.google.com/uc?export=view&id=" + k.idfile;
                    if (k.sukses == "Sukses") {
                        document.bantuisi.style.display = "none";
                        document.querySelector(".inginkirim").style.display = "block";
                        thankyou_messagekirim.innerHTML = "Data Siap Dikirim"
                        inputbase64.value = k.idfile;
                    } else {
                        document.bantuisi.style.display = "block";
                        document.querySelector(".inginkirim").style.display = "none";
                        thankyou_messagekirim.innerHTML = "Poto Gagal Masuk, coba lagi ya..."
                        inputbase64.value = srcEncoded;
                    }
                    let a = new Date();
                    let b = a.getDate();
                    let c = a.getMonth() + 1;
                    let d = a.getFullYear()
                    let idok = b + "" + addZero(c) + "" + d;
                    document.bantukirim.tokensiswa.value = tokensiswa;
                    document.bantukirim.id.value = idok;
                    document.bantukirim.kelas.value = namakelas;
                    document.bantukirim.name.value = namasiswa;
                    //document.bantukirim.name.value = namasiswa;
                    kodefilepotosiswaabsen.appendChild(inputbase64);
                }).catch(er => console.log(er));
        }
        loginbantu.style.display = "inline-block";
    }

    //document.bantuisi.time_stampbantu.value = new Date();
    //document.bantukirim.Time_Stamp.value = new Date();
    // let a = new Date();
    // let b = a.getDate();
    // let c = a.getMonth() + 1;
    // let d = a.getFullYear()
    // let idok = b + "" + addZero(c) + "" + d;
    // document.bantukirim.tokensiswa.value = tokensiswa;
    // document.bantukirim.id.value = idok;
    // document.bantukirim.kelas.value = namakelas;
    // document.bantukirim.name.value = namasiswa;
    // //document.bantukirim.name.value = namasiswa;
    // document.bantuisi.style.display = "none";
    // document.querySelector(".inginkirim").style.display = "block";
    // thankyou_messagekirim.innerHTML = "Data Siap Dikirim"
}

function bantuabsen() {
    document.bantuisi.reset();
    document.bantukirim.reset();
    document.getElementById("divbantuabsen").style.display = "block";
    document.querySelector(".inginkirim").style.display = "none";
    thankyou_messagekirim.innerHTML = ""

    bantusiapa.innerHTML = namasiswa;
    bantuisi.style.display = "block";

    potosiswa.setAttribute("src", "https://drive.google.com/uc?export=view&id=1RysbjHk6Ip3EG5oHO0iluI3MNOJD9FSb");



    //document.getElementById("potosiswa").src="https://drive.google.com/uc?export=view&id=1RysbjHk6Ip3EG5oHO0iluI3MNOJD9FSb";        
}

function gantikehadiranbantu() {
    var sss = document.bantuisi.pilih_kehadiran;
    document.bantukirim.kehadiran.value = sss.value;
}

function tombolbantukirim() {
    document.getElementById("bantusiapa").innerHTML = "<i class='fa fa-spin fa-spinner'></i> Sedang proses ...";
    document.bantuisi.style.display = "none";
    document.getElementById("loginbantu").style.display = "none";

    var namaform = document.getElementById("bantukirim");
    var en = new FormData(namaform)

    var url = url_absensiswa + "?action=siswaabsensiswa";
    fetch(url, {
        method: 'post',
        body: en
    }).then(m => m.json())
        .then(k => {
            document.getElementById("bantusiapa").innerHTML = ""; //+ "  Data telah berhasil dibantu, Terima kasih";
            document.getElementById("thankyou_messagekirim").style.display = "block";
            document.getElementById("thankyou_messagekirim").innerHTML = k.ket;
            //document.getElementById("tombolbantusimpan").style.display="block"; //????
            document.getElementById("loginclosebantu").innerHTML = "Selesai dan Keluar";

            //console.log(k);
            let imgsiswa = k.kuki.srcImg;

            let kethadir = k.kuki.hadir;
            let tstamp = k.kuki.pukul;
            let ketpukul = "Pukul " + addZero(new Date(tstamp).getHours()) + ":" + addZero(new Date(tstamp).getMinutes()) + ":" + addZero(new Date(tstamp).getSeconds());

            document.querySelector(".avatarsiswa").setAttribute("src", imgsiswa)
            document.querySelector(".ketabsensiswa").innerHTML = kethadir + " " + ketpukul;
            //kuki sudah absen
            setCookie("lamankode", 2);
            setCookie("srcImg", imgsiswa);
            setCookie("kethadir", kethadir);
            setCookie("ketpukul", ketpukul);
            tampilinsublamansiswa("aktifsudahabsen");
            
            
        })
        .catch(err => {
            document.getElementById("thankyou_messagekirim").innerHTML = err;
            setCookie("lamankode", 1)
            tampilinsublamansiswa("aktifbelumabsen")

        })
}
let stoploadingtopbar;
const loadingtopbarin = (el) => {
    var elem = document.querySelector("." + el);
    elem.className = elem.className.replace("w3-hide", "");
    elem.style.width = "1px";
    var width = 1;
    stoploadingtopbar = setInterval(frame2, 10);

    function frame2() {
        if (width >= 1000000) {
            clearInterval(stoploadingtopbar);
            // elem.style.width = 0;
            // elem.style.width = 90 + '%';
            // elem.innerHTML = `100%`;
        } else {
            width += 100;
            elem.style.width = width / 1000 + '%';
            //elem.innerHTML = (width / 105).toFixed(0) + "% ";
        }
    }
}

(async function () {
    namasekolah.innerHTML = identitassekolah;
    awasekolahbeda.innerHTML = identitassekolah.toUpperCase();
    namakota.innerHTML = identitaskotasekolah;

    var elem = document.querySelector(".loadingtopbar");
    elem.style.width = "1px";
    let divlod;
    loadingtopbarin("loadingtopbar");
    dashboardnamasiswa.innerHTML = `<i class="fa fa-spin fa-spinner w3-large"><i>`;
    /// fungsi untuk mengupdate datasiswa ();
    let url_login_siswa = jlo.url_datauser + "?action=loginsiswa&idss=" + jlo.ss_datauser;

    await fetch(url_login_siswa + "&id=" + tokensiswa)
        .then(m => m.json())
        .then(k => {
            // console.log(k)
            if (k.ijinkan == "ok") {
                window.localStorage.setItem("typeuser", JSON.stringify(k));
                //window.location.replace("/user/siswa.html");
                // ceksiswa.innerHTML = k.ijinkan;
                namasiswa = k.user;
                namakelas = k.room;
                tokensiswa = k.idrow;
                jenjang = k.jenjang;
                absenheader = "absen" + jenjang;

            } else {
                //ceksiswa.innerHTML = k.ijinkan;
                alert(k.ijinkan);
                window.localStorage.removeItem("typeuser");
                window.location.replace("/index.html")
            }

        }).catch(err => {
            console.log(err)
        })
    await fetch(url_absenkaldik).then(m => m.json()).then(k => {
        //console.table(k.records)
        arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
        arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));
        localStorage.setItem('Kaldik', JSON.stringify(k.records));

        localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl))
        let nilaikuki = getCookie("lamankode");


        var dt = new Date();
        let d = new Date(dt.getFullYear() - 1, dt.getMonth(), dt.getDate(), 0, 0, 0)
        let cekkode = getCookie("lamankode");
        let hrini = new Date().getDay();
        var expires = "expires=" + d;
        if (hrini !== 0 && cekkode == 0) {
            document.cookie = "lamankode=" + nilaikuki + ";" + expires + ";path=/";
        }

        // let cekkode = getCookie("lamankode");
        // console.log(cekkode);
        // let hrini = new Date().getDay();
        // console.log(hrini);
        // if (hrini !== 0 && cekkode == 0) {
        //     absennya(true)
        // }

    }).catch(er => console.log(er))

    let cek = getCookie("lamankode");
    if (cek != "" & cek != null) {
        if (cek == 0) {
            let k = JSON.parse(localStorage.getItem("TglLibur"))
            let arrayKetLibur = JSON.parse(localStorage.getItem("Ketlibur"))
            arrayStringTglLibur = k.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
            arrayKetLibur = k.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

            //cek sekarang libur kaga!
            let day = new Date();
            let indekhari = day.getDay()
            // console.log(indekhari)
            let indek = arrayStringTglLibur.indexOf(StringTanggal(day));

            if (indekhari == 0 || indekhari == 6 || indek > -1) {
                //console.log("Libur atau Sabtu Minggu")
                belajaraktif = false;
                // tampilkan laman libur:
                let thariini = NamaHariIniLengkap();
                tekslibur1.innerHTML = `hari <b> ${thariini}</b>`;
                document.querySelector(".ketabsensiswa").innerHTML = `hari <b> ${thariini}</b> ini libur ya ...,`;
                if (indek > -1) {
                    tekslibur1.innerHTML += ` dan bertepatan dengan <b> ${arrayKetLibur[indek]} </b>`;
                    document.querySelector(".ketabsensiswa").innerHTML += ` dan bertepatan dengan <b> ${arrayKetLibur[indek]} </b>`;
                } else {
                    //tekslibur1.innerHTML += ` dan bertepatan dengan <b> ${arrayKetLibur[3]} </b>`
                }
            }
            //stop loading        
            loadingmodal.style.display = "none";
            //tampilin halaman libur:
            tampilinsublamansiswa("libur")
        } else if (cek == 1) {
            // stop loading
            loadingmodal.style.display = "none";
            //tampiin halaman belumabsen;
            document.querySelector(".ketabsensiswa").innerHTML = "Ananda Belum Absen";
            tampilinsublamansiswa("aktifbelumabsen")

        } else if (cek == 2) {
            let srcimg = getCookie("srcImg");
            let ket = getCookie("kethadir");;
            let pkl = getCookie("ketpukul");

            document.querySelector(".avatarsiswa").setAttribute("src", srcimg)
            document.querySelector(".ketabsensiswa").innerHTML = ket + " " + pkl;
            // stop loading
            loadingmodal.style.display = "none";
            //tampiin halaman belumabsen;
            tampilinsublamansiswa("aktifsudahabsen")
        } else {
            let srcimg = getCookie("srcImg");
            let ket = getCookie("kethadir");;
            let pkl = getCookie("ketpukul");

            document.querySelector(".avatarsiswa").setAttribute("src", srcimg)
            document.querySelector(".ketabsensiswa").innerHTML = ket + " " + pkl;
            // stop loading
            loadingmodal.style.display = "none";
            tampilinsublamansiswa(cek)
            //tempilankan halaman materi
        }
        namaku.innerHTML = namasiswa;
        dashboardnamasiswa.innerHTML = namasiswa + " ( Kelas " + namakelas + " )";

    } else {
        await fetch(url_absenkaldik).then(m => m.json()).then(k => {
            //console.table(k.records)
            arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
            arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));
            localStorage.setItem('Kaldik', JSON.stringify(k.records));

            localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl))
            // console.log(k.records)
            // console.log(k.stringTgl)

            namaku.innerHTML = namasiswa;
            dashboardnamasiswa.innerHTML = namasiswa + " ( Kelas " + namakelas + " )";

            //cek sekarang libur kaga!
            let day = new Date();
            let indekhari = day.getDay()
            // console.log(indekhari)
            let indek = arrayStringTglLibur.indexOf(StringTanggal(day));

            if (indekhari == 0 || indekhari == 6 || indek > -1) {
                //console.log("Libur atau Sabtu Minggu")
                belajaraktif = false;
                // tampilkan laman libur:
                let thariini = NamaHariIniLengkap();
                tekslibur1.innerHTML = `hari <b> ${thariini}</b>`
                if (indek > -1) {
                    tekslibur1.innerHTML += ` dan bertepatan dengan <b> ${arrayKetLibur[indek]} </b>`
                } else {
                    //tekslibur1.innerHTML += ` dan bertepatan dengan <b> ${arrayKetLibur[3]} </b>`
                }

                // stop loading
                loadingmodal.style.display = "none";
                //tampiin halaman belumabsen;

                //kuki hari libur
                setCookie("lamankode", 0);
                tampilinsublamansiswa("libur")
            } else {
                // loadingmodal.style.display= "none";
                //console.log("Ga Libur")
                belajaraktif = true;
                absennya(true)
                //kuki belajaraktif                
                //document.querySelector(".ketabsensiswa").innerHTML = "Ananda Belum Absen"             
                //setCookie("lamankode", 1)   
                //tampilinsublamansiswa("aktifbelumabsen")
            }
        }).catch(er => {
            console.log(er)
            //    setTimeout(function(){
            //     alert("Ups, maaf terjadi kesalahan ... 2 detik lagi akan kembali ("+er+")");
            //   location.reload()
            // },2000)
        });


    }

        let elinfo = document.querySelector(".pesankhususkepsek");
        let ss = jlo.ss_datauser;
        let ur = jlo.url_datauser;
        let ling = ur + "?idss=" + ss;
 
    fetch(ling + "&action=usulanperbaikandata")
        .then(m => m.json())
        .then(k => {
            
            let cariidd = k.datasiswa.filter(s => s.id == tokensiswa);
            
            if (cariidd.length == 0) {
                datahtml =`<h3 class="w3-center">Belum Pernah Mengusulkan Perubahan Data</h3>
                Ananda belum pernah mengajukan perubahan data. Periksa data diri Ananda di menu <b> Tentang Aku</b>. Informasi singkat Ananda akan muncul. Jika ada data Ananda ada kesalahan atau ada data yang perlu diubah, silakan pilih menu <b>Ajuan perubahan Data</b> pada tombol paling bawah.
                <br><br>
                Atau silakan klik <button class="w3-btn warnaeka w3-round-large w3-border-bottom w3-border-black" onclick="profilsayasiswa()">Biodata Saya</button>
                <br><br>`;
            } else {
                let t = (cariidd[0].usulanperubahandata.indexOf("disetujui")>-1)?"Telah disetujui":"sedang menunggu persetujuan Guru Kelas";
                datahtml =`<h3 class="w3-center">Status Usulan Perubahan Data</h3>
                Usulan perubahan data Ananda ${t}<br><br>
                `;

            }
            elinfo.innerHTML = datahtml;
        })
        .catch(er => {
            console.log(er);
           
        })

        clearInterval(stoploadingtopbar);
        divlod = document.querySelector(".loadingtopbar");
        divlod.style.width = "100%";
        setTimeout(() => {
            divlod.style.width = "1px"
            divlod.className += " w3-hide";
    
        }, 3000);
  
        let datahtml = "",
            fil;  
})()

const absennya = (bol) => {
    if (bol) {
        //console.log("cara data absen")
        let a = new Date();
        let b = a.getDate();
        let c = a.getMonth() + 1;
        let d = a.getFullYear()
        let idok = b + "" + addZero(c) + "" + d;
        fetch(url_absensiswa + "?action=absensiswahariini&kelas=" + namakelas + "&tokensiswa=" + tokensiswa + "&id=" + idok)
            .then(m => m.json())
            .then(k => {

                //console.log(k.siswahariini.length);
                sudahhadir = k.siswahariini.length;
                if (sudahhadir > 0) {
                    let imag = k.siswahariini[0].fileContent;
                    let imgsisw = imag.replace("https://drive.google.com/file/d/", "").replace("/view?", "").replace("usp=drivesdk", "");
                    let imgsiswa = "https://drive.google.com/uc?export=view&id=" + imgsisw;

                    let kethadir = k.siswahariini[0].kehadiran;
                    let tstamp = k.siswahariini[0].Time_Stamp;
                    let ketpukul = "Pukul " + addZero(new Date(tstamp).getHours()) + ":" + addZero(new Date(tstamp).getMinutes()) + ":" + addZero(new Date(tstamp).getSeconds());

                    document.querySelector(".avatarsiswa").setAttribute("src", imgsiswa)
                    document.querySelector(".ketabsensiswa").innerHTML = kethadir + " " + ketpukul;
                    loadingmodal.style.display = "none";
                    //kuki sudah absen
                    setCookie("lamankode", 2);
                    setCookie("srcImg", imgsiswa);
                    setCookie("kethadir", kethadir);
                    setCookie("ketpukul", ketpukul);
                    // stop loading
                    //tampiin halaman belumabsen;
                    tampilinsublamansiswa("aktifsudahabsen");
                } else {
                    loadingmodal.style.display = "none";
                    //kuki belum absen
                    setCookie("lamankode", 1)
                    // stop loading
                    //tampiin halaman belumabsen;
                    document.querySelector(".ketabsensiswa").innerHTML = "Ananda Belum Absen"
                    tampilinsublamansiswa("aktifbelumabsen")

                }


                //});//.catch(err => {console.log(err);location.replace("siswa.html")}) 
                //}
            }).catch(er => {
                //alert("Ups, maaf terjadi kesalahan ... 2 detik lagi akan kembali ("+er+")");
                console.log(er); //
                alert("Terjadi kesalahan, silakan hubungi pihak sekolah.")
                setTimeout(function () {
                    //location.reload()
                }, 2000)
            });; //.catch(err => {console.log(err);location.replace("siswa.html")}) 
    }
}


const lihatraportpts = () => {
    //cek dulu data apinya ada ga untuk namasiswa ini:
    w3_close();
    loadingAPI.style.display = "block";
    fetch(urlnilai + "?action=cekpublikasiraportpts&kelas=" + namakelas)
        .then(m => m.json())
        .then(r => {
            let namaanakini = r.data.filter(k => k.namasiswa == namasiswa); //"ABIN NUGRAHA");
            if (namaanakini.length > 0) {
                if (namaanakini[0].ptspublikasi == "show") {
                    modalraport(namaanakini[0].raportpts)

                } else {

                    alert("Mohon Maaf, Raport belum dipublikasikan.")
                }
            } else {
                alert("Mohon Maaf, Raport belum dipublikasikan.")
            }
            loadingAPI.style.display = "none";
        }).catch(er => {
            alert(er);
            loadingAPI.style.display = "none";

        })
}

const modalraport = (id) => {
    loadingljk.style.display = "block";

    document.querySelector(".kontenmateri").innerHTML = "";
    infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`;
    $('#infoloadingljk').nextAll('button').remove();
    $.getJSON(urlnilai + "?idmateri=" + id + "&action=previewriwayat", function (json) {

        //loadingljk.style.display  = "none";
        //$("#output").html(brkline(json))
        // document.getElementById("judulpetunjuk").innerHTML = "Preview e-Lamaso";
        //        document.getElementById("isipetunjuk").innerHTML = brkline(json);

        infoloadingljk.innerHTML = brkline(json) + "<br><br><br><span class='w3-clear'></span>";

        let tombol = document.createElement("button");
        tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
        tombol.setAttribute("onclick", "printPortrait('infoloadingljk,,,${StringTanggal(new Date())}')");
        tombol.innerHTML = `<i class="fa fa-print"></i>  Cetak `

        infoloadingljk.innerHTML += "<center><hr/>";
        infoloadingljk.after(tombol)

    })

}

let datakelulusansiswa = {};
const pengumumankelulusan = async () => {
    let dataapikelulusan = {};
    let tgl = tanggalpengumumankenaikankelulusan;//new Date(2022, 5, 15, 9, 0, 0);
    let tglTime = tgl.getTime();
    let tglNow = new Date().getTime();
    // let benarga = (tglTime > tglNow) ? true : false; // <---- skrip oke nih
    let benarga = (tglTime > tglNow) ? true : false;

    //getdatafromtab
    let htmlfokus = document.querySelector(".htmlfokus");
    let htmlfokuslainnya = document.querySelector(".htmlfokuslainnya");
    let btntombol = document.querySelector(".tmblprintkelulusan");
    btntombol.className = btntombol.className.replace("w3-show", "w3-hide");
    let tekshtmlfokus = "";
    let tekshtmlfokuslainnya = "";
    modalkelulusan.style.display = "block";


    document.querySelector(".kontenmateri").innerHTML = "";
    htmlfokus.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`;
    if (benarga) {
        tekshtmlfokus = "Tanggal Pengumuman Kelulusan Ananda diperkirakan Tanggal " + tanggalfulllengkap(tgl) + "<br/> waktu Sekarang : " + tanggalfulllengkap(new Date());
        tekshtmlfokuslainnya = "";

    } else {
        let tab = "skkelulusan";
        let param = "&kelas=" + namakelas + "&prefiktab=" + tab; //+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
        tekshtmlfokus = "Silakan Pilih Pengumuman untuk Anda periksa pada tabel di bawah ini!";
        await fetch(urlnilai + "?action=getdatafromtab" + param)
            .then(m => m.json())
            .then(k => {
                // console.log(k)
                if (k.result == 0) {
                    datakelulusansiswa["adapengumuman"] = "Maaf, Pengumuman Kelulusan untuk kelas Ananda belum dipublikasikan";
                    datakelulusansiswa["kodepengumuman"] = 0;
                } else {
                    dataapikelulusan = k.data.filter(n => n.namasiswa == namasiswa);
                    let indekdobel;
                    if (dataapikelulusan.length == 0) {
                        datakelulusansiswa["adapengumuman"] = "Maaf, Pengumuman kelulusan untuk Ananda belum dipublikasikan";
                        datakelulusansiswa["kodepengumuman"] = 0;
                    } else {
                        indekdobel = dataapikelulusan.length - 1;
                        datakelulusansiswa["idpengumuman"] = dataapikelulusan[indekdobel].idfile
                        datakelulusansiswa["adapengumuman"] = "&checkmark; Tersedia";
                        datakelulusansiswa["kodepengumuman"] = 1;
                    }
                }
            })
            .catch(er => console.log(er));
        let parame = "&kelas=" + namakelas + "&prefiktab=skhu"
        await fetch(urlnilai + "?action=getdatafromtab" + parame)
            .then(n => n.json())
            .then(o => {
                if (o.result == 0) {
                    datakelulusansiswa["adaskhb"] = "Maaf, Surat Keterangan Hasil Belajar untuk kelas Ananda belum dipublikasikan";
                    datakelulusansiswa["kodeskhb"] = 0;
                } else {
                    let arskhb = o.data.filter(b => b.namasiswa == namasiswa);
                    let indekskhb;
                    if (arskhb.length == 0) {
                        datakelulusansiswa["adaskhb"] = "Maaf, Surat Keterangan Hasil Belajar belum dipublikasikan guru Ananda";
                        datakelulusansiswa["kodeskhb"] = 0;
                    } else {
                        indekskhb = arskhb.length - 1;
                        datakelulusansiswa["idskhb"] = arskhb[indekskhb].idfile;
                        datakelulusansiswa["adaskhb"] = "&checkmark; Tersedia";
                        datakelulusansiswa["kodeskhb"] = 1;

                    }
                }

            })
            .catch(er => console.log(er));

        let paramer = "&kelas=" + namakelas + "&prefiktab=daftarraport"
        await fetch(urlnilai + "?action=getdatafromtab" + paramer)
            .then(n => n.json())
            .then(o => {
                if (o.result == 0) {
                    datakelulusansiswa["adaskraport"] = "Maaf, Surat Keterangan Daftar Nilai Raport untuk kelas Ananda belum dipublikasikan";
                    datakelulusansiswa["kodeskraport"] = 0;
                } else {
                    let arskrr = o.data.filter(b => b.namasiswa == namasiswa);
                    let indekskrr;
                    if (arskrr.length == 0) {
                        datakelulusansiswa["adaskraport"] = "Maaf, Surat Keterangan Daftar Nilai Raport belum dipublikasikan guru Ananda";
                        datakelulusansiswa["kodeskraport"] = 0;
                    } else {
                        indekskrr = arskrr.length - 1;
                        datakelulusansiswa["idskraport"] = arskrr[indekskrr].idfile;
                        datakelulusansiswa["adaskraport"] = "&checkmark; Tersedia";
                        datakelulusansiswa["kodeskraport"] = 1;

                    }
                }

            })
            .catch(er => console.log(er))



        let tombolpengumuman = (datakelulusansiswa["kodepengumuman"] == 1) ? `<button onclick="apikelulusan('${datakelulusansiswa["idpengumuman"]}')">Cek</button>` : "-";
        let tombolskhb = (datakelulusansiswa["kodeskhb"] == 1) ? `<button onclick="apikelulusan('${datakelulusansiswa["idskhb"]}')">Cek</button>` : "-";
        let tombolskraport = (datakelulusansiswa["kodeskraport"] == 1) ? `<button onclick="apikelulusan('${datakelulusansiswa["idskraport"]}')">Cek</button>` : "-";

        tekshtmlfokuslainnya = `
            <table class="w3-table-all">
                <tr>
                    <td>Surat Pengumuman Kelulusan</td>
                    <td>${tombolpengumuman}</td>
                    <td class="pengumumantersedia">${datakelulusansiswa["adapengumuman"]}</td>
                    </tr>
                    <tr>
                    <td>Surat Keterangan Hasil Belajar</td>
                    <td>${tombolskhb}</td>
                    <td>${datakelulusansiswa["adaskhb"]}</td>
                    </tr>
                    <tr>
                    <td>Surat Keterangan Daftar Nilai Raport</td>
                    <td>${tombolskraport}</td>
                    <td>${datakelulusansiswa["adaskraport"]}</td>
                </tr>
            </table>
            `;

    }
    htmlfokus.innerHTML = tekshtmlfokus;
    htmlfokuslainnya.innerHTML = tekshtmlfokuslainnya;

    //console.log(benarga)
}

const apikelulusan = (idfile) => {
    let htmlfokus = document.querySelector(".htmlfokus");
    htmlfokus.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxlarge'></i> Sedang proses ...";
    //let htmlfokuslainnya = document.querySelector(".htmlfokuslainnya");
    fetch(urlnilai + "?idmateri=" + idfile + "&action=previewriwayat")
        .then(m => m.json())
        .then(k => {
            htmlfokus.innerHTML = brkline(k);
            let btntombol = document.querySelector(".tmblprintkelulusan");
            btntombol.className = btntombol.className.replace("w3-hide", "w3-show");
        })
        .catch(er => htmlfokus.innerHTML = er)
}
const printmodalkelulusan = () => {
    let isibody = document.querySelector(".htmlfokus").innerHTML;

    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO DATA KELULUSAN</title>`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=Raleway">`;
    head.innerHTML += `<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>`;
    head.innerHTML += `<style type="text/css">
    .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}
    </style>`;

    head.innerHTML += `<style type="text/css" media="print">
    @media print {
        html,body{height:100%;width:100%;margin:0;padding:0}
        
         @page {
            size: A4 portrait;
            max-height:100%;
            max-width:100%;
            
            }
    }
    </style>`;


    body.innerHTML = `${isibody}`;



    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}

const profilsayasiswa = () => {
    let ss = jlo.ss_datauser;
    let ur = jlo.url_datauser;
    let ling = ur + "?idss=" + ss;
    let datahtml = "",
        fil;
    loadingljk.style.display = "block";
    let img = document.querySelector(".avatarsiswa");
    let srcimg = img.getAttribute("src");
    // console.log(srcimg)

    document.querySelector(".kontenmateri").innerHTML = "";
    infoloadingljk.innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"></p>`;

    fetch(ling + "&action=datasiswaaktif&kelas=" + namakelas)
        .then(m => m.json())
        .then(k => {
            //console.log(k);
            fil = k.datasiswa.filter(k => k.id == tokensiswa)[0];
            //console.log(fil);
            infoloadingljk.innerHTML = `
            <h4 class="w3-center">Biodataku (Profil)</h4>
            <div class="w3-center">
            <img src='${srcimg}' class='avatarsiswa' style="width:50%"/><br/>
            <sup>Poto Profil ini berdasarkan Poto Absen Ananda hari ini</sup>
            </div>
            <hr/>
           
            <table class="w3-table w3-striped w3-border">
                <tr class="warnaeka">
                    <td colspan="3" class="w3-center">Kode Akses Lamaso (Token)</td>
                </tr>
                <tr>
                    <td>Kode Token</td>
                    <td>:</td>
                    <td>${fil.id}</td>
                </tr>
                
                
                <tr class="warnaeka">
                    <td colspan="3" class="w3-center">Data Pribadi Siswa</td>
                </tr>
                <tr>
                    <td>Nama Lengkap</td>
                    <td>:</td>
                    <td>${fil.pd_nama}</td>
                </tr>
                <tr>
                    <td>Tempat, Tanggal Lahir</td>
                    <td>:</td>
                    <td>${fil.pd_tl}, ${tanggalfull(fil.pd_tanggallahir)}</td>
                </tr>
                <tr>
                    <td>Kelas</td>
                    <td>:</td>
                    <td>${fil.nama_rombel}</td>
                </tr>
                <tr>
                    <td>Nomor Induk Sekolah (NIS)</td>
                    <td>:</td>
                    <td>${fil.nis}</td>
                </tr>
                <tr>
                    <td>Nomor Induk Sekolah Nasional (NISN)</td>
                    <td>:</td>
                    <td>${fil.nisn}</td>
                </tr>
                <tr>
                    <td>Agama</td>
                    <td>:</td>
                    <td>${fil.pd_agama}</td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td>:</td>
                    <td>${(fil.pd_jk == "L") ? "Laki-laki" : "Perempuan"}</td>
                </tr>
                
                
                <tr>
                    <td>Nomor Induk Kependudukan (NIK)</td>
                    <td>:</td>
                    <td>${fil.nik}</td>
                </tr>
                <tr>
                    <td>Nomor Handphone (HP Whatsapp)</td>
                    <td>:</td>
                    <td>${fil.pd_hp}</td>
                </tr>
                <tr>
                    <td>Alamat</td>
                    <td>:</td>
                    <td>${fil.pd_alamat}</td>
                </tr>
                <tr class="w3-white">
                    <td colspan="3" class="w3-center"></td>
                </tr>
                
                <tr class="warnaeka">
                    <td colspan="3" class="w3-center">Data Orang Tua</td>
                </tr>
                <tr>
                    <td>Nama Ayah</td>
                    <td>:</td>
                    <td>${fil.pd_namaayah}</td>
                </tr>
                
                <tr>
                    <td>Nama Ibu</td>
                    <td>:</td>
                    <td>${fil.pd_namaibu}</td>
                </tr>
            </table>
            Apabila data-data tersebut ada bagian data yang kurang tepat, Silakan ajukan Usulan Perubahan Data di tombol berikut ini
            <br/>
            <br/>
            <div class="w3-center">
            <button class="w3-button w3-card-4 w3-round-large warnaeka" onclick="biolengkap()">Biodata Detail</button>
            <button class="w3-button w3-card-4 w3-round-large warnaeka" onclick="ajuanperubahandata()">Ajuan Perubahan Data</button>
            </div>
            <br/>
            `;
            //infoloadingljk.innerHTML = datahtml;

        })
}
const htmldataprofil = () => {
    let html = `
    <h3 class="w3-center warnaeka w3-round-large w3-card-4">DATA SISWA</h3>
    <div style="overflow-x:auot">
    <table class="w3-table w3-striped w3-border">
        <tr>
            <th class="w3-light-green w3-center" colspan="3">KODE AKSES</th>
        </tr>
        <tr>
            <td>Kode Token</td>
            <td>:</td>
            <td class="hdp_id">hdp_id</td>
        </tr>
        <tr>
            <td>Status Data</td>
            <td>:</td>
            <td class="hdp_usulanperubahandata">usulanperubahandata</td>
        </tr>
        <tr>
            <th colspan="3"></th>
        </tr>
        <tr>
            <th class="w3-light-green w3-center" colspan="3">NARAHUBUNG</th>
        </tr>
        <tr>
            <td>Email</td>
            <td>:</td>
            <td class="hdp_dapo_email">hdp__dapo_email</td>
        </tr>
        <tr>
            <td>No. HP WA</td>
            <td>:</td>
            <td class="hdp_pd_hp">hdp_pd_hp"</td>
        </tr>
        <tr>
            <th colspan="3"></th>
        </tr>
        <tr>
            <th class="w3-light-green w3-center" colspan="3">JENJANG KELAS</th>
        </tr>
        <tr>
            <td>Jenjang Kelas</td>
            <td>:</td>
            <td class="hdp_jenjang">hdp_jenjang</td>
        </tr>
        <tr>
            <td>Rombel</td>
            <td>:</td>
            <td class="hdp_nama_rombel">hdp_nama_rombel</td>
        </tr>
        <tr>
            <th colspan="3"></th>
        </tr>
        <tr>
            <th class="w3-light-green w3-center" colspan="3">DATA PRIBADI</th>
        </tr>
        <tr>
        <td>NIS</td>
        <td>:</td>
        <td class="hdp_nis"> hdp_nis</td>
    </tr>
     <tr>
        <td>NISN</td>
        <td>:</td>
        <td class="hdp_nisn">hdp_nisn</td>
    </tr>
        <tr>
            <td>Nama Lengkap</td>
            <td>:</td>
            <td class="hdp_pd_nama">pd_nama</td>
        </tr>
        <tr>
            <td>Jenis Kelamin</td>
            <td>:</td>
            <td class="hdp_pd_jk">hdp_pd_jk</td>
        </tr>

        <tr>
        <td>Agama</td>
        <td>:</td>
        <td class="hdp_pd_agama">hdp_pd_agama</td>
        </tr>
        <tr>
            <td>Tempat Lahir</td>
            <td>:</td>
            <td class="hdp_pd_tl"> hdp_pd_tl</td>
        </tr>
        <tr>
            <td>Tanggal Lahir</td>
            <td>:</td>
            <td class="hdp_pd_tanggallahir"> hdp_pd_tanggallahir</td>
        </tr>
        <tr>
            <td>No Registrasi Akta Kelahiran</td>
            <td>:</td>
            <td class="hdp_dapo_noregistrasiaktalahir"> hdp_dapo_noregistrasiaktalahir</td>
        </tr>
        <tr>
            <td>Anak Ke-</td>
            <td>:</td>
            <td class="hdp_dapo_anakkeberapa"></td>
        </tr>
        <tr>
            <td>Jumlah Saudara Kandung</td>
            <td>:</td>
            <td><span class="hdp_dapo_jumlahsaudarakandung">...</span> Saudara</td>
        </tr>
        
        <tr>
            <td>Berkebutuhan Khusus?</td>
            <td>:</td>
            <td class="hdp_dapo_kebutuhankhusus"></td>
        </tr>
        <tr>
            <td>Sekolah Asal</td>
            <td>:</td>
            <td class="hdp_dapo_sekolahasal"></td>
        </tr>
        <tr>
            <td colspan="3" class="w3-center"><b>Dokumen Akta Kelahiran/Surat Kenal Lahir</b></td>
        </tr>
        <tr>
            <td colspan="3" class="hdp_dok_akte">
                
            </td>
        </tr>
        <tr>
            <td>NIK</td>
            <td>:</td>
            <td class="hdp_nik">hdp_nik</td>
        </tr>
         <tr>
            <td>Nomor KK</td>
            <td>:</td>
            <td class="hdp_nokk">hdp_nokk</td>
        </tr>
        <tr>
            <td>Alamat Jalan</td>
            <td>:</td>
            <td class="hdp_pd_alamat">hdp_pd_alamat</td>
        </tr>
        <tr>
            <td>Nama Dusun</td>
            <td>:</td>
            <td class="hdp_dapo_dusun">hdp_dapo_dusun</td>
        </tr>
        <tr>
            <td>RT</td>
            <td>:</td>
            <td class="hdp_dapo_rt"></td>
        </tr>
        
        <tr>
            <td>RW</td>
            <td>:</td>
            <td class="hdp_dapo_rw"></td>
        </tr>
        <tr>
            <td>Kelurahan</td>
            <td>:</td>
            <td class="hdp_dapo_kelurahan">hdp_dapo_kelurahan</td>
        </tr>
        <tr>
            <td>Kecamatan</td>
            <td>:</td>
            <td class="hdp_dapo_kecamatan">hdp_dapo_kecamatan</td>
        </tr>
        <tr>
            <td>Kota</td>
            <td>:</td>
            <td class="hdp_dapo_kota">hdp_dapo_kota</td>
        </tr>
        <tr>
            <td>Provinsi</td>
            <td>:</td>
            <td class="hdp_dapo_provinsi">hdp_dapo_provinsi</td>
        </tr>
        <tr>
            <td>Kode Pos</td>
            <td>:</td>
            <td class="hdp_dapo_kodepos"></td>
        </tr>
        <tr>
            <td>Jenis Tinggal</td>
            <td>:</td>
            <td class="hdp_dapo_jenistinggal">hdp_dapo_jenistinggal</td>
        </tr>

        <tr>
            <td>Moda Transportasi</td>
            <td>:</td>
            <td class="hdp_dapo_alattransportasi">hdp_dapo_alattransportasi</td>
        </tr>
        <tr>
            <td colspan="3" class="w3-center"><b>Dokumen Kartu Keluarga</b></td>
        </tr>
        <tr>
            <td colspan="3" class="hdp_dok_kk">
                
            </td>
        </tr>
        <tr>
            <th colspan="3"></th>
        </tr>
        <tr>
            <th class="w3-light-green w3-center" colspan="3">Koordinat Geografis</th>
        </tr>
        <tr>
            <td>Lintang (Latitude)</td>
            <td>:</td>
            <td class="hdp_dapo_lintang">hdp_dapo_lintang</td>
        </tr>
        <tr>
            <td>Bujur (Longitude)</td>
            <td>:</td>
            <td class="hdp_dapo_bujur">hdp_dapo_longitude</td>
        </tr>
        <tr>
            <td>Jarak Rumah Ke sekolah</td>
            <td>:</td>
            <td class="hdp_dapo_jarakrumahkesekolah">hdp_dapo_jarakrumahkesekoilah</td>
        </tr>
        <tr>
            <th colspan="3"></th>
        </tr>
        <tr>
            <th class="w3-light-green w3-center" colspan="3">Program KIP/KKS/KPS/PKH/PIP</th>
        </tr>
        <tr>
            <td>Nomor KKS<br><sub>Kartu Keluarga Sejahtera)</sub></td>
            <td>:</td>
            <td class="hdp_dapo_nomorkks"></td>
        </tr>
        
        <tr>
            <td colspan="3" class="w3-center"><b>Dokumen KKS (Kartu Keluarga Sejahtera)</b></td>
        </tr>
        <tr>
            <td colspan="3" class="hdp_dok_kks">
               
            </td>
        </tr>
        <tr>
            <td>Penerima KPS/PKH?</td>
            <td>:</td>
            <td class="hdp_dapo_penerimakps"></td>
        </tr>
        <tr>
            <td>Nomor KPS/PKH</td>
            <td>:</td>
            <td class="hdp_dapo_nokps">hdp_dapo_nokps</td>
        </tr>
        
        <tr>
            <td colspan="3" class="w3-center"><b>Dokumen KPS(Kartu Perlindungan Sosial) / PKH(Program Keluarga Harapan)</b></td>
        </tr>
        <tr>
            <td colspan="3" class="hdp_dok_kpspkh">
                
            </td>
        </tr>
        <tr>
            <td>Memiliki KIP?</td>
            <td>:</td>
            <td class="hdp_dapo_penerimakip">hdp_dapo_penerimakip</td>
        </tr>
        <tr>
            <td>Nomor KIP</td>
            <td>:</td>
            <td class="hdp_dapo_nomorkip">hdp_dapo_nomorkip</td>
        </tr>
        <tr>
            <td>Nama di KIP</td>
            <td>:</td>
            <td class="hdp_dapo_namadikip">hdp_dapo_namadikip</td>
        </tr>
        
        <tr>
            <td colspan="3" class="w3-center"><b>Dokumen KIP(Kartu Indonesia Pintar)</b></td>
        </tr>
        <tr>
            <td colspan="3" class="hdp_dok_kip">
                
            </td>
        </tr>
        
        <tr>
            <th colspan="3"></th>
        </tr>
        <tr>
            <th class="w3-light-green w3-center" colspan="3">Alasan Layak PIP</th>
        </tr>
        <tr>
            <td>Layak PIP?</td>
            <td>:</td>
            <td class="hdp_dapo_layakpip">hdp_dapo_layakpip</td>
        </tr>
        <tr>
            <td>Alasan layak</td>
            <td>:</td>
            <td class="hdp_dapo_alasanlayakpip">hdp_dapo_alasanlayakpip</td>
        </tr>
        <tr>
            <th colspan="3"></th>
        </tr>
        <tr>
            <th class="w3-light-green w3-center" colspan="3">BANK PENERIMA PIP<br/>Khusus bagi siswa yang mendapatkan dana PIP</th>
        </tr>
        <tr>
            <td>Nama Bank</td>
            <td>:</td>
            <td class="hdp_dapo_bank"></td>
        </tr>
        <tr>
            <td>Nomor Rekening Bank</td>
            <td>:</td>
            <td class="hdp_dapo_nomorrekeningbank"></td>
        </tr>
        <tr>
            <td>Rekening Atas Nama</td>
            <td>:</td>
            <td class="hdp_dapo_rekeningatasnama"></td>
        </tr>
        <tr>
            <th colspan="3"></th>
        </tr>
        <tr>
            <th class="w3-light-green w3-center" colspan="3">DATA ORANG TUA</th>
        </tr>
        <tr>
            <td colspan="3" class="w3-center"><b>Ayah Kandung</b></td>
        </tr>
        <tr>
            <td>Nama Lengkap Ayah</td>
            <td>:</td>
            <td class="hdp_pd_namaayah"></td>
        </tr>
        <tr>
            <td>Tanggal Lahir Ayah</td>
            <td>:</td>
            <td class="hdp_dapo_tahunlahirayah"></td>
        </tr>
        <tr>
            <td>Pendidikan Ayah</td>
            <td>:</td>
            <td class="hdp_dapo_jenjangpendidikanayah"></td>
        </tr>
        <tr>
            <td>NIK Ayah</td>
            <td>:</td>
            <td class="hdp_dapo_nikayah"></td>
        </tr>
        <tr>
            <td>Pekerjaan Ayah</td>
            <td>:</td>
            <td class="hdp_dapo_pekerjaanayah"></td>
        </tr>
        <tr>
            <td>Penghasilan Ayah</td>
            <td>:</td>
            <td class="hdp_dapo_penghasilanayah"></td>
        </tr>
        
        <tr>
            <td>Berkebutuhan Khusus?</td>
            <td>:</td>
            <td class="hdp_dapo_abkayah"></td>
        </tr>
        <tr>
            <td colspan="3" class="w3-center"><b>Ibu Kandung</b></td>
        </tr>
        <tr>
            <td>Nama Lengkap Ibu</td>
            <td>:</td>
            <td class="hdp_pd_namaibu"></td>
        </tr>
        <tr>
            <td>Tanggal Lahir Ibu</td>
            <td>:</td>
            <td class="hdp_dapo_tahunlahiribu"></td>
        </tr>
        
        <tr>
            <td>Pendidikan Ibu</td>
            <td>:</td>
            <td class="hdp_dapo_jenjangpendidikanibu"></td>
        </tr>
        <tr>
            <td>NIK Ibu</td>
            <td>:</td>
            <td class="hdo_dapo_nikibu"></td>
        </tr>
        <tr>
            <td>Pekerjaan Ibu</td>
            <td>:</td>
            <td class="hdp_dapo_pekerjaanibu"></td>
        </tr>
        <tr>
            <td>Penghasilan Ibu</td>
            <td>:</td>
            <td class="hdp_dapo_penghasilanibu"></td>
        </tr>
        
        <tr>
            <td>Berkebutuhan Khusus?</td>
            <td>:</td>
            <td class="hdp_dapo_abkibu"></td>
        </tr>
        <tr>
            <td colspan="3" class="w3-center"><b>Wali</b></td>
        </tr>
        <tr>
            <td>Nama Lengkap Wali</td>
            <td>:</td>
            <td class="hdp_dapo"></td>
        </tr>
        <tr>
            <td>Tanggal Lahir Wali</td>
            <td>:</td>
            <td class="hdp_dapo_tahunlahirwali"></td>
        </tr>
        
        <tr>
            <td>Pendidikan Wali</td>
            <td>:</td>
            <td class="hdp_dapo_jenjangpendidikanwali"></td>
        </tr>
        <tr>
            <td>NIK Wali</td>
            <td>:</td>
            <td class="hdo_dapo_nikwali"></td>
        </tr>
        <tr>
            <td>Pekerjaan Wali</td>
            <td>:</td>
            <td class="hdp_dapo_pekerjaanwali"></td>
        </tr>
        <tr>
            <td>Penghasilan Wali</td>
            <td>:</td>
            <td class="hdp_dapo_penghasilanwali"></td>
        </tr>
        <tr>
            <td>Berkebutuhan Khusus (Wali)</td>
            <td>:</td>
            <td class="hdp_dapo_abkwali"></td>
        </tr>
        <tr>
            <th colspan="3"></th>
        </tr>
        <tr>
            <th class="w3-light-green w3-center" colspan="3">DATA PRIODIK PERKEMBANGAN SISWA</th>
        </tr>
        <tr>
            <td>Tinggi Badan (Cm)</td>
            <td>:</td>
            <td class="hdp_dapo_tinggibadan"></td>
        </tr>
        <tr>
            <td>Berat Badan (Kg)</td>
            <td>:</td>
            <td class="hdp_dapo_beratbadan"></td>
        </tr>
        <tr>
            <td>Lingkar Kepala</td>
            <td>:</td>
            <td class="hdp_dapo_lingkarkepala"></td>
        </tr>
    </table>
    </div>
    `;

    return html
};

function umur(tgllahir) {
    var curday = new Date().getDate();; //document.cir.len11.value;
    var curmon = new Date().getMonth(); //.cir.len12.value;
    var curyear = new Date().getFullYear(); //.cir.len13.value;

    var calday = new Date(tgllahir).getDate(); //document.cir.len21.value;
    var calmon = new Date(tgllahir).getMonth(); //document.cir.len22.value;
    var calyear = new Date(tgllahir).getFullYear(); //document.cir.len23.value;

    var curd = new Date(curyear, curmon, curday);
    var cald = new Date(calyear, calmon, calday);


    var dife = datediff(curd, cald);
    let objret = {};
    objret.tahun = dife[0];
    objret.bulan = dife[1];
    objret.hari = dife[2];
    return objret
}

function datediff(date1, date2) {
    var y1 = date1.getFullYear(),
        m1 = date1.getMonth(),
        d1 = date1.getDate(),
        y2 = date2.getFullYear(),
        m2 = date2.getMonth(),
        d2 = date2.getDate();

    if (d1 < d2) {
        m1--;
        d1 += DaysInMonth2(y2, m2);
    }
    if (m1 < m2) {
        y1--;
        m1 += 12;
    }
    return [y1 - y2, m1 - m2, d1 - d2];
}

function DaysInMonth2(Y, M) {
    with (new Date(Y, M, 1, 12)) {
        setDate(0);
        return getDate();
    }
}

const konversi_tanggal = (el, kelas) => {
    let d = new Date(el.value);
    let div = document.querySelector("." + kelas);

    var tgl = d.getDate();
    var bln = d.getMonth();
    var thn = d.getFullYear();
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    let result = tgl + " " + bulan[bln] + " " + thn;

    div.innerHTML = `${result}`;
};
const htmlformulirdatasiswa = () => {
    let html = `
    <h3 class="w3-center warnaeka w3-round-large w3-card-4">FORMULIR AJUAN DATA SISWA</h3>
    <div style="overflow-x:auto">
    <form name="formajuandatasiswa" id="formajuandatasiswa">
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
            <h3 class="w3-light-green w3-center" >KODE AKSES<br>(Tidak bisa diubah)</h3>
            <label for="hfd_id">Kode Token:
        <br/><input type="text" class="w3-input  w3-border w3-border-black w3-round" name="id" id="hfd_id" disabled/>
            <hr/>
            <label for="hfd_usulanperubahandata">Status Data:</label>
            <br/>
            <input type="text" class="w3-input  w3-border w3-border-black w3-round"  name="usulanperubahandata" id="hfd_usulanperubahandata" disabled>
        </fieldset> 
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
        <h3 class="w3-light-green w3-center" >JENJANG KELAS<br>(Tidak bisa diubah)</h3>
        <label for="hfd_jenjang">Jenjang Kelas:</label>
            <br/>
            <input type="number" class="w3-input  w3-border" name="jenjang" id="hfd_jenjang" disabled>
            <br/>
            <label>Rombel:</label>
            <br/>
            <input type="text" class="w3-input w3-border w3-border-black w3-round"  name="nama_rombel" id="hfd_nama_rombel" disabled/>

        </fieldset>   
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
            <h3 class="w3-light-green w3-center" >NARAHUBUNG</h3>
        <label for="hfd_dapo_email">Email:</label>
            <br/>
            <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round"  name="dapo_email" id="hfd_dapo_email"/>
            <br/>
            <label for="hfd_pd_hp">No. HP WA:</label>
            (bisa dihubungi)
            <br/>
            <input type="tel" class="w3-input w3-white w3-border w3-border-black w3-round"  name="pd_hp" id="hfd_pd_hp"/>
            <br/>
            <label for="hfd_dapo_telepon">No Telpon Rumah</label>
            <br/>
            <input type="tel" class="w3-input w3-white w3-border w3-border-black w3-round"  name="dapo_telepon" id="hfd_dapo_telepon"/>
        </fieldset>
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
        <h3 class="w3-light-green w3-center" >DATA PRIBADI</h3>
        <label for="hfd_nis">NIS:</label>
        <br/>
        <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" disabled name="nis" id="hfd_nis">
        <br/>
        <label for="hfd_nisn">NISN:</label>
        <br/>
        <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" disabled name="nisn" id="hfd_nisn">
        <br/>
        <label for="hfd_pd_nama">Nama Lengkap:</label>
            <br/>
            <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="pd_nama" id="hfd_pd_nama" oninput="ketik_kapital(this)"/>
            <br/>
            Jenis Kelamin: <br/>
            <label for="hfd_pd_jk_l">
                <input type="radio" class="w3-radio" name="pd_jk" id="hfd_pd_jk_l" value="L"/>
                Laki-laki
            </label>
            <label for="hfd_pd_jk_p">
                <input type="radio" class="w3-radio" name="pd_jk" ="hfd_pd_jk_p" value="P"/>
                Perempuan
            </label>
        <br/>
        <br/>
        <label for="hfd_pd_agama">Agama:</label>
        <br/>
        <select class="w3-select warnaeka w3-border warnaeka" name="pd_agama" id="hfd_pd_agama">
        <option value="">Silakan Pilih</option>
                    <option value="ISLAM" >ISLAM</option>
                    <option value="KRISTEN">KRISTEN/PROTESTAN</option>
                    <option value="KATHOLIK">KATHOLIK</option>
                    <option value="HINDU">HINDU</option>
                    <option value="BUDHA">BUDHA</option>
                    <option value="KHONGHUCU">KHONGHUCU</option>
                    <option value="Kepercayaan Lain">Kepercayaan Lainnya</option>
        </select>
        <br/>
        <br/>
        <label for="hfd_pd_tl">Tempat Lahir:</label>
            <br/>
            <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="pd_tl" id="hdf_pd_tl" oninput="ketik_kapital(this)">
            <br/>
            <label for="hfd_pd_tanggallahir">Tanggal Lahir:</label>
            <input type="date" class="w3-padding w3-border w3-border-black w3-round"  name="pd_tanggallahir" id="hfd_pd_tanggallahir" onchange="konversi_tanggal(this,'sub_arti_tanggal')"/>
            Teks Tanggal Lahir: <b class="sub_arti_tanggal w3-text-red"></b>
          <br/>  
          <br/>  
            <label for="hfd_dapo_noregistrasiaktalahir">No Registrasi Akta Kelahiran:</label>
            <br/>
            <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_noregistrasiaktalahir"/>
            <br/>
            <label for="hfd_dapo_anakkeberapa">Anak Ke-:</label>
            <input type="number" class="w3-white w3-padding w3-border w3-border-black w3-round" name="dapo_anakkeberapa" id="hfd_dapo_anakkeberapa" style="width:100px"/>
            
            <label for="hfd_dapo_jumlahsaudarakandung">Jumlah Saudara Kandung:</label>
            <input type="number" class="w3-white w3-padding w3-border w3-border-black w3-round" name="dapo_jumlahsaudarakandung" id="hfd_dapo_jumlahsaudarakandung" style="width:100px"/>
            <br/>

            <br/>
            <br/>
            <label for="hfd_dapo_kebutuhankhusus">Berkebutuhan Khusus?</label>

                <select id="hfd_dapo_kebutuhankhusus" name="dapo_kebutuhankhusus" class="w3-select w3-border warnaeka">
            <option value="">Silakan Pilih</option>
                    <option value="TIDAK" >Tidak</option> 
                    <option value="NETRA (A)">Netra (A)</option>
                    <option value="RUNGU (B)">Rungu (B)</option>
                    <option value="GRAHITA RINGAN (C)">Grahita Ringan (C)</option>
                    <option value="GRAHITA SEDANG (C1)">Grahita Sedang (C1)</option>
                    <option value="DAKSA RINGAN (D)">Daksa Ringan (D)</option>
                    <option value="DAKSA SEDANG (D1)">Daksa Sedang (D1)</option>
                    <option value="INDIGO (O)">Indigo (O)</option>
                    <option value="DOWN SINDROME (P)">Down Sindrome (P)</option>
                    <option value="AUTIS (Q)">Autis (Q)</option>
                    <option value="LARAS (E)">Laras ( E)</option>
                    <option value="WICARA (F)">Wicara (F)</option>
                    <option value="TUNA GANDA (G)">Tuna Ganda (G)</option>
                    <option value="HIPERAKTIF (H)">Hiperaktif (H)</option>
                    <option value="CERDAS ISTIMEWA (I)">Cerdas Istimewa (i)</option>
                    <option value="BAKAT ISTIMEWA (J)">Bakat Istimewa (J)</option>
                    <option value="KESULITAN BELAJAR (K)">Kesulitan Belajar (K)</option> 
                </select>
                <br>
                <br>
                
            </fieldset>
            <fieldset class="w3-card-4 w3-margin w3-light-grey">
            <h5 class="w3-light-green w3-center">Dokumen Akta Kelahiran/Surat Kenal Lahir</h5>
            Unggah Dokumen Akta Kelahiran / Surat Keterangan Lahir:<br/>    
            <label for="input_dok_akte" id="label_dok_akte" class="w3-button warnaeka w3-round-large w3-card-4 w3-border-bottom w3-border-black"><i class="fa fa-upload"></i> Unggah Dokumen</label>
                <input type="text" name="dok_akte" id="hfd_dok_akte" class="w3-input  w3-round" disabled/>
                <div class="status_idfile_akta w3-center w3-text-blue"></div>
            </fieldset>
            <fieldset class="w3-card-4 w3-margin w3-light-grey"> 
            <h3 class="w3-light-green w3-center">ALAMAT</h3>
            <span class="w3-text-red">Disi sesuai dengan dokumen Kartu Keluarga</span>  <br/><br/> 
            <label for="hfd_nik">NIK:</label>
            <input type="number" class="w3-input w3-white w3-border w3-border-black w3-round" name="nik" id="hfd_nik">
        <br/>
            <label for="hfd_nokk">Nomor KK:</label>
            
            <input type="number" class="w3-input w3-white w3-border w3-border-black w3-round" name="nokk" ="hfd_nokk">
            <br/>
            <label for="hfd_pd_alamat">Alamat Jalan:</label>
            <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="pd_alamat" id="hfd_pd_alamat">
            <br/>
            <label for="hfd_dapo_dusun">Nama Dusun:</label>
            <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_dusun" id="hfd_dapo_dusun">
            <br/>
            <label for="hfd_rt">RT: </label> <input type="number" class="w3-white w3-border w3-border-black w3-round w3-padding" name="dapo_rt" id="hfd_dapo_rt" min="1" style="width:100px"/>
            <label for="hfd_rw">RW: </label> <input type="number" class="w3-white w3-border w3-border-black w3-round w3-padding" name="dapo_rw" id="hfd_dapo_rw" min="1" style="width:100px"/>
            <br/>
            <br/>
            <label for="hfd_dapo_kelurahan">Kelurahan:</label>
            <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_kelurahan" id="hfd_dapo_kelurahan" oninput="ketik_kapital(this)">
            <div class="w3-tiny">
            Refrensi Tulisan Kelurahan (Perhatikan spasinya)<br/>
            RATUJAYA, CIPAYUNG JAYA, BOJONG PONDOK TERONG, PONDOK JAYA
            </div><br/>
            <label for="hfd_dapo_kecamatan">Kecamatan :</label>
            <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_kecamatan" id="hfd_dapo_kecamatan" oninput="ketik_kapital(this)"/>
            <br/>
            <laber for="hfd_dapo_kota">Kota:</td>
            <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_kota" id="hfd_dapo_kota" oninput="ketik_kapital(this)"/>
            <br/>
            <label for="hfd_dapo_provinsi">Provinsi:</label>
            <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_provinsi" id="hfd_dapo_provinsi" oninput="ketik_kapital(this)"/>
            <br/>
            <label for="hfd_dapo_kodepos">Kode Pos:</label>
            <input type="number" class="w3-white w3-border w3-border-black w3-round w3-padding" name="dapo_kodepos" id="hfd_dapo_kodepos" style="width:150px;"/>
            <br/>
            <br/>
            <label for="hfd_dapo_jenistinggal">Jenis Tinggal:</label>
            <select class="w3-select w3-border warnaeka" name="dapo_jenistinggal" id="hfd_dapo_jenistinggal">
            <option value="">Silakan Pilih</option>
            <option value="Bersama Orang Tua" >Bersama Orang tua</option>
                <option value="Wali">Wali</option>
                <option value="Kos">Kos</option>
                <option value="Asrama">Asrama</option>
                <option value="Panti Asuhan">Panti Asuhan</option>
                <option value="Lainnya">Lainnya</option>
            </select>
            <br/>
            <br/>
            
            <label for="hfd_dapo_alattransportasi">Moda Transportasi:</label>
            <select class="w3-select warnaeka w3-border" name="dapo_alattransportasi" id="hfd_dapo_alattransportasi">
            <option value="">Silakan Pilih</option>
            <option value="Jalan Kaki" >Jalan Kaki</option>
                <option value="Kendaraan Pribadi">Kendaraan Pribadi</option>
                <option value="Kendaraan Umum/Angkot/Pete-pete">Kendaraan Umum/Angkot/Pete-pete</option>
                <option value="Jemputan Sekolah">Jemputan Sekolah</option>
                <option value="Kereta Api">Kereta Api</option>
                <option value="Ojek">Ojek</option>
                <option value="Andong/Bendi/Sado/Dokar/Delman/Beca">Andong/Bendi/Sado/Dokar/Delman/Beca</option>
                <option value="Perahu Penyebrangan/Rakit/Getek">Perahu Penyebrangan/Rakit/Getek</option>
                <option value="Lainnya">Lainnya</option>
            </option>
            </select>
        </fieldset>
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
            <h5 class="w3-light-green w3-center">Dokumen Kartu Keluarga</h5>
            Unggah Dokumen Kartu Keluarga:<br/>
            <label for="input_dok_kk" id="label_dok_kk" class="w3-button warnaeka w3-round-large w3-card-4 w3-border-bottom w3-border-black"><i class="fa fa-upload"></i> Unggah Dokumen</label>
                <input type="text" name="dok_kk" id="hfd_dok_kk" class="w3-input  w3-round" disabled/>
                <div class="status_idfile_kk w3-center w3-text-blue"></div>
        </fieldset>
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
            <h3 class="w3-light-green w3-center">Koordinat Geografis</h3>
        Pastikan dalam pengisian ini, Anda berada di tempat tinggal Anda. Silakan klik tombol berikut untuk menggenerate titik koordinat rumah tinggal Ananda di sini.
        <br/>
        <br/>
        <label for="tombol_titikkoordinat" id="label_tombol_titikkoordinat" class="w3-button w3-card-4 warnaeka w3-border-bottom w3-border-black w3-round-large"><i class="fa fa-map-marker"></i> Koordinat Saya</label>
        <br/>
        <br/>
        <label for="hfd_dapo_lintang">Lintang (Latitude):</label>
        <input type="text" class="w3-input  w3-border w3-border-black w3-round" name="dapo_lintang" id="hfd_dapo_lintang" disabled/>
        <br/>
        <label for="hfd_dapo_bujur">Bujur (Longitude)</td>
        <input type="text" class="w3-input  w3-border w3-border-black w3-round" name="dapo_bujur" id="hfd_dapo_bujur" disabled/>
        <br/>
        <label for="hfd_dapo_jarakrumahkesekolah">Jarak Rumah Ke sekolah (Km)</label>
        <input type="text" class="w3-input  w3-border w3-border-black w3-round" name="dapo_jarakrumahkesekolah" id="hfd_dapo_jarakrumahkesekolah" disabled />
        </fieldset>
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
            <h3 class="w3-light-green w3-center">Program KIP/KKS/KPS/PKH/PIP</h3>
            <h4 class="w3-light-green w3-center">KKS (Kartu Keluarga Sejahtera) </h4>
        <label for="hfd_dapo_nomorkks">Nomor KKS:</label>
        <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_nomorkks" id="hfd_dapo_nomorkks"/>
        <br/>
        <br/>
        Dokumen KKS<br/>
        <label for="input_dok_kks" id="label_dok_kks" class="w3-button warnaeka w3-round-large w3-card-4 w3-border-bottom w3-border-black"><i class="fa fa-upload"></i> Unggah Dokumen</label>
        <input type="text" class="w3-input  w3-round" name="dok_kks" id="hfd_dok_kks" disabled/>
        <br/>     
        <br/>     
        <br/>     
        <h4 class="w3-light-green w3-center">KPS/PKH</h4>
        <sub class="w3-text-blue">KPS(Kartu Perlindungan Sosial) / PKH(Program Keluarga Harapan)</sub><br/><br/>
        <label for="hfd_dapo_penerimakps">Penerima KPS/PKH?</label>
        <select class="w3-select warnaeka w3-border" name="dapo_penerimakps" id="hfd_dapo_penerimakps">
            <option value="TIDAK" >TIDAK</option>
            <option value="YA" >YA</option>
        </select>
        <br/>    
        <label for="hfd_dapo_nokps">Nomor KPS/PKH:</label>
        <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_nokps" id="hfd_dapo_nokps"/>
            <br/>
            <br/>
            Dokumen Kartu KPS atau PKH<br/>
        <label for="input_dok_kpspkh" id="label_dok_kpspkh" class="w3-button warnaeka w3-round-large w3-card-4 w3-border-bottom w3-border-black"><i class="fa fa-upload"></i> Unggah Dokumen</label>
        <input type="text" class="w3-input w3-round" name="dok_kpspkh" id="hfd_dok_kpspkh" disabled/>
        <br/>
        <br/>
        <br/>
        <h4 class="w3-light-green w3-center">KIP (Kartu Indonesia Pintar)</h4>
            <label for="hfd_dapo_penerimakip">Memiliki KIP?</label>
            <select class="w3-select warnaeka w3-border" name="dapo_penerimakip" id="hfd_dapo_penerimakip">
            <option value="TIDAK" >TIDAK</option>
            <option value="YA">YA</option>
            </select>
            <br/>
            <br/>
        <label for="hfd_dapo_nomorkip">Nomor KIP</label>
        <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_nomorkip" id="hfd_dapo_nomorkip"/>
        <br/>
        <label for="hfd_dapo_namadikip">Nama di KIP:</label>
        <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_namadikip" id="hfd_dapo_namadikip"/>
        <br/><br/>
        Dokumen KIP(Kartu Indonesia Pintar):<br/>
        <label for="input_dok_kip" id="label_dok_kip" class="w3-button warnaeka w3-round-large w3-card-4 w3-border-bottom w3-border-black"><i class="fa fa-upload"></i> Unggah Dokumen</label>
        <input type="text" class="w3-input  w3-round" name="dok_kip" id="hfd_dok_kip" disabled/>
        <br/>
        <br/>
        <br/>
        <h4 class="w3-light-green w3-center">Kelayakan PIP:</h4>
        
        <label for="hfd_dapo_layakpip">Layak PIP?</label>
        <select class="w3-select warnaeka w3-border" name="dapo_layakpip" id="hfd_dapo_layakpip" disabled>
            <option value="TIDAK" >TIDAK</option>
            <option value="YA" >YA</option>
        </select>
        <br/>
        <br/>
        <input type="text" class="w3-input  w3-round" name="dapo_alasanlayakpip" id="hfd_dapo_alasanlayakpip" placeholder="Terotomasi oleh Dapodik" disabled/>
        </fieldset>
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
        <h3 class="w3-light-green w3-center">DATA ORANG TUA</h3>
        </fieldset>
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
            <h4 class="w3-light-green w3-center">Ayah Kandung</h4>
        <label for="hfd_pd_namaayah">Nama Lengkap Ayah:</label>
        <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="pd_namaayah" ="hfd_pd_namaayah" oninput="ketik_kapital(this)"/>
        <br/>
        <label for="hfd_dapo_tahunlahirayah">Tanggal Lahir Ayah:</label>
        <input type="date" class="w3-padding w3-border w3-border-black w3-round" name="dapo_tahunlahirayah" id="hfd_dapo_tahunlahirayah" onchange="konversi_tanggal(this,'sub_arti_tanggal_ayah')"/>
        Teks Tanggal Lahir: <b class="sub_arti_tanggal_ayah w3-text-red"></b>
        <br/>
        <br/>
        <label for="hfd_dapo_jenjangpendidikanayah">Pendidikan Ayah</label>
            <select class="w3-select warnaeka w3-border" name="dapo_jenjangpendidikanayah" id="hfd_dapo_jenjangpendidikanayah">
            <option value="">Silakan Pilih</option>
            <option value="Tidak Sekolah" >Tidak Sekolah</option>
                <option value="Putus SD">Putus SD</option>
                <option value="SD Sederajat">SD Sederajat</option>
                <option value="SMP Sederajat">SMP Sederajat</option>
                <option value="SMA Sederajat" >SMA Sederajat</option>
                <option value="DI">D1</option>
                <option value="D2">D2</option>
                <option value="D3">D3</option>
                <option value="D4/S1">D4/S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
            </select>
        <br/>
        <br/>
        <label for="hfd_dapo_nikayah">NIK Ayah:</label>
        <input type="number" class="w3-input w3-white w3-border w3-border-black w3-round"  name="dapo_nikayah" id="hfd_dapo_nikayah">
            <br/>
            <label for="hfd_dapo_pekerjaanayah">Pekerjaan Ayah</label>
            <select class="w3-select warnaeka w3-border" name="dapo_pekerjaanayah" id="hfd_dapo_pekerjaanayah">
            <option value="">Silakan Pilih</option>
            <option value="Tidak bekerja" >Tidak bekerja</option>
                <option value="Nelayan">Nelayan</option>
                <option value="Petani">Petani</option>
                <option value="Peternak">Peternak</option>
                <option value="PNS/TNI/Polri">PNS/TNI/Polri</option>
                <option value="Karyawan Swasta">Karyawan Swasta</option>
                <option value="Pedagang Kecil">Pedagang Kecil</option>
                <option value="Pedagang Besar">Pedagang Besar</option>
                <option value="Wiraswasta" >Wiraswasta</option>
                <option value="Wirausaha">Wirausaha</option>
                <option value="Buruh">Buruh</option>
                <option value="Pensiunan">Pensiunan</option>
                <option value="Tenaga Kerja Indonesia (TKI)">Tenaga Kerja Indonesia (TKI)</option>
                <option value="Tidak dapat diterapkan">Tidak dapat diterapkan</option>
                <option value="Meninggal Dunia">Meninggal Dunia</option>
                <option value="Lainnya">Lainnya</option>
            </select>
            <br>
            <br>
            <label for="hfd_dapo_penghasilanayah">Penghasilan Ayah</label>
            <select class="w3-select warnaeka w3-border" name="dapo_penghasilanayah" ="hfd_dapo_penghasilanayah">
            <option value="">Silakan Pilih</option>
            <option value="Kurang dari Rp. 1.000.000,-">Kurang dari Rp. 1.000.000,-</option>
            <option value="Rp. 1.000.000 - Rp. 2.000.000">Rp. 1.000.000 - Rp. 2.000.000</option>
                <option value="Lebih dari Rp. 2.000.000">Lebih dari Rp. 2.000.000</option>
                <option value="Kurang dari Rp. 500.000">Kurang dari Rp. 500.000</option>
                <option value="Rp. 500.000 - Rp. 999.999">Rp. 500.000 - Rp. 999.999</option>
                <option value="Rp. 1.000.000 - Rp. 1.999.999" >Rp. 1.000.000 - Rp. 1.999.999</option>
                <option value="Rp. 2.000.000 - Rp. 4.999.999" >Rp. 2.000.000 - Rp. 4.999.999</option>
                <option value="Rp. 5.000.000 - Rp. 20.000.000">Rp. 5.000.000 - Rp. 20.000.000</option>
                <option value="Lebih dari Rp.20.000.000">Lebih dari Rp.20.000.000</option>
                <option value="Tidak Berpenghasilan">Tidak Berpenghasilan</option>
                <option value="Lainnya">Lainnya</option>
        </select>
        <br/>
        <br/>
        <label for="hfd_dapo_abkayah">Berkebutuhan Khusus?</label>
            <select class="w3-select warnaeka w3-border" name="dapo_abkayah" id="hfd_dapo_abkayah">
            <option value="">Silakan Pilih</option>
                <option value="TIDAK" >Tidak</option> 
                <option value="NETRA (A)">Netra (A)</option>
                <option value="RUNGU (B)">Rungu (B)</option>
                <option value="GRAHITA RINGAN (C)">Grahita Ringan (C)</option>
                <option value="GRAHITA SEDANG (C1)">Grahita Sedang (C1)</option>
                <option value="DAKSA RINGAN (D)">Daksa Ringan (D)</option>
                <option value="DAKSA SEDANG (D1)">Daksa Sedang (D1)</option>
                <option value="INDIGO (O)">Indigo (O)</option>
                <option value="DOWN SINDROME (P)">Down Sindrome (P)</option>
                <option value="AUTIS (Q)">Autis (Q)</option>
                <option value="LARAS (E)">Laras ( E)</option>
                <option value="WICARA (F)">Wicara (F)</option>
                <option value="TUNA GANDA (G)">Tuna Ganda (G)</option>
                <option value="HIPERAKTIF (H)">Hiperaktif (H)</option>
                <option value="CERDAS ISTIMEWA (I)">Cerdas Istimewa (i)</option>
                <option value="BAKAT ISTIMEWA (J)">Bakat Istimewa (J)</option>
                <option value="KESULITAN BELAJAR (K)">Kesulitan Belajar (K)</option> 
            </select>
        </fieldset>
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
        <h4 class="w3-light-green w3-center">Ibu Kandung</h4>
        <label for="hfd_pd_namaibu">Nama Lengkap ibu:</label>
        <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="pd_namaibu" ="hfd_pd_namaibu" oninput="ketik_kapital(this)"/>
        <br/>
        <label for="hfd_dapo_tahunlahiribu">Tanggal Lahir ibu:</label>
        <input type="date" class="w3-padding w3-border w3-border-black w3-round" name="dapo_tahunlahiribu" id="hfd_dapo_tahunlahiribu" onchange="konversi_tanggal(this,'sub_arti_tanggal_ibu')"/>
        Teks Tanggal Lahir: <b class="sub_arti_tanggal_ibu w3-text-red"></b>
        <br/>
        <br/>
        <label for="hfd_dapo_jenjangpendidikanibu">Pendidikan ibu</label>
            <select class="w3-select warnaeka w3-border" name="dapo_jenjangpendidikanibu" id="hfd_dapo_jenjangpendidikanibu">
                <option value="">Silakan Pilih</option>
                <option value="Tidak Sekolah" >Tidak Sekolah</option>
                <option value="Putus SD">Putus SD</option>
                <option value="SD Sederajat">SD Sederajat</option>
                <option value="SMP Sederajat">SMP Sederajat</option>
                <option value="SMA Sederajat" >SMA Sederajat</option>
                <option value="DI">D1</option>
                <option value="D2">D2</option>
                <option value="D3">D3</option>
                <option value="D4/S1">D4/S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
            </select>
        <br/>
        <br/>
        <label for="hfd_dapo_nikibu">NIK ibu:</label>
        <input type="number" class="w3-input w3-white w3-border w3-border-black w3-round"  name="dapo_nikibu" id="hfd_dapo_nikibu">
            <br/>
            <label for="hfd_dapo_pekerjaanibu">Pekerjaan ibu</label>
            <select class="w3-select warnaeka w3-border" name="dapo_pekerjaanibu" id="hfd_dapo_pekerjaanibu">
            <option value="">Silakan Pilih</option>
            <option value="Tidak bekerja" >Tidak bekerja</option>
                <option value="Nelayan">Nelayan</option>
                <option value="Petani">Petani</option>
                <option value="Peternak">Peternak</option>
                <option value="PNS/TNI/Polri">PNS/TNI/Polri</option>
                <option value="Karyawan Swasta">Karyawan Swasta</option>
                <option value="Pedagang Kecil">Pedagang Kecil</option>
                <option value="Pedagang Besar">Pedagang Besar</option>
                <option value="Wiraswasta" >Wiraswasta</option>
                <option value="Wirausaha">Wirausaha</option>
                <option value="Buruh">Buruh</option>
                <option value="Pensiunan">Pensiunan</option>
                <option value="Tenaga Kerja Indonesia (TKI)">Tenaga Kerja Indonesia (TKI)</option>
                <option value="Tidak dapat diterapkan">Tidak dapat diterapkan</option>
                <option value="Meninggal Dunia">Meninggal Dunia</option>
                <option value="Lainnya">Lainnya</option>
            </select>
            <br>
            <br>
            <label for="hfd_dapo_penghasilanibu">Penghasilan ibu</label>
            <select class="w3-select warnaeka w3-border" name="dapo_penghasilanibu" ="hfd_dapo_penghasilanibu">
            <option value="">Silakan Pilih</option>
            <option value="Kurang dari Rp. 1.000.000,-" >Kurang dari Rp. 1.000.000,-</option>
            <option value="Rp. 1.000.000 - Rp. 2.000.000">Rp. 1.000.000 - Rp. 2.000.000</option>
                <option value="Lebih dari Rp. 2.000.000">Lebih dari Rp. 2.000.000</option>
                <option value="Kurang dari Rp. 500.000">Kurang dari Rp. 500.000</option>
                <option value="Rp. 500.000 - Rp. 999.999" >Rp. 500.000 - Rp. 999.999</option>
                <option value="Rp. 1.000.000 - Rp. 1.999.999">Rp. 1.000.000 - Rp. 1.999.999</option>
                <option value="Rp. 2.000.000 - Rp. 4.999.999" >Rp. 2.000.000 - Rp. 4.999.999</option>
                <option value="Rp. 5.000.000 - Rp. 20.000.000">Rp. 5.000.000 - Rp. 20.000.000</option>
                <option value="Lebih dari Rp.20.000.000">Lebih dari Rp.20.000.000</option>
                <option value="Tidak Berpenghasilan">Tidak Berpenghasilan</option>
                <option value="Lainnya">Lainnya</option>
        </select>
        <br/>
        <br/>
        <label for="hfd_dapo_abkibu">Berkebutuhan Khusus?</label>
        <select class="w3-select warnaeka w3-border" name="dapo_abkibu" id="hfd_dapo_abkibu">
        <option value="">Silakan Pilih</option>
                <option value="TIDAK" >Tidak</option> 
                <option value="NETRA (A)">Netra (A)</option>
                <option value="RUNGU (B)">Rungu (B)</option>
                <option value="GRAHITA RINGAN (C)">Grahita Ringan (C)</option>
                <option value="GRAHITA SEDANG (C1)">Grahita Sedang (C1)</option>
                <option value="DAKSA RINGAN (D)">Daksa Ringan (D)</option>
                <option value="DAKSA SEDANG (D1)">Daksa Sedang (D1)</option>
                <option value="INDIGO (O)">Indigo (O)</option>
                <option value="DOWN SINDROME (P)">Down Sindrome (P)</option>
                <option value="AUTIS (Q)">Autis (Q)</option>
                <option value="LARAS (E)">Laras ( E)</option>
                <option value="WICARA (F)">Wicara (F)</option>
                <option value="TUNA GANDA (G)">Tuna Ganda (G)</option>
                <option value="HIPERAKTIF (H)">Hiperaktif (H)</option>
                <option value="CERDAS ISTIMEWA (I)">Cerdas Istimewa (i)</option>
                <option value="BAKAT ISTIMEWA (J)">Bakat Istimewa (J)</option>
                <option value="KESULITAN BELAJAR (K)">Kesulitan Belajar (K)</option> 
            </select>
        </fieldset>
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
        <h4 class="w3-light-green w3-center">Wali</h4>
        <label for="hfd_dapo_namawali">Nama Lengkap wali:</label>
        <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_namawali" ="hfd_dapo_namawali" oninput="ketik_kapital(this)"/>
        <br/>
        <label for="hfd_dapo_tahunlahirwali">Tanggal Lahir wali:</label>
        <input type="date" class="w3-padding w3-border w3-border-black w3-round" name="dapo_tahunlahirwali" id="hfd_dapo_tahunlahirwali" onchange="konversi_tanggal(this,'sub_arti_tanggal_wali')"/>
        Teks Tanggal Lahir: <b class="sub_arti_tanggal_wali w3-text-red"></b>
        <br/>
        <br/>
        <label for="hfd_dapo_jenjangpendidikanwali">Pendidikan wali</label>
            <select class="w3-select warnaeka w3-border" name="dapo_jenjangpendidikanwali" id="hfd_dapo_jenjangpendidikanwali">
            <option value="">Silakan Pilih</option>
            <option value="Tidak Sekolah">Tidak Sekolah</option>
                <option value="Putus SD">Putus SD</option>
                <option value="SD Sederajat">SD Sederajat</option>
                <option value="SMP Sederajat">SMP Sederajat</option>
                <option value="SMA Sederajat" >SMA Sederajat</option>
                <option value="DI">D1</option>
                <option value="D2">D2</option>
                <option value="D3">D3</option>
                <option value="D4/S1">D4/S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
            </select>
        <br/>
        <br/>
        <label for="hfd_dapo_nikwali">NIK wali:</label>
        <input type="number" class="w3-input w3-white w3-border w3-border-black w3-round"  name="dapo_nikwali" id="hfd_dapo_nikwali">
            <br/>
            <label for="hfd_dapo_pekerjaanwali">Pekerjaan wali</label>
            <select class="w3-select warnaeka w3-border" name="dapo_pekerjaanwali" id="hfd_dapo_pekerjaanwali">
            <option value="">Silakan Pilih</option>
            <option value="Tidak bekerja">Tidak bekerja</option>
                <option value="Nelayan">Nelayan</option>
                <option value="Petani">Petani</option>
                <option value="Peternak">Peternak</option>
                <option value="PNS/TNI/Polri">PNS/TNI/Polri</option>
                <option value="Karyawan Swasta">Karyawan Swasta</option>
                <option value="Pedagang Kecil">Pedagang Kecil</option>
                <option value="Pedagang Besar">Pedagang Besar</option>
                <option value="Wiraswasta" >Wiraswasta</option>
                <option value="Wirausaha">Wirausaha</option>
                <option value="Buruh">Buruh</option>
                <option value="Pensiunan">Pensiunan</option>
                <option value="Tenaga Kerja Indonesia (TKI)">Tenaga Kerja Indonesia (TKI)</option>
                <option value="Tidak dapat diterapkan">Tidak dapat diterapkan</option>
                <option value="Meninggal Dunia">Meninggal Dunia</option>
                <option value="Lainnya">Lainnya</option>
            </select>
            <br>
            <br>
            <label for="hfd_dapo_penghasilanwali">Penghasilan wali</label>
            <select class="w3-select warnaeka w3-border" name="dapo_penghasilanwali" ="hfd_dapo_penghasilanwali">
            <option value="">Silakan Pilih</option>
            <option value="Kurang dari Rp. 1.000.000,-">Kurang dari Rp. 1.000.000,-</option>
            <option value="Rp. 1.000.000 - Rp. 2.000.000">Rp. 1.000.000 - Rp. 2.000.000</option>
                <option value="Lebih dari Rp. 2.000.000">Lebih dari Rp. 2.000.000</option>
                <option value="Kurang dari Rp. 500.000">Kurang dari Rp. 500.000</option>
                <option value="Rp. 500.000 - Rp. 999.999">Rp. 500.000 - Rp. 999.999</option>
                <option value="Rp. 1.000.000 - Rp. 1.999.999">Rp. 1.000.000 - Rp. 1.999.999</option>
                <option value="Rp. 2.000.000 - Rp. 4.999.999" >Rp. 2.000.000 - Rp. 4.999.999</option>
                <option value="Rp. 5.000.000 - Rp. 20.000.000">Rp. 5.000.000 - Rp. 20.000.000</option>
                <option value="Lebih dari Rp.20.000.000">Lebih dari Rp.20.000.000</option>
                <option value="Tidak Berpenghasilan">Tidak Berpenghasilan</option>
                <option value="Lainnya">Lainnya</option>
        </select>
        <br/>
        <br/>
        <label for="hfd_dapo_abkwali">Berkebutuhan Khusus?</label>
            <select class="w3-select warnaeka w3-border" name="dapo_abkwali" id="hfd_dapo_abkwali">
            <option value="">Silakan Pilih</option>
            <option value="TIDAK" >Tidak</option> 
                <option value="NETRA (A)">Netra (A)</option>
                <option value="RUNGU (B)">Rungu (B)</option>
                <option value="GRAHITA RINGAN (C)">Grahita Ringan (C)</option>
                <option value="GRAHITA SEDANG (C1)">Grahita Sedang (C1)</option>
                <option value="DAKSA RINGAN (D)">Daksa Ringan (D)</option>
                <option value="DAKSA SEDANG (D1)">Daksa Sedang (D1)</option>
                <option value="INDIGO (O)">Indigo (O)</option>
                <option value="DOWN SINDROME (P)">Down Sindrome (P)</option>
                <option value="AUTIS (Q)">Autis (Q)</option>
                <option value="LARAS (E)">Laras ( E)</option>
                <option value="WICARA (F)">Wicara (F)</option>
                <option value="TUNA GANDA (G)">Tuna Ganda (G)</option>
                <option value="HIPERAKTIF (H)">Hiperaktif (H)</option>
                <option value="CERDAS ISTIMEWA (I)">Cerdas Istimewa (i)</option>
                <option value="BAKAT ISTIMEWA (J)">Bakat Istimewa (J)</option>
                <option value="KESULITAN BELAJAR (K)">Kesulitan Belajar (K)</option> 
            </select>
        </fieldset>
        <fieldset class="w3-card-4 w3-margin w3-light-grey">
            <h4 class="w3-light-green w3-center">DATA PRIODIK PERKEMBANGAN SISWA</h4>
        <label for="hfd_dapo_tinggibadan">Tinggi Badan (Cm):</label>
        <input type="number" class="w3-padding w3-white w3-border w3-border-black w3-round" name="dapo_tinggibadan" id="hfd_dapo_tinggibadan" style="width=80px"/>
        <br/>
        <br/>
            <label for="hfd_dapo_beratbadan">Berat Badan (Kg):</label>
            <input type="number" class="w3-padding w3-white w3-border w3-border-black w3-round" name="dapo_beratbadan" id="hfd_dapo_beratbadan" style="width=80px"/>
            <br/>
            <br/>
            <label for="hfd_dapo_lingkarkepala">Lingkar Kepala:</label>
            <input type="number" class="w3-padding w3-white w3-border w3-border-black w3-round" name="dapo_lingkarkepala" id="hfd_dapo_lingkarkepala" style="width=80px"/>
    </fieldset>
    <fieldset class="w3-card-4 w3-margin w3-light-grey">
            <h4 class="w3-light-green w3-center">BANK PENERIMA KIP</h4>
    <label for="hfd_dapo_bank">Nama Bank PIP:</label>
    <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round"  name="dapo_bank" id="hfd_dapo_bank"/>
    <br/>
    <label for="hfd_dapo_bank">Nomor Rekening Bank PIP:</label>
    <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round"  name="dapo_nomorrekeningbank" id="hfd_dapo_nomorrekeningbank"/>
    <br/>
    <label for="hfd_dapo_rekeningatasnama">Rekening Atas Nama:</label>
    <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round"  name="dapo_rekeningatasnama" id="hfd_dapo_rekeningatasnama"/>
    <br/>

    </fieldset>
    <fieldset class="w3-card-4 w3-margin w3-light-grey">
    <h4 class="w3-light-green w3-center">RIWAYAT SEKOLAH</h4>
    Isian ini untuk mengisi data riwayat sekolah sebelum di ${identitassekolah}. Contoh TK, RA, PAUD.<br/><br/>
    Bagi Siswa Pindahan, Isikan nama sekolah sebelumnya.
    <br/>
    <br/>
    <label for="hfd_dapo_sekolahasal">Sekolah Asal:</label>
    <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_sekolahasal" id="hfd_dapo_sekolahasal" oninput="ketik_kapital(this)"/>
    </fieldset> 
    <fieldset class="w3-hide">
    <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="aktif" id="hfd_aktif" disabled placeholder="Status Aktif"/>
    <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dieditoleh" id="hfd_dieditoleh" placeholder="Diusulkan Kepada" disabled />
    <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="action" id="hfd_action" disabled placeholder="Aktifasi"/>
    <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_nopesertaujiannasional" id="hfd_dapo_nopesertaujiannasional" disabled placeholder="No Peserta Ujian (untuk lulusan kelas 6)"/>
    <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_skhun" id="hfd_dapo_skhun" disabled placeholder="Data SKHUN (untuk lulusan kelas 6)"/>
    <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="dapo_noseriijazah" id="hfd_dapo_noseriijazah" disabled placeholder="No Seri Ijazah (untuk lulusan kelas 6)"/>
    </fieldset>       
    </form>
   <div class="w3-hide">
        <input type="file" id="input_dok_akte" onchange="fnbaru_unggahfiledulu(this)"/>
        <input type="file" id="input_dok_kk" onchange="fnbaru_unggahfiledulu(this)"/>
        <button id="tombol_titikkoordinat" onclick="getLocation(this)">Koordinat</button>
        <input type="file" id="input_dok_kks" onchange="fnbaru_unggahfiledulu(this)"/>
        <input type="file" id="input_dok_kpspkh" onchange="fnbaru_unggahfiledulu(this)"/>
        <input type="file" id="input_dok_kip" onchange="fnbaru_unggahfiledulu(this)"/>
        </div>
        <div class="w3-margin-top w3-center">
        <button onclick="validasiajuandata()" class="w3-button w3-card-4 warnaeka w3-margin w3-border-bottom w3-border-black w3-round-large"><i class="fa fa-paper-plane"></i> Kirim Ajuan </button>
        <button class="w3-button warnaeka w3-card-4 w3-round-large w3-margin w3-border-bottom w3-border-black " onclick="infoloadingljk.innerHTML='';loadingljk.style.display='none'">Tutup Form</button>
        </div>
    </div>
    
    `;

    return html
};

const StringTanggalnol = (tgl) => { //parameter tgl bentuk tgl
    let m = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let y = tgl.getFullYear();


    let string = y + "-" + addZero(m) + "-" + addZero(d);


    //console.log(string)
    return string
}


const fnbaru_unggahfiledulu = (el) => {
    let elemen_id = el.getAttribute("id");
    let id_label = elemen_id.replace("input_", "label_");
    let id_input = elemen_id.replace("input_", "hfd_");

    let elemen_label = document.getElementById(id_label);
    elemen_label.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "end"
    });
    let innersebelumnya = elemen_label.innerHTML;
    elemen_label.innerHTML = `<img scr="/img/barloading.gif"/>`;
    var file = document.getElementById(elemen_id).files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        //document.getElementById('uploadForm').submit();

        let src = e.target.result;
        let data = src.replace(/^.*,/, '');
        let tipe = e.target.result.match(/^.*(?=;)/)[0];
        fn_upload_file(id_input, data, tipe);
        // console.log(tipe);
        // console.log(data);
    }
    reader.readAsDataURL(file);
}

const fn_upload_file = (id_input, param, tipe) => {
    let div = document.querySelector("input[id=" + id_input + "]"); //cpdb_id_file_akta
    let namadokumen = id_input.replace("hfd_", "");
    let id_label = id_input.replace("hfd_", "label_")
    let el_label = document.querySelector("label[id=" + id_label + "]"); //cpdb_id_file_akta
    el_label.innerHTML = `<img src="/img/barloading.gif"/>`;
    el_label.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "end"
    });
    let namafile = namasiswa + "_" + namadokumen;

    let data = new FormData();
    data.append("action", "uploadfiledulu");
    data.append("fileContent", param);
    data.append("mimeType", tipe);
    data.append("filename", namafile);
    data.append("kelas", namakelas);
    var url = url_absensiswa; // + "?action=uploaddulu";
    fetch(url, {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(r => {
            if (r.sukses == "Gagal") {
                setTimeout(() => {
                    el_label.innerHTML = `<i class="fa fa-upload"></i> Unggah Dokumen`;

                }, 3000);
                el_label.innerHTML = `Gagal Mengunggah`;
            } else {
                el_label.innerHTML = `<i class="fa fa-upload"></i> Unggah Dokumen`;
                div.value = r.idfile;
            }
        })
        .catch(er => {
            console.log(er);
            setTimeout(() => {
                el_label.innerHTML = `<i class="fa fa-upload"></i> Unggah Dokumen`;

            }, 3000);
            el_label.innerHTML = `Gagal Mengunggah`;
            alert("Maaf, terjadi kesalahan. Silakan ulangi sesi Anda sesaat lagi.")
        })
};

function getLocation(el) {
    let id = el.getAttribute("id")
    let elemenlabel = document.getElementById("label_" + id)
    elemenlabel.scrollIntoView();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        hfd_dapo_lintang.value = "Duh, HP Anda tidak support. Coba dengan HP Lain";
        hfd_dapo_bujur.value = "Duh, HP Anda tidak support. Coba dengan HP Lain";
    }
}

function showPosition(position) {
    hfd_dapo_lintang.value = position.coords.latitude;
    hfd_dapo_bujur.value = position.coords.longitude;
    var xJarak = distance(hfd_dapo_lintang.value, hfd_dapo_bujur.value, "K");
    hfd_dapo_jarakrumahkesekolah.value = xJarak.toFixed(3);
}

function distance(lat1, lon1, unit) {
    // var lat2 = -6.4198454;
    // var lon2 = 106.8134214;

    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180

    var radlon1 = Math.PI * lon1 / 180
    var radlon2 = Math.PI * lon2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") {
        dist = dist * 1.609344
    }
    // if (unit == "K") { dist = dist * 0.01609344 }
    if (unit == "N") {
        dist = dist * 0.8684
    }
    return dist
}

function komponenform(form) { // fungsi untuk membuat Array Object beserta value-nya dalam bentuk JSON
    var koleksielement = form.elements;
    var buatkolomheader = Object.keys(koleksielement).filter(function (k) {
        if (koleksielement[k].name === "time_stamp") {
            koleksispam = koleksielement[k].value;
            return false;
        }
        return true; // hasilnya [0,1,2,3, ..., "dieditoleh", "id", "nis", ....berdasarkan nama]

    }).map(function (k) {
        if (koleksielement[k].name !== undefined) {
            return koleksielement[k].name;
        } else if (koleksielement[k].length > 0) {
            return koleksielement[k].item(0).name; //
        }
    }).filter(function (item, pos, self) {
        return self.indexOf(item) == pos && item;
    });

    var dataJSON = {};

    buatkolomheader.forEach(function (name) { // masing-masing element yang memiliki attribute name;
        var nameselement = koleksielement[name];
        dataJSON[name] = nameselement.value;
        if (nameselement.length) {
            var data = [];
            for (var i = 0; i < nameselement.length; i++) {
                var item = nameselement.item(i);
                if (item.checked || item.selected) {
                    data.push(item.value);
                }
            }
            dataJSON[name] = data.join(', ');
        }

    });
    //dataJSON.formDataNameOrder = JSON.stringify(buatkolomheader);
    return {
        data: dataJSON,
        head: buatkolomheader
    }
}
const validasiajuandata = () => {
    let namaform = document.getElementById("formajuandatasiswa"); //.elements;
    let dataoke = [];
    let datagaada = [];
    let cekhead = arrayheadsumber.filter(s => s !== "time_stamp"); //array

    let avoid_head = ["aktif", "dieditoleh", "action", "usulanperubahandata"];
    let elemenform = komponenform(namaform); /// object
    let dataelemen = elemenform.data; // {id:"", data: "", dst}

    if (dataelemen.dok_akte == "" || dataelemen.dok_kk == "") {
        alert("Anda wajib mengunggah file akte dan kartu keluarga");
        return
    }
    let objekada = {};
    let keyurut = [];
    let valurut = [];
    for (let i = 0; i < cekhead.length; i++) {
        if (dataelemen[cekhead[i]] == undefined) {
            datagaada.push(cekhead[i]);
            if (angkadistring.indexOf(cekhead[i]) > -1) {
                let n = "'"; //+ dataelemen[cekhead[i]]
                valurut.push(n);
            } else {
                valurut.push("")
            }
        } else {
            dataoke.push(cekhead[i])
            objekada[cekhead[i]] = dataelemen[cekhead[i]]
            if (angkadistring.indexOf(cekhead[i]) > -1) {
                let n = "'" + dataelemen[cekhead[i]]
                valurut.push(n);
            } else {

                valurut.push(dataelemen[cekhead[i]]);
            }
        }
        keyurut.push(cekhead[i]);
    }
    // console.log(keyurut);
    // console.log(valurut)
    let cocok = (JSON.stringify(keyurut) == JSON.stringify(cekhead)) ? "COCOK" : "BEDA";
    // console.log(cocok);

    // console.log("dataoke");
    // console.log(dataoke);
    // console.log("datagaada");
    // console.log(datagaada);
    let tabel = JSON.stringify(valurut);
    let datakirim = new FormData();
    // datakirim.append("action", );
    datakirim.append("tab", "new_datasiswa");
    datakirim.append("tabel", tabel);
    datakirim.append("tokensiswa", tokensiswa);
    datakirim.append("idss", jlo.ss_datauser);

    infoloadingljk.innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"/></p>`
    fetch(url_absensiswa + "?action=daftarulangdankonfirmasinya", {
        method: "post",
        body: datakirim
    })
        .then(m => m.json())
        .then(r => {
            infoloadingljk.innerHTML = r.result;
        })
        .catch(er => {
            console.log(er);
            infoloadingljk.innerHTML = "Terjadi kesalahan";
        })


};
const biolengkap = () => {
    let ss = jlo.ss_datauser;
    let ur = jlo.url_datauser;
    let ling = ur + "?idss=" + ss;
    let datahtml = "",
        fil;
    loadingljk.style.display = "block";
    $('#infoloadingljk').nextAll('button').remove();

    // let img = document.querySelector(".avatarsiswa");
    // let srcimg = img.getAttribute("src");
    // // console.log(srcimg)'
    infoloadingljk.innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"></p>`;

    fetch(ling + "&action=usulanperbaikandata")
        .then(m => m.json())
        .then(k => {
            let cariidd = k.datasiswa.filter(s => s.id == tokensiswa);
            if (cariidd.length == 0) {
                infoloadingljk.innerHTML = `<h4 class="w3-center">Maaf, Ananda belum pernah mengusulkan Perubahan Data (Belum pernah mendaftar ulang)</h4>
                <div class="w3-center">
                <button class="w3-button w3-card-4 w3-round-large warnaeka" onclick="ajuanperubahandata()">Ajuan Perubahan Data</button>
                <button class="w3-button warnaeka w3-card-4 w3-round-large" onclick="infoloadingljk.innerHTML='';loadingljk.style.display='none'">Tutup Form</button>
                </div>`;
            } else {
                let html = htmldataprofil()
                infoloadingljk.innerHTML = `<div id="bio_print">${html}</div>
                <div class="w3-center tempattomboltambahan">
                Apabila ada data-data di atas terdapat kekeliruan, silakan ajukan perubahan data di link berikut:<br><br>
                <button class="w3-button w3-card-4 w3-round-large warnaeka" onclick="ajuanperubahandata()">Ajuan Perubahan Data</button>
                <br>
                <br>
                <button class="w3-button w3-card-4 w3-round-large warnaeka" onclick="printModalinfoljk('Data Siswa','bio_print')">Cetak</button>
                <button class="w3-button warnaeka w3-card-4 w3-round-large" onclick="infoloadingljk.innerHTML='';loadingljk.style.display='none'">Tutup Form</button>

                </div>`;
                let cariid = cariidd[0];
                let keyss = Object.keys(cariid);
                let keys = keyss.filter(s => s !== "time_stamp");
                for (i = 0; i < keys.length; i++) {
                    let el = document.querySelector(".hdp_" + keys[i]);
                    if (el == undefined || el == null) { } else {
                        if (keys[i].indexOf("dok_") > -1) {
                            let iddoc = (cariid[keys[i]] == "") ? `<b class="w3-text-red">Tidak Melampirkan</b>` : `<div class="containerbaru"><iframe class="responsive-iframebaru" src="https://drive.google.com/file/d/${(cariid[keys[i]] == "") ? "18Zvo5idM92xYEIzqKDDFnc0iqI6JvUnS" : cariid[keys[i]]}/preview" title="dokumen"></iframe></div>`;
                            el.innerHTML = iddoc;
                        } else if (keys[i].indexOf("tahunlahir") > -1) {
                            el.innerHTML = (cariid[keys[i]] == "") ? "" : tanggalfull(cariid[keys[i]]);
                        } else if (keys[i].indexOf("tanggallahir") > -1) {
                            el.innerHTML = (cariid[keys[i]] == "") ? "" : tanggalfull(cariid[keys[i]]);
                        } else {
                            el.innerHTML = cariid[keys[i]];
                        }
                    }
                }
            }
        })
        .catch(er => {
            console.log(er);
            infoloadingljk.innerHTML = "Terjadi kesalahan. Ulangi sesi Anda sesaat lagi."
        })


    //document.querySelector(".kontenmateri").innerHTML = "";
    // infoloadingljk.innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"></p>`;
    //cekdaftarulang
};
const ajuanperubahandata = async () => {
    let ss = jlo.ss_datauser;
    let ur = jlo.url_datauser;
    let ling = ur + "?idss=" + ss;
    let datahtml = "",
        cariid;
    loadingljk.style.display = "block";
    $('#infoloadingljk').nextAll('button').remove();
    // let img = document.querySelector(".avatarsiswa");
    // let srcimg = img.getAttribute("src");
    // // console.log(srcimg)'
    infoloadingljk.innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"></p>`;
    await fetch(ling + "&action=usulanperbaikandata")
        .then(m => m.json())
        .then(k => {
            let sss = k.datasiswa.filter(s => s.id == tokensiswa);
            let ss = sss[0];


            if (sss.length == 0) {
                alert("Ananda belum pernah mengirimkan perubahan data (Belum daftar ulang)");
            } else {
                let teks = "";
                let status = ss.usulanperubahandata;
                if (status.indexOf("disetujui") > -1) {
                    teks = status
                } else {
                    teks = "sedang menunggu persetujuan admin Dapodik untuk disetujui."
                }
                alert("Ananda Sudah pernah mengajukan perubahan data dan " + teks);

            }
        }).catch(er => {

            console.log(er)
        })
    await fetch(ling + "&action=datasiswaaktif&kelas=" + namakelas)
        .then(m => m.json())
        .then(k => {
            // console.log(k);
            let sumber = k.datasiswa.filter(s => s.id == tokensiswa);

            datahtml = htmlformulirdatasiswa();
            infoloadingljk.innerHTML = datahtml;
            let obj = sumber[0];
            obj.action = "";
            let statussebelumnya = obj.usulanperubahandata
            if (statussebelumnya.indexOf("disetujui") > -1) {
                obj.usulanperubahandata = "Ajuan Ke-" + (parseInt(statussebelumnya.match(/(\d+)/)[0]) + 1);
            } else {
                obj.usulanperubahandata = "Ajuan Ke-1";
            }
            let key = Object.keys(obj); // key == header
            let nilai = Object.keys(obj).map(m => obj[m]);

            var elementform = document.getElementById("formajuandatasiswa").elements;
            for (x = 0; x < elementform.length; x++) {
                for (d = 0; d < key.length; d++) {
                    if (elementform[x].name == key[d]) {
                        if (elementform[x].type == "date") {
                            elementform[x].value = StringTanggalnol(new Date(nilai[d])) //;
                        } else if (elementform[x].type == "radio") {
                            if (elementform[x].value == nilai[d]) {
                                elementform[x].checked = true;
                            }
                        } else if (elementform[x].type == "select-one") {
                            // if (elementform[x].options[elementform[x].selectedIndex].value == nilai[d]) {
                            //     elementform[x].options[elementform[x].selectedIndex].selected = true;
                            //     //     elementform[x].selected = true;
                            // }
                            elementform[x].value = nilai[d];
                            // console.log(elementform[x].name + "|" + elementform[x].type)
                        } else {
                            if (angkadistring.indexOf(key[d]) > -1) {
                                elementform[x].value = nilai[d].replace("'", "")
                            } else {
                                elementform[x].value = nilai[d]

                            }
                        };
                    }
                }
            }

        }).catch(er => {
            console.log(er);
            infoloadingljk.innerHTML = "Terjadi kesalahan."
        })

};

const printModalinfoljk = (title, ele) => {
    let isi = document.querySelector("#" + ele).innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO ${title}</title>`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=Raleway">`;
    head.innerHTML += `<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>`;
    head.innerHTML += `<style type="text/css"> .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000} .garis td,.garis th,.garis tr{border:0.5px solid rgb(119, 116, 116)} .garis th{border:1px solid #000;text-align:center;vertical-align:middle} </style>`;

    head.innerHTML += `<style type="text/css" media="print">
    @media print {
        html,body{height:100%;width:100%;margin:0;padding:0}
        
         @page {
            size: A4 portrait;
            max-height:100%;
            max-width:100%;
            
            }
    }
    </style>`;

    body.innerHTML = `${isi}`;


    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}
const printModalinfoljkclaas = (title, ele) => {
    let isi = document.querySelector("." + ele).innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO ${title}</title>`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=Raleway">`;
    head.innerHTML += `<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>`;
    head.innerHTML += `<style type="text/css"> .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000} .garis td,.garis th,.garis tr{border:0.5px solid rgb(119, 116, 116)} .garis th{border:1px solid #000;text-align:center;vertical-align:middle} </style>`;

    head.innerHTML += `<style type="text/css" media="print">
    @media print {
        html,body{height:100%;width:100%;margin:0;padding:0}
        
         @page {
            size: A4 portrait;
            max-height:100%;
            max-width:100%;
            
            }
    }
    </style>`;

    body.innerHTML = `${isi}`;


    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}
const ketik_kapital = (el) => el.value = el.value.toUpperCase();

const lihatraportsemester = () => {
    //cek dulu data apinya ada ga untuk namasiswa ini:
    w3_close();
    loadingAPI.style.display = "block";
    fetch(urlnilai + "?action=cekpublikasiraportsemester&kelas=" + namakelas)
        .then(m => m.json())
        .then(r => {
            let namaanakini = r.data.filter(k => k.namasiswa == namasiswa); //"ABIN NUGRAHA");
            if (namaanakini.length > 0) {
                if (namaanakini[0].semesterpublikasi == "show") {
                    modalraport(namaanakini[0].raportsemester)

                } else {

                    alert("Mohon Maaf, Raport belum dipublikasikan.")
                }
            } else {
                alert("Mohon Maaf, Raport belum dipublikasikan.")
            }
            loadingAPI.style.display = "none";
        }).catch(er => {
            alert(er);
            loadingAPI.style.display = "none";

        })
};

const klikpotosiswa = (el) => {

    document.getElementById("img01").src = el.src;
    document.getElementById("previewpotoabsen").style.display = "block";

};

let apikontenmateri
const panggilmateri = async () => {
    // loadingAPI.style.display = "block";
    // infoloadingAPI.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`;
    // //panggil dataApinya dulu;
    let a = new Date();
    let b = a.getDate();
    let c = a.getMonth() + 1;
    let d = a.getFullYear()
    let idokmateri = addZero(b) + "" + addZero(c) + "" + d;
    let parameterlain = "&crtToken=" + idokmateri + "&idtoken=" + jenjang;
    let html = "";
    apikontenmateri = []
    // await fetch(linkmateri + "&action=materihariini" + parameterlain)
    await fetch(linkmateri + "&action=kronolog&idtoken=" + jenjang)
        .then(m => m.json())
        .then(f => {


            let res = f.result;
            //cek jika crtToken hari ini, idtgl s/d idtglend
            let cek = res.filter(function (s) {
                let awal = new Date(s.idtgl).getTime();
                let akhir = new Date(s.idtglend).getTime();
                let skrg = new Date().getTime();
                if ((skrg > awal && skrg < akhir) || s.crtToken == idokmateri) {
                    return true
                } else {
                    return false
                }


            })


            localStorage.setItem("materi", JSON.stringify(cek));
            let kontenmateri = cek;//f.result;

            apikontenmateri = cek;//f.result;
            if (kontenmateri.length == 0) {
                html = "Hari ini tidak ada materi."
            } else {
                html += `Materi Ananda hari ini ada ${kontenmateri.length} Materi:`
                for (i = 0; i < kontenmateri.length; i++) {
                    html += `<div class="w3-card-4 mhi mhi_ke${i} w3-container w3-margin-bottom w3-margin-top">
                    <div class="w3-badge w3-left w3-black">${i + 1}</div>
                    <div class="w3-badge w3-right warnaeka w3-text-black">${(kontenmateri[i].jenistagihan == "") ? "Latihan" : kontenmateri[i].jenistagihan}</div>
                    <div class="w3-clear"></div>
                    <h5 class="mhi_pembelajaran w3-bottombar">${kontenmateri[i].idmapel}</h5>
                    <div class="mhi_waktu w3-tiny w3-center w3-border-bottom">${tanggalfulllengkaphari(kontenmateri[i].idtgl)} <br/>s/d<br/> ${tanggalfulllengkaphari(kontenmateri[i].idtglend)}</div>
                    <br/><div class="mhi_status_${i} w3-small w3-center">Sedang Memeriksa ... <i class="fa fa-refresh fa-spin"></i></div>
                    <hr/>
                    </div>`;
                }

            }
            document.querySelector(".klikmateri").innerHTML = html;

        })
        .catch(er => {
            console.log(er);
            infoloadingAPI.innerHTML = "Maaf, terjadi kegagalan koneksi. <hr>Pesan error :" + er
            document.querySelector(".klikmateri").innerHTML = "Mohon Maaf, terjadi kesalahan. Ulangi beberapa saat lagi. <br>Kode" + er

        })

    if (apikontenmateri.length > 0) {

        let j = 0;
        do {
            await cekkerjaan(j, apikontenmateri[j])
            j++
        }
        while (j < apikontenmateri.length);
    }

    loadingAPI.style.display = "none";

}

const panggilmateridd = async () => {
    // console.log (namasiswa);
    // console.log (namakelas);
    // console.log (jenjang);
    loadingAPI.style.display = "block";
    infoloadingAPI.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`



    let a = new Date();
    let b = a.getDate();
    let c = a.getMonth() + 1;
    let d = a.getFullYear()
    let idokmateri = addZero(b) + "" + addZero(c) + "" + d;
    let parameterlain = "&crtToken=" + idokmateri + "&idtoken=" + jenjang;
    //console.log(idokmateri)


    //let idss = "1f4Rg_uax5Tk6X9Xawo972uDYnll0aHoYGM3NVLrW0rU" + parameterlain;
    await fetch(linkmateri + "&action=materihariini" + parameterlain)
        .then(m => m.json())
        .then(f => {
            loadingAPI.style.display = "none"
            //console.log(f)
            localStorage.setItem("materi", JSON.stringify(f.result));
            let html = `
            <h4 class="w3-card-4 w3-padding w3-margin">
                <button class="w3-button w3-pink w3-round w3-right w3-tiny" onclick="panggilmateri()">
                    <i class="fa fa-refresh"></i> Refresh Materi
                </button>Materi Ananda Hari Ini:<h3>`;

            document.querySelector(".klikmateri").innerHTML = `<h4 class="w3-card-4 w3-padding w3-margin"><button class="w3-button w3-pink w3-round w3-right w3-tiny" onclick="panggilmateri()"><i class="fa fa-refresh"></i> Materi</button>Materi Ananda Hari Ini:<h3> `;
            // f.result.forEach(element => {
            let tabel = document.createElement("table")
            tabel.setAttribute("class", "versi-table w3-card-4 w3-margin-bottom tabelmaterihariini")
            let row = tabel.insertRow(0);
            let th = row.insertCell(-1);
            th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:-16px;box-shadow: inset 0 0 1px #000000");
            th.innerHTML = "Pembelajaran";

            th = row.insertCell(-1);
            th.innerHTML = "Jenis Penilaian";

            th = row.insertCell(-1);
            th.innerHTML = "Status";

            th = row.insertCell(-1);
            th.innerHTML = "Waktu Mulai";

            th = row.insertCell(-1);
            th.innerHTML = "Waktu Akhir";

            th = row.insertCell(-1);
            th.innerHTML = "Durasi";

            th = row.insertCell(-1);
            th.innerHTML = "Aksi";





            let element = f.result;
            for (i = 0; i < element.length; i++) {
                let row = tabel.insertRow(-1);
                sel = row.insertCell(-1);
                sel.setAttribute("style", "position:sticky;position:-webkit-sticky;left:-16px;box-shadow: inset 0 0 1px #000000");
                sel.innerHTML = element[i].idmapel;
                sel = row.insertCell(-1);
                sel.innerHTML = element[i].jenistagihan;
                sel = row.insertCell(-1);
                sel.innerHTML = `<button class="w3-button w3-green" onclick="cekkerjaan(${i})">Cek</button>`;
                sel = row.insertCell(-1);
                sel.innerHTML = "Pukul " + addZero(new Date(element[i].idtgl).getHours()) + ":" + addZero(new Date(element[i].idtgl).getMinutes()) + ":" + addZero(new Date(element[i].idtgl).getSeconds());
                sel = row.insertCell(-1);
                sel.innerHTML = "Pukul " + addZero(new Date(element[i].idtglend).getHours()) + ":" + addZero(new Date(element[i].idtglend).getMinutes()) + ":" + addZero(new Date(element[i].idtglend).getSeconds());
                sel = row.insertCell(-1);
                sel.innerHTML = element[i].iddurasi;
                sel = row.insertCell(-1);
                sel.innerHTML = `tekan tombol cek`; //<button class="w3-button w3-green" onclick="previewriwayat(${i})">Materi</button>`;
            }
            //}

            document.querySelector(".klikmateri").appendChild(tabel)
            document.querySelector(".sudahabsen").style.display = "none";
            setCookie("lamankode", 3)

        }).catch(er => {
            //alert("Ups, maaf terjadi kesalahan ... 2 detik lagi akan kembali ("+er+")");
            //console.log(er)
            infoloadingAPI.innerHTML = "Maaf, terjadi kegagalan koneksi. <hr>Pesan error :" + er
            document.querySelector(".klikmateri").innerHTML = "Mohon Maaf, terjadi kesalahan. Ulangi beberapa saat lagi. <br>Kode" + er
        });;

}

const menudataabsen = () => {

    w3_close()
    modalabsen.style.display = "block"
}
let rekapabsensiswabulanan;
const modalfnkalender = () => {
    let x = document.getElementById("siswapilihbulan").selectedIndex;
    let y = document.getElementById("siswapilihbulan").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);
    let namabulan = y[x].text.replace(" 2021", "").replace(/\s+/g, "");
    modalnamabulan.innerHTML = '<img src="/img/barloading.gif"/>'; //y[x].text.toUpperCase();

    let notgl = new Date(y[x].value);


    let tyear = notgl.getFullYear();
    let mont = notgl.getMonth();
    let tmont = notgl.getMonth() + 1;
    let tglakhir = daysInMonth(tmont, tyear);
    let lr = 1;

    let elkosong = document.querySelectorAll(".kosongindulu");
    for (let a = 0; a < elkosong.length; a++) {
        elkosong[a].innerHTML = "";
    }

    let ket = [];
    for (let i = 0; i < tglakhir; i++) {
        let dd = new Date(tyear, mont, (i + 1));
        let day = new Date(tyear, mont, (i + 1)).getDay(); /// dimulai dari 0
        let tday = new Date(tyear, mont, (i + 1)).getDate(); /// dimulai dari 0
        let idok = tday + "" + addZero(dd.getMonth() + 1) + "" + dd.getFullYear();
        let col = day + 1;


        let td = document.getElementById("kolomtabel" + lr + "_" + col)
        td.innerHTML = tday;
        //td.innerHTML += (rekapabsensiswabulanan.id == idok) ? `<br><img src=""/>` : `<br>Tidak Hadir`
        td.innerHTML += `<div id="td_${encodeURIComponent(tokensiswa)}_${idok}"></div>`

        if (cocoklibur(dd)) {
            td.setAttribute("style", "background-color:red");
            let tgllibur = tanggalfull(dd) + " = " + keteranganlibur(dd)
            ket.push(tgllibur);
        } else {
            td.removeAttribute("style")
        }

        if (col == 7) {

            lr++
        }
    }

    // if (ket.length == 0) {
    //     ketketlibur.innerHTML = ""
    // } else {
    //     ketketlibur.innerHTML = ket.join("<br>")
    // }
    let keta = localStorage.getItem("Kaldik");
    let ketc = JSON.parse(keta);
    let ketm = mont;
    let kety = tyear;
    let b = ketc.filter(s => (new Date(s.start_tgl).getMonth() == ketm || new Date(s.end_tgl).getMonth() == ketm) && (new Date(s.start_tgl).getFullYear() == kety || new Date(s.end_tgl).getFullYear() == kety));
    let ketlibur = "";
    if (b.length !== 0) {
        ketlibur = "Keterangan Tanggal:<ul>";
        for (i = 0; i < b.length; i++) {
            let thn_awal = new Date(b[i].start_tgl).getFullYear();
            let thn_akhir = new Date(b[i].end_tgl).getFullYear();
            // console.log(thn_awal + " " + thn_akhir)
            let bln_awal = new Date(b[i].start_tgl).getMonth();
            let bln_akhir = new Date(b[i].end_tgl).getMonth();
            let tgl_awal = new Date(b[i].start_tgl).getDate();
            let tgl_akhir = new Date(b[i].end_tgl).getDate();
            if (thn_awal == thn_akhir) {
                if (bln_awal == bln_akhir) {
                    if (tgl_awal == tgl_akhir) {

                        ketlibur += `<li> Tgl ${tgl_awal} ${timekbm_arraybulan[ketm]} ${new Date(b[i].start_tgl).getFullYear()}= ${b[i].keterangan}</li>`;
                    } else {
                        ketlibur += `<li> Tgl ${tgl_awal} - ${tgl_akhir} ${timekbm_arraybulan[ketm]}  ${new Date(b[i].end_tgl).getFullYear()}= ${b[i].keterangan}</li>`;
                    }
                } else {
                    ketlibur += `<li> Tgl ${tgl_awal} ${timekbm_arraybulan[bln_awal]} - ${tgl_akhir} ${timekbm_arraybulan[bln_akhir]}  ${thn_awal}= ${b[i].keterangan}</li>`;
                }
            } else {
                ketlibur += `<li> Tgl ${tgl_awal} ${timekbm_arraybulan[bln_awal]} ${thn_awal} - ${tgl_akhir} ${timekbm_arraybulan[bln_akhir]}  ${thn_akhir}= ${b[i].keterangan}</li>`;
            }
        }
        ketlibur += "</ul>";
    }
    ketketlibur.innerHTML = ketlibur;
    let datee = StringTanggal(notgl);
    dataabsenbulanan(datee, namabulan)
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

const cocoklibur = (tgl) => { /// bolean
    let k = JSON.parse(localStorage.getItem("TglLibur"))
    // let d = JSON.parse(localStorage.getItem("Ketlibur"))
    let arrayStringTglLibur = k.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
    //let arrayKetLibur = k.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

    let str = StringTanggal(new Date(tgl))

    let inte = arrayStringTglLibur.indexOf(str)

    if (inte > -1) {
        return true
    } else {
        return false
    }

}
const keteranganlibur = (tgl) => { /// bolean
    let k = JSON.parse(localStorage.getItem("TglLibur"))
    // let d = JSON.parse(localStorage.getItem("Ketlibur"))
    let arrayStringTglLibur = k.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
    let arrayKetLibur = k.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

    let str = StringTanggal(new Date(tgl))

    let inte = arrayStringTglLibur.indexOf(str);
    let arr = ''

    if (inte > -1) {
        arr = arrayKetLibur[inte]

    }

    return arr
}

const dataabsenbulanan = async (datee, namabulan) => {

    await fetch(url_absensiswa + "?action=rekapbulan&kelas=" + namakelas + "&strtgl=" + datee)
        .then(m => m.json())
        .then(k => {
            let x = document.getElementById("siswapilihbulan").selectedIndex;
            let y = document.getElementById("siswapilihbulan").options;
            //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);
            let namabulan = y[x].text.replace(" 2021", "").replace(/\s+/g, "");
            modalnamabulan.innerHTML = y[x].text.toUpperCase();
            //console.log(k)
            //jsonabsenkelasperbulan = k[bulanapi];
            rekapabsensiswabulanan = k[namabulan].filter(s => s.tokensiswa == tokensiswa);
            // console.log(namabulan)
            // rekapabsensiswabulanan = k[namabulan].filter(s => s.name == namasiswa);
            //console.log(rekapabsensiswabulanan)
            //---------------------------------------------------

            for (var i = 0; i < rekapabsensiswabulanan.length; i++) {
                //mengecek element kodeid
                //kodeid = jsonabsenkelasperbulan[i].id + "_" + kelas + "_" + encodeURIComponent(jsonabsenkelasperbulan[i].name);
                let kodetd = "td_" + encodeURIComponent(rekapabsensiswabulanan[i].tokensiswa) + "_" + rekapabsensiswabulanan[i].id;
                //console.log(kodetd)
                var isikehadiran = document.getElementById(kodetd)

                if (isikehadiran == null) {
                    //document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML += "<li>" + decodeURIComponent(jsonabsenkelasperbulan[i].name) + " pada tanggal " + new Date(jsonabsenkelasperbulan[i].Time_Stamp).getDate() + " Tidak ada/diubah namanya.</li>";
                } else {
                    var link = rekapabsensiswabulanan[i].fileContent;
                    if (link !== "") {
                        var linksplit = link.replace("https://drive.google.com/file/d/", "");
                        var linksplitt = linksplit.replace("/view?usp=drivesdk", "");

                    } else {

                        var linksplitt = idlogo;
                    }


                    var cekdiv = document.getElementById(kodetd);
                    if (cekdiv != null) {
                        //document.getElementById(kodetd).removeAttribute("onclick");

                        // isikehadiran.innerHTML = "<div style='width:22px;height:32px;cursor:pointer;border:1px solid blue'><a href='" + jsonabsenkelasperbulan[i].fileContent + "' target='_blank'><img src='https://drive.google.com/uc?export=view&id=" + linksplitt + "'  style='width:20px; height:30px'  alt='poto'><br/>" + jsonabsenkelasperbulan[i].kehadiran + "</a></div>";
                        isikehadiran.innerHTML = `<img class="w3-image" src="https://drive.google.com/uc?export=view&id=${linksplitt}" style="width:20px; height:30px;cursor:pointer" alt="poto" onclick="klikpotosiswa(this)"/><br/>${rekapabsensiswabulanan[i].kehadiran}`;

                    }
                    //document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML +="";
                }

            }

        }).catch(er => {
            console.log(er)
        })

}



//////////////////////////////////////////////////////////

let jsonmenudatapembelajaran;
const menudatapembelajaran = () => {
    modalmateri.style.display = "block";
    fetch(linkmateri + "&action=kronolog&idtoken=" + jenjang)
        .then(m => m.json())
        .then(j => {
            spanlabelmateri.innerHTML = "Jumlah Materi ada " + j.result.length + " Silakan pilih : <br><sub class='w3-text-blue'>Materi terbaru ada di urutan terakhir</sub>";
            jsonmenudatapembelajaran = j.result;
            siswapilihmateri.innerHTML = "<option value=''>Silakan Pilih Materinya</option>"
            for (let i = 0; i < j.result.length; i++) {
                let op = document.createElement("option");
                op.setAttribute("value", i)
                op.setAttribute("id", "materike" + i)
                let teks = document.createTextNode(j.result[i].idmapel)
                op.appendChild(teks)
                siswapilihmateri.appendChild(op)
            }


        }).catch(er => {
            console.log(er);
        })
}
const fetckronologi = () => {
    fetch(linkmateri + "&action=kronolog&idtoken=" + jenjang)
        .then(m => m.json())
        .then(j => {
            //templatekronologi(j.result);
            //kronologijson = j.result;
            console.log(j)

        })
}

const modalfnmateri = () => {
    let x = document.getElementById("siswapilihmateri").selectedIndex;
    let y = document.getElementById("siswapilihmateri").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);
    //let namabulan = y[x].text;
    //modalnamabulan.innerHTML = namabulan.toUpperCase() + " 2021";
    let indek = parseInt(y[x].value);

    let mtri = jsonmenudatapembelajaran[indek].idmapel;
    let mtricode = jsonmenudatapembelajaran[indek].idbaris;
    let idmateri = jsonmenudatapembelajaran[indek].idmateri;
    let tagih = jsonmenudatapembelajaran[indek].jenistagihan
    let ctok = jsonmenudatapembelajaran[indek].crtToken
    let idtgl = jsonmenudatapembelajaran[indek].idtgl;
    let idtglend = jsonmenudatapembelajaran[indek].idtglend;
    let trueEssay = (jsonmenudatapembelajaran[indek].jumlahessay == 0) ? false : true;
    let bataswaktu = new Date(idtglend).getTime();
    let awalwaktu = new Date(idtgl).getTime()

    let integerWaktusekarang = new Date().getTime();

    divmodalmateri.innerHTML = `
    <table class="w3-card-4 w3-table-all garis w3-centered">
    <tr>
        <th>
            Identitas KBM
        </th>
        <th>
            Hasil Belajar
        </th>
        <th>
            Waktu KBM
        </th>
        <th>
            Aksi
        </th>
    </tr>
    <tr>
        <td>
            ${mtri.toUpperCase()}
        </td>
        <td>
            <div id="ddtabelhasilbelajar">
            <i class="fa fa-spin fa-refresh"></i>
            </div>
            </td>
            <td>
            ${tanggalfulllengkap(new Date(idtgl))} <br> s/d<br>
            ${tanggalfulllengkap(new Date(idtglend))} <br>
            
            </td>
            <td id="tdtombolsoaloffline">
            <i class="fa fa-spin fa-refresh"></i>
        
        </td>
    </tr>
    
    </table>
    `

    // let url = urlnilai + "?action=datasiswasudahmengerjakan";
    let paramtambahan = "&idkelas=" + encodeURIComponent(namakelas);
    fetch(urlnilai + "?action=nilairseponkronologi" + paramtambahan)
        .then(m => m.json())
        .then(f => {
            // console.log(f)
            let res = f.records;



            // let ressort = res.filter(k => k.idmapel == mtri && k.jenistagihan == tagih & k.crtToken == ctok & k.namasiswa == namasiswa)
            let ressort = res.filter(k => k.matericode == mtricode && k.jenistagihan == tagih & k.crtToken == ctok & k.tokensiswa == tokensiswa)
            // nilairesponkronologi = f.records;
            if (ressort.length == 0) {
                if (integerWaktusekarang < awalwaktu && integerWaktusekarang < bataswaktu) {
                    ddtabelhasilbelajar.innerHTML = "Maaf, Pembelajaran belum bisa diakses";
                    tdtombolsoaloffline.innerHTML = "Maaf, Pembelajaran belum bisa diakses";
                } else if (integerWaktusekarang > awalwaktu && integerWaktusekarang > bataswaktu) {

                    ddtabelhasilbelajar.innerHTML = "Ananda melewatkan KBM Ini";
                    tdtombolsoaloffline.innerHTML = `<button class='w3-button w3-blue' onclick='soaloffline("${idmateri}");modalmateri.style.display = "none"'>Latihan lagi</button>`;
                    alert("Ananda melewatkan KBM ini. Tapi jangan khawatir, cobalah Ananda Klik tombol Latihan Lagi, tulis jawabannya di kertas kemudian serahkan ke gurumu via Whatsapp. Gurumu akan membantumu.")
                } else {
                    //domTabel.rows[(d + 1)].cells[6].innerHTML = `<button class="w3-button w3-green" onclick="previewriwayat(${d})">Mulai Belajar</button>`
                    ddtabelhasilbelajar.innerHTML = "Sedang Berlangsung, tapi nilai belum dikirimkan";
                    tdtombolsoaloffline.innerHTML = "Sedang Berlangsung, tapi nilai belum dikirimkan";
                    let elhadir = document.querySelector(".ketabsensiswa")
                    if (elhadir.innerHTML == "Ananda Belum Absen") {
                        alert("Ayo, materi ini sedang berlangsung. Ananda masih punya kesempatan untuk mengerjakan dan mengirimkan nilai. Silakan Ananda Absen terlebih dahulu untuk mengerjakannya.")
                    } else {
                        alert("Ayo, materi ini sedang berlangsung. Ananda masih punya kesempatan untuk mengerjakan dan mengirimkan nilai. Ananda sudah absen, silakan ke halaman utama untuk mengerjakan materi")
                    }
                }

            } else {
                let last = ressort.length - 1;
                let obnilaikd = ressort[last].nilaikd;
                let idhtml = ressort[last].html_jawaban;
                let cekessay = (ressort[last].nilaiEssay == "" && trueEssay) ? `<button class='w3-button w3-red' onclick='lihatljksaya("${idhtml}");modalmateri.style.display = "none"'>LJK (?)</button>` : `<button class='w3-button w3-green' onclick='lihatljksaya("${idhtml}");modalmateri.style.display = "none"'>LJK <i class="fa fa-check-circle"></i></button>`;


                let objek = JSON.parse(obnilaikd);
                let keyobjek = Object.keys(objek)
                let teks = "";
                for (i = 0; i < keyobjek.length; i++) {
                    teks += keyobjek[i] + " = " + objek[keyobjek[i]] + "<br>"

                }

                //let teks =`${obnilaikd["PKN_3.1"]}`
                let usbukan = (ressort[last].jenistagihan == "ustertulis") ? true : false;
                if (usbukan) {
                    ddtabelhasilbelajar.innerHTML = `Nilai akan diumumkan pada tanggal 15 Juni 2021 di menu Pengumuman Kelulusan`;
                } else {
                    ddtabelhasilbelajar.innerHTML = `Selesai, dengan skor <br> ${teks}<br>${cekessay}`;

                }

                tdtombolsoaloffline.innerHTML = `<button class='w3-button w3-blue' onclick='soaloffline("${idmateri}");modalmateri.style.display = "none"'>Latihan lagi</button>`


            }


        })


};

////////////////////////////////////////////////////

function uploadpotoessayt(id) {
    var item = document.getElementById("iduploadpotoessay" + id).files[0];
    var tempat = document.getElementById("filejawaban" + id);
    let total = (1048576 / item.size).toFixed(2);
    tampilan.innerHTML = `<i class="fa fa-spin fa-spinner w3-xxlarge"></i> Sedang proses, mohon tunggu ...`



    let ekstensi = item.name.substring(item.name.lastIndexOf('.') + 1);


    var filename;
    // format nama file = kodetokensiswa_kelas_nomateri_nosoal
    filename = namakelas + "_" + tokensiswa + "_idmateri_" + kodebarismateriyangdikerjakan + "_essayno_" + id;

    let dataaa = ""
    var ofReader = new FileReader();
    ofReader.readAsDataURL(item);
    ofReader.onload = async function (e) {

        let base64 = e.target.result.replace(/^.*,/, '');
        let mmtype = e.target.result.match(/^.*(?=;)/)[0];
        dataaa = e.target.result
        let datafom = new FormData()
        datafom.append("base64", base64);
        datafom.append("mmtype", mmtype);
        datafom.append("kelas", namakelas);
        datafom.append("filename", filename);
        datafom.append("ekstensi", ekstensi);
        await fetch(urlnilai + "?action=siswauploadmedia", {
            method: 'post',
            body: datafom
        }).then(m => m.json())
            .then(k => {
                tampilan.innerHTML = k.result

            })
            .catch(er => {
                tampilan.innerHTML = "<div class='w3-red w3-large'>Ups, Maaf. Media gagal diunggah ke server. Jaringan Ananda sedang terjadi trafick, silakan UNGGAH ULANG (klik UPLOAD JAWABAN lagi ...) </div><br><br>Kode Error: " + er;
                // // let divhapus = document.getElementById("tomboljawaban" + id);
                // // divhapus.innerHTML = ``;
                // tampilan.innerHTML = `media gagal diunggah silakan upload ulang kode ${er}`;//`<div id="tomboljawaban${id}"><hr>Maaf, jaringan skrip 1 Ananda terjadi trafik (kode error: ${er}). Media gagal diunggah. Silakan coba lagi ya ...<br><button onclick="tombolketikjawaban('${id}')">Ketik Jawaban No ${id}</button><br><sub>atau</sub><br> <button onclick="tomboluploadjawaban('${id}')">Upload Media No ${id}</button><br><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub></div>`;

            })



    }



}
const siswauploadmediajawaban = () => {

    let dataform = new FormData();
    dataform.append("base64", mediabase64.value);
    dataform.append("mmtype", mediammtype.value);
    dataform.append("filename", mediafilename.value);
    dataform.append("kelas", mediakelas.value);

    fetch(urlnilai + "?siswauploadmedia", {
        method: 'post',
        body: dataform
    }).then(m => m.json())
        .then(k => {
            return k.result
        })
        .catch(er => {
            let teks = "Ups, maaf. Upload Gagal.<br>Kode error: " + er
            // let divhapus = document.getElementById("tomboljawaban" + id);
            // divhapus.innerHTML = "";
            // //tampilan.innerHTML = `<div id="tomboljawaban${id}"><hr>Maaf, jaringan skrip 1 Ananda terjadi trafik (kode error: ${er}). Media gagal diunggah. Silakan coba lagi ya ...<br><button onclick="tombolketikjawaban('${id}')">Ketik Jawaban No ${id}</button><br><sub>atau</sub><br> <button onclick="tomboluploadjawaban('${id}')">Upload Media No ${id}</button><br><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub></div>`;
            // let teks = `<div id="tomboljawaban${id}"><hr>Maaf, jaringan Ananda skrip 2 terjadi trafik (kode error: ${er}). Media gagal diunggah. Silakan coba lagi ya ...<br><button onclick="tombolketikjawaban('${id}')">Ketik Jawaban No ${id}</button><br><sub>atau</sub><br> <button onclick="tomboluploadjawaban('${id}')">Upload Media No ${id}</button><br><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub></div>`;
            return teks
        })
}


const modalrekamandulu = () => {
    document.getElementById("koleksivideo").style.display = "block";

}


let tmblkirim = document.getElementById("uploadvideodiljk");
let btnvideo = document.getElementById("tmblvid");
let btnpoto = document.getElementById("tmblpot");
let btngal = document.getElementById("tmblgal");

let inbtnpot = document.getElementById("inputtmblpoto");
let inbtngal = document.getElementById("inputtmblgaleri");
let resultpotogaleri = document.getElementById("elemintmblpotogaleri");
let tampilan = document.getElementById("resultuploadvideomateri");

let localStream = ""; // vidvid2.style.display = "none";
let spanstatus = document.querySelector("#spanstatusrekaman");
let spanstatus2 = document.querySelector("#spanstatusrekaman2");
let videostatus = document.querySelector("#statusrekaman");
let elvid1 = document.querySelector("#divvideokamera");
let elvid2 = document.querySelector("#divvideorekam");
let starter = document.getElementById('btnStart');
let stopB = document.getElementById('btnStop');
let btnBack = document.getElementById('btnBack');
let vidSave = document.getElementById('vid2');
let vidlayar = document.getElementById('vid1');
let eltombolwebcam = document.getElementById("tomboltombolwebcam");

const mulaivideo = (depblak, id) => {
    tmblkirim.innerHTML = "Unggah Jawaban No. " + id;
    tmblkirim.setAttribute("onclick", "alert('Belum ada media yang dapat diunggah')");
    // let divV = document.getElementById('vid2');
    // divV.style.display = "none";
    // divP.style.display = "block";
    // let divP = document.getElementById('vid1');
    // let vidvid2 = document.getElementById('divvid2');
    let acuankamera = "";
    let indikatorkamer;;
    if (depblak == "belakang") {
        // facingMode: {exact: "user"}
        // facingMode: "environment"     
        indikatorkamer = "environment";
        btnBack.innerHTML = " Depan";
        acuankamera = "depan";
    } else {
        indikatorkamer = {
            exact: "user"
        };
        btnBack.innerHTML = " Belakang";
        acuankamera = "belakang";
    }
    //resultuploadvideomateri.innerHTML = "";
    let constraintObj = {
        audio: true,
        video: {
            facingMode: indikatorkamer,
            width: 320,
            height: 240
            // , //"user",
            // width: { min: 640, ideal: 1280, max: 1920 },
            // height: { min: 480, ideal: 720, max: 1080 }
            // class: 'responsive-iframebaru',
            // poster: '/img/192.png'
        }
    };
    // width: 1280, height: 720  -- preference only
    // facingMode: {exact: "user"}
    // facingMode: "environment"

    //handle older browsers that might implement getUserMedia in some way
    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
        navigator.mediaDevices.getUserMedia = function (constraintObj) {
            let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraintObj, resolve, reject);
            });
        }

    } else {
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                devices.forEach(device => {
                    // console.log(device.kind.toUpperCase(), device.label);
                    // console.log(device.getTracks());
                    //alert(device.deviceId)
                })
            })
            .catch(err => {
                // console.log(err.name, err.message);
                alert(err.name + "\n" + err.message);
            })

    }


    navigator.mediaDevices.getUserMedia(constraintObj)
        .then(function (mediaStreamObj) {
            //connect the media stream to the first video element
            let video = document.querySelector('video');
            if ("srcObject" in video) {
                video.srcObject = mediaStreamObj;
            } else {
                //old version
                video.src = window.URL.createObjectURL(mediaStreamObj);
            }

            video.onloadedmetadata = function (ev) {
                //show in the video element what is being captured by the webcam
                video.play();
            };

            localStream = mediaStreamObj;
            //add listeners for saving video/audio

            let mediaRecorder = new MediaRecorder(mediaStreamObj);
            let chunks = [];

            starter.addEventListener('click', (ev) => {
                // divP.style.display = "block";
                // divV.style.display = "none";
                spanstatus.innerHTML = "Sedang merekam <i class='fa fa-spin fa-refresh'></i>";
                videostatus.removeAttribute("class"); //.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
                videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-middle w3-show"); //.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
                elvid1.removeAttribute("class");
                elvid1.setAttribute("class", "w3-center w3-show");
                elvid2.removeAttribute("class");
                elvid2.setAttribute("class", "w3-center w3-hide");

                //video.play();
                // console.log(mediaRecorder.state);
                if (mediaRecorder.state == "recording") {
                    alert("Anda sedang proses merekam.");
                    return
                }
                video.play();
                mediaRecorder.start();
                //localStream.getTracks().forEach(k => k = mediaStreamObj);
                //elvid2.getAttribute("class").replace("containerbaru w3-center w3-show", "containerbaru w3-center w3-hide")
            })
            stopB.addEventListener('click', (ev) => {
                if (mediaRecorder.state === "inactive") {
                    alert("Maaf, Tombol berfungsi ketika sedang proses rekaman");
                    return
                }
                videostatus.removeAttribute("class");
                videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-topmiddle w3-show"); //.replace("w3-blue w3-opacity w3-display-topmiddle w3-show", "w3-blue w3-opacity w3-display-topmiddle w3-hide");
                elvid1.removeAttribute("class");
                elvid1.setAttribute("class", "containerbaru w3-center w3-hide");
                elvid2.removeAttribute("class");
                elvid2.setAttribute("class", "containerbaru w3-center w3-show");


                video.pause();
                mediaRecorder.stop();
                //localStream.getTracks().forEach(k => k.stop());
                // console.log(mediaRecorder.state);
                //console.log(mediaRecorder);
            });
            mediaRecorder.ondataavailable = function (ev) {

                chunks.push(ev.data);
            }
            mediaRecorder.onstop = (ev) => {
                // divP.style.display = "none";
                // divV.style.display = "block";
                let blob = new Blob(chunks, {
                    'type': 'video/mp4;'
                });
                let videoURL = window.URL.createObjectURL(blob);
                vidSave.src = videoURL;
                //console.log(formatBytes(blob.size, 2));
                spanstatus.innerHTML = "Ukuran Video " + formatBytes(blob.size, 2) + " (Batas Maksimal unggah harus kurang dari 50 MB)";
                //---------------------------------------------------
                var reader = new FileReader();
                reader.readAsDataURL(blob);

                reader.onload = function (e) {
                    let urlbs64 = e.target.result;
                    //console.log(urlbs64);
                    var inputbase64 = document.createElement("input");
                    inputbase64.setAttribute("name", "videodata");
                    inputbase64.setAttribute("id", "videodata");
                    inputbase64.value = urlbs64.replace(/^.*,/, '');

                    inputbase64.setAttribute("style", "display:none");

                    var inputfilename = document.createElement("input");
                    inputfilename.setAttribute("name", "videofilename");
                    inputfilename.setAttribute("id", "videofilename");
                    inputfilename.setAttribute("style", "display:none");
                    inputfilename.value = "Kelas_" + jenjang + "_" + StringTanggal(new Date()) + "_id_" + new Date().getTime();; // + namebantukirim.value.toUpperCase().replace(/\s+/, "_");

                    var inputmimetype = document.createElement("input");
                    inputmimetype.setAttribute("name", "videomimeType")
                    inputmimetype.setAttribute("id", "videomimeType")
                    inputmimetype.setAttribute("style", "display:none")

                    inputmimetype.value = "video/mp4"; //srcEncoded.match(/^.*(?=;)/)[0];;//"data:image/jpeg";;// 


                    resultuploadvideomateri.innerHTML = "";
                    resultuploadvideomateri.appendChild(inputbase64);
                    resultuploadvideomateri.appendChild(inputfilename);
                    resultuploadvideomateri.appendChild(inputmimetype);
                    tmblkirim.innerHTML = "Video siap diunggah untuk jawaban Nomor " + id + " KLik tombol ini.";
                    tmblkirim.setAttribute("onclick", `uploadvideorekaman(${id})`);
                }
                //---------------------------------------------------
                chunks = [];

            }
            btnBack.addEventListener('click', (ev) => {
                if (mediaRecorder.state == "recording") {
                    alert("Anda sedang merekam. Silakan berhenti dulu dari perekaman");
                    return
                }
                //video.play();
                mulaivideo(acuankamera, id);
                vidSave.src = "";
                videostatus.removeAttribute("class");
                videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-middle w3-hide"); //.replace("w3-blue w3-opacity w3-display-topmiddle w3-show", "w3-blue w3-opacity w3-display-topmiddle w3-hide");
                elvid1.removeAttribute("class");
                elvid1.setAttribute("class", "w3-center w3-show");
                elvid2.removeAttribute("class");
                elvid2.setAttribute("class", "w3-center w3-hide");
                spanstatus.innerHTML = "Kamera sudah siap, silakan rekam.";
                resultuploadvideomateri.innerHTML = "";



            })


        })
        .catch(function (err) {
            //console.log(err.name, err.message);
            alert(err.name + "\n" + err.message);
        });

    // let el = document.getElementById("tomboltombolwebcam");
    // let el2 = document.getElementById("tomboltombolscreenrecorder");
    // el.style.display = "block";
    // el2.style.display = "none";
    // // vidlayar.setAttribute("poster", "/img/192.png");
    // // vidlayar.play();
    // // vidSave.stop();
    elvid1.removeAttribute("class");
    elvid1.setAttribute("class", "w3-center w3-show");
    elvid2.removeAttribute("class");
    elvid2.setAttribute("class", "w3-center w3-hide");
    spanstatus.innerHTML = "Kamera siap untuk merekam."; // <i class='fa fa-spin fa-refresh'></i>";
    videostatus.removeAttribute("class"); //.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
    videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-middle w3-hide"); //.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");


}

const tutupkamera = () => {

    if (localStream == "") {
        //alert("Mohon tunggu, proses loading sedang berlangsung....");
        return
    }
    localStream.getTracks().forEach(k => k.stop());

    resultuploadvideomateri.innerHTML = "";
    resultpotogaleri.innerHTML = "";
    inbtnpot.value = "";
    inbtngal.value = "";
}

function formatBytes(a, b = 2) {
    if (0 === a)
        return "0 Bytes";
    const c = 0 > b ? 0 : b,
        d = Math.floor(Math.log(a) / Math.log(1024));
    return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
}

const uploadpotoessay = (id) => {
    //alert(id);
    document.getElementById("koleksivideo").style.display = "block";
    // mulaivideo();
    btnvideo.setAttribute("onclick", `recordvideo(${id})`);
    btnpoto.setAttribute("onclick", `shootpoto(${id})`);
    btngal.setAttribute("onclick", `galerihp(${id})`);
    elvid1.removeAttribute("class");
    elvid1.setAttribute("class", "w3-center w3-hide");
    elvid2.removeAttribute("class");
    elvid2.setAttribute("class", "w3-center w3-hide");
    eltombolwebcam.removeAttribute("class");
    eltombolwebcam.setAttribute("class", "w3-center w3-hide");
    resultpotogaleri.innerHTML = "";
    tampilan.innerHTML = "";
    inbtnpot.value = "";
    inbtngal.value = "";
    tmblkirim.setAttribute("onclick", "alert('Belum ada media yang dapat diunggah')");
    tmblkirim.innerHTML = "Unggah Jawaban No. " + id;

    tutupkamera();

}

const recordvideo = (id) => {
    //alert("video jawaban no " + id);
    resultpotogaleri.innerHTML = "";
    tampilan.innerHTML = "";
    inbtnpot.value = "";
    inbtngal.value = "";
    eltombolwebcam.removeAttribute("class");
    eltombolwebcam.setAttribute("class", "w3-center w3-show");
    mulaivideo("depan", id);



}
const shootpoto = (id) => {
    inbtnpot.value = "";
    inbtngal.value = "";
    resultpotogaleri.innerHTML = "";
    tampilan.innerHTML = "";
    tutupkamera();
    elvid1.removeAttribute("class");
    elvid1.setAttribute("class", "w3-center w3-hide");
    elvid2.removeAttribute("class");
    elvid2.setAttribute("class", "w3-center w3-hide");

    eltombolwebcam.removeAttribute("class");
    eltombolwebcam.setAttribute("class", "w3-center w3-hide");
    inbtnpot.setAttribute("onchange", `ambilpotodarikamera(${id})`);
    inbtnpot.click();
    // alert("Poto jawaban no " + id);
}
const galerihp = (id) => {
    inbtnpot.value = "";
    inbtngal.value = "";
    resultpotogaleri.innerHTML = "";
    tampilan.innerHTML = "";
    tutupkamera();
    elvid1.removeAttribute("class");
    elvid1.setAttribute("class", "w3-center w3-hide");
    elvid2.removeAttribute("class");
    elvid2.setAttribute("class", "w3-center w3-hide");

    eltombolwebcam.removeAttribute("class");
    eltombolwebcam.setAttribute("class", "w3-center w3-hide");

    inbtngal.setAttribute("onchange", `ambilfiledarigaleri(${id})`);
    inbtngal.click();
    // alert("galeri jawaban no " + id);

}

const ambilpotodarikamera = (id) => {

    let item = inbtnpot.files[0];
    let read = new FileReader();
    let sz = 900;
    read.readAsDataURL(item);
    read.onload = function (e) {
        let src = e.target.result;
        let tipe = src.match(/^.*(?=;)/)[0];
        if (tipe.indexOf("video") > -1) {
            alert("Mohon maaf, video tidak bisa diunggah melalui fitur POTO, silakan klik VIDEO");
            return
        }
        let img = new Image();
        img.src = e.target.result; //result is base64-encoded Data URI
        //img.name = event.target.name;//set name (optional)
        img.size = e.target.size; //set size (optional)
        img.onload = function (el) {
            var elem = document.createElement('canvas'); //create a canvas

            //scale the image to 600 (width) and keep aspect ratio
            var scaleFactor = sz / el.target.width;
            elem.width = sz;
            elem.height = el.target.height * scaleFactor;

            //draw in canvas
            var ctx = elem.getContext('2d');
            ctx.drawImage(el.target, 0, 0, elem.width, elem.height);

            //get the base64-encoded Data URI from the resize image
            // var srcEncoded = ctx.canvas.toDataURL(el.target, 'image/jpeg', 0);
            var srcEncoded = ctx.canvas.toDataURL(el.target, 'image/jpeg', 0);
            // var srcEncoded = ctx.canvas.toDataURL(el.target);
            tampilan.innerHTML = "<img src='" + srcEncoded + "' class='w3-image'/>";


            let base64e = srcEncoded.replace(/^.*,/, '');
            let mtipe = srcEncoded.match(/^.*(?=;)/)[0];
            let elbase64 = document.createElement("div");
            elbase64.setAttribute("id", "jwbase64");
            // elbase64.setAttribute("value", base64e);
            elbase64.textContent = base64e;

            let namafile = namakelas + "_" + tokensiswa + "_idmateri_" + kodebarismateriyangdikerjakan + "_essayno_" + id;
            let innamafile = document.createElement("input");
            innamafile.setAttribute("id", "namafilejawaban");
            innamafile.setAttribute("value", namafile);

            let intipe = document.createElement("input");
            intipe.setAttribute("id", "mtipe");
            intipe.setAttribute("value", mtipe);


            resultpotogaleri.innerHTML = "";
            resultpotogaleri.appendChild(elbase64);
            resultpotogaleri.appendChild(innamafile);
            resultpotogaleri.appendChild(intipe);

            tmblkirim.innerHTML = "Poto siap diunggah untuk jawaban Nomor " + id;
            tmblkirim.setAttribute("onclick", `uploadpotokamera(${id})`);

        }


    }
}
const ambilfiledarigaleri = (id) => {

    let item = inbtngal.files[0];
    let ukuran = item.size;
    let read = new FileReader();
    read.readAsDataURL(item);
    read.onload = function (e) {
        let src = e.target.result;
        let tipe = src.match(/^.*(?=;)/)[0];
        // if (tipe.indexOf("video") > -1) {
        //     alert("Mohon maaf, video tidak bisa diunggah melalui fitur POTO, silakan klik VIDEO");
        //     return
        // }

        var srcEncoded = src;
        let base64 = srcEncoded.replace(/^.*,/, '');
        let mtipe = srcEncoded.match(/^.*(?=;)/)[0];
        /////////////////////////////////////////////////////////
        if (mtipe.indexOf("image") > -1) {
            tampilan.innerHTML = "<img id='image" + id + "' src='" + src + "' class='w3-image'/><br/>tipe gambar: " + mtipe.split("/")[1];
        } else if (mtipe.indexOf("video") > -1) {
            tampilan.innerHTML = "<video id='myvideo" + id + "' width='280' height='200'  poster='/img/lamaso.webp' controls><source src='" + src + "' type='" + mtipe + "' />Browser Anda tidak mendukung/format video tidak mendukung</video>";
        } else if (mtipe.indexOf("audio") > -1) {
            tampilan.innerHTML = "<video id='myaudio" + id + "' width='280' height='200'  poster='/img/lamaso.webp' controls><source src='" + src + "' type='" + mtipe + "' />Browser Anda tidak mendukung/format video/audio tidak mendukung</video>";
        } else if (mtipe.indexOf("wordprocessingml") > -1) {
            tampilan.innerHTML = "<i id='taktersedia_" + id + "' class='fa fa-file-word-o w3-xxxlarge' style='font-size:72px'></i><br/> Pratinjau tidak terrsedia ";
            //var idac = id +" "+ src;
            //panci(idac);

        } else if (mtipe.indexOf("text") > -1) {
            tampilan.innerHTML = "<iframe id='myiframe" + id + "' src='" + src + "' type='" + tipe + "' width='98%' height='400'></iframe><br/>tipe file: " + mtipe.split("/")[1];
        } else if (mtipe.indexOf("pdf") > -1) {
            tampilan.innerHTML = "<iframe id='pdfke" + id + "' src='" + src + "' type='" + tipe + "' width='98%' height='400'></iframe><br/>tipe file: " + mtipe.split("/")[1];
        } else {
            tampilan.innerHTML = "<i id='takdikenal_" + id + "'  class='fa fa-file-o w3-xxxlarge' style='font-size:72px'></i><br/> File Tidak dikenal <br/>tipe file: " + mtipe.split("/")[1];;
        }
        tampilan.innerHTML += "<hr/><div class='w3=center'>Ukuran FIle " + formatBytes(ukuran, 2) + " (Batas maksimal unggah adalah kurang dari 50 MB)</div>";

        /////////////////////////////////////////////////////////


        let elbase64 = document.createElement("div");

        elbase64.setAttribute("id", "jwbase64");
        // elbase64.setAttribute("value", base64e);
        elbase64.textContent = base64;

        let namafile = namakelas + "_" + tokensiswa + "_idmateri_" + kodebarismateriyangdikerjakan + "_essayno_" + id;
        let innamafile = document.createElement("input");
        innamafile.setAttribute("id", "namafilejawaban");
        innamafile.setAttribute("value", namafile);

        let intipe = document.createElement("input");
        intipe.setAttribute("id", "mtipe");
        intipe.setAttribute("value", mtipe);


        resultpotogaleri.appendChild(elbase64);
        resultpotogaleri.appendChild(innamafile);
        resultpotogaleri.appendChild(intipe);
        tmblkirim.innerHTML = "Media siap diunggah untuk jawaban Nomor " + id;
        tmblkirim.setAttribute("onclick", `uploadmediagaleri(${id})`);


    }
}


const uploadvideorekaman = async (id) => {
    tmblkirim.innerHTML = `<i class="fa fa-refresh fa-spin"></i> Sedang proses ....`;

    let videodata = document.getElementById("videodata").value;
    let videomimeType = document.getElementById("videomimeType").value;
    let videofilename = document.getElementById("videofilename").value;
    var tempat = document.getElementById("filejawaban" + id);
    let datafom = new FormData()
    datafom.append("base64", videodata);
    datafom.append("mmtype", videomimeType);
    datafom.append("kelas", namakelas);
    datafom.append("filename", videofilename);
    datafom.append("ekstensi", "mp4");
    resultpotogaleri.innerHTML = "";
    await fetch(urlnilai + "?action=siswauploadmedia", {
        method: 'post',
        body: datafom
    }).then(m => m.json())
        .then(k => {
            tmblkirim.innerHTML = `Berhasil diunggah`;


            document.getElementById("silangmodal").click();
            tempat.innerHTML = k.result;
            //resultpotogaleri.innerHTML = "";

        })
        .catch(er => {
            document.getElementById("silangmodal").click();
            tempat.innerHTML = "<div class='w3-red w3-large'>Ups, Maaf. Media gagal diunggah ke server. Jaringan Ananda sedang terjadi trafick, silakan UNGGAH ULANG (klik UPLOAD JAWABAN lagi ...) </div><br><br>Kode Error: " + er;
            // // let divhapus = document.getElementById("tomboljawaban" + id);
            // // divhapus.innerHTML = ``;
            // tampilan.innerHTML = `media gagal diunggah silakan upload ulang kode ${er}`;//`<div id="tomboljawaban${id}"><hr>Maaf, jaringan skrip 1 Ananda terjadi trafik (kode error: ${er}). Media gagal diunggah. Silakan coba lagi ya ...<br><button onclick="tombolketikjawaban('${id}')">Ketik Jawaban No ${id}</button><br><sub>atau</sub><br> <button onclick="tomboluploadjawaban('${id}')">Upload Media No ${id}</button><br><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub></div>`;

        })




}
const uploadpotokamera = async (id) => {
    tmblkirim.innerHTML = `<i class="fa fa-refresh fa-spin"></i> Sedang proses ....`;
    let jwbase64 = document.getElementById("jwbase64").textContent
    var tempat = document.getElementById("filejawaban" + id);

    let namafilejawaban = document.getElementById("namafilejawaban").value;
    let mtipe = document.getElementById("mtipe").value;
    let ekstensi = mtipe.substring(mtipe.lastIndexOf('.') + 1);


    let datafom = new FormData()
    datafom.append("base64", jwbase64);
    datafom.append("mmtype", mtipe);
    datafom.append("kelas", namakelas);
    datafom.append("filename", namafilejawaban);
    datafom.append("ekstensi", ekstensi);
    resultpotogaleri.innerHTML = "";
    await fetch(urlnilai + "?action=siswauploadmedia", {
        method: 'post',
        body: datafom
    }).then(m => m.json())
        .then(k => {
            tmblkirim.innerHTML = `Poto berhasil diunggah`;
            document.getElementById("silangmodal").click();
            tempat.innerHTML = k.result;

        })
        .catch(er => {
            document.getElementById("silangmodal").click();
            tempat.innerHTML = "<div class='w3-red w3-large'>Ups, Maaf. Media gagal diunggah ke server. Jaringan Ananda sedang terjadi trafick, silakan UNGGAH ULANG (klik UPLOAD JAWABAN lagi ...) </div><br><br>Kode Error: " + er;
            // // let divhapus = document.getElementById("tomboljawaban" + id);
            // // divhapus.innerHTML = ``;
            // tampilan.innerHTML = `media gagal diunggah silakan upload ulang kode ${er}`;//`<div id="tomboljawaban${id}"><hr>Maaf, jaringan skrip 1 Ananda terjadi trafik (kode error: ${er}). Media gagal diunggah. Silakan coba lagi ya ...<br><button onclick="tombolketikjawaban('${id}')">Ketik Jawaban No ${id}</button><br><sub>atau</sub><br> <button onclick="tomboluploadjawaban('${id}')">Upload Media No ${id}</button><br><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub></div>`;

        })

}
const uploadmediagaleri = async (id) => {
    tmblkirim.innerHTML = `<i class="fa fa-refresh fa-spin"></i> Sedang proses ....`;
    let jwbase64 = document.getElementById("jwbase64").textContent
    var tempat = document.getElementById("filejawaban" + id);

    let namafilejawaban = document.getElementById("namafilejawaban").value;
    let mtipe = document.getElementById("mtipe").value;
    let ekstensi = mtipe.substring(mtipe.lastIndexOf('.') + 1);


    let datafom = new FormData()
    datafom.append("base64", jwbase64);
    datafom.append("mmtype", mtipe);
    datafom.append("kelas", namakelas);
    datafom.append("filename", namafilejawaban);
    datafom.append("ekstensi", ekstensi);
    resultpotogaleri.innerHTML = "";
    await fetch(urlnilai + "?action=siswauploadmedia", {
        method: 'post',
        body: datafom
    }).then(m => m.json())
        .then(k => {
            tmblkirim.innerHTML = `Media berhasil diunggah`;
            document.getElementById("silangmodal").click();
            tempat.innerHTML = k.result;

        })
        .catch(er => {
            document.getElementById("silangmodal").click();
            tempat.innerHTML = "<div class='w3-red w3-large'>Ups, Maaf. Media gagal diunggah ke server. Jaringan Ananda sedang terjadi trafick, silakan UNGGAH ULANG (klik UPLOAD JAWABAN lagi ...) </div><br><br>Kode Error: " + er;
            // // let divhapus = document.getElementById("tomboljawaban" + id);
            // // divhapus.innerHTML = ``;
            // tampilan.innerHTML = `media gagal diunggah silakan upload ulang kode ${er}`;//`<div id="tomboljawaban${id}"><hr>Maaf, jaringan skrip 1 Ananda terjadi trafik (kode error: ${er}). Media gagal diunggah. Silakan coba lagi ya ...<br><button onclick="tombolketikjawaban('${id}')">Ketik Jawaban No ${id}</button><br><sub>atau</sub><br> <button onclick="tomboluploadjawaban('${id}')">Upload Media No ${id}</button><br><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub></div>`;

        })
}

///////////////////////////source MATERI JS

$(document).ready(function () {
    // Timer
    (function ($) {
        $.extend({
            APP: {
                formatTimer: function (a) {
                    if (a < 10) {
                        a = '0' + a;
                    }
                    return a;
                },
                startTimer: function (dir) {
                    var a;
                    // save type
                    $.APP.dir = dir;
                    // get current date
                    $.APP.d1 = new Date();
                    switch ($.APP.state) {
                        case 'pause':
                            // resume timer
                            // get current timestamp (for calculations) and
                            // substract time difference between pause and now
                            $.APP.t1 = $.APP.d1.getTime() - $.APP.td;
                            break;
                        default:
                            // get current timestamp (for calculations)
                            $.APP.t1 = $.APP.d1.getTime();
                            // if countdown add ms based on seconds in textfield
                            if ($.APP.dir === 'cd') {
                                $.APP.t1 += parseInt($('#cd_seconds').val()) * 60000;
                            }
                            break;
                    }
                    // reset state
                    $.APP.state = 'alive';
                    $('#' + $.APP.dir + '_status').html('Durasi Waktu Masih Berjalan');
                    // start loop
                    $.APP.loopTimer();
                },
                pauseTimer: function () {
                    // save timestamp of pause
                    $.APP.dp = new Date();
                    $.APP.tp = $.APP.dp.getTime();
                    // save elapsed time (until pause)
                    $.APP.td = $.APP.tp - $.APP.t1;
                    // change button value
                    $('#' + $.APP.dir + '_start').val('Berhenti dari Jeda');
                    // set state
                    $.APP.state = 'pause';
                    $('#' + $.APP.dir + '_status').html('Jeda');
                },
                stopTimer: function () {
                    // change button value
                    $('#' + $.APP.dir + '_start').val('Mulai Lagi');
                    // set state
                    $.APP.state = 'stop';
                    $('#' + $.APP.dir + '_status').html('Selesai');

                },
                resetTimer: function () {
                    // reset display
                    $('#' + $.APP.dir + '_ms,#' + $.APP.dir + '_s,#' + $.APP.dir + '_m,#' + $.APP.dir + '_h').html('00');
                    // change button value
                    $('#' + $.APP.dir + '_start').val('Mulai Lagi!');
                    // set state
                    $.APP.state = 'reset';
                    $('#' + $.APP.dir + '_status').html('Setel ulang waktu untuk mengerjakan');
                },
                endTimer: function (callback) {
                    // change button value
                    $('#' + $.APP.dir + '_start').val('Mulai Lagi');
                    // set state
                    $.APP.state = 'end';
                    // invoke callback
                    if (typeof callback === 'function') {
                        callback();
                        // tambahan
                        let x = parseFloat(indekmaterionline.innerHTML)
                        hasilakhirelamaso(x);
                    }

                },
                loopTimer: function () {
                    var td;
                    var d2, t2;
                    var ms = 0;
                    var s = 0;
                    var m = 0;
                    var h = 0;
                    if ($.APP.state === 'alive') {
                        // get current date and convert it into 
                        // timestamp for calculations
                        d2 = new Date();
                        t2 = d2.getTime();
                        // calculate time difference between
                        // initial and current timestamp
                        if ($.APP.dir === 'sw') {
                            td = t2 - $.APP.t1;
                            // reversed if countdown
                        } else {
                            td = $.APP.t1 - t2;
                            if (td <= 0) {
                                // if time difference is 0 end countdown
                                $.APP.endTimer(function () {
                                    $.APP.resetTimer();
                                    $('#' + $.APP.dir + '_status').html('Ulangi Latihan');
                                });
                            }
                        }
                        // calculate milliseconds
                        ms = td % 1000;
                        if (ms < 1) {
                            ms = 0;
                        } else {
                            // calculate seconds
                            s = (td - ms) / 1000;
                            if (s < 1) {
                                s = 0;
                            } else {
                                // calculate minutes   
                                var m = (s - (s % 60)) / 60;
                                if (m < 1) {
                                    m = 0;
                                } else {
                                    // calculate hours
                                    var h = (m - (m % 60)) / 60;
                                    if (h < 1) {
                                        h = 0;
                                    }
                                }
                            }
                        }
                        // substract elapsed minutes & hours
                        ms = Math.round(ms / 100);
                        s = s - (m * 60);
                        m = m - (h * 60);
                        // update display
                        $('#' + $.APP.dir + '_ms').html($.APP.formatTimer(ms));
                        $('#' + $.APP.dir + '_s').html($.APP.formatTimer(s));
                        $('#' + $.APP.dir + '_m').html($.APP.formatTimer(m));
                        $('#' + $.APP.dir + '_h').html($.APP.formatTimer(h));
                        // loop
                        $.APP.t = setTimeout($.APP.loopTimer, 1);
                    } else {
                        // kill loop
                        clearTimeout($.APP.t);
                        return true;

                    }

                }

            }

        });


        //$('#cd_start,#timermulai').live('click', function() { //LAMASO ASLI
        $('#cd_start').live('click', function () { //LAMASO ASLI
            $.APP.startTimer('cd');

        });
        $('#cd_stop,#selesaingambang').live('click', function () { //LAMASO ASLI
            //$.APP.stopTimer();
            $.APP.resetTimer();
            let x = parseFloat(indekmaterionline.innerHTML)
            hasilakhirelamaso(x);
            $('html,body').animate({
                scrollTop: $("#hasilakhir").offset().top
            }, 1000);

        });
        $('#cd_reset').live('click', function () {
            $.APP.resetTimer();
        });
        $('#cd_pause').live('click', function () {
            $.APP.pauseTimer();
        });

    })(jQuery);

})






function brkline(teks) { //coba
    var tek = teks.split("\r\n"); //cari sKetiap ganti baris;
    var inn = "";
    var indexpotojawaban = 0;
    var kodeganti = ["_JUDUL_", "_PECAHAN BIASA_"];

    //   var keypg = document.getElementById("keypg");
    //   if (keypg == null) {
    //       var scrippg = document.createElement("script");
    //       scrippg.setAttribute("id", "keypg");
    //       scrippg.innerHTML = "var keybase=''";
    //       tttkeybase.innerHTML = "";

    //       document.body.appendChild(scrippg);

    //   } else {
    //       keypg.innerHTML = "var keybase=''";
    //       tttkeybase.innerHTML = "";
    //   }
    //////////////////////////////////////////////////////////////
    if (localStorage.hasOwnProperty("keybase")) {
        localStorage.removeItem("keybase")
    }
    if (localStorage.hasOwnProperty("kuncikd")) {
        localStorage.removeItem("kuncikd")
    }

    for (x = 0; x < tek.length; x++) {
        var asal = tek[x]; // dalam satu baris ini, misal baris pertama:
        var cJudul = jumlahdobel(asal, "_JUDUL_");
        var cGambar = jumlahdobel(asal, "_GAMBAR_");
        var cPecBiasa = jumlahdobel(asal, "_PECAHAN-BIASA_");
        var cPecCamp = jumlahdobel(asal, "_PECAHAN-CAMPURAN_");


        //inn += "ke-"+ x +" = " + asal + "<hr style='border-bottom:1px solid red'/>";
        //inn += "ke-"+ x + " = JUDUL = " + cJudul +", GAMBAR = " + cGambar +", Pecahan Biasa = " + cPecBiasa +", Pecahan Campuran = " + cPecCamp + "<hr style='border-bottom:1px solid blue'/>";
        var katajadi = "";

        if (asal.indexOf("_JUDUL_") > -1) {
            var hJudul;
            var arjud = asal.split("_JUDUL_");
            var katakonversi;
            for (jd in arjud) {
                if (jd > 0) {
                    katakonversi = katajadireplace(arjud[jd]);
                    //hJudul = "<h4 style='background-color:darkslategrey;color:white;padding:1px'>" + arjud[jd]+ "</h4>";
                    //hJudul = "<h4 style='background-color:darkslategrey;color:white;padding:1px'>" + katakonversi + "</h4>";
                    hJudul = "<h4 class='w3-card-4 w3-blue-grey w3-center w3-round-xxlarge'>" + katakonversi + "</h4>";
                    //katajadi += hJudul ;
                    katajadi += hJudul + "<br/>";
                }
            }
        } else if (asal.indexOf("_ESSAY-NO_") > -1) {
            var esayno = asal.split("_ESSAY-NO_")[0];
            var tekspisah = asal.replace("_ESSAY-NO_", "").split(" ");
            katajadi += "<div class='w3-badge w3-aqua w3-left'>" + tekspisah[0] + "</div><ol style='list-style-type:none' start='" + tekspisah[0] + "'  class='w3-padding w3-card-4'><li id='essay" + tekspisah[0] + "' class='soalessay' style='border-bottom:1px solid blue'><div id='pertanyaanessay_" + tekspisah[0] + "'>";
            for (es in tekspisah) {
                if (es > 0) {
                    katajadi += katajadireplace(tekspisah[es]);
                }
            }


            katajadi += "</div><div id='tomboljawaban" + tekspisah[0] + "'><hr/></div>"
            katajadi += "<br/></li></ol>"
        } else if (asal.indexOf("_START-TABEL_") > -1) {
            katajadi += asal.replace("_START-TABEL_", "<div style='overflow-x:auto'><table class='versi-table'>");
            //katajadi += asal.replace("_START-TABEL_","<table class='versi-table'>");
        } else if (asal.indexOf("_START-TABEL-OPSI_") > -1) {
            katajadi += asal.replace("_START-TABEL-OPSI_", "<hr style='border-top:1px solid olive'/><div style='overflow-x:auto'><table class='versi-table'>");
            //katajadi += asal.replace("_START-TABEL_","<table class='versi-table'>");
        } else if (asal.indexOf("<|HEADER|>") > -1) {
            katajadi += "<tr>";
            var tekarray = asal.split("<|HEADER|>");
            var katakonversi;
            for (th in tekarray) {
                katakonversi = katajadireplace(tekarray[th]);
                //katajadi +="<th>" + tekarray[th] +"</th>";
                katajadi += "<th>" + katakonversi + "</th>";
            }
            katajadi += "</tr>"
        } else if (asal.indexOf("<|>") > -1) {
            katajadi += "<tr>";
            var tekarray = asal.split("<|>");
            var katakonversi;
            for (td in tekarray) {
                katakonversi = katajadireplace(tekarray[td]);
                katajadi += "<td>" + katakonversi + "</td>"
            }
            katajadi += "</tr>"
            //inn +=  "<table class='versi-table'>";
        } else if (asal.indexOf("_SELESAI-TABEL_") > -1) {
            katajadi += "</table></div><br/>";
            //katajadi +=  "</table><br/>";

        } else if (asal.indexOf("_SELESAI-TABEL-OPSI_") > -1) {
            //katajadi +=  "</table></div><br/>";
            katajadi += "</table><br/></li></ol>";

        } else if (asal.indexOf("_PG_") > -1) {
            var Q_PG = "";
            var teks = asal.replace("_PG_", ""); // return = 1 teks pertanyaaan bla bla bla
            var arrTeks = teks.split(" ");
            nosoal = arrTeks[0];
            Q_PG += "<div class='w3-badge w3-left'>" + nosoal + "</div><ol style='list-style-type:decimal' start='" + nosoal + "' class='w3-padding w3-card-4'><li id='soalke-" + nosoal + "' class='calcnosoal' style='list-style-type:none'>";
            var katakonversi;
            for (ss in arrTeks) {
                if (ss > 0) {
                    katakonversi = katajadireplace(arrTeks[ss]);
                    Q_PG += katakonversi;
                }
            }
            //katajadi = Q_PG + "<hr style='border-top:1px solid olive'/>";
            katajadi = Q_PG; //+ "<hr style='border-top:1px solid olive'/>";

        } else if (asal.indexOf("_OPSI-PG_") > -1) {
            var opsipg = "";
            var arpgg = asal.replace("_OPSI-PG_", ""); // hasilnya: 1A teks pertanyaan bla bla bla
            var arpg = arpgg.split(" "); //hasilnya: 0=1A 1=teks 2=pertanyaan ... dst.
            var idopsi = arpg[0]; // hasilnya: 1A
            //var abjad = idopsi.slice(1, 2); // hasilnya A
            //var nosoal = idopsi.slice(0, 1); // hasilnya 1
            var nosoal = idopsi.match(/(\d+)/)[0]; //parseInt(idopsi);
            var abjad = idopsi.replace(nosoal, "");

            if (abjad === "A") {
                opsipg += "<hr style='border-top:1px solid olive'/>";
                opsipg += "<ol style='list-style-type:upper-alpha;margin:5px 5px 0px 20px;padding:0' ><li><input class='calc' type='radio' style='display:none' name='soal" + nosoal + "' id='" + idopsi + "'/><label class='opsi' for='" + idopsi + "'>"; // Khusus opsi A, ada elemen OL lalu dilanjut teksnya
            } else {
                opsipg += "<li><input class='calc' type='radio' style='display:none' name='soal" + nosoal + "' id='" + idopsi + "'/><label class='opsi' for='" + idopsi + "'>"; // selain opsi A, dilanjut.  Tapi tanpa element OL
            }
            var katakonversi;
            for (tt in arpg) { //hasilnya: 0=1A 1=teks 2=pertanyaan ... dst.
                if (tt > 0) { // hindari array 0=1A
                    katakonversi = katajadireplace(arpg[tt]);
                    //hJudul = "<h4 style='background-color:darkslategrey;color:white;padding:1px'>" + arjud[jd]+ "</h4>";
                    opsipg += katakonversi
                }
            }
            if (abjad === "D") {
                opsipg += "</label></li></ol></li></ol>";
            } else {
                opsipg += "</label></li>";
            }


            katajadi += opsipg;

        } else if (asal.indexOf("_OPSI-PG-C_") > -1) {
            var opsipg = "";
            var arpgg = asal.replace("_OPSI-PG-C_", ""); // hasilnya: 1A teks pertanyaan bla bla bla
            var arpg = arpgg.split(" "); //hasilnya: 0=1A 1=teks 2=pertanyaan ... dst.
            var idopsi = arpg[0]; // hasilnya: 1A
            //var abjad = idopsi.slice(1, 2); // hasilnya A
            //var nosoal = idopsi.slice(0, 1); // hasilnya 1
            var nosoal = idopsi.match(/(\d+)/)[0]; //parseInt(idopsi);
            var abjad = idopsi.replace(nosoal, "");

            if (abjad === "A") {
                opsipg += "<hr style='border-top:1px solid olive'/>";
                opsipg += "<ol style='list-style-type:upper-alpha;margin:5px 5px 0px 20px;padding:0' ><li><input class='calc' type='radio' style='display:none' name='soal" + nosoal + "' id='" + idopsi + "'/><label class='opsi' for='" + idopsi + "'>"; // Khusus opsi A, ada elemen OL lalu dilanjut teksnya
            } else {
                opsipg += "<li><input class='calc' type='radio' style='display:none' name='soal" + nosoal + "' id='" + idopsi + "'/><label class='opsi' for='" + idopsi + "'>"; // selain opsi A, dilanjut.  Tapi tanpa element OL
            }
            var katakonversi;
            for (tt in arpg) { //hasilnya: 0=1A 1=teks 2=pertanyaan ... dst.
                if (tt > 0) { // hindari array 0=1A
                    katakonversi = katajadireplace(arpg[tt]);
                    //hJudul = "<h4 style='background-color:darkslategrey;color:white;padding:1px'>" + arjud[jd]+ "</h4>";
                    opsipg += katakonversi
                }
            }
            if (abjad === "C") {
                opsipg += "</label></li></ol></li></ol>";
            } else {
                opsipg += "</label></li>";
            }


            katajadi += opsipg;

        } else if (asal.indexOf("_POTO-JAWABAN-TUGAS_") > -1) {
            var tekssplit = asal.replace("_POTO-JAWABAN-TUGAS_", "").split(" ")[0]; // return: 1/2/3
            var mediaessay = "";
            var bnyk = tekssplit.split("/");
            for (de in bnyk) {
                mediaessay += bnyk[de] + ", ";
            }
            katajadi += "<div style='background-color:#ffcdc9;padding:10px'>Upload Media(Poto, audio, video, pdf, word/txt, dll) jawaban Tugas No";
            katajadi += " " + mediaessay + " dengan menguploadnya di sini: <br/><br/>";
            katajadi += "<label style='border:1px solid black;background-color:#eee;padding:5px;border-radius:5px' for='iduploadpototugas" + indexpotojawaban + "' id='label" + indexpotojawaban + "'><i class='fa fa-camera'></i> Upload Jawaban</label><br/><br/>";
            katajadi += "<div class='potoessay' id='" + tekssplit + "' style='overflow-x:auto'><div id='mediapreview" + indexpotojawaban + "'>";
            katajadi += "<img src='/img/lamaso.webp'  style='width:145px;margin:auto;border:1px solid blue'/>";
            katajadi += "</div></div>";

            katajadi += "<input type='file' id='iduploadpototugas" + indexpotojawaban + "' onchange='uploadpototugas(" + indexpotojawaban + ")' style='display:none'/><div  id='filejawaban" + indexpotojawaban + "' class='jawabanfile' style='display:none' ></div>"


            katajadi += "</div>";

            indexpotojawaban += 1;


        } else if (asal.indexOf("_KUNCI-PG_") > -1) {
            //REPLACE DULU = misal: _KUNCI-PG_1A, 2B, 3C<kalo adaspasi>
            var tekskunci = asal.replace("_KUNCI-PG_", "").replace(/\s+/g, "").split(","); // hasilnya: 1A,2B,3C
            var arrkunci = [];
            for (o = 0; o < tekskunci.length; o++) {
                arrkunci.push(tekskunci[o])
            }
            basekunci = window.btoa(arrkunci);
            //basekunci = arrkunci;//window.btoa(arrkunci);
            localStorage.setItem("keybase", basekunci)
            //localStorage.setItem("artikeybase", window.atob(basekunci))

            //   var keypg = document.getElementById("keypg");
            //     keypg.setAttribute("style", "display:none")

            //   //var teksscript = document.createTextNode("var keybase='"+basekunci+"'");
            //   //	keypg.appendChild(teksscript);
            //   keypg.innerHTML = "var keybase='" + basekunci + "'";
            //   tttkeybase.innerHTML = basekunci;

        } else if (asal.indexOf("_KUNCI-KD_") > -1) {
            //REPLACE DULU = misal: _KUNCI-PG_1A, 2B, 3C<kalo adaspasi>
            var tekskunci = asal.replace("_KUNCI-KD_", "").replace(/\s+/g, "").split("<||>"); //.split(":");
            let ar = []
            let ob = {};
            for (i = 0; i < tekskunci.length; i++) {

                // ob[tekskunci[i].split(":")[0]] = tekskunci[i].split(":")[1].split(",");
                ob[tekskunci[i].split(":")[0]] = tekskunci[i].split(":")[1].replace("[", "").replace("]", "").split(",");
                ar.push(ob)
            }
            localStorage.setItem("kuncikd", JSON.stringify(ob)); // ---> sudah objek array



        } else {
            var katakonversi = katajadireplace(asal);
            katajadi += katakonversi + "<br/>";

        }
        inn += katajadi; //+ "&lt;br/&gt;" ;
    }


    return inn
}

function katajadireplace(asal) {
    var splitTeks = asal.split(" ");
    var ccJudul = 1;
    var brsTabel = 0;
    var katajadi = "";
    for (i = 0; i < splitTeks.length; i++) {
        //jika judul:
        if (splitTeks[i].indexOf("_GAMBAR_") > -1) {
            katajadi += "<img src='" + splitTeks[i].replace("_GAMBAR_", "") + "' style='width:50%;border:1px solid red;border-radius:5px' alt='tidak muncul, link Anda salah atau ada spasi setelah kode'/>";
        } else if (splitTeks[i].indexOf("_GAMBAR-DRIVE_") > -1) {
            var hilangkankode = splitTeks[i].replace("_GAMBAR-DRIVE_", "");
            var hilangkanprefik = hilangkankode.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=");
            var hilangkansufik = hilangkanprefik.replace("/view", "");
            var hilangkansufike = hilangkansufik.replace("?usp=drivesdk", "");

            katajadi += "<img src='" + hilangkansufike + "' style='width:50%;border:1px solid red;border-radius:5px' alt='tidak muncul, link Anda salah atau ada spasi setelah kode, contoh link:https://drive.google.com/file/d/1J0NUwTrxFBZ0JZBCzVTlsDFeXbn3mIci/view'/> ";
        } else if (splitTeks[i].indexOf("_PECAHAN-BIASA_") > -1) {
            var a = splitTeks[i].replace("_PECAHAN-BIASA_", "").split("/")[0];
            var b = splitTeks[i].replace("_PECAHAN-BIASA_", "").split("/")[1];
            katajadi += "<img src='https://chart.apis.google.com/chart?cht=tx&chl=%5Cfrac%7B" + a + "%7D%7B" + b + "%7D%20&chf=bg%2Cs%2CFFFFFF100&chco=000000' />"


        } else if (splitTeks[i].indexOf("_PECAHAN-CAMPURAN_") > -1) {
            var a = splitTeks[i].replace("_PECAHAN-CAMPURAN_", "").split("/")[0];
            var b = splitTeks[i].replace("_PECAHAN-CAMPURAN_", "").split("/")[1];
            var c = splitTeks[i].replace("_PECAHAN-CAMPURAN_", "").split("/")[2];
            katajadi += "<img src='https://chart.apis.google.com/chart?cht=tx&chl=" + a + "%5Cfrac%7B" + b + "%7D%7B" + c + "%7D%20&chf=bg%2Cs%2CFFFFFF80&chco=000000' />"


        } else if (splitTeks[i].indexOf("_AKAR-KUADRAT_") > -1) {
            var a = splitTeks[i].replace("_AKAR-KUADRAT_", "");

            katajadi += "<img src='https://chart.apis.google.com/chart?cht=tx&chl=%5Csqrt%7B%20" + a + "%20%7D%20&chf=bg%2Cs%2CFFFFFF80&chco=000000' />"


        } else if (splitTeks[i].indexOf("_AKAR-TIGA_") > -1) {
            var a = splitTeks[i].replace("_AKAR-TIGA_", "");
            katajadi += " <img src='https://chart.apis.google.com/chart?cht=tx&chl=%5Csqrt%5B3%5D%7B%20" + a + "%20%7D%20&chf=bg%2Cs%2CFFFFFF80&chco=000000' /> "


        } else if (splitTeks[i].indexOf("_PANGKAT_") > -1) {
            var a = splitTeks[i].replace("_PANGKAT_", "").split("/")[0];
            var b = splitTeks[i].replace("_PANGKAT_", "").split("/")[1];
            katajadi += " <img src='https://chart.apis.google.com/chart?cht=tx&chl=%5C" + a + "^" + b + "%20&chf=bg%2Cs%2CFFFFFF80&chco=000000' /> "


        } else if (splitTeks[i].indexOf("_PANGKAT-HURUF_") > -1) {
            var a = splitTeks[i].replace("_PANGKAT-HURUF_", "").split("/")[0];
            var b = splitTeks[i].replace("_PANGKAT-HURUF_", "").split("/")[1];
            //katajadi += " <img src='https://chart.apis.google.com/chart?cht=tx&chl=%5C" + a + "^" + b + "%20&chf=bg%2Cs%2CFFFFFF80&chco=000000' /> "
            katajadi += a + "<sup>" + b + "</sup>";

        } else if (splitTeks[i].indexOf("_EQUATION-LAINNYA_") > -1) {
            var a = splitTeks[i].replace("_EQUATION-LAINNYA_", "");
            var b = decodeURIComponent(a);
            //var c = decodeURIComponent(b);
            katajadi += " <img src='https://chart.apis.google.com/chart?cht=tx&chl=" + b + "%20&chf=bg%2Cs%2CFFFFFF80&chco=000000' /> "


        } else if (splitTeks[i].indexOf("_YOUTUBE_") > -1) {
            var linkyoutube, konv, konv2, konv3;
            konv = splitTeks[i].replace("_YOUTUBE_", "<br/><div class='containerbaru w3-center'><iframe class='responsive-iframebaru ' src='")
            konv2 = konv.replace("https://youtu.be/", "https://www.youtube.com/embed/"); // kalo link awalnya https://youtu.be/ 
            konv3 = konv2.replace("watch?v=", "embed/"); // jika diambil dari https://www.youtube.com/
            linkyoutube = konv3 + "' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div><br/>";

            katajadi += linkyoutube;

        } else if (splitTeks[i].indexOf("_OPSI-SEL_") > -1) {
            var splitteks = splitTeks[i].replace("_OPSI-SEL_", "").split(" ");
            var id = splitteks[0]; //4A

            //var abjad = id.slice(1, 2); //B
            var id = splitteks[0].replace(/\s+/g, ""); //4A

            var abjad = (id.length == 2) ? id.slice(1, 2) : id.slice(2, 3); //B
            var nosoal = id.match(/(\d+)/)[0]; // id.slice(0, 1); //nosoal 4
            var innteks = "<input class='calc' type='radio' style='display:none' name='soal" + nosoal + "' id='" + id + "'/><label class='opsi' for='" + id + "'>" + abjad + "</label>"

            katajadi += innteks;
        } else if (splitTeks[i].indexOf("_PHI_") > -1) {
            katajadi += `<img src="https://chart.apis.google.com/chart?cht=tx&amp;chl=%5Cpi%20&amp;chf=bg%2Cs%2CFFFFFF100&amp;chco=000000">`
        } else if (splitTeks[i].indexOf('display:none') > -1) {
            katajadi += splitTeks[i].replace("display:none", "display:block");

        } else if (splitTeks[i].indexOf('tombolkirimnilaielamaso()') > -1) {
            katajadi += splitTeks[i].replace("tombolkirimnilaielamaso()", "alert('Maaf, tombol dinonaktirkan')");

        } else {
            katajadi += splitTeks[i] + " ";

        }
    }

    return katajadi

}

function fn_map(s) {

    var paragrafsiap = "";
    if (s.indexOf("_JUDUL_") > -1) {
        paragrafsiap += "<h2 style='background-color:black;color:white;padding:1px'>" + s.replace("_JUDUL_", "") + "</h2>"
    } else {
        paragrafsiap += s
    }
    return paragrafsiap
}

function jumlahdobel(arrTeks, txt) {
    var count = 0;
    var crtArr = arrTeks.split(" ");
    for (i in crtArr) {
        if (crtArr[i].indexOf(txt) > -1) {
            count += 1
        }
    }

    return count
}

function gantiapaaja(teks, cariapa, gantiawal, gantiakhir) {
    var split = teks.split(cariapa);
    var teksganti = "";

    for (x = 1; x < split.length; x++) {
        if (split[x].length > 0) {
            teksganti += gantiawal + split[x] + gantiakhir;
        }; //.split(" ")[0] +"</h3>";

    }
    return teksganti
}

function tambahtombolisijawaban() {
    var elEssay = document.getElementsByClassName("soalessay")
    if (elEssay.length !== 0) {
        for (i = 0; i < elEssay.length; i++) {
            var idEl = elEssay[i].getAttribute("id");
            var inidEl = idEl.replace("essay", "");
            var tempattombol = document.getElementById("tomboljawaban" + inidEl);
            var tombolsatu = document.createElement("button");
            tombolsatu.setAttribute("onclick", "tombolketikjawaban('" + inidEl + "')");
            var tekstombolsatu = document.createTextNode("Ketik Jawaban No " + inidEl);
            tombolsatu.appendChild(tekstombolsatu);
            tempattombol.appendChild(tombolsatu);
            tempattombol.innerHTML += "<br/><sub>atau</sub></br/> "
            var tomboldua = document.createElement("button");
            tomboldua.setAttribute("onclick", "tomboluploadjawaban('" + inidEl + "')");
            var tekstomboldua = document.createTextNode("Upload Media No " + inidEl);
            tomboldua.appendChild(tekstomboldua);
            tempattombol.appendChild(tomboldua);
            tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>"

        }
    }

}


function KoleksiFormSiswa(form) {
    //--------- mendefinisikan beberapa element
    var koleksielement = form.elements;
    //--------- element yang digunakan untuk element spam
    var koleksispam;


    var bidangdata = Object.keys(koleksielement)
        .filter(function (k) {
            if (koleksielement[k].name === "koleksispam") {
                koleksispam = koleksielement[k].value;
                return false;
            }
            return true;
        })
        .map(function (k) {
            if (koleksielement[k].name !== undefined) {
                return koleksielement[k].name;
            } else if (koleksielement[k].length > 0) {
                return koleksielement[k].item(0).name;
            }
        }).filter(function (item, pos, self) {
            return self.indexOf(item) == pos && item;
        });
    // console.log(bidangdata);
    var Dataform = {};
    bidangdata.forEach(function (name) {
        var element = koleksielement[name];
        // jika datanya memiliki satu nilai (value), biasanya berupa teks dalam value.
        Dataform[name] = element.value;

        // ketika data value-nya bukan teks, seperti value pada tag input type radio, atau tag select, maka dibuatkan array lagi dengan fungsi tambah array [.push('new Array')
        if (element.length) {
            var data = [];
            for (var i = 0; i < element.length; i++) {
                var item = element.item(i);
                if (item.checked || item.selected) {
                    data.push(item.value);
                }
            }
            // console.log(data);
            Dataform[name] = data.join(', ');
        }
    });


    return {
        data: Dataform
    }; //, koleksispam: koleksispam};
}


function tombolketikjawaban(id) {
    //alert("Tombol ketik Jawbaan No " + id)
    var tempatnya = document.getElementById("tomboljawaban" + id)
    tempatnya.innerHTML = "";
    var teksarea = document.createElement("textarea");
    teksarea.setAttribute("class", "filejawaban");
    teksarea.setAttribute("id", "filejawaban" + id);
    teksarea.setAttribute("cols", "30");
    teksarea.setAttribute("rows", "10");
    teksarea.setAttribute("placeholder", "Silakan ketik jawaban essay untuk No. Soal " + id);
    tempatnya.appendChild(teksarea);
    tempatnya.innerHTML += "<br/>Ganti dengan mengupload media:";
    var tombollain = document.createElement("button")
    tombollain.setAttribute("onclick", "tomboluploadjawaban('" + id + "')");
    tombollain.innerHTML = "Upload Media No " + id
    tempatnya.appendChild(tombollain);
    tempatnya.innerHTML += "<sub> dengan memilih cara lain, jawaban yang sudah diketik akan hilang dan diganti dengan jawaban berupa gambar/media yang diunggah</sub>"


}

function tombolketikjawaban2(id) {
    //alert("Tombol ketik Jawbaan No " + id)
    var tempatnya = document.getElementById("tomboljawaban" + id)
    tempatnya.innerHTML = "";
    var teksarea = document.createElement("textarea");
    teksarea.setAttribute("class", "filejawaban");
    teksarea.setAttribute("id", "filejawaban" + id);
    teksarea.setAttribute("cols", "30");
    teksarea.setAttribute("rows", "10");
    teksarea.setAttribute("placeholder", "Silakan ketik jawaban essay untuk No. Soal " + id);
    tempatnya.appendChild(teksarea);
    tempatnya.innerHTML += "<br/>Ganti dengan mengupload media:";
    var tombollain = document.createElement("button")
    tombollain.setAttribute("onclick", "tomboluploadjawaban2('" + id + "')");
    tombollain.innerHTML = "Upload Media No " + id
    tempatnya.appendChild(tombollain);
    tempatnya.innerHTML += "<sub> dengan memilih cara lain, jawaban yang sudah diketik akan hilang dan diganti dengan jawaban berupa gambar/media yang diunggah</sub>"


}


function tomboluploadjawaban(id) {
    //alert("Tombol Upload Jawbaan No " + id)
    var tempatnya = document.getElementById("tomboljawaban" + id);
    var katajadi = "";
    tempatnya.innerHTML = "";
    //	var divbackground = document.createElement("div");
    //		divbackground.setAttribute("style","background-color:#ffcdc9;padding:10px");
    //		divbackground.innerHTML = "Upload Media(Poto, audio, video, pdf, word/txt, dll) jawaban essay No " + id + " dengan menguploadnya di sini: <br/><br/>";
    //			var labelupload = document.createElement("label");
    //				labelupload.setAttribute("style", "border:1px solid black;background-color:#eee;padding:5px;border-radius:5px");
    //				labelupload.setAttribute("for",

    katajadi += "<div style='background-color:#ffcdc9;padding:10px'>Upload Media(Poto, audio, video, pdf, word/txt, dll) jawaban essay No";
    katajadi += " " + id + " dengan menguploadnya di sini: <br/><br/>";
    katajadi += "<label style='border:1px solid black;background-color:#eee;padding:5px;border-radius:5px' for='iduploadpotoessay" + id + "' id='label" + id + "'><i class='fa fa-camera'></i> Upload Jawaban</label><br/><br/>";
    katajadi += "<div id='filejawaban" + id + "' class='filejawaban' style='overflow-x:auto'>";
    katajadi += "<img src='/img/lamaso.webp'  style='width:145px;margin:auto;border:1px solid blue'/>";
    katajadi += "</div>";

    //katajadi += `<input type='file' id='iduploadpotoessay${id}' onchange='uploadpotoessay("${id}")' style='display:none'/>`;//"<input type='file' id='iduploadpotoessay" + id + "' onchange='uploadpotoessay(" + id + ")' style='display:none'/>"; //<div  id='filejawaban"+indexpotojawaban+"' class='jawabanfile' style='display:none' ></div>"
    katajadi += `<input id='iduploadpotoessay${id}' onclick='uploadpotoessay("${id}")' style='display:none'/>`; //"<input type='file' id='iduploadpotoessay" + id + "' onchange='uploadpotoessay(" + id + ")' style='display:none'/>"; //<div  id='filejawaban"+indexpotojawaban+"' class='jawabanfile' style='display:none' ></div>"
    katajadi += "</div>";
    //-----------------------------
    katajadi += "<br/>Ganti dengan mengetik jawaban:";
    katajadi += `<button onclick='tombolketikjawaban("${id}")'>Ketik Jawaban No. ${id}</button>`; //"<button onclick='tombolketikjawaban(" + id + ")'>Ketik Jawaban No. " + id + "</button>";
    katajadi += "<sub> dengan memilih cara lain, jawaban yang sudah  diupload akan hilang dan diganti dengan jawaban berupa ketikan/tulisan</sub>"
    //-----------------------------
    tempatnya.innerHTML = katajadi;
}


function tomboluploadjawaban2(id) {
    //alert("Tombol Upload Jawbaan No " + id)
    var tempatnya = document.getElementById("tomboljawaban" + id);
    var katajadi = "";
    tempatnya.innerHTML = "";


    katajadi += "<div style='background-color:#ffcdc9;padding:10px'>Upload Media(Poto, audio, video, pdf, word/txt, dll) jawaban essay No";
    katajadi += " " + id + " dengan menguploadnya di sini: <br/><br/>";
    katajadi += "<label style='border:1px solid black;background-color:#eee;padding:5px;border-radius:5px' for='iduploadpotoessay" + id + "' id='label" + id + "'><i class='fa fa-camera'></i> Upload Jawaban</label><br/><br/>";
    katajadi += "<div id='filejawaban" + id + "' class='filejawaban' style='overflow-x:auto'>";
    katajadi += "<img src='/img/lamaso.webp'  style='width:145px;margin:auto;border:1px solid blue'/>";
    katajadi += "</div>";

    katajadi += `<input type='file' id='iduploadpotoessay${id}' onchange='uploadpotoessay2("${id}")' style='display:none'/>"`; //<div  id='filejawaban"+indexpotojawaban+"' class='jawabanfile' style='display:none' ></div>"
    katajadi += "</div>";
    //-----------------------------
    katajadi += "<br/>Ganti dengan mengetik jawaban:"
    katajadi += `<button onclick='tombolketikjawaban2("${id}")'>Ketik Jawaban No. ${id}</button>`
    katajadi += '<sub> dengan memilih cara lain, jawaban yang sudah  diupload akan hilang dan diganti dengan jawaban berupa ketikan/tulisan</sub>'
    //-----------------------------
    tempatnya.innerHTML = katajadi;
}


function uploadpotoessay2(id) { //fungsi dipindahkan ke uploadmedia.js
    var item = document.getElementById("iduploadpotoessay" + id).files[0];
    var tempat = document.getElementById("filejawaban" + id);
    tempat.innerHTML = ""
    var ofReader = new FileReader();
    ofReader.readAsDataURL(item);
    var resize_width = "150"
    ofReader.onload = function (e) {
        // --- convert image ====
        ofReader.size = item.size; //get the image's size


        var src = e.target.result;
        document.getElementById("filejawaban" + id).innerHTML = src;
        var base64 = e.target.result.replace(/^.*,/, '');
        var typeasal = e.target.result.match(/^.*(?=;)/)[0];
        var typenyaaja = typeasal.replace("data:", "");
        if (typenyaaja.indexOf("image") > -1) {
            tempat.innerHTML = "<img id='image" + id + "' src='" + src + "' style='width:500px; border:1px solid blue; padding:5px; border-radius:10px'/><br/>tipe gambar: " + typenyaaja.split("/")[1];
        } else if (typenyaaja.indexOf("video") > -1) {
            tempat.innerHTML = "<video id='myvideo" + id + "' width='350' height='200'  poster='/img/lamaso.webp' controls><source src='" + src + "' type='" + typenyaaja + "' />Browser Anda tidak mendukung/format video tidak mendukung</video>";
        } else if (typenyaaja.indexOf("audio") > -1) {
            tempat.innerHTML = "<video id='myaudio" + id + "' width='350' height='200'  poster='/img/lamaso.webp' controls><source src='" + src + "' type='" + typenyaaja + "' />Browser Anda tidak mendukung/format video/audio tidak mendukung</video>";
        } else if (typenyaaja.indexOf("wordprocessingml") > -1) {
            tempat.innerHTML = "<i id='taktersedia_" + id + "' class='fa fa-file-word-o w3-xxxlarge' style='font-size:72px'></i><br/> Pratinjau tidak terrsedia ";
            //var idac = id +" "+ src;
            //panci(idac);

        } else if (typenyaaja.indexOf("text") > -1) {
            tempat.innerHTML = "<iframe id='myiframe" + id + "' src='" + src + "' type='" + typenyaaja + "' width='98%' height='400'></iframe><br/>tipe file: " + typenyaaja.split("/")[1];
        } else if (typenyaaja.indexOf("pdf") > -1) {
            tempat.innerHTML = "<iframe id='pdfke" + id + "' src='" + src + "' type='" + typenyaaja + "' width='98%' height='400'></iframe><br/>tipe file: " + typenyaaja.split("/")[1];
        } else {
            tempat.innerHTML = "<i id='takdikenal_" + id + "'  class='fa fa-file-o w3-xxxlarge' style='font-size:72px'></i><br/> File Tidak dikenal <br/>tipe file: " + typenyaaja.split("/")[1];;
        }
    }

}


function waktusekarang() {

    var d = new Date();
    var n = addZero(d.getDate());
    var y = d.getFullYear();
    var m = addZero(d.getMonth() + 1);
    var j = addZero(d.getHours());
    var mnt = addZero(d.getMinutes());
    var dtk = addZero(d.getSeconds());
    var str = "Tgl " + n + "/" + m + "/" + y + " Pkl. " + j + ":" + mnt + ":" + dtk;
    return str
}


function ceknilai(dlo) {
    //
    let a = new Date();
    let b = a.getDate();
    let c = a.getMonth() + 1;
    let d = a.getFullYear()
    let constidok = dlo.crtToken;//addZero(b) + "" + addZero(c) + "" + d;


    tempatinputpilihanganda.innerHTML = "Nama Sekolah: <input name='idsekolah' id='kirimidsekolah' type='text' value='" + dlo.idSekolah + "'/><br/>";
    tempatinputpilihanganda.innerHTML += "emailguru: <input name='emailguru' id='emailguru' type='text' value='" + surel + "'/><br/>";
    tempatinputpilihanganda.innerHTML += "Nama Kelas : <input name='idkelas' id='kirimidkelas' type='text' value='" + namakelas + "'/><br/>";
    tempatinputpilihanganda.innerHTML += "Mapel : <input name='idmapel' id='kirimidmapel' type='text' value='" + dlo.idmapel + "'/><br/>";
    tempatinputpilihanganda.innerHTML += "Token : <input name='idtoken' id='kirimidtoken' type='text' value='" + dlo.idtoken + "'/><br/>";
    tempatinputpilihanganda.innerHTML += "jenistagihan : <input name='jenistagihan' id='kirimjenistagihan' type='text' value='" + dlo.jenistagihan + "'/><br/>";
    tempatinputpilihanganda.innerHTML += "kodeunik : <input name='kodeunik' id='kirimkodeunik' type='text' value='" + dlo.jenistagihan + "_" + constidok + "'/><br/>";

    tempatinputpilihanganda.innerHTML += "crtToken : <input name='crtToken' id='kirimcrtToken' type='text' value='" + constidok + "'/><br/>";
    tempatinputpilihanganda.innerHTML += "Nama : <input name='namasiswa' id='kirimnamasiswa' type='text' value='" + namasiswa + "'/><br/>";
    tempatinputpilihanganda.innerHTML += "NIlai PG : <input name='nilaiPG' id='kirimnilaiPG' type='text' value='" + nilaiPGku.innerHTML + "'/><br/>";

    var jumlahsoal = document.getElementsByClassName("calcnosoal");
    var jumlahopsipg = document.getElementsByClassName("calc");
    var kuncijawaban = window.atob(localStorage.getItem("keybase")).split(",");
    var koleksiceklis = [];
    tempatinputpilihanganda.innerHTML += "Data Pilihan Ganda:<br/>"
    for (var i = 0; i < jumlahopsipg.length; i++) {
        if (jumlahopsipg[i].checked) {
            var idopsi = jumlahopsipg[i].getAttribute("id").replace(/\s+/g, "");
            koleksiceklis.push(idopsi)
        }
    }
    //koleksiceklis = kuncijawaban.replace("/\s+/g","").split(",").join("=");
    //cektagihan.innerHTML = koleksiceklis.join("<br/>");
    //cektagihan.innerHTML +="<hr/>" + kuncijawaban ; //.split(",")
    //cektagihan.innerHTML  += "<hr/> Ini hasil koreksinya:<br/>";
    for (j = 0; j < koleksiceklis.length; j++) {
        //cektagihan.innerHTML += koleksiceklis[j] +" = " + PGBenar(kuncijawaban, koleksiceklis[j]) +"<br/>"
        tempatinputpilihanganda.innerHTML += "No. " + parseInt(koleksiceklis[j]) + " <input type='text' name='PG_" + parseInt(koleksiceklis[j]) + "' value='" + koleksiceklis[j].replace(parseInt(koleksiceklis[j]), "") + "'/><br/>"
    }

    for (k = 0; k < koleksiceklis.length; k++) {
        var skor = (PGBenar(kuncijawaban, koleksiceklis[k]) == "Benar") ? 1 : 0;
        //cektagihan.innerHTML += koleksiceklis[j] +" = " + PGBenar(kuncijawaban, koleksiceklis[j]) +"<br/>"
        tempatinputpilihanganda.innerHTML += "Skor No. " + parseInt(koleksiceklis[k]) + " <input type='text' name='SKOR_" + parseInt(koleksiceklis[k]) + "' value='" + skor + "'/><br/>"
    }

    //kd PKN_3.1
    let datakuncikd = JSON.parse(localStorage.getItem("kuncikd"))
    let keyarray = Object.keys(datakuncikd);
    let obj = {};
    for (l = 0; l < keyarray.length; l++) {
        let valu = datakuncikd[keyarray[l]]; // [1, 2, 3, 4, dst]
        let valulengt = valu.length; // [banyaknya array di atas]
        let coun = 0;
        for (z = 0; z < valu.length; z++) { // nomor soal pada kunciKD 
            for (m = 0; m < koleksiceklis.length; m++) { //jawaban siswa 1A, 2B

                var skor = (PGBenar(kuncijawaban, koleksiceklis[m]) == "Benar") ? 1 : 0;
                if (parseInt(valu[z]) == parseInt(koleksiceklis[m])) {
                    coun += skor
                }

            }
        }
        let nilaikd = (coun / valulengt * 100).toFixed(2);

        obj[keyarrfray[l]] = nilaikd


    }

    tempatinputpilihanganda.innerHTML += "Nilai KD  <input type='text' name='nilaikd' value='" + JSON.stringify(obj) + "'/><br/>"



}

async function cekkerjaan(j, d) {
    //.style.display = "none";
    document.querySelector(".kontenmateri").innerHTML = "";
    hasilakhir.style.display = "none";

    tescekelement.innerHTML = "";

    let datanya = d
    let nm = tokensiswa;
    let crTo = datanya.crtToken;
    let idmap = datanya.jenistagihan;
    let jes = datanya.jumlahessay;
    let idmapel = datanya.idbaris;//datanya.idmapel;
    let soalmateri = datanya.idmateri;
    let bataswaktu = new Date(datanya.idtglend).getTime();
    let awalwaktu = new Date(datanya.idtgl).getTime()

    let integerWaktusekarang = new Date().getTime();
    let kadalmateri = (bataswaktu > integerWaktusekarang) ? false : true;
    //console.log(kadalmateri)
    let trueEssay = (datanya.jumlahessay == 0) ? false : true;

    let param = "&namasiswa=" + encodeURIComponent(nm);
    param += "&crtToken=" + encodeURIComponent(crTo);
    param += "&jenistagihan=" + encodeURIComponent(idmap);

    param += "&idmapel=" + encodeURIComponent(idmapel)

    let div = document.querySelector(".mhi_status_" + j);
    let url = urlnilai + "?action=datasiswasudahmengerjakan";
    await fetch(url + param)
        .then(m => m.json())
        .then(k => {
            // console.log(k)
            if (k.records.length == 0) {
                if (integerWaktusekarang < awalwaktu && integerWaktusekarang < bataswaktu) {
                    div.innerHTML = "Maaf, Pembelajaran belum bisa diakses"
                } else if (integerWaktusekarang > awalwaktu && integerWaktusekarang > bataswaktu) {
                    div.innerHTML = "Maaf, Pembelajaran sudah Ananda lewatkan"

                } else {
                    div.innerHTML = `<button class="w3-button w3-green" onclick="previewriwayat(${j})">Yuk Mulai Belajar</button>`
                }

            } else {
                let last = k.records.length - 1;
                let obnilaikd = k.records[last].nilaikd;
                let idhtml = k.records[last].html_jawaban;
                let cekessay = (k.records[last].nilaiEssay == "" && trueEssay) ? `<button class='w3-button w3-red' onclick='lihatljksaya("${idhtml}")'>LJK (?)</button>` : `<button class='w3-button w3-green' onclick='lihatljksaya("${idhtml}")'>LJK <i class="fa fa-check-circle"></i></button>`;
                let objek = JSON.parse(obnilaikd);
                let keyobjek = Object.keys(objek)
                let teks = (k.records[last].nilaiPG == "") ? "" : "Nilai PG = " + k.records[last].nilaiPG + "<br/>";
                let nilaiessay = (k.records[last].nilaiEssay == "") ? "Menunggu dikoreksi" : k.records[last].nilaiEssay;
                teks += (jes == 0) ? "" : "Nilai Isian = " + nilaiessay;
                div.innerHTML = `Selamat Ananda sudah mengerjakan materi ini.<hr class="w3-border-bottom"/> ${teks}<hr class="w3-border-bottom"/>${cekessay}<button class='w3-button w3-blue' onclick='soaloffline("${soalmateri}")'>Latihan lagi</button><br/>`;
            }
        }).catch(er => {
            console.log(er)
            loadingAPI.style.display = "block";
            infoloadingAPI.innerHTML = `Terjadi Kegagalan koneksi. Coba lagi nanti. <hr>Pesan error: ${er}`

        })
}


const soaloffline = (html_jawaban) => {
    loadingljk.style.display = "block";

    document.querySelector(".kontenmateri").innerHTML = "";
    infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`;
    $('#infoloadingljk').nextAll('button').remove();
    $.getJSON(urlnilai + "?idmateri=" + html_jawaban + "&action=previewriwayat", function (json) {

        //loadingljk.style.display  = "none";
        //$("#output").html(brkline(json))
        // document.getElementById("judulpetunjuk").innerHTML = "Preview e-Lamaso";
        //        document.getElementById("isipetunjuk").innerHTML = brkline(json);
        infoloadingljk.innerHTML = `<h1 class='w3-center w3-cursive'>LATIHAN LAGI...</h1>`;
        infoloadingljk.innerHTML += brkline(json) + "<br><br><br>";
        var elEssay = document.getElementsByClassName("soalessay")
        if (elEssay.length !== 0) {
            for (i = 0; i < elEssay.length; i++) {
                var idEl = elEssay[i].getAttribute("id");
                var inidEl = idEl.replace("essay", "");
                var tempattombol = document.getElementById("tomboljawaban" + inidEl);
                var tombolsatu = document.createElement("button");
                tombolsatu.setAttribute("onclick", "tombolketikjawaban2('" + inidEl + "')");
                var tekstombolsatu = document.createTextNode("Ketik Jawaban No " + inidEl);
                tombolsatu.appendChild(tekstombolsatu);
                tempattombol.appendChild(tombolsatu);
                tempattombol.innerHTML += "<br/><sub>atau</sub></br/> "
                var tomboldua = document.createElement("button");
                tomboldua.setAttribute("onclick", "tomboluploadjawaban2('" + inidEl + "')");
                var tekstomboldua = document.createTextNode("Upload Media No " + inidEl);
                tomboldua.appendChild(tekstomboldua);
                tempattombol.appendChild(tomboldua);
                tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>"

            }
        }
        let tombol = document.createElement("button");
        tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
        tombol.setAttribute("onclick", "printPortrait('infoloadingljk,,,${StringTanggal(new Date())}')");
        tombol.innerHTML = `<i class="fa fa-print"></i>  Cetak `

        infoloadingljk.innerHTML += "<center>Ini hanya untuk latihan ya ..., Tidak bisa dikirimkan ke e-Lamaso. Jika ingin memperbaiki nilai, silakan tulis di bukumu lalu serahkan ke gurumu melalui WA</center>";
        infoloadingljk.after(tombol)

    })

}

const lihatljksaya = (html_jawaban) => {
    loadingljk.style.display = "block";
    infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle"></i>`;
    $('#infoloadingljk').nextAll('button').remove();
    $.getJSON(urlnilai + "?idmateri=" + html_jawaban + "&action=previewriwayat", function (json) {

        //loadingljk.style.display  = "none";
        //$("#output").html(brkline(json))
        // document.getElementById("judulpetunjuk").innerHTML = "Preview e-Lamaso";
        //        document.getElementById("isipetunjuk").innerHTML = brkline(json);
        infoloadingljk.innerHTML = brkline(json) + "<br><br><br>";



        let tombol = document.createElement("button");
        tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
        tombol.setAttribute("onclick", `printPortrait('infoloadingljk,,,${StringTanggal(new Date())}')`);
        tombol.innerHTML = `<i class="fa fa-print"></i>  Cetak `

        infoloadingljk.after(tombol)

    })

}

function printPortraitLama(x) {
    var splitt = x.split(',');

    var id = splitt[0],
        h1 = splitt[1],
        h2 = splitt[2],
        bulan = splitt[3];

    var html = document.getElementById("iframeprint");
    var isi = html.contentDocument;
    var headnya = isi.head;
    while (headnya.hasChildNodes()) {
        headnya.removeChild(headnya.firstChild);
    }
    //var bodynya = isi.body;
    //bodynya="";

    var titlee = document.createElement("title");
    // var	teksjudul = document.createTextNode("width:950px;height:400px;border:1px solid blue;border-radius:15px")
    var teksjudul = document.createTextNode("e-lamaso")
    titlee.appendChild(teksjudul)
    headnya.appendChild(titlee);
    headnya.innerHTML += '<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">';
    headnya.innerHTML += '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lobster">';

    //headnya.appendChild(foot);
    var css = '@page { size: portrait;}';
    //head = document.head || document.getElementsByTagName('head')[0],
    var style = document.createElement('style');
    var cssd = `.versii-table {width:950px;max-width:100%;border-collapse:collapse}.versii-table th,.versii-table td,.versii-table tr {border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versii-table th{background-color:#eee;color:blue;vertical-align:middle;text-align:center}.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}.versi-table {width:auto;max-width:100%;border-collapse:collapse}.versi-table th,.versi-table td,.versi-table tr {border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th{background-color:#eee;color:blue;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}versi-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}
    .warnaeka{background-color:rgb(250, 234, 8)} .w3-lobster { font-family: "Lobster", serif; }.garis td,.garis th,.garis tr{border:0.5px solid rgb(119, 116, 116)} .garis th{border:1px solid #000;text-align:center;vertical-align:middle}
    `
    style.type = 'text/css';
    style.media = 'print';

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));

    }

    headnya.appendChild(style);
    var bodynya = isi.body;
    //var teksbody = document.getElementById(id).innerHTML;
    var teksbody = document.getElementById(id).innerHTML;
    //var teksbody =document.getElementById(id).outerHTML;
    bodynya.innerHTML = "";
    bodynya.innerHTML = '<style>' + cssd + '</style>';
    bodynya.innerHTML += '<h1 style="text-align:center">' + h1 + '</h1>';
    bodynya.innerHTML += '<h2 style="text-align:center">' + h2 + '</h2>';
    bodynya.innerHTML += teksbody;
    bodynya.innerHTML += '<br/><br/><br/>';

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}
function printPortrait(x) {
    var splitt = x.split(',');

    var id = splitt[0],
        h1 = splitt[1],
        h2 = splitt[2],
        bulan = splitt[3];

    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO DATA REKAP NILAI KETERAMPILAN</title>`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lobster">';
    head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=Raleway">`;
    head.innerHTML += `<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>`;
    head.innerHTML += `<style type="text/css">
    .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}
    .warnaeka{background-color:rgb(250, 234, 8)} .w3-lobster { font-family: "Lobster", serif; }.warnaeka{background-color:rgb(250, 234, 8)} .w3-lobster { font-family: "Lobster", serif; }.garis td,.garis th,.garis tr{border:0.5px solid rgb(119, 116, 116)} .garis th{border:1px solid #000;text-align:center;vertical-align:middle}
    </style>`;

    head.innerHTML += `<style type="text/css" media="print">
    @media print {
        html,body{height:100%;width:100%;margin:0;padding:0}
        
         @page {
            size: A4 portrait;
            max-height:100%;
            max-width:100%;
            
            }
    }
    </style>`;
    var teksbody = document.getElementById(id).innerHTML;
    //var teksbody =document.getElementById(id).outerHTML;
    body.innerHTML = "";
    body.innerHTML += '<h1 style="text-align:center">' + h1 + '</h1>';
    body.innerHTML += '<h2 style="text-align:center">' + h2 + '</h2>';
    body.innerHTML += teksbody;
    body.innerHTML += '<br/><br/><br/>';

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();


}


function ceknilaiaksessekali() {
    var jumlahsoal = document.getElementsByClassName("calcnosoal");
    var jumlahopsipg = document.getElementsByClassName("calc");
    var kuncijawaban = window.atob(JSON.parse(localStorage.getItem("keybase")));
    var koleksiceklis = [];
    tempatinputpilihanganda.innerHTML = "Data Pilihan Ganda:<br/>"
    for (var i = 0; i < jumlahopsipg.length; i++) {
        if (jumlahopsipg[i].checked) {
            var idopsi = jumlahopsipg[i].getAttribute("id").replace(/\s+/g, "");
            koleksiceklis.push(idopsi)
        }
    }
    //koleksiceklis = kuncijawaban.replace("/\s+/g","").split(",").join("=");
    cektagihan.innerHTML = koleksiceklis.join("<br/>");
    cektagihan.innerHTML += "<hr/>" + kuncijawaban; //.split(",")
    cektagihan.innerHTML += "<hr/> Ini hasil koreksinya:<br/>";
    for (j = 0; j < koleksiceklis.length; j++) {
        cektagihan.innerHTML += koleksiceklis[j] + " = " + PGBenar(kuncijawaban, koleksiceklis[j]) + "<br/>"
        tempatinputpilihanganda.innerHTML += "No. " + parseInt(koleksiceklis[j]) + " <input type='text' name='PG_" + parseInt(koleksiceklis[j]) + "' value='" + koleksiceklis[j].replace(parseInt(koleksiceklis[j]), "") + "'/><br/>"
    }

    var koleksigambarjawaban = document.getElementsByClassName("filejawaban");
    tempatinputjawabanessay.innerHTML = "Data Poto Essay:<br/>"
    for (var i = 0; i < koleksigambarjawaban.length; i++) {
        var dataupload = koleksigambarjawaban[i].innerHTML;
        //if(dataupload.length > -1){
        //if(dataupload.length !== ""){
        if (dataupload !== "") {
            var base64 = dataupload.replace(/^.*,/, '');
            var typeasal = dataupload.match(/^.*(?=;)/)[0];
            var typenyaaja = typeasal.replace("data:", "");
            var inputbase64 = document.createElement("input");
            inputbase64.setAttribute("value", base64);
            inputbase64.setAttribute("name", "data");
            var inputtype = document.createElement("input");
            inputtype.setAttribute("value", typeasal);
            inputtype.setAttribute("name", "mimetype");
            var inputfilename = document.createElement("input");
            inputfilename.setAttribute("value", "Poto Essay ke-" + (i + 1));
            inputfilename.setAttribute("name", "filename");
            tempatinputjawabanessay.innerHTML += "<br/>Poto Ke-" + (i + 1);
            tempatinputjawabanessay.appendChild(inputbase64);
            tempatinputjawabanessay.appendChild(inputtype);
            tempatinputjawabanessay.appendChild(inputfilename);
        }
    }

}

function PGBenar(opsi, kuncijawaban) {
    var benarsalah;
    let benar = opsi.filter(f => f == kuncijawaban);
    if (benar.length == 1) {
        benarsalah = "Benar"
    } else {
        benarsalah = "Salah"
    }

    return benarsalah
}



function tanggalfulllengkap(tgl) {
    var d = new Date(tgl);
    var tgl = d.getDate();
    var bln = d.getMonth();
    var thn = d.getFullYear();
    var jam = d.getHours();
    var menit = d.getMinutes();
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return tgl + " " + bulan[bln] + " " + thn + " Pukul " + addZero(jam) + ":" + addZero(menit);
}
function tanggalfulllengkaphari(tgl) {
    var d = new Date(tgl);
    let hr = d.getDay()

    var tgl = d.getDate();
    var bln = d.getMonth();
    var thn = d.getFullYear();
    var jam = d.getHours();
    var menit = d.getMinutes();
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    var hari = ["Minggu", "Senin", "Selasa",  "Rabu", "Kamis", "Jumat", "Sabtu"]
    return hari[hr] + ", " + tgl + " " + bulan[bln] + " " + thn + " Pukul " + addZero(jam) + ":" + addZero(menit);
}

function waktufulllengkap(tgl) {
    var d = new Date(tgl);
    var tgl = d.getDate();
    var bln = d.getMonth();
    var thn = d.getFullYear();
    var jam = d.getHours();
    var menit = d.getMinutes();
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return " Pukul " + addZero(jam) + ":" + addZero(menit);
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    };
    return i;
}

function deleteZero(i) {
    if (i.slice(0, 1) == "0") {
        i = i.slice(1, 2);
    };
    return i;
}


const infoupdate2 = () => {
    infoinfo.style.display = "block"
}
const tahapselanjutnya = () => {
    //maintenace.style.display = "block";
    w3_close();
};


//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function tombolkirimnilaielamaso2() {



    //var namaform = document.kirimnilaielamaso;
    hasilakhir.style.display = "none";
    hasilbelajarsekali.style.display = "block";
    tescekelement.innerHTML = " Sedang Proses Kirim ... <i fa-spin fa-spinner w3-xxxlarge></i>"

    var kirimdataini = $("#kirimnilaielamaso").serialize();
    //var encode_nya = new FormData(namaform)
    var xhr = new XMLHttpRequest
    xhr.open("POST", urlnilai + "?action=siswakirimnilai", true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {

            document.getElementById("resumenilai").removeAttribute("style");
            document.getElementById("resumenilai").setAttribute("style", "display:block");
            resumenilai.innerHTML = "";
            resumenilaiskhir.innerHTML = "";

            tescekelement.innerHTML = "Server berhasil merespon dengan pesan: " + JSON.parse(xhr.responseText).result;
            setTimeout(function () {
                tescekelement.innerHTML = "";
                let id = parseInt(indekmaterionline.innerHTML);
                document.getElementById("hasilakhir").style.display = "none";
                panggilmateri();
                window.scrollTo({ top: 0, behavior: 'smooth' });


            }, 2000)
        } else {
            tescekelement.innerHTML = "Gagal merespon.."
        }
    };

    xhr.send(kirimdataini);


}

const previewriwayat = (par) => {

    resumenilaiskhir.innerHTML = ``;
    resumenilaiskhir.style.display = "none";
    //pastikan hasilskor dihiden:
    hasilakhir.style.display = "none";
    
    indekmaterionline.innerHTML = par;
    tescekelement.innerHTML = "";
    let datamateri = JSON.parse(localStorage.getItem("materi"));
    kodebarismateriyangdikerjakan = datamateri[par].idbaris;
    let versi = datamateri[par].versi;//

    loadingmodal.style.display = "block";

    var idm = encodeURIComponent(datamateri[par].idmateri);
    let tes = document.querySelector(".kontenmateri"); //document.getElementById("lamanmateri");   
    infoloadingljk.innerHTML = "";
    tes.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxxlarge'  ></i>";
    document.querySelector(".kontenmateri").style.display = "block";
    //bikin judul h4
    var judul = document.createElement("h4")
    judul.setAttribute("class", "w3-center");
    judul.innerHTML = "Identitas e-Lamaso";
    tes.innerHTML = ""
    tes.appendChild(judul);

    //-- Bikin Tabel identitas:
    var tabelidentitas = document.createElement("table");
    tabelidentitas.setAttribute("class", "versi-table");
    tabelidentitas.setAttribute("style", "margin:auto");
    var tr = tabelidentitas.insertRow(-1);
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Sekolah"
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idSekolah
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Nama Siswa"
    var td = tr.insertCell(-1);
    td.innerHTML = namasiswa
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kelas"
    var td = tr.insertCell(-1);
    td.innerHTML = namakelas;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Mapel/Tema"
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idmapel;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Jenis Tagihan"
    var td = tr.insertCell(-1);
    var keteranganakses;
    if (datamateri[par].idaksessiswa == "sekali") {
        keteranganakses = "TEST <br>Sekali saja sejak mengirim nilai"
    } else {
        keteranganakses = "LATIHAN<br>Berapa kali saja untuk latihan"
    }
    td.innerHTML = keteranganakses;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Tanggal Publikasi"
    var td = tr.insertCell(-1);
    td.innerHTML = tanggalfulllengkap(datamateri[par].idtgl);

    var tr = tabelidentitas.insertRow(-1);
    var cel1 = tr.insertCell(-1);
    cel1.setAttribute("id", "timer");
    cel1.setAttribute("colspan", "2");
    cel1.setAttribute("style", "text-align:center");
    cel1.innerHTML = "Timer: ";
    var cdtimer = document.createElement("input")
    cdtimer.setAttribute("id", "cd_seconds");
    cdtimer.setAttribute("disabled", "true");
    cdtimer.setAttribute("value", datamateri[par].iddurasi);
    cdtimer.setAttribute("style", "width:50px")
    cel1.appendChild(cdtimer);
    cel1.innerHTML += " Menit."
    var tr = tabelidentitas.insertRow(-1);
    var cel1 = tr.insertCell(-1);
    cel1.setAttribute("id", "tempatdurasi");
    cel1.setAttribute("colspan", "2");
    cel1.setAttribute("style", "text-align:center");
    var cdstatus = document.createElement("b");
    cdstatus.setAttribute("id", "cd_status");
    var tekscdstatus = document.createTextNode("Durasi Penyelesaian:");
    cdstatus.appendChild(tekscdstatus);
    var cdjam = document.createElement("span");
    cdjam.setAttribute("id", "cd_h");
    var tekscdjam = document.createTextNode("00:");
    cdjam.appendChild(tekscdjam);
    var cdmenit = document.createElement("span");
    cdmenit.setAttribute("id", "cd_m");
    var tekscdmenit = document.createTextNode("00:");
    cdmenit.appendChild(tekscdmenit);
    var cddetik = document.createElement("span");
    cddetik.setAttribute("id", "cd_s");
    var tekscddetik = document.createTextNode("00");
    cddetik.appendChild(tekscddetik);
    var cdpause = document.createElement("input")
    cdpause.setAttribute("type", "button");
    cdpause.setAttribute("id", "cd_pause");
    cdpause.setAttribute("value", "Jeda");
    var cdpstop = document.createElement("input")
    cdpstop.setAttribute("type", "button");
    cdpstop.setAttribute("id", "cd_stop");
    cdpstop.setAttribute("value", "Selesai");
    var gntibaris = document.createElement("br");
    var controltimer = document.createElement("b")
    var tekscontroltimer = document.createTextNode("Control Timer:");
    controltimer.appendChild(tekscontroltimer);
    var controlstart = document.createElement("input");
    controlstart.setAttribute("type", "button");
    controlstart.setAttribute("id", "cd_start");
    controlstart.setAttribute("value", "Mulai Mengerjakan");
    var controlreset = document.createElement("input");
    controlreset.setAttribute("type", "button");
    controlreset.setAttribute("id", "cd_reset");
    controlreset.setAttribute("value", "Reset Timer");
    var titikdua = document.createElement("b");
    var tekstitikdua = document.createTextNode(":");
    titikdua.appendChild(tekstitikdua);
    cel1.appendChild(controltimer);
    cel1.innerHTML += "<br/>";
    cel1.appendChild(controlstart);
    //cel1.appendChild(controlreset);
    //cel1.appendChild(cdpause);
    cel1.appendChild(cdpstop);
    cel1.appendChild(gntibaris);
    cel1.appendChild(cdstatus);
    cel1.innerHTML += ":<br/>";
    cel1.appendChild(cdjam);
    cel1.innerHTML += ":";
    cel1.appendChild(cdmenit);
    cel1.appendChild(titikdua)
    cel1.appendChild(cddetik);

    tes.appendChild(tabelidentitas)

    // $.getJSON(urlnilai + "?idmateri=" + idm + "&action=previewriwayat", function (json) {
    fetch(urlnilai + "?idmateri=" + idm + "&action=previewriwayat").then(m => m.json())
        .then(json => {
            loadingmodal.style.display = "none";
            document.querySelector(".kontenmateri").innerHTML += brkline(json);
            if(versi == ""){
            var elEssay = document.getElementsByClassName("soalessay")
            if (elEssay.length !== 0) {
                for (i = 0; i < elEssay.length; i++) {
                    var idEl = elEssay[i].getAttribute("id");
                    var inidEl = idEl.replace("essay", "");
                    var tempattombol = document.getElementById("tomboljawaban" + inidEl);
                    var tombolsatu = document.createElement("button");
                    tombolsatu.setAttribute("onclick", "tombolketikjawaban('" + inidEl + "')");
                    var tekstombolsatu = document.createTextNode("Ketik Jawaban No " + inidEl);
                    tombolsatu.appendChild(tekstombolsatu);
                    tempattombol.appendChild(tombolsatu);
                    tempattombol.innerHTML += "<br/><sub>atau</sub></br/> "
                    var tomboldua = document.createElement("button");
                    tomboldua.setAttribute("onclick", "tomboluploadjawaban('" + inidEl + "')");
                    var tekstomboldua = document.createTextNode("Upload Media No " + inidEl);
                    tomboldua.appendChild(tekstomboldua);
                    tempattombol.appendChild(tomboldua);
                    tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>"

                }
            }
        }

            tampilinsublamansiswa(4);

            $.APP.startTimer('cd');
            var adaselini = document.getElementById("selwaktumulai");
            if (adaselini == null) {
                var tabel = document.getElementById("tabelku");
                var brs = tabel.insertRow(4);
                var sel = brs.insertCell(-1);
                sel.setAttribute("id", "selwaktumulai");
                sel.innerHTML = "Waktu Mulai";
                var sel = brs.insertCell(-1);
                sel.innerHTML = waktusekarang();
            } else {
                var tabel = document.getElementById("selwaktumulai");
                tabel.innerHTML = waktusekarang();

            }
            document.querySelector(".tombol_hasilakhirelamaso").className = document.querySelector(".tombol_hasilakhirelamaso").className.replace("w3-hide", "w3-show");
            document.querySelector(".tombol_hasilakhirelamaso").removeAttribute("onclick");
            document.querySelector(".tombol_hasilakhirelamaso").setAttribute("onclick", `hasilakhirelamaso(${par})`);

        }).catch(er => {
            console.log(er);
            loadingmodal.style.display = "none";
            alert("Terjadi kesalahan.");

        })


}

function hasilakhirelamaso(id) {
    let dlo = JSON.parse(localStorage.getItem("materi"))[id];
    let sw = JSON.parse(localStorage.getItem("typeuser"))

    let keytokenakses = dlo.idaksessiswa;

    let jumlahpg = parseInt(dlo.jumlahpg);
    let jumlahessay = parseInt(dlo.jumlahessay);
    //sembunyikan dulu konten materinya;
    document.querySelector(".kontenmateri").style.display = "none";

    document.querySelector(".tombol_hasilakhirelamaso").className = document.querySelector(".tombol_hasilakhirelamaso").className.replace("w3-show", "w3-hide");
    //kita buat identitasnya dulu;
    document.getElementById("hasilakhirnamasekolah").innerHTML = identitassekolah.toUpperCase();
    document.getElementById("hasilakhirsemestertapel").innerHTML = "Semester " + semester_bar + " Tahun Pelajaran " + tapel_bar;
    document.getElementById("hasilakhirtokensiswa").innerHTML = sw.idrow;
    document.getElementById("hasilakhirnamasiswa").innerHTML = sw.user;
    document.getElementById("hasilakhirkelas").innerHTML = sw.room;
    document.getElementById("hasilakhirmapeltema").innerHTML = dlo.idmapel;
    document.getElementById("hasilakhirjenistagihan").innerHTML = (dlo.jenistagihan == "") ? "Latihan/Rangkuman" : dlo.jenistagihan;
    document.getElementById("hasilakhirjumlahpg").innerHTML = jumlahpg;
    document.getElementById("hasilakhirjumlahessay").innerHTML = jumlahessay;
    //untuk muatan kompetensi, stringnya dibuat dulu dari objek
    let mkd = (dlo.kuncikd == "undefined" || dlo.kuncikd == "") ? [] : Object.keys(JSON.parse(dlo.kuncikd));
    let str = "";
    mkd.forEach(s => str += s.split("_")[0] + " KD " + s.split("_")[1] + "<br/>");
    document.getElementById("hasilakhirmuatankompetensi").innerHTML = str;
    document.getElementById("hasilakhirwaktu").innerHTML = waktusekarang();

    //cek dulu soal pg dan essay lalu elemennya ditaruh di tempatLJBaru 
    let tempatljpgbaru = document.querySelector(".ljksiswa_pg");
    let tempatljessaybaru = document.querySelector(".ljksiswa_essay");
    let tempatskorpgbaru = document.querySelector(".ljksiswa_nilaipg");
    let tempatskoressaybaru = document.querySelector(".ljksiswa_nilaiessay");
    //deteksi semua elemen terkait konten, seperti SOAL PG, KUNCI, yang telah dipilih siswa;
    let elSoal = document.getElementsByClassName("calcnosoal");
    let elPG = document.getElementsByClassName("calc");

    //periksa apakah opsi pg ada sampai D atau tidak (perbedaan kelas tinggi dan rendah)
    let datapg = [];
    for (i = 0; i < elPG.length; i++) {
        datapg.push(elPG[i].getAttribute("id"));
    }
    let jenisopsi = datapg.map(s => s.match(/[A-D]/g)[0]);
    let tipeopsi = jenisopsi.filter((x, i, a) => a.indexOf(x) == i);

    //siapkan elemen html untuk Lembar Jawaban PG dan skornya
    let htmlljpg = "";
    let htmlpgskor = "";
    //cek dulu ada berapa soal PG dan Essay
    if (jumlahpg == 0) {
        htmlljpg = "";
        htmlpgskor = `<div class="w3-large w3-border w3-center w3-hide" id="nilaiPGku" style="height:100px"></div>`
        if (tempatskorpgbaru.className.indexOf("w3-hide") == -1) {
            tempatskorpgbaru.className += " w3-hide"
        }
        if (tempatljpgbaru.className.indexOf("w3-hide") == -1) {
            tempatljpgbaru.className += " w3-hide"
        }
    } else {
        tempatskorpgbaru.className = tempatskorpgbaru.className.replace("w3-hide", "");
        tempatljpgbaru.className = tempatljpgbaru.className.replace("w3-hide", "");
        htmlpgskor = `<h5 class="w3-center w3-card-4 warnaeka">NILAI PG</h5>
        <div class="w3-large w3-border w3-center" id="nilaiPGku" style="height:100px"></div>
        `;
        htmlljpg = `<h5 class="w3-center w3-card-4 warnaeka">PILIHAN GANDA</h5>
        <table class="w3-table-all garis w3-centered tblljkpg w3-small">
        <caption>Tabel Jawaban Pilihan Ganda</caption>
        <tr>
        <th>No</th>
        <th colspan="${tipeopsi.length}">PG yang dipilih</th>
        </tr>`;
        for (i = 0; i < jumlahpg; i++) {
            htmlljpg += `<tr><td>${i + 1}</td>`;
            for (j = 0; j < tipeopsi.length; j++) {
                htmlljpg += `<td class="tdtblljkpg_${i + 1}${tipeopsi[j]}">${tipeopsi[j]}</td>`
            }
            htmlljpg += `</tr>`;

        }
        htmlljpg += `<table class="w3-table-all"><sub>Ket: yang berwana kuning adalah pilihan opsi yang dipilih.</sub>`;
    }
    tempatljpgbaru.innerHTML = htmlljpg;
    tempatskorpgbaru.innerHTML = htmlpgskor;
    //sekarang tandai td dan buat elemen input untuk dikirim
    let tabelpg, ABCD, skor;
    let arrskor = [];
    let koleksiceklis = []
    let kuncijawaban = window.atob(localStorage.getItem("keybase")).split(",");

    tempatinputpilihanganda.innerHTML = "Input Pilihan Ganda:<br/>"
    for (k = 0; k < elPG.length; k++) {
        if (elPG[k].checked) {
            ABCD = elPG[k].getAttribute("id").replace(/\s+/g, "");
            koleksiceklis.push(ABCD);
            tabelpg = document.querySelector(".tdtblljkpg_" + ABCD);
            tabelpg.setAttribute("style", "background-color:rgb(250, 234, 8)");
            // tabelpg.className += " warnaeka";
            tempatinputpilihanganda.innerHTML += "No. " + ABCD.match(/\d+/)[0] + " <input type='text' name='PG_" + ABCD.match(/\d+/)[0] + "' value='" + ABCD.match(/[A-D]/g)[0] + "'/><br/>"
            skor = (PGBenar(kuncijawaban, ABCD) == "Benar") ? 1 : 0;
            arrskor.push(skor)
            //cektagihan.innerHTML += koleksiceklis[j] +" = " + PGBenar(kuncijawaban, koleksiceklis[j]) +"<br/>"
            tempatinputpilihanganda.innerHTML += "Skor No. " + ABCD.match(/\d+/)[0] + " <input type='text' name='SKOR_" + ABCD.match(/\d+/)[0] + "' value='" + skor + "'/><br/>"

        }
    }

    if (jumlahpg !== 0) {

        let nilaiskorarray = (arrskor.length == 0) ? 0 : arrskor.reduce((a, b) => a + b);
        console.log(nilaiskorarray);
        let skorakhirpg = (nilaiskorarray / elSoal.length * 100).toFixed(2)
        let tekskorpg = ((isNaN(skorakhirpg)) ? "" : skorakhirpg);
        document.getElementById("nilaiPGku").innerHTML = tekskorpg;
    };



    //siapkan elemen html untuk lembar jawaban essay
    let htmlljessay = "";
    if (jumlahessay == 0 || jumlahessay == "") {

        if (tempatskoressaybaru.className.indexOf("w3-hide") == -1) {
            tempatskoressaybaru.className += " w3-hide"
        }
        if (tempatljessaybaru.className.indexOf("w3-hide") == -1) {
            tempatljessaybaru.className += " w3-hide"
        }
        tempatskoressaybaru.innerHTML = "";

    } else {
        tempatskoressaybaru.className = tempatskoressaybaru.className.replace("w3-hide", "");
        tempatljessaybaru.className = tempatljessaybaru.className.replace("w3-hide", "");
        tempatskoressaybaru.innerHTML = `<h5 class="w3-center w3-card-4 warnaeka">NILAI ISIAN</h5>
        <div class="w3-border w3-center" id="nilaiEssayku" style="height:100px">Menunggu Dikoreksi</div>
        `
        var resulthasilessay = "";
        var elFilejawaban = document.getElementsByClassName("filejawaban");
        if (elFilejawaban.length > 0) { //mengantisipasi jika tidak ada filejawaban kosong ga perlu dieksekusi
            resulthasilessay += `<h5 class="w3-center w3-card-4 warnaeka">JAWABAN ISIAN</h5>`;
            for (var c = 0; c < elFilejawaban.length; c++) {
                var innernya = elFilejawaban[c].tagName;
                var noessay = elFilejawaban[c].getAttribute("id").replace("filejawaban", "");
                if (innernya == "TEXTAREA") {
                    resulthasilessay += "<ol style='list-style-type:decimal' start='" + noessay + "'><li><b style='color:blue'>Pertanyaan:</b><br/>";
                    resulthasilessay += document.getElementById("pertanyaanessay_" + noessay).innerHTML + "<hr style='border-top:1px solid black'/><b style='color:blue'>Jawaban:</b>:<br/>";
                    resulthasilessay += elFilejawaban[c].value.split("\n").join("<br/>");
                    resulthasilessay += "<div id='untuklj" + noessay + "' class='koleksilj' style='border:1px solid red;padding:5px;background-color:#eeeeff'>Nilai</div>";
                    resulthasilessay += "</li></ol>";
                } else {
                    resulthasilessay += "<ol style='list-style-type:decimal' start='" + noessay + "'><li><b style='color:blue'>Pertanyaan:</b><br/>";
                    resulthasilessay += document.getElementById("pertanyaanessay_" + noessay).innerHTML + "<hr style='border-top:1px solid black'/><b style='color:blue'>Jawaban:</b>:<br/>";
                    resulthasilessay += elFilejawaban[c].outerHTML;
                    resulthasilessay += "<div id='untuklj" + noessay + "' class='koleksilj' style='border:1px solid red;padding:5px;background-color:#eeeeff'>Nilai</div>";
                    resulthasilessay += "</li></ol>";
                }
            }
        }
        tempatljessaybaru.innerHTML = resulthasilessay;
    }

    // INI KODE UNTUK YANG DIKIRIMKAN
    // identitas utamanya: idbaris materi yang dikerjakan, dengan token siswa
    document.kirimnilaielamaso.matericode.value = dlo.idbaris;
    document.kirimnilaielamaso.tokensiswa.value = tokensiswa;
    let constidok = dlo.crtToken;
    tempatinputidentitashasilbelajar.innerHTML = "Nama Sekolah: <input name='idsekolah' id='kirimidsekolah' type='text' value='" + dlo.idSekolah + "'/><br/>";
    tempatinputidentitashasilbelajar.innerHTML += "emailguru: <input name='emailguru' id='emailguru' type='text' value='" + surel + "'/><br/>";
    tempatinputidentitashasilbelajar.innerHTML += "Nama Kelas : <input name='idkelas' id='kirimidkelas' type='text' value='" + namakelas + "'/><br/>";
    tempatinputidentitashasilbelajar.innerHTML += "Mapel : <input name='idmapel' id='kirimidmapel' type='text' value='" + dlo.idmapel + "'/><br/>";
    tempatinputidentitashasilbelajar.innerHTML += "Token : <input name='idtoken' id='kirimidtoken' type='text' value='" + dlo.idtoken + "'/><br/>";
    tempatinputidentitashasilbelajar.innerHTML += "jenistagihan : <input name='jenistagihan' id='kirimjenistagihan' type='text' value='" + dlo.jenistagihan + "'/><br/>";
    tempatinputidentitashasilbelajar.innerHTML += "kodeunik : <input name='kodeunik' id='kirimkodeunik' type='text' value='" + dlo.jenistagihan + "_" + constidok + "'/><br/>";

    tempatinputidentitashasilbelajar.innerHTML += "crtToken : <input name='crtToken' id='kirimcrtToken' type='text' value='" + constidok + "'/><br/>";
    tempatinputidentitashasilbelajar.innerHTML += "Nama : <input name='namasiswa' id='kirimnamasiswa' type='text' value='" + namasiswa + "'/><br/>";
    tempatinputidentitashasilbelajar.innerHTML += "NIlai PG : <input name='nilaiPG' id='kirimnilaiPG' type='text' value='" + nilaiPGku.innerHTML + "'/><br/>";


    // masukkan nilai tiap-tiap KD dalam bentuk objek
    let datakuncikd = JSON.parse(localStorage.getItem("kuncikd"))
    let keyarray = Object.keys(datakuncikd);
    let obj = {};
    for (l = 0; l < keyarray.length; l++) {
        let valu = datakuncikd[keyarray[l]]; // [1, 2, 3, 4, dst]
        let valulengt = valu.length; // [banyaknya array di atas]
        let coun = 0;
        for (z = 0; z < valu.length; z++) { // nomor soal pada kunciKD 
            for (m = 0; m < koleksiceklis.length; m++) { //jawaban siswa 1A, 2B
                skor = (PGBenar(kuncijawaban, koleksiceklis[m]) == "Benar") ? 1 : 0;
                if (parseInt(valu[z]) == parseInt(koleksiceklis[m])) {
                    coun += skor
                }
            }
        }
        let nilaikd = (coun / valulengt * 100).toFixed(2);
        obj[keyarray[l]] = nilaikd
    }

    tempatinputpilihanganda.innerHTML += "Nilai KD  <input type='text' name='nilaikd' value='" + JSON.stringify(obj) + "'/><br/>"



    //semua elemen ini akan ditaroh di elemen ini tempatLJ;
    //let tempatLJ = document.getElementById("resumenilai");
    // tempatLJ tadi berada di parent elemen borderidhasilakhirnama (isiteks);
    let isiteks = document.getElementById("borderidhasilakhirnama");
    // setelah terbuat, 'isiteks'akan akan dimasukkan ke tekshtmlnilai (parentnya di dalam form id 'kirimnilaielamaso' )
    let teksarea = document.getElementById("tekshtmlnilai");
    // teksarea.textContent = isiteks.innerHTML;
    teksarea.textContent = window.btoa(unescape(encodeURIComponent(isiteks.innerHTML)));


    //tampilkan laman konfirmasi sebelum kirim. hasil
    resumenilaiskhir.style.display = "block";
    if (keytokenakses == "beberapa kali") {
        hasilakhir.style.display = "block";
        resumenilaiskhir.innerHTML = `Terimakasih Ananda telah mengikuti kegiatan ini. Hasil Ananda di atas dapat Anda simpan dengan fitur berikut ini:
        <hr />
        <button id="idtombolkirimnilaielamaso"
            class="w3-btn w3-orange w3-border-bottom w3-border-black w3-round-large w3-tiny w3-margin"
            onclick="printModalinfoljk('Hasil Belajar ${new Date().getTime()}', 'hasilakhir')"><i class='fa fa-print'></i>
            Cetak Hasil Belajar</button>
        <button id="idtombolkirimnilaielamaso"
            class="w3-btn w3-orange w3-border-bottom w3-border-black w3-round-large w3-tiny w3-margin""
            onclick="printModalinfoljkclaas('Materi id=${new Date().getTime()}', 'kontenmateri')"><i class='fa fa-print'></i>
            Cetak Rangkuman</button>

        <br />`;
    } else {
        hasilakhir.style.display = "none";
        resumenilaiskhir.innerHTML = `Terima kasih, Nilai Ananda siap dikirim ke server e-Lamaso. Klik tombol Kirim Nilai agar diproses gurumu.
        <hr />
        <button id="idtombolkirimnilaielamaso"
            class="w3-btn w3-orange w3-border-bottom w3-border-black w3-round-large"
            onclick="tombolkirimnilaielamaso()"><i class='fa fa-paper-plane'></i>
            Kirim Nilai</button>
        <br />`;
    }



}
function tombolkirimnilaielamaso() {
    //hapus dan sembunyikan tombolnya
    resumenilaiskhir.innerHTML = "";
    resumenilaiskhir.style.display = "none";

    // hasilakhir.style.display = "none";
    // hasilbelajarsekali.style.display = "block";
    tescekelement.innerHTML = " Sedang Proses Kirim ... <i fa-spin fa-spinner w3-xxxlarge></i>"

    var kirimdataini = $("#kirimnilaielamaso").serialize();

    var xhr = new XMLHttpRequest
    xhr.open("POST", urlnilai + "?action=siswakirimnilai", true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {


            tescekelement.innerHTML = "Server berhasil merespon dengan pesan: " + JSON.parse(xhr.responseText).result;
            setTimeout(function () {
                tescekelement.innerHTML = "";
                document.getElementById("hasilakhir").style.display = "none";
                panggilmateri();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 2000)
        } else {
            tescekelement.innerHTML = "Gagal merespon.."
        }
    };

    xhr.send(kirimdataini);


}
//https://www.studytonight.com/post/capture-photo-using-webcam-in-javascript
const absencarabeda = () =>{
    let mod1 = document.getElementById("divbantuabsen");
    let mod2 = document.getElementById("modalabsencarabeda");
    mod1.style.display = "none";
    mod2.style.display = "block";
    showhideabsenbaru("awal");
    startup()

}
let videoo = document.getElementById('prevkamerabsen');
let canvass = document.getElementById('canvasabsen');
let photoo = document.getElementById('resultkamerabsen');
let startbutton = document.getElementById('startbutton');
let hieghtt;let widtht
function startup() {
    

    // access video stream from webcam
    navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
        // on success, stream it in video tag
        .then(function(stream) {
            videoo.srcObject = stream;
            videoo.play();
            localStream = stream;
        })
        .catch(function(err) {
            console.log("An error occurred: " + err);
        });


    clearphoto();
};

function clearphoto() {
    var context = canvass.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvass.width, canvass.height);

    var data = canvass.toDataURL('image/png');
    photoo.setAttribute('src', data);
}
function takepicture() {
    var context = canvass.getContext('2d');
    clearphoto();
    context.drawImage(videoo, 0, 0, canvass.width, canvass.height);
    var dataa = canvass.toDataURL('image/png');
    photoo.setAttribute('src', dataa);
    let class_respon = document.querySelector(".prosesabsenbaru");
    class_respon.innerHTML = `<img src="/img/barloading.gif"/>`;
    //--------------- isikan data siswanya:
    showhideabsenbaru("ambilgambar");
    let a = new Date();
            let b = a.getDate();
            let c = a.getMonth() + 1;
            let d = a.getFullYear()
            let idok = b + "" + addZero(c) + "" + d;
    let in_name = document.querySelector("[data-absenbaru=name]");
    let in_tokensiswa = document.querySelector("[data-absenbaru=tokensiswa]");
    let in_id = document.querySelector("[data-absenbaru=id]");
    let in_kelas = document.querySelector("[data-absenbaru=kelas]");
    let in_fileContent = document.querySelector("[data-absenbaru=fileContent]");
    in_name.value = namasiswa;
    in_tokensiswa.value = tokensiswa;
    in_id.value = idok;
    in_kelas.value = namakelas;

    ///////////////////////////
    let d_bs64 = dataa.replace(/^.*,/, '');
    let d_fname = "avatar_" + namasiswa.toUpperCase().replace(/\s+/, "_");
    let d_mtp = dataa.match(/^.*(?=;)/)[0];

    let data = new FormData();
    data.append("action", "uploaddulu");
    data.append("filename", d_fname);
    data.append("fileContent", d_bs64);
    data.append("mimeType", d_mtp);
    data.append("kelas", namakelas);


    var url = url_absensiswa + "?action=uploaddulu";
    fetch(url, {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {
            // var inputbase64 = document.createElement("input");
            // inputbase64.setAttribute("name", "fileContent");

            let src = (k.idfile == "") ? "/img/NO+GAGAL.png" : "https://drive.google.com/uc?export=view&id=" + k.idfile;
            class_respon.innerHTML = `<img src="${src}" class="w3-image"/>`;
            if (k.sukses == "Sukses") {
                // document.bantuisi.style.display = "none";
                // document.querySelector(".inginkirim").style.display = "block";
                // thankyou_messagekirim.innerHTML = "Data Siap Dikirim"
                // inputbase64.value = k.idfile;
                in_fileContent.value = k.idfile;
                class_respon.innerHTML += `<br>Poto Berhasil dan siap kirim Absen`;
                showhideabsenbaru("potoberhasil");
            } else {
                // document.bantuisi.style.display = "block";
                // document.querySelector(".inginkirim").style.display = "none";
                // thankyou_messagekirim.innerHTML = "Poto Gagal Masuk, coba lagi ya..."
                // inputbase64.value = srcEncoded;
                showhideabsenbaru("potogagal");
                class_respon.innerHTML += `<br>Poto Gagal terkirim. Silakan Ulangi lagi.`;
            }
            
        }).catch(er => console.log(er));
    ///////////////////////////

}

function tutupmodalabsen(){
    document.getElementById('modalabsencarabeda').style.display='none';
    if (localStream == "") {
        //alert("Mohon tunggu, proses loading sedang berlangsung....");
        return
    }
    localStream.getTracks().forEach(k => k.stop());

}
function showhideabsenbaru(cond){
    let class_kamera = document.querySelector(".forkameraabsen");
    let class_kirim = document.querySelector(".forkirimabsen");
    

    if(cond=="awal"){
        class_kamera.className = class_kamera.className.replace(/w3-hide/,"");
        if(class_kirim.className.indexOf("w3-hide")==-1){
            class_kirim.className += " w3-hide";
        }

        
    }else if(cond=="ambilgambar"){
        if(class_kirim.className.indexOf("w3-hide")==-1){
            class_kirim.className += " w3-hide";
        }
        if(class_kamera.className.indexOf("w3-hide")==-1){
            class_kamera.className += " w3-hide";
        }

    }else if(cond == "potogagal"){
        if(class_kirim.className.indexOf("w3-hide")==-1){
            class_kirim.className += " w3-hide";
        }
        class_kamera.className = class_kamera.className.replace(/w3-hide/,"");

    }else if(cond == "potoberhasil"){
        class_kirim.className = class_kirim.className.replace(/w3-hide/,"");
        if(class_kamera.className.indexOf("w3-hide")==-1){
            class_kamera.className += " w3-hide";
        }

    }else{
        
    }
}
function kirimserver_absenbaru() {
    let el = document.querySelectorAll("[data-absenbaru");
    let ob = {};
    var en = new FormData()
    for(i = 0 ; i < el.length; i++){
        let nm = el[i].getAttribute("data-absenbaru");
        ob[nm] = el[i].value
        en.append(nm, el[i].value)
    }
    
    let class_respon = document.querySelector(".prosesabsenbaru");
    class_respon.innerHTML = `<img src="/img/barloading.gif"/><br>Sedang kirim ke server ....`;
    showhideabsenbaru("ambilgambar");

    var url = url_absensiswa + "?action=siswaabsensiswa";
    fetch(url, {
        method: 'post',
        body: en
    }).then(m => m.json())
        .then(k => {
    
            //console.log(k);
            let imgsiswa = k.kuki.srcImg;

            let kethadir = k.kuki.hadir;
            let tstamp = k.kuki.pukul;
            let ketpukul = "Pukul " + addZero(new Date(tstamp).getHours()) + ":" + addZero(new Date(tstamp).getMinutes()) + ":" + addZero(new Date(tstamp).getSeconds());

            document.querySelector(".avatarsiswa").setAttribute("src", imgsiswa)
            document.querySelector(".ketabsensiswa").innerHTML = kethadir + " " + ketpukul;
            //kuki sudah absen
            setCookie("lamankode", 2);
            setCookie("srcImg", imgsiswa);
            setCookie("kethadir", kethadir);
            setCookie("ketpukul", ketpukul);
            class_respon.innerHTML = "" ;
            tutupmodalabsen();
            tampilinsublamansiswa("aktifsudahabsen")

        })
        .catch(err => {
        //        document.getElementById("thankyou_messagekirim").innerHTML = err;
            setCookie("lamankode", 1)
            tampilinsublamansiswa("aktifbelumabsen")

        })
}

const windowlink = () =>{
    let d1 = document.querySelector("[data-meet=waktumulai]").value;
    let d2 = document.querySelector("[data-meet=waktuakhir]").value;
    // console.log(d1)
    // console.log(d2)
    let t1 = d1.replace(/[-.:]/g,"");
    let t2 = d2.replace(/[-.:]/g,"");
    
    //https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20210821T041500Z %2F 20210821T044500Z
    if(d1 !== "" && d2 !==""){
        let link = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${t1}%2F${t2}`
        window.open(link,'', 'width=900,height=700')
     }else{
        alert("Tentukan waktu mulai/akhir terlebih dahulu");
    }
}
const panggildatagooglemeet = () =>{
    let divpesan = document.querySelector(".pesankhususgurukelas");
    let divpesancenter = document.querySelector(".divumuminmeet");
    let dt = ["idbaris", "waktumulai",	"waktuakhir",	"moderator",	"judul",	"linkmeet",	"status",	"kelaskelas"]
    let key = Object.keys(dt);
    //key.unshift("idbaris");
    let tab = "googlemeet"
    let keyy = JSON.stringify(key);
    
    let datakirim = new FormData();
    datakirim.append("tab",tab);
    datakirim.append("key",keyy);
    
    let url = jlo.url_dataabsen;
    fetch(url+"?action=getpostdatafromtab",{
        method:"post",
        body:datakirim
    }).then(m => m.json())
    .then(r => {
       // console.log(r);
       let d= r.data.filter(s=> s.status !== "Dihapus" && s.kelaskelas.indexOf(namakelas)>-1 && tanggalfull(s.waktumulai)== tanggalfull(new Date()));
       console.log(d);
        if(r.result > 1){
            let html = "";
            let htmll = "";
            if(d.length == 0){
                if(divpesan.className.indexOf("w3-hide")==-1){
                    divpesan.className += " w3-hide";
                }
            }else{
                divpesan.className = divpesan.className.replace(/w3-hide/g,"");
            }
                

            for(i=0;i<d.length;i++){
                html +=`<div class="w3-third w3-border w3-round w3-container">
                <h5>${d[i].judul}</h5>
                <div class="w3-tiny w3-border-bottom w3-border-top">
                Waktu:<br>
                <b class="umuminmeet_waktumulai w3-text-blue">${tanggalfulllengkap(d[i].waktumulai)}</b>
                <br> sampai dengan <br>
                <b class="w3-text-blue">${tanggalfulllengkap(d[i].waktuakhir)}</b>
                <br><br>Moderator: ${d[i].moderator}<br>
                </div><br>
                <a href="${d[i].linkmeet}" target="_blank" class="w3-btn warnaeka w3-border-black w3-border-bottom w3-round-larg umuminmeet_link">Link Google Meet</a>
                <br>atau<br>
                <button onclick="kopipaste('linkmeet${i}')" class="w3-btn warnaeka w3-border-black w3-border-bottom w3-round-larg umuminmeet_link">Salin Link</button>
                <br>
                <br>
                </div>`;
                htmll += `<textarea id="linkmeet${i}" rows="1" cols="1">${d[i].linkmeet}</textarea>`;
            }
            divpesancenter.innerHTML = html;
            document.getElementById("tempattextarea").innerHTML = htmll;
        }else{
            if(divpesan.className.indexOf("w3-hide")==-1){
                divpesan.className += " w3-hide";
            }
        }
    }).catch(er => console.log(er));

};


const kopipaste = (id) => {
   
    var copyText = document.getElementById(id);
    copyText.select();
    copyText.setSelectionRange(0, 999)
    document.execCommand("copy");
    //navigator.clipboard.writeText(copyText.value);
    //alert("Copied the text: " + copyText.value);
    // alert("Berhasil Ngopi ... ^_^");
    //resultuploadpotomateri.innerHTML = "";;
    alert("Berhasil Dicopy ... ^_^");
    
}

//event hendeler document.click
let allInputFile = document.querySelectorAll("input[type=file]")
let tesdv = document.querySelector(".tesconsole")
allInputFile.forEach(el => {
    el.addEventListener("click",()=>{
        // console.log("sedang ngeklik upload/kamera");
        //tesdv.innerHTML +=`Setelan dari klik input awal: ${vis()} (tagperubahan = ${tagPerubahanHidden})<br><br>`;
        tagPerubahanHidden = 0;
        //tesdv.innerHTML +=`Setelan dari klik input dinolkan: ${vis()} (tagperubahan = ${tagPerubahanHidden})<br><br>`;
        
    })
    el.addEventListener("change",()=>{
        tagPerubahanHidden = 0;
        //console.log("Sedang mengeklik input file entah dari label atau input sendiri");
        //tesdv.innerHTML +=`Setelan dari klik input ambil gambar: ${vis()} (tagperubahan = ${tagPerubahanHidden})<br><br>`;
        
        
        // console.log(el.getAttribute("id"));
        // vis(function(){
        //     document.title = vis() ? 'e-LAMASO SISWA' : 'Not visible';
        //     console.log("setelan ketika tombol upload");
        //     console.log(new Date, 'visible ?', vis());
            
        //     // alert("Ananda berusaha meninggalkan edurasa, Jawaban yang Ananda isi sebelumnya akan hilang. Hindari membuka tab/aplikasi lain apalagi untuk browsing/googling ya ...");
        //     // window.location.reload();
        // });

    })
})