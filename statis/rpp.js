
const chg_rppsampai = ()=>{
    let ck = document.querySelector("#rpp_tglsampai")
    let dv = document.querySelector("#dv_tglsampai")
    if(ck.checked){
        //dicek ada ga
        dv.classList.remove("w3-hide")
    }else{
        dv.classList.add("w3-hide")
    }
}
const admguru = async()=>{
    tampilinsublamangurukelas("administrasiguru");
    cekApiSebaranKD()
    await kurikulumdiamdiam()
    document.querySelector(".tabrpp").click();
    let datakirim2 = new FormData();
    datakirim2.append("action","getdatautama");
    datakirim2.append("idsreadsheet",jlo.ss_datauser);


    fetch(linkdatabaseinduk,{method:"post",body:datakirim2})
    .then(m => m.json())
    .then(r =>{
        db_utama_siswa = r.all;
    }).catch(er => {
        console.log(er)
    });
}

const boolean_gmp = () =>{
    let bol = false;
    if(window.location.href.indexOf("gmp.html")>-1){
        bol = true
    }
    return bol
}


let halaman_dbrpp = 1; // Halaman ini (current_page)
let perhalaman_dbrpp = 1; // halaman yang tampil di layout (records_per_page)
let arrayObjek_dbrpp; //arrayObjek yang akan diolah;
let pagerpp_awal = document.querySelector(".pagerpp_awal");
let pagerpp_sebelum = document.querySelector(".pagerpp_sebelum");
let span_pagerpp_halaman = document.querySelector(".pagerpp_halaman");
let pagerpp_selanjutnya = document.querySelector(".pagerpp_selanjutnya");
let pagerpp_akhir = document.querySelector(".pagerpp_akhir");
let area_dbrpp = document.querySelector(".printarea_rpp");
let obdBRpp_dbrpp;
let cekliktematiknontematik = document.getElementById("rpp_tematiknontematik");
let ceklik_dilampirin = document.querySelector(".lampiran_rpptematiknontematik");
let pagination_rpp = document.querySelector(".pagination_rpp");

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
    if(evt.currentTarget.innerHTML == "Database RPP"){
        //console.log("Anda fokus ke TAB Database RPP");
        if(!localStorage.hasOwnProperty("jadwaltematik_1")){
            alert("Anda sebaiknya melihat Jadwal Pembelajaran Tentatif di menu tab Kalender pendidikan terlebih dahulu untuk menggenerate pelaksanaan RPP database RPP. Cek tiap semester!");
            area_dbrpp.innerHTML = `<h3 class="w3-center w3-margin-top w3-xxlarge">Belum Siap menampilkan Database RPP karena tidak ada data lokal Jadwal Pembelajaran Tentif di semester 1</h3>`;
            if(pagination_rpp.className.indexOf("w3-hide")==-1){
                pagination_rpp.classList.add("w3-hide")
            }
            return
        }
        if(!localStorage.hasOwnProperty("jadwaltematik_2")){
            alert("Anda sebaiknya melihat Jadwal Pembelajaran Tentatif di menu tab Kalender pendidikan terlebih dahulu untuk menggenerate pelaksanaan RPP database RPP. Cek tiap semester!");
            area_dbrpp.innerHTML = `<h3 class="w3-center w3-margin-top w3-xxlarge">Belum Siap menampilkan Database RPP karena tidak ada data lokal Jadwal Pembelajaran Tentif di semester 1</h3>`;
            if(pagination_rpp.className.indexOf("w3-hide")==-1){
                pagination_rpp.classList.add("w3-hide")
            }
            return
        }
        if(tagrppserver == undefined || tagrppserver.length == 0){
            area_dbrpp.innerHTML = `<h3 class="w3-center w3-margin-top w3-xxlarge">Tidak ada database RPP di jenjang kelas ini</h3>`;
            if(pagination_rpp.className.indexOf("w3-hide")==-1){
                pagination_rpp.classList.add("w3-hide")
            }
        }else{
            let cekdulu 
            if(cekliktematiknontematik.checked){ /// tematik
                //tematik;
                area_dbrpp.innerHTML = `<h3 class="w3-center w3-margin-top w3-xxlarge">Tidak ada database RPP Tematik di jenjang kelas ini</h3>`;
                cekdulu = tagrppserver.filter(s=> s.tematik_nontematik == "tematik")
                if(cekdulu.length == 0){
                    if(pagination_rpp.className.indexOf("w3-hide")==-1){
                        pagination_rpp.classList.add("w3-hide")
                    }
                }else{
                    if(pagination_rpp.className.indexOf("w3-hide")>-1){
                        pagination_rpp.classList.remove("w3-hide")
                    }
                    obdBRpp_dbrpp = tagrppserver.filter(s=> s.tematik_nontematik == "tematik");
                    dbrpp_ubahHalaman(1);
                }
            }else{
                area_dbrpp.innerHTML = `<h3 class="w3-center w3-margin-top w3-xxlarge">Tidak ada database RPP Nontematik di jenjang kelas ini</h3>`;
                cekdulu = tagrppserver.filter(s=> s.tematik_nontematik == "nontematik")
                if(cekdulu.length == 0){
                    if(pagination_rpp.className.indexOf("w3-hide")==-1){
                        pagination_rpp.classList.add("w3-hide")
                    }
                }else{
                    if(pagination_rpp.className.indexOf("w3-hide")>-1){
                        pagination_rpp.classList.remove("w3-hide")
                    }
                    if(boolean_gmp){
                        obdBRpp_dbrpp = tagrppserver.filter(s=> s.tematik_nontematik == "nontematik" && s.tema_mapel == idgurumapelmapel);
                    }else{
                        obdBRpp_dbrpp = tagrppserver.filter(s=> s.tematik_nontematik == "nontematik");
                    }
                    dbrpp_ubahHalaman(1);
                }

            }
        }
    }
    document.getElementById(cityName).style.display = "block";
}


const dbrpp_ubahHalaman = (paramhalaman)=>{
    /** Alur kerja
     * saat fungsi ini bekerja, tentukan 
     */
    let tekstematiknontematik = cekliktematiknontematik.checked?"TEMATIK":"NONTEMATIK";
    let booleanlampiran = ceklik_dilampirin.checked;
    if(paramhalaman < 1) paramhalaman = 1
    if(paramhalaman>halamantotal_dbrpp()) paramhalaman = halamantotal_dbrpp();
    let html="";
    let html2="";
    let html3 = "";//rubrik
    let html4 = "";//sikap
    for(let i = (paramhalaman-1) * perhalaman_dbrpp; i < (paramhalaman * perhalaman_dbrpp) && i <obdBRpp_dbrpp.length; i++){
        //halamanrpp
        let ds = htmlrpp_dbrpp(i);
        html +=`${ds}`;
        //halaman lampiransikap
        //halaman rubrik
        if(booleanlampiran){
            html2+=`<div style="break-after: page;clear:both"></div><div class="w3-row">`;
            html4+=htmlsikap_dbrpp(i);
            let objekrubrik = Object.fromEntries(Object.entries(obdBRpp_dbrpp[i]).filter(([k,v])=> k.indexOf("rubrik_")>-1 && v !== ""));
            html3 +=`<div style="break-after: page;clear:both"></div><div class="w3-col l2 s2 w3-sand w3-padding"><div class="flag w3-blue">Lampiran Rubrik</div><h6>Rubrik</h6><div style="height:500px"></div></div><div class="w3-col l10 s10 w3-padding"><h4 class="w3-center" style="font-weight: bold;">Daftar Rubrik</h4>`;
            let arrObjekrubrik = Object.keys(objekrubrik);
            for(j = 0 ; j <arrObjekrubrik.length ; j++){
                let ke = arrObjekrubrik[j];
                let t_ke = ke.replace("rubrik","rubriktipe")
                let isidbke = obdBRpp_dbrpp[i][ke];
                html3+=`<div class="w3-border w3-round-large w3-padding w3-margin-bottom">${isidbke}</div>`;
                let jt = obdBRpp_dbrpp[i][t_ke]
                html2 += htmllampiran2_rubrik(jt,j);
            }
            html2 +=`</div>`;
            html3 +=`</div><div class="w3-hide-small w3-clear  w3-border-bottom"><div class="w3-center w3-border-top ">Halaman Pengaturan Rubrik RPP</div></div><div style="break-after: page;clear:both"></div>`;

        }
    }
    area_dbrpp.innerHTML = html;
    area_dbrpp.innerHTML += html3;
    area_dbrpp.innerHTML += html4;
    area_dbrpp.innerHTML += html2;
    span_pagerpp_halaman.innerHTML = "Halaman " + paramhalaman + " dari " + halamantotal_dbrpp();

    if(paramhalaman == 1){
        pagerpp_sebelum.style.display = "none";
        pagerpp_awal.style.display = "none"
    }else{
        pagerpp_sebelum.style.display = "inline-block";
        pagerpp_awal.style.display = "inline-block"
    }
    if(paramhalaman == halamantotal_dbrpp()){
        pagerpp_selanjutnya.style.display = "none";
        pagerpp_akhir.style.display = "none";
    }else{
        pagerpp_selanjutnya.style.display = "inline-block";
        pagerpp_akhir.style.display = "inline-block";
    }
}
const halamantotal_dbrpp = () =>{
    return Math.ceil(obdBRpp_dbrpp.length/perhalaman_dbrpp)
}
pagerpp_selanjutnya.addEventListener("click",()=>{
    if(halaman_dbrpp < halamantotal_dbrpp()){
        halaman_dbrpp++
        dbrpp_ubahHalaman(halaman_dbrpp)
    }
    //console.log("sedang klik btn selanjutnya");
})

pagerpp_sebelum.addEventListener("click",()=>{
    if(halaman_dbrpp > 1){
        halaman_dbrpp--;
        dbrpp_ubahHalaman(halaman_dbrpp)
    }
    //console.log("sedang klik btn sebelumnya");
});
pagerpp_awal.addEventListener("click",()=>{
    halaman_dbrpp = 1;
    dbrpp_ubahHalaman(halaman_dbrpp)
});
pagerpp_akhir.addEventListener("click",()=>{
    let h = halamantotal_dbrpp();
    halaman_dbrpp = h;
    dbrpp_ubahHalaman(halaman_dbrpp);
})
cekliktematiknontematik.addEventListener("change",()=>{
    if(tagrppserver == undefined || tagrppserver.length == 0){
        return
    }

    if(cekliktematiknontematik.checked){
        document.querySelector(".ket_rrptematiknontematik").innerHTML = "Tematik";
        obdBRpp_dbrpp = tagrppserver.filter(s=> s.tematik_nontematik == "tematik");
    }else{
        document.querySelector(".ket_rrptematiknontematik").innerHTML = "Nontematik";
        if(boolean_gmp){
            obdBRpp_dbrpp = tagrppserver.filter(s=> s.tematik_nontematik == "nontematik" &&  s.tema_mapel == idgurumapelmapel);;
        }else{
            obdBRpp_dbrpp = tagrppserver.filter(s=> s.tematik_nontematik == "nontematik");
        }
    }
    dbrpp_ubahHalaman(halaman_dbrpp)
})
ceklik_dilampirin.addEventListener("change",()=>{
    if(tagrppserver == undefined || tagrppserver.length == 0){
        return
    }
    dbrpp_ubahHalaman(halaman_dbrpp)
})
const htmlrpp_dbrpp = (indek) =>{
    
    let db = obdBRpp_dbrpp[indek];
    //console.log(db)
    let KDJson = DataKDKurtilas["kelas"+idJenjang]; // KD dari JSON
    let kurikulum = gabungdataserverkd();//KD dari Spreadhseet gabungan, termasuk data ceklis
    let TorMP = db.tematik_nontematik; // tematik atau nontematik
    let tema_mapel = db.tema_mapel; // t1_st1_pb1 atau MTK, PJOK, BSUND ....
    let semester = db.semester; // pengganti tagrpp_semester;
    // angka-angka tema!
    let partTema = TorMP=="tematik"?tema_mapel.split("_")[0].match(/(\d+)/)[0]:"";
    let partSubtema = TorMP=="tematik"?tema_mapel.split("_")[1].match(/(\d+)/)[0]:"";
    let partPb = TorMP=="tematik"?tema_mapel.split("_")[2].match(/(\d+)/)[0]:"";
    
    let cektanggalpelaksanaan  = TorMP =="tematik"?JSON.parse(localStorage.getItem("jadwaltematik_"+semester)):db;
    let tglKetemutematik = TorMP=="tematik"?cektanggalpelaksanaan[tema_mapel]:new Date(db.muatan_terpadu);
    let tanggalpelaksanaan = db.muatan_terpadu == ""&& TorMP=="nontematik"?"Belum diisi":Tanggaldenganhari(tglKetemutematik);
    let tanggalTTD = db.muatan_terpadu == ""&& TorMP=="nontematik"?"Belum diisi":tanggalfull(tglKetemutematik);

    
    let JudulKapital = TorMP=="tematik"?"TEMA "+tema_mapel.split("_")[0].match(/(\d+)/)[0]+" SUBTEMA "+tema_mapel.split("_")[1].match(/(\d+)/)[0]+" PEMBELAJARAN "+tema_mapel.split("_")[2].match(/(\d+)/)[0]:convertcodemapelkemapel(tema_mapel);
    let html = "";
    html +=`<div class="w3-row"><div class="w3-col l4 s4 w3-sand w3-center"><div class="w3-blue flag">Identitas RPP</div><h6>Satuan Pendidikan</h6><div>${idNamaSekolah}</div><hr><h6>Kelas/ Semester</h6><div><span>${idNamaKelas}</span>/<span>${db.semester}</span></div><hr>`;
    if(TorMP == "tematik"){
        let k0 = "Tema "+partTema;
        let k1 = "Subtema "+partSubtema;
        let tekk0 = KDJson.filter(s=>s[k0])[0][k0];
        let tekk1 = KDJson.filter(s=>s[k1])[0][k1];
        html+=`<div>Tema ${partTema}<br>${tekk0}</div><hr><div>SubTema ${partSubtema}<br>${tekk1}</div><hr><div>Pembelajaran ${partPb}</div><hr><h6>Muatan Terpadu:</h6>`;
            
        let dataCeklis = kurikulum.filter(s => s.semester.indexOf(semester)>-1 && s[tema_mapel] !=="");
        let objekData_this = dataCeklis.filter(s => s[tema_mapel] !=="").map(m => Object.fromEntries(Object.entries(m).filter(([k,v])=>k == "mapel" || k == "kd" ||  k =="kd4")));
        
        for(i = 0 ; i < objekData_this.length ; i++){
            html += `<div>${convertcodemapelkemapel(objekData_this[i].mapel)} (${objekData_this[i].kd}/${objekData_this[i].kd4})</div>`;
        }
    }else{
        //untuk nontematik
        html+=`<h6>Mata Pelajaran</h6><div>${convertcodemapelkemapel(tema_mapel)}</div><hr><h6>Materi Pokok</h6><div>${db.subtema_materipokok}</div>`;
    }
    html+=`<hr><h6>Alokasi Waktu</h6><div>${db.alokasi_waktu}</div><hr><h6>Pelaksanaan</h6><div>${tanggalpelaksanaan}</div>`;
    html +=`</div>`; //penutup class"w3-col l4 s4 .....""
    html+=`<div class="w3-col l8 s8 w3-padding"><h4 class="w3-center" style="font-weight: bold;">RENCANA PELAKSANAAN PEMBELAJARAN</h4><h5 class="w3-center" style="font-weight: bold;">${JudulKapital}</h5><hr><h5 style="font-weight: bold;">TUJUAN PEMBELAJARAN</h5><div class="w3-justify w3-margin-top">${db.tujuan_pembelajaran==""?"BELUM DIISI":db.tujuan_pembelajaran}</div><hr><h5 style="font-weight: bold;">LANGKAH PEMBELAJARAN</h5><div class="w3-justify w3-margin-top"><div class="w3-pale-green"><span style="font-weight: bold;">Pendahuluan</span><span class="w3-right">${db.aw_awal==""?"...":db.aw_awal} Menit</span><div class="w3-round-large w3-border w3-padding">${db.kegiatan_pendahuluan==""?"TIDAK DIISI":db.kegiatan_pendahuluan}</div></div><div class="w3-pale-blue w3-margin-top"><span style="font-weight: bold;">Kegiatan Inti</span><span class="w3-right">${db.aw_inti==""?"...":db.aw_inti} Menit</span><div class="w3-round-large w3-border w3-padding">${db.kegiatan_inti==""?"TIDAK DIISI":db.kegiatan_inti}</div></div><div class="w3-pale-red w3-margin-top"><span style="font-weight: bold;">Kegiatan Penutup</span><span class="w3-right">${db.aw_penutup==""?"...":db.aw_inti} Menit</span><div class="w3-round-large w3-border w3-padding">${db.kegiatan_penutup==""?"TIDAK DIISI":db.kegiatan_penutup}</div></div></div></div>`;
    html +=`<div class="w3-clear"></div><div class="w3-col l6 s6 m6 w3-center">Mengetahui,<br>Kepala <span>${idNamaSekolah}</span><br><br><br><br><br><u><b>${idNamaKepsek}</b></u><br><span>NIP. ${idNipKepsek}</span></div><div class="w3-col l6 s6 m6 w3-center"><span>Depok</span>, <span>${tanggalTTD}</span><br><span>${idJenisGuru}</span> <span>${idgurumapelmapel}</span><br><br><br><br><br><u><b>${namauser}</b></u><br><span>${idNipGuruKelas == ""?"-":"NIP. "+idNipGuruKelas}</span></div><div class="w3-hide-small w3-clear w3-border-bottom"><div class="w3-center  w3-border-top">Halaman Utama RPP (Halaman 1)</div></div>`;
    html +=`</div>`; // penutup class"w3-row"
    return html
}
const htmlsikap_dbrpp = (indek) =>{
    let db = obdBRpp_dbrpp[indek];
    let TorMP = db.tematik_nontematik; // tematik atau nontematik
    let tema_mapel = db.tema_mapel; // t1_st1_pb1 atau MTK, PJOK, BSUND ....
    let semester = db.semester;
    let cektanggalpelaksanaan  = TorMP =="tematik"?JSON.parse(localStorage.getItem("jadwaltematik_"+semester)):db;
    let tglKetemutematik = TorMP=="tematik"?cektanggalpelaksanaan[tema_mapel]:new Date(db.muatan_terpadu);
    let tanggalTTD = db.muatan_terpadu == ""&& TorMP=="nontematik"?"Belum diisi":tanggalfull(tglKetemutematik);
    let judul = TorMP=="tematik"?"TEMA "+tema_mapel.split("_")[0].match(/(\d+)/)[0]+" SUBTEMA "+tema_mapel.split("_")[1].match(/(\d+)/)[0]+" PEMBELAJARAN "+tema_mapel.split("_")[2].match(/(\d+)/)[0]:convertcodemapelkemapel(tema_mapel);
    
    let html =`<div style="break-after:page;clear:both;"></div><div class="w3-col l2 s3 w3-sandw3-padding"><div class="flag w3-blue">Lampiran 2</div><h6>Penilaian Sikap</h6><div class="kriteriasikap_rpptematiknontematik">Kriteria:<br>K = Kurang (1)<br>B = Baik (2)<br>C = Cukup (3)<br>SB = sangat Baik (4)</div><div style="height:500px"></div></div><div class="w3-col l10 s9 w3-padding"><h4 class="w3-center"  style="font-weight: bold;">Penilaian Sikap</h4><h5 class="w3-center">${judul}</h5><div style="overflow-x: auto;"><table class="w3-table garis w3-tiny"><thead><tr class="w3-light-gray"><th rowspan="3" valign="center" class="w3-center">No</th><th rowspan="3" valign="center" class="w3-center">Nama Siswa</th><th colspan="12" class="w3-center">Perubahan Tingkah Laku</th></tr><tr class="w3-light-gray"><th colspan="4" class="w3-center">Teliti</th><th colspan="4" class="w3-center">Cermat</th><th colspan="4" class="w3-center">Percaya Diri</th></tr><tr class="w3-light-gray"><th>SB</th><th>B</th><th>C</th><th>K</th><th>SB</th><th>B</th><th>C</th><th>K</th><th>SB</th><th>B</th><th>C</th><th>K</th></tr></thead><tbody>`;
    for(i=0 ; i < jsondatasiswa.length ; i++){
        html +=`<tr><td>${(i+1)}</td><td>${jsondatasiswa[i].pd_nama}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`;
    }
    html +=`</tbody></table></div></div><div class="w3-col l6 s6 m6 w3-center" style="visibility: hidden;">Mengetahui,</div><div class="w3-col l6 s6 m6 w3-center"><span>Depok</span>, <span>${tanggalTTD}</span><br><span>${idJenisGuru}</span> <span>${idgurumapelmapel}</span><br><br><br><br><br><u><b>${namauser}</b></u><br><span>${idNipGuruKelas == ""?"-":"NIP. "+idNipGuruKelas}</span></div><div class="w3-hide-small w3-clear w3-border-bottom"><div class="w3-center  w3-border-top">Halaman Lampiran Daftar Nilai Sikap </div></div>`;
    return html
}

const htmllampiran2_rubrik = (rubrikkode,indekrubrik) =>{
    
    let html = `<div class="w3-col l2 s2 w3-sand w3-padding"><div class="flag w3-blue">Lampiran ${(indekrubrik+3)}</div><h6>Daftar Nilai Rubrik ke-${(indekrubrik+1)}</h6><div class="w3-border w3-round-large w3-margin-bottom w3-tiny w3-padding">Kriteria rubrik ada di Lampiran Rubrik RPP ini</div></div><div class="w3-col l10 s10 w3-padding"><h4 class="w3-center">Daftar Nilai Rubrik ke-${(indekrubrik+1)}</h4><div style="overflow-x:auto">`;

    let dbsiswa = jsondatasiswa.map(m => m.pd_nama)
    if(rubrikkode == "tipe1"){
        html +=`<table class="w3-table-all garis w3-small"><thead><tr class="w3-light-gray"><th rowspan="2" class="w3-center" valign="center">No.</th><th rowspan="2" class="w3-center" valign="center">Nama Siswa</th><th colspan="4" class="w3-center">Kriteria Rubrik (isian ceklis)</th></tr><tr class="w3-light-gray"><th>Sangat Baik (4)</th><th>Baik (3)</th><th>Cukup(2)</th><th>Perlu Bimbingan(1)</th></tr></thead><tbody>`;
        for(i = 0 ; i < dbsiswa.length ; i++){
            html+=`<tr><td>${(i+1)}</td><td>${dbsiswa[i]}</td><td></td><td></td><td></td><td></td></tr>`;
        }
        html +=`</tbody></table>`;
    }else if(rubrikkode == "tipe2"){
        html +=`<table class="w3-table-all garis w3-small"><thead><tr class="w3-light-gray"><th rowspan="2" class="w3-center" valign="center">No.</th><th rowspan="2" class="w3-center" valign="center">Nama Siswa</th><th colspan="3" class="w3-center">Kriteria Rubrik (isian ceklis)</th></tr><tr class="w3-light-gray"><th>Baik</th><th>Cukup</th><th>Kurang</th></tr></thead><tbody>`;
        for(i = 0 ; i < dbsiswa.length ; i++){
            html+=`<tr><td>${(i+1)}</td><td>${dbsiswa[i]}</td><td></td><td></td><td></td></tr>`;
        }
        html +=`</tbody></table>`;

    }else if(rubrikkode == "tipe3"){
        html +=`<table class="w3-table-all garis w3-small"><thead><tr class="w3-light-gray"><th rowspan="2" class="w3-center" valign="center">No.</th><th rowspan="2" class="w3-center" valign="center">Nama Siswa</th><th colspan="4" class="w3-center">Kriteria Rubrik (isian ceklis)</th></tr><tr class="w3-light-gray"><th>4</th><th>3</th><th>2</th><th>1</th></tr></thead><tbody>`;
        for(i = 0 ; i < dbsiswa.length ; i++){
            html+=`<tr><td>${(i+1)}</td><td>${dbsiswa[i]}</td><td></td><td></td><td></td><td></td></tr>`;
        }
        html +=`</tbody></table>`;
    }else if(rubrikkode == "tipe4"){
        html +=`<table class="w3-table-all garis w3-small"><thead><tr class="w3-light-gray"><th rowspan="2" class="w3-center" valign="center">No.</th><th rowspan="2" class="w3-center" valign="center">Nama Siswa</th><th colspan="2" class="w3-center">Kriteria Rubrik (isian ceklis)</th></tr><tr class="w3-light-gray"><th valign="center" class="w3-center">Ada <br>(Tampak)<br>(Muncul)</th><th valign="center" class="w3-center">Tidak Ada <br>(Tidak Tampak)<br>(Tidak Muncul)</th></tr></thead><tbody>`;
        for(i = 0 ; i < dbsiswa.length ; i++){
            html+=`<tr><td>${(i+1)}</td><td>${dbsiswa[i]}</td><td></td><td></td></tr>`;
        }
        html +=`</tbody></table>`;
    }else if(rubrikkode == "tipe5"){
        html +=`<table class="w3-table-all garis w3-small"><thead><tr class="w3-light-gray"><th rowspan="2" class="w3-center" valign="center">No.</th><th rowspan="2" class="w3-center" valign="center">Nama Siswa</th><th colspan="2" class="w3-center">Kriteria Rubrik (isian angka)</th></tr><tr class="w3-light-gray"><th valign="center" class="w3-center">Aspek Pengetahuan</th><th valign="center" class="w3-center">Aspek Keterampilan</th></tr></thead><tbody>`;
        for(i = 0 ; i < dbsiswa.length ; i++){
            html+=`<tr><td>${(i+1)}</td><td>${dbsiswa[i]}</td><td></td><td></td></tr>`;
        }
        html +=`</tbody></table>`;
    }

    html +=`</div></div><div class="w3-col l6 s6 m6 w3-center" style="visibility: hidden;">Mengetahui</div><div class="w3-col l6 s6 m6 w3-center"><span class="dsgnrpp_kota">Depok</span>, <span class="dsgnrpp_tgl">RUBAH GA?</span><br><span class="jenisguru">Guru Kelas</span> <span class="dsgnrpp_kelasini">6A</span><br><br><br><br><br><u><b class="dsgnrpp_namaguru">Ade Andriansyah</b></u><br>NIP. <span class="dsgnrpp_nipguru">19870710 201403 1 002</span></div><div class="w3-hide-small w3-clear  w3-border-bottom"><div class="w3-center w3-border-top ">Lampiran Daftar Nilai Rubrik</div></div>`;
    return html
}

const trialScanLJK_ASAL = (param) =>{
    //(z_idhtmlmateri)
    
    let params = param.split("_");
    let par = params[1]; //indek materi kbm
    parameterbantuisiljk = par;
    let idsw = params[0]; //indek id siswa

    //alert (par);
    let siswabantu = JSON.parse(localStorage.getItem("datasiswa_" + idNamaKelas))["datasiswa"][idsw];
    let tk_siswa = siswabantu.id


    loadingljk.style.display = "block";

    //bikin judul h4
    let datamateri = kronologijson;
    kodebarismateriyangdikerjakan = datamateri[par].idbaris;
    
    console.log(datamateri);

    let versi = datamateri[par].versi;
    let adapg = (datamateri[par].jumlahpg == 0) ? false : true;

    let jumlahsoal = (datamateri[par].jumlahpg * 1) + (datamateri[par].jumlahessay * 1);

    //console.log(datamateri)
    var judul = document.createElement("h4")
    judul.setAttribute("class", "w3-center");
    judul.innerHTML = "TRIAL SCANNER LJK E-DURASA";

    let tes = document.getElementById("infoloadingljk");
    // tes.innerHTML = `<i class="fa fa-spin fa-refresh w3-xxxlarge"></i> On Process ...`
    tes.innerHTML = "";
    tes.appendChild(judul);
    tes.innerHTML +="Disini akan muncul Canvas"
    let cv = document.createElement("canvas");
    cv.setAttribute("style","width:355px;height:630px");
    cv.setAttribute("id","canvasScannerLJK")
    tes.appendChild(cv);
    //tambahkan tombol
    let inputImg =document.createElement("input")
    inputImg.setAttribute("type","file");
    inputImg.setAttribute("id","inputCanvasfile");
    inputImg.setAttribute("onchange","fn_inputCanvasFile()");
    tes.appendChild(inputImg)

    $.getJSON(constpreviewljk + "?idmateri=" + datamateri[par].idmateri + "&action=previewriwayat", function (json) {
         console.log(json)
        // document.getElementById("loadi").remove();
        let teks = (versi == "baru"?brkline(json).teks : brkline2(json).teks); 
        let kkc, kc;
        if (adapg) {
            kc = brkline(json).kunci;
            kkc = window.atob(kc).split(",").join("<br>");


        } else {
            kc = 0;
            kkc ="blank"
        }
        //document.querySelector("#infoloadingljk").innerHTML += teks;//brkline(json).teks;
        document.querySelector("#infoloadingljk").innerHTML += "<hr>";//brkline(json).teks;
        document.querySelector("#infoloadingljk").innerHTML += kkc;//brkline(json).teks;
        document.querySelector("#infoloadingljk").innerHTML += JSON.stringify(brkline(json).kd);//brkline(json).teks;


    })

}
const fn_inputCanvasFile = () =>{
    let elemenInput = document.getElementById("inputCanvasfile");
    var reader = new FileReader();
    let item = elemenInput.files[0]

    //image turned to base64-encoded Data URI.
    reader.readAsDataURL(item);
    reader.name = item.name; //get the image's name
    reader.size = item.size; //get the image's size
    reader.onload = function (event) {
        let mmtpe = event.target.result.match(/^.*(?=;)/)[0];
        var img = new Image(); //create a image
        img.src = event.target.result; //result is base64-encoded Data URI
        img.name = event.target.name; //set name (optional)
        img.size = event.target.size; //set size (optional)
        img.onload = function (el) {
            var elem = document.getElementById("canvasScannerLJK")

            //scale the image to 600 (width) and keep aspect ratio
            // var scaleFactor = resize_width / el.target.width;
            // elem.width = resize_width;
            // elem.height = el.target.height * scaleFactor;

            //draw in canvas
            var ctx = elem.getContext('2d');
            ctx.drawImage(el.target, 0, 0);

            //get the base64-encoded Data URI from the resize image
            // var srcEncoded = ctx.canvas.toDataURL(el.target, 'image/jpeg', 0);
            var srcEncoded = ctx.canvas.toDataURL(el.target, mmtpe, 0);





        }

    }


}
let strimingljk = ""
const tutupmodalljk = ()=>{
    
    let tempatperikspg = document.querySelector(".tempatperikspg");
    let tempatinfoawal = document.querySelector(".tempatinfoawal");
    let tempatperiksaessay = document.querySelector(".tempatperiksaessay");
    let formatljknotepadscanner = document.querySelector(".formatljknotepadscanner");

    tempatperikspg.innerHTML = "";
    tempatinfoawal.innerHTML = "";
    tempatperiksaessay.innerHTML = "";
    formatljknotepadscanner.innerHTML = "";
    document.getElementById("datakirimscanner").innerHTML ="";
    let modalL = document.getElementById("modal_scannerLJK");
    modalL.style.display = "none";
    // nantinya akan ada fungsi untuk menghentinkan proses kamera.
    if (strimingljk == "") {
        alert("Mohon tunggu, proses loading sedang berlangsung....");
        return
    }
    strimingljk.getTracks().forEach(k => k.stop());
}
const posisikamera = document.getElementById("tampilankameraLJK");
const posisiScreenshot  = document.getElementById("tampilanScreenshotLJK");
const btn_tapscanpertama = document.getElementById("tapscan_pertama");
const btn_tapscankedua = document.getElementById("tapscan_kedua");
const btn_tapscanfinish = document.getElementById("tapscan_finish");
const tabel_patokankameraPG = document.querySelector(".source_tabelkamera");
const bukaKameraScanner = () =>{
    let modalL = document.getElementById("modal_scannerLJK");
    modalL.style.display = "block";
    let tabelresult = document.querySelector(".tabeldeteksiwarna1");
    let tblR_body = tabelresult.getElementsByTagName("tbody")[0];
        for(i = 0 ; i <tblR_body.rows.length && i < 20 ; i++){
            let rRow = tblR_body.rows[i];
            for(j = 1 ; j < rRow.cells.length ; j++){
                let kl = rRow.cells[j];
                if(kl.hasAttribute("style")){
                    kl.removeAttribute("style")
                }
            }
        }
   
    let tabelresult2 = document.querySelector(".tabeldeteksiwarna2");
        let tblR_body2 = tabelresult2.getElementsByTagName("tbody")[0];
            for(i = 0 ; i <tblR_body2.rows.length && i < 20 ; i++){
                let rRow2 = tblR_body2.rows[i];
                for(j = 1 ; j < rRow2.cells.length ; j++){
                    let kl2 = rRow2.cells[j];
                    if(kl2.hasAttribute("style")){
                        kl2.removeAttribute("style")
                    }
                }
            }
    
    // document.querySelector(".patokan_PG").classList.remove("w3-hide");
    
    btn_tapscanpertama.innerHTML = "Ambil Gambar Part 1";
    btn_tapscanpertama.setAttribute("onclick","ambilscreenshotljk(1)");
    btn_tapscankedua.innerHTML = "Ambil Gambar Part 2";
    btn_tapscankedua.setAttribute("onclick","ambilscreenshotljk(2)");
    // document.querySelector(".patokan_tabelPG").style.width="90%";
    // nouruttabelpatokanPG(1);
    // saat klik:
    start_kameraLJK(1)
}
let mediaRecorderR;
let constraintObjA
const start_kameraLJK = (part) =>{
    document.querySelector(".patokan_tabelPG").style.width="90%";
    nouruttabelpatokanPG(part);
    let patokan = document.querySelector(".patokan_PG");
    let elemenvideo = document.querySelectorAll(".canvas_ljk");
    
    elemenvideo.forEach(el =>{
        if(el.className.indexOf("w3-hide")==-1){
            el.classList.add("w3-hide")
        }
    });
    posisikamera.classList.remove("w3-hide");
    let lTop = posisikamera.offsetTop;
    let lLeft = posisikamera.offsetLeft;
    
    
    patokan.style.top =  lTop + "px";
    patokan.style.left =  lLeft +"px";
    
    constraintObjA = {};
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    
    constraintObjA = {
        audio: false,
        video: {
            facingMode: "environment",
            width: { min: 978, max: 978 },
            height: { min: 550, max: 550}
        }
    };
    }else{
        constraintObjA = {
            audio: false,
            video: {
                facingMode: "environment",
                width:350,
                height:622
            }
        };
    }
    // width: 1280, height: 720  -- preference only
    // facingMode: {exact: "user"}
    // facingMode: "environment"

    //handle older browsers that might implement getUserMedia in some way
    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
        navigator.mediaDevices.getUserMedia = function (constraintObjA) {
            let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
            return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraintObjA, resolve, reject);
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


     navigator.mediaDevices.getUserMedia(constraintObjA)
        .then(function (mediaStreamObj) {
            //connect the media stream to the first video element
            let video = document.getElementById("tampilankameraLJK");
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

            strimingljk = mediaStreamObj;
            //add listeners for saving video/audio

            mediaRecorderR = new MediaRecorder(mediaStreamObj);
            let chunks = [];
            video.play();
           
            mediaRecorderR.ondataavailable = function (ev) {

                chunks.push(ev.data);
            }
            
            //ambilscreenshotljk(part)
        })
        .catch(function (err) {
            //console.log(err.name, err.message);
            alert(err.name + "\n" + err.message);
        });
        
        if(part == 1){
            btn_tapscanpertama.innerHTML = "Ambil Gambar Part 1";
            btn_tapscanpertama.setAttribute("onclick",`ambilscreenshotljk(1)`);
    
        }else{
            btn_tapscankedua.innerHTML = "Ambil Gambar Part 2";
            btn_tapscankedua.setAttribute("onclick",`ambilscreenshotljk(2)`);
        }

}

const ekstactKuncijawaban = (teks)=>{
    let ret = 0;
    switch(teks){
        case "A":
            ret = 1
        break;
        case "B":
            ret = 2
        break;
        case "C":
            ret = 3
        break;
        case "D":
            ret = 4
        break;

    }
    return ret
}
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

const warnaScrenshot = (x,y) =>{
    var canvas = document.getElementById("tampilanScreenshotLJK");
    var coord = "x=" + x + ", y=" + y;
    var context = canvas.getContext('2d');
    var pixelData = context.getImageData(x, y, 1, 1).data; 
    //console.log("left=" + x +", top="+y);
    // context.putImageData(pixelData, x, y);
    // console.log(pixelData);

    // If transparency on the image
    if((pixelData[0] == 0) && (pixelData[1] == 0) && (pixelData[2] == 0) && (pixelData[3] == 0)){
 				coord += " (Transparent color detected, cannot be converted to HEX)";
    }
    var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
    
   // document.getElementById("status").innerHTML = coord;
    //document.getElementById("color").style.backgroundColor = hex;
    // Draw the color and coordinates.
    // document.getElementById("status").innerHTML = coord;
    // document.getElementById("color").style.backgroundColor = hex;
    return hex
}
const warnahex = (x,y) =>{
    var canvas = document.getElementById("tampilanScreenshotLJK");
    var coord = "x=" + x + ", y=" + y;
    var context = canvas.getContext('2d');
    var pixelData = context.getImageData(x, y, 1, 1).data; 
    //console.log("left=" + x +", top="+y);
    // context.putImageData(pixelData, x, y);
    // console.log(pixelData);

    // If transparency on the image
    if((pixelData[0] == 0) && (pixelData[1] == 0) && (pixelData[2] == 0) && (pixelData[3] == 0)){
 				coord += " (Transparent color detected, cannot be converted to HEX)";
    }
    var hex = {"r":pixelData[0],"g": pixelData[1], "b":pixelData[2]};
    
   // document.getElementById("status").innerHTML = coord;
    //document.getElementById("color").style.backgroundColor = hex;
    // Draw the color and coordinates.
    // document.getElementById("status").innerHTML = coord;
    // document.getElementById("color").style.backgroundColor = hex;
    return hex
}

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
}

const nouruttabelpatokanPG = (part) =>{
    let start = part == 1? 1 : 21 ;
    let tbody = tabel_patokankameraPG.getElementsByTagName("tbody")[0];
    let R = tbody.rows;
    for(r=0;r<R.length ; r++){
        let col = R[r].cells;
        col[0].innerHTML= (start+r);
        
    }
    let ccanvas = document.querySelectorAll(".patokan_PG > span");
    ccanvas.forEach(el => el.remove())
    //bersihkan atribute style
    let tabelresult = part == 1? document.querySelector(".tabeldeteksiwarna1"): document.querySelector(".tabeldeteksiwarna2");
    let tblR_body = tabelresult.getElementsByTagName("tbody")[0];
    for(i = 0 ; i <tblR_body.rows.length && i < 20 ; i++){
        let rRow = tblR_body.rows[i];
        for(j = 1 ; j < rRow.cells.length ; j++){
            let kl = rRow.cells[j];
            if(kl.hasAttribute("style")){
                kl.removeAttribute("style")
            }
        }
    }


}
//// desain soal
let databasesoal = [];
let databasesoalall = [];
let databasesoalterhapus = [];
let databasesoalkosong = {};
let keydatabasesoal = [];
let keydatabaseratingsoal=[],databaseratingsoal=[],databaseratingsoalkosong=[];
let keydatabasesoalsimpananuser = [],databasesoalsimpananuser=[],databasesoalsimpananuserkosong = [];
//data fokus server bank soal:
//default:
let serverbsoal_jenjang = document.querySelector("[data-bsoal=jenjang]");
let serverbsoal_oleh = document.querySelector("[data-bsoal=oleh]");

serverbsoal_jenjang = idJenjang;
serverbsoal_oleh.innerHTML = namauser;

//dinamis:
let serverbsoal_bentuksoal = document.querySelector("[data-bsoal=bentuksoal]")

const tampilanawaldesainevaluasi = () =>{
    let dsgpg_step = document.querySelectorAll(".dsgpg_step");
    let p_pilihbentuksoal = document.querySelector(".p_pilihbentuksoal");
    p_pilihbentuksoal.innerHTML = `<img src="/img/barloading.gif"> <br>sedang memproses....`;
    let isikanrombel = document.getElementById("naskahsoal_rombel");
    isikanrombel.setAttribute("value",idNamaKelas);
    let isikanjenjang = document.getElementById("naskahsoal_jenjang");
    isikanjenjang.setAttribute("value",idJenjang);

    document.querySelector(".idns_rombel").innerHTML = idNamaKelas;
    document.querySelector(".idns_jenjang").innerHTML = idJenjang;

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
        p_pilihbentuksoal.innerHTML = `Pilih Bentuk Soal:`;
       //console.log(r);
       databasesoalkosong = [];
       keydatabasesoal = Object.keys(r.data[0]);
       if(r.result>1){
           databasesoal = r.data.filter(s=> s.hapus == "");
           databasesoalall = r.data
           databasesoalterhapus = r.data.filter(s=> s.hapus == "hapus");
       }
       for(i=0 ; i < keydatabasesoal.length; i++){
           databasesoalkosong[keydatabasesoal[i]]="";
       }
    }).catch(er=>console.log(er));


    for(i = 0 ; i < dsgpg_step.length ; i++){
        let el= dsgpg_step[i];
        if(el.className.indexOf("w3-hide")){
           el.classList.add("w3-hide")
        }
    }
    //isikan data-data di kartu soal:
    document.querySelector(".kartusoalnamasekolah").innerHTML = idNamaSekolah.toUpperCase();
    document.querySelector(".tapelkartusoal").innerHTML = "Tahun pelajaran " + idTeksTapel;
    document.querySelector("[data-bsoal=jenjang]").innerHTML = idJenjang;
    let divkhusus = document.querySelector(".desainsoalkhususkelas6");
    let inputpilihkelas = document.querySelectorAll("input[name=desainkhususkelas6_tag]")
    if(idJenjang == 6){
        if(divkhusus.className.indexOf("w3-hide")>-1){
            divkhusus.classList.remove("w3-hide");
        }
        inputpilihkelas.forEach(el=>{
            if(el.hasAttribute("checked")){
                el.removeAttribute("checked");
            }
        })
        document.getElementById("desainkhususkelas6_tagkelas6").checked = true;
    }else{
        if(divkhusus.className.indexOf("w3-hide")==-1){
            divkhusus.classList.add("w3-hide");
        }
        inputpilihkelas.forEach(el=>{
            if(el.hasAttribute("checked")){
                el.removeAttribute("checked");
            }
        })
    }
    simpanannaskahsoal();
    simpananratingsoal();
}


//step1, pilih bentuk soal PG atau ISIAN
const dsgpg_bentuksoal = document.querySelectorAll("input[name=dsgpg_bentuksoal");
const items_komponensoal = document.querySelectorAll(".dsgpg_item");
const divtipeopsipg = document.querySelector(".divtipeopsipg");
const shortcutkuncijawaban = document.querySelector(".shortcutkuncijawaban");
let arrayopsibaru = ["A","B","C","D"];
let tagtampilanpg="BIASA";
const spantampilanopsipg = document.getElementById("spantampilanopsipg");
const isianJumlahkolompg = document.querySelector(".jikaopsipgtabel");
const tipetamapilanpg = document.querySelectorAll("input[name=tipetamapilanpg]");
const divdsgn_pg = document.querySelector(".dsgbpg_opsipg");
const divkartusoal = document.getElementById("formatkartusoal");
let modso_awal = document.querySelector(".mbs_awal"), 
    modso_akhir = document.querySelector(".mbs_akhir"), 
    modso_selanjutnya = document.querySelector(".mbs_next"), 
    modso_sebelumnya = document.querySelector(".mbs_prev"), 
    modso_spanhalaman = document.querySelector(".mbs_infohalaman"), 
    modso_page_saatini=1, modso_per_page=1;
dsgpg_bentuksoal.forEach(el =>{
    el.addEventListener("change",()=>{
        if(el.checked){
            ijinsimpantiembanksoal = true;
            let val = el.value;
            serverbsoal_bentuksoal.innerHTML = val;
            document.querySelector(".dsgbpg_opsipg").innerHTML =""
            
            if(val == "Pilihan Ganda"){
                if(divtipeopsipg.className.indexOf("w3-hide")>-1){
                    divtipeopsipg.classList.remove("w3-hide");
                    shortcutkuncijawaban.classList.remove("w3-hide");
                };
            }else{
                if(divtipeopsipg.className.indexOf("w3-hide")==-1){
                    divtipeopsipg.classList.add("w3-hide");
                    shortcutkuncijawaban.classList.add("w3-hide")
                }
                
            }
            
            let dsgpg_step = document.querySelectorAll(".dsgpg_step");
            if(dsgpg_step[0].className.indexOf("w3-hide")>-1){
                dsgpg_step[0].classList.remove("w3-hide");
            };
            
            if(el.id == "desainbentuksoalessay"){
                if(dsgpg_step[1].className.indexOf("w3-hide")>-1){
                    dsgpg_step[1].classList.remove("w3-hide");
                }
                if(divkartusoal.className.indexOf("w3-hide")>-1){
                    divkartusoal.classList.remove("w3-hide")
                }
                document.querySelector(".buattooltippertanyaan").onclick = function(){
                    isiteksunsurbanksoal("formatkartusoal", "buattooltippertanyaan", "atas", "")
                    };
                document.querySelector(".buattooltipilustrasi").onclick = function(){
                        isiteksunsurbanksoal("formatkartusoal", "buattooltipilustrasi", "atas", "")
                    };
                document.querySelector(".buattooltippenskoran").onclick = function(){
                    isiteksunsurbanksoal("formatkartusoal", "buattooltippenskoran", "atas", "");
                    }
                document.querySelector(".klikmateritooltip").onclick = function (){        
                    isiteksunsurbanksoal("formatkartusoal", "klikmateritooltip", "atas", ""); 
                    } 
                document.querySelector(".klikindikatortooltip").onclick = function(){
                    isiteksunsurbanksoal("formatkartusoal", "klikindikatortooltip", "atas", ""); 
                    }
                document.querySelector(".klikrefrensitooltip").onclick = function(){
                    isiteksunsurbanksoal("formatkartusoal", "klikrefrensitooltip", "atas", ""); 
                    } 

            }

        }
    });
})
function setSelectedValue(selectObj, valueToSet) {
    for (var i = 0; i < selectObj.options.length; i++) {
        if (selectObj.options[i].value== valueToSet) {
            selectObj.options[i].selected = true;
            return;
        }
    }
}
const dsgpg_mapel = async ()=>{
    let steppgmapel = document.getElementById("steppgmapel");
    let options = steppgmapel.options;
    let indek = options.selectedIndex;
    let val = options[indek].value;
    let teks = options[indek].text;
    if(val =="default"){
        alert("Silakan pilih mapelnya");
        return
    }
    if(idgurumapelmapel.match(/[1-6]/)== null && val !== idgurumapelmapel){
        alert("Maaf, Anda sebagai guru mata pelajaran "+idgurumapelmapel+", Anda hanya bisa membuat soal sesuai bidang Anda.");
        setSelectedValue(steppgmapel, idgurumapelmapel);
        steppgmapel = document.getElementById("steppgmapel");
        options = steppgmapel.options;
        indek = options.selectedIndex;
        val = options[indek].value;
        teks = options[indek].text;
        
        
    }
    // let datakd = await gabungdataserverkd();
    let datakd = await gabungdataserverkdnaskahsoal();
    let datalingkupmateri = LingkupMateri[val];
    let dbkdmapel = datakd.filter(s=> s.mapel == val && (s.indikatorkd3 !=="" || s.indikatorkd4 !== ""));
    
    //sembunyikan dulu nomor KD-nya
    let labels = document.querySelectorAll(".lblindsgeval");
    labels.forEach(el=>{
        if(el.hasAttribute("checked")){
            el.removeAttribute("checked")
        }
        if(el.className.indexOf("w3-hide")==-1){
            el.classList.add("w3-hide")
        }
    });
    //setelah disembunyikan, tampilkan KD-KD yang ada di mapel yang telah dipilih;
    let bunyikd = document.querySelector(".bunyikdyandipilih");
    let isiankodemapel = document.querySelector("[data-bsoal=kodemapel]");
    let isianteksmapel = document.querySelector("[data-bsoal=tekskodemapel]");
    let isiankd = document.querySelector("[data-bsoal=kd]");
    let isiantekskd = document.querySelector("[data-bsoal=tekskd]");
    let isianlingkupmateri = document.querySelector("[data-bsoal=ruanglingkup]");
    isiantekskd.innerHTML = "";
    isiankd.innerHTML = "";
    isianlingkupmateri.innerHTML = "";

    isiankodemapel.innerHTML = val;
    isianteksmapel.innerHTML = teks;

    bunyikd.innerHTML = "";
    for(i = 0 ; i < labels.length && i < dbkdmapel.length; i++){
        labels[i].classList.remove("w3-hide");
        let kdklik = labels[i];
        let adaceklis = window.getComputedStyle(kdklik,"::before").content;
        if(adaceklis!=="none"){
            kdklik.style.backgroundColor= "inherit";
            kdklik.style.color= "inherit";
            kdklik.innerHTML =kdklik.innerHTML.replace("&#9989;","");
            // kdklik.style.setProperty("--content", "''");
            
        }


        kdklik.onclick = function(){
            let tekskd = dbkdmapel.filter(s=> s.kd == kdklik.innerHTML)[0];
            bunyikd.innerHTML = tekskd.indikatorkd3;
            isiantekskd.innerHTML = kdklik.innerHTML +" " + tekskd.indikatorkd3
            isiankd.innerHTML = kdklik.innerHTML;
            
            
            let dsgpg_step = document.querySelectorAll(".dsgpg_step");
            if(dsgpg_step[1].className.indexOf("w3-hide")>-1){
                dsgpg_step[1].classList.remove("w3-hide");
            }
             //isikan di kartusoal
        }
        //tambahkan fungsi onclick
    }
    //sembunyikan semua ruanglingkupmateri:
    let ruanglingkup = document.querySelectorAll(".labellingkupmateri");
    ruanglingkup.forEach(el=>{
        if(el.hasAttribute("checked")){
            el.removeAttribute("checked")
        }

        if(el.className.indexOf("w3-hide")==-1){
            el.classList.add("w3-hide")
        }
    });

    for(j = 0 ; j < ruanglingkup.length && j < datalingkupmateri.length; j++){
        //atur ulang value = tiap ruanglingkupmateri;
        if(ruanglingkup[j].className.indexOf("w3-hide")>-1){
            ruanglingkup[j].classList.remove("w3-hide");
        }
        let inputnya = document.getElementById("dsgnpg_lingkupmateri"+(j+1))
        inputnya.setAttribute("value",datalingkupmateri[j]);
        // ruanglingkup[j].setAttribute("value",datalingkupmateri[j]);
        ruanglingkup[j].innerHTML = datalingkupmateri[j];

        let divulang = ruanglingkup[j];
        divulang.onclick = function (){
            //isikan di kartusoal;
            let tesvalue = divulang.innerHTML;
            isianlingkupmateri.innerHTML = tesvalue;
            
        }

    }


}

const inputindikatorsoal = document.getElementById("indsgevalpgindikatorsoal");
inputindikatorsoal.addEventListener("input",()=>{
    document.querySelector("[data-bsoal=indikatorsoal]").innerHTML =  inputindikatorsoal.value;
})
const pilihlevelbsoal = document.getElementById("indsgevalpglevelsoal");
pilihlevelbsoal.addEventListener("change",()=>{
    let op = pilihlevelbsoal.options;
    let indek = op.selectedIndex;
    let val = op[indek].value;
    let teks = op[indek].text;
    document.querySelector("[data-bsoal=levelkognitif]").innerHTML = val;
    document.querySelector(".artilevel").innerHTML = teks;

})
const inputmateripokok = document.getElementById("indsgevalpgmateripokok");
inputmateripokok.addEventListener("input",()=>{
    document.querySelector("[data-bsoal=materi]").innerHTML= inputmateripokok.value
})

const tampilanopsipg = (el) =>{
    document.querySelector(".buattooltippertanyaan").onclick = null;
    document.querySelector(".buattooltipilustrasi").onclick = null;
    document.querySelector(".buattooltippenskoran").onclick = null;
    if(el.checked){
        tagtampilanpg = "BIASA";
        spantampilanopsipg.innerHTML = "BIASA";
        isianJumlahkolompg.classList.add("w3-hide")
    }else{
        tagtampilanpg = "TABEL"
        spantampilanopsipg.innerHTML = "TABEL";
        isianJumlahkolompg.classList.remove("w3-hide");
    }
    let v 
    tipetamapilanpg.forEach(elE=>{
        if(elE.checked){
            v = elE.value;
            
            let html = "";
            if(tagtampilanpg =="BIASA"){
                for(i = 0 ; i < v.length; i++){
                    html +=`<div class="w3-col" style="width:35px">${arrayopsibaru[i]}.</div>`
                    html +=`<div class="w3-rest tangan buattooltipopsipg${arrayopsibaru[i]}" data-bsoal="opsi${arrayopsibaru[i]}" title="klik untuk menambahkan teks">KLIK BAGIAN INI UNTUK MENGISI TEKS OPSI PG ${arrayopsibaru[i]}</div>`
                }
            }else{
                let htmll =`<table class="kartusoalpg_tabel w3-table garis">`
                let head = `<thead><tr class="w3-light-grey">`;
                let body = `<tbody>`
                let d = document.getElementById("opsipgkolomtabel").value;
                
                for(i = 0 ; i < v.length ; i ++){
                    body +=`<tr><td>${arrayopsibaru[i]}.</td>`
                    for(j = 0 ; j <d; j++){
                        if(j == 0 && i == 0){
                            head +=`<th style="width:35px"></th>`
                        }else if(j > 0 && i == 0){
                            head+=`<th class="headtabelopsi" contenteditable="true">Silakan Edit</th>`
                        }
                        if(j >0){
                            body +=`<td class="bodytabelopsi_col${j}_row${i}" title="klik Bagian ini untuk mengetikkan teks opsi pilhan ganda">KLIK BAGIAN INI UNTUK MENGETIK TEKS OPSI PG ${arrayopsibaru[i]}</td>`;
                        }
                        
                    }
                    body+=`</tr>`
                }
                head +=`</tr></thead>`;
                body +=`</tbody>`;
                
                htmll +=`${head}${body}</table>`;
                html = htmll
            }
            divdsgn_pg.innerHTML = html;
            
        }

    })
    //element pertanyaan
    document.querySelector(".buattooltippertanyaan").onclick = function(){
        
        isiteksunsurbanksoal("formatkartusoal", "buattooltippertanyaan", "atas", "")
    };
    document.querySelector(".buattooltipilustrasi").onclick = function(){
            isiteksunsurbanksoal("formatkartusoal", "buattooltipilustrasi", "atas", "")
        };
    document.querySelector(".buattooltippenskoran").onclick = function(){
        
        isiteksunsurbanksoal("formatkartusoal", "buattooltippenskoran", "atas", "");
    }
    
        
        
        

          
        aktifintooltipdidesainsoal(v);
}
// divdsgn_pg.innerHTML = ""

tipetamapilanpg.forEach(el=>{
    el.addEventListener("change",()=>{
        let v
        let html = "";
        if(el.checked){
            //element pertanyaan
            document.querySelector(".buattooltippertanyaan").onclick = null;
            document.querySelector(".buattooltipilustrasi").onclick = null;
            document.querySelector(".buattooltippenskoran").onclick = null;
             v = el.value;
            
            if(tagtampilanpg =="BIASA"){
                for(i = 0 ; i < v.length; i++){
                    html +=`<div class="w3-col" style="width:35px">${arrayopsibaru[i]}.</div>`
                    html +=`<div class="w3-rest tangan buattooltipopsipg${arrayopsibaru[i]}" data-bsoal="opsi${arrayopsibaru[i]}" title="klik untuk menambahkan teks">KLIK BAGIAN INI UNTUK MENGISI TEKS</div>`
                }
            }else{
                let htmll =`<table class="kartusoalpg_tabel w3-table garis">`
                let head = `<thead><tr class="w3-light-grey">`;
                let body = `<tbody>`
                let d = document.getElementById("opsipgkolomtabel").value;
                
                for(i = 0 ; i < v.length ; i ++){
                    body +=`<tr><td>${arrayopsibaru[i]}</td>`
                    for(j = 0 ; j <d; j++){
                        if(j == 0 && i == 0){
                            head +=`<th style="width:35px"></th>`
                        }else if(j > 0 && i == 0){
                            head+=`<th class="headtabelopsi" contenteditable="true">Silakan Edit</th>`
                        }
                        if(j >0){
                            body +=`<td class="bodytabelopsi_col${j}_row${i}" title="klik Bagian ini untuk mengetikkan teks opsi pilhan ganda">KLIK BAGIAN INI UNTUK MENGETIK TEKS</td>`;
                        }
                        
                    }
                    body+=`</tr>`
                }
                head +=`</tr></thead>`;
                body +=`</tbody>`;
                
                htmll +=`${head}${body}</table>`;
                html = htmll
            }
            // divdsgn_pg.innerHTML = html;
           
            //element pertanyaan
            document.querySelector(".buattooltippertanyaan").onclick = function(){
                //
                isiteksunsurbanksoal("formatkartusoal", "buattooltippertanyaan", "atas", "")};
            document.querySelector(".buattooltippenskoran").onclick = function(){
                
                isiteksunsurbanksoal("formatkartusoal", "buattooltippenskoran", "atas", "");}
            document.querySelector(".buattooltipilustrasi").onclick = function(){
                
                isiteksunsurbanksoal("formatkartusoal", "buattooltipilustrasi", "atas", "");}
                

        }
        
        divdsgn_pg.innerHTML = html;
        
        aktifintooltipdidesainsoal (v);
        if(divkartusoal.className.indexOf("w3-hide")>-1){
            divkartusoal.classList.remove("w3-hide")
        }
        
    })
});

const aktifintooltipdidesainsoal = (v) =>{
    if(tagtampilanpg =="BIASA"){
        for(i = 0 ; i < v.length; i++){
            // console.log(arrayopsibaru);
            let ttt = arrayopsibaru[i]
            // console.log(ttt)
            document.querySelector(`[data-bsoal=opsi${ttt}]`).onclick =function(){
                //buattooltipopsiA
                isiteksunsurbanksoal("formatkartusoal", `buattooltipopsipg${ttt}`, "atas", ""); 
            }
        }
    }else{
        let tbl = document.querySelector(".kartusoalpg_tabel");
        let tbdy = tbl.getElementsByTagName("tbody")[0];
        let rRow = tbdy.rows;
        for(a=0 ; a < rRow.length ; a++){
            let cCol = rRow[a].cells;
            for(b=0 ; b < cCol.length; b++){
                let sel = cCol[b];
                let iRow =  sel.parentElement.rowIndex;//.parentElement.rowIndex 
                let icol = sel.cellIndex;
                let tekskeslas = `bodytabelopsi_col${b}_row${a}`
                if(b>0){
                    sel.setAttribute("style","cursor:pointer");
                    sel.onmouseover = function (){
                        let tekstitle = "Baris "+ iRow + " Kolom " + icol;
                        sel.setAttribute("title",tekstitle)
                    }
                    sel.onmouseout = function () {
                        sel.removeAttribute("title");
                    }
                    sel.onclick = function (){
                        //console.log("lagi klik sel = ",sel.innerHTML+" tekstkelas " + tekskeslas)
                        // let atributkelas = sel.getAttribute("class");
                        // alert("isi sel=" +sel.innerHTML +"\r\n, dan atributnya: "+ atributkelas+"\r\n tekskelas"+tekskeslas);
                        isiteksunsurbanksoal("bataskiriformatkartusoal", tekskeslas, "atas", ""); 
                        // isiteksunsurbanksoal("formatkartusoal", "buattooltippenskoran", "atas", "");
                    }
                }

            }
        }


        // for(i = 0 ; i < v.length ; i ++){
        //    // document.querySelector(`[data-bsoal=opsi${arrayopsibaru[i]}]`).onclick =null;
        // }
        
    }
    
    document.querySelector(".klikmateritooltip").onclick = function (){        
        isiteksunsurbanksoal("formatkartusoal", "klikmateritooltip", "atas", ""); 
    } 
    document.querySelector(".klikindikatortooltip").onclick = function(){
        isiteksunsurbanksoal("formatkartusoal", "klikindikatortooltip", "atas", ""); 
    }
    document.querySelector(".klikrefrensitooltip").onclick = function(){
        isiteksunsurbanksoal("formatkartusoal", "klikrefrensitooltip", "atas", ""); 
    }  
}

const keyboardtooltipbaru = ()=>{
   
    let keyboardeditor2 = document.querySelector("#iframe_tooltipbaru_keyboardumum");
    let dockeyboardbaru = null;
    dockeyboardbaru = keyboardeditor2.contentDocument || keyboardeditor2.contentWindow.document;
            dockeyboardbaru.body.designMode = "on";
            dockeyboardbaru.body.setAttribute("spellcheck","false");
            dockeyboardbaru.body.setAttribute("contenteditable","true");
            dockeyboardbaru.body.setAttribute("id","edt4");
            // dockeyboardbaru.body.setAttribute("style","font-size:12px");
        var root = window.location.origin;
        dockeyboardbaru.head.innerHTML = `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link href="https://fonts.googleapis.com/css?family=Raleway">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link rel="stylesheet" href="https://syahandrianeda.github.io/syahandrianeda/css/stylegurukelas.css">`;
        
    dockeyboardbaru.addEventListener("input",(e)=>{
        let v = e.target;
        let domm = v.querySelectorAll("div");
        // if(v.childNodes[0].nodeName == "#text"){
        //     // let s = dockeyboardbaru.createElement("div");
        //     // s.innerHTML = v.innerHTML;
        //     // dockeyboardbaru.body.appendChild(s);
        //     dockeyboardbaru.body.innerHTML = "<div>"+v.innerHTML+"</div>";
            
        // }
        // domm.forEach(dom=>{
        //     // if(dom.hasAttribute("class")){
        //     //     if(dom.className.indexOf("garisbuku")==-1){
        //     //         dom.classList.add("garisbuku")
        //     //     }
        //     // }else{
        //     //     if(dom.hasAttribute("style")){
        //     //         let cek = dom.getAttribute("style");
        //     //         if(cek.indexOf("break-after:page")>-1){
        //     //             dom.removeAttribute("style");
        //     //             dom.setAttribute("style","break-after:page")
        //     //         }else{
        //     //             dom.setAttribute("class","garisbuku")
        //     //         }
                    
        //     //     }else{
        //     //         dom.setAttribute("class","garisbuku")
        //     //     }
        //     // }
        // })
    })
    
    
    const btnn = document.querySelectorAll(".btn_tooltipbaru_edtkeyboard");//
    const allowhtmll = document.querySelector("#html_tooltipbaru_edtkeyboard");
    
    let showww = false;
    allowhtmll.addEventListener("change", ()=>{
        if(!allowhtmll.checked){
            //asli
            dockeyboardbaru.body.innerHTML = dockeyboardbaru.body.textContent;
            
            showww = false;
        }else{
                // asli
                dockeyboardbaru.body.textContent =dockeyboardbaru.body.innerHTML;
            showww =true;
        }
    })
    for (let i = 0 ; i < btnn.length ; i++){
        let cmd = btnn[i].getAttribute("data-tooltipbaru_keycmdkeyboard");
        let owngrup = btnn[i].hasAttribute("data-tooltipbaru_grupkeyboard");
        
        btnn[i].addEventListener("click",()=>{
            if(showww){
                alert("Hilangkan dulu Ceklisnya")
            }else{
            
                if(cmd === "fontname"){
                    let val = btnn[i].innerHTML;
                    document.querySelector(".dropdown_tooltipbaru_jenishurufkeyboard").innerHTML = val;
                    dockeyboardbaru.execCommand(cmd,false,val);
    
                }else if(cmd==="removeFormat"){ 
                    dockeyboardbaru.execCommand(cmd, false, null);
                    document.querySelector(".dropdown_tooltipbaru_jenishurufkeyboard").innerHTML = "Pilih Jenis Huruf"
                }else if(cmd == "createLink"){
                    let prom = prompt("Masukkan link","");
                    if(!prom){return};
                    dockeyboardbaru.execCommand(cmd, false, prom);
                    //console.log(dockeyboardbaru.body.designMode)
                    const linkifram = dockeyboardbaru.querySelectorAll("a");
    linkifram.forEach(el =>{
        el.target = "_blank";
        //console.log(el);
        el.addEventListener("mouseover", () =>{
            dockeyboardbaru.body.designMode = "Off";
        });
        el.addEventListener("mouseout", () =>{
            dockeyboardbaru.body.designMode = "On";
        })
        //console.log(dockeyboardbaru.body.designMode)
    })   
                }else if(owngrup){
                    let grup = btnn[i].getAttribute("data-tooltipbaru_grupkeyboard");
                    if(grup == "Paragraf"){
    //paragraf:
    let dom = document.querySelector(".dropdown_tooltipbaru_jenisparagrafkeyboard");
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
    dockeyboardbaru.execCommand(cmd, false, null)
                    }else if (grup == "ukuranfont") {
    let val = btnn[i].getAttribute("data-keyval");
    document.querySelector(".tooltipbaru_keyboard").innerHTML = btnn[i].innerHTML;
    dockeyboardbaru.execCommand(cmd, false, val);
    
    
                    }else if(grup == "heading"){
    let val = btnn[i].getAttribute("data-keyval");
    document.querySelector(".tooltipbaru_keyboardgrup_heading").innerHTML = btnn[i].innerHTML;
    dockeyboardbaru.execCommand(cmd, false, val);
    
                    }
                    else{
    let teks = btnn[i].innerHTML;
    dockeyboardbaru.execCommand(cmd,false,teks)
    // dockeyboardbaru.execCommand("insertText",false,"&nbsp;")
                    }
                } else{
                    dockeyboardbaru.execCommand(cmd, false, null)
                    // dockeyboardbaru.execCommand("insertText",false,"&nbsp;")
                    btnn[i].classList.toggle("active");
                    
                }
    
    
    
                
            }
          
        })
    
    };
    let keyboardedtbl = null;
    let keyboardsPchBiasa = null;
    let keyboardsPchCamp = null;
    let keyboardsAkarKdrat = null;
    let keyboardsAkartiga = null;

    keyboardedtbl = document.querySelector("#tooltipbaru_keyboardedt_table");
    keyboardsPchBiasa = document.querySelector("#tooltipbaru_keyboardsimpan_pecahanbiasa");
    keyboardsPchCamp = document.querySelector("#tooltipbaru_keyboardsimpan_pecahancampuran");
    keyboardsAkarKdrat = document.querySelector("#tooltipbaru_keyboardsimpan_akarkuadrat");
    keyboardsAkartiga = document.querySelector("#tooltipbaru_keyboardsimpan_akarpangkattiga");
    
    
    keyboardedtbl.addEventListener("click", () => {
        try{
        let promp = prompt("Masukkan jumlah baris, contoh 3 x 4 (3 baris, 4 kolom) tanpa spasi","3x4");
        if(!promp){return }
        let teks = promp.replace(/\s+/g,"");
        let ang = teks.toLowerCase().split("x");
        let brs = parseInt(ang[0]);
        let cols = parseInt(ang[1]);
        let html = `&nbsp;<table style="border-collapse:collapse;border:.5pt solid #000">`
        for(i = 0 ; i < brs ; i++){
            if(i==0){
                html +=`<tr style="background-color:#f1f1f1;;border:.5pt solid #000"> `;
            }else{
                    html +=`<tr>`;
                }
            for (j = 0 ; j <cols; j++){
                html +=`<td style="border:.5pt solid #000;padding:5px"> # </td>`
            }
            html +=`</tr>`
        }
        html +=`</table>&nbsp;`;
        dockeyboardbaru.execCommand("insertHTML",null, html);
        }
        catch(er){
            console.log(er);    
        }
    });
    keyboardsPchBiasa.addEventListener("click", () =>{
        let a = document.querySelector("#tooltipbaru_keyboardinpecbiasa_pembilang").innerHTML;
        let b = document.querySelector("#tooltipbaru_keyboardinpecbiasa_penyebut").innerHTML;
        let teks = htmlpecahanbiasa(a,b);
        dockeyboardbaru.execCommand("insertHTML",null, teks);
    })
    keyboardsPchCamp.addEventListener("click",()=>{
        let a = document.querySelector("#tooltipbaru_keyboardinpecCamp_satuan").innerHTML;
        let b = document.querySelector("#tooltipbaru_keyboardinpecCamp_pembilang").innerHTML;
        let c = document.querySelector("#tooltipbaru_keyboardinpecCamp_penyebut").innerHTML;
        let teks = htmlpecahancampuran(a,b,c);
        dockeyboardbaru.execCommand("insertHTML",null, teks);
    })
    keyboardsAkarKdrat.addEventListener("click",()=>{
        let a = "";
        let b = document.querySelector("#tooltipbaru_keyboardinakar_kuadrat").innerHTML;
        let teks = htmlakarpangkatn(a,b);
        dockeyboardbaru.execCommand("insertHTML",null, teks);
    
    })
    keyboardsAkartiga.addEventListener("click",()=>{
        let a = "3";
        let b = document.querySelector("#tooltipbaru_keyboardinakar_tiga").innerHTML;
        let teks = htmlakarpangkatn(a,b);
        dockeyboardbaru.execCommand("insertHTML",null, teks);
    });
    let keyboardfileInput = document.querySelector("#tooltipbaru_keyboarduploadgambar_edt");
    
    keyboardfileInput.addEventListener('change', async() => {
        const files = keyboardfileInput.files;
            
        if (!files || !files.length) {
        //          console.log('No files selected');
        return;
        }
            let ketval = document.formuploadmateri.idmapel.value
            let val = (ketval == "") ? "bank soal" : ketval;
            let reader = new FileReader();
            var item = files[0];
            let url ="";
        
    loadingtopbarin("loadingtopbar");
    reader.readAsDataURL(item);
    reader.onload = async function (e) {

        let bs64 = e.target.result.replace(/^.*,/, '');
        let mmtpe = e.target.result.match(/^.*(?=;)/)[0];
        let namafile = "edurasa_" + new Date().getTime()
        let frmdata = new FormData();
            frmdata.append("gmbrdata", bs64);
            frmdata.append("gmbrfilename", namafile);
            frmdata.append("gmbrmimeType", mmtpe);
            frmdata.append("keterangan", val);

    await fetch(linkmateri + "&action=uplgmbrmateri", {
                method: 'post',
                body: frmdata
        })
        .then(m => m.json())
        .then(k => {
            let link = k.url
            url = "https://drive.google.com/uc?export=view&id=" + link;
            //matikan animasi
            dockeyboardbaru.execCommand("insertImage",false, url);
            let imgs = dockeyboardbaru.querySelectorAll("img");
            imgs.forEach(item => {
                item.style.maxWidth ="300px";
            })
            clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
            setTimeout(() => {
                divlod.style.width = "1px"
                divlod.className += " w3-hide";

            }, 3000);

        })
        .catch(er => {
        console.log(er);
        
        })
    }
});
    let toolbarudaftarGambar_edt = document.querySelector("#tooltipbaru_daftarGambar_edt");
    toolbarudaftarGambar_edt.addEventListener("click", () =>{
        daftarGambar();
    })
    let tooltipbarukeypastekangambar_edt = document.getElementById("tooltipbaru_pastekangambar_edt");
    tooltipbarukeypastekangambar_edt.addEventListener("click",()=>{
    let teksCopy = yangluCopy;
    if(teksCopy == ""){
        alert("Ga ada yang dicopy, Mas/Mis Bro....")
        return
    }
    dockeyboardbaru.execCommand("insertHTML",null, teksCopy)
    });
    const keyboardbtnn_edtyt = document.querySelector("#keyboardbtn_tooltipbaru_edtkeyboardyt");
    keyboardbtnn_edtyt.addEventListener("click", () => {
        let prom = prompt("Masukkan link youtube","");
        if(!prom){return};
        let reg = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        let url = prom.match(reg)
        let html=`<iframe style="resize: both;" src='https://www.youtube.com/embed/${url[1]}'  frameborder='1' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe><br/><br/>`;
        let ch = document.querySelector("#html_tooltipbaru_edtkeyboard");
        if(!ch.checked){
            ch.checked = true;
            dockeyboardbaru.execCommand("insertHTML",false,html);
            ch.checked = false
        }else{
            dockeyboardbaru.execCommand("insertText",false,html);
        }
    })
    
    const tooltipbaru_keyboardbtn_gantihalaman = document.getElementById("tooltipbaru_keyboardbtn_gantihalaman");
    tooltipbaru_keyboardbtn_gantihalaman.addEventListener("click",()=>{
        let html = `<div class="w3-border-bottom w3-hide-small"> </div><div style="break-after:page"></div>`;
        let ch = document.querySelector("#html_tooltipbaru_edtkeyboard");
        if(!ch.checked){
            ch.checked = true;
            dockeyboardbaru.execCommand("insertHTML",false,html);
            ch.checked = false
        }else{
            dockeyboardbaru.execCommand("insertText",false,html);
        }
    })
    
    
    function enableImageResizeInDiv2(id) {
        if (!(/chrome/i.test(navigator.userAgent) && /google/i.test(window.navigator.vendor))) {
            return;
        }
        var editor = dockeyboardbaru.getElementById(id);
        
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
            dockeyboardbaru.querySelectorAll(".resize-frame,.resizer").forEach((item) => item.parentNode.removeChild(item));
        };
        var offset = function offset(el) {
             const rect = el.getBoundingClientRect();
            // scrollLeft = window.pageXOffset ||dockeyboardbaru.documentElement.scrollLeft,
            // scrollTop = window.pageYOffset || dockeyboardbaru.documentElement.scrollTop;
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
    
            dockeyboardbaru.querySelector('.resize-frame').onmousedown = () => {
                resizing = true;
                return false;
            };
    
            editor.onmouseup = () => {
                if (resizing) {
                    currentImage.style.width = dockeyboardbaru.querySelector('.top-border').offsetWidth + 'px';
                    currentImage.style.height = dockeyboardbaru.querySelector('.left-border').offsetHeight + 'px';
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
                    setStyle(dockeyboardbaru.querySelector('.resize-frame'), {
    top: (top + height - 10) + 'px',
    left: (left + width - 10) + "px"
                    });
                   
                    setStyle(dockeyboardbaru.querySelector('.top-border'), { width: width + "px" });
                    setStyle(dockeyboardbaru.querySelector('.left-border'), { height: height + "px" });
                    setStyle(dockeyboardbaru.querySelector('.right-border'), {
    left: (left + width) + 'px',
    height: height + "px"
                    });
                    setStyle(dockeyboardbaru.querySelector('.bottom-border'), {
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
                let mouseUpElement = dockeyboardbaru.elementFromPoint(x, y);
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
    enableImageResizeInDiv2("edt4");
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
    bubbleIframeMouseMove2(keyboardeditor2);
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

const tooltipbaru_tooglesembunyimenu = (btn)=>{
    let el = document.querySelector(".tempatmenukeyboardbaru");
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
keyboardtooltipbaru()
const isiteksunsurbanksoal = (paren="", target, posisitooltip="atas", baris="") =>{
    
    
    let elemen = document.querySelector("."+target);
    let simpan = document.querySelector(".simpankeyboardtooltipbaru");
    simpan.onclick= null;
    let lebarwindow = document.querySelector(".tesbody").offsetWidth;
    let bataskanan = lebarwindow * 0.5;
    let keyboard = document.getElementById("tooltipbaru_keyboard_ketikan");
    dragElement(keyboard);
    let keyboardeditor = document.querySelector("#iframe_tooltipbaru_keyboardumum");//.style.display="none";
    let wdoc = keyboardeditor.contentDocument || keyboardeditor.contentWindow.document;
    let body = wdoc.body;
    body.innerHTML = elemen.innerHTML;
    let lLeft, tTop;
    if(paren == "bataskiriformatkartusoal"){
        let pAre = document.querySelector("."+paren);
        let batastabel = document.querySelector(".kartusoalpg_tabel");
        tTop = (batastabel.offsetTop + elemen.offsetTop+ 20)+"px";
        lLeft = pAre.offsetLeft + "px";
    }else if(paren == "tempatnaskahsoal_soal"){
        let pAre = document.querySelector("."+paren);
        
        tTop = (pAre.offsetTop + elemen.offsetTop+ 20)+"px";
        lLeft = pAre.offsetLeft + "px";
    
    }else if(paren == "areaprint_soalkisidandesainsoallainnya"){
        let pAre = document.querySelector("."+paren);
        
        let ywindow = pAre.scrollTop;
        tTop = (getOffset(elemen).top - 200)+"px";//((getOffset(elemen).top + elemen.offsetTop+ 20))+"px";
        
        lLeft = pAre.offsetLeft + "px";
    }else{
        // window.scrollTo({ top: 0, behavior: 'smooth' });
        let pAre = document.querySelector("."+paren);
        tTop = (elemen.offsetTop + 20) +"px";
        lLeft = pAre.offsetLeft + "px";
    }
    
    
    keyboard.style.top = tTop;
    keyboard.style.left = lLeft;
    keyboard.style.display="block";
    simpan.onclick= async()=>{
        elemen.innerHTML = body.innerHTML;
        
        
        keyboard.style.display="none";
    }

}
const isibanksoalkebuatmateriedurasa = (elemen)=>{
    //pastikan fokusdatasoalnya adalah databasse soal kelas 6; kalo ga ada jangan buka bank soal
    document.querySelector("#modalbanksoal").style.display = "block";
}
function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }
let ijinsimpantiembanksoal =false;
const simpanItemBanksoal = () =>{
    if(!ijinsimpantiembanksoal){
        alert("Maaf, data soal yang akan dikirimkan belum siap. Pastikan Anda sudah memilih Pilihan Bentuk Soal!")
        return
    }
    let konf = confirm("Anda yakin ingin menyimpan data soal ini? Soal yang Anda buat di kartu soal ini hanya Anda sendiri yang dapat mengeditnya. Soal akan dipublikasikan umum dan siapapun dapat menggunakan soal Anda. Apabila ada kesalahan, silakan edit di menu Database Bank Soal.");
    if(!konf){
        return
    }
    let elemenkirim = document.querySelectorAll("[data-bsoal]");
    let desainObjek = {}
    elemenkirim.forEach((el,i)=>{
        // console.log(i,el.nodeName,el.getAttribute("data-bsoal"))
        let key = el.getAttribute("data-bsoal");
        if(el.nodeName == "INPUT"){
            desainObjek[key]= el.value;
        }else{
            let teksinner = el.innerHTML;
            let teksjadi = el.innerHTML
            
            desainObjek[key]= teksjadi;
        }
    });
    desainObjek.rombel = idNamaKelas;
    desainObjek.idguru = idguru;
    let kalopg = document.querySelector("[data-bsoal=bentuksoal]");
    if(kalopg.innerHTML == "Pilihan Ganda"){
    desainObjek.tampilanpg = tagtampilanpg;
    //untuk tampilanpg "BIASA" sudah otomatis terdeteksi dengan data-bsoal="opsiA" dll.
    if(tagtampilanpg=="TABEL"){
        let tabel = document.querySelector(".kartusoalpg_tabel");
        let tbody = tabel.getElementsByTagName("tbody")[0];
        let theader = tabel.getElementsByTagName("thead")[0];
        let rRow = tbody.rows;
        let arHed = [];
            for(a = 1 ; a < theader.rows[0].cells.length ; a++){
                let teksheader = theader.rows[0].cells[a].innerHTML;
                arHed.push(teksheader)
            }
            desainObjek.headerpg = JSON.stringify(arHed);
            for(i = 0 ; i < rRow.length ; i ++){
                let cCol = rRow[i].cells;
                let arOpsi = [];
                for(j = 1 ; j < cCol.length ; j ++){
                    
                    arOpsi.push(cCol[j].innerHTML)
                }
                let keyy = "opsi"+arrayopsibaru[i];
                desainObjek[keyy] = JSON.stringify(arOpsi);


            }
        }
    }
    //console.log(desainObjek)
    let cekifvaluenull = Object.values(desainObjek).indexOf("");
    //console.log(cekifvaluenull);

    let obAs = Object.assign({},databasesoalkosong);
    let obJadi = Object.assign(obAs,desainObjek);
    
    let key = JSON.stringify(Object.keys(obJadi))
    let nilai = Object.values(obJadi);
    nilai.shift()
    let tabel = JSON.stringify (nilai)
    let tab = "banksoal";
    
    let datakirim = new FormData()
    datakirim.append("tab",tab);
    datakirim.append("key",key);
    datakirim.append("tabel",tabel);
    
    fetch(url_kaldikaja+"?action=simpanbarisketaburut",{
        method:"post",
        body:datakirim
    }).then(m => m.json())
    .then(r => {
        
        ijinsimpantiembanksoal = false;
        keydatabasesoal = Object.keys(r.data[0]);
        if(r.result>1){
            databasesoal = r.data.filter(s=> s.hapus == "");
            databasesoalall = r.data
            databasesoalterhapus = r.data.filter(s=> s.hapus == "hapus");
        }
        for(i=0 ; i < keydatabasesoal.length; i++){
            databasesoalkosong[keydatabasesoal[i]]="";
        }
        alert("Data Berhasil disimpan");
        elemenkirim.forEach((el,i)=>{
        });
        
        document.getElementById("indsgevalpgindikatorsoal").value = "";
        document.getElementById("indsgevalpgmateripokok").value = "";
        document.querySelector(".buattooltipilustrasi").innerHTML ="KLIK UNTUK ILUSTRASI SOAL";
        document.querySelector(".buattooltippertanyaan").innerHTML ="KLIK DI SINI UNTUK MENAMBAHKAN TEKS PERTANYAAAN";
        document.querySelector("[data-bsoal=ruanglingkup]").innerHTML ="BELUM PILIH LINGKUP MATERI";
        document.querySelector("[data-bsoal=tekskd]").innerHTML ="BELUM PILIH KD";
        document.querySelector("[data-bsoal=materi]").innerHTML ="BELUM ISI MATERI POKOK";
        document.querySelector("[data-bsoal=indikatorsoal]").innerHTML ="BELUM ISI INDIKATOR SOAL";
        document.querySelector("[data-bsoal=penskoran]").innerHTML ="KLIK DI SINI UNTUK MENGETIK TEKS";
        // console.log(i,el.nodeName,el.getAttribute("data-bsoal"))
        
        //kalo sudah berhasil tolong sembunyikan kartu soalnya
        
    if(divkartusoal.className.indexOf("w3-hide")==-1){
        divkartusoal.classList.add("w3-hide")
    }
    }).catch(er=>console.log(er));
}

const antaraDiv = (teks)=>{
    let cek = teks.match(/<div>(.*)<\/div>/);
            let teksjadi ="";
            if(cek == null){
                teksjadi += teks
            }else{
                teksjadi += cek[1]
            }
            return teksjadi;
}
function replaceClassToStyle (element){
    var styles= [];

        // The DOM Level 2 CSS way
        //
        if ('getComputedStyle' in window) {
            var cs= getComputedStyle(element, '');
            if (cs.length!==0)
                for (var i= 0; i<cs.length; i++)
                    styles.push([cs.item(i), cs.getPropertyValue(cs.item(i))]);

            // Opera workaround. Opera doesn't support `item`/`length`
            // on CSSStyleDeclaration.
            //
            else
                for (var k in cs)
                    if (cs.hasOwnProperty(k))
                        styles.push([k, cs[k]]);

        // The IE way
        //
        } else if ('currentStyle' in element) {
            var cs= element.currentStyle;
            for (var k in cs)
                styles.push([k, cs[k]]);
        }
    return styles

}
function garagaraTainted (src,Tainting, notTainting){
    // source cod:https://stackoverflow.com/questions/22575636/how-to-check-if-a-canvas-element-has-been-tainted
    // tmpCanvas to test CORS
    var tmpCanvas=document.createElement("canvas");
    var tmpCtx=tmpCanvas.getContext("2d");
    // tmpCanvas just tests CORS, so make it 1x1px
    
    //tmpCanvas.width=tmpCanvas.height=1;
    // let imgd = {}
    var img=new Image();
    // set the cross origin flag (and cross our fingers!)
    img.crossOrigin="anonymous";
    img.onload=  function(){
        // add a tainted property to the image 
        // (initialize it to true--is tainted)
        img.tainted=true;
        // imgd.tainted=true;
        // draw the img on the temp canvas
        tmpCtx.drawImage(img,0,0);
        // just in case this onload stops on a CORS error...
        // set a timer to call afterOnLoad shortly
        
           afterOnLoad(img, Tainting, notTainting);
        // you can probably use less than 1000ms
        // try to violate CORS
        var i=tmpCtx.getImageData(1,1,1,1);
        // if we get here, CORS is OK so set tainted=false
        
        // imgd.uri = tmpCanvas.toDataURL("image/png");//.replace("image/png", "image/octet-stream");;
        img.uri = tmpCanvas.toDataURL("image/png");//.replace("image/png", "image/octet-stream");;
        img.tainted=false;
        
    };
    img.src=src;
    
    if(img.complete){
        return(img);
    }
}
function afterOnLoad(imgd, tainting, ga){
    let ar = {};
    ar.tainted = imgd.tainted;
    ar.objekok = {}
    if(imgd.tainted){
        ar.src = imgd.src;
    }else{
        ar.src = imgd.src
        var uri = imgd.uri;
        ar.objekok = uri
    }
   
}
const print2Word = (element, Filename)=>{
    //https://github.com/markswindoll/jQuery-Word-Export/blob/master/jquery.wordexport.js

        var static = {
        mhtml: {
            top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
            head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n",
            body: "<body>_body_</body>"
        }
    };
    var options = {
        maxWidth: 70
    };
    // Clone selected element before manipulating it
    let div=null,filename
    if(element == "areadesain_naskahsoal"){
        div = document.querySelector(".areadesain_naskahsoal");
        let namafile = document.getElementById("naskahsoal_identitas").value;
        if(Filename == ""){
            filename = namafile==""?"LAMASO_Edurasa.doc":Filename+".doc";
        }

    }
    
    var markup = div.cloneNode(true);

    // Remove hidden elements from the output
    // markup.forEach(self => {
        
    //     if (self.is(':hidden'))
    //         self.remove();
    // });

    // Embed all images using Data URLs
    var images = Array();
    var img = markup.querySelectorAll("img");
    let lg 
    for (var i = 0; i < img.length; i++) {
        // Calculate dimensions of output image
        var w = Math.min(img[i].width, options.maxWidth);
        var h = img[i].height * (w / img[i].width);
        // Create canvas for converting image to data URL
        //console.log(img[i].crossOrigin)
        // img[i].crossOrigin="anonymous";

        var canvas = document.createElement("CANVAS");
        
        canvas.width = w;
        canvas.height = h;
        // Draw image to canvas
        var context = canvas.getContext('2d');
        context.drawImage(img[i], 0, 0, w, h);
        // Get data URL encoding of image
        let cekuri = garagaraTainted(img[i].getAttribute("src"), "Tainting", "notTainting");
        // let cekuri = garagaraTainted(img[i], "Tainting", "notTainting");
       // var uri = cekuri.uri;
        
        var uri = canvas.toDataURL("image/png");//.replace("image/png", "image/octet-stream");
        //tambahan replace dari stackoverflow :https://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl
        $(img[i]).attr("src", img[i].src);
        img[i].width = w;
        img[i].height = h;
        // Save encoded image to array
        images[i] = {
            type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
            encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
            location: $(img[i]).attr("src"),
            data: uri.substring(uri.indexOf(",") + 1)
        };
        
    }

    // Prepare bottom of mhtml file with image data
    var mhtmlBottom = "\n";
    for (var i = 0; i < images.length; i++) {
        mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
        mhtmlBottom += "Content-Location: " + images[i].location + "\n";
        mhtmlBottom += "Content-Type: " + images[i].type + "\n";
        mhtmlBottom += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
        mhtmlBottom += images[i].data + "\n\n";
        if(i == 0){
            lg = img[i]
        }
    }
    mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";

    //TODO: load css from included stylesheet
    var styles = "";
    styles+= '<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">';
    // styles+=`<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    styles+='<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">';
    styles+= '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lobster">';
    styles+='<link  rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">'
    styles+='<link rel="stylesheet" href="https://syahandrianeda.github.io/syahandrianeda/css/stylegurukelas.css">'
        

    // Aggregate parts of the file together
    css = ('\
    <style>\
    @page {size: 841.95pt 595.35pt;margin: 0.4cm 0cm 0cm 0cm;mso-page-orientation: portrait;}\
    table.w3-table{border:1px solid black;border-collapse:collapse}\
    strong{font-weight:bolder}dfn{font-style:italic}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}figure{margin:1em 40px}img{border-style:none}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}hr{box-sizing:content-box;height:0;overflow:visible}button,input,optgroup,select,textarea{font:inherit;margin:0}optgroup{font-weight:700}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{color:inherit;display:table;max-width:100%;padding:0;white-space:normal}textarea{overflow:auto}[type=checkbox],[type=radio]{padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}body,html{font-family:Verdana,sans-serif;font-size:15px;line-height:1.5}html{overflow-x:hidden}h1{font-size:36px}h2{font-size:30px}h3{font-size:24px}h4{font-size:20px}h5{font-size:18px}h6{font-size:16px}div.Wordw3-serif{font-family:serif}div.Wordw3-sans-serif{font-family:sans-serif}div.Wordw3-cursive{font-family:cursive}div.Wordw3-monospace{font-family:monospace}h1,h2,h3,h4,h5,h6{font-family:"Segoe UI",Arial,sans-serif;font-weight:400;margin:10px 0}div.Wordw3-wide{letter-spacing:4px}hr{border:0;border-top:1px solid #eee;margin:20px 0}div.Wordw3-image{max-width:100%;height:auto}img{vertical-align:middle}a{color:inherit}div.Wordw3-table,div.Wordw3-table-all{border-collapse:collapse;border-spacing:0;width:100%;display:table}div.Wordw3-table-all{border:1px solid #ccc}div.Wordw3-bordered tr,div.Wordw3-table-all tr{border-bottom:1px solid #ddd}div.Wordw3-striped tbody tr:nth-child(even){background-color:#f1f1f1}div.Wordw3-table-all tr:nth-child(odd){background-color:#fff}div.Wordw3-table-all tr:nth-child(even){background-color:#f1f1f1}div.Wordw3-hoverable tbody tr:hover,div.Wordw3-uldiv.Wordw3-hoverable li:hover{background-color:#ccc}div.Wordw3-centered tr td,div.Wordw3-centered tr th{text-align:center}div.Wordw3-table td,div.Wordw3-table th,div.Wordw3-table-all td,div.Wordw3-table-all th{padding:8px 8px;display:table-cell;text-align:left;vertical-align:top}div.Wordw3-table td:first-child,div.Wordw3-table th:first-child,div.Wordw3-table-all td:first-child,div.Wordw3-table-all th:first-child{padding-left:16px}div.Wordw3-btn,div.Wordw3-button{border:none;display:inline-block;padding:8px 16px;vertical-align:middle;overflow:hidden;text-decoration:none;color:inherit;background-color:inherit;text-align:center;cursor:pointer;white-space:nowrap}div.Wordw3-btn:hover{box-shadow:0 8px 16px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)}div.Wordw3-btn,div.Wordw3-button{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}div.Wordw3-btn:disabled,div.Wordw3-button:disabled,div.Wordw3-disabled{cursor:not-allowed;opacity:.3}div.Wordw3-disabled *,:disabled *{pointer-events:none}div.Wordw3-btndiv.Wordw3-disabled:hover,div.Wordw3-btn:disabled:hover{box-shadow:none}div.Wordw3-badge,div.Wordw3-tag{background-color:#000;color:#fff;display:inline-block;padding-left:8px;padding-right:8px;text-align:center}div.Wordw3-badge{border-radius:50%}div.Wordw3-ul{list-style-type:none;padding:0;margin:0}div.Wordw3-ul li{padding:8px 16px;border-bottom:1px solid #ddd}div.Wordw3-ul li:last-child{border-bottom:none}div.Wordw3-display-container,div.Wordw3-tooltip{position:relative}div.Wordw3-tooltip div.Wordw3-text{display:none}div.Wordw3-tooltip:hover div.Wordw3-text{display:inline-block}div.Wordw3-ripple:active{opacity:.5}div.Wordw3-ripple{transition:opacity 0s}div.Wordw3-input{padding:8px;display:block;border:none;border-bottom:1px solid #ccc;width:100%}div.Wordw3-select{padding:9px 0;width:100%;border:none;border-bottom:1px solid #ccc}div.Wordw3-dropdown-click,div.Wordw3-dropdown-hover{position:relative;display:inline-block;cursor:pointer}div.Wordw3-dropdown-hover:hover div.Wordw3-dropdown-content{display:block}div.Wordw3-dropdown-click:hover,div.Wordw3-dropdown-hover:first-child{background-color:#ccc;color:#000}div.Wordw3-dropdown-click:hover>div.Wordw3-button:first-child,div.Wordw3-dropdown-hover:hover>div.Wordw3-button:first-child{background-color:#ccc;color:#000}div.Wordw3-dropdown-content{cursor:auto;color:#000;background-color:#fff;display:none;position:absolute;min-width:160px;margin:0;padding:0;z-index:1}div.Wordw3-check,div.Wordw3-radio{width:24px;height:24px;position:relative;top:6px}div.Wordw3-sidebar{height:100%;width:200px;background-color:#fff;position:fixed!important;z-index:1;overflow:auto}div.Wordw3-bar-block div.Wordw3-dropdown-click,div.Wordw3-bar-block div.Wordw3-dropdown-hover{width:100%}div.Wordw3-bar-block div.Wordw3-dropdown-click div.Wordw3-dropdown-content,div.Wordw3-bar-block div.Wordw3-dropdown-hover div.Wordw3-dropdown-content{min-width:100%}div.Wordw3-bar-block div.Wordw3-dropdown-click div.Wordw3-button,div.Wordw3-bar-block div.Wordw3-dropdown-hover div.Wordw3-button{width:100%;text-align:left;padding:8px 16px}#main,div.Wordw3-main{transition:margin-left .4s}div.Wordw3-modal{z-index:3;display:none;padding-top:100px;position:fixed;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:rgba(0,0,0,.4)}div.Wordw3-modal-content{margin:auto;background-color:#fff;position:relative;padding:0;outline:0;width:600px}div.Wordw3-bar{width:100%;overflow:hidden}div.Wordw3-center div.Wordw3-bar{display:inline-block;width:auto}div.Wordw3-bar div.Wordw3-bar-item{padding:8px 16px;float:left;width:auto;border:none;display:block;outline:0}div.Wordw3-bar div.Wordw3-dropdown-click,div.Wordw3-bar div.Wordw3-dropdown-hover{position:static;float:left}div.Wordw3-bar div.Wordw3-button{white-space:normal}div.Wordw3-bar-block div.Wordw3-bar-item{width:100%;display:block;padding:8px 16px;text-align:left;border:none;white-space:normal;float:none;outline:0}div.Wordw3-bar-blockdiv.Wordw3-center div.Wordw3-bar-item{text-align:center}div.Wordw3-block{display:block;width:100%}div.Wordw3-responsive{display:block;overflow-x:auto}div.Wordw3-bar:after,div.Wordw3-bar:before,div.Wordw3-cell-row:after,div.Wordw3-cell-row:before,div.Wordw3-clear:after,div.Wordw3-clear:before,div.Wordw3-container:after,div.Wordw3-container:before,div.Wordw3-panel:after,div.Wordw3-panel:before,div.Wordw3-row-padding:after,div.Wordw3-row-padding:before,div.Wordw3-row:after,div.Wordw3-row:before{content:"";display:table;clear:both}div.Wordw3-col,div.Wordw3-half,div.Wordw3-quarter,div.Wordw3-third,div.Wordw3-threequarter,div.Wordw3-twothird{float:left;width:100%}div.Wordw3-col.s1{width:8.33333%}div.Wordw3-col.s2{width:16.66666%}div.Wordw3-col.s3{width:24.99999%}div.Wordw3-col.s4{width:33.33333%}div.Wordw3-col.s5{width:41.66666%}div.Wordw3-col.s6{width:49.99999%}div.Wordw3-col.s7{width:58.33333%}div.Wordw3-col.s8{width:66.66666%}div.Wordw3-col.s9{width:74.99999%}div.Wordw3-col.s10{width:83.33333%}div.Wordw3-col.s11{width:91.66666%}div.Wordw3-col.s12{width:99.99999%}@media (min-width:601px){div.Wordw3-col.m1{width:8.33333%}div.Wordw3-col.m2{width:16.66666%}div.Wordw3-col.m3,div.Wordw3-quarter{width:24.99999%}div.Wordw3-col.m4,div.Wordw3-third{width:33.33333%}div.Wordw3-col.m5{width:41.66666%}div.Wordw3-col.m6,div.Wordw3-half{width:49.99999%}div.Wordw3-col.m7{width:58.33333%}div.Wordw3-col.m8,div.Wordw3-twothird{width:66.66666%}div.Wordw3-col.m9,div.Wordw3-threequarter{width:74.99999%}div.Wordw3-col.m10{width:83.33333%}div.Wordw3-col.m11{width:91.66666%}div.Wordw3-col.m12{width:99.99999%}}@media (min-width:993px){div.Wordw3-col.l1{width:8.33333%}div.Wordw3-col.l2{width:16.66666%}div.Wordw3-col.l3{width:24.99999%}div.Wordw3-col.l4{width:33.33333%}div.Wordw3-col.l5{width:41.66666%}div.Wordw3-col.l6{width:49.99999%}div.Wordw3-col.l7{width:58.33333%}div.Wordw3-col.l8{width:66.66666%}div.Wordw3-col.l9{width:74.99999%}div.Wordw3-col.l10{width:83.33333%}div.Wordw3-col.l11{width:91.66666%}div.Wordw3-col.l12{width:99.99999%}}div.Wordw3-rest{overflow:hidden}div.Wordw3-stretch{margin-left:-16px;margin-right:-16px}div.Wordw3-auto,div.Wordw3-content{margin-left:auto;margin-right:auto}div.Wordw3-content{max-width:980px}div.Wordw3-auto{max-width:1140px}div.Wordw3-cell-row{display:table;width:100%}div.Wordw3-cell{display:table-cell}div.Wordw3-cell-top{vertical-align:top}div.Wordw3-cell-middle{vertical-align:middle}div.Wordw3-cell-bottom{vertical-align:bottom}div.Wordw3-hide{display:none!important}div.Wordw3-show,div.Wordw3-show-block{display:block!important}div.Wordw3-show-inline-block{display:inline-block!important}@media (max-width:1205px){div.Wordw3-auto{max-width:95%}}@media (max-width:600px){div.Wordw3-modal-content{margin:0 10px;width:auto!important}div.Wordw3-modal{padding-top:30px}div.Wordw3-dropdown-clickdiv.Wordw3-mobile div.Wordw3-dropdown-content,div.Wordw3-dropdown-hoverdiv.Wordw3-mobile div.Wordw3-dropdown-content{position:relative}div.Wordw3-hide-small{display:none!important}div.Wordw3-mobile{display:block;width:100%!important}div.Wordw3-bar-itemdiv.Wordw3-mobile,div.Wordw3-dropdown-clickdiv.Wordw3-mobile,div.Wordw3-dropdown-hoverdiv.Wordw3-mobile{text-align:center}div.Wordw3-dropdown-clickdiv.Wordw3-mobile,div.Wordw3-dropdown-clickdiv.Wordw3-mobile div.Wordw3-btn,div.Wordw3-dropdown-clickdiv.Wordw3-mobile div.Wordw3-button,div.Wordw3-dropdown-hoverdiv.Wordw3-mobile,div.Wordw3-dropdown-hoverdiv.Wordw3-mobile div.Wordw3-btn,div.Wordw3-dropdown-hoverdiv.Wordw3-mobile div.Wordw3-button{width:100%}}@media (max-width:768px){div.Wordw3-modal-content{width:500px}div.Wordw3-modal{padding-top:50px}}@media (min-width:993px){div.Wordw3-modal-content{width:900px}div.Wordw3-hide-large{display:none!important}div.Wordw3-sidebardiv.Wordw3-collapse{display:block!important}}@media (max-width:992px) and (min-width:601px){div.Wordw3-hide-medium{display:none!important}}@media (max-width:992px){div.Wordw3-sidebardiv.Wordw3-collapse{display:none}div.Wordw3-main{margin-left:0!important;margin-right:0!important}div.Wordw3-auto{max-width:100%}}div.Wordw3-bottom,div.Wordw3-top{position:fixed;width:100%;z-index:1}div.Wordw3-top{top:0}div.Wordw3-bottom{bottom:0}div.Wordw3-overlay{position:fixed;display:none;width:100%;height:100%;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.5);z-index:2}div.Wordw3-display-topleft{position:absolute;left:0;top:0}div.Wordw3-display-topright{position:absolute;right:0;top:0}div.Wordw3-display-bottomleft{position:absolute;left:0;bottom:0}div.Wordw3-display-bottomright{position:absolute;right:0;bottom:0}div.Wordw3-display-middle{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%)}div.Wordw3-display-left{position:absolute;top:50%;left:0;transform:translate(0,-50%);-ms-transform:translate(0,-50%)}div.Wordw3-display-right{position:absolute;top:50%;right:0;transform:translate(0,-50%);-ms-transform:translate(0,-50%)}div.Wordw3-display-topmiddle{position:absolute;left:50%;top:0;transform:translate(-50%,0);-ms-transform:translate(-50%,0)}div.Wordw3-display-bottommiddle{position:absolute;left:50%;bottom:0;transform:translate(-50%,0);-ms-transform:translate(-50%,0)}div.Wordw3-display-container:hover div.Wordw3-display-hover{display:block}div.Wordw3-display-container:hover spandiv.Wordw3-display-hover{display:inline-block}div.Wordw3-display-hover{display:none}div.Wordw3-display-position{position:absolute}div.Wordw3-circle{border-radius:50%}div.Wordw3-round-small{border-radius:2px}div.Wordw3-round,div.Wordw3-round-medium{border-radius:4px}div.Wordw3-round-large{border-radius:8px}div.Wordw3-round-xlarge{border-radius:16px}div.Wordw3-round-xxlarge{border-radius:32px}div.Wordw3-row-padding,div.Wordw3-row-padding>div.Wordw3-col,div.Wordw3-row-padding>div.Wordw3-half,div.Wordw3-row-padding>div.Wordw3-quarter,div.Wordw3-row-padding>div.Wordw3-third,div.Wordw3-row-padding>div.Wordw3-threequarter,div.Wordw3-row-padding>div.Wordw3-twothird{padding:0 8px}div.Wordw3-container,div.Wordw3-panel{padding:.01em 16px}div.Wordw3-panel{margin-top:16px;margin-bottom:16px}div.Wordw3-code,div.Wordw3-codespan{font-family:Consolas,"courier new";font-size:16px}div.Wordw3-code{width:auto;background-color:#fff;padding:8px 12px;border-left:4px solid #4caf50;word-wrap:break-word}div.Wordw3-codespan{color:#dc143c;background-color:#f1f1f1;padding-left:4px;padding-right:4px;font-size:110%}div.Wordw3-card,div.Wordw3-card-2{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)}div.Wordw3-card-4,div.Wordw3-hover-shadow:hover{box-shadow:0 4px 10px 0 rgba(0,0,0,.2),0 4px 20px 0 rgba(0,0,0,.19)}div.Wordw3-spin{animation:w3-spin 2s infinite linear}@keyframes w3-spin{0%{transform:rotate(0)}100%{transform:rotate(359deg)}}div.Wordw3-animate-fading{animation:fading 10s infinite}@keyframes fading{0%{opacity:0}50%{opacity:1}100%{opacity:0}}div.Wordw3-animate-opacity{animation:opac .8s}@keyframes opac{from{opacity:0}to{opacity:1}}div.Wordw3-animate-top{position:relative;animation:animatetop .4s}@keyframes animatetop{from{top:-300px;opacity:0}to{top:0;opacity:1}}div.Wordw3-animate-left{position:relative;animation:animateleft .4s}@keyframes animateleft{from{left:-300px;opacity:0}to{left:0;opacity:1}}div.Wordw3-animate-right{position:relative;animation:animateright .4s}@keyframes animateright{from{right:-300px;opacity:0}to{right:0;opacity:1}}div.Wordw3-animate-bottom{position:relative;animation:animatebottom .4s}@keyframes animatebottom{from{bottom:-300px;opacity:0}to{bottom:0;opacity:1}}div.Wordw3-animate-zoom{animation:animatezoom .6s}@keyframes animatezoom{from{transform:scale(0)}to{transform:scale(1)}}div.Wordw3-animate-input{transition:width .4s ease-in-out}div.Wordw3-animate-input:focus{width:100%!important}div.Wordw3-hover-opacity:hover,div.Wordw3-opacity{opacity:.6}div.Wordw3-hover-opacity-off:hover,div.Wordw3-opacity-off{opacity:1}div.Wordw3-opacity-max{opacity:.25}div.Wordw3-opacity-min{opacity:.75}div.Wordw3-grayscale-max,div.Wordw3-greyscale-max,div.Wordw3-hover-grayscale:hover,div.Wordw3-hover-greyscale:hover{filter:grayscale(100%)}div.Wordw3-grayscale,div.Wordw3-greyscale{filter:grayscale(75%)}div.Wordw3-grayscale-min,div.Wordw3-greyscale-min{filter:grayscale(50%)}div.Wordw3-sepia{filter:sepia(75%)}div.Wordw3-hover-sepia:hover,div.Wordw3-sepia-max{filter:sepia(100%)}div.Wordw3-sepia-min{filter:sepia(50%)}div.Wordw3-tiny{font-size:10px!important}div.Wordw3-small{font-size:12px!important}div.Wordw3-medium{font-size:15px!important}div.Wordw3-large{font-size:18px!important}div.Wordw3-xlarge{font-size:24px!important}div.Wordw3-xxlarge{font-size:36px!important}div.Wordw3-xxxlarge{font-size:48px!important}div.Wordw3-jumbo{font-size:64px!important}div.Wordw3-left-align{text-align:left!important}div.Wordw3-right-align{text-align:right!important}div.Wordw3-justify{text-align:justify!important}div.Wordw3-center{text-align:center!important}div.Wordw3-border-0{border:0!important}div.Wordw3-border{border:1px solid #ccc!important}div.Wordw3-border-top{border-top:1px solid #ccc!important}div.Wordw3-border-bottom{border-bottom:1px solid #ccc!important}div.Wordw3-border-left{border-left:1px solid #ccc!important}div.Wordw3-border-right{border-right:1px solid #ccc!important}div.Wordw3-topbar{border-top:6px solid #ccc!important}div.Wordw3-bottombar{border-bottom:6px solid #ccc!important}div.Wordw3-leftbar{border-left:6px solid #ccc!important}div.Wordw3-rightbar{border-right:6px solid #ccc!important}div.Wordw3-code,div.Wordw3-section{margin-top:16px!important;margin-bottom:16px!important}div.Wordw3-margin{margin:16px!important}div.Wordw3-margin-top{margin-top:16px!important}div.Wordw3-margin-bottom{margin-bottom:16px!important}div.Wordw3-margin-left{margin-left:16px!important}div.Wordw3-margin-right{margin-right:16px!important}div.Wordw3-padding-small{padding:4px 8px!important}div.Wordw3-padding{padding:8px 16px!important}div.Wordw3-padding-large{padding:12px 24px!important}div.Wordw3-padding-16{padding-top:16px!important;padding-bottom:16px!important}div.Wordw3-padding-24{padding-top:24px!important;padding-bottom:24px!important}div.Wordw3-padding-32{padding-top:32px!important;padding-bottom:32px!important}div.Wordw3-padding-48{padding-top:48px!important;padding-bottom:48px!important}div.Wordw3-padding-64{padding-top:64px!important;padding-bottom:64px!important}div.Wordw3-padding-top-64{padding-top:64px!important}div.Wordw3-padding-top-48{padding-top:48px!important}div.Wordw3-padding-top-32{padding-top:32px!important}div.Wordw3-padding-top-24{padding-top:24px!important}div.Wordw3-left{float:left!important}div.Wordw3-right{float:right!important}div.Wordw3-button:hover{color:#000!important;background-color:#ccc!important}div.Wordw3-hover-none:hover,div.Wordw3-transparent{background-color:transparent!important}div.Wordw3-hover-none:hover{box-shadow:none!important}div.Wordw3-amber,div.Wordw3-hover-amber:hover{color:#000!important;background-color:#ffc107!important}div.Wordw3-aqua,div.Wordw3-hover-aqua:hover{color:#000!important;background-color:#0ff!important}div.Wordw3-blue,div.Wordw3-hover-blue:hover{color:#fff!important;background-color:#2196f3!important}div.Wordw3-hover-light-blue:hover,div.Wordw3-light-blue{color:#000!important;background-color:#87ceeb!important}div.Wordw3-brown,div.Wordw3-hover-brown:hover{color:#fff!important;background-color:#795548!important}div.Wordw3-cyan,div.Wordw3-hover-cyan:hover{color:#000!important;background-color:#00bcd4!important}div.Wordw3-blue-gray,div.Wordw3-blue-grey,div.Wordw3-hover-blue-gray:hover,div.Wordw3-hover-blue-grey:hover{color:#fff!important;background-color:#607d8b!important}div.Wordw3-green,div.Wordw3-hover-green:hover{color:#fff!important;background-color:#4caf50!important}div.Wordw3-hover-light-green:hover,div.Wordw3-light-green{color:#000!important;background-color:#8bc34a!important}div.Wordw3-hover-indigo:hover,div.Wordw3-indigo{color:#fff!important;background-color:#3f51b5!important}div.Wordw3-hover-khaki:hover,div.Wordw3-khaki{color:#000!important;background-color:khaki!important}div.Wordw3-hover-lime:hover,div.Wordw3-lime{color:#000!important;background-color:#cddc39!important}div.Wordw3-hover-orange:hover,div.Wordw3-orange{color:#000!important;background-color:#ff9800!important}div.Wordw3-deep-orange,div.Wordw3-hover-deep-orange:hover{color:#fff!important;background-color:#ff5722!important}div.Wordw3-hover-pink:hover,div.Wordw3-pink{color:#fff!important;background-color:#e91e63!important}div.Wordw3-hover-purple:hover,div.Wordw3-purple{color:#fff!important;background-color:#9c27b0!important}div.Wordw3-deep-purple,div.Wordw3-hover-deep-purple:hover{color:#fff!important;background-color:#673ab7!important}div.Wordw3-hover-red:hover,div.Wordw3-red{color:#fff!important;background-color:#f44336!important}div.Wordw3-hover-sand:hover,div.Wordw3-sand{color:#000!important;background-color:#fdf5e6!important}div.Wordw3-hover-teal:hover,div.Wordw3-teal{color:#fff!important;background-color:#009688!important}div.Wordw3-hover-yellow:hover,div.Wordw3-yellow{color:#000!important;background-color:#ffeb3b!important}div.Wordw3-hover-white:hover,div.Wordw3-white{color:#000!important;background-color:#fff!important}div.Wordw3-black,div.Wordw3-hover-black:hover{color:#fff!important;background-color:#000!important}div.Wordw3-gray,div.Wordw3-grey,div.Wordw3-hover-gray:hover,div.Wordw3-hover-grey:hover{color:#000!important;background-color:#9e9e9e!important}div.Wordw3-hover-light-gray:hover,div.Wordw3-hover-light-grey:hover,div.Wordw3-light-gray,div.Wordw3-light-grey{color:#000!important;background-color:#f1f1f1!important}div.Wordw3-dark-gray,div.Wordw3-dark-grey,div.Wordw3-hover-dark-gray:hover,div.Wordw3-hover-dark-grey:hover{color:#fff!important;background-color:#616161!important}div.Wordw3-hover-pale-red:hover,div.Wordw3-pale-red{color:#000!important;background-color:#fdd!important}div.Wordw3-hover-pale-green:hover,div.Wordw3-pale-green{color:#000!important;background-color:#dfd!important}div.Wordw3-hover-pale-yellow:hover,div.Wordw3-pale-yellow{color:#000!important;background-color:#ffc!important}div.Wordw3-hover-pale-blue:hover,div.Wordw3-pale-blue{color:#000!important;background-color:#dff!important}div.Wordw3-hover-text-amber:hover,div.Wordw3-text-amber{color:#ffc107!important}div.Wordw3-hover-text-aqua:hover,div.Wordw3-text-aqua{color:#0ff!important}div.Wordw3-hover-text-blue:hover,div.Wordw3-text-blue{color:#2196f3!important}div.Wordw3-hover-text-light-blue:hover,div.Wordw3-text-light-blue{color:#87ceeb!important}div.Wordw3-hover-text-brown:hover,div.Wordw3-text-brown{color:#795548!important}div.Wordw3-hover-text-cyan:hover,div.Wordw3-text-cyan{color:#00bcd4!important}div.Wordw3-hover-text-blue-gray:hover,div.Wordw3-hover-text-blue-grey:hover,div.Wordw3-text-blue-gray,div.Wordw3-text-blue-grey{color:#607d8b!important}div.Wordw3-hover-text-green:hover,div.Wordw3-text-green{color:#4caf50!important}div.Wordw3-hover-text-light-green:hover,div.Wordw3-text-light-green{color:#8bc34a!important}div.Wordw3-hover-text-indigo:hover,div.Wordw3-text-indigo{color:#3f51b5!important}div.Wordw3-hover-text-khaki:hover,div.Wordw3-text-khaki{color:#b4aa50!important}div.Wordw3-hover-text-lime:hover,div.Wordw3-text-lime{color:#cddc39!important}div.Wordw3-hover-text-orange:hover,div.Wordw3-text-orange{color:#ff9800!important}div.Wordw3-hover-text-deep-orange:hover,div.Wordw3-text-deep-orange{color:#ff5722!important}div.Wordw3-hover-text-pink:hover,div.Wordw3-text-pink{color:#e91e63!important}div.Wordw3-hover-text-purple:hover,div.Wordw3-text-purple{color:#9c27b0!important}div.Wordw3-hover-text-deep-purple:hover,div.Wordw3-text-deep-purple{color:#673ab7!important}div.Wordw3-hover-text-red:hover,div.Wordw3-text-red{color:#f44336!important}div.Wordw3-hover-text-sand:hover,div.Wordw3-text-sand{color:#fdf5e6!important}div.Wordw3-hover-text-teal:hover,div.Wordw3-text-teal{color:#009688!important}div.Wordw3-hover-text-yellow:hover,div.Wordw3-text-yellow{color:#d2be0e!important}div.Wordw3-hover-text-white:hover,div.Wordw3-text-white{color:#fff!important}div.Wordw3-hover-text-black:hover,div.Wordw3-text-black{color:#000!important}div.Wordw3-hover-text-gray:hover,div.Wordw3-hover-text-grey:hover,div.Wordw3-text-gray,div.Wordw3-text-grey{color:#757575!important}div.Wordw3-hover-text-light-gray:hover,div.Wordw3-hover-text-light-grey:hover,div.Wordw3-text-light-gray,div.Wordw3-text-light-grey{color:#f1f1f1!important}div.Wordw3-hover-text-dark-gray:hover,div.Wordw3-hover-text-dark-grey:hover,div.Wordw3-text-dark-gray,div.Wordw3-text-dark-grey{color:#3a3a3a!important}div.Wordw3-border-amber,div.Wordw3-hover-border-amber:hover{border-color:#ffc107!important}div.Wordw3-border-aqua,div.Wordw3-hover-border-aqua:hover{border-color:#0ff!important}div.Wordw3-border-blue,div.Wordw3-hover-border-blue:hover{border-color:#2196f3!important}div.Wordw3-border-light-blue,div.Wordw3-hover-border-light-blue:hover{border-color:#87ceeb!important}div.Wordw3-border-brown,div.Wordw3-hover-border-brown:hover{border-color:#795548!important}div.Wordw3-border-cyan,div.Wordw3-hover-border-cyan:hover{border-color:#00bcd4!important}div.Wordw3-border-blue-gray,div.Wordw3-border-blue-grey,div.Wordw3-hover-border-blue-gray:hover,div.Wordw3-hover-border-blue-grey:hover{border-color:#607d8b!important}div.Wordw3-border-green,div.Wordw3-hover-border-green:hover{border-color:#4caf50!important}div.Wordw3-border-light-green,div.Wordw3-hover-border-light-green:hover{border-color:#8bc34a!important}div.Wordw3-border-indigo,div.Wordw3-hover-border-indigo:hover{border-color:#3f51b5!important}div.Wordw3-border-khaki,div.Wordw3-hover-border-khaki:hover{border-color:khaki!important}div.Wordw3-border-lime,div.Wordw3-hover-border-lime:hover{border-color:#cddc39!important}div.Wordw3-border-orange,div.Wordw3-hover-border-orange:hover{border-color:#ff9800!important}div.Wordw3-border-deep-orange,div.Wordw3-hover-border-deep-orange:hover{border-color:#ff5722!important}div.Wordw3-border-pink,div.Wordw3-hover-border-pink:hover{border-color:#e91e63!important}div.Wordw3-border-purple,div.Wordw3-hover-border-purple:hover{border-color:#9c27b0!important}div.Wordw3-border-deep-purple,div.Wordw3-hover-border-deep-purple:hover{border-color:#673ab7!important}div.Wordw3-border-red,div.Wordw3-hover-border-red:hover{border-color:#f44336!important}div.Wordw3-border-sand,div.Wordw3-hover-border-sand:hover{border-color:#fdf5e6!important}div.Wordw3-border-teal,div.Wordw3-hover-border-teal:hover{border-color:#009688!important}div.Wordw3-border-yellow,div.Wordw3-hover-border-yellow:hover{border-color:#ffeb3b!important}div.Wordw3-border-white,div.Wordw3-hover-border-white:hover{border-color:#fff!important}div.Wordw3-border-black,div.Wordw3-hover-border-black:hover{border-color:#000!important}div.Wordw3-border-gray,div.Wordw3-border-grey,div.Wordw3-hover-border-gray:hover,div.Wordw3-hover-border-grey:hover{border-color:#9e9e9e!important}div.Wordw3-border-light-gray,div.Wordw3-border-light-grey,div.Wordw3-hover-border-light-gray:hover,div.Wordw3-hover-border-light-grey:hover{border-color:#f1f1f1!important}div.Wordw3-border-dark-gray,div.Wordw3-border-dark-grey,div.Wordw3-hover-border-dark-gray:hover,div.Wordw3-hover-border-dark-grey:hover{border-color:#616161!important}div.Wordw3-border-pale-red,div.Wordw3-hover-border-pale-red:hover{border-color:#ffe7e7!important}div.Wordw3-border-pale-green,div.Wordw3-hover-border-pale-green:hover{border-color:#e7ffe7!important}div.Wordw3-border-pale-yellow,div.Wordw3-hover-border-pale-yellow:hover{border-color:#ffc!important}div.Wordw3-border-pale-blue,div.Wordw3-hover-border-pale-blue:hover{border-color:#e7ffff!important}\
    </style>\
    ');
    
    let htmljadi = "";
    let fokusKop = markup.querySelector(".kopnaskahsoal");
    
    //fokuskop has hidden?
    if(fokusKop.className.indexOf("w3-hide")==-1){
        htmljadi += `<p align="center" style="margin-bottom:0cm;text-align:center"><table><tr><td style="text-align:center;vertical-align:middle">${lg.outerHTML}</td><td style="text-align:center;vertical-align:middle"><font size="5">PEMERINTAH DAERAH KOTA DEPOK</font><br><font size="5">DINAS PENDIDIKAN</font><br><font size="5" face="Arial Black">${idNamaSekolah.toUpperCase()}</font><br><font size="1"><span>${teksalamat}</span><br>NPSN: 20228914 | NSS: 101026604052 | surel: uptdsdnratujaya1@gmail.com</font></td></tr></table><p style="border-top:5pt solid #000;" >&nbsp;</p>`;
    }
        fokusKop.remove();
        let tengah="";
        let tengahtengah;
        let tabel = markup.querySelector(".tempatnaskahsoal_soal");
        for(let j = 0 ; j < tabel.rows.length ; j++){
            let lR = tabel.rows[j];
            if(lR.cells.length ==2){
                tengah += "<p>"+lR.cells[1].innerHTML+"</p>"
            }else{
                tengah += "<div style='font-family:Times New Roman, Times, serif;'><p class='MsoNormal' style='text-indent:-14pt;font-family:Times New Roman, Times, serif;'>"+lR.cells[1].innerHTML +"  "+ lR.cells[2].innerHTML +"</p></div>";
                // tengah += "<div style='position:relative'><div style='position:absolute;margin-left:0;border:.2pt solid #000;width:15px'>"+lR.cells[1].innerHTML +"</div><div style='position:relative;margin-left:20px;margin-top:-35px;border:.2pt solid #000'>"+ lR.cells[2].innerHTML +"</div></div>";
            }
            
        }
        
        tabel.remove()
        tengahtengah = markup.innerHTML;
        htmljadi+= `<div style="text-align:center;border:0 !important;font-family:Times New Roman, Times, serif">${tengahtengah}</div>
        <p style="border-top:2pt solid #000;" >&nbsp;</p>
        `
        // <p style="border-bottom:2pt solid #000;" >&nbsp;</p>
    //""+tengahtengah+"";
    htmljadi+= `<div style="border:5pt 0 solid #000">&nbsp;</div>
    <div style="font-size:12pt">${tengah}</div>`;

    var fileContent ='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head>'+css+'<title>Document Title</title><xml><w:worddocument xmlns:w="#unknown"><w:view>Print</w:view><w:zoom>90</w:zoom><w:donotoptimizeforbrowser /></w:worddocument></xml></head><body style="tab-interval:.5in;"><div class="Section1">' + htmljadi + '</div></body></html>';
    // Create a Blob with the file contents
    var blob = new Blob([fileContent], {
        type: "application/msword;charset=utf-8"
    });

    //saveAs(blob, fileName + ".doc");
    //var url = URL.createObjectURL(blob);
    // var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(markup.innerHTML);
    window.URL = window.URL || window.webkitURL;
    var url = window.URL.createObjectURL(blob);
    // Specify file name
    // var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(markup.innerHTML);// window.atob(unescape(encodeURIComponent(markup.innerHTML)));//encodeURIComponent(markup);// window.btoa(unescape(encodeURIComponent(markup.innerHTML)));;
    // filename = filename?filename+'.doc':'document.doc';
    filename = Filename;

    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename); // IE10-11
    }else{
        // Create a link to the file
        downloadLink.href = url;
        
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }

    document.body.removeChild(downloadLink);
}
const print2WordGlobal = async (element, Filename,kondisi="kisikisijawaban",ttd=false)=>{
    //https://github.com/markswindoll/jQuery-Word-Export/blob/master/jquery.wordexport.js

        var static = {
        mhtml: {
            top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
            head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n",
            body: "<body>_body_</body>"
        }
    };
    var options = {
        maxWidth: 70
    };
    // Clone selected element before manipulating it
    let div,filename
    
        div = document.querySelector("."+element);
        let namafile = document.getElementById("naskahsoal_identitas").value;
        if(Filename == ""){
            filename = namafile==""?"LAMASO_Edurasa.doc":Filename+".doc";
        }

    
    var markup = div.cloneNode(true);

    // Remove hidden elements from the output
    // markup.forEach(self => {
        
    //     if (self.is(':hidden'))
    //         self.remove();
    // });

    // Embed all images using Data URLs
    var images = Array();
    var img = markup.querySelectorAll("img");
    let lg 
    for (var i = 0; i < img.length; i++) {
        // Calculate dimensions of output image
        var w = Math.min(img[i].width, options.maxWidth);
        var h = img[i].height * (w / img[i].width);
        // Create canvas for converting image to data URL;
        //console.log(img[i].crossOrigin)
        // img[i].crossOrigin="anonymous";
        
        var canvas = document.createElement("CANVAS");
        canvas.width = w;
        canvas.height = h;
        // Draw image to canvas
        var context = canvas.getContext('2d');
        context.drawImage(img[i], 0, 0, w, h);

        let cekuri = garagaraTainted(img[i].getAttribute("src"), "Tainting", "notTainting");
        // let cekuri = garagaraTainted(img[i], "Tainting", "notTainting");
       // var uri = cekuri.uri;
        console.log(cekuri);
        // Get data URL encoding of image
        //var uri = canvas.toDataURL("image/png");//.replace("image/png", "image/octet-stream");
        
        $(img[i]).attr("src", img[i].src);
        img[i].width = w;
        img[i].height = h;
        // Save encoded image to array
        // images[i] = {
        //     type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
        //     encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
        //     location: $(img[i]).attr("src"),
        //     data: uri.substring(uri.indexOf(",") + 1)
        // };
        
    }

    // Prepare bottom of mhtml file with image data
    var mhtmlBottom = "\n";
    for (var i = 0; i < images.length; i++) {
        mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
        mhtmlBottom += "Content-Location: " + images[i].location + "\n";
        mhtmlBottom += "Content-Type: " + images[i].type + "\n";
        mhtmlBottom += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
        mhtmlBottom += images[i].data + "\n\n";
        if(i == 0){
            lg = img[i]
        }
    }
    mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";

    //TODO: load css from included stylesheet
    var styles = "";
    styles+= '<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">';
    styles+=`<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    styles+='<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">';
    styles+= '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lobster">';
    styles+='<link  rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">'
    styles+='<link rel="stylesheet" href="https://syahandrianeda.github.io/syahandrianeda/css/stylegurukelas.css">'
        

    // Aggregate parts of the file together
    css = (`<style>
    @page WordSection1{size: 841.95pt 595.35pt;mso-page-orientation: landscape;}div.WordSection1 {page: WordSection1;font-family:Times New Roman, Times, serif;}
    @page WordSection2{size: 595.35pt 841.95pt ;mso-page-orientation: portrait;}div.WordSection2 {page: WordSection2;font-family:Times New Roman, Times, serif;}
    </style>`);
    
    let htmljadi = "";
    if(kondisi == "kisikisijawaban"){
        htmljadi = markup.innerHTML;

    }else if(kondisi == "naskahsoal"){

        let fokusKop = markup.querySelector(".kopnaskahsoal");
        
        //fokuskop has hidden?
        if(fokusKop.className.indexOf("w3-hide")==-1){
            htmljadi += `<p align="center" style="margin-bottom:0cm;text-align:center"><table><tr><td style="text-align:center;vertical-align:middle">${lg.outerHTML}</td><td style="text-align:center;vertical-align:middle"><font size="5">PEMERINTAH DAERAH KOTA DEPOK</font><br><font size="5">DINAS PENDIDIKAN</font><br><font size="5" face="Arial Black">${idNamaSekolah.toUpperCase()}</font><br><font size="1"><span>${teksalamat}</span><br>NPSN: 20228914 | NSS: 101026604052 | surel: uptdsdnratujaya1@gmail.com</font></td></tr></table><p style="border-top:5pt solid #000;" >&nbsp;</p>`;
        }
        fokusKop.remove();
        let tengah="";
        let tengahtengah;
        let tabel = markup.querySelector(".tempatnaskahsoal_soal");
        for(let j = 0 ; j < tabel.rows.length ; j++){
            let lR = tabel.rows[j];
            if(lR.cells.length ==2){
                tengah += "<p>"+lR.cells[1].innerHTML+"</p>"
            }else{
                tengah += "<div style='font-family:Times New Roman, Times, serif;'><p class='MsoNormal' style='text-indent:-14pt;font-family:Times New Roman, Times, serif;'>"+lR.cells[1].innerHTML +"  "+ lR.cells[2].innerHTML +"</p></div>";
                // tengah += "<div style='position:relative'><div style='position:absolute;margin-left:0;border:.2pt solid #000;width:15px'>"+lR.cells[1].innerHTML +"</div><div style='position:relative;margin-left:20px;margin-top:-35px;border:.2pt solid #000'>"+ lR.cells[2].innerHTML +"</div></div>";
            }
            
        }
        
        tabel.remove()
        tengahtengah = markup.innerHTML;
        htmljadi+= `<div style="text-align:center;border:0 !important;font-family:Times New Roman, Times, serif">${tengahtengah}</div>
        <p style="border-top:2pt solid #000;" >&nbsp;</p>
        `
        // <p style="border-bottom:2pt solid #000;" >&nbsp;</p>
        //""+tengahtengah+"";
        htmljadi+= `<div style="border:5pt 0 solid #000">&nbsp;</div>
        <div style="font-size:12pt">${tengah}</div>`;
        
    }else{
        htmljadi = markup.innerHTML;
    }
    if(ttd){
        htmljadi +=`<table style="text-align:center;font-family::Times New Roman, Times, serif;font-size:11pt;width:100%">
        <tr>
        <td style="padding:5px;text-align:center">Mengetahui, <br>Kepala ${idNamaSekolah}<br><br><br><br><b><u>${idNamaKepsek}</u></b><br>NIP. ${idNipKepsek}</td>
        <td style="padding:5px;text-align:center">Depok, ${tanggalfull(new Date())}<br>${idJenisGuru} ${idgurumapelmapel}<br><br><br><br><b><u>${namauser}</u></b><br>NIP. ${idNipGuruKelas}</td>
        <td style="padding:5px;text-align:center"></td>
        </tr>
        </table>`
    }

        //endingnya disini
    var fileContent ='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head>'+css+'<title>Document Title</title><xml><w:worddocument xmlns:w="#unknown"><w:view>Print</w:view><w:zoom>90</w:zoom><w:donotoptimizeforbrowser /></w:worddocument></xml></head><body style="tab-interval:.5in;">'
    if(kondisi=="kisikisijawaban"){
        fileContent +='<div class="WordSection1">';
    }else{
        fileContent +='<div class="WordSection2">';
    }
    fileContent  += htmljadi + '</div></body></html>';
    // Create a Blob with the file contents
    var blob = new Blob([fileContent], {
        type: "application/msword;charset=utf-8"
    });

    //saveAs(blob, fileName + ".doc");
    //var url = URL.createObjectURL(blob);
    // var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(markup.innerHTML);
    window.URL = window.URL || window.webkitURL;
    var url = window.URL.createObjectURL(blob);
    // Specify file name
    // var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(markup.innerHTML);// window.atob(unescape(encodeURIComponent(markup.innerHTML)));//encodeURIComponent(markup);// window.btoa(unescape(encodeURIComponent(markup.innerHTML)));;
    // filename = filename?filename+'.doc':'document.doc';
    filename = Filename;

    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename); // IE10-11
    }else{
        // Create a link to the file
        downloadLink.href = url;
        
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }

    document.body.removeChild(downloadLink);
}

const print2Wordg = (element, filename = '')=>{
    
    //function Export2Doc(element, filename = ''){
        //var html, link, blob, url, css;
        
        /*css = (
          '<style>' +
          '@page WordSection1{size: 841.95pt 595.35pt;mso-page-orientation: landscape;}' +
          'div.WordSection1 {page: WordSection1;}' +
          '</style>'
        );*/
        var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title>";
        css = ('\
        <style>\
        @page WordSection1{size: 841.95pt 595.35pt;mso-page-orientation: landscape;}\
        @page WordSection1{size: 841.95pt 595.35pt;mso-page-orientation: portrait;}\
        div.WordSection1 {page: WordSection1;}\
        html{box-sizing:border-box}*,:after,:before{box-sizing:inherit}html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section{display:block}summary{display:list-item}audio,canvas,progress,video{display:inline-block}progress{vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}dfn{font-style:italic}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}figure{margin:1em 40px}img{border-style:none}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}hr{box-sizing:content-box;height:0;overflow:visible}button,input,optgroup,select,textarea{font:inherit;margin:0}optgroup{font-weight:700}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{color:inherit;display:table;max-width:100%;padding:0;white-space:normal}textarea{overflow:auto}[type=checkbox],[type=radio]{padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}body,html{font-family:Verdana,sans-serif;font-size:15px;line-height:1.5}html{overflow-x:hidden}h1{font-size:36px}h2{font-size:30px}h3{font-size:24px}h4{font-size:20px}h5{font-size:18px}h6{font-size:16px}.Wordw3-serif{font-family:serif}.Wordw3-sans-serif{font-family:sans-serif}.Wordw3-cursive{font-family:cursive}.Wordw3-monospace{font-family:monospace}h1,h2,h3,h4,h5,h6{font-family:"Segoe UI",Arial,sans-serif;font-weight:400;margin:10px 0}.Wordw3-wide{letter-spacing:4px}hr{border:0;border-top:1px solid #eee;margin:20px 0}.Wordw3-image{max-width:100%;height:auto}img{vertical-align:middle}a{color:inherit}.Wordw3-table,.Wordw3-table-all{border-collapse:collapse;border-spacing:0;width:100%;display:table}.Wordw3-table-all{border:1px solid #ccc}.Wordw3-bordered tr,.Wordw3-table-all tr{border-bottom:1px solid #ddd}.Wordw3-striped tbody tr:nth-child(even){background-color:#f1f1f1}.Wordw3-table-all tr:nth-child(odd){background-color:#fff}.Wordw3-table-all tr:nth-child(even){background-color:#f1f1f1}.Wordw3-hoverable tbody tr:hover,.Wordw3-ul.Wordw3-hoverable li:hover{background-color:#ccc}.Wordw3-centered tr td,.Wordw3-centered tr th{text-align:center}.Wordw3-table td,.Wordw3-table th,.Wordw3-table-all td,.Wordw3-table-all th{padding:8px 8px;display:table-cell;text-align:left;vertical-align:top}.Wordw3-table td:first-child,.Wordw3-table th:first-child,.Wordw3-table-all td:first-child,.Wordw3-table-all th:first-child{padding-left:16px}.Wordw3-btn,.Wordw3-button{border:none;display:inline-block;padding:8px 16px;vertical-align:middle;overflow:hidden;text-decoration:none;color:inherit;background-color:inherit;text-align:center;cursor:pointer;white-space:nowrap}.Wordw3-btn:hover{box-shadow:0 8px 16px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)}.Wordw3-btn,.Wordw3-button{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.Wordw3-btn:disabled,.Wordw3-button:disabled,.Wordw3-disabled{cursor:not-allowed;opacity:.3}.Wordw3-disabled *,:disabled *{pointer-events:none}.Wordw3-btn.Wordw3-disabled:hover,.Wordw3-btn:disabled:hover{box-shadow:none}.Wordw3-badge,.Wordw3-tag{background-color:#000;color:#fff;display:inline-block;padding-left:8px;padding-right:8px;text-align:center}.Wordw3-badge{border-radius:50%}.Wordw3-ul{list-style-type:none;padding:0;margin:0}.Wordw3-ul li{padding:8px 16px;border-bottom:1px solid #ddd}.Wordw3-ul li:last-child{border-bottom:none}.Wordw3-display-container,.Wordw3-tooltip{position:relative}.Wordw3-tooltip .Wordw3-text{display:none}.Wordw3-tooltip:hover .Wordw3-text{display:inline-block}.Wordw3-ripple:active{opacity:.5}.Wordw3-ripple{transition:opacity 0s}.Wordw3-input{padding:8px;display:block;border:none;border-bottom:1px solid #ccc;width:100%}.Wordw3-select{padding:9px 0;width:100%;border:none;border-bottom:1px solid #ccc}\
        .Wordw3-dropdown-click,.Wordw3-dropdown-hover{position:relative;display:inline-block;cursor:pointer}.Wordw3-dropdown-hover:hover .Wordw3-dropdown-content{display:block}.Wordw3-dropdown-click:hover,.Wordw3-dropdown-hover:first-child{background-color:#ccc;color:#000}.Wordw3-dropdown-click:hover>.Wordw3-button:first-child,.Wordw3-dropdown-hover:hover>.Wordw3-button:first-child{background-color:#ccc;color:#000}.Wordw3-dropdown-content{cursor:auto;color:#000;background-color:#fff;display:none;position:absolute;min-width:160px;margin:0;padding:0;z-index:1}.Wordw3-check,.Wordw3-radio{width:24px;height:24px;position:relative;top:6px}.Wordw3-sidebar{height:100%;width:200px;background-color:#fff;position:fixed!important;z-index:1;overflow:auto}.Wordw3-bar-block .Wordw3-dropdown-click,.Wordw3-bar-block .Wordw3-dropdown-hover{width:100%}.Wordw3-bar-block .Wordw3-dropdown-click .Wordw3-dropdown-content,.Wordw3-bar-block .Wordw3-dropdown-hover .Wordw3-dropdown-content{min-width:100%}.Wordw3-bar-block .Wordw3-dropdown-click .Wordw3-button,.Wordw3-bar-block .Wordw3-dropdown-hover .Wordw3-button{width:100%;text-align:left;padding:8px 16px}#main,.Wordw3-main{transition:margin-left .4s}.Wordw3-modal{z-index:3;display:none;padding-top:100px;position:fixed;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:rgba(0,0,0,.4)}.Wordw3-modal-content{margin:auto;background-color:#fff;position:relative;padding:0;outline:0;width:600px}.Wordw3-bar{width:100%;overflow:hidden}.Wordw3-center .Wordw3-bar{display:inline-block;width:auto}.Wordw3-bar .Wordw3-bar-item{padding:8px 16px;float:left;width:auto;border:none;display:block;outline:0}.Wordw3-bar .Wordw3-dropdown-click,.Wordw3-bar .Wordw3-dropdown-hover{position:static;float:left}.Wordw3-bar .Wordw3-button{white-space:normal}.Wordw3-bar-block .Wordw3-bar-item{width:100%;display:block;padding:8px 16px;text-align:left;border:none;white-space:normal;float:none;outline:0}.Wordw3-bar-block.Wordw3-center .Wordw3-bar-item{text-align:center}.Wordw3-block{display:block;width:100%}.Wordw3-responsive{display:block;overflow-x:auto}.Wordw3-bar:after,.Wordw3-bar:before,.Wordw3-cell-row:after,.Wordw3-cell-row:before,.Wordw3-clear:after,.Wordw3-clear:before,.Wordw3-container:after,.Wordw3-container:before,.Wordw3-panel:after,.Wordw3-panel:before,.Wordw3-row-padding:after,.Wordw3-row-padding:before,.Wordw3-row:after,.Wordw3-row:before{content:"";display:table;clear:both}.Wordw3-col,.Wordw3-half,.Wordw3-quarter,.Wordw3-third,.Wordw3-threequarter,.Wordw3-twothird{float:left;width:100%}.Wordw3-col.s1{width:8.33333%}.Wordw3-col.s2{width:16.66666%}.Wordw3-col.s3{width:24.99999%}.Wordw3-col.s4{width:33.33333%}.Wordw3-col.s5{width:41.66666%}.Wordw3-col.s6{width:49.99999%}.Wordw3-col.s7{width:58.33333%}.Wordw3-col.s8{width:66.66666%}.Wordw3-col.s9{width:74.99999%}.Wordw3-col.s10{width:83.33333%}.Wordw3-col.s11{width:91.66666%}.Wordw3-col.s12{width:99.99999%}@media (min-width:601px){.Wordw3-col.m1{width:8.33333%}.Wordw3-col.m2{width:16.66666%}.Wordw3-col.m3,.Wordw3-quarter{width:24.99999%}.Wordw3-col.m4,.Wordw3-third{width:33.33333%}.Wordw3-col.m5{width:41.66666%}.Wordw3-col.m6,.Wordw3-half{width:49.99999%}.Wordw3-col.m7{width:58.33333%}.Wordw3-col.m8,.Wordw3-twothird{width:66.66666%}.Wordw3-col.m9,.Wordw3-threequarter{width:74.99999%}.Wordw3-col.m10{width:83.33333%}.Wordw3-col.m11{width:91.66666%}.Wordw3-col.m12{width:99.99999%}}@media (min-width:993px){.Wordw3-col.l1{width:8.33333%}.Wordw3-col.l2{width:16.66666%}.Wordw3-col.l3{width:24.99999%}.Wordw3-col.l4{width:33.33333%}.Wordw3-col.l5{width:41.66666%}.Wordw3-col.l6{width:49.99999%}.Wordw3-col.l7{width:58.33333%}.Wordw3-col.l8{width:66.66666%}.Wordw3-col.l9{width:74.99999%}.Wordw3-col.l10{width:83.33333%}.Wordw3-col.l11{width:91.66666%}.Wordw3-col.l12{width:99.99999%}}.Wordw3-rest{overflow:hidden}.Wordw3-stretch{margin-left:-16px;margin-right:-16px}.Wordw3-auto,.Wordw3-content{margin-left:auto;margin-right:auto}.Wordw3-content{max-width:980px}.Wordw3-auto{max-width:1140px}.Wordw3-cell-row{display:table;width:100%}.Wordw3-cell{display:table-cell}.Wordw3-cell-top{vertical-align:top}.Wordw3-cell-middle{vertical-align:middle}.Wordw3-cell-bottom{vertical-align:bottom}.Wordw3-hide{display:none!important}.Wordw3-show,.Wordw3-show-block{display:block!important}.Wordw3-show-inline-block{display:inline-block!important}@media (max-width:1205px){.Wordw3-auto{max-width:95%}}@media (max-width:600px){.Wordw3-modal-content{margin:0 10px;width:auto!important}.Wordw3-modal{padding-top:30px}.Wordw3-dropdown-click.Wordw3-mobile .Wordw3-dropdown-content,.Wordw3-dropdown-hover.Wordw3-mobile .Wordw3-dropdown-content{position:relative}.Wordw3-hide-small{display:none!important}.Wordw3-mobile{display:block;width:100%!important}.Wordw3-bar-item.Wordw3-mobile,.Wordw3-dropdown-click.Wordw3-mobile,.Wordw3-dropdown-hover.Wordw3-mobile{text-align:center}.Wordw3-dropdown-click.Wordw3-mobile,.Wordw3-dropdown-click.Wordw3-mobile .Wordw3-btn,.Wordw3-dropdown-click.Wordw3-mobile .Wordw3-button,.Wordw3-dropdown-hover.Wordw3-mobile,.Wordw3-dropdown-hover.Wordw3-mobile .Wordw3-btn,.Wordw3-dropdown-hover.Wordw3-mobile .Wordw3-button{width:100%}}@media (max-width:768px){.Wordw3-modal-content{width:500px}.Wordw3-modal{padding-top:50px}}@media (min-width:993px){.Wordw3-modal-content{width:900px}.Wordw3-hide-large{display:none!important}.Wordw3-sidebar.Wordw3-collapse{display:block!important}}@media (max-width:992px) and (min-width:601px){.Wordw3-hide-medium{display:none!important}}@media (max-width:992px){.Wordw3-sidebar.Wordw3-collapse{display:none}.Wordw3-main{margin-left:0!important;margin-right:0!important}.Wordw3-auto{max-width:100%}}.Wordw3-bottom,.Wordw3-top{position:fixed;width:100%;z-index:1}.Wordw3-top{top:0}.Wordw3-bottom{bottom:0}.Wordw3-overlay{position:fixed;display:none;width:100%;height:100%;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.5);z-index:2}.Wordw3-display-topleft{position:absolute;left:0;top:0}.Wordw3-display-topright{position:absolute;right:0;top:0}.Wordw3-display-bottomleft{position:absolute;left:0;bottom:0}.Wordw3-display-bottomright{position:absolute;right:0;bottom:0}.Wordw3-display-middle{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%)}.Wordw3-display-left{position:absolute;top:50%;left:0;transform:translate(0,-50%);-ms-transform:translate(0,-50%)}.Wordw3-display-right{position:absolute;top:50%;right:0;transform:translate(0,-50%);-ms-transform:translate(0,-50%)}.Wordw3-display-topmiddle{position:absolute;left:50%;top:0;transform:translate(-50%,0);-ms-transform:translate(-50%,0)}.Wordw3-display-bottommiddle{position:absolute;left:50%;bottom:0;transform:translate(-50%,0);-ms-transform:translate(-50%,0)}.Wordw3-display-container:hover .Wordw3-display-hover{display:block}.Wordw3-display-container:hover span.Wordw3-display-hover{display:inline-block}.Wordw3-display-hover{display:none}.Wordw3-display-position{position:absolute}.Wordw3-circle{border-radius:50%}.Wordw3-round-small{border-radius:2px}.Wordw3-round,.Wordw3-round-medium{border-radius:4px}.Wordw3-round-large{border-radius:8px}.Wordw3-round-xlarge{border-radius:16px}.Wordw3-round-xxlarge{border-radius:32px}.Wordw3-row-padding,.Wordw3-row-padding>.Wordw3-col,.Wordw3-row-padding>.Wordw3-half,.Wordw3-row-padding>.Wordw3-quarter,.Wordw3-row-padding>.Wordw3-third,.Wordw3-row-padding>.Wordw3-threequarter,.Wordw3-row-padding>.Wordw3-twothird{padding:0 8px}.Wordw3-container,.Wordw3-panel{padding:.01em 16px}.Wordw3-panel{margin-top:16px;margin-bottom:16px}.Wordw3-code,.Wordw3-codespan{font-family:Consolas,"courier new";font-size:16px}.Wordw3-code{width:auto;background-color:#fff;padding:8px 12px;border-left:4px solid #4caf50;word-wrap:break-word}.Wordw3-codespan{color:#dc143c;background-color:#f1f1f1;padding-left:4px;padding-right:4px;font-size:110%}.Wordw3-card,.Wordw3-card-2{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)}.Wordw3-card-4,.Wordw3-hover-shadow:hover{box-shadow:0 4px 10px 0 rgba(0,0,0,.2),0 4px 20px 0 rgba(0,0,0,.19)}.Wordw3-spin{animation:w3-spin 2s infinite linear}@keyframes w3-spin{0%{transform:rotate(0)}100%{transform:rotate(359deg)}}.Wordw3-animate-fading{animation:fading 10s infinite}@keyframes fading{0%{opacity:0}50%{opacity:1}100%{opacity:0}}.Wordw3-animate-opacity{animation:opac .8s}@keyframes opac{from{opacity:0}to{opacity:1}}.Wordw3-animate-top{position:relative;animation:animatetop .4s}@keyframes animatetop{from{top:-300px;opacity:0}to{top:0;opacity:1}}.Wordw3-animate-left{position:relative;animation:animateleft .4s}@keyframes animateleft{from{left:-300px;opacity:0}to{left:0;opacity:1}}.Wordw3-animate-right{position:relative;animation:animateright .4s}@keyframes animateright{from{right:-300px;opacity:0}to{right:0;opacity:1}}.Wordw3-animate-bottom{position:relative;animation:animatebottom .4s}@keyframes animatebottom{from{bottom:-300px;opacity:0}to{bottom:0;opacity:1}}.Wordw3-animate-zoom{animation:animatezoom .6s}@keyframes animatezoom{from{transform:scale(0)}to{transform:scale(1)}}.Wordw3-animate-input{transition:width .4s ease-in-out}.Wordw3-animate-input:focus{width:100%!important}.Wordw3-hover-opacity:hover,.Wordw3-opacity{opacity:.6}.Wordw3-hover-opacity-off:hover,.Wordw3-opacity-off{opacity:1}.Wordw3-opacity-max{opacity:.25}.Wordw3-opacity-min{opacity:.75}.Wordw3-grayscale-max,.Wordw3-greyscale-max,.Wordw3-hover-grayscale:hover,.Wordw3-hover-greyscale:hover{filter:grayscale(100%)}.Wordw3-grayscale,.Wordw3-greyscale{filter:grayscale(75%)}.Wordw3-grayscale-min,.Wordw3-greyscale-min{filter:grayscale(50%)}.Wordw3-sepia{filter:sepia(75%)}.Wordw3-hover-sepia:hover,.Wordw3-sepia-max{filter:sepia(100%)}.Wordw3-sepia-min{filter:sepia(50%)}.Wordw3-tiny{font-size:10px!important}.Wordw3-small{font-size:12px!important}.Wordw3-medium{font-size:15px!important}.Wordw3-large{font-size:18px!important}.Wordw3-xlarge{font-size:24px!important}\
        .Wordw3-xxlarge{font-size:36px!important}.Wordw3-xxxlarge{font-size:48px!important}.Wordw3-jumbo{font-size:64px!important}.Wordw3-left-align{text-align:left!important}.Wordw3-right-align{text-align:right!important}.Wordw3-justify{text-align:justify!important}.Wordw3-center{text-align:center!important}.Wordw3-border-0{border:0!important}.Wordw3-border{border:1px solid #ccc!important}.Wordw3-border-top{border-top:1px solid #ccc!important}.Wordw3-border-bottom{border-bottom:1px solid #ccc!important}.Wordw3-border-left{border-left:1px solid #ccc!important}.Wordw3-border-right{border-right:1px solid #ccc!important}.Wordw3-topbar{border-top:6px solid #ccc!important}.Wordw3-bottombar{border-bottom:6px solid #ccc!important}.Wordw3-leftbar{border-left:6px solid #ccc!important}.Wordw3-rightbar{border-right:6px solid #ccc!important}.Wordw3-code,.Wordw3-section{margin-top:16px!important;margin-bottom:16px!important}.Wordw3-margin{margin:16px!important}.Wordw3-margin-top{margin-top:16px!important}.Wordw3-margin-bottom{margin-bottom:16px!important}.Wordw3-margin-left{margin-left:16px!important}.Wordw3-margin-right{margin-right:16px!important}.Wordw3-padding-small{padding:4px 8px!important}.Wordw3-padding{padding:8px 16px!important}.Wordw3-padding-large{padding:12px 24px!important}.Wordw3-padding-16{padding-top:16px!important;padding-bottom:16px!important}.Wordw3-padding-24{padding-top:24px!important;padding-bottom:24px!important}.Wordw3-padding-32{padding-top:32px!important;padding-bottom:32px!important}.Wordw3-padding-48{padding-top:48px!important;padding-bottom:48px!important}.Wordw3-padding-64{padding-top:64px!important;padding-bottom:64px!important}.Wordw3-padding-top-64{padding-top:64px!important}.Wordw3-padding-top-48{padding-top:48px!important}.Wordw3-padding-top-32{padding-top:32px!important}.Wordw3-padding-top-24{padding-top:24px!important}.Wordw3-left{float:left!important}.Wordw3-right{float:right!important}.Wordw3-button:hover{color:#000!important;background-color:#ccc!important}.Wordw3-hover-none:hover,.Wordw3-transparent{background-color:transparent!important}.Wordw3-hover-none:hover{box-shadow:none!important}.Wordw3-amber,.Wordw3-hover-amber:hover{color:#000!important;background-color:#ffc107!important}.Wordw3-aqua,.Wordw3-hover-aqua:hover{color:#000!important;background-color:#0ff!important}.Wordw3-blue,.Wordw3-hover-blue:hover{color:#fff!important;background-color:#2196f3!important}.Wordw3-hover-light-blue:hover,.Wordw3-light-blue{color:#000!important;background-color:#87ceeb!important}.Wordw3-brown,.Wordw3-hover-brown:hover{color:#fff!important;background-color:#795548!important}.Wordw3-cyan,.Wordw3-hover-cyan:hover{color:#000!important;background-color:#00bcd4!important}.Wordw3-blue-gray,.Wordw3-blue-grey,.Wordw3-hover-blue-gray:hover,.Wordw3-hover-blue-grey:hover{color:#fff!important;background-color:#607d8b!important}.Wordw3-green,.Wordw3-hover-green:hover{color:#fff!important;background-color:#4caf50!important}.Wordw3-hover-light-green:hover,.Wordw3-light-green{color:#000!important;background-color:#8bc34a!important}.Wordw3-hover-indigo:hover,.Wordw3-indigo{color:#fff!important;background-color:#3f51b5!important}.Wordw3-hover-khaki:hover,.Wordw3-khaki{color:#000!important;background-color:khaki!important}.Wordw3-hover-lime:hover,.Wordw3-lime{color:#000!important;background-color:#cddc39!important}.Wordw3-hover-orange:hover,.Wordw3-orange{color:#000!important;background-color:#ff9800!important}.Wordw3-deep-orange,.Wordw3-hover-deep-orange:hover{color:#fff!important;background-color:#ff5722!important}.Wordw3-hover-pink:hover,.Wordw3-pink{color:#fff!important;background-color:#e91e63!important}.Wordw3-hover-purple:hover,.Wordw3-purple{color:#fff!important;background-color:#9c27b0!important}.Wordw3-deep-purple,.Wordw3-hover-deep-purple:hover{color:#fff!important;background-color:#673ab7!important}.Wordw3-hover-red:hover,.Wordw3-red{color:#fff!important;background-color:#f44336!important}.Wordw3-hover-sand:hover,.Wordw3-sand{color:#000!important;background-color:#fdf5e6!important}.Wordw3-hover-teal:hover,.Wordw3-teal{color:#fff!important;background-color:#009688!important}.Wordw3-hover-yellow:hover,.Wordw3-yellow{color:#000!important;background-color:#ffeb3b!important}.Wordw3-hover-white:hover,.Wordw3-white{color:#000!important;background-color:#fff!important}.Wordw3-black,.Wordw3-hover-black:hover{color:#fff!important;background-color:#000!important}.Wordw3-gray,.Wordw3-grey,\
        .Wordw3-hover-gray:hover,.Wordw3-hover-grey:hover{color:#000!important;background-color:#9e9e9e!important}.Wordw3-hover-light-gray:hover,.Wordw3-hover-light-grey:hover,.Wordw3-light-gray,.Wordw3-light-grey{color:#000!important;background-color:#f1f1f1!important}.Wordw3-dark-gray,.Wordw3-dark-grey,.Wordw3-hover-dark-gray:hover,.Wordw3-hover-dark-grey:hover{color:#fff!important;background-color:#616161!important}.Wordw3-hover-pale-red:hover,.Wordw3-pale-red{color:#000!important;background-color:#fdd!important}.Wordw3-hover-pale-green:hover,.Wordw3-pale-green{color:#000!important;background-color:#dfd!important}.Wordw3-hover-pale-yellow:hover,.Wordw3-pale-yellow{color:#000!important;background-color:#ffc!important}.Wordw3-hover-pale-blue:hover,.Wordw3-pale-blue{color:#000!important;background-color:#dff!important}.Wordw3-hover-text-amber:hover,.Wordw3-text-amber{color:#ffc107!important}.Wordw3-hover-text-aqua:hover,.Wordw3-text-aqua{color:#0ff!important}.Wordw3-hover-text-blue:hover,.Wordw3-text-blue{color:#2196f3!important}.Wordw3-hover-text-light-blue:hover,.Wordw3-text-light-blue{color:#87ceeb!important}.Wordw3-hover-text-brown:hover,.Wordw3-text-brown{color:#795548!important}.Wordw3-hover-text-cyan:hover,.Wordw3-text-cyan{color:#00bcd4!important}.Wordw3-hover-text-blue-gray:hover,.Wordw3-hover-text-blue-grey:hover,.Wordw3-text-blue-gray,.Wordw3-text-blue-grey{color:#607d8b!important}.Wordw3-hover-text-green:hover,.Wordw3-text-green{color:#4caf50!important}.Wordw3-hover-text-light-green:hover,.Wordw3-text-light-green{color:#8bc34a!important}.Wordw3-hover-text-indigo:hover,.Wordw3-text-indigo{color:#3f51b5!important}.Wordw3-hover-text-khaki:hover,.Wordw3-text-khaki{color:#b4aa50!important}.Wordw3-hover-text-lime:hover,.Wordw3-text-lime{color:#cddc39!important}.Wordw3-hover-text-orange:hover,.Wordw3-text-orange{color:#ff9800!important}.Wordw3-hover-text-deep-orange:hover,.Wordw3-text-deep-orange{color:#ff5722!important}.Wordw3-hover-text-pink:hover,.Wordw3-text-pink{color:#e91e63!important}.Wordw3-hover-text-purple:hover,.Wordw3-text-purple{color:#9c27b0!important}.Wordw3-hover-text-deep-purple:hover,.Wordw3-text-deep-purple{color:#673ab7!important}.Wordw3-hover-text-red:hover,.Wordw3-text-red{color:#f44336!important}.Wordw3-hover-text-sand:hover,.Wordw3-text-sand{color:#fdf5e6!important}.Wordw3-hover-text-teal:hover,.Wordw3-text-teal{color:#009688!important}.Wordw3-hover-text-yellow:hover,.Wordw3-text-yellow{color:#d2be0e!important}.Wordw3-hover-text-white:hover,.Wordw3-text-white{color:#fff!important}.Wordw3-hover-text-black:hover,.Wordw3-text-black{color:#000!important}.Wordw3-hover-text-gray:hover,.Wordw3-hover-text-grey:hover,.Wordw3-text-gray,.Wordw3-text-grey{color:#757575!important}.Wordw3-hover-text-light-gray:hover,.Wordw3-hover-text-light-grey:hover,.Wordw3-text-light-gray,.Wordw3-text-light-grey{color:#f1f1f1!important}.Wordw3-hover-text-dark-gray:hover,.Wordw3-hover-text-dark-grey:hover,.Wordw3-text-dark-gray,.Wordw3-text-dark-grey{color:#3a3a3a!important}.Wordw3-border-amber,.Wordw3-hover-border-amber:hover{border-color:#ffc107!important}.Wordw3-border-aqua,.Wordw3-hover-border-aqua:hover{border-color:#0ff!important}.Wordw3-border-blue,.Wordw3-hover-border-blue:hover{border-color:#2196f3!important}.Wordw3-border-light-blue,.Wordw3-hover-border-light-blue:hover{border-color:#87ceeb!important}.Wordw3-border-brown,.Wordw3-hover-border-brown:hover{border-color:#795548!important}.Wordw3-border-cyan,.Wordw3-hover-border-cyan:hover{border-color:#00bcd4!important}.Wordw3-border-blue-gray,.Wordw3-border-blue-grey,.Wordw3-hover-border-blue-gray:hover,.Wordw3-hover-border-blue-grey:hover{border-color:#607d8b!important}.Wordw3-border-green,.Wordw3-hover-border-green:hover{border-color:#4caf50!important}.Wordw3-border-light-green,.Wordw3-hover-border-light-green:hover{border-color:#8bc34a!important}.Wordw3-border-indigo,.Wordw3-hover-border-indigo:hover{border-color:#3f51b5!important}.Wordw3-border-khaki,.Wordw3-hover-border-khaki:hover{border-color:khaki!important}.Wordw3-border-lime,.Wordw3-hover-border-lime:hover{border-color:#cddc39!important}.Wordw3-border-orange,.Wordw3-hover-border-orange:hover{border-color:#ff9800!important}.Wordw3-border-deep-orange,.Wordw3-hover-border-deep-orange:hover{border-color:#ff5722!important}.Wordw3-border-pink,.Wordw3-hover-border-pink:hover{border-color:#e91e63!important}.Wordw3-border-purple,.Wordw3-hover-border-purple:hover{border-color:#9c27b0!important}.Wordw3-border-deep-purple,.Wordw3-hover-border-deep-purple:hover{border-color:#673ab7!important}.Wordw3-border-red,.Wordw3-hover-border-red:hover{border-color:#f44336!important}.Wordw3-border-sand,.Wordw3-hover-border-sand:hover{border-color:#fdf5e6!important}.Wordw3-border-teal,.Wordw3-hover-border-teal:hover{border-color:#009688!important}.Wordw3-border-yellow,.Wordw3-hover-border-yellow:hover{border-color:#ffeb3b!important}.Wordw3-border-white,.Wordw3-hover-border-white:hover{border-color:#fff!important}.Wordw3-border-black,.Wordw3-hover-border-black:hover{border-color:#000!important}.Wordw3-border-gray,.Wordw3-border-grey,.Wordw3-hover-border-gray:hover,.Wordw3-hover-border-grey:hover{border-color:#9e9e9e!important}.Wordw3-border-light-gray,.Wordw3-border-light-grey,.Wordw3-hover-border-light-gray:hover,.Wordw3-hover-border-light-grey:hover{border-color:#f1f1f1!important}.Wordw3-border-dark-gray,.Wordw3-border-dark-grey,.Wordw3-hover-border-dark-gray:hover,.Wordw3-hover-border-dark-grey:hover{border-color:#616161!important}.Wordw3-border-pale-red,.Wordw3-hover-border-pale-red:hover{border-color:#ffe7e7!important}.Wordw3-border-pale-green,.Wordw3-hover-border-pale-green:hover{border-color:#e7ffe7!important}.Wordw3-border-pale-yellow,.Wordw3-hover-border-pale-yellow:hover{border-color:#ffc!important}.Wordw3-border-pale-blue,.Wordw3-hover-border-pale-blue:hover{border-color:#e7ffff!important}\
        </style>\
        ');
        preHtml +="</head><body><div class='w3-border w3-border-black'>HALOOOOOO</div>"

        var postHtml = "</body></html>";
        
        var convv = document.querySelector("."+element).innerHTML;
        var conv2 = convv.replace(/src="\/img/g,`src="https://edurasa.com/img`);
        var conv1 = conv2.replace("90px",`2cm`);
        var conv = '<div class="Section1">' + conv1 + '</div>'; 

        var html = preHtml+conv+postHtml;
    
        var blob = new Blob(['\ufeff', css + html], {
            type: 'application/msword'
        });
        //var url = URL.createObjectURL(blob);
        var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
        // window.URL = window.URL || window.webkitURL;
        // var url = window.URL.createObjectURL(blob);
        
        // Specify file name
        filename = filename?filename+'.doc':'document.doc';
        
        // Create download link element
        var downloadLink = document.createElement("a");
    
        document.body.appendChild(downloadLink);
        
        if(navigator.msSaveOrOpenBlob ){
            navigator.msSaveOrOpenBlob(blob, filename); // IE10-11
        }else{
            // Create a link to the file
            downloadLink.href = url;
            
            // Setting the file name
            downloadLink.download = filename;
            
            //triggering the function
            downloadLink.click();
        }
        
        document.body.removeChild(downloadLink);
    // }
     
}

function CleanWordFormatting(input) {
    // 1. Remove line breaks / Mso classes
    var stringStripper = /(\n|\r| class=(")?Mso[a-zA-Z]+(")?)/g;
    var output = input.replace(stringStripper, ' ');

    // 2. Strip Word generated HTML comments
    var commentSripper = new RegExp('<!--(.*?)-->', 'g');
    var output = output.replace(commentSripper, '');
    var tagStripper = new RegExp('<(/)*(meta|link|\\?xml:|st1:|o:|font)(.*?)>', 'gi');

    // 3. Remove tags leave content if any
    output = output.replace(tagStripper, '');

    // 4. Remove everything in between and including tags '<style(.)style(.)>'
    var badTags = ['style', 'script', 'applet', 'embed', 'noframes', 'noscript'];
    for (var i = 0; i < badTags.length; i++) {
        tagStripper = new RegExp('<' + badTags[i] + '.*?' + badTags[i] + '(.*?)>', 'gi');
        output = output.replace(tagStripper, '');
    }

    // 5. Remove any unwanted styling
    // NOTE: Add your own list of 'blacklisted' css attributes here
    var badStyling = ['margin-top:', 'margin-bottom:', 'line-height:', 'mso-fareast-font-family:&quot;', 'font-weight:', 'margin:'];
    for (var i = 0; i < badStyling.length; i++) {
        attrStripper = new RegExp('(' + badStyling[i] + ')([^;]*)+[^]', 'gm');
        output = output.replace(attrStripper, '');
    }

    // 6. Remove any unwanted attributes
    var badAttributes = ['start'];
    for (var i = 0; i < badAttributes.length; i++) {
        var attributeStripper = new RegExp(' ' + badAttributes[i] + '="(.*?)"', 'gi');
        output = output.replace(attributeStripper, '');
    }

    return output;
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
    var table,// =document.querySelector(".tempatnaskahsoal_soal"),
        row = this.parentNode;


    while (row != null) {
        if (row.nodeName == 'TR') {
            break;
        }
        row = row.parentNode;
    }
    table = row.parentNode;
    
    let batas = row.rowIndex;
    if (batas !== 0) {
        table.insertBefore(row, get_previoussibling(row));

    } else {
        alert("Cukup, tidak bisa dinaikkan lagi.");
        return
    }

    tabel = document.querySelector(".tempatnaskahsoal_soal");
    let lRow = tabel.rows;
    let no=0;
    for(i=0; i < lRow.length ; i++){
        if(lRow[i].hasAttribute("class")){
            // no = no
        }else{
            no++
        }
        if(lRow[i].cells.length == 3){
            lRow[i].cells[1].innerHTML = no+".";
        }else if(lRow[i].cells.length == 4){
            lRow[i].cells[2].innerHTML = no+".";
        }
    }


}
function MoveDown() {
    // var table = document.querySelector(".tempatnaskahsoal_soal"),
    var table,
        row = this.parentNode;
    let cektabel = document.querySelector(".tempatnaskahsoal_soal");
    let batasbawah = cektabel.rows.length;

    while (row != null) {
        if (row.nodeName == 'TR') {
            break;
        }
        row = row.parentNode;
    }
    table = row.parentNode;
    // console.log("movedown",table);//result tbody
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
        alert("Cukup, tidak bisa diturunkan lagi.");
        return
    }

    tabel = document.querySelector(".tempatnaskahsoal_soal");
    let lRow = tabel.rows;
    let no=0;
    for(i=0; i < lRow.length ; i++){
        if(lRow[i].hasAttribute("class")){
            // no = no
        }else{
            no++
        }
        if(lRow[i].cells.length == 3){
            lRow[i].cells[1].innerHTML = no+".";
        }else if(lRow[i].cells.length == 4){
            lRow[i].cells[2].innerHTML = no+".";
        }
    }


}



const informasi_naskahsoal = (k) =>{
    let div = document.querySelector(".infobutton_naskahsoal");
    if(k == "naikkan"){
        div.innerHTML ="Jadikan nomor soal ini naik satu tingkat"
    }else if(k == "turunkan"){
        div.innerHTML ="Jadikan nomor soal ini turun satu tingkat"
    }else if(k =="tambahpetunjuk"){
        div.innerHTML =`Adakalanya soal memerlukan petunjuk. Misalnya:<br><br>Berilah tanda silang (x) pada huruf A, B, C, dan D di depan jawaban yang paling benar! <br>Teks Ilustrasi berikut untuk menjawab pertanyaan soal nomor 38 dan 39!<br><br>Pada database naskah soal, kami menyedikan <b>Ilustrasi</b>,<b> pertanyaan</b>, <b> dan opsi pilihan Ganda</b>. Setiap ilustrasi yang sama, bisa dihilangkan ceklisnya ketika Anda memilih soal tersebut.`;
    }else if(k=="hapus"){
        div.innerHTML ="Hapus soal ini dari desain naskah soal."
    }else if(k=="tambahsoal"){
        div.innerHTML ="Anda akan ditambahkan kolom untuk pengisian item soal baru"
    }else if(k == "cetak"){
        div.innerHTML = "Anda bisa mencetak naskah soal yang Anda desain. Tampilan cetak akan mengilangkan tombol bantu dari area desain"
    }else if(k=="exportmsword"){
        div.innerHTML = "(fitur trial): Anda dapat mengeksport desain naskah soal ke dalam file Ms. Word"
    }else if(k=="downloadkisi"){
        div.innerHTML ="Desain naskah soal Anda akan otomatis dibuatkan File-file kisi-kisinya. Anda tinggal mencetaknya saja."
    }else if(k=="downloadkunci"){
        div.innerHTML = "Desain naskah soal Anda akan otomatis dibuatkan file kunci jawaban dan/atau penskoran soal isiannya."
    }else if(k == "kartusoal"){
        div.innerHTML = "Dari desain naskah soal Anda akan otomatis dibuatkan seluruh kartu soal dari desain naskah soal Anda."
    }else if(k=="simpanserver"){
        div.innerHTML = "Simpan desain naskah soal yang Anda buat ini sebagai karya Anda. Anda dapat melihatnya kemballi di menu <b>Database Bank Soal</b>"
    }
}
const removeinformasi = ()=>{
    document.querySelector(".infobutton_naskahsoal").innerHTML = "";
}
const tambahkanselnaskahsoal = ()=>{
    let tabel = document.querySelector(".tempatnaskahsoal_soal");
    let r = tabel.insertRow();
    r.setAttribute("onmouseover","td_tomboleditsoal(this,'show')");
    r.setAttribute("onmouseout","td_tomboleditsoal(this,'hide')");

    let d = r.insertCell(-1);
    d.setAttribute("class","w3-hide");
    d.innerHTML = `<button onclick="MoveUp.call(this)" onmouseover="informasi_naskahsoal('naikkan')" onmouseout="removeinformasi()" class="warnaeka w3-button  w3-round-large " title="Naikkan">&#8679;</button><button onclick="MoveDown.call(this)" onmouseover="informasi_naskahsoal('turunkan')" onmouseout="removeinformasi()"  class="warnaeka w3-button  w3-round-large" title="Turunkan">&#8681;</button><button class="warnaeka w3-button w3-round-large ns_tambahpetunjuk  w3-tiny" onmouseover="informasi_naskahsoal('tambahpetunjuk')" onmouseout="removeinformasi()"  title="Tambahkan keterangan petunjuk/diawal" onclick="ns_tambahkanpetunjuk(this)"><i class="fa fa-plus"></i></button><button class="warnaeka w3-button w3-round-large w3-tiny ns_hapussoalini" onmouseover="informasi_naskahsoal('hapus')" onmouseout="removeinformasi()"  onclick="hapussoalini(this)" title="Hapus Soal ini"><i class="fa fa-trash"></i></button>`;
    d = r.insertCell(-1);
    d.setAttribute("style","width:15px");
    d.innerHTML ="";
    d = r.insertCell(-1);
    d.setAttribute("title","Klik 2 kali untuk mengedit");
    d.setAttribute("ondblclick","editsoalini(this)");
    d.setAttribute("style","cursor:pointer");
    d.innerHTML = "Dobel Klik untuk menentukan soal di Area ini ";
    
    tabel = document.querySelector(".tempatnaskahsoal_soal");
    let lRow = tabel.rows;
    let no=0;
    for(i=0; i < lRow.length ; i++){
        if(lRow[i].hasAttribute("class")){
            // no = no
        }else{
            no++
        }
        if(lRow[i].cells.length == 3){
            lRow[i].cells[1].innerHTML = no+".";
        }else if(lRow[i].cells.length == 4){
            lRow[i].cells[2].innerHTML = no+".";
        }
    }
}
const td_tomboleditsoal = (el,k) =>{
    let td = el.cells[0];
    let indekbarisfokus = el.rowIndex;
    // 
    let cektabel = document.querySelector(".tempatnaskahsoal_soal");
    
    if(k == "show"){
        for(i=0 ; i < cektabel.rows.length ; i++){
            if(i == indekbarisfokus ){
                
                td.setAttribute("class","w3-show w3-border");
                td.setAttribute("style","width:66px")
                // el.insertCell(-1);
            }else{
                let tm = cektabel.rows[i].insertCell(0);
                tm.setAttribute("style","width:66px")
                tm.classList.add("selsementara")

            }
        }
    }else{
        td.setAttribute("class","w3-hide");
        let selsementara = document.querySelectorAll(".selsementara");
        for(i=0 ; i < selsementara.length ; i++){
            selsementara[i].remove();
        }

        let tabel = document.querySelector(".tempatnaskahsoal_soal");
        let lRow = tabel.rows;
        for(j = 0 ; j < lRow.length ; j++){
            let cCol = lRow[j].cells
            if(cCol.length == 4){
                lRow[j].deleteCell(0);
                //console.log("hapus sel di onmouse 0 indek", i)
            }
        }

        // if(el.cells.length == 4){
        //     el.deleteCell(-1);
        // }
    }
    

}
const ns_tambahkanpetunjuk = (el) =>{
    var table,// =document.querySelector(".tempatnaskahsoal_soal"),
        row = el.parentNode.parentElement.parentElement;
        let fokusbaris = el.parentNode.parentElement;
        let lBrs = fokusbaris.rowIndex;
        let tKelas = "ns_petunjuke_"+ lBrs;
        
        let baris = row.insertRow(lBrs);
        baris.setAttribute("class","barispetunjuk");
        baris.setAttribute("onmouseover","td_tomboleditsoal(this,'show')");
        baris.setAttribute("onmouseout","td_tomboleditsoal(this,'hide')");
        
        let td = baris.insertCell(-1);
        td.innerHTML = `<button onclick="MoveUp.call(this)" onmouseover="informasi_naskahsoal('naikkan')" onmouseout="removeinformasi()" class="warnaeka w3-button  w3-round-large " title="Naikkan">&#8679;</button><button onclick="MoveDown.call(this)" onmouseover="informasi_naskahsoal('turunkan')" onmouseout="removeinformasi()"  class="warnaeka w3-button  w3-round-large" title="Turunkan">&#8681;</button><button class="warnaeka w3-button w3-round-large ns_tambahpetunjuk  w3-tiny" onmouseover="informasi_naskahsoal('tambahpetunjuk')" onmouseout="removeinformasi()"  title="Tambahkan keterangan petunjuk/diawal" onclick="ns_tambahkanpetunjuk(this)"><i class="fa fa-plus"></i></button><button class="warnaeka w3-button w3-round-large w3-tiny ns_hapussoalini" onmouseover="informasi_naskahsoal('hapus')" onmouseout="removeinformasi()"  onclick="hapussoalini(this)" title="Hapus Soal ini"><i class="fa fa-trash"></i></button>`;
        
        td = baris.insertCell(-1);
        td.setAttribute("colspan","2")
        td.setAttribute("class","tangan petunjuk "+ tKelas);
        td.innerHTML = "Beri Keterangan naskah soal Anda!";

        let klik = document.querySelector("."+tKelas);
        klik.onclick=function(){
            isiteksunsurbanksoal("tempatnaskahsoal_soal", tKelas, "atas", ""); 

        }
        
        // td = baris.insertCell(-1);
        // td.innerHTML =""
        // row.cells[2].innerHTML = "Tes Cek td petunjuk"
        // let td = row.cells[2];
        // td.onclick = function (){
        //     // alert("Anda mengeklik ini")
        //     isiteksunsurbanksoal("tempatnaskahsoal_soal", tKelas, "atas", ""); 
        // }

    // while (row != null) {
    //     if (row.nodeName == 'TR') {
    //         break;
    //     }
    //     row = row.parentNode;
        
    // }
    // table = row.parentElement;
    // console.log(table);
    
    // console.log(table.cells[2].innerHTML);

    // table.cells[2].innerHTML = "Tambah Petunjuk";

    // console.log(el.parentElement.cells[2].innerHTML);
}
const hapussoalini = (el)=>{
    let tabel = document.querySelector(".tempatnaskahsoal_soal");
    if(tabel.rows.length == 1){
        alert("Maaf, tidak bisa dihapus!");
        return
    }
    let fokusbaris = el.parentNode.parentElement;
    let lBrs = fokusbaris.rowIndex;
    tabel.deleteRow(lBrs);
    
    tabel = document.querySelector(".tempatnaskahsoal_soal");
    let lRow = tabel.rows;
        for(j = 0 ; j < lRow.length ; j++){
            let cCol = lRow[j].cells
            if(cCol.length == 4){
                lRow[j].deleteCell(0);
                console.log("hapus sel 0 indek", i)
            }
        }
}

const mulaidesainnaskahsoal = ()=>{
    
    let divarea = document.querySelector(".areadesain_naskahsoal");
    let isikanrombel = document.getElementById("naskahsoal_rombel");
    isikanrombel.setAttribute("value",idNamaKelas);
    let isikanjenjang = document.getElementById("naskahsoal_jenjang");
    isikanjenjang.setAttribute("value",idJenjang);

    document.querySelector(".idns_rombel").innerHTML = idNamaKelas;
    document.querySelector(".idns_jenjang").innerHTML = idJenjang;
    //area desain naskah ditampilkan
    
    //cek pengaturan:
    let kop = document.getElementById("naskahsoal_kop");
    let areakop = document.querySelector(".kopnaskahsoal");
    
    if(kop.checked){
        if(areakop.className.indexOf("w3-hide")>-1){
            areakop.classList.remove("w3-hide")
        }
        
    }else{
        if(areakop.className.indexOf("w3-hide")==-1){
            areakop.classList.add("w3-hide")
        }
    }
    
    let ns_identitaskelas = document.querySelectorAll("input[name=ns_identitaskelas]");
    ns_identitaskelas.forEach(el =>{
        if(el.checked){
            document.querySelector(".naskahsoal_namakelas").innerHTML = el.value
        }
    });
    let tekswaktu = "";
    let waktuawal = document.getElementById("naskahsoal_titinmangsa").value;
    let waktuakhir = document.getElementById("naskahsoal_titinmangsaakhir").value;
    //hari
    document.querySelector(".naskahsoal_haritanggal").innerHTML = Tanggaldenganhari(new Date(waktuawal));
    let inputjudul = document.getElementById("naskahsoal_identitas").value;
    document.querySelector(".naskahsoal_judul").innerHTML = inputjudul==""?"JUDUL BELUM DIISI": inputjudul;
    let selectmapel = document.getElementById("naskahsoal_mapelapatema");
    let ops = selectmapel.options;
    let indek = ops.selectedIndex;
    let v_mapel = ops[indek].value;
    let t_mapel = ops[indek].text;
    document.querySelector(".naskahsoal_isitematikbukan").innerHTML = t_mapel;

    
    
    if(waktuawal == "" || waktuakhir == ""){
        alert("Anda belum mengatur waktu pelaksanaan");
        return
    }
    let dtAwal = new Date(waktuawal);
    let dtAkhir = new Date(waktuakhir);
    tekswaktu = addZero(dtAwal.getHours())+"."+addZero(dtAwal.getMinutes()) +" - "+ addZero(dtAkhir.getHours())+":"+addZero(dtAkhir.getMinutes()) + " WIB.  ";
    let menit = (dtAkhir.getTime() - dtAwal.getTime())/(60000);
    tekswaktu +="("+menit+" Menit)";
    document.querySelector(".naskahsoal_Waktu").innerHTML = tekswaktu;
    
    if(divarea.className.indexOf("w3-hide")>-1){
        divarea.classList.remove("w3-hide")
    }
    let tombol = document.querySelector(".areadesain_naskahsoaltombol");
    if(tombol.className.indexOf("w3-hide")>-1){
        tombol.classList.remove("w3-hide");
    }

    

    //tampilkan semua div area kerja:

}

let fokusDatasoal = [];
let fokusDatasoalawal = [];
let iRow_dbsoal = 2; // sama dengan 1dbaris
let cekbentuksoalout = document.querySelectorAll("input[name=mbs_pilihanbentuksoal]");
const mbs_filter = document.getElementById("mbs_filter");
const mbs_lihatpropertysoal = document.getElementById("mbs_lihatpropertysoal");
const mbs_ingindiedit = document.getElementById("mbs_ingindiedit");
const btn_terapkansoaledit = document.querySelector(".btn_terapkansoaledit");
const btn_terapkansoal = document.querySelector(".btn_terapkansoal");
const btn_terapkanfilter = document.querySelector(".terapkanfilter");
const input_mbs_kriteriafilter = document.getElementById("mbs_kriteriafilter");
btn_terapkanfilter.onclick = () =>{
    if(fokusDatasoal.length == 0){
        alert("Maaf, database soal tidak kami temukan");
        return
    };
    
    let araysebelumdicari = fokusDatasoalawal;

    let ar = [];
    let kriteria = input_mbs_kriteriafilter.value;
    let infoawal = document.querySelector(".mbs_info").innerHTML;
    let split_infoawal = infoawal.split(" serta mencari soal dengan kata kunci ")
    console.log(split_infoawal);
    if(split_infoawal.length>1){
        document.querySelector(".mbs_info").innerHTML = infoawal[0] + " serta mencari soal dengan kata kunci "+ kriteria;
    }else{
        document.querySelector(".mbs_info").innerHTML += " serta mencari soal dengan kata kunci "+ kriteria;

    }    
    if(kriteria.indexOf(",")>-1){
        let spl = kriteria.split(",");//array
        for(i = 0 ; i < spl.length ; i++){
            if(i == 0){
                ar = fokusDatasoalawal.filter(s => Object.entries(s).filter(([k,v])=> v.toString().toLowerCase().indexOf(spl[i].toLowerCase())>-1).length!==0)
            }else{
                ar = ar.filter(s => Object.entries(s).filter(([k,v])=> v.toString().toLowerCase().indexOf(spl[i].toLowerCase()>-1)).length!==0);
            }
        }    
        
    }else{
            
            ar = fokusDatasoalawal.filter(s => Object.entries(s).filter(([k,v])=> v.toString().toLowerCase().indexOf(kriteria.toLowerCase())>-1).length!==0)
    }

    if(ar.length == 0){
        alert("Maaf, tidak ditemukan database soal dengan kriteria ini. Kami akan menyajikan database yang telah ada.");
        configmodalsoal_peritem(araysebelumdicari,"");
        
    }else{
        configmodalsoal_peritem(ar,"");
        
    }
}

const configmodalsoal_peritem = (obj,kondisi="")=>{
    modso_sebelumnya.onclick = function () {
        if ( modso_page_saatini > 1) {
            modso_page_saatini--;
            gantiinHalamansoal( modso_page_saatini);
        }
    
    }
    modso_selanjutnya.onclick = function(){
        if ( modso_page_saatini < TotalHalamansoal()) {
            modso_page_saatini++;
            gantiinHalamansoal( modso_page_saatini);
        }
        
    }
    
    function gantiinHalamansoal(page)    {
        if (page < 1) page = 1;
        if (page > TotalHalamansoal()) page = TotalHalamansoal();

        
        let teks =``;
        
        for (var i = (page-1) * modso_per_page; i < (page * modso_per_page) && i < obj.length; i++) {
            let html= "";
            let kondisipg = document.querySelector(".kondisipilihanganda");
            let kondisiilustrasi = document.querySelector(".kondisiilustrasi");
            let tombol = document.querySelector(".btn_terapkansoal")
                    let dataawal
                    if(obj.length == 0){
                        
                        dataawal=Object.assign({},databasesoalkosong)
                        dataawal.ilustrasi = "Tidak ada soal tipe kriteria ini";
                        dataawal.pertanyaan = "Tidak ada soal tipe kriteria ini";
                        
                    }else{
                        dataawal = obj[i]

                    }
                    
                    iRow_dbsoal = dataawal.idbaris;
                    
                    if(iRow_dbsoal == ""){
                        if(tombol.className.indexOf("w3-hide")==-1){
                            tombol.classList.add("w3-hide");
                        }
                    }else{
                        if(tombol.className.indexOf("w3-hide")>-1){
                            tombol.classList.remove("w3-hide");
                        }
                    }

                    let elisi = document.querySelectorAll("[data-dbmbs]");
                    for(j = 0 ; j < elisi.length ; j++){
                        let key = elisi[j].getAttribute("data-dbmbs");
                        elisi[j].innerHTML = dataawal[key];
                    }
                    if(dataawal.ilustrasi == ""){
                        kondisiilustrasi.classList.add("w3-hide");
                    }else{
                        kondisiilustrasi.classList.remove("w3-hide");
                    }
                    if(dataawal.bentuksoal == "Pilihan Ganda"){
                        if(dataawal.tampilanpg == "BIASA"){
                                html +=`<ol style="list-style-type:upper-alpha;margin:0 0 0 -1.4461538461999965em">
                                <li>${dataawal.opsiA}</li>
                                <li>${dataawal.opsiB}</li>
                                <li>${dataawal.opsiC}</li>`
                                if(dataawal.opsiD !== ""){
                                    html +=`<li>${dataawal.opsiC}</li>`
                                }
                                html +=`</ol>`;
                            }else{  
                                let db = dataawal;
                                let arropsiA = JSON.parse(db.opsiA);
                                let arropsiB = JSON.parse(db.opsiB);
                                let arropsiC = JSON.parse(db.opsiC);
                                let arropsiD = [];
                                let arrHead = JSON.parse(db.headerpg);
                                let jumlahPG = 3;
                                
                                if(db.opsiD !== ""){
                                    arropsiD = JSON.parse(db.opsiD);
                                    jumlahPG = 4
                                }
                                html += `<table style="border-collapse:collapse;border:.5pt solid #000;width:100%">`;
                                html +=`<thead><tr style="border:.5pt solid #000"><th style="border:.5pt solid #000;background-color:#f1f1f1;width:30px"></th>`;
                                for(a = 0 ; a < arrHead.length ; a++){
                                    html +=`<th style="border:.5pt solid #000;text-align:center;background-color:#f1f1f1">${arrHead[a]}</th>`
                                }
                                html +=`</tr><tbody>`;
                                //tabel opsi A
                                html +=`<tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">A.</td>`;
                                for(c = 0 ; c <arrHead.length ; c++){
                                    html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiA[c]}</td>`
                                    
                                }
                                //tabel opsi B
                                html +=`</tr><tr style="border:.5pt solid #000;vertical-align:top;"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">B.</td>`;
                                for(c = 0 ; c < arrHead.length ; c++){
                                    html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiB[c]}</td>`;
                                }
                                //tabel opsi C
                                html +=`</tr><tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">C.</td>`;
                                for(c = 0 ; c <arrHead.length ; c++){
                                    html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiC[c]}</td>`
                                    
                                }
                                //tabel opsi D
                                if(db.opsiD !== ""){
                                    html +=`</tr><tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">D.</td>`;
                                    for(c = 0 ; c < arrHead.length ; c++){
                                        html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiD[c]}</td>`;
                                    }
                                    html+=`</tr>`
                                }else{
                                    html +=`</tr>`
                                }
                                
                                html +=`</tbody></table>`
                            }
                    }
                        kondisipg.innerHTML = html;
                    }
        
        

        modso_spanhalaman.innerHTML = page + " dari " + TotalHalamansoal();

        if (page == 1) {
            modso_sebelumnya.style.visibility = "hidden";
            modso_awal.style.visibility = "hidden";
        } else {
            modso_awal.style.visibility = "visible"
            modso_sebelumnya.style.visibility = "visible";
        }

        if (page == TotalHalamansoal()) {
            modso_selanjutnya.style.visibility = "hidden";
            modso_akhir.style.visibility = "hidden";
        } else {
            modso_akhir.style.visibility = "visible";
            modso_selanjutnya.style.visibility = "visible";
        }

    }
    function TotalHalamansoal()
    {
        return Math.ceil(obj.length / modso_per_page);
    }

    modso_akhir.onclick = function (){
        let hal = TotalHalamansoal();
         modso_page_saatini = hal;
        gantiinHalamansoal(hal);

    }
    modso_awal.onclick =function (){
         modso_page_saatini = 1;
        gantiinHalamansoal(1);
        // Validate page
        //  if (page < 1) page = 1;
        //  if (page > TotalHalamansoal()) page = TotalHalamansoal();

    }
    if(kondisi == ""){
        gantiinHalamansoal(1);
    }else{
        
        let valuse = obj.map(m=> parseInt(m.idbaris));
        
        let indeknya = valuse.indexOf(parseInt(kondisi));
        
        gantiinHalamansoal((indeknya+1));
    }
    mbs_ingindiedit.checked = false;
    let elisi = document.querySelectorAll("[data-dbmbs]");
    for(i = 0 ; i < elisi.length ; i++){
    elisi[i].removeAttribute("contenteditable");
    }
    if(btn_terapkansoaledit.className.indexOf("w3-hide")==-1){
        btn_terapkansoaledit.classList.add("w3-hide");
    }
    
}
const editsoalini =  (el)=>{
    let tabel = document.querySelector(".tempatnaskahsoal_soal");
    let lRow = el.parentElement.rowIndex;
    let lCol = el.cellIndex;
    let pAtt = el.hasAttribute("data-idbarissoal")
    if(pAtt){
        let idV = el.getAttribute('data-idbarissoal')
        aktifkanmodal_banksoal(el,idV);
    }else{
        aktifkanmodal_banksoal(el,"");
    }
    //el.setAttribute("data-idbarissoal",lRow+"_"+lCol);
}
let elemenedit;
const aktifkanmodal_banksoal = (elemen="",dataidbarissoal) =>{
    let lR = elemen.parentElement.rowIndex;
    let lC = elemen.cellIndex;
    document.getElementById('modalbanksoal').style.display='block';
    let selectmapel = document.getElementById("naskahsoal_mapelapatema");
    let ops = selectmapel.options;
    let indek = ops.selectedIndex;
    let v_mapel = ops[indek].value;
    let t_mapel = ops[indek].text;
    let krt_kelas = [];
    krt_kelas = v_mapel.indexOf("US_")>-1?["4","5","6"]:[idJenjang];
    let afokusDatasoal = databasesoal.filter(s=> krt_kelas.indexOf(s.jenjang)>-1);
    let infoawal = "Anda memilih Mata Pelajaran " + t_mapel + " untuk kelas " + krt_kelas.join();
    
    let tabel = document.querySelector(".tempatnaskahsoal_soal");
    let lRow = elemen.parentElement.rowIndex;
    
    let nosoal = tabel.rows[lRow].cells[1].innerHTML;
    let innerDiv = tabel.rows[lRow].cells[2];
    elemenedit = tabel.rows[lRow].cells[2];
    
    document.querySelector(".mbs_fokusnosoal").innerHTML = nosoal;
    
    let kondisipg = document.querySelector(".kondisipilihanganda");
    let cekbentuksoal = document.querySelectorAll("input[name=mbs_pilihanbentuksoal]");
    cekbentuksoal.forEach(el => {
        if(el.checked){
            document.querySelector(".mbs_info").innerHTML = infoawal + " dengan kriteria bentuk soal "+el.value;
            fokusDatasoal = afokusDatasoal.filter(s=> s.bentuksoal == el.value);
        }
    });
    // if(fokusDatasoal.length == 0){
    //     alert("Belum ada database soal untuk kriteria soal ini");
    //     document.getElementById('modalbanksoal').style.display='none';
    //     return
    // }
    
    let arOB =[]
        if(v_mapel.indexOf("TEMA")>-1){
            arOB = fokusDatasoal;
        }else{
            if(v_mapel.indexOf("US_")>-1){
                let kr = v_mapel.replace("US_","")
                arOB = fokusDatasoal.filter(s=> s.kodemapel == kr);

            }else{
                arOB = fokusDatasoal.filter(s=> s.kodemapel == v_mapel);

            }
        }
        fokusDatasoalawal = arOB;
    //     iRow_dbsoal = dataawal.idbaris;
    configmodalsoal_peritem(arOB,dataidbarissoal);
    btn_terapkansoal.onclick = function (){
        terapkan_itemsoal(innerDiv)
    };
   
    
    
    
    //el.setAttribute("data-idbarissoal",lRow+"_"+lCol);
}

cekbentuksoalout.forEach(el => {
    el.addEventListener("change",()=>{
        if(el.checked){
            let selectmapel = document.getElementById("naskahsoal_mapelapatema");
            let ops = selectmapel.options;
            let indek = ops.selectedIndex;
            let v_mapel = ops[indek].value;
            let t_mapel = ops[indek].text;
            let krt_kelas = [];
            krt_kelas = v_mapel.indexOf("US_")>-1?["4","5","6"]:[idJenjang];
            let afokusDatasoal = databasesoal.filter(s=> krt_kelas.indexOf(s.jenjang)>-1);
            let infoawal = "Anda memilih Mata Pelajaran " + t_mapel + " untuk kelas " + krt_kelas.join();
            
            document.querySelector(".mbs_info").innerHTML = infoawal + " dengan kriteria bentuk soal "+el.value;
            // let tabel = document.querySelector(".tempatnaskahsoal_soal");
            // let lRow = elemen.parentElement.rowIndex;
            
            // let nosoal = tabel.rows[lRow].cells[1].innerHTML
            // document.querySelector(".mbs_fokusnosoal").innerHTML = nosoal;

            
            fokusDatasoal = afokusDatasoal.filter(s=> s.bentuksoal == el.value);
            let arOB =[]
            if(v_mapel.indexOf("TEMA")>-1){
                arOB = fokusDatasoal;
            }else{
                // arOB = fokusDatasoal.filter(s=> s.kodemapel == v_mapel);
                if(v_mapel.indexOf("US_")>-1){
                    let kr = v_mapel.replace("US_","")
                    arOB = fokusDatasoal.filter(s=> s.kodemapel == kr);

                }else{
                    arOB = fokusDatasoal.filter(s=> s.kodemapel == v_mapel);

                }
            }
            
            if(arOB.length == 0){
                let obkosongan = Object.assign({},databasesoalkosong);
                obkosongan.opsiA =`[""]`;
                obkosongan.opsiB =`[""]`;
                obkosongan.opsiC =`[""]`;
                obkosongan.opsiD =`[""]`;
                obkosongan.headerpg =`[""]`;
                obkosongan.ilustrasi = "Tidak ada soal tipe kriteria ini";
                obkosongan.pertanyaan = "Tidak ada soal tipe kriteria ini";
                arOB.push(obkosongan)
            }
            // console.log(arOB);
            fokusDatasoalawal = arOB;
            configmodalsoal_peritem(arOB,"");
        }
    })
});

const terapkan_itemsoal = (elemen="")=>{
    
    let mbs_ceklisilustrasi = document.getElementById("mbs_ceklisilustrasi")
    let db = fokusDatasoal.filter(s => s.idbaris == iRow_dbsoal)[0];
    let html = "";
    //ilustrasi
    if(db.ilustrasi !== ""){
        if(mbs_ceklisilustrasi.checked){
            html +=`${db.ilustrasi}<br>`
        }
    }
    html += db.pertanyaan;
    if(db.bentuksoal == "Pilihan Ganda"){
        if(db.tampilanpg == "BIASA"){ //-1.4461538461999965em
            html +=`<ol data_bentukopsidesain="biasa_${iRow_dbsoal}_${db.opsiD==""?3:4}" style="list-style-type:upper-alpha;margin:0 0 0 -1.4461538461999965em">
            <li>${db.opsiA}</li>
            <li>${db.opsiB}</li>
            <li>${db.opsiC}</li>`
            if(db.opsiD !==""){
                html +=`<li>${db.opsiD}</li>`
                
            }
            html +=`</ol>`
        }else{
            let arropsiA = JSON.parse(db.opsiA);
                    let arropsiB = JSON.parse(db.opsiB);
                    let arropsiC = JSON.parse(db.opsiC);
                    let arropsiD = [];
                    let arrHead = JSON.parse(db.headerpg);
                    let jumlahPG = 3;
                    
                    if(db.opsiD !== ""){
                        arropsiD = JSON.parse(db.opsiD);
                        jumlahPG = 4
                    }
                    html += `<table data_bentukopsidesain="tabel_${iRow_dbsoal}_${db.opsiD==''?3:4}_${arrHead.length}" style="border-collapse:collapse;border:.5pt solid #000;width:100%;font-family:Times New Roman, Times, serif;">`;
                    html +=`<thead><tr style="border:.5pt solid #000"><th style="border:.5pt solid #000;background-color:#f1f1f1;width:30px"></th>`;
                    for(a = 0 ; a < arrHead.length ; a++){
                        html +=`<th style="border:.5pt solid #000;text-align:center;background-color:#f1f1f1">${arrHead[a]}</th>`
                    }
                    html +=`</tr><tbody>`;
                    //tabel opsi A
                    html +=`<tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">A.</td>`;
                    for(c = 0 ; c <arrHead.length ; c++){
                        html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiA[c]}</td>`
                        
                    }
                    //tabel opsi B
                    html +=`</tr><tr style="border:.5pt solid #000;vertical-align:top;"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">B.</td>`;
                    for(c = 0 ; c < arrHead.length ; c++){
                        html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiB[c]}</td>`;
                    }
                    //tabel opsi C
                    html +=`</tr><tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">C.</td>`;
                    for(c = 0 ; c <arrHead.length ; c++){
                        html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiC[c]}</td>`
                        
                    }
                    //tabel opsi D
                    if(db.opsiD !== ""){
                        html +=`</tr><tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">D.</td>`;
                        for(c = 0 ; c < arrHead.length ; c++){
                            html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiD[c]}</td>`;
                        }
                        html +=`</tr>`
                    }else{
                        html +=`</tr>`
                    }

                    html +=`</tbody></table>`
            
        }
    }
    elemen.innerHTML = html;
    elemen.setAttribute("data-idbarissoal",iRow_dbsoal);
    document.getElementById('modalbanksoal').style.display='none';
    
    //el.setAttribute("data-idbarissoal",lRow+"_"+lCol);

}

mbs_filter.addEventListener("change",()=>{
    let filteraktif = document.querySelector(".filteraktif");
    if(mbs_filter.checked){
        filteraktif.classList.remove("w3-hide");
    }else{
        filteraktif.classList.add("w3-hide");
    }
});

mbs_lihatpropertysoal.addEventListener("change",()=>{
    let mbs_porpertysoal = document.querySelector(".mbs_porpertysoal");
    if(mbs_lihatpropertysoal.checked){
        mbs_porpertysoal.classList.remove("w3-hide")
    }else{
        mbs_porpertysoal.classList.add("w3-hide")

    }
});

mbs_ingindiedit.addEventListener("change",()=>{
    let tombol = document.querySelector(".btn_terapkansoal")
    let elisi = document.querySelectorAll("[data-dbmbs]");
    if(mbs_ingindiedit.checked){
        btn_terapkansoaledit.classList.remove("w3-hide");

        for(i = 0 ; i < elisi.length ; i++){
            if(elisi[i].getAttribute("data-dbmbs")=="tekskodemapel" || elisi[i].getAttribute("data-dbmbs")=="tekskd"  ){

            }else{
                elisi[i].setAttribute("contenteditable","true")
            }
        }
        btn_terapkansoaledit.onclick=function(){
            let mbs_ceklisilustrasi = document.getElementById("mbs_ceklisilustrasi")
            let dbilustrasi = document.querySelector("[data-dbmbs=ilustrasi]")
            let dbpertanyaan = document.querySelector("[data-dbmbs=pertanyaan]")
            let html = "";
            let db = databasesoal.filter(s => s.idbaris == iRow_dbsoal)[0];
            if(dbilustrasi.innerHTML !== "" || dbilustrasi.innerHTML !==`<div><br></div>`){
                if(mbs_ceklisilustrasi.checked){
                    html +=`${dbilustrasi.innerHTML}<br><br>`;
                }
            }
            
            html += dbpertanyaan.innerHTML;
            if(db.bentuksoal == "Pilihan Ganda"){
                if(db.tampilanpg == "BIASA"){ //-1.4461538461999965em
                    html +=`<ol data_bentukopsidesain="biasa_${iRow_dbsoal}_${db.opsiD==""?3:4}" style="list-style-type:upper-alpha;margin:0 0 0 -1.4461538461999965em">
                    <li>${db.opsiA}</li>
                    <li>${db.opsiB}</li>
                    <li>${db.opsiC}</li>`
                    if(db.opsiD !==""){
                        html +=`<li>${db.opsiD}</li>`
                        
                    }
                    html +=`</ol>`
                }else{
                    let arropsiA = JSON.parse(db.opsiA);
                            let arropsiB = JSON.parse(db.opsiB);
                            let arropsiC = JSON.parse(db.opsiC);
                            let arropsiD = [];
                            let arrHead = JSON.parse(db.headerpg);
                            let jumlahPG = 3;
                            
                            if(db.opsiD !== ""){
                                arropsiD = JSON.parse(db.opsiD);
                                jumlahPG = 4
                            }
                            html += `<table data_bentukopsidesain="tabel_${iRow_dbsoal}_${db.opsiD==''?3:4}_${arrHead.length}" style="border-collapse:collapse;border:.5pt solid #000;width:100%;font-family:Times New Roman, Times, serif;">`;
                            html +=`<thead><tr style="border:.5pt solid #000"><th style="border:.5pt solid #000;background-color:#f1f1f1;width:30px"></th>`;
                            for(a = 0 ; a < arrHead.length ; a++){
                                html +=`<th style="border:.5pt solid #000;text-align:center;background-color:#f1f1f1">${arrHead[a]}</th>`
                            }
                            html +=`</tr><tbody>`;
                            //tabel opsi A
                            html +=`<tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">A.</td>`;
                            for(c = 0 ; c <arrHead.length ; c++){
                                html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiA[c]}</td>`
                                
                            }
                            //tabel opsi B
                            html +=`</tr><tr style="border:.5pt solid #000;vertical-align:top;"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">B.</td>`;
                            for(c = 0 ; c < arrHead.length ; c++){
                                html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiB[c]}</td>`;
                            }
                            //tabel opsi C
                            html +=`</tr><tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">C.</td>`;
                            for(c = 0 ; c <arrHead.length ; c++){
                                html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiC[c]}</td>`
                                
                            }
                            //tabel opsi D
                            if(db.opsiD !== ""){
                                html +=`</tr><tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">D.</td>`;
                                for(c = 0 ; c < arrHead.length ; c++){
                                    html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiD[c]}</td>`;
                                }
                                html +=`</tr>`
                            }else{
                                html +=`</tr>`
                            }
        
                            html +=`</tbody></table>`
                    
                }
            }
            
            elemenedit.innerHTML = html;
            
            // jika edit nanti tolong dikirim ke server, data aslinya tidak akan hilang. Editan akan 
            kirimmodifikasidarimodalbanksoal(iRow_dbsoal,"data-dbmbs");
            document.getElementById('modalbanksoal').style.display='none';
            // setattributindesainnaskah(elemenedit)
        }
    }else{
        for(i = 0 ; i < elisi.length ; i++){
        elisi[i].removeAttribute("contenteditable");
        }
        btn_terapkansoaledit.classList.add("w3-hide");
        btn_terapkansoaledit.onclick=null;
    }

    if(iRow_dbsoal == ""){
        if(tombol.className.indexOf("w3-hide")==-1){
            tombol.classList.add("w3-hide");

        }
        // btn_terapkansoaledit.classList.add("w3-hide");
       
    }else{
        if(tombol.className.indexOf("w3-hide")>-1){
            tombol.classList.remove("w3-hide");
        }
        //btn_terapkansoaledit.classList.remove("w3-hide");
        
    }
});
function setattributindesainnaskah(elemen){
    elemen.setAttribute("data-idbarissoal",iRow_dbsoalkontenmateri)
}
const lihatkisikisidesain = () => {
    let judulnaskah = document.querySelector("#naskahsoal_identitas");
    let t_mapel = document.getElementById("naskahsoal_mapelapatema").options[document.getElementById("naskahsoal_mapelapatema").options.selectedIndex].text;
    let html;
    let tabel = document.querySelector(".tempatnaskahsoal_soal");
    let lRow = tabel.rows;
    let arrayData = []
    for(i=0 ; i < lRow.length ; i++){
        let lCol = lRow[i].cells;
        if(lCol.length !== 2){
            let fCol = lCol[2];
            let Col_idbarissoal = fCol.getAttribute("data-idbarissoal");
            let sumberdata = databasesoal.filter(s => s.idbaris == Col_idbarissoal)[0];
            let nosoal = lCol[1].innerHTML.replace(".","");
            let obj = Object.assign({},sumberdata);
            obj.nosoal = nosoal;
            arrayData.push(obj);
        }
    }
    
    let koleksimapel = arrayData.map(s=>s.tekskodemapel).filter((x, i, a) => a.indexOf(x) == i).join(", ");
    let totalsoal = arrayData.length;
    let totalsoalPG = arrayData.filter(s=> s.bentuksoal == "Pilihan Ganda").length;
    let totalsoalIsian = arrayData.filter(s=> s.bentuksoal == "Isian").length;
    ///
    let waktuawal = document.getElementById("naskahsoal_titinmangsa").value;
    let waktuakhir = document.getElementById("naskahsoal_titinmangsaakhir").value;
    let tekswaktu = "... Menit"
    if(waktuawal == "" || waktuakhir == ""){
    }
    
        let dtAwal = new Date(waktuawal);
        let dtAkhir = new Date(waktuakhir);
        let menit = (dtAkhir.getTime() - dtAwal.getTime())/(60000);
        tekswaktu = menit+" Menit";
        
    ////...
    let num = 1;
    if(t_mapel.indexOf("Tema")>-1){
        html = `<div style="text-align:center;padding:5px"><b>KISI-KISI PENULISAN SOAL ${judulnaskah.value.toUpperCase()}</b>
        <p></p><p></p><table style="text-align:left;font-family:Times New Roman, Times, serif;font-size:11pt">
            <tr><td>Jenjang</td><td style="width:5px">:</td><td>Sekolah Dasar</td></tr>
            <tr><td>Kurikulum</td><td style="width:5px">:</td><td>Kurikulum 2013 (Perka Balitbang)</td></tr>
            <tr><td>Mata Pelajaran</td><td style="width:5px">:</td><td>${t_mapel.indexOf("US")>-1?t_mapel.replace("US :",""):t_mapel} (${koleksimapel})</td></tr>
            <tr><td>Alokasi Waktu</td><td style="width:5px">:</td><td>${tekswaktu}</td></tr>
            <tr><td style="vertical-align:top">Jumlah Soal</td><td style="width:5px;vertical-align:top">:</td><td style="vertical-align:top">${totalsoal} Soal<br>Pilihan Ganda = ${totalsoalPG} Soal<br>Isian = ${totalsoalIsian} Soal</td></tr>
            <tr><td>Penyusun</td><td style="width:5px">:</td><td>${namauser}</td></tr>
        </table>
        </div><br><br>
        <table style="border-collapse:collapse;font-family:Times New Roman, Times, serif;font-size:11pt;border:.5pt solid #000">
        <thead><tr style="border:.5pt solid #000;background-color:#f1f1f1;color:#000">
        <th style="border:.5pt solid #000;padding:5px">No.</th>
        <th style="border:.5pt solid #000;padding:5px">Mata Pelajaran</th>
        <th style="border:.5pt solid #000;padding:5px">Kompetensi Dasar</th>
        <th style="border:.5pt solid #000;padding:5px">Lingkup Materi</th>
        <th style="border:.5pt solid #000;padding:5px">Materi Pokok</th>
        <th style="border:.5pt solid #000;padding:5px">Level Kognitif</th>
        <th style="border:.5pt solid #000;padding:5px">Indikator Soal</th>
        <th style="border:.5pt solid #000;padding:5px">Bentuk Soal</th>
        <th style="border:.5pt solid #000;padding:5px">Nomor Soal</th>
        </tr></thead><tbody>
        `;
        for(j = 0 ; j <arrayData.length ; j++){
            html +=`<tr style="border:.5pt solid #000;">
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${arrayData[j].nosoal}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${arrayData[j].tekskodemapel}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${arrayData[j].tekskd}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${arrayData[j].ruanglingkup}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${arrayData[j].materi}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${arrayData[j].levelkognitif}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${arrayData[j].indikatorsoal}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${arrayData[j].bentuksoal}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${arrayData[j].nosoal}</td>
            </tr>`
        }
        html +=`</tbody></table><br><br>`;

    }else{
        html = `<div style="text-align:center;padding:5px"><b>KISI-KISI PENULISAN SOAL ${judulnaskah.value.toUpperCase()}</b>
        <p></p><p></p><table style="text-align:left;font-family:Times New Roman, Times, serif;font-size:11pt">
            <tr><td>Jenjang</td><td style="width:5px">:</td><td>Sekolah Dasar</td></tr>
            <tr><td>Kurikulum</td><td style="width:5px">:</td><td>Kurikulum 2013 (Perka Balitbang)</td></tr>
            <tr><td>Mata Pelajaran</td><td style="width:5px">:</td><td>${t_mapel.indexOf("US")>-1?t_mapel.replace("US :",""):t_mapel}</td></tr>
            <tr><td>Alokasi Waktu</td><td style="width:5px">:</td><td>${tekswaktu}</td></tr>
            <tr><td style="vertical-align:top">Jumlah Soal</td><td style="width:5px;vertical-align:top">:</td><td style="vertical-align:top">${totalsoal} Soal<br>Pilihan Ganda = ${totalsoalPG} Soal<br>Isian = ${totalsoalIsian} Soal</td></tr>
            <tr><td>Penyusun</td><td style="width:5px">:</td><td>${namauser}</td></tr>
        </table>
        </div><br><br><table style="border-collapse:collapse;font-family:Times New Roman, Times, serif;font-size:11pt;border:.5pt solid #000">
        <thead><tr style="border:.5pt solid #000;background-color:#f1f1f1;color:#000">
        <th style="border:.5pt solid #000;padding:5px">No.</th>
        <th style="border:.5pt solid #000;padding:5px">Kompetensi Dasar</th>
        <th style="border:.5pt solid #000;padding:5px">Lingkup Materi</th>
        <th style="border:.5pt solid #000;padding:5px">Materi Pokok</th>
        <th style="border:.5pt solid #000;padding:5px">Level Kognitif</th>
        <th style="border:.5pt solid #000;padding:5px">Indikator Soal</th>
        <th style="border:.5pt solid #000;padding:5px">Bentuk Soal</th>
        <th style="border:.5pt solid #000;padding:5px">Nomor Soal</th>
        </tr></thead><tbody>
        `;
        for(j = 0 ; j <arrayData.length ; j++){
            html +=`<tr style="border:.5pt solid #000;">
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${arrayData[j].nosoal}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${arrayData[j].tekskd}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${arrayData[j].ruanglingkup}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${arrayData[j].materi}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${arrayData[j].levelkognitif}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${arrayData[j].indikatorsoal}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${arrayData[j].bentuksoal}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${arrayData[j].nosoal}</td>
            </tr>`
        }
        html +=`</tbody></table><br><br>`;

    }
    html +=`<br><br><table style="text-align:center;font-family::Times New Roman, Times, serif;font-size:11pt;width:100%">
    <tr>
    <td style="padding:5px;text-align:center">Mengetahui, <br>Kepala ${idNamaSekolah}<br><br><br><br><b><u>${idNamaKepsek}</u></b><br>NIP. ${idNipKepsek}</td>
    <td style="padding:5px;text-align:center">Depok, ${tanggalfull(new Date())}<br>${idJenisGuru} ${idgurumapelmapel}<br><br><br><br><b><u>${namauser}</u></b><br>NIP. ${idNipGuruKelas}</td>
    <td style="padding:5px;text-align:center"></td>
    </tr>
    </table>`
    let elemenisi = document.querySelector(".areaprint_soalkisidandesainsoallainnya");
    elemenisi.innerHTML = html;
    let modalnya = document.getElementById("modal_soalkisidandesainsoallainnya");
    let printkan = document.querySelector(".modaldiprintsoal");
    let wordkan = document.querySelector(".modaldieksporword");
    modalnya.style.display="block";
    printkan.onclick = function(){
        printadm("areaprint_soalkisidandesainsoallainnya",false)
    }
    wordkan.onclick = function(){
        print2WordGlobal("areaprint_soalkisidandesainsoallainnya",judulnaskah.value,"kisikisijawaban",false)

    }
}

const lihatkuncijawabandesainini= ()=>{
    let jj = document.querySelector(".areajudul_desainnaskah")
    let tabel = document.querySelector(".tempatnaskahsoal_soal");
    let judulnaskah = document.querySelector("#naskahsoal_identitas");
    let lRow = tabel.rows;
    let arrayData = []
    for(i=0 ; i < lRow.length ; i++){
        let lCol = lRow[i].cells;
        if(lCol.length !== 2){
            let fCol = lCol[2];
            let Col_idbarissoal = fCol.getAttribute("data-idbarissoal");
            let sumberdata = databasesoal.filter(s => s.idbaris == Col_idbarissoal)[0];
            let nosoal = lCol[1].innerHTML.replace(".","");
            let obj = Object.assign({},sumberdata);
            obj.nosoal = nosoal;
            arrayData.push(obj);
        }
    }
    let html =  `<h3 style="text-align:center">KUNCI JAWABAN DAN PENSKORAN</h3>
    <h4 style="text-align:center">${judulnaskah.value.toUpperCase()}</h4><br>`;
    html +=`<table style="border-collapse:collapse;border:.5pt solid #000;width:100%;font-size:10pt"><thead>
        <tr style="background-color:#f1f1f1;color:#000"><th style="border:.5pt solid #000;padding:5px">No.<br>Soal</th><th style="border:.5pt solid #000;padding:5px">Kunci<br>Jawaban</th><th style="border:.5pt solid #000;padding:5px">Pembahasan/Penskoran</th></tr>
    </thead>`;
    for(i = 0 ; i < arrayData.length ; i++){
        html +=`<tr><td style="border:.5pt solid #000;padding:5px;vertical-align:top">${arrayData[i].nosoal}</td><td style="border:.5pt solid #000;padding:5px;vertical-align:top">${arrayData[i].kuncijawaban}</td><td style="border:.5pt solid #000;padding:5px;vertical-align:top">${arrayData[i].penskoran}</td></tr>`;
    }
    html +=`</table>`;
    let elemenisi = document.querySelector(".areaprint_soalkisidandesainsoallainnya");
    elemenisi.innerHTML = html;
    let modalnya = document.getElementById("modal_soalkisidandesainsoallainnya");
    modalnya.style.display="block";
    let printkan = document.querySelector(".modaldiprintsoal");
    let wordkan = document.querySelector(".modaldieksporword");
    printkan.onclick = function(){
        printadm("areaprint_soalkisidandesainsoallainnya",true)
    }
    wordkan.onclick = function(){
        print2WordGlobal("areaprint_soalkisidandesainsoallainnya",judulnaskah.value,"kisikisijawaban2",false)

    }

}

const lihatkrtusoalall = () =>{
    let html =  "";
    let tabel = document.querySelector(".tempatnaskahsoal_soal");
    let judulnaskah = document.querySelector("#naskahsoal_identitas");
    let lRow = tabel.rows;
    let arrayData = [];
    for(i=0 ; i < lRow.length ; i++){
        let lCol = lRow[i].cells;
        if(lCol.length !== 2){
            let fCol = lCol[2];
            let Col_idbarissoal = fCol.getAttribute("data-idbarissoal");
            let sumberdata = databasesoal.filter(s => s.idbaris == Col_idbarissoal)[0];
            let nosoal = lCol[1].innerHTML.replace(".","");
            let obj = Object.assign({},sumberdata);
            obj.nosoal = nosoal;
            arrayData.push(obj);
        }
    }
    for(j = 0 ; j < arrayData.length ; j++){
        html +=`<table style="border-collapse:collapse;width:100%;max-width:1000px;border:.5pt solid #000;font-size:12pt !important"><tr><td style="width:8.33%"></td><td style="width:8.33%"></td><td style="width:8.33%"></td><td style="width:8.33%"></td><td style="width:8.33%"></td><td style="width:8.33%"></td><td style="width:8.33%"></td><td style="width:8.33%"></td><td style="width:8.33%"></td><td style="width:8.33%"></td><td style="width:8.33%"></td><td style="width:8.33%"></td></tr><tr style="color:#000!important;background-color:rgb(221, 255, 255)!important;"><td style="text-align:center;vertical-align:middle;padding-top:16px!important;padding-bottom:16px!important;border-right:1px solid rgb(221, 255, 255);border-bottom:.5pt solid #000"><img src="/img/sdnratujaya1-transparent.png" style="width: 90px;"></td><td colspan="10" style="text-align:center;border-bottom:.5pt solid #000"><div style="font-size:24px">${idNamaSekolah.toUpperCase()}</div><div style="font-weight: bold;font-size:36px !important">Kartu Soal</div><div style="font-size:18px" >Tahun Pelajaran ${idTeksTapel}</div></td><td style="padding:5px;border-left:1px solid rgb(221, 255, 255);border-bottom:.5pt solid #000"><div style="border:.5pt solid #000;text-align:center;background-color:#fff">Paket</div><div style="border:.5pt solid #000;text-align:center;font-size:18px;background-color:#fff"> </div></td></tr><tr><td colspan="2" style="padding:5px;vertical-algin:top">Jenis Sekolah</td><td colspan="5" style="padding:5px;vertical-algin:top">: Sekolah Dasar</td><td colspan="2" style="vertical-algin:top">Kurikulum</td><td colspan="3" style="padding:5px;vertical-algin:top">: Kurikulum 2013</td></tr><tr><td colspan="2" style="padding:5px;vertical-algin:top">Kelas</td><td colspan="5" style="padding:5px;vertical-algin:top">: ${arrayData[j].jenjang}</td><td colspan="2" style="vertical-algin:top">Bentuk Soal</td><td colspan="3" style="padding:5px;vertical-algin:top">: ${arrayData[j].bentuksoal}</td></tr><tr><td colspan="2" style="padding:5px;vertical-algin:top">Mata Pelajaran</td><td colspan="5" style="padding:5px;vertical-algin:top">: ${arrayData[j].tekskodemapel}</td><td colspan="2" style="vertical-algin:top">Penyusun</td><td colspan="3" style="padding:5px;vertical-algin:top">: ${arrayData[j].oleh}</td></tr><tr>`;
        html +=`<td colspan="3" rowspan="2" style="border-right:.5pt solid #000;border-top:.5pt solid #000;vertical-align:top"><table style="border-collapse:collapse;width:100%;"><tr><td style="border-bottom:.5pt solid #000"><b>Ruang Lingkup Materi:</b><br>${arrayData[j].ruanglingkup}</td></tr><tr><td style="border-bottom:.5pt solid #000"><b>Kompetensi Dasar:</b><br>${arrayData[j].tekskd} </td></tr><tr><td style="border-bottom:.5pt solid #000"><b>Level Kognitif:</b><br>${arrayData[j].levelkognitif}</td></tr><tr><td style="border-bottom:.5pt solid #000"><b>Materi:</b><br>${arrayData[j].materi}</td></tr><tr><td style="border-bottom:.5pt solid #000"><b>Indikator Soal:</b><br>${arrayData[j].indikatorsoal}</td></tr><tr><td><b>Buku Sumber (Refrensi):</b><br>${arrayData[j].refrensi}</td></tr></table></td><td colspan="9" style="border-top:.5pt solid #000;vertical-align:top;"><table style="border-collapse:collapse;width:100%;"><tr style="background-color:rgb(241,241,241)"><td style="border-bottom:.5pt solid #000;padding:5px;box-sizing:border-box"><div style="border:.5pt solid #000;text-align:center;font-size:12px;line-height:1;background-color:#fff;"> Nomor Soal </div> <div style="border:.5pt solid #000;text-align:center;background-color:#fff;">${arrayData[j].nosoal}</div></td><td style="width:99%;border-bottom:.5pt solid #000;text-align:center;vertical-align:center">RUMUSAN SOAL</td></tr><tr><td style="padding:5px; text-align:justify" colspan="2"><div>${arrayData[j].ilustrasi}</div><div>${arrayData[j].pertanyaan}</div>`;
                if(arrayData[j].bentuksoal == "Pilihan Ganda"){
                    if(arrayData[j].tampilanpg == "BIASA"){
                        html +=`<ol style="list-style-type:upper-alpha;margin:0 0 0 -1em"><li>${arrayData[j].opsiA}</li><li>${arrayData[j].opsiB}</li><li>${arrayData[j].opsiC}</li>`;
                        if(arrayData[j].opsiD !==""){
                                html+=`<li>${arrayData[j].opsiC}</li>`
                        }    
                        html +=`</ol>`
                    }else{
                        let db = arrayData[j];
                        let arropsiA = JSON.parse(db.opsiA);
                        let arropsiB = JSON.parse(db.opsiB);
                        let arropsiC = JSON.parse(db.opsiC);
                        let arropsiD = [];
                        let arrHead = JSON.parse(db.headerpg);
                        let jumlahPG = 3;
                        
                        if(db.opsiD !== ""){
                            arropsiD = JSON.parse(db.opsiD);
                            jumlahPG = 4
                        }
                        html += `<table style="border-collapse:collapse;border:.5pt solid #000;width:100%;font-family:Times New Roman, Times, serif;">`;
                        html +=`<thead><tr style="border:.5pt solid #000"><th style="border:.5pt solid #000;background-color:#f1f1f1;width:30px"></th>`;
                        for(a = 0 ; a < arrHead.length ; a++){
                            html +=`<th style="border:.5pt solid #000;text-align:center;background-color:#f1f1f1">${arrHead[a]}</th>`
                        }
                        html +=`</tr><tbody>`;
                        html +=`<tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">A.</td>`;
                        for(c = 0 ; c <arrHead.length ; c++){
                            html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiA[c]}</td>`
                        }
                        html +=`</tr><tr style="border:.5pt solid #000;vertical-align:top;"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">B.</td>`;
                        for(c = 0 ; c < arrHead.length ; c++){
                            html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiB[c]}</td>`;
                        }
                        html +=`</tr><tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">C.</td>`;
                        for(c = 0 ; c <arrHead.length ; c++){
                            html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiC[c]}</td>`
                        }
                        if(db.opsiD !== ""){
                            html +=`</tr><tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">D.</td>`;
                            for(c = 0 ; c < arrHead.length ; c++){
                                html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiD[c]}</td>`;
                            }
                            html +=`</tr>`
                        }else{
                            html +=`</tr>`
                        }
                    html +=`</tbody></table>`
                    }
                }
                html +=`</td></tr></table></td></tr><tr><td colspan="9" style="vertical-align:top;"><table style="border-collapse:collapse;width:100%;font-size:12pt!important"><tr style="background-color:rgb(241,241,241)"><td style="border-bottom:.5pt solid #000;border-top:.5pt solid #000;padding:5px;box-sizing:border-box">`;
                if(arrayData[j].bentuksoal == "Pilihan Ganda"){
                    html +=`<div style="border:.5pt solid #000;text-align:center;background-color:#fff;font-size:12px;line-height:1;">Kunci Jawaban</div><div style="border:.5pt solid #000;text-align:center;background-color:#fff;">${arrayData[j].kuncijawaban}</div>`;
                }
                html +=`</td><td style="width:99%;border-bottom:.5pt solid #000;border-top:.5pt solid #000;text-align:center;vertical-align:center">PEMBAHASAN KUNCI JAWABAN DAN PENSKORAN</td></tr><tr><td style="padding:5px; text-align:justify" colspan="2">${arrayData[j].penskoran}</td></tr></table></td></tr></table><p></p><div style="break-after:page"></div>`;
    }

    let elemenisi = document.querySelector(".areaprint_soalkisidandesainsoallainnya");
    elemenisi.innerHTML = html;
    let modalnya = document.getElementById("modal_soalkisidandesainsoallainnya");
    modalnya.style.display="block";
    let printkan = document.querySelector(".modaldiprintsoal");
    let wordkan = document.querySelector(".modaldieksporword");
    printkan.onclick = function(){
        printadm("areaprint_soalkisidandesainsoallainnya",false)
    }
    wordkan.onclick = function(){
        print2WordGlobal("areaprint_soalkisidandesainsoallainnya",judulnaskah.value,"kisikisijawaban",false);
    }
}

const simpannaskahdesain = () =>{
    loadingtopbarin("loadingtopbar");
    let cekin = document.querySelectorAll("[data-idbarissoal]").length;
    if(cekin == 0){
        alert("Maaf, Anda belum membuat naskah soal apapun di sini!");
        return;
    }
    let sKop = document.querySelector(".kopnaskahsoal");
    let sJudul = document.querySelector(".areajudul_desainnaskah");
    let sTabel = document.querySelector(".tempatnaskahsoal_soal");
    let kop = sKop.outerHTML.replace(/\r|\n|\r\n|\t|\s\s/gm,"");
    let judul= sJudul.outerHTML.replace(/\r|\n|\r\n|\t|\s\s/gm,"");
    let judulnaskah = document.querySelector("#naskahsoal_identitas");
    let mapel = document.getElementById("naskahsoal_mapelapatema").options[document.getElementById("naskahsoal_mapelapatema").options.selectedIndex].text;
    let htmltabel =`<table style="width:100%;border-collapse:collapse;border-spacing:0" id="tabelkontendesainnaskah_dariserver" >`;
    // array tanpa idbaris
    
    let objekarraykirim = {};
    // objekarraykirim.idbaris = "";
    objekarraykirim.idguru = idguru;
    objekarraykirim.namaguru = namauser;
    objekarraykirim.jenjang = idJenjang;
    objekarraykirim.rombel = idNamaKelas;
    objekarraykirim.juduldesain = judulnaskah.value;
    objekarraykirim.mapel = mapel;
    objekarraykirim.tanggal = document.querySelector(".naskahsoal_haritanggal").innerHTML;
    objekarraykirim.waktu = document.querySelector(".naskahsoal_Waktu").innerHTML;

    for(i = 0 ; i <sTabel.rows.length ; i++){
        let lRow = sTabel.rows[i].cells;
        if(lRow.length == 3){
            let getidnaskah = lRow[2].getAttribute("data-idbarissoal");
            let kkey = "no_" + lRow[1].innerHTML.match(/(\d+)/)[0];
            objekarraykirim[kkey] = getidnaskah;
            htmltabel +=`<tr><td style="vertical-align:top">${lRow[1].innerHTML}</td><td data-simpanannaskahguru="${getidnaskah}" style="vertical-align:top">${lRow[2].innerHTML}</td></tr>`;
        }else{
            htmltabel +=`<tr><td colspan="2" class="petunjuktersimpandesainnaskahke_${i}"  style="vertical-align:top">${lRow[1].innerHTML}</td></tr>`;
        }
    }
    htmltabel +=`</table>`;
    
    let html = kop + judul +"<br>"+htmltabel;
    let key = JSON.stringify(keydatabasesoalsimpananuser);
    let ob = Object.assign(databasesoalsimpananuserkosong[0],objekarraykirim);
    
    let v = Object.values(ob);
    v.shift();
    let keytabel = JSON.stringify(v);

    let datakirim = new FormData();
    datakirim.append("idmateri",html);
    datakirim.append("tab","simpandesainsoal");
    datakirim.append("key",key);
    datakirim.append("jenjang",idJenjang);
    datakirim.append("tabel",keytabel);
    fetch(url_kaldikaja+"?action=uploadfilenaskah",{
        method:"post",
        body:datakirim
    }).then(m => m.json())
    .then(r => {
        alert("Data berhasil tersimpan!");
        document.querySelector(".areadesain_naskahsoal").classList.add("w3-hide");
        document.querySelector(".areadesain_naskahsoaltombol").classList.add("w3-hide");
        document.getElementById("naskahsoal_identitas").value ="";
        document.getElementById("naskahsoal_mapelapatema").selectedIndex ="0";
        document.querySelector(".tempatnaskahsoal_soal").getElementsByTagName("tbody")[0].innerHTML = `<tr onmouseover="td_tomboleditsoal(this,'show')" onmouseout="td_tomboleditsoal(this,'hide')"><td style="width: 66px;"><button onclick="MoveUp.call(this)" onmouseover="informasi_naskahsoal('naikkan')" onmouseout="removeinformasi()" class="warnaeka w3-button w3-round-large" title="Naikkan">&#8679;</button><button onclick="MoveDown.call(this)" onmouseover="informasi_naskahsoal('turunkan')" onmouseout="removeinformasi()"  class="warnaeka w3-button  w3-round-large " title="Turunkan">&#8681;</button><button class="warnaeka w3-button w3-round-large ns_tambahpetunjuk  w3-tiny" onmouseover="informasi_naskahsoal('tambahpetunjuk')" onmouseout="removeinformasi()"  title="Tambahkan keterangan petunjuk/diawal" onclick="ns_tambahkanpetunjuk(this)"><i class="fa fa-plus"></i></button><button class="warnaeka w3-button w3-round-large w3-tiny ns_hapussoalini" onmouseover="informasi_naskahsoal('hapus')" onmouseout="removeinformasi()"  onclick="hapussoalini(this)" title="Hapus Soal ini"  ><i class="fa fa-trash"></i></button></td><td style="width:15px">1.</td><td style="width:99.99%;cursor:pointer" title="Klik 2 kali untuk mengedit" ondblclick="editsoalini(this)">Dobel Klik untuk menentukan soal di Area ini</td></tr>`;
        clearInterval(stoploadingtopbar);
        let divlod = document.querySelector(".loadingtopbar");
        divlod.style.width = "100%";
        setTimeout(() => {
            divlod.style.width = "1px"
            divlod.className += " w3-hide";

        }, 3000);

        keydatabasesoalsimpananuser = Object.keys(r.data[0]);
       if(r.result>1){
            databasesoalsimpananuser = r.data;
       }
       let ob = {}
       for(i=0 ; i < keydatabasesoalsimpananuser.length; i++){
        ob[keydatabasesoalsimpananuser[i]]="";
       }
       databasesoalsimpananuserkosong.push(ob);
       
        
    }).catch(er=>console.log(er));
}

const simpanannaskahsoal = () =>{
    let divl = document.querySelector(".spandbsoal");
    divl.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`
    let tab = "simpandesainsoal"
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
        divl.innerHTML = "&checkmark;"
        databasesoalsimpananuserkosong = [];
       keydatabasesoalsimpananuser = Object.keys(r.data[0]);
       if(r.result>1){
            databasesoalsimpananuser = r.data;
       }
       let ob = {}
       for(i=0 ; i < keydatabasesoalsimpananuser.length; i++){
        ob[keydatabasesoalsimpananuser[i]]="";
       }
       databasesoalsimpananuserkosong.push(ob);
    }).catch(er=>console.log(er));


}
const simpananratingsoal = () =>{
    let divl = document.querySelector(".spanratingsoal");
    divl.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`
    let tab = "ratingsoal"
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
        divl.innerHTML = `&checkmark;`;
        databaseratingsoalkosong = [];
        keydatabaseratingsoal = Object.keys(r.data[0]);
        if(r.result>1){
            databaseratingsoal = r.data;
        }
        let ob = {}
        for(i=0 ; i < keydatabaseratingsoal.length; i++){
            ob[keydatabaseratingsoal[i]]="";
        }
        databaseratingsoalkosong.push(ob);
    }).catch(er=>console.log(er));


}
const gabungdataserverkdnaskahsoal = async()=>{
    let ceklis = document.querySelectorAll("input[name=desainkhususkelas6_tag]");
    let k = idJenjang
    ceklis.forEach(el => el.checked?k=el.value:"");
   
    let datakkm = await kkmdikelastertentu(k);
    let datatag = alltagkdserver.filter(s => s.kelas == k);
   
    let newObjek = datatag.map((item,i)=>Object.assign({},item,datakkm[i]))
    //console.log(newObjek);
    return newObjek
}
const kkmdikelastertentu = async (jenjang) =>{
    let tas = "kelas" + jenjang;
    try {
        const m = await fetch(linkmateri + "&action=cekdkkm&tab=" + tas)
        const k = await m.json()
        let data = k.result
       
        return data
    } catch (er) {
        console.log(er)
        return [{ "datakosong": 0, "error": er }]
    }
}
const showdbsoal = document.querySelectorAll("input[name=showdbsoal]");
showdbsoal.forEach(el=>{
    el.addEventListener("change",()=>{
        if(el.checked){
            let db = databasesoalsimpananuser;
            let dbsendiri = db.filter(s => s.idguru == idguru);
            let v = el.value;
            let tabel = document.querySelector(".tabelpilihandbsoal");
            let tabelbody = tabel.getElementsByTagName("tbody")[0];
            let tabelhead = tabel.getElementsByTagName("thead")[0];
            let divinfo = document.querySelector(".infopilihandbsoal");
            let info="";
            let tbHead, tbBody;
            let gaadadata
            if(v == 1){
                let divpaginasi = document.querySelectorAll(".bungkuspaginasibanksoal");
                for(let p = 0 ; p < divpaginasi.length ; p++){
                    if(divpaginasi[p].className.indexOf("w3-hide")==-1){
                        divpaginasi[p].classList.add("w3-hide")
                    }
                }
                tbHead = `<tr class="w3-light-gray">
                <th>No.<br>Urut</th>
                <th>Judul Desain</th>
                <th>Mata Pelajaran</th>
                <th>Lihat Desain</th>
                <th>Properti Desain</th></tr>`;
                info +=`Tabel akan menyajikan data desain naskah soal yang pernah Anda buat di sini. Masing-masing data akan bisa dicetak langsung atau diunduh.`;
                if(dbsendiri.length == 0){
                    tbBody =`<tr><td colspan="5" class="w3-center">Anda belum pernah menyimpan Desain Naskah Soal</td></tr>`;
                }else{
                    tbBody = "";
                    for(i = 0 ; i < dbsendiri.length ; i++){
                        tbBody +=`<tr><td class="w3-center">${(i+1)}.</td>
                        <td>${dbsendiri[i].juduldesain}</td>
                        <td>${dbsendiri[i].mapel}</td>
                        <td class="w3-center">
                            <button class="w3-button w3-yellow w3-bottombar w3-border-black w3-round" onclick="lihatdesainnaskah('${dbsendiri[i].idbaris}')" title="Lihat Desain"><i class="fa fa-eye"></i></button>
                            </td>
                        <td class="w3-center">
                            <button class="w3-button w3-yellow w3-bottombar w3-border-black w3-round" onclick="lihatkuncidankisikisi('${dbsendiri[i].idbaris}','kisikisi')" title="Lihat Kisi-kisi dari desain naskah ini"><i class="fa fa-file-text"></i></button>
                            <button class="w3-button w3-yellow w3-bottombar w3-border-black w3-round" onclick="lihatkuncidankisikisi('${dbsendiri[i].idbaris}','kuncijawaban')" title="Lihat Kunci Jawaban dari desain naskah ini"><i class="fa fa-file-text-o"></i></button>
                        </td></tr>`;
                    }
                }
                tabelhead.innerHTML = tbHead;
                tabelbody.innerHTML = tbBody;
            }else if(v == 2){
                let divpaginasi = document.querySelectorAll(".bungkuspaginasibanksoal");
                for(let p = 0 ; p < divpaginasi.length ; p++){
                    if(divpaginasi[p].className.indexOf("w3-hide")==-1){
                        divpaginasi[p].classList.add("w3-hide")
                    }
                }
                info +=`Tabel akan menyajikan data desain naskah soal yang pernah dibuat untuk jenjang kelas Anda (Kelas ${idJenjang}). Masing-masing data akan bisa dicetak langsung atau diunduh.`;
                tbHead = `<tr class="w3-light-gray"><th>No.<br>Urut</th><th>Judul Desain</th><th>Mata Pelajaran</th><th>Lihat Desain</th><th>Properti Desain</th></tr>`;
                tbBody = "";
                let dbjenjang = db.filter(s=> s.jenjang == idJenjang);
                if(dbjenjang.length == 0){
                    tbBody =`<tr><td colspan="5" class="w3-center">Di kelas Anda, belum pernah ada yang menyimpan Desain Naskah Soal</td></tr>`;
                }else{
                    for(i = 0 ; i < dbjenjang.length ; i++){
                        tbBody +=`<tr><td class="w3-center">${(i+1)}.</td>
                        <td>${dbjenjang[i].juduldesain}</td>
                        <td>${dbjenjang[i].mapel}</td>
                        <td class="w3-center">
                        <button class="w3-button w3-yellow w3-bottombar w3-border-black w3-round" onclick="lihatdesainnaskah('${dbjenjang[i].idbaris}')" title="Lihat Desain"><i class="fa fa-eye"></i></button>
                        </td>
                        <td class="w3-center">
                            <button class="w3-button w3-yellow w3-bottombar w3-border-black w3-round" onclick="lihatkuncidankisikisi('${dbjenjang[i].idbaris}','kisikisi')" title="Lihat Kisi-kisi dari desain naskah ini"><i class="fa fa-file-text"></i></button>
                            <button class="w3-button w3-yellow w3-bottombar w3-border-black w3-round" onclick="lihatkuncidankisikisi('${dbjenjang[i].idbaris}','kuncijawaban')" title="Lihat Kunci Jawaban dari desain naskah ini"><i class="fa fa-file-text-o"></i></button>
                        </td></tr>`;
                    }
                }
                tabelhead.innerHTML = tbHead;
            tabelbody.innerHTML = tbBody;
            }else if(v == 3){
                
                info +=`Tabel akan menyajikan kumpulan soal-soal yang telah dibuat oleh Anda ataupun teman Anda. Di sini, Anda dapat mengetahui kualitas soal yang telah dibuat, mengetahui komentar dari user lain (Karena fitur ini bersifat publik, komentar bisa saja dari luar instansi Anda, bisa jadi pengawas atau stakeholder lainnya.). Anda pun dapat mengeditnya jika item soal tersebut buatan Anda sekaligus memberikan komentar atau menghapus item soal buatan Anda (Untuk menghapus, item soal mungkin saja pernah digunakan saat mendesain naskah soal sebelum Anda menghapusnya).`;
                info +=`<hr>Silakan Cari Kriteria Koleksi soal dengan isian di bawah ini:<br>
                <table class="w3-table garis"><tr><td>Kriteria</td><td>Kata Kunci Kriteria</td></tr>
                <tr><td><label for="kritkolsoal_kelas">Masukkan Jenjang Kelas</label></td>
                    <td><input type="number" min="0" max="6" id="kritkolsoal_kelas" onchange="carikriteriabanksoalkelas(this)" class="w3-border w3-padding" style="width:60px" value="0"><br><sub class="w3-tiny">Ket: Masukkan angka 0 untuk semua jenjang kelas</sub></td></tr>
                    <tr><td><label for="kritsoal_mapel">Pilih Mata Pelajaran:</td><td>
                        <select id="kritsoal_mapel" onchange="carikriteriabanksoal(this)" class="w3-select w3-border">
                            <option value="">Semua Mata Pelajaran</option>
                            <option value="PAI">Pendidikan Agama Islam dan Budi Pekerti</option>
                                <option value="PKRIS">Pendidikan Agama Kristen dan Budi Pekerti</option>
                                <option value="PKATO">Pendidikan Agama Katholik dan Budi Pekerti</option>
                                <option value="PKN">PKN</option>
                                <option value="BINDO">Bahasa Indonesia</option>
                                <option value="MTK">MTK</option>
                                <option value="IPA">IPA</option>
                                <option value="IPS">IPS</option>
                                <option value="SBDP">SBDP</option>
                                <option value="PJOK">PJOK</option>
                                <option value="BSUND">Bahasa Sunda</option>
                            </select>
                    </td></tr>
                    <tr><td>Cari soal yang berisi kata-kata berikut:</td><td><input type="text" id="kritsoal_katakunci" onchange="carikriteriabanksoalkelas(this)" class="w3-input w3-border"></td></tr>
                    </table><br><div class="w3-border" id="kritsoa_yangdicariuser"></div>`;
                tbHead =`<tr class="w3-light-gray">
                <th>No.<br>Urut</th>
                <th>Kelas</th>
                <th>Dibuat Oleh</th>
                <th>Mata Pelajaran</th>
                <th>Preview Soal</th>
                <th>Bentuk Soal</th>
                <th>Kualitas Soal (Rating)</th>
                <th>Aksi</th></tr>`;
                tbBody = ``;
                let dbb = databasesoal;
                // let rating="";// = fungsirating();
                // for(let i = 0 ; i < dbb.length ; i++){
                    
                //     rating = fungsirating(dbb[i].idbaris);
                //     tbBody +=`<tr><td class="w3-center">${i+1}</td><td class="w3-center">${dbb[i].jenjang}</td><td class="w3-center">${dbb[i].oleh}</td><td>${dbb[i].tekskodemapel}</td>`;
                //     if(dbb[i].ilustrasi == "" || dbb[i].ilustrasi == `<div><br></div>`){

                //         tbBody +=`<td class="w3-tiny"><div style="width:360px;overflow-x:auto">${dbb[i].pertanyaan}</div<</td>`;
                //     }else{

                //         tbBody +=`<td class="w3-tiny"><div style="width:360px;overflow-x:auto">${dbb[i].ilustrasi}</div></td>`;
                //     }
                    
                //     tbBody +=`<td>${dbb[i].bentuksoal}</td><td>${rating}</td><td><button class="w3-button w3-yellow w3-bottombar w3-border-black w3-round" onclick="modalbanksoaleditable('${dbb[i].idbaris}','lihat')" title="Lihat item soal"><i class="fa fa-eye"></i></button><button class="w3-button w3-blue w3-bottombar w3-border-black w3-round" onclick="modalbanksoaleditable('${dbb[i].idbaris}','modifikasi')" title="Modifikasi soal ini menjadi item soal baru di database. Item soal sebelumnya masih tetap ada."><i class="fa fa-edit"></i></button>`;
                //     if(dbb[i].idguru == idguru){
                //         tbBody +=`<button class="w3-button w3-green w3-bottombar w3-border-black w3-round" onclick="modalbanksoaleditable('${dbb[i].idbaris}','edit')"  title="Karena ini buatan Anda, Anda bisa mengeditnya"><i class="fa fa-gear"></i></button>
                //         <button class="w3-button w3-light-grey w3-bottombar w3-border-black w3-round" onclick="modalbanksoalhapus('${dbb[i].idbaris}','hapus')"  title="Karena ini buatan Anda, Anda bisa menghapusnya"><i class="fa fa-trash"></i></button>`;
                //     }
                //     tbBody +=`</td></tr>`;
                // }
            tabelhead.innerHTML = tbHead;
            tabelbody.innerHTML = tbBody;
            paginasipilihandbsoal_peritem(dbb,"");
            let divpaginasi = document.querySelectorAll(".bungkuspaginasibanksoal");
            for(let p = 0 ; p < divpaginasi.length ; p++){
                if(divpaginasi[p].className.indexOf("w3-hide")>-1){
                    divpaginasi[p].classList.remove("w3-hide")
                }
            }
            }else if(v == 4){
                let divpaginasi = document.querySelectorAll(".bungkuspaginasibanksoal");
                for(let p = 0 ; p < divpaginasi.length ; p++){
                    if(divpaginasi[p].className.indexOf("w3-hide")==-1){
                        divpaginasi[p].classList.add("w3-hide")
                    }
                }
                info +=`Tabel berikut menyajikan data mengenai naskah bank soal yang telah dihapus oleh pembuatnya. Mungkin saja Anda mendesain naskah soal yang diambil dari naskah berikut. Anda dapat mengembalikan naskah yang telah dihapus ini menjadi item soal yang menjadi milik Anda. Jika sudah anda kembalikan, maka item soal tersebut menjadi milik Anda dan Anda bisa mengedit keseluruhan properti soalnya.`;
                tbHead =`<tr><td colspan="7" style="text-align:center">Data Soal yang dihapus</td></tr><tr class="w3-light-gray">
                <th>No.<br>Urut</th>
                <th>Kelas</th>
                <th>Dibuat Oleh</th>
                <th>Mata Pelajaran</th>
                <th>Preview Soal</th>
                <th>Kualitas Soal (Rating)</th>
                <th>Aksi</th></tr>`;
                tbBody = ``;
                let dbb = databasesoalterhapus;
                for(i=0 ; i < dbb.length ; i++){
                    tbBody +=`<tr><td class="w3-center">${(i+1)}</td>
                    <td class="w3-center">${dbb[i].jenjang}</td>
                    <td class="w3-center">${dbb[i].oleh}</td>
                    <td>${dbb[i].tekskodemapel}</td>`
                    if(dbb[i].ilustrasi == "" || dbb[i].ilustrasi == `<div><br></div>`){

                        tbBody +=`<td class="w3-tiny"><div style="width:360px;overflow-x:auto">${dbb[i].pertanyaan}</div></td>`;
                    }else{

                        tbBody +=`<td class="w3-tiny"><div style="width:360px;overflow-x:auto">${dbb[i].ilustrasi}</div></td>`;
                    }
                    tbBody +=`<td></td><td><button class="w3-button w3-yellow w3-bottombar w3-border-black w3-round" onclick="modalbanksoaleditable('${dbb[i].idbaris}','lihatterhapus')" title="Lihat item soal"><i class="fa fa-eye"></i></button>                    <button class="w3-button w3-blue w3-bottombar w3-border-black w3-round" onclick="modalbanksoalhapus('${dbb[i].idbaris}','')" title="kembalikan soal ini menjadi item soal ini. Jika ini bukan buatan Anda, maka otomatis soal ini akan menjadi buatan Anda."><i class="fa fa-undo"></i></button>`;
                    
                    tbBody +=`</td></tr>`;
                }
            tabelhead.innerHTML = tbHead;
            tabelbody.innerHTML = tbBody;
            }
            divinfo.innerHTML = info;
            
        };
    });
});
const lihatdesainnaskah=(idbrs)=>{
    let html = `<img src="/img/barloading.gif"> Loading ...`;
    let idm= databasesoalsimpananuser.filter(s=> s.idbaris == idbrs)[0].html_soal;
    
    let judulnaskah = "Database Naskah Soal idtime_" + new Date().getTime();
    let modalnya = document.getElementById("modal_soalkisidandesainsoallainnya");
    modalnya.style.display="block";
    let printkan = document.querySelector(".modaldiprintsoal");
    let wordkan = document.querySelector(".modaldieksporword");
    printkan.onclick = function(){alert('data belum siap')};
    wordkan.onclick = function(){alert('data belum siap')}

    let elemenisi = document.querySelector(".areaprint_soalkisidandesainsoallainnya");
    elemenisi.innerHTML = html;
    fetch(linkmateri+"&action=previewriwayat&idmateri="+idm).then(m=> m.json())
    .then(r =>{
        let teks = r.replace(/-1.4461538461999965em/gm,"-1.1461538461999965em");
        let tekss = teks.replace(/vertical-align:top/gm,"vertical-align:top;padding-left:5px");
        elemenisi.innerHTML = tekss;
        printkan.onclick = function(){
            printadm("areaprint_soalkisidandesainsoallainnya")
        }
        wordkan.onclick = function(){
            print2WordGlobal("areaprint_soalkisidandesainsoallainnya",judulnaskah,"kisikisijawaban2",false)
            
        }
    }).catch(er=>{
        console.log(er);
        elemenisi.innerHTML = er;
    })
    

    //$.getJSON(linkmateri + "&idmateri=" + idm + "&action=previewriwayat", function (json) {
}

const lihatkuncidankisikisi = (idbrs,kondisi="kisikisi") =>{
    let html = `<img src="/img/barloading.gif"> Sedang Loading, mohon tunggu ...`;

    let elemenisi = document.querySelector(".areaprint_soalkisidandesainsoallainnya");
    let modalnya = document.getElementById("modal_soalkisidandesainsoallainnya");
    let printkan = document.querySelector(".modaldiprintsoal");
    let wordkan = document.querySelector(".modaldieksporword");
    modalnya.style.display="block";
    let objeksoal = databasesoalsimpananuser.filter(s=> s.idbaris == idbrs)[0];
    let objeknosoal = Object.fromEntries(Object.entries(objeksoal).filter(([k,v])=> k.indexOf("no_")>-1 && v !== ""));
    let keyobjeknosoal = Object.keys(objeknosoal).map(m=> m.replace("no_",""));
    // objeknosoal = [no_1: "1",no_2: "10",....] => valuenya masih string!
    // jika naskah berbentuk tema;
    let totalsoal = Object.values(objeknosoal).length;//map(m=> databasesoal.filter(s=>s.idbaris == m)[0]).map(mm => mm.kodemapel).length;
    // let totalpg = Object.values(objeknosoal).map(m=> databasesoal.filter(s=>s.idbaris == m)[0]).filter(mm => mm.bentuksoal=="Pilihan Ganda").length;
    // let totalisian = Object.values(objeknosoal).map(m=> databasesoal.filter(s=>s.idbaris == m)[0]).filter(mm => mm.bentuksoal=="Isian").length;
    
    // console.log(objeksoal.mapel, objeksoal);
    // console.log(totalsoal);
    
    let objekdatasoal = Object.values(objeknosoal).map(m=> databasesoalall.filter(s=>s.idbaris == m)[0]);
    
    let datatotalpg = objekdatasoal.filter(s=> s.bentuksoal == "Pilihan Ganda");
    let totalpg = datatotalpg.length
    let datasoalisian = objekdatasoal.filter(s => s.bentuksoal == "Isian");
    let totalisian = datasoalisian.length;
    let stringmapeltema = "";
    let jjguru = dataapigurutamu.filter(s => s.id ==objeksoal.idguru)[0];
    let ketguru = jjguru.gurukelas_gmp +" "+jjguru.kelas;
    if(objeksoal.mapel.indexOf("Tema")==0){
        //jika awalannya Tema, maka: carikan mapelnya:
        stringmapeltema = Object.values(objeknosoal).map(m=> databasesoalall.filter(s=>s.idbaris == m)[0]).map(mm => mm.kodemapel).filter((x,i,a)=>a.indexOf(x)==i).join(", ");
    }
    let alok = objeksoal.waktu;
    let aw = alok.match(/\((.*)\)/);
    let aaw = "";
    if(aw !== null){
        aaw = aw[1];
    }

    if(kondisi == "kisikisi"){
        html = `<div style="text-align:center;padding:5px"><b>KISI-KISI PENULISAN SOAL ${objeksoal.juduldesain.toUpperCase()}</b>
        <p></p><p></p><table style="text-align:left;font-family:Times New Roman, Times, serif;font-size:11pt">
            <tbody><tr><td>Jenjang</td><td style="width:5px">:</td><td>Sekolah Dasar</td></tr>
            <tr><td>Kurikulum</td><td style="width:5px">:</td><td>Kurikulum 2013 (Perka Balitbang)</td></tr>
            <tr><td>Mata Pelajaran</td><td style="width:5px">:</td><td>${objeksoal.mapel.replace("US_","")} ${stringmapeltema==""?"":"("+stringmapeltema+")"}</td></tr>
            <tr><td>Alokasi Waktu</td><td style="width:5px">:</td><td>${aaw}</td></tr>
            <tr><td style="vertical-align:top">Jumlah Soal</td><td style="width:5px;vertical-align:top">:</td><td style="vertical-align:top">${totalsoal} Soal<br>Pilihan Ganda = ${totalpg} Soal<br>Isian = ${totalisian} Soal</td></tr>
            <tr><td>Penyusun</td><td style="width:5px">:</td><td>${objeksoal.namaguru}<br><span class="w3-tiny">(${jjguru.sekolah})</span></td></tr>
        </tbody></table>
        </div><br><br><table style="border-collapse:collapse;font-family:Times New Roman, Times, serif;font-size:11pt;border:.5pt solid #000">`;
        if(objeksoal.mapel.indexOf("Tema")==0){
            html +=`<thead><tr style="border:.5pt solid #000;background-color:#f1f1f1;color:#000">
            <th style="border:.5pt solid #000;padding:5px">No.</th>
            <th style="border:.5pt solid #000;padding:5px">Mata Pelajaran</th>
            <th style="border:.5pt solid #000;padding:5px">Kompetensi Dasar</th>
            <th style="border:.5pt solid #000;padding:5px">Lingkup Materi</th>
            <th style="border:.5pt solid #000;padding:5px">Materi Pokok</th>
            <th style="border:.5pt solid #000;padding:5px">Level Kognitif</th>
            <th style="border:.5pt solid #000;padding:5px">Indikator Soal</th>
            <th style="border:.5pt solid #000;padding:5px">Bentuk Soal</th>
            <th style="border:.5pt solid #000;padding:5px">Nomor Soal</th>
            </tr></thead><tbody>`;
            for(i=0; i<objekdatasoal.length ; i++){
                html +=`<tr>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px;text-align:center">${(i+1)}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${objekdatasoal[i].tekskodemapel}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${objekdatasoal[i].tekskd}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${objekdatasoal[i].ruanglingkup}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${objekdatasoal[i].materi}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px;text-align:center">${objekdatasoal[i].levelkognitif}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${objekdatasoal[i].indikatorsoal}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${objekdatasoal[i].bentuksoal}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px;text-align:center">${keyobjeknosoal[i]}</td>
                </tr>`;
            }
            html +=`</tbody></table><br><br><br><br><table style="text-align:center;font-family::Times New Roman, Times, serif;font-size:11pt;width:100%">
            <tbody><tr>
            <td style="padding:5px;text-align:center">Mengetahui, <br>Kepala ${idNamaSekolah}<br><br><br><br><b><u>${idNamaKepsek}</u></b><br>NIP. ${idNipKepsek}</td>
            <td style="padding:5px;text-align:center">Depok, ${objeksoal.tanggal.split(",")[1]}<br>${ketguru}<br><br><br><br><b><u>${objeksoal.namaguru}</u></b><br>NIP. ${jjguru.guru_nip}</td>
            <td style="padding:5px;text-align:center"></td>
            </tr>
            </tbody></table>`;

        }else{
            html +=`<thead><tr style="border:.5pt solid #000;background-color:#f1f1f1;color:#000">
            <th style="border:.5pt solid #000;padding:5px">No.</th>
            <th style="border:.5pt solid #000;padding:5px">Kompetensi Dasar</th>
            <th style="border:.5pt solid #000;padding:5px">Lingkup Materi</th>
            <th style="border:.5pt solid #000;padding:5px">Materi Pokok</th>
            <th style="border:.5pt solid #000;padding:5px">Level Kognitif</th>
            <th style="border:.5pt solid #000;padding:5px">Indikator Soal</th>
            <th style="border:.5pt solid #000;padding:5px">Bentuk Soal</th>
            <th style="border:.5pt solid #000;padding:5px">Nomor Soal</th>
            </tr></thead><tbody>`;
            for(i=0; i<objekdatasoal.length ; i++){
                html +=`<tr>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px;text-align:center">${(i+1)}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${objekdatasoal[i].tekskd}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px;text-align:center">${objekdatasoal[i].ruanglingkup}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${objekdatasoal[i].materi}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px;text-align:center">${objekdatasoal[i].levelkognitif}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${objekdatasoal[i].indikatorsoal}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px">${objekdatasoal[i].bentuksoal}</td>
                <td style="border:.5pt solid #000;vertical-align:top;padding:5px;text-align:center">${keyobjeknosoal[i]}</td>
                </tr>`;
            }
            html +=`</tbody></table><br><br><br><br><table style="text-align:center;font-family::Times New Roman, Times, serif;font-size:11pt;width:100%">
            <tbody><tr>
            <td style="padding:5px;text-align:center">Mengetahui, <br>Kepala ${idNamaSekolah}<br><br><br><br><b><u>${idNamaKepsek}</u></b><br>NIP. ${idNipKepsek}</td>
            <td style="padding:5px;text-align:center">Depok, ${objeksoal.tanggal.split(",")[1]}<br>${ketguru}<br><br><br><br><b><u>${objeksoal.namaguru}</u></b><br>NIP. ${jjguru.guru_nip}</td>
            <td style="padding:5px;text-align:center"></td>
            </tr>
            </tbody></table>`;

        }

    }else{
        html = `<h3 style="text-align:center">KUNCI JAWABAN DAN PENSKORAN</h3>`;
        html +=`<h4 style="text-align:center">${objeksoal.juduldesain.toUpperCase()}</h4><br>`;
        html +=`<table style="border-collapse:collapse;border:.5pt solid #000;width:100%;font-size:10pt"><thead><tr style="background-color:#f1f1f1;color:#000"><th style="border:.5pt solid #000;padding:5px">No.<br>Soal</th><th style="border:.5pt solid #000;padding:5px">Kunci<br>Jawaban</th><th style="border:.5pt solid #000;padding:5px">Pembahasan/Penskoran</th></tr></thead><tbody>`;
        for(i=0; i<objekdatasoal.length ; i++){
        html +=`<tr><td style="border:.5pt solid #000;padding:5px;vertical-align:top;text-align:center">${keyobjeknosoal[i]}</td><td style="border:.5pt solid #000;padding:5px;vertical-align:top;text-align:center">${objekdatasoal[i].kuncijawaban}</td><td style="border:.5pt solid #000;padding:5px;vertical-align:top">${objekdatasoal[i].penskoran}</td>`;
        }
        html +=`</tbody></table>`

    }
    elemenisi.innerHTML = html;
    printkan.onclick = null;
    wordkan.onclick = null;
    if(kondisi == "kisikisi"){

        printkan.onclick = function(){
            printadm("areaprint_soalkisidandesainsoallainnya",false)
        }
        wordkan.onclick = function(){
            print2WordGlobal("areaprint_soalkisidandesainsoallainnya","Database desain kisi-kisi naskah soal","kisikisijawaban",false)
            
        }
    }else{
        printkan.onclick = function(){
            printadm("areaprint_soalkisidandesainsoallainnya")
        }
        wordkan.onclick = function(){
            print2WordGlobal("areaprint_soalkisidandesainsoallainnya","Database desain kunci jawaban naskah soal","kisikisijawaban2",false)
            
        }
    }
}

const carikriteriabanksoal = (el)=>{
    let divpaginasi = document.querySelectorAll(".bungkuspaginasibanksoal");
                for(let p = 0 ; p < divpaginasi.length ; p++){
                    if(divpaginasi[p].className.indexOf("w3-hide")==-1){
                        divpaginasi[p].classList.add("w3-hide")
                    }
                }
    let op = el.options;
    let indek = op.selectedIndex;
    let v_mapel = op[indek].value;
    let v_kelas = document.getElementById("kritkolsoal_kelas").value;
    if(v_kelas ==""){
        alert("Isikan kelasnya. Pilih angka 0 untuk mencari soal di seluruh jenjang kelas.");
        return
    }
    let dbb;// = databasesoal;
    if(v_mapel == "" && v_kelas == 0){
        dbb = databasesoal;
    }else if(v_mapel !== "" && v_kelas == 0){
        dbb = databasesoal.filter(s => s.kodemapel == v_mapel);
    }else if(v_mapel =="" && v_kelas > 0){
        dbb = databasesoal.filter(s =>  s.jenjang == v_kelas);
    }else{
        dbb = databasesoal.filter(s => s.kodemapel == v_mapel && s.jenjang == v_kelas);
    }

    let tabel = document.querySelector(".tabelpilihandbsoal")
    let html = "";
    html +=`<thead><tr class="w3-light-gray"><th>No.<br>Urut</th><th>Kelas</th><th>Dibuat Oleh</th><th>Mata Pelajaran</th><th>Preview Soal</th><th>Bentuk Soal</th><th>Kualitas Soal (Rating)</th><th>Aksi</th></tr></thead><tbody>`;
    let rating="";// = fungsirating();
    if(dbb.length > 0){
        for(let i = 0 ; i < dbb.length ; i++){
            rating = fungsirating(dbb[i].idbaris);
            html +=`<tr>
                    <td class="w3-center">${i+1}</td>
                    <td class="w3-center">${dbb[i].jenjang}</td>
                    <td class="w3-center">${dbb[i].oleh}</td>
                    <td>${dbb[i].tekskodemapel}</td>`
                    if(dbb[i].ilustrasi == "" || dbb[i].ilustrasi == `<div><br></div>`){

                        html +=`<td class="w3-tiny"><div style="width:360px;overflow-x:auto">${dbb[i].pertanyaan}</div></td>`;
                    }else{

                        html +=`<td class="w3-tiny"><div style="width:360px;overflow-x:auto">${dbb[i].ilustrasi}</div></td>`;
                    }
                    html+=`<td>${dbb[i].bentuksoal}</td>
                    <td>${rating}</td>
                    <td>
                    <button class="w3-button w3-yellow w3-bottombar w3-border-black w3-round" onclick="modalbanksoaleditable('${dbb[i].idbaris}','lihat')" title="Lihat item soal"><i class="fa fa-eye"></i></button>
                    <button class="w3-button w3-blue w3-bottombar w3-border-black w3-round" onclick="modalbanksoaleditable('${dbb[i].idbaris}','modifikasi')" title="Modifikasi soal ini menjadi item soal baru di database. Item soal sebelumnya masih tetap ada."><i class="fa fa-edit"></i></button>`;
                    if(dbb[i].idguru == idguru){
                        html +=`<button class="w3-button w3-green w3-bottombar w3-border-black w3-round" onclick="modalbanksoaleditable('${dbb[i].idbaris}','edit')"  title="Karena ini buatan Anda, Anda bisa mengeditnya"><i class="fa fa-gear"></i></button>
                        <button class="w3-button w3-light-grey w3-bottombar w3-border-black w3-round" onclick="modalbanksoalhapus('${dbb[i].idbaris}','hapus')"  title="Karena ini buatan Anda, Anda bisa menghapusnya"><i class="fa fa-trash"></i></button>`;
                    }
                    html +=`</td></tr>`;
        }
        html +=`</tbody>`;
    }else{
        html+=`<tr><td colspan="8" class="w3-center">Tidak ditemukan bank soal dengan kriteria ini</td>`;
        html +=`</tbody>`;
    }
    tabel.innerHTML = html
}
const carikriteriabanksoalkelas = (el)=>{
    
    let ele = document.getElementById("kritsoal_mapel")
    let op = ele.options;
    let indek = op.selectedIndex;
    let v_mapel = op[indek].value;
    let t_mapel = op[indek].text;
    let elkelas, elval ;
    // if(el.getAttribute("id") == "kritkolsoal_kelas"){
    //     elkelas = document.getElementById("kritkolsoal_kelas");
    //     elval = document.getElementById("kritsoal_katakunci")
    // }else{
    // }
    let divpaginasi = document.querySelectorAll(".bungkuspaginasibanksoal");
                for(let p = 0 ; p < divpaginasi.length ; p++){
                    if(divpaginasi[p].className.indexOf("w3-hide")==-1){
                        divpaginasi[p].classList.add("w3-hide")
                    }
                }
        elkelas = document.getElementById("kritkolsoal_kelas");
        elval = document.getElementById("kritsoal_katakunci");
        let domket = document.getElementById("kritsoa_yangdicariuser");
    let v_kelas = elkelas.value;
    if(v_kelas ==""){
        alert("Isikan kelasnya. Pilih angka 0 untuk mencari soal di seluruh jenjang kelas.");
        return
    }
    let dbb;// = databasesoal;
    if(v_mapel == "" && v_kelas == 0 && elval.value == ""){
        dbb = databasesoal;
        domket.innerHTML = "Anda mencari seluruh Bank Soal"
    }else if(v_mapel !== "" && v_kelas == 0 && elval.value == ""){
        
        dbb = databasesoal.filter(s => s.kodemapel == v_mapel);
        domket.innerHTML = `Anda mencari Bank Soal <b>Seluruh Kelas</b> dengan mata pelajaran <b>${t_mapel}</b>`;
    }else if(v_mapel =="" && v_kelas > 0 && elval.value == ""){
        domket.innerHTML = `Anda mencari Bank Soal di jenjang kelas <b>${v_kelas}</b> dengan <b>seluruh jenis Mata pelajaran</b>`;
        
        dbb = databasesoal.filter(s =>  s.jenjang == v_kelas);
    }else if(v_mapel !== "" && v_kelas > 0 && elval.value ==""){
        dbb = databasesoal.filter(s => s.kodemapel == v_mapel && s.jenjang == v_kelas);
        domket.innerHTML = `Anda mencari Bank Soal Mata Pelajaran <b>${t_mapel}</b> di jenjang kelas <b>${v_kelas}</b>`
    }else{
        if(v_mapel == "" && v_kelas == 0){
            dbb = databasesoal.filter(s => Object.entries(s).filter(([k,v])=> v.toString().toLowerCase().indexOf(elval.value.toLowerCase())>-1).length!==0);
            domket.innerHTML = `Anda mencari Bank Soal yang berisi kata kunci <b>${elval.value}</b> di <b>Semua Jenjang Kelas</b> dan <b>Seluruh Mata Pelajaran</b>`;
        }else if(v_mapel =="" && v_kelas > 0){
            dbb = databasesoal.filter(s => Object.entries(s).filter(([k,v])=> v.toString().toLowerCase().indexOf(elval.value.toLowerCase())>-1).length!==0 && s.jenjang == v_kelas);
            domket.innerHTML = `Anda mencari Bank Soal yang berisi kata kunci <b>${elval.value}</b> di jenjang kelas <b>${v_kelas}}</b> dan <b>Seluruh Mata Pelajaran</b>`;
        }else if(v_mapel !== "" && v_kelas == 0){
            dbb = databasesoal.filter(s => Object.entries(s).filter(([k,v])=> v.toString().toLowerCase().indexOf(elval.value.toLowerCase())>-1).length!==0 && s.kodemapel == v_mapel);
            domket.innerHTML = `Anda mencari Bank Soal yang berisi kata kunci <b>${elval.value}</b> di <b>Semua Jenjang Kelas</b> dan Mata Pelajaran <b>${t_mapel}</b>`;
        }else{
            dbb = databasesoal.filter(s => Object.entries(s).filter(([k,v])=> v.toString().toLowerCase().indexOf(elval.value.toLowerCase())>-1).length!==0 && s.jenjang == v_kelals && s.kodemapel == v_mapel);
            domket.innerHTML = `Anda mencari Bank Soal yang berisi kata kunci <b>${elval.value}</b> di jenjang kelas <b>${v_kelals}</b> dan Mata Pelajaran <b>${t_mapel}</b>`;
            // dbb = databasesoal.filter(s => Object.entries(s).filter(([k,v])=> (k == v_mapel || k == v_kelas)&& v == elval.value ));

        }
    }

    
    let tabel = document.querySelector(".tabelpilihandbsoal")
    let html = "";
    html +=`<thead><tr class="w3-light-gray"><th>No.<br>Urut</th><th>Kelas</th><th>Dibuat Oleh</th><th>Mata Pelajaran</th><th>Preview Soal</th><th>Bentuk Soal</th><th>Kualitas Soal (Rating)</th><th>Aksi</th></tr></thead><tbody>`;
    let rating="";// = fungsirating();
    if(dbb.length > 0){
        for(let i = 0 ; i < dbb.length ; i++){
            rating = fungsirating(dbb[i].idbaris);
            html +=`<tr>
                    <td class="w3-center">${i+1}</td>
                    <td class="w3-center">${dbb[i].jenjang}</td>
                    <td class="w3-center">${dbb[i].oleh}</td>
                    <td>${dbb[i].tekskodemapel}</td>`
                    if(dbb[i].ilustrasi == "" || dbb[i].ilustrasi == `<div><br></div>`){
                        html +=`<td class="w3-tiny"><div style="width:360px;overflow-x:auto">${dbb[i].pertanyaan}</div></td>`;
                    }else{

                        html +=`<td class="w3-tiny"><div style="width:360px;overflow-x:auto">${dbb[i].ilustrasi}</div></td>`;
                    }
                    html+=`<td>${dbb[i].bentuksoal}</td>
                    <td>${rating}</td>
                    <td>
                    <button class="w3-button w3-yellow w3-bottombar w3-border-black w3-round" onclick="modalbanksoaleditable('${dbb[i].idbaris}','lihat')" title="Lihat item soal"><i class="fa fa-eye"></i></button>
                    <button class="w3-button w3-blue w3-bottombar w3-border-black w3-round" onclick="modalbanksoaleditable('${dbb[i].idbaris}','modifikasi')" title="Modifikasi soal ini menjadi item soal baru di database. Item soal sebelumnya masih tetap ada."><i class="fa fa-edit"></i></button>`;
                    if(dbb[i].idguru == idguru){
                        html +=`<button class="w3-button w3-green w3-bottombar w3-border-black w3-round" onclick="modalbanksoaleditable('${dbb[i].idbaris}','edit')"  title="Karena ini buatan Anda, Anda bisa mengeditnya"><i class="fa fa-gear"></i></button>
                        <button class="w3-button w3-light-grey w3-bottombar w3-border-black w3-round" onclick="modalbanksoalhapus('${dbb[i].idbaris}','hapus')"  title="Karena ini buatan Anda, Anda bisa menghapusnya"><i class="fa fa-trash"></i></button>`;
                    }
                    html +=`</td></tr>`;
        }
        html +=`</tbody>`;
    }else{
        html+=`<tr><td colspan="8" class="w3-center">Tidak ditemukan bank soal dengan kriteria ini</td>`;
        html +=`</tbody>`;
    }
    tabel.innerHTML = html
}
const modalbanksoaleditable = (ibrs,kondisi) =>{
    
    let elemenisi = document.querySelector(".areaprint_soalkisidandesainsoallainnya");
    let modalnya = document.getElementById("modal_soalkisidandesainsoallainnya");
    let printkan = document.querySelector(".modaldiprintsoal");
    let wordkan = document.querySelector(".modaldieksporword");
    let html = ibrs+" "+kondisi;
    modalnya.style.display="block";
    let db ;// databasesoal.filter(s=> s.idbaris == ibrs)[0];//objeknya
    let objekratingsoal;// = ob_ratinguser(db.idbaris);
    let src_komentar;// = objekratingsoal.komentar;
    //console.log(src_komentar);
    let koleksiklikkomenowner = [];
    if(kondisi == "lihat"){
        db = databasesoal.filter(s => s.idbaris == ibrs)[0];
        
        objekratingsoal = ob_ratinguser(db.idbaris);
        src_komentar = objekratingsoal.komentar;
        html = `<h2 style="text-align:center">Data Tentang Soal Ini</h2><br>
        Tampilan Soal:
        <div style="border:.5pt solid #000;border-radius:30px;padding:15px">${db.ilustrasi}<br> ${db.pertanyaan}`;
        if(db.bentuksoal == "Pilihan Ganda"){
            if(db.headerpg==""){
                html +=`<ol style="list-style-type:upper-alpha;margin:0 0 0 -1em">
                <li>${db.opsiA}</li>
                <li>${db.opsiB}</li>
                <li>${db.opsiC}</li>`;
                            if(db.opsiD !==""){
                                    html+=`<li>${db.opsiC}</li>`
                            }    
                html +=`</ol>`
            }else{
                let arropsiA = JSON.parse(db.opsiA);
                let arropsiB = JSON.parse(db.opsiB);
                let arropsiC = JSON.parse(db.opsiC);
                let arropsiD = [];
                let arrHead = JSON.parse(db.headerpg);
                let jumlahPG = 3;
                if(db.opsiD !== ""){
                    arropsiD = JSON.parse(db.opsiD);
                    jumlahPG = 4
                }
                html += `<table style="border-collapse:collapse;border:.5pt solid #000;width:100%;font-family:Times New Roman, Times, serif;">`;
                html +=`<thead><tr style="border:.5pt solid #000"><th style="border:.5pt solid #000;background-color:#f1f1f1;width:30px"></th>`;
                for(a = 0 ; a < arrHead.length ; a++){
                    html +=`<th style="border:.5pt solid #000;text-align:center;background-color:#f1f1f1">${arrHead[a]}</th>`
                }
                html +=`</tr><tbody>`;
                html +=`<tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">A.</td>`;
                for(c = 0 ; c <arrHead.length ; c++){
                    html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiA[c]}</td>`
                }
                html +=`</tr><tr style="border:.5pt solid #000;vertical-align:top;"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">B.</td>`;
                for(c = 0 ; c < arrHead.length ; c++){
                    html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiB[c]}</td>`;
                }
                html +=`</tr><tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">C.</td>`;
                for(c = 0 ; c <arrHead.length ; c++){
                    html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiC[c]}</td>`
                }
                if(db.opsiD !== ""){
                    html +=`</tr><tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">D.</td>`;
                    for(c = 0 ; c < arrHead.length ; c++){
                        html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiD[c]}</td>`;
                    }
                    html +=`</tr>`
                }else{
                    html +=`</tr>`
                }
            html +=`</tbody></table>`
            }
        }
        html+=`</div><br><h3 style="text-align:center">Properti Soal</h3>
        <div class="w3-border w3-round-small w3-padding" style="overflow-x:auto">
            <table class="w3-table w3-small">
                <tr><td>ID Soal</td><td style="width:5px">:</td><td> ${db.idbaris}</td></tr>
                <tr><td>Kelas</td><td style="width:5px">:</td><td> ${db.jenjang}</td></tr>
                <tr><td>Mata Pelajaran</td><td style="width:5px">:</td><td> ${db.tekskodemapel}</td></tr>
                <tr><td>Kompetensi Dasar</td><td style="width:5px">:</td><td> ${db.tekskd}</td></tr>
                <tr><td>Lingkup Materi</td><td style="width:5px">:</td><td> ${db.ruanglingkup}</td></tr>
                <tr><td>Materi Pokok</td><td style="width:5px">:</td><td> ${db.materi}</td></tr>
                <tr><td>Bentuk Soal</td><td style="width:5px">:</td><td> ${db.bentuksoal}</td></tr>
                <tr><td>Level Kognitif</td><td style="width:5px">:</td><td> ${db.levelkognitif}</td></tr>
                <tr><td>Indikator Soal</td><td style="width:5px">:</td><td> ${db.indikatorsoal}</td></tr>
                <tr><td>Kunci Jawaban</td><td style="width:5px">:</td><td> ${db.kuncijawaban}</td></tr>
                <tr><td>Pembahasan/Penskoran</td><td style="width:5px">:</td><td> ${db.penskoran}</td></tr>
                <tr><td>Dibuat Oleh</td><td style="width:5px">:</td><td> ${db.oleh}</td></tr>
                <tr><td>Sumber Soal/Refrensi</td><td style="width:5px">:</td><td> ${db.refrensi}</td></tr>
            </table>
        </div>
            <hr>
        <h3 style="text-align:center">Penilaian Publik tentang Soal ini</h3>
        <div style="border:.5pt dotted #000;border-radius:30px;padding:5px;color:#000!important;background-color:#fdd!important;text-align:center">
            Rata-rata pengunjung memberikan rating (bintang) untuk Soal ini: <br>
                ${objekratingsoal.avrg_bntg}<br>
                <button class="w3-btn w3-pale-blue w3-border w3-round-large w3-bottombar w3-border-black w3-tiny" id="btn_lihattabelskor" onclick="togglepemberiskor('buka')">Lihat Detail Pemberi Skor</button>
                <table class="w3-hide w3-table garis w3-tiny" id="tabelpemberiskor" style="max-width:350px;margin:5px auto">
                <tr class="w3-light-grey">
                <th>Nama user</th>
                <th>Instansi</th>
                <th>Skor Bintang</th>
                </tr>
                ${objekratingsoal.htmltr}
                </table>
                <button class="w3-btn w3-pale-blue w3-border w3-round-large w3-bottombar w3-border-black w3-tiny w3-hide" id="btn_tutuptabelskor" onclick="togglepemberiskor('tutup')">Tutup Detail Pemberi Skor</button>
        </div>
            <br><br>`;
            
            if(db.idguru != idguru){
                html+=`<div style="border:.5pt dotted #000;border-radius:30px;padding:5px;text-align:center">
                <div class="infousermemberirating">
                ${objekratingsoal.infouser}
                </div>
                <br>
                <div class="tempatbintangrating">
                ${objekratingsoal.giveRate}    
                </div>
                <br>
                <button class="hapusrating w3-hide w3-bottombar w3-border-black fa fa-trash w3-round-large w3-btn" onclick="klik_hapusrating('${ibrs}')"> Hapus Rating</button>
                </div><hr>`;
            }
            html +=`<h3 style="text-align:center">Panel Diskusi Tentang Soal ini</h3>
        <div style="border:.5pt dotted #000;border-radius:10px;padding:5px;">`;
            if(src_komentar.length>0){
                for(let b =0; b < src_komentar.length ; b++){
                    let perobjek = src_komentar[b];
                    
                    let keyperobjek = Object.keys(perobjek)[0];
                    let ang = keyperobjek.match(/(\d+)/)[0];
                    
                    let waktukomen = "time_komentator_"+ang;
                    let waktufullkomen = tanggalfulllengkap(new Date(src_komentar[b][waktukomen]));
                    
                    let isikomen = "isi_komentator_"+ang;
                    let idkomen = "id_komentator_"+ang;
                    let idbariskomen = perobjek.idbariskomen;
                    let idkomentator = perobjek[idkomen];
                    let komentatorsebenarnya = dataapigurutamu.filter(s => s.id == idkomentator)[0].guru_namalengkap
                    let src_gambar = dataapigurutamu.filter(s => s.id == idkomentator)[0].idpoto_potoguru
                    let siapakomen = "nama_komentator_"+ang;
                    // <i class="fa fa-user w3-left w3-padding w3-border w3-circle w3-margin-right w3-jumbo"></i>
                html+=`<div class="w3-container w3-card w3-white w3-round w3-margin">
                        <img alt="avatarkoment${ang}" src="https://drive.google.com/uc?export=view&id=${src_gambar}" onclick='klikpotosiswa(this)' style="width:60px;height:60px;float:left;margin:5px 8px;border:1px dotted #000;border-radius:50%;cursor:pointer" title="Klik poto untuk memperbesar gambar">
                        <span class="w3-right w3-opacity w3-tiny">${waktufullkomen}</span>
                        <h4>${komentatorsebenarnya}</h4><br>
                        <hr class="w3-clear">`
                        console.log(idkomentator, idguru)
                        if(idkomentator == idguru){
                            let idp = `p_komenke_${ang}`;
                            koleksiklikkomenowner.push(idp);            
                        html +=`<p class="w3-justify tangan p_komenke_${ang}" id="p_komenke_${ang}" onmouseover="this.classList.add('w3-border');this.classList.add('w3-padding')" onmouseout="this.classList.remove('w3-border');this.classList.remove('w3-padding')">
                        ${src_komentar[b][isikomen]}
                        </p>
                        <hr>
                        <div class="tomboleditkomenke_${ang} w3-tiny">
                        <button onclick="editkomentaritemsoal(${ang}, ${idbariskomen},${ibrs},'edit')" class="w3-btn w3-round-large w3-pale-green fa fa-edit w3-bottombar w3-border-black" title="Edit Pesan ini"> Simpan Editan</button>
                        <button onclick="editkomentaritemsoal(${ang}, ${idbariskomen},${ibrs},'hapus')"  class="w3-btn w3-round-large w3-pale-green fa fa-trash w3-bottombar w3-border-black" title="Hapus Pesan ini"> Hapus</button><br>
                            Ini adalah komentar Anda, Jika ingin mengeditnya silakan klik pada teks komentar lalu klik tombol <b>Simpan Editan</b>.
                        </div>`;
                        }else{
                            html+=`<p class="w3-justify"> ${src_komentar[b][isikomen]}</p>`;
                        }
                html +=`<p></p></div>`;
                    }
            }else{
                html+=`<h3 style="text-align:center">Belum Ada Diskusi untuk item soal ini</h3><br>Silakan berikan komentar/saran untuk item soal ini.`;
            }
            html+=`<hr>
            <div id="komentarrating" class="komentarrating w3-border w3-padding w3-margin-bottom tangan">Klik disini untuk memberikan komentar</div>
            <button onclick="komentarinitemsoal(${ibrs})" class="w3-button w3-green w3-bottombar w3-border-black w3-margin-bottom w3-round-large"><i class="fa fa-comment"></i>  Kirim Komentar</button></div>`;
            
    }else if(kondisi == "modifikasi"){
        db = databasesoal.filter(s => s.idbaris == ibrs)[0];
        
        objekratingsoal = ob_ratinguser(db.idbaris);
        src_komentar = objekratingsoal.komentar;
        html =`<h4 class="w3-center">Modifikasi Item Soal</h3><br><div class="w3-tiny">
        Memodifikasi item soal artinya Anda akan mengedit item soal yang telah ada untuk menjadi item soal baru di database. Item soal yang dimodifikasi tetap ada di database. Beberapa unsur komponen tidak bisa diedit untuk versi ini</div>`;
        html +=`<br><h5 class="w3-center">Komponen Modifikasi</h5><table class="w3-table garis w3-small">
            <tr class="w3-light-gray"><td colspan="2" style="text-align:center;vertical-align:middle">Tampilan Utama Soal</td></tr>
            <tr class="w3-light-gray"><td style="text-align:center;vertical-align:middle">Unsur<br>Komponen</td><td style="text-align:center;vertical-align:middle">Isi Konten (Klik pada bagian teks komponen untuk dimodifikasi)</td></tr>
            <tr><td>Ilustrasi Soal</td><td class="modifsoal_ilustrasi tangan" data-modifikasi="ilustrasi" title="klik teks ini untuk mengedit">${db.ilustrasi}</td></tr>
            <tr><td>Pertanyaan</td><td class="modifsoal_pertanyaan tangan" data-modifikasi="pertanyaan"  title="klik teks ini untuk mengedit">${db.pertanyaan}</td></tr>`;
        if(db.bentuksoal == "Pilihan Ganda"){
            if(db.tampilanpg =="BIASA"){
                html+=`<tr><td>Opsi Jawaban</td><td>
                <div class="w3-row">
                    <div class="w3-col" style="width:30px">A. </div>
                    <div class="w3-rest tangan modifsoal_opsiA"  data-modifikasi="opsiA"  title="klik teks ini untuk mengedit">${db.opsiA ==""?" ": db.opsiA}</div>
                    <div class="w3-col" style="width:30px">B. </div>
                    <div class="w3-rest tangan modifsoal_opsiB"  data-modifikasi="opsiB" title="klik teks ini untuk mengedit">${db.opsiB ==""?" ": db.opsiB}</div>
                    <div class="w3-col" style="width:30px">C. </div>
                    <div class="w3-rest tangan modifsoal_opsiC" data-modifikasi="opsiC"  title="klik teks ini untuk mengedit">${db.opsiC ==""?" ": db.opsiC}</div>
                    <div class="w3-col" style="width:30px">D. </div>`;
                    if(db.opsiD !==""){
                        html+=`<div class="w3-rest modifsoal_opsiD tangan" data-modifikasi="opsiD"  title="klik teks ini untuk mengedit/biarkan tidak diisi (kosong) jika OPSI hanya sampai C">${db.opsiD ==""?" ": db.opsiD}</div>`;
                    }
                html+=`</div>
                </td></tr>`
            }else{
                let hederopsi = JSON.parse(db.headerpg);
                let opsi_a = JSON.parse(db.opsiA);
                let opsi_b = JSON.parse(db.opsiB);
                let opsi_c = JSON.parse(db.opsiC);
                let opsi_d = db.opsiD == ""?[]:JSON.parse(db.opsiD);
                html+=`<tr><td>Opsi Jawaban</td><td>`;
                let htmll =`<table style="border-collapse:collapse;border:.5pt solid #000;">`;
                let htmlh = `<thead><tr>`;
                    htmlh +=`<th style="border:.5pt solid #000;background-color:#f1f1f1;width:30px!important"></th>`
                    let htmlb = `<tbody>`;
                for(let i = 0 ; i <hederopsi.length ; i++){
                    htmlh +=`<th style="border:.5pt solid #000;background-color:#f1f1f1" class="modifsoal_headerpg${i} modifsoal_headerpg tangan"  data-modifikasi="headerpg" >${hederopsi[i]}</th>`
                }
                if(opsi_d.length == 0){
                    let htmlaa =`<tr><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px;width:30px!important">A. </td>`;
                    let htmlbb =`<tr><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px;width:30px!important">B. </td>`;
                    let htmlcc =`<tr><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px;width:30px!important">C. </td>`;
                    for(let i = 0 ; i <hederopsi.length ; i++){
                        htmlaa +=`<td title="klik teks ini untuk mengedit" class="modifsoal_opsiA modifsoal_opsiA${i} tangan" data-modifikasi="opsiA" style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${opsi_a[i]}</td>`;
                        htmlbb +=`<td title="klik teks ini untuk mengedit" class="modifsoal_opsiB modifsoal_opsiB${i} tangan" data-modifikasi="opsiB" style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${opsi_b[i]}</td>`;
                        htmlcc +=`<td title="klik teks ini untuk mengedit" class="modifsoal_opsiC modifsoal_opsiC${i} tangan" data-modifikasi="opsiC" style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${opsi_c[i]}</td>`;
                    }
                    htmlaa+="</tr>";
                    htmlbb+="</tr>";
                    htmlcc+="</tr>";
                    htmlb+=htmlaa+htmlbb+htmlcc;
                }else{
                    let htmlaa =`<tr><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px;width:30px!important">A. </td>`;
                    let htmlbb =`<tr><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px;width:30px!important">B. </td>`;
                    let htmlcc =`<tr><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px;width:30px!important">C. </td>`;
                    let htmldd =`<tr><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px;width:30px!important">D. </td>`;
                    for(let i = 0 ; i <hederopsi.length ; i++){
                    htmlaa +=`<td title="klik teks ini untuk mengedit" class="modifsoal_opsiA modifsoal_opsiA${i} tangan" data-modifikasi="opsiA" style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${opsi_a[i]}</td>`;
                    htmlbb +=`<td title="klik teks ini untuk mengedit" class="modifsoal_opsiB modifsoal_opsiB${i} tangan" data-modifikasi="opsiB" style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${opsi_b[i]}</td>`;
                    htmlcc +=`<td title="klik teks ini untuk mengedit" class="modifsoal_opsiC modifsoal_opsiC${i} tangan" data-modifikasi="opsiC" style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${opsi_c[i]}</td>`;
                    htmldd +=`<td title="klik teks ini untuk mengedit" class="modifsoal_opsiD modifsoal_opsiD${i} tangan" data-modifikasi="opsiD" style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${opsi_d[i]}</td>`;
                    }
                    htmlaa+="</tr>";
                    htmlbb+="</tr>";
                    htmlcc+="</tr>";
                    htmldd+="</tr>";
                    htmlb+= htmlaa+htmlbb+htmlcc+htmldd;
                }
                    htmlh +=`</tr></thead>`;
                    htmlb += `</tbody>`;
                html +=htmll;
                html +=htmlh;
                html +=htmlb;
                html +="</table>"
                html +=`</td></tr>`
            }
            html +=`<tr><td>Kunci Jawaban</td><td><input type="text"  class="w3-input w3-center w3-jumbo" data-modifikasi="kuncijawaban" value="${db.kuncijawaban}"></td></tr>`;
        }
        html +=`<tr><td>Pembahasan / Penskoran</td><td class="modifsoal_penskoran tangan" data-modifikasi="penskoran">${db.penskoran}</td></tr>`;
        html +=`<tr><td>Indikator Soal</td><td title="klik teks ini untuk mengedit"  class="modifsoal_indikatorsoal tangan" data-modifikasi="indikatorsoal">${db.indikatorsoal}</td></tr>`
        html +=`<tr><td>Level Kognitif</td><td><select class="w3-select w3-border w3-pale-blue tangan" id="modiflevelsoal" data-modifikasi="levelkognitif"><option value="">Pilih Level Kognitif</option><option value="L1">Level 1: Pengetahuan/Pemahaman</option><option value="L2">Level 2: Aplikasi/Penerapan</option><option value="L3">Level 3: Penalaran</option></select></td></tr>`;
        html +=`<tr><td>Materi Pokok</td><td class="modifsoal_materi tangan" data-modifikasi="materi">${db.materi}</td></td>`
        html +=`<tr><td>Buku Sumber / Refrensi</td><td class="modifsoal_refrensi tangan" data-modifikasi="refrensi">${db.refrensi}</td></td>`
        html+=`</table><br><br>Komponen Lainnya:`;
        html+=`<table class="w3-table garis w3-small">
        <tr class="w3-light-gray"><td colspan="2" style="text-align:center;vertical-align:middle">Komponen Kisi-kisi</td></tr>
        <tr class="w3-light-gray"><td style="text-align:center;vertical-align:middle">Unsur<br>Komponen</td><td style="text-align:center;vertical-align:middle">Isi Konten (Tidak bisa dimodifikasi)</td></tr>
        <tr><td>Bentuk Soal</td><td>${db.bentuksoal}</td></tr>`;
        if(db.bentuksoal == "Pilihan Ganda"){
            html+=`<tr><td>Style Opsi Jawaban</td><td>${db.tampilanpg}</td></tr>`;
        }
        html+=`<tr><td>Kelas</td><td>${db.jenjang}</td></tr>
        <tr><td>Mata Pelajaran</td><td>${db.tekskodemapel}</td></tr>
        <tr><td>ID Mapel</td><td>${db.kodemapel}</td></tr>
        <tr><td>No. KD</td><td>${db.kd}</td></tr>
        <tr><td>Kompetensi Dasar</td><td>${db.tekskd}</td></tr>
        <tr><td>Ruang Lingkup Materi</td><td>${db.ruanglingkup}</td></tr>
        <tr><td>ID Pembuat Awal</td><td>${db.idguru}</td></tr>
        <tr><td>Nama Pembuat Awal</td><td>${db.oleh}</td></tr>  
        </table><hr><button onclick="kirimmodifikasisoal(${ibrs})" class="w3-btn w3-pale-blue w3-bottombar w3-border-black w3-round-large"> Simpan Modifikasi Soal</button>`
    }else if(kondisi == "edit"){
        db = databasesoal.filter(s => s.idbaris == ibrs)[0];
        objekratingsoal = ob_ratinguser(db.idbaris);
        src_komentar = objekratingsoal.komentar;
        html =`<h4 class="w3-center">Edit Item Soal</h3><br><div class="w3-tiny">
        Item soal ini adalah buatan Anda dan Anda bisa mengedit ini. Item soal yang diedit dari fitur ini akan mengganti item soal yang telah disimpan di database server sebelumnya.</div>`;
        html +=`<br><h5 class="w3-center">Komponen Edit</h5><table class="w3-table garis w3-small">
            <tr class="w3-light-gray"><td colspan="2" style="text-align:center;vertical-align:middle">Tampilan Utama Soal</td></tr>
            <tr class="w3-light-gray"><td style="text-align:center;vertical-align:middle">Unsur<br>Komponen</td><td style="text-align:center;vertical-align:middle">Isi Konten (Klik pada bagian teks komponen untuk dimodifikasi)</td></tr>
            <tr><td>Ilustrasi Soal</td><td class="modifsoal_ilustrasi tangan" data-modifikasi="ilustrasi" title="klik teks ini untuk mengedit">${db.ilustrasi}</td></tr>
            <tr><td>Pertanyaan</td><td class="modifsoal_pertanyaan tangan" data-modifikasi="pertanyaan"  title="klik teks ini untuk mengedit">${db.pertanyaan}</td></tr>`;
        if(db.bentuksoal == "Pilihan Ganda"){
            if(db.tampilanpg =="BIASA"){
                html+=`<tr><td>Opsi Jawaban</td><td>
                <div class="w3-row">
                    <div class="w3-col" style="width:30px">A. </div>
                    <div class="w3-rest modifsoal_opsiA tangan"  data-modifikasi="opsiA"  title="klik teks ini untuk mengedit">${db.opsiA ==""?" ": db.opsiA}</div>
                    <div class="w3-col" style="width:30px">B. </div>
                    <div class="w3-rest modifsoal_opsiB tangan"  data-modifikasi="opsiB" title="klik teks ini untuk mengedit">${db.opsiB ==""?" ": db.opsiB}</div>
                    <div class="w3-col" style="width:30px">C. </div>
                    <div class="w3-rest modifsoal_opsiC tangan" data-modifikasi="opsiC"  title="klik teks ini untuk mengedit">${db.opsiC ==""?" ": db.opsiC}</div>
                    <div class="w3-col" style="width:30px">D. </div>`;
                    if(db.opsiD !==""){
                        html+=`<div class="w3-rest modifsoal_opsiD tangan" data-modifikasi="opsiD"  title="klik teks ini untuk mengedit/biarkan tidak diisi (kosong) jika OPSI hanya sampai C">${db.opsiD ==""?" ": db.opsiD}</div>`;
                    }
                html+=`</div></td></tr>`;
            }else{
                let hederopsi = JSON.parse(db.headerpg);
                let opsi_a = JSON.parse(db.opsiA);
                let opsi_b = JSON.parse(db.opsiB);
                let opsi_c = JSON.parse(db.opsiC);
                let opsi_d = db.opsiD == ""?[]:JSON.parse(db.opsiD);
                html+=`<tr><td>Opsi Jawaban</td><td>`;
                let htmll =`<table style="border-collapse:collapse;border:.5pt solid #000;">`;
                let htmlh = `<thead><tr>`;
                    htmlh +=`<th style="border:.5pt solid #000;background-color:#f1f1f1;width:30px!important"></th>`
                    let htmlb = `<tbody>`;
                for(let i = 0 ; i <hederopsi.length ; i++){
                    htmlh +=`<th style="border:.5pt solid #000;background-color:#f1f1f1" class="modifsoal_headerpg modifsoal_headerpg${i} tangan"  data-modifikasi="headerpg" >${hederopsi[i]}</th>`
                }
                if(opsi_d.length == 0){
                    let htmlaa =`<tr><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px;width:30px!important">A. </td>`;
                    let htmlbb =`<tr><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px;width:30px!important">B. </td>`;
                    let htmlcc =`<tr><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px;width:30px!important">C. </td>`;
                    for(let i = 0 ; i <hederopsi.length ; i++){
                        htmlaa +=`<td title="klik teks ini untuk mengedit" class="modifsoal_opsiA${i} modifsoal_opsiA tangan" data-modifikasi="opsiA" style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${opsi_a[i]}</td>`;
                        htmlbb +=`<td title="klik teks ini untuk mengedit" class="modifsoal_opsiB modifsoal_opsiB${i} tangan" data-modifikasi="opsiB" style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${opsi_b[i]}</td>`;
                        htmlcc +=`<td title="klik teks ini untuk mengedit" class="modifsoal_opsiC modifsoal_opsiC${i} tangan" data-modifikasi="opsiC" style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${opsi_c[i]}</td>`;
                    }
                    htmlaa+="</tr>";
                    htmlbb+="</tr>";
                    htmlcc+="</tr>";
                    htmlb+=htmlaa+htmlbb+htmlcc;
                }else{
                    let htmlaa =`<tr><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px;width:30px!important">A. </td>`;
                    let htmlbb =`<tr><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px;width:30px!important">B. </td>`;
                    let htmlcc =`<tr><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px;width:30px!important">C. </td>`;
                    let htmldd =`<tr><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px;width:30px!important">D. </td>`;
                    for(let i = 0 ; i <hederopsi.length ; i++){
                    htmlaa +=`<td title="klik teks ini untuk mengedit" class="modifsoal_opsiA modifsoal_opsiA${i} tangan" data-modifikasi="opsiA" style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${opsi_a[i]}</td>`;
                    htmlbb +=`<td title="klik teks ini untuk mengedit" class="modifsoal_opsiB${i} modifsoal_opsiB tangan" data-modifikasi="opsiB" style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${opsi_b[i]}</td>`;
                    htmlcc +=`<td title="klik teks ini untuk mengedit" class="modifsoal_opsiC${i} modifsoal_opsiC tangan" data-modifikasi="opsiC" style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${opsi_c[i]}</td>`;
                    htmldd +=`<td title="klik teks ini untuk mengedit" class="modifsoal_opsiD${i} modifsoal_opsiD tangan" data-modifikasi="opsiD" style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${opsi_d[i]}</td>`;
                    }
                    htmlaa+="</tr>";
                    htmlbb+="</tr>";
                    htmlcc+="</tr>";
                    htmldd+="</tr>";
                    htmlb+= htmlaa+htmlbb+htmlcc+htmldd;
                }
                    htmlh +=`</tr></thead>`;
                    htmlb += `</tbody>`;
                html +=htmll;
                html +=htmlh;
                html +=htmlb;
                html +="</table>"
                html +=`</td></tr>`
            }
            html +=`<tr><td>Kunci Jawaban</td><td><input type="text"  class="w3-input w3-center w3-jumbo" data-modifikasi="kuncijawaban" value="${db.kuncijawaban}"></td></tr>`;
        }
        html +=`<tr><td>Pembahasan / Penskoran</td><td class="modifsoal_penskoran tangan" data-modifikasi="penskoran">${db.penskoran}</td></tr>`;
        html +=`<tr><td>Indikator Soal</td><td title="klik teks ini untuk mengedit"  class="modifsoal_indikatorsoal tangan" data-modifikasi="indikatorsoal">${db.indikatorsoal}</td></tr>`
        html +=`<tr><td>Level Kognitif</td><td><select class="w3-select w3-border w3-pale-blue tangan" id="modiflevelsoal" data-modifikasi="levelkognitif"><option value="">Pilih Level Kognitif</option><option value="L1">Level 1: Pengetahuan/Pemahaman</option><option value="L2">Level 2: Aplikasi/Penerapan</option><option value="L3">Level 3: Penalaran</option></select></td></tr>`;
        html +=`<tr><td>Materi Pokok</td><td class="modifsoal_materi tangan" data-modifikasi="materi">${db.materi}</td></td>`
        html +=`<tr><td>Buku Sumber / Refrensi</td><td class="modifsoal_refrensi tangan" data-modifikasi="refrensi">${db.refrensi}</td></td>`
        html+=`</table><br><br>Komponen Lainnya:`;
        html+=`<table class="w3-table garis w3-small">
        <tr class="w3-light-gray"><td colspan="2" style="text-align:center;vertical-align:middle">Komponen Kisi-kisi</td></tr>
        <tr class="w3-light-gray"><td style="text-align:center;vertical-align:middle">Unsur<br>Komponen</td><td style="text-align:center;vertical-align:middle">Isi Konten (Tidak bisa dimodifikasi)</td></tr>
        <tr><td>Bentuk Soal</td><td>${db.bentuksoal}</td></tr>`;
        if(db.bentuksoal == "Pilihan Ganda"){
            html+=`<tr><td>Style Opsi Jawaban</td><td>${db.tampilanpg}</td></tr>`;
        }
        html+=`<tr><td>Kelas</td><td>${db.jenjang}</td></tr>
        <tr><td>Mata Pelajaran</td><td>${db.tekskodemapel}</td></tr>
        <tr><td>ID Mapel</td><td>${db.kodemapel}</td></tr>
        <tr><td>No. KD</td><td>${db.kd}</td></tr>
        <tr><td>Kompetensi Dasar</td><td>${db.tekskd}</td></tr>
        <tr><td>Ruang Lingkup Materi</td><td>${db.ruanglingkup}</td></tr>
        <tr><td>ID Pembuat</td><td>${db.idguru}</td></tr>
        <tr><td>Nama Pembuat Awal</td><td>${db.oleh}</td></tr>  
        </table><hr><button onclick="kirimpengeditansoal(${ibrs})" class="w3-btn w3-pale-blue w3-bottombar w3-border-black w3-round-large"> Simpan Pengeditan Soal</button>`
    
    }else if(kondisi == "lihatterhapus"){
        db = databasesoalterhapus.filter(s => s.idbaris == ibrs)[0];
        objekratingsoal = ob_ratinguser(db.idbaris);
        src_komentar = objekratingsoal.komentar;
        html = `<h2 style="text-align:center">Data Tentang Soal Yang Terhapus Ini</h2><br>
        Tampilan Soal yang telah dihapus oleh pembuatnya:
        <div style="border:.5pt solid #000;border-radius:30px;padding:15px">${db.ilustrasi}<br> ${db.pertanyaan}`;
        if(db.headerpg==""){
            html +=`<ol style="list-style-type:upper-alpha;margin:0 0 0 -1em">
            <li>${db.opsiA}</li>
            <li>${db.opsiB}</li>
            <li>${db.opsiC}</li>`;
                        if(db.opsiD !==""){
                                html+=`<li>${db.opsiC}</li>`
                        }    
            html +=`</ol>`
        }else{
            
            let arropsiA = JSON.parse(db.opsiA);
            let arropsiB = JSON.parse(db.opsiB);
            let arropsiC = JSON.parse(db.opsiC);
            let arropsiD = [];
            let arrHead = JSON.parse(db.headerpg);
            let jumlahPG = 3;
            
            if(db.opsiD !== ""){
                arropsiD = JSON.parse(db.opsiD);
                jumlahPG = 4
            }
            html += `<table style="border-collapse:collapse;border:.5pt solid #000;width:100%;font-family:Times New Roman, Times, serif;">`;
            html +=`<thead><tr style="border:.5pt solid #000"><th style="border:.5pt solid #000;background-color:#f1f1f1;width:30px"></th>`;
            for(a = 0 ; a < arrHead.length ; a++){
                html +=`<th style="border:.5pt solid #000;text-align:center;background-color:#f1f1f1">${arrHead[a]}</th>`
            }
            html +=`</tr><tbody>`;
            html +=`<tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">A.</td>`;
            for(c = 0 ; c <arrHead.length ; c++){
                html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiA[c]}</td>`
            }
            html +=`</tr><tr style="border:.5pt solid #000;vertical-align:top;"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">B.</td>`;
            for(c = 0 ; c < arrHead.length ; c++){
                html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiB[c]}</td>`;
            }
            html +=`</tr><tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">C.</td>`;
            for(c = 0 ; c <arrHead.length ; c++){
                html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiC[c]}</td>`
            }
            if(db.opsiD !== ""){
                html +=`</tr><tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">D.</td>`;
                for(c = 0 ; c < arrHead.length ; c++){
                    html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiD[c]}</td>`;
                }
                html +=`</tr>`
            }else{
                html +=`</tr>`
            }
        html +=`</tbody></table>`
        }
        html+=`</div><br><h3 style="text-align:center">Properti Soal</h3>
        <div class="w3-border w3-round-small w3-padding" style="overflow-x:auto">
            <table class="w3-table w3-small">
                <tr><td>ID Soal</td><td style="width:5px">:</td><td> ${db.idbaris}</td></tr>
                <tr><td>Kelas</td><td style="width:5px">:</td><td> ${db.jenjang}</td></tr>
                <tr><td>Mata Pelajaran</td><td style="width:5px">:</td><td> ${db.tekskodemapel}</td></tr>
                <tr><td>Kompetensi Dasar</td><td style="width:5px">:</td><td> ${db.tekskd}</td></tr>
                <tr><td>Lingkup Materi</td><td style="width:5px">:</td><td> ${db.ruanglingkup}</td></tr>
                <tr><td>Materi Pokok</td><td style="width:5px">:</td><td> ${db.materi}</td></tr>
                <tr><td>Bentuk Soal</td><td style="width:5px">:</td><td> ${db.bentuksoal}</td></tr>
                <tr><td>Level Kognitif</td><td style="width:5px">:</td><td> ${db.levelkognitif}</td></tr>
                <tr><td>Indikator Soal</td><td style="width:5px">:</td><td> ${db.indikatorsoal}</td></tr>
                <tr><td>Kunci Jawaban</td><td style="width:5px">:</td><td> ${db.kuncijawaban}</td></tr>
                <tr><td>Pembahasan/Penskoran</td><td style="width:5px">:</td><td> ${db.penskoran}</td></tr>
                <tr><td>Dibuat Oleh</td><td style="width:5px">:</td><td> ${db.oleh}</td></tr>
                <tr><td>Sumber Soal/Refrensi</td><td style="width:5px">:</td><td> ${db.refrensi}</td></tr>
            </table>
        </div>
            <hr>
        <h3 style="text-align:center">Penilaian Publik tentang Soal ini</h3>
        <div style="border:.5pt dotted #000;border-radius:30px;padding:5px;color:#000!important;background-color:#fdd!important;text-align:center">
            Rata-rata pengunjung memberikan rating (bintang) untuk Soal ini: <br>
                ${objekratingsoal.avrg_bntg}<br>
                <button class="w3-btn w3-pale-blue w3-border w3-round-large w3-bottombar w3-border-black w3-tiny" id="btn_lihattabelskor" onclick="togglepemberiskor('buka')">Lihat Detail Pemberi Skor</button>
                <table class="w3-hide w3-table garis w3-tiny" id="tabelpemberiskor" style="max-width:350px;margin:5px auto">
                <tr class="w3-light-grey">
                <th>Nama user</th>
                <th>Instansi</th>
                <th>Skor Bintang</th>
                </tr>
                ${objekratingsoal.htmltr}
                </table>
                <button class="w3-btn w3-pale-blue w3-border w3-round-large w3-bottombar w3-border-black w3-tiny w3-hide" id="btn_tutuptabelskor" onclick="togglepemberiskor('tutup')">Tutup Detail Pemberi Skor</button>
        </div>
            <br><br>`;
            html +=`<h3 style="text-align:center">Panel Diskusi Tentang Soal ini</h3>
        <div style="border:.5pt dotted #000;border-radius:10px;padding:5px;">`;
            if(src_komentar.length>0){
                for(let b =0; b < src_komentar.length ; b++){
                    let perobjek = src_komentar[b];
                    let keyperobjek = Object.keys(perobjek)[0];
                    let ang = keyperobjek.match(/(\d+)/)[0];
                    
                    let waktukomen = "time_komentator_"+ang;
                    let waktufullkomen = tanggalfulllengkap(new Date(src_komentar[b][waktukomen]));
                    
                    let isikomen = "isi_komentator_"+ang;
                    let idkomen = "id_komentator_"+ang;
                    let idbariskomen = perobjek.idbariskomen;
                    let idkomentator = perobjek[idkomen];
                    let komentatorsebenarnya = dataapigurutamu.filter(s => s.id == idkomentator)[0].guru_namalengkap
                    let src_gambar = dataapigurutamu.filter(s => s.id == idkomentator)[0].idpoto_potoguru
                    let siapakomen = "nama_komentator_"+ang;
                    // <i class="fa fa-user w3-left w3-padding w3-border w3-circle w3-margin-right w3-jumbo"></i>
                html+=`<div class="w3-container w3-card w3-white w3-round w3-margin">
                        <img alt="avatarkoment${ang}" src="https://drive.google.com/uc?export=view&id=${src_gambar}" onclick='klikpotosiswa(this)' style="width:60px;height:60px;float:left;margin:5px 8px;border:1px dotted #000;border-radius:50%;cursor:pointer" title="Klik poto untuk memperbesar gambar">
                        <span class="w3-right w3-opacity w3-tiny">${waktufullkomen}</span>
                        <h4>${komentatorsebenarnya}</h4><br>
                        <hr class="w3-clear">`
                        
                        if(idkomentator == idguru){
                            let idp = `p_komenke_${ang}`;
                            koleksiklikkomenowner.push(idp);            
                        html +=`<p class="w3-justify tangan p_komenke_${ang}" id="p_komenke_${ang}" onmouseover="this.classList.add('w3-border');this.classList.add('w3-padding')" onmouseout="this.classList.remove('w3-border');this.classList.remove('w3-padding')">
                        ${src_komentar[b][isikomen]}
                        </p>
                        <hr>
                        <div class="tomboleditkomenke_${ang} w3-tiny">
                        <button onclick="editkomentaritemsoal(${ang}, ${idbariskomen},${ibrs},'edit')"  class="w3-btn w3-round-large w3-pale-green fa fa-edit w3-bottombar w3-border-black" title="Edit Pesan ini"> Simpan Editan</button>
                        <button onclick="editkomentaritemsoal$({ang}, ${idbariskomen},${ibrs},'hapus')"  class="w3-btn w3-round-large w3-pale-green fa fa-trash w3-bottombar w3-border-black" title="Hapus Pesan ini"> Hapus</button><br>
                            Ini adalah komentar Anda, Jika ingin mengeditnya silakan klik pada teks komentar lalu klik tombol <b>Simpan Editan</b>.
                        </div>`;
                        }else{
                            html+=`<p class="w3-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat unde asperiores quisquam vitae nisi est omnis quae veritatis. Officiis ipsum vero quos est blanditiis perspiciatis magni dolorem esse eveniet. Itaque odit quidem, eos error veritatis, maxime voluptas optio dolore aliquam voluptatem corporis laboriosam eum, fuga non quaerat sequi vero neque.</p>`
                        }
                html +=`<p></p></div>`;
                    }
            }else{
                html+=`<h3 style="text-align:center">Belum Ada Diskusi untuk item soal ini</h3>`;
            }
            html+=`<hr>`;
       
    }
    elemenisi.innerHTML = html;
    let klikkomen = document.getElementById("komentarrating");
    if(klikkomen !==null){
        klikkomen.onclick = function(){
            isiteksunsurbanksoal("areaprint_soalkisidandesainsoallainnya", "komentarrating", "atas", "");
        }
    }
    if(koleksiklikkomenowner.length >0){
        for(let c = 0 ; c < koleksiklikkomenowner.length ; c++){
            
            let ele = document.getElementById(koleksiklikkomenowner[c]);
            ele.onclick = function(){
                isiteksunsurbanksoal("areaprint_soalkisidandesainsoallainnya", koleksiklikkomenowner[c], "atas", "");
            }

        }
    }
    let cekselectmodif = document.getElementById("modiflevelsoal");
    if(cekselectmodif !==null){
        cekselectmodif.value = db.levelkognitif;
    };
    let allEditableSoal = document.querySelectorAll("[data-modifikasi]");
    for(let i = 0 ; i < allEditableSoal.length ; i++){
        let teks = allEditableSoal[i].getAttribute("data-modifikasi");
        
        let tekskelas = "modifsoal_"+teks;

        let el = teks.indexOf("headerpg")>-1 || teks.indexOf("opsi")>-1?document.querySelectorAll("."+tekskelas):document.querySelector("."+tekskelas);
        
        let majemuk = teks.indexOf("headerpg")>-1 || teks.indexOf("opsi")>-1?true:false;
        
        if(majemuk){
            if(el.length>1){
                for(let j = 0 ; j < el.length ; j++){
                    if(el[j] !== null){
                        el[j].onclick = function(){
                            isiteksunsurbanksoal("areaprint_soalkisidandesainsoallainnya", tekskelas+j, "atas", "");
                        }
                    }
                }
            }else{
                el[0].onclick = function(){
                    isiteksunsurbanksoal("areaprint_soalkisidandesainsoallainnya", tekskelas, "atas", "");
                    
                }
            }
        }else{
            if(el !== null){
                el.onclick = function(){
                    isiteksunsurbanksoal("areaprint_soalkisidandesainsoallainnya", tekskelas, "atas", "");
                    
                }
            }
        }
    }

    printkan.onclick = null;
    wordkan.onclick = null;
    document.getElementById('modal_soalkisidandesainsoallainnya').scrollTo({ top: 43, behavior: 'smooth' });
}
const radiorating = (el,brs)=>{
    let label = document.querySelectorAll(".label_rating");
    let divinfo = document.querySelector(".infousermemberirating");
    if(el.checked){
        divinfo.innerHTML=`<img src="/img/barloading.gif"> Sedang mengirimkan rating ...`
        let labelid = el.id;
        let angka = labelid.match(/(\d+)/)[0];
        
        label.forEach(el=>{
            el.className = "label_rating fa fa-star-o tangan";
        })
        for(i=0;i<=angka;i++){
            label[i].className = label[i].className.replace("fa-star-o","fa-star")
        }
        
        let nilai = ((angka*1)+1);
        let datakirim = new FormData();
        datakirim.append("kondisi","rating");
        datakirim.append("idguru",idguru);
        datakirim.append("namauser",namauser);
        datakirim.append("idsoal",brs);
        datakirim.append("nilairating",nilai);
        fetch(url_kaldikaja+"?action=ratingdankomen",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
            databaseratingsoalkosong = [];
            keydatabaseratingsoal = Object.keys(r.data[0]);
            if(r.result>1){
                databaseratingsoal = r.data;
            }
            let ob = {}
            for(i=0 ; i < keydatabaseratingsoal.length; i++){
                ob[keydatabaseratingsoal[i]]="";
            }
            databaseratingsoalkosong.push(ob);
            updatetabeldatabasesoal("edit");
            modalbanksoaleditable(brs,'lihat')
            // divinfo.innerHTML="Terimakasih sudah memberikan rating soal"
            let hapusrating = document.querySelector(".hapusrating");
            if(hapusrating !== null && hapusrating.className.indexOf("w3-hide")>-1){
                hapusrating.classList.remove("w3-hide")
             }
        }).catch(er => console.log(er))

    }
}
const fungsirating = (ibrs)=>{
    let dd = databaseratingsoal.filter(s=> s.idsoal == ibrs);
    // console.log(ibrs);
    // console.log(dd);
    let html =""
    if(dd.length !== 0){
        let d = dd[0];
        let cektot = Object.keys(d).filter(s=> {
                let cek = s.indexOf("rating_komentator_");
                if(cek >-1 && d[s] !==""){
                    return true
                }
                
                //return resu
            });
            
        let bFul="";
        if(cektot.length>0){

            let tot = Object.keys(d).filter(s=> s.indexOf("rating_komentator_")>-1 && d[s] !=="").map(m=> d[m]).reduce((a,b)=>a+b);
            
            let uTot = Object.keys(d).filter(s=> s.indexOf("rating_komentator_")>-1 && d[s] !=="").length;
             bFul = Math.floor(tot/uTot);
            let bHalf = tot%bFul;
            let bTot = 5%bFul;
            if(bHalf == 0){
                for(i = 0 ; i < bFul ; i++){
                    html +=`<i class="fa fa-star"></i>`
                }
                for(j = 0 ; j < bTot ; j++){
                    html +=`<i class="fa fa-star-o"></i>`
                }
            }else{
                for(i = 0 ; i < bFul ; i++){
                    html +=`<i class="fa fa-star"></i>`
                }
                for(j = 0 ; j < bTot ; j++){
                    if(j == 0){
                        html +=`<i class="fa fa-star-half-o"></i>`

                    }else{
                        html +=`<i class="fa fa-star-o"></i>`

                    }
                }
            }
            html +=`<br><span class="w3-tiny">Rata-rata rating ${bFul} bintang dari ${cektot.length} Pemberi skor.</span>`
        }else{
            html+=`<i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><br><span class="w3-tiny">Belum Ada skor</span>`;
        }
            
    
    }else{
        html = `<i class="fa fa-star-o"></i>
            <i class="fa fa-star-o"></i>
            <i class="fa fa-star-o"></i>
            <i class="fa fa-star-o"></i>
            <i class="fa fa-star-o"></i><br><span class="w3-tiny">Belum Ada yang memberikan skor atau komentar</span>`;
    }
    
    // let html = `<i class="fa fa-star-o"></i>
    // <i class="fa fa-star-o"></i>
    // <i class="fa fa-star-o"></i>
    // <i class="fa fa-star-o"></i>
    // <i class="fa fa-star-o"></i><br>rata-rata dari 0 penilai`;
    return html
}
const ob_ratinguser = (ibrs)=>{
    /** Yang dikembalikan berupa objek dengan key:
     * infouser = infouser;
     * rating = giveRate
     * rata-rata bintang = avrg_bntg
     * totalpemberinilai = userTotal
     * datapemberiskor = tr_UserScore
     */
    let ret = {};
    let htmlinfo = "Anda belum memberikan rating untuk soal ini. Apresiasikan soal ini untuk membantu kami atas kelayakan penyusunan soal yang telah disusun penyusun soal."
   

    let dd = databaseratingsoal.filter(s=> s.idsoal == ibrs);
    
    let html ="";
    let html_tr ="";
    let htmlgiverate = "";
    let komentar = [];
    if(dd.length !== 0){
        let d = dd[0];
        let cektot = Object.keys(d).filter(s=> {
            let cek = s.indexOf("rating_komentator_");
            if(cek >-1 && d[s] !==""){
                return true
            }
            
            //return resu
        })
    
    if(cektot.length>0){

        let tot = Object.keys(d).filter(s=> s.indexOf("rating_komentator_")>-1 && d[s] !=="").map(m=> d[m]).reduce((a,b)=>a+b);
        
        let uTot = Object.keys(d).filter(s=> s.indexOf("rating_komentator_")>-1 && d[s] !=="").length;
        let bFul = Math.floor(tot/uTot);
        let bHalf = tot%bFul;
        let bTot = 5%bFul;
        if(bHalf == 0){
            for(i = 0 ; i < bFul ; i++){
                html +=`<i class="fa fa-star"></i>`
            }
            for(j = 0 ; j < bTot ; j++){
                html +=`<i class="fa fa-star-o"></i>`
            }
        }else{
            for(i = 0 ; i < bFul ; i++){
                html +=`<i class="fa fa-star"></i>`
            }
            for(j = 0 ; j < bTot ; j++){
                if(j == 0){
                    html +=`<i class="fa fa-star-half-o"></i>`

                }else{
                    html +=`<i class="fa fa-star-o"></i>`

                }
            }
        }
        html +=`<br><b><span class="w3-tiny">Rata-rata rating ${bFul} bintang dari ${uTot} Pemberi skor.</span></b>`;
    }else{
        html+=`<i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i>`;
        
    }
        if(cektot == 0){
            html_tr+=`<tr><td colspan="3">Tidak ada skor</td></tr>`;
            
        }else{
            for(let j = 0 ; j < cektot.length ; j++){
                let nama = cektot[j].replace("rating_komentator_","nama_komentator_");//+uToti[j];
                let idtamu =cektot[j].replace("rating","id");// "id_komentator_"+uToti[j];
                let nsko = cektot[j];//"rating_komentator_"+uToti[j];
                let jb = parseInt(d[nsko]);
                let instansi = dataapigurutamu.filter(s => s.id == d[idtamu])[0].sekolah;
                
                html_tr +=`<tr>
                <td>${d[nama]}</td>
                <td>${instansi}</td>
                <td>`
                for(l = 0 ; l < jb ; l++ ){
                    html_tr +=`<i class="fa fa-star"></i>`
                }
                html_tr+=`</td>
                </tr>`
            }
        }

        let ratinguserini0,ratinguserini = Object.keys(d).filter(s=> s.indexOf("id_komentator_")>-1 && d[s] ==idguru)
        let indekuserini, cekindekuserini;
        if(ratinguserini.length !== 0){
            ratinguserini0 = ratinguserini[0];//
            cekindekuserini = ratinguserini0.match(/(\d+)/);
            if(cekindekuserini == null){
                htmlinfo = "Anda belum pernah memberikan skor:"
                htmlgiverate = `<label for="rating_0" class="label_rating fa fa-star-o tangan"></label>
                <label for="rating_1" class="label_rating fa fa-star-o tangan"></label>
                <label for="rating_2" class="label_rating fa fa-star-o tangan"></label>
                    <label for="rating_3" class="label_rating fa fa-star-o tangan"></label>
                    <label for="rating_4" class="label_rating fa fa-star-o tangan"></label>
                    <input type="radio" id="rating_0" onchange="radiorating(this,'${ibrs}')" class="w3-hide" name="radio_rating">
                    <input type="radio" id="rating_1" onchange="radiorating(this,'${ibrs}')" class="w3-hide" name="radio_rating">
                    <input type="radio" id="rating_2" onchange="radiorating(this,'${ibrs}')" class="w3-hide" name="radio_rating">
                    <input type="radio" id="rating_3" onchange="radiorating(this,'${ibrs}')" class="w3-hide" name="radio_rating">
                    <input type="radio" id="rating_4" onchange="radiorating(this,'${ibrs}')" class="w3-hide" name="radio_rating">`;
            }else{
                indekuserini = cekindekuserini[0];
                let skoruser = parseInt(d["rating_komentator_"+indekuserini]);
                let sisa = 5 - skoruser;
                let htmlus = "";
                for(i=0; i < 5 ; i++){
                    if(i < skoruser){
                        htmlus+=`<label for="rating_${i}" class="label_rating fa fa-star tangan"></label>`
                    }else{
                        htmlus +=`<label for="rating_${i}" class="label_rating fa fa-star-o tangan"></label>`
                    }
                }
                htmlus+=`<input type="radio" id="rating_0" onchange="radiorating(this,'${ibrs}')" class="w3-hide" name="radio_rating">
                <input type="radio" id="rating_1" onchange="radiorating(this,'${ibrs}')" class="w3-hide" name="radio_rating">
                <input type="radio" id="rating_2" onchange="radiorating(this,'${ibrs}')" class="w3-hide" name="radio_rating">
                <input type="radio" id="rating_3" onchange="radiorating(this,'${ibrs}')" class="w3-hide" name="radio_rating">
                <input type="radio" id="rating_4" onchange="radiorating(this,'${ibrs}')" class="w3-hide" name="radio_rating">`;
                htmlinfo = "Terimakasih telah memberikan rating untuk soal ini:<br>";
                htmlgiverate = htmlus;
                let hapusrating = document.querySelector(".hapusrating");
                if(hapusrating !==null && hapusrating.className.indexOf("w3-hide")>-1){
                    hapusrating.classList.remove("w3-hide")
                }
            }

        }else{
            htmlinfo = "Anda belum pernah memberikan skor:"
            htmlgiverate = `<label for="rating_0" class="label_rating fa fa-star-o tangan"></label>
            <label for="rating_1" class="label_rating fa fa-star-o tangan"></label>
            <label for="rating_2" class="label_rating fa fa-star-o tangan"></label>
            <label for="rating_3" class="label_rating fa fa-star-o tangan"></label>
            <label for="rating_4" class="label_rating fa fa-star-o tangan"></label>
            <input type="radio" id="rating_0" onchange="radiorating(this,'${ibrs}')" class="w3-hide" name="radio_rating">
            <input type="radio" id="rating_1" onchange="radiorating(this,'${ibrs}')" class="w3-hide" name="radio_rating">
            <input type="radio" id="rating_2" onchange="radiorating(this,'${ibrs}')" class="w3-hide" name="radio_rating">
            <input type="radio" id="rating_3" onchange="radiorating(this,'${ibrs}')" class="w3-hide" name="radio_rating">
            <input type="radio" id="rating_4" onchange="radiorating(this,'${ibrs}')" class="w3-hide" name="radio_rating">`;
        }
        
            array_komen = Object.keys(d).filter(s=> s.indexOf("isi_komentator_")>-1 && d[s] !=="");
            
            if(array_komen.length > 0){
                //array_komen.forEach(m=>objkomen[m]=d[m]);
                
                for(let a = 0 ; a < array_komen.length ; a++){
                    let m = array_komen[a];
                    let objekitem = {}
                    let huruf = array_komen[a].replace("isi_komentator_","");
                    let k_iduser = "id_komentator_"+huruf;
                    let k_namauser = "nama_komentator_"+huruf;
                    let k_waktu = "time_komentator_"+huruf;
                    objekitem[m] = d[m];
                    objekitem[k_iduser] = d[k_iduser];
                    objekitem[k_namauser] = d[k_namauser];
                    objekitem.idbariskomen = d.idbaris;
                    objekitem[k_waktu] = d[k_waktu];
                    // itemkomen.push(objekitem)
                    komentar.push(objekitem);
                }
            }
    }else{
        html = "TIDAK ADA SKOR";
        html_tr =`<tr><td colspan="3">Tidak ada skor</td></tr>`;
        htmlgiverate = `<label for="rating_0" class="label_rating fa fa-star-o tangan"></label>
            <label for="rating_1" class="label_rating fa fa-star-o tangan"></label>
            <label for="rating_2" class="label_rating fa fa-star-o tangan"></label>
            <label for="rating_3" class="label_rating fa fa-star-o tangan"></label>
            <label for="rating_4" class="label_rating fa fa-star-o tangan"></label>
            <input type="radio" id="rating_0" onchange="radiorating(this,'${ibrs}')" class="w3-hide" name="radio_rating">
            <input type="radio" id="rating_1" onchange="radiorating(this,'${ibrs}')" class="w3-hide" name="radio_rating">
            <input type="radio" id="rating_2" onchange="radiorating(this,'${ibrs}')" class="w3-hide" name="radio_rating">
            <input type="radio" id="rating_3" onchange="radiorating(this,'${ibrs}')" class="w3-hide" name="radio_rating">
            <input type="radio" id="rating_4" onchange="radiorating(this,'${ibrs}')" class="w3-hide" name="radio_rating">`;

    }
    ret.infouser = htmlinfo
    ret.giveRate = htmlgiverate;
    ret.avrg_bntg = html;
    ret.htmltr = html_tr;
    ret.komentar = komentar;
    return ret
}
const klik_hapusrating = (ibrs)=>{
    let nilai = "";
    let datakirim = new FormData();
        datakirim.append("kondisi","rating");
        datakirim.append("idguru",idguru);
        datakirim.append("namauser",namauser);
        datakirim.append("idsoal",ibrs);
        datakirim.append("nilairating",nilai);
        fetch(url_kaldikaja+"?action=ratingdankomen",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
            console.log(r);
            databaseratingsoalkosong = [];
            keydatabaseratingsoal = Object.keys(r.data[0]);
            if(r.result>1){
                databaseratingsoal = r.data;
            }
            let ob = {}
            for(i=0 ; i < keydatabaseratingsoal.length; i++){
                ob[keydatabaseratingsoal[i]]="";
            }
            databaseratingsoalkosong.push(ob);
            // divinfo.innerHTML="Terimakasih sudah memberikan rating soal"
            updatetabeldatabasesoal("edit");
            modalbanksoaleditable(ibrs,'lihat')
            let hapusrating = document.querySelector(".hapusrating");
            if(hapusrating !== null && hapusrating.className.indexOf("w3-hide")>-1){
                hapusrating.classList.remove("w3-hide")
            }

        }).catch(er => console.log(er))
        
}
const togglepemberiskor = (kondisi) =>{
    if(kondisi == "buka"){
        document.getElementById('tabelpemberiskor').classList.remove('w3-hide');
        document.getElementById('btn_tutuptabelskor').classList.remove('w3-hide');
        document.getElementById('btn_lihattabelskor').classList.add('w3-hide');
    }else{
        document.getElementById('tabelpemberiskor').classList.add('w3-hide');
        document.getElementById('btn_tutuptabelskor').classList.add('w3-hide');
        document.getElementById('btn_lihattabelskor').classList.remove('w3-hide');
    }
}
const kirimmodifikasisoal = (ibrs)=>{
    let datawal = databasesoal.filter(s => s.idbaris == ibrs)[0];
    let datamodif = document.querySelectorAll("[data-modifikasi]");
    let arrayClass = [];
    let valuemodif = {};
    for(let i = 0 ; i < datamodif.length;i++){
        let value = datamodif[i].getAttribute("data-modifikasi");
        arrayClass.push("modifsoal_"+value);
        if(datamodif[i].nodeName == "INPUT" || datamodif[i].nodeName == "SELECT"){
            
            valuemodif[value] = datamodif[i].value;
        }else{
            valuemodif[value] = datamodif[i].innerHTML;
        }
       
        }
            
            
    let arrayperbaikan = arrayClass.filter((x,i,a)=>a.indexOf(x) !== i);
    if(datawal.tampilanpg == "TABEL"){
        
        let arrayduplikat = arrayClass.filter((x,i,a)=>a.indexOf(x) !== i);
       
        if(arrayduplikat.length>0){

            for(let i = 0 ; i < arrayduplikat.length ; i++){
                let tekskelas = arrayduplikat[i].replace("modifsoal_","");
            let ele = document.querySelectorAll("."+arrayduplikat[i]);
            let arrayopsisementara = [];
            
            for(let x = 0; x < ele.length ; x++){
                arrayopsisementara.push(ele[x].innerHTML)
            }
            
            valuemodif[tekskelas] = JSON.stringify(arrayopsisementara);
            
            }
        }else{
            let o_a = document.querySelector(".modifsoal_opsiA").innerHTML;
            let o_b = document.querySelector(".modifsoal_opsiB").innerHTML;
            let o_c = document.querySelector(".modifsoal_opsiC").innerHTML;
            let o_dd = document.querySelector(".modifsoal_opsiD");
            let o_d =""
            
            valuemodif.opsiA = JSON.stringify([o_a]);
            valuemodif.opsiB = JSON.stringify([o_b]);
            valuemodif.opsiC = JSON.stringify([o_c]);
            if(o_dd !== null){
                o_d = o_dd.innerHTML;
                valuemodif.opsiD = JSON.stringify([o_d]);
                
            }
        }
    }
    let divanim = document.querySelector(".areaprint_soalkisidandesainsoallainnya");
    divanim.innerHTML = `<img src="/img/barloading.gif"> Proses ...`
    
    valuemodif.idguru = idguru;
    valuemodif.oleh = namauser;
    let obAs = Object.assign({},datawal);
    let obJadi = Object.assign(obAs,valuemodif);
    
    let key = JSON.stringify(Object.keys(obJadi))
    let nilai = Object.values(obJadi);
    nilai.shift()
    let tabel = JSON.stringify (nilai)
    let tab = "banksoal";
    
    let datakirim = new FormData()
    datakirim.append("tab",tab);
    datakirim.append("key",key);
    datakirim.append("tabel",tabel);
    
    fetch(url_kaldikaja+"?action=simpanbarisketaburut",{
        method:"post",
        body:datakirim
    }).then(m => m.json())
    .then(r => {
        
        divanim.innerHTML = "Berhasil terkirim";
        
        keydatabasesoal = Object.keys(r.data[0]);
        if(r.result>1){
            databasesoal = r.data.filter(s=> s.hapus == "");
            databasesoalall = r.data
            databasesoalterhapus = r.data.filter(s=> s.hapus == "hapus");
        }
        for(i=0 ; i < keydatabasesoal.length; i++){
            databasesoalkosong[keydatabasesoal[i]]="";
        }
        alert("Data Berhasil dimodifikasi");
        updatetabeldatabasesoal("edit");
        document.getElementById('modal_soalkisidandesainsoallainnya').style.display='none';
        document.getElementById('tooltipbaru_keyboard_ketikan').style.display='none';
        
    }).catch(er=>console.log(er));
}
const kirimpengeditansoal = (ibrs)=>{
    let datawal = databasesoal.filter(s => s.idbaris == ibrs)[0];
    let datamodif = document.querySelectorAll("[data-modifikasi]");
    let arrayClass = [];
    let valuemodif = {};
    for(let i = 0 ; i < datamodif.length;i++){
        let value = datamodif[i].getAttribute("data-modifikasi");
        arrayClass.push("modifsoal_"+value);
        if(datamodif[i].nodeName == "INPUT" || datamodif[i].nodeName == "SELECT"){
            valuemodif[value] = datamodif[i].value;
        }else{
            valuemodif[value] = datamodif[i].innerHTML;
        }
    }
            
            
    let arrayperbaikan = arrayClass.filter((x,i,a)=>a.indexOf(x) !== i);
    if(datawal.tampilanpg == "TABEL"){
        
        let arrayduplikat = arrayClass.filter((x,i,a)=>a.indexOf(x) !== i);
        console.log(arrayduplikat)
        if(arrayduplikat.length>0){

            for(let i = 0 ; i < arrayduplikat.length ; i++){
                let tekskelas = arrayduplikat[i].replace("modifsoal_","");
            let ele = document.querySelectorAll("."+arrayduplikat[i]);
            let arrayopsisementara = [];
            
            for(let x = 0; x < ele.length ; x++){
                arrayopsisementara.push(ele[x].innerHTML)
            }
            
            valuemodif[tekskelas] = JSON.stringify(arrayopsisementara);
            
            }
        }else{
            let o_a = document.querySelector(".modifsoal_opsiA").innerHTML;
            let o_b = document.querySelector(".modifsoal_opsiB").innerHTML;
            let o_c = document.querySelector(".modifsoal_opsiC").innerHTML;
            let o_dd = document.querySelector(".modifsoal_opsiD");
            let o_d =""
            
            valuemodif.opsiA = JSON.stringify([o_a]);
            valuemodif.opsiB = JSON.stringify([o_b]);
            valuemodif.opsiC = JSON.stringify([o_c]);
            if(o_dd !== null){
                o_d = o_dd.innerHTML;
                valuemodif.opsiD = JSON.stringify([o_d]);
                
            }
        }
    }
    
   
    
    valuemodif.idguru = idguru;
    valuemodif.oleh = namauser;
    let divanim = document.querySelector(".areaprint_soalkisidandesainsoallainnya");
    divanim.innerHTML = `<img src="/img/barloading.gif"> Proses ...`
    let obAs = Object.assign({},datawal);
    let objekKirim = Object.assign(obAs,valuemodif);
        let iBaris = ibrs;
        let key = Object.keys(objekKirim);
        let val = Object.values(objekKirim);
        //val.shift();
        let datakirim = new FormData();
        datakirim.append("idbaris",iBaris);
        datakirim.append("tabel", JSON.stringify(val));
        datakirim.append("key",JSON.stringify(key));
        datakirim.append("tab","banksoal");
        //animasi loading:
        
        fetch(jlo.url_dataabsen+"?action=simpanbarisketabidbaris",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
            divanim.innerHTML = "Berhasil diedit";
            keydatabasesoal = Object.keys(r.data[0]);
        if(r.result>1){
            databasesoal = r.data.filter(s=> s.hapus == "");
            databasesoalall = r.data

            databasesoalterhapus = r.data.filter(s=> s.hapus == "hapus");
        }
        for(i=0 ; i < keydatabasesoal.length; i++){
            databasesoalkosong[keydatabasesoal[i]]="";
        }
        alert("Data Berhasil diEdit");
        updatetabeldatabasesoal("edit");
        document.getElementById('modal_soalkisidandesainsoallainnya').style.display='none';
        document.getElementById('tooltipbaru_keyboard_ketikan').style.display='none';
        })
        .catch(er =>console.log(er))
}
const updatetabeldatabasesoal = (kondisi) =>{
    let tabel = document.querySelector(".tabelpilihandbsoal");
            let tabelbody = tabel.getElementsByTagName("tbody")[0];
            let tabelhead = tabel.getElementsByTagName("thead")[0];
            
            let tbHead, tbBody;
        if(kondisi == "edit"){
                tbHead =`<tr class="w3-light-gray"><th>No.<br>Urut</th><th>Kelas</th><th>Dibuat Oleh</th><th>Mata Pelajaran</th><th>Preview Soal</th><th>Bentuk Soal</th><th>Kualitas Soal (Rating)</th><th>Aksi</th></tr>`;
                tbBody = ``;
                let dbb = databasesoal;
                let rating="";// = fungsirating();
                for(let i = 0 ; i < dbb.length ; i++){
                    
                    rating = fungsirating(dbb[i].idbaris);
                    tbBody +=`<tr><td class="w3-center">${i+1}</td><td class="w3-center">${dbb[i].jenjang}</td><td class="w3-center">${dbb[i].oleh}</td><td>${dbb[i].tekskodemapel}</td>`
                    if(dbb[i].ilustrasi == "" || dbb[i].ilustrasi == `<div><br></div>`){

                        tbBody +=`<td class="w3-tiny"><div style="width:360px;overflow-x:auto">${dbb[i].pertanyaan}</div></td>`;
                    }else{

                        tbBody +=`<td class="w3-tiny"><div style="width:360px;overflow-x:auto">${dbb[i].ilustrasi}</div></td>`;
                    }
                    tbBody +=`<td>${dbb[i].bentuksoal}</td><td>${rating}</td><td><button class="w3-button w3-yellow w3-bottombar w3-border-black w3-round" onclick="modalbanksoaleditable('${dbb[i].idbaris}','lihat')" title="Lihat item soal"><i class="fa fa-eye"></i></button><button class="w3-button w3-blue w3-bottombar w3-border-black w3-round" onclick="modalbanksoaleditable('${dbb[i].idbaris}','modifikasi')" title="Modifikasi soal ini menjadi item soal baru di database. Item soal sebelumnya masih tetap ada."><i class="fa fa-edit"></i></button>`;
                    if(dbb[i].idguru == idguru){
                        tbBody +=`<button class="w3-button w3-green w3-bottombar w3-border-black w3-round" onclick="modalbanksoaleditable('${dbb[i].idbaris}','edit')"  title="Karena ini buatan Anda, Anda bisa mengeditnya"><i class="fa fa-gear"></i></button><button class="w3-button w3-light-grey w3-bottombar w3-border-black w3-round" onclick="modalbanksoalhapus('${dbb[i].idbaris}','hapus')"  title="Karena ini buatan Anda, Anda bisa menghapusnya"><i class="fa fa-trash"></i></button>`;
                    }
                    tbBody +=`</td></tr>`;
                }
        }else{
            tbHead =`<tr><td colspan="7" style="text-align:center">Data Soal yang dihapus</td></tr><tr class="w3-light-gray">
                <th>No.<br>Urut</th>
                <th>Kelas</th>
                <th>Dibuat Oleh</th>
                <th>Mata Pelajaran</th>
                <th>Preview Soal</th>
                <th>Kualitas Soal (Rating)</th>
                <th>Aksi</th></tr>`;
                tbBody = ``;
                let dbb = databasesoalterhapus;
                for(i=0 ; i < dbb.length ; i++){
                    tbBody +=`<tr><td class="w3-center">${(i+1)}</td>
                    <td class="w3-center">${dbb[i].jenjang}</td>
                    <td class="w3-center">${dbb[i].oleh}</td>
                    <td>${dbb[i].tekskodemapel}</td>`
                    if(dbb[i].ilustrasi == "" || dbb[i].ilustrasi == `<div><br></div>`){

                        tbBody +=`<td class="w3-tiny"><div style="width:360px;overflow-x:auto">${dbb[i].pertanyaan}</div></td>`;
                    }else{

                        tbBody +=`<td class="w3-tiny"><div style="width:360px;overflow-x:auto">${dbb[i].ilustrasi}</div></td>`;
                    }
                    tbBody +=`<td></td>
                    <td>
                    <button class="w3-button w3-yellow w3-bottombar w3-border-black w3-round" onclick="modalbanksoaleditable('${dbb[i].idbaris}','lihatterhapus')" title="Lihat item soal"><i class="fa fa-eye"></i></button>
                    <button class="w3-button w3-blue w3-bottombar w3-border-black w3-round" onclick="modalbanksoalhapus('${dbb[i].idbaris}','')" title="kembalikan soal ini menjadi item soal ini. Jika ini bukan buatan Anda, maka otomatis soal ini akan menjadi buatan Anda."><i class="fa fa-undo"></i></button>`;
                    
                    tbBody +=`</td></tr>`;
                }
        }
            tabelhead.innerHTML = tbHead;
            tabelbody.innerHTML = tbBody;
}
const modalbanksoalhapus = (ibrs,hapus) =>{
    let teks = "";
    let data ;
    if(hapus == "hapus"){
        teks = `Anda yakin ingin menghapus item soal ini? Mungkin saja guru lain menggunakan item soal ini untuk Desain Naskah Soalnya. Jika ini dihapus, maka guru yang telah mendesain soal ini akan tidak muncul.`;
        data = databasesoal.filter(s=> s.idbaris = ibrs)[0];
    }else{
        teks = `Anda yakin ingin mengembalikan item soal ini?`;
        data = databasesoalterhapus.filter(s=> s.idbaris = ibrs)[0];
    }
    let con = confirm(teks);
    if(!con){
        return
    }
    
        let objekKirim = Object.assign({},data);
        objekKirim.hapus= hapus;
        objekKirim.idguru= idguru;
        objekKirim.oleh= namauser;
        let iBaris = ibrs;
        let key = Object.keys(objekKirim);
        let val = Object.values(objekKirim);
        //val.shift();
        let datakirim = new FormData();
        datakirim.append("idbaris",iBaris);
        datakirim.append("tabel", JSON.stringify(val));
        datakirim.append("key",JSON.stringify(key));
        datakirim.append("tab","banksoal");
        //animasi loading:
        fetch(jlo.url_dataabsen+"?action=simpanbarisketabidbaris",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
            if(r.result>1){
                databasesoal = r.data.filter(s=> s.hapus == "");
                databasesoalall = r.data;
                
                databasesoalterhapus = r.data.filter(s=> s.hapus == "hapus");
            }
            for(i=0 ; i < keydatabasesoal.length; i++){
                databasesoalkosong[keydatabasesoal[i]]="";
            }
            alert("Data Berhasil diupdate");
            if(hapus == ""){
                updatetabeldatabasesoal("hapus");
            }else{
                updatetabeldatabasesoal("edit");
            }
            document.getElementById('modal_soalkisidandesainsoallainnya').style.display='none';
            document.getElementById('tooltipbaru_keyboard_ketikan').style.display='none'
        })
        .catch(er =>console.log(er))
}

const komentarinitemsoal = (ibrs)=>{
    let time = new Date();
    let isikomen = document.getElementById("komentarrating").innerHTML;
        let datakirim = new FormData();
        datakirim.append("kondisi","komentar");
        datakirim.append("idguru",idguru);
        datakirim.append("namauser",namauser);
        datakirim.append("idsoal",ibrs);
        datakirim.append("time",time);
        datakirim.append("isikomen",isikomen);
        document.querySelector(".areaprint_soalkisidandesainsoallainnya").innerHTML  = `<img src="/img/barloading.gif"> Loading ...`
        fetch(url_kaldikaja+"?action=ratingdankomen",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
            databaseratingsoalkosong = [];
            keydatabaseratingsoal = Object.keys(r.data[0]);
            if(r.result>1){
                databaseratingsoal = r.data;
            }
            let ob = {}
            for(i=0 ; i < keydatabaseratingsoal.length; i++){
                ob[keydatabaseratingsoal[i]]="";
            }
            databaseratingsoalkosong.push(ob);
            updatetabeldatabasesoal("edit");
            modalbanksoaleditable(ibrs,'lihat')
            // divinfo.innerHTML="Terimakasih sudah memberikan rating soal"
            let hapusrating = document.querySelector(".hapusrating");
            if(hapusrating !== null && hapusrating.className.indexOf("w3-hide")>-1){
                hapusrating.classList.remove("w3-hide")
             }
        }).catch(er => console.log(er))
}
const editkomentaritemsoal = (ang, idbariskomen,ibrs,kondisi) =>{
    let time;
    let isikomen;
    if(kondisi == "edit"){
        time = new Date();
        isikomen = document.getElementById("p_komenke_"+ang).innerHTML;
    }else{
        time = "";
        isikomen = "";
    }
    
    let datakirim = new FormData();
        datakirim.append("kondisi","editkomen");
        datakirim.append("idguru",idguru);
        datakirim.append("namauser",namauser);
        datakirim.append("idsoal",ibrs);
        datakirim.append("time",time);
        datakirim.append("isikomen",isikomen);
        datakirim.append("komentarke",parseInt(ang));

    document.querySelector(".areaprint_soalkisidandesainsoallainnya").innerHTML  = `<img src="/img/barloading.gif"> Loading ...`
    fetch(url_kaldikaja+"?action=ratingdankomen",{
            method:"post",
            body:datakirim})
    .then(m => m.json())
    .then(r => {
        
        databaseratingsoalkosong = [];
            keydatabaseratingsoal = Object.keys(r.data[0]);
            if(r.result>1){
                databaseratingsoal = r.data;
            }
            let ob = {}
            for(i=0 ; i < keydatabaseratingsoal.length; i++){
                ob[keydatabaseratingsoal[i]]="";
            }
            databaseratingsoalkosong.push(ob);
            updatetabeldatabasesoal("edit");
            modalbanksoaleditable(ibrs,'lihat')
            
        let hapusrating = document.querySelector(".hapusrating");
            if(hapusrating !== null && hapusrating.className.indexOf("w3-hide")>-1){
                hapusrating.classList.remove("w3-hide")
            }
        }).catch(er => console.log(er))

} 
////////////////////// dari sini aja jdulu!
const ambilscreenshotljk = (part)=>{
    let kameranyaaktif = strimingljk.active;
    
    if(!kameranyaaktif){
        start_kameraLJK(part);
        return
    }
    posisiScreenshot.getContext('2d').drawImage(posisikamera, 0, 0,posisiScreenshot.width, posisiScreenshot.height);
    // posisiScreenshot.getContext('2d').drawImage(posisikamera, 0, 0,350, 550);
    
    
    document.querySelector(".patokan_tabelPG").style.width="100%"
    
    let elemenvideo = document.querySelectorAll(".canvas_ljk");
    
    elemenvideo.forEach(el =>{
        if(el.className.indexOf("w3-hide")==-1){
            el.classList.add("w3-hide")
        }
    });
    // document.querySelector(".patokan_PG").classList.add("w3-hide");
    posisiScreenshot.classList.remove("w3-hide");
    if (strimingljk == "") {
        alert("Mohon tunggu, proses loading sedang berlangsung....");
        return
    }
    
    strimingljk.getTracks().forEach(k => k.stop());
    // setTimeout(()=>{
        
    // },1000)
    cekPosisiLJSiswa(part);
}
function balikinkuncikdscanner(objek){
    let key = Object.keys(objek);
    let val = Object.values(objek).reduce((a, b) => a.concat(b));
    return {"key":key,"val":val}
}
let bolean_kirimakhirscanner = false;
const selesaiambilscreenshot = (idsiswa,indekkronologijson)=>{
    let kamerharusmatidulu = strimingljk.active;
    if(kamerharusmatidulu){
        alert("Maaf, Kamera Anda sedang aktif.");
        return
    }
    
    
    let divinfo = document.querySelector(".info_fokusscanerLJK");
    divinfo.innerHTML = `<i class="fa fa-spin fa-spinner w3-large"></i> Memproses Kunci Jawaban soal ...`;
    let objeksiswa = jsondatasiswa.filter(d => d.id == idsiswa)[0];
    //show hide bagian intinya dulu:
    let fokus_scaner = document.querySelector(".fokus_scaner");
    
    let hasilakhirljkscanner = document.querySelector(".hasilakhirljkscanner");
    if(fokus_scaner.className.indexOf("w3-hide")==-1){
        fokus_scaner.classList.add("w3-hide");
        document.querySelector(".tombolaksi_scannerljk").classList.add("w3-hide");
        hasilakhirljkscanner.classList.remove("w3-hide");
    }

    let par = indekkronologijson;
    let datamateri = kronologijson;
    kodebarismateriyangdikerjakan = datamateri[par].idbaris;
    
    //console.log(datamateri);

    let versi = datamateri[par].versi;
    let dlo = datamateri[par];
    let objekkuncikd = JSON.parse(dlo.kuncikd);
    let objektes = ubahjsonkuncikd(objekkuncikd)
    
    let mkd = (dlo.kuncikd == "undefined" || dlo.kuncikd == "") ? [] : Object.keys(JSON.parse(dlo.kuncikd));
    let str = "";
    if(dlo.jenistagihan == "ustertulis"||dlo.jenistagihan == "uspraktek"){
        mkd.forEach(s => str += s.split("_")[0]  + "<br/>");
    }else{
        mkd.forEach(s => str += s.split("_")[0] + " KD " + s.split("_")[1] + "<br/>");
    }

    let adapg = (datamateri[par].jumlahpg == 0) ? false : true;
    let countPG = parseInt(datamateri[par].jumlahpg);
    let countEssay = parseInt(datamateri[par].jumlahessay);
    let jumlahsoal = (datamateri[par].jumlahpg * 1) + (datamateri[par].jumlahessay * 1);
    let kkc=[], kc;
    let tempatperikspg = document.querySelector(".tempatperikspg");
    let tempatinfoawal = document.querySelector(".tempatinfoawal");
    let tempatperiksaessay = document.querySelector(".tempatperiksaessay");
    let formatljknotepadscanner = document.querySelector(".formatljknotepadscanner");
    let tombollihatpg = document.querySelector(".tombollihatpg"); 
    let tombollihatessay = document.querySelector(".tombollihatessay"); 
    let tombolcetakscanner = document.querySelector(".tombolcetakscanner"); 
    let tombolshowformatljk = document.querySelector(".tombolshowformatljk");
    let tombolcekawal = document.querySelector(".tombolcekawal");

        tempatperikspg.innerHTML = "";
        tempatinfoawal.innerHTML = "";
        tempatperiksaessay.innerHTML = "";
        formatljknotepadscanner.innerHTML = "";
        tombollihatessay.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Periksa Essay`;
        tombolcetakscanner.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Cetak`;
        tombollihatpg.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Periksa PG`;
        tombolshowformatljk.innerHTML = `<i class="fa fa-spin fa-spinner"></i> LJK`;
    let html="", html0="";
    let htmlprev = "";
    
    $.getJSON(constpreviewljk + "?idmateri=" + datamateri[par].idmateri + "&action=previewriwayat", function (json) {
        bolean_kirimakhirscanner = true;
        let teks = (versi == "baru"?brkline(json).teks : brkline2(json).teks); 
        if (adapg) {
            kc = brkline(json).kunci;
            kkc = window.atob(kc).split(",");//.join("<br>");
            
            
        } else {
            kc = 0;
            // kkc ="blank"
        }
        divinfo.innerHTML = "" ;//+ kkc.length ;//+" Kunci Jawaban: "+ kkc.join(",");
        let countnilaiPG = 0
        html0 = `<h5 class="w3-center">Hasil Pendeteksian Lembar Jawaban</h5>`;
        html0 +=`<br>
        <table class="w3-table"><tr class="w3-light-grey"><td colspan="3" class="w3-center">Data Siswa</td></tr><tr><td>ID Siswa</td><td style="width:5px">:</td><td>${objeksiswa.id}</td></tr><tr><td>Nama</td><td style="width:5px">:</td><td>${objeksiswa.pd_nama}</td></tr><tr><td></td><td></td><td></td></tr><tr class="w3-light-gray"><td colspan="3" class="w3-center">Data Materi Soal</td></tr><tr><td>Identitas Materi</td><td>:</td><td>${datamateri[par].idmapel}</td></tr><tr><td>Jumlah PG</td><td>:</td><td>${countPG}</td></tr><tr><td>Jumlah Essay</td><td>:</td><td>${countEssay}</td></tr><tr><td></td><td></td><td></td></tr><tr class="w3-light-gray"><td colspan="3" class="w3-center">Pendeteksian Akhir</td></tr>`;
        
        htmlprev +=`<div class="w3-row-padding">`;//0
        htmlprev +=`<div class="w3-col l8 s8">`;//1
        htmlprev +=`<img src="/img/L_vT86_100px.png" class=" w3-left" style="width:45px;"><h3 class="w3-xlarge w3-lobster"> Hasil Belajar E-DURASA (Scanner)</h3>`;
        htmlprev+=`<div class="w3-center warnaeka w3-card-4 w3-round-large w3-border-bottom w3-border-black"><h3>${idNamaSekolah.toUpperCase()}</h3><h5>Semester ${SemesterBerapaSekarang()} Tahun Pelajaran ${idTeksTapel}</h5></div>`;
        htmlprev +=`<table class="w3-table-all small"><caption>Identitas Siswa</caption><tbody><tr><td>ID Lamaso (Token)</td><td>:</td><td>${objeksiswa.id}</td></tr><tr><td>Nama</td><td>:</td><td><b>${objeksiswa.pd_nama}</b></td></tr><tr><td>Kelas</td><td>:</td><td>${idNamaKelas}</td></tr></tbody></table>`;
        htmlprev +=`</div>`;//1
        htmlprev+=`<div class="w3-col l4 s4  w3-right">`;//2
        htmlprev+=`<div class="w3-small w3-center">Identitas Materi:</div><h5 class="w3-center w3-card-4 warnaeka">${datamateri[par].idmapel}</h5>`;
        htmlprev+=`<table class="w3-table-all w3-small"><tbody><tr><td>Jenis Tagihan</td><td>:</td><td>${datamateri[par].jenistagihan}</td></tr><tr><td>Jumlah Pilihan Ganda</td><td>:</td><td>${countPG}</td></tr><tr><td>Jumlah Soal Isian</td><td>:</td><td>${countEssay}</td></tr>`;
        htmlprev +=`<tr><td>Muatan Kompetensi</td><td>:</td><td>${str}<br></td></tr><tr><td>Waktu Mulai<br><sub class="w3-text-red">Proses Scan</sub></td><td>:</td><td>${ tanggalfulllengkap(new Date())}</td></tr><tr><td>Waktu Selesai<br><sub class="w3-text-red">Proses Scan</sub></td><td>:</td><td>${ tanggalfulllengkap(new Date())}</td></tr></tbody></table>`;
        htmlprev +=`</div>`;//2;
        htmlprev+=`<div class="w3-clear w3-border"></div>`;
        if(adapg){
            htmlprev+=`<div class="w3-col l3 s3 w3-border ljksiswa_pg">`;//3
        }else{
            htmlprev+=`<div class="w3-col l3 s3 w3-border w3-hide">`;//3
        }
        
        



        html +=`<div class="w3-hide">`;
        html +=teks;
        html +=`</div>Hasil Pendeteksian Scanner:`
        let cektabel = null;
        // tempatperikspg.innerHTML = html;
        tempatperikspg.innerHTML = html;

        let cekopsiDdikelas = document.querySelectorAll(".calc");
        let adaD = false;
        for(let j = 0 ; j < cekopsiDdikelas.length; j++){
            let idnya = cekopsiDdikelas[j].getAttribute("id");
            if(idnya.indexOf("D")>-1){
                adaD = true;
                break;
            }
        }
        
        html = `<hr><table class="w3-table garis w3-small"><thead><tr class="w3-light-gray"><th>No. Soal</th><th>Kunci Jawaban</th><th>Properti Item Soal</th><th>Scan Terdeteksi</th><th>Alasan Tidak Terdeteksi</th><th>Jawaban Siswa</th></tr></thead><tbody>`;
        let arrayberhasil = [];
        let obterdeteksi;
        let html12="";
        html12+=`tokensiswa =<input class="inputscannerakhir" data-keykirimscanner="tokensiswa" value="${objeksiswa.id}"><br>`;
        html12+=`matericode(idbaris sumber soal) =<input class="inputscannerakhir" data-keykirimscanner="matericode" value="${dlo.idbaris}"><br>`;
        html12+=`idsekolah (Nama sekolah) =<input class="inputscannerakhir" data-keykirimscanner="idsekolah" value="${idNamaSekolah}"><br>`;
        html12+=`email guru =<input class="inputscannerakhir" data-keykirimscanner="emailguru" value="${jlo.surel}"><br>`;
        html12+=`namakelas =<input class="inputscannerakhir" data-keykirimscanner="idkelas" value="${idNamaKelas}"><br>`;
        html12+=`idmapel (Judul soal materi) =<input class="inputscannerakhir" data-keykirimscanner="idmapel" value="${dlo.idmapel}"><br>`;
        html12+=`idtoken (idtoken soal materi) =<input class="inputscannerakhir" data-keykirimscanner="idtoken" value="${dlo.idtoken}"><br>`;
        html12+=`jenistagihan (jenistagihan soal materi) =<input class="inputscannerakhir" data-keykirimscanner="jenistagihan" value="${dlo.jenistagihan}"><br>`;
        html12+=`kodeunik (kodeunik soal materi) =<input class="inputscannerakhir" data-keykirimscanner="kodeunik" value="${dlo.jenistagihan}_${dlo.crtToken}"><br>`;
        html12+=`crtToken (crtToken soal materi) =<input class="inputscannerakhir" data-keykirimscanner="crtToken" value="${dlo.crtToken}"><br>`;
        html12+=`namasiswa (namasiswa soal materi) =<input class="inputscannerakhir" data-keykirimscanner="namasiswa" value="${objeksiswa.pd_nama}"><br>`;
        
        let html1 = "";
        if(countPG <= 20){
            let tabelwarnascan = document.querySelector(".tabeldeteksiwarna1");
            let tabelbody = tabelwarnascan;//.getElementsByTagName("tbody")[0];
            let tRow = tabelbody.rows;
            
            for(let k = 0 ; k < countPG ; k++){
                let no = k+1;
                if(dlo.jenistagihan == "ustertulis"|| dlo.jenistagihan == "uspraktek"){
                    html +=`<tr><td>${no}</td><td>${kkc[k].match(/[ABCD]/)[0]}</td><td>${objektes[no].split("_")[0]}</td>`;
                }else{
                    html +=`<tr><td>${no}</td><td>${kkc[k].match(/[ABCD]/)[0]}</td><td>${objektes[no]}</td>`;
                }
                let lCol = tRow[k+1].cells;
                let cekwarna = [];
                for(let l = 1 ; l < lCol.length ;l++){
                    let hasStyle = lCol[l].hasAttribute("style");
                    let valueinner = lCol[l].innerHTML;
                    if(hasStyle){
                        cekwarna.push(no+valueinner)
                    }
                }
                if(cekwarna.length == 0){
                    html +=`<td>Kosong</td>`
                    html +=`<td>Tidak Terdeteksi Sama sekali</td>`
                    html +=`<td></td>`
                }else if(cekwarna.length == 1){
                    obterdeteksi = {};
                    html +=`<td>Terdeteksi</td>`;
                    if(kkc[k]==cekwarna[0]){
                        html +=`<td>Benar</td>`;
                        obterdeteksi["SKOR_"+no] = 1;
                        obterdeteksi["PG_"+no] = cekwarna[0];
                        countnilaiPG++;
                        html12 +=`<br>SKOR PG= ${no}<input value="1" class="inputscannerakhir  ${objektes[no]}" data-keykirimscanner="SKOR_${no}" id="SKOR_${no}">`;
                        html12 +=`<br>opsi PG= ${no}<input value="${cekwarna[0].match(/[ABCD]/)[0]}"  class="inputscannerakhir" data-keykirimscanner="PG_${no}">`;
                        
                    }else{
                        html +=`<td>Salah</td>`;
                        obterdeteksi["SKOR_"+no] = 0;
                        obterdeteksi["PG_"+no] = cekwarna[0];
                        html12 +=`<br>SKOR PG= ${no}<input value="0" class="inputscannerakhir  ${objektes[no]}" data-keykirimscanner="SKOR_${no}" id="SKOR_${no}">`;
                        html12 +=`<br>opsi PG= ${no}<input value="${cekwarna[0].match(/[ABCD]/)[0]}"  class="inputscannerakhir" data-keykirimscanner="PG_${no}">`;
                    }
                    html +=`<td>${cekwarna[0].match(/[ABCD]/)[0]}</td>`;
                    arrayberhasil.push(obterdeteksi);
                }else{
                    html +=`<td>Terdeteksi Banyak</td>`
                    html +=`<td>Ada ${cekwarna.length} terdeteksi</td>`
                    html +=`<td></td>`;
                }
                html +=`</tr>`;
            }
        }else{
            let tabelwarnascan = document.querySelector(".tabeldeteksiwarna1");
            let tabelbody = tabelwarnascan;//.getElementsByTagName("tbody")[0];
            let tRow = tabelbody.rows;
            for(let k = 0 ; k < 20 ; k++){
                let no = k+1;
                if(dlo.jenistagihan == "ustertulis"|| dlo.jenistagihan == "uspraktek"){

                    html +=`<tr><td>${no}</td><td>${kkc[k].match(/[ABCD]/)[0]}</td><td>${objektes[no].split("_")[0]}</td>`;
                }else{

                    html +=`<tr><td>${no}</td><td>${kkc[k].match(/[ABCD]/)[0]}</td><td>${objektes[no]}</td>`;
                }
                let lCol = tRow[k+1].cells;                
                let cekwarna = [];
                for(let l = 1 ; l < lCol.length ;l++){
                    let hasStyle = lCol[l].hasAttribute("style");
                    let valueinner = lCol[l].innerHTML;
                    if(hasStyle){
                        cekwarna.push(no+valueinner)
                    }
                }
                if(cekwarna.length == 0){
                    html +=`<td>Kosong</td>`
                    html +=`<td>Tidak Terdeteksi Sama sekali</td>`
                    html +=`<td></td>`
                }else if(cekwarna.length == 1){
                    obterdeteksi = {};
                    html +=`<td>Terdeteksi</td>`;
                    if(kkc[k]==cekwarna[0]){
                        html +=`<td>Benar</td>`;
                        obterdeteksi["SKOR_"+no] = 1;
                        obterdeteksi["PG_"+no] = cekwarna[0];
                        countnilaiPG++;
                        html12 +=`<br>SKOR PG= ${no}<input value="1" class="inputscannerakhir  ${objektes[no]}" data-keykirimscanner="SKOR_${no}" id="SKOR_${no}">`;
                        html12 +=`<br>opsi PG= ${no}<input value="${cekwarna[0].match(/[ABCD]/)[0]}"  class="inputscannerakhir" data-keykirimscanner="PG_${no}">`;
                    }else{
                        html +=`<td>Salah</td>`;
                        obterdeteksi["SKOR_"+no] = 0;
                        obterdeteksi["PG_"+no] = cekwarna[0];
                        html12 +=`<br>SKOR PG= ${no}<input value="0" class="inputscannerakhir  ${objektes[no]}" data-keykirimscanner="SKOR_${no}" id="SKOR_${no}">`;
                        html12 +=`<br>opsi PG= ${no}<input value="${cekwarna[0].match(/[ABCD]/)[0]}"  class="inputscannerakhir" data-keykirimscanner="PG_${no}">`;
                    }
                    arrayberhasil.push(obterdeteksi);
                    html +=`<td>${cekwarna[0].match(/[ABCD]/)[0]}</td>`;
                }else{
                    html +=`<td>Terdeteksi Banyak</td>`
                    html +=`<td>Ada ${cekwarna.length} terdeteksi</td>`
                    html +=`<td></td>`;
                }
                html +=`</tr>`;
            }
            let sisa = countPG % 20;
            tabelwarnascan = document.querySelector(".tabeldeteksiwarna2");
            tabelbody = tabelwarnascan;//.getElementsByTagName("tbody")[0];
            tRow = tabelbody.rows;
            for(let k = 0 ; k < sisa ; k++){
                let no = k+21;
                if(dlo.jenistagihan == "ustertulis"|| dlo.jenistagihan == "uspraktek"){
                    html +=`<tr><td>${no}</td><td>${kkc[k+20].match(/[ABCD]/)[0]}</td><td>${objektes[no].split("_")[0]}</td>`;
                }else{
                    html +=`<tr><td>${no}</td><td>${kkc[k+20].match(/[ABCD]/)[0]}</td><td>${objektes[no]}</td>`;
                }
                let lCol = tRow[k+1].cells;                
                let cekwarna = [];
                for(let l = 1 ; l < lCol.length ;l++){
                    let hasStyle = lCol[l].hasAttribute("style");
                    let valueinner = lCol[l].innerHTML;
                    if(hasStyle){
                        cekwarna.push(no+valueinner)
                    }
                }
                if(cekwarna.length == 0){
                    html +=`<td>Kosong</td>`
                    html +=`<td>Tidak Terdeteksi Sama sekali</td>`
                    html +=`<td></td>`
                }else if(cekwarna.length == 1){
                    obterdeteksi = {};
                    
                    html +=`<td>Terdeteksi</td>`;
                    if(kkc[k+20]==cekwarna[0]){
                        html +=`<td>Benar</td>`;
                        obterdeteksi["SKOR_"+no] = 1;
                        obterdeteksi["PG_"+no] = cekwarna[0];
                        countnilaiPG++;
                        html12 +=`<br>SKOR PG= ${no}<input value="1" class="inputscannerakhir ${objektes[no]}" data-keykirimscanner="SKOR_${no}" id="SKOR_${no}">`;
                        html12 +=`<br>opsi PG= ${no}<input value="${cekwarna[0].match(/[ABCD]/)[0]}"  class="inputscannerakhir" data-keykirimscanner="PG_${no}">`;
                    }else{
                        html +=`<td>Salah</td>`;
                        obterdeteksi["SKOR_"+no] = 0;
                        obterdeteksi["PG_"+no] = cekwarna[0];
                        html12 +=`<br>SKOR PG= ${no}<input value="0" class="inputscannerakhir  ${objektes[no]}" data-keykirimscanner="SKOR_${no}" id="SKOR_${no}">`;
                        html12 +=`<br>opsi PG= ${no}<input value="${cekwarna[0].match(/[ABCD]/)[0]}"  class="inputscannerakhir" data-keykirimscanner="PG_${no}">`;
                    
                    }
                    
                    arrayberhasil.push(obterdeteksi);
                    html +=`<td>${cekwarna[0].match(/[ABCD]/)[0]}</td>`;

                }else{
                    html +=`<td>Terdeteksi Banyak</td>`
                    html +=`<td>Ada ${cekwarna.length} terdeteksi</td>`
                    html +=`<td></td>`;
                }
                html +=`</tr>`;
            }

        }
        
        html +="</tbody></table>Keterangan:<br>";//penutup div w3-col l6
        // html +="</tbody></table></div>Keterangan:<br>";//penutup div w3-col l6
        // html +=`<div class="w3-col l6 s12">Tampilan Opsi PG di LJK<table class="w3-table garis w3-small">`;
        html +=`<hr>Tampilan Opsi PG di LJK`;
        html+=`<table class="w3-table garis w3-small w3-centered" style="max-width:340px;margin:5px auto">`;
        htmlprev+=`<h5 class="w3-center w3-card-4 warnaeka">PILIHAN GANDA</h5><table class="w3-table garis w3-small w3-centered tblljkpg" id="tabelpgakhirscanner"  style="max-width:340px;margin:5px auto"><caption>Tabel Jawaban Pilihan Ganda</caption>`;
        if(adaD){
            html +=`<thead><tr><th>No</th><th colspan="4">PILIHAN GANDA</th></tr></thead><tbody>`;
            htmlprev +=`<thead><tr><th>No</th><th colspan="4">PILIHAN GANDA</th></tr></thead><tbody>`;
        }else{
            html +=`<thead><tr><th>No</th><th colspan="3">PILIHAN GANDA</th></tr></thead><tbody>`;
            htmlprev +=`<thead><tr><th>No</th><th colspan="3">PILIHAN GANDA</th></tr></thead><tbody>`;
        }
        
        for(let m = 0 ; m < arrayberhasil.length; m++){
            let n = arrayberhasil[m]
            let keyPG = Object.keys(arrayberhasil[m])[0]
            
            let soalsiswa = keyPG.match(/(\d+)/)[0];//nomernya
            let hurufkunci = n["PG_"+soalsiswa].match(/[ABCD]/)[0];
            if(hurufkunci == "A"){
                html +=`<tr><td>${soalsiswa}</td>`;
                htmlprev +=`<tr><td>${soalsiswa}</td>`;
                if(adaD){
                    html +=`<td class="w3-yellow">A</td><td>B</td><td>C</td><td>D</td>`;
                    htmlprev +=`<td style="background-color:#FFFF00">A</td><td>B</td><td>C</td><td>D</td>`;
                    
                }else{
                    html +=`<td class="w3-yellow">A</td><td>B</td><td>C</td>`;
                    htmlprev +=`<td style="background-color:#FFFF00">A</td><td>B</td><td>C</td>`;
                }
                
                html+=`</tr>`;
                htmlprev+=`</tr>`;
            }else if(hurufkunci=="B"){
                html +=`<tr><td>${soalsiswa}</td>`;
                htmlprev +=`<tr><td>${soalsiswa}</td>`;
                if(adaD){
                    html +=`<td>A</td><td class="w3-yellow">B</td><td>C</td><td>D</td>`;
                    htmlprev +=`<td>A</td><td style="background-color:#FFFF00">B</td><td>C</td><td>D</td>`;
                    
                }else{
                    html +=`<td>A</td><td class="w3-yellow">B</td><td>C</td>`;
                    htmlprev +=`<td>A</td><td style="background-color:#FFFF00">B</td><td>C</td>`;
                }
                
                html+=`</tr>`;
                htmlprev+=`</tr>`;
            }else if(hurufkunci=="C"){
                html +=`<tr><td>${soalsiswa}</td>`;
                htmlprev +=`<tr><td>${soalsiswa}</td>`;
                if(adaD){
                    html +=`<td>A</td><td>B</td><td class="w3-yellow">C</td><td>D</td>`;
                    htmlprev +=`<td>A</td><td>B</td><td style="background-color:#FFFF00">C</td><td>D</td>`;
                    
                }else{
                    html +=`<td>A</td><td>B</td><td class="w3-yellow">C</td>`;
                    htmlprev +=`<td>A</td><td>B</td><td style="background-color:#FFFF00">C</td>`;
                }
                
                html+=`</tr>`;
                htmlprev+=`</tr>`;
            }else{
                html +=`<tr><td>${soalsiswa}</td>`;
                htmlprev +=`<tr><td>${soalsiswa}</td>`;
                if(adaD){
                    html +=`<td>A</td><td>B</td><td>C</td><td class="w3-yellow">D</td>`;
                    htmlprev +=`<td>A</td><td>B</td><td>C</td><td style="background-color:#FFFF00">D</td>`;
                    
                }else{
                    html +=`<td>A</td><td>B</td><td>C</td>`;
                    htmlprev +=`<td>A</td><td>B</td><td>C</td>`;
                }
                
                html+=`</tr>`;
                htmlprev+=`</tr>`;
            }
        }
        html +=`</tbody></table>`;
        htmlprev +=`</tbody></table>`;
        // html +=`</div>`;//penutup div w3-col l6 s12
        // html +=`</div>`; //penutup w3-row
        
        tempatperikspg.innerHTML += html;
        
        htmlprev+=`</div>`;//3 tabel PG
        
        
        if(countEssay > 0){
            htmlprev +=`<div class="w3-col l9 s9 w3-border  ljksiswa_essay"><h5 class="w3-center w3-card-4 warnaeka">JAWABAN ISIAN</h5>`;//4
            
            html1 += "<hr><hr>Berikut Adalah Pertanyaan yang dapat Anda berikan nilai";
            for(let i = 0 ; i < countEssay ; i++){
                let a = (i+1);
                let b = (countPG + a);
                let objeknilaiessay = {}
                objeknilaiessay[objektes[b]]=0
                let divpertanyaan = document.getElementById("pertanyaanessay_"+b);
                //htmlessay.push(divpertanyaan.innerHTML);
                html1 += `<hr class="w3-bottombar w3-border-black">pertanyaan ke - ${b} <br><div class="w3-container w3-border w3-round-large">`;
                html1 += divpertanyaan.innerHTML;
                html1 +=`</div><br class="w3-bottombar">Berikan Langsung Nilai Koreksi : <input type="number" id="koreksisoalscanner_${b}" min="0" value="0" class="koreksisoalscanner" onchange="updatenilaikoreksscanner('${b}',${countEssay})">`;
                htmlprev+=`<ol style="list-style-type:decimal" start="${b}"><li><b style="color:blue">Pertanyaan:</b><br>${divpertanyaan.innerHTML}<hr style="border-top:1px solid black"><b style="color:blue">Jawaban:</b><br><i class="w3-text-red">Diambil dari Scanner</i><div id="untuklj${b}" class="koleksilj" style="border:1px solid red;padding:5px;background-color:#eeeeff">Nilai</div></li></ol>`;
                html12 +=`<br>No. Essay= ${b}<input  class="inputscannerakhir  ${objektes[b]}" data-keykirimscanner="SKOR_${b}" id="SKOR_${b}">`;
                
            }
            html12 +=`<br>Nilai Total Essay= <input  class="inputscannerakhir" data-keykirimscanner="nilaiEssay" id="nilaiakhiressayscaner">`;
            // tempatperikspg.innerHTML += html;
            htmlprev +=`</div>`;//4
            
           
            tempatperiksaessay.innerHTML = html1;

            tombollihatpg.setAttribute("onclick",`showhideinfoljk("scanneranalisis",true)`);
            tombollihatessay.setAttribute("onclick",`showhideinfoljk("koreksiessay",true)`);
            tombolshowformatljk.setAttribute("onclick",`showhideinfoljk("lihatljkscanner",true)`);
            
            tombolcekawal.setAttribute("onclick",`showhideinfoljk("awal",true)`);
        }else{
            tombollihatpg.setAttribute("onclick",`showhideinfoljk("scanneranalisis",false)`);
            tombollihatessay.setAttribute("onclick",`showhideinfoljk("koreksiessay",false)`);
            tombolshowformatljk.setAttribute("onclick",`showhideinfoljk("lihatljkscanner",false)`);
            tombolcekawal.setAttribute("onclick",`showhideinfoljk("awal",false)`);
            htmlprev +=`<div class="w3-col l9 s9 w3-border ljksiswa_essay"></div>`;//4
        }

        let jumlahnilaipg = ((countnilaiPG/countPG)*100).toFixed(2);
        
        html12+=`Total NilaiPG (namasiswa soal materi) =<input class="inputscannerakhir" data-keykirimscanner="nilaiPG" value="${jumlahnilaipg}"><br>`;
        
        html0+=`<tr><td>Skor PG</td><td>:</td><td>${jumlahnilaipg}</td></tr>`;
        if(adapg){
            htmlprev +=`<div class="w3-col l2 s2 w3-border ljksiswa_nilaipg"><h5 class="w3-center w3-card-4 warnaeka">NILAI PG</h5>`;
            htmlprev+=`<div class="w3-large w3-border w3-center" id="nilaiPGku" style="height:100px">${jumlahnilaipg}</div>`;
            htmlprev+=`</div>`;
        }else{
            htmlprev +=`<div class="w3-col l2 s2 w3-border w3-hide ljksiswa_nilaipg">`;
            htmlprev+=`<div class="w3-large w3-border w3-center w3-hide" id="nilaiPGku" style="height:100px"></div>`;
            htmlprev+=`</div>`;
        }

        if(countEssay>0){
            html0+=`<tr><td>Ada Essay</td><td>:</td><td>Silakan Koreksi</td></tr></table>`
            showhideinfoljk("awal", true);
            htmlprev +=`<div class="w3-col l2 s2 w3-border ljksiswa_nilaiessay"><h5 class="w3-center w3-card-4 warnaeka">NILAI ISIAN</h5>`;
            htmlprev+=`<div class="w3-large w3-border w3-center" id="nilaiEssayku" style="height:100px"></div>`;
            htmlprev+=`</div>`;
        }else{
            showhideinfoljk("awal", false);
            htmlprev +=`<div class="w3-col l2 s2 w3-border w3-hide ljksiswa_nilaiessay"><h5 class="w3-center w3-card-4 warnaeka">NILAI ISIAN</h5>`;
            htmlprev+=`<div class="w3-large w3-border w3-center w3-hide" id="nilaiEssayku" style="height:100px"></div>`;
            htmlprev+=`</div>`;

        }
        html0+="</table>";
        tempatinfoawal.innerHTML = html0;

        // htmlprev +=`<div class="w3-col l4 s12 w3-right"><div class="w3-card-4 w3-container w3-left w3-center " style="width:45%;margin:5px;height:120px">Paraf Orangtua</div><div class="w3-card-4 w3-container w3-left w3-center " style="width:45%;margin:5px;height:120px">Paraff Guru</div></div>`;
        htmlprev +=`<div class="w3-col l1 s1">&nbsp;</div><div class="w3-col l2 s2 w3-container w3-right"><h5 class="w3-center w3-card-4 warnaeka">Paraf Orang Tua</h5><div class="w3-border" style="height:100px"></div></div>`;
        htmlprev +=`<div class="w3-col l2 s2 w3-container w3-right"><h5 class="w3-center w3-card-4 warnaeka">Paraf Guru</h5><div class="w3-border" style="height:100px"></div></div>`;
        htmlprev +=`</div>`;//div w3-row;
        formatljknotepadscanner.innerHTML = htmlprev;
        
        html12+=`NILAI KD (objek nilai KD soal materi) =<input class="inputscannerakhir" data-keykirimscanner="nilaikd" id="nilaikdkoreksikoreksi" value=""><br>`;
        document.getElementById("datakirimscanner").innerHTML = html12;
        
        let kd = JSON.parse(kronologijson[parseInt(idtabaktif.innerHTML)].kuncikd)
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
        document.getElementById("nilaikdkoreksikoreksi").value = JSON.stringify(objnilai)

    });
}
const updatenilaikoreksscanner = (id,jumlahsoalessaysebenarnya) =>{
    let inputedit = document.getElementById("koreksisoalscanner_" + id);
    if (inputedit.value > 100) {
        alert("Nilai Maksimum 100, dan minimum 0")
        inputedit.value = 100;
    }
    document.getElementById("SKOR_" + id).value = (inputedit.value / 100).toFixed(2);

    document.getElementById("untuklj"+id).innerHTML = `Nilai Koreksi: <span id="nilaiessaykoreksi_${id}">${inputedit.value}</span>`;
    //document.getElementById("nilaiessaykoreksi_" + id).innerHTML = inputedit.value;
   
    var kelasinput = document.getElementsByClassName("koreksisoalscanner");
    var nilai = 0;
    for (i = 0; i < kelasinput.length; i++) {

        nilai += kelasinput[i].value * 1;

    }
    /// ---------------------------------------------------
    //var jumlahsoalessaysebenarnya = kronologijson[parseInt(idtabaktif.innerHTML)].jumlahessay;
    var nilaiakhir = (nilai / jumlahsoalessaysebenarnya).toFixed(2);
    // document.getElementById("nilaiakhiressay").value = nilai;
    document.getElementById("nilaiakhiressayscaner").value = nilaiakhir;
    /// ---------------------------------------------------

    //document.getElementById("htmlljkkoreksi").textContent = divljkkoreksi.innerHTML;
    let adaelemenini = document.getElementById("nilaiEssayku")
    if (adaelemenini !== null) {
        adaelemenini.innerHTML = nilaiakhir;
    }

    let kd = JSON.parse(kronologijson[parseInt(idtabaktif.innerHTML)].kuncikd)
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
    document.getElementById("nilaikdkoreksikoreksi").value = JSON.stringify(objnilai)


    //document.getElementById("prevprevnilaikoreksi").innerHTML = `<hr> Skor Essay = <br>${nilaiakhir} <hr> Skor KD = <br> ${JSON.stringify(objnilai)}`

}
function showhideinfoljk(kondisi,bolessay = false){
    let tempatperikspg = document.querySelector(".tempatperikspg");
    let tempatinfoawal = document.querySelector(".tempatinfoawal");
    let tempatperiksaessay = document.querySelector(".tempatperiksaessay");
    let formatljknotepadscanner = document.querySelector(".formatljknotepadscanner");
    //tombol:
    let tombollihatessay = document.querySelector(".tombollihatessay"); 
    let tombolcetakscanner = document.querySelector(".tombolcetakscanner"); 
    let tombollihatpg = document.querySelector(".tombollihatpg"); 
    let tombolshowformatljk = document.querySelector(".tombolshowformatljk"); 
    let tombolcekawal = document.querySelector(".tombolcekawal");
    let elemencek = document.getElementById("lebarmodalscanner");
    
    tombolcekawal.innerHTML = `<i class="fa fa-home"></i> Awal Cek`;
    tombollihatessay.innerHTML = `<i class="fa fa-pencil"></i> Periksa Essay`;
    tombolcetakscanner.innerHTML = `<i class="fa fa-print"></i> Cetak`;
    tombollihatpg.innerHTML = `<i class="fa fa-check"></i> Periksa PG`;
    tombolshowformatljk.innerHTML = `<i class="fa fa-pencil"></i> LJK`

    if(kondisi == "awal"){
        if(tempatinfoawal.className.indexOf("w3-hide")>-1){
            tempatinfoawal.classList.remove("w3-hide");
        }
        if(tempatperikspg.className.indexOf("w3-hide")==-1){
            tempatperikspg.classList.add("w3-hide");
        }
        if(formatljknotepadscanner.className.indexOf("w3-hide")==-1){
            formatljknotepadscanner.classList.add("w3-hide")
        }
        if(bolessay){
            if(tombollihatessay.className.indexOf("w3-hide")>-1){
                tombollihatessay.classList.remove("w3-hide")
            }
            if(tempatperiksaessay.className.indexOf("w3-hide")==-1){
                tempatperiksaessay.classList.add("w3-hide")
            }
        }else{
            if(tombollihatessay.className.indexOf("w3-hide")==-1){
                tombollihatessay.classList.add("w3-hide")
            }
        }
        if(elemencek.hasAttribute("style")){
            elemencek.removeAttribute("style")
        }
       tombolcetakscanner.setAttribute("onclick",`printadm('tempatinfoawal',true)`);
    }else if(kondisi == "scanneranalisis"){
        if(tempatinfoawal.className.indexOf("w3-hide")==-1){
            tempatinfoawal.classList.add("w3-hide");
        }
        if(tempatperikspg.className.indexOf("w3-hide")>-1){
            tempatperikspg.classList.remove("w3-hide");
        }
        if(formatljknotepadscanner.className.indexOf("w3-hide")==-1){
            formatljknotepadscanner.classList.add("w3-hide")
        }
        
        if(bolessay){
            if(tombollihatessay.className.indexOf("w3-hide")>-1){
                tombollihatessay.classList.remove("w3-hide")
            }
            if(tempatperiksaessay.className.indexOf("w3-hide")==-1){
                tempatperiksaessay.classList.add("w3-hide")
            }
        }else{
            if(tombollihatessay.className.indexOf("w3-hide")==-1){
                tombollihatessay.classList.add("w3-hide")
            }
        }
        if(elemencek.hasAttribute("style")){
            elemencek.removeAttribute("style")
        }
        tombolcetakscanner.setAttribute("onclick",`printadm('tempatperikspg',true)`);
        tombolcekawal.innerHTML = `<i class="fa fa-home"></i> Akhir Cek`;
    }else if(kondisi == "koreksiessay"){
        if(tempatinfoawal.className.indexOf("w3-hide")==-1){
            tempatinfoawal.classList.add("w3-hide");
        }
        
        if(tempatperikspg.className.indexOf("w3-hide")==-1){
            tempatperikspg.classList.add("w3-hide");
        }
        if(formatljknotepadscanner.className.indexOf("w3-hide")==-1){
            formatljknotepadscanner.classList.add("w3-hide")
        }
        if(bolessay){
            if(tombollihatessay.className.indexOf("w3-hide")>-1){
                tombollihatessay.classList.remove("w3-hide")
            }
            if(tempatperiksaessay.className.indexOf("w3-hide")>-1){
                tempatperiksaessay.classList.remove("w3-hide")
            }
        }else{
            if(tombollihatessay.className.indexOf("w3-hide")==-1){
                tombollihatessay.classList.add("w3-hide")
            }
        }
        if(elemencek.hasAttribute("style")){
            elemencek.removeAttribute("style")
        }
        tombolcetakscanner.setAttribute("onclick",`printadm('formatljknotepadscanner',true)`);
        tombolcekawal.innerHTML = `<i class="fa fa-home"></i> Akhir Cek`;
    }else if(kondisi == "lihatljkscanner"){
        if(tempatinfoawal.className.indexOf("w3-hide")==-1){
            tempatinfoawal.classList.add("w3-hide");
        }
        
        if(tempatperikspg.className.indexOf("w3-hide")==-1){
            tempatperikspg.classList.add("w3-hide");
        }
        if(formatljknotepadscanner.className.indexOf("w3-hide")>-1){
            formatljknotepadscanner.classList.remove("w3-hide")
        }
        if(bolessay){
            if(tombollihatessay.className.indexOf("w3-hide")>-1){
                tombollihatessay.classList.remove("w3-hide")
            }
            if(tempatperiksaessay.className.indexOf("w3-hide")==-1){
                tempatperiksaessay.classList.add("w3-hide")
            }
        }else{
            if(tombollihatessay.className.indexOf("w3-hide")==-1){
                tombollihatessay.classList.add("w3-hide")
            }
        }
        elemencek.setAttribute("style","width:98%");
        tombolcetakscanner.setAttribute("onclick",`printadm('formatljknotepadscanner',false)`)
    }else{//tutupsemua
        if(tempatinfoawal.className.indexOf("w3-hide")==-1){
            tempatinfoawal.classList.add("w3-hide");
        }
        if(tempatperikspg.className.indexOf("w3-hide")==-1){
            tempatperikspg.classList.add("w3-hide");
        }
        if(formatljknotepadscanner.className.indexOf("w3-hide")==-1){
            formatljknotepadscanner.classList.add("w3-hide")
        }
        
        
            if(tombollihatessay.className.indexOf("w3-hide")==-1){
                tombollihatessay.classList.add("w3-hide")
            }
            if(tempatperiksaessay.className.indexOf("w3-hide")==-1){
                tempatperiksaessay.classList.add("w3-hide")
            }
            if(elemencek.hasAttribute("style")){
                elemencek.removeAttribute("style")
            }
    }
    document.getElementById('modal_scannerLJK').scrollTo({ top: 43, behavior: 'smooth' })
}
const ambilpic = ()=>{
    let kameranyaaktif = strimingljk.active;
    let part = 1;
    if(!kameranyaaktif){
        start_kameraLJK(part);
        return
    }
    posisiScreenshot.getContext('2d').drawImage(posisikamera, 0, 0,posisiScreenshot.width, posisiScreenshot.height);
    // posisiScreenshot.getContext('2d').drawImage(posisikamera, 0, 0,350, 550);
    
    
    document.querySelector(".patokan_tabelPG").style.width="100%"
    
    let elemenvideo = document.querySelectorAll(".canvas_ljk");
    
    elemenvideo.forEach(el =>{
        if(el.className.indexOf("w3-hide")==-1){
            el.classList.add("w3-hide")
        }
    });
    // document.querySelector(".patokan_PG").classList.add("w3-hide");
    posisiScreenshot.classList.remove("w3-hide");
    if (strimingljk == "") {
        alert("Mohon tunggu, proses loading sedang berlangsung....");
        return
    }
    
    strimingljk.getTracks().forEach(k => k.stop());
    // setTimeout(()=>{
        
    // },1000)
    //cekPosisiLJSiswa(part);
}
const cekPosisiLJSiswa = (part)=>{
    let tabelsource = document.querySelector(".source_tabelkamera");
    let ts_body = tabelsource.getElementsByTagName("tbody")[0];
    
    let tabelresult = part == 1? document.querySelector(".tabeldeteksiwarna1"): document.querySelector(".tabeldeteksiwarna2");
    let tblR_body = tabelresult.getElementsByTagName("tbody")[0];
    
    // hapus dulu canvasnya
    // let canvashapus = document.getElementById("tampilanScreenshotLJK");
    // let ctxh = canvashapus.getContext('2d');
    //     ctxh.clearRect(0, 0, canvashapus.width, canvashapus.height);
    if(part == 1){
        btn_tapscanpertama.innerHTML = "Ulangi Ambil Gambar Part 1";
        btn_tapscanpertama.setAttribute("onclick","start_kameraLJK(1)");

    }else{
        btn_tapscankedua.innerHTML = "Ulangi Ambil Gambar Part 2";
        btn_tapscankedua.setAttribute("onclick","start_kameraLJK(2)");
    }

    for(i = 0 ; i <tblR_body.rows.length && i < 20 ; i++){
        let rRow = tblR_body.rows[i];
        
        for(j = 1 ; j < rRow.cells.length ; j++){
            //dimulai dari j = 1 sebab kita menghindari kolom pertama yang berindeks 0;
            let el_td = ts_body.rows[i].cells[j]
            let w_eltd = (el_td.offsetWidth/2);
            
            let corX = (el_td.offsetLeft + w_eltd-3);
            let corY = (el_td.offsetTop + 5);
            // let x_baru = ((corX/2)+1.796)*1.696;//1.69;
            // let y_baru =  ((corY/4)+0.9)*1.09;
            let x_baru = ((corX/2)+1.7968)*1.717171;//1.69;
            let y_baru =  ((corY/4)+0.9)*1.0989;
            
            let hex = warnahex(x_baru,y_baru);
            if(hex.r < 100 && hex.g < 100 & hex.b < 100){
                let coloR = warnaScrenshot(x_baru,y_baru);
                rRow.cells[j].setAttribute("style","background-color:"+coloR);
                // rRow.cells[j].innerHTML = "r:"+hex.r +", g:"+hex.g+", b:"+hex.b;
                let ccanvas = document.querySelector(".patokan_PG");//
                let tanda = document.createElement("span");
                tanda.setAttribute("style","position:absolute;top:"+corY+"px;left:"+corX+"px;width:15px;height:15px;background-color:green;z-index:9");
                tanda.innerHTML="&nbsp;";                
                ccanvas.appendChild(tanda);

                var canvas = document.getElementById("tampilanScreenshotLJK");
                var ctx = canvas.getContext("2d");
                ctx.fillStyle = "rgb(255, 0, 0)";//"rgb(6, 14, 246)";//+(w_eltd-3)
                ctx.fillRect(x_baru,y_baru, 8, 2);
            }
            
        }
    }
    
    
    

    
}
const cekPosisiKunci = ()=>{
    let tabelsource = document.querySelector(".source_tabelkamera");
    let ts_body = tabelsource.getElementsByTagName("tbody")[0];
    // Tes Kunci jawabannya:
    let kuncijawaban = ["1C","2A","3D","4C","5D","6A","7D","8A","9A","10B","11A","12C","13D","14A","15C","16C","17B","18D","19B","20D","21A","22B","23C","24D","25A"];
    // console.log(JSON.stringify(kuncijawaban));
    let tabelresult = document.querySelector(".tabeldeteksiwarna");
    let tblR_body = tabelresult.getElementsByTagName("tbody")[0];
    // pertama, warnai tabelresult berdasarkan kunci dengan warna class!
    for(i = 0 ; i <tblR_body.rows.length && i < 20 ; i++){
        let rRow = tblR_body.rows[i];
        let angkaKuncijawaban = kuncijawaban[i].match(/(\d+)/)[0];
        let HurufKuncijawaban = kuncijawaban[i].match(/[ABCD]/)[0];
        //console.log(angkaKuncijawaban+"="+HurufKuncijawaban)
        
        for(j = 1 ; j < rRow.cells.length ; j++){
            //dimulai dari j = 1 sebab kita menghindari kolom pertama yang berindeks 0;
            let kolomHuruf = ekstactKuncijawaban(HurufKuncijawaban);
            if(kolomHuruf == j){
                let el_td = ts_body.rows[i].cells[j]
                let w_eltd = (el_td.offsetWidth/2); // salah;           
            
            var canvas = document.getElementById("tampilanScreenshotLJK");
            let lefcanvas = canvas.offsetLeft;
            let topcanvas = canvas.offsetTop;
            let tinggicanvas = canvas.offsetHeight;
            let lebarcanvas = canvas.offsetWidth;
            console.log("lefcanvas=",lefcanvas,"topcanvas=",topcanvas,"tinggcanvas=",tinggicanvas,"lebarcanvs=",lebarcanvas);
            
            let corX = (el_td.offsetLeft + w_eltd-3);//15 - (3+3) = 9
            let corY = (el_td.offsetTop + 5);

            // let matTan = Math.tan(corY/corX * Math.PI/180);//corY/corX;//
            // console.log("matTan=",matTan);
            // let x_baru = getOffset(el_td).left-lefcanvas;//matTan*lebarcanvas;//(getOffset(el_td).left-lefcanvas) ;//matTan*lebarcanvas ;;//getOffset(el_td).left-lefcanvas ;//+(w_eltd-3);//(((corX/2)+1.796)*1.696)+20;//1.69;
            // let lebarsono = constraintObjA.video.width;
            // console.log("lebarsono=",lebarsono);
            // let y_baru = matTan*tinggicanvas;//corY/4;// getOffset(el_td).top - topcanvas ;//+ 5 ;//((corY/4)+0.9)*1.09;
            let x_baru,y_baru;
            let posx = getOffset(el_td).left ;
            let posy = getOffset(el_td).top;//+5;
            
            x_baru = ((corX/2)+1.7968)*1.717171;//1.69;
            y_baru =  ((corY/4)+0.9)*1.0989;
            // x_baru = posx-lefcanvas;//(lefcanvas-corX)*mattan;//posx-lefcanvas;//lefcanvas-corX;//posx - lefcanvas;//(mattan * lebarcanvas)-posx;//posx;//-lefcanvas;//mattan * lebarcanvas;
            // y_baru = mattan * tinggicanvas;//posy-lebar(topcanvas-corY)*mattan;//topcanvas-posy;//(mattan * tinggicanvas);//-posy ;//+ posy;
            console.log("posx=",posx,"posy=",posy)
            console.log(x_baru, y_baru, corX, corY);
            let xx = posx/corX;
            let yy = posy/corY;
            console.log("xx=",xx,"yy",yy);

            let ccanvas = document.querySelector(".patokan_PG");//
                let coloR = warnaScrenshot(x_baru,y_baru);
                let hex = warnahex(x_baru,y_baru);
                rRow.cells[j].setAttribute("style","background-color:"+coloR);
                rRow.cells[j].innerHTML = "r:"+hex.r +", g:"+hex.g+", b:"+hex.b;
                let tanda = document.createElement("span");
            
                tanda.setAttribute("style","position:absolute;top:"+corY+"px;left:"+corX+"px;width:15px;height:15px;background-color:green;z-index:9");
                tanda.innerHTML="&nbsp;";                
                ccanvas.appendChild(tanda);

                // var canvas = document.getElementById("tampilanScreenshotLJK");
                var ctx = canvas.getContext("2d");
                let w_ctx = ctx.canvas.width;
                let h_ctx = ctx.canvas.height;
                
                let x_lama = ((corX/2)+2)*1.675;
                let y_lama = ((corY/4)+0.8)*1.12;

                

                
                console.log(w_ctx,h_ctx)
                
                ctx.fillStyle = `rgb(255, ${i*5}, ${i*20})`;//"rgb(6, 14, 246)";//+(w_eltd-3)
                ctx.fillRect(x_baru,y_baru, 8, 2);
                //ctx.fillText(j, x_baru, y_baru);

                // let cctx = canvas.getContext("2d");
                // cctx.fillStyle = "rgb(255, 0, 0)";//+(w_eltd-3)
                // cctx.fillRect(x_lama,y_lama, 15, 5);
                // ctx.fillRect(((corX/2)+2)*1.675, ((corY/4)+0.8)*1.12, 15, 5);
                
                // rRow.cells[j].setAttribute("style","background-color:"+coloR);

            }
        }
    }
    
    
    

    
}
const trialScanLJK = (param) =>{
    bolean_kirimakhirscanner = false;
    let modalL = document.getElementById("modal_scannerLJK");
    modalL.style.display = "block";
    //cek apakah di lebarmodalscanner ada attribute style, kalo ada tolong hapus stylenya:
    let elemencek = document.getElementById("lebarmodalscanner");
    if(elemencek.hasAttribute("style")){
        elemencek.removeAttribute("style")
    }
    let divinfo = document.querySelector(".info_fokusscanerLJK");
    divinfo.innerHTML = `Scanner LJ via HP`;
    //show hide bagian intinya dulu:
    let fokus_scaner = document.querySelector(".fokus_scaner");
    let hasilakhirljkscanner = document.querySelector(".hasilakhirljkscanner");
    if(fokus_scaner.className.indexOf("w3-hide")>-1){
        fokus_scaner.classList.remove("w3-hide");
        hasilakhirljkscanner.classList.add("w3-hide");
        document.querySelector(".tombolaksi_scannerljk").classList.remove("w3-hide");
    }else{
        fokus_scaner.classList.remove("w3-hide");
        hasilakhirljkscanner.classList.add("w3-hide");
        document.querySelector(".tombolaksi_scannerljk").classList.remove("w3-hide");
    }
    // fokus propert soal ini:
    let params = param.split("_");
    let par = params[1]; //indek materi kbm
    parameterbantuisiljk = par;
    let idsw = params[0]; //indek id siswa

    //alert (par);
    let siswabantu = JSON.parse(localStorage.getItem("datasiswa_" + idNamaKelas))["datasiswa"][idsw];
    let tk_siswa = siswabantu.id


    

    //bikin judul h4
    let datamateri = kronologijson;
    // kodebarismateriyangdikerjakan = datamateri[par].idbaris;
    
    // //console.log(datamateri);

    // let versi = datamateri[par].versi;
    // let adapg = (datamateri[par].jumlahpg == 0) ? false : true;
    let countPG = parseInt(datamateri[par].jumlahpg);
    // let jumlahsoal = (datamateri[par].jumlahpg * 1) + (datamateri[par].jumlahessay * 1);
    // let kkc=[], kc;
    // $.getJSON(constpreviewljk + "?idmateri=" + datamateri[par].idmateri + "&action=previewriwayat", function (json) {
    //     if (adapg) {
    //         kc = brkline(json).kunci;
    //         kkc = window.atob(kc).split(",");//.join("<br>");
            
            
    //     } else {
    //         kc = 0;
    //         kkc ="blank"
    //     }
    //     divinfo.innerHTML = "Jumlah PG " + kkc.length ;//+" Kunci Jawaban: "+ kkc.join(",");
    // })

    //fokus ke modal
    
    let tabelresult = document.querySelector(".tabeldeteksiwarna1");
    let tblR_body = tabelresult.getElementsByTagName("tbody")[0];
        for(i = 0 ; i <tblR_body.rows.length && i < 20 ; i++){
            let rRow = tblR_body.rows[i];
            for(j = 1 ; j < rRow.cells.length ; j++){
                let kl = rRow.cells[j];
                if(kl.hasAttribute("style")){
                    kl.removeAttribute("style")
                }
            }
        }
   
    let tabelresult2 = document.querySelector(".tabeldeteksiwarna2");
        let tblR_body2 = tabelresult2.getElementsByTagName("tbody")[0];
            for(i = 0 ; i <tblR_body2.rows.length && i < 20 ; i++){
                let rRow2 = tblR_body2.rows[i];
                for(j = 1 ; j < rRow2.cells.length ; j++){
                    let kl2 = rRow2.cells[j];
                    if(kl2.hasAttribute("style")){
                        kl2.removeAttribute("style")
                    }
                }
            }
    
    // document.querySelector(".patokan_PG").classList.remove("w3-hide");
    
    btn_tapscanpertama.innerHTML = "Ambil Gambar Part 1";
    btn_tapscanpertama.setAttribute("onclick","ambilscreenshotljk(1)");
    if(countPG >=20){
        btn_tapscankedua.setAttribute("style","display:inline-block");
        btn_tapscankedua.innerHTML = "Ambil Gambar Part 2";
        btn_tapscankedua.setAttribute("onclick","ambilscreenshotljk(2)");
    }else{
        btn_tapscankedua.setAttribute("style","display:none");
        btn_tapscankedua.innerHTML = "Ambil Gambar Part 2";
        btn_tapscankedua.setAttribute("onclick","ambilscreenshotljk(2)");
    }
    
    // document.querySelector(".patokan_tabelPG").style.width="90%";
    // nouruttabelpatokanPG(1);
    // saat klik:
    let tombolselesasi = document.getElementById("tapscan_finish");
    tombolselesasi.setAttribute("onclick",`selesaiambilscreenshot(${tk_siswa},${par})`)
    start_kameraLJK(1);
}

const kirimserverakhirscanner = ()=>{
    if(!bolean_kirimakhirscanner){
        alert("Aplikasi belum siap");
        return
    }
    bolean_kirimakhirscanner = false;
    
    let divinfo = document.querySelector(".tempatinfoawal");
    let divpg = document.querySelector(".tempatperikspg");
    let dives = document.querySelector(".tempatperiksaessay")
    let divlj = document.querySelector(".formatljknotepadscanner")
    
    let html = divlj.innerHTML;
    let kodebto = window.btoa(html);
    let dataform = new FormData();
    let koleksidata = document.querySelectorAll(".inputscannerakhir");

    for(let x = 0 ; x < koleksidata.length ; x++){
        let key = koleksidata[x].getAttribute("data-keykirimscanner")
        let val = koleksidata[x].value;
        dataform.append(key,val);
    }
    dataform.append("tekshtmlnilai",kodebto);
    
    divinfo.innerHTML = `<img src="/img/barloading.gif"> Sedang memproses, mohon tunggu ...`;
    divpg.innerHTML = `<img src="/img/barloading.gif"> Sedang memproses, mohon tunggu ...`;
    dives.innerHTML = `<img src="/img/barloading.gif"> Sedang memproses, mohon tunggu ...`;
    divlj.innerHTML = `<img src="/img/barloading.gif"> Sedang memproses, mohon tunggu ...`;
    
    let iddarimana = (koreksidarimana.innerHTML).split("_")[1];
    let idakseskoreksi = (koreksidarimana.innerHTML).split("_")[0];
    
    fetch(constlinknilai + "?action=gurukirimnilai", {
        method: 'post',
        body: dataform
    }).then(u => u.json())
        .then(q => {
            divinfo.innerHTML = q.result;
            divpg.innerHTML =q.result;
            dives.innerHTML = q.result;
            divlj.innerHTML = q.result;
    
            
            bolean_kirimakhirscanner = false;
            
            
            
            if (iddarimana == "hariini") {
                getdaftarnilai(idakseskoreksi)
            } else {
                daftarnilaikronologi(idakseskoreksi)

            }

        })
        .catch(er => {
            console.log(er);
            "Maaf, terjadi kesalahan.";
            divinfo.innerHTML = "Maaf, terjadi kesalahan.";
            divpg.innerHTML ="Maaf, terjadi kesalahan.";
            dives.innerHTML = "Maaf, terjadi kesalahan.";
            divlj.innerHTML = "Maaf, terjadi kesalahan.";

            bolean_kirimakhirscanner = false;

            divinfo.innerHTML = "";
            divpg.innerHTML = "";
            dives.innerHTML = "";
            divlj.innerHTML = "";
        });
}
//
let fokusDatasoalkontenmateri = [];
let fokusDatasoalkontenmateriawal = [];
let iRow_dbsoalkontenmateri = 2; // sama dengan 1dbaris
let cekbentuksoaloutkontenmateri = document.querySelectorAll("input[name=mbskontenmateri_pilihanbentuksoal]");
const mbskontenmateri_filter = document.getElementById("mbskontenmateri_filter");
const mbskontenmateri_lihatpropertysoal = document.getElementById("mbskontenmateri_lihatpropertysoal");
const mbskontenmateri_ingindiedit = document.getElementById("mbskontenmateri_ingindiedit");
const btnkontenmateri_terapkansoaledit = document.querySelector(".btnkontenmateri_terapkansoaledit");
const btnkontenmateri_terapkansoal = document.querySelector(".btnkontenmateri_terapkansoal");
const btn_terapkanfilterkontenmateri = document.querySelector(".terapkanfilterkontenmateri");
const input_mbskontenmateri_kriteriafilter = document.getElementById("mbskontenmateri_kriteriafilter");
let modsokontenmateri_awal = document.querySelector(".mbskontenmateri_awal"), 
    modsokontenmateri_akhir = document.querySelector(".mbskontenmateri_akhir"), 
    modsokontenmateri_selanjutnya = document.querySelector(".mbskontenmateri_next"), 
    modsokontenmateri_sebelumnya = document.querySelector(".mbskontenmateri_prev"), 
    modsokontenmateri_spanhalaman = document.querySelector(".mbskontenmateri_infohalaman"), 
    modsokontenmateri_page_saatini=1, modsokontenmateri_per_page=1;

btn_terapkanfilterkontenmateri.onclick = () =>{
    if(fokusDatasoalkontenmateri.length == 0){
        alert("Maaf, database soal tidak kami temukan");
        return
    };
    
    let kriteria = input_mbskontenmateri_kriteriafilter.value;
    let infoawal = document.querySelector(".mbskontenmateri_info").innerHTML;
    let split_infoawal = infoawal.split(" serta mencari soal dengan kata kunci ")
   
    if(split_infoawal.length>1){
        document.querySelector(".mbskontenmateri_info").innerHTML = infoawal[0] + " serta mencari soal dengan kata kunci "+ kriteria;
    }else{
        document.querySelector(".mbskontenmateri_info").innerHTML += " serta mencari soal dengan kata kunci "+ kriteria;

    }
    
    let araysebelumdicari = fokusDatasoalkontenmateriawal;
            
    let ar = [];
    if(kriteria.indexOf(",")>-1){
        let spl = kriteria.split(",");//array
        for(i = 0 ; i < spl.length ; i++){
            if(i == 0){
                ar = fokusDatasoalkontenmateriawal.filter(s => Object.entries(s).filter(([k,v])=> v.toString().toLowerCase().indexOf(spl[i].toLowerCase())>-1).length!==0)
            }else{
                ar = ar.filter(s => Object.entries(s).filter(([k,v])=> v.toString().toLowerCase().indexOf(spl[i].toLowerCase()>-1)).length!==0);
            }
        }    
        
    }else{
            
            ar = fokusDatasoalkontenmateriawal.filter(s => Object.entries(s).filter(([k,v])=> v.toString().toLowerCase().indexOf(kriteria.toLowerCase())>-1).length!==0)
    }

    if(ar.length == 0){
        alert("Maaf, tidak ditemukan database soal dengan kriteria ini. Kami akan menyajikan database yang telah ada.");
        configmodalsoalkontenmateri_peritem(araysebelumdicari,"");
        
    }else{
        configmodalsoalkontenmateri_peritem(ar,"");
        
    }
}

const configmodalsoalkontenmateri_peritem = (obj,kondisi="")=>{
    modsokontenmateri_sebelumnya.onclick = function () {
        if ( modsokontenmateri_page_saatini > 1) {
            modsokontenmateri_page_saatini--;
            gantiinHalamansoalkontenmateri(modsokontenmateri_page_saatini);
        }
    
    }
    modsokontenmateri_selanjutnya.onclick = function(){
        if ( modsokontenmateri_page_saatini < TotalHalamansoalkontenmateri()) {
            modsokontenmateri_page_saatini++;
            gantiinHalamansoalkontenmateri(modsokontenmateri_page_saatini);
        }
        
    }
    
    function gantiinHalamansoalkontenmateri(page)    {
        if (page < 1) page = 1;
        if (page > TotalHalamansoalkontenmateri()) page = TotalHalamansoalkontenmateri();

        
        let teks =``;
        
        for (var i = (page-1) * modsokontenmateri_per_page; i < (page * modsokontenmateri_per_page) && i < obj.length; i++) {
            let html= "";
            let kondisipg = document.querySelector(".kondisipilihangandakontenmateri");
            let kondisiilustrasikontenmateri = document.querySelector(".kondisiilustrasikontenmateri");
            let tombol = document.querySelector(".btnkontenmateri_terapkansoal")
                    let dataawal
                    if(obj.length == 0){
                        
                        dataawal=Object.assign({},databasesoalkosong)
                        dataawal.ilustrasi = "Tidak ada soal tipe kriteria ini";
                        dataawal.pertanyaan = "Tidak ada soal tipe kriteria ini";
                        
                    }else{
                        dataawal = obj[i]

                    }
                    
                    iRow_dbsoalkontenmateri = dataawal.idbaris;
                    
                    if(iRow_dbsoalkontenmateri == ""){
                        if(tombol.className.indexOf("w3-hide")==-1){
                            tombol.classList.add("w3-hide");
                        }
                    }else{
                        if(tombol.className.indexOf("w3-hide")>-1){
                            tombol.classList.remove("w3-hide");
                        }
                    }

                    let elisi = document.querySelectorAll("[data-dbmbskontenmateri]");
                    for(j = 0 ; j < elisi.length ; j++){
                        let key = elisi[j].getAttribute("data-dbmbskontenmateri");
                        elisi[j].innerHTML = dataawal[key];
                    }
                    if(dataawal.ilustrasi == ""){
                        kondisiilustrasikontenmateri.classList.add("w3-hide");
                    }else{
                        kondisiilustrasikontenmateri.classList.remove("w3-hide");
                    }
                    if(dataawal.bentuksoal == "Pilihan Ganda"){
                        if(dataawal.tampilanpg == "BIASA"){
                                html +=`<ol style="list-style-type:upper-alpha;margin:0 0 0 -1.4461538461999965em">
                                <li>${dataawal.opsiA}</li>
                                <li>${dataawal.opsiB}</li>
                                <li>${dataawal.opsiC}</li>`
                                if(dataawal.opsiD !== ""){
                                    html +=`<li>${dataawal.opsiC}</li>`
                                }
                                html +=`</ol>`;
                            }else{  
                                let db = dataawal;
                                let arropsiA = JSON.parse(db.opsiA);
                                let arropsiB = JSON.parse(db.opsiB);
                                let arropsiC = JSON.parse(db.opsiC);
                                let arropsiD = [];
                                let arrHead = JSON.parse(db.headerpg);
                                let jumlahPG = 3;
                                
                                if(db.opsiD !== ""){
                                    arropsiD = JSON.parse(db.opsiD);
                                    jumlahPG = 4
                                }
                                html += `<table style="border-collapse:collapse;border:.5pt solid #000;width:100%">`;
                                html +=`<thead><tr style="border:.5pt solid #000"><th style="border:.5pt solid #000;background-color:#f1f1f1;width:30px"></th>`;
                                for(a = 0 ; a < arrHead.length ; a++){
                                    html +=`<th style="border:.5pt solid #000;text-align:center;background-color:#f1f1f1">${arrHead[a]}</th>`
                                }
                                html +=`</tr><tbody>`;
                                //tabel opsi A
                                html +=`<tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">A.</td>`;
                                for(c = 0 ; c <arrHead.length ; c++){
                                    html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiA[c]}</td>`
                                    
                                }
                                //tabel opsi B
                                html +=`</tr><tr style="border:.5pt solid #000;vertical-align:top;"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">B.</td>`;
                                for(c = 0 ; c < arrHead.length ; c++){
                                    html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiB[c]}</td>`;
                                }
                                //tabel opsi C
                                html +=`</tr><tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">C.</td>`;
                                for(c = 0 ; c <arrHead.length ; c++){
                                    html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiC[c]}</td>`
                                    
                                }
                                //tabel opsi D
                                if(db.opsiD !== ""){
                                    html +=`</tr><tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:15px;vertical-align:top;text-align:center;padding-left:5px">D.</td>`;
                                    for(c = 0 ; c < arrHead.length ; c++){
                                        html +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiD[c]}</td>`;
                                    }
                                    html +=`</tr>`
                                }else{
                                    html +=`</tr>`
                                }
                                
                                html +=`</tbody></table>`
                            }
                    }
                        kondisipg.innerHTML = html;
                    }
        
        

        modsokontenmateri_spanhalaman.innerHTML = page + " dari " + TotalHalamansoalkontenmateri();

        if (page == 1) {
            modsokontenmateri_sebelumnya.style.visibility = "hidden";
            modsokontenmateri_awal.style.visibility = "hidden";
        } else {
            modsokontenmateri_awal.style.visibility = "visible"
            modsokontenmateri_sebelumnya.style.visibility = "visible";
        }

        if (page == TotalHalamansoalkontenmateri()) {
            modsokontenmateri_selanjutnya.style.visibility = "hidden";
            modsokontenmateri_akhir.style.visibility = "hidden";
        } else {
            modsokontenmateri_akhir.style.visibility = "visible";
            modsokontenmateri_selanjutnya.style.visibility = "visible";
        }

    }
    function TotalHalamansoalkontenmateri()
    {
        return Math.ceil(obj.length / modsokontenmateri_per_page);
    }

    modsokontenmateri_akhir.onclick = function (){
        let hal = TotalHalamansoalkontenmateri();
         modsokontenmateri_page_saatini = hal;
        gantiinHalamansoalkontenmateri(hal);

    }
    modsokontenmateri_awal.onclick =function (){
         modsokontenmateri_page_saatini = 1;
        gantiinHalamansoalkontenmateri(1);
        // Validate page
        //  if (page < 1) page = 1;
        //  if (page > TotalHalamansoalkontenmateri()) page = TotalHalamansoalkontenmateri();

    }
    if(kondisi == ""){
        gantiinHalamansoalkontenmateri(1);
    }else{
        
        let valuse = obj.map(m=> parseInt(m.idbaris));
        
        let indeknya = valuse.indexOf(parseInt(kondisi));
        
        gantiinHalamansoalkontenmateri((indeknya+1));
    }
    mbskontenmateri_ingindiedit.checked = false;
    let elisi = document.querySelectorAll("[data-dbmbskontenmateri]");
    for(i = 0 ; i < elisi.length ; i++){
    elisi[i].removeAttribute("contenteditable");
    }
    if(btnkontenmateri_terapkansoaledit.className.indexOf("w3-hide")==-1){
        btnkontenmateri_terapkansoaledit.classList.add("w3-hide");
    }
    
}

let elemeneditkontenmateri;
const aktifkanmodalkontenmateri_banksoal = (elemen="",dataidbarissoal) =>{
    // let lR = elemen.parentElement.rowIndex;
    // let lC = elemen.cellIndex;

    document.getElementById('modalbanksoalkontenmateri').style.display='block';
    document.getElementById('modalbanksoalkontenmateri').scrollTo({ top: 0, behavior: 'smooth' });
    doc.body.focus();
    // document.getElementById("mbskontenmateri_filter").checked = false;
    let selectmapel = document.formuploadmateri.jenistagihan;//document.getElementById("naskahsoal_mapelapatema");
    let ops = selectmapel.options;
    let indek = ops.selectedIndex;
    let v_mapel = ops[indek].value;
    let t_mapel = ops[indek].text;
    let krt_kelas = [];
   
    krt_kelas = v_mapel=="ustertulis"||v_mapel=="uspraktek"?["4","5","6"]:[idJenjang];
    let afokusDatasoalkontenmateri = databasesoal.filter(s=> krt_kelas.indexOf(s.jenjang)>-1);
    let infoawal = "Anda memilih Database Soal untuk " + t_mapel + " yang memuat konten materi / soal yang bersumber dari kelas " + krt_kelas.join();
    
    // let tabel = document.querySelector(".tempatnaskahsoal_soal");
    // let lRow = elemen.parentElement.rowIndex;
    
    
    // let nosoal = contenmatericeknomorsoaldulu(elemen,ceknomorsoal);//ceknomorsoal == ""|| ceknomorsoal == 0? contenmatericeknomorsoaldulu(elemen,ceknomorsoal):ceknomorsoal;
    // let nosoal = ceknomorsoal == ""|| ceknomorsoal == 0? contenmatericeknomorsoaldulu(elemen,ceknomorsoal):ceknomorsoal;
    // let innerDiv = elemen;
    elemeneditkontenmateri = elemen;
    
    
    let kondisipg = document.querySelector(".kondisipilihangandakontenmateri");
    let cekbentuksoal = document.querySelectorAll("input[name=mbskontenmateri_pilihanbentuksoal]");
    cekbentuksoal.forEach(el => {
        if(el.checked){
            document.querySelector(".mbskontenmateri_info").innerHTML = infoawal + " dengan kriteria bentuk soal "+el.value;
            fokusDatasoalkontenmateri = afokusDatasoalkontenmateri.filter(s=> s.bentuksoal == el.value);
            
        }
    });
    // if(fokusDatasoalkontenmateri.length == 0){
    //     alert("Belum ada database soal untuk kriteria soal ini");
    //     document.getElementById('modalbanksoalkontenmateri').style.display='none';
    //     return
    // }
    
    let arOB =[]
    if(document.getElementById("mbskontenmateri_filter").checked){
        let krt = document.getElementById("mbskontenmateri_kriteriafilter").value;
        if(krt.value == ""){
            arOB = fokusDatasoalkontenmateri;
        }else{
            document.querySelector(".mbskontenmateri_info").innerHTML +=  " serta mencari soal dengan kata kunci "+ krt;
            arOB = fokusDatasoalkontenmateri.filter(s=>Object.fromEntries(Object.entries(s).filter((k,v)=> v.toString().toLowerCase().indexOf(krt.toLowerCase())>-1)).length!==0);

        }
        

    }else{
        arOB = fokusDatasoalkontenmateri
    }

        // if(v_mapel.indexOf("TEMA")>-1){
        //     arOB = fokusDatasoalkontenmateri;
        // }else{
        //     if(v_mapel.indexOf("US_")>-1){
        //         let kr = v_mapel.replace("US_","")
        //         arOB = fokusDatasoalkontenmateri.filter(s=> s.kodemapel == kr);

        //     }else{
        //         arOB = fokusDatasoalkontenmateri.filter(s=> s.kodemapel == v_mapel);

        //     }
        // }
        fokusDatasoalkontenmateriawal = arOB;
    //iRow_dbsoalkontenmateri = dataawal.idbaris;
    configmodalsoalkontenmateri_peritem(arOB,dataidbarissoal);
    btnkontenmateri_terapkansoal.onclick = function (){
        let ceknomorsoal = document.querySelector(".mbskontenmateri_fokusnosoal").value ;
        let nosoal =  contenmatericeknomorsoaldulu(elemen,ceknomorsoal);
        let innerDiv = elemen;
        terapkankontenmateri_itemsoal(innerDiv,nosoal)
    };
   
    
    
    
    //el.setAttribute("data-idbarissoal",lRow+"_"+lCol);
}

cekbentuksoaloutkontenmateri.forEach(el => {
    el.addEventListener("change",()=>{
        if(el.checked){
            let selectmapel = document.formuploadmateri.jenistagihan;//document.getElementById("naskahsoal_mapelapatema");
            let ops = selectmapel.options;
            let indek = ops.selectedIndex;
            let v_mapel = ops[indek].value;
            let t_mapel = ops[indek].text;
            let krt_kelas = [];
            krt_kelas = v_mapel.indexOf("US_")>-1?["4","5","6"]:[idJenjang];
            let afokusDatasoalkontenmateri = databasesoal.filter(s=> krt_kelas.indexOf(s.jenjang)>-1);
            let infoawal = "Anda memilih Database Soal untuk " + t_mapel + " yang memuat konten materi / soal yang bersumber dari kelas " + krt_kelas.join();
            
            
            document.querySelector(".mbskontenmateri_info").innerHTML = infoawal + " dengan kriteria bentuk soal "+el.value;
            // let tabel = document.querySelector(".tempatnaskahsoal_soal");
            // let lRow = elemen.parentElement.rowIndex;
            
            // let nosoal = tabel.rows[lRow].cells[1].innerHTML
            // document.querySelector(".mbskontenmateri_fokusnosoal").innerHTML = nosoal;

            
            fokusDatasoalkontenmateri = afokusDatasoalkontenmateri.filter(s=> s.bentuksoal == el.value);
            let arOB =[];
            arrOB = fokusDatasoalkontenmateri;
            // if(v_mapel.indexOf("TEMA")>-1){
            //     arOB = fokusDatasoalkontenmateri;
            // }else{
            //     // arOB = fokusDatasoalkontenmateri.filter(s=> s.kodemapel == v_mapel);
            //     if(v_mapel.indexOf("US_")>-1){
            //         let kr = v_mapel.replace("US_","")
            //         arOB = fokusDatasoalkontenmateri.filter(s=> s.kodemapel == kr);

            //     }else{
            //         arOB = fokusDatasoalkontenmateri.filter(s=> s.kodemapel == v_mapel);

            //     }
            // }
            
            // if(arOB.length == 0){
            //     let obkosongan = Object.assign({},databasesoalkosong);
            //     obkosongan.opsiA =`[""]`;
            //     obkosongan.opsiB =`[""]`;
            //     obkosongan.opsiC =`[""]`;
            //     obkosongan.opsiD =`[""]`;
            //     obkosongan.headerpg =`[""]`;
            //     obkosongan.ilustrasi = "Tidak ada soal tipe kriteria ini";
            //     obkosongan.pertanyaan = "Tidak ada soal tipe kriteria ini";
            //     arOB.push(obkosongan)
            // }
            // console.log(arOB);
            fokusDatasoalkontenmateriawal = arOB;
            configmodalsoalkontenmateri_peritem(arOB,"");
        }
    })
});

const terapkankontenmateri_itemsoal = (elemen,nosoal)=>{
    
   
    let mbskontenmateri_ceklisilustrasi = document.getElementById("mbskontenmateri_ceklisilustrasi")
    let db = fokusDatasoalkontenmateri.filter(s => s.idbaris == iRow_dbsoalkontenmateri)[0];
    let html = "";//kalo pg
    let htmlnosoal = ``;
    let htmlilustrasi ="";
    let htmlpertanyaan ="";
    let htmltemp = `<ol start="${nosoal}" class="w3-padding w3-card-4">`;//0
    
    //ilustrasi
    if(db.ilustrasi !== ""){
        if(mbskontenmateri_ceklisilustrasi.checked){
            htmlilustrasi =`${db.ilustrasi}<br>`
        }
    }
    htmlpertanyaan = db.pertanyaan;
    
    if(db.bentuksoal == "Pilihan Ganda"){
        htmlnosoal = `<div class="w3-badge w3-left" data-sourcebanksoalid="${db.idbaris}">${nosoal}</div>`;
        htmltemp +=`<li id="soalke-${nosoal}" class="calcnosoal" style="list-style-type:none">${htmlilustrasi}<br>${htmlpertanyaan}<hr style="border-top-color: olive;">`;//1
        
        if(db.tampilanpg == "BIASA"){ //-1.4461538461999965em
            htmltemp +=`<ol style="list-style-type:upper-alpha;margin:5px 5px 0px 20px;padding:0">`
            htmltemp+=`<li><input class="calc" type="radio" name="soal${nosoal}" id="${nosoal}A"><label class="opsi" for="${nosoal}A">${db.opsiA}</label></li>`;
            htmltemp+=`<li><input class="calc" type="radio" name="soal${nosoal}" id="${nosoal}B"><label class="opsi" for="${nosoal}B">${db.opsiB}</label></li>`;
            htmltemp+=`<li><input class="calc" type="radio" name="soal${nosoal}" id="${nosoal}C"><label class="opsi" for="${nosoal}C">${db.opsiC}</label></li>`;
            if(db.opsiD !==""){
                htmltemp +=`<li><input class="calc" type="radio" name="soal${nosoal}" id="${nosoal}D"><label class="opsi" for="${nosoal}D">${db.opsiD}</li>`;
            }
            htmltemp +=`</ol>`;//3 li opsi PG
        }else{
            htmltemp+=`<hr>`;
            let arropsiA = JSON.parse(db.opsiA);
                    let arropsiB = JSON.parse(db.opsiB);
                    let arropsiC = JSON.parse(db.opsiC);
                    let arropsiD = [];
                    let arrHead = JSON.parse(db.headerpg);
                    let jumlahPG = 3;
                    
                    if(db.opsiD !== ""){
                        arropsiD = JSON.parse(db.opsiD);
                        jumlahPG = 4
                    }
                    htmltemp += `<table style="border-collapse:collapse;border:.5pt solid #000;width:100%;font-family:Times New Roman, Times, serif;">`;
                    htmltemp +=`<thead><tr style="border:.5pt solid #000"><th style="border:.5pt solid #000;background-color:#f1f1f1;width:30px"></th>`;
                    for(a = 0 ; a < arrHead.length ; a++){
                        htmltemp +=`<th style="border:.5pt solid #000;text-align:center;background-color:#f1f1f1">${arrHead[a]}</th>`
                    }
                    htmltemp +=`</tr><tbody>`;
                    //tabel opsi A
                    htmltemp +=`<tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:30px;vertical-align:top;text-align:center;padding-left:5px">`;
                    htmltemp+=`<input class="calc" type="radio" name="soal${nosoal}" id="${nosoal}A"><label class="opsi" for="${nosoal}A">A.  </label></td>`;
                    for(c = 0 ; c <arrHead.length ; c++){
                        htmltemp +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiA[c]}</td>`
                        
                    }
                    //tabel opsi B
                    htmltemp +=`</tr><tr style="border:.5pt solid #000;vertical-align:top;"><td style="border:.5pt solid #000;width:30px;vertical-align:top;text-align:center;padding-left:5px">`;
                    htmltemp+=`<input class="calc" type="radio" name="soal${nosoal}" id="${nosoal}B"><label class="opsi" for="${nosoal}B">B.  </label></td>`;
                    for(c = 0 ; c < arrHead.length ; c++){
                        htmltemp +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiB[c]}</td>`;
                    }
                    //tabel opsi C
                    html +=`</tr><tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:30px;vertical-align:top;text-align:center;padding-left:5px">`;
                    htmltemp+=`<input class="calc" type="radio" name="soal${nosoal}" id="${nosoal}C"><label class="opsi" for="${nosoal}C">C.  </label></td>`;
                    for(c = 0 ; c <arrHead.length ; c++){
                        htmltemp +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiC[c]}</td>`
                        
                    }
                    //tabel opsi D
                    if(db.opsiD !== ""){
                        htmltemp +=`</tr><tr style="border:.5pt solid #000"><td style="border:.5pt solid #000;width:30px;vertical-align:top;text-align:center;padding-left:5px">`;
                        htmltemp+=`<input class="calc" type="radio" name="soal${nosoal}" id="${nosoal}D"><label class="opsi" for="${nosoal}D">D.  </label></td>`;
                        for(c = 0 ; c < arrHead.length ; c++){
                            htmltemp +=`<td style="border:.5pt solid #000;vertical-align:top;padding-left:5px">${arropsiD[c]}</td>`;
                        }
                        html +=`</tr>`
                    }else{
                        html +=`</tr>`
                    }

                    html +=`</tbody></table>`
            
        }

        htmltemp +=`</li>`;//1
    }else{
        htmlnosoal =`<div class="w3-badge w3-aqua w3-left" data-sourcebanksoalid="${db.idbaris}">${nosoal}</div>`;
        htmltemp+=`<li id="essay${nosoal}" class="soalessay" style="border-bottom:1px solid blue">`;//li
        htmltemp+=`<div id="pertanyaanessay_${nosoal}">${htmlilustrasi}<br>${htmlpertanyaan}<br></div>`;
            htmltemp+=`<div id="tomboljawaban${nosoal}">`;//3 div tomboljawaban
            htmltemp+=`<hr><button onclick="tombolketikjawaban('${nosoal}')">Ketik Jawaban No ${nosoal}</button><br><br>`;
            htmltemp+=`<sub>atau</sub><br><br> <button onclick="tomboluploadjawaban('${nosoal}')">Upload Media No ${nosoal}</button><br><br><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub>`;
            htmltemp+=`</div><br>`;//3 divtomboljawaban
        htmltemp +=`</li>`;//1

    }
    
    htmltemp+=`</ol>`;//0
    // html = "<div>"+htmlnosoal + htmltemp + "<br><br></div>";
    html = htmlnosoal + htmltemp + "<br><br>";
    
    elemen.execCommand("insertHTML",null, html);
    //barisakhir dari tabel biasanya ga dikasih warna jadi tanda warna di sini:
    

    let isianinput = null;
    isianinput = document.getElementById("barukuncipgtemporary");
    let isianawal = isianinput.value;
    
    let divs = doc.getElementsByTagName('div');
    if(db.bentuksoal == "Pilihan Ganda"){
        if(isianawal==""){
            isianinput.value = nosoal+ db.kuncijawaban;
            let creatediv = doc.createElement("div");
            creatediv.innerHTML = "_KUNCI-PG_" + nosoal+ db.kuncijawaban;
            doc.body.appendChild(creatediv);

            
        }else{
            let teks = isianawal +","+nosoal+ db.kuncijawaban;
            let arrteks = teks.split(",");
            arrteks.sort((a,b)=> parseInt(a.match(/(\d+)/)==null?0:a.match(/(\d+)/)[0]) - parseInt(b.match(/(\d+)/)==null?0:b.match(/(\d+)/)[0]));
            // isianinput.value = isianawal +","+nosoal+ db.kuncijawaban;
            isianinput.value = arrteks;
            let cek = divs.length;
            let bol = false;
            for(a = 0 ; a < divs.length ; a++){
                let teks = divs[a].innerHTML;
                if(teks.indexOf("_KUNCI-PG_")>-1){
                
                    bol = true;
                    cek = a;

                    break;
                }else{
                // console.log("none");
                }
            }

            // divs[cek].innerHTML = "_KUNCI-PG_" + isianawal +","+nosoal+ db.kuncijawaban;
            divs[cek].innerHTML = "_KUNCI-PG_" + arrteks;
           
           
        }

        let ele = document.querySelectorAll(".tdnosoal_editor_" + nosoal);
            let elaktif = document.querySelector(".tdpg_pgeditor_" + nosoal+ db.kuncijawaban);
            //hapus dulu bg warannya;
            for (i = 0; i < ele.length; i++) {
                // ele[i].className = ele[i].className.replace("w3-light-blue", "");
                ele[i].classList.remove("w3-light-blue");
            };
            // elaktif.className += " w3-light-blue";
            elaktif.classList.add("w3-light-blue");
    }

    let namatabel = document.getElementById("tabeldeteksidaribanksoal");
    let bodytabel = namatabel.getElementsByTagName("tbody")[0];
    let cekdivkd = document.getElementById("infosementarakdbanksoal");
    let cekisiannokd = document.getElementById("cekkddaribanksoalbuatisian");
    
    let elemendata = doc.querySelectorAll("[data-sourcebanksoalid]");
    let array_dbobjek = [];
   
    let htmlkd = `Properti Soal yang diambil dari Bank Soal<table class="w3-table garis w3-tiny w3-centered"><thead><tr class="w3-light-grey"><td>No. Soal</td><td>Mapel</td><td>KD</td><td>Kunci Jawaban</td></tr></thead><tbody>`;
    if(elemendata.length>0){
        for(let i = 0 ; i < elemendata.length; i++ ){
            let paramid = elemendata[i].getAttribute("data-sourcebanksoalid");
            let dbsoalnya = databasesoal.filter(s=> s.idbaris == paramid)[0];
            let objek = Object.assign({},dbsoalnya);
            objek.nosoaledura = elemendata[i].innerHTML
            htmlkd +=`<tr><td>${elemendata[i].innerHTML}</td><td>${dbsoalnya.kodemapel}</td><td>${dbsoalnya.kd}</td><td>${dbsoalnya.bentuksoal=="Pilihan Ganda"?dbsoalnya.kuncijawaban:""}</td></tr>`;
            array_dbobjek.push(objek);
        }
    }else{
        // htmlkd+=`<tr><td colspan="3" class="w3-center">Tidak Terdeteksi Adanya Bank Soal</td></tr>`;
        htmlkd+=`<tr><td>${nosoal}</td><td>${db.kodemapel}</td><td>${db.kd}</td>${db.bentuksoal=="Pilihan Ganda"?db.kuncijawaban:""}</tr>`;
        array_dbobjek.push(db);
    }
    htmlkd +=`</tbody></table>`;
    cekdivkd.innerHTML = htmlkd;
    let ok_kuncikd = {};
    if(array_dbobjek.length > 0){
        let mapel_kd = getUniquePropertyValues(array_dbobjek,"kodemapel","kd");
        for(let m = 0 ; m < mapel_kd.length; m++){
            let key_mapel = mapel_kd[m].split("_")[0]
            let key_kd = mapel_kd[m].split("_")[1]
            ok_kuncikd[mapel_kd[m]]= array_dbobjek.filter(s=> s.kodemapel == key_mapel && s.kd == key_kd ).map(mm => mm.nosoaledura);
        }
    }

    
    document.formuploadmateri.kuncikd.value = JSON.stringify(ok_kuncikd)
    let stringkuncikd = Object.keys(ok_kuncikd).map(m => m+":"+ok_kuncikd[m]).join("<||>");//.join("<||>")
    let stringhapuskutip = stringkuncikd.replace(/\"/g,"");//.toString();
    
    let htmmlmodal = ""
    let datamodal = Object.keys(ok_kuncikd);
    for(let ii = 0 ; ii < datamodal.length; ii++){
        htmmlmodal += `<tr><td>${datamodal[ii].split("_")[0]}</td><td>No. Soal: ${datamodal[ii].split("_")[1]}</td>${ok_kuncikd[datamodal[ii]].join(", ")}</tr>`;
    }
    bodytabel.innerHTML = htmmlmodal;

    
    // let divss = doc.querySelectorAll('div');
    // let indekkuncikd = divss.length-1;
    // let bolkuncikd = false;
    // for(let l = 0 ; l < divss.length; l++){
    //     let isidiv = divss[l].innerHTML;
       
    //     if(isidiv.indexOf("_KUNCI-KD_")>-1){
    //         indekkuncikd = l;
    //         console.log(l);
    //         bolkuncikd = true;
    //         break;
    //     }
    // }
    // console.log(bolkuncikd,indekkuncikd);

    // if(bolkuncikd){
    //     divss[indekkuncikd].innerHTML = "_KUNCI-PD_" + stringhapuskutip;;
    // }else{
    //     let creatediv = doc.createElement("div");
    //         creatediv.innerHTML = "_KUNCI-KD_" + stringhapuskutip;
    //         doc.body.appendChild(creatediv);
    // }

    //caranya cek adari isianawal dan nosal
    // cari di elemenkuncinya di masing-masing
    //elemen.setAttribute("data-idbarissoal",iRow_dbsoalkontenmateri);
    document.getElementById('modalbanksoalkontenmateri').style.display='none';
    isikankuncikdke_form(stringhapuskutip)
    //el.setAttribute("data-idbarissoal",lRow+"_"+lCol);
    document.querySelector(".mbskontenmateri_fokusnosoal").value = "";
    doc.body.focus()
}
const isikankuncikdke_form = (stringhapuskutip)=>{
    let editore = document.querySelector("#editor_ade");
    const docdoc = editore.contentDocument || editore.contentWindow.document;
    let divss = docdoc.querySelectorAll('div');
    let indekkuncikd;// = divss.length-1;
    let bolkuncikd = false;
    let define
    for(let l = 0 ; l < divss.length; l++){
        let isidiv = divss[l].innerHTML;
       
        if(isidiv.indexOf("_KUNCI-KD_")>-1){
            indekkuncikd = l;
            
            define = l
            bolkuncikd = true;
            break;
        }
    }
    
    if(bolkuncikd){
        divss[indekkuncikd].innerHTML = "_KUNCI-KD_" + stringhapuskutip;;
    }else{
        
        let creatediv = doc.createElement("div");
            creatediv.innerHTML = "_KUNCI-KD_" + stringhapuskutip;
            doc.body.appendChild(creatediv);
    }
}
mbskontenmateri_filter.addEventListener("change",()=>{
    let filteraktif = document.querySelector(".filteraktifkontenmateri");
    if(mbskontenmateri_filter.checked){
        filteraktif.classList.remove("w3-hide");
    }else{
        filteraktif.classList.add("w3-hide");
    }
});

mbskontenmateri_lihatpropertysoal.addEventListener("change",()=>{
    let mbskontenmateri_porpertysoal = document.querySelector(".mbskontenmateri_porpertysoal");
    if(mbskontenmateri_lihatpropertysoal.checked){
        mbskontenmateri_porpertysoal.classList.remove("w3-hide")
    }else{
        mbskontenmateri_porpertysoal.classList.add("w3-hide")

    }
});

mbskontenmateri_ingindiedit.addEventListener("change",()=>{
    let elisi = document.querySelectorAll("[data-dbmbskontenmateri]");
    if(mbskontenmateri_ingindiedit.checked){
        btnkontenmateri_terapkansoaledit.classList.remove("w3-hide");
        for(i = 0 ; i < elisi.length ; i++){
            elisi[i].setAttribute("contenteditable","true")
        }
    }else{
        for(i = 0 ; i < elisi.length ; i++){
        elisi[i].removeAttribute("contenteditable");
        }
        btnkontenmateri_terapkansoaledit.classList.add("w3-hide");
    }
    let tombol = document.querySelector(".btnkontenmateri_terapkansoal");
    btnkontenmateri_terapkansoaledit.onclick=function(){
        
            alert("Anda akan memasukkan soal ini ke dalam materi Anda. Mohon bersabar karena kami akan menyimpan perubahan editan Anda ke server")
            // jika edit nanti tolong dikirim ke server, data aslinya tidak akan hilang. Editan akan 
            kirimmodifikasidarimodalbanksoal(iRow_dbsoal,"data-dbmbskontenmateri");
            document.getElementById('modalbanksoal').style.display='none';
    }

});


function getUniquePropertyValues(_array,_property,_property2){ // sourceCode: https://thispointer.com/get-unique-values-from-an-array-of-objects/
   return [...new Set(_array.map(element => element[_property]+"_"+element[_property2]))]; 
}

const kirimmodifikasidarimodalbanksoal = (ibrs, kondisi="")=>{
    let datawal = databasesoal.filter(s => s.idbaris == ibrs)[0];
    let datamodif = null;
    let paramkriteria ;
    let paramtombolterapkanedit;
    let modalbanksoal ;
    let elfok 
    if(kondisi == "data-dbmbs"){
        paramkriteria = "data-dbmbs";
        paramtombolterapkanedit = "btn_terapkansoaledit";
        datamodif = document.querySelectorAll("[data-dbmbs]");
        modalbanksoal = document.getElementById("modalbanksoal");
        elfok=null
    }else if(kondisi == "data-dbmbskontenmateri"){
        paramkriteria = "data-dbmbskontenmateri"
        paramtombolterapkanedit = "btnkontenmateri_terapkansoaledit"
        datamodif = document.querySelectorAll("[data-dbmbskontenmateri]");
        modalbanksoal = document.getElementById("modalbanksoalkontenmateri");
        let elemeniframe = document.getElementById("editor_ade");
        elfok = elemeniframe.contentDocument || elemeniframe.contentWindow.document;
        
    }else{
        paramkriteria = "data-dbmbs"
        paramtombolterapkanedit = "btn_terapkansoaledit";
        datamodif = document.querySelectorAll("[data-dbmbs]");
        modalbanksoal = document.getElementById("modalbanksoal");
        elfok = null
    }
    let arrayClass = [];
    let valuemodif = {};
    for(let i = 0 ; i < datamodif.length;i++){
        let value = datamodif[i].getAttribute(paramkriteria);
        arrayClass.push("modifsoal_"+value);
        if(datamodif[i].nodeName == "INPUT" || datamodif[i].nodeName == "SELECT"){
            
            valuemodif[value] = datamodif[i].value;
        }else{
            valuemodif[value] = datamodif[i].innerHTML;
        }
       
        }
    
    let divanim = document.querySelector("."+paramtombolterapkanedit);
    divanim.innerHTML = `<img src="/img/barloading.gif"> Proses ...`
    
    valuemodif.idguru = idguru;
    valuemodif.oleh = namauser;
    let obAs = Object.assign({},datawal);
    let obJadi = Object.assign(obAs,valuemodif);
    
    let key = JSON.stringify(Object.keys(obJadi))
    let nilai = Object.values(obJadi);
    nilai.shift()
    let tabel = JSON.stringify (nilai)
    let tab = "banksoal";
    
    let datakirim = new FormData()
    datakirim.append("tab",tab);
    datakirim.append("key",key);
    datakirim.append("tabel",tabel);
    
    fetch(url_kaldikaja+"?action=simpanbarisketaburut",{
        method:"post",
        body:datakirim
    }).then(m => m.json())
    .then(r => {
        
        divanim.innerHTML = "Terapkan Edit";
        
        keydatabasesoal = Object.keys(r.data[0]);
        if(r.result>1){
            databasesoal = r.data.filter(s=> s.hapus == "");
            databasesoalall = r.data

            databasesoalterhapus = r.data.filter(s=> s.hapus == "hapus");
        }
        for(i=0 ; i < keydatabasesoal.length; i++){
            databasesoalkosong[keydatabasesoal[i]]="";
        }
        alert("Data Berhasil dimodifikasi");
        if(kondisi == "data-dbmbskontenmateri"){
            configmodalsoalkontenmateri_peritem(databasesoal,r.result);
            elfok.body.focus();
            let ceknomorsoal = document.querySelector(".mbskontenmateri_fokusnosoal").value ;
            let nosoal =  contenmatericeknomorsoaldulu(elfok,ceknomorsoal);
            iRow_dbsoalkontenmateri = r.result;
            fokusDatasoalkontenmateri = databasesoal;//.filter(s=> s.idbaris == iRow_dbsoalkontenmateri)[0]
            terapkankontenmateri_itemsoal(elfok,nosoal)
        }else{
            configmodalsoal_peritem(databasesoal,r.result);
            elemenedit.setAttribute("data-idbarissoal",r.result);

        }
        // updatetabeldatabasesoal("edit");
        // document.getElementById('modal_soalkisidandesainsoallainnya').style.display='none';
        // document.getElementById('tooltipbaru_keyboard_ketikan').style.display='none';
        
    }).catch(er=>console.log(er));
}
const contenmatericeknomorsoaldulu =(el,ceksoal)=>{
    let divpg = el.querySelectorAll(".calcnosoal");
    let divessay = el.querySelectorAll(".soalessay");
    let nosoalakhir = ceksoal;
    let cekid,angkaparse;
    if(ceksoal == "" || ceksoal ==0){

        // cek pg jangan sampe null
        if(divpg.length == 0 && divessay.length == 0){
            //ketika belum ada soal sama sekali, maka nomor soalnya: 1
        nosoalakhir = 1
        }else if(divpg.length > 0 && divessay.length == 0){
            cekid = divpg[divpg.length-1].getAttribute("id");
            angkaparse = cekid.match(/(\d+)/)[0]
            nosoalakhir = parseInt(angkaparse)+1;
        }else if(divpg.length > 0 && divessay.length > 0){
            cekid = divessay[divessay.length-1].getAttribute("id");
            angkaparse = cekid.match(/(\d+)/)[0]
            nosoalakhir = parseInt(angkaparse)+1;
        }else if(divpg.length == 0 && divessay.length >0){
            cekid = divessay[divessay.length-1].getAttribute("id");
            angkaparse = cekid.match(/(\d+)/)[0];
            nosoalakhir = parseInt(angkaparse)+1;
        }
        
    }

    return nosoalakhir
}

//trialisiLJK
const modal_modalbantuisibarulagi = document.getElementById("modalbantuisibarulagi")
const print_modalbantuisi = document.getElementById("print_modalbantuisi");
const inputpg_modalbantuisi = document.getElementById("inputpg_modalbantuisi");
const previewnaskahsoal_ljkbantu = document.getElementById("previewnaskahsoal_ljkbantu")
const previewljk_modalbantuisi = document.getElementById("previewljk_modalbantuisi");
const kirimserver_modalbantuisi = document.getElementById("kirimserver_modalbantuisi");
const modal_loadingsoalbantudulu = document.getElementById("loadingsoalbantudulu");
const modal_tabelotomatisklikpg = document.getElementById("tabelotomatisklikpg");

const modal_previewljksementara = document.getElementById("previewljksementara");
const modal_lebarmodalbantuisibaru = document.getElementById("lebarmodalbantuisibaru")

const kirimserverljkbantubaru = ()=>{
    let konf = confirm("Anda yakin semua isian nilai ini sudah benar?");
    if(!konf){
        return
    }
    let dataform = new FormData();
    
    let html = modal_previewljksementara.innerHTML;
    let kodebto = window.btoa(html);

    let divclass = document.querySelectorAll("[data-keykirimnonscanner]");
    for(let i = 0 ; i < divclass.length ; i++){
        let key = divclass[i].getAttribute("data-keykirimnonscanner");
        let val = divclass[i].value;
        dataform.append(key,val)
    }
    dataform.append("tekshtmlnilai",kodebto);
    //kirimgambar
    let tabelbuktifisik = document.getElementById("tabelbuktifisikljk");
    let isitabel =""
    if(tabelbuktifisik.rows.length > 0){
        for(let t = 0 ; t < tabelbuktifisik.rows.length - 1 ; t++){
            isitabel += tabelbuktifisik.rows[t].cells[0].innerHTML;
        }
        dataform.append("html_buktifisik", isitabel);
    }

    let iddarimana = (koreksidarimana.innerHTML).split("_")[1];
    let idakseskoreksi = (koreksidarimana.innerHTML).split("_")[0];
    modal_loadingsoalbantudulu.innerHTML = `<img src="/img/barloading.gif"/>Memproses`;
    modal_tabelotomatisklikpg.innerHTML = `<img src="/img/barloading.gif"/>Memproses`;
    modal_previewljksementara.innerHTML = `<img src="/img/barloading.gif"/>Memproses`;
    
    fetch(constlinknilai + "?action=gurukirimnilai", {
            method: 'post',
            body: dataform
    }).then(u => u.json())
    .then(q => {
        modal_loadingsoalbantudulu.innerHTML = q.result;
        modal_tabelotomatisklikpg.innerHTML =  q.result;
        modal_previewljksementara.innerHTML =  q.result;

        if (iddarimana == "hariini") {
                getdaftarnilai(idakseskoreksi)
        } else {
                daftarnilaikronologi(idakseskoreksi)
        }
        setTimeout(() => {
            // modal_modalbantuisibarulagi.style.display = "none";
            tutupmodalljkbantu();
        }, 2000);
    }).catch(er => {
                console.log(er);
                "Maaf, terjadi kesalahan.";
                modal_loadingsoalbantudulu.innerHTML = "";
                modal_tabelotomatisklikpg.innerHTML = "";
                modal_previewljksementara.innerHTML = "";
               
    });
    kirimserver_modalbantuisi.removeAttribute("onclick");
}
const showhidebantuisiljkbaru = (kondisi)=>{
        
    if(modal_lebarmodalbantuisibaru.hasAttribute("style")){
        modal_lebarmodalbantuisibaru.removeAttribute("style")
    }
    if(kondisi == "awal"){
        modal_loadingsoalbantudulu.style.display="none";
        modal_tabelotomatisklikpg.style.display="block";
        modal_previewljksementara.style.display="none";
        print_modalbantuisi.setAttribute("onclick",`printadm('tabelotomatisklikpg',true)`);
    }else if(kondisi == "berinilai"){
        modal_loadingsoalbantudulu.style.display="none";
        modal_tabelotomatisklikpg.style.display="block";
        modal_previewljksementara.style.display="none";
        print_modalbantuisi.setAttribute("onclick",`printadm('tabelotomatisklikpg',true)`);
    }else if(kondisi == "lihatsoal"){
        modal_loadingsoalbantudulu.style.display="block";
        modal_tabelotomatisklikpg.style.display="none";
        modal_previewljksementara.style.display="none";
        print_modalbantuisi.setAttribute("onclick",`printadm('loadingsoalbantudulu',true)`);
    }else if(kondisi == "lihatljk"){
        modal_previewljksementara.style.width="98%";
        modal_loadingsoalbantudulu.style.display="none";
        modal_tabelotomatisklikpg.style.display="none";
        modal_previewljksementara.style.display="block";
        modal_lebarmodalbantuisibaru.setAttribute("style","width:98%")
        print_modalbantuisi.setAttribute("onclick",`printadm('previewljksementara',false)`);
    }
    modal_modalbantuisibarulagi.scrollTo({ top: 43, behavior: 'smooth' });
}
const tutupmodalljkbantu = () =>{
    modal_modalbantuisibarulagi.style.display = "none";
    modal_loadingsoalbantudulu.innerHTML = "";
    modal_tabelotomatisklikpg.innerHTML = "";
    modal_previewljksementara.innerHTML = "";
    document.getElementById("datakirimnonscanner").innerHTML ="";
}
const tooltipkan_tabelconfigpgbantuisiljk = (col,tambahan="")=>{
    
    let tabel = document.getElementById("tabelconfigpgbantuisiljk");
    let tabelljk = tambahan==""?document.getElementById("tabelpgakhirnonscanner"):tambahan;
    
    for(let r = 1 ; r < tabel.rows.length ; r++){
        for(let q = 0 ; q < tabel.rows[r].cells.length ; q++){
            //let perbaris = elCol[q];
            

            tabel.rows[r].cells[q].onclick = function (){
                let brssel = this.parentElement.rowIndex;
                let kolom = this.cellIndex 
                if(kolom >= 1 && kolom <= col){
                        let nosoal = brssel
                        let selkunci = tabel.rows[brssel].cells[(col+1)].innerHTML;
                        let isiopsi = this.innerHTML;
                        let pgsiswa = nosoal + isiopsi;
                            for(c = 1 ; c <= col ; c++){
                                tabel.rows[brssel].cells[c].removeAttribute("class");
                                tabelljk.rows[brssel].cells[c].removeAttribute("style");
                            }
                            this.setAttribute("class","w3-yellow");
                            tabelljk.rows[brssel].cells[kolom].setAttribute("style","background-color:yellow");
                            document.querySelector(`[data-keykirimnonscanner=PG_${nosoal}]`).value = isiopsi;
                        let nilaipg = selkunci;
                        if(pgsiswa == selkunci){
                            document.querySelector(`[data-keykirimnonscanner=SKOR_${nosoal}]`).value = 1;
                        }else{
                            document.querySelector(`[data-keykirimnonscanner=SKOR_${nosoal}]`).value = 0;
                            
                        }
                        let kd = JSON.parse(kronologijson[parseInt(idtabaktif.innerHTML)].kuncikd)
                        let keykd = Object.keys(kd); 
                        let objnilai = {};
                        
                        let htmltbody = `<tr class="w3-light-gray w3-centered"><td colspan="2" class="w3-center">Nilai Mapel per KD</td></tr>`
                        for (let k = 0; k < keykd.length; k++) {
                            htmltbody +=`<tr><td>`;
                            let nomorsoal = kd[keykd[k]];
                            let jumlahnomor = nomorsoal.length;
                            let count = 0;
                            
                            let inkd = document.getElementsByClassName(keykd[k]);
                            for (let j = 0; j < inkd.length; j++) {
                                count += inkd[j].value * 1;
                                //console.log(inkd[j].value)
                            }

                            let nilaiakhir = (count / jumlahnomor * 100).toFixed(2)
                            objnilai[keykd[k]] = nilaiakhir;

                            let mapelteks = keykd[k].split("_")[0];
                            let kdteks = keykd[k].split("_")[1];
                            htmltbody +=`${mapelteks} KD ${kdteks}</td><td>${nilaiakhir}</td></tr>`;
                        }
                        htmltbody +=`</tbody>`;
                        let domtbody = document.querySelector(".htmlrekapnilaisementara_mapelkd")
                        if(domtbody !==null){
                            domtbody.innerHTML = htmltbody;
                        }

                        document.querySelector("#nilaikdkoreksikoreksiisiljk").value = JSON.stringify(objnilai);
                        let elemens_nilaipg = document.querySelectorAll(".kelasnilaipg_nonscanner");
                        let count = 0;
                        for(let x = 0 ; x < elemens_nilaipg.length ; x++){
                            count+=elemens_nilaipg[x].value*1
                        };

                        document.querySelector("[data-keykirimnonscanner=nilaiPG]").value = ((count/elemens_nilaipg.length)*100).toFixed(2);
                        document.querySelector("#nilaiPGku").innerHTML = ((count/elemens_nilaipg.length)*100).toFixed(2);
                        let domtdada = document.querySelector(".htmlrekapnilaisementara_pg");
                        if(domtdada !==null){
                            domtdada.innerHTML = ((count/elemens_nilaipg.length)*100).toFixed(2);
                        }

                }
            }

        }
    }
}

const updatenilaikoreksnonscanner = (id,jumlahsoalessaysebenarnya) =>{
    let inputedit = document.getElementById("koreksisoalnonscanner_" + id);
    if (inputedit.value > 100) {
        alert("Nilai Maksimum 100, dan minimum 0")
        inputedit.value = 100;
    }
    document.getElementById("SKOR_" + id).value = (inputedit.value / 100).toFixed(2);

    document.getElementById("untuklj"+id).innerHTML = `Nilai Koreksi: <span id="nilaiessaykoreksi_${id}">${inputedit.value}</span>`;
    //document.getElementById("nilaiessaykoreksi_" + id).innerHTML = inputedit.value;
   
    var kelasinput = document.getElementsByClassName("koreksisoalnonscanner");
    var nilai = 0;
    for (i = 0; i < kelasinput.length; i++) {

        nilai += kelasinput[i].value * 1;

    }
    /// ---------------------------------------------------
    //var jumlahsoalessaysebenarnya = kronologijson[parseInt(idtabaktif.innerHTML)].jumlahessay;
    var nilaiakhir = (nilai / jumlahsoalessaysebenarnya).toFixed(2);
    // document.getElementById("nilaiakhiressay").value = nilai;
    // document.getElementById("nilaiakhiressayscanerisiljk").value = nilaiakhir;
    document.querySelector("[data-keykirimnonscanner=nilaiEssay]").value = nilaiakhir;
    let domada = document.querySelector(".htmlrekapnilaisementara_isian");
    if(domada !==null){
        domada.innerHTML = nilaiakhir;
    }
    /// ---------------------------------------------------

    //document.getElementById("htmlljkkoreksi").textContent = divljkkoreksi.innerHTML;
    let adaelemenini = document.getElementById("nilaiEssayku")
    if (adaelemenini !== null) {
        adaelemenini.innerHTML = nilaiakhir;
    }

    let kd = JSON.parse(kronologijson[parseInt(idtabaktif.innerHTML)].kuncikd)
    let keykd = Object.keys(kd); // MTK_3.1 , PKN_3.5
    let objnilai = {};
    
    let htmltbody = `<tr class="w3-light-gray w3-centered"><td colspan="2" class="w3-center">Nilai Mapel per KD</td></tr>`
    for (let k = 0; k < keykd.length; k++) {
        htmltbody +=`<tr><td>`;
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
        let mapelteks = keykd[k].split("_")[0];
        let kdteks = keykd[k].split("_")[1];
        htmltbody +=`${mapelteks} KD ${kdteks}</td><td>${nilaiakhir}</td></tr>`;
    }
    htmltbody +=`</tbody>`;
    let domtbody = document.querySelector(".htmlrekapnilaisementara_mapelkd")
    if(domtbody !==null){
        domtbody.innerHTML = htmltbody;
    }
    document.getElementById("nilaikdkoreksikoreksiisiljk").value = JSON.stringify(objnilai)
}

const uploadbuktifisikljk = (tabelbuktifisik,idsiswa,brsmateri)=>{
    
    var resize_width = 900; //without px

    //get the image selected
    var item = document.querySelector('#uploadbuktifisikljk').files[0];
    let tabel = document.getElementById(tabelbuktifisik);
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
            
            var scaleFactor = resize_width / el.target.width;
            elem.width = resize_width;
            elem.height = el.target.height * scaleFactor;

            //draw in canvas
            var ctx = elem.getContext('2d');
            ctx.drawImage(el.target, 0, 0, elem.width, elem.height);

            //get the base64-encoded Data URI from the resize image
            var srcEncoded = ctx.canvas.toDataURL(el.target, 'image/jpeg', 0);

            let tRow;
            if(tabel.rows.length==1){
                tRow = tabel.insertRow(0);
            } else{
                tRow = tabel.insertRow(1);
            }
            let tCell = tRow.insertCell(-1);
            tCell.innerHTML = `<img src="/img/barloading.gif" style="max-width:350px">`;
            // tCell.setAttribute("onclick","this.nextSibling.classList.toggle('w3-hide')")
            tCell.setAttribute("title","doubleklik untuk menampilkan tombol hapus")
            tCell.setAttribute("style","text-align:center");
            let buatid = "resultbuktifisikke_"+tRow.rowIndex
            tCell.setAttribute("id",buatid);
            
            tCell = tRow.insertCell(-1);
            tCell.innerHTML =`<button class="w3-btn w3-border fa fa-trash" title="Hapus Lembar Jawaban ini." onclick="document.getElementById('${tabelbuktifisik}').deleteRow(${tRow.rowIndex})"></button>`;
            tCell.setAttribute("class","w3-hide");
            tCell.setAttribute("style","width:20px");
            tRow.setAttribute("onmouseover","this.children[1].classList.toggle('w3-hide')")
            tRow.setAttribute("onmouseout","this.children[1].classList.toggle('w3-hide')")
            
            let inputbase64 = srcEncoded.replace(/^.*,/, '');
            let inputfilename = "buktifisikljk_id" + idsiswa +"_matericode_" + brsmateri;
            let inputmimetype = "data:image/jpeg"; //e.target.result.match(/^.*(?=;)/)[0]
    

            let datafom = new FormData()
            datafom.append("base64", inputbase64);
            datafom.append("mmtype", inputmimetype);
            datafom.append("kelas", idNamaKelas);
            datafom.append("filename", inputfilename);
            datafom.append("ekstensi", "jpeg");
            
            fetch(constlinknilai + "?action=siswauploadmedia", {
                method: 'post',
                body: datafom
            }).then(m => m.json())
                .then(k => {
                   document.getElementById(buatid).innerHTML = k.result2;
                    
                })
                .catch(er => {
                    document.getElementById(buatid).innerHTML = "Gambar gagal diupload";
                })



        }
        
    }
}

const gurumengoreksi_beda = (bid) => {
    let indek = bid.split("<|>")[0];
    let parnama = bid.split("<|>")[1];
    let cek = nilairesponkronologi.filter(k => k.tokensiswa == parnama)[indek];
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
        infoloadingljk.innerHTML = ""; //brkline(json).teks + "<br><br><br>";
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
                tombolsatu.setAttribute("onchange", `updatenilaikoreksi('${inidEl}')`);
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

        let ob = JSON.parse(kronologijson[parseInt(idtabaktif.innerHTML)].kuncikd);
        let obnosoal = ubahjsonkuncikd(ob);
        //console.log(obnosoal)
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
            let gantibaris = document.createElement("br")
            kirimanedit.appendChild(gantibaris)

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

const trialisiLJK = (param) =>{
    modal_modalbantuisibarulagi.style.display = "block";
    if(modal_lebarmodalbantuisibaru.hasAttribute("style")){
        modal_lebarmodalbantuisibaru.removeAttribute("style")
    }
    
    let params = param.split("_");
    let par = params[1]; //indek materi kbm
    parameterbantuisiljk = par;
    let idsw = params[0]; //indek id siswa

    let siswabantu = JSON.parse(localStorage.getItem("datasiswa_" + idNamaKelas))["datasiswa"][idsw];
    let tk_siswa = siswabantu.id

    let datamateri = kronologijson;
    let objeksiswa = jsondatasiswa.filter(d => d.id == tk_siswa)[0];
    
    let versi = datamateri[par].versi;
    let dlo = datamateri[par];
    let objekkuncikd = JSON.parse(dlo.kuncikd);
    let objektes = ubahjsonkuncikd(objekkuncikd)
    
    let mkd = (dlo.kuncikd == "undefined" || dlo.kuncikd == "") ? [] : Object.keys(JSON.parse(dlo.kuncikd));
    let str = "";
    if(dlo.jenistagihan == "ustertulis"||dlo.jenistagihan == "uspraktek"){
        mkd.forEach(s => str += s.split("_")[0]  + "<br/>");
    }else{
        mkd.forEach(s => str += s.split("_")[0] + " KD " + s.split("_")[1] + "<br/>");
    }

    let countPG = parseInt(datamateri[par].jumlahpg);
    let countIsian = parseInt(datamateri[par].jumlahessay);
    let adapg = (datamateri[par].jumlahpg == 0) ? false : true;
    if(Object.keys(objektes).length !== (countPG+countIsian)){
        alert ("Pemetaan sebaran KD pada naskah materi ini tidak sama. Jumlah tagihan soal ada "+ (countPG+countIsian) + " sementara jumlah KD yang terdeteksi ada " + Object.keys(objektes).length);
        return
    }
    // if(countPG > 0){
    //     modal_tabelotomatisklikpg.classList.remove("w3-hide");
        
    // }else{
    //     modal_tabelotomatisklikpg.classList.add("w3-hide");
        
    // }
    // if(countIsian > 0){
    //     modal_tabelotomatisklikpg.classList.remove("w3-hide");
    // }else{
    //     modal_tabelotomatisklikpg.classList.add("w3-hide");
    // }
        
        print_modalbantuisi.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Cetak`;
        inputpg_modalbantuisi.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Input Nilai`;
        previewljk_modalbantuisi.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Preview LJK`;
        kirimserver_modalbantuisi.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Kirim Server`;
        previewnaskahsoal_ljkbantu.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Naskah Soal`;
        
    let html="";//htmlpgdan isian
    
    let htmlprev = "";//htmlljk
    let kkc=[], kc;
    // $.getJSON(constpreviewljk + "?idmateri=" + datamateri[par].idmateri + "&action=previewriwayat", function (json) {
    fetch(constpreviewljk + "?idmateri=" + datamateri[par].idmateri + "&action=previewriwayat").then(m=>m.json())
    .then(json =>{
        

        let teks = (versi == "baru"?brkline(json).teks : brkline2(json).teks); 
        if (adapg) {
            kc = brkline(json).kunci;
            kkc = window.atob(kc).split(",");//.join("<br>");
        } else {
            kc = 0;
            // kkc ="blank"
        }
        //start
        //bikin soalnya dulu diiner
        let sebelumteks = `<h4 class="w3-center">NASKAH MATERI/SOAL</h3><br>`;
        sebelumteks+=`<table class="w3-table-all w3-small" style="max-width:350px;margin:0 auto"><tbody>`;
        sebelumteks+=`<tr><td>Identitas Materi</td><td style="width:10px;text-align:center">:</td><td>${datamateri[par].idmapel}</td></tr>`
        sebelumteks+=`<tr><td>Hari Pelaksanaan</td><td style="width:10px;text-align:center">:</td><td>${Tanggaldenganhari(new Date(datamateri[par].idtgl))}</td></tr>`;
        sebelumteks+=`<tr><td>Jenis Tagihan</td><td style="width:10px;text-align:center">:</td><td>${datamateri[par].jenistagihan}</td></tr>`;
        sebelumteks+=`<tr><td>Kelas</td><td style="width:10px;text-align:center">:</td><td>${datamateri[par].idtoken}</td></tr>`;
        sebelumteks +=`</tbody></table>`;
        modal_loadingsoalbantudulu.innerHTML = sebelumteks + "<hr class='w3-bottombar w3-border-black'>"+teks;
        html+=`<div class="w3-row">`;//0 div.w3-row
        html+=`<div class="w3-col l6 s12 w3-border" style="overflow-x:auto">`;// 1 div.w3-col.l6 tempat pg
        let adaD = false;
        let kolomabcd = 3;
        let htmlrekapnilaisementara = `<div class="w3-col l6 s12 w3-border">`;
        htmlrekapnilaisementara +=`<h5 class="w3-cetner">Properti Nilai</h5><table class="w3-table garis w3-small" style="width:350px;margin:15px auto"><thead><tr class="w3-centered w3-light-gray"><td>Keterangan</td><td>Nilai</td></tr></thead><tbody>`;
        if(adapg){
            htmlrekapnilaisementara +=`<tr><td>Nilai PG</td><td class="htmlrekapnilaisementara_pg"></td></tr>`
            let cekopsiDdikelas = document.querySelectorAll(".calc");
            if(cekopsiDdikelas.length == 0){
                html+=`<p class="w3-red w3-padding w3-center w3-margin">PILIHAN GANDA TERDETEKSI DI DATABASE MATERI, NAMUN DI TAMPILAN NASKAH PERTANYAAN PILIHAN GANDA TERDETEKSI. PERBAIKI / EDIT KONTEN MATERI INI</p>`;
            }else{
                // let adaD = false;
                for(let j = 0 ; j < cekopsiDdikelas.length; j++){
                    let idnya = cekopsiDdikelas[j].getAttribute("id");
                    if(idnya.indexOf("D")>-1){
                        adaD = true;
                        kolomabcd = 4
                        break;
                    }
                }
                //bikin tabel yang bisa diklik
                html+=`<p class="w3-center">PILIHAN GANDA</p><table class="w3-table garis w3-centered w3-small" id="tabelconfigpgbantuisiljk"><thead><tr class="w3-light-gray"><th style="width:30px">No. PG</th>`;
                    if(adaD){
                        html+=`<th colspan="4">Pilihan Ganda</th>`;
                    }else{
                        html+=`<th colspan="3">Pilihan Ganda</th>`;
                    }
                html+=`<th style="width:50px">Kunci</th><th style="width:50px">PG Terpilih</span></th><th style="width:50px">Skor Nilai</th></tr></thead><tbody>`;
                
                for(let g = 0 ; g < countPG ; g++){
                    let nosoalpg = (g+1);
                    html+=`<tr>`;
                    html+=`<td style="vertical-align:middle">${nosoalpg}</td>`
                        if(adaD){
                            html+=`<td style="cursor:pointer;vertical-align:middle">A</td><td style="cursor:pointer;vertical-align:middle">B</td><td style="cursor:pointer;vertical-align:middle">C</td><td style="cursor:pointer;vertical-align:middle">D</td>`;
                        }else{
                            html+=`<td style="cursor:pointer;vertical-align:middle">A</td><td style="cursor:pointer;vertical-align:middle">B</td><td style="cursor:pointer;vertical-align:middle">C</td>`;
                        }
                        
                        html+=`<td style="vertical-align:middle">${kkc[g]}</td>`
                        html+=`<td><input class="inputnonscannerakhir w3-input w3-center" data-keykirimnonscanner="PG_${nosoalpg}" disabled></td>`;
                        html+=`<td><input class="inputnonscannerakhir  ${objektes[nosoalpg]} w3-input w3-center kelasnilaipg_nonscanner" data-keykirimnonscanner="SKOR_${nosoalpg}" id="SKOR_${nosoalpg}" disabled></td>`;//disinitempat
                    html+=`</tr>`;
                }
                
                html+=`</tbody></table><span class="w3-tiny">KLIK KOLOM OPSI PILIHAN GANDA UNTUK MENGISI JAWABAN!</span>`;
                    //selesai bikin tabel yang bisa diklik
                    
            }
        }else{
            html+=`<p class="w3-red w3-padding w3-center w3-margin">TIDAK ADA PILIHAN GANDA TERDETEKSI DI DATABASE MATERI</p>`;
        }
        html+=`</div>`;//1 div.w3-col.l6 tempat pg
        let htmlinputjawabansiswa = "";
        html+=`<div class="w3-col l6 s12" style="overflow-x:auto">`;// 2 div.w3-col.l6 tempat isian
        if(countIsian > 0){
            htmlrekapnilaisementara +=`<tr><td>Nilai Isian</td><td class="htmlrekapnilaisementara_isian"></td></tr>`
            let cekessay = document.querySelectorAll(".soalessay");
            if(cekessay.length == 0){
                html+=`<p class="w3-red w3-padding w3-center w3-margin">ISIAN TERDETEKSI DI DATABASE MATERI, NAMUN KONTEN TIDAK BISA MEMBACANYA</p>`;
            }else{
                html+=`<p class="w3-center">ISIAN</p><table class="w3-table garis w3-small" style="max-width:350px;margin:0 auto"><thead><tr class="w3-light-gray"><th style="width:30px">No. Essay</th><th>Input Skor</th></tr></thead><tbody>`;

                for(let t = 0 ; t < countIsian ; t++){
                    let b = (parseInt(countPG) + t+1);
                    html+=`<tr><td style="vertical-align:middle">${b}</td>`;
                
                    html+=`<td>`;
                    html+=`<input type="number" id="koreksisoalnonscanner_${b}" min="0" value="0" class="koreksisoalnonscanner w3-center w3-input w3-border w3-border-blue" onchange="updatenilaikoreksnonscanner('${b}',${countIsian})">`;
                    html+=`<input class="inputnonscannerakhir  ${objektes[b]} w3-center kelasnilaiisian_nonscanner w3-input" data-keykirimnonscanner="SKOR_${b}" id="SKOR_${b}" disabled>`;
                    html+=`</td></tr>`;
                }
                html+=`</tbody></table>`;
               // let divpertanyaans = document.getElementById("pertanyaanessay_"+b);
                
               
                
            }
        }else{
            html+=`<p class="w3-red w3-padding w3-center w3-margin">TIDAK ADA ISIAN TERDETEKSI DI DATABASE MATERI</p>`;
        }
        html+=`</div>`;//2 div.w3-col.l6 
        htmlrekapnilaisementara +=`</tbody><tbody class="htmlrekapnilaisementara_mapelkd"><tr class="w3-light-gray w3-centered"><td colspan="2" class="w3-center">Nilai Mapel per KD</td></tr>`;
        htmlrekapnilaisementara +=`</tbody></table>`;
        htmlrekapnilaisementara +=`</div>`;
        htmlinputjawabansiswa+=`<div class="w3-col l6 s12 w3-border" style="overflow-x:auto">`;
                htmlinputjawabansiswa+=`<h4 class="w3-center">Unggah Fisik Lembar Jawaban (Opsional)</h4>`;
                htmlinputjawabansiswa +=`<table class="w3-table garis w3-small" id="tabelbuktifisikljk"><tbody>`;
                htmlinputjawabansiswa +=`<tr><td class="w3-center" colspan="2"><label for="uploadbuktifisikljk" class="w3-button w3-green w3-border-blue w3-bottombar w3-round-large"><i class="fa fa-upload"></i> Unggah Poto</label><input type="file" id="uploadbuktifisikljk" class="w3-hide" accept="image/*" onchange="uploadbuktifisikljk('tabelbuktifisikljk',${objeksiswa.id},${dlo.idbaris})"></td></tr>`;
                htmlinputjawabansiswa +=`</tbody></table><div class="w3-tiny">Unggah poto lembar jawaban siswa Anda di sini. Anda bisa menggungah beberapa kali unggahan poto lembar jawaban. Sebelum kirim, pastikan gambar sudah termuat di sini.</div>`;
                htmlinputjawabansiswa +=`</div>`;
        html += htmlrekapnilaisementara;
        html +=htmlinputjawabansiswa;
        html +=`</div>`; //0 div.w3-row      
        modal_tabelotomatisklikpg.innerHTML = html; 
        
        //end start
        
        htmlprev =`<div class="w3-row-padding">`;//0
        htmlprev +=`<div class="w3-col l8 s8">`;//1
        htmlprev +=`<img src="/img/L_vT86_100px.png" class=" w3-left" style="width:45px;"><h3 class="w3-xlarge w3-lobster"> Hasil Belajar E-DURASA (Scanner)</h3>`;
        htmlprev+=`<div class="w3-center warnaeka w3-card-4 w3-round-large w3-border-bottom w3-border-black"><h3>${idNamaSekolah.toUpperCase()}</h3><h5>Semester ${SemesterBerapaSekarang()} Tahun Pelajaran ${idTeksTapel}</h5></div>`;
        htmlprev +=`<table class="w3-table-all small"><caption>Identitas Siswa</caption><tbody><tr><td>ID Lamaso (Token)</td><td>:</td><td>${objeksiswa.id}</td></tr><tr><td>Nama</td><td>:</td><td><b>${objeksiswa.pd_nama}</b></td></tr><tr><td>Kelas</td><td>:</td><td>${idNamaKelas}</td></tr></tbody></table>`;
        htmlprev +=`</div>`;//1
        htmlprev+=`<div class="w3-col l4 s4  w3-right">`;//2
        htmlprev+=`<div class="w3-small w3-center">Identitas Materi:</div><h5 class="w3-center w3-card-4 warnaeka">${datamateri[par].idmapel}</h5>`;
        htmlprev+=`<table class="w3-table-all w3-small"><tbody><tr><td>Jenis Tagihan</td><td>:</td><td>${datamateri[par].jenistagihan}</td></tr><tr><td>Jumlah Pilihan Ganda</td><td>:</td><td>${countPG}</td></tr><tr><td>Jumlah Soal Isian</td><td>:</td><td>${countIsian}</td></tr>`;
        htmlprev +=`<tr><td>Muatan Kompetensi</td><td>:</td><td>${str}<br></td></tr><tr><td>Waktu Mulai<br><sub class="w3-text-red">Proses Scan</sub></td><td>:</td><td id="selwaktumulai">${ tanggalfulllengkap(new Date())}</td></tr><tr><td>Waktu Selesai<br><sub class="w3-text-red">Proses Scan</sub></td><td>:</td><td id="hasilakhirwaktu">${ tanggalfulllengkap(new Date())}</td></tr></tbody></table>`;
        htmlprev +=`</div>`;//2;
        htmlprev+=`<div class="w3-clear w3-border"></div>`;
        if(adapg){
            htmlprev+=`<div class="w3-col l3 s3 w3-border ljksiswa_pg">`;//3
        }else{
            htmlprev+=`<div class="w3-col l3 s3 w3-border w3-hide">`;//3
        }

       
        let html12="";
        html12+=`tokensiswa =<input class="inputnonscannerakhir" data-keykirimnonscanner="tokensiswa" value="${objeksiswa.id}"><br>`;
        html12+=`matericode(idbaris sumber soal) =<input class="inputnonscannerakhir" data-keykirimnonscanner="matericode" value="${dlo.idbaris}"><br>`;
        html12+=`idsekolah (Nama sekolah) =<input class="inputnonscannerakhir" data-keykirimnonscanner="idsekolah" value="${idNamaSekolah}"><br>`;
        html12+=`email guru =<input class="inputnonscannerakhir" data-keykirimnonscanner="emailguru" value="${jlo.surel}"><br>`;
        html12+=`namakelas =<input class="inputnonscannerakhir" data-keykirimnonscanner="idkelas" value="${idNamaKelas}"><br>`;
        html12+=`idmapel (Judul soal materi) =<input class="inputnonscannerakhir" data-keykirimnonscanner="idmapel" value="${dlo.idmapel}"><br>`;
        html12+=`idtoken (idtoken soal materi) =<input class="inputnonscannerakhir" data-keykirimnonscanner="idtoken" value="${dlo.idtoken}"><br>`;
        html12+=`jenistagihan (jenistagihan soal materi) =<input class="inputnonscannerakhir" data-keykirimnonscanner="jenistagihan" value="${dlo.jenistagihan}"><br>`;
        html12+=`kodeunik (kodeunik soal materi) =<input class="inputnonscannerakhir" data-keykirimnonscanner="kodeunik" value="${dlo.jenistagihan}_${dlo.crtToken}"><br>`;
        html12+=`crtToken (crtToken soal materi) =<input class="inputnonscannerakhir" data-keykirimnonscanner="crtToken" value="${dlo.crtToken}"><br>`;
        html12+=`namasiswa (namasiswa soal materi) =<input class="inputnonscannerakhir" data-keykirimnonscanner="namasiswa" value="${objeksiswa.pd_nama}"><br>`;
        htmlprev+=`<h5 class="w3-center w3-card-4 warnaeka">PILIHAN GANDA</h5><table class="w3-table garis w3-small w3-centered tblljkpg" id="tabelpgakhirnonscanner" style="max-width:340px;margin:5px auto"><caption>Tabel Jawaban Pilihan Ganda</caption>`;
        if(adaD){
            
            htmlprev +=`<thead><tr><th>No</th><th colspan="4">PILIHAN GANDA</th></tr></thead><tbody>`;
        }else{
            // html +=`<thead><tr><th>No</th><th colspan="3">PILIHAN GANDA</th></tr></thead><tbody>`;
            htmlprev +=`<thead><tr><th>No</th><th colspan="3">PILIHAN GANDA</th></tr></thead><tbody>`;
        }
        for(let c = 0 ; c < countPG ; c++){
            let nosoalpgljk = (c+1);
            htmlprev+=`<tr>`;
            if(adaD){
                htmlprev+=`<td>${nosoalpgljk}</td><td>A</td><td>B</td><td>C</td><td>D</td>`;
            }else{
                htmlprev+=`<td>${nosoalpgljk}</td><td>A</td><td>B</td><td>C</td>`;

            }
            htmlprev+=`</tr>`;
        }
        
        htmlprev +=`</tbody></table>`;
        
        
        
        htmlprev+=`</div>`;//3 tabel PG
        
        
        if(countIsian > 0){
            htmlprev +=`<div class="w3-col l9 s9 w3-border  ljksiswa_essay"><h5 class="w3-center w3-card-4 warnaeka">JAWABAN ISIAN</h5>`;//4
            
            for(let i = 0 ; i < countIsian ; i++){
                let a = (i+1);
                let b = (countPG + a);
                let objeknilaiessay = {}
                objeknilaiessay[objektes[b]]=0
                let divpertanyaan = document.getElementById("pertanyaanessay_"+b);
        
                htmlprev+=`<ol style="list-style-type:decimal" start="${b}"><li><b style="color:blue">Pertanyaan:</b><br>${divpertanyaan.innerHTML}<hr style="border-top:1px solid black"><b style="color:blue">Jawaban:</b><br><i class="w3-text-red">Jawaban tertulis di Lembar Jawaban</i><div id="untuklj${b}" class="koleksilj" style="border:1px solid red;padding:5px;background-color:#eeeeff">Nilai</div></li></ol>`;
            }
            htmlprev +=`</div>`;//4
            
           
        
        }else{
            
            htmlprev +=`<div class="w3-col l9 s9 w3-border ljksiswa_essay"></div>`;//4
        }

       // let jumlahnilaipg = ((countnilaiPG/countPG)*100).toFixed(2);
        
        html12+=`Total NilaiPG (namasiswa soal materi) =<input class="inputnonscannerakhir" data-keykirimnonscanner="nilaiPG"><br>`;
        
        if(adapg){
            htmlprev +=`<div class="w3-col l2 s2 w3-border ljksiswa_nilaipg"><h5 class="w3-center w3-card-4 warnaeka">NILAI PG</h5>`;
            htmlprev+=`<div class="w3-large w3-border w3-center" id="nilaiPGku" style="height:100px"></div>`;
            htmlprev+=`</div>`;
        }else{
            htmlprev +=`<div class="w3-col l2 s2 w3-border w3-hide ljksiswa_nilaipg">`;
            htmlprev+=`<div class="w3-large w3-border w3-center w3-hide" id="nilaiPGku" style="height:100px"></div>`;
            htmlprev+=`</div>`;
        }

        if(countIsian>0){
            htmlprev +=`<div class="w3-col l2 s2 w3-border ljksiswa_nilaiessay"><h5 class="w3-center w3-card-4 warnaeka">NILAI ISIAN</h5>`;
            htmlprev+=`<div class="w3-large w3-border w3-center" id="nilaiEssayku" style="height:100px">Menunggu Dikoreksi</div>`;
            htmlprev+=`</div>`;
        }else{
            htmlprev +=`<div class="w3-col l2 s2 w3-border w3-hide ljksiswa_nilaiessay"><h5 class="w3-center w3-card-4 warnaeka">NILAI ISIAN</h5>`;
            htmlprev+=`<div class="w3-large w3-border w3-center w3-hide" id="nilaiEssayku" style="height:100px">Menunggu Dikoreksi</div>`;
            htmlprev+=`</div>`;

        }
        

        // htmlprev +=`<div class="w3-col l4 s12 w3-right"><div class="w3-card-4 w3-container w3-left w3-center " style="width:45%;margin:5px;height:120px">Paraf Orangtua</div><div class="w3-card-4 w3-container w3-left w3-center " style="width:45%;margin:5px;height:120px">Paraff Guru</div></div>`;
        htmlprev +=`<div class="w3-col l1 s1">&nbsp;</div><div class="w3-col l2 s2 w3-container w3-right"><h5 class="w3-center w3-card-4 warnaeka">Paraf Orang Tua</h5><div class="w3-border" style="height:100px"></div></div>`;
        htmlprev +=`<div class="w3-col l2 s2 w3-container w3-right"><h5 class="w3-center w3-card-4 warnaeka">Paraf Guru</h5><div class="w3-border" style="height:100px"></div></div>`;
        htmlprev +=`</div>`;//div w3-row;
        // formatljknotepadscanner.innerHTML = htmlprev;
        modal_previewljksementara.innerHTML = htmlprev
        html12+=`NILAI KD (objek nilai KD soal materi) =<input class="inputnonscannerakhir" data-keykirimnonscanner="nilaikd" id="nilaikdkoreksikoreksiisiljk" ><br>`;
        html12 +=`<br>Nilai Total Essay= <input class="inputsnoncannerakhir" data-keykirimnonscanner="nilaiEssay" id="nilaiakhiressayscanerisiljk">`;
        document.getElementById("datakirimnonscanner").innerHTML = html12;
        if(adapg){
            tooltipkan_tabelconfigpgbantuisiljk(kolomabcd)

        }
        print_modalbantuisi.innerHTML = `<i class="fa fa-print"></i> Cetak`;
        inputpg_modalbantuisi.innerHTML = `<i class="fa fa-pencil"></i> Input Nilai`;
        previewljk_modalbantuisi.innerHTML = `<i class="fa fa-eye"></i> Preview LJK`;
        kirimserver_modalbantuisi.innerHTML = `<i class="fa fa-save"></i> Kirim Server`;
        previewnaskahsoal_ljkbantu.innerHTML = `<i class="fa fa-eye"></i> Naskah Soal`;

        inputpg_modalbantuisi.setAttribute("onclick",`showhidebantuisiljkbaru("berinilai")`);
        previewljk_modalbantuisi.setAttribute("onclick",`showhidebantuisiljkbaru("lihatljk")`);
        
        previewnaskahsoal_ljkbantu.setAttribute("onclick",`showhidebantuisiljkbaru("lihatsoal")`)

        kirimserver_modalbantuisi.setAttribute("onclick","kirimserverljkbantubaru()")
        
        showhidebantuisiljkbaru("awal");
    }).catch(er=>{
        console.log(er);
        print_modalbantuisi.innerHTML = `<i class="fa fa-print"></i> Cetak`;
        inputpg_modalbantuisi.innerHTML = `<i class="fa fa-pencil"></i> Input Nilai`;
        previewljk_modalbantuisi.innerHTML = `<i class="fa fa-eye"></i> Preview LJK`;
        kirimserver_modalbantuisi.innerHTML = `<i class="fa fa-save"></i> Kirim Server`;
        previewnaskahsoal_ljkbantu.innerHTML = `<i class="fa fa-eye"></i> Naskah Soal`;
        print_modalbantuisi.setAttribute("onclick","alert('Proses Gagal meloading')");
        inputpg_modalbantuisi.setAttribute("onclick","alert('Proses Gagal meloading')");
        previewljk_modalbantuisi.setAttribute("onclick","alert('Proses Gagal meloading')");
        previewnaskahsoal_ljkbantu.setAttribute("onclick","alert('Proses Gagal meloading')");
        kirimserver_modalbantuisi.setAttribute("onclick","alert('Proses Gagal meloading')")
    });
    
}

const gurumengoreksi = async (bid) =>{
    let indek = bid.split("<|>")[0];
    let parnama = bid.split("<|>")[1];
    let cek = nilairesponkronologi.filter(k => k.tokensiswa == parnama)[indek];
    let objeksiswa = cek;
    let idbaris = cek.idbaris;
    console.log(idbaris);
    let prefikkodeunik = cek.matericode + "_" + cek.kodeunik + "_";
    let tagihankoreksi = cek.jenistagihan;
    let namasiswakoreksi = cek.namasiswa;
    let html_jawaban = cek.html_jawaban;
    let datasoal = kronologijson[parseInt(idtabaktif.innerHTML)];
    let dlo = kronologijson[parseInt(idtabaktif.innerHTML)];
    let html_soal = datasoal.idmateri;
    let objekkuncikd = JSON.parse(datasoal.kuncikd);
    let objekKD = ubahjsonkuncikd(objekkuncikd)
    let countPG = datasoal.jumlahpg==""?0:parseInt(datasoal.jumlahpg);
    let countEssay = datasoal.jumlahessay ==""?0:parseInt(datasoal.jumlahessay);
    
    if(Object.keys(objekKD).length !== (countPG+countEssay)){
        alert ("Pemetaan sebaran KD pada naskah materi ini tidak sama. Jumlah tagihan soal ada "+ (countPG+countEssay) + " sementara jumlah KD yang terdeteksi ada " + Object.keys(objekKD).length);
        return
    }
    let mkd = (dlo.kuncikd == "undefined" || dlo.kuncikd == "") ? [] : Object.keys(JSON.parse(dlo.kuncikd));
    let str = "";
    if(dlo.jenistagihan == "ustertulis"||dlo.jenistagihan == "uspraktek"){
        mkd.forEach(s => str += s.split("_")[0]  + "<br/>");
    }else{
        mkd.forEach(s => str += s.split("_")[0] + " KD " + s.split("_")[1] + "<br/>");
    }

    modal_modalbantuisibarulagi.style.display = "block";
    if(modal_lebarmodalbantuisibaru.hasAttribute("style")){
        modal_lebarmodalbantuisibaru.removeAttribute("style")
    }
    print_modalbantuisi.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Cetak`;
    inputpg_modalbantuisi.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Input Nilai`;
    previewljk_modalbantuisi.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Preview LJK`;
    kirimserver_modalbantuisi.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Kirim Server`;
    previewnaskahsoal_ljkbantu.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Naskah Soal`;
    
    //constpreviewljk + "?idmateri=" + html_jawaban + "&action=previewriwayat";
    let sudahloadkunci =[]; let kkc
    await fetch(constpreviewljk +"?idmateri="+html_soal+"&action=previewriwayat")
    .then(m=>m.json())
    .then(r=> {
        if(countPG > 0){
            let kc = brkline(r).kunci;
            sudahloadkunci = window.atob(kc).split(",")
            kkc = window.atob(kc).split(",");
        }else{
            kkc = []
        }
        let sebelumteks = `<h4 class="w3-center">NASKAH MATERI/SOAL</h3><br>`;
        sebelumteks+=`<table class="w3-table-all w3-small" style="max-width:350px;margin:0 auto"><tbody>`;
        sebelumteks+=`<tr><td>Identitas Materi</td><td style="width:10px;text-align:center">:</td><td>${dlo.idmapel}</td></tr>`
        sebelumteks+=`<tr><td>Hari Pelaksanaan</td><td style="width:10px;text-align:center">:</td><td>${Tanggaldenganhari(new Date(dlo.idtgl))}</td></tr>`;
        sebelumteks+=`<tr><td>Jenis Tagihan</td><td style="width:10px;text-align:center">:</td><td>${dlo.jenistagihan}</td></tr>`;
        sebelumteks+=`<tr><td>Kelas</td><td style="width:10px;text-align:center">:</td><td>${dlo.idtoken}</td></tr>`;
        sebelumteks +=`</tbody></table>`;
        modal_loadingsoalbantudulu.innerHTML = sebelumteks + "<hr class='w3-bottombar w3-border-black'>"+brkline(r).teks;
    })
    // console.log("kunci load1=",sudahloadkunci);
    fetch(constpreviewljk + "?idmateri=" + html_jawaban + "&action=previewriwayat")
    .then(m=> m.json())
    .then(json =>{
        // console.log("kunci load2=",sudahloadkunci);

        
        modal_previewljksementara.innerHTML = brkline(json).teks;
        let tabel
        let cektabel0 = document.querySelector(".tblljkpg");
        if(cektabel0 !==null){
            tabel = cektabel0;
        }else{
            let cektabel1= document.getElementById("tabelpgakhirscanner");
            if(cektabel1 !== null){
                tabel = cektabel1;
            }else{
                let cektabel2= document.getElementById("tabelpgakhirnonscanner");
                tabel = cektabel2

            }
        }
        let arSiswajawab = [];
        // console.log(tabel);
        let countD = 0;
        let arrayopsikoreksi = ["A","B","C","D"];
        if(tabel !== null){
            for(let a = 1 ; a < tabel.rows.length; a++){
                let nosoal = "";
                let objekjawab = {};
                for(b = 0 ; b < tabel.rows[a].cells.length ; b++){
                    let td = tabel.rows[a].cells;
                    if(b == 0){
                        nosoal = td[b].innerHTML
                        objekjawab.nojawab = nosoal;
                    }
                    if(td[b].hasAttribute("style")){
                        objekjawab.opsi = td[b].innerHTML;
                    }else{
                        if(td[b].className.indexOf("warnaeka")>-1){
                            objekjawab.opsi= td[b].innerHTML
                        }
                    }
                }
                arSiswajawab.push(objekjawab);
            }
            countD = tabel.rows[1].cells.length - 1;
        }
        
        let li_isi = modal_previewljksementara.querySelectorAll("li");

        for(let u = 0 ; u < li_isi.length; u++){
            let cekisinull = li_isi[u].innerHTML.match(/<b style="color:blue">Jawaban:<\/b>(.*)<div id="untuklj/);
            if(cekisinull !==null){
                let objekisianjawaban = {};
                let nosoalessay = li_isi[u].parentElement.getAttribute("start")
                objekisianjawaban.nojawab = nosoalessay;
                objekisianjawaban.isiansiswa = cekisinull[1];
                objekisianjawaban.pertanyaan = li_isi[u].parentElement.innerHTML.match(/<b style="color:blue">Pertanyaan:<\/b>(.*)<hr style="border-top:1px solid black">/)[1];
                arSiswajawab.push(objekisianjawaban);
            }

        }
        
        
        let htmlkoreksi =`<div class="w3-row">`;//0 div.w3-row
        let html12="";
        html12+=`tokensiswa =<input class="inputnonscannerakhir" data-keykirimnonscanner="tokensiswa" value="${objeksiswa.tokensiswa}"><br>`;
        html12+=`matericode(idbaris sumber soal) =<input class="inputnonscannerakhir" data-keykirimnonscanner="matericode" value="${dlo.idbaris}"><br>`;
        html12+=`idsekolah (Nama sekolah) =<input class="inputnonscannerakhir" data-keykirimnonscanner="idsekolah" value="${idNamaSekolah}"><br>`;
        html12+=`email guru =<input class="inputnonscannerakhir" data-keykirimnonscanner="emailguru" value="${jlo.surel}"><br>`;
        html12+=`namakelas =<input class="inputnonscannerakhir" data-keykirimnonscanner="idkelas" value="${idNamaKelas}"><br>`;
        html12+=`idmapel (Judul soal materi) =<input class="inputnonscannerakhir" data-keykirimnonscanner="idmapel" value="${dlo.idmapel}"><br>`;
        html12+=`idtoken (idtoken soal materi) =<input class="inputnonscannerakhir" data-keykirimnonscanner="idtoken" value="${dlo.idtoken}"><br>`;
        html12+=`jenistagihan (jenistagihan soal materi) =<input class="inputnonscannerakhir" data-keykirimnonscanner="jenistagihan" value="${dlo.jenistagihan}"><br>`;
        html12+=`kodeunik (kodeunik soal materi) =<input class="inputnonscannerakhir" data-keykirimnonscanner="kodeunik" value="${dlo.jenistagihan}_${dlo.crtToken}"><br>`;
        html12+=`crtToken (crtToken soal materi) =<input class="inputnonscannerakhir" data-keykirimnonscanner="crtToken" value="${dlo.crtToken}"><br>`;
        html12+=`namasiswa (namasiswa soal materi) =<input class="inputnonscannerakhir" data-keykirimnonscanner="namasiswa" value="${objeksiswa.namasiswa}"><br>`;
        
        let htmlprev="";
        htmlprev =`<div class="w3-row-padding">`;//0
        htmlprev +=`<div class="w3-col l8 s8">`;//1
        htmlprev +=`<img src="/img/L_vT86_100px.png" class=" w3-left" style="width:45px;"><h3 class="w3-xlarge w3-lobster"> Hasil Belajar E-DURASA (KOREKSI)</h3>`;
        htmlprev+=`<div class="w3-center warnaeka w3-card-4 w3-round-large w3-border-bottom w3-border-black"><h3>${idNamaSekolah.toUpperCase()}</h3><h5>Semester ${SemesterBerapaSekarang()} Tahun Pelajaran ${idTeksTapel}</h5></div>`;
        htmlprev +=`<table class="w3-table-all small"><caption>Identitas Siswa</caption><tbody><tr><td>ID Lamaso (Token)</td><td>:</td><td>${objeksiswa.tokensiswa}</td></tr><tr><td>Nama</td><td>:</td><td><b>${objeksiswa.namasiswa}</b></td></tr><tr><td>Kelas</td><td>:</td><td>${idNamaKelas}</td></tr></tbody></table>`;
        htmlprev +=`</div>`;//1
        htmlprev+=`<div class="w3-col l4 s4  w3-right">`;//2
        htmlprev+=`<div class="w3-small w3-center">Identitas Materi:</div><h5 class="w3-center w3-card-4 warnaeka">${dlo.idmapel}</h5>`;
        htmlprev+=`<table class="w3-table-all w3-small"><tbody><tr><td>Jenis Tagihan</td><td>:</td><td>${dlo.jenistagihan}</td></tr><tr><td>Jumlah Pilihan Ganda</td><td>:</td><td>${countPG}</td></tr><tr><td>Jumlah Soal Isian</td><td>:</td><td>${countEssay}</td></tr>`;

        htmlprev +=`<tr><td>Muatan Kompetensi</td><td>:</td><td>${str}<br></td></tr><tr><td>Waktu Mulai</td><td>:</td>`;
        let wktStart = document.getElementById("selwaktumulai");
        let wtkAKhir = document.getElementById("hasilakhirwaktu");
        let strgStart = wktStart !== null?wktStart.innerHTML : tanggalfulllengkap(new Date());
        let strgAkhir = wtkAKhir !== null?wtkAKhir.innerHTML : tanggalfulllengkap(new Date());
        htmlprev +=`<td id="selwaktumulai">${strgStart}</td></tr><tr><td>Waktu Selesai</td><td>:</td><td id="hasilakhirwaktu">${strgAkhir}</td></tr></tbody></table>`;
        htmlprev +=`</div>`;//2;
        htmlprev+=`<div class="w3-clear w3-border"></div>`;
        htmlprev += countPG == 0 || countPG == 0?`<div class="w3-col l3 s3 w3-border w3-hide ljksiswa_pg">`:`<div class="w3-col l3 s3 w3-border ljksiswa_pg">`;//3
        htmlprev+=`<h5 class="w3-center w3-card-4 warnaeka">PILIHAN GANDA</h5>`;
        htmlprev+=`<table class="w3-table garis w3-small w3-centered tblljkpg" id="tabelpgakhirnonscanner" style="max-width:340px;margin:5px auto"><caption>Tabel Jawaban Pilihan Ganda</caption>`;
        let htmlnilaipg ="";
        let htmlnilaiessay = "";
        let htmlrekapnilaisementara = `<div class="w3-col l6 s12 w3-border">`;
        htmlrekapnilaisementara +=`<h5 class="w3-cetner">Properti Nilai</h5><table class="w3-table garis w3-small" style="width:350px;margin:15px auto"><thead><tr class="w3-centered w3-light-gray"><td>Keterangan</td><td>Nilai</td></tr></thead><tbody>`;
        
        if(countPG > 0){
            htmlrekapnilaisementara +=`<tr><td>Nilai PG</td><td class="htmlrekapnilaisementara_pg"></td></tr>`
            htmlprev +=`<thead><tr><th>No</th><th colspan="${countD}">PILIHAN GANDA</th></tr></thead><tbody>`;
            htmlkoreksi+=`<div class="w3-col l6 s12 w3-border" style="overflow-x:auto">`
            htmlkoreksi+=`<p class="w3-center">PILIHAN GANDA</p>`;
            htmlkoreksi +=`<table class="w3-table garis w3-centered w3-small" id="tabelconfigpgbantuisiljk"><thead>`;
            htmlkoreksi +=`<tr class="w3-light-gray"><th style="width:30px">No. PG</th><th colspan="${countD}">PG Jawaban Siswa</th><th style="width:50px">Kunci</th><th style="width:50px">PG Terpilih</th><th style="width:50px">Skor Nilai</th></tr></thead><tbody>`;
            let sumpg = 0
            for(let p = 0 ; p < countPG ; p++){
                let nopg = (p+1);
                let obJwbSiswaPerItem = arSiswajawab.filter(s=> s.nojawab == nopg)[0];
            
                let noJawab = obJwbSiswaPerItem != undefined ?obJwbSiswaPerItem.nojawab:"";
                let opsiJawab= obJwbSiswaPerItem != undefined ?obJwbSiswaPerItem.opsi:"";
                //console.log(opsiJawab);
                htmlkoreksi +=`<tr><td style="vertical-align:middle">${nopg}</td>`;
                htmlprev +=`<tr><td>${nopg}</td>`;
                let val_pg = 0;
                let atrb_clas="";
                let atrb_style ="";
                let kuncihilang = kkc[p].match(/(\d+)/);
                let kuncijadi 
                if(kuncihilang == null){
                    alert("Kunci jawaban PG nomor "+ nopg +" tidak terdeteksi. Periksa kembali konten materi Anda. Anda wajib mengedit EDIT KONTEN materi ini sebelum lanjut mengoreksi")
                    kuncijadi = "";
                    break;
                }else{
                    if(kuncihilang[0] == nopg){
                        kuncijadi = kkc[p].match(/[ABCD]/)[0];
                    }else{
                        alert("Kunci jawaban PG nomor "+ nopg +" tidak terdeteksi. Periksa kembali konten materi Anda. Anda wajib mengedit EDIT KONTEN materi ini sebelum lanjut mengoreksi")
                        kuncijadi = "";
                        break;
                    }
                }
                for(let d = 0 ; d < countD; d++){
                    if(noJawab == nopg && opsiJawab == arrayopsikoreksi[d] ){
                        atrb_clas =`class="w3-yellow"`;
                        atrb_style = ` style="background-color:yellow"`;
                        // if(opsiJawab ==  kkc[p].match(/[ABCD]/)[0]){
                        if(opsiJawab ==  kuncijadi){
                            val_pg = 1;
                            sumpg++
                        }else{
                            val_pg = 0;
                        }
                    }else{
                        atrb_clas="";
                        atrb_style = "";
                    }
                    htmlkoreksi +=`<td style="cursor:pointer;vertical-align:middle" ${atrb_clas}>${arrayopsikoreksi[d]}</td>`;
                    htmlprev +=`<td${atrb_style}>${arrayopsikoreksi[d]}</td$>`
                    // console.log(noJawab, nopg, opsiJawab, arrayopsikoreksi[d], kkc[p],kkc[p].match(/[ABCD]/)[0])
                }
                htmlkoreksi +=`<td style="vertical-align:middle">${kkc[p]}</td>`;
                htmlkoreksi +=`<td><input class="inputnonscannerakhir w3-input w3-center" data-keykirimnonscanner="PG_${nopg}" value="${opsiJawab==undefined?"":opsiJawab}" disabled></td>`;
                htmlkoreksi +=`<td><input class="inputnonscannerakhir  ${objekKD[nopg]} w3-input w3-center kelasnilaipg_nonscanner" data-keykirimnonscanner="SKOR_${nopg}" id="SKOR_${nopg}" value="${val_pg}" disabled></td>`;//disinitempat
                htmlkoreksi +=`</tr>`;
                htmlprev +=`</tr>`;
            }

            htmlkoreksi +=`</tbody></table><span class="w3-tiny">KLIK KOLOM OPSI PILIHAN GANDA UNTUK MENGISI JAWABAN!</span>`
            htmlkoreksi+=`</div>`;
            htmlprev+=`</tbody>`;
            let totsum = ((sumpg/countPG)*100).toFixed(2);
            html12+=`Total NilaiPG (namasiswa soal materi) =<input class="inputnonscannerakhir" data-keykirimnonscanner="nilaiPG" value="${totsum}"><br>`;
            htmlnilaipg +=`<div class="w3-col l2 s2 w3-border ljksiswa_nilaipg"><h5 class="w3-center w3-card-4 warnaeka">NILAI PG</h5>`;
            htmlnilaipg +=`<div class="w3-large w3-border w3-center" id="nilaiPGku" style="height:100px">${totsum}</div>`;
            htmlnilaipg +=`</div>`;
        }else{
            htmlkoreksi+=`<div class="w3-col l6 s12 w3-border w3-hide" style="overflow-x:auto"></div>`;
            htmlnilaipg +=`<div class="w3-col l2 s2 w3-border w3-hide ljksiswa_nilaipg"><h5 class="w3-center w3-card-4 warnaeka">NILAI PG</h5>`;
            htmlnilaipg +=`<div class="w3-large w3-border w3-center" id="nilaiPGku" style="height:100px"></div>`;
            htmlnilaipg +=`</div>`;
            
        }
        htmlprev +=`</table>`;
        htmlprev+=`</div>`;
        
        let sumes = 0
        if(countEssay > 0){
            htmlrekapnilaisementara +=`<tr><td>Nilai Isian</td><td class="htmlrekapnilaisementara_isian"></td></tr>`
            htmlkoreksi +=`<div class="w3-col l6 s12 w3-border" style="overflow-x:auto">`; 
            htmlkoreksi +=`<p class="w3-center">ISIAN</p>`;
            htmlkoreksi +=`<table class="w3-table garis w3-small" style="max-width:350px;margin:0 auto"><thead><tr class="w3-light-gray"><th style="width:30px">No. Essay</th><th>Input Skor</th></tr></thead><tbody>`;
            htmlprev +=`<div class="w3-col l9 s9 w3-border  ljksiswa_essay"><h5 class="w3-center w3-card-4 warnaeka">JAWABAN ISIAN</h5>`;//4
            for(let is = 0 ; is < countEssay; is++){
                let nois = (is + countPG + 1);
                htmlkoreksi +=`<tr><td style="vertical-align:middle">${nois}</td>`;
                let idspan = document.getElementById("nilaiessaykoreksi_"+nois);
                let val_esay = "";
                let skor_essay =""
                if(idspan !== null){
                    val_esay = parseInt(idspan.innerHTML==""?0:idspan.innerHTML);
                    skor_essay =(val_esay/100).toFixed(2);
                    sumes += val_esay;
                }
                let question = document.getElementById("pertanyaanessay_"+nois).innerHTML
                let pertanyaanasal = arSiswajawab.filter(s=> s.nojawab == nois)[0];
                let jawabansiswa = pertanyaanasal == undefined?"<br><i class='w3-text-red'>Siswa tidak menjawab ini</i>": pertanyaanasal.isiansiswa;
                
                htmlkoreksi +=`<td>`
                htmlkoreksi +=`<button onclick="document.getElementById('ceksoalessaydanjawabansiswano_${nois}').classList.toggle('w3-hide')" class="w3-tiny tangan")>Lihat soal dan jawaban siswa</button><div id="ceksoalessaydanjawabansiswano_${nois}" class="w3-border w3-tiny w3-hide">Pertanyaan:<br>${question}<hr> jawaban:<br>${jawabansiswa}</div>`;
                htmlkoreksi +=`<input type="number" id="koreksisoalnonscanner_${nois}" min="0" value="${val_esay}" class="koreksisoalnonscanner w3-center w3-input w3-border w3-border-blue" onchange="updatenilaikoreksnonscanner('${nois}',${countEssay})">`;
                htmlkoreksi +=`<input value="${skor_essay}" class="inputnonscannerakhir ${objekKD[nois]} w3-center kelasnilaiisian_nonscanner w3-input" data-keykirimnonscanner="SKOR_${nois}" id="SKOR_${nois}" disabled></td>`;
                htmlkoreksi +=`</tr>`;
                
                
                htmlprev+=`<ol style="list-style-type:decimal" start="${nois}"><li><b style="color:blue">Pertanyaan:</b><br>${question}<hr style="border-top:1px solid black"><b style="color:blue">Jawaban:</b>${jawabansiswa}<div id="untuklj${nois}" class="koleksilj" style="border:1px solid red;padding:5px;background-color:#eeeeff">Nilai Koreksi : <span id="nilaiessaykoreksi_${nois}">${val_esay}</span></div></li></ol>`;
            }
            htmlprev+="</div>";
            htmlkoreksi +=`</tbody></table></div>`;
            let totsumes = (sumes/countEssay).toFixed(2)
            htmlnilaiessay +=`<div class="w3-col l2 s2 w3-border ljksiswa_nilaiessay"><h5 class="w3-center w3-card-4 warnaeka">NILAI ISIAN</h5>`;
            htmlnilaiessay +=`<div class="w3-large w3-border w3-center" id="nilaiEssayku" style="height:100px">${totsumes}</div>`;
            htmlnilaiessay +=`</div>`;
            
            html12 +=`<br>Nilai Total Essay= <input class="inputsnoncannerakhir" value="${totsumes}" data-keykirimnonscanner="nilaiEssay" id="nilaiakhiressayscanerisiljk">`;
        
        }else{
            htmlkoreksi +=`<div class="w3-col l6 s12" style="overflow-x:auto"></div>`; 
            htmlnilaiessay +=`<div class="w3-col l2 s2 w3-border  w3-hide ljksiswa_nilaiessay"><h5 class="w3-center w3-card-4 warnaeka">NILAI ISIAN</h5>`;
            htmlnilaiessay +=`<div class="w3-large w3-border w3-center" id="nilaiEssayku" style="height:100px">Menunggu Dikoreksi</div>`;
            htmlnilaiessay +=`</div>`;
        }
        let htmlinputjawabansiswa =`<div class="w3-col l6 s12 w3-border" style="overflow-x:auto">`;
            htmlinputjawabansiswa+=`<h4 class="w3-center">Unggah Fisik Lembar Jawaban (Opsional)</h4>`;
            htmlinputjawabansiswa +=`<table class="w3-table garis w3-small" id="tabelbuktifisikljk"><tbody>`;
        let elemenbuktifisik = objeksiswa.html_buktifisik;
            if(elemenbuktifisik !==""){
                htmlinputjawabansiswa +=`<tr onmouseover="this.children[1].classList.toggle('w3-hide')" onmouseout="this.children[1].classList.toggle('w3-hide')">`;
                htmlinputjawabansiswa +=`<td title="doubleklik untuk menampilkan tombol hapus" style="text-align:center" id="resultbuktifisikke_${0}">`;
                htmlinputjawabansiswa += `${elemenbuktifisik}`
                htmlinputjawabansiswa +=`</td><td class="w3-hide" style="width:20px"><button class="w3-btn w3-border fa fa-trash" title="Hapus Lembar Jawaban ini." onclick="document.getElementById('tabelbuktifisikljk').deleteRow(${0})"></button></td></tr>`;
            }

            htmlinputjawabansiswa +=`<tr><td class="w3-center" colspan="2"><label for="uploadbuktifisikljk" class="w3-button w3-green w3-border-blue w3-bottombar w3-round-large"><i class="fa fa-upload"></i> Unggah Poto</label><input type="file" id="uploadbuktifisikljk" class="w3-hide" accept="image/*" onchange="uploadbuktifisikljk('tabelbuktifisikljk',${objeksiswa.id},${dlo.idbaris})"></td></tr>`;
            htmlinputjawabansiswa +=`</tbody></table><div class="w3-tiny">Unggah poto lembar jawaban siswa Anda di sini. Anda bisa menggungah beberapa kali unggahan poto lembar jawaban. Sebelum kirim, pastikan gambar sudah termuat di sini.</div>`;
            htmlinputjawabansiswa +=`</div>`;

            htmlrekapnilaisementara +=`</tbody><tbody class="htmlrekapnilaisementara_mapelkd"><tr class="w3-light-gray w3-centered"><td colspan="2" class="w3-center">Nilai Mapel per KD</td></tr>`;
            htmlrekapnilaisementara +=`</tbody></table>`;
            htmlrekapnilaisementara +=`</div>`;
        htmlkoreksi += htmlrekapnilaisementara;
        htmlkoreksi += htmlinputjawabansiswa;
        // htmlkoreksi +="</div>";//0 div.w3-row
        htmlprev += htmlnilaipg + htmlnilaiessay
        // htmlprev +=`<div class="w3-col l4 s12 w3-right"><div class="w3-card-4 w3-container w3-left w3-center " style="width:45%;margin:5px;height:120px">Paraf Orangtua</div><div class="w3-card-4 w3-container w3-left w3-center " style="width:45%;margin:5px;height:120px">Paraff Guru</div></div>`
        htmlprev +=`<div class="w3-col l1 s1">&nbsp;</div><div class="w3-col l2 s2 w3-container w3-right"><h5 class="w3-center w3-card-4 warnaeka">Paraf Orang Tua</h5><div class="w3-border" style="height:100px"></div></div>`;
        htmlprev +=`<div class="w3-col l2 s2 w3-container w3-right"><h5 class="w3-center w3-card-4 warnaeka">Paraf Guru</h5><div class="w3-border" style="height:100px"></div></div>`;
        
        htmlprev +="</div>";//0 div.w3-row
        modal_tabelotomatisklikpg.innerHTML = htmlkoreksi;
        
        // html12+=`Total NilaiPG (namasiswa soal materi) =<input class="inputnonscannerakhir" data-keykirimnonscanner="nilaiPG"><br>`;

        html12+=`NILAI KD (objek nilai KD soal materi) =<input class="inputnonscannerakhir" data-keykirimnonscanner="nilaikd" id="nilaikdkoreksikoreksiisiljk" ><br>`;
        //html12 +=`<br>Nilai Total Essay= <input class="inputsnoncannerakhir" data-keykirimnonscanner="nilaiEssay" id="nilaiakhiressayscanerisiljk">`;

        document.getElementById("datakirimnonscanner").innerHTML = html12;
        
        
        modal_previewljksementara.innerHTML = htmlprev;

        if(countPG>0){
            tabel = document.getElementById("tabelpgakhirnonscanner");
            tooltipkan_tabelconfigpgbantuisiljk(countD,tabel)
        }
        if(countEssay > 0){
            for(let v = 0 ; v < countEssay ; v++){
                let nosoal = (v + countPG + 1);
                updatenilaikoreksnonscanner(nosoal,countEssay);
            }
        }
        print_modalbantuisi.innerHTML = `<i class="fa fa-print"></i> Cetak`;
        inputpg_modalbantuisi.innerHTML = `<i class="fa fa-pencil"></i> Input Nilai`;
        previewljk_modalbantuisi.innerHTML = `<i class="fa fa-eye"></i> Preview LJK`;
        kirimserver_modalbantuisi.innerHTML = `<i class="fa fa-save"></i> Kirim Server`;
        previewnaskahsoal_ljkbantu.innerHTML = `<i class="fa fa-eye"></i> Naskah Soal`;

        inputpg_modalbantuisi.setAttribute("onclick",`showhidebantuisiljkkoreksi("berinilai")`);
        previewljk_modalbantuisi.setAttribute("onclick",`showhidebantuisiljkkoreksi("lihatljk")`);
        
        previewnaskahsoal_ljkbantu.setAttribute("onclick",`showhidebantuisiljkkoreksi("lihatsoal")`)

        kirimserver_modalbantuisi.setAttribute("onclick",`kirimserverljkbantukoreksi('${idbaris}')`)
        
        showhidebantuisiljkkoreksi("awal");

    }).catch(er => {
        console.log(er);
        modal_loadingsoalbantudulu.innerHTML = "GAGAL LOADING";
        modal_tabelotomatisklikpg.innerHTML = "GAGAL LOADING";
        modal_previewljksementara.innerHTML = "GAGAL LOADING";
        document.getElementById("datakirimnonscanner").innerHTML ="";
        print_modalbantuisi.innerHTML = `<i class="fa fa-print"></i> Cetak`;
        inputpg_modalbantuisi.innerHTML = `<i class="fa fa-pencil"></i> Input Nilai`;
        previewljk_modalbantuisi.innerHTML = `<i class="fa fa-eye"></i> Preview LJK`;
        kirimserver_modalbantuisi.innerHTML = `<i class="fa fa-save"></i> Kirim Server`;
        previewnaskahsoal_ljkbantu.innerHTML = `<i class="fa fa-eye"></i> Naskah Soal`;
        print_modalbantuisi.setAttribute("onclick","alert('Proses Gagal meloading')");
        inputpg_modalbantuisi.setAttribute("onclick","alert('Proses Gagal meloading')");
        previewljk_modalbantuisi.setAttribute("onclick","alert('Proses Gagal meloading')");
        previewnaskahsoal_ljkbantu.setAttribute("onclick","alert('Proses Gagal meloading')");
        kirimserver_modalbantuisi.setAttribute("onclick","alert('Proses Gagal meloading')")
    })
}


const showhidebantuisiljkkoreksi = (kondisi)=>{
        
    if(modal_lebarmodalbantuisibaru.hasAttribute("style")){
        modal_lebarmodalbantuisibaru.removeAttribute("style")
    }
    if(kondisi == "awal"){
        modal_loadingsoalbantudulu.style.display="none";
        modal_tabelotomatisklikpg.style.display="block";
        modal_previewljksementara.style.display="none";
        print_modalbantuisi.setAttribute("onclick",`printadm('tabelotomatisklikpg',true)`);
    }else if(kondisi == "berinilai"){
        modal_loadingsoalbantudulu.style.display="none";
        modal_tabelotomatisklikpg.style.display="block";
        modal_previewljksementara.style.display="none";
        print_modalbantuisi.setAttribute("onclick",`printadm('tabelotomatisklikpg',true)`);
    }else if(kondisi == "lihatsoal"){
        modal_loadingsoalbantudulu.style.display="block";
        modal_tabelotomatisklikpg.style.display="none";
        modal_previewljksementara.style.display="none";
        print_modalbantuisi.setAttribute("onclick",`printadm('loadingsoalbantudulu',true)`);
    }else if(kondisi == "lihatljk"){
        modal_previewljksementara.style.width="98%";
        modal_loadingsoalbantudulu.style.display="none";
        modal_tabelotomatisklikpg.style.display="none";
        modal_previewljksementara.style.display="block";
        modal_lebarmodalbantuisibaru.setAttribute("style","width:98%")
        print_modalbantuisi.setAttribute("onclick",`printadm('previewljksementara',false)`);
    }
    modal_modalbantuisibarulagi.scrollTo({ top: 43, behavior: 'smooth' });
}


const kirimserverljkbantukoreksi = (idbaris)=>{
    let konf = confirm("Anda yakin semua isian nilai ini sudah benar?");
    if(!konf){
        return
    }
    let dataform = new FormData();
    
    let html = modal_previewljksementara.innerHTML;
    html +=`<div class="ttdkoreksi w3-card-4 w3-aqua w3-center w3-padding">
    Essay telah dikoreksi oleh = <br>${namauser}<br>
    Pada  <br>${Tanggaldenganhari(new Date())}
    </div>`
    let kodebto = window.btoa(html);

    let divclass = document.querySelectorAll("[data-keykirimnonscanner]");
    for(let i = 0 ; i < divclass.length ; i++){
        let key = divclass[i].getAttribute("data-keykirimnonscanner");
        let val = divclass[i].value;
        dataform.append(key,val)
    }
    dataform.append("tekshtmlnilai",kodebto);
    dataform.append("idbaris",idbaris);
    //kirimgambar
    let tabelbuktifisik = document.getElementById("tabelbuktifisikljk");
    let isitabel =""
    if(tabelbuktifisik.rows.length > 0){
        for(let t = 0 ; t < tabelbuktifisik.rows.length - 1 ; t++){
            isitabel += tabelbuktifisik.rows[t].cells[0].innerHTML;
        }
        dataform.append("html_buktifisik", isitabel);
    }
    
    // for (var pair of dataform.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }
    let iddarimana = (koreksidarimana.innerHTML).split("_")[1];
    let idakseskoreksi = (koreksidarimana.innerHTML).split("_")[0];
    modal_loadingsoalbantudulu.innerHTML = `<img src="/img/barloading.gif"/>Memproses`;
    modal_tabelotomatisklikpg.innerHTML = `<img src="/img/barloading.gif"/>Memproses`;
    modal_previewljksementara.innerHTML = `<img src="/img/barloading.gif"/>Memproses`;
    
    fetch(constlinknilai + "?action=gurumengoreksicarabaru", {
            method: 'post',
            body: dataform
    }).then(u => u.json())
    .then(q => {
        modal_loadingsoalbantudulu.innerHTML = q.result;
        modal_tabelotomatisklikpg.innerHTML =  q.result;
        modal_previewljksementara.innerHTML =  q.result;

        if (iddarimana == "hariini") {
                getdaftarnilai(idakseskoreksi)
        } else {
                daftarnilaikronologi(idakseskoreksi)
        }
        setTimeout(() => {
            // modal_modalbantuisibarulagi.style.display = "none";
            tutupmodalljkbantu();
        }, 2000);
    }).catch(er => {
                console.log(er);
                "Maaf, terjadi kesalahan.";
                modal_loadingsoalbantudulu.innerHTML = "";
                modal_tabelotomatisklikpg.innerHTML = "";
                modal_previewljksementara.innerHTML = "";
                print_modalbantuisi.setAttribute("onclick","alert('Proses Gagal meloading')");
        inputpg_modalbantuisi.setAttribute("onclick","alert('Proses Gagal meloading')");
        previewljk_modalbantuisi.setAttribute("onclick","alert('Proses Gagal meloading')");
        previewnaskahsoal_ljkbantu.setAttribute("onclick","alert('Proses Gagal meloading')");
        kirimserver_modalbantuisi.setAttribute("onclick","alert('Proses Gagal meloading')")
               
    });
    
    kirimserver_modalbantuisi.setAttribute("onclick","alert('sedang proses kirim ...')")
}

let paginasipilihandbsoal_awal = document.querySelector(".paginasipilihandbsoal_awal"), 
    paginasipilihandbsoal_akhir = document.querySelector(".paginasipilihandbsoal_akhir"), 
    paginasipilihandbsoal_selanjutnya = document.querySelector(".paginasipilihandbsoal_next"), 
    paginasipilihandbsoal_sebelumnya = document.querySelector(".paginasipilihandbsoal_prev"), 
    paginasipilihandbsoal_spanhalaman = document.querySelector(".paginasipilihandbsoal_infohalaman"), 
    paginasipilihandbsoal_awal1 = document.querySelector(".paginasipilihandbsoal_awal1"), 
    paginasipilihandbsoal_akhir1 = document.querySelector(".paginasipilihandbsoal_akhir1"), 
    paginasipilihandbsoal_selanjutnya1 = document.querySelector(".paginasipilihandbsoal_next1"), 
    paginasipilihandbsoal_sebelumnya1 = document.querySelector(".paginasipilihandbsoal_prev1"), 
    paginasipilihandbsoal_spanhalaman1 = document.querySelector(".paginasipilihandbsoal_infohalaman1"), 
    paginasipilihandbsoal_page_saatini=1, paginasipilihandbsoal_per_page=20;

const paginasipilihandbsoal_peritem = (objj,kondisi="")=>{
    let obj  = objj.slice();
        obj.reverse();
    paginasipilihandbsoal_sebelumnya.onclick = function () {
        if ( paginasipilihandbsoal_page_saatini > 1) {
            paginasipilihandbsoal_page_saatini--;
            gantihalamantabelbanksoal(paginasipilihandbsoal_page_saatini);
        }
    
    }
    paginasipilihandbsoal_selanjutnya.onclick = function(){
        if ( paginasipilihandbsoal_page_saatini < totalhalamantabelbanksoal()) {
            paginasipilihandbsoal_page_saatini++;
            gantihalamantabelbanksoal(paginasipilihandbsoal_page_saatini);
        }
        
    }
    paginasipilihandbsoal_sebelumnya1.onclick = function () {
        if ( paginasipilihandbsoal_page_saatini > 1) {
            paginasipilihandbsoal_page_saatini--;
            gantihalamantabelbanksoal(paginasipilihandbsoal_page_saatini);
            window.scrollTo({top:document.querySelector(".tempatbungkusindukbanksoal").offsetTop-43,behavior:"smooth"});
        }
    
    }
    paginasipilihandbsoal_selanjutnya1.onclick = function(){
        if ( paginasipilihandbsoal_page_saatini < totalhalamantabelbanksoal()) {
            paginasipilihandbsoal_page_saatini++;
            gantihalamantabelbanksoal(paginasipilihandbsoal_page_saatini);
            window.scrollTo({top:document.querySelector(".tempatbungkusindukbanksoal").offsetTop-43,behavior:"smooth"});
        }
        
    }
    
    function gantihalamantabelbanksoal(page)    {
        
        if (page < 1) page = 1;
        if (page > totalhalamantabelbanksoal()) page = totalhalamantabelbanksoal();

        
        let teks =``;
        
        let tbBody = "";
        let tabel = document.querySelector(".tabelpilihandbsoal").getElementsByTagName("tbody")[0]
        for (var i = (page-1) * paginasipilihandbsoal_per_page; i < (page * paginasipilihandbsoal_per_page) && i < obj.length; i++) {
        // for (i = obj.length - 1  ; i < (page-1) * paginasipilihandbsoal_per_page;  i--) {
            let html= "";
           
            let rating="";// = fungsirating();
            let dbb = obj;
               
                    
                    rating = fungsirating(dbb[i].idbaris);
                    tbBody +=`<tr><td class="w3-center">${i+1}</td><td class="w3-center">${dbb[i].jenjang}</td><td class="w3-center">${dbb[i].oleh}</td><td>${dbb[i].tekskodemapel}</td>`;
                    if(dbb[i].ilustrasi == "" || dbb[i].ilustrasi == `<div><br></div>`){

                        tbBody +=`<td class="w3-tiny"><div style="width:360px;overflow-x:auto">${dbb[i].pertanyaan}</div<</td>`;
                    }else{

                        tbBody +=`<td class="w3-tiny"><div style="width:360px;overflow-x:auto">${dbb[i].ilustrasi}</div></td>`;
                    }
                    
                    tbBody +=`<td>${dbb[i].bentuksoal}</td><td>${rating}</td><td><button class="w3-button w3-yellow w3-bottombar w3-border-black w3-round" onclick="modalbanksoaleditable('${dbb[i].idbaris}','lihat')" title="Lihat item soal"><i class="fa fa-eye"></i></button><button class="w3-button w3-blue w3-bottombar w3-border-black w3-round" onclick="modalbanksoaleditable('${dbb[i].idbaris}','modifikasi')" title="Modifikasi soal ini menjadi item soal baru di database. Item soal sebelumnya masih tetap ada."><i class="fa fa-edit"></i></button>`;
                    if(dbb[i].idguru == idguru){
                        tbBody +=`<button class="w3-button w3-green w3-bottombar w3-border-black w3-round" onclick="modalbanksoaleditable('${dbb[i].idbaris}','edit')"  title="Karena ini buatan Anda, Anda bisa mengeditnya"><i class="fa fa-gear"></i></button>
                        <button class="w3-button w3-light-grey w3-bottombar w3-border-black w3-round" onclick="modalbanksoalhapus('${dbb[i].idbaris}','hapus')"  title="Karena ini buatan Anda, Anda bisa menghapusnya"><i class="fa fa-trash"></i></button>`;
                    }
                    tbBody +=`</td></tr>`;
                
                    
            }
                tabel.innerHTML = tbBody;
        
        

        paginasipilihandbsoal_spanhalaman.innerHTML = page + " dari " + totalhalamantabelbanksoal();
        paginasipilihandbsoal_spanhalaman1.innerHTML = page + " dari " + totalhalamantabelbanksoal();

        if (page == 1) {
            paginasipilihandbsoal_sebelumnya.style.visibility = "hidden";
            paginasipilihandbsoal_awal.style.visibility = "hidden";
            paginasipilihandbsoal_sebelumnya1.style.visibility = "hidden";
            paginasipilihandbsoal_awal1.style.visibility = "hidden";
        } else {
            paginasipilihandbsoal_awal.style.visibility = "visible"
            paginasipilihandbsoal_sebelumnya.style.visibility = "visible";
            paginasipilihandbsoal_awal1.style.visibility = "visible"
            paginasipilihandbsoal_sebelumnya1.style.visibility = "visible";
        }

        if (page == totalhalamantabelbanksoal()) {
            paginasipilihandbsoal_selanjutnya.style.visibility = "hidden";
            paginasipilihandbsoal_akhir.style.visibility = "hidden";
            paginasipilihandbsoal_selanjutnya1.style.visibility = "hidden";
            paginasipilihandbsoal_akhir1.style.visibility = "hidden";
        } else {
            paginasipilihandbsoal_akhir.style.visibility = "visible";
            paginasipilihandbsoal_selanjutnya.style.visibility = "visible";
            paginasipilihandbsoal_akhir1.style.visibility = "visible";
            paginasipilihandbsoal_selanjutnya1.style.visibility = "visible";
        }

    }
    
    function totalhalamantabelbanksoal(){
        return Math.ceil(obj.length / paginasipilihandbsoal_per_page);
    }

    paginasipilihandbsoal_akhir.onclick = function (){
        let hal = totalhalamantabelbanksoal();
         paginasipilihandbsoal_page_saatini = hal;
        gantihalamantabelbanksoal(hal);

    }
    paginasipilihandbsoal_awal.onclick =function (){
         paginasipilihandbsoal_page_saatini = 1;
        gantihalamantabelbanksoal(1);
        // Validate page
        //  if (page < 1) page = 1;
        //  if (page > totalhalamantabelbanksoal()) page = totalhalamantabelbanksoal();

    }
    paginasipilihandbsoal_akhir1.onclick = function (){
        let hal = totalhalamantabelbanksoal();
         paginasipilihandbsoal_page_saatini = hal;
        gantihalamantabelbanksoal(hal);
        window.scrollTo({top:document.querySelector(".tempatbungkusindukbanksoal").offsetTop-43,behavior:"smooth"});

    }
    paginasipilihandbsoal_awal1.onclick =function (){
         paginasipilihandbsoal_page_saatini = 1;
        gantihalamantabelbanksoal(1);
        // Validate page
        //  if (page < 1) page = 1;
        //  if (page > totalhalamantabelbanksoal()) page = totalhalamantabelbanksoal();
        window.scrollTo({top:document.querySelector(".tempatbungkusindukbanksoal").offsetTop-43,behavior:"smooth"});
    }
    if(kondisi == ""){
        gantihalamantabelbanksoal(1);
    }else{
        
        // let valuse = obj.map(m=> parseInt(m.idbaris));
        
        // let indeknya = valuse.indexOf(parseInt(kondisi));
        
        gantihalamantabelbanksoal(paginasipilihandbsoal_page_saatini);
    }
    //paginasipilihandbsoal_ingindiedit.checked = false;
    
    
}