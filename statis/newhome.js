var modal = document.getElementById('id01'); // Get the modal
var mySidebar = document.getElementById("mySidebar"); // Get the Sidebar
var overlayBg = document.getElementById("myOverlay"); // Get the DIV with overlay effect
//variabel link login database
let url_login_guru,
    url_login_siswa,
    url_absenkaldik,linkDataUserWithIdss;
    let arraydatatendik = [];
    let jsondatasiswa = [];
// let varuser = "https://script.google.com/macros/s/AKfycbxHuxt_Kp96D6KkFG4XucslFcLOpJiokywKD-KFK7c1deXxW_-QFPSeM8ePUvu8BmV1/exec?idss=1XaZPz3uw6l-NO4wY-kZYydT9-3b-Wz7UHOl4e-YWHkE&action=dataeduraguru"    ;
let idNamaSekolah = "";
(async function () {
    loadingmodal.style.display = "block";

    let id = pelanggan_id;
    await fetch("https://script.google.com/macros/s/AKfycbwL1kT_ga2_KMMV1mPdZg_lDfhmur3Q1j5I_ZK7fvNIV7BIhkWF_zL0/exec?id=" + id)
        .then(m => m.json())
        .then(k => {
            // loadingmodal.style.display = "";
            window.localStorage.setItem("inst_id", JSON.stringify(k));
            url_login_guru = k.url_datauser + "?action=login&idss=" + k.ss_datauser; // pengganti script_url untuk memanggil data_user!
            url_login_siswa = k.url_datauser + "?action=loginsiswa&idss=" + k.ss_datauser; // pengganti script_url untuk memanggil data_user!
            url_absenkaldik = k.url_dataabsen + "?action=datakaldik&idss=" + k.ss_dataabsen; // pengganti script_url untuk memanggil data_user!
            linkDataUserWithIdss = k.url_datauser + "?idss="+ k.ss_datauser;
            // logologologo.innerHTML = `<img src="/img/lamaso.webp" style="height:60px;width:60px;object-fit: contain;"/>`
            // namasekolah.innerHTML = k.namainstansi;
            idNamaSekolah = k.namainstansi;
            // document.querySelector(".class_awassekolahbeda").innerHTML = k.namainstansi;
            // namakota.innerHTML = k.idkota + " " + k.kota;
            
            var tapel_bulan_ini = new Date().getMonth();
var tapel_bar, semester_bar;
if (tapel_bulan_ini >= 6) {
    tapel_bar = new Date().getFullYear() + "/" + (new Date().getFullYear() + 1);
    semester_bar = 1
} else {
    tapel_bar = (new Date().getFullYear() - 1) + "/" + new Date().getFullYear();
    semester_bar = 2;
}
// document.getElementById("tapel").innerHTML = tapel_bar;
// document.getElementsByClassName("bar_tapel")[0].innerHTML = "Semester " + semester_bar;

        }).catch(er => {
            console.log(er);
            //location.reload()

        })
        //await fetch("https://script.google.com/macros/s/AKfycbxHuxt_Kp96D6KkFG4XucslFcLOpJiokywKD-KFK7c1deXxW_-QFPSeM8ePUvu8BmV1/exec?idss=1XaZPz3uw6l-NO4wY-kZYydT9-3b-Wz7UHOl4e-YWHkE&action=datakelasaktifall")
    await fetch("https://script.google.com/macros/s/AKfycbxHuxt_Kp96D6KkFG4XucslFcLOpJiokywKD-KFK7c1deXxW_-QFPSeM8ePUvu8BmV1/exec?idss=1XaZPz3uw6l-NO4wY-kZYydT9-3b-Wz7UHOl4e-YWHkE&action=dataguruall")
        .then(m => m.json())
        .then(k => {
                
                //console.table(k.result)
                let html = "";
                let dd = k.result;

                let count = k.result.length;
                //console.log(count)
                for(let i = 0 ; i < count ; i++){
                    html += `<div class="mySlides w3-animate-fading container2"><img alt="potoprofilguruke-${(i+1)}" src="https://drive.google.com/uc?export=view&id=${dd[i].idpoto_potoguru}" style="width:280px" class="w3-circle"/><div class="container2 content2"> ${dd[i].guru_namalengkap}<br>${dd[i].gurukelas_gmp}  ${dd[i].kelasampu == "Kepala Sekolah"?"":dd[i].kelas} </div></div>`;
                }
                document.querySelector(".potopotoguru").innerHTML = html;
                var myIndex = 0;
carousel();

                function carousel() {
                    var i;
                    var x = document.getElementsByClassName("mySlides");
                    for (i = 0; i < x.length; i++) {
                        x[i].style.display = "none";
                    }
                    myIndex++;
                    if (myIndex > x.length) {
                        myIndex = 1
                    }
                    x[myIndex - 1].style.display = "block";
                    setTimeout(carousel, 5000);
                }
            }).catch(er=> console.log(er));
            
            loadingmodal.style.display = "none";       
            let tab = "profilsekolah"
            
            
            let head = ["kodesekolah", "nis", "nss", "npsn", "statussekolah", "akreditasi", "tahunpendirian", "noijin", "tanggal", "alamat", "kelurahan", "telepon", "email", "visi", "misi", "mampu", "kurangmampu", "tidakmampu", "hakmilik_luastanah", "bukanhakmilik_luastanah", "hakmilik_digunakanbangunan", "bukanhakmilik_digunakanbangunan", "asaltanah", "hakmilik_surathakmilik", "bukanhakmilik_surathakmilik", "luastanahrkb", "br_jumlahbangunan_jumlah", "br_jumlahbangunan_b", "br_jumlahbangunan_s", "br_jumlahbangunan_rr", "br_jumlahbangunan_rb", "br_jumlahbangunan_rt", "br_jumlahruangankelas_jumlah", "br_jumlahruangankelas_b", "br_jumlahruangankelas_s", "br_jumlahruangankelas_rr", "br_jumlahruangankelas_rb", "br_jumlahruangankelas_rt", "br_jumlahruanganperpustakaan_jumlah", "br_jumlahruanganperpustakaan_b", "br_jumlahruanganperpustakaan_s", "br_jumlahruanganperpustakaan_rr", "br_jumlahruanganperpustakaan_rb", "br_jumlahruanganperpustakaan_rt", "br_jumlahruangankomputer_jumlah", "br_jumlahruangankomputer_b", "br_jumlahruangankomputer_s", "br_jumlahruangankomputer_rr", "br_jumlahruangankomputer_rb", "br_jumlahruangankomputer_rt", "br_jumlahruanganlaboratorium_jumlah", "br_jumlahruanganlaboratorium_b", "br_jumlahruanganlaboratorium_s", "br_jumlahruanganlaboratorium_rr", "br_jumlahruanganlaboratorium_rb", "br_jumlahruanganlaboratorium_rt", "br_jumlahruanggurutu_jumlah", "br_jumlahruanggurutu_b", "br_jumlahruanggurutu_s", "br_jumlahruanggurutu_rr", "br_jumlahruanggurutu_rb", "br_jumlahruanggurutu_rt", "br_wcsiswa_jumlah", "br_wcsiswa_b", "br_wcsiswa_s", "br_wcsiswa_rr", "br_wcsiswa_rb", "br_wcsiswa_rt", "br_wcguru_jumlah", "br_wcguru_b", "br_wcguru_s", "br_wcguru_rr", "br_wcguru_rb", "br_wcguru_rt", "br_rumahdinaskepsek_jumlah", "br_rumahdinaskepsek_b", "br_rumahdinaskepsek_s", "br_rumahdinaskepsek_rr", "br_rumahdinaskepsek_rb", "br_rumahdinaskepsek_rt", "br_rumahdinasguru_jumlah", "br_rumahdinasguru_b", "br_rumahdinasguru_s", "br_rumahdinasguru_rr", "br_rumahdinasguru_rb", "br_rumahdinasguru_rt", "br_rumahdinaspenjaga_jumlah", "br_rumahdinaspenjaga_b", "br_rumahdinaspenjaga_s", "br_rumahdinaspenjaga_rr", "br_rumahdinaspenjaga_rb", "br_rumahdinaspenjaga_rt", "br_saranaairbersih", "br_saranalistrik", "sd_mejasiswadouble_jumlah", "sd_mejasiswadouble_b", "sd_mejasiswadouble_ok", "sd_mejasiswadouble_r", "sd_bangkudouble_jumlah", "sd_bangkudouble_b", "sd_bangkudouble_ok", "sd_bangkudouble_r", "sd_mejasiswasingle_jumlah", "sd_mejasiswasingle_b", "sd_mejasiswasingle_ok", "sd_mejasiswasingle_r", "sd_kursisingle_jumlah", "sd_kursisingle_b", "sd_kursisingle_ok", "sd_kursisingle_r", "sd_lemari_jumlah", "sd_lemari_b", "sd_lemari_ok", "sd_lemari_r", "sd_mejaguru_jumlah", "sd_mejaguru_b", "sd_mejaguru_ok", "sd_mejaguru_r", "sd_kursiguru_jumlah", "sd_kursiguru_b", "sd_kursiguru_ok", "sd_kursiguru_r", "sd_papantulis_jumlah", "sd_papantulis_b", "sd_papantulis_ok", "sd_papantulis_r", "sd_kursitamu_jumlah", "sd_kursitamu_b", "sd_kursitamu_ok", "sd_kursitamu_r", "sd_rakbuku_jumlah", "sd_rakbuku_b", "sd_rakbuku_ok", "sd_rakbuku_r", "sd_komputer_jumlah", "sd_komputer_b", "sd_komputer_ok", "sd_komputer_r"]
            let key = JSON.stringify(head);
            let datakirim = new FormData();
        
            datakirim.append("tab",tab)
            datakirim.append("key",key)
            let isiprofil = document.querySelector("#divprofilsekolah");
            let isivisimisi = document.querySelector("#divvisimisi");
            let isimisi = document.querySelector("#divmisi");
            let isitendik = document.querySelector("#divtendik");
            let htmll, htmll2, htmll3;
    await fetch("https://script.google.com/macros/s/AKfycbwH9yRSjjNz_AuEyhyDviBACraKflLs8wjy8JmNw-6pADHswTn8TxaVaLCGQSQ8jI2F4w/exec?action=getpostdatafromtab",{
                method:"post",
                body:datakirim
            }).then(m => m.json())
            .then(r => {
                
                htmll =`<table class="w3-table w3-striped w3-border"><tbody>`;
                let dt_profil = r.data[0];
               
htmll+=`<tr><td>Nama Sekolah</td><td>: ${idNamaSekolah}</td></tr>
<tr><td>Status Sekolah</td><td>: ${dt_profil.statussekolah}</td></tr>
<tr><td>NIS <br><sup>Nomor Induk Sekolah</sup></td><td>: ${dt_profil.nis}</td></tr>
<tr><td>NSS <br><sup>Nomor Statistik Sekolah</sup></td><td>: ${dt_profil.nss}</td></tr>
<tr><td>NPSN <br><sup>Nomor Pokok Sekolah Nasional</sup></td><td>: ${dt_profil.npsn}</td></tr>
<tr><td>Akreditasi</td><td>: ${dt_profil.akreditasi}</td></tr>
<tr><td>Alamat</td><td>: ${dt_profil.alamat} ${dt_profil.kelurahan}</td></tr>
<tr><td>Posel</td><td>: ${dt_profil.email}</td></tr>
<tr><td>Kelurahan</td><td>: ${dt_profil.kelurahan}</td></tr>

</tbody></table>
`
isiprofil.innerHTML = htmll;
htmll2=`<div class="w3-panel w3-center w3-leftbar w3-sand">
                 <p><i class="w3-serif w3-xlarge">
                 <span style="font-size:150px;line-height:0.6em;opacity:0.2">&#10004;</span>
                 ${dt_profil.visi}
                 </i></p>
               </div>`;
               isivisimisi.innerHTML = htmll2;               
               
               htmll3=`<div class="w3-panel w3-leftbar w3-sand">
                                <p><i class="w3-serif ">
                                <span style="line-height:0.6em;opacity:0.2">&#10004;</span>
                                ${dt_profil.misi}
                                </i></p>
                              </div>`;
                isimisi.innerHTML = htmll3;



            //    let dataa = r.data[0];
            //    let data = Object.keys(dataa)
               
            //     jsonprofilsekolah = r.data;
                
            //     for(let i = 0 ; i < data.length; i++){
                    
            //         document.querySelector(`[data-setkey=${data[i]}]`).innerHTML = dataa[data[i]];
    
            //     }
            }).catch(er => console.log(er))  
            
    
    
    if (arraydatatendik.length == 0) {
        await fetch("https://script.google.com/macros/s/AKfycbwH9yRSjjNz_AuEyhyDviBACraKflLs8wjy8JmNw-6pADHswTn8TxaVaLCGQSQ8jI2F4w/exec?action=tabeltendik")
            .then(m => m.json()).then(k => {
                // console.table(k);
                arraydatatendik = k;
                cektabeldataguru = k.filter(s => s[0] !== "idabsen");;
            })
            .catch(er => console.log(er))
    }
    let headD = arraydatatendik[0]
        let val = arraydatatendik.filter(s=> s[0] !== "idabsen");
        let tptk = arrObjek(headD,val);

    let tabel_statuskepegawaian = document.querySelector(".tabel_statuskepegawaian");
    let tdpeg = tabel_statuskepegawaian.getElementsByTagName("tbody")[0];
    let tfpeg = tabel_statuskepegawaian.getElementsByTagName("tfoot")[0];
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
    
    await fetch(linkDataUserWithIdss + "&action=datakelasaktifall")
        .then(m => m.json())
        .then(k => {
            jsondatasiswa = k.datasiswa.filter(s => s.aktif == "aktif");
            
            localStorage.setItem("datasiswa_all", JSON.stringify(k));

        }).catch(er => {
            console.log("muat ulang lagi: " + er);

        });
    document.querySelector("#jumlahsiswakelas1a").innerHTML = jsondatasiswa.filter(s => s.nama_rombel == "1A").length;
    document.querySelector("#jumlahsiswakelas1b").innerHTML = jsondatasiswa.filter(s => s.nama_rombel == "1B").length;
    document.querySelector("#jumlahsiswakelas2a").innerHTML = jsondatasiswa.filter(s => s.nama_rombel == "2A").length;
    document.querySelector("#jumlahsiswakelas2b").innerHTML = jsondatasiswa.filter(s => s.nama_rombel == "2B").length;
    document.querySelector("#jumlahsiswakelas3a").innerHTML = jsondatasiswa.filter(s => s.nama_rombel == "3A").length;
    document.querySelector("#jumlahsiswakelas3b").innerHTML = jsondatasiswa.filter(s => s.nama_rombel == "3B").length;
    document.querySelector("#jumlahsiswakelas3c").innerHTML = jsondatasiswa.filter(s => s.nama_rombel == "3C").length;
    document.querySelector("#jumlahsiswakelas4a").innerHTML = jsondatasiswa.filter(s => s.nama_rombel == "4A").length;
    document.querySelector("#jumlahsiswakelas4b").innerHTML = jsondatasiswa.filter(s => s.nama_rombel == "4B").length;
    document.querySelector("#jumlahsiswakelas4c").innerHTML = jsondatasiswa.filter(s => s.nama_rombel == "4C").length;
    document.querySelector("#jumlahsiswakelas5a").innerHTML = jsondatasiswa.filter(s => s.nama_rombel == "5A").length;
    document.querySelector("#jumlahsiswakelas5b").innerHTML = jsondatasiswa.filter(s => s.nama_rombel == "5B").length;
    document.querySelector("#jumlahsiswakelas6a").innerHTML = jsondatasiswa.filter(s => s.nama_rombel == "6A").length;
    document.querySelector("#jumlahsiswakelas6b").innerHTML = jsondatasiswa.filter(s => s.nama_rombel == "6B").length;
    

    

})();
        
        
const edurapilihlogin = ()=>{
    document.querySelector("#pilihlogin").style.display = "block";
    //console.log("tes")
}

// Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function () {

    if ($(this).scrollTop() > 100 && $(this).scrollTop() < 800) {
      $('#about').addClass('w3-animate-left');
    } else if ($(this).scrollTop() > 900) {
     $('#projects').addClass('w3-animate-left');
    } else {
      $('#projects').removeClass('w3-animate-left');
      $('#about').removeClass('w3-animate-left');
    }
  });

  function openMenu(evt, menuName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("menu");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" w3-dark-grey", "");
    }
    document.getElementById(menuName).style.display = "block";
    // evt.currentTarget.firstElementChild.className += " w3-dark-grey";
    evt.currentTarget.className += " w3-dark-grey";
  }
  document.getElementById("myLink").click();



  const arrObjek = (dataHead, datanya) => {
    let arr = []
    for (let i = 0 ; i < datanya.length ; i++){
        let valu = datanya[i];
        let obj ={};
        for( x in dataHead){
          obj[dataHead[x]] =valu[x]
        }
      arr.push(obj)
    }
    return arr
  }

  
const gurulogin = async () => {
    // kode untuk mengeksekusi login, abaikan dulu <--- harap dihapus jika tidak diabaikan

    // kode untuk mengeksekusi login, abaikan dulu <--- harap dihapus jika tidak diabaikan

    var inputusername = document.getElementById("namauser").value;
    var inputpassword = document.getElementById("passwordlogin").value;
    loaderform.innerHTML = "<i class='fa fa-spin fa-spinner' style='font-size:36px'></i> Prosess ..."

    await fetch(url_login_guru + "&username=" + inputusername + "&password=" + inputpassword)
        .then(m => m.json())
        .then(m => {
            //console.log(m);
            if (m.ijinkan == "ok") {
                window.localStorage.setItem("typeuser", JSON.stringify(m));
                if (m.akses == "Guru Kelas") {
                    //window.location.href="/user/guru.html";
                    window.location.replace("/user/guru.html");

                } else if (m.akses == "Guru Mapel") {
                    window.location.replace("/user/gmp.html");

                } else if (m.akses == "Kepala Sekolah") {

                    window.location.replace("/user/kepsek.html");
                } else if (m.akses == "Staff") {

                    window.location.replace("/user/staff.html");
                    location.reload()
                } else {

                }

            } else {
                loaderform.innerHTML = m.ijinkan;
                window.localStorage.removeItem("typeuser");

            }
            //tipeuser 


        }).catch(er => {
            //alert("Ups, maaf terjadi kesalahan ... 2 detik lagi akan kembali ("+er+")");
            console.log(er)
            // setTimeout(function(){
            //location.reload()

            fetch(url_login_guru + "&username=" + inputusername + "&password=" + inputpassword)
                .then(m => m.json())
                .then(m => {
                    //console.log(m);
                    if (m.ijinkan == "ok") {
                        window.localStorage.setItem("typeuser", JSON.stringify(m));
                        if (m.akses == "Guru Kelas") {
                            //window.location.href="/user/guru.html";
                            window.location.replace("/user/guru.html");

                        } else if (m.akses == "Guru Mapel") {
                            window.location.replace("/user/gmp.html");

                        } else if (m.akses == "Kepala Sekolah") {

                            window.location.replace("/user/kepsek.html");
                        } else if (m.akses == "Staff") {

                            window.location.replace("/user/staff.html");
                            location.reload()
                        } else {

                        }

                    } else {
                        loaderform.innerHTML = m.ijinkan;
                        window.localStorage.removeItem("typeuser");

                    }
                })
            // },2000)
        });




};


function w3_open() { // Toggle between showing and hiding the sidebar, and add overlay effect
    if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
        overlayBg.style.display = "none";
    } else {
        mySidebar.style.display = 'block';
        overlayBg.style.display = "block";
    }
};

function w3_close() { // Close the sidebar with the close button
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
};

function loginelamaso() { //fungsi pada bar

    //buatsiswa.scrollIntoView();

    w3_close();
};

function fn2lihatpassword(id, labell) { // fungsi untuk melihat input password (dalam simbol atau teks biasa)
    var x = document.getElementById(id);
    var label = document.getElementById(labell);
    if (x.type === "password") {
        x.type = "text";
        label.innerHTML = "<i class='fa fa-eye-slash'></i> Sembunyikan Password"
    } else {
        x.type = "password";
        label.innerHTML = "<i class='fa fa-eye'></i> Lihat Password"
    }

};

const kliklamaso = async () => {
    ceksiswa.innerHTML = "<i class='fa fa-spin fa-spinner'></i>"
    let inputvalue = previewtoken.value;
    await fetch(url_login_siswa + "&id=" + inputvalue)
        .then(m => m.json())
        .then(k => {
            // console.log(k)
            if (k.ijinkan == "ok") {
                window.localStorage.setItem("typeuser", JSON.stringify(k));
                window.location.replace("/user/siswa.html");
                // ceksiswa.innerHTML = k.ijinkan;

            } else {
                ceksiswa.innerHTML = k.ijinkan;
                window.localStorage.removeItem("typeuser");
            }

        }).catch(err => {
            console.log("terjadi error, sedang meminta kembali: " + err);
            fetch(url_login_siswa + "&id=" + inputvalue).then(m => m.json())
                .then(k => {
                    // console.log(k)
                    if (k.ijinkan == "ok") {
                        window.localStorage.setItem("typeuser", JSON.stringify(k));
                        window.location.replace("/user/siswa.html");
                        // ceksiswa.innerHTML = k.ijinkan;

                    } else {
                        ceksiswa.innerHTML = k.ijinkan;
                        window.localStorage.removeItem("typeuser");
                    }
                })
        })
}


const loginot = () => {
    cek.innerHTML = "<i class='fa fa-spin fa-spinner'></i>"
    let inputvalue = previewtokenn.value;
    fetch(url_login_siswa + "&id=" + inputvalue)
      .then(m => m.json())
      .then(k => {
        console.log(k);
        if (k.ijinkan == "ok") {
          k["ote"] = "orangtua";
          window.localStorage.setItem("typeuser", JSON.stringify(k));
          window.location.replace("/user/orangtua.html");
          // ceksiswa.innerHTML = k.ijinkan;
  
        } else {
          cek.innerHTML = k.ijinkan;
          window.localStorage.removeItem("typeuser");
        }
  
      })
  }
/////////////////////////
