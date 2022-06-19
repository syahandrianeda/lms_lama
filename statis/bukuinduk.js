let dbsiswa_bukuinduk, dbinduk_siswaaktif, dbinduk_siswanonaktif, dbinduk_siswalulus, dbinduk_siswapindah,
    dbinduk_nisduplikat, dbinduk_tidakpunyainduk, dbinduk_nisaneh, dbinduk_siswapindahan,
    dbinduk_koleksibukuinduk;

const cbi_infoawal = document.querySelector(".cbi_infoawal");
const cbi_koleksibukuinduk = document.querySelector(".cbi_koleksibukuinduk");
// let db_utama_siswa
// let datakirim2 = new FormData();
// datakirim2.append("action","getdatautama");
// datakirim2.append("idsreadsheet",jlo.ss_datauser);

// // for (var pair of datakirim.entries()) {
// //         console.log(pair[0]+ ', ' + pair[1]); 
// //     }

// fetch(linkdatabaseinduk,{method:"post",body:datakirim2})
// .then(m => m.json())
// .then(r =>{
//     db_utama_siswa = r.all;
// }).catch(er => {
//     console.log(er)
// });
// let dbsiswa_bukuinduk;//=[]; // semua datasiswa
// let dbbukuinduk_punyainduk;// = []; // data siswa yang isian dbsiswanya !== ""
// let dbbukuinduk_tidakpunyainduk;// = []; // data siswa yang isian dbsiswanya == ""
// let dbbukuinduk_siswapindahan;// = []; // data siswa yang punya nomor induk xxxx02xx
// let dbbukuinduk_siswaasal;// = []; // data siswa yang punya nomor induk xxxx02xx
// let dbbukuinduk_koleksibukuinduk;// = [];// 1617, 1718, dst ...
// const awalbukuindukversilama = () =>{
//     dbsiswa_bukuinduk = jsondatasiswa.slice();
//     dbbukuinduk_punyainduk = dbsiswa_bukuinduk.filter(s=> s.nis !=="");
//     dbbukuinduk_tidakpunyainduk = dbsiswa_bukuinduk.filter(s=> s.nis =="");
//     dbbukuinduk_siswapindahan = dbsiswa_bukuinduk.filter(s => s.nis.substring(4,6) !=="01");
//     let html = `<h5 class="w3-center">Informasi Awal</h5>`;
//     html +=`<table class="w3-table garis w3-tiny w3-white"><tbody>`;
//     html += `<tr><td>Punya Buku Induk</td><td>${dbbukuinduk_punyainduk.length>0?dbbukuinduk_punyainduk.length+' Siswa':'0'}</td></tr>`;
//     html += `<tr><td>Tidak Punya Buku Induk</td><td>${dbbukuinduk_tidakpunyainduk.length>0?dbbukuinduk_tidakpunyainduk.length+' Siswa':'Terisi Semua'}</td></tr>`;
//     html += `<tr><td>Koleksi Buku Induk</td><td>`;
//     dbbukuinduk_koleksibukuinduk = dbsiswa_bukuinduk.map(s => s.nis.substring(0,4)).filter((x,i,a)=> a.indexOf(x)==i);
//     for(let i = 0 ; i < dbbukuinduk_koleksibukuinduk.length ; i++){
//         html +=`<span class="w3-border w3-round-large w3-pale-green w3-padding" style="margin:0 5px">${dbbukuinduk_koleksibukuinduk[i]}</span>`;
//     }
//     html +=`</td></tr>`;
//     if(dbbukuinduk_siswapindahan.length> 0){
//         html += `<tr><td>Jumlah Siswa pindahan</td><td>${dbbukuinduk_siswapindahan.length + " Siswa"}</td></tr>`
//         html += `<tr><td>Nama Siswa Pindahan</td><td><ol style="margin:0 0 0 -2.79em">`;
//         for(let j = 0 ; j < dbbukuinduk_siswapindahan.length ; j++){
//             html+=`<li>${dbbukuinduk_siswapindahan[j].pd_nama}<br>di kelas ${dbbukuinduk_siswapindahan[j].nis.substring(5,6)}<br>pada tapel 20${dbbukuinduk_siswapindahan[j].nis.substring(0,2)}/20${dbbukuinduk_siswapindahan[j].nis.substring(2,4)}`;
//         }
//         html+=`</ol></td></tr>`
//     }
//     html += `</tbody></table>`;
//     cbi_infoawal.innerHTML = html;
//     cbi_koleksibukuinduk.innerHTML = `Perlu Perbaikan Data`;
//     let html_revisi = "";

// }

let dbindukjenjangini_aktif,dbindukjenjangini_aktifniskosong,dbindukjenjangini_aktifnisganda,dbindukjenjangini_aktifnislengkap,
    dbindukjenjangini_aktifnisbermasalahl
let dbindukrombel

    const divbukuinduk_infoawal = document.querySelector(".informasiawaldatabasebukuinduk");
    const divbukuinduk_ketinfoawal = document.querySelector(".keteranganinforekapinduk");
    const divbukuinduk_koleksi = document.querySelector(".divbukuinduk_koleksibukuinduk");
    const divbukuinduk_koleksibukuindukperkelas = document.querySelector(".koleksibukuindukperkelas");
    const divbukuinduk_previewbukuinduk = document.querySelector(".previewbukuinduk");
const awalbukuinduk = () =>{
    cbi_infoawal.innerHTML = `<img src="/img/barloading.gif">`;
    cbi_koleksibukuinduk.innerHTML = `<img src="/img/barloading.gif">`;

    let data = new FormData();
    data.append("action","alldatabasebukuindukpost");//+"?action=alldatabasebukuindukpost"
    fetch(linkdatabaseinduk,{method:"post",body:data})
    .then(m => m.json())
    .then(r => {
        let html ="Informasi Database Buku Induk";
        dbsiswa_bukuinduk = r.all;
            dbinduk_siswaaktif = dbsiswa_bukuinduk.filter(s => s.aktif == "aktif");//r.aktif;
            dbindukrombel = dbsiswa_bukuinduk.filter(s=> s.nama_rombel == idNamaKelas);
            dbinduk_siswanonaktif = dbsiswa_bukuinduk.filter(s => s.aktif == "non-aktif");
            dbinduk_siswalulus = dbsiswa_bukuinduk.filter(s => s.aktif == "lulus");//r.lulus;
            dbinduk_siswapindah = dbsiswa_bukuinduk.filter(s => s.aktif == "pindah");//r.pindah;
            dbinduk_nisduplikat = dbsiswa_bukuinduk.filter(s => s.nis !=="").map(m => m.nis).filter((x,i,a)=> a.indexOf(x) !==i).map(mm => dbsiswa_bukuinduk.filter(ss => ss.nis == mm));//r.nisduplikat;
            dbinduk_tidakpunyainduk = dbsiswa_bukuinduk.filter(s => s.nis =="");//r.niskosong;//dbsiswa_bukuinduk.filter(s => s.nis == "");
            dbinduk_nisaneh = dbsiswa_bukuinduk.filter(s => s.nis !=="").filter(m => m.nis.match(/(\D+)/)!==null || m.nis.length !== 9);
            dbinduk_siswapindahan = dbsiswa_bukuinduk.filter(s => s.nis !=="" && s.nis.toString().substring(4,6) !=="01");
            dbinduk_koleksibukuinduk = dbsiswa_bukuinduk.filter(s => s.nis !=="").map(m => m.nis.toString().substring(0,4)).filter((x,i,a) => a.indexOf(x) == i);
        
        dbindukrombel_koleksibukuinduk = dbsiswa_bukuinduk.filter(s => s.nis !=="" && s.jenjang == idJenjang && s.nama_rombel == idNamaKelas).map(m => m.nis.toString().substring(0,4)).filter((x,i,a) => a.indexOf(x) == i);
        dbindukjenjangini_aktif = dbinduk_siswaaktif.filter(s => s.jenjang == idJenjang);
        dbindukjenjangini_aktifniskosong = dbinduk_siswaaktif.filter(s => s.jenjang == idJenjang && s.nis == "");
        dbindukjenjangini_aktifnislengkap = dbinduk_siswaaktif.filter(s => s.jenjang == idJenjang && s.nis !== "");
        dbindukjenjangini_aktifnisganda = dbinduk_nisduplikat.filter(s => s.jenjang == idJenjang);
        dbindukjenjangini_aktifnisbermasalah = dbinduk_nisaneh.filter(s => s.jenjang == idJenjang);

        html +=`<table class="w3-table garis w3-white w3-card-4" style="width:350px;font-size:10px;margin:5px auto">`;
        html +=`<tr class="w3-light-gray"><td colspan="2" class="w3-center">Database Induk di Jenjang Kelas ${idJenjang} ini</td></tr>`;
        html +=`<tr><td>Jumlah <b>Siswa Aktif</b></td><td>${dbindukjenjangini_aktif.length} Siswa</td></tr>`;
        html +=`<tr><td>Jumlah <b>Siswa Aktif NIS Lengkap</b></td><td>${dbindukjenjangini_aktifnislengkap.length} Siswa</td></tr>`;
        html +=`<tr><td>Jumlah <b>Siswa Aktif NIS Kosong</b></td><td>${dbindukjenjangini_aktifniskosong.length} Siswa</td></tr>`;
        html +=`<tr><td>Jumlah <b>Siswa Aktif NIS Ganda</b></td><td>${dbindukjenjangini_aktifnisganda.length} Siswa</td></tr>`;
        html +=`<tr><td>Jumlah <b>Siswa Aktif NIS Bermasalah</b></td><td>${dbindukjenjangini_aktifnisbermasalah.length} Siswa</td></tr>`;
        html +=`</table>`;
        cbi_infoawal.innerHTML = html;
        let html0 = `<table class="w3-table garis w3-white w3-card-4" style="width:350px;font-size:10px;margin:5px auto">`;
        html0 +=`<tr class="w3-light-grey"><td class="w3-center">Koleksi Buku Induk di Kelas ${idNamaKelas}</td></tr>`;
        html0 +=`<tr class="w3-light-grey"><td class="w3-center">`;
        for(i = 0 ; i < dbindukrombel_koleksibukuinduk.length ; i++){
            html0 +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk('daftarisiinduk', '${dbindukrombel_koleksibukuinduk[i]}','onlyrombel')">${dbindukrombel_koleksibukuinduk[i]}</button>`;
        }
        html0 +=`</td></tr>`;
        html0 +=`</table>`;
        cbi_koleksibukuinduk.innerHTML = html0


    })
    .catch(er => console.log(er));
}

const aksieditinduk = (kondisi, kodeinduk,filter="")=>{
    //filter onlyrombel
    let html = "";
    let db
    if(kondisi == "daftarisiinduk"){
        // db = dbsiswa_bukuinduk.filter(s => s.nis !=="" && s.nis.toString().substring(0,4) == kodeinduk);
        db = jsondatasiswa.filter(s => s.nis !=="" && s.nis.toString().substring(0,4) == kodeinduk);
        html = html_daftarisiinduk(kodeinduk,db,filter);
        ngapainsihlu.innerHTML ="koleksi_"+kodeinduk;
    }else if(kondisi == "nis-kosong"){
        db = dbsiswa_bukuinduk.filter(s => s.nis == "");
        html = html_cekinduk(kondisi, db);
        ngapainsihlu.innerHTML ="cekinduk_"+kondisi;
    }else if(kondisi == "nis-ganda"){
        db =  objekkan_arrayduplikat(dbinduk_nisduplikat);
        html = html_cekinduk(kondisi, db);
        ngapainsihlu.innerHTML ="cekinduk_"+kondisi;
    }else if(kondisi == "nis-salah"){
        db =  dbinduk_nisaneh;
        html = html_cekinduk(kondisi, db);
        ngapainsihlu.innerHTML ="cekinduk_"+kondisi;
    }else if(kondisi == "pindahan"){
        db =  dbinduk_siswapindahan;
        html = html_cekinduk(kondisi, db);
        ngapainsihlu.innerHTML ="cekinduk_"+kondisi;
    }else if(kondisi == "non-aktif"){
        db =  dbinduk_siswanonaktif;
        html = html_cekinduk(kondisi, db);
        ngapainsihlu.innerHTML ="cekinduk_"+kondisi;
    }else if(kondisi == "pindah"){
        db =  dbinduk_siswapindah;
        html = html_cekinduk(kondisi, db);
        ngapainsihlu.innerHTML ="cekinduk_"+kondisi;
    }else if(kondisi == "lulus"){
        db =  dbinduk_siswalulus;
        html = html_cekinduk(kondisi, db);
        ngapainsihlu.innerHTML ="cekinduk_"+kondisi;
    }
    divbukuinduk_previewbukuinduk.innerHTML = html;
    let toptop = divbukuinduk_previewbukuinduk.offsetTop - 43;
    window.scrollTo({top:toptop,behavior:"smooth"});
}
const html_daftarisiinduk = (kodeinduk,db,only) =>{
    let html = ""
    let urutannis = db.sort((a,b)=> parseInt(a.nis.substring(6,9)) - parseInt(b.nis.substring(6,9)));
    
    if(parseInt(kodeinduk) <= 1314){
        html = `<h3 class="w3-center">Daftar Isi Buku Induk ${kodeinduk}</h3>`;
        html += `<div style="overflow-x:auto"><table class="w3-table garis w3-tiny"><thead><tr>`;
        html +=`<th>Aksi</th><th>No. urut</th><th>Kelas Terakhir</th><th>Nomor Induk Siswa</th><th>NISN</th><th>Nama Siswa</th><th>L/P</th><th>Tempat, Tgl Lahir</th><th>Nama Orang Tua</th><th>Pekerjaan</th><th>Alamat</th><th>Status | Keterangan</th><th>ID</th></tr></thead><tbody>`;
        for(let i = 0 ; i < urutannis.length ; i ++){
            let sel_lulus = "", sel_ket = "", sel_btn ="";
            if(urutannis[i].aktif == "lulus"){
                sel_lulus +=`<td class="w3-center">${dbutamasiswa(urutannis[i].id).rombelkelassaatini}<br>Lulus</td>`;
                sel_ket += `<td class="w3-tiny">Lulus Tgl ${urutannis[i].keluar_tgl ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl))}</td>`
                sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('lulus',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
            }else if(urutannis[i].aktif == "pindah"){
                sel_lulus += `<td>Pindah Tgl ${urutannis[i].keluar_tgl2 ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl2))}</td>`;
                sel_ket += `<td class="w3-tiny">${urutannis[i].aktif}<br>Lengkapi Data Cek Siswa Pindah</td>`;
                sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('lulus',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
            }else if(urutannis[i].aktif == "non-aktif"){
                sel_lulus += `<td class="w3-center">${urutannis[i].nama_rombel}<br>non-aktif</td>`
                sel_ket += `<td class="w3-tiny">Tidak diketahui</td>`
                sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('non-aktif',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
            }else{
                sel_lulus += `<td class="w3-center">${dbutamasiswa(urutannis[i].id).rombelkelassaatini}</td>`;
                sel_ket += `<td>${urutannis[i].aktif}</td>`;
                sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('aktif',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
            }
            html +=sel_btn;//`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk(false,${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;            
            html +=`<td class="w3-center">${i+1}</td>`;
            html += sel_lulus;
            html +=`<td>${urutannis[i].nis}</td>`;
            html += `<td>${urutannis[i].nisn}</td>`;
            html +=`<td style="width:17%">${urutannis[i].pd_nama}</td>`;
            html += `<td>${urutannis[i].pd_jk}</td>`
            html += `<td style="width:12%">${urutannis[i].pd_tl}<br>${urutannis[i].pd_tanggallahir ==""?"(Tgl Lahir tidak diisi)":tanggalfull(new Date(urutannis[i].pd_tanggallahir))}</td>`
            html += `<td style="width:17%">${urutannis[i].pd_namaayah}<br>${urutannis[i].pd_namaibu}</td>`;
            html += `<td>${urutannis[i].dapo_pekerjaanayah}</td>`;
            html += `<td>${urutannis[i].pd_alamat}</td>`;
            html += sel_ket
            html += `<td>${urutannis[i].id}</td></tr>`;
        }
        html +=`</tbody></table></div>`;
    }else{
        
        // let urutannis = dbsiswa_bukuinduk.filter(s => s.nis.toString().substring(0,4) ==kodeinduk).sort((a,b)=> a.nis - b.nis); sudah diurutkan di argumen
        let cek_nis_aneh = urutannis.filter(m => m.nis.match(/(\D+)/)!==null || m.nis.length !== 9);
        if(cek_nis_aneh.length > 0){
            let cekduplikat = urutannis.map(m => m.nis).filter((x,i,a)=> a.indexOf(x) !==i).map(mm => urutannis.filter(ss => ss.nis == mm));
            let objekganda = objekkan_arrayduplikat(cekduplikat)
            html = `<h3 class="w3-center">Daftar Isi Buku Induk ${kodeinduk}</h3>`;
            html +=`<br><br><span class="w3-red">Terdapat ${cek_nis_aneh.length} Siswa yang memiliki nomor induk dengan format yang tidak dikenal. Mohon perbaiki terlebih dahulu agar proses pengurutan NIS di Daftar Isi sesuai nomor urut.</span>`;
            html += `<div style="overflow-x:auto"><table class="w3-table garis w3-tiny"><thead><tr>`;
            html +=`<th>Aksi</th><th>No. urut</th><th>Kelas Terakhir</th><th>Nomor Induk Siswa</th><th>NISN</th><th>Nama Siswa</th><th>L/P</th><th>Tempat, Tgl Lahir</th><th>Nama Orang Tua</th><th>Pekerjaan</th><th>Alamat</th><th>Status | Keterangan</th><th>ID</th></tr></thead><tbody>`;
            for(let i = 0 ; i < urutannis.length ; i ++){
                let sianeh = cek_nis_aneh.filter(s => s.id == urutannis[i].id);
                let siganda = objekganda.filter(s => s.nis == urutannis[i].nis);
                if(sianeh.length > 0 || siganda.length >0){
                    html +=`<tr class="w3-red">`;
                }else{
                    if(urutannis[i].aktif=="non-aktif"){
                        html +=`<tr class="w3-pale-red">`;
                    }else{
                        html +=`<tr>`;
                    }
                }
                let sel_lulus = "", sel_ket = "", sel_btn ="";
                        if(urutannis[i].aktif == "lulus"){
                            sel_lulus +=`<td class="w3-center">${dbutamasiswa(urutannis[i].id).rombelkelassaatini}<br>Lulus</td>`;
                            sel_ket += `<td class="w3-tiny">Lulus Tgl ${urutannis[i].keluar_tgl ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl))}</td>`;
                            sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('lulus',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                        }else if(urutannis[i].aktif == "pindah"){
                            sel_lulus += `<td>Pindah Tgl ${urutannis[i].keluar_tgl2 ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl2))}</td>`
                            sel_ket += `<td class="w3-tiny">Lengkapi Data Cek Siswa Pindah</td>`;
                            sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('pindah',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                        }else if(urutannis[i].aktif == "non-aktif"){
                            sel_lulus += `<td class="w3-center">${urutannis[i].nama_rombel}<br>non-aktif</td>`;
                            sel_ket += `<td class="w3-tiny">Tidak diketahui</td>`;
                            sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('non-aktif',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                        }else{
                            sel_lulus += `<td class="w3-center">${dbutamasiswa(urutannis[i].id).rombelkelassaatini}</td>`;
                            if(sianeh.length > 0 || siganda.length > 0){
                                sel_ket +=`<td>${urutannis[i].aktif}<br>${sianeh.length !==0?"NIS Salah":""}${siganda.length !==0?"NIS Ganda":""}</td>`;
                                sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('nis-aneh',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                            }else{
                                sel_ket +=`<td>${urutannis[i].aktif}</td>`;
                                sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('aktif',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                            }
                        }
                html +=sel_btn;//`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk(false,${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                html +=`<td class="w3-center">${i+1}</td>`;
                html += sel_lulus;
                html +=`<td>${urutannis[i].nis}</td>`;
                html += `<td>${urutannis[i].nisn}</td>`;
                html +=`<td style="width:17%">${urutannis[i].pd_nama}</td>`;
                html += `<td>${urutannis[i].pd_jk}</td>`
                html += `<td style="width:12%">${urutannis[i].pd_tl}<br>${urutannis[i].pd_tanggallahir ==""?"(Tgl Lahir tidak diisi)":tanggalfull(new Date(urutannis[i].pd_tanggallahir))}</td>`
                html += `<td style="width:17%">${urutannis[i].pd_namaayah}<br>${urutannis[i].pd_namaibu}</td>`;
                html += `<td>${urutannis[i].dapo_pekerjaanayah}</td>`;
                html += `<td>${urutannis[i].pd_alamat}</td>`;
                html += sel_ket
                html += `<td>${urutannis[i].id}</td></tr>`;
            }
            html +=`</tbody></table></div>`;
        }else{
            let cekduplikat = urutannis.map(m => m.nis).filter((x,i,a)=> a.indexOf(x) !==i).map(mm => urutannis.filter(ss => ss.nis == mm));
            if(cekduplikat.length > 0){
                let objekganda = objekkan_arrayduplikat(cekduplikat)
                html = `<h3 class="w3-center">Daftar Isi Buku Induk ${kodeinduk}</h3>`;
                html +=`<br><br><span class="w3-red">Terdapat ${cekduplikat.length} Siswa dengan penulisan nomor induk ganda di sini.</span>`;
                html += `<div style="overflow-x:auto"><table class="w3-table garis w3-tiny"><thead><tr>`;
                html +=`<th>Aksi</th><th>No. urut</th><th>Kelas Terakhir</th><th>Nomor Induk Siswa</th><th>NISN</th><th>Nama Siswa</th><th>L/P</th><th>Tempat, Tgl Lahir</th><th>Nama Orang Tua</th><th>Pekerjaan</th><th>Alamat</th><th>Status | Keterangan</th><th>ID</th></tr></thead><tbody>`;
                for(let i = 0 ; i < urutannis.length ; i ++){
                    let siganda = objekganda.filter(s => s.nis == urutannis[i].nis);
                    if(siganda.length > 0){
                        html +=`<tr class="w3-red">`;
                    }else{
                        if(urutannis[i].aktif=="non-aktif"){
                            html +=`<tr class="w3-pale-red">`;
                        }else{
                            html +=`<tr>`;
                        }
                    }
                let sel_lulus = "", sel_ket = "", sel_btn ="";
                        if(urutannis[i].aktif == "lulus"){
                            sel_lulus +=`<td class="w3-center">${dbutamasiswa(urutannis[i].id).rombelkelassaatini}<br>Lulus</td>`;
                            sel_ket += `<td class="w3-tiny">Lulus Tgl ${urutannis[i].keluar_tgl ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl))}</td>`;
                            sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('lulus',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                        }else if(urutannis[i].aktif == "pindah"){
                            sel_lulus += `<td>Pindah Tgl ${urutannis[i].keluar_tgl2 ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl2))}</td>`
                            sel_ket += `<td class="w3-tiny">${urutannis[i].aktif}<br>Lengkapi Data Cek Siswa Pindah</td>`;
                            sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('pindah',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                        }else if(urutannis[i].aktif == "non-aktif"){
                            sel_lulus += `<td class="w3-center">${urutannis[i].nama_rombel}<br>non-aktif</td>`
                            sel_ket += `<td class="w3-tiny">Tidak diketahui</td>`;
                            sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('non-aktif',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                        }else{
                            sel_lulus += `<td class="w3-center">${dbutamasiswa(urutannis[i].id).rombelkelassaatini}</td>`;
                            if(siganda.length > 0){
                                sel_ket +=`<td>${urutannis[i].aktif}<br>NIS Ganda</td>`;
                                sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('nis-ganda',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                            }else{
                                sel_ket +=`<td>${urutannis[i].aktif}</td>`;
                                sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('aktif',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                            }
                    
                        }
                    html += sel_btn;
                    html +=`<td class="w3-center">${i+1}</td>`;
                        html += sel_lulus;
                        html +=`<td>${urutannis[i].nis}</td>`;
                        html += `<td>${urutannis[i].nisn}</td>`;
                        html +=`<td style="width:17%">${urutannis[i].pd_nama}</td>`;
                        html += `<td>${urutannis[i].pd_jk}</td>`
                        html += `<td style="width:12%">${urutannis[i].pd_tl}<br>${urutannis[i].pd_tanggallahir ==""?"(Tgl Lahir tidak diisi)":tanggalfull(new Date(urutannis[i].pd_tanggallahir))}</td>`
                        html += `<td style="width:17%">${urutannis[i].pd_namaayah}<br>${urutannis[i].pd_namaibu}</td>`;
                        html += `<td>${urutannis[i].dapo_pekerjaanayah}</td>`;
                        html += `<td>${urutannis[i].pd_alamat}</td>`;
                        html += sel_ket
                        html += `<td>${urutannis[i].id}</td></tr>`;
                    
                }
                html +=`</tbody></table></div>`;
            }else{
                html = `<h3 class="w3-center">Daftar Isi Buku Induk ${kodeinduk}</h3>`;
                // html +=`<br><br><span class="w3-pale-green">No. Urut disamakan dengan nomor akhir NIS</span>`;
                // html += `<div style="overflow-x:auto"><table class="w3-table garis w3-tiny"><thead><tr class="w3-light-grey">`;
                // // html +=`<th>No. urut</th><th>Nomor Induk Siswa</th><th>Status</th><th>Nama Siswa</th><th>Kelas Terakhir</th><th>Keterangan</th><th>ID</th></tr></thead><tbody>`;
                // html +=`<th>Aksi</th><th>No. urut</th><th>Kelas Terakhir</th><th>Nomor Induk Siswa</th><th>NISN</th><th>Nama Siswa</th><th>L/P</th><th>Tempat, Tgl Lahir</th><th>Nama Orang Tua</th><th>Pekerjaan</th><th>Alamat</th><th>Status | Keterangan</th><th>ID</th></tr></thead><tbody>`;
                if(only !== "onlyrombel"){
                    html +=`<br><br><span class="w3-pale-green">No. Urut disamakan dengan nomor akhir NIS</span>`;
                    html += `<div style="overflow-x:auto"><table class="w3-table garis w3-tiny"><thead><tr class="w3-light-grey">`;
                    // html +=`<th>No. urut</th><th>Nomor Induk Siswa</th><th>Status</th><th>Nama Siswa</th><th>Kelas Terakhir</th><th>Keterangan</th><th>ID</th></tr></thead><tbody>`;
                    html +=`<th>Aksi</th><th>No. urut</th><th>Kelas Terakhir</th><th>Nomor Induk Siswa</th><th>NISN</th><th>Nama Siswa</th><th>L/P</th><th>Tempat, Tgl Lahir</th><th>Nama Orang Tua</th><th>Pekerjaan</th><th>Alamat</th><th>Status | Keterangan</th><th>ID</th></tr></thead><tbody>`;
                    let nourut = 1; 
                    let cekinduk, parseinduk,substringinduk
                    //console.log(urutannis);
                    for(let i = 0 ; i < urutannis.length ; i ++){
                        cekinduk = urutannis[i].nis;
                        substringinduk = cekinduk.substring(6,9);
                        parseinduk = parseInt(substringinduk);
                        if(parseinduk !== nourut){
                            let rentang = parseinduk - nourut;
                            for(k = 0 ; k < rentang ; k++){
                                html +=`<tr class="w3-pale-red"><td class="w3-center"><button onclick="tambahdbsiswabukuinduk(${kodeinduk})" title="Tambahkan Data Induk"><i class="fa fa-plus"></i></button></td>`;
                                html +=`<td class="w3-center">${nourut}</td>`;//
                                html +=`<td></td>`; //Kelas Terakhir
                                html+=`<td>${kodeinduk}<b>0X</b><u>${tigadigit(nourut)}</u></td>`;
                                html +=`<td></td><td></td><td></td><td></td><td></td><td></td>`; // NISN, nama siswa, lp, tmpt tgllahir,  namaortu, pekerjaan, alamat, kelas awal, 
                                html +=`<td></td><td>tidak ditemukan</td>
                                <td></td>
                                </tr>` 
                                nourut++
                            }
                            ///======================================
                            if(rentang < 0){
                                html +=`<tr class="w3-pale-green">`;
                            }else{
                                if(urutannis[i].aktif=="non-aktif"){
                                    html +=`<tr class="w3-pale-red">`;
                                }else{
                                    html +=`<tr>`;
                                }
                            }
                            
                            let sel_lulus = "", sel_ket = "", sel_btn = "";
                            if(urutannis[i].aktif == "lulus"){
                                sel_lulus +=`<td class="w3-center">${dbutamasiswa(urutannis[i].id).rombelkelassaatini}<br>Lulus</td>`
                                sel_ket += `<td class="w3-tiny">Lulus Tgl ${urutannis[i].keluar_tgl ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl))}</td>`;
                                sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('lulus',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                            }else if(urutannis[i].aktif == "pindah"){
                                sel_lulus += `<td>Pindah Tgl ${urutannis[i].keluar_tgl ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl))}</td>`
                                sel_ket += `<td class="w3-tiny">Lengkapi Data Cek Siswa Pindah</td>`;
                                sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('pindah',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                            }else if(urutannis[i].aktif == "non-aktif"){
                                sel_lulus += `<td class="w3-center">${urutannis[i].nama_rombel}<br>non-aktif</td>`;
                                sel_ket += `<td class="w3-tiny">Tidak diketahui</td>`;
                                sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('non-aktif',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                            }else{
                                sel_lulus += `<td class="w3-center">${dbutamasiswa(urutannis[i].id).rombelkelassaatini}</td>`;
                                sel_ket += `<td>${urutannis[i].aktif}</td>`;
                                sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('aktif',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                            }
                            html +=sel_btn;
                            //html +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk(false,${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                            html +=`<td class="w3-center">${nourut}</td>`;
                            html += sel_lulus;
                            html +=`<td>${urutannis[i].nis}</td>`;
                            html += `<td>${urutannis[i].nisn}</td>`;
                            html +=`<td style="width:17%">${urutannis[i].pd_nama}</td>`;
                            html += `<td>${urutannis[i].pd_jk}</td>`
                            html += `<td style="width:12%">${urutannis[i].pd_tl}<br>${urutannis[i].pd_tanggallahir ==""?"(Tgl Lahir tidak diisi)":tanggalfull(new Date(urutannis[i].pd_tanggallahir))}</td>`
                            html += `<td style="width:17%">${urutannis[i].pd_namaayah}<br>${urutannis[i].pd_namaibu}</td>`;
                            html += `<td>${urutannis[i].dapo_pekerjaanayah}</td>`;
                            html += `<td>${urutannis[i].pd_alamat}</td>`;
                            //html += `<td>${parseInt(urutannis[i].nis.substring(4,6))}</td>`;
                            //html +=`<td>${urutannis[i].aktif}</td>`;
                            html += sel_ket
                            html += `<td>${urutannis[i].id}</td></tr>`;
                            ///======================================
                            nourut++
                            
                            
                        }else{
                            
                            let sel_lulus = "", sel_ket = "", sel_btn ="";
                            if(urutannis[i].aktif == "lulus"){
                                sel_lulus +=`<td class="w3-center">${dbutamasiswa(urutannis[i].id).rombelkelassaatini}<br>Lulus</td>`
                                sel_ket += `<td class="w3-tiny">Lulus Tgl ${urutannis[i].keluar_tgl ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl))}</td>`;
                                sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('lulus',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                            }else if(urutannis[i].aktif == "pindah"){
                                sel_lulus += `<td>Pindah Tgl ${urutannis[i].keluar_tgl2 ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl2))}</td>`
                                sel_ket += `<td class="w3-tiny">${urutannis[i].aktif}<br>Lengkapi Data Cek Siswa Pindah</td>`
                                sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('pindah',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                            }else if(urutannis[i].aktif == "non-aktif"){
                                sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('non-aktif',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                                sel_lulus += `<td class="w3-center">${urutannis[i].nama_rombel}<br>non-aktif</td>`
                                sel_ket += `<td class="w3-tiny">Tidak diketahui</td>`
                            }else{
                                sel_lulus += `<td class="w3-center">${dbutamasiswa(urutannis[i].id).rombelkelassaatini}</td>`;
                                sel_ket += `<td>${urutannis[i].aktif}</td>`;
                                sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('aktif',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                            }
                            //html +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk(false,${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                            html +=sel_btn;
                            
                            html +=`<td class="w3-center">${nourut}</td>`;
                            html += sel_lulus;
                            html +=`<td>${urutannis[i].nis}</td>`;
                            html += `<td>${urutannis[i].nisn}</td>`;
                            html +=`<td style="width:17%">${urutannis[i].pd_nama}</td>`;
                            html += `<td>${urutannis[i].pd_jk}</td>`
                            html += `<td style="width:12%">${urutannis[i].pd_tl}<br>${urutannis[i].pd_tanggallahir ==""?"(Tgl Lahir tidak diisi)":tanggalfull(new Date(urutannis[i].pd_tanggallahir))}</td>`
                            html += `<td style="width:17%">${urutannis[i].pd_namaayah}<br>${urutannis[i].pd_namaibu}</td>`;
                            html += `<td>${urutannis[i].dapo_pekerjaanayah}</td>`;
                            html += `<td>${urutannis[i].pd_alamat}</td>`;
                            // html += `<td>${parseInt(urutannis[i].nis.substring(4,6))}</td>`;
                            // html +=`<td>${urutannis[i].aktif}</td>`;
                            html += sel_ket
                            html += `<td>${urutannis[i].id}</td></tr>`;
                            nourut++
                        }
                    }
                }else{
                    //html +=`<br><br><span class="w3-pale-green">No. Urut disamakan dengan nomor akhir NIS</span>`;
                    html += `<div style="overflow-x:auto"><table class="w3-table garis w3-tiny"><thead><tr class="w3-light-grey">`;
                    // html +=`<th>No. urut</th><th>Nomor Induk Siswa</th><th>Status</th><th>Nama Siswa</th><th>Kelas Terakhir</th><th>Keterangan</th><th>ID</th></tr></thead><tbody>`;
                    html +=`<th>Aksi</th><th>No. urut</th><th>Kelas Terakhir</th><th>Nomor Induk Siswa</th><th>NISN</th><th>Nama Siswa</th><th>L/P</th><th>Tempat, Tgl Lahir</th><th>Nama Orang Tua</th><th>Pekerjaan</th><th>Alamat</th><th>Status | Keterangan</th><th>ID</th></tr></thead><tbody>`;
                    
                    for(let i = 0 ; i < urutannis.length ; i ++){
                        let sel_lulus = "", sel_ket = "", sel_btn ="";
                        if(urutannis[i].aktif == "lulus"){
                            sel_lulus +=`<td class="w3-center">${dbutamasiswa(urutannis[i].id).rombelkelassaatini}<br>Lulus</td>`;
                            sel_ket += `<td class="w3-tiny">Lulus Tgl ${urutannis[i].keluar_tgl ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl))}</td>`
                            sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('lulus',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                        }else if(urutannis[i].aktif == "pindah"){
                            sel_lulus += `<td>Pindah Tgl ${urutannis[i].keluar_tgl2 ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl2))}</td>`;
                            sel_ket += `<td class="w3-tiny">${urutannis[i].aktif}<br>Lengkapi Data Cek Siswa Pindah</td>`;
                            sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('lulus',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                        }else if(urutannis[i].aktif == "non-aktif"){
                            sel_lulus += `<td class="w3-center">${urutannis[i].nama_rombel}<br>non-aktif</td>`
                            sel_ket += `<td class="w3-tiny">Tidak diketahui</td>`
                            sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('non-aktif',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                        }else{
                            sel_lulus += `<td class="w3-center">${dbutamasiswa(urutannis[i].id).rombelkelassaatini}</td>`;
                            sel_ket += `<td>${urutannis[i].aktif}</td>`;
                            sel_btn +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk('aktif',${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
                        }
                        html +=sel_btn;//`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk(false,${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;            
                        html +=`<td class="w3-center">${i+1}</td>`;
                        html += sel_lulus;
                        html +=`<td>${urutannis[i].nis}</td>`;
                        html += `<td>${urutannis[i].nisn}</td>`;
                        html +=`<td style="width:17%">${urutannis[i].pd_nama}</td>`;
                        html += `<td>${urutannis[i].pd_jk}</td>`
                        html += `<td style="width:12%">${urutannis[i].pd_tl}<br>${urutannis[i].pd_tanggallahir ==""?"(Tgl Lahir tidak diisi)":tanggalfull(new Date(urutannis[i].pd_tanggallahir))}</td>`
                        html += `<td style="width:17%">${urutannis[i].pd_namaayah}<br>${urutannis[i].pd_namaibu}</td>`;
                        html += `<td>${urutannis[i].dapo_pekerjaanayah}</td>`;
                        html += `<td>${urutannis[i].pd_alamat}</td>`;
                        html += sel_ket
                        html += `<td>${urutannis[i].id}</td></tr>`;
                    }
                }
                html +=`</tbody></table></div>`;
            }
        }
    }
    return html
}
const html_cekinduk = (kondisi,db) =>{
    let html = "";
    if(kondisi == "nis-kosong"){
        html = `<h3 class="w3-center">Data Siswa Tidak Memiliki NIS</h3>`;
        html +=`<div id="overflow_cekinduik" style="overflow-x:auto">`;
        html +=`<table class="w3-table garis w3-small" style="max-width:600px;margin:15px auto"><thead>`;
        html +=`<tr class="w3-light-grey"><th>No.</th><th>Nama Siswa</th><th>Status</th><th>Kelas Terakhir</th><th>Aksi</th></tr></thead><tbody>`;
        for(let i = 0 ; i < db.length ; i++){
            html +=`${db[i].aktif !== "aktif"?"<tr class='w3-pale-red'>":"<tr>"}`;
            html +=`<td>${i+1}</td><td>${db[i].pd_nama}</td><td>${db[i].aktif}</td>`;
            html +=`<td>${dbutamasiswa(db[i].id).rombelkelassaatini}</td>`;
            if(db[i].aktif !== "aktif"){
                html +=`<td><button class="tangan" onclick="PerbaruidataInduk('nis-kosong',${db[i].id})" title="Anda bisa memperbarui data ini seluruhnya"><i class="fa fa-edit"></i></button></td>`
            }else{
                html +=`<td><button class="tangan" onclick="PerbaruidataInduk('nis-kosong',${db[i].id})" title="Anda hanya bisa memperbarui nomor induk saja"><i class="fa fa-edit"></i></button></td>`
            }
            html +=`</tr>`
        }
        html +=`</tbody></table>`;
        html +=`</div>`;
        //////
        
    }else if(kondisi == "nis-ganda"){
        html = `<h3 class="w3-center">Data Nomor Induk Ganda</h3>`;
        html +=`<div id="overflow_cekinduik" style="overflow-x:auto">`;
        html +=`<table class="w3-table garis w3-small" style="max-width:600px;margin:15px auto"><thead>`;
        html +=`<tr class="w3-light-grey"><th>No.</th><th>NIS</th><th>Nama Siswa</th><th>Status</th><th>Kelas Terakhir</th><th>Aksi</th></tr></thead><tbody>`;
        for(let i = 0 ; i < db.length ; i++){
            let dobel = db[i].objekganda;
            //dobelpertama
            let patokanhtml ="";
            if(i % 2 == 0){
                html += `<tr class="w3-pale-green">`;
                patokanhtml = `<tr class="w3-pale-green">`;
            }else{
                html +=`<tr>`;
                patokanhtml =`<tr>`;
            }
            html +=`<td class="w3-center" style="vertical-align:middle" rowspan="${dobel.length}">${i+1}</td>`;
            html +=`<td style="vertical-align:middle" rowspan="${dobel.length}">${db[i].nis}</td><td>${dobel[0].pd_nama}</td><td>${dobel[0].aktif}</td><td>${dbutamasiswa(dobel[0].id).rombelkelassaatini}</td>`;
            html +=`<td><button class="tangan" onclick="PerbaruidataInduk('nis-ganda',${dobel[0].id})" title="Anda hanya bisa memperbarui nomor induk saja"><i class="fa fa-edit"></i></button></td>`;
            html +=`</tr>`;
            for(let j = 1 ; j < dobel.length; j++){
                html += patokanhtml;
                html +=`<td>${dobel[j].pd_nama}</td><td>${dobel[j].aktif}</td><td>${dbutamasiswa(dobel[j].id).rombelkelassaatini}</td>`;
            html +=`<td><button class="tangan" onclick="PerbaruidataInduk('nis-ganda',${dobel[j].id})" title="Anda hanya bisa memperbarui nomor induk saja"><i class="fa fa-edit"></i></button></td>`;
            html +=`</tr>`;
            }
        }
        html +=`</tbody></table>`;
        html +=`</div>`
    }else if(kondisi == "nis-salah"){
        html = `<h3 class="w3-center">Data Nomor Induk Bermasalah (Tidak sesuai Format)</h3>`;
        html +=`<div id="overflow_cekinduik" style="overflow-x:auto">`;
        html +=`<table class="w3-table garis w3-small" style="max-width:1000px;margin:15px auto"><thead>`;
        html +=`<tr class="w3-light-grey"><th>No.</th><th>NIS</th><th>Keterangan</th><th>Pemilik Nomor Induk</th><th>Status</th><th>Kelas Terakhir</th><th>Aksi</th></tr></thead><tbody>`;
        for(let i = 0 ; i < db.length ; i++){
            let nomerinduknya = db[i].nis;
            let adakarakter = nomerinduknya.match(/(\D+)/) !== null?`<li class="w3-tiny">ada selain angka</li>`:"";
            let cekleng = nomerinduknya.length !== 9?`<li class="w3-tiny">tidak 9 digit</li>`:"";
            html +=`<tr><td>${i+1}</td><td>${db[i].nis}</td>`;
            html +=`<td><ul style="margin:0 0 0 -2em">${cekleng}${adakarakter}</ul></td>`;
            html +=`<td>${db[i].pd_nama}</td><td>${db[i].aktif}</td><td>${dbutamasiswa(db[i].id).rombelkelassaatini}</td>`;
            html +=`<td><button class="tangan" onclick="PerbaruidataInduk('nis-salah',${db[i].id})" title="Anda hanya bisa memperbarui nomor induk saja"><i class="fa fa-edit"></i></button></td>`;
            html += `</tr>`
        }

        html +=`</tbody></table>`;
        html +=`</div>`;
    }else if(kondisi == "pindahan"){
        html = `<h3 class="w3-center">Data Siswa Mutasi Masuk (Pindahan dari Sekolah lain ke ${idNamaSekolah})</h3>`;
        html +=`<div id="overflow_cekinduik" style="overflow-x:auto">`;
        html +=`<table class="w3-table garis w3-small" style="max-width:1000px;margin:15px auto"><thead>`;
        html +=`<tr class="w3-light-grey"><th>No.</th><th>Nama Siswa</th><th>NIS</th><th>Masuk di Kelas</th><th>Asal Sekolah</th><th>Tanggal Masuk</th><th>Status</th><th>Kelas Terakhir</th><th>Aksi</th></tr></thead><tbody>`;
        for(let i = 0 ; i < db.length ; i++){
            let nomerinduknya = db[i].nis;
            let adakarakter = nomerinduknya.match(/(\D+)/) !== null?`<li class="w3-tiny">ada selain angka</li>`:"";
            let cekleng = nomerinduknya.length !== 9?`<li class="w3-tiny">tidak 9 digit</li>`:"";
            html +=`<tr><td>${i+1}</td>`;
            html +=`<td>${db[i].pd_nama}</td>`;
            html+=`<td>${db[i].nis}</td>`;
            html +=`<td class="w3-center">${db[i].nis ==""?"":parseInt(db[i].nis.substring(4,6))}</td>`;
            html +=`<td>${db[i].masuk_dari}</td>`
            html +=`<td>${db[i].masuk_tgl ==""?"":tanggalfull(new Date(db[i].masuk_tgl))}</td>`
            html +=`<td>${db[i].aktif}</td><td>${dbutamasiswa(db[i].id).rombelkelassaatini}</td>`;
            if(db[i].nis !==""){
                html +=`<td><button class="tangan" onclick="PerbaruidataInduk('pindahan',${db[i].id})" title="Anda hanya bisa memperbarui nomor induk saja"><i class="fa fa-edit"></i></button></td>`;
            }else{
                html +=`<td><button class="tangan" onclick="PerbaruidataInduk('nis-kosong',${db[i].id})" title="Anda hanya bisa memperbarui nomor induk saja"><i class="fa fa-edit"></i></button></td>`;
            }
            html += `</tr>`
        }
        html +=`</tbody></table>`;
        html +=`</div>`;
    }else if(kondisi == "pindah"){
        html = `<h3 class="w3-center">Data Siswa Mutasi Keluar (Pindah dari ${idNamaSekolah} ke Sekolah lain)</h3>`;
        html +=`<div id="overflow_cekinduik" style="overflow-x:auto">`;
        html +=`<table class="w3-table garis w3-small" style="max-width:1000px;margin:15px auto"><thead>`;
        html +=`<tr class="w3-light-grey"><th>No.</th><th>Nama Siswa</th><th>NIS</th><th>Keluar dari Kelas</th><th>Sekolah Tujuan</th><th>Tanggal Keluar</th><th>Status</th><th>Kelas Terakhir</th><th>Aksi</th></tr></thead><tbody>`;
        for(let i = 0 ; i < db.length ; i++){
            let nomerinduknya = db[i].nis;
            // let adakarakter = nomerinduknya.match(/(\D+)/) !== null?`<li class="w3-tiny">ada selain angka</li>`:"";
            // let cekleng = nomerinduknya.length !== 9?`<li class="w3-tiny">tidak 9 digit</li>`:"";
            html +=`<tr><td>${i+1}</td>`;
            html +=`<td>${db[i].pd_nama}</td>`;
            html+=`<td>${db[i].nis}</td>`;
            html +=`<td class="w3-center">${db[i].kelas_keluar}</td>`;
            html +=`<td>${db[i].pindah_ke}</td>`
            html +=`<td>${db[i].keluar_tgl2 ==""?"":tanggalfull(new Date(db[i].keluar_tgl2))}</td>`
            html +=`<td>${db[i].aktif}</td><td>${dbutamasiswa(db[i].id).rombelkelassaatini}</td>`;
            if(db[i].nis !==""){
                html +=`<td><button class="tangan" onclick="PerbaruidataInduk('pindah',${db[i].id})" title="Anda hanya bisa memperbarui nomor induk saja"><i class="fa fa-edit"></i></button></td>`;
            }else{
                html +=`<td><button class="tangan" onclick="PerbaruidataInduk('nis-kosong',${db[i].id})" title="Anda hanya bisa memperbarui nomor induk saja"><i class="fa fa-edit"></i></button></td>`;
            }
            html += `</tr>`;
        }
        html +=`</tbody></table>`;
        html +=`</div>`;
    }else if(kondisi == "non-aktif"){
        html = `<h3 class="w3-center">Data Siswa Non-aktif</h3>`;
        html +=`<div id="overflow_cekinduik" style="overflow-x:auto">`;
        html +=`<table class="w3-table garis w3-small" style="max-width:1000px;margin:15px auto"><thead>`;
        html +=`<tr class="w3-light-grey"><th>No.</th><th>Nama Siswa</th><th>NIS</th><th>Kelas Terakhir</th><th>Status</th><th>Aksi</th></tr></thead><tbody>`;
        for(let i = 0 ; i < db.length ; i++){
            let nomerinduknya = db[i].nis;
            html +=`<tr><td>${i+1}</td>`;
            html +=`<td>${db[i].pd_nama}</td>`;
            html+=`<td>${db[i].nis}</td>`;
            html +=`<td class="w3-center">${dbutamasiswa(db[i].id).rombelkelassaatini}</td>`;
            html +=`<td>${db[i].aktif}</td>`;
            if(db[i].nis !==""){
                html +=`<td><button class="tangan" onclick="PerbaruidataInduk('non-aktif',${db[i].id})" title="Anda hanya bisa memperbarui nomor induk saja"><i class="fa fa-edit"></i></button></td>`;
            }else{
                html +=`<td><button class="tangan" onclick="PerbaruidataInduk('nis-kosong',${db[i].id})" title="Anda hanya bisa memperbarui nomor induk saja"><i class="fa fa-edit"></i></button></td>`;
            }html += `</tr>`;
        }
        html +=`</tbody></table>`;
        html +=`</div>`
    }else if(kondisi == "lulus"){
        html = `<h3 class="w3-center">Data Siswa Lulus</h3>`;
        let koleksiangkatan = dbsiswa_bukuinduk.filter(s => s.angkatan !=="").map(m => m.angkatan).filter((x,i,a)=> a.indexOf(x) == i).sort((a,b)=> a-b);
        html +=`<div class="w3-center w3-round-xxlarge w3-container w3-border">`
        for(let a = 0 ; a <koleksiangkatan.length ; a++){
            html +=`<button class="w3-btn w3-yellow w3-bottombar w3-round-large w3-tiny w3-border-black w3-margin" onclick="ceklulusangkatan('${koleksiangkatan[a]}')">Angkatan ${koleksiangkatan[a]}</button>`;
        }
        html +=`</div>`;
        let dbb = dbsiswa_bukuinduk.filter(s => s.angkatan == koleksiangkatan[0]);
        html +=`<div id="overflow_cekinduik" style="overflow-x:auto">`;
            
            html +=`<h4 class="w3-center">Angkatan Ke-${koleksiangkatan[0]}</h4><table class="w3-table garis w3-small" style="max-width:1000px;margin:15px auto"><thead>`;
            html +=`<tr class="w3-light-grey"><th>No.</th><th>Nama Siswa</th><th>NIS</th><th>Tgl Lulus</th><th>No. Ijasah</th><th>Melanjutkan Ke-</th><th>Aksi</th></tr></thead><tbody>`;
            for(let i = 0 ; i < dbb.length ; i++){
                // let nomerinduknya = dbb[i].nis;
                html +=`<tr><td>${i+1}</td>`;
                html +=`<td>${dbb[i].pd_nama}</td>`;
                html+=`<td>${dbb[i].nis}</td>`;
                html +=`<td>${dbb[i].keluar_tgl ==""?"":tanggalfull(new Date(dbb[i].keluar_tgl))}</td>`;
                html +=`<td>${dbb[i].dapo_noseriijazah}</td>`;
                html +=`<td>${dbb[i].smp_ke}</td>`;
                if(dbb[i].nis !==""){
                    html +=`<td><button class="tangan" onclick="PerbaruidataInduk('lulus',${dbb[i].id})" title="Anda hanya bisa memperbarui nomor induk saja"><i class="fa fa-edit"></i></button></td>`;
                }else{
                    html +=`<td><button class="tangan" onclick="PerbaruidataInduk('nis-kosong',${dbb[i].id})" title="Anda hanya bisa memperbarui nomor induk saja"><i class="fa fa-edit"></i></button></td>`;
                }
                html += `</tr>`;
            }
            html +=`</tbody></table>`;
            html +=`</div>`
    }
    return html
}
const ceklulusangkatan = (angkatan) =>{
    let divh = document.getElementById("overflow_cekinduik");
    let dbb = dbsiswa_bukuinduk.filter(s => s.angkatan == angkatan);
    let html = "";
    html +=`<h4 class="w3-center">Angkatan Ke-${angkatan}</h4><table class="w3-table garis w3-small" style="max-width:1000px;margin:15px auto"><thead>`;
    html +=`<tr class="w3-light-grey"><th>No.</th><th>Nama Siswa</th><th>NIS</th><th>Tgl Lulus</th><th>No. Ijasah</th><th>Melanjutkan Ke-</th><th>Aksi</th></tr></thead><tbody>`;
    for(let i = 0 ; i < dbb.length ; i++){
        // let nomerinduknya = dbb[i].nis;
        html +=`<tr><td>${i+1}</td>`;
        html +=`<td>${dbb[i].pd_nama}</td>`;
        html+=`<td>${dbb[i].nis}</td>`;
        html +=`<td>${dbb[i].keluar_tgl ==""?"":tanggalfull(new Date(dbb[i].keluar_tgl))}</td>`;
        html +=`<td>${dbb[i].dapo_noseriijazah}</td>`;
        html +=`<td>${dbb[i].smp_ke}</td>`;//PerbaruidataInduk('lulus',676)
        html +=`<td><button class="tangan" onclick="PerbaruidataInduk('lulus',${dbb[i].id})" title="Anda hanya bisa memperbarui nomor induk saja"><i class="fa fa-edit"></i></button></td>`;
        html += `</tr>`;
    }
    html +=`</tbody></table>`;
    divh.innerHTML = html;
}
const tigadigit = (nourut) =>{
    let no = "000";
    if(nourut.toString().length == 1){
        no = "00"+nourut;
    }else if(nourut.toString().length == 2){
        no = "0"+nourut;
    }else{
        no = nourut.toString();
    }
    return no
}
const objekkan_arrayduplikat = (db) =>{
    // db = [[{ad:1,ae:2,a:dst}]]
    let rest = [];
    for(let i = 0 ; i < db.length ; i++){
        let ob = {};
        ob.prefik = db[i][0].nis.substring(0,4);
        ob.nis = db[i][0].nis;
        ob.objekganda = db[i];
        rest.push(ob)
    }
    return rest
}
const tabelinduk_showdb = (fokusdb, aktif,jenjang) =>{
    /**
     * foksudb = database yang menjadi fokus yang akan ditampilkan
     */
}

const dbutamasiswa = (id) =>{
    let df = jsondatasiswa.filter(s => s.id == id);
    let cb = {};
    if(df.length !== 0){
        let db = df[0];
        cb.jenjangsaatini = db.jenjang;
        cb.rombelkelassaatini = db.nama_rombel;
        cb.nis = db.nis;
    }else{
        cb.jenjangsaatini = dbsiswa_bukuinduk.filter(s => s.id==id)[0].jenjang;
        cb.rombelkelassaatini =  dbsiswa_bukuinduk.filter(s => s.id==id)[0].nama_rombel;
        cb.nis = dbsiswa_bukuinduk.filter(s => s.id==id)[0].nis;
    }
    return cb;

}
const modaledit_bukuinduk = document.querySelector("#modal_editnomorinduk");
const judulmodal_editnomorinduk = document.querySelector(".judulmodal_editnomorinduk");
const men_induk_info = document.querySelector(".men_induk_info");
const menu_editinduk = document.querySelector(".menu-editinduk");
const formulirkirim = document.querySelector(".formulirkirim");
const tempattombol_formulirkirim = document.querySelector(".tempattombol_formulirkirim");
const footer_editnomorinduk = document.querySelector(".footer_editnomorinduk");
const PerbaruidataInduk = (kondisi,tokensiswa) =>{
    modaledit_bukuinduk.style.display = "block";
    judulmodal_editnomorinduk.innerHTML = "RESUME DATA BUKU INDUK SISWA";
    //alert("Token siswa "+ tokensiswa);
    let html=""; // untuk info
    let menu = ""; // untuk tombol menu
    let formulir = ""; // untuk formulir perbaikan
    men_induk_info.innerHTML = "";
    menu_editinduk.innerHTML = "";
    tempattombol_formulirkirim.innerHTML = "";
    formulirkirim.innerHTML ="";
    
    let db = db_utama_siswa.filter(s => s.id == tokensiswa)[0];
    let ceksyarat = syarat_riwayatkelas(tokensiswa);
    // console.log(ceksyarat)
    let banyaktapel = ceksyarat.banyaktapel;
    let infokenaikan = ceksyarat.kenaikankelas;
    let siswaasal = ceksyarat.asalsiswa;
    let tapelawal = ceksyarat.tapelawal;
    let tapelakhir = ceksyarat.tapelakhir;
    let semesterawal = ceksyarat.semesterawal;
    let semesterakhir = ceksyarat.semesterakhir;
    let kelasawal = ceksyarat.kelasawal;
    let kelasakhir = ceksyarat.kelasakhir;
    if(kondisi=="aktif"){
        html =`Ananda ${db.pd_nama} terdeteksi sebagai siswa ${ceksyarat.asalsiswa == "PPDB"?"Asal (terdaftar di PPDB)":ceksyarat.asalsiswa}<hr>`;
        if(ceksyarat.koleksiwarning.length > 0){
            html +=`Sebelum melanjutkan ke Buku Induk, Anda harus memperbaiki data berikut:<br>`;
            let upref = ""
            for(let u = 0 ; u < ceksyarat.koleksiwarning.length ; u++ ){
                let key = ceksyarat.koleksiwarning[u];
                upref +=`${ceksyarat[key]} `;
                formulir += html_perbaikandatadulu(key, banyaktapel, infokenaikan, siswaasal, tapelawal, tapelakhir, semesterawal, semesterakhir, kelasawal, kelasakhir, tokensiswa);
                tempattombol_formulirkirim.innerHTML = `<div class="w3-small w3-center">Tabel di atas muncul karena sistem mendeteksi adanya perhitungan riwayat kenaikan kelas. Jika pendeteksian ini kurang tepat, perbaiki nomor Induk agar sesuai dengan perhitungan sistem.<br><button onclick="htmlbuatperbaikinomorinduk('${tokensiswa}')">Perbaiki Nomor Induk Siswa (NIS)</button></div>`;
            }
            menu = "PERBAIKI DATA TERLEBIH DAHULU ("+ upref +")";
        }else{
            // menu =`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button><br>`;
            if(ceksyarat.hasOwnProperty("datariwayattapel")){
                let cektapelsekarang = ceksyarat.datariwayattapel.filter(s => s.tapel == dbinduk_tapel_integer);
                if(cektapelsekarang.length == 0){
                    formulir +=`Ananda ${db.pd_nama} pernah tidak naik kelas. Kami melacak riwayat kenaikan kelas belum terupdate. Mohon segera update:<br>`;
                    formulir += html_perbaikandatadulu("isidulu_riwayattapel", banyaktapel, infokenaikan, siswaasal, tapelawal, tapelakhir, semesterawal, semesterakhir, kelasawal, kelasakhir, tokensiswa);
                    tempattombol_formulirkirim.innerHTML = `<div class="w3-small w3-center">Tabel di atas muncul karena sistem mendeteksi adanya perhitungan riwayat kenaikan kelas. Jika pendeteksian ini kurang tepat, perbaiki nomor Induk agar sesuai dengan perhitungan sistem.<br><button onclick="htmlbuatperbaikinomorinduk('${tokensiswa}')">Perbaiki Nomor Induk Siswa (NIS)</button></div>`;
                }else{
                    menu =`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button>`;
                    menu += html_tombolbukuinduk(tokensiswa);
                    menu +=`<button class="w3-pale-blue w3-bottombar w3-border-black tangan" onclick="riwayatkenaikankelas('${tokensiswa}')" style="padding:5px;font-size:10px;border-radius:10px">Lihat Riwayat Kelas</button>`;
                }
            }else{
                // menu +="Tidak punya properti tapel";
                menu =`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button>`;
                menu += html_tombolbukuinduk(tokensiswa);
                //menu +=`<button class="w3-pale-blue w3-bottombar w3-border-black tangan" onclick="riwayatkenaikankelas('${tokensiswa}')" style="padding:5px;font-size:10px;border-radius:10px">Lihat Riwayat Kelas</button>`;
                // menu += "Punya Atribute datariwayattapel";
            }
        }
        men_induk_info.innerHTML = html;
        menu_editinduk.innerHTML = menu;
        formulirkirim.innerHTML = formulir;
        if(ceksyarat.hasOwnProperty("datariwayattapel")){
            
            let inputkelas = document.querySelectorAll("[data-riwayat_tapel]");
            let datariwayattapel = ceksyarat.datariwayattapel;//datariwayattapel
            for(let i = 0 ; i < inputkelas.length; i++){
                let gettapel = inputkelas[i].getAttribute("data-riwayat_tapel")
                let dt = datariwayattapel.filter(s => s.tapel == gettapel);//tapel ="1920",
                console.log(gettapel, dt)
                if(dt.length > 0){
                    inputkelas[i].value = dt[0].kelas;
                    let ds = dt[0].semester;
                    for(let k = 0 ; k < ds.length ; k++){
                        let idradio = "cekbox_semester_"+gettapel+ds[k];
                        document.getElementById(idradio).checked = true
                    }
                }else{
                    inputkelas[i].value = "";
                }
            }
        }
    }else if(kondisi =="non-aktif"){
        html ="Anda harus memperbaiki data tentang siswa ini. Terutama apakah dia pindah, meninggal dunia, atau yang lainnya";
        menu = `<div class="w3-center" style="overflow-x:auto">NIS:`;
        menu +=`<input type="text" data-perbaikannonaktif="nis" value="${db.nis}" class="w3-input w3-border w3-center w3-border-black w3-round-large" style="width:400px;margin:5px auto">`;
        menu +=`Perbaiki Status Non-aktif:<br><select data-perbaikannonaktif="aktif" class="w3-select w3-border w3-border-green w3-round-large" onchange="perbaikannonaktif(this,${tokensiswa})" style="width:350px;margin:0 auto">`
        menu +=`<option value="non-aktif">Non-aktif</option>`;
        menu +=`<option value="pindah">Pindah (Mutasi Keluar)</option>`;
        menu +=`<option value="meninggal dunia">Meninggal Dunia</option>`;
        menu +=`<option value="aktif">Masih Aktif Di Sekolah ini</option>`;
        menu +=`</select></div><hr>`;
        
        men_induk_info.innerHTML = html;
        menu_editinduk.innerHTML = menu;

        
        
    }else if(kondisi =="pindah"){
        console.log(db.keluar_tgl2)
        if(db.keluar_tgl2 == ""){

            html = "Anda harus mengisi kemana siswa ini pindah Terutama Tanggal siswa ini pindah";
            formulir = `<div class="w3-center">Kelas Saat Meninggalkan Sekolah ini (Kelas yang ditinggalkan)<br>`;
            formulir +=`<input type="number" min="1" max="6" data-perbaikannonaktif="kelas_keluar" value="${db.kelas_keluar}" class="w3-input w3-border w3-border-black w3-round-large w3-center" style="width:100px;margin:0 auto"><br>`;
            formulir+=`Ke Kelas (Saat Pindah, siswa ini akan masuk sekolah baru di kelas ...)<br>`;
            formulir +=`<input type="number" min="1" max="6" data-perbaikannonaktif="kelas_pindah_ke_kelas" value="${db.kelas_pindah_ke_kelas}" class="w3-input w3-border w3-center w3-border-black w3-round-large" style="width:100px;margin:0 auto"><br>`;
            formulir+=`Nama Sekolah yang dituju Siswa ini:<br>`;
            formulir +=`<input type="text" data-perbaikannonaktif="pindah_ke" value="${db.pindah_ke}" class="w3-input w3-border w3-border-black w3-center w3-round-large"><br>`;
            formulir +=`Alasan Pindah:<br>`;
            formulir +=`<input type="text" data-perbaikannonaktif="alasan_keluar" value="${db.alasan_keluar}" class="w3-input w3-border-black w3-center w3-round-large w3-border"><br>`;
            formulir +=`Mulai Keluar Tanggal:<br>`;
            formulir +=`<input type="date" data-perbaikannonaktif="keluar_tgl2" value="${db.keluar_tgl2 == ""?"":StringTanggalnol(new Date(db.keluar_tgl2))}" class="w3-input w3-border w3-border-black w3-round-large w3-center" style="width:150px;margin:5px auto"><br><br>`;
            formulir += `<button class="w3-btn w3-pale-green w3-border w3-bottombar w3-border-black w3-round-xlarge" onclick="kirimperubahandatapindah(this, ${tokensiswa})">Simpan Data</button>`
            
            formulir +=`</div>`;
            men_induk_info.innerHTML = html;
            menu_editinduk.innerHTML = menu;
            formulirkirim.innerHTML = formulir;
        }else{
            html =`Ananda ${db.pd_nama} terdeteksi sebagai siswa ${ceksyarat.asalsiswa == "PPDB"?"Asal (terdaftar di PPDB)":ceksyarat.asalsiswa}<hr>`;
            if(ceksyarat.koleksiwarning.length > 0){
                html +=`Sebelum melanjutkan ke Buku Induk, Anda harus memperbaiki data berikut:<br>`;
                let upref = ""
                for(let u = 0 ; u < ceksyarat.koleksiwarning.length ; u++ ){
                    let key = ceksyarat.koleksiwarning[u];
                    upref +=`${ceksyarat[key]} `;
                    formulir += html_perbaikandatadulu(key, banyaktapel, infokenaikan, siswaasal, tapelawal, tapelakhir, semesterawal, semesterakhir, kelasawal, kelasakhir, tokensiswa);
                    tempattombol_formulirkirim.innerHTML = `<div class="w3-small w3-center">Tabel di atas muncul karena sistem mendeteksi adanya perhitungan riwayat kenaikan kelas. Jika pendeteksian ini kurang tepat, perbaiki nomor Induk agar sesuai dengan perhitungan sistem.<br><button onclick="htmlbuatperbaikinomorinduk('${tokensiswa}')">Perbaiki Nomor Induk Siswa (NIS)</button></div>`;
                }
                menu = "PERBAIKI DATA TERLEBIH DAHULU ("+ upref +")";
            }else{
                if(ceksyarat.hasOwnProperty("datariwayattapel")){
                    let cektapelsekarang = ceksyarat.datariwayattapel.filter(s => s.tapel == dbinduk_tapel_integer);
                    console.log(cektapelsekarang, dbinduk_tapel_integer);
                    if(cektapelsekarang.length == 0){
                        formulir +=`Ananda ${db.pd_nama} pernah tidak naik kelas. Kami melacak riwayat kenaikan kelas belum terupdate. Mohon segera update:<br>`;
                        formulir += html_perbaikandatadulu("isidulu_riwayattapel", banyaktapel, infokenaikan, siswaasal, tapelawal, tapelakhir, semesterawal, semesterakhir, kelasawal, kelasakhir, tokensiswa);
                        tempattombol_formulirkirim.innerHTML = `<div class="w3-small w3-center">Tabel di atas muncul karena sistem mendeteksi adanya perhitungan riwayat kenaikan kelas. Jika pendeteksian ini kurang tepat, perbaiki nomor Induk agar sesuai dengan perhitungan sistem.<br><button onclick="htmlbuatperbaikinomorinduk('${tokensiswa}')">Perbaiki Nomor Induk Siswa (NIS)</button></div>`;
                    }else{
                        menu =`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button>`;
                        menu += html_tombolbukuinduk(tokensiswa);
                        menu +=`<button class="w3-pale-blue w3-bottombar w3-border-black tangan" onclick="riwayatkenaikankelas('${tokensiswa}')" style="padding:5px;font-size:10px;border-radius:10px">Lihat Riwayat Kelas</button>`;
                    }
                }else{
                    menu =`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button>`;
                    menu += html_tombolbukuinduk(tokensiswa);
                }
            }
            men_induk_info.innerHTML = html;
            menu_editinduk.innerHTML = menu;
            formulirkirim.innerHTML = formulir;
            if(ceksyarat.hasOwnProperty("datariwayattapel")){
                
                let inputkelas = document.querySelectorAll("[data-riwayat_tapel]");
                let datariwayattapel = ceksyarat.datariwayattapel;//datariwayattapel
                for(let i = 0 ; i < inputkelas.length; i++){
                    let gettapel = inputkelas[i].getAttribute("data-riwayat_tapel")
                    let dt = datariwayattapel.filter(s => s.tapel == gettapel);//tapel ="1920",
                    console.log(gettapel, dt)
                    if(dt.length > 0){
                        inputkelas[i].value = dt[0].kelas;
                        let ds = dt[0].semester;
                        for(let k = 0 ; k < ds.length ; k++){
                            let idradio = "cekbox_semester_"+gettapel+ds[k];
                            document.getElementById(idradio).checked = true
                        }
                    }else{
                        inputkelas[i].value = "";
                    }
                }
            }
            formulirkirim.innerHTML +=`<hr><div class="w3-center"><button id="perbaikidatapindahanlagi">Perbaiki Data Pindahan</button></div>`;
            let tmbl = document.getElementById("perbaikidatapindahanlagi");
            tmbl.onclick = function(){
                formulir = `<div class="w3-center">Kelas Saat Meninggalkan Sekolah ini (Kelas yang ditinggalkan)<br>`;
                formulir +=`<input type="number" min="1" max="6" data-perbaikannonaktif="kelas_keluar" value="${db.kelas_keluar}" class="w3-input w3-border w3-border-black w3-round-large w3-center" style="width:100px;margin:0 auto"><br>`;
                formulir+=`Ke Kelas (Saat Pindah, siswa ini akan masuk sekolah baru di kelas ...)<br>`;
                formulir +=`<input type="number" min="1" max="6" data-perbaikannonaktif="kelas_pindah_ke_kelas" value="${db.kelas_pindah_ke_kelas}" class="w3-input w3-border w3-center w3-border-black w3-round-large" style="width:100px;margin:0 auto"><br>`;
                formulir+=`Nama Sekolah yang dituju Siswa ini:<br>`;
                formulir +=`<input type="text" data-perbaikannonaktif="pindah_ke" value="${db.pindah_ke}" class="w3-input w3-border w3-border-black w3-center w3-round-large"><br>`;
                formulir +=`Alasan Pindah:<br>`;
                formulir +=`<input type="text" data-perbaikannonaktif="alasan_keluar" value="${db.alasan_keluar}" class="w3-input w3-border-black w3-center w3-round-large w3-border"><br>`;
                formulir +=`Mulai Keluar Tanggal:<br>`;
                formulir +=`<input type="date" data-perbaikannonaktif="keluar_tgl2" value="${db.keluar_tgl2 == ""?"":StringTanggalnol(new Date(db.keluar_tgl2))}" class="w3-input w3-border w3-border-black w3-round-large w3-center" style="width:150px;margin:5px auto"><br><br>`;
                formulir += `<button class="w3-btn w3-pale-green w3-border w3-bottombar w3-border-black w3-round-xlarge" onclick="kirimperubahandatapindah(this, ${tokensiswa})">Simpan Data</button>`
                
                formulir +=`</div>`;
                men_induk_info.innerHTML = "";
                menu_editinduk.innerHTML = "";
                formulirkirim.innerHTML = formulir;
            }
        }
        
        
    }else if(kondisi =="pindahan"){
        html ="Anda harus mengisi dari mana siswa ini bersekolah sebelumnya, kapan siswa ini masuk di sekolah ini"
        html =`Ananda ${db.pd_nama} terdeteksi sebagai siswa ${ceksyarat.asalsiswa == "PPDB"?"Asal (terdaftar di PPDB)":ceksyarat.asalsiswa}<hr>`;
        if(ceksyarat.koleksiwarning.length > 0){
            html +=`Sebelum melanjutkan ke Buku Induk, Anda harus memperbaiki data berikut:<br>`;
            let upref = ""
            for(let u = 0 ; u < ceksyarat.koleksiwarning.length ; u++ ){
                let key = ceksyarat.koleksiwarning[u];
                upref +=`${ceksyarat[key]} `;
                formulir += html_perbaikandatadulu(key, banyaktapel, infokenaikan, siswaasal, tapelawal, tapelakhir, semesterawal, semesterakhir, kelasawal, kelasakhir, tokensiswa);
                tempattombol_formulirkirim.innerHTML = `<div class="w3-small w3-center">Tabel di atas muncul karena sistem mendeteksi adanya perhitungan riwayat kenaikan kelas. Jika pendeteksian ini kurang tepat, perbaiki nomor Induk agar sesuai dengan perhitungan sistem.<br><button onclick="htmlbuatperbaikinomorinduk('${tokensiswa}')">Perbaiki Nomor Induk Siswa (NIS)</button></div>`;
            }
            menu = "PERBAIKI DATA TERLEBIH DAHULU ("+ upref +")";
        }else{
            if(ceksyarat.hasOwnProperty("datariwayattapel")){
                let cektapelsekarang = ceksyarat.datariwayattapel.filter(s => s.tapel == dbinduk_tapel_integer);
                if(cektapelsekarang.length == 0){
                    formulir +=`Ananda ${db.pd_nama} pernah tidak naik kelas. Kami melacak riwayat kenaikan kelas belum terupdate. Mohon segera update:<br>`;
                    formulir += html_perbaikandatadulu("isidulu_riwayattapel", banyaktapel, infokenaikan, siswaasal, tapelawal, tapelakhir, semesterawal, semesterakhir, kelasawal, kelasakhir, tokensiswa);
                    tempattombol_formulirkirim.innerHTML = `<div class="w3-small w3-center">Tabel di atas muncul karena sistem mendeteksi adanya perhitungan riwayat kenaikan kelas. Jika pendeteksian ini kurang tepat, perbaiki nomor Induk agar sesuai dengan perhitungan sistem.<br><button onclick="htmlbuatperbaikinomorinduk('${tokensiswa}')">Perbaiki Nomor Induk Siswa (NIS)</button></div>`;
                }else{
                    menu =`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button>`;
                    menu += html_tombolbukuinduk(tokensiswa)
                    menu +=`<button class="w3-pale-blue w3-bottombar w3-border-black tangan" onclick="riwayatkenaikankelas('${tokensiswa}')" style="padding:5px;font-size:10px;border-radius:10px">Lihat Riwayat Kelas</button>`;
                }
            }else{
                // menu +="Tidak punya properti tapel";
                menu =`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button>`;
                menu += html_tombolbukuinduk(tokensiswa)
                
            }
        }
        men_induk_info.innerHTML = html;
        menu_editinduk.innerHTML = menu;
        formulirkirim.innerHTML = formulir;
        if(ceksyarat.hasOwnProperty("datariwayattapel")){
            
            let inputkelas = document.querySelectorAll("[data-riwayat_tapel]");
            let datariwayattapel = ceksyarat.datariwayattapel;//datariwayattapel
            for(let i = 0 ; i < inputkelas.length; i++){
                let gettapel = inputkelas[i].getAttribute("data-riwayat_tapel")
                let dt = datariwayattapel.filter(s => s.tapel == gettapel);//tapel ="1920",
                console.log(gettapel, dt)
                if(dt.length > 0){
                    inputkelas[i].value = dt[0].kelas;
                    let ds = dt[0].semester;
                    for(let k = 0 ; k < ds.length ; k++){
                        let idradio = "cekbox_semester_"+gettapel+ds[k];
                        document.getElementById(idradio).checked = true
                    }
                }else{
                    inputkelas[i].value = "";
                }
            }
        }
        men_induk_info.innerHTML = html;
        menu_editinduk.innerHTML = menu;
        
    }else if(kondisi =="lulus"){
        html =`Ananda ${db.pd_nama} terdeteksi sebagai siswa ${ceksyarat.asalsiswa == "PPDB"?"Asal (terdaftar di PPDB)":ceksyarat.asalsiswa}<hr>`;
        if(ceksyarat.koleksiwarning.length > 0){
            html +=`Sebelum melanjutkan ke Buku Induk, Anda harus memperbaiki data berikut:<br>`;
            let upref = ""
            for(let u = 0 ; u < ceksyarat.koleksiwarning.length ; u++ ){
                let key = ceksyarat.koleksiwarning[u];
                upref +=`${ceksyarat[key]}`;
                formulir += html_perbaikandatadulu(key, banyaktapel, infokenaikan, siswaasal, tapelawal, tapelakhir, semesterawal, semesterakhir, kelasawal, kelasakhir, tokensiswa);
                tempattombol_formulirkirim.innerHTML = `<div class="w3-small w3-center">Tabel di atas muncul karena sistem mendeteksi adanya perhitungan riwayat kenaikan kelas. Jika pendeteksian ini kurang tepat, perbaiki nomor Induk agar sesuai dengan perhitungan sistem.<br><button onclick="htmlbuatperbaikinomorinduk('${tokensiswa}')">Perbaiki Nomor Induk Siswa (NIS)</button></div>`;
            }
            menu = "PERBAIKI DATA TERLEBIH DAHULU ("+ upref +")";
        }else{
            // menu =`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button><br>`;
            if(ceksyarat.hasOwnProperty("datariwayattapel")){
                let cektapelsekarang = ceksyarat.datariwayattapel.filter(s => s.tapel == dbinduk_tapel_integer);
                if(cektapelsekarang.length == 0){
                    formulir +=`Ananda ${db.pd_nama} pernah tidak naik kelas. Kami melacak riwayat kenaikan kelas belum terupdate. Mohon segera update:<br>`;
                    formulir += html_perbaikandatadulu("isidulu_riwayattapel", banyaktapel, infokenaikan, siswaasal, tapelawal, tapelakhir, semesterawal, semesterakhir, kelasawal, kelasakhir, tokensiswa);
                    tempattombol_formulirkirim.innerHTML = `<div class="w3-small w3-center">Tabel di atas muncul karena sistem mendeteksi adanya perhitungan riwayat kenaikan kelas. Jika pendeteksian ini kurang tepat, perbaiki nomor Induk agar sesuai dengan perhitungan sistem.<br><button onclick="htmlbuatperbaikinomorinduk('${tokensiswa}')">Perbaiki Nomor Induk Siswa (NIS)</button></div>`;
                }else{
                    menu =`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button>`;
                    menu += html_tombolbukuinduk(tokensiswa);
                    menu +=`<button class="w3-pale-blue w3-bottombar w3-border-black tangan" onclick="riwayatkenaikankelas('${tokensiswa}')" style="padding:5px;font-size:10px;border-radius:10px">Lihat Riwayat Kelas</button>`;
                    // menu += "Punya Atribute datariwayattapel";
                }
    
            }else{
                // menu +="Tidak punya properti tapel";

                menu =`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button>`;
                menu += html_tombolbukuinduk(tokensiswa);
                //menu +=`<button class="w3-pale-blue w3-bottombar w3-border-black tangan" onclick="riwayatkenaikankelas('${tokensiswa}')" style="padding:5px;font-size:10px;border-radius:10px">Lihat Riwayat Kelas</button>`;
                // menu += "Punya Atribute datariwayattapel";
            
            }
    
        }
        men_induk_info.innerHTML =  html;
        menu_editinduk.innerHTML = menu;
        formulirkirim.innerHTML = formulir;
        
        if(ceksyarat.hasOwnProperty("datariwayattapel")){
            let inputkelas = document.querySelectorAll("[data-riwayat_tapel]");
            let datariwayattapel = ceksyarat.datariwayattapel;
            for(let i = 0 ; i < inputkelas.length; i++){
                let gettapel = inputkelas[i].getAttribute("data-riwayat_tapel")
                let dt = datariwayattapel.filter(s => s.tapel == gettapel);//tapel ="1920",
                if(dt.length > 0){
                    inputkelas[i].value = dt[0].kelas;
                    let ds = dt.semester;
                    for(let k = 0 ; k < ds.length ; k++){
                        let idradio = "cekbox_semester_"+gettapel+ds[k];
                        document.getElementById(idradio).checked = true
                    }
                }else{
                    inputkelas[i].value = "";
                }
            }
        }
        
        
    }else if(kondisi =="nis-ganda"){
        html ="Anda harus memperbaiki data tentang NIS GANDA yang dimiliki siswa ini";
        men_induk_info.innerHTML = html;
        menu_editinduk.innerHTML = menu;
        htmlbuatperbaikinomorinduk(tokensiswa);
    }else if(kondisi =="nis-aneh"||kondisi =="nis-salah"||kondisi =="nis-kosong"){ 
        html ="Anda harus memperbaiki data tentang NIS Salah atau kosong yang dimiliki siswa ini";
        men_induk_info.innerHTML = html;
        menu_editinduk.innerHTML = menu;
        htmlbuatperbaikinomorinduk(tokensiswa);
    }else{
        html ="kondisi tidak dikenal, yaitu " + kondisi;
        men_induk_info.innerHTML = html;
        menu_editinduk.innerHTML = menu;
        
    }
}
const html_tombolbukuinduk = (tokensiswa)=>{
    let ceksyarat = syarat_riwayatkelas(tokensiswa);
    console.log(ceksyarat)
    let db = db_utama_siswa.filter(s => s.id == tokensiswa)[0];
    let siswajenjansaatini = dbutamasiswa(tokensiswa).jenjangsaatini
    let banyaktapel = ceksyarat.banyaktapel;
    let infokenaikan = ceksyarat.kenaikankelas;
    let siswaasal = ceksyarat.asalsiswa;
    let tapelawal = ceksyarat.tapelawal;
    let tapelakhir = ceksyarat.tapelakhir;
    let semesterawal = ceksyarat.semesterawal;
    let semesterakhir = ceksyarat.semesterakhir;
    let kelasawal = ceksyarat.kelasawal;
    let kelasakhir = ceksyarat.kelasakhir;
    let html = ``;
    let tapeljalan = tapelawal;
    let tekstapel = string_tapel_darinis(tapelawal)
    if(infokenaikan == "Selalu Naik Kelas"){
        for(let i = kelasawal ; i <= kelasakhir ; i++){
            tapeljalan = tapelawal + (101 * (i-kelasawal));
            tekstapel = string_tapel_darinis(tapeljalan);

            if(i == kelasawal){
                for(let j = 0; j < semesterawal.length ; j++){
                    let teks_semester = semesterawal[j];
                    html +=`<button title="Tahun Pelajaran ${tekstapel}" onclick="showdserverinduk('${tapeljalan}',${tokensiswa},'${teks_semester}',${i})" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">
                    Kelas ${i} Semester ${teks_semester}</button>`;
                }
                
            }else if(i == kelasakhir){
                for(let j = 0; j < semesterawal.length ; j++){
                    let teks_semester = semesterawal[j];
                    html +=`<button title="Tahun Pelajaran ${tekstapel}" onclick="showdserverinduk('${tapeljalan}',${tokensiswa},'${teks_semester}',${i})" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">
                    Kelas ${i} Semester ${teks_semester}</button>`;
                }
            }else{
                html +=`<button title="Tahun Pelajaran ${tekstapel}" onclick="showdserverinduk('${tapeljalan}',${tokensiswa},'1',${i})" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${i} Semester 1</button>`;
                html +=`<button title="Tahun Pelajaran ${tekstapel}" onclick="showdserverinduk('${tapeljalan}',${tokensiswa},'2',${i})" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${i} Semester 2</button>`;
            }
            
            
        }
    }else{
        if(ceksyarat.hasOwnProperty("datariwayattapel")){
            let datariwayattapel = ceksyarat.datariwayattapel
            for(let k = 0 ; k < datariwayattapel.length ; k++){
                let kelasjalan = datariwayattapel[k].kelas;
                tapeljalan = datariwayattapel[k].tapel;
                tekstapel = string_tapel_darinis(tapeljalan);
                let sms = datariwayattapel[k].semester;
                for(let l = 0 ; l < sms.length ; l++){
                    let teks_semester = sms[l];
                    html +=`<button title="Tahun Pelajaran ${tekstapel}" onclick="showdserverinduk('${tapeljalan}',${tokensiswa},'${teks_semester}',${kelasjalan})" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${i} Semester ${teks_semester}</button>`;
                }
            }
            //html+=`<button class="w3-pale-blue w3-bottombar w3-border-black tangan" onclick="riwayatkenaikankelas('${tokensiswa}')" style="padding:5px;font-size:10px;border-radius:10px">Lihat Riwayat Kelas</button>`
        }else{
            html +=html_perbaikandatadulu("isidulu_riwayattapel", banyaktapel, infokenaikan, siswaasal, tapelawal, tapelakhir, semesterawal, semesterakhir, kelasawal, kelasakhir, tokensiswa);
        }
    }
    if((siswajenjansaatini == 6 || siswajenjansaatini == 7)&& semesterakhir.indexOf(2)>-1){
        html +=`<button onclick="html_datanilaiijazah('${tokensiswa}')" class="w3-pale-red tangan w3-bottombar w3-border w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Nilai Ijazah</button>`
    }
    return html
}
const syarat_riwayatkelas = (tokensiswa) =>{
    let result = {};
    let db = db_utama_siswa.filter(s => s.id == tokensiswa)[0];
    let dbinduk = dbsiswa_bukuinduk.filter(s => s.id == tokensiswa)[0];
    let nis = db.nis
    let nis4 = nis.substring(0,4);// 1920, 2021, 2122 --> string
    let nis2 = nis.substring(0,2);// 1617 ==> 16 -->string
    let nis_tapel = string_tapel_darinis(nis); // 2020/2021, 2022/2023, dst.... ---> string
    let kelasnis = nis.substring(4,6);// "01" --> string
    
    let tapelakhir = 0, tapelawal, kelasakhir, kelasawal, duatapelakhir= 0, duatapelawal ;// integer
    duatapelawal = parseInt(nis2);
    // tapelakhir / tapelawal = 1920 (int), 
    // duatapelakhir / duatapelawal = 1920 ==> 19 (int)
    kelasawal = parseInt(kelasnis); ;// 1,2,3,4,5,6, dan termasuk pindahan);
    tapelawal = parseInt(nis4);// 1920, 2021, 2122 --> integer;
    let asalsiswa, koleksiwarning = [], kenaikankelas, jumlahtinggalkelas = 0, semesterawal, isidulu_masuk_tgl = "", isidulu_keluar_tgl = "",isidulu_keluar_tgl2 = "";
    let semesterakhir
    if(db.aktif == "aktif"){
        tapelakhir = type_tapel_daritapel(idTeksTapel).integer;
        duatapelakhir = type_tapel_daritapel(idTeksTapel).duatapel;
        kelasakhir = dbutamasiswa(tokensiswa).jenjangsaatini;
        semesterakhir = idSemester == 2?[1,2]:[1];
    }else{ 
        if(db.aktif == "lulus"){
            kelasakhir = 6;
            if(db.keluar_tgl == ""){
                isidulu_keluar_tgl = "Isikan Tanggal Kelulusan";
                koleksiwarning.push("isidulu_keluar_tgl");
                tapelakhir = tapelawal + (101 * 5); //1617
                duatapelakhir = parseInt(tapelakhir.toString().substring(0,2))
            }else{
                //isidulu_keluar_tgl = "Isikan Tanggal Keluar";
                //koleksiwarning.push("isidulu_keluar_tgl");
                let tapelsaatkeluar = string_tapel_daritanggal(db.keluar_tgl);
                
                tapelakhir = type_tapel_daritapel(tapelsaatkeluar).integer;
                duatapelakhir = type_tapel_daritapel(tapelsaatkeluar).duatapel;
            }
            semesterakhir = [1,2]
        }else{ //pindah, 
            kelasakhir = dbutamasiswa(tokensiswa).jenjangsaatini;
            if(db.keluar_tgl2 == ""){
                isidulu_keluar_tgl2 = "Isikan Tanggal Keluar Sekolah (non aktif)";
                koleksiwarning.push("isidulu_keluar_tgl2");

                tapelakhir = tapelawal + (101 * (kelasakhir -1)); //1617
                duatapelakhir = parseInt(tapelakhir.toString().substring(0,2))
                semesterakhir = [1,2];
            }else{
                //isidulu_keluar_tgl = "Isikan Tanggal Keluar";
                //koleksiwarning.push("isidulu_keluar_tgl");
                let tapelsaatkeluar = string_tapel_daritanggal(db.keluar_tgl2);
                console.log("tapelsaatkeluarpindah",tapelsaatkeluar);
                tapelakhir = type_tapel_daritapel(tapelsaatkeluar).integer;
                duatapelakhir = type_tapel_daritapel(tapelsaatkeluar).duatapel;
                semesterakhir = koleksisemesterakhir(db.keluar_tgl2)
            }
        }
    }
    // console.log(kelasawal, kelasakhir, nis_tapel, tapelakhir,duatapelakhir,duatapelawal,(duatapelakhir - duatapelawal))
    // rujukan PPDB apa pindahan;
    let isidulu_riwayattapel = "";
    if(kelasnis == "01"){
        
        if(db.masuk_tgl !==""){
            asalsiswa = "Pindahan";
            semesterawal = koleksisemesterawal(db.masuk_tgl);
        }else{
            asalsiswa = "PPDB";
            semesterawal = [1,2];
        }
    }else{
        asalsiswa = "Pindahan";
        if(db.masuk_tgl ==""){
            isidulu_masuk_tgl = "Lengkapi Tanggal Masuk";
            koleksiwarning.push("isidulu_masuk_tgl");
            semesterawal = [];
        }else{
            semesterawal = koleksisemesterawal(db.masuk_tgl);
        }
    }
    let rentangtapel = duatapelakhir - duatapelawal;
    let rentangkelas = kelasakhir - kelasawal;
    
    if(rentangtapel == rentangkelas){
        kenaikankelas = "Selalu Naik Kelas";
    }else {
        jumlahtinggalkelas = rentangtapel - rentangkelas;
        kenaikankelas = `Pernah ${jumlahtinggalkelas} kali tinggal kelas;`;
        if(db.riwayat_tapel == ""){
            isidulu_riwayattapel ="Lengkapi Data Tinggal Kelas";
            koleksiwarning.push("isidulu_riwayattapel");
        }else{
            isidulu_riwayattapel = "";
            result.datariwayattapel = JSON.parse(db.riwayat_tapel);
        }

    }
    result.kelasawal = parseInt(kelasawal);
    result.kelasakhir = parseInt(kelasakhir);
    result.duatapelakhir = duatapelakhir;
    result.duatapelawal = duatapelawal;
    result.tapelakhir = tapelakhir;// idtekstapel atau tapel saat lulus/keluar --> 1920
    result.tapelawal = tapelawal; // tapel yang diambil dari nis --> 1617
    result.semesterawal = semesterawal ;// semester awal masuk, jika pindahan di semester 2, maka --> [2], kalo di semester 1 --> [1,2] untuk keperluan tmbol menu
    result.semesterakhir = semesterakhir ;// semester awal masuk, jika pindahan di semester 2, maka --> [2], kalo di semester 1 --> [1,2] untuk tombol menu;
    result.rentangtapel = rentangtapel;
    result.rentangkelas = rentangkelas;
    result.koleksiwarning = koleksiwarning; // jika ada yang harus diisi dulu, kasih tau. Berupa array. Arraynya perkunci [isidulu_masuk_tgl, isidulu_riwayattapel]
    result.isidulu_masuk_tgl = isidulu_masuk_tgl;
    result.isidulu_keluar_tgl = isidulu_keluar_tgl; // untuk siswa lulus
    result.isidulu_keluar_tgl2 = isidulu_keluar_tgl2; // untuk siswa pindah
    result.isidulu_riwayattapel = isidulu_riwayattapel;
    result.banyaktapel = (rentangtapel + 1); // banyak tapel yang harus dibuka: --> untuk yang tidak naik kelas, diambil dari db.riwayat_tapel
    //result.asalbanyaktapel = rentangtapel +", "+ jumlahtinggalkelas +", 1"; // banyak tapel yang harus dibuka: --> untuk yang tidak naik kelas, diambil dari db.riwayat_tapel

    result.kenaikankelas = kenaikankelas;
    result.asalsiswa = asalsiswa;
    return result
}
const html_perbaikandatadulu = (kondisi, banyaktapel, infokenaikan, siswaasal, tapelawal, tapelakhir, semesterawal, semesterakhir, kelasawal, kelasakhir, tokensiswa) => {
    let html = "";
    let db = db_utama_siswa.filter(s => s.id == tokensiswa)[0]
    if(kondisi == "isidulu_masuk_tgl"){
        let infosekolahasal = db.dapo_sekolahasal ==""?"Masukkan sekolah asal pindahan":"Terdeteksi asal: "+db.dapo_sekolahasal;
        html +=`<div class="w3-border w3-padding w3-round-large w3-center">`;
        html +=`<label for="isiduludatapindahan_sekolahasal">Nama Sekolah Asal:
        <input id="isiduludatapindahan_sekolahasal" data-isiduludatapindahan="masuk_dari" type="text" class="w3-input w3-border w3-border-green w3-border" placeholder="${infosekolahasal}"></label><br>`;
        html +=`<label for="isiduludatapindahan_masuktgl">Tanggal Masuk Sekolah ini:<br><input id="isiduludatapindahan_masuktgl" data-isiduludatapindahan="masuk_tgl" type="date" class="w3-input w3-center w3-border w3-border-green" style="width:350px;margin:5px auto"></label><br><br>`;
        html +=`<button onclick="kirimdataanakpindahan('${tokensiswa}')" class="w3-yellow w3-bottombar w3-border w3-border-black w3-btn w3-round-xxlarge">SIMPAN DATA</button>`;
        html +=`</div>`;

    }else if(kondisi == "isidulu_riwayattapel"){
        html +=`<div class="w3-border w3-padding w3-round-large w3-center">`;
        html +=infokenaikan;
        html += `<table class="w3-table garis w3-tiny" style="width:350px;margin:15px auto"><thead><tr class="w3-light-grey"><th>Tahun Pelajaran</th><th>Kelas<br><button onclick="editinputriwayat(this)">Edit</button></th><th>Semester</th></tr></thead><tbody>`;
        let tapeljalan = ""
        for(let i = 0 ; i < banyaktapel ; i ++){
            tapeljalan = tapelawal +(101 * i)
            let tekstapel = string_tapel_darinis(tapeljalan);
            let v;
            if(i == 0){
                v = kelasawal;
            }else if( i == (banyaktapel -1)){
                v = kelasakhir;
            }else{
                v = "";
            }
            html +=`<tr><td class="w3-center">${tekstapel}</td><td><input value="${v}" disabled type="number" min="1" max="6" class="w3-input w3-border w3-center" data-riwayat_tapel="${tapeljalan}"></td><td>`;
            html +=`<label for="cekbox_semester_${tapeljalan}1"><input type="checkbox" disabled name="cekbox_semester_${tapeljalan}" class="disablecheckbox" id="cekbox_semester_${tapeljalan}1" value="1">1</label><br>`;
            html +=`<label for="cekbox_semester_${tapeljalan}2"><input type="checkbox" disabled name="cekbox_semester_${tapeljalan}" class="disablecheckbox" id="cekbox_semester_${tapeljalan}2" value="2">2</label>`;;
            html +=`</td></tr>`;
        }
        html +=`</tbody></table>`;
        html +=`<button class="tangan sementarasimpanriwayat w3-hide" onclick="simpanserverinduk(this,'single','${tokensiswa}')">Update Riwayat</button>`;
        let stt = db_utama_siswa.filter(s => s.id == tokensiswa)[0].aktif;
        html +=`<button class="tangan" onclick="PerbaruidataInduk('${stt}','${tokensiswa}')">Kembali</button>`;
            
    }else if(kondisi == "isidulu_keluar_tgl"){
        
    }else if(kondisi == "isidulu_keluar_tgl2"){
        
    }
    return html
}
const string_tapel_darinis = (nis) =>{
    let teks = "20"+nis.toString().substring(0,2)+"/20"+nis.toString().substring(2,4);
    return teks
}
const string_tapel_daritanggal = (tgl) =>{
    let d = new Date(tgl);
    let m = d.getMonth();
    let y = d.getFullYear();
    let x = ""
    if(m < 6){
        x = (y-1)+"/"+y
    }else{
        x = y +"/" + (y+1)
    }
    
    return x
}
const type_tapel_daritapel = (tapel) => {
    // tapel = 2021/2022 --> 2122
    let teks = tapel.toString().substring(2,4)+tapel.toString().substring(7,9);// 2021/2022 ==> 2122 --> string
    let integer_tapel = parseInt(teks);// 2122 --> number
    let duatapel = parseInt(teks.substring(0,2)); // 2 awal dari Tapel 2021/2022 => 21
    let ob = {};
    ob.sting = teks;
    ob.integer = integer_tapel;
    ob.duatapel = duatapel;
    return ob
}
const koleksisemesterawal = (tglmasuk)=>{
    let d = new Date(tglmasuk);
    let s, m = d.getMonth();
    if(m < 6){
        s = [2]
    }else{
        s = [1,2]
    }
    return s
}
const koleksisemesterakhir = (tglmasuk)=>{
    let d = new Date(tglmasuk);
    let s, m = d.getMonth();
    if(m < 6){
        s = [1,2]
    }else{
        s = [1]
    }
    return s
}

const diterimadisemester = (tglmasuk)=>{
    let d = new Date(tglmasuk);
    let s, m = d.getMonth();
    if(m < 6){
        s = 2
    }else{
        s =1
    }
    return s
}
const perbaikannonaktif = (ele,tokensiswa)=>{
    let el = document.querySelector("[data-perbaikannonaktif=aktif]");
    let db = db_utama_siswa.filter(s => s.id == tokensiswa)[0]
    let val = ele.options[ele.options.selectedIndex].value;
    let html =""
    if(val == "pindah"){
        html = `<div class="w3-center">Kelas Saat Meninggalkan Sekolah ini (Kelas yang ditinggalkan)<br>`;
        html +=`<input type="number" min="1" max="6" data-perbaikannonaktif="kelas_keluar" value="${db.kelas_keluar}" class="w3-input w3-center w3-border w3-border-black w3-round-large" style="width:100px;margin:0 auto"><br>`;
        html+=`Ke Kelas (Saat Pindah, siswa ini akan masuk sekolah baru di kelas ...)<br>`;
        html +=`<input type="number" min="1" max="6" data-perbaikannonaktif="kelas_pindah_ke_kelas" value="${db.kelas_pindah_ke_kelas}" class="w3-input w3-center  w3-border w3-border-black w3-round-large" style="width:100px;margin:0 auto"><br>`;
        html+=`Nama Sekolah yang dituju Siswa ini:<br>`;
        html +=`<input type="text" data-perbaikannonaktif="pindah_ke" value="${db.pindah_ke}" class="w3-input w3-border w3-border-black w3-center w3-round-large"><br>`;
        html +=`Alasan Pindah:<br>`;
        html +=`<input type="text" data-perbaikannonaktif="alasan_keluar" value="${db.alasan_keluar}" class="w3-input w3-border-black w3-round-large w3-center w3-border"><br>`;
        html +=`Mulai Keluar Tanggal:<br>`;
        html +=`<input type="date" data-perbaikannonaktif="keluar_tgl2" value="${db.keluar_tgl2 == ""?"":StringTanggalnol(new Date(db.keluar_tgl2))}" class="w3-input w3-border w3-center w3-border-black w3-round-large w3-center" style="width:150px;margin:5px auto"><br><br>`;
        html += `<button class="w3-btn w3-pale-green w3-border w3-bottombar w3-border-black w3-round-xlarge" onclick="kirimperubahandatapindah(this, ${tokensiswa})">Simpan Data</button>`
        
        html +=`</div>`;
    }else if (val == "non-aktif"){
        alert("Anda sebaiknya tidak memilih status Non-aktif. Telusuri riwayat data peserta didik ini.")

    }else if(val == "meninggal dunia"){
        html = `<div class="w3-center">`;
        html+=`Alasan Pindah:<br>`;
        html +=`<input type="text" data-perbaikannonaktif="alasan_keluar" value="meninggal dunia" disabled class="w3-input w3-border w3-border-black w3-round-large"><br>`;
        html+=`Tanggal:<br>`;
        html +=`<input type="date" data-perbaikannonaktif="keluar_tgl2" value="${db.keluar_tgl2 == ""?"":StringTanggalnol(new Date(db.keluar_tgl2))}" class="w3-input w3-border-black w3-round-large w3-center" style="width:150px;margin:0 auto"><br><br>`;
        html += `<button class="w3-btn w3-pale-green w3-border w3-bottombar w3-border-black w3-round-xlarge" onclick="kirimperubahandatapindah(this, ${tokensiswa})">Simpan Data</button>`
        html +=`</div>`;
    }else{
        html += `<button class="w3-btn w3-pale-green w3-border w3-bottombar w3-border-black w3-round-xlarge" onclick="kirimperubahandatapindah(this, ${tokensiswa})">Simpan Data</button>`
    }
    formulirkirim.innerHTML = html;
}
const kirimperubahandatapindah = async(el, tokensiswa)=>{
    
    let acuaninner = document.getElementById("ngapainsihlu").innerHTML;
    let splitawal = acuaninner.split("_")[0];
    let acuanupdatekodeinduk = acuaninner.split("_")[1]

    let dbb = db_utama_siswa.filter(s => s.id == tokensiswa)[0];
    let db = Object.assign({},dbb)
    let elemen = document.querySelectorAll("[data-perbaikannonaktif]");
    let objekbaru = {}
    for(let i = 0 ; i < elemen.length ; i++){
        let k = elemen[i].getAttribute("data-perbaikannonaktif");
        let v = elemen[i].value;
        objekbaru[k] = v
    }
    let objekkirim = Object.assign(db,objekbaru);
    
    let datakirim = new FormData();

    datakirim.append("action","updatedatabaseIndukUtama");
    datakirim.append("idsreadsheet",ss_induk);
    let keys = Object.keys(objekkirim);
    for(let x = 0 ; x < keys.length ; x++){
        datakirim.append(keys[x], objekkirim[keys[x]])
    }
    // for (var pair of datakirim.entries()) {
    //         console.log(pair[0]+ ', ' + pair[1]); 
    //     }
    menu_editinduk.innerHTML = `<div class="w3-center"><img src="/img/barloading.gif"></div>`;
    formulirkirim.innerHTML = `<div class="w3-center"><img src="/img/barloading.gif"></div>`;
    await fetch(linkdatabaseinduk,{method:"post",body:datakirim})
    .then(m => m.json())
    .then(r =>{
        
        dbsiswa_bukuinduk = r.all
        el.innerHTML = `<i class="fa fa-spin fa-spinner"></i> server utama berhasil terikirim, sedang memproses server induk`;
        html_utamabukuinduk(r);
        if(splitawal == "koleksi"){
            aksieditinduk('daftarisiinduk', acuanupdatekodeinduk);
        }else{
           // document.getElementById('modal_editnomorinduk').style.display='none'
           aksieditinduk(acuanupdatekodeinduk,'');
        }
    }).catch(er => {
        console.log(er)
        el.innerHTML = `<i class="fa fa-spin fa-spinner"></i> server utama gagal, sedang memproses server induk`;

    });
    let datakirim2 = new FormData();

    datakirim2.append("action","updatedatabaseIndukUtama");
    datakirim2.append("idsreadsheet",jlo.ss_datauser);
    let keys2 = Object.keys(objekkirim);
    for(let x = 0 ; x < keys2.length ; x++){
        datakirim2.append(keys2[x], objekkirim[keys2[x]])
    }
    await fetch(linkdatabaseinduk,{method:"post",body:datakirim2})
    .then(m => m.json())
    .then(r =>{
        
        db_utama_siswa = r.all;
        el.innerHTML = `<i class="fa fa-spin fa-spinner"></i> server induk berhasil`;
        modaledit_bukuinduk.style.display="none";
        alert("Semua data telah berhasil diupdate.")
        
        

        
    }).catch(er => {
        console.log(er)
        el.innerHTML = `<i class="fa fa-spin fa-spinner"></i> server induk gagal`;

    })

}
const showdserverinduk =(kondisi, angka, sms = 1, kelas=1) =>{
    if(kondisi == "identitas"){
        //alert("memanggil db all di token siswa " + angka);
        page_bukuinduk_identitas(angka)
    }else{
        page_bukuinduk_nilairaport(kondisi, sms, angka,kelas)
    }
    document.getElementById('modal_editnomorinduk').scrollTo({ top: document.querySelector('.formulirkirim').offsetTop-43, behavior: 'smooth' })
}
const page_bukuinduk_nilairaport = async (kodetapel, sms,token, kelas)=>{
    let db = dbsiswa_bukuinduk.filter(s => s.id == token)[0];
    let datakurikulumserver = db.data_kurikulum;
    let datakurikulumsiswa = datakurikulumserver == ""? arrayobjek_datakurikuluminduksiswa(token):JSON.parse(datakurikulumserver);
    
    let ceksyarat = syarat_riwayatkelas(token);
    let tapelinduk = ceksyarat.tapelawal;
    let kodedisablesms1 ="";kodedisablesms2 ="";
    let tdcolorsms1 = "", tdcolorsms2 = "";//#616161 -->dark-grey
    if(ceksyarat.tapelawal == kodetapel){
        let csms1 = ceksyarat.semesterawal.indexOf(1)
        let csms2 = ceksyarat.semesterawal.indexOf(2)
        tdcolorsms1 = csms1 == -1?";#f1f1f1":"";
        kodedisablesms1 = csms1 == -1?" disabled":"";
        tdcolorsms2 = csms2 == -1?";#f1f1f1":"";
        kodedisablesms2 = csms2 == -1?" disabled":"";
    }else if(ceksyarat.tapelakhir == kodetapel){
        let csms1 = ceksyarat.semesterakhir.indexOf(1)
        let csms2 = ceksyarat.semesterakhir.indexOf(2)
        tdcolorsms1 = csms1 == -1?";#f1f1f1":"";
        kodedisablesms1 = csms1 == -1?" disabled":"";
        tdcolorsms2 = csms2 == -1?";#f1f1f1":"";
        kodedisablesms2 = csms2 == -1?" disabled":"";
    }
    
    let cekkurikulum = datakurikulumsiswa.filter(s => s.tapel == kodetapel)[0];
    //console.log(cekkurikulum, datakurikulumserver, datakurikulumsiswa,kodetapel);
    let namakurikulum = cekkurikulum.namakurikulum;
    let kurikulum = cekkurikulum.kurikulum
    let tekstapel = cekkurikulum.tekstapel;

    let html = `<div class="w3-hide-small w3-text-blue w3-tiny w3-center">Kurikulum saat Ananda ${db.pd_nama} di Kelas ${kelas} (Tahun Pelajaran ${tekstapel}) ini berlaku ${namakurikulum} (Kurikulum berdasarkan pendeteksian sistem atau pengaturan Anda sendiri)<br><sub>Informasi ini tidak akan tercetak di Mesin Printer.</sub></div>`;
    if(kurikulum == "06"){
        html +=`<h4 style="text-align:center">HASIL BELAJAR SISWA</h4><br>`;
        html +=`<table style="width:99%;margin:2px auto;font-size:10px !important;">`;
        html +=`<tr><td style="width:72px;padding:2px 5px">Nama Siswa</td><td style="width:1px;padding:2px 5px">:</td>`;
        html +=`<td style="border-bottom:.5pt dotted black;padding:2px 5px">${db.pd_nama.toUpperCase()}</td>`
        html +=`<td style="width:115px;padding:2px 5px">Nomor Induk Siswa</td><td style="width:1px;padding:2px 5px">:</td>`;
        html +=`<td style="border-bottom:.5pt dotted black;padding:2px 5px">${db.nis}</td>`;
        html +=`<td style="width:72px;padding:2px 5px">NISN</td><td style="width:1px;padding:2px 5px">:</td>`;
        html +=`<td style="border-bottom:.5pt dotted black;padding:2px 5px">${db.nisn}</td>`;
        html +=`</tr>`
        html +=`<tr><td style="padding:2px 5px">Kelas</td><td style="width:1px;padding:2px 5px">:</td>`;
        html +=`<td style="border-bottom:.5pt dotted black;padding:2px 5px">${kelas}</td>`
        html +=`<td style="padding:2px 5px">Tahun Pelajaran</td><td style="width:1px;padding:2px 5px">:</td>`;
        html +=`<td style="border-bottom:.5pt dotted black;padding:2px 5px">${tekstapel}</td>`;
        html +=`<td style="padding:2px 5px">Kurikulum</td><td style="width:1px;padding:2px 5px">:</td>`;
        html +=`<td style="border-bottom:.5pt dotted black;padding:2px 5px">${namakurikulum}</td>`;
        html +=`</tr>`
        html +=`</table><br>`;
        html +=`<table style="width:99.98%;margin:0 auto;font-size:10px !important;border-collapse:collapse;border-padding:0">`;
        // html +=`<tr><td rowspan="2" style="padding:2px 5px;vertical-align:top;width:5px"><b>A.</b></td><td colspan="15" style="padding:2px 5px"><b>SIKAP</b></td></tr>`;
        // html +=`<tr><td colspan="15" style="padding:2px 5px">`
        // // startTEMPAT SIKAP DAN SPIRITUAL`
        // html +=`<table style="width:100%;border-collapse:collapse;border-padding:0;font-size:10px" border="1">`;
        // html +=`<tr style="background-color:#f1f1f1"><th style="width:13%;padding:2px 5px;text-align:center;vertical-align:middle" rowspan="2">Aspek</th><th style="text-align:center" colspan="2">SEMESTER 1 (GANJIL)</th><th style="text-align:center" colspan="2">SEMESTER 2 (GENAP)</th></tr>`;
        // html +=`<tr style="background-color:#f1f1f1"><th style="text-align:center;padding:2px 5px">Predikat</th><th style="width:39%;text-align:center">Deskripsi</th><th style="text-align:center;padding:2px 5px">Predikat</th><th style="width:39%;text-align:center">Deskripsi</th><tr>`;
        // html += `<tr><td style="padding:2px 5px;vertical-align:top">1. Sikap Spiritual</td><td style="padding:2px 5px;vertical-align:top"><input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_KI1_NILAI" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px" placeholder="Masukkan nilai"></td><td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_06_${kelas}_1_KI1_DESKRIPSI" style="border: none transparent;outline: none;width:100%;height:100%;font-size:10px;" placeholder="Masukkan Deskripsi"></textarea></td><td style="padding:2px 5px;vertical-align:top"><input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_KI1_NILAI" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px" placeholder="Masukkan nilai"></td><td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_06_${kelas}_2_KI1_DESKRIPSI" style="border: none transparent;outline: none;width:100%;height:100%;font-size:10px;" placeholder="Masukkan Deskripsi"></textarea></td></tr>`;
        // html += `<tr><td style="padding:2px 5px;vertical-align:top">2. Sikap Sosial</td><td style="padding:2px 5px;vertical-align:top"><input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_KI2_NILAI" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px" placeholder="Masukkan nilai"></td><td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_06_${kelas}_1_KI2_DESKRIPSI" style="border: none transparent;outline: none;width:100%;height:100%;font-size:10px;" placeholder="Masukkan nilai"></textarea></td><td style="padding:2px 5px;vertical-align:top"><input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_KI2_NILAI" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px" placeholder="Masukkan nilai"></td><td style="padding:2px 5px;vertical-align:top"><textarea data-nilairaportinduk="${kodetapel}_06_${kelas}_2_KI2_DESKRIPSI" style="border: none transparent;outline: none;width:100%;height:100%;font-size:10px;" placeholder="Masukkan nilai"></textarea></td></tr>`;
        // html +=`</table>`
        // // end TEMPAT SIKAP DAN SPIRITUAL`
        // html+=`</td></tr>`
        html +=`<tr><td style="padding:2px 5px;vertical-align:top;width:5px"><b>A.</b></td><td colspan="15" style="padding:2px 5px"><b>PRESTASI BELAJAR SISWA</b></td></tr>`;
        html +=`<tr><td colspan="16" style="padding:2px 5px;">`;
        //start PENGATHUAN DAN KETERAMPILAN
        html +=`<table id="tabelraport06" style="width:100%;border-collapse:collapse;border-padding:0;font-size:10px" border="1">`;
        html +=`<thead><tr style="background-color:#f1f1f1;text-align:center">
        <th rowspan="3" style="padding:2px 5px"><b>No.</b></th>
        <th style="padding:2px 5px" rowspan="3"><b>Mata Pelajaran</b></th>
        <th colspan="4">Semester 1 (Ganjil)</th>
        <th colspan="4">Semester 2 (Genap)</th>
        </tr>`;
        html +=`<tr style="background-color:#f1f1f1;">
        <th rowspan="2">KKM</th>
        <th colspan="2">Nilai</th>
        <th rowspan="2">Rerata Kelas</th>
        <th rowspan="2">KKM</th>
        <th colspan="2">Nilai</th>
        <th rowspan="2">Rerata Kelas</th>
        </tr>`;
        html +=`<tr style="background-color:#f1f1f1;">
        <th>Angka</th><th style="width:145px">Huruf</th><th>Angka</th><th style="width:145px">Huruf</th></tr>`
        html+=`</thead><tbody>`;
        html +=`<tr style="background-color:#f1f1f1;"><td style="padding:2px 5px">A.</td><td style="padding:2px 5px;" colspan="15">MUATAN NASIONAL</td></tr>`;
        //pendidikan agama
        html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;">1.</td><td style="padding:2px 5px;vertical-align:top">Pendidikan Agama dan Budi Pekerti</td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_AGAMA_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_AGAMA_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_AGAMA_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;

        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_AGAMA_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_AGAMA_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_AGAMA_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`</tr>`;
        //pkn
        html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;">2.</td><td style="padding:2px 5px;vertical-align:top">Pendidikan Kewarganegaraan</td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_PKN_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_PKN_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_PKN_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_PKN_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_PKN_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_PKN_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`</tr>`;
        //bindo
        html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;">3.</td><td style="padding:2px 5px;vertical-align:top">Bahasa Indonesia</td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_BINDO_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_BINDO_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_BINDO_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_BINDO_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_BINDO_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_BINDO_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`</tr>`;
        //mtk
        html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;">4.</td><td style="padding:2px 5px;vertical-align:top">Matematika</td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_MTK_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_MTK_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_MTK_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_MTK_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_MTK_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_MTK_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`</tr>`;
        //ipa
        html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;">5.</td><td style="padding:2px 5px;vertical-align:top">Ilmu Pengetahuan Alam</td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_IPA_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_IPA_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_IPA_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_IPA_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_IPA_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_IPA_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`</tr>`;
        //ips
        html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;">6.</td><td style="padding:2px 5px;vertical-align:top">Ilmu Pengetahuan Sosial</td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_IPS_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_IPS_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_IPS_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_IPS_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_IPS_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_IPS_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`</tr>`;
        //SBK
        html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;">7.</td><td style="padding:2px 5px;vertical-align:top">Seni Budaya dan Keterampilan</td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_SBK_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_SBK_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_SBK_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_SBK_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_SBK_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_SBK_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`</tr>`;
        //PJOK
        html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;">8.</td><td style="padding:2px 5px;vertical-align:top">Pendidikan Jasmani, Olahraga, dan Kesehatan</td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_PJOK_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_PJOK_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_PJOK_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_PJOK_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_PJOK_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_PJOK_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`</tr>`;
        //B MULOK
        html +=`<tr style="background-color:#f1f1f1;"><td style="padding:2px 5px">B.</td><td style="padding:2px 5px;" colspan="15">MUATAN LOKAL</td></tr>`;
        //BSUNDA
        html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;width:35px">9. a</td><td style="padding:2px 5px;vertical-align:top">Bahasa Sunda</td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_BSUND_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_BSUND_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_BSUND_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_BSUND_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_BSUND_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_BSUND_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`</tr>`;
        //MULOOK1
        html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;text-align:right">b.</td><td style="padding:2px 5px;vertical-align:top"><textarea data-nilairaportinduk="${kodetapel}_06_${kelas}_1_MULOK1_NAMA" style="border: none transparent;outline: none;width:100%;font-size:10px"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_MULOK1_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_MULOK1_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_MULOK1_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_MULOK1_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_MULOK1_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_MULOK1_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`</tr>`;
        //MULOOK2       
         html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;text-align:right">c.</td><td style="padding:2px 5px;vertical-align:top"><textarea data-nilairaportinduk="${kodetapel}_06_${kelas}_1_MULOK2_NAMA" style="border: none transparent;outline: none;width:100%;font-size:10px"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_MULOK2_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_MULOK2_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="1" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_MULOK2_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_MULOK2_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaisemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_MULOK2_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
        <input type="number" data-nilaireratasemester="2" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_MULOK2_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`</tr>`;

        html +=`<tr style="background-color:#f1f1f1"><td style="padding:2px 5px;text-align:right" colspan="3">Jumlah</td>
        <td style="padding:2px 5px">
            <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_JUMLAH_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;">
            </td><td style="padding:2px 5px;vertical-align:top"></td><td>
            <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_JUMLAH_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;">
            </td><td style="padding:2px 5px;vertical-align:top"></td><td>
            <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_JUMLAH_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;">
            </td><td style="padding:2px 5px;vertical-align:top"></td><td>
            <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_JUMLAH_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;">
        </td></tr>`;
        html +=`<tr style="background-color:#f1f1f1"><td style="padding:2px 5px;text-align:right" colspan="3">Rata-rata</td>
        <td style="padding:2px 5px">
            <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_RERATA_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;">
            </td><td style="padding:2px 5px;vertical-align:top"></td><td>
            <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_RERATA_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;">
            </td><td style="padding:2px 5px;vertical-align:top"></td><td>
            <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_RERATA_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;">
            </td><td style="padding:2px 5px;vertical-align:top"></td><td>
            <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_RERATA_RERATA" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;">
        </td></tr>`;
        html +=`<tr style="background-color:#f1f1f1"><td style="padding:2px 5px;text-align:right" colspan="3">Rangking/Peringkat Kelas</td>
        <td style="padding:2px 5px">
            <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_RANGKING_KELAS" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;">
            </td><td style="padding:2px 5px;vertical-align:top;" colspan="3"></td><td style="padding:2px 5px">
            <input type="number" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_RANGKING_KELAS" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;">
            </td><td style="padding:2px 5px;vertical-align:top;" colspan="2">
        </td></tr>`;
       
        html +=`</tbody></table>`
        //end PENGATHUAN DAN KETERAMPILAN
        html +=`</td></tr>`;
        
        html +=`<tr><td style="padding:2px 5px;vertical-align:top"><b>B.</b></td><td colspan="15" style="padding:2px 5px"><b>KEPRIBADIAN </b></td></tr>`;
        html +=`<tr><td colspan="16">`
        // start kepribadian
        html +=`<table style="width:99%;margin:0 auto;border-collapse:collapse;border-padding:0;font-size:10px" border="1"><thead>`;
        html +=`<tr style="background-color:#f1f1f1"><th style="width:20%;padding:2px 5px;text-align:center">Keterangan</th><th style="width:40%;padding:2px 5px;text-align:center">Semester 1</th><th style="width:40%;padding:2px 5px;text-align:center">Semester 2</th></tr></thead><tbody>`;
        //SIKAP
        html+=`<tr><td style="padding:2px 5px">1. Sikap</td><td style="padding:2px 5px">`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_SIKAP"></td><td>`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_SIKAP">`;
        html +=`</td></tr>`;
        // KERAJINAN
        html+=`<tr><td style="padding:2px 5px">2. Kerajinan</td><td style="padding:2px 5px">`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_KERAJINAN" ></td><td>`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_KERAJINAN" >`;
        html +=`</td></tr>`;
        // KERAPIAHN DAN KEBERSIAHN
        html+=`<tr><td style="padding:2px 5px">3. Kerapihan dan Kebersihan</td><td style="padding:2px 5px">`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_KERAPIHAN"></td><td>`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_KERAPIHAN">`;
        html +=`</td></tr>`;
        html +=`</tbody></table>`;
        // end kepribadian
        html +=`</td></tr>`;
        html +=`<tr><td style="padding:2px 5px;vertical-align:top"><b>C.</b></td><td colspan="15" style="padding:2px 5px"><b>EKSTRAKURIKULER</b></td></tr>`;
        html +=`<tr><td colspan="16">`
        ///EKSKUL coY
        html +=`<table style="width:99%;margin:0 auto;border-collapse:collapse;border-padding:0;font-size:10px" border="1">`;
        html +=`<thead>`;
        html +=`<tr style="background-color:#f1f1f1"><th colspan="3">Semester 1</th><th colspan="3">Semester 2</th></tr>`;
        html +=`<tr style="background-color:#f1f1f1"><th>Kegiatan Ekstrakurikuler</th><th style="width:150px">Nilai</th><th style="width:30%">Keterangan</th><th>Kegiatan Ekstrakurikuler</th><th style="width:150px">Nilai</th><th style="width:30%">Keterangan</th></tr>`;
        html +=`</thead><tbody>`;
        html +=`<tr>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_NAMA_EKSKUL1" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_NILAI_EKSKUL1" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_KETERANGAN_EKSKUL1" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_NAMA_EKSKUL1" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_NILAI_EKSKUL1" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_KETERANGAN_EKSKUL1" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
        html +=`</tr>`;
        html +=`<tr>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_NAMA_EKSKUL2" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_NILAI_EKSKUL2" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_KETERANGAN_EKSKUL2" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_NAMA_EKSKUL2" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_NILAI_EKSKUL2" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_KETERANGAN_EKSKUL2" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
        html +=`</tr>`;
        html +=`<tr>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_NAMA_EKSKUL3" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_NILAI_EKSKUL3" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_KETERANGAN_EKSKUL3" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_NAMA_EKSKUL3" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_NILAI_EKSKUL3" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_KETERANGAN_EKSKUL3" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
        html +=`</tr>`;
        html +=`</tbody></table>`;
        //end eskull
        html+=`</td></tr>`;
        html +=`<tr><td style="padding:2px 5px;vertical-align:top"><b>D.</b></td><td colspan="15" style="padding:2px 5px"><b>PRESTASI</b></td></tr>`;
        html +=`<tr><td colspan="16">`
        // PRESTASI coY
        html +=`<table style="width:99%;margin:0 auto;border-collapse:collapse;border-padding:0;font-size:10px" border="1">`;
        html +=`<thead>`;
        html +=`<tr style="background-color:#f1f1f1"><th colspan="2">Semester 1</th><th colspan="2">Semester 2</th></tr>`;
        html +=`<tr style="background-color:#f1f1f1"><th style="width:10%">Jenis Prestasi</th><th style="width:40%">Keterangan</th><th style="width:10%">Jenis Prestasi</th><th style="width:40%">Keterangan</th></tr>`;
        html +=`</thead><tbody>`;
        html +=`<tr>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_NAMA_PRESTASI1" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_KETERANGAN_PRESTASI1" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_NAMA_PRESTASI1" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_KETERANGAN_PRESTASI1" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
        html +=`</tr>`;
        html +=`<tr>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_NAMA_PRESTASI2" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_KETERANGAN_PRESTASI2" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_NAMA_PRESTASI2" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_KETERANGAN_PRESTASI2" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
        html +=`</tr>`;
        html +=`</tbody></table>`;

        html +=`</td></tr>`
        html +=`<tr><td style="padding:2px 5px;vertical-align:top"><b>E.</b></td><td colspan="15" style="padding:2px 5px"><b>KETIDAKHADIRAN DAN KENAIKAN</b></td></tr>`;
        html +=`<tr><td colspan="16">`
        // ketidakhadiran
        html +=`<table style="width:99%;margin:0 auto;border-collapse:collapse;border-padding:0;font-size:10px" border="1">`;
        html +=`<thead>`;
        html +=`<tr style="background-color:#f1f1f1"><th colspan="4">KETIDAKHADIRAN</th></tr>`;
        html +=`<tr style="background-color:#f1f1f1"><th colspan="2">Semester 1</th><th colspan="2">Semester 2</th></tr>`;
        html +=`<tr style="background-color:#f1f1f1"><th style="width:30%">Keterangan</th><th style="width:20%">Jumlah hari</th><th style="width:30%">Keterangan</th><th style="width:20%">Jumlah hari</th></tr>`;
        html +=`</thead><tbody>`;
        html +=`<tr>`;
            html +=`<td style="padding:2px 5px;vertical-align:top">1. Sakit</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_KEHADIRAN_SAKIT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top">1. Sakit</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_KEHADIRAN_SAKIT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
        html +=`</tr>`
        html +=`<tr>`;
            html +=`<td style="padding:2px 5px;vertical-align:top">2. Izin</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_KEHADIRAN_IZIN" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top">2. Sakit</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_KEHADIRAN_IZIN" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
        html +=`</tr>`
        html +=`<tr>`;
            html +=`<td style="padding:2px 5px;vertical-align:top">3. Tanpa Keterangan</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_KEHADIRAN_ALPA" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top">3. Tanpa Keterangan</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_KEHADIRAN_ALPA" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
        html +=`</tr>`;
        html +=`</tbody></table>`;
        html +=`<table style="width:99%;margin:0 auto;border-collapse:collapse;border-padding:0;font-size:10px" border="1"><thead>`;
        html +=`<tr style="background-color:#f1f1f1"><th colspan="3">KENAIKAN KELAS, RIWAYAT WALI KELAS, DAN TITIMANGSA RAPORT</th></tr>`;
        html +=`<tr style="background-color:#f1f1f1"><th style="width:20%;padding:2px 5px;text-align:center">Keterangan</th><th style="width:40%;padding:2px 5px;text-align:center">Semester 1</th><th style="width:40%;padding:2px 5px;text-align:center">Semester 2</th></tr></thead><tbody>`;
        //titimangsa raport
        html+=`<tr><td style="padding:2px 5px">Titimangsa Raport Semester</td><td style="padding:2px 5px">`;
            html +=`<input type="date" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_TITIMANGSA_RAPORT"></td><td>`;
            html +=`<input type="date" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_TITIMANGSA_RAPORT">`;
        html +=`</td></tr>`;
        // Wali kelas
        html+=`<tr><td style="padding:2px 5px">Nama Wali Kelas</td><td style="padding:2px 5px">`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_NAMA_WALIKELAS" placeholder="Nama lengkap dengan Gelar"></td><td>`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_NAMA_WALIKELAS" placeholder="Nama lengkap dengan Gelar">`;
        html +=`</td></tr>`;
        // nip Wali kelas
        html+=`<tr><td style="padding:2px 5px">NIP Wali Kelas</td><td style="padding:2px 5px">`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_NIP_WALIKELAS" placeholder="Hanya Angka (tanpa ada kata NIP. )"></td><td>`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_NIP_WALIKELAS" placeholder="Hanya Angka (tanpa ada kata NIP. )">`;
        html +=`</td></tr>`;
        
        // KEpsek
        html+=`<tr><td style="padding:2px 5px">Nama Kepala Sekolah</td><td style="padding:2px 5px">`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_NAMA_KEPSEK" placeholder="Nama lengkap dengan Gelar"></td><td>`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_NAMA_KEPSEK" placeholder="Nama lengkap dengan Gelar">`;
        html +=`</td></tr>`;
        // nip Wali kelas
        html+=`<tr><td style="padding:2px 5px">NIP Kepala Sekolah</td><td style="padding:2px 5px">`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_06_${kelas}_1_NIP_KEPSEK" placeholder="Hanya Angka (tanpa ada kata NIP. )"></td><td>`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_NIP_KEPSEK" placeholder="Hanya Angka (tanpa ada kata NIP. )">`;
        html +=`</td></tr>`;
        
        
        //selesai tiimangsaraport
        html+=`<tr><td style="padding:2px 5px;background-color:#f1f1f1;vertical-align:middle;text-align:center" colspan="2">Keputusan ${kelas == 6?"Kelulusan Siswa":"Kenaikan Kelas"}</td><td style="padding:2px 5px">`;
        if(kelas != 6){
            html +=`<label for="N${kodetapel}_06_${kelas}_2_KENAIKAN_KELAS">Kenaikan Kelas: 
            <select id="N${kodetapel}_06_${kelas}_2_KENAIKAN_KELAS" 
            data-nilairaportinduk="${kodetapel}_06_${kelas}_2_KENAIKAN_KELAS" 
            style="border: none transparent;outline: none;">`;
            html +=`<option value="Naik Kelas">Naik Kelas</option><option value="Tidak Naik Kelas" selected>Tidak Naik Kelas</option>`
            html +=`</select></label><br>`
            html +=`<label for="N${kodetapel}_06_${kelas}_2_NAIKTINGGAL_KELAS_DI">Ke Kelas: <select id="N${kodetapel}_06_${kelas}_2_NAIKTINGGAL_KELAS_DI" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_NAIKTINGGAL_KELAS_DI" style="border: none transparent;outline: none;">`;
            html +=`<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option>`;
            html +=`</select></label>`;

        }else{
            html +=`<label for="N${kodetapel}_06_${kelas}_2_KETERANGAN_KELULUSAN">Kelulusan: <select id="N${kodetapel}_06_${kelas}_2_KETERANGAN_KELULUSAN" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_KETERANGAN_KELULUSAN" style="border: none transparent;outline: none;">`;
            html +=`<option value="Tidak Lulus">Tidak Lulus</option><option value="Lulus" >Lulus</option>`
            html +=`</select></label><br>`
            html +=`<label for="N${kodetapel}_06_${kelas}_2_TITIMANGSA_KELULUSAN">Tanggal Lulus: <input type="date" style="border: none transparent;outline: none;" id="N${kodetapel}_06_${kelas}_2_TITIMANGSA_KELULUSAN" data-nilairaportinduk="${kodetapel}_06_${kelas}_2_TITIMANGSA_KELULUSAN">`;

        }
        html+=`</td></tr>`;//

        html +=`</tbody></table>`;
        // end ketidakhadiran

        html +=`</td></tr>`
        html +=`</table>`;
    }else if(kurikulum == "13"){
        html +=`<h4 style="text-align:center">LAPORAN HASIL PENCAPAIAN KOMPETENSI PESERTA DIDIK SD</h4><br>`
        html +=`<table style="width:99%;margin:2px auto;font-size:10px !important;">`;
        html +=`<tr><td style="width:72px;padding:2px 5px">Nama Siswa</td><td style="width:1px;padding:2px 5px">:</td>`;
        html +=`<td style="border-bottom:.5pt dotted black;padding:2px 5px">${db.pd_nama.toUpperCase()}</td>`
        html +=`<td style="width:115px;padding:2px 5px">Nomor Induk Siswa</td><td style="width:1px;padding:2px 5px">:</td>`;
        html +=`<td style="border-bottom:.5pt dotted black;padding:2px 5px">${db.nis}</td>`;
        html +=`<td style="width:72px;padding:2px 5px">NISN</td><td style="width:1px;padding:2px 5px">:</td>`;
        html +=`<td style="border-bottom:.5pt dotted black;padding:2px 5px">${db.nisn}</td>`;
        html +=`</tr>`
        html +=`<tr><td style="padding:2px 5px">Kelas</td><td style="width:1px;padding:2px 5px">:</td>`;
        html +=`<td style="border-bottom:.5pt dotted black;padding:2px 5px">${kelas}</td>`
        html +=`<td style="padding:2px 5px">Tahun Pelajaran</td><td style="width:1px;padding:2px 5px">:</td>`;
        html +=`<td style="border-bottom:.5pt dotted black;padding:2px 5px">${tekstapel}</td>`;
        html +=`<td style="padding:2px 5px">Kurikulum</td><td style="width:1px;padding:2px 5px">:</td>`;
        html +=`<td style="border-bottom:.5pt dotted black;padding:2px 5px">${namakurikulum}</td>`;
        html +=`</tr>`
        html +=`</table><br>`;
        html +=`<table style="width:99.98%;margin:0 auto;font-size:10px !important;border-collapse:collapse;border-padding:0">`;
        html +=`<tr><td rowspan="2" style="padding:2px 5px;vertical-align:top;width:5px"><b>A.</b></td><td colspan="15" style="padding:2px 5px"><b>SIKAP</b></td></tr>`;
        html +=`<tr><td colspan="15" style="padding:2px 5px">`
        // startTEMPAT SIKAP DAN SPIRITUAL`
        html +=`<table style="width:100%;border-collapse:collapse;border-padding:0;font-size:10px" border="1">`;
        html +=`<tr style="background-color:#f1f1f1"><th style="width:13%;padding:2px 5px;text-align:center;vertical-align:middle" rowspan="2">Aspek</th><th style="text-align:center" colspan="2">SEMESTER 1 (GANJIL)</th><th style="text-align:center" colspan="2">SEMESTER 2 (GENAP)</th></tr>`;
        html +=`<tr style="background-color:#f1f1f1"><th style="text-align:center;padding:2px 5px">Predikat</th><th style="width:39%;text-align:center">Deskripsi</th><th style="text-align:center;padding:2px 5px">Predikat</th><th style="width:39%;text-align:center">Deskripsi</th><tr>`;
        html += `<tr><td style="padding:2px 5px;vertical-align:top">1. Sikap Spiritual</td><td style="padding:2px 5px;vertical-align:top"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_KI1_NILAI" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px" placeholder="Masukkan nilai"></td><td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_KI1_DESKRIPSI" style="border: none transparent;outline: none;width:100%;height:100%;font-size:10px;" placeholder="Masukkan Deskripsi"></textarea></td><td style="padding:2px 5px;vertical-align:top"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_KI1_NILAI" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px" placeholder="Masukkan nilai"></td><td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_KI1_DESKRIPSI" style="border: none transparent;outline: none;width:100%;height:100%;font-size:10px;" placeholder="Masukkan Deskripsi"></textarea></td></tr>`;
        html += `<tr><td style="padding:2px 5px;vertical-align:top">2. Sikap Sosial</td><td style="padding:2px 5px;vertical-align:top"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_KI2_NILAI" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px" placeholder="Masukkan nilai"></td><td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_KI2_DESKRIPSI" style="border: none transparent;outline: none;width:100%;height:100%;font-size:10px;" placeholder="Masukkan nilai"></textarea></td><td style="padding:2px 5px;vertical-align:top"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_KI2_NILAI" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px" placeholder="Masukkan nilai"></td><td style="padding:2px 5px;vertical-align:top"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_KI2_DESKRIPSI" style="border: none transparent;outline: none;width:100%;height:100%;font-size:10px;" placeholder="Masukkan nilai"></textarea></td></tr>`;
        html +=`</table>`
        // end TEMPAT SIKAP DAN SPIRITUAL`
        html+=`</td></tr>`
        html +=`<tr><td style="padding:2px 5px;vertical-align:top"><b>B.</b></td><td colspan="15" style="padding:2px 5px"><b>PENGETAHUAN DAN KETERAMPILAN</b></td></tr>`;
        html +=`<tr><td colspan="16" style="padding:2px 5px;">`;
        //start PENGATHUAN DAN KETERAMPILAN
        html +=`<table style="width:100%;border-collapse:collapse;border-padding:0;font-size:10px" border="1">`;
        html +=`<thead><tr style="background-color:#f1f1f1;text-align:center"><th rowspan="3" style="padding:2px 5px"><b>No.</b></th><th style="padding:2px 5px" rowspan="3"><b>Mata Pelajaran</b></th><th colspan="7">Semester 1 (Ganjil)</th><th colspan="7">Semester 2 (Genap)</th></tr>`;
        html +=`<tr style="background-color:#f1f1f1;"><th rowspan="2">KKM</th><th colspan="3">Pengetahuan (KI-3)</th><th colspan="3">Keterampilan (KI-4)</th><th rowspan="2">KKM</th><th colspan="3">Pengetahuan (KI-3)</th><th colspan="3">Keterampilan (KI-4)</th></tr>`;
        html +=`<tr style="background-color:#f1f1f1;"><th>Angka</th><th>Predikat</th><th>Deskripsi</th><th>Angka</th><th>Predikat</th><th>Deskripsi</th><th>Angka</th><th>Predikat</th><th>Deskripsi</th><th>Angka</th><th>Predikat</th><th>Deskripsi</th></tr>`
        html+=`</thead><tbody>`;
        html +=`<tr style="background-color:#f1f1f1;"><td style="padding:2px 5px">A.</td><td style="padding:2px 5px;" colspan="15">MUATAN NASIONAL</td></tr>`;
        //pendidikan agama
        html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;">1.</td><td style="padding:2px 5px;vertical-align:top">Pendidikan Agama dan Budi Pekerti</td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_AGAMA_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_1_AGAMA_P_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_AGAMA_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_AGAMA_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_1_AGAMA_K_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_AGAMA_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_AGAMA_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_AGAMA_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_2_AGAMA_P_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_AGAMA_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_AGAMA_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_2_AGAMA_K_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_AGAMA_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_AGAMA_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`</tr>`;
        //
        //pendidikan PKN
        html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;">2.</td><td style="padding:2px 5px;vertical-align:top">Pendidikan Pancasila dan Kewarganegaraan</td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_PKN_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_1_PKN_P_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_PKN_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_PKN_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_1_PKN_K_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_PKN_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_PKN_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_PKN_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_2_PKN_P_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_PKN_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_PKN_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_2_PKN_K_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_PKN_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_PKN_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`</tr>`;
        //pendidikan BAHASA INDONESIA
        html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;">3.</td><td style="padding:2px 5px;vertical-align:top">Bahasa Indonesia</td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_BINDO_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_1_BINDO_P_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_BINDO_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_BINDO_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_1_BINDO_K_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_BINDO_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_BINDO_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_BINDO_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_2_BINDO_P_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_BINDO_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_BINDO_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_2_BINDO_K_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_BINDO_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_BINDO_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`</tr>`;
        //pendidikan MATEMATIKA
        html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;">4.</td><td style="padding:2px 5px;vertical-align:top">Matematika</td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MTK_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MTK_P_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MTK_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MTK_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MTK_K_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MTK_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MTK_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MTK_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MTK_P_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MTK_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MTK_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MTK_K_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MTK_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MTK_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`</tr>`;
        //ipa DAN ips DI KELAS 1 - 3 GA ADA
        if(parseInt(kelas) > 3){
            html +=`<tr>`;
            html +=`<td style="padding:2px 5px;vertical-align:top;">5.</td><td style="padding:2px 5px;vertical-align:top">Ilmu Pengetahuan Alam</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_IPA_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_1_IPA_P_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_IPA_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_IPA_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_1_IPA_K_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_IPA_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_IPA_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_IPA_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_2_IPA_P_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_IPA_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_IPA_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_2_IPA_K_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_IPA_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_IPA_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
            html +=`</tr>`;
        //ips
        html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;">6.</td><td style="padding:2px 5px;vertical-align:top">Ilmu Pengetahuan Sosial</td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_IPS_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_1_IPS_P_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_IPS_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_IPS_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_1_IPS_K_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_IPS_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_IPS_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_IPS_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_2_IPS_P_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_IPS_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_IPS_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_2_IPS_K_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_IPS_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_IPS_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`</tr>`;
        
        }else{
            html  +=`<tr>`;
            html +=`<td style="padding:2px 5px;vertical-align:top;">5.</td><td style="padding:2px 5px;vertical-align:top">Ilmu Pengetuhuan Alam</td>`;
            html +=`<td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td>`;
            html +=`<td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td>`;
            html +=`</tr>`
            html  +=`<tr>`;
            html +=`<td style="padding:2px 5px;vertical-align:top;">6.</td><td style="padding:2px 5px;vertical-align:top">Ilmu Pengetuhuan Sosial</td>`;
            html +=`<td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td>`;
            html +=`<td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td><td style="background-color:#f1f1f1"></td>`;
            html +=`</tr>`
        }
        //SBDP
        
        html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;">7.</td><td style="padding:2px 5px;vertical-align:top">Seni Budaya dan Prakarya</td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_SBDP_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_1_SBDP_P_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_SBDP_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_SBDP_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_1_SBDP_K_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_SBDP_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_SBDP_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_SBDP_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_2_SBDP_P_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_SBDP_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_SBDP_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_2_SBDP_K_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_SBDP_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_SBDP_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`</tr>`;
        //PJOK
        html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;">8.</td><td style="padding:2px 5px;vertical-align:top">Pendidikan Jasmani, Olahraga, dan Kesehatan</td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_PJOK_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_1_PJOK_P_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_PJOK_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_PJOK_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_1_PJOK_K_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_PJOK_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_PJOK_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_PJOK_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_2_PJOK_P_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_PJOK_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_PJOK_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_2_PJOK_K_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_PJOK_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_PJOK_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`</tr>`;
        
        html +=`<tr style="background-color:#f1f1f1;"><td style="padding:2px 5px">B.</td><td style="padding:2px 5px;" colspan="15">MUATAN LOKAL</td></tr>`;
        html +=`<tr><td style="padding:2px 5px;">9.</td><td style="padding:2px 5px;" colspan="15">Muatan Lokal Wajib</td></tr>`;
        html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;">a.</td><td style="padding:2px 5px;vertical-align:top">Bahasa dan Sastra Sunda</td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_BSUND_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_1_BSUND_P_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_BSUND_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_BSUND_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_1_BSUND_K_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_BSUND_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_BSUND_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_BSUND_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_2_BSUND_P_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_BSUND_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_BSUND_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-nilairaportinduk="${kodetapel}_13_${kelas}_2_BSUND_K_NILAI" style="border: none transparent;outline: none;background:transparent;width:100%;text-align:center;font-size:10px;"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_BSUND_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_BSUND_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`</tr>`;
        html +=`<tr><td style="padding:2px 5px;">10.</td><td style="padding:2px 5px;" colspan="15">Muatan Lokal Pilihan</td></tr>`;
        html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;">a.</td><td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MULOK1_NAMAMULOK" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;" placeholder="Isikan Teks"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MULOK1_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MULOK1_P_NILAI" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MULOK1_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MULOK1_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MULOK1_K_NILAI" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MULOK1_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MULOK1_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MULOK1_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MULOK1_P_NILAI" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MULOK1_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MULOK1_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MULOK1_K_NILAI" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MULOK1_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MULOK1_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`</tr>`;
        html +=`<tr>`;
        html +=`<td style="padding:2px 5px;vertical-align:top;text-align:right">b.</td><td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MULOK2_NAMAMULOK" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%;" placeholder="Isikan Teks"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MULOK2_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MULOK2_P_NILAI" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MULOK2_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MULOK2_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MULOK2_K_NILAI" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MULOK2_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_1_MULOK2_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MULOK2_KKM" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MULOK2_P_NILAI" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MULOK2_P_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MULOK2_P_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MULOK2_K_NILAI" style="border: none transparent;outline: none;width:100%;text-align:center;font-size:10px"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MULOK2_K_PREDIKAT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%"></td>`;
        html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('textarea').focus();"><textarea data-nilairaportinduk="${kodetapel}_13_${kelas}_2_MULOK2_K_DESKRIPSI" style="border: none transparent;outline: none;width:100%;font-size:5px;height:100%;resize:vertical"></textarea></td>`;
        html +=`</tr>`;
        html +=`</tbody></table>`
        //end PENGATHUAN DAN KETERAMPILAN
        html +=`</td></tr>`
        html +=`<tr><td style="padding:2px 5px;vertical-align:top"><b>C.</b></td><td colspan="15" style="padding:2px 5px"><b>EKSTRAKURIKULER</b></td></tr>`;
        html +=`<tr><td colspan="16">`
        ///EKSKUL coY
        html +=`<table style="width:99%;margin:0 auto;border-collapse:collapse;border-padding:0;font-size:10px" border="1">`;
        html +=`<thead>`;
        html +=`<tr style="background-color:#f1f1f1"><th colspan="3">Semester 1</th><th colspan="3">Semester 2</th></tr>`;
        html +=`<tr style="background-color:#f1f1f1"><th>Kegiatan Ekstrakurikuler</th><th style="width:150px">Nilai</th><th style="width:30%">Keterangan</th><th>Kegiatan Ekstrakurikuler</th><th style="width:150px">Nilai</th><th style="width:30%">Keterangan</th></tr>`;
        html +=`</thead><tbody>`;
        html +=`<tr>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_NAMA_EKSKUL1" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_NILAI_EKSKUL1" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_KETERANGAN_EKSKUL1" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_NAMA_EKSKUL1" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_NILAI_EKSKUL1" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_KETERANGAN_EKSKUL1" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
        html +=`</tr>`;
        html +=`<tr>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_NAMA_EKSKUL2" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_NILAI_EKSKUL2" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_KETERANGAN_EKSKUL2" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_NAMA_EKSKUL2" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_NILAI_EKSKUL2" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_KETERANGAN_EKSKUL2" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
        html +=`</tr>`;
        html +=`<tr>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_NAMA_EKSKUL3" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_NILAI_EKSKUL3" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_KETERANGAN_EKSKUL3" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_NAMA_EKSKUL3" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_NILAI_EKSKUL3" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_KETERANGAN_EKSKUL3" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
        html +=`</tr>`;
        html +=`</tbody></table>`;
        //end eskull
        html+=`</td></tr>`;
        html +=`<tr><td style="padding:2px 5px;vertical-align:top"><b>D.</b></td><td colspan="15" style="padding:2px 5px"><b>PRESTASI</b></td></tr>`;
        html +=`<tr><td colspan="16">`
        // PRESTASI coY
        html +=`<table style="width:99%;margin:0 auto;border-collapse:collapse;border-padding:0;font-size:10px" border="1">`;
        html +=`<thead>`;
        html +=`<tr style="background-color:#f1f1f1"><th colspan="2">Semester 1</th><th colspan="2">Semester 2</th></tr>`;
        html +=`<tr style="background-color:#f1f1f1"><th style="width:10%">Jenis Prestasi</th><th style="width:40%">Keterangan</th><th style="width:10%">Jenis Prestasi</th><th style="width:40%">Keterangan</th></tr>`;
        html +=`</thead><tbody>`;
        html +=`<tr>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_NAMA_PRESTASI1" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_KETERANGAN_PRESTASI1" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_NAMA_PRESTASI1" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_KETERANGAN_PRESTASI1" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
        html +=`</tr>`;
        html +=`<tr>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_NAMA_PRESTASI2" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_KETERANGAN_PRESTASI2" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_NAMA_PRESTASI2" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_KETERANGAN_PRESTASI2" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
        html +=`</tr>`;
        html +=`</tbody></table>`;

        html +=`</td></tr>`
        html +=`<tr><td style="padding:2px 5px;vertical-align:top"><b>E.</b></td><td colspan="15" style="padding:2px 5px"><b>KETIDAKHADIRAN DAN KENAIKAN</b></td></tr>`;
        html +=`<tr><td colspan="16">`
        // ketidakhadiran
        html +=`<table style="width:99%;margin:0 auto;border-collapse:collapse;border-padding:0;font-size:10px" border="1">`;
        html +=`<thead>`;
        html +=`<tr style="background-color:#f1f1f1"><th colspan="4">KETIDAKHADIRAN</th></tr>`;
        html +=`<tr style="background-color:#f1f1f1"><th colspan="2">Semester 1</th><th colspan="2">Semester 2</th></tr>`;
        html +=`<tr style="background-color:#f1f1f1"><th style="width:30%">Keterangan</th><th style="width:20%">Jumlah hari</th><th style="width:30%">Keterangan</th><th style="width:20%">Jumlah hari</th></tr>`;
        html +=`</thead><tbody>`;
        html +=`<tr>`;
            html +=`<td style="padding:2px 5px;vertical-align:top">1. Sakit</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_KEHADIRAN_SAKIT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top">1. Sakit</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_KEHADIRAN_SAKIT" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
        html +=`</tr>`
        html +=`<tr>`;
            html +=`<td style="padding:2px 5px;vertical-align:top">2. Izin</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_KEHADIRAN_IZIN" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top">2. Sakit</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_KEHADIRAN_IZIN" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
        html +=`</tr>`
        html +=`<tr>`;
            html +=`<td style="padding:2px 5px;vertical-align:top">3. Tanpa Keterangan</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_KEHADIRAN_ALPA" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top">3. Tanpa Keterangan</td>`;
            html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();">
            <input type="text" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_KEHADIRAN_ALPA" style="border: none transparent;outline: none;width:100%;font-size:10px;height:100%">`;
            html +=`</td>`;
        html +=`</tr>`;
        html +=`</tbody></table>`;
        html +=`<table style="width:99%;margin:0 auto;border-collapse:collapse;border-padding:0;font-size:10px" border="1"><thead>`;
        html +=`<tr style="background-color:#f1f1f1"><th colspan="3">KENAIKAN KELAS, RIWAYAT WALI KELAS, DAN TITIMANGSA RAPORT</th></tr>`;
        html +=`<tr style="background-color:#f1f1f1"><th style="width:20%;padding:2px 5px;text-align:center">Keterangan</th><th style="width:40%;padding:2px 5px;text-align:center">Semester 1</th><th style="width:40%;padding:2px 5px;text-align:center">Semester 2</th></tr></thead><tbody>`;
        //titimangsa raport
        html+=`<tr><td style="padding:2px 5px">Titimangsa Raport Semester</td><td style="padding:2px 5px">`;
            html +=`<input type="date" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_TITIMANGSA_RAPORT"></td><td>`;
            html +=`<input type="date" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_TITIMANGSA_RAPORT">`;
        html +=`</td></tr>`;
        // Wali kelas
        html+=`<tr><td style="padding:2px 5px">Nama Wali Kelas</td><td style="padding:2px 5px">`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_NAMA_WALIKELAS" placeholder="Nama lengkap dengan Gelar"></td><td>`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_NAMA_WALIKELAS" placeholder="Nama lengkap dengan Gelar">`;
        html +=`</td></tr>`;
        // nip Wali kelas
        html+=`<tr><td style="padding:2px 5px">NIP Wali Kelas</td><td style="padding:2px 5px">`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_NIP_WALIKELAS" placeholder="Hanya Angka (tanpa ada kata NIP. )"></td><td>`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_NIP_WALIKELAS" placeholder="Hanya Angka (tanpa ada kata NIP. )">`;
        html +=`</td></tr>`;
        
        // KEpsek
        html+=`<tr><td style="padding:2px 5px">Nama Kepala Sekolah</td><td style="padding:2px 5px">`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_NAMA_KEPSEK" placeholder="Nama lengkap dengan Gelar"></td><td>`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_NAMA_KEPSEK" placeholder="Nama lengkap dengan Gelar">`;
        html +=`</td></tr>`;
        // nip Wali kelas
        html+=`<tr><td style="padding:2px 5px">NIP Kepala Sekolah</td><td style="padding:2px 5px">`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_13_${kelas}_1_NIP_KEPSEK" placeholder="Hanya Angka (tanpa ada kata NIP. )"></td><td>`;
            html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_NIP_KEPSEK" placeholder="Hanya Angka (tanpa ada kata NIP. )">`;
        html +=`</td></tr>`;
        
        
        //selesai tiimangsaraport
        html+=`<tr><td style="padding:2px 5px;background-color:#f1f1f1;vertical-align:middle;text-align:center" colspan="2">Keputusan ${kelas == 6?"Kelulusan Siswa":"Kenaikan Kelas"}</td><td style="padding:2px 5px">`;
        if(kelas != 6){
            html +=`<label for="N${kodetapel}_13_${kelas}_2_KENAIKAN_KELAS">Kenaikan Kelas: 
            <select id="N${kodetapel}_13_${kelas}_2_KENAIKAN_KELAS" 
            data-nilairaportinduk="${kodetapel}_13_${kelas}_2_KENAIKAN_KELAS" 
            style="border: none transparent;outline: none;">`;
            html +=`<option value="Naik Kelas">Naik Kelas</option><option value="Tidak Naik Kelas" selected>Tidak Naik Kelas</option>`
            html +=`</select></label><br>`
            html +=`<label for="N${kodetapel}_13_${kelas}_2_NAIKTINGGAL_KELAS_DI">Ke Kelas: <select id="N${kodetapel}_13_${kelas}_2_NAIKTINGGAL_KELAS_DI" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_NAIKTINGGAL_KELAS_DI" style="border: none transparent;outline: none;">`;
            html +=`<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option>`;
            html +=`</select></label>`;

        }else{
            html +=`<label for="N${kodetapel}_13_${kelas}_2_KETERANGAN_KELULUSAN">Kelulusan: <select id="N${kodetapel}_13_${kelas}_2_KETERANGAN_KELULUSAN" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_KETERANGAN_KELULUSAN" style="border: none transparent;outline: none;">`;
            html +=`<option value="Tidak Lulus">Tidak Lulus</option><option value="Lulus" >Lulus</option>`
            html +=`</select></label><br>`
            html +=`<label for="N${kodetapel}_13_${kelas}_2_TITIMANGSA_KELULUSAN">Tanggal Lulus: <input type="date" style="border: none transparent;outline: none;" id="N${kodetapel}_13_${kelas}_2_TITIMANGSA_KELULUSAN" data-nilairaportinduk="${kodetapel}_13_${kelas}_2_TITIMANGSA_KELULUSAN">`;

        }
        html+=`</td></tr>`;//

        html +=`</tbody></table>`;
        // end ketidakhadiran

        html +=`</td></tr>`
        html +=`</table>`;
        
    }else{
        html +="Format untuk Kurikulum "+namakurikulum +" belum tersedia."
    }


    formulirkirim.innerHTML = html;
    judulmodal_editnomorinduk.innerHTML = `<div class="w3-center"><img src="/img/barloading.gif"> Proses memanggil data</div>`
    let panggilandata = await panggildataraport(token, kodetapel, kurikulum, kelas);
    if(panggilandata !== undefined){
        let sumberdata = panggilandata[0];
        let elemeninputan = document.querySelectorAll("[data-nilairaportinduk]");
        let datainputgada = []
        for(let n = 0 ; n < elemeninputan.length ; n++){
            let inputan = elemeninputan[n];
            let key = inputan.getAttribute("data-nilairaportinduk");
            let val = sumberdata[key];
            if(val !== undefined){
                if(inputan.type == "date"){
                    inputan.value = val ==""?"":StringTanggalnol(new Date(val));
                }else if(inputan.type =="select-one"){
                    inputan.value = val;
                }else{
                    inputan.value = val;
                }
            }else{
                datainputgada.push(key)
            }
        }
         //console.log(datainputgada)
    }
    judulmodal_editnomorinduk.innerHTML = "RESUME DATA BUKU INDUK SISWA";
    

    tempattombol_formulirkirim.innerHTML =`<div class="w3-tiny w3-center">
    <button class="w3-btn w3-yellow w3-round-xlarge w3-bottombar w3-border-black" onclick="printadm('formulirkirim')">PRINT</button>
   <button class="w3-btn w3-pale-green w3-round-xlarge w3-bottombar w3-border-black" id="tombolkirimpageidentitas" onclick="kirimnilaikeinduk(this,${token},${tapelinduk})">Kirim Ke Server Buku Induk</button>
    </div>`
    //source code:https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
    //data-nilairaportinduk="${kodetapel}_06_${kelas}_1_JUMLAH_NILAI"
    let txHeight = 25;
    let tx = document.querySelectorAll("textarea[data-nilairaportinduk]");//document.getElementsByTagName("textarea");

    for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute("spellCheck","false");
        tx[i].style.overflow= "hidden";
        tx[i].style.resize= "none";
        if (tx[i].value == '') {
            tx[i].style.height= txHeight+"px";
        } else {
            tx[i].style.height= (tx[i].scrollHeight>50?50:tx[i].scrollHeight)+"px";
            
        }
        tx[i].oninput = function(e){
            this.style.height = "auto";
            this.style.resize = "vertical";
            this.style.height = (this.scrollHeight>50?50:this.scrollHeight) + "px";
        }
        tx[i].onmouseover = function(e){
            this.style.resize = "vertical";
        }
        tx[i].onmouseout = function(e){
            this.style.resize = "none";
        }
    }
    
    let tabelkurikulum2006 = document.getElementById("tabelraport06");
    if(tabelkurikulum2006 !==null){
        for(let s = 1 ; s <= 2 ; s++){
            let querynilai = document.querySelectorAll(`input[data-nilaisemester="${s}"]`);
            let totalnilai = document.querySelector(`input[data-nilairaportinduk="${kodetapel}_06_${kelas}_${s}_JUMLAH_NILAI"]`)
            let totalrerata = document.querySelector(`input[data-nilairaportinduk="${kodetapel}_06_${kelas}_${s}_RERATA_NILAI"]`)
            let queryrerata = document.querySelectorAll(`input[data-nilaireratasemester="${s}"]`);
            let totalreratakelas = document.querySelector(`input[data-nilairaportinduk="${kodetapel}_06_${kelas}_${s}_JUMLAH_RERATA"]`)
            let reratareratakelas = document.querySelector(`input[data-nilairaportinduk="${kodetapel}_06_${kelas}_${s}_RERATA_RERATA"]`)
            for(n = 0 ; n < querynilai.length ; n++){
                let nfokus = querynilai[n];
                let rfokus = queryrerata[n]
                let tdR = nfokus.parentNode.parentElement.rowIndex;
                let tdC = nfokus.parentNode.cellIndex
                let tdisi = tabelkurikulum2006.rows[tdR].cells[tdC+1]
                
                nfokus.oninput = function(e){
                    tdisi.innerHTML = terbilang(e.target.value.toString());
                    totalnilai.value = nilaitotal(s).totalnilai;
                    totalrerata.value = nilaitotal(s).rerata;
                }
                rfokus.oninput = function(e){
                    totalreratakelas.value = nilaitotal(s).totalnilaix;
                    reratareratakelas.value = nilaitotal(s).reratax;
                }
            }
        }
        function nilaitotal (semester){
            let querynilai = document.querySelectorAll(`input[data-nilaisemester="${semester}"]`);
            let querynilaix = document.querySelectorAll(`input[data-nilaireratasemester="${semester}"]`);
            let ob={}
            let t = 0;
            let s = 0;
            let ct =0, cs=0;
            for(n = 0 ; n < querynilai.length ; n++){
                let el = querynilai[n].getAttribute("data-nilairaportinduk");
                let namamapel1 = document.querySelector(`textarea[data-nilairaportinduk="${kodetapel}_06_${kelas}_${semester}_MULOK1_NAMA"]`)
                let namamapel2 = document.querySelector(`textarea[data-nilairaportinduk="${kodetapel}_06_${kelas}_${semester}_MULOK2_NAMA"]`)

                t += querynilai[n].value*1;
                    s += querynilaix[n].value*1;
                    ct+=querynilai[n].value==""?0:1;
                    cs+=querynilaix[n].value==""?0:1;
            }
            let rt = (t/ct).toFixed(2)
            let rtx = (s/cs).toFixed(2)
            ob.totalnilai = t;
            ob.rerata = rt;
            ob.totalnilaix = s
            ob.reratax = rtx;
            return ob
        }
    }
}
const panggildataraport = async (tokensiswa, tapelraport, kurikulum,kelas) =>{
    let db = syarat_riwayatkelas(tokensiswa);
    let namatab = db.tapelawal;
    let data = new FormData();
    data.append("tokensiswa",tokensiswa);
    data.append("action","cekdataraport");
    data.append("namatab",namatab);
    data.append("namakurikulum",kurikulum);
    data.append("namatapelraport",tapelraport);
    data.append("jenjang",kelas);
    
    return await fetch(linkdatabaseinduk,{method:"post",body:data})
        .then(m => m.json())
        .then(r => {
            let tabada = r.tabexist;
            let keyada = r.keys;
            let cekidbaris = r.idbarisexist;
            let datakey = r.datakeys;
            if(tabada == "ada" && keyada =="ada" && cekidbaris == "ada"){
                return datakey
            }
        }).catch(er=>{
            return er
        })

}
let koleksiundefine = [];
const page_bukuinduk_identitas = (token) =>{
    koleksiundefine = [];
    let db = db_utama_siswa.filter(s => s.id == token)[0];//.length == 0?dbsiswa_bukuinduk.filter(s => s.id == token)[0]:db_utama_siswa.filter(s => s.id == token)[0];
    let dbinduk = dbsiswa_bukuinduk.filter(s => s.id == token)[0];
    let koleksipoto = dbinduk.koleksi_potoinduk == ""?[]:JSON.parse(dbinduk.koleksi_potoinduk);
    let syarat = syarat_riwayatkelas(token);
    let nourut = db.nis ==""?"xx":parseInt(db.nis.substring(6,9));
    let html ="";//`<div style="width:595px;margin:0 auto">`;
    html +=`<h4 style="text-align:center">LEMBAR BUKU INDUK REGISTER</h4><br>`;
    html +=`<table style="width:98%;margin:5px auto;border-collapse:collapse;border-spacing:0;font-size:12px">`;
    html +=`<tr><td style="width:30%;padding:2px 5px">NOMOR INDUK SEKOLAH</td><td style="width:1px;vertical-align:top">:</td>`;
    html +=`<td style="width:20%;padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-dbindukutama="nis"  type="text" style="border: none transparent;outline: none;width:100%"></td><td colspan="2"></td>`;
    html +=`<td style="width:15%;padding:2px 5px;text-align:center;border:.5pt solid black">NOMOR URUT</td></tr>`;
    html +=`<tr><td style="width:30%;padding:2px 5px;vertical-align:top">NOMOR INDUK SISWA NASIONAL</td><td style="width:1px;vertical-align:top">:</td>`
    html +=`<td style="padding:2px 5px;vertical-align:top" onclick="this.querySelector('input').focus();"><input data-dbindukutama="nisn"  type="text" style="border: none transparent;outline: none;width:100%"></td>`;
    html +=`<td colspan="2"></td><td rowspan="3" style="font-size:16px;text-align:center;vertical-align:middle;border:.5pt solid black">${nourut}</td></tr>`;
    html +=`<tr><td colspan="6"></td></tr><tr><td colspan="6"></td></tr></table>`;
    html +=`<table style="width:98%;margin:5px auto;border-collapse:collapse;border-spacing:0;font-size:12px">`;
    html +=`<tr><td style="vertical-align:top"><b>A.</b></td><td colspan="6" style="padding:2px 5px;vertical-align:top"><b>KETERANGAN SISWA</b></td><td style="width:2.3cm"></td></tr>`;
    html +=`<tr><td rowspan="26"></td>`;
        html +=`<td style="padding:2px 1px;vertical-align:top">1.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Nama Murid</td><td></td><td style="width:58%;padding:2px 5px 2px 5px;"></td><td></td>`;
        if(koleksipoto.length == 0){
            html +=`<td rowspan="5" title="klik 2 kali untuk menambahkan poto atau menghapusnya" style="cursor:pointer;border:.5pt solid black;text-align:center;font-size:5px;padding:2px 5px" ondblclick="tambahkanpotoinduk(this,${token})"><img src="https://drive.google.com/uc?export=view&id=${idlogo}" style="width:2cm;height:2.4cm" class="srcpotoinduksiswa"><br>Cap tiga jari tengah kiri mengenai pas poto</td></tr>`;
        }else{
            let urlimg = koleksipoto[0] !=undefined?`https://drive.google.com/uc?export=view&id=${koleksipoto[0]}`:`https://drive.google.com/uc?export=view&id=${idlogo}`;
            ////let hidega = koleksipoto[0] !=undefined?"":" w3-hide-small";
            html +=`<td rowspan="5" title="klik 2 kali untuk menambahkan poto atau menghapusnya" style="cursor:pointer;border:.5pt solid black;text-align:center;font-size:5px;padding:2px 5px" ondblclick="tambahkanpotoinduk(this,${token})"><img src="${urlimg}" style="width:2cm;height:2.4cm" class="srcpotoinduksiswa"><br>Cap tiga jari tengah kiri mengenai pas poto</td></tr>`;
        }
        html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">a.</td><td style="width:23%;padding:2px 5px;vertical-align:top">Lengkap</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        html +=`<input data-dbindukutama="pd_nama" type="text" style="border: none transparent;outline: none;width:100%">`;
        html+=`</td><td style="width:.5%">&nbsp;</td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">b.</td><td style="padding:2px 5px;vertical-align:top">Panggilan</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
    html +=`<input data-dbindukutama="nama_panggilan" type="text" style="border: none transparent;outline: none;width:100%">`;
    html +=`</td><td></td></tr>`;
    html +=`<tr><td style="padding:2px 1px;vertical-align:top">2.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Jenis Kelamin</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
    html +=`<select style="width:100%;border: none transparent;outline: none" data-dbindukutama="pd_jk"><option value="L">Laki-laki</option><option value="P">Perempuan</option></select>`    
    // html +=`${db.pd_jk=="L"?"Laki-laki":"Perempuan"}`

        html +=`</td><td></td></tr>`;
    html +=`<tr><td style="padding:2px 1px;vertical-align:top">3.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Kelahiran</td><td></td><td style="padding:2px 5px 2px 5px;"></td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">a.</td><td style="padding:2px 5px;vertical-align:top">Tempat Lahir</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        //html+=`${db.pd_tl}`;
        html +=`<input data-dbindukutama="pd_tl" type="text" style="width:100%;border: none transparent;outline: none">`
        html+=`</td><td></td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">b.</td><td style="padding:2px 5px;vertical-align:top">Tanggal Lahir</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        html+=`<input type="date" data-dbindukutama="pd_tanggallahir" style="border: none transparent;outline: none">`;
        //html +=`${db.pd_tanggallahir == ""?"":tanggalfull(new Date(db.pd_tanggallahir))}`;
        html +=`</td><td></td>`
        //poto
        if(koleksipoto.length == 0){
            html +=`<td rowspan="5" title="klik 2 kali untuk menambahkan poto atau menghapusnya" style="cursor:pointer;border:.5pt solid black;text-align:center;font-size:5px;padding:2px 5px" ondblclick="tambahkanpotoinduk(this,${token})"><img src="https://drive.google.com/uc?export=view&id=${idlogo}" style="width:2cm;height:2.4cm" class="srcpotoinduksiswa"><br>Cap tiga jari tengah kiri mengenai pas poto</td></tr>`;
        }else{
            let urlimg = koleksipoto[1] !=undefined?`https://drive.google.com/uc?export=view&id=${koleksipoto[1]}`:`https://drive.google.com/uc?export=view&id=${idlogo}`;
            ////let hidega = koleksipoto[1] !=undefined?"":" w3-hide-small";
            html +=`<td rowspan="5" title="klik 2 kali untuk menambahkan poto atau menghapusnya" style="cursor:pointer;border:.5pt solid black;text-align:center;font-size:5px;padding:2px 5px" ondblclick="tambahkanpotoinduk(this,${token})"><img src="${urlimg}" style="width:2cm;height:2.4cm" class="srcpotoinduksiswa"><br>Cap tiga jari tengah kiri mengenai pas poto</td></tr>`;
        }
        html +=`<tr><td style="padding:2px 1px;vertical-align:top">4.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Agama</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        //html +=`${db.pd_agama}`;
        html +=`<select data-dbindukutama="pd_agama" style="width:100%;border: none transparent;outline: none"><option value=""></option><option value="ISLAM">ISLAM</option><option value="KRISTEN">KRISTEN/PROTESTAN</option><option value="KATHOLIK">KATHOLIK</option><option value="HINDU">HINDU</option><option value="BUDHA">BUDHA</option><option value="KHONGHUCU">KHONGHUCU</option><option value="Kepercayaan Lain">Kepercayaan Lainnya</option></select>`;
        html +=`</td><td></td></tr>`;
    html +=`<tr><td style="padding:2px 1px;vertical-align:top">5.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Kewarganegaraan</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        html +=`<input type="text" style="border: none transparent;outline: none;width:100%" data-dbindukutama="dapo_wni" value="WNI">`;//`${db.dapo_wni==""?"WNI":db.dapo_wni}`;
        html ==`</td><td></td></tr>`;
    html +=`<tr><td style="padding:2px 1px;vertical-align:top">6.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Anak Ke</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        html +=`<input type="number" style="border: none transparent;outline: none;width:100%" data-dbindukutama="dapo_anakkeberapa" >`;//`${db.dapo_anakkeberapa}`;
        html +=`</td><td></td></tr>`;
    html +=`<tr><td style="padding:2px 1px;vertical-align:top">7.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Jumlah Saudara</td><td></td><td style="padding:2px 5px 2px 5px">`;
        html +=`</td><td></td></tr>`;
        //end poto
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">a.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Kandung</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        html +=`<input type="number" style="border: none transparent;outline: none;width:100%" data-dbindukutama="dapo_jumlahsaudarakandung" >`;//`${db.dapo_jumlahsaudarakandung}`;
        html+=`</td><td></td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">b.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Tiri</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        html +=`<input type="number" data-dbindukutama="jumlahsaudaratiri" style="border: none transparent;outline: none; width:100%"></td><td></td>`;
        //poto
        if(koleksipoto.length == 0){
            html +=`<td rowspan="5" title="klik 2 kali untuk menambahkan poto atau menghapusnya" style="cursor:pointer;border:.5pt solid black;text-align:center;font-size:5px;padding:2px 5px" ondblclick="tambahkanpotoinduk(this,${token})"><img src="https://drive.google.com/uc?export=view&id=${idlogo}" style="width:2cm;height:2.4cm" class="srcpotoinduksiswa"><br>Cap tiga jari tengah kiri mengenai pas poto</td></tr>`;
        }else{
            let urlimg = koleksipoto[2] !=undefined?`https://drive.google.com/uc?export=view&id=${koleksipoto[2]}`:`https://drive.google.com/uc?export=view&id=${idlogo}`;
            
            html +=`<td rowspan="5" title="klik 2 kali untuk menambahkan poto atau menghapusnya" style="cursor:pointer;border:.5pt solid black;text-align:center;font-size:5px;padding:2px 5px" ondblclick="tambahkanpotoinduk(this,${token})"><img src="${urlimg}" style="width:2cm;height:2.4cm" class="srcpotoinduksiswa "><br>Cap tiga jari tengah kiri mengenai pas poto</td></tr>`;
        }
        html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">c.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Angkat</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        html +=`<input type="number" data-dbindukutama="jumlahsaudaraangkat" style="border: none transparent;outline: none;width:100%"></td><td></td>`;
        html+=`</tr>`;
    html +=`<tr><td style="padding:2px 1px;vertical-align:top">8.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Bahasa Sehari-hari di Rumah</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        html +=`<input type="text" data-dbindukutama="bahasaseharihari" style="border: none transparent;outline: none;width:100%"></td><td></td>`;
        html +=`</tr>`;
    html +=`<tr><td style="padding:2px 1px;vertical-align:top">9.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Golongan Darah</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        html +=`<input type="text" data-dbindukutama="golongandarah" style="border: none transparent;outline: none;width:100%"></td><td></td>`;
        html +=`</tr>`;
    html +=`<tr><td style="padding:2px 1px;vertical-align:top">10.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Alamat Saat direkam</td><td></td><td style="padding:2px 5px 2px 5px">`;
        html +=`</td><td></td></tr>`;
        //end poto
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">a.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Alamat(Jalan)</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        //html +=`${db.pd_alamat}`;
        html +=`<input type="text" data-dbindukutama="pd_alamat" style="border: none transparent;outline: none;width:100%">`
        html+=`</td><td></td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">b.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">RT/RW</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        //html +=`${db.dapo_rt}/${db.dapo_rw}`;
        html +=`<input type="text" data-dbindukutama="dapo_rt" style="border: none transparent;outline: none;width:30px">/<input type="text" data-dbindukutama="dapo_rw" style="border: none transparent;outline: none;width:30px">`;
        html +=`</td><td></td>`
        //poto
        if(koleksipoto.length == 0){
            html +=`<td rowspan="5" title="klik 2 kali untuk menambahkan poto atau menghapusnya" style="cursor:pointer;border:.5pt solid black;text-align:center;font-size:5px;padding:2px 5px" ondblclick="tambahkanpotoinduk(this,${token})"><img src="https://drive.google.com/uc?export=view&id=${idlogo}" style="width:2cm;height:2.4cm" class="srcpotoinduksiswa"><br>Cap tiga jari tengah kiri mengenai pas poto</td></tr>`;
        }else{
            let urlimg = koleksipoto[3] !=undefined?`https://drive.google.com/uc?export=view&id=${koleksipoto[3]}`:`https://drive.google.com/uc?export=view&id=${idlogo}`;
            
            html +=`<td rowspan="5" title="klik 2 kali untuk menambahkan poto atau menghapusnya" style="cursor:pointer;border:.5pt solid black;text-align:center;font-size:5px;padding:2px 5px" ondblclick="tambahkanpotoinduk(this,${token})"><img src="${urlimg}" style="width:2cm;height:2.4cm" class="srcpotoinduksiswa"><br>Cap tiga jari tengah kiri mengenai pas poto</td></tr>`;
        }
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">c.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Kelurahan/Desa</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        html +=`<input type="text" data-dbindukutama="dapo_kelurahan" style="border: none transparent;outline: none;width:100%">`;
        html +=`</td><td></td></tr>`
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">d.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Kecamatan</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        html +=`<input type="text" data-dbindukutama="dapo_kecamatan" style="border: none transparent;outline: none;width:100%">`;
        html +=`</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">e.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Kota</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        html +=`<input type="text" data-dbindukutama="dapo_kota" style="border: none transparent;outline: none;width:100%">`;
        html +=`</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">f.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Provinsi</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        html +=`<input type="text" data-dbindukutama="dapo_provinsi" style="border: none transparent;outline: none;width:100%">`;
        html +=`</td><td></td></tr>`;
        //end poto
    html +=`<tr><td style="padding:2px 1px;vertical-align:top">11.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Kode Pos / No HP / Telpon</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        // html +=`${db.dapo_kodepos}/${db.pd_hp}`;
        html +=`<input type="text" data-dbindukutama="dapo_kodepos" style="border: none transparent;outline: none;width:50px">/<input type="text" data-dbindukutama="pd_hp" style="border: none transparent;outline: none;width:70%">`
        html +=`</td><td></td><td></td></tr>`;
    html +=`<tr><td style="padding:2px 1px;vertical-align:top">12.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Tinggal Bersama</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        // html +=`${db.dapo_jenistinggal}`
        html +=`<select data-dbindukutama="dapo_jenistinggal" style="border: none transparent;outline: none;width:100%"><option value=""></option><option value="Bersama Orang Tua">Bersama Orang tua</option><option value="Wali">Wali</option><option value="Kos">Kos</option><option value="Asrama">Asrama</option><option value="Panti Asuhan">Panti Asuhan</option><option value="Lainnya">Lainnya</option></select>`;
        html +=`</td><td></td>`;
        //poto
        if(koleksipoto.length == 0){
            html +=`<td rowspan="5" title="klik 2 kali untuk menambahkan poto atau menghapusnya" style="cursor:pointer;border:.5pt solid black;text-align:center;font-size:5px;padding:2px 5px" ondblclick="tambahkanpotoinduk(this,${token})"><img src="https://drive.google.com/uc?export=view&id=${idlogo}" style="width:2cm;height:2.4cm" class="srcpotoinduksiswa"><br>Cap tiga jari tengah kiri mengenai pas poto</td></tr>`;
        }else{
            let urlimg = koleksipoto[4] !=undefined?`https://drive.google.com/uc?export=view&id=${koleksipoto[4]}`:`https://drive.google.com/uc?export=view&id=${idlogo}`;
            ////let hidega = koleksipoto[4] !=undefined?"":" w3-hide-small";
            html +=`<td rowspan="5" title="klik 2 kali untuk menambahkan poto atau menghapusnya" style="cursor:pointer;border:.5pt solid black;text-align:center;font-size:5px;padding:2px 5px" ondblclick="tambahkanpotoinduk(this,${token})"><img src="${urlimg}" style="width:2cm;height:2.4cm" class="srcpotoinduksiswa"><br>Cap tiga jari tengah kiri mengenai pas poto</td></tr>`;
        }
    html +=`<tr><td style="padding:2px 1px;vertical-align:top">13.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Jarak Ke Sekolah</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        //html +=`${db.dapo_jarakrumahkesekolah}`;
        html +=`<input type="text" data-dbindukutama="dapo_jarakrumahkesekolah" style="width:50px;border: none transparent;outline: none"> Km.`
        html +=`</td><td></td></tr>`;
    html +=`<tr><td colspan="7">&nbsp;</td></tr>`
    html +=`<tr><td style="vertical-align:top"><b>B.</b></td><td colspan="6" style="padding:2px 5px;vertical-align:top"><b>KETERANGAN ORANG TUA /WALI PESERTA DIDIK</b></td></tr>`;
    html +=`<tr><td rowspan="9"></td><td style="padding:2px 1px;vertical-align:top">14.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Nama Orang Tua Kandung</td><td></td><td style="padding:2px 5px 2px 5px">`;
        html +=`</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">a.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Ayah Kandung</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        //html +=`${db.pd_namaayah}`;
        html +=`<input type="text" data-dbindukutama="pd_namaayah" style="border: none transparent;outline: none;width:100%">`;
        html +=`</td><td></td><td></td></tr>`;
        //end poto
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">b.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Ibu Kandung</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        html +=`<input type="text" data-dbindukutama="pd_namaibu" style="border: none transparent;outline: none;width:100%">`;
        html +=`</td><td></td>`;
        //poto
        if(koleksipoto.length == 0){
            html +=`<td rowspan="5" title="klik 2 kali untuk menambahkan poto atau menghapusnya" style="cursor:pointer;border:.5pt solid black;text-align:center;font-size:5px;padding:2px 5px" ondblclick="tambahkanpotoinduk(this,${token})"><img src="https://drive.google.com/uc?export=view&id=${idlogo}" style="width:2cm;height:2.4cm" class="srcpotoinduksiswa"><br>Cap tiga jari tengah kiri mengenai pas poto</td></tr>`;
        }else{
            let urlimg = koleksipoto[5] !=undefined?`https://drive.google.com/uc?export=view&id=${koleksipoto[5]}`:`https://drive.google.com/uc?export=view&id=${idlogo}`;
            ////let hidega = koleksipoto[5] !=undefined?"":" w3-hide-small";
            html +=`<td rowspan="5" title="klik 2 kali untuk menambahkan poto atau menghapusnya" style="cursor:pointer;border:.5pt solid black;text-align:center;font-size:5px;padding:2px 5px" ondblclick="tambahkanpotoinduk(this,${token})"><img src="${urlimg}" style="width:2cm;height:2.4cm" class="srcpotoinduksiswa"><br>Cap tiga jari tengah kiri mengenai pas poto</td></tr>`;
        }
    html +=`<tr><td style="padding:2px 1px;vertical-align:top">15.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Pendidikan Terakhir</td><td></td><td style="padding:2px 5px 2px 5px">`;
        html +=`</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">a.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Ayah Kandung</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        // html +=`${db.dapo_jenjangpendidikanayah}`;
        // html +=`<input type="text" data-dbindukutama="dapo_jenjangpendidikanayah" style="border: none transparent;outline: none;width:100%">`;
        html +=`<select data-dbindukutama="dapo_jenjangpendidikanayah" style="border: none transparent;outline: none;width:100%"><option value=""></option><option value="Tidak Sekolah">Tidak Sekolah</option><option value="Putus SD">Putus SD</option><option value="SD Sederajat">SD Sederajat</option><option value="SMP Sederajat">SMP Sederajat</option><option value="SMA Sederajat">SMA Sederajat</option><option value="DI">D1</option><option value="D2">D2</option><option value="D3">D3</option><option value="D4/S1">D4/S1</option><option value="S2">S2</option><option value="S3">S3</option></select>`;
        html +=`</td><td></td></tr>`;
        
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">b.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Ibu Kandung</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        html +=`<select data-dbindukutama="dapo_jenjangpendidikanibu" style="border: none transparent;outline: none;width:100%"><option value=""></option><option value="Tidak Sekolah">Tidak Sekolah</option><option value="Putus SD">Putus SD</option><option value="SD Sederajat">SD Sederajat</option><option value="SMP Sederajat">SMP Sederajat</option><option value="SMA Sederajat">SMA Sederajat</option><option value="DI">D1</option><option value="D2">D2</option><option value="D3">D3</option><option value="D4/S1">D4/S1</option><option value="S2">S2</option><option value="S3">S3</option></select>`;
        html +=`</td><td></td></tr>`;
    html +=`<tr><td style="padding:2px 1px;vertical-align:top">16.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Pekerjaan Orang Tua</td><td></td><td style="padding:2px 5px 2px 5px">`;
        html +=`</td><td></td></tr>`;
        //end poto
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">a.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Ayah Kandung</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        //html +=`${db.dapo_pekerjaanayah}`;
        html +=`<select data-dbindukutama="dapo_pekerjaanayah" style="border: none transparent;outline: none;width:100%"><option value=""></option><option value="Tidak bekerja">Tidak bekerja</option><option value="Nelayan">Nelayan</option><option value="Petani">Petani</option><option value="Peternak">Peternak</option><option value="PNS/TNI/Polri">PNS/TNI/Polri</option><option value="Karyawan Swasta">Karyawan Swasta</option><option value="Pedagang Kecil">Pedagang Kecil</option><option value="Pedagang Besar">Pedagang Besar</option><option value="Wiraswasta">Wiraswasta</option><option value="Wirausaha">Wirausaha</option><option value="Buruh">Buruh</option><option value="Pensiunan">Pensiunan</option><option value="Tenaga Kerja Indonesia (TKI)">Tenaga Kerja Indonesia (TKI)</option><option value="Tidak dapat diterapkan">Tidak dapat diterapkan</option><option value="Meninggal Dunia">Meninggal Dunia</option><option value="Lainnya">Lainnya</option></select>`;
        
        html +=`</td><td></td><td></td></tr>`;
        
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">b.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Ibu Kandung</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        html +=`<select data-dbindukutama="dapo_pekerjaanibu" style="border: none transparent;outline: none;width:100%"><option value=""></option><option value="Tidak bekerja">Tidak bekerja</option><option value="Nelayan">Nelayan</option><option value="Petani">Petani</option><option value="Peternak">Peternak</option><option value="PNS/TNI/Polri">PNS/TNI/Polri</option><option value="Karyawan Swasta">Karyawan Swasta</option><option value="Pedagang Kecil">Pedagang Kecil</option><option value="Pedagang Besar">Pedagang Besar</option><option value="Wiraswasta">Wiraswasta</option><option value="Wirausaha">Wirausaha</option><option value="Buruh">Buruh</option><option value="Pensiunan">Pensiunan</option><option value="Tenaga Kerja Indonesia (TKI)">Tenaga Kerja Indonesia (TKI)</option><option value="Tidak dapat diterapkan">Tidak dapat diterapkan</option><option value="Meninggal Dunia">Meninggal Dunia</option><option value="Lainnya">Lainnya</option></select>`;
        
        html +=`</td><td></td><td></td></tr>`;
    // html +=`</table><div style="break-after:page"></div>`;
    // html +=`<table style="width:98%;margin:5px auto;border-collapse:collapse;border-spacing:0;font-size:12px" border="1">`;
    html +=`<tr><td rowspan="5">&nbsp;</td>
        <td style="padding:2px 1px;vertical-align:top;width:2px">17.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Wali Murid</td><td></td><td style="padding:2px 5px 2px 5px;">`;
        html +=`</td><td></td><td style="width:13%"></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px">a.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Nama Wali</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        html +=`<input type="text" data-dbindukutama="dapo_namawali" style="border: none transparent;outline: none;width:100%">`;
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px">b.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Hubungan Keluarga</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        //
        html +=`<input type="text" data-dbindukutama="hubunganwali" style="border: none transparent;outline: none;width:100%">`;
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px">c.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Pendidikan Wali</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        
        html +=`<select data-dbindukutama="dapo_jenjangpendidikanwali" style="border: none transparent;outline: none;width:100%"><option value=""></option><option value="Tidak Sekolah">Tidak Sekolah</option><option value="Putus SD">Putus SD</option><option value="SD Sederajat">SD Sederajat</option><option value="SMP Sederajat">SMP Sederajat</option><option value="SMA Sederajat">SMA Sederajat</option><option value="DI">D1</option><option value="D2">D2</option><option value="D3">D3</option><option value="D4/S1">D4/S1</option><option value="S2">S2</option><option value="S3">S3</option></select>`;
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px">d.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Pekerjaan Wali</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        //html +=`${db.dapo_pekerjaanwali}`;
        html +=`<select data-dbindukutama="dapo_pekerjaanwali" style="border: none transparent;outline: none;width:100%"><option value=""></option><option value="Tidak bekerja">Tidak bekerja</option><option value="Nelayan">Nelayan</option><option value="Petani">Petani</option><option value="Peternak">Peternak</option><option value="PNS/TNI/Polri">PNS/TNI/Polri</option><option value="Karyawan Swasta">Karyawan Swasta</option><option value="Pedagang Kecil">Pedagang Kecil</option><option value="Pedagang Besar">Pedagang Besar</option><option value="Wiraswasta">Wiraswasta</option><option value="Wirausaha">Wirausaha</option><option value="Buruh">Buruh</option><option value="Pensiunan">Pensiunan</option><option value="Tenaga Kerja Indonesia (TKI)">Tenaga Kerja Indonesia (TKI)</option><option value="Tidak dapat diterapkan">Tidak dapat diterapkan</option><option value="Meninggal Dunia">Meninggal Dunia</option><option value="Lainnya">Lainnya</option></select>`;
        
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td colspan="8">&nbsp;</td></tr>`
    html +=`<tr><td style="vertical-align:top"><b>C.</b></td><td colspan="6" style="padding:2px 5px;vertical-align:top"><b>PERKEMBANGAN PESERTA DIDIK</b></td><td></td></tr>`;
    html +=`<tr><td rowspan="12"></td>`;
        html +=`<td style="padding:2px 1px;vertical-align:top">18.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Pendidikan Sebelumnya</td><td></td><td style="padding:2px 5px 2px 5px;"></td><td></td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px">a.</td>`;
        html+=`<td colspan="3" style="padding:2px 5px;vertical-align:top">Masuk Sebagai Peserta Didik Baru</td>`;
        html +=`<td style="width:.5%">&nbsp;</td><td></td></tr>`
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px"></td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">1) Asal Sekolah</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        html +=`<input type="text" data-dbindukutama="dapo_sekolahasal" style="border: none transparent;outline: none;width:100%">`;
        
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px"></td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">2) Nama Sekolah</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        
        html +=`<input type="text" data-dbindukutama="namasekolahasaltk" style="border: none transparent;outline: none;width:100%">`;
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px"></td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">3) No Ijazah TK/RA</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        html +=`<input type="text" data-dbindukutama="noijazahtk" style="border: none transparent;outline: none;width:100%">`;
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px"></td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">4) Tannggal Ijazah TK/RA</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        
        html+=`<input type="date" data-dbindukutama="tanggalijazahtk" style="border: none transparent;outline: none">`;
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px">b.</td>`;
        html+=`<td colspan="3" style="padding:2px 5px;vertical-align:top">Pindahan dari Sekolah Lain</td>`;
        html +=`<td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px"></td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">1) Nama Sekolah Asal</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        // html +=`${dbinduk.masuk_dari}`;
        html +=`<input type="text" data-dbindukutama="masuk_dari" style="border: none transparent;outline: none;width:100%">`;
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px"></td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">2) Diterima Tanggal</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        ;//html +=`${dbinduk.masuk_tgl ==""?"":tanggalfull(new Date(dbinduk.masuk_tgl))}`;
        html+=`<input type="date" data-dbindukutama="masuk_tgl" style="border: none transparent;outline: none">`;
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px"></td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">2) Diterima di Kelas</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;" class="td_deteksi_kelas">`;
        if(syarat.asalsiswa == "Pindahan"){
            html +=`<span class="w3-hide-small">${syarat.kelasawal}</span>`;
        }
        
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px"></td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">3) Diterima di semester</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;" class="td_deteksi_semester">`;
        if(syarat.asalsiswa == "Pindahan"){
        html +=`<span class="w3-hide-small">${diterimadisemester(db.masuk_tgl)}</span>`;
        }
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px"></td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">4) Berkas Dokumen Mutasi</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;" class="td_deteksi_semester">`;
        html +=`<button class="w3-hide-small" onclick="uploaddokumeninduk(false,5,7)"><i class="fa fa-upload"></i> Unggah File</button>`;
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td colspan="8">&nbsp;</td></tr>`
    html +=`<tr><td style="vertical-align:top"><b>D.</b></td><td colspan="6" style="padding:2px 5px;vertical-align:top"><b>MENINGGALKAN SEKOLAH</b></td><td></td></tr>`;
    html +=`<tr><td rowspan="11"></td>`;
        html +=`<td style="padding:2px 1px;vertical-align:top">19.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Tamat Belajar/Lulus</td><td></td><td style="padding:2px 5px 2px 5px;"></td><td></td><td></td></tr>`;
    
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px">a.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Tanggal Lulus</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        html+=`<input type="date" data-dbindukutama="keluar_tgl" style="border: none transparent;outline: none">`;
        // html +=`${db.keluar_tgl==""?"":tanggalfull(new Date(db.keluar_tgl))}`;
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px">b.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Nomor Seri Ijazah/STTB</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        // html +=`${db.dapo_noseriijazah}`;
        html +=`<input type="text" data-dbindukutama="dapo_noseriijazah" style="border: none transparent;outline: none;width:100%">`;
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px">c.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Melanjutkan ke Sekolah</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        // html +=`${dbinduk.smp_ke}`;
        html +=`<input type="text" data-dbindukutama="smp_ke" style="border: none transparent;outline: none;width:100%">`;
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    
    html +=`<tr><td style="padding:2px 1px;vertical-align:top">20.</td>`;
        html +=`<td colspan="2" style="padding:2px 5px;vertical-align:top">Pindah Sekolah</td><td></td><td style="padding:2px 5px 2px 5px;"></td><td></td><td></td></tr>`;
    
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px">a.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Kelas yang ditinggallkan</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        // html +=`${dbinduk.kelas_keluar}`;
        html +=`<input type="number" data-dbindukutama="kelas_keluar" min="1" max="6" style="border: none transparent;outline: none;width:100%">`;
        
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px">b.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Ke Sekolah</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        // html +=`${dbinduk.pindah_ke}`;
        html +=`<input type="text" data-dbindukutama="pindah_ke" style="border: none transparent;outline: none;width:100%">`;
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px">c.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Ke Tingkat</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        // html +=`${dbinduk.smp_ke}`;
        html +=`<input type="number" data-dbindukutama="kelas_pindah_ke_kelas" min="1" max="6" style="border: none transparent;outline: none;width:100%">`;
        
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
        html +=`<tr><td style="padding:2px 1px;vertical-align:top">21.</td>`;
        html +=`<td colspan="2" style="padding:2px 5px;vertical-align:top">Keluar Sekolah</td><td></td><td style="padding:2px 5px 2px 5px;"></td><td></td><td></td></tr>`;
    
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px">a.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Alasan Keluar</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        //html +=`${dbinduk.alasan_keluar}`;
        html +=`<input type="text" data-dbindukutama="alasan_keluar" style="border: none transparent;outline: none;width:100%">`;
        
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px">b.</td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">Tanggal Keluar Sekolah</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        html+=`<input type="date" data-dbindukutama="keluar_tgl2" style="border: none transparent;outline: none">`;
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;

    html +=`<tr><td colspan="8">&nbsp;</td></tr>`;
    html +=`<tr><td style="vertical-align:top"><b>E.</b></td><td colspan="6" style="padding:2px 5px;vertical-align:top"><b>LAIN-LAIN</b></td><td></td></tr>`;

    let thd_bb = ``;
    let thd_tpskt = "";
    let thd_ket = "";
    let td_dengar = "";
    let td_lihat = "";
    let td_gigi = "";
    let td_penyakit = "";
    let thd_ss = ``;
    let td_tb = ``;
    let td_bb = ``;
    let at_dis = ""
    let tapeljalan, tekstapel;
    let koleksitapel = syarat.banyaktapel >=6 ? syarat.banyaktapel:6;
    tapeljalan = "";//1920 
    let tapelawal = syarat.tapelawal;
    let tapelakhir = syarat.tapelakhir;
    let kelasawal = syarat.kelasawal;
    // console.log(syarat);
    let boolean_riwayatapel = syarat.hasOwnProperty("datariwayattapel");
    let warnatdskt =""
    for(let i = 0 ; i < koleksitapel ; i++){
        at_dis = "";
        warnatdskt =""
        let warnatd1 = "",warnatd2 = "";
        let valueBB = "", valueTB = "";
        let valueBB2 = "", valueTB2 = "";
        let warnatapelsekarang = "";//bentuknya style tapi spasi awal:
        let warnaselaktif1 = "",warnaselaktif2 = "";
        let atribut_dis1 = "",atribut_dis2 = ""
        tapeljalan = (tapelawal + (101 * i));
        tekstapel = string_tapel_darinis(tapeljalan);
        if(tapeljalan == tapelakhir){
            warnatapelsekarang = "background-color:#7FFF00";
            if(idSemester == 2){
                warnaselaktif2 = ` style="height:43px;background-color:#7FFF00"`
                warnaselaktif1 = ` syle="height:43px;"`;
                warnatd1 = ``
                warnatd2 = `;background-color:#7FFF00`;

                valueBB2 = ` value="${db.dapo_beratbadan}"`;
                valueTB2 = ` value="${db.dapo_tinggibadan}"`;
                //valueBB2 = ` value="${db.dapo_beratbadan}"`;
            }else{
                atribut_dis2 = "disabled"
                atribut_dis1 = ""
                warnaselaktif1 = ` style="height:43px;background-color:#7FFF00"`
                warnaselaktif2 = ``;
                warnatd2 = `;background-color:#7FFF00`
                warnatd1 = ``;
                valueBB = ` value="${db.dapo_beratbadan}"`;
                valueTB = ` value="${db.dapo_tinggibadan}"`;
            }
            
        }else if(tapeljalan > tapelakhir){
            warnaselaktif2 = `;background-color:#f1f1f1`;
            warnaselaktif1 = `;background-color:#f1f1f1`;
            warnatdskt =`background-color:#f1f1f1`;
            atribut_dis2 = "disabled";
            atribut_dis1 = "disabled";
            at_dis = "disabled";
            warnatd2 = `;background-color:#f1f1f1`
            warnatd1 = `;background-color:#f1f1f1`;
        }else{
            atribut_dis2 = "";
            atribut_dis1 = "";
        }
        
        let namakelas;
        if(boolean_riwayatapel){
            let obj = syarat.datariwayattapel.filter(s => s.tapel == tapeljalan)
            namakelas = obj.length> 0 ?obj[0].kelas:"...";
        }else{
            
            namakelas = (i+ kelasawal)>6?"...":(i+ kelasawal);
        }
        thd_bb += `<th colspan="2" style="${i == 0?"height:43px;":"color:black;"}${warnatapelsekarang}">Kelas ${namakelas}<br>${tekstapel}</th>`;
        thd_tpskt += `<th style="color:black;${warnatapelsekarang}">Kelas ${namakelas}<br>${tekstapel}</th>`;
        thd_ket +=`<th style="color:black;${warnatapelsekarang}">Keterangan</th>`;
        td_dengar += `<td style="padding:2px 5px;${warnatapelsekarang==""?warnatdskt:warnatapelsekarang}"><input ${at_dis} type="text" data-input_kondisi_kesehatan="pendengaran"  data-input_tapel_kesehatan="${tapeljalan}" style="border: none transparent;outline: none;width:100%;background-color:transparent;" ></td>`;
        td_lihat += `<td style="padding:2px 5px;${warnatapelsekarang==""?warnatdskt:warnatapelsekarang}"><input ${at_dis} type="text" data-input_kondisi_kesehatan="penglihatan"  data-input_tapel_kesehatan="${tapeljalan}" style="border: none transparent;outline: none;width:100%;background-color:transparent;" ></td>`;
        td_gigi += `<td style="padding:2px 5px;${warnatapelsekarang==""?warnatdskt:warnatapelsekarang}"><input ${at_dis} type="text" data-input_kondisi_kesehatan="gigi"  data-input_tapel_kesehatan="${tapeljalan}" style="border: none transparent;outline: none;width:100%;background-color:transparent;" ></td>`;
        td_penyakit +=`<td style="padding:2px 5px;${warnatapelsekarang==""?warnatdskt:warnatapelsekarang}"><input ${at_dis} type="text" data-input_kondisi_kesehatan="penyakit"  data-input_tapel_kesehatan="${tapeljalan}" style="border: none transparent;outline: none;width:100%;background-color:transparent;" ></td>`;

        thd_ss +=`<th ${warnaselaktif1}>1</th><th ${warnaselaktif2}>2</th>`;
        for(let j = 1 ; j <= 2 ; j++){
            if(i == 0 && syarat.semesterawal.indexOf(j)==-1){
                td_tb +=`<td style="padding:2px 5px;background-color:#f1f1f1"><input type="number" style="border: none transparent;outline: none;width:100%;background-color:transparent;" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="${j}" data-tbbb="tb" disabled></td>`;
                td_bb +=`<td style="padding:2px 5px;background-color:#f1f1f1"><input type="number" style="border: none transparent;outline: none;width:100%;background-color:transparent;" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="${j}" data-tbbb="bb" disabled></td>`;
            }else{

                td_tb +=`<td style="padding:2px 5px${j==1?warnatd1:warnatd2}">
                <input type="number" style="border: none transparent;outline: none;width:100%;background-color:transparent;" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="${j}" data-tbbb="tb" ${j==1?atribut_dis1:atribut_dis2}></td>`;
                td_bb +=`<td style="padding:2px 5px${j==1?warnatd1:warnatd2}">
                <input type="number" style="border: none transparent;outline: none;width:100%;background-color:transparent;" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="${j}" data-tbbb="bb" ${j==1?atribut_dis1:atribut_dis2}></td>`;
            }
        }
        // if(syarat.asalsiswa == "PPDB" && syarat.kenaikankelas == "Selalu Naik Kelas"){
        // }
                
    }

    
    html +=`<tr><td rowspan="8"></td>`;
        html +=`<td style="padding:2px 1px;vertical-align:top">1.</td>
        <td colspan="6" style="padding:2px 5px;vertical-align:top">
        TINGGI DAN BERAT BADAN PESERTA DIDIK
        </tr>`;
    // TINGGI DAN BERAT BADAN
    html += `<tr><td colspan="8">`;
    // Start Tinggi Badan dan berat Badan
    html +=`<table id="pageindukidentitas_tbbb" style="width:99%;margin:5px auto;border-collapse:collapse;border-spacing:0;font-size:10px" border="1"><thead>
    <tr style="background-color:#f1f1f1">
        <th rowspan="2">No</th>
        <th rowspan="2" style="width:15%">Aspek yang Dinilai</th>
        <th style="font-size:5px;padding:5px:1px;width:1px;-ms-transform: rotate(-90deg);transform: rotate(-45deg);">Tapel</th>`;
    html +=thd_bb;
    html +=`</tr><tr style="background-color:#f1f1f1">
    <th  style="font-size:5px;padding:5px:1px;width:1px;-ms-transform: rotate(-90deg);transform: rotate(-45deg);">Semester</th>`;
    html +=thd_ss;
    html+=`</tr></thead><tbody>`;
    html +=`<tr><td style="padding:2px 5px">1</td><td style="padding:2px 5px" colspan="2">Tinggi Badan (cm)</td>`
    html +=td_tb;
    html+=`</tr><tr><td style="padding:2px 5px">2</td><td colspan="2" style="padding:2px 5px">Berat Badan (Kg)</td>`;
    html +=td_bb
    html +=`</tr></tbody></table>`
    // end tinggi badan dan berat badan
    html +=`</td></tr>`;

    html +=`<tr><td colspan="8">&nbsp;</td></tr>`;
    
    html +=`<tr><td style="padding:2px 1px;vertical-align:top">2.</td>
        <td colspan="6" style="padding:2px 5px;vertical-align:top">KONDISI KESEHATAN</tr>`;
    
    html += `<tr><td colspan="8">`;
    //START KONDISI KESEHATAN
    html +=`<table style="width:99%;margin:5px auto;border-collapse:collapse;border-spacing:0;font-size:10px" border="1"><thead>
    <tr style="background-color:#f1f1f1">
        <th rowspan="2">No</th>
        <th rowspan="2">Aspek yang Dinilai</th>`;
    html +=thd_tpskt;
    html +=`</tr><tr style="background-color:#f1f1f1">`;
    html += thd_ket;
    html +=`</tr></thead><tbody>`;
    html +=`<tr><td style="padding:2px 5px">1.</td><td style="padding:2px 5px">Pendengaran</td>`;
    html +=td_dengar;
    html +=`</tr><tr><td style="padding:2px 5px">2.</td><td style="padding:2px 5px">Penglihatan</td>`;
    html += td_lihat;
    html +=`</tr><tr><td style="padding:2px 5px">3.</td><td style="padding:2px 5px">Gigi</td>`;
    html += td_gigi;
    html +=`</tr><tr><td style="padding:2px 5px">4.</td><td style="padding:2px 5px">Penyakit Lainnya</td>`;
    html +=td_penyakit;
    html +=`</tr></tbody></table>`;
    // END START KONDISI KESEHATAN
    html +=`</td></tr>`;

    html +=`<tr><td colspan="8">&nbsp;</td></tr>`;
    
    html +=`<tr><td style="padding:2px 1px;vertical-align:top">3.</td>
        <td colspan="6" style="padding:2px 5px;vertical-align:top">DOKUMEN LAINNYA</tr>`;
    
    html += `<tr><td colspan="8">`;
    html +=`<table id="koleksidokumenpribadisiswa" style="width:99%;margin:5px auto;border-collapse:collapse;border-spacing:0;font-size:10px" border="1"><thead>
    <tr style="background-color:#f1f1f1">
        <th>No.</th><th style="width:15%">Dokumen</th><th style="width:30%">URL</th><th class="w3-hide-small" style="width:5%">Aksi</th>
        <th>No.</th><th style="width:15%">Dokumen</th><th style="width:30%">URL</th><th class="w3-hide-small" style="width:5%">Aksi</th>
    </tr></thead><tbody>`;
    html +=`<tr><td style="padding:2px 5px">1.</td><td style="padding:2px 5px">Akte Kelahiran <sup>(s)</sup></td><td style="padding:2px 5px">`;
    if(db.dok_akte !==""){
        html +=`<a href="https://drive.google.com/file/d/${db.dok_akte}/view" target="_blank">File Akte Kelahiran</a>`
    }
    html +=`</td><td class="w3-hide-small" style="padding:2px 5px"><button onclick="alert('Untuk mengedit dokumen link ini, Anda diarahkan mengeditnya di Fitur Database Siswa')" title="Edit File Digital"><i class="fa fa-edit w3-tiny"></i></td>`;
    html +=`<td style="padding:2px 5px">6.</td><td style="padding:2px 5px">KIP <sup>(s)</sup></td><td style="padding:2px 5px">`;
    if(db.dok_kip !==""){
        html +=`<a href="https://drive.google.com/file/d/${db.dok_kip}/view" target="_blank">File KIP</a>`;
    }
    html +=`</td><td class="w3-hide-small" style="padding:2px 5px"><button onclick="alert('Untuk mengedit dokumen link ini, Anda diarahkan mengeditnya di Fitur Database Siswa')" title="Edit File Digital"><i class="fa fa-edit w3-tiny"></i></td></tr>`;
    html +=`<tr><td style="padding:2px 5px">2.</td><td style="padding:2px 5px">Kartu Keluarga <sup>(s)</sup></td><td style="padding:2px 5px">`;
    if(db.dok_kk !==""){
        html +=`<a href="https://drive.google.com/file/d/${db.dok_kk}/view" target="_blank">Kartu Keluarga</a>`;
    }
    html+=`</td><td class="w3-hide-small" style="padding:2px 5px"><button onclick="alert('Untuk mengedit dokumen link ini, Anda diarahkan mengeditnya di Fitur Database Siswa')" title="Edit File Digital"><i class="fa fa-edit w3-tiny"></i></td>`;
    html +=`<td style="padding:2px 5px">7.</td><td style="padding:2px 5px">KKS <sup>(s)</sup></td><td style="padding:2px 5px">`;
    if(db.dok_kks !==""){
        html +=`<a href="https://drive.google.com/file/d/${db.dok_kks}/view" target="_blank">Kartu Keluarga Sejahtera (KKS)</a>`;
    }
    html +=`</td><td class="w3-hide-small" style="padding:2px 5px"><button onclick="alert('Untuk mengedit dokumen link ini, Anda diarahkan mengeditnya di Fitur Database Siswa')" title="Edit File Digital"><i class="fa fa-edit w3-tiny"></i></td></tr>`;

    html +=`<tr><td style="padding:2px 5px">3.</td><td style="padding:2px 5px">Kartu NISN <sup>(m)</sup></td><td style="padding:2px 5px">`;
    html +=anchor_dokumen(dbinduk.dok_kartunisn);
    html +=`</td><td class="w3-hide-small" style="padding:2px 5px"><button onclick="uploaddokumeninduk(false,this.parentNode.parentElement.rowIndex, this.parentNode.cellIndex)" title="Edit File Digital"><i class="fa fa-edit w3-tiny"></i></td>`;
    html +=`<td style="padding:2px 5px">8.</td><td style="padding:2px 5px">Sertifikat/Piagam <sup>(m)</sup></td><td style="padding:2px 5px">`;
    html +=anchor_dokumen(dbinduk.dok_piagam);
    html+=`</td><td class="w3-hide-small" style="padding:2px 5px"><button onclick="uploaddokumeninduk(false,this.parentNode.parentElement.rowIndex, this.parentNode.cellIndex)" title="Edit File Digital"><i class="fa fa-edit w3-tiny"></i></td></tr>`;
    
    html +=`<tr><td style="padding:2px 5px">4.</td><td style="padding:2px 5px">KPS / PKH <sup>(s)</sup></td><td style="padding:2px 5px">`;
    if(db.dok_kpspkh !==""){
        html +=`<a href="https://drive.google.com/file/d/${db.dok_kpspkh}/view" target="_blank">KPS / PKH</a>`;
    }
    html+=`</td><td class="w3-hide-small" style="padding:2px 5px"><button onclick="alert('Untuk mengedit dokumen link ini, Anda diarahkan mengeditnya di Fitur Database Siswa')" title="Edit File Digital"><i class="fa fa-edit w3-tiny"></i></td>`;
    html +=`<td style="padding:2px 5px">9.</td><td style="padding:2px 5px">Ijazah SD <sup>(s)</sup></td><td style="padding:2px 5px">`;
    html +=anchor_dokumen(dbinduk.dok_ijazahsd)
    html +=`</td><td class="w3-hide-small" style="padding:2px 5px"><button onclick="uploaddokumeninduk(false,this.parentNode.parentElement.rowIndex, this.parentNode.cellIndex)" title="Edit File Digital"><i class="fa fa-edit w3-tiny"></i></td></tr>`;
    
    html +=`<tr><td style="padding:2px 5px">5.</td><td style="padding:2px 5px">Raport <sup>(m)</sup></td><td style="padding:2px 5px">`
    html +=anchor_dokumen(dbinduk.dok_raport);
    html +=`</td><td class="w3-hide-small" style="padding:2px 5px"><button onclick="uploaddokumeninduk(false,this.parentNode.parentElement.rowIndex, this.parentNode.cellIndex)" title="Edit File Digital"><i class="fa fa-edit w3-tiny"></i></td>`;

    html +=`<td style="padding:2px 5px">10.</td><td style="padding:2px 5px">Lainnya <sup>(m)</sup></td><td style="padding:2px 5px" id="td_dokumenlainnya">`;
    html +=anchor_dokumen(dbinduk.dok_lainnya);
    html +=`</td><td class="w3-hide-small" style="padding:2px 5px"><button onclick="uploaddokumeninduk(false,this.parentNode.parentElement.rowIndex, this.parentNode.cellIndex)" title="Edit File Digital"><i class="fa fa-edit w3-tiny"></i></td></tr>`;
    html +=`</tbody></table>`

    html +=`</td></tr>`;
    html +=`<tr><td colspan="8">&nbsp;</td></tr>`;
    html +=`<tr><td></td>
    <td style="padding:2px 1px;vertical-align:top">4.</td>
    <td colspan="6" style="padding:2px 5px;vertical-align:top">DATABASE DIGITAL</tr>`;
    html +=`<tr><td></td><td></td><td colspan="2">KODE  </td><td>:</td>
        <td colspan="4" style="padding:2px 5px;vertical-align:top" id="kodefokuspageidentitas">${token}</tr>`;
    html +=`<tr><td></td><td></td><td colspan="2">Terakhir Diperbarui  </td><td>:</td>
        <td colspan="4" style="padding:2px 5px;vertical-align:top" >${tanggalfulllengkap(dbinduk.time_stamp)}</tr>`;
    html +=`<tr><td></td><td></td><td colspan="2">Diperbarui Oleh</td><td>:</td>
        <td colspan="4" style="padding:2px 5px;vertical-align:top" >${dbinduk.dieditoleh}</tr>`;
    html +=`<tr><td></td><td></td><td colspan="2" style="vertical-align:top">Data Kurikulum</td><td style="vertical-align:top">:</td>
        <td colspan="4" style="padding:2px 5px;vertical-align:top;font-size:9px">${html_datakurikuluminduksiswa(token)}</tr>`;
    html +=`<tr><td></td><td></td><td colspan="2"></td><td></td>
        <td colspan="4" style="padding:2px 5px;vertical-align:top" ><input type="file" id="inputfilepotoinduksiswa" style="display:none"></tr>`;
    html += `</table>`;
    
    
    //html +=`<tr><td></td><td colspan="3" style="padding:2px 5px;text-align:right">a.</td><td style="padding:2px 5px;vertical-align:top">Lengkap</td><td style="border-bottom:.5pt dotted black;padding:2px 5px 2px 0">: ${db.pd_nama}</td></tr>`;
    
    // html +=`<tr><td></td><td style="padding:2px 0;text-align:right">b.</td><td style="padding:2px 5px;vertical-align:top">Panggilan</td><td style="border-bottom:.5pt dotted black;padding:2px 5px 2px 0">: </td></td><td style="width:1px"></td></tr>`;
    // html +=`<tr><td style="padding:2px 1px;">2.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Jenis Kelamain</td><td style="border-bottom:.5pt dotted black;padding:2px 5px 2px 0">: ${db.pd_jk == "L"?"Laki-laki":"Perempuan"}</td></td><td style="width:1px"></tr>`;
    // html +=`<tr><td style="padding:2px 5px;">3.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Kelahiran</td><td style="padding:2px 5px;vertical-align:top"></td></td><td style="width:1px"></tr>`;
    // html +=`<tr><td></td><td style="padding:2px 0;text-align:right">a.</td><td style="padding:2px 5px;vertical-align:top">Tanggal Lahir</td><td style="border-bottom:.5pt dotted black;padding:2px 5px 2px 0">: ${db.pd_tanggallahir == ""?"":tanggalfull(new Date(db.pd_tanggallahir))}</td><td></td></td><td style="width:1px"></td><td rowspan="5" style="border:.5pt solid black;text-align:center;font-size:5px;padding:2px 5px">Poto Lagi</td></tr>`;
    // html +=`<tr><td></td><td style="padding:2px 0;text-align:right">b.</td><td style="padding:2px 5px;vertical-align:top">Tempat Lahir</td><td style="border-bottom:.5pt dotted black;padding:2px 5px 2px 0">: ${db.pd_tl}</td></td><td style="width:1px"></td></tr>`;
    
    // html +=`<tr><td style="padding:2px 5px;">4.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Agama</td><td border-bottom:.5pt dotted black;padding:2px 5px 2px 0">${db.pd_agama}</td></td><td style="width:1px"></td></tr>`;
    // html +=`<tr><td style="padding:2px 5px;">5.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Kewarganegaraan</td><td border-bottom:.5pt dotted black;padding:2px 5px 2px 0">WNI</td></td><td style="width:1px"></td></tr>`;
    // html +=`<tr><td style="padding:2px 5px;">6.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Anak Ke</td><td border-bottom:.5pt dotted black;padding:2px 5px 2px 0">${db.dapo_anakkeberapa}</td></td><td style="width:1px"></td></tr>`;


    //html +=`</div>`
    formulirkirim.innerHTML = html;
    let eldata = document.querySelectorAll("[data-dbindukutama]");
    
    for(let i = 0 ; i <eldata.length ; i++){
        let key = eldata[i].getAttribute("data-dbindukutama");
        let val = db[key];
        if(val !== undefined){
            if(eldata[i].type == "date"){
                eldata[i].value = val == ""?"":StringTanggalnol(new Date(val));
            }else{
                eldata[i].value = val;
            }
        }else{
            koleksiundefine.push(key);
            let valinduk = dbinduk[key]
            if(eldata[i].type == "date"){
                eldata[i].value = valinduk == ""?"":StringTanggalnol(new Date(valinduk));
            }else{
                eldata[i].value = valinduk;
            }
        }
    }
    
    let arr_datafisik = dbinduk.riwayat_fisik == ""?[]:JSON.parse(dbinduk.riwayat_fisik);
    if(arr_datafisik.length > 0){
        for(let j = 0 ; j < arr_datafisik.length ; j++){
            let th = arr_datafisik[j].tapel;
            let sm = arr_datafisik[j].semester;
            let tb = arr_datafisik[j].tb;
            let bb = arr_datafisik[j].bb;
            let elinputtb = document.querySelector(`input[data-tapeltbbb='${th}'][data-tbbbsemester='${sm}'][data-tbbb='tb']`);
            let elinputbb = document.querySelector(`input[data-tapeltbbb='${th}'][data-tbbbsemester='${sm}'][data-tbbb='bb']`);
            elinputbb.value = bb;
            elinputtb.value = tb;
        }
    }
    
    let arr_datapenyakit = dbinduk.riwayat_penyakit == ""?[]:JSON.parse(dbinduk.riwayat_penyakit);
    // console.log(arr_datapenyakit);
    if(arr_datapenyakit.length >0){
        for(let k = 0 ; k < arr_datapenyakit.length ; k++){
            let ob = arr_datapenyakit[k];
            let th = ob.tapel;
            let keyOb  = Object.keys(ob);//.map(m => m !== "tapel");
            // console.log(th, ob, keyOb)
            for(l = 0 ; l < keyOb.length ; l++){
                let elinput = document.querySelector(`input[data-input_kondisi_kesehatan='${keyOb[l]}'][data-input_tapel_kesehatan='${th}']`);
                if(elinput !== null){
                    elinput.value = ob[keyOb[l]];
                }else{
                    // console.log("ga ada", `input[data-input_kondisi_kesehatan='${keyOb[l]}'][data-input_tapel_kesehatan='${th}']`)
                }
                
            }
        }
    }

    
    //console.log(koleksiundefine);
    tempattombol_formulirkirim.innerHTML =`<div class="w3-tiny w3-center">
    <button class="w3-btn w3-yellow w3-round-xlarge w3-bottombar w3-border-black" onclick="printadexistelemen('formulirkirim')">PRINT</button>
   <button class="w3-btn w3-pale-green w3-round-xlarge w3-bottombar w3-border-black" id="tombolkirimpageidentitas" onclick="kirimdatabaseidentitasinduk(this,${token})">Kirim Ke Server Buku Induk</button>
    </div>`
}
const html_datakurikuluminduksiswa = (token)=>{
    let db = dbsiswa_bukuinduk.filter(s => s.id == token)[0];
    let ceksyarat = syarat_riwayatkelas(token);
    let banyaktapel = ceksyarat.banyaktapel;
    let tapelawal = ceksyarat.tapelawal;
    let html = ``;
    let tapeljalan = tapelawal;
    let tekstapel = string_tapel_darinis(tapelawal);
    let data_kurikulum = db.data_kurikulum == ""?[]: JSON.parse(db.data_kurikulum);
    if(data_kurikulum.length == 0){
        for(let i = 0 ; i < banyaktapel; i++){
            tapeljalan = tapelawal + (101 * i);
            tekstapel = string_tapel_darinis(tapeljalan);
            html += `<label for="tapelkurikulumsiswa_${tapeljalan}">${tekstapel}:`;
            html +=`<select data-riwayatkurikulumsiswa="${tapeljalan}" class="w3-center" style="width:150px;border: none transparent;outline: none;font-size:9px">`;
            html+=`<option value="06" ${tapeljalan < 1718?"selected":""}>Kurikulum 2006</option>`;
                html+=`<option value="13"${tapeljalan > 1718?"selected":""}>Kurikulum 2013</option>`;
                html+=`<option value="21">Kurikulum Merdeka Belajar</option>`;
                html +=`</select></label><br>`
            }
    }else{
        let cektapelsekarang = data_kurikulum.filter(s => s.tapel == dbinduk_tapel_integer);
        //[{tapel:1718,kurikulum:"13"}]
        if(cektapelsekarang.length == 0){
            tapeljalan = dbinduk_tapel_integer;
            tekstapel = dbinduk_tapel_teks;
            html += `<label for="tapelkurikulumsiswa_${tapeljalan}">${tekstapel}:`;
                html +=`<select data-riwayatkurikulumsiswa="${tapeljalan}" class="w3-center" style="width:150px;border: none transparent;outline: none;font-size:9px">`;
                html+=`<option value="06" ${tapeljalan < 1718?"":"selected"}>Kurikulum 2006</option>`;
                html+=`<option value="13"${tapeljalan > 1718?"":"selected"}>Kurikulum 2013</option>`;
                html+=`<option value="21">Kurikulum Merdeka Belajar</option>`;
                html +=`</select></label><br>`;
            for(let i = 0 ; i < cektapelsekarang.length ; i ++){
                tapeljalan = cektapelsekarang[i].tapel;
                tekstapel = string_tapel_darinis(tapeljalan);
                let kur = cektapelsekarang[i].kurikulum;
                html += `<label for="tapelkurikulumsiswa_${tapeljalan}">${tekstapel}:`;
                html +=`<select data-riwayatkurikulumsiswa="${tapeljalan}" class="w3-center" style="width:150px;border: none transparent;outline: none;font-size:9px">`;
                html+=`<option value="06" ${kur == "06"?"selected":""}>Kurikulum 2006</option>`;
                html+=`<option value="13" ${kur == "13"?"selected":""}>Kurikulum 2013</option>`;
                html+=`<option value="21" ${kur == "21"?"selected":""}>Kurikulum Merdeka Belajar</option>`;
                html +=`</select></label><br>`;
            }
                
            
        }else{
            for(let i = 0 ; i < cektapelsekarang.length ; i ++){
                tapeljalan = cektapelsekarang[i].tapel;
                tekstapel = string_tapel_darinis(tapeljalan);
                let kur = cektapelsekarang[i].kurikulum;
                html += `<label for="tapelkurikulumsiswa_${tapeljalan}">${tekstapel}:`;
                html +=`<select data-riwayatkurikulumsiswa="${tapeljalan}" class="w3-center" style="width:150px;border: none transparent;outline: none;font-size:9px">`;
                html+=`<option value="06" ${kur == "06"?"selected":""}>Kurikulum 2006</option>`;
                html+=`<option value="13" ${kur == "13"?"selected":""}>Kurikulum 2013</option>`;
                html+=`<option value="21" ${kur == "21"?"selected":""}>Kurikulum Merdeka Belajar</option>`;
                html +=`</select></label><br>`;
            }
        }
    }
    return html
}

const arrayobjek_datakurikuluminduksiswa = (token)=>{
    let ceksyarat = syarat_riwayatkelas(token);
    let banyaktapel = ceksyarat.banyaktapel;
    let tapelawal = ceksyarat.tapelawal;
    
    let tapeljalan = tapelawal;
    let tekstapel = string_tapel_darinis(tapelawal);
    let ar = []
        for(let i = 0 ; i < banyaktapel; i++){
            let ob = {}
            tapeljalan = tapelawal + (101 * i);
            tekstapel = string_tapel_darinis(tapeljalan);
            ob.tapel = tapeljalan;
            ob.tekstapel = tekstapel;
            if(tapeljalan <= 1718){
                ob.kurikulum = "06";
                ob.namakurikulum = "Kurikulum 2006";
            }else if(tapeljalan > 1718){
                ob.kurikulum = "13";
                ob.namakurikulum = "Kurikulum 2013";
            }else{
                ob.kurikulum = "21";
                ob.namakurikulum = "Kurikum Merdeka Belajar";
            }
            ar.push(ob);
        }    
        
    return ar
}
const arrayobjek_tbbb = () =>{
    
    let elementahun = document.querySelectorAll("[data-tapeltbbb]");
    let arr = []
    // for (i = 0 ; i < tbbody.rows.length; i++){

    // }
    for(i = 0 ; i < elementahun.length ; i ++){
        let obj = {};
        let atr_tapel = elementahun[i].getAttribute("data-tapeltbbb");
        obj.tapel = atr_tapel;
        let sm = elementahun[i].getAttribute("data-tbbbsemester");
        if(sm == 1){
            let at_tb = document.querySelector(`input[data-tapeltbbb='${atr_tapel}'][data-tbbbsemester='1'][data-tbbb='tb']`)
            let at_bb = document.querySelector(`input[data-tapeltbbb='${atr_tapel}'][data-tbbbsemester='1'][data-tbbb='bb']`)
            obj.semester = 1;
            obj.tb = at_tb.value;
            obj.bb = at_bb.value;
            // arr.push(obj)

        }else{
            let at_tb = document.querySelector(`input[data-tapeltbbb='${atr_tapel}'][data-tbbbsemester='2'][data-tbbb='tb']`)
            let at_bb = document.querySelector(`input[data-tapeltbbb='${atr_tapel}'][data-tbbbsemester='2'][data-tbbb='bb']`)
            obj.semester = 2;
            obj.tb = at_tb.value;
            obj.bb = at_bb.value;
            // arr.push(obj)
        }
        let cek = arr.some(item => item.tapel == obj.tapel && item.semester == obj.semester);// arr.indexOf(obj)
        // console.log(cek)
        if(!cek){
            arr.push(obj)
        }
    }
    return arr
}

const arrayobjek_penyakit = () =>{

    let elementahun = document.querySelectorAll("[data-input_tapel_kesehatan]");
    let arr = []
    // for (i = 0 ; i < tbbody.rows.length; i++){

    // }
    for(i = 0 ; i < elementahun.length ; i ++){
        let obj = {};
        let atr_tapel = elementahun[i].getAttribute("data-input_tapel_kesehatan");
        obj.tapel = atr_tapel;
        let input_lihat = document.querySelector(`input[data-input_tapel_kesehatan='${atr_tapel}'][data-input_kondisi_kesehatan='penglihatan']`);
        obj.penglihatan = input_lihat.value;
        let input_dengar= document.querySelector(`input[data-input_tapel_kesehatan='${atr_tapel}'][data-input_kondisi_kesehatan='pendengaran']`);
        obj.pendengaran = input_dengar.value;
        let input_gigi = document.querySelector(`input[data-input_tapel_kesehatan='${atr_tapel}'][data-input_kondisi_kesehatan='gigi']`);
        obj.gigi = input_gigi.value;
        let input_penyakit =  document.querySelector(`input[data-input_tapel_kesehatan='${atr_tapel}'][data-input_kondisi_kesehatan='penyakit']`);
        obj.penyakit = input_penyakit.value;
        
        let cek = arr.some(item => item.tapel == obj.tapel);// arr.indexOf(obj)
        // console.log(cek)
        if(!cek){
            arr.push(obj)
        }

    }
    // console.log(arr);
    return arr
}
let anchor_dokumen = (dbs) => {
    // let dbs = dbsiswa_bukuinduk.filter(s => s.id == 143)[0];
    // let db = dbs.dok_kartunisn;
    let db = dbs == ""?[]:JSON.parse(dbs)
    let html = ""
    if(db.length>0){
        for(i = 0 ; i < db.length ; i++){
            html +=`<a href="https://drive.google.com/file/d/${db[i].idfile}/view" target="_blank">${db[i].namafile}</a><br>`
        }
    }else{
        html =""
    }
    return html
}
const editinputriwayat = (el) =>{
    let inputs = document.querySelectorAll("[data-riwayat_tapel]");
    let cbx = document.querySelectorAll(".disablecheckbox");
    let tombol = document.querySelector(".sementarasimpanriwayat")
    if(el.innerHTML == "Edit"){
        for(let i = 0 ; i < inputs.length; i++){
            inputs[i].removeAttribute("disabled");
        }
        for(let j = 0 ; j < cbx.length ; j++){
            cbx[j].removeAttribute("disabled");
        }
        tombol.classList.remove("w3-hide");
        el.innerHTML = "Tutup";
    }else{
        for(let i = 0 ; i < inputs.length; i++){
            inputs[i].setAttribute("disabled",true);
        }
        
        for(let j = 0 ; j < cbx.length ; j++){
            cbx[j].setAttribute("disabled", true);
        }
        tombol.classList.add("w3-hide");
        el.innerHTML = "Edit";
    }
}

const riwayatkenaikankelas = (tokensiswa)=>{
    //let divisi = menu_editinduk;//.innerHTML = menu;
    formulirkirim.innerHTML = "";
    let db = db_utama_siswa.filter(s => s.id == tokensiswa)[0];
    let riwayat = db.riwayat_tapel;
    let ar_riwayat = JSON.parse(riwayat);
    let k_kelas = ""
    let html ="";
    html += `<table class="w3-table garis w3-tiny" style="width:350px;margin:15px auto"><thead><tr class="w3-light-grey"><th>Tahun Pelajaran</th><th>Kelas<br><button onclick="editinputriwayat(this)">Edit</button></th><th>Semester</th></tr></thead><tbody>`
    //html +=`<tr><td>${idTeksTapel}<br>(Saat ini)</td><td><input type="number" min="1" max="6" class="w3-input w3-border" data-riwayat_tapel="${intShorttapel}" value="${s_kelas}"></td></tr>`;
    for(let i  = 0 ; i <ar_riwayat.length; i ++){
        let tapeljalan = ar_riwayat[i].tapel;
        let sms = ar_riwayat[i].semester;//JSON.parse(ar_riwayat[i].semester);//ar_riwayat[i].semester;// JSON.parse(ar_riwayat[i].semester);
        
        let v = ar_riwayat[i].kelas;
        
            let tekstapel = "20"+tapeljalan.toString().substring(0,2)+"/20"+tapeljalan.toString().substring(2,4);
            html +=`<tr><td class="w3-center">${tekstapel}</td><td><input value="${v}" disabled type="number" min="1" max="6" class="w3-input w3-border w3-center" data-riwayat_tapel="${tapeljalan}"></td><td>`;
            html +=`<label for="cekbox_semester_${tapeljalan}1"><input type="checkbox" disabled name="cekbox_semester_${tapeljalan}" class="disablecheckbox" id="cekbox_semester_${tapeljalan}1" value="1">1</label><br>`;
            html +=`<label for="cekbox_semester_${tapeljalan}2"><input type="checkbox" disabled name="cekbox_semester_${tapeljalan}" class="disablecheckbox" id="cekbox_semester_${tapeljalan}2" value="2">2</label>`;;
        
   
        html +=`</td></tr>`;
    }
            html +=`</tbody></table><div id="tombolsementarariwayat" class="w3-center">Klik tombol Edit untuk mengedit isian<br>`;
            html +=`<button class="tangan sementarasimpanriwayat w3-hide" onclick="simpanserverinduk(this,'single','${tokensiswa}')">Update Riwayat</button>`
            html +=`<button class="tangan" onclick="PerbaruidataInduk('aktif','${tokensiswa}')">Kembali</button>`;
            html +=`</div>`;
    //menu_editinduk.innerHTML = html;
    formulirkirim.innerHTML = html;
    tempattombol_formulirkirim.innerHTML = `<div class="w3-small w3-center">Tabel di atas muncul karena sistem mendeteksi adanya perhitungan riwayat kenaikan kelas. Jika pendeteksian ini kurang tepat, perbaiki nomor Induk agar sesuai dengan perhitungan sistem.<br><button onclick="htmlbuatperbaikinomorinduk('${tokensiswa}')">Perbaiki Nomor Induk Siswa (NIS)</button></div>`
    
            
    for(l  = 0 ; l <ar_riwayat.length; l ++){
        let tapeljalan = ar_riwayat[l].tapel;
        let sms = ar_riwayat[l].semester;//JSON.parse(ar_riwayat[i].semester);//ar_riwayat[i].semester;// JSON.parse(ar_riwayat[i].semester);
        for(n = 0 ; n < sms.length ; n++){
            let teksid =`cekbox_semester_${tapeljalan}${sms[n]}`
            document.getElementById(teksid).checked = true;
        }
    }

}

const htmlbuatperbaikinomorinduk = (tokensiswa)=>{
    let html ="";
    let db = db_utama_siswa.filter(s => s.id == tokensiswa)[0];
    let nisnya = db.nis;
    html +=`<div class="w3-center">Nomor Induk Siswa (NIS)<br>`;
    html +=`<input class="w3-input w3-border w3-center w3-border-blue" data-perbaikan_nis="nis" value="${nisnya}"><br><br>`;
    html +=`<button onclick="simpanserverinduk(this,'single_nis','${tokensiswa}')" class="w3-yellow w3-bottombar w3-border-black w3-round-xlarge tangan">Update NIS</button>`;
    html +=`<button onclick="document.getElementById('modal_editnomorinduk').style.display='none';" class="w3-yellow tangan w3-bottombar w3-border-black w3-round-xlarge">Batal</button>`
    html +=`</div>`;
    menu_editinduk.innerHTML = html;
    formulirkirim.innerHTML = "";
    tempattombol_formulirkirim.innerHTML = "";
    footer_editnomorinduk.innerHTML = "<br>";
}
const uploaddokumeninduk = (bol, baris, kolom) => {
    let modal = document.getElementById("modaluploaddokumeninduk");
    modal.style.display = "block";
    let tabelpageinduk = document.getElementById("koleksidokumenpribadisiswa");
    let tabelmodal = document.querySelector(".tabeldokumenindukeditable");
    let tbodymodal = tabelmodal.getElementsByTagName("tbody")[0];
    tbodymodal.innerHTML = "";
    let html =""
    //cek ada berapa elemen img di td ini;
    let td = tabelpageinduk.rows[baris].cells[kolom -1];
    
    let imgs = td.querySelectorAll("a");
    for(i = 0 ; i < imgs.length ; i++){
        let url = imgs[i].href;
        let idfile = url.replace("https://drive.google.com/file/d/","").replace("/view","");
        html +=`<tr><td>${i+1}</td><td><input type="text" data-dokumenpribadiinduk="namafile" class="w3-input w3-border w3-border-amber" value="${imgs[i].text}">
        <input type="text" data-dokumenpribadiinduk="idfile" disabled value="${idfile}" style="border: none transparent;outline: none;width:100%"></td><td>
        <button onclick="hapusthis(this)" title="Klik di sini untuk menghapus kolom tabel">Hapus</button></td></tr>`
    }
    tbodymodal.innerHTML = html;
    let btn = document.getElementById("id_btnsimpanserverdokumenpribadi");
    btn.setAttribute("onclick",`simpanserverdokumenpribadisiswa(${baris},${kolom-1})`);
    //style="border: none transparent;outline: none;width:100%"
    // onclick="document.querySelector('.tabeldokumenindukeditable').deleteRow(this.parentElement.rowIndex)" title="Klik di sini untuk menghapus kolom tabel">Hapus
    //alert("Baris index = " + baris + "\n \r Kolom index = " + kolom);

}
const hapusthis = (el) =>{
    alert("Baris " + el.parentNode.parentElement.rowIndex +" Kolom " + el.parentNode.cellIndex);
    document.querySelector('.tabeldokumenindukeditable').deleteRow(el.parentNode.parentElement.rowIndex)
}
const tambahbarisdatadokumenpribadi = () => {
    let tabelmodal = document.querySelector(".tabeldokumenindukeditable");
    let tbodymodal = tabelmodal.getElementsByTagName("tbody")[0];
    let barisakhir = tbodymodal.rows.length;
    let row = tbodymodal.insertRow(-1);
    let cel = row.insertCell(-1);
    cel.innerHTML = barisakhir + 1;
    cel = row.insertCell(-1);
    cel.innerHTML = `<input type="text" data-dokumenpribadiinduk="namafile" id="idnamafile_dokumeninduk${barisakhir+1}" class="w3-input w3-border w3-border-amber" placeholder="Ketikan nama file (default nama file asli)">
    <input type="text"  data-dokumenpribadiinduk="idfile"  id="idsrc_dokumeninduk${barisakhir+1}" disabled  style="border: none transparent;outline: none;width:100%">`;
    cel = row.insertCell(-1);
    cel.innerHTML = `<label for="tomboluploadokumen_${barisakhir+1}" class="w3-btn w3-round-xlarge w3-green tangan fa fa-upload classtomboluploadokumen_${barisakhir+1}"> Upload</label>
    <input type="file" id="tomboluploadokumen_${barisakhir+1}" onchange="uploaddokumenpribadiinduk(${barisakhir+1})" class="w3-hide">
    `;//onclick="alert('tambah di baris ini ${barisakhir+1}')"

}
const uploaddokumenpribadiinduk = (no) =>{
    let ini = "tomboluploadokumen_"+no;
    let inputnama = "idnamafile_dokumeninduk"+no;
    let elemennama = document.getElementById(inputnama)
    let elemenini = document.getElementById(ini).files[0];
    let namafileasli = elemenini.name;
    console.log(namafileasli);
    if(elemennama.value ==""){
        elemennama.value = namafileasli
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        //document.getElementById('uploadForm').submit();

        let src = e.target.result;
        let data = src.replace(/^.*,/, '');
        let tipe = e.target.result.match(/^.*(?=;)/)[0];
        fn_upload_file2(no, elemennama.value, data, tipe);
        // console.log(tipe);
        // console.log(data);
    }
    reader.readAsDataURL(elemenini);
}

const fn_upload_file2 = (id_input, namafile, param, tipe) => {
    let el_label = document.querySelector(".classtomboluploadokumen_"+id_input);
    let div = document.getElementById("idsrc_dokumeninduk"+id_input);
    el_label.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`
    let kode = document.getElementById("kodefokuspageidentitas").innerHTML;
    let db = db_utama_siswa.filter(s => s.id == kode)[0];
    let jnj = db.jenjang == 7?6:db.jenjang;
    let namakelas = db.nama_rombel;
    absenheader = "absen" + jnj;
    url_absensiswa = jlo[absenheader];

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
                    el_label.innerHTML = `Upload`;

                }, 3000);
                el_label.innerHTML = `Gagal Mengunggah`;
            } else {
                el_label.innerHTML = ` Upload`;
                div.value = r.idfile;
            }
        })
        .catch(er => {
            console.log(er);
            setTimeout(() => {
                el_label.innerHTML = ` Upload`;

            }, 3000);
            el_label.innerHTML = `Gagal Mengunggah`;
            alert("Maaf, terjadi kesalahan. Silakan ulangi sesi Anda sesaat lagi.")
        })
};

const simpanserverdokumenpribadisiswa = (rowIsi, celIsi)=>{
    let tabelmodal = document.querySelector(".tabeldokumenindukeditable");
    let tbodymodal = tabelmodal.getElementsByTagName("tbody")[0];
    let lr = tbodymodal.rows;
    let arr = [];
    let html="";
    for( i = 0 ; i < lr.length ; i++){
        let obj = {};
        let kol = tbodymodal.rows[i].cells[1].querySelectorAll("input");
        for(j = 0 ; j < kol.length ; j++){
                let key = kol[j].getAttribute("data-dokumenpribadiinduk");
                let val = kol[j].value;
                obj[key] = val;
            }
            
            arr.push(obj)
            let namafile = tbodymodal.rows[i].cells[1].querySelector("input[data-dokumenpribadiinduk=namafile]").value;
            let url = tbodymodal.rows[i].cells[1].querySelector("input[data-dokumenpribadiinduk=idfile]").value;
            let href = `https://drive.google.com/file/d/${url}/view`
            if(url !==""){
                html +=`<a target="_blank" href="${href}">${namafile}</a><br>`
            }
    }
    let tabelpageindukidentitas = document.getElementById("koleksidokumenpribadisiswa");
    tabelpageindukidentitas.rows[rowIsi].cells[celIsi].innerHTML = html;
    document.getElementById("modaluploaddokumeninduk").style.display = "none";
    // console.log(arr);
}
const kirimdataanakpindahan = (tokensiswa) => {
    let oblama = Object.assign({},db_utama_siswa.filter(s => s.id == tokensiswa)[0]);
    let masuktgl = document.querySelector("[data-isiduludatapindahan=masuk_tgl]").value;
    let sekolah = document.querySelector("[data-isiduludatapindahan=masuk_dari]").value;
    let ob = Object.assign(oblama,{"masuk_tgl":masuktgl,"masuk_dari":sekolah});
    delete ob["time_stamp"];
    let tabel = Object.keys(ob);
    let datakirim = new FormData();
    for(i = 0 ; i < tabel.length ; i++){
        datakirim.append(tabel[i],ob[tabel[i]])
    }
    
    let aaa = linkDataUserWithIdss + "&action=editsiswa"; // jika pake lik ini, maka harus disinkronkan, panggil dengan " sinkronkandatasiswa() ;"
    fetch(aaa, {
        method: "post",
        body: datakirim
    }).then(m => m.json())
        .then(f => {
            ;
            sinkronkandatasiswa();

        })
        .catch(er => {
            console.log(er);

        });
}

const objekarray_dokumen = () =>{
    let objekaray ={};
    let tabel = document.getElementById("koleksidokumenpribadisiswa");
    let td_kartunisn = tabel.rows[3].cells[2];
    let td_raport = tabel.rows[5].cells[2];
    let td_piagam = tabel.rows[3].cells[6];
    let td_ijazahsd = tabel.rows[4].cells[6];
    let td_lainnya = tabel.rows[5].cells[6];
    
    let arr_dok_kartunisn = [];
    if(td_kartunisn.innerHTML == ""){
        objekaray.dok_kartunisn = ""
    }else{
        let anchor_nisn = td_kartunisn.querySelectorAll("a");
        for(let a = 0 ; a < anchor_nisn.length ; a++){
            let ob_nisn = {}
            let namafile = anchor_nisn[a].text;
            let href = anchor_nisn[a].href;
            let idfile = href.replace("https://drive.google.com/file/d/","").replace("/view","");
            ob_nisn.namafile = namafile;
            ob_nisn.idfile = idfile;
            arr_dok_kartunisn.push(ob_nisn);
        }
        objekaray.dok_kartunisn = JSON.stringify(arr_dok_kartunisn);
    }
    let arr_dok_raport = [];
    if(td_raport.innerHTML == ""){
        objekaray.dok_raport = ""
    }else{
        let anchor_raport = td_raport.querySelectorAll("a");
        for(let b = 0 ; b < anchor_raport.length ; b++){
            let ob_raport = {};
            let namafile = anchor_raport[b].text;
            let href = anchor_raport[b].href;
            let idfile = href.replace("https://drive.google.com/file/d/","").replace("/view","");
            ob_raport.namafile = namafile;
            ob_raport.idfile = idfile;
            arr_dok_raport.push(ob_raport)
        }
        objekaray.dok_raport = JSON.stringify(arr_dok_raport);
    }
    let arr_dok_piagam = [];
    if(td_piagam.innerHTML == ""){
        objekaray.dok_piagam = ""
    }else{
        let anchor_piagam = td_piagam.querySelectorAll("a");
        for(let b = 0 ; b < anchor_piagam.length ; b++){
            let ob_piagam = {};
            let namafile = anchor_piagam[b].text;
            let href = anchor_piagam[b].href;
            let idfile = href.replace("https://drive.google.com/file/d/","").replace("/view","");
            ob_piagam.namafile = namafile;
            ob_piagam.idfile = idfile;
            arr_dok_piagam.push(ob_piagam)
        }
        objekaray.dok_piagam = JSON.stringify(arr_dok_piagam);
    }
    
    let arr_dok_ijazahsd = [];
    if(td_ijazahsd.innerHTML == ""){
        objekaray.dok_ijazahsd = ""
    }else{
        let anchor_ijazahsd = td_ijazahsd.querySelectorAll("a");
        for(let b = 0 ; b < anchor_ijazahsd.length ; b++){
            let ob_ijazahsd = {};
            let namafile = anchor_ijazahsd[b].text;
            let href = anchor_ijazahsd[b].href;
            let idfile = href.replace("https://drive.google.com/file/d/","").replace("/view","");
            ob_ijazahsd.namafile = namafile;
            ob_ijazahsd.idfile = idfile;
            arr_dok_ijazahsd.push(ob_ijazahsd)
        }
        objekaray.dok_ijazahsd = JSON.stringify(arr_dok_ijazahsd);
    }
    let arr_dok_lainnya = [];
    if(td_lainnya.innerHTML == ""){
        objekaray.dok_lainnya = ""
    }else{
        let anchor_lainnya = td_lainnya.querySelectorAll("a");
        for(let b = 0 ; b < anchor_lainnya.length ; b++){
            let ob_lainnya = {};
            let namafile = anchor_lainnya[b].text;
            let href = anchor_lainnya[b].href;
            let idfile = href.replace("https://drive.google.com/file/d/","").replace("/view","");
            ob_lainnya.namafile = namafile;
            ob_lainnya.idfile = idfile;
            arr_dok_lainnya.push(ob_lainnya)
        }
        objekaray.dok_lainnya = JSON.stringify(arr_dok_lainnya);
    }
   
    return objekaray;
    


}
const kirimdatabaseidentitasinduk = async (el, tokensiswa) =>{
    
    el.innerHTML = `<i class="fa fa-spin fa-spinner"></i> sedang mengirim ke server utama`;
    el.setAttribute("onclick","alert('sedang proses kirim. Tunggu hingga proses selesai...')");
    let acuaninner = document.getElementById("ngapainsihlu").innerHTML;
    let splitawal = acuaninner.split("_")[0];
    let acuanupdatekodeinduk = acuaninner.split("_")[1];

    let db = db_utama_siswa.filter(s => s.id == tokensiswa)[0];
    let dbinduk = dbsiswa_bukuinduk.filter(s => s.id == tokensiswa)[0];
    let obdb = Object.assign({},db);
    let obdbinduk =Object.assign({},dbinduk);
    let elupdate = document.querySelectorAll("[data-dbindukutama]");
    let objekinput = {};
    for(let i = 0 ; i < elupdate.length ; i++){
        let key = elupdate[i].getAttribute("data-dbindukutama");
        let val = elupdate[i].value 
        objekinput[key] = val;

    }
    let tabeltbbb = {"riwayat_fisik":JSON.stringify(arrayobjek_tbbb())};
    let tabelpenyakit = {"riwayat_penyakit":JSON.stringify(arrayobjek_penyakit())};
    let tabeldokumen = objekarray_dokumen();//objek
    
    
    delete obdb.time_stamp;
    delete obdbinduk.time_stamp;
    obdb.dieditoleh = namauser;
    obdbinduk.dieditoleh = namauser;
    let dbdikirimkeutama = Object.assign(obdb,objekinput,tabeltbbb,tabelpenyakit);

    let dbdikirimkeinduk = Object.assign(obdbinduk, objekinput,tabeltbbb,tabelpenyakit,tabeldokumen); // induk
    console.log(dbdikirimkeinduk)
    for(let j = 0 ; j < koleksiundefine.length ; j++){
        delete dbdikirimkeutama[koleksiundefine[j]];
    }
    // console.log(koleksiundefine);
    // console.log("dbdikirimkeinduk",Object.keys(dbdikirimkeinduk).length, dbdikirimkeinduk);
    //console.log("dbdikirimkeutama",Object.keys(dbdikirimkeutama).length, dbdikirimkeutama);
    //action = updatedatabaseIndukUtama
    // ssUtama = jlo.ss_datauser;
    // ssInduk = ss_induk
    
    let datakirim = new FormData();
    datakirim.append("action","updatedatabaseIndukUtama");
    datakirim.append("idsreadsheet",ss_induk);
    let keys = Object.keys(dbdikirimkeinduk);
    for(let x = 0 ; x < keys.length ; x++){
        datakirim.append(keys[x], dbdikirimkeinduk[keys[x]])
    }
    // for (var pair of datakirim.entries()) {
    //         console.log(pair[0]+ ', ' + pair[1]); 
    //     }
    formulirkirim.innerHTML = `<div class="w3-center"><img src="/img/barloading.gif"></div>`;
    await fetch(linkdatabaseinduk,{method:"post",body:datakirim})
    .then(m => m.json())
    .then(r =>{
        
        dbsiswa_bukuinduk = r.all
        el.innerHTML = `<i class="fa fa-spin fa-spinner"></i> server utama berhasil terikirim, sedang memproses server induk`;
        html_utamabukuinduk(r);
        if(splitawal == "koleksi"){
            aksieditinduk('daftarisiinduk', acuanupdatekodeinduk);
        }else{
           // document.getElementById('modal_editnomorinduk').style.display='none'
           aksieditinduk(acuanupdatekodeinduk,'');
        }
    }).catch(er => {
        console.log(er)
        el.innerHTML = `<i class="fa fa-spin fa-spinner"></i> server utama gagal, sedang memproses server induk`;

    });
    let datakirim2 = new FormData();
    datakirim2.append("action","updatedatabaseIndukUtama");
    datakirim2.append("idsreadsheet",jlo.ss_datauser);
    let keys2 = Object.keys(dbdikirimkeutama);
    for(let y = 0 ; y < keys2.length ; y++){
        datakirim2.append(keys2[y], dbdikirimkeutama[keys2[y]])
    }
    // for (var pair of datakirim.entries()) {
    //         console.log(pair[0]+ ', ' + pair[1]); 
    //     }
    await fetch(linkdatabaseinduk,{method:"post",body:datakirim2})
    .then(m => m.json())
    .then(r =>{
        
        db_utama_siswa = r.all;
        el.innerHTML = `<i class="fa fa-spin fa-spinner"></i> server induk berhasil`;
        modaledit_bukuinduk.style.display="none";
       alert("Semua data telah berhasil diupdate.")
        
        

        
    }).catch(er => {
        console.log(er)
        el.innerHTML = `<i class="fa fa-spin fa-spinner"></i> server induk gagal`;

    })

}
const tambahkanpotoinduk = (el,no)=>{
    let gmbr = el.querySelector("img");
    let src = gmbr.getAttribute("src");
    if(src.indexOf(idlogo)>-1){
        //alert("Anda boleh menghapus")
        let file = document.getElementById("inputfilepotoinduksiswa");
        file.click()
        file.onchange = function (no){
            inputfilepotoinduksiswa(no)
        };
    }else{
        let konfirm = confirm("Poto ini sudah tersimpan di server. Apa Anda ingin menghapusnya?")
        if(konfirm){
            let idfile = src.replace("https://drive.google.com/uc?export=view&id=","")
            hapuskoleksipoto(no,idfile);
        }
    }
    
    
}
const inputfilepotoinduksiswa = () =>{
    let file = document.getElementById("inputfilepotoinduksiswa");
    let idtoken = document.getElementById("kodefokuspageidentitas").innerHTML;
    let item = file.files[0];
    let namafile = item.name;
    let reader = new FileReader();
    reader.onload = function (e) {
        //document.getElementById('uploadForm').submit();

        let src = e.target.result;
        let data = src.replace(/^.*,/, '');
        let tipe = e.target.result.match(/^.*(?=;)/)[0];
        fn_upload_file3(idtoken, namafile, data, tipe);
        
        // console.log(tipe);
        // console.log(data);
    }
    reader.readAsDataURL(item);


}

const fn_upload_file3 = (id_input, namafile, param, tipe) => {
    let tombolkirimpageidentitas = document.getElementById("tombolkirimpageidentitas");
    tombolkirimpageidentitas.setAttribute("onclick","alert('Tunggu dulu proses sedang mengirim poto siswa')");
    tombolkirimpageidentitas.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`
    let acuaninner = document.getElementById("ngapainsihlu").innerHTML;
    let splitawal = acuaninner.split("_")[0];
    let acuanupdatekodeinduk = acuaninner.split("_")[1]

   let db = db_utama_siswa.filter(s => s.id == id_input)[0];
    let namakelas = db.nama_rombel;
    

    let data = new FormData();
    data.append("action", "uploadpotoinduk");
    data.append("fileContent", param);
    data.append("mimeType", tipe);
    data.append("filename", namafile);
    data.append("kelas", namakelas);
    data.append("tokensiswa",id_input)
    var url = linkdatabaseinduk; // + "?action=uploaddulu";
    fetch(url, {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(r => {
            
            if(r.sukses == "Sukses"){
                dbsiswa_bukuinduk = r.data;
                html_utamabukuinduk(r);
                if(splitawal == "koleksi"){
                    aksieditinduk('daftarisiinduk', acuanupdatekodeinduk);
                    page_bukuinduk_identitas(id_input);
                }else{
                   // document.getElementById('modal_editnomorinduk').style.display='none'
                   aksieditinduk(acuanupdatekodeinduk,'');
                }
            }else{
                tombolkirimpageidentitas.innerHTML = "Gagal Mengunggah poto, tetap kirim server?";
                tombolkirimpageidentitas.setAttribute("onclick",`kirimdatabaseidentitasinduk(this,${id_input})`);
    
                alert("Maaf, terjadi kesalahan. Silakan ulangi sesi Anda sesaat lagi.");
            }
            // if (r.sukses == "Gagal") {
            //     setTimeout(() => {
            //         el_label.innerHTML = `Upload`;

            //     }, 3000);
            //     el_label.innerHTML = `Gagal Mengunggah`;
            // } else {
            //     el_label.innerHTML = ` Upload`;
            //     div.value = r.idfile;
            // }
        })
        .catch(er => {
            console.log(er);
            // setTimeout(() => {
            //     el_label.innerHTML = ` Upload`;

            // }, 3000);
            // el_label.innerHTML = `Gagal Mengunggah`;
            alert("Maaf, terjadi kesalahan. Silakan ulangi sesi Anda sesaat lagi.")
        })
};
const simpanserverinduk = (el, kondisi, tokensiswa) =>{
    let kettombol = el.innerHTML;
    el.innerHTML = `<i class="fa fa-spin fa-spinner"></i> loading`;
    el.removeAttribute("onclick");
    let acuaninner = document.getElementById("ngapainsihlu").innerHTML;
    let splitawal = acuaninner.split("_")[0];
    let acuanupdatekodeinduk = acuaninner.split("_")[1]
    if(kondisi == "single"){
        let elemens = document.querySelectorAll("[data-riwayat_tapel]");
        let ar = [];
        for(let i = 0 ; i < elemens.length ; i++){
            let ob = {};
            let val = elemens[i].getAttribute("data-riwayat_tapel");
            ob.kelas = elemens[i].value;
            ob.tapel = val; //cekbox_semester_${tapeljalan}"
            let sms = document.querySelectorAll(`input[name=cekbox_semester_${val}]`);
            let p = []
            for(let j = 0 ; j < sms.length ; j++){
                if(sms[j].checked){
                    let o = sms[j].value
                    p.push(o)
                }
            }
            ob.semester = p;
            ar.push(ob);
        }
        console.log(ar);
        //let r = parseInt(tokensiswa);
        let konf = confirm("Anda yakin pengisian telah benar?");
        if(!konf){
            el.innerHTML = kettombol;
            el.setAttribute("onclick",`simpanserverinduk(this, '${kondisi}', '${tokensiswa}')`)
            return
        }
        let header = "riwayat_tapel";
        let tipe = "biasa";
        let yangdikirim = JSON.stringify(ar);
        let data = new FormData();
        data.append("id",tokensiswa);
        data.append("header",header);
        data.append("tipeisi",tipe);
        data.append("isi",yangdikirim);

        fetch(linkdatabaseinduk+"?action=kirimsatuitemdiserveridentitasnduk",{method:"post",body:data})
        .then(m => m.json())
        .then(r => {
            el.innerHTML  = "Berhasil Terkirim";
            el.setAttribute("onclick",`document.getElementById('modal_editnomorinduk').style.display='none'`)
            html_utamabukuinduk(r);
            if(splitawal == "koleksi"){
                aksieditinduk('daftarisiinduk', acuanupdatekodeinduk);
                
            }else{
               // document.getElementById('modal_editnomorinduk').style.display='none'
               aksieditinduk(acuanupdatekodeinduk,'');
            }
        }).catch(er=> {
            console.log(er);
            el.innerHTML  = "Gagal Terkirim";
            el.setAttribute("onclick",`document.getElementById('modal_editnomorinduk').style.display='none'`)
        })
    }else if(kondisi == "single_nis"){
        let elemeninput = document.querySelector("[data-perbaikan_nis=nis]").value;
        let ceklong = elemeninput.length;
        let cekNonangka = elemeninput.match(/(\D+)/);
        if(cekNonangka !== null || ceklong !== 9){
            alert("Format NIS salah. Periksa jumlah angka NIS, jangan ada karater huruf, atau spasi");

            el.innerHTML = kettombol;
            el.setAttribute("onclick",`simpanserverinduk(this, '${kondisi}', '${tokensiswa}')`)
            return
        }
        let konf = confirm("Anda yakin pengisian telah benar?");
        if(!konf){
            el.innerHTML = kettombol;
            el.setAttribute("onclick",`simpanserverinduk(this, '${kondisi}', '${tokensiswa}')`)
            return
        }
        let ar = elemeninput;//.value;
        let header = "nis";
        let tipe = "biasa";
        let yangdikirim = ar;
        let data = new FormData();
        data.append("id",tokensiswa);
        data.append("header",header);
        data.append("tipeisi",tipe);
        data.append("isi",yangdikirim);
        data.append("ssutama",jlo.ss_datauser);

        fetch(linkdatabaseinduk+"?action=kirimsatuitemdiserveridentitasnduk",{method:"post",body:data})
        .then(m => m.json())
        .then(r => {
            
            el.innerHTML  = "Berhasil Terkirim";
            el.setAttribute("onclick",`document.getElementById('modal_editnomorinduk').style.display='none'`)
            html_utamabukuinduk(r);
            if(splitawal == "koleksi"){
                aksieditinduk('daftarisiinduk', acuanupdatekodeinduk);
                // PerbaruidataInduk(db.aktif,tokensiswa)
            }else{
                //document.getElementById('modal_editnomorinduk').style.display='none';
                console.log(splitawal)
                aksieditinduk(acuanupdatekodeinduk,'');
                // db = dbsiswa_bukuinduk.filter(s => s.nis == "");
                // html = html_cekinduk(kondisi, db);
                // ngapainsihlu.innerHTML ="cekinduk_"+kondisi;
            }
        }).catch(er=> {
            console.log(er);
            el.innerHTML  = "Gagal Terkirim";
            el.setAttribute("onclick",`document.getElementById('modal_editnomorinduk').style.display='none'`)
        });

    }else{

    }
}
const hapuskoleksipoto = (tokensiswa,idfile) =>{
    let cekarraypoto = dbsiswa_bukuinduk.filter(s => s.id == tokensiswa)[0];
    let arry = cekarraypoto.koleksi_potoinduk ==""?[]:JSON.parse(cekarraypoto.koleksi_potoinduk);
    let acuaninner = document.getElementById("ngapainsihlu").innerHTML;
    let splitawal = acuaninner.split("_")[0];
    let acuanupdatekodeinduk = acuaninner.split("_")[1];
    if(arry.length == 0){
        alert("Maaf, poto tidak bisa dihapus");
        return
    }else{
        let cek = arry.indexOf(idfile)
        if(cek == -1){
            alert("Maaf, Poto ini tidak bisa dihapus")
        }else{
            arry.splice(cek,1);
            let isikirim = arry.length == 0?"":JSON.stringify(arry);
            let data = new FormData();
            data.append("id",tokensiswa);
            data.append("header","koleksi_potoinduk");
            data.append("tipeisi","single");
            data.append("isi",isikirim);

            fetch(linkdatabaseinduk+"?action=kirimsatuitemdiserveridentitasnduk",{method:"post",body:data})
            .then(m => m.json())
            .then(r => {
                html_utamabukuinduk(r);
                if(splitawal == "koleksi"){
                    aksieditinduk('daftarisiinduk', acuanupdatekodeinduk);
                    page_bukuinduk_identitas(tokensiswa)
                }else{
                // document.getElementById('modal_editnomorinduk').style.display='none'
                aksieditinduk(acuanupdatekodeinduk,'');
                }
            }).catch(er=> {
                console.log(er);
                
            })
        }
    }
}
const tambahdbsiswabukuinduk = (kodeinduk) =>{
    //alert(kodeinduk);
    modaledit_bukuinduk.style.display = "block";
    menu_editinduk.innerHTML = "";
    formulirkirim.innerHTML = "";
    men_induk_info.innerHTML = "Mohon cek dulu seluruh data siswa yang tidak memiliki NIS, NIS ganda, atau NIS salah."
}
const kirimnilaikeinduk = (el,tokensiswa,namatab)=>{
    let elemens = document.querySelectorAll("[data-nilairaportinduk]");
    el.innerHTML = `<img src="/img/barloading.gif"> Memproses...`;
    el.setAttribute("onclick","alert('sedang mengirimkan nilai')");
    let ob = new FormData();
    for(let i = 0 ; i < elemens.length; i++){
        let key = elemens[i].getAttribute("data-nilairaportinduk");
        let val= elemens[i].value;
        ob[key] = val;
        ob.append(key,val)
    }
    ob.append("tokensiswa",tokensiswa);
    ob.append("namatab",namatab);
    ob.append("action","simpannilairarportinduk");
    formulirkirim.innerHTML = `<div class="w3-center">Sedang mengirimkan data  ... <i class="fa fa-spin fa-spinner"></i></div>`;
    fetch(linkdatabaseinduk,{method:"post",body:ob})
    .then(m => m.json())
    .then(r => {
        formulirkirim.innerHTML = r.sukses;
        el.innerHTML = `Berhasil Terkirim`;
        el.setAttribute("onclick","alert('Berhasil Terkirim, silakan melanjutkan ke tahap selanjutnya')");
        console.log(r)
    }).catch(er => {
        formulirkirim.innerHTML = `<div class="w3-center">Proses Gagal. Pesan server: ${er}</div>`;
        el.innerHTML = `Gagal`;
        el.setAttribute("onclick","alert('Mohon maaf, terjadi kesalahan')");
    })

}
const html_datanilaiijazah = (tokensiswa)=>{
    alert("Proses Desain kode= "+tokensiswa)
}
//terbilang source code: https://github.com/jokorivai/js-terbilang
function terb_depan(uang){
	var sub = '';
	if (uang == 1) { sub='Satu '} else
	if (uang == 2) { sub='Dua '} else
	if (uang == 3) { sub='Tiga '} else
	if (uang == 4) { sub='Empat '} else
	if (uang == 5) { sub='Lima '} else
	if (uang == 6) { sub='Enam '} else
	if (uang == 7) { sub='Tujuh '} else
	if (uang == 8) { sub='Delapan '} else
	if (uang == 9) { sub='Sembilan '} else
	if (uang == 0) { sub='  '} else
	if (uang == 10) { sub='Sepuluh '} else
	if (uang == 11) { sub='Sebelas '} else
	if ((uang >= 11) && (uang<=19)) { sub = terb_depan(uang % 10)+'Belas ';} else
	if ((uang >= 20) && (uang<=99)) { sub = terb_depan(Math.floor(uang / 10))+'Puluh '+terb_depan(uang % 10);} else
	if ((uang >= 100) && (uang<=199)) { sub = 'Seratus '+terb_depan(uang-100);} else
	if ((uang >= 200) && (uang<=999)) { sub = terb_depan(Math.floor(uang/100)) + 'Ratus '+terb_depan(uang % 100);} else
	if ((uang >= 1000) && (uang<=1999)) { sub = 'Seribu '+terb_depan(uang-1000);} else
	if ((uang >= 2000) && (uang<=999999)) { sub = terb_depan(Math.floor(uang/1000)) + 'Ribu '+terb_depan(uang % 1000);} else
	if ((uang >= 1000000) && (uang<=999999999)) { sub = terb_depan(Math.floor(uang/1000000))+'Juta '+terb_depan(uang%1000000);} else
	if ((uang >= 100000000) && (uang<=999999999999)) { sub = terb_depan(Math.floor(uang/1000000000))+'Milyar '+terb_depan(uang%1000000000);} else
	if ((uang >= 1000000000000)) { sub = terb_depan(Math.floor(uang/1000000000000))+'Triliun '+terb_depan(uang%1000000000000);}
	return sub;
}
function terb_belakang(t){
	if (t.length==0){
		return '';
	}
	return t
		.split('0').join('Kosong ')
		.split('1').join('Satu ')
		.split('2').join('Dua ')
		.split('3').join('Tiga ')
		.split('4').join('Empat ')
		.split('5').join('Lima ')
		.split('6').join('Enam ')
		.split('7').join('Tujuh ')
		.split('8').join('Delapan ')
		.split('9').join('Dembilan ');
}

function terbilang(nangka) {
	var 
		v = 0,
		sisa = 0,
		tanda = '',
		tmp = '',
		sub = '',
		subkoma = '',
		p1 = '',
		p2 = '',
		pkoma = 0;
	if (nangka>999999999999999999){
		return 'Buset dah buanyak amat...';
	}
	v = nangka;	
	if (v<0){
		tanda = 'Minus ';
	}
	v = Math.abs(v);
	tmp = v.toString().split('.');
	p1 = tmp[0];
	p2 = '';
	if (tmp.length > 1) {		
		p2 = tmp[1];
	}
	v = parseFloat(p1);
	sub = terb_depan(v);
	/* sisa = parseFloat('0.'+p2);
	subkoma = terb_belakang(sisa); */
	subkoma = terb_belakang(p2);
	// sub = tanda + sub.replace('  ',' ') +'Koma '+ subkoma.replace('  ',' ');
    if(subkoma == ""){
        sub = tanda + sub.replace('  ',' ') ;//+'Koma '+ subkoma.replace('  ',' ');
    }else{
        sub = tanda + sub.replace('  ',' ') +'Koma '+ subkoma.replace('  ',' ');

    }
	return sub.replace('  ', ' ');
}

let arraydeskripsi_kd1=[], arraydeskripsi_kd2 =[];
let prefix_stringkeyinduk = dbinduk_tapel_integer+"_13_"+idJenjang+"_"+idSemester+"_";
let tabelraportmanual = document.getElementById("tabelraportmanual");
let menumanual_k1 = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_ki1")
    let menumanual_k2 =document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_ki2"),
    menumanual_k3 = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_ki3"), 
    menumanual_k4 = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_ki4");
    let menumanual_tbbb = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_tbbb");//mbtr_tbbb perkembangan lainnya;
    let menumanual_kesehatan = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_kesehatan");//mbtr_tbbb perkembangan lainnya;
    let menumanual_ekstrakurikuler = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_ekstrakurikuler");//mbtr_tbbb perkembangan lainnya;
    let menumanual_saran = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_saran");//mbtr_tbbb perkembangan lainnya;
    let menumanual_kenaikankelas = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_kenaikankelas");//mbtr_tbbb perkembangan lainnya;
    let menumanual_prestasi = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_prestasi");//mbtr_tbbb perkembangan lainnya;
    let menumanual_kelulusan = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_kelulusan");//mbtr_tbbb perkembangan lainnya;
    let menumanual_deskripsik3 = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_ki3deskripsi");//mbtr_tbbb perkembangan lainnya;
    let menumanual_deskripsik4 = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_ki4deskripsi");//mbtr_tbbb perkembangan lainnya;
    let menucetakraportbaru = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_raport");//mbtr_tbbb perkembangan lainnya;
    let menumanual_kehadiransiswa = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_kehadiransiswa");//mbtr_tbbb perkembangan lainnya;
const raportmanualawal = ()=>{
    let judul = document.querySelector(".head_dataraportmanual");
    let info = document.querySelector(".info_mbtr");
    info.innerHTML = `<img src="/img/barloading.gif"> memproses data ...`;
    judul.innerHTML = "REKAPITULASI DAN DESKRIPSI NILAI SPIRITUAL (KI-1)<br>";
    judul.innerHTML +="KELAS " + idNamaKelas + " SEMESTER " + idSemester +"<br>";
    judul.innerHTML +="TAHUN PELAJARAN " + idTeksTapel;
    let tabel = document.getElementById("tabelraportmanual");
    let thead = tabel.querySelector("thead");
    let tbody = tabel.querySelector("tbody");
    let tfoot= tabel.querySelector("tfoot");
    let sel_k1 = tabel.querySelectorAll(".sel_k1");
      //bikindata siswa:
    let tbodyRow = tbody.rows;
    
    if(tbodyRow.length == 0){
        for(let i = 0 ; i < jsondatasiswa.length ; i++){
            let tr = tbody.insertRow(-1);
            let td = tr.insertCell(-1);
            td.innerHTML = (i+1);
            td = tr.insertCell(-1);
            td.innerHTML = jsondatasiswa[i].id;
            td = tr.insertCell(-1);
            td.innerHTML = jsondatasiswa[i].pd_nama;
        }
        
    }
    if(sel_k1.length == 0){
        
        let th = document.createElement("th");//thead.rows[0].insertCell(-1);
        th.innerHTML ="Nilai Spiritual (KI-1)";
        th.setAttribute("colspan","4");
        th.setAttribute("class","sel_k1 cellmanualinput");
        thead.rows[0].appendChild(th)

        th = document.createElement("th");//thead.rows[1].insertCell(-1);
        th.setAttribute("colspan","4");
        th.setAttribute("class","sel_k1 w3-tiny  cellmanualinput");
        th.innerHTML ="Klik sel untuk mengedit/preview";
        let trth_baru = thead.insertRow(-1)
        trth_baru.setAttribute("class","w3-light-grey");
        trth_baru.appendChild(th);//thead.rows[1].appendChild(th)
        
        th = document.createElement("th");//thead.rows[2].insertCell(-1);
        th.innerHTML ="Predikat";
        th.setAttribute("class","sel_k1 cellmanualinput");
        trth_baru = thead.insertRow(-1);
        trth_baru.setAttribute("class","w3-light-grey");
        trth_baru.appendChild(th);//thead.rows[2].appendChild(th)
        
        
        th = document.createElement("th");//thead.rows[2].insertCell(-1);
        th.setAttribute("class","sel_k1 cellmanualinput");
        th.innerHTML ="Indikator<br>Maksimal";
        thead.rows[2].appendChild(th)

        th = document.createElement("th");//thead.rows[2].insertCell(-1);
        th.setAttribute("class","sel_k1 cellmanualinput");
        th.innerHTML ="Indikator<br>Minimal";
        thead.rows[2].appendChild(th);
        th = document.createElement("th");//thead.rows[2].insertCell(-1);
        th.setAttribute("class","sel_k1 cellmanualinput");
        th.innerHTML ="Deskripsi";
        thead.rows[2].appendChild(th)
        //tfoot
        th = document.createElement("th");//thead.rows[2].insertCell(-1);
        th.setAttribute("colspan","4");
        th.setAttribute("class","sel_k1 cellmanualinput");
        th.innerHTML = `<button onclick="manual_simpanserverK1()" class=" w3-btn w3-round-xlarge w3-pale-green w3-bottombar w3-tiny w3-border-purple">Simpan Server K1</button>`;
        tfoot.rows[0].appendChild(th)
        //dibaris siswanya
        for(let i = 0 ; i < jsondatasiswa.length ; i++){
            let tr = tbody.rows[i];
            
            let td = tr.insertCell(-1);
            td.setAttribute("class","sel_k1 cellmanualinput");
            
            td.setAttribute("onmouseover","this.setAttribute('title','Pilih Predikat untuk nilai Spritual')");
            td.setAttribute("onmouseout","this.removeAttribute('title')");
            let html = `<select style="width:100%;border: none transparent;outline: none;background:transparent" name="inputmanualk1_predikat${i}" onchange="previewmanual_k1(this,${i})" data-keyraportindukmanual="${prefix_stringkeyinduk}KI1_NILAI">`;
            html +=`<option value ="Sangat Baik">Sangat Baik</option><option value ="Baik">Baik</option><option value ="Cukup">Cukup</option><option value ="Perlu Bimbingan">Perlu Bimbingan</option>`;
            html += `</select>`;
            td.innerHTML = html;
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_k1 cellmanualinput");
            
            td.setAttribute("onmouseover","this.setAttribute('title','Jangan ada karakter selain angka dan koma')");
            td.setAttribute("onmouseout","this.removeAttribute('title')");
            td.innerHTML = `<input type="text" oninput="previewmanual_k1(this,${i})" name="inputmanualk1_maks${i}" style="width:100%;border: none transparent;outline: none;background:transparent" placholder="contoh:1,2,3">`;
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_k1 cellmanualinput");
            
            td.setAttribute("onmouseover","this.setAttribute('title','Jangan ada karakter selain angka dan koma')");
            td.setAttribute("onmouseout","this.removeAttribute('title')");
            td.innerHTML = `<input oninput="previewmanual_k1(this,${i})" name="inputmanualk1_min${i}"  type="text" style="width:100%;border: none transparent;outline: none;background:transparent" placholder="contoh:1,2,3">`;
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_k1 cellmanualinput");
            td.setAttribute("data-keyraportindukmanual",`${prefix_stringkeyinduk}KI1_DESKRIPSI`);//data-keyraportindukmanual="${prefix_stringkeyinduk}_K1_NILAI"
            td.innerHTML=`<i class="fa fa-spin fa-spinner"></i>`
        }

        menumanual_k1.onclick = function (){
            raportmanualawal()
        }
        
        menumanual_k2.onclick = function (){
            fnmenumanual_k2();
        }
        menumanual_k3.onclick = function (){
            fnmenumanual_k3();
        }
        menumanual_k4.onclick = function (){
            fnmenumanual_k4();
        }
        menumanual_tbbb.onclick = function (){
            fnmenumanual_tbbb();
        }
        menumanual_kesehatan.onclick = function (){
            fnmenumanual_kesehatan();
        }
        menumanual_ekstrakurikuler.onclick = function (){
            fnmenumanual_ekstrakurikuler();
        }
        menumanual_saran.onclick = function (){
            fnmenumanual_saran();
        }
        menumanual_kenaikankelas.onclick = function (){
            fnmenumanual_kenaikankelas();
        }
        
    
    }else{
        
        let cellmanualinput = tabel.querySelectorAll(".cellmanualinput");
        cellmanualinput.forEach(el=>{
            if(el.className.indexOf("w3-hide")==-1){
                el.classList.add("w3-hide")
            }
        })
        sel_k1 = tabel.querySelectorAll(".sel_k1");
        sel_k1.forEach(el=>{
            if(el.className.indexOf("w3-hide")>-1){
                el.classList.remove("w3-hide")
            }
        });
        let mbtr = document.querySelectorAll(".mbtr");
        mbtr.forEach(el =>{
            if(el.className.indexOf("w3-pale-red")>-1){
                el.classList.remove("w3-pale-red")
            }
        });
        menumanual_k1.classList.add("w3-pale-red")
    }
    let tabel_deskripsi_k1 = document.querySelector(".add_indikatorindikatork1");
    if(tabel_deskripsi_k1 == null){
        arraydeskripsi_kd1 = ["berdoa sebelum belajar","meyakini kebesaran Allah","memberi salam pada setiap awal dan akhir kegiatan","bersyukur atas nikmat dan karunia Tuhan Yang Maha Esa","mensyukuri kemampuan manusia dalam mengendalikan diri","bersyukur ketika berhasil mengerjakan sesuatu","berserah diri (tawakal) kepada Tuhan setelah berikhtiar atau melakukan usaha","memelihara hubungan baik dengan sesama umat","menghormati orang lain yang menjalankan ibadah sesuai dengan agamanya","",""];
    }else{
        let tbk = tabel_deskripsi_k1.querySelector("tbody");
        arraydeskripsi_kd1 = []
        for(let j = 0 ; j < tbk.rows.length; j++){;
            let t = tbk.rows[j].cells[0].innerHTML
            arraydeskripsi_kd1.push(t)
        }
    }
    
    let tab = "rekapjurnalk1";

    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {

            if (k.result == 0) {
                info.innerHTML = "Anda belum pernah membuat data Rekapitulasi Jurnal Kompetensi Spiritual (KI-1). Nilai ini diambil dari hasil penyimpanan server yang telah Anda lakukan baik melalui menu Tab <b>Raport</b> atau <b>Raport Manual</b>";
                
            } else {
                //div.innerHTML = tekshtmlserver;
                info.innerHTML = `Database Rekapitulasi Jurnal Kompetensi Spiritual (KI-1) berhasil dimuat. Sebaiknya Anda selalu menyimpan ke server setiap ada perubahan di data ini agar tidak hilang saat Anda tidak mengerjakan data di tabel ini (Klik tombol Simpan Server K1 di bawah tabel). Nilai ini diambil dari hasil penyimpanan server yang telah Anda lakukan baik melalui menu Tab <b>Raport</b> atau <b>Raport Manual</b> ${k.data.length}`;
                for (j = 0; j < k.data.length; j++) {
                    let inputmaks = document.querySelector(`input[name='inputmanualk1_maks${j}']`);
                    let inputmin = document.querySelector(`input[name='inputmanualk1_min${j}']`);
                    let inputdesk = document.querySelector(`select[name='inputmanualk1_predikat${j}']`);
                    
                    inputdesk.value = k.data[j]["nilaipredikat"];
                    inputmaks.value = k.data[j]["indikmaks"];
                    inputmin.value =  k.data[j]["indikmin"];
                    previewmanual_k1(inputmin,j)
                }
                
            }
        })
        .catch(er => console.log(er));
    let badg = document.querySelector(".tandasiapk1");
    if(badg.className.indexOf("w3-hide")>-1){
        badg.classList.remove("w3-hide")
    }
}
const previewmanual_k1 = (el,i)=>{
    let val = el.value;
    let row = el.parentNode.parentElement.rowIndex;
    // console.log(el.value, el.parentNode.nodeName,el.nodeName, el.name);
    let deskripsimaks="", 
        deskripsimin = "";
    let namasiswa = tabelraportmanual.rows[row].cells[2].innerHTML
    if(el.nodeName == "INPUT"){
        if(el.name == "inputmanualk1_min"+i){
            let arr_kodedeskripsimin = val.replace(/\s+/g,"").split(",");
            deskripsimin = arr_kodedeskripsimin.map(m => arraydeskripsi_kd1[parseInt(m)]);
            let val2 = document.querySelector(`input[name='inputmanualk1_maks${i}']`).value;
            let arr_deskripimaks = val2.replace(/\s+/g,"").split(",");
            deskripsimaks = arr_deskripimaks.map(m => arraydeskripsi_kd1[parseInt(m)]);

        }else{
            let arr_deskripimaks = val.replace(/\s+/g,"").split(",");
            deskripsimaks = arr_deskripimaks.map(m => arraydeskripsi_kd1[parseInt(m)]);
            let val2 = document.querySelector(`input[name='inputmanualk1_min${i}']`).value;
            let arr_deskripimin = val2.replace(/\s+/g,"").split(",");
            deskripsimin = arr_deskripimin.map(m => arraydeskripsi_kd1[parseInt(m)]);
        }
    }else{
        let val1 = document.querySelector(`input[name='inputmanualk1_maks${i}']`).value;
            let arr_deskripimaks = val1.replace(/\s+/g,"").split(",");
            deskripsimaks =arr_deskripimaks.map(m => arraydeskripsi_kd1[parseInt(m)]);
        let val2 = document.querySelector(`input[name='inputmanualk1_min${i}']`).value;
            let arr_deskripimin = val2.replace(/\s+/g,"").split(",");
            deskripsimin = arr_deskripimin.map(m => arraydeskripsi_kd1[parseInt(m)]);
    }
    
    let teks = `Ananda ${namasiswa} <span style="color:blue">selalu</span> ${deskripsimaks.length==0?"":deskripsimaks.join(",")},`;
    teks +=` <span style="color:red">dan mulai tampak dalam</span> ${deskripsimin.length==0?"":deskripsimin.join(",")}`;
    tabelraportmanual.rows[row].cells[6].innerHTML = teks;
}
const previewmanual_k2 = (el,i)=>{
    let val = el.value;
    let row = el.parentNode.parentElement.rowIndex;
    // console.log(el.value, el.parentNode.nodeName,el.nodeName, el.name);
    let deskripsimaks=" Ada yang salah kode deskripsi minimal ", 
        deskripsimin = " Ada yang salah kode deskripsi minimal ";
    let namasiswa = tabelraportmanual.rows[row].cells[2].innerHTML
    if(el.nodeName == "INPUT"){
        if(el.name == "inputmanualk2_min"+i){
            let arr_kodedeskripsimin = val.replace(/\s+/g,"").split(",");
            deskripsimin = arr_kodedeskripsimin.map(m => arraydeskripsi_kd2[parseInt(m)]);
            let val2 = document.querySelector(`input[name='inputmanualk2_maks${i}']`).value;
            let arr_deskripimaks = val2.replace(/\s+/g,"").split(",");
            deskripsimaks = arr_deskripimaks.map(m => arraydeskripsi_kd2[parseInt(m)]);

        }else{
            let arr_deskripimaks = val.replace(/\s+/g,"").split(",");
            deskripsimaks = arr_deskripimaks.map(m => arraydeskripsi_kd2[parseInt(m)]);
            let val2 = document.querySelector(`input[name='inputmanualk2_min${i}']`).value;
            let arr_deskripimin = val2.replace(/\s+/g,"").split(",");
            deskripsimin = arr_deskripimin.map(m => arraydeskripsi_kd2[parseInt(m)]);
        }
    }else{
        let val1 = document.querySelector(`input[name='inputmanualk2_maks${i}']`).value;
            let arr_deskripimaks = val1.replace(/\s+/g,"").split(",");
            deskripsimaks =arr_deskripimaks.map(m => arraydeskripsi_kd2[parseInt(m)]);
        let val2 = document.querySelector(`input[name='inputmanualk2_min${i}']`).value;
            let arr_deskripimin = val2.replace(/\s+/g,"").split(",");
            deskripsimin = arr_deskripimin.map(m => arraydeskripsi_kd2[parseInt(m)]);
    }
    
    let teks = `Ananda ${namasiswa} <span style="color:blue">selalu</span> ${deskripsimaks.length==0?"":deskripsimaks.join(",")}, <span style="color:red">dan mulai tampak dalam</span> ${deskripsimin.length==0?"":deskripsimin.join(",")}`;
    tabelraportmanual.rows[row].cells[10].innerHTML = teks;
}
const manual_simpanserverK1 = ()=>{
    loadingtopbarin("loadingtopbar");
    let kloningbody = tabelraportmanual.querySelector("tbody");
    // let kloningbody = tabeldata.cloneNode(true);
    let arrayhead = ["nourut", "namasiswa", "nilaipredikat", "indikmaks", "indikmin"]
    let arraytabel = [];
    for(let i = 0 ; i < kloningbody.rows.length ; i++){
        let arraybaris = [];
        let isino = kloningbody.rows[i].cells[0].innerHTML
        let isinama = kloningbody.rows[i].cells[2].innerHTML
        let predikat = kloningbody.rows[i].cells[3].querySelector("select").value;
        let isimaks = kloningbody.rows[i].cells[4].querySelector("input").value;
        let isimin = kloningbody.rows[i].cells[5].querySelector("input").value;
        arraybaris.push(isino)
        arraybaris.push(isinama)
        arraybaris.push(predikat)
        arraybaris.push(isimaks)
        arraybaris.push(isimin)
        arraytabel.push(arraybaris);

    }
    //let headt = ["nourut", "namasiswa", "nilaipredikat", "indikmaks", "indikmin"];

    let tab = "rekapjurnalk1";
    let tabel = JSON.stringify(arraytabel);
    let head = JSON.stringify(arrayhead);

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
        clearInterval(stoploadingtopbar);
        let divlod = document.querySelector(".loadingtopbar");
        divlod.style.width = "100%";
        setTimeout(() => {
            divlod.style.width = "1px"
            divlod.className += " w3-hide";
        }, 3000);

    })
    .catch(er => alert(er))
}
const manual_simpanserverK2 = ()=>{
    loadingtopbarin("loadingtopbar");
    let kloningbody = tabelraportmanual.querySelector("tbody");
    // let kloningbody = tabeldata.cloneNode(true);
    let arrayhead = ["nourut", "namasiswa", "nilaipredikat", "indikmaks", "indikmin"]
    let arraytabel = [];
    for(let i = 0 ; i < kloningbody.rows.length ; i++){
        let arraybaris = [];
        let isino = kloningbody.rows[i].cells[0].innerHTML
        let isinama = kloningbody.rows[i].cells[2].innerHTML
        let predikat = kloningbody.rows[i].querySelector(`select[data-keyraportindukmanual="${prefix_stringkeyinduk}KI2_NILAI"]`).value;//kloningbody.rows[i].cells[6].querySelector("select").value;
        let isimaks = kloningbody.rows[i].querySelector(`input[name="inputmanualk2_maks${i}"]`).value;//name="inputmanualk2_maks29;//.cells[7].querySelector("input").value;
        let isimin = kloningbody.rows[i].querySelector(`input[name="inputmanualk2_min${i}"]`).value;//.cells[8].querySelector("input").value;
        arraybaris.push(isino)
        arraybaris.push(isinama)
        arraybaris.push(predikat)
        arraybaris.push(isimaks)
        arraybaris.push(isimin)
        arraytabel.push(arraybaris);

    }
    //let headt = ["nourut", "namasiswa", "nilaipredikat", "indikmaks", "indikmin"];

    let tab = "rekapjurnalk2";
    let tabel = JSON.stringify(arraytabel);
    let head = JSON.stringify(arrayhead);

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
        clearInterval(stoploadingtopbar);
        let divlod = document.querySelector(".loadingtopbar");
        divlod.style.width = "100%";
        setTimeout(() => {
            divlod.style.width = "1px"
            divlod.className += " w3-hide";
        }, 3000);

    })
    .catch(er => alert(er))
}
const  showhidetabelperkembanganlainnya =(Clls_Elm)=>{
    alert(Clls_Elm);
}
const isikanmanual_k1 = (row) =>{
    alert("k1 row = "+row)
}
const printadexistelemen = (kelas, portr = true,kondisi="")=>{
    let dom = document.querySelector("."+kelas);
    // let indom = dom.innerHTML.replace(/<table class="w3-table garis w3-tiny">/g,`<table class="w3-table garis w3-small">`);//.textContent;
    
    // let noSpace =indom.replace(/(\r\n|\n|\r)/gm, "").replace(/       /g,"");
    
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
    head.innerHTML += '<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">';

    //head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">';

    head.innerHTML += '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lobster">';
    head.innerHTML += '<link  rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">'

    head.innerHTML +='<link rel="stylesheet" href="https://syahandrianeda.github.io/syahandrianeda/css/stylegurukelas.css">'
    //head.innerHTML += `<style type="text/css"> .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border: none transparent;outline: none;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border: none transparent;outline: none;background-color:#eef;border:1px solid #000} .garis td,.garis th,.garis tr{border: none transparent;outline: none.5px solid rgb(119, 116, 116)} .garis th{border:1px solid #000;text-align:center;vertical-align:middle} </style>`;

    if(portr){
        head.innerHTML += `<style type="text/css" media="print">@media print {html,body{margin:0;padding:0}@page {size: A4 portrait;}}</style>`;
    }else{
        head.innerHTML += `<style type="text/css" media="print">@media print {html,body{margin:0;padding:0}@page {size: A4 landscape;}}</style>`;
    }
    
    body.innerHTML="";
    
        
        let dup= dom.cloneNode(true);
        // console.log(dup)
        if (dup.querySelector("tfoot") !=null){
            dup.querySelector("tfoot").innerHTML ="";
        }
        let cariinput, cariinputdom; 
        if(kelas == "halamanprint_dataraportmanual"){
            let ubahid = dup.querySelector("table");
            ubahid.setAttribute("id","ubahiddulu")
            cariinput = ubahid.querySelectorAll("[data-keyraportindukmanual]");// ;//dup.querySelectorAll("input")||dup.querySelectorAll("select"); 
            //data-keyraportindukmanual
            cariinputdom = dom.querySelectorAll("[data-keyraportindukmanual]"); ;//dup.querySelectorAll("input")||dup.querySelectorAll("select"); 

        }else if(kelas == "formulirkirim") {
            cariinput = dup.querySelectorAll("[data-dbindukutama]"); ;//dup.querySelectorAll("input")||dup.querySelectorAll("select"); 
            cariinputdom = dom.querySelectorAll("[data-dbindukutama]"); ;//dup.querySelectorAll("input")||dup.querySelectorAll("select"); 

        }
        if(cariinput !== null || cariinput !== undefined){
            for(let i = 0 ; i < cariinput.length ; i++){
                // console.log(cariinput[i],cariinput[i].nodeName,cariinput[i].type)
                if(cariinput[i].type == "date"){
                    var v = cariinput[i].value==""?"":tanggalfull(cariinput[i].value);
                    var mySpan = document.createElement("span");
                    mySpan.innerHTML = v;
                    let td = cariinput[i].parentNode;
                    cariinput[i].parentNode.replaceChild(mySpan, cariinput[i]);
                }else if(cariinput[i].type == "select-one"){
                    //console.log(cariinput[i].type, cariinput[i].getAttribute("data-keyraportindukmanual"))
                    let o = cariinput[i].options;
                    let s = o.selectedIndex;
                    let v = cariinputdom[i].value;//o[s].value;
                    // if(cariinput[i].getAttribute("data-keyraportindukmanual") == prefix_stringkeyinduk+"KENAIKAN_KELAS"){
                    //     console.log(cariinput[i].value, "kedua ", cariinputdom[i].value)
                    //     console.log(cariinput[i].getAttribute("data-keyraportindukmanual"));
                    // }
                    //console.log("larikesini", cariinput[i].nodeName,s,v,cariinputdom[i].value)
                    var mySpan = document.createElement("span");
                    mySpan.innerHTML = v;
                    let td = cariinput[i].parentNode;
                    // console.log(td)
                    cariinput[i].parentNode.replaceChild(mySpan, cariinput[i]);
                }else{
                    var v;// = cariinput[i].value;
                    if(cariinput[i].nodeName=="TD"){
                        //v = cariinput[i].innerText
                        cariinput[i].innerHTML = cariinput[i].innerText
                    }else{
                        v = cariinput[i].value;
                        var mySpan = document.createElement("span");
                        mySpan.innerHTML = v;
                        let td = cariinput[i].parentNode;
                        cariinput[i].parentNode.replaceChild(mySpan, cariinput[i]);;
                        if(cariinput[i].nodeName == "SELECT"){
                            console.log("Ada elemen select terdeteksi", cariinput[i].getAttribute("data-keyraportindukmanual") )
                        }
                    }
                }
            }
        }
        
        let tempatttd = document.createElement("div");
        tempatttd.setAttribute("class", "w3-row w3-margin-top");

        let ttdkepsek = document.createElement("div");
        ttdkepsek.setAttribute("class","w3-col l6 s6 w3-center");
        let htmlkepsek =`Menggetahui, <br>Kepala ${idNamaSekolah}<br><br><br><br><u><b>${idNamaKepsek}</b></u><br>NIP. ${idNipKepsek}`;
        ttdkepsek.innerHTML = htmlkepsek;
        tempatttd.appendChild(ttdkepsek);

        let ttdguru= document.createElement("div");
        ttdguru.setAttribute("class","w3-col l6 s6 w3-center");
        let htmlguru =`Depok, ${tanggalfull(new Date())}<br> ${idJenisGuru} ${idgurumapelmapel}<br><br><br><br><u><b>${namauser}</b></u><br>NIP. ${idNipGuruKelas}`;
        ttdguru.innerHTML = htmlguru;
        tempatttd.appendChild(ttdguru);
        dup.appendChild(tempatttd);

        body.appendChild(dup);
    
    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();
}

const fnmenumanual_k2 = () => {
    //// awal k2");
    let judul = document.querySelector(".head_dataraportmanual");
    let info = document.querySelector(".info_mbtr");
    info.innerHTML = `<img src="/img/barloading.gif"> memproses data ...`;
    judul.innerHTML = "REKAPITULASI DAN DESKRIPSI NILAI SOSIAL (KI-2)<br>";
    judul.innerHTML +="KELAS " + idNamaKelas + " SEMESTER " + idSemester +"<br>";
    judul.innerHTML +="TAHUN PELAJARAN " + idTeksTapel;
    let tabel = document.getElementById("tabelraportmanual");
    let thead = tabel.querySelector("thead");
    let tbody = tabel.querySelector("tbody");
    let tfoot= tabel.querySelector("tfoot");
    let sel_k2 = tabel.querySelectorAll(".sel_k2");
    let cellmanualinput = tabel.querySelectorAll(".cellmanualinput");
        cellmanualinput.forEach(el=>{
            if(el.className.indexOf("w3-hide")==-1){
                el.classList.add("w3-hide")
            }
        })
        if(sel_k2.length == 0){
            let th = document.createElement("th");//thead.rows[0].insertCell(-1);
            th.innerHTML ="Nilai Sosial (KI-2)";
            th.setAttribute("colspan","4");
            th.setAttribute("class","sel_k2 cellmanualinput");
            thead.rows[0].appendChild(th)

            th = document.createElement("th");//thead.rows[1].insertCell(-1);
            th.setAttribute("colspan","4");
            th.setAttribute("class","sel_k2 w3-tiny w3-light-grey cellmanualinput");
            th.innerHTML ="Klik sel untuk mengedit/preview";
            thead.rows[1].appendChild(th)
            
            th = document.createElement("th");//thead.rows[2].insertCell(-1);
            th.innerHTML ="Predikat";
            th.setAttribute("class","sel_k2 w3-light-grey cellmanualinput");
            
            thead.rows[2].appendChild(th)
            
            
            th = document.createElement("th");//thead.rows[2].insertCell(-1);
            th.setAttribute("class","sel_k2 cellmanualinput");
            th.innerHTML ="Indikator<br>Maksimal";
            thead.rows[2].appendChild(th)

            th = document.createElement("th");//thead.rows[2].insertCell(-1);
            th.setAttribute("class","sel_k2 cellmanualinput");
            th.innerHTML ="Indikator<br>Minimal";
            thead.rows[2].appendChild(th);
            th = document.createElement("th");//thead.rows[2].insertCell(-1);
            th.setAttribute("class","sel_k2 cellmanualinput");
            th.innerHTML ="Deskripsi";
            thead.rows[2].appendChild(th)
            //tfoot
            th = document.createElement("th");//thead.rows[2].insertCell(-1);
            th.setAttribute("colspan","4");
            th.setAttribute("class","sel_k2 cellmanualinput");
            th.innerHTML = `<button onclick="manual_simpanserverK2()" class=" w3-btn w3-round-xlarge w3-pale-green w3-bottombar w3-tiny w3-border-purple">Simpan Server K2</button>`;
            tfoot.rows[0].appendChild(th)
            //dibaris siswanya
            for(let i = 0 ; i < jsondatasiswa.length ; i++){
                let tr = tbody.rows[i];
                
                let td = tr.insertCell(-1);
                td.setAttribute("class","sel_k2 cellmanualinput");
                
                td.setAttribute("onmouseover","this.setAttribute('title','Pilih Predikat untuk nilai Sosial')");
                td.setAttribute("onmouseout","this.removeAttribute('title')");
                let html = `<select style="width:100%;border: none transparent;outline: none;background:transparent" name="inputmanualk2_predikat${i}" onchange="previewmanual_k2(this,${i})" data-keyraportindukmanual="${prefix_stringkeyinduk}KI2_NILAI">`;
                html +=`<option value ="Sangat Baik">Sangat Baik</option><option value ="Baik">Baik</option><option value ="Cukup">Cukup</option><option value ="Perlu Bimbingan">Perlu Bimbingan</option>`;
                html += `</select>`;
                td.innerHTML = html;
                td = tr.insertCell(-1);
                td.setAttribute("class","sel_k2 cellmanualinput");
                
                td.setAttribute("onmouseover","this.setAttribute('title','Jangan ada karakter selain angka dan koma')");
                td.setAttribute("onmouseout","this.removeAttribute('title')");
                td.innerHTML = `<input type="text" oninput="previewmanual_k2(this,${i})" name="inputmanualk2_maks${i}" style="width:100%;border: none transparent;outline: none;background:transparent" placholder="contoh:1,2,3">`;
                td = tr.insertCell(-1);
                td.setAttribute("class","sel_k2 cellmanualinput");
                
                td.setAttribute("onmouseover","this.setAttribute('title','Jangan ada karakter selain angka dan koma')");
                td.setAttribute("onmouseout","this.removeAttribute('title')");
                td.innerHTML = `<input oninput="previewmanual_k2(this,${i})" name="inputmanualk2_min${i}"  type="text" style="width:100%;border: none transparent;outline: none;background:transparent" placholder="contoh:1,2,3">`;
                td = tr.insertCell(-1);
                td.setAttribute("class","sel_k2 cellmanualinput");
                
                td.setAttribute("data-keyraportindukmanual",`${prefix_stringkeyinduk}KI2_DESKRIPSI`);
                td.innerHTML=``;
            }
            
            
        
        }else{
            sel_k2 = tabel.querySelectorAll(".sel_k2");
            sel_k2.forEach(el=>{
                if(el.className.indexOf("w3-hide")>-1){
                    el.classList.remove("w3-hide")
                }
            })
        }
    let tabel_deskripsi_k2 = document.querySelector(".add_indikatorindikatork2");
    if(tabel_deskripsi_k2 == null){
        arraydeskripsi_kd2 = ["tidak pernah berbohong, tidak mencontek, dan sikap jujur lainnya","mengikuti peraturan dan tata tertib sekolah","mengerjakan tugas/PR tepat waktu","menyelesaikan piket, mengerjakan tugas/PR","mengakui kesalahan, tidak menyalahkan orang lain","menghomati orang lain dan menghormati cara bicara dengan tepat","ramah, ceria, bersahabat, dan selalu tersenyum","ikut berperan serta dan aktif dalam kegiatan sosial di lingkungan sekitar","menunjukkan rasa peduli terhadap teman yang lain","",""];
    }else{
        let tbk = tabel_deskripsi_k2.querySelector("tbody");
        arraydeskripsi_kd2 = []
        for(let j = 0 ; j < tbk.rows.length; j++){;
            let t = tbk.rows[j].cells[0].innerHTML
            arraydeskripsi_kd2.push(t)
        }
    }
    
    let tab = "rekapjurnalk2";

    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {

            if (k.result == 0) {
                info.innerHTML = "Anda belum pernah membuat data Rekapitulasi Jurnal Kompetensi Sosial (KI-2). Nilai ini diambil dari hasil penyimpanan server yang telah Anda lakukan baik melalui menu Tab <b>Raport</b> atau <b>Raport Manual</b>";
                
            } else {
                //div.innerHTML = tekshtmlserver;
                info.innerHTML = `Database Rekapitulasi Jurnal Kompetensi Sosial (KI-2) berhasil dimuat. Sebaiknya Anda selalu menyimpan ke server setiap ada perubahan di data ini agar tidak hilang saat Anda tidak mengerjakan data di tabel ini (Klik tombol Simpan Server K2 di bawah tabel). Nilai ini diambil dari hasil penyimpanan server yang telah Anda lakukan baik melalui menu Tab <b>Raport</b> atau <b>Raport Manual</b>`;
                for (j = 0; j < k.data.length; j++) {
                    let inputmaks = document.querySelector(`input[name='inputmanualk2_maks${j}']`);
                    let inputmin = document.querySelector(`input[name='inputmanualk2_min${j}']`);
                    let inputdesk = document.querySelector(`select[name='inputmanualk2_predikat${j}']`);
                    
                    inputdesk.value = k.data[j]["nilaipredikat"];
                    inputmaks.value = k.data[j]["indikmaks"];
                    inputmin.value =  k.data[j]["indikmin"];
                    previewmanual_k2(inputmin,j)
                }
                
            }
        })
        .catch(er => console.log(er))
    
        let mbtr = document.querySelectorAll(".mbtr");
        mbtr.forEach(el =>{
            if(el.className.indexOf("w3-pale-red")>-1){
                el.classList.remove("w3-pale-red")
            }
        });
        menumanual_k2.classList.add("w3-pale-red");
        let badg = document.querySelector(".tandasiapk2");
    if(badg.className.indexOf("w3-hide")>-1){
        badg.classList.remove("w3-hide")
    }
}


const fnmenumanual_k3 = () => {
    //// awal k3");
    let judul = document.querySelector(".head_dataraportmanual");
    let info = document.querySelector(".info_mbtr");
    info.innerHTML = `<img src="/img/barloading.gif"> memproses data ...`;
    judul.innerHTML = "REKAPITULASI KOMPETENSI PENGETAHUAN (KI-3)<br>";
    judul.innerHTML +="KELAS " + idNamaKelas + " SEMESTER " + idSemester +"<br>";
    judul.innerHTML +="TAHUN PELAJARAN " + idTeksTapel;
    let tabel = document.getElementById("tabelraportmanual");
    let thead = tabel.querySelector("thead");
    let tbody = tabel.querySelector("tbody");
    let tfoot= tabel.querySelector("tfoot");
    let koleksimapel = koleksiarraymapelaktif()["kodemapel"];
    let koeleksitanpaagama = koleksimapel.filter(s => ["PAI","PKRIS","PKATO","PHIND","PBUDH","PKONG"].indexOf(s) == -1);
    koeleksitanpaagama.splice(0,0,"AGAMA");
    let datamapel = koeleksitanpaagama;//.splice(0,0,"AGAMA");//koleksiarraymapelaktif()["kodemapel"];//
    let dbkurikulum = buateditorkdaktif
    //console.log(koleksimapel, datamapel,dbkurikulum)
    let sel_k3 = tabel.querySelectorAll(".sel_k3");
    let cellmanualinput = tabel.querySelectorAll(".cellmanualinput");
        cellmanualinput.forEach(el=>{
            if(el.className.indexOf("w3-hide")==-1){
                el.classList.add("w3-hide")
            }
        })
        // 
            sel_k3 = tabel.querySelectorAll(".sel_k3");
            sel_k3.forEach(el=>{
                if(el.className.indexOf("w3-hide")>-1){
                    el.classList.remove("w3-hide")
                }
            })
        let mbtr = document.querySelectorAll(".mbtr");
        mbtr.forEach(el =>{
            if(el.className.indexOf("w3-pale-red")>-1){
                el.classList.remove("w3-pale-red")
            }
        });
        menumanual_k3.classList.add("w3-pale-red")
        
        shownilairaportkd("k3");
    let badg = document.querySelector(".tandasiapk3");
    if(badg.className.indexOf("w3-hide")>-1){
        badg.classList.remove("w3-hide")
    }

}
const convertAgamaSiswaMapel = (agama) =>{
    let arrayagama = ["PAI","PKRIS","PKATO","PHIND","PBUDH","PKONG"];
    let arrayteksagama =["islam","kristen","katholik","hindu","budha","konghucu"];
    let paramLower = agama.replace(/\s+/g,"").toLowerCase();
    let indexTeks = arrayteksagama.indexOf(paramLower);
    let getAgama = arrayagama[indexTeks];
    return getAgama
}
const fnmenumanual_k4 = () => {
    // awal k4")
    let judul = document.querySelector(".head_dataraportmanual");
    let info = document.querySelector(".info_mbtr");
    info.innerHTML = `<img src="/img/barloading.gif"> memproses data ...`;
    judul.innerHTML = "REKAPITULASI KOMPETENSI KETERAMPILAN (KI-4)<br>";
    judul.innerHTML +="KELAS " + idNamaKelas + " SEMESTER " + idSemester +"<br>";
    judul.innerHTML +="TAHUN PELAJARAN " + idTeksTapel;
    let tabel = document.getElementById("tabelraportmanual");
    let thead = tabel.querySelector("thead");
    let tbody = tabel.querySelector("tbody");
    let tfoot= tabel.querySelector("tfoot");
    let koleksimapel = koleksiarraymapelaktif()["kodemapel"];
    let koeleksitanpaagama = koleksimapel.filter(s => ["PAI","PKRIS","PKATO","PHIND","PBUDH","PKONG"].indexOf(s) == -1);
    koeleksitanpaagama.splice(0,0,"AGAMA");
    let datamapel = koeleksitanpaagama;//.splice(0,0,"AGAMA");//koleksiarraymapelaktif()["kodemapel"];//
    let dbkurikulum = buateditorkdaktif
    //console.log(koleksimapel, datamapel,dbkurikulum)
    let sel_k4 = tabel.querySelectorAll(".sel_k4");
    let cellmanualinput = tabel.querySelectorAll(".cellmanualinput");
        cellmanualinput.forEach(el=>{
            if(el.className.indexOf("w3-hide")==-1){
                el.classList.add("w3-hide")
            }
        })
            sel_k4 = tabel.querySelectorAll(".sel_k4");
            sel_k4.forEach(el=>{
                if(el.className.indexOf("w3-hide")>-1){
                    el.classList.remove("w3-hide")
                }
            })
            let mbtr = document.querySelectorAll(".mbtr");
            mbtr.forEach(el =>{
                if(el.className.indexOf("w3-pale-red")>-1){
                    el.classList.remove("w3-pale-red")
                }
            });
            menumanual_k4.classList.add("w3-pale-red")
            
            shownilairaportkd("k4");
            let badg = document.querySelector(".tandasiapk4");
            if(badg.className.indexOf("w3-hide")>-1){
                badg.classList.remove("w3-hide")
            }
}
const fnmenumanual_tbbb = () => {
    // awal tinggibadan berat badan");//
    let judul = document.querySelector(".head_dataraportmanual");
    let info = document.querySelector(".info_mbtr");
    info.innerHTML = `<img src="/img/barloading.gif"> memproses data ...`;
    judul.innerHTML = "DATA PERTUMBUHAN FISIK SISWA (TINGGI DAN BERAT BADAN)<br>";
    judul.innerHTML +="KELAS " + idNamaKelas + " SEMESTER " + idSemester +"<br>";
    judul.innerHTML +="TAHUN PELAJARAN " + idTeksTapel;
    let sel_tbbb = tabelraportmanual.querySelectorAll(".sel_tbbb");
    let cellmanualinput = tabelraportmanual.querySelectorAll(".cellmanualinput");
        cellmanualinput.forEach(el=>{
            if(el.className.indexOf("w3-hide")==-1){
                el.classList.add("w3-hide")
            }
        });
        sel_tbbb.forEach(el=>{
            if(el.className.indexOf("w3-hide")>-1){
                el.classList.remove("w3-hide");
            }
        })
        let seltombolfooter = tabelraportmanual.querySelectorAll(".sel_perkembanganlainnya");
        seltombolfooter.forEach(el=>{
            if(el.className.indexOf("w3-hide")>-1){
                el.classList.remove("w3-hide");
            }
        })
    panggildataperkembanganuntukmanual(info);
    let mbtr = document.querySelectorAll(".mbtr");
            mbtr.forEach(el =>{
                if(el.className.indexOf("w3-pale-red")>-1){
                    el.classList.remove("w3-pale-red")
                }
            });
            menumanual_tbbb.classList.add("w3-pale-red");
            let badges = document.querySelectorAll(".tandasiapperkembangan");
            badges.forEach(badg =>{
                if(badg.className.indexOf("w3-hide")>-1){
                    badg.classList.remove("w3-hide")
                }
            })
}
const fnmenumanual_kesehatan = () => {
    // awal kesehatan");
    let judul = document.querySelector(".head_dataraportmanual");
    let info = document.querySelector(".info_mbtr");
    info.innerHTML = `<img src="/img/barloading.gif"> memproses data ...`;
    judul.innerHTML = "DATA PERKEMBANGAN KONDISI KESEHATAN PESERRTA DIDIK<br>";
    judul.innerHTML +="KELAS " + idNamaKelas + " SEMESTER " + idSemester +"<br>";
    judul.innerHTML +="TAHUN PELAJARAN " + idTeksTapel;
    let sel_kesehatan = tabelraportmanual.querySelectorAll(".sel_kesehatan");
    let cellmanualinput = tabelraportmanual.querySelectorAll(".cellmanualinput");
        cellmanualinput.forEach(el=>{
            if(el.className.indexOf("w3-hide")==-1){
                el.classList.add("w3-hide")
            }
        });
        sel_kesehatan.forEach(el=>{
            if(el.className.indexOf("w3-hide")>-1){
                el.classList.remove("w3-hide");
            }
        })
        let seltombolfooter = tabelraportmanual.querySelectorAll(".sel_perkembanganlainnya");
        seltombolfooter.forEach(el=>{
            if(el.className.indexOf("w3-hide")>-1){
                el.classList.remove("w3-hide");
            }
        })
        panggildataperkembanganuntukmanual(info);
        let mbtr = document.querySelectorAll(".mbtr");
            mbtr.forEach(el =>{
                if(el.className.indexOf("w3-pale-red")>-1){
                    el.classList.remove("w3-pale-red")
                }
            });
            menumanual_kesehatan.classList.add("w3-pale-red");
            let badges = document.querySelectorAll(".tandasiapperkembangan");
            badges.forEach(badg =>{
                if(badg.className.indexOf("w3-hide")>-1){
                    badg.classList.remove("w3-hide")
                }
            })
}
const fnmenumanual_ekstrakurikuler = () => {
    // awal eksekul");
    let judul = document.querySelector(".head_dataraportmanual");
    let info = document.querySelector(".info_mbtr");
    info.innerHTML = `<img src="/img/barloading.gif"> memproses data ...`;
    judul.innerHTML = "EKSTRAKURIKULER, PERKEMBANGAN MINAT, DAN BAKAT<br>";
    judul.innerHTML +="KELAS " + idNamaKelas + " SEMESTER " + idSemester +"<br>";
    judul.innerHTML +="TAHUN PELAJARAN " + idTeksTapel;
    let sel_ekskul = tabelraportmanual.querySelectorAll(".sel_ekskul");
    let cellmanualinput = tabelraportmanual.querySelectorAll(".cellmanualinput");
        cellmanualinput.forEach(el=>{
            if(el.className.indexOf("w3-hide")==-1){
                el.classList.add("w3-hide")
            }
        });
        sel_ekskul.forEach(el=>{
            if(el.className.indexOf("w3-hide")>-1){
                el.classList.remove("w3-hide");
            }
        })
        let seltombolfooter = tabelraportmanual.querySelectorAll(".sel_perkembanganlainnya");
        seltombolfooter.forEach(el=>{
            if(el.className.indexOf("w3-hide")>-1){
                el.classList.remove("w3-hide");
            }
        })
        panggildataperkembanganuntukmanual(info);
        let mbtr = document.querySelectorAll(".mbtr");
            mbtr.forEach(el =>{
                if(el.className.indexOf("w3-pale-red")>-1){
                    el.classList.remove("w3-pale-red")
                }
            });
            menumanual_ekstrakurikuler.classList.add("w3-pale-red");
            let badges = document.querySelectorAll(".tandasiapperkembangan");
            badges.forEach(badg =>{
                if(badg.className.indexOf("w3-hide")>-1){
                    badg.classList.remove("w3-hide")
                }
            })
}
const fnmenumanual_saran = () => {
    // awal saran");//sel_saran
    let judul = document.querySelector(".head_dataraportmanual");
    let info = document.querySelector(".info_mbtr");
    info.innerHTML = `<img src="/img/barloading.gif"> memproses data ...`;
    judul.innerHTML = "SARAN-SARAN YANG DIBERIKAN DI AKHIR SEMESTER PEMBELALJARAN<br>";
    judul.innerHTML +="KELAS " + idNamaKelas + " SEMESTER " + idSemester +"<br>";
    judul.innerHTML +="TAHUN PELAJARAN " + idTeksTapel;
    let sel_saran = tabelraportmanual.querySelectorAll(".sel_saran");
    let cellmanualinput = tabelraportmanual.querySelectorAll(".cellmanualinput");
        cellmanualinput.forEach(el=>{
            if(el.className.indexOf("w3-hide")==-1){
                el.classList.add("w3-hide")
            }
        });
        sel_saran.forEach(el=>{
            if(el.className.indexOf("w3-hide")>-1){
                el.classList.remove("w3-hide");
            }
        })
        let seltombolfooter = tabelraportmanual.querySelectorAll(".sel_perkembanganlainnya");
        seltombolfooter.forEach(el=>{
            if(el.className.indexOf("w3-hide")>-1){
                el.classList.remove("w3-hide");
            }
        })
        panggildataperkembanganuntukmanual(info);
        let mbtr = document.querySelectorAll(".mbtr");
            mbtr.forEach(el =>{
                if(el.className.indexOf("w3-pale-red")>-1){
                    el.classList.remove("w3-pale-red")
                }
            });
            menumanual_saran.classList.add("w3-pale-red");
            let badges = document.querySelectorAll(".tandasiapperkembangan");
            badges.forEach(badg =>{
                if(badg.className.indexOf("w3-hide")>-1){
                    badg.classList.remove("w3-hide")
                }
            })
}
const fnmenumanual_prestasi = () => {
    // presstasi");//sel_saran
    let judul = document.querySelector(".head_dataraportmanual");
    let info = document.querySelector(".info_mbtr");
    info.innerHTML = `<img src="/img/barloading.gif"> memproses data ...`;
    judul.innerHTML = "DATA PRESTASI SISWA<br>";
    judul.innerHTML +="KELAS " + idNamaKelas + " SEMESTER " + idSemester +"<br>";
    judul.innerHTML +="TAHUN PELAJARAN " + idTeksTapel;
    let sel_prestasi = tabelraportmanual.querySelectorAll(".sel_prestasi");
    let cellmanualinput = tabelraportmanual.querySelectorAll(".cellmanualinput");
        cellmanualinput.forEach(el=>{
            if(el.className.indexOf("w3-hide")==-1){
                el.classList.add("w3-hide")
            }
        });
        sel_prestasi.forEach(el=>{
            if(el.className.indexOf("w3-hide")>-1){
                el.classList.remove("w3-hide");
            }
        })
        let seltombolfooter = tabelraportmanual.querySelectorAll(".sel_perkembanganlainnya");
        seltombolfooter.forEach(el=>{
            if(el.className.indexOf("w3-hide")>-1){
                el.classList.remove("w3-hide");
            }
        })
        panggildataperkembanganuntukmanual(info);
        let mbtr = document.querySelectorAll(".mbtr");
            mbtr.forEach(el =>{
                if(el.className.indexOf("w3-pale-red")>-1){
                    el.classList.remove("w3-pale-red")
                }
            });
            menumanual_prestasi.classList.add("w3-pale-red");
            let badges = document.querySelectorAll(".tandasiapperkembangan");
            badges.forEach(badg =>{
                if(badg.className.indexOf("w3-hide")>-1){
                    badg.classList.remove("w3-hide")
                }
            })
}
const fnmenumanual_kenaikankelas = () => {
    // awal kenaikankelas")
    let judul = document.querySelector(".head_dataraportmanual");
    let info = document.querySelector(".info_mbtr");
    info.innerHTML = `<img src="/img/barloading.gif"> memproses data ...`;
    judul.innerHTML = "DAFTAR KENAIKAN KELAS <br>";
    judul.innerHTML +="KELAS " + idNamaKelas + " SEMESTER " + idSemester +"<br>";
    judul.innerHTML +="TAHUN PELAJARAN " + idTeksTapel;
    let sel_kenaikan = tabelraportmanual.querySelectorAll(".sel_kenaikankelas");
    let cellmanualinput = tabelraportmanual.querySelectorAll(".cellmanualinput");
        cellmanualinput.forEach(el=>{
            if(el.className.indexOf("w3-hide")==-1){
                el.classList.add("w3-hide")
            }
        });
        sel_kenaikan.forEach(el=>{
            if(el.className.indexOf("w3-hide")>-1){
                el.classList.remove("w3-hide");
            }
        })
    let seltombolfooter = tabelraportmanual.querySelectorAll(".sel_perkembanganlainnya");
        seltombolfooter.forEach(el=>{
            if(el.className.indexOf("w3-hide")>-1){
                el.classList.remove("w3-hide");
            }
        })
    panggildataperkembanganuntukmanual(info);
    let mbtr = document.querySelectorAll(".mbtr");
            mbtr.forEach(el =>{
                if(el.className.indexOf("w3-pale-red")>-1){
                    el.classList.remove("w3-pale-red")
                }
            });
            menumanual_kenaikankelas.classList.add("w3-pale-red");
            let badges = document.querySelectorAll(".tandasiapperkembangan");
            badges.forEach(badg =>{
                if(badg.className.indexOf("w3-hide")>-1){
                    badg.classList.remove("w3-hide")
                }
            })
}
const fnmenumanual_kelulusan = ()=>{
    // awal kelulusan")
    let judul = document.querySelector(".head_dataraportmanual");
    let info = document.querySelector(".info_mbtr");
    info.innerHTML = `<img src="/img/barloading.gif"> memproses data ...`;
    judul.innerHTML = "DAFTAR KELULUSAN DAN SISWA MELANJUTKAN  <br>";
    judul.innerHTML +="KELAS " + idNamaKelas + " SEMESTER " + idSemester +"<br>";
    judul.innerHTML +="TAHUN PELAJARAN " + idTeksTapel;
    let sel_kelulusansiswa = tabelraportmanual.querySelectorAll(".sel_kelulusansiswa");
    let cellmanualinput = tabelraportmanual.querySelectorAll(".cellmanualinput");
        cellmanualinput.forEach(el=>{
            if(el.className.indexOf("w3-hide")==-1){
                el.classList.add("w3-hide")
            }
        });
        sel_kelulusansiswa.forEach(el=>{
            if(el.className.indexOf("w3-hide")>-1){
                el.classList.remove("w3-hide");
            }
        })
        let mbtr = document.querySelectorAll(".mbtr");
        mbtr.forEach(el =>{
            if(el.className.indexOf("w3-pale-red")>-1){
                el.classList.remove("w3-pale-red")
            }
        });
        menumanual_kelulusan.classList.add("w3-pale-red")
        info.innerHTML = "";
        let badg = document.querySelector(".tandasiapkelulusan");
        
            if(badg.className.indexOf("w3-hide")>-1){
                badg.classList.remove("w3-hide")
            }
        
}
const fnmenumanual_deksripsik3 = ()=>{
    
    let judul = document.querySelector(".head_dataraportmanual");
    let info = document.querySelector(".info_mbtr");
    info.innerHTML = `<img src="/img/barloading.gif"> memproses data ...`;
    judul.innerHTML = "REKAPITULASI KETERANGAN DESKRIPSI RAPORT KOMPETENSI PENGETAHUAN (KI-3) <br>";
    judul.innerHTML +="KELAS " + idNamaKelas + " SEMESTER " + idSemester +"<br>";
    judul.innerHTML +="TAHUN PELAJARAN " + idTeksTapel;
    let sel_deskripsi_k3 = tabelraportmanual.querySelectorAll(".sel_deskripsi_k3");
    let cellmanualinput = tabelraportmanual.querySelectorAll(".cellmanualinput");
        cellmanualinput.forEach(el=>{
            if(el.className.indexOf("w3-hide")==-1){
                el.classList.add("w3-hide")
            }
        });
        sel_deskripsi_k3.forEach(el=>{
            if(el.className.indexOf("w3-hide")>-1){
                el.classList.remove("w3-hide");
            }
        })
        let mbtr = document.querySelectorAll(".mbtr");
        mbtr.forEach(el =>{
            if(el.className.indexOf("w3-pale-red")>-1){
                el.classList.remove("w3-pale-red")
            }
        });
        menumanual_deskripsik3.classList.add("w3-pale-red")
        panggilkompetensiasli("k3","k3")
        aktifkanmapel_deskripsimanual(tabelraportmanual.querySelectorAll(".tombolpilihmapeleditdeskripsi")[0],"k3","AGAMA");
        //info.innerHTML = "";
        let badg = document.querySelector(".tandasiapk3deskripsi");
        
            if(badg.className.indexOf("w3-hide")>-1){
                badg.classList.remove("w3-hide")
            }
}
const fnmenumanual_deksripsik4 = ()=>{
    
    let judul = document.querySelector(".head_dataraportmanual");
    let info = document.querySelector(".info_mbtr");
    info.innerHTML = `<img src="/img/barloading.gif"> memproses data ...`;
    judul.innerHTML = "REKAPITULASI KETERANGAN DESKRIPSI RAPORT KOMPETENSI KETERAMPILAN (KI-4) <br>";
    judul.innerHTML +="KELAS " + idNamaKelas + " SEMESTER " + idSemester +"<br>";
    judul.innerHTML +="TAHUN PELAJARAN " + idTeksTapel;
    let sel_deskripsi_k4 = tabelraportmanual.querySelectorAll(".sel_deskripsi_k4");
    let cellmanualinput = tabelraportmanual.querySelectorAll(".cellmanualinput");
        cellmanualinput.forEach(el=>{
            if(el.className.indexOf("w3-hide")==-1){
                el.classList.add("w3-hide")
            }
        });
        sel_deskripsi_k4.forEach(el=>{
            if(el.className.indexOf("w3-hide")>-1){
                el.classList.remove("w3-hide");
            }
        })
        let mbtr = document.querySelectorAll(".mbtr");
        mbtr.forEach(el =>{
            if(el.className.indexOf("w3-pale-red")>-1){
                el.classList.remove("w3-pale-red")
            }
        });
        menumanual_deskripsik4.classList.add("w3-pale-red");
        panggilkompetensiasli("k4","k4")
        aktifkanmapel_deskripsimanual(tabelraportmanual.querySelectorAll(".tombolpilihmapeleditdeskripsi")[0],"k4","AGAMA");
        //info.innerHTML = "";
        let badg = document.querySelector(".tandasiapk4deskripsi");
        
            if(badg.className.indexOf("w3-hide")>-1){
                badg.classList.remove("w3-hide")
            }
}
const fnmenumanual_kehadiransiswa = ()=>{
    // awal KEHADIRAN SISWA")
    let judul = document.querySelector(".head_dataraportmanual");
    let info = document.querySelector(".info_mbtr");
    info.innerHTML = `<img src="/img/barloading.gif"> memproses data ...`;
    judul.innerHTML = "REKAPITULASI KEHADIRAN SISWA <br>";
    judul.innerHTML +="KELAS " + idNamaKelas + " SEMESTER " + idSemester +"<br>";
    judul.innerHTML +="TAHUN PELAJARAN " + idTeksTapel;
    let sel_kehadiransiswa = tabelraportmanual.querySelectorAll(".sel_kehadiransiswa");
    let cellmanualinput = tabelraportmanual.querySelectorAll(".cellmanualinput");
        cellmanualinput.forEach(el=>{
            if(el.className.indexOf("w3-hide")==-1){
                el.classList.add("w3-hide")
            }
        });
        sel_kehadiransiswa.forEach(el=>{
            if(el.className.indexOf("w3-hide")>-1){
                el.classList.remove("w3-hide");
            }
        })
        let mbtr = document.querySelectorAll(".mbtr");
        mbtr.forEach(el =>{
            if(el.className.indexOf("w3-pale-red")>-1){
                el.classList.remove("w3-pale-red")
            }
        });
        menumanual_kehadiransiswa.classList.add("w3-pale-red")
        //aktifkanmapel_deskripsimanual(tabelraportmanual.querySelectorAll(".tombolpilihmapeleditdeskripsi")[0],"k4","AGAMA");
        panggilkehadiransiswadariserver(info)
        
        let badg = document.querySelector(".tandasiapk4deskripsi");
        
            if(badg.className.indexOf("w3-hide")>-1){
                badg.classList.remove("w3-hide")
            }
}
const bikintabelawalraportmanual = () =>{
    let judul = document.querySelector(".head_dataraportmanual");
    let info = document.querySelector(".info_mbtr");
    info.innerHTML = `<img src="/img/barloading.gif"> memproses data ...`;
    judul.innerHTML = "REKAPITULASI DAN DESKRIPSI NILAI SPIRITUAL (KI-1)";
    judul.innerHTML +="KELAS " + idNamaKelas + " SEMESTER " + idSemester +"<br>";
    judul.innerHTML +="TAHUN PELAJARAN " + idTeksTapel;

    let tabel = document.getElementById("tabelraportmanual");
    let thead = tabel.querySelector("thead");
    let tbody = tabel.querySelector("tbody");
    let tfoot= tabel.querySelector("tfoot");
    let koleksimapel = koleksiarraymapelaktif()["kodemapel"];
    let koeleksitanpaagama = koleksimapel.filter(s => ["PAI","PKRIS","PKATO","PHIND","PBUDH","PKONG"].indexOf(s) == -1);
    koeleksitanpaagama.splice(0,0,"AGAMA");
    let datamapel = koeleksitanpaagama;//.splice(0,0,"AGAMA");//koleksiarraymapelaktif()["kodemapel"];//
    let dbkurikulum = buateditorkdaktif
    // //console.log(koleksimapel, datamapel,dbkurikulum)
    let sel_k1 = tabel.querySelectorAll(".sel_k1");
    // let menumanual_k1 = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_ki1")
    // let menumanual_k2 =document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_ki2"),
    // menumanual_k3 = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_ki3"), 
    // menumanual_k4 = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_ki4");
    // let menumanual_tbbb = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_tbbb");//mbtr_tbbb perkembangan lainnya;
    // let menumanual_kesehatan = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_kesehatan");//mbtr_tbbb perkembangan lainnya;
    // let menumanual_ekstrakurikuler = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_ekstrakurikuler");//mbtr_tbbb perkembangan lainnya;
    // let menumanual_saran = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_saran");//mbtr_tbbb perkembangan lainnya;
    // let menumanual_kenaikankelas = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_kenaikankelas");//mbtr_tbbb perkembangan lainnya;
    // let menumanual_prestasi = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_prestasi");//mbtr_tbbb perkembangan lainnya;
    // let menumanual_kelulusan = document.getElementById("menubar_tabelraportmanual").querySelector(".mbtr_kelulusan");//mbtr_tbbb perkembangan lainnya;
    // //bikindata siswa:
    let tbodyRow = tbody.rows;
    
    if(tbodyRow.length == 0){
        for(let i = 0 ; i < jsondatasiswa.length ; i++){
            let tr = tbody.insertRow(-1);
            let td = tr.insertCell(-1);
            td.innerHTML = (i+1);
            td = tr.insertCell(-1);
            td.innerHTML = jsondatasiswa[i].id;
            td = tr.insertCell(-1);
            td.innerHTML = jsondatasiswa[i].pd_nama;
        }
        
    }
    if(sel_k1.length == 0){

    
    //k1
    let th = document.createElement("th");//thead.rows[0].insertCell(-1);
    th.innerHTML ="Nilai Spiritual (KI-1)";
    th.setAttribute("colspan","4");
    th.setAttribute("class","sel_k1 cellmanualinput");
    thead.rows[0].appendChild(th)

    th = document.createElement("th");//thead.rows[1].insertCell(-1);
    th.setAttribute("colspan","4");
    th.setAttribute("class","sel_k1 w3-tiny  cellmanualinput");
    th.innerHTML ="Klik sel untuk mengedit/preview";
    let trth_baru = thead.insertRow(-1)
    trth_baru.setAttribute("class","w3-light-grey");
    trth_baru.appendChild(th);//thead.rows[1].appendChild(th)
    
    th = document.createElement("th");//thead.rows[2].insertCell(-1);
    th.innerHTML ="Predikat";
    th.setAttribute("class","sel_k1 cellmanualinput");
    trth_baru = thead.insertRow(-1);
    trth_baru.setAttribute("class","w3-light-grey");
    trth_baru.appendChild(th);//thead.rows[2].appendChild(th)
    
    
    th = document.createElement("th");//thead.rows[2].insertCell(-1);
    th.setAttribute("class","sel_k1 cellmanualinput");
    th.innerHTML ="Indikator<br>Maksimal";
    thead.rows[2].appendChild(th)

    th = document.createElement("th");//thead.rows[2].insertCell(-1);
    th.setAttribute("class","sel_k1 cellmanualinput");
    th.innerHTML ="Indikator<br>Minimal";
    thead.rows[2].appendChild(th);
    th = document.createElement("th");//thead.rows[2].insertCell(-1);
    th.setAttribute("class","sel_k1 cellmanualinput");
    th.innerHTML ="Preview";
    thead.rows[2].appendChild(th)
    //tfoot
    th = document.createElement("th");//thead.rows[2].insertCell(-1);
    th.setAttribute("colspan","4");
    th.setAttribute("class","sel_k1 cellmanualinput");
    th.innerHTML = `<button onclick="manual_simpanserverK1()" class=" w3-btn w3-round-xlarge w3-pale-green w3-bottombar w3-tiny w3-border-purple">Simpan Server K1</button>`;
    tfoot.rows[0].appendChild(th)
    //dibaris siswanya
    for(let i = 0 ; i < jsondatasiswa.length ; i++){
        let tr = tbody.rows[i];
        
        let td = tr.insertCell(-1);
        td.setAttribute("class","sel_k1 cellmanualinput");
        
        td.setAttribute("onmouseover","this.setAttribute('title','Pilih Predikat untuk nilai Spritual')");
        td.setAttribute("onmouseout","this.removeAttribute('title')");
        let html = `<select style="width:100%;border: none transparent;outline: none;background:transparent" name="inputmanualk1_predikat${i}" onchange="previewmanual_k1(this,${i})" data-keyraportindukmanual="${prefix_stringkeyinduk}KI1_NILAI">`;
        html +=`<option value ="Sangat Baik">Sangat Baik</option><option value ="Baik">Baik</option><option value ="Cukup">Cukup</option><option value ="Perlu Bimbingan">Perlu Bimbingan</option>`;
        html += `</select>`;
        td.innerHTML = html;
        td = tr.insertCell(-1);
        td.setAttribute("class","sel_k1 cellmanualinput");
        
        td.setAttribute("onmouseover","this.setAttribute('title','Jangan ada karakter selain angka dan koma')");
        td.setAttribute("onmouseout","this.removeAttribute('title')");
        td.innerHTML = `<input type="text" oninput="previewmanual_k1(this,${i})" name="inputmanualk1_maks${i}" style="width:100%;border: none transparent;outline: none;background:transparent" placholder="contoh:1,2,3">`;
        td = tr.insertCell(-1);
        td.setAttribute("class","sel_k1 cellmanualinput");
        
        td.setAttribute("onmouseover","this.setAttribute('title','Jangan ada karakter selain angka dan koma')");
        td.setAttribute("onmouseout","this.removeAttribute('title')");
        td.innerHTML = `<input oninput="previewmanual_k1(this,${i})" name="inputmanualk1_min${i}"  type="text" style="width:100%;border: none transparent;outline: none;background:transparent" placholder="contoh:1,2,3">`;
        td = tr.insertCell(-1);
        td.setAttribute("class","sel_k1 cellmanualinput");
        td.setAttribute("data-keyraportindukmanual",`${prefix_stringkeyinduk}KI1_DESKRIPSI`);//data-keyraportindukmanual="${prefix_stringkeyinduk}_K1_NILAI"
        td.innerHTML=`<i class="fa fa-spin fa-spinner"></i>`
    }
    //k2
    th = document.createElement("th");//thead.rows[0].insertCell(-1);
            th.innerHTML ="Nilai Sosial (KI-2)";
            th.setAttribute("colspan","4");
            th.setAttribute("class","sel_k2 cellmanualinput");
            thead.rows[0].appendChild(th)

            th = document.createElement("th");//thead.rows[1].insertCell(-1);
            th.setAttribute("colspan","4");
            th.setAttribute("class","sel_k2 w3-tiny w3-light-grey cellmanualinput");
            th.innerHTML ="Klik sel untuk mengedit/preview";
            thead.rows[1].appendChild(th)
            
            th = document.createElement("th");//thead.rows[2].insertCell(-1);
            th.innerHTML ="Predikat";
            th.setAttribute("class","sel_k2 w3-light-grey cellmanualinput");
            
            thead.rows[2].appendChild(th)
            
            
            th = document.createElement("th");//thead.rows[2].insertCell(-1);
            th.setAttribute("class","sel_k2 cellmanualinput");
            th.innerHTML ="Indikator<br>Maksimal";
            thead.rows[2].appendChild(th)

            th = document.createElement("th");//thead.rows[2].insertCell(-1);
            th.setAttribute("class","sel_k2 cellmanualinput");
            th.innerHTML ="Indikator<br>Minimal";
            thead.rows[2].appendChild(th);
            th = document.createElement("th");//thead.rows[2].insertCell(-1);
            th.setAttribute("class","sel_k2 cellmanualinput");
            th.innerHTML ="Preview";
            thead.rows[2].appendChild(th)
            //tfoot
            th = document.createElement("th");//thead.rows[2].insertCell(-1);
            th.setAttribute("colspan","4");
            th.setAttribute("class","sel_k2 cellmanualinput");
            th.innerHTML = `<button onclick="manual_simpanserverK2()" class=" w3-btn w3-round-xlarge w3-pale-green w3-bottombar w3-tiny w3-border-purple">Simpan Server K2</button>`;
            tfoot.rows[0].appendChild(th)
            //dibaris siswanya
            for(let i = 0 ; i < jsondatasiswa.length ; i++){
                let tr = tbody.rows[i];
                
                let td = tr.insertCell(-1);
                td.setAttribute("class","sel_k2 cellmanualinput");
                
                td.setAttribute("onmouseover","this.setAttribute('title','Pilih Predikat untuk nilai Sosial')");
                td.setAttribute("onmouseout","this.removeAttribute('title')");
                let html = `<select style="width:100%;border: none transparent;outline: none;background:transparent" name="inputmanualk2_predikat${i}" onchange="previewmanual_k2(this,${i})" data-keyraportindukmanual="${prefix_stringkeyinduk}KI2_NILAI">`;
                html +=`<option value ="Sangat Baik">Sangat Baik</option><option value ="Baik">Baik</option><option value ="Cukup">Cukup</option><option value ="Perlu Bimbingan">Perlu Bimbingan</option>`;
                html += `</select>`;
                td.innerHTML = html;
                td = tr.insertCell(-1);
                td.setAttribute("class","sel_k2 cellmanualinput");
                
                td.setAttribute("onmouseover","this.setAttribute('title','Jangan ada karakter selain angka dan koma')");
                td.setAttribute("onmouseout","this.removeAttribute('title')");
                td.innerHTML = `<input type="text" oninput="previewmanual_k2(this,${i})" name="inputmanualk2_maks${i}" style="width:100%;border: none transparent;outline: none;background:transparent" placholder="contoh:1,2,3">`;
                td = tr.insertCell(-1);
                td.setAttribute("class","sel_k2 cellmanualinput");
                
                td.setAttribute("onmouseover","this.setAttribute('title','Jangan ada karakter selain angka dan koma')");
                td.setAttribute("onmouseout","this.removeAttribute('title')");
                td.innerHTML = `<input oninput="previewmanual_k2(this,${i})" name="inputmanualk2_min${i}"  type="text" style="width:100%;border: none transparent;outline: none;background:transparent" placholder="contoh:1,2,3">`;
                td = tr.insertCell(-1);
                td.setAttribute("class","sel_k2 cellmanualinput");
                td.setAttribute("data-keyraportindukmanual",`${prefix_stringkeyinduk}KI2_DESKRIPSI`);
                td.innerHTML=`<i class="fa fa-spin fa-spinner"></i>`
            }
    //k3
    th = document.createElement("th");//thead.rows[0].insertCell(-1);
            th.innerHTML ="NILAI KOMPETENSI PENGETAHUAN (KI-3)";
            th.setAttribute("colspan",(datamapel.length+2));
            th.setAttribute("class","sel_k3 cellmanualinput");
            thead.rows[0].appendChild(th);
            //tfoot
            th = document.createElement("th");//thead.rows[2].insertCell(-1);
            th.setAttribute("colspan",(datamapel.length+2));
            th.setAttribute("class","sel_k3 cellmanualinput");
            th.innerHTML = `<button onclick="manual_simpanserverK3(this)" class=" w3-btn w3-round-xlarge w3-pale-green w3-bottombar w3-tiny w3-border-purple">Simpan Server K3</button>`;
            tfoot.rows[0].appendChild(th)
            for(let m = 0 ; m < datamapel.length+2 ; m++){
                let kodemapel = datamapel[m];
                    let agamafilter = kodemapel=="AGAMA"?"PAI":kodemapel
                    ////console.log(datamapel[m],m);
                if(m >  (datamapel.length-1)){
                    let th = document.createElement("th");//thead.rows[1].insertCell(-1);
                    // th.setAttribute("colspan",data);
                    th.setAttribute("class","sel_k3 w3-tiny w3-light-grey cellmanualinput");
                    th.setAttribute("style","width:60px");
                    th.setAttribute("rowspan","2");
                    th.setAttribute("onmouseover","this.setAttribute('title','Kode Mata Pelajaran')");
                    th.setAttribute("onmouseout","this.removeAttribute('title')");
                    if(m == datamapel.length){
                        th.innerHTML ="Jumlah";
                    }else{
                        th.innerHTML ="Rangking";
                    }
                    thead.rows[1].appendChild(th);
                }else{
                    

                    let kkm = dbkurikulum.filter(s => s.mapel == agamafilter)[0].kkm;
                    let th = document.createElement("th");//thead.rows[1].insertCell(-1);
                    // th.setAttribute("colspan",data);
                    th.setAttribute("class","sel_k3 w3-tiny w3-light-grey cellmanualinput");
                    th.setAttribute("style","width:50px");
                    th.setAttribute("onmouseover","this.setAttribute('title','Kode Mata Pelajaran')");
                    th.setAttribute("onmouseout","this.removeAttribute('title')");
                    th.innerHTML =kodemapel;
                    thead.rows[1].appendChild(th)
                    th = document.createElement("th");//thead.rows[2].insertCell(-1);
                    th.setAttribute("class","sel_k3 w3-light-grey cellmanualinput");
                    th.setAttribute("onmouseover",`this.setAttribute('title','KKM Mapel ${kodemapel} ini = ${kkm} ')`);
                    th.setAttribute("onmouseout","this.removeAttribute('title')");
                    th.innerHTML =kkm;
                    thead.rows[2].appendChild(th)
                }
                //dibaris siswanya
                for(let i = 0 ; i < jsondatasiswa.length ; i++){
                    let tr = tbody.rows[i];
                    
                    let td = tr.insertCell(-1);
                    if(m == 0 && jsondatasiswa[i].pd_agama != "ISLAM"){
                        //console.log(jsondatasiswa[i].pd_agama)
                        td.setAttribute("class","sel_k3 cellmanualinput w3-yellow");
                        td.setAttribute("onmouseover",`this.setAttribute('title','Nilai Agama ${jsondatasiswa[i].pd_agama}')`);
                        td.setAttribute("onmouseout","this.removeAttribute('title')");
                    }else{
                        td.setAttribute("class","sel_k3 cellmanualinput");
                    }
                    let htmlnilai ="";// 
                    if(m >  (datamapel.length-1)){
                        if(m == datamapel.length){
                            htmlnilai = `<input disabled type="number" class="jumlahnilaik3siswake_${i} jumlahnilaik3siswa" style="width:100%;border: none transparent;outline: none;background:transparent;text-align:center" >`;
                        }else{
                            htmlnilai = `<input disabled type="number" class="jumlahreratak3siswake_${i} reratanilaik3siswa" style="width:100%;border: none transparent;outline: none;background:transparent;text-align:center" >`;
                        }
                    }else{
                        htmlnilai = `<input oninput="kalkulasinilairaportmanual('k3',${i})" class="nilaisiswak3ke_${i} nilaik3${kodemapel}" type="number" style="width:100%;border: none transparent;outline: none;background:transparent;text-align:center" data-keyraportindukmanual="${prefix_stringkeyinduk}${kodemapel}_P_NILAI" >`;
                    }
                    td.innerHTML = htmlnilai;
                }
            
            }
        //k4
        th = document.createElement("th");//thead.rows[0].insertCell(-1);
            th.innerHTML ="NILAI KOMPETENSI KETERAMPILAN (KI-4)";
            th.setAttribute("colspan",(datamapel.length+2));
            th.setAttribute("class","sel_k4 cellmanualinput");
            thead.rows[0].appendChild(th);
            //tfoot
            th = document.createElement("th");//thead.rows[2].insertCell(-1);
            th.setAttribute("colspan",(datamapel.length+2));
            th.setAttribute("class","sel_k4 cellmanualinput");
            th.innerHTML = `<button onclick="manual_simpanserverK4(this)" class=" w3-btn w3-round-xlarge w3-pale-green w3-bottombar w3-tiny w3-border-purple">Simpan Server K4</button>`;
            tfoot.rows[0].appendChild(th)
            for(let m = 0 ; m < datamapel.length+2 ; m++){
                let kodemapel = datamapel[m];
                    let agamafilter = kodemapel=="AGAMA"?"PAI":kodemapel
                    ////console.log(datamapel[m],m);
                if(m >  (datamapel.length-1)){
                    let th = document.createElement("th");//thead.rows[1].insertCell(-1);
                    // th.setAttribute("colspan",data);
                    th.setAttribute("class","sel_k4 w3-tiny w3-light-grey cellmanualinput");
                    th.setAttribute("style","width:60px");
                    th.setAttribute("rowspan","2");
                    th.setAttribute("onmouseover","this.setAttribute('title','Kode Mata Pelajaran')");
                    th.setAttribute("onmouseout","this.removeAttribute('title')");
                    if(m == datamapel.length){
                        th.innerHTML ="Jumlah";
                    }else{
                        th.innerHTML ="Rangking";
                    }
                    thead.rows[1].appendChild(th);
                }else{
                    

                    let kkm = dbkurikulum.filter(s => s.mapel == agamafilter)[0].kkm;
                    let th = document.createElement("th");//thead.rows[1].insertCell(-1);
                    // th.setAttribute("colspan",data);
                    th.setAttribute("class","sel_k4 w3-tiny w3-light-grey cellmanualinput");
                    th.setAttribute("style","width:50px");
                    th.setAttribute("onmouseover","this.setAttribute('title','Kode Mata Pelajaran')");
                    th.setAttribute("onmouseout","this.removeAttribute('title')");
                    th.innerHTML =kodemapel;
                    thead.rows[1].appendChild(th)
                    th = document.createElement("th");//thead.rows[2].insertCell(-1);
                    th.setAttribute("class","sel_k4 w3-light-grey cellmanualinput");
                    th.setAttribute("onmouseover",`this.setAttribute('title','KKM Mapel ${kodemapel} ini = ${kkm} ')`);
                    th.setAttribute("onmouseout","this.removeAttribute('title')");
                    th.innerHTML =kkm;
                    thead.rows[2].appendChild(th)
                }
                //dibaris siswanya
                for(let i = 0 ; i < jsondatasiswa.length ; i++){
                    let tr = tbody.rows[i];
                    
                    let td = tr.insertCell(-1);
                    if(m == 0 && jsondatasiswa[i].pd_agama != "ISLAM"){
                        //console.log(jsondatasiswa[i].pd_agama)
                        td.setAttribute("class","sel_k4 cellmanualinput w3-yellow");
                        td.setAttribute("onmouseover",`this.setAttribute('title','Nilai Agama ${jsondatasiswa[i].pd_agama}')`);
                        td.setAttribute("onmouseout","this.removeAttribute('title')");
                    }else{
                        td.setAttribute("class","sel_k4 cellmanualinput");
                    }
                    let htmlnilai ="";// `<input type="number" style="width:100%;border: none transparent;outline: none;background:transparent;text-align:center" data-keyraportindukmanual="${prefix_stringkeyinduk}${kodemapel}_P_NILAI" >`;
                    if(m >  (datamapel.length-1)){
                        if(m == datamapel.length){
                            htmlnilai = `<input disabled type="number" class="jumlahnilaik4siswake_${i} jumlahnilaik4siswa" style="width:100%;border: none transparent;outline: none;background:transparent;text-align:center" >`;
                        }else{
                            htmlnilai = `<input disabled type="number" class="jumlahreratak4siswake_${i} reratanilaik4siswa" style="width:100%;border: none transparent;outline: none;background:transparent;text-align:center" >`;
                        }
                    }else{
                        htmlnilai = `<input oninput="kalkulasinilairaportmanual('k4',${i})" class="nilaisiswak4ke_${i} nilaik4${kodemapel}" type="number" style="width:100%;border: none transparent;outline: none;background:transparent;text-align:center" data-keyraportindukmanual="${prefix_stringkeyinduk}${kodemapel}_K_NILAI" >`;
                    }
                    td.innerHTML = htmlnilai;
                }
            
            }
    //perkembangan 
        //EKSKUL sel_ekskul
        th = document.createElement("th");
        th.innerHTML = "E K S T R A K U R I K U L E R";
        th.setAttribute("colspan",9);
        th.setAttribute("class","sel_ekskul cellmanualinput");
        thead.rows[0].appendChild(th);

        th = document.createElement("th");
        th.innerHTML = "Ekstrakurikuler ke-1";
        th.setAttribute("colspan",3);
        th.setAttribute("class","sel_ekskul cellmanualinput");
        thead.rows[1].appendChild(th);

        th = document.createElement("th");
        th.innerHTML = "Ekstrakurikuler ke-2";
        th.setAttribute("colspan",3);
        th.setAttribute("class","sel_ekskul cellmanualinput");
        thead.rows[1].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "Ekstrakurikuler ke-3";
        th.setAttribute("colspan",3);
        th.setAttribute("class","sel_ekskul cellmanualinput");
        thead.rows[1].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "Nama Ekskul";
        th.setAttribute("class","sel_ekskul cellmanualinput");
        th.setAttribute("style","width:100px");
        thead.rows[2].appendChild(th);

        th = document.createElement("th");
        th.innerHTML = "Nilai";
        th.setAttribute("class","sel_ekskul cellmanualinput");
        th.setAttribute("style","width:90px");
        thead.rows[2].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "Keterangan";
        th.setAttribute("class","sel_ekskul cellmanualinput");
        thead.rows[2].appendChild(th);

        th = document.createElement("th");
        th.innerHTML = "Nama Ekskul";
        th.setAttribute("class","sel_ekskul cellmanualinput");
        th.setAttribute("style","width:100px");
        thead.rows[2].appendChild(th);

        th = document.createElement("th");
        th.innerHTML = "Nilai";
        th.setAttribute("class","sel_ekskul cellmanualinput");
        th.setAttribute("style","width:90px");
        thead.rows[2].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "Keterangan";
        th.setAttribute("class","sel_ekskul cellmanualinput");
        thead.rows[2].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "Nama Ekskul";
        th.setAttribute("class","sel_ekskul cellmanualinput");
        th.setAttribute("style","width:100px");
        thead.rows[2].appendChild(th);

        th = document.createElement("th");
        th.innerHTML = "Nilai";
        th.setAttribute("class","sel_ekskul cellmanualinput");
        th.setAttribute("style","width:90px");
        thead.rows[2].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "Keterangan";
        th.setAttribute("class","sel_ekskul cellmanualinput");
        thead.rows[2].appendChild(th);
        //tfootekskul
        th = document.createElement("th");//thead.rows[2].insertCell(-1);
            th.setAttribute("colspan",27);
            th.setAttribute("class","sel_perkembanganlainnya cellmanualinput");
            th.innerHTML = `<button onclick="manual_simpanserverperkembangan(this)" id="tombolsimpanservermanual_tfootperkembanganlainnya" class=" w3-btn w3-round-xlarge w3-pale-green w3-bottombar w3-tiny w3-border-purple">Simpan Server Perkembangan</button>`;
            tfoot.rows[0].appendChild(th)

        for(i = 0 ; i <jsondatasiswa.length ; i++){
            let sele;
            let tr = tbody.rows[i];
            let td = tr.insertCell(-1);
            td.setAttribute("class","sel_ekskul cellmanualinput");
            td.innerHTML = `<input data-perkembanganlama="head_0" data-keyraportindukmanual="${prefix_stringkeyinduk}NAMA_EKSKUL1" style="width:100%;border: none transparent;outline: none;background:transparent;">`;
            
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_ekskul cellmanualinput");
            sele = `<select data-keyraportindukmanual="${prefix_stringkeyinduk}NILAI_EKSKUL1" data-perkembanganlama="head_1"  style="width:100%;border: none transparent;outline: none;background:transparent">`;
            sele +=`<option value =""></option><option value ="Sangat Baik">Sangat Baik</option><option value ="Baik">Baik</option><option value ="Cukup">Cukup</option><option value ="Perlu Bimbingan">Perlu Bimbingan</option>`;
            sele += `</select>`;
            td.innerHTML = sele;

            td = tr.insertCell(-1);
            td.setAttribute("class","sel_ekskul cellmanualinput");
            td.innerHTML = `<textarea data-keyraportindukmanual="${prefix_stringkeyinduk}KETERANGAN_EKSKUL1"  data-perkembanganlama="head_2" style="width:100%;border: none transparent;outline: none;background:transparent;"></textarea>`;
            //2
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_ekskul cellmanualinput");
            td.innerHTML = `<input data-keyraportindukmanual="${prefix_stringkeyinduk}NAMA_EKSKUL2" data-perkembanganlama="head_3"  style="width:100%;border: none transparent;outline: none;background:transparent;">`;
            
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_ekskul cellmanualinput");
            sele = `<select data-keyraportindukmanual="${prefix_stringkeyinduk}NILAI_EKSKUL2"  data-perkembanganlama="head_4"  style="width:100%;border: none transparent;outline: none;background:transparent">`;
            sele +=`<option value =""></option><option value ="Sangat Baik">Sangat Baik</option><option value ="Baik">Baik</option><option value ="Cukup">Cukup</option><option value ="Perlu Bimbingan">Perlu Bimbingan</option>`;
            sele += `</select>`;
            td.innerHTML = sele;

            td = tr.insertCell(-1);
            td.setAttribute("class","sel_ekskul cellmanualinput");
            td.innerHTML = `<textarea data-keyraportindukmanual="${prefix_stringkeyinduk}KETERANGAN_EKSKUL2"  data-perkembanganlama="head_5"  style="width:100%;border: none transparent;outline: none;background:transparent;"></textarea>`;
            //3
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_ekskul cellmanualinput");
            td.innerHTML = `<input data-keyraportindukmanual="${prefix_stringkeyinduk}NAMA_EKSKUL3"  data-perkembanganlama="head_6"  style="width:100%;border: none transparent;outline: none;background:transparent;">`;
            
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_ekskul cellmanualinput");
            sele = `<select data-keyraportindukmanual="${prefix_stringkeyinduk}NILAI_EKSKUL3"  data-perkembanganlama="head_7"  style="width:100%;border: none transparent;outline: none;background:transparent">`;
            sele +=`<option value =""></option><option value ="Sangat Baik">Sangat Baik</option><option value ="Baik">Baik</option><option value ="Cukup">Cukup</option><option value ="Perlu Bimbingan">Perlu Bimbingan</option>`;
            sele += `</select>`;
            td.innerHTML = sele;

            td = tr.insertCell(-1);
            td.setAttribute("class","sel_ekskul cellmanualinput");
            td.innerHTML = `<textarea data-keyraportindukmanual="${prefix_stringkeyinduk}KETERANGAN_EKSKUL3"  data-perkembanganlama="head_8" style="width:100%;border: none transparent;outline: none;background:transparent;"></textarea>`;
            
            //data-perkembanganlama="head_2" data-keyraportindukmanual="${prefix_stringkeyinduk}NAMA_EKSKUL1" 
            //style="width:100%;border: none transparent;outline: none;background:transparent;">;
            
        }
        //saran
        th = document.createElement("th");
        th.innerHTML = "S A R A N  -  S A R A N";
        th.setAttribute("rowspan","2");
        th.setAttribute("class","sel_saran cellmanualinput");
        thead.rows[0].appendChild(th);

        th = document.createElement("th");
        th.innerHTML = `<textarea placeholder="Ketik disini untuk semua saran" oninput="buatnilaisamadielemen(this,'saransaran')" style="width:100%; border: none transparent;outline: none;background:transparent;"></textarea>`;
        th.setAttribute("class","sel_saran cellmanualinput");
        thead.rows[2].appendChild(th);

        for(i = 0 ; i < jsondatasiswa.length ; i++){
            let tr = tbody.rows[i];
            let td = tr.insertCell(-1);
            td.setAttribute("class","sel_saran cellmanualinput");
            td.innerHTML = `<textarea data-keyraportindukmanual="${prefix_stringkeyinduk}SARAN"  data-perkembanganlama="head_9"  style="width:100%;border: none transparent;outline: none;background:transparent;"></textarea>`;
            
        }
        //tb bb
        th = document.createElement("th");
        th.innerHTML = "TINGGI DAN BERAT BADAN";
        th.setAttribute("colspan","5");
        th.setAttribute("class","sel_tbbb cellmanualinput");
        thead.rows[0].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "TINGGI BADAN (cm)";
        th.setAttribute("colspan","2");
        th.setAttribute("class","sel_tbbb cellmanualinput");
        thead.rows[1].appendChild(th);
    
        th = document.createElement("th");
        th.innerHTML = "BERAT BADAN (kg)";
        th.setAttribute("colspan","2");
        th.setAttribute("class","sel_tbbb cellmanualinput");
        thead.rows[1].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "KODE TB-BB";
        th.setAttribute("rowspan","2");
        th.setAttribute("class","sel_tbbb cellmanualinput");
        thead.rows[1].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "Semester 1";
        th.setAttribute("class","sel_tbbb cellmanualinput w3-tiny");
        thead.rows[2].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "Semester 2";
        th.setAttribute("class","sel_tbbb cellmanualinput w3-tiny");
        thead.rows[2].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "Semester 1";
        th.setAttribute("class","sel_tbbb cellmanualinput w3-tiny");
        thead.rows[2].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "Semester 2";
        th.setAttribute("class","sel_tbbb cellmanualinput w3-tiny");
        thead.rows[2].appendChild(th);
        
        for(i = 0 ; i < jsondatasiswa.length ; i++){
            let tr = tbody.rows[i];
            let plch = idSemester == 1?jsondatasiswa[i].dapo_tinggibadan:""
            //tb semester 1
            let td = tr.insertCell(-1);
            td.setAttribute("class","sel_tbbb cellmanualinput");
            td.innerHTML = `<input type="number" data-keyraportindukmanual="${dbinduk_tapel_integer}_13_${idJenjang}_1_TINGGIBADAN"  value="${idSemester == 1?jsondatasiswa[i].dapo_tinggibadan:""}" ${idSemester == 1?"data-updatedbutama='dapo_tinggibadan'":""} oninput="updatestringifydbutamayangobjek(${i},'fisik')" data-perkembanganlama="head_10" style="width:100%;border: none transparent;outline: none;background:transparent;">`;
            // tb semester 2
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_tbbb cellmanualinput");
            td.innerHTML = `<input type="number" data-keyraportindukmanual="${dbinduk_tapel_integer}_13_${idJenjang}_2_TINGGIBADAN" value="${idSemester == 2?jsondatasiswa[i].dapo_tinggibadan:""}" ${idSemester == 2?"data-updatedbutama='dapo_tinggibadan'":""}  oninput="updatestringifydbutamayangobjek(${i},'fisik')" data-perkembanganlama="head_11" style="width:100%;border: none transparent;outline: none;background:transparent;">`;
            // bb semester 2
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_tbbb cellmanualinput");
            td.innerHTML = `<input type="number" data-keyraportindukmanual="${dbinduk_tapel_integer}_13_${idJenjang}_1_BERATBADAN" value="${idSemester == 1?jsondatasiswa[i].dapo_beratbadan:""}" ${idSemester == 1?"data-updatedbutama='dapo_beratbadan'":""}  oninput="updatestringifydbutamayangobjek(${i},'fisik')" data-perkembanganlama="head_12" style="width:100%;border: none transparent;outline: none;background:transparent;">`;
            // bb semester 2
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_tbbb cellmanualinput");
            td.innerHTML = `<input type="number" data-keyraportindukmanual="${dbinduk_tapel_integer}_13_${idJenjang}_2_BERATBADAN"  value="${idSemester == 2?jsondatasiswa[i].dapo_beratbadan:""}" ${idSemester == 2?"data-updatedbutama='dapo_beratbadan'":""}  oninput="updatestringifydbutamayangobjek(${i},'fisik')" data-perkembanganlama="head_13" style="width:100%;border: none transparent;outline: none;background:transparent;">`;
            td = tr.insertCell(-1);
            let updatefisik = jsondatasiswa[i].riwayat_fisik;
            td.setAttribute("class","sel_tbbb cellmanualinput");
            td.innerHTML = `<input type="text" disabled value="${updatefisik}" class="updatedbutama_riwayatfisik_${i}}" data-updatedbutama="riwayat_fisik" style="width:100%;border: none transparent;outline: none;background:transparent;">`;
        }
        //kesehatan
        th = document.createElement("th");
        th.innerHTML = "KONDISI KESEHATAN";
        th.setAttribute("colspan","4");
        th.setAttribute("rowspan","2");
        th.setAttribute("class","sel_kesehatan cellmanualinput");
        thead.rows[0].appendChild(th);
        

        th = document.createElement("th");
        th.innerHTML = "Pendengaran";
        th.setAttribute("class","sel_kesehatan cellmanualinput");
        thead.rows[2].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "Penglihatan";
        th.setAttribute("class","sel_kesehatan cellmanualinput");
        thead.rows[2].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "Gigi";
        th.setAttribute("class","sel_kesehatan cellmanualinput");
        thead.rows[2].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "Lainnya";
        th.setAttribute("class","sel_kesehatan cellmanualinput");
        thead.rows[2].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "KODE KESEHATAN";
        th.setAttribute("rowspan","2");
        th.setAttribute("class","sel_kesehatan cellmanualinput");
        thead.rows[1].appendChild(th);

        for(i = 0 ; i < jsondatasiswa.length ; i++){
            let tr = tbody.rows[i];
            //tb semester 1
            let td = tr.insertCell(-1);
            td.setAttribute("class","sel_kesehatan cellmanualinput");
            td.innerHTML = `<input type="text"  data-keyraportindukmanual="${prefix_stringkeyinduk}PENDENGARAN"  data-perkembanganlama="head_14" oninput="updatestringifydbutamayangobjek(${i},'kesehatan')" style="width:100%;border: none transparent;outline: none;background:transparent;">`;
            
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_kesehatan cellmanualinput");
            td.innerHTML = `<input type="text"  data-keyraportindukmanual="${prefix_stringkeyinduk}PENGLIHATAN" data-perkembanganlama="head_15" oninput="updatestringifydbutamayangobjek(${i},'kesehatan')"  style="width:100%;border: none transparent;outline: none;background:transparent;">`;
            
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_kesehatan cellmanualinput");
            td.innerHTML = `<input type="text"  data-keyraportindukmanual="${prefix_stringkeyinduk}GIGI" data-perkembanganlama="head_16" oninput="updatestringifydbutamayangobjek(${i},'kesehatan')"  style="width:100%;border: none transparent;outline: none;background:transparent;">`;
            
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_kesehatan cellmanualinput");
            td.innerHTML = `<input type="text"  data-keyraportindukmanual="${prefix_stringkeyinduk}PENYAKIT" data-perkembanganlama="head_17" oninput="updatestringifydbutamayangobjek(${i},'kesehatan')"  style="width:100%;border: none transparent;outline: none;background:transparent;">`;
            
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_kesehatan cellmanualinput");
            td.innerHTML = `<input type="text" disabled value="${jsondatasiswa[i].riwayat_penyakit}" class="updatedbutama_riwayat_penyakit_${i}}" data-updatedbutama="riwayat_penyakit" style="width:100%;border: none transparent;outline: none;background:transparent;">`;
        
        }
        //prstasi
        th = document.createElement("th");
        th.innerHTML = "PRESTASI SISWA";
        th.setAttribute("colspan","6");
        th.setAttribute("class","sel_prestasi cellmanualinput");
        thead.rows[0].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "PRESTASI ke-1";
        th.setAttribute("colspan","2");
        th.setAttribute("class","sel_prestasi cellmanualinput");
        thead.rows[1].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "PRESTASI ke-2";
        th.setAttribute("colspan","2");
        th.setAttribute("class","sel_prestasi cellmanualinput");
        thead.rows[1].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "PRESTASI ke-3";
        th.setAttribute("colspan","2");
        th.setAttribute("class","sel_prestasi cellmanualinput");
        thead.rows[1].appendChild(th);
        
        
        th = document.createElement("th");
        th.innerHTML = "Jenis Prestasi";
        th.setAttribute("class","sel_prestasi cellmanualinput");
        thead.rows[2].appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Keterangan";
        th.setAttribute("class","sel_prestasi cellmanualinput");
        thead.rows[2].appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Jenis Prestasi";
        th.setAttribute("class","sel_prestasi cellmanualinput");
        thead.rows[2].appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Keterangan";
        th.setAttribute("class","sel_prestasi cellmanualinput");
        thead.rows[2].appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Jenis Prestasi";
        th.setAttribute("class","sel_prestasi cellmanualinput");
        thead.rows[2].appendChild(th);
        th = document.createElement("th");
        th.innerHTML = "Keterangan";
        th.setAttribute("class","sel_prestasi cellmanualinput");
        thead.rows[2].appendChild(th);
        for(i = 0 ; i < jsondatasiswa.length ; i++){
            let tr = tbody.rows[i];
            //tb semester 1
            let td = tr.insertCell(-1);
            td.setAttribute("class","sel_prestasi cellmanualinput");
            td.innerHTML = `<input type="text" data-perkembanganlama="head_18" data-keyraportindukmanual="${prefix_stringkeyinduk}NAMA_PRESTASI1" style="width:100%;border: none transparent;outline: none;background:transparent;">`;
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_prestasi cellmanualinput");
            td.innerHTML = `<input type="text" data-perkembanganlama="head_19" data-keyraportindukmanual="${prefix_stringkeyinduk}KETERANGAN_PRESTASI1" style="width:100%;border: none transparent;outline: none;background:transparent;">`;
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_prestasi cellmanualinput");
            td.innerHTML = `<input type="text" data-perkembanganlama="head_20" data-keyraportindukmanual="${prefix_stringkeyinduk}NAMA_PRESTASI2" style="width:100%;border: none transparent;outline: none;background:transparent;">`;
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_prestasi cellmanualinput");
            td.innerHTML = `<input type="text" data-perkembanganlama="head_21" data-keyraportindukmanual="${prefix_stringkeyinduk}KETERANGAN_PRESTASI2" style="width:100%;border: none transparent;outline: none;background:transparent;">`;
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_prestasi cellmanualinput");
            td.innerHTML = `<input type="text" data-perkembanganlama="head_22" data-keyraportindukmanual="${prefix_stringkeyinduk}NAMA_PRESTASI3" style="width:100%;border: none transparent;outline: none;background:transparent;">`;
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_prestasi cellmanualinput");
            td.innerHTML = `<input type="text" data-perkembanganlama="head_23" data-keyraportindukmanual="${prefix_stringkeyinduk}KETERANGAN_PRESTASI3" style="width:100%;border: none transparent;outline: none;background:transparent;">`;
            
        }
        //kenaikankelas
        th = document.createElement("th");
        th.innerHTML = "KENAIKAN/KELULUSAN KELAS";
        th.setAttribute("colspan","3");
        th.setAttribute("class","sel_kenaikankelas  cellmanualinput");
        thead.rows[0].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "Status Kenaikan/Kelulusan";
        th.setAttribute("class","sel_kenaikankelas  cellmanualinput");
        thead.rows[1].appendChild(th);

        th = document.createElement("th");
        th.innerHTML = "Ke Kelas";
        th.setAttribute("class","sel_kenaikankelas  cellmanualinput");
        thead.rows[1].appendChild(th);
        
        th = document.createElement("th");
        th.innerHTML = "Titimangsa Raport";
        th.setAttribute("class","sel_kenaikankelas  cellmanualinput");
        thead.rows[1].appendChild(th);
        
        th = document.createElement("th");
        th.setAttribute("class","sel_kenaikankelas  cellmanualinput");
        th.setAttribute("onmouseover","this.setAttribute('title','Pilih status kenaikan kelas ini untuk mengisi seluruh kolom kenaikan kelas sama')");
        th.setAttribute("onmouseout","this.removeAttribute('title')");
        let html_el = "<div class='w3-hide-small'>Pilih Status<br>"
        html_el += `<select onchange="buatnilaisamadielemen(this,'statuskenaikan')"  style="width:100%;border: none transparent;outline: none;background:transparent;">`;
        html_el+=`<option value=" ">Status Semua Kolom</option>
        <option value="Naik Kelas">Naik Kelas</option>
        <option value="Tidak Naik Kelas">Tidak Naik Kelas</option>`;
        html_el +=idJenjang==6?`<option value="Tidak Lulus">Tidak Lulus</option><option value="Lulus">Lulus</option>`:"";
        html_el +=`</select></div>`
        th.innerHTML = html_el;
        thead.rows[2].appendChild(th);

        
        th = document.createElement("th");
        th.setAttribute("class","sel_kenaikankelas  cellmanualinput ");
        th.setAttribute("onmouseover","this.setAttribute('title','Pilih status kenaikan kelas ini untuk mengisi seluruh kolom kenaikan kelas sama')");
        th.setAttribute("onmouseout","this.removeAttribute('title')");
        html_el = "<div class='w3-hide-small'>Pilih Kelas<br>"
        html_el += `<select  onchange="buatnilaisamadielemen(this,'kelas')" style="width:100%;border: none transparent;outline: none;background:transparent;">`;
        html_el+=`<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option>`;
        html_el += idJenjang==6?`<option value="7">7</option>`:"";
        html_el +=`</select></div>`
        th.innerHTML = html_el;
        thead.rows[2].appendChild(th);

        th = document.createElement("th");
        th.setAttribute("class","sel_kenaikankelas cellmanualinput");
        th.setAttribute("onmouseover","this.setAttribute('title','Pilih tanggal ini untuk mengisi seluruh kolom tanggal sama')");
        th.setAttribute("onmouseout","this.removeAttribute('title')");
        th.innerHTML = "<div class='w3-hide-small'>Pilih Tanggal<br>";
        th.innerHTML +=`<input type="date" onchange="buatnilaisamadielemen(this,'titimangsa')"  style="width:100%;text-align:center; border: none transparent;outline: none;background:transparent;"></div>`;
        thead.rows[2].appendChild(th);
        
        for(i = 0 ; i < jsondatasiswa.length ; i++){
            let tr = tbody.rows[i];
            let html_el=""
            //tb semester 1
            let td = tr.insertCell(-1);
            td.setAttribute("class","sel_kenaikankelas cellmanualinput");
            html_el = `<select data-perkembanganlama="head_24" data-keyraportindukmanual="${prefix_stringkeyinduk}KENAIKAN_KELAS" style="width:100%;border: none transparent;outline: none;background:transparent;">`;
            html_el +=`<option value=" "> </option>
            <option value="Naik Kelas">Naik Kelas</option>
            <option value="Tidak Naik Kelas">Tidak Naik Kelas</option>`;
            html_el +=idJenjang==6?`<option value="Tidak Lulus">Tidak Lulus</option>
            <option value="Lulus">Lulus</option>`:"";
            html_el +=`</select>`
            td.innerHTML = html_el;

            td = tr.insertCell(-1);
            td.setAttribute("class","sel_kenaikankelas cellmanualinput");
            html_el = `<select data-keyraportindukmanual="${prefix_stringkeyinduk}NAIKTINGGAL_KELAS_DI" style="width:100%;border: none transparent;outline: none;background:transparent;">`;
            html_el+=`<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option>`;
            html_el += idJenjang==6?`<option value="7">7</option>`:"";
            html_el +=`</select>`
            td.innerHTML = html_el;

            td = tr.insertCell(-1);
            td.setAttribute("class","sel_kenaikankelas cellmanualinput");
            td.innerHTML = `<input type="date" data-keyraportindukmanual="${prefix_stringkeyinduk}TITIMANGSA_RAPORT" style="width:100%;border: none transparent;outline: none;background:transparent;">`
        }
        //kelulusan
        if(idJenjang == 6){

            th = document.createElement("th");
            th.innerHTML = "DATA KELULUSAN SISWA";
            th.setAttribute("colspan","3");
            th.setAttribute("class","sel_kelulusansiswa  cellmanualinput");
            thead.rows[0].appendChild(th);
            
            th = document.createElement("th");
            th.innerHTML = "Tanggal Lulus"
            th.setAttribute("class","sel_kelulusansiswa  cellmanualinput");
            thead.rows[1].appendChild(th);

            th = document.createElement("th");
            th.setAttribute("class","sel_kelulusansiswa cellmanualinput");
            th.setAttribute("onmouseover","this.setAttribute('title','Pilih tanggal ini untuk mengisi seluruh kolom tanggal sama')");
            th.setAttribute("onmouseout","this.removeAttribute('title')");
            th.innerHTML = "<div class='w3-hide-small'>Pilih Tanggal<br>";
            th.innerHTML +=`<input type="date" onchange="buatnilaisamadielemen(this,'tglkelulusan')"  style="width:100%;text-align:center; border: none transparent;outline: none;background:transparent;"></div>`;
            thead.rows[2].appendChild(th);

            th = document.createElement("th");
            th.innerHTML = "Nomor Ijazah/STTB"
            th.setAttribute("class","sel_kelulusansiswa  cellmanualinput");
            thead.rows[1].appendChild(th);
            
            th = document.createElement("th");
            th.setAttribute("class","sel_kelulusansiswa cellmanualinput");
            th.setAttribute("onmouseover","this.setAttribute('title','Ketikkan nomor suarat awalan untuk mengisi seluruh kolom nomor surat sama sama')");
            th.setAttribute("onmouseout","this.removeAttribute('title')");
            th.innerHTML = "<div class='w3-hide-small w3-small'>Ketiikan Awalan No. Ijasah<br>";
            th.innerHTML +=`<input type="text" oninput="buatnilaisamadielemen(this,'noawalansurat')"  style="width:100%;text-align:center; border: black transparent;outline: none;background:transparent;"></div>`;
            thead.rows[2].appendChild(th);
            
            th = document.createElement("th");
            th.setAttribute("rowspan","2");
            th.setAttribute("class","sel_kelulusansiswa  cellmanualinput");
            th.innerHTML = "Melanjutkan ke (Nama SMP/MTs Sederajat)"
            thead.rows[1].appendChild(th);
            
            th = document.createElement("th");//thead.rows[2].insertCell(-1);
            th.setAttribute("colspan","3");
            th.setAttribute("class","sel_kelulusansiswa cellmanualinput");
            th.innerHTML = `<button onclick="simpaninduksementarabayangan(this)" class=" w3-btn w3-round-xlarge w3-pale-green w3-bottombar w3-tiny w3-border-purple">Simpan Server</button>`;
            tfoot.rows[0].appendChild(th)
            
            for(i = 0 ; i < jsondatasiswa.length ; i++){
                let tr = tbody.rows[i];
                let html_el=""
                //tb semester 1
                let td = tr.insertCell(-1);
                td.setAttribute("class","sel_kelulusansiswa cellmanualinput");
                td.innerHTML = `<input type="date" data-updatedbutama="keluar_tgl" value="${jsondatasiswa[i].keluar_tgl}"  data-keyraportindukmanual="${prefix_stringkeyinduk}TITIMANGSA_KELULUSAN" style="width:100%;text-align:center; border: none transparent;outline: none;background:transparent;"><input type="text" value="Lulus" data-updatedbutama="alasan_keluar" data-keyraportindukmanual="${prefix_stringkeyinduk}KETERANGAN_KELULUSAN" style="display:none">`;
                //html_el;Lulus

                td = tr.insertCell(-1);
                td.setAttribute("class","sel_kelulusansiswa cellmanualinput");
                td.innerHTML = `<input type="text" data-updatedbutama="dapo_noseriijazah" value="${jsondatasiswa[i].dapo_noseriijazah}" style="width:100%;text-align:center; border: none transparent;outline: none;background:transparent;"></div>`;
                
                
                td = tr.insertCell(-1);
                td.setAttribute("class","sel_kelulusansiswa cellmanualinput");
                td.innerHTML = `<input type="text"data-updatedbutama="smp_ke" value="${jsondatasiswa[i].smp_ke}"  style="width:100%;text-align:center; border: none transparent;outline: none;background:transparent;"></div>`;
                
            }
        }
        //deskripsi ki3
        th = document.createElement("th");
        th.setAttribute("class","sel_deskripsi_k3 cellmanualinput");
        th.setAttribute("colspan",datamapel.length);
        th.innerHTML = "Deskripsi Kompetensi Pengetahuan (KI-3)<br><span id='mapeldeskripsi_k3_manual' class='w3-red' style='padding:3px'>KLIK TOMBOL MAPEL DI BAWAH INI</span>";
        thead.rows[0].appendChild(th);
        
        th = document.createElement("th");
        th.setAttribute("class","sel_deskripsi_k3 cellmanualinput");
        th.setAttribute("colspan",datamapel.length);
        let html_btn = ``
        for(i = 0 ; i < datamapel.length ; i++){
            html_btn +=`<span class="w3-border w3-margin w3-round-xxlarge tangan w3-tiny w3-pale-green w3-padding tombolpilihmapeleditdeskripsi" onclick="aktifkanmapel_deskripsimanual(this, 'k3','${datamapel[i]}')">${datamapel[i]}</span>`
        }
        th.innerHTML = html_btn
        thead.rows[1].appendChild(th);

        th = document.createElement("th");
        th.setAttribute("class","sel_deskripsi_k3 cellmanualinput");
        th.innerHTML = "Nilai Raport";
        thead.rows[2].appendChild(th);

        th = document.createElement("th");
        th.setAttribute("class","sel_deskripsi_k3 cellmanualinput");
        th.innerHTML = "Predikat Raport"
        thead.rows[2].appendChild(th);

        th = document.createElement("th");
        th.setAttribute("class","sel_deskripsi_k3 cellmanualinput");
        th.innerHTML = "Predikat KD Maksimal"
        thead.rows[2].appendChild(th);

        th = document.createElement("th");
        th.setAttribute("class","sel_deskripsi_k3 cellmanualinput");
        th.innerHTML = "KD Maksimal";
        thead.rows[2].appendChild(th);
        
        th = document.createElement("th");
        th.setAttribute("class","sel_deskripsi_k3 cellmanualinput");
        th.innerHTML = "Predikat KD Minimal"
        thead.rows[2].appendChild(th);

        
        th = document.createElement("th");
        th.setAttribute("class","sel_deskripsi_k3 cellmanualinput");
        th.innerHTML = "KD Minimal"
        thead.rows[2].appendChild(th);

        th = document.createElement("th");
        th.setAttribute("class","sel_deskripsi_k3 cellmanualinput");
        th.setAttribute("colspan", (datamapel.length-6))
        th.innerHTML = "Deskripsi Raport";
        thead.rows[2].appendChild(th);
        
        th = document.createElement("th");//thead.rows[2].insertCell(-1);
        th.setAttribute("colspan",datamapel.length);
        th.setAttribute("class","sel_deskripsi_k3 cellmanualinput");
        // th.innerHTML = `<button onclick="simpaninduksementarabayangan(this)" class=" w3-btn w3-round-xlarge w3-pale-green w3-bottombar w3-tiny w3-border-purple">Simpan Server</button>`;
        th.innerHTML = `<button onclick="simpanmanualdeskripsi(this,'k3')" class=" w3-btn w3-round-xlarge w3-pale-green w3-bottombar w3-tiny w3-border-purple">Simpan Server</button>`;
        tfoot.rows[0].appendChild(th);

        for(i = 0 ; i < jsondatasiswa.length; i++){
            let tr = tbody.rows[i];
            let agamasisiswa = jsondatasiswa[i].pd_agama;
            let kodeagamadisiswa = convertAgamaSiswaMapel(agamasisiswa);
            
            for(k = 0 ; k < datamapel.length; k++){
                let td = tr.insertCell(-1);
                td.setAttribute("onclick",`alert('Hanya bisa diedit di Rekap Nilai Kompetensi Pengetahuan KI-3\r\n Abaikan jika kolom Nilai Raport kosong.')`);
                td.setAttribute("class",`sel_deskripsi_k3 sel_deskripsi_k3_olah sel_deskripsi_k3_${datamapel[k]} cellmanualinput`);
                td.innerHTML = `<input type="number" disabled data-deskripsik3="raport_${datamapel[k]}" data-keyraportindukmanual="${prefix_stringkeyinduk}k3_raport_${datamapel[k]}" style="width:100%;text-align:center; border: none transparent;outline: none;background:transparent;">`;
 
                td = tr.insertCell(-1);
                td.setAttribute("class",`sel_deskripsi_k3 sel_deskripsi_k3_olah sel_deskripsi_k3_${datamapel[k]} cellmanualinput`);
                let htmlselectpredikatraport, 
                    htmlselect_predikat_kdmaks, htmlselect_predikat_kdmin,
                    htmlselect_kdmaks, htmlselect_kdmin, end_select = `</select>`;
                    let opsikd =""
                    if(datamapel[k]=="AGAMA"){
                        let koleksikdmapelagama = buateditorkdaktif.filter(s => s.mapel == kodeagamadisiswa);
                        for(y = 0 ; y < koleksikdmapelagama.length; y++){
                            opsikd +=`<option value="${koleksikdmapelagama[y].kd3}" data-opsivalue="${koleksikdmapelagama[y].indikatorkd3}">${koleksikdmapelagama[y].kd3}</option>`
                        }
                    }else{
                        let koleksikdmapelnonagama = buateditorkdaktif.filter(s => s.mapel == datamapel[k]);
                        for(y = 0 ; y < koleksikdmapelnonagama.length; y++){
                            opsikd +=`<option value="${koleksikdmapelnonagama[y].kd3}" data-opsivalue="${koleksikdmapelnonagama[y].indikatorkd3}">${koleksikdmapelnonagama[y].kd3}</option>`
                        }
                    }
                    
                //onchange="change_deskripsi(${i},this, 'k3','${datamapel[k]}')"
                htmlselectpredikatraport = `<select data-keyraportindukmanual="${prefix_stringkeyinduk}${datamapel[k]}_P_PREDIKAT" data-deskripsik3="predikat_raport_${datamapel[k]}" class="sel_deskripsi_k3 sel_deskripsi_k3_olah sel_deskripsi_k3_${datamapel[k]}" style="width:100%;text-align:center; border: none transparent;outline: none;background:transparent;">`;
                htmlselectpredikatraport +=`<option value="Sangat Baik">Sangat baik</option><option value="Baik">Baik</option><option value="Cukup">Cukup</option><option value="Perlu Bimbingan">Perlu Bimbingan</option>`
                htmlselectpredikatraport +=`</select>`;
                
                td.innerHTML = htmlselectpredikatraport;
                
                td = tr.insertCell(-1);
                td.setAttribute("class",`sel_deskripsi_k3 sel_deskripsi_k3_olah sel_deskripsi_k3_${datamapel[k]} cellmanualinput`);
                htmlselect_predikat_kdmaks = `<select onchange="change_deskripsi(${i},this, 'k3','${datamapel[k]}')" data-deskripsik3="predikat_kdmaks_${datamapel[k]}"  data-keyraportindukmanual="${prefix_stringkeyinduk}k3_predikat_kdmaks_${datamapel[k]}" class="sel_deskripsi_k3 sel_deskripsi_k3_olah sel_deskripsi_k3_${datamapel[k]}" style="width:100%;text-align:center; border: none transparent;outline: none;background:transparent;">`;
                htmlselect_predikat_kdmaks +=`<option value="Sangat Baik">Sangat baik</option><option value="Baik">Baik</option><option value="Cukup">Cukup</option><option value="Perlu Bimbingan">Perlu Bimbingan</option>`
                htmlselect_predikat_kdmaks +=`</select>`;
                td.innerHTML = htmlselect_predikat_kdmaks;
                
                td = tr.insertCell(-1);
                td.setAttribute("class",`sel_deskripsi_k3 sel_deskripsi_k3_olah sel_deskripsi_k3_${datamapel[k]} cellmanualinput`);
                htmlselect_kdmaks = `<select onchange="change_deskripsi(${i},this, 'k3','${datamapel[k]}')" data-deskripsik3="kdmaks_${datamapel[k]}"  data-keyraportindukmanual="${prefix_stringkeyinduk}k3_kdmaks_${datamapel[k]}" class="sel_deskripsi_k3 sel_deskripsi_k3_olah sel_deskripsi_k3_${datamapel[k]}" style="width:100%;text-align:center; border: none transparent;outline: none;background:transparent;">`;
                htmlselect_kdmaks += opsikd
                htmlselect_kdmaks += `</select>`;
                td.innerHTML = htmlselect_kdmaks;

                td = tr.insertCell(-1);
                td.setAttribute("class",`sel_deskripsi_k3 sel_deskripsi_k3_olah sel_deskripsi_k3_${datamapel[k]} cellmanualinput`);
                htmlselect_predikat_kdmin = `<select onchange="change_deskripsi(${i},this, 'k3','${datamapel[k]}')" data-deskripsik3="predikat_kdmin_${datamapel[k]}"  data-keyraportindukmanual="${prefix_stringkeyinduk}k3_predikat_kdmin_${datamapel[k]}" class="sel_deskripsi_k3 sel_deskripsi_k3_olah sel_deskripsi_k3_${datamapel[k]}" style="width:100%;text-align:center; border: none transparent;outline: none;background:transparent;">`;
                htmlselect_predikat_kdmin +=`<option value="Sangat Baik">Sangat baik</option><option value="Baik">Baik</option><option value="Cukup">Cukup</option><option value="Perlu Bimbingan">Perlu Bimbingan</option>`
                htmlselect_predikat_kdmin +=`</select>`;
                td.innerHTML = htmlselect_predikat_kdmin;
                
                td = tr.insertCell(-1);
                td.setAttribute("class",`sel_deskripsi_k3 sel_deskripsi_k3_olah sel_deskripsi_k3_${datamapel[k]} cellmanualinput`);
                htmlselect_kdmin = `<select onchange="change_deskripsi(${i}, this, 'k3','${datamapel[k]}')" data-deskripsik3="kdmin_${datamapel[k]}"  data-keyraportindukmanual="${prefix_stringkeyinduk}k3_kdmin_${datamapel[k]}" class="sel_deskripsi_k3 sel_deskripsi_k3_olah sel_deskripsi_k3_${datamapel[k]}" style="width:100%;text-align:center; border: none transparent;outline: none;background:transparent;">`;
                htmlselect_kdmin += opsikd
                htmlselect_kdmin += `</select>`;
                td.innerHTML = htmlselect_kdmin;

                td = tr.insertCell(-1);
                td.setAttribute("class",`sel_deskripsi_k3 sel_deskripsi_k3_olah sel_deskripsi_k3_${datamapel[k]} cellmanualinput`);
                td.setAttribute("data-keyraportindukmanual",prefix_stringkeyinduk+datamapel[k]+"_P_DESKRIPSI");
                td.setAttribute("data-deskripsik3","deskripsi_"+datamapel[k]);
                td.innerHTML ="";


            }
            //html_el;
        }
        
        //deskripsi ki4
        th = document.createElement("th");
        th.setAttribute("class","sel_deskripsi_k4 cellmanualinput");
        th.setAttribute("colspan",datamapel.length);
        th.innerHTML = "Deskripsi Kompetensi Keterampilan (KI-4)<br><span id='mapeldeskripsi_k4_manual' class='w3-red'>KLIK TOMBOL MAPEL DI BAWAH INI</span>";
        thead.rows[0].appendChild(th);
        
        th = document.createElement("th");
        th.setAttribute("class","sel_deskripsi_k4 cellmanualinput");
        th.setAttribute("colspan",datamapel.length);
        html_btn = ``
        for(i = 0 ; i < datamapel.length ; i++){
            html_btn +=`<span class="w3-border w3-margin w3-round-xxlarge tangan w3-tiny w3-pale-green w3-padding tombolpilihmapeleditdeskripsi" onclick="aktifkanmapel_deskripsimanual(this, 'k4','${datamapel[i]}')">${datamapel[i]}</span>`
        }
        th.innerHTML = html_btn
        thead.rows[1].appendChild(th);

        th = document.createElement("th");
        th.setAttribute("class","sel_deskripsi_k4 cellmanualinput");
        th.innerHTML = "Nilai Raport";
        thead.rows[2].appendChild(th);

        th = document.createElement("th");
        th.setAttribute("class","sel_deskripsi_k4 cellmanualinput");
        th.innerHTML = "Predikat Raport"
        thead.rows[2].appendChild(th);

        th = document.createElement("th");
        th.setAttribute("class","sel_deskripsi_k4 cellmanualinput");
        th.innerHTML = "Predikat KD Maksimal"
        thead.rows[2].appendChild(th);

        th = document.createElement("th");
        th.setAttribute("class","sel_deskripsi_k4 cellmanualinput");
        th.innerHTML = "KD Maksimal";
        thead.rows[2].appendChild(th);
        
        th = document.createElement("th");
        th.setAttribute("class","sel_deskripsi_k4 cellmanualinput");
        th.innerHTML = "Predikat KD Minimal"
        thead.rows[2].appendChild(th);

        
        th = document.createElement("th");
        th.setAttribute("class","sel_deskripsi_k4 cellmanualinput");
        th.innerHTML = "KD Minimal"
        thead.rows[2].appendChild(th);

        th = document.createElement("th");
        th.setAttribute("class","sel_deskripsi_k4 cellmanualinput");
        th.setAttribute("colspan", (datamapel.length-6))
        th.innerHTML = "Deskripsi Raport";
        thead.rows[2].appendChild(th);
        //disinitfoot
        th = document.createElement("th");//thead.rows[2].insertCell(-1);
        th.setAttribute("colspan",datamapel.length);
        th.setAttribute("class","sel_deskripsi_k4 cellmanualinput");
        th.innerHTML = `<button onclick="simpaninduksementarabayangan(this)" class=" w3-btn w3-round-xlarge w3-pale-green w3-bottombar w3-tiny w3-border-purple">Simpan Server</button>`;
        tfoot.rows[0].appendChild(th)

        for(i = 0 ; i < jsondatasiswa.length; i++){
            let tr = tbody.rows[i];
            let agamasisiswa = jsondatasiswa[i].pd_agama;
            let kodeagamadisiswa = convertAgamaSiswaMapel(agamasisiswa);
            
            for(k = 0 ; k < datamapel.length; k++){
                let td = tr.insertCell(-1);
                td.setAttribute("onclick",`alert('Hanya bisa diedit di Rekap Nilai Kompetensi Keterampilan KI-4')`);
                td.setAttribute("class",`sel_deskripsi_k4 sel_deskripsi_k4_olah sel_deskripsi_k4_${datamapel[k]} cellmanualinput`);
                td.innerHTML = `<input type="number" disabled data-deskripsik4="raport_${datamapel[k]}"  data-keyraportindukmanual="${prefix_stringkeyinduk}k4_raport_${datamapel[k]}" style="width:100%;text-align:center; border: none transparent;outline: none;background:transparent;">`;
                
                
                td = tr.insertCell(-1);
                td.setAttribute("class",`sel_deskripsi_k4 sel_deskripsi_k4_olah sel_deskripsi_k4_${datamapel[k]} cellmanualinput`);
                // let htmlselectpredikatraport, 
                //     htmlselect_predikat_kdmaks, htmlselect_predikat_kdmin,
                //     htmlselect_kdmaks, htmlselect_kdmin, end_select = `</select>`;
                    let opsikd =""
                    if(datamapel[k]=="AGAMA"){
                        let koleksikdmapelagama = buateditorkdaktif.filter(s => s.mapel == kodeagamadisiswa);
                        for(y = 0 ; y < koleksikdmapelagama.length; y++){
                            opsikd +=`<option value="${koleksikdmapelagama[y].kd4}" data-opsivalue="${koleksikdmapelagama[y].indikatorkd4}">${koleksikdmapelagama[y].kd4}</option>`
                        }
                    }else{
                        let koleksikdmapelnonagama = buateditorkdaktif.filter(s => s.mapel == datamapel[k]);
                        for(y = 0 ; y < koleksikdmapelnonagama.length; y++){
                            opsikd +=`<option value="${koleksikdmapelnonagama[y].kd4}" data-opsivalue="${koleksikdmapelnonagama[y].indikatorkd4}">${koleksikdmapelnonagama[y].kd4}</option>`
                        }
                    }
                    
                //onchange="change_deskripsi(${i},this, 'k4','${datamapel[k]}')"
                htmlselectpredikatraport = `<select  data-keyraportindukmanual="${prefix_stringkeyinduk}${datamapel[k]}_K_PREDIKAT" data-deskripsik4="predikat_raport_${datamapel[k]}" class="sel_deskripsi_k4 sel_deskripsi_k4_olah sel_deskripsi_k4_${datamapel[k]}" style="width:100%;text-align:center; border: none transparent;outline: none;background:transparent;">`;
                htmlselectpredikatraport +=`<option value="Sangat Baik">Sangat baik</option><option value="Baik">Baik</option><option value="Cukup">Cukup</option><option value="Perlu Bimbingan">Perlu Bimbingan</option>`
                htmlselectpredikatraport +=`</select>`;
                
                td.innerHTML = htmlselectpredikatraport;
                
                td = tr.insertCell(-1);
                td.setAttribute("class",`sel_deskripsi_k4 sel_deskripsi_k4_olah sel_deskripsi_k4_${datamapel[k]} cellmanualinput`);
                htmlselect_predikat_kdmaks = `<select onchange="change_deskripsi(${i},this, 'k4','${datamapel[k]}')" data-deskripsik4="predikat_kdmaks_${datamapel[k]}"  data-keyraportindukmanual="${prefix_stringkeyinduk}k4_predikat_kdmaks_${datamapel[k]}" class="sel_deskripsi_k4 sel_deskripsi_k4_olah sel_deskripsi_k4_${datamapel[k]}" style="width:100%;text-align:center; border: none transparent;outline: none;background:transparent;">`;
                htmlselect_predikat_kdmaks +=`<option value="Sangat Baik">Sangat baik</option><option value="Baik">Baik</option><option value="Cukup">Cukup</option><option value="Perlu Bimbingan">Perlu Bimbingan</option>`
                htmlselect_predikat_kdmaks +=`</select>`;
                td.innerHTML = htmlselect_predikat_kdmaks;
                
                td = tr.insertCell(-1);
                td.setAttribute("class",`sel_deskripsi_k4 sel_deskripsi_k4_olah sel_deskripsi_k4_${datamapel[k]} cellmanualinput`);
                htmlselect_kdmaks = `<select onchange="change_deskripsi(${i},this, 'k4','${datamapel[k]}')" data-deskripsik4="kdmaks_${datamapel[k]}" data-keyraportindukmanual="${prefix_stringkeyinduk}k4_kdmaks_${datamapel[k]}" class="sel_deskripsi_k4 sel_deskripsi_k4_olah sel_deskripsi_k4_${datamapel[k]}" style="width:100%;text-align:center; border: none transparent;outline: none;background:transparent;">`;
                htmlselect_kdmaks += opsikd
                htmlselect_kdmaks += `</select>`;
                td.innerHTML = htmlselect_kdmaks;

                td = tr.insertCell(-1);
                td.setAttribute("class",`sel_deskripsi_k4 sel_deskripsi_k4_olah sel_deskripsi_k4_${datamapel[k]} cellmanualinput`);
                htmlselect_predikat_kdmin = `<select onchange="change_deskripsi(${i},this, 'k4','${datamapel[k]}')" data-deskripsik4="predikat_kdmin_${datamapel[k]}" data-keyraportindukmanual="${prefix_stringkeyinduk}k4_predikat_kdmin_${datamapel[k]}" class="sel_deskripsi_k4 sel_deskripsi_k4_olah sel_deskripsi_k4_${datamapel[k]}" style="width:100%;text-align:center; border: none transparent;outline: none;background:transparent;">`;
                htmlselect_predikat_kdmin +=`<option value="Sangat Baik">Sangat baik</option><option value="Baik">Baik</option><option value="Cukup">Cukup</option><option value="Perlu Bimbingan">Perlu Bimbingan</option>`
                htmlselect_predikat_kdmin +=`</select>`;
                td.innerHTML = htmlselect_predikat_kdmin;
                
                td = tr.insertCell(-1);
                td.setAttribute("class",`sel_deskripsi_k4 sel_deskripsi_k4_olah sel_deskripsi_k4_${datamapel[k]} cellmanualinput`);
                htmlselect_kdmin = `<select onchange="change_deskripsi(${i}, this, 'k4','${datamapel[k]}')" data-deskripsik4="kdmin_${datamapel[k]}" data-keyraportindukmanual="${prefix_stringkeyinduk}k4_kdmin_${datamapel[k]}" class="sel_deskripsi_k4 sel_deskripsi_k4_olah sel_deskripsi_k4_${datamapel[k]}" style="width:100%;text-align:center; border: none transparent;outline: none;background:transparent;">`;
                htmlselect_kdmin += opsikd
                htmlselect_kdmin += `</select>`;
                td.innerHTML = htmlselect_kdmin;

                td = tr.insertCell(-1);
                td.setAttribute("class",`sel_deskripsi_k4 sel_deskripsi_k4_olah sel_deskripsi_k4_${datamapel[k]} cellmanualinput`);
                td.setAttribute("data-keyraportindukmanual",prefix_stringkeyinduk+datamapel[k]+"_K_DESKRIPSI");
                td.setAttribute("data-deskripsik4","deskripsi_"+datamapel[k]);
                td.innerHTML ="";


            }
            //html_el;
        }
        //kehadiransiswa:
        th = document.createElement("th");
        th.setAttribute("class","sel_kehadiransiswa cellmanualinput");
        th.setAttribute("colspan","3");
        th.innerHTML = "Data Ketidakhadiran Siswa";
        thead.rows[0].appendChild(th);
        
        th = document.createElement("th");
        th.setAttribute("class","sel_kehadiransiswa cellmanualinput");
        th.setAttribute("rowspan","2");
        th.innerHTML = "Jumlah Sakit"
        thead.rows[1].appendChild(th);

        
        th = document.createElement("th");
        th.setAttribute("class","sel_kehadiransiswa cellmanualinput");
        th.setAttribute("rowspan","2");
        th.innerHTML = "Jumlah Izin"
        thead.rows[1].appendChild(th);

        th = document.createElement("th");
        th.setAttribute("class","sel_kehadiransiswa cellmanualinput");
        th.setAttribute("rowspan","2");
        th.innerHTML = "Jumlah Alpa"
        thead.rows[1].appendChild(th);

        th = document.createElement("th");//thead.rows[2].insertCell(-1);
        th.setAttribute("colspan","3");
        th.setAttribute("class","sel_kehadiransiswa cellmanualinput");
        th.innerHTML = `<button onclick="simpaninduksementarabayangan(this)" class=" w3-btn w3-round-xlarge w3-pale-green w3-bottombar w3-tiny w3-border-purple">Simpan Server</button>`;
        tfoot.rows[0].appendChild(th)

        for(i = 0 ; i < jsondatasiswa.length; i++){
            let tr = tbody.rows[i];
            let td;
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_kehadiransiswa cellmanualinput");
            td.innerHTML =`<input type="number" data-keyraportindukmanual="${prefix_stringkeyinduk}KEHADIRAN_SAKIT" style="width:100%;text-align:center; border: none transparent;outline: none;background:transparent;">`
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_kehadiransiswa cellmanualinput");
            td.innerHTML =`<input type="number" data-keyraportindukmanual="${prefix_stringkeyinduk}KEHADIRAN_IZIN" style="width:100%;text-align:center; border: none transparent;outline: none;background:transparent;">`
            td = tr.insertCell(-1);
            td.setAttribute("class","sel_kehadiransiswa cellmanualinput");
            td.innerHTML =`<input type="number" data-keyraportindukmanual="${prefix_stringkeyinduk}KEHADIRAN_ALPA" style="width:100%;text-align:center; border: none transparent;outline: none;background:transparent;">`
        }
        //selesaibikintabel
            menumanual_k1.onclick = function (){
                raportmanualawal()
            }
            
            menumanual_k2.onclick = function (){
                fnmenumanual_k2();
            }
            menumanual_k3.onclick = function (){
                fnmenumanual_k3();
            }
            menumanual_k4.onclick = function (){
                fnmenumanual_k4();
            }
            menumanual_tbbb.onclick = function (){
                fnmenumanual_tbbb();
            }
            menumanual_kesehatan.onclick = function (){
                fnmenumanual_kesehatan();
            }
            menumanual_ekstrakurikuler.onclick = function (){
                fnmenumanual_ekstrakurikuler();
            }
            menumanual_saran.onclick = function (){
                fnmenumanual_saran();
            }
            menumanual_prestasi.onclick = function (){
                fnmenumanual_prestasi();
            }
            menumanual_kenaikankelas.onclick = function (){
                fnmenumanual_kenaikankelas();
            }
            menumanual_kelulusan.onclick = function (){
                fnmenumanual_kelulusan();
            }
            menumanual_deskripsik3.onclick = function (){
                fnmenumanual_deksripsik3();
            }
            menumanual_deskripsik4.onclick = function (){
                fnmenumanual_deksripsik4();
            }
            menucetakraportbaru.onclick = function (){
                fnmenucetakraportbaru();
            }
            menumanual_kehadiransiswa.onclick = function (){
                fnmenumanual_kehadiransiswa()
            }
            if(idJenjang != 6 && idSemester != 2){
                menumanual_kelulusan.classList.add("w3-hide")
            }
        //disiiiini
        let tab = "Induksemetara";

    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {
            
            if (k.result == 0) {
                //info.innerHTML = "Anda belum pernah membuat data Rekapitulasi  Perkembangan Siswa. Nilai ini diambil dari hasil penyimpanan server yang telah Anda lakukan baik melalui menu Tab <b>Raport</b> atau <b>Raport Manual</b>";
                
            } else {
                let tabelbody = tabelraportmanual.querySelector("tbody");
                let resdatas = k.data;
                for(i = 0 ; i < tabelbody.rows.length ; i++){
                    let dataT = resdatas[i]
                    let elemen = tabelbody.rows[i].querySelectorAll("[data-keyraportindukmanual]");
                    for(j = 0 ; j < elemen.length; j++){
                        let key = elemen[j].getAttribute("data-keyraportindukmanual");
                        if(elemen[j].nodeName == "TD"){
                            elemen[j].innerHTML = dataT[key]
                        }else{
                            let inputan = elemen[j]
                            let val = dataT[key]
                            if(inputan.type == "date"){
                                inputan.value = val ==""?"":StringTanggalnol(new Date(val));
                            }else if(inputan.type =="select-one"){
                                inputan.value = val;
                            }else{
                                inputan.value = val;
                            }

                            

                        }
                    }
                }
            }
        })
        .catch(er => console.log(er))
        let txHeight = 25;
        let tx = document.querySelectorAll("textarea[data-keyraportindukmanual]");//document.getElementsByTagName("textarea");

        for (let i = 0; i < tx.length; i++) {
            tx[i].setAttribute("spellCheck","false");
            tx[i].style.overflow= "hidden";
            tx[i].style.resize= "none";
            if (tx[i].value == '') {
                tx[i].style.height= txHeight+"px";
            } else {
                tx[i].style.height= (tx[i].scrollHeight>50?50:tx[i].scrollHeight)+"px";
                
            }
            tx[i].oninput = function(e){
                this.style.height = "auto";
                this.style.resize = "vertical";
                this.style.height = (this.scrollHeight>50?50:this.scrollHeight) + "px";
            }
            tx[i].onmouseover = function(e){
                this.style.resize = "vertical";
            }
            tx[i].onmouseout = function(e){
                this.style.resize = "none";
            }
        }
    
    }
    raportmanualawal();
    if(idJenjang == 6 && idSemester ==2){
        if(menumanual_kelulusan.className.indexOf("w3-hide")>-1){
            menumanual_kelulusan.classList.remove("w3-hide")
        }
    }else{
        if(menumanual_kelulusan.className.indexOf("w3-hide")==-1){
            menumanual_kelulusan.classList.add("w3-hide")
        }
    }
}
const kalkulasinilairaportmanual = (ki,o)=>{
    // class="jumlahnilaik4siswake_${i} jumlahnilaik4siswa";
    // class="jumlahreratak4siswake_${i} reratanilaik4siswa";
    // class="nilaisiswak4ke_${i} nilaik4${kodemapel}";

    let tekskoleksinilai = `nilaisiswa${ki}ke_${o}`; //nilaisiswak3ke_17 
    let teksisijumlahsiswa = `jumlahnilai${ki}siswake_${o}`;
    let allkelas = `jumlahnilai${ki}siswa`
    let teksisireratasiswa = `jumlahrerata${ki}siswake_${o}`;//jumlahnilaik3siswake_0
    let inputisijumlah = document.querySelector("."+teksisijumlahsiswa);
    

    let allinputnilai = document.querySelectorAll("."+tekskoleksinilai);

    let jumlahnilaisiswa = 0;
    for(i = 0 ; i < allinputnilai.length ; i++){
        //console.log(allinputnilai[i].value);
        jumlahnilaisiswa += parseFloat(allinputnilai[i].value==""?0:allinputnilai[i].value)

    }
    
    inputisijumlah.value = jumlahnilaisiswa;
    rangkingnya(ki)
    
    
}
function rangkingnya(ki){
    //jumlahreratak3siswake_0
    //jumlahnilaik3siswake_0 
    let cls_kolomjumlah = `jumlahnilai${ki}siswa`;//jumlahreratak3siswake_0
    let inputkolomAll = document.querySelectorAll("."+cls_kolomjumlah);
    let arraynilaijumlah = [];
    for(let a = 0 ; a < inputkolomAll.length ; a++){
        let val = inputkolomAll[a].value == ""?0:parseFloat(inputkolomAll[a].value);
        arraynilaijumlah.push(val)
    }
    arraynilaijumlah.sort((a,b)=> b - a);
    //console.log(arraynilaijumlah)
    for(let i = 0 ; i < jsondatasiswa.length ; i++){
        let anake = `jumlahnilai${ki}siswake_${i}`;//
        let input_nilai = document.querySelector("."+anake);
        let nilai_jumlahanakke = parseFloat(input_nilai.value);
        let indeknilai = arraynilaijumlah.indexOf(nilai_jumlahanakke);
        
        let rangk_anake = `jumlahrerata${ki}siswake_${i}`;
        let input_rangking = document.querySelector("."+rangk_anake);
        input_rangking.value = (indeknilai + 1);

    }
}

const buatnilaisamadielemen = (el, kondisi) =>{
    let val = el.value;
    let teksdatakenaikan = `${prefix_stringkeyinduk}KENAIKAN_KELAS`;
    let selectKenaikan = document.querySelectorAll(`[data-keyraportindukmanual='${teksdatakenaikan}']`);
    let teksdatakelas = `${prefix_stringkeyinduk}NAIKTINGGAL_KELAS_DI`;
    let selectKelas = document.querySelectorAll(`[data-keyraportindukmanual='${teksdatakelas}']`);
    let teksdatatgl = `${prefix_stringkeyinduk}TITIMANGSA_RAPORT`;
    let selecttgl = document.querySelectorAll(`[data-keyraportindukmanual='${teksdatatgl}']`);
    let teksTglkelulusan = `${prefix_stringkeyinduk}TITIMANGSA_KELULUSAN`;//data-dbindukutama="keluar_tgl
    let inputtglkelulusan = document.querySelectorAll(`[data-keyraportindukmanual='${teksTglkelulusan}']`);
    let inputsmpke = document.querySelectorAll(`[data-updatedbutama="dapo_noseriijazah"]`)
    let saranelemen = document.querySelectorAll(`textarea[data-perkembanganlama="head_9"]`)
    if(kondisi == "statuskenaikan"){
        for(i = 0 ; i < selectKenaikan.length; i++){
            selectKenaikan[i].value = el.value;
        }
    }else if(kondisi == "kelas"){
        for(i = 0 ; i < selectKelas.length; i++){
            selectKelas[i].value = el.value;
        }
    }else if(kondisi == "titimangsa"){
        let valtanggal = val == ""?"":StringTanggalnol(new Date(val));
        for(i = 0 ; i < selecttgl.length; i++){
            selecttgl[i].value = valtanggal;
        }
    }else if(kondisi == "tglkelulusan"){
        let valtanggal = val == ""?"":StringTanggalnol(new Date(val));
        for(i = 0 ; i < inputtglkelulusan.length; i++){
            inputtglkelulusan[i].value = valtanggal;
        }
    }else if(kondisi == "noawalansurat"){
        
        for(i = 0 ; i < inputsmpke.length; i++){
            inputsmpke[i].value = val
        }

    }else if(kondisi == "saransaran"){
        //
        for(i = 0 ; i < saranelemen.length; i++){
            saranelemen[i].value = val
        }
    }
}
const manual_simpanserverperkembangan = (el) =>{
    el.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Proses mengirim...`
    let cekbarispertama = [];
    let arraytabel = [];
    let tbody = tabelraportmanual.querySelector("tbody");
    for(i = 0 ; i < tbody.rows.length ; i++){
        
        let arrbaris = [];
        let namasiswa = tbody.rows[i].cells[2].innerHTML;
        let sels = tbody.rows[i].querySelectorAll("[data-perkembanganlama]")
        arrbaris.push((i+1));
        arrbaris.push(namasiswa);
        let cekarbaripertama
        if(i == 0){
            cekarbaripertama = ["no",namasiswa]

        }
        for(j = 0 ; j < sels.length ; j++){
            let elemen = sels[j].getAttribute("data-perkembanganlama")
            if(i == 0 ){
                cekbarispertama.push(elemen)
            }
            arrbaris.push(sels[j].value);

        }
        arraytabel.push(arrbaris);
    }
    cekbarispertama.splice(0,0,"no","nama")
    // console.log(cekbarispertama);
    // console.log(arraytabel);
    let tab = "pelengkapraport";
    let tabel = JSON.stringify(arraytabel);
    let head = JSON.stringify(cekbarispertama);

   
    let cekdatapokok = tabelraportmanual.querySelector("tbody").rows;
    let resultarray_datapokok = [];
    let miripjsondatasiswa = []
    for( i = 0 ; i < cekdatapokok.length ; i++){
        let obj = {}
        let elRowInput = cekdatapokok[i].querySelectorAll("[data-updatedbutama]");
        for(k = 0 ; k < elRowInput.length; k++){
            let key = elRowInput[k].getAttribute("data-updatedbutama")
            obj[key] = elRowInput[k].value;
        }
        resultarray_datapokok.push(obj);
        let jsonsisi_siswa = Object.assign({},jsondatasiswa[i])
        let newJsonBaru = Object.assign(jsonsisi_siswa,obj);
        miripjsondatasiswa.push(newJsonBaru);
    }
    // console.log("datapokok yang terupdate:")
    // console.log(resultarray_datapokok);
    // console.log("jsondatasiswa")
    // console.log(jsondatasiswa)
    // console.log("mirip jsondatasiswa")
    // console.log(miripjsondatasiswa)

    let arrayisianraportdapodik = [];
    for( i = 0 ; i < cekdatapokok.length ; i++){
        let elRowInput = cekdatapokok[i].querySelectorAll("[data-keyraportindukmanual]");
        let obj = {};
        obj.no = (i+1);
        obj.tokensiswa = jsondatasiswa[i].id;
        obj.namasiswa = jsondatasiswa[i].pd_nama;

        for(j = 0 ; j < elRowInput.length ; j++){
            let elemen = elRowInput[j];
            let key = elemen.getAttribute("data-keyraportindukmanual")
            let val
            if(elemen.nodeName == "TD"){
                val = elemen.innerText
            }else{
                val = elemen.value;
            }
            obj[key] = val;
        }
        arrayisianraportdapodik.push(obj);
    }
    // console.log("data raport yang terdeteksi:")
    // 

    jsondatasiswa = [];
    jsondatasiswa = miripjsondatasiswa;

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
            el.innerHTML = "Simpan Server Perkembangan"
            //btn_savekembang.innerHTML = `<i class="fa fa-globe"></i> Simpan Ke Server`;

            //tombol.innerHTML = "Simpan di Server"
        })
        .catch(er => alert(er))
    
    let oKeys = JSON.stringify(Object.keys(arrayisianraportdapodik[0]));
    let oValuess = JSON.stringify(arrayisianraportdapodik.map(s=> Object.values(s)));
    let kirimdatasementara = new FormData();
    kirimdatasementara.append("head", oKeys)
    kirimdatasementara.append("tabel", oValuess)
    kirimdatasementara.append("kelas", idNamaKelas);
    kirimdatasementara.append("prefiktab", "Induksemetara");
    fetch(constlinknilai + "?action=inserttabeltospreadsheet", {
        method: 'post',
        body: kirimdatasementara
    }).then(m => m.json())
        .then(k => {
            console.log(k);
            //alert(k.result);
        })
        .catch(er => console.log(er));
    
        let jk = 0;
        for(jk = 0 ; jk < miripjsondatasiswa.length ; jk++){
            let idsiswa = miripjsondatasiswa[jk].id
            let key = Object.keys(miripjsondatasiswa[jk]).filter(s => s !== "time_stamp")
            let databelumkirim = new FormData();
            for (let i = 0; i < key.length; i++) {
                databelumkirim.append(key[i], miripjsondatasiswa[jk][key[i]]);
                }
                let aaa = linkDataUserWithIdss + "&action=editsiswa";
                fetch(aaa, {
                    method: "post",
                    body: databelumkirim
                }).then(m => m.json())
                    .then(f => {
                        console.log("cek untuk id siswa ", idsiswa)
                        
                    })
                    .catch(er => console.log(er))
            j++
        }
    


}
const panggildataperkembanganuntukmanual = (info) =>{
    let tbody = tabelraportmanual.querySelector("tbody");
    let tab = "pelengkapraport";

    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {
            
            if (k.result == 0) {
                info.innerHTML = "<h4 style='text-align:center'>Anda belum pernah membuat data Rekapitulasi  Perkembangan Siswa</h4>. Nilai ini diambil dari hasil penyimpanan server yang telah Anda lakukan baik melalui menu Tab <b>Raport</b> atau <b>Raport Manual</b>";
                
            } else {
                info.innerHTML = `<h4 class="w3-center">Database Rekapitulasi Perkembangan Siswa berhasil dimuat.</h4> Sebaiknya Anda selalu menyimpan ke server setiap ada perubahan di data ini agar tidak hilang saat Anda tidak mengerjakan data di tabel ini (Klik tombol Simpan Server Perkembangan di bawah tabel). Nilai ini diambil dari hasil penyimpanan server yang telah Anda lakukan baik melalui menu Tab <b>Raport</b> atau <b>Raport Manual</b>`;
                let result = k.data;
                for(i = 0 ; i < tbody.rows.length ; i++){
        
                    
                    let sels = tbody.rows[i].querySelectorAll("[data-perkembanganlama]")
                    
                    for(j = 0 ; j < sels.length ; j++){
                        let keyelemen = sels[j].getAttribute("data-perkembanganlama")
                        let isisortir = result[i][keyelemen].match(/<br>|&nbsp;/gm);
                        
                        let isijadi
                        if(isisortir == null){
                            isijadi = result[i][keyelemen]
                        }else{
                            isijadi = result[i][keyelemen].replace(/<br>|&nbsp;/gm,"\r")
                        }
                        sels[j].value = isijadi;//result[i][keyelemen]
                        //koreksi
                        // if(keyelemen=='head_11'||keyelemen=='head_14'){
                        //     sels[j].value = isijadi ==""?jsondatasiswa[i].dapo_beratbadan:isijadi;
                        // }
                        if(idSemester == 1){
                            if(keyelemen=='head_10'){
                                sels[j].value = isijadi ==""?jsondatasiswa[i].dapo_tinggibadan:isijadi;
                            }
                            if(keyelemen=='head_12'){
                                sels[j].value = isijadi ==""?jsondatasiswa[i].dapo_beratbadan:isijadi;
                            }
                        }else{
                            if(keyelemen=='head_11'){
                                sels[j].value = isijadi ==""?jsondatasiswa[i].dapo_tinggibadan:isijadi;
                            }
                            if(keyelemen=='head_13'){
                                sels[j].value = isijadi ==""?jsondatasiswa[i].dapo_beratbadan:isijadi;
                            }
                        }
                        
                        
                        //arrbaris.push(sels[j].value);
            
                    }
                    //arraytabel.push(arrbaris);
                }
                for(x = 0 ; x < jsondatasiswa.length ; x++){
                    updatestringifydbutamayangobjek(x,"fisik");
                    updatestringifydbutamayangobjek(x,"kesehatan");

                }
                
            }
        })
        .catch(er => console.log(er))
}
const updatestringifydbutamayangobjek = (indek,kondisi) =>{
    let result, dataasal, input1, input2, input3, input4 ;
    let inputbarisrow = tabelraportmanual.querySelector("tbody").rows[indek];
    let inputisi;
    let arraybaru = [];
    if(kondisi == "fisik"){
        input1 = inputbarisrow.querySelector("input[data-perkembanganlama='head_10']");//tb_s1
        input2 = inputbarisrow.querySelector("input[data-perkembanganlama='head_11']");//tb_s2
        input3 = inputbarisrow.querySelector("input[data-perkembanganlama='head_12']");//bb_s1
        input4 = inputbarisrow.querySelector("input[data-perkembanganlama='head_13']");//bb_s2
        dataasal = jsondatasiswa[indek].riwayat_fisik;
        // console.log(dataasal)
        // console.log(input1.value)
        // console.log(input2.value)
        // console.log(input3.value)
        // console.log(input4.value)
        inputisi = inputbarisrow.querySelector("input[data-updatedbutama='riwayat_fisik']");//bb_s2
        let objekasal = dataasal==""?[]:JSON.parse(dataasal);

        let cektapel = objekasal.filter(s => s.tapel == dbinduk_tapel_integer);
        
        if(cektapel.length > 0){
            // disini ada cektapel.length objek yang memiliki properti tapel == dbinduk_tapel_integer;
            //let arraybaru = [];
            let u, p, d, a, t, e
            for(u = 0 ; u < objekasal.length ; u++){
                // masing-masing objek tersebut dibuat objek baru dan terpisah:
                let odBaru = Object.assign({}, objekasal[u]);// objekasal dan objekbaru sudah terpisah
                if(odBaru.semester == 1 && odBaru.tapel == dbinduk_tapel_integer){
                    //console.log("ditemukan odBaru yang semester 1 dan tapel saat 22122");
                    odBaru.tb = input1.value;
                    odBaru.bb = input3.value;
                    //console.log(odBaru, input1.value, input3.value)
                    arraybaru.push(odBaru);
                }else if(odBaru.semester == 2 && odBaru.tapel == dbinduk_tapel_integer){
                    //console.log("ditemukan odBaru yang semester 2 dan tapel saat 22122");
                    odBaru.tb = input2.value;
                    odBaru.bb = input4.value;
                    //console.log(odBaru, input2.value, input4.value)
                    arraybaru.push(odBaru);
                }else{
                    arraybaru.push(odBaru)
                }

                //console.log(objekasal,odBaru)
            }
            // for(i = 0 ; i < objekasal.length; i++){
            //     let objperbaris = Object.assign({},objekasal[i])
                
            //     if(objperbaris.tapel == dbinduk_tapel_integer && objperbaris.semester == 1){
            //         objperbaris.tb=input1.value
            //         objperbaris.bb=input3.value
            //     }else if(objperbaris.tapel == dbinduk_tapel_integer && objperbaris.semester == 2){
            //         objperbaris.tb=input2.value
            //         objperbaris.bb=input4.value
            //     }else{
            //         console.log("tak terdeteksi if kondisi")
            //         console.log(objekperbaris)
            //     }
            //     // console.log(objperbaris);
            //     arraybaru.push(objperbaris)
            // }
        }else{
            if(dataasal == ""){
                let objekpertamakalis1 = {}
                objekpertamakalis1.tapel = dbinduk_tapel_integer;
                objekpertamakalis1.semester = 1;
                objekpertamakalis1.tb = input1.value;
                objekpertamakalis1.bb = input3.value;
                
                let objekpertamakalis2 = {}
                objekpertamakalis2.tapel = dbinduk_tapel_integer;
                objekpertamakalis2.semester = 2;
                objekpertamakalis2.tb = input2.value;
                objekpertamakalis2.bb = input4.value;

                arraybaru.push(objekpertamakalis1)
                arraybaru.push(objekpertamakalis2)
            }else{
                for(i = 0 ; i < objekasal.length; i++){
                    let objperbaris = Object.assign({},objekasal[i])
                    arraybaru.push(objperbaris)
                }
                let objekpertamakalis1 = {}
                objekpertamakalis1.tapel = dbinduk_tapel_integer;
                objekpertamakalis1.semester = 1;
                objekpertamakalis1.tb = input1.value;
                objekpertamakalis1.bb = input3.value;
                
                let objekpertamakalis2 = {}
                objekpertamakalis2.tapel = dbinduk_tapel_integer;
                objekpertamakalis2.semester = 12
                objekpertamakalis2.tb = input2.value;
                objekpertamakalis2.bb = input4.value;
                console.log(objekpertamakalis2)
                arraybaru.push(objekpertamakalis1)
                arraybaru.push(objekpertamakalis2)
            }
        }
    }else if(kondisi=="kesehatan"){
        input1 = inputbarisrow.querySelector("input[data-perkembanganlama='head_14']");//pendengaran
        input2 = inputbarisrow.querySelector("input[data-perkembanganlama='head_15']");//penglihatan
        input3 = inputbarisrow.querySelector("input[data-perkembanganlama='head_16']");//gigi
        input4 = inputbarisrow.querySelector("input[data-perkembanganlama='head_17']");//lainnya
        dataasal = jsondatasiswa[indek].riwayat_penyakit;
        inputisi = inputbarisrow.querySelector("input[data-updatedbutama='riwayat_penyakit']");//bb_s2
        let objekasal = dataasal==""?[]:JSON.parse(dataasal);
        let cektapel = objekasal.filter(s => s.tapel == dbinduk_tapel_integer);
        if(cektapel.length > 0){
            for(i = 0 ; i < objekasal.length; i++){
                let objperbaris = Object.assign({},objekasal[i])
                
                if(objperbaris.tapel == dbinduk_tapel_integer){
                    objperbaris.pendengaran=input1.value
                    objperbaris.penglihatan=input2.value
                    objperbaris.gigi=input3.value
                    objperbaris.penyakit=input4.value
                }


                arraybaru.push(objperbaris)
            }
        }else{
            if(dataasal == ""){
                let objperbaris = {}
                objperbaris.tapel = dbinduk_tapel_integer;
                objperbaris.pendengaran=input1.value
                objperbaris.penglihatan=input2.value
                objperbaris.gigi=input3.value
                objperbaris.penyakit=input4.value
                
              
                arraybaru.push(objperbaris)
            }else{
                for(i = 0 ; i < objekasal.length; i++){
                    let objperbaris = Object.assign({},objekasal[i])
                    arraybaru.push(objperbaris)
                }
                let objperbaris = {}
                objperbaris.tapel = dbinduk_tapel_integer;
                objperbaris.pendengaran=input1.value
                objperbaris.penglihatan=input2.value
                objperbaris.gigi=input3.value
                objperbaris.penyakit=input4.value
                arraybaru.push(objperbaris)
                
            }
        }
    }
    
    result = JSON.stringify(arraybaru);
    inputisi.value = result;
}
const simpanrekapnilairaport = (kondisi)=>{
    let namakelas = `.tabelleger${kondisi}`;
    let tabel2 = document.querySelector(namakelas);
    if(tabel2 == null){
        alert("Maaf, Nilai belum siap... silakan buka Tab Nilai "+kondisi + " atau jika Anda pernah menyimpan Rekap Nilai Raport ini, klik Tampilkan Rekap Nilai Raport " + kondisi+ " Server");
        return
    }
    let head2 = tabel2.querySelector("thead");
    let body2 = tabel2.querySelector("tbody");
    let paramheaed = ["no","namasiswa"];
    let parambdy = []
    for(i = 0 ; i < head2.rows[1].cells.length ; i++){
        let mapel = head2.rows[1].cells[i].innerHTML
        paramheaed.push(mapel);
    }
    
    for(j = 0 ; j < body2.rows.length ; j++){
        let arraybaris = [(j+1),jsondatasiswa[j].pd_nama]
        for(k = 0 ; k < head2.rows[1].cells.length; k++ ){
            let l = (k+2)
            let nilai = body2.rows[j].cells[l].innerHTML;
            arraybaris.push(nilai)

        }
        parambdy.push(arraybaris)
    }
    //console.log(parambdy)
    let tab = "rekapnilairaport_"+idNamaKelas +"_"+kondisi;
    let tabel = JSON.stringify(parambdy);
    let head = JSON.stringify(paramheaed);

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
        clearInterval(stoploadingtopbar);
        let divlod = document.querySelector(".loadingtopbar");
        divlod.style.width = "100%";
        setTimeout(() => {
            divlod.style.width = "1px"
            divlod.className += " w3-hide";
        }, 3000);

    })
    .catch(er => alert(er))
}
const tampilkannilairaport = (kondisi) => {
    let namatabel = `.tabelleger${kondisi}`;
    let koleksimapel = koleksiarraymapelaktif()
    let koleksimapeldengangama = koleksimapel.kodemapel;
    let koleksimapeljadi = koleksimapeldengangama.filter(s => !(s =="PAI" || s == "PKATO" || s== "PKRIS" || s == "PHIND" || s == "PBUDH"));
    koleksimapeljadi.splice(0,0,"AGAMA");
    console.log(koleksimapeljadi);
    //anggap tabel sudah ada:
    let tabelsumber = document.querySelector(namatabel);
    let tbodyasal, theadasal
    if(tabelsumber == null){
        let tabelbaru = document.createElement("table");
        tabelbaru.setAttribute("class",`versi-table w3-tiny tabelleger${kondisi}`)
        let cTHead = tabelbaru.createTHead();
        let tr = cTHead.insertRow(-1);
        let th = document.createElement("th");
        th.setAttribute("rowspan","2");
        th.innerHTML = "No";

        tr.appendChild(th);
        th = document.createElement("th");
        th.setAttribute("rowspan","2");
        th.innerHTML = "Nama Siswa";
        tr.appendChild(th);
        th = document.createElement("th");
        th.setAttribute("colspan", koleksimapeljadi.length);
        th.innerHTML = "Mata Pelajaran";
        tr.appendChild(th);

        th = document.createElement("th");
        th.setAttribute("rowspan","2");
        th.innerHTML = "Jumlah";
        tr.appendChild(th);
        th = document.createElement("th");
        th.setAttribute("rowspan","2");
        th.innerHTML = "Rerata";
        tr.appendChild(th);
        if(kondisi == "k3"){
            th = document.createElement("th");
            th.setAttribute("rowspan","2");
            th.innerHTML = "Rerata";
            tr.appendChild(th);
        }

        tr = cTHead.insertRow(-1);
        for(let i = 0 ; i < koleksimapeljadi.length; i++){
            th = document.createElement("th");
            th.innerHTML = koleksimapeljadi[i];
            tr.appendChild(th);
        }
        let tbody = tabelbaru.createTBody();
        for(j = 0 ; j < jsondatasiswa.length ; j++){
            tr = tbody.insertRow(-1);
            let td = tr.insertCell(-1);
            td.innerHTML = (j+1);
            
            td = tr.insertCell(-1);
            td.innerHTML = jsondatasiswa[j].pd_nama;
            for(let k = 0 ; k < koleksimapeljadi.length; k++){
                td = tr.insertCell(-1);
                td.innerHTML = "";
            }
            td = tr.insertCell(-1);
            td.innerHTML = "";
            td = tr.insertCell(-1);
            td.innerHTML = "";
            if(kondisi == "k3"){
                td = tr.insertCell(-1);
                td.innerHTML = "";
            }
            
        }
        let tempatasal = document.querySelector(".leger_"+kondisi);
        tempatasal.innerHTML = "";
        tempatasal.innerHTML += kondisi == "k3"?`<h3>Leger Nilai Kompetensi Pengetahuan (KI-3)</h3>`:`<h3>Leger Nilai Kompetensi Keterampilan (KI-4)</h3>`;
        tempatasal.innerHTML +=`Sumber Data: Tabel Data Nilai Simpanan Server (Anda mengeklik tombol  Tampilkan Rekap Nilai Raport ${kondisi.toUpperCase()})`;
        tempatasal.appendChild(tabelbaru);
    }else{
        let tabelbaru = document.createElement("table");
        tabelbaru.setAttribute("class",`versi-table w3-tiny tabelleger${kondisi}`)
        let cTHead = tabelbaru.createTHead();
        let tr = cTHead.insertRow(-1);
        let th = document.createElement("th");
        th.setAttribute("rowspan","2");
        th.innerHTML = "No";

        tr.appendChild(th);
        th = document.createElement("th");
        th.setAttribute("rowspan","2");
        th.innerHTML = "Nama Siswa";
        tr.appendChild(th);
        th = document.createElement("th");
        th.setAttribute("colspan", koleksimapeljadi.length);
        th.innerHTML = "Mata Pelajaran";
        tr.appendChild(th);

        th = document.createElement("th");
        th.setAttribute("rowspan","2");
        th.innerHTML = "Jumlah";
        tr.appendChild(th);
        th = document.createElement("th");
        th.setAttribute("rowspan","2");
        th.innerHTML = "Rerata";
        tr.appendChild(th);
        if(kondisi == "k3"){
            th = document.createElement("th");
            th.setAttribute("rowspan","2");
            th.innerHTML = "Rerata";
            tr.appendChild(th);
        }

        tr = cTHead.insertRow(-1);
        for(let i = 0 ; i < koleksimapeljadi.length; i++){
            th = document.createElement("th");
            th.innerHTML = koleksimapeljadi[i];
            tr.appendChild(th);
        }
        let tbody = tabelbaru.createTBody();
        for(j = 0 ; j < jsondatasiswa.length ; j++){
            tr = tbody.insertRow(-1);
            let td = tr.insertCell(-1);
            td.innerHTML = (j+1);
            
            td = tr.insertCell(-1);
            td.innerHTML = jsondatasiswa[j].pd_nama;
            for(let k = 0 ; k < koleksimapeljadi.length; k++){
                td = tr.insertCell(-1);
                td.innerHTML = "";
            }
            td = tr.insertCell(-1);
            td.innerHTML = "";
            td = tr.insertCell(-1);
            td.innerHTML = "";
            if(kondisi == "k3"){
                td = tr.insertCell(-1);
                td.innerHTML = "";
            }
            
        }
        let tempatasal = document.querySelector(".leger_"+kondisi);
        tempatasal.innerHTML = "";
        tempatasal.innerHTML += kondisi == "k3"?`<h3>Leger Nilai Kompetensi Pengetahuan (KI-3)</h3>`:`<h3>Leger Nilai Kompetensi Keterampilan (KI-4)</h3>`;
        tempatasal.innerHTML +=`Sumber Data: Tabel Data Nilai Simpanan Server (Anda mengeklik tombol  Tampilkan Rekap Nilai Raport ${kondisi.toUpperCase()})`;
        tempatasal.appendChild(tabelbaru);
    }
    let definisibarutabel = document.querySelector(namatabel);
    theadasal = definisibarutabel.querySelector("thead");
    tbodyasal = definisibarutabel.querySelector("tbody");

    // let idsumberdata = kondisi == "k3"?`#menumenunilaikd3`:`#menumenunilaikd4`;
    // let tekssumberdataelemen = document.querySelector(idsumberdata);
    // if(tekssumberdataelemen == null){

    // }
    // let tekssumberdata = document.querySelector(idsumberdata).innerHTML;
    // let ada = tekssumberdata.indexOf("Data Pengolahan Nilai") > -1 ? "Sumber Data: Tabel Data Nilai Olahan" : "Sumber Data: Tabel Data Nilai Asli";
        
    let tab = "rekapnilairaport_"+idNamaKelas +"_"+kondisi;

    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {
            //console.log(k)
            if (k.result == 0) {
                // document.querySelector(".info_mbtr").innerHTML = kondisi + " Tidak Berhasil dimuat."
            } else {
                // document.querySelector(".info_mbtr").innerHTML = kondisi + " Berhasil dimuat."
                let nilaidata = k.data;
                console.log(koleksimapeljadi)
                for(s = 0 ; s < tbodyasal.rows.length ; s++){
                    let row = tbodyasal.rows[s];
                    let nilairaport = nilaidata[s]
                    let sum = 0
                    for(t = 0 ; t < koleksimapeljadi.length ; t++){
                        let col = (t+2)
                        row.cells[col].innerHTML = nilairaport[koleksimapeljadi[t]]
                        sum += nilairaport[koleksimapeljadi[t]]==""?0:parseInt(nilairaport[koleksimapeljadi[t]])
                    }
                    row.cells[koleksimapeljadi.length+2].innerHTML = sum;
                    row.cells[koleksimapeljadi.length+2].innerHTML = (sum/koleksimapeljadi.length).toFixed(2);
                }
            }
        })
        .catch(er => {console.log(er)});
    // let tabel2 = document.querySelector(namakelas);
    // if(tabel2 == null){
    //     alert("Maaf, Nilai belum siap... silakan buka Tab Nilai "+kondisi + " atau jika Anda pernah menyimpan Rekap Nilai Raport ini, klik Tampilkan Rekap Nilai Raport " + kondisi+ " Server");
    //     return
    // }
    // let head2 = tabel2.querySelector("thead");
    // let body2 = tabel2.querySelector("tbody");

}
const shownilairaportkd = (kondisi) =>{
    document.querySelector(".info_mbtr").innerHTML = `<i class="fa fa-spin fa-spinner"></i> sedang memproses database Rekap Raport Final ${kondisi.toUpperCase()}....`;
    let q =  `[data-keyraportindukmanual=""]`;
    let koleksimapel = koleksiarraymapelaktif()
    let koleksimapeldengangama = koleksimapel.kodemapel;
    let koleksimapeljadi = koleksimapeldengangama.filter(s => !(s =="PAI" || s == "PKATO" || s== "PKRIS" || s == "PHIND" || s == "PBUDH"));
    koleksimapeljadi.splice(0,0,"AGAMA");

    let tabnew = "newRekapRaport_"+idNamaKelas +"_"+kondisi;
    let paramnew = "&kelas=" + idNamaKelas + "&prefiktab=" + tabnew;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + paramnew)
    .then(m => m.json())
    .then(f =>{
        
    if(f.result == 0){
        alert("Anda belum pernah menyimpan database Raport yang akan dicetak raport, Sistem akan mengambil data yang telah Anda simpan di fitur OLAH NILAI")
        document.querySelector(".info_mbtr").innerHTML = `<i class="fa fa-spin fa-spinner"></i> sedang memproses database Rekap Raport Olah Nilai (database yang pernah Anda simpan di Fitur Oleh Nilai ${kondisi.toUpperCase()}) ....`;
        let tab = "rekapnilairaport_"+idNamaKelas +"_"+kondisi;
        let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
        fetch(constlinknilai + "?action=getdatafromtab" + param)
            .then(m => m.json())
            .then(k => {
                //console.log(k)
                if (k.result == 0) {
                    alert("Anda belum menyimpan data nilai Raport apapun. Silakan isikan data ini secara manual.")
                    document.querySelector(".info_mbtr").innerHTML = `Tidak ada database apapun dari server. Anda harus menginput nilai ${kondisi.toUpperCase()} manual atau gunakan fitur ini: ` + tambahfituruploadimport(kondisi);
                    panggilkompetensiasli(kondisi,"");
                } else {
                    document.querySelector(".info_mbtr").innerHTML = kondisi + " Berhasil dimuat." + tambahfituruploadimport(kondisi);
                    let nilaidata = k.data;
                    let tbody = tabelraportmanual.querySelector("tbody");
                    let row = tbody.rows;
                    for(w = 0 ; w < row.length ; w++){
                        let nilairaport = nilaidata[w]
                        console.log(i, nilairaport)
                        for(d = 0 ; d < koleksimapeljadi.length ; d++){
                            let ktakunci;
                            if(kondisi == "k3"){
                                ktakunci = prefix_stringkeyinduk + koleksimapeljadi[d] + "_P_NILAI"
                               
                                let cariinput = row[w].querySelector(`[data-keyraportindukmanual="${ktakunci}"]`)
                                cariinput.value = nilairaport[koleksimapeljadi[d]];

                                let inputnilaideskripsi = row[w].querySelector(`[data-deskripsik3="raport_${koleksimapeljadi[d]}"]`);
                                inputnilaideskripsi.value = nilairaport[koleksimapeljadi[d]];
                            }else{
                                ktakunci = prefix_stringkeyinduk + koleksimapeljadi[d] + "_K_NILAI";
                                let cariinput = row[w].querySelector(`[data-keyraportindukmanual="${ktakunci}"]`)
                                cariinput.value = nilairaport[koleksimapeljadi[d]];
                                let inputnilaideskripsi = row[w].querySelector(`[data-deskripsik4="raport_${koleksimapeljadi[d]}"]`);
                                inputnilaideskripsi.value = nilairaport[koleksimapeljadi[d]];
                            }
                        }
                    }
                    for(x = 0 ; x < row.length ; x++){
                        if(kondisi == "k3"){
                            kalkulasinilairaportmanual('k3',x)
                        }else{
                            kalkulasinilairaportmanual('k4',x)
                        }
                    }

                }
            })
            .catch(er => {console.log(er)});
    }else{
        
        document.querySelector(".info_mbtr").innerHTML ="<h3 class='w3-center'>"+ kondisi + " Berhasil memuat database Raport Final </h4>" + tambahfituruploadimport(kondisi);
                    let nilaidata = f.data;
                    let tbody = tabelraportmanual.querySelector("tbody");
                    let row = tbody.rows;
                    for(w = 0 ; w < row.length ; w++){
                        let nilairaport = nilaidata[w]
                        for(d = 0 ; d < koleksimapeljadi.length ; d++){
                            let ktakunci, ktakuncik
                            if(kondisi == "k3"){
                                ktakunci = prefix_stringkeyinduk + koleksimapeljadi[d] + "_P_NILAI";
                                ktakuncik = prefix_stringkeyinduk + koleksimapeljadi[d] + "_P_DESKRIPSI";
                                let cariinput = row[w].querySelector(`[data-keyraportindukmanual="${ktakunci}"]`)
                                cariinput.value = nilairaport[koleksimapeljadi[d]];
                                // kalkulasinilairaportmanual('k3',w)
                                row[w].querySelector(`[data-keyraportindukmanual="${ktakuncik}"]`).innerHTML =nilairaport[ktakuncik];
                            }else{
                                ktakunci = prefix_stringkeyinduk + koleksimapeljadi[d] + "_K_NILAI";
                                ktakuncik = prefix_stringkeyinduk + koleksimapeljadi[d] + "_K_DESKRIPSI";
                                let cariinput = row[w].querySelector(`[data-keyraportindukmanual="${ktakunci}"]`)
                                cariinput.value = nilairaport[koleksimapeljadi[d]];
                                row[w].querySelector(`[data-keyraportindukmanual="${ktakuncik}"]`).innerHTML =nilairaport[ktakuncik];
                                // let inputnilaideskripsi = row[w].querySelector(`[data-deskripsik4="raport_${koleksimapeljadi[d]}"]`);
                                // inputnilaideskripsi.value = nilairaport[koleksimapeljadi[d]];
                                // kalkulasinilairaportmanual('k4',w)
                            }
                        }
                        //jumlah, rangking, dan deskripsi
                        row[w].querySelector(`.jumlahnilai${kondisi}siswake_${w}`).value =nilairaport["Jumlah"];
                        row[w].querySelector(`.jumlahrerata${kondisi}siswake_${w}`).value =nilairaport["Rangking"];

                        
                    }
                    for(x = 0 ; x < row.length ; x++){
                        if(kondisi == "k3"){
                            kalkulasinilairaportmanual('k3',x)
                        }else{
                            kalkulasinilairaportmanual('k4',x)
                        }
                    }

                
    }

    })
}
const cekdataalgoritma = (kondisi)=>{
    let indeksKurikulum
    if(kondisi == "k3"){
        indeksKurikulum = 6;
    }
    let arraydatakelas = [];
    let cekdataolahan = []//getdataolahan();
    let tes = tabelkearray();
    let paspak = (idSemester == 2) ? "PAK" : "PAS";
    //let tabeldata = document.querySelector(".datarekapkd3").getElementsByTagName("tbody")[0];
    let ddph = tes.filter(k => k[indeksKurikulum] == true).map(k => "PH_" + k[0] + "_" + k[1]);
    let ddpts = tes.filter(k => k[indeksKurikulum] == true).map(k => "PTS_" + k[0] + "_" + k[1]);
    let ddpas = tes.filter(k => k[indeksKurikulum] == true).map(k => paspak + "_" + k[0] + "_" + k[1]);
    let a = ddph.concat(ddpts);

    let dds = a.concat(ddpas);
    console.log(dds)
    let tab = "rekapkd3";
    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {
            console.log(k);
        })
        .catch(er => console.log(er))
}
const newAlgoritma = (kondisi, obj) =>{
    let result;
    let koleksimapel = koleksiarraymapelaktif()
    let koleksimapeldengangama = koleksimapel.kodemapel;
    let koleksimapeljadi = koleksimapeldengangama.filter(s => !(s =="PAI" || s == "PKATO" || s== "PKRIS" || s == "PHIND" || s == "PBUDH"));
    koleksimapeljadi.splice(0,0,"AGAMA");





    // if(kondisi == "k3"){

    // }else if(kondisi == "k4"){

    // }else{
    //     result =""
    // }
    // objeknilai["raport_" + namamapel] = oknilairaport;
    //     objeknilai["kriteria_" + namamapel] = fn_predikatkriteria(oknilairaport);
    //     objeknilai["maks_" + namamapel] = kdMaks;
    //     objeknilai["kriteria_maks_" + namamapel] = fn_predikatkriteria(acuanmaks);
    //     objeknilai["min_" + namamapel] = kdMins;
    //     objeknilai["kriteria_min_" + namamapel] = fn_predikatkriteria(acuanmin);

    //     arrayobjekmapel.push(objeknilai);

    // }
    // inforaport["datarraport"] = arrayobjekmapel;
}
let Objekdefinisikodemapel = {"PAI":"Pendidikan Agama Islam dan Budi Pekerti",
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
const aktifkanmapel_deskripsimanual = (ele, kondisi,kodemapel)=>{

    let sel_deskripsi_k3_olah = tabelraportmanual.querySelectorAll(`.sel_deskripsi_${kondisi}_olah`);
    sel_deskripsi_k3_olah.forEach(el => {
        if(el.className.indexOf("w3-hide")==-1)
        el.classList.add("w3-hide")
    });
    let sel_deskripsi_kondisi_mapel = tabelraportmanual.querySelectorAll(`.sel_deskripsi_${kondisi}_${kodemapel}`);
    sel_deskripsi_kondisi_mapel.forEach(el => {
        if(el.className.indexOf("w3-hide")>-1)
        el.classList.remove("w3-hide")
    });
    let tombols = tabelraportmanual.querySelectorAll(".tombolpilihmapeleditdeskripsi");
    tombols.forEach(el => {
        if(el.className.indexOf("w3-pale-green")>-1)
        el.classList.remove("w3-pale-green")

    })
    ele.classList.add("w3-pale-green");
    let judulmapel = tabelraportmanual.querySelector(`#mapeldeskripsi_${kondisi}_manual`);
    judulmapel.innerHTML = Objekdefinisikodemapel[kodemapel]==undefined?"AGAMA":Objekdefinisikodemapel[kodemapel];
}
const change_deskripsi = (brs, el="", kondisi, kodemapel) =>{
    //change_deskripsi(this, 'kd3','AGAMA')
    let boditabel = tabelraportmanual.querySelector("tbody");
    let fokusbaris = boditabel.rows[brs];
    let queryElemenRaport = fokusbaris.querySelectorAll(`[data-deskripsi${kondisi}]`);
    let ktakunci;// = prefix_stringkeyinduk + kodemapel + "_P_DESKRIPSI";
    if(kondisi == "k3"){
        ktakunci = prefix_stringkeyinduk + kodemapel + "_P_DESKRIPSI";
    }else{
        ktakunci = prefix_stringkeyinduk + kodemapel + "_K_DESKRIPSI";
    }
    let cariinput = fokusbaris.querySelector(`[data-keyraportindukmanual="${ktakunci}"]`)
    
    // let elemenisikandeskripsi = fokusbaris.querySelector(`[data-]`)
    let predikat_kdMaks = fokusbaris.querySelector(`[data-deskripsi${kondisi}="predikat_kdmaks_${kodemapel}"]`);
    
        let ops0 = predikat_kdMaks.options;
        let ind0 = ops0.selectedIndex;
        let val_predikatkdMaks = ops0[ind0].value;
    let predikat_kdMin = fokusbaris.querySelector(`[data-deskripsi${kondisi}="predikat_kdmin_${kodemapel}"]`);
        let ops1 = predikat_kdMin.options;
        let ind1 = ops1.selectedIndex;
        let val_predikatKdmin = ops1[ind1].value;

    let kdMaks = fokusbaris.querySelector(`[data-deskripsi${kondisi}="kdmaks_${kodemapel}"]`);
        let ops2 = kdMaks.options;
        let ind2 = ops2.selectedIndex;
        let val_kdmaks = ops2[ind2].value;
        let val_kdmaksteks = ops2[ind2].getAttribute("data-opsivalue");

    let kdMin = fokusbaris.querySelector(`[data-deskripsi${kondisi}="kdmin_${kodemapel}"]`);
    let ops3 = kdMin.options;
        let ind3 = ops3.selectedIndex;
        let val_kdmin = ops3[ind3].value;
        let val_kdminteks = ops3[ind3].getAttribute("data-opsivalue");
    let html = '';
    html +=`Ananda ${jsondatasiswa[brs].pd_nama} <span class="w3-text-blue">${val_predikatkdMaks} dalam</span> ${val_kdmaksteks}, <span class="w3-text-blue">${val_predikatKdmin} dalam</span> ${val_kdminteks}`;
    cariinput.innerHTML = html;
}
const change_deskripsi2 = (brs, el="", kondisi, kodemapel) =>{
    //change_deskripsi(this, 'kd3','AGAMA')
    let boditabel = tabelraportmanual.querySelector("tbody");
    let fokusbaris = boditabel.rows[brs];
    let queryElemenRaport = fokusbaris.querySelectorAll(`[data-deskripsi${kondisi}]`);
    let ktakunci;// = prefix_stringkeyinduk + kodemapel + "_P_DESKRIPSI";
    if(kondisi == "k3"){
        ktakunci = prefix_stringkeyinduk + kodemapel + "_P_DESKRIPSI";
    }else{
        ktakunci = prefix_stringkeyinduk + kodemapel + "_K_DESKRIPSI";
    }
    let cariinput = fokusbaris.querySelector(`[data-keyraportindukmanual="${ktakunci}"]`)
    
    // let elemenisikandeskripsi = fokusbaris.querySelector(`[data-]`)
    let predikat_kdMaks = fokusbaris.querySelector(`[data-deskripsi${kondisi}="predikat_kdmaks_${kodemapel}"]`);
    
        let ops0 = predikat_kdMaks.options;
        let ind0 = ops0.selectedIndex;
        let val_predikatkdMaks = ops0[ind0].value;
    let predikat_kdMin = fokusbaris.querySelector(`[data-deskripsi${kondisi}="predikat_kdmin_${kodemapel}"]`);
        let ops1 = predikat_kdMin.options;
        let ind1 = ops1.selectedIndex;
        let val_predikatKdmin = ops1[ind1].value;

    let kdMaks = fokusbaris.querySelector(`[data-deskripsi${kondisi}="kdmaks_${kodemapel}"]`);
        let ops2 = kdMaks.options;
        let ind2 = ops2.selectedIndex;
        let val_kdmaks = ops2[ind2].value;
        let val_kdmaksteks = ops2[ind2].getAttribute("data-opsivalue");

    let kdMin = fokusbaris.querySelector(`[data-deskripsi${kondisi}="kdmin_${kodemapel}"]`);
    let ops3 = kdMin.options;
        let ind3 = ops3.selectedIndex;
        let val_kdmin = ops3[ind3].value;
        let val_kdminteks = ops3[ind3].getAttribute("data-opsivalue");
    let html = '';
    html +=`Ananda ${jsondatasiswa[brs].pd_nama} <span class="w3-text-blue">${val_predikatkdMaks} dalam</span> ${val_kdmaksteks}, <span class="w3-text-blue">${val_predikatKdmin} dalam</span> ${val_kdminteks}`;
    cariinput.innerHTML = html;
}

const indukyangditaruhsementara = () =>{
    let tabelbody = tabelraportmanual.querySelector("tbody");
    let arraySS = [];
    let arrayhead = ["no", "namasiswa"]
    for(i = 0 ; i < tabelbody.rows.length ; i++){
        let keysinduk = tabelbody.rows[i].querySelectorAll("[data-keyraportindukmanual]")
        let arraybaris = [(i+1),jsondatasiswa[i].pd_nama];
        for(j = 0 ; j < keysinduk.length ; j++){
            let keyinduk = keysinduk[j].getAttribute("data-keyraportindukmanual");
            if(i == 0){
                arrayhead.push(keyinduk)
            }
            arraybaris.push(keysinduk[j])
        }
        arraySS.push(arraybaris);

    }
    console.log(arrayhead);
    console.log(arraySS);

}
const manual_simpanserverK3 = (el) =>{
    el.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Simpan Server K3`
    let cekdatapokok = tabelraportmanual.querySelector("tbody").rows;
    let koleksimapel = koleksiarraymapelaktif()
    let koleksimapeldengangama = koleksimapel.kodemapel;
    let koleksimapeljadi = koleksimapeldengangama.filter(s => !(s =="PAI" || s == "PKATO" || s== "PKRIS" || s == "PHIND" || s == "PBUDH"));
    koleksimapeljadi.splice(0,0,"AGAMA");
    let prefik = prefix_stringkeyinduk;
    let arrtabel = [], arrHead = ["no", "namasiswa"]
    for( i = 0 ; i < cekdatapokok.length ; i++){
        let arrbaris = [(i+1),jsondatasiswa[i].pd_nama];
        for(j = 0 ; j < koleksimapeljadi.length; j++){
            let elemenmapel = cekdatapokok[i].querySelector(`[data-keyraportindukmanual="${prefik}${koleksimapeljadi[j]}_P_NILAI"]`);
            let elemenmapelD = cekdatapokok[i].querySelector(`[data-keyraportindukmanual="${prefik}${koleksimapeljadi[j]}_P_DESKRIPSI"]`);
            if(i == 0 ){
                arrHead.push(koleksimapeljadi[j])
            }
            arrbaris.push(elemenmapel.value)
        }
        if(i == 0 ){
            arrHead.push("Jumlah")
            arrHead.push("Rangking")
        }
        let jumlah = cekdatapokok[i].querySelector(`.jumlahnilaik3siswake_${i}`);
        let rangking = cekdatapokok[i].querySelector(`.jumlahreratak3siswake_${i}`);
        arrbaris.push(jumlah.value)
        arrbaris.push(rangking.value)
        // for(j = 0 ; j < koleksimapeljadi.length; j++){
        //     let elemenmapelD = cekdatapokok[i].querySelector(`[data-keyraportindukmanual="${prefik}${koleksimapeljadi[j]}_P_DESKRIPSI"]`);
        //     if(i == 0 ){
        //         arrHead.push(`${prefik}_${koleksimapeljadi[j]}_P_DESKRIPSI`)
        //     }
        //     arrbaris.push(elemenmapelD.innerText)
        // }


        arrtabel.push(arrbaris)
    }
    // let tab = "rekapnilairaport_"+idNamaKelas +"_"+kondisi;
    let tabraportglobal = "newRekapRaport_" + idNamaKelas +"_k3";
    let oKeys = JSON.stringify(arrHead);
    let oValuess = JSON.stringify(arrtabel);
    let kirimdatasementara = new FormData();
    kirimdatasementara.append("head", oKeys)
    kirimdatasementara.append("tabel", oValuess)
    kirimdatasementara.append("kelas", idNamaKelas);
    kirimdatasementara.append("prefiktab", tabraportglobal);
    fetch(constlinknilai + "?action=inserttabeltospreadsheet", {
        method: 'post',
        body: kirimdatasementara
    }).then(m => m.json())
        .then(k => {
            console.log(k);
            alert(k.result);
            el.innerHTML = `Simpan Server K3`;
        })
        .catch(er => {
            console.log(er);
            alert(er)
        });
    
    simpaninduksementarabayangan()
}
const manual_simpanserverK4 = (el) =>{
    el.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Simpan Server K4`
    let cekdatapokok = tabelraportmanual.querySelector("tbody").rows;
    let koleksimapel = koleksiarraymapelaktif()
    let koleksimapeldengangama = koleksimapel.kodemapel;
    let koleksimapeljadi = koleksimapeldengangama.filter(s => !(s =="PAI" || s == "PKATO" || s== "PKRIS" || s == "PHIND" || s == "PBUDH"));
    koleksimapeljadi.splice(0,0,"AGAMA");
    let prefik = prefix_stringkeyinduk;
    let arrtabel = [], arrHead = ["no", "namasiswa"]
    for( i = 0 ; i < cekdatapokok.length ; i++){
        let arrbaris = [(i+1),jsondatasiswa[i].pd_nama];
        for(j = 0 ; j < koleksimapeljadi.length; j++){
            let elemenmapel = cekdatapokok[i].querySelector(`[data-keyraportindukmanual="${prefik}${koleksimapeljadi[j]}_K_NILAI"]`);
            let elemenmapelD = cekdatapokok[i].querySelector(`[data-keyraportindukmanual="${prefik}${koleksimapeljadi[j]}_K_DESKRIPSI"]`);
            if(i == 0 ){
                arrHead.push(koleksimapeljadi[j])
            }
            arrbaris.push(elemenmapel.value)
        }
        if(i == 0 ){
            arrHead.push("Jumlah")
            arrHead.push("Rangking")
        }
        let jumlah = cekdatapokok[i].querySelector(`.jumlahnilaik4siswake_${i}`);
        let rangking = cekdatapokok[i].querySelector(`.jumlahreratak4siswake_${i}`);
        arrbaris.push(jumlah.value)
        arrbaris.push(rangking.value)
        // for(j = 0 ; j < koleksimapeljadi.length; j++){
        //     let elemenmapelD = cekdatapokok[i].querySelector(`[data-keyraportindukmanual="${prefik}${koleksimapeljadi[j]}_K_DESKRIPSI"]`);
        //     if(i == 0 ){
        //         arrHead.push(`${prefik}_${koleksimapeljadi[j]}_K_DESKRIPSI`)
        //     }
        //     arrbaris.push(elemenmapelD.innerText)
        // }


        arrtabel.push(arrbaris)
    }
    // let tab = "rekapnilairaport_"+idNamaKelas +"_"+kondisi;
    let tabraportglobal = "newRekapRaport_" + idNamaKelas +"_k4";
    let oKeys = JSON.stringify(arrHead);
    let oValuess = JSON.stringify(arrtabel);
    let kirimdatasementara = new FormData();
    kirimdatasementara.append("head", oKeys)
    kirimdatasementara.append("tabel", oValuess)
    kirimdatasementara.append("kelas", idNamaKelas);
    kirimdatasementara.append("prefiktab", tabraportglobal);
    fetch(constlinknilai + "?action=inserttabeltospreadsheet", {
        method: 'post',
        body: kirimdatasementara
    }).then(m => m.json())
        .then(k => {
            console.log(k);
            alert(k.result);
            el.innerHTML = `Simpan Server K4`;
        })
        .catch(er => {
            console.log(er);
            alert(er)
        });
        simpaninduksementarabayangan()
}

const simpaninduksementarabayangan = (el =null)=>{
    let stringutama
    if(el!=null){
        stringutama = el.innerHTML
        el.innerHTML = `<i class="fa fa-spin fa-spinner"></i> ${stringutama}`
    }
    let arrayisianraportdapodik = [];
    let cekdatapokok = tabelraportmanual.querySelector("tbody").rows;
    for( i = 0 ; i < cekdatapokok.length ; i++){
        let elRowInput = cekdatapokok[i].querySelectorAll("[data-keyraportindukmanual]");
        let obj = {};
        obj.no = (i+1);
        obj.tokensiswa = jsondatasiswa[i].id;
        obj.namasiswa = jsondatasiswa[i].pd_nama;

        for(j = 0 ; j < elRowInput.length ; j++){
            let elemen = elRowInput[j];
            let key = elemen.getAttribute("data-keyraportindukmanual")
            let val
            if(elemen.nodeName == "TD"){
                val = elemen.innerText
            }else{
                val = elemen.value;
            }
            obj[key] = val;
        }
        arrayisianraportdapodik.push(obj);
    }
    
    
    let oKeys = JSON.stringify(Object.keys(arrayisianraportdapodik[0]));
    let oValuess = JSON.stringify(arrayisianraportdapodik.map(s=> Object.values(s)));
    let kirimdatasementara = new FormData();
    kirimdatasementara.append("head", oKeys)
    kirimdatasementara.append("tabel", oValuess)
    kirimdatasementara.append("kelas", idNamaKelas);
    kirimdatasementara.append("prefiktab", "Induksemetara");
    fetch(constlinknilai + "?action=inserttabeltospreadsheet", {
        method: 'post',
        body: kirimdatasementara
    }).then(m => m.json())
        .then(k => {
            console.log("result simpan server dbinduksementara");
            console.log(k)
            alert(k.result);
            if(el!=null){
                // stringutama = el.innerHTML
                el.innerHTML = stringutama ;//`<i class="fa fa-spin fa-spinner"></i> ${stringutama}`
            }
            let tabelbody = tabelraportmanual.querySelector("tbody");
                let resdatas = k.data;
                for(i = 0 ; i < tabelbody.rows.length ; i++){
                    let dataT = resdatas[i]
                    let elemen = tabelbody.rows[i].querySelectorAll("[data-keyraportindukmanual]");
                    for(j = 0 ; j < elemen.length; j++){
                        let key = elemen[j].getAttribute("data-keyraportindukmanual");
                        if(elemen[j].nodeName == "TD"){
                            elemen[j].innerHTML = dataT[key]
                        }else{
                            let inputan = elemen[j]
                            let val = dataT[key]
                            if(inputan.type == "date"){
                                inputan.value = val ==""?"":StringTanggalnol(new Date(val));
                            }else if(inputan.type =="select-one"){
                                inputan.value = val;
                            }else{
                                inputan.value = val;
                            }
                            
                        }
                    }
                }
        })
        .catch(er => console.log(er))
        
        
        // for (let i = 0; i < key.length; i++) {
        //     pus.push(jsonlamaanakini[key[i]]);
        //     databelumkirim.append(key[i], jsonlamaanakini[key[i]]);
        // }

        let miripjsondatasiswa = []
        for( i = 0 ; i < cekdatapokok.length ; i++){
            let obj = {}
            let elRowInput = cekdatapokok[i].querySelectorAll("[data-updatedbutama]");
            for(k = 0 ; k < elRowInput.length; k++){
                let key = elRowInput[k].getAttribute("data-updatedbutama")
                obj[key] = elRowInput[k].value;
            }
            //resultarray_datapokok.push(obj);
            let jsonsisi_siswa = Object.assign({},jsondatasiswa[i])
            let newJsonBaru = Object.assign(jsonsisi_siswa,obj);
            miripjsondatasiswa.push(newJsonBaru);
            
        }    
        jsondatasiswa = []
        jsondatasiswa = miripjsondatasiswa;
        // let jk = 0;
        // for(jk = 0 ; jk < jsondatasiswa.length ; jk++){
        //     let idsiswa = miripjsondatasiswa[jk].id
        //     let key = Object.keys(miripjsondatasiswa[jk]).filter(s => s !== "time_stamp")
        //     let databelumkirim = new FormData();
        //     for (let i = 0; i < key.length; i++) {
        //         databelumkirim.append(key[i], miripjsondatasiswa[jk][key[i]]);
        //         }
        //         let aaa = linkDataUserWithIdss + "&action=editsiswa";
        //         fetch(aaa, {
        //             method: "post",
        //             body: databelumkirim
        //         }).then(m => m.json())
        //             .then(f => {
        //                 console.log("cek untuk id siswa ", idsiswa)
        //                 
        //             })
        //             .catch(er => console.log(er))
        //     j++
        // }
        // while(jk < jsondatasiswa.length)
        // while(jk < 3)
        

}

//SKL VERSI BARU

const selectnamaskhu2 = () => {
    let a = document.getElementById("idselectnamaskhu2");
    let b = a.selectedIndex;
    let c = a.options;
    let v = c[b].value;
    let t = c[b].text;

    // let tabelrekap = document.querySelector(".tabelnilaiijazahfix").getElementsByTagName("tbody")[0];
    // let nrr = tabelrekap.rows[v].cells[11].innerHTML;
    let dd = document.querySelector(".htmlskhu2");
    // let tt = document.querySelector(".div_skhu2");
    // dd.className = dd.className.replace("w3-hide", "w3-show");
    // tt.className = tt.className.replace("w3-show", "w3-hide");
    // let ttl = tanggalfull(jsondatasiswa[v].pd_tanggallahir);

    // let divhtml = `
    // <div class="w3-container">
    //     <div class="w3-left w3-padding">
    //         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Lambang_Kota_Depok.png/371px-Lambang_Kota_Depok.png" style="width:100px"/>
    //     </div>
    //     <div class="w3-center w3-bottombar  w3-border-black">
    //         <h4>PEMERINTAH DAERAH ${jlo.idkota.toUpperCase()} ${jlo.kota.toUpperCase()}<br/>
    //         DINAS PENDIDIKAN ${jlo.idkota.toUpperCase()} ${jlo.kota.toUpperCase()} 
    //         <br/><b  class="w3-xxlarge">${idNamaSekolah.toUpperCase()}</b></br/>
    //         <sub>Alamat : ${editalamatkopsurat.innerHTML}</sub></h4>
    //     </div>
    // </div>`;
    let divhtml = `<div style="background-color:white;margin:5px auto;max-width:1000px;overflow-x:auto">
    <table style="border-collapse:collapse;width:85%;margin:15px auto">`;
    divhtml +=`<tr style="border-bottom:5px double black"><td style="padding:2px 5px;text-align:center">
    <img src="/img/kotadepok.png" style="width:100px" ></td><td style="padding:2px 5px;text-align:center;vertical-align:top">`;
    divhtml +=`<h5><b style="font-size:20px">PEMERINTAH DAERAH ${jlo.idkota.toUpperCase()} ${jlo.kota.toUpperCase()}<br/>
    DINAS PENDIDIKAN<br/></b><b style="font-size:28px;" >${idNamaSekolah.toUpperCase()}</b></br/><sub style="font-size:12px!important">Alamat : ${editalamatkopsurat.innerHTML}</sub></h5>`
    divhtml +=`</td></tr>`;
    
    divhtml +=`</table>`
    divhtml +=`<br><div style="text-align:center"><b style="text-align:center;border-bottom:.5pt solid black;margin:0 auto">SURAT KETERANGAN KELULUSAN</b>`;
    divhtml +=`<br><span style="text-align:center;margin:0 auto">Nomor Surat: 42.1/.../SD_RAJA1/KELULUSAN/VI/2022</span><br><br></div>`;
    divhtml +=`<div style="padding:2px 15px;text-align:justify">`;
    divhtml +=`Yang bertanda tangan di bawah ini Kepala ${idNamaSekolah} menerangkan bahwa:`
    divhtml +=`</div>`;
    divhtml +=`<div style="padding:2px 15px;margin-left:30px">`;
        divhtml +=`<table style="border-collapse:collapse">`;

        divhtml +=`<tr><td style="padding:2px 5px;vertical-align:top;width:300px">Nama</td><td style="width:1px;vertical-align:top">:</td><td style="padding:2px 5px;border-bottom:.5pt dotted black;vertical-align:top;width:50%">`;
        divhtml += jsondatasiswa[parseInt(v)].pd_nama;
        divhtml +=`</td></tr>`;
        
        divhtml +=`<tr><td style="padding:2px 5px;vertical-align:top">Tempat, Tanggal Lahir</td><td style="width:1px;vertical-align:top">:</td><td style="padding:2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        divhtml += jsondatasiswa[parseInt(v)].pd_tl +", " + tanggalfull(jsondatasiswa[parseInt(v)].pd_tanggallahir);
        divhtml +=`</td></tr>`;

        divhtml +=`<tr><td style="padding:2px 5px;vertical-align:top">Nama Orang Tua/Wali</td><td style="width:1px;vertical-align:top">:</td><td style="padding:2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        divhtml += jsondatasiswa[parseInt(v)].pd_namaayah +" / "+ jsondatasiswa[parseInt(v)].pd_namaibu
        divhtml +=`</td></tr>`;
        

        divhtml +=`<tr><td style="padding:2px 5px;vertical-align:top">Nomor Induk Sekolah</td><td style="width:1px;vertical-align:top">:</td><td style="padding:2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        divhtml += jsondatasiswa[parseInt(v)].nis;
        divhtml +=`</td></tr>`;
        

        divhtml +=`<tr><td style="padding:2px 5px;vertical-align:top">N I S N</td><td style="width:1px;vertical-align:top">:</td><td style="padding:2px 5px;border-bottom:.5pt dotted black;vertical-align:top;">`;
        divhtml += jsondatasiswa[parseInt(v)].nisn;
        divhtml +=`</td></tr>`;
        
        divhtml +=`</table>`
    divhtml +=`</div><br>`;
    divhtml +=`<div style="padding:2px 15px;text-align:justify">`;
    divhtml +=`Berdasarkan:
    <ol>
        <li>Surat Edaran Menteri Pendidikan dan Kebudayaan Republik Indonesia Nomor 1 Tahun 2021, tentang Peniadaan Ujian Nasional dan Ujian Kesetaraan serta Pelaksanaan Ujisan Sekolah di Masa Darurat Penyebaran Corona Virus Deseases (Covid-19)
        </li>
        <li>Peraturan Sekretaris Jenderal Kementerian PEndidikan, Kebudayaan, Riset, dan Teknologi Nomor 3 Tahun 2022, tentang Perubahan atas Peraturan Sekretaris Jenderal Kementerian Pendidikan dan Kebudayaan, Riset, dan Teknologi Nomor 1 Tahun 2022 tentang Spesifikasi Teknis, Bentuk dan Tata Cara Pengisian, Penggantian, dan Pemusnahan Blangko Ijazah Pendidikan Dasar dan Pendidikan Menengah Tahun Pelajaran 2021/2022.
        </li>
        <li>Hasil Rapat Dewan Guru ${idNamaSekolah} pada <b>Hari Selasa Tanggal 14 Juni 2022</b>, tentang Penetapan Kelulusan,
        </li>
    </ol>
    Dengan ini nama tersebut di atas dinyatakan:
    `;
    divhtml +=`</div><br>`;
    
    divhtml +=`<div style="padding:2px 15px;text-align:center;font-weight:900;font-size:28px">`;
    divhtml +=`---LULUS /<s>TIDAK LULUS</s>---`
    divhtml +=`</div><br>`;
    divhtml +=`<div style="padding:2px 15px;">`;
    divhtml += `Demikian Surat Keterangan ini dibuat, agar dapat digunakan sebagaimana mestinya.`
    divhtml +=`</div><br><br>`;
    
    divhtml +=`<div style="padding:2px 5px;margin-left:40%;width:50%;text-align:center">`;
    divhtml +=`Depok, 15 Juni 2022<br>`;
    divhtml +=`Kepala ${idNamaSekolah}<br><br><br><br>`;
    divhtml +=`<u><b>${idNamaKepsek}</b></u><br>`;
    divhtml +=`NIP. ${idNipKepsek}`;
    divhtml +=`</div>`;
    
    divhtml +=`</div>`;
    // divhtml +=`</td></tr>`
    // divhtml+=`</table>`
    // divhtml+=`
    // <div class="w3-main w3-padding">
    //     <h4 class="w3-center">SURAT KETERANGAN HASIL BELAJAR</h4>
    //     <h6 class="w3-center" contenteditable="">No : 42.2/... ... .../SD/VI/2021</h6>
    //     <br/>
    //     <br/>
    //     <p class="w3-justify">
    //     Yang bertanda tangan di bawah ini, Kepala ${idNamaSekolah}, ${jlo.idkota} ${jlo.kota} menerangkan bahwa:
    //     </p>
    //    <table style="margin-left:20px">
    //         <tr>
    //             <td style="vertical-align:top">Nama</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].pd_nama}</td>
    //         </tr>
    //         <tr>
    //         <td style="vertical-align:top">Tempat, Tanggal Lahir</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].pd_tl}, ${ttl}</td>
    //         </tr>
    //         <tr>
    //         <td style="vertical-align:top">Nomor Induk Siswa (NIS)</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].nis}</td>
    //         </tr>
    //         <tr>
    //         <td style="vertical-align:top">Nomor Induk Siswa Nasional (NISN)</td><td style="vertical-align:top">:</td><td>${jsondatasiswa[v].nisn}</td>
    //         </tr>
    //    </table>
    //    <p class="w3-justify">
    //    Adalah benar bahwa siswa tersebut adalah siswa ${idNamaSekolah} telah mengikuti seluruh rangkaian kegiatan pendidikan sampai dengan Tahun Pelajaran ${idTeksTapel} di sekolah kami dan telah dinyatakan:
    //     </p>
    //     <div class="w3-center">
    //     <span class="w3-border w3-border-black w3-padding" >LULUS / <s>TIDAK LULUS</s> </span>
    //     </div><br/>
    //     <div class="w3-clear"></div>
    //     dengan rincian hasil belajar:
    //     <div style="overflow-x:auto">
    //     <table class="versi-table">
    //     <thead>
    //         <tr>
    //             <th>No</th>
    //             <th>Muatan Pelajaran <br/> (Kurikulum 2013)</th>
    //             <th>Rata-rata Raport</th>
    //             <th>Rata-rata US</th>
    //             <th>Nilai Ijazah <br/>(pembulatan)</th>
    //         </tr>
    //     </thead>
    //     <tbody>`
    // let mp, nr, nus, na, nb, ns = 0, nrrs = 0, namasubjek;

    // for (j = 0; j < arrmapelus.length; j++) {
    //     mp = arrmapelus[j];
    //     nr = (ob_rekapraport[v][mp] * 0.7).toFixed(2);
    //     nus = (ob_rekapus[v][mp] * 0.3).toFixed(2);
    //     na = (parseFloat(nr) + parseFloat(nus)).toFixed(2);
    //     nb = Math.round(parseFloat(nr) + parseFloat(nus));
    //     if (mp == "AGAMA") {
    //         namasubjek = "Pendidikan Agama dan Budi Pekerti";
    //     } else {
    //         namasubjek = document.getElementById("namamapelraport_" + mp).innerHTML;

    //     }

    //     divhtml += `<tr><td>${j + 1}</td>
    //                         <td>${namasubjek}</td>`;
    //     // divhtml += `<td>${nr}</td>`;
    //     // divhtml += `<td>${nus}</td>`;
    //     divhtml += `<td>${ob_rekapraport[v][mp]}</td>`;
    //     divhtml += `<td>${ob_rekapus[v][mp]}</td>`;
    //     divhtml += `<td>${nb}</td></tr>`;
    //     ns += nb
    // }
    // nrrs = (ns / 9).toFixed(2);

    // divhtml += `<tr><td colspan="4" class="w3-center">Jumlah</td><td>${ns}</td></tr>
    //     <tr><td colspan="4" class="w3-center">Rata-rata</td><td>${nrrs}</td></tr>
        
    //     </tbody>
    //     </table></div><br/>
    //     <sub>Ket: Nilai ijazah didapat dengan formulasi <span class="w3-border w3-border-black w3-padding">(Nilai Raport x 70 % ) + (Nilai US x 30 % ) </span>.
    //     </sub><br/><br/>
    //     <p class="w3-justify">
    //     Demikian Surat Keterangan ini dibuat, untuk dapat dipergunakan sebagaimana mestinya.
    //     </p>
    //     <div style="float:right;position:relative;text-align:left">
    //     <table>
    //         <tr><td>Ditetapkan di </td><td>:</td><td>${jlo.kota}</td></tr>
    //         <tr><td>Pada Tanggal </td><td>:</td><td>15 Juni 2021</td></tr>
    //         <tr><td colspan="3">Kepala ${idNamaSekolah}</td></tr>
    //         <tr><td colspan="3" id="barcodepengumumanskhu"></td></tr>
    //         <tr><td colspan="3"><u><b>${idNamaKepsek}</b></u></td></tr>
    //         <tr><td colspan="3">NIP. ${idNipKepsek}</td></tr>
    //     </table>
    //     </div>
    //     <div class="w3-clear"></div>





    // </div> 
    
    // `

    dd.innerHTML = divhtml;
    // let cek = document.querySelector("#cekbarcodeskhu");
    // if (cek.checked) {

    //     let teksbarkode = `Telah diketahui dan ditandatangani oleh Kepala ${idNamaSekolah} bahwa Surat Keterangan Hasil Belajar  atas nama ${t} dengan nilai ijazah ${nrr}`;

    //     barcodekan('barcodepengumumanskhu', teksbarkode);

    // } else {
    //     document.getElementById("barcodepengumumanskhu").innerHTML = "<br/><br/><br/>";

    // }
    // alert(v + "   " + t)


}
const changebarcodeskhu2 = () => {
    let dd = document.getElementById("ttdbarcodeskhu2")
    let ini = document.getElementById("cekbarcodeskhu2");
    if (ini.checked) {
        dd.innerHTML = "Tanda Tangan Barcode (Aktif)"
    } else {
        dd.innerHTML = "Tanda Tangan Barcode (Tidak Aktif)/Tidak menyertakan barcode tanda tangan"
    }

}
const fnmenucetakraportbaru = ()=>{
    //
    let arrayisianraportdapodik = [];
    let cekdatapokok = tabelraportmanual.querySelector("tbody").rows;
    for( i = 0 ; i < cekdatapokok.length ; i++){
        let elRowInput = cekdatapokok[i].querySelectorAll("[data-keyraportindukmanual]");
        let obj = {};
        obj.no = (i+1);
        obj.tokensiswa = jsondatasiswa[i].id;
        obj.namasiswa = jsondatasiswa[i].pd_nama;

        for(j = 0 ; j < elRowInput.length ; j++){
            let elemen = elRowInput[j];
            let key = elemen.getAttribute("data-keyraportindukmanual")
            let val
            if(elemen.nodeName == "TD"){
                val = elemen.innerText
            }else{
                val = elemen.value;
            }
            obj[key] = val;
        }
        arrayisianraportdapodik.push(obj);
    }
    
    let koleksimapel = koleksiarraymapelaktif()
    let koleksimapeldengangama = koleksimapel.kodemapel;
    let koleksimapeljadi = koleksimapeldengangama.filter(s => !(s =="PAI" || s == "PKATO" || s== "PKRIS" || s == "PHIND" || s == "PBUDH" || s=="BSUND"));
    koleksimapeljadi.splice(0,0,"AGAMA");

    let modalraport = document.getElementById("modalraportversibaru");
    modalraport.style.display = "block";
    let tbody = document.getElementById("printraporttabel").querySelector("tbody");
    tbody.innerHTML = "";
    let domselect = document.querySelector(".selectnama_raport");
    let htmlselect = `<option value="">Pilih Nama Siswa</option>`
    domselect.innerHTML = "";
    for(i = 0 ; i < jsondatasiswa.length; i++){
        htmlselect +=`<option value="${i}">${jsondatasiswa[i].pd_nama}</option>`;
    }
    domselect.innerHTML = htmlselect;
    let htmlraport = `<tr><td colspan="11" style="text-align:center"><b>RAPOR DAN PROFIL PESERTA DIDIK</b></td></tr>`;
    htmlraport +=`<tr><td colspan="11"><br></td></tr>`;
    htmlraport += `<tr>
    <td colspan="2" style="padding:2px 5px;vertical-align:top">Nama</td>
    <td colspan="6" style="padding:2px 5px;vertical-align:top">: <span  data-isiraportidentitas="pd_nama"></span></td>
    <td colspan="2" style="padding:2px 5px;vertical-align:top">Kelas</td>
    <td style="padding:2px 5px;vertical-align:top">:  <span data-isiraportidentitas="nama_rombel"></span> </td></tr>`;
    htmlraport += `<tr>
    <td colspan="2" style="padding:2px 5px;vertical-align:top">No. Induk / NISN</td>
    <td colspan="6" style="padding:2px 5px;vertical-align:top">: <span data-isiraportidentitas="nis"></span>/<span data-isiraportidentitas="nisn"></span></td>
    <td colspan="2" style="padding:2px 5px;vertical-align:top">Semester</td><td>: ${idSemester}</td>
    </tr>`;
    htmlraport += `<tr>
    <td colspan="2" style="padding:2px 5px;vertical-align:top">Nama Sekolah</td>
    <td colspan="6" style="padding:2px 5px;vertical-align:top">: ${idNamaSekolah}</td>
    <td colspan="2" style="padding:2px 5px;vertical-align:top">Tahun Pelajaran</td><td>: ${idTeksTapel}</td>
    </tr>`;
    htmlraport += `<tr>
    <td colspan="2" style="padding:2px 5px;vertical-align:top">Alamat</td>
    <td colspan="9" style="padding:2px 5px;vertical-align:top">: ${teksalamat}</td>
    </tr>`;
    htmlraport +=`<tr><td colspan="11"><br></td></tr>`;
    htmlraport +=`<tr><td colspan="11"><b>A. SIKAP</b></td></tr>`;
    htmlraport +=`<tr><td>1.</td><td colspan="10"><b>Sikap Spiritual</b></td></tr>`;
    htmlraport +=`<tr><td style="border:.5pt solid black;padding:2px 5px;text-align:center;background-color:#f1f1f1" colspan="2">Predikat</td>
    <td style="border:.5pt solid black;padding:2px 5px;text-align:center;background-color:#f1f1f1" colspan="9">Deskripsi</td></tr>`;
    htmlraport +=`<tr><td data-isianraportnilai="${prefix_stringkeyinduk}KI1_NILAI" style="border:.5pt solid black;padding:2px 5px;text-align:center;vertical-align:middle" colspan="2">`
    htmlraport +=`</td><td colspan="9" data-isianraportnilai="${prefix_stringkeyinduk}KI1_DESKRIPSI" style="border:.5pt solid black;padding:2px 5px;text-align:center;vertical-align:middle">`;
    htmlraport +=`</td></tr>`;
    htmlraport +=`<tr><td>2.</td><td colspan="10"><b>Sikap Sosial</b></td></tr>`;
    htmlraport +=`<tr><td style="border:.5pt solid black;padding:2px 5px;text-align:center;background-color:#f1f1f1" colspan="2">Predikat</td>
    <td style="border:.5pt solid black;padding:2px 5px;text-align:center;background-color:#f1f1f1" colspan="9">Deskripsi</td></tr>`;
    htmlraport +=`<tr><td data-isianraportnilai="${prefix_stringkeyinduk}KI2_NILAI" style="border:.5pt solid black;padding:2px 5px;text-align:center;vertical-align:middle" colspan="2">`
    htmlraport +=`</td><td colspan="9" data-isianraportnilai="${prefix_stringkeyinduk}KI2_DESKRIPSI" style="border:.5pt solid black;padding:2px 5px;text-align:center;vertical-align:middle">`;
    htmlraport +=`</td></tr>`;
    htmlraport +=`<tr><td colspan="11"><br></td></tr>`;
    htmlraport +=`<tr><td colspan="11"><b>B. PENGETAHUAN DAN KETERAMPILAN</b></td></tr>`;
    htmlraport +=`<tr>
        <td rowspan="2" style="border:.5pt solid black;background-color:#f1f1f1;text-align:center;vertical-align:middle"><b>No</b></td>
        <td rowspan="2" style="border:.5pt solid black;background-color:#f1f1f1;text-align:center;vertical-align:middle"><b>Muatan Pelajaran</b></td>
        <td rowspan="2" style="border:.5pt solid black;background-color:#f1f1f1;text-align:center;vertical-align:middle"><b>KKM</b></td>
        <td colspan="4" style="border:.5pt solid black;background-color:#f1f1f1;text-align:center;vertical-align:middle">Pengetahuan</td>
        <td colspan="4" style="border:.5pt solid black;background-color:#f1f1f1;text-align:center;vertical-align:middle">Keterampilan</td>
    </tr>`;
    htmlraport +=`<tr>
        <td style="border:.5pt solid black;background-color:#f1f1f1;text-align:center;vertical-align:middle">Nilai</td>
        <td style="border:.5pt solid black;background-color:#f1f1f1;text-align:center;vertical-align:middle">Predikat</td>
        <td colspan="2" style="border:.5pt solid black;background-color:#f1f1f1;text-align:center;vertical-align:middle">Deskripsi</td>
        
        <td style="border:.5pt solid black;background-color:#f1f1f1;text-align:center;vertical-align:middle">Nilai</td>
        <td style="border:.5pt solid black;background-color:#f1f1f1;text-align:center;vertical-align:middle">Predikat</td>
        <td colspan="2" style="border:.5pt solid black;background-color:#f1f1f1;text-align:center;vertical-align:middle">Deskripsi</td>
    </tr>`;
    htmlraport +=`<tr><td style="border:.5pt solid black;background-color:#f1f1f1;text-align:left;padding:2px 5px">A.</td><td style="border:.5pt solid black;background-color:#f1f1f1;text-align:left" colspan="10">MUATAN NASIONAL</td></tr>`;
    //agama
    htmlraport +=`<tr><td rowspan="2" style="border:.5pt solid black;text-align:center;vertical-align:top">1.</td>`;
    htmlraport +=`<td colspan="10" style="border:.5pt solid black;vertical-align:middle">Pendidikan Agama dan Budi Pekerti</td></tr>`;
    for(kk = 0 ; kk < koleksimapeljadi.length ; kk++){
        let mp = koleksimapeljadi[kk]
        if(koleksimapeljadi[kk]=="AGAMA"){

            htmlraport +=`<tr><td style="border:.5pt solid black;text-align:center;vertical-align:middle;padding:2px 5px">Pendidikan Agama <span data-isiraportidentitas="pd_agama"></span> dan Budi Pekerti</td>`;
            htmlraport +=`<td style="border:.5pt solid black;text-align:center;vertical-align:middle">`;
        htmlraport +=buateditorkdaktif.filter(s => s.mapel == "PAI")[0].kkm;
        htmlraport +=`</td>`;
                htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}AGAMA_P_NILAI" style="border:.5pt solid black;text-align:center;vertical-align:middle"></td>`;
                htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}AGAMA_P_PREDIKAT" style="border:.5pt solid black;text-align:center;vertical-align:middle"></td>`;
        htmlraport +=`<td colspan="2" data-isianraportnilai="${prefix_stringkeyinduk}AGAMA_P_DESKRIPSI" style="font-size:8px;border:.5pt solid black;text-align:center;vertical-align:middle"></td>`;
        htmlraport +=`</td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}AGAMA_K_NILAI" style="border:.5pt solid black;text-align:center;vertical-align:middle"></td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}AGAMA_K_PREDIKAT" style="border:.5pt solid black;text-align:center;vertical-align:middle"></td>`;
        htmlraport +=`<td colspan="2" data-isianraportnilai="${prefix_stringkeyinduk}AGAMA_K_DESKRIPSI" style="font-size:8px;border:.5pt solid black;text-align:center;vertical-align:middle"></td>`;
        htmlraport +=`</tr>`
        //pkn
        }else{

            htmlraport +=`<tr><td style="border:.5pt solid black;text-align:center;vertical-align:middle;padding:2px 5px">${kk+1}</td>`;
            htmlraport +=`<td style="border:.5pt solid black;text-align:center;vertical-align:middle;padding:2px 5px">${Objekdefinisikodemapel[mp]}</td>`;
        htmlraport +=`<td style="border:.5pt solid black;text-align:center;vertical-align:middle;padding:2px 5px">`;
        htmlraport +=buateditorkdaktif.filter(s => s.mapel == mp )[0].kkm;
        htmlraport +=`</td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}${mp}_P_NILAI" style="border:.5pt solid black;text-align:center;vertical-align:middle;padding:2px 5px"></td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}${mp}_P_PREDIKAT" style="border:.5pt solid black;text-align:center;vertical-align:middle;padding:2px 5px"></td>`;
        htmlraport +=`<td colspan="2" data-isianraportnilai="${prefix_stringkeyinduk}${mp}_P_DESKRIPSI" style="font-size:8px;border:.5pt solid black;text-align:center;vertical-align:middle;padding:2px 5px"></td>`;
        htmlraport +=`</td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}${mp}_K_NILAI" style="border:.5pt solid black;text-align:center;vertical-align:middle;padding:2px 5px"></td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}${mp}_K_PREDIKAT" style="border:.5pt solid black;text-align:center;vertical-align:middle;padding:2px 5px"></td>`;
        htmlraport +=`<td colspan="2" data-isianraportnilai="${prefix_stringkeyinduk}${mp}_K_DESKRIPSI" style="font-size:8px;border:.5pt solid black;text-align:center;vertical-align:middle;padding:2px 5px"></td>`;
        htmlraport +=`</tr>`
        }
    }
    htmlraport +=`<tr><td style="border:.5pt solid black;background-color:#f1f1f1;text-align:left;padding:2px 5px">B.</td><td style="border:.5pt solid black;background-color:#f1f1f1;text-align:left" colspan="10">MUATAN LOKAL PILIHAN</td></tr>`;
    
    htmlraport +=`<tr><td style="border:.5pt solid black;text-align:center;vertical-align:top">${koleksimapeljadi.length+1}.</td>`;
    htmlraport +=`<td colspan="10" style="border:.5pt solid black;vertical-align:middle">Muatan Lokal Wajib</td></tr>`;
    
    htmlraport +=`<tr><td style="border:.5pt solid black;text-align:right;vertical-align:middle;padding:2px 5px">a.</td><td style="border:.5pt solid black;text-align:center;vertical-align:middle;padding:2px 5px">Bahasa dan Sastra Sunda</td>`;
            htmlraport +=`<td style="border:.5pt solid black;text-align:center;vertical-align:middle">`;
        htmlraport +=buateditorkdaktif.filter(s => s.mapel == "BSUND")[0].kkm;
        htmlraport +=`</td>`;
                htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}BSUND_P_NILAI" style="border:.5pt solid black;text-align:center;vertical-align:middle"></td>`;
                htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}BSUND_P_PREDIKAT" style="border:.5pt solid black;text-align:center;vertical-align:middle"></td>`;
        htmlraport +=`<td colspan="2" data-isianraportnilai="${prefix_stringkeyinduk}BSUND_P_DESKRIPSI" style="font-size:8px;border:.5pt solid black;text-align:center;vertical-align:middle"></td>`;
        htmlraport +=`</td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}BSUND_K_NILAI" style="border:.5pt solid black;text-align:center;vertical-align:middle"></td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}BSUND_K_PREDIKAT" style="border:.5pt solid black;text-align:center;vertical-align:middle"></td>`;
        htmlraport +=`<td colspan="2" data-isianraportnilai="${prefix_stringkeyinduk}BSUND_K_DESKRIPSI" style="font-size:8px;border:.5pt solid black;text-align:center;vertical-align:middle"></td>`;
        htmlraport +=`</tr>`
        
    htmlraport +=`<tr><td style="border:.5pt solid black;text-align:center;vertical-align:top">${koleksimapeljadi.length+2}.</td>`;
    htmlraport +=`<td colspan="10" style="border:.5pt solid black;vertical-align:middle">Muatan Lokal Pilihan</td></tr>`;
        
        htmlraport +=`<tr><td style="border:.5pt solid black;text-align:right;vertical-align:middle;padding:2px 5px">b.</td><td style="border:.5pt solid black;text-align:center;vertical-align:middle;padding:2px 5px">Muatan Lokal ...</td>`;
            htmlraport +=`<td style="border:.5pt solid black;text-align:center;vertical-align:middle">`;
        htmlraport +="<br>";//buateditorkdaktif.filter(s => s.mapel == "BSUND")[0].kkm;
        htmlraport +=`</td>`;
                htmlraport +=`<td style="border:.5pt solid black;text-align:center;vertical-align:middle"></td>`;
                htmlraport +=`<td style="border:.5pt solid black;text-align:center;vertical-align:middle"></td>`;
        htmlraport +=`<td colspan="2" style="font-size:8px;border:.5pt solid black;text-align:center;vertical-align:middle"></td>`;
        htmlraport +=`</td>`;
        htmlraport +=`<td style="border:.5pt solid black;text-align:center;vertical-align:middle"></td>`;
        htmlraport +=`<td style="border:.5pt solid black;text-align:center;vertical-align:middle"></td>`;
        htmlraport +=`<td colspan="2" style="font-size:8px;border:.5pt solid black;text-align:center;vertical-align:middle"></td>`;
        htmlraport +=`</tr>`
    
    htmlraport +=`<tr><td colspan="11"><br></td></tr>`;
    htmlraport +=`<tr><td colspan="11"><b>C. EKSTRAKURIKULER</b></td></tr>`;
    htmlraport +=`<tr><td style="border:.5pt solid black;text-align:center;vertical-align:middle;background-color:#f1f1f1">No.</td>`;
        htmlraport +=`<td colspan="4" style="border:.5pt solid black;text-align:center;vertical-align:middle;background-color:#f1f1f1">Kegiatan Ekstrakurikuler</td>`;
        htmlraport +=`<td style="border:.5pt solid black;text-align:center;vertical-align:middle;background-color:#f1f1f1">Nilai</td>`;
        htmlraport +=`<td colspan="5" style="border:.5pt solid black;text-align:center;vertical-align:middle;background-color:#f1f1f1">Keterangan</td>`;
        htmlraport +=`</tr>`
    
    htmlraport +=`<tr><td style="border:.5pt solid black;text-align:center;vertical-align:top;">1.</td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}NAMA_EKSKUL1" colspan="4" style="padding:2px 5px;border:.5pt solid black;vertical-align:middle;">Kegiatan Ekstrakurikuler</td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}NILAI_EKSKUL1" style="padding:2px 5px;border:.5pt solid black;vertical-align:middle;">Nilai</td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}KETERANGAN_EKSKUL1" colspan="5" style="padding:2px 5px;border:.5pt solid black;vertical-align:top">Keterangan</td>`;
        htmlraport +=`</tr>`
    htmlraport +=`<tr><td style="border:.5pt solid black;text-align:center;vertical-align:top;">2.</td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}NAMA_EKSKUL2" colspan="4" style="padding:2px 5px;border:.5pt solid black;vertical-align:middle;">Kegiatan Ekstrakurikuler</td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}NILAI_EKSKUL2" style="padding:2px 5px;border:.5pt solid black;vertical-align:middle;">Nilai</td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}KETERANGAN_EKSKUL2" colspan="5" style="padding:2px 5px;border:.5pt solid black;vertical-align:top">Keterangan</td>`;
        htmlraport +=`</tr>`
        
    htmlraport +=`<tr><td style="border:.5pt solid black;text-align:center;vertical-align:top;">3.</td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}NAMA_EKSKUL3" colspan="4" style="padding:2px 5px;border:.5pt solid black;vertical-align:middle;">Kegiatan Ekstrakurikuler</td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}NILAI_EKSKUL3" style="padding:2px 5px;border:.5pt solid black;vertical-align:middle;">Nilai</td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}KETERANGAN_EKSKUL3" colspan="5" style="padding:2px 5px;border:.5pt solid black;vertical-align:top">Keterangan</td>`;
        htmlraport +=`</tr>`
    htmlraport +=`<tr><td colspan="11"><br></td></tr>`;
        htmlraport +=`<tr><td colspan="11"><b>D. SARAN</b></td></tr>`;    
        htmlraport +=`<tr><td colspan="11" data-isianraportnilai="${prefix_stringkeyinduk}SARAN" style="padding:2px 5px;border:.5pt solid black;vertical-align:middle;text-align:center"></td></tr>`;    
    
    htmlraport +=`<tr><td colspan="11"><br></td></tr>`;
    htmlraport +=`<tr><td colspan="11"><b>E. TINGGI DAN BERAT BADAN</b></td></tr>`;    
    htmlraport +=`<tr style="background-color:#f1f1f1">`;
        htmlraport +=`<td rowspan="2" style="padding:2px 5px;border:.5pt solid black;vertical-align:middle;">No.</td>`
        htmlraport +=`<td rowspan="2" colspan="2" style="padding:2px 5px;border:.5pt solid black;vertical-align:middle;text-align:center">Aspek yang Dinilai</td>`
        htmlraport +=`<td colspan="8" style="padding:2px 5px;border:.5pt solid black;vertical-align:middle;text-align:center">Semester</td>`
        htmlraport +=`</tr>`
    htmlraport +=`<tr style="background-color:#f1f1f1">`;
        htmlraport +=`<td colspan="4" style="padding:2px 5px;border:.5pt solid black;text-align:center;">1</td>`
        htmlraport +=`<td colspan="4" style="padding:2px 5px;border:.5pt solid black;text-align:center;">2</td>`
        htmlraport +=`</tr>`;
    htmlraport +=`<tr>`;
    // data-keyraportindukmanual="${dbinduk_tapel_integer}_13_${idJenjang}_1_TINGGIBADAN"
        htmlraport +=`<td style="padding:2px 5px;border:.5pt solid black;text-align:center;">1.</td>`
        htmlraport +=`<td colspan="2"style="padding:2px 5px;border:.5pt solid black;vertical-align:top">Tinggi Badan</td>`
        htmlraport +=`<td data-isianraportnilai="${dbinduk_tapel_integer}_13_${idJenjang}_1_TINGGIBADAN" colspan="4"style="padding:2px 5px;border:.5pt solid black;text-align:center;vertical-align:top">Semester 1</td>`
        htmlraport +=`<td data-isianraportnilai="${dbinduk_tapel_integer}_13_${idJenjang}_2_TINGGIBADAN" colspan="4"style="padding:2px 5px;border:.5pt solid black;text-align:center;vertical-align:top">Semester 2</td>`
        htmlraport +=`</tr>`
    htmlraport +=`<tr>`;
    // data-keyraportindukmanual="${dbinduk_tapel_integer}_13_${idJenjang}_1_TINGGIBADAN"
        htmlraport +=`<td style="padding:2px 5px;border:.5pt solid black;text-align:center;">2.</td>`
        htmlraport +=`<td colspan="2"style="padding:2px 5px;border:.5pt solid black;vertical-align:top">Berat Badan</td>`
        htmlraport +=`<td data-isianraportnilai="${dbinduk_tapel_integer}_13_${idJenjang}_1_BERATBADAN" colspan="4"style="padding:2px 5px;border:.5pt solid black;text-align:center;vertical-align:top">Semester 1</td>`
        htmlraport +=`<td data-isianraportnilai="${dbinduk_tapel_integer}_13_${idJenjang}_2_BERATBADAN" colspan="4"style="padding:2px 5px;border:.5pt solid black;text-align:center;vertical-align:top">Semester 2</td>`
        htmlraport +=`</tr>`

    htmlraport +=`<tr><td colspan="11"><br></td></tr>`;
        htmlraport +=`<tr><td colspan="11"><b>F. KONDISI KESEHATAN</b></td></tr>`;
    htmlraport +=`<tr style="background-color:#f1f1f1">`;
        htmlraport +=`<td style="padding:2px 5px;border:.5pt solid black;vertical-align:middle;">No.</td>`
        htmlraport +=`<td colspan="3" style="padding:2px 5px;border:.5pt solid black;vertical-align:middle;text-align:center">Aspek yang Fisik</td>`
        htmlraport +=`<td colspan="7" style="padding:2px 5px;border:.5pt solid black;vertical-align:middle;">Keterangan</td>`
        htmlraport +=`</tr>`
    htmlraport +=`<tr>`;
        htmlraport +=`<td style="padding:2px 5px;border:.5pt solid black;vertical-align:top;">1.</td>`
        htmlraport +=`<td colspan="3" style="padding:2px 5px;border:.5pt solid black;vertical-align:top;">Pendengaran</td>`
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}PENDENGARAN" colspan="7" style="padding:2px 5px;border:.5pt solid black;vertical-align:top;">Keterangan</td>`
        htmlraport +=`</tr>`
    
    htmlraport +=`<tr>`;
        htmlraport +=`<td style="padding:2px 5px;border:.5pt solid black;vertical-align:top;">2.</td>`
        htmlraport +=`<td colspan="3" style="padding:2px 5px;border:.5pt solid black;vertical-align:top;">Penglihatan</td>`
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}PENGLIHATAN" colspan="7" style="padding:2px 5px;border:.5pt solid black;vertical-align:top;">Keterangan</td>`
        htmlraport +=`</tr>`
    
    htmlraport +=`<tr>`;
        htmlraport +=`<td style="padding:2px 5px;border:.5pt solid black;vertical-align:top;">3.</td>`
        htmlraport +=`<td colspan="3" style="padding:2px 5px;border:.5pt solid black;vertical-align:top;">Gigi</td>`
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}GIGI" colspan="7" style="padding:2px 5px;border:.5pt solid black;vertical-align:top;">Keterangan</td>`
        htmlraport +=`</tr>`
    
    htmlraport +=`<tr>`;
        htmlraport +=`<td style="padding:2px 5px;border:.5pt solid black;vertical-align:top;">4.</td>`
        htmlraport +=`<td colspan="3" style="padding:2px 5px;border:.5pt solid black;vertical-align:top;">Penyakit Lainnya</td>`
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}PENYAKIT" colspan="7" style="padding:2px 5px;border:.5pt solid black;vertical-align:top;">Keterangan</td>`
        htmlraport +=`</tr>`
    
    htmlraport +=`<tr><td colspan="11"><br></td></tr>`;
        htmlraport +=`<tr><td colspan="11"><b>G. PRESTASI</b></td></tr>`;
    htmlraport +=`<tr style="background-color:#f1f1f1">`;
        htmlraport +=`<td style="padding:2px 5px;border:.5pt solid black;vertical-align:middle;">No.</td>`;
        htmlraport +=`<td colspan="3" style="padding:2px 5px;border:.5pt solid black;vertical-align:middle;">Jenis Prestasi</td>`;
        htmlraport +=`<td colspan="7" style="padding:2px 5px;border:.5pt solid black;vertical-align:middle;">Keterangan</td>`;
        htmlraport +=`</tr>`;
    htmlraport +=`<tr>`;
        htmlraport +=`<td style="padding:2px 5px;border:.5pt solid black;vertical-align:top;">1.</td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}NAMA_PRESTASI1" colspan="3" style="padding:2px 5px;border:.5pt solid black;vertical-align:top;"></td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}KETERANGAN_PRESTASI1" colspan="7" style="padding:2px 5px;border:.5pt solid black;vertical-align:top;"></td>`;
        htmlraport +=`</tr>`;
    
    htmlraport +=`<tr>`;
        htmlraport +=`<td style="padding:2px 5px;border:.5pt solid black;vertical-align:top;">2.</td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}NAMA_PRESTASI2" colspan="3" style="padding:2px 5px;border:.5pt solid black;vertical-align:top;"></td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}KETERANGAN_PRESTASI2" colspan="7" style="padding:2px 5px;border:.5pt solid black;vertical-align:top;"></td>`;
        htmlraport +=`</tr>`;
    
    htmlraport +=`<tr>`;
        htmlraport +=`<td style="padding:2px 5px;border:.5pt solid black;vertical-align:top;">3.</td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}NAMA_PRESTASI3" colspan="3" style="padding:2px 5px;border:.5pt solid black;vertical-align:top;"></td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}KETERANGAN_PRESTASI3" colspan="7" style="padding:2px 5px;border:.5pt solid black;vertical-align:top;"></td>`;
        htmlraport +=`</tr>`;
    
    htmlraport +=`<tr><td colspan="11"><br></td></tr>`;
        htmlraport +=`<tr><td colspan="11"><b>H. KEHADIRAN</b></td></tr>`;
    htmlraport +=`<tr><td></td>`;
        htmlraport +=`<td style="border-left:.5pt solid black; border-top:.5pt solid black;padding:2px 5px;">Sakit</td>`;
        htmlraport +=`<td style="border-top:.5pt solid black;padding:2px 5px;text-align:center"></td>`;
        htmlraport +=`<td style="border-top:.5pt solid black;padding:2px 5px;text-align:right">:</td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}KEHADIRAN_SAKIT" style="border-top:.5pt solid black;padding:2px 5px;text-align:center"></td>`;
        htmlraport +=`<td style="border-top:.5pt solid black;border-right:.5pt solid black;padding:2px 5px;text-align:center"> hari</td>`;
        htmlraport +=`<td></td><td></td><td></td><td></td><td></td>`;
        htmlraport +=`</tr>`;
    htmlraport +=`<tr><td></td>`;
        htmlraport +=`<td style="border-left:.5pt solid black;padding:2px 5px;">Izin</td>`;
        htmlraport +=`<td style="padding:2px 5px;text-align:center"></td>`;
        htmlraport +=`<td style="padding:2px 5px;text-align:right">:</td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}KEHADIRAN_IZIN" style="padding:2px 5px;text-align:center"></td>`;
        htmlraport +=`<td style="border-right:.5pt solid black;padding:2px 5px;text-align:center"> hari</td>`;
        htmlraport +=`<td></td><td></td><td></td><td></td><td></td>`
        htmlraport +=`</tr>`
    htmlraport +=`<tr><td></td>`;
        htmlraport +=`<td colspan="2" style="border-bottom:.5pt solid black;border-left:.5pt solid black;padding:2px 5px;">Tanpa Keterangan</td>`;
        // htmlraport +=`<td style="border-bottom:.5pt solid black;padding:2px 5px;text-align:center"></td>`;
        htmlraport +=`<td style="border-bottom:.5pt solid black;padding:2px 5px;text-align:right">:</td>`;
        htmlraport +=`<td data-isianraportnilai="${prefix_stringkeyinduk}KEHADIRAN_ALPA" style="border-bottom:.5pt solid black;padding:2px 5px;text-align:center"></td>`;
        htmlraport +=`<td style="border-bottom:.5pt solid black;border-right:.5pt solid black;padding:2px 5px;text-align:center"> hari</td>`;
        htmlraport +=`<td></td><td></td><td></td><td></td><td></td>`
        htmlraport +=`</tr>`
    
    htmlraport +=`<tr><td colspan="11"><br></td></tr>`;
    if(idSemester == 1){
        //langsung tanda tangan raport
        htmlraport +=`<tr><td></td>`;
            htmlraport +=`<td colspan="5" style="text-align:center">Orang Tua/Wali<br><br><br><br><br>.................</td>`
            htmlraport +=`<td colspan="5" style="text-align:center">Depok, <span data-isianraportnilai="${prefix_stringkeyinduk}TITIMANGSA_RAPORT"></span><br>`;
                htmlraport +=`${idJenisGuru} ${idgurumapelmapel}<br><br><br><br>`
                htmlraport +=`<b><u>${namauser}</u></b><br>`
                htmlraport +=`NIP. ${idNipGuruKelas}`
                htmlraport +=`</td>`
            htmlraport +=`/<tr>`;
    }else{
        //tandatangan 
        htmlraport +=`<tr>`;
        htmlraport +=`<td colspan="11" style="border:.5pt solid black;padding:2px 5px;text-align:center">`;
        htmlraport +=`Dengan memperhatikan dan mempertimbangkan hasil nilai raport pada Tahun Pelajaran ini, maka Ananda `;
        htmlraport += `<b data-isiraportidentitas="pd_nama"></b> dengan ini dinyatakan <b data-isianraportnilai="${prefix_stringkeyinduk}KENAIKAN_KELAS"></b>`;
        if(idJenjang !=6){
            //NAIKTINGGAL_KELAS_DI
            htmlraport +=` <b data-isianraportnilai="${prefix_stringkeyinduk}NAIKTINGGAL_KELAS_DI"></b>`
        }else{
            htmlraport +=".";
        }
        htmlraport +=`</td>`
        htmlraport +=`</tr>`;
        
        htmlraport +=`<tr><td colspan="11"><br></td></tr>`;

        htmlraport +=`<tr>`;
        htmlraport +=`<td colspan="3" style="text-align:center">Orang Tua/Wali<br><br><br><br><br>.................</td>`
        htmlraport +=`<td colspan="4" style="text-align:center">Mengetahui, <br>Kepala ${idNamaSekolah}<br>`;
            htmlraport +=`<br><br><br><br>`
            htmlraport +=`<b><u>${idNamaKepsek}</u></b><br>`
            htmlraport +=`NIP. ${idNipKepsek}`
            htmlraport +=`</td>`;
        htmlraport +=`<td colspan="4" style="text-align:center">Depok, <span data-isianraportnilai="${prefix_stringkeyinduk}TITIMANGSA_RAPORT"></span><br>`;
            htmlraport +=`${idJenisGuru} ${idgurumapelmapel}<br><br><br><br><br>`
            htmlraport +=`<b><u>${namauser}</u></b><br>`
            htmlraport +=`NIP. ${idNipGuruKelas}`
            htmlraport +=`</td>`
        htmlraport +=`<tr>`;
    }

    
    
    tbody.innerHTML = htmlraport;
    domselect.onchange = function(e){
       //console.log(e.target.value);
        let v = e.target.value;
        if(v == ""){
            alert("Pilih Nama Siswa dengan benar")
            return
        }
        let identitassiswa = jsondatasiswa[v];
        let datadomidentitas = tbody.querySelectorAll("[data-isiraportidentitas]")
        datadomidentitas.forEach(el => {
            let atr = el.getAttribute("data-isiraportidentitas");
            el.innerHTML = identitassiswa[atr];
        });

        let datadomnilai = tbody.querySelectorAll("[data-isianraportnilai]");
        //arrayisianraportdapodik
        
        datadomnilai.forEach(el => {
            let atr = el.getAttribute("data-isianraportnilai");
            el.innerHTML = arrayisianraportdapodik[v][atr];
        });
    };
    
    domselect.focus()
    domselect.selectedIndex = 1;
    let kiriminduk_raport = document.querySelector(".kiriminduk_raport")
    let tombol_next = document.querySelector(".next_raport");
    tombol_next.onclick=function(){
        kiriminduk_raport.innerHTML = "Simpan ke Buku Induk";
        //console.log(domselect.value)
        if(domselect.value==(jsondatasiswa.length-1)){
            alert("Tidak ada siswa lagi")
            return
        }
        domselect.selectedIndex++;
                    let v = domselect.value;
                let identitassiswa = jsondatasiswa[v];
                let datadomidentitas = tbody.querySelectorAll("[data-isiraportidentitas]")
                datadomidentitas.forEach(el => {
                    let atr = el.getAttribute("data-isiraportidentitas");
                    el.innerHTML = identitassiswa[atr];
                });

                let datadomnilai = tbody.querySelectorAll("[data-isianraportnilai]");
                //arrayisianraportdapodik
                
                datadomnilai.forEach(el => {
                    let atr = el.getAttribute("data-isianraportnilai");
                    if(atr.indexOf("SARAN")>-1){
                        el.innerHTML = arrayisianraportdapodik[v][atr]==""?"<br><br><br>":arrayisianraportdapodik[v][atr];

                    }else if(atr.indexOf("TITIMANGSA")>-1){
                        el.innerHTML = tanggalfull(new Date(arrayisianraportdapodik[v][atr]));

                    }else{
                        el.innerHTML = arrayisianraportdapodik[v][atr];

                    }
                });
        }
    let tombol_sebelum = document.querySelector(".prev_raport");
        tombol_sebelum.onclick = function () {
            domselect.selectedIndex--;
            kiriminduk_raport.innerHTML = "Simpan ke Buku Induk";;
            if(domselect.value==""){
                alert("Silakan Pilih Siswa Anda")
                return
            }
            let v = domselect.value;
                let identitassiswa = jsondatasiswa[v];
                let datadomidentitas = tbody.querySelectorAll("[data-isiraportidentitas]")
                datadomidentitas.forEach(el => {
                    let atr = el.getAttribute("data-isiraportidentitas");
                    el.innerHTML = identitassiswa[atr];
                });

                let datadomnilai = tbody.querySelectorAll("[data-isianraportnilai]");
                //arrayisianraportdapodik
                
                datadomnilai.forEach(el => {
                    let atr = el.getAttribute("data-isianraportnilai");
                    if(atr.indexOf("SARAN")>-1){
                        el.innerHTML = arrayisianraportdapodik[v][atr]==""?"<br><br><br>":arrayisianraportdapodik[v][atr];

                    }else if(atr.indexOf("TITIMANGSA")>-1){
                        el.innerHTML = tanggalfull(new Date(arrayisianraportdapodik[v][atr]));

                    }else{
                        el.innerHTML = arrayisianraportdapodik[v][atr];

                    }
                });
        }
        kiriminduk_raport.onclick = function(){
            if(domselect.value == ""){
                return
            }
            // kiriminduk_raport.innerHTML = "<i clas='fa fa-spin fa-spinner'</i> "+" Simpan ke Buku Induk";
            let indeksiswa = domselect.value;
            let nissiswa = jsondatasiswa[indeksiswa].nis;
            let tokensiswa = jsondatasiswa[indeksiswa].id;
            if(nissiswa == ""){
                alert("Siswa tidak memiliki NIS, Tidak bisa dikirim ke Database Buku Induk");
                return
            }
            let kodenis = nissiswa.substring(0,4);
            //alert("Dalam tahap pengembangan...")
            kirimnilairaportkeinduk(indeksiswa, kiriminduk_raport,tokensiswa,kodenis)
            //cek induk
        }
    
        let v = 0;
        let identitassiswa = jsondatasiswa[v];
        let datadomidentitas = tbody.querySelectorAll("[data-isiraportidentitas]")
        datadomidentitas.forEach(el => {
            let atr = el.getAttribute("data-isiraportidentitas");
            el.innerHTML = identitassiswa[atr];
        });

        let datadomnilai = tbody.querySelectorAll("[data-isianraportnilai]");
        //arrayisianraportdapodik
        
        datadomnilai.forEach(el => {
            let atr = el.getAttribute("data-isianraportnilai");
            el.innerHTML = arrayisianraportdapodik[v][atr];
        });
}
const panggilkehadiransiswadariserver = (elinfo)=>{
    elinfo.innerHTML = "Memproses ... " + "<i class='fa fa-spin fa-spinner'></i>";
    let ssabsen = objek_spreadsheet_absen["kelas"+idJenjang];
    
    cekabsen = new FormData()
    cekabsen.append("action","panggilseluruhrekapabsen")
    cekabsen.append("ss_absen",ssabsen)
    cekabsen.append("namakelas",idNamaKelas)
    // fetch(linkdatabaseinduk,{
    //     methode:"post",
    //     body:cekabsen
    // })
    fetch(linkdatabaseinduk,{method:"post",body:cekabsen})
    .then(m => m.json())
    .then(r => {
        //console.log(r);
        if(document.querySelector(".tandasiapkehadiransiswa").className.indexOf("w3-hide")>-1){
            document.querySelector(".tandasiapkehadiransiswa").classList.remove("w3-hide")
        }
        let tombol = `<button onclick="panggildbinduksementara(this)"> Tampilkan Absensi yang telah Anda simpan</button>`
        elinfo.innerHTML = "<h4 style='text-align:center'>Data Rekap kehadiran Berhasil Dimuat</h4>  " + tombol;
        for(i = 0 ; i < jsondatasiswa.length ; i++){
            let token = jsondatasiswa[i].id;
            let inputsakit = tabelraportmanual.querySelector("tbody").rows[i].querySelector(`input[data-keyraportindukmanual="${prefix_stringkeyinduk}KEHADIRAN_SAKIT"]`)
            inputsakit.value = r[token]["Total Sakit"];
            let inputijin = tabelraportmanual.querySelector("tbody").rows[i].querySelector(`input[data-keyraportindukmanual="${prefix_stringkeyinduk}KEHADIRAN_IZIN"]`)
            inputijin.value = r[token]["Total Ijin"];
            let inputalpa = tabelraportmanual.querySelector("tbody").rows[i].querySelector(`input[data-keyraportindukmanual="${prefix_stringkeyinduk}KEHADIRAN_ALPA"]`)
            inputalpa.value = r[token]["Total Alpa"]

        }
    })
    .catch(er => {
        console.log(er);
        elinfo.innerHTML ="<h2 style='text-align:center;padding:5px;background-color:red;color:yellow'>ERROR </h2" +er
    })

}
let datanilaidariserverkd3 =[]
const panggilkompetensiasli = (kd,callbekbukan="") =>{
    let info = document.querySelector(".info_mbtr");
    let tab2 = "Induksemetara";
    let param2 = "&kelas=" + idNamaKelas + "&prefiktab=" + tab2;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + param2)
    .then(m => m.json())
    .then(k => {
            if(k.result == 0){
                alert("Anda belum pernah menyimpan data olahan apapun di server untuk nilai Raport. Sistem akan melacak keberadaan database yang tersimpan dari fitur OLAH NILAI");
                info.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Memproses data Hasil Olahan`
                let tab = kd=="k3"?"rekapkd3":"rekapkd4";
                    let ceklistrue = kd =="k3"?"cekliskd3":"cekliskd4";
                    let namakd = kd =="k3"?"kd3":"kd4";
                    let p_K = kd =="k3"?"_P_":"_K_";
                    let mapelaktif = koleksiarraymapelaktif();
                    let datamapelfull = mapelaktif.kodemapel;
                    let kkmglobal = mapelaktif.kkmmin
                    let datamapel =  datamapelfull.filter(s => !(s =="PAI"||s =="PKATO"|| s=="PKRIS"||s=="PHIND"||s=="PBUDH"|| s=="PKONG")); // []
                    let datakdtrue = mapelaktif.source.filter(s => s[ceklistrue] == true);

                    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
                    fetch(constlinknilai + "?action=getdatafromtab" + param)
                        .then(m => m.json())
                        .then(k => {
                            if(k.result == 0){
                                alert("Anda belum pernah menyimpan data olahan apapun di server. Anda mesti input nilai satu per satu")
                                info.innerHTML = `<h4 style="text-align:center">TIDAK DITEMUKAN DATABASE OLAH NILAI</h4>Anda Terpaksa harus mengisi manual untuk deskripsi ini atau pilih Import-Export berikut:` + tambahfituruploadimport(kd);
                            }else{
                                info.innerHTML = `<h4 style="text-align:center">Data Hasil Olahan berhasil dimuat.</h4>` + tambahfituruploadimport(kd);
                            
                                //console.log(k);
                                let datanilai = k.data;
                                datanilaidariserverkd3 = k.data;
                                let dataalgoritma = []
                                for(i = 0 ; i < datanilai.length ; i++){
                                    let row = tabelraportmanual.querySelector("tbody").rows[i]
                                    let dataperbaris = datanilai[i]
                                    let objekalgoritma = {};
                                    objekalgoritma.index = i;
                                    objekalgoritma.namasiswa = dataperbaris.nama;
                                    let agama = convertAgamaSiswaMapel(jsondatasiswa[i].pd_agama);//Object.keys(tesdata[0]).filter(s => s.indexOf("PAI_3.1")>-1).map(m=> parseFloat(tesdata[0][m])).reduce((a,b)=>a+b)
                                    let algomapel = datakdtrue.filter(s => s.mapel == agama).map(m => agama+"_"+m[namakd]).map(n =>[{"namakd":n.split("_")[1], "arraykd": Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])),"length":Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).length,"nilaikd":Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).length==3?Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).reduce((a, b, i)=> (i==1?a*2:a)+b)/4:Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).reduce((a,b)=>a+b)/Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).length   }][0]);
                                    let nilaimapelraport = algomapel.map(m => m.nilaikd).reduce((a,b)=>a+b)/algomapel.length;
                                    let arraynilaikd = algomapel.map(m => m.nilaikd)
                                    let nilaikdmaksimal = Math.max(...arraynilaikd);
                                    let nilaikdminimal = Math.min(...arraynilaikd);
                                    
                                    
                                    let predikatraport = fn_predikatkriteria(nilaimapelraport,kkmglobal);
                                    let kdmaksimal = algomapel.filter(s=>s.nilaikd == nilaikdmaksimal).length==0?"": algomapel.filter(s=>s.nilaikd == nilaikdmaksimal)[0]["namakd"];
                                    let predikatkdmaksimal = fn_predikatkriteria(nilaikdmaksimal,kkmglobal);
                                    let kdminimal = algomapel.filter(s=>s.nilaikd == nilaikdminimal).length==0?"": algomapel.filter(s=>s.nilaikd == nilaikdminimal)[0]["namakd"];
                                    let predikatkdminimal = fn_predikatkriteria(nilaikdminimal,kkmglobal);
                                    let objekisi = {}
                                        objekisi.nilai_predikat = predikatraport;
                                        objekisi.kd_maks = kdmaksimal;
                                        objekisi.kd_min = kdminimal;
                                        objekisi.predikat_maks = predikatkdmaksimal;
                                        objekisi.predikat_min = predikatkdminimal;

                                    objekalgoritma.agama = objekisi;
                                    if(callbekbukan==""){
                                        row.querySelector(`input[data-keyraportindukmanual="${prefix_stringkeyinduk}AGAMA${p_K}NILAI"]`).value = nilaimapelraport;
                                    }else{
                                        // row.querySelector(`[data-keyraportindukmanual="${prefix_stringkeyinduk}AGAMA${p_K}PREDIKAT"]`).value = predikatraport;
                                        let val_kdmaksteks = "",val_predikatKdmin="",val_kdminteks="";
                                        //<span class="w3-text-blue">${val_predikatKdmin} dalam</span> ${val_kdminteks}`;
                                        let el1 = row.querySelector(`[data-keyraportindukmanual="${prefix_stringkeyinduk}AGAMA${p_K}PREDIKAT"]`);
                                        let ops1 = Array.from(el1);
                                            ops1.forEach((ops,i) =>{
                                                if(ops.value == predikatraport){
                                                    el1.selectedIndex = i;
                                                }
                                            });//.value = predikatraport;
                                        
                                        let el2 = row.querySelector(`[data-deskripsi${kd}="predikat_kdmaks_AGAMA"]`);
                                        let ops2 = Array.from(el2);
                                            ops2.forEach((ops, i)=> {
                                                if(ops.value == predikatkdmaksimal){
                                                    el2.selectedIndex = i;
                                                    
                                                }
                                            })
                                        //.value = predikatkdmaksimal;
                                        let el3 = row.querySelector(`[data-deskripsi${kd}="predikat_kdmin_AGAMA"]`);
                                        let ops3 = Array.from(el3);
                                            ops3.forEach((ops, i)=>{
                                                if(ops.value ==predikatkdminimal){
                                                    el3.selectedIndex = i;
                                                }
                                            })//.value = predikatkdminimal;
                                        let el4 = row.querySelector(`[data-deskripsi${kd}="kdmaks_AGAMA"]`);
                                        let ops4 = Array.from(el4);
                                        ops4.forEach((ops, i)=>{
                                            if(ops.value == kdmaksimal){
                                                el4.selectedIndex = i;
                                                val_kdmaksteks = ops.getAttribute(`data-opsivalue`)
                                            
                                            }
                                        })//.value = kdmaksimal;

                                        let el5 = row.querySelector(`[data-deskripsi${kd}="kdmin_AGAMA"]`);
                                        let ops5 = Array.from(el5);
                                        ops5.forEach((ops, i)=>{
                                            if(ops.value == kdminimal){
                                                el5.selectedIndex = i;
                                                
                                                val_kdminteks = ops.getAttribute(`data-opsivalue`)
                                            }
                                        }) //.value = kdminimal;
                                        let html = '';
                                        html +=`Ananda ${jsondatasiswa[i].pd_nama} <span class="w3-text-blue">${predikatkdmaksimal} dalam</span> ${val_kdmaksteks}, <span class="w3-text-blue">${predikatkdminimal} dalam</span> ${val_kdminteks}`;
                                        //cariinput.innerHTML = html;

                                        row.querySelector(`[data-deskripsi${kd}="deskripsi_AGAMA"]`).innerHTML = html; ;//change_deskripsi2(i,el5, kd,"AGAMA");


                                    }
                                    for(j = 0 ; j < datamapel.length ; j++){
                                        algomapel = datakdtrue.filter(s => s.mapel == datamapel[j]).map(m => datamapel[j]+"_"+m[namakd]).map(n =>[{"namakd":n.split("_")[1], "arraykd": Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=>parseFloat(dataperbaris[mm])),"length":Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).length,"nilaikd":Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).length==3?Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).reduce((a, b, i)=> (i==1?a*2:a)+b)/4:Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).reduce((a,b)=>a+b)/Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).length   }][0]);
                                    
                                        nilaimapelraport = algomapel.map(m => m.nilaikd).reduce((a,b)=>a+b)/algomapel.length;
                                        arraynilaikd = algomapel.map(m => m.nilaikd)
                                        nilaikdmaksimal = Math.max(...arraynilaikd);
                                        nilaikdminimal = Math.min(...arraynilaikd);

                                        predikatraport = fn_predikatkriteria2(nilaimapelraport,kkmglobal);
                                        kdmaksimal = algomapel.filter(s=>s.nilaikd == nilaikdmaksimal).length==0?"": algomapel.filter(s=>s.nilaikd == nilaikdmaksimal)[0]["namakd"];
                                        predikatkdmaksimal = fn_predikatkriteria2(nilaikdmaksimal,kkmglobal);
                                        kdminimal = algomapel.filter(s=>s.nilaikd == nilaikdminimal).length==0?"": algomapel.filter(s=>s.nilaikd == nilaikdminimal)[0]["namakd"];
                                        predikatkdminimal = fn_predikatkriteria2(nilaikdminimal,kkmglobal);
                                        
                                        objekisi = {}
                                        objekisi.nilai_predikat = predikatraport;
                                        objekisi.kd_maks = kdmaksimal;
                                        objekisi.kd_min = kdminimal;
                                        objekisi.predikat_maks = predikatkdmaksimal;
                                        objekisi.predikat_min = predikatkdminimal;
                                        objekalgoritma[datamapel[j]] = objekisi;
                                        //diisikan ke elemen input;
                                        if(callbekbukan ==""){
                                            row.querySelector(`input[data-keyraportindukmanual="${prefix_stringkeyinduk}${datamapel[j]}${p_K}NILAI"]`).value = nilaimapelraport;
                                        }else{
                                            let val_kdmaksteks = "",val_predikatKdmin="",val_kdminteks="";
                                            //<span class="w3-text-blue">${val_predikatKdmin} dalam</span> ${val_kdminteks}`;
                                        let el1 = row.querySelector(`[data-keyraportindukmanual="${prefix_stringkeyinduk}${datamapel[j]}${p_K}PREDIKAT"]`);
                                            let ops1 = Array.from(el1);
                                                ops1.forEach((ops, i)=>{
                                                    if(ops.value == predikatraport){
                                                        el1.selectedIndex = i;
                                                    }
                                                })  //.value = predikatraport;
                                            let el2 = row.querySelector(`[data-deskripsi${kd}="predikat_kdmaks_${datamapel[j]}"]`);
                                            let ops2 = Array.from(el2);
                                                ops2.forEach((ops, i)=>{
                                                    if(ops.value == predikatkdmaksimal){
                                                        el2.selectedIndex = i;
                                                    }
                                                })  //.value = predikatkdmaksimal;
                                            let el3 = row.querySelector(`[data-deskripsi${kd}="predikat_kdmin_${datamapel[j]}"]`);
                                            let ops3 = Array.from(el3);
                                                ops3.forEach((ops, i)=>{
                                                    if(ops.value == predikatkdminimal){
                                                        el3.selectedIndex = i;
                                                    }
                                                })   //.value = predikatkdminimal;
                                            let el4 = row.querySelector(`[data-deskripsi${kd}="kdmaks_${datamapel[j]}"]`);  //.value = kdmaksimal;
                                            let ops4 = Array.from(el4);
                                                ops4.forEach((ops, i)=>{
                                                    if(ops.value == kdmaksimal){
                                                        el4.selectedIndex = i;
                                                        val_kdmaksteks = ops.getAttribute(`data-opsivalue`)
                                                        
                                                    }
                                                })
                                            let el5 = row.querySelector(`[data-deskripsi${kd}="kdmin_${datamapel[j]}"]`);   //.value = kdminimal;
                                            let ops5 = Array.from(el5);
                                                ops5.forEach((ops, i)=>{
                                                    if(ops.value == kdminimal){
                                                        el5.selectedIndex = i;
                                                        val_kdminteks = ops.getAttribute(`data-opsivalue`);
                                                    }
                                                })
                                            let html = '';
                                            html +=`Ananda ${jsondatasiswa[i].pd_nama} <span class="w3-text-blue">${predikatkdmaksimal} dalam</span> ${val_kdmaksteks}, <span class="w3-text-blue">${predikatkdminimal} dalam</span> ${val_kdminteks}`;
                                    
                                            row.querySelector(`[data-deskripsi${kd}="deskripsi_${datamapel[j]}"]`).innerHTML = html;//change_deskripsi2(i,el5, kd,datamapel[j]);
                                        }

                                        // objekalgoritma[datamapel[j]] = datakdtrue.filter(s => s.mapel == datamapel[j]).map(m => datamapel[j]+"_"+m[namakd]).map(n =>[{"namakd":n.split("_")[1], "arraykd": Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=>parseFloat(dataperbaris[mm])),"length":Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).length,"nilaikd":Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).length==3?Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).reduce((a, b, i)=> (i==1?a*2:a)+b)/4:Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).reduce((a,b)=>a+b)/Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).length   }][0]);
                                    }
                                    dataalgoritma.push(objekalgoritma)
                                }
                            }
                                // console.log(dataalgoritma);
                        })
                        .catch(er => console.log(er))
            }else{
                let tomboldatakd_asli = `<button class="tangan w3-pale-green w3-border w3-round" onclick="panggilkompetensiaslibener('${kd}','kd4')">Periksa Deskripsi Rekap Olah Nilai</button>`
        
                info.innerHTML = `<h4 style="text-align:center">Berhasil memuat database Server Nilai Raport Final</h4> `+tomboldatakd_asli;// +" " + tambahfituruploadimport(kd);
                let tabelbody = tabelraportmanual.querySelector("tbody");
                let resdatas = k.data;
                for(i = 0 ; i < tabelbody.rows.length ; i++){
                    let dataT = resdatas[i]
                    let elemen = tabelbody.rows[i].querySelectorAll("[data-keyraportindukmanual]");
                    for(j = 0 ; j < elemen.length; j++){
                        let key = elemen[j].getAttribute("data-keyraportindukmanual");
                        if(elemen[j].nodeName == "TD"){
                            elemen[j].innerHTML = dataT[key]
                        }else{
                            let inputan = elemen[j]
                            let val = dataT[key]
                            if(inputan.type == "date"){
                                inputan.value = val ==""?"":StringTanggalnol(new Date(val));
                            }else if(inputan.type =="select-one"){
                                inputan.value = val;
                            }else{
                                inputan.value = val;
                            }

                            

                        }
                    }
                }
            }
    }).catch(er  => console.log(er))

    
}
const panggilkompetensiaslibener = (kd,callbekbukan="") =>{
    let info = document.querySelector(".info_mbtr");
                info.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Memproses data Hasil Olahan`
                let tab = kd=="k3"?"rekapkd3":"rekapkd4";
                    let ceklistrue = kd =="k3"?"cekliskd3":"cekliskd4";
                    let namakd = kd =="k3"?"kd3":"kd4";
                    let p_K = kd =="k3"?"_P_":"_K_";
                    let mapelaktif = koleksiarraymapelaktif();
                    let datamapelfull = mapelaktif.kodemapel;
                    let kkmglobal = mapelaktif.kkmmin
                    let datamapel =  datamapelfull.filter(s => !(s =="PAI"||s =="PKATO"|| s=="PKRIS"||s=="PHIND"||s=="PBUDH"|| s=="PKONG")); // []
                    let datakdtrue = mapelaktif.source.filter(s => s[ceklistrue] == true);

                    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
                    fetch(constlinknilai + "?action=getdatafromtab" + param)
                        .then(m => m.json())
                        .then(k => {
                            if(k.result == 0){
                                alert("Anda belum pernah menyimpan data olahan apapun di server. Anda mesti input nilai satu per satu")
                                info.innerHTML =  "<h4 style='text-align:center'>Rekap Nilai Olah tidak tersedia. </h4>"+tambahfituruploadimport(kd);
                            }else{
                                info.innerHTML = `<h4 style='text-align:center'>Data Hasil Olahan berhasil dimuat.</h4>` + tambahfituruploadimport(kd);
                            
                                //console.log(k);
                                let datanilai = k.data;
                                datanilaidariserverkd3 = k.data;
                                let dataalgoritma = []
                                for(i = 0 ; i < datanilai.length ; i++){
                                    let row = tabelraportmanual.querySelector("tbody").rows[i]
                                    let dataperbaris = datanilai[i]
                                    let objekalgoritma = {};
                                    objekalgoritma.index = i;
                                    objekalgoritma.namasiswa = dataperbaris.nama;
                                    let agama = convertAgamaSiswaMapel(jsondatasiswa[i].pd_agama);//Object.keys(tesdata[0]).filter(s => s.indexOf("PAI_3.1")>-1).map(m=> parseFloat(tesdata[0][m])).reduce((a,b)=>a+b)
                                    let algomapel = datakdtrue.filter(s => s.mapel == agama).map(m => agama+"_"+m[namakd]).map(n =>[{"namakd":n.split("_")[1], "arraykd": Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])),"length":Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).length,"nilaikd":Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).length==3?Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).reduce((a, b, i)=> (i==1?a*2:a)+b)/4:Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).reduce((a,b)=>a+b)/Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).length   }][0]);
                                    let nilaimapelraport = algomapel.map(m => m.nilaikd).reduce((a,b)=>a+b)/algomapel.length;
                                    let arraynilaikd = algomapel.map(m => m.nilaikd)
                                    let nilaikdmaksimal = Math.max(...arraynilaikd);
                                    let nilaikdminimal = Math.min(...arraynilaikd);
                                    
                                    
                                    let predikatraport = fn_predikatkriteria(nilaimapelraport,kkmglobal);
                                    let kdmaksimal = algomapel.filter(s=>s.nilaikd == nilaikdmaksimal).length==0?"": algomapel.filter(s=>s.nilaikd == nilaikdmaksimal)[0]["namakd"];
                                    let predikatkdmaksimal = fn_predikatkriteria(nilaikdmaksimal,kkmglobal);
                                    let kdminimal = algomapel.filter(s=>s.nilaikd == nilaikdminimal).length==0?"": algomapel.filter(s=>s.nilaikd == nilaikdminimal)[0]["namakd"];
                                    let predikatkdminimal = fn_predikatkriteria(nilaikdminimal,kkmglobal);
                                    let objekisi = {}
                                        objekisi.nilai_predikat = predikatraport;
                                        objekisi.kd_maks = kdmaksimal;
                                        objekisi.kd_min = kdminimal;
                                        objekisi.predikat_maks = predikatkdmaksimal;
                                        objekisi.predikat_min = predikatkdminimal;

                                    objekalgoritma.agama = objekisi;
                                    if(callbekbukan==""){
                                        row.querySelector(`input[data-keyraportindukmanual="${prefix_stringkeyinduk}AGAMA${p_K}NILAI"]`).value = nilaimapelraport;
                                    }else{
                                        // row.querySelector(`[data-keyraportindukmanual="${prefix_stringkeyinduk}AGAMA${p_K}PREDIKAT"]`).value = predikatraport;
                                        let val_kdmaksteks = "",val_predikatKdmin="",val_kdminteks="";
                                        //<span class="w3-text-blue">${val_predikatKdmin} dalam</span> ${val_kdminteks}`;
                                        let el1 = row.querySelector(`[data-keyraportindukmanual="${prefix_stringkeyinduk}AGAMA${p_K}PREDIKAT"]`);
                                        let ops1 = Array.from(el1);
                                            ops1.forEach((ops,i) =>{
                                                if(ops.value == predikatraport){
                                                    el1.selectedIndex = i;
                                                }
                                            });//.value = predikatraport;
                                        
                                        let el2 = row.querySelector(`[data-deskripsi${kd}="predikat_kdmaks_AGAMA"]`);
                                        let ops2 = Array.from(el2);
                                            ops2.forEach((ops, i)=> {
                                                if(ops.value == predikatkdmaksimal){
                                                    el2.selectedIndex = i;
                                                    
                                                }
                                            })
                                        //.value = predikatkdmaksimal;
                                        let el3 = row.querySelector(`[data-deskripsi${kd}="predikat_kdmin_AGAMA"]`);
                                        let ops3 = Array.from(el3);
                                            ops3.forEach((ops, i)=>{
                                                if(ops.value ==predikatkdminimal){
                                                    el3.selectedIndex = i;
                                                }
                                            })//.value = predikatkdminimal;
                                        let el4 = row.querySelector(`[data-deskripsi${kd}="kdmaks_AGAMA"]`);
                                        let ops4 = Array.from(el4);
                                        ops4.forEach((ops, i)=>{
                                            if(ops.value == kdmaksimal){
                                                el4.selectedIndex = i;
                                                val_kdmaksteks = ops.getAttribute(`data-opsivalue`)
                                            
                                            }
                                        })//.value = kdmaksimal;

                                        let el5 = row.querySelector(`[data-deskripsi${kd}="kdmin_AGAMA"]`);
                                        let ops5 = Array.from(el5);
                                        ops5.forEach((ops, i)=>{
                                            if(ops.value == kdminimal){
                                                el5.selectedIndex = i;
                                                
                                                val_kdminteks = ops.getAttribute(`data-opsivalue`)
                                            }
                                        }) //.value = kdminimal;
                                        let html = '';
                                        html +=`Ananda ${jsondatasiswa[i].pd_nama} <span class="w3-text-blue">${predikatkdmaksimal} dalam</span> ${val_kdmaksteks}, <span class="w3-text-blue">${predikatkdminimal} dalam</span> ${val_kdminteks}`;
                                        //cariinput.innerHTML = html;

                                        row.querySelector(`[data-deskripsi${kd}="deskripsi_AGAMA"]`).innerHTML = html; ;//change_deskripsi2(i,el5, kd,"AGAMA");


                                    }
                                    for(j = 0 ; j < datamapel.length ; j++){
                                        algomapel = datakdtrue.filter(s => s.mapel == datamapel[j]).map(m => datamapel[j]+"_"+m[namakd]).map(n =>[{"namakd":n.split("_")[1], "arraykd": Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=>parseFloat(dataperbaris[mm])),"length":Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).length,"nilaikd":Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).length==3?Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).reduce((a, b, i)=> (i==1?a*2:a)+b)/4:Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).reduce((a,b)=>a+b)/Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).length   }][0]);
                                    
                                        nilaimapelraport = algomapel.map(m => m.nilaikd).reduce((a,b)=>a+b)/algomapel.length;
                                        arraynilaikd = algomapel.map(m => m.nilaikd)
                                        nilaikdmaksimal = Math.max(...arraynilaikd);
                                        nilaikdminimal = Math.min(...arraynilaikd);

                                        predikatraport = fn_predikatkriteria2(nilaimapelraport,kkmglobal);
                                        kdmaksimal = algomapel.filter(s=>s.nilaikd == nilaikdmaksimal).length==0?"": algomapel.filter(s=>s.nilaikd == nilaikdmaksimal)[0]["namakd"];
                                        predikatkdmaksimal = fn_predikatkriteria2(nilaikdmaksimal,kkmglobal);
                                        kdminimal = algomapel.filter(s=>s.nilaikd == nilaikdminimal).length==0?"": algomapel.filter(s=>s.nilaikd == nilaikdminimal)[0]["namakd"];
                                        predikatkdminimal = fn_predikatkriteria2(nilaikdminimal,kkmglobal);
                                        
                                        objekisi = {}
                                        objekisi.nilai_predikat = predikatraport;
                                        objekisi.kd_maks = kdmaksimal;
                                        objekisi.kd_min = kdminimal;
                                        objekisi.predikat_maks = predikatkdmaksimal;
                                        objekisi.predikat_min = predikatkdminimal;
                                        objekalgoritma[datamapel[j]] = objekisi;
                                        //diisikan ke elemen input;
                                        if(callbekbukan ==""){
                                            row.querySelector(`input[data-keyraportindukmanual="${prefix_stringkeyinduk}${datamapel[j]}${p_K}NILAI"]`).value = nilaimapelraport;
                                        }else{
                                            let val_kdmaksteks = "",val_predikatKdmin="",val_kdminteks="";
                                            //<span class="w3-text-blue">${val_predikatKdmin} dalam</span> ${val_kdminteks}`;
                                        let el1 = row.querySelector(`[data-keyraportindukmanual="${prefix_stringkeyinduk}${datamapel[j]}${p_K}PREDIKAT"]`);
                                            let ops1 = Array.from(el1);
                                                ops1.forEach((ops, i)=>{
                                                    if(ops.value == predikatraport){
                                                        el1.selectedIndex = i;
                                                    }
                                                })  //.value = predikatraport;
                                            let el2 = row.querySelector(`[data-deskripsi${kd}="predikat_kdmaks_${datamapel[j]}"]`);
                                            let ops2 = Array.from(el2);
                                                ops2.forEach((ops, i)=>{
                                                    if(ops.value == predikatkdmaksimal){
                                                        el2.selectedIndex = i;
                                                    }
                                                })  //.value = predikatkdmaksimal;
                                            let el3 = row.querySelector(`[data-deskripsi${kd}="predikat_kdmin_${datamapel[j]}"]`);
                                            let ops3 = Array.from(el3);
                                                ops3.forEach((ops, i)=>{
                                                    if(ops.value == predikatkdminimal){
                                                        el3.selectedIndex = i;
                                                    }
                                                })   //.value = predikatkdminimal;
                                            let el4 = row.querySelector(`[data-deskripsi${kd}="kdmaks_${datamapel[j]}"]`);  //.value = kdmaksimal;
                                            let ops4 = Array.from(el4);
                                                ops4.forEach((ops, i)=>{
                                                    if(ops.value == kdmaksimal){
                                                        el4.selectedIndex = i;
                                                        val_kdmaksteks = ops.getAttribute(`data-opsivalue`)
                                                        
                                                    }
                                                })
                                            let el5 = row.querySelector(`[data-deskripsi${kd}="kdmin_${datamapel[j]}"]`);   //.value = kdminimal;
                                            let ops5 = Array.from(el5);
                                                ops5.forEach((ops, i)=>{
                                                    if(ops.value == kdminimal){
                                                        el5.selectedIndex = i;
                                                        val_kdminteks = ops.getAttribute(`data-opsivalue`);
                                                    }
                                                })
                                            let html = '';
                                            html +=`Ananda ${jsondatasiswa[i].pd_nama} <span class="w3-text-blue">${predikatkdmaksimal} dalam</span> ${val_kdmaksteks}, <span class="w3-text-blue">${predikatkdminimal} dalam</span> ${val_kdminteks}`;
                                    
                                            row.querySelector(`[data-deskripsi${kd}="deskripsi_${datamapel[j]}"]`).innerHTML = html;//change_deskripsi2(i,el5, kd,datamapel[j]);
                                        }

                                        // objekalgoritma[datamapel[j]] = datakdtrue.filter(s => s.mapel == datamapel[j]).map(m => datamapel[j]+"_"+m[namakd]).map(n =>[{"namakd":n.split("_")[1], "arraykd": Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=>parseFloat(dataperbaris[mm])),"length":Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).length,"nilaikd":Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).length==3?Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).reduce((a, b, i)=> (i==1?a*2:a)+b)/4:Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).reduce((a,b)=>a+b)/Object.keys(dataperbaris).filter(ss => ss.indexOf(n)>-1).map(mm=> parseFloat(dataperbaris[mm])).length   }][0]);
                                    }
                                    dataalgoritma.push(objekalgoritma)
                                }
                            }
                                // console.log(dataalgoritma);
                        })
                        .catch(er => console.log(er))
           

    
}

const fn_predikatkriteria2 = (x,kkmnya) => {
    // let kkmnya = koleksiarraymapelaktif().kkmmin;
    
    let nilai = parseFloat(x);
    let n_d = parseFloat(kkmnya);
    let n_rentang = Math.round((100 - n_d) / 3);
    let nD = n_d;
    let min_C = n_d;
    let maks_C = (n_d + n_rentang);
    let min_B = maks_C;
    let maks_B = (maks_C + n_rentang);//100 - n_rentang;
    let min_SB = maks_C;//100 - n_rentang;
    let maks_SB = 100;
    let result =""
    if(nilai <= 100 && nilai > min_SB){
        result ="Sangat Baik"
    }else if(nilai > min_B && nilai <= maks_B){
        result = "Baik"
    }else if(nilai > min_C && nilai <= maks_C){
        result ="Cukup"
    }else if(nilai <= n_d){
        result ="Perlu Bimbingan"
    }else{
        result ="Perlu Bimbingan"
    }
    // let tabel = document.querySelector(".tabelkriteriadanrentangkkm");
    // if(tabel.rows[1].cells[1].innerHTML == "" ){
    //     isikanrentang2()
    // }
    // let nilai = parseFloat(x);
    // let minA = parseInt(tabel.rows[1].cells[1].innerHTML);//maks A = 100
    // let minB = parseInt(tabel.rows[2].cells[1].innerHTML);

    // let minC = parseInt(tabel.rows[3].cells[1].innerHTML);

    // let maxB = parseInt(tabel.rows[2].cells[2].innerHTML);
    // let maxC = parseInt(tabel.rows[3].cells[2].innerHTML);
    // let nD = parseInt(tabel.rows[4].cells[1].innerHTML);
    // //console.log(nD);
    // let result = ""
    // if (nilai <= 100 && nilai > minA) {
    //     result = tabel.rows[1].cells[0].innerHTML;
    // } else if (nilai > minB && nilai <= maxB) {
    //     result = tabel.rows[2].cells[0].innerHTML;
    // } else if (nilai > minC && nilai <= maxC) {
    //     result = tabel.rows[3].cells[0].innerHTML;
    // } else if (nilai <= nD) {
    //     result = tabel.rows[4].cells[0].innerHTML;
    // } else {
    //     result = "Kriteria Tidak dikenal"
    // }
    return result

}

const isikanrentang2 = () => {
    let tabel = document.querySelector(".tabelkriteriadanrentangkkm");
    let kkmnya = koleksiarraymapelaktif().kkmmin;
    
    let n_d = parseInt(kkmnya);//parseInt(document.querySelector(".kkmsatuanpendidikan").textContent);
    document.querySelectorAll(".a_kkm").forEach(k => k.innerHTML = n_d);
    let n_rentang = Math.round((100 - n_d) / 3);
    document.querySelector("#a_rentangkkm").innerHTML = n_rentang;
    let minAmaxB = 100 - parseFloat(n_rentang);
    let minBmaxC = minAmaxB - parseFloat(n_rentang);

    tabel.rows[1].cells[1].innerHTML = minAmaxB;
    tabel.rows[2].cells[2].innerHTML = minAmaxB;
    tabel.rows[2].cells[1].innerHTML = minBmaxC;
    tabel.rows[3].cells[2].innerHTML = minBmaxC;

}

const simpanmanualdeskripsi = (el, k3k4 ) =>{
    let stringutama
    
        stringutama = el.innerHTML
        el.innerHTML = `<i class="fa fa-spin fa-spinner"></i> ${stringutama}`
    let arrayisianraportdapodik = [];
    let cekdatapokok = tabelraportmanual.querySelector("tbody").rows;
    for( i = 0 ; i < cekdatapokok.length ; i++){
        let elRowInput = cekdatapokok[i].querySelectorAll("[data-keyraportindukmanual]");
        let obj = {};
        obj.no = (i+1);
        obj.tokensiswa = jsondatasiswa[i].id;
        obj.namasiswa = jsondatasiswa[i].pd_nama;

        for(j = 0 ; j < elRowInput.length ; j++){
            let elemen = elRowInput[j];
            let key = elemen.getAttribute("data-keyraportindukmanual")
            let val
            if(elemen.nodeName == "TD"){
                val = elemen.innerText
            }else{
                val = elemen.value;
            }
            obj[key] = val;
        }
        arrayisianraportdapodik.push(obj);
    }
    
    
    let oKeys = JSON.stringify(Object.keys(arrayisianraportdapodik[0]));
    let oValuess = JSON.stringify(arrayisianraportdapodik.map(s=> Object.values(s)));
    let kirimdatasementara = new FormData();
    kirimdatasementara.append("head", oKeys)
    kirimdatasementara.append("tabel", oValuess)
    kirimdatasementara.append("kelas", idNamaKelas);
    kirimdatasementara.append("prefiktab", "Induksemetara");
    fetch(constlinknilai + "?action=inserttabeltospreadsheet", {
        method: 'post',
        body: kirimdatasementara
    }).then(m => m.json())
        .then(k => {
            console.log("result simpan server dbinduksementara");
            console.log(k)
            alert(k.result);
            if(el!=null){
            }
                // stringutama = el.innerHTML
                el.innerHTML = stringutama ;//`<i class="fa fa-spin fa-spinner"></i> ${stringutama}`
            let tabelbody = tabelraportmanual.querySelector("tbody");
                let resdatas = k.data;
                for(i = 0 ; i < tabelbody.rows.length ; i++){
                    let dataT = resdatas[i]
                    let elemen = tabelbody.rows[i].querySelectorAll("[data-keyraportindukmanual]");
                    for(j = 0 ; j < elemen.length; j++){
                        let key = elemen[j].getAttribute("data-keyraportindukmanual");
                        if(elemen[j].nodeName == "TD"){
                            elemen[j].innerHTML = dataT[key]
                        }else{
                            let inputan = elemen[j]
                            let val = dataT[key]
                            if(inputan.type == "date"){
                                inputan.value = val ==""?"":StringTanggalnol(new Date(val));
                            }else if(inputan.type =="select-one"){
                                inputan.value = val;
                            }else{
                                inputan.value = val;
                            }
                            
                        }
                    }
                }
        })
        .catch(er => console.log(er))
}

const panggildbinduksementara = (el = null) =>{
    let tab = "Induksemetara";
    let teksbutton = el.innerHTML ;
    el.innerHTML = "<i class='fa fa-spin fa-spinner'></i> "+ teksbutton
    let param = "&kelas=" + idNamaKelas + "&prefiktab=" + tab;//+ "&datahead=" + stinghead;//+ "&dataisi=" + stingisi;
    fetch(constlinknilai + "?action=getdatafromtab" + param)
        .then(m => m.json())
        .then(k => {
            
            if (k.result == 0) {
                //info.innerHTML = "Anda belum pernah membuat data Rekapitulasi  Perkembangan Siswa. Nilai ini diambil dari hasil penyimpanan server yang telah Anda lakukan baik melalui menu Tab <b>Raport</b> atau <b>Raport Manual</b>";
                el.innerHTML = teksbutton;
            } else {
                el.innerHTML = teksbutton;
                let tabelbody = tabelraportmanual.querySelector("tbody");
                let resdatas = k.data;
                for(i = 0 ; i < tabelbody.rows.length ; i++){
                    let dataT = resdatas[i]
                    let elemen = tabelbody.rows[i].querySelectorAll("[data-keyraportindukmanual]");
                    for(j = 0 ; j < elemen.length; j++){
                        let key = elemen[j].getAttribute("data-keyraportindukmanual");
                        if(elemen[j].nodeName == "TD"){
                            elemen[j].innerHTML = dataT[key]
                        }else{
                            let inputan = elemen[j]
                            let val = dataT[key]
                            if(inputan.type == "date"){
                                inputan.value = val ==""?"":StringTanggalnol(new Date(val));
                            }else if(inputan.type =="select-one"){
                                inputan.value = val;
                            }else{
                                inputan.value = val;
                            }
                            
                        }
                    }
                }
            }
        })
}


const kirimnilairaportkeindukTahandulu = (indekrow,el,tokensiswa,namatab)=>{
    let elemen = tabelraportmanual.rows[parseInt(indekrow)].querySelectorAll("[data-keyraportindukmanual]");
    el.innerHTML = `<i class="fa fa-spin fa-spinner"></i> Memproses...`;
    //el.setAttribute("onclick","alert('sedang mengirimkan nilai')");
    let ob = new FormData();
    for(let j = 0 ; j < elemen.length; j++){
        let key = elemen[j].getAttribute("data-keyraportindukmanual");
        let val="";
            if(elemen[j].nodeName == "TD"){
                // elemen[j].innerHTML = dataT[key]
                val = elemen[j].innerText;
            }else{
                let inputan = elemen[j]
                val = inputan.value;
                    if(inputan.type == "date"){
                        val = new Date(inputan.value)
                       // inputan.value = val ==""?"":StringTanggalnol(new Date(val));
                    }else if(inputan.type =="select-one"){
                        inputan.value = val;
                    }else{
                        inputan.value = val;
                    }
                            
            }
        // let key = elemens[i].getAttribute("data-keyraportindukmanual");
        // let val= elemens[i].value;
        // ob[key] = val;
        ob.append(key,val)
    }
    //tambahan untuk induk:
    let keywalas = prefix_stringkeyinduk+"NAMA_WALIKELAS";
    let nipwalas = prefix_stringkeyinduk+"NIP_WALIKELAS";
    let namakepsek = prefix_stringkeyinduk+"NAMA_KEPSEK";
    let nipkepsek = prefix_stringkeyinduk+"NIP_KEPSEK";
    ob.append(keywalas, namauser);
    ob.append(nipwalas, idNipGuruKelas);
    ob.append(namakepsek, idNamaKepsek);
    ob.append(nipkepsek, idNipKepsek);
    ob.append("tokensiswa",tokensiswa);
    ob.append("namatab",namatab);
    ob.append("action","simpannilairarportinduk");
    //formulirkirim.innerHTML = `<div class="w3-center">Sedang mengirimkan data  ... <i class="fa fa-spin fa-spinner"></i></div>`;
    fetch(linkdatabaseinduk,{method:"post",body:ob})
    .then(m => m.json())
    .then(r => {
        //formulirkirim.innerHTML = r.sukses;
        el.innerHTML = `Berhasil Terkirim`;
        //el.setAttribute("onclick","alert('Berhasil Terkirim, silakan melanjutkan ke tahap selanjutnya')");
        console.log(r)
    }).catch(er => {
        //formulirkirim.innerHTML = `<div class="w3-center">Proses Gagal. Pesan server: ${er}</div>`;
        el.innerHTML = `Gagal`;
        //el.setAttribute("onclick","alert('Mohon maaf, terjadi kesalahan')");
    })
    ///;
    
    //let idsiswa = miripjsondatasiswa[jk].id

        //objek sis siwa:
        
        let dataobjeksiswa = Object.assign({},jsondatasiswa.filter(s => s.id == tokensiswa)[0]);
        let dataobjeksiswainduk = dbsiswa_bukuinduk.filter(s => s.id == tokensiswa)[0]
        let datasiswadariinduk = Object.assign({},dataobjeksiswainduk)
        Object.assign(datasiswadariinduk, dataobjeksiswa)
        console.log(datasiswadariinduk);
        delete datasiswadariinduk.time_stamp
        datasiswadariinduk.dieditoleh = namauser;
        dataobjeksiswa.dieditoleh = namauser;
        
            let databelumkirim = new FormData();
            databelumkirim.append("action","updatedatabaseIndukUtama");
            databelumkirim.append("idsreadsheet",jlo.ss_datauser);
            let keyy = Object.keys(dataobjeksiswa).filter(s => s !== "time_stamp")
            for (let i = 0; i < keyy.length; i++) {
                databelumkirim.append(keyy[i], dataobjeksiswa[keyy[i]]);
                }
            fetch(linkdatabaseinduk,{method:"post",body:databelumkirim})
            .then(m => m.json())
            .then(r =>{
                db_utama_siswa = r.all;
                console.log("Simpan ke db siswa berhasil di SS db akun")
            }).catch(er => {
                    console.log(er)
            });
            
                let key = Object.keys(datasiswadariinduk);//.filter(s => s !== "time_stamp")
                let datakirim = new FormData();
                for (let i = 0; i < key.length; i++) {
                    datakirim.append(key[i], datasiswadariinduk[key[i]]);
                    }
            
                datakirim.append("action","updatedatabaseIndukUtama");
                datakirim.append("idsreadsheet",ss_induk);
                fetch(linkdatabaseinduk,{method:"post",body:datakirim})
                .then(m => m.json())
                .then(r =>{
                    console.log("Simpan ke db siswa berhasil di SS db induk")
                    dbsiswa_bukuinduk = r.all
            }).catch(er => {
                    console.log(er)
                    //el.innerHTML = `<i class="fa fa-spin fa-spinner"></i> server utama gagal, sedang memproses server induk`;
                });
}

const suratketerangansiswa = ()=>{
    let  modal = document.getElementById("modalsuratsurat")
    modal.style.display = 'block';
    let tekskop = `PEMERINTAH DAERAH ${jlo.idkota.toUpperCase()} ${jlo.kota.toUpperCase()}`;
    document.querySelector(".kopsuratlainnyakota").innerHTML = tekskop;
    document.querySelector(".kopsuratlainnyanamasekolah").innerHTML = idNamaSekolah.toUpperCase();
    document.querySelector(".kopsuratlainnyaalamat1").innerHTML = teksalamat;
    let almat2 = `NPSN: 20228914 | NSS: 101026604052 | Surel: uptdsdnratujaya1@gmail.com | Web: www.sdnratujaya1.net | Kode Pos: 16445`;
    document.querySelector(".kopsuratlainnyaalamat2").innerHTML = almat2;
    let elemenselect = document.querySelector(".selectnama_modalsuratsurat");
    let next_elemen = document.querySelector(".next_modalsuratsurat");
    let prev_elemen = document.querySelector(".prev_modalsuratsurat");
    elemenselect.innerHTML ="";
    let ops = ``
    for(let i = 0 ; i < jsondatasiswa.length ; i++){
        ops +=`<option value="${i}">${jsondatasiswa[i].pd_nama}</option>`;
    }
    elemenselect.innerHTML =ops;

    let tempat_isi = document.querySelector(".isisuratlainnya");
    let html =``;
    html +=`<div style="padding:25px 2px;">`;
    html +=`<h5 style="text-align:center;font-weight:bold">`;
        html +=`<u>SURAT KETERANGAN SISWA</u>`;
    html +=`</h5>`;
    html +=`<div style="text-align:center;margin:-10px 5px">`;
        html +=`NOMOR : 421.2/ ... ... SD-RAJA 1/VII/2022`;
    html +=`</div><br><br>`;
        html +=`<div style="text-align:justify;text-indent:30px">`;
        html += `Yang bertanda tangan di bawah ini Kepala ${idNamaSekolah} menerangkan bahwa:<br><br>`;
        html +=`</div>`
        html +=`<table style="margin-left:30px">`;
            html +=`<tr>`;
                html+=`<td style="vertical-align:top">Nama</td>`;
                html+=`<td style="vertical-align:top">:</td>`;
                html+=`<td style="vertical-align:top;border-bottom:.5pt dotted black;width:70%" data-sksl="pd_nama"></td>`;
            html +=`</tr>`;
            html +=`<tr>`;
                html+=`<td style="vertical-align:top">NIS/NISN</td>`;
                html+=`<td style="vertical-align:top">:</td>`;
                html+=`<td style="border-bottom:.5pt dotted black;vertical-align:top"><span data-sksl="nis"></span>/<span data-sksl="nisn"></span></td>`;
            html +=`</tr>`;
            html +=`<tr>`;
                html+=`<td style="vertical-align:top">KELAS</td>`;
                html+=`<td style="vertical-align:top">:</td>`;
                html+=`<td style="border-bottom:.5pt dotted black;vertical-align:top">${idJenjang} (${terbilang(idJenjang)})</td>`;
            html +=`</tr>`;
            html +=`<tr>`;
                html+=`<td style="vertical-align:top">Tempat, Tanggal Lahir</td>`;
                html+=`<td style="vertical-align:top">:</td>`;
                html+=`<td style="border-bottom:.5pt dotted black;vertical-align:top"><span data-sksl="pd_tl"></span>, <span data-sksl="pd_tanggallahir"></span></td>`;
            html +=`</tr>`;
            html +=`<tr>`;
                html+=`<td style="vertical-align:top">Alamat</td>`;
                html+=`<td style="vertical-align:top">:</td>`;
                html+=`<td style="vertical-align:top;border-bottom:.5pt dotted black;vertical-align:top"><span data-sksl="pd_alamat"></span></td>`;
            html +=`</tr>`;
        html +=`</table>`;
    html +=`</div><br>`;
    html +=`<div style="text-align:justify;text-indent:30px">`;
    html +=`Adalah <b>Benar</b> nama tersebut di atas benar siswa ${idNamaSekolah} Tahun Pelajaran ${idTeksTapel}.<br><br>`;
    html +=`</div>`
    html +=`<div style="text-align:justify;text-indent:30px">`;
    html +=`Demikian surat keterangan ini kami di buat dengan sebenarnya untuk dapat di gunakan sebagaimana mestinya.`;
    html +=`</div><div style="clear:both"></div>`
    html +=`<div style="float:right;text-align:center;width:40%;margin:25px">`;
        html+=`Depok, <span class="isisurattitimangsa" contenteditable="true"></span><br>`;
        html+=`Kepala Sekolah<br>${idNamaSekolah}<br><br><br><br>`;
        html+=`<u><b>${idNamaKepsek}</b></u><br>`;
        html+=`NIP. ${idNipKepsek}`;
    html += `</div><div style="clear:both"></div>`;
    
    tempat_isi.innerHTML = html;
    document.querySelector(".isisurattitimangsa").innerHTML = tanggalfull(new Date());
        let obdatasiswa = jsondatasiswa[0];
        let elemenisi = document.querySelectorAll("[data-sksl]");
        for(let j = 0 ; j < elemenisi.length; j++){
            let key = elemenisi[j].getAttribute("data-sksl");
            let val = obdatasiswa[key];
            if(key == "pd_tanggallahir"){
                elemenisi[j].innerHTML = tanggalfull(val)
            }else if(key == "pd_alamat"){
                let RT = obdatasiswa.dapo_rt == ""?"":`, RT. ${obdatasiswa.dapo_rt}`;
                let RW = obdatasiswa.dapo_rw == ""?"":`/RW. ${obdatasiswa.dapo_rw}`;
                let KELURAHAN = obdatasiswa.dapo_rw == ""?"":`, Kel. ${obdatasiswa.dapo_rw}`;
                let KECAMATAN = obdatasiswa.dapo_rw == ""?"":`, Kec. ${obdatasiswa.dapo_rw}`;
                elemenisi[j].innerHTML = val + RT + RW + KELURAHAN + KECAMATAN
            }else{
                elemenisi[j].innerHTML = val
            }
        }
    elemenselect.onchange = function (e){
        let v = e.target.value;
        let obdatasiswa = jsondatasiswa[v];
        let elemenisi = document.querySelectorAll("[data-sksl]");
        for(let j = 0 ; j < elemenisi.length; j++){
            let key = elemenisi[j].getAttribute("data-sksl");
            let val = obdatasiswa[key];
            if(key == "pd_tanggallahir"){
                elemenisi[j].innerHTML = tanggalfull(val)
            }else if(key == "pd_alamat"){
                let RT = obdatasiswa.dapo_rt == ""?"":`, RT. ${obdatasiswa.dapo_rt}`;
                let RW = obdatasiswa.dapo_rw == ""?"":`/RW. ${obdatasiswa.dapo_rw}`;
                let KELURAHAN = obdatasiswa.dapo_rw == ""?"":`, Kel. ${obdatasiswa.dapo_rw}`;
                let KECAMATAN = obdatasiswa.dapo_rw == ""?"":`, Kec. ${obdatasiswa.dapo_rw}`;
                elemenisi[j].innerHTML = val + RT + RW + KELURAHAN + KECAMATAN
            }else{
                elemenisi[j].innerHTML = val
            }
        }
    }
    next_elemen.onclick = function (){
        if(elemenselect.value == (jsondatasiswa.length - 1)){
            alert("Siswa tidak ada lagi");
            return
        }else{
            elemenselect.selectedIndex++
        };
        let v = elemenselect.selectedIndex;
        let obdatasiswa = jsondatasiswa[v];
        let elemenisi = document.querySelectorAll("[data-sksl]");
        for(let j = 0 ; j < elemenisi.length; j++){
            let key = elemenisi[j].getAttribute("data-sksl");
            let val = obdatasiswa[key];
            if(key == "pd_tanggallahir"){
                elemenisi[j].innerHTML = tanggalfull(val)
            }else if(key == "pd_alamat"){
                let RT = obdatasiswa.dapo_rt == ""?"":`, RT. ${obdatasiswa.dapo_rt}`;
                let RW = obdatasiswa.dapo_rw == ""?"":`/RW. ${obdatasiswa.dapo_rw}`;
                let KELURAHAN = obdatasiswa.dapo_rw == ""?"":`, Kel. ${obdatasiswa.dapo_rw}`;
                let KECAMATAN = obdatasiswa.dapo_rw == ""?"":`, Kec. ${obdatasiswa.dapo_rw}`;
                elemenisi[j].innerHTML = val + RT + RW + KELURAHAN + KECAMATAN
            }else{
                elemenisi[j].innerHTML = val
            }
        }
    }

    prev_elemen.onclick = function () {
        if(elemenselect.value == 0){
            alert("Siswa Awal sudah tidak ada lagi.");
            return
        }else{
            elemenselect.selectedIndex--
        }
        let v = elemenselect.selectedIndex;
        let obdatasiswa = jsondatasiswa[v];
        let elemenisi = document.querySelectorAll("[data-sksl]");
        for(let j = 0 ; j < elemenisi.length; j++){
            let key = elemenisi[j].getAttribute("data-sksl");
            let val = obdatasiswa[key];
            if(key == "pd_tanggallahir"){
                elemenisi[j].innerHTML = tanggalfull(val)
            }else if(key == "pd_alamat"){
                let RT = obdatasiswa.dapo_rt == ""?"":`, RT. ${obdatasiswa.dapo_rt}`;
                let RW = obdatasiswa.dapo_rw == ""?"":`/RW. ${obdatasiswa.dapo_rw}`;
                let KELURAHAN = obdatasiswa.dapo_rw == ""?"":`, Kel. ${obdatasiswa.dapo_rw}`;
                let KECAMATAN = obdatasiswa.dapo_rw == ""?"":`, Kec. ${obdatasiswa.dapo_rw}`;
                elemenisi[j].innerHTML = val + RT + RW + KELURAHAN + KECAMATAN
            }else{
                elemenisi[j].innerHTML = val
            }
        }
    }

}
const suratketerangankelakuanbaik = ()=>{
    let  modal = document.getElementById("modalsuratsurat")
    modal.style.display = 'block';
    let tekskop = `PEMERINTAH DAERAH ${jlo.idkota.toUpperCase()} ${jlo.kota.toUpperCase()}`;
    document.querySelector(".kopsuratlainnyakota").innerHTML = tekskop;
    document.querySelector(".kopsuratlainnyanamasekolah").innerHTML = idNamaSekolah.toUpperCase();
    document.querySelector(".kopsuratlainnyaalamat1").innerHTML = teksalamat;
    let almat2 = `NPSN: 20228914 | NSS: 101026604052 | Surel: uptdsdnratujaya1@gmail.com | Web: www.sdnratujaya1.net | Kode Pos: 16445`;
    document.querySelector(".kopsuratlainnyaalamat2").innerHTML = almat2;
    let elemenselect = document.querySelector(".selectnama_modalsuratsurat");
    let next_elemen = document.querySelector(".next_modalsuratsurat");
    let prev_elemen = document.querySelector(".prev_modalsuratsurat");
    elemenselect.innerHTML ="";
    let ops = ``
    for(let i = 0 ; i < jsondatasiswa.length ; i++){
        ops +=`<option value="${i}">${jsondatasiswa[i].pd_nama}</option>`;
    }
    elemenselect.innerHTML =ops;

    let tempat_isi = document.querySelector(".isisuratlainnya");
    let html =``;
    html +=`<div style="padding:25px 2px;">`;
    html +=`<h5 style="text-align:center;font-weight:bold">`;
        html +=`<u>SURAT KETERANGAN BERKELAKUAN BAIK</u>`;
    html +=`</h5>`;
    html +=`<br><br>`;
        html +=`<div style="text-align:justify;text-indent:30px">`;
        html += `Yang bertanda tangan di bawah ini Kepala ${idNamaSekolah} menerangkan bahwa:<br><br>`;
        html +=`</div>`
        html +=`<table style="margin-left:30px">`;
            html +=`<tr>`;
                html+=`<td style="vertical-align:top">Nama</td>`;
                html+=`<td style="vertical-align:top">:</td>`;
                html+=`<td style="border-bottom:.5pt dotted black;width:70%" data-sksl="pd_nama"></td>`;
            html +=`</tr>`;
            html +=`<tr>`;
                html+=`<td style="vertical-align:top">Sekolah Asal</td>`;
                html+=`<td style="vertical-align:top">:</td>`;
                html+=`<td style="border-bottom:.5pt dotted black;vertical-align:top">${idNamaSekolah}</td>`;
            html +=`</tr>`;
            html +=`<tr>`;
                html+=`<td style="vertical-align:top">Alamat</td>`;
                html+=`<td style="vertical-align:top">:</td>`;
                html+=`<td style="border-bottom:.5pt dotted black;vertical-align:top">${teksalamat}</td>`;
            html +=`</tr>`;
            html +=`<tr>`;
                html+=`<td style="vertical-align:top">NIS/NISN</td>`;
                html+=`<td style="vertical-align:top">:</td>`;
                html+=`<td style="border-bottom:.5pt dotted black;vertical-align:top"><span data-sksl="nis"></span>/<span data-sksl="nisn"></span></td>`;
            html +=`</tr>`;
        html +=`</table>`;
    html +=`</div><br>`;
    html +=`<div style="text-align:justify;text-indent:30px">`;
    html +=`Dengan ini menjelaskan bahwa siswa yag tersebut namanya diatas adalah salah satu siswa di ${idNamaSekolah}, dan tidak pernah terlibat dan atau melakukan pelanggaran berat seperti Bullying, tawuran antar sekolah, merokok, LGBT, Seks Bebas, Pornography dan Narkoba selama mengikuti pembelajaran pada satuan pendidikan yang kami pimpin.<br><br>`;
    html +=`</div>`
    html +=`<div style="text-align:justify;text-indent:30px">`;
    html +=`Demikian surat keterangan ini kami di buat dengan sebenarnya untuk dapat di gunakan sebagaimana mestinya.`;
    html +=`</div><div style="clear:both"></div>`
    html +=`<div style="float:right;text-align:center;width:40%;margin:25px">`;
        html+=`Depok, <span class="isisurattitimangsa" contenteditable="true"></span><br>`;
        html+=`Kepala Sekolah<br>${idNamaSekolah}<br><br><br><br>`;
        html+=`<u><b>${idNamaKepsek}</b></u><br>`;
        html+=`NIP. ${idNipKepsek}`;
    html += `</div><div style="clear:both"></div>`;
    
    tempat_isi.innerHTML = html;
    document.querySelector(".isisurattitimangsa").innerHTML = tanggalfull(new Date());
        let obdatasiswa = jsondatasiswa[0];
        let elemenisi = document.querySelectorAll("[data-sksl]");
        for(let j = 0 ; j < elemenisi.length; j++){
            let key = elemenisi[j].getAttribute("data-sksl");
            let val = obdatasiswa[key];
            if(key == "pd_tanggallahir"){
                elemenisi[j].innerHTML = tanggalfull(val)
            }else{
                elemenisi[j].innerHTML = val
            }
        }
    elemenselect.onchange = function (e){
        let v = e.target.value;
        let obdatasiswa = jsondatasiswa[v];
        let elemenisi = document.querySelectorAll("[data-sksl]");
        for(let j = 0 ; j < elemenisi.length; j++){
            let key = elemenisi[j].getAttribute("data-sksl");
            let val = obdatasiswa[key];
            if(key == "pd_tanggallahir"){
                elemenisi[j].innerHTML = tanggalfull(val)
            }else{
                elemenisi[j].innerHTML = val
            }
        }
    }
    next_elemen.onclick = function (){
        if(elemenselect.value == (jsondatasiswa.length - 1)){
            alert("Siswa tidak ada lagi");
            return
        }else{
            elemenselect.selectedIndex++
        };
        let v = elemenselect.selectedIndex;
        let obdatasiswa = jsondatasiswa[v];
        let elemenisi = document.querySelectorAll("[data-sksl]");
        for(let j = 0 ; j < elemenisi.length; j++){
            let key = elemenisi[j].getAttribute("data-sksl");
            let val = obdatasiswa[key];
            if(key == "pd_tanggallahir"){
                elemenisi[j].innerHTML = tanggalfull(val)
            }else{
                elemenisi[j].innerHTML = val
            }
        }
    }

    prev_elemen.onclick = function () {
        if(elemenselect.value == 0){
            alert("Siswa Awal sudah tidak ada lagi.");
            return
        }else{
            elemenselect.selectedIndex--
        }
        let v = elemenselect.selectedIndex;
        let obdatasiswa = jsondatasiswa[v];
        let elemenisi = document.querySelectorAll("[data-sksl]");
        for(let j = 0 ; j < elemenisi.length; j++){
            let key = elemenisi[j].getAttribute("data-sksl");
            let val = obdatasiswa[key];
            if(key == "pd_tanggallahir"){
                elemenisi[j].innerHTML = tanggalfull(val)
            }else{
                elemenisi[j].innerHTML = val
            }
        }
    }

}


const kirimnilairaportkeinduk = (indekrow,el,tokensiswa,namatab)=>{
        let tekssebelumnya = el.innerHTML
        el.innerHTML = "<i class='fa fa-spin fa-spinner'></i> " +tekssebelumnya;
        let dataobjeksiswa = Object.assign({},jsondatasiswa.filter(s => s.id == tokensiswa)[0]);
        let dataobjeksiswainduk = dbsiswa_bukuinduk.filter(s => s.id == tokensiswa)[0]
        let datasiswadariinduk = Object.assign({},dataobjeksiswainduk);
        let datasiswaindukupdatedijsonsiswa = Object.assign(datasiswadariinduk, dataobjeksiswa)
        delete dataobjeksiswa.time_stamp
        delete datasiswadariinduk.time_stamp
        datasiswadariinduk.dieditoleh = namauser
        dataobjeksiswa.dieditoleh = namauser
        // console.log("jsonsiswakloning",dataobjeksiswa)
        // console.log("datainduk_ril",dataobjeksiswainduk)
        // console.log("datainduk_kloning",datasiswadariinduk)
        // console.log("datasiswaindukupdatedijsonsiswa",datasiswaindukupdatedijsonsiswa)
        // console.log("ril_dan_kloning = ", (JSON.stringify(dataobjeksiswa)==JSON.stringify(datasiswadariinduk)))
        let datakirimkedbinduk = new FormData();
        datakirimkedbinduk.append("action","updatedatabaseIndukUtama");
        datakirimkedbinduk.append("idsreadsheet",ss_induk);
            let keyy = Object.keys(datasiswaindukupdatedijsonsiswa);
            for (let i = 0; i < keyy.length; i++) {
                if(keyy[i].indexOf("tanggal")>-1||keyy[i].indexOf("tgl")>-1){
                    let tegl = datasiswaindukupdatedijsonsiswa[keyy[i]] ==""?"": StringTanggal2(new Date(datasiswaindukupdatedijsonsiswa[keyy[i]]))
                    datakirimkedbinduk.append(keyy[i], tegl);
                }else{
                    datakirimkedbinduk.append(keyy[i], datasiswaindukupdatedijsonsiswa[keyy[i]]);
                }
            }
            fetch(linkdatabaseinduk,{method:"post",body:datakirimkedbinduk})
            .then(m => m.json())
            .then(r =>{
                db_utama_siswa = r.all;
                console.log("Simpan ke db siswa berhasil di SS db induk")
            }).catch(er => {
                    console.log(er)
            });

        //cek key dbakun dan dbinduk
        // let keybeda = [];
        // let valobjek = []
        // let keyakun = Object.keys(dataobjeksiswa);
        // let keyinduk = Object.keys(dataobjeksiswainduk);
        // for(i = 0 ; i < keyinduk.length ; i++){
        //     let obs = {}
        //     if(dataobjeksiswa[keyinduk[i]]==undefined){
        //         keybeda.push(keyinduk[i])
        //     }
        //     if(typeof dataobjeksiswainduk[keyinduk[i]] == 'object') {
        //         obs.key = keyinduk[i]
        //         obs.val = dataobjeksiswainduk[keyinduk[i]];
        //         valobjek.push(obs)
        //     }
           
        // }
        // console.log(valobjek);
        let nilairaport = new FormData();
        let elemen = tabelraportmanual.querySelector("tbody").rows[parseInt(indekrow)].querySelectorAll("[data-keyraportindukmanual]");
        let ob = {};
        for(let j = 0 ; j < elemen.length; j++){
            let key = elemen[j].getAttribute("data-keyraportindukmanual");
            let val="";
                if(elemen[j].nodeName == "TD"){
                    // elemen[j].innerHTML = dataT[key]
                    val = elemen[j].innerText.replace(/(\r\n|\n|\r)/gm, " ");
                }else{
                    let inputan = elemen[j]
                    val = inputan.value;
                        // if(inputan.type == "date"){
                        //     val = new Date(inputan.value)
                        // // inputan.value = val ==""?"":StringTanggalnol(new Date(val));
                        // }else if(inputan.type =="select-one"){
                        //     val = inputan.value;
                        // }else{
                        //     val = inputan.value;
                        // }
                                
                }
            ob[key] = val;
            nilairaport.append(key,val);
           
            // if(typeof(val) === 'string') {
            //     ob[key] = val;
            // }else{
            //     ob[key] = JSON.stringify(val)
            //     console.log("not string", key,val)
            // }

            // // console.log(val, typeof val)
            // // ob.append(key,val)
        }
        
        let keywalas = prefix_stringkeyinduk+"NAMA_WALIKELAS";
        let nipwalas = prefix_stringkeyinduk+"NIP_WALIKELAS";
        let namakepsek = prefix_stringkeyinduk+"NAMA_KEPSEK";
        let nipkepsek = prefix_stringkeyinduk+"NIP_KEPSEK";
        nilairaport.append(keywalas, namauser);
        nilairaport.append(nipwalas, idNipGuruKelas);
        nilairaport.append(namakepsek, idNamaKepsek);
        nilairaport.append(nipkepsek, idNipKepsek);
        nilairaport.append("tokensiswa",tokensiswa);
        nilairaport.append("namatab",namatab);
        nilairaport.append("action","simpannilairarportinduk");
            //formulirkirim.innerHTML = `<div class="w3-center">Sedang mengirimkan data  ... <i class="fa fa-spin fa-spinner"></i></div>`;
            fetch(linkdatabaseinduk,{method:"post",body:nilairaport})
            .then(m => m.json())
            .then(r => {
                //formulirkirim.innerHTML = r.sukses;
                el.innerHTML = `Berhasil Terkirim`;
                setTimeout(() => {
                    el.innerHTML = tekssebelumnya;
                }, 2000);
                //el.setAttribute("onclick","alert('Berhasil Terkirim, silakan melanjutkan ke tahap selanjutnya')");
                console.log(r)
            }).catch(er => {
                //formulirkirim.innerHTML = `<div class="w3-center">Proses Gagal. Pesan server: ${er}</div>`;
                el.innerHTML = `Gagal`;
                //el.setAttribute("onclick","alert('Mohon maaf, terjadi kesalahan')");
            })
}

const tambahfituruploadimport = (kondisi)=>{
    let html="";
    let teksdefaultfinal = "";
    let teksdefaultolah = "";
    let fnolah = `onclick="panggilkompetensiaslibener('${kondisi}','')"`
    let fnfinalk3 = `onclick="fnmenumanual_k3()"`
    let fnfinalk4 = `onclick="fnmenumanual_k4()"`
    // if(statusolah != ""){
    //     teksdefaultolah = " (Tidak Tersedia)" ;
    //     fnolah =`onclick="alert('Database tidak tersedia, sistem akan coba melacak lagi');panggilkompetensiaslibener('${kondisi}','')"`
    // }
    // if(statusfinal != ""){
    //     teksdefaultfinal = " (Tidak Tersedia)" 
    //     fnfinalk3 =`onclick="alert('Database tidak tersedia, sistem akan coba melacak lagi');fnmenumanual_k3()"`
    //     fnfinalk4 =`onclick="alert('Database tidak tersedia, sistem akan coba melacak lagi');fnmenumanual_k4()"`
    // }
    
    html +=`<div class="w3-tiny w3-border w3-padding w3-center"><br>`;
    html +=`<button class="tangan w3-btn w3-pale-red w3-margin w3-round-xlarge w3-border" ${fnolah}>Nilai Olah${teksdefaultolah}</button>`
    if(kondisi == "k3"){
        html +=`<button class="tangan w3-btn w3-pale-blue w3-margin w3-round-xlarge w3-border" ${fnfinalk3}>Raport Final KI-3</button>`
    }else{
        html +=`<button class="tangan w3-btn w3-pale-blue w3-margin w3-round-xlarge w3-border"  ${fnfinalk4}>Raport Final KI-4</button>`
    }
    html +=`<button onclick="exporttabelmanual('${kondisi}')" class="tangan w3-btn w3-khaki w3-margin w3-round-xlarge w3-border" title="export ke Ms. Excel"><i class="fa fa-file-excel-o"></i> Export</button>`;
    html +=`<button onclick="importtabelmanual('${kondisi}')" class="tangan w3-btn w3-pale-green w3-margin w3-round-xlarge w3-border" title="Import ke Ms. Excel"><i class="fa fa-file-excel-o"></i> Import</button>`;
    html +=`<br>Perlu diperhatikan, dalam mengimport file urutan data nama harus sesuai dengan urutan daftar nama yang ada di dalam tabel ini.</div>`

    return html
}
const importtabelmanual = (kondisi) => {
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
                        prosesImportdataRaportManual(e.target.result, kondisi);
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
                        prosesImportdataRaportManual(data, kondisi);
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
const prosesImportdataRaportManual = (data, kondisi) =>{
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    console.log(excelRows);
    let koleksikeydariexcel = Object.values(excelRows[4]);
    koleksikeydariexcel.splice(-2,2)
    console.log(koleksikeydariexcel);
    let tabelrow = tabelraportmanual.querySelector("tbody").rows;
    for(i = 0 ; i < tabelrow.length ; i++){
        for(j = 0 ; j < koleksikeydariexcel.length;j++){
            let tekskey
            if(kondisi == "k3"){
                tekskey = `[data-keyraportindukmanual="${prefix_stringkeyinduk}${koleksikeydariexcel[j]}_P_NILAI"]`
            }else{
                tekskey = `[data-keyraportindukmanual="${prefix_stringkeyinduk}${koleksikeydariexcel[j]}_K_NILAI"]`
            }
            let elem = tabelrow[i].querySelector(tekskey);
            //console.log(excelRows[(i+6)],(j+3),Object.values(excelRows[(i+6)])[j+3])
            if(elem !==null){
                elem.value = Object.values(excelRows[(i+6)])[(j+3)];
                //console.log(tekskey,elem)
            }else{
                console.log(tekskey,elem)
                
            }
        }
        tabelrow[i].querySelector(`.jumlahnilai${kondisi}siswake_${i}`).value =Object.values(excelRows[(i+5)])[(koleksikeydariexcel.length+3)];
        tabelrow[i].querySelector(`.jumlahrerata${kondisi}siswake_${i}`).value =Object.values(excelRows[(i+5)])[(koleksikeydariexcel.length+4)];
    }   //jumlahreratak3siswake_0 reratanilaik3siswa
    // koleksikeydariexcel.splice(0,0,"no","id","namasiswa")
    // let arrayobjekok = [];
    // arrayobjekok = arrObjek(koleksikeydariexcel, excelRows.filter((k,i)=> i > 4 && i < jsondatasiswa.length + 5).map(m=>Object.values(m)))
    // console.log(arrayobjekok);
    for(k = 0 ; j < jsondatasiswa.length ; j++){
        kalkulasinilairaportmanual(kondisi,j)
    }

}
const exporttabelmanual = (kondisi) =>{
    let kodemapelaktif = buateditorkdaktif.filter(s => s.cekliskd3 == true || s.cekliskd4 == true).map(m => m.mapel).filter((x,i,a)=> a.indexOf(x)==i);
    let koleksimapeljadi = kodemapelaktif.filter(s => !(s =="PAI" || s == "PKATO" || s== "PKRIS" || s == "PHIND" || s == "PBUDH"));
    koleksimapeljadi.splice(0,0,"AGAMA");
    let arraykkm = koleksimapeljadi.filter(s => s !== "AGAMA").map(m => buateditorkdaktif.filter(ss => ss.mapel == m)[0].kkm)
    let kkmagama = buateditorkdaktif.filter(s => s.mapel =="PAI")[0].kkm;
    arraykkm.splice(0,0, kkmagama);

    let divto = document.getElementById("datasiswaprint");
    let tabelbayangan = document.createElement("table");
    tabelbayangan.setAttribute("id","tabelbayanganexport");
    let row = tabelbayangan.insertRow(-1);
    let sel = row.insertCell(-1);
    sel.setAttribute("colspan",koleksimapeljadi.length+5);
    sel.setAttribute("style","text-align:center;font-weight:bold");
    sel.innerHTML = "HASIL EXPORT DATA NILAI " + kondisi.toUpperCase() ;
    
    row = tabelbayangan.insertRow(-1);
    sel = row.insertCell(-1);
    sel.setAttribute("colspan",koleksimapeljadi.length+5);
    sel.setAttribute("style","text-align:center;font-weight:bold");
    sel.innerHTML = "KELAS " + idNamaKelas;

    row = tabelbayangan.insertRow(-1);
    sel = row.insertCell(-1);
    sel.setAttribute("colspan",koleksimapeljadi.length+5);
    sel.setAttribute("style","text-align:center;font-weight:bold");
    sel.innerHTML = "TAHUN PELAJARAN " + idTeksTapel +" SEMESTER " + idSemester;
    for(i = 0 ; i < 2 ; i++){
    }
        row = tabelbayangan.insertRow(-1);
        sel = row.insertCell(-1);
        sel.setAttribute("colspan",koleksimapeljadi.length+5);
        sel.setAttribute("style","text-align:center;font-weight:bold");
        sel.innerHTML = "";
    
        row = tabelbayangan.insertRow(-1);
        sel = row.insertCell(-1);
        sel.setAttribute("colspan",koleksimapeljadi.length+5);
        sel.setAttribute("style","text-align:center;font-weight:bold");
        sel.innerHTML = "Jika formula rumus Jumlah dan/atau Rangking bermasalah, coba Ubah pengaturan Wakt";
    
        row = tabelbayangan.insertRow(-1);
    sel = row.insertCell(-1);
    sel.setAttribute("style","text-align:center;font-weight:bold");
    sel.setAttribute("rowspan","3");
    sel.innerHTML = "No.";

    sel = row.insertCell(-1);
    sel.setAttribute("style","text-align:center;font-weight:bold");
    sel.setAttribute("rowspan","3");
    sel.innerHTML = "Id"

    sel = row.insertCell(-1);
    sel.setAttribute("style","text-align:center;font-weight:bold");
    sel.setAttribute("rowspan","3");
    sel.innerHTML = "Nama Siswa"

    sel = row.insertCell(-1);
    sel.setAttribute("style","text-align:center;font-weight:bold");
    sel.setAttribute("colspan",koleksimapeljadi.length+2);
    if(kondisi == "k3"){
        sel.innerHTML = "NILAI KOMPETENSI PENGETAHUAN (KI-3)"
    }else{
        sel.innerHTML = "NILAI KOMPETENSI KETERAMPILAN (KI-4)"
    }

    row = tabelbayangan.insertRow(-1);
    for(i = 0 ; i < koleksimapeljadi.length ; i++){
        sel = row.insertCell(-1);
        sel.setAttribute("style","text-align:center");
        sel.innerHTML = koleksimapeljadi[i]
    }

    sel = row.insertCell(-1);
    sel.setAttribute("style","text-align:center");
    sel.setAttribute("rowspan","2");
    sel.innerHTML = "Jumlah";
    
    sel = row.insertCell(-1);
    sel.setAttribute("style","text-align:center");
    sel.setAttribute("rowspan","2");
    sel.innerHTML = "Rangking";
    
    row = tabelbayangan.insertRow(-1);
    for(i = 0 ; i < arraykkm.length ; i++){
        sel = row.insertCell(-1);
        sel.setAttribute("style","text-align:center");
        sel.innerHTML = arraykkm[i]
    }
    //kkmagama
    let quer = tabelraportmanual.querySelector("tbody").rows;
    let tquer = prefix_stringkeyinduk
    for(i = 0 ; i < jsondatasiswa.length ; i++){
        row = tabelbayangan.insertRow(-1);
        sel = row.insertCell(-1);
        sel.innerHTML = (i+1);
        
        
        sel = row.insertCell(-1);
        sel.innerHTML = jsondatasiswa[i].id;
        
       
        sel = row.insertCell(-1);
        sel.innerHTML = jsondatasiswa[i].pd_nama;

        for(j = 0 ; j < koleksimapeljadi.length ; j++){
            sel = row.insertCell(-1);
            sel.setAttribute("style","text-align:center");
            if(kondisi == "k3"){
                sel.innerHTML = quer[i].querySelector(`[data-keyraportindukmanual="${prefix_stringkeyinduk}${koleksimapeljadi[j]}_P_NILAI"]`).value;
            }else{
                sel.innerHTML = quer[i].querySelector(`[data-keyraportindukmanual="${prefix_stringkeyinduk}${koleksimapeljadi[j]}_K_NILAI"]`).value;
            }

        }
        let colsel = (i + 9);
        let colomrata = koleksimapeljadi.length+4;
        let hurufrangking = (colomrata+9).toString(36).toUpperCase();
        sel = row.insertCell(-1);
        sel.innerHTML =`=SUM(OFFSET(D${colsel};0;0;1;${koleksimapeljadi.length}))`;
        sel = row.insertCell(-1);
        sel.innerHTML =`=RANK(${hurufrangking}${colsel};OFFSET(${hurufrangking}9;0;0;${jsondatasiswa.length};1))`;;
        //hurufrangking+" "+colsel +" "+ colomrata;//
        
        
    }

        

    divto.appendChild(tabelbayangan)
    $("#tabelbayanganexport").table2excel({

        name: "Worksheet Name",
        filename: "FILE EXPORT REKAP MANUAL "+ kondisi  + new Date().getTime(),
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