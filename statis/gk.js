let jsonlocalstorage, jsonlocalstoragetypeuser, linkdatauser;
let linkDataUserWithIdss, linkAbsenKaldik // digunakan untuk link yang mengakses SS DataUSer (guru/siswa)
let namauser, ruangankelas, gmpkelas;
let idgurumapelmapel
let idguru = "",
    idgurubaru = "";
let jsondatasiswa = [],
    arrayStringTglLibur = [];
let arraydatasiswadariimport = [];
let idNamaSekolah, idNamaKelas, idGuruKelas, idNipGuruKelas,
    idKepsek, idNipKepsek, idSemester,
    idJenisGuru, idNoWa, idTeksTapel,
    idNamaKepsek, idJenjang;
let REKAPAbsen = {},
    OBJEKHariEfektif;
let obDataRekapKehadiran;
let idinterval
let informasiusulandata = {};
let buateditorkdaktif = [];
let allsiswaaktif;
let namanamakelasdijenjangini;
let tagkdserver;
let alltagkdserver;
jsonlocalstorage = JSON.parse(localStorage.getItem("inst_id"));
let stoploadingtopbar;
const loadingtopbarin = (el) => {
    var elem = document.querySelector("." + el);
    elem.className = elem.className.replace(/\sw3-hide/g, "");
    elem.style.width = "1px";
    var width = 1;
    stoploadingtopbar = setInterval(frame2, 10);

    function frame2() {
        // if (width >= 1000000) {
        //     clearInterval(stoploadingtopbar);
        //     // elem.style.width = 0;
        //     // elem.style.width = 90 + '%';
        //     // elem.innerHTML = `100%`;
        // } else {
        width += 100;
        elem.style.width = width / 1000 + '%';
        //elem.innerHTML = (width / 105).toFixed(0) + "% ";
        //}
    }
}
let db_utama_siswa

(async function () {
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
    ruangankelas = jsonlocalstoragetypeuser.room;
    idgurumapelmapel = jsonlocalstoragetypeuser.room;
    idguru = jsonlocalstoragetypeuser.idrow;
    idimage = jsonlocalstoragetypeuser.idimg; //
    idNamaKelas = jsonlocalstoragetypeuser.room;
    idGuruKelas = jsonlocalstoragetypeuser.user;
    idNipGuruKelas = jsonlocalstoragetypeuser.nip_guru;
    idNamaKepsek = jsonlocalstoragetypeuser.nama_kepsek;
    idNipKepsek = jsonlocalstoragetypeuser.nip_kepsek;
    idJenisGuru = jsonlocalstoragetypeuser.akses;
    idNoWa = jsonlocalstoragetypeuser.no_wa;
    idSemester = 2;//jsonlocalstoragetypeuser.idsemester;
    idTeksTapel = jsonlocalstoragetypeuser.tekstapel;
    idJenjang = jsonlocalstoragetypeuser.jenjang;
    jsonlocalstorage = JSON.parse(localStorage.getItem("inst_id"));
    linkDataUserWithIdss = jsonlocalstorage.url_datauser + "?idss=" + jsonlocalstorage.ss_datauser;
    linkAbsenKaldik = jsonlocalstorage.url_dataabsen + "?idss=" + jsonlocalstorage.ss_dataabsen;
    url_absenkaldik = jsonlocalstorage.url_dataabsen + "?action=datakaldik&idss=" + jsonlocalstorage.ss_dataabsen
    let idInstansi = JSON.parse(localStorage.getItem("inst_id"));
    idNamaSekolah = idInstansi.namainstansi;
    await fetch(url_absenkaldik).then(m => m.json()).then(k => {
        localStorage.setItem('Kaldik', JSON.stringify(k.records));
        localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl))
        arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
        arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));
    }).catch(er => {
        console.log("muat ulang: " + er);
        jsonlocalstorage = JSON.parse(localStorage.getItem("inst_id"));
        url_absenkaldik = jsonlocalstorage.url_dataabsen + "?action=datakaldik&idss=" + jsonlocalstorage.ss_dataabsen

        fetch(url_absenkaldik).then(m => m.json()).then(k => {
            //console.table(k.records)
            localStorage.setItem('Kaldik', JSON.stringify(k.records));

            localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl))
            arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
            arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));
            // console.log(k.records)
            // console.log(k.stringTgl)
        })
    });

    namasekolah.innerHTML = namauser;
    namakota.innerHTML = gmpkelas + " " + ruangankelas;
    var logo = document.getElementById("logosekolahmenu");
    logo.setAttribute("src", "https://drive.google.com/uc?export=view&id=" + idimage);
    logo.setAttribute("alt", "Poto Guru");
    logo.setAttribute("style", "width:90px; height:90px");
    // if (localStorage.hasOwnProperty("datasiswa_" + ruangankelas)) {
    //     jsondatasiswa = JSON.parse(localStorage.getItem("datasiswa_" + ruangankelas)).datasiswa;
    // } else {
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

        }).catch(er => {
            console.log("muat ulang lagi: " + er);
            fetch(linkDataUserWithIdss + "&action=datasiswaaktif&kelas=" + ruangankelas)
                .then(m => m.json())
                .then(k => {
                    jsondatasiswa = k.datasiswa;
                    localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(k));

                })
        });
    // }
    await fetch(linkDataUserWithIdss + "&action=usulanperbaikandata")
        .then(m => m.json())
        .then(k => {
            //console.log(k)
            let dataaktif = k.datasiswa.filter(s => s.aktif == "aktif");
            let usulkelasini = k.datasiswa.filter(k => (k.nama_rombel == idNamaKelas));
            let usulkelasinibelumdisetujui = dataaktif.filter(k => (k.nama_rombel == idNamaKelas && k.usulanperubahandata.indexOf("disetujui") == -1));
            // console.log(usulkelasinibelumdisetujui.length);
            // console.log(usulkelasinibelumdisetujui.length);

            let usulkelasinisudahdisetujui = dataaktif.filter(k => (k.nama_rombel == idNamaKelas && k.usulanperubahandata.indexOf("disetujui") > -1));
            informasiusulandata["usulanbaru"] = usulkelasinibelumdisetujui;
            informasiusulandata["usulandisetujui"] = usulkelasinisudahdisetujui;
            informasiusulandata["all"] = usulkelasini;


            if (usulkelasinibelumdisetujui.length !== jsondatasiswa.length) {
                document.querySelector(".pesankhusussiswa").className = document.querySelector(".pesankhusussiswa").className.replace(" w3-hide", "");
                document.querySelector(".pesankhusussiswa").innerHTML = `<button class="toggleusulanperubahandata w3-btn w3-teal w3-right" onclick="toggleusulanbaru('perlebar')" title="klik ini untuk melihat detailnya">Detail</button>
                Anda memiliki ${usulkelasinibelumdisetujui.length} usulan data perubahan data baru.`

            } else {
                if (document.querySelector(".pesankhusussiswa").className.indexOf("w3-hide") == -1) {
                    document.querySelector(".pesankhusussiswa").className += " w3-hide";
                }
            }

        })
        .catch(er => {
            console.log(er);
        })
    await fetch(linkDataUserWithIdss + "&action=datasiswatidakaktif")
        .then(m => m.json())
        .then(k => {
            arraysiswatidakaktif = k.datasiswa;
            jumlahseluruhsiswadisekolah = k.total
            localStorage.setItem("datasiswatidakaktif", JSON.stringify(k))


        }).catch(er => {
            console.log("muat ulang: " + er);
            fetch(linkDataUserWithIdss + "&action=datasiswatidakaktif")
                .then(m => m.json())
                .then(k => {
                    arraysiswatidakaktif = k.datasiswa;
                    jumlahseluruhsiswadisekolah = k.total
                    localStorage.setItem("datasiswatidakaktif", JSON.stringify(k))


                })

        });
        
    if (navigator.storage && navigator.storage.estimate) {
        const quota = await navigator.storage.estimate();
        const percentageUsed = (quota.usage / quota.quota) * 100;
        console.log(`You've used ${percentageUsed}% of the available storage.`);
        const remaining = quota.quota - quota.usage;
        console.log(`You can write up to ${remaining} more bytes.`);
    }
    await buattabelrekapsemester();

    dashboardgurukelas.innerHTML = idJenisGuru + " " + idNamaKelas + " ( " + namauser + " )";

    clearInterval(stoploadingtopbar);
    let divlod = document.querySelector(".loadingtopbar");
    divlod.style.width = "100%";
    setTimeout(() => {
        divlod.style.width = "1px"
        divlod.className += " w3-hide";

    }, 3000);

})();

const updateDatasiswa = () => {
    fetch(linkDataUserWithIdss + "&action=datasiswaaktif&kelas=" + ruangankelas)
        .then(m => m.json())
        .then(k => {
            jsondatasiswa = k.datasiswa;
            localStorage.setItem("datasiswa", JSON.stringify(k));
        })
};
function tabeldatakelassaya() { // Versi ngambil data dari TAB SPREADSHEET .... coba versi ngambil data dari NOTEPAD
    try {
        arraydatasiswadariimport = []
        document.getElementById("inputimportdatasiswa").value = "";
        let perluverifikasi = informasiusulandata["usulanbaru"]; //.filter(s => s.usulanperubahandata.indexOf);
        let sudahverifikasi = informasiusulandata["usulandisetujui"]; //.filter(s => s.usulanperubahandata.indexOf);
        //console.log(perluverifikasi);
        loadkelassaya.innerHTML = "<i class='fa fa-spinner fa-spin w3-xxxlarge'></i>";
        var tempattabel = document.getElementById("tabeltempatdaftarkelassaya");
        tempattabel.innerHTML = "";
        tempattabel.innerHTML = "<h3 class='w3-center w3-card-4'>Daftar Siswa Kelas " + ruangankelas + "</h3>";
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
            var bbt = document.createElement("button");
            if (perluverifikasi.filter(s => s.id == jsondatasiswa[i].id).length > 0) {
                bbt.setAttribute("class", "w3-button w3-red w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right");
            } else {
                bbt.setAttribute("class", "w3-button warnaeka w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right");
            }

            bbt.setAttribute("onclick", "detailformulir(" + jsondatasiswa[i].id + ")");
            bbt.setAttribute("title", "Detail Data Anak ini");
            bbt.innerHTML = `<span class="w3-badge w3-container">${jsondatasiswa[i].id}</span>`;
            var btnn = document.createElement("button");
            btnn.setAttribute("onclick", "editsiswa(" + i + ")");
            btnn.setAttribute("title", "Simpan Editan Anda");
            if (sudahverifikasi.filter(s => s.id == jsondatasiswa[i].id).length > 0) {
                btnn.setAttribute("class", "w3-button w3-light-green w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right");
            } else {
                btnn.setAttribute("class", "w3-button warnaeka w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right");
            }

            btnn.innerHTML = "<i class='fa fa-save  '></i>"; // (" + jsondatasiswa[i].id + ")";
            var btnnn = document.createElement("button");
            btnnn.setAttribute("onclick", "hapussiswa(" + jsondatasiswa[i].id + ")");
            btnnn.setAttribute("class", "w3-button warnaeka w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right");
            btnnn.setAttribute("title", "Hapus siswa ini dari kelas Anda");
            btnnn.innerHTML = `<i class="fa fa-trash"></i>`
            tabcell.appendChild(bbt);
            tabcell.appendChild(btnn);
            tabcell.appendChild(btnnn); // ------------> isi sel tombol(2)
            var tabcell = tr.insertCell(-1)
            tabcell.setAttribute("contenteditable", true);
            tabcell.innerHTML = jsondatasiswa[i].nis; // 
            var tabcell = tr.insertCell(-1)
            tabcell.setAttribute("contenteditable", true);
            tabcell.innerHTML = jsondatasiswa[i].nisn; //
            var tabcell = tr.insertCell(-1);
            tabcell.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;");
            tabcell.setAttribute("contenteditable", true);
            tabcell.innerHTML = jsondatasiswa[i].pd_nama.toUpperCase(); // 
            var tabcell = tr.insertCell(-1);
            tabcell.setAttribute("contenteditable", true);
            tabcell.innerHTML = jsondatasiswa[i].pd_jk; // 
            var tabcell = tr.insertCell(-1);
            tabcell.setAttribute("onclick", `editdataagamasiswa(${i})`);
            tabcell.innerHTML = jsondatasiswa[i].pd_agama; // 
            var tabcell = tr.insertCell(-1);
            tabcell.setAttribute("contenteditable", true);
            tabcell.innerHTML = jsondatasiswa[i].pd_tl; // 
            var tabcell = tr.insertCell(-1);
            tabcell.setAttribute("onclick", `editttl(${i})`)
            var da = jsondatasiswa[i].pd_tanggallahir || "";
            tabcell.innerHTML = da ? tanggalfull(jsondatasiswa[i].pd_tanggallahir) : "";
            var tabcell = tr.insertCell(-1);
            tabcell.setAttribute("contenteditable", true)
            tabcell.innerHTML = jsondatasiswa[i].pd_namaayah; // 
            var tabcell = tr.insertCell(-1);
            tabcell.setAttribute("contenteditable", true)
            tabcell.innerHTML = jsondatasiswa[i].pd_namaibu; // 
            var tabcell = tr.insertCell(-1);
            tabcell.setAttribute("contenteditable", true)
            tabcell.innerHTML = jsondatasiswa[i].pd_alamat; // 
            var tabcell = tr.insertCell(-1);
            tabcell.setAttribute("contenteditable", true)
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
        //>= 7 && umurtahun <= 12

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
        tampilinsublamangurukelas("datakelas");
    } catch (err) {
        console.log(err)
        alert("Laman Belum Siap");
        tampilinsublamangurukelas("beranda");

    }
}
const importdatasiswa = () => {
    let idelemen = "tabeltempatdaftarkelassaya";
    let elinput = document.getElementById("inputimportdatasiswa");
    elinput.addEventListener('change', () => {
        var fileUpload = elinput; //document.getElementById("fileUpload");

        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value)) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();

                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        prosesimportdasasiswa(e.target.result, idelemen);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        prosesimportdasasiswa(data, idelemen);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert("Browsernya versi jadul. Ga support.... Ganti dengan Chrome yang terupdate ya");
            }
        } else {
            alert("Importnya file Excel ya ... bukan yang lain.");
            fileUpload.value = "";
        }
    })
    elinput.click();
};

const barusimpanserverdatasiswa = async () => {
    let konfirm = confirm("Proses pengiriman data ke server dari tabel ini akan membutuhkan waktu yang lama. Anda yakin ingin melanjutkannya (Proses tidak bisa dihentikan)?\n\n Klik OK untuk melanjutkan atau klik CANCEL untuk membatalkan.");

    if (!konfirm) {
        alert("Terima kasih, Anda dapat mengedit nama siswa dengan fitur bawaannya.");
        arraydatasiswadariimport = [];
        return;
    }
    loadingljk.style.display = "block";
    $('#infoloadingljk').nextAll('button').remove();

    //buat dulu data anaknya!
    let datahtml = "",
        fil;
    datahtml += `<h3 class="w3-center">Proses Pengiriman Data</h3>
    Mohon Tunggu, proses membutuhkan waktu yang lama
    <div class="w3-border">
        <div class="warnaeka lebarin" style="width:1%;height:20px;transition: width 2s"></div>
    </div>
    <table class="w3-table w3-striped tabelproseskirim w3-small">`;
    for (let i = 0; i < jsondatasiswa.length; i++) {
        datahtml += `<tr>
            <td><div class="warnaeka statuskirimserveranake_${i}" style="width:1%;transition:width 2s;position:absolute;text-align:right"></div><div style="position:relative;">${jsondatasiswa[i].pd_nama}</div></td>
            </tr>`
        // <td class="statuskirimserveranake_${i}"><i class="fa fa-refresh fa-spin"></i></td>
    }

    datahtml += `</table>
    Keterangan: Jika Anda mengubah nama pada isian, data nama di atas adalah data sebelum Anda mengirimkan perubahan.
    `;

    let ss = jlo.ss_datauser;
    let ur = jlo.url_datauser;

    let ling = ur + "?idss=" + ss;



    infoloadingljk.innerHTML = datahtml

    let objekdikirim = [];
    if (arraydatasiswadariimport.length !== 0) {
        objekdikirim = arraydatasiswadariimport;
    } else {
        objekdikirim = jsondatasiswa;
    }
    let ld_atas = document.querySelector(".lebarin");
    let i = 0;
    do {
        let elemen = document.querySelector(".statuskirimserveranake_" + i);
        let kelas = ".statuskirimserveranake_" + i
        animasimove("statuskirimserveranake_" + i);
        let count = i + 1;
        let wd = (count / objekdikirim.length) * 100;
        ld_atas.style.width = `${wd}%`;
        ld_atas.innerHTML = `${wd.toFixed(0)}%`;
        await generatoreditsiswa(objekdikirim, i, kelas)
        // await fetch(linkDataUserWithIdss + "&action=usulanperbaikandata")
        //     .then(m => m.json())
        //     .then(k => {
        //         clearInterval(idinterval);

        //         elemen.style.width = "90%";
        //         elemen.innerHTML = "100%";
        //         console.log(i);
        //     }).catch(er => {
        //         console.log(er);
        //         elemen.style.width = "90%";

        //         elemen.innerHTML = "gagal";

        //     })

        i++
    }
    while (i < objekdikirim.length)
    ld_atas.innerHTML = "100% Lengkap"
    // let selaktif = document.querySelector(".statuskirimserveranake_0");
    // selaktif.innerHTML = `<div class="warnaeka siswake_0" style="width=1%;transition: width 2s"></div>`
    // 
    // setTimeout(() => {
    //     clearInterval(idinterval);
    //     document.querySelector(".statuskirimserveranake_").style.width = 80 + "%";
    // }, 10000);

    // await fetch(ling + "&action=usulanperbaikandata"){


    arraydatasiswadariimport = [];
    updatesetelahverifikasidaftarulang()

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

    //versi2
    // var width = 0;
    // var counter = 0;
    // var id = setInterval(frame, 600);
    // function frame() {
    //     if (width >= 1000) {
    //         clearInterval(id);
    //     } else {
    //         counter++
    //         console.log(counter);
    //         if (counter % 5 == 0) {
    //             width += 10;
    //             elem.style.width = width + '%';
    //             elem.innerHTML = (width / 10.10).toFixed(0) + "% ";
    //         }
    //     }
    // }
};

const prosesimportdasasiswa = (data, idelemen) => {
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    console.log(excelRows[0]);
    let hed = Object.keys(excelRows[0]);
    let head = arrayheadsumber;
    let arrObjek = [];
    // arraydatasiswadariimport;
    arraydatasiswadariimport = [];
    for (i = 0; i < excelRows.length; i++) {
        let objek = {}
        for (j = 0; j < head.length; j++) {
            let key = head[j]
            if (excelRows[i].hasOwnProperty(key)) {
                if (key == "id" || key == "jenjang") {
                    objek[key] = parseInt(excelRows[i][key]);
                } else if (angkadistring.indexOf(key) > -1) {
                    objek[key] = excelRows[i][key]; //.replace("'", "");

                } else if (key == "pd_tanggallahir") {
                    objek[key] = tanggalfull(new Date(excelRows[i][key]));
                } else {
                    objek[key] = excelRows[i][key];
                }
            } else {
                objek[key] = "";
            };
        }
        arrObjek.push(objek);
    }
    //console.table(arrObjek);
    arraydatasiswadariimport = arrObjek;
    let headtabel = ["No. Urut", "Token", "No Induk Siswa", "N I S N", "Nama Siswa", "Jenis Kelamin", "Agama", "Tempat Lahir", "Tanggal Lahir", "Nama Ayah", "Nama Ibu", "Alamat", "No HP"];
    let keyhead = ["", "id", "nis", "nisn", "pd_nama", "pd_jk", "pd_agama", "pd_tl", "pd_tanggallahir", "pd_namaayah", "pd_namaibu", "pd_alamat", "pd_hp"];
    let html = `<h3 class='w3-center w3-card-4 w3-white'>Daftar Siswa Kelas ${idNamaKepsek} </h3>
    <div class="w3-center w3-text-red w3-card-4 w3-white">File berhasil diimport. Tabel ini tidak lagi bisa diedit di laman. Jika ingin kembali ke bentuk tabel semula, Anda kembali memilih menu <b>Data Kelas</b>. Data ini belum disimpan di Server, Jika Anda ingin menyimpannya, gunakan fitur <b>Simpan Detail Server.</b></div>
    <table id="myTable" class="versi-table">
        <thead>
            <tr>
                <th>${headtabel[0]}</th>
                <th>${headtabel[1]}</th>
                <th>${headtabel[2]}</th>
                <th>${headtabel[3]}</th>
                <th>${headtabel[4]}</th>
                <th>${headtabel[5]}</th>
                <th>${headtabel[6]}</th>
                <th>${headtabel[7]}</th>
                <th>${headtabel[8]}</th>
                <th>${headtabel[9]}</th>
                <th>${headtabel[10]}</th>
                <th>${headtabel[11]}</th>
                <th>${headtabel[12]}</th>
            </tr>
        </thead>
        <tbody>
    `;
    for (j = 0; j < arrObjek.length; j++) {
        html += "<tr>"
        for (l = 0; l < keyhead.length; l++) {
            if (l == 0) {
                html += `<td>${(j + 1)}`;
            } else {
                html += `<td>${arrObjek[j][keyhead[l]]}</td>`
            }

        }
        html += "</tr>"
    }
    html += `</table>`
    document.getElementById(idelemen).innerHTML = html

    //buat head
    //let jsondatasiswatanpatimestamp = jsondatasiswa.map(k => (Object.fromEntries(Object.entries(k).filter(([s, v]) => s !== "time_stamp"))));
    //console.table(jsondatasiswatanpatimestamp);



}


async function generatoreditsiswa(pararrayobjek, y, elemen) {

    let td = document.querySelector(elemen);
    let namatabel = document.getElementById("myTable").getElementsByTagName("tbody")[0].rows[y];
    let xid = pararrayobjek[y].id,
        xjenjang = idJenjang,
        xnama_rombel = idNamaKelas,
        xnis = namatabel.cells[2].innerHTML,
        xnisn = namatabel.cells[3].innerHTML,
        xnik = pararrayobjek[y].nik,
        xnokk = pararrayobjek[y].nokk,
        xpdnama = namatabel.cells[4].innerHTML,
        xpdjk = namatabel.cells[5].innerHTML,
        xpdtl = namatabel.cells[7].innerHTML;
    let t = namatabel.cells[8].innerHTML;
    let dt = formatbalikin((t == "") ? "1 Juli 2019" : t);
    let xpdtgl = StringTanggal2(new Date(dt)),
        spdagama = namatabel.cells[6].innerHTML,
        spdayah = namatabel.cells[9].innerHTML,
        spdibu = namatabel.cells[10].innerHTML,
        spdalamat = namatabel.cells[11].innerHTML,
        spdhp = namatabel.cells[12].innerHTML,
        spdaktif = "aktif",
        spdeditoleh = namauser;

    let jsonlamaanakini = pararrayobjek.filter(s => s.id == xid)[0];
    jsonlamaanakini["id"] = xid;
    jsonlamaanakini["jenjang"] = xjenjang;
    jsonlamaanakini["nama_rombel"] = xnama_rombel;
    jsonlamaanakini["nis"] = xnis.replace(/&nbsp;/g, "");
    jsonlamaanakini["nisn"] = xnisn.replace(/&nbsp;/g, "");
    jsonlamaanakini["nik"] = xnik.replace(/&nbsp;/g, "");
    jsonlamaanakini["nokk"] = xnokk.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_nama"] = xpdnama.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_jk"] = xpdjk.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_tl"] = xpdtl.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_tanggallahir"] = xpdtgl;
    jsonlamaanakini["pd_agama"] = spdagama.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_namaayah"] = spdayah.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_namaibu"] = spdibu.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_alamat"] = spdalamat.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_hp"] = spdhp.replace(/&nbsp;/g, "");
    jsonlamaanakini["aktif"] = spdaktif.replace(/&nbsp;/g, "");
    jsonlamaanakini["dieditoleh"] = spdeditoleh;


    let pus = [];
    let key = arrayheadsumber.filter(s => s !== "time_stamp"); //array

    //Jika sebelumnya belum daftar ulang, maka API yang digunakan ini
    let databelumkirim = new FormData();
    for (let i = 0; i < key.length; i++) {
        pus.push(jsonlamaanakini[key[i]]);
        databelumkirim.append(key[i], jsonlamaanakini[key[i]]);
    }

    //Jika sebelumnya sudah daftar ulang, maka API yang digunakan ini
    let tabel = JSON.stringify(pus);
    let datakirim = new FormData();
    datakirim.append("tabel", tabel);
    datakirim.append("tokensiswa", xid);
    datakirim.append("idss", jlo.ss_datauser);

    let semuapendaftarulang = informasiusulandata["all"]
    let sudahdaftarulang = semuapendaftarulang.filter(s => s.id == xid)
    if (sudahdaftarulang.length == 0) {
        let aaa = linkDataUserWithIdss + "&action=editsiswa";
        await fetch(aaa, {
            method: "post",
            body: databelumkirim
        }).then(m => m.json())
            .then(f => {
                console.log(f);
                clearInterval(idinterval);
                td.style.width = "90%";
                td.innerHTML = "100%";

            })
            .catch(er => {
                console.log(er);
                clearInterval(idinterval);
                td.style.width = "90%";
                td.innerHTML = "Gagal"
            });
    } else {
        await fetch(url_absensiswa + "?action=daftarulangduasheet", {
            method: "post",
            body: datakirim
        })
            .then(m => m.json())
            .then(r => {
                //infoloadingljk.innerHTML = r.result;
                // console.log(r)
                // let datasiswakelasini = r.datasiswa.filter(s => s.nama_rombel == idNamaKelas && s.aktif == "aktif");
                // // console.log(datasiswakelasini)
                // pararrayobjek = datasiswakelasini;
                // localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(datasiswakelasini));
                clearInterval(idinterval);
                td.style.width = "90%";
                td.innerHTML = "100%";


            })
            .catch(er => {
                console.log(er);
                clearInterval(idinterval);
                td.style.width = "90%";
                td.innerHTML = "Gagal"
                // infoloadingljk.innerHTML = "Terjadi kesalahan";
            })
    }

}

const profilguru = async () => {
    modaledituser.style.display = "block";
    formedituser.style.display = "block";
    prosesloadingdaftaredit.innerHTML = ""; //<i class='fa fa-spin fa-spinner w3-xxxlarge'><i> sedang mencari data Anda..";
    registrasikanedit.style.display = "block";
    judulpetunjukedit.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxxlarge'><i>"
    w3_close();
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
        })
}

function logout() {
    tabeltempatdaftarkelassaya.innerHTML = "";
    w3_close();
    window.localStorage.clear();
    window.location.replace("/index.html")
}

async function pembelajaran() {
    loadingtopbarin("loadingtopbar");
    timelinekbm.style.display = "block";
    timelinekbm.innerHTML = "<i class='fa fa-spin fa-spinner w3-xxlarge'></i>";
    await kurikulumdiamdiam();
    //buateditorkdaktif= tabelkearray();
    tampilinsublamangurukelas("pembelajaran");
    await fetch(linkmateri + "&action=kronolog&idtoken=" + idJenjang)
        .then(m => m.json())
        .then(j => {
            if (j.result.length > 0) {
                templatekronologi(j.result);
                kronologijson = j.result;
            } else {
                timelinekbm.innerHTML = "<h4>Anda belum pernah membuat Materi</h4>";
            }
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
        });
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
        let adacrtToken = jsonmateri[i].crtToken;
        let buatapaedit = (aksi == "materibaru") ? "Dibuat oleh:" : "Diedit oleh";
        let tmblprev = `<button class="w3-button w3-blue w3-hover-red" onclick="previewkronologi('${i}')"><i class="fa fa-eye"></i></button>`;
        //let tmblprevw = `<button class="w3-button w3-blue w3-hover-red" onclick="previewkronologi('${i}')"><i class="fa fa-eye"></i></button>`;
        let tmbledit = `<button class="w3-button w3-green  w3-blue w3-hover-red" onclick="editkronologi('${i}')"><i class="fa fa-edit"></i></button>`;
        let editfilemateri = `<button class="w3-button w3-red  w3-blue w3-hover-red" onclick="editfilemateri('${i}')"><i class="fa fa-edit"></i></button>`;
        //let statuscrtToken = (adacrtToken == "") ? `<b class='w3-text-red'>&times; Tidak Tampil </b><br>(Waktu Awal gagal menggenerate)<br><button class='w3-button w3-black w3-hover-white' onclick="fnv7perbaikikonten('${i}')"><i class='fa fa-clock-o'></i> Perbaiki</button>` : "<b class='w3-text-blue' >&checkmark; Tampil di siswa </b> dengan kode Token " + adacrtToken;
        let sebarankd = jsonmateri[i].kuncikd;
        let statuscrtToken;
        if (adacrtToken == "" && sebarankd == "undefined") {
            statuscrtToken = `<b class='w3-text-red'>&times; Tidak Tampil </b><br>
            <ul><li>(Waktu Awal gagal menggenerate)
            </li><li>(Sebaran KD undefined)</li></ul>`;

        } else if (adacrtToken !== "" && sebarankd == "undefined") {
            statuscrtToken = `<b class='w3-text-red'>&times; Tidak Tampil </b><br>
             (Sebaran KD undefined)`;
        } else if (adacrtToken == "" && sebarankd !== "undefined") {
            statuscrtToken = `<b class='w3-text-red'>&times; Tidak Tampil </b><br>
            (Waktu Awal gagal menggenerate)<br/>
            <button class='w3-button w3-black w3-hover-white' onclick="fnv7perbaikikonten('${i}')"><i class='fa fa-clock-o'></i> Perbaiki</button>
            `;

        } else if (adacrtToken !== "" && sebarankd.indexOf("{") == -1) {
            statuscrtToken = `<b class='w3-text-red'>&times; Tidak Tampil/error </b><br>
            (format Sebaran KD belum digenerate)<br/><span class="w3-red">${sebarankd}</span>`;

        } else {
            statuscrtToken = `<b class='w3-text-blue' >&checkmark; Tampil di siswa </b> dengan kode Token ${adacrtToken}`
        }

        let statusijinkonten = (jsonmateri[i].idpendaftar == "") ? `<br class='w3-text-blue w3-hover-cyan'>&checkmark; Diijinkan</br><br><button class='w3-red w3-button w3-hover-blue' onclick="ubahijinpublik('${i}')">Privat</button>` : `<b class='w3-text-red'>&times; Tidak diijinkan</br><button class='w3-blue w3-button w3-hover-cyan'  onclick="ubahijinpublik('${i}')">Ijinkan</button>`;

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
                                   Status di E-DURASA Siswa:
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
                                   Status di E-DURASA Siswa:
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

    timelinekbm.innerHTML = `<button class="w3-button w3-red w3-hover-blue w3-round-large" onclick="fnv7kotenmateridihapus('${idJenjang}')"> Daftar Materi yang dihapus</button><hr><h4>Materi di Jenjang Kelas Anda yang dipublikasikan:</h4>` + temp;
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
    if(evt.currentTarget.innerHTML == "RAPORT MANUAL"){
        bikintabelawalraportmanual();
        if(dbsiswa_bukuinduk == undefined){
            
            let data = new FormData();
            data.append("action","alldatabasebukuindukpost");//+"?action=alldatabasebukuindukpost"
            fetch(linkdatabaseinduk,{method:"post",body:data})
            .then(m => m.json())
            .then(r => {
                console.log("dbsiswa_bukuinduk berhasil dipanggil");
                dbsiswa_bukuinduk = r.all;
            }).catch(er => console.log(er))
        }
    }    
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
        // quota.usage -> Number of bytes used.
        // quota.quota -> Maximum number of bytes available.

        const percentageUsed = (quota.usage / quota.quota) * 100;
        console.log(`dipake: ${quota.usage}`)
        console.log(`You've used ${percentageUsed}% of the available storage.`);
        const remaining = quota.quota - quota.usage;
        console.log(`You can write up to ${remaining} more bytes.`);
    }
}


function tampilinsublamangurukelas(fitur) {
    let div = document.getElementById("batasaksesguru")
    let gal = document.querySelector(".kriteriagaleri");
    let y_gal = gal.offsetTop;
    let y = div.offsetTop - 45;
    
    if (fitur == "beranda") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataraport.style.display = "none";
        dataframekreatif.style.display = "none";
        divgaleri.style.display = "none";
        divgooglemeet.style.display = "none";
        id_admguru.style.display = "none";
        window.scrollTo({ top: 43, behavior: 'smooth' });

    } else if (fitur == "datakelas") {
        datakelassaya.style.display = "block";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataraport.style.display = "none";
        dataframekreatif.style.display = "none";
        divgaleri.style.display = "none";
        divgooglemeet.style.display = "none";
        id_admguru.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (fitur == "absen") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "block";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataraport.style.display = "none";
        dataframekreatif.style.display = "none";
        divgaleri.style.display = "none";
        divgooglemeet.style.display = "none";
        id_admguru.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });

    } else if (fitur == "pembelajaran") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "block";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataraport.style.display = "none";
        dataframekreatif.style.display = "none";
        upload_materi.style.display = "none";
        divgaleri.style.display = "none";
        divgooglemeet.style.display = "none";
        id_admguru.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (fitur == "kurikulum") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "block";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataraport.style.display = "none";
        dataframekreatif.style.display = "none";
        divgaleri.style.display = "none";
        divgooglemeet.style.display = "none";
        id_admguru.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (fitur == "mapel") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "block";
        datakehadiranguru.style.display = "none";
        dataraport.style.display = "none";
        dataframekreatif.style.display = "none";
        divgaleri.style.display = "none";
        divgooglemeet.style.display = "none";
        id_admguru.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (fitur == "kehadiranguru") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "block";
        dataraport.style.display = "none";
        dataframekreatif.style.display = "none";
        divgaleri.style.display = "none";
        divgooglemeet.style.display = "none";
        id_admguru.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (fitur == "raport") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataraport.style.display = "block";
        dataframekreatif.style.display = "none";
        divgaleri.style.display = "none";
        divgooglemeet.style.display = "none";
        id_admguru.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (fitur == "meme") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataraport.style.display = "none";
        dataframekreatif.style.display = "block";
        divgaleri.style.display = "none";
        divgooglemeet.style.display = "none";
        id_admguru.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });

    } else if (fitur == "galery") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataraport.style.display = "none";
        dataframekreatif.style.display = "none";
        divgaleri.style.display = "block";
        divgooglemeet.style.display = "none";
        id_admguru.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });

    } else if (fitur == "googlemeet") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataraport.style.display = "none";
        dataframekreatif.style.display = "none";
        divgaleri.style.display = "none";
        divgooglemeet.style.display = "block";
        id_admguru.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });

    } else if (fitur == "administrasiguru") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataraport.style.display = "none";
        dataframekreatif.style.display = "none";
        divgaleri.style.display = "none";
        divgooglemeet.style.display = "none";
        id_admguru.style.display = "block";
        window.scrollTo({ top: y, behavior: 'smooth' });

    }
    w3_close();
}

//////

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

const htmlformulirdatasiswa = (tokensiswa) => {
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
            <br/>
            <br/>
            Akan disetujui Oleh <b class="pengapprove"></b>
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
        <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round"  name="nis" id="hfd_nis">
        <br/>
        <label for="hfd_nisn">NISN:</label>
        <br/>
        <input type="text" class="w3-input w3-white w3-border w3-border-black w3-round" name="nisn" id="hfd_nisn">
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
                <div id="hdp_dok_akte" class="w3-card-4 w3-padding">PREVIEW</div>
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
                <div id="hdp_dok_kk" class="w3-card-4 w3-padding">PREVIEW</div>
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
        <div id="hdp_dok_kks" class="w3-card-4 w3-padding">PREVIEW</div>
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
        <div id="hdp_dok_kpspkh" class="w3-card-4 w3-padding">PREVIEW</div>
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
        <div id="hdp_dok_kip" class="w3-card-4 w3-padding">PREVIEW</div>
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
    Isian ini untuk mengisi data riwayat sekolah sebelum di ${idNamaSekolah}. Contoh TK, RA, PAUD.<br/><br/>
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
        <button onclick="validasiajuandata(${tokensiswa})" class="w3-button w3-card-4 warnaeka w3-margin w3-border-bottom w3-border-black w3-round-large"><i class="fa fa-paper-plane"></i> Kirim Ajuan </button>
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
    let inputnama = document.querySelector("input[id='hfd_pd_nama']").value; //cpdb_id_file_akta
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
    let namafile = inputnama.value + "_" + namadokumen;

    let data = new FormData();
    data.append("action", "uploadfiledulu");
    data.append("fileContent", param);
    data.append("mimeType", tipe);
    data.append("filename", namafile);
    data.append("kelas", idNamaKelas);
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
const validasiajuandata = async (tokensiswa) => {
    let namaform = document.getElementById("formajuandatasiswa"); //.elements;
    let dataoke = [];
    let datagaada = [];
    let cekhead = arrayheadsumber.filter(s => s !== "time_stamp"); //array

    let avoid_head = ["aktif", "dieditoleh", "action", "usulanperubahandata"];
    let elemenform = komponenform(namaform); /// object
    let dataelemen = elemenform.data; // {id:"", data: "", dst}

    if (dataelemen.dok_akte == "" || dataelemen.dok_kk == "") {
        alert("Anda wajib mengunggah file akte dan kartu keluarga");

    } else {
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
        //datakirim.append("tab", "new_datasiswa");
        datakirim.append("tabel", tabel);
        datakirim.append("tokensiswa", tokensiswa);
        datakirim.append("idss", jlo.ss_datauser);

        infoloadingljk.innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"/></p>`
        await fetch(url_absensiswa + "?action=daftarulangduasheet", {
            method: "post",
            body: datakirim
        })
            .then(m => m.json())
            .then(r => {
                infoloadingljk.innerHTML = r.result;
                // console.log(r)
                let datasiswakelasini = r.datasiswa.filter(s => s.nama_rombel == idNamaKelas && s.aktif == "aktif");
                // console.log(datasiswakelasini)
                jsondatasiswa = datasiswakelasini;
                localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(datasiswakelasini));
            })
            .catch(er => {
                console.log(er);
                infoloadingljk.innerHTML = "Terjadi kesalahan";
            })
        updatesetelahverifikasidaftarulang();
    }
};
const updatesetelahverifikasidaftarulang = async () => {
    await updateDatasiswa()
    document.querySelector(".pesankhusussiswa").innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"/></p>`;
    await fetch(linkDataUserWithIdss + "&action=usulanperbaikandata")
        .then(m => m.json())
        .then(k => {
            //console.log(k);
            let dataaktif = k.datasiswa.filter(s => s.aktif == "aktif");
            let usulkelasini = k.datasiswa.filter(k => (k.nama_rombel == idNamaKelas));
            let usulkelasinibelumdisetujui = dataaktif.filter(k => (k.nama_rombel == idNamaKelas && k.usulanperubahandata.indexOf("disetujui") == -1));
            // console.log(usulkelasinibelumdisetujui.length);
            // console.log(usulkelasinibelumdisetujui.length);

            let usulkelasinisudahdisetujui = dataaktif.filter(k => (k.nama_rombel == idNamaKelas && k.usulanperubahandata.indexOf("disetujui") > -1));
            informasiusulandata["usulanbaru"] = usulkelasinibelumdisetujui;
            informasiusulandata["usulandisetujui"] = usulkelasinisudahdisetujui;
            informasiusulandata["all"] = usulkelasini;

            if (usulkelasinibelumdisetujui.length !== jsondatasiswa.length) {
                document.querySelector(".pesankhusussiswa").className = document.querySelector(".pesankhusussiswa").className.replace(" w3-hide", "");
                document.querySelector(".pesankhusussiswa").innerHTML = `Anda memiliki ${usulkelasinibelumdisetujui.length} usulan data perubahan data baru (Daftar Ulang) dari siswa Anda yang belum disetujui (diverifikasi). Segera Verifikasi data tersebut di menu Data Kelas Anda. (Tombol informasi berwarna merah menandakan siswa yang mengusulkan perbaruan data.)
                <br/>
                <br/>
                <table class="w3-table-all w3-striped" style="width:50%;margin:0 auto">
                <caption>Tabel Pengusulan Perubahan Data (Daftar Ulang)</caption>
                    <tr>
                        <td>Jumlah Siswa</td>
                        <td>${jsondatasiswa.length}</td>
                    </tr><tr>    
                        <td>Usulan <b class="w3-text-red">Belum</b> Diverifikasi</td>
                        <td>${usulkelasinibelumdisetujui.length}</td>
                    </tr><tr>    
                    <td>Usulan <b  class="w3-text-blue">Sudah</b> Diverifikasi</th>
                        <td>${usulkelasinisudahdisetujui.length}</td>
                    </tr>
                </table>
                <hr/>
                `;

            } else {
                if (document.querySelector(".pesankhusussiswa").className.indexOf("w3-hide") == -1) {
                    document.querySelector(".pesankhusussiswa").className += " w3-hide";
                }
            }
            tabeldatakelassaya();

        })
        .catch(er => {
            console.log(er);
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
    head.innerHTML = `<title>E-DURASA ${title}</title>`;
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


const detailformulir = async (tokensiswa) => {
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

    await fetch(ling + "&action=usulanperbaikandata")
        .then(m => m.json())
        .then(k => {
            let cariidd = k.datasiswa.filter(s => s.id == tokensiswa);
            let httml = "";
            if (cariidd.length == 0) {
                httml = `<div id="bio_print"><h4 class="w3-center">Siswa ini belum pernah mengusulkan Perubahan Data (Belum pernah mendaftar ulang)</h4>`;
                httml += htmldataprofil();
                httml += `</div><div class="w3-center tempattomboltambahan">
                <br/>        
                <button class="w3-button w3-card-4 w3-round-large warnaeka" onclick="ajuanperubahandataolehguru(${tokensiswa})"> Bantu Isi</button>
                <br/>
                <br/>
                <button class="w3-button w3-card-4 w3-round-large warnaeka" onclick="printModalinfoljk('Data Siswa','bio_print')">Cetak</button>
                <button class="w3-button warnaeka w3-card-4 w3-round-large" onclick="infoloadingljk.innerHTML='';loadingljk.style.display='none'">Tutup Form</button>
                
                </div>`;
            } else {
                httml = `<div id="bio_print">${htmldataprofil()}`;
                httml += `</div><div class="w3-center tempattomboltambahan">
                        <button class="w3-button w3-card-4 w3-round-large warnaeka" onclick="ajuanperubahandata(${tokensiswa})">Verifikasikan</button>
                        <br>
                        <br>
                        <button class="w3-button w3-card-4 w3-round-large warnaeka" onclick="printModalinfoljk('Data Siswa','bio_print')">Cetak</button>
                        <button class="w3-button warnaeka w3-card-4 w3-round-large" onclick="infoloadingljk.innerHTML='';loadingljk.style.display='none'">Tutup Form</button>
                        </div>`;
            }
            infoloadingljk.innerHTML = `${httml}
                `;
            if (cariidd.length !== 0) {
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
                let teks = "";
                let status = cariid.usulanperubahandata;

                if (status.indexOf("disetujui") > -1) {
                    teks = ""; //status
                } else {
                    teks = "dan Anda harus segera memverifikasinya"
                }
                if (cariidd.length == 0) {
                    alert("Ananda belum pernah mengirimkan perubahan data (Belum daftar ulang)");
                } else {
                    alert("Siswa ini mengirimkan perubahan data " + status + " " + teks);


                }
            } else {
                let cariid = jsondatasiswa.filter(s => s.id == tokensiswa)[0];
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
};
const ajuanperubahandata = async (tokensiswa) => {
    let ss = jlo.ss_datauser;
    let ur = jlo.url_datauser;
    let ling = ur + "?idss=" + ss;
    let datahtml = "",
        cariid;
    let namakelas = idNamaKelas;
    loadingljk.style.display = "block";
    $('#infoloadingljk').nextAll('button').remove();
    // let img = document.querySelector(".avatarsiswa");
    // let srcimg = img.getAttribute("src");
    // // console.log(srcimg)'
    infoloadingljk.innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"></p>`;

    await fetch(ling + "&action=usulanperbaikandata")
        .then(m => m.json())
        .then(k => {
            // console.log(k);
            let sumber = k.datasiswa.filter(s => s.id == tokensiswa);

            datahtml = htmlformulirdatasiswa(tokensiswa);
            infoloadingljk.innerHTML = datahtml;
            document.querySelector(".pengapprove").innerHTML = sumber[0].dieditoleh.toUpperCase();
            let obj = sumber[0];
            obj.action = "";
            let statussebelumnya = obj.usulanperubahandata == ""?1:obj.usulanperubahandata;

            obj.usulanperubahandata = "Ajuan Ke-" + (parseInt(statussebelumnya.match(/(\d+)/)[0])) + " disetujui";



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
                                elementform[x].value = nilai[d];
                            } else {
                                if (key[d] == "dieditoleh") {
                                    elementform[x].value = namauser;

                                } else {
                                    elementform[x].value = nilai[d]

                                }

                            }
                        };
                        //ganti id
                        if (key[d].indexOf("dok_") > -1) {
                            let idel = "hdp_" + key[d];
                            //console.log(idel);
                            let elemendiv = document.querySelector("#" + idel);
                            if (elemendiv !== undefined || elemendiv !== null) {
                                let iddrive = (nilai[d] == "") ? `<p class="w3-text-red w3-ceneter">Tidak Melampirkan</p><div class="containerbaru"><iframe class="responsive-iframebaru" src="https://drive.google.com/file/d/18Zvo5idM92xYEIzqKDDFnc0iqI6JvUnS/preview" title="dokumen"></iframe></div>` : `<div class="containerbaru"><iframe class="responsive-iframebaru" src="https://drive.google.com/file/d/${nilai[d]}/preview" title="dokumen"></iframe></div>`;
                                elemendiv.innerHTML = iddrive;
                            }

                        }
                    }

                }
            }

        }).catch(er => {
            console.log(er);
            infoloadingljk.innerHTML = "Terjadi kesalahan."
        })

};
const ajuanperubahandataolehguru = async (tokensiswa) => {
    let ss = jlo.ss_datauser;
    let ur = jlo.url_datauser;
    let ling = ur + "?idss=" + ss;
    let datahtml = "",
        cariid;
    let namakelas = idNamaKelas;
    loadingljk.style.display = "block";
    $('#infoloadingljk').nextAll('button').remove();
    // let img = document.querySelector(".avatarsiswa");
    // let srcimg = img.getAttribute("src");
    // // console.log(srcimg)'
    infoloadingljk.innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"></p>`;

    await fetch(ling + "&action=datasiswaaktif&kelas=" + namakelas)
        .then(m => m.json())
        .then(k => {
            // console.log(k);
            ///update local storage
            jsondatasiswa = k.datasiswa;
            localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(k));

            let sumber = k.datasiswa.filter(s => s.id == tokensiswa);

            // console.log(sumber);
            datahtml = htmlformulirdatasiswa(tokensiswa);
            infoloadingljk.innerHTML = `<div class="bio_print">${datahtml}</div>`;
            document.querySelector(".pengapprove").innerHTML = sumber[0].dieditoleh.toUpperCase();
            let obj = sumber[0];
            obj.action = "";
            obj.action = "";
            let statussebelumnya = obj.usulanperubahandata
            if (statussebelumnya.indexOf("disetujui") > -1) {
                obj.usulanperubahandata = "Ajuan Ke-" + (parseInt(statussebelumnya.match(/(\d+)/)[0]) + 1) + "disetujui dan isian dibantu guru ke-" + parseInt(statussebelumnya.match(/(\d+)/)[0]) + 1;
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
                            elementform[x].value = nilai[d];
                        } else {
                            if (angkadistring.indexOf(key[d]) > -1) {
                                elementform[x].value = nilai[d].replace("'", "")
                            } else {
                                if (key[d] == "dieditoleh") {
                                    elementform[x].value = namauser;

                                } else {
                                    elementform[x].value = nilai[d]

                                }
                            }
                        };
                        //ganti id
                        if (key[d].indexOf("dok_") > -1) {
                            let idel = "hdp_" + key[d];
                            //console.log(idel);
                            let elemendiv = document.querySelector("#" + idel);
                            if (elemendiv !== undefined || elemendiv !== null) {
                                let iddrive = (nilai[d] == "") ? `<p class="w3-text-red w3-ceneter">Tidak Melampirkan</p><div class="containerbaru"><iframe class="responsive-iframebaru" src="https://drive.google.com/file/d/18Zvo5idM92xYEIzqKDDFnc0iqI6JvUnS/preview" title="dokumen"></iframe></div>` : `<div class="containerbaru"><iframe class="responsive-iframebaru" src="https://drive.google.com/file/d/${nilai[d]}/preview" title="dokumen"></iframe></div>`;
                                elemendiv.innerHTML = iddrive;
                            }

                        }
                    }

                }
            }

        }).catch(er => {
            console.log(er);
            infoloadingljk.innerHTML = "Terjadi kesalahan."
        })

};

///////////////////////////////// source ABSEN.js


function hapussiswaxxxx(id) {
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


                await fetch(linkDataUserWithIdss + "&action=datasiswatidakaktif")
                    .then(m => m.json())
                    .then(k => {
                        arraysiswatidakaktif = k.datasiswa;
                        jumlahseluruhsiswadisekolah = k.total
                        localStorage.setItem("datasiswatidakaktif", JSON.stringify(k))
                    })

                updatesetelahverifikasidaftarulang()

            },
            error: function (er) {
                alert(er);
            }


        })

    } else { alert("Anda membatalkan perintah untuk menghapus siswa Anda.") }
}


function hapussiswa(id) {
    var konfirm = confirm("Siswa ini akan dihilangkan dari kelas Anda. \n \n Tapi data masih berada di database kami. \n \n Anda yakin ingin menghapusnya? id " + id)
    if (!konfirm) {
        alert("Anda membatalkan perintah hapus");
        return
    }
    //let namaheader = namatabel.rows[0].cells[8].innerHTML;
    var url = linkDataUserWithIdss + "&action=hapussiswa";
    //alert(namaheader)


    let jsonlamaanakini = jsondatasiswa.filter(s => s.id == id)[0];
    jsonlamaanakini["aktif"] = "non-aktif";



    let pus = [];
    let key = arrayheadsumber.filter(s => s !== "time_stamp");//array

    //Jika sebelumnya belum daftar ulang, maka API yang digunakan ini
    let databelumkirim = new FormData();
    for (let i = 0; i < key.length; i++) {
        pus.push(jsonlamaanakini[key[i]]);
        databelumkirim.append(key[i], jsonlamaanakini[key[i]]);
    }

    //Jika sebelumnya sudah daftar ulang, maka API yang digunakan ini
    let tabel = JSON.stringify(pus);
    let datakirim = new FormData();
    datakirim.append("tabel", tabel);
    datakirim.append("tokensiswa", id);
    datakirim.append("idss", jlo.ss_datauser);

    let semuapendaftarulang = informasiusulandata["all"]
    let sudahdaftarulang = semuapendaftarulang.filter(s => s.id == id)
    if (sudahdaftarulang.length == 0) {
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


                await fetch(linkDataUserWithIdss + "&action=datasiswatidakaktif")
                    .then(m => m.json())
                    .then(k => {
                        arraysiswatidakaktif = k.datasiswa;
                        jumlahseluruhsiswadisekolah = k.total
                        localStorage.setItem("datasiswatidakaktif", JSON.stringify(k))
                    })

                updatesetelahverifikasidaftarulang()

            },
            error: function (er) {
                alert(er);
            }


        })

    } else {
        fetch(url_absensiswa + "?action=daftarulangduasheet", {
            method: "post",
            body: datakirim
        })
            .then(m => m.json())
            .then(r => {
                //infoloadingljk.innerHTML = r.result;
                // console.log(r)
                let datasiswakelasini = r.datasiswa.filter(s => s.nama_rombel == idNamaKelas && s.aktif == "aktif");
                // console.log(datasiswakelasini)
                jsondatasiswa = datasiswakelasini;
                localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(datasiswakelasini));

                updatesetelahverifikasidaftarulang();
                alert("Dengan fitur perubahan yang Anda lakukan, Status verifikasi sesuai dengan status verifikasi sebelumnya.")
            })
            .catch(er => {
                console.log(er);
                infoloadingljk.innerHTML = "Terjadi kesalahan";
            })




    }
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
    console.log(tes);
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
    var teksjudul = document.createTextNode("E-DURASA")
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
    var nipkepsekku = idNipKepsek;
    var guruapa = idJenisGuru + " " + ruangankelas;
    var namaguruku = namauser;
    var nipguruku = idNipGuruKelas;

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
    bodynya.innerHTML += '<div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ', ' + tglakhir + ' ' + namabulan[blnakhirr] + ' ' + thnakhirr + '<br/>' + guruapa + '<br/><br/><br/><br/><br/><b><u>' + namaguruku + '</u></b><br/>NIP. ' + nipguruku + '</div>';
    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();
}




function exceldatasiswaLama() {
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
        sel.innerHTML = idJenisGuru + " " + idNamaKelas
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
        filename: "Data Siswa Kelas " + ruangankelas + " dicetak pada " + new Date(),
        fileext: ".xlsx",
        exclude_img: true,
        exclude_judul: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true
    });
    datasiswadiv.innerHTML = "";
}
function exceldatasiswa() {
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var namatabel = document.getElementById("myTable");
    var head = namatabel.getElementsByTagName("thead")[0];
    var bodyy = namatabel.getElementsByTagName("tbody")[0];

    let html = `<table id="myTableCopy" class="versi-table">
    <tr>
        <td colspan="13"> ${idNamaSekolah.toUpperCase()}</td>
    </tr>
    <tr>
        <td colspan="13"> DATA SISWA KELAS ${idNamaKelas}</td>
    </tr>
    <tr>
        <td colspan="13"> SEMESTER ${idSemester} TAHUN PELAJARAN ${idTeksTapel}</td>
    </tr>
    <tr><td colspan="13"></td></tr>
    <tr><td colspan="13"></td></tr>
    ${head.outerHTML}
    `;
    let lr = bodyy.rows;
    //console.log(lr.length);
    // console.log(lr);
    let htmll = "";
    let isii, bersihspasi, bersihenter;
    for (let i = 0; i < lr.length; i++) {
        htmll += `<tr>`;
        let sel = lr[i].cells;
        for (let j = 0; j < sel.length; j++) {
            if (j == 1) {
                htmll += `<td>${jsondatasiswa[i].id}</td>`;
            } else if (j == 2 || j == 3 || j == 12) {
                isii = sel[j].innerHTML
                //bersihspasi = isii.replace(/\s+/g, "");
                bersihspasi = isii;
                bersihenter = bersihspasi.replace(/\n/g, " ");
                htmll += (sel[j].innerHTML == "") ? `<td></td>` : `<td>'${bersihenter}</td>`;
            }
            else {
                isii = sel[j].innerHTML
                bersihspasi = isii;//.replace(/\s+/g, "");
                bersihenter = bersihspasi;//.replace(/\n/g, "");
                htmll += `<td>${bersihenter}</td>`;
            }
        }
        htmll += `</tr>`;

    }

    //console.log(htmll);
    html += `${htmll}<tr><td colspan="13"></td></tr>
    <tr><td colspan="13"></td></tr>
    <tr>
    <td colspan="3">Mengetahui,</td>
    <td colspan="7"></td>
    <td colspan="3">${jlo.kota}, ${tanggalfull(new Date())}</td>
    </tr>
    <tr>
        <td colspan="3">Kepala ${idNamaSekolah}</td>
        <td colspan="7"></td>
        <td colspan="3">${idJenisGuru}  ${idNamaKelas}</td>
    </tr>
    <tr><td colspan="13"></td></tr>
    <tr><td colspan="13"></td></tr>
    <tr><td colspan="13"></td></tr>
    <tr>
        <td colspan="3"><b><u>${idNamaKepsek}</u></b></td>
        <td colspan="7"></td>
        <td colspan="3"><b><u>${namauser}</u></b></td>
    </tr><tr>
        <td colspan="3">NIP. ${idNipKepsek}</td>
        <td colspan="7"></td>
        <td colspan="3">NIP. ${idGuruKelas}</td>
    </tr></table>`;
    datasiswadiv.innerHTML = html;

    $("#myTableCopy").table2excel({
        name: " SDN Ratujaya 1",
        filename: "Data Siswa Kelas " + ruangankelas + " Tapel " + idTeksTapel.replace("/", " ") + " dicetak pada " + new Date(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 1,
        barisatas: 5
    });
    datasiswadiv.innerHTML = "";
};
const exportdatasiswa = () => {
    alert("Mengekspor Data Siswa Kelas Anda adalah mengekspor data berdasarkan database yang telah disimpan dan format sesuai dengan Database E-DURASA (isi sesuai Dapodik). Jika Anda baru saja mengedit di laman tabel data siswa dan belum menyimpannya ke server, sebaiknya Anda simpan terlebih dahulu. File ini bisa digunakan untuk mengekspor ke Tabel (jika diperlukan)");
    let datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    let html = `<table class="versi-table" id="myTableCopy"><tr>`;
    //head
    for (let i = 0; i < arrayheadsumber.length; i++) {
        html += `<td>${arrayheadsumber[i]}</td>`;
    }
    html += `</tr>`
    for (let j = 0; j < jsondatasiswa.length; j++) {
        html += `<tr>`;
        let ob = jsondatasiswa[j];
        for (k = 0; k < arrayheadsumber.length; k++) {
            let form_number = angkadistring.indexOf(arrayheadsumber[k])
            if (form_number > -1) {
                html += `<td>${(ob[arrayheadsumber[k]] == "") ? "" : "'" + ob[arrayheadsumber[k]]}</td>`;

            } else {
                html += `<td>${ob[arrayheadsumber[k]]}</td>`;

            }
        }

        html += `</tr>`
    }

    datasiswadiv.innerHTML = html;

    $("#myTableCopy").table2excel({
        name: " SDN Ratujaya 1",
        filename: "FILE EXPORT DATA SISWA KELAS " + ruangankelas + " " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 1,
        barisatas: 0
    });
    datasiswadiv.innerHTML = "";
};



const tambahsiswa = () => {
    modal_edit_siswa.style.display = "block";
    modaledithapus.style.display = "none";
    tomboledithapus.style.display = "none";
    if (arraysiswatidakaktif.length > 0) {
        inputtambahan.style.display = "block";
        inputtambahan.innerHTML = "Sebelum Anda menambahkan siswa, berikut terdapat siswa di database Kami yang belum dimasukkan ke dalam kelas. Jika memang ada, silakan pilih tombol 'Masukkan ke dalam kelas'";
        var bikintabel = document.createElement("table");
        bikintabel.setAttribute("class", "versi-table");
        var tr = bikintabel.insertRow(0);
        var td = tr.insertCell(-1);
        td.innerHTML = "No"
        var td = tr.insertCell(-1);
        td.innerHTML = "Nama"
        var td = tr.insertCell(-1);
        td.innerHTML = "Kelas Sebelumnya";
        var td = tr.insertCell(-1);
        td.innerHTML = "Masukan ke dalam kelas";
        for (i = 0; i < arraysiswatidakaktif.length; i++) {
            var tr = bikintabel.insertRow(-1);
            var td = tr.insertCell(-1);
            td.innerHTML = i + 1;
            var td = tr.insertCell(-1);
            td.innerHTML = arraysiswatidakaktif[i].pd_nama;
            var td = tr.insertCell(-1);
            td.innerHTML = arraysiswatidakaktif[i].nama_rombel;
            var td = tr.insertCell(-1);
            td.setAttribute("id", "tombolambil" + arraysiswatidakaktif[i].id);
            td.innerHTML = "";
            var tombolambil = document.createElement("button")
            tombolambil.setAttribute("onclick", "aktifkansiswadikelas('id=" + arraysiswatidakaktif[i].id + "&jenjang=" + idJenjang + "&kelas=" + ruangankelas + "')");
            tombolambil.innerHTML = "Masukan ke dalam kelas";
            td.appendChild(tombolambil);
        }
        inputtambahan.appendChild(bikintabel);
        inputtambahan.innerHTML += "<hr/> Jika tetap ingin menambahkan nama siswa. Klik tombol di bawah ini. <br/><br/>"
        var tombolambil = document.createElement("button")
        var aa = parseFloat(jumlahseluruhsiswadisekolah) + 1;
        tombolambil.setAttribute("onclick", "isikantambahsiswa(" + aa + ")");
        tombolambil.setAttribute("class", "wa");
        tombolambil.innerHTML = "Tambah Siswa";
        inputtambahan.appendChild(tombolambil);
    }
    else {
        var a = jumlahseluruhsiswadisekolah + 1;//parseFloat(jumlahseluruhsiswadisekolah)+2
        isikantambahsiswa(a)
    }
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

function editsiswalama(id) { //menampilkan modal saat user mengeklik salah satu nama di tabel data kelas
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



async function editsiswa(y) {
    let konfirm = confirm("Apa Anda yakin ingin mengedit data siswa ini?\n\n Klik [OK] untuk mengedit\n\n Klik [CANCEL] untuk membatalkan");
    if (!konfirm) {
        return
    }
    // alert("Dengan menyimpan ini, Anda tidak secara langsung tidak memverifikasi");
    let namatabel = document.getElementById("myTable").getElementsByTagName("tbody")[0].rows[y];
    let xid = jsondatasiswa[y].id, xjenjang = idJenjang, xnama_rombel = idNamaKelas,
        xnis = namatabel.cells[2].innerHTML,
        xnisn = namatabel.cells[3].innerHTML, xnik = jsondatasiswa[y].nik,
        xnokk = jsondatasiswa[y].nokk, xpdnama = namatabel.cells[4].innerHTML,
        xpdjk = namatabel.cells[5].innerHTML,
        xpdtl = namatabel.cells[7].innerHTML;
    let t = namatabel.cells[8].innerHTML;
    let dt = formatbalikin((t == "") ? "1 Juli 2019" : t);
    let xpdtgl = StringTanggal2(new Date(dt)),
        spdagama = namatabel.cells[6].innerHTML,
        spdayah = namatabel.cells[9].innerHTML,
        spdibu = namatabel.cells[10].innerHTML,
        spdalamat = namatabel.cells[11].innerHTML,
        spdhp = namatabel.cells[12].innerHTML,
        spdaktif = "aktif", spdeditoleh = namauser;

    let jsonlamaanakini = jsondatasiswa.filter(s => s.id == xid)[0];
    jsonlamaanakini["id"] = xid;
    jsonlamaanakini["jenjang"] = xjenjang;
    jsonlamaanakini["nama_rombel"] = xnama_rombel;
    jsonlamaanakini["nis"] = xnis.replace(/&nbsp;/g, "");
    jsonlamaanakini["nisn"] = xnisn.replace(/&nbsp;/g, "");
    jsonlamaanakini["nik"] = xnik.replace(/&nbsp;/g, "");
    jsonlamaanakini["nokk"] = xnokk.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_nama"] = xpdnama.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_jk"] = xpdjk.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_tl"] = xpdtl.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_tanggallahir"] = xpdtgl;
    jsonlamaanakini["pd_agama"] = spdagama.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_namaayah"] = spdayah.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_namaibu"] = spdibu.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_alamat"] = spdalamat.replace(/&nbsp;/g, "");
    jsonlamaanakini["pd_hp"] = spdhp.replace(/&nbsp;/g, "");
    jsonlamaanakini["aktif"] = spdaktif.replace(/&nbsp;/g, "");
    jsonlamaanakini["dieditoleh"] = spdeditoleh;


    let pus = [];
    let key = arrayheadsumber.filter(s => s !== "time_stamp");//array

    //Jika sebelumnya belum daftar ulang, maka API yang digunakan ini
    let databelumkirim = new FormData();
    for (let i = 0; i < key.length; i++) {
        pus.push(jsonlamaanakini[key[i]]);
        databelumkirim.append(key[i], jsonlamaanakini[key[i]]);
    }

    //Jika sebelumnya sudah daftar ulang, maka API yang digunakan ini
    let tabel = JSON.stringify(pus);
    let datakirim = new FormData();
    datakirim.append("tabel", tabel);
    datakirim.append("tokensiswa", xid);
    datakirim.append("idss", jlo.ss_datauser);

    let semuapendaftarulang = informasiusulandata["all"]
    let sudahdaftarulang = semuapendaftarulang.filter(s => s.id == xid)
    if (sudahdaftarulang.length == 0) {
        let aaa = linkDataUserWithIdss + "&action=editsiswa";
        await fetch(aaa, {
            method: "post",
            body: databelumkirim
        }).then(m => m.json())
            .then(f => {

                alert(f);
                fetch(linkDataUserWithIdss + "&action=datasiswaaktif&kelas=" + ruangankelas)
                    .then(n => n.json())
                    .then(k => {
                        jsondatasiswa = k.datasiswa;
                        localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(k));
                        tabeldatakelassaya();
                    });


            })
            .catch(er => alert(er));
    } else {
        await fetch(url_absensiswa + "?action=daftarulangduasheet", {
            method: "post",
            body: datakirim
        })
            .then(m => m.json())
            .then(r => {
                //infoloadingljk.innerHTML = r.result;
                // console.log(r)
                let datasiswakelasini = r.datasiswa.filter(s => s.nama_rombel == idNamaKelas && s.aktif == "aktif");
                // console.log(datasiswakelasini)
                jsondatasiswa = datasiswakelasini;
                localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(datasiswakelasini));

                tabeldatakelassaya();
                alert("Dengan fitur perubahan yang Anda lakukan, Status verifikasi sesuai dengan status verifikasi sebelumnya.")
            })
            .catch(er => {
                console.log(er);
                infoloadingljk.innerHTML = "Terjadi kesalahan";
            })
    }
    //infoloadingljk.innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"/></p>`


    // console.log(jsonlamaanakini);
    // let statussebelumnya = jsonlamaanakini.usulanperubahandata;
    // if (statussebelumnya.indexOf("disetujui") > -1) {
    //     jsonlamaanakini.usulanperubahandata = "Ajuan Ke-" + (parseInt(statussebelumnya.match(/(\d+)/)[0])) + "disetujui dan isian dibantu guru ke-" + parseInt(statussebelumnya.match(/(\d+)/)[0]) + 1;
    // } else {
    //     jsonlamaanakini.usulanperubahandata = statussebelumnya;
    // }

    // data.append("jenjang", xjenjang);
    // data.append("nama_rombel", xnama_rombel);
    // data.append("nis", xnis);
    // data.append("nisn", xnisn);
    // data.append("nik", xnik);
    // data.append("nokk", xnokk);
    // data.append("pd_nama", xpdnama);
    // data.append("pd_jk", xpdjk);
    // data.append("pd_tl", xpdtl);
    // data.append("pd_tanggallahir", xpdtgl);
    // data.append("pd_agama", spdagama);
    // data.append("pd_namaayah", spdayah);
    // data.append("pd_namaibu", spdibu);
    // data.append("pd_alamat", spdalamat);
    // data.append("pd_hp", spdhp);
    // data.append("aktif", spdaktif);
    // data.append("dieditoleh", spdeditoleh);





}

const editttl = (brs) => {
    //alert("baris ke=" + brs);

    modaltanggal.style.display = "block";
    let namatabel = document.getElementById("myTable").getElementsByTagName("tbody")[0];
    let namaheader = namatabel.rows[brs].cells[4].innerHTML;
    let tekstanggal = (namatabel.rows[brs].cells[8].innerHTML == "") ? "1 Juli " + (new Date().getFullYear() - 12) : namatabel.rows[brs].cells[8].innerHTML;

    //console.log(tekstanggal);

    let tgl = formatbalikin(tekstanggal);
    let balikintanggal = StringTanggal2(new Date(tgl));
    //let teks = "ini data headerr yang diklik adalah " + namaheader;

    let teks = "<h3 class='w3-center'>Ubah Tanggal Lahir atas nama<br/>" + namaheader + "</h3>";

    teks += `<input type="date" class="w3-input" id="valuetanggal" onchange="modalubahtanggal()" value="${balikintanggal}"/>`
    teks += `<hr/><span id="translettgl">${tanggalfull(tgl)}</span><hr/>`;
    teks += `<button onclick="tanggaloke(${brs},8)">Simpan</button><hr/>`;
    teks += `<button onclick="hapustanggal(${brs},8)">Hapus</button><hr/>`;
    //

    dataubahtanggal.innerHTML = teks;
}

const editdataagamasiswa = (brs) => {
    //alert("baris ke=" + brs);

    modalagama.style.display = "block";
    let namatabel = document.getElementById("myTable").getElementsByTagName("tbody")[0];
    let elsel = document.getElementById("pd_agama_modal");
    elsel.value = namatabel.rows[brs].cells[6].innerHTML;
    elsel.setAttribute("onchange", `chgagamasiswa(${brs})`)
}
const chgagamasiswa = (z) => {
    let namatabel = document.getElementById("myTable").getElementsByTagName("tbody")[0];
    let elsel = document.getElementById("pd_agama_modal");
    let y = elsel.options;
    let x = elsel.selectedIndex;
    // alert(y[x].value + " " + y[x].text);
    namatabel.rows[z].cells[6].innerHTML = y[x].value;

    modalagama.style.display = "none";



}
function formatbalikin(tekss) {
    let teks = tekss.toString();
    let str = teks.split(" ");
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    let date = new Date(str[2], bulan.indexOf(str[1]), str[0]);
    return date;
}

const hapustanggal = (r, c) => {
    let namatabel = document.getElementById("myTable").getElementsByTagName("tbody")[0];;
    namatabel.rows[r].cells[c].innerHTML = "";
}

const modalubahtanggal = () => {
    let el = document.getElementById("valuetanggal");//.getElementsByTagName("tbody")[0];;
    document.getElementById("translettgl").innerHTML = tanggalfull(el.value);
}
const tanggaloke = (r, c) => {
    let namatabel = document.getElementById("myTable").getElementsByTagName("tbody")[0];;

    let tanggal = document.getElementById("valuetanggal");

    namatabel.rows[r].cells[c].innerHTML = tanggalfull(tanggal.value);

    tutupmodaltanggal.click();
}

const StringTanggal2 = (tgl) => { //parameter tgl bentuk tgl
    let m = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let y = tgl.getFullYear();


    let string = y + "-" + addZero(m) + "-" + addZero(d);


    //console.log(string)
    return string
}

////////////////// source ABSEN.JS
async function absensisiswa() {

    tampilinsublamangurukelas("absen");
    if (jsondatasiswa.length == 0) {
        alert("Liat data siswa dulu");
        tabeldatakelassaya();
    } else {
        document.querySelector("#aagk_checkbox_harian").checked = false;
        document.querySelector("#aagk_label_harian").innerHTML = "Absen Moda PJJ";
                
        await createtableabsenhariini();
    }
    absenhariini.style.display = "block";
}
async function createtableabsenhariini() {
    var tgl = new Date();
    var tglabsen = tgl.getDate();
    var blnabsenx = tgl.getMonth() + 1;
    var blnabsen = addZero(blnabsenx);

    var thnabsen = tgl.getFullYear();
    let idok = tglabsen + "" + blnabsen + "" + thnabsen;

    var tabel = document.createElement("table");
    tabel.setAttribute("class", "w3-table-all garis");
    tabel.setAttribute("id", "tabelloadinghariini")
    var tr = tabel.insertRow(0);

    var thno = document.createElement("th");
    thno.innerHTML = "No."
    tr.appendChild(thno);
    var thnama = document.createElement("th");
    thnama.innerHTML = "Nama"
    tr.appendChild(thnama);

    var thkehadiran = document.createElement("th");
    thkehadiran.innerHTML = "Kehadiran"
    tr.appendChild(thkehadiran);

    var thaksi = document.createElement("th");
    thaksi.innerHTML = "Aksi"
    tr.appendChild(thaksi);

    for (var i = 0; i < jsondatasiswa.length; i++) {
        var trs = tabel.insertRow(-1);
        var selno = trs.insertCell(-1);
        selno.innerHTML = (i * 1) + 1;
        var selnama = trs.insertCell(-1);
        selnama.innerHTML = jsondatasiswa[i].pd_nama;
        var selkehadiran = trs.insertCell(-1);
        selkehadiran.setAttribute("style", "vertical-align:center;text-align:center");
        selkehadiran.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Loading ...";;
        var selaksi = trs.insertCell(-1);

        var tombolwa = document.createElement("button");
        tombolwa.setAttribute("onclick", "kirimwauntukabsen('wa" + "_" + jsondatasiswa[i].id + "')");
        tombolwa.setAttribute("class", "w3-button w3-yellow w3-round-large w3-card-4 w3-margin-left w3-margin-top ");
        tombolwa.innerHTML = "<i class='fa fa-whatsapp'></i> Siswa";
        selaksi.appendChild(tombolwa);


        var pisahin = document.createElement("br");
        //selaksi.appendChild(pisahin);
        var tombolbantusiswa = document.createElement("button");

        tombolbantusiswa.setAttribute("onclick", "bantuabsen('" + jsondatasiswa[i].id + "_" + idok + "')");
        tombolbantusiswa.setAttribute("class", "w3-button w3-yellow w3-round-large w3-margin-left w3-margin-top w3-card-4");
        tombolbantusiswa.innerHTML = "<i class='fa fa-child'></i> Bantu"
        selaksi.appendChild(tombolbantusiswa);


    }
    tabelabsenhariini.innerHTML = "";
    tabelabsenhariini.appendChild(tabel);

    var tglcari = new Date();

    var thn = tglcari.getFullYear();
    var bln = tglcari.getMonth();
    var tgl = tglcari.getDate();

    spinspin.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Loading ...";

    var jsonabsenkelasperbulan = [];
    let kelas = ruangankelas;

    if (localStorage.hasOwnProperty('absenHariIni')) {
        jsonabsenkelasperbulan = JSON.parse(localStorage.getItem('absenHariIni'));
    } else {
        jsonabsenkelasperbulan = await fecjsonabsen();
        // console.log(jsonabsenkelasperbulan);
        localStorage.setItem('absenHariIni', JSON.stringify(jsonabsenkelasperbulan));

        setTimeout(function () {
            localStorage.removeItem('absenHariIni');
        }, 60000); //1 menit dihapus
    }


    spinspin.innerHTML = "";

    var datatabel = tabelloadinghariini;

    for (var u = 0; u < datatabel.rows.length; u++) {
        if (u !== 0) {
            if (jsonabsenkelasperbulan.length > 0) {
                for (var v = 0; v < jsonabsenkelasperbulan.length; v++) {
                    // if (datatabel.rows[u].cells[1].innerHTML == jsonabsenkelasperbulan[v].name) {
                    if (jsondatasiswa[u - 1].id == jsonabsenkelasperbulan[v].tokensiswa) {
                        let hdr = jsonabsenkelasperbulan[v].kehadiran;
                        var link = jsonabsenkelasperbulan[v].fileContent;
                        if (link !== "") {
                            var linksplit = link.replace("https://drive.google.com/file/d/", "");
                            var idpoto = linksplit.replace("/view?usp=drivesdk", "");

                        } else {
                            var idpoto = idlogo;
                        }


                        datatabel.rows[u].cells[2].innerHTML = `<img src="https://drive.google.com/uc?export=view&id=${idpoto}" style="width:75px;cursor:pointer" alt="poto" onclick="klikpotosiswa(this)"/><br/>${hdr}`;
                        datatabel.rows[u].cells[3].innerHTML = "Pukul <br/>" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getHours()) + ":" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getMinutes()) + ":" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getSeconds());
                        if (jsonabsenkelasperbulan[v].idbaris !== "") {
                            datatabel.rows[u].cells[3].innerHTML += `<br/> <button class="w3-btn w3-yellow w3-round-large" onclick="hapusabsensiswaini('${jsonabsenkelasperbulan[v].idbaris}')">Ganti/Hapus</button>`;
                        }
                        break;
                    } else {
                        datatabel.rows[u].cells[2].innerHTML = "Belum Absen";

                    }
                }
            } else {
                datatabel.rows[u].cells[2].innerHTML = "Belum Absen"
            }
        }
    }




}
const refreshAbsenHariIni = async () => {
    let k = await fecjsonabsen();
    localStorage.setItem('absenHariIni', JSON.stringify(k))
    createtableabsenhariini();
    setTimeout(function () {
        localStorage.removeItem('absenHariIni')
    }, 60000); //1 menit dihapus

}
const fecjsonabsen = () => {
    let tgl = new Date();
    let dtgl = tgl.getDate();
    let mtgl = tgl.getMonth() + 1;
    let nol = addZero(mtgl);
    let ytg = tgl.getFullYear();

    let idHariini = dtgl + "" + nol + "" + ytg;
    return fetch(url_absensiswa + "?action=absenkelashariini&id=" + idHariini + "&kelas=" + encodeURIComponent(ruangankelas))
        .then(m => m.json())
        .then(k => k.absenhariini)
        .catch(er => {
            console.log(er);
            fetch(url_absensiswa + "?action=absenkelashariini&id=" + idHariini + "&kelas=" + encodeURIComponent(ruangankelas))
                .then(m => m.json())
                .then(k => k.absenhariini)
        });

}


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

    start_tgl.value = jadi; // + "T08:00:00";

    let dend = new Date(sumber.end_tgl);
    let tgle = dend.getDate();
    let blne = dend.getMonth() + 1;
    let thne = dend.getFullYear();
    let jadie = thne + "-" + addZero(blne) + "-" + addZero(tgle);

    end_tgl.value = jadie; //+ "T08:00:00";
}
const kirimeditkalender = async () => {
    formmodaleditkaldik.style.display = "none";
    tomboleditkaldik.style.display = "none";
    juduleditkaldik.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo"><i>`

    //let ddd = JSON.parse(localStorage.getItem("inst_id"));
    //url_absenkaldik = ddd.url_dataabsen + "?action=datakaldik&idss="+ddd.ss_dataabsen

    url_absenkaldik = jlo.url_dataabsen + "?action=datakaldik&idss=" + jlo.ss_dataabsen;

    let dot = document.getElementById("formmodaleditkaldik")

    let ol = namauser;
    let link = url_kaldikaja + "?action=editkaldik";

    let data = new FormData(dot);

    data.append('oleh', ol)
    await fetch(link, {
        method: 'post',
        body: data
    })
        .then(m => m.json())
        .then(k => {
            juduleditkaldik.innerHTML = k
        })
        .catch(err => juduleditkaldik.innerHTML = err);

    await fetch(url_absenkaldik).then(m => m.json()).then(k => {

        let kal = k.records;
        //console.log(kal);
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
            td.innerHTML = `<button onclick="ubahtanggalini(${kal[i].idbaris})">Ubah</button><button onclick="hapustanggalini('${kal[i].idbaris}')"})">Hapus</button>`;
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
const kirimtambahkalender = async () => {
    formmodaleditkaldik.style.display = "none";
    tomboleditkaldik.style.display = "none";
    juduleditkaldik.innerHTML = `<i class="fa fa-spin fa-spinner w3-jumbo"><i>`
    url_absenkaldik = jlo.url_dataabsen + "?action=datakaldik&idss=" + jlo.ss_dataabsen;



    let dot = document.getElementById("formmodaleditkaldik")

    let ol = namauser;
    let link = url_kaldikaja + "?action=tambahkaldik";

    let data = new FormData(dot);


    data.append('oleh', ol)
    await fetch(link, {
        method: 'post',
        body: data
    })
        .then(m => m.json())
        .then(k => {
            juduleditkaldik.innerHTML = k
        })
        .catch(err => juduleditkaldik.innerHTML = err);


    await fetch(url_absenkaldik).then(m => m.json()).then(k => {

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
    let konfirm = confirm("Anda yakin ingin mengembalikan kalender pendidikan tertanggal ini? \n\n Klik OK untuk mengembalikan \n Klik CANCEL untuk membatalkan")
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

/////////////////////////////// source MATERIGURU.JS
const updatematerikan = () => {

    let idokmateri = tglStringZero();
    localStorage.removeItem("kbmtoday" + idokmateri);
    let parameterlain = "&crtToken=" + idokmateri + "&idtoken=" + idJenjang;
    $.getJSON(linkmateri + parameterlain + "&action=materihariini", function (f) {
        //             //console.log(f)
        let data = f.result;
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

    //bikin judul h4
    var judul = document.createElement("h4")
    judul.setAttribute("class", "w3-center");
    judul.innerHTML = "Identitas E-DURASA";
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
        // document.getElementById("judulpetunjuk").innerHTML = "Preview E-DURASA";
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
    let koleksitokensiswa = jsondatasiswa.map(k => k.id)

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
        sel.innerHTML = tombolaksihariini(punyaessay, koleksitokensiswa[z]);
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
                    sell.innerHTML = nilaiKDSiswa(koleksitokensiswa[z], banyakkd[j]).replace(".", ",");// banyakkd[j] + "nama = " + koleksinamasiswa[z];

                }
            }
        }

    }



    let idtabel = `tabel_rekap_KD`;
    let judul1 = `DAFTAR NILAI PER-KD ${identitasmapel.toUpperCase()}  KELAS ${idNamaKelas.toUpperCase()}`;
    let judul2 = `Semester ${idSemester} Tahun Pelajaran ${idTeksTapel}`;
    let tekstgl = `${StringTanggal(new Date())}`;
    let namafile = `DAFTAR NILAI PER-KD ${identitasmapel.toUpperCase()} Kelas ${idNamaKelas} id file ${new Date().getTime()}`;
    let xx = `${idtabel}, ${judul1}, ${judul2}, ${tekstgl}`;
    let xxx = `${idtabel}, ${namafile},${judul1}`

    tablinkKDtabel.innerHTML = `<button button class="w3-button w3-green w3-round-xlarge" onclick = "printModalPKD('${xx}')" > <i class="fa fa-print"></i> Cetak </button > | <button class="w3-button w3-teal w3-round-xlarge" onclick="ExcelModalKD('${xxx}')"><i class="fa fa-file-excel-o"></i> Ms. Excel </button>  <hr>`;

    //tablinkKDtabel.appendChild(tombolprint)
    tablinkKDtabel.appendChild(tabel);

}
const nilaiKDSiswa = (parNama, keyKD) => {
    let FilterRec = nilairespon.filter(k => k.tokensiswa == parNama);
    let jmlh = FilterRec.length, nn;
    if (jmlh > 0) {

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

    let angka = keyKD.match(/(\d+)/)[0] // mengembalikan angkanya aja
    let cek = nilairespon.filter(k => k.tokensiswa == parNama).map(d => [d[keyKD], d["SKOR_" + angka]]);
    let ada = cek.length;

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
const formModalTabelAnalisisPG = (id) => {
    let datamaterilocal = JSON.parse(localStorage.getItem("kbmtoday" + tglStringZero()))[id];
    // let jumlahpg = parseInt(datamaterilocal.jumlahpg);
    let jumlahpg = (datamaterilocal.jumlahpg == 0) ? 1 : parseInt(datamaterilocal.jumlahpg);


    let identitasmapel = datamaterilocal.idmapel;
    //console.log(jumlahpg);
    let koleksinamasiswa = jsondatasiswa.map(k => k.pd_nama);
    let koleksitokensiswa = jsondatasiswa.map(k => k.id);

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
                //sel.innerHTML = OpsiSiswa(koleksitokensiswa[c],"PG_" + (d+1));
                if (OpsiSiswa(koleksitokensiswa[c], "PG_" + (d + 1))[0]) {
                    if (OpsiSiswa(koleksitokensiswa[c], "PG_" + (d + 1))[2] == 1) {
                        sel.setAttribute("style", "background-color:green");
                        sel.innerHTML = OpsiSiswa(koleksitokensiswa[c], "PG_" + (d + 1))[1]
                    } else {
                        sel.setAttribute("style", "background-color:red");
                        sel.innerHTML = OpsiSiswa(koleksitokensiswa[c], "PG_" + (d + 1))[1]
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
    let koleksitokensiswa = jsondatasiswa.map(k => k.id);

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
            if (OpsiSiswa(koleksitokensiswa[c], "PG_" + (d + 1))[0]) {
                if (OpsiSiswa(koleksitokensiswa[c], "PG_" + (d + 1))[2] == 1) {
                    sel.setAttribute("style", "background-color:green");
                    sel.innerHTML = OpsiSiswa(koleksitokensiswa[c], "PG_" + (d + 1))[2]
                } else {
                    sel.setAttribute("style", "background-color:red");
                    sel.innerHTML = OpsiSiswa(koleksitokensiswa[c], "PG_" + (d + 1))[2]
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
    let xxx = `${idtabel}, ${namafile},${judul1}`;

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
    let koleksitokensiswa = jsondatasiswa.map(k => k.id)

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
                    sell.innerHTML = nilaiKDSiswa(koleksitokensiswa[z], banyakkd[j]);// banyakkd[j] + "nama = " + koleksinamasiswa[z];

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

    //------------------
    //let cobatabel = tabeledit;// document.getElementById("myTableCopy");
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
    sel.innerHTML = judul;;

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
    //console.log(rowcount)
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
        sel.innerHTML = idJenisGuru + " " + idNamaKelas
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
        sel.innerHTML = idJenisGuru + " " + idNamaKelas


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
        preserveColors: true
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
    sel.innerHTML = judul;;

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
    //console.log(rowcount)
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
        sel.innerHTML = idJenisGuru + " " + idNamaKelas
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
        sel.innerHTML = idJenisGuru + " " + idNamaKelas


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek

        sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date())




        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)


    }


    //------------------------------------
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
    var teksjudul = document.createTextNode("E-DURASA")
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
    var guruapa = idJenisGuru + " " + ruangankelas;//document.getElementById("tblguru").innerHTML+" "+document.frmlogin.kelasguru.value;
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
    var teksjudul = document.createTextNode("E-DURASA")
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
    var guruapa = idJenisGuru + " " + ruangankelas;//document.getElementById("tblguru").innerHTML+" "+document.frmlogin.kelasguru.value;
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
                opsipg += "<ol style='list-style-type:upper-alpha;margin:5px 5px 0px 20px;padding:0' ><li><input class='calc' type='radio' name='soal" + nosoal + "' id='" + idopsi + "'/><label class='opsi' for='" + idopsi + "'>"; // Khusus opsi A, ada elemen OL lalu dilanjut teksnya
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
                opsipg += "<ol style='list-style-type:upper-alpha;margin:5px 5px 0px 20px;padding:0' ><li><input class='calc' type='radio' name='soal" + nosoal + "' id='" + idopsi + "'/><label class='opsi' for='" + idopsi + "'>"; // Khusus opsi A, ada elemen OL lalu dilanjut teksnya
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
    //console.log(data);
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
            var id = splitteks[0].replace(/\s+/g, ""); //4A

            var abjad = (id.length == 2) ? id.slice(1, 2) : id.slice(2, 3); //B
            var nosoal = id.match(/(\d+)/)[0];// id.slice(0, 1); //nosoal 4
            var innteks = "<input class='calc' type='radio' name='soal" + nosoal + "' id='" + id + "'/><label class='opsi' for='" + id + "'>" + abjad + "</label>"

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
    judul.innerHTML = "Identitas E-DURASA";
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
        // document.getElementById("judulpetunjuk").innerHTML = "Preview E-DURASA";
        //        document.getElementById("isipetunjuk").innerHTML = brkline(json);
        //   document.querySelector(".kontenmateri").innerHTML += brkline(json);
        let vV = versi == ""? brkline2(json).teks:brkline(json).teks
        tes.innerHTML += vV;//brkline(json).teks;
        // console.log(xx)
        // let inhtml = " KD belum dideteksi "; 
         let inhtml = "<table class='versi-table w3-tiny'><tr><td>Mapel</td><td>KD</td><td>No Soal</td></tr>";
        let Sx = brkline(json).kd;//.replace("<br>","");
         let xx = Sx.split("<br>");
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


        // var elEssay = document.getElementsByClassName("soalessay")
        // if (elEssay.length !== 0) {
        //     for (i = 0; i < elEssay.length; i++) {
        //         var idEl = elEssay[i].getAttribute("id");
        //         var inidEl = idEl.replace("essay", "");
        //         var tempattombol = document.getElementById("tomboljawaban" + inidEl);
        //         var tombolsatu = document.createElement("button");
        //         tombolsatu.setAttribute("onclick", "tombolketikjawaban('" + inidEl + "')");
        //         var tekstombolsatu = document.createTextNode("Ketik Jawaban No " + inidEl);
        //         tombolsatu.appendChild(tekstombolsatu);
        //         tempattombol.appendChild(tombolsatu);
        //         tempattombol.innerHTML += "<br/><sub>atau</sub></br/> "
        //         var tomboldua = document.createElement("button");
        //         tomboldua.setAttribute("onclick", "tomboluploadjawaban('" + inidEl + "')");
        //         var tekstomboldua = document.createTextNode("Upload Media No " + inidEl);
        //         tomboldua.appendChild(tekstomboldua);
        //         tempattombol.appendChild(tomboldua);
        //         tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>"

        //     }
        // }

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
    let cek = nilairespon.filter(k => k.tokensiswa == parNama);
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

    let cek = nilairespon.filter(k => k.tokensiswa == parnama)[indek];
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
    // document.getElementById("nilaiEssayku").innerHTML = nilaiakhir;
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

//////////////////////////////// source RAPORT SEMESTER
/*
alurnya bagaimana?
- cek semua data niai PH, PTS, dan PAK/PAS
- cek semua data ceklis kd
- buat array nama mapel, kode mapel yang berlaku
*/

let tabolahnilai = document.querySelector(".tabolahnilai");
let tabeldatakd = document.getElementById("datadatakdraport");

let tabpetunjukraport = document.querySelector(".tabpetunjukraport")

let divolahnilai = document.getElementById("olahnilai");
let divdasarhukum = document.getElementById("petunjukraport");

tabolahnilai.addEventListener("click", function () {

    isikanrentang()

    //let tes = koleksiarraymapelaktif();
    // console.log(tes);
})

tabpetunjukraport.addEventListener("click", function () {

    ;
})

const koleksiarraymapelaktiflama = () => {
    let restult = [];
    let min = 100;
    let tabel = document.getElementById("datadatakdraport").rows.length;
    for (i = 1; i < tabel; i++) {
        let isi = document.getElementById("datadatakdraport").rows[i].cells[1].textContent;
        let angka = document.getElementById("angkakkm_" + isi).innerHTML;
        let inMin = (isi == "") ? 0 : parseInt(angka);
        if (min >= inMin) {
            min = inMin
        }
        restult.push(isi)
    }
    let data = {}
    data.kodemapel = restult;
    data.kkmmin = min;

    return data
}
const koleksiarraymapelaktif = () => {
    let restult = [];
    let arraymapel = [];
    let objKodemapel = {"ISLAM":"PAI","KATHOLIK":"PKATO","KRISTEN": "PKRIS","HINDU":"PHIND","BUDHA":"PBUDH","KONGHUCU":"PKONG"};
    restult = jsondatasiswa.filter(f => f.pd_agama !=="").map(s => s.pd_agama).filter((x,i,a)=> a.indexOf(x)==i).map(m => objKodemapel[m]);
    restult.push("PKN")
    restult.push("BINDO")
    restult.push("MTK")
    if(idJenjang > 3){
        restult.push("IPA")
        restult.push("IPS")
    }
    restult.push("SBDP")
    restult.push("PJOK")
    restult.push("BSUND")
    let min = 100;
    let tabel = buateditorkdaktif;//.filter();//document.getElementById("datadatakdraport").rows.length;
    for (i = 1; i < tabel.length; i++) {
        let isi = tabel[i].mapel;//document.getElementById("datadatakdraport").rows[i].cells[1].textContent;
        let angka = tabel[i].kkm;//document.getElementById("angkakkm_" + isi).innerHTML;
        let inMin = (isi == "") ? 0 : parseInt(angka);
        if (min >= inMin) {
            min = inMin
        }
        // if(restult.indexOf(isi)==-1){
        //     restult.push(isi)
        // }
    }
    let data = {}
    data.kodemapel = restult;
    data.kkmmin = min;
    data.source = buateditorkdaktif;

    return data
}

const accordiontab = (evt, cityName) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("accordkonten");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("accordbutton");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" activee", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " activee";

    if(evt.currentTarget.innerHTML == "Surat Keterangan Hasil Belajar (SKHU) VERSI TANPA NILAI"){
        let domselect = document.getElementById("idselectnamaskhu2");
        let html = ""
        for(i = 0 ; i < jsondatasiswa.length; i++){
            html +=`<option value="${i}">${jsondatasiswa[i].pd_nama}</option>`;
        }
        domselect.innerHTML = html;
    }
}

const simulasinilai = () => {
    let nsimulasi = document.querySelector(".inputsimulasi").value;
    if (nsimulasi > 100) {
        alert('Batas nilai hanya sampai 100');
        document.querySelector(".inputsimulasi").value = 0;
        return;

    }
    let data = fn_predikatkriteria(nsimulasi);
    document.querySelector(".resultsimulasi").innerHTML = data;
    //console.log(data)


}

const fn_predikatkriteria = (x) => {

    let tabel = document.querySelector(".tabelkriteriadanrentangkkm");
    let nilai = parseFloat(x);
    let minA = parseInt(tabel.rows[1].cells[1].innerHTML);//maks A = 100
    let minB = parseInt(tabel.rows[2].cells[1].innerHTML);

    let minC = parseInt(tabel.rows[3].cells[1].innerHTML);

    let maxB = parseInt(tabel.rows[2].cells[2].innerHTML);
    let maxC = parseInt(tabel.rows[3].cells[2].innerHTML);
    let nD = parseInt(tabel.rows[4].cells[1].innerHTML);
    //console.log(nD);
    let result = ""
    if (nilai <= 100 && nilai > minA) {
        result = tabel.rows[1].cells[0].innerHTML;
    } else if (nilai > minB && nilai <= maxB) {
        result = tabel.rows[2].cells[0].innerHTML;
    } else if (nilai > minC && nilai <= maxC) {
        result = tabel.rows[3].cells[0].innerHTML;
    } else if (nilai <= nD) {
        result = tabel.rows[4].cells[0].innerHTML;
    } else {
        result = "Kriteria Tidak dikenal"
    }
    return result

}

const isikanrentang = () => {
    let kkmnya = koleksiarraymapelaktif().kkmmin;
    console.log(kkmnya)
    let n_d ;
    if(document.querySelector(".kkmsatuanpendidikan").textContent == ""){
        n_d = kkmnya
    }else{
        n_d = parseInt(document.querySelector(".kkmsatuanpendidikan").textContent);

    }
    document.querySelectorAll(".a_kkm").forEach(k => k.innerHTML = n_d);
    let n_rentang = Math.round((100 - n_d) / 3);
    document.querySelector("#a_rentangkkm").innerHTML = n_rentang;
    let tabel = document.querySelector(".tabelkriteriadanrentangkkm");
    let minAmaxB = 100 - parseFloat(n_rentang);
    let minBmaxC = minAmaxB - parseFloat(n_rentang);

    tabel.rows[1].cells[1].innerHTML = minAmaxB;
    tabel.rows[2].cells[2].innerHTML = minAmaxB;
    tabel.rows[2].cells[1].innerHTML = minBmaxC;
    tabel.rows[3].cells[2].innerHTML = minBmaxC;

}

// Tab tab Accordion:
let tabacrdk1 = document.querySelector(".tabacrdk1");
tabacrdk1.addEventListener("click", function () {
    let div = document.getElementById("tabeldatanilaiki1");
    let datanama = jsondatasiswa.map(k => k.pd_nama);

    let tekshtmlserver = `Indikator (Deskripsi) Raport (silakan edit/tambah sesuai kebutuhan) Lihat dokumen Panduan Penilaian Halaman 21 atau dokumen 1 di sekolah Anda.
     <table class="w3-table-all garis add_indikatorindikatork1">
    <thead>
    <tr>
        <th>
            Indikator Raport Keterampilan Spritual (KI-1)
        </th>
        <th>
            Sikap
        </th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td contenteditable="true">berdoa sebelum belajar</td>
        <td contenteditable="true">Ketaatan Beribadah</td>
    </tr>
    <tr>
        <td contenteditable="true">meyakini kebesaran Allah</td>
        <td contenteditable="true">Ketaatan Beribadah</td>
    </tr>
    <tr>
        <td contenteditable="true">memberi salam pada setiap awal dan akhir kegiatan</td>
        <td contenteditable="true">ketaatan Beribadah</td>
    </tr>
    <tr>
        <td contenteditable="true">bersyukur atas nikmat dan karunia Tuhan Yang Maha Esa</td>
        <td contenteditable="true">Berperilaku syukur</td>
    </tr>
    <tr>
        <td contenteditable="true">mensyukuri kemampuan manusia dalam mengendalikan diri</td>
        <td contenteditable="true">Berperilaku Syukur</td>
    </tr>
    <tr>
        <td contenteditable="true">bersyukur ketika berhasil mengerjakan sesuatu</td>
        <td contenteditable="true">Berperilaku Syukur</td>
    </tr>
    <tr>
        <td contenteditable="true">berserah diri (tawakal) kepada Tuhan setelah berikhtiar atau melakukan usaha</td>
        <td contenteditable="true">Berperilaku Syukur</td>
    </tr>
    <tr>
        <td contenteditable="true">memelihara hubungan baik dengan sesama umat</td>
        <td contenteditable="true">Toleransi dalam beribadah</td>
    </tr>
    <tr>
        <td contenteditable="true">menghormati orang lain yang menjalankan ibadah sesuai dengan agamanya</td>
        <td contenteditable="true">Toleransi dalam beribadah</td>
    </tr>
    <tr>
        <td contenteditable="true">...</td>
        <td contenteditable="true">...</td>
    </tr>
    <tr>
        <td contenteditable="true">...</td>
        <td contenteditable="true">...</td>
    </tr>
    </tbody>
    </table>
    
    <h4>Rekapitulasi Jurnal Sikap Spritual (KI-1)</h4>
    Silakan lengkapi Rekapitulasi Jurnal Spiritual pada tabel di bawah ini:<hr/>
    <button class="w3-button w3-red w3-round-large w3-margin" onclick="exportk12('classtabelk1')"><i class="fa fa-file-excel-o"></i> Export Ms. Excel</button>
    <button class="w3-button w3-green w3-round-large w3-margin" onclick="importk12('classtabelk1')"><i class="fa fa-file-excel-o"></i> import Ms. Excel</button>
    <button class="w3-button w3-khaki simpanLSK1 w3-round-large w3-margin" onclick="saveLSK1()">Simpan di Server</button>
    <table class='w3-table-all garis classtabelk1'>
    <thead>
        <tr>
            <th>No</th>
            <th  style="position:sticky;position:-webkit-sticky;left:0px;">Nama Siswa</th>
            <th>Predikat Nilai</th>
            <th>Indikator Maksimal</th>
            <th>Indikator Minimal</th>
            <th>Aksi</th>
        </tr>
    </thead><tbody>
    `;
    let tekshtml = `Indikator (Deskripsi) Raport (silakan edit/tambah sesuai kebutuhan) Lihat dokumen Panduan Penilaian Halaman 21 atau dokumen 1 di sekolah Anda.
   <table class="w3-table-all garis add_indikatorindikatork1">
    <thead>
    <tr>
        <th>
            Indikator Raport Keterampilan Spritual (KI-1)
        </th>
        <th>
            Sikap
        </th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td contenteditable="true">berdoa sebelum belajar</td>
        <td contenteditable="true">Ketaatan Beribadah</td>
    </tr>
    <tr>
        <td contenteditable="true">meyakini kebesaran Allah</td>
        <td contenteditable="true">Ketaatan Beribadah</td>
    </tr>
    <tr>
        <td contenteditable="true">memberi salam pada setiap awal dan akhir kegiatan</td>
        <td contenteditable="true">ketaatan Beribadah</td>
    </tr>
    <tr>
        <td contenteditable="true">bersyukur atas nikmat dan karunia Tuhan Yang Maha Esa</td>
        <td contenteditable="true">Berperilaku syukur</td>
    </tr>
    <tr>
        <td contenteditable="true">mensyukuri kemampuan manusia dalam mengendalikan diri</td>
        <td contenteditable="true">Berperilaku Syukur</td>
    </tr>
    <tr>
        <td contenteditable="true">bersyukur ketika berhasil mengerjakan sesuatu</td>
        <td contenteditable="true">Berperilaku Syukur</td>
    </tr>
    <tr>
        <td contenteditable="true">berserah diri (tawakal) kepada Tuhan setelah berikhtiar atau melakukan usaha</td>
        <td contenteditable="true">Berperilaku Syukur</td>
    </tr>
    <tr>
        <td contenteditable="true">memelihara hubungan baik dengan sesama umat</td>
        <td contenteditable="true">Toleransi dalam beribadah</td>
    </tr>
    <tr>
        <td contenteditable="true">menghormati orang lain yang menjalankan ibadah sesuai dengan agamanya</td>
        <td contenteditable="true">Toleransi dalam beribadah</td>
    </tr>
    <tr>
        <td contenteditable="true">...</td>
        <td contenteditable="true">...</td>
    </tr>
    <tr>
        <td contenteditable="true">...</td>
        <td contenteditable="true">...</td>
    </tr>
    </tbody>
    </table>
    
    <h4>Rekapitulasi Jurnal Sikap Spritual (KI-1)</h4>
    Silakan lengkapi Rekapitulasi Jurnal Spiritual pada tabel di bawah ini:<hr/>
    <button class="w3-button w3-red w3-round-large w3-margin" onclick="exportk12('classtabelk1')"><i class="fa fa-file-excel-o"></i> Export Ms. Excel</button>
    <button class="w3-button w3-green w3-round-large w3-margin" onclick="importk12('classtabelk1')"><i class="fa fa-file-excel-o"></i> import Ms. Excel</button>
    <button class="w3-button w3-khaki simpanLSK1 w3-round-large w3-margin" onclick="saveLSK1()">Simpan di Server</button>
    <table class='versi-table classtabelk1'>
    <thead>
        <tr>
            <th>No</th>
            <th  style="position:sticky;position:-webkit-sticky;left:0px;">Nama Siswa</th>
            <th>Predikat Nilai</th>
            <th>Indikator Maksimal</th>
            <th>Indikator Minimal</th>
            <th>Aksi</th>
        </tr>
    </thead><tbody>
    `;
    for (i = 0; i < datanama.length; i++) {
        tekshtml += `<tr>
            <td>${i + 1}</td>
            <td   style="position:sticky;position:-webkit-sticky;left:0px;">${datanama[i]}</td>
            <td></td>
            <td></td>
            <td></td>
            <td><button title="Tambahkan indikator" onclick="modtambahindikator('k1',${i})">+</button>
            
            <button title="Hapus indikator ini" onclick="hapusindikator('k1',${i})"><i class="fa fa-trash"></i></button></td>

        </tr>`;

    }
    tekshtml += `</tbody></table><hr/>
    
    <hr/>
   `;


    // div.innerHTML = tekshtml;
    div.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Sedang mengambil data di Server. Mohon tunggu ....";

    let tab = "rekapjurnalk1";

    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {

            if (k.result == 0) {
                alert("Anda belum pernah membuat data Rekapitulasi Jurnal Kompetensi Spiritual (KI-1)");
                div.innerHTML = tekshtml;
            } else {
                //div.innerHTML = tekshtmlserver;
                for (j = 0; j < k.data.length; j++) {
                    tekshtmlserver += `<tr>
                    <td>${k.data[j]["nourut"]}</td>
                    <td   style="position:sticky;position:-webkit-sticky;left:0px;">${k.data[j]["namasiswa"]}</td>
                    <td>${k.data[j]["nilaipredikat"]}</td>
                    <td>${k.data[j]["indikmaks"]}</td>
                    <td>${k.data[j]["indikmin"]}</td>
                    <td><button title="Tambahkan indikator" onclick="modtambahindikator('k1',${j})">+</button>
                    
            <button title="Hapus indikator ini" onclick="hapusindikator('k1',${j})"><i class="fa fa-trash"></i></button></td>
        
                </tr>`;
                }
                tekshtmlserver += `</tbody></table><hr/>
                
                <hr/>
               `;
                div.innerHTML = tekshtmlserver
            }
        })
        .catch(er => console.log(er))

});
const hapusindikator = (kompetensi, ii) => {
    let tabelkki = document.querySelector(".classtabel" + kompetensi);
    //hapus kriteria maks
    let i = ii + 1;
    tabelkki.rows[i].cells[2].innerHTML = "";
    tabelkki.rows[i].cells[3].innerHTML = "";
    tabelkki.rows[i].cells[4].innerHTML = "";

}

const modtambahindikator = (kompetensi, ii) => {
    let i = ii + 1;
    // console.log(i)
    let dataindikator = [];
    let tabel = document.querySelector(".add_indikatorindikator" + kompetensi);
    let tabelkki = document.querySelector(".classtabel" + kompetensi);
    let namasiswa = tabelkki.rows[i].cells[1].innerHTML;
    let judulmodal = document.querySelector(".judul_addindikatorkompetensi");
    let divuntuktabel = document.querySelector(".tabel_indikatorindikatorraport");
    let simulasinama = document.getElementById("simulasinama");
    let tabelsimulasi = document.querySelector(".simulasiraportkki");
    tabelsimulasi.rows[1].cells[0].innerHTML = "";
    tabelsimulasi.rows[1].cells[1].innerHTML = "";
    let juduljudul = (kompetensi == "k1") ? "Kompetensi Spiritual (KI-1)" : "Kompetensi Sosial (KI-2)";
    judulmodal.innerHTML = "Tambahkan Indikator " + juduljudul + "<br>untuk Ananda ";
    simulasinama.innerHTML = namasiswa;



    let lr = tabel.rows;
    for (r = 1; r < lr.length; r++) {
        let perbaris = lr[r];
        let isi = []
        // for (s = 0; s < perbaris.cells.length; s++) {
        let d = perbaris.cells[0].innerHTML;

        //------------ butir
        isi.push(d);

        dataindikator.push(isi)
    }

    //alert(i);
    let predikat = fn_datapredikat();


    document.getElementById("add_tambahindikatorkomepentsi").style.display = "block";
    let htmlteks = `
    <select class="w3-select w3-border w3-border-teal w3-centered" id="selectindikatorkompetensi" >
    `;
    let datapredikatada = tabelkki.rows[i].cells[2].innerHTML;
    for (s = 0; s < 4; s++) {
        if (datapredikatada !== "") {
            if (predikat[s] == datapredikatada) {
                htmlteks += `<option selected value="${predikat[s]}">${predikat[s]}</option>`;

            } else {

                htmlteks += `<option value="${predikat[s]}">${predikat[s]}</option>`;
            }
        } else {
            htmlteks += `<option value="${predikat[s]}">${predikat[s]}</option>`;

        }
    }

    htmlteks += `</select>`;
    divuntuktabel.innerHTML = htmlteks;
    //berittahu kalo sudah diisi di sel yang bersangkutan ada, maka tinggal tambahkan selected
    //let select = document.getElementById("selectindikatorkompetensi");
    //console.log(datapredikatada);
    // if (datapredikatada !== "") {
    //     select.value = datapredikatada;
    // }
    //
    let htmltabel = `<table class="w3-table-all garis kliktabelindikator w3-tiny">
    <tr>
        <th>Index</th>
        <th>Indikator</th>
        <th>Tambahkan Indikator Maksimal</th>
        <th>Tambahkan Indikator Minimal</th>
    </tr>
   `;
    let arrayindikmax = tabelkki.rows[i].cells[3].innerHTML.replace(/\s+/gi, "").split(",");
    // console.log(arrayindikmax)
    let arrayindikmin = tabelkki.rows[i].cells[4].innerHTML.replace(/\s+/gi, "").split(",");;
    //console.log(arrayindikmin)

    for (j = 0; j < dataindikator.length; j++) {
        let tombolmak = (arrayindikmax.indexOf(j.toString()) > -1) ? "sudah ditambahkan" : `<button onclick="kdmaks('${kompetensi}',${i},${j})">+</button>`;
        let tombolmin = (arrayindikmin.indexOf(j.toString()) > -1) ? "sudah ditambahkan" : `<button onclick="kdmin('${kompetensi}',${i},${j})">+</button>`;

        htmltabel += `<tr>
            <td>${j}
            <td>${dataindikator[j]}</td>
            <td class="w3-center">${tombolmak}</td>
            <td class="w3-center">${tombolmin}</td>
       </tr>`;
    }
    htmltabel += `</table>`;
    divuntuktabel.innerHTML += `<hr/>${htmltabel}`;
    document.getElementById("simulasikanpredikat").setAttribute("onclick", `simulasikanpredikat('${kompetensi}',${i})`);
    document.getElementById("tombol_addindikatorkompetensi").setAttribute("onclick", `simpanindikatorkki('${kompetensi}',${i})`);


}

const fn_datapredikat = () => {
    let tabelpredikat = document.querySelector(".tabelkriteriadanrentangkkm");
    let arr = [];
    let lr = tabelpredikat.rows;
    for (r = 1; r < lr.length; r++) {
        let perbaris = lr[r];
        let isi = []
        // for (s = 0; s < perbaris.cells.length; s++) {
        let d = perbaris.cells[0].innerHTML;

        //---------
        arr.push(d)
    }
    return arr

}

const simulasikanpredikat = (kompetensi, r) => {
    let tabel = document.querySelector(".simulasiraportkki");
    let tabeldatakki = document.querySelector(".classtabel" + kompetensi);
    let tabeldeskripsi = document.querySelector(".kliktabelindikator");

    let namasiswa = tabeldatakki.rows[r].cells[1].innerHTML;
    let arrayindikmax = tabeldatakki.rows[r].cells[3].innerHTML.replace(/\s+/gi, "").split(",");
    let arrayindikmin = tabeldatakki.rows[r].cells[4].innerHTML.replace(/\s+/gi, "").split(",");;

    //let select = document.getElementById("selectindikatorkompetensi");
    // select.value = datapredikatada;
    let opsi = document.getElementById("selectindikatorkompetensi").options;
    let indek = document.getElementById("selectindikatorkompetensi").selectedIndex;

    tabel.rows[1].cells[0].innerHTML = opsi[indek].value;

    let teksall = `<b class="w3-text-blue">Ananda</b> ${namasiswa} `;
    let teksmaks = `<b class="w3-text-blue">selalu</b> `;
    let teksmin = `<b class="w3-text-blue">mulai tampak dalam</b> `;
    for (a = 0; a < arrayindikmax.length; a++) {
        teksmaks += tabeldeskripsi.rows[parseInt(arrayindikmax[a]) + 1].cells[1].innerHTML + ", ";
    }
    for (b = 0; b < arrayindikmin.length; b++) {
        teksmin += tabeldeskripsi.rows[parseInt(arrayindikmin[b]) + 1].cells[1].innerHTML + ", ";
    }
    teksall += teksmaks + teksmin;
    tabel.rows[1].cells[1].innerHTML = teksall;

}

const kdmaks = (kompetensi, id, indek) => {
    let i = parseInt(id);
    let indekx = indek + 1;
    let tabel = document.querySelector(".classtabel" + kompetensi);
    let tabelmodal = document.querySelector(".kliktabelindikator");
    let indikmax = tabel.rows[i].cells[3].innerHTML;
    let teksmaks = ""
    if (indikmax == "") {
        teksmaks = indek;
    } else {
        teksmaks += indikmax + ", " + indek;
    }


    tabel.rows[i].cells[3].innerHTML = teksmaks;

    tabelmodal.rows[indekx].cells[2].innerHTML = "sudah ditambahkan";// <button onclick(";
    // tabelmodal.rows[indekx].cells[2].innerHTML = `Sudah ditambakan <button onclick="hapuskdmaks('${kompetensi}',${id},${index})"><i class="fa fa-trash"></i></button>`;

}


const kdmin = (kompetensi, id, indek) => {
    let i = parseInt(id);
    let indekx = indek + 1;
    let tabel = document.querySelector(".classtabel" + kompetensi);
    let tabelmodal = document.querySelector(".kliktabelindikator");
    let indikmin = tabel.rows[i].cells[4].innerHTML;
    let teksmaks = ""
    if (indikmin == "") {
        teksmaks = indek;
    } else {
        teksmaks += indikmin + ", " + indek;
    }

    tabel.rows[i].cells[4].innerHTML = teksmaks;


    tabelmodal.rows[indekx].cells[3].innerHTML = "sudah ditambahkan";


}

const simpanindikatorkki = (kompetensi, i) => {
    let tabel = document.querySelector(".classtabel" + kompetensi);
    let opsi = document.getElementById("selectindikatorkompetensi").options;
    let indek = document.getElementById("selectindikatorkompetensi").selectedIndex;
    let modal = document.getElementById("add_tambahindikatorkomepentsi");

    tabel.rows[parseInt(i)].cells[2].innerHTML = opsi[indek].value;
    modal.style.display = "none";


}
let tabackriteria = document.querySelector(".tabacrdkriteria");
tabackriteria.addEventListener("click", function () {
    isikanrentang()
})

let tabacrdk2 = document.querySelector(".tabacrdk2");
tabacrdk2.addEventListener("click", function () {
    let div = document.getElementById("tabeldatanilaiki2");
    let datanama = jsondatasiswa.map(k => k.pd_nama);
    let tekshtmlserver = `Indikator (Deskripsi) Raport (silakan edit/tambah sesuai kebutuhan) Lihat dokumen Panduan Penilaian Halaman 23 atau dokumen 1 di sekolah Anda.
    <table class="w3-table-all garis add_indikatorindikatork2">
    <thead>
    <tr>
        <th>
            Indikator Raport Keterampilan Spritual (KI-2)
        </th>
        <th>
            Sikap
        </th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td contenteditable="true">tidak pernah berbohong, tidak mencontek, dan sikap jujur lainnya</td>
        <td contenteditable="true">Jujur</td>
    </tr>
    <tr>
        <td contenteditable="true">mengikuti peraturan dan tata tertib sekolah</td>
        <td contenteditable="true">Disiplin</td>
    </tr>
    <tr>
        <td contenteditable="true">mengerjakan tugas/PR tepat waktu</td>
        <td contenteditable="true">Disiplin</td>
    </tr>
    <tr>
        <td contenteditable="true">menyelesaikan piket, mengerjakan tugas/PR</td>
        <td contenteditable="true">Tanggung Jawab</td>
    </tr>
    <tr>
        <td contenteditable="true">mengakui kesalahan, tidak menyalahkan orang lain</td>
        <td contenteditable="true">Tanggung Jawab</td>
    </tr>
    <tr>
        <td contenteditable="true">menghomati orang lain dan menghormati cara bicara dengan tepat</td>
        <td contenteditable="true">Santun</td>
    </tr>
    <tr>
        <td contenteditable="true">ramah, ceria, bersahabat, dan selalu tersenyum</td>
        <td contenteditable="true">Santun</td>
    </tr>
    <tr>
        <td contenteditable="true">ikut berperan serta dan aktif dalam kegiatan sosial di lingkungan sekitar</td>
        <td contenteditable="true">Peduli</td>
    </tr>
    <tr>
        <td contenteditable="true">menunjukkan rasa peduli terhadap teman yang lain</td>
        <td contenteditable="true">Peduli</td>
    </tr>
    <tr>
        <td contenteditable="true">...</td>
        <td contenteditable="true">...</td>
    </tr>
    <tr>
        <td contenteditable="true">...</td>
        <td contenteditable="true">...</td>
    </tr>
    </tbody>
    </table>
    
    <h4>Rekapitulasi Jurnal Sikap Sosial (KI-2)</h4>
    Silakan lengkapi Rekapitulasi Jurnal Sosial pada tabel di bawah ini:<hr/>
    <button class="w3-button w3-red w3-round-large w3-margin" onclick="exportk12('classtabelk2')"><i class="fa fa-file-excel-o"></i> Export Ms. Excel</button>
    <button class="w3-button w3-green w3-round-large w3-margin" onclick="importk12('classtabelk2')"><i class="fa fa-file-excel-o"></i> import Ms. Excel</button>
    <button class="w3-button w3-orange w3-round-large w3-margin" onclick="saveLSK2()">Simpan di Server</button>
    <table class='versi-table classtabelk2'>
    <thead>
        <tr>
            <th>No</th>
            <th style="position:sticky;position:-webkit-sticky;left:0px;">Nama Siswa</th>
            <th>Predikat Nilai</th>
            <th>Indikator Maksimal</th>
            <th>Indikator Minimal</th>
            <th>Aksi</th>
        </tr>
    </thead><tbody>
    `;
    let tekshtml = `Indikator (Deskripsi) Raport (silakan edit/tambah sesuai kebutuhan) Lihat dokumen Panduan Penilaian Halaman 23 atau dokumen 1 di sekolah Anda.
    <table class="w3-table-all garis add_indikatorindikatork2">
    <thead>
    <tr>
        <th>
            Indikator Raport Keterampilan Spritual (KI-2)
        </th>
        <th>
            Sikap
        </th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td contenteditable="true">tidak pernah berbohong, tidak mencontek, dan sikap jujur lainnya</td>
        <td contenteditable="true">Jujur</td>
    </tr>
    <tr>
        <td contenteditable="true">mengikuti peraturan dan tata tertib sekolah</td>
        <td contenteditable="true">Disiplin</td>
    </tr>
    <tr>
        <td contenteditable="true">mengerjakan tugas/PR tepat waktu</td>
        <td contenteditable="true">Disiplin</td>
    </tr>
    <tr>
        <td contenteditable="true">menyelesaikan piket, mengerjakan tugas/PR</td>
        <td contenteditable="true">Tanggung Jawab</td>
    </tr>
    <tr>
        <td contenteditable="true">mengakui kesalahan, tidak menyalahkan orang lain</td>
        <td contenteditable="true">Tanggung Jawab</td>
    </tr>
    <tr>
        <td contenteditable="true">menghomati orang lain dan menghormati cara bicara dengan tepat</td>
        <td contenteditable="true">Santun</td>
    </tr>
    <tr>
        <td contenteditable="true">ramah, ceria, bersahabat, dan selalu tersenyum</td>
        <td contenteditable="true">Santun</td>
    </tr>
    <tr>
        <td contenteditable="true">ikut berperan serta dan aktif dalam kegiatan sosial di lingkungan sekitar</td>
        <td contenteditable="true">Peduli</td>
    </tr>
    <tr>
        <td contenteditable="true">menunjukkan rasa peduli terhadap teman yang lain</td>
        <td contenteditable="true">Peduli</td>
    </tr>
    <tr>
        <td contenteditable="true">...</td>
        <td contenteditable="true">...</td>
    </tr>
    <tr>
        <td contenteditable="true">...</td>
        <td contenteditable="true">...</td>
    </tr>
    </tbody>
    </table>
    
    <h4>Rekapitulasi Jurnal Sikap Sosial (KI-2)</h4>
    Silakan lengkapi Rekapitulasi Jurnal Sosial pada tabel di bawah ini:<hr/>
    <button class="w3-button w3-red w3-round-large w3-margin" onclick="exportk12('classtabelk2')"><i class="fa fa-file-excel-o"></i> Export Ms. Excel</button>
    <button class="w3-button w3-green w3-round-large w3-margin" onclick="importk12('classtabelk2')"><i class="fa fa-file-excel-o"></i> import Ms. Excel</button>
    <button class="w3-button w3-khaki simpanLSK2 w3-round-large w3-margin" onclick="saveLSK2()">Simpan di Server</button>
    <table class='versi-table classtabelk2'>
    <thead>
        <tr>
            <th>No</th>
            <th style="position:sticky;position:-webkit-sticky;left:0px;">Nama Siswa</th>
            <th>Predikat Nilai</th>
            <th>Indikator Maksimal</th>
            <th>Indikator Minimal</th>
            <th>Aksi</th>
        </tr>
    </thead><tbody>
    `;
    for (i = 0; i < datanama.length; i++) {
        tekshtml += `<tr>
            <td>${i + 1}</td>
            <td  style="position:sticky;position:-webkit-sticky;left:0px;">${datanama[i]}</td>
            <td></td>
            <td></td>
            <td></td>
            <td><button title="Tambahkan indikator" onclick="modtambahindikator('k2',${i})">+</button>
            <button title="Hapus indikator ini" onclick="hapusindikator('k2',${i})"><i class="fa fa-trash"></i></button></td>

        </tr>`;
    }
    tekshtml += `</tbody></table><hr/>
    
    <hr/>
   
    `;
    div.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Sedang mengambil data di Server. Mohon tunggu ....";

    let tab = "rekapjurnalk2";

    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {
            if (k.result == 0) {
                alert("Anda belum pernah membuat data Rekapitulasi Jurnal Kompetensi Sosial (KI-2)");
                div.innerHTML = tekshtml;
            } else {
                //div.innerHTML = tekshtmlserver;
                for (j = 0; j < k.data.length; j++) {
                    tekshtmlserver += `<tr>
                    <td>${k.data[j]["nourut"]}</td>
                    <td   style="position:sticky;position:-webkit-sticky;left:0px;">${k.data[j]["namasiswa"]}</td>
                    <td>${k.data[j]["nilaipredikat"]}</td>
                    <td>${k.data[j]["indikmaks"]}</td>
                    <td>${k.data[j]["indikmin"]}</td>
                    <td><button title="Tambahkan indikator" onclick="modtambahindikator('k2',${j})">+</button>
                    <button title="Hapus indikator ini" onclick="hapusindikator('k2',${j})"><i class="fa fa-trash"></i></button></td>
        
                </tr>`;
                }
                tekshtmlserver += `</tbody></table><hr/>
                
                <hr/>
               `;
                div.innerHTML = tekshtmlserver
            }
        })
        .catch(er => console.log(er))


});

const saveLSK1 = () => {
    let tb = document.querySelector(".classtabelk1");
    //let tombol = document.querySelectorAll(".simpanLSK1");
    //tombol.forEach(el => el.innerHTML = "<i class='fa fa-spinner fa-spin'></i> proses kirim")
    let lr = tb.rows;
    let all = []
    for (r = 1; r < lr.length; r++) {
        let perbaris = lr[r];
        let isi = []
        for (s = 0; s < perbaris.cells.length - 1; s++) {

            let d = perbaris.cells[s].innerHTML;

            isi.push(d);

        }
        all.push(isi)
    }

    let headt = ["nourut", "namasiswa", "nilaipredikat", "indikmaks", "indikmin"];

    let tab = "rekapjurnalk1";
    let tabel = JSON.stringify(all);
    let head = JSON.stringify(headt);

    let data = new FormData();
    data.append("tabel", tabel);
    data.append("head", head);
    data.append("kelas", idNamaKelas);
    data.append("prefiktab", tab);
    fetch(constlinknilai + "?action=inserttabeltospreadsheet", {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
            // tombol.innerHTML = "Simpan di Server";
            // tombol.forEach(el => el.innerHTML = "Simpan di Server")
        })
        .catch(er => alert(er))

}
const saveLSK2 = () => {
    let tb = document.querySelector(".classtabelk2");
    //let tombol = document.querySelector(".simpanLSK2");
    //tombol.innerHTML = "<i class='fa fa-spin fa-spinner'></i> proses kirim"
    let lr = tb.rows;
    let all = []
    for (r = 1; r < lr.length; r++) {
        let perbaris = lr[r];
        let isi = []
        for (s = 0; s < perbaris.cells.length - 1; s++) {

            let d = perbaris.cells[s].innerHTML;

            isi.push(d);

        }
        all.push(isi)
    }

    let headt = ["nourut", "namasiswa", "nilaipredikat", "indikmaks", "indikmin"];

    let tab = "rekapjurnalk2";
    let tabel = JSON.stringify(all);
    let head = JSON.stringify(headt);

    let data = new FormData();
    data.append("tabel", tabel);
    data.append("head", head);
    data.append("kelas", idNamaKelas);
    data.append("prefiktab", tab);
    fetch(constlinknilai + "?action=inserttabeltospreadsheet", {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
            //      tombol.innerHTML = "Simpan di Server"
        })
        .catch(er => alert(er))

}

let tabpts = document.querySelector(".tabraportpts");
tabpts.addEventListener("click", function () {
    let div = document.querySelector(".h3raportpts");
    div.innerHTML = "<i class='fa fa-spin fa-spinner'><i>";
    let htmlopsi = "<option value='' selected>Silakan Pilih Nama Siswa Anda</option>";
    for (i = 0; i < jsondatasiswa.length; i++) {
        htmlopsi += `<option value="${i}" id='opsisiswapts_${i}'>${jsondatasiswa[i].pd_nama}</option>`
    }
    namasiswaraportpts.innerHTML = htmlopsi;

    fetch(constlinknilai + "?action=lihatnilairekap&tab=PTS&kelas=" + idNamaKelas)
        .then(m => m.json())
        .then(r => {
            dataapipts = r;
            div.innerHTML = "Raport PTS (Raport Bayangan)"
            //  console.log(r)
        })
    // let datakkm = koleksiarraymapelaktif();
    // document.querySelector(".kkmsatuanpendidikan").innerHTML = datakkm.kkmmin;
    // document.querySelectorAll(".a_kkm").forEach(k => k.innerHTML = datakkm.kkmmin);
    // document.getElementById("a_rentangkkm").innerHTML = Math.round((100 - datakkm.kkmmin) / 3);
});

let tabacrdk3 = document.querySelector(".tabacrdk3");
let dataapiph = {};
let dataapipaspak = {};
tabacrdk3.addEventListener("click", async function () {
    let dataph = Object.keys(dataapiph);
    let datapts = Object.keys(dataapipts);
    let datapaspak = Object.keys(dataapipaspak);
    let tesrekappaspak = document.querySelector(".teksrekappaspak");
    tesrekappaspak.innerHTML = (idSemester == 2) ? "Rekap PAK" : "Rekap PAS";
    let paspak = (idSemester == 2) ? "PAK" : "PAS";
    let statusPH = document.querySelector(".statusdataPH");
    let statusPTS = document.querySelector(".statusdataPTS");
    let statusPAS = document.querySelector(".statusdataPASPAK");

    // let datakkm = koleksiarraymapelaktif();
    // console.log(datakkm);


    if (dataph.length == 0) {
        await fetch(constlinknilai + "?action=lihatnilairekap&tab=PH&kelas=" + idNamaKelas)
            .then(m => m.json())
            .then(r => {
                dataapiph = r;
                let adakd = r.banyakkd.length;
                if (adakd == 4) {
                    statusPH.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data)</b>`;

                } else {
                    statusPH.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
                }

            })

    } else {
        let adakd = dataapiph.banyakkd.length;
        if (adakd == 4) {
            statusPH.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data)</b>`;

        } else {
            statusPH.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
        }

    }

    if (datapts.length == 0) {
        await fetch(constlinknilai + "?action=lihatnilairekap&tab=PTS&kelas=" + idNamaKelas)
            .then(m => m.json())
            .then(r => {
                dataapipts = r;
                let adakd = r.banyakkd.length;
                if (adakd == 4) {
                    statusPTS.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data)</b> `;

                } else {

                    statusPTS.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
                }

            })

    } else {
        let adakd = dataapipts.banyakkd.length;
        if (adakd == 4) {
            statusPTS.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data)</b> `;

        } else {

            statusPTS.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
        }
        //statusPTS.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`
    }


    if (datapaspak.length == 0) {
        await fetch(constlinknilai + "?action=lihatnilairekap&tab=" + paspak + "&kelas=" + idNamaKelas)
            .then(m => m.json())
            .then(r => {
                dataapipaspak = r;
                let adakd = r.banyakkd.length;
                if (adakd == 4) {
                    statusPAS.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data)</b>`;

                } else {

                    statusPAS.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
                }



            })

    } else {
        let adakd = dataapipaspak.banyakkd.length;
        if (adakd == 4) {
            statusPAS.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data)</b>`;

        } else {

            statusPAS.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
        }

        //statusPAS.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
        // console.log(datapaspak.length)
    }

    koleksicekliskd();

})



const koleksicekliskd = () => {
    let datakkm = koleksiarraymapelaktif();
    let datamapel = datakkm.kodemapel;
    let td = document.querySelector(".resultkdyangdicek");
    let tes = tabelkearray();
    let paspak = (idSemester == 2) ? "PAK" : "PAS";

    let KD3 = {}
    let tekshtml = "<table class='w3-table garis w3-tiny'><tr><th>Mapel</th><th>KD diceklis</th><th>KD PH</th><th>KD PTS</th><th>KD PAK</th></tr>";
    for (i = 0; i < datamapel.length; i++) {
        let arrKD3 = tes.filter(k => k[6] == true && k[0] == datamapel[i]);
        let arrPH = dataapiph.banyakkd.filter(k => k.indexOf(datamapel[i]) > -1).map(k => k.split("_")[4]).filter((a, b, c) => c.indexOf(a) == b).sort();
        let arrPTS = dataapipts.banyakkd.filter(k => k.indexOf(datamapel[i]) > -1).map(k => k.split("_")[4]).filter((a, b, c) => c.indexOf(a) == b).sort();
        let arrPAS = dataapipaspak.banyakkd.filter(k => k.indexOf(datamapel[i]) > -1).map(k => k.split("_")[4]).filter((a, b, c) => c.indexOf(a) == b).sort();
        let kd = arrKD3.map(l => l[1])
        KD3[datamapel[i]] = kd;
        tekshtml += `<tr><td>${datamapel[i]}
        </td>
        <td>${kd.join(", ")}</td>
        <td>
            ${arrPH.join(", ")}
        </td>
        
        <td>
            ${arrPTS.join(", ")}
        </td>
        <td>
            ${arrPAS.join(", ")}
        </td>
        
        </tr>
        `;
        // console.log(arrKD3)
        //console.log(kd)
        KD3[datamapel[i]] = kd;


    }

    //console.log(KD3)
    // console.log(KD3["PKN"].length)
    tekshtml += `</table> 
    <ul class="w3-tiny">
    <li><span class="w3-text-blue">KD PH, KD PTS, KD PAS/PAK</span> adalah KD yang didapat dari tagihan penilaian yang telah Anda laksanakan
    </li><li>Yang akan dijadikan KD pada Deskripsi Raport adalah <span class="w3-text-blue">KD diceklis</span>
    </li><li><span class="w3-text-blue">KD diceklis</span> diatur di menu Kurkulum pada Tab Kompetensi Dasar. 
    </li><li>Ceklislah KD yang memuat minimal di <span class="w3-text-blue">KD PH</span> dan <span class="w3-text-blue">KD PAS/PAK</span> telah dilaksanakan (datanya telah Ada) dan minimal jumlah ceklis KD sebanyak 2 KD.
    </li>
    </ul>
    `
    td.innerHTML = tekshtml;//
    //
    let jumlahceklis = tes.filter(k => k[6] == true);
    let jumlahkolom = jumlahceklis * 3;
    //console.log(jumlahceklis.length);



    let divto = document.getElementById("menumenunilaikd3");
    divto.innerHTML = `
    Menu-menu Data KI-3:<br/>
    <button onclick="koleksicekliskd()" title="Tampilkan data Asli yang diperoleh siswa">Tampilkan Data Asli</button>
    <button onclick="getdataolahan()">Tampilkan Data Olahan</button>
    <button onclick="jadikansemuakkm()" title="jadikan nilai kosong atau di bawah KKM menjadi nilai KKM Mapel tersebut">KKM-kan ?</button>
    <button onclick="simpandatakd3()" title="Simpan hasil Olahan Data Nilai Anda tanpa menghilangkan data asli siswa" class="tombolsimpanserverkd3">Simpan Data Olah</button>
    <button onclick="printdatakd3()" title="Cetak halaman ini ke Printer">Print</button>
    <button onclick="exceldatakd3()" title="Export halaman ini dalam format Ms. Excel">Ms. Excel</button>
    <button onclick="importdataKeTable('datarekapkd3')" title="Import Data Nlai">Import Data dari File Export</button>
    <br/>

    Ini adalah nilai yang benar-benar diperoleh siswa tanpa Anda olah.<hr/>Rekapitulasi Data Nilai Kompetensi Pengetahuan (KI-3)`;


    let rekap = `
    <table class="versi-table w3-tiny datarekapkd3">
    <thead>
    <tr>
        <th rowspan="3">No.</th>
        <th style="position:sticky;position:-webkit-sticky;left:0px;" rowspan="3">Nama Siswa</th>
    
    <th colspan="${jumlahceklis.length}">Rekap Penilaian Harian (PH)</th>
    <th colspan="${jumlahceklis.length}">Rekap Penilaian Tengah Semester (PTS)</th>
    <th colspan="${jumlahceklis.length}">Rekap Penilaian ${paspak.toUpperCase()}</th>
        </tr><tr>
    `;



    // head PH
    for (a = 0; a < datamapel.length; a++) {
        let kolomkd = KD3[datamapel[a]].length;
        let id = "angkakkm_" + datamapel[a];
        let kkmnya = buateditorkdaktif.filter(s => s.mapel == datamapel[a])[0].kkm;//document.getElementById(id).innerHTML;
        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapPH" colspan="${kolomkd}"> ${datamapel[a]} (KKM = ${kkmnya})</th>`;
        }
    }
    // head PTS
    for (d = 0; d < datamapel.length; d++) {
        let kolomkd = KD3[datamapel[d]].length;
        let id = "angkakkm_" + datamapel[d];
        let kkmnya = buateditorkdaktif.filter(s => s.mapel == datamapel[d])[0].kkm;//document.getElementById(id).innerHTML;

        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapPTS w3-light-green" colspan="${kolomkd}">  ${datamapel[d]} (KKM = ${kkmnya})</th>`;
        }
    }
    // head PAS
    for (e = 0; e < datamapel.length; e++) {
        let kolomkd = KD3[datamapel[e]].length;
        let id = "angkakkm_" + datamapel[e];
        let kkmnya = buateditorkdaktif.filter(s => s.mapel == datamapel[e])[0].kkm;// document.getElementById(id).innerHTML;
        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapPAS w3-deep-orange"  colspan="${kolomkd}">${datamapel[e]} (KKM = ${kkmnya})</th>`;
        }
    }

    rekap += "</tr><tr>";

    for (b = 0; b < datamapel.length; b++) {
        let kolomkds = KD3[datamapel[b]].length
        if (kolomkds !== 0) {
            for (c = 0; c < kolomkds; c++) {
                rekap += `<th  class="tt_rekapPH" >${KD3[datamapel[b]][c]}</th>`
            }

        }
    }
    for (f = 0; f < datamapel.length; f++) {
        let kolomkds = KD3[datamapel[f]].length
        if (kolomkds !== 0) {
            for (g = 0; g < kolomkds; g++) {
                rekap += `<th  class="tt_rekapPTS w3-light-green" >${KD3[datamapel[f]][g]}</th>`
            }

        }
    }
    for (m = 0; m < datamapel.length; m++) {
        let kolomkds = KD3[datamapel[m]].length
        if (kolomkds !== 0) {
            for (n = 0; n < kolomkds; n++) {
                rekap += `<th  class="tt_rekapPAS w3-deep-orange" >${KD3[datamapel[m]][n]}</th>`
            }

        }
    }

    rekap += `</tr></thead><tbody>`;

    //isikan data siswa
    for (o = 0; o < jsondatasiswa.length; o++) {
        //console.log(o)
        rekap += `<tr>
        <td>${o + 1}</td>
        <td  style="position:sticky;position:-webkit-sticky;left:0px;">${jsondatasiswa[o].pd_nama}</td>`

        for (b = 0; b < datamapel.length; b++) {
            let kolomkds = KD3[datamapel[b]].length
            if (kolomkds !== 0) {
                for (c = 0; c < kolomkds; c++) {
                    //  console.log(KD3[datamapel[b]][c])
                    let nilaisementara = fungsirerataKD("PH", `${jsondatasiswa[o].id}`, `${datamapel[b]}`, `${KD3[datamapel[b]][c]}`);
                    // rekap += `<td  class="tt_rekapPH tt_KD3_${datamapel[b]}" style="visibility: visible;" contenteditable="true"> ${nilaisementara}</td>`;
                    rekap += `<td  class="tt_rekapPH tt_KD3_${datamapel[b]}"  contenteditable="true">${nilaisementara}</td>`;
                }

            }
        }
        for (f = 0; f < datamapel.length; f++) {
            let kolomkds = KD3[datamapel[f]].length
            if (kolomkds !== 0) {
                for (g = 0; g < kolomkds; g++) {
                    let nilaisementarapts = fungsirerataKD("PTS", `${jsondatasiswa[o].id}`, `${datamapel[f]}`, `${KD3[datamapel[f]][g]}`);
                    // rekap += `<td  class="tt_rekapPTS tt_KD3_${datamapel[f]}" style="visibility: hidden" contenteditable="true"></td>`;
                    rekap += `<td  class="tt_rekapPTS tt_KD3_${datamapel[f]}"  contenteditable="true">${nilaisementarapts}</td>`;
                }

            }
        }
        for (m = 0; m < datamapel.length; m++) {
            let kolomkds = KD3[datamapel[m]].length
            if (kolomkds !== 0) {
                for (n = 0; n < kolomkds; n++) {
                    let nilaisementarapaspak = fungsirerataKD("PASPAK", `${jsondatasiswa[o].id}`, `${datamapel[m]}`, `${KD3[datamapel[m]][n]}`);
                    //rekap += `<td  class="tt_rekapPAS  tt_KD3_${datamapel[m]}" style="visibility: hidden" contenteditable="true"></td>`;
                    rekap += `<td  class="tt_rekapPAS  tt_KD3_${datamapel[m]}" contenteditable="true">${nilaisementarapaspak}</td>`;
                }

            }
        }

        `</tr>`
    }
    document.getElementById("tabeldatanilaiki3").innerHTML = rekap;
    let wid = document.querySelector(".datarekapkd3").offsetWidth;
    let divscroll = document.getElementById("scrollatas");
    let isidivscroll = document.getElementById("isiscrollatas");
    let divolahnilai = document.getElementById("olahnilai");
    let ww = divolahnilai.offsetWidth;

    divscroll.setAttribute("style", `border: none 0px red;overflow-x: scroll;position:sticky;position:-webkit-sticky;top:25px;`)

    isidivscroll.setAttribute("style", `width:${wid}px;height:20px`)

}


let togel = document.querySelector(".togglekesiapandata");
togel.addEventListener("click", function () {
    let x = document.querySelector(".datatoggle");
    if (x.style.display === "none") {
        x.style.display = "block";
        togel.innerHTML = "<i class='fa fa-eye-slash'></i> Tutup";
    } else {
        x.style.display = "none";
        togel.innerHTML = "<i class='fa fa-eye'></i> Sumber Data";
    }
})

const fungsirerataKD = (t, tokennya, mapel, kd) => {
    let doo = {};
    if (t == "PH") {
        doo = dataapiph.records.filter(k => k.tokensiswa == tokennya)[0];
    } else if (t == "PTS") {
        doo = dataapipts.records.filter(k => k.tokensiswa == tokennya)[0];

    } else if (t == "PASPAK") {
        doo = dataapipaspak.records.filter(k => k.tokensiswa == tokennya)[0];

    }

    let inNilai = 0;
    let akhirnilai;
    if (doo === undefined) {
        // console.log(doo)
        akhirnilai = ""
    } else {
        let datakd = Object.keys(doo).filter(j => j.indexOf(mapel + "_" + kd) > -1);
        //console.log(datakd.length)
        for (i = 0; i < datakd.length; i++) {
            let nilai = (doo[datakd[i]] == "") ? 0 : doo[datakd[i]];
            // console.log(nilai)
            inNilai += parseInt(nilai);
        }

        if (datakd.length !== 0) {
            // akhirnilai = (inNilai / datakd.length).toFixed(2);
            akhirnilai = Math.round((inNilai / datakd.length));

        } else {
            akhirnilai = "";
        }
    }
    return akhirnilai

}


let tt_tabtabrekapph = document.querySelector(".tabtabrekapph");
let tt_tabtabrekappts = document.querySelector(".tabtabrekappts");
let tt_tabtabrekappas = document.querySelector(".tabtabrekappaspak");
tt_tabtabrekapph.addEventListener("click", function () {
    tt_tabtabrekapph.className += " activee";
    tt_tabtabrekappts.className = tt_tabtabrekappts.className.replace(/activee/g, "");
    tt_tabtabrekappas.className = tt_tabtabrekappas.className.replace(/activee/g, "");

    let classph = document.querySelectorAll(".tt_rekapPH");
    if (classph[0] == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("tabeldatanilaiki3");
    let tabel = document.querySelector(".datarekapkd3");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph[0].offsetLeft;
    div.scrollLeft = 0;// (x - y);

})

tt_tabtabrekappts.addEventListener("click", function () {
    tt_tabtabrekappts.className += " activee";
    tt_tabtabrekapph.className = tt_tabtabrekapph.className.replace(/activee/g, "");
    tt_tabtabrekappas.className = tt_tabtabrekappas.className.replace(/activee/g, "");
    let classpts = document.querySelectorAll(".tt_rekapPTS");
    if (classpts[0] == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let x = classpts[0].offsetLeft;
    let div = document.getElementById("tabeldatanilaiki3");
    let tabel = document.querySelector(".datarekapkd3");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    div.scrollLeft = (x - y);

})

tt_tabtabrekappas.addEventListener("click", function () {
    tt_tabtabrekappas.className += " activee";
    tt_tabtabrekappts.className = tt_tabtabrekappts.className.replace(/activee/g, "")
    tt_tabtabrekapph.className = tt_tabtabrekapph.className.replace(/activee/g, "")
    let classpaspak = document.querySelectorAll(".tt_rekapPAS");
    if (classpaspak[0] == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let x = classpaspak[0].offsetLeft;
    let div = document.getElementById("tabeldatanilaiki3");

    let tabel = document.querySelector(".datarekapkd3");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    div.scrollLeft = (x - y);

})

const getdataolahan = () => {
    let divto = document.getElementById("menumenunilaikd3");
    divto.innerHTML = "Sedang proses mengambil data Pengolahan Nilai Anda di Server  <i class='fa fa-refresh fa-spin'></i>"
    let tes = tabelkearray();
    let paspak = (idSemester == 2) ? "PAK" : "PAS";
    let tabeldata = document.querySelector(".datarekapkd3").getElementsByTagName("tbody")[0];
    let ddph = tes.filter(k => k[6] == true).map(k => "PH_" + k[0] + "_" + k[1]);
    let ddpts = tes.filter(k => k[6] == true).map(k => "PTS_" + k[0] + "_" + k[1]);
    let ddpas = tes.filter(k => k[6] == true).map(k => paspak + "_" + k[0] + "_" + k[1]);
    let a = ddph.concat(ddpts);

    let dds = a.concat(ddpas);

    let tab = "rekapkd3";
    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {
            console.log(k);
            if (k.result == 0) {
                alert("Anda belum pernah menyimpan data pengolahan nilai.");
                divto.innerHTML = `
                Menu-menu Data KI-3:<br/>
                <button onclick="koleksicekliskd()" title="Tampilkan data Asli yang diperoleh siswa">Tampilkan Data Asli</button>
                <button onclick="getdataolahan()">Tampilkan Data Olahan</button>
                <button onclick="jadikansemuakkm()" title="jadikan nilai kosong atau di bawah KKM menjadi nilai KKM Mapel tersebut">KKM-kan ?</button>
                <button onclick="simpandatakd3()" title="Simpan hasil Olahan Data Nilai Anda tanpa menghilangkan data asli siswa" class="tombolsimpanserverkd3">Simpan Data Olah</button>
                <button onclick="printdatakd3()" title="Cetak halaman ini ke Printer">Print</button>
                <button onclick="exceldatakd3()" title="Export halaman ini dalam format Ms. Excel">Ms. Excel</button>
                <button onclick="importdataKeTable('datarekapkd3')" title="Import Data Nlai">Import Data dari File Export</button>
                <br/>Ini adalah nilai yang benar-benar diperoleh siswa tanpa Anda olah.<hr/>Rekapitulasi Data Nilai Kompetensi Pengetahuan (KI-3)`;

            } else {
                let ob = Object.keys(k.data[0]).filter(k => !(k === "no" || k === "nama"));
                
                let key = Object.keys(k.data[0]);
                let obb = JSON.stringify(ob);
                let ddx = JSON.stringify(dds);
                if (obb === ddx) {
                    //alert("sama headnya")
                    let lr = tabeldata.rows;

                    for (r = 0; r < lr.length; r++) {
                        let perbaris = lr[r];
                        for (s = 0; s < perbaris.cells.length; s++) {
                            let d = k.data[r][key[s]];
                            perbaris.cells[s].innerHTML = d;
                        }
                    }
                    divto.innerHTML = `
                    Menu-menu Data KI-3:<br/>
                    <button onclick="koleksicekliskd()" title="Tampilkan data Asli yang diperoleh siswa">Tampilkan Data Asli</button>
                    <button onclick="getdataolahan()">Tampilkan Data Olahan</button>
                    <button onclick="jadikansemuakkm()" title="jadikan nilai kosong atau di bawah KKM menjadi nilai KKM Mapel tersebut">KKM-kan ?</button>
                    <button onclick="simpandatakd3()" title="Simpan hasil Olahan Data Nilai Anda tanpa menghilangkan data asli siswa" class="tombolsimpanserverkd3">Simpan Data Olah</button>
                    <button onclick="printdatakd3()" title="Cetak halaman ini ke Printer">Print</button>
                    <button onclick="exceldatakd3()" title="Export halaman ini dalam format Ms. Excel">Ms. Excel</button>
                    <button onclick="importdataKeTable('datarekapkd3')" title="Import Data Nlai">Import Data dari File Export</button>
                    <br/>

                    <span class="w3-text-red">Ini adalah nilai yang telah Anda Olah.</span><hr/>Rekapitulasi Data Nilai Kompetensi Pengetahuan (KI-3) <span class="w3-text-red">(Data Pengolahan Nilai)</span>`;


                } else {
                    let konf = confirm("Sebaran KD yang telah disimpan sebelumnya berbeda dengan sebaran KD saat ini. Sebaran KD sebelumnya mungkin saja tidak valid dengan dengan data sebaran KD saat ini. Anda sebaiknya membuat Data Pengolahan Nilai yang sesuai dengan sebaran KD saat ini sebab data yang akan dijadikan deskripsi raport adalah sebaran KD saat ini. Apakah Anda ingin tetap menampilkannya?\n\n Klik [OK] untuk menampilkan data, atau \n\n Klik [CANCEL] untuk membatalkan");
                    //console.log(k.data)

                    if (!konf) {
                        divto.innerHTML = `
    Menu-menu Data KI-3:<br/>
    <button onclick="koleksicekliskd()" title="Tampilkan data Asli yang diperoleh siswa">Tampilkan Data Asli</button>
    <button onclick="getdataolahan()">Tampilkan Data Olahan</button>
    <button onclick="jadikansemuakkm()" title="jadikan nilai kosong atau di bawah KKM menjadi nilai KKM Mapel tersebut">KKM-kan ?</button>
    <button onclick="simpandatakd3()" title="Simpan hasil Olahan Data Nilai Anda tanpa menghilangkan data asli siswa" class="tombolsimpanserverkd3">Simpan Data Olah</button>
    <button onclick="printdatakd3()" title="Cetak halaman ini ke Printer">Print</button>
    <button onclick="exceldatakd3()" title="Export halaman ini dalam format Ms. Excel">Ms. Excel</button>
    <button onclick="importdataKeTable('datarekapkd3')" title="Import Data Nlai">Import Data dari File Export</button>
    <br/>`

                        // Ini adalah nilai yang benar-benar diperoleh siswa tanpa Anda olah.<hr/>Rekapitulasi Data Nilai Kompetensi Pengetahuan (KI-3)`;

                        return
                    }
                    dataolahbeda(k.data);
                    divto.innerHTML = `
                    Menu-menu Data KI-3:<br/>
                    <button onclick="koleksicekliskd()" title="Tampilkan data Asli yang diperoleh siswa">Tampilkan Data Asli</button>
                    <button onclick="getdataolahan()">Tampilkan Data Olahan</button>
                    <button onclick="jadikansemuakkm()" title="jadikan nilai kosong atau di bawah KKM menjadi nilai KKM Mapel tersebut">KKM-kan ?</button>
                    <button onclick="simpandatakd3()" title="Simpan hasil Olahan Data Nilai Anda tanpa menghilangkan data asli siswa" class="tombolsimpanserverkd3">Simpan Data Olah</button>
                    <button onclick="printdatakd3()" title="Cetak halaman ini ke Printer">Print</button>
                    <button onclick="exceldatakd3()" title="Export halaman ini dalam format Ms. Excel">Ms. Excel</button>
                    <button onclick="importdataKeTable('datarekapkd3')" title="Import Data Nlai">Import Data dari File Export</button>
                    <br/>
                    
                    <span class="w3-text-red">Ini adalah nilai yang telah Anda Olah.</span><hr/>Rekapitulasi Data Nilai Kompetensi Pengetahuan (KI-3) <span class="w3-text-red">(Data Pengolahan Nilai ini berbeda dengan sebaran KD saat ini)</span><br/><br/>
                    Saran: Jika peringatan ini muncul, Anda sebaiknya membuat data pengolahan nilai baru lagi yang diambil dari data asli yang sesaui dengan sebaran KD saat ini kemudian simpan data pengolahan ke server.
                    `;

                }
                //console.log(obb);
            }


        })
        .catch(er => console.log(er))


}

const jadikansemuakkm = () => {
    let datakkm = koleksiarraymapelaktif();
    let datamapel = datakkm.kodemapel;
    let td = document.querySelector(".resultkdyangdicek");
    let tes = tabelkearray();
    let paspak = (idSemester == 2) ? "PAK" : "PAS";
    //permapel
    for (a = 0; a < datamapel.length; a++) {
        let selid = "tt_KD3_" + datamapel[a];
        let angkaid = "angkakkm_" + datamapel[a];
        let sel = document.querySelectorAll("." + selid);
        let angkakkm = buateditorkdaktif.filter(s => s.mapel == datamapel[a])[0].kkm;//document.getElementById(angkaid).innerHTML;
        sel.forEach(k => {
            if (k.innerHTML < parseInt(angkakkm)) {
                k.innerHTML = parseInt(angkakkm);
            }

        })
    }
}

var wrapperel1 = document.getElementById('scrollatas');
var wrapperel2 = document.getElementById('tabeldatanilaiki3');
wrapperel1.onscroll = function () {
    wrapperel2.scrollLeft = wrapperel1.scrollLeft;
};
wrapperel2.onscroll = function () {
    wrapperel1.scrollLeft = wrapperel2.scrollLeft;
};

const simpandatakd3 = () => {
    let konfirmasi = confirm("Anda yakin ingin menyimpan data ini ke server?. Data yang sebelumnya akan diganti dengan data tabel ini. Klik OK untuk menyimpan atau klik CANCEL untuk membatalkannya.");
    if (!konfirmasi) {
        alert("Anda membatalkan simpan");
        return;
    }
    let tes = tabelkearray();
    let paspak = (idSemester == 2) ? "PAK" : "PAS";
    let tabeldata = document.querySelector(".datarekapkd3").getElementsByTagName("tbody")[0];
    let ddph = tes.filter(k => k[6] == true).map(k => "PH_" + k[0] + "_" + k[1]);
    let ddpts = tes.filter(k => k[6] == true).map(k => "PTS_" + k[0] + "_" + k[1]);
    let ddpas = tes.filter(k => k[6] == true).map(k => paspak + "_" + k[0] + "_" + k[1]);
    let a = ddph.concat(ddpts);

    let dds = a.concat(ddpas);
    let abc = ["no", "nama"];
    let dd = abc.concat(dds);

    let btn = document.querySelector(".tombolsimpanserverkd3");
    btn.innerHTML = "Simpan Data Olah <i class='fa fa-spin fa-spinner'></i>";
    //console.log(dd)
    let lr = tabeldata.rows;
    let all = []
    for (r = 0; r < lr.length; r++) {
        let perbaris = lr[r];
        let isi = []
        for (s = 0; s < perbaris.cells.length; s++) {
            let d;
            d = perbaris.cells[s].innerHTML;
            isi.push(d);
        }
        all.push(isi)
    }


    // console.log(all);

    let tab = "rekapkd3";
    let tabel = JSON.stringify(all);
    let head = JSON.stringify(dd);

    let data = new FormData();
    data.append("tabel", tabel);
    data.append("head", head);
    data.append("kelas", idNamaKelas);
    data.append("prefiktab", tab);
    fetch(constlinknilai + "?action=inserttabeltospreadsheet", {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
            btn.innerHTML = "Simpan Data Olah";
            //tombol.innerHTML = "Simpan di Server"
        })
        .catch(er => alert(er))

}

const dataolahbeda = (arr) => {
    let dmapel = koleksiarraymapelaktif();
    let paspak = (idSemester == 2) ? "PAK" : "PAS";
    let datamapel = dmapel.kodemapel;
    let key = Object.keys(arr[0]);
    let keyid = key.filter(k => !(k === "no" || k === "nama"))
    // console.log(keyid);
    let cek = keyid.filter(j => j.indexOf("PH_") > -1)
    let ceka = keyid.filter(j => j.indexOf("PTS_") > -1)
    console.log(ceka)
    let cekb = keyid.filter(j => j.indexOf("PAK_") > -1)
    let countkey = (cek.length)
    let countkeya = (ceka.length)
    let countkeyb = (cekb.length)
    // console.log(cek.length);
    // console.log(ceka.length);
    // console.log(cekb.length);
    //et KD3 = arr;




    //console.log(cek);
    //console.log(keyid);

    // for(a = 0 ; a < datamapel ; a++){

    // }
    //console.log(countkey);

    let rekap = `
    <table class="versi-table w3-tiny datarekapkd3">
    <thead>
    <tr>
        <th rowspan="3">No.</th>
        <th style="position:sticky;position:-webkit-sticky;left:0px;" rowspan="3">Nama Siswa</th>

    <th colspan="${countkey}">Rekap Penilaian Harian (PH)</th>
    <th colspan="${countkeya}">Rekap Penilaian Tengah Semester (PTS)</th>
    <th colspan="${countkeyb}">Rekap Penilaian ${paspak.toUpperCase()}</th>
        </tr><tr>
    `;
    // head PH
    for (a = 0; a < datamapel.length; a++) {
        let kolomkd = keyid.filter(j => j.indexOf("PH_" + datamapel[a]) > -1);
        let id = "angkakkm_" + datamapel[a];
        let kkmnya = buateditorkdaktif.filter(s => s.mapel == datamapel[a][0]).kkm;// document.getElementById(id).innerHTML;
        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapPH" colspan="${kolomkd.length}"> ${datamapel[a]} (KKM = ${kkmnya})</th>`;
        }
    }
    // head PTS
    for (d = 0; d < datamapel.length; d++) {
        let kolomkd = keyid.filter(j => j.indexOf("PTS_" + datamapel[d]) > -1)
        let id = "angkakkm_" + datamapel[d];
        let kkmnya = buateditorkdaktif.filter(s => s.mapel == datamapel[d])[0].kkm;// document.getElementById(id).innerHTML;

        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapPTS w3-light-green" colspan="${kolomkd.length}">  ${datamapel[d]} (KKM = ${kkmnya})</th>`;
        }
    }
    // head PAS
    for (e = 0; e < datamapel.length; e++) {
        let kolomkd = keyid.filter(j => j.indexOf(paspak + "_" + datamapel[e]) > -1);
        let id = "angkakkm_" + datamapel[e];
        let kkmnya = buateditorkdaktif.filter(s => s.mapel == datamapel[e])[0].kkm;//document.getElementById(id).innerHTML;
        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapPAS w3-deep-orange"  colspan="${kolomkd.length}">${datamapel[e]} (KKM = ${kkmnya})</th>`;
        }
    }

    rekap += "</tr><tr>";

    for (b = 0; b < datamapel.length; b++) {
        let kolomkds = keyid.filter(j => j.indexOf("PH_" + datamapel[b]) > -1);
        //console.log(kolomkds);
        if (kolomkds !== 0) {
            for (c = 0; c < kolomkds.length; c++) {
                rekap += `<th  class="tt_rekapPH" >${kolomkds[c].split("_")[2]}</th>`

            }

        }
    }
    for (f = 0; f < datamapel.length; f++) {
        let kolomkds = keyid.filter(j => j.indexOf("PTS_" + datamapel[f]) > -1);
        if (kolomkds !== 0) {
            for (g = 0; g < kolomkds.length; g++) {
                rekap += `<th  class="tt_rekapPTS w3-light-green" >${kolomkds[g].split("_")[2]}</th>`
            }

        }
    }
    for (m = 0; m < datamapel.length; m++) {
        let kolomkds = keyid.filter(j => j.indexOf(paspak + "_" + datamapel[m]) > -1)
        if (kolomkds !== 0) {
            for (n = 0; n < kolomkds.length; n++) {
                rekap += `<th  class="tt_rekapPAS w3-deep-orange" >${kolomkds[n].split("_")[2]}</th>`
            }

        }
    }

    rekap += `</tr></thead><tbody>`;

    //isikan data siswa
    for (o = 0; o < jsondatasiswa.length; o++) {
        //console.log(o)
        rekap += `<tr>
            <td>${o + 1}</td>
            <td  style="position:sticky;position:-webkit-sticky;left:0px;">${jsondatasiswa[o].pd_nama}</td>`

        for (b = 0; b < datamapel.length; b++) {
            let xxx = keyid.filter(j => j.indexOf("PH_" + datamapel[b]) > -1);
            let kolomkds = xxx;
            if (kolomkds !== 0) {
                for (c = 0; c < kolomkds.length; c++) {
                    //  console.log(KD3[datamapel[b]][c])

                    let nilaisementara = arr[o][kolomkds[c]];
                    rekap += `<td  class="tt_rekapPH tt_KD3_${datamapel[b]}"  contenteditable="true">${nilaisementara}</td>`;
                }

            }
        }
        for (f = 0; f < datamapel.length; f++) {
            let xxx = keyid.filter(j => j.indexOf("PTS_" + datamapel[f]) > -1);
            let kolomkds = xxx;
            if (kolomkds !== 0) {
                for (g = 0; g < kolomkds.length; g++) {
                    let nilaisementarapts = arr[o][kolomkds[g]];
                    rekap += `<td  class="tt_rekapPTS tt_KD3_${datamapel[f]}"  contenteditable="true">${nilaisementarapts}</td>`;
                }

            }
        }
        for (m = 0; m < datamapel.length; m++) {
            let xxx = keyid.filter(j => j.indexOf(paspak + "_" + datamapel[m]) > -1);
            let kolomkds = xxx;
            if (kolomkds !== 0) {
                for (n = 0; n < kolomkds.length; n++) {
                    let nilaisementarapaspak = arr[o][kolomkds[n]];
                    rekap += `<td  class="tt_rekapPAS  tt_KD3_${datamapel[m]}" contenteditable="true">${nilaisementarapaspak}</td>`;
                }

            }
        }

        `</tr>`
    }
    document.getElementById("tabeldatanilaiki3").innerHTML = rekap;
    let wid = document.querySelector(".datarekapkd3").offsetWidth;
    let divscroll = document.getElementById("scrollatas");
    let isidivscroll = document.getElementById("isiscrollatas");
    let divolahnilai = document.getElementById("olahnilai");
    let ww = divolahnilai.offsetWidth;

    divscroll.setAttribute("style", `border: none 0px red;overflow-x: scroll;`)
    isidivscroll.setAttribute("style", `width:${wid}px;height:20px`)
}
const printdatakd3 = () => {
    let isibody = document.getElementById("tabeldatanilaiki3").innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-DURASA DATA REKAP NILAI KETERAMPILAN</title>`;
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
            size: A4 landscape;
            max-height:100%;
            max-width:100%;
            
            }
    }
    </style>`;

    body.innerHTML = `<h3 class="w3-center">Rekapitulasi Nilai Kompetensi Pengetahuan (KI-3)</h3`;
    body.innerHTML += `<h4 class="w3-center">Kelas ${idNamaKelas} Semester ${idSemester}</h4>`;
    body.innerHTML += `<h5 class="w3-center">Tahun Pelajaran ${idTeksTapel}</h5>`;
    body.innerHTML += `${isibody}`;
    body.innerHTML += '<div style="float:left;position:relative;margin-left:50px;text-align:center">Mengetahui,<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><br/><u><b>' + idNamaKepsek + '</b></u><br/>NIP. ' + idNipKepsek + '</div>';
    body.innerHTML += '<div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ', ' + tanggalfull(new Date()) + '<br/>' + idJenisGuru + '<br/><br/><br/><br/><br/><b><u>' + namauser + '</u></b><br/>NIP. ' + idNipGuruKelas + '</div>';



    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}

const exceldatakd3 = () => {
    let tabelsumber = document.querySelector(".datarekapkd3");
    let divto = document.getElementById("datasiswaprint");
    let headsumber = tabelsumber.getElementsByTagName("thead")[0];
    let bodysumber = tabelsumber.getElementsByTagName("tbody")[0];
    let jumlahkolom = bodysumber.rows[0].cells.length;

    let tekshtml = `<table class="versi-table w3-tiny" id="tablekeexcelekapkd3">
    <tr>
        <td colspan="${jumlahkolom}">Rekapitulasi Nilai Kompetensi Pengetahuan (KI-3)</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Kelas ${idNamaKelas} Semester ${idSemester}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Tahun Pelajaran ${idTeksTapel}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}"></td>
        
    <tr>
    ${headsumber.innerHTML.replace(/3\./g, "'3.")}
    ${bodysumber.innerHTML}
    <tr>
         
    <tr>`


    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Mengetahui, </td>
    <td></td>
    `;
    let sisakolom = jumlahkolom - 11;
    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${jlo.kota}, ${tanggalfull(new Date())}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Kepala ${idNamaSekolah} </td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${idJenisGuru} ${idNamaKelas}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>
    <tr></tr>
    <tr></tr>
    <tr></tr>
    `;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3"><b><u>${idNamaKepsek}</u></b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3"><b><u>${namauser}</u></b></td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">NIP. ${idNipKepsek}</b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">NIP. ${idNipGuruKelas}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `</table>`;
    divto.innerHTML = tekshtml
    $("#tablekeexcelekapkd3").table2excel({

        name: "Worksheet Name",
        filename: "Rekap Nilai KI 3 idfile " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 3,
        barisatas: 5

    });
    divto.innerHTML = "";

}

//Rapot
let tr_kesiapandata = document.querySelector(".tr_kesiapandata");
tr_kesiapandata.addEventListener("click", function () {
    //cek cek
    let dataki1 = document.querySelector(".classtabelk1");
    let dataki2 = document.querySelector(".classtabelk2");
    let dataki3 = document.querySelector(".datarekapkd3");
    let dataki4 = document.querySelector(".datarekapkd4");
    let dataki5 = document.querySelector(".tabeldataperkembangan");
    let divdata = document.querySelector("#b_data");
    let cekdataki3 = document.getElementById("menumenunilaikd3").innerHTML;
    let cekcek = (cekdataki3.indexOf("Data Pengolahan Nilai") > -1) ? "Sumber data dari Pengolahan Nilai" : "Sumber Data dari data Asli";
    let tekshtml = `<h3>Berikut kesiapan data untuk bisa menggenerate Buku Raport atau Buku Induk</h3>
    <table class="versi-table w3-small" style="margin:0 auto">
    <tr>
        <th>Data</th>
        <th>Keterangan</th>
    </tr>
    <tr>
        <td>Data KI-1</td>
        <td>${(dataki1 === null) ? "Tidak Ada" : "Ada"}</td>
    </tr>
    <tr>
        <td>Data KI-2</td>
        <td>${(dataki2 === null) ? "Tidak Ada" : "Ada"}</td>
    </tr>
     <tr>
        <td>Data KI-3</td>
        <td>${(dataki3 === null) ? "Tidak Ada" : "Ada (lihat <span class='w3-text-blue'>Rekap Raport KI-3</span> di laman ini)<br/>" + cekcek}
           
        </td>
    </tr>
     <tr>
        <td>Data KI-4</td>
        <td>${(dataki4 === null) ? "Tidak Ada" : "Ada "}
           
        </td>
    </tr>
     <tr>
        <td>Data Rekap Perkembangan dan Prestasi</td>
        <td>${(dataki5 === null) ? "Tidak Ada" : "Ada "}
           
        </td>
    </tr>
     <tr>
        <td>Rekapitulasi Absen</td>
        <td>Pastikan Anda sudah membuka tabel REKAP ABSEN dan sudah tergenerate data kehadirannya</td>
    </tr>
     <tr>
        <td>Titimangsa Raport</td>
        <td>Jika Anda tidak membuat agenda kalender pendidikan dengan keterangan "TITIMANGSA RAPORT SEMESTER 2" (tanpa tanda kutip) di KALDIK, maka titimangsa raport versi ini adalah 25 Juni 2021</td>
    </tr>
    </table>
    `;
    divdata.innerHTML = tekshtml;

})

let tr_halamannilai = document.querySelector(".tr_halamannilai");
tr_halamannilai.addEventListener("click", function () {
    let select = document.getElementById("listnamaraport");
    select.innerHTML = `<option selected>Pilih Nama Siswa</option>`;
    for (a = 0; a < jsondatasiswa.length; a++) {
        select.innerHTML += `<option value="${a}">${jsondatasiswa[a].pd_nama}</option>`;
    }

})

const pilihlistnamaraport = () => {
    // try {
        let el = document.getElementById("listnamaraport");
        let y = el.selectedIndex;
        let x = el.options;
        if (y == 0) {
            alert("Pilih nama siswa Anda")
            return
        };//

        //pastikan semua sudah dibuka:
        let dataki1 = document.querySelector(".classtabelk1");
        let dataki2 = document.querySelector(".classtabelk2");
        let dataki3 = document.querySelector(".datarekapkd3");
        let dataki4 = document.querySelector(".datarekapkd4");
        let dataki5 = document.querySelector(".tabeldataperkembangan");
        if (dataki1 === null || dataki2 === null || dataki3 === null || dataki4 === null || dataki5 === null) {
            alert("Pastikan Anda telah membuka setiap Rekapitulasi Nilai pada Tab Olah Nilai.")
            return
        }





        let yy = y - 1;
        //console.log(yy);
        let datarraport = algoritmakurtilas(yy);
        let nilairaport = datarraport.datarraport; //nforaport["datarraport"]
        let datarraportk4 = algoritmaketerampilan(yy);
        let nilairaportk4 = datarraportk4.datarraport;
        let datahadir = kehadiranraport(yy);
        //nforaport["datarraport"]
        // console.log(nilairaportk4);
        // let cekkris = nilairaport.filter(k => k.indexOf("kriteria_PKRIS") > -1)
        // console.log(cekkris);
        let infosiswa = jsondatasiswa[yy];
        //console.log(y);
        let dataspiritual = document.querySelector(".classtabelk1").getElementsByTagName("tbody")[0];
        //let deskripsispiritual = document.querySelector(".add_indikatorindikatork1").getElementsByTagName("tbody")[0];
        //predikat:
        let predikatki1 = dataspiritual.rows[yy].cells[2].innerHTML;
        //let arrki1maks = dataspiritual.rows[y].cells[3].innerHTML;//.split(", ");
        let deskripsikd1 = deskripsikd12("k1");



        let datasosial = document.querySelector(".classtabelk2").getElementsByTagName("tbody")[0];
        //let deskripsisosial = document.querySelector(".add_indikatorindikatork2").getElementsByTagName("tbody")[0];
        let predikatki2 = datasosial.rows[yy].cells[2].innerHTML;
        //let arrki2maks = datasosial.rows[y].cells[3].innerHTML;//.split(", ");
        let deskripsikd2 = deskripsikd12("k2");
        let datakkm = koleksiarraymapelaktif();
        let datamapel = datakkm.kodemapel;
        //console.log(datamapel);
        let mapelnonagama = datamapel.filter(k => !(k == "PAI" || k == "PKATO" || k == "PKRIS" || k == "PHIND" || k == "PBUDH" || k == "PKONG"));
        let mapelinti = datamapel.filter(k => !(k == "PAI" || k == "PKATO" || k == "PKRIS" || k == "PHIND" || k == "PBUDH" || k == "PKONG" || k == "BSUND" || k == "TIK"));
        //console.log(mapelnonagama);//
        let agamasiswa = "";
        let kkmmapel = 0;
        let n_agama = "";
        let kriteria_n_agama = "";
        let n_maks = "";
        let kriteria_n_maks = "";
        let n_min = "";
        let kriteria_n_min = "";
        let deskripsiagama = "";
        let inhtmldeskripsimaks;
        let inhtmldeskripsimin;

        //datanilai keterampilan
        let n_rapork4 = "";
        let kriteria_n_raportk4 = "";
        let n_maksk4 = "";
        let kriteria_n_maksk4 = ""
        let n_mink4 = "";
        let kriteria_n_mink4 = "";
        let deskripsi_raportk4 = "";
        let deskripsi_maksk4 = "";
        let deskripsik4_mink4 = "";
        let arraymapelall = {"PAI":"Pendidikan Agama Islam dan Budi Pekerti",
        "PKRIS":"Pendidikan Agama Kristen dan Budi Pekerti",
        "PKATO":"Pendidikan Agama Katholik dan Budi Pekerti",
        "PHIND":"Pendidikan Agama Hindu dan Budi Pekerti",
        "PBUDH":"Pendidikan Agama Budha dan Budi Pekerti",
        "PKONG":"Pendidikan Agama Konghucu dan Budi Pekerti",
        "PKN":"Pendidikan Kewarganegaraan",
        "BINDO":"Bahasa Indonesia",
        "MTK":"Matematika",
        "IPA":"Ilmu Pengetahuan Alam",
        "IPS":"Ilmu Pengetahuan Sosial",
        "PJOK":"Pendidikan Jasmani, Olahraga, dan kesehatan",
        "SBDP":"Seni Budaya dan Prakarya",
        "BSUND":"Bahasa dan Sastra Sunda",
        "TIK":"Mulok1"
        }
        let n_mapel, kriteria_n_mapel, indexmapel, indexmapelk4, deskripsikd3inti, namasubjek, kkmnya;
        if (infosiswa.pd_agama == "ISLAM" || infosiswa.pd_agama == "Islam") {
            kkmmapel = buateditorkdaktif.filter(s => s.mapel == "PAI")[0].kkm;//document.getElementById("angkakkm_PAI").innerHTML;
            agamasiswa = "PAI";
            n_agama = nilairaport[0]["raport_PAI"];

            kriteria_n_agama = nilairaport[0]["kriteria_PAI"];

            n_maks = nilairaport[0]["maks_PAI"];
            kriteria_n_maks = nilairaport[0]["kriteria_maks_PAI"];
            n_min = nilairaport[0]["min_PAI"];
            kriteria_n_min = nilairaport[0]["kriteria_min_PAI"];
            inhtmldeskripsimaks = buateditorkdaktif.filter(s=> s.mapel == "PAI" && s.kd3 == n_maks)[0].indikatorkd3;//document.getElementById("deskripsikd3_PAI_" + n_maks).innerHTML;
            inhtmldeskripsimin = buateditorkdaktif.filter(s=> s.mapel == "PAI" && s.kd3 == n_min)[0].indikatorkd3;//document.getElementById("deskripsikd3_PAI_" + n_min).innerHTML;

            deskripsiagama = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maks} dalam ${inhtmldeskripsimaks}, dan mulai ${kriteria_n_min} dalam ${inhtmldeskripsimin}`;
            n_rapork4 = nilairaportk4[0]["raportk4_PAI"];
            kriteria_n_raportk4 = nilairaportk4[0]["kriteriak4_PAI"];

            n_maksk4 = nilairaportk4[0]["maksk4_PAI"];
            kriteria_n_maksk4 = nilairaportk4[0]["kriteria_maksk4_PAI"];
            n_mink4 = nilairaportk4[0]["mink4_PAI"];
            kriteria_n_mink4 = nilairaportk4[0]["kriteria_mink4_PAI"];
            deskripsi_maksk4 = buateditorkdaktif.filter(s=> s.mapel == "PAI" && s.kd4 == n_maksk4)[0].indikatorkd4;//document.getElementById("deskripsikd4_PAI_" + n_maksk4).innerHTML;
            deskripsi_mink4 = buateditorkdaktif.filter(s=> s.mapel == "PAI" && s.kd4 == n_maksk4)[0].indikatorkd4;//document.getElementById("deskripsikd4_PAI_" + n_mink4).innerHTML;

            deskripsi_raportk4 = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maksk4} dalam ${deskripsi_maksk4}, dan mulai ${kriteria_n_mink4} dalam ${deskripsi_mink4}`;


        } else if (infosiswa.pd_agama == "KRISTEN" || infosiswa.pd_agama == "Kristen") {
            kkmmapel = buateditorkdaktif.filter(s => s.mapel == "PKRIS")[0].kkm;//document.getElementById("angkakkm_PKRIS").innerHTML;
            agamasiswa = "PKRIS";
            let indexagama = nilairaport.findIndex(x => x["kriteria_PKRIS"]);
            n_agama = nilairaport[indexagama]["raport_PKRIS"];

            kriteria_n_agama = nilairaport[indexagama]["kriteria_PKRIS"];
            n_maks = nilairaport[indexagama]["maks_PKRIS"];
            kriteria_n_maks = nilairaport[indexagama]["kriteria_maks_PKRIS"];
            n_min = nilairaport[indexagama]["min_PKRIS"];
            kriteria_n_min = nilairaport[indexagama]["kriteria_min_PKRIS"];
            inhtmldeskripsimaks = buateditorkdaktif.filter(s=> s.mapel == "PKRIS" && s.kd3 == n_maks)[0].indikatorkd3;//document.getElementById("deskripsikd3_PKRIS_" + n_maks).innerHTML;
            inhtmldeskripsimin = buateditorkdaktif.filter(s=> s.mapel == "PKRIS" && s.kd3 == n_min)[0].indikatorkd3;//document.getElementById("deskripsikd3_PKRIS_" + n_min).innerHTML;

            deskripsiagama = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maks} dalam ${inhtmldeskripsimaks}, dan mulai ${kriteria_n_min} dalam ${inhtmldeskripsimin}`;

            indexmapelk4 = nilairaportk4.findIndex(x => x["kriteriak4_PKRIS"]);
            n_rapork4 = nilairaportk4[indexmapelk4]["raportk4_PKRIS"];
            kriteria_n_raportk4 = nilairaportk4[indexmapelk4]["kriteriak4_PKRIS"];
            n_maksk4 = nilairaportk4[indexmapelk4]["maksk4_PKRIS"];
            kriteria_n_maksk4 = nilairaportk4[indexmapelk4]["kriteria_maksk4_PKRIS"];
            n_mink4 = nilairaportk4[indexmapelk4]["mink4_PKRIS"];
            kriteria_n_mink4 = nilairaportk4[indexmapelk4]["kriteria_mink4_PKRIS"];
            deskripsi_maksk4 = buateditorkdaktif.filter(s=> s.mapel == "PKRIS" && s.kd4 == n_maksk4)[0].indikatorkd4;//document.getElementById("deskripsikd4_PKRIS_" + n_maksk4).innerHTML;
            deskripsi_mink4 = buateditorkdaktif.filter(s=> s.mapel == "PKRIS" && s.kd4 == n_mink4)[0].indikatorkd4;//document.getElementById("deskripsikd4_PKRIS_" + n_mink4).innerHTML;

            deskripsi_raportk4 = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maksk4} dalam ${deskripsi_maksk4}, dan mulai ${kriteria_n_mink4} dalam ${deskripsi_mink4}`;




        } else if (infosiswa.pd_agama == "KATHOLIK" || infosiswa.pd_agama == "Katholik") {
            kkmmapel = buateditorkdaktif.filter(s => s.mapel == "PKATO")[0].kkm;//document.getElementById("angkakkm_PKATO").innerHTML;
            agamasiswa = "PKATO";

            let indexagama = nilairaport.findIndex(x => x["kriteria_PKATO"]);
            n_agama = nilairaport[indexagama]["raport_PKATO"];

            kriteria_n_agama = nilairaport[indexagama]["kriteria_PKATO"];
            n_maks = nilairaport[indexagama]["maks_PKATO"];
            kriteria_n_maks = nilairaport[indexagama]["kriteria_maks_PKATO"];
            n_min = nilairaport[indexagama]["min_PKATO"];
            kriteria_n_min = nilairaport[indexagama]["kriteria_min_PKATO"];
            inhtmldeskripsimaks = buateditorkdaktif.filter(s=> s.mapel == "PKATO" && s.kd3 == n_maks)[0].indikatorkd3;//document.getElementById("deskripsikd3_PKATO_" + n_maks).innerHTML;
            inhtmldeskripsimin = buateditorkdaktif.filter(s=> s.mapel == "PKATO" && s.kd3 == n_min)[0].indikatorkd3;//document.getElementById("deskripsikd3_PKATO_" + n_min).innerHTML;
            deskripsiagama = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maks} dalam ${inhtmldeskripsimaks}, dan mulai ${kriteria_n_min} dalam ${inhtmldeskripsimin}`;

            indexmapelk4 = nilairaportk4.findIndex(x => x["kriteriak4_PKATO"]);
            n_rapork4 = nilairaportk4[indexmapelk4]["raportk4_PKATO"];
            kriteria_n_raportk4 = nilairaportk4[indexmapelk4]["kriteriak4_PKATO"];
            n_maksk4 = nilairaportk4[indexmapelk4]["maksk4_PKATO"];
            kriteria_n_maksk4 = nilairaportk4[indexmapelk4]["kriteria_maksk4_PKATO"];
            n_mink4 = nilairaportk4[indexmapelk4]["mink4_PKATO"];
            kriteria_n_mink4 = nilairaportk4[indexmapelk4]["kriteria_mink4_PKATO"];
            deskripsi_maksk4 = buateditorkdaktif.filter(s=> s.mapel == "PKATO" && s.kd4 == n_maksk4)[0].indikatorkd4;//document.getElementById("deskripsikd4_PKATO_" + n_maksk4).innerHTML;
            deskripsi_mink4 = buateditorkdaktif.filter(s=> s.mapel == "PKATO" && s.kd4 == n_mink4)[0].indikatorkd4;//document.getElementById("deskripsikd4_PKATO_" + n_mink4).innerHTML;

            deskripsi_raportk4 = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maksk4} dalam ${deskripsi_maksk4}, dan mulai ${kriteria_n_mink4} dalam ${deskripsi_mink4}`;

        } else if (infosiswa.pd_agama == "HINDU" || infosiswa.pd_agama == "Hindu") {
            kkmmapel = buateditorkdaktif.filter(s => s.mapel == "PHIND")[0].kkm;//document.getElementById("angkakkm_PHIND").innerHTML;
            agamasiswa = "PHIND";

            let indexagama = nilairaport.findIndex(x => x["kriteria_PHIND"]);
            n_agama = nilairaport[indexagama]["raport_PHIND"];

            kriteria_n_agama = nilairaport[indexagama]["kriteria_PHIND"];
            n_maks = nilairaport[indexagama]["maks_PHIND"];
            kriteria_n_maks = nilairaport[indexagama]["kriteria_maks_PHIND"];
            n_min = nilairaport[indexagama]["min_PHIND"];
            kriteria_n_min = nilairaport[indexagama]["kriteria_min_PHIND"];
            inhtmldeskripsimaks = buateditorkdaktif.filter(s=> s.mapel == "PHIND" && s.kd3 == n_maks)[0].indikatorkd3;//document.getElementById("deskripsikd3_PHIND_" + n_maks).innerHTML;
            inhtmldeskripsimin = buateditorkdaktif.filter(s=> s.mapel == "PHIND" && s.kd3 == n_min)[0].indikatorkd3;//document.getElementById("deskripsikd3_PHIND_" + n_min).innerHTML;
            deskripsiagama = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maks} dalam ${inhtmldeskripsimaks}, dan mulai ${kriteria_n_min} dalam ${inhtmldeskripsimin}`;

            indexmapelk4 = nilairaportk4.findIndex(x => x["kriteriak4_PHIND"]);
            n_rapork4 = nilairaportk4[indexmapelk4]["raportk4_PHIND"];
            kriteria_n_raportk4 = nilairaportk4[indexmapelk4]["kriteriak4_PHIND"];
            n_maksk4 = nilairaportk4[indexmapelk4]["maksk4_PHIND"];
            kriteria_n_maksk4 = nilairaportk4[indexmapelk4]["kriteria_maksk4_PHIND"];
            n_mink4 = nilairaportk4[indexmapelk4]["mink4_PHIND"];
            kriteria_n_mink4 = nilairaportk4[indexmapelk4]["kriteria_mink4_PHIND"];
            deskripsi_maksk4 = buateditorkdaktif.filter(s=> s.mapel == "PHIND" && s.kd4 == n_maksk4)[0].indikatorkd4;//document.getElementById("deskripsikd4_PHIND_" + n_maksk4).innerHTML;
            deskripsi_mink4 = buateditorkdaktif.filter(s=> s.mapel == "PHIND" && s.kd4 == n_mink4)[0].indikatorkd4;//document.getElementById("deskripsikd4_PHIND_" + n_mink4).innerHTML;

            deskripsi_raportk4 = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maksk4} dalam ${deskripsi_maksk4}, dan mulai ${kriteria_n_mink4} dalam ${deskripsi_mink4}`;

        } else if (infosiswa.pd_agama == "BUDHA" || infosiswa.pd_agama == "Budha") {
            kkmmapel = buateditorkdaktif.filter(s => s.mapel == "PBUDH")[0].kkm;//document.getElementById("angkakkm_PBUDH").innerHTML;
            agamasiswa = "PBUDH";
            let indexagama = nilairaport.findIndex(x => x["kriteria_PBUDH"]);
            n_agama = nilairaport[indexagama]["raport_PBUDH"];

            kriteria_n_agama = nilairaport[indexagama]["kriteria_PBUDH"];
            n_maks = nilairaport[indexagama]["maks_PBUDH"];
            kriteria_n_maks = nilairaport[indexagama]["kriteria_maks_PBUDH"];
            n_min = nilairaport[indexagama]["min_PBUDH"];
            kriteria_n_min = nilairaport[indexagama]["kriteria_min_PBUDH"];
            inhtmldeskripsimaks = buateditorkdaktif.filter(s=> s.mapel == "PBUDH" && s.kd3 == n_maks)[0].indikatorkd3;//document.getElementById("deskripsikd3_PBUDH_" + n_maks).innerHTML;
            inhtmldeskripsimin = buateditorkdaktif.filter(s=> s.mapel == "PBUDH" && s.kd3 == n_min)[0].indikatorkd3;//document.getElementById("deskripsikd3_PBUDH_" + n_min).innerHTML;
            deskripsiagama = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maks} dalam ${inhtmldeskripsimaks}, dan mulai ${kriteria_n_min} dalam ${inhtmldeskripsimin}`;

            indexmapelk4 = nilairaportk4.findIndex(x => x["kriteriak4_PBUDH"]);
            n_rapork4 = nilairaportk4[indexmapelk4]["raportk4_PBUDH"];
            kriteria_n_raportk4 = nilairaportk4[indexmapelk4]["kriteriak4_PBUDH"];
            n_maksk4 = nilairaportk4[indexmapelk4]["maksk4_PBUDH"];
            kriteria_n_maksk4 = nilairaportk4[indexmapelk4]["kriteria_maksk4_PBUDH"];
            n_mink4 = nilairaportk4[indexmapelk4]["mink4_PBUDH"];
            kriteria_n_mink4 = nilairaportk4[indexmapelk4]["kriteria_mink4_PBUDH"];
            deskripsi_maksk4 = buateditorkdaktif.filter(s=> s.mapel == "PBUDH" && s.kd4 == n_maksk4)[0].indikatorkd4;//document.getElementById("deskripsikd4_PBUDH_" + n_maksk4).innerHTML;
            deskripsi_mink4 = buateditorkdaktif.filter(s=> s.mapel == "PBUDH" && s.kd3 == n_mink4)[0].indikatorkd4;//document.getElementById("deskripsikd4_PBUDH_" + n_mink4).innerHTML;

            deskripsi_raportk4 = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maksk4} dalam ${deskripsi_maksk4}, dan mulai ${kriteria_n_mink4} dalam ${deskripsi_mink4}`;


        } else if (infosiswa.pd_agama == "KONGHUCU" || infosiswa.pd_agama == "KHONGHUCU") {
            kkmmapel = buateditorkdaktif.filter(s => s.mapel == "PKONG")[0].kkm;//document.getElementById("angkakkm_PBUDH").innerHTML;
            agamasiswa = "PKONG";

            let indexagama = nilairaport.findIndex(x => x["kriteria_PKONG"]);
            n_agama = nilairaport[indexagama]["raport_PKONG"];

            kriteria_n_agama = nilairaport[indexagama]["kriteria_PKONG"];
            n_maks = nilairaport[indexagama]["maks_PKONG"];
            kriteria_n_maks = nilairaport[indexagama]["kriteria_maks_PKONG"];
            n_min = nilairaport[indexagama]["min_PKONG"];
            kriteria_n_min = nilairaport[indexagama]["kriteria_min_PKONG"];
            inhtmldeskripsimaks = buateditorkdaktif.filter(s=> s.mapel == "PKONG" && s.kd3 == n_maks)[0].indikatorkd3;//document.getElementById("deskripsikd3_PKONG_" + n_maks).innerHTML;
            inhtmldeskripsimin = buateditorkdaktif.filter(s=> s.mapel == "PKONG" && s.kd3 == n_min)[0].indikatorkd3;//document.getElementById("deskripsikd3_PKONG_" + n_min).innerHTML;
            deskripsiagama = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maks} dalam ${inhtmldeskripsimaks}, dan mulai ${kriteria_n_min} dalam ${inhtmldeskripsimin}`;


            indexmapelk4 = nilairaportk4.findIndex(x => x["kriteriak4_PKONG"]);
            n_rapork4 = nilairaportk4[indexmapelk4]["raportk4_PKONG"];
            kriteria_n_raportk4 = nilairaportk4[indexmapelk4]["kriteriak4_PKONG"];
            n_maksk4 = nilairaportk4[indexmapelk4]["maksk4_PKONG"];
            kriteria_n_maksk4 = nilairaportk4[indexmapelk4]["kriteria_maksk4_PKONG"];
            n_mink4 = nilairaportk4[indexmapelk4]["mink4_PKONG"];
            kriteria_n_mink4 = nilairaportk4[indexmapelk4]["kriteria_mink4_PKONG"];
            deskripsi_maksk4 = buateditorkdaktif.filter(s=> s.mapel == "PKONG" && s.kd4 == n_maksk4)[0].indikatorkd4;//document.getElementById("deskripsikd4_PKONG_" + n_maksk4).innerHTML;
            deskripsi_mink4 = buateditorkdaktif.filter(s=> s.mapel == "PKONG" && s.kd4 == n_mink4)[0].indikatorkd4;//document.getElementById("deskripsikd4_PKONG_" + n_mink4).innerHTML;

            deskripsi_raportk4 = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maksk4} dalam ${deskripsi_maksk4}, dan mulai ${kriteria_n_mink4} dalam ${deskripsi_mink4}`;

        } else {
            kkmmapel = "data Agama tidak terdeteksi, pastikan data siswa Anda sudah terisi dengan benar";
            deskripsiagama = "Agama Siswa tidak valid";
            n_agama = "Agama siswa tidak valid";
            kriteria_n_agama = "Agama siswa tidak valid";
        }

        //     "Raport_IPA" : 90,
        //     "kriteria_IPA": "Baik",
        //     "maks_IPA" : "3.1",
        //     "kriteria_maks_IPA": "Baik",
        //     "min_IPA" : "3.2"
        //     "kriteria_min_IPA": "Cukup",

        let divto = document.getElementById("halamanraport");
        let tekshtml = `<h4 class="w3-center">RAPORT DAN PROFIL PESERTA DIDIK</h4>
    <table style="width:100%" >
    <tr>
        <td>Nama</td>
        <td>:</td>
        <td>${x[y].text}</td>
        <td>Kelas</td>
        <td>:</td>
        <td>${idNamaKelas}</td>
    </tr>
    <tr>
        <td>No Induk</td>
        <td>:</td>
        <td>${infosiswa.nis}/${infosiswa.nisn}</td>
        <td>Semester</td>
        <td>:</td>
        <td>${idSemester}</td>
    </tr>
    <tr>
        <td>Nama Sekolah</td>
        <td>:</td>
        <td>${idNamaSekolah}</td>
        <td>Tahun Pelajaran</td>
        <td>:</td>
        <td>${idTeksTapel}</td>
    </tr>
    <tr>
        <td>Alamat Sekolah</td>
        <td>:</td>
        <td colspan="4">${document.getElementById("editalamatkopsurat").innerHTML}</td>
    </tr>
    </table>
    <br/>
    <b>A. Sikap</b><br/>
    1. Sikap Spiritual
    <table class="versi-table w3-centered w3-small">
    <tr>
        <th>Predikat</th>
        <th>Deskripsi</th>
    </tr>
    <tr>
    <td>${predikatki1}</td>
    <td>${deskripsikd1}</td>
    </tr>
    </table>
    <br/>
    2. Sikap Sosial
    <table class="versi-table  w3-centered w3-small">
    <tr>
        <th>Predikat</th>
        <th>Deskripsi</th>
    </tr>
    <tr>
    <td>${predikatki2}</td>
    <td>${deskripsikd2}</td>
    </tr>
    </table>
      <br/>
    <b>B. Pengetahuan dan Keterampilan</b>
    <table class="versi-table w3-centered w3-small">
    <thead>
        <tr>
            <th rowspan="2">NO</th>
            <th rowspan="2">MUATAN PELAJARAN</th>
            <th rowspan="2">KKM</th>
            <th colspan="3">PENGETAHUAN</th>
            <th colspan="3">KETERAMPILAN</th>
        </tr>
        <tr>
            <th>Nilai</th>
            <th>Predikat</th>
            <th style="width:30%">Deksripsi</th>
            <th>Nilai</th>
            <th>Predikat</th>
            <th style="width:30%">Deksripsi</th>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td colspan="9">A. MUATAN NASIONAL</td>
    </tr>
    <tr>
        <td rowspan="2">1</td>
        <td colspan="8"  class="w3-left-align">Pendidikan Agama dan Budi Pekerti</td>
    </tr>
    <tr>
        <td   class="w3-left-align">Pendidikan Agama ${titleCase(infosiswa.pd_agama)} dan Budi Pekerti </td>
        <td>${kkmmapel}</td>
        <td>${n_agama}</td>
        <td>${kriteria_n_agama}</td>
        <td class="w3-justify">${deskripsiagama}</td>
        <td>${n_rapork4}</td>
        <td>${kriteria_n_raportk4}</td>
        <td class="w3-justify">${deskripsi_raportk4}</td>
        
    </tr>`;

        for (i = 0; i < mapelinti.length; i++) {
            
            // let namasubjek = mapelinti[i];//document.getElementById("namamapelraport_" + mapelinti[i]).innerHTML;
            let namasubjek 
            let cekelemen = document.getElementById("namamapelraport_" + mapelinti[i]);
            
            if(cekelemen == null){
                namasubjek = arraymapelall[mapelinti[i]];
            }else{
                namasubjek = document.getElementById("namamapelraport_" + mapelinti[i]).innerHTML;
            }
            // = mapelinti[i];//document.getElementById("namamapelraport_" + mapelinti[i]).innerHTML;

            kkmnya = buateditorkdaktif.filter(s => s.mapel == mapelinti[i])[0].kkm;//document.getElementById("angkakkm_" + mapelinti[i]).innerHTML;

            indexmapel = nilairaport.findIndex(x => x["kriteria_" + mapelinti[i]]);
            indexmapelk4 = nilairaportk4.findIndex(x => x["kriteriak4_" + mapelinti[i]]);
            // console.log(indexmapelk4);
            n_mapel = nilairaport[indexmapel]["raport_" + mapelinti[i]];

            kriteria_n_mapel = nilairaport[indexmapel]["kriteria_" + mapelinti[i]];
            n_maks = nilairaport[indexmapel]["maks_" + mapelinti[i]];
            kriteria_n_maks = nilairaport[indexmapel]["kriteria_maks_" + mapelinti[i]];
            n_min = nilairaport[indexmapel]["min_" + mapelinti[i]];
            kriteria_n_min = nilairaport[indexmapel]["kriteria_min_" + mapelinti[i]];
            inhtmldeskripsimaks = buateditorkdaktif.filter(s=> s.mapel == mapelinti[i] && s.kd3 == n_maks)[0].indikatorkd3;//document.getElementById("deskripsikd3_" + mapelinti[i] + "_" + n_maks).innerHTML;
            inhtmldeskripsimin = buateditorkdaktif.filter(s=> s.mapel == mapelinti[i] && s.kd3 == n_min)[0].indikatorkd3;//document.getElementById("deskripsikd3_" + mapelinti[i] + "_" + n_min).innerHTML;
            deskripsikd3inti = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maks} dalam ${inhtmldeskripsimaks}, dan mulai ${kriteria_n_min} dalam ${inhtmldeskripsimin}`;

            // console.log(mapelinti[i]);
            n_rapork4 = nilairaportk4[indexmapelk4]["raportk4_" + mapelinti[i]];
            kriteria_n_raportk4 = nilairaportk4[indexmapelk4]["kriteriak4_" + mapelinti[i]];
            n_maksk4 = nilairaportk4[indexmapelk4]["maksk4_" + mapelinti[i]];
            kriteria_n_maksk4 = nilairaportk4[indexmapelk4]["kriteria_maksk4_" + mapelinti[i]];
            n_mink4 = nilairaportk4[indexmapelk4]["mink4_" + mapelinti[i]];
            kriteria_n_mink4 = nilairaportk4[indexmapelk4]["kriteria_mink4_" + mapelinti[i]];
            // console.log(n_maksk4)
            deskripsi_maksk4 = buateditorkdaktif.filter(s=> s.mapel == mapelinti[i] && s.kd4 == n_maksk4)[0].indikatorkd4;//document.getElementById("deskripsikd4_" + mapelinti[i] + "_" + n_maksk4).innerHTML;
            deskripsi_mink4 = buateditorkdaktif.filter(s=> s.mapel == mapelinti[i] && s.kd4 == n_mink4)[0].indikatorkd4;//document.getElementById("deskripsikd4_" + mapelinti[i] + "_" + n_mink4).innerHTML;

            deskripsi_raportk4 = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maksk4} dalam ${deskripsi_maksk4}, dan mulai ${kriteria_n_mink4} dalam ${deskripsi_mink4}`;

            tekshtml += `
        <tr>
            <td>${i + 2}</td>
            <td   class="w3-left-align">${namasubjek}</td>
            <td>${kkmnya}</td>
            <td>${n_mapel}</td>
            <td>${kriteria_n_mapel}</td>
            <td class="w3-justify">${deskripsikd3inti}</td>
            <td>${n_rapork4}</td>
        <td>${kriteria_n_raportk4}</td>
        <td class="w3-justify">${deskripsi_raportk4}</td>
        </tr>`;

        }

        let mulokinti =  document.getElementById("namamapelraport_BSUND")==null?arraymapelall["BSUND"]: document.getElementById("namamapelraport_BSUND").innerHTML;
        let kkmmulokinti =  buateditorkdaktif.filter(s => s.mapel == "BSUND")[0].kkm;//document.getElementById("angkakkm_BSUND").innerHTML;
        indexmapel = nilairaport.findIndex(x => x["kriteria_BSUND"]);
        n_mapel = nilairaport[indexmapel]["raport_BSUND"];

        kriteria_n_mapel = nilairaport[indexmapel]["kriteria_BSUND"];
        n_maks = nilairaport[indexmapel]["maks_BSUND"];
        kriteria_n_maks = nilairaport[indexmapel]["kriteria_maks_BSUND"];
        n_min = nilairaport[indexmapel]["min_BSUND"];
        kriteria_n_min = nilairaport[indexmapel]["kriteria_min_BSUND"];
        inhtmldeskripsimaks = buateditorkdaktif.filter(s=> s.mapel == "BSUND" && s.kd3 == n_maks)[0].indikatorkd3;//document.getElementById("deskripsikd3_BSUND_" + n_maks).innerHTML;
        inhtmldeskripsimin = buateditorkdaktif.filter(s=> s.mapel == "BSUND" && s.kd3 == n_min)[0].indikatorkd3;//document.getElementById("deskripsikd3_BSUND_" + n_min).innerHTML;
        deskripsikd3inti = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maks} dalam ${inhtmldeskripsimaks}, dan mulai ${kriteria_n_min} dalam ${inhtmldeskripsimin}`;

        indexmapelk4 = nilairaportk4.findIndex(x => x["kriteriak4_BSUND"]);
        n_rapork4 = nilairaportk4[indexmapelk4]["raportk4_BSUND"];
        kriteria_n_raportk4 = nilairaportk4[indexmapelk4]["kriteriak4_BSUND"];
        n_maksk4 = nilairaportk4[indexmapelk4]["maksk4_BSUND"];
        kriteria_n_maksk4 = nilairaportk4[indexmapelk4]["kriteria_maksk4_BSUND"];
        n_mink4 = nilairaportk4[indexmapelk4]["mink4_BSUND"];
        kriteria_n_mink4 = nilairaportk4[indexmapelk4]["kriteria_mink4_BSUND"];
        deskripsi_maksk4 = buateditorkdaktif.filter(s=> s.mapel == "BSUND" && s.kd4 == n_maksk4)[0].indikatorkd4;//document.getElementById("deskripsikd4_BSUND_" + n_maksk4).innerHTML;
        deskripsi_mink4 = buateditorkdaktif.filter(s=> s.mapel == "BSUND" && s.kd4 == n_maksk4)[0].indikatorkd4;//document.getElementById("deskripsikd4_BSUND_" + n_mink4).innerHTML;

        deskripsi_raportk4 = `Ananda ${titleCase(infosiswa.pd_nama)}   ${kriteria_n_maksk4} dalam ${deskripsi_maksk4}, dan mulai ${kriteria_n_mink4} dalam ${deskripsi_mink4}`;


        tekshtml += `<tr><td colspan="9">B. MUATAN LOKAL</tr>
    <tr>
        <td></td>
        <td colspan="8" class="w3-left-align">Muatan Lokal Wajib</td>
    </tr>
    <tr>
            <td>${mapelinti.length + 2}</td>
            <td class="w3-left-align">${mulokinti}</td>
            <td>${kkmmulokinti}</td>
            <td>${n_mapel}</td>
            <td>${kriteria_n_mapel}</td>
            <td class="w3-justify">${deskripsikd3inti}</td>
            <td>${n_rapork4}</td>
        <td>${kriteria_n_raportk4}</td>
        <td class="w3-justify">${deskripsi_raportk4}</td>
        </tr>`;

        tekshtml += `
    </tbody>
    </table>
    <br/>
    <b>C. Ekstrakurikuler</b><br/>
    <table class="w3-table-all garis  w3-small" >
    <thead>
        <tr>
            <th>No</th>
            <th>Kegiatan Ekstrakurikuler</th>
            <th>Nilai</th>
            <th>Keterangan</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_0"]}</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_1"]}</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_2"]}</td>
            
        </tr>
        <tr>
            <td>2</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_3"]}</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_4"]}</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_5"]}</td>
        </tr>
        <tr>
            <td>3</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_6"]}</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_7"]}</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_8"]}</td>        
        </tr>
    </tbody>
    </table><br/>
    <br>
    <b>D. Saran-saran</b></br>
    <div class="w3-panel w3-leftbar w3-light-grey">
    <p class="w3-large w3-serif raportsaran"><i>"${datatambahan.data[yy]["head_9"]}"</i></p>
    
  </div>
    <b>E. Tinggi dan Berat Badan</b><br/>
    <table class="versi-table w3-small" style="width:100%" >
    <thead>
        <tr>
            <th rowspan="2">No</th>
            <th rowspan="2">Aspek Yang Dinilai</th>
            <th colspan="2">Semester</th>
            
        </tr>
        <tr>
            <th>1</th>
            <th>2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Tinggi Badan (cm)</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_10"]}</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_11"]}</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Berat Badan (kg)</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_12"]}</td>
            <td contenteditable="true">${datatambahan.data[yy]["head_13"]}</td>
        </tr>
      
    </tbody>
    </table>
    <br/>
    <b>F. Kondisi Kesehatan</b><br/>
    <table class="versi-table w3-small" style="width:100%" >
    <thead>
        <tr>
            <th>No.</th>
            <th> Aspek Fisik</th>
            <th>Keterangan</th>
            
        </tr>

    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Pendengaran</td>
            <td>${datatambahan.data[yy]["head_14"]}</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Penglihatan</td>
            <td>${datatambahan.data[yy]["head_15"]}</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Gigi</td>
            <td>${datatambahan.data[yy]["head_16"]}</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Lainnya</td>
            <td>${datatambahan.data[yy]["head_17"]}</td>
        </tr>
    </tbody>
    </table><br/>
    <b>G. Prestasi</b><br/>
    <table class="versi-table w3-small" style="width:100%" >
    <thead>
        <tr>
            <th>No.</th>
            <th>Jenis Prestasi</th>
            <th>Keterangan</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>${datatambahan.data[yy]["head_18"]}</td>
            <td>${datatambahan.data[yy]["head_19"]}</td>
        </tr>
        <tr>
            <td>2</td>
            <td>${datatambahan.data[yy]["head_20"]}</td>
            <td>${datatambahan.data[yy]["head_21"]}</td>
        </tr>
        <tr>
            <td>3</td>
            <td>${datatambahan.data[yy]["head_22"]}</td>
            <td>${datatambahan.data[yy]["head_23"]}</td>
        </tr>
    </tbody>
    </table>
    <br/>
    <b>H. Kehadiran </b>
    <br/>
    <table class="w3-small">
        <tr>
            <td>Hadir </td>
            <td>:</td>
            <td contenteditable="true">${datahadir["hadir"]} hari </td>

        </tr>
        <tr>
            <td>Ijin </td>
            <td>:</td>
            <td contenteditable="true"> ${datahadir["ijin"]} hari </td>

        </tr>
        <tr>
            <td>Sakit </td>
            <td>:</td>
            <td contenteditable="true"> ${datahadir["sakit"]} hari </td>

        </tr>
        <tr>
            <td>Tanpa Keterangan </td>
            <td>:</td>
            <td contenteditable="true"> ${datahadir["alpa"]} hari </td>

        </tr>
    </table>
    <br/>`;
    if(idSemester == 2){
        tekshtml += `<div class="w3-border w3-border-blue w3-padding">
        Dengan memperhatikan dan mempertimbangkan hasil nilai raport pada Tahun Pelajaran ini, maka Ananda <b>${titleCase(infosiswa.pd_nama)}</b> dengan ini dinyatakan <b><em>${(datatambahan.data[yy]["head_24"] == "") ? "... belum diisi ..." : datatambahan.data[yy]["head_24"]}</em></b>
        </div>`
    }
    
    tekshtml +=`<br/>
    <div class="w3-main">
    <div class="w3-left" contenteditable="true" style="width:25%">
    Orang tua/ Wali
    <br/>
    <br/>
    <br/><br/>
    <br/>
    <br/>
    <br/>
    --------------------
    </div>
   <div class="w3-left w3-margin-left">
   Mengetahui,<br/>
   Kepala ${idNamaSekolah}
   <div id="ttdkepsek"></div>
   <br/>
   <b><u>${idNamaKepsek}
   </u></b><br/>
   NIP. ${idNipKepsek}
   
   
   </div>

   <div class="w3-right">
   ${jlo.kota}, ${titimangsaraport()}<br/>
   ${idJenisGuru} ${idNamaKelas}
   <div id="ttdgurukelas"></div>
   <br/>
   <b><u>${namauser}
   </u></b><br/>
   NIP. ${idNipGuruKelas}
   
   </div>

   </div>
    `;
        divto.innerHTML = tekshtml;

        let cek = document.querySelector("#cekbarcode");
        if (cek.checked) {

            let teksbarkode = "Data Raport Semester 2 ini telah diketahui dan ditandatangani oleh Kepala " + idNamaSekolah + " untuk siswa atas nama " + infosiswa.pd_nama;//document.getElementById("text");
            let teksbarkode2 = "Data Raport Semester 2 ini telah  ditandatangani oleh Guru Kelas " + idNamaKelas + " untuk siswa atas nama " + infosiswa.pd_nama;//document.getElementById("text");
            barcodekan('ttdkepsek', teksbarkode);
            barcodekan('ttdgurukelas', teksbarkode2);
        } else {
            document.getElementById("ttdgurukelas").innerHTML = "<br/><br/>";
            document.getElementById("ttdkepsek").innerHTML = "<br/><br/>";
        }
    // } catch (err) {
    //     alert("Maaf, Raport untuk siswa ini tidak bisa ditampilkan. Pastikan data nilai KI-3 dan KI-4 minimal ada 2 KD yang memiliki nilai. \n\n Tips: jika memang tidak ada data nilai, beri nilai nol (tidak boleh dikosongkan) untuk Rekap KI-3 atau KI-4.)");
    //     console.log(err.message)
    //     let divto = document.getElementById("halamanraport");
    //     divto.innerHTML = "Ada yang salah ... Periksa seluruh rekapitulasi nilai. <br/><br/> Periksa apakah ada nilai yang tidak diisi (wajib diisi, jika memang nilai kosong anggap nilainya adalah nol), Periksa juga apakah Data Siswa benar-benar telah diisi dengan lengkap (terutama data agama siswa)"

    // }
}

const algoritmakurtilas = (xx) => {
    let x = parseInt(xx)

    let datakkm = koleksiarraymapelaktif();
    let datamapel = datakkm.kodemapel;
    //let td = document.querySelector(".resultkdyangdicek");
    let tes = tabelkearray();
    let sumbernilai = document.querySelector(".datarekapkd3").getElementsByTagName("tbody")[0];
    let paspak = (idSemester == 2) ? "PAK" : "PAS";

    //console.log(datamapel)
    let datakd3 = {};
    let datasementara = {};
    let jumlahsemuakd = 0;

    for (i = 0; i < datamapel.length; i++) {
        let arrKD3 = tes.filter(k => k[6] == true && k[0] == datamapel[i]);
        jumlahsemuakd += arrKD3.length;
        let kd = arrKD3.map(l => l[1]);

        datasementara[datamapel[i]] = kd;


    }
    datakd3["data"] = datasementara;
    datakd3["jumlahsemuakd"] = jumlahsemuakd;
    // console.log(datakd3);
    let ph = 2;
    let pts = parseInt(ph + jumlahsemuakd);
    let pas = parseInt(pts + jumlahsemuakd);
    // console.log(ph)
    // console.log(pts)
    // console.log(pas)
    // for(c = 0 ; c < jumlahsemuakd ; c++){
    //     let nilaiph = 
    // }

    //contoh salah satu siswa dulu:
    // for(a = 0 ; a < jsondatasiswa.length ; a++) // aktifkan ini untuk seluruh siswa
    //let infomapel = Object.keys(datakd3.data);
    let inforaport = {};
    // inforaport["namasiswa"] = jsondatasiswa[a]
    let acuan = 0;
    let arrayobjekmapel = [];

    for (b = 0; b < datamapel.length; b++) {
        let objeknilai = {};
        let arraynilai = [];

        let namamapel = datamapel[b];

        //objeknilai["raport_IPA"]
        // console.log(namamapel)
        // jumlahkdmapelin
        let jumlahkdmapelini = datakd3["data"][datamapel[b]];
        //console.log(jumlahkdmapelini.length)
        let arrpts = []
        let angkanilaikd = 0;
        let angkapembagi = 0;
        let acuanmaks = 0;
        let acuanmin = 0;
        let nilaiKD = 0;
        let kdMaks = "";
        let kdMins = "";
        let nilaiRaport = 0;
        for (c = 0; c < jumlahkdmapelini.length; c++) {
            // console.log(jumlahkdmapelini[c]);
            let acuanph = b + c + 2 + acuan;
            let acuanpts = b + c + 2 + acuan + jumlahsemuakd;
            let acuanpas = b + c + 2 + acuan + jumlahsemuakd + jumlahsemuakd;
            //tentukan masing-masing nilainya
            let nilaiph = sumbernilai.rows[x].cells[acuanph].innerHTML;
            let in_nilaiph = (nilaiph === "") ? 0 : parseInt(nilaiph);
            let tambahpembagi = (nilaiph === "") ? 0 : 2;

            let nilaipts = sumbernilai.rows[x].cells[acuanpts].innerHTML;
            let in_nilaipts = (nilaipts === "") ? 0 : parseInt(nilaipts);
            let tambahpembagipts = (nilaipts === "") ? 0 : 1;

            let nilaipas = sumbernilai.rows[x].cells[acuanpas].innerHTML;
            let in_nilaipas = (nilaipas === "") ? 0 : parseInt(nilaipas);
            let tambahpembagipas = (nilaipas === "") ? 0 : 1;

            angkanilaikd = ((in_nilaiph * 2) + in_nilaipts + in_nilaipas);
            angkapembagi = (tambahpembagi + tambahpembagipts + tambahpembagipas);

            if (angkapembagi !== 0) {
                nilaiKD = Math.round(angkanilaikd / angkapembagi)
            }
            //console.log(nilaiKD);
            if (acuanmaks < nilaiKD) {
                acuanmaks = nilaiKD;
                kdMaks = jumlahkdmapelini[c];
            }
            if (acuanmin == 0 || acuanmin > nilaiKD) {
                acuanmin = nilaiKD
                kdMins = jumlahkdmapelini[c];
            }

            nilaiRaport += nilaiKD;
        }
        //console.log("nilai maks : " + acuanmaks);
        // console.log("KD maks : " + kdMaks);
        // //console.log("nialai min : " + acuanmin);
        // console.log("KD min : " + kdMins);
        //console.log("angka pembagi " + angkapembagi) 
        //fn_predikatkriteria

        let oknilairaport = Math.round(nilaiRaport / jumlahkdmapelini.length);
        //console.log()

        acuan += jumlahkdmapelini.length - 1;
        //console.log(arrpts);
        objeknilai["raport_" + namamapel] = oknilairaport;
        objeknilai["kriteria_" + namamapel] = fn_predikatkriteria(oknilairaport);
        objeknilai["maks_" + namamapel] = kdMaks;
        objeknilai["kriteria_maks_" + namamapel] = fn_predikatkriteria(acuanmaks);
        objeknilai["min_" + namamapel] = kdMins;
        objeknilai["kriteria_min_" + namamapel] = fn_predikatkriteria(acuanmin);

        arrayobjekmapel.push(objeknilai);

    }
    inforaport["datarraport"] = arrayobjekmapel;
    //console.log(inforaport);
    return inforaport

}

const deskripsikd12t = (kompetensi, rr, namasiswa) => {
    let r = parseInt(rr);
    //kompetensi ada 2, yaitu: k1 atau k2;
    // r adalah indeks baris pada data sumber;
    // r diasumsikan sebagai selectedIndex pada pemilihan nama siswa;
    // tabel deskripsi:
    let tabeldeskripsi = document.querySelector(".add_indikatorindikator" + kompetensi);
    let tabeldatakki = document.querySelector(".classtabel" + kompetensi);

    let datamaks = tabeldatakki.rows[r].cells[3].innerHTML;
    let datamin = tabeldatakki.rows[r].cells[4].innerHTML;
    let arrayindikmax, arrayindikmin, teksall = "", teksmaks = "", teksmin = "";
    // let teksmaks = ` selalu `;
    // let teksmin = ` dan mulai tampak dalam `;

    if (datamaks == "") {
        arrayindikmax = [];
    } else {
        arrayindikmax = tabeldatakki.rows[r].cells[3].innerHTML.replace(/\s+/g, "").split(",");
        teksall = `Ananda  ${titleCase(namasiswa)} `;
        teksmaks = " selalu ";
    }

    if (datamin == "") {
        arrayindikmin = [];
    } else {
        arrayindikmin = tabeldatakki.rows[r].cells[4].innerHTML.replace(/\s+/g, "").split(",");
        teksall = `Ananda ${titleCase(namasiswa)}`;
        teksmin = " dan mulai tampak "

    }

    // console.log(r)
    // console.log(kompetensi);
    // console.log(arrayindikmax.length);
    if (arrayindikmax.length !== 0) {
        for (a = 0; a < arrayindikmax.length; a++) {
            teksmaks += tabeldeskripsi.rows[parseInt(arrayindikmax[a]) + 1].cells[0].innerHTML + ", ";
        }

    }
    //console.log(arrayindikmin.length)
    if (arrayindikmin.length !== 0) {
        for (b = 0; b < arrayindikmin.length; b++) {
            teksmin += tabeldeskripsi.rows[parseInt(arrayindikmin[b]) + 1].cells[0].innerHTML + ", ";
        }

    }
    teksall += teksmaks + teksmin;
    //tabel.rows[1].cells[1].innerHTML = teksall;
    return teksall



}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}

const deskripsikd12 = (kompetensi) => {
    //rr diambil dari argumen value
    // rr akan menjadi baris kedua

    let x = document.querySelector("#listnamaraport");
    let y = x.selectedIndex;
    let z = x.options;
    let n = z[y].value;
    let t = z[y].text;

    let tabel_deskripsi = document.querySelector(".add_indikatorindikator" + kompetensi).getElementsByTagName("tbody")[0];
    let sumber_data = document.querySelector(".classtabel" + kompetensi).getElementsByTagName("tbody")[0];

    let predikat = sumber_data.rows[n].cells[2].innerHTML;
    let kodemaks = sumber_data.rows[n].cells[3].innerHTML;
    let kodemin = sumber_data.rows[n].cells[4].innerHTML;

    let arrmaks = []
    if (kodemaks !== "") {
        arrmaks = kodemaks.replace(/\s+/g, "").split(",")
    };
    let arrmin = []
    if (kodemin !== "") {
        arrmin = kodemin.replace(/\s+/g, "").split(",");
    }


    let teks = "Ananda " + titleCase(t);

    if (arrmaks.length == 0) {
        teks += " <span class='w3-text-red'>Data KI-" + kompetensi.replace("k", "") + " maksimal tidak ada/kosong</span> ";
    } else {
        teks += " selalu ";
        for (i = 0; i < arrmaks.length; i++) {
            let a = parseInt(arrmaks[i]);
            teks += tabel_deskripsi.rows[a].cells[0].innerHTML + ", ";
        }
    }

    if (arrmin.length == 0) {
        teks += "<span class='w3-text-red'>Data KI-" + kompetensi.replace("k", "") + " minimal tidak ada/kosong</span> ";
    } else {
        teks += " dan mulai tampak ";

        for (j = 0; j < arrmin.length; j++) {
            let b = parseInt(arrmin[j]);
            if (j == arrmin.length - 1) {
                teks += tabel_deskripsi.rows[b].cells[0].innerHTML + ".";
            } else {
                teks += tabel_deskripsi.rows[b].cells[0].innerHTML + ", ";
            }


        }
    }




    // console.log(kompetensi);
    // let returntext = "k1 = " + kompetensi + ", Nama Siswa (" + t + ") Predikat " + predikat + ", maks (" + kodemaks + "), min (" + kodemin + ")"
    let returntext = teks;
    return returntext
}


///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

let tabacrdk4 = document.querySelector(".tabacrdk4");
let dataapikpraktik = {};
let dataapikproduk = {};
let dataapikproyek = {};
// setiap ''ph' diganti kpraktik
//setiap pts diganti kproduk
//setiap pas diganti kproyek
tabacrdk4.addEventListener("click", async function () {
    let datakpraktik = Object.keys(dataapikpraktik);
    let datakproduk = Object.keys(dataapikproduk);
    let datakproyek = Object.keys(dataapikproyek);
    // let tesrekappaspak = document.querySelector(".teksrekappaspak");
    // tesrekappaspak.innerHTML = (idSemester == 2) ? "Rekap PAK" : "Rekap PAS";
    //let paspak = (idSemester == 2) ? "PAK" : "PAS";

    let statuskpraktik = document.querySelector(".statusdatakpraktik");
    let statuskproduk = document.querySelector(".statusdatakproduk");
    let statuskproyek = document.querySelector(".statusdatakproyek");

    // let datakkm = koleksiarraymapelaktif();
    // console.log(datakkm);


    if (datakpraktik.length == 0) {
        await fetch(constlinknilai + "?action=lihatnilairekap&tab=kpraktik&kelas=" + idNamaKelas)
            .then(m => m.json())
            .then(r => {
                dataapikpraktik = r;
                let adakd = r.banyakkd.length;
                if (adakd == 4) {
                    statuskpraktik.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data/belum pernah membuat tagihan)</br>`;

                } else {
                    statuskpraktik.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
                }

            })

    } else {
        let adakd = dataapikpraktik.banyakkd.length;
        if (adakd == 4) {
            statuskpraktik.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data/belum pernah membuat tagihan)</b>`;

        } else {
            statuskpraktik.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
        }

    }

    if (datakproduk.length == 0) {
        await fetch(constlinknilai + "?action=lihatnilairekap&tab=kproduk&kelas=" + idNamaKelas)
            .then(m => m.json())
            .then(r => {
                dataapikproduk = r;
                let adakd = r.banyakkd.length;
                if (adakd == 4) {
                    statuskproduk.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data/belum pernah membuat tagihan)</b> `;

                } else {

                    statuskproduk.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
                }

            })

    } else {
        let adakd = dataapikproduk.banyakkd.length;
        if (adakd == 4) {
            statuskproduk.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data/belum pernah membuat tagihan)</b> `;

        } else {

            statuskproduk.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
        }
        //statuskproduk.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`
    }


    if (datakproyek.length == 0) {
        await fetch(constlinknilai + "?action=lihatnilairekap&tab=kproyek&kelas=" + idNamaKelas)
            .then(m => m.json())
            .then(r => {
                dataapikproyek = r;
                let adakd = r.banyakkd.length;
                if (adakd == 4) {
                    statuskproyek.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data)</b>`;

                } else {

                    statuskproyek.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
                }



            })

    } else {
        let adakd = dataapikproyek.banyakkd.length;
        if (adakd == 4) {
            statuskproyek.innerHTML = `<b class="w3-text-red">&times; (Tidak ada data)</b>`;

        } else {

            statuskproyek.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
        }

        //statusPAS.innerHTML = `<b class="w3-text-blue">&checkmark;</b>`;
        // console.log(datapaspak.length)
    }

    koleksicekliskdketerampilan();

})



const koleksicekliskdketerampilan = () => {
    let datakkm = koleksiarraymapelaktif();
    let datamapel = datakkm.kodemapel;
    let td = document.querySelector(".resultkdyangdicekketerampilan");
    let tes = tabelkearray();
    // let paspak = (idSemester == 2) ? "PAK" : "PAS";

    let KD4 = {}
    let tekshtml = "<table class='w3-table garis w3-tiny'><tr><th>Mapel</th><th>KD diceklis</th><th>KD Praktik</th><th>KD Produk</th><th>KD Proyek</th></tr>";
    for (i = 0; i < datamapel.length; i++) {
        let arrKD4 = tes.filter(k => k[7] == true && k[0] == datamapel[i]);
        let arrkpraktik = dataapikpraktik.banyakkd.filter(k => k.indexOf(datamapel[i]) > -1).map(k => k.split("_")[4]).filter((a, b, c) => c.indexOf(a) == b).sort();
        let arrkproduk = dataapikproduk.banyakkd.filter(k => k.indexOf(datamapel[i]) > -1).map(k => k.split("_")[4]).filter((a, b, c) => c.indexOf(a) == b).sort();
        let arrkproyek = dataapikproyek.banyakkd.filter(k => k.indexOf(datamapel[i]) > -1).map(k => k.split("_")[4]).filter((a, b, c) => c.indexOf(a) == b).sort();
        let kd = arrKD4.map(l => l[3])
        KD4[datamapel[i]] = kd;
        tekshtml += `<tr><td>${datamapel[i]}
        </td>
        <td>${kd.join(", ")}</td>
        <td>
            ${arrkpraktik.join(", ")}
        </td>
        
        <td>
            ${arrkproduk.join(", ")}
        </td>
        <td>
            ${arrkproyek.join(", ")}
        </td>
        
        </tr>
        `;
        // console.log(arrKD3)
        //console.log(kd)
        KD4[datamapel[i]] = kd;


    }

    //console.log(KD4)
    // console.log(KD3["PKN"].length)
    tekshtml += `</table> 
    <ul class="w3-tiny">
    <li><span class="w3-text-blue">KD Praktik, KD Produk, KD Proyek</span> adalah KD yang didapat dari tagihan penilaian yang telah Anda laksanakan
    </li><li>Yang akan dijadikan KD pada Deskripsi Raport adalah <span class="w3-text-blue">KD diceklis</span>
    </li><li><span class="w3-text-blue">KD diceklis</span> diatur di menu Kurkulum pada Tab Kompetensi Dasar. 
    </li><li>Ceklislah KD yang memuat minimal di <span class="w3-text-blue">KD Praktik, KD Produk, atau KD Proyek</span> telah dilaksanakan (data nilainya telah Ada) dan minimal jumlah ceklis KD sebanyak 2 KD.
    </li><li>Anda dapat mengisikan nilai tagihan keterampilan secara langsung di tabel rekapitulasi nilai kompetensi keterampilan. Nilai yang Anda isi akan menjadi nilai untuk Raport
    </li><li>Tips: Jika Anda belum pernah membuat tagihan nilai (membuat konten pelajaran elamaso), Anda dapat mengisi nilai di salah satu tagihan saja untuk dapat dijadikan nilai raport pada tabel Rekapitulasi Nilai Keterampilan di bawah ini. Misalnya, Anda mengisikan semua nilai KD di tagihan nilai Praktik saja tanpa harus mengisikan nilai di tagihan Produk atau Proyek.
    </li>
    </ul>
    `
    td.innerHTML = tekshtml;//
    //
    let jumlahceklis = tes.filter(k => k[7] == true);
    let jumlahkolom = jumlahceklis * 3;
    //console.log(jumlahceklis.length);



    let divto = document.getElementById("menumenunilaikd4");
    divto.innerHTML = `
    Menu-menu Data KI-4:<br/>
    <button onclick="koleksicekliskdketerampilan()" title="Tampilkan data Asli yang diperoleh siswa">Tampilkan Data Asli</button>
    <button onclick="getdataolahanketerampilan()">Tampilkan Data Olahan</button>
    <button onclick="jadikansemuakkmketerampilan()" title="jadikan nilai kosong atau di bawah KKM menjadi nilai KKM Mapel tersebut">KKM-kan ?</button>
    <button onclick="simpandatakd4()" title="Simpan hasil Olahan Data Nilai Anda tanpa menghilangkan data asli siswa" class="tombolsimpanserverkd4">Simpan Data Olah</button>
    <button onclick="printdatakd4()" title="Cetak halaman ini ke Printer">Print</button>
    <button onclick="exceldatakd4()" title="Export halaman ini dalam format Ms. Excel">Ms. Excel</button>
    <button onclick="importdataKeTable('datarekapkd4')" title="Import Data Nlai">Import Data dari File Export</button>
    <br/>

    Ini adalah nilai yang benar-benar diperoleh siswa tanpa Anda olah.<hr/>Rekapitulasi Data Nilai Kompetensi Keterampilan (KI-4)`;


    let rekap = `
    <table class="versi-table w3-tiny datarekapkd4">
    <thead>
    <tr>
        <th rowspan="3">No.</th>
        <th style="position:sticky;position:-webkit-sticky;left:0px;" rowspan="3">Nama Siswa</th>
    
    <th colspan="${jumlahceklis.length}">Rekap Nilai Praktik</th>
    <th colspan="${jumlahceklis.length}">Rekap Nilai Produk</th>
    <th colspan="${jumlahceklis.length}">Rekap Nilai Proyek</th>
        </tr><tr>
    `;



    // head PH
    for (a = 0; a < datamapel.length; a++) {
        let kolomkd = KD4[datamapel[a]].length;
        let id = "angkakkm_" + datamapel[a];
        let kkmnya = buateditorkdaktif.filter(s => s.mapel == datamapel[a])[0].kkm;//document.getElementById(id).innerHTML;
        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapkpraktik" colspan="${kolomkd}"> ${datamapel[a]} (KKM = ${kkmnya})</th>`;
        }
    }
    // head PTS
    for (d = 0; d < datamapel.length; d++) {
        let kolomkd = KD4[datamapel[d]].length;
        let id = "angkakkm_" + datamapel[d];
        let kkmnya = buateditorkdaktif.filter(s => s.mapel == datamapel[d])[0].kkm;//document.getElementById(id).innerHTML;

        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapkproduk w3-light-green" colspan="${kolomkd}">  ${datamapel[d]} (KKM = ${kkmnya})</th>`;
        }
    }
    // head PAS
    for (e = 0; e < datamapel.length; e++) {
        let kolomkd = KD4[datamapel[e]].length;
        let id = "angkakkm_" + datamapel[e];
        let kkmnya = buateditorkdaktif.filter(s => s.mapel == datamapel[e])[0].kkm;//document.getElementById(id).innerHTML;
        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapkproyek w3-deep-orange"  colspan="${kolomkd}">${datamapel[e]} (KKM = ${kkmnya})</th>`;
        }
    }

    rekap += "</tr><tr>";

    for (b = 0; b < datamapel.length; b++) {
        let kolomkds = KD4[datamapel[b]].length
        if (kolomkds !== 0) {
            for (c = 0; c < kolomkds; c++) {
                rekap += `<th  class="tt_rekapkpraktik" >${KD4[datamapel[b]][c]}</th>`
            }

        }
    }
    for (f = 0; f < datamapel.length; f++) {
        let kolomkds = KD4[datamapel[f]].length
        if (kolomkds !== 0) {
            for (g = 0; g < kolomkds; g++) {
                rekap += `<th  class="tt_rekapkproduk w3-light-green" >${KD4[datamapel[f]][g]}</th>`
            }

        }
    }
    for (m = 0; m < datamapel.length; m++) {
        let kolomkds = KD4[datamapel[m]].length
        if (kolomkds !== 0) {
            for (n = 0; n < kolomkds; n++) {
                rekap += `<th  class="tt_rekapkproyek w3-deep-orange" >${KD4[datamapel[m]][n]}</th>`
            }

        }
    }

    rekap += `</tr></thead><tbody>`;

    //isikan data siswa
    for (o = 0; o < jsondatasiswa.length; o++) {
        //console.log(o)
        rekap += `<tr>
        <td>${o + 1}</td>
        <td  style="position:sticky;position:-webkit-sticky;left:0px;">${jsondatasiswa[o].pd_nama}</td>`

        for (b = 0; b < datamapel.length; b++) {
            let kolomkds = KD4[datamapel[b]].length
            if (kolomkds !== 0) {
                for (c = 0; c < kolomkds; c++) {
                    //  console.log(KD3[datamapel[b]][c])
                    let nilaisementara = fungsirerataKDketerampilan("kpraktik", `${jsondatasiswa[o].id}`, `${datamapel[b]}`, `${KD4[datamapel[b]][c]}`);
                    // rekap += `<td  class="tt_rekapPH tt_KD3_${datamapel[b]}" style="visibility: visible;" contenteditable="true"> ${nilaisementara}</td>`;
                    rekap += `<td  class="tt_rekapkpraktik tt_KD4_${datamapel[b]}"  contenteditable="true">${nilaisementara}</td>`;
                }

            }
        }
        for (f = 0; f < datamapel.length; f++) {
            let kolomkds = KD4[datamapel[f]].length
            if (kolomkds !== 0) {
                for (g = 0; g < kolomkds; g++) {
                    let nilaisementarakproduk = fungsirerataKDketerampilan("kproduk", `${jsondatasiswa[o].id}`, `${datamapel[f]}`, `${KD4[datamapel[f]][g]}`);
                    // rekap += `<td  class="tt_rekapPTS tt_KD3_${datamapel[f]}" style="visibility: hidden" contenteditable="true"></td>`;
                    rekap += `<td  class="tt_rekapkproduk tt_KD4_${datamapel[f]}"  contenteditable="true">${nilaisementarakproduk}</td>`;
                }

            }
        }
        for (m = 0; m < datamapel.length; m++) {
            let kolomkds = KD4[datamapel[m]].length
            if (kolomkds !== 0) {
                for (n = 0; n < kolomkds; n++) {
                    let nilaisementarakproyek = fungsirerataKDketerampilan("kproyek", `${jsondatasiswa[o].id}`, `${datamapel[m]}`, `${KD4[datamapel[m]][n]}`);
                    //rekap += `<td  class="tt_rekapPAS  tt_KD3_${datamapel[m]}" style="visibility: hidden" contenteditable="true"></td>`;
                    rekap += `<td  class="tt_rekapkproyek  tt_KD4_${datamapel[m]}" contenteditable="true">${nilaisementarakproyek}</td>`;
                }

            }
        }

        `</tr>`
    }
    document.getElementById("tabeldatanilaiki4").innerHTML = rekap;
    let wid = document.querySelector(".datarekapkd4").offsetWidth;
    let divscroll = document.getElementById("scrollatasketerampilan");
    let isidivscroll = document.getElementById("isiscrollatasketerampilan");
    let divolahnilai = document.getElementById("olahnilai");
    let ww = divolahnilai.offsetWidth;

    divscroll.setAttribute("style", `border: none 0px red;overflow-x: scroll;position:sticky;position:-webkit-sticky;top:25px;`)
    isidivscroll.setAttribute("style", `width:${wid}px;height:20px`)

}


let togelketerampilan = document.querySelector(".togglekesiapandataketerampilan");
togelketerampilan.addEventListener("click", function () {
    let x = document.querySelector(".datatoggleketerampilan");
    if (x.style.display === "none") {
        x.style.display = "block";
        togel.innerHTML = "<i class='fa fa-eye-slash'></i> Tutup";
    } else {
        x.style.display = "none";
        togel.innerHTML = "<i class='fa fa-eye'></i> Sumber Data";
    }
})

const fungsirerataKDketerampilan = (t, tokennya, mapel, kd) => {
    let doo = {};
    if (t == "kpraktik") {
        doo = dataapikpraktik.records.filter(k => k.tokensiswa == tokennya)[0];
    } else if (t == "kproduk") {
        doo = dataapikproduk.records.filter(k => k.tokensiswa == tokennya)[0];

    } else if (t == "kproyek") {
        doo = dataapikproyek.records.filter(k => k.tokensiswa == tokennya)[0];

    }

    // let inNilai = 0;
    let inNilai = [];
    let akhirnilai;
    if (doo === undefined) {
        // console.log(doo)
        akhirnilai = ""
    } else {
        let datakd = Object.keys(doo).filter(j => j.indexOf(mapel + "_" + kd) > -1);
        //console.log(datakd.length)
        for (i = 0; i < datakd.length; i++) {
            let nilai = (doo[datakd[i]] == "") ? 0 : parseInt(doo[datakd[i]]);
            // console.log(nilai)
            // inNilai += parseInt(nilai);
            inNilai.push(nilai);
        }

        if (datakd.length !== 0) {
            // akhirnilai = (inNilai / datakd.length).toFixed(2);
            // akhirnilai = Math.round((inNilai / datakd.length));
            akhirnilai = Math.max(...inNilai);
            // akhirnilai = inNilai.reduce((p, v) => (p > v) ? p : v);

        } else {
            akhirnilai = "";
        }
    }
    return akhirnilai

}


let tt_tabtabrekapkpraktik = document.querySelector(".tabtabrekapkpraktik");
let tt_tabtabrekapkproduk = document.querySelector(".tabtabrekapkproduk");
let tt_tabtabrekapkproyek = document.querySelector(".tabtabrekapkproyek");
tt_tabtabrekapkpraktik.addEventListener("click", function () {
    tt_tabtabrekapkpraktik.className += " activee";
    tt_tabtabrekapkproduk.className = tt_tabtabrekapkproduk.className.replace(/activee/g, "");
    tt_tabtabrekapkproyek.className = tt_tabtabrekapkproyek.className.replace(/activee/g, "");

    let classph = document.querySelectorAll(".tt_rekapkpraktik");
    if (classph[0] == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("tabeldatanilaiki4");
    let tabel = document.querySelector(".datarekapkd4");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph[0].offsetLeft;
    div.scrollLeft = 0;// (x - y);

})

tt_tabtabrekapkproduk.addEventListener("click", function () {
    tt_tabtabrekapkproduk.className += " activee";
    tt_tabtabrekapkpraktik.className = tt_tabtabrekapkpraktik.className.replace(/activee/g, "");
    tt_tabtabrekapkproyek.className = tt_tabtabrekapkproyek.className.replace(/activee/g, "");
    let classpts = document.querySelectorAll(".tt_rekapkproduk");
    if (classpts[0] == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let x = classpts[0].offsetLeft;
    let div = document.getElementById("tabeldatanilaiki4");
    let tabel = document.querySelector(".datarekapkd4");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    div.scrollLeft = (x - y);

})

tt_tabtabrekapkproyek.addEventListener("click", function () {
    tt_tabtabrekapkproyek.className += " activee";
    tt_tabtabrekapkproduk.className = tt_tabtabrekapkproduk.className.replace(/activee/g, "")
    tt_tabtabrekapkpraktik.className = tt_tabtabrekapkpraktik.className.replace(/activee/g, "")
    let classpaspak = document.querySelectorAll(".tt_rekapkproyek");
    if (classpaspak[0] == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let x = classpaspak[0].offsetLeft;
    let div = document.getElementById("tabeldatanilaiki4");

    let tabel = document.querySelector(".datarekapkd4");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    div.scrollLeft = (x - y);

})

const getdataolahanketerampilan = () => {
    let divto = document.getElementById("menumenunilaikd4");
    divto.innerHTML = "Sedang proses mengambil data Pengolahan Nilai Anda di Server  <i class='fa fa-refresh fa-spin'></i>"
    let tes = tabelkearray();
    //let paspak = (idSemester == 2) ? "PAK" : "PAS";
    let tabeldata = document.querySelector(".datarekapkd4").getElementsByTagName("tbody")[0];
    let ddph = tes.filter(k => k[7] == true).map(k => "kpraktik_" + k[0] + "_" + k[3]);
    let ddpts = tes.filter(k => k[7] == true).map(k => "kproduk_" + k[0] + "_" + k[3]);
    let ddpas = tes.filter(k => k[7] == true).map(k => "kproyek_" + k[0] + "_" + k[3]);
    let a = ddph.concat(ddpts);

    let dds = a.concat(ddpas);
    //let tab = "rekapkd3";
    // let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    // fetch(constlinknilai + "?action=getdatafromtab" + param)

    let tab = "rekapkd4";
    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {
            console.log(k);
            if (k.result == 0) {
                alert("Anda belum pernah menyimpan data pengolahan nilai.");
                divto.innerHTML = `
                Menu-menu Data KI-4:<br/>
                <button onclick="koleksicekliskdketerampilan()" title="Tampilkan data Asli yang diperoleh siswa">Tampilkan Data Asli</button>
                <button onclick="getdataolahanketerampilan()">Tampilkan Data Olahan</button>
                <button onclick="jadikansemuakkmketerampilan()" title="jadikan nilai kosong atau di bawah KKM menjadi nilai KKM Mapel tersebut">KKM-kan ?</button>
                <button onclick="simpandatakd4()" title="Simpan hasil Olahan Data Nilai Anda tanpa menghilangkan data asli siswa" class="tombolsimpanserverkd4">Simpan Data Olah</button>
                <button onclick="printdatakd4()" title="Cetak halaman ini ke Printer">Print</button>
                <button onclick="exceldatakd4()" title="Export halaman ini dalam format Ms. Excel">Ms. Excel</button>
                <button onclick="importdataKeTable('datarekapkd4')" title="Import Data Nlai">Import Data dari File Export</button>
                <br/><br/><br/>
                `
            } else {
                let ob = Object.keys(k.data[0]).filter(k => !(k === "no" || k === "nama"));
                let key = Object.keys(k.data[0]);
                let obb = JSON.stringify(ob);
                let ddx = JSON.stringify(dds);
                if (obb === ddx) {
                    //alert("sama headnya")
                    let lr = tabeldata.rows;

                    for (r = 0; r < lr.length; r++) {
                        let perbaris = lr[r];
                        for (s = 0; s < perbaris.cells.length; s++) {
                            let d = k.data[r][key[s]];
                            perbaris.cells[s].innerHTML = d;
                        }
                    }
                    divto.innerHTML = `
                    Menu-menu Data KI-4:<br/>
                    <button onclick="koleksicekliskdketerampilan()" title="Tampilkan data Asli yang diperoleh siswa">Tampilkan Data Asli</button>
                    <button onclick="getdataolahanketerampilan()">Tampilkan Data Olahan</button>
                    <button onclick="jadikansemuakkmketerampilan()" title="jadikan nilai kosong atau di bawah KKM menjadi nilai KKM Mapel tersebut">KKM-kan ?</button>
                    <button onclick="simpandatakd4()" title="Simpan hasil Olahan Data Nilai Anda tanpa menghilangkan data asli siswa" class="tombolsimpanserverkd4">Simpan Data Olah</button>
                    <button onclick="printdatakd4()" title="Cetak halaman ini ke Printer">Print</button>
                    <button onclick="exceldatakd4()" title="Export halaman ini dalam format Ms. Excel">Ms. Excel</button>
                    <button onclick="importdataKeTable('datarekapkd4')" title="Import Data Nlai">Import Data dari File Export</button>
                    <br/>

                    <span class="w3-text-red">Ini adalah nilai yang telah Anda Olah.</span><hr/>Rekapitulasi Data Nilai Kompetensi Keterampilan (KI-4) <span class="w3-text-red">(Data Pengolahan Nilai)</span>`;


                } else {
                    let konf = confirm("Sebaran KD yang telah disimpan sebelumnya berbeda dengan sebaran KD saat ini. Sebaran KD sebelumnya mungkin saja tidak valid dengan dengan data sebaran KD saat ini. Anda sebaiknya membuat Data Pengolahan Nilai yang sesuai dengan sebaran KD saat ini sebab data yang akan dijadikan deskripsi raport adalah sebaran KD saat ini. Apakah Anda ingin tetap menampilkannya?\n\n Klik [OK] untuk menampilkan data, atau \n\n Klik [CANCEL] untuk membatalkan");
                    //console.log(k.data)

                    if (!konf) {
                        divto.innerHTML = `
                        Menu-menu Data KI-4:<br/>
                        <button onclick="koleksicekliskdketerampilan()" title="Tampilkan data Asli yang diperoleh siswa">Tampilkan Data Asli</button>
                        <button onclick="getdataolahanketerampilan()">Tampilkan Data Olahan</button>
                        <button onclick="jadikansemuakkmketerampilan()" title="jadikan nilai kosong atau di bawah KKM menjadi nilai KKM Mapel tersebut">KKM-kan ?</button>
                        <button onclick="simpandatakd4()" title="Simpan hasil Olahan Data Nilai Anda tanpa menghilangkan data asli siswa" class="tombolsimpanserverkd4">Simpan Data Olah</button>
                        <button onclick="printdatakd4()" title="Cetak halaman ini ke Printer">Print</button>
                        <button onclick="exceldatakd4()" title="Export halaman ini dalam format Ms. Excel">Ms. Excel</button>
                        <button onclick="importdataKeTable('datarekapkd4')" title="Import Data Nlai">Import Data dari File Export</button>
                        <br/>`

                        // Ini adalah nilai yang benar-benar diperoleh siswa tanpa Anda olah.<hr/>Rekapitulasi Data Nilai Kompetensi Pengetahuan (KI-3)`;

                        return
                    }
                    dataolahbedaketerampilan(k.data);
                    divto.innerHTML = `
                    Menu-menu Data KI-4:<br/>
                    <button onclick="koleksicekliskdketerampilan()" title="Tampilkan data Asli yang diperoleh siswa">Tampilkan Data Asli</button>
                    <button onclick="getdataolahanketerampilan()">Tampilkan Data Olahan</button>
                    <button onclick="jadikansemuakkmketerampilan()" title="jadikan nilai kosong atau di bawah KKM menjadi nilai KKM Mapel tersebut">KKM-kan ?</button>
                    <button onclick="simpandatakd4()" title="Simpan hasil Olahan Data Nilai Anda tanpa menghilangkan data asli siswa" class="tombolsimpanserverkd4">Simpan Data Olah</button>
                    <button onclick="printdatakd4()" title="Cetak halaman ini ke Printer">Print</button>
                    <button onclick="exceldatakd4()" title="Export halaman ini dalam format Ms. Excel">Ms. Excel</button>
                    <button onclick="importdataKeTable('datarekapkd4')" title="Import Data Nlai">Import Data dari File Export</button>
                    <br/>
                    
                    <span class="w3-text-red">Ini adalah nilai yang telah Anda Olah.</span><hr/>Rekapitulasi Data Nilai Kompetensi Keterampilan (KI-4) <span class="w3-text-red">(Data Pengolahan Nilai ini berbeda dengan sebaran KD saat ini)</span><br/><br/>
                    Saran: Jika peringatan ini muncul, Anda sebaiknya membuat data pengolahan nilai baru lagi yang diambil dari data asli yang sesaui dengan sebaran KD saat ini kemudian simpan data pengolahan ke server.
                    `;

                }
                //console.log(obb);
            }


        })
        .catch(er => console.log(er))


}

const jadikansemuakkmketerampilan = () => {
    let datakkm = koleksiarraymapelaktif();
    let datamapel = datakkm.kodemapel;
    let td = document.querySelector(".resultkdyangdicekketerampilan");
    let tes = tabelkearray();
    let paspak = (idSemester == 2) ? "PAK" : "PAS";
    //permapel
    for (a = 0; a < datamapel.length; a++) {
        let selid = "tt_KD4_" + datamapel[a];
        let angkaid = "angkakkm_" + datamapel[a];
        let sel = document.querySelectorAll("." + selid);
        let angkakkm = buateditorkdaktif.filter(s => s.mapel == datamapel[a])[0].kkm;;//document.getElementById(angkaid).innerHTML;
        sel.forEach(k => {
            if (k.innerHTML < parseInt(angkakkm)) {
                k.innerHTML = parseInt(angkakkm);
            }

        })
    }
}

var wrapperel1keterampilan = document.getElementById('scrollatasketerampilan');
var wrapperel2keterampilan = document.getElementById('tabeldatanilaiki4');
wrapperel1keterampilan.onscroll = function () {
    wrapperel2keterampilan.scrollLeft = wrapperel1keterampilan.scrollLeft;
};
wrapperel2keterampilan.onscroll = function () {
    wrapperel1keterampilan.scrollLeft = wrapperel2keterampilan.scrollLeft;
};
let nuhaaa
const simpandatakd4 = () => {
    let konfirmasi = confirm("Anda yakin ingin menyimpan data ini ke server?. Data yang sebelumnya akan diganti dengan data tabel ini. Klik OK untuk menyimpan atau klik CANCEL untuk membatalkannya.");
    if (!konfirmasi) {
        alert("Anda membatalkan simpan");
        return;
    };
    let tes = tabelkearray();
    nuhaaa = tes
    //let paspak = (idSemester == 2) ? "PAK" : "PAS";
    let tabeldata = document.querySelector(".datarekapkd4").getElementsByTagName("tbody")[0];
    let ddph = tes.filter(k => k[7] == true).map(k => "kpraktik_" + k[0] + "_" + k[3]);
    let ddpts = tes.filter(k => k[7] == true).map(k => "kproduk_" + k[0] + "_" + k[3]);
    let ddpas = tes.filter(k => k[7] == true).map(k => "kproyek_" + k[0] + "_" + k[3]);
    let a = ddph.concat(ddpts);

    let dds = a.concat(ddpas);
    let abc = ["no", "nama"];
    let dd = abc.concat(dds);

    let btn = document.querySelector(".tombolsimpanserverkd4");
    btn.innerHTML = "Simpan Data Olah <i class='fa fa-spin fa-spinner'></i>";
    //console.log(dd)
    let lr = tabeldata.rows;
    let all = []
    for (r = 0; r < lr.length; r++) {
        let perbaris = lr[r];
        let isi = []
        for (s = 0; s < perbaris.cells.length; s++) {

            let d = perbaris.cells[s].innerHTML;

            isi.push(d);

        }
        all.push(isi)
    }


    // console.log(all);

    let tab = "rekapkd4";
    let tabel = JSON.stringify(all);
    let head = JSON.stringify(dd);

    let data = new FormData();
    data.append("tabel", tabel);
    data.append("head", head);
    data.append("kelas", idNamaKelas);
    data.append("prefiktab", tab);
    fetch(constlinknilai + "?action=inserttabeltospreadsheet", {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
            btn.innerHTML = "Simpan Data Olah";
            //tombol.innerHTML = "Simpan di Server"
        })
        .catch(er => alert(er))

}

const dataolahbedaketerampilan = (arr) => {
    let dmapel = koleksiarraymapelaktif();
    let paspak = (idSemester == 2) ? "PAK" : "PAS";
    let datamapel = dmapel.kodemapel;
    let key = Object.keys(arr[0])
    let keyid = key.filter(k => !(k === "no" || k === "nama"))
    // console.log(keyid);
    let cek = keyid.filter(j => j.indexOf("kpraktik_") > -1)
    let ceka = keyid.filter(j => j.indexOf("kproduk_") > -1)
    let cekb = keyid.filter(j => j.indexOf("kproyek_") > -1)
    let countkey = (cek.length)
    let countkeya = (ceka.length)
    let countkeyb = (cekb.length)
    // console.log(cek.length);
    // console.log(ceka.length);
    // console.log(cekb.length);
    //et KD3 = arr;




    //console.log(cek);
    //console.log(keyid);

    // for(a = 0 ; a < datamapel ; a++){

    // }
    //console.log(countkey);

    let rekap = `
    <table class="versi-table w3-tiny datarekapkd4">
    <thead>
    <tr>
        <th rowspan="3">No.</th>
        <th style="position:sticky;position:-webkit-sticky;left:0px;" rowspan="3">Nama Siswa</th>

    <th colspan="${countkey}">Rekap Nilai Praktik</th>
    <th colspan="${countkeya}">Rekap Nilai Produk</th>
    <th colspan="${countkeyb}">Rekap Nilai Proyek</th>
        </tr><tr>
    `;
    // head PH
    for (a = 0; a < datamapel.length; a++) {
        let kolomkd = keyid.filter(j => j.indexOf("kpraktik_" + datamapel[a]) > -1);
        let id = "angkakkm_" + datamapel[a];
        let kkmnya =buateditorkdaktif.filter(s => s.mapel == datamapel[a][0]).kkm ;// document.getElementById(id).innerHTML;
        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapkpraktik" colspan="${kolomkd.length}"> ${datamapel[a]} (KKM = ${kkmnya})</th>`;
        }
    }
    // head PTS
    for (d = 0; d < datamapel.length; d++) {
        let kolomkd = keyid.filter(j => j.indexOf("kproduk_" + datamapel[d]) > -1)
        let id = "angkakkm_" + datamapel[d];
        let kkmnya = buateditorkdaktif.filter(s => s.mapel == datamapel[d])[0].kkm;//document.getElementById(id).innerHTML;

        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapkproduk w3-light-green" colspan="${kolomkd.length}">  ${datamapel[d]} (KKM = ${kkmnya})</th>`;
        }
    }
    // head PAS
    for (e = 0; e < datamapel.length; e++) {
        let kolomkd = keyid.filter(j => j.indexOf("kproyek_" + datamapel[e]) > -1);
        let id = "angkakkm_" + datamapel[e];
        let kkmnya = buateditorkdaktif.filter(s => s.mapel == datamapel[e])[0].kkm;//document.getElementById(id).innerHTML;
        if (kolomkd !== 0) {
            rekap += `<th class="tt_rekapkproyek w3-deep-orange"  colspan="${kolomkd.length}">${datamapel[e]} (KKM = ${kkmnya})</th>`;
        }
    }

    rekap += "</tr><tr>";

    for (b = 0; b < datamapel.length; b++) {
        let kolomkds = keyid.filter(j => j.indexOf("kpraktik_" + datamapel[b]) > -1);
        //console.log(kolomkds);
        if (kolomkds !== 0) {
            for (c = 0; c < kolomkds.length; c++) {
                rekap += `<th  class="tt_rekapkpraktik" >${kolomkds[c].split("_")[2]}</th>`

            }

        }
    }
    for (f = 0; f < datamapel.length; f++) {
        let kolomkds = keyid.filter(j => j.indexOf("kproduk_" + datamapel[f]) > -1);
        if (kolomkds !== 0) {
            for (g = 0; g < kolomkds.length; g++) {
                rekap += `<th  class="tt_rekapkproduk w3-light-green" >${kolomkds[g].split("_")[2]}</th>`
            }

        }
    }
    for (m = 0; m < datamapel.length; m++) {
        let kolomkds = keyid.filter(j => j.indexOf("kproyek_" + datamapel[m]) > -1)
        if (kolomkds !== 0) {
            for (n = 0; n < kolomkds.length; n++) {
                rekap += `<th  class="tt_rekapkproyek w3-deep-orange" >${kolomkds[n].split("_")[2]}</th>`
            }

        }
    }

    rekap += `</tr></thead><tbody>`;

    //isikan data siswa
    for (o = 0; o < jsondatasiswa.length; o++) {
        //console.log(o)
        rekap += `<tr>
            <td>${o + 1}</td>
            <td  style="position:sticky;position:-webkit-sticky;left:0px;">${jsondatasiswa[o].pd_nama}</td>`

        for (b = 0; b < datamapel.length; b++) {
            let xxx = keyid.filter(j => j.indexOf("kpraktik_" + datamapel[b]) > -1);
            let kolomkds = xxx;
            if (kolomkds !== 0) {
                for (c = 0; c < kolomkds.length; c++) {
                    //  console.log(KD3[datamapel[b]][c])

                    let nilaisementara = arr[o][kolomkds[c]];
                    rekap += `<td  class="tt_rekapkpraktik tt_KD4_${datamapel[b]}"  contenteditable="true">${nilaisementara}</td>`;
                }

            }
        }
        for (f = 0; f < datamapel.length; f++) {
            let xxx = keyid.filter(j => j.indexOf("kproduk_" + datamapel[f]) > -1);
            let kolomkds = xxx;
            if (kolomkds !== 0) {
                for (g = 0; g < kolomkds.length; g++) {
                    let nilaisementarapts = arr[o][kolomkds[g]];
                    rekap += `<td  class="tt_rekapkproduk tt_KD4_${datamapel[f]}"  contenteditable="true">${nilaisementarapts}</td>`;
                }

            }
        }
        for (m = 0; m < datamapel.length; m++) {
            let xxx = keyid.filter(j => j.indexOf("kproyek_" + datamapel[m]) > -1);
            let kolomkds = xxx;
            if (kolomkds !== 0) {
                for (n = 0; n < kolomkds.length; n++) {
                    let nilaisementarapaspak = arr[o][kolomkds[n]];
                    rekap += `<td  class="tt_rekapkproyek  tt_KD4_${datamapel[m]}" contenteditable="true">${nilaisementarapaspak}</td>`;
                }

            }
        }

        `</tr>`
    }
    document.getElementById("tabeldatanilaiki4").innerHTML = rekap;
    let wid = document.querySelector(".datarekapkd4").offsetWidth;
    let divscroll = document.getElementById("scrollatasketerampilan");
    let isidivscroll = document.getElementById("isiscrollatasketerampilan");
    let divolahnilai = document.getElementById("olahnilai");
    let ww = divolahnilai.offsetWidth;

    divscroll.setAttribute("style", `border: none 0px red;overflow-x: scroll;`)
    isidivscroll.setAttribute("style", `width:${wid}px;height:20px`)
}
const printdatakd4 = () => {
    let isibody = document.getElementById("tabeldatanilaiki4").innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-DURASA DATA NILAI KETERAMPILAN</title>`;
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
            size: A4 landscape;
            max-height:100%;
            max-width:100%;
            
            }
    }
    </style>`;

    body.innerHTML = `<h3 class="w3-center">Rekapitulasi Nilai Kompetensi Keterampilan (KI-4)</h3`;
    body.innerHTML += `<h4 class="w3-center">Kelas ${idNamaKelas} Semester ${idSemester}</h4>`;
    body.innerHTML += `<h5 class="w3-center">Tahun Pelajaran ${idTeksTapel}</h5>`;
    body.innerHTML += `${isibody}`;
    body.innerHTML += '<div style="float:left;position:relative;margin-left:50px;text-align:center">Mengetahui,<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><br/><u><b>' + idNamaKepsek + '</b></u><br/>NIP. ' + idNipKepsek + '</div>';
    body.innerHTML += '<div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ', ' + tanggalfull(new Date()) + '<br/>' + idJenisGuru + '<br/><br/><br/><br/><br/><b><u>' + namauser + '</u></b><br/>NIP. ' + idNipGuruKelas + '</div>';



    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}

const exceldatakd4 = () => {
    let tabelsumber = document.querySelector(".datarekapkd4");
    let divto = document.getElementById("datasiswaprint");
    let headsumber = tabelsumber.getElementsByTagName("thead")[0];
    let bodysumber = tabelsumber.getElementsByTagName("tbody")[0];
    let jumlahkolom = bodysumber.rows[0].cells.length;

    let tekshtml = `<table class="versi-table w3-tiny" id="tablekeexcelekapkd4">
    <tr>
        <td colspan="${jumlahkolom}">Rekapitulasi Nilai Kompetensi Keterampilan (KI-4)</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Kelas ${idNamaKelas} Semester ${idSemester}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Tahun Pelajaran ${idTeksTapel}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}"></td>
        
    <tr>
    ${headsumber.innerHTML.replace(/4\./g, "'4.")}
    ${bodysumber.innerHTML}
    <tr>
         
    <tr>`


    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Mengetahui, </td>
    <td></td>
    `;
    let sisakolom = jumlahkolom - 11;
    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${jlo.kota}, ${tanggalfull(new Date())}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Kepala ${idNamaSekolah} </td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${idJenisGuru} ${idNamaKelas}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>
    <tr></tr>
    <tr></tr>
    <tr></tr>
    `;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3"><b><u>${idNamaKepsek}</u></b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3"><b><u>${namauser}</u></b></td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">NIP. ${idNipKepsek}</b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">NIP. ${idNipGuruKelas}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `</table>`;
    divto.innerHTML = tekshtml
    $("#tablekeexcelekapkd4").table2excel({

        name: "Worksheet Name",
        filename: "Rekap Nilai KI 4 idfile " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 3,
        barisatas: 5

    });
    divto.innerHTML = "";

}

const algoritmaketerampilan = (xx) => {
    let x = parseInt(xx)

    let datakkm = koleksiarraymapelaktif();
    let datamapel = datakkm.kodemapel;
    //let td = document.querySelector(".resultkdyangdicek");
    let tes = tabelkearray();
    let sumbernilai = document.querySelector(".datarekapkd4").getElementsByTagName("tbody")[0];


    //console.log(datamapel)
    let datakd4 = {};
    let datasementara = {};
    let jumlahsemuakd = 0;

    for (i = 0; i < datamapel.length; i++) {
        let arrKD4 = tes.filter(k => k[7] == true && k[0] == datamapel[i]);
        jumlahsemuakd += arrKD4.length;
        let kd = arrKD4.map(l => l[3])

        datasementara[datamapel[i]] = kd;


    }
    datakd4["data"] = datasementara;
    datakd4["jumlahsemuakd"] = jumlahsemuakd;
    // console.log(datakd3);
    // let praktik = 2;
    // let produk = parseInt(praktik + jumlahsemuakd);
    // let proyek = parseInt(produk + jumlahsemuakd);
    // // console.log(ph)
    // console.log(pts)
    // console.log(pas)
    // for(c = 0 ; c < jumlahsemuakd ; c++){
    //     let nilaiph = 
    // }

    //contoh salah satu siswa dulu:
    // for(a = 0 ; a < jsondatasiswa.length ; a++) // aktifkan ini untuk seluruh siswa
    //let infomapel = Object.keys(datakd3.data);
    let inforaport = {};
    // inforaport["namasiswa"] = jsondatasiswa[a]
    let acuan = 0;
    let arrayobjekmapel = [];

    for (b = 0; b < datamapel.length; b++) {
        let objeknilai = {};
        let arraynilai = [];

        let namamapel = datamapel[b];

        //objeknilai["raport_IPA"]
        // console.log(namamapel)
        // jumlahkdmapelin
        let jumlahkdmapelini = datakd4["data"][datamapel[b]];
        //console.log(jumlahkdmapelini.length)
        let arrpts = []
        let angkanilaikd = 0;
        let angkapembagi = 0;
        let acuanmaks = 0;
        let acuanmin = 0;
        let nilaiKD = 0;
        let kdMaks = "";
        let kdMins = "";
        let nilaiRaport = 0;
        let angkapembagitotal = 0;
        for (c = 0; c < jumlahkdmapelini.length; c++) {
            // console.log(jumlahkdmapelini[c]);
            let acuanph = b + c + 2 + acuan;
            // console.log(acuanph);
            let acuanpts = b + c + 2 + acuan + jumlahsemuakd;
            let acuanpas = b + c + 2 + acuan + jumlahsemuakd + jumlahsemuakd;
            //tentukan masing-masing nilainya
            let nilaiph = sumbernilai.rows[x].cells[acuanph].innerHTML;
            // console.log(nilaiph);
            let in_nilaiph = (nilaiph === "") ? 0 : parseInt(nilaiph);
            let tambahpembagi = (nilaiph === "") ? 0 : 1;


            let nilaipts = sumbernilai.rows[x].cells[acuanpts].innerHTML;
            let in_nilaipts = (nilaipts === "") ? 0 : parseInt(nilaipts);
            let tambahpembagipts = (nilaipts === "") ? 0 : 1;

            let nilaipas = sumbernilai.rows[x].cells[acuanpas].innerHTML;
            let in_nilaipas = (nilaipas === "") ? 0 : parseInt(nilaipas);
            let tambahpembagipas = (nilaipas === "") ? 0 : 1;

            angkanilaikd = (in_nilaiph + in_nilaipts + in_nilaipas);
            // console.log("angka nilaikd=" + angkanilaikd)
            angkapembagi = (tambahpembagi + tambahpembagipts + tambahpembagipas);
            // console.log("angka pembagi=" + angkapembagi)

            if (angkapembagi !== 0) {
                nilaiKD = Math.round(angkanilaikd / angkapembagi)
            }
            // console.log("Nilai tiap KD = " + nilaiKD);
            if (acuanmaks < nilaiKD) {
                acuanmaks = nilaiKD;
                kdMaks = jumlahkdmapelini[c];
            }
            if (acuanmin == 0 || acuanmin > nilaiKD) {
                acuanmin = nilaiKD
                kdMins = jumlahkdmapelini[c];
            }

            nilaiRaport += nilaiKD;
            angkapembagitotal += (angkapembagi > 0) ? 1 : 0;
        }
        //console.log("nilai maks : " + acuanmaks);
        // console.log("KD maks : " + kdMaks);
        // //console.log("nialai min : " + acuanmin);
        // console.log("KD min : " + kdMins);
        // console.log("nilairaport " + nilaiRaport)
        // console.log("angka pembagi total = " + angkapembagitotal)
        //fn_predikatkriteria

        // let oknilairaport = Math.round(nilaiRaport / jumlahkdmapelini.length);
        let oknilairaport = (angkapembagitotal == 0) ? "" : Math.round(nilaiRaport / angkapembagitotal);
        //console.log()

        acuan += jumlahkdmapelini.length - 1;
        //console.log(arrpts);
        objeknilai["raportk4_" + namamapel] = oknilairaport;
        objeknilai["kriteriak4_" + namamapel] = fn_predikatkriteria(oknilairaport);
        objeknilai["maksk4_" + namamapel] = kdMaks;
        objeknilai["kriteria_maksk4_" + namamapel] = fn_predikatkriteria(acuanmaks);
        objeknilai["mink4_" + namamapel] = kdMins;
        objeknilai["kriteria_mink4_" + namamapel] = fn_predikatkriteria(acuanmin);

        arrayobjekmapel.push(objeknilai);

    }
    inforaport["datarraport"] = arrayobjekmapel;
    // console.log(inforaport);
    return inforaport

}

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
let tabacrdklainnya = document.querySelector(".tabdataperkembanganraport");
let tabelblainnya = document.getElementById("tabel_data_b_lainnya");
// setiap ''ph' diganti kpraktik
//setiap pts diganti kproduk
//setiap pas diganti kproyek
let datatambahan = {};
tabacrdklainnya.addEventListener("click", async function () {

    let tekshtml = "";
    let tab = "pelengkapraport";
    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;
    await fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {
            datatambahan = k;
            if (k.result == 0) {
                alert("Anda belum pernah membuat data rekap perkembangan lainnya.");
                tekshtml = `
                <table class="versi-table tabeldataperkembangan w3-small">
                <thead>
                <tr>
                <th rowspan="3" class="th_no">No</th>
                <th rowspan="3" class="th_namasiswa" style="position:sticky;position:-webkit-sticky;left:0px;">Nama Siswa</th>
                        <th colspan="9" class="th_ekskul">Ekstrakurikuler</th>
                        <th rowspan="3" class="th_saran">   Saran-saran   </th>
                        <th colspan="4" class="th_tbbb">Tinggi dan Berat Badan</th>
                        <th colspan="4" class="th_kesehatan">Kondisi Kesehatan</th>
                        <th colspan="6" class="th_prestasi">Prestasi</th>
                        <th rowspan="3" class="th_naikkelas">Kenaikan Kelas/Kelulusan</th>    
                        </tr>
                        <tr>
                        <th colspan="3">Ekskul ke-1</th>
                        <th colspan="3">Ekskul ke-2</th>
                        <th colspan="3">Ekskul ke-3</th>
                        <th colspan="2">Tinggi Badan (Cm)<br/>Isi tanpa satuannya</th>
                        <th colspan="2">Berat Badan Badan(Kg)<br/>Isi tanpa satuannya</th>
                        <th rowspan="2">Pendengaran</th>
                        <th rowspan="2">Penglihatan</th>
                        <th rowspan="2">Gigi</th>
                        <th rowspan="2">Lainnya</th>
                        <th colspan="2">Prestasi ke-1</th>
                        <th colspan="2">Prestasi ke-2</th>
                        <th colspan="2">Prestasi ke-3</th>
                    
                </tr>
                    <tr>
                    <th>Nama Ekskul ke-1</th>
                    <th>Nilai Ekskul ke-1</th>
                    <th>Keterangan Ekskul ke-1</th>
                    <th>Nama Ekskul ke-2</th>
                    <th>Nilai Ekskul ke-2</th>
                    <th>Keterangan Ekskul ke-2</th>
                    <th>Nama Ekskul ke-3</th>
                    <th>Nilai Ekskul ke-3</th>
                    <th>Keterangan Ekskul ke-3</th>
                    <th> Semester 1</th>
                    <th> Semester 2</th>
                    <th> Semester 1</th>
                    <th> Semester 2</th>
                    <th>Jenis Prestasi ke-1</th>
                    <th>Keterangan Prestasi ke-1</th>
                    <th>Jenis Prestasi ke-2</th>
                    <th>Keterangan Prestasi ke-2</th>
                    <th>Jenis Prestasi ke-3</th>
                    <th>Keterangan Prestasi ke-3</th>
                    </tr>
                    
                    
                    
                    
                    </thead>
                    <tbody>
                    `
                for (a = 0; a < jsondatasiswa.length; a++) {
                    tekshtml += `
                        <tr>
                        <td>${a + 1}</td>
                        <td style="position:sticky;position:-webkit-sticky;left:0px;">${jsondatasiswa[a].pd_nama}</td>`;
                    for (b = 0; b < 25; b++) {
                        if (b == 9) {
                            tekshtml += `<td class="tdlain_${a}_${b}"   contenteditable="true"></td>`;
                        } else {
                            tekshtml += `<td class="tdlain_${a}_${b}" contenteditable="true"></td>`;
                        }



                    }
                    tekshtml += `</tr>`;
                }
                tekshtml += `
                </tbody>
                <table>
                `;


            } else {
                tekshtml = `
                <table class="versi-table tabeldataperkembangan w3-small">
                <thead>
                <tr>
                <th rowspan="3" class="th_no">No</th>
                <th rowspan="3" class="th_namasiswa" style="position:sticky;position:-webkit-sticky;left:0px;">Nama Siswa</th>
                        <th colspan="9" class="th_ekskul">Ekstrakurikuler</th>
                        <th rowspan="3" class="th_saran">   Saran-saran   </th> 
                        <th colspan="4" class="th_tbbb">Tinggi dan Berat Badan</th>
                        <th colspan="4" class="th_kesehatan">Kondisi Kesehatan</th>
                        <th colspan="6" class="th_prestasi">Prestasi</th>
                        <th rowspan="3" class="th_naikkelas">Kenaikan Kelas/Kelulusan</th>    
                        </tr>
                        <tr>
                        <th colspan="3">Ekskul ke-1</th>
                        <th colspan="3">Ekskul ke-2</th>
                        <th colspan="3">Ekskul ke-3</th>
                        <th colspan="2">Tinggi Badan (Cm)<br/>Isi tanpa satuannya</th>
                        <th colspan="2">Berat Badan Badan(Kg)<br/>Isi tanpa satuannya</th>
                        <th rowspan="2">Pendengaran</th>
                        <th rowspan="2">Penglihatan</th>
                        <th rowspan="2">Gigi</th>
                        <th rowspan="2">Lainnya</th>
                        <th colspan="2">Prestasi ke-1</th>
                        <th colspan="2">Prestasi ke-2</th>
                        <th colspan="2">Prestasi ke-3</th>
                    
                </tr>
                    <tr>
                    <th>Nama Ekskul ke-1</th>
                    <th>Nilai Ekskul ke-1</th>
                    <th>Keterangan Ekskul ke-1</th>
                    <th>Nama Ekskul ke-2</th>
                    <th>Nilai Ekskul ke-2</th>
                    <th>Keterangan Ekskul ke-2</th>
                    <th>Nama Ekskul ke-3</th>
                    <th>Nilai Ekskul ke-3</th>
                    <th>Keterangan Ekskul ke-3</th>
                    <th> Semester 1</th>
                    <th> Semester 2</th>
                    <th> Semester 1</th>
                    <th> Semester 2</th>
                    <th>Jenis Prestasi ke-1</th>
                    <th>Keterangan Prestasi ke-1</th>
                    <th>Jenis Prestasi ke-2</th>
                    <th>Keterangan Prestasi ke-2</th>
                    <th>Jenis Prestasi ke-3</th>
                    <th>Keterangan Prestasi ke-3</th>
                    </tr>
                    
                    
                    
                    
                    </thead>
                    <tbody>
                    `;
                for (i = 0; i < k.data.length; i++) {
                    tekshtml += `
                    <tr>
                    <td>${i + 1}</td>
                    <td style="position:sticky;position:-webkit-sticky;left:0px;">${k.data[i].nama}</td>`;
                    for (b = 0; b < 25; b++) {
                        if (b == 9) {
                            tekshtml += `<td class="tdlain_${i}_${b}" contenteditable="true" style="width:300px">${k.data[i]["head_" + b]}</td>`;
                        } else {
                            tekshtml += `<td class="tdlain_${i}_${b}" contenteditable="true">${k.data[i]["head_" + b]}</td>`;

                        }
                    }
                    tekshtml += `</tr>`;

                }
                tekshtml += `
                </tbody>
                <table>
                `;

            }
        })
        .catch(er => console.log(er))

    tabelblainnya.innerHTML = tekshtml;
    let wid = document.querySelector(".tabeldataperkembangan").offsetWidth;
    let divscroll = document.getElementById("scrollatas_b");
    let isidivscroll = document.getElementById("isiscrollatas_b");


    divscroll.setAttribute("style", `border: none 0px red;overflow-x: scroll;position:sticky;position:-webkit-sticky;top:25px;`)
    isidivscroll.setAttribute("style", `width:${wid}px;height:20px`)
})


var wrapperel1w = document.getElementById('scrollatas_b');
var wrapperel2w = document.getElementById('tabel_data_b_lainnya');
wrapperel1w.onscroll = function () {
    wrapperel2w.scrollLeft = wrapperel1w.scrollLeft;
};
wrapperel2w.onscroll = function () {
    wrapperel1w.scrollLeft = wrapperel2w.scrollLeft;
};


let tt_tabtab1 = document.querySelector(".tabtabekskul");
let tt_tabtab2 = document.querySelector(".tabtabsaran");
let tt_tabtab3 = document.querySelector(".tabtabtinggibadan");
let tt_tabtab4 = document.querySelector(".tabtabkondisikesehatan");
let tt_tabtab5 = document.querySelector(".tabtabprestasi");
let tt_tabtab6 = document.querySelector(".tabtabkenaikankelas");
tt_tabtab1.addEventListener("click", function () {
    tt_tabtab1.className += " activee";
    tt_tabtab2.className = tt_tabtab2.className.replace(/activee/g, "");
    tt_tabtab3.className = tt_tabtab3.className.replace(/activee/g, "");
    tt_tabtab4.className = tt_tabtab4.className.replace(/activee/g, "");
    tt_tabtab5.className = tt_tabtab5.className.replace(/activee/g, "");
    tt_tabtab6.className = tt_tabtab6.className.replace(/activee/g, "");

    let classph = document.querySelectorAll(".tabeldataperkembangan");
    if (classph[0] == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("tabel_data_b_lainnya");
    let tabel = document.querySelector(".tabeldataperkembangan");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph[0].offsetLeft;
    div.scrollLeft = 0;// (x - y);
})
tt_tabtab2.addEventListener("click", function () {
    tt_tabtab2.className += " activee";
    tt_tabtab1.className = tt_tabtab1.className.replace(/activee/g, "");
    tt_tabtab3.className = tt_tabtab3.className.replace(/activee/g, "");
    tt_tabtab4.className = tt_tabtab4.className.replace(/activee/g, "");
    tt_tabtab5.className = tt_tabtab5.className.replace(/activee/g, "");
    tt_tabtab6.className = tt_tabtab6.className.replace(/activee/g, "");

    let classph = document.querySelector(".th_saran");
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("tabel_data_b_lainnya");
    let tabel = document.querySelector(".tabeldataperkembangan");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);
})
tt_tabtab3.addEventListener("click", function () {
    tt_tabtab3.className += " activee";
    tt_tabtab1.className = tt_tabtab1.className.replace(/activee/g, "");
    tt_tabtab2.className = tt_tabtab2.className.replace(/activee/g, "");
    tt_tabtab4.className = tt_tabtab4.className.replace(/activee/g, "");
    tt_tabtab5.className = tt_tabtab5.className.replace(/activee/g, "");
    tt_tabtab6.className = tt_tabtab6.className.replace(/activee/g, "");

    let classph = document.querySelector(".th_tbbb");
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("tabel_data_b_lainnya");
    let tabel = document.querySelector(".tabeldataperkembangan");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);
})
tt_tabtab4.addEventListener("click", function () {
    tt_tabtab4.className += " activee";
    tt_tabtab1.className = tt_tabtab1.className.replace(/activee/g, "");
    tt_tabtab2.className = tt_tabtab2.className.replace(/activee/g, "");
    tt_tabtab3.className = tt_tabtab3.className.replace(/activee/g, "");
    tt_tabtab5.className = tt_tabtab5.className.replace(/activee/g, "");
    tt_tabtab6.className = tt_tabtab6.className.replace(/activee/g, "");

    let classph = document.querySelector(".th_kesehatan");
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("tabel_data_b_lainnya");
    let tabel = document.querySelector(".tabeldataperkembangan");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);
})

tt_tabtab5.addEventListener("click", function () {
    tt_tabtab5.className += " activee";
    tt_tabtab1.className = tt_tabtab1.className.replace(/activee/g, "");
    tt_tabtab2.className = tt_tabtab2.className.replace(/activee/g, "");
    tt_tabtab3.className = tt_tabtab3.className.replace(/activee/g, "");
    tt_tabtab4.className = tt_tabtab4.className.replace(/activee/g, "");
    tt_tabtab6.className = tt_tabtab6.className.replace(/activee/g, "");

    let classph = document.querySelector(".th_prestasi");
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("tabel_data_b_lainnya");
    let tabel = document.querySelector(".tabeldataperkembangan");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);
})
tt_tabtab6.addEventListener("click", function () {
    tt_tabtab6.className += " activee";
    tt_tabtab1.className = tt_tabtab1.className.replace(/activee/g, "");
    tt_tabtab2.className = tt_tabtab2.className.replace(/activee/g, "");
    tt_tabtab3.className = tt_tabtab3.className.replace(/activee/g, "");
    tt_tabtab4.className = tt_tabtab4.className.replace(/activee/g, "");
    tt_tabtab5.className = tt_tabtab5.className.replace(/activee/g, "");

    let classph = document.querySelector(".th_naikkelas");
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("tabel_data_b_lainnya");
    let tabel = document.querySelector(".tabeldataperkembangan");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);
})

let prtRekapLain = document.querySelector(".bl_print")

prtRekapLain.addEventListener("click", function () {
    let isibody = document.getElementById("tabel_data_b_lainnya").innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-DURASA REKAP DATA PERKEMBANGAN SISWA</title>`;
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
            size: A4 landscape;
            max-height:100%;
            max-width:100%;
            
            }
    }
    </style>`;

    body.innerHTML = `<h3 class="w3-center">Rekapitulasi Perkembangan dan Prestasi Siswa</h3`;
    body.innerHTML += `<h4 class="w3-center">Kelas ${idNamaKelas} Semester ${idSemester}</h4>`;
    body.innerHTML += `<h5 class="w3-center">Tahun Pelajaran ${idTeksTapel}</h5>`;
    body.innerHTML += `${isibody}`;
    body.innerHTML += '<div style="float:left;position:relative;margin-left:50px;text-align:center">Mengetahui,<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><br/><u><b>' + idNamaKepsek + '</b></u><br/>NIP. ' + idNipKepsek + '</div>';
    body.innerHTML += '<div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ', ' + tanggalfull(new Date()) + '<br/>' + idJenisGuru + '<br/><br/><br/><br/><br/><b><u>' + namauser + '</u></b><br/>NIP. ' + idNipGuruKelas + '</div>';



    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

})

let excelprkembang = document.querySelector(".bl_excel");
excelprkembang.addEventListener("click", function () {
    let tabelsumber = document.querySelector(".tabeldataperkembangan");
    let divto = document.getElementById("datasiswaprint");
    let headsumber = tabelsumber.getElementsByTagName("thead")[0];
    let bodysumber = tabelsumber.getElementsByTagName("tbody")[0];
    let jumlahkolom = bodysumber.rows[0].cells.length;

    let tekshtml = `<table class="versi-table w3-tiny" id="tablekeexcelkembang">
    <tr>
        <td colspan="${jumlahkolom}">Rekapitulasi Perkembangan dan Prestasi Siswa</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Kelas ${idNamaKelas} Semester ${idSemester}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Tahun Pelajaran ${idTeksTapel}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}"></td>
        
    <tr>
    ${headsumber.innerHTML}
    ${bodysumber.innerHTML}
    <tr>
         
    <tr>`


    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Mengetahui, </td>
    <td></td>
    `;
    let sisakolom = jumlahkolom - 11;
    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${jlo.kota}, ${tanggalfull(new Date())}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Kepala ${idNamaSekolah} </td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${idJenisGuru} ${idNamaKelas}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>
    <tr></tr>
    <tr></tr>
    <tr></tr>
    `;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3"><b><u>${idNamaKepsek}</u></b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3"><b><u>${namauser}</u></b></td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">NIP. ${idNipKepsek}</b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">NIP. ${idNipGuruKelas}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `</table>`;
    divto.innerHTML = tekshtml
    $("#tablekeexcelkembang").table2excel({

        name: "Worksheet Name",
        filename: "Rekap Perkembangan dan Prestasi idfile " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 3,
        barisatas: 5

    });
    divto.innerHTML = "";

})

let btn_savekembang = document.querySelector(".bl_simpanserver");
btn_savekembang.addEventListener("click", function () {

    //let paspak = (idSemester == 2) ? "PAK" : "PAS";
    let tabeldata = document.querySelector(".tabeldataperkembangan").getElementsByTagName("tbody")[0];


    btn_savekembang.innerHTML = "Simpan Ke Server  <i class='fa fa-spin fa-spinner'></i> ...";
    //console.log(dd)
    let lr = tabeldata.rows;
    let all = []
    for (r = 0; r < lr.length; r++) {
        let perbaris = lr[r];
        let isi = []
        for (s = 0; s < perbaris.cells.length; s++) {

            let d = perbaris.cells[s].innerHTML;

            isi.push(d);

        }
        all.push(isi)
    }


    // console.log(all);

    let dd = ["no", "nama"]
    for (b = 0; b < 25; b++) {
        let teks = "head_" + b;
        dd.push(teks)
    }

    let tab = "pelengkapraport";
    let tabel = JSON.stringify(all);
    let head = JSON.stringify(dd);

    let data = new FormData();
    data.append("tabel", tabel);
    data.append("head", head);
    data.append("kelas", idNamaKelas);
    data.append("prefiktab", tab);
    fetch(constlinknilai + "?action=inserttabeltospreadsheet", {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {

            alert(k.result);
            btn_savekembang.innerHTML = `<i class="fa fa-globe"></i> Simpan Ke Server`;

            //tombol.innerHTML = "Simpan di Server"
        })
        .catch(er => alert(er))

});
let btn_impor = document.querySelector(".bl_importexcel");
btn_impor.addEventListener("click", () => {
    importdataKeTablePerlengkapan('tabeldataperkembangan');
});
const titimangsaraport = () => {
    let teks = "TITIMANGSA RAPORT SEMESTER " + idSemester;
    let ok = ""
    let tt = JSON.parse(localStorage.getItem("Kaldik"));

    let st = tt.findIndex(k => k["keterangan"] == teks)
    if (st > -1) {
        ok = tanggalfull(tt[st]["start_tgl"])
    } else {
        ok = "23 Desember 2021"
    }
    return ok
}

const kehadiranraport = (indek) => {
    //let indek = 0;
    let tabel = document.getElementById("idtabelrekapsemester").getElementsByTagName("tbody")[0];
    let cH = 0;
    let cI = 0
    let cS = 0;
    let cA = 0;

    let sel = tabel.rows[indek];
    let cekdata, angkaH, angkaS, angkaI, angkaA;
    let codH = [3, 8, 13, 18, 23, 28];
    let codS = [4, 9, 14, 19, 24, 29];
    let codI = [5, 10, 15, 20, 25, 30];
    let codA = [6, 11, 16, 21, 26, 31]
    for (i = 0; i < 6; i++) {
        let h = sel.cells[codH[i]].innerHTML;
        let s = sel.cells[codS[i]].innerHTML;
        let ij = sel.cells[codI[i]].innerHTML;
        let A = sel.cells[codA[i]].innerHTML;
        angkaH = (h == "" || h == "-") ? 0 : parseInt(h);
        angkaS = (s == "" || s == "-") ? 0 : parseInt(s);
        angkaI = (ij == "" || ij == "-") ? 0 : parseInt(ij);
        angkaA = (A == "" || A == "-") ? 0 : parseInt(A);
        cH += angkaH;
        cS += angkaS;
        cI += angkaI;
        cA += angkaA;

    }
    let data = {}
    data["hadir"] = cH;
    data["sakit"] = cS;
    data["ijin"] = cI;
    data["alpa"] = cA;
    return data

}

const changebarcode = () => {
    let dd = document.getElementById("ttdbarcoderaport")
    let ini = document.getElementById("cekbarcode");
    if (ini.checked) {
        dd.innerHTML = "Tanda Tangan Barcode (Aktif)"
    } else {
        dd.innerHTML = "Tanda Tangan Barcode (Tidak Aktif)/Tidak menyertakan barcode tanda tangan"
    }

}

const cetakraportsiswaini = () => {

    let isi = document.getElementById("halamanraport").innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>Raport E-DURASA</title>`;
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

const listpublikasiraportsemester = () => {
    let bt = document.querySelector("#halamanlistraport");
    bt.innerHTML = "<i class='fa fa-spinner fa-spin'></i>";

    let div = document.querySelector("#halamanlistraport");
    div.scrollIntoView();
    let tekshtml = `<h4>Data Publikasi Raport Semester</h4><table class="versi-table w3-small" id="tabelcekpublikasiraportsemester">
                <thead><tr>
                    <th>No</th>
                    <th>Nama Siswa</th>
                    <th>Preview</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
                </thead><tbody>
                `;
    for (i = 0; i < jsondatasiswa.length; i++) {
        tekshtml += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${jsondatasiswa[i].pd_nama}</td>
                        <td class="w3-center">Belum dipublikasikan</td>
                        <td class="w3-center"><span class="w3-text-red">?</span></td>
                        <td class="w3-center">-</td>
                    </tr>
                    `
    }
    tekshtml += `</tbody></table>`;
    div.innerHTML = tekshtml;

    fetch(constlinknilai + "?action=cekpublikasiraportsemester&kelas=" + idNamaKelas)
        .then(m => m.json())
        .then(r => {
            //console.log(r);

            let cekdata = r.result;

            if (cekdata == 0) {
                div.innerHTML = "<h4>Maaf, Anda belum pernah mempublikasikan Raport Semester</h4>";
            } else {
                let data = r.data;
                let datanama, dataid, dataaksi,
                    indektabel, idtabel = document.getElementById("tabelcekpublikasiraportsemester").getElementsByTagName("tbody")[0];
                for (j = 0; j < data.length; j++) {
                    datanama = data[j].namasiswa;
                    dataid = data[j].raportsemester;
                    dataaksi = data[j].semesterpublikasi;
                    indektabel = jsondatasiswa.map(s => s.pd_nama).indexOf(datanama);

                    if (indektabel > -1) {
                        idtabel.rows[indektabel].cells[2].innerHTML = `<button onclick="previewraportsemester('${dataid}')" title="Lihat")><i class="fa fa-eye"></i> Lihat</button>`;
                        idtabel.rows[indektabel].cells[3].innerHTML = (dataaksi == "show") ? `<b class="w3-text-green">&checkmark;</b>` : `<b class="w3-text-red">&times;</b>`;
                        idtabel.rows[indektabel].cells[4].innerHTML = (dataaksi == "show") ? `<button onclick="sembunyikanraportsemester('${datanama}')" title="Hapus")><i class="fa fa-trash"></i> Hapus</button>` : `<button onclick="tampilkanraportsemester('${datanama}')" title="Kembalikan")><i class="fa fa-refresh"></i> </button>`;
                    }



                }




            }

        })
        .catch(er => console.log(er))
    //console.log

}


const previewraportsemester = (id) => {
    pranalamateri.style.display = "block";
    document.querySelector(".classReviewMateri").innerHTML = "";
    let tes = document.querySelector(".classReviewMateri");
    tes.innerHTML = "<i class='fa fa-spin fa-spinner'></i>"
    let tekshtml = "";
    $('.classReviewMateri').nextAll('button').remove();
    fetch(linkmateri + "&idmateri=" + id + "&action=previewriwayat")
        .then(m => m.json())
        .then(r => {
            tekshtml += `${r}<hr/>
        <center>
        <div class="w3-clear"></div>
        <button onclick="print_print_bantusiswa()"><i class="fa fa-print"></i> Cetak</button>
        </center><hr/>
        `;
            tes.innerHTML = tekshtml;
        }).catch(er => {
            tekshtml += "Maaf terjadi kesalahan dengan kode: " + er;
            tes.innerHTML = tekshtml;
        })

}

const sembunyikanraportsemester = (namasiswa) => {
    fetch(constlinknilai + "?action=showhideraportsemester&kelas=" + idNamaKelas + "&namasiswa=" + namasiswa + "&aksi=hide")
        .then(m => m.json())
        .then(k => {
            alert(k.result);
            listpublikasiraportsemester();
        })
        .catch(er => alert(er))
}

const tampilkanraportsemester = (namasiswa) => {
    fetch(constlinknilai + "?action=showhideraportsemester&kelas=" + idNamaKelas + "&namasiswa=" + namasiswa + "&aksi=show")
        .then(m => m.json())
        .then(k => {
            alert(k.result);
            listpublikasiraportsemester();
        })
        .catch(er => alert(er))
}


const publikasikanraportsemester = () => {
    //    alert("publikasikanraportpts()");
    let btn = document.querySelector(".tombolpublikasiraportsemester");
    btn.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Proses Publikasi";
    let divraportsemester = document.getElementById("halamanraport");
    let op = document.getElementById("listnamaraport").options;
    let indop = document.getElementById("listnamaraport").selectedIndex;
    let namarsemester = op[indop].text;
    if (divraportsemester.innerHTML == "") {
        alert("Raport Belum siap dipublikasikan");
        btn.innerHTML = "<i class='fa fa-globe'></i> Publikasikan";
    } else {
        let confr = confirm("Anda yakin ingin mempublikasikan raport ini kepada siswa yang bersangkutan? Anda masih bisa mengedit nilai dari tampilan raport tersebut. Data yang berhasil dipublikasikan akan muncul di tabel Publikasikan Raport Semester\n\n Klik [OK] untuk melanjutkan.\n\n Klik [NO] untuk membatalkan.");
        if (confr) {
            let tekhtml = divraportsemester.innerHTML;
            let dtext = document.getElementById("tempattextarea");
            dtext.textContent = tekhtml.replace(/contenteditable=\"true\"/gi, "");
            let htmlraport = window.btoa(unescape(encodeURIComponent(dtext.textContent)));
            let data = new FormData();
            data.append("kelas", idNamaKelas);
            data.append("namasiswa", namarsemester);
            data.append("htmlraport", htmlraport);
            fetch(constlinknilai + "?action=publikasiraportsemester", {
                method: "post",
                body: data
            }).then(m => m.json())
                .then(r => {
                    alert(r.result + "Publikasi");
                    btn.innerHTML = "<i class='fa fa-globe'></i> Publikasikan";
                })
                .catch(er => alert(er))
            // console.log(namarpts);
            // console.log(htmlraport);

            // let namasubfolder = e.parameter.kelas;
            // let namasiswa = e.parameter.namasiswa;
            // let htmlraport = e.parameter.htmlraport;
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
let tmbl_raportus = document.querySelector(".btnolah_raport");
let headerraportus = ["no", "namasiswa", "raport_4_1_AGAMA", "raport_4_1_PKN", "raport_4_1_BINDO", "raport_4_1_MTK", "raport_4_1_IPA", "raport_4_1_IPS", "raport_4_1_SBDP", "raport_4_1_PJOK", "raport_4_1_BSUND", "raport_4_2_AGAMA", "raport_4_2_PKN", "raport_4_2_BINDO", "raport_4_2_MTK", "raport_4_2_IPA", "raport_4_2_IPS", "raport_4_2_SBDP", "raport_4_2_PJOK", "raport_4_2_BSUND", "raport_5_1_AGAMA", "raport_5_1_PKN", "raport_5_1_BINDO", "raport_5_1_MTK", "raport_5_1_IPA", "raport_5_1_IPS", "raport_5_1_SBDP", "raport_5_1_PJOK", "raport_5_1_BSUND", "raport_5_2_AGAMA", "raport_5_2_PKN", "raport_5_2_BINDO", "raport_5_2_MTK", "raport_5_2_IPA", "raport_5_2_IPS", "raport_5_2_SBDP", "raport_5_2_PJOK", "raport_5_2_BSUND", "raport_6_1_AGAMA", "raport_6_1_PKN", "raport_6_1_BINDO", "raport_6_1_MTK", "raport_6_1_IPA", "raport_6_1_IPS", "raport_6_1_SBDP", "raport_6_1_PJOK", "raport_6_1_BSUND", "raport_6_2_AGAMA", "raport_6_2_PKN", "raport_6_2_BINDO", "raport_6_2_MTK", "raport_6_2_IPA", "raport_6_2_IPS", "raport_6_2_SBDP", "raport_6_2_PJOK", "raport_6_2_BSUND"]
let headerolaus = ["no", "namasiswa", "ut_AGAMA", "ut_PKN", "ut_BINDO", "ut_MTK", "ut_IPA", "ut_IPS", "ut_SBDP", "ut_PJOK", "ut_BSUND", "up_AGAMA", "up_PKN", "up_BINDO", "up_MTK", "up_IPA", "up_IPS", "up_SBDP", "up_PJOK", "up_BSUND"];
let arrmapelus = ["AGAMA", "PKN", "BINDO", "MTK", "IPA", "IPS", "SBDP", "PJOK", "BSUND"];
let objraportall = {};
tmbl_raportus.addEventListener("click", function () {
    //animasikan dulu
    document.querySelector(".loadingraportus").innerHTML = "<i class='fa fa-spin fa-spinner'></i> Sedang mengambil data di Server";
    //definsikan table mana ia bekerja;
    let bodytabel = document.querySelector(".tabelolahraportus").getElementsByTagName("tbody")[0];

    let tab = "RaportAllKelas";
    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {
            // console.log(k);
            let tekshtml = "";
            if (k.result == 0) {
                alert("Anda belum pernah menyimpan data rekap raport dari kelas 4 sampai dengan kelas 6. Aplikasi akan menggenarate hanya data raport kelas 6 semester 2 saja.");

                let dataki3 = document.querySelector(".datarekapkd3");
                let dataki4 = document.querySelector(".datarekapkd4");
                if (dataki3 === null || dataki4 === null) {
                    alert("Nilai Raport Kelas 6 Semester 2 tidak berhasil digenerate. pastikan Anda telah membuka Rekap Nilai K-3 dan K-4 di menu tab Olah Nilai");
                }
                let i = 0;
                do {
                    if (dataki3 === null || dataki4 === null) {
                        //     alert("Nilai Raport Kelas 6 Semester 2 tidak berhasil digenerate. pastikan Anda telah membuka Rekap Nilai K-3 dan K-4 di menu tab Olah Nilai");
                        tekshtml += `<tr><td>${i + 1}</td><td style="position:sticky;position:-webkit-sticky;left:0px;;box-shadow: inset 0 0 1px #000000">${jsondatasiswa[i].pd_nama}</td>`;
                        for (p = 0; p < 54; p++) {
                            tekshtml += `<td contenteditable="true"></td>`;
                        }
                        tekshtml += "</tr>";

                    } else {
                        let data = raportsemester12(i)
                        tekshtml += `<tr><td>${i + 1}</td><td style="position:sticky;position:-webkit-sticky;left:0px;;box-shadow: inset 0 0 1px #000000">${jsondatasiswa[i].pd_nama}</td>`;
                        for (j = 0; j < 45; j++) {
                            tekshtml += `<td contenteditable="true"></td>`;
                        }

                        tekshtml += `<td contenteditable="true">${data["AGAMA"]}</td>`;
                        tekshtml += `<td contenteditable="true">${data["PKN"]}</td>`;
                        tekshtml += `<td contenteditable="true">${data["BINDO"]}</td>`;
                        tekshtml += `<td contenteditable="true">${data["MTK"]}</td>`;
                        tekshtml += `<td contenteditable="true">${data["IPA"]}</td>`;
                        tekshtml += `<td contenteditable="true">${data["IPS"]}</td>`;
                        tekshtml += `<td contenteditable="true">${data["SBDP"]}</td>`;
                        tekshtml += `<td contenteditable="true">${data["PJOK"]}</td>`;
                        tekshtml += `<td contenteditable="true">${data["BSUND"]}</td>`;
                        tekshtml += "</tr>";
                    }
                    i++

                }
                while (i < jsondatasiswa.length);
                bodytabel.innerHTML = tekshtml;

                document.querySelector(".loadingraportus").innerHTML = "";


            } else {

                document.querySelector(".loadingraportus").innerHTML = "";
                objraportall = k.data;
                for (a = 0; a < k.data.length; a++) {
                    tekshtml += `<tr><td>${a + 1}</td>`
                    for (b = 1; b < headerraportus.length; b++) {
                        if (b == 1) {
                            tekshtml += `<td style="position:sticky;position:-webkit-sticky;left:0px;;box-shadow: inset 0 0 1px #000000">${k.data[a][headerraportus[b]]}</td>`

                        } else {
                            tekshtml += `<td contenteditable="true">${k.data[a][headerraportus[b]]}</td>`

                        }

                    }
                    tekshtml += `</tr>`
                }

                bodytabel.innerHTML = tekshtml;
                //console.log(objraportall)

            }
        })
        .catch(err => console.log(err))

})


tt_tabraport7 = document.querySelector(".tabtabraport4_1");
tt_tabraport8 = document.querySelector(".tabtabraport4_2");
tt_tabraport9 = document.querySelector(".tabtabraport5_1");
tt_tabraport10 = document.querySelector(".tabtabraport5_2");
tt_tabraport11 = document.querySelector(".tabtabraport6_1");
tt_tabraport12 = document.querySelector(".tabtabraport6_2");

tt_tabraport7.addEventListener("click", function () {
    tt_tabraport7.className += " activee";
    tt_tabraport8.className = tt_tabraport8.className.replace(/activee/g, "");
    tt_tabraport9.className = tt_tabraport9.className.replace(/activee/g, "");
    tt_tabraport10.className = tt_tabraport10.className.replace(/activee/g, "");
    tt_tabraport11.className = tt_tabraport11.className.replace(/activee/g, "");
    tt_tabraport12.className = tt_tabraport12.className.replace(/activee/g, "");

    let classph = document.querySelector(".tabelolahraportus").getElementsByTagName("thead")[0].rows[0].cells[0];
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("divtabelolahraport");
    // let tabel = document.querySelector(".tabelolahraportus");
    // let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    // let x = classph.offsetLeft;
    //div.scrollLeft = (x - y);
    div.scrollLeft = 0;
})
tt_tabraport8.addEventListener("click", function () {
    tt_tabraport8.className += " activee";
    tt_tabraport7.className = tt_tabraport7.className.replace(/activee/g, "");
    tt_tabraport9.className = tt_tabraport9.className.replace(/activee/g, "");
    tt_tabraport10.className = tt_tabraport10.className.replace(/activee/g, "");
    tt_tabraport11.className = tt_tabraport11.className.replace(/activee/g, "");
    tt_tabraport12.className = tt_tabraport12.className.replace(/activee/g, "");

    let classph = document.querySelector(".tabelolahraportus").getElementsByTagName("thead")[0].rows[0].cells[3];
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("divtabelolahraport");
    let tabel = document.querySelector(".tabelolahraportus");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);

})
tt_tabraport9.addEventListener("click", function () {
    tt_tabraport9.className += " activee";
    tt_tabraport7.className = tt_tabraport7.className.replace(/activee/g, "");
    tt_tabraport8.className = tt_tabraport8.className.replace(/activee/g, "");
    tt_tabraport10.className = tt_tabraport10.className.replace(/activee/g, "");
    tt_tabraport11.className = tt_tabraport11.className.replace(/activee/g, "");
    tt_tabraport12.className = tt_tabraport12.className.replace(/activee/g, "");

    let classph = document.querySelector(".tabelolahraportus").getElementsByTagName("thead")[0].rows[0].cells[4];
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("divtabelolahraport");
    let tabel = document.querySelector(".tabelolahraportus");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);

})
tt_tabraport10.addEventListener("click", function () {
    tt_tabraport10.className += " activee";
    tt_tabraport7.className = tt_tabraport7.className.replace(/activee/g, "");
    tt_tabraport8.className = tt_tabraport8.className.replace(/activee/g, "");
    tt_tabraport9.className = tt_tabraport9.className.replace(/activee/g, "");
    tt_tabraport11.className = tt_tabraport11.className.replace(/activee/g, "");
    tt_tabraport12.className = tt_tabraport12.className.replace(/activee/g, "");

    let classph = document.querySelector(".tabelolahraportus").getElementsByTagName("thead")[0].rows[0].cells[5];
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("divtabelolahraport");
    let tabel = document.querySelector(".tabelolahraportus");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);

})
tt_tabraport11.addEventListener("click", function () {
    tt_tabraport11.className += " activee";
    tt_tabraport7.className = tt_tabraport7.className.replace(/activee/g, "");
    tt_tabraport8.className = tt_tabraport8.className.replace(/activee/g, "");
    tt_tabraport9.className = tt_tabraport9.className.replace(/activee/g, "");
    tt_tabraport10.className = tt_tabraport10.className.replace(/activee/g, "");
    tt_tabraport12.className = tt_tabraport12.className.replace(/activee/g, "");

    let classph = document.querySelector(".tabelolahraportus").getElementsByTagName("thead")[0].rows[0].cells[6];
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("divtabelolahraport");
    let tabel = document.querySelector(".tabelolahraportus");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);

})
tt_tabraport12.addEventListener("click", function () {
    tt_tabraport12.className += " activee";
    tt_tabraport7.className = tt_tabraport7.className.replace(/activee/g, "");
    tt_tabraport8.className = tt_tabraport8.className.replace(/activee/g, "");
    tt_tabraport9.className = tt_tabraport9.className.replace(/activee/g, "");
    tt_tabraport10.className = tt_tabraport10.className.replace(/activee/g, "");
    tt_tabraport11.className = tt_tabraport11.className.replace(/activee/g, "");

    let classph = document.querySelector(".tabelolahraportus").getElementsByTagName("thead")[0].rows[0].cells[7];
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("divtabelolahraport");
    let tabel = document.querySelector(".tabelolahraportus");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);

})

let tmblrpts12 = document.querySelector(".tabupdateraport");
tmblrpts12.addEventListener("click", function () {
    try {
        let i = 0;
        let sel = document.querySelector(".tabelolahraportus").getElementsByTagName("tbody")[0];
        do {
            let data = raportsemester12(i)
            sel.rows[i].cells[47].innerHTML = data["AGAMA"];
            sel.rows[i].cells[48].innerHTML = data["PKN"];
            sel.rows[i].cells[49].innerHTML = data["BINDO"];
            sel.rows[i].cells[50].innerHTML = data["MTK"];
            sel.rows[i].cells[51].innerHTML = data["IPA"];
            sel.rows[i].cells[52].innerHTML = data["IPS"];
            sel.rows[i].cells[53].innerHTML = data["SBDP"];
            sel.rows[i].cells[54].innerHTML = data["PJOK"];
            sel.rows[i].cells[55].innerHTML = data["BSUND"];
            //  arr.push(data);
            i++
        }
        while (i < jsondatasiswa.length)

    } catch (err) { alert(`Terjadi kesalahan (${err}), data-data berikut harus sudah dilengkapi dan diload(dibuka terlebih dahulu. yaitu: \n\n - Pastikan data agama seluruh siswa terisi \n - pastikan Anda sudah membuka Rekap KI3 dan Ki-4`) };


})

const raportsemester12 = (i) => {
    let datakd3 = algoritmakurtilas(i);
    let datakd4 = algoritmaketerampilan(i);
    let nkd3 = datakd3["datarraport"];
    let nkd4 = datakd4["datarraport"];
    let agama = jsondatasiswa[i].pd_agama;
    let defagama = ["ISLAM", "KRISTEN", "KATHOLIK", "HINDU", "BUDHA", "KHONGHUCU"];
    let kodeagama = ["PAI", "PKRIS", "PKATO", "PHIND", "PBUDH", "PKONG"];
    let indekagama = (agama !== "") ? defagama.indexOf(agama) : "";
    let acuanagama = kodeagama[indekagama];

    // for(i = 0 ;  i < jsondatasiswa.length;i++){
    // };
    //agama//
    //pkn;
    let objek = {};
    objek["namasiswa"] = jsondatasiswa[i].pd_nama;

    //nilai agama = 
    let kd3mapel1 = nkd3.findIndex(agama => agama["raport_" + acuanagama]);
    let kd4mapel1 = nkd4.findIndex(agama => agama["raportk4_" + acuanagama]);
    let nskd3mapel1 = nkd3[kd3mapel1]["raport_" + acuanagama];
    let nskd4mapel1 = nkd4[kd4mapel1]["raportk4_" + acuanagama];
    let intk3mapel1 = (nskd3mapel1 == "") ? 0 : nskd3mapel1;
    let intk4mapel1 = (nskd4mapel1 == "") ? 0 : nskd4mapel1;
    let nasmapel1 = (intk3mapel1 + intk4mapel1) / 2;
    let namapel1 = Math.round(nasmapel1);
    objek["AGAMA"] = namapel1;

    let kd3mapel2 = nkd3.findIndex(pkn => pkn["raport_PKN"]);
    let kd4mapel2 = nkd4.findIndex(pkn => pkn["raportk4_PKN"]);
    let nskd3mapel2 = nkd3[kd3mapel2]["raport_PKN"];
    let nskd4mapel2 = nkd4[kd4mapel2]["raportk4_PKN"];
    let intk3mapel2 = (nskd3mapel2 == "") ? 0 : nskd3mapel2;
    let intk4mapel2 = (nskd4mapel2 == "") ? 0 : nskd4mapel2;
    let nasmapel2 = (intk3mapel2 + intk4mapel2) / 2;
    let namapel2 = Math.round(nasmapel2);
    objek["PKN"] = namapel2;

    let kd3mapel3 = nkd3.findIndex(bindo => bindo["raport_BINDO"]);
    let kd4mapel3 = nkd4.findIndex(bindo => bindo["raportk4_BINDO"]);
    let nskd3mapel3 = nkd3[kd3mapel3]["raport_BINDO"];
    let nskd4mapel3 = nkd4[kd4mapel3]["raportk4_BINDO"];
    let intk3mapel3 = (nskd3mapel3 == "") ? 0 : nskd3mapel3;
    let intk4mapel3 = (nskd4mapel3 == "") ? 0 : nskd4mapel3;
    let nasmapel3 = (intk3mapel3 + intk4mapel3) / 2;
    let namapel3 = Math.round(nasmapel3);
    objek["BINDO"] = namapel3;


    let kd3mapel4 = nkd3.findIndex(mtk => mtk["raport_MTK"]);
    let kd4mapel4 = nkd4.findIndex(mtk => mtk["raportk4_MTK"]);
    let nskd3mapel4 = nkd3[kd3mapel4]["raport_MTK"];
    let nskd4mapel4 = nkd4[kd4mapel4]["raportk4_MTK"];
    let intk3mapel4 = (nskd3mapel4 == "") ? 0 : nskd3mapel4;
    let intk4mapel4 = (nskd4mapel4 == "") ? 0 : nskd4mapel4;
    let nasmapel4 = (intk3mapel4 + intk4mapel4) / 2;
    let namapel4 = Math.round(nasmapel4);
    objek["MTK"] = namapel4;


    let kd3mapel5 = nkd3.findIndex(ipa => ipa["raport_IPA"]);
    let kd4mapel5 = nkd4.findIndex(ipa => ipa["raportk4_IPA"]);
    let nskd3mapel5 = nkd3[kd3mapel5]["raport_IPA"];
    let nskd4mapel5 = nkd4[kd4mapel5]["raportk4_IPA"];
    let intk3mapel5 = (nskd3mapel5 == "") ? 0 : nskd3mapel5;
    let intk4mapel5 = (nskd4mapel5 == "") ? 0 : nskd4mapel5;
    let nasmapel5 = (intk3mapel5 + intk4mapel5) / 2;
    let namapel5 = Math.round(nasmapel5);
    objek["IPA"] = namapel5;

    let kd3mapel6 = nkd3.findIndex(ips => ips["raport_IPS"]);
    let kd4mapel6 = nkd4.findIndex(ips => ips["raportk4_IPS"]);
    let nskd3mapel6 = nkd3[kd3mapel6]["raport_IPS"];
    let nskd4mapel6 = nkd4[kd4mapel6]["raportk4_IPS"];
    let intk3mapel6 = (nskd3mapel6 == "") ? 0 : nskd3mapel6;
    let intk4mapel6 = (nskd4mapel6 == "") ? 0 : nskd4mapel6;
    let nasmapel6 = (intk3mapel6 + intk4mapel6) / 2;
    let namapel6 = Math.round(nasmapel6);
    objek["IPS"] = namapel6;

    let kd3mapel7 = nkd3.findIndex(k => k["raport_SBDP"]);
    let kd4mapel7 = nkd4.findIndex(k => k["raportk4_SBDP"]);
    let nskd3mapel7 = nkd3[kd3mapel7]["raport_SBDP"];
    let nskd4mapel7 = nkd4[kd4mapel7]["raportk4_SBDP"];
    let intk3mapel7 = (nskd3mapel7 == "") ? 0 : nskd3mapel7;
    let intk4mapel7 = (nskd4mapel7 == "") ? 0 : nskd4mapel7;
    let nasmapel7 = (intk3mapel7 + intk4mapel7) / 2;
    let namapel7 = Math.round(nasmapel7);
    objek["SBDP"] = namapel7;


    let kd3mapel8 = nkd3.findIndex(k => k["raport_PJOK"]);
    let kd4mapel8 = nkd4.findIndex(k => k["raportk4_PJOK"]);
    let nskd3mapel8 = nkd3[kd3mapel8]["raport_PJOK"];
    let nskd4mapel8 = nkd4[kd4mapel8]["raportk4_PJOK"];
    let intk3mapel8 = (nskd3mapel8 == "") ? 0 : nskd3mapel8;
    let intk4mapel8 = (nskd4mapel8 == "") ? 0 : nskd4mapel8;
    let nasmapel8 = (intk3mapel8 + intk4mapel8) / 2;
    let namapel8 = Math.round(nasmapel8);
    objek["PJOK"] = namapel8;

    let kd3mapel9 = nkd3.findIndex(k => k["raport_BSUND"]);
    let kd4mapel9 = nkd4.findIndex(k => k["raportk4_BSUND"]);
    let nskd3mapel9 = nkd3[kd3mapel9]["raport_BSUND"];
    let nskd4mapel9 = nkd4[kd4mapel9]["raportk4_BSUND"];
    let intk3mapel9 = (nskd3mapel9 == "") ? 0 : nskd3mapel9;
    let intk4mapel9 = (nskd4mapel9 == "") ? 0 : nskd4mapel9;
    let nasmapel9 = (intk3mapel9 + intk4mapel9) / 2;
    let namapel9 = Math.round(nasmapel9);
    objek["BSUND"] = namapel9;

    // console.log(objek);
    return objek





}


const simpanolahijazah = (namaclass) => {
    // let tab = "RaportAllKelas";
    // let head = JSON.stringify(headerraportus);
    let tab, head, load;
    if (namaclass == "tabelolahraportus") {
        tab = "RaportAllKelas";
        head = JSON.stringify(headerraportus);
        load = ".loadingraportus";
    } else if (namaclass == "tabelolahus") {
        tab = "olahus";
        head = JSON.stringify(headerolaus);
        load = ".loadingolahus"
    }

    let tb = document.querySelector("." + namaclass).getElementsByTagName("tbody")[0];
    let tombol = document.querySelector(load);
    tombol.innerHTML = "<i class='fa fa-spinner fa-spin'></i> proses kirim"
    let lr = tb.rows;
    let all = []
    for (r = 0; r < lr.length; r++) {
        let perbaris = lr[r];
        let isi = []
        for (s = 0; s < perbaris.cells.length; s++) {

            let d = perbaris.cells[s].innerHTML;

            isi.push(d);

        }
        all.push(isi)
    }

    //let headt = ["nourut", "namasiswa", "nilaipredikat", "indikmaks", "indikmin"];

    //let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;

    let tabel = JSON.stringify(all);


    let data = new FormData();
    data.append("tabel", tabel);
    data.append("head", head);
    data.append("kelas", idNamaKelas);
    data.append("prefiktab", tab);
    fetch(constlinknilai + "?action=inserttabeltospreadsheet", {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {
            alert(k.result + ", Aplikasi akan melakukan refresh data. Mohon tunggu sebentar..");
            tombol.innerHTML = k.result;
            tmbl_raportus.click()
            setTimeout(function () { tombol.innerHTML = ""; }, 1000);
        })
        .catch(er => alert(er))

}

const printolahijazah = (classtabel) => {
    // let isibody = document.getElementById("tabeldatanilaiki3").innerHTML;
    let judul, subjudul, titel, mediaprint;
    if (classtabel == "tabelolahraportus") {
        titel = "E-DURASA Data Raport";
        judul = "<h3 class='w3-center'>Data Nilai Raport Kelas 4 s/d Kelas 6</h3>";
        subjudul = `<h3 class='w3-center'>Kelas ${idNamaKelas} Tahun Pelajaran ${idTeksTapel}</h3>`;
        mediaprint = "landscape";
    } else if (classtabel == "tabelrekapraportus") {
        titel = "E-DURASA Rekap Raport US";
        judul = "<h3 class='w3-center'>Rekapitulasi Nilai Raport </h3>";
        subjudul = `<h3 class='w3-center'>Kelas ${idNamaKelas} Tahun Pelajaran ${idTeksTapel}</h3>`;
        mediaprint = "portrait";

    } else if (classtabel == "tabelolahus") {
        titel = "E-DURASA Pengolahan Nilai US";
        judul = "<h3 class='w3-center'>Data Pengolahan Nilai US (Tertulis & Praktek) </h3>";
        subjudul = `<h3 class='w3-center'>Kelas ${idNamaKelas} Tahun Pelajaran ${idTeksTapel}</h3>`;
        mediaprint = "portrait";

    } else if (classtabel == "tabelrekapus") {
        titel = "E-DURASA Rekap Nilai US";
        judul = "<h3 class='w3-center'>Rekapitulasi Nilai US (Tertulis & Praktek) </h3>";
        subjudul = `<h3 class='w3-center'>Kelas ${idNamaKelas} Tahun Pelajaran ${idTeksTapel}</h3>`;
        mediaprint = "portrait";

    } else if (classtabel == "tabelolahijazah") {
        titel = "E-DURASA Pengolahan Nilai Ijazah";
        judul = "<h3 class='w3-center'>Data Pengolahan Nilai Ijazah </h3>";
        subjudul = `<h3 class='w3-center'>Kelas ${idNamaKelas} Tahun Pelajaran ${idTeksTapel}</h3>`;
        mediaprint = "portrait";

    } else if (classtabel == "tabelnilaiijazahfix") {
        titel = "E-DURASA Daftar Nilai Ijazah";
        judul = "<h3 class='w3-center'>Data  Nilai Ijazah </h3>";
        subjudul = `<h3 class='w3-center'>Kelas ${idNamaKelas} Tahun Pelajaran ${idTeksTapel}</h3>`;
        mediaprint = "portrait";

    }
    else {
        titel = "BELUM ADA JUDUL";
        judul = "<h3 class='w3-center'>BELUM ADA JUDUL </h3>";
        subjudul = `<h3 class='w3-center'>Kelas ${idNamaKelas} Tahun Pelajaran ${idTeksTapel}</h3>`;

    }


    let isibody = judul + subjudul + "<br/><br/>";
    isibody += document.querySelector("." + classtabel).outerHTML;//.replace("w3-tiny", "");
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>${titel}</title>`;
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
            size: A4 ${mediaprint};
            max-height:100%;
            max-width:100%;
            
            }
    }
    </style>`;


    body.innerHTML = `${isibody}<br/><br/>`;
    body.innerHTML += '<div style="float:left;position:relative;margin-left:50px;text-align:center">Mengetahui,<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><br/><u><b>' + idNamaKepsek + '</b></u><br/>NIP. ' + idNipKepsek + '</div>';
    body.innerHTML += '<div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ', ' + tanggalfull(new Date()) + '<br/>' + idJenisGuru + '<br/><br/><br/><br/><br/><b><u>' + namauser + '</u></b><br/>NIP. ' + idNipGuruKelas + '</div>';



    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();
}

const excelolahijazah = (classtabel) => {
    let judul;
    if (classtabel == "tabelolahraportus") {

        judul = "Data Nilai Raport Kelas 4 s/d Kelas 6";

    } else if (classtabel == "tabelrekapraportus") {

        judul = "Rekapitulasi Nilai Raport";


    } else if (classtabel == "tabelolahus") {

        judul = "Data Pengolahan Nilai US (Tertulis & Praktek)";


    } else if (classtabel == "tabelrekapus") {

        judul = "Rekapitulasi Nilai US (Tertulis & Praktek)";


    } else if (classtabel == "tabelolahijazah") {

        judul = "Data Pengolahan Nilai Ijazah";


    } else if (classtabel == "tabelnilaiijazahfix") {

        judul = "Data  Nilai Ijazah ";


    }
    else {
        judul = "BELUM ADA JUDUL";

    }

    let tabelsumber = document.querySelector("." + classtabel);
    let divto = document.getElementById("datasiswaprint");
    let headsumber = tabelsumber.getElementsByTagName("thead")[0];
    let bodysumber = tabelsumber.getElementsByTagName("tbody")[0];
    let jumlahkolom = bodysumber.rows[0].cells.length;

    let tekshtml = `<table class="versi-table w3-tiny" id="tabeltabelolahijazah">
    <tr>
        <td colspan="${jumlahkolom}">${judul}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}"> ${idNamaSekolah.toUpperCase()}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Kelas ${idNamaKelas} Tahun Pelajaran ${idTeksTapel}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}"></td>
        
    <tr>
    ${headsumber.innerHTML}
    ${bodysumber.innerHTML.replace(/\./g, ",")}
    <tr>
         
    <tr>`


    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Mengetahui, </td>
    <td></td>
    `;
    let sisakolom = jumlahkolom - 11;
    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${jlo.kota}, ${tanggalfull(new Date())}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Kepala ${idNamaSekolah} </td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${idJenisGuru} ${idNamaKelas}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>
    <tr></tr>
    <tr></tr>
    <tr></tr>
    `;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3"><b><u>${idNamaKepsek}</u></b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3"><b><u>${namauser}</u></b></td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">NIP. ${idNipKepsek}</b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">NIP. ${idNipGuruKelas}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `</table>`;
    divto.innerHTML = tekshtml
    $("#tabeltabelolahijazah").table2excel({

        name: "Worksheet Name",
        filename: judul + " " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 3,
        barisatas: 5

    });
    divto.innerHTML = "";

}

///////////////////////////////////////////////////////////////////////////
let ob_rekapraport = {};
let ob_rekapus = {};
let tmbl_rekapraport = document.querySelector(".btn_rekapraport");
tmbl_rekapraport.addEventListener("click", function () {
    let bodytabel = document.querySelector(".tabelolahraportus").getElementsByTagName("tbody")[0];
    let bodytabelrekap = document.querySelector(".tabelrekapraportus").getElementsByTagName("tbody")[0];

    if (bodytabel.innerHTML == "") {
        alert("Anda belum membuka Menu Accordion OLAH RAPORT");
        return;
    }
    let i = 0;//2 + 9 + 9 + 9  
    let tekshtml = "";
    let arr = []
    do {
        let obj = {};
        obj["indek"] = i;
        tekshtml += `<tr><td>${i + 1}</td><td>${jsondatasiswa[i].pd_nama}</td>`;
        obj["namasiswa"] = jsondatasiswa[i].pd_nama;
        //agama
        let n_4_1 = (bodytabel.rows[i].cells[2].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[2].innerHTML);
        let n_4_2 = (bodytabel.rows[i].cells[11].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[11].innerHTML);
        let n_5_1 = (bodytabel.rows[i].cells[20].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[20].innerHTML);
        let n_5_2 = (bodytabel.rows[i].cells[29].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[29].innerHTML);
        let n_6_1 = (bodytabel.rows[i].cells[38].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[38].innerHTML);
        let n_6_2 = (bodytabel.rows[i].cells[47].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[47].innerHTML);
        let na = n_4_1 + n_4_2 + n_5_1 + n_5_2 + n_6_1 + n_6_2;
        // tekshtml += `<td>${Math.round(na / 6)}</td>`;
        // obj["AGAMA"] = Math.round(na / 6);
        tekshtml += `<td>${(na / 6).toFixed(2)}</td>`;
        obj["AGAMA"] = (na / 6).toFixed(2);


        //pkn
        n_4_1 = (bodytabel.rows[i].cells[3].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[3].innerHTML);
        n_4_2 = (bodytabel.rows[i].cells[12].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[12].innerHTML);
        n_5_1 = (bodytabel.rows[i].cells[21].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[21].innerHTML);
        n_5_2 = (bodytabel.rows[i].cells[30].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[30].innerHTML);
        n_6_1 = (bodytabel.rows[i].cells[39].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[39].innerHTML);
        n_6_2 = (bodytabel.rows[i].cells[48].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[48].innerHTML);
        na = n_4_1 + n_4_2 + n_5_1 + n_5_2 + n_6_1 + n_6_2;
        // tekshtml += `<td>${Math.round(na / 6)}</td>`;
        // obj["PKN"] = Math.round(na / 6);
        tekshtml += `<td>${(na / 6).toFixed(2)}</td>`;
        obj["PKN"] = (na / 6).toFixed(2);
        //bindo
        n_4_1 = (bodytabel.rows[i].cells[4].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[4].innerHTML);
        n_4_2 = (bodytabel.rows[i].cells[13].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[13].innerHTML);
        n_5_1 = (bodytabel.rows[i].cells[22].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[22].innerHTML);
        n_5_2 = (bodytabel.rows[i].cells[31].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[31].innerHTML);
        n_6_1 = (bodytabel.rows[i].cells[40].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[40].innerHTML);
        n_6_2 = (bodytabel.rows[i].cells[49].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[49].innerHTML);
        na = n_4_1 + n_4_2 + n_5_1 + n_5_2 + n_6_1 + n_6_2;
        // tekshtml += `<td>${Math.round(na / 6)}</td>`;
        // obj["BINDO"] = Math.round(na / 6);
        tekshtml += `<td>${(na / 6).toFixed(2)}</td>`;
        obj["BINDO"] = (na / 6).toFixed(2);
        //mtk
        n_4_1 = (bodytabel.rows[i].cells[5].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[5].innerHTML);
        n_4_2 = (bodytabel.rows[i].cells[14].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[14].innerHTML);
        n_5_1 = (bodytabel.rows[i].cells[23].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[23].innerHTML);
        n_5_2 = (bodytabel.rows[i].cells[32].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[32].innerHTML);
        n_6_1 = (bodytabel.rows[i].cells[41].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[41].innerHTML);
        n_6_2 = (bodytabel.rows[i].cells[50].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[50].innerHTML);
        na = n_4_1 + n_4_2 + n_5_1 + n_5_2 + n_6_1 + n_6_2;
        // tekshtml += `<td>${Math.round(na / 6)}</td>`;
        // obj["MTK"] = Math.round(na / 6);
        tekshtml += `<td>${(na / 6).toFixed(2)}</td>`;
        obj["MTK"] = (na / 6).toFixed(2);

        //ipa
        n_4_1 = (bodytabel.rows[i].cells[6].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[6].innerHTML);
        n_4_2 = (bodytabel.rows[i].cells[15].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[15].innerHTML);
        n_5_1 = (bodytabel.rows[i].cells[24].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[24].innerHTML);
        n_5_2 = (bodytabel.rows[i].cells[33].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[33].innerHTML);
        n_6_1 = (bodytabel.rows[i].cells[42].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[42].innerHTML);
        n_6_2 = (bodytabel.rows[i].cells[51].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[51].innerHTML);
        na = n_4_1 + n_4_2 + n_5_1 + n_5_2 + n_6_1 + n_6_2;
        // tekshtml += `<td>${Math.round(na / 6)}</td>`;
        // obj["IPA"] = Math.round(na / 6);
        tekshtml += `<td>${(na / 6).toFixed(2)}</td>`;
        obj["IPA"] = (na / 6).toFixed(2);
        //ips
        n_4_1 = (bodytabel.rows[i].cells[7].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[7].innerHTML);
        n_4_2 = (bodytabel.rows[i].cells[16].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[16].innerHTML);
        n_5_1 = (bodytabel.rows[i].cells[25].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[25].innerHTML);
        n_5_2 = (bodytabel.rows[i].cells[34].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[34].innerHTML);
        n_6_1 = (bodytabel.rows[i].cells[43].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[43].innerHTML);
        n_6_2 = (bodytabel.rows[i].cells[52].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[52].innerHTML);
        na = n_4_1 + n_4_2 + n_5_1 + n_5_2 + n_6_1 + n_6_2;
        // tekshtml += `<td>${Math.round(na / 6)}</td>`;
        // obj["IPS"] = Math.round(na / 6);
        tekshtml += `<td>${(na / 6).toFixed(2)}</td>`;
        obj["IPS"] = (na / 6).toFixed(2);
        //sbdp
        n_4_1 = (bodytabel.rows[i].cells[8].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[8].innerHTML);
        n_4_2 = (bodytabel.rows[i].cells[17].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[17].innerHTML);
        n_5_1 = (bodytabel.rows[i].cells[26].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[26].innerHTML);
        n_5_2 = (bodytabel.rows[i].cells[35].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[35].innerHTML);
        n_6_1 = (bodytabel.rows[i].cells[44].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[44].innerHTML);
        n_6_2 = (bodytabel.rows[i].cells[53].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[53].innerHTML);
        na = n_4_1 + n_4_2 + n_5_1 + n_5_2 + n_6_1 + n_6_2;
        // tekshtml += `<td>${Math.round(na / 6)}</td>`;
        // obj["SBDP"] = Math.round(na / 6);
        tekshtml += `<td>${(na / 6).toFixed(2)}</td>`;
        obj["SBDP"] = (na / 6).toFixed(2);
        //pjok
        n_4_1 = (bodytabel.rows[i].cells[9].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[9].innerHTML);
        n_4_2 = (bodytabel.rows[i].cells[18].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[18].innerHTML);
        n_5_1 = (bodytabel.rows[i].cells[27].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[27].innerHTML);
        n_5_2 = (bodytabel.rows[i].cells[36].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[36].innerHTML);
        n_6_1 = (bodytabel.rows[i].cells[45].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[45].innerHTML);
        n_6_2 = (bodytabel.rows[i].cells[54].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[54].innerHTML);
        na = n_4_1 + n_4_2 + n_5_1 + n_5_2 + n_6_1 + n_6_2;
        // tekshtml += `<td>${Math.round(na / 6)}</td>`;
        // obj["PJOK"] = Math.round(na / 6);
        tekshtml += `<td>${(na / 6).toFixed(2)}</td>`;
        obj["PJOK"] = (na / 6).toFixed(2);
        //bsund
        n_4_1 = (bodytabel.rows[i].cells[10].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[10].innerHTML);
        n_4_2 = (bodytabel.rows[i].cells[19].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[19].innerHTML);
        n_5_1 = (bodytabel.rows[i].cells[28].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[28].innerHTML);
        n_5_2 = (bodytabel.rows[i].cells[37].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[37].innerHTML);
        n_6_1 = (bodytabel.rows[i].cells[46].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[46].innerHTML);
        n_6_2 = (bodytabel.rows[i].cells[55].innerHTML == "") ? 0 : parseInt(bodytabel.rows[i].cells[55].innerHTML);
        na = n_4_1 + n_4_2 + n_5_1 + n_5_2 + n_6_1 + n_6_2;
        // tekshtml += `<td>${Math.round(na / 6)}</td></tr>`;
        // obj["BSUND"] = Math.round(na / 6);
        tekshtml += `<td>${(na / 6).toFixed(2)}</td></tr>`;
        obj["BSUND"] = (na / 6).toFixed(2);

        arr.push(obj);
        i++;
    }
    while (i < jsondatasiswa.length);
    bodytabelrekap.innerHTML = tekshtml;
    ob_rekapraport = arr;

})

let jsonnilaiustertulis = {};
let jsonnilaiuspraktek = {};
let tmbl_btnolah_us = document.querySelector(".btnolah_us");
tmbl_btnolah_us.addEventListener("click", function () {
    //kesiapan data dulu coy....
    let datakkm = koleksiarraymapelaktif();
    let datamapel = datakkm.kodemapel;
    let mapelagama = datamapel.filter(k => (k == "PAI" || k == "PKRIS" || k == "PKATO" || k == "PHIND" || k == "PBUDH" || k == "PKONG"));
    let mapelnonagama = datamapel.filter(k => !(k == "PAI" || k == "PKRIS" || k == "PKATO" || k == "PHIND" || k == "PBUDH" || k == "PKONG"));
    let tab = "olahus";
    let tabel = document.querySelector(".tabelolahus").getElementsByTagName("tbody")[0];
    let animasidiv = document.querySelector(".loadingolahus");
    animasidiv.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Sedang mencoba mengambil data Pengolahan US Server.`;



    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {
            let tekshtml = "";
            if (k.result == 0) {
                alert("Anda belum pernah menyimpan data Olah Nilai US di server, data akan mengambil dari nilai US tertulis dan/atau US Praktek yang telah Anda laksanakan.");


                ambildataserverus();

            } else {
                let hasil = k.data;
                for (a = 0; a < hasil.length; a++) {
                    tekshtml += `<tr><td>${a + 1}</td><td style="position:sticky;position:-webkit-sticky;left:0px;;box-shadow: inset 0 0 1px #000000">${hasil[a].namasiswa}</td>
                    <td contenteditable="true">${hasil[a].ut_AGAMA}</td>
                    <td contenteditable="true">${hasil[a].ut_PKN}</td>
                    <td contenteditable="true">${hasil[a].ut_BINDO}</td>
                    <td contenteditable="true">${hasil[a].ut_MTK}</td>
                    <td contenteditable="true">${hasil[a].ut_IPA}</td>
                    <td contenteditable="true">${hasil[a].ut_IPS}</td>
                    <td contenteditable="true">${hasil[a].ut_SBDP}</td>
                    <td contenteditable="true">${hasil[a].ut_PJOK}</td>
                    <td contenteditable="true">${hasil[a].ut_BSUND}</td>
                    
                    <td contenteditable="true">${hasil[a].up_AGAMA}</td>
                    <td contenteditable="true">${hasil[a].up_PKN}</td>
                    <td contenteditable="true">${hasil[a].up_BINDO}</td>
                    <td contenteditable="true">${hasil[a].up_MTK}</td>
                    <td contenteditable="true">${hasil[a].up_IPA}</td>
                    <td contenteditable="true">${hasil[a].up_IPS}</td>
                    <td contenteditable="true">${hasil[a].up_SBDP}</td>
                    <td contenteditable="true">${hasil[a].up_PJOK}</td>
                    <td contenteditable="true">${hasil[a].up_BSUND}</td>
                    </tr>
                    `;
                }
                tabel.innerHTML = tekshtml;

                animasidiv.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Sedang menggenerate data Nilai Pengolahan US.`;
                document.querySelector(".statusdataolahus").innerHTML = " Status Data: Nilai Pengolahan US";
                animasidiv.innerHTML = "";
            }
        })
        .catch(er => console.log(er))


});
const ambildataserverus = async () => {
    let tidakadadiustertulis = [];
    let tidakadadiuspraktek = [];
    try {
        let defagama = ["ISLAM", "KRISTEN", "KATHOLIK", "HINDU", "BUDHA", "KHONGHUCU"];
        let kodeagama = ["PAI", "PKRIS", "PKATO", "PHIND", "PBUDH", "PKONG"];
        let animasidiv = document.querySelector(".loadingolahus");
        animasidiv.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Sedang mencoba mengambil data Nilai US Asli di Server.`;
        //ambil data US TERTULIS

        await fetch(constlinknilai + "?action=lihatnilairekap&tab=ustertulis&kelas=" + idNamaKelas)
            .then(m => m.json())
            .then(r => {
                let sumberkd = r.banyakkd;
                let datanilai = r.records;
                // console.log(datanilai);
                let arr = [];

                let i = 0;
                do {
                    let objdata = {};
                    objdata["indek"] = i;
                    objdata["nama"] = jsondatasiswa[i].pd_nama;
                    objdata["agamasiswa"] = jsondatasiswa[i].pd_agama;
                    //nilaiagama


                    let indekmapel = defagama.findIndex(k => k == jsondatasiswa[i].pd_agama);
                    let indeksiswa = datanilai.findIndex(o => o["namasiswa"] == jsondatasiswa[i].pd_nama);
                    if (indeksiswa == -1) {
                        objdata["AGAMA"] = "";
                        objdata["PKN"] = "";
                        objdata["BINDO"] = "";
                        objdata["MTK"] = "";
                        objdata["IPA"] = "";
                        objdata["IPS"] = "";
                        objdata["SBDP"] = "";
                        objdata["PJOK"] = "";
                        objdata["BSUND"] = "";
                        //alert("Siswa atas nama " + jsondatasiswa[i].pd_nama + " tidak ada di server US Tertulis, pastikan nilai siswa tersebut telah diinput ke server")
                        tidakadadiustertulis.push(jsondatasiswa[i].pd_nama);
                    }
                    else {


                        let indekkodemapel = kodeagama[indekmapel]; // "PAI";
                        // let kdagama = sumberkd.filter(l => l.indexOf(indekkodemapel) > -1)
                        let kdagama = sumberkd.filter(l => l.indexOf(indekkodemapel) > -1);


                        // let nilaiagama = (kdagama.length == 0) ? 0 : datanilai[indeksiswa][kdagama];
                        let nilaiagama = (kdagama.length == 0) ? 0 : Object.keys(datanilai[indeksiswa]).filter(s => kdagama.indexOf(s) > -1).map(d => datanilai[indeksiswa][d]).reduce((a, b) => parseFloat(a) + parseFloat(b));;
                        let pembagiagama = (kdagama.length == 0) ? 0 : kdagama.length;
                        let naAgama = (nilaiagama == 0) ? 0 : Math.round(nilaiagama / pembagiagama);
                        // console.log(naAgama);
                        objdata["AGAMA"] = naAgama

                        let kdpkn = sumberkd.filter(l => l.indexOf("PKN") > -1);
                        let nilaipkn = (kdpkn.length == 0) ? 0 : Object.keys(datanilai[indeksiswa]).filter(s => kdpkn.indexOf(s) > -1).map(d => datanilai[indeksiswa][d]).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagipkn = (kdpkn.length == 0) ? 0 : kdpkn.length;
                        let napkn = (nilaipkn == 0) ? 0 : Math.round(nilaipkn / pembagipkn);
                        objdata["PKN"] = napkn;


                        let kdbindo = sumberkd.filter(l => l.indexOf("BINDO") > -1);
                        let nilaibindo = (kdbindo.length == 0) ? 0 : Object.keys(datanilai[indeksiswa]).filter(s => kdbindo.indexOf(s) > -1).map(d => datanilai[indeksiswa][d]).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagibindo = (kdbindo.length == 0) ? 0 : kdbindo.length;
                        let nabindo = (nilaibindo == 0) ? 0 : Math.round(nilaibindo / pembagibindo);
                        objdata["BINDO"] = nabindo;

                        let kdmtk = sumberkd.filter(l => l.indexOf("MTK") > -1);
                        let nilaimtk = (kdmtk.length == 0) ? 0 : Object.keys(datanilai[indeksiswa]).filter(s => kdmtk.indexOf(s) > -1).map(d => datanilai[indeksiswa][d]).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagimtk = (kdmtk.length == 0) ? 0 : kdmtk.length;
                        let namtk = (nilaimtk == 0) ? 0 : Math.round(nilaimtk / pembagimtk);
                        objdata["MTK"] = namtk;

                        let kdipa = sumberkd.filter(l => l.indexOf("IPA") > -1);
                        let nilaiipa = (kdipa.length == 0) ? 0 : Object.keys(datanilai[indeksiswa]).filter(s => kdipa.indexOf(s) > -1).map(d => datanilai[indeksiswa][d]).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagiipa = (kdipa.length == 0) ? 0 : kdipa.length;
                        let naipa = (nilaiipa == 0) ? 0 : Math.round(nilaiipa / pembagiipa);
                        objdata["IPA"] = naipa;

                        let kdips = sumberkd.filter(l => l.indexOf("IPS") > -1);
                        let nilaiips = (kdips.length == 0) ? 0 : Object.keys(datanilai[indeksiswa]).filter(s => kdips.indexOf(s) > -1).map(d => datanilai[indeksiswa][d]).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagiips = (kdips.length == 0) ? 0 : kdips.length;
                        let naips = (nilaiips == 0) ? 0 : Math.round(nilaiips / pembagiips);
                        objdata["IPS"] = naips;

                        let kdsbdp = sumberkd.filter(l => l.indexOf("SBDP") > -1);
                        let nilaisbdp = (kdsbdp.length == 0) ? 0 : Object.keys(datanilai[indeksiswa]).filter(s => kdsbdp.indexOf(s) > -1).map(d => datanilai[indeksiswa][d]).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagisbdp = (kdsbdp.length == 0) ? 0 : kdsbdp.length;
                        let nasbdp = (nilaisbdp == 0) ? 0 : Math.round(nilaisbdp / pembagisbdp);
                        objdata["SBDP"] = nasbdp;

                        let kdpjok = sumberkd.filter(l => l.indexOf("PJOK") > -1);
                        let nilaipjok = (kdpjok.length == 0) ? 0 : Object.keys(datanilai[indeksiswa]).filter(s => kdpjok.indexOf(s) > -1).map(d => datanilai[indeksiswa][d]).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagipjok = (kdpjok.length == 0) ? 0 : kdpjok.length;
                        // let napjok = Math.round(nilaipjok / kdpjok.length);
                        let napjok = (nilaipjok == 0) ? 0 : Math.round(nilaipjok / pembagipjok);
                        objdata["PJOK"] = napjok;

                        let kdbsund = sumberkd.filter(l => l.indexOf("BSUND") > -1);
                        let nilaibsund = (kdbsund.length == 0) ? 0 : Object.keys(datanilai[indeksiswa]).filter(s => kdbsund.indexOf(s) > -1).map(d => datanilai[indeksiswa][d]).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagibsund = (kdbsund.length == 0) ? 0 : kdbsund.length;
                        let nabsund = (nilaibsund == 0) ? 0 : Math.round(nilaibsund / pembagibsund);
                        objdata["BSUND"] = nabsund;
                    }
                    arr.push(objdata);
                    i++;

                }
                while (i < jsondatasiswa.length)
                jsonnilaiustertulis["naus"] = arr;
                //console.log(jsonnilaiustertulis);

            })
            .catch(err => {
                console.log(err);
                alert("Ada siswa Anda yang belum mengikuti ini. Periksa nilai US Tertulisnya. Jika benar-benar tidak mengikuti US Tertulis dan ingin menampilkan seluruh data, maka kasih nilai siswa tersebut dengan nilai [ periksa Time Line Nilai US Tertulis]")
            });

        //ambil data US PRAKTEK
        await fetch(constlinknilai + "?action=lihatnilairekap&tab=uspraktek&kelas=" + idNamaKelas)
            .then(m => m.json())
            .then(r => {
                let sumberkd = r.banyakkd;
                let datanilai = r.records;
                // console.log(datanilai);
                let arr = [];

                let i = 0;
                do {
                    let objdata = {};
                    objdata["indek"] = i;
                    objdata["nama"] = jsondatasiswa[i].pd_nama;
                    objdata["agamasiswa"] = jsondatasiswa[i].pd_agama;
                    //nilaiagama


                    let indekmapel = defagama.findIndex(k => k == jsondatasiswa[i].pd_agama);
                    let indeksiswa = datanilai.findIndex(o => o["namasiswa"] == jsondatasiswa[i].pd_nama);
                    if (indeksiswa == -1) {
                        objdata["AGAMA"] = "";
                        objdata["PKN"] = "";
                        objdata["BINDO"] = "";
                        objdata["MTK"] = "";
                        objdata["IPA"] = "";
                        objdata["IPS"] = "";
                        objdata["SBDP"] = "";
                        objdata["PJOK"] = "";
                        objdata["BSUND"] = "";
                        tidakadadiuspraktek.push(jsondatasiswa[i].pd_nama);
                    }
                    else {
                        let indekkodemapel = kodeagama[indekmapel]; // "PAI";
                        // let kdagama = sumberkd.filter(l => l.indexOf(indekkodemapel) > -1)
                        let kdagama = sumberkd.filter(l => l.indexOf(indekkodemapel) > -1);


                        // let nilaiagama = (kdagama.length == 0) ? 0 : datanilai[indeksiswa][kdagama];
                        let nilaiagama = (kdagama.length == 0) ? "" : Object.keys(datanilai[indeksiswa]).filter(s => kdagama.indexOf(s) > -1).map(d => parseFloat((datanilai[indeksiswa][d] == "") ? 0 : datanilai[indeksiswa][d])).reduce((a, b) => parseFloat(a) + parseFloat(b));;
                        let pembagiagama = (kdagama.length == 0) ? "" : kdagama.length;
                        let naAgama = (nilaiagama == "") ? "" : Math.round(nilaiagama / pembagiagama);
                        // console.log(nilaiagama);
                        objdata["AGAMA"] = (isNaN(naAgama)) ? 0 : naAgama;

                        let kdpkn = sumberkd.filter(l => l.indexOf("PKN") > -1);
                        let nilaipkn = (kdpkn.length == 0) ? "" : Object.keys(datanilai[indeksiswa]).filter(s => kdpkn.indexOf(s) > -1).map(d => parseFloat((datanilai[indeksiswa][d] == "") ? 0 : datanilai[indeksiswa][d])).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagipkn = (kdpkn.length == 0) ? "" : kdpkn.length;
                        let napkn = (nilaipkn == "") ? "" : Math.round(nilaipkn / pembagipkn);
                        objdata["PKN"] = (isNaN(napkn)) ? 0 : napkn;


                        let kdbindo = sumberkd.filter(l => l.indexOf("BINDO") > -1);
                        let nilaibindo = (kdbindo.length == 0) ? "" : Object.keys(datanilai[indeksiswa]).filter(s => kdbindo.indexOf(s) > -1).map(d => parseFloat((datanilai[indeksiswa][d] == "") ? 0 : datanilai[indeksiswa][d])).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagibindo = (kdbindo.length == 0) ? "" : kdbindo.length;
                        let nabindo = (nilaibindo == "") ? "" : Math.round(nilaibindo / pembagibindo);
                        objdata["BINDO"] = (isNaN(nabindo)) ? 0 : nabindo;

                        let kdmtk = sumberkd.filter(l => l.indexOf("MTK") > -1);
                        let nilaimtk = (kdmtk.length == 0) ? "" : Object.keys(datanilai[indeksiswa]).filter(s => kdmtk.indexOf(s) > -1).map(d => parseFloat((datanilai[indeksiswa][d] == "") ? 0 : datanilai[indeksiswa][d])).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagimtk = (kdmtk.length == 0) ? "" : kdmtk.length;
                        let namtk = (nilaimtk == "") ? "" : Math.round(nilaimtk / pembagimtk);
                        objdata["MTK"] = (isNaN(namtk)) ? 0 : namtk;

                        let kdipa = sumberkd.filter(l => l.indexOf("IPA") > -1);
                        let nilaiipa = (kdipa.length == 0) ? "" : Object.keys(datanilai[indeksiswa]).filter(s => kdipa.indexOf(s) > -1).map(d => parseFloat((datanilai[indeksiswa][d] == "") ? 0 : datanilai[indeksiswa][d])).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagiipa = (kdipa.length == 0) ? "" : kdipa.length;
                        let naipa = (nilaiipa == "") ? "" : Math.round(nilaiipa / pembagiipa);
                        objdata["IPA"] = (isNaN(naipa)) ? 0 : naipa;

                        let kdips = sumberkd.filter(l => l.indexOf("IPS") > -1);
                        let nilaiips = (kdips.length == 0) ? "" : Object.keys(datanilai[indeksiswa]).filter(s => kdips.indexOf(s) > -1).map(d => parseFloat((datanilai[indeksiswa][d] == "") ? 0 : datanilai[indeksiswa][d])).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagiips = (kdips.length == 0) ? "" : kdips.length;
                        let naips = (nilaiips == "") ? "" : Math.round(nilaiips / pembagiips);
                        objdata["IPS"] = (isNaN(naips)) ? 0 : naips;

                        let kdsbdp = sumberkd.filter(l => l.indexOf("SBDP") > -1);
                        let nilaisbdp = (kdsbdp.length == 0) ? "" : Object.keys(datanilai[indeksiswa]).filter(s => kdsbdp.indexOf(s) > -1).map(d => parseFloat((datanilai[indeksiswa][d] == "") ? 0 : datanilai[indeksiswa][d])).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagisbdp = (kdsbdp.length == 0) ? "" : kdsbdp.length;
                        let nasbdp = (nilaisbdp == "") ? "" : Math.round(nilaisbdp / pembagisbdp);
                        objdata["SBDP"] = (isNaN(nasbdp)) ? 0 : nasbdp;

                        let kdpjok = sumberkd.filter(l => l.indexOf("PJOK") > -1);
                        let nilaipjok = (kdpjok.length == 0) ? "" : Object.keys(datanilai[indeksiswa]).filter(s => kdpjok.indexOf(s) > -1).map(d => parseFloat((datanilai[indeksiswa][d] == "") ? 0 : datanilai[indeksiswa][d])).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagipjok = (kdpjok.length == 0) ? "" : kdpjok.length;
                        // let napjok = Math.round(nilaipjok / kdpjok.length);
                        let napjok = (nilaipjok == "") ? "" : Math.round(nilaipjok / pembagipjok);
                        objdata["PJOK"] = (isNaN(napjok)) ? 0 : napjok;

                        let kdbsund = sumberkd.filter(l => l.indexOf("BSUND") > -1);
                        let nilaibsund = (kdbsund.length == 0) ? "" : Object.keys(datanilai[indeksiswa]).filter(s => kdbsund.indexOf(s) > -1).map(d => parseFloat((datanilai[indeksiswa][d] == "") ? 0 : datanilai[indeksiswa][d])).reduce((a, b) => parseFloat(a) + parseFloat(b));
                        let pembagibsund = (kdbsund.length == 0) ? "" : kdbsund.length;
                        let nabsund = (nilaibsund == "") ? "" : Math.round(nilaibsund / pembagibsund);
                        objdata["BSUND"] = (isNaN(nabsund)) ? 0 : nabsund;
                    }
                    arr.push(objdata);
                    i++;

                }
                while (i < jsondatasiswa.length)
                jsonnilaiustertulis["nauspraktek"] = arr;


                //console.log(jsonnilaiustertulis);

            })

            .catch(err => {
                console.log(err);
                alert("Ada siswa Anda yang belum mengikuti ini. Periksa nilai US Tertulisnya. Jika benar-benar tidak mengikuti US Tertulis dan ingin menampilkan seluruh data, maka kasih nilai siswa tersebut dengan nilai [ periksa Time Line Nilai US Praktek]");

            });

        let tekshtml = "";
        let tabel = document.querySelector(".tabelolahus").getElementsByTagName("tbody")[0];
        for (i = 0; i < jsondatasiswa.length; i++) {
            tekshtml += `<tr><td>${i + 1}</td><td style="position:sticky;position:-webkit-sticky;left:0px;;box-shadow: inset 0 0 1px #000000">${jsondatasiswa[i].pd_nama}</td>`;
            for (j = 0; j < 9; j++) {
                let mp = arrmapelus[j]
                tekshtml += `<td contenteditable="true">${jsonnilaiustertulis["naus"][i][mp]}</td>`;
            }
            for (k = 0; k < 9; k++) {
                let mpk = arrmapelus[k]
                tekshtml += `<td contenteditable="true">${jsonnilaiustertulis["nauspraktek"][i][mpk]}</td>`
            }
            tekshtml += "</td>";
            tabel.innerHTML = tekshtml;
            document.querySelector(".statusdataolahus").innerHTML = " Status Data: Nilai US Asli";
            document.querySelector(".loadingolahus").innerHTML = "";
            animasidiv.innerHTML = "";
        }
    } catch (err) {

        document.querySelector(".loadingolahus").innerHTML = "";
        if (tidakadadiustertulis.length == jsondatasiswa.length) {
            alert("Anda belum pernah membuat data US Tertulis");
            document.querySelector(".loadingolahus").innerHTML += "<br/>US Tertulis tidak lengkap";
        } else if (tidakadadiustertulis.length > 0) {
            alert("Siswa-siswa berikut Tidak terdeteksi di server US Tertulis. Pastikan siswa berikut telah mengikuti US Tertulis: " + tidakadadiustertulis.join("\n"));
            document.querySelector(".loadingolahus").innerHTML += "<br/>US Tertulis tidak lengkap";
        } else {

        }

        if (tidakadadiuspraktek.length == jsondatasiswa.length) {
            alert("Anda belum pernah membuat data US Praktek");
            document.querySelector(".loadingolahus").innerHTML += "<br/>US Tertulis tidak lengkap";
        } else if (tidakadadiuspraktek.length > 0) {
            alert("Siswa-siswa berikut Tidak terdeteksi di server US Praktek. Pastikan siswa berikut telah mengikuti US Tertulis: " + tidakadadiuspraktek.join("\n"))
            document.querySelector(".loadingolahus").innerHTML += "<br/>US Tertulis tidak lengkap";
        } else {

        }

    }

}

let t_ust = document.querySelector(".tabtabustertulis")
let t_usp = document.querySelector(".tabtabuspraktik")
t_ust.addEventListener("click", function () {
    t_ust.className += " activee";
    t_usp.className = t_usp.className.replace(/activee/g, "");
    let classph = document.querySelector(".tabelolahus").getElementsByTagName("thead")[0].rows[0].cells[3];
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("divtabelolahus");
    let tabel = document.querySelector(".tabelolahus");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = 0;//(x - y);  
})
t_usp.addEventListener("click", function () {
    t_usp.className += " activee";
    t_ust.className = t_ust.className.replace(/activee/g, "");
    let classph = document.querySelector(".tabelolahus").getElementsByTagName("thead")[0].rows[0].cells[3];
    if (classph == null) {
        alert("Data Belum siap, tunggu sesaat lagi ....");
        return
    }
    let div = document.getElementById("divtabelolahus");
    let tabel = document.querySelector(".tabelolahus");
    let y = tabel.getElementsByTagName("thead")[0].rows[0].cells[1].offsetWidth;
    let x = classph.offsetLeft;
    div.scrollLeft = (x - y);
})

let b_rekus = document.querySelector(".btn_rekapus");
b_rekus.addEventListener("click", function () {
    //jaga-jaga jika USer belum pernah klik tab accordion Olah US;
    let cek = document.querySelector(".tabelolahus").getElementsByTagName("tbody")[0];
    if (cek.innerHTML == "") {
        alert("Maaf, Anda belum membuka tab OLAH US. Silakan buka laman tersebut untuk menggenerate hasil nilai");

    }
    document.querySelector(".tabelrekapus").getElementsByTagName("tbody")[0].innerHTML = `<tr>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    <td><i class="fa fa-spin fa-spinner"></i></td>
    </tr>`
    let defagama = ["ISLAM", "KRISTEN", "KATHOLIK", "HINDU", "BUDHA", "KHONGHUCU"];
    let kodeagama = ["PAI", "PKRIS", "PKATO", "PHIND", "PBUDH", "PKONG"];
    let datakkm = koleksiarraymapelaktif();
    let datamapel = datakkm.kodemapel;
    let mapelagama = datamapel.filter(k => kodeagama.indexOf(k) > -1);
    let mapelnonagama = datamapel.filter(k => !(kodeagama.indexOf(k) > -1));
    //console.log(datamapel)
    //console.log(mapelnonagama)

    //cek mapel yang telah ada nilai US-nya
    fetch(constlinknilai + "?action=lihatnilairekap&tab=uspraktek&kelas=" + idNamaKelas)
        .then(m => m.json())
        .then(r => {
            let sumberkd = r.banyakkd;
            //console.log(sumberkd);
            let pembagimapelus = {};
            for (i = 0; i < datamapel.length; i++) {
                let kodemapel = datamapel[i];
                let n_indek = sumberkd.filter(l => l.indexOf(kodemapel) > -1);
                let adatidak = (n_indek > -1) ? 1 : 2;

                pembagimapelus[datamapel[i]] = adatidak;
            }
            //console.log(pembagimapelus);
            let tekshtml = `<table class="w3-tiny versi-table">
            <thead>
            <tr>
                <th>Kode Mapel</th>
                <th>Identitas Mapel</th>
                <th>Pelaksanaan US Praktik(Ya/Tidak)</th>
            </tr>
            </thead><tbody>
            <tr><td rowspan="${mapelagama.length}">Agama</td>`
            let namamapel = document.getElementById("namamapelraport_" + mapelagama[0]).innerHTML
            let cekcek = (pembagimapelus[mapelagama[0]] == 1) ? "Tidak" : "Ya";
            if (cekcek == "Ya") {
                tekshtml += `<td class="w3-yellow">${mapelagama[0]} (${namamapel})</td><td class="w3-yellow">${cekcek}</td></tr>`
            } else {
                tekshtml += `<td>${mapelagama[0]} (${namamapel})</td><td>${cekcek}</td></tr>`

            }


            if (mapelagama.length > 1) {
                for (j = 1; j < mapelagama.length; j++) {
                    namamapel = document.getElementById("namamapelraport_" + mapelagama[j]).innerHTML
                    cekcek = (pembagimapelus[mapelagama[j]] == 1) ? "Tidak" : "Ya";
                    if (cekcek == "Ya") {
                        tekshtml += `<tr>
                        <td class="w3-yellow">${mapelagama[j]} (${namamapel})</td>
                        <td class="w3-yellow">${cekcek}</td>
                                </tr>
                                `

                    } else {
                        tekshtml += `<tr>
                                <td>${mapelagama[j]} (${namamapel})</td>
                                <td>${cekcek}</td>
                                </tr>

                                `
                    }
                }
            }
            for (k = 0; k < mapelnonagama.length; k++) {
                namamapel = document.getElementById("namamapelraport_" + mapelnonagama[k]).innerHTML;
                cekcek = (pembagimapelus[mapelnonagama[k]] == 1) ? "Tidak" : "Ya";
                if (cekcek == "Ya") {
                    tekshtml += `<tr>
                            <td>${mapelnonagama[k]}</td>
                            <td class="w3-yellow">${namamapel}</td>
                            <td class="w3-yellow">${cekcek}</td>
                            </tr>`
                } else {
                    tekshtml += `<tr>
                            <td>${mapelnonagama[k]}</td>
                            <td>${namamapel}</td>
                            <td>${cekcek}</td>
                            </tr>`

                }


            }
            tekshtml += `</tbody></table>Keterangan: 
            <ul><li>Data Mata pelajaran Agama berdasarkan pendeteksian agama siswa di kelas Anda.
            </li>
            <liL>Pelaksanaan US di tabel ini berdasarkan data nilai siswa yang telah diterima di server Lamaso berdasarkan kategori US Praktek.
            </li>
            <li>"Ya" artinya Anda telah melaksanakan US Praktek pada mata pelajaran tersebut berdasarkan data nilai siswa yang telah masuk ke server
            </li><li>"Tidak" artinya Anda telah melaksanakan US Praktek pada mata pelajaran tersebut berdasarkan data nilai siswa yang telah masuk ke server
            </li>
            </ul>
            `;
            document.querySelector(".deteksimapeluspraktek").innerHTML = tekshtml;
            let tabelus = document.querySelector(".tabelolahus").getElementsByTagName("tbody")[0];
            let lr = tabelus.rows.length;
            //let l = 0;
            let ht = "";
            //console.log(lr)
            // do {
            let arr = [];
            for (l = 0; l < lr; l++) {
                //identitas
                //console.log(l);
                let obj = {};
                obj["indek"] = l;
                obj["namasiswa"] = jsondatasiswa[l].pd_nama;
                let namasiswaus = tabelus.rows[l].cells[1].innerHTML;
                let agamasiswa = jsondatasiswa[l].pd_agama;
                ht += `<tr><td>${l + 1}</td>
                <td>${namasiswaus}</td>
                `
                //agama;
                let us = (tabelus.rows[l].cells[2].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[2].innerHTML);
                let up = (tabelus.rows[l].cells[11].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[11].innerHTML);
                let in_agama = defagama.indexOf(agamasiswa);
                let kagama = kodeagama[in_agama]
                let pembagi = pembagimapelus[kagama];
                // let na1 = Math.round((us + up) / pembagi);
                let na1 = ((us + up) / pembagi).toFixed(2);
                obj["AGAMA"] = na1;
                // console.log(na1);
                ht += (pembagi == 2) ? `<td class="w3-yellow">${na1}</td>` : `<td>${na1}</td>`;

                //pkn;
                us = (tabelus.rows[l].cells[3].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[3].innerHTML);
                up = (tabelus.rows[l].cells[12].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[12].innerHTML);
                pembagi = pembagimapelus["PKN"];
                // na1 = Math.round((us + up) / pembagi);
                na1 = ((us + up) / pembagi).toFixed(2);
                ht += (pembagi == 2) ? `<td class="w3-yellow">${na1}</td>` : `<td>${na1}</td>`;
                obj["PKN"] = na1;

                //bindo;
                us = (tabelus.rows[l].cells[4].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[4].innerHTML);
                up = (tabelus.rows[l].cells[13].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[13].innerHTML);
                pembagi = pembagimapelus["BINDO"];
                // na1 = Math.round((us + up) / pembagi);
                na1 = ((us + up) / pembagi).toFixed(2);
                ht += (pembagi == 2) ? `<td class="w3-yellow">${na1}</td>` : `<td>${na1}</td>`;
                obj["BINDO"] = na1;

                //MTK;
                us = (tabelus.rows[l].cells[5].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[5].innerHTML);
                up = (tabelus.rows[l].cells[14].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[14].innerHTML);
                pembagi = pembagimapelus["MTK"];
                // na1 = Math.round((us + up) / pembagi);
                na1 = ((us + up) / pembagi).toFixed(2);
                ht += (pembagi == 2) ? `<td class="w3-yellow">${na1}</td>` : `<td>${na1}</td>`;
                obj["MTK"] = na1;

                //IPA;
                us = (tabelus.rows[l].cells[6].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[6].innerHTML);
                up = (tabelus.rows[l].cells[15].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[15].innerHTML);
                pembagi = pembagimapelus["IPA"];
                // na1 = Math.round((us + up) / pembagi);
                na1 = ((us + up) / pembagi).toFixed(2);
                ht += (pembagi == 2) ? `<td class="w3-yellow">${na1}</td>` : `<td>${na1}</td>`;
                obj["IPA"] = na1;

                //IPS;
                us = (tabelus.rows[l].cells[7].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[7].innerHTML);
                up = (tabelus.rows[l].cells[16].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[16].innerHTML);
                pembagi = pembagimapelus["IPS"];
                // na1 = Math.round((us + up) / pembagi);
                na1 = ((us + up) / pembagi).toFixed(2);
                ht += (pembagi == 2) ? `<td class="w3-yellow">${na1}</td>` : `<td>${na1}</td>`;
                obj["IPS"] = na1;

                //SBDP;
                us = (tabelus.rows[l].cells[8].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[8].innerHTML);
                up = (tabelus.rows[l].cells[17].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[17].innerHTML);
                pembagi = pembagimapelus["SBDP"];
                // na1 = Math.round((us + up) / pembagi);
                na1 = ((us + up) / pembagi).toFixed(2);
                ht += (pembagi == 2) ? `<td class="w3-yellow">${na1}</td>` : `<td>${na1}</td>`;
                obj["SBDP"] = na1;
                //PJOK;
                us = (tabelus.rows[l].cells[9].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[9].innerHTML);
                up = (tabelus.rows[l].cells[18].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[18].innerHTML);
                pembagi = pembagimapelus["PJOK"];
                // na1 = Math.round((us + up) / pembagi);
                na1 = ((us + up) / pembagi).toFixed(2);
                ht += (pembagi == 2) ? `<td class="w3-yellow">${na1}</td>` : `<td>${na1}</td>`;
                obj["PJOK"] = na1;
                //BSUND;
                us = (tabelus.rows[l].cells[10].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[10].innerHTML);
                up = (tabelus.rows[l].cells[19].innerHTML == "") ? 0 : parseFloat(tabelus.rows[l].cells[19].innerHTML);
                pembagi = pembagimapelus["BSUND"];
                // na1 = Math.round((us + up) / pembagi);
                na1 = ((us + up) / pembagi).toFixed(2);
                obj["BSUND"] = na1;
                ht += (pembagi == 2) ? `<td class="w3-yellow">${na1}</td></tr>` : `<td>${na1}</td></tr>`;
                arr.push(obj)
            }


            document.querySelector(".tabelrekapus").getElementsByTagName("tbody")[0].innerHTML = ht;// + `Ket: Sel yang berwarna kuning adalah nilai rata-rata US Tertulis dan US Praktik`;
            ob_rekapus = arr;



        })
        .catch(er => console.log(er))

})

let b_ij = document.querySelector(".btn_nilaiijazah");
b_ij.addEventListener("click", function () {
    if (ob_rekapraport.length === undefined || ob_rekapus.length === undefined) {
        console.log("undefined terdeteksi");
        alert("Maaf, Anda belum membuka Rekap Raport dan/atau Rekap US.")
        return
    }
    //let arrmapelus = ["AGAMA", "PKN", "BINDO", "MTK", "IPA", "IPS", "SBDP", "PJOK", "BSUND"];
    let thtml = "", thtmlr = "", mp, nr, nus, na, nb, ns, nrr;
    let tabelolah = document.querySelector(".tabelolahijazah").getElementsByTagName("tbody")[0];
    let tabelrekap = document.querySelector(".tabelnilaiijazahfix").getElementsByTagName("tbody")[0];
    for (i = 0; i < jsondatasiswa.length; i++) {
        ns = 0, nrr = 0;
        thtml += `<tr><td>${i + 1}</td><td style="position:sticky;position:-webkit-sticky;left:0px;;box-shadow: inset 0 0 1px #000000">${jsondatasiswa[i].pd_nama}</td>`;
        thtmlr += `<tr><td>${i + 1}</td><td style="position:sticky;position:-webkit-sticky;left:0px;;box-shadow: inset 0 0 1px #000000">${jsondatasiswa[i].pd_nama}</td>`;
        for (j = 0; j < arrmapelus.length; j++) {
            mp = arrmapelus[j];
            nr = (ob_rekapraport[i][mp] * 0.7).toFixed(2);
            nus = (ob_rekapus[i][mp] * 0.3).toFixed(2);
            na = (parseFloat(nr) + parseFloat(nus)).toFixed(2);
            nb = Math.round(parseFloat(nr) + parseFloat(nus));
            thtml += `<td>${nr}</td>`;
            thtml += `<td>${nus}</td>`;
            thtml += `<td>${na}</td>`;
            thtmlr += `<td>${nb}</td>`;
            ns += nb
        }
        nrr = (ns / 9).toFixed(2);

        thtml += "</tr>";
        thtmlr += `<td>${nrr}</td></tr>`;
    }

    tabelolah.innerHTML = thtml;
    tabelrekap.innerHTML = thtmlr;

});

let t_olij, t_fixij, d_olij, d_fixij;
t_olij = document.querySelector(".tabtabtabelolahijazah");
t_fixij = document.querySelector(".tabtabtabelnilaiijazahfix");

d_olij = document.querySelector(".idtabelolahijazah");
d_fixij = document.querySelector(".idtabelnilaiijazahfix");
t_olij.addEventListener("click", function () {
    d_olij.className = d_olij.className.replace("w3-hide", "w3-show")
    d_fixij.className = d_fixij.className.replace("w3-show", "w3-hide")
})
t_fixij.addEventListener("click", function () {
    d_olij.className = d_olij.className.replace("w3-show", "w3-hide")
    d_fixij.className = d_fixij.className.replace("w3-hide", "w3-show")
})

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// SURAT KETERANGAN KELULUSAN ///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
let t_skl = document.querySelector(".tabpengumumankelulusan");
t_skl.addEventListener("click", function () {
    let tabelrekap = document.querySelector(".tabelnilaiijazahfix").getElementsByTagName("tbody")[0];
    if (tabelrekap.innerHTML == "") {
        alert("Selain untuk SKL tanpa Nilai, Nilai Kelulusan belum bisa Anda lihat. Periksa seluruh komponen proses penilaian ijazah di menu Tab OLAH IJAZAH");
        return;
    }

    let div_select = document.getElementById("idselectnamakelulusan");
    let div_selectskhu = document.getElementById("idselectnamaskhu");
    let div_selectketraport = document.getElementById("idselectnamaketraport");
    let div_selectformatijazah = document.getElementById("idselectnamaformatijazah");
    let htmlopsi = "<option value='' selected>Pilih Nama Siswa</option>";
    for (a = 0; a < jsondatasiswa.length; a++) {
        htmlopsi += `<option value="${a}">${jsondatasiswa[a].pd_nama}</option>`
    }
    div_select.innerHTML = htmlopsi;
    div_selectskhu.innerHTML = htmlopsi;
    div_selectketraport.innerHTML = htmlopsi;
    div_selectformatijazah.innerHTML = htmlopsi;

    //document.querySelector(".htmlskhu").setAttribute("style", "background-image:url('https://drive.google.com/uc?export=view&id=1qcpzq9ABBR8WVMXOk38AEiKN8KRj6YH-');background-repeat: no-repeat;background-size: 100% 100%;padding:8% 10%")

})
const selectnamakelulusan = () => {
    let a = document.getElementById("idselectnamakelulusan");
    let b = a.selectedIndex;
    let c = a.options;
    let v = c[b].value;
    let t = c[b].text;

    let tabelrekap = document.querySelector(".tabelnilaiijazahfix").getElementsByTagName("tbody")[0];
    let nrr = tabelrekap.rows[v].cells[11].innerHTML;
    let dd = document.querySelector(".htmlkelulusan");
    let ttskl = document.querySelector("#idtglsuratskl").innerHTML;
    let noskl = document.querySelector("#idnosuratskl").innerHTML;
    let tt = document.querySelector(".divpublikasikelulusan");
    dd.className = dd.className.replace("w3-hide", "w3-show");
    tt.className = tt.className.replace("w3-show", "w3-hide");
    let ttl = tanggalfull(jsondatasiswa[v].pd_tanggallahir);
    let divhtml = `
    <div class="w3-container">
        <div class="w3-left w3-padding">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Lambang_Kota_Depok.png/371px-Lambang_Kota_Depok.png" style="width:100px"/>
        </div>
        <div class="w3-center w3-bottombar  w3-border-black">
            <h4>PEMERINTAH DAERAH ${jlo.idkota.toUpperCase()} ${jlo.kota.toUpperCase()}<br/>
            DINAS PENDIDIKAN ${jlo.idkota.toUpperCase()}  ${jlo.kota.toUpperCase()} 
            <br/><b  class="w3-xxlarge">${idNamaSekolah.toUpperCase()}</b></br/>
            <sub>Alamat : ${editalamatkopsurat.innerHTML}</sub></h4>
        </div>
    </div>
    <div class="w3-main w3-padding">
        <h4 class="w3-center">SURAT KETERANGAN KELULUSAN</h4>
        <h6 class="w3-center" contenteditable="true">No : ${noskl}</h6>
        <br/>
        <br/>
        <p class="w3-justify">
            Yang bertanda tangan di bawah ini, Kepala ${idNamaSekolah}, ${jlo.idkota} ${jlo.kota} menerangkan bahwa:
        </p>
       <table style="margin-left:20px">
            <tr>
                <td style="vertical-align:top">Nama</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].pd_nama}</td>
            </tr>
            <tr>
                <td style="vertical-align:top">Tempat, Tanggal Lahir</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].pd_tl}, ${ttl}</td>
            </tr>
            <tr>
                <td style="vertical-align:top">Nomor Induk Siswa (NIS)</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].nis}</td>
            </tr>
            <tr>
                <td style="vertical-align:top">Nomor Induk Siswa Nasional (NISN)</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].nisn}</td>
            </tr>
       </table>
       <div class="w3-justify">
                    Berdasarkan :<ul style="list-style-type:decimal"><li>Surat Edaran Menteri Pendidikan dan Kebudayaan Republik Indonesia Nomor 1 Tahun 2021, tentang peniadaan Ujian Nasional dan Ujian Kesetaraan serta Pelaksanaan Ujian Sekolah dalam Masa Darurat Penyebaran Corona Virus Deseases (Covid - 19).
                </li><li>Peraturan Sekretaris Jenderal Kementerian Pendidikan dan Kebudayaan Nomor 5 Tahun 2021, tentang Spesifikasi Teknis, Bentuk dan Tata Cara Pengisian Blangko Pengisian Ijazah Pendidikan Dasar dan Pendidikan Menengah Tahun Pelajaran 2020/2021.
                </li><li>Hasil Rapat Dewan Guru SD ${idNamaSekolah}. pada ${ttskl}, tentang Penetapan Kelulusan,
                </li></ul>
                Dengan ini nama tersebut di atas dinyatakan :

       </div>
        <div class="w3-center">
         <span class="w3-xxlarge w3-padding" > --- LULUS --- </span>
        </div>
        <br/>
        <div class="w3-clear"></div>
        Pada Satuan Pendidikan ${idNamaSekolah} Tahun Pelajaran 2020/2021 dengan nilai sebagai berikut :
        <table class="versi-table" style="margin:0 auto"><thead>
        
            <tr class="w3-aqua">
                <th>No</th>
                <th>Mata Pelajaran<br/>(Kurikulum 2013)</th>
                <th>Nilai Kelulusan</th>
            <tr>
        </thead>
        <tbody>
            <tr>
                <td colspan="3">Kelompok A</td>
            </tr>
                <tr>
                    <td>1</td>
                    <td class="rekapkelulusan_namamapel0"></td>
                    <td class="rekapkelulusan_nilaimapel0"></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td class="rekapkelulusan_namamapel1"></td>
                    <td class="rekapkelulusan_nilaimapel1"></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td class="rekapkelulusan_namamapel2"></td>
                    <td class="rekapkelulusan_nilaimapel2"></td>
                </tr>
                <tr>
                    <td>4</td>
                    <td class="rekapkelulusan_namamapel3"></td>
                    <td class="rekapkelulusan_nilaimapel3"></td>
                </tr>
                <tr>
                    <td>5</td>
                    <td class="rekapkelulusan_namamapel4"></td>
                    <td class="rekapkelulusan_nilaimapel4"></td>
                </tr>
                <tr>
                    <td>6</td>
                    <td class="rekapkelulusan_namamapel5"></td>
                    <td class="rekapkelulusan_nilaimapel5"></td>
                </tr>
                <tr>
                <td colspan="3">Kelompok B</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td class="rekapkelulusan_namamapel6"></td>
                    <td class="rekapkelulusan_nilaimapel6"></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td class="rekapkelulusan_namamapel7"></td>
                    <td class="rekapkelulusan_nilaimapel7"></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Muatan Lokal</td>
                    <td></td>
                </tr>
                
                <tr>
                    <td rowspan="3"></td>
                    <td class="rekapkelulusan_namamapel8"></td>
                    <td class="rekapkelulusan_nilaimapel8"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
                <tr class="w3-aqua">
                    <td colspan="2" >Rata-rata</td>
                    <td class="rekapkelulusan_ratarata">${nrr}</td>
                </tr>
        </tbody>
        </table>
        <br/><br/>
        <p class="w3-justify">
        Demikian Surat Keterangan ini dibuat, untuk dapat dipergunakan sebagaimana mestinya.
        </p>
        <div style="float:right;position:relative;text-align:left;right:50px">
                <table>
                    <tr>
                        <td>Ditetapkan di </td>
                        <td>:</td>
                        <td>${jlo.kota}</td>
                    </tr>
                    <tr>
                        <td>Pada Tanggal </td>
                        <td>:</td>
                        <td>15 Juni 2021</td>
                    </tr>
                    <tr>
                        <td colspan="3">Kepala ${idNamaSekolah}</td>
                    </tr>
                    <tr>
                        <td colspan="3" id="barcodepengumumankelulusan"></td>
                    </tr>
                    <tr>
                        <td colspan="3"><u><b>${idNamaKepsek}</b></u></td>
                    </tr>
                    <tr>
                        <td colspan="3">NIP. ${idNipKepsek}</td>
                    </tr>
                </table>
        </div>
        <div class="w3-clear"></div>





    </div> 
    
    `

    dd.innerHTML = divhtml;


    // alert(v + "   " + t);

    let mp, nr, nus, na, nb, ns = 0, nrrs = 0, namasubjek;

    for (j = 0; j < arrmapelus.length; j++) {
        mp = arrmapelus[j];
        nr = (ob_rekapraport[v][mp] * 0.7).toFixed(2);
        nus = (ob_rekapus[v][mp] * 0.3).toFixed(2);
        na = (parseFloat(nr) + parseFloat(nus)).toFixed(2);
        nb = Math.round(parseFloat(nr) + parseFloat(nus));
        if (mp == "AGAMA") {
            namasubjek = "Pendidikan Agama dan Budi Pekerti";
        } else {
            namasubjek = document.getElementById("namamapelraport_" + mp).innerHTML;

        }

        // divhtml += `<tr><td>${j + 1}</td>
        //                     <td>${namasubjek}</td>`;
        // // divhtml += `<td>${nr}</td>`;
        // // divhtml += `<td>${nus}</td>`;
        // divhtml += `<td>${ob_rekapraport[v][mp]}</td>`;
        // divhtml += `<td>${ob_rekapus[v][mp]}</td>`;
        // divhtml += `<td>${nb}</td></tr>`;
        let namamapel = ".rekapkelulusan_namamapel" + j;
        let nilaimapel = ".rekapkelulusan_nilaimapel" + j;
        document.querySelector(namamapel).innerHTML = namasubjek;
        document.querySelector(nilaimapel).innerHTML = nb;

        ns += parseFloat(nb)
    };

    nrrs = (ns / 9).toFixed(2);
    //document.querySelector(".rekapkelulusan_ratarata").innerHtml = nrr;
    let cek = document.querySelector("#cekbarcodekelulusan");
    if (cek.checked) {

        let teksbarkode = `Telah diketahui dan ditandatangani oleh Kepala ${idNamaSekolah} bahwa Surat Keterangan Kelulusan atas nama ${t} dengan nilai ijazah ${nrr}`;

        barcodekan('barcodepengumumankelulusan', teksbarkode);

    } else {
        document.getElementById("barcodepengumumankelulusan").innerHTML = "<br/><br/><br/>";

    }
}
const changebarcodekelulusan = () => {
    let dd = document.getElementById("ttdbarcodekelulusan")
    let ini = document.getElementById("cekbarcodekelulusan");
    if (ini.checked) {
        dd.innerHTML = "Tanda Tangan Barcode (Aktif)"
    } else {
        dd.innerHTML = "Tanda Tangan Barcode (Tidak Aktif)/Tidak menyertakan barcode tanda tangan"
    }

}
const selectnamaskhu = () => {
    let a = document.getElementById("idselectnamaskhu");
    let b = a.selectedIndex;
    let c = a.options;
    let v = c[b].value;
    let t = c[b].text;

    let tabelrekap = document.querySelector(".tabelnilaiijazahfix").getElementsByTagName("tbody")[0];
    let nrr = tabelrekap.rows[v].cells[11].innerHTML;
    let dd = document.querySelector(".htmlskhu");
    let tt = document.querySelector(".div_skhu");
    dd.className = dd.className.replace("w3-hide", "w3-show");
    tt.className = tt.className.replace("w3-show", "w3-hide");
    let ttl = tanggalfull(jsondatasiswa[v].pd_tanggallahir);

    let divhtml = `
    <div class="w3-container">
        <div class="w3-left w3-padding">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Lambang_Kota_Depok.png/371px-Lambang_Kota_Depok.png" style="width:100px"/>
        </div>
        <div class="w3-center w3-bottombar  w3-border-black">
            <h4>PEMERINTAH DAERAH ${jlo.idkota.toUpperCase()} ${jlo.kota.toUpperCase()}<br/>
            DINAS PENDIDIKAN ${jlo.idkota.toUpperCase()} ${jlo.kota.toUpperCase()} 
            <br/><b  class="w3-xxlarge">${idNamaSekolah.toUpperCase()}</b></br/>
            <sub>Alamat : ${editalamatkopsurat.innerHTML}</sub></h4>
        </div>
    </div>
    <div class="w3-main w3-padding">
        <h4 class="w3-center">SURAT KETERANGAN HASIL BELAJAR</h4>
        <h6 class="w3-center" contenteditable="">No : 42.2/... ... .../SD/VI/2021</h6>
        <br/>
        <br/>
        <p class="w3-justify">
        Yang bertanda tangan di bawah ini, Kepala ${idNamaSekolah}, ${jlo.idkota} ${jlo.kota} menerangkan bahwa:
        </p>
       <table style="margin-left:20px">
            <tr>
                <td style="vertical-align:top">Nama</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].pd_nama}</td>
            </tr>
            <tr>
            <td style="vertical-align:top">Tempat, Tanggal Lahir</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].pd_tl}, ${ttl}</td>
            </tr>
            <tr>
            <td style="vertical-align:top">Nomor Induk Siswa (NIS)</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].nis}</td>
            </tr>
            <tr>
            <td style="vertical-align:top">Nomor Induk Siswa Nasional (NISN)</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].nisn}</td>
            </tr>
       </table>
       <p class="w3-justify">
       Adalah benar bahwa siswa tersebut adalah siswa ${idNamaSekolah} telah mengikuti seluruh rangkaian kegiatan pendidikan sampai dengan Tahun Pelajaran ${idTeksTapel} di sekolah kami dan telah dinyatakan:
        </p>
        <div class="w3-center">
        <span class="w3-border w3-border-black w3-padding" >LULUS / <s>TIDAK LULUS</s> </span>
        </div><br/>
        <div class="w3-clear"></div>
        dengan rincian hasil belajar:
        <div style="overflow-x:auto">
        <table class="versi-table">
        <thead>
            <tr>
                <th>No</th>
                <th>Muatan Pelajaran <br/> (Kurikulum 2013)</th>
                <th>Rata-rata Raport</th>
                <th>Rata-rata US</th>
                <th>Nilai Ijazah <br/>(pembulatan)</th>
            </tr>
        </thead>
        <tbody>`
    let mp, nr, nus, na, nb, ns = 0, nrrs = 0, namasubjek;

    for (j = 0; j < arrmapelus.length; j++) {
        mp = arrmapelus[j];
        nr = (ob_rekapraport[v][mp] * 0.7).toFixed(2);
        nus = (ob_rekapus[v][mp] * 0.3).toFixed(2);
        na = (parseFloat(nr) + parseFloat(nus)).toFixed(2);
        nb = Math.round(parseFloat(nr) + parseFloat(nus));
        if (mp == "AGAMA") {
            namasubjek = "Pendidikan Agama dan Budi Pekerti";
        } else {
            namasubjek = document.getElementById("namamapelraport_" + mp).innerHTML;

        }

        divhtml += `<tr><td>${j + 1}</td>
                            <td>${namasubjek}</td>`;
        // divhtml += `<td>${nr}</td>`;
        // divhtml += `<td>${nus}</td>`;
        divhtml += `<td>${ob_rekapraport[v][mp]}</td>`;
        divhtml += `<td>${ob_rekapus[v][mp]}</td>`;
        divhtml += `<td>${nb}</td></tr>`;
        ns += nb
    }
    nrrs = (ns / 9).toFixed(2);

    divhtml += `<tr><td colspan="4" class="w3-center">Jumlah</td><td>${ns}</td></tr>
        <tr><td colspan="4" class="w3-center">Rata-rata</td><td>${nrrs}</td></tr>
        
        </tbody>
        </table></div><br/>
        <sub>Ket: Nilai ijazah didapat dengan formulasi <span class="w3-border w3-border-black w3-padding">(Nilai Raport x 70 % ) + (Nilai US x 30 % ) </span>.
        </sub><br/><br/>
        <p class="w3-justify">
        Demikian Surat Keterangan ini dibuat, untuk dapat dipergunakan sebagaimana mestinya.
        </p>
        <div style="float:right;position:relative;text-align:left">
        <table>
            <tr><td>Ditetapkan di </td><td>:</td><td>${jlo.kota}</td></tr>
            <tr><td>Pada Tanggal </td><td>:</td><td>15 Juni 2021</td></tr>
            <tr><td colspan="3">Kepala ${idNamaSekolah}</td></tr>
            <tr><td colspan="3" id="barcodepengumumanskhu"></td></tr>
            <tr><td colspan="3"><u><b>${idNamaKepsek}</b></u></td></tr>
            <tr><td colspan="3">NIP. ${idNipKepsek}</td></tr>
        </table>
        </div>
        <div class="w3-clear"></div>





    </div> 
    
    `

    dd.innerHTML = divhtml;
    let cek = document.querySelector("#cekbarcodeskhu");
    if (cek.checked) {

        let teksbarkode = `Telah diketahui dan ditandatangani oleh Kepala ${idNamaSekolah} bahwa Surat Keterangan Hasil Belajar  atas nama ${t} dengan nilai ijazah ${nrr}`;

        barcodekan('barcodepengumumanskhu', teksbarkode);

    } else {
        document.getElementById("barcodepengumumanskhu").innerHTML = "<br/><br/><br/>";

    }
    // alert(v + "   " + t)


}
const changebarcodeskhu = () => {
    let dd = document.getElementById("ttdbarcodeskhu")
    let ini = document.getElementById("cekbarcodeskhu");
    if (ini.checked) {
        dd.innerHTML = "Tanda Tangan Barcode (Aktif)"
    } else {
        dd.innerHTML = "Tanda Tangan Barcode (Tidak Aktif)/Tidak menyertakan barcode tanda tangan"
    }

}
const selectnamaketraport = () => {
    let a = document.getElementById("idselectnamaketraport");
    let b = a.selectedIndex;
    let c = a.options;
    let v = c[b].value;
    let t = c[b].text;
    if (objraportall.length === undefined) {
        alert("Anda belum pernah menyimpan di server data pengolahan Raport seluruh siswa. Anda belum bisa membuat rekap Raport saat ini.");
        return
    }
    let tabelrekap = document.querySelector(".tabelnilaiijazahfix").getElementsByTagName("tbody")[0];
    let nrr = tabelrekap.rows[v].cells[11].innerHTML;
    let dd = document.querySelector(".htmlketraport");
    let tt = document.querySelector(".div_ketraport");
    dd.className = dd.className.replace("w3-hide", "w3-show");
    tt.className = tt.className.replace("w3-show", "w3-hide");
    let ttl = tanggalfull(jsondatasiswa[v].pd_tanggallahir);

    let divhtml = `
    <div class="w3-container">
        <div class="w3-left w3-padding">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Lambang_Kota_Depok.png/371px-Lambang_Kota_Depok.png" style="width:100px"/>
        </div>
        <div class="w3-center w3-bottombar  w3-border-black">
            <h4>PEMERINTAH DAERAH ${jlo.idkota.toUpperCase()} ${jlo.kota.toUpperCase()}<br/>
            DINAS PENDIDIKAN ${jlo.idkota.toUpperCase()} ${jlo.kota.toUpperCase()} 
            <br/><b  class="w3-xxlarge">${idNamaSekolah.toUpperCase()}</b></br/>
            <sub>Alamat : ${editalamatkopsurat.innerHTML}</sub></h4>
        </div>
    </div>
    <div class="w3-main w3-padding">
        <h4 class="w3-center">SURAT KETERANGAN DAFTAR NILAI RAPORT</h4>
        <h6 class="w3-center" contenteditable="">No : 42.2/... ... .../SD/VI/2021</h6>
        <br/>
        <br/>
        <p class="w3-justify">
        Yang bertanda tangan di bawah ini, Kepala ${idNamaSekolah}, ${jlo.idkota} ${jlo.kota} menerangkan bahwa:
        </p>
       <table style="margin-left:20px">
            <tr>
                <td style="vertical-align:top">Nama</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].pd_nama}</td>
            </tr>
            <tr>
            <td style="vertical-align:top">Tempat, Tanggal Lahir</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].pd_tl}, ${ttl}</td>
            </tr>
            <tr>
            <td style="vertical-align:top">Nomor Induk Siswa (NIS)</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].nis}</td>
            </tr>
            <tr>
            <td style="vertical-align:top">Nomor Induk Siswa Nasional (NISN)</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].nisn}</td>
            </tr>
       </table>
       <p class="w3-justify">
       Adalah benar bahwa siswa tersebut adalah siswa ${idNamaSekolah} telah mengikuti seluruh rangkaian kegiatan pendidikan sampai dengan Tahun Pelajaran ${idTeksTapel} di sekolah kami dan telah dinyatakan:
        </p>
        <div class="w3-center">
        <span class="w3-border w3-border-black w3-padding" >LULUS / <s>TIDAK LULUS</s> </span>
        </div><br/>
        <div class="w3-clear"></div>
        dengan rincian Nilai Raport sebagai berikut:
        <div style="overflow-x:auto">
        <table class="versi-table w3-small">
        <thead>
            <tr>
                <th rowspan="2">No</th>
                <th rowspan="2">Muatan Pelajaran <br/> (Kurikulum 2013)</th>
                <th colspan="5">Daftar Nilai Raport</th>
                <th rowspan="2">Rata-rata</th>
            </tr>
            <tr>
                <th>Kelas 4 Semester 1 (7)</th>
                <th>Kelas 4 Semester 2 (8)</th>
                <th>Kelas 5 Semester 1 (9)</th>
                <th>Kelas 5 Semester 6 (10)</th>
                <th>Kelas 6 Semester 1 (11)</th>
               
            </tr>
        </thead>
        <tbody>`
    let mp, nr, nus, na, nb, ns = 0, nrrs = 0, namasubjek;
    // na --> untuk isi setiap sel itu sendiri
    // ns --> untuk isi rata-rata tiap mapel (sel paling pojok kanan)
    // nb --> untuk isi sel baris terakhir

    let arrprefik = ["raport_4_1_", "raport_4_2_", "raport_5_1_", "raport_5_2_", "raport_6_1_"]
    //[2, 11, 20, 29, 38, 47]
    //[3, 12, 21, 30, 39, 48]
    let arrmaplusk = ["AGAMA", "PKN", "BINDO", "MTK", "IPA", "IPS"];
    for (j = 0; j < arrmaplusk.length; j++) {
        mp = arrmaplusk[j];
        nus = 0;
        if (mp == "AGAMA") {
            namasubjek = "Pendidikan Agama dan Budi Pekerti";
        } else {
            namasubjek = document.getElementById("namamapelraport_" + mp).innerHTML;

        }

        divhtml += `<tr><td>${j + 1}</td>
        <td>${namasubjek}</td>`;

        for (k = 0; k < 5; k++) {

            let pref = arrprefik[k] + mp;
            nr = objraportall[v][pref]
            na = (isNaN(parseFloat(nr))) ? 0 : parseFloat(nr);
            nus += na
            divhtml += `<td>${na}</td>`;



        }
        nus = (isNaN(nus / 5)) ? 0 : (nus / 5).toFixed(2);
        divhtml += `<td>${nus}</td>`

        divhtml += `</tr>`;
        ns += parseFloat(nus);

    }
    nb = (isNaN(ns / 6)) ? 0 : (ns / 6).toFixed(2);


    divhtml += `<tr><td colspan="7" class="w3-center">Jumlah</td><td>${ns.toFixed(2)}</td></tr>
        <tr><td colspan="7" class="w3-center">Rata-rata</td><td>${nb}</td></tr>
        
        </tbody>
        </table>
        </div>
        <br/><br/>
        <p class="w3-justify">
        Demikian Surat Keterangan ini dibuat, untuk dapat dipergunakan sebagaimana mestinya.
        </p>
        <div style="float:right;position:relative;text-align:left">
        <table>
            <tr><td>Ditetapkan di </td><td>:</td><td>${jlo.kota}</td></tr>
            <tr><td>Pada Tanggal </td><td>:</td><td>15 Juni 2021</td></tr>
            <tr><td colspan="3">Kepala ${idNamaSekolah}</td></tr>
            <tr><td colspan="3" id="barcodepengumumanketraport"></td></tr>
            <tr><td colspan="3"><u><b>${idNamaKepsek}</b></u></td></tr>
            <tr><td colspan="3">NIP. ${idNipKepsek}</td></tr>
        </table>
        </div>
        <div class="w3-clear"></div>





    </div> 
    
    `

    dd.innerHTML = divhtml;
    let cek = document.querySelector("#cekbarcodeketraport");
    if (cek.checked) {

        let teksbarkode = `Telah diketahui dan ditandatangani oleh Kepala ${idNamaSekolah} bahwa Surat Keterangan Daftar Nilai Rapot  atas nama ${t} dengan rata-rata Raport ${nb}`;

        barcodekan('barcodepengumumanketraport', teksbarkode);

    } else {
        document.getElementById("barcodepengumumanketraport").innerHTML = "<br/><br/><br/>";

    }
    // alert(v + "   " + t)


}
const changebarcodeketraport = () => {
    let dd = document.getElementById("ttdbarcodeketraport")
    let ini = document.getElementById("cekbarcodeketraport");
    if (ini.checked) {
        dd.innerHTML = "Tanda Tangan Barcode (Aktif)"
    } else {
        dd.innerHTML = "Tanda Tangan Barcode (Tidak Aktif)/Tidak menyertakan barcode tanda tangan"
    }

}
const selectnamaformatijazah = () => {
    let a = document.getElementById("idselectnamaformatijazah");
    let b = a.selectedIndex;
    let c = a.options;
    let v = c[b].value;
    let t = c[b].text;

    let tabelrekap = document.querySelector(".tabelnilaiijazahfix").getElementsByTagName("tbody")[0];
    let nrr = tabelrekap.rows[v].cells[11].innerHTML;
    let dd = document.querySelector(".htmlformatijazah");
    //let tt = document.querySelector(".div_formatijazah");
    dd.className = dd.className.replace("w3-hide", "w3-show");
    //dd.setAttribute("style","background-image(url:https://drive.google.com/uc?export=view&id=1qcpzq9ABBR8WVMXOk38AEiKN8KRj6YH-);background-repeat: no-repeat;background-size: 100% 100%")
    //tt.className = tt.className.replace("w3-show", "w3-hide");
    let ttl = tanggalfull(jsondatasiswa[v].pd_tanggallahir);

    let divhtml = `
    <div style="background-image:url(https://drive.google.com/uc?export=view&id=1qcpzq9ABBR8WVMXOk38AEiKN8KRj6YH-);background-repeat: no-repeat;background-size: 100% 100%">
        <div style="padding:8% 12%">    
            <p class="w3-center"><b class="w3-large">
                KEMENTRIAN PENDIDIKAN DAN KEBUDAYAAN REPUBLIK INDONESIA</b><br/>
                <b class="w3-center w3-xxlarge">I J A Z A H</b>
            </p>
            <p class="w3-center w3-large"><b>SEKOLAH DASAR</b><br/>TAHUN PELAJARAN ${idTeksTapel}</p>
            <p class="w3-justify"> 
            Yang bertanda tangan di bawah ini, Kepala <b> ${idNamaSekolah.replace("UPTD SDN", "Sekolah Dasar Negeri")}</b>
            </p>
            <div  style="border-bottom:1px dotted black;"></div>
            <span class="w3-clear"></span>
            <p class="w3-left"> Nomor Pokok Sekolah Nasional:</p><p class="w3-left" style="border-bottom:1px dotted black;width:50%">${document.querySelector(".idnpsn").innerHTML}</p>
            <span class="w3-clear"></span>
            <p class="w3-left">Kabupaten/Kota: </p><p class="w3-left"  style="border-bottom:1px dotted black;width:55%">${jlo.kota}</p>
            <span class="w3-clear"></span>
            
             
            <p class="w3-left" >Provinsi :</p><p class="w3-left" style="width:50%;border-bottom:1px dotted black;">JAWA BARAT </p><p class="w3-right">menerangkan bahwa:</p>
            <span class="w3-clear"></span>
            <table >
                <tr>
                    <td>nama</td>
                    <td>:</td>
                    <td>${jsondatasiswa[v].pd_nama}</td>
                </tr>
                <tr>
                    <td>tempat dan tanggal lahir</td>
                    <td>:</td>
                    <td>${jsondatasiswa[v].pd_tl}, ${ttl}</td>
                </tr>
                <tr>
                    <td>nama orang tua/wali</td>
                    <td>:</td>
                    <td>${jsondatasiswa[v].pd_namaayah}</td>
                </tr>
                <tr>
                    <td>Nomor Induk Siswa</td>
                    <td>:</td>
                    <td>${jsondatasiswa[v].nis}</td>
                </tr>
                <tr>
                    <td>Nomor Induk Siswa Nasional</td>
                    <td>:</td>
                    <td>${jsondatasiswa[v].nisn}</td>
                </tr>
            </table>
            
            <p class="w3-xxlarge w3-center">LULUS</p>
            <p class="w3-justify">
                dari sekolah dasar setelah memenuhi seluruh kriteria sesuai dengan peraturan perundang-undangan yang diumumkan tanggal 15 Juni 2021.
            </p>
            
            <div style="float:right;position:relative;text-align:left">
                ${jlo.kota}, 15 Juni 2021<br/>
                Kepala sekolah
                <br/>
                <br/>
                <br/>
                <b><u>${idNamaKepsek}</u></b><br/>
                NIP. ${idNipKepsek}
            </div>
      
            <div style="left:20%;position:relative;width:3cm; height:4cm;border:.5px solid black;padding:1cm 0;text-align:center">
            Poto ukuran 3 x 4 cm.
            </div>
            <div class="w3-clear"></div>
            </div>
        </div><div style="break-after:page;"></div>
        <div>
        <h3 class="w3-center">DAFTAR NILAI</h3>
        <h5 class="w3-center">SEKOLAH DASAR</h5>
        <h6 class="w3-center">TAHUN PELALARAN ${idTeksTapel}</h6>
        <br/>
        <table style="margin:0 auto">
        <tr>
            <td>Nama</td><td>:</td>
            <td style="border-bottom:.5px dotted black">${jsondatasiswa[v].pd_nama}</td>
        </tr>
        <tr>
            <td>Nomor Induk Siswa Nasional</td><td>:</td>
            <td style="border-bottom:.5px dotted black">${jsondatasiswa[v].nisn}</td>
        </tr>
        </table>
        <br/><br/>
        <table class="versi-table" style="margin:0 auto;width:80%;">
            <tr>
                <th>No.</th>
                <th>Mata Pelajaran <br/>(Kurikulum 2013)</th>
                <th>Nilai Ujian <br/>Sekolah</th>
            </tr>
            <tr>
            <td colspan="2">Kelompok A</td><td></td>
            </tr>
            <tr>
                <td>1</td>
                <td>Pendidikan Agama dan Budi Pekerti</td>
                <td>${tabelrekap.rows[v].cells[2].innerHTML}</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Pendidikan Kewarganegaraan</td>
                <td>${tabelrekap.rows[v].cells[3].innerHTML}</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Bahasa Indonesia</td>
                <td>${tabelrekap.rows[v].cells[4].innerHTML}</td>
            </tr>
            <tr>
                <td>4</td>
                <td>Matematika</td>
                <td>${tabelrekap.rows[v].cells[5].innerHTML}</td>
            </tr>
            <tr>
                <td>5</td>
                <td>Ilmu Pengetahuan Alam</td>
                <td>${tabelrekap.rows[v].cells[6].innerHTML}</td>
            </tr>
            <tr>
                <td>6</td>
                <td>Ilmu Pengetahuan Sosial</td>
                <td>${tabelrekap.rows[v].cells[7].innerHTML}</td>
                <tr>
                <td colspan="2">Kelompok B</td><td></td>
                </tr>
            </tr>
            <tr>
                    <td>1</td>
                    <td>Seni Budaya dan Prakarya</td>
                    <td>${tabelrekap.rows[v].cells[8].innerHTML}</td>
            </tr>
            <tr>
                    <td>2</td>
                    <td>Pendidikan Jasmani, Olahraga, dan Kesehatan</td>
                    <td>${tabelrekap.rows[v].cells[9].innerHTML}</td>
            </tr>
            <tr>
                    <td rowspan="4">3</td>
                    <td>Muatan Lokal</td>
                    <td></td>
            </tr>
            <tr>
                <td>a. Bahasa Sunda</td>
                
                <td>${tabelrekap.rows[v].cells[10].innerHTML}</td>
            </tr>
            <tr>
                <td>b.</td>
                <td></td>
            </tr>
            <tr>
                <td>c.</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="2" class="w3-center"><b>Rata-rata</b></td>
                <td>${tabelrekap.rows[v].cells[11].innerHTML}</td>
            </tr>

        </table><br/>
                <div style="float:right;position:relative;text-align:left">
                ${jlo.kota}, 15 Juni 2021<br/>
                Kepala sekolah
                <br/>
                <br/>
                <br/>
                <b><u>${idNamaKepsek}</u></b><br/>
                NIP. ${idNipKepsek}
            </div>
        </div>
        `










    dd.innerHTML = divhtml;

    // alert(v + "   " + t)


}
const printformatijazah = (elemenprint) => {
    //let isibody = document.querySelector(".htmlformatijazah").innerHTML;;//.replace("w3-tiny", "");
    let isibody = document.querySelector("." + elemenprint).innerHTML;;//.replace("w3-tiny", "");
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>Contoh Format Ijazah</title>`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=Raleway">`;
    head.innerHTML += `<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>`;
    head.innerHTML += `<style type="text/css">
    .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}
    </style>`;

    head.innerHTML += `<style type="text/css" media="print">
    @media print {
        html,body{margin:0;padding:0}
        
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
const fn_publikasikan = (eltombol, elhalaman, elselect, pubapa) => {
    //    alert("publikasikanraportpts()");
    let btn = document.querySelector("." + eltombol);
    // let divraportsemester = document.getElementById("halamanraport");
    let divraportsemester = document.querySelector("." + elhalaman);
    let op = document.getElementById(elselect).options;
    let indop = document.getElementById(elselect).selectedIndex;
    let namarsemester = op[indop].text;
    if (op[indop].value == "") {
        alert("Silakan pilih nama siswa Anda, untuk mempublikasikan halaman ini di server.");
        return
    }
    if (divraportsemester.innerHTML == "") {
        alert("Halaman Belum siap dipublikasikan");
        btn.innerHTML = "<i class='fa fa-globe'></i> Publikasikan";
    } else {
        let confr = confirm("Anda yakin ingin mempublikasikan ini kepada siswa yang bersangkutan? Data yang berhasil dipublikasikan akan muncul di tabel Publikasi.\n\n Klik [OK] untuk melanjutkan.\n\n Klik [NO] untuk membatalkan.");
        if (confr) {
            btn.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Proses Publikasi";
            //alert(eltombol + ", " + elhalaman + ", " + elselect + ", " + pubapa)
            let tekhtml = divraportsemester.innerHTML;
            let dtext = document.getElementById("tempattextarea");
            dtext.textContent = tekhtml.replace(/contenteditable/gi, "");
            let htmlraport = window.btoa(unescape(encodeURIComponent(dtext.textContent)));
            let data = new FormData();
            data.append("kelas", idNamaKelas);
            data.append("namasiswa", namarsemester);
            data.append("htmlraport", htmlraport);
            data.append("jenispublikasi", pubapa);
            fetch(constlinknilai + "?action=postpublikasiumum", {
                method: "post",
                body: data
            }).then(m => m.json())
                .then(r => {
                    //console.log(r)
                    alert(r.result + "Publikasi");
                    btn.innerHTML = "<i class='fa fa-globe'></i> Publikasikan";
                })
                .catch(er => alert(er))
            // console.log(namarpts);
            // console.log(htmlraport);

            // let namasubfolder = e.parameter.kelas;
            // let namasiswa = e.parameter.namasiswa;
            // let htmlraport = e.parameter.htmlraport;
        }
    }

}
const fn_tabelpublikasi = (eltombol, elhalaman, eltabel, tabelapa) => {
    let divprint = document.querySelector("." + elhalaman);
    let div = document.querySelector("." + eltabel);

    let bt = document.querySelector("." + eltombol);
    bt.innerHTML = "<i class='fa fa-spinner fa-spin'></i>";

    // let div = document.querySelector("."+el);
    div.className = div.className.replace("w3-hide", "w3-show");
    div.scrollIntoView();
    let tekshtml = `<h4>Data Publikasi</h4><table class="versi-table w3-small" id="tabelcekpublikasi${tabelapa}">
                <thead><tr>
                    <th>No</th>
                    <th>Nama Siswa</th>
                    <th>Preview</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
                </thead><tbody>
                `;
    for (i = 0; i < jsondatasiswa.length; i++) {
        tekshtml += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${jsondatasiswa[i].pd_nama}</td>
                        <td class="w3-center">Belum dipublikasikan</td>
                        <td class="w3-center"><span class="w3-text-red">?</span></td>
                        <td class="w3-center">-</td>
                    </tr>
                    `
    }
    tekshtml += `</tbody></table>`;
    div.innerHTML = tekshtml;

    fetch(constlinknilai + "?action=cekpublikasi&kelas=" + idNamaKelas + "&jenispublikasi=" + tabelapa)
        .then(m => m.json())
        .then(r => {
            //console.log(r);
            bt.innerHTML = `<i class="fa fa-eye"></i> Tabel Publikasi</button>`;
            let cekdata = r.result;

            if (cekdata == 0) {
                div.innerHTML = "<h4>Maaf, Anda belum pernah mempublikasikan laman ini</h4>";
            } else {
                let data = r.data;
                let datanama, dataid, dataaksi,
                    indektabel, idtabel = document.getElementById("tabelcekpublikasi" + tabelapa).getElementsByTagName("tbody")[0];
                for (j = 0; j < data.length; j++) {
                    datanama = data[j].namasiswa;
                    dataid = data[j].idfile;
                    dataaksi = data[j].publikasi;
                    indektabel = jsondatasiswa.map(s => s.pd_nama).indexOf(datanama);

                    if (indektabel > -1) {
                        idtabel.rows[indektabel].cells[2].innerHTML = `<button onclick="previewraportsemester('${dataid}')" title="Lihat")><i class="fa fa-eye"></i> Lihat</button>`;
                        idtabel.rows[indektabel].cells[3].innerHTML = (dataaksi == "show") ? `<b class="w3-text-green">&checkmark;</b>` : `<b class="w3-text-red">&times;</b>`;
                        idtabel.rows[indektabel].cells[4].innerHTML = (dataaksi == "show") ? `<button onclick="sembunyikanpublikasi('${eltombol}', '${elhalaman}', '${eltabel}','${datanama}','${tabelapa}')" title="Hapus")><i class="fa fa-trash"></i> Hapus</button>` : `<button onclick="tampilkankanpublikasi('${eltombol}', '${elhalaman}', '${eltabel}','${datanama}','${tabelapa}')" title="Kembalikan")><i class="fa fa-refresh"></i> </button>`;
                    }



                }




            }

        })
        .catch(er => console.log(er))
    //console.log


}
const sembunyikanpublikasi = (eltombol, elhalaman, eltabel, datanama, tabelapa) => {
    fetch(constlinknilai + "?action=showhidepublikasi&kelas=" + idNamaKelas + "&namasiswa=" + datanama + "&aksi=hide&jenispublikasi=" + tabelapa)
        .then(m => m.json())
        .then(k => {
            alert(k.result);
            fn_tabelpublikasi(eltombol, elhalaman, eltabel, tabelapa)
        })
        .catch(er => alert(er))
}
const tampilkankanpublikasi = (eltombol, elhalaman, eltabel, datanama, tabelapa) => {
    fetch(constlinknilai + "?action=showhidepublikasi&kelas=" + idNamaKelas + "&namasiswa=" + datanama + "&aksi=show&jenispublikasi=" + tabelapa)
        .then(m => m.json())
        .then(k => {
            alert(k.result);
            fn_tabelpublikasi(eltombol, elhalaman, eltabel, tabelapa);
        })
        .catch(er => alert(er))
}
const pindahTabSeleksi = (el, a) => {
    if (a == "leger_k3") {
        cek_leger_k3();
    } else {
        cek_leger_k4();

    }
    let tabv = document.querySelectorAll('.tabverifs')
    tabv.forEach(elem => {
        elem.className = elem.className.replace("active", "");
    });
    el.className += " active";

};
const cek_leger_k3 = () => {
    try {
        let arrayLeger = [];
        //alert('cek leger k3');
        let div = document.querySelector(".leger_k3");
        let tekssumberdata = document.querySelector("#menumenunilaikd3").innerHTML;
        let ada = tekssumberdata.indexOf("Data Pengolahan Nilai") > -1 ? "Sumber Data: Tabel Data Nilai Olahan" : "Sumber Data: Tabel Data Nilai Asli";
        let pr = document.querySelector(".printleger");
        pr.innerHTML = `<button class="w3-button w3-red w3-margin" onclick="printleger('leger_k3')"><i class="fa fa-print"></i>  PRINT</button>`;
        pr.innerHTML += `<button class="w3-button w3-green w3-margin" onclick="excelleger('leger_k3')"><i class="fa fa-file-excel-o"></i>  Ms. Excel</button>`;
        pr.innerHTML += `<button class="w3-button w3-green w3-margin" onclick="simpanrekapnilairaport('k3')"><i class="fa fa-save"></i>  Simpan Server K3</button>`;
        pr.innerHTML += `<button class="w3-button w3-green w3-margin" onclick="tampilkannilairaport('k3')"><i class="fa fa-save"></i>  Tampilkan Rekap Nilai Raport KI3</button>`;
        document.querySelector(".leger_k3").className = document.querySelector(".leger_k3").className.replace("w3-hide", "w3-show");
        document.querySelector(".leger_k4").className = document.querySelector(".leger_k4").className.replace("w3-show", "w3-hide");
        // data.datarraport.forEach(el => console.table(el));
        let defagama = ["ISLAM", "KRISTEN", "KATHOLIK", "HINDU", "BUDHA", "KHONGHUCU"];
        let kodeagama = ["PAI", "PKRIS", "PKATO", "PHIND", "PBUDH", "PKONG"];
        let siswa = jsondatasiswa;
        if (idJenjang > 3) {
            // console.log(idJenjang)
            let i = 0
            // let arrayLeger = [];
            let arrayRangking = [];
            let rowbawah = [];
            let html = "<h3>Leger Nilai Kompetensi Pengetahuan (KI-3)</h3>" + ada;
            html += `<table class="versi-table w3-tiny tabellegerk3">
        <thead>
            <tr>
                <th rowspan="2">No</th>
                <th rowspan="2">Nama Siswa</th>
                <th colspan="9">Mata Pelajaran</th>
                <th rowspan="2">Jumlah</th>
                <th rowspan="2">Rata</th>
                <th rowspan="2">Rangking<br><button onclick="urutkanTabel(this,true,'leger_k3')">urutkan</button></th>
            </tr>
            <tr>
                <th>AGAMA</th>
                <th>PKN</th>
                <th>BINDO</th>
                <th>MTK</th>
                <th>IPA</th>
                <th>IPS</th>
                <th>SBDP</th>
                <th>PJOK</th>
                <th>BSUND</th>
                </tr>
        </thead>
        <tbody>
    `;
            //objek_nunuy = algoritmakurtilas(0).datarraport;
            do {
                let legerbaru = {};
                let data = algoritmakurtilas(i);
                legerbaru["namasiswa"] = jsondatasiswa[i].pd_nama;
                let agamasiswa = jsondatasiswa[i].pd_agama;
                let keyagama = kodeagama[defagama.indexOf(agamasiswa)];
                let keymapel = ["raport_" + keyagama, "raport_PKN", "raport_BINDO", "raport_MTK", "raport_IPA", "raport_IPS", "raport_SBDP", "raport_PJOK", "raport_BSUND"]
                let keymapel2 = ["raport_PKN", "raport_BINDO", "raport_MTK", "raport_IPA", "raport_IPS", "raport_SBDP", "raport_PJOK", "raport_BSUND"]
                // let o_nilai = data.datarraport.map(k => Object.fromEntries(Object.entries(k).filter(([a, b]) => a.indexOf("raport_") > -1)));
                // let o_nilai = data.datarraport.map(k => Object.fromEntries(Object.entries(k).filter(([a, b]) => keymapel.indexOf(a) > -1)));
                let o_nilai = data.datarraport.map(k => Object.fromEntries(Object.entries(k).filter(([a, b]) => keymapel.indexOf(a) > -1))).filter(value => Object.keys(value).length !== 0);;
                // let jadi_nilai = Object.entries(o_nilai).filter(([, v]) => Object.keys(v) !== null);

                //let objekselainagama = o_nilai.filter(value => Object.keys(value).length !== 0);

                legerbaru["nilai"] = o_nilai;
                legerbaru["cek"] = o_nilai.map(a => a[Object.keys(a)]);//.map(a => o_nilai[a]);//.reduce((a, b) => a + b);
                legerbaru["jumlah"] = o_nilai.map(a => a[Object.keys(a)]).reduce((a, b) => a + b);;//.map(a => o_nilai[a]);//.reduce((a, b) => a + b);
                legerbaru["rerata"] = (o_nilai.map(a => a[Object.keys(a)]).reduce((a, b) => a + b) / 9).toFixed(2);;//.map(a => o_nilai[a]);//.reduce((a, b) => a + b);
                arrayRangking.push((o_nilai.map(a => a[Object.keys(a)]).reduce((a, b) => a + b) / 9).toFixed(2));
                // legerbaru["nilaijadi"] = jadi_nilai;
                //legerbaru["nilaijadi2"] = objekselainagama;

                html += `<tr>
            <td>${i + 1}</td>
            <td>${jsondatasiswa[i].pd_nama}</td>
            <td>${data.datarraport.map(k => k["raport_" + keyagama])[data.datarraport.findIndex(s => s["raport_" + keyagama])]}</td>
            <td>${data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])]}</td>
            <td>${data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])]}</td>
            <td>${data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])]}</td>
            <td>${data.datarraport.map(k => k["raport_IPA"])[data.datarraport.findIndex(s => s["raport_IPA"])]}</td>
            <td>${data.datarraport.map(k => k["raport_IPS"])[data.datarraport.findIndex(s => s["raport_IPS"])]}</td>
            <td>${data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])]}</td>
            <td>${data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])]}</td>
            <td>${data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])]}</td>
            <td>${legerbaru["jumlah"]}</td>
            <td>${legerbaru["rerata"]}</td>
            <td></td>
        </tr>`;
                //agama;
                // rowbawah.push(data.datarraport.map(k => k["raport_" + keyagama])[data.datarraport.findIndex(s => s["raport_" + keyagama])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_IPA"])[data.datarraport.findIndex(s => s["raport_IPA"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_IPS"])[data.datarraport.findIndex(s => s["raport_IPS"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])]);

                // html += `<tr>
                //     <td>${i + 1}</td>
                //     <td>${jsondatasiswa[i].pd_nama}</td>
                //     <td>${data.datarraport.map(k => k["raport_" + keyagama])[data.datarraport.findIndex(s => s["raport_" + keyagama])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_IPA"])[data.datarraport.findIndex(s => s["raport_IPA"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_IPS"])[data.datarraport.findIndex(s => s["raport_IPS"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])]}</td>
                //     <td>jumlah</td>
                //     <td>rerata</td>
                //     <td>rangking</td>
                // </tr>`;


                // legerbaru["AgamaSiswa"] = agamasiswa;
                // legerbaru["AGAMA"] = data.datarraport.map(k => k["raport_" + keyagama])[0];
                // legerbaru["PKN"] = data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])];
                // legerbaru["BINDO"] = data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])];
                // legerbaru["MTK"] = data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])];
                // legerbaru["IPA"] = data.datarraport.map(k => k["raport_IPA"])[data.datarraport.findIndex(s => s["raport_IPA"])];
                // legerbaru["IPS"] = data.datarraport.map(k => k["raport_IPS"])[data.datarraport.findIndex(s => s["raport_IPS"])];
                // legerbaru["SBDP"] = data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])];
                // legerbaru["PJOK"] = data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])];
                // legerbaru["BSUND"] = data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])];
                arrayLeger.push(legerbaru);
                // arrayLeger.push(o_nilai);

                i++;
            }
            while (i < siswa.length);
            //console.log(arrayLeger);
            html += `</tbody></table>`;
            div.innerHTML = html;
            let tabelini = document.querySelector(".tabellegerk3").getElementsByTagName("tbody")[0];
            let arrsortrangk = rangking(arrayRangking);

            for (let j = 0; j < tabelini.rows.length; j++) {
                tabelini.rows[j].cells[13].innerHTML = arrsortrangk[j];
            };
            let tesade = TbodyToArray("leger_k3");
            
        } else {
            let i = 0
            // let arrayLeger = [];
            let arrayRangking = [];
            let rowbawah = [];
            let html = "<h3>Leger Nilai Kompetensi Pengetahuan (KI-3)</h3>" + ada;
            html += `<table class="versi-table w3-tiny tabellegerk3">
        <thead>
            <tr>
                <th rowspan="2">No</th>
                <th rowspan="2">Nama Siswa</th>
                <th colspan="7">Mata Pelajaran</th>
                <th rowspan="2">Jumlah</th>
                <th rowspan="2">Rata</th>
                <th rowspan="2">Rangking<br><button onclick="urutkanTabel(this,true,'leger_k3')">urutkan</button></th>
            </tr>
            <tr>
                <th>AGAMA</th>
                <th>PKN</th>
                <th>BINDO</th>
                <th>MTK</th>
                <th>SBDP</th>
                <th>PJOK</th>
                <th>BSUND</th>
                </tr>
        </thead>
        <tbody>
    `;
            //objek_nunuy = algoritmakurtilas(0).datarraport;
            do {
                let legerbaru = {};
                let data = algoritmakurtilas(i);
                legerbaru["namasiswa"] = jsondatasiswa[i].pd_nama;
                let agamasiswa = jsondatasiswa[i].pd_agama;
                let keyagama = kodeagama[defagama.indexOf(agamasiswa)];
                let keymapel = ["raport_" + keyagama, "raport_PKN", "raport_BINDO", "raport_MTK", "raport_IPA", "raport_IPS", "raport_SBDP", "raport_PJOK", "raport_BSUND"]
                let keymapel2 = ["raport_PKN", "raport_BINDO", "raport_MTK", "raport_IPA", "raport_IPS", "raport_SBDP", "raport_PJOK", "raport_BSUND"]
                // let o_nilai = data.datarraport.map(k => Object.fromEntries(Object.entries(k).filter(([a, b]) => a.indexOf("raport_") > -1)));
                // let o_nilai = data.datarraport.map(k => Object.fromEntries(Object.entries(k).filter(([a, b]) => keymapel.indexOf(a) > -1)));
                let o_nilai = data.datarraport.map(k => Object.fromEntries(Object.entries(k).filter(([a, b]) => keymapel.indexOf(a) > -1))).filter(value => Object.keys(value).length !== 0);;
                // let jadi_nilai = Object.entries(o_nilai).filter(([, v]) => Object.keys(v) !== null);

                //let objekselainagama = o_nilai.filter(value => Object.keys(value).length !== 0);

                legerbaru["nilai"] = o_nilai;
                legerbaru["cek"] = o_nilai.map(a => a[Object.keys(a)]);//.map(a => o_nilai[a]);//.reduce((a, b) => a + b);
                legerbaru["jumlah"] = o_nilai.map(a => a[Object.keys(a)]).reduce((a, b) => a + b);;//.map(a => o_nilai[a]);//.reduce((a, b) => a + b);
                legerbaru["rerata"] = (o_nilai.map(a => a[Object.keys(a)]).reduce((a, b) => a + b) / 7).toFixed(2);;//.map(a => o_nilai[a]);//.reduce((a, b) => a + b);
                arrayRangking.push((o_nilai.map(a => a[Object.keys(a)]).reduce((a, b) => a + b) / 7).toFixed(2));
                // legerbaru["nilaijadi"] = jadi_nilai;
                //legerbaru["nilaijadi2"] = objekselainagama;

                html += `<tr>
            <td>${i + 1}</td>
            <td>${jsondatasiswa[i].pd_nama}</td>
            <td>${data.datarraport.map(k => k["raport_" + keyagama])[data.datarraport.findIndex(s => s["raport_" + keyagama])]}</td>
            <td>${data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])]}</td>
            <td>${data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])]}</td>
            <td>${data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])]}</td>
           <td>${data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])]}</td>
            <td>${data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])]}</td>
            <td>${data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])]}</td>
            <td>${legerbaru["jumlah"]}</td>
            <td>${legerbaru["rerata"]}</td>
            <td></td>
        </tr>`;
                //agama;
                // rowbawah.push(data.datarraport.map(k => k["raport_" + keyagama])[data.datarraport.findIndex(s => s["raport_" + keyagama])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_IPA"])[data.datarraport.findIndex(s => s["raport_IPA"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_IPS"])[data.datarraport.findIndex(s => s["raport_IPS"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])]);
                // rowbawah.push(data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])]);

                // html += `<tr>
                //     <td>${i + 1}</td>
                //     <td>${jsondatasiswa[i].pd_nama}</td>
                //     <td>${data.datarraport.map(k => k["raport_" + keyagama])[data.datarraport.findIndex(s => s["raport_" + keyagama])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_IPA"])[data.datarraport.findIndex(s => s["raport_IPA"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_IPS"])[data.datarraport.findIndex(s => s["raport_IPS"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])]}</td>
                //     <td>${data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])]}</td>
                //     <td>jumlah</td>
                //     <td>rerata</td>
                //     <td>rangking</td>
                // </tr>`;


                // legerbaru["AgamaSiswa"] = agamasiswa;
                // legerbaru["AGAMA"] = data.datarraport.map(k => k["raport_" + keyagama])[0];
                // legerbaru["PKN"] = data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])];
                // legerbaru["BINDO"] = data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])];
                // legerbaru["MTK"] = data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])];
                // legerbaru["IPA"] = data.datarraport.map(k => k["raport_IPA"])[data.datarraport.findIndex(s => s["raport_IPA"])];
                // legerbaru["IPS"] = data.datarraport.map(k => k["raport_IPS"])[data.datarraport.findIndex(s => s["raport_IPS"])];
                // legerbaru["SBDP"] = data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])];
                // legerbaru["PJOK"] = data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])];
                // legerbaru["BSUND"] = data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])];
                arrayLeger.push(legerbaru);
                // arrayLeger.push(o_nilai);

                i++;
            }
            while (i < siswa.length);
            //console.log(arrayLeger);
            html += `</tbody></table>`;
            div.innerHTML = html;
            let tabelini = document.querySelector(".tabellegerk3").getElementsByTagName("tbody")[0];
            let arrsortrangk = rangking(arrayRangking);

            for (let j = 0; j < tabelini.rows.length; j++) {
                tabelini.rows[j].cells[11].innerHTML = arrsortrangk[j];
            }
            let tesade = TbodyToArray("leger_k3");
          
        }
    } catch (err) {
        // alert("Maaf, Raport untuk siswa ini tidak bisa ditampilkan. Pastikan data nilai KI-3 dan KI-4 minimal ada 2 KD yang memiliki nilai. \n\n Tips: jika memang tidak ada data nilai, beri nilai nol (tidak boleh dikosongkan) untuk Rekap KI-3 atau KI-4.)");
        console.log(err)
        let divto = document.querySelector(".leger_k3");
        divto.innerHTML = "Peringatan! Halaman ini akan muncul ketika Anda telah membuka laman <b>Kompetensi Pengetahuan [k-3]</b>";

    }
};
const rangking = (arr) => {
    const sorted = [...new Set(arr)].sort((a, b) => b - a);
    const rank = new Map(sorted.map((x, i) => [x, i + 1]));
    return arr.map((x) => rank.get(x));
};
const cek_leger_k4 = () => {
    try {
        let arraylegerk4 = [];
        // alert('cek leger k4');
        document.querySelector(".leger_k4").className = document.querySelector(".leger_k4").className.replace("w3-hide", "w3-show");
        document.querySelector(".leger_k3").className = document.querySelector(".leger_k3").className.replace("w3-show", "w3-hide");
        let tekssumberdata = document.querySelector("#menumenunilaikd4").innerHTML;
        let ada = tekssumberdata.indexOf("Data Pengolahan Nilai") > -1 ? "Sumber Data: Tabel Data Nilai Olahan" : "Sumber Data: Tabel Data Nilai Asli";

        let div = document.querySelector(".leger_k4");
        let pr = document.querySelector(".printleger");
        pr.innerHTML = `<button class="w3-button w3-red w3-margin" onclick="printleger('leger_k4')"><i class="fa fa-print"></i>  PRINT</button>`;
        pr.innerHTML += `<button class="w3-button w3-green w3-margin" onclick="excelleger('leger_k4')"><i class="fa fa-file-excel-o"></i>  Ms. Excel</button>`;
        pr.innerHTML += `<button class="w3-button w3-green w3-margin" onclick="simpanrekapnilairaport('k4')"><i class="fa fa-save"></i>  Simpan Server K4</button>`;
        pr.innerHTML += `<button class="w3-button w3-green w3-margin" onclick="tampilkannilairaport('k4')"><i class="fa fa-save"></i>  Tampilkan Rekap Nilai Raport KI4</button>`;
        

        // data.datarraport.forEach(el => console.table(el));
        let defagama = ["ISLAM", "KRISTEN", "KATHOLIK", "HINDU", "BUDHA", "KHONGHUCU"];
        let kodeagama = ["PAI", "PKRIS", "PKATO", "PHIND", "PBUDH", "PKONG"];
        let siswa = jsondatasiswa;
        let i = 0
        // let arrayLeger = [];
        let arrayRangking = [];
        let rowbawah = [];
        let html = "<h3>Leger Nilai Kompetensi Keterampilan (KI-4)</h3>Sumber Data : " + ada;
        html += `<table class="versi-table w3-tiny tabellegerk4">
        <thead>
            <tr>
                <th rowspan="2">No</th>
                <th rowspan="2">Nama Siswa</th>
                <th colspan="9">Mata Pelajaran</th>
                <th rowspan="2">Jumlah</th>
                <th rowspan="2">Rata</th>
                
            </tr>
            <tr>
                <th>AGAMA</th>
                <th>PKN</th>
                <th>BINDO</th>
                <th>MTK</th>
                <th>IPA</th>
                <th>IPS</th>
                <th>SBDP</th>
                <th>PJOK</th>
                <th>BSUND</th>
                </tr>
        </thead>
        <tbody>
    `;
        //objek_nunuy = algoritmakurtilas(0).datarraport;
        do {
            let legerbaru = {};
            let data = algoritmaketerampilan(i);
            // console.log(data);
            legerbaru["namasiswa"] = jsondatasiswa[i].pd_nama;
            let agamasiswa = jsondatasiswa[i].pd_agama;
            let keyagama = kodeagama[defagama.indexOf(agamasiswa)];
            let keymapel = ["raportk4_" + keyagama, "raportk4_PKN", "raportk4_BINDO", "raportk4_MTK", "raportk4_IPA", "raportk4_IPS", "raportk4_SBDP", "raportk4_PJOK", "raportk4_BSUND"]
            let keymapel2 = ["raportk4_PKN", "raportk4_BINDO", "raportk4_MTK", "raportk4_IPA", "raportk4_IPS", "raportk4_SBDP", "raportk4_PJOK", "raportk4_BSUND"]
            // let o_nilai = data.datarraport.map(k => Object.fromEntries(Object.entries(k).filter(([a, b]) => a.indexOf("raportk4_") > -1)));
            // let o_nilai = data.datarraport.map(k => Object.fromEntries(Object.entries(k).filter(([a, b]) => keymapel.indexOf(a) > -1)));
            let o_nilai = data.datarraport.map(k => Object.fromEntries(Object.entries(k).filter(([a, b]) => keymapel.indexOf(a) > -1))).filter(value => Object.keys(value).length !== 0);;
            // let jadi_nilai = Object.entries(o_nilai).filter(([, v]) => Object.keys(v) !== null);

            //let objekselainagama = o_nilai.filter(value => Object.keys(value).length !== 0);

            legerbaru["nilai"] = o_nilai;
            legerbaru["cek"] = o_nilai.map(a => a[Object.keys(a)]);//.map(a => o_nilai[a]);//.reduce((a, b) => a + b);
            legerbaru["jumlah"] = o_nilai.map(a => a[Object.keys(a)]).reduce((a, b) => a + b);;//.map(a => o_nilai[a]);//.reduce((a, b) => a + b);
            legerbaru["rerata"] = (o_nilai.map(a => a[Object.keys(a)]).reduce((a, b) => a + b) / 9).toFixed(2);;//.map(a => o_nilai[a]);//.reduce((a, b) => a + b);
            arrayRangking.push((o_nilai.map(a => a[Object.keys(a)]).reduce((a, b) => a + b) / 9).toFixed(2));
            // legerbaru["nilaijadi"] = jadi_nilai;
            //legerbaru["nilaijadi2"] = objekselainagama;

            html += `<tr>
            <td>${i + 1}</td>
            <td>${jsondatasiswa[i].pd_nama}</td>
            <td>${data.datarraport.map(k => k["raportk4_" + keyagama])[data.datarraport.findIndex(s => s["raportk4_" + keyagama])]}</td>
            <td>${data.datarraport.map(k => k["raportk4_PKN"])[data.datarraport.findIndex(s => s["raportk4_PKN"])]}</td>
            <td>${data.datarraport.map(k => k["raportk4_BINDO"])[data.datarraport.findIndex(s => s["raportk4_BINDO"])]}</td>
           <td>${data.datarraport.map(k => k["raportk4_MTK"])[data.datarraport.findIndex(s => s["raportk4_MTK"])]}</td>
           
           <td>${data.datarraport.map(k => k["raportk4_IPA"])[data.datarraport.findIndex(s => s["raportk4_IPA"])]}</td>
            <td>${data.datarraport.map(k => k["raportk4_IPS"])[data.datarraport.findIndex(s => s["raportk4_IPS"])]}</td>
           
            <td>${data.datarraport.map(k => k["raportk4_SBDP"])[data.datarraport.findIndex(s => s["raportk4_SBDP"])]}</td>
            <td>${data.datarraport.map(k => k["raportk4_PJOK"])[data.datarraport.findIndex(s => s["raportk4_PJOK"])]}</td>
            <td>${data.datarraport.map(k => k["raportk4_BSUND"])[data.datarraport.findIndex(s => s["raportk4_BSUND"])]}</td>
            <td>${legerbaru["jumlah"]}</td>
            <td>${legerbaru["rerata"]}</td>
           
        </tr>`;
            //agama;
            //agama;
            // rowbawah.push(data.datarraport.map(k => k["raport_" + keyagama])[data.datarraport.findIndex(s => s["raport_" + keyagama])]);
            // rowbawah.push(data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])]);
            // rowbawah.push(data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])]);
            // rowbawah.push(data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])]);
            // rowbawah.push(data.datarraport.map(k => k["raport_IPA"])[data.datarraport.findIndex(s => s["raport_IPA"])]);
            // rowbawah.push(data.datarraport.map(k => k["raport_IPS"])[data.datarraport.findIndex(s => s["raport_IPS"])]);
            // rowbawah.push(data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])]);
            // rowbawah.push(data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])]);
            // rowbawah.push(data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])]);

            // // html += `<tr>
            //     <td>${i + 1}</td>
            //     <td>${jsondatasiswa[i].pd_nama}</td>
            //     <td>${data.datarraport.map(k => k["raport_" + keyagama])[data.datarraport.findIndex(s => s["raport_" + keyagama])]}</td>
            //     <td>${data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])]}</td>
            //     <td>${data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])]}</td>
            //     <td>${data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])]}</td>
            //     <td>${data.datarraport.map(k => k["raport_IPA"])[data.datarraport.findIndex(s => s["raport_IPA"])]}</td>
            //     <td>${data.datarraport.map(k => k["raport_IPS"])[data.datarraport.findIndex(s => s["raport_IPS"])]}</td>
            //     <td>${data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])]}</td>
            //     <td>${data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])]}</td>
            //     <td>${data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])]}</td>
            //     <td>jumlah</td>
            //     <td>rerata</td>
            //     <td>rangking</td>
            // </tr>`;


            // legerbaru["AgamaSiswa"] = agamasiswa;
            // legerbaru["AGAMA"] = data.datarraport.map(k => k["raport_" + keyagama])[0];
            // legerbaru["PKN"] = data.datarraport.map(k => k["raport_PKN"])[data.datarraport.findIndex(s => s["raport_PKN"])];
            // legerbaru["BINDO"] = data.datarraport.map(k => k["raport_BINDO"])[data.datarraport.findIndex(s => s["raport_BINDO"])];
            // legerbaru["MTK"] = data.datarraport.map(k => k["raport_MTK"])[data.datarraport.findIndex(s => s["raport_MTK"])];
            // legerbaru["IPA"] = data.datarraport.map(k => k["raport_IPA"])[data.datarraport.findIndex(s => s["raport_IPA"])];
            // legerbaru["IPS"] = data.datarraport.map(k => k["raport_IPS"])[data.datarraport.findIndex(s => s["raport_IPS"])];
            // legerbaru["SBDP"] = data.datarraport.map(k => k["raport_SBDP"])[data.datarraport.findIndex(s => s["raport_SBDP"])];
            // legerbaru["PJOK"] = data.datarraport.map(k => k["raport_PJOK"])[data.datarraport.findIndex(s => s["raport_PJOK"])];
            // legerbaru["BSUND"] = data.datarraport.map(k => k["raport_BSUND"])[data.datarraport.findIndex(s => s["raport_BSUND"])];
            arraylegerk4.push(legerbaru);
            // arrayLeger.push(o_nilai);

            i++;
        }
        while (i < siswa.length);
        //console.log(arraylegerk4);
        html += `</tbody></table>`
        div.innerHTML = html;
        // let tabelini = document.querySelector(".tabellegerk4").getElementsByTagName("tbody")[0];
        // let arrsortrangk = rangking(arrayRangking);
        // for (let j = 0; j < tabelini.rows.length; j++) {
        //     tabelini.rows[j].cells[13].innerHTML = arrsortrangk[j];
        // }
    } catch (err) {
        // alert("Maaf, Raport untuk siswa ini tidak bisa ditampilkan. Pastikan data nilai KI-3 dan KI-4 minimal ada 2 KD yang memiliki nilai. \n\n Tips: jika memang tidak ada data nilai, beri nilai nol (tidak boleh dikosongkan) untuk Rekap KI-3 atau KI-4.)");
        // console.log(err.message)
        let divto = document.querySelector(".leger_k4");
        divto.innerHTML = "Peringatan! Halaman ini akan muncul ketika Anda telah membuka laman <b>Kompetensi Keterampilan [k-4]</b>";

    }
}
const printleger = (kelas) => {
    let isibody = document.querySelector("." + kelas).innerHTML;
    let kmp
    if (kelas == "leger_k3") {
        kmp = "pengetahuan"
    } else {
        kmp = "Keterampilan"
    }
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-DURASA LEGER</title>`;
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

    body.innerHTML = `<h3 class="w3-center">LEGER NILAI ${kmp}</h3`;
    body.innerHTML += `<h4 class="w3-center">Kelas ${idNamaKelas} Semester ${idSemester}</h4>`;
    body.innerHTML += `<h5 class="w3-center">Tahun Pelajaran ${idTeksTapel}</h5>`;
    body.innerHTML += `${isibody}`;
    body.innerHTML += '<div style="float:left;position:relative;margin-left:50px;text-align:center">Mengetahui,<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><br/><u><b>' + idNamaKepsek + '</b></u><br/>NIP. ' + idNipKepsek + '</div>';
    body.innerHTML += '<div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ', ' + tanggalfull(new Date()) + '<br/>' + idJenisGuru + '<br/><br/><br/><br/><br/><b><u>' + namauser + '</u></b><br/>NIP. ' + idNipGuruKelas + '</div>';



    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();
};
const print_print_bantusiswa = () => {
    let isibody = document.getElementById("idpracetak").innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-DURASA</title>`;
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

};
const excelleger = (kelas) => {
    let tabelsumber = document.querySelector("." + kelas);
    let kdnya = kelas.split("_")[1];
    let tekskd = (kdnya == "k3") ? "PENGETAHUAN" : "KETERAMPILAN"
    let divto = document.getElementById("datasiswaprint");
    let headsumber = tabelsumber.getElementsByTagName("thead")[0];
    let bodysumber = tabelsumber.getElementsByTagName("tbody")[0];
    let jumlahkolom = bodysumber.rows[0].cells.length;

    let tekshtml = `<table class="versi-table w3-tiny" id="tablekeexcelekapkd3${kelas}">
    <tr>
        <td colspan="${jumlahkolom}">LEGER NILAI ${tekskd}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Kelas ${idNamaKelas} Semester ${idSemester}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Tahun Pelajaran ${idTeksTapel}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}"></td>
        
    <tr>
    ${headsumber.innerHTML}
    
    ${bodysumber.innerHTML.replace(/\./g, ",")}
    <tr>
         
    <tr>`


    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Mengetahui, </td>
    <td></td>
    `;
    let sisakolom = jumlahkolom - 11;
    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${jlo.kota}, ${tanggalfull(new Date())}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Kepala ${idNamaSekolah} </td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${idJenisGuru} ${idNamaKelas}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>
    <tr></tr>
    <tr></tr>
    <tr></tr>
    `;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3"><b><u>${idNamaKepsek}</u></b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `<td colspan="3"><b><u>${namauser}</u></b></td> <td></td> <td></td> <td></td> </tr>`;

    tekshtml += `<tr><td></td>
    <td colspan="3">NIP. ${idNipKepsek}</b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `<td colspan="3">NIP. ${idNipGuruKelas}</td> <td></td> <td></td> <td></td> </tr>`;

    tekshtml += `</table>`;
    divto.innerHTML = tekshtml
    $("#tablekeexcelekapkd3" + kelas).table2excel({
        name: "Worksheet Name",
        filename: "Leger nilai " + tekskd + " " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 2,
        barisatas: 5

    });
    divto.innerHTML = "";
};
const urutkanTabel = (el, bol, kelas) => {
    // alert('awalnya ' + bol);
    // alert('kelasnya ' + kelas);
    let div = document.querySelector("." + kelas).getElementsByTagName("tbody")[0];
    let rows, switching, i, x, y, shouldSwitch;

    if (bol) {
        let kolom = div.rows[0].cells.length - 1;
        switching = true;
        while (switching) {
            switching = false;
            rows = div.rows;
            for (i = 0; i < rows.length; i++) {
                shouldSwitch = false;
                x = Number(rows[i].cells[kolom].innerHTML);
                if (i == rows.length - 1) {
                    y = Number(rows[i].cells[kolom].innerHTML);
                } else {
                    y = Number(rows[i + 1].cells[kolom].innerHTML);
                };
                if (x > y) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }

        el.setAttribute("onclick", `urutkanTabel(this,false,'${kelas}')`);
        el.innerHTML = "Kembali";
    } else {
        let kolom = 0;
        switching = true;
        while (switching) {
            switching = false;
            rows = div.rows;
            for (i = 0; i < rows.length; i++) {
                shouldSwitch = false;
                x = Number(rows[i].cells[kolom].innerHTML);
                if (i == rows.length - 1) {
                    y = Number(rows[i].cells[kolom].innerHTML);
                } else {
                    y = Number(rows[i + 1].cells[kolom].innerHTML);
                };
                if (x > y) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
        el.setAttribute("onclick", `urutkanTabel(this,true,'${kelas}')`);
        el.innerHTML = "Urutkan";
        // alert(kolom);

    }
};
const TbodyToArray = (idbody) => {
    var tableInfo = Array.prototype.map.call(document.querySelector("." + idbody).getElementsByTagName('tbody')[0].getElementsByTagName("tr"), function (tr) {
        return Array.prototype.map.call(tr.querySelectorAll('td'), function (td) {
            return td.innerHTML;
        });
    });
    return tableInfo
};
const importdataKeTable = (kelas) => {
    // let div = document.querySelector("." + kelas);
    let konfirmasi = confirm("Sebelum Anda mengimport data excel ke tabel ini, Anda harus memperhatikan data Header file Anda dengan data Header dalam tabel ini. Usahakan data Header di di dalam file Anda sudah sama dengan data header yang ada di dalam Tabel Laman ini. Klik OK untuk melanjutkan, klik CANCEL untuk membatalkan/memperbaiki file");
    if (!konfirmasi) {
        return;
    }
    let tinputexcel = document.getElementById("fileImportExcel");
    tinputexcel.addEventListener('change', () => {
        var fileUpload = tinputexcel;//document.getElementById("fileUpload");

        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value)) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();

                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel(e.target.result, kelas);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        ProcessExcel(data, kelas);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert("Browsernya versi jadul. Ga support.... Ganti dengan Chrome yang terupdate ya");
            }
        } else {
            alert("Importnya file Excel ya ... bukan yang lain.");
        }
    })
    tinputexcel.click();

}
function ProcessExcel(data, kelas) {
    let div = document.querySelector("." + kelas).getElementsByTagName("tbody")[0];
    let tt = div.rows;
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    let sortir = excelRows.filter((k, i) => i > 4 && i < jsondatasiswa.length + 5);
    // console.log(sortir);
    let seltabel = tt[0].cells;
    let arrBaru = [];
    for (let a = 0; a < sortir.length; a++) {
        let ob = {};
        let ob_sortir = sortir[a];
        let kos = Object.keys(ob_sortir);

        ob[kos[0]] = ob_sortir[kos[0]];//nomor urut
        ob[kos[1]] = ob_sortir[kos[1]];//nnama siswa
        for (let b = 2; b < seltabel.length; b++) {
            let keyT = "__EMPTY_" + (b - 1);
            let valXL = ob_sortir[keyT];
            let valBaru = (valXL === undefined) ? "" : valXL;
            ob[keyT] = valBaru;
        }
        arrBaru.push(ob);
    };
    // console.table(arrBaru);
    // console.log(arrBaru);
    let html = ``;
    for (let i = 0; i < arrBaru.length; i++) {
        let d_ob = arrBaru[i];
        html += `<tr>`;
        for (nu in d_ob) {
            html += `<td>${d_ob[nu]}</td>`
        }
        html += `</tr>`;
    }
    div.innerHTML = html;

};
const fn_combineTableVsExcel = () => {
    let tabel = document.querySelector('.kelastabel').getElementsByTagName('tbody')[0];
    let objek = shortir[1];
    for (i = 0; i < tabel.rows[a].length; i++) {

    }

};
const importdataKeTablePerlengkapan = (kelas) => {
    // let div = document.querySelector("." + kelas);
    let konfirmasi = confirm("Sebelum Anda mengimport data excel ke tabel ini, Anda harus memperhatikan data Header file Anda dengan data Header dalam tabel ini. Usahakan data Header di di dalam file Anda sudah sama dengan data header yang ada di dalam Tabel Laman ini. Klik OK untuk melanjutkan, klik CANCEL untuk membatalkan/memperbaiki file");
    if (!konfirmasi) {
        return;
    }
    let tinputexcel = document.getElementById("fileImportExcel");
    tinputexcel.addEventListener('change', () => {
        var fileUpload = tinputexcel;//document.getElementById("fileUpload");

        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value)) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();

                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel2(e.target.result, kelas);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        ProcessExcel2(data, kelas);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert("Browsernya versi jadul. Ga support.... Ganti dengan Chrome yang terupdate ya");
            }
        } else {
            alert("Importnya file Excel ya ... bukan yang lain.");
        }
    })
    tinputexcel.click();

}
function ProcessExcel2(data, kelas) {
    let div = document.querySelector("." + kelas).getElementsByTagName("tbody")[0];
    let tt = div.rows;
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    let sortir = excelRows.filter((k, i) => i > 5 && i < jsondatasiswa.length + 6);
    console.log(sortir);
    let seltabel = tt[0].cells;
    let arrBaru = [];
    for (let a = 0; a < sortir.length; a++) {
        let ob = {};
        let ob_sortir = sortir[a];
        let kos = Object.keys(ob_sortir);

        ob[kos[0]] = ob_sortir[kos[0]];//nomor urut
        ob[kos[1]] = ob_sortir[kos[1]];//nnama siswa
        for (let b = 2; b < seltabel.length; b++) {
            let keyT = "__EMPTY_" + (b - 1);
            let valXL = ob_sortir[keyT];
            let valBaru = (valXL === undefined) ? "" : valXL;
            ob[keyT] = valBaru;
        }
        arrBaru.push(ob);
    };
    // console.table(arrBaru);
    // console.log(arrBaru);
    let html = ``;
    for (let i = 0; i < arrBaru.length; i++) {
        let d_ob = arrBaru[i];
        html += `<tr>`;
        for (nu in d_ob) {
            html += `<td>${d_ob[nu]}</td>`
        }
        html += `</tr>`;
    }
    div.innerHTML = html;

};
const exportk12 = (kelas) => {
    //alert(c);
    let tabelsumber = document.querySelector("." + kelas);

    let tekskd = (kelas == "classtabelk1") ? "SPIRITUAL" : "SOSIAL"
    let divto = document.getElementById("datasiswaprint");
    let headsumber = tabelsumber.getElementsByTagName("thead")[0];
    let bodysumber = tabelsumber.getElementsByTagName("tbody")[0];
    let jumlahkolom = bodysumber.rows[0].cells.length;

    let tekshtml = `<table class="versi-table w3-tiny" id="table__keexcel${kelas}">
    <tr>
        <td colspan="${jumlahkolom}">REKAPITULASI JURNAL KOMPETENSI ${tekskd}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Kelas ${idNamaKelas} Semester ${idSemester}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}">Tahun Pelajaran ${idTeksTapel}</td>
        </tr><tr>
        <td colspan="${jumlahkolom}"></td>
        
    <tr>
    ${headsumber.innerHTML}
    ${bodysumber.innerHTML.replace(/\./g, ",")}
    <tr>
         
    <tr>`


    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Mengetahui, </td>
    <td></td>
    `;
    let sisakolom = jumlahkolom - 11;
    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${jlo.kota}, ${tanggalfull(new Date())}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>`;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3">Kepala ${idNamaSekolah} </td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `
    <td colspan="3">${idJenisGuru} ${idNamaKelas}</td>
    <td></td>
    <td></td>
    <td></td>
    </tr>
    <tr></tr>
    <tr></tr>
    <tr></tr>
    `;

    tekshtml += `
    <tr>
    <td></td>
    <td colspan="3"><b><u>${idNamaKepsek}</u></b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `<td colspan="3"><b><u>${namauser}</u></b></td> <td></td> <td></td> <td></td> </tr>`;

    tekshtml += `<tr><td></td>
    <td colspan="3">NIP. ${idNipKepsek}</b></td>
    <td></td>
    `;

    for (i = 0; i < sisakolom; i++) {
        tekshtml += `<td></td>`;
    }
    tekshtml += `<td colspan="3">NIP. ${idNipGuruKelas}</td> <td></td> <td></td> <td></td> </tr>`;

    tekshtml += `</table>`;
    divto.innerHTML = tekshtml
    $("#table__keexcel" + kelas).table2excel({
        name: "Worksheet Name",
        filename: "JURNAL KOMPETENSI " + tekskd + " " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 1,
        barisatas: 5

    });
    divto.innerHTML = "";
};
const importk12 = (kelas) => {
    //alert(c) 
    let konfirmasi = confirm("Sebelum Anda mengimport data excel ke tabel ini, Anda harus memperhatikan data Header file Anda dengan data Header dalam tabel ini. Usahakan data Header di di dalam file Anda sudah sama dengan data header yang ada di dalam Tabel Laman ini. Klik OK untuk melanjutkan, klik CANCEL untuk membatalkan/memperbaiki file");
    if (!konfirmasi) {
        return;
    }
    let tinputexcel = document.getElementById("fileImportExcel");
    tinputexcel.addEventListener('change', () => {
        var fileUpload = tinputexcel;//document.getElementById("fileUpload");

        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value)) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();

                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel3(e.target.result, kelas);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        ProcessExcel3(data, kelas);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert("Browsernya versi jadul. Ga support.... Ganti dengan Chrome yang terupdate ya");
            }
        } else {
            alert("Importnya file Excel ya ... bukan yang lain.");
        }
    })
    tinputexcel.click();
};
function ProcessExcel3(data, kelas) {
    let div = document.querySelector("." + kelas).getElementsByTagName("tbody")[0];
    let kk = (kelas == "classtabelk1") ? "k1" : "k2";
    let tt = div.rows;
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    let sortir = excelRows.filter((k, i) => i > 2 && i < jsondatasiswa.length + 3);
    console.log(sortir);
    let seltabel = tt[0].cells;
    let arrBaru = [];
    for (let a = 0; a < sortir.length; a++) {
        let ob = {};
        let ob_sortir = sortir[a];
        let kos = Object.keys(ob_sortir);

        ob[kos[0]] = ob_sortir[kos[0]];//nomor urut
        ob[kos[1]] = ob_sortir[kos[1]];//nnama siswa
        for (let b = 2; b < seltabel.length; b++) {
            let keyT = "__EMPTY_" + (b - 1);
            let valXL = ob_sortir[keyT];
            let valBaru = (valXL === undefined) ? "" : valXL;
            ob[keyT] = valBaru;
        }
        arrBaru.push(ob);
    };
    // console.table(arrBaru);
    // console.log(arrBaru);
    let html = ``;
    for (let i = 0; i < arrBaru.length; i++) {
        let d_ob2 = arrBaru[i];
        let d_ob = Object.keys(arrBaru[i]);
        html += `<tr>`;
        // for (nu in d_ob) {
        //     html += `<td>${d_ob[nu]}</td>`
        // }
        for (j = 0; j < d_ob.length - 1; j++) {
            html += `<td>${d_ob2[d_ob[j]]}</td>`
        }
        html += `<td>
        <button title="Tambahkan indikator" onclick="modtambahindikator('${kk}',${i})">+</button>
        <button title="Hapus indikator ini" onclick="hapusindikator('${kk}',${i})"><i class="fa fa-trash"></i></button>
        </td></tr>`;
    }
    div.innerHTML = html;

};

/////////// pindahan nilaimapel untuk guru kelas
function nilaimapel() {
    //sembunyikan
    let btnpak = document.querySelector(".btnpak");
    let btnpas = document.querySelector(".btnpas");
    if (idSemester == 1) {
        btnpak.className += " w3-hide";
    } else {
        btnpas.className += " w3-hide";
    }

    tampilinsublamangurukelas("mapel");
    ;
    //document.getElementById("kurikulum_kd").click();
    //------------------------------------------
    let islam = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "ISLAM" || lk.pd_agama == "Islam" || lk.pd_agama == "islam") {
            return true;
        }
    }).length;
    let bolislam = (islam == 0) ? false : true;

    let kristen = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KRISTEN" ||
            lk.pd_agama == "Kristen" ||
            lk.pd_agama == "kristen" ||
            lk.pd_agama == "PROTESTAN" || lk.pd_agama == "Protestan") {
            return true;
        }
    }).length;
    let bolkristen = (kristen == 0) ? false : true;

    let katolik = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katolik" || lk.pd_agama == "KATHOLIK" || lk.pd_agama == "Katholik" || lk.pd_agama == "katholik") {
            return true;
        }
    }).length;
    let bolkatolik = (katolik == 0) ? false : true;

    let hindu = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "HINDU" || lk.pd_agama == "Hindu" || lk.pd_agama == "hindu") {
            return true;
        }
    }).length;
    let bolhindu = (hindu == 0) ? false : true;

    let budha = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "BUDHA" || lk.pd_agama == "BUDA" || lk.pd_agama == "Budha" || lk.pd_agama == "Buda" || lk.pd_agama == "buda") {
            return true;
        }
    }).length;
    let bolbudha = (budha == 0) ? false : true;
    let khonghucu = jsondatasiswa.filter(function (lk) {
        if (lk.pd_agama == "KHONGHUCU" || lk.pd_agama == "Khong Hu Cu" || lk.pd_agama == "KHONG HUCU" || lk.pd_agama == "Khong Hucu" || lk.pd_agama == "Khong hucu") {
            return true;
        }
    }).length;
    let bolkhonghucu = (khonghucu == 0) ? false : true;


    let divkurikulum = document.getElementById("kurikulum_kd");


    let tekshtml = "<h3> Kompetensi Dasar</h3>";
    tekshtml += `<button class='w3-button w3-round-large w3-blue' onclick="datacekliskd()">Simpan</button><hr/>`;

    let opsimapelagama = ""

    if (bolislam) {
        opsimapelagama += `<option  value='PAI'>Pendidikan Agama Islam dan Budi Pekerti</option>`;
    }
    if (bolkristen) {
        opsimapelagama += `<option  value='PKRIS'>Pendidikan Agama Kristen dan Budi Pekerti</option>`;
    }
    if (bolkatolik) {
        opsimapelagama += `<option  value='PKATO'>Pendidikan Agama Katholik dan Budi Pekerti</option>`;
    }
    if (bolbudha) {
        opsimapelagama += `<option  value='PBUDH'>Pendidikan Agama Budha dan Budi Pekerti</option>`;
    }
    if (bolhindu) {
        opsimapelagama += `<option  value='PHIND'>Pendidikan Agama Hindu dan Budi Pekerti</option>`;
    }
    if (bolkhonghucu) {
        opsimapelagama += `<option  value='PKONG'>Pendidikan Agama Khonghucu dan Budi Pekerti</option>`;
    }

    let adaips = "";
    if (idJenjang >= 4) {
        adaips = `
        <option value="IPA">Ilmu Pengetahuan Alam(IPA)</option>
    <option  value="IPS">Ilmu Pengetahuan SOSIAL (IPS)</option>
        `
    }
    let htmlseleksiulhar = `<select class="w3-select w3-gray w3-hover-light-grey" id="selectnilaimapelulhar" onchange="nilaimapelulhar()">
    <option id="pilihnol" value="">Silakan Pilih Mata Pelajaran</option>
    ${opsimapelagama}
    <option id="selulhar0" value="PKN">Pendidikan Kewarganegaraan (PKN)</option>
    <option id="selulhar1" value="BINDO">Bahasa Indonesia (BINDO)</option>
    <option id="selulhar2" value="MTK">MATEMATIKA (MTK)</option>
    ${adaips}    
    <option id="selulhar5" value="PJOK">Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)</option>
    <option id="selulhar6" value="SBDP">Seni Budaya dan Prakarya (SBDP)</option>
    <option id="selulhar6" value="BSUND">Bahasa Sunda (BSUND)</option>
    </select>
    `;
    opsimapelulhar.innerHTML = htmlseleksiulhar;

    htmlseleksiulhar = `<select class="w3-select w3-gray w3-hover-light-grey" id="selectnilaimapelpts" onchange="nilaimapelpts()">
    <option id="pilihnolpts" value="">Silakan Pilih Mata Pelajaran</option>
    ${opsimapelagama}
    <option id="selptsr0" value="PKN">Pendidikan Kewarganegaraan (PKN)</option>
    <option id="selpts1" value="BINDO">Bahasa Indonesia (BINDO)</option>
    <option id="selpts2" value="MTK">MATEMATIKA (MTK)</option>
    ${adaips}    
    <option id="selpts5" value="PJOK">Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)</option>
    <option id="selpts6" value="SBDP">Seni Budaya dan Prakarya (SBDP)</option>
    <option id="selpts7" value="BSUND">Bahasa Sunda (BSUND)</option>
    </select>
    `;
    opsimapelpts.innerHTML = htmlseleksiulhar;
    htmlseleksiulhar = `<select class="w3-select w3-gray w3-hover-light-grey" id="selectnilaimapelpaspak" onchange="nilaimapelpaspak()">
    <option id="pilihnolpaspak" value="">Silakan Pilih Mata Pelajaran</option>
    ${opsimapelagama}
    <option id="selpaspak0" value="PKN">Pendidikan Kewarganegaraan (PKN)</option>
    <option id="selpaspak1" value="BINDO">Bahasa Indonesia (BINDO)</option>
    <option id="selpaspak2" value="MTK">MATEMATIKA (MTK)</option>
    ${adaips}    
    <option id="selpaspak5" value="PJOK">Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)</option>
    <option id="selpaspak6" value="SBDP">Seni Budaya dan Prakarya (SBDP)</option>
    <option id="selpaspak7" value="BSUND">Bahasa Sunda (BSUND)</option>
    </select>
    `;
    opsimapelpaspak.innerHTML = htmlseleksiulhar;

    htmlseleksiulhar = `<select class="w3-select w3-gray w3-hover-light-grey" id="selectnilaimapelpas" onchange="nilaimapelpas()">
    <option id="pilihnolpas" value="">Silakan Pilih Mata Pelajaran</option>
    ${opsimapelagama}
    <option id="selpas0" value="PKN">Pendidikan Kewarganegaraan (PKN)</option>
    <option id="selpas1" value="BINDO">Bahasa Indonesia (BINDO)</option>
    <option id="selpas2" value="MTK">MATEMATIKA (MTK)</option>
    ${adaips}    
    <option id="selpas5" value="PJOK">Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)</option>
    <option id="selpas6" value="SBDP">Seni Budaya dan Prakarya (SBDP)</option>
    <option id="selpas7" value="BSUND">Bahasa Sunda (BSUND)</option>
    </select>
    `;
    opsimapelpas.innerHTML = htmlseleksiulhar;

    htmlseleksiulhar = `<select class="w3-select w3-gray w3-hover-light-grey" id="selectnilaimapelkpraktik" onchange="nilaimapelkpraktik()">
    <option id="pilihnolkpraktik" value="">Silakan Pilih Mata Pelajaran</option>
    ${opsimapelagama}
    <option id="selkpraktik0" value="PKN">Pendidikan Kewarganegaraan (PKN)</option>
    <option id="selkpraktik1" value="BINDO">Bahasa Indonesia (BINDO)</option>
    <option id="selkpraktik2" value="MTK">MATEMATIKA (MTK)</option>
    ${adaips}    
    <option id="selkpraktik5" value="PJOK">Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)</option>
    <option id="selkpraktik6" value="SBDP">Seni Budaya dan Prakarya (SBDP)</option>
    <option id="selkpraktik7" value="BSUND">Bahasa Sunda (BSUND)</option>
    </select>
    `;
    opsimapelkpraktik.innerHTML = htmlseleksiulhar;

    htmlseleksiulhar = `<select class="w3-select w3-gray w3-hover-light-grey" id="selectnilaimapelkproduk" onchange="nilaimapelkproduk()">
    <option id="pilihnolkproduk" value="">Silakan Pilih Mata Pelajaran</option>
    ${opsimapelagama}
    <option id="selkproduk0" value="PKN">Pendidikan Kewarganegaraan (PKN)</option>
    <option id="selkproduk1" value="BINDO">Bahasa Indonesia (BINDO)</option>
    <option id="selkproduk2" value="MTK">MATEMATIKA (MTK)</option>
    ${adaips}    
    <option id="selkproduk5" value="PJOK">Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)</option>
    <option id="selkproduk6" value="SBDP">Seni Budaya dan Prakarya (SBDP)</option>
    <option id="selkproduk7" value="BSUND">Bahasa Sunda (BSUND)</option>
    </select>
    `;
    opsimapelkproduk.innerHTML = htmlseleksiulhar;

    htmlseleksiulhar = `<select class="w3-select w3-gray w3-hover-light-grey" id="selectnilaimapelkproyek" onchange="nilaimapelkproyek()">
    <option id="pilihnolkproyek" value="">Silakan Pilih Mata Pelajaran</option>
    ${opsimapelagama}
    <option id="selkproyek0" value="PKN">Pendidikan Kewarganegaraan (PKN)</option>
    <option id="selkproyek1" value="BINDO">Bahasa Indonesia (BINDO)</option>
    <option id="selkproyek2" value="MTK">MATEMATIKA (MTK)</option>
    ${adaips}    
    <option id="selkproyek5" value="PJOK">Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)</option>
    <option id="selkproyek6" value="SBDP">Seni Budaya dan Prakarya (SBDP)</option>
    <option id="selkproyek7" value="BSUND">Bahasa Sunda (BSUND)</option>
    </select>   
    `;
    opsimapelkproyek.innerHTML = htmlseleksiulhar;
    // ulhar.style.display = "block"
    document.querySelector(".btnuh").click()
}

const toggleusulanbaru = (cond) =>{
    let usulkelasinibelumdisetujui = informasiusulandata["usulanbaru"] ;  
    let usulkelasinisudahdisetujui = informasiusulandata["usulandisetujui"] ;
    let   usulkelasini = informasiusulandata["all"];
    if(cond == "perlebar"){
        document.querySelector(".pesankhusussiswa").className = document.querySelector(".pesankhusussiswa").className.replace(" w3-hide", "");
        document.querySelector(".pesankhusussiswa").innerHTML = `<button class="toggleusulanperubahandata w3-btn w3-right w3-teal" onclick="toggleusulanbaru('persempit')" title="klik ini untuk menutup info ini">Tutup</button>Anda memiliki ${usulkelasinibelumdisetujui.length} usulan data perubahan data baru (Daftar Ulang) dari siswa Anda yang belum disetujui (diverifikasi). Segera Verifikasi data tersebut di menu Data Kelas Anda. (Tombol informasi berwarna merah menandakan siswa yang mengusulkan perbaruan data.)
                <br/>
                <br/>
                <table class="w3-table-all w3-striped" style="width:50%;margin:0 auto">
                <caption>Tabel Pengusulan Perubahan Data (Daftar Ulang)</caption>
                    <tr>
                        <td>Jumlah Siswa</td>
                        <td>${jsondatasiswa.length}</td>
                    </tr><tr>    
                        <td>Usulan <b class="w3-text-red">Belum</b> Diverifikasi</td>
                        <td>${usulkelasinibelumdisetujui.length}</td>
                    </tr><tr>    
                    <td>Usulan <b  class="w3-text-blue">Sudah</b> Diverifikasi</th>
                        <td>${usulkelasinisudahdisetujui.length}</td>
                    </tr>
                </table>
                <hr/>
                `;
    }else{
       // <button class="toggleusulanperubahandata w3-btn" onclick="toggleusulanbaru('perlebar')" title="klik ini untuk melihat detailnya">Detail</button>`;
       document.querySelector(".pesankhusussiswa").className = document.querySelector(".pesankhusussiswa").className.replace(" w3-hide", "");
       document.querySelector(".pesankhusussiswa").innerHTML = `<button class="toggleusulanperubahandata w3-btn w3-teal w3-right" onclick="toggleusulanbaru('perlebar')" title="klik ini untuk melihat detailnya">Detail</button>
       Anda memiliki ${usulkelasinibelumdisetujui.length} usulan data perubahan data baru.`


    }
}

panggildatagooglemeet();
const ubah_aagk_harian =() => {
    // loadingtopbarin("loadingtopbar");
    let cb = document.querySelector("#aagk_checkbox_harian");
    let lcb = document.querySelector("#aagk_label_harian");
    if (cb.checked == true){
        lcb.innerHTML = "Absen Moda Tatap Muka";
        
        absenharianptmt()
    }else{
        lcb.innerHTML = "Absen Moda PJJ";
        refreshAbsenHariIni();
    };
    // clearInterval(stoploadingtopbar);
    // let divlod = document.querySelector(".loadingtopbar");
    // divlod.style.width = "100%";
    // setTimeout(() => {
    //     divlod.style.width = "1px"
    //     divlod.className += " w3-hide";

    // }, 3000);
    
}

async function absenharianptmt() {
    loadingtopbarin("loadingtopbar");
    var tgl = new Date();
    var tglabsen = tgl.getDate();
    var blnabsenx = tgl.getMonth() + 1;
    var blnabsen = addZero(blnabsenx);

    var thnabsen = tgl.getFullYear();
    let idok = tglabsen + "" + blnabsen + "" + thnabsen;

    var tabel = document.createElement("table");
    tabel.setAttribute("class", "w3-table-all garis");
    tabel.setAttribute("id", "tabelloadinghariini")
    var tr = tabel.insertRow(0);

    var thno = document.createElement("th");
    thno.innerHTML = "No."
    tr.appendChild(thno);
    var thnama = document.createElement("th");
    thnama.innerHTML = "Nama"
    tr.appendChild(thnama);

    var thkehadiran = document.createElement("th");
    thkehadiran.innerHTML = "Kehadiran"
    tr.appendChild(thkehadiran);

    var thaksi = document.createElement("th");
    thaksi.innerHTML = "Aksi"
    tr.appendChild(thaksi);

    for (var i = 0; i < jsondatasiswa.length; i++) {
        var trs = tabel.insertRow(-1);
        var selno = trs.insertCell(-1);
        selno.innerHTML = (i * 1) + 1;
        var selnama = trs.insertCell(-1);
        selnama.innerHTML = jsondatasiswa[i].pd_nama;
        var selkehadiran = trs.insertCell(-1);
        selkehadiran.setAttribute("style", "vertical-align:center;text-align:center");
        selkehadiran.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Loading ...";;
        var selaksi = trs.insertCell(-1);

        // var tombolwa = document.createElement("button");
        // tombolwa.setAttribute("onclick", "kirimwauntukabsen('wa" + "_" + jsondatasiswa[i].id + "')");
        // tombolwa.setAttribute("class", "w3-button w3-yellow w3-round-large w3-card-4 w3-margin-left w3-margin-top ");
        // tombolwa.innerHTML = "<i class='fa fa-whatsapp'></i> Siswa";
        // selaksi.appendChild(tombolwa);


        var pisahin = document.createElement("br");
        //selaksi.appendChild(pisahin);
        var tombolbantusiswa = document.createElement("button");

        tombolbantusiswa.setAttribute("onclick", "bantuabsen('" + jsondatasiswa[i].id + "_" + idok + "')");
        tombolbantusiswa.setAttribute("class", "w3-button w3-yellow w3-round-large w3-margin-left w3-margin-top w3-card-4");
        tombolbantusiswa.innerHTML = "<i class='fa fa-child'></i> Ubah Kehadiran"
        selaksi.appendChild(tombolbantusiswa);


    }
    tabelabsenhariini.innerHTML = "";
    tabelabsenhariini.appendChild(tabel);

    var tglcari = new Date();

    var thn = tglcari.getFullYear();
    var bln = tglcari.getMonth();
    var tgl = tglcari.getDate();

    spinspin.innerHTML = "<i class='fa fa-spin fa-spinner'></i> Loading ...";

    var jsonabsenkelasperbulan = [];
    let kelas = ruangankelas;

    if (localStorage.hasOwnProperty('absenHariIni')) {
        jsonabsenkelasperbulan = JSON.parse(localStorage.getItem('absenHariIni'));
    } else {
        jsonabsenkelasperbulan = await fecjsonabsen();
        // console.log(jsonabsenkelasperbulan);
        localStorage.setItem('absenHariIni', JSON.stringify(jsonabsenkelasperbulan));

        setTimeout(function () {
            localStorage.removeItem('absenHariIni');
        }, 60000); //1 menit dihapus
    }


    spinspin.innerHTML = "";

    var datatabel = tabelloadinghariini;

    for (var u = 0; u < datatabel.rows.length; u++) {
        if (u !== 0) {
            if (jsonabsenkelasperbulan.length > 0) {
                for (var v = 0; v < jsonabsenkelasperbulan.length; v++) {
                    // if (datatabel.rows[u].cells[1].innerHTML == jsonabsenkelasperbulan[v].name) {
                    if (jsondatasiswa[u - 1].id == jsonabsenkelasperbulan[v].tokensiswa) {
                        let hdr =jsonabsenkelasperbulan[v].kehadiran;
                        let pto = "";
                        var link = jsonabsenkelasperbulan[v].fileContent;
                        var idExtractor = /\/d\/(.+?)(?:\/|#|\?|$)/;
                        var resulte = jsonabsenkelasperbulan[v].fileContent;
            

                        var linkk = "";
                        if(hdr == "Alpa"){
                            pto = `<img src="/img/alpa.png" style="width:75px;cursor:pointer" alt="poto" onclick="klikpotosiswa(this)"/><br>Alpa`;
                            
                        }else if(hdr == "Sakit"){
                            pto = `<img src="/img/sakit.png" style="width:75px;cursor:pointer" alt="poto" onclick="klikpotosiswa(this)"/><br>Sakit`;

                        }else if(hdr == "Ijin"){
                            pto = `<img src="/img/izin.png" style="width:75px;cursor:pointer" alt="poto" onclick="klikpotosiswa(this)"/><br>Izin`;

                        }else{
                            if(resulte ==""){
                                linkk = "/img/hadir.png";
                                datatabel.rows[u].cells[3].innerHTML = "PTM";

                            }
                            else{
                                linkk = `https://drive.google.com/uc?export=view&id=${resulte}`;
                                datatabel.rows[u].cells[3].innerHTML = "Pukul <br/>" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getHours()) + ":" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getMinutes()) + ":" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getSeconds());


                            }
                           
                            pto = `<img src="${linkk}" style="width:75px;cursor:pointer" alt="poto" onclick="klikpotosiswa(this)"/><br>${hdr}`;
                            
                        }

                        datatabel.rows[u].cells[2].innerHTML = `${pto}`
                        datatabel.rows[u].cells[3].innerHTML = "";
                        //let idpoto="";

                        // if (link !== "") {
                        //     var linksplit = link.replace("https://drive.google.com/file/d/", "");
                        //     var lll =  linksplit.replace("/view?usp=drivesdk", "");
                        //     idpoto = `<img src="https://drive.google.com/uc?export=view&id=${lll}" style="width:75px;cursor:pointer" alt="poto" onclick="klikpotosiswa(this)"/>`;
                        //     datatabel.rows[u].cells[3].innerHTML = "Pukul <br/>" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getHours()) + ":" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getMinutes()) + ":" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getSeconds());
                        
                            
                        // } else {
                        //     //var idpoto = idlogo;
                        //     idpoto = `<img src="/img/hadir.png" style="width:75px;cursor:pointer" alt="poto" onclick="klikpotosiswa(this)"/>`;
                        //     datatabel.rows[u].cells[3].innerHTML = "PTM <br/>";
                        

                        // }
                        // let vpoto = idpoto

                        // datatabel.rows[u].cells[2].innerHTML = `${vpoto}<br/>${hdr}`;
                        // datatabel.rows[u].cells[3].innerHTML = "Pukul <br/>" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getHours()) + ":" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getMinutes()) + ":" + addZero(new Date(jsonabsenkelasperbulan[v].Time_Stamp).getSeconds());
                        if (jsonabsenkelasperbulan[v].idbaris !== "") {
                            datatabel.rows[u].cells[3].innerHTML += `<br/> <button class="w3-btn warnaeka" onclick="hapusabsensiswaini('${jsonabsenkelasperbulan[v].idbaris}')">Ganti/Hapus</button>`;
                        }
                        break;
                    } else {
                        // versi PTM, hadir
                        datatabel.rows[u].cells[2].innerHTML =`<img src="/img/hadir.png" style="width:75px;cursor:pointer" alt="poto" onclick="klikpotosiswa(this)"/><br>Hadir`;;

                    }
                }
            } else {
                datatabel.rows[u].cells[2].innerHTML = `<img src="/img/hadir.png" style="width:75px;cursor:pointer" alt="poto" onclick="klikpotosiswa(this)"/><br>Hadir`;
            }
        }
    }


    clearInterval(stoploadingtopbar);
    let divlod = document.querySelector(".loadingtopbar");
    divlod.style.width = "100%";
    setTimeout(() => {
        divlod.style.width = "1px"
        divlod.className += " w3-hide";

    }, 3000);

}

///ubah_aagk_rekapabsen()
const ubah_aagk_rekapabsen =() => {
    // loadingtopbarin("loadingtopbar");
    let cb = document.querySelector("#aagk_checkbox_rekapabsen");
    let lcb = document.querySelector("#aagk_label_rekapabsen");
    if (cb.checked == true){
        lcb.innerHTML = "Rekap Absen Moda Tatap Muka";
        
        //absenharianptmt()
    }else{
        lcb.innerHTML = "Rekap Absen Moda PJJ";
        //refreshAbsenHariIni();
    };
  
    
}
