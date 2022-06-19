let jsonlocalstorage, jsonlocalstoragetypeuser, linkdatauser;
let linkDataUserWithIdss, linkAbsenKaldik // digunakan untuk link yang mengakses SS DataUSer (guru/siswa)
let namauser, ruangankelas, gmpkelas
let idguru = "",
    idgurubaru = "";
let jsondatasiswa = [],
    arrayStringTglLibur = [];
let idNamaSekolah, idNamaKelas, idGuruKelas, idNipGuruKelas,
    idKepsek, idNipKepsek, idSemester,
    idJenisGuru, idNoWa, idTeksTapel,
    idNamaKepsek, idJenjang;
let REKAPAbsen = {},
    OBJEKHariEfektif;
let obDataRekapKehadiran;
jsonlocalstorage = JSON.parse(localStorage.getItem("inst_id"));
let tagkdserver;
let alltagkdserver;
let jsonabsenkelasperbulan = [];
let idinterval;
let namanamakelasdijenjangini=[];
let allsiswaaktif;
let buateditorkdaktif = [];
let stoploadingtopbar;
const loadingtopbarin = (el) => {
    var elem = document.querySelector("." + el);
    elem.className = elem.className.replace(/\sw3-hide/g, "");
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
    var elem = document.querySelector(".loadingtopbar");
    elem.style.width = "1px";
    let divlod;
    loadingtopbarin("loadingtopbar");
    OBJEKHariEfektif = {
        "Januari": 0,
        "Februari": 0,
        "Maret": 0,
        "April": 0,
        "Mei": 0,
        "Juni": 0,
        "Juli": 0,
        "Agustus": 0,
        "September": 0,
        "Oktober": 0,
        "November": 0,
        "Desember": 0
    };
    obDataRekapKehadiran = {
        "Hadir": 0,
        "Ijin": 0,
        "Sakit": 0,
        "Alpa": 0
    };
    let tgl = new Date();
    let m = tgl.getMonth();
    let sm = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let day = tgl.getDay()
    let y = tgl.getFullYear();
    let string = y + "-" + sm + "-" + d;
    let arraynamaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    let teksbulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];
    htmlhariini.innerHTML = "Kehadiran Hari Ini " + arraynamaHari[day] + ", " + d + " " + teksbulan[m] + " " + y; // + tanggalfull(string)
    jsonlocalstoragetypeuser = JSON.parse(localStorage.getItem("typeuser"));
    namauser = jsonlocalstoragetypeuser.user;
    gmpkelas = jsonlocalstoragetypeuser.akses;
    idguru = jsonlocalstoragetypeuser.idrow;
    idimage = jsonlocalstoragetypeuser.idimg; //
    idgurumapelmapel = jsonlocalstoragetypeuser.room;
    idGuruKelas = jsonlocalstoragetypeuser.user;
    idNipGuruKelas = jsonlocalstoragetypeuser.nip_guru;
    idNamaKepsek = jsonlocalstoragetypeuser.nama_kepsek;
    idNipKepsek = jsonlocalstoragetypeuser.nip_kepsek;
    idJenisGuru = jsonlocalstoragetypeuser.akses;
    idNoWa = jsonlocalstoragetypeuser.no_wa;
    idSemester = jsonlocalstoragetypeuser.idsemester;
    idTeksTapel = jsonlocalstoragetypeuser.tekstapel;
    jsonlocalstorage = JSON.parse(localStorage.getItem("inst_id"));
    linkDataUserWithIdss = jsonlocalstorage.url_datauser + "?idss=" + jsonlocalstorage.ss_datauser;
    linkAbsenKaldik = jsonlocalstorage.url_dataabsen + "?idss=" + jsonlocalstorage.ss_dataabsen;
    url_absenkaldik = jsonlocalstorage.url_dataabsen + "?action=datakaldik&idss=" + jsonlocalstorage.ss_dataabsen
    let idInstansi = JSON.parse(localStorage.getItem("inst_id"));
    idNamaSekolah = idInstansi.namainstansi;
    // loadingAPI.style.display = "block";
    // infoloadingAPI.innerHTML = "Sedang memproses Kalender Pendidikan ..."
    //
    await fetch(url_absenkaldik).then(m => m.json()).then(k => {
        localStorage.setItem('Kaldik', JSON.stringify(k.records));
        localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl))

        arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
        arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));
        // loadingAPI.style.display = "none";
        // infoloadingAPI.innerHTML = "";

    }).catch(er => {
        console.log("muat ulang: " + er);
        //infoloadingAPI.innerHTML = "Ups, maaf. Terjadi Kesalahan... Coba lagi ya ...."
    });

    namasekolah.innerHTML = namauser;
    namakota.innerHTML = gmpkelas + " " + idgurumapelmapel;
    var logo = document.getElementById("logosekolahmenu");
    logo.setAttribute("src", "https://drive.google.com/uc?export=view&id=" + idimage);
    logo.setAttribute("alt", "Poto Guru");
    logo.setAttribute("style", "width:90px; height:90px");

    if (navigator.storage && navigator.storage.estimate) {
        const quota = await navigator.storage.estimate();
        const percentageUsed = (quota.usage / quota.quota) * 100;
        console.log(`You've used ${percentageUsed}% of the available storage.`);
        const remaining = quota.quota - quota.usage;
        console.log(`You can write up to ${remaining} more bytes.`);
    }
    dashboardgurukelas.innerHTML = idJenisGuru + " " + idgurumapelmapel + " ( " + namauser + " )";
    let gmpbuatselectrombeol = document.createElement("option");
    gmpbuatselectrombeol.setAttribute("id", "awal");
    gmpbuatselectrombeol.setAttribute("value", "none")
    let teks = document.createTextNode("PILIH KELAS")
    gmpbuatselectrombeol.appendChild(teks)
    gmppilihrombel.innerHTML = "";
    gmppilihrombel.appendChild(gmpbuatselectrombeol);
    // loadingAPI.style.display = "block";
    // infoloadingAPI.innerHTML = "Sedang memproses Identitas Guru"

    await fetch(linkDataUserWithIdss + "&action=profilguru&id=" + idguru)
        .then(m => m.json())
        .then(k => {
            let gmpdataguru = k.profil[0].kelasampu.replace(/\s+/g, "").split(",")
            for (let a = 0; a < gmpdataguru.length; a++) {
                gmpbuatselectrombeol = document.createElement("option");
                gmpbuatselectrombeol.setAttribute("id", "memilihkelas_" + gmpdataguru[a]);
                gmpbuatselectrombeol.setAttribute("value", gmpdataguru[a])
                let teks = document.createTextNode("KELAS " + gmpdataguru[a])
                gmpbuatselectrombeol.appendChild(teks)
                gmppilihrombel.appendChild(gmpbuatselectrombeol);
            }
            // loadingAPI.style.display = "";
            // infoloadingAPI.innerHTML = "";

        })
        .catch(er => {
            console.log(er)
            // loadingAPI.style.display = "block";
            // infoloadingAPI.innerHTML = "Ups, Terjadi Kesalahan. Silakan coba lagi nanti. <br>Kode Eror: " + er
        });
    clearInterval(stoploadingtopbar);
    divlod = document.querySelector(".loadingtopbar");
    divlod.style.width = "100%";
    setTimeout(() => {
        divlod.style.width = "1px"
        divlod.className += " w3-hide";

    }, 3000);
})();

const fngmppilihrombel = async () => {
    loadingtopbarin("loadingtopbar");
    let x = document.getElementById("gmppilihrombel").selectedIndex;
    let y = document.getElementById("gmppilihrombel").options;
    ruangankelas = y[x].value
    idNamaKelas = y[x].value;
    idJenjang = y[x].value.slice(0, 1); //y[x].value.match(/(\d+)/)[0];
    let ddurl = "url_nilaikelas" + idJenjang;
    constlinknilai = jlo[ddurl];
    constpreviewljk = jlo[ddurl];
    url_absensiswa = jlo['absen' + idJenjang];

    // await fetch(linkDataUserWithIdss + "&action=datasiswaaktif&kelas=" + ruangankelas)
    await fetch(linkDataUserWithIdss + "&action=datakelasaktifall")
        .then(m => m.json())
        .then(k => {
            let arrsiswakelasini = k.datasiswa.filter(s=> s.nama_rombel == ruangankelas);
            // jsondatasiswa = k.datasiswa;
            allsiswaaktif = k;
            namanamakelasdijenjangini = allsiswaaktif.datasiswa.filter(d=> d.jenjang == idJenjang).map(s=>s.nama_rombel).filter((s,i,a)=>a.indexOf(s)==i).sort()

            let ob = {"datasiswa": arrsiswakelasini} ;
            jsondatasiswa =arrsiswakelasini; 
            localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(ob));

            //jsondatasiswa = k.datasiswa;
            //localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(k));
            tabeldatakelassaya();
        }).catch(er => {
            console.log("muat ulang lagi: " + er);
        });;

    await panggildatagooglemeet();   

    await buattabelrekapsemester();
    clearInterval(stoploadingtopbar);
    divlod = document.querySelector(".loadingtopbar");
    divlod.style.width = "100%";
    setTimeout(() => {
        divlod.style.width = "1px"
        divlod.className += " w3-hide";

    }, 3000);
}

const fngmppilihrombeldiamdiam = async () => {
    loadingtopbarin("loadingtopbar");
    document.getElementById("gmppilihrombel").selectedIndex = 1;
    let x = 1;//
    let y = document.getElementById("gmppilihrombel").options;
    ruangankelas = y[x].value
    idNamaKelas = y[x].value;
    idJenjang = y[x].value.slice(0, 1); //y[x].value.match(/(\d+)/)[0];
    let ddurl = "url_nilaikelas" + idJenjang;
    constlinknilai = jlo[ddurl];
    constpreviewljk = jlo[ddurl];
    await fetch(linkDataUserWithIdss + "&action=datasiswaaktif&kelas=" + ruangankelas)
        .then(m => m.json())
        .then(k => {

            jsondatasiswa = k.datasiswa;
            localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(k));

        }).catch(er => {
            console.log("muat ulang lagi: " + er);
        });;



    await buattabelrekapsemester();
    clearInterval(stoploadingtopbar);
    divlod = document.querySelector(".loadingtopbar");
    divlod.style.width = "100%";
    setTimeout(() => {
        divlod.style.width = "1px"
        divlod.className += " w3-hide";

    }, 3000);
}

const updateDatasiswa = () => {
    loadingAPI.style.display = "block";
    infoloadingAPI.innerHTML = "Sedang memproses Update Data Siswa ..."
    fetch(linkDataUserWithIdss + "&action=datasiswaaktif&kelas=" + ruangankelas)
        .then(m => m.json())
        .then(k => {
            loadingAPI.style.display = "none";
            infoloadingAPI.innerHTML = ""
            jsondatasiswa = k.datasiswa;
            localStorage.setItem("datasiswa", JSON.stringify(k));
        }).catch(er => {
            infoloadingAPI.innerHTML = "Maaf, Terjadi Kesalahan. Coba lagi nanti. <br>brs : 254<br> kode : " + er
        })
}

function updatetabeldatakelassaya() { // Versi ngambil data dari TAB SPREADSHEET .... coba versi ngambil data dari NOTEPAD
    loadkelassaya.innerHTML = "<i class='fa fa-spinner fa-spin w3-xxxlarge'></i>";
    var tempattabel = document.getElementById("tabeltempatdaftarkelassaya");
    tempattabel.innerHTML = "";
    tempattabel.innerHTML = "<h3>Daftar Siswa Kelas " + ruangankelas + "</div>";

    var tb = document.createElement("table")
    tb.setAttribute("class", "versi-table");
    tb.setAttribute("id", "myTable");
    var tr = tb.insertRow(0);
    var td2 = document.createElement("th");
    td2.innerHTML = "No. Urut";
    tr.appendChild(td2);
    var td1 = document.createElement("th");
    td1.innerHTML = "Token siswa";
    tr.appendChild(td1);
    var td4 = document.createElement("th");
    td4.innerHTML = "No Induk Sekolah";
    tr.appendChild(td4);
    var td7 = document.createElement("th");
    td7.innerHTML = "N I S N";
    tr.appendChild(td7);
    var td5 = document.createElement("th");
    td5.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;");
    td5.innerHTML = "Nama Siswa";
    tr.appendChild(td5);
    var td6 = document.createElement("th");
    td6.innerHTML = "Jenis Kelamin";
    tr.appendChild(td6);
    var td3 = document.createElement("th");
    td3.innerHTML = "Agama";
    tr.appendChild(td3);
    var td11 = document.createElement("th");
    var td8 = document.createElement("th");
    td8.innerHTML = "Tempat Lahir";
    tr.appendChild(td8);
    var td9 = document.createElement("th");
    td9.innerHTML = "Tanggal Lahir";
    tr.appendChild(td9);
    td11.innerHTML = "Nama Ayah";
    tr.appendChild(td11);
    var td12 = document.createElement("th");
    td12.innerHTML = "Nama Ibu";
    tr.appendChild(td12);
    var td10 = document.createElement("th");
    td10.innerHTML = "Alamat";
    tr.appendChild(td10);
    var td14 = document.createElement("th");
    td14.innerHTML = "No HP";
    tr.appendChild(td14);
    let umur6tahun = 0;
    let umurP6tahun = 0;
    let umur7tahun = 0;
    let umurP7tahun = 0;
    let umur13tahun = 0;
    let umurP13tahun = 0;
    for (var i = 0; i < jsondatasiswa.length; i++) {
        let umur = umure(jsondatasiswa[i].pd_tanggallahir)
        let umurtahun = umur.tahun;
        if (umurtahun <= 6 && jsondatasiswa[i].pd_jk == "L") {
            umur6tahun += 1;
        }
        if (umurtahun >= 7 && umurtahun <= 12 && jsondatasiswa[i].pd_jk == "L") {
            umur7tahun++;
        }
        if (umurtahun >= 13 && jsondatasiswa[i].pd_jk == "L") {
            umur13tahun += 1;
        }
        if (umurtahun <= 6 && jsondatasiswa[i].pd_jk == "P") {
            umurP6tahun += 1;
        }
        if (umurtahun >= 7 && umurtahun <= 12 && jsondatasiswa[i].pd_jk == "P") {
            umurP7tahun += 1;
        }
        if (umurtahun >= 13 && jsondatasiswa[i].pd_jk == "P") {
            umurP13tahun += 1;
        }
        tr = tb.insertRow(-1);
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = (i * 1) + 1; // nourut (1)
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].id;
        // var btnn = document.createElement("button");
        // btnn.setAttribute("onclick", "alert('Maaf, hanya bisa diakses guru kelas')");
        // btnn.innerHTML = "Edit";
        // var btnnn = document.createElement("button");
        // btnnn.setAttribute("onclick", "alert('Maaf, hanya bisa diakses Guru Kelas')");
        // btnnn.innerHTML = "Hapus";
        // tabcell.appendChild(btnn);
        // tabcell.appendChild(btnnn); // ------------> isi sel tombol(2)
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].nis; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].nisn; //
        var tabcell = tr.insertCell(-1);
        tabcell.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;");
        tabcell.innerHTML = jsondatasiswa[i].pd_nama.toUpperCase(); // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_jk; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_agama; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_tl; // 
        var tabcell = tr.insertCell(-1)
        var da = jsondatasiswa[i].pd_tanggallahir || "";
        tabcell.innerHTML = da ? tanggalfull(jsondatasiswa[i].pd_tanggallahir) : "";
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_namaayah; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_namaibu; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_alamat; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_hp; // 
    }
    tbljumlahsiswa.innerHTML = jsondatasiswa.length;
    tbljumlahlakilaki.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
            return true;
        }
    }).length;
    tbljumlahperempuan.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
            return true;
        }
    }).length;
    usiaL6tahun.innerHTML = umur6tahun;
    usiaP6tahun.innerHTML = umurP6tahun;
    usiaL7tahun.innerHTML = umur7tahun;
    usiaP7tahun.innerHTML = umurP7tahun;
    usiaL13tahun.innerHTML = umur13tahun;
    usiaP13tahun.innerHTML = umurP13tahun;
    tblberagamaislam.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
            return true;
        }
    }).length;
    tblberagamakristen.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KRISTEN" ||
            lk.pd_agama == "Kristen" ||
            lk.pd_agama == "kristen" ||
            lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
            return true;
        }
    }).length;
    tblberagamakatholik.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
            return true;
        }
    }).length;
    tblberagamahindu.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
            return true;
        }
    }).length;
    tblberagamabudha.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
            return true;
        }
    }).length;
    tblberagamaislamL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length;
    tblberagamakristenL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KRISTEN" ||
            lk.pd_agama == "Kristen" ||
            lk.pd_agama == "kristen" ||
            lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length;
    tblberagamakatholikL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length;
    tblberagamahinduL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length;
    tblberagamabudhaL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length;
    tblberagamaislamP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length;
    tblberagamakristenP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KRISTEN" ||
            lk.pd_agama == "Kristen" ||
            lk.pd_agama == "kristen" ||
            lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length;
    tblberagamakatholikP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length;
    tblberagamahinduP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length;
    tblberagamabudhaP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length;
    loadkelassaya.innerHTML = "";
    tempattabel.appendChild(tb);
    var btnx = document.createElement("hr");
    btnx.setAttribute("style", "border-top:1px solid blue");
    tempattabel.appendChild(btnx);
}

function tabeldatakelassaya() { // Versi ngambil data dari TAB SPREADSHEET .... coba versi ngambil data dari NOTEPAD
    let valuekelas = document.getElementById("gmppilihrombel").value;
    if (valuekelas == "none") {
        alert("Anda belum memilih kelas. Silakan pilih Kelas terlebih dulu")
        return
    }
    tampilinsublamangurukelas("datakelas");
    loadkelassaya.innerHTML = "<i class='fa fa-spinner fa-spin w3-xxxlarge'></i>";
    var tempattabel = document.getElementById("tabeltempatdaftarkelassaya");
    tempattabel.innerHTML = "";
    tempattabel.innerHTML = "<h3>Daftar Siswa Kelas " + ruangankelas + "</div>";
    var tb = document.createElement("table")
    tb.setAttribute("class", "versi-table");
    tb.setAttribute("id", "myTable");
    let thead = tb.createTHead();
    var tr = thead.insertRow(0);
    var td2 = document.createElement("th");
    td2.innerHTML = "No. Urut";
    tr.appendChild(td2);
    var td1 = document.createElement("th");
    td1.innerHTML = "Token";
    tr.appendChild(td1);
    var td4 = document.createElement("th");
    td4.innerHTML = "No Induk Sekolah";
    tr.appendChild(td4);
    var td7 = document.createElement("th");
    td7.innerHTML = "N I S N";
    tr.appendChild(td7);
    var td5 = document.createElement("th");
    td5.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;");
    td5.innerHTML = "Nama Siswa";
    tr.appendChild(td5);
    var td6 = document.createElement("th");
    td6.innerHTML = "Jenis Kelamin";
    tr.appendChild(td6);
    var td3 = document.createElement("th");
    td3.innerHTML = "Agama";
    tr.appendChild(td3);
    var td11 = document.createElement("th");
    var td8 = document.createElement("th");
    td8.innerHTML = "Tempat Lahir";
    tr.appendChild(td8);
    var td9 = document.createElement("th");
    td9.innerHTML = "Tanggal Lahir";
    tr.appendChild(td9);
    td11.innerHTML = "Nama Ayah";
    tr.appendChild(td11);
    var td12 = document.createElement("th");
    td12.innerHTML = "Nama Ibu";
    tr.appendChild(td12);
    var td10 = document.createElement("th");
    td10.innerHTML = "Alamat";
    tr.appendChild(td10);
    var td14 = document.createElement("th");
    td14.innerHTML = "No HP";
    tr.appendChild(td14);
    let umur6tahun = 0;
    let umurP6tahun = 0;
    let umur7tahun = 0;
    let umurP7tahun = 0;
    let umur13tahun = 0;
    let umurP13tahun = 0;
    let tbody = tb.createTBody();
    for (var i = 0; i < jsondatasiswa.length; i++) {
        let umur = umure(jsondatasiswa[i].pd_tanggallahir)
        let umurtahun = umur.tahun;
        if (umurtahun <= 6 && jsondatasiswa[i].pd_jk == "L") {
            umur6tahun += 1;
        }
        if (umurtahun >= 7 && umurtahun <= 12 && jsondatasiswa[i].pd_jk == "L") {
            umur7tahun++;
        }
        if (umurtahun >= 13 && jsondatasiswa[i].pd_jk == "L") {
            umur13tahun += 1;
        }
        if (umurtahun <= 6 && jsondatasiswa[i].pd_jk == "P") {
            umurP6tahun += 1;
        }
        if (umurtahun >= 7 && umurtahun <= 12 && jsondatasiswa[i].pd_jk == "P") {
            umurP7tahun += 1;
        }
        if (umurtahun >= 13 && jsondatasiswa[i].pd_jk == "P") {
            umurP13tahun += 1;
        }
        tr = tbody.insertRow(-1);
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = (i * 1) + 1; // nourut (1)
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].id;
        // var btnn = document.createElement("button");
        // btnn.setAttribute("onclick", "alert('Maaf, hanya bisa diakses guru kelas')");
        // btnn.innerHTML = "Edit";
        // var btnnn = document.createElement("button");
        // btnnn.setAttribute("onclick", "alert('Maaf, hanya bisa diakses Guru Kelas')");
        // btnnn.innerHTML = "Hapus";
        // tabcell.appendChild(btnn);
        // tabcell.appendChild(btnnn); // ------------> isi sel tombol(2)
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].nis; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].nisn; //
        var tabcell = tr.insertCell(-1);
        tabcell.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;");
        tabcell.innerHTML = jsondatasiswa[i].pd_nama.toUpperCase(); // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_jk; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_agama; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_tl; // 
        var tabcell = tr.insertCell(-1)
        var da = jsondatasiswa[i].pd_tanggallahir || "";
        tabcell.innerHTML = da ? tanggalfull(jsondatasiswa[i].pd_tanggallahir) : "";
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_namaayah; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_namaibu; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_alamat; // 
        var tabcell = tr.insertCell(-1)
        tabcell.innerHTML = jsondatasiswa[i].pd_hp; // 
    }
    tbljumlahsiswa.innerHTML = jsondatasiswa.length;
    tbljumlahlakilaki.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
            return true;
        }
    }).length;
    tbljumlahperempuan.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
            return true;
        }
    }).length;
    usiaL6tahun.innerHTML = umur6tahun;
    usiaP6tahun.innerHTML = umurP6tahun;
    usiaL7tahun.innerHTML = umur7tahun;
    usiaP7tahun.innerHTML = umurP7tahun;
    usiaL13tahun.innerHTML = umur13tahun;
    usiaP13tahun.innerHTML = umurP13tahun;
    umur6total.innerHTML = jsondatasiswa.filter(s => umure(s.pd_tanggallahir).tahun <= 6).length;
    umur7total.innerHTML = jsondatasiswa.filter(s => umure(s.pd_tanggallahir).tahun >= 7 && umure(s.pd_tanggallahir).tahun <= 12).length;
    umur13total.innerHTML = jsondatasiswa.filter(s => umure(s.pd_tanggallahir).tahun >= 13).length;

    tblberagamaislam.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
            return true;
        }
    }).length;
    tblberagamakristen.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KRISTEN" ||
            lk.pd_agama == "Kristen" ||
            lk.pd_agama == "kristen" ||
            lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
            return true;
        }
    }).length;
    tblberagamakatholik.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
            return true;
        }
    }).length;
    tblberagamahindu.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
            return true;
        }
    }).length;
    tblberagamabudha.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
            return true;
        }
    }).length;
    tblberagamaislamL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length;
    tblberagamakristenL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KRISTEN" ||
            lk.pd_agama == "Kristen" ||
            lk.pd_agama == "kristen" ||
            lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length;
    tblberagamakatholikL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length;
    tblberagamahinduL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length;
    tblberagamabudhaL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
            if (lk.pd_jk == "Laki-laki" || lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length;
    tblberagamaislamP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length;
    tblberagamakristenP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KRISTEN" ||
            lk.pd_agama == "Kristen" ||
            lk.pd_agama == "kristen" ||
            lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length;
    tblberagamakatholikP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length;
    tblberagamahinduP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length;
    tblberagamabudhaP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length;
    tblberagamakhonghucuP.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KHONGHUCU" || lk.pd_agama == "Khonghucu" || lk.pd_agama == "konghucu" || lk.pd_agama == "KHONG HU CU" || lk.pd_agama == "khong hucu") {
            if (lk.pd_jk == "Perempuan" || lk.pd_jk == "PEREMPUAN" || lk.pd_jk == "P") {
                return true;
            }
        }
    }).length;
    tblberagamakhonghucuL.innerHTML = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KHONGHUCU" || lk.pd_agama == "Khonghucu" || lk.pd_agama == "konghucu" || lk.pd_agama == "KHONG HU CU" || lk.pd_agama == "khong hucu") {
            if (lk.pd_jk == "LAKI-LAKI" || lk.pd_jk == "Laki-laki" || lk.pd_jk == "L") {
                return true;
            }
        }
    }).length;
    loadkelassaya.innerHTML = "";

    tempattabel.appendChild(tb);
    var btnx = document.createElement("hr");
    btnx.setAttribute("style", "border-top:1px solid blue");
    tempattabel.appendChild(btnx);
}


function tampilinsublamangurukelas(fitur) {
    let div = document.getElementById("batasaksesguru")
    let y = div.offsetTop - 45;
    if (fitur == "datakelas") {
        datakelassaya.style.display = "block";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataframekreatif.style.display = "none";
        divgooglemeet.style.display = "none";
        divgaleri.style.display = "none";
        id_admguru.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (fitur == "absen") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "block";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataframekreatif.style.display = "none";
        divgooglemeet.style.display = "none";
        divgaleri.style.display = "none";
        id_admguru.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
        alert("ini")

    } else if (fitur == "pembelajaran") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "block";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataframekreatif.style.display = "none";
        divgooglemeet.style.display = "none";
        upload_materi.style.display = "none";
        divgaleri.style.display = "none";
        id_admguru.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (fitur == "kurikulum") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "block";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        divgooglemeet.style.display = "none";
        dataframekreatif.style.display = "none";
        divgaleri.style.display = "none";
        id_admguru.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (fitur == "mapel") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "block";
        datakehadiranguru.style.display = "none";
        dataframekreatif.style.display = "none";
        divgooglemeet.style.display = "none";
        divgaleri.style.display = "none";
        id_admguru.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (fitur == "kehadiranguru") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "block";
        divgooglemeet.style.display = "none";
        dataframekreatif.style.display = "none";
        divgaleri.style.display = "none";
        id_admguru.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (fitur == "meme") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        divgooglemeet.style.display = "none";
        dataframekreatif.style.display = "block";
        divgaleri.style.display = "none";
        id_admguru.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (fitur == "galery") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        divgooglemeet.style.display = "none";
        dataframekreatif.style.display = "none";
        divgaleri.style.display = "block";
        id_admguru.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    }  else if (fitur == "beranda") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        divgooglemeet.style.display = "none";
        dataframekreatif.style.display = "none";
        divgaleri.style.display = "none";
        id_admguru.style.display = "none";
        window.scrollTo({ top: 43, behavior: 'smooth' });
    }else if (fitur == "googlemeet") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataframekreatif.style.display = "none";
        divgaleri.style.display = "none";
        divgooglemeet.style.display = "block";
        v
        window.scrollTo({ top: y, behavior: 'smooth' });

    }else if (fitur == "administrasiguru") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataframekreatif.style.display = "none";
        divgaleri.style.display = "none";
        divgooglemeet.style.display = "none";
        id_admguru.style.display = "block";
        window.scrollTo({ top: y, behavior: 'smooth' });

    }

    w3_close();
}




const profilguru = async () => {
    modaledituser.style.display = "block";
    formedituser.style.display = "block";
    prosesloadingdaftaredit.innerHTML = ""; //<i class='fa fa-spin fa-spinner w3-xxxlarge'><i> sedang mencari data Anda..";
    registrasikanedit.style.display = "block";
    judulpetunjukedit.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxxlarge'><i>"
    w3_close();
    loadingAPI.style.display = "block";
    infoloadingAPI.innerHTML = "Sedang memproses Profil Guru ..."
    await fetch(linkDataUserWithIdss + "&action=profilguru&id=" + idguru)
        .then(m => m.json())
        .then(k => {
            let obj = k.profil[0];
            let key = Object.keys(obj); // key == header
            let nilai = Object.keys(obj).map(m => obj[m]);
            var elementform = document.getElementById("formedituser").elements;
            for (x = 0; x < elementform.length; x++) {
                if (elementform[x].type !== "file") {
                    for (d = 0; d < key.length; d++) {
                        if (elementform[x].name == key[d]) {
                            if (elementform[x].name == "password") {
                                elementform[x].value = nilai[d] //;
                            } else {
                                elementform[x].value = nilai[d]
                            };
                        }
                    }
                }
            }
            document.getElementById("avatarkuedit").removeAttribute("src");
            document.getElementById("avatarkuedit").setAttribute("src", "https://drive.google.com/uc?export=view&id=" + nilai[13]);
            judulpetunjukedit.innerHTML = "Profil Guru";
            loadingAPI.style.display = "none";
            infoloadingAPI.innerHTML = ""
        }).catch(er => {
            infoloadingAPI.innerHTML = "Maaf, terjadi kesalahan. Coba lagi nanti.<br>row : 958 <br>kode : " + er
        })
}

function logout() {
    tabeltempatdaftarkelassaya.innerHTML = "";
    w3_close();
    window.localStorage.clear();
    window.location.replace("/index.html")
}

async function pembelajaran() {
    let valuekelas = document.getElementById("gmppilihrombel").value;
    if (valuekelas == "none") {
        alert("Anda belum memilih kelas. Silakan pilih kelas terlebih dahulu Anda.***")

        return

    }
    loadingtopbarin("loadingtopbar");
    await kurikulumdiamdiam();

    tampilinsublamangurukelas("pembelajaran");
    timelinekbm.style.display = "block";


    fetch(linkmateri + "&action=kronolog&idtoken=" + idJenjang)
        .then(m => m.json())
        .then(j => {

            let kk = j.result.filter(k => k.kuncikd.indexOf(idgurumapelmapel + "_") > -1)
            kronologijson = kk;
            templatekronologi(kk);
            tombolpublikasikan.setAttribute("onclick", "publikasikanmateribaru()")
            tombolpublikasikan.removeAttribute("class"); //.wa w3-deep-purple w3-hover-aqua);
            tombolpublikasikan.setAttribute("class", "wa w3-deep-purple w3-hover-aqua");
            tombolpublikasikan.innerHTML = "PUBLIKASIKAN";
            clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
            setTimeout(() => {
                divlod.style.width = "1px"
                divlod.className += " w3-hide";

            }, 3000);

        }).catch(er => {
            loadingAPI.style.display = "block";
            console.log(er)
            infoloadingAPI.innerHTML = "Maaf, terjadi kesalahan. Coba lagi nanti. <br>row : 991<br>kode : " + er
        })
        let tab = "banksoal"
        let tabel = [[["idbaris"]]];
        let head = tabel[0];
        let key = JSON.stringify(head);
        let datakirim = new FormData();
        
        datakirim.append("tab",tab);
        datakirim.append("key",key);
        fetch(url_kaldikaja+"?action=getpostdatafromtab",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
            // p_pilihbentuksoal.innerHTML = `Pilih Bentuk Soal:`;
           //console.log(r);
           databasesoalkosong = [];
           keydatabasesoal = Object.keys(r.data[0]);
           if(r.result>1){
               databasesoal = r.data.filter(s=> s.hapus == "");
               databasesoalterhapus = r.data.filter(s=> s.hapus == "hapus");
           }
           for(i=0 ; i < keydatabasesoal.length; i++){
               databasesoalkosong[keydatabasesoal[i]]="";
           }
        }).catch(er=>console.log(er));
}
function templatekronologi(jsonmateri) {
    let temp = `<div class="kronologi">`
    for (let i = jsonmateri.length - 1; i >= 0; i--) {
        let idtgl = tanggalfull(jsonmateri[i].idtgl);
        let judulmateri = jsonmateri[i].idmapel;
        let kelasmateri = jsonmateri[i].idkelas;
        let waktuawal = jsonmateri[i].idtgl;
        let waktuakhir = jsonmateri[i].idtglend;
        let jenistgh = jsonmateri[i].jenistagihan;
        let akses = jsonmateri[i].idaksessiswa;
        let jpg = jsonmateri[i].jumlahpg;
        let jess = jsonmateri[i].jumlahessay;
        let jeniskbm = (akses == "sekali") ? "ULANGAN <br><sub>Menerima Tugas Siswa</sub>" : "LATIHAN<br><sub>Tidak Menerima Tugas</sub>";
        let jenispenilaian = (akses == "sekali") ? jenistgh : "<sub class='w3-text-red'>-Tidak Menerima Nilai-</sub>";
        let tombolnilai = (akses == "sekali") ? `<button class="w3-button w3-teal w3-hover-sepia" onclick="daftarnilaikronologi('${i}')"><i class="fa fa-graduation-cap"></i></button>` : "Tidak Menerima ";
        let oleh = jsonmateri[i].dibuatoleh;
        let aksi = jsonmateri[i].action;
        let buatapaedit = (aksi == "uploadmateri") ? "Dibuat oleh:" : "Diedit oleh";
        let tmblprev = `<button class="w3-button w3-blue w3-hover-red" onclick="previewkronologi('${i}')"><i class="fa fa-eye"></i></button>`;
        let tmbledit = `<button class="w3-button w3-green  w3-blue w3-hover-red" onclick="editkronologi('${i}')"><i class="fa fa-edit"></i></button>`;
        let editfilemateri = `<button class="w3-button w3-red  w3-blue w3-hover-red" onclick="editfilemateri('${i}')"><i class="fa fa-edit"></i></button>`;
        let adacrtToken = jsonmateri[i].crtToken;
        let statuscrtToken = (adacrtToken == "") ? `<b class='w3-text-red'>&times; Tidak Tampil </b><br>(Waktu Awal gagal menggenerate)<br><button class='w3-button w3-black w3-hover-white' onclick="fnv7perbaikikonten('${i}')"><i class='fa fa-clock-o'></i> Perbaiki</button>` : "<b class='w3-text-blue' >&checkmark; Tampil di siswa </b> dengan kode Token " + adacrtToken;
        let statusijinkonten = (jsonmateri[i].idpendaftar == "") ? `<b class='w3-text-blue w3-hover-cyan'>&checkmark; Diijinkan</b><br><button class='w3-red w3-button w3-hover-blue' onclick="ubahijinpublik('${i}')">Privat</button>` : `<b class='w3-text-red'>&times; Tidak diijinkan</br><button class='w3-blue w3-button w3-hover-cyan'  onclick="ubahijinpublik('${i}')">Ijinkan</button>`;

        if (i % 2 == 0) { //klo genap
            temp += `<div class="isi kiri"> 
            <div class="konten">
            <i class="fa fa-trash-o w3-hover-red w3-right w3-xxlarge" onclick="fnv7hapusmateri('${i}')" title="Hapus Materi Ini"></i>

                        <h3>${judulmateri.toUpperCase()}</h3>
                        <div style="overflow-x:auto">
                        <table class="w3-table-all w3-card-4 w3-hoverable w3-small">
                            <tr>
                                <td>
                                    Jenis KBM:
                                </td>
                                <td>    
                                    ${jeniskbm} 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Jenis Penilaian:
                                </td>
                                <td>    
                                    ${jenispenilaian}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Waktu Mulai:
                                </td>
                                <td>    
                                    ${tanggalfulllengkap(new Date(waktuawal))}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Waktu Akhir:
                                </td>
                                <td>    
                                    ${tanggalfulllengkap(new Date(waktuakhir))}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                  Jumlah Soal PG:
                                </td>
                                <td>    
                                    ${jpg}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                  Jumlah Soal Essay:
                                </td>
                                <td>    
                                    ${jess}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   ${buatapaedit}:
                                </td>
                                <td>    
                                    ${oleh}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Pratinjau:
                                </td>
                                <td>    
                                    ${tmblprev}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Edit Akses:
                                </td>
                                <td>    
                                    ${tmbledit}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Edit Konten Materi:
                                </td>
                                <td>    
                                    ${editfilemateri}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Lihat Nilai Siswa:
                                </td>
                                <td>    
                                    ${tombolnilai}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Baris Database Materi:
                                </td>
                                <td>    
                                    ${jsonmateri[i].idbaris}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Status di e-Lamaso Siswa:
                                </td>
                                <td>    
                                    ${statuscrtToken}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Sekolah Lain Boleh Meniru ini
                                </td>
                                <td>    
                                    ${statusijinkonten}
                                </td>
                            </tr>
                        </table>
                        </div>
                    </div>
                </div>`

        } else {
            temp += `<div class="isi kanan" style="overflow-x:auto">

            <div class="konten">
            <i class="fa fa-trash-o w3-hover-red w3-right w3-xxlarge" onclick="fnv7hapusmateri('${i}')" title="Hapus Materi Ini"></i>
                        <h3>${judulmateri.toUpperCase()}</h3>
                        <div style="overflow-x:auto">
                        <table class="w3-table-all w3-card-4 w3-hoverable w3-small">
                            <tr>
                                <td>
                                    Jenis KBM:
                                </td>
                                <td>    
                                    ${jeniskbm} 
                            </tr>
                            <tr>
                                <td>
                                    Jenis Penilaian:
                                </td>
                                <td>    
                                    ${jenispenilaian}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Waktu Mulai:
                                </td>
                                <td>    
                                    ${tanggalfulllengkap(new Date(waktuawal))}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Waktu Akhir:
                                </td>
                                <td>    
                                    ${tanggalfulllengkap(new Date(waktuakhir))}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                  Jumlah Soal PG:
                                </td>
                                <td>    
                                    ${jpg}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                  Jumlah Soal Essay:
                                </td>
                                <td>    
                                    ${jess}
                                </td>
                            </tr>
                             <tr>
                                <td>
                                   ${buatapaedit}:
                                </td>
                                <td>    
                                    ${oleh}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Pratinjau:
                                </td>
                                <td>    
                                    ${tmblprev}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Edit Akses:
                                </td>
                                <td>    
                                    ${tmbledit}
                                </td>
                            </tr>
                            <tr>
                            <td>
                               Edit Konten Materi:
                            </td>
                            <td>    
                                ${editfilemateri}
                            </td>
                        </tr>

                            <tr>
                                <td>
                                   Lihat Nilai Siswa:
                                </td>
                                <td>    
                                    ${tombolnilai}
                                </td>
                            </tr><tr>
                            <td>
                               Baris Database Materi:
                            </td>
                            <td>    
                                ${jsonmateri[i].idbaris}
                            </td>
                        </tr>
                            <tr>
                                <td>
                                   Status di e-Lamaso Siswa:
                                </td>
                                <td>    
                                    ${statuscrtToken}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                   Sekolah Lain Boleh Meniru ini
                                </td>
                                <td>    
                                    ${statusijinkonten}
                                </td>
                            </tr>
                        </table>
                        </div>
                    </div>
                </div>`
        }
    }
    temp += `</div>`

    timelinekbm.innerHTML = `<button class="w3-button w3-red w3-hover-blue w3-round-large" onclick="fnv7kotenmateridihapusmapel('${idJenjang}')"> Daftar Materi yang dihapus</button><hr><h4>Materi di Jenjang Kelas Anda yang dipublikasikan:</h4>` + temp;
}
function raportkelas() {
    alert("Maaf, fitur belum tersedia")
}
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
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

const animasimove = (el) => {
    var elem = document.querySelector("." + el);
    var width = 1;
    idinterval = setInterval(frame, 10);

    function frame() {
        if (width >= 8000) {
            clearInterval(idinterval);
            // elem.style.width = 0;
            // elem.style.width = 90 + '%';
            // elem.innerHTML = `100%`;
        } else {
            width += 10;
            elem.style.width = width / 10 + '%';
            elem.innerHTML = (width / 105).toFixed(0) + "% ";
        }
    }

};

//////////////////// source GMP.js
function editsiswa(id) { //menampilkan modal saat user mengeklik salah satu nama di tabel data kelas
    let bt = document.getElementById("tomboledithapus")
    bt.setAttribute("onclick", "kirimeditsiswa()")
    modal_edit_siswa.style.display = "block";
    modaledithapus.style.display = "block";
    tomboledithapus.style.display = "block"
    inputtambahan.innerHTML = "";
    var tes = document.getElementById("testestestes");
    resultedit.innerHTML = "";
    let elform = document.getElementById("modaledithapus");
    elform.reset();
    elform.dieditoleh.value = namauser;
    modaledithapus.id.value = jsondatasiswa[id].id;
    modaledithapus.pd_hp.value = jsondatasiswa[id].pd_hp;
    modaledithapus.nis.value = jsondatasiswa[id].nis;
    modaledithapus.nisn.value = jsondatasiswa[id].nisn;
    modaledithapus.pd_nama.value = jsondatasiswa[id].pd_nama.toUpperCase();
    modaledithapus.pd_tl.value = jsondatasiswa[id].pd_tl.toUpperCase();;
    let t = (jsondatasiswa[id].pd_tanggallahir == "") ? "2021-01-01" : jsondatasiswa[id].pd_tanggallahir;
    let d = new Date(t);
    let tgl = d.getDate();
    let bln = d.getMonth() + 1;
    let thn = d.getFullYear();
    let jadi = thn + "-" + addZero(bln) + "-" + addZero(tgl);

    modaledithapus.pd_tanggallahir.value = jadi;//new Date("07-09-2020") ;//addZero(bln) +"-"+addZero(tgl) + "-"+thn;//`addZero(${bln}) - addZero(${tgl}) - ${thn}`;
    modaledithapus.pd_agama.value = jsondatasiswa[id].pd_agama.toUpperCase();;
    modaledithapus.pd_namaayah.value = jsondatasiswa[id].pd_namaayah.toUpperCase();;
    modaledithapus.pd_namaibu.value = jsondatasiswa[id].pd_namaibu.toUpperCase();;
    terjemahantanggal.innerHTML = "";
    terjemahantanggal.innerHTML = tanggalfull(jadi);
    aktif.value = jsondatasiswa[id].aktif;
    jenjang.value = jsondatasiswa[id].jenjang;
    nik.value = jsondatasiswa[id].nik;
    nokk.value = jsondatasiswa[id].nokk;
    pd_alamat.value = jsondatasiswa[id].pd_alamat;

    const opskelas = document.createElement("option");
    opskelas.setAttribute("value", jsondatasiswa[id].nama_rombel);
    opskelas.innerHTML = jsondatasiswa[id].nama_rombel;
    nama_rombel.innerHTML = "";
    nama_rombel.appendChild(opskelas);
    pd_jk.value = jsondatasiswa[id].pd_jk;
}
function hapussiswa(id) {
    var konfirm = confirm("Siswa ini akan dihilangkan dari kelas Anda. \n \n Tapi data masih berada di database kami. \n \n Anda yakin ingin menghapusnya? id " + id)
    if (konfirm == true) {
        var url = linkDataUserWithIdss + "&action=hapussiswa"
        $.ajax({
            crossDomain: true,
            url: url,
            dataType: 'json',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            data: 'id=' + id,
            success: async function (x) {
                alert(x);
                await fetch(linkDataUserWithIdss + "&action=datasiswaaktif&kelas=" + ruangankelas)
                    .then(m => m.json())
                    .then(k => {
                        jsondatasiswa = k.datasiswa;
                        localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(k));
                    });
                tabeldatakelassaya();
                await fetch(linkDataUserWithIdss + "&action=datasiswatidakaktif")
                    .then(m => m.json())
                    .then(k => {
                        arraysiswatidakaktif = k.datasiswa;
                        jumlahseluruhsiswadisekolah = k.total
                        localStorage.setItem("datasiswatidakaktif", JSON.stringify(k))
                    })
            },
            error: function (er) {
                alert(er);
            }
        })
    } else { alert("Anda membatalkan perintah untuk menghapus siswa Anda.") }
}
function kirimeditsiswa() { // versil lama, terbaru tanpa keterangan lama
    var namaform = document.getElementById("modaledithapus");
    namaform.style.display = "none";
    tomboledithapus.style.display = "none"
    var encode_nya = diserialkansiswa(namaform);//+ "&idss="+idspreadsheet ;//$("#modaledithapus").serialize();//
    var url = linkDataUserWithIdss + "&action=editsiswa";//script_url+"&action=updatesiswa";
    $.ajax({
        crossDomain: true,
        url: url,
        dataType: 'json',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        data: encode_nya,
        success: async function (p) {
            $('#resultedit').html(p);
            await fetch(linkDataUserWithIdss + "&action=datasiswaaktif&kelas=" + ruangankelas)
                .then(m => m.json())
                .then(k => {
                    jsondatasiswa = k.datasiswa;
                    localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(k));
                });
            tabeldatakelassaya();
            modaledithapus.reset();
            modal_edit_siswa.style.display = "none";
        },
        error: function (er) { $("#resultedit").html(er) }
    });
}
function tmblbarutambahsiswa() { // versil lama, terbaru tanpa keterangan lama
    var namaform = document.getElementById("modaledithapus");
    namaform.style.display = "none";
    tomboledithapus.style.display = "none"
    var encode_nya = diserialkansiswa(namaform);//+ "&idss="+idspreadsheet ;//$("#modaledithapus").serialize();//
    var url = linkDataUserWithIdss + "&action=tambahtambahsiswa";//script_url+"&action=updatesiswa";
    $.ajax({
        crossDomain: true,
        url: url,
        dataType: 'json',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        data: encode_nya,
        success: async function (p) {
            $('#resultedit').html(p);
            await fetch(linkDataUserWithIdss + "&action=datasiswaaktif&kelas=" + ruangankelas)
                .then(m => m.json())
                .then(k => {
                    jsondatasiswa = k.datasiswa;
                    localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(k));
                });
            tabeldatakelassaya();
            modaledithapus.reset();
            modal_edit_siswa.style.display = "none";
        },
        error: function (er) { $("#resultedit").html(er) }
    });
}
function cekelement(id) {
    alert(id.split("_")[1]);
    var noid = id.split("_")[1];
    var datasiswaklik = Object.keys(jsondatasiswa).filter(function (x) {
        if (jsondatasiswa[x].id == noid)
            return true
    }).map(function (x) {
        jsondatasiswa[x].pd_nama
    });
}
function updateformeditsiswa() { /// ga kepake
    var namaform = document.getElementById("modaledithapus");
    var tes = ArrayObjectPadaFormEditSiswa(namaform);
    var encode_nya = diserialkansiswa(namaform);//+ "&idss="+idspreadsheet ;//$("#modaledithapus").serialize();//

}
function ArrayObjectPadaFormEditSiswa(form) { // fungsi untuk membuat Array Object beserta value-nya dalam bentuk JSON
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
    var idsiswa_isian = koleksielement["id"].value; // menampilkan value dari attribute id.
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

    dataJSON.formDataNameOrder = JSON.stringify(buatkolomheader);
    return {
        data: dataJSON
    }
}
function diserialkansiswa(form) {
    var formData = ArrayObjectPadaFormEditSiswa(form); // menghasilkan Array Object dari FORM yang akan dikirimkan;
    var data = formData.data;
    var encoded = Object.keys(data).map(function (k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    return encoded;
}
function cetakini() {
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    tabelhasil.setAttribute("class", "versi-table");
    tabelhasil.setAttribute("id", "myTableCopy");
    var tabeleditt = document.getElementById("myTable");//.getElementsByTagName("tbody")[0];
    var cln = tabeleditt.cloneNode(true);
    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);
    var tabeledithead = document.getElementById("myTableCopy").getElementsByTagName("thead")[0];
    tabeledithead.rows[0].deleteCell(1);
    var tabeledit = document.getElementById("myTableCopy").getElementsByTagName("tbody")[0];
    for (i = 0; i < tabeledit.rows.length; i++) {
        for (j = 0; j < 4; j++) {
            if (j == 1) {
                tabeledit.rows[i].deleteCell(j)
            }
        };
    }
    var tinggitabel = tabelhasil.offsetHeight * 0.0264583333;// cm;
    var kelass = ruangankelas;//document.getElementById("kelassayapilih").innerHTML;
    print("datasiswaprint,Daftar Siswa Kelas " + idNamaKelas + ",Tahun Pelajaran " + idTeksTapel + "," + "2020-7-16");
    datasiswadiv.innerHTML = "";
}
function print(x) {
    var splitt = x.split(',')
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
    var titlee = document.createElement("title");
    var teksjudul = document.createTextNode("e-Lamaso")
    titlee.appendChild(teksjudul)
    headnya.appendChild(titlee);
    headnya.innerHTML += '<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">';
    var css = '@page { size: landscape;}';
    var style = document.createElement('style');
    var cssd = '.versii-table {width:950px;max-width:100%;border-collapse:collapse}.versii-table th,.versii-table td,.versii-table tr {border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versii-table th{background-color:#eee;color:blue;vertical-align:middle;text-align:center}.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}.versi-table {width:auto;max-width:100%;border-collapse:collapse}.versi-table th,.versi-table td,.versi-table tr {border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th{background-color:#eee;color:blue;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}versi-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}';
    style.type = 'text/css';
    style.media = 'print';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    var d = new Date(bulan);
    var tglakhirr = d.getDate();
    var blnakhirr = d.getMonth();
    var namabulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    var thnakhirr = d.getFullYear();
    var tglakhir = daysInMonth(blnakhirr + 1, thnakhirr);
    var namakepsekku = idNamaKepsek;
    var nipkepsekku = idNipKepsek;//document.getElementById('nipkepsek').innerHTML;
    var guruapa = idJenisGuru + " " + idgurumapelmapel;//document.getElementById("tblguru").innerHTML+" "+document.frmlogin.kelasguru.value;
    var namaguruku = namauser;//document.getElementById('namagurux').innerHTML;
    var nipguruku = idNipGuruKelas;//document.getElementById('nipgurux').innerHTML;
    headnya.appendChild(style);
    var bodynya = isi.body;
    var teksbody = document.getElementById(id).innerHTML.replace("position:sticky;position:-webkit-sticky", "").replace("box-shadow: inset 0 0 1px #000000", "");
    bodynya.innerHTML = "";
    bodynya.innerHTML = '<style>' + cssd + '</style>';
    bodynya.innerHTML += '<h1 style="text-align:center">' + h1 + '</h1>';
    bodynya.innerHTML += '<h2 style="text-align:center">' + h2 + '</h2>';
    bodynya.innerHTML += teksbody;
    bodynya.innerHTML += '<br/><br/><br/>';
    bodynya.innerHTML += '<div style="float:left;position:relative;margin-left:50px;text-align:center">Mengetahui,<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><br/><u><b>' + namakepsekku + '</b></u><br/>NIP. ' + nipkepsekku + '</div>';
    bodynya.innerHTML += '<div style="float:right;position:relative;text-align:center"> Depok , ' + tglakhir + ' ' + namabulan[blnakhirr] + ' ' + thnakhirr + '<br/>' + guruapa + '<br/><br/><br/><br/><br/><b><u>' + namaguruku + '</u></b><br/>NIP. ' + nipguruku + '</div>';

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();
}
function exceldatasiswa() {
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    tabelhasil.setAttribute("class", "versi-table");
    tabelhasil.setAttribute("id", "myTableCopy");

    var tabeleditt = document.getElementById("myTable");//.getElementsByTagName("tbody")[0];
    var cln = tabeleditt.cloneNode(true);
    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);
    var tabeledithead = document.getElementById("myTableCopy").getElementsByTagName("thead")[0];
    tabeledithead.rows[0].deleteCell(1);
    var tabeledit = document.getElementById("myTableCopy").getElementsByTagName("tbody")[0];
    for (i = 0; i < tabeledit.rows.length; i++) {
        for (j = 0; j < 4; j++) {
            if (j == 1) {
                tabeledit.rows[i].deleteCell(j)
            }
        };

    }
    let countcol = tabeledithead.rows[0].cells.length;
    let brs = tabeledithead.insertRow(0)
    let sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.setAttribute("style", "text-align:center");
    sel.innerHTML = idNamaSekolah.toUpperCase()
    brs = tabeledithead.insertRow(1)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol)
    sel.innerHTML = "DAFTAR SISWA KELAS " + idNamaKelas.toUpperCase();
    brs = tabeledithead.insertRow(2)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.innerHTML = "Semester " + idSemester + " Tahun Pelajaran " + idTeksTapel
    brs = tabeledithead.insertRow(3)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol)
    let rowcount = tabeledit.rows.length;
    let colcount = tabeledit.rows[0].cells.length;
    countcol = tabeledit.rows[0].cells.length;
    if (colcount >= 5) {
        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "NIP. " + idNipKepsek;
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = "NIP. " + idNipGuruKelas;
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "<b><u>" + idNamaKepsek + "</u></b>"
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = "<b><u>" + namauser + "</u></b>"
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Kepala " + idNamaSekolah;
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = idJenisGuru + " " + idgurumapelmapel
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Mengetahui,";
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date())
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas

        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
    }

    $("#myTableCopy").table2excel({
        name: " SDN Ratujaya 1",
        filename: "Data Siswa Kelas " + ruangankelas + " ID FILE " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_judul: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true
    });
    datasiswadiv.innerHTML = "";
}
const tambahsiswa = () => {
    alert("Maaf, hanya ada untuk Guru Kelas")
}
function isikantambahsiswa(index) {
    inputtambahan.style.display = "none";
    tomboledithapus.style.display = "block";
    modaledithapus.style.display = "block";
    dieditoleh.value = namauser;
    aktif.value = "aktif";
    jenjang.value = idJenjang;
    id.value = index;
    pd_nama.value = "";

    var bikinkelas = document.createElement("option");
    bikinkelas.setAttribute("id", ruangankelas)
    bikinkelas.innerHTML = ruangankelas;
    nama_rombel.appendChild(bikinkelas);
    let bt = document.getElementById("tomboledithapus")
    bt.setAttribute("onclick", "tmblbarutambahsiswa()")
}

async function aktifkansiswadikelas(encodednya) {
    let ambilid = "tombolambil" + encodednya.split("&")[0].split("=")[1]
    let url = linkDataUserWithIdss + "&action=aktifkansiswa";
    let data = new FormData();
    data.append('id', encodednya.split("&")[0].split("=")[1])
    data.append('jenjang', encodednya.split("&")[1].split("=")[1]);
    data.append('kelas', encodednya.split("&")[2].split("=")[1])
    await fetch(url, { method: 'post', body: data })
        .then(m => m.json())
        .then(k => {
            document.getElementById(ambilid).innerHTML = k;
        })
        .catch(err => alert(err))
    await fetch(linkDataUserWithIdss + "&action=datasiswaaktif&kelas=" + ruangankelas)
        .then(m => m.json())
        .then(k => {
            jsondatasiswa = k.datasiswa;
            localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(k));
        });
    tabeldatakelassaya();
    await fetch(linkDataUserWithIdss + "&action=datasiswatidakaktif")
        .then(m => m.json())
        .then(k => {
            arraysiswatidakaktif = k.datasiswa;
            jumlahseluruhsiswadisekolah = k.total
            localStorage.setItem("datasiswatidakaktif", JSON.stringify(k))
        })
}

/////////////// source ABSENGURUMAPEL.JS

async function absensisiswa() {
    if (jsondatasiswa.length == 0) {
        alert("Anda Belum Memilih Kelas.");
        return;
    } else {
        await createtableabsenhariini(); //fungsi untuk membuat tabel REKAP ABSEN dalam hari ini

    }
    loadingtopbarin("loadingtopbar");
    tampilinsublamangurukelas("absen");
    absenhariini.style.display = "block";
    clearInterval(stoploadingtopbar);
    divlod = document.querySelector(".loadingtopbar");
    divlod.style.width = "100%";
    setTimeout(() => {
        divlod.style.width = "1px"
        divlod.className += " w3-hide";

    }, 3000);
}
async function createtableabsenhariini() {
    var tgl = new Date();
    var tglabsen = tgl.getDate();
    var blnabsenx = tgl.getMonth() + 1;
    var blnabsen = addZero(blnabsenx);

    var thnabsen = tgl.getFullYear();
    let idok = tglabsen + "" + blnabsen + "" + thnabsen;

    var tabel = document.createElement("table");
    tabel.setAttribute("class", "versi-table");
    tabel.setAttribute("id", "tabelloadinghariini")
    var tr = tabel.insertRow(0);
    var thno = document.createElement("th");
    thno.innerHTML = "No.";
    tr.appendChild(thno);
    var thnama = document.createElement("th");
    thnama.innerHTML = "Nama";
    tr.appendChild(thnama);
    var thkehadiran = document.createElement("th");
    thkehadiran.innerHTML = "Kehadiran";
    tr.appendChild(thkehadiran);

    var thaksi = document.createElement("th");
    thaksi.innerHTML = "Aksi";
    tr.appendChild(thaksi);

    for (var i = 0; i < jsondatasiswa.length; i++) {
        var trs = tabel.insertRow(-1);
        var selno = trs.insertCell(-1);
        selno.innerHTML = (i * 1) + 1;
        var selnama = trs.insertCell(-1);
        selnama.innerHTML = jsondatasiswa[i].pd_nama;
        var selkehadiran = trs.insertCell(-1);
        selkehadiran.setAttribute("style", "vertical-align:center;text-align:center");
        selkehadiran.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Loading ...";
        var selaksi = trs.insertCell(-1);

        var tombolwa = document.createElement("button");
        tombolwa.setAttribute("onclick", "kirimwauntukabsen('wa" + "_" + jsondatasiswa[i].id + "')");
        tombolwa.innerHTML = "<i class='fa fa-whatsapp'></i> Siswa";
        selaksi.appendChild(tombolwa);

        var pisahin = document.createElement("br");
        selaksi.appendChild(pisahin);
        var tombolbantusiswa = document.createElement("button");
        tombolbantusiswa.setAttribute("onclick", "bantuabsen('" + jsondatasiswa[i].id + "_" + idok + "')");
        tombolbantusiswa.innerHTML = "<i class='fa fa-child'></i> Bantu";
        selaksi.appendChild(tombolbantusiswa);
    }
    tabelabsenhariini.innerHTML = "";
    tabelabsenhariini.appendChild(tabel);

    var tglcari = new Date()
    var thn = tglcari.getFullYear();
    var bln = tglcari.getMonth();
    var tgl = tglcari.getDate();

    spinspin.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Loading ...";

    var jsonabsenkelasperbulan = [];
    let kelas = ruangankelas;

    if (localStorage.hasOwnProperty('absenHariIni_' + encodeURIComponent(ruangankelas))) {
        jsonabsenkelasperbulan = JSON.parse(localStorage.getItem('absenHariIni_' + encodeURIComponent(ruangankelas)));//.absenhariini;
    } else {
        jsonabsenkelasperbulan = await fecjsonabsen();
        localStorage.setItem('absenHariIni_' + ruangankelas, JSON.stringify(jsonabsenkelasperbulan));

        setTimeout(function () {
            localStorage.removeItem('absenHariIni_' + encodeURIComponent(ruangankelas))
        }, 60000);
    }

    spinspin.innerHTML = "";

    var datatabel = tabelloadinghariini;
    for (var u = 0; u < datatabel.rows.length; u++) {
        if (u !== 0) {
            if (jsonabsenkelasperbulan.length > 0) {
                for (var v = 0; v < jsonabsenkelasperbulan.length; v++) {
                    // if (datatabel.rows[u].cells[1].innerHTML == jsonabsenkelasperbulan[v].name) {
                    if (jsondatasiswa[u - 1].id == jsonabsenkelasperbulan[v].tokensiswa) {
                        var link = jsonabsenkelasperbulan[v].fileContent;
                        if (link !== "") {
                            var linksplit = link.replace("https://drive.google.com/file/d/", "");
                            var idpoto = linksplit.replace("/view?usp=drivesdk", "");

                        } else {
                            var idpoto = idlogo;
                        }

                        datatabel.rows[u].cells[2].innerHTML = `<img src="https://drive.google.com/uc?export=view&id=${idpoto}" style="width:75px;cursor:pointer" alt="poto" onclick="klikpotosiswa(this)"/><br/>Hadir`;
                        datatabel.rows[u].cells[3].innerHTML = "Pukul <br/>" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getHours()) + ":" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getMinutes()) + ":" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getSeconds());
                        if (jsonabsenkelasperbulan[v].idbaris !== "") {
                            datatabel.rows[u].cells[3].innerHTML += `<br/> <button onclick="hapusabsensiswaini('${jsonabsenkelasperbulan[v].idbaris}')">Ganti/Hapus</button>;`
                        }
                        break;
                    } else {
                        datatabel.rows[u].cells[2].innerHTML = "Belum Absen";
                    }
                }
            } else {
                datatabel.rows[u].cells[2].innerHTML = "Belum Absen";
            }
        }
    }
}
const fecjsonabsen = () => {
    let tgl = new Date();
    let dtgl = tgl.getDate();
    let mtgl = tgl.getMonth() + 1;
    let nol = addZero(mtgl);
    let ytg = tgl.getFullYear();

    let idHariini = dtgl + "" + nol + "" + ytg;

    absenheader = "absen" + idJenjang;
    url_absensiswa = jlo[absenheader];


    return fetch(url_absensiswa + "?action=absenkelashariini&id=" + idHariini + "&kelas=" + encodeURIComponent(ruangankelas))
        .then(m => m.json())
        .then(k => k.absenhariini)
        .catch(er => {
            console.log(er);
            loadingAPI.style.display = "block";
            infoloadingAPI.innerHTML = "Terjadi kesalahan. Coba Lagi Nanti atau Logout dulu ...."
        });
}
const refreshAbsenHariIni = async () => {
    let k = await fecjsonabsen();
    localStorage.setItem('absenHariIni_' + encodeURIComponent(ruangankelas), JSON.stringify(k));
    createtableabsenhariini();
    setTimeout(function () {
        localStorage.removeItem('absenHariIni_' + encodeURIComponent(ruangankelas));
    }, 60000);
}

///// kalender pendidikan
const ubahtanggalini = (w) => {
    let ind = parseInt(w);
    modaleditkaldik.style.display = "block";
    formmodaleditkaldik.style.display = "block";
    tomboleditkaldik.style.display = "block";
    tomboleditkaldik.innerHTML = `<i class="fa fa-gears w3-xxxlarge"></i> EDIT`
    tomboleditkaldik.setAttribute("onclick", "kirimeditkalender()");
    juduleditkaldik.innerHTML = "Edit Kalender Pendidikan"

    let sumberx = JSON.parse(localStorage.getItem("Kaldik"));
    let sumber = sumberx.filter(k => k.idbaris == ind)[0];
    idbariskaldik.value = ind;
    keterangan.value = sumber.keterangan;
    let d = new Date(sumber.start_tgl);
    let tgl = d.getDate();
    let bln = d.getMonth() + 1;
    let thn = d.getFullYear();
    let jadi = thn + "-" + addZero(bln) + "-" + addZero(tgl);
    //let jadi = thn +"-"+bln + "-"+ tgl;

    start_tgl.value = jadi;// + "T08:00:00";

    let dend = new Date(sumber.end_tgl);
    let tgle = dend.getDate();
    let blne = dend.getMonth() + 1;
    let thne = dend.getFullYear();
    let jadie = thne + "-" + addZero(blne) + "-" + addZero(tgle);

    end_tgl.value = jadie;//+ "T08:00:00";
}
const kirimeditkalender = async () => {
    formmodaleditkaldik.style.display = "none";
    tomboleditkaldik.style.display = "none";
    juduleditkaldik.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo"><i>`;
    let dot = document.getElementById("formmodaleditkaldik");
    url_absenkaldik = jlo.url_dataabsen + "?action=datakaldik&idss=" + jlo.ss_dataabsen;
    let ol = namauser;
    let link = url_kaldikaja + "?action=editkaldik";
    let data = new FormData(dot);
    data.append('oleh', ol);
    await fetch(link, { method: 'post', body: data })
        .then(m => m.json())
        .then(k => {
            juduleditkaldik.innerHTML = k;
        })
        .catch(err => juduleditkaldik.innerHTML = err);

    await fetch(url_absenkaldik).then(m => m.json()).then(k => {
        let kal = k.records;
        tabelkaldikss.innerHTML = "";
        let tabel = document.createElement("table");
        tabel.setAttribute("class", "versi-table");
        let thead = tabel.createTHead();
        let tr = thead.insertRow(0);
        let th = document.createElement("th");
        th.innerHTML = "No";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Keterangan";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Durasi (hari)";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Tanggal Mulai";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Tanggal Akhir";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Diedit Oleh";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Aksi";
        tr.appendChild(th);
        let tbody = tabel.createTBody();
        for (let i = 0; i < kal.length; i++) {
            tr = tbody.insertRow(-1);
            let td = tr.insertCell(-1);
            td.innerHTML = i + 1;
            td = tr.insertCell(-1);
            td.innerHTML = kal[i].keterangan;
            td = tr.insertCell(-1);
            td.innerHTML = kal[i].lama;
            td = tr.insertCell(-1);
            td.innerHTML = tanggalfull(kal[i].start_tgl);
            td = tr.insertCell(-1);
            td.innerHTML = tanggalfull(kal[i].end_tgl);
            td = tr.insertCell(-1);
            td.innerHTML = kal[i].oleh;
            td = tr.insertCell(-1);
            td.innerHTML = `<button onclick="ubahtanggalini(${kal[i].idbaris})">Ubah</button><button onclick="hapustanggalini('${kal[i].idbaris}')"})">Hapus</button>`;
        }
        tabelkaldikss.appendChild(tabel);
        tabelkaldikss.innerHTML += `<hr><button onclick="tambahKaldik()" class="wa"><i class="fa fa-calendar-plus-o w3-xxxlarge"></i>   Tambah Kalender</button>`;

        arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
        arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

        localStorage.setItem('Kaldik', JSON.stringify(k.records));
        localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl));

        modaleditkaldik.style.display = "none";
    })
}
const kirimtambahkalender = async () => {
    formmodaleditkaldik.style.display = "none";
    tomboleditkaldik.style.display = "none";
    juduleditkaldik.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo"><i>`;
    url_absenkaldik = jlo.url_dataabsen + "?action=datakaldik&idss=" + jlo.ss_dataabsen;
    let dot = document.getElementById("formmodaleditkaldik");
    let ol = namauser;

    let link = url_kaldikaja + "?action=tambahkaldik";
    let data = new FormData(dot);
    data.append('oleh', ol);
    await fetch(link, { method: 'post', body: data })
        .then(m => m.json())
        .then(k => {
            juduleditkaldik.innerHTML = k;
        })
        .catch(err => juduleditkaldik.innerHTML = err);
    await fetch(url_absenkaldik).then(m => m.json()).then(k => {
        let kal = k.records;
        tabelkaldikss.innerHTML = "";
        let tabel = document.createElement("table");
        tabel.setAttribute("class", "versi-table");
        let thead = tabel.createTHead();
        let tr = thead.insertRow(0);
        let th = document.createElement("th");
        th.innerHTML = "No";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Keterangan";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Durasi (hari)";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Tanggal Mulai";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Tanggal Akhir";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Diedit Oleh";
        tr.appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Aksi";
        tr.appendChild(th);
        let tbody = tabel.createTBody();
        for (let i = 0; i < kal.length; i++) {
            tr = tbody.insertRow(-1);
            let td = tr.insertCell(-1);
            td.innerHTML = i + 1;
            td = tr.insertCell(-1);
            td.innerHTML = kal[i].keterangan;
            td = tr.insertCell(-1);
            td.innerHTML = kal[i].lama;
            td = tr.insertCell(-1);
            td.innerHTML = tanggalfull(kal[i].start_tgl);
            td = tr.insertCell(-1);
            td.innerHTML = tanggalfull(kal[i].end_tgl);
            td = tr.insertCell(-1);
            td.innerHTML = kal[i].oleh;
            td = tr.insertCell(-1);
            td.innerHTML = `<button onclick="ubahtanggalini(${kal[i].idbaris})">Ubah</button><button onclick="hapustanggalini('${kal[i].idbaris}')"})">Hapus</button>`;
        }
        tabelkaldikss.appendChild(tabel);
        tabelkaldikss.innerHTML += `<hr><button onclick="tambahKaldik()" class="wa"><i class="fa fa-calendar-plus-o w3-xxxlarge"></i>   Tambah Kalender</button>`;
        arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
        arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

        localStorage.setItem('Kaldik', JSON.stringify(k.records));
        localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl));
        modaleditkaldik.style.display = "none";
    })
}
const tambahKaldik = () => {
    modaleditkaldik.style.display = "block";
    formmodaleditkaldik.style.display = "block";
    tomboleditkaldik.style.display = "block";
    tomboleditkaldik.innerHTML = `<i class="fa fa-calendar-times-o w3-xxxlarge"></i> TAMBAH`
    tomboleditkaldik.setAttribute("onclick", "kirimtambahkalender()");
    juduleditkaldik.innerHTML = "Tambah Kalender Pendidikan"
    formmodaleditkaldik.reset();
    datakalenderdihapus.innerHTML = "<i class='fa fa-spin fa-spinner w3-large'></i>";
    fetch(url_kaldikaja + "?action=kaldikdihapus")
        .then(m => m.json())
        .then(k => {
            let data = k.records;
            let tekshtml = "";
            if (data.length > 0) {
                tekshtml = `<table class='versi-table w3-small'>
        <tr><th>No</th>
                <th>Keterangan</th>
                <th>Durasi hari</th>
                <th>Tanggal Mulai</th>
                <th>Tanggal Akhir</th>
                <th>Dibuat/diedit oleh</th>
                <th>Aksi</th>
                </tr>
            `;
                for (i = 0; i < data.length; i++) {
                    tekshtml += `<tr>
                    <td>${(i + 1)}</td>
                    <td>${data[i].keterangan}</td>
                    <td>${data[i].lama}</td>
                    <td>${tanggalfull(data[i].start_tgl)}</td>
                    <td>${tanggalfull(data[i].end_tgl)}</td>
                    <td>${data[i].oleh}</td>
                    <td><button onclick="kembalikantanggalini('${data[i].idbaris}')">Kembalikan</button></td>
                    </tr>`;
                }
                tekshtml += `</table>`
            } else {
                tekshtml = ""
            }
            datakalenderdihapus.innerHTML = tekshtml
        })

}
const hapustanggalini = async (ind) => {
    let konfirm = confirm("Anda yakin ingin menghapus kalender pendidikan tertanggal ini? \n\n Klik OK untuk menghapus \n Klik CANCEL untuk membatalkan")
    if (!konfirm) {
        alert("Anda membatalkan penghapusan tanggal kalender");
        return;
    }
    //alert("Anda menghapus tanggal pada baris di idss = " + (ind + 2))
    let brs = ind;
    await fetch(url_kaldikaja + "?action=hapuskaldik&idbaris=" + brs, {
        method: "post"
    }).then(m => m.json())
        .then(k => {
            alert(k);

        })
        .catch(f => alert(f))

    await fetch(url_kaldikaja + "?action=datakaldik").then(m => m.json()).then(k => {

        let kal = k.records;
        tabelkaldikss.innerHTML = "";
        let tabel = document.createElement("table")
        tabel.setAttribute("class", "versi-table");

        let thead = tabel.createTHead();
        let tr = thead.insertRow(0);
        let th = document.createElement("th")
        th.innerHTML = "No"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Keterangan"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Durasi (hari)"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Tanggal Mulai"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Tanggal Akhir"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Diedit Oleh";
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Aksi"
        tr.appendChild(th)
        let tbody = tabel.createTBody()
        for (let i = 0; i < kal.length; i++) {
            tr = tbody.insertRow(-1);
            let td = tr.insertCell(-1)
            td.innerHTML = i + 1;

            td = tr.insertCell(-1)
            td.innerHTML = kal[i].keterangan;
            td = tr.insertCell(-1)
            td.innerHTML = kal[i].lama;
            td = tr.insertCell(-1)
            td.innerHTML = tanggalfull(kal[i].start_tgl);
            td = tr.insertCell(-1)
            td.innerHTML = tanggalfull(kal[i].end_tgl);
            td = tr.insertCell(-1);
            td.innerHTML = kal[i].oleh;
            td = tr.insertCell(-1);
            td.innerHTML = `<button onclick="ubahtanggalini(${kal[i].idbaris})">Ubah</button><button onclick="hapustanggalini(${kal[i].idbaris})"})">Hapus</button>`;
        }
        tabelkaldikss.appendChild(tabel)
        tabelkaldikss.innerHTML += `<hr><button onclick="tambahKaldik()" class="wa"><i class="fa fa-calendar-plus-o w3-xxxlarge"></i>   Tambah Kalender</button>`

        arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
        arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

        localStorage.setItem('Kaldik', JSON.stringify(k.records));

        localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl))

        modaleditkaldik.style.display = "none";
    })



}
const kembalikantanggalini = async (ind) => {
    let konfirm = confirm("Anda yakin ingin mengembalikan kalender pendidikan tertanggal ini? \n\n Klik OK untuk mengembalikannya \n Klik CANCEL untuk membatalkan")
    if (!konfirm) {
        alert("Anda membatalkan perintah.");
        return;
    }
    modaleditkaldik.style.display = "none";
    //alert("Anda menghapus tanggal pada baris di idss = " + (ind + 2))
    let brs = ind;
    await fetch(url_kaldikaja + "?action=hapuskaldik&idbaris=" + brs, {
        method: "post"
    }).then(m => m.json())
        .then(k => {
            alert(k);

        })
        .catch(f => alert(f))

    await fetch(url_kaldikaja + "?action=datakaldik").then(m => m.json()).then(k => {

        let kal = k.records;
        tabelkaldikss.innerHTML = "";
        let tabel = document.createElement("table")
        tabel.setAttribute("class", "versi-table");

        let thead = tabel.createTHead();
        let tr = thead.insertRow(0);
        let th = document.createElement("th")
        th.innerHTML = "No"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Keterangan"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Durasi (hari)"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Tanggal Mulai"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Tanggal Akhir"
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Diedit Oleh";
        tr.appendChild(th)
        th = document.createElement("th")
        th.innerHTML = "Aksi"
        tr.appendChild(th)
        let tbody = tabel.createTBody()
        for (let i = 0; i < kal.length; i++) {
            tr = tbody.insertRow(-1);
            let td = tr.insertCell(-1)
            td.innerHTML = i + 1;

            td = tr.insertCell(-1)
            td.innerHTML = kal[i].keterangan;
            td = tr.insertCell(-1)
            td.innerHTML = kal[i].lama;
            td = tr.insertCell(-1)
            td.innerHTML = tanggalfull(kal[i].start_tgl);
            td = tr.insertCell(-1)
            td.innerHTML = tanggalfull(kal[i].end_tgl);
            td = tr.insertCell(-1);
            td.innerHTML = kal[i].oleh;
            td = tr.insertCell(-1);
            td.innerHTML = `<button onclick="ubahtanggalini(${kal[i].idbaris})">Ubah</button><button onclick="hapustanggalini(${kal[i].idbaris})"})">Hapus</button>`;
        }
        tabelkaldikss.appendChild(tabel)
        tabelkaldikss.innerHTML += `<hr><button onclick="tambahKaldik()" class="wa"><i class="fa fa-calendar-plus-o w3-xxxlarge"></i>   Tambah Kalender</button>`

        arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
        arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

        localStorage.setItem('Kaldik', JSON.stringify(k.records));

        localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl))

        modaleditkaldik.style.display = "none";
    })



}
const hapusabsensiswaini = (lr) => {
    //alert('oke ' + lr);
    let confir = confirm("Anda yakin ingin menghapus absen siswa ini?\n\n Klik OK untuk menghapus \n klik CANCEL untuk batal");
    if (!confir) {
        return
    }

    fetch(url_absensiswa + "?action=hapusabsensiswaini&lr=" + lr)
        .then(m => m.json())
        .then(k => {
            alert(k.result);
            refreshAbsenHariIni()
        })
        .catch(er => alert(er))
}

////////////////// source MATERIGURUMAPEL.JS
//tes klik selain ngeklik bagian kbm hari ini:
const updatematerikan = () => {

    let idokmateri = tglStringZero();
    localStorage.removeItem("kbmtoday" + idokmateri);
    let parameterlain = "&crtToken=" + idokmateri + "&idtoken=" + idJenjang;
    $.getJSON(linkmateri + parameterlain + "&action=materihariini", function (f) {
        //             //console.log(f)
        let kk = f.result;

        let data = f.result.filter(k => k.kuncikd.indexOf(idgurumapelmapel + "_") > -1);

        localStorage.setItem("kbmtoday" + idokmateri, JSON.stringify(data));

        kbm_hari_ini.innerHTML = `
                    <h3 class="w3-card w3-padding"><button class="w3-button w3-pink w3-round w3-right w3-tiny" onclick="updatematerikan()"><i class="fa fa-refresh"></i> Materi</button><br>Ada ${data.length} Materi Pembelajaran untuk hari Hari:</h3><br>`

        for (i = 0; i < data.length; i++) {
            kbm_hari_ini.innerHTML += `<h4> Materi ke- ${i + 1}</h4>`
            let tabel = document.createElement("table");
            tabel.setAttribute("class", "versi-table w3-card w3-bordered");
            let brs = tabel.insertRow(0);
            let sel = brs.insertCell(-1)
            sel.innerHTML = "Identitas Materi"
            sel = brs.insertCell(-1);
            sel.innerHTML = data[i].idmapel;

            brs = tabel.insertRow(-1);
            sel = brs.insertCell(-1)
            sel.innerHTML = "Jenis Tagihan"
            sel = brs.insertCell(-1);
            sel.innerHTML = (data[i].idaksessiswa == "sekali") ? "Ulangan (Menerima data nilai)" : "Latihan (tidak menerima nilai siswa)";

            brs = tabel.insertRow(-1);
            sel = brs.insertCell(-1)
            sel.innerHTML = "Jumlah PG"
            sel = brs.insertCell(-1);
            sel.innerHTML = data[i].jumlahpg;

            brs = tabel.insertRow(-1);
            sel = brs.insertCell(-1)
            sel.innerHTML = "Jumlah Essay"
            sel = brs.insertCell(-1);
            sel.innerHTML = data[i].jumlahessay;

            brs = tabel.insertRow(-1);
            sel = brs.insertCell(-1)
            sel.innerHTML = "Lihat Materi"
            sel = brs.insertCell(-1);
            sel.innerHTML = `<button class="w3-button w3-green" onclick="previewriwayat(${i})">Tampilkan</button>`;
            if (data[i].idaksessiswa == "beberapa kali") {
                brs = tabel.insertRow(-1);
                sel = brs.insertCell(-1)
                sel.innerHTML = "Respon Siswa"
                sel = brs.insertCell(-1);
                sel.innerHTML = `Tidak ada tagihan`;
            } else {
                brs = tabel.insertRow(-1);
                sel = brs.insertCell(-1)
                sel.innerHTML = "Lihat Materi"
                sel = brs.insertCell(-1);
                sel.innerHTML = `<button class="w3-button w3-blue" onclick="getdaftarnilai(${i})">Nilai Siswa</button>`;
            }


            kbm_hari_ini.appendChild(tabel)
        }
    }).fail(function (er) { kbm_hari_ini.innerHTML = "Terjadi kesalahan... coba lagi. <br>kode error: " + er })

}
const previewriwayat = (par) => {
    pranalamateri.style.display = "block";
    document.querySelector(".classReviewMateri").innerHTML = "";
    let tes = document.querySelector(".classReviewMateri");
    let keyy = "kbmtoday" + tglStringZero()

    let datamateri = JSON.parse(localStorage.getItem(keyy))
    let versi = datamateri[par].versi
    //bikin judul h4
    var judul = document.createElement("h4")
    judul.setAttribute("class", "w3-center");
    judul.innerHTML = "Identitas e-Lamaso";
    tes.innerHTML = ""
    tes.appendChild(judul);

    //-- Bikin Tabel identitas:
    var tabelidentitas = document.createElement("table");
    tabelidentitas.setAttribute("class", "versi-table tabel_idreview");
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
    td.innerHTML = "NAMA SISWA ANDA"
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kelas"
    var td = tr.insertCell(-1);
    td.innerHTML = idNamaKelas;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Mapel/Tema"
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idmapel;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Frekuensi Akses"
    var td = tr.insertCell(-1);
    var keteranganakses;
    if (datamateri[par].idaksessiswa == "sekali") {
        keteranganakses = "TEST <br>Sekali saja sejak mengirim nilai"
    } else {
        keteranganakses = "LATIHAN <br>Berapa kali saja untuk latihan"
    }
    td.innerHTML = keteranganakses;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Tanggal Publikasi"
    var td = tr.insertCell(-1);
    td.innerHTML = tanggalfulllengkap(datamateri[par].idtgl);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kompetensi KD<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>"
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forKD")
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kunci Jawaban<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>"
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forkuncijawaban")
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;


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
    cel1.innerHTML += "";
    cel1.appendChild(cdmenit);
    cel1.appendChild(titikdua)
    cel1.appendChild(cddetik);
    cel1.innerHTML += "<br/><sub>Waktu hanya berjalan di laman siswa</sub>";

    tes.appendChild(tabelidentitas)
    var brek = document.createElement("div")

    brek.setAttribute("style", "break-after:page");
    tes.appendChild(brek)


    var idm = encodeURIComponent(datamateri[par].idmateri);
    //
    $('.classReviewMateri').nextAll('button').remove();
    $.getJSON(linkmateri + "&idmateri=" + idm + "&action=previewriwayat", function (json) {
        //  loadingmodal.style.display="none";
        //$("#output").html(brkline(json))
        // document.getElementById("judulpetunjuk").innerHTML = "Preview e-Lamaso";
        //        document.getElementById("isipetunjuk").innerHTML = brkline(json);
        //   document.querySelector(".kontenmateri").innerHTML += brkline(json);
        tes.innerHTML += brkline(json).teks;
        let inhtml = "<table class='versi-table w3-tiny'><tr><td>Mapel</td><td>KD</td><td>No Soal</td></tr>";
        let xx = brkline(json).kd.split("<br>");
        for (a = 0; a < xx.length; a++) {
            inhtml += `<tr><td> ${xx[a].split("_")[0]}</td><td> ${xx[a].split("_")[1].split(":")[0]}</td><td>${xx[a].split("_")[1].split(":")[1]}</td></tr>`
        }
        inhtml += `</table>`;

        forKD.innerHTML = inhtml;

        let tekskunci = brkline(json).kunci;
        //console.log(tekskunci);
        if (tekskunci == "" || tekskunci == "undefined" || tekskunci == null) {
            forkuncijawaban.innerHTML = "Tidak Ada PG"
        } else {
            forkuncijawaban.innerHTML = window.atob(tekskunci).split(",").join("<br>");

        }

        if(versi==""){
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
        let tombol = document.createElement("button");
        tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
        tombol.setAttribute("onclick", `printPortrait('idpracetak,,,${StringTanggal(new Date())}')`);
        tombol.innerHTML = `<i class="fa fa-print"></i>  Cetak `

        tes.after(tombol)
    })
    // ;


}
const getdaftarnilai = (id) => {
    //alert(id)
    let teks = "kbmtoday" + tglStringZero();
    idtabaktif.innerHTML = id;
    koreksidarimana.innerHTML = id + "_hariini"
    let datamaterilocal = JSON.parse(localStorage.getItem(teks))[id];
    let materi = datamaterilocal.idmapel.toUpperCase();

    let mtri = datamaterilocal.idmapel;
    let tagih = datamaterilocal.jenistagihan;
    //alert (teks)
    let kodeunik = tagih + "_" + tglStringZero();
    modaldaftarnilai.style.display = "block";
    document.querySelector("#modalidmapel").innerHTML = "<br>" + tagih + " " + materi;
    document.getElementsByClassName("tablink")[0].click();
    //$.getJSON(constlinknilai+"&action=dataanalisisharian", function(json))
    // let kelas = e.parameter.idkelas;
    // let idmapel = e.parameter.idmapel;
    // let kodeunik = e.parameter.kodeunik;
    let paramtambahan = "&idkelas=" + encodeURIComponent(idNamaKelas);
    paramtambahan += "&idmapel=" + encodeURIComponent(mtri);
    paramtambahan += "&kodeunik=" + encodeURIComponent(kodeunik)
    tablinkKDtabel.innerHTML = `<i class="fa fa-refresh fa-spin w3-xxxlarge"><i>`
    fetch(constlinknilai + "?action=dataanalisisharian" + paramtambahan)
        .then(m => m.json())
        .then(f => {
            nilairespon = f.records;
            forModalTabel(id)
            //console.log(f)
        }
        )


}
function bukaModalTab(evt, cityName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("city");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].classList.remove("w3-light-grey");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.classList.add("w3-light-grey");

}
const forModalTabel = (id) => {
    //tes dulu bekerja di id tablinkKDtabel

    let datamaterilocal = JSON.parse(localStorage.getItem("kbmtoday" + tglStringZero()))[id];
    // // console.log(JSON.parse(datamaterilocal.kuncikd));
    let identitasmapel = datamaterilocal.idmapel;
    let datakd = JSON.parse(datamaterilocal.kuncikd);
    let punyaessay = (datamaterilocal.jumlahessay == 0) ? false : true;
    // console.log(punyaessay)

    // console.log("datakd:")
    // console.log(datakd)

    let banyakkd = Object.keys(datakd);

    // console.log("banyakkd:")
    // console.log(banyakkd.length);
    // console.log("idKD");
    // console.log(banyakkd)
    // filter untuk dijadikan unik pada key
    let mapelunik = [];
    let koleksikd = []
    let kdpermapel = {};
    for (i = 0; i < banyakkd.length; i++) {
        let mp = banyakkd[i].split("_")[0]
        if (mapelunik.indexOf(mp) == -1) {
            mapelunik.push(mp);
        }
    }
    let koleksinamasiswa = jsondatasiswa.map(k => k.pd_nama)

    // console.log(kdpermapel);
    // console.log(mapelunik)
    //bikin tabel
    let tabel = document.createElement("table")
    tabel.setAttribute("class", "versi-table w3-tiny");
    tabel.setAttribute("id", "tabel_rekap_KD");
    //bikin head;
    //let row = tabel.insertRow(0)
    let rthead = tabel.createTHead();
    let rth = rthead.insertRow(0)
    let rtd = document.createElement("th")
    rtd.setAttribute("rowspan", 3)
    rtd.innerHTML = "No"
    rth.appendChild(rtd);
    rtd = document.createElement("th")
    rtd.setAttribute("rowspan", 3)
    rtd.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
    rtd.innerHTML = "Nama Siswa"
    rth.appendChild(rtd);
    // if (punyaessay) {
    //     rtd = document.createElement("th")
    //     rtd.setAttribute("rowspan", 3)
    //     rtd.innerHTML = "Koreksi"
    //     rth.appendChild(rtd);
    // }
    rtd = document.createElement("th")
    rtd.setAttribute("rowspan", 3)
    rtd.innerHTML = "Aksi"
    rth.appendChild(rtd);

    rtd = document.createElement("th")
    rtd.setAttribute("colspan", banyakkd.length)
    rtd.innerHTML = "Mata Pelajaran"
    rth.appendChild(rtd);

    rth = rthead.insertRow(-1);
    rth.setAttribute("colspan", banyakkd.length);
    rth2 = rthead.insertRow(-1)
    for (k = 0; k < mapelunik.length; k++) {
        rtd = document.createElement("th")
        //  rtd.innerHTML = mapelunik[k]
        //  rth.appendChild(rtd);
        let coun = 0;

        for (j = 0; j < banyakkd.length; j++) {

            let st = banyakkd[j]
            if (st.indexOf(mapelunik[k]) > -1) {
                coun++;


                //let tekconsol = "Mapel " + mapelunik[k] +"KD " + banyakkd[j];
                //console.log(tekconsol)
                let rtd1 = document.createElement("th")
                rtd1.innerHTML = banyakkd[j].split("_")[1] + "<br>" + banyakkd[j]
                rth2.appendChild(rtd1);
            }
        }
        rtd.innerHTML = mapelunik[k]
        rtd.setAttribute("colspan", coun)
        rth.appendChild(rtd);
    }
    let tbo = tabel.createTBody();
    for (z = 0; z < koleksinamasiswa.length; z++) {
        let rowisi = tbo.insertRow(-1);
        let sel = rowisi.insertCell(-1)
        sel.innerHTML = (z + 1);

        sel = rowisi.insertCell(-1)
        sel.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
        sel.innerHTML = koleksinamasiswa[z];
        // if (punyaessay) {
        sel = rowisi.insertCell(-1)
        sel.innerHTML = tombolaksihariini(punyaessay, koleksinamasiswa[z]);
        // }
        for (a = 0; a < mapelunik.length; a++) {
            //  rtd.innerHTML = mapelunik[k]
            //  rth.appendChild(rtd);
            let coun = 0;

            for (j = 0; j < banyakkd.length; j++) {

                let st = banyakkd[j]
                if (st.indexOf(mapelunik[a]) > -1) {
                    coun++;


                    let tekconsol = "Mapel " + mapelunik[a] + "KD " + banyakkd[j];
                    //console.log(tekconsol)

                    let sell = rowisi.insertCell(-1)
                    sell.innerHTML = nilaiKDSiswa(koleksinamasiswa[z], banyakkd[j]).replace(".", ",");// banyakkd[j] + "nama = " + koleksinamasiswa[z];

                }
            }
        }

    }



    let idtabel = `tabel_rekap_KD`;
    let judul1 = `DAFTAR NILAI PER-KD ${identitasmapel.toUpperCase()}  KELAS ${idNamaKelas.toUpperCase()}`;
    let judul2 = `Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}`;
    let tekstgl = `${StringTanggal(new Date())}`;
    let namafile = `DAFTAR NILAI PER-KD ${identitasmapel.toUpperCase()} Kelas ${idNamaKelas} id file ${new Date().getTime()}`;
    let xx = `${idtabel},${judul1}, ${judul2}, ${tekstgl}`;
    let xxx = `${idtabel}, ${namafile},${judul1}`

    tablinkKDtabel.innerHTML = `<button class="w3-button w3-green w3-round-xlarge" onclick="printModalPKD('${xx}')"><i class="fa fa-print"></i> Cetak </button> | <button class="w3-button w3-teal w3-round-xlarge" onclick="ExcelModalKD('${xxx}')"><i class="fa fa-file-excel-o"></i> Ms. Excel </button>  <hr>`;

    //tablinkKDtabel.appendChild(tombolprint)
    tablinkKDtabel.appendChild(tabel);

}
const nilaiKDSiswa = (parNama, keyKD) => {
    let FilterRec = nilairespon.filter(k => k.namasiswa == parNama);
    let jmlh = FilterRec.length, nn;
    if (jmlh > 0) {
        //JSON.parse(nilairespon.filter(k => k.namasiswa == "ABIN NUGRAHA")[0].nilaikd)
        let arry = FilterRec[jmlh - 1].nilaikd
        let obj = JSON.parse(arry)[keyKD]
        //nn = JSON.parse(FilterRec[jmlh - 1].nilaikd)[keyKD];
        nn = (obj >= 0) ? obj : "0.00";
        //console.log(nn)
    } else {
        nn = ""
    }
    return nn
}
const OpsiSiswa = (parNama, keyKD) => {
    //nilairespon.filter(k=>k.namasiswa == "ABIN NUGRAHA").map(k => [k.PG_1, k.SKOR_1])
    let angka = keyKD.match(/(\d+)/)[0] // mengembalikan angkanya aja
    let cek = nilairespon.filter(k => k.namasiswa == parNama).map(d => [d[keyKD], d["SKOR_" + angka]]);

    //nilairespon.filter(k => k.namasiswa == "ABIN NUGRAHA").map(d => d["PG_4"])[0]
    // let cek = nilairespon.filter(k => k.namasiswa == parNama).map(d => d[keyKD]);
    let ada = cek.length;

    // let angka = keyKD.match(/(\d+)/)[0] // mengembalikan angkanya aja
    // let  skoropsi =nilairespon.filter(k => k.namasiswa == parNama).map(d => d["SKOR_" + angka]);
    let opsinya = [];
    if (ada > 0) {
        opsinya = [true, cek[ada - 1][0], cek[ada - 1][1]];
    } else {
        opsinya = [false]
    }

    return opsinya
}
document.querySelector(".tabpg").addEventListener("click", function () {
    let a = parseInt(idtabaktif.innerHTML);

    formModalTabelAnalisisPG(a)
})
document.querySelector(".tabskor").addEventListener("click", function () {
    let a = parseInt(idtabaktif.innerHTML);
    formModalTabelAnalisisSkor(a)
})
// document.querySelector(".tabgabungan").addEventListener("click", function () {
//     let a = parseInt(idtabaktif.innerHTML);
//     forModalTabelGabungan(a)
// })
const formModalTabelAnalisisPG = (id) => {
    let datamaterilocal = JSON.parse(localStorage.getItem("kbmtoday" + tglStringZero()))[id];
    // let jumlahpg = parseInt(datamaterilocal.jumlahpg);
    let jumlahpg = (datamaterilocal.jumlahpg == 0) ? 1 : parseInt(datamaterilocal.jumlahpg);


    let identitasmapel = datamaterilocal.idmapel;
    //console.log(jumlahpg);
    let koleksinamasiswa = jsondatasiswa.map(k => k.pd_nama);

    let tabel = document.createElement("table");
    tabel.setAttribute("class", "versi-table w3-tiny");
    tabel.setAttribute("id", "table_rekap_pg");
    let thead = tabel.createTHead();
    let row = thead.insertRow(0);
    let th = document.createElement("th");
    th.setAttribute("rowspan", 2)
    th.innerHTML = "No";
    row.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("rowspan", 2)
    th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
    th.innerHTML = "NAMA SISWA";
    row.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("colspan", jumlahpg)
    th.innerHTML = "NOMOR SOAL";
    row.appendChild(th);

    row = thead.insertRow(-1)
    if (datamaterilocal.jumlahpg !== 0) {
        for (b = 0; b < jumlahpg; b++) {
            th = document.createElement("th");
            th.innerHTML = (b + 1);
            row.appendChild(th);
        }
    } else {
        th = document.createElement("th");
        th.innerHTML = "Tidak Ada PG";
        row.appendChild(th);
    }


    let bdy = tabel.createTBody();
    for (c = 0; c < koleksinamasiswa.length; c++) {
        let tr = bdy.insertRow(-1)
        let sel = tr.insertCell(-1)
        sel.innerHTML = (c + 1);

        sel = tr.insertCell(-1);
        sel.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
        sel.innerHTML = koleksinamasiswa[c];
        if (datamaterilocal.jumlahpg !== 0) {
            for (d = 0; d < jumlahpg; d++) {
                sel = tr.insertCell(-1)
                //sel.innerHTML = OpsiSiswa(koleksinamasiswa[c],"PG_" + (d+1));
                if (OpsiSiswa(koleksinamasiswa[c], "PG_" + (d + 1))[0]) {
                    if (OpsiSiswa(koleksinamasiswa[c], "PG_" + (d + 1))[2] == 1) {
                        sel.setAttribute("style", "background-color:green");
                        sel.innerHTML = OpsiSiswa(koleksinamasiswa[c], "PG_" + (d + 1))[1]
                    } else {
                        sel.setAttribute("style", "background-color:red");
                        sel.innerHTML = OpsiSiswa(koleksinamasiswa[c], "PG_" + (d + 1))[1]
                    }

                } else {
                    sel.innerHTML = ""
                }


            }

        } else {
            sel = tr.insertCell(-1)
            sel.innerHTML = "Tidak ada Soal PG"

        }

    }


    let idtabel = `table_rekap_pg`;
    let judul1 = `ANALISIS SOAL ${identitasmapel.toUpperCase()}  KELAS ${idNamaKelas.toUpperCase()}`;
    let judul2 = `Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}`;
    let tekstgl = `${StringTanggal(new Date())}`;
    let namafile = `ANALISIS SOAL ${identitasmapel.toUpperCase()} Kelas ${idNamaKelas} id file ${new Date().getTime()}`;
    let xx = `${idtabel},${judul1}, ${judul2}, ${tekstgl}`;
    let xxx = `${idtabel}, ${namafile},${judul1}`

    tablinkPGtabel.innerHTML = `<button class="w3-button w3-green w3-round-xlarge" onclick="printModalL('${xx}')"><i class="fa fa-print"></i> Cetak </button> | <button class="w3-button w3-teal w3-round-xlarge" onclick="ExcelModal('${xxx}')"><i class="fa fa-file-excel-o"></i> Ms. Excel </button>  <hr>`;

    //tablinkKDtabel.appendChild(tombolprint)
    tablinkPGtabel.appendChild(tabel);








}
const formModalTabelAnalisisSkor = (id) => {
    let datamaterilocal = JSON.parse(localStorage.getItem("kbmtoday" + tglStringZero()))[id];
    let jumlahpg = parseInt(datamaterilocal.jumlahpg) + parseInt(datamaterilocal.jumlahessay);

    let identitasmapel = datamaterilocal.idmapel;
    //console.log(jumlahpg);
    let koleksinamasiswa = jsondatasiswa.map(k => k.pd_nama);

    let tabel = document.createElement("table");
    tabel.setAttribute("class", "versi-table w3-tiny");
    tabel.setAttribute("id", "table_rekap_skor");
    let thead = tabel.createTHead();
    let row = thead.insertRow(0);
    let th = document.createElement("th");
    th.setAttribute("rowspan", 2)
    th.innerHTML = "No";
    row.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("rowspan", 2)
    th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
    th.innerHTML = "NAMA SISWA";
    row.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("colspan", jumlahpg)
    th.innerHTML = "NOMOR SOAL";
    row.appendChild(th);

    row = thead.insertRow(-1)
    for (b = 0; b < jumlahpg; b++) {
        th = document.createElement("th");
        th.innerHTML = (b + 1);
        row.appendChild(th);
    }

    let bdy = tabel.createTBody();
    for (c = 0; c < koleksinamasiswa.length; c++) {
        let tr = bdy.insertRow(-1)
        let sel = tr.insertCell(-1)
        sel.innerHTML = (c + 1);

        sel = tr.insertCell(-1);
        sel.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
        sel.innerHTML = koleksinamasiswa[c];

        for (d = 0; d < jumlahpg; d++) {
            sel = tr.insertCell(-1)
            // sel.innerHTML = "-";
            if (OpsiSiswa(koleksinamasiswa[c], "PG_" + (d + 1))[0]) {
                if (OpsiSiswa(koleksinamasiswa[c], "PG_" + (d + 1))[2] == 1) {
                    sel.setAttribute("style", "background-color:green");
                    sel.innerHTML = OpsiSiswa(koleksinamasiswa[c], "PG_" + (d + 1))[2]
                } else {
                    sel.setAttribute("style", "background-color:red");
                    sel.innerHTML = OpsiSiswa(koleksinamasiswa[c], "PG_" + (d + 1))[2]
                }

            } else {
                sel.innerHTML = ""
            }

        }

    }


    let idtabel = `table_rekap_skor`;
    let judul1 = `ANALISIS SKOR SOAL ${identitasmapel.toUpperCase()}  KELAS ${idNamaKelas.toUpperCase()}`;
    let judul2 = `Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}`;
    let tekstgl = `${StringTanggal(new Date())}`;
    let namafile = `ANALISIS SKOR SOAL ${identitasmapel.toUpperCase()} Kelas ${idNamaKelas} id file ${new Date().getTime()}`;
    let xx = `${idtabel},${judul1}, ${judul2}, ${tekstgl}`;
    let xxx = `${idtabel}, ${namafile},${judul1}`

    tablinkSkortabel.innerHTML = `<button class="w3-button w3-green w3-round-xlarge" onclick="printModalL('${xx}')"><i class="fa fa-print"></i> Cetak </button> | <button class="w3-button w3-teal w3-round-xlarge" onclick="ExcelModal('${xxx}')"><i class="fa fa-file-excel-o"></i> Ms. Excel </button>  <hr>`;

    //tablinkKDtabel.appendChild(tombolprint)
    tablinkSkortabel.appendChild(tabel);








}
const forModalTabelGabungan = (id) => {
    //tes dulu bekerja di id tablinkKDtabel

    let datamaterilocal = JSON.parse(localStorage.getItem("kbmtoday" + tglStringZero()))[id];
    // // console.log(JSON.parse(datamaterilocal.kuncikd));
    let identitasmapel = datamaterilocal.idmapel;
    let datakd = JSON.parse(datamaterilocal.kuncikd);
    let punyaessay = (datamaterilocal.jumlahessay == 0) ? false : true;
    // console.log(punyaessay)

    // console.log("datakd:")
    // console.log(datakd)

    let banyakkd = Object.keys(datakd);

    // console.log("banyakkd:")
    // console.log(banyakkd.length);
    // console.log("idKD");
    // console.log(banyakkd)
    // filter untuk dijadikan unik pada key
    let mapelunik = [];
    let koleksikd = []
    let kdpermapel = {};
    for (i = 0; i < banyakkd.length; i++) {
        let mp = banyakkd[i].split("_")[0]
        if (mapelunik.indexOf(mp) == -1) {
            mapelunik.push(mp);
        }
    }
    let koleksinamasiswa = jsondatasiswa.map(k => k.pd_nama)

    // console.log(kdpermapel);
    // console.log(mapelunik)
    //bikin tabel
    let tabel = document.createElement("table")
    tabel.setAttribute("class", "versi-table w3-tiny");
    tabel.setAttribute("id", "tabel_rekap_Gabungan");
    //bikin head;
    //let row = tabel.insertRow(0)
    let rthead = tabel.createTHead();
    let rth = rthead.insertRow(0)
    let rtd = document.createElement("th")
    rtd.setAttribute("rowspan", 3)
    rtd.innerHTML = "No"
    rth.appendChild(rtd);
    rtd = document.createElement("th")
    rtd.setAttribute("rowspan", 3)
    rtd.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
    rtd.innerHTML = "Nama Siswa"
    rth.appendChild(rtd);
    if (punyaessay) {
        rtd = document.createElement("th")
        rtd.setAttribute("rowspan", 3)
        rtd.innerHTML = "Koreksi"
        rth.appendChild(rtd);
    }

    rtd = document.createElement("th")
    rtd.setAttribute("colspan", banyakkd.length)
    rtd.innerHTML = "Mata Pelajaran"
    rth.appendChild(rtd);

    rth = rthead.insertRow(-1);
    rth.setAttribute("colspan", banyakkd.length);
    rth2 = rthead.insertRow(-1)
    for (k = 0; k < mapelunik.length; k++) {
        rtd = document.createElement("th")
        //  rtd.innerHTML = mapelunik[k]
        //  rth.appendChild(rtd);
        let coun = 0;

        for (j = 0; j < banyakkd.length; j++) {

            let st = banyakkd[j]
            if (st.indexOf(mapelunik[k]) > -1) {
                coun++;


                //let tekconsol = "Mapel " + mapelunik[k] +"KD " + banyakkd[j];
                //console.log(tekconsol)
                let rtd1 = document.createElement("th")
                rtd1.innerHTML = banyakkd[j].split("_")[1] + "<br>" + banyakkd[j]
                rth2.appendChild(rtd1);
            }
        }
        rtd.innerHTML = mapelunik[k]
        rtd.setAttribute("colspan", coun)
        rth.appendChild(rtd);
    }
    let tbo = tabel.createTBody();
    for (z = 0; z < koleksinamasiswa.length; z++) {
        let rowisi = tbo.insertRow(-1);
        let sel = rowisi.insertCell(-1)
        sel.innerHTML = (z + 1);

        sel = rowisi.insertCell(-1)
        sel.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
        sel.innerHTML = koleksinamasiswa[z];
        if (punyaessay) {
            sel = rowisi.insertCell(-1)
            sel.innerHTML = `<button class="w3-button w3-blue">Koreksi</button>`;
        }
        for (a = 0; a < mapelunik.length; a++) {
            //  rtd.innerHTML = mapelunik[k]
            //  rth.appendChild(rtd);
            let coun = 0;

            for (j = 0; j < banyakkd.length; j++) {

                let st = banyakkd[j]
                if (st.indexOf(mapelunik[a]) > -1) {
                    coun++;


                    let tekconsol = "Mapel " + mapelunik[a] + "KD " + banyakkd[j];
                    //console.log(tekconsol)

                    let sell = rowisi.insertCell(-1)
                    sell.innerHTML = nilaiKDSiswa(koleksinamasiswa[z], banyakkd[j]);// banyakkd[j] + "nama = " + koleksinamasiswa[z];

                }
            }
        }

    }



    let idtabel = `tabel_rekap_Gabungan`;
    let judul1 = `DAFTAR NILAI PER-KD ${identitasmapel.toUpperCase()}  KELAS ${idNamaKelas.toUpperCase()}`;
    let judul2 = `Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}`;
    let tekstgl = `${StringTanggal(new Date())}`;
    let namafile = `DAFTAR NILAI PER-KD ${identitasmapel.toUpperCase()} Kelas ${idNamaKelas} id file ${new Date().getTime()}`;
    let xx = `${idtabel},${judul1}, ${judul2}, ${tekstgl}`;
    let xxx = `${idtabel}, ${namafile},${judul1}`

    tablinkGabungantabel.innerHTML = `<button class="w3-button w3-green w3-round-xlarge" onclick="printModalP('${xx}')"><i class="fa fa-print"></i> Cetak </button> | <button class="w3-button w3-teal w3-round-xlarge" onclick="ExcelModal('${xxx}')"><i class="fa fa-file-excel-o"></i> Ms. Excel </button>  <hr>`;

    //tablinkKDtabel.appendChild(tombolprint)
    tablinkGabungantabel.appendChild(tabel);

}
const printModalPKD = (xx) => {
    let idtabel = xx.split(",")[0],
        judul1 = xx.split(",")[1],
        judul2 = xx.split(",")[2],
        tgl = xx.split(",")[3];
    // alert("tes print rekap semeste");
    let t = new Date()
    let s = StringTanggal(t);
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    //tabelhasil.setAttribute("class","versi-table garis");
    //tabelhasil.setAttribute("style","border-spacing: 0");
    tabelhasil.setAttribute("id", "myTableCopy");


    var tabeleditt = document.getElementById(idtabel);//.getElementsByTagName("tbody")[0];
    //   var tabeleditt = document.getElementById("tabel_rekap_KD");//.getElementsByTagName("tbody")[0];
    tabeleditt.outerHTML.replace("position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000", "display:block")
    tabeleditt.outerHTML.replace("box-shadow: inset 0 0 1px #000000", "border:1px solid black")
    tabeleditt.getElementsByTagName("tbody")[0].removeAttribute("class");
    var cln = tabeleditt.cloneNode(true);

    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);
    //hapus thead kolom ke 3 dengan indeks 2
    var tabeledithead = document.getElementById("myTableCopy").getElementsByTagName("thead")[0];
    tabeledithead.rows[0].deleteCell(2);

    var tabeledit = document.getElementById("myTableCopy").getElementsByTagName("tbody")[0];
    for (i = 0; i < tabeledit.rows.length; i++) {
        for (j = 0; j < 4; j++) {
            if (j == 2) {
                tabeledit.rows[i].deleteCell(j)
            }
        };


    }

    let sr = SemesterBerapaSekarang();
    //   printPortrait("myTableCopy,Daftar Rekap Absen Kelas "+ruangankelas+", Semester "+ sr+ " Tahun Pelajaran "+idTeksTapel+","+s);
    printPortrait("myTableCopy, " + judul1 + ", " + judul2 + ", " + tgl)
    datasiswadiv.innerHTML = "";
}
const printModalP = (xx) => {
    let idtabel = xx.split(",")[0],
        judul1 = xx.split(",")[1],
        judul2 = xx.split(",")[2],
        tgl = xx.split(",")[3];
    // alert("tes print rekap semeste");
    let t = new Date()
    let s = StringTanggal(t);
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    //tabelhasil.setAttribute("class","versi-table garis");
    //tabelhasil.setAttribute("style","border-spacing: 0");
    tabelhasil.setAttribute("id", "myTableCopy");


    var tabeleditt = document.getElementById(idtabel);//.getElementsByTagName("tbody")[0];
    //   var tabeleditt = document.getElementById("tabel_rekap_KD");//.getElementsByTagName("tbody")[0];
    tabeleditt.outerHTML.replace("position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000", "display:block")
    tabeleditt.outerHTML.replace("box-shadow: inset 0 0 1px #000000", "border:1px solid black")
    tabeleditt.getElementsByTagName("tbody")[0].removeAttribute("class");
    var cln = tabeleditt.cloneNode(true);

    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);

    let sr = SemesterBerapaSekarang();
    //   printPortrait("myTableCopy,Daftar Rekap Absen Kelas "+ruangankelas+", Semester "+ sr+ " Tahun Pelajaran "+idTeksTapel+","+s);
    printPortrait("myTableCopy, " + judul1 + ", " + judul2 + ", " + tgl)
    datasiswadiv.innerHTML = "";
}
const printModalL = (xx) => {
    let idtabel = xx.split(",")[0],
        judul1 = xx.split(",")[1],
        judul2 = xx.split(",")[2],
        tgl = xx.split(",")[3];
    // alert("tes print rekap semeste");
    let t = new Date()
    let s = StringTanggal(t);
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    //tabelhasil.setAttribute("class","versi-table garis");
    //tabelhasil.setAttribute("style","border-spacing: 0");
    tabelhasil.setAttribute("id", "myTableCopy");


    var tabeleditt = document.getElementById(idtabel);//.getElementsByTagName("tbody")[0];
    //   var tabeleditt = document.getElementById("tabel_rekap_KD");//.getElementsByTagName("tbody")[0];
    tabeleditt.outerHTML.replace("position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000", "display:block")
    tabeleditt.outerHTML.replace("box-shadow: inset 0 0 1px #000000", "border:1px solid black")
    tabeleditt.getElementsByTagName("tbody")[0].removeAttribute("class");
    var cln = tabeleditt.cloneNode(true);

    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);

    let sr = SemesterBerapaSekarang();
    //   printPortrait("myTableCopy,Daftar Rekap Absen Kelas "+ruangankelas+", Semester "+ sr+ " Tahun Pelajaran "+idTeksTapel+","+s);
    printLandscape("myTableCopy, " + judul1 + ", " + judul2 + ", " + tgl)
    datasiswadiv.innerHTML = "";
}
const ExcelModal = (xx) => {
    let idtabel = xx.split(",")[0],
        namafileexcel = xx.split(",")[1],
        judul = xx.split(",")[2];
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    tabelhasil.setAttribute("class", "versi-table");
    tabelhasil.setAttribute("id", "myTableCopy");

    var tabeleditt = document.getElementById(idtabel);//.getElementsByTagName("tbody")[0];
    var cln = tabeleditt.cloneNode(true);
    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);


    //let cobatabel = tabeledit;// 
    let tabeledit = document.getElementById("myTableCopy").getElementsByTagName("tbody")[0];
    let tabeledithead = document.getElementById("myTableCopy").getElementsByTagName("thead")[0];
    let countcol = tabeledit.rows[0].cells.length;
    let brs = tabeledithead.insertRow(0)
    let sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.setAttribute("style", "text-align:center");
    sel.innerHTML = idNamaSekolah.toUpperCase()

    brs = tabeledithead.insertRow(1)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol)
    sel.innerHTML = judul;//"DAFTAR SISWA KELAS " + idNamaKelas.toUpperCase();

    brs = tabeledithead.insertRow(2)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.innerHTML = "Semester " + idSemester + " Tahun Pelajaran " + idTeksTapel

    brs = tabeledithead.insertRow(3)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol)

    //---------- TAMBAHKAN TANDA TANGAN

    //let cobatabel = tabeledit;// document.getElementById("myTableCopy");
    let rowcount = tabeledit.rows.length;
    console.log(rowcount)
    let colcount = tabeledit.rows[0].cells.length;
    countcol = tabeledit.rows[0].cells.length;
    if (colcount >= 5) {

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "NIP. " + idNipKepsek;
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = "NIP. " + idNipGuruKelas;
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "<b><u>" + idNamaKepsek + "</u></b>"
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = "<b><u>" + namauser + "</u></b>"
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas

        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Kepala " + idNamaSekolah;
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = idJenisGuru + " " + idgurumapelmapel
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas



        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Mengetahui,";
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date())
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas




        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)


    } else {
        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "NIP. " + idNipKepsek;


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "<b><u>" + idNamaKepsek + "</u></b>"


        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Kepala " + idNamaSekolah;


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Mengetahui,";




        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "NIP. " + idNipGuruKelas;


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "<b><u>" + namauser + "</u></b>"


        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = idJenisGuru + " " + idgurumapelmapel


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek

        sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date())




        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)


    }

    let s = SemesterBerapaSekarang()
    $("#myTableCopy").table2excel({
        //exclude: ".excludeThisClass",
        //name: "Worksheet Name",
        //filename: "SomeFile.xls", // do include extension
        //preserveColors: true // set to true if you want background colors and font colors preserved
        name: "Worksheet Name",
        // filename: "Data Rekap Absen Kelas "+ ruangankelas +" Semester "+s+" dicetak pada " + new Date(),
        filename: namafileexcel,
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 2
    });
    datasiswadiv.innerHTML = "";
}
const ExcelModalKD = (xx) => {
    let idtabel = xx.split(",")[0],
        namafileexcel = xx.split(",")[1],
        judul = xx.split(",")[2];
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    tabelhasil.setAttribute("class", "versi-table");
    tabelhasil.setAttribute("id", "myTableCopy");

    var tabeleditt = document.getElementById(idtabel);//.getElementsByTagName("tbody")[0];
    var cln = tabeleditt.cloneNode(true);
    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);

    var tabeledithead = document.getElementById("myTableCopy").getElementsByTagName("thead")[0];
    tabeledithead.rows[0].deleteCell(2);

    var tabeledit = document.getElementById("myTableCopy").getElementsByTagName("tbody")[0];
    for (i = 0; i < tabeledit.rows.length; i++) {
        for (j = 0; j < 4; j++) {
            if (j == 2) {
                tabeledit.rows[i].deleteCell(j)
            }
        };


    }
    //------------------
    //let cobatabel = tabeledit;// document.getElementById("myTableCopy");
    let countcol = tabeledit.rows[0].cells.length;
    let brs = tabeledithead.insertRow(0)
    let sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.setAttribute("style", "text-align:center");
    sel.innerHTML = idNamaSekolah.toUpperCase()

    brs = tabeledithead.insertRow(1)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol)
    sel.innerHTML = judul;

    brs = tabeledithead.insertRow(2)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.innerHTML = "Semester " + idSemester + " Tahun Pelajaran " + idTeksTapel

    brs = tabeledithead.insertRow(3)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol)

    //---------- TAMBAHKAN TANDA TANGAN

    //let cobatabel = tabeledit;// document.getElementById("myTableCopy");
    let rowcount = tabeledit.rows.length;
    console.log(rowcount)
    let colcount = tabeledit.rows[0].cells.length;
    countcol = tabeledit.rows[0].cells.length;
    if (colcount >= 5) {

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "NIP. " + idNipKepsek;
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = "NIP. " + idNipGuruKelas;
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "<b><u>" + idNamaKepsek + "</u></b>"
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = "<b><u>" + namauser + "</u></b>"
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas

        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Kepala " + idNamaSekolah;
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = idJenisGuru + " " + idgurumapelmapel
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas



        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Mengetahui,";
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas
        sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date())
        sel = brs.insertCell(-1) /// colom ketiga titimangsa guru kelas




        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)


    } else {
        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "NIP. " + idNipKepsek;


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "<b><u>" + idNamaKepsek + "</u></b>"


        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Kepala " + idNamaSekolah;


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "Mengetahui,";




        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "NIP. " + idNipGuruKelas;


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = "<b><u>" + namauser + "</u></b>"


        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        sel.innerHTML = idJenisGuru + " " + idgurumapelmapel


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek

        sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date())




        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)


    }

    let s = SemesterBerapaSekarang()
    $("#myTableCopy").table2excel({
        //exclude: ".excludeThisClass",
        //name: "Worksheet Name",
        //filename: "SomeFile.xls", // do include extension
        //preserveColors: true // set to true if you want background colors and font colors preserved
        name: "Worksheet Name",
        // filename: "Data Rekap Absen Kelas "+ ruangankelas +" Semester "+s+" dicetak pada " + new Date(),
        filename: namafileexcel,
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 4
    });
    datasiswadiv.innerHTML = "";
}
function printPortrait(x) {
    var splitt = x.split(',')

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
    //headnya.appendChild(foot);
    var css = '@page { size: portrait;}';
    //head = document.head || document.getElementsByTagName('head')[0],
    var style = document.createElement('style');
    var cssd = '.versii-table {width:950px;max-width:100%;border-collapse:collapse}.versii-table th,.versii-table td,.versii-table tr {border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versii-table th{background-color:#eee;color:blue;vertical-align:middle;text-align:center}.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}.versi-table {width:auto;max-width:100%;border-collapse:collapse}.versi-table th,.versi-table td,.versi-table tr {border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th{background-color:#eee;color:blue;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}versi-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}';
    headnya.innerHTML += '<style>' + cssd + '</style>';

    style.type = 'text/css';
    style.media = 'print';

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));

    }

    var d = new Date(bulan);
    var tglakhir = d.getDate();
    var blnakhirr = d.getMonth();
    var namabulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    var thnakhirr = d.getFullYear();
    //var tglakhirr = daysInMonth(blnakhirr+1,thnakhirr);
    var namakepsekku = idNamaKepsek;
    var nipkepsekku = idNipKepsek;//document.getElementById('nipkepsek').innerHTML;
    var guruapa = idJenisGuru + " " + idgurumapelmapel;//document.getElementById("tblguru").innerHTML+" "+document.frmlogin.kelasguru.value;
    var namaguruku = namauser;//document.getElementById('namagurux').innerHTML;
    var nipguruku = idNipGuruKelas;//document.getElementById('nipgurux').innerHTML;

    headnya.appendChild(style);
    var bodynya = isi.body;
    //var teksbody = document.getElementById(id).innerHTML;
    var teksbody = document.getElementById(id).innerHTML.replace("position:sticky;position:-webkit-sticky", "").replace("box-shadow: inset 0 0 1px #000000", "");
    //var teksbody =document.getElementById(id).outerHTML;
    bodynya.innerHTML = "";
    //bodynya.innerHTML='<style>'+cssd+'</style>';
    //bodynya.innerHTML+='<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">';
    bodynya.innerHTML += '<h1 style="text-align:center">' + h1 + '</h1>';
    bodynya.innerHTML += '<h2 style="text-align:center">' + h2 + '</h2>';
    bodynya.innerHTML += teksbody;
    bodynya.innerHTML += '<br/><br/><br/>';
    bodynya.innerHTML += '<div style="float:left;position:relative;margin-left:50px;text-align:center">Mengetahui,<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><br/><u><b>' + namakepsekku + '</b></u><br/>NIP. ' + nipkepsekku + '</div>';
    bodynya.innerHTML += '<div style="float:right;position:relative;text-align:center"> Depok , ' + tglakhir + ' ' + namabulan[blnakhirr] + ' ' + thnakhirr + '<br/>' + guruapa + '<br/><br/><br/><br/><br/><b><u>' + namaguruku + '</u></b><br/>NIP. ' + nipguruku + '</div>';
    //bodynya.innerHTML+='<br/><br/><br/>'+guruapa+'<br/><br/><br/><b><u>'+namaguruku+'</u></b><br/>NIP. '+nipguruku+'</div>';


    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}
function printLandscape(x) {
    var splitt = x.split(',')

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
    //headnya.appendChild(foot);
    var css = '@page { size: landscape;}';
    //head = document.head || document.getElementsByTagName('head')[0],
    var style = document.createElement('style');
    var cssd = '.versii-table {width:950px;max-width:100%;border-collapse:collapse}.versii-table th,.versii-table td,.versii-table tr {border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versii-table th{background-color:#eee;color:blue;vertical-align:middle;text-align:center}.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}.versi-table {width:auto;max-width:100%;border-collapse:collapse}.versi-table th,.versi-table td,.versi-table tr {border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th{background-color:#eee;color:blue;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}versi-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}';
    headnya.innerHTML += '<style>' + cssd + '</style>';

    style.type = 'text/css';
    style.media = 'print';

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));

    }
    var d = new Date(bulan);
    var tglakhir = d.getDate();
    var blnakhirr = d.getMonth();
    var namabulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    var thnakhirr = d.getFullYear();
    //var tglakhirr = daysInMonth(blnakhirr+1,thnakhirr);
    var namakepsekku = idNamaKepsek;
    var nipkepsekku = idNipKepsek;//document.getElementById('nipkepsek').innerHTML;
    var guruapa = idJenisGuru + " " + idgurumapelmapel;//document.getElementById("tblguru").innerHTML+" "+document.frmlogin.kelasguru.value;
    var namaguruku = namauser;//document.getElementById('namagurux').innerHTML;
    var nipguruku = idNipGuruKelas;//document.getElementById('nipgurux').innerHTML;

    headnya.appendChild(style);
    var bodynya = isi.body;
    //var teksbody = document.getElementById(id).innerHTML;
    var teksbody = document.getElementById(id).innerHTML.replace("position:sticky;position:-webkit-sticky", "").replace("box-shadow: inset 0 0 1px #000000", "");
    //var teksbody =document.getElementById(id).outerHTML;
    bodynya.innerHTML = "";
    bodynya.innerHTML = '<style>' + cssd + '</style>';
    //bodynya.innerHTML+='<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">';
    bodynya.innerHTML += '<h1 style="text-align:center">' + h1 + '</h1>';
    bodynya.innerHTML += '<h2 style="text-align:center">' + h2 + '</h2>';
    bodynya.innerHTML += teksbody;
    bodynya.innerHTML += '<br/><br/><br/>';
    bodynya.innerHTML += '<div style="float:left;position:relative;margin-left:50px;text-align:center">Mengetahui,<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><br/><u><b>' + namakepsekku + '</b></u><br/>NIP. ' + nipkepsekku + '</div>';
    bodynya.innerHTML += '<div style="float:right;position:relative;text-align:center"> Depok , ' + tglakhir + ' ' + namabulan[blnakhirr] + ' ' + thnakhirr + '<br/>' + guruapa + '<br/><br/><br/><br/><br/><b><u>' + namaguruku + '</u></b><br/>NIP. ' + nipguruku + '</div>';
    //bodynya.innerHTML+='<br/><br/><br/>'+guruapa+'<br/><br/><br/><b><u>'+namaguruku+'</u></b><br/>NIP. '+nipguruku+'</div>';


    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}

function brklinemodellama(teks) { //coba
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
            katajadi = Q_PG;//+ "<hr style='border-top:1px solid olive'/>";

        } else if (asal.indexOf("_OPSI-PG_") > -1) {
            var opsipg = "";
            var arpgg = asal.replace("_OPSI-PG_", ""); // hasilnya: 1A teks pertanyaan bla bla bla
            var arpg = arpgg.split(" "); //hasilnya: 0=1A 1=teks 2=pertanyaan ... dst.
            var idopsi = arpg[0]; // hasilnya: 1A
            //var abjad = idopsi.slice(1, 2); // hasilnya A
            //var nosoal = idopsi.slice(0, 1); // hasilnya 1
            var nosoal = idopsi.match(/(\d+)/)[0];//parseInt(idopsi);
            var abjad = idopsi.replace(nosoal, "");

            if (abjad === "A") {
                opsipg += "<hr style='border-top:1px solid olive'/>";
                opsipg += "<ol style='list-style-type:upper-alpha;margin:5px 5px 0px 20px;padding:0' ><li><input class='calc' type='radio' name='soal" + nosoal + "' id='" + idopsi + "'/><label class='opsi' for='" + idopsi + "'>"; // Khusus opsi A, ada elemen OL lalu dilanjut teksnya
            } else {
                opsipg += "<li><input class='calc' type='radio'  name='soal" + nosoal + "' id='" + idopsi + "'/><label class='opsi' for='" + idopsi + "'>"; // selain opsi A, dilanjut.  Tapi tanpa element OL
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
            var nosoal = idopsi.match(/(\d+)/)[0];//parseInt(idopsi);
            var abjad = idopsi.replace(nosoal, "");

            if (abjad === "A") {
                opsipg += "<hr style='border-top:1px solid olive'/>";
                opsipg += "<ol style='list-style-type:upper-alpha;margin:5px 5px 0px 20px;padding:0' ><li><input class='calc' type='radio'  name='soal" + nosoal + "' id='" + idopsi + "'/><label class='opsi' for='" + idopsi + "'>"; // Khusus opsi A, ada elemen OL lalu dilanjut teksnya
            } else {
                opsipg += "<li><input class='calc' type='radio' name='soal" + nosoal + "' id='" + idopsi + "'/><label class='opsi' for='" + idopsi + "'>"; // selain opsi A, dilanjut.  Tapi tanpa element OL
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
            katajadi += "<img src='https://1.bp.blogspot.com/-q57d59JTX8g/Xa-kAy6T0XI/AAAAAAAAOSo/seM01RU3Q_Q7BvLm73wC09BBsQMs05pYACLcBGAsYHQ/s320/LOGO%2BLAMASO.png'  style='width:145px;margin:auto;border:1px solid blue'/>";
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
            var kunci = basekunci;
            //basekunci = arrkunci;//window.btoa(arrkunci);
            //localStorage.setItem("keybase", basekunci)
            //localStorage.setItem("artikeybase", window.atob(basekunci))

            //   var keypg = document.getElementById("keypg");
            //     keypg.setAttribute("style", "display:none")

            //   //var teksscript = document.createTextNode("var keybase='"+basekunci+"'");
            //   //	keypg.appendChild(teksscript);
            //   keypg.innerHTML = "var keybase='" + basekunci + "'";
            //   tttkeybase.innerHTML = basekunci;

        } else if (asal.indexOf("_KUNCI-KD_") > -1) {
            //REPLACE DULU = misal: _KUNCI-PG_1A, 2B, 3C<kalo adaspasi>
            var tekskunci = asal.replace("_KUNCI-KD_", "").replace(/\s+/g, "").split("<||>");//.split(":");
            let ar = []
            let ob = {};
            for (i = 0; i < tekskunci.length; i++) {

                // ob[tekskunci[i].split(":")[0]] = tekskunci[i].split(":")[1].split(",");
                ob[tekskunci[i].split(":")[0]] = tekskunci[i].split(":")[1].replace("[", "").replace("]", "").split(",");
                ar.push(ob)
            }
            var kdkd = tekskunci.join("<br>");//.join("<br>");
            //   localStorage.setItem("kuncikd", JSON.stringify(ob)) ;// ---> sudah objek array



        } else {
            var katakonversi = katajadireplace(asal);
            katajadi += katakonversi + "<br/>";

        }
        inn += katajadi; //+ "&lt;br/&gt;" ;
    }
    let data = {};
    data.teks = inn;
    data.kunci = kunci;
    data.kd = kdkd;

    // return inn
    return data
}

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
            katajadi = Q_PG;//+ "<hr style='border-top:1px solid olive'/>";

        } else if (asal.indexOf("_OPSI-PG_") > -1) {
            var opsipg = "";
            var arpgg = asal.replace("_OPSI-PG_", ""); // hasilnya: 1A teks pertanyaan bla bla bla
            var arpg = arpgg.split(" "); //hasilnya: 0=1A 1=teks 2=pertanyaan ... dst.
            var idopsi = arpg[0]; // hasilnya: 1A
            //var abjad = idopsi.slice(1, 2); // hasilnya A
            //var nosoal = idopsi.slice(0, 1); // hasilnya 1
            var nosoal = idopsi.match(/(\d+)/)[0];//parseInt(idopsi);
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
            var nosoal = idopsi.match(/(\d+)/)[0];//parseInt(idopsi);
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
            katajadi += "<img src='https://1.bp.blogspot.com/-q57d59JTX8g/Xa-kAy6T0XI/AAAAAAAAOSo/seM01RU3Q_Q7BvLm73wC09BBsQMs05pYACLcBGAsYHQ/s320/LOGO%2BLAMASO.png'  style='width:145px;margin:auto;border:1px solid blue'/>";
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
            var kunci = basekunci;
            //basekunci = arrkunci;//window.btoa(arrkunci);
            //localStorage.setItem("keybase", basekunci)
            //localStorage.setItem("artikeybase", window.atob(basekunci))

            //   var keypg = document.getElementById("keypg");
            //     keypg.setAttribute("style", "display:none")

            //   //var teksscript = document.createTextNode("var keybase='"+basekunci+"'");
            //   //	keypg.appendChild(teksscript);
            //   keypg.innerHTML = "var keybase='" + basekunci + "'";
            //   tttkeybase.innerHTML = basekunci;

        } else if (asal.indexOf("_KUNCI-KD_") > -1) {
            //REPLACE DULU = misal: _KUNCI-PG_1A, 2B, 3C<kalo adaspasi>
            var tekskunci = asal.replace("_KUNCI-KD_", "").replace(/\s+/g, "").split("<||>");//.split(":");
            let ar = []
            let ob = {};
            for (i = 0; i < tekskunci.length; i++) {

                // ob[tekskunci[i].split(":")[0]] = tekskunci[i].split(":")[1].split(",");
                ob[tekskunci[i].split(":")[0]] = tekskunci[i].split(":")[1].replace("[", "").replace("]", "").split(",");
                ar.push(ob)
            }
            var kdkd = tekskunci.join("<br>");//.join("<br>");
            //   localStorage.setItem("kuncikd", JSON.stringify(ob)) ;// ---> sudah objek array



        } else {
            var katakonversi = katajadireplace(asal);
            katajadi += katakonversi + "<br/>";

        }
        inn += katajadi; //+ "&lt;br/&gt;" ;
    }
    let data = {};
    data.teks = inn;
    data.kunci = kunci;
    data.kd = kdkd;

    // return inn
    return data
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
            //katajadi += a + "<sup>" + b + "</sup>";

        } else if (splitTeks[i].indexOf("_PANGKAT-HURUF_") > -1) {
            var a = splitTeks[i].replace("_PANGKAT-HURUF_", "").split("/")[0];
            var b = splitTeks[i].replace("_PANGKAT-HURUF_", "").split("/")[1];
            //katajadi += " <img src='https://chart.apis.google.com/chart?cht=tx&chl=%5C" + a + "^" + b + "%20&chf=bg%2Cs%2CFFFFFF80&chco=000000' /> "
            katajadi += "<span class='w3-cursive'>" + a + "</span><sup>" + b + "</sup>";

        } else if (splitTeks[i].indexOf("_EQUATION-LAINNYA_") > -1) {
            var a = splitTeks[i].replace("_EQUATION-LAINNYA_", "");
            var b = decodeURIComponent(a);
            //var c = decodeURIComponent(b);
            katajadi += " <img src='https://chart.apis.google.com/chart?cht=tx&chl=" + b + "%20&chf=bg%2Cs%2CFFFFFF80&chco=000000' /> "


        } else if (splitTeks[i].indexOf("_YOUTUBE_") > -1) {
            var linkyoutube, konv, konv2, konv3;
            konv = splitTeks[i].replace("_YOUTUBE_", "<br/><div class='containerbaru'><iframe class='responsive-iframebaru ' src='")
            konv2 = konv.replace("https://youtu.be/", "https://www.youtube.com/embed/"); // kalo link awalnya https://youtu.be/ 
            konv3 = konv2.replace("watch?v=", "embed/"); // jika diambil dari https://www.youtube.com/
            linkyoutube = konv3 + "' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div><br/>";

            katajadi += linkyoutube;

        } else if (splitTeks[i].indexOf("_OPSI-SEL_") > -1) {
            var splitteks = splitTeks[i].replace("_OPSI-SEL_", "").split(" ");
            var id = splitteks[0]; //4A

            var id = splitteks[0].replace(/\s+/g, ""); //4A

            var abjad = (id.length == 2) ? id.slice(1, 2) : id.slice(2, 3); //B
            var nosoal = id.match(/(\d+)/)[0];// id.slice(0, 1); //nosoal 4
            var innteks = "<input class='calc' type='radio'  name='soal" + nosoal + "' id='" + id + "'/><label class='opsi' for='" + id + "'>" + abjad + "</label>"

            katajadi += innteks;
        } else if (splitTeks[i].indexOf("_PHI_") > -1) {
            katajadi += `<img src="https://chart.apis.google.com/chart?cht=tx&amp;chl=%5Cpi%20&amp;chf=bg%2Cs%2CFFFFFF100&amp;chco=000000">`
        } else if (splitTeks[i].indexOf('display:none') > -1) {
            katajadi += splitTeks[i].replace("display:none", "display:block");

        } else if (splitTeks[i].indexOf('tombolkirimnilaielamaso()') > -1) {
            katajadi += splitTeks[i].replace("tombolkirimnilaielamaso()", "alert('Maaf, tombol dinonaktirkan')");

        }
        else {
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
    //for (x in split){
    for (x = 1; x < split.length; x++) {
        if (split[x].length > 0) {
            teksganti += gantiawal + split[x] + gantiakhir;
        }; //.split(" ")[0] +"</h3>";

    }
    return teksganti
}

function tambahtombolisijawaban() {
    //if(versi == "")
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


const previewkronologi = (par) => {
    pranalamateri.style.display = "block";
    document.querySelector(".classReviewMateri").innerHTML = "";
    let tes = document.querySelector(".classReviewMateri");
    //let keyy = "kbmtoday" + tglStringZero()

    //let datamateri = JSON.parse(localStorage.getItem(keyy))
    let datamateri = kronologijson;
    let versi = datamateri[par].versi;
    

    //bikin judul h4
    var judul = document.createElement("h4")
    judul.setAttribute("class", "w3-center");
    judul.innerHTML = "Identitas e-Lamaso";
    tes.innerHTML = ""
    tes.appendChild(judul);

    //-- Bikin Tabel identitas:
    var tabelidentitas = document.createElement("table");
    tabelidentitas.setAttribute("class", "versi-table tabel_idreview");
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
    td.innerHTML = "NAMA SISWA ANDA"
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kelas"
    var td = tr.insertCell(-1);
    td.innerHTML = idNamaKelas;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Mapel/Tema"
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idmapel;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Frekuensi Akses"
    var td = tr.insertCell(-1);
    var keteranganakses;
    if (datamateri[par].idaksessiswa == "sekali") {
        keteranganakses = "TEST <br>Sekali saja sejak mengirim nilai"
    } else {
        keteranganakses = "LATIHAN <br>Berapa kali saja untuk latihan"
    }
    td.innerHTML = keteranganakses;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Tanggal Publikasi"
    var td = tr.insertCell(-1);
    td.innerHTML = tanggalfulllengkap(datamateri[par].idtgl);

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kompetensi KD<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>"
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forKD")
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kunci Jawaban<br><sub class='w3-text-red'>Tidak akan muncul di siswa</sub>"
    var td = tr.insertCell(-1);
    td.setAttribute("id", "forkuncijawaban")
    td.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;


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
    cel1.innerHTML += "";
    cel1.appendChild(cdmenit);
    cel1.appendChild(titikdua)
    cel1.appendChild(cddetik);
    cel1.innerHTML += "<br/><sub>Waktu hanya berjalan di laman siswa</sub>";

    tes.appendChild(tabelidentitas)

    tes.appendChild(tabelidentitas)
    var brek = document.createElement("div")

    brek.setAttribute("style", "break-after:page");
    tes.appendChild(brek)

    var idm = encodeURIComponent(datamateri[par].idmateri);
    //
    $('.classReviewMateri').nextAll('button').remove();
    $.getJSON(linkmateri + "&idmateri=" + idm + "&action=previewriwayat", function (json) {
        //  loadingmodal.style.display="none";
        //$("#output").html(brkline(json))
        // document.getElementById("judulpetunjuk").innerHTML = "Preview e-Lamaso";
        //        document.getElementById("isipetunjuk").innerHTML = brkline(json);
        //   document.querySelector(".kontenmateri").innerHTML += brkline(json);
        tes.innerHTML += brkline(json).teks;
        let inhtml = "<table class='versi-table w3-tiny'><tr><td>Mapel</td><td>KD</td><td>No Soal</td></tr>";
        let xx = brkline(json).kd.split("<br>");
        for (a = 0; a < xx.length; a++) {
            inhtml += `<tr><td> ${xx[a].split("_")[0]}</td><td> ${xx[a].split("_")[1].split(":")[0]}</td><td>${xx[a].split("_")[1].split(":")[1]}</td></tr>`
        }
        inhtml += `</table>`;

        forKD.innerHTML = inhtml;//brkline(json).kd;
        // forkuncijawaban.innerHTML = window.atob(brkline(json).kunci).split(",").join("<br>");
        let tekskunci = brkline(json).kunci;
        //console.log(tekskunci);
        if (tekskunci == "" || tekskunci == "undefined" || tekskunci == null) {
            forkuncijawaban.innerHTML = "Tidak Ada PG"
        } else {
            forkuncijawaban.innerHTML = window.atob(tekskunci).split(",").join("<br>");

        }

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
        let tombol = document.createElement("button");
        tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
        tombol.setAttribute("onclick", `printPortrait('idpracetak,,,${StringTanggal(new Date())}')`);
        tombol.innerHTML = `<i class="fa fa-print"></i>  Cetak `

        tes.after(tombol)
    })
    // ;


}

const pengenbuatcrtToken = () => {
    let val = document.formeditmateri.idtgl.value;
    let d = new Date(val)
    let dd = d.getDate();
    let mm = d.getMonth() + 1;
    let yy = d.getFullYear();




    let newval = addZero(dd) + "" + addZero(mm) + "" + yy;
    //console.log(newval)
    document.formeditmateri.crtToken.value = newval

}

const gabolehaksessekali = () => {
    let akses = document.formeditmateri.idaksessiswa.value
    let betulbetul = (akses == "sekali") ? false : true;
    if (betulbetul) {
        alert("Anda tidak bisa memilih jenis tagihan, karena jenis pembelajaran(KBM) yang Anda edit hanya untuk latihan/tidak menerima tagihan nilai dari siswa");
        document.formeditmateri.jenistagihan.value = ""
    }

}

const janganadatagihan = () => {
    let akses = document.formeditmateri.idaksessiswa.value
    let betulbetul = (akses == "sekali") ? false : true;
    if (betulbetul) {
        document.formeditmateri.jenistagihan.value = ""

    }
}

const kirimeditmateri = () => {
    //alert("ya jalan ...")
    let dom = document.getElementById("formeditmateri");
    let data = new FormData(dom);
    idpracetak.innerHTML = `<i class="fa fa-spin fa-spinner w3-xxxlarge"></i> On Proess kirim`
    let url = linkmateri + "&action=editaksesmateri"
    fetch(url, { method: 'post', body: data })
        .then(m => m.json())
        .then(f => {
            idpracetak.innerHTML = f.result;
            pembelajaran();
            updatematerikan();

        })
        .catch(er => idpracetak.innerHTML = "Maaf terjadi kesalahan, coba lagi. Pesan error:" + er)


}





const stringForDateTimeLocal = (tgl) => {
    let n = new Date(tgl);
    let yyyy = n.getFullYear();
    let mmmm = n.getMonth() + 1;
    let MM = addZero(mmmm);
    let dd = addZero(n.getDate());
    let hh = addZero(n.getHours());
    let mm = addZero(n.getMinutes())
    let ss = addZero(n.getSeconds())
    let teks = yyyy + "-" + MM + "-" + dd + "T" + hh + ":" + mm + ":" + ss
    return teks
}

function unggahmateri() { // upload offline atau ambil file dari drive PC/root HP
    var isimapel = document.formuploadmateri.idmapel.value;
    var isitanggal = document.formuploadmateri.idtgl.value;
    var isidurasi = document.formuploadmateri.iddurasi.value;
    var isiakses = document.formuploadmateri.idaksessiswa.value;
    if (isimapel == "" || isitanggal == "" || isidurasi == "") { // Beri kondisi jika isian tidak lengkap maka ditolak
        alert("Isian tidak lengkap, Mohon lengkapi isian data di atas");

        document.getElementById("uploadmateri").value = "";
    } else {
        var item = "";

        item = "";
        item = document.getElementById("uploadmateri").files[0];

        var fr = new FileReader();
        fr.onload = function () {

            var tes = brkline(fr.result);
            //document.getElementById("output").textContent = tes ;//fr.result;

            //document.getElementById("materiimport").innerHTML+="</div>";					
            document.getElementById("materiimport").appendChild(tabelpreview);
            document.getElementById("materiimport").innerHTML += tes; //fr.result;
            document.getElementById("namafileupload").innerHTML = item.name + " (" + (item.size / 1000).toFixed(2) + " Kb)";
            $("#previewlogohp").hide();
            $("#previewloginsiswa").hide();
            $("#materiimport").hide();
            $("#layardepan").show();
            //console.log(tes)

        }
        fr.readAsText(item);
        // ini untuk menguload ke Drive
        var oFReader = new FileReader();
        oFReader.readAsDataURL(item);

        oFReader.onload = function (oFREvent) {
            document.getElementById("basetxt").value = oFREvent.target.result;

        };

    }
}


const tombolaksihariini = (currEssay, parNama) => {
    //let currEssay = ;//ada ga essay? false (jika ga ada)
    //anggap aja ada essay dulu!
    let kodehtml = "";
    let cek = nilairespon.filter(k => k.namasiswa == parNama);
    if (cek.length == 0) {
        //jika siswa belum mengerjakan!
        kodehtml = "-"

    } else {
        // console.log(cek)
        // console.log(cek[cek.length - 1])
        // console.log(cek[cek.length - 1]['nilaiEssay'])
        let indek = cek.length - 1;
        let indekk = indek + "<|>" + parNama


        if (currEssay) {
            // jika ada essay, cek lagi. Nilai essaynya udah masuk apa belum
            // jika belum masuk, maka tampilkan tombol koreksi
            if (cek[indek].nilaiEssay == "") {
                kodehtml = `<button class="w3-button w3-red" onclick="lihatljksaya('${cek[indek].html_jawaban}')">LJK</button><br>
          <button class="w3-button w3-green" onclick="gurumengoreksihariini('${indekk}')">Koreksi</button><br></br>
          `
            } else {
                kodehtml = `<button class="w3-button w3-blue" onclick="lihatljksaya('${cek[indek].html_jawaban}')">LJK</button><br>
          <button class="w3-button w3-green" onclick="gurumengoreksihariini('${indekk}')">Koreksi Ulang</button><br></br>
          `
                //<button class="w3-button w3-green" onclick="gurumengoreksi('${indek}')">Koreksi Ulang</button><br></br>
                //
            }

        } else {
            kodehtml = `<button class="w3-button w3-blue" onclick = "lihatljksaya('${cek[indek].html_jawaban}')" > LJK</button > `
        }
    }
    return kodehtml
}

const gurumengoreksihariini = (bid) => {
    let indek = bid.split("<|>")[0];
    let parnama = bid.split("<|>")[1];
    let cek = nilairespon.filter(k => k.namasiswa == parnama)[indek];
    let idbaris = cek.idbaris;
    let prefikkodeunik = cek.matericode + "_" + cek.kodeunik + "_";
    let tagihankoreksi = cek.jenistagihan;
    let namasiswakoreksi = cek.namasiswa;

    loadingljk.style.display = "block";
    infoloadingljk.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo w3-display-middle" ></i > `;
    let divljk = document.createElement("div");
    divljk.setAttribute("id", "divljkkoreksi");
    let formljk = document.createElement("form");
    formljk.setAttribute("id", "formgurumengoreksi")
    //formljk.setAttribute("id", "formgurumengoreksi")

    $('#infoloadingljk').nextAll('button').remove();
    $('#infoloadingljk').nextAll('center').remove();
    let html_jawaban = cek.html_jawaban;
    $.getJSON(constpreviewljk + "?idmateri=" + html_jawaban + "&action=previewriwayat", function (json) {

        // infoloadingljk.innerHTML = brkline(json).teks + "<br><br><br>";
        infoloadingljk.innerHTML = "";//brkline(json).teks + "<br><br><br>";
        infoloadingljk.appendChild(divljk)
        divljkkoreksi.innerHTML = brkline(json).teks + "<br><br><br>";
        var elEssay = document.getElementsByClassName("koleksilj")
        if (elEssay.length !== 0) {
            for (i = 0; i < elEssay.length; i++) {
                var idEl = elEssay[i].getAttribute("id");
                var inidEl = idEl.replace("untuklj", "");
                var tempattombol = document.getElementById("untuklj" + inidEl);
                var tombolsatu = document.createElement("input");
                tombolsatu.setAttribute("type", "number");
                tombolsatu.setAttribute("id", "koreksisoal_" + inidEl);
                tombolsatu.setAttribute("value", cek["SKOR_" + inidEl] * 100);
                tombolsatu.setAttribute("class", "koreksisoal");
                tombolsatu.setAttribute("onchange", `updatenilaikoreksihariini('${inidEl}')`);
                tempattombol.innerHTML = `Nilai Koreksi :<span id='nilaiessaykoreksi_${inidEl}'></span>`;
                tempattombol.appendChild(tombolsatu);


            }
        }
        //-----------------------------------------------------
        infoloadingljk.appendChild(formljk);
        //dibikin fildseet
        let fieldsett = document.createElement("fieldset")
        fieldsett.setAttribute("style", "display:none");
        fieldsett.setAttribute("id", "kirimanedit");
        formgurumengoreksi.appendChild(fieldsett)

        let teks = "kbmtoday" + tglStringZero();
        let obb = JSON.parse(localStorage.getItem(teks))[parseInt(idtabaktif.innerHTML)]
        let ob = JSON.parse(obb.kuncikd);

        let obnosoal = ubahjsonkuncikd(ob);

        //console.log(obnosoal.length);
        let dibikin = Object.keys(obnosoal)
        //console.log(dibikin.length)
        for (let i = 0; i < dibikin.length; i++) {
            // console.log(dibikin[i])
            // console.log(])
            //infoloadingljk.innerHTML += `<input value="TES ${i}"/>`
            let lbl = document.createElement("label")
            lbl.setAttribute("for", "SKOR_" + dibikin[i]);
            let tek = document.createTextNode("No " + dibikin[i])
            lbl.appendChild(tek)
            let docinput = document.createElement("input")
            docinput.setAttribute("id", "SKOR_" + dibikin[i]);
            docinput.setAttribute("class", obnosoal[dibikin[i]]);
            docinput.setAttribute("name", "SKOR_" + dibikin[i]);
            docinput.setAttribute("value", cek["SKOR_" + dibikin[i]]);
            kirimanedit.appendChild(lbl)
            kirimanedit.appendChild(docinput)
            // let gantibaris = document.createElement("br")
            // kirimanedit.appendChild(gantibaris)

        }


        var tengahdulu = document.createElement("fieldset");
        tengahdulu.setAttribute("style", "background-color:yellow;display:block");
        tengahdulu.setAttribute("id", "formedittontonin");
        tengahdulu.setAttribute("class", "w3-center");

        var inputidbaris = document.createElement("input");
        inputidbaris.setAttribute("id", "brs");
        inputidbaris.setAttribute("name", "brs");
        inputidbaris.setAttribute("class", "w3-input w3-center");
        inputidbaris.setAttribute("value", idbaris);
        // inputidbaris.setAttribute("disabled", "true");

        inputidbaris.setAttribute("style", "display:block");

        var inputnilaikoreksi = document.createElement("input");
        inputnilaikoreksi.setAttribute("type", "number");
        inputnilaikoreksi.setAttribute("class", "w3-input w3-center");
        inputnilaikoreksi.setAttribute("id", "nilaiakhiressay");
        inputnilaikoreksi.setAttribute("name", "nilaiakhiressay");


        var tombolkirim = document.createElement("button");
        tombolkirim.setAttribute("onclick", "siapkirimnilai()");
        tombolkirim.setAttribute("class", "wa");
        tombolkirim.innerHTML = "Beri Nilai";

        let inputnilaikd = document.createElement("input")
        inputnilaikd.setAttribute("id", "nilaikdkoreksi");
        inputnilaikd.setAttribute("name", "nilaikd");
        inputnilaikd.setAttribute("class", "w3-input w3-center");
        // inputnilaikd.setAttribute("disabled", false);

        lbl = document.createElement("label");
        lbl.setAttribute("for", "brs")
        tek = document.createTextNode("ID LJK")
        lbl.appendChild(tek)
        kirimanedit.appendChild(lbl)
        kirimanedit.appendChild(inputidbaris);

        lbl = document.createElement("label");
        lbl.setAttribute("for", "nilaikdkoreksi")
        tek = document.createTextNode("Nilai Per KD");
        lbl.appendChild(tek);
        kirimanedit.appendChild(lbl)

        kirimanedit.appendChild(inputnilaikd);

        // let inputt = document.createElement("input");
        // inputt.setAttribute("id",)
        kirimanedit.innerHTML += "Preview Nilai Essay : "
        kirimanedit.appendChild(inputnilaikoreksi);

        tengahdulu.innerHTML += "Preview Nilai Essay : "
        let sp = document.createElement("span");
        sp.setAttribute("id", "prevprevnilaikoreksi")
        tengahdulu.appendChild(sp)

        docinput = document.createElement("textarea");
        //docinput.textContent = json
        docinput.setAttribute("id", "htmlljkkoreksi")
        docinput.setAttribute("name", "htmlljkkoreksi")
        // formgurumengoreksi.appendChild(docinput)

        //     formgurumengoreksi.appendChild(tengahdulu)
        kirimanedit.appendChild(docinput)

        let inputprefik = document.createElement("input");
        inputprefik.setAttribute("id", "prefikkodeunik");
        inputprefik.setAttribute("name", "prefikkodeunik");
        inputprefik.setAttribute("value", prefikkodeunik);

        kirimanedit.appendChild(inputprefik)

        inputprefik = document.createElement("input");
        inputprefik.setAttribute("id", "jenistagihankoreksi");
        inputprefik.setAttribute("name", "jenistagihankoreksi");
        inputprefik.setAttribute("value", tagihankoreksi);
        kirimanedit.appendChild(inputprefik)

        inputprefik = document.createElement("input");
        inputprefik.setAttribute("id", "jenjangkoreksi");
        inputprefik.setAttribute("name", "jenjangkoreksi");
        inputprefik.setAttribute("value", idJenjang);
        kirimanedit.appendChild(inputprefik)

        inputprefik = document.createElement("input");
        inputprefik.setAttribute("id", "kelaskoreksi");
        inputprefik.setAttribute("name", "kelaskoreksi");
        inputprefik.setAttribute("value", idNamaKelas);
        kirimanedit.appendChild(inputprefik)
        inputprefik = document.createElement("input");
        inputprefik.setAttribute("id", "namasiswakoreksi");
        inputprefik.setAttribute("name", "namasiswakoreksi");
        inputprefik.setAttribute("value", namasiswakoreksi);
        kirimanedit.appendChild(inputprefik)


        formgurumengoreksi.appendChild(tengahdulu)
        formgurumengoreksi.after(tombolkirim);



        let tombol = document.createElement("button");
        tombol.setAttribute("class", "w3-button w3-dark-grey w3-display-bottommiddle w3-margin-bottom");
        tombol.setAttribute("onclick", `printPortrait('divljkkoreksi,,,${StringTanggal(new Date())}')`);
        tombol.innerHTML = `<i class="fa fa-print" ></i > Cetak`




        //---------------------------------------------------------------


        // docinput.textcontent
        // var teksarea = document.getElementById("tekshtmlnilai");
        // var isiteks = document.getElementById("borderidhasilakhirnama");
        // var teksbtoa = encodeURIComponent(isiteks.innerHTML);

        // teksarea.textContent = window.btoa(unescape(encodeURIComponent(isiteks.innerHTML)));

        infoloadingljk.after(tombol)

    })



}



function updatenilaikoreksihariini(id) {
    let inputedit = document.getElementById("koreksisoal_" + id);
    if (inputedit.value > 100) {
        alert("Nilai Maksimum 100, dan minimum 0")
        inputedit.value = 100;
    }
    document.getElementById("SKOR_" + id).value = (inputedit.value / 100).toFixed(2);
    document.getElementById("nilaiessaykoreksi_" + id).innerHTML = inputedit.value;

    var kelasinput = document.getElementsByClassName("koreksisoal");
    var nilai = 0;
    for (i = 0; i < kelasinput.length; i++) {

        nilai += kelasinput[i].value * 1;

    }
    /// ---------------------------------------------------

    let teks = "kbmtoday" + tglStringZero();
    let obb = JSON.parse(localStorage.getItem(teks))[parseInt(idtabaktif.innerHTML)]


    // var jumlahsoalessaysebenarnya = kronologijson[parseInt(idtabaktif.innerHTML)].jumlahessay;
    var jumlahsoalessaysebenarnya = obb.jumlahessay;

    var nilaiakhir = (nilai / jumlahsoalessaysebenarnya).toFixed(2);
    // document.getElementById("nilaiakhiressay").value = nilai;
    document.getElementById("nilaiakhiressay").value = nilaiakhir;
    /// ---------------------------------------------------
    let adaelemenini = document.getElementById("nilaiEssayku")
    if (adaelemenini !== null) {
        adaelemenini.innerHTML = nilaiakhir;
    }
    //document.getElementById("nilaiakhiressay").value = nilaiakhir;
    //document.getElementById("htmlljkkoreksi").textContent = divljkkoreksi.innerHTML;

    let kd = JSON.parse(obb.kuncikd);

    // let kd = JSON.parse(kronologijson[parseInt(idtabaktif.innerHTML)].kuncikd)
    let keykd = Object.keys(kd); // MTK_3.1 , PKN_3.5
    let objnilai = {};
    for (let k = 0; k < keykd.length; k++) {
        let nomorsoal = kd[keykd[k]];

        let jumlahnomor = nomorsoal.length;

        let count = 0;
        let inkd = document.getElementsByClassName(keykd[k]);
        for (let j = 0; j < inkd.length; j++) {
            count += inkd[j].value * 1;
            //console.log(inkd[j].value)
        }

        let nilaiakhir = (count / jumlahnomor * 100).toFixed(2)
        objnilai[keykd[k]] = nilaiakhir
    }
    document.getElementById("nilaikdkoreksi").value = JSON.stringify(objnilai)

    document.getElementById("prevprevnilaikoreksi").innerHTML = `<hr> Skor Essay = <br>${nilaiakhir} <hr> Skor KD = <br> ${JSON.stringify(objnilai)}`




}

///////////////// pindahan nilai mapel
let btnuh = document.querySelector(".btnuh");
let btnpts = document.querySelector(".btnpts");
let btnpak = document.querySelector(".btnpak");
let btnpas = document.querySelector(".btnpas");
let btnkpraktik = document.querySelector(".btnkpraktik");
let btnkproduk = document.querySelector(".btnkproduk");
let btnkproyek = document.querySelector(".btnkproyek");

function nilaimapel() {
    if (window.location.href.indexOf("gmp.html") > -1) {
        let valuekelas = document.getElementById("gmppilihrombel");//.value;
        if (valuekelas !== "null" && valuekelas.value == "none") {
            alert("Anda belum memilih kelas. Silakan pilih Kelas terlebih dulu")
            return
        }
    }
    //sembunyikan
    if (idSemester == 1) {
        btnpak.className += " w3-hide";
    } else {
        btnpas.className += " w3-hide";
    }
    let namasubjek = {
        "PAI": "Pendidikan Agama Islam",
        "PKRIS": "Pendidikan Agama Kristen",
        "PKATO": "Pendidikan Agama Katholik",
        "PBUDH": "Pendidikan Agama Budha",
        "PHIND": "Pendidikan Agama Hindu",
        "PKONG": "Pendidikan Agama Khonghucu",
        "PJOK": "PJOK",
        "BSUND": "Bahasa Sunda"
    }

    let teks = namasubjek[idgurumapelmapel];

    tampilinsublamangurukelas("mapel");

    let htmlseleksiulhar = `<img src="/img/barloading.gif"/>`
    opsimapelulhar.innerHTML = teks;

    opsimapelpts.innerHTML = teks;

    opsimapelpaspak.innerHTML = teks;

    opsimapelpas.innerHTML = teks;

    opsimapelkpraktik.innerHTML = teks;

    opsimapelkproduk.innerHTML = teks;

    opsimapelkproyek.innerHTML = teks;

    btnuh.click()

}
btnuh.addEventListener("click", () => {
    getnilaimapel("PH", "datatabelnilaiulhar")
})
btnpts.addEventListener("click", () => {

    getnilaimapel("PTS", "datatabelnilaipts")

})
btnpas.addEventListener("click", () => {
    getnilaimapel("PAS", "datatabelnilaipas")

});
btnpak.addEventListener("click", () => {
    getnilaimapel("PAK", "datatabelnilaipaspak")
});
btnkpraktik.addEventListener("click", () => {
    getnilaimapel("kpraktik", "datatabelnilaikpraktik")
});
btnkproduk.addEventListener("click", () => {
    getnilaimapel("kproduk", "datatabelnilaikproduk")
});
btnkproyek.addEventListener("click", () => {
    getnilaimapel("kproyek", "datatabelnilaikproyek")
});


function getnilaimapel(tagihan, idelemen) {
    let namasubjek = {
        "PAI": "Pendidikan Agama Islam",
        "PKRIS": "Pendidikan Agama Kristen",
        "PKATO": "Pendidikan Agama Katholik",
        "PBUDH": "Pendidikan Agama Budha",
        "PHIND": "Pendidikan Agama Hindu",
        "PKONG": "Pendidikan Agama Khonghucu",
        "PJOK": "PJOK",
        "BSUND": "Bahasa Sunda"
    }
    let kecil = tagihan.toLowerCase();

    let teks = namasubjek[idgurumapelmapel];


    let koleksiswa = koleksinamasiswaberdasarkanagama(idgurumapelmapel).map(k => k.pd_nama);
    let koleksitokensiswa = koleksinamasiswaberdasarkanagama(idgurumapelmapel).map(k => k.id);
    let div = document.getElementById(idelemen);
    div.innerHTML = "<hr/><i class='fa fa-refresh fa-spin w3-xxlarge'></i> Proses loading..."
    //alert("Fungsi baru")
    fetch(constlinknilai + "?action=lihatnilairekap&tab=" + tagihan + "&kelas=" + idNamaKelas)
        .then(m => m.json())
        .then(r => {
            let PH = fnkeyobjekmapel(idgurumapelmapel, r.banyakkd);
            let cPH = Object.keys(PH.koleksiul);
            let allcount = 0;
            let arrallcount = [];
            for (a = 0; a < cPH.length; a++) {
                // allcount = allcount + PH.koleksiul[cPH[k]].datakey.length
                allcount += PH.koleksiul[cPH[a]].datakey.length;
                arrallcount.push(PH.koleksiul[cPH[a]].datakey.length);
            }

            let tekshtml = "";
            if (cPH.length > 0) {
                let tabel = document.createElement("table");
                tabel.setAttribute("class", "versi-table w3-small");
                tabel.setAttribute("id", "nilai" + kecil + "_" + idgurumapelmapel);
                let thead = tabel.createTHead();
                let tr = thead.insertRow(0);
                let th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.innerHTML = "No.";
                tr.appendChild(th);
                th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                th.innerHTML = "Nama Siswa";
                tr.appendChild(th);


                th = document.createElement("th");
                th.setAttribute("colspan", allcount);// cPH.length);
                th.innerHTML = `Rekap Penilaian Harian<br/><sub>${teks}</sub>`;
                tr.appendChild(th);

                tr = thead.insertRow(1);
                tr2 = thead.insertRow(2);
                for (i = 0; i < cPH.length; i++) {
                    let th = document.createElement("th");
                    th.setAttribute("colspan", arrallcount[i]);
                    th.innerHTML = inverstanggal(cPH[i].split("_")[2]) + `<button class="w3-blue w3-button" onclick="previewsoalnilairekap('${cPH[i].split("_")[0]}')"><i class="fa fa-eye"></i></button>`;
                    tr.appendChild(th);

                    for (c = 0; c < arrallcount[i]; c++) {
                        th2 = document.createElement("th");
                        th2.innerHTML = "KD " + PH.koleksiul[cPH[i]].datakey[c].split("_")[4];
                        tr2.appendChild(th2);
                    }
                }
                let trr = tabel.createTBody();
                for (j = 0; j < koleksiswa.length; j++) {
                    tr = trr.insertRow(-1);
                    let td = tr.insertCell(-1);
                    td.innerHTML = j + 1;
                    td = tr.insertCell(-1);
                    td.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                    td.innerHTML = koleksiswa[j];//.toUpperCase();
                    // let datanilai = r.records.filter(k => k.namasiswa == koleksiswa[j]);
                    let datanilai = r.records.filter(k => k.tokensiswa == koleksitokensiswa[j]);
                    for (k = 0; k < cPH.length; k++) {
                        for (d = 0; d < arrallcount[k]; d++) {
                            td = tr.insertCell(-1);
                            td.setAttribute("contenteditable", true);
                            let key = PH.koleksiul[cPH[k]].datakey[d];
                            let isikan = (datanilai.length > 0) ? datanilai[datanilai.length - 1][key].replace(".", ",") : "0,00";
                            //revisi
                            let isinilai =

                                td.innerHTML = isikan;// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1);//k.records.filter(k = k.)
                        }
                    }
                }

                div.innerHTML = `<hr/><button class="w3-button w3-dark-gray fa fa-print" onclick="printModalL('nilai${kecil}_${idgurumapelmapel},DAFTAR NILAI HARIAN <br>MATA PELAJARAN ${teks.replace(/\,/g, " ").toUpperCase()}, Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}, ${StringTanggal(new Date())}')"> Print</button>  <button class="w3-button w3-gray fa fa-file-excel-o" onclick="ExcelModalTabNilai('nilai${kecil}_${idgurumapelmapel},DAFTAR NILAI HARIAN MATA PELAJARAN ${teks.toUpperCase()},DAFTAR NILAI HARIAN MATA PELAJARAN ${teks.replace(/\,/g, " ").toUpperCase()}, ${StringTanggal(new Date())}')"> Ms. Excel</button><hr/>`;
                div.appendChild(tabel)
            } else {

                let tabel = document.createElement("table");
                tabel.setAttribute("class", "versi-table w3-small");
                tabel.setAttribute("id", "nilai" + kecil + "_" + idgurumapelmapel);

                let thead = tabel.createTHead();
                let tr = thead.insertRow(0);
                let th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.innerHTML = "No.";
                tr.appendChild(th);
                th = document.createElement("th");
                th.setAttribute("rowspan", 3);
                th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                th.innerHTML = "Nama Siswa";
                tr.appendChild(th);


                th = document.createElement("th");
                th.setAttribute("colspan", 2);// cPH.length);
                th.innerHTML = `Rekap Penilaian Harian<br/><sub>${teks}</sub>`;
                tr.appendChild(th);

                tr = thead.insertRow(1);
                tr2 = thead.insertRow(2);
                for (i = 0; i < 2; i++) {
                    let th = document.createElement("th");
                    th.setAttribute("colspan", 1);
                    th.setAttribute("contenteditable", true);
                    th.innerHTML = "Ketik Tanggal";//inverstanggal(cPH[i].split("_")[2]) + `<br/><button class="w3-blue w3-button" onclick=" previewsoalnilairekap('${cPH[i].split("_")[0]}')"><i class="fa fa-eye"></i> Lihat Materi</button>`;
                    tr.appendChild(th);

                    for (c = 0; c < 1; c++) {
                        th2 = document.createElement("th");
                        th2.setAttribute("contenteditable", true)
                        th2.innerHTML = "KD ";//+ PH.koleksiul[cPH[i]].datakey[c].split("_")[4];
                        tr2.appendChild(th2);
                    }
                }
                let trr = tabel.createTBody();
                for (j = 0; j < koleksiswa.length; j++) {
                    tr = trr.insertRow(-1);
                    let td = tr.insertCell(-1);
                    td.innerHTML = j + 1;
                    td = tr.insertCell(-1);
                    td.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
                    td.innerHTML = koleksiswa[j];//.toUpperCase();

                    // console.log(datanilai);// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1))
                    for (k = 0; k < 2; k++) {
                        for (d = 0; d < 1; d++) {
                            td = tr.insertCell(-1);
                            td.setAttribute("contenteditable", true);

                            let isikan = "tidak ada data"
                            td.innerHTML = isikan;// && k.indexOf(PH.koleksiul[cPH[k]].datakey[d]) > -1);//k.records.filter(k = k.)
                        }
                    }
                }


                div.innerHTML = `<hr/><button class="w3-button w3-dark-gray fa fa-print" onclick="printModalL('nilai${kecil}_${idgurumapelmapel},DAFTAR NILAI HARIAN <br>MATA PELAJARAN ${teks.replace(/\,/g, " ").toUpperCase()}, Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}, ${StringTanggal(new Date())}')"> Print</button>  <button class="w3-button w3-gray fa fa-file-excel-o" onclick="ExcelModalTabNilai('nilai${kecil}_${idgurumapelmapel},DAFTAR NILAI HARIAN MATA PELAJARAN ${teks.replace(/\,/g, " ").toUpperCase()},DAFTAR NILAI HARIAN MATA PELAJARAN ${teks.replace(/\,/g, " ").toUpperCase()}, ${StringTanggal(new Date())}')"> Ms. Excel</button><hr/>`;
                div.appendChild(tabel)

            }

        })
        .catch(er => { alert(er); console.log(er) })
}


const StringTanggal2 = (tgl) => { //parameter tgl bentuk tgl
    let m = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let y = tgl.getFullYear();


    let string = y + "-" + addZero(m) + "-" + addZero(d);


    //console.log(string)
    return string
}

// pengaturan guru_gmpadm:
// setiap kelas gmp_nontematik dihidden semua
// di sini hanya menampilkan data-data elemen yang diberikan class hidden = w3-hide
/**
 * label dan input id=petakd_rd3
 * label dan input (switch) untuk id=switchjadpemb bernilai false! dan span keteranga innerHTML-nnya dibuat NONTEMATIK
 */
///////////////////////////////// SPPD DAN NOTULA RAPAT //////////////////////////////////////

////////////////////////// SELESEAI SPPD DAN NOTULA RAPAT ////////////////////////////////////