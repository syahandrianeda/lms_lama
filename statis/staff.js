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
let jsonprofilsekolah =[];
let rekapabsensiswabulanan =[]

var mySidebar = document.getElementById("mySidebar"); // Get the Sidebar
var overlayBg = document.getElementById("myOverlay"); // Get the DIV with overlay effect
jsonlocalstoragetypeuser = JSON.parse(localStorage.getItem("typeuser"));
let idInstansi = JSON.parse(localStorage.getItem("inst_id"));
let dataketeranganakreditasi;
idNamaSekolah = idInstansi.namainstansi;
jsonlocalstorage = JSON.parse(localStorage.getItem("inst_id"));
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
OBJEKHariEfektif = { "Januari": 0, "Februari": 0, "Maret": 0, "April": 0, "Mei": 0, "Juni": 0, "Juli": 0, "Agustus": 0, "September": 0, "Oktober": 0, "November": 0, "Desember": 0 };

obDataRekapKehadiran = { "Hadir": 0, "Ijin": 0, "Sakit": 0, "Alpa": 0 };
let informasiusulandata = {};
let absenheader;
const linkkehadiranguru = jlo.ss_datanilai;
let stoploadingtopbar;

let pageini=1, jumlahperpage=12;
let objGaleri;
let divresultgaleri = document.querySelector(".tempatgaleri");
let tombl_next = document.querySelector(".tombl_next");
let tombl_prev = document.querySelector(".tombl_prev");
let tombl_last = document.querySelector(".tombl_last");
let tombl_first = document.querySelector(".tombl_first");
let spangal_pages = document.querySelector(".spangal_pages");
let db_utama_siswa = [];
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

const upp_url = window.location.href;
(async function () {

    loadingtopbarin("loadingtopbar");
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

    await fetch(url_absenkaldik).then(m => m.json()).then(k => {
        localStorage.setItem('Kaldik', JSON.stringify(k.records));
        localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl))
        arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
        arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));
    }).catch(er => {
        console.log("muat ulang: " + er);
        // jsonlocalstorage = JSON.parse(localStorage.getItem("inst_id"));
        // url_absenkaldik = jsonlocalstorage.url_dataabsen + "?action=datakaldik&idss=" + jsonlocalstorage.ss_dataabsen

        // fetch(url_absenkaldik).then(m => m.json()).then(k => {
        //     //console.table(k.records)
        //     localStorage.setItem('Kaldik', JSON.stringify(k.records));

        //     localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl))
        //     arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
        //     arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));
        //     // console.log(k.records)
        //     // console.log(k.stringTgl)
        //})
    });

    await fetch(linkdataguru)
        .then(m => m.json())
        .then(k => {
            dataapiguru = k.result;
        })




    namasekolah.innerHTML = namauser;
    namakota.innerHTML = gmpkelas + " ";//+ ruangankelas;
    var logo = document.getElementById("logosekolahmenu");
    logo.setAttribute("src", "https://drive.google.com/uc?export=view&id=" + idimage);
    logo.setAttribute("alt", "Poto Guru");
    logo.setAttribute("style", "width:90px; height:90px");
    if (ruangankelas !== "Penjaga") {
        barstaff.style.display = "block";
        barpenjaga.style.display = "none";
        let kodess = jlo.ss_datauser;
        let linkakun = jlo.url_datauser ;//k.url_datauser + "?action=login&idss=" + k.ss_datauser; 
        let setdah = new FormData();
        setdah.append("idss",kodess);
        fetch(linkakun+"?action=alldatabasebukuindukpost",{method:"post",body:setdah})
            .then(m => m.json())
            .then(r => {
                db_utama_siswa = r.all;
                
            }).catch(er => console.log(er));
        

        await fetch(linkDataUserWithIdss + "&action=datakelasaktifall")
            .then(m => m.json())
            .then(k => {
                jsondatasiswa = k.datasiswa;
                localStorage.setItem("datasiswa_all", JSON.stringify(k));

            }).catch(er => {
                console.log("muat ulang lagi: " + er);

            });
        
        await fetch(linkDataUserWithIdss + "&action=datasiswatidakaktif")
            .then(m => m.json())
            .then(k => {
                arraysiswatidakaktif = k.datasiswa;
                jumlahseluruhsiswadisekolah = k.total
                localStorage.setItem("datasiswatidakaktif", JSON.stringify(k))

            }).catch(er => {
                console.log("muat ulang: " + er);


            });
        await fetch("/statis/dataakreditasi.json").then(m => m.json())
            .then(k => {
                // console.log(k.data);
                dataketeranganakreditasi = k.data;

            })
            .catch(er => {
                console.log(er);

            })

        await fetch(linkDataUserWithIdss + "&action=usulanperbaikandata")
            .then(m => m.json())
            .then(k => {
                let dataaktif = k.datasiswa.filter(s => s.aktif == "aktif");
                let usulkelasini = k.datasiswa;//.filter(k => (k.nama_rombel == idNamaKelas));
                let usulkelasinibelumdisetujui = dataaktif.filter(k => (k.id !== "" && k.usulanperubahandata.indexOf("disetujui") == -1));
                // console.log(usulkelasinibelumdisetujui.length);
                // console.log(usulkelasinibelumdisetujui.length);

                let usulkelasinisudahdisetujui = dataaktif.filter(k => (k.id !== "" && k.usulanperubahandata.indexOf("disetujui") > -1));
                informasiusulandata["usulanbaru"] = usulkelasinibelumdisetujui;
                informasiusulandata["usulandisetujui"] = usulkelasinisudahdisetujui;
                informasiusulandata["all"] = usulkelasini;



            })
            .catch(er => {
                console.log(er);
            })
        
    } else {
        menumenu0.style.display = "none";
        menumenu1.style.display = "block";
        menumenu2.style.display = "none";
        menumenu3.style.display = "none";
        menumenu4.style.display = "none";
        menumenu5.style.display = "none";
        menumenu7.style.display = "none";
        barstaff.style.display = "none";
        barpenjaga.style.display = "block";
        menumenu6.style.display = "block";
        document.querySelector(".tabrekappiket").style.display = "none";
        document.querySelector(".petunjukmeme").style.display = "none";
        document.querySelector(".uploadmeme").style.display = "none";
    }
    if (navigator.storage && navigator.storage.estimate) {
        const quota = await navigator.storage.estimate();
        const percentageUsed = (quota.usage / quota.quota) * 100;
        console.log(`You've used ${percentageUsed}% of the available storage.`);
        const remaining = quota.quota - quota.usage;
        console.log(`You can write up to ${remaining} more bytes.`);
    }
    //await buattabelrekapsemester();

    dashboardgurukelas.innerHTML = dataapiguru.filter(k => k.idabsen == constidguruabsen)[0].jenjang + " ( " + namauser + " )";
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
let jsondatapendaftar = [];
function fnjangandobel() {
    let cekuser = dataapiguru.filter(x => x.username == usernameedit.value);
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
        dataframeeditor.style.display = "none";
        dataakreditasi.style.display = "none";
        divdatasiswa.style.display = "none";
        dataprofilsekolah.style.display = "none";
        divsuratsurat.style.display = "none";
        divgaleri.style.display = "none";
        document.querySelector(".btntab_dataguru").click();
        window.scrollTo({ top: y, behavior: 'smooth' });

    } else if (fitur == "absen") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "block";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataframeeditor.style.display = "none";
        dataakreditasi.style.display = "none";
        divdatasiswa.style.display = "none";
        dataprofilsekolah.style.display = "none";
        divsuratsurat.style.display = "none";
        divgaleri.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });


    } else if (fitur == "beranda") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataframeeditor.style.display = "none";
        dataakreditasi.style.display = "none";
        divdatasiswa.style.display = "none";
        dataprofilsekolah.style.display = "none";
        divsuratsurat.style.display = "none";
        divgaleri.style.display = "none";
        window.scrollTo({ top: 43, behavior: 'smooth' });


    } else if (fitur == "pembelajaran") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "block";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataframeeditor.style.display = "none";
        dataakreditasi.style.display = "none";
        divdatasiswa.style.display = "none";
        dataprofilsekolah.style.display = "none";
        divsuratsurat.style.display = "none";
        divgaleri.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });

    } else if (fitur == "kurikulum") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "block";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataframeeditor.style.display = "none";
        dataakreditasi.style.display = "none";
        divdatasiswa.style.display = "none";
        dataprofilsekolah.style.display = "none";
        divsuratsurat.style.display = "none";
        divgaleri.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });

    } else if (fitur == "mapel") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "block";
        datakehadiranguru.style.display = "none";
        dataframeeditor.style.display = "none";
        dataakreditasi.style.display = "none";
        divdatasiswa.style.display = "none";
        dataprofilsekolah.style.display = "none";
        divsuratsurat.style.display = "none";
        divgaleri.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });

    }
    else if (fitur == "kehadiranguru") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "block";
        divgaleri.style.display = "none";
        dataakreditasi.style.display = "none";
        dataframeeditor.style.display = "none";
        divdatasiswa.style.display = "none";
        dataprofilsekolah.style.display = "none";
        divsuratsurat.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });

    }
    else if (fitur == "profilesekolah") {
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
        dataframeeditor.style.display = "none";
        divdatasiswa.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });


    }
    else if (fitur == "meme") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataframeeditor.style.display = "block";
        dataakreditasi.style.display = "none";
        divdatasiswa.style.display = "none";
        dataprofilsekolah.style.display = "none";
        divsuratsurat.style.display = "none";
        divgaleri.style.display = "none";
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
        dataframeeditor.style.display = "none";
        divdatasiswa.style.display = "none";
        dataprofilsekolah.style.display = "none";
        divsuratsurat.style.display = "none";
        divgaleri.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });



    } else if (fitur == "kesiswaan") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataakreditasi.style.display = "none";
        dataframeeditor.style.display = "none";
        divdatasiswa.style.display = "block";
        dataprofilsekolah.style.display = "none";
        divsuratsurat.style.display = "none";
        divgaleri.style.display = "none";
        window.scrollTo({ top: y, behavior: 'smooth' });
    }else if (fitur == "surat") {
        datakelassaya.style.display = "none";
        dataabsensi.style.display = "none";
        datapembelajaran.style.display = "none";
        datakurikulum.style.display = "none";
        datanilaimapel.style.display = "none";
        datakehadiranguru.style.display = "none";
        dataakreditasi.style.display = "none";
        dataframeeditor.style.display = "none";
        divsuratsurat.style.display = "block";
        divdatasiswa.style.display = "none";
        dataprofilsekolah.style.display = "none";
        divgaleri.style.display = "none";
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
        dataframeeditor.style.display = "none";
        divsuratsurat.style.display = "none";
        divdatasiswa.style.display = "none";
        dataprofilsekolah.style.display = "none";
        divgaleri.style.display = "block";
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
let bukuinduk_all = [];
let bukuinduk_aktif = [];
let bukuinduk_lulus = [];
let bukuinduk_nonaktif = [];
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
    
    let teks = evt.currentTarget.innerHTML;
    if(teks == "Buku Induk Siswa"){
        alldatabukuinduk()
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
            let isidivscroll = document.getElementById("isiscrolltabelabsenrekap3");
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
    let elstablengkap1 = document.getElementById("scrolltabelabsenrekap3")
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
        //console.log(kolomtahun);
        namatabel.rows[r].cells[c].innerHTML = tanggalfull(tanggal.value);
        if (kolomtahun !== "") {
            //alert("kosong \n kolomtahun=" + kolomtahun);
            namatabel.rows[r].cells[17].innerHTML = umur(formatbalikin(kolomtahun)).tahun;
            namatabel.rows[r].cells[18].innerHTML = umur(formatbalikin(kolomtahun)).bulan;
        } else {

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

const kehadiranguru = async () => {
    tampilinsublamangurukelas("kehadiranguru");
    let el = document.querySelector(".persetujuan");
    el.click();

    let labelfor = document.getElementById("tombolabsenguru");
    labelfor.removeAttribute("for");
    labelfor.setAttribute("for", "kamerapiket");
    labelfor.innerHTML = "Ambil Poto";
    labelfor.setAttribute("class", labelfor.className.replace("w3-blue", "w3-green"));
    var poto = document.querySelector('.imgguruabsen')
    poto.src = "/img/192.png";
    // let selekhadir = document.getElementById("pilih_kehadirangurupiket");
    // selekhadir.setAttribute("class", selekhadir.className.replace("w3-show", "w3-hide"));

    //console.log(constidguruabsen);

    //####################################################################################
    // linkdataguru = jlo.url_datauser + "?action=dataguruall&idss=" + jlo.ss_datauser;
    // fetch(linkdataguru).then(m => m.json()).then(k => console.log(k));
    //####################################################################################

    //let idguruabsen = constidguruabsen;
    let d = new Date();
    let dd = d.getDate();
    let m = d.getMonth() + 1;
    let mm = addZero(m);
    let y = d.getFullYear();

    let divket = document.querySelector(".ketabsenkehadiranguru");
    let divimg = document.querySelector(".imgguruabsen");
    let divtombol = document.querySelector("#belumabsenkehadiranguru");
    //divtombol.className.replace(" w3-hide", " w3-show ");
    //belumabsenkehadiranguru 

    let idtanggal = dd + "" + mm + "" + y;//tglStringZero();

    //console.log(idtanggal);
    await fetch(linkkehadiranguru + "?action=cekabsen&idguruabsen=" + constidguruabsen + "&idtanggal=" + idtanggal)
        .then(z => z.json())
        .then(x => {
            // console.log(x);
            let banyakabsen = x.result.length;

            if (banyakabsen == 0) {

                divket.innerHTML = "Anda belum Absen piket hari ini";
                //divtombol.className.replace(" w3-hide", " w3-show ");
                divtombol.style.display = "block";
            } else {
                let disetujui = "";
                if (x.result[banyakabsen - 1].resume == "disetujui") {
                    divtombol.style.display = "none";
                    divimg.src = "https://drive.google.com/uc?export=view&id=" + x.result[banyakabsen - 1].fileContent;
                    disetujui = x.result[banyakabsen - 1].kehadiran + "<br/>(disetujui kepala sekolah)<br/>" + tanggalfulllengkap(x.result[banyakabsen - 1].timestamp);
                } else if (x.result[banyakabsen - 1].resume == "ditolak") {
                    divtombol.style.display = "block";
                    divimg.src = "/img/192.png";
                    disetujui = "Pesan Kepala sekolah : " + x.result[banyakabsen - 1].alasantolak;
                } else {
                    divtombol.style.display = "none";
                    divimg.src = "/img/192.png";
                    disetujui = "Anda sudah absen hari ini, tunggu konfirmasi dari Kepala Sekolah."
                }
                divket.innerHTML = disetujui;

            }

        })
}

let tabkehadiranpiket = document.querySelector(".tabkehadiranpiket");
let divtabelpikethariini = document.getElementById("datadivkehadiranpiket");
tabkehadiranpiket.addEventListener("click", function () {
    if (dataapiguru.length == 0) {

        dataguru();
        return
    }
    let ind = new Date().getMonth() + 1;
    // document.getElementById("daftarpilihbulankehadirangurupribadi").selectedIndex = ind;
    document.getElementById("daftarpilihbulankehadirangurupribadi").value = new Date().getFullYear() + "-" + addZero(new Date().getMonth() + 1) + "-01";
    modalfnkalenderkehadirangurupribadi();
    //divtabelpikethariini.innerHTML = tekshtml;
    //refreshAbsenHariIni();

});

let tabrekappiket = document.querySelector(".tabrekappiket");
tabrekappiket.addEventListener("click", function () {
    // let idselect = document.getElementById("daftarpilihbulankehadiranguru");
    // let xx = idselect.selectedIndex;
    let ind = new Date().getMonth() + 1;
    // xx = ind;
    // document.getElementById("daftarpilihbulankehadiranguru").selectedIndex = ind;
    document.getElementById("daftarpilihbulankehadiranguru").value = new Date().getFullYear() + "-" + addZero(new Date().getMonth() + 1) + "-01";
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
                // // cell.setAttribute("onclick", "bantuabsen('" + encodenama + "_" + ke + "" + nolbulan + "" + y + "')");
                cell.setAttribute("onclick", "alert('Hanya Kepala sekolah yang berhak membantu absen')");

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
};

const modalfnkalenderkehadirangurulama = async () => {
    //kondisikan dulu, jika arraydatatendik kosong, load dulu datanya:
    if (arraydatatendik.length == 0) {
        await fetch(linktendik + "?action=tabeltendik")
            .then(m => m.json()).then(k => {
                //console.log(k);
                arraydatatendik = k;
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
    // let datajabatan = Object.keys(dataapiguru).map(k => dataapiguru[k].guru_namalengkap);
    // let datagolruang = Object.keys(dataapiguru).map(k => dataapiguru[k].guru_namalengkap);
    let encodenama;


    let tbody = tabel.createTBody()
    for (let j = 0; j < datanama.length; j++) {

        //encodenama = encodeURIComponent(unescape(datanama[j]));
        encodenama = encodeURIComponent(unescape(arraydatatendik[j + 1][2]));

        tr = tbody.insertRow(-1);
        let cell = tr.insertCell(-1);
        cell.innerHTML = j + 1;

        //tr = tbody.insertRow(-1);
        cell = tr.insertCell(-1);
        cell.setAttribute("style", "position:sticky;position:-webkit-sticky;left:0px; box-shadow: inset 0 0 1px #000000");
        cell.innerHTML = arraydatatendik[j + 1][2];//"<span style='font-size:12px;' id='datakelas" + j + "'>" + datanama[j] + "</span>";

        //tr = tbody.insertRow(-1);
        cell = tr.insertCell(-1);
        cell.innerHTML = arraydatatendik[j + 1][22];//jabatan 22

        //tr = tbody.insertRow(-1);
        cell = tr.insertCell(-1);
        cell.innerHTML = arraydatatendik[j + 1][24].toUpperCase();//golongan ruang


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
                // // cell.setAttribute("onclick", "bantuabsen('" + encodenama + "_" + ke + "" + nolbulan + "" + y + "')");
                cell.setAttribute("onclick", "alert('Hanya Kepala sekolah yang berhak membantu absen')");

                cell.innerHTML = "<span style='font-size:10px' id='" + ke + "" + nolbulan + "" + y + "_" + encodenama + "'>x</span>";
            }
            ke++
        }
    }



    document.getElementById("rekapabsenguru").appendChild(tabel);
    document.getElementById("rekapabsenguru").innerHTML += `Keterangan Libur: <ul>`;
    arrayKeteranganLibur.forEach(m => {
        document.getElementById("rekapabsenguru").innerHTML += `<li> ${m} </li>`
    })
    document.getElementById("rekapabsenguru").innerHTML += `</ul>`;

    tetetetetetet(strdate);
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

const tetetetetetetlama = (ed) => {
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
                kodeid = jsonabsenkelasperbulan[i].idtanggal + "_" + encodeURIComponent(dataapiguru.filter(k => k.idabsen == jsonabsenkelasperbulan[i].idabsen)[0].guru_namalengkap);
                //  console.log(kodeid);
                //"<span style='font-size:10px' id='" + ke + "" + nolbulan + "" + y + "_" + ruangankelas + "_" + encodenama + "'>x</span>";

                kodetd = "td_" + encodeURIComponent(dataapiguru.filter(k => k.idabsen == jsonabsenkelasperbulan[i].idabsen)[0].guru_namalengkap) + "_" + jsonabsenkelasperbulan[i].idtanggal;
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
                            var idpoto = idlogo;
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

                        //"Aksi";
                        //"bantuabsen('" + encodenama + "_" + ke + "" + nolbulan + "" + y + "')";




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

function bantuabsenlama(encodenama) {


    var teks = encodenama;
    var split = teks.split("_");
    var kodenama = split[0];
    var tgl = split[1];
    var strtgl = balikinidok(tgl);
    modalkameraabsen.style.display = "block";
    //belumabsenkehadiranguru.style.display = "block";
    namagurupiket.innerHTML = decodeURIComponent(kodenama);

    document.querySelector(".ketabsenkehadiranguru").innerHTML = tanggalfull(new Date(strtgl));
    let kodedivpoto = document.querySelector("#datakirimgurupiket")
    kodedivpoto.innerHTML = "";

    tempatidok.value = tgl;
    tempatidabsen.value = dataapiguru.filter(k => k.guru_namalengkap == decodeURIComponent(kodenama))[0].idabsen;
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

    let idok = tglStringZero();//tempatidok.value;
    //let constidguruabsen = tempatidabsen.value;
    document.querySelector(".ketabsenkehadiranguru").innerHTML = "<i class='fa fa-refresh fa-spin w3-large'></i>";
    //belumabsenkehadiranguru.style.display = "none";


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
    fetch(linktendik + "?action=guruisiabsen", { method: 'post', body: data })
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
            setTimeout(() => {
                modalkameraabsen.style.display = "none";
                //refreshAbsenHariIni();
                kehadiranguru();
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




const arrayrombel = () => {
    let arraykelas = jsondatasiswa.map(m => m.nama_rombel).filter((a, b, c) => c.indexOf(a) == b)
    // let tes = [];
    // for (i = 0; i < dataapiguru.length; i++) {
    //     let obj = dataapiguru[i];
    //     let namakelas = (obj.kelas == "Kepala Sekolah" || obj.kelas == "Operator Sekolah" || obj.kelas == "TU" || obj.kelas == "Penjaga" || obj.kelas == "PJOK" || obj.kelas == "PAI" || obj.kelas == "PKRIS" || obj.kelas == "BSUND" || obj.kelas == "PKATO" || obj.kelas == "PHIND" || obj.kelas == "PBUDH" || obj.kelas == "PKONG") ? "" : obj.kelas;

    //     if (arraykelas.indexOf(namakelas) == -1 && namakelas !== "") {
    //         //if (namakelas !== "") {
    //         arraykelas.push(namakelas)

    //         tes.push(arraykelas.indexOf(namakelas))
    //         //}

    //     }
    // }
    // console.log(arraykelas.sort());
    // console.log(tes);
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

const modalfnkalenderkehadirangurupribadi = () => {
    let x = document.getElementById("daftarpilihbulankehadirangurupribadi").selectedIndex;
    let y = document.getElementById("daftarpilihbulankehadirangurupribadi").options;
    //alert("Index: " + y[x].index + " is " + y[x].text + " dan value = " + y[x].value);
    if (y[x].value == "") {
        alert("Silakan pilih bulannya untuk mengetahui daftar piket Anda.");
        return
    }
    let namabulan = y[x].text.replace(/\s+\d+/,"");
    modalnamabulan.innerHTML = namabulan.toUpperCase();// + " 2021";

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
        td.innerHTML += `<div id="td_${constidguruabsen}_${idok}"></div>`

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
    if (ket.length == 0) {
        ketketliburkehadirangurupribadi.innerHTML = ""
    } else {
        ketketliburkehadirangurupribadi.innerHTML = ket.join("<br>")
    }
    //console.log(ket)
    let datee = StringTanggal2(notgl);
    dataabsenbulanan(datee, namabulan)
}


const cocoklibur = (tgl) => { /// bolean
    let k = JSON.parse(localStorage.getItem("TglLibur"))
    // let d = JSON.parse(localStorage.getItem("Ketlibur"))
    let arrayStringTglLibur = k.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
    //console.log(arrayStringTglLibur);
    //let arrayKetLibur = k.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

    let str = StringTanggal2(new Date(tgl))

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

    let str = StringTanggal2(new Date(tgl))

    let inte = arrayStringTglLibur.indexOf(str);
    let arr = ''

    if (inte > -1) {
        arr = arrayKetLibur[inte]

    }

    return arr
}

const dataabsenbulanan = async (datee, namabulan) => {
    await fetch(linkkehadiranguru + "?action=rekapbulan&idguruabsen=" + constidguruabsen + "&strtgl=" + datee)
        .then(m => m.json())
        .then(k => {
            rekapabsensiswabulanan = k[namabulan];
            for (var i = 0; i < rekapabsensiswabulanan.length; i++) {
                let kodetd = "td_" + encodeURIComponent(rekapabsensiswabulanan[i].idabsen) + "_" + rekapabsensiswabulanan[i].idtanggal;
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
                        isikehadiran.innerHTML = `<img class="w3-image" src="https://drive.google.com/uc?export=view&id=${linksplitt}" style="width:20px; height:30px;cursor:pointer" alt="poto" onclick="klikpotoguru(this,'${rekapabsensiswabulanan[i].kehadiran}<br/>${rekapabsensiswabulanan[i].timestamp}')"/><br/>${rekapabsensiswabulanan[i].kehadiran}`;
                    }
                    
                }
            }
        }).catch(er => {
            console.log(er)
        })

}
let tabuploadmeme = document.querySelector(".uploadmeme");
let tabsimulasi = document.querySelector(".simulasimeme");
const previewmemetemplate = () => {
    let item = document.getElementById("uploadmemetemplate").files[0];
    let div = document.getElementById("previewuploadmeme");
    let rd = new FileReader()
    rd.onload = function (e) {
        div.innerHTML = `<img src="${e.target.result}" class="w3-image"/>`
    }
    rd.readAsDataURL(item);

}

function uploadmm() {
    var files = document.getElementById("uploadmemetemplate").files;
    var untuksiapa = document.getElementById("untuksiapainitemplate").value;
    var keterangan = document.getElementById("keterangantemplate").value;
    // console.log(files.length)
    // if(files[0] == "")
    if (files.length == 0 || untuksiapa == "" || keterangan == "") {
        alert("Maaf, data gambar belum bisa diunggah. Pastikan semua data terisi");
        return
    }
    let namafile = files[0].name;

    //console.log(namafile)
    if (files.length > 0) {

        var formData = new FormData();
        formData.append("file", files[0]);

        var xhttp = new XMLHttpRequest();

        // Set POST method and ajax file path
        xhttp.open("POST", "/send.php", true);

        // call on request changes state
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                var response = this.responseText;
                if (response == 1) {

                    //disini akan dipanggil lagi data tulis
                    simpanmemekespreadsheet(namafile, "aktif", untuksiapa, keterangan)

                } else {
                    alert("File not uploaded.");
                }
            }
        };

        // Send request with data
        xhttp.send(formData);

    } else {
        alert("Please select a file");
    }


};

const simpanmemekespreadsheet = (a, b, c, d) => {
    let data = new FormData();
    data.append("htmlgambar", a);
    data.append("aktif", b);
    data.append("untuk", c);
    data.append("keterangan", d);
    fetch(linkmateri + "&action=tambahtemplate", {
        method: "post",
        body: data
    }).then(m => m.json())
        .then(k => {
            alert(k.result + " (Upload successfully) ");
            document.getElementById("previewuploadmeme").innerHTML = "";
            document.getElementById("keterangantemplate").value = "";
            tabuploadmeme.click();
        }).catch(er => alert(er))

}

let koleksinamafileuploaded;

let divtabelmeme = document.getElementById("tableuploadedmeme");
tabuploadmeme.addEventListener("click", function () {
    koleksinamafileuploaded = [];
    fetch(linkmateri + "&action=datatemplate&jenisuser=All")
        .then(m => m.json())
        .then(k => {
            //console.log(k);

            let tekshtml = `<h3>Tabel Template yang telah dibuat</h3><table class="versi-table">
       <thead>
       <tr>
       <th>No</th>
       <th>Keterangan</th>
       <th>Preview</th>
       <th>Diterbitkan untuk</th>
       <th>Aksi</th>
       </tr>
       </thead>
       <tbody>
       `;
            for (i = 0; i < k.records.length; i++) {
                koleksinamafileuploaded.push(k.records[i].htmlgambar);
                let terbitkantidak = (k.records[i].status == "aktif") ? `<button class="w3-button w3-tiny w3-red" onclick="publikasikandraft(${k.records[i].idmeme},'hapus')">Jadikan Draft</button>` : `<button class="w3-button w3-tiny w3-green" onclick="publikasikandraft(${k.records[i].idmeme},'aktif')">Publikasikan</button>`;
                tekshtml += `
           <tr>
                <td>${i + 1}</td>
                <td>${k.records[i].keterangan}</td>
                <td><img src="/memetemplate/${k.records[i].htmlgambar}" class="w3-image"  onclick="klikgambarmeme(this,'${k.records[i].keterangan}<br/>Untuk ${k.records[i].untuk}')"/>
                <br/><sub>Nama file : ${k.records[i].htmlgambar}</sub>
                </td>
                <td>${k.records[i].untuk}</td>
                <td>${terbitkantidak}</td>
            </tr>
           `;
            }
            tekshtml += `</tbody></table>`;
            divtabelmeme.innerHTML = tekshtml;

        })
        .catch(er => console.log(er))
})


const klikgambarmeme = (el, pesan) => {

    document.getElementById("img01").src = el.src;
    document.getElementById("previewpotoabsen").style.display = "block";
    document.getElementById("pesanpreviewpotoabsen").innerHTML = pesan.split("<br/>")[0] + "<br/>" + pesan.split("<br/>")[1];

}

tabsimulasi.addEventListener("click", function () {
    let div1 = document.getElementById("kesiapanmeme");
    let div2 = document.getElementById("pilihframe");
    div1.innerHTML = "<i class='fa fa-refresh fa-spin'></i> Mohon tunggu sebentar. Sedang ngopi Liong dulu servernya ..."

    document.getElementById("potomeme").src = "https://drive.google.com/uc?export=view&id=" + idlogo;
    document.getElementById("downloadmeme").className = document.getElementById("downloadmeme").className.replace("w3-show", "w3-hide");
    document.getElementById("downloadmeme").removeAttribute("onclick");

    // let tekshtml = `<option value="0" selected="">Silakan Pilih Frame</option>
    //         <option value="/memetemplate/23rt.png" >Tema 1</option>
    //         <option value="/memetemplate/sukseskanlombafls2nkotadepok.png" >Tema 2 New</option>
    //         `;

    // div2.innerHTML = tekshtml;
    // div1.innerHTML = " Kreasikan Poto Anda di sini:";

    fetch(linkmateri + "&action=datatemplate&jenisuser=Guru")
        .then(m => m.json())
        .then(k => {
            console.log(k);
            let datafilter = k.records.filter(k => k.status == "aktif");
            let tekshtml = `<option value="0" selected="">Silakan Pilih Frame</option>`;
            for (let i = datafilter.length - 1; i >= 0; i--) {
                if (i == datafilter.length - 1) {

                    tekshtml += `<option value="/memetemplate/${datafilter[i].htmlgambar}">${datafilter[i].keterangan} <b class="w3-text-red">[Baru]</b></option>`;
                } else {

                    tekshtml += `<option value="/memetemplate/${datafilter[i].htmlgambar}">${datafilter[i].keterangan}</option>`
                }
            }
            div2.innerHTML = tekshtml;
            div1.innerHTML = " Kreasikan Poto Anda di sini:";

        })
        .catch(er => console.log(er))
})

const frameeditor = () => {
    tampilinsublamangurukelas("meme")
    let m = JSON.parse(localStorage.getItem("typeuser"));
    if (m.jenjang == "Penjaga Sekolah") {
        document.querySelector(".simulasimeme").click()
    } else {
        document.querySelector(".petunjukmeme").click()
    }
}

const publikasikandraft = (id, aktif) => {
    let data = new FormData();
    data.append("status", aktif)
    data.append("idmeme", id)
    fetch(linkmateri + "&action=publikasitemplate", {
        method: "post",
        body: data
    })
        .then(m => m.json())
        .then(k => {
            console.log(k)
            let teks = (k.result == "aktif") ? "dipublikasikan" : "dihapus";
            alert("Template berhasil " + teks);
            tabuploadmeme.click()

        })
        .catch(er => alert("Ups, terjadi kesalahan. Pesan error: " + er))
}

//////////////////////////// akreditasi ////////////////

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

const onCnguploaditemGAGAL = (btr, r, snp) => {
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
const uplitemakeditasiGAGAL = async (btr, indexrow, snp) => {
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
            console.log(k);
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
    // var datasiswadiv = document.getElementById("datasiswaprint");
    var datasiswadiv = document.getElementById("datasiswaprint");

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

const absensisiswa = () => {
    try {
        alldatabukuinduk();
        tampilinsublamangurukelas("kesiswaan");
        document.querySelector(".tabkesiswaan1").click();
        let div = document.querySelector(".face_divdatabasesiswa");
        let arr = JSON.parse(localStorage.getItem("datasiswa_all"))["datasiswa"];
        let perluverifikasi = informasiusulandata["usulanbaru"]; //.filter(s => s.usulanperubahandata.indexOf);
        let sudahverifikasi = informasiusulandata["usulandisetujui"]; //.filter(s => s.usulanperubahandata.indexOf);

        let html = `<table class="versi-table w3-tiny tabel_db_siswa" style="margin-left:2px;margin-right:5px"><thead>
    <tr>
    <th rowspan="2">Aksi</th>
       
        <th rowspan="2">No Urut</th>
        <th rowspan="2">ID Token</th>
        <th colspan="2">Jenjang dan Rombel</th>
        <th colspan="4">Penomoran</th>
        <th rowspan="2">Nama Siswa</th>
        <th rowspan="2">Jenis Kelamin</th>
        <th colspan="2">Tempat Tanggal Lahir</th>
        <th rowspan="2">Agama</th>
        <th colspan="2">Data Orang Tua</th>
        <th rowspan="2">Alamat</th>
        <th rowspan="2">No Handphone</th>
            
            </tr>
            <tr>
            
            
                    <th>Jenjang</th>
                    <th>Rombel</th>
        
        <th>NIS</th>
        <th>NISN</th>
        <th>NIK</th>
        <th>No KK</th>
        <th>Tempat</th>
        <th>Tanggal Lahir</th>

        <th>Nama Ayah</th>
        <th>Nama Ibu</th>
        </tr>
      
    </thead>
    <tbody>`;
        for (i = 0; i < arr.length; i++) {
            let tls = (arr[i].pd_tanggallahir == "") ? "" : tanggalfull(arr[i].pd_tanggallahir);
            let btnDetail, btnEdit;
            if (perluverifikasi.filter(s => s.id == arr[i].id).length > 0) {
                //bbt.setAttribute("class", "w3-button w3-red w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right");
                btnDetail = `<button onclick="detailformulir('${arr[i].id}')" title="Info Detail" class="w3-button w3-red w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right"><i class="fa fa-info-circle"></i></button>`;
            } else {
                //bbt.setAttribute("class", "w3-button warnaeka w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right");
                btnDetail = `<button onclick="detailformulir('${arr[i].id}')" title="Info Detail" class="w3-button warnaeka w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right"><i class="fa fa-info-circle"></i></button>`;
            };
            if (sudahverifikasi.filter(s => s.id == arr[i].id).length > 0) {

                btnEdit = "";//`<button onclick="editsiswa('${i}')" title="Simpan Perubahan" class="w3-button w3-light-green w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right"><i class="fa fa-save"></i></button>`;
            } else {
                btnEdit = "";//`<button onclick="editsiswa('${i}')" title="Simpan Perubahan" class="w3-button warnaeka w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right"><i class="fa fa-save"></i></button>`;
            }
            html += `<tr>
       <td>
                ${btnDetail}${btnEdit}
                
            
            </td>
        
            <td>${i + 1}</td>
            <td>${arr[i].id}</td>
            <td>${arr[i].jenjang}</td>
            <td>${arr[i].nama_rombel}</td>
            <td>${arr[i].nis}</td>
            <td>${arr[i].nisn}</td>
            <td>${arr[i].nik}</td>
            <td>${arr[i].nokk}</td>
            <td>${arr[i].pd_nama}</td>
            <td>${arr[i].pd_jk}</td>
            <td>${arr[i].pd_tl}</td>
            <td onclick="edittanggalsiswa('${i}','12')">${tls}</td>
            <td>${arr[i].pd_agama}</td>
            <td>${arr[i].pd_namaayah}</td>
            <td>${arr[i].pd_namaibu}</td>
            <td>${arr[i].pd_alamat}</td>
            <td>${arr[i].pd_hp}</td>
            
            
        </tr>
            `;

        }
        html += `</tbody></table>`
        div.innerHTML = html;
        // console.log(dbaktif);
        document.querySelector(".status_divdatabasesiswa").innerHTML = "Database Aktif Sekolah Anda Saat Ini";
        let wid = document.querySelector(".tabel_db_siswa").offsetWidth + 26;
        //  let divscroll = document.getElementById("scrolltabelabsenrekap");
        let isidivscroll = document.getElementById("isiscrolldatabasesiswa");
        isidivscroll.setAttribute("style", `width:${wid}px;height:5px;`);

    } catch (er) {
        alert('Data Belum siap. Tunggu proses loading selesai');
        tampilinsublamangurukelas("beranda");
        console.log(er)
    }

}

let scrdbase1 = document.getElementById("scrolldatabasesiswa");
let scrdbase2 = document.querySelector(".face_divdatabasesiswa");

scrdbase1.onscroll = function () {
    scrdbase2.scrollLeft = scrdbase1.scrollLeft;
};
scrdbase2.onscroll = function () {
    scrdbase1.scrollLeft = scrdbase2.scrollLeft;
};
const tambahkriteria = () => {
    let div = document.querySelector(".sortirsortir");
    let array = ["id",
        "jenjang", "nama_rombel", "nis", "nisn", "nik",
        "nokk", "pd_nama", "pd_jk", "pd_tl", "pd_tanggallahir",
        "pd_agama", "pd_namaayah", "pd_namaibu",
        "pd_alamat", "pd_hp", "aktif", "dok_kip", "dok_kks", "dapo_kpspkh", "dapo_bank","dapo_jenjangpendidikanayah"];
    let arrayArti = ["Kode Token",
        "Jenjang", "Rombel", "NIS", "NISN", "NIK",
        "No Kartu Keluarga", "Nama Siswa", "Jenis Kelamin", "Tempat Lahir", "Tanggal Lahir",
        "Agama Siswa", "Nama Ayah", "Nama Ibu",
        "Alamat", "No HP", "Aktif", "Punya KIP", "Punya KKS", "Punya KPS/PKH", "Bank PIP","Pendidikan Ayah"];
    //cari array
    let divcari = document.querySelectorAll(".kriteria_dinamis");
    for (i = 0; i < divcari.length; i++) {
        let el = divcari[i];
        let valueada = el.options[el.selectedIndex].value;
        //console.log(valueada);
        let indekada = array.indexOf(valueada);
        //console.log(indekada);
        array.splice(indekada, 1)
        arrayArti.splice(indekada, 1)
    }
    // console.log(array);
    if (array.length == 0) {
        alert("Sudah tidak ada kriteria lagi untuk dijadikan kriteria short");
        return;
    }
    let html = `
    <select class="w3-select w3-col l2 s2 w3-left w3-border w3-border-blue kriteria_dinamis" onchange="tambah_input_kriteria('${divcari.length + 1}')" >
    `
    for (j = 0; j < array.length; j++) {
        if (j == 0) {
            html += `<option value='${array[j]}'  selected>${arrayArti[j]}  </option>`
        } else {
            html += `<option value='${array[j]}' >${arrayArti[j]}  </option>`
        }
    }
    html += `</select>
    <input class="w3-input  w3-col l10 s10  w3-right w3-border w3-border-red classinputkriteria_${divcari.length + 1}" placeholder="Masukan nilai kriteria ${arrayArti[0]} yang ingin dicari. Gunakan tanda <> untuk mencari nilai selainnya." />
    
    `;
    div.innerHTML += html;
    let elakhir = document.querySelectorAll(".kriteria_dinamis");
    let divhilang = document.querySelector(".hapus_dinamis")
    if (elakhir.length >= 2) {
        divhilang.className = divhilang.className.replace("w3-hide", "w3-show");
    } else {
        divhilang.className = divhilang.className.replace("w3-show", "w3-hide");

    }
    //onsole.log(elakhir.length)
}

const tambah_input_kriteria = (id) => {
    let indek = id - 1;
    let elselect = document.querySelectorAll(".kriteria_dinamis")[indek]
    let opp = elselect.options;
    let sel = elselect.selectedIndex;

    let div = document.querySelector(".classinputkriteria_" + id);
    div.placeholder = `Masukan nilai kriteria ${opp[sel].text} yang ingin dicari. Gunakan tanda <> untuk mencari nilai selainnya.`;
}
const hapuskriteria = () => {
    let elakhir = document.querySelectorAll(".kriteria_dinamis");
    let inputakhir = document.querySelector(".classinputkriteria_" + elakhir.length)
    inputakhir.remove();
    elakhir[elakhir.length - 1].remove();
    let afakhir = document.querySelectorAll(".kriteria_dinamis");
    // console.log(afakhir.length);
    let elini = document.querySelector(".hapus_dinamis");
    if (afakhir.length === 1) {
        elini.className = elini.className.replace("w3-show", "w3-hide")
    }

}
const carikriteria = () => {
    let sel1 = document.querySelectorAll(".kriteria_dinamis")[0];
    let sel1_ops = sel1.options;
    let sel1_selected = sel1.selectedIndex;
    let vv = sel1_ops[sel1_selected].value;
    let vT = sel1_ops[sel1_selected].text;
    let perluverifikasi = informasiusulandata["usulanbaru"]; //.filter(s => s.usulanperubahandata.indexOf);
    let sudahverifikasi = informasiusulandata["usulandisetujui"]; //.filter(s => s.usulanperubahandata.indexOf);

    let tbdy = document.querySelector(".tabel_db_siswa").getElementsByTagName("tbody")[0];
    let arrb = [];
    let arr = [];
    if (vv == "aktif") {
        // arrb = JSON.parse(localStorage.getItem("datasiswa_all"))["datasiswa"];
        arrb = db_utama_siswa.filter(s => s.aktif == "aktif");
       
    } else {
        // arrb = JSON.parse(localStorage.getItem("datasiswatidakaktif"))["datasiswa"]
        arrb = db_utama_siswa.filter(s => s.aktif == vv);
       
    }
    let html = "";
    let krit_n = "";
    let nil_k = "";
    let i_ind = "";

    let prm_filter = "";
    // let plh_krit = document.querySelectorAll(".kriteria_dinamis");
    let plh_krit = document.getElementsByClassName("kriteria_dinamis");
    if (plh_krit.length == 1) {
        prm_filter = vT;
        arr = arrb;
    } else {
        prm_filter = vT;
        for (a = 1; a < plh_krit.length; a++) {
            let ops = plh_krit[a].options;
            let slctd = plh_krit[a].selectedIndex;
            krit_n = ops[slctd].value;
            let krit_t = ops[slctd].text;
            i_ind = (a + 1);
            let cektanda = document.querySelector(".classinputkriteria_" + i_ind).value;
            //nil_k = document.querySelector(".classinputkriteria_" + i_ind).value;
            let kosong;
            if (cektanda.indexOf("<>") > -1) {
                nil_k = cektanda.replace("<>", "")

                kosong = (nil_k == "") ? "Tidak diisi" : nil_k;
                prm_filter += `, ${krit_t} selain ${kosong}`;
                if (nil_k == "") {
                    arr = arrb.filter(k => k[krit_n] !== "");

                } else {
                    arr = arrb.filter(k => k[krit_n] !== nil_k);

                }
            } else {
                nil_k = cektanda;
                kosong = (nil_k == "") ? "Tidak diisi" : nil_k;
                prm_filter += `, ${krit_t} = ${kosong}`;
                arr = arrb.filter(k => k[krit_n] == nil_k);
            }



            arrb = arr;
            //a++
        }
        //while (a < arrb.length)
    }
    //    console.log(arr)

    if (arr.length == 0) {
        html += `<tr>
        <td class="w3-red" colspan="19"> Anda tidak memiliki database dengan kriteria ${prm_filter} </td>
        </tr>`;
    } else {
        for (i = 0; i < arr.length; i++) {
            let tls = (arr[i].pd_tanggallahir == "") ? "" : tanggalfull(arr[i].pd_tanggallahir);
            let btnDetail, btnEdit;
            if (perluverifikasi.filter(s => s.id == arr[i].id).length > 0) {
                //bbt.setAttribute("class", "w3-button w3-red w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right");
                btnDetail = `<button onclick="detailformulir('${arr[i].id}')" title="Info Detail" class="w3-button w3-red w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right"><i class="fa fa-info-circle"></i></button>`;
            } else {
                //bbt.setAttribute("class", "w3-button warnaeka w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right");
                btnDetail = `<button onclick="detailformulir('${arr[i].id}')" title="Info Detail" class="w3-button warnaeka w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right"><i class="fa fa-info-circle"></i></button>`;
            };
            if (sudahverifikasi.filter(s => s.id == arr[i].id).length > 0) {

                btnEdit ="";//`<button onclick="editsiswa('${i}')" title="Simpan Perubahan" class="w3-button w3-light-green w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right"><i class="fa fa-save"></i></button>`;
            } else {
                btnEdit = "";//`<button onclick="editsiswa('${i}')" title="Simpan Perubahan" class="w3-button warnaeka w3-round w3-card-4 w3-border-bottom w3-border-black w3-border-right"><i class="fa fa-save"></i></button>`;
            }
            html += `<tr>
       <td>
                ${btnDetail}${btnEdit}
                
            
            </td>
        
            <td>${i + 1}</td>
            <td>${arr[i].id}</td>
            <td contenteditable="true">${arr[i].jenjang}</td>
            <td contenteditable="true">${arr[i].nama_rombel}</td>
            <td contenteditable="true">${arr[i].nis}</td>
            <td contenteditable="true">${arr[i].nisn}</td>
            <td contenteditable="true">${arr[i].nik}</td>
            <td contenteditable="true">${arr[i].nokk}</td>
            <td contenteditable="true">${arr[i].pd_nama}</td>
            <td contenteditable="true">${arr[i].pd_jk}</td>
            <td contenteditable="true">${arr[i].pd_tl}</td>
            <td contenteditable="true" onclick="edittanggalsiswa('${i}','12')">${tls}</td>
            <td contenteditable="true">${arr[i].pd_agama}</td>
            <td contenteditable="true">${arr[i].pd_namaayah}</td>
            <td contenteditable="true">${arr[i].pd_namaibu}</td>
            <td contenteditable="true">${arr[i].pd_alamat}</td>
            <td contenteditable="true">${arr[i].pd_hp}</td>
                

            </tr>
            `;
        }
    }
    tbdy.innerHTML = html;
    document.querySelector(".status_divdatabasesiswa").innerHTML = "Database dalam bentuk pencarian berdasarkan kriteria: " + prm_filter;
};

const edittanggalsiswa = (r, c) => {
    //alert("Baris ke-" + r + "\n\n Kolom ke-" + c);
    modaltanggal.style.display = "block";
    let namatabel = document.querySelector(".tabel_db_siswa").getElementsByTagName('tbody')[0];
    let namaheader = "Tanggal Lahir";
    let tgl = formatbalikin(namatabel.rows[r].cells[c].innerHTML);
    let balikintanggal = StringTanggal(new Date(tgl));
    //let teks = "ini data headerr yang diklik adalah " + namaheader;

    let teks = "<h3 class='w3-center'>Ubah " + namaheader + "</h3>";
    teks += namatabel.rows[r].cells[9].innerHTML + "<hr/>";
    teks += `<input type="date" class="w3-input" id="valuetanggal" onchange="modalubahtanggal()" value="${balikintanggal}"/>`
    teks += `<hr/><span id="translettgl">${tanggalfull(tgl)}</span><hr/>`;
    teks += `<button onclick="tanggalokesiswa(${r},${c})">Simpan</button><hr/>`;
    teks += `<button onclick="hapustanggalsiswa(${r},${c})">Hapus</button><hr/>`;
    //

    dataubahtanggal.innerHTML = teks;
    //valuetanggal.value = balikintanggal;

}


const tanggalokesiswa = (r, c) => {
    let namatabel = document.querySelector(".tabel_db_siswa").getElementsByTagName('tbody')[0];;
    let kolomtahun;// = namatabel.rows[c].cells[15].innerHTML;
    let tanggal = document.getElementById("valuetanggal");
    //kolomtahun = namatabel.rows[c].cells[15].innerHTML;

    namatabel.rows[r].cells[c].innerHTML = tanggalfull(tanggal.value);



    tutupmodaltanggal.click();
}


const hapustanggalsiswa = (r, c) => {
    let namatabel = document.querySelector(".tabel_db_siswa").getElementsByTagName('tbody')[0];;
    namatabel.rows[r].cells[c].innerHTML = "";
}



async function editsiswa(y) {
    loadingtopbarin("loadingtopbar");
    let tab = document.querySelector(".tabel_db_siswa").getElementsByTagName("tbody")[0];
    let tr = tab.rows[y];
    let id = parseInt(tr.cells[2].innerHTML);
    let jenjang = tr.cells[3].innerHTML.replace(/\s+|<br>/g, "");
    let rombel = tr.cells[4].innerHTML.replace(/\s+|<br>/g, "").toUpperCase();
    let nis = tr.cells[5].innerHTML.replace(/\s+|<br>/g, "");
    let nisn = tr.cells[6].innerHTML.replace(/\s+|<br>/g, "");
    let nik = tr.cells[7].innerHTML.replace(/\s+|<br>/g, "");
    let nokk = tr.cells[8].innerHTML.replace(/\s+|<br>/g, "");
    let nama = tr.cells[9].innerHTML.toUpperCase();
    let jk = tr.cells[10].innerHTML.toUpperCase()
    let tl = tr.cells[11].innerHTML.toUpperCase()
    let ttl = (tr.cells[12].innerHTML == "") ? "" : formatbalikin(tr.cells[12].innerHTML);
    let agama = tr.cells[13].innerHTML.toUpperCase()
    let ayah = tr.cells[14].innerHTML.toUpperCase()
    let ibu = tr.cells[15].innerHTML.toUpperCase()
    let alamat = tr.cells[16].innerHTML.toUpperCase()
    let hp = tr.cells[17].innerHTML.toUpperCase()
    let siswa = jsondatasiswa.filter(s => s.id == id)[0];
    siswa["jenjang"] = jenjang;
    siswa["nama_rombel"] = rombel;
    siswa["nis"] = nis;
    siswa["nisn"] = nisn;
    siswa["nik"] = nik;
    siswa["nokk"] = nokk;
    siswa["pd_nama"] = nama
    siswa["pd_jk"] = jk;
    siswa["pd_tl"] = tl;
    siswa["pd_tanggallahir"] = StringTanggal(ttl);
    siswa["pd_agama"] = agama;
    siswa["pd_namaayah"] = ayah;
    siswa["pd_namaibu"] = ibu;
    siswa["pd_alamat"] = alamat;
    siswa["pd_hp"] = hp;
    siswa["dieditoleh"] = namauser;

    delete siswa["time_stamp"];


    let pus = [];
    let key = arrayheadsumber.filter(s => s !== "time_stamp"); //array

    //Jika sebelumnya belum daftar ulang, maka API yang digunakan ini
    let databelumkirim = new FormData();
    for (let i = 0; i < key.length; i++) {
        pus.push(siswa[key[i]]);
        databelumkirim.append(key[i], siswa[key[i]]);
    }

    //Jika sebelumnya sudah daftar ulang, maka API yang digunakan ini
    let tabel = JSON.stringify(pus);
    let datakirim = new FormData();
    datakirim.append("tabel", tabel);
    datakirim.append("tokensiswa", id);
    datakirim.append("idss", jlo.ss_datauser);

    console.log(siswa);
    //periksa apakah datanya pernah mengusulkan atau tidak
    let cekusul = informasiusulandata["all"].filter(s => s.id == id)
    if (cekusul.length > 0) {
        //kirim kedua tab
        let jenjkelas = jenjang.match(/\d/g)[0]

        absenheader = "absen" + jenjkelas;
        url_absensiswa = jlo[absenheader];
        await fetch(url_absensiswa + "?action=daftarulangduasheet", {
            method: "post",
            body: datakirim
        })
            .then(m => m.json())
            .then(r => {
                //infoloadingljk.innerHTML = r.result;
                console.log(r)
                // let datasiswakelasini = r.datasiswa.filter(s => s.nama_rombel == idNamaKelas && s.aktif == "aktif");
                // // console.log(datasiswakelasini)
                // pararrayobjek = datasiswakelasini;
                // localStorage.setItem("datasiswa_" + ruangankelas, JSON.stringify(datasiswakelasini));



            })
            .catch(er => {
                console.log(er);

                // infoloadingljk.innerHTML = "Terjadi kesalahan";
            })
    } else {
        //kirim ke satu tab utama saja
        let aaa = linkDataUserWithIdss + "&action=editsiswa";
        await fetch(aaa, {
            method: "post",
            body: databelumkirim
        }).then(m => m.json())
            .then(f => {
                console.log(f);


            })
            .catch(er => {
                console.log(er);

            });
    }
    sinkronkandatasiswa();
    clearInterval(stoploadingtopbar);
    let divlod = document.querySelector(".loadingtopbar");
    divlod.style.width = "100%";
    setTimeout(() => {
        divlod.style.width = "1px"
        divlod.className += " w3-hide";
        alert("Berhasil tersimpan ke server. Perubahan yang ditampilkan di tabel mungkin saja belum berubah. Silakan klik tombol cari kriteria lagi")

    }, 3000);

};
async function hapussiswa(y) {
    alert("tokennya= " + y)
}







async function xxxxeditsiswa(y) {
    let konfirm = confirm("Apa Anda yakin ingin mengedit data siswa ini?\n\n Klik [OK] untuk mengedit\n\n Klik [CANCEL] untuk membatalkan");
    if (!konfirm) {
        return
    }
    new_loading.style.display = "block";
    let namatabel = document.querySelector(".tabel_db_siswa").getElementsByTagName('tbody')[0].rows[y];
    //let namaheader = namatabel.rows[0].cells[8].innerHTML;
    //alert(namaheader)
    let xid = namatabel.cells[2].innerHTML,
        xjenjang = namatabel.cells[3].innerHTML,
        xnama_rombel = namatabel.cells[4].innerHTML,
        xnis = namatabel.cells[5].innerHTML,
        xnisn = namatabel.cells[6].innerHTML,
        xnik = namatabel.cells[7].innerHTML,
        xnokk = namatabel.cells[8].innerHTML,
        xpdnama = namatabel.cells[9].innerHTML,
        xpdjk = namatabel.cells[10].innerHTML,
        xpdtl = namatabel.cells[11].innerHTML;
    let t = namatabel.cells[12].innerHTML;
    let dt = formatbalikin((t == "") ? "1 Juli 2019" : t);
    let xpdtgl = StringTanggal2(new Date(dt)),
        spdagama = namatabel.cells[13].innerHTML,
        spdayah = namatabel.cells[14].innerHTML,
        spdibu = namatabel.cells[15].innerHTML,
        spdalamat = namatabel.cells[16].innerHTML,
        spdhp = namatabel.cells[17].innerHTML,
        spdaktif = namatabel.cells[0].innerHTML,
        spdeditoleh = namauser;



    let data = new FormData();
    data.append("id", xid);
    data.append("jenjang", xjenjang);
    data.append("nama_rombel", xnama_rombel);
    data.append("nis", xnis);
    data.append("nisn", xnisn);
    data.append("nik", xnik);
    data.append("nokk", xnokk);
    data.append("pd_nama", xpdnama);
    data.append("pd_jk", xpdjk);
    data.append("pd_tl", xpdtl);
    data.append("pd_tanggallahir", xpdtgl);
    data.append("pd_agama", spdagama);
    data.append("pd_namaayah", spdayah);
    data.append("pd_namaibu", spdibu);
    data.append("pd_alamat", spdalamat);
    data.append("pd_hp", spdhp);
    data.append("aktif", spdaktif);
    data.append("dieditoleh", spdeditoleh);


    let aaa = linkDataUserWithIdss + "&action=editsiswa";
    await fetch(aaa, {
        method: "post",
        body: data
    }).then(m => m.json())
        .then(f => {

            alert(f);
            fetch(linkDataUserWithIdss + "&action=datakelasaktifall")
                .then(m => m.json())
                .then(k => {
                    jsondatasiswa = k.datasiswa;
                    localStorage.setItem("datasiswa_all", JSON.stringify(k));
                    alert('Database Berhasil Diperbaharui');
                }).catch(er => {
                    alert('terjadi kesalahan');
                    console.log(er)
                })


        })
        .catch(er => alert(er));
    new_loading.style.display = "none";
}
async function xxxxhapussiswa(id) {
    var konfirm = confirm("Siswa ini akan dihilangkan dari kelas Anda. \n \n Tapi data masih berada di database kami. \n \n Anda yakin ingin menghapusnya? id " + id)
    if (!konfirm) {
        return;
    }
    new_loading.style.display = "block";
    var url = linkDataUserWithIdss + "&action=hapussiswa";
    let data = new FormData();
    data.append("id", id);
    await fetch(url, {
        method: "post",
        body: data
    }).then(m => m.json())
        .then(s => {
            alert(s);

            fetch(linkDataUserWithIdss + "&action=datakelasaktifall")
                .then(m => m.json())
                .then(k => {
                    jsondatasiswa = k.datasiswa;
                    localStorage.setItem("datasiswa_all", JSON.stringify(k));
                    alert('Database Berhasil Diperbaharui');
                }).catch(er => {
                    alert('terjadi kesalahan');
                    console.log(er)
                })
            fetch(linkDataUserWithIdss + "&action=datasiswatidakaktif")
                .then(m => m.json())
                .then(kl => {
                    arraysiswatidakaktif = kl.datasiswa;
                    jumlahseluruhsiswadisekolah = kl.total
                    localStorage.setItem("datasiswatidakaktif", JSON.stringify(kl))


                }).catch(er => { console.log(er) })
        }).catch(er => console.log(er))
    new_loading.style.display = "none";
}

const exceldatabasexx = () => {
    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    var tabelhasil = document.createElement("table");
    tabelhasil.setAttribute("class", "versi-table");
    tabelhasil.setAttribute("id", "myTableCopy");

    var tabeleditt = document.querySelector(".tabel_db_siswa");


    var cln = tabeleditt.cloneNode(true);
    tabelhasil.appendChild(cln);
    datasiswadiv.appendChild(tabelhasil);
    var tabeledithead = document.getElementById("myTableCopy").getElementsByTagName("thead")[0];
    //tabeledithead.rows[0].deleteCell(1);
    var identitasbulanrekap = "SEMESTER " + idSemester + " TAHUN PELAJARAN " + idTeksTapel;

    var tabeledit = document.getElementById("myTableCopy").getElementsByTagName("tbody")[0];
    let tesjumlahbaris = tabeledit.rows.length;


    // for (i = 0; i < tabeledit.rows.length; i++) {
    //     for (j = 0; j < tabeledit.rows[i].cells.length; j++) {

    //         let teks = tabeledit.rows[i].cells[j].innerHTML.replace("<br/>", "")
    //         let tekss = teks.replace("poto", "")
    //         tabeledit.rows[i].cells[j].innerHTML = tekss;

    //     };


    // }
    let countcol = tabeledit.rows[0].cells.length;
    let brs = tabeledithead.insertRow(0)
    let sel = brs.insertCell(-1)
    sel.setAttribute("colspan", countcol);
    sel.setAttribute("style", "text-align:center");

    sel.innerHTML = "DATABASE SISWA " + idNamaSekolah.toUpperCase();

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


    brs = tabeledit.insertRow(rowcount)
    sel = brs.insertCell(-1)
    sel = brs.insertCell(-1) /// colom kedua ttd kepsek
    for (let a = 0; a < colcount - 7; a++) {
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
    }
    sel.setAttribute("colspan", 3);
    sel.innerHTML = "NIP. " + idNipKepsek;


    brs = tabeledit.insertRow(rowcount)
    sel = brs.insertCell(-1)
    sel = brs.insertCell(-1) /// colom kedua ttd kepsek
    for (let a = 0; a < colcount - 7; a++) {
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
    }
    sel.setAttribute("colspan", 3);
    sel.innerHTML = "<b><u>" + idNamaKepsek + "</u></b>";


    brs = tabeledit.insertRow(rowcount)
    brs = tabeledit.insertRow(rowcount)
    brs = tabeledit.insertRow(rowcount)

    brs = tabeledit.insertRow(rowcount)
    sel = brs.insertCell(-1);
    sel = brs.insertCell(-1) /// colom kedua ttd kepsek
    for (let a = 0; a < colcount - 7; a++) {
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
    }
    sel.setAttribute("colspan", 3);
    sel.innerHTML = "Kepala " + idNamaSekolah;



    brs = tabeledit.insertRow(rowcount)
    sel = brs.insertCell(-1)
    sel = brs.insertCell(-1) /// colom kedua ttd kepsek
    for (let a = 0; a < colcount - 7; a++) {
        sel = brs.insertCell(-1) /// colom kedua ttd kepsek
    }
    sel.setAttribute("colspan", 3);
    sel.innerHTML = jlo.kota + ", " + tanggalfull(new Date())


    brs = tabeledit.insertRow(rowcount)






    $("#myTableCopy").table2excel({
        name: idNamaSekolah,
        filename: "Database Siswa" + " ID FILE " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_judul: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 2,
        barisatas: 3,
        tabelmana: tesjumlahbaris
    });
    datasiswadiv.innerHTML = "";
}

const exceldatabase = () => {
    alert("Mengekspor Database berdasarkan kriteria  adalah mengekspor data berdasarkan database yang telah disimpan dan format sesuai dengan Database E-Lamaso (isi sesuai Dapodik). Jika Anda baru saja mengedit di laman tabel data siswa dan belum menyimpannya ke server, sebaiknya Anda simpan terlebih dahulu. File ini bisa digunakan untuk mengekspor ke Tabel (jika diperlukan)");

    var datasiswadiv = document.getElementById("datasiswaprint");
    datasiswadiv.innerHTML = "";
    let jud = document.querySelector(".status_divdatabasesiswa").innerHTML
    let html = `<table class="versi-table" id="myTableCopy">
    <tr>
    <th colspan="5">${jud}</th>
    <th colspan="${arrayheadsumber.length - 5}"></th></tr>
    <tr>`;
    //head
    for (let i = 0; i < arrayheadsumber.length; i++) {
        html += `<td>${arrayheadsumber[i]}</td>`;
    }
    html += `</tr>`;

    let dataid = document.querySelector(".tabel_db_siswa").getElementsByTagName("tbody")[0].rows;
    let arrid = [];
    for (let i = 0; i < dataid.length; i++) {
        let col = dataid[i].cells[2].innerHTML;
        arrid.push(col)

    }
    console.log(arrid);
    let datashow = jsondatasiswa.filter(s => arrid.indexOf(s.id) > -1)
    for (let j = 0; j < datashow.length; j++) {
        html += `<tr>`;
        let ob = datashow[j];
        for (k = 0; k < arrayheadsumber.length; k++) {
            let form_number = angkadistring.indexOf(arrayheadsumber[k])
            if (form_number > -1) {
                html += `<td>${(ob[arrayheadsumber[k]] == "") ? "" : "'" + ob[arrayheadsumber[k]]}</td>`;

            } else {
                let cek = arrayheadsumber[k];
                let isi = "";
                if (cek == "pd_tanggallahir" || cek == "dapo_tahunlahirwali" || cek == "dapo_tahunlahiribu" || cek == "dapo_tahunlahirayah") {

                    isi = (ob[cek] == "") ? "" : new Date(ob[cek]).getDate() + "/" + (new Date(ob[cek]).getMonth() + 1) + "/" + new Date(ob[cek]).getFullYear();
                } else {
                    isi = ob[cek]
                }
                html += `<td>${isi}</td>`;

            }
        }

        html += `</tr>`
    }

    datasiswadiv.innerHTML = html;

    let tesjumlahbaris = dataid.length;
    $("#myTableCopy").table2excel({
        name: idNamaSekolah,
        filename: "Database Siswa " + " ID FILE " + new Date().getTime(),
        fileext: ".xls",
        exclude_img: true,
        exclude_judul: true,
        exclude_links: true,
        exclude_inputs: true,
        preserveColors: true,
        jumlahheader: 1,
        barisatas: 1,
        tabelmana: tesjumlahbaris
    });
    datasiswadiv.innerHTML = "";
}

const printdatabase = () => {

    let isibody = document.querySelector(".face_divdatabasesiswa").outerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO DATABASE SISWA</title>`;
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

    body.innerHTML = "<h4 class='w3-center'>DATABASE SISWA " + idNamaSekolah.toUpperCase() + "</h3>";
    body.innerHTML += "<h4 class='w3-center'>SEMESTER " + idSemester + " TAHUN PELAJARAN " + idTeksTapel + "</h3>";
    body.innerHTML += isibody;
    body.innerHTML += '<br/><div style="float:right;position:relative;text-align:center"> ' + jlo.kota + ',' + tanggalfull(new Date()) + '<br/>Kepala ' + idNamaSekolah + '<br/><br/><br/><br/><b><u>' + idNamaKepsek + '</u></b><br/>NIP. ' + idNipKepsek + '</div>';

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}
const printdaftarsatu = () => {

    let isibody = document.querySelector("#htmldaftar2").outerHTML;
    let el = document.getElementById("iframeprint");
    let doc = el.contentDocument;
    // head, body
    let head = doc.head;
    let body = doc.body;
    //isikan HEAD dengan title, style, link, dll.
    head.innerHTML = `<title>E-LAMASO DAFTAR 2</title>`;
    head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += `<link rel="stylesheet" href="/css/w3.css">`;
    head.innerHTML += `<link rel="stylesheet" href="/css/stylegurukelas.css">`;
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
            height: 21cm;
            width: 29.7cm;
            margin: 10mm 10mm 10mm 10mm; 
            
        }
    }
    </style>`;
    body.innerHTML = isibody;
    // size: A4 landscape;
    //         max-height:100%;
    //         max-width:900px;



    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();

}

let daftarsatu = document.querySelector(".tabkesiswaan2");
daftarsatu.addEventListener('click', function () {
    let div = document.getElementById("divdaftar2");
    let html = `<div class="w3-border w3-border-blue w3-padding">Sub Menu:
    <button class="w3-button w3-teal w3-round" title="Print Laman ini" onclick="printdaftarsatu()"><i
            class="fa fa-print"></i></button>
</div>
<h3>Daftar 1 (Bagian 2)</h3>
<div id="htmldaftar2" style="overflow-x: hidden;font-size: 12px;border:.5pt solid black;padding:2px;background-color:white">
    <b>PEMERINTAH DAERAH KOTA DEPOK</b><br />
    <b>DINAS PENDIDIKAN KOTA DEPOK</b><br />
    <b>KECAMATAN CIPAYUNG</b><br />
    <b>LAPORAN BULANAN</b><br />
    <div>
        <div class="w3-left">
            <table>
                <tr>
                    <td>Keadaan Tanggal</td>
                    <td>:</td>
                    <td contenteditable="true" class="df1_1 w3-border w3-border-black  w3-padding-small">
                       ${tanggalfull(new Date())}
                    </td>
                </tr>
            </table>
        </div>
        <div class="w3-left" style="width: 10%;color:white">&bnsp;</div>
        <div class="w3-left">
            <table>
                <tr>
                    <td>KODE SEKOLAH</td>
                    <td>:</td>
                    <td contenteditable="true" data-getkey="kodesekolah" class="w3-border w3-border-black w3-padding-small"
                        colspan="4">000</td>
                </tr>
                <tr>
                    <td>NAMA SEKOLAH</td>
                    <td>:</td>
                    <td contenteditable="true"  class="df1_2 w3-border w3-border-black  w3-padding-small"
                        colspan="4">${idNamaSekolah.toUpperCase()}
                    </td>
                </tr>
                <tr>
                    <td>NIS/NSS/NPSN</td>
                    <td>:</td>
                    <td contenteditable="true" dataset-getkey="gabungan_nis_nss_npsn" class="df1_2 w3-border w3-border-black  w3-padding-small"
                        colspan="4">000000
                    </td>
                </tr>
                <tr>
                    <td>STATUS SEKOLAH</td>
                    <td>:</td>
                    <td contenteditable="true"  data-getkey="statussekolah"  class="df1_2 w3-border w3-border-black  w3-padding-small">
                        NEGERI
                    </td>
                    <td>AKREDITASI</td>
                    <td>:</td>
                    <td contenteditable="true"  data-getkey="akreditasi" class="df1_2 w3-border w3-border-black  w3-padding-small">A
                    </td>
                </tr>
            </table>
        </div>

        <div class="w3-right ">
            <table>
                <tr>
                    <td>Tahun Pendirian</td>
                    <td>:</td>
                    <td contenteditable="true" data-getkey="tahunpendirian"  class="w3-border w3-border-black" style="padding:5px"
                        colspan="3">1900</td>
                </tr>
                <tr>
                    <td>No Ijin Operasional</td>
                    <td>:</td>
                    <td contenteditable="true"  data-getkey="noijin" class="w3-border w3-border-black" style="padding:5px" colspan="3">
                        </td>
                        </tr><tr>
                    <td>Tanggal</td>
                    <td>:</td>
                    <td contenteditable="true"  data-getkey="tanggal" class="w3-border w3-border-black" style="padding:5px" colspan="3">
                        1900</td>
                </tr>
                <tr>
                    <td>Alamat: Jln/Kmp.</td>
                    <td>:</td>
                    <td contenteditable="true"  data-getkey="alamat" class="w3-border w3-border-black" style="padding:5px"
                        colspan="3"></td>
                </tr>
                <tr>
                    <td>Kelurahan</td>
                    <td>:</td>
                    <td contenteditable="true" data-getkey="kelurahan"class="w3-border w3-border-black" style="padding:5px" colspan="3"></td>
                </tr>
                <tr>
                    <td>Telepon</td>
                    <td>:</td>
                    <td contenteditable="true" data-getkey="telepon" class="w3-border w3-border-black" style="padding:5px" colspan="3">
                        00000</td></tr><tr>
                    <td>Email</td><td>:</td>
                    <td contenteditable="true" data-getkey="email" class="w3-border w3-border-black" style="padding:5px" colspan="3">
                        ${idNamaSekolah.toLowerCase().replace(/\s+/g, "")}@gmail.com</td>
                </tr>
            </table>
        </div>
    </div>

    <div class="w3-clear">
        <b>A. KEADAAN MURID</b>
        <table class="tabelbiasa" style="font-size:8px !important;">>
            <thead class="w3-light-gray">
                <tr>
                    <th rowspan="3">TINGKAT</th>
                    <th rowspan="3">JML <br/>ROMBEL</th>
                    <th rowspan="2" colspan="3">KEADAAN AWAL BULAN</th>
                    <th rowspan="2" colspan="2">KELUAR BULAN INI</th>
                    <th rowspan="2" colspan="2">MASUK BULAN INI</th>
                    <th rowspan="2" colspan="3">KEADAAN AKHIR BULAN</th>
                    <th colspan="7">ALASAN KELUAR</th>
                    <th colspan="7">UMUR SISWA</th>
                    <th colspan="13">SISWA MENURUT AGAMA</th>
                    <th colspan="4">KEWARGANEGARAAN</th>
                </tr>
                <tr>
                    <th colspan="2">Pindah</th>
                    <th colspan="2">DO</th>
                    <th colspan="2">Lulus / Lainnya</th>
                    <th rowspan="2">JML</th>

                    <th colspan="2">&le;6Th</th>
                    <th colspan="2">7-12Th</th>
                    <th colspan="2">&ge;13Th</th>
                    <th rowspan="2">JML</th>

                    <th colspan="2">ISLAM</th>
                    <th colspan="2">KRISTEN</th>
                    <th colspan="2">KATOLIK</th>
                    <th colspan="2">HINDU</th>
                    <th colspan="2">BUDHA</th>
                    <th colspan="2">KHONG HUCU</th>
                    <th rowspan="2">JML</th>
                    <th colspan="2">WNI</th>
                    <th colspan="2">WNA</th>

                </tr>
                <tr>
                    <th>L</th>
                    <th>P</th>
                    <th>JML</th>

                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>

                    <th>L</th>
                    <th>P</th>
                    <th>JML</th>

                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>

                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>

                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>

                    <th>L</th>
                    <th>P</th>
                    <th>L</th>
                    <th>P</th>

                </tr>
            </thead>`;
    let arrRombel = arrayrombel();
    let rombelkelas1 = arrRombel.filter(k => k.indexOf("1") > -1).length;

    let df1_r1_c2 = jsondatasiswa.filter(k => k.pd_jk == "L" && k.jenjang == "1").length;
    let df1_r1_c3 = jsondatasiswa.filter(k => k.pd_jk == "P" && k.jenjang == "1").length;
    let df1_r1_c4 = jsondatasiswa.filter(k => k.jenjang == "1").length;
    html += `
            <tbody>
                <tr>
                    <td>Kelas 1</td>
                    <td contenteditable="true" class="df1_r1_c1">${rombelkelas1}</td>
                    <td contenteditable="true" class="df1_r1_c2">${df1_r1_c2}</td>
                    <td contenteditable="true" class="df1_r1_c3">${df1_r1_c3}</td>
                    <td contenteditable="true" class="df1_r1_c4">${df1_r1_c4}</td>
                    <td contenteditable="true" class="df1_r1_c5">0</td>
                    <td contenteditable="true" class="df1_r1_c6">0</td>
                    <td contenteditable="true" class="df1_r1_c7">0</td>
                    <td contenteditable="true" class="df1_r1_c8">0</td>
                    <td contenteditable="true" class="df1_r1_c2">${df1_r1_c2}</td>
                    <td contenteditable="true" class="df1_r1_c3">${df1_r1_c3}</td>
                    <td contenteditable="true" class="df1_r1_c4">${df1_r1_c4}</td>
                    
                    
                    <td contenteditable="true" class="df1_r1_c12">0</td>
                    <td contenteditable="true" class="df1_r1_c13">0</td>
                    <td contenteditable="true" class="df1_r1_c14">0</td>
                    <td contenteditable="true" class="df1_r1_c15">0</td>
                    <td contenteditable="true" class="df1_r1_c16">0</td>
                    <td contenteditable="true" class="df1_r1_c17">0</td>
                    <td contenteditable="true" class="df1_r1_c18">0</td>`;
    let umurkelas1 = jsondatasiswa.filter(k => k.jenjang == "1").filter(l => l.pd_tanggallahir !== "");//.map(u=> umur(u.pd_tanggallahir).tahun)
    let u_k1_L_1 = umurkelas1.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;
    let u_k1_P_1 = umurkelas1.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;

    let u_k1_L_2 = umurkelas1.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;
    let u_k1_P_2 = umurkelas1.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;

    let u_k1_L_3 = umurkelas1.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    let u_k1_P_3 = umurkelas1.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    html += `<td contenteditable="true" class="df1_r1_c19">${u_k1_L_1}</td>
                    <td contenteditable="true" class="df1_r1_c20">${u_k1_P_1}</td>
                    <td contenteditable="true" class="df1_r1_c21">${u_k1_L_2}</td>
                    <td contenteditable="true" class="df1_r1_c22">${u_k1_P_2}</td>
                    <td contenteditable="true" class="df1_r1_c23">${u_k1_L_3}</td>
                    <td contenteditable="true" class="df1_r1_c24">${u_k1_P_3}</td>
                    <td contenteditable="true" class="df1_r1_c25">${umurkelas1.length}</td>`;
    let ag_k1 = jsondatasiswa.filter(k => k.jenjang == "1").filter(g => g.pd_agama !== "");
    let ag_k1_is_L = ag_k1.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "L").length;
    let ag_k1_is_P = ag_k1.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "P").length;

    let ag_k1_ks_L = ag_k1.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "L").length;
    let ag_k1_ks_P = ag_k1.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "P").length;

    let ag_k1_kt_L = ag_k1.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "L").length;
    let ag_k1_kt_P = ag_k1.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "P").length;

    let ag_k1_hd_L = ag_k1.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "L").length;
    let ag_k1_hd_P = ag_k1.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "P").length;

    let ag_k1_bd_L = ag_k1.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "L").length;
    let ag_k1_bd_P = ag_k1.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "P").length;

    let ag_k1_kh_L = ag_k1.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "L").length;
    let ag_k1_kh_P = ag_k1.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "P").length;

    html += ` <td contenteditable="true" class="df1_r1_c26">${ag_k1_is_L}</td>
                    <td contenteditable="true" class="df1_r1_c27">${ag_k1_is_P}</td>
                    <td contenteditable="true" class="df1_r1_c28">${ag_k1_ks_L}</td>
                    <td contenteditable="true" class="df1_r1_c29">${ag_k1_ks_P}</td>
                    <td contenteditable="true" class="df1_r1_c30">${ag_k1_kt_L}</td>
                    <td contenteditable="true" class="df1_r1_c31">${ag_k1_kt_P}</td>
                    <td contenteditable="true" class="df1_r1_c32">${ag_k1_hd_L}</td>
                    <td contenteditable="true" class="df1_r1_c33">${ag_k1_hd_P}</td>
                    <td contenteditable="true" class="df1_r1_c34">${ag_k1_bd_L}</td>
                    <td contenteditable="true" class="df1_r1_c35">${ag_k1_bd_P}</td>
                    <td contenteditable="true" class="df1_r1_c36">${ag_k1_kh_L}</td>
                    <td contenteditable="true" class="df1_r1_c37">${ag_k1_kh_P}</td>
                    <td contenteditable="true" class="df1_r1_c38">${ag_k1.length}</td>
                    <td contenteditable="true" class="df1_r1_c39">${df1_r1_c2}</td>
                    <td contenteditable="true" class="df1_r1_c40">${df1_r1_c3}</td>
                    <td contenteditable="true" class="df1_r1_c41">0</td>
                    <td contenteditable="true" class="df1_r1_c42">0</td>
                </tr>`
    ////////////////////// kelas 2 /////////////////
    let rombelkelas2 = arrRombel.filter(k => k.indexOf("2") > -1).length;

    let df1_r2_c2 = jsondatasiswa.filter(k => k.pd_jk == "L" && k.jenjang == "2").length;
    let df1_r2_c3 = jsondatasiswa.filter(k => k.pd_jk == "P" && k.jenjang == "2").length;
    let df1_r2_c4 = jsondatasiswa.filter(k => k.jenjang == "2").length;
    html += `<tr>
                <td>Kelas 2</td>
                <td contenteditable="true" class="df1_r2_c1">${rombelkelas2}</td>
                <td contenteditable="true" class="df1_r2_c2">${df1_r2_c2}</td>
                <td contenteditable="true" class="df1_r2_c3">${df1_r2_c3}</td>
                <td contenteditable="true" class="df1_r2_c4">${df1_r2_c4}</td>
                <td contenteditable="true" class="df1_r2_c5">0</td>
                <td contenteditable="true" class="df1_r2_c6">0</td>
                <td contenteditable="true" class="df1_r2_c7">0</td>
                <td contenteditable="true" class="df1_r2_c8">0</td>
                <td contenteditable="true" class="df1_r2_c2">${df1_r2_c2}</td>
                <td contenteditable="true" class="df1_r2_c3">${df1_r2_c3}</td>
                <td contenteditable="true" class="df1_r2_c4">${df1_r2_c4}</td>
                
                
                <td contenteditable="true" class="df1_r2_c12">0</td>
                <td contenteditable="true" class="df1_r2_c13">0</td>
                <td contenteditable="true" class="df1_r2_c14">0</td>
                <td contenteditable="true" class="df1_r2_c15">0</td>
                <td contenteditable="true" class="df1_r2_c16">0</td>
                <td contenteditable="true" class="df1_r2_c17">0</td>
                <td contenteditable="true" class="df1_r2_c18">0</td>`;
    let umurkelas2 = jsondatasiswa.filter(k => k.jenjang == "2").filter(l => l.pd_tanggallahir !== "");
    let u_k2_L_1 = umurkelas2.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;
    let u_k2_P_1 = umurkelas2.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;

    let u_k2_L_2 = umurkelas2.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;
    let u_k2_P_2 = umurkelas2.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;

    let u_k2_L_3 = umurkelas2.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    let u_k2_P_3 = umurkelas2.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    html += `<td contenteditable="true" class="df1_r2_c19">${u_k2_L_1}</td>
                <td contenteditable="true" class="df1_r2_c20">${u_k2_P_1}</td>
                <td contenteditable="true" class="df1_r2_c21">${u_k2_L_2}</td>
                <td contenteditable="true" class="df1_r2_c22">${u_k2_P_2}</td>
                <td contenteditable="true" class="df1_r2_c23">${u_k2_L_3}</td>
                <td contenteditable="true" class="df1_r2_c24">${u_k2_P_3}</td>
                <td contenteditable="true" class="df1_r2_c25">${umurkelas2.length}</td>`;
    let ag_k2 = jsondatasiswa.filter(k => k.jenjang == "2").filter(g => g.pd_agama !== "");
    let ag_k2_is_L = ag_k2.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "L").length;
    let ag_k2_is_P = ag_k2.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "P").length;

    let ag_k2_ks_L = ag_k2.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "L").length;
    let ag_k2_ks_P = ag_k2.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "P").length;

    let ag_k2_kt_L = ag_k2.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "L").length;
    let ag_k2_kt_P = ag_k2.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "P").length;

    let ag_k2_hd_L = ag_k2.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "L").length;
    let ag_k2_hd_P = ag_k2.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "P").length;

    let ag_k2_bd_L = ag_k2.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "L").length;
    let ag_k2_bd_P = ag_k2.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "P").length;

    let ag_k2_kh_L = ag_k2.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "L").length;
    let ag_k2_kh_P = ag_k2.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "P").length;

    html += `
                <td contenteditable="true" class="df1_r2_c26">${ag_k2_is_L}</td>
                <td contenteditable="true" class="df1_r2_c27">${ag_k2_is_P}</td>
                <td contenteditable="true" class="df1_r2_c28">${ag_k2_ks_L}</td>
                <td contenteditable="true" class="df1_r2_c29">${ag_k2_ks_P}</td>
                <td contenteditable="true" class="df1_r2_c30">${ag_k2_kt_L}</td>
                <td contenteditable="true" class="df1_r2_c31">${ag_k2_kt_P}</td>
                <td contenteditable="true" class="df1_r2_c32">${ag_k2_hd_L}</td>
                <td contenteditable="true" class="df1_r2_c33">${ag_k2_hd_P}</td>
                <td contenteditable="true" class="df1_r2_c34">${ag_k2_bd_L}</td>
                <td contenteditable="true" class="df1_r2_c35">${ag_k2_bd_P}</td>
                <td contenteditable="true" class="df1_r2_c36">${ag_k2_kh_L}</td>
                <td contenteditable="true" class="df1_r2_c37">${ag_k2_kh_P}</td>
                <td contenteditable="true" class="df1_r2_c38">${ag_k2.length}</td>
                <td contenteditable="true" class="df1_r2_c39">${df1_r2_c2}</td>
                <td contenteditable="true" class="df1_r2_c40">${df1_r2_c3}</td>
                <td contenteditable="true" class="df1_r2_c41">0</td>
                <td contenteditable="true" class="df1_r2_c42">0</td>
            </tr>`
    ////////////////////// kelas 3 /////////////////
    let rombelkelas3 = arrRombel.filter(k => k.indexOf("3") > -1).length;

    let df1_r3_c2 = jsondatasiswa.filter(k => k.pd_jk == "L" && k.jenjang == "3").length;
    let df1_r3_c3 = jsondatasiswa.filter(k => k.pd_jk == "P" && k.jenjang == "3").length;
    let df1_r3_c4 = jsondatasiswa.filter(k => k.jenjang == "3").length;
    html += `<tr>
                    <td>Kelas 3</td>
                    <td contenteditable="true" class="df1_r3_c1">${rombelkelas3}</td>
                    <td contenteditable="true" class="df1_r3_c2">${df1_r3_c2}</td>
                    <td contenteditable="true" class="df1_r3_c3">${df1_r3_c3}</td>
                    <td contenteditable="true" class="df1_r3_c4">${df1_r3_c4}</td>
                    <td contenteditable="true" class="df1_r3_c5">0</td>
                    <td contenteditable="true" class="df1_r3_c6">0</td>
                    <td contenteditable="true" class="df1_r3_c7">0</td>
                    <td contenteditable="true" class="df1_r3_c8">0</td>
                    <td contenteditable="true" class="df1_r3_c2">${df1_r3_c2}</td>
                    <td contenteditable="true" class="df1_r3_c3">${df1_r3_c3}</td>
                    <td contenteditable="true" class="df1_r3_c4">${df1_r3_c4}</td>
                    
                    
                    <td contenteditable="true" class="df1_r3_c12">0</td>
                    <td contenteditable="true" class="df1_r3_c13">0</td>
                    <td contenteditable="true" class="df1_r3_c14">0</td>
                    <td contenteditable="true" class="df1_r3_c15">0</td>
                    <td contenteditable="true" class="df1_r3_c16">0</td>
                    <td contenteditable="true" class="df1_r3_c17">0</td>
                    <td contenteditable="true" class="df1_r3_c18">0</td>`;
    let umurkelas3 = jsondatasiswa.filter(k => k.jenjang == "3").filter(l => l.pd_tanggallahir !== "");
    let u_k3_L_1 = umurkelas3.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;
    let u_k3_P_1 = umurkelas3.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;

    let u_k3_L_2 = umurkelas3.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;
    let u_k3_P_2 = umurkelas3.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;

    let u_k3_L_3 = umurkelas3.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    let u_k3_P_3 = umurkelas3.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    html += `<td contenteditable="true" class="df1_r3_c19">${u_k3_L_1}</td>
                    <td contenteditable="true" class="df1_r3_c20">${u_k3_P_1}</td>
                    <td contenteditable="true" class="df1_r3_c21">${u_k3_L_2}</td>
                    <td contenteditable="true" class="df1_r3_c22">${u_k3_P_2}</td>
                    <td contenteditable="true" class="df1_r3_c23">${u_k3_L_3}</td>
                    <td contenteditable="true" class="df1_r3_c24">${u_k3_P_3}</td>
                    <td contenteditable="true" class="df1_r3_c25">${umurkelas3.length}</td>`;
    let ag_k3 = jsondatasiswa.filter(k => k.jenjang == "3").filter(g => g.pd_agama !== "");
    let ag_k3_is_L = ag_k3.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "L").length;
    let ag_k3_is_P = ag_k3.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "P").length;

    let ag_k3_ks_L = ag_k3.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "L").length;
    let ag_k3_ks_P = ag_k3.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "P").length;

    let ag_k3_kt_L = ag_k3.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "L").length;
    let ag_k3_kt_P = ag_k3.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "P").length;

    let ag_k3_hd_L = ag_k3.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "L").length;
    let ag_k3_hd_P = ag_k3.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "P").length;

    let ag_k3_bd_L = ag_k3.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "L").length;
    let ag_k3_bd_P = ag_k3.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "P").length;

    let ag_k3_kh_L = ag_k3.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "L").length;
    let ag_k3_kh_P = ag_k3.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "P").length;

    html += `
                    <td contenteditable="true" class="df1_r3_c26">${ag_k3_is_L}</td>
                    <td contenteditable="true" class="df1_r3_c27">${ag_k3_is_P}</td>
                    <td contenteditable="true" class="df1_r3_c28">${ag_k3_ks_L}</td>
                    <td contenteditable="true" class="df1_r3_c29">${ag_k3_ks_P}</td>
                    <td contenteditable="true" class="df1_r3_c30">${ag_k3_kt_L}</td>
                    <td contenteditable="true" class="df1_r3_c31">${ag_k3_kt_P}</td>
                    <td contenteditable="true" class="df1_r3_c32">${ag_k3_hd_L}</td>
                    <td contenteditable="true" class="df1_r3_c33">${ag_k3_hd_P}</td>
                    <td contenteditable="true" class="df1_r3_c34">${ag_k3_bd_L}</td>
                    <td contenteditable="true" class="df1_r3_c35">${ag_k3_bd_P}</td>
                    <td contenteditable="true" class="df1_r3_c36">${ag_k3_kh_L}</td>
                    <td contenteditable="true" class="df1_r3_c37">${ag_k3_kh_P}</td>
                    <td contenteditable="true" class="df1_r3_c38">${ag_k3.length}</td>
                    <td contenteditable="true" class="df1_r3_c39">${df1_r3_c2}</td>
                    <td contenteditable="true" class="df1_r3_c40">${df1_r3_c3}</td>
                    <td contenteditable="true" class="df1_r3_c41">0</td>
                    <td contenteditable="true" class="df1_r3_c42">0</td>
                </tr>`
    ////////////////////// kelas 4 /////////////////
    let rombelkelas4 = arrRombel.filter(k => k.indexOf("4") > -1).length;

    let df1_r4_c2 = jsondatasiswa.filter(k => k.pd_jk == "L" && k.jenjang == "4").length;
    let df1_r4_c3 = jsondatasiswa.filter(k => k.pd_jk == "P" && k.jenjang == "4").length;
    let df1_r4_c4 = jsondatasiswa.filter(k => k.jenjang == "4").length;
    html += `<tr>
                    <td>Kelas 4</td>
                    <td contenteditable="true" class="df1_r4_c1">${rombelkelas4}</td>
                    <td contenteditable="true" class="df1_r4_c2">${df1_r4_c2}</td>
                    <td contenteditable="true" class="df1_r4_c3">${df1_r4_c3}</td>
                    <td contenteditable="true" class="df1_r4_c4">${df1_r4_c4}</td>
                    <td contenteditable="true" class="df1_r4_c5">0</td>
                    <td contenteditable="true" class="df1_r4_c6">0</td>
                    <td contenteditable="true" class="df1_r4_c7">0</td>
                    <td contenteditable="true" class="df1_r4_c8">0</td>
                    <td contenteditable="true" class="df1_r4_c2">${df1_r4_c2}</td>
                    <td contenteditable="true" class="df1_r4_c3">${df1_r4_c3}</td>
                    <td contenteditable="true" class="df1_r4_c4">${df1_r4_c4}</td>
                    
                    
                    <td contenteditable="true" class="df1_r4_c12">0</td>
                    <td contenteditable="true" class="df1_r4_c13">0</td>
                    <td contenteditable="true" class="df1_r4_c14">0</td>
                    <td contenteditable="true" class="df1_r4_c15">0</td>
                    <td contenteditable="true" class="df1_r4_c16">0</td>
                    <td contenteditable="true" class="df1_r4_c17">0</td>
                    <td contenteditable="true" class="df1_r4_c18">0</td>`;
    let umurkelas4 = jsondatasiswa.filter(k => k.jenjang == "4").filter(l => l.pd_tanggallahir !== "");
    let u_k4_L_1 = umurkelas4.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;
    let u_k4_P_1 = umurkelas4.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;

    let u_k4_L_2 = umurkelas4.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;
    let u_k4_P_2 = umurkelas4.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;

    let u_k4_L_3 = umurkelas4.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    let u_k4_P_3 = umurkelas4.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    html += `<td contenteditable="true" class="df1_r4_c19">${u_k4_L_1}</td>
                    <td contenteditable="true" class="df1_r4_c20">${u_k4_P_1}</td>
                    <td contenteditable="true" class="df1_r4_c21">${u_k4_L_2}</td>
                    <td contenteditable="true" class="df1_r4_c22">${u_k4_P_2}</td>
                    <td contenteditable="true" class="df1_r4_c23">${u_k4_L_3}</td>
                    <td contenteditable="true" class="df1_r4_c24">${u_k4_P_3}</td>
                    <td contenteditable="true" class="df1_r4_c25">${umurkelas4.length}</td>`;
    let ag_k4 = jsondatasiswa.filter(k => k.jenjang == "4").filter(g => g.pd_agama !== "");
    let ag_k4_is_L = ag_k4.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "L").length;
    let ag_k4_is_P = ag_k4.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "P").length;

    let ag_k4_ks_L = ag_k4.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "L").length;
    let ag_k4_ks_P = ag_k4.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "P").length;

    let ag_k4_kt_L = ag_k4.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "L").length;
    let ag_k4_kt_P = ag_k4.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "P").length;

    let ag_k4_hd_L = ag_k4.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "L").length;
    let ag_k4_hd_P = ag_k4.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "P").length;

    let ag_k4_bd_L = ag_k4.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "L").length;
    let ag_k4_bd_P = ag_k4.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "P").length;

    let ag_k4_kh_L = ag_k4.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "L").length;
    let ag_k4_kh_P = ag_k4.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "P").length;

    html += `
                    <td contenteditable="true" class="df1_r4_c26">${ag_k4_is_L}</td>
                    <td contenteditable="true" class="df1_r4_c27">${ag_k4_is_P}</td>
                    <td contenteditable="true" class="df1_r4_c28">${ag_k4_ks_L}</td>
                    <td contenteditable="true" class="df1_r4_c29">${ag_k4_ks_P}</td>
                    <td contenteditable="true" class="df1_r4_c30">${ag_k4_kt_L}</td>
                    <td contenteditable="true" class="df1_r4_c31">${ag_k4_kt_P}</td>
                    <td contenteditable="true" class="df1_r4_c32">${ag_k4_hd_L}</td>
                    <td contenteditable="true" class="df1_r4_c33">${ag_k4_hd_P}</td>
                    <td contenteditable="true" class="df1_r4_c34">${ag_k4_bd_L}</td>
                    <td contenteditable="true" class="df1_r4_c35">${ag_k4_bd_P}</td>
                    <td contenteditable="true" class="df1_r4_c36">${ag_k4_kh_L}</td>
                    <td contenteditable="true" class="df1_r4_c37">${ag_k4_kh_P}</td>
                    <td contenteditable="true" class="df1_r4_c38">${ag_k4.length}</td>
                    <td contenteditable="true" class="df1_r4_c39">${df1_r4_c2}</td>
                    <td contenteditable="true" class="df1_r4_c40">${df1_r4_c3}</td>
                    <td contenteditable="true" class="df1_r4_c41">0</td>
                    <td contenteditable="true" class="df1_r4_c42">0</td>
                </tr>`
    ////////////////////// kelas 5 /////////////////
    let rombelkelas5 = arrRombel.filter(k => k.indexOf("5") > -1).length;

    let df1_r5_c2 = jsondatasiswa.filter(k => k.pd_jk == "L" && k.jenjang == "5").length;
    let df1_r5_c3 = jsondatasiswa.filter(k => k.pd_jk == "P" && k.jenjang == "5").length;
    let df1_r5_c4 = jsondatasiswa.filter(k => k.jenjang == "5").length;
    html += `<tr>
                    <td>Kelas 5</td>
                    <td contenteditable="true" class="df1_r5_c1">${rombelkelas5}</td>
                    <td contenteditable="true" class="df1_r5_c2">${df1_r5_c2}</td>
                    <td contenteditable="true" class="df1_r5_c3">${df1_r5_c3}</td>
                    <td contenteditable="true" class="df1_r5_c4">${df1_r5_c4}</td>
                    <td contenteditable="true" class="df1_r5_c5">0</td>
                    <td contenteditable="true" class="df1_r5_c6">0</td>
                    <td contenteditable="true" class="df1_r5_c7">0</td>
                    <td contenteditable="true" class="df1_r5_c8">0</td>
                    <td contenteditable="true" class="df1_r5_c2">${df1_r5_c2}</td>
                    <td contenteditable="true" class="df1_r5_c3">${df1_r5_c3}</td>
                    <td contenteditable="true" class="df1_r5_c4">${df1_r5_c4}</td>
                    
                    
                    <td contenteditable="true" class="df1_r5_c12">0</td>
                    <td contenteditable="true" class="df1_r5_c13">0</td>
                    <td contenteditable="true" class="df1_r5_c14">0</td>
                    <td contenteditable="true" class="df1_r5_c15">0</td>
                    <td contenteditable="true" class="df1_r5_c16">0</td>
                    <td contenteditable="true" class="df1_r5_c17">0</td>
                    <td contenteditable="true" class="df1_r5_c18">0</td>`;
    let umurkelas5 = jsondatasiswa.filter(k => k.jenjang == "5").filter(l => l.pd_tanggallahir !== "");
    let u_k5_L_1 = umurkelas5.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;
    let u_k5_P_1 = umurkelas5.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;

    let u_k5_L_2 = umurkelas5.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;
    let u_k5_P_2 = umurkelas5.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;

    let u_k5_L_3 = umurkelas5.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    let u_k5_P_3 = umurkelas5.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    html += `<td contenteditable="true" class="df1_r5_c19">${u_k5_L_1}</td>
                    <td contenteditable="true" class="df1_r5_c20">${u_k5_P_1}</td>
                    <td contenteditable="true" class="df1_r5_c21">${u_k5_L_2}</td>
                    <td contenteditable="true" class="df1_r5_c22">${u_k5_P_2}</td>
                    <td contenteditable="true" class="df1_r5_c23">${u_k5_L_3}</td>
                    <td contenteditable="true" class="df1_r5_c24">${u_k5_P_3}</td>
                    <td contenteditable="true" class="df1_r5_c25">${umurkelas5.length}</td>`;
    let ag_k5 = jsondatasiswa.filter(k => k.jenjang == "5").filter(g => g.pd_agama !== "");
    let ag_k5_is_L = ag_k5.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "L").length;
    let ag_k5_is_P = ag_k5.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "P").length;

    let ag_k5_ks_L = ag_k5.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "L").length;
    let ag_k5_ks_P = ag_k5.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "P").length;

    let ag_k5_kt_L = ag_k5.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "L").length;
    let ag_k5_kt_P = ag_k5.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "P").length;

    let ag_k5_hd_L = ag_k5.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "L").length;
    let ag_k5_hd_P = ag_k5.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "P").length;

    let ag_k5_bd_L = ag_k5.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "L").length;
    let ag_k5_bd_P = ag_k5.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "P").length;

    let ag_k5_kh_L = ag_k5.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "L").length;
    let ag_k5_kh_P = ag_k5.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "P").length;

    html += `
                    <td contenteditable="true" class="df1_r5_c26">${ag_k5_is_L}</td>
                    <td contenteditable="true" class="df1_r5_c27">${ag_k5_is_P}</td>
                    <td contenteditable="true" class="df1_r5_c28">${ag_k5_ks_L}</td>
                    <td contenteditable="true" class="df1_r5_c29">${ag_k5_ks_P}</td>
                    <td contenteditable="true" class="df1_r5_c30">${ag_k5_kt_L}</td>
                    <td contenteditable="true" class="df1_r5_c31">${ag_k5_kt_P}</td>
                    <td contenteditable="true" class="df1_r5_c32">${ag_k5_hd_L}</td>
                    <td contenteditable="true" class="df1_r5_c33">${ag_k5_hd_P}</td>
                    <td contenteditable="true" class="df1_r5_c34">${ag_k5_bd_L}</td>
                    <td contenteditable="true" class="df1_r5_c35">${ag_k5_bd_P}</td>
                    <td contenteditable="true" class="df1_r5_c36">${ag_k5_kh_L}</td>
                    <td contenteditable="true" class="df1_r5_c37">${ag_k5_kh_P}</td>
                    <td contenteditable="true" class="df1_r5_c38">${ag_k5.length}</td>
                    <td contenteditable="true" class="df1_r5_c39">${df1_r5_c2}</td>
                    <td contenteditable="true" class="df1_r5_c40">${df1_r5_c3}</td>
                    <td contenteditable="true" class="df1_r5_c41">0</td>
                    <td contenteditable="true" class="df1_r5_c42">0</td>
                </tr>`
    ////////////////////// kelas 6 /////////////////
    let rombelkelas6 = arrRombel.filter(k => k.indexOf("6") > -1).length;
    let df1_r6_c2 = jsondatasiswa.filter(k => k.pd_jk == "L" && k.jenjang == "6").length;
    let df1_r6_c3 = jsondatasiswa.filter(k => k.pd_jk == "P" && k.jenjang == "6").length;
    let df1_r6_c4 = jsondatasiswa.filter(k => k.jenjang == "6").length;
    html += `<tr>
                                <td>Kelas 6</td>
                                <td contenteditable="true" class="df1_r6_c1">${rombelkelas6}</td>
                                <td contenteditable="true" class="df1_r6_c2">${df1_r6_c2}</td>
                                <td contenteditable="true" class="df1_r6_c3">${df1_r6_c3}</td>
                                <td contenteditable="true" class="df1_r6_c4">${df1_r6_c4}</td>
                                <td contenteditable="true" class="df1_r6_c5">0</td>
                                <td contenteditable="true" class="df1_r6_c6">0</td>
                                <td contenteditable="true" class="df1_r6_c7">0</td>
                                <td contenteditable="true" class="df1_r6_c8">0</td>
                                <td contenteditable="true" class="df1_r6_c2">${df1_r6_c2}</td>
                                <td contenteditable="true" class="df1_r6_c3">${df1_r6_c3}</td>
                                <td contenteditable="true" class="df1_r6_c4">${df1_r6_c4}</td>
                                
                                
                                <td contenteditable="true" class="df1_r6_c12">0</td>
                                <td contenteditable="true" class="df1_r6_c13">0</td>
                                <td contenteditable="true" class="df1_r6_c14">0</td>
                                <td contenteditable="true" class="df1_r6_c15">0</td>
                                <td contenteditable="true" class="df1_r6_c16">0</td>
                                <td contenteditable="true" class="df1_r6_c17">0</td>
                                <td contenteditable="true" class="df1_r6_c18">0</td>`;
    let umurkelas6 = jsondatasiswa.filter(k => k.jenjang == "6").filter(l => l.pd_tanggallahir !== "");
    let u_k6_L_1 = umurkelas6.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;
    let u_k6_P_1 = umurkelas6.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;

    let u_k6_L_2 = umurkelas6.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;
    let u_k6_P_2 = umurkelas6.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;

    let u_k6_L_3 = umurkelas6.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    let u_k6_P_3 = umurkelas6.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    html += `<td contenteditable="true" class="df1_r6_c19">${u_k6_L_1}</td>
                                <td contenteditable="true" class="df1_r6_c20">${u_k6_P_1}</td>
                                <td contenteditable="true" class="df1_r6_c21">${u_k6_L_2}</td>
                                <td contenteditable="true" class="df1_r6_c22">${u_k6_P_2}</td>
                                <td contenteditable="true" class="df1_r6_c23">${u_k6_L_3}</td>
                                <td contenteditable="true" class="df1_r6_c24">${u_k6_P_3}</td>
                                <td contenteditable="true" class="df1_r6_c25">${umurkelas6.length}</td>`;
    let ag_k6 = jsondatasiswa.filter(k => k.jenjang == "6").filter(g => g.pd_agama !== "");
    let ag_k6_is_L = ag_k6.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "L").length;
    let ag_k6_is_P = ag_k6.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "P").length;

    let ag_k6_ks_L = ag_k6.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "L").length;
    let ag_k6_ks_P = ag_k6.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "P").length;

    let ag_k6_kt_L = ag_k6.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "L").length;
    let ag_k6_kt_P = ag_k6.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "P").length;

    let ag_k6_hd_L = ag_k6.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "L").length;
    let ag_k6_hd_P = ag_k6.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "P").length;

    let ag_k6_bd_L = ag_k6.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "L").length;
    let ag_k6_bd_P = ag_k6.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "P").length;

    let ag_k6_kh_L = ag_k6.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "L").length;
    let ag_k6_kh_P = ag_k6.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "P").length;

    html += `
                                <td contenteditable="true" class="df1_r6_c26">${ag_k6_is_L}</td>
                                <td contenteditable="true" class="df1_r6_c27">${ag_k6_is_P}</td>
                                <td contenteditable="true" class="df1_r6_c28">${ag_k6_ks_L}</td>
                                <td contenteditable="true" class="df1_r6_c29">${ag_k6_ks_P}</td>
                                <td contenteditable="true" class="df1_r6_c30">${ag_k6_kt_L}</td>
                                <td contenteditable="true" class="df1_r6_c31">${ag_k6_kt_P}</td>
                                <td contenteditable="true" class="df1_r6_c32">${ag_k6_hd_L}</td>
                                <td contenteditable="true" class="df1_r6_c33">${ag_k6_hd_P}</td>
                                <td contenteditable="true" class="df1_r6_c34">${ag_k6_bd_L}</td>
                                <td contenteditable="true" class="df1_r6_c35">${ag_k6_bd_P}</td>
                                <td contenteditable="true" class="df1_r6_c36">${ag_k6_kh_L}</td>
                                <td contenteditable="true" class="df1_r6_c37">${ag_k6_kh_P}</td>
                                <td contenteditable="true" class="df1_r6_c38">${ag_k6.length}</td>
                                <td contenteditable="true" class="df1_r6_c39">${df1_r6_c2}</td>
                                <td contenteditable="true" class="df1_r6_c40">${df1_r6_c3}</td>
                                <td contenteditable="true" class="df1_r6_c41">0</td>
                                <td contenteditable="true" class="df1_r6_c42">0</td>
                            </tr>`


    let rombeljumlah = arrRombel.length

    let df1_rall_c2 = jsondatasiswa.filter(k => k.pd_jk == "L").length;
    let df1_rall_c3 = jsondatasiswa.filter(k => k.pd_jk == "P").length;
    let df1_rall_c4 = jsondatasiswa.length;
    html += `<tr>
                                            <td>JUMLAH</td>
                                            <td contenteditable="true" class="df1_r5_c1">${rombeljumlah}</td>
                                            <td contenteditable="true" class="df1_r5_c2">${df1_rall_c2}</td>
                                            <td contenteditable="true" class="df1_r5_c3">${df1_rall_c3}</td>
                                            <td contenteditable="true" class="df1_r5_c4">${df1_rall_c4}</td>
                                            <td contenteditable="true" class="df1_r5_c5">0</td>
                                            <td contenteditable="true" class="df1_r5_c6">0</td>
                                            <td contenteditable="true" class="df1_r5_c7">0</td>
                                            <td contenteditable="true" class="df1_r5_c8">0</td>
                                            <td contenteditable="true" class="df1_r5_c2">${df1_rall_c2}</td>
                                            <td contenteditable="true" class="df1_r5_c3">${df1_rall_c3}</td>
                                            <td contenteditable="true" class="df1_r5_c4">${df1_rall_c4}</td>
                                            
                                            
                                            <td contenteditable="true" class="df1_r5_c12">0</td>
                                            <td contenteditable="true" class="df1_r5_c13">0</td>
                                            <td contenteditable="true" class="df1_r5_c14">0</td>
                                            <td contenteditable="true" class="df1_r5_c15">0</td>
                                            <td contenteditable="true" class="df1_r5_c16">0</td>
                                            <td contenteditable="true" class="df1_r5_c17">0</td>
                                            <td contenteditable="true" class="df1_r5_c18">0</td>`;
    let umurkelasAll = jsondatasiswa.filter(l => l.pd_tanggallahir !== "");
    let u_kAll_L_1 = umurkelasAll.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;
    let u_kAll_P_1 = umurkelasAll.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k <= 6).length;

    let u_kAll_L_2 = umurkelasAll.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;
    let u_kAll_P_2 = umurkelasAll.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 7 && k < 13).length;

    let u_kAll_L_3 = umurkelasAll.filter(l => l.pd_jk == "L").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    let u_kAll_P_3 = umurkelasAll.filter(l => l.pd_jk == "P").map(u => umur(u.pd_tanggallahir).tahun).filter(k => k >= 13).length;
    html += `<td contenteditable="true" class="df1_r5_c19">${u_kAll_L_1}</td>
                                            <td contenteditable="true" class="df1_r5_c20">${u_kAll_P_1}</td>
                                            <td contenteditable="true" class="df1_r5_c21">${u_kAll_L_2}</td>
                                            <td contenteditable="true" class="df1_r5_c22">${u_kAll_P_2}</td>
                                            <td contenteditable="true" class="df1_r5_c23">${u_kAll_L_3}</td>
                                            <td contenteditable="true" class="df1_r5_c24">${u_kAll_P_3}</td>
                                            <td contenteditable="true" class="df1_r5_c25">${umurkelasAll.length}</td>`;
    let ag_kAll = jsondatasiswa.filter(g => g.pd_agama !== "");
    let ag_kAll_is_L = ag_kAll.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "L").length;
    let ag_kAll_is_P = ag_kAll.filter(g => g.pd_agama == "ISLAM").filter(l => l.pd_jk == "P").length;

    let ag_kAll_ks_L = ag_kAll.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "L").length;
    let ag_kAll_ks_P = ag_kAll.filter(g => g.pd_agama == "KRISTEN").filter(l => l.pd_jk == "P").length;

    let ag_kAll_kt_L = ag_kAll.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "L").length;
    let ag_kAll_kt_P = ag_kAll.filter(g => g.pd_agama == "KATHOLIK").filter(l => l.pd_jk == "P").length;

    let ag_kAll_hd_L = ag_kAll.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "L").length;
    let ag_kAll_hd_P = ag_kAll.filter(g => g.pd_agama == "HINDU").filter(l => l.pd_jk == "P").length;

    let ag_kAll_bd_L = ag_kAll.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "L").length;
    let ag_kAll_bd_P = ag_kAll.filter(g => g.pd_agama == "BUDHA").filter(l => l.pd_jk == "P").length;

    let ag_kAll_kh_L = ag_kAll.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "L").length;
    let ag_kAll_kh_P = ag_kAll.filter(g => g.pd_agama == "KHONGHUCU").filter(l => l.pd_jk == "P").length;

    html += `<td contenteditable="true" class="df1_r5_c26">${ag_kAll_is_L}</td>
                                            <td contenteditable="true" class="df1_r5_c27">${ag_kAll_is_P}</td>
                                            <td contenteditable="true" class="df1_r5_c28">${ag_kAll_ks_L}</td>
                                            <td contenteditable="true" class="df1_r5_c29">${ag_kAll_ks_P}</td>
                                            <td contenteditable="true" class="df1_r5_c30">${ag_kAll_kt_L}</td>
                                            <td contenteditable="true" class="df1_r5_c31">${ag_kAll_kt_P}</td>
                                            <td contenteditable="true" class="df1_r5_c32">${ag_kAll_hd_L}</td>
                                            <td contenteditable="true" class="df1_r5_c33">${ag_kAll_hd_P}</td>
                                            <td contenteditable="true" class="df1_r5_c34">${ag_kAll_bd_L}</td>
                                            <td contenteditable="true" class="df1_r5_c35">${ag_kAll_bd_P}</td>
                                            <td contenteditable="true" class="df1_r5_c36">${ag_kAll_kh_L}</td>
                                            <td contenteditable="true" class="df1_r5_c37">${ag_kAll_kh_P}</td>
                                            <td contenteditable="true" class="df1_r5_c38">${ag_kAll.length}</td>
                                            <td contenteditable="true" class="df1_r5_c39">${df1_rall_c2}</td>
                                            <td contenteditable="true" class="df1_r5_c40">${df1_rall_c3}</td>
                                            <td contenteditable="true" class="df1_r5_c41">0</td>
                                            <td contenteditable="true" class="df1_r5_c42">0</td>
                                        </tr>
            </tbody>
        </table>
    </div>
    <div class="w3-left w3-border w3-border-black" style="width:50%">
        <div class="w3-left w3-container">
            <b>B. ABSENSI DAN SOSIAL EKONOMI ORANG TUA MURID</b>
            <table style="font-size:10px">
                <tr>
                    <td>1. Absensi Murid</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">... %</td>
                    <td class="w3-right-align">S</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">..</td>
                    <td>I</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">..</td>
                    <td>A</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">..</td>
                </tr>
                <tr>
                    <td>2. Absensi Pegawai</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">... %</td>
                    <td class="w3-right-align">S</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">..</td>
                    <td>I</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">..</td>
                    <td>A</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">..</td>
                </tr>

                <tr>
                    <td>3. Jumlah Pegawai</td>
                    <td>:</td>
                    <td contenteditable="true" class="w3-border w3-border-black w3-padding-small">...</td>
                    <td colspan="9"></td>
                </tr>
                <tr>
                    <td>4. Jumlah Hari Efektif</td>
                    <td>:</td>
                    <td contenteditable="true"  class="w3-border w3-border-black w3-padding-small">${hariefektif(new Date().getMonth(), new Date().getFullYear())}</td>
                    <td colspan="9"></td>

                </tr>

                <tr>
                    <td rowspan="3" style="vertical-align:top">5. Kemampuan Ekonomi</td>
                    <td rowspan="3" style="vertical-align:top">:</td>
                    <td>Mampu</td>

                    <td contenteditable="true" data-getkey="mampu" class="w3-border w3-border-black w3-padding-small">... %</td>
                    <td colspan="8"></td>
                </tr>
                <tr>
                    <td>Kurang Mampu</td>

                    <td contenteditable="true" data-getkey="kurangmampu" class="w3-border w3-border-black w3-padding-small">... %</td>
                    <td colspan="8"></td>
                </tr>
                <tr>
                    <td>Tidak Mampu</td>

                    <td contenteditable="true"  data-getkey="tidakmampu"  class="w3-border w3-border-black w3-padding-small">..</td>
                    <td colspan="8"></td>
                </tr>


            </table>
        </div>

        <div class="w3-left">
            <table style="font-size:10px">
                <thead>
                    <tr>
                        <th colspan="3">DAFTAR PENERIMA PIP</th>
                    </tr>
                </thead>
                <tbody class="w3-table garis">
                    <tr>
                        <th>Tingkat</th>
                        <th>L</th>
                        <th>P</th>
                    </tr>
                    `
    for(let a = 0 ; a < 6 ; a++){
        let tk = a+1;
        let dataL = jsondatasiswa.filter(s=> s.pd_jk == "L" && s.dapo_bank !== "" && s.jenjang == tk).length;
        let dataP = jsondatasiswa.filter(s=> s.pd_jk == "P" && s.dapo_bank !== "" && s.jenjang == tk).length;
        html+=`<tr>
        <td>Tingkat ${tk}</td>
        <td>${dataL}</td>
        <td>${dataP}</td>
    </tr>`
    }
    let jmL = jsondatasiswa.filter(s=> s.pd_jk == "L" && s.dapo_bank !== "").length;
    let jmP = jsondatasiswa.filter(s=> s.pd_jk == "P" && s.dapo_bank !== "").length;
                        html+=`
                        <td>Jumlah</td>
                        <td>${jmL}</td>
                        <td>${jmP}</td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
    <div class="w3-left w3-border-black w3-border w3-container" style="width:50%">
        <div class="w3-container">
            <table style="font-size:10px">
                <thead>
                    <tr>
                        <td colspan="3">
                            <b>C.1 KEADAAN SARANA DAN PRASARANA SEKOLAH</b>

                        </td>
                    </tr>
                </thead>
                <tbody class="w3-table ">
                    <tr class="garis">
                        <td>STATUS TANAH</td>
                        <td>HAK MILIK</td>
                        <td>BUKAN HAK MILIK</td>
                    </tr>
                    <tr class="garis">
                        <td>a. Luas Tanah</td>
                        <td contenteditable="true" data-getkey="hakmilik_luastanah">... m<sup>2</sup></td>
                        <td contenteditable="true"data-getkey="bukanhakmilik_luastanah">... m<sup>2</sup></td>
                    </tr>
                    <tr class="garis">
                        <td>b. Digunakan Bangunan</td>
                        <td contenteditable="true"data-getkey="hakmilik_digunakanbangunan">... m<sup>2</sup></td>
                        <td contenteditable="true"data-getkey="bukanhakmilik_digunakanbangunan">... m<sup>2</sup></td>
                    </tr>
                    <tr class="garis">
                        <td>c. Asal Tanah</td>
                        <td colspan="2" data-getkey="asaltanah" contenteditable="true">Pasos/Pasom/Wakaf</td>
                        
                    </tr>
                    <tr class="garis">
                        <td>d. Surat Hak Milik</td>
                        <td contenteditable="true" data-getkey="hakmilik_surathakmilik">...</td>
                        <td contenteditable="true"data-getkey="bukanhakmilik_surathakmilik">...</td>
                    </tr>
                    <tr class="garis">
                        <td colspan="2">e. Luas Tanah yang digunakan untuk RKB</td>

                        <td contenteditable="true"data-getkey="luastanahrkb">...m<sup>2</sup></td>
                    </tr>

                    <tr>
                        <td colspan="3" class="w3-white">&nbsp;</td>
                    </tr>
                    <tr>
                        <td colspan="3" class="w3-white">&nbsp;</td>

                    </tr>

                </tbody>
            </table>
        </div>
    </div>
    <div class="w3-clear"></div>
    <div class="w3-left w3-border w3-border-black w3-container" style="width:60%">
        <b class="w3-left">C.2 KONDISI BANGUNAN & SARANA LAINNYA MILIK SEKOLAH (Bukan pinjaman /
            menumpang)</b>
        <div class="w3-clear"></div>
        <div class="w3-left" >
            <table class="tabelbiasa tabelbiasaputih" style="font-size:10px">
                <tbody class="garis">

                    <tr>
                        <th rowspan="2">BANGUNAN <br />DAN<br /> RUANGAN</th>
                        <th rowspan="2">JML</th>
                        <th colspan="5">KONDISI</th>
                    </tr>
                    <tr>
                        <th>B</th>
                        <th>S</th>
                        <th>RR</th>
                        <th>RB</th>
                        <th>RT</th>
                    </tr>
                    <tr>
                        <td>a. Jumlah Bangunan</td>
                        <td contenteditable="true" data-getkey="br_jumlahbangunan_jumlah" >...</td>
                        <td contenteditable="true" data-getkey="br_jumlahbangunan_b" >...</td>
                        <td contenteditable="true" data-getkey="br_jumlahbangunan_s" >...</td>
                        <td contenteditable="true" data-getkey="br_jumlahbangunan_rr" >...</td>
                        <td contenteditable="true" data-getkey="br_jumlahbangunan_rb" >...</td>
                        <td contenteditable="true" data-getkey="br_jumlahbangunan_rt" >...</td>
                    </tr>
                    <tr>
                        <td>b. Jumlah Ruang Kelas</td>
                        <td contenteditable="true" data-getkey="br_jumlahruangankelas_jumlah" >...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruangankelas_b">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruangankelas_s">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruangankelas_rr">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruangankelas_rb">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruangankelas_rt">...</td>
                    </tr>
                    <tr>
                        <td>c. Jumlah Ruang Perpustakaan</td>
                        <td contenteditable="true" data-getkey="br_jumlahruanganperpustakaan_jumlah">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruanganperpustakaan_b">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruanganperpustakaan_s">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruanganperpustakaan_rr">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruanganperpustakaan_rb">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruanganperpustakaan_rt">...</td>
                    </tr>
                    <tr>
                        <td>d. Jumlah Ruang Komputer</td>
                        <td contenteditable="true" data-getkey="br_jumlahruangankomputer_jumlah">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruangankomputer_b">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruangankomputer_s">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruangankomputer_rr">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruangankomputer_rb">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruangankomputer_rt">...</td>
                    </tr>
                    <tr>
                        <td>e. Jumlah Ruang Laboratorium</td>
                        <td contenteditable="true" data-getkey="br_jumlahruanganlaboratorium_jumlah">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruanganlaboratorium_b">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruanganlaboratorium_s">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruanganlaboratorium_rr">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruanganlaboratorium_rb">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruanganlaboratorium_rt">...</td>
                    </tr>
                    <tr>
                        <td>f. Jumlah Ruang Guru & TU</td>
                        <td contenteditable="true" data-getkey="br_jumlahruanggurutu_jumlah">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruanggurutu_b">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruanggurutu_s">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruanggurutu_rr">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruanggurutu_rb">...</td>
                        <td contenteditable="true" data-getkey="br_jumlahruanggurutu_rt">...</td>
                    </tr>
                    <tr>
                        <td>g. WC Siswa</td>
                        <td contenteditable="true" data-getkey="br_wcsiswa_jumlah">...</td>
                        <td contenteditable="true" data-getkey="br_wcsiswa_b">...</td>
                        <td contenteditable="true" data-getkey="br_wcsiswa_s">...</td>
                        <td contenteditable="true" data-getkey="br_wcsiswa_rr">...</td>
                        <td contenteditable="true" data-getkey="br_wcsiswa_rb">...</td>
                        <td contenteditable="true" data-getkey="br_wcsiswa_rt">...</td>
                    </tr>
                    <tr>
                        <td>h. WC Guru</td>
                        <td contenteditable="true" data-getkey="br_wcguru_jumlah">...</td>
                        <td contenteditable="true" data-getkey="br_wcguru_b">...</td>
                        <td contenteditable="true" data-getkey="br_wcguru_s">...</td>
                        <td contenteditable="true" data-getkey="br_wcguru_rr">...</td>
                        <td contenteditable="true" data-getkey="br_wcguru_rb">...</td>
                        <td contenteditable="true" data-getkey="br_wcguru_rt">...</td>
                    </tr>
                    <tr>
                        <td>i. Rumah Dinas Kepsek </td>
                        <td contenteditable="true" data-getkey="br_rumahdinaskepsek_jumlah">...</td>
                        <td contenteditable="true" data-getkey="br_rumahdinaskepsek_b">...</td>
                        <td contenteditable="true" data-getkey="br_rumahdinaskepsek_s">...</td>
                        <td contenteditable="true" data-getkey="br_rumahdinaskepsek_rr">...</td>
                        <td contenteditable="true" data-getkey="br_rumahdinaskepsek_rb">...</td>
                        <td contenteditable="true" data-getkey="br_rumahdinaskepsek_rt">...</td>
                    </tr>
                    <tr>
                        <td>j. Rumah Dinas Guru</td>
                        <td contenteditable="true" data-getkey="br_rumahdinasguru_jumlah">...</td>
                        <td contenteditable="true" data-getkey="br_rumahdinasguru_b">...</td>
                        <td contenteditable="true" data-getkey="br_rumahdinasguru_s">...</td>
                        <td contenteditable="true" data-getkey="br_rumahdinasguru_rr">...</td>
                        <td contenteditable="true" data-getkey="br_rumahdinasguru_rb">...</td>
                        <td contenteditable="true" data-getkey="br_rumahdinasguru_rt">...</td>
                    </tr>
                    <tr>
                        <td>k. Rumah Dinas Penjaga</td>
                        <td contenteditable="true" data-getkey="br_rumahdinaspenjaga_jumlah">...</td>
                        <td contenteditable="true" data-getkey="br_rumahdinaspenjaga_b">...</td>
                        <td contenteditable="true" data-getkey="br_rumahdinaspenjaga_s">...</td>
                        <td contenteditable="true" data-getkey="br_rumahdinaspenjaga_rr">...</td>
                        <td contenteditable="true" data-getkey="br_rumahdinaspenjaga_rb">...</td>
                        <td contenteditable="true" data-getkey="br_rumahdinaspenjaga_rt">...</td>
                    </tr>
                    <tr>
                        <td>l. Sarana Air Bersih</td>
                        <td contenteditable="true" data-getkey="br_saranaairbersih">...</td>
                        <td colspan="5">1. Ledeng; 2. Sumur; <br />3. Tidak ada; 4. Lainnya</td>
                    </tr>
                    <tr>
                        <td>m. Sarana Listrik</td>
                        <td contenteditable="true" data-getkey="br_saranalistrik">...</td>
                        <td colspan="5">1. 450VA; 2. 900 VA;<br />3. 1300VA; 4. >1300VA <br />5. >2200VA; 6.
                            lainnya
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
        <div class="w3-left w3-margin"> </div>
        <div class="w3-right" >
            <table class="tabelbiasa tabelbiasaputih" style="font-size:10px">

                <tbody class="garis">
                    <tr>
                        <th rowspan="2">SARANA DASAR</th>
                        <th rowspan="2">JUMLAH</th>
                        <th colspan="3">KONDISI</th>


                    </tr>
                    <tr>
                        <th>B</th>
                        <th>OK</th>
                        <th>R</th>

                    </tr>
                    <tr>
                        <td>
                            a. Meja Siswa <br />(Double)
                        </td>
                        <td contenteditable="true" data-getkey="sd_mejasiswadouble_jumlah"></td>
                        <td contenteditable="true" data-getkey="sd_mejasiswadouble_b"></td>
                        <td contenteditable="true" data-getkey="sd_mejasiswadouble_ok"></td>
                        <td contenteditable="true" data-getkey="sd_mejasiswadouble_r"></td>
                    </tr>
                    <tr>
                        <td>
                            b.Bangku (Double)
                        </td>
                        <td contenteditable="true" data-getkey="sd_bangkudouble_jumlah"></td>
                        <td contenteditable="true" data-getkey="sd_bangkudouble_b"></td>
                        <td contenteditable="true" data-getkey="sd_bangkudouble_ok"></td>
                        <td contenteditable="true" data-getkey="sd_bangkudouble_r"></td>
                    </tr>
                    <tr>
                        <td>
                            c. Meja Siswa (Single)
                        </td>
                        <td contenteditable="true" data-getkey="sd_mejasiswasingle_jumlah"></td>
                        <td contenteditable="true" data-getkey="sd_mejasiswasingle_b"></td>
                        <td contenteditable="true" data-getkey="sd_mejasiswasingle_ok"></td>
                        <td contenteditable="true" data-getkey="sd_mejasiswasingle_r"></td>
                    </tr>
                    <tr>
                        <td>
                            d. Kursi (Single)
                        </td>
                        <td contenteditable="true" data-getkey="sd_kursisingle_jumlah"></td>
                        <td contenteditable="true" data-getkey="sd_kursisingle_b"></td>
                        <td contenteditable="true" data-getkey="sd_kursisingle_ok"></td>
                        <td contenteditable="true" data-getkey="sd_kursisingle_r"></td>
                    </tr>
                    <tr>
                        <td>
                            e.Lemari
                        </td>
                        <td contenteditable="true" data-getkey="sd_lemari_jumlah"></td>
                        <td contenteditable="true" data-getkey="sd_lemari_b"></td>
                        <td contenteditable="true" data-getkey="sd_lemari_ok"></td>
                        <td contenteditable="true" data-getkey="sd_lemari_r"></td>
                    </tr>
                    <tr>
                        <td>
                            f. Meja Guru
                        </td>
                        <td contenteditable="true" data-getkey="sd_mejaguru_jumlah"></td>
                        <td contenteditable="true" data-getkey="sd_mejaguru_b"></td>
                        <td contenteditable="true" data-getkey="sd_mejaguru_ok"></td>
                        <td contenteditable="true" data-getkey="sd_mejaguru_r"></td>
                    </tr>
                    <tr>
                        <td>
                            g.Kursi Guru
                        </td>
                        <td contenteditable="true" data-getkey="sd_kursiguru_jumlah"></td>
                        <td contenteditable="true" data-getkey="sd_kursiguru_b"></td>
                        <td contenteditable="true" data-getkey="sd_kursiguru_ok"></td>
                        <td contenteditable="true" data-getkey="sd_kursiguru_r"></td>
                    </tr>
                    <tr>
                        <td>
                            h.Papan Tulis
                        </td>
                        <td contenteditable="true" data-getkey="sd_papantulis_jumlah"></td>
                        <td contenteditable="true" data-getkey="sd_papantulis_b"></td>
                        <td contenteditable="true" data-getkey="sd_papantulis_ok"></td>
                        <td contenteditable="true" data-getkey="sd_papantulis_r"></td>
                    </tr>
                    <tr>
                        <td>
                            i.Kursi Tamu
                        </td>
                        <td contenteditable="true" data-getkey="sd_kursitamu_jumlah"></td>
                        <td contenteditable="true" data-getkey="sd_kursitamu_b"></td>
                        <td contenteditable="true" data-getkey="sd_kursitamu_ok"></td>
                        <td contenteditable="true" data-getkey="sd_kursitamu_r"></td>
                    </tr>
                    <tr>
                        <td>
                            j. Rak Buku
                        </td>
                        <td contenteditable="true" data-getkey="sd_rakbuku_jumlah"></td>
                        <td contenteditable="true" data-getkey="sd_rakbuku_b"></td>
                        <td contenteditable="true" data-getkey="sd_rakbuku_ok"></td>
                        <td contenteditable="true" data-getkey="sd_rakbuku_r"></td>

                    </tr>
                    </tr>
                    <tr>
                        <td>
                            l. Komputer
                        </td>
                        <td contenteditable="true" data-getkey="sd_komputer_jumlah"></td>
                        <td contenteditable="true" data-getkey="sd_komputer_b"></td>
                        <td contenteditable="true" data-getkey="sd_komputer_ok"></td>
                        <td contenteditable="true" data-getkey="sd_komputer_r"></td>

                    </tr>

                </tbody>

            </table>
        </div>




    </div>
    <div class="w3-left  w3-container" style="width: 40%;">
        <b>KEUANGAN BOS</b>
        <table>
            <tr>
                <td>1. Saldo Awal Triwulan</td>
                <td contenteditable="true" class="w3-border w3-border-black  w3-padding-small">Rp.
                    ............</td>
            </tr>
            <tr>
                <td>2. Penerimaan dalam Triwulan</td>
                <td contenteditable="true" class="w3-border w3-border-black  w3-padding-small">Rp.
                    ............</td>
            </tr>
            <tr>
                <td>3. Pengembalian</td>
                <td contenteditable="true" class="w3-border w3-border-black  w3-padding-small">Rp.
                    ............</td>
            </tr>
            <tr>
                <td>4. Penggunaan dalam Triwulan</td>
                <td contenteditable="true" class="w3-border w3-border-black  w3-padding-small">Rp.
                    ............</td>
            </tr>
            <tr>
                <td>5. Saldo Akhir Tahun</td>
                <td contenteditable="true" class="w3-border w3-border-black  w3-padding-small">Rp.
                    ............</td>
            </tr>
        </table>
        <br />
        <b>CATATAN KEJADIAN PENTING /KHUSUS</b>
        <div class="w3-border-black w3-border w3-round w3-margin w3-padding" contenteditable="true">

        </div>
    </div>


</div>`;
    div.innerHTML = html;
    let getkey; //objek dataprofil
    let el = document.querySelectorAll("[data-getkey]");
    let ob,h,v;
    if(jsonprofilsekolah.length == 0){
        
        let tab = "profilsekolah"
        let tabel = tabel_profilsekolah();
        
        let head = tabel[0];
        let key = JSON.stringify(head);
        let datakirim = new FormData();
    
        datakirim.append("tab",tab)
        datakirim.append("key",key)
        fetch(linktendik+"?action=getpostdatafromtab",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
           
           let dataa = r.data[0];
           let data = Object.keys(dataa)
           getkey = r.data[0];
            jsonprofilsekolah = r.data;
            let koso = [];
            
            el.forEach(s =>{
                let k = s.getAttribute("data-getkey");
                let div = document.querySelector(`[data-getkey=${k}]`);
                if(div !== null){
                    div.innerHTML = getkey[k]
                }else{
                    koso.push(k)
                }
        
            });
            document.querySelector('[dataset-getkey="gabungan_nis_nss_npsn"').innerHTML = getkey.nis+"/"+getkey.nss+"/"+getkey.npsn;

        })
        .catch(er => console.log(er))
    }else{
        getkey = jsonprofilsekolah[0];
        let koso = [];
       
        el.forEach(s =>{
            let k = s.getAttribute("data-getkey");
            let div = document.querySelector(`[data-getkey=${k}]`);
            if(div !== null){
                div.innerHTML = getkey[k]
            }else{
                koso.push(k)
            };
            
        })
        document.querySelector('[dataset-getkey="gabungan_nis_nss_npsn"').innerHTML = getkey.nis+"/"+getkey.nss+"/"+getkey.npsn;
    }

});

const sinkronkandatasiswa = async () => {
    new_loading.style.display = "block";
    let kodess = jlo.ss_datauser;
        let linkakun = jlo.url_datauser ;//k.url_datauser + "?action=login&idss=" + k.ss_datauser; 
        let setdah = new FormData();
        setdah.append("idss",kodess);
        fetch(linkakun+"?action=alldatabasebukuindukpost",{method:"post",body:setdah})
            .then(m => m.json())
            .then(r => {
                db_utama_siswa = r.all;
                
            }).catch(er => console.log(er));

    await fetch(linkDataUserWithIdss + "&action=datakelasaktifall")
        .then(m => m.json())
        .then(k => {
            jsondatasiswa = k.datasiswa;
            //db_utama_siswa = k;//.datasiswa;//utamakan
            localStorage.setItem("datasiswa_all", JSON.stringify(k));

        }).catch(er => {
            console.log(er);
            alert('Maaf, terjadi gangguan. Coba lagi nanti')
        });


    await fetch(linkDataUserWithIdss + "&action=datasiswatidakaktif")
        .then(m => m.json())
        .then(k => {
            arraysiswatidakaktif = k.datasiswa;
            jumlahseluruhsiswadisekolah = k.total
            localStorage.setItem("datasiswatidakaktif", JSON.stringify(k))


        }).catch(er => {
            console.log(er);
            alert('Maaf, Terjadi gangguan. Coba lagi nanti...')

        });
    await fetch(linkDataUserWithIdss + "&action=usulanperbaikandata")
        .then(m => m.json())
        .then(k => {
            let dataaktif = k.datasiswa.filter(s => s.aktif == "aktif");
            let usulkelasini = k.datasiswa;//.filter(k => (k.nama_rombel == idNamaKelas));
            let usulkelasinibelumdisetujui = dataaktif.filter(k => (k.id !== "" && k.usulanperubahandata.indexOf("disetujui") == -1));
            // console.log(usulkelasinibelumdisetujui.length);
            // console.log(usulkelasinibelumdisetujui.length);

            let usulkelasinisudahdisetujui = dataaktif.filter(k => (k.id !== "" && k.usulanperubahandata.indexOf("disetujui") > -1));
            informasiusulandata["usulanbaru"] = usulkelasinibelumdisetujui;
            informasiusulandata["usulandisetujui"] = usulkelasinisudahdisetujui;
            informasiusulandata["all"] = usulkelasini;



        })
        .catch(er => {
            console.log(er);
        })
    
    new_loading.style.display = "none";
    alert('Proses sinkron berhasil.')
}

///////////////////////// umum.js
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

function logout() {
    tabeltempatdaftarkelassaya.innerHTML = "";
    w3_close();
    window.localStorage.clear();
    window.location.replace("/index.html")
}

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

///////////////////////////////// unfaedah.js



// const pembelajaran = () => {
//     alert("Ups, maaf. Fitur belum diaktifkan")
// }
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


// const frameeditor = () => {

// }


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
                // console.log(j.records[i].htmlgambar);
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


///////////////

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
    let jenjkelas = document.querySelector("input[id=hfd_jenjang]").value;
    console.log(jenjkelas)
    absenheader = "absen" + jenjkelas;
    url_absensiswa = jlo[absenheader];

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
        let jenjkelas = dataelemen["jenjang"];
        console.log(jenjkelas);
        absenheader = "absen" + jenjkelas;
        url_absensiswa = jlo[absenheader];

        infoloadingljk.innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"/></p>`
        await fetch(url_absensiswa + "?action=daftarulangduasheet", {
            method: "post",
            body: datakirim
        })
            .then(m => m.json())
            .then(r => {
                infoloadingljk.innerHTML = r.result;
                // console.log(r)
                let dataaktif = r.datasiswa.filter(s => s.aktif == "aktif");
                let bl = {};
                bl["datasiswa"] = dataaktif;
                jsondatasiswa = dataaktif;
                localStorage.setItem("datasiswa_all", JSON.stringify(bl));
                updatekan_dbsiswa_bukuinduk("lagicarikriteria");
                //carikriteria();
            })
            .catch(er => {
                console.log(er);
                infoloadingljk.innerHTML = "Terjadi kesalahan";
            })
        //updatesetelahverifikasidaftarulang();
    }
};
const updatekan_dbsiswa_bukuinduk = (kondisi) =>{
    fetch(linkdatabaseinduk+"?action=alldatabasebukuindukpost",{method:"post",body:data})
    .then(m => m.json())
    .then(r => {
        dbsiswa_bukuinduk = r.all;
        if(kondisi == "lagicarikriteria"){
            carikriteria();
        }
    }).catch(er => console.log(er))        
}
const updatesetelahverifikasidaftarulang = async () => {
    //await updateDatasiswa()
    // document.querySelector(".pesankhusussiswa").innerHTML = `<p class="w3-center"><img src="/img/barloading.gif"/></p>`;
    await fetch(linkDataUserWithIdss + "&action=usulanperbaikandata")
        .then(m => m.json())
        .then(k => {
            //console.log(k);
            let dataaktif = k.datasiswa.filter(s => s.aktif == "aktif");
            jsondatasiswa = dataaktif;
            localStorage.setItem("datasiswa_all", JSON.stringify(k))

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

    await fetch(linkDataUserWithIdss + "&action=datakelasaktifall")
        .then(m => m.json())
        .then(k => {
            // console.log(k);
            ///update local storage
            jsondatasiswa = k.datasiswa;
            localStorage.setItem("datasiswa_all", JSON.stringify(k));

            let sumber = k.datasiswa.filter(s => s.id == tokensiswa);

            // console.log(sumber);
            datahtml = htmlformulirdatasiswa(tokensiswa);
            infoloadingljk.innerHTML = `<div class="bio_print">${datahtml}</div>`;
            document.querySelector(".pengapprove").innerHTML = sumber[0].dieditoleh.toUpperCase();
            let obj = sumber[0];
           
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

const tutuploadingljk = () => {
    $('#infoloadingljk').nextAll('button').remove();
    $('#infoloadingljk').nextAll('center').remove();
    infoloadingljk.innerHTML = "";
    loadingljk.style.display = 'none'
}

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

}
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
        el.innerHTML = `<i class="fa fa-sort-amount-asc tangan w3-border"></i>`;//"&#8679;";
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
        el.innerHTML = `<i class="fa fa-sort-amount-desc tangan w3-border"></i>`;//"&#8681;";
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
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        el_label.innerHTML = `<img src="/img/barloading.gif"/>`
        //document.getElementById('uploadForm').submit();

        let src = e.target.result;
        let dataa = src.replace(/^.*,/, '');
        let tipe = src.match(/^.*(?=;)/)[0];
        //.match(/^.*(?=;)/)[0]
        //fn_upload_file(id_input, data, tipe);
        
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
        tablinks[i].className = tablinks[i].className.replace(" w3-green", "");
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
    let html = `<option value= "default">PILIH PTK YANG DIPERINTAH</option>`;
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
    let cekduluptk = document.querySelector("[data-keycreatesppd=ptk_diperintah]");
    if(cekduluptk.value == "default"){
        alert("Anda belum memilih PTK yang akan diperintah!");
        return
    }
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
    data.append("tabel",JSON.stringify(val));
    data.append("key",JSON.stringify(key));

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
                clearInterval(stoploadingtopbar);
                let divlod = document.querySelector(".loadingtopbar");
                divlod.style.width = "100%";
                    setTimeout(() => {
                        divlod.style.width = "1px"
                        divlod.className += " w3-hide";
        
                    }, 3000);    
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
    // untuk operator, bisa ngedit isian resum sppd. Biasanya untuk mengedit bagian poto poto
    // hapus keterangan ini jika sudah diterapkan di yang lain
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
                .catch(er => console.log(er));

                clearInterval(stoploadingtopbar);
                let divlod = document.querySelector(".loadingtopbar");
                divlod.style.width = "100%";
                    setTimeout(() => {
                        divlod.style.width = "1px"
                        divlod.className += " w3-hide";
        
                    }, 3000);

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
    simpan.onclick= null;
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
        let pAre = document.querySelector("."+paren);
        document.querySelector(".prevsppd_isiresume").scrollTo({ top: 0, behavior: 'smooth' });
        
        // tTop = (elemen.offsetTop + window.scrollY + pAre.offsetTop + 10)+"px";
        tTop = (elemen.offsetTop+ 10)+"px";
        lLeft = pAre.offsetLeft + "px";//(bataskanan - (keyboard.offsetWidth/2) + elemen.offsetLeft) + "px";
    }else{
        window.scrollTo({ top: 0, behavior: 'smooth' });
        let pAre = document.querySelector("."+paren);
        tTop = (elemen.offsetTop + 10) +"px";
        lLeft = pAre.offsetLeft + "px";//(bataskanan - (keyboard.offsetWidth/2) + elemen.offsetLeft) + "px";
    }
    console.log(tTop)
    console.log(lLeft)
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
    let edit_golruang = document.querySelector("#editabelsppd_golonganpegawai")
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
    edit_golruang.value = data.ptk_golongan;
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
                    let apiguru = dataapiguru.filter(s => s.id == id_guru)[0];
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
                // let objekvalue = [kegiatan, tanggal, fileresult, fileTIPE, namauser, 'dipublikasikan', 'Tidak Ada', 'Tidak Ada', lampiransppd];//tanpa idbaris
                let objekvalue = [kegiatan, tanggal, fileresult, fileTIPE, objek.ptk_diperintah, 'dipublikasikan', 'Tidak Ada', 'Tidak Ada', lampiransppd];//tanpa idbaris

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
///// NOTULA RAPAT

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
        let namafilenya = "butir_" + btr + "_kriteria_" + r + "_";
        let val = (ketval == "") ? namafilenya : ketval;
        let frmdata = new FormData();
        frmdata.append("videodataa", base64);
        frmdata.append("videofilenamee", namafilenya);
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