let jsonlocalstorage, jsonlocalstoragetypeuser, linkdatauser;
let linkDataUserWithIdss, linkAbsenKaldik // digunakan untuk link yang mengakses SS DataUSer (guru/siswa)
let namauser, ruangankelas, gmpkelas
let idguru = "", idgurubaru = "";
let jsondatasiswa = [], arrayStringTglLibur = [];
let idNamaSekolah, idNamaKelas, idGuruKelas, idNipGuruKelas,
    idKepsek, idNipKepsek, idSemester,
    idJenisGuru, idNoWa, idTeksTapel,
    idNamaKepsek, idJenjang;
let REKAPAbsen = {}, OBJEKHariEfektif;
let obDataRekapKehadiran;
let objekdataguru = {};
let absensekarang;
let jsonabsenkelasperbulan;
let dataseluruhmateri = [];
//let jsondatapendaftar = [];
var mySidebar = document.getElementById("mySidebar"); // Get the Sidebar
var overlayBg = document.getElementById("myOverlay"); // Get the DIV with overlay effect

jsonlocalstorage = JSON.parse(localStorage.getItem("inst_id"));
let dataketeranganakreditasi;
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
(async function () {
    loadingtopbarin("loadingtopbar");
    OBJEKHariEfektif = {
        "Januari": 0, "Februari": 0, "Maret": 0,
        "April": 0, "Mei": 0, "Juni": 0, "Juli": 0, "Agustus": 0,
        "September": 0, "Oktober": 0, "November": 0, "Desember": 0
    };

    obDataRekapKehadiran = { "Hadir": 0, "Ijin": 0, "Sakit": 0, "Alpa": 0 };

    let tgl = new Date();
    let m = tgl.getMonth();
    let sm = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let day = tgl.getDay()
    let y = tgl.getFullYear();
    let string = y + "-" + sm + "-" + d;
    let arraynamaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    let teksbulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];
    //htmlhariini.innerHTML = "Kehadiran Hari Ini " + arraynamaHari[day] + ", " + d + " " + teksbulan[m] + " " + y;// + tanggalfull(string)
    jsonlocalstoragetypeuser = JSON.parse(localStorage.getItem("typeuser"));
    namauser = jsonlocalstoragetypeuser.user;
    gmpkelas = jsonlocalstoragetypeuser.akses;
    ruangankelas = jsonlocalstoragetypeuser.room;
    idguru = jsonlocalstoragetypeuser.idrow;
    idimage = jsonlocalstoragetypeuser.idimg;//
    idNamaKelas = jsonlocalstoragetypeuser.room;
    idGuruKelas = jsonlocalstoragetypeuser.user;
    idNipGuruKelas = jsonlocalstoragetypeuser.nip_guru;
    idNamaKepsek = jsonlocalstoragetypeuser.nama_kepsek;
    idNipKepsek = jsonlocalstoragetypeuser.nip_kepsek;
    idJenisGuru = jsonlocalstoragetypeuser.akses;
    idNoWa = jsonlocalstoragetypeuser.no_wa;
    idSemester = jsonlocalstoragetypeuser.idsemester;
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

    });

    await fetch(linkdataguru)
        .then(m => m.json())
        .then(k => {
            dataapiguru = k.result;

        })

    await fetch("/statis/dataakreditasi.json").then(m => m.json())
        .then(k => {
            // console.log(k.data);
            dataketeranganakreditasi = k.data;

        })
        .catch(er => {
            console.log(er);

        })


    namasekolah.innerHTML = namauser;
    namakota.innerHTML = gmpkelas + " ";//+ ruangankelas;
    var logo = document.getElementById("logosekolahmenu");
    logo.setAttribute("src", "https://drive.google.com/uc?export=view&id=" + idimage);
    logo.setAttribute("alt", "Poto Guru");
    logo.setAttribute("style", "width:90px; height:90px");
    // if (localStorage.hasOwnProperty("datasiswa_all")) {
    //     jsondatasiswa = JSON.parse(localStorage.getItem("datasiswa_all")).datasiswa;
    // } else {
    await fetch(linkDataUserWithIdss + "&action=datakelasaktifall")
        .then(m => m.json())
        .then(k => {
            jsondatasiswa = k.datasiswa.filter(s => s.aktif == "aktif");
            localStorage.setItem("datasiswa_all", JSON.stringify(k));

        }).catch(er => {
            console.log("muat ulang lagi: " + er);

        });
    // }

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


    await fetch(linktendik + "?action=noticeabsenkepsek")
        .then(m => m.json())
        .then(k => {
            //console.log(k)
            absensekarang = k.siapaaja;
            //console.log(absensekarang)
            if (absensekarang.length > 0) {
                // alert("ada " + absensekarang.length + " PTK yang sudah absen hari ini. Yaitu " + absensekarang.join("\n").idabsen)
                showmodalkonfirmasi(absensekarang)
            } else {
                datadivperlupersetujuan.innerHTML = "Sudah Tidak ada lagi. Periksa Kehadiran/Piket PTK Harian";
                modalkonfirmasiabsen.style.display = "none";
            }
        }).catch(er => alert(er))

    if (navigator.storage && navigator.storage.estimate) {
        const quota = await navigator.storage.estimate();
        const percentageUsed = (quota.usage / quota.quota) * 100;
        console.log(`You've used ${percentageUsed}% of the available storage.`);
        const remaining = quota.quota - quota.usage;
        console.log(`You can write up to ${remaining} more bytes.`);
    }
    //await buattabelrekapsemester();

    dashboardgurukelas.innerHTML = idNamaKelas + " ( " + namauser + " )";
    clearInterval(stoploadingtopbar);
    let divlod = document.querySelector(".loadingtopbar");
    divlod.style.width = "100%";
    setTimeout(() => {
        divlod.style.width = "1px"
        divlod.className += " w3-hide";

    }, 3000);
})();

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

const aktifkanmodaltambahuser = (x) => {
    idgurubaru = x;
    idguru = parseFloat(idgurubaru) + 2;
}


async function tomboledituser() { //fungsi tombol untuk mengirimkan data ke server
    formedituser.style.display = "none";
    registrasikanedit.style.display = "none";
    prosesloadingdaftaredit.innerHTML = "<i class='fa fa-spin fa-spinner w3-jumbo'></i>";
    let formElem = document.getElementById("formedituser");
    let data = new FormData(formElem)
    data.append("brs", idguru);
    await fetch(linkDataUserWithIdss + "&action=editguru", {
        method: 'post',
        body: data //new FormData(formElem)
    }).then(m => m.json())
        .then(k => {
            //console.log(k);
            prosesloadingdaftaredit.innerHTML = k.info;
        })
        .catch(err => prosesloadingdaftaredit.innerHTML = "Proses Gagal, dengan kode error: " + err);
}


function kirimeditsiswsa() {
    let namaform = document.getElementById("modaledithapus");
    let data = new FormData(namaform);//new FormData(namaform);
    fetch(linkDataUserWithIdss + "&action=editsiswa", {
        method: 'POST',
        body: data
    }).then(m => m.json())
        .then(k => console.log(k.info))
        .catch(err => resultedit.innerHTML = err)

}

function bandingkan() {
    var dataku = $('#formedituser').serialize();
    dataku += "&brs=" + idguru;//keyidpendaftar.innerHTML;
    var link = linkDataUserWithIdss;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", link, true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            prosesloadingdaftaredit.innerHTML = JSON.parse(xhr.responseText);//"Terima kasih, Data Anda berhasil disimpan.";
            console.log(JSON.parse(xhr.responseText))
        }
    };
    xhr.send(dataku);
}

function validationedit() {
    var name = document.getElementById("usernameedit").value;
    var email = document.getElementById("emailedit").value;
    var sekolah = document.getElementById("sekolahedit").value;
    var kelas = document.getElementById("kelasedit").value;
    var dividpoto_potoguru = document.getElementById("idpoto_potoguruedit").innerHTML;
    var emailReg = email.indexOf("@gmail.com"); ///^([w-.]+@([w-]+.)+[w-]{2,4})?$/;
    if (name === '' || email === '' || sekolah === '' || dividpoto_potoguru === '' || kelas === '') {
        alert("Mohon lengkapi formulir ini dengan lengkap! \r\n Terutama: email, Nama Pengguna, Nama Sekolah, Kelas, termasuk poto");
        return false;
    } else if (emailReg < 0) {
        alert("Format email Anda salah. Mohon gunakan akun Gmail ya ...");
        return false;
    } else {
        return true;
    }
}


function ungg_avataredit() {
    var item = document.getElementById("upl_avataredit").files[0]
    var oFReader = new FileReader();
    oFReader.readAsDataURL(item);
    oFReader.onload = function (oFREvent) {
        document.getElementById("avatarkuedit").src = oFREvent.target.result;
        var tempatidpotoguru = document.getElementById("idpoto_potoguruedit")
        tempatidpotoguru.innerHTML = "";
        var inputbase64 = document.createElement("input");
        inputbase64.setAttribute("name", "data");
        inputbase64.value = oFREvent.target.result.replace(/^.*,/, '');
        var inputfilename = document.createElement("input");
        inputfilename.setAttribute("name", "filename");
        inputfilename.value = "avatar_" + guru_namalengkapedit.value.toUpperCase().replace(/\s+/, "_");
        var inputmimetype = document.createElement("input");
        inputmimetype.setAttribute("name", "mimeType")
        inputmimetype.value = "data:image/jpg"; //e.target.result.match(/^.*(?=;)/)[0]
        tempatidpotoguru.appendChild(inputbase64);
        tempatidpotoguru.appendChild(inputfilename);
        tempatidpotoguru.appendChild(inputmimetype);
    }
}

function fnlihatpasswordedit() { // fungsi untuk melihat input password (dalam simbol atau teks biasa)
    var x = document.getElementById("passwordedit");
    var label = document.getElementById("lihatpasswordedit");
    if (x.type === "password") {
        x.type = "text";
        label.innerHTML = "<i class='fa fa-eye-slash'></i> Sembunyikan Password"
    } else {
        x.type = "password";
        label.innerHTML = "<i class='fa fa-eye'></i> Lihat Password"
    }

}

function formatemail() {
    var inpemail = document.getElementById("emailedit")
    inpemail.value = inpemail.value.replace(/\s+/g, "").toLowerCase();
    if (inpemail.value.indexOf("gmail.com") < 0) {
        alert("Maaf, kami hanya menerima email dari akun Google. Misalnya emailanda@gmail.com")
        inpemail.value = ""
    }
}

function fnjangandobel() {
    let cekuser = jsondatapendaftar.filter(x => x.username == usernameedit.value);
    if (cekuser.length == 1) {
        document.getElementById("jangandobeledit").innerHTML = "Maaf, nama ini sudah pernah mendaftar. silakan gunakan username lain.";
        document.getElementById("usernameedit").value = "";
    } else {
        document.getElementById("jangandobeledit").innerHTML = "Username diijinkan";
    }
}
const profilguru = async () => {
    modaledituser.style.display = "block";
    formedituser.style.display = "block";
    prosesloadingdaftaredit.innerHTML = "";//<i class='fa fa-spin fa-spinner w3-xxxlarge'><i> sedang mencari data Anda..";
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
                                elementform[x].value = nilai[d]//;
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
    //tabeltempatdaftarkelassaya.innerHTML = "";
    w3_close();
    window.localStorage.clear();
    window.location.replace("/index.html")
}


function tampilinsublamangurukelas(fitur) {

    let div = document.getElementById("batasaksesguru")
    let y = div.offsetTop - 40;
    if (fitur == "dataguru") {
        datakelassaya.style.display = "block";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataakreditasi.style.display = "none";
        dataframekreatif.style.display = "none";
        dataprofilsekolah.style.display = "none";
        divgaleri.style.display = "none";
        divsuratsurat.style.display = "none";
        divpkks.style.display = "none";
        document.querySelector(".btntab_dataguru").click();
        window.scrollTo({ top: y, behavior: 'smooth' });

    } else if (fitur == "absen") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "block";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataakreditasi.style.display = "none";
        dataframekreatif.style.display = "none";
        dataprofilsekolah.style.display = "none";
        divgaleri.style.display = "none";
        divsuratsurat.style.display = "none";
        divpkks.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });

    }
    else if (fitur == "beranda") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataakreditasi.style.display = "none";
        dataframekreatif.style.display = "none";
        dataprofilsekolah.style.display = "none";
        divgaleri.style.display = "none";
        divsuratsurat.style.display = "none"; 
        divpkks.style.display = "none";
        window.scrollTo({ top: 43, behavior: 'smooth' });

    } else if (fitur == "pembelajaran") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "block";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataakreditasi.style.display = "none";
        dataframekreatif.style.display = "none";
        dataprofilsekolah.style.display = "none";
        divgaleri.style.display = "none";
        divsuratsurat.style.display = "none";
        divpkks.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (fitur == "kurikulum") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "block";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataakreditasi.style.display = "none";
        dataframekreatif.style.display = "none";
        dataprofilsekolah.style.display = "none";
        divgaleri.style.display = "none";
        divsuratsurat.style.display = "none";
        divpkks.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (fitur == "mapel") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "block";
        datakehadiranguru.style.display = "none";
        dataakreditasi.style.display = "none";
        dataframekreatif.style.display = "none";
        dataprofilsekolah.style.display = "none";
        divgaleri.style.display = "none";
        divsuratsurat.style.display = "none";
        divpkks.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
        
        
    }
    else if (fitur == "kehadiranguru") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "block";
        dataakreditasi.style.display = "none";
        dataframekreatif.style.display = "none";
        divgaleri.style.display = "none";
        dataprofilsekolah.style.display = "none";
        divsuratsurat.style.display = "none";
        divpkks.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
    else if (fitur == "akreditasi") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataakreditasi.style.display = "block";
        dataframekreatif.style.display = "none";
        divgaleri.style.display = "none";
        dataprofilsekolah.style.display = "none";
        divsuratsurat.style.display = "none";
        divpkks.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
    else if (fitur == "meme") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        divgaleri.style.display = "none";
        dataakreditasi.style.display = "none";
        dataframekreatif.style.display = "block";
        dataprofilsekolah.style.display = "none";
        divsuratsurat.style.display = "none";
        divpkks.style.display = "none";

        window.scrollTo({ top: y, behavior: 'smooth' });
    }else if (fitur == "profilesekolah") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataprofilsekolah.style.display = "block";
        divgaleri.style.display = "none";
        divsuratsurat.style.display = "none";
        dataakreditasi.style.display = "none";
        divsuratsurat.style.display = "none";
        divpkks.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });


    }
    else if (fitur == "galery") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataakreditasi.style.display = "none";
        
        divsuratsurat.style.display = "none";
        
        dataprofilsekolah.style.display = "none";
        divgaleri.style.display = "block";
        divpkks.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    }else if (fitur == "surat") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataakreditasi.style.display = "none";
        
        divsuratsurat.style.display = "block";
        
        dataprofilsekolah.style.display = "none";
        divgaleri.style.display = "none";
        divpkks.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    }else if (fitur == "pkks") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataakreditasi.style.display = "none";
        
        divsuratsurat.style.display = "none";
        divpkks.style.display = "block";
        
        dataprofilsekolah.style.display = "none";
        divgaleri.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
    w3_close();
}


const buattabelkeaktifan = (json) => {
    let data = json;//.filter(f => f.kelas !== "Kepala Sekolah");
    //console.log(data);
    let temp = `<table class="versi-table "><thead>
    <tr>
        <th>No.</th>
        <th>Nama Guru</th>
        <th>Pembuatan Materi</th>
        <th>Penilaian Online</th>
        <th>Piket</th>

    </tr>
    </thead>
    <tbody>
    `;
    for (i = 0; i < data.length; i++) {
        temp += `
        <tr>
            <td>${i + 1}</td>
            <td>${data[i].guru_namalengkap}</td>
            <td class="w3-center"><button onclick="cekkbmhariini('${data[i].jenjang}')">Cek</button></td>
            <td class="w3-center"><button onclick="cekkoreksihariini('${data[i].jenjang}')">Cek</button></td>
            <td class="w3-center"><button onclick="cekpikethariini('${data[i].jenjang}')">Cek</button></td>
            </tr>
        `
    }
    temp += `</tbody></table>`;
    tabelabsenhariini.innerHTML = temp;

}
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(/active/g, "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
    if(evt.currentTarget.innerHTML == "Notula Rapat"){
        document.querySelector(".klikfiturrapat").click();
    }
}




let arraydatatendik = [];
const dataguru = () => {
    tampilinsublamangurukelas("dataguru");
    tabeltempatdaftarkelassayaa.style.display = "block";
    tabeltempatdaftarkelassaya.innerHTML = "<i class='fa fa-spinner fa-spin w3-xxxlarge'></i>";
    let arhead = ["No", "Nama Guru", "Tempat Lahir", "Tanggal Lahir", "NIP", "NUPTK", "JK", "Agama", "Status Perkawinan", "Ijazah Terakhir", "Tahun Lulus", "Kependidikan", "Jurusan", "Status Pegawai", "Jabatan", "TMT ASN", "TMT Sekolah", "Tahun Masa Kerja", "Bulan Masa Kerja", "Jenis Tendik", "Tanggal KGB YAD", "Tugas", "Rincian/Jumlah Jam", "Golongan Ruang", "Tanggal Pangkat", "S", "I", "A", "Masa Kerja Sekolah"];
    let notice = {};
    fetch(linktendik + "?action=tabeltendik")
        .then(m => m.json()).then(k => {
            //console.log(k);
            arraydatatendik = k;
            let temp = ``;
            temp += "<h3 class='w3-center' style='position:sticky;position:-webkit-sticky;left:0px;'>DATA PENDIDIK DAN TENAGA KEPENDIDIKAN " + idNamaSekolah.toUpperCase() + "<br/><sub>Format Daftar 1</sub></h3><table class='versi-table w3-tiny' id='tbldaftar1pertama'><thead><tr>";

            for (a = 0; a < arhead.length; a++) {
                if (a == 1) {
                    temp += "<th style='position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000'>" + arhead[a] + "</th>";
                } else {
                    temp += "<th>" + arhead[a] + "</th>";
                }
            }
            temp += "</tr></thead><tbody>";
            let arrperguru = [];
            for (r = 1; r < k.length; r++) {
                let lr = k[r];
                // console.log(CountDown(lr[21]))
                let perguru = {};
                if (!(lr[14] == "HNR" || lr[14] == "HONOR" || lr[14] == "GTY" || lr[14] == "GTT")) {
                    perguru["namaguru"] = dataapiguru.filter(k => k.idabsen == lr[0])[0].guru_namalengkap;// lr[2];
                    perguru["statuspegawai"] = lr[14];
                    perguru["tglkgb"] = lr[21];
                    if (lr[21] != "") {
                        perguru["kettglkgb"] = CountDown(lr[21]).time;
                        perguru["tahunkgb"] = CountDown(lr[21]).tahun;
                        perguru["bulankgb"] = CountDown(lr[21]).bulan;
                    } else {
                        perguru["kettglkgb"] = CountDown(lr[21]).time;
                        perguru["tahunkgb"] = CountDown(lr[16]).tahun;
                        perguru["bulankgb"] = CountDown(lr[16]).bulan;

                    }
                    perguru["golruang"] = lr[24].toUpperCase();
                    perguru["tglpangkatterakhir"] = lr[25];
                    perguru["tahunpangkat"] = umur(lr[25]).tahun;
                    perguru["bulanpangkat"] = umur(lr[25]).tahun;

                    arrperguru.push(perguru);
                }
                temp += "<tr>";
                for (c = 1; c < lr.length; c++) {
                    let gmp = dataapiguru.filter(k => k.idabsen == lr[0])[0].gurukelas_gmp;
                    let mapelkelas = dataapiguru.filter(k => k.idabsen == lr[0])[0].kelas;
                    let kelasampu = dataapiguru.filter(k => k.idabsen == lr[0])[0].kelasampu;
                    let jabatan = "";
                    let jabatanguru = "";
                    //dataapiguru.filter(k => k.idabsen == lr[0])[0].guru_namalengkap;
                    if (gmp == "Guru Mapel") {
                        jabatanguru = "Guru " + mapelkelas;//+ "di Kelas " + kelasampu
                        jabatan = "Guru " + mapelkelas;
                    } else if (gmp == "Guru Kelas") {

                        jabatanguru = gmp + " " + kelasampu;
                        jabatan = gmp
                    } else {

                        jabatan = gmp;
                        jabatanguru = kelasampu;
                    }



                    if (c == 1 && r > 0) {
                        temp += "<td>" + r + "</td>";
                    } else if (c == 2) {
                        temp += "<td style='position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000' onclick='alert(\"hanya bisa diedit oleh guru yang bersangkutan di Elamaso Guru\")'>" + dataapiguru.filter(k => k.idabsen == lr[0])[0].guru_namalengkap + "</td>";
                    } else if (c == 4 || c == 16 || c == 17 || c == 21 || c == 25) {

                        temp += "<td onclick='edittanggal(" + r + "," + (c - 1) + ")'>" + ((lr[c] !== "") ? tanggalfull(lr[c]) : "") + "</td>";
                    } else if (c == 18) {
                        if (lr[16] !== "") {
                            temp += "<td onclick='alert(\"Perhitungan tahun sudah otomatis\")'>" + ((lr[c] !== "") ? umur(lr[16]).tahun : "") + "</td>";

                        } else {

                            temp += "<td onclick='alert(\"Perhitungan bulan sudah otomatis\")'>" + ((lr[c] !== "") ? umur(lr[17]).tahun : "") + "</td>";
                        }

                    } else if (c == 19) {
                        if (lr[16] !== "") {
                            temp += "<td onclick='alert(\"Perhitungan tahun sudah otomatis\")'>" + ((lr[c] !== "") ? umur(lr[16]).bulan : "") + "</td>";
                        } else {
                            temp += "<td onclick='alert(\"Perhitungan bulan sudah otomatis\")'>" + ((lr[c] !== "") ? umur(lr[17]).bulan : "") + "</td>";
                        }
                    } else if (c == 15) {

                        temp += "<td onclick='alert(\"hanya bisa diedit oleh guru yang bersangkutan di Elamaso Guru\")'>" + jabatan + "</td>";
                    }
                    else if (c == 22) {

                        temp += "<td onclick='alert(\"hanya bisa diedit oleh guru yang bersangkutan di Elamaso Guru\")'>" + jabatanguru + "</td>";
                    } else if (c == 29) {

                        temp += "<td onclick='alert(\"Masa Kerja Sekolah sudah otomatis\")'>" + umur(lr[17]).tahun + " Tahun, " + umur(lr[17]).bulan + " Bulan.</td>";
                    } else {
                        temp += "<td contenteditable='true'>" + lr[c] + "</td>";

                    }
                }
                temp += "</tr>";
            }
            temp += "</table>";

            tabeltempatdaftarkelassaya.innerHTML = temp;
            let wid = document.querySelector("#tbldaftar1pertama").offsetWidth + 26;
            //  let divscroll = document.getElementById("scrolltabelabsenrekap");
            let isidivscroll = document.getElementById("isiscrolltabelabsenrekap");
            isidivscroll.setAttribute("style", `width:${wid}px;height:5px;`)

            notice.data = arrperguru;//.filter(u => u.statuspegawai !== "HNR");
            // console.table(notice.data);
            let tabelkgb = `<table class='versi-table' style="margin:0 auto">
            <thead><tr>
            <th>No.</th>
            <th>Nama Guru</th>
            <th>KGB YAD</th>
            <th>Keterangan</th>
            </tr></thead><tbody>
            `;
            let tabelpangkat = `<table class='versi-table' style="margin:0 auto">
            <thead><tr>
            <th>No.</th>
            <th>Nama Guru</th>
            <th>Golongan/Ruang</th>
            <th>TMT Pangkat</th>
            <th>Masa Kerja Golongan<br/><sub>(dihitung dari TMT Gol/Ruang)</sub></th>
            <th>Usulan Kenaikan Pangkat</th>
            </tr></thead><tbody>
            `
            for (d = 0; d < notice.data.length; d++) {
                let thnkgb = notice.data[d].tahunkgb;
                let blnkgb = notice.data[d].bulankgb;
                let thnpangkat = parseInt(notice.data[d].tahunpangkat);
                let blnpangkat = parseInt(notice.data[d].bulanpangkat);
                let masa = notice.data[d].kettglkgb;
                let ket = "";
                if (masa == "akan datang") {
                    if (thnkgb == 0 && blnkgb == 0) {
                        ket = "<span class='w3-red '>Segera usulkan KGB / KGB yang akan datang perlu diperbarui</span> (!)";

                    } else if (thnkgb == 0 && blnkgb > 0) {
                        ket = "<span class='w3-yellow '>" + blnkgb + " bulan lagi KGB harus diperbarui</span>";
                    } else {
                        ket = "<span class='w3-green '>" + thnkgb + " Tahun " + blnkgb + " bulan lagi Usulan KGB berikutnya</span> <b>( &checkmark; )</b>";
                    }
                } else {
                    ket = "<span class='w3-red '>KGB YAD (yang akan datang) wajib diperbarui</span> (!)";

                }
                let ketpangkat = "";
                if (thnpangkat >= 2) {
                    if (blnpangkat > 6) {
                        ketpangkat = "<span class='w3-green'>Memenuhi Syarat</span><b>(&checkmark;)</b>";

                    } else {
                        ketpangkat = `<span class='w3-green'>Memenuhi Syarat ${6 - blnpangkat} bulan lagi.</span><b>(&checkmark;)</b>`;
                    }
                } else {
                    ketpangkat = `<span class='w3-red'>Belum memenuhi syarat</span><b>(!)</b>`;

                }

                let tglnya = (notice.data[d].tglkgb == "") ? "" : tanggalfull(notice.data[d].tglkgb);
                let tglpangkat = (notice.data[d].tglpangkatterakhir == "") ? "" : tanggalfull(notice.data[d].tglpangkatterakhir);
                tabelkgb += `<tr>
                <td>${d + 1}</td>
                <td>${notice.data[d].namaguru}</td>
                <td>${tglnya}</td>
                <td>${ket}</td>
                </td>
                </tr>`;
                tabelpangkat += `<tr>
                <td>${d + 1}</td>
                <td>${notice.data[d].namaguru}</td>
                <td>${notice.data[d].golruang}</td>
                <td>${tglpangkat}</td>
                <td>${thnpangkat} Tahun ${blnpangkat} Bulan.</td>
                <td>${ketpangkat}</td>
                </td>
                </tr>`;
            }

            tabelkgb += "</tbody></table>Keterangan:<br/>KGB YAD : Kenaikan Gaji Berkala Yang Akan Datang";
            tabelpangkat += "</tbody></table>Keterangan:<br/>KGB YAD : Kenaikan Gaji Berkala Yang Akan Datang";
            tabeltempatkgb.innerHTML = "<hr/><h3 class='w3-center'>NOTIFIKASI USULAN KENAIKAN GAJI BERKALA (KGB)<br/>PER BULAN " + NamaBulandariIndex(new Date().getMonth()).toUpperCase() + " " + new Date().getFullYear() + "</h3>" + tabelkgb;
            tabeltempatpangkat.innerHTML = "<hr/><h3 class='w3-center'>NOTIFIKASI USULAN KENAIKAN PANGKAT<br/>PER BULAN " + NamaBulandariIndex(new Date().getMonth()).toUpperCase() + " " + new Date().getFullYear() + "</h3>" + tabelpangkat;
            //DUK
            let htmlduk = "";
            htmlduk += `
            <button class="w3-btn warnaeka w3-border-bottom w3-border-black" onclick="simpanduk()"><i class="fa fa-save"> Simpan Ke Server</i></button>
            <hr/><table class="versi-table garis kelas_tabel_duk" style="margin: 0 auto">
            <thead>
                <tr>
                    <th>Aksi</th>
                    <th>ID</th>
                    <th>Nama PTK</th>
                    <th>Status Pegawai</th>
                    <th>Jabatan</th>
                    <th>Gol/Ruang</th>
                </tr>
            </thead>
            <tbody>`
            for (i = 1; i < k.length; i++) {
                // let kol = k[i];
                htmlduk += `<tr>
                <td>
                    <button onclick="MoveUp.call(this)" class="warnaeka w3-button" title="Naikkan">&#8679;</button>
                    <button onclick="MoveDown.call(this)" class="warnaeka w3-button" title="Turunkan">&#8681;</button>
                </td>
                <td>
                    ${k[i][0]}
                </td>
                <td>
                    ${k[i][2]}
                </td>
                <td>
                    ${k[i][14]}
                    </td>
                <td>
                    ${k[i][15]}
                </td>
                <td>
                    ${k[i][24]}
                </td>
                `;

                htmlduk += `</tr>`;
            }
            htmlduk += `</tbody></table>`;
            document.querySelector(".tempattabelduk").innerHTML = htmlduk;




        }).catch(er => console.log(er))
    let elstablengkap1 = document.getElementById("scrolltabelabsenrekap")
    let elstablengkap2 = document.getElementById("tabeltempatdaftarkelassaya")

    elstablengkap1.onscroll = function () {
        elstablengkap2.scrollLeft = elstablengkap1.scrollLeft;
    };
    elstablengkap2.onscroll = function () {
        elstablengkap1.scrollLeft = elstablengkap2.scrollLeft;
    };
}
//http://jsfiddle.net/z5hroz4p/8/
function get_previoussibling(n) {
    x = n.previousSibling;
    while (x.nodeType != 1) {
        x = x.previousSibling;
    }
    return x;
}
function get_nextsibling(n) {
    x = n.nextSibling;
    while (x != null && x.nodeType != 1) {
        x = x.nextSibling;
    }

    return x;
}
function MoveUp() {
    var table,
        row = this.parentNode;


    while (row != null) {
        if (row.nodeName == 'TR') {
            break;
        }
        row = row.parentNode;
    }
    table = row.parentNode;
    // let batas = row.rowIndex;
    // if (batas !== 1) {
    //     table.insertBefore(row, get_previoussibling(row));

    // } else {
    //     alert("Cukup, tidak bisa dinaikkan lagi.")
    // }

    let batas = row.rowIndex;
    if (batas !== 1) {
        table.insertBefore(row, get_previoussibling(row));

    } else {
        alert("Cukup, tidak bisa dinaikkan lagi.")
    }



}
function MoveDown() {
    var table,
        row = this.parentNode;
    let cektabel = document.querySelector(".kelas_tabel_duk");
    let batasbawah = cektabel.rows.length;

    while (row != null) {
        if (row.nodeName == 'TR') {
            break;
        }
        row = row.parentNode;
    }
    table = row.parentNode;
    // let batas = row.rowIndex;
    // console.log(batas);
    // if (batas !== (batasbawah - 1)) {
    //     table.insertBefore(row, get_nextsibling(get_nextsibling(row)));

    // } else {
    //     alert
    // }

    let batas = row.rowIndex;
    if (batas !== (batasbawah - 1)) {
        table.insertBefore(row, get_nextsibling(get_nextsibling(row)));

    } else {
        alert("Cukup, tidak bisa diturunkan lagi.")
    }



}

function simpanduk() {
    let lr = document.querySelector('.kelas_tabel_duk').getElementsByTagName("tbody")[0];
    let kol = [];
    for (i = 0; i < lr.rows.length; i++) {
        let isi = parseInt(lr.rows[i].cells[1].innerHTML);
        kol.push(isi)
    }
    
    let data = [];
    data.push(arraydatatendik[0]);//headernya
    for (j = 0; j < kol.length; j++) {
        let lr = arraydatatendik.filter(s => s[0] == kol[j])[0];
        data.push(lr)
    }

    let dataa = JSON.stringify(data);

    let kirimin = new FormData();
    kirimin.append("tabel", dataa);
    fetch(linktendik + "?action=simpantendikA", {
        method: "post",
        body: kirimin
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
            dataguru();
            document.querySelector(".btntab_dataguru").click();
        })
        .catch(er => alert(er))
}

const edittanggal = (r, c) => {
    //alert("Baris ke-" + r + "\n\n Kolom ke-" + c);
    modaltanggal.style.display = "block";
    let namatabel = document.getElementById("tbldaftar1pertama");
    let namaheader = namatabel.rows[0].cells[c].innerHTML;
    let tgl = formatbalikin(namatabel.rows[r].cells[c].innerHTML);
    let balikintanggal = StringTanggal(new Date(tgl));
    //let teks = "ini data headerr yang diklik adalah " + namaheader;

    let teks = "<h3 class='w3-center'>Ubah " + namaheader + "</h3>";
    teks += namatabel.rows[r].cells[1].innerHTML + "<hr/>";
    teks += `<input type="date" class="w3-input" id="valuetanggal" onchange="modalubahtanggal()" value="${balikintanggal}"/>`
    teks += `<hr/><span id="translettgl">${tanggalfull(tgl)}</span><hr/>`;
    teks += `<button onclick="tanggaloke(${r},${c})">Simpan</button><hr/>`;
    teks += `<button onclick="hapustanggal(${r},${c})">Hapus</button><hr/>`;
    //

    dataubahtanggal.innerHTML = teks;
    //valuetanggal.value = balikintanggal;

}
const hapustanggal = (r, c) => {
    let namatabel = document.getElementById("tbldaftar1pertama");
    namatabel.rows[r].cells[c].innerHTML = "";
}

const modalubahtanggal = () => {
    let el = document.getElementById("valuetanggal");
    document.getElementById("translettgl").innerHTML = tanggalfull(el.value);
}
const tanggaloke = (r, c) => {
    let namatabel = document.getElementById("tbldaftar1pertama");
    let kolomtahun;// = namatabel.rows[c].cells[15].innerHTML;
    let tanggal = document.getElementById("valuetanggal");
    if (c == 15) {
        //kolomtahun = namatabel.rows[c].cells[15].innerHTML;

        namatabel.rows[r].cells[c].innerHTML = tanggalfull(tanggal.value);
        namatabel.rows[r].cells[17].innerHTML = umur(tanggal.value).tahun;
        namatabel.rows[r].cells[18].innerHTML = umur(tanggal.value).bulan;

    } else if (c == 16) {
        kolomtahun = namatabel.rows[r].cells[15].innerHTML;
        console.log(kolomtahun);
        namatabel.rows[r].cells[c].innerHTML = tanggalfull(tanggal.value);
        if (kolomtahun !== "") {
            //alert("kosong \n kolomtahun=" + kolomtahun);
            namatabel.rows[r].cells[17].innerHTML = umur(formatbalikin(kolomtahun)).tahun;
            namatabel.rows[r].cells[18].innerHTML = umur(formatbalikin(kolomtahun)).bulan;
        } else {
            alert("tidak kosong \n kolomtahun=" + kolomtahun);
            namatabel.rows[r].cells[17].innerHTML = umur(tanggal.value).tahun;// kolomtahun;//umur(kolomtahun).tahun;
            namatabel.rows[r].cells[18].innerHTML = umur(tanggal.value).bulan;//new Date(kolomtahun);//'d';//umur(new Date(kolomtahun)).bulan;
        }
    } else {
        namatabel.rows[r].cells[c].innerHTML = tanggalfull(tanggal.value);
    }
    tutupmodaltanggal.click();
}

const cetakini = () => {
    let isibody = document.getElementById("tabeltempatdaftarkelassaya").innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO DATA GURU</title>`;
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

    body.innerHTML = isibody.replace("Format Daftar 1", "");
    body.innerHTML += '<br/><div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ',' + tanggalfull(new Date()) + '<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><b><u>' + idNamaKepsek + '</u></b><br/>NIP. ' + idNipKepsek + '</div>';

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();


}
function exceldataguru() {
    // alert("dalam tahap pengembangan");


    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    tabelhasil.setAttribute("class", "versi-table");
    tabelhasil.setAttribute("id", "myTableCopy");

    var tabeleditt = document.getElementById("tbldaftar1pertama").getElementsByTagName("thead")[0];
    var cln = tabeleditt.cloneNode(true);
    tabelhasil.appendChild(cln);
    var tabeled = document.getElementById("tbldaftar1pertama").getElementsByTagName("tbody")[0];
    cln = tabeled.cloneNode(true);
    tabelhasil.appendChild(cln);

    datasiswadiv.appendChild(tabelhasil);
    ///sebelum disimpan beresin dulu format angka
    let dat = document.getElementById("myTableCopy")
    let data = document.getElementById("myTableCopy").rows;
    for (i = 0; i < data.length; i++) {
        for (j = 0; j < data[i].cells.length; j++) {
            if (j == 4 || j == 5) {
                //;;data[i].cells[j].innerHTML = "'" + data[i].cells[j].innerHTML
                //data[i].cells[j].setAttribute("data-type", "String");
                if (data[i].cells[j].innerHTML !== "") {
                    data[i].cells[j].innerHTML = "'" + data[i].cells[j].innerHTML
                }
            }
        }
    };
    let head = dat.getElementsByTagName("thead")[0];
    let brs = head.insertRow(0);
    let sel = brs.insertCell(-1);
    sel.setAttribute("colspan", tabeled.rows[0].cells.length)
    sel.innerHTML = "DATA PENDIDIK DAN TENAGA KEPENDIDIKAN UPTD " + idNamaSekolah.toUpperCase();
    brs = head.insertRow(1);
    sel = brs.insertCell(-1);
    sel.innerHTML = "";



    //---------- TAMBAHKAN TANDA TANGAN

    //let cobatabel = tabeledit;// document.getElementById("myTableCopy");
    let tabeledit = dat.getElementsByTagName("tbody")[0];
    let rowcount = tabeledit.rows.length;
    //console.log(rowcount)
    let colcount = tabeledit.rows[0].cells.length;
    countcol = tabeledit.rows[0].cells.length;
    if (colcount >= 5) {

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel.innerHTML = "NIP. " + idNipKepsek;


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel.innerHTML = "<b><u>" + idNamaKepsek + "</u></b>"


        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel.innerHTML = "Kepala " + idNamaSekolah;



        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        for (let a = 0; a < colcount - 4; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date())


        brs = tabeledit.insertRow(rowcount)


    } else {



    }



    $("#myTableCopy").table2excel({

        name: "Worksheet Name",
        filename: "Data Pendidik dan Tendik id=" + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 1,
        barisatas: 2

    });
    datasiswadiv.innerHTML = "";

}

const simpanserverdataguru = () => {
    let tb = document.getElementById("tbldaftar1pertama");
    let lr = tb.rows;
    let all = []
    for (r = 1; r < lr.length; r++) {
        let perbaris = lr[r];
        let isi = []
        for (s = 0; s < perbaris.cells.length; s++) {
            if (s == 0) {
                isi.push(arraydatatendik[r][1])
            } else {
                let d = perbaris.cells[s].innerHTML;
                let o = "";
                if (s == 3 || s == 15 || s == 16 || s == 20 || s == 24) {
                    o = (d == "") ? "" : formatbalikin(d);
                } else {
                    o = d;
                }
                isi.push(o);
            }
        }
        all.push(isi)
    }

    let data = JSON.stringify(all);

    let kirimin = new FormData();
    kirimin.append("tabel", data);
    fetch(linktendik + "?action=simpantendik", {
        method: "post",
        body: kirimin
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
            dataguru();
        })
        .catch(er => alert(er))
    //console.log(tes);
}

const showmodalkonfirmasi = (array) => {
    modalkonfirmasiabsen.style.display = "block";
    let tekshtml = "";
    tekshtml += `<div class="tombolpersetujuanabsen w3-hide w3-center"><div id='previewpotoptk'></div><hr/>
    <textarea id="alasantolak" placeholder="Tulis alasan mengapa Anda menolak absen PTK ini di sini." class="w3-textarea teksalasanditolak w3-hide"></textarea>
    <button class="w3-button w3-blue" id="tombolsetujuiabsen">Setujui</button>
    <button class="w3-button w3-red" id="tombolabsentolak">Tolak</button>
    </div>
    <hr/><center>Silakan Cek Kebenaran Poto Kehadiran PTK
    <table class='versi-table' id="tabelkehadiranmodal">
    <tr>
        <th>No.</th>
        <th>PTK</th>
        <th>Cek Poto</th>
    </tr>
    `;
    let untukdivtabel = `<center>Silakan Cek Kebenaran Poto Kehadiran PTK
    <table class='versi-table' id="tabelkehadiranmodal">
    <tr>
        <th>No.</th>
        <th>PTK</th>
        <th>Cek Poto</th>
    </tr>
    `
    for (i = 0; i < array.length; i++) {
        let namapengabsen = dataapiguru.filter(k => k.idabsen == array[i].idabsen)[0];
        //console.log(namapengabsen);
        tekshtml += `<tr>
        <td>${i + 1}</td>
        <td>${namapengabsen.guru_namalengkap}</td>
        <td id="tombolcekabsen_${i}">
        <button onclick="fncekkehadiran(${array[i].idabsen},${array[i].idbaris},${i})" class="w3-button w3-amber">CEK</button>
        </td>
        </tr>`;
        untukdivtabel += `<tr>
        <td>${i + 1}</td>
        <td>${namapengabsen.guru_namalengkap}</td>
        <td id="tombolcekabsen_${i}">
        <button onclick="fncekkehadiran(${array[i].idabsen},${array[i].idbaris},${i})" class="w3-button w3-amber">CEK</button>
        </td>
        </tr>`
    }
    tekshtml += `</table></center>`
    untukdivtabel += `</table></center>`
        ;
    datakonfirmasimasiabsen.innerHTML = tekshtml;
    datadivperlupersetujuan.innerHTML = untukdivtabel;

    let tomboltolak = document.getElementById("tombolabsentolak");
    let tombolsetuju = document.getElementById("tombolsetujuiabsen");
    let teksalasan = document.getElementById("alasantolak");
    tomboltolak.addEventListener("click", function () {
        //alert("tombol tolak jalan");
        if (tombolsetuju.innerHTML == "Setujui") {
            tombolsetuju.innerHTML = "Kirim";
            teksalasan.className = teksalasan.className.replace("w3-hide", "w3-show");
            // tomboltolak.className = tomboltolak.className.replace("w3-show", "w3-hide");
            if (tomboltolak.className.indexOf("w3-show") == - 1) {
                tomboltolak.className = tomboltolak.className + " w3-hide"
            } else {
                tomboltolak.className = tomboltolak.className.replace("w3-show", "w3-hide")

            }

        } else {
            tombolsetuju.innerHTML = "Setujui"
            teksalasan.className = teksalasan.className.replace("w3-show", "w3-hide");
            tomboltolak.className = tomboltolak.className.replace("w3-hide", "w3-show");


        }
    });

}

const fncekkehadiran = (indekabsen, indekbaris, indeksel) => {
    //alert("indek idabsen " + indekabsen + "\n Indekbaris " + indekbaris);
    modalkonfirmasiabsen.style.display = "block";
    let teksalasan = document.getElementById("alasantolak");
    let tomboltolak = document.getElementById("tombolabsentolak");
    let tombolsetuju = document.getElementById("tombolsetujuiabsen");
    //atur defaultnya
    teksalasan.className = teksalasan.className.replace("w3-show", "w3-hide");
    teksalasan.value = "";
    tomboltolak.innerHTML = "Tolak";
    tombolsetuju.innerHTML = "Setujui";
    tomboltolak.className = tomboltolak.className.replace("w3-hide", "");

    document.getElementsByClassName("tombolpersetujuanabsen")[0].className = document.getElementsByClassName("tombolpersetujuanabsen")[0].className.replace("w3-hide", "w3-show");
    document.getElementsByClassName("tombolpersetujuanabsen")[0].className = document.getElementsByClassName("tombolpersetujuanabsen")[0].className.replace("w3-hide", "w3-show");
    let src = absensekarang.filter(k => k.idabsen == indekabsen && k.idbaris == indekbaris)[0];
    previewpotoptk.innerHTML = `<img src="https://drive.google.com/uc?export=view&id=${src.fileContent}" class='w3-image w3-card-4'/>`;

    //     let alasan = e.parameter.alasan;
    //   let statusijin = e.parameter.status;
    //   let lr = e.parameter.brs;

    tombolsetuju.addEventListener("click", function () {
        let status = (tombolsetuju.innerHTML == "Setujui") ? "disetujui" : "ditolak";
        //let d = "tombolcekabsen_"+indek15_32

        previewpotoptk.innerHTML = "<i class='fa fa-spin fa-refresh'></i> sedang proses...";
        let datakirim = new FormData();
        datakirim.append("alasan", teksalasan.value);
        datakirim.append("status", status);
        datakirim.append("brs", indekbaris);
        //alert("tombol setuju jalan, kode absen " + indekabsen + "\n kode baris " + indekbaris);
        fetch(linktendik + "?action=setujuiabsen", {
            method: "post",
            body: datakirim
        }).then(m => m.json())
            .then(f => {
                // console.log(f.result)
                alert(f.result);

                fetch(linktendik + "?action=noticeabsenkepsek")
                    .then(m => m.json())
                    .then(k => {
                        absensekarang = k.siapaaja;
                        //console.log(absensekarang)
                        if (absensekarang.length > 0) {
                            // alert("ada " + absensekarang.length + " PTK yang sudah absen hari ini. Yaitu " + absensekarang.join("\n").idabsen)
                            showmodalkonfirmasi(absensekarang)
                        } else {
                            datadivperlupersetujuan.innerHTML = "Sudah Tidak ada lagi. Periksa Kehadiran/Piket PTK Harian";
                            modalkonfirmasiabsen.style.display = "none";

                        }
                    }).catch(er => alert(er))

            })
            .catch(er => {
                console.log(er);
                let sel = document.getElementById("tombolcekabsen_" + indekabsen + "_" + indekbaris);
                sel.innerHTML = `<button onclick="fncekkehadiran(${indekabsen},${indekbaris})" class="w3-button w3-red">ULANGI</button>`
            })



    })
};

const kehadiranguru = () => {
    tampilinsublamangurukelas("kehadiranguru");
    let el = document.querySelector(".persetujuan");
    el.click();
}

let tabkehadiranpiket = document.querySelector(".tabkehadiranpiket");
let divtabelpikethariini = document.getElementById("datadivkehadiranpiket");
tabkehadiranpiket.addEventListener("click", function () {
    if (dataapiguru.length == 0) {
        alert("Periksa data guru ya ....");
        dataguru();
        return
    }
    let tekshtml = `<table class='versi-table' id='tabelpikethariini'>
    <thead>
    <tr>
        <th>No.</th>
    
        <th>Nama PTK</th>
        
        <th>Kehadiran</th>
       
        <th>Eviden</th>
        </tr>

    </thead><tbody>
    `
    for (i = 1; i < dataapiguru.length; i++) {
        let nowa = dataapiguru[i].no_wa_user;
        let sub = "";
        if (nowa == "") {
            sub = `<br/><sub>No. WA tidak diisi</sub>`;
        } else {
            sub = "";
        }

        tekshtml += `<tr>
        <td>${i}</td>
        <td>${dataapiguru[i].guru_namalengkap}</td>
        <td><i class="fa fa-spin fa-refresh"></i></td>
        <td>
            <button class="w3-button w3-tiny w3-blue" onclick="bantuabsen('${encodeURIComponent(dataapiguru[i].idabsen)}_${tglStringZero(new Date())}')" title="Bantu Absen"><i class="fa fa-user"></i> Bantu</button>
            <br/><button class="w3-button w3-tiny w3-green" onclick="kirimwauntukabsen('wa_${dataapiguru[i].idabsen}')" title="Bantu Absen"><i class="fa fa-whatsapp"></i> Kirim WA</button>
        ${sub}
            </td>
        </tr>`
    }
    tekshtml += `</tbody></table>`;
    divtabelpikethariini.innerHTML = tekshtml;
    refreshAbsenHariIni();

});

let tabrekappiket = document.querySelector(".tabrekappiket");
tabrekappiket.addEventListener("click", function () {
    let idselect = document.getElementById("daftarpilihbulankehadiranguru");
    idselect.value = new Date().getFullYear() + "-" + addZero(new Date().getMonth() + 1) + "-01";// idselect.selectedIndex;


    modalfnkalenderkehadiranguru();
})
let cektabeldataguru = [];
const modalfnkalenderkehadiranguru = async () => {
    //kondisikan dulu, jika arraydatatendik kosong, load dulu datanya:
    if (arraydatatendik.length == 0) {
        await fetch(linktendik + "?action=tabeltendik")
            .then(m => m.json()).then(k => {
                // console.table(k);
                arraydatatendik = k;
                cektabeldataguru = k.filter(s => s[0] !== "idabsen");;
            })
            .catch(er => console.log(er))
    }
    document.getElementById("rekapabsenguru").innerHTML = "";
    let idselect = document.getElementById("daftarpilihbulankehadiranguru");
    let xx = idselect.selectedIndex;
    let strdate = idselect[xx].value;

    let d = new Date(strdate);
    let m = d.getMonth();
    let y = d.getFullYear()
    let dt = d.getDate();
    let sm = d.getMonth() + 1;
    let nolbulan = addZero(sm);
    let namabulan = NamaBulandariIndex(m);
    let jumlahharibulanini = daysInMonth(sm, y);

    //document.getElementById("bulanrekap").innerHTML = "Tabel Rekap Absensi Bulan " + namabulan + " " + y;

    let tabel = document.createElement("table");
    tabel.setAttribute("class", "versi-table w3-tiny");
    tabel.setAttribute("id", "tabelxx");
    let thead = tabel.createTHead();
    let tr = thead.insertRow(0);

    let th = document.createElement("th");
    th.setAttribute("rowspan", "2");
    th.innerHTML = "No. Urut";
    tr.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("rowspan", "2");
    th.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px;box-shadow: inset 0 0 1px #000000");
    th.innerHTML = "NAMA PTK";
    tr.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("rowspan", "2");
    th.innerHTML = "Jabatan/Tugas";
    tr.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("rowspan", "2");
    th.innerHTML = "Golongan/Ruang";
    tr.appendChild(th);

    th = document.createElement("th");
    th.setAttribute("colspan", jumlahharibulanini);
    th.setAttribute("id", "namaheaderbulan");
    th.innerHTML = "Bulan " + namabulan + " " + y;
    tr.appendChild(th);

    tr = thead.insertRow(-1);
    let itgl = 1;
    let arrayKeteranganLibur = [];
    let itungHE = 0;

    for (let i = 0; i < jumlahharibulanini; i++) {
        let d_tbl = new Date(y, m, itgl);
        let sd_tbl = StringTanggal2(d_tbl);
        let indekshari = d_tbl.getDay()
        let libur = (arrayStringTglLibur.indexOf(sd_tbl) > -1) ? true : false;
        let indekslibur = (arrayStringTglLibur.indexOf(sd_tbl) > -1) ? arrayStringTglLibur.indexOf(sd_tbl) : -1;
        let weekend = (indekshari == 0 || indekshari == 6) ? true : false;
        th = document.createElement("th");

        if (libur) {
            th.setAttribute("class", "w3-red");
            let teksbawah = "Tgl. " + tanggalfull(d_tbl) + " " + arrayKetLibur[indekslibur];
            arrayKeteranganLibur.push(teksbawah)
        } else if (weekend) {
            th.setAttribute("class", "w3-red");
        } else {

            itungHE++
        }

        th.innerHTML = itgl + "<br>" + NamaHaridariIndex(indekshari);


        tr.appendChild(th);

        itgl++
    }

    let datanama = Object.keys(dataapiguru).map(k => dataapiguru[k].guru_namalengkap);
    //console.log(datanama)
    // let datajabatan = Object.keys(dataapiguru).map(k => dataapiguru[k].guru_namalengkap);
    // let datagolruang = Object.keys(dataapiguru).map(k => dataapiguru[k].guru_namalengkap);
    let encodenama = [];// arraydatatendik.map(s=> s[1]); //idabsen
    let encodenamaO = arraydatatendik.map(s => parseInt(s[0]));//.filter(s => s !== "idabsen"); //idabsen//Object.keys(dataapiguru).map(k => parseInt(dataapiguru[k].idabsen));
    // console.table(encodenamaO);
   

    let tbody = tabel.createTBody()
    for (let j = 0; j < cektabeldataguru.length; j++) {

        //encodenama = encodeURIComponent(unescape(datanama[j]));
        // encodenama = encodeURIComponent(unescape(arraydatatendik[j + 1]));
        encodenama = cektabeldataguru[j][0];
        //console.log(encodenama);
        let tes = cektabeldataguru[j];

        tr = tbody.insertRow(-1);
        let cell = tr.insertCell(-1);
        cell.innerHTML = j + 1;

        //tr = tbody.insertRow(-1);
        cell = tr.insertCell(-1);
        cell.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px; box-shadow: inset 0 0 1px #000000");
        cell.innerHTML = tes[2];//arraydatatendik[(j + 1)][2];//"<span style='font-size:12px;' id='datakelas" + j + "'>" + datanama[j] + "</span>";

        //tr = tbody.insertRow(-1);
        cell = tr.insertCell(-1);
        cell.innerHTML = tes[22];//arraydatatendik[j + 1][22];///jabatan 22

        //tr = tbody.insertRow(-1);
        cell = tr.insertCell(-1);
        cell.innerHTML = tes[24];//arraydatatendik[j + 1][24].toUpperCase();//golongan ruang


        let ke = 1;


        for (let k = 0; k < jumlahharibulanini; k++) {
            cell = tr.insertCell(-1);

            d_tbl = new Date(y, m, ke);
            sd_tbl = StringTanggal2(d_tbl);
            indekshari = d_tbl.getDay()
            libur = (arrayStringTglLibur.indexOf(sd_tbl) > -1) ? true : false;
            indekslibur = (arrayStringTglLibur.indexOf(sd_tbl) > -1) ? arrayStringTglLibur.indexOf(sd_tbl) : -1;
            weekend = (indekshari == 0 || indekshari == 6) ? true : false;
            if (libur) {
                cell.setAttribute("class", "w3-red");
                cell.setAttribute("style", "background-color:red")
            } else if (weekend) {
                cell.setAttribute("class", "w3-red");
                cell.setAttribute("style", "background-color:red")
            } else {

                cell.setAttribute("style", "cursor:pointer");
                cell.setAttribute("id", "td_" + encodenama + "_" + ke + "" + nolbulan + "" + y + "");
                cell.setAttribute("onclick", "bantuabsen('" + encodenama + "_" + ke + "" + nolbulan + "" + y + "')");

                cell.innerHTML = "<span style='font-size:10px' id='" + ke + "" + nolbulan + "" + y + "_" + encodenama + "'>x</span>";
            }
            ke++
        }


    }



    document.getElementById("rekapabsenguru").appendChild(tabel);
    let wid = document.querySelector("#tabelxx").offsetWidth + 26;
    //  let divscroll = document.getElementById("scrolltabelabsenrekap");
    let isidivscroll = document.getElementById("isiscrolltabelabsenrekap2");
    isidivscroll.setAttribute("style", `width:${wid}px;height:5px;`)

    let keta = localStorage.getItem("Kaldik");
    let ketc = JSON.parse(keta);
    let ketm = m;
    let kety = y;
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
    document.getElementById("rekapabsenguru").innerHTML += ketlibur;
    tetetetetetet(strdate);
    let elstablengkap1 = document.getElementById("scrolltabelabsenrekap2")
    let elstablengkap2 = document.getElementById("rekapabsenguru")

    elstablengkap1.onscroll = function () {
        elstablengkap2.scrollLeft = elstablengkap1.scrollLeft;
    };
    elstablengkap2.onscroll = function () {
        elstablengkap1.scrollLeft = elstablengkap2.scrollLeft;
    };
}

const tetetetetetet = (ed) => {
    let datee = StringTanggal2(new Date(ed));
    //console.log(datee)
    let namabulan = NamaBulandariIndex(new Date(datee).getMonth());
    //console.log(namabulan);

    fetch(linktendik + "?action=rekapbulanall&strtgl=" + datee)
        .then(m => m.json())
        .then(k => {
            //console.log(k);
            jsonabsenkelasperbulan = k[namabulan].filter(d => d.resume == "disetujui");
            //console.log(jsonabsenkelasperbulan);


            // var datatabel = document.getElementById("tabelxx").getElementsByTagName("tbody")[0];


            for (var i = 0; i < jsonabsenkelasperbulan.length; i++) {
                kodeid = jsonabsenkelasperbulan[i].idtanggal + "_" + encodeURIComponent(dataapiguru.filter(k => k.idabsen == jsonabsenkelasperbulan[i].idabsen)[0].idabsen);
               
                //"<span style='font-size:10px' id='" + ke + "" + nolbulan + "" + y + "_" + ruangankelas + "_" + encodenama + "'>x</span>";

                kodetd = "td_" + encodeURIComponent(dataapiguru.filter(k => k.idabsen == jsonabsenkelasperbulan[i].idabsen)[0].idabsen) + "_" + jsonabsenkelasperbulan[i].idtanggal;
                var isikehadiran = document.getElementById(kodeid)

                if (isikehadiran == null) {
                    // document.getElementById("tabel_rekap_absen_nama_tgl").innerHTML += "<li>" + decodeURIComponent(jsonabsenkelasperbulan[i].name) + " pada tanggal " + new Date(jsonabsenkelasperbulan[i].timestamp).getDate() + " Tidak ada/diubah namanya.</li>";
                } else {
                    var link = jsonabsenkelasperbulan[i].fileContent;
                    if (link !== "") {
                        var linksplit = link.replace("https://drive.google.com/file/d/", "");
                        var linksplitt = linksplit.replace("/view?usp=drivesdk", "");

                    } else {

                        var linksplitt = "1BZwicOBix4eILY0IQrJs4H825w2k4g-3";;
                    }


                    var cekdiv = document.getElementById(kodetd);
                    if (cekdiv != null) {
                        document.getElementById(kodetd).removeAttribute("onclick");

                        isikehadiran.innerHTML = `<img src="https://drive.google.com/uc?export=view&id=${linksplitt}" style="width:20px; height:30px;cursor:pointer" alt="poto" onclick="klikpotoguru(this,'${jsonabsenkelasperbulan[i].kehadiran}<br/>${jsonabsenkelasperbulan[i].timestamp}')"/><br/>${jsonabsenkelasperbulan[i].kehadiran}`;

                    }
                }

            }

        })
        .catch(er => alert(er))
}

const klikpotoguru = (el, pesan) => {

    document.getElementById("img01").src = el.src;
    document.getElementById("previewpotoabsen").style.display = "block";
    document.getElementById("pesanpreviewpotoabsen").innerHTML = pesan.split("<br/>")[0] + "<br/>" + tanggalfulllengkap(pesan.split("<br/>")[1])

}

async function refreshAbsenHariIni() {
    //alert("dalam tahap pengembangan");
    let datee = StringTanggal2(new Date());
    //console.log(datee)
    let namabulan = NamaBulandariIndex(new Date(datee).getMonth());
    //console.log(namabulan);

    await fetch(linktendik + "?action=rekapbulanall&strtgl=" + datee)
        .then(m => m.json())
        .then(k => {
            jsonabsenkelasperbulan = k[namabulan].filter(d => d.idtanggal == tglStringZero(datee));
            //console.log(jsonabsenkelasperbulan)
        })
        .catch(er => {
            alert(er);
            return
        })

    var datatabel = document.getElementById("tabelpikethariini");

    for (var u = 0; u < datatabel.rows.length; u++) {
        if (u !== 0) {
            if (jsonabsenkelasperbulan.length > 0) {
                for (var v = 0; v < jsonabsenkelasperbulan.length; v++) {
                    if (datatabel.rows[u].cells[1].innerHTML == dataapiguru.filter(g => g.idabsen == jsonabsenkelasperbulan[v].idabsen)[0].guru_namalengkap) {
                        //dataapiguru.filter(k => k.idabsen == lr[0])[0].guru_namalengkap
                        var link = jsonabsenkelasperbulan[v].fileContent;
                        if (link !== "") {
                            var linksplit = link.replace("https://drive.google.com/file/d/", "");
                            var idpoto = linksplit.replace("/view?usp=drivesdk", "");

                        } else {
                            var idpoto = "1BZwicOBix4eILY0IQrJs4H825w2k4g-3";
                        }

                        let teks = (jsonabsenkelasperbulan[v].resume == "") ? " menunggu persetujuan" : jsonabsenkelasperbulan[v].resume;
                        datatabel.rows[u].cells[2].innerHTML = `<img src="https://drive.google.com/uc?export=view&id=${idpoto}" style="width:75px;cursor:pointer" alt="poto" onclick="klikpotoguru(this,'${jsonabsenkelasperbulan[v].kehadiran}<br/>${jsonabsenkelasperbulan[v].timestamp}')"/><br/>${jsonabsenkelasperbulan[v].kehadiran} `;
                        datatabel.rows[u].cells[2].innerHTML += "Pukul <br/>" + addZero(new Date(jsonabsenkelasperbulan[v].timestamp).getHours()) + ":" + addZero(new Date(jsonabsenkelasperbulan[v].timestamp).getMinutes()) + ":" + addZero(new Date(jsonabsenkelasperbulan[v].timestamp).getSeconds());
                        datatabel.rows[u].cells[3].innerHTML = teks;
                        // if (jsonabsenkelasperbulan[v].idbaris !== "") {
                        //     datatabel.rows[u].cells[3].innerHTML += `<br/> <button onclick="hapusabsensiswaini('${jsonabsenkelasperbulan[v].idbaris}')">Ganti/Hapus</button>`;
                        // }
                        break;
                    } else {
                        datatabel.rows[u].cells[2].innerHTML = "Belum Absen";
                        // console.log(dataapiguru.filter(g => g.idabsen == jsonabsenkelasperbulan[v].idabsen)[0].guru_namalengkap);




                    }
                }
            } else {
                datatabel.rows[u].cells[2].innerHTML = "Belum Absen"
            }
        }
    }

}

function bantuabsen(encodenama) {


    var teks = encodenama;
    var split = teks.split("_");
    var kodenama = split[0];
    console.log(kodenama);
    var tgl = split[1];
    var strtgl = balikinidok(tgl);
    modalkameraabsen.style.display = "block";
    belumabsenkehadiranguru.style.display = "block";
    let data = dataapiguru.filter(s => s.idabsen == kodenama)[0]
    namagurupiket.innerHTML = data.guru_namalengkap;//decodeURIComponent(kodenama);

    document.querySelector(".ketabsenkehadiranguru").innerHTML = tanggalfull(new Date(strtgl));
    let kodedivpoto = document.querySelector("#datakirimgurupiket")
    kodedivpoto.innerHTML = "";

    tempatidok.value = tgl;
    tempatidabsen.value = data.idabsen;//dataapiguru.filter(k => k.guru_namalengkap == decodeURIComponent(kodenama))[0].idabsen;
    avatargurupiket.src = "/img/lamaso.webp"

};

const bantuabsenkehadiranguru = () => {
    //define the width to resize e.g 600px

    let idabsen = tempatidabsen.value;
    var resize_width = 150;//without px

    //get the image selected
    var item = document.querySelector('#kamerapiket').files[0];
    let kodedivpoto = document.querySelector("#datakirimgurupiket")

    //create a FileReader
    var reader = new FileReader();

    //image turned to base64-encoded Data URI.
    reader.readAsDataURL(item);
    reader.name = item.name;//get the image's name
    reader.size = item.size; //get the image's size
    reader.onload = function (event) {
        var img = new Image();//create a image
        img.src = event.target.result;//result is base64-encoded Data URI
        img.name = event.target.name;//set name (optional)
        img.size = event.target.size;//set size (optional)
        img.onload = function (el) {
            var elem = document.createElement('canvas');//create a canvas

            //scale the image to 600 (width) and keep aspect ratio
            var scaleFactor = resize_width / el.target.width;
            elem.width = resize_width;
            elem.height = el.target.height * scaleFactor;

            //draw in canvas
            var ctx = elem.getContext('2d');
            ctx.drawImage(el.target, 0, 0, elem.width, elem.height);

            //get the base64-encoded Data URI from the resize image
            var srcEncoded = ctx.canvas.toDataURL(el.target, 'image/jpeg', 0);

            // //assign it to thumb src
            var poto = document.querySelector('.imgguruabsen')
            poto.src = srcEncoded;



            kodedivpoto.innerHTML = "";

            var inputbase64 = document.createElement("input");
            inputbase64.setAttribute("id", "hgfileContent");
            inputbase64.value = srcEncoded.replace(/^.*,/, '');

            var inputfilename = document.createElement("input");
            inputfilename.setAttribute("id", "hgfilename");
            inputfilename.value = "avatar_" + idabsen + "_" + new Date().getTime();//StringTanggal(new Date());

            var inputmimetype = document.createElement("input");
            inputmimetype.setAttribute("id", "hgmimeType")
            inputmimetype.value = 'data:image/jpeg';//srcEncoded.match(/^.*(?=;)/)[0]
            //sekarang kita taroh di sini:
            //document.getElementById("idpoto_potoguru").value = srcEncode; //oFREvent.target.result;
            // buat generate input
            kodedivpoto.appendChild(inputbase64);
            kodedivpoto.appendChild(inputfilename);
            kodedivpoto.appendChild(inputmimetype);


        }
        //loginbantu.style.display = "inline-block";
    }


    let labelfor = document.getElementById("tombolabsenguru");
    labelfor.removeAttribute("for");
    labelfor.setAttribute("for", "kirimpotoabsenguru");
    labelfor.innerHTML = "Kirim";
    labelfor.setAttribute("class", labelfor.className.replace("w3-green", "w3-blue"));
    document.querySelector(".ketabsenkehadiranguru").innerHTML = "Poto Siap dikirim";
    let tambahklik = document.getElementById("kirimpotoabsenguru");
    tambahklik.setAttribute("onclick", "gurukirimabsen(" + idabsen + ")")
}

const gurukirimabsen = () => {
    let x = document.getElementById("pilih_kehadirangurupiket").selectedIndex;
    let y = document.getElementById("pilih_kehadirangurupiket").options;

    let idok = tempatidok.value;
    let constidguruabsen = tempatidabsen.value;
    document.querySelector(".ketabsenkehadiranguru").innerHTML = "<i class='fa fa-refresh fa-spin w3-large'></i>";
    belumabsenkehadiranguru.style.display = "none";


    let hadir = y[x].value;
    let database64 = document.getElementById("hgfileContent").value;
    let tipe = document.getElementById("hgmimeType").value;//.replace("data:", "");
    let filename = document.getElementById("hgfilename").value;

    let data = new FormData();
    data.append("database64", database64);
    data.append("tipe", tipe);
    data.append("filename", filename)
    data.append("hadir", hadir);
    data.append("idok", idok);
    data.append("idguruabsen", constidguruabsen);
    fetch(linktendik + "?action=bantuisiabsen", { method: 'post', body: data })
        .then(m => m.json())
        .then(f => {
            //alert(f.result.replace('<br/>', '\n'));
            document.querySelector(".ketabsenkehadiranguru").innerHTML = f.result;
            //kehadiranguru();
            //console.log(f);
            let labelfor = document.getElementById("tombolabsenguru");
            labelfor.removeAttribute("for");
            labelfor.setAttribute("for", "kamerapiket");
            labelfor.innerHTML = "Absen";
            labelfor.setAttribute("class", labelfor.className.replace("w3-blue", "w3-green"));
            var datatabel = document.getElementById("tabelpikethariini");;
            var datatabelrekap = document.getElementById("tabelxx");;

            setTimeout(() => {
                modalkameraabsen.style.display = "none";
                if (datatabel !== null) {
                    refreshAbsenHariIni();
                }
                if (datatabelrekap !== null) {
                    modalfnkalenderkehadiranguru();
                }
            }, 2000);

        })
        .catch(er => {
            alert(er);
            document.querySelector(".ketabsenkehadiranguru").innerHTML = er;
            belumabsenkehadiranguru.style.display = "block";

        })
}

function kirimwauntukabsen(id) {
    var noid = id.split("_")[1];
    datasiswaklik = dataapiguru.filter(x => x.idabsen == noid);

    var tgl = new Date();
    var stgl = tgl.getDate();
    var xbln = tgl.getMonth() + 1;
    var sbln = addZero(xbln);


    var sthn = tgl.getFullYear();
    var idok = stgl + "" + sbln + "" + sthn;

    var kelas = ruangankelas;
    document.getElementById("namaanakdiwa").innerHTML = datasiswaklik[0].guru_namalengkap;
    document.getElementById('wasiswa').style.display = 'block';
    document.kirimwasiswa.nowasiswa.value = "";
    var nowanya = datasiswaklik[0].no_wa_user;
    if (nowanya.length > 11) {
        document.kirimwasiswa.nowasiswa.disabled = true;
        document.kirimwasiswa.nowasiswa.value = nowanya;
        pesanawalwa.innerHTML = "No WA sudah terisi dan siap menghubungi Bapak/Ibu  ";
    }
    else {
        document.kirimwasiswa.nowasiswa.disabled = false;
        pesanawalwa.innerHTML = "No WA belum terisi untuk mengirim pesan WA ke Bapa/Ibu  ";
    }

    var tombolwamodal = document.createElement("button");
    tombolwamodal.setAttribute("class", "login");
    tombolwamodal.setAttribute("onclick", "btnkirimwasiswa()");
    tombolwamodal.innerHTML = "<i class='fa fa-whatsapp'></i> Kirim Pesan";
    document.getElementById("tombolotomatis").innerHTML = "";
    document.getElementById("tombolotomatis").appendChild(tombolwamodal);
}
function btnkirimwasiswa() {
    pesanawalwa.innerHTML = "";
    var teksnya = "Assalamualaikum, Salam sejahtera. \n \n Kami melacak  bahwa Bpk/Ibu " + namaanakdiwa.innerHTML + " belum mengisi kehadiran, silakan balas WA ini dengan mengirimkan Poto untuk Kami bantu kehadirannya. \n \n Berikut pesan khususnya: ";
    var nowaa = document.kirimwasiswa.nowasiswa.value;
    var nowa;
    if (nowaa.slice(0, 1) == "0") {
        nowa = "+62" + nowaa.slice(1, 12);
    }
    else if (nowaa.slice(0, 1) == "6") {
        nowa = "+" + nowaa;
    } else {
        nowa = nowaa
    }
    var urlnya = getLinkWhastapp(nowa, teksnya + "\n \n " + document.kirimwasiswa.tekssiswa.value);
    window.open(urlnya)
    document.kirimwasiswa.reset();
    document.getElementById("wasiswa").style.display = "none";
}

function getLinkWhastapp(number, message) {
    var url = 'https://api.whatsapp.com/send?phone='
        + number
        + '&text='
        + encodeURIComponent(message)

    return url
}

let printrekappiket = document.getElementById("printrekappiket");
printrekappiket.addEventListener("click", function () {
    let isibody = document.getElementById("rekapabsenguru").innerHTML;
    let idselect = document.getElementById("daftarpilihbulankehadiranguru");
    let xx = idselect.selectedIndex;
    let strdate = idselect[xx].text;

    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO DATA GURU</title>`;
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

    body.innerHTML = `<h2 class="w3-center">DAFTAR HADIR PENDIDIK DAN TENAGA KEPENDIDIKAN ${idNamaSekolah.toUpperCase()}<br/>BULAN ${strdate.toUpperCase()} ${new Date().getFullYear()}</h2>`
    body.innerHTML += isibody
    body.innerHTML += '<br/><br/><div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ',' + tanggalfull(new Date()) + '<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><b><u>' + idNamaKepsek + '</u></b><br/>NIP. ' + idNipKepsek + '</div>';

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

})

let tombolexcelpiket = document.getElementById("excelrekappiket");
tombolexcelpiket.addEventListener("click", function () {
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    tabelhasil.setAttribute("class", "versi-table");
    tabelhasil.setAttribute("id", "myTableCopy");

    var tabeleditt = document.getElementById("tabelxx");


    var cln = tabeleditt.cloneNode(true);
    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);
    var tabeledithead = document.getElementById("myTableCopy").getElementsByTagName("thead")[0];
    //tabeledithead.rows[0].deleteCell(1);
    var identitasbulanrekap = tabeledithead.rows[0].cells[4].innerHTML

    var tabeledit = document.getElementById("myTableCopy").getElementsByTagName("tbody")[0];
    for (i = 0; i < tabeledit.rows.length; i++) {
        for (j = 0; j < tabeledit.rows[i].cells.length; j++) {

            let teks = tabeledit.rows[i].cells[j].innerHTML.replace("<br/>", "")
            let tekss = teks.replace("poto", "")
            tabeledit.rows[i].cells[j].innerHTML = tekss;

        };


    }
    let countcol = tabeledit.rows[0].cells.length;
    let brs = tabeledithead.insertRow(0)
    let sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.setAttribute("style", "text-align:center");

    sel.innerHTML = "DAFTAR HADIR PENDIDIK DAN TENAGA KEPENDIDIKAN " + idNamaSekolah.toUpperCase();

    brs = tabeledithead.insertRow(1)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.innerHTML = identitasbulanrekap.toUpperCase();

    brs = tabeledithead.insertRow(2)
    sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol)

    //---------- TAMBAHKAN TANDA TANGAN

    //let cobatabel = tabeledit;// document.getElementById("myTableCopy");
    //let tabeledit = dat.getElementsByTagName("tbody")[0];
    let rowcount = tabeledit.rows.length;
    //console.log(rowcount)
    let colcount = tabeledit.rows[0].cells.length;
    countcol = tabeledit.rows[0].cells.length;
    if (colcount >= 5) {

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        for (let a = 0; a < colcount - 14; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel.setAttribute("colspan", 10);
        sel.innerHTML = "NIP. " + idNipKepsek;


        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        for (let a = 0; a < colcount - 14; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel.setAttribute("colspan", 10);
        sel.innerHTML = "<b><u>" + idNamaKepsek + "</u></b>";


        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)
        brs = tabeledit.insertRow(rowcount)

        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1);
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        for (let a = 0; a < colcount - 14; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel.setAttribute("colspan", 10);
        sel.innerHTML = "Kepala " + idNamaSekolah;



        brs = tabeledit.insertRow(rowcount)
        sel = brs.insertCell(-1)
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        for (let a = 0; a < colcount - 14; a++) {
            sel = brs.insertCell(-1) /// colom kedua ttd kepsek
        }
        sel.setAttribute("colspan", 10);
        sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date())


        brs = tabeledit.insertRow(rowcount)


    } else {



    }




    $("#myTableCopy").table2excel({
        name: idNamaSekolah,
        filename: "Daftar Piket Guru" + " ID FILE " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_judul: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 3,
        barisatas: 3
    });
    datasiswadiv.innerHTML = "";
})



async function absensisiswa() {
    if (dataapiguru.length == 0) {
        alert("Anda harus melihat data guru Anda terlebih dahulu.");
        return
    }
    tampilinsublamangurukelas("absen");
    let tabKBM = document.querySelector(".KBM");
    tabKBM.click();
    let namarombel = arrayrombel();
    let tekshtml = "<table class='versi-table w3-tiny' id='kelasaktif'><thead><tr><th>Jenjang Kelas</th><th>Kelas</th><th>Keaktifan (KBM Berlangsung)</th><th>Konten</th><th>Pembuat Konten</th><th>Pengedit Konten</th></tr></thead><tbody>";
    for (i = 0; i < 6; i++) {
        tekshtml += `<tr>
        <td>Kelas ${i + 1}</td>
        <td>${namarombel.filter(k => k.match(/(\d+)/)[0] == (i + 1)).join("<br/>")}</td>
        <td>Sedang berlangsung / Tidak ada KBM</td>
        <td><button onclick="alert('Cek Konten')" class='w3-blue w3-btn'>Cek Konten</button></td>
        <td>PEmbuat</td>
        <td>diedit</td>
        </tr>
        `
    }
    tekshtml += "</tbody></table>";
    tabelabsenhariini.innerHTML = tekshtml;
    let data = await datadatakontenmateri();
    dataseluruhmateri = data;
    let tabel = document.getElementById("kelasaktif").getElementsByTagName("tbody")[0];
    for (j = 0; j < tabel.rows.length; j++) {
        let adamateri = data.filter(k => k.idtoken == (j + 1) && k.crtToken == zerozeroidok());
        let adaaktifitas = data.filter(k => k.idtoken == (j + 1) && k.crtToken == zerozeroidok()).length;
        tabel.rows[j].cells[2].innerHTML = (adaaktifitas == 0) ? "Tidak ada aktifitas KBM " : "Ada " + adaaktifitas + " Materi Hari ini";//+ " Materi";
        tabel.rows[j].cells[3].innerHTML = "";
        tabel.rows[j].cells[4].innerHTML = "";
        tabel.rows[j].cells[5].innerHTML = "-";
        if (adaaktifitas > 0) {
            localStorage.setItem("kbmtodaykelas_" + (j + 1), JSON.stringify(adamateri));
            for (u = 0; u < adaaktifitas; u++) {
                tabel.rows[j].cells[3].innerHTML += `<button class="w3-button w3-blue w3-tiny" onclick="previewriwayat(${(j + 1)},${u})">Materi ${u + 1}</button><br/><br/>`;
                tabel.rows[j].cells[4].innerHTML += adamateri[u].pembuatpertama + "<br/><br/>";
                if (adamateri[u].action == "materibaru") {
                    tabel.rows[j].cells[5].innerHTML = "- <br/><br/>";
                } else {
                    tabel.rows[j].cells[5].innerHTML += adamateri[u].dibuatoleh + "<br/><br/>";

                }
            }
        }
        // tabel.rows[j].cells[5].innerHTML = data.filter(k => k.idtoken == 1 && k.crtToken == zerozeroidok()).length + " Materi";
    }


}


// let misal1 = data.filter(k => k.idtoken == 1)
// console.log(data)
// console.log(misal1)


const arrayrombel = () => {
    let arraykelas = jsondatasiswa.map(m => m.nama_rombel).filter((a, b, c) => c.indexOf(a) == b)

    return arraykelas.sort()


}

const datadatakontenmateri = () => {
    //let hariini = e.parameter.idoknol;//
    let link = jlo.url_materi + "?idss=" + jlo.ss_materi + "&action=kepsekcekkonten";

    return fetch(link)
        .then(m => m.json())
        .then(k => k.result)

}

let kekatifanguru = document.querySelector(".Keaktifan");
kekatifanguru.addEventListener("click", async function () {
    if (dataseluruhmateri.length == 0) {
        dataseluruhmateri = await datadatakontenmateri();
    }
    let dataguru = dataapiguru.filter(f => f.gurukelas_gmp == "Guru Kelas" || f.gurukelas_gmp == "Guru Mapel");

    tekshtml = `<hr/><table class="versi-table w3-tiny" id="tabelkeaktifangurudalampjj">
    <thead>
    <tr>
    <th>No.</th>
    <th>Nama Guru</th>
    <th>Frekuensi Pembuatan Materi</th>
    <th>Frekuensi Pengeditan/Revisi Materi</th>
    </tr>
    </thead>
    <tbody>
    `;
    for (ii = 0; ii < dataguru.length; ii++) {

        tekshtml += `<tr>
        <td>${ii + 1}</td>
        <td>${dataguru[ii].guru_namalengkap}</td>
        <td>${(dataseluruhmateri.filter(g => g.pembuatpertama == dataguru[ii].guru_namalengkap).length == 0) ? "<b class='w3-text-red'>Belum Pernah Membuat</b>" : dataseluruhmateri.filter(g => g.pembuatpertama == dataguru[ii].guru_namalengkap).length + " Materi"} </td>
        <td>${(dataseluruhmateri.filter(g => g.dibuatoleh == dataguru[ii].guru_namalengkap).length == 0) ? "<b class='w3-text-red'>Belum Pernah Mengedit</b>" : dataseluruhmateri.filter(g => g.dibuatoleh == dataguru[ii].guru_namalengkap).length + " Materi"}</td>
        </tr>
        `
    }
    tekshtml += "</tbody></table>";
    document.getElementById("tabel_rekap_absen_sia_tgl").innerHTML = tekshtml;



})


function printkeaktifangurudalampjj() {
    //alert("Print")
    let isibody = document.getElementById("tabel_rekap_absen_sia_tgl").innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO DATA GURU</title>`;
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

    body.innerHTML = `<h3 class='w3-center'>DATA KEAKTIFAN GURU DALAM KEGIATAN PJJ</h3><h3 class='w3-center'> SEMESTER ${idSemester} TAHUN PELAJARAN ${idTeksTapel}</h3><center> ${isibody}</center><br/><br/><br/>`
    body.innerHTML += '<div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ',' + tanggalfull(new Date()) + '<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><b><u>' + idNamaKepsek + '</u></b><br/>NIP. ' + idNipKepsek + '</div>';

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();


}

let konten = document.querySelector(".Konten");
konten.addEventListener("click", async function () {
    if (dataseluruhmateri.length == 0) {
        dataseluruhmateri = await datadatakontenmateri();
    }
    //let dataguru = dataapiguru.filter(f => f.gurukelas_gmp == "Guru Kelas" || f.gurukelas_gmp == "Guru Mapel");

    tekshtml = `<hr/><table class="versi-table " id="tabelkeaktifangurudalampjj">
    <thead>
    <tr>
    <th>No.</th>
    <th>Judul Materi</th>
    <th>Kelas</th>
    <th>Preview</th>
    </tr>
    </thead>
    <tbody>
    `;
    for (ii = 0; ii < dataseluruhmateri.length; ii++) {

        tekshtml += `<tr>
        <td>${ii + 1}</td>
        <td>${dataseluruhmateri[ii].idmapel}</td>
        <td> Kelas ${dataseluruhmateri[ii].idtoken}</td>
        <td> <button onclick="previewriwayat2(${ii})" class="w3-button w3-purple">Preview</button></td>
        
        </tr>
        `
    }
    tekshtml += "</tbody></table>";
    document.getElementById("tabelabsenrekap").innerHTML = tekshtml;



})


function printkontenpjj() {
    //alert("Print")
    let isibody = document.getElementById("tabelabsenrekap").innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO DATA GURU</title>`;
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

    body.innerHTML = `<h3 class='w3-center'>DATA KONTEN MATERI KEGIATAN BDR/PJJ</h3><h3 class='w3-center'> SEMESTER ${idSemester} TAHUN PELAJARAN ${idTeksTapel}</h3><center> ${isibody}</center><br/><br/><br/>`
    body.innerHTML += '<div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ',' + tanggalfull(new Date()) + '<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><b><u>' + idNamaKepsek + '</u></b><br/>NIP. ' + idNipKepsek + '</div>';

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();


}


let akreditasitersimpan = [];
let tandaklikakreditas = 0;
const pembelajaran = async () => {
    document.getElementById("loadingambildataakreditasitersimpan").innerHTML = `<i class="fa fa-spin fa-spinner w3-xxlarge"></i>`;
    await getDataAkreditasi()
    tampilinsublamangurukelas("akreditasi");
    tandaklikakreditas = 1
    // document.querySelector(".tabbutir1").click();
    // document.getElementById("loadingambildataakreditasitersimpan").innerHTML = "";





}

function kriteriakareditasi(evt, cityName) {
    if (akreditasitersimpan.length == 0) {
        alert("Data file Akreditasi belum siap. Silakan coba lagi.")
        return
    }
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("kontentabbutir");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tabtabbutir");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" activee", "");

    }


    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " activee";

    let angkaid = cityName.match(/(\d+)/)[0];

    let idfilejson = dataketeranganakreditasi.filter(k => k["NO BUTIR"] == angkaid);
    let dataapiakreditasi = [];
    let cekdataapiakreditasi = akreditasitersimpan.filter(k => k.butir == angkaid).length;
    if (cekdataapiakreditasi == 0) {

        for (a = 0; a < idfilejson.length; a++) {
            let obj = {}
            obj.linkfile = "";
            dataapiakreditasi.push(obj);
        }
    } else {
        dataapiakreditasi = akreditasitersimpan.filter(k => k.butir == angkaid);
    }


    let namaid = "divindikatorbutir" + angkaid;
    let namaidkriteria = "divkriteriatelaahdokumenbutir" + angkaid;
    let divindikator = document.getElementById(namaid);
    let divkriteria = document.getElementById(namaidkriteria);
    let namaSNP = ['', 'SKL', 'ISI', 'PROSES', 'PENILAIAN', 'PTK', 'SARPRAS', 'PENGELOLAAN', 'PEMBIAYAAN'];



    divindikator.innerHTML = `<h5> INDIKATOR:</h5>
    <div class="w3-padding w3-card-4">
    ${idfilejson[0]["INDIKATOR"]}
    </div>
    <h5> SUB INDIKATOR:</h5>
    <div class="w3-padding w3-card-4">
    ${idfilejson[0]["SUB INDIKATOR"]}
    </div>
    <h5>STANDAR NASIONAL PENDIDIKAN</h5>
    <div class="w3-padding w3-card-4">
    SNP KE-${idfilejson[0]["SNP"]}
    
    </div>
    <hr/>
    <hr/>
    `;
    let htmlteks = `
    KRITERIA DAN TELAAH DOKUMEN
    <table class="versi-table" id="tabelkriteriadantelaahdokumen${angkaid}">
    <thead>
    <tr>
        <th>No.</th>
        <th>Kriteria</th>
        <th>Telaah Dokumen</th>
        <th>Tagihan</th>
        <th>Link Dokumen</th>
        <th>Aksi</th>
        </thead><tbody>
    </tr>
    `;

    for (j = 0; j < idfilejson.length; j++) {
        //butir;


        htmlteks += `
        <tr>
        <td>${j + 1}</td>
        <td>${idfilejson[j]["KRITERIA"]}</td>
        <td>${idfilejson[j]["TELAAH DOKUMEN "]}</td>
        <td>${idfilejson[j]["KETERANGAN"]}</td>
        
        <td>${dataapiakreditasi[j].linkfile}</td>
        <td>
        <button class="w3-green w3-tiny" onclick="uploaditemakreditasi(${angkaid},${j},${idfilejson[j]["SNP"]})"> + Item</button>
        <button class="w3-red w3-tiny" onclick="hapusselini(${angkaid},${j})"> Hapus</button>
        </td>
        </tr>
        `;
    }
    htmlteks += `</tbody></table>
    <button class="wa btnsimpanakreditasi" onclick="simpanserverdataakreditasi(${angkaid})"><i class="fa fa-save"></i> SIMPAN KE SERVER</button>
    <button class="wa" onclick="simpanexcelbutirini(${angkaid})"><i class="fa fa-download"></i> DOWNLOD FILE EXCEL</button>
    <button class="wa" onclick="printdataakreditasi(${angkaid})"><i class="fa fa-print"></i> PRINT </button>`;
    divkriteria.setAttribute("style", "overflow-x:auto")
    divkriteria.innerHTML = htmlteks
}

const uploaditemakreditasi = (btr, rtbl, snp) => {
    let divpranala = document.getElementById("pranalauploaditem");
    let divdata = document.getElementById("datauploaditem");
    divpranala.innerHTML = "";
    divdata.innerHTML = "";
    document.querySelector('#btnuploaditem').files[0] = "";

    let el = document.getElementById("uploadfileakreditasi")
    el.style.display = "block";
    let elbtn = document.getElementById("btnuploaditem");
    elbtn.removeAttribute("onchange");
    elbtn.setAttribute("onchange", `onCnguploaditem(${btr},${rtbl},${snp})`);
    // nanti setiap kali loading data lainnya, tombol copycode juga gitu.l

    let divt = document.getElementById("divtabelkoleksilink");
    divt.innerHTML = "";
    fetch(linktendik + "?action=getlinkitem").then(m => m.json())
        .then(r => {
            let tbl = document.createElement("table");
            tbl.setAttribute("class", "w3-table-all w3-small")
            let thd = tbl.createTHead();
            let th = thd.insertRow(-1);
            let sh = th.insertCell(-1);
            sh.innerHTML = "No";
            sh = th.insertCell(-1);
            sh.innerHTML = "Nama File";
            sh = th.insertCell(-1);
            sh.innerHTML = "SNP";
            sh = th.insertCell(-1);
            sh.innerHTML = "Preview";
            sh = th.insertCell(-1);
            sh.innerHTML = "Aksi";

            let tb = tbl.createTBody()
            let data = r.result;
            for (i = 0; i < data.length; i++) {
                let lr = tb.insertRow(-1);
                let sel = lr.insertCell(-1)
                sel.innerHTML = i + 1;
                sel = lr.insertCell(-1);
                sel.innerHTML = data[i].namafile;
                sel = lr.insertCell(-1);
                sel.innerHTML = data[i].snp;
                sel = lr.insertCell(-1);
                sel.innerHTML = `<button class="w3-btn w3-tiny w3-blue" onclick='window.open("${data[i].urlfile}","","width=720,height=600")'><i class="fa fa-eye"></i></button>`;
                sel = lr.insertCell(-1);
                sel.innerHTML = `<button class="w3-button w3-green w3-tiny" onclick="tambahkankesel(${btr},${rtbl},'${data[i].namafile}', '${data[i].urlfile}')">Tambahkan</button>`;//data[i].butir;


            }
            divt.appendChild(tbl)
        })


}

const onCnguploaditemGagal = (btr, r, snp) => {
    pranalauploaditem.innerHTML = "";
    datauploaditem.innerHTML = "";


    //get the image selected
    var item = "";
    item = document.querySelector('#btnuploaditem').files[0];


    //create a FileReader
    var reader = new FileReader();

    //image turned to base64-encoded Data URI.
    reader.readAsDataURL(item);
    reader.name = item.name;//get the image's name
    reader.size = item.size; //get the image's size
    reader.onload = function (event) {
        let mmtpe = event.target.result.match(/^.*(?=;)/)[0];


        var srcEncoded = event.target.result;


        pranalauploaditem.innerHTML = "";
        let di = document.createElement("div");
        di.setAttribute("class", "containerbaru w3-center")
        if (mmtpe.indexOf("application/vnd") > -1) {

            ifr = document.createElement("div");
            ifr.setAttribute("class", "responsive-iframebaru w3-xxxlarge w3-center");

            ifr.innerHTML = "PRATINJAU TIDAK TERSEDIA <br/> <br/> File Tidak Dikenal <br/> Mengunggahnya akan menjadi link download.";
            di.appendChild(ifr);
            pranalauploaditem.appendChild(di);
        } else {
            let ifr = document.createElement("iframe");
            ifr.setAttribute("class", "responsive-iframebaru")
            ifr.setAttribute("src", srcEncoded);
            di.appendChild(ifr);
            pranalauploaditem.appendChild(di)

        }
        pranalauploaditem.innerHTML += "<hr/>";

        var inputbase64 = document.createElement("input");
        inputbase64.setAttribute("name", "videodataa");
        inputbase64.setAttribute("id", "videodataa");
        inputbase64.value = srcEncoded.replace(/^.*,/, '');
        // inputbase64.setAttribute("style", "display:none");

        var inputfilename = document.createElement("input");
        inputfilename.setAttribute("name", "videofilenamee");
        inputfilename.setAttribute("id", "videofilenamee");
        // inputfilename.setAttribute("style", "display:none");
        inputfilename.value = "butir_" + btr + "_kriteria_" + r + "_";

        var inputmimetype = document.createElement("input");
        inputmimetype.setAttribute("name", "videomimeTypee")
        inputmimetype.setAttribute("id", "videomimeTypee")
        // inputmimetype.setAttribute("style", "display:none")

        inputmimetype.value = srcEncoded.match(/^.*(?=;)/)[0];;//"data:image/jpeg"; 


        datauploaditem.appendChild(inputbase64);
        datauploaditem.appendChild(inputfilename);
        datauploaditem.appendChild(inputmimetype);
        let teks1 = document.createTextNode("Data siap upload. Klik tombol ini ")
        datauploaditem.appendChild(teks1);
        let tmbl = document.createElement("button",);
        tmbl.setAttribute("class", "w3-black w3-button w3-hover-blue  w3-tiny w3-round-xxlarge");
        tmbl.setAttribute("onclick", `uplitemakeditasi(${btr},${r}, ${snp})`);
        tmbl.innerHTML = "Upload ke Server"

        datauploaditem.append(tmbl);

    }
    //daftarvideo();

}
const uplitemakeditasi = async (btr, indexrow, snp) => {
    let ketval = document.getElementById("masukannamafileitem").value;
    let gmbrdata, gmbrfilename, gmbrmimeType;
    gmbrdata = document.getElementById("videodataa");
    gmbrfilename = document.getElementById("videofilenamee");
    let val = (ketval == "") ? gmbrfilename.value : ketval;
    gmbrmimeType = document.getElementById("videomimeTypee");

    if (gmbrdata == null && gmbrfilename == null && gmbrmimeType == null) {
        alert("Anda belum siap mengupload video/file lainnya ke server");
        return
    }


    //console.log("Data OKE");


    let frmdata = new FormData();
    frmdata.append("videodataa", gmbrdata.value);
    frmdata.append("videofilenamee", gmbrfilename.value);
    frmdata.append("videomimeTypee", gmbrmimeType.value);
    frmdata.append("namafileitem", val);
    frmdata.append("butir", btr);
    frmdata.append("indekkriteria", indexrow);
    frmdata.append("snp", snp);

    let div = document.getElementById("datauploaditem");
    div.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;

    await fetch(linktendik + "?action=uploadkriteriaitem", {
        method: 'post',
        body: frmdata
    })
        .then(m => m.json())
        .then(k => {
            console.log(k)
            alert(k.result)
            let link = k.urlfile;
            let namafile = k.namafile;
            div.innerHTML = `<button class="w3-button w3-green" onclick="tambahkankesel(${btr}, ${indexrow},'${namafile}', '${link}')">Tambahkan ke Tabel</button>`
            //datalinkitem()

            ///--------------------------------------------          
        })
        .catch(er => alert(er))


}

const tambahkankesel = (btr, indek, namafile, link) => {
    let eltabel = document.querySelector("#tabelkriteriadantelaahdokumen" + btr).getElementsByTagName("tbody")[0];
    eltabel.rows[parseInt(indek)].cells[4].innerHTML += `<a style="cursor:pointer"  onclick='window.open("${link}","","width=720,height=600")'>${namafile}</a><br/>`;
    let mod = document.getElementById("uploadfileakreditasi");
    mod.style.display = "none";
}

const simpanserverdataakreditasi = (angkaid) => {
    //alert(angkaid);
    let btn = document.querySelector(".btnsimpanakreditasi");
    btn.innerHTML = "<i class='fa fa-spin fa-spinner w3-large'></i>";
    let tb = "";
    tb = document.getElementById("tabelkriteriadantelaahdokumen" + angkaid).getElementsByTagName("tbody")[0];
    let lr = tb.rows;
    let all = []
    for (r = 0; r < lr.length; r++) {
        let perbaris = lr[r];
        let isi = []
        // for (s = 0; s < perbaris.cells.length; s++) {
        let d = perbaris.cells[4].innerHTML;

        //------------ butir
        isi.push(angkaid);
        isi.push(r);
        isi.push(d);

        all.push(isi)
    }

    let data = JSON.stringify(all);
    let dataform = new FormData();
    dataform.append("butir", angkaid);
    dataform.append("tabel", data);
    //console.log(all)
    fetch(linktendik + "?action=simpandataakreditasi", {
        method: "post",
        body: dataform
    }).then(m => m.json())
        .then(k => {
            alert(k.result);
            btn.innerHTML = `<i class="fa fa-save"></i> SIMPAN KE SERVER`;
        })
        .catch(er => alert(er))
}

function hapusselini(id, r) {

    let table = document.getElementById("tabelkriteriadantelaahdokumen" + id).getElementsByTagName("tbody")[0];
    console.log(table)
    table.rows[r].cells[4].innerHTML = "";
}

const getDataAkreditasi = () => {
    // const kurikulum = () => {
    fetch(linktendik + "?action=getDataSimpanAkreditasi")
        .then(m => m.json())
        .then(k => {
            // console.log(k);
            akreditasitersimpan = k.result;
            document.getElementById("loadingambildataakreditasitersimpan").innerHTML = "";
            if (tandaklikakreditas == 1) {
                document.querySelector(".tabbutir1").click();
                tandaklikakreditas = 0
            }
        })
        .catch(er => {
            alert(er);
            akreditasitersimpan = [];
        })
}

const simpanexcelbutirini = (idtabel) => {
    let namatabel = document.getElementById("tabelkriteriadantelaahdokumen" + idtabel);
    let ketakre = dataketeranganakreditasi.filter(k => k["NO BUTIR"] == idtabel);
    let namaSNP = ['', 'SKL', 'ISI', 'PROSES', 'PENILAIAN', 'PTK', 'SARPRAS', 'PENGELOLAAN', 'PEMBIAYAAN'];
    var datasiswadiv = document.getElementById("datasiswaprint");
    // var datasiswadiv = document.getElementById("testabel");

    let tbl = document.createElement("table");
    tbl.setAttribute("class", "versi-table");
    tbl.setAttribute("id", "tabelprintakreditasi");
    //baris 1
    let tb = tbl.insertRow(0);
    let sel = tb.insertCell(-1);
    sel.setAttribute("colspan", 6);
    sel.innerHTML = "DATA ADMINISTRASI AKREDITASI BUTIR KE-" + idtabel;
    // tb = tbl.insertRow(0);
    // tb = tbl.insertRow(0);
    //baris 2
    tb = tbl.insertRow(-1);
    sel = tb.insertCell(-1);
    sel.setAttribute("colspan", 6);
    sel.innerHTML = idNamaSekolah.toUpperCase() + " KOTA " + jlo.kota.toUpperCase();

    //baris 3
    tb = tbl.insertRow(-1);
    for (i = 0; i < 6; i++) {
        sel = tb.insertCell(-1)
    }
    //baris 4
    tb = tbl.insertRow(-1);
    for (i = 0; i < 6; i++) {
        sel = tb.insertCell(-1)
    }
    //baris 5
    tb = tbl.insertRow(-1);
    for (i = 0; i < 6; i++) {
        sel = tb.insertCell(-1)
    }


    //baris 6
    tb = tbl.insertRow(-1);
    sel = tb.insertCell(-1)
    sel.setAttribute("colspan", 6);
    sel.innerHTML = "INDIKATOR :"
    // for (i = 0; i < 3; i++) {
    //     sel = tb.insertCell(-1)
    // }

    tb = tbl.insertRow(-1);
    sel = tb.insertCell(-1);
    sel.setAttribute("colspan", 6);
    sel.innerHTML = ketakre[0]["INDIKATOR"];

    tb = tbl.insertRow(-1);
    for (i = 0; i < 6; i++) {
        sel = tb.insertCell(-1)
    }



    tb = tbl.insertRow(-1);
    sel = tb.insertCell(-1)
    sel.setAttribute("colspan", 6);
    sel.innerHTML = "SUB INDIKATOR :"
    // for (i = 0; i < 3; i++) {
    //     sel = tb.insertCell(-1)
    // }
    tb = tbl.insertRow(-1);
    sel = tb.insertCell(-1);
    sel.setAttribute("colspan", 6);
    sel.innerHTML = ketakre[0]["SUB INDIKATOR"];

    tb = tbl.insertRow(-1);
    for (i = 0; i < 6; i++) {
        sel = tb.insertCell(-1)
    }
    tb = tbl.insertRow(-1);
    sel = tb.insertCell(-1)
    sel.setAttribute("colspan", 6);
    sel.innerHTML = "STANDAR NASIONAL PENDIDIKAN KE-:"
    // for (i = 0; i < 3; i++) {
    //     sel = tb.insertCell(-1)
    // }
    tb = tbl.insertRow(-1);
    sel = tb.insertCell(-1);
    sel.setAttribute("colspan", 6);
    let teksSNP = ketakre[0]["SNP"];
    let inSNP = parseInt(teksSNP)
    sel.innerHTML = "SNP Ke-" + teksSNP + "  (" + namaSNP[inSNP] + ")";

    tb = tbl.insertRow(-1);
    for (i = 0; i < 6; i++) {
        sel = tb.insertCell(-1);
    }
    tb = tbl.insertRow(-1);
    for (i = 0; i < 6; i++) {
        sel = tb.insertCell(-1);
    }

    tb = tbl.insertRow(-1);
    sel = tb.insertCell(-1);
    sel.setAttribute("colspan", 6);
    sel.innerHTML = "KRITERIA DAN TELAAH DOKUMEN";
    // for (i = 0; i < 3; i++) {
    //     sel = tb.insertCell(-1);
    // }

    // tb = tbl.insertRow(-1);
    // for (i = 0; i < 6; i++) {
    //     sel = tb.insertCell(-1);
    // }    // tb = tbl.insertRow(-1);
    // for (i = 0; i < 6; i++) {
    //     sel = tb.insertCell(-1);
    // }

    let brstabel = namatabel.rows.length
    for (a = 0; a < brstabel; a++) {
        tb = tbl.insertRow(-1);

        let isi = namatabel.rows[a].cells.length - 1;
        for (b = 0; b < isi; b++) {

            sel = tb.insertCell(-1);
            sel.innerHTML = namatabel.rows[a].cells[b].innerHTML;

        }
        if (a == 0) {
            sel = tb.insertCell(-1)
            sel.innerHTML = "Keterangan";
        } else {
            sel = tb.insertCell(-1)
            sel.innerHTML = "";

        }
    }


    // <div class="w3-padding w3-card-4">
    // ${idfilejson[0]["INDIKATOR"]}
    // </div>
    // <h5> SUB INDIKATOR:</h5>
    // <div class="w3-padding w3-card-4">
    // ${idfilejson[0]["SUB INDIKATOR"]}
    // </div>
    // <h5>STANDAR NASIONAL PENDIDIKAN</h5>
    // <div class="w3-padding w3-card-4">
    // SNP KE-${idfilejson[0]["SNP"]}

    datasiswadiv.innerHTML = "";
    datasiswadiv.appendChild(tbl)

    $("#tabelprintakreditasi").table2excel({

        name: "Worksheet Name",
        filename: "Data Akreditasi Butir ke-" + idtabel + "  idfile " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 1,
        barisatas: 16

    });
    datasiswadiv.innerHTML = "";

}

const printdataakreditasi = (butir) => {
    let isibody = "";
    isibody = `<h3 class="w3-center">DATA ADMINISTRASI AKREDITASI BUTIR KE-${butir}</h3>`;
    isibody += `<h3 class="w3-center">${idNamaSekolah.toUpperCase()} KOTA ${jlo.kota.toUpperCase()}</h1>`
    isibody += document.getElementById("divindikatorbutir" + butir).innerHTML;
    isibody += "KRITERIA DAN TELAAH DOKUMEN";
    // let tabsourc = document.getElementById("tabelkriteriadantelaahdokumen" + butir).outerHTML;
    // for(i=0;i<tabsourc;i++){

    // }
    isibody += document.getElementById("tabelkriteriadantelaahdokumen" + butir).outerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO AKREDITASI</title>`;
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

    body.innerHTML = isibody;
    body.innerHTML += '<br/><div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ',' + tanggalfull(new Date()) + '<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><b><u>' + idNamaKepsek + '</u></b><br/>NIP. ' + idNipKepsek + '</div>';

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}

////////////////// source KEPSEK UMUM.JS

function tanggalfull(tgl) {
    var d = new Date(tgl);
    var tgl = d.getDate();
    var bln = d.getMonth();
    var thn = d.getFullYear();
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return tgl + " " + bulan[bln] + " " + thn
}
function formatbalikin(tekss) {
    let teks = tekss.toString();
    let str = teks.split(" ");
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    let date = new Date(str[2], bulan.indexOf(str[1]), str[0]);
    return date;
}

function umur(tgllahir) {
    var curday = new Date().getDate();;//document.cir.len11.value;
    var curmon = new Date().getMonth();//.cir.len12.value;
    var curyear = new Date().getFullYear();//.cir.len13.value;

    var calday = new Date(tgllahir).getDate();//document.cir.len21.value;
    var calmon = new Date(tgllahir).getMonth();//document.cir.len22.value;
    var calyear = new Date(tgllahir).getFullYear();//document.cir.len23.value;

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
    var y1 = date1.getFullYear(), m1 = date1.getMonth(), d1 = date1.getDate(),
        y2 = date2.getFullYear(), m2 = date2.getMonth(), d2 = date2.getDate();

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

const StringTanggal = (tgl) => { //parameter tgl bentuk tgl
    let m = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let y = tgl.getFullYear();


    let string = y + "-" + addZero(m) + "-" + addZero(d);


    //console.log(string)
    return string
}

const StringTanggal2 = (tgl) => { //parameter tgl bentuk tgl
    let m = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let y = tgl.getFullYear();


    let string = y + "-" + m + "-" + d;


    //console.log(string)
    return string
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

const CountDown = (d) => {
    let tgl = new Date(d).getTime();
    let now = new Date().getTime();
    let data = {};
    var tahun, month, days;
    if (tgl > now) {
        data.time = "akan datang"
        var distance = tgl - now;
        tahun = Math.floor(distance / (1000 * 60 * 60 * 24 * 30 * 12));
        month = Math.floor(distance % (1000 * 60 * 60 * 24 * 30 * 12) / (1000 * 60 * 60 * 24 * 30));
        days = Math.floor(distance / (1000 * 60 * 60 * 24));
    } else {
        data.time = "masa lalu"
        var distance = now - tgl;
        tahun = umur(d).tahun;
        month = umur(d).bulan;
        days = umur(d).days;
        // tahun = Math.floor(distance / (1000 * 60 * 60 * 24 * 30 * 12));
        // month = Math.floor(distance % (1000 * 60 * 60 * 24 * 30 * 12) / (1000 * 60 * 60 * 24 * 30));
        // days = Math.floor(distance / (1000 * 60 * 60 * 24));
    }

    // Time calculations for days, hours, minutes and seconds
    data.tahun = tahun;
    data.bulan = month;
    data.hari = days;
    return data

}

const NamaBulandariIndex = (index) => {
    let arraynamabulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return arraynamabulan[index]


}

const NamaHaridariIndex = (index) => {
    let arraynamabulan = ["Mg", "Sn", "Sl", "Rb", "Km", "Jm", "Sb"];
    return arraynamabulan[index]


}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function tanggalfulllengkap(tgl) {
    var d = new Date(tgl);
    var tgl = d.getDate();
    var bln = d.getMonth();
    var thn = d.getFullYear();
    var jam = d.getHours();
    var menit = d.getMinutes();
    var detik = d.getSeconds()
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return tgl + " " + bulan[bln] + " " + thn + " Pukul " + addZero(jam) + ":" + addZero(menit) + ":" + addZero(detik);
}


const tglStringZero = () => { // return= 
    let a = new Date();
    let b = a.getDate();
    let c = a.getMonth() + 1;
    let d = a.getFullYear()
    let idokmateri = b + "" + addZero(c) + "" + d;
    return idokmateri
}

const balikinidok = (teks) => { /// hasil: 2021-3-1
    // kondisi1 = "10032021"
    // kondisi2 = "1032021"
    //let ddd = teks.splice(-6)
    let d, m, y
    if (teks.length == 8) {
        d = teks.slice(0, 2);
        m = teks.slice(2, 4);
        y = teks.slice(4, 8);
    } else {
        d = teks.slice(0, 1);
        m = teks.slice(1, 3);
        y = teks.slice(3, 7);
    }
    let str = y + "-" + deleteZero(m) + "-" + deleteZero(d)
    return str
}
const zerozeroidok = () => { // return= 
    let a = new Date();
    let b = a.getDate();
    let c = a.getMonth() + 1;
    let d = a.getFullYear()
    let idokmateri = addZero(b) + "" + addZero(c) + "" + d;
    return idokmateri
}

////////////////SOURCE KEPSEK UNFAEDAH.JS



const kurikulum = () => {
    alert("Ups, maaf. Fitur belum diaktifkan")
}
const raportkelas = () => {
    alert("Ups, maaf. Fitur belum diaktifkan")
}
const nilaimapel = () => {
    alert("Ups, maaf. Fitur belum diaktifkan")
}

const previewriwayat = (kelas, par) => {
    pranalamateri.style.display = "block";
    document.querySelector(".classReviewMateri").innerHTML = "";

    let tes = document.querySelector(".classReviewMateri");
    let keyy = "kbmtodaykelas_" + kelas;

    let datamateri = JSON.parse(localStorage.getItem(keyy))

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
        keteranganakses = "Menerima Tagihan Tugas/Nilai dari Siswa";
    } else {
        keteranganakses = "Tidak Menerima Tagihan/Nilai (untuk latihan, rangkuman, dll)";
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


        var elEssay = document.getElementsByClassName("soalessay")
        if (elEssay.length !== 0) {
            for (i = 0; i < elEssay.length; i++) {
                var idEl = elEssay[i].getAttribute("id");
                var inidEl = idEl.replace("essay", "");
                var tempattombol = document.getElementById("tomboljawaban" + inidEl);
                var tombolsatu = document.createElement("button");
                tombolsatu.setAttribute("onclick", "alert('Siswa Mengetik Jawaban')");
                var tekstombolsatu = document.createTextNode("Ketik Jawaban No " + inidEl);
                tombolsatu.appendChild(tekstombolsatu);
                tempattombol.appendChild(tombolsatu);
                tempattombol.innerHTML += "<br/><sub>atau</sub></br/> "
                var tomboldua = document.createElement("button");
                tomboldua.setAttribute("onclick", "alert('Siswa Mengupload Jawaban')");
                var tekstomboldua = document.createTextNode("Upload Jawaban No " + inidEl);
                tomboldua.appendChild(tekstomboldua);
                tempattombol.appendChild(tomboldua);
                tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>"

            }
        }


    })
    // ;


}
const previewriwayat2 = (par) => {
    pranalamateri.style.display = "block";
    document.querySelector(".classReviewMateri").innerHTML = "";

    let tes = document.querySelector(".classReviewMateri");


    let datamateri = dataseluruhmateri;

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
    td.innerHTML = datamateri[par].idSekolah;

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Pembuat Materi";
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].pembuatpertama;

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Pengedit";
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].dibuatoleh;

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Kelas"
    var td = tr.insertCell(-1);
    td.innerHTML = datamateri[par].idtoken;
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
        keteranganakses = "Menerima Tagihan Tugas/Nilai dari Siswa";
    } else {
        keteranganakses = "Tidak Menerima Tagihan/Nilai (untuk latihan, rangkuman, dll)";
    }
    td.innerHTML = keteranganakses;
    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Tanggal Publikasi"
    var td = tr.insertCell(-1);
    td.innerHTML = tanggalfulllengkap(datamateri[par].idtgl)

    var tr = tabelidentitas.insertRow(-1);
    var td = tr.insertCell(-1);
    td.innerHTML = "Tanggal Selesai"
    var td = tr.insertCell(-1);
    td.innerHTML = tanggalfulllengkap(datamateri[par].idtglend);

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


        var elEssay = document.getElementsByClassName("soalessay")
        if (elEssay.length !== 0) {
            for (i = 0; i < elEssay.length; i++) {
                var idEl = elEssay[i].getAttribute("id");
                var inidEl = idEl.replace("essay", "");
                var tempattombol = document.getElementById("tomboljawaban" + inidEl);
                var tombolsatu = document.createElement("button");
                tombolsatu.setAttribute("onclick", "alert('Siswa Mengetik Jawaban')");
                var tekstombolsatu = document.createTextNode("Ketik Jawaban No " + inidEl);
                tombolsatu.appendChild(tekstombolsatu);
                tempattombol.appendChild(tombolsatu);
                tempattombol.innerHTML += "<br/><sub>atau</sub></br/> "
                var tomboldua = document.createElement("button");
                tomboldua.setAttribute("onclick", "alert('Siswa Mengupload Jawaban')");
                var tekstomboldua = document.createTextNode("Upload Jawaban No " + inidEl);
                tomboldua.appendChild(tekstomboldua);
                tempattombol.appendChild(tomboldua);
                tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>"

            }
        }


    })
    // ;


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
            var id = splitteks[0].replace(/\s+/g, ""); //4A

            var abjad = (id.length == 2) ? id.slice(1, 2) : id.slice(2, 3); //B
            var nosoal = id.match(/(\d+)/)[0];// id.slice(0, 1); //nosoal 4
            var innteks = "<input class='calc' type='radio' style='display:none' name='soal" + nosoal + "' id='" + id + "'/><label class='opsi' for='" + id + "'>" + abjad + "</label>"

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
            var tekstomboldua = document.createTextNode("Upload Jawaban No " + inidEl);
            tomboldua.appendChild(tekstomboldua);
            tempattombol.appendChild(tomboldua);
            tempattombol.innerHTML += "<br/><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>"

        }
    }

}

////////////// SOURCE = VIDEOLAMASO.JS

let localStream = "";// vidvid2.style.display = "none";
let spanstatus = document.querySelector("#spanstatusrekaman");
let spanstatus2 = document.querySelector("#spanstatusrekaman2");
let videostatus = document.querySelector("#statusrekaman");
let elvid1 = document.querySelector("#divvid1");
let elvid2 = document.querySelector("#divvid2");
let start = document.getElementById('btnStart');
let stopB = document.getElementById('btnStop');
let btnBack = document.getElementById('btnBack');
let vidSave = document.getElementById('vid2');
let vidlayar = document.getElementById('vid1');


const mulaivideo = () => {
    // let divV = document.getElementById('vid2');
    // divV.style.display = "none";
    // divP.style.display = "block";
    // let divP = document.getElementById('vid1');
    // let vidvid2 = document.getElementById('divvid2');

    //resultuploadvideomateri.innerHTML = "";
    let constraintObj = {
        audio: true,
        video: {
            facingMode: "environment"
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

            start.addEventListener('click', (ev) => {
                // divP.style.display = "block";
                // divV.style.display = "none";
                spanstatus.innerHTML = "Sedang merekam <i class='fa fa-spin fa-refresh'></i>";
                videostatus.removeAttribute("class");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
                videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-topmiddle w3-show");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
                elvid1.removeAttribute("class");
                elvid1.setAttribute("class", "containerbaru w3-center w3-show");
                elvid2.removeAttribute("class");
                elvid2.setAttribute("class", "containerbaru w3-center w3-hide");

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
                videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-topmiddle w3-show");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-show", "w3-blue w3-opacity w3-display-topmiddle w3-hide");
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
                let blob = new Blob(chunks, { 'type': 'video/mp4;' });
                let videoURL = window.URL.createObjectURL(blob);
                vidSave.src = videoURL;
                //console.log(formatBytes(blob.size, 2));
                spanstatus.innerHTML = "Ukuran Video " + formatBytes(blob.size, 2);
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
                    inputfilename.value = "Kelas_" + idJenjang + "_" + StringTanggal(new Date()) + "_id_" + new Date().getTime();;// + namebantukirim.value.toUpperCase().replace(/\s+/, "_");

                    var inputmimetype = document.createElement("input");
                    inputmimetype.setAttribute("name", "videomimeType")
                    inputmimetype.setAttribute("id", "videomimeType")
                    inputmimetype.setAttribute("style", "display:none")

                    inputmimetype.value = "video/mp4";//srcEncoded.match(/^.*(?=;)/)[0];;//"data:image/jpeg";;// 


                    resultuploadvideomateri.innerHTML = "";
                    resultuploadvideomateri.appendChild(inputbase64);
                    resultuploadvideomateri.appendChild(inputfilename);
                    resultuploadvideomateri.appendChild(inputmimetype);
                }
                //---------------------------------------------------
                chunks = [];

            }
            btnBack.addEventListener('click', (ev) => {
                if (mediaRecorder.state == "recording") {
                    alert("Anda sedang merekam. Silakan berhenti dulu dari perekaman");
                    return
                }
                video.play();
                vidSave.src = "";
                videostatus.removeAttribute("class");
                videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-topmiddle w3-hide");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-show", "w3-blue w3-opacity w3-display-topmiddle w3-hide");
                elvid1.removeAttribute("class");
                elvid1.setAttribute("class", "containerbaru w3-center w3-show");
                elvid2.removeAttribute("class");
                elvid2.setAttribute("class", "containerbaru w3-center w3-hide");
                spanstatus.innerHTML = "Kamera sudah siap, silakan rekam.";
                resultuploadvideomateri.innerHTML = "";



            })


        })
        .catch(function (err) {
            //console.log(err.name, err.message);
            alert(err.name + "\n" + err.message);
        });

    /*********************************
    getUserMedia returns a Promise
    resolve - returns a MediaStream Object
    reject returns one of the following errors
    AbortError - generic unknown cause
    NotAllowedError (SecurityError) - user rejected permissions
    NotFoundError - missing media track
    NotReadableError - user permissions given but hardware/OS error
    OverconstrainedError - constraint video settings preventing
    TypeError - audio: false, video: false
    *********************************/
    // let tmbldiv = document.getElementById("elemenvideogaleri");
    // tmbldiv.removeAttribute("style");
    // tmbldiv.setAttribute("style", "display:none");

    // elemenwebcam.setAttribute("style", "display:block");
    // kontrolgaleri.style.display = "inline-block";
    // resultuploadvideomateri.innerHTML = "";
    showtomboltombolwebcam();
}

const tutupkamera = () => {
    // vid.pause();
    // vidlayar.removeAttribute("src");
    //vidlayar.src=""
    // vidSave.removeAttribute("src");
    //vid.src = "";
    if (localStream == "") {
        alert("Mohon tunggu, proses loading sedang berlangsung....");
        return
    }
    localStream.getTracks().forEach(k => k.stop());

    resultuploadvideomateri.innerHTML = "";
    tempattextarea.innerHTML = "";
}
function formatBytes(a, b = 2) {
    if (0 === a)
        return "0 Bytes";
    const c = 0 > b ? 0 : b,
        d = Math.floor(Math.log(a) / Math.log(1024));
    return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
}

const uploadvideomateri = () => {
    resultuploadvideomateri.innerHTML = "";


    //get the image selected
    var item = document.querySelector('#tmbluploadvideomateri').files[0];


    //create a FileReader
    var reader = new FileReader();

    //image turned to base64-encoded Data URI.
    reader.readAsDataURL(item);
    reader.name = item.name;//get the image's name
    reader.size = item.size; //get the image's size
    reader.onload = function (event) {
        let mmtpe = event.target.result.match(/^.*(?=;)/)[0];


        var srcEncoded = event.target.result;


        resultuploadvideomateri.innerHTML = "";
        let di = document.createElement("div");
        di.setAttribute("class", "containerbaru w3-center")
        if (mmtpe.indexOf("application/vnd") > -1) {

            ifr = document.createElement("div");
            ifr.setAttribute("class", "responsive-iframebaru w3-xxxlarge w3-center");

            ifr.innerHTML = "PRATINJAU TIDAK TERSEDIA <br/> <br/> File Tidak Dikenal <br/> Jika tetap mengunggahnya, maka akan menjadi link download.";
            di.appendChild(ifr);
            resultuploadvideomateri.appendChild(di);
        } else {
            let ifr = document.createElement("iframe");
            ifr.setAttribute("class", "responsive-iframebaru")
            ifr.setAttribute("src", srcEncoded);
            di.appendChild(ifr);
            resultuploadvideomateri.appendChild(di)

        }
        resultuploadvideomateri.innerHTML += "<hr/>";

        var inputbase64 = document.createElement("input");
        inputbase64.setAttribute("name", "videodata");
        inputbase64.setAttribute("id", "videodata");
        inputbase64.value = srcEncoded.replace(/^.*,/, '');
        inputbase64.setAttribute("style", "display:none");

        var inputfilename = document.createElement("input");
        inputfilename.setAttribute("name", "videofilename");
        inputfilename.setAttribute("id", "videofilename");
        inputfilename.setAttribute("style", "display:none");
        inputfilename.value = "Kelas_" + idJenjang + "_" + StringTanggal(new Date()) + "_id_" + new Date().getTime();;// + namebantukirim.value.toUpperCase().replace(/\s+/, "_");

        var inputmimetype = document.createElement("input");
        inputmimetype.setAttribute("name", "videomimeType")
        inputmimetype.setAttribute("id", "videomimeType")
        inputmimetype.setAttribute("style", "display:none")

        inputmimetype.value = srcEncoded.match(/^.*(?=;)/)[0];;//"data:image/jpeg"; 


        resultuploadvideomateri.appendChild(inputbase64);
        resultuploadvideomateri.appendChild(inputfilename);
        resultuploadvideomateri.appendChild(inputmimetype);
        let teks1 = document.createTextNode("Data siap upload. Klik tombol ini ")
        resultuploadvideomateri.appendChild(teks1);
        let tmbl = document.createElement("button",);
        tmbl.setAttribute("class", "w3-black w3-button w3-hover-blue  w3-tiny w3-round-xxlarge");
        tmbl.setAttribute("onclick", "uplvideomateri2()");
        tmbl.innerHTML = "Upload ke Server"

        resultuploadvideomateri.append(tmbl);
        tmbl = document.createElement("button",);
        tmbl.setAttribute("class", "w3-red w3-button w3-hover-blue  w3-tiny w3-round-xxlarge");
        tmbl.setAttribute("onclick", "uplvideomateriyt()");
        tmbl.innerHTML = "Upload ke Youtube"

        resultuploadvideomateri.append(tmbl)

    }
    //daftarvideo();
    //tutupkamera();
}

function bukaelemengaleri() {
    let tmbldiv = document.getElementById("elemenvideogaleri");
    tmbldiv.removeAttribute("style");
    tmbldiv.setAttribute("style", "display:inline-block");
    tutupkamera();
    elemenwebcam.setAttribute("style", "display:none");
    // kontrolgaleri.style.display = "none";
    resultuploadvideomateri.innerHTML = "";
}
function bukaelemenwebcam() {
    let tmbldiv = document.getElementById("elemenvideogaleri");
    tmbldiv.removeAttribute("style");
    tmbldiv.setAttribute("style", "display:none");
    mulaivideo();
    elemenwebcam.setAttribute("style", "display:block");
    // kontrolgaleri.style.display = "inline-block";
    resultuploadvideomateri.innerHTML = "";
    showtomboltombolwebcam();

}
function bukascreenrecorder() {
    showtomboltombolscreenrecorder();
    let tmbldiv = document.getElementById("elemenvideogaleri");
    tmbldiv.removeAttribute("style");
    tmbldiv.setAttribute("style", "display:none");
    tutupkamera();
    elemenwebcam.setAttribute("style", "display:block");
    // kontrolgaleri.style.display = "inline-block";
    resultuploadvideomateri.innerHTML = "";


}


function showtomboltombolwebcam() {
    let el = document.getElementById("tomboltombolwebcam");
    let el2 = document.getElementById("tomboltombolscreenrecorder");
    el.style.display = "block";
    el2.style.display = "none";
    // vidlayar.setAttribute("poster", "/img/192.png");
    // vidlayar.play();
    // vidSave.stop();
    elvid1.removeAttribute("class");
    elvid1.setAttribute("class", "containerbaru w3-center w3-show");
    elvid2.removeAttribute("class");
    elvid2.setAttribute("class", "containerbaru w3-center w3-hide");
    spanstatus.innerHTML = "Kamera siap untuk merekam.";// <i class='fa fa-spin fa-refresh'></i>";
    videostatus.removeAttribute("class");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
    videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-topmiddle w3-hide");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");

}
function showtomboltombolscreenrecorder() {
    let el = document.getElementById("tomboltombolwebcam");
    let el2 = document.getElementById("tomboltombolscreenrecorder");
    el.style.display = "none";
    el2.style.display = "block";

    elvid1.removeAttribute("class");
    elvid1.setAttribute("class", "containerbaru w3-center w3-show");
    elvid2.removeAttribute("class");
    elvid2.setAttribute("class", "containerbaru w3-center w3-hide");
    spanstatus2.innerHTML = "Silakan pilih layar (Screen) untuk direkam.";// <i class='fa fa-spin fa-refresh'></i>";
    videostatus.removeAttribute("class");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
    videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-topmiddle w3-hide")
}
const daftarvideo = async () => {
    //alert ("bakal dibuat modal");
    //koleksigambar.style.display = 'block';
    koleksivideo.style.display = 'block';
    tempattextarea.innerHTML = "";
    // document.getElementById("tabelkoleksigambarmateri").innerHTML ="";
    document.getElementById("tabelkoleksivideomateri").innerHTML = "<i class='fa fa-spin fa-refresh w3-xxxlarge'></i>";
    await fetch(linkmateri + "&action=koleksivideo")
        .then(m => m.json())
        .then(j => {
            // console.log(j)
            // console.log(j.records)
            // let datasheet = j.records;
            let tabelmateri = document.createElement("table");
            tabelmateri.setAttribute("class", "versi-table w3-card-4 w3-center");
            tabelmateri.setAttribute("id", "tabeltabelkoleksiuploadvideo");
            let row = tabelmateri.insertRow(0);
            let cell = row.insertCell(-1);
            cell.innerHTML = "No";
            cell = row.insertCell(-1);
            cell.setAttribute("style", "width:50%");
            cell.innerHTML = "Preview";
            cell = row.insertCell(-1);
            cell.innerHTML = "Tombol Copy";

            cell = row.insertCell(-1);
            cell.innerHTML = "Keterangan";



            for (let i = 0; i < j.records.length; i++) {
                row = tabelmateri.insertRow(-1);
                cell = row.insertCell(-1);
                cell.innerHTML = i + 1;
                cell = row.insertCell(-1);
                cell.innerHTML = j.records[i].htmlgambar;
                console.log(j.records[i].htmlgambar);
                cell = row.insertCell(-1);


                let txtarea = document.createElement("textarea");
                txtarea.setAttribute("id", "kodevideo" + i)
                txtarea.value = j.records[i].htmlgambar;
                txtarea.setAttribute("style", "width:30%");
                // cell.appendChild(txtarea);
                cell.innerHTML = `<button class="w3-button w3-tiny w3-round-xlarge w3-green" onclick="kopipaste('kodevideo${i}')">Copy Kode</button>`;

                tempattextarea.appendChild(txtarea)
                cell = row.insertCell(-1);
                cell.innerHTML = j.records[i].keterangan;
            }
            document.getElementById("tabelkoleksivideomateri").innerHTML = "";
            document.getElementById("tabelkoleksivideomateri").appendChild(tabelmateri);

        })
    //console.log(linkmateri)
    mulaivideo()
}

let bukalayar = document.getElementById('bukalayar');
let mulairekamlayar = document.getElementById('start');
let stoprekamlayar = document.getElementById('stop');
let statusspan = document.getElementById('spanstatusrekaman2');
var displayMediaOptions = {
    audio: true,
    video: {
        mediaSource: "screen"
    }
}
let audioTrack, videoTrack, stream, mediaRecorderr, recordedChunks = [];
let tanda = 0;
bukalayar.addEventListener('click', (ev) => {


    layar = navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
    layar.then(m => {
        [videoTrack] = m.getVideoTracks();
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((audiostream) => {
                [audioTrack] = audiostream.getAudioTracks();
                stream = new MediaStream([videoTrack, audioTrack]);
                // let video = document.querySelector('video');
                // if ("srcObject" in video) {
                //     video.srcObject = stream;
                // } else {
                //     //old version
                //     video.src = window.URL.createObjectURL(stream);
                // }
                //--------------------------------------------

                //--------------------------------------------
                vidlayar.srcObject = stream;
                localStream = stream;
                //vidSave.srcObject = stream;
                vidlayar.play();
                videoTrack.volume = 0;
                statusspan.innerHTML = "Anda siap merekam aktivitas layar. Klik tombol MULAI REKAM untuk merekam."
                mediaRecorderr = new MediaRecorder(stream);
                mediaRecorderr.ondataavailable = handleDataAvailable;
                mediaRecorderr.onstop = handleStop;
                tanda = 1;
            })



    })
    resultuploadvideomateri.innerHTML = "";
    tutupkamera();
    elvid1.removeAttribute("class");
    elvid1.setAttribute("class", "containerbaru w3-center w3-show");
    elvid2.removeAttribute("class");
    elvid2.setAttribute("class", "containerbaru w3-center w3-hide");
})
mulairekamlayar.addEventListener('click', (ev) => {
    // console.log(recordedChunks.length)
    //console.log(tanda)
    if (tanda == 0) {
        alert("Anda belum memilih layar untuk direkam. Silakan klik PILIH LAYAR dan arahkan pada layar yang ingin Anda rekam aktivitasnya.");
        return
    };
    spanstatus2.innerHTML = "Sedang merekam <i class='fa fa-spin fa-refresh'></i>";
    videostatus.removeAttribute("class");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
    videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-topmiddle w3-show");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-hide", "w3-blue w3-opacity w3-display-topmiddle w3-show");
    elvid1.removeAttribute("class");
    elvid1.setAttribute("class", "containerbaru w3-center w3-show");
    elvid2.removeAttribute("class");
    elvid2.setAttribute("class", "containerbaru w3-center w3-hide");
    //console.log(mediaRecorderr);
    vidlayar.play();

    mediaRecorderr.start();


    resultuploadvideomateri.innerHTML = "";
    // Register Event Handlers

});


stoprekamlayar.addEventListener('click', (ev) => {
    if (tanda == 0 || mediaRecorderr.state == "inactive") {
        alert("Anda belum melakukan aktivitas rekam layar.")
        return
    }
    mediaRecorderr.stop();
    spanstatus2.innerHTML = "Rekaman Layar selesai dengan ";
    videostatus.removeAttribute("class");
    videostatus.setAttribute("class", "w3-blue w3-opacity w3-display-topmiddle w3-hide");//.replace("w3-blue w3-opacity w3-display-topmiddle w3-show", "w3-blue w3-opacity w3-display-topmiddle w3-hide");
    elvid1.removeAttribute("class");
    elvid1.setAttribute("class", "containerbaru w3-center w3-hide");
    elvid2.removeAttribute("class");
    elvid2.setAttribute("class", "containerbaru w3-center w3-show");

});

function handleDataAvailable(e) {

    recordedChunks.push(e.data);
}

// Saves the video file on stop
async function handleStop(e) {
    resultuploadvideomateri.innerHTML = "";
    let blob = new Blob(recordedChunks, { 'type': 'video/mp4;' });
    recordedChunks = [];
    let videoURL = window.URL.createObjectURL(blob);
    vidSave.src = videoURL;

    spanstatus.innerHTML = "Ukuran Video " + formatBytes(blob.size, 2);
    spanstatus2.innerHTML += "Ukuran Video " + formatBytes(blob.size, 2);
    //---------------------------------------------------
    var reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onload = function (e) {
        let urlbs64 = e.target.result;
        // console.log(urlbs64);
        var inputbase64 = document.createElement("input");
        inputbase64.setAttribute("name", "videodata");
        inputbase64.setAttribute("id", "videodata");
        inputbase64.value = urlbs64.replace(/^.*,/, '');

        inputbase64.setAttribute("style", "display:none");

        var inputfilename = document.createElement("input");
        inputfilename.setAttribute("name", "videofilename");
        inputfilename.setAttribute("id", "videofilename");
        inputfilename.setAttribute("style", "display:none");
        inputfilename.value = "Kelas_" + idJenjang + "_" + StringTanggal(new Date()) + "_id_" + new Date().getTime();;// + namebantukirim.value.toUpperCase().replace(/\s+/, "_");

        var inputmimetype = document.createElement("input");
        inputmimetype.setAttribute("name", "videomimeType")
        inputmimetype.setAttribute("id", "videomimeType")
        inputmimetype.setAttribute("style", "display:none")

        inputmimetype.value = "video/mp4";//srcEncoded.match(/^.*(?=;)/)[0];;//"data:image/jpeg";;// 

        resultuploadvideomateri.innerHTML = ""
        resultuploadvideomateri.appendChild(inputbase64);
        resultuploadvideomateri.appendChild(inputfilename);
        resultuploadvideomateri.appendChild(inputmimetype);
    }
    //---------------------------------------------------
    recordedChunks = [];
    //vidlayar.src = "";
    tanda = 0;
    tutupkamera();


}


//

const uplvideomateri = async () => {
    let ketval = document.formuploadmateri.idmapel.value
    let val = (ketval == "") ? "e-lamaso" : ketval;
    let gmbrdata, gmbrfilename, gmbrmimeType;
    gmbrdata = document.getElementById("videodata");
    gmbrfilename = document.getElementById("videofilename");
    gmbrmimeType = document.getElementById("videomimeType");
    if (gmbrdata == null && gmbrfilename == null && gmbrmimeType == null) {
        alert("Anda belum siap mengupload video/file lainnya ke server");
        return
    }
    let frmdata = new FormData();
    frmdata.append("gmbrdata", gmbrdata.value);
    frmdata.append("gmbrfilename", gmbrfilename.value);
    frmdata.append("gmbrmimeType", gmbrmimeType.value);
    frmdata.append("keterangan", val);

    resultuploadvideomateri.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`

    await fetch(linkmateri + "&action=uploadvideomateri", {
        method: 'post',
        body: frmdata
    })
        .then(m => m.json())
        .then(k => {
            //console.log(k);

            //resultuploadvideomateri.innerHTML = k.result;
            let txtarea = document.createElement("textarea");
            txtarea.setAttribute("id", "kodegambarjson")
            txtarea.textContent = k.result

            resultuploadvideomateri.innerHTML = `<br><button class="w3-button w3-tiny w3-block w3-round-xlarge w3-dark-grey" onclick="kopipaste('kodegambarjson')">Copy Kode</button>`;
            //tempattextarea.innerHTML = "";
            tempattextarea.appendChild(txtarea)
            //cell = row.insertCell(-1);
            //cell.innerHTML = j.records[i].keterangan;


            // document.getElementById("tabelkoleksigambarmateri").appendChild(tabelmateri)
            //document.getElementById("tabelkoleksigambarmateri").appendChild()
            //daftarGambar()
            let tb = document.getElementById("tabeltabelkoleksiuploadvideo");//.appendChild(txtarea)
            let tr = tb.insertRow(-1);
            let sel = tr.insertCell(-1);
            sel.innerHTML = "NEW";
            sel = tr.insertCell(-1);
            sel.innerHTML = k.result;
            sel = tr.insertCell(-1);
            sel.innerHTML = `<button class="w3-button w3-tiny w3-round-xlarge w3-green" onclick="kopipaste('kodegambarjson')">Copy Kode</button>`;
            sel = tr.insertCell(-1);
            sel.innerHTML = `Terbaru`;





            // resultuploadvideomateri.innerHTML = "";

            ///--------------------------------------------          
        })
        .catch(er => alert(er))


}
const uplvideomateri2 = async () => {
    let ketval = "item akreditasi";//document.formuploadmateri.idmapel.value
    let val = (ketval == "") ? "e-lamaso" : ketval;
    let gmbrdata, gmbrfilename, gmbrmimeType;
    gmbrdata = document.getElementById("videodata");
    gmbrfilename = document.getElementById("videofilename");
    gmbrmimeType = document.getElementById("videomimeType");
    if (gmbrdata == null && gmbrfilename == null && gmbrmimeType == null) {
        alert("Anda belum siap mengupload video/file lainnya ke server");
        return
    }
    let frmdata = new FormData();
    frmdata.append("gmbrdata", gmbrdata.value);
    frmdata.append("gmbrfilename", gmbrfilename.value);
    frmdata.append("gmbrmimeType", gmbrmimeType.value);
    frmdata.append("keterangan", val);

    resultuploadvideomateri.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`

    await fetch(linkmateri + "&action=uploadvideomateri", {
        method: 'post',
        body: frmdata
    })
        .then(m => m.json())
        .then(k => {
            //console.log(k);

            resultuploadvideomateri.innerHTML = k.result;
            let txtarea = document.createElement("textarea");
            txtarea.setAttribute("id", "kodegambarjson")
            txtarea.textContent = k.result

            resultuploadvideomateri.innerHTML += `<hr><button class="w3-button w3-tiny w3-block w3-round-xlarge w3-dark-grey" onclick="kopipaste('kodegambarjson')">Copy Kode</button>`;
            //tempattextarea.innerHTML = "";
            tempattextarea.appendChild(txtarea)
            //cell = row.insertCell(-1);
            //cell.innerHTML = j.records[i].keterangan;


            // document.getElementById("tabelkoleksigambarmateri").appendChild(tabelmateri)
            //document.getElementById("tabelkoleksigambarmateri").appendChild()
            //daftarGambar()
            let tb = document.getElementById("tabeltabelkoleksiuploadvideo");//.appendChild(txtarea)
            let tr = tb.insertRow(-1);
            let sel = tr.insertCell(-1);
            sel.innerHTML = "NEW";
            sel = tr.insertCell(-1);
            sel.innerHTML = k.result;
            sel = tr.insertCell(-1);
            sel.innerHTML = `<button class="w3-button w3-tiny w3-round-xlarge w3-green" onclick="kopipaste('kodegambarjson')">Copy Kode</button>`;
            sel = tr.insertCell(-1);
            sel.innerHTML = `Terbaru`;





            // resultuploadvideomateri.innerHTML = "";

            ///--------------------------------------------          
        })
        .catch(er => alert(er))


}

const uplvideomateriyt = () => {
    let ketval = document.formuploadmateri.idmapel.value
    let val = (ketval == "") ? "e-lamaso" : ketval;
    let gmbrdata, gmbrfilename, gmbrmimeType;
    gmbrdata = document.getElementById("videodata");
    gmbrfilename = document.getElementById("videofilename");
    gmbrmimeType = document.getElementById("videomimeType");
    if (gmbrdata == null && gmbrfilename == null && gmbrmimeType == null) {
        alert("Anda belum siap mengupload video/file lainnya ke server");
        return
    }
    alert("Mengunggah video ke Youtube akan dipublikasikan di Chanel elamaso. Video Anda akan menjadi milik kami.")
    setTimeout(function () {
        alert("Maaf, fitur dalam tahap pengembangan.... :(")
    }, 1000);
    //resultuploadvideomateri.innerHTML = "";
}


const kopipaste = (id) => {
    var copyText = document.getElementById(id);
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    // alert("Copied the text: " + copyText.value);
    // alert("Berhasil Ngopi ... ^_^");
    //resultuploadpotomateri.innerHTML = "";
}



const berandaguru = () => {
    tampilinsublamangurukelas("beranda")
};


const tabel_profilsekolah = () =>{
    let el = document.querySelectorAll(".ps_kirim");
    let table = [];
    let key, val;
    let arr = [];//head
    let br = []
    for (i = 0; i < el.length; i++) {
        key = [el[i].getAttribute("data-setkey")];
        val = [el[i].innerHTML];

        arr.push(key)
        br.push(val)
    }

    table.push(arr);
    table.push(br);
    return table

}

const profilsekolah = async () => {
    let divlod = document.querySelector(".loadingtopbar");
    clearInterval(stoploadingtopbar);

    loadingtopbarin("loadingtopbar");

        tampilinsublamangurukelas("profilesekolah");
        let dataguru;
        if(arraydatatendik.length == 0){
            await fetch(linktendik + "?action=tabeltendik")
            .then(m => m.json()).then(k => {
                
                arraydatatendik = k;
            }).catch(er=> console.log(er));
        };

        let tabel_identitas = document.querySelector(".tabel_identitassekolah");
        tabel_identitas.rows[0].cells[2].innerHTML = idNamaSekolah.toUpperCase();
        let tabel_jeniskelamintendik = document.querySelector(".tabel_jeniskelamintendik");
        let tabel_statuskepegawaian = document.querySelector(".tabel_statuskepegawaian");
        let tabel_kualifikasipendidikan = document.querySelector(".tabel_kualifikasipendidikan");
        
        let tabel_siswaumur = document.querySelector(".tabel_siswaumur");
        let ket_tabel_siswaumur = document.querySelector(".ket_tabel_siswaumur");
        let tabel_siswaagama = document.querySelector(".tabel_siswaagama")
        let ket_tabel_siswaagama = document.querySelector(".ket_tabel_siswaagama")
        let tabel_siswapip = document.querySelector(".tabel_siswapip");
        
        let tabel_ortu_pendidikan = document.querySelector(".tabel_ortu_pendidikan");
        let ket_tabel_ortu_pendidikan = document.querySelector(".ket_tabel_ortu_pendidikan");
        
    let tdumur = tabel_siswaumur.getElementsByTagName("tbody")[0]
    let tfumur = tabel_siswaumur.getElementsByTagName("tfoot")[0];
    let lr, umursiswa, tingkatumur, u6, u7, u13;
    let td_pip = tabel_siswapip.getElementsByTagName("tbody")[0];
    let tf_pip = tabel_siswapip.getElementsByTagName("tfoot")[0];
    let pipL, pipP, pipJ;
    let td_agama = tabel_siswaagama.getElementsByTagName("tbody")[0];
    let tf_agama = tabel_siswaagama.getElementsByTagName("tfoot")[0];
    let td_ortu_pendidikan = tabel_ortu_pendidikan.getElementsByTagName("tbody")[0];
    let tf_ortu_pendidikan = tabel_ortu_pendidikan.getElementsByTagName("tfoot")[0];
    

        let tab = "profilsekolah"
        let tabel = tabel_profilsekolah();
        
        let head = tabel[0];
        let key = JSON.stringify(head);
        let datakirim = new FormData();
    
        datakirim.append("tab",tab)
        datakirim.append("key",key)
        await fetch(linktendik+"?action=getpostdatafromtab",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
           
           let dataa = r.data[0];
           let data = Object.keys(dataa)
           
            jsonprofilsekolah = r.data;
            
            for(let i = 0 ; i < data.length; i++){
                
                document.querySelector(`[data-setkey=${data[i]}]`).innerHTML = dataa[data[i]];

            }
        }).catch(er => console.log(er))
        
        // jk tendik
        let tdtendik = tabel_jeniskelamintendik.getElementsByTagName("tbody")[0];
        let tftendik = tabel_jeniskelamintendik.getElementsByTagName("tfoot")[0];
        let tdpeg = tabel_statuskepegawaian.getElementsByTagName("tbody")[0];
        let tfpeg = tabel_statuskepegawaian.getElementsByTagName("tfoot")[0];

        let headD = arraydatatendik[0]
        let val = arraydatatendik.filter(s=> s[0] !== "idabsen");
        let tptk = arrObjek(headD,val);
       
        tdtendik.rows[0].cells[1].innerHTML = tptk.filter(s => s.jk == "L" && s.pnsnonpns == "PNS").length;
        tdtendik.rows[0].cells[2].innerHTML = tptk.filter(s => s.jk == "L" && s.pnsnonpns == "PPPK").length;
        tdtendik.rows[0].cells[3].innerHTML = tptk.filter(s => s.jk == "L" && s.pnsnonpns !== "PNS" && s.pnsnonpns !== "PPPK").length;
        tdtendik.rows[0].cells[4].innerHTML = tptk.filter(s => s.jk == "L").length;
        
        tdtendik.rows[1].cells[1].innerHTML = tptk.filter(s => s.jk == "P" && s.pnsnonpns == "PNS").length;
        tdtendik.rows[1].cells[2].innerHTML = tptk.filter(s => s.jk == "P" && s.pnsnonpns == "PPPK").length;
        tdtendik.rows[1].cells[3].innerHTML = tptk.filter(s => s.jk == "P" && s.pnsnonpns !== "PNS" && s.pnsnonpns !== "PPPK").length;
        tdtendik.rows[1].cells[4].innerHTML = tptk.filter(s => s.jk == "P").length;
        
        tftendik.rows[0].cells[1].innerHTML = tptk.filter(s =>  s.pnsnonpns == "PNS").length;
        tftendik.rows[0].cells[2].innerHTML = tptk.filter(s =>  s.pnsnonpns == "PPPK").length;
        tftendik.rows[0].cells[3].innerHTML = tptk.filter(s =>  s.pnsnonpns !== "PNS" && s.pnsnonpns !== "PPPK").length;
        tftendik.rows[0].cells[4].innerHTML = tptk.length;
        
        //status kepegawaian

        tdpeg.rows[0].cells[1].innerHTML =tptk.filter(s => s.jabatan == "Guru Kelas" && s.pnsnonpns == "PNS").length;
        tdpeg.rows[0].cells[2].innerHTML =tptk.filter(s => (s.jabatan == "Guru PAI" || s.jabatan == "Guru PKRIS" || s.jabatan == "Guru PKATO" || s.jabatan == "Guru PHIND" || s.jabatan == "Guru PBUDH" ||  s.jabatan == "Guru PKONG" )&& s.pnsnonpns == "PNS").length;
        tdpeg.rows[0].cells[3].innerHTML =tptk.filter(s => s.jabatan == "Guru PJOK" && s.pnsnonpns == "PNS").length;;
        tdpeg.rows[0].cells[4].innerHTML =tptk.filter(s =>  s.jabatan == "Guru BSUND" && s.pnsnonpns == "PNS").length;;
        tdpeg.rows[0].cells[5].innerHTML =tptk.filter(s => (s.jabatan == "Kepala Sekolah" || s.jabatan == "Guru BING"|| s.jabatan == "Guru TIK")&& s.pnsnonpns == "PNS").length;
        tdpeg.rows[0].cells[6].innerHTML =tptk.filter(s => (s.tugasjabatan == "Tata Usaha"|| s.tugasjabatan == "TU"|| s.tugasjabatan == "Penjaga"|| s.tugasjabatan == "OB"|| s.tugasjabatan == "Office Boy"|| s.tugasjabatan == "Satpam")&& s.pnsnonpns == "PNS").length;
        tdpeg.rows[0].cells[7].innerHTML =tptk.filter(s => (s.tugasjabatan == "Operator Sekolah" || s.tugasjabatan == "OPS")&& s.pnsnonpns == "PNS").length;
        tdpeg.rows[0].cells[8].innerHTML =tptk.filter(s => s.pnsnonpns == "PNS").length;;
        
        tdpeg.rows[1].cells[1].innerHTML =tptk.filter(s => s.jabatan == "Guru Kelas" && s.pnsnonpns == "PPPK").length;
        tdpeg.rows[1].cells[2].innerHTML =tptk.filter(s => (s.jabatan == "Guru PAI" || s.jabatan == "Guru PKRIS" || s.jabatan == "Guru PKATO" || s.jabatan == "Guru PHIND" || s.jabatan == "Guru PBUDH" ||  s.jabatan == "Guru PKONG" )&& s.pnsnonpns == "PPPK").length;
        tdpeg.rows[1].cells[3].innerHTML =tptk.filter(s => s.jabatan == "Guru PJOK" && s.pnsnonpns == "PPPK").length;;
        tdpeg.rows[1].cells[4].innerHTML =tptk.filter(s =>  s.jabatan == "Guru BSUND" && s.pnsnonpns == "PPPK").length;;
        tdpeg.rows[1].cells[5].innerHTML =tptk.filter(s => (s.jabatan == "Kepala Sekolah" || s.jabatan == "Guru BING"|| s.jabatan == "Guru TIK")&& s.pnsnonpns == "PPPK").length;
        tdpeg.rows[1].cells[6].innerHTML =tptk.filter(s => (s.tugasjabatan == "Tata Usaha"|| s.tugasjabatan == "TU"|| s.tugasjabatan == "Penjaga"|| s.tugasjabatan == "OB"|| s.tugasjabatan == "Office Boy"|| s.tugasjabatan == "Satpam")&& s.pnsnonpns == "PPPK").length;
        tdpeg.rows[1].cells[7].innerHTML =tptk.filter(s => (s.tugasjabatan == "Operator Sekolah" || s.tugasjabatan == "OPS")&& s.pnsnonpns == "PPPK").length;
        tdpeg.rows[1].cells[8].innerHTML =tptk.filter(s => s.pnsnonpns == "PPPK").length;;

    
        tdpeg.rows[2].cells[1].innerHTML =tptk.filter(s => s.jabatan == "Guru Kelas" && (s.pnsnonpns == "HONOR" || s.pnsnonpns =="HONORER" || s.pnsnonpns =="HNR"|| s.pnsnonpns == "Honor" || s.pnsnonpns == "Honorer")).length;
        tdpeg.rows[2].cells[2].innerHTML =tptk.filter(s => (s.jabatan == "Guru PAI" || s.jabatan == "Guru PKRIS" || s.jabatan == "Guru PKATO" || s.jabatan == "Guru PHIND" || s.jabatan == "Guru PBUDH" ||  s.jabatan == "Guru PKONG" )&& (s.pnsnonpns == "HONOR" || s.pnsnonpns =="HONORER" || s.pnsnonpns =="HNR"|| s.pnsnonpns == "Honor" || s.pnsnonpns == "Honorer")).length;
        tdpeg.rows[2].cells[3].innerHTML =tptk.filter(s => s.jabatan == "Guru PJOK"&& (s.pnsnonpns !== "PNS" || s.pnsnonpns !== "PPPK")).length;
        tdpeg.rows[2].cells[4].innerHTML =tptk.filter(s =>  s.jabatan == "Guru BSUND"&& (s.pnsnonpns !== "PNS" || s.pnsnonpns !== "PPPK")).length;
        tdpeg.rows[2].cells[5].innerHTML =tptk.filter(s => (s.jabatan == "Kepala Sekolah" || s.jabatan == "Guru BING"|| s.jabatan == "Guru TIK")&& (s.pnsnonpns !== "PNS" || s.pnsnonpns !== "PPPK")).length;
        tdpeg.rows[2].cells[6].innerHTML =tptk.filter(s => (s.tugasjabatan == "Tata Usaha"|| s.tugasjabatan == "TU"|| s.tugasjabatan == "Penjaga"|| s.tugasjabatan == "OB"|| s.tugasjabatan == "Office Boy"|| s.tugasjabatan == "Satpam")&& (s.pnsnonpns == "HONOR" || s.pnsnonpns =="HONORER" || s.pnsnonpns =="HNR"|| s.pnsnonpns == "Honor" || s.pnsnonpns == "Honorer")).length;
        tdpeg.rows[2].cells[7].innerHTML =tptk.filter(s => (s.tugasjabatan == "Operator Sekolah" || s.tugasjabatan == "OPS")&& (s.pnsnonpns == "HONOR" || s.pnsnonpns =="HONORER" || s.pnsnonpns =="HNR"|| s.pnsnonpns == "Honor" || s.pnsnonpns == "Honorer")).length;
        tdpeg.rows[2].cells[8].innerHTML =tptk.filter(s => s.pnsnonpns == "HONOR" || s.pnsnonpns =="HONORER" || s.pnsnonpns =="HNR"|| s.pnsnonpns == "Honor" || s.pnsnonpns == "Honorer").length;
        
        tfpeg.rows[0].cells[1].innerHTML =tptk.filter(s => s.jabatan == "Guru Kelas").length;
        tfpeg.rows[0].cells[2].innerHTML =tptk.filter(s => (s.jabatan == "Guru PAI" || s.jabatan == "Guru PKRIS" || s.jabatan == "Guru PKATO" || s.jabatan == "Guru PHIND" || s.jabatan == "Guru PBUDH" ||  s.jabatan == "Guru PKONG" )).length;
        tfpeg.rows[0].cells[3].innerHTML =tptk.filter(s => s.jabatan == "Guru PJOK" ).length;;
        tfpeg.rows[0].cells[4].innerHTML =tptk.filter(s =>  s.jabatan == "Guru BSUND").length;;
        tfpeg.rows[0].cells[5].innerHTML =tptk.filter(s => (s.jabatan == "Kepala Sekolah" || s.jabatan == "Guru BING"|| s.jabatan == "Guru TIK")).length;
        tfpeg.rows[0].cells[6].innerHTML =tptk.filter(s => s.tugasjabatan == "Tata Usaha"|| s.tugasjabatan == "TU"|| s.tugasjabatan == "Penjaga"|| s.tugasjabatan == "OB"|| s.tugasjabatan == "Office Boy"|| s.tugasjabatan == "Satpam").length;
        tfpeg.rows[0].cells[7].innerHTML =tptk.filter(s => s.tugasjabatan == "Operator Sekolah" || s.tugasjabatan == "OPS").length;
        tfpeg.rows[0].cells[8].innerHTML =tptk.length;;

        tfpeg.rows[1].cells[1].innerHTML = tptk.filter(s=>!(s.tugasjabatan == "Tata Usaha"|| s.tugasjabatan == "TU"|| s.tugasjabatan == "Penjaga"|| s.tugasjabatan == "OB"|| s.tugasjabatan == "Office Boy"|| s.tugasjabatan == "Satpam"||s.tugasjabatan == "Operator Sekolah" || s.tugasjabatan == "OPS")).length;
        tfpeg.rows[1].cells[2].innerHTML = tptk.filter(s=>s.tugasjabatan == "Tata Usaha"|| s.tugasjabatan == "TU"|| s.tugasjabatan == "Penjaga"|| s.tugasjabatan == "OB"|| s.tugasjabatan == "Office Boy"|| s.tugasjabatan == "Satpam"||s.tugasjabatan == "Operator Sekolah" || s.tugasjabatan == "OPS").length
        tfpeg.rows[1].cells[3].innerHTML = tptk.length;
        let ptkijazah =["S2","S1","D3", "D2", "D1", "SPG","SMA","SMP","SD"];
        let tdklf = tabel_kualifikasipendidikan.getElementsByTagName("tbody")[0];
        let tfklf = tabel_kualifikasipendidikan.getElementsByTagName("tfoot")[0];
        for (let c = 0 ; c < ptkijazah.length ; c++){
            let r = c+1;
            tdklf.rows[c].cells[1].innerHTML =tptk.filter(s => s.jabatan == "Guru Kelas" && s.ijazah == ptkijazah[c]).length;
            tdklf.rows[c].cells[2].innerHTML =tptk.filter(s => (s.jabatan == "Guru PAI" || s.jabatan == "Guru PKRIS" || s.jabatan == "Guru PKATO" || s.jabatan == "Guru PHIND" || s.jabatan == "Guru PBUDH" ||  s.jabatan == "Guru PKONG" )&& s.ijazah == ptkijazah[c]).length;
            tdklf.rows[c].cells[3].innerHTML =tptk.filter(s => s.jabatan == "Guru PJOK" && s.ijazah == ptkijazah[c]).length;;
            tdklf.rows[c].cells[4].innerHTML =tptk.filter(s =>  s.jabatan == "Guru BSUND" && s.ijazah == ptkijazah[c]).length;;
            tdklf.rows[c].cells[5].innerHTML =tptk.filter(s => (s.jabatan == "Kepala Sekolah" || s.jabatan == "Guru BING"|| s.jabatan == "Guru TIK")&&s.ijazah == ptkijazah[c]).length;
            tdklf.rows[c].cells[6].innerHTML =tptk.filter(s => (s.tugasjabatan == "Tata Usaha"|| s.tugasjabatan == "TU"|| s.tugasjabatan == "Penjaga"|| s.tugasjabatan == "OB"|| s.tugasjabatan == "Office Boy"|| s.tugasjabatan == "Satpam")&& s.ijazah == ptkijazah[c]).length;
            tdklf.rows[c].cells[7].innerHTML =tptk.filter(s => (s.tugasjabatan == "Operator Sekolah" || s.tugasjabatan == "OPS")&& s.ijazah == ptkijazah[c]).length;
            tdklf.rows[c].cells[8].innerHTML =tptk.filter(s => s.ijazah == ptkijazah[c]).length;;
         

        }
        tfklf.rows[0].cells[1].innerHTML =tptk.filter(s => s.jabatan == "Guru Kelas").length;
        tfklf.rows[0].cells[2].innerHTML =tptk.filter(s => (s.jabatan == "Guru PAI" || s.jabatan == "Guru PKRIS" || s.jabatan == "Guru PKATO" || s.jabatan == "Guru PHIND" || s.jabatan == "Guru PBUDH" ||  s.jabatan == "Guru PKONG" )).length;
        tfklf.rows[0].cells[3].innerHTML =tptk.filter(s => s.jabatan == "Guru PJOK" ).length;;
        tfklf.rows[0].cells[4].innerHTML =tptk.filter(s =>  s.jabatan == "Guru BSUND").length;;
        tfklf.rows[0].cells[5].innerHTML =tptk.filter(s => (s.jabatan == "Kepala Sekolah" || s.jabatan == "Guru BING"|| s.jabatan == "Guru TIK")).length;
        tfklf.rows[0].cells[6].innerHTML =tptk.filter(s => s.tugasjabatan == "Tata Usaha"|| s.tugasjabatan == "TU"|| s.tugasjabatan == "Penjaga"|| s.tugasjabatan == "OB"|| s.tugasjabatan == "Office Boy"|| s.tugasjabatan == "Satpam").length;
        tfklf.rows[0].cells[7].innerHTML =tptk.filter(s => s.tugasjabatan == "Operator Sekolah" || s.tugasjabatan == "OPS").length;
        tfklf.rows[0].cells[8].innerHTML =tptk.length;;
       
        tfklf.rows[1].cells[1].innerHTML = tptk.filter(s=>!(s.tugasjabatan == "Tata Usaha"|| s.tugasjabatan == "TU"|| s.tugasjabatan == "Penjaga"|| s.tugasjabatan == "OB"|| s.tugasjabatan == "Office Boy"|| s.tugasjabatan == "Satpam"||s.tugasjabatan == "Operator Sekolah" || s.tugasjabatan == "OPS")).length;
        tfklf.rows[1].cells[2].innerHTML = tptk.filter(s=>s.tugasjabatan == "Tata Usaha"|| s.tugasjabatan == "TU"|| s.tugasjabatan == "Penjaga"|| s.tugasjabatan == "OB"|| s.tugasjabatan == "Office Boy"|| s.tugasjabatan == "Satpam"||s.tugasjabatan == "Operator Sekolah" || s.tugasjabatan == "OPS").length
        tfklf.rows[1].cells[3].innerHTML = tptk.length;
      
    

        for(i=1 ; i <= 6 ; i++){
            lr = i-1;
            //umur dulu
             umursiswa = jsondatasiswa.filter(s=> s.jenjang == i).filter(l => l.pd_tanggallahir !== "");
            tingkatumur = jsondatasiswa.filter(s=> s.jenjang == i).length;
            //kol 6 tahun 
             u6 = umursiswa.map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;
             u7 = umursiswa.map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;
             u13 = umursiswa.map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
            tdumur.rows[lr].cells[1].innerHTML = u6;
            tdumur.rows[lr].cells[2].innerHTML = u7;
            tdumur.rows[lr].cells[3].innerHTML = u13;
            tdumur.rows[lr].cells[4].innerHTML = tingkatumur;

            pipL = jsondatasiswa.filter(s=> s.jenjang == i && s.dapo_bank !=="" & s.pd_jk == "L").length;
            pipP = jsondatasiswa.filter(s=> s.jenjang == i &&  s.dapo_bank !=="" & s.pd_jk == "P").length;
            pipJ = jsondatasiswa.filter(s=> s.jenjang == i &&  s.dapo_bank !=="" ).length;
            td_pip.rows[lr].cells[1].innerHTML = pipL;
            td_pip.rows[lr].cells[2].innerHTML = pipP;
            td_pip.rows[lr].cells[3].innerHTML = pipJ;
            let ar = ["ISLAM","ISLAM","KRISTEN","KRISTEN","KATHOLIK","KATHOLIK","HINDU","HINDU","BUDHA","BUDHA","KHONGHUCU","KHONGHUCU"]
            for(u=1 ; u <=12 ; u++){
                //islam =   
                if(u % 2 == 0){
                    td_agama.rows[lr].cells[u].innerHTML = jsondatasiswa.filter(s=> s.jenjang == i && s.pd_jk == "P" && s.pd_agama == ar[u-1]).length;
                    
                }else{
                    td_agama.rows[lr].cells[u].innerHTML = jsondatasiswa.filter(s=> s.jenjang == i && s.pd_jk == "L" && s.pd_agama == ar[u-1]).length;

                }
            }

            td_agama.rows[lr].cells[13].innerHTML = jsondatasiswa.filter(s=> s.jenjang == i && s.pd_agama !=="" ).length;
            let ars = ["ISLAM","KRISTEN","KATHOLIK","HINDU","BUDHA","KHONGHUCU"];
            tf_agama.rows[1].cells[i].innerHTML = jsondatasiswa.filter(s=>s.pd_agama == ars[i-1]&& s.pd_jk !=="").length;
            //  pendidikan 
            let pdd =["S3","S2","D4/S1","D3", "D2", "DI", "SMA Sederajat","SMP Sederajat","SD Sederajat","Putus SD","Tidak Sekolah"];
            for(let v = 0; v < pdd.length; v++){
            td_ortu_pendidikan.rows[lr].cells[(v+1)].innerHTML = jsondatasiswa.filter(s=> s.dapo_jenjangpendidikanayah == pdd[v] && s.jenjang == i).length;
            tf_ortu_pendidikan.rows[0].cells[(v+1)].innerHTML = jsondatasiswa.filter(s=> s.dapo_jenjangpendidikanayah == pdd[v]).length;
            }
            td_ortu_pendidikan.rows[lr].cells[12].innerHTML = jsondatasiswa.filter(s=> s.dapo_jenjangpendidikanayah !== "" && s.jenjang == i).length;
            tf_ortu_pendidikan.rows[0].cells[12].innerHTML = jsondatasiswa.filter(s=> s.dapo_jenjangpendidikanayah !== "" ).length;
        }
    //tfoot
    umursiswa = jsondatasiswa.filter(l => l.pd_tanggallahir !== "");        
    u6 = umursiswa.map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;  
    u7 = umursiswa.map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;
    u13 = umursiswa.map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
   tfumur.rows[0].cells[1].innerHTML = u6;
   tfumur.rows[0].cells[2].innerHTML = u7;
   tfumur.rows[0].cells[3].innerHTML = u13;
   tfumur.rows[0].cells[4].innerHTML = umursiswa.length;
   // pip
   pipL = jsondatasiswa.filter(s=> s.dapo_bank !=="" && s.pd_jk == "L").length;
   pipP = jsondatasiswa.filter(s=>  s.dapo_bank !=="" && s.pd_jk == "P").length;
   pipJ = jsondatasiswa.filter(s=>  s.dapo_bank !=="" ).length;
   tf_pip.rows[0].cells[1].innerHTML = pipL;
   tf_pip.rows[0].cells[2].innerHTML = pipP;
   tf_pip.rows[0].cells[3].innerHTML = pipJ;
   // foot agama
   let ar = ["ISLAM","ISLAM","KRISTEN","KRISTEN","KATHOLIK","KATHOLIK","HINDU","HINDU","BUDHA","BUDHA","KHONGHUCU","KHONGHUCU"];
   let ars = ["ISLAM","KRISTEN","KATHOLIK","HINDU","BUDHA","KHONGHUCU"];
   for(u=1 ; u <=12 ; u++){
         if(u % 2 == 0){
           tf_agama.rows[0].cells[u].innerHTML = jsondatasiswa.filter(s=> s.pd_jk == "P" && s.pd_agama == ar[u-1]).length;
           
       }else{
           tf_agama.rows[0].cells[u].innerHTML = jsondatasiswa.filter(s=>s.pd_jk == "L" && s.pd_agama == ar[u-1]).length;
           
        }
    }
    tf_agama.rows[0].cells[13].innerHTML = jsondatasiswa.filter(s=> s.pd_agama !==""&& s.pd_jk !=="" ).length; 
    tf_agama.rows[1].cells[7].innerHTML = jsondatasiswa.filter(s=> s.pd_agama !==""&& s.pd_jk !=="").length; 
    let ucek = jsondatasiswa.filter(s=>s.pd_tanggallahir =="").length;
    if(ucek>0){
        ket_tabel_siswaumur.innerHTML =`Isian Data <b class="w3-text-blue">Tanggal lahir</b> tidak diisi ada ${ucek} siswa. Periksa di Data Siswa.`;

    }
    let ujk = jsondatasiswa.filter(s=>s.pd_jk == "" ).length;
    let uga = jsondatasiswa.filter(s=>s.pd_agama == "" ).length;
    if(ujk>0){
        ket_tabel_siswaagama.innerHTML = `Pengisian <b class="w3-text-blue">Jenis Kelamin</b> pada data siswa tidak diisi ada ${ujk} siswa.`;
    }
    if(uga>0){
        ket_tabel_siswaagama.innerHTML += `<br>Pengisian <b class="w3-text-blue">Agama</b> pada data siswa tidak diisi ada ${uga} siswa.`;
    }
    if(uga > 0 || ujk > 0){
        ket_tabel_siswaagama.innerHTML += `<br> Segera periksa masing-masing datanya agar valid. Data siswa aktif elamaso seluruhnya ada: ${jsondatasiswa.length} Siswa<br><br>`;
    }
    //foot Pendidikan ayah
    let updkn = jsondatasiswa.filter(s=> s.dapo_jenjangpendidikanayah =="").length;
    ket_tabel_ortu_pendidikan.innerHTML = `Data Siswa <b class="w3-text-blue">Pendidikan Ayah</b> yang tidak diisi ada ${updkn} siswa.`;

        clearInterval(stoploadingtopbar);
        // let divlod = document.querySelector(".loadingtopbar");
        divlod.style.width = "100%";
        setTimeout(() => {
            divlod.className += " w3-hide";
            divlod.style.width = "1px"
    
        }, 3000);
}
const simpanserverprofilsekolah = () => {
 
    let tab = "profilsekolah";
    let tipes = [];
    let tipe = JSON.stringify(tipes);
    let tabel = tabel_profilsekolah();
    //tab
    //key
    let head = tabel;
    let key = JSON.stringify(tabel);
    let datakirim = new FormData();
   
    datakirim.append("tab",tab)
    datakirim.append("tabel",key)
    datakirim.append("tipe",tipe)
    fetch(linktendik+"?action=postpostdatatotab",{
        method:"post",
        body:datakirim
    }).then(m => m.json())
    .then(r => {
        console.log(r)
        jsonprofilsekolah = r.data;
        alert("Data berhasil tersimpan");
    }).catch(er => {
        console.log(er);
        alert("Maaf, terjadi kesalahan. Ulangi sesi Anda sesaat lagi...")
    })

}
const printprofilsekolah = ()=>{
    let isibody = document.querySelector(".printprofilsekolah").innerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO PROFIL SEKOLAH</title>`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=Raleway">`;
    head.innerHTML += `<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>`;
    head.innerHTML += `<style type="text/css">
    .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}
    .garis td,.garis th,.garis tr{border:1px solid #000}.garis th{border:1px solid #000;text-align:center;vertical-align:middle}
    .tabelbiasa, .tabelbiasa td,.tabelbiasa th{ border: 1px solid rgb(0, 0, 0); padding:5px } .tabelbiasa th{ background-color:rgb(177, 177, 177) } .tabelbiasa  { width:100%; border-collapse: collapse; }
    .tabelbiasaputih th{ background-color:#fff !important; }
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

    body.innerHTML = isibody;
    body.innerHTML += '<br/><div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ',' + tanggalfull(new Date()) + '<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><b><u>' + idNamaKepsek + '</u></b><br/>NIP. ' + idNipKepsek + '</div>';

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

};


let jsonsuratmasuk = [];
let jsonsuratkeluar = [];
let jsongaleri = [];
let jsongaleridihapus = [];
const suratsurat = async() =>{
    loadingtopbarin("loadingtopbar");
    tampilinsublamangurukelas("surat");
    document.querySelector(".btn_suratmasuk").click();
    let aks = document.querySelectorAll(".aksi_surat");
    aks.forEach(s => {
        if(s.className.indexOf("w3-hide")==-1){
            s.className += " w3-hide";
        }
    });
    
    
        let tab = "suratmasuk"
        let tabel = ["idbaris","tglditerima","nosurat","asalsurat","tglsurat","perihal","indekssurat","ditujukankepada","idfile","status","oleh"];
        let html = "";
        let ttbody = document.querySelector(".tabel_suratmasuk").getElementsByTagName("tbody")[0];
        
        let key = JSON.stringify(tabel);
        let datakirim = new FormData();
    
        datakirim.append("tab",tab)
        datakirim.append("key",key)
        await fetch(linktendik+"?action=getpostdatafromtab",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
           // console.log(r);
            
           let res = r.result;
           let rec = r.data.filter(s=> s.status !== "hapus");
           //console.log(rec)
           if(res > 1){
               jsonsuratmasuk = rec;
              // console.log(res);
               // (let i = jsonmateri.length - 1; i >= 0; i--)
                for(i = rec.length-1; i>=0; i--){
                    html += `<tr>
                    <td>${i+1}</td>
                    <td>${tanggalfull(rec[i].tglditerima)}</td>
                    <td>${rec[i].nosurat}</td>
                    <td>${rec[i].asalsurat}</td>
                    <td>${tanggalfull(rec[i].tglsurat)}</td>
                    <td>${rec[i].perihal}</td>
                    <td>${rec[i].indekssurat}</td>
                    <td>${rec[i].ditujukkankepada}</td>
                    <td>
                        <i class="fa fa-edit warnaeka w3-btn w3-margin-bottom" title="edit" onclick="editsurat(${rec[i].idbaris})"></i> 
                        <i class="fa fa-eye warnaeka w3-btn w3-margin-bottom" title="lihat surat" onclick="lihatsurat(${rec[i].idbaris})"></i> 
                        <i class="fa fa-trash warnaeka w3-btn w3-margin-bottom" title="hapus dari data surat masuk" onclick="hapussurat(${rec[i].idbaris})"></i> 
                    </td>
                    </tr>`;
                }
           }else{
            html = `<tr><td colspan="9" class="w3-red w3-center">Belum ada data</td></tr>`;
           }
        //    console.log(r);
        ttbody.innerHTML = html;
        }).catch(er => console.log(er))

        clearInterval(stoploadingtopbar);
        let divlod = document.querySelector(".loadingtopbar");
        divlod.style.width = "100%";
        setTimeout(() => {
            divlod.style.width = "1px"
            divlod.className += " w3-hide";
    
        }, 3000);
}
const urutkanTabel=(elclas,bol)=>{
   
    let div = document.querySelector("." + elclas).getElementsByTagName("tbody")[0];
    let el = document.querySelector(".bturut_" + elclas.replace("tabel_",""));
    let rows, switching, i, x, y, shouldSwitch;

    let kolom = 0;
    if (bol) {
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

        el.setAttribute("onclick", `urutkanTabel('${elclas}',false)`);
        el.innerHTML = "&#8679;";
    } else {
        //let kolom = 0;
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
                if (x < y) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
        el.setAttribute("onclick", `urutkanTabel('${elclas}',true)`);
        el.innerHTML = "&#8681;";
        // alert(kolom);
    }   
}
const lampirkansurat = (cl) =>{
    var file = "";
    file = document.getElementById("lampirkan"+cl).files[0];
    let namafiler = file.name;
    let namafilerr = namafiler.replace(/[.\/\s+]/g,"_");//+ new Date().getTime();
    let namafile = namafilerr;


    let elinput,el_label,namafolder;
    if (cl == "suratmasuk"){
        elinput = document.querySelector("[data-idsm=idfile");
        el_label = document.querySelector(".labelfile_suratmasuk");
        namafolder ="000 Surat Masuk" ;
    }else{
        elinput = document.querySelector("[data-idsk=idfile");
        el_label = document.querySelector(".labelfile_suratkeluar");
        namafolder = "000 Surat Keluar";
        
    }
    el_label.innerHTML = `<img src="/img/barloading.gif"/>`
    var reader = new FileReader();
    reader.onload = function (e) {
        //document.getElementById('uploadForm').submit();

        let src = e.target.result;
        let dataa = src.replace(/^.*,/, '');
        let tipe = e.target.result.match(/^.*(?=;)/)[0];
        //fn_upload_file(id_input, data, tipe);
        // console.log(tipe);
        // console.log(data);
        
    
        let data = new FormData();
      
        data.append("fileContent", dataa);
        data.append("mimeType", tipe);
        data.append("filename", namafile);
        data.append("kelas", namafolder);
         // + "?action=uploaddulu";
        fetch(linktendik+"?action=uploadfiledulu", {
            method: 'post',
            body: data
        }).then(m => m.json())
            .then(r => {
                if (r.sukses == "Gagal") {
                    setTimeout(() => {
                        el_label.innerHTML = `<i class="fa fa-upload warnaeka  w3-round-large w3-padding w3-border-black w3-border-bottom w3-center"> Unggah File</i>`;
    
                    }, 3000);
                    el_label.innerHTML = `Gagal Mengunggah`;
                } else {
                    el_label.innerHTML = `<i class="fa fa-upload warnaeka  w3-round-large w3-padding w3-border-black w3-border-bottom w3-center"> Unggah File</i>`;
                    elinput.value = r.idfile;
                }
            })
            .catch(er => {
                console.log(er);
                
                alert("Maaf, terjadi kesalahan. Silakan ulangi sesi Anda sesaat lagi.")
                el_label.innerHTML = `<i class="fa fa-upload warnaeka  w3-round-large w3-padding w3-border-black w3-border-bottom w3-center"> Unggah File</i>`;
            })
    }
    reader.readAsDataURL(file);
}
const tambahsuratmasuk = () =>{
   
    let divv = document.querySelector(".pencariansuratmasuk");
    if(divv.className.indexOf("w3-hide")==-1){
        divv.className +=" w3-hide";
    }   
    let div = document.querySelector(".penambahansuratmasuk");
    div.className = div.className.replace("w3-hide","");

    let bt = document.querySelector(".tombolkirimsuratmasuk");
    bt.setAttribute("onclick",`kirimserver_suratmasuk()`);
    bt.innerHTML = `<i class="fa fa-paper-plane"></i>  Tambah`;
    let setdata = document.querySelectorAll("[data-idsm]");
    setdata.forEach(s => s.value ="");

    let y = div.offsetTop - 45;
    window.scrollTo({ top: y, behavior: 'smooth' });

}
const tambahsuratkeluar = () =>{
    
    let divv = document.querySelector(".pencariansuratkeluar");
    if(divv.className.indexOf("w3-hide")==-1){
        divv.className +=" w3-hide";
    }

    let div = document.querySelector(".penambahansuratkeluar");
    div.className = div.className.replace("w3-hide","");

    let bt = document.querySelector(".tombolkirimsuratkeluar");
     bt.setAttribute("onclick",`kirimserver_suratkeluar()`);
     bt.innerHTML = `<i class="fa fa-paper-plane"></i>  Tambah`;
     let setdata = document.querySelectorAll("[data-idsk]");
     setdata.forEach(s => s.value ="");

     let y = div.offsetTop - 45;
     window.scrollTo({ top: y, behavior: 'smooth' });
    
}
const carisuratmasuk = () =>{
    
    
    let divv = document.querySelector(".penambahansuratmasuk");
    if(divv.className.indexOf("w3-hide")==-1){
        divv.className +=" w3-hide";
    }
    let div = document.querySelector(".pencariansuratmasuk");
    div.className = div.className.replace("w3-hide","");
         let y = div.offsetTop - 45;
         window.scrollTo({ top: y, behavior: 'smooth' });
        
    
    
}
const carisuratkeluar = () =>{
    
    
       
        let divv = document.querySelector(".penambahansuratkeluar");
        if(divv.className.indexOf("w3-hide")==-1){
            divv.className +=" w3-hide";
        }
        
         let div = document.querySelector(".pencariansuratkeluar");
        div.className = div.className.replace("w3-hide","");
        let y = div.offsetTop - 45;
         window.scrollTo({ top: y, behavior: 'smooth' });
        
    
    
}
const printsuratmasuk = () =>{
    if(jsonsuratmasuk.length==0){
        alert("Maaf, Tidak bisa dicetak");
        return
    }
    let isibody = document.querySelector(".printdatasuratmasuk");
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO Surat Maasuk</title>`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=Raleway">`;
    head.innerHTML += `<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>`;
    head.innerHTML += `<style type="text/css">
    .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}
    .garis td,.garis th,.garis tr{border:1px solid #000}.garis th{border:1px solid #000;text-align:center;vertical-align:middle}
    .tabelbiasa, .tabelbiasa td,.tabelbiasa th{ border: 1px solid rgb(0, 0, 0); padding:5px } .tabelbiasa th{ background-color:rgb(177, 177, 177) } .tabelbiasa  { width:100%; border-collapse: collapse; }
    .tabelbiasaputih th{ background-color:#fff !important; }
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
    let cdiv = document.createElement("div");
    cdiv.setAttribute("class","kloningsuratmasuk");
    let klon  = isibody.cloneNode(true);
    let h = klon.querySelector(".tabel_suratmasuk");
    let hh = klon.querySelector(".tabel_suratmasuk");
    //console.log(h)
    for(i=1; i < h.rows.length ; i++){
        let indek = parseInt(h.rows[i].cells[0].innerHTML - 1);
        if(jsonsuratmasuk[indek].idfile == ""){
            h.rows[i].cells[8].innerHTML = `Tidak ada file`;

        }else{
            h.rows[i].cells[8].setAttribute("style","word-wrap: break-word;");
            h.rows[i].cells[8].innerHTML = `<a href="https://drive.google.com/file/d/${jsonsuratmasuk[indek].idfile}/view?usp=drivesdk">https://drive.google.com/file/d/${jsonsuratmasuk[indek].idfile}/view</a>`;
        }
    }

    
    
    cdiv.appendChild(klon);
    
    body.innerHTML = "";
    body.appendChild(cdiv);
    // hapus[0].remove();

    body.innerHTML += '<br/><div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ',' + tanggalfull(new Date()) + '<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><b><u>' + idNamaKepsek + '</u></b><br/>NIP. ' + idNipKepsek + '</div>';

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();
}
const printsuratkeluar = () =>{
    if(jsonsuratkeluar.length==0){
        alert("Maaf, Tidak bisa dicetak");
        return
    }
    let isibody = document.querySelector(".printdatasuratkeluar");
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO Surat Keluar</title>`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link href="https://fonts.googleapis.com/css?family=Raleway">`;
    head.innerHTML += `<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>`;
    head.innerHTML += `<style type="text/css">
    .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000}
    .garis td,.garis th,.garis tr{border:1px solid #000}.garis th{border:1px solid #000;text-align:center;vertical-align:middle}
    .tabelbiasa, .tabelbiasa td,.tabelbiasa th{ border: 1px solid rgb(0, 0, 0); padding:5px } .tabelbiasa th{ background-color:rgb(177, 177, 177) } .tabelbiasa  { width:100%; border-collapse: collapse; }
    .tabelbiasaputih th{ background-color:#fff !important; }
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
    let cdiv = document.createElement("div");
    cdiv.setAttribute("class","kloningsuratkeluar");
    let klon  = isibody.cloneNode(true);
    let h = klon.querySelector(".tabel_suratkeluar");
    let hh = klon.querySelector(".tabel_suratkeluar");
    //console.log(h)
    for(i=1; i < h.rows.length ; i++){
        let indek = parseInt(h.rows[i].cells[0].innerHTML - 1);
        if(jsonsuratkeluar[indek].idfile == ""){
            h.rows[i].cells[6].innerHTML = `Tidak ada file`;

        }else{
            h.rows[i].cells[6].setAttribute("style","word-wrap: break-word;");
            h.rows[i].cells[6].innerHTML = `<a href="https://drive.google.com/file/d/${jsonsuratkeluar[indek].idfile}/view?usp=drivesdk">https://drive.google.com/file/d/${jsonsuratmasuk[indek].idfile}/view</a>`;
        }
    }

    
    
    cdiv.appendChild(klon);
    
    body.innerHTML = "";
    body.appendChild(cdiv);
    // hapus[0].remove();

    body.innerHTML += '<br/><div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ',' + tanggalfull(new Date()) + '<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><b><u>' + idNamaKepsek + '</u></b><br/>NIP. ' + idNipKepsek + '</div>';

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();
}
const carisuratinput = (cl,el) =>{
    let tbody,html = "",html2 = "";
    let json;
    if(cl == "suratmasuk"){
        tbody = document.querySelector(".tabel_suratmasuk").getElementsByTagName("tbody")[0];
        json= jsonsuratmasuk;
    }else{
        tbody = document.querySelector(".tabel_suratkeluar").getElementsByTagName("tbody")[0];
        json = jsonsuratkeluar
    }
    
    if(json.length == 0){
        console.log(el.value)
        return;
    }else{
        let rec;
        if(el.value ==""){
            rec = json;
        }else{
            rec = json.filter(s => Object.entries(s).filter(([k,v]) =>{
                let vv = v.toString().indexOf(el.value)//el.value.indexOf(v);
                console.log(vv);
                if(vv>-1){
                    return true
                }else{
                    return false
                }
            }).length!==0);
        }
        
        if(rec.length == 0){
            html = `<tr><td colspan="9" class="w3-red w3-center">Belum ada data</td></tr>`;
            html2 = `<tr><td colspan="7" class="w3-red w3-center">Belum ada data</td></tr>`;
        }else{
            
            // for(i = 0; i < rec.length ; i++){
                for(i = rec.length-1; i>=0; i--){
                html += `<tr>
                <td>${i+1}</td>
                <td>${tanggalfull(rec[i].tglditerima)}</td>
                <td>${rec[i].nosurat}</td>
                <td>${rec[i].asalsurat}</td>
                <td>${tanggalfull(rec[i].tglsurat)}</td>
                <td>${rec[i].perihal}</td>
                <td>${rec[i].indekssurat}</td>
                <td>${rec[i].ditujukkankepada}</td>
                <td>
                <i class="fa fa-edit warnaeka w3-btn w3-margin-bottom" title="edit" onclick="editsurat(${rec[i].idbaris})"></i> 
                <i class="fa fa-eye warnaeka w3-btn w3-margin-bottom" title="lihat surat" onclick="lihatsurat(${rec[i].idbaris})"></i> 
                <i class="fa fa-trash warnaeka w3-btn w3-margin-bottom" title="hapus dari data surat masuk" onclick="hapussurat(${rec[i].idbaris})"></i> 
                </td>
                </tr>`;
                html2 += `<tr>
                <td>${i+1}</td>
                <td>${rec[i].nosurat}</td>
                <td>${tanggalfull(rec[i].tglsurat)}</td>
                <td>${rec[i].ditujukkankepada}</td>
                <td>${rec[i].perihal}</td>
                <td>${rec[i].indekssurat}</td>
                
                <td>
                <i class="fa fa-edit warnaeka w3-btn w3-margin-bottom" title="edit" onclick="editsuratkeluar(${rec[i].idbaris})"></i> 
                <i class="fa fa-eye warnaeka w3-btn w3-margin-bottom" title="lihat surat" onclick="lihatsuratkeluar(${rec[i].idbaris})"></i> 
                <i class="fa fa-trash warnaeka w3-btn w3-margin-bottom" title="hapus dari data surat masuk" onclick="hapussuratkeluar(${rec[i].idbaris})"></i> 
                </td>
                </tr>`;
            }
        }
        if(cl == "suratmasuk"){
        tbody.innerHTML = html;
        }else{
            tbody.innerHTML = html2;

        }
    }
    
    
    
    
};
const cariinvalueindek = (val) =>{
    return jsonsuratmasuk.filter(s => Object.entries(s).filter(([k,v]) => v == el.value).length!==0);
}
const kirimserver_suratmasuk = () => {
    let divlod = document.querySelector(".loadingtopbar");
    divlod.style.width = "1px";
    
    let isioleh = document.querySelector("[data-idsm=oleh");
    isioleh.value = namauser;
    let isistatus = document.querySelector("[data-idsm=status]");
    isistatus.value ="diarsipkan";
    let setdata = document.querySelectorAll("[data-idsm]");
    let atsetdata ;
    let key = ["idbaris"];
    let val = [];
    let type = [2,5];
    let v;
    let nol=[]
    for(i = 0 ; i < setdata.length; i++){
        atsetdata = setdata[i].getAttribute("data-idsm");
        v = setdata[i].value;
        key.push(atsetdata);
        val.push(v);
        if(v ==""){
            nol.push(i)
        }
    };
    
    if(nol.length !==0){
        alert("Data ada yang kosong. Pengisian harus lengkap");
        return;
    }
    loadingtopbarin("loadingtopbar");
    let aks = document.querySelectorAll(".aksi_surat");
    aks.forEach(s => {
        if(s.className.indexOf("w3-hide")==-1){
            s.className += " w3-hide";
        }
    });

    let tabel = JSON.stringify(val);
    let keyy = JSON.stringify(key);
    let tipe = JSON.stringify(type);
    let datakirim = new FormData();

    datakirim.append("key",keyy);
    datakirim.append("tab","suratmasuk");
    datakirim.append("tabel",tabel);
    datakirim.append("tipe",tipe);
    let html = "";
    let ttbody = document.querySelector(".tabel_suratmasuk").getElementsByTagName("tbody")[0];
    ttbody.innerHTML= `<tr><td colspan="9"><img src="/img/barloading.gif"/> sedang proses kriim</td></tr>`;
    setdata.forEach(s => s.value ="");
    

        
     fetch(linktendik+"?action=simpanbarisketaburut",{
        method:"post",
        body:datakirim
    }).then(m => m.json())
    .then(r => {
       //console.log(r);
       alert("Berhasil diinput.")
       let res = r.result;
           let rec = r.data.filter(s=> s.status !== "hapus");
           //console.log(rec)
           if(res > 1){
               jsonsuratmasuk = rec;
              // console.log(res);
               // (let i = jsonmateri.length - 1; i >= 0; i--)
                for(i = rec.length-1; i>=0; i--){
                    html += `<tr>
                    <td>${i+1}</td>
                    <td>${tanggalfull(rec[i].tglditerima)}</td>
                    <td>${rec[i].nosurat}</td>
                    <td>${rec[i].asalsurat}</td>
                    <td>${tanggalfull(rec[i].tglsurat)}</td>
                    <td>${rec[i].perihal}</td>
                    <td>${rec[i].indekssurat}</td>
                    <td>${rec[i].ditujukkankepada}</td>
                    <td>
                        <i class="fa fa-edit warnaeka w3-btn w3-margin-bottom" title="edit" onclick="editsurat(${rec[i].idbaris})"></i> 
                        <i class="fa fa-eye warnaeka w3-btn w3-margin-bottom" title="lihat surat" onclick="lihatsurat(${rec[i].idbaris})"></i> 
                        <i class="fa fa-trash warnaeka w3-btn w3-margin-bottom" title="hapus dari data surat masuk" onclick="hapussurat(${rec[i].idbaris})"></i> 
                    </td>
                    </tr>`;
                }
           }else{
            html = `<tr><td colspan="9" class="w3-red w3-center">Belum ada data</td></tr>`;
           }
        //    console.log(r);
        ttbody.innerHTML = html;
        clearInterval(stoploadingtopbar);
        
        divlod.style.width = "100%";
        setTimeout(() => {
            divlod.style.width = "1px"
            divlod.className += " w3-hide";
    
        }, 3000);
    })
    .catch(er => console.log(er))
}
const kirimserver_suratkeluar = () => {
    let divlod = document.querySelector(".loadingtopbar");
    divlod.style.width = "1px";
    
    let isioleh = document.querySelector("[data-idsk=oleh");
    isioleh.value = namauser;
    let isistatus = document.querySelector("[data-idsk=status]");
    isistatus.value ="diarsipkan";
    let setdata = document.querySelectorAll("[data-idsk]");
    let atsetdata ;
    let key = ["idbaris"];
    let val = [];
    let type = [3];
    let v;
    let nol=[]
    for(i = 0 ; i < setdata.length; i++){
        atsetdata = setdata[i].getAttribute("data-idsk");
        v = setdata[i].value;
        key.push(atsetdata);
        val.push(v);
        if(v ==""){
            nol.push(i)
        }
    };
    
    if(nol.length !==0){
        alert("Data ada yang kosong. Pengisian harus lengkap");
        return;
    }
    loadingtopbarin("loadingtopbar");
    let aks = document.querySelectorAll(".aksi_surat");
    aks.forEach(s => {
        if(s.className.indexOf("w3-hide")==-1){
            s.className += " w3-hide";
        }
    });

    let tabel = JSON.stringify(val);
    let keyy = JSON.stringify(key);
    let tipe = JSON.stringify(type);
    let datakirim = new FormData();

    datakirim.append("key",keyy);
    datakirim.append("tab","suratkeluar");
    datakirim.append("tabel",tabel);
    datakirim.append("tipe",tipe);
    let html = "";
    let ttbody = document.querySelector(".tabel_suratkeluar").getElementsByTagName("tbody")[0];
    ttbody.innerHTML= `<tr><td colspan="9"><img src="/img/barloading.gif"/> sedang proses kriim</td></tr>`;
    setdata.forEach(s => s.value ="");
    

        
     fetch(linktendik+"?action=simpanbarisketaburut",{
        method:"post",
        body:datakirim
    }).then(m => m.json())
    .then(r => {
       //console.log(r);
       alert("Berhasil diinput.")
       let res = r.result;
           let rec = r.data.filter(s=> s.status !== "hapus");
           //console.log(rec)
           if(res > 1){
               jsonsuratkeluar = rec;
              // console.log(res);
               // (let i = jsonmateri.length - 1; i >= 0; i--)
                for(i = rec.length-1; i>=0; i--){
                    html += `<tr>
                    <td>${i+1}</td>
                    <td>${rec[i].nosurat}</td>
                    <td>${tanggalfull(rec[i].tglsurat)}</td>
                    <td>${rec[i].ditujukkankepada}</td>
                    <td>${rec[i].perihal}</td>
                    <td>${rec[i].indekssurat}</td>

                    <td>
                        <i class="fa fa-edit warnaeka w3-btn w3-margin-bottom" title="edit" onclick="editsuratkeluar(${rec[i].idbaris})"></i> 
                        <i class="fa fa-eye warnaeka w3-btn w3-margin-bottom" title="lihat surat" onclick="lihatsuratkeluar(${rec[i].idbaris})"></i> 
                        <i class="fa fa-trash warnaeka w3-btn w3-margin-bottom" title="hapus dari data surat masuk" onclick="hapussuratkeluar(${rec[i].idbaris})"></i> 
                    </td>
                    </tr>`;
                }
           }else{
            html = `<tr><td colspan="9" class="w3-red w3-center">Belum ada data</td></tr>`;
           }
        //    console.log(r);
        ttbody.innerHTML = html;
        clearInterval(stoploadingtopbar);
        
        divlod.style.width = "100%";
        setTimeout(() => {
            divlod.style.width = "1px"
            divlod.className += " w3-hide";
    
        }, 3000);
    })
    .catch(er => console.log(er))
}
const lihatsurat = (i) =>{
    let d = jsonsuratmasuk.filter(s => s.idbaris==i)[0];
    let f = d.idfile;
    let link = `https://drive.google.com/file/d/${f}/view?usp=drivesdk`;
    window.open(link,'', 'width=720,height=600');
}
const lihatsuratkeluar = (i) =>{
    let d = jsonsuratkeluar.filter(s => s.idbaris==i)[0];
    let f = d.idfile;
    let link = `https://drive.google.com/file/d/${f}/view?usp=drivesdk`;
    window.open(link,'', 'width=720,height=600');
}
const editsurat = (i)=>{
    tambahsuratmasuk();
    //ganti! <button onclick="kirimserver_suratmasuk()" class="w3-btn w3-teal w3-border-bottom tombolkirimsuratmasuk w3-border-black w3-round-large" title="Kirim ke server untuk ditambahkan"><i class="fa fa-paper-plane"></i>  Tambah</button>
    let d = jsonsuratmasuk.filter(s=> s.idbaris== i)[0];
    let o = Object.keys(d);
    for(j = 0 ; j < o.length; j++){
        let ele = document.querySelector(`[data-idsm=${o[j]}]`);
        if(ele !== null){
            if(o[j].indexOf("tgl")>-1){
                ele.value = StringTanggal(new Date(d[o[j]]))
            }else{
                ele.value = d[o[j]];
       	    }
        }
    };
     let bt = document.querySelector(".tombolkirimsuratmasuk");
     bt.setAttribute("onclick",`kirimserver_editsuratmasuk(${i})`);
     bt.innerHTML = `<i class="fa fa-edit"></i>  Perbarui`;
}
const editsuratkeluar = (i)=>{
    tambahsuratkeluar();

    //ganti! <button onclick="kirimserver_suratmasuk()" class="w3-btn w3-teal w3-border-bottom tombolkirimsuratmasuk w3-border-black w3-round-large" title="Kirim ke server untuk ditambahkan"><i class="fa fa-paper-plane"></i>  Tambah</button>
    let d = jsonsuratkeluar.filter(s=> s.idbaris== i)[0];
    let o = Object.keys(d);
    for(j = 0 ; j < o.length; j++){
        let ele = document.querySelector(`[data-idsk=${o[j]}]`);
        if(ele !== null){
            if(o[j].indexOf("tgl")>-1){
                ele.value = StringTanggal(new Date(d[o[j]]))
            }else{
                ele.value = d[o[j]];
       	    }
        }
    };
     let bt = document.querySelector(".tombolkirimsuratkeluar");
     bt.setAttribute("onclick",`kirimserver_editsuratkeluar(${i})`);
     bt.innerHTML = `<i class="fa fa-edit"></i>  Perbarui`;
}

const kirimserver_editsuratmasuk = (a)=>{
    let divlod = document.querySelector(".loadingtopbar");
    divlod.style.width = "1px";
    loadingtopbarin("loadingtopbar");
    let setdata = document.querySelectorAll("[data-idsm]");
    let atsetdata ;
    let key = ["idbaris"];
    let val = [a];
    let type = [2,5];
    let v;
    let nol=[]
    for(i = 0 ; i < setdata.length; i++){
        atsetdata = setdata[i].getAttribute("data-idsm");
        v = setdata[i].value;
        key.push(atsetdata);
        val.push(v);
        if(v ==""){
            nol.push(i)
        }
    };
   
    let tabel = JSON.stringify(val);
    let keyy = JSON.stringify(key);
    let tipe = JSON.stringify(type);
    let datakirim = new FormData();

    datakirim.append("key",keyy);
    datakirim.append("idbaris",a);
    datakirim.append("tab","suratmasuk");
    datakirim.append("tabel",tabel);
    datakirim.append("tipe",tipe);
    let html = "";
    let ttbody = document.querySelector(".tabel_suratmasuk").getElementsByTagName("tbody")[0];
    ttbody.innerHTML= `<tr><td colspan="9"><img src="/img/barloading.gif"/> sedang proses Edit</td></tr>`;
    setdata.forEach(s => s.value ="");
    let bt = document.querySelector(".tombolkirimsuratmasuk");
     bt.setAttribute("onclick",`kirimserver_suratmasuk()`);
     bt.innerHTML = `<i class="fa fa-paper-plane"></i>  Tambah`;
     let aks = document.querySelectorAll(".aksi_surat");
     aks.forEach(s => {
     if(s.className.indexOf("w3-hide")==-1){
         s.className += " w3-hide";
     }
     });

        
     fetch(linktendik+"?action=simpanbarisketabidbaris",{
        method:"post",
        body:datakirim
    }).then(m => m.json())
    .then(r => {
      // console.log(r);
      alert("Berhasil disimpan.")
       let res = r.result;
           let rec = r.data.filter(s=> s.status !== "hapus");
           //console.log(rec)
           if(res > 1){
               jsonsuratmasuk = rec;
              // console.log(res);
               // (let i = jsonmateri.length - 1; i >= 0; i--)
                for(i = rec.length-1; i>=0; i--){
                    html += `<tr>
                    <td>${i+1}</td>
                    <td>${tanggalfull(rec[i].tglditerima)}</td>
                    <td>${rec[i].nosurat}</td>
                    <td>${rec[i].asalsurat}</td>
                    <td>${tanggalfull(rec[i].tglsurat)}</td>
                    <td>${rec[i].perihal}</td>
                    <td>${rec[i].indekssurat}</td>
                    <td>${rec[i].ditujukkankepada}</td>
                    <td>
                        <i class="fa fa-edit warnaeka w3-btn w3-margin-bottom" title="edit" onclick="editsurat(${rec[i].idbaris})"></i> 
                        <i class="fa fa-eye warnaeka w3-btn w3-margin-bottom" title="lihat surat" onclick="lihatsurat(${rec[i].idbaris})"></i> 
                        <i class="fa fa-trash warnaeka w3-btn w3-margin-bottom" title="hapus dari data surat masuk" onclick="hapussurat(${rec[i].idbaris})"></i> 
                    </td>
                    </tr>`;
                }
           }else{
            html = `<tr><td colspan="9" class="w3-red w3-center">Belum ada data</td></tr>`;
           }
        //    console.log(r);
        ttbody.innerHTML = html;
        clearInterval(stoploadingtopbar);
        
        divlod.style.width = "100%";
        setTimeout(() => {
            divlod.style.width = "1px"
            divlod.className += " w3-hide";
    
        }, 3000);
       
    })
    .catch(er => console.log(er))
};
const kirimserver_editsuratkeluar = (a)=>{
    let divlod = document.querySelector(".loadingtopbar");
    divlod.style.width = "1px";
    loadingtopbarin("loadingtopbar");
    let setdata = document.querySelectorAll("[data-idsk]");
    let atsetdata ;
    let key = ["idbaris"];
    let val = [a];
    let type = [3];
    let v;
    let nol=[]
    for(i = 0 ; i < setdata.length; i++){
        atsetdata = setdata[i].getAttribute("data-idsk");
        v = setdata[i].value;
        key.push(atsetdata);
        val.push(v);
        if(v ==""){
            nol.push(i)
        }
    };
   
    let tabel = JSON.stringify(val);
    let keyy = JSON.stringify(key);
    let tipe = JSON.stringify(type);
    let datakirim = new FormData();

    datakirim.append("key",keyy);
    datakirim.append("idbaris",a);
    datakirim.append("tab","suratkeluar");
    datakirim.append("tabel",tabel);
    datakirim.append("tipe",tipe);
    let html = "";
    let ttbody = document.querySelector(".tabel_suratkeluar").getElementsByTagName("tbody")[0];
    ttbody.innerHTML= `<tr><td colspan="9"><img src="/img/barloading.gif"/> sedang proses Edit</td></tr>`;
    setdata.forEach(s => s.value ="");
    let bt = document.querySelector(".tombolkirimsuratkeluar");
     bt.setAttribute("onclick",`kirimserver_suratkeluar()`);
     bt.innerHTML = `<i class="fa fa-paper-plane"></i>  Tambah`;
     let aks = document.querySelectorAll(".aksi_surat");
     aks.forEach(s => {
     if(s.className.indexOf("w3-hide")==-1){
         s.className += " w3-hide";
     }
     });

        
     fetch(linktendik+"?action=simpanbarisketabidbaris",{
        method:"post",
        body:datakirim
    }).then(m => m.json())
    .then(r => {
      // console.log(r);
      alert("Berhasil disimpan.")
       let res = r.result;
           let rec = r.data.filter(s=> s.status !== "hapus");
           //console.log(rec)
           if(res > 1){
               jsonsuratkeluar = rec;
              // console.log(res);
               // (let i = jsonmateri.length - 1; i >= 0; i--)
                for(i = rec.length-1; i>=0; i--){
                    html += `<tr>
                    <td>${i+1}</td>
                    <td>${rec[i].nosurat}</td>
                    <td>${tanggalfull(rec[i].tglsurat)}</td>
                    <td>${rec[i].ditujukkankepada}</td>
                    <td>${rec[i].perihal}</td>
                    <td>${rec[i].indekssurat}</td>

                    <td>
                        <i class="fa fa-edit warnaeka w3-btn w3-margin-bottom" title="edit" onclick="editsuratkeluar(${rec[i].idbaris})"></i> 
                        <i class="fa fa-eye warnaeka w3-btn w3-margin-bottom" title="lihat surat" onclick="lihatsuratkeluar(${rec[i].idbaris})"></i> 
                        <i class="fa fa-trash warnaeka w3-btn w3-margin-bottom" title="hapus dari data surat masuk" onclick="hapussuratkeluar(${rec[i].idbaris})"></i> 
                    </td>
                    </tr>`;
                }
           }else{
            html = `<tr><td colspan="7" class="w3-red w3-center">Belum ada data</td></tr>`;
           }
        //    console.log(r);
        ttbody.innerHTML = html;
        clearInterval(stoploadingtopbar);
        
        divlod.style.width = "100%";
        setTimeout(() => {
            divlod.style.width = "1px"
            divlod.className += " w3-hide";
    
        }, 3000);
       
    })
    .catch(er => console.log(er))
};
const hapussurat = (a)=>{
    let konf = confirm("Anda yakin akan menghapus surat ini? Klik OK untuk menghapus atau CANCEL untuk membatalkan.");
    if(!konf){
        alert("Terima kasih, Anda membatalkan perintah hapus.");
        return
    };
    let divlod = document.querySelector(".loadingtopbar");
    divlod.style.width = "1px";
    loadingtopbarin("loadingtopbar");
    let setdata = document.querySelectorAll("[data-idsm]");
    let obj = jsonsuratmasuk.filter(s => s.idbaris == a)[0];
    let atsetdata ;
    let key = ["idbaris"];
    let val = [a];
    let type = [2,5];
    let v;
    let nol=[]
    for(i = 0 ; i < setdata.length; i++){
        atsetdata = setdata[i].getAttribute("data-idsm");
        v = obj[atsetdata];// setdata[i].value;
        key.push(atsetdata);
        val.push(v);
        if(v ==""){
            nol.push(i)
        }
    };
    //console.log(key);
   
    val.splice(9,1,"hapus")
  
    let tabel = JSON.stringify(val);
    let keyy = JSON.stringify(key);
    let tipe = JSON.stringify(type);
    let datakirim = new FormData();

    datakirim.append("key",keyy);
    datakirim.append("idbaris",a);
    datakirim.append("tab","suratmasuk");
    datakirim.append("tabel",tabel);
    datakirim.append("tipe",tipe);
    let html = "";
    let ttbody = document.querySelector(".tabel_suratmasuk").getElementsByTagName("tbody")[0];
    ttbody.innerHTML= `<tr><td colspan="9"><img src="/img/barloading.gif"/> sedang proses Edit</td></tr>`;
    

        
     fetch(linktendik+"?action=simpanbarisketabidbaris",{
        method:"post",
        body:datakirim
    }).then(m => m.json())
    .then(r => {
       //console.log(r);
       alert("Berhasil dihapus");
       let res = r.result;
           let rec = r.data.filter(s=> s.status !== "hapus");
           //console.log(rec)
           if(res > 1){
               jsonsuratmasuk = rec;
              // console.log(res);
               // (let i = jsonmateri.length - 1; i >= 0; i--)
                for(i = rec.length-1; i>=0; i--){
                    html += `<tr>
                    <td>${i+1}</td>
                    <td>${tanggalfull(rec[i].tglditerima)}</td>
                    <td>${rec[i].nosurat}</td>
                    <td>${rec[i].asalsurat}</td>
                    <td>${tanggalfull(rec[i].tglsurat)}</td>
                    <td>${rec[i].perihal}</td>
                    <td>${rec[i].indekssurat}</td>
                    <td>${rec[i].ditujukkankepada}</td>
                    <td>
                        <i class="fa fa-edit warnaeka w3-btn w3-margin-bottom" title="edit" onclick="editsurat(${rec[i].idbaris})"></i> 
                        <i class="fa fa-eye warnaeka w3-btn w3-margin-bottom" title="lihat surat" onclick="lihatsurat(${rec[i].idbaris})"></i> 
                        <i class="fa fa-trash warnaeka w3-btn w3-margin-bottom" title="hapus dari data surat masuk" onclick="hapussurat(${rec[i].idbaris})"></i> 
                    </td>
                    </tr>`;
                }
           }else{
            html = `<tr><td colspan="9" class="w3-red w3-center">Belum ada data</td></tr>`;
           }
        //    console.log(r);
        ttbody.innerHTML = html;
        clearInterval(stoploadingtopbar);
       
        divlod.style.width = "100%";
        setTimeout(() => {
            divlod.style.width = "1px"
            divlod.className += " w3-hide";
    
        }, 3000);
    })
    .catch(er => console.log(er))
}
const hapussuratkeluar = (a)=>{
    let konf = confirm("Anda yakin akan menghapus surat ini? Klik OK untuk menghapus atau CANCEL untuk membatalkan.");
    if(!konf){
        alert("Terima kasih, Anda membatalkan perintah hapus.");
        return
    };
    let divlod = document.querySelector(".loadingtopbar");
    divlod.style.width = "1px";
    loadingtopbarin("loadingtopbar");
    let setdata = document.querySelectorAll("[data-idsk]");
    let obj = jsonsuratkeluar.filter(s => s.idbaris == a)[0];
    let atsetdata ;
    let key = ["idbaris"];
    let val = [a];
    let type = [2,5];
    let v;
    let nol=[]
    for(i = 0 ; i < setdata.length; i++){
        atsetdata = setdata[i].getAttribute("data-idsk");
        v = obj[atsetdata];// setdata[i].value;
        key.push(atsetdata);
        val.push(v);
        if(v ==""){
            nol.push(i)
        }
    };
    //console.log(key);
   
    val.splice(7,1,"hapus")
  
    let tabel = JSON.stringify(val);
    let keyy = JSON.stringify(key);
    let tipe = JSON.stringify(type);
    let datakirim = new FormData();

    datakirim.append("key",keyy);
    datakirim.append("idbaris",a);
    datakirim.append("tab","suratkeluar");
    datakirim.append("tabel",tabel);
    datakirim.append("tipe",tipe);
    let html = "";
    let ttbody = document.querySelector(".tabel_suratkeluar").getElementsByTagName("tbody")[0];
    ttbody.innerHTML= `<tr><td colspan="9"><img src="/img/barloading.gif"/> sedang proses Edit</td></tr>`;
    

        
     fetch(linktendik+"?action=simpanbarisketabidbaris",{
        method:"post",
        body:datakirim
    }).then(m => m.json())
    .then(r => {
       //console.log(r);
       alert("Berhasil dihapus");
       let res = r.result;
           let rec = r.data.filter(s=> s.status !== "hapus");
           //console.log(rec)
           if(res > 1){
               jsonsuratkeluar = rec;
              // console.log(res);
               // (let i = jsonmateri.length - 1; i >= 0; i--)
                for(i = rec.length-1; i>=0; i--){
                   
                        html += `<tr>
                        <td>${i+1}</td>
                        <td>${rec[i].nosurat}</td>
                        <td>${tanggalfull(rec[i].tglsurat)}</td>
                        <td>${rec[i].ditujukkankepada}</td>
                        <td>${rec[i].perihal}</td>
                        <td>${rec[i].indekssurat}</td>
    
                        <td>
                            <i class="fa fa-edit warnaeka w3-btn w3-margin-bottom" title="edit" onclick="editsuratkeluar(${rec[i].idbaris})"></i> 
                            <i class="fa fa-eye warnaeka w3-btn w3-margin-bottom" title="lihat surat" onclick="lihatsuratkeluar(${rec[i].idbaris})"></i> 
                            <i class="fa fa-trash warnaeka w3-btn w3-margin-bottom" title="hapus dari data surat masuk" onclick="hapussuratkeluar(${rec[i].idbaris})"></i> 
                        </td>
                        </tr>`;
                }
           }else{
            html = `<tr><td colspan="7" class="w3-red w3-center">Belum ada data</td></tr>`;
           }
        //    console.log(r);
        ttbody.innerHTML = html;
        clearInterval(stoploadingtopbar);
       
        divlod.style.width = "100%";
        setTimeout(() => {
            divlod.style.width = "1px"
            divlod.className += " w3-hide";
    
        }, 3000);
    })
    .catch(er => console.log(er))
}
const headersuratkeluar = () =>{
    let isioleh = document.querySelector("[data-idsk=oleh");
    isioleh.value = namauser;
    let isistatus = document.querySelector("[data-idsk=status]");
    isistatus.value ="diarsipkan";
    let setdata = document.querySelectorAll("[data-idsk]");
    let atsetdata ;
    let key = ["idbaris"];
    let val = [];
    let type = [2,5];
    let v;
    let nol=[]
    for(i = 0 ; i < setdata.length; i++){
        atsetdata = setdata[i].getAttribute("data-idsk");
        v = setdata[i].value;
        key.push(atsetdata);
        val.push(v);
        if(v ==""){
            nol.push(i)
        }
    };
     return key
}
let btn_suratkeluar = document.querySelector(".btn_suratkeluar");
btn_suratkeluar.addEventListener("click",async()=>{
    loadingtopbarin("loadingtopbar");
    
    let aks = document.querySelectorAll(".aksi_surat");
    aks.forEach(s => {
        if(s.className.indexOf("w3-hide")==-1){
            s.className += " w3-hide";
        }
    });
    
    
        let tab = "suratkeluar";
        let tabel = headersuratkeluar();
        let html = "";
        let ttbody = document.querySelector(".tabel_suratkeluar").getElementsByTagName("tbody")[0];
        
        let key = JSON.stringify(tabel);
        let datakirim = new FormData();
    
        datakirim.append("tab",tab)
        datakirim.append("key",key)
        await fetch(linktendik+"?action=getpostdatafromtab",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
           // console.log(r);
            
           let res = r.result;
           let rec = r.data.filter(s=> s.status !== "hapus");
           //console.log(rec)
           if(res > 1){
               jsonsuratkeluar = rec;
              // console.log(res);
               // (let i = jsonmateri.length - 1; i >= 0; i--)
                for(i = rec.length-1; i>=0; i--){
                    html += `<tr>
                    <td>${i+1}</td>
                    <td>${rec[i].nosurat}</td>
                    <td>${tanggalfull(rec[i].tglsurat)}</td>
                    <td>${rec[i].ditujukkankepada}</td>
                    <td>${rec[i].perihal}</td>
                    <td>${rec[i].indekssurat}</td>

                    <td>
                        <i class="fa fa-edit warnaeka w3-btn w3-margin-bottom" title="edit" onclick="editsuratkeluar(${rec[i].idbaris})"></i> 
                        <i class="fa fa-eye warnaeka w3-btn w3-margin-bottom" title="lihat surat" onclick="lihatsuratkeluar(${rec[i].idbaris})"></i> 
                        <i class="fa fa-trash warnaeka w3-btn w3-margin-bottom" title="hapus dari data surat masuk" onclick="hapussuratkeluar(${rec[i].idbaris})"></i> 
                    </td>
                    </tr>`;
                }
           }else{
            html = `<tr><td colspan="7" class="w3-red w3-center">Belum ada data</td></tr>`;
           }
        //    console.log(r);
        ttbody.innerHTML = html;
        }).catch(er => console.log(er))

        clearInterval(stoploadingtopbar);
        let divlod = document.querySelector(".loadingtopbar");
        divlod.style.width = "100%";
        setTimeout(() => {
            divlod.style.width = "1px"
            divlod.className += " w3-hide";
    
        }, 3000);
});

const atributgaleri = () =>{
    let setdata = document.querySelectorAll("[data-galeri]");
    let atsetdata ;
    let key = ["idbaris"];
    let val = [];
    let type = [3];
    let v;
    let nol=[]
    for(i = 0 ; i < setdata.length; i++){
        atsetdata = setdata[i].getAttribute("data-galeri");
        v = setdata[i].value;
        key.push(atsetdata);
        val.push(v);
        if(v ==""){
            nol.push(i)
        }
    };
    let ret = {}
    ret.key = key;
    ret.val = val;
    ret.nol = nol;
    return ret;
}

const galery = async() => {
    
    loadingtopbarin("loadingtopbar");
    let js = atributgaleri();
    let keyy = js.key;
    
    //////////////
    let tab = "galeri";
    
    let html = "";
    let ttbody = document.querySelector(".tempatgaleri");
    
    let key = JSON.stringify(keyy);
    let datakirim = new FormData();

    datakirim.append("tab",tab)
    datakirim.append("key",key)
    await fetch(linktendik+"?action=getpostdatafromtab",{
        method:"post",
        body:datakirim
    }).then(m => m.json())
    .then(r => {
        
        let res = r.result;
        let dtt = r.data;
        let dt = r.data.filter(s => s.status !== "hapus");
        jsongaleridihapus = dtt.filter(s=> s.status == "hapus");
        jsongaleri = dtt.filter(s=> s.status !== "hapus");
        objGaleri = jsongaleri.reverse();
        if(res > 1){
            document.querySelector(".paginationgalery").style.display = "block";
            ubahhalaman(1);
            // for(i = dt.length-1 ;  i>=0;i--){
            //     let d = dt[i];
            //     let hh = cekpreviewupload2(d.tipe,d.idfile);
            //     html +=`<div class="w3-col l2" style="height: 270px;">
            //     <div class="isigaleri">
            //         ${hh}
            //         <div class="overlaygaleri">
            //         Tgl ${tanggalfull(new Date(d.tglkejadian))}
            //             <div class="w3-text-white w3-margin">${d.keterangan}</div>
            //             <div class="w3-text-white w3-margin w3-tiny">Ditambahkan oleh: <br> ${d.oleh}</div>
            //             <div class="w3-white w3-margin w3-tiny">${d.tags}</div>
            //         <div class="textgaleri">
            //                 <button onclick="window.open('https://drive.google.com/file/d/${d.idfile}/view?usp=drivesdk','', 'width=720,height=600')">Detail</button>
            //                 <button onclick="hapusgaleri(${d.idbaris})">Hapus</button>
                            
            //             </div>
            //           </div>
            //     </div>
            // </div>`;
            // }
            // ttbody.innerHTML = html;
        }
        
        
        
        tampilinsublamangurukelas("galery");
    }).catch(er => {
        console.log(er);
        alert("Terjadi kesalahan. Silakan ulangi sesi Anda sesaat lagi.")
    })

    clearInterval(stoploadingtopbar);
    let divlod = document.querySelector(".loadingtopbar");
    divlod.style.width = "100%";
    setTimeout(() => {
        divlod.style.width = "1px"
        divlod.className += " w3-hide";

    }, 3000);

    //////////////
    


}
const cekpreviewupload = (tipe,idfile) =>{
    let res;
    let img = ["jpg","jpeg","JPG","JPEG","png","PNG","gif","GIF","webp"]
    let pdf = ["pdf","PDF"];
    let word = ["doc","docx","DOC","DOCX"];
    let ppt = ["ppt","pptx","pptm"]
    let excel = ["xls","csv","CSV","XLS","xlsx","xlsm","xlsb","XLSX","XLSM","XLSB"];
    let video = ["mp4","mkv","3gp","mpeg","flv"];
    let audio = ["mp3","wav"];
    let rar = ["rar","zip","7-zip"];
    if(img.indexOf(tipe)>-1){
        res = `<img src="/img/image-icon.png" title="Klik untuk melihat detail" onclick="window.open('https://drive.google.com/file/d/${idfile}/view?usp=drivesdk','', 'width=720,height=600')" class="w3-third tangan"/>`;
    }else if(pdf.indexOf(tipe)>-1){
        res = `<img src="/img/pdf-icon.png"  title="Klik untuk melihat detail" onclick="window.open('https://drive.google.com/file/d/${idfile}/view?usp=drivesdk','', 'width=720,height=600')" class="w3-third tangan"/>`;

    }else if(word.indexOf(tipe) >-1){
        res = `<img src="/img/word_icon.png" title="Klik untuk melihat detail" onclick="window.open('https://drive.google.com/file/d/${idfile}/view?usp=drivesdk','', 'width=720,height=600')" class="w3-third tangan"/>`;
        
    }else if(excel.indexOf(tipe) >-1){
        res = `<img src="/img/excel_icon.png" title="Klik untuk melihat detail" onclick="window.open('https://drive.google.com/file/d/${idfile}/view?usp=drivesdk','', 'width=720,height=600')" class="w3-third tangan"/>`;
        
    }else if(video.indexOf(tipe) >-1){
        res = `<img src="/img/video_icon.png" title="Klik untuk melihat detail" onclick="window.open('https://drive.google.com/file/d/${idfile}/view?usp=drivesdk','', 'width=720,height=600')" class="w3-third tangan"/>`;
        
    }else if(audio.indexOf(tipe) >-1){
        res = `<img src="/img/sound_icon.png" title="Klik untuk melihat detail" onclick="window.open('https://drive.google.com/file/d/${idfile}/view?usp=drivesdk','', 'width=720,height=600')" class="w3-third tangan"/>`;
        
    }else if(rar.indexOf(tipe) >-1){
        res = `<img src="/img/rar_icon.png" title="Klik untuk melihat detail" onclick="window.open('https://drive.google.com/file/d/${idfile}/view?usp=drivesdk','', 'width=720,height=600')" class="w3-third tangan"/>`;
        
    }else if(ppt.indexOf(tipe) >-1){
        res = `<img src="/img/ppt_icon.png" title="Klik untuk melihat detail" onclick="window.open('https://drive.google.com/file/d/${idfile}/view?usp=drivesdk','', 'width=720,height=600')" class="w3-third tangan"/>`;
        
    }else{
        res = `<img src="/img/file_icon.png" title="Klik untuk melihat detail" onclick="window.open('https://drive.google.com/file/d/${idfile}/view?usp=drivesdk','', 'width=720,height=600')" class="w3-third tangan"/>`;
        
        
    }
    return res

}
const cekpreviewupload2 = (tipe,idfile) =>{
    let res;
    let img = ["jpg","jpeg","JPG","JPEG","png","PNG","gif","GIF","webp"]
    let pdf = ["pdf","PDF"];
    let word = ["doc","docx","DOC","DOCX"];
    let ppt = ["ppt","pptx","pptm"]
    let excel = ["xls","csv","CSV","XLS","xlsx","xlsm","xlsb","XLSX","XLSM","XLSB"];
    let video = ["mp4","mkv","3gp","mpeg","flv"];
    let audio = ["mp3","wav"];
    let rar = ["rar","zip","7-zip"];
    if(img.indexOf(tipe)>-1){
        res = `<img src="https://drive.google.com/uc?export=view&id=${idfile}" />`;
    }else if(pdf.indexOf(tipe)>-1){
        res = `<iframe src="https://drive.google.com/uc?export=view&id=${idfile}"></iframe>`;
        
    }else if(word.indexOf(tipe) >-1){
        res = `<img src="/img/word_icon.png" />`;
        
    }else if(excel.indexOf(tipe) >-1){
        res = `<img src="/img/excel_icon.png" />`;
        
    }else if(video.indexOf(tipe) >-1){
        res = `<img src="/img/video_icon.png" />`;
        
    }else if(audio.indexOf(tipe) >-1){
        res = `<img src="/img/sound_icon.png" />`;
        
    }else if(rar.indexOf(tipe) >-1){
        res = `<img src="/img/rar_icon.png" />`;
        
    }else if(ppt.indexOf(tipe) >-1){
        res = `<img src="/img/ppt_icon.png" />`;
        
    }else{
        res = `<img src="/img/file_icon.png" />`;
        
        
    }
    return res

}
let pageini=1, jumlahperpage=12;
let objGaleri;
let divresultgaleri = document.querySelector(".tempatgaleri");
let tombl_next = document.querySelector(".tombl_next");
let tombl_prev = document.querySelector(".tombl_prev");
let tombl_last = document.querySelector(".tombl_last");
let tombl_first = document.querySelector(".tombl_first");
let spangal_pages = document.querySelector(".spangal_pages");
let objekfileunggahmultiple = {};
const inputfileunggahgalerimultiple = async() => {
    let prv = document.querySelector(".previewgaleri");
    let konf
    if(prv.innerHTML !==""){
        konf = confirm("File sebelumnya telah ditambahkan. Apakah ingin dihapus? Klik OK untuk MENGHAPUS, klik CANCEL untuk MENAMBAHKAN file lainnya (membiarkan file yang sudah ditambahkan).")
    }
    let elin = document.querySelector("[data-galeri=tipe]");
    let prvload = document.querySelector(".previewgaleriload");
    let idfile = document.querySelector("[data-galeri=idfile]");
    
    let namafolder = "000 GALERI";
    let arrtipe;
    let arrnamafile;
    let arridfile;
    let arrukuran;
    if(konf){
        prv.innerHTML = "";
        arrtipe = [];
        arrnamafile = [];
        arridfile = [];
        arrukuran = [];
    }else{
        prv.innerHTML +="";
        arrtipe =  (objekfileunggahmultiple.arrtipe === undefined)?[]:objekfileunggahmultiple.arrtipe ;
        arrnamafile =(objekfileunggahmultiple.arrnamafile===undefined)?[]:objekfileunggahmultiple.arrnamafile;
        arridfile = (objekfileunggahmultiple.arridfile===undefined)?[]:objekfileunggahmultiple.arridfile;
        arrukuran = [];
       
    }

    let item = "";
    item = document.getElementById("unggahmediagaleri").files;
    
    let files = Array.from(item).map(file => {
        let namafile = file.name;
        let ukuran = formatBytes(file.size,2);
        
        let tipefile = namafile.match(/(\.[^.]+)$/g)[0].replace(".","");
        
        // Define a new file reader
        let reader = new FileReader();

        // Create a new promise
        return new Promise(resolve => {
            
            // Resolve the promise after reading file
            reader.onload = () => {
                let obret = {}
                let src = reader.result;
                let dataa = src.replace(/^.*,/, '');
                let tipe = src.match(/^.*(?=;)/)[0];
                
                let tipenyaaja = tipe.split("/")[1]
                let realtipe;
                if(tipenyaaja.indexOf("vnd")>-1){
                    realtipe = tipefile;
                }else{
                    realtipe = tipenyaaja;
                }
                obret.data = dataa;
                obret.tipe = tipe;
                obret.ext = realtipe;
                obret.size = ukuran;
                obret.namafile = file.name;
                resolve(obret);
            }
            // Read the file as a text
            reader.readAsDataURL(file);

        });

    });

    // At this point you'll have an array of results
    let res = await Promise.all(files);
    for (i = 0 ; i < res.length ; i++){
        prvload.innerHTML = `<img src="/img/barloading.gif"/>`;
        let data = new FormData();
            let bin = res[i].data;
            let mmtp = res[i].tipe;
            let nfl= res[i].namafile
            let ext = res[i].ext;
                data.append("fileContent", bin);
                data.append("mimeType", mmtp);
                data.append("filename", nfl);
                data.append("kelas", "000 GALERI");
                
                await fetch(linktendik+"?action=uploadfiledulu", {
                    method: 'post',
                    body: data
                }).then(m => m.json())
                    .then(r => {
                        if (r.sukses == "Gagal") {
                            alert("gagal Unggah "+ nfl)
                            
                            
                        } else {
                            arridfile.push(r.idfile);
                            arrtipe.push(ext);
                            prv.innerHTML += cekpreviewupload(ext,r.idfile);
                            arrukuran.push(nfl);
                            elin.value = arrtipe.join(",");
                            idfile.value = arridfile.join(",")
                        
                        }
                        prvload.innerHTML = "";
                    })
                    .catch(er => {
                        console.log(er);
                        prvload.innerHTML = "";
                        
                        alert("Maaf, terjadi kesalahan. Silakan ulangi sesi Anda sesaat lagi.")
                    }) 
    }
    objekfileunggahmultiple.arrtipe = arrtipe;
    objekfileunggahmultiple.arrnamafile = arrnamafile;
    objekfileunggahmultiple.arridfile = arridfile;
}
const kirimmserver_mediagaleri = async()=>{
    //console.log(objekfileunggahmultiple);
    let divlod = document.querySelector(".loadingtopbar");
    
    
    let b = objekfileunggahmultiple;
    let d = atributgaleri();
    let idfiles = d.val[2].split(",");
    let tipes = d.val[3].split(",");
    let key = d.key;
    let nol = d.nol;
    if(nol.length !== 0){
        alert("Ada yang tidak diisi. Semua data harus terisi");
        return
    }
    divlod.className= divlod.className.replace(/w3-hide/g,"");
    loadingtopbarin("loadingtopbar");
    let eldiv = document.querySelector(".tambahmediagaleri");
    
    eldiv.className += " w3-hide";
    let v = [];
   
    let ttbody = document.querySelector(".tempatgaleri");
    let html = "";
    for(i = 0 ; i < idfiles.length ; i++){
        v = d.val;
        v.splice(2,2,idfiles[i],tipes[i])
       
        let type = [3];
        let tabel = JSON.stringify(v);
        let keyy = JSON.stringify(key);
        let tipe = JSON.stringify(type);
    
        let datakirim = new FormData();
        datakirim.append("key",keyy);
        datakirim.append("tab","galeri");
        datakirim.append("tabel",tabel);
        datakirim.append("tipe",tipe);
        await fetch(linktendik+"?action=simpanbarisketaburut",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
            let res = r.result;
            let dtt = r.data;
            let dt = r.data.filter(s => s.status !== "hapus");
            jsongaleridihapus = dtt.filter(s=> s.status == "hapus");
            jsongaleri = dtt.filter(s=> s.status !== "hapus");
            
            
           
        })
        .catch(er => console.log(er))

        
    }
    let datagaleri = document.querySelectorAll("[data-galeri]");
    for(i = 0 ; i < datagaleri.length; i++){
    
        datagaleri[i].value ="";
    }
    
    let ab = document.querySelector("[data-galeri=dihapusoleh]");
    ab.value = "tidak ada";
    let ac = document.querySelector("[data-galeri=alasandihapus]");
    ac.value = "tidak ada";

    

    objekfileunggahmultiple = {};

    clearInterval(stoploadingtopbar);
               
    divlod.style.width = "100%";
    setTimeout(() => {
        divlod.style.width = "1px"
        divlod.className += " w3-hide";
        galery();

    }, 3000);
   
}
const btn_tambahmedia = ()=>{
    let oleh = document.querySelector("[data-galeri=oleh");
    oleh.value = namauser;
    let status = document.querySelector("[data-galeri=status");
    status.value = "dipublikasikan";
    let eldiv = document.querySelector(".tambahmediagaleri");
    let prv = document.querySelector(".previewgaleri");
    prv.innerHTML ="";
    eldiv.className = eldiv.className.replace("w3-hide","");
}

const gantispasi = (el) =>{
    el.value = el.value.replace(/\s+/,"_");
}

const carimediagaleri = (el)=>{
    let tbody,html = "",html2 = "";
    let json = jsongaleri;;
    tbody =  document.querySelector(".tempatgaleri");
    
    
    if(json.length == 0){
       
        return;
    }else{
        let rec;
        if(el.value ==""){
            rec = json;
        }else{
            rec = json.filter(s => Object.entries(s).filter(([k,v]) =>{
                let vv = v.toString().indexOf(el.value)//el.value.indexOf(v);
                
                if(vv>-1){
                    return true
                }else{
                    return false
                }
            }).length!==0);
        }
        
        if(rec.length == 0){
            tbody.innerHTML = `<div class="w3-red w3-col l12 w3-center">Tidak ditemukan</div>`;
            document.querySelector(".paginationgalery").style.display = "none";
            
        }else{
            let dt = rec;
            objGaleri = dt.reverse();
            document.querySelector(".paginationgalery").style.display = "block";
            ubahhalaman(1);
            // for(i = dt.length-1 ;  i>=0;i--){
            //     // let d = dt[i];
            //     // let hh = cekpreviewupload2(d.tipe,d.idfile);
            //     // html +=`<div class="w3-col l2" style="height: 270px;">
            //     // <div class="isigaleri">
            //     //     ${hh}
            //     //     <div class="overlaygaleri">
            //     //     Tgl ${tanggalfull(new Date(d.tglkejadian))}
            //     //         <div class="w3-text-white w3-margin">${d.keterangan}</div>
            //     //         <div class="w3-text-white w3-margin w3-tiny">Ditambahkan oleh: <br> ${d.oleh}</div>
            //     //         <div class="w3-white w3-margin w3-tiny">${d.tags}</div>
            //     //     <div class="textgaleri">
            //     //             <button onclick="window.open('https://drive.google.com/file/d/${d.idfile}/view?usp=drivesdk','', 'width=720,height=600')">Detail</button>
            //     //             <button onclick="hapusgaleri(${d.idbaris})">Hapus</button>
            //     //     </div>
            //     // </div>
            //     // </div>
            //     // </div>`;
            // }
            
        
        
        
            //////
           
            }
            
    }
    
    //tbody.innerHTML = html;
};
const hapusgaleri = (id) =>{
    let d = jsongaleri.filter(s=> s.idbaris == id)[0];

    //console.log(d);
    let konf = confirm("Anda yakin ingin menghapusnya? Jika iya, silakan berikan alasannya.")
    if(konf){
        let pr = prompt("Berikan Alasan dihapus","Contoh: Salah upload");
        if(pr!== null){
            let dt = atributgaleri();
            let k = dt.key;
            let val = [];
            for(i = 0 ; i < k.length; i++){
                val.push(d[k[i]])
            }
            val.splice(-4,3,"hapus",namauser,pr);
            console.log(k);
            console.log(val);
            console.log(d);
            let type=[3];
            let tabel = JSON.stringify(val);
            let keyy = JSON.stringify(k);
            let tipe = JSON.stringify(type);
            let datakirim = new FormData();
        
            datakirim.append("key",keyy);
            datakirim.append("idbaris",id);
            datakirim.append("tab","galeri");
            datakirim.append("tabel",tabel);
            datakirim.append("tipe",tipe);
            let html = "";
            let ttbody = document.querySelector(".tempatgaleri");
            let divlod = document.querySelector(".loadingtopbar");
            loadingtopbarin("loadingtopbar"); 
            fetch(linktendik+"?action=simpanbarisketabidbaris",{
                method:"post",
                body:datakirim
            }).then(m => m.json())
            .then(r => {
               //console.log(r);
               alert("Berhasil dihapus");
               
               let res = r.result;
                let dtt = r.data;
                let dt = r.data.filter(s => s.status !== "hapus");
                jsongaleridihapus = dtt.filter(s=> s.status == "hapus");
                jsongaleri = dtt.filter(s=> s.status !== "hapus");
                
                if(res > 1){
                    objGaleri = jsongaleri.reverse();
                    document.querySelector(".paginationgalery").style.display = "block";
                    ubahhalaman(1);
                    // for(i = dt.length-1 ;  i>=0;i--){
                    //     let d = dt[i];
                    //     let hh = cekpreviewupload2(d.tipe,d.idfile);
                    //     html +=`<div class="w3-col l2" style="height: 270px;">
                    //     <div class="isigaleri">
                    //         ${hh}
                    //         <div class="overlaygaleri">
                    //             Tgl ${tanggalfull(new Date(d.tglkejadian))}
                    //             <div class="w3-text-white w3-margin">${d.keterangan}</div>
                    //             <div class="w3-text-white w3-margin w3-tiny">Ditambahkan oleh: <br> ${d.oleh}</div>
                    //             <div class="w3-white w3-margin w3-tiny">${d.tags}</div>
                    //         <div class="textgaleri">
                    //                 <button onclick="window.open('https://drive.google.com/file/d/${d.idfile}/view?usp=drivesdk','', 'width=720,height=600')">Detail</button>
                    //                 <button onclick="hapusgaleri(${d.idbaris})">Hapus</button>
                                    
                    //             </div>
                    //           </div>
                    //     </div>
                    // </div>`;
                    // }
                    //ttbody.innerHTML = html;
                }
                
                clearInterval(stoploadingtopbar);
               
                divlod.style.width = "100%";
                setTimeout(() => {
                    divlod.style.width = "1px"
                    divlod.className += " w3-hide";
            
                }, 3000);
            })
            .catch(er => console.log(er))
        }
    }
};

const btn_historimedia = () =>{
    let d = jsongaleridihapus;
    let ttbody = document.querySelector(".tempatgaleri");
    let html = `<button onclick="galery()" class="w3-btn warnaeka w3-border-bottom w3-border-black">Kembali</button>
    <table class="w3-table-all garis">
    <tr class="w3-pale-green">
        <th>No.</th>
        <th>Keterangan</th>
        <th>Diunggah oleh</th>
        <th>Dihapus Oleh</th>
        <th>Alasan dihapus</th>
        <th>link file</th>
    </tr>`
    for(i = 0 ; i < d.length; i++){
        html +=`<tr>
            <td>${i+1}</td>
            <td>${d[i].keterangan}</td>
            <td>${d[i].oleh}</td>
            <td>${d[i].dihapusoleh}</td>
            <td>${d[i].alasandihapus}</td>
            
            <td>
                <button onclick="window.open('https://drive.google.com/file/d/${d[i].idfile}/view?usp=drivesdk','', 'width=720,height=600')">File</button>
            </td>

        </tr>`;
    }
    html +=`</table>`;
    if(d.length ==0){
        alert("Tidak ada file yang dihapus")
    }else{
        ttbody.innerHTML = html;
    }
}



function ubahhalaman(hal){
    //validasi jumlah halaman dulu
    //jika hal <1, misalnya nol, maka balikin lagi hal = 1
    if(hal < 1){
        hal = 1
    }
    //jika halaman melebihi allhalamangaleri, maka  balikin ke halaman allhalaman galeri
    if(hal > allhalamangaleri()){
        hal = allhalamangaleri()
    }
    // let loopStart = (hal-1)*jumlahperpage;
    // let loopEnd = ((hal*jumlahperpage)<objGaleri.length?(hal*jumlahperpage)-1:objGaleri.length-1)
   let halakhir = allhalamangaleri();
    let loopStart = ((halakhir-hal)*jumlahperpage < objGaleri.length?(halakhir-hal)*jumlahperpage:0);
   let ceil = Math.ceil(objGaleri.length / (hal * jumlahperpage));
    let loopEnd = ((ceil*jumlahperpage)<objGaleri.length?(ceil*jumlahperpage)-1:objGaleri.length-1);

    //console.log(loopStart)
    //console.log(loopEnd)
    let html = "";
    for(var i = (hal-1) * jumlahperpage; i < (hal * jumlahperpage) && i < objGaleri.length; i++){        
        let d = objGaleri[i];
        let hh = cekpreviewupload2(d.tipe,d.idfile);
        html +=`<div class="w3-col l2" style="max-height: 270px;">
            <div class="isigaleri">
                ${hh}
                <div class="overlaygaleri">
                Tgl ${tanggalfull(new Date(d.tglkejadian))}
                    <div class="w3-text-white w3-margin">${d.keterangan}</div>
                    <div class="w3-text-white w3-margin w3-tiny">Ditambahkan oleh: <br> ${d.oleh}</div>
                    <div class="w3-white w3-margin w3-tiny">${d.tags}</div>
                <div class="textgaleri">
                        <button onclick="window.open('https://drive.google.com/file/d/${d.idfile}/view?usp=drivesdk','', 'width=720,height=600')">Detail</button>
                        <button onclick="hapusgaleri(${d.idbaris})">Hapus</button>
                    </div>
                </div>
            </div>
            </div>`;
        }
    divresultgaleri.innerHTML = html;
    
    //buat untuk span
    
    spangal_pages.innerHTML = "Halaman " + hal + " dari " + allhalamangaleri();

    if (hal == 1) {
        tombl_prev.style.display = "none";
        tombl_first.style.display = "none";
    } else {
        tombl_first.style.display = "inline-block"
        tombl_prev.style.display = "inline-block";
    }

    if (hal == allhalamangaleri()) {
        tombl_next.style.display = "none";
        tombl_last.style.display = "none";
     } else {
        tombl_last.style.display = "inline-block";
        tombl_next.style.display = "inline-block";
    }


    //forloop dari pagination:
    // (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++)
    // buatkan format isiannya:
    //ini dari format asal:
    // for(i = dt.length-1 ;  i>=0;i--){
    //     let d = dt[i];
    //     let hh = cekpreviewupload2(d.tipe,d.idfile);
    //     html +=`<div class="w3-col l2" style="max-height: 270px;">
    //     <div class="isigaleri">
    //         ${hh}
    //         <div class="overlaygaleri">
    //         Tgl ${tanggalfull(new Date(d.tglkejadian))}
    //             <div class="w3-text-white w3-margin">${d.keterangan}</div>
    //             <div class="w3-text-white w3-margin w3-tiny">Ditambahkan oleh: <br> ${d.oleh}</div>
    //             <div class="w3-white w3-margin w3-tiny">${d.tags}</div>
    //         <div class="textgaleri">
    //                 <button onclick="window.open('https://drive.google.com/file/d/${d.idfile}/view?usp=drivesdk','', 'width=720,height=600')">Detail</button>
    //                 <button onclick="hapusgaleri(${d.idbaris})">Hapus</button>
    //             </div>
    //         </div>
    //     </div>
    // </div>`;
    // }
    //selesai format asal



}
function allhalamangaleri(){
    return Math.ceil(objGaleri.length / jumlahperpage);
}
function halamanberikutnya(){
    
    if(pageini < allhalamangaleri()){
        pageini++
        ubahhalaman(pageini)
    }
   
    
}
function halamansebelumnya(){
    if(pageini > 1){
        pageini--
      
        ubahhalaman(pageini)
    }
}
function halamanawal(){
    pageini = 1;
    ubahhalaman(1);
}
function halamanakhir(){
    let h = allhalamangaleri();
    pageini = h;
    ubahhalaman(pageini);
}
async function tabA(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("isiadm");//("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("btnadm");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(/\sw3-green/g, "");
    }
    // document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " w3-green";
    if(evt.currentTarget.innerHTML =="SPPD-ku"){
        await rekapsppdku();
    }else if(evt.currentTarget.innerHTML == "Data Rapat Sekolah"){
        await cektagdbrapat();
        rekapRapatSekolah();
    }else if(evt.currentTarget.innerHTML == "Notula Rapat"){
        await cektagdbrapat();
        rekapRapatSekolahuntukku();
    }
    document.getElementById(cityName).style.display = "block";
}

const printsuratLandscape = (c,portr)=>{
    let dom = document.querySelector("."+c);
    let indom = dom.innerHTML;//.textContent;
    
    let noSpace =indom.replace(/(\r\n|\n|\r)/gm, "").replace(/\s\s/g,"");
    
    
    var root = window.location.origin;
    
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument || el.contentWindow.document;;
    let head = doc.head;
    let body = doc.body;
    //
    // var isi = el.contentDocument || editore.contentWindow.document;;
    // var headnya = isi.head;
    while (head.hasChildNodes()) {
        head.removeChild(head.firstChild);
    }

    //
   
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = "<title>E-DURASA ADMINISTRASI</title>";
    head.innerHTML += '<link rel="stylesheet" href="https://edurasa.com/css/w3.css">';

    //head.innerHTML += `<link rel="stylesheet" href="https://edurasa.com/css/w3.css">`;
    head.innerHTML += '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">';

    head.innerHTML += '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lobster">';
    head.innerHTML += '<link  rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">'

    head.innerHTML +='<link rel="stylesheet" href="https://edurasa.com/css/stylegurukelas.css">'
    //head.innerHTML += `<style type="text/css"> .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000} .garis td,.garis th,.garis tr{border:0.5px solid rgb(119, 116, 116)} .garis th{border:1px solid #000;text-align:center;vertical-align:middle} </style>`;

    if(portr){
        head.innerHTML += `<style type="text/css" media="print">
        @media print {
            html,body{margin:0;padding:0}
            
             @page {
                size: A4 portrait;
               
                
                }
        }
        </style>`;
    }else{
        head.innerHTML += `<style type="text/css" media="print">
        @media print {
            html,body{margin:0;padding:0}
            
             @page {
                size: A4 landscape;
                
                
                }
        }
        </style>`;
    }
    
    

    body.innerHTML = noSpace;
    // body.innerHTML += `<div class="w3-row w3-margin-top"><div class="w3-col l6 s6 w3-center">Mengetahui,<br>Kepala ${idNamaSekolah}<br><br><br><br><u><b>${idNamaKepsek}</b></u><br>NIP. ${idNipKepsek}</div><div class="w3-col l6 s6 w3-center">Depok, ${tanggalfull(new Date())}<br>${idJenisGuru} ${idgurumapelmapel}<br><br><br><br><u><b>${namauser}</b></u><br>NIP. ${idNipGuruKelas}</div>`;

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();
}

const settingsppd_hidden = document.querySelectorAll(".settingsppd_hidden");
let tagdbsppd
const sppdcreate_btn_sppdbaru = document.querySelector(".sppdcreate_btn_sppdbaru");
sppdcreate_btn_sppdbaru.addEventListener("click", async()=>{
    settingsppd_hidden.forEach(el => {
        if(el.className.indexOf("sppdbaru")>-1 && el.className.indexOf("w3-hide")>-1){
            el.classList.remove("w3-hide")
            
        }else{
            if(el.className.indexOf("w3-hide")==-1){
                el.classList.add("w3-hide");
            }
        }
    })
    //perlu data no.surat keluar
    if(jsonsuratkeluar.length == 0){
        let tab = "suratkeluar";
        let tabel = headersuratkeluar();
        
        let key = JSON.stringify(tabel);
        let datakirim = new FormData();
    
        datakirim.append("tab",tab)
        datakirim.append("key",key)
        await fetch(linktendik+"?action=getpostdatafromtab",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
           // console.log(r);
            
            let res = r.result;
            let rec = r.data.filter(s=> s.status !== "hapus");
           //console.log(rec)
            if(res > 1){
                jsonsuratkeluar = rec;
            }
        }).catch(er => console.log(er))
    }
    //tapi kalo tetap nol, maka kasih tau user!
    let nosuratterakhir = document.querySelector("#createsppd_dbsuratkeluar")
    if(jsonsuratkeluar.length !== 0){
        nosuratterakhir.value = jsonsuratkeluar[jsonsuratkeluar.length-1].nosurat;
    }else{
        nosuratterakhir.value ="";
    }
    // buat isi options
    let el_options = document.querySelector("#createsppd_pegawaiyangdiperintah")
    let html = `<option value= "default">PILIH PTK YANG DIPERINTAH</option>`
    for(i=0; i < dataapiguru.length ; i++){
        html +=`<option value="${dataapiguru[i].id}">${dataapiguru[i].guru_namalengkap}</option>`
    }
    el_options.innerHTML = html;
    document.querySelector("#createsppd_nosuratSPPD").value = "421.2/";

})
const sppdcreate_btn_sppdtabel = document.querySelector(".sppdcreate_btn_sppdtabel");
sppdcreate_btn_sppdtabel.addEventListener("click", async()=>{
    // alert("Nantikan setelah selesai dan berhasil membuat db SPPD");
    await cektagdbsppd()
    
    //console.log(tagdbsppd);
    settingsppd_hidden.forEach(el => {
        if(el.className.indexOf("sppdtabel")>-1 && el.className.indexOf("w3-hide")>-1){
            el.classList.remove("w3-hide")
            
        }else{
            if(el.className.indexOf("w3-hide")==-1){
                el.classList.add("w3-hide");
            }
        }
    });
    let tabel = document.querySelector(".tabeldbsppd");
    let tbody = tabel.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    let html = "";
    
    for(i = (tagdbsppd.length - 1) ; i >=0 ; i--){
        //i>=0;i--
        let data = tagdbsppd[i];
        let id_guru = data.ptk_diperintah;
        let apiguru= dataapiguru.filter(s => s.id == id_guru)[0];
        let btnSuratKeluar = data.arsip_nosppd==""?`<button class="w3-button w3-green" onclick="nosppdkesuratkeluar(${data.idbaris})">Arsipkan!</button>`:"Sudah diarsipkan";
        let tomboluploadsppd = data.versiupload == ""?`<button class="w3-btn w3-blue w3-tiny" onclick="uploadscan_sppd('${data.idbaris}')"><i class="fa fa-upload"></i></button>`:`<button class="w3-btn w3-green" onclick="window.open('https://drive.google.com/file/d/${data.versiupload}/view?usp=drivesdk','', 'width=720,height=600')"><i class="fa fa-eye"></i></button>`;
        html +=`<tr>
        <td>${(i+1)}</td>
        <td>${apiguru.guru_namalengkap}</td>
        <td>${data.ptk_maksudsppd}</td>
        <td>${data.ptk_tempatsppd}</td>
        <td>${tanggalfull(new Date(data.ptk_starttgl))}</td>
        <td>${data.ptk_durasisppd} hari</td>
        <td>${data.ptk_nosppd}</td>
        <td>${btnSuratKeluar}</td>
        <td>${data.resume==""?"Kosong":"Sudah Terisi"}</td>
        <td>${data.resume==""?"":`<button class="w3-btn w3-tiny w3-green" onclick="preview_resumesppd('${data.idbaris}')" title="Cetak Resume"><i class="fa fa-print"></i></button>`}</td>
        <td>${tomboluploadsppd}</td>
        <td><button class="w3-btn w3-tiny w3-blue" onclick="preview_sppd('${data.idbaris}')" title="preview/print"><i class="fa fa-eye"></i></button> <button class="w3-btn w3-tiny w3-sand" onclick="edit_sppd('${data.idbaris}')"  title="edit"><i class="fa fa-edit"></i></button></td>
        </tr>`;

    }
    tbody.innerHTML = html;

});
let teksdefaultinfosppd = "Anda berhak membuatkan SPPD untuk diri Anda dan PTK lain. Fitur ini digunakan untuk membuatkan SPPD yang ditujukan kepada PTK. Jika Anda membuatkan SPPD untuk PTK lain, maka akan otomatis SPPD akan diinformasikan di menu SPPD-ku di masing-masing laman Edurasa PTK (edurasa guru, edurasa GMP, edurasa staff, dan edurasa Kepala sekolah).";
const selectsppd_pilihptk = async ()=>{
    let elemen = document.querySelector("#createsppd_pegawaiyangdiperintah");
    let ops = elemen.options;
    let indek = ops.selectedIndex;
    let validguru = ops[indek].value;
    let teksGuru = ops[indek].text;
    
    let db_ptk = dataapiguru.filter(s => s.id == validguru)[0]
    let daftarsatu = await objekArraydatatendik();
    let db_df = daftarsatu.filter(s => s.idguru == validguru)[0]
    
    let input_nippegawai = document.querySelector("#createsppd_nippegawai");
    input_nippegawai.value = db_ptk.guru_nip;
    let input_golruang = document.querySelector("#createsppd_golonganpegawai");
    input_golruang.value = db_df.golonganruang==""?"":"Golongan "+ db_df.golonganruang;
    let input_jabatan = document.querySelector("#createsppd_jabatanpegawai");
    input_jabatan.value = db_df.jabatan;
    
}

const serverkirimsppd = async() =>{
    let info = document.querySelector(".infoserver_sppd");
    info.innerHTML = `<img src="/img/barloading.gif"> sedang proses pengiriman....`;
    document.querySelector(".sppdbaru").classList.add("w3-hide")
    let dataa = document.querySelectorAll("[data-keyCreatesppd]");
    let enip = document.getElementById("createsppd_nippegawai");
    let data = new FormData();
    let key = ["idbaris"];
    let val = []
    for(i=0 ; i < dataa.length ; i++){
        let dd = dataa[i].nodeName;
        let v = dataa[i].value;
        let k = dataa[i].getAttribute("data-keyCreatesppd")
        //console.log(v);
        key.push(k);
        val.push(v);
        
        

        if(dd == "SELECT"){
            dataa[i].selectedIndex = 0;
        }else{
            dataa[i].value = "";
        }
    }
    key.push("resume");
    val.push("");
    key.push("arsip_nosppd")
    val.push("");
    key.push("versiupload");
    val.push("");

    data.append("tab","sppd");
    data.append("tabel",JSON.stringify(val))
    data.append("key",JSON.stringify(key))
    enip.value = "";
    // for (var pair of data.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }
    let link =  jlo.url_dataabsen+"?action=simpanbarisketaburut";
    await fetch(link,{method:"post",body:data}).then(m => m.json())
    .then(r=> {
        //console.log(r);
        tagdbsppd = r.data;
        info.innerHTML = "Berhasil tersimpan...!"
        setTimeout(() => {
            
            info.innerHTML = teksdefaultinfosppd
    
        }, 3000);
    })
    .catch(er =>console.log(er))
    
}

const objekArraydatatendik = async() =>{
    if(arraydatatendik.length == 0){
        await fetch(linktendik + "?action=tabeltendik")
        .then(m => m.json()).then(k => {
            //console.log(k);
            arraydatatendik = k;
        }).catch(er => console.log(er))
    }

    let k = arraydatatendik[0];
    let arr = [];
    for(i = 1 ; i < arraydatatendik.length; i++){
        let m = arraydatatendik[i];
        let ob = {}
        for(j = 0 ; j < m.length; j++){
            ob[k[j]]=m[j]
        }
        arr.push(ob);
        
    }
    
    return arr
}

const cektagdbsppd = async () =>{
    let tab = "sppd";
        let tabel = keyheader_sppd();
        
        let key = JSON.stringify(tabel);
        let datakirim = new FormData();
    
        datakirim.append("tab",tab)
        datakirim.append("key",key)
        await fetch(jlo.url_dataabsen+"?action=getpostdatafromtab",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
           // console.log(r);
            
            let res = r.result;
            //console.log(r)
            if(res == 1){
                tagdbsppd = []
            }else{
                tagdbsppd = r.data;

            }
        }).catch(er=> console.log(er))
}
const keyheader_sppd = () =>{
    let dataa = document.querySelectorAll("[data-keyCreatesppd]");
    
    let key = ["idbaris"];
    let val = []
    for(i=0 ; i < dataa.length ; i++){
        let k = dataa[i].getAttribute("data-keyCreatesppd");
        key.push(k);
    }
    key.push("resume");
    key.push("arsip_nosppd");
    key.push("versiupload");
    
    return key
}
const nosppdkesuratkeluar = (brs)=>{
    console.log(brs);
    let objek = Object.assign({},tagdbsppd.filter(s => s.idbaris == brs)[0]);
    let fileInput = document.querySelector("#uploadsppd");
    fileInput.click();
    fileInput.onchange = function() {
        let files = fileInput.files;
        if (!files || !files.length) {
        //          console.log('No files selected');
        alert("Tidak ada file terpilih!")
        return;
        }
            let reader = new FileReader();
            var item = files[0];
            let namafile = item.name;
            
            
            //let obKey = Object.keys(key);
            let v = [];
            
            loadingtopbarin("loadingtopbar");
            reader.readAsDataURL(item);
            reader.onload = async function (e) {
                let key = headersuratkeluar()
                
                
                // kita upload gambar dulu ke Drive
                let src = e.target.result;
                let dataa = src.replace(/^.*,/, '');
                let tipe = src.match(/^.*(?=;)/)[0]; 
                
                let tipenyaaja = tipe.split("/")[1]
                let realtipe;
                if(tipenyaaja.indexOf("vnd")>-1){
                    realtipe = tipefile;
                }else{
                    realtipe = tipenyaaja;
                }
                let fileTIPE =realtipe;
                
                let dataupload = new FormData();
                let fileresult
                dataupload.append("fileContent", dataa);
                dataupload.append("mimeType", tipe);
                dataupload.append("filename", namafile);
                dataupload.append("kelas", "000 Surat Keluar");
                
                await fetch(linktendik+"?action=uploadfiledulu", {
                    method: 'post',
                    body: dataupload
                }).then(m => m.json())
                    .then(r => {
                        console.log("result uploadfile dulu")
                        console.log(r)
                        if (r.sukses == "Sukses") {
                            let link = r.idfile
                            fileresult = link
                            
                        } else {
                            // el_label.innerHTML = `<i class="fa fa-upload warnaeka  w3-round-large w3-padding w3-border-black w3-border-bottom w3-center"> Unggah File</i>`;
                            // elinput.value = r.idfile;
                        }
                        // dockeyboard.execCommand("insertImage",false, linkgambar);
                        // let imgs = dockeyboard.querySelectorAll("img");
                        // imgs.forEach(item => {
                        //     item.style.maxWidth ="500px";
                        // })
                    })
                    .catch(er => {
                        console.log(er);
                        
                        // alert("Maaf, terjadi kesalahan. Silakan ulangi sesi Anda sesaat lagi.")
                        // el_label.innerHTML = `<i class="fa fa-upload warnaeka  w3-round-large w3-padding w3-border-black w3-border-bottom w3-center"> Unggah File</i>`;
                    })
                
                    //isi untuk sppd
                let type = [2,5];
                let nosurat = objek.ptk_nosppd;
                let kegiatan = objek.ptk_maksudsppd;
                let tanggal = objek.ptk_starttgl;
                let dptk = "Panitia " + kegiatan + " di " + objek.ptk_tempatsppd;
                let perihalsppd = 'Perihal_sppd_' + kegiatan;
                let objekvalue = [nosurat, tanggal, perihalsppd, "fitur SPPD", dptk, fileresult, "diarsipkan",namauser];//tanpa idbaris
                //idbaris	nosurat	tglsurat	perihal	indekssurat	ditujukkankepada	idfile	status	oleh
                let tabel = JSON.stringify(objekvalue);
                let keyy = JSON.stringify(key);
                let tipee = JSON.stringify(type);
                
                let tagNosurat = perihalsppd +"_result="
                let datakirim = new FormData();
                datakirim.append("key",keyy);
                datakirim.append("tab","suratkeluar");
                datakirim.append("tabel",tabel);
                datakirim.append("tipe",tipee);
                
                await fetch(linktendik+"?action=simpanbarisketaburut",{
                    method:"post",
                    body:datakirim
                }).then(m => m.json())
                .then(r => {
                    let res = r.result;
                    console.log(r);
                    console.log(res);
                    tagNosurat += res;
                    
                })
                .catch(er => console.log(er))

                 //update untuk key:
                objek.arsip_nosppd = tagNosurat;
                let keySppd = Object.keys(objek);
                let valSppd = Object.values(objek);
                let stfyKey = JSON.stringify(keySppd);
                let stfyVal = JSON.stringify(valSppd);
                let kirimsppd = new FormData();
                kirimsppd.append("idbaris",brs);
                kirimsppd.append("tab","sppd");
                kirimsppd.append("key",stfyKey)
                kirimsppd.append("tabel",stfyVal);
                await fetch(jlo.url_dataabsen+"?action=simpanbarisketabidbaris",{
                    method:"post",body:kirimsppd
                    }).then(m => m.json()).then(r=>{
                        let dbSppd = r.data;
                        tagdbsppd = dbSppd;
                        let tabel = document.querySelector(".tabeldbsppd");
                        let tbody = tabel.getElementsByTagName("tbody")[0];
                        tbody.innerHTML = "";
                        let html = "";
                        for(i = (tagdbsppd.length - 1) ; i >=0 ; i--){
                            let data = tagdbsppd[i];
                            let id_guru = data.ptk_diperintah;
                            let apiguru= dataapiguru.filter(s => s.id == id_guru)[0];
                            let btnSuratKeluar = data.arsip_nosppd==""?`<button class="w3-button w3-green" onclick="nosppdkesuratkeluar(${data.idbaris})">Arsipkan!</button>`:"Sudah diarsipkan";
                            let tomboluploadsppd = data.versiupload == ""?`<button class="w3-btn w3-blue w3-tiny" onclick="uploadscan_sppd('${data.idbaris}')"><i class="fa fa-upload"></i></button>`:`<button class="w3-btn w3-green" onclick="window.open('https://drive.google.com/file/d/${data.versiupload}/view?usp=drivesdk','', 'width=720,height=600')"><i class="fa fa-eye"></i></button>`;
                            html +=`<tr>
                                    <td>${(i+1)}</td>
                                    <td>${apiguru.guru_namalengkap}</td>
                                    <td>${data.ptk_maksudsppd}</td>
                                    <td>${data.ptk_tempatsppd}</td>
                                    <td>${tanggalfull(new Date(data.ptk_starttgl))}</td>
                                    <td>${data.ptk_durasisppd} hari</td>
                                    <td>${data.ptk_nosppd}</td>
                                    <td>${btnSuratKeluar}</td>
                                    <td>${data.resume==""?"Kosong":"Sudah Terisi"}</td>
                                    <td>${data.resume==""?"":`<button class="w3-btn w3-tiny w3-green" onclick="preview_resumesppd('${data.idbaris}')" title="Cetak Resume"><i class="fa fa-print"></i></button>`}</td>
                                    <td>${tomboluploadsppd}</td>
                                    <td><button class="w3-btn w3-tiny w3-blue" onclick="preview_sppd('${data.idbaris}')" title="preview/print"><i class="fa fa-eye"></i></button> <button class="w3-btn w3-tiny w3-sand" onclick="edit_sppd('${data.idbaris}')"  title="edit"><i class="fa fa-edit"></i></button></td>
                                    </tr>`;
                        }
                        tbody.innerHTML = html;
                
                    }).catch(er => console.log(er))
                }
    };
    
}
const preview_sppd= (brs) =>{
    let data = tagdbsppd.filter(s=> s.idbaris == brs)[0];
    let vidguru = data.ptk_diperintah;
    let dbUser = dataapiguru.filter(s => s.id == vidguru)[0];
    let dmodal = document.getElementById("modal_sppd");
    dmodal.style.display = "block";
    let namaPTK = dbUser.guru_namalengkap;
    let nipPTK = dbUser.guru_nip==""?"":"NIP. "+dbUser.guru_nip;
    let pangkatPTK = data.ptk_golongan;
    let jabatanPTK = data.ptk_jabatan;
    let maksudsppd = data.ptk_maksudsppd;
    let tempatsppd = data.ptk_tempatsppd;
    let tglstartsppd = tanggalfull(new Date(data.ptk_starttgl));
    let tglstartsppdfull = Tanggaldenganhari(new Date(data.ptk_starttgl));
        let durasi = data.ptk_durasisppd;
        let d0 = new Date(data.ptk_starttgl);
        let m0 = d0.getMonth();
        let y0 = d0.getFullYear();
        let dt0 = d0.getDate();
        let dt1 = ((durasi-1) + dt0)
        let endDt = new Date(y0,m0,dt1);
    let tglendsppd = tanggalfull(endDt);
    let no_sppd = data.ptk_nosppd;

    let sppd_ptk = document.querySelectorAll(".sppdcreate_input_pendidik");//m
    let sppd_nip = document.querySelectorAll(".sppdcreate_input_nippendidik");//m
    let sppd_pangkat = document.querySelector(".spddcreate_input_pangkatpendidik");//t
    let sppd_jabatan = document.querySelectorAll(".spddcreate_input_jabatanpendidik");//m
    let sppd_maksud = document.querySelectorAll(".sppdcreate_maksudperjalanandinas");//m
    let sppd_tempat = document.querySelectorAll(".sppdcreate_tempattujuan");//m
    let sppd_durasi = document.querySelector(".sppddcreate_input_lamaperjalanan")
    let sppd_start = document.querySelectorAll(".sppddcreate_input_starttanggal");
    let sppd_end = document.querySelectorAll(".sppddcreate_input_endtanggal");
    let sppd_namasekolah = document.querySelectorAll(".sppdcreate_ttdnamasekolah");
    let sppd_namakepsek = document.querySelectorAll(".sppdcreate_namakepsek");
    let sppd_nipksek = document.querySelectorAll(".spddcreate_nipksek");
    let nosppd = document.querySelectorAll(".sppdcreat_input_nosurat");

    sppd_ptk.forEach(el => el.innerHTML = namaPTK);
    sppd_nip.forEach(el => el.innerHTML = nipPTK);
    sppd_pangkat.innerHTML = pangkatPTK;
    sppd_jabatan.forEach(el => el.innerHTML = jabatanPTK);
    sppd_maksud.forEach(el=> el.innerHTML = maksudsppd);
    sppd_tempat.forEach(el => el.innerHTML = tempatsppd);
    sppd_durasi.innerHTML = durasi + " hari.";
    sppd_start.forEach((el,i )=> {
        if(i == (sppd_start.length-2)||i == (sppd_start.length-4)){
            el.innerHTML = tglstartsppdfull;
        }else{
            el.innerHTML = tglstartsppd;
        }
    });
    sppd_end.forEach(el=>el.innerHTML = tglendsppd);
    sppd_namasekolah.forEach(el => el.innerHTML = idNamaSekolah);
    sppd_namakepsek.forEach(el => el.innerHTML = idNamaKepsek);
    sppd_nipksek.forEach(el => el.innerHTML = "NIP. "+ idNipKepsek);
    nosppd.forEach((el,i) => i == 0? el.innerHTML = no_sppd.replace("421.2",""):el.innerHTML = no_sppd);

}
const Tanggaldenganhari = (dt) =>{
    let tgl = new Date(dt);
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

/// INI UNTUK SPPD PTK YANG AKAN/BELUM MENGISI RESUME PERJALANAN DAPAT DIGUNAKAN UNTUK GURU.HTML MAUPUN YANG LAINNYA
const rekapsppdku = async() =>{
    let id_guru = idguru;
    await cektagdbsppd()
    let dataku = tagdbsppd.filter(s=> s.ptk_diperintah == id_guru);
    let datahariini = dataku.filter(s => StringTanggal(new Date(s.ptk_starttgl)) == StringTanggal(new Date()));
    // console.log(dataku);
    // console.log(datahariini);
    let html = "";
    let tabel = document.querySelector(".tabelsppdku");
    let tbody = tabel.getElementsByTagName("tbody")[0];
    
    
    if(dataku.length == 0){
        tbody.innerHTML = `<tr><td colspan="8">Maaf, Anda kurang jalan-jalan. Eh, belum pernah diberi tugas perjalanan dinas. Healing sendiri aja ... 🤪</td></tr>`;
        return;
    }
    for(i = (dataku.length - 1); i >= 0 ; i--){
        let brs = dataku[i]["idbaris"];
        html +=`<tr>
        <td>${(i+1)}</td>
        <td>${dataku[i]["ptk_maksudsppd"]}</td>
        <td>${dataku[i]["ptk_tempatsppd"]}</td>
        <td>${Tanggaldenganhari(dataku[i]["ptk_starttgl"])}</td>
        <td class="w3-center"><button class="tangan" onclick="preview_sppd('${brs}')"><i class="fa fa-print"></i></button></td>
        <td>${dataku[i]["resume"]==""?"Resume belum diisi":"Resume Sudah Diisi"}</td>
        <td class="w3-center">${dataku[i]["resume"]==""?`<button class="tangan" onclick="isiresumebaris('${brs}')" title="Isi resume"><i class="fa fa-pencil"></i></button>`:`<button onclick="isiresumebaris('${brs}')" title="Editresume" class="tangan"><i class="fa fa-edit"></i></button>`}</td>
        <td class="w3-center"><button class="tangan" onclick="uploadscan_sppd('${brs}')"><i class="fa fa-upload"></i></button></td>
        </tr>`;
    }
    tbody.innerHTML = html;

}
const preview_resumesppd = (brs)=>{
    //console.log(brs);
    let data = tagdbsppd.filter(s => s.idbaris == brs)[0];// bentuknya objek;
    
    let vidguru = data.ptk_diperintah;
    let dbUser = dataapiguru.filter(s => s.id == vidguru)[0];

    let tgl = tanggalfull(new Date(data.ptk_starttgl));
    let tgl1 = Tanggaldenganhari(new Date(data.ptk_starttgl));
    let ptk = dbUser.guru_namalengkap;
    let tempat = data.ptk_tempatsppd;
    let maksud = data.ptk_maksudsppd;
    let template = document.querySelector("#sppd_previewresume");
    template.style.display = "block";
    let isiteks = document.querySelector(".isitekselemenini");
    if(isiteks.className.indexOf("w3-hide")==-1){
        isiteks.classList.add("w3-hide")
    }
    let prevsppd_ptk = document.querySelector(".prevsppd_ptk");
    let prevsppd_starttanggal = document.querySelectorAll(".prevsppd_starttanggal");
    let prevsppd_tempattujuan = document.querySelector(".prevsppd_tempattujuan");
    let prevsppd_maksudperjalanandinas = document.querySelector(".prevsppd_maksudperjalanandinas");
    let prevsppd_isiresume = document.querySelector(".prevsppd_isiresume");
    prevsppd_isiresume.innerHTML = data.resume;
    
    prevsppd_ptk.innerHTML = ptk;
    prevsppd_starttanggal.forEach((el, i)=> i == 0? el.innerHTML = tgl: el.innerHTML = tgl1);
    prevsppd_tempattujuan.innerHTML = tempat;
    prevsppd_maksudperjalanandinas.innerHTML = maksud;
}
const isiresumebaris = (brs) =>{
   
    let data = tagdbsppd.filter(s => s.idbaris == brs)[0];// bentuknya objek;
    keyboardtooltip(data,"resume");
    let vidguru = data.ptk_diperintah;
    let dbUser = dataapiguru.filter(s => s.id == vidguru)[0];

    let tgl = tanggalfull(new Date(data.ptk_starttgl));
    let tgl1 = Tanggaldenganhari(new Date(data.ptk_starttgl));
    let ptk = dbUser.guru_namalengkap;
    let tempat = data.ptk_tempatsppd;
    let maksud = data.ptk_maksudsppd;

    let template = document.querySelector("#sppd_previewresume");
    template.style.display = "block";
    let isiteks = document.querySelector(".isitekselemenini");
    if(isiteks.className.indexOf("w3-hide")>-1){
        isiteks.classList.remove("w3-hide")
    }
    isiteks.setAttribute("onclick",`isitekselemenini("printpreviewresume","prevsppd_isiresume", "atas", "${brs}")`);

    let prevsppd_ptk = document.querySelector(".prevsppd_ptk");
    let prevsppd_starttanggal = document.querySelectorAll(".prevsppd_starttanggal");
    let prevsppd_tempattujuan = document.querySelector(".prevsppd_tempattujuan");
    let prevsppd_maksudperjalanandinas = document.querySelector(".prevsppd_maksudperjalanandinas");
    let prevsppd_isiresume = document.querySelector(".prevsppd_isiresume");
    prevsppd_isiresume.innerHTML = data.resume;
    
    prevsppd_ptk.innerHTML = ptk;
    prevsppd_starttanggal.forEach((el, i)=> i == 0? el.innerHTML = tgl: el.innerHTML = tgl1);
    prevsppd_tempattujuan.innerHTML = tempat;
    prevsppd_maksudperjalanandinas.innerHTML = maksud;

}
const tooglesembunyimenu = (btn)=>{
    let el = document.querySelector(".tempatmenukeyboard");
    if(el.className.indexOf("visibel")>-1){
        el.classList.remove("visibel");
        btn.innerHTML = `<i class="fa fa-eye-slash"></i>`
        btn.setAttribute("title","Sembunyikan Menu");
    }else{
        el.classList.add("visibel");
        btn.innerHTML = `<i class="fa fa-eye"></i>`
        btn.setAttribute("title","Buka Menu");
    }
}


const keyboardtooltip = (objek={},jeniskirimanobjek="")=>{
   
    let keyboardeditor = document.querySelector("#iframe_keyboardumum");
    const dockeyboard = keyboardeditor.contentDocument || keyboardeditor.contentWindow.document;
            dockeyboard.body.designMode = "on";
            dockeyboard.body.setAttribute("spellcheck","false");
            dockeyboard.body.setAttribute("contenteditable","true");
            dockeyboard.body.setAttribute("id","edt3");
            // dockeyboard.body.setAttribute("style","font-size:12px");
        var root = window.location.origin;
        dockeyboard.head.innerHTML = `<link rel="stylesheet" href="${root}/css/w3.css">
        <link href="https://fonts.googleapis.com/css?family=Raleway">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link rel="stylesheet" href="https://edurasa.com/css/stylegurukelas.css">`;
        
    dockeyboard.addEventListener("input",(e)=>{
        let v = e.target;
        let domm = v.querySelectorAll("div");
        if(v.childNodes[0].nodeName == "#text"){
            // let s = dockeyboard.createElement("div");
            // s.innerHTML = v.innerHTML;
            // dockeyboard.body.appendChild(s);
            dockeyboard.body.innerHTML = "<div class='garisbuku'>"+v.innerHTML+"</div>";
            
        }
        domm.forEach(dom=>{
            if(dom.hasAttribute("class")){
                if(dom.className.indexOf("garisbuku")==-1){
                    dom.classList.add("garisbuku")
                }
            }else{
                if(dom.hasAttribute("style")){
                    let cek = dom.getAttribute("style");
                    if(cek.indexOf("break-after:page")>-1){
                        dom.removeAttribute("style");
                        dom.setAttribute("style","break-after:page")
                    }else{
                        dom.setAttribute("class","garisbuku")
                    }
                    
                }else{
                    dom.setAttribute("class","garisbuku")
                }
            }
        })
    })
    
    
    const btnn = document.querySelectorAll(".btn_edtkeyboard");//
    const allowhtmll = document.querySelector("#html_edtkeyboard");
    
    let show2 = false;
    allowhtmll.addEventListener("change", ()=>{
        if(!allowhtmll.checked){
            //asli
            dockeyboard.body.innerHTML = dockeyboard.body.textContent;
            
            show2 = false;
        }else{
                // asli
                dockeyboard.body.textContent =dockeyboard.body.innerHTML;
            show2 =true;
        }
    })
    for (let i = 0 ; i < btnn.length ; i++){
        let cmd = btnn[i].getAttribute("data-keycmdkeyboard");
        let owngrup = btnn[i].hasAttribute("data-grupkeyboard");
        
        btnn[i].addEventListener("click",()=>{
            if(show2){
                alert("Hilangkan dulu Ceklisnya")
            }else{
            
                if(cmd === "fontname"){
                    let val = btnn[i].innerHTML;
                    document.querySelector(".dropdown_jenishurufkeyboard").innerHTML = val;
                    dockeyboard.execCommand(cmd,false,val);
    
                }else if(cmd==="removeFormat"){ 
                    dockeyboard.execCommand(cmd, false, null);
                    document.querySelector(".dropdown_jenishurufkeyboard").innerHTML = "Pilih Jenis Huruf"
                }else if(cmd == "createLink"){
                    let prom = prompt("Masukkan link","");
                    if(!prom){return};
                    dockeyboard.execCommand(cmd, false, prom);
                    //console.log(dockeyboard.body.designMode)
                    const linkifram = dockeyboard.querySelectorAll("a");
    linkifram.forEach(el =>{
        el.target = "_blank";
        //console.log(el);
        el.addEventListener("mouseover", () =>{
            dockeyboard.body.designMode = "Off";
        });
        el.addEventListener("mouseout", () =>{
            dockeyboard.body.designMode = "On";
        })
        //console.log(dockeyboard.body.designMode)
    })   
                }else if(owngrup){
                    let grup = btnn[i].getAttribute("data-grupkeyboard");
                    if(grup == "Paragraf"){
    //paragraf:
    let dom = document.querySelector(".dropdown_jenisparagrafkeyboard");
    if(cmd =="justifyLeft"){
        dom.innerHTML = `<i class="fa fa-align-left"></i> `;
    }else if(cmd == "justifyRight"){
        dom.innerHTML = `<i class="fa fa-align-right"></i> `;
    }else if(cmd == "justifyCenter"){
        dom.innerHTML = `<i class="fa fa-align-center"></i> `;
    }else if(cmd == "justifyFull"){
        dom.innerHTML = `<i class="fa fa-align-justify"></i> `;
    }else{
        dom.innerHTML = "Tak dikenal";
    }
    dockeyboard.execCommand(cmd, false, null)
                    }else if (grup == "ukuranfont") {
    let val = btnn[i].getAttribute("data-keyval");
    document.querySelector(".grup_ukuranfont").innerHTML = btnn[i].innerHTML;
    dockeyboard.execCommand(cmd, false, val);
    
    
                    }else if(grup == "heading"){
    let val = btnn[i].getAttribute("data-keyval");
    document.querySelector(".grup_heading").innerHTML = btnn[i].innerHTML;
    dockeyboard.execCommand(cmd, false, val);
    
                    }
                    else{
    let teks = btnn[i].innerHTML;
    dockeyboard.execCommand(cmd,false,teks)
    // dockeyboard.execCommand("insertText",false,"&nbsp;")
                    }
                } else{
                    dockeyboard.execCommand(cmd, false, null)
                    // dockeyboard.execCommand("insertText",false,"&nbsp;")
                    btnn[i].classList.toggle("active");
                    
                }
    
    
    
                
            }
          
        })
    
    };
    let keyboardedtbl = document.querySelector("#keyboardedt_table");
    let keyboardsPchBiasa = document.querySelector("#keyboardsimpan_pecahanbiasa");
    let keyboardsPchCamp = document.querySelector("#keyboardsimpan_pecahancampuran");
    let keyboardsAkarKdrat = document.querySelector("#keyboardsimpan_akarkuadrat");
    let keyboardsAkartiga = document.querySelector("#keyboardsimpan_akarpangkattiga");
    
    
    keyboardedtbl.addEventListener("click", () => {
        try{
        let promp = prompt("Masukkan jumlah baris, contoh 3 x 4 (3 baris, 4 kolom) tanpa spasi","3x4");
        if(!promp){return }
        let teks = promp.replace(/\s+/g,"");
        let ang = teks.toLowerCase().split("x");
        let brs = parseInt(ang[0]);
        let cols = parseInt(ang[0]);
        let html = `&nbsp;<table class="w3-table garis">`
        for(i = 0 ; i < brs ; i++){
            html +=`<tr>`
            for (j = 0 ; j <cols; j++){
                html +=`<td>teks</td>`
            }
            html +=`</tr>`
        }
        html +=`</table>&nbsp;`;
        dockeyboard.execCommand("insertHTML",null, html);
        }
        catch(er){
            console.log(er);    
        }
    });
    keyboardsPchBiasa.addEventListener("click", () =>{
        let a = document.querySelector("#inpecbiasa_pembilang").innerHTML;
        let b = document.querySelector("#inpecbiasa_penyebut").innerHTML;
        let teks = htmlpecahanbiasa(a,b);
        dockeyboard.execCommand("insertHTML",null, teks);
    })
    keyboardsPchCamp.addEventListener("click",()=>{
        let a = document.querySelector("#inpecCamp_satuan").innerHTML;
        let b = document.querySelector("#inpecCamp_pembilang").innerHTML;
        let c = document.querySelector("#inpecCamp_penyebut").innerHTML;
        let teks = htmlpecahancampuran(a,b,c);
        dockeyboard.execCommand("insertHTML",null, teks);
    })
    keyboardsAkarKdrat.addEventListener("click",()=>{
        let a = "";
        let b = document.querySelector("#inakar_kuadrat").innerHTML;
        let teks = htmlakarpangkatn(a,b);
        dockeyboard.execCommand("insertHTML",null, teks);
    
    })
    keyboardsAkartiga.addEventListener("click",()=>{
        let a = "3";
        let b = document.querySelector("#inakar_tiga").innerHTML;
        let teks = htmlakarpangkatn(a,b);
        dockeyboard.execCommand("insertHTML",null, teks);
    });
    let keyboardfileInput = document.querySelector("#keyboarduploadgambar_edt");
    
    keyboardfileInput.addEventListener('change', async() => {
        const files = keyboardfileInput.files;
        if (!files || !files.length) {
        //          console.log('No files selected');
        return;
        }
            let reader = new FileReader();
            var item = files[0];
            let namafile = item.name;
            
            let atGal = atributgaleri()
            let key = atGal.key;
            //let obKey = Object.keys(key);
            let v = [];
            
            loadingtopbarin("loadingtopbar");
            reader.readAsDataURL(item);
            reader.onload = async function (e) {
                // kita upload gambar dulu ke Drive
                let src = e.target.result;
                let dataa = src.replace(/^.*,/, '');
                let tipe = src.match(/^.*(?=;)/)[0]; 
                
                let tipenyaaja = tipe.split("/")[1]
                let realtipe;
                if(tipenyaaja.indexOf("vnd")>-1){
                    realtipe = tipefile;
                }else{
                    realtipe = tipenyaaja;
                }
                let fileTIPE =realtipe;
                // obret.data = dataa;
                // obret.tipe = tipe;
                // obret.ext = realtipe;
                // obret.size = ukuran;
                // obret.namafile = file.name;
                
                let data = new FormData();
                
                let linkgambar = "/img/NO+GAGAL.png"

                data.append("fileContent", dataa);
                data.append("mimeType", tipe);
                data.append("filename", namafile);
                data.append("kelas", "000 GALERI");
                
                await fetch(linktendik+"?action=uploadfiledulu", {
                    method: 'post',
                    body: data
                }).then(m => m.json())
                    .then(r => {
                        if (r.sukses == "Sukses") {
                            let link = r.idfile
                            fileresult = link
                            linkgambar = "https://drive.google.com/uc?export=view&id=" + link;
                            // setTimeout(() => {
                            //     el_label.innerHTML = `<i class="fa fa-upload warnaeka  w3-round-large w3-padding w3-border-black w3-border-bottom w3-center"> Unggah File</i>`;
            
                            // }, 3000);
                            // el_label.innerHTML = `Gagal Mengunggah`;
                        } else {
                            // el_label.innerHTML = `<i class="fa fa-upload warnaeka  w3-round-large w3-padding w3-border-black w3-border-bottom w3-center"> Unggah File</i>`;
                            // elinput.value = r.idfile;
                        }
                        dockeyboard.execCommand("insertImage",false, linkgambar);
                        let imgs = dockeyboard.querySelectorAll("img");
                        imgs.forEach(item => {
                            item.style.maxWidth ="500px";
                        })
                    })
                    .catch(er => {
                        console.log(er);
                        
                        // alert("Maaf, terjadi kesalahan. Silakan ulangi sesi Anda sesaat lagi.")
                        // el_label.innerHTML = `<i class="fa fa-upload warnaeka  w3-round-large w3-padding w3-border-black w3-border-bottom w3-center"> Unggah File</i>`;
                    })
                
                enableImageResizeInDiv2("edt3");    
                // setelah responnhya keluar, nanti tinggal dikirim ke Galeri berikut skripnya
                let type = [3];

                let objekvalue = [];//'', '', '', '', namauser, 'dipublikasikan', 'Tidak Ada', 'Tidak Ada', ''];//tanpa idbaris
                if(jeniskirimanobjek == "resume"){
                    let kegiatan = objek.ptk_maksudsppd;
                    let tanggal = objek.ptk_starttgl;
                    let lampiransppd = 'lampiran_sppd_' + kegiatan;
                    objekvalue = [kegiatan, tanggal, fileresult, fileTIPE, namauser, 'dipublikasikan', 'Tidak Ada', 'Tidak Ada', lampiransppd];//tanpa idbaris
                }else{ //rapat kalo ga salah
                    let kegiatan = objek.tema_rapat;
                    let tanggal = objek.pelaksanaan_rapat;
                    let lampiransppd = objek.agenda_rapat
                    objekvalue = [kegiatan, tanggal, fileresult, fileTIPE, namauser, 'dipublikasikan', 'Tidak Ada', 'Tidak Ada', lampiransppd];//tanpa idbaris
                
                }


                let tabel = JSON.stringify(objekvalue);
                let keyy = JSON.stringify(key);
                let tipee = JSON.stringify(type);
            
                let datakirim = new FormData();
                datakirim.append("key",keyy);
                datakirim.append("tab","galeri");
                datakirim.append("tabel",tabel);
                datakirim.append("tipe",tipee);
                fetch(linktendik+"?action=simpanbarisketaburut",{
                    method:"post",
                    body:datakirim
                }).then(m => m.json())
                .then(r => {
                    let res = r.result;
                    
                    
                })
                .catch(er => console.log(er))

        }
    });
    
    
    const keyboardbtnn_edtyt = document.querySelector("#keyboardbtn_edtkeyboardyt");
    keyboardbtnn_edtyt.addEventListener("click", () => {
        let prom = prompt("Masukkan link youtube","");
        if(!prom){return};
        let reg = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        let url = prom.match(reg)
        let html=`<iframe style="resize: both;" src='https://www.youtube.com/embed/${url[1]}'  frameborder='1' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe><br/><br/>`;
        let ch = document.querySelector("#html_edtkeyboard");
        if(!ch.checked){
            ch.checked = true;
            dockeyboard.execCommand("insertHTML",false,html);
            ch.checked = false
        }else{
            dockeyboard.execCommand("insertText",false,html);
        }
    })
    
    const keyboardbtn_gantihalaman = document.getElementById("keyboardbtn_gantihalaman");
    keyboardbtn_gantihalaman.addEventListener("click",()=>{
        let html = `<div class="w3-border-bottom w3-hide-small"> </div><div style="break-after:page"></div>`;
        let ch = document.querySelector("#html_edtkeyboard");
        if(!ch.checked){
            ch.checked = true;
            dockeyboard.execCommand("insertHTML",false,html);
            ch.checked = false
        }else{
            dockeyboard.execCommand("insertText",false,html);
        }
    })
    
    
    function enableImageResizeInDiv2(id) {
        if (!(/chrome/i.test(navigator.userAgent) && /google/i.test(window.navigator.vendor))) {
            return;
        }
        var editor = dockeyboard.getElementById(id);
        
        var resizing = false;
        var currentImage;
        var createDOM = function (elementType, className, styles) {
            let ele = document.createElement(elementType);
            ele.className = className;
            setStyle(ele, styles);
            return ele;
        };
        var setStyle = function (ele, styles) {
            for (key in styles) {
                ele.style[key] = styles[key];
               
            }
            return ele;
        };
        var removeResizeFrame = function () {
            dockeyboard.querySelectorAll(".resize-frame,.resizer").forEach((item) => item.parentNode.removeChild(item));
        };
        var offset = function offset(el) {
             const rect = el.getBoundingClientRect();
            // scrollLeft = window.pageXOffset ||dockeyboard.documentElement.scrollLeft,
            // scrollTop = window.pageYOffset || dockeyboard.documentElement.scrollTop;
            // console.log(scrollLeft);
            // return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
            var currentFramePosition = currentFrameAbsolutePosition()
            var elemTop = rect.top + currentFramePosition.y;
            var elemBottom = rect.bottom + currentFramePosition.y;
        
    
            // var currentFramePosition = getCurrentFrameAbsolutePosition();
            // var elemTop = rect.top + currentFramePosition.y;
            // var elemBottom = rect.bottom + currentFramePosition.y;
             return { top: elemTop, left: elemBottom }
        };
        var clickImage = function (img) {
            removeResizeFrame();
            currentImage = img;
            const imgHeight = img.offsetHeight;
            const imgWidth = img.offsetWidth;
            const imgPosition = { top: img.offsetTop, left: img.offsetLeft };
            const editorScrollTop = editor.scrollTop;
            const editorScrollLeft = editor.scrollLeft;
            const top = imgPosition.top - editorScrollTop - 1;
            const left = imgPosition.left - editorScrollLeft - 1;
    
            editor.append(createDOM('span', 'resize-frame', {
                margin: '10px',
                position: 'absolute',
                top: (top + imgHeight - 10) + 'px',
                left: (left + imgWidth - 10) + 'px',
                border: 'solid 3px blue',
                width: '6px',
                height: '6px',
                cursor: 'se-resize',
                zIndex: 1
            }));
    
            editor.append(createDOM('span', 'resizer top-border', {
                position: 'absolute',
                top: (top) + 'px',
                left: (left) + 'px',
                border: 'dashed 1px grey',
                width: imgWidth + 'px',
                height: '0px'
            }));
    
            editor.append(createDOM('span', 'resizer left-border', {
                position: 'absolute',
                top: (top) + 'px',
                left: (left) + 'px',
                border: 'dashed 1px grey',
                width: '0px',
                height: imgHeight + 'px'
            }));
    
            editor.append(createDOM('span', 'resizer right-border', {
                position: 'absolute',
                top: (top) + 'px',
                left: (left + imgWidth) + 'px',
                border: 'dashed 1px grey',
                width: '0px',
                height: imgHeight + 'px'
            }));
    
            editor.append(createDOM('span', 'resizer bottom-border', {
                position: 'absolute',
                top: (top + imgHeight) + 'px',
                left: (left) + 'px',
                border: 'dashed 1px grey',
                width: imgWidth + 'px',
                height: '0px'
            }));
    
            dockeyboard.querySelector('.resize-frame').onmousedown = () => {
                resizing = true;
                return false;
            };
    
            editor.onmouseup = () => {
                if (resizing) {
                    currentImage.style.width = dockeyboard.querySelector('.top-border').offsetWidth + 'px';
                    currentImage.style.height = dockeyboard.querySelector('.left-border').offsetHeight + 'px';
                    refresh();
                    currentImage.click();
                    resizing = false;
                }
            };
    
            editor.onmousemove = (e) => {
                if (currentImage && resizing) {
                    let height = e.pageY - offset(currentImage).top;
                    let width = e.pageX - offset(currentImage).left;
                    height = height < 1 ? 1 : height;
                    width = width < 1 ? 1 : width;
                    const top = imgPosition.top - editorScrollTop - 1;
                    const left = imgPosition.left - editorScrollLeft - 1;
                    setStyle(dockeyboard.querySelector('.resize-frame'), {
    top: (top + height - 10) + 'px',
    left: (left + width - 10) + "px"
                    });
                   
                    setStyle(dockeyboard.querySelector('.top-border'), { width: width + "px" });
                    setStyle(dockeyboard.querySelector('.left-border'), { height: height + "px" });
                    setStyle(dockeyboard.querySelector('.right-border'), {
    left: (left + width) + 'px',
    height: height + "px"
                    });
                    setStyle(dockeyboard.querySelector('.bottom-border'), {
    top: (top + height) + 'px',
    width: width + "px"
                    });
                }
                return false;
            };
        };
        var bindClickListener = function () {
            editor.querySelectorAll('img').forEach((img, i) => {
                
                img.onclick = (e) => {
                    if (e.target === img) {
    clickImage(img);
                    }
                };
            });
        };
        var currentFramePosition = function(){
            let currentWindow = window;
        let currentParentWindow;
        let positions = [];
        let rect;
      
        while (currentWindow !== window.top) {
          currentParentWindow = currentWindow.parent;
          for (let idx = 0; idx < currentParentWindow.frames.length; idx++)
            if (currentParentWindow.frames[idx] === currentWindow) {
              for (let frameElement of currentParentWindow.document.getElementsByTagName('iframe')) {
                if (frameElement.contentWindow === currentWindow) {
                  rect = frameElement.getBoundingClientRect();
                  positions.push({x: rect.x, y: rect.y});
                }
              }
              currentWindow = currentParentWindow;
              break;
            }
        }
        return positions.reduce((accumulator, currentValue) => {
          return {
            x: accumulator.x + currentValue.x,
            y: accumulator.y + currentValue.y
          };
        }, { x: 0, y: 0 });
        };
        var refresh = function () {
            bindClickListener();
            removeResizeFrame();
            if (!currentImage) {
                return;
            }
            var img = currentImage;
            var imgHeight = img.offsetHeight;
            var imgWidth = img.offsetWidth;
            var imgPosition = { top: img.offsetTop, left: img.offsetLeft };
            var editorScrollTop = editor.scrollTop;
            var editorScrollLeft = editor.scrollLeft;
            const top = imgPosition.top - editorScrollTop - 1;
            const left = imgPosition.left - editorScrollLeft - 1;
    
            editor.append(createDOM('span', 'resize-frame', {
                position: 'absolute',
                top: (top + imgHeight) + 'px',
                left: (left + imgWidth) + 'px',
                border: 'solid 2px red',
                width: '6px',
                height: '6px',
                cursor: 'se-resize',
                zIndex: 1
            }));
    
            editor.append(createDOM('span', 'resizer', {
                position: 'absolute',
                top: (top) + 'px',
                left: (left) + 'px',
                border: 'dashed 1px grey',
                width: imgWidth + 'px',
                height: '0px'
            }));
    
            editor.append(createDOM('span', 'resizer', {
                position: 'absolute',
                top: (top) + 'px',
                left: (left + imgWidth) + 'px',
                border: 'dashed 1px grey',
                width: '0px',
                height: imgHeight + 'px'
            }));
    
            editor.append(createDOM('span', 'resizer', {
                position: 'absolute',
                top: (top + imgHeight) + 'px',
                left: (left) + 'px',
                border: 'dashed 1px grey',
                width: imgWidth + 'px',
                height: '0px'
            }));
        };
        var reset = function () {
            if (currentImage != null) {
                currentImage = null;
                resizing = false;
                removeResizeFrame();
            }
            bindClickListener();
        };
        editor.addEventListener('scroll', function () {
            reset();
        }, false);
        editor.addEventListener('mouseup', function (e) {
            if (!resizing) {
                const x = (e.x) ? e.x : e.clientX;
                const y = (e.y) ? e.y : e.clientY;
                let mouseUpElement = dockeyboard.elementFromPoint(x, y);
                if (mouseUpElement) {
                    let matchingElement = null;
                    if (mouseUpElement.tagName === 'IMG') {
    matchingElement = mouseUpElement;
                    }
                    if (!matchingElement) {
    reset();
                    } else {
    clickImage(matchingElement);
                    }
                }
            }
        });
       
    
    }
    enableImageResizeInDiv2("edt3");
    ///
    function bubbleIframeMouseMove2(iframe){
        // Save any previous onmousemove handler
        var existingOnMouseMove = iframe.contentWindow.onmousemove;
    
        // Attach a new onmousemove listener
        iframe.contentWindow.onmousemove = function(e){
            // Fire any existing onmousemove listener 
            if(existingOnMouseMove) existingOnMouseMove(e);
    
            // Create a new event for the this window
            var evt = document.createEvent("MouseEvents");
    
            // We'll need this to offset the mouse move appropriately
            var boundingClientRect = iframe.getBoundingClientRect();
    
            // Initialize the event, copying exiting event values
            // for the most part
            evt.initMouseEvent( 
                "mousemove", 
                true, // bubbles
                false, // not cancelable 
                window,
                e.detail,
                e.screenX,
                e.screenY, 
                e.clientX + boundingClientRect.left, 
                e.clientY + boundingClientRect.top, 
                e.ctrlKey, 
                e.altKey,
                e.shiftKey, 
                e.metaKey,
                e.button, 
                null // no related element
            );
    
            // Dispatch the mousemove event on the iframe element
            iframe.dispatchEvent(evt);
        };
    }
    bubbleIframeMouseMove2(keyboardeditor);
function currentFrameAbsolutePosition() {
        let currentWindow = window;
        let currentParentWindow;
        let positions = [];
        let rect;
        
        while (currentWindow !== window.top) {
            currentParentWindow = currentWindow.parent;
                for (let idx = 0; idx < currentParentWindow.frames.length; idx++)
                    if (currentParentWindow.frames[idx] === currentWindow) {
                    for (let frameElement of currentParentWindow.document.getElementsByTagName('iframe')) {
                if (frameElement.contentWindow === currentWindow) {
                    rect = frameElement.getBoundingClientRect();
                    positions.push({x: rect.x, y: rect.y});
                }
                }
            currentWindow = currentParentWindow;
            break;
            }
        }
            return positions.reduce((accumulator, currentValue) => {
            
                return {
                x: accumulator.x + currentValue.x,
                y: accumulator.y + currentValue.y
            };
        }, { x: 0, y: 0 });
    }



}

// keyboardtooltip({},"");

const isitekselemenini = (paren="", target, posisitooltip="atas", baris="") =>{
    let elemen = document.querySelector("."+target);
    let simpan = document.querySelector(".simpankeyboard");
    simpan.onclick=null;
    let lebarwindow = document.querySelector(".tesbody").offsetWidth;
    let bataskanan = lebarwindow * 0.5;
    let keyboard = document.getElementById("keyboard_ketikan");
    dragElement(keyboard);
    let keyboardeditor = document.querySelector("#iframe_keyboardumum");//.style.display="none";
    let wdoc = keyboardeditor.contentDocument || keyboardeditor.contentWindow.document;
    let body = wdoc.body;
    body.innerHTML = elemen.innerHTML;
    let lLeft, tTop;
    if(posisitooltip == "atas"){
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.querySelector(".prevsppd_isiresume").scrollTo({ top: 0, behavior: 'smooth' });
        let pAre = document.querySelector("."+paren);
        // tTop = (elemen.offsetTop + window.scrollY + pAre.offsetTop + 10)+"px";
        tTop = (elemen.offsetTop+ 10)+"px";
        lLeft = pAre.offsetLeft + "px";//(bataskanan - (keyboard.offsetWidth/2) + elemen.offsetLeft) + "px";
    }else{
        window.scrollTo({ top: 0, behavior: 'smooth' });
        let pAre = document.querySelector("."+paren);
        tTop = (elemen.offsetTop + 10) +"px";
        lLeft = pAre.offsetLeft + "px";//(bataskanan - (keyboard.offsetWidth/2) + elemen.offsetLeft) + "px";
    }
    
    keyboard.style.top = tTop;
    keyboard.style.left = lLeft;
    keyboard.style.display="block";
    simpan.onclick= async()=>{
        elemen.innerHTML = body.innerHTML;
        //simpan ke tab = sppd di baris
        if(baris ==""){
            alert("Perubahan tidak bisa disimpan di server")
            return
        }
      
        let par = parseInt(baris);
        await cektagdbrapat();
        let data = tagdbsppd.filter(s => s.idbaris == par)[0];//
        let objekKirim = Object.assign({},data);
        objekKirim.resume = body.innerHTML;
        let iBaris = objekKirim.idbaris;
        let key = Object.keys(objekKirim);
        let val = Object.values(objekKirim);
        //val.shift();
        let datakirim = new FormData();
        datakirim.append("idbaris",iBaris);
        datakirim.append("tabel", JSON.stringify(val));
        datakirim.append("key",JSON.stringify(key));
        datakirim.append("tab","sppd");
        //animasi loading:
        loadingtopbarin("loadingtopbar");
        fetch(jlo.url_dataabsen+"?action=simpanbarisketabidbaris",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
            tagdbsppd = r.data;
            clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
                setTimeout(() => {
                    divlod.style.width = "1px"
                    divlod.className += " w3-hide";
    
                }, 3000);
        })
        .catch(er => console.log(er))
        
        
        keyboard.style.display="none";
    }

}
function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }
const isitekselemeniniRapat = (paren="", target, posisitooltip="atas", baris="",keynotula) =>{
    let elemen = document.querySelector("."+target);
    let simpan = document.querySelector(".simpankeyboard");
    simpan.onclick= null;
    let lebarwindow = document.querySelector(".tesbody").offsetWidth;
    let bataskanan = lebarwindow * 0.5;
    let keyboard = document.getElementById("keyboard_ketikan");
    dragElement(keyboard);
    let keyboardeditor = document.querySelector("#iframe_keyboardumum");
    let wdoc = keyboardeditor.contentDocument || keyboardeditor.contentWindow.document;
    let body = wdoc.body;
    body.innerHTML = elemen.innerHTML;
    let lLeft, tTop;
    if(posisitooltip == "atas"){
        window.scrollTo({ top: 0, behavior: 'smooth' });
        let pAre = document.querySelector("."+paren);
        tTop = (elemen.offsetTop + window.scrollY + pAre.offsetTop + 10)+"px";
        lLeft = pAre.offsetLeft + "px";//(bataskanan - (keyboard.offsetWidth/2) + elemen.offsetLeft) + "px";
    }else{
        // window.scrollTo({ top: 0, behavior: 'smooth' });
        // document.getElementById("template_notularapat").scrollTo({top:0, behavior:"smooth"})
        let pAre = document.querySelector("."+paren);
        //tTop = (elemen.offsetTop + 10) +"px";
        tTop = (getOffset(elemen).top - 100)+"px";
        lLeft = pAre.offsetLeft + "px";//(bataskanan - (keyboard.offsetWidth/2) + elemen.offsetLeft) + "px";
    }
    console.log(tTop)
    console.log(lLeft)
    keyboard.style.top = tTop;
    keyboard.style.left = lLeft;
    keyboard.style.display="block";
    simpan.onclick= async ()=>{
        elemen.innerHTML = body.innerHTML;
        //simpan ke tab = sppd di baris
        if(baris ==""){
            alert("Perubahan tidak bisa disimpan di server")
            return
        }
       
        let htmlbody = body.innerHTML;
        //val.shift();
        let datakirim = new FormData();
        datakirim.append("idbaris",baris);
        datakirim.append("htmlnotularapat", htmlbody);
        datakirim.append("keynotula",keynotula);
        //animasi loading:
        loadingtopbarin("loadingtopbar");
        await fetch(jlo.url_dataabsen+"?action=kirimnotularapat",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
            tagdbsppd = r.data;
            clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
            setTimeout(() => {
                divlod.style.width = "1px"
                divlod.className += " w3-hide";
                
            }, 3000);
            document.querySelector(".fokusngetiknotula").click();
        })
        .catch(er => console.log(er))
        
        
        keyboard.style.display="none";
    }

}

const edit_sppd = (brs)=>{
    let data = tagdbsppd.filter(s => s.idbaris == brs)[0];// bentuknya objek;
    let vidguru = data.ptk_diperintah;
    let dbUser = dataapiguru.filter(s => s.id == vidguru)[0];

    let tgl = new Date(data.ptk_starttgl);
    var d = tgl.toLocaleDateString().split('/');
    var tglawal = d[2]+"-"+("0"+d[0]).slice(-2)+"-"+("0"+d[1]).slice(-2);
    
    let ptk = dbUser.guru_namalengkap;
    let tempat = data.ptk_tempatsppd;
    let maksud = data.ptk_maksudsppd;

    
    let prevsppd_ptk = document.querySelector("#editabelsppd_pegawaiyangdiperintah");
    let edit_jabatan = document.querySelector("#editabelsppd_jabatanpegawai")
    let prevsppd_starttanggal = document.querySelector("#editabelsppd_tanggalmulai");
    let prevsppd_tempattujuan = document.querySelector("#editabelsppd_tujuantempatdinas");
    let prevsppd_maksudperjalanandinas = document.querySelector("#editabelsppd_maksudperjalanandinas");
    let edit_durasi = document.getElementById("editabelsppd_lamaperjalanan");
    let edit_nosppd = document.getElementById("editabelsppd_nosuratSPPD");
    let modalt = document.getElementById("useredit_sppd");
    modalt.style.display = "block";
    
    let btn_save = document.querySelector(".serverkirimeditan_sppd");
    
    
    prevsppd_ptk.value = ptk;
    edit_jabatan.value = data.ptk_jabatan;
    prevsppd_starttanggal.value = tglawal;
    prevsppd_tempattujuan.value = tempat;
    edit_durasi.value = data.ptk_durasisppd;
    prevsppd_maksudperjalanandinas.value = maksud;
    edit_nosppd.value = data.ptk_nosppd;

    btn_save.addEventListener("click",()=>{
        loadingtopbarin("loadingtopbar");
        let dataCopy = Object.assign({},data);
        let elemenisi = document.querySelectorAll("[data-keyeditabelsppd]")
        for(i=0 ; i < elemenisi.length; i++){
            let keyEl = elemenisi[i].getAttribute("data-keyeditabelsppd");
            let valEl = elemenisi[i].value;
            dataCopy[keyEl] = valEl;
        }
        let oKey = Object.keys(dataCopy)
        let oVal = Object.values(dataCopy)
        let keyy = JSON.stringify(oKey);
        let tabel = JSON.stringify(oVal);
        let datakirim = new FormData();
        datakirim.append("idbaris",brs);
        datakirim.append("key",keyy);
        datakirim.append("tab","sppd");
        datakirim.append("tabel",tabel);
        
        fetch(jlo.url_dataabsen+"?action=simpanbarisketabidbaris",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
            let res = r.result;
            let dtt = r.data;
            alert("Data berhasil diperbarui")
            tagdbsppd = dtt;

                let tabel = document.querySelector(".tabeldbsppd");
                let tbody = tabel.getElementsByTagName("tbody")[0];
                tbody.innerHTML = "";
                let html = "";
                
                for(i = (tagdbsppd.length - 1) ; i >=0 ; i--){
                    //i>=0;i--
                    let data = tagdbsppd[i];
                    let id_guru = data.ptk_diperintah;
                    let apiguru= dataapiguru.filter(s => s.id == id_guru)[0];
                    let btnSuratKeluar = data.arsip_nosppd==""?`<button class="w3-button w3-green" onclick="nosppdkesuratkeluar(${data.idbaris})">Arsipkan!</button>`:"Sudah diarsipkan";
                    let tomboluploadsppd = data.versiupload == ""?`<button class="w3-btn w3-blue w3-tiny" onclick="uploadscan_sppd('${data.idbaris}')"><i class="fa fa-upload"></i></button>`:`<button class="w3-btn w3-green" onclick="window.open('https://drive.google.com/file/d/${data.versiupload}/view?usp=drivesdk','', 'width=720,height=600')"><i class="fa fa-eye"></i></button>`;
                    html +=`<tr>
                    <td>${(i+1)}</td>
                    <td>${apiguru.guru_namalengkap}</td>
                    <td>${data.ptk_maksudsppd}</td>
                    <td>${data.ptk_tempatsppd}</td>
                    <td>${tanggalfull(new Date(data.ptk_starttgl))}</td>
                    <td>${data.ptk_durasisppd} hari</td>
                    <td>${data.ptk_nosppd}</td>
                    <td>${btnSuratKeluar}</td>
                    <td>${data.resume==""?"Kosong":"Sudah Terisi"}</td>
                    <td>${data.resume==""?"":`<button class="w3-btn w3-tiny w3-green" onclick="preview_resumesppd('${data.idbaris}')" title="Cetak Resume"><i class="fa fa-print"></i></button>`}</td>
                    <td>${tomboluploadsppd}</td>
                    <td><button class="w3-btn w3-tiny w3-blue" onclick="preview_sppd('${data.idbaris}')" title="preview/print"><i class="fa fa-eye"></i></button> <button class="w3-btn w3-tiny w3-sand" onclick="edit_sppd('${data.idbaris}')"  title="edit"><i class="fa fa-edit"></i></button></td>
                    </tr>`;

                }
                tbody.innerHTML = html;
                for(i=0 ; i < elemenisi.length; i++){
                    elemenisi[i].value = "";
                }
            clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
                setTimeout(() => {
                    divlod.style.width = "1px"
                    divlod.className += " w3-hide";
    
                }, 3000);
            
           
        })
        .catch(er => console.log(er))
        modalt.style.display = "none";
    })

}


const uploadscan_sppd = (brs)=>{
    //console.log(brs);
    let objek = Object.assign({},tagdbsppd.filter(s => s.idbaris == brs)[0]);
    let fileInput = document.querySelector("#uploadsppd");
    fileInput.click();
    fileInput.onchange = function() {
        let files = fileInput.files;
        if (!files || !files.length) {
        //          console.log('No files selected');
        alert("Tidak ada file terpilih!")
        return;
        }
            let reader = new FileReader();
            var item = files[0];
            let namafile = item.name;
            
            let atGal = atributgaleri()
            let key = atGal.key;
            //let obKey = Object.keys(key);
            let v = [];
            
            loadingtopbarin("loadingtopbar");
            reader.readAsDataURL(item);
            reader.onload = async function (e) {
                // kita upload gambar dulu ke Drive
                let src = e.target.result;
                let dataa = src.replace(/^.*,/, '');
                let tipe = src.match(/^.*(?=;)/)[0]; 
                
                let tipenyaaja = tipe.split("/")[1]
                let realtipe;
                if(tipenyaaja.indexOf("vnd")>-1){
                    realtipe = tipefile;
                }else{
                    realtipe = tipenyaaja;
                }
                let fileTIPE =realtipe;
                
                let data = new FormData();
                let fileresult
                data.append("fileContent", dataa);
                data.append("mimeType", tipe);
                data.append("filename", namafile);
                data.append("kelas", "000 GALERI");
                
                await fetch(linktendik+"?action=uploadfiledulu", {
                    method: 'post',
                    body: data
                }).then(m => m.json())
                    .then(r => {
                        if (r.sukses == "Sukses") {
                            let link = r.idfile
                            fileresult = link
                            
                        } else {
                            // el_label.innerHTML = `<i class="fa fa-upload warnaeka  w3-round-large w3-padding w3-border-black w3-border-bottom w3-center"> Unggah File</i>`;
                            // elinput.value = r.idfile;
                        }
                        // dockeyboard.execCommand("insertImage",false, linkgambar);
                        // let imgs = dockeyboard.querySelectorAll("img");
                        // imgs.forEach(item => {
                        //     item.style.maxWidth ="500px";
                        // })
                    })
                    .catch(er => {
                        console.log(er);
                        
                        // alert("Maaf, terjadi kesalahan. Silakan ulangi sesi Anda sesaat lagi.")
                        // el_label.innerHTML = `<i class="fa fa-upload warnaeka  w3-round-large w3-padding w3-border-black w3-border-bottom w3-center"> Unggah File</i>`;
                    })
                
                //update untuk key:
                objek.versiupload = fileresult;
                let keySppd = Object.keys(objek);
                let valSppd = Object.values(objek);
                let stfyKey = JSON.stringify(keySppd);
                let stfyVal = JSON.stringify(valSppd);
                let kirimsppd = new FormData();
                kirimsppd.append("idbaris",brs);
                kirimsppd.append("tab","sppd");
                kirimsppd.append("key",stfyKey)
                kirimsppd.append("tabel",stfyVal);
                await fetch(jlo.url_dataabsen+"?action=simpanbarisketabidbaris",{
                    method:"post",body:kirimsppd
                }).then(m => m.json()).then(r=>{
                    let dbSppd = r.data;
                    tagdbsppd = dbSppd;
                    let tabel = document.querySelector(".tabeldbsppd");
                let tbody = tabel.getElementsByTagName("tbody")[0];
                tbody.innerHTML = "";
                let html = "";
                
                for(i = (tagdbsppd.length - 1) ; i >=0 ; i--){
                    //i>=0;i--
                    let data = tagdbsppd[i];
                    let id_guru = data.ptk_diperintah;
                    let apiguru= dataapiguru.filter(s => s.id == id_guru)[0];
                    let btnSuratKeluar = data.arsip_nosppd==""?`<button class="w3-button w3-green" onclick="nosppdkesuratkeluar(${data.idbaris})">Arsipkan!</button>`:"Sudah diarsipkan";
                    let tomboluploadsppd = data.versiupload == ""?`<button class="w3-btn w3-blue w3-tiny" onclick="uploadscan_sppd('${data.idbaris}')"><i class="fa fa-upload"></i></button>`:`<button class="w3-btn w3-green" onclick="window.open('https://drive.google.com/file/d/${data.versiupload}/view?usp=drivesdk','', 'width=720,height=600')"><i class="fa fa-eye"></i></button>`;
                    html +=`<tr>
                    <td>${(i+1)}</td>
                    <td>${apiguru.guru_namalengkap}</td>
                    <td>${data.ptk_maksudsppd}</td>
                    <td>${data.ptk_tempatsppd}</td>
                    <td>${tanggalfull(new Date(data.ptk_starttgl))}</td>
                    <td>${data.ptk_durasisppd} hari</td>
                    <td>${data.ptk_nosppd}</td>
                    <td>${btnSuratKeluar}</td>
                    <td>${data.resume==""?"Kosong":"Sudah Terisi"}</td>
                    <td>${data.resume==""?"":`<button class="w3-btn w3-tiny w3-green" onclick="preview_resumesppd('${data.idbaris}')" title="Cetak Resume"><i class="fa fa-print"></i></button>`}</td>
                    <td>${tomboluploadsppd}</td>
                    <td><button class="w3-btn w3-tiny w3-blue" onclick="preview_sppd('${data.idbaris}')" title="preview/print"><i class="fa fa-eye"></i></button> <button class="w3-btn w3-tiny w3-sand" onclick="edit_sppd('${data.idbaris}')"  title="edit"><i class="fa fa-edit"></i></button></td>
                    </tr>`;

                }
                tbody.innerHTML = html;

                }).catch(er => console.log(er))


                let type = [3];
                let kegiatan = objek.ptk_maksudsppd;
                let tanggal = objek.ptk_starttgl;
                let lampiransppd = 'lampiran_sppd_' + kegiatan;
                let objekvalue = [kegiatan, tanggal, fileresult, fileTIPE, namauser, 'dipublikasikan', 'Tidak Ada', 'Tidak Ada', lampiransppd];//tanpa idbaris

                let tabel = JSON.stringify(objekvalue);
                let keyy = JSON.stringify(key);
                let tipee = JSON.stringify(type);
            
                let datakirim = new FormData();
                datakirim.append("key",keyy);
                datakirim.append("tab","galeri");
                datakirim.append("tabel",tabel);
                datakirim.append("tipe",tipee);
                await fetch(linktendik+"?action=simpanbarisketaburut",{
                    method:"post",
                    body:datakirim
                }).then(m => m.json())
                .then(r => {
                    let res = r.result;
                    
                    
                })
                .catch(er => console.log(er));
            
                clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
                setTimeout(() => {
                    divlod.style.width = "1px"
                    divlod.className += " w3-hide";
    
            }, 3000);

        }
    };
    
}

const admPKKS = ()=>{
    tampilinsublamangurukelas("pkks");
}
/// NOTULA RAPAT

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

const getlocalDateTime = (dd) => {
    let result;
    let d = new Date(dd);
    // "yyyy-MM-ddThh:mm"
    result = d.getFullYear() + "-" + addZero(d.getMonth() + 1) + "-" + addZero(d.getDate()) + "T" + addZero(d.getHours()) + ":" + addZero(d.getMinutes());
    // [addZero(d.getMonth() + 1),
    // new Date(d.getDate()),
    // d.getFullYear()].join('/') + ', ' +
    //     [addZero(d.getHours()),
    //     addZero(d.getMinutes())].join(':');
    return result;
}

let tagdbrapat;
let keyRapat = ["idbaris","diundang_oleh","agenda_rapat","tema_rapat","pelaksanaan_rapat","notulaptk_2","notulaptk_3","notulaptk_4","notulaptk_5","notulaptk_6","notulaptk_7","notulaptk_8","notulaptk_9","notulaptk_10","notulaptk_11","notulaptk_12","notulaptk_13","notulaptk_14","notulaptk_15","notulaptk_16","notulaptk_17","notulaptk_18","notulaptk_19","notulaptk_20","notulaptk_21","notulaptk_22","notulaptk_23","notulaptk_24","notulaptk_25"];
const cektagdbrapat = async() =>{
    let tabel = keyRapat;
    let key = JSON.stringify(tabel);
    let datakirim = new FormData();
    
    datakirim.append("tab","notularapat")
    datakirim.append("key",key)
    await fetch(jlo.url_dataabsen+"?action=getpostdatafromtab",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
            
            let res = r.result;
            if(res == 1){
                tagdbrapat = []
            }else{
                tagdbrapat = r.data;

            }
        }).catch(er=> console.log(er))
}
const rekapRapatSekolah = () =>{
    let tabel = document.querySelector(".tabel_dbrapatsekolah");
    let tbody = tabel.getElementsByTagName("tbody")[0];
    
    let html = "";
    for(i = (tagdbrapat.length-1) ; i>= 0 ; i--){
        let ob = tagdbrapat[i];
        let brs = ob.idbaris;
        let notulen = Object.keys(ob).filter(m => m.indexOf("notulaptk_")>-1 && ob[m] !== "").map(s => idgurunyasiapa(s.match(/(\d+)/)[0]).split(",")[0]);
        let keynotulen = Object.keys(ob).filter(m => m.indexOf("notulaptk_")>-1 && ob[m] !== "")
        let idgurunotulen = Object.keys(ob).filter(m => m.indexOf("notulaptk_")>-1 && ob[m] !== "").map(s => s.match(/(\d+)/)[0]);
        let btnNotula ="";
        for(j = 0 ; j < notulen.length ; j++){
            btnNotula +=`<button class="w3-btn w3-round-large w3-border w3-tiny" onclick="notulaptk('${brs}','${keynotulen[j]}')">${notulen[j]}</button>`
        }
        html +=`<tr>
        <td>${(i+1)}</td>
        <td><button onclick="editrapatini('${tagdbrapat[i].idbaris}')" class="w3-btn w3-border w3-round-large w3-tiny">Edit</button></td>
        <td>${tagdbrapat[i].diundang_oleh}</td>
        <td>${tagdbrapat[i].agenda_rapat}</td>
        <td>${tagdbrapat[i].tema_rapat}</td>
        <td>${tanggalfulllengkap(tagdbrapat[i].pelaksanaan_rapat)}</td>
        <td>${btnNotula}</td>
        <td>${notulen.length==""?"Belum ada yang mengisi":notulen.length + " notulen."}</td>
        </tr>`
    }
    tbody.innerHTML = html;
}
const rekapRapatSekolahuntukku = () =>{
    let tabel = document.querySelector(".datanotularapatku");
    let tbody = tabel.getElementsByTagName("tbody")[0];
    
    let html = "";
    for(i = (tagdbrapat.length-1) ; i>= 0 ; i--){
        let ob = tagdbrapat[i];
        let brs = ob.idbaris;
        let notulasiapa ="notulaptk_"+idguru;
        let Notula = ob[notulasiapa];
        let btnNotula = `<button class="w3-btn w3-border w3-round-large" onclick="isinotulaptk('${brs}','${notulasiapa}')"><i class="fa fa-edit"></button>`;
        html +=`<tr>
        <td>${(i+1)}</td>
        <td>${tagdbrapat[i].diundang_oleh}</td>
        <td>${tagdbrapat[i].agenda_rapat}</td>
        <td>${tagdbrapat[i].tema_rapat}</td>
        <td>${tanggalfulllengkap(tagdbrapat[i].pelaksanaan_rapat)}</td>
        <td>${btnNotula}</td>
        <td>${Notula==""?"-":"Sudah mengisi notula"}</td>
        </tr>`
    }
    tbody.innerHTML = html;
}
const editrapatini = (brs) =>{
    let rRow = parseInt(brs);
    let db  = tagdbrapat.filter(s => s.idbaris == brs)[0];
    let dbCopy = Object.assign({},db);
   
    let tabmenu = document.querySelector(".klikfiturrapat");
    tabmenu.click();
    document.getElementById("rapat_pengundang").value = dbCopy.diundang_oleh;
    document.getElementById("rapat_agendarapat").value = dbCopy.agenda_rapat;
    document.getElementById("rapat_tema").value = dbCopy.tema_rapat;
    document.getElementById("rapat_tgl").value = getlocalDateTime(dbCopy.pelaksanaan_rapat);
    let btnEdit = document.querySelector(".editrapatbaru");
    let btnBuatBaru = document.querySelector(".buatrapatbaru");
    if(btnEdit.className.indexOf("w3-hide")>-1){
        btnEdit.classList.remove("w3-hide");
        btnBuatBaru.classList.add("w3-hide")
    };
    btnEdit.setAttribute("onclick",`editRapatServer('${brs}')`);//

}
const buatRapatbaru = () =>{
    let elemen_data = document.querySelectorAll("[data-keyRapat]");
    let ob = {};
    for(i = 0 ; i < elemen_data.length ; i ++){
        let dom = elemen_data[i];
        let k = dom.getAttribute("data-keyRapat");
        ob[k] = dom.value;
    }
    
    let obBantu = {}
    for(j = 0 ; j < keyRapat.length ; j++){
        let kk = keyRapat[j];
        obBantu[kk] = ""
    }
    
    let obCombine = Object.assign(obBantu, ob);
    let obKey = Object.keys(obCombine);
    let obVal = Object.values(obCombine);
    obVal.shift();
    let tab = "notularapat";
    let datakirim = new FormData();
    datakirim.append("tab",tab);
    datakirim.append("key", JSON.stringify(obKey));
    datakirim.append("tabel", JSON.stringify(obVal));
    loadingtopbarin("loadingtopbar");
    fetch(jlo.url_dataabsen+"?action=simpanbarisketaburut",{
        method:"post",body:datakirim
    }).then(m=> m.json()).then(r =>{
        tagdbrapat = r.data;
        alert("Berhasil disimpan");
        clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
                setTimeout(() => {
                    divlod.style.width = "1px"
                    divlod.className += " w3-hide";
    
                }, 3000);

                for(i = 0 ; i < elemen_data.length ; i ++){
                    let dom = elemen_data[i];
                    dom.value = "";
                }
                
    })

    

}
const editRapatServer = async (brs)=>{
    loadingtopbarin("loadingtopbar");
    await cektagdbrapat();
    let db  = tagdbrapat.filter(s => s.idbaris == brs)[0];
    let obCopy = Object.assign({},db);
    let elemen_data = document.querySelectorAll("[data-keyRapat]");
    let obEdit = {};
    for(i = 0 ; i < elemen_data.length ; i ++){
        let dom = elemen_data[i];
        let k = dom.getAttribute("data-keyRapat");
        obEdit[k] = dom.value;
    }
    let gabunganBarudanIsian = Object.assign(obCopy,obEdit);
    let oKey = Object.keys(gabunganBarudanIsian)
    let oVal = Object.values(gabunganBarudanIsian)
    console.log(obCopy);
    console.log(gabunganBarudanIsian);
    let datakirim = new FormData();
    datakirim.append("tab","notularapat")
    datakirim.append("key",JSON.stringify(oKey))
    datakirim.append("tabel",JSON.stringify(oVal))
    datakirim.append("idbaris",brs);
    await fetch(jlo.url_dataabsen+"?action=simpanbarisketabidbaris",{
        method:"post",body:datakirim
    }).then(m=> m.json()).then(r=>{
        alert("Berhasil diedit");
        tagdbrapat = r.data;

        
    }).catch(er => console.log(er))
    clearInterval(stoploadingtopbar);
    let divlod = document.querySelector(".loadingtopbar");
    divlod.style.width = "100%";
    setTimeout(() => {
        divlod.style.width = "1px"
        divlod.className += " w3-hide";

    }, 3000);


    let btnEdit = document.querySelector(".editrapatbaru");
    let btnBuatBaru = document.querySelector(".buatrapatbaru");
    if(btnEdit.className.indexOf("w3-hide")==-1){
        btnEdit.classList.add("w3-hide");
        btnBuatBaru.classList.remove("w3-hide")
    };
    
    for(i = 0 ; i < elemen_data.length ; i ++){
        let dom = elemen_data[i];
        dom.value = "";
    }

    


}
const idgurunyasiapa = (iD) =>{
    let data = dataapiguru.filter(s=> s.id == iD)[0];
    // let ob = {};
    // ob.nama = data.guru_namalengkap;
    // ob.nip = data.guru_nip;
    return data.guru_namalengkap
}
const idgurunyanip = (iD) =>{
    let data = dataapiguru.filter(s=> s.id == iD)[0];
    let pnsbukan = data.guru_nip == ""?"-":"NIP. "+data.guru_nip;
    // let ob = {};
    // ob.nama = data.guru_namalengkap;
    // ob.nip = data.guru_nip;
    return pnsbukan
}
const notulaptk = (brs, keynotula) =>{
    // hanya khusus untuk melihat saja! di akhir paragraf ada tanda tangannya!
    let db = tagdbrapat.filter(s => s.idbaris == brs)[0];
    let idGuru = keynotula.match(/(\d+)/)[0];
    let namagurunya = idgurunyasiapa(parseInt(idGuru));
    let template = document.getElementById("template_notularapat");
    let judul1 = document.querySelector(".judul_jenisrapat");
    let judul2 = document.querySelector(".judul_temarapat");
    let judul3 = document.querySelector(".judul_wakturapat");
    let lembarisian = document.querySelector(".isiteks_rapat");
    let lembarttd = document.querySelector(".tandatangannotulen");
    let judulpenulis = document.querySelector(".judul_notulen");
    let tg = new Date(db.pelaksanaan_rapat);
    let tglf = tanggalfulllengkap(tg);
    
    template.style.display ="block";
    judul1.innerHTML = db.agenda_rapat;
    judul2.innerHTML = db.tema_rapat;
    judul3.innerHTML = tglf;
    lembarisian.innerHTML = db[keynotula];

    
    lembarttd.innerHTML = `<div class="w3-col l6 s6 w3-center">Mengetahui, <br>Kepala ${idNamaSekolah}<br><br><br><br><u><b>${idNamaKepsek}</b></u><br>NIP. ${idNipKepsek}</div><div class="w3-col l6 s6 w3-center">Depok, ${tanggalfull(tg)}<br>Notulen<br><br><br><br><u><b>${namagurunya}</b></u><br>${idgurunyanip(parseInt(idGuru))}</div>`;
    judulpenulis.innerHTML = "Notulen: " + namagurunya;

    //karena ini untuk dilihat kepsek, maka notula ga boleh diketik ma dia:
    let btnKetik = document.querySelector(".ketikkanrapat")
    if(btnKetik.className.indexOf("w3-hide")==-1){
        btnKetik.classList.add("w3-hide")
    }
    


}
const isinotulaptk = (brs, keynotula) =>{
    // hanya khusus untuk melihat saja! di akhir paragraf ada tanda tangannya!
    let db = tagdbrapat.filter(s => s.idbaris == brs)[0];
    keyboardtooltip(db,"notula");
    let idGuru = keynotula.match(/(\d+)/)[0];
    let namagurunya = idgurunyasiapa(parseInt(idGuru));
    let template = document.getElementById("template_notularapat");
    let judul1 = document.querySelector(".judul_jenisrapat");
    let judul2 = document.querySelector(".judul_temarapat");
    let judul3 = document.querySelector(".judul_wakturapat");
    let lembarisian = document.querySelector(".isiteks_rapat");
    let lembarttd = document.querySelector(".tandatangannotulen");
    let judulpenulis = document.querySelector(".judul_notulen");
    let tg = new Date(db.pelaksanaan_rapat);
    let tglf = tanggalfulllengkap(tg);
    
    template.style.display ="block";
    judul1.innerHTML = db.agenda_rapat;
    judul2.innerHTML = db.tema_rapat;
    judul3.innerHTML = tglf;
    lembarisian.innerHTML = db[keynotula];

    
    lembarttd.innerHTML = `<div class="w3-col l6 s6 w3-center">Mengetahui, <br>Kepala ${idNamaSekolah}<br><br><br><br><u><b>${idNamaKepsek}</b></u><br>NIP. ${idNipKepsek}</div><div class="w3-col l6 s6 w3-center">Depok, ${tanggalfull(tg)}<br>Notulen<br><br><br><br><u><b>${namagurunya}</b></u><br>${idgurunyanip(parseInt(idGuru))}</div>`;
    judulpenulis.innerHTML = "Notulen: " + namagurunya;

    //karena ini untuk dilihat kepsek, maka notula ga boleh diketik ma dia:
    let btnKetik = document.querySelector(".ketikkanrapat")
    if(btnKetik.className.indexOf("w3-hide")>-1){
        btnKetik.classList.remove("w3-hide")
    }
    
    // btnKetik.setAttribute("onclick",`isitekselemenini("printpreviewresume","prevsppd_isiresume", "atas", "${brs}")`);
    btnKetik.setAttribute("onclick",`isitekselemeniniRapat("printNotula","isiteks_rapat", "atasnotula", "${brs}","${keynotula}")`);



}

const onCnguploaditem = (btr, r, snp) => {
    
    
    //get the image selected
    var item = "";
    item = document.querySelector('#btnuploaditem').files[0];
    
    pranalauploaditem.innerHTML = "";
    datauploaditem.innerHTML = "";
    
    let ketval = document.getElementById("masukannamafileitem").value;

    //create a FileReader
    var reader = new FileReader();

    //image turned to base64-encoded Data URI.
    reader.readAsDataURL(item);
    reader.name = item.name;//get the image's name
    reader.size = item.size; //get the image's size
    reader.onload = function (event) {
        pranalauploaditem =`<i class="fa fa-spin fa-spinner"></i> memproses data`;
        datauploaditem.innerHTML =`<i class="fa fa-spin fa-spinner"></i> memproses data`;
        let srcEncoded = event.target.result;
        // Data yang dibutuhkan:
        
        let base64 = srcEncoded.replace(/^.*,/, '');
        let typeMime = srcEncoded.match(/^.*(?=;)/)[0];
        let namafile = "butir_" + btr + "_kriteria_" + r + "_";
        let val = (ketval == "") ? namafile : ketval;
        let frmdata = new FormData();
        frmdata.append("videodataa", base64);
        frmdata.append("videofilenamee", namafile);
        frmdata.append("videomimeTypee", typeMime);
        frmdata.append("namafileitem", val);
        frmdata.append("butir", btr);
        frmdata.append("indekkriteria", r);
        frmdata.append("snp", snp);

        fetch(linktendik + "?action=uploadkriteriaitem", {
            method: 'post',
            body: frmdata
        })
            .then(m => m.json())
            .then(k => {
                console.log(k)
                alert(k.result)
                let link = k.urlfile;
                let namafile = k.namafile;
                let div = document.getElementById("datauploaditem");
                
                div.innerHTML = `<button class="w3-button w3-green" onclick="tambahkankesel(${btr}, ${r},'${namafile}', '${link}')">Tambahkan ke Tabel</button>`
                //datalinkitem()
                
                let htmlfram = `<div class="containerbaru w3-center"><iframe class="responsive-iframebaru" src="${link}"></iframe></div>`
                pranalauploaditem.innerHTML = htmlfram;
                ///--------------------------------------------          
            })
            .catch(er => alert(er))


    }
   
}