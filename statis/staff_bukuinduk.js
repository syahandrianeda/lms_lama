let statusaktifsiswa = ["aktif","nonaktif","lulus","pindah","meninggaldunia"];
let dbsiswa_bukuinduk=[]; // semua datasiswa baik lulus, aktif, nonaktif, punya nis ataupun tidak,
let dbinduk_siswaaktif= [];
let dbinduk_siswanonaktif= [];
let dbinduk_siswalulus = [];
let dbinduk_siswapindah = []; // siswa yang keluar karena pindah
let dbinduk_nisduplikat =[];
let dbinduk_koleksibukuinduk = [];
let dbinduk_nisaneh = []

let dbinduk_siswapindahan = [];// siswa yang masuk sebagai siswa pindahan
let dbinduk_tidakpunyainduk = []; // data siswa yang isian dbsiswanya == ""
// let dbbukuinduk_punyainduk = []; // data siswa yang isian dbsiswanya !== ""
// let dbbukuinduk_siswapindahan = []; // data siswa yang punya nomor induk xxxx02xx
// let dbbukuinduk_siswaasal = []; // data siswa yang punya nomor induk xxxx02xx
// let dbbukuinduk_koleksibukuinduk = [];// 1617, 1718, dst ...

const divbukuinduk_infoawal = document.querySelector(".informasiawaldatabasebukuinduk");
const divbukuinduk_ketinfoawal = document.querySelector(".keteranganinforekapinduk");
const divbukuinduk_koleksi = document.querySelector(".divbukuinduk_koleksibukuinduk");
const divbukuinduk_koleksibukuindukperkelas = document.querySelector(".koleksibukuindukperkelas");
const divbukuinduk_previewbukuinduk = document.querySelector(".previewbukuinduk");

let data = new FormData();
data.append("idbaris","2")
const alldatabukuinduk = ()=>{
    if (db_utama_siswa.length == 0){
        alert("Data belum siap, Mohon bersabar ...")
        return
    }
    fetch(linkdatabaseinduk+"?action=alldatabasebukuindukpost",{method:"post",body:data})
    .then(m => m.json())
    .then(r => {
        dbsiswa_bukuinduk = r.all;
        dbinduk_siswaaktif = dbsiswa_bukuinduk.filter(s => s.aktif == "aktif");//r.aktif;
        dbinduk_siswanonaktif = dbsiswa_bukuinduk.filter(s => s.aktif == "non-aktif");
        dbinduk_siswalulus = dbsiswa_bukuinduk.filter(s => s.aktif == "lulus");//r.lulus;
        dbinduk_siswapindah = dbsiswa_bukuinduk.filter(s => s.aktif == "pindah");//r.pindah;
        dbinduk_nisduplikat = dbsiswa_bukuinduk.filter(s => s.nis !=="").map(m => m.nis).filter((x,i,a)=> a.indexOf(x) !==i).map(mm => dbsiswa_bukuinduk.filter(ss => ss.nis == mm));//r.nisduplikat;
        dbinduk_tidakpunyainduk = dbsiswa_bukuinduk.filter(s => s.nis =="");//r.niskosong;//dbsiswa_bukuinduk.filter(s => s.nis == "");
        dbinduk_nisaneh = dbsiswa_bukuinduk.filter(s => s.nis !=="").filter(m => m.nis.match(/(\D+)/)!==null || m.nis.length !== 9);
        dbinduk_siswapindahan = dbsiswa_bukuinduk.filter(s => s.nis !=="" && s.nis.toString().substring(4,6) !=="01");
        dbinduk_koleksibukuinduk = dbsiswa_bukuinduk.filter(s => s.nis !=="").map(m => m.nis.toString().substring(0,4)).filter((x,i,a) => a.indexOf(x) == i);
        let totalangkatan = dbsiswa_bukuinduk.filter(s => s.angkatan !=="").map(m => m.angkatan).filter((x,i,a)=> a.indexOf(x) == i).sort((a,b)=> a-b);
        dbinduk_koleksibukuinduk.sort();
        let html = ``;
        //html += `Database Buku Induk ini adalah database yang mencatat data mengenai data induk siswa beberapa tahun. Berikut ini, adalah Rekapitulasi Database Buku Induk:`;
        html += `<table class="w3-table garis w3-small w3-white">`;
        html += `<tr class="w3-light-grey"><td colspan="2" class="w3-center">Database Sistem</td></tr>`;
        html += `<tr><td>Total Data</td><td>${dbsiswa_bukuinduk.length} Siswa</td></tr>`;
        html += `<tr class="w3-light-grey"><td colspan="2" class="w3-center">Database Keaktifan</td></tr>`;
        html += `<tr><td>Total Siswa Aktif<sup>(1)</sup></td><td colspan="2">${dbinduk_siswaaktif.length} Siswa</td></tr>`;
        html += `<tr><td>Total Siswa Nonaktif<sup>(2)</sup></td><td>${dbinduk_siswanonaktif.length} Siswa</td></tr>`;
        html += `<tr><td>Total Siswa Lulus<sup>(3)</sup></td><td>${totalangkatan.length} Angkatan<br>${dbinduk_siswalulus.length} Siswa</td></tr>`;
        html += `<tr><td>Total Siswa Pindah<sup>(4)</sup></td><td>${dbinduk_siswapindah.length} Siswa</td></tr>`;
        html += `<tr><td>Total Siswa Pindahan <sup>(5)</sup></td><td>${dbinduk_siswapindahan.length} Siswa</td></tr>`;
        html +=`</table>`;
        html += `<table class="w3-table garis w3-small w3-white">`;
        html += `<tr class="w3-light-grey"><td colspan="2" class="w3-center"> Mutasi Siswa</td></tr>`
        html +=`<tr><td>Cek Siswa Pindahan<sup>(6)</sup></td><td>`;
        html +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk('pindahan','')">CEK</button>`;
        html +=`</td></tr>`;
        if(dbinduk_siswanonaktif.length !== 0){
            html +=`<tr><td>Cek Siswa Nonaktif <sup>(7)</sup></td><td>`;
            html +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk('non-aktif','')">CEK</button>`;
            html +=`</td></tr>`;
        }
        if(dbinduk_siswalulus.length !== 0){
            html +=`<tr><td>Cek Siswa Lulus <sup>(8)</sup></td><td>`;
            html +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk('lulus','')">CEK</button>`;
            html +=`</td></tr>`;
        }
        if(dbinduk_siswapindah.length !== 0){
            html +=`<tr><td>Cek Siswa Pindah (Keluar) <sup>(9)</sup></td><td>`;
            html +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk('pindah','')">CEK</button>`;
            html +=`</td></tr>`;
        }
        
        html +=`</table>`;
        
        

        divbukuinduk_infoawal.innerHTML = html;

        let html0 = `<table class="w3-table garis w3-white w3-small">`;
        html0 += `<tr class="w3-light-gray"><td colspan="3" class="w3-center">Koleksi Buku Induk</td></tr>`;
        html0 +=`<tr><td colspan="3" class="w3-center">`;
        for(let i = 0 ; i < dbinduk_koleksibukuinduk.length ; i++){
            html0 +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk('daftarisiinduk', '${dbinduk_koleksibukuinduk[i]}')">${dbinduk_koleksibukuinduk[i]}</button>`;
        }
        html0 += `</td></tr>`;
        
        // html0 +=`<tr><td>Murid Pindahan</td><td>${dbinduk_siswapindahan.length} Siswa</td><td>`;
        // html0 +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk(' ')">CEK</button>`;
        // html0 +=`</td></tr>`

        html0 += `<tr class="w3-light-gray"><td colspan="3" class="w3-center">Invalid Buku Induk</td></tr>`;
        if(dbinduk_tidakpunyainduk.length == 0){
            html0 +=`<tr><td colspan="3" class="w3-center">Semua Siswa memiliki NIS</td></tr>`;
        }else{
            html0 += `<tr><td>Tidak Punya NIS</td><td>${dbinduk_tidakpunyainduk.length} Siswa</td><td>`;
            html0 +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk('nis-kosong','')">CEK</button>`;
            html0 +=`</td></tr>`;
        }
        if(dbinduk_nisduplikat.length == 0){
            html0 += `<tr><td>NIS Ganda</td><td>Tidak ditemukan NIS Ganda</td><td></td></tr>`
        }else{
            html0 += `<tr><td>NIS Ganda</td><td>${dbinduk_nisduplikat.length} Nomor</td><td>`;
            html0 +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk('nis-ganda','')">CEK</button>`;
            html0 +=`</td></tr>`
        }
        if(dbinduk_nisaneh.length !== 0){
            html0 +=`<tr><td>NIS Salah</td><td>${dbinduk_nisaneh.length} Nomor</td><td>`;
            html0 +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk('nis-salah','')">CEK</button>`;
            html0+=`</td></tr>`
        }

        html0 += `</table>`;
        divbukuinduk_koleksi.innerHTML = html0;
        
        // divbukuinduk_ketinfoawal.innerHTML = html1;
        let html2  =`<table class="w3-table garis w3-white w3-small">`
        html2 += `<tr class="w3-light-gray"><td colspan="2" class="w3-center">Buku Induk Kelas Terakhir Tapel ${idTeksTapel}</td></tr>`;
        let txtAwal = idTeksTapel.split("/")[0].substring(2,4);
        let txtAkhir = idTeksTapel.split("/")[1].substring(2,4);
        let n_txtawal = parseInt(txtAwal);
        let n_txtAkhir = parseInt(txtAkhir);
        for(let j = 0 ; j < 6 ; j++){   
            html2 +=`<tr><td>Kelas ${j+1}</td><td>${n_txtawal-j}${n_txtAkhir-j}</td></tr>`;
            //html0 +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk(' ')">CEK</button>`;
            
        }
        html2 +=`</table>`
        divbukuinduk_ketinfoawal.innerHTML = html2;
        // console.log(r)
        // console.log(r.all.length)
        // console.log(r.aktif.length)
        // console.log(r.lulus)
        // console.log(r.pindah)
        let html3 = "";
        html3 += `<div class="w3-center w3-tiny">Keterangan:</div>`;
        html3 += `<ol>`;
        html3 += `<li class="w3-tiny"> Total Siswa Aktif adalah siswa yang aktif dan berada di sekolah untuk tahun ajaran saat ini</li>`
        html3 += `<li class="w3-tiny"> Total Siswa Nonaktif adalah siswa yang tidak aktif di sekolah Anda. Siswa nonaktif bisa saja siswa yang tidak dapat teridentifikasi ketidakaktifannya. Baik itu, pindah, lulus, meninggal dunia, atau DO </li>`;
        html3 += `<li class="w3-tiny"> Total Siswa Lulus adalah siswa yang telah menyelesaikan pendidikan di sekolah ini (lulus)</li>`;
        html3 += `<li class="w3-tiny"> Total Siswa Pindah adalah <b>siswa yang telah keluar</b> dan berpindah sekolah.</li>`;
        html3 += `<li class="w3-tiny"> Total Siswa Pindahan adalah siswa yang masuk di sekolah ini. Data diambil dari kode NIS</li>`;
        html3 += `<li class="w3-tiny"> Jika muncul tombol <b>Cek Siswa Pindahan</b>, maka Anda dapat melihat dan menmperbarui data NIS-nya ke database (Database Utama dan Database Buku Induk)</li>`;
        html3 += `<li class="w3-tiny"> Jika muncul tombol <b>Cek Siswa Nonaktif</b>, maka Anda dapat melihat dan menmperbarui data NIS-nya dari data siswa yang dinonaktifkan. Data Siswa Nonaktif adalah data siswa yang tidak aktif dalam kegiatan pendidikan di sekolah ini. Umumnya siswa nonaktif karena beberapa hal:`;
        html3 += `<ul><li class="w3-tiny">Siswa belum diperbarui ke-nonaktifannya di database buku Induk</li>`;
        html3 += `<li class="w3-tiny">Siswa belum diisi keterangan dia nonaktif. Umumnya karena pindah, meninggal dunia, atau D.O. (bukan siswa yang telah lulus)</li>`
        html3 += `<li class="w3-tiny">Siswa nonaktif disarankan untuk diisi keaktifannya dengan kriteria: pindah, meninggal dunia, atau D.O</li>`
        html3 +=`</ul>`;
        html3 +=`</li>`;
        html3 += `<li class="w3-tiny">Cek Siswa yang telah pindah.</li>`;
        html3 +=`</ol>`;
        divbukuinduk_koleksibukuindukperkelas.innerHTML = html3;
    })
}

const dbutamasiswa = (id) =>{
    let df = db_utama_siswa.filter(s => s.id == id);
    let db = df.length>0?db_utama_siswa.filter(s => s.id == id)[0]:dbsiswa_bukuinduk.filter(s => s.id == id)[0];//:{"jenjang":"db lama","nama_rombel":"rombel_lama"};
    let cb = {};
    cb.jenjangsaatini = db.jenjang;
    cb.rombelkelassaatini = db.nama_rombel;
    cb.nis = db.nis;
    return cb;

}
const ngapainsihlu = document.getElementById("ngapainsihlu");
const aksieditinduk = (kondisi, kodeinduk)=>{
    let html = "";
    let db
    if(kondisi == "daftarisiinduk"){
        db = dbsiswa_bukuinduk.filter(s => s.nis !=="" && s.nis.toString().substring(0,4) == kodeinduk)
        html = html_daftarisiinduk(kodeinduk,db);
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
const html_daftarisiinduk = (kodeinduk,db) =>{
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
                sel_lulus += `<td>Pindah Tgl ${urutannis[i].keluar_tgl ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl))}</td>`;
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
                        // html += `<td>${parseInt(urutannis[i].nis.substring(4,6))}</td>`;
                        // html +=`<td>${urutannis[i].aktif}</td>`;
                        html += sel_ket
                        html += `<td>${urutannis[i].id}</td></tr>`;
            // html +=`<tr>`;
            // html +=`<td class="w3-center">${i+1}</td>`;
            // html +=`<td>${urutannis[i].nis}</td>`;
            // html +=`<td>${urutannis[i].aktif}</td>`
            // html +=`<td>${urutannis[i].pd_nama}</td>`
            // if(urutannis[i].aktif == "lulus"){
            //     html +=`<td>Lulus</td>`
            //     html +=`<td class="w3-tiny">Lulus Tgl ${urutannis[i].keluar_tgl ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl))}</td>`
            // }else if(urutannis[i].aktif == "pindah"){
            //     html +=`<td>Pindah Tgl ${urutannis[i].keluar_tgl ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl))}</td>`
            //     html +=`<td class="w3-small">Lengkapi Data Cek Siswa Pindah</td>`
            // }else if(urutannis[i].aktif == "non-aktif"){
            //     html +=`<td class="w3-center">${urutannis[i].nama_rombel}</td>`
            //     html +=`<td class="w3-tiny">Kelas sebelumnya<br>Tidak diketahui</td>`
            // }else{
            //     html +=`<td class="w3-center">${dbutamasiswa(urutannis[i].id).rombelkelassaatini}</td>`;
            //     html +=`<td></td>`;
            // }
            //     html += `<td>${urutannis[i].id}</td></tr>`;
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
                // if(siganda.length>0){
                //     html +=`<td class="w3-center" rowspan="${siganda.length}">${i+1}</td>`;
                // }else{
                    // }
                // html +=`<td class="w3-center">${i+1}</td>`;
                // html +=`<td>${urutannis[i].nis}</td>`;
                // html +=`<td>${urutannis[i].aktif}</td>`
                // html +=`<td>${urutannis[i].pd_nama}</td>`
                // if(urutannis[i].aktif == "lulus"){
                //     html +=`<td>Lulus</td>`
                //     html +=`<td class="w3-tiny">Lulus Tgl ${urutannis[i].keluar_tgl ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl))}</td>`
                // }else if(urutannis[i].aktif == "pindah"){
                //     html +=`<td>Pindah Tgl ${urutannis[i].keluar_tgl ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl))}</td>`
                //     html +=`<td class="w3-small">Lengkapi Data Cek Siswa Pindah</td>`
                // }else if(urutannis[i].aktif == "non-aktif"){
                //     html +=`<td class="w3-center">${urutannis[i].nama_rombel}</td>`;
                //     html +=`<td class="w3-tiny">Kelas sebelumnya<br>Tidak diketahui</td>`;
                // }else{
                //     html +=`<td class="w3-center">${dbutamasiswa(urutannis[i].id).rombelkelassaatini}</td>`;
                //     if(sianeh.length > 0 || siganda.length > 0){
                //         html+=`<td>${sianeh.length !==0?"NIS Salah":""}${siganda.length !==0?"NIS Ganda":""}</td>`
                //     }else{
                //         html +=`<td></td>`;
                //     }
                // }
                // html += `<td>${urutannis[i].id}</td></tr>`;
                let sel_lulus = "", sel_ket = "", sel_btn ="";
                        if(urutannis[i].aktif == "lulus"){
                            sel_lulus +=`<td class="w3-center">${dbutamasiswa(urutannis[i].id).rombelkelassaatini}<br>Lulus</td>`;
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
                        // html += `<td>${parseInt(urutannis[i].nis.substring(4,6))}</td>`;
                        // html +=`<td>${urutannis[i].aktif}</td>`;
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
                            sel_lulus += `<td>Pindah Tgl ${urutannis[i].keluar_tgl ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl))}</td>`
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
                    //html +=`<td class="w3-center"><button class="tangan" onclick="PerbaruidataInduk(false,${urutannis[i].id})" title="update Data Induk"><i class="fa fa-edit"></i></button></button></td>`;
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
                        // html += `<td>${parseInt(urutannis[i].nis.substring(4,6))}</td>`;
                        // html +=`<td>${urutannis[i].aktif}</td>`;
                        html += sel_ket
                        html += `<td>${urutannis[i].id}</td></tr>`;
                    // html +=`<td class="w3-center">${i+1}</td>`;
                    // html +=`<td>${urutannis[i].nis}</td>`;
                    // html +=`<td>${urutannis[i].aktif}</td>`
                    // html +=`<td>${urutannis[i].pd_nama}</td>`
                    // if(urutannis[i].aktif == "lulus"){
                    //     html +=`<td>Lulus</td>`
                    //     html +=`<td class="w3-tiny">Lulus Tgl ${urutannis[i].keluar_tgl ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl))}</td>`
                    // }else if(urutannis[i].aktif == "pindah"){
                    //     html +=`<td>Pindah Tgl ${urutannis[i].keluar_tgl ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl))}</td>`
                    //     html +=`<td class="w3-small">Lengkapi Data Cek Siswa Pindah</td>`
                    // }else if(urutannis[i].aktif == "non-aktif"){
                    //     html +=`<td class="w3-center">${urutannis[i].nama_rombel}</td>`
                    //     html +=`<td class="w3-tiny">Kelas sebelumnya<br>Tidak diketahui</td>`
                    // }else{
                    //     html +=`<td class="w3-center">${dbutamasiswa(urutannis[i].id).rombelkelassaatini}</td>`;
                    //     if(siganda.length > 0){
                    //         html +=`<td>NIS Ganda</td>`;
                    //     }else{
                    //         html +=`<td></td>`;
                    //     }
                    // }
                    //html += `<td>${urutannis[i].id}</td></tr>`;
                }
                html +=`</tbody></table></div>`;
            }else{
                html = `<h3 class="w3-center">Daftar Isi Buku Induk ${kodeinduk}</h3>`;
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
                            sel_lulus += `<td>Pindah Tgl ${urutannis[i].keluar_tgl ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl))}</td>`
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
                         ///======================================
                         ///======================================
                        // html +=`<tr>`;
                        // html +=`<td class="w3-center">${nourut}</td>`;
                        // html +=`<td>${urutannis[i].nis}</td>`;
                        // html +=`<td>${urutannis[i].aktif}</td>`
                        // html +=`<td>${urutannis[i].pd_nama}</td>`
                        // if(urutannis[i].aktif == "lulus"){
                        //     html +=`<td>Lulus</td>`
                        //     html +=`<td class="w3-tiny">Lulus Tgl ${urutannis[i].keluar_tgl ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl))}</td>`
                        // }else if(urutannis[i].aktif == "pindah"){
                        //     html +=`<td>Pindah Tgl ${urutannis[i].keluar_tgl ==""?"Belum diisi":tanggalfull(new Date(urutannis[i].keluar_tgl))}</td>`
                        //     html +=`<td class="w3-small">Lengkapi Data Cek Siswa Pindah</td>`
                        // }else if(urutannis[i].aktif == "non-aktif"){
                        //     html +=`<td class="w3-center">${urutannis[i].nama_rombel}</td>`
                        //     html +=`<td class="w3-tiny">Kelas sebelumnya<br>Tidak diketahui</td>`
                        // }else{
                        //     html +=`<td class="w3-center">${dbutamasiswa(urutannis[i].id).rombelkelassaatini}</td>`;
                        //     html +=`<td></td>`;
                        // }
                        // html += `<td>${urutannis[i].id}</td></tr>`;
                        // ///======================================
                        nourut++
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
            html +=`<td>${db[i].keluar_tgl ==""?"":tanggalfull(new Date(db[i].keluar_tgl))}</td>`
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
const printadm = (c,portr=true) =>{
    //jaga-jaga untuk element class yang duplikat?
    let dom = document.querySelector("."+c);
    let indom = dom.innerHTML.replace(/<table class="w3-table garis w3-tiny">/g,`<table class="w3-table garis w3-small">`);//.textContent;
    
    let noSpace =indom.replace(/(\r\n|\n|\r)/gm, "").replace(/       /g,"");
    
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
    
    body.innerHTML="";
    if(c == "formulirkirim"){
        let dupp = document.querySelector("."+c);
        let dup= dupp.cloneNode(true);
        let cariinput = dup.querySelectorAll("[data-dbindukutama]"); 
        console.log(cariinput.length);
        if(cariinput !== null || cariinput !== undefined){
            for(let i = 0 ; i < cariinput.length ; i++){
                if(cariinput[i].type == "date"){
                    var v = cariinput[i].value==""?"":tanggalfull(cariinput[i].value);
                    var mySpan = document.createElement("span");
                    mySpan.innerHTML = v;
                    let td = cariinput[i].parentNode;
                    cariinput[i].parentNode.replaceChild(mySpan, cariinput[i]);
                }else if(cariinput[i].type == "select-one"){
                    let o = cariinput[i].options;
                    let s = o.selectedIndex;
                    let v = o[s].value;
                    var mySpan = document.createElement("span");
                    mySpan.innerHTML = v;
                    let td = cariinput[i].parentNode;
                    cariinput[i].parentNode.replaceChild(mySpan, cariinput[i]);
                }else{
                    var v = cariinput[i].value;
                    var mySpan = document.createElement("span");
                    mySpan.innerHTML = v;
                    let td = cariinput[i].parentNode;
                    cariinput[i].parentNode.replaceChild(mySpan, cariinput[i]);
                }
            }
        }
        body.appendChild(dup);
    }else{
        body.innerHTML = indom;//noSpace;
    }

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();
}

const modaledit_bukuinduk = document.querySelector("#modal_editnomorinduk");
const judulmodal_editnomorinduk = document.querySelector(".judulmodal_editnomorinduk");
const men_induk_info = document.querySelector(".men_induk_info");
const menu_editinduk = document.querySelector(".menu-editinduk");
const formulirkirim = document.querySelector(".formulirkirim");
const tempattombol_formulirkirim = document.querySelector(".tempattombol_formulirkirim");
const footer_editnomorinduk = document.querySelector(".footer_editnomorinduk");

const tambahdbsiswabukuinduk = (kodeinduk) =>{
    //alert(kodeinduk);
    modaledit_bukuinduk.style.display = "block";
    menu_editinduk.innerHTML = "";
    men_induk_info.innerHTML = "Mohon cek dulu seluruh data siswa yang tidak memiliki NIS, NIS ganda, atau NIS salah."
}

const html_elemenkirim = (tokensiswa)=>{
    let html ="";
    return html
}
const html_tombolupdateindukSALAH = (tokensiswa)=>{ // hanya berlaku jika siswa aktif dan ga bermasalah
    let html ="";
    footer_editnomorinduk.innerHTML ="<br>";
    let hasil ={};
    hasil.boolean = false;
    
    let dbakun = db_utama_siswa.filter(s => s.id == tokensiswa)[0];
    let dbinduk = dbsiswa_bukuinduk.filter(s => s.id == tokensiswa)[0];
    let riwayattapel = dbinduk.riwayat_tapel == ""?[]:JSON.parse(dbinduk.riwayat_tapel);
    
    let shortTapel = idTeksTapel.substring(2,4)+idTeksTapel.substring(7,9)
    let intShorttapel = parseInt(shortTapel);
    let duatapel = parseInt(idTeksTapel.substring(2,4)); // 2 awal dari Tapel 2021/2022 => 21
    
    let s_kelas = parseInt(dbutamasiswa(tokensiswa).jenjangsaatini); // kelas siswa saat ini dari db utama, patokannya dikurangi 1
    let k_kelas = parseInt(dbutamasiswa(tokensiswa).jenjangsaatini)-1; // kelas siswa saat ini dari db utama, patokannya dikurangi 1
    let utama_nis = dbutamasiswa(tokensiswa).nis; // Nis siswa utama full => contoh: 161701008 
    let k_nis = parseInt(utama_nis.substring(0,2)); //Nis siswa utama dua angka awal => contoh: 161701008 --> 16
    let selisih = duatapel - k_nis;
    let countLoop = s_kelas;
    
    if(k_kelas == selisih ){
    
        html +=`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button>`;
        //tapel sekarang = intSho
        if(dbakun.nis.substring(4,6) == "01"){

            if(idSemester == 2){
                html +=`<button onclick="showdserverinduk('${intShorttapel}','2')" class="w3-pale-red tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${s_kelas} Semester 2</button>`;
                html +=`<button onclick="showdserverinduk('${intShorttapel}','1')" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${s_kelas} Semester 1</button>`;
            }else{
                html +=`<button onclick="showdserverinduk('${intShorttapel}','1')" class="w3-pale-red tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${s_kelas} Semester 1</button>`;
            }
            for(let i  = 1 ; i <= selisih ; i ++){
                let pengurang = i * 101;
                let kura = i;
                html +=`<button onclick="showdserverinduk('${intShorttapel-pengurang}','2')" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${s_kelas-kura} Semester 2</button>`;
                html +=`<button onclick="showdserverinduk('${intShorttapel-pengurang}','1')" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${s_kelas-kura} Semester 1</button>`;
            }
        }else{
            let cek = riwayattapel;//.filter(s => s.tapel == intShorttapel);
            html +=`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button>`;
            let tapelsekarang = riwayattapel.filter(s => s.tapel == intShorttapel);
            if(tapelsekarang.length == 0){
                
                if(idTeksTapel == 2){
                    html +=`<button onclick="showdserverinduk('${cek[i].tapel}','2')" class="w3-pale-red w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 2</button>`;
                    html +=`<button onclick="showdserverinduk('${cek[i].tapel}','1')" class="w3-yellow w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 1</button>`;
                }else{

                    html +=`<button onclick="showdserverinduk('${cek[i].tapel}','1')" class="w3-pale-red w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 1</button>`;
                }
            }
            for(let i  = 0 ; i < cek.length ; i ++){
                if(cek[i].kelas !==""){
                    if(cek[i].tapel == intShorttapel ){
                        if(idTeksTapel == 2){
                            html +=`<button onclick="showdserverinduk('${cek[i].tapel}','2')" class="w3-pale-red w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 2</button>`;
                            html +=`<button onclick="showdserverinduk('${cek[i].tapel}','1')" class="w3-yellow w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 1</button>`;
                        }else{
                            html +=`<button onclick="showdserverinduk('${cek[i].tapel}','1')" class="w3-pale-red w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 1</button>`;
                        }
                    }else{
                        html +=`<button onclick="showdserverinduk('${cek[i].tapel}','2')" class="w3-yellow w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 2</button>`;
                        html +=`<button onclick="showdserverinduk('${cek[i].tapel}','1')" class="w3-yellow w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 1</button>`;

                    } 
                } 
            }
            html +=`<button class="w3-pale-blue w3-bottombar w3-border-black tangan" onclick="riwayatkenaikankelas('${tokensiswa}')" style="padding:5px;font-size:10px;border-radius:10px">Lihat Riwayat Kelas</button>`;
            
        }

    }else if(k_kelas > selisih){
        if(dbakun.nis.substring(4,6) == "01"){
            html +=`Ananda ${dbakun.pd_nama} terdeteksi sebagai siswa pindahan<br>`;
            html +=`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button>`;
            if(idSemester == 2){
                html +=`<button onclick="showdserverinduk('${intShorttapel}','2')" class="w3-pale-red tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${s_kelas} Semester 2</button>`;
                html +=`<button onclick="showdserverinduk('${intShorttapel}','1')" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${s_kelas} Semester 1</button>`;
            }else{
                html +=`<button onclick="showdserverinduk('${intShorttapel}','1')" class="w3-pale-red tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${s_kelas} Semester 1</button>`;
            }
            countLoop = selisih ;//s_kelas - selisih;
            for(let i  = 1 ; i <= countLoop ; i ++){
                let pengurang = i * 101;
                let kura = i;
                html +=`<button onclick="showdserverinduk('${intShorttapel-pengurang}','2')" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${s_kelas-kura} Semester 2</button>`;
                html +=`<button onclick="showdserverinduk('${intShorttapel-pengurang}','1')" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${s_kelas-kura} Semester 1</button>`;
            }
        }else{
            let cek = riwayattapel;//.filter(s => s.tapel == intShorttapel);
            html +=`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button>`;
            let tapelsekarang = riwayattapel.filter(s => s.tapel == intShorttapel);
            if(tapelsekarang.length == 0){
                
                if(idTeksTapel == 2){
                    html +=`<button onclick="showdserverinduk('${cek[i].tapel}','2')" class="w3-pale-red w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 2</button>`;
                    html +=`<button onclick="showdserverinduk('${cek[i].tapel}','1')" class="w3-yellow w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 1</button>`;
                }else{

                    html +=`<button onclick="showdserverinduk('${cek[i].tapel}','1')" class="w3-pale-red w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 1</button>`;
                }
            }
            for(let i  = 0 ; i < cek.length ; i ++){
                if(cek[i].kelas !==""){
                    if(cek[i].tapel == intShorttapel ){
                        if(idTeksTapel == 2){
                            html +=`<button onclick="showdserverinduk('${cek[i].tapel}','2')" class="w3-pale-red w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 2</button>`;
                            html +=`<button onclick="showdserverinduk('${cek[i].tapel}','1')" class="w3-yellow w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 1</button>`;
                        }else{
                            html +=`<button onclick="showdserverinduk('${cek[i].tapel}','1')" class="w3-pale-red w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 1</button>`;
                        }
                    }else{
                        html +=`<button onclick="showdserverinduk('${cek[i].tapel}','2')" class="w3-yellow w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 2</button>`;
                        html +=`<button onclick="showdserverinduk('${cek[i].tapel}','1')" class="w3-yellow w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 1</button>`;

                    } 
                } 
            }
            html +=`<button class="w3-pale-blue w3-bottombar w3-border-black tangan" onclick="riwayatkenaikankelas('${tokensiswa}')" style="padding:5px;font-size:10px;border-radius:10px">Lihat Riwayat Kelas</button>`;
            
        }
    }else if(k_kelas < selisih){
        //temp = `siswa tinggal kelas`;
        // console.log(k_kelas, selisih)
        countLoop =  selisih;
        //html +=`Ananda ${dbakun.pd_nama} terdeteksi memiliki riwayat tidak naik kelas<br>`;
        //html +=`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button>`;
        if(riwayattapel.length == 0){
            html +=`Mohon lengkapi dahulu riwayat keberadaan jenjang siswa ini di tiap-tiap tahun pelajaran.`;
            html += `<table class="w3-table garis w3-tiny" style="width:350px;margin:15px auto"><thead><tr class="w3-light-grey"><th>Tahun Pelajaran</th><th>Kelas</th><th>Semester</th></tr></thead><tbody>`
            html +=`<tr><td>${idTeksTapel}<br>(Saat ini)</td><td><input type="number" min="1" max="6" class="w3-input w3-border" data-riwayat_tapel="${intShorttapel}" value="${s_kelas}"></td><td>`;
            if(idSemester == 2){

                html +=`<label for="cekbox_semester_${intShorttapel}1"><input type="checkbox" name="cekbox_semester_${intShorttapel}" id="cekbox_semester_${intShorttapel}1" checked value="1"> 1</label><br>`;
                html +=`<label for="cekbox_semester_${intShorttapel}2"><input type="checkbox" name="cekbox_semester_${intShorttapel}" id="cekbox_semester_${intShorttapel}2" checked value="2"> 2</label>`;
            }else{
                html +=`<label for="cekbox_semester_${intShorttapel}1"><input type="checkbox" name="cekbox_semester_${intShorttapel}" id="cekbox_semester_${intShorttapel}1" checked value="1"> 1</label><br>`;
            }
            
            html +=`</td></tr>`;
            for(let i  = 0 ; i <countLoop ; i ++){
                let pengurang = (i+1) * 101;
                let tapeljalan = intShorttapel-pengurang;
                let tekstapel = "20"+tapeljalan.toString().substring(0,2)+"/20"+tapeljalan.toString().substring(2,4);
                
                html +=`<tr><td>${tekstapel}</td><td><input type="number" min="1" max="6" class="w3-input w3-border" data-riwayat_tapel="${tapeljalan}"></td><td>`;
                html +=`<label for="cekbox_semester_${tapeljalan}1"><input type="checkbox" name="cekbox_semester_${tapeljalan}" id="cekbox_semester_${tapeljalan}1" checked value="1"> 1</label><br>`;
                html +=`<label for="cekbox_semester_${tapeljalan}2"><input type="checkbox" name="cekbox_semester_${tapeljalan}" id="cekbox_semester_${tapeljalan}2" checked value="2"> 2</label>`;
                html +=`</td></tr>`
            }
            html +=`</tbody></table>`;
            footer_editnomorinduk.innerHTML = `<div class="w3-small w3-center">Tabel di atas muncul karena sistem mendeteksi adanya perhitungan riwayat kenaikan kelas. Jika pendeteksian ini kurang tepat, perbaiki nomor Induk agar sesuai dengan perhitungan sistem.<br><button onclick="htmlbuatperbaikinomorinduk('${tokensiswa}')">Perbaiki Nomor Induk Siswa (NIS)</button></div>`
            hasil.boolean = true;
        }else{
            let cek = riwayattapel;//.filter(s => s.tapel == intShorttapel);
            html +=`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button>`;
            let tapelsekarang = riwayattapel.filter(s => s.tapel == intShorttapel);
            if(tapelsekarang.length == 0){
                
                if(idTeksTapel == 2){
                    html +=`<button onclick="showdserverinduk('${cek[i].tapel}','2')" class="w3-pale-red w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 2</button>`;
                    html +=`<button onclick="showdserverinduk('${cek[i].tapel}','1')" class="w3-yellow w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 1</button>`;
                }else{

                    html +=`<button onclick="showdserverinduk('${cek[i].tapel}','1')" class="w3-pale-red w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 1</button>`;
                }
            }
            for(let i  = 0 ; i < cek.length ; i ++){
                if(cek[i].kelas !==""){
                    if(cek[i].tapel == intShorttapel ){
                        if(idTeksTapel == 2){
                            html +=`<button onclick="showdserverinduk('${cek[i].tapel}','2')" class="w3-pale-red w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 2</button>`;
                            html +=`<button onclick="showdserverinduk('${cek[i].tapel}','1')" class="w3-yellow w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 1</button>`;
                        }else{
                            html +=`<button onclick="showdserverinduk('${cek[i].tapel}','1')" class="w3-pale-red w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 1</button>`;
                        }
                    }else{
                        html +=`<button onclick="showdserverinduk('${cek[i].tapel}','2')" class="w3-yellow w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 2</button>`;
                        html +=`<button onclick="showdserverinduk('${cek[i].tapel}','1')" class="w3-yellow w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 1</button>`;

                    } 
                } 
            }
            html +=`<button class="w3-pale-blue w3-bottombar w3-border-black tangan" onclick="riwayatkenaikankelas('${tokensiswa}')" style="padding:5px;font-size:10px;border-radius:10px">Lihat Riwayat Kelas</button>`;
            
        }
    }
    hasil.html = html;   
    return hasil;
}

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
            console.log(r);
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
const html_utamabukuinduk = (r) =>{
    dbsiswa_bukuinduk = [];
    dbsiswa_bukuinduk = r.all;
        dbinduk_siswaaktif = dbsiswa_bukuinduk.filter(s => s.aktif == "aktif");//r.aktif;
        dbinduk_siswanonaktif = dbsiswa_bukuinduk.filter(s => s.aktif == "non-aktif");
        dbinduk_siswalulus = dbsiswa_bukuinduk.filter(s => s.aktif == "lulus");//r.lulus;
        dbinduk_siswapindah = dbsiswa_bukuinduk.filter(s => s.aktif == "pindah");//r.pindah;
        dbinduk_nisduplikat = dbsiswa_bukuinduk.filter(s => s.nis !=="").map(m => m.nis).filter((x,i,a)=> a.indexOf(x) !==i).map(mm => dbsiswa_bukuinduk.filter(ss => ss.nis == mm));//r.nisduplikat;
        dbinduk_tidakpunyainduk = dbsiswa_bukuinduk.filter(s => s.nis =="");//r.niskosong;//dbsiswa_bukuinduk.filter(s => s.nis == "");
        dbinduk_nisaneh = dbsiswa_bukuinduk.filter(s => s.nis !=="").filter(m => m.nis.match(/(\D+)/)!==null || m.nis.length !== 9);
        dbinduk_siswapindahan = dbsiswa_bukuinduk.filter(s => s.nis !=="" && s.nis.toString().substring(4,6) !=="01");
        dbinduk_koleksibukuinduk = dbsiswa_bukuinduk.filter(s => s.nis !=="").map(m => m.nis.toString().substring(0,4)).filter((x,i,a) => a.indexOf(x) == i);
        let totalangkatan = dbsiswa_bukuinduk.filter(s => s.angkatan !=="").map(m => m.angkatan).filter((x,i,a)=> a.indexOf(x) == i).sort((a,b)=> a-b);
        dbinduk_koleksibukuinduk.sort();
        let html = ``;
        //html += `Database Buku Induk ini adalah database yang mencatat data mengenai data induk siswa beberapa tahun. Berikut ini, adalah Rekapitulasi Database Buku Induk:`;
        html += `<table class="w3-table garis w3-small w3-white">`;
        html += `<tr class="w3-light-grey"><td colspan="2" class="w3-center">Database Sistem</td></tr>`;
        html += `<tr><td>Total Data</td><td>${dbsiswa_bukuinduk.length} Siswa</td></tr>`;
        html += `<tr class="w3-light-grey"><td colspan="2" class="w3-center">Database Keaktifan</td></tr>`;
        html += `<tr><td>Total Siswa Aktif<sup>(1)</sup></td><td colspan="2">${dbinduk_siswaaktif.length} Siswa</td></tr>`;
        html += `<tr><td>Total Siswa Nonaktif<sup>(2)</sup></td><td>${dbinduk_siswanonaktif.length} Siswa</td></tr>`;
        html += `<tr><td>Total Siswa Lulus<sup>(3)</sup></td><td>${totalangkatan.length} Angkatan<br>${dbinduk_siswalulus.length} Siswa</td></tr>`;
        html += `<tr><td>Total Siswa Pindah<sup>(4)</sup></td><td>${dbinduk_siswapindah.length} Siswa</td></tr>`;
        html += `<tr><td>Total Siswa Pindahan <sup>(5)</sup></td><td>${dbinduk_siswapindahan.length} Siswa</td></tr>`;
        html +=`</table>`;
        html += `<table class="w3-table garis w3-small w3-white">`;
        html += `<tr class="w3-light-grey"><td colspan="2" class="w3-center"> Mutasi Siswa</td></tr>`
        html +=`<tr><td>Cek Siswa Pindahan<sup>(6)</sup></td><td>`;
        html +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk('pindahan','')">CEK</button>`;
        html +=`</td></tr>`;
        if(dbinduk_siswanonaktif.length !== 0){
            html +=`<tr><td>Cek Siswa Nonaktif <sup>(7)</sup></td><td>`;
            html +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk('non-aktif','')">CEK</button>`;
            html +=`</td></tr>`;
        }
        if(dbinduk_siswalulus.length !== 0){
            html +=`<tr><td>Cek Siswa Lulus <sup>(8)</sup></td><td>`;
            html +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk('lulus','')">CEK</button>`;
            html +=`</td></tr>`;
        }
        if(dbinduk_siswapindah.length !== 0){
            html +=`<tr><td>Cek Siswa Pindah (Keluar) <sup>(9)</sup></td><td>`;
            html +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk('pindah','')">CEK</button>`;
            html +=`</td></tr>`;
        }
        
        html +=`</table>`;
        
        

        divbukuinduk_infoawal.innerHTML = html;

        let html0 = `<table class="w3-table garis w3-white w3-small">`;
        html0 += `<tr class="w3-light-gray"><td colspan="3" class="w3-center">Koleksi Buku Induk</td></tr>`;
        html0 +=`<tr><td colspan="3" class="w3-center">`;
        for(let i = 0 ; i < dbinduk_koleksibukuinduk.length ; i++){
            html0 +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk('daftarisiinduk', '${dbinduk_koleksibukuinduk[i]}')">${dbinduk_koleksibukuinduk[i]}</button>`;
        }
        html0 += `</td></tr>`;
        
        // html0 +=`<tr><td>Murid Pindahan</td><td>${dbinduk_siswapindahan.length} Siswa</td><td>`;
        // html0 +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk(' ')">CEK</button>`;
        // html0 +=`</td></tr>`

        html0 += `<tr class="w3-light-gray"><td colspan="3" class="w3-center">Invalid Buku Induk</td></tr>`;
        if(dbinduk_tidakpunyainduk.length == 0){
            html0 +=`<tr><td colspan="3" class="w3-center">Semua Siswa memiliki NIS</td></tr>`;
        }else{
            html0 += `<tr><td>Tidak Punya NIS</td><td>${dbinduk_tidakpunyainduk.length} Siswa</td><td>`;
            html0 +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk('nis-kosong','')">CEK</button>`;
            html0 +=`</td></tr>`;
        }
        if(dbinduk_nisduplikat.length == 0){
            html0 += `<tr><td>NIS Ganda</td><td>Tidak ditemukan NIS Ganda</td><td></td></tr>`
        }else{
            html0 += `<tr><td>NIS Ganda</td><td>${dbinduk_nisduplikat.length} Nomor</td><td>`;
            html0 +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk('nis-ganda','')">CEK</button>`;
            html0 +=`</td></tr>`
        }
        if(dbinduk_nisaneh.length !== 0){
            html0 +=`<tr><td>NIS Salah</td><td>${dbinduk_nisaneh.length} Nomor</td><td>`;
            html0 +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk('nis-salah','')">CEK</button>`;
            html0+=`</td></tr>`
        }

        html0 += `</table>`;
        divbukuinduk_koleksi.innerHTML = html0;
        
        // divbukuinduk_ketinfoawal.innerHTML = html1;
        let html2  =`<table class="w3-table garis w3-white w3-small">`
        html2 += `<tr class="w3-light-gray"><td colspan="2" class="w3-center">Buku Induk Kelas Terakhir Tapel ${idTeksTapel}</td></tr>`;
        let txtAwal = idTeksTapel.split("/")[0].substring(2,4);
        let txtAkhir = idTeksTapel.split("/")[1].substring(2,4);
        let n_txtawal = parseInt(txtAwal);
        let n_txtAkhir = parseInt(txtAkhir);
        for(let j = 0 ; j < 6 ; j++){   
            html2 +=`<tr><td>Kelas ${j+1}</td><td>${n_txtawal-j}${n_txtAkhir-j}</td></tr>`;
            //html0 +=`<button class="w3-btn w3-yellow w3-bottombar w3-border-black w3-padding w3-round-large" style="margin:3px" onclick="aksieditinduk(' ')">CEK</button>`;
            
        }
        html2 +=`</table>`
        divbukuinduk_ketinfoawal.innerHTML = html2;
        // console.log(r)
        // console.log(r.all.length)
        // console.log(r.aktif.length)
        // console.log(r.lulus)
        // console.log(r.pindah)
        let html3 = "";
        html3 += `<div class="w3-center w3-tiny">Keterangan:</div>`;
        html3 += `<ol>`;
        html3 += `<li class="w3-tiny"> Total Siswa Aktif adalah siswa yang aktif dan berada di sekolah untuk tahun ajaran saat ini</li>`
        html3 += `<li class="w3-tiny"> Total Siswa Nonaktif adalah siswa yang tidak aktif di sekolah Anda. Siswa nonaktif bisa saja siswa yang tidak dapat teridentifikasi ketidakaktifannya. Baik itu, pindah, lulus, meninggal dunia, atau DO </li>`;
        html3 += `<li class="w3-tiny"> Total Siswa Lulus adalah siswa yang telah menyelesaikan pendidikan di sekolah ini (lulus)</li>`;
        html3 += `<li class="w3-tiny"> Total Siswa Pindah adalah <b>siswa yang telah keluar</b> dan berpindah sekolah.</li>`;
        html3 += `<li class="w3-tiny"> Total Siswa Pindahan adalah siswa yang masuk di sekolah ini. Data diambil dari kode NIS</li>`;
        html3 += `<li class="w3-tiny"> Jika muncul tombol <b>Cek Siswa Pindahan</b>, maka Anda dapat melihat dan menmperbarui data NIS-nya ke database (Database Utama dan Database Buku Induk)</li>`;
        html3 += `<li class="w3-tiny"> Jika muncul tombol <b>Cek Siswa Nonaktif</b>, maka Anda dapat melihat dan menmperbarui data NIS-nya dari data siswa yang dinonaktifkan. Data Siswa Nonaktif adalah data siswa yang tidak aktif dalam kegiatan pendidikan di sekolah ini. Umumnya siswa nonaktif karena beberapa hal:`;
        html3 += `<ul><li class="w3-tiny">Siswa belum diperbarui ke-nonaktifannya di database buku Induk</li>`;
        html3 += `<li class="w3-tiny">Siswa belum diisi keterangan dia nonaktif. Umumnya karena pindah, meninggal dunia, atau D.O. (bukan siswa yang telah lulus)</li>`
        html3 += `<li class="w3-tiny">Siswa nonaktif disarankan untuk diisi keaktifannya dengan kriteria: pindah, meninggal dunia, atau D.O</li>`
        html3 +=`</ul>`;
        html3 +=`</li>`;
        html3 += `<li class="w3-tiny">Cek Siswa yang telah pindah.</li>`;
        html3 +=`</ol>`;
        divbukuinduk_koleksibukuindukperkelas.innerHTML = html3;
}
const riwayatkenaikankelas = (tokensiswa)=>{
    //let divisi = menu_editinduk;//.innerHTML = menu;
    formulirkirim.innerHTML = "";
    let db = dbsiswa_bukuinduk.filter(s => s.id == tokensiswa)[0];
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
            html +=`<tr><td>${tekstapel}</td><td><input value="${v}" disabled type="number" min="1" max="6" class="w3-input w3-border" data-riwayat_tapel="${tapeljalan}"></td><td>`;
            html +=`<label for="cekbox_semester_${tapeljalan}1"><input type="checkbox" disabled name="cekbox_semester_${tapeljalan}" class="disablecheckbox" id="cekbox_semester_${tapeljalan}1" value="1">1</label><br>`;
            html +=`<label for="cekbox_semester_${tapeljalan}2"><input type="checkbox" disabled name="cekbox_semester_${tapeljalan}" class="disablecheckbox" id="cekbox_semester_${tapeljalan}2" value="2">2</label>`;;
        
   
        html +=`</td></tr>`;
    }
            html +=`</tbody></table><div id="tombolsementarariwayat" class="w3-center">Klik tombol Edit untuk mengedit isian<br>`;
            html +=`<button class="tangan sementarasimpanriwayat w3-hide" onclick="simpanserverinduk(this,'single','${tokensiswa}')">Update Riwayat</button>`
            html +=`<button class="tangan" onclick="PerbaruidataInduk('aktif','${tokensiswa}')">Kembali</button>`;
            html +=`</div>`;
    menu_editinduk.innerHTML = html;
    footer_editnomorinduk.innerHTML = `<div class="w3-small w3-center">Tabel di atas muncul karena sistem mendeteksi adanya perhitungan riwayat kenaikan kelas. Jika pendeteksian ini kurang tepat, perbaiki nomor Induk agar sesuai dengan perhitungan sistem.<br><button onclick="htmlbuatperbaikinomorinduk('${tokensiswa}')">Perbaiki Nomor Induk Siswa (NIS)</button></div>`
            
    for(l  = 0 ; l <ar_riwayat.length; l ++){
        let tapeljalan = ar_riwayat[l].tapel;
        let sms = ar_riwayat[l].semester;//JSON.parse(ar_riwayat[i].semester);//ar_riwayat[i].semester;// JSON.parse(ar_riwayat[i].semester);
        for(n = 0 ; n < sms.length ; n++){
            let teksid =`cekbox_semester_${tapeljalan}${sms[n]}`
            document.getElementById(teksid).checked = true;
        }
    }

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
const htmlbuatperbaikinomorinduk = (tokensiswa)=>{
    let html ="";
    let db = dbsiswa_bukuinduk.filter(s => s.id == tokensiswa)[0];
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
const html_tombolupdatelulusan = (tokensiswa)=>{ // hanya berlaku jika siswa aktif dan ga bermasalah
    let html ="";
    footer_editnomorinduk.innerHTML ="<br>";
    let hasil ={};
    hasil.boolean = false;
    
    let dbakun = dbsiswa_bukuinduk.filter(s => s.id == tokensiswa)[0];
    let dbinduk = dbsiswa_bukuinduk.filter(s => s.id == tokensiswa)[0];
    let riwayattapel = dbinduk.riwayat_tapel == ""?[]:JSON.parse(dbinduk.riwayat_tapel);
    let tapelterakhirlulus = (new Date(dbinduk.keluar_tgl).getFullYear()-1)+"/"+(new Date(dbinduk.keluar_tgl).getFullYear());
   
    let shortTapel = tapelterakhirlulus.substring(2,4)+tapelterakhirlulus.substring(7,9)
    let intShorttapel = parseInt(shortTapel);
    let duatapel = parseInt(tapelterakhirlulus.substring(2,4)); // 2 awal dari Tapel 2021/2022 => 21
    
    let s_kelas = 6;//parseInt(dbutamasiswa(tokensiswa).jenjangsaatini); // kelas siswa saat ini dari db utama, patokannya dikurangi 1
    let k_kelas = 5;//parseInt(dbutamasiswa(tokensiswa).jenjangsaatini)-1; // kelas siswa saat ini dari db utama, patokannya dikurangi 1
    let utama_nis = dbutamasiswa(tokensiswa).nis; // Nis siswa utama full => contoh: 161701008 
    let k_nis = parseInt(utama_nis.substring(0,2)); //Nis siswa utama dua angka awal => contoh: 161701008 --> 16
    let selisih = duatapel - k_nis;
    let countLoop = s_kelas;
    
    if(k_kelas == selisih ){
    
        html +=`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button>`;
        //tapel sekarang = intSho
            html +=`<button onclick="showdserverinduk('${intShorttapel}','2')" class="w3-pale-red tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${s_kelas} Semester 2</button>`;
            html +=`<button onclick="showdserverinduk('${intShorttapel}','1')" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${s_kelas} Semester 1</button>`;
        
        for(let i  = 1 ; i <= selisih ; i ++){
            let pengurang = i * 101;
            let kura = i;
            html +=`<button onclick="showdserverinduk('${intShorttapel-pengurang}','2')" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${s_kelas-kura} Semester 2</button>`;
            html +=`<button onclick="showdserverinduk('${intShorttapel-pengurang}','1')" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${s_kelas-kura} Semester 1</button>`;
        }

    }else if(k_kelas > selisih){
        html +=`Ananda ${dbakun.pd_nama} terdeteksi sebagai siswa pindahan<br>`;
        html +=`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button>`;
            html +=`<button onclick="showdserverinduk('${intShorttapel}','2')" class="w3-pale-red tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${s_kelas} Semester 2</button>`;
            html +=`<button onclick="showdserverinduk('${intShorttapel}','1')" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${s_kelas} Semester 1</button>`;
        
        countLoop = selisih ;//s_kelas - selisih;
        for(let i  = 1 ; i <= countLoop ; i ++){
            let pengurang = i * 101;
            let kura = i;
            html +=`<button onclick="showdserverinduk('${intShorttapel-pengurang}','2')" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${s_kelas-kura} Semester 2</button>`;
            html +=`<button onclick="showdserverinduk('${intShorttapel-pengurang}','1')" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${s_kelas-kura} Semester 1</button>`;
        }
    }else if(k_kelas < selisih){
        //temp = `siswa tinggal kelas`;
        // console.log(k_kelas, selisih)
        countLoop =  selisih;
        html +=`Ananda ${dbakun.pd_nama} terdeteksi memiliki riwayat tidak naik kelas<br>`;
        //html +=`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button>`;
        if(riwayattapel.length == 0){
            html +=`Mohon lengkapi dahulu riwayat keberadaan jenjang siswa ini di tiap-tiap tahun pelajaran.`;
            html += `<table class="w3-table garis w3-tiny" style="width:350px;margin:15px auto"><thead><tr class="w3-light-grey"><th>Tahun Pelajaran</th><th>Kelas</th><th>Semester</th></tr></thead><tbody>`
            html +=`<tr><td>${tapelterakhirlulus}<br>(Saat ini)</td><td><input type="number" min="1" max="6" class="w3-input w3-border" data-riwayat_tapel="${intShorttapel}" value="${s_kelas}"></td><td>`;
        
                html +=`<label for="cekbox_semester_${intShorttapel}1"><input type="checkbox" name="cekbox_semester_${intShorttapel}" id="cekbox_semester_${intShorttapel}1" checked value="1"> 1</label><br>`;
                html +=`<label for="cekbox_semester_${intShorttapel}2"><input type="checkbox" name="cekbox_semester_${intShorttapel}" id="cekbox_semester_${intShorttapel}2" checked value="2"> 2</label>`;
            
            html +=`</td></tr>`;
            for(let i  = 0 ; i <countLoop ; i ++){
                let pengurang = (i+1) * 101;
                let tapeljalan = intShorttapel-pengurang;
                let tekstapel = "20"+tapeljalan.toString().substring(0,2)+"/20"+tapeljalan.toString().substring(2,4);
                
                html +=`<tr><td>${tekstapel}</td><td><input type="number" min="1" max="6" class="w3-input w3-border" data-riwayat_tapel="${tapeljalan}"></td><td>`;
                html +=`<label for="cekbox_semester_${tapeljalan}1"><input type="checkbox" name="cekbox_semester_${tapeljalan}" id="cekbox_semester_${tapeljalan}1" checked value="1"> 1</label><br>`;
                html +=`<label for="cekbox_semester_${tapeljalan}2"><input type="checkbox" name="cekbox_semester_${tapeljalan}" id="cekbox_semester_${tapeljalan}2" checked value="2"> 2</label>`;
                html +=`</td></tr>`
            }
            html +=`</tbody></table>`;
            footer_editnomorinduk.innerHTML = `<div class="w3-small w3-center">Tabel di atas muncul karena sistem mendeteksi adanya perhitungan riwayat kenaikan kelas. Jika pendeteksian ini kurang tepat, perbaiki nomor Induk agar sesuai dengan perhitungan sistem.<br><button onclick="htmlbuatperbaikinomorinduk('${tokensiswa}')">Perbaiki Nomor Induk Siswa (NIS)</button></div>`
            hasil.boolean = true;
        }else{
            let cek = riwayattapel;//.filter(s => s.tapel == intShorttapel);
            html +=`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button>`;
            let tapelsekarang = riwayattapel.filter(s => s.tapel == intShorttapel);
            if(tapelsekarang.length == 0){
                
                if(tapelterakhirlulus == 2){
                    html +=`<button onclick="showdserverinduk('${cek[i].tapel}','2')" class="w3-pale-red w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 2</button>`;
                    html +=`<button onclick="showdserverinduk('${cek[i].tapel}','1')" class="w3-yellow w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 1</button>`;
                }else{

                    html +=`<button onclick="showdserverinduk('${cek[i].tapel}','1')" class="w3-pale-red w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 1</button>`;
                }
            }
            for(let i  = 0 ; i < cek.length ; i ++){
                if(cek[i].kelas !==""){
                    if(cek[i].tapel == intShorttapel ){
                        if(tapelterakhirlulus == 2){
                            html +=`<button onclick="showdserverinduk('${cek[i].tapel}','2')" class="w3-pale-red w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 2</button>`;
                            html +=`<button onclick="showdserverinduk('${cek[i].tapel}','1')" class="w3-yellow w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 1</button>`;
                        }else{
                            html +=`<button onclick="showdserverinduk('${cek[i].tapel}','1')" class="w3-pale-red w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 1</button>`;
                        }
                    }else{
                        html +=`<button onclick="showdserverinduk('${cek[i].tapel}','2')" class="w3-yellow w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 2</button>`;
                        html +=`<button onclick="showdserverinduk('${cek[i].tapel}','1')" class="w3-yellow w3-bottombar w3-border-black tangan" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${cek[i].kelas} Semester 1</button>`;
                    } 
                } 
            }
            html +=`<button class="w3-pale-blue w3-bottombar w3-border-black tangan" onclick="riwayatkenaikankelas('${tokensiswa}')" style="padding:5px;font-size:10px;border-radius:10px">Lihat Riwayat Kelas</button>`;
            
        }
    }
    hasil.html = html;   
    return hasil
}
const showdserverinduk =(kondisi, angka, smstr = 1) =>{
    if(kondisi == "identitas"){
        page_bukuinduk_identitas(angka)
    }else{
        alert("tapel "+ kondisi +", tokensiswa"+ angka +", Semester " + smstr);
    }
    document.getElementById('modal_editnomorinduk').scrollTo({ top: document.querySelector('.formulirkirim').offsetTop-43, behavior: 'smooth' })
}
const page_bukuinduk_identitas = (token) =>{
    let db = db_utama_siswa.filter(s => s.id == token).length == 0?dbsiswa_bukuinduk.filter(s => s.id == token)[0]:db_utama_siswa.filter(s => s.id == token)[0];
    let dbinduk = dbsiswa_bukuinduk.filter(s => s.id == token)[0];
    let koleksipoto = dbinduk.koleksi_potoinduk == ""?[]:JSON.parse(dbinduk.koleksi_potoinduk);
    let syarat = syarat_riwayatkelas(token);
    let nourut = db.nis ==""?"xx":parseInt(db.nis.substring(6,9));
    let html ="";//`<div style="width:595px;margin:0 auto">`;
    html +=`<h4 style="text-align:center">LEMBAR BUKU INDUK REGISTER</h4><br>`;
    html +=`<table style="width:98%;margin:5px auto;border-collapse:collapse;border-spacing:0;font-size:12px">`;
    html +=`<tr><td style="width:30%;padding:2px 5px">NOMOR INDUK SEKOLAH</td><td style="width:1px;vertical-align:top">:</td>`;
    html +=`<td style="width:20%;padding:2px 5px;vertical-align:top"><input data-dbindukutama="nis"  type="text" style="border: none transparent;outline: none;width:100%"></td><td colspan="2"></td>`;
    html +=`<td style="width:15%;padding:2px 5px;text-align:center;border:.5pt solid black">NOMOR URUT</td></tr>`;
    html +=`<tr><td style="width:30%;padding:2px 5px;vertical-align:top">NOMOR INDUK SISWA NASIONAL</td><td style="width:1px;vertical-align:top">:</td>`
    html +=`<td style="padding:2px 5px;vertical-align:top"><input data-dbindukutama="nisn"  type="text" style="border: none transparent;outline: none;width:100%"></td>`;
    html +=`<td colspan="2"></td><td rowspan="3" style="font-size:16px;text-align:center;vertical-align:middle;border:.5pt solid black">${nourut}</td></tr>`;
    html +=`<tr><td colspan="6"></td></tr><tr><td colspan="6"></td></tr></table>`;
    html +=`<table style="width:98%;margin:5px auto;border-collapse:collapse;border-spacing:0;font-size:12px">`;
    html +=`<tr><td style="vertical-align:top"><b>A.</b></td><td colspan="6" style="padding:2px 5px;vertical-align:top"><b>KETERANGAN SISWA</b></td><td style="width:13%"></td></tr>`;
    html +=`<tr><td rowspan="26"></td>`;
        html +=`<td style="padding:2px 1px;vertical-align:top">1.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Nama Murid</td><td></td><td style="width:58%;padding:2px 5px 2px 5px;"></td><td></td>`;
        //poto
        if(koleksipoto.length == 0){
            html +=`<td rowspan="5" title="klik 2 kali untuk menambahkan poto" style="cursor:pointer;border:.5pt solid black;text-align:center;font-size:8px;padding:2px 5px" ondblclick="tambahkanpotoinduk(this)"><img src="/img/lamaso.webp" style="width:2cm;height:2.4cm" class="srcpotoinduksiswa w3-hide-small"><br>Cap tiga jari tengah kiri mengenai pas poto</td></tr>`;
        }else{
            let urlimg = koleksipoto[0] !=undefined?`https://drive.google.com/uc?export=view&id=${koleksipoto[0]}`:`/img/lamaso.webp`;
            html +=`<td rowspan="5" title="klik 2 kali untuk menambahkan poto" style="cursor:pointer;border:.5pt solid black;text-align:center;font-size:8px;padding:2px 5px" ondblclick="tambahkanpotoinduk(this)"><img src="/img/lamaso.webp" style="width:2cm;height:2.4cm" class="srcpotoinduksiswa w3-hide-small"><br>Cap tiga jari tengah kiri mengenai pas poto</td></tr>`;
        }

    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">a.</td><td style="width:23%;padding:2px 5px;vertical-align:top">Lengkap</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top">`;
        html +=`<input data-dbindukutama="pd_nama" type="text" style="border: none transparent;outline: none;width:100%">`;
        html+=`</td><td style="width:.5%">&nbsp;</td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top">b.</td><td style="padding:2px 5px;vertical-align:top">Panggilan</td><td style="vertical-align:top">:</td><td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top"></td><td></td></tr>`;
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
        html +=`<td rowspan="5" title="klik 2 kali untuk menambahkan poto" style="cursor:pointer;border:.5pt solid black;text-align:center;font-size:8px;padding:2px 5px" ondblclick="tambahkanpotoinduk(this)"><img src="/img/lamaso.webp" style="width:2cm;height:2.4cm" class="srcpotoinduksiswa"><br>Cap tiga jari tengah kiri mengenai pas poto</td></tr>`;
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
        html +=`<td rowspan="5" title="klik 2 kali untuk menambahkan poto" style="cursor:pointer;border:.5pt solid black;text-align:center;font-size:8px;padding:2px 5px" ondblclick="tambahkanpotoinduk(this)"><img src="/img/lamaso.webp" style="width:2cm;height:2.4cm" class="srcpotoinduksiswa"><br>Cap tiga jari tengah kiri mengenai pas poto</td></tr>`;
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
        html +=`<td rowspan="5" title="klik 2 kali untuk menambahkan poto" style="cursor:pointer;border:.5pt solid black;text-align:center;font-size:8px;padding:2px 5px" ondblclick="tambahkanpotoinduk(this)"><img src="/img/lamaso.webp" style="width:2cm;height:2.4cm" class="srcpotoinduksiswa"><br>Cap tiga jari tengah kiri mengenai pas poto</td></tr>`;
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
        html +=`<td rowspan="5" title="klik 2 kali untuk menambahkan poto" style="cursor:pointer;border:.5pt solid black;text-align:center;font-size:8px;padding:2px 5px" ondblclick="tambahkanpotoinduk(this)"><img src="/img/lamaso.webp" style="width:2cm;height:2.4cm" class="srcpotoinduksiswa"><br>Cap tiga jari tengah kiri mengenai pas poto</td></tr>`;
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
        html +=`<td rowspan="5" title="klik 2 kali untuk menambahkan poto" style="cursor:pointer;border:.5pt solid black;text-align:center;font-size:8px;padding:2px 5px" ondblclick="tambahkanpotoinduk(this)"><img src="/img/lamaso.webp" style="width:2cm;height:2.4cm" class="srcpotoinduksiswa"><br>Cap tiga jari tengah kiri mengenai pas poto</td></tr>`;
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
        html +=`<span class="w3-hide-small">Deteksi Otomatis berdasarkan NIS</span>`;
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px"></td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">3) Diterima di semester</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;" class="td_deteksi_semester">`;
        html +=`<span class="w3-hide-small">Deteksi Otomatis berdasarkan tanggal masuk</span>`;
        html +=`</td><td style="width:.5%">&nbsp;</td><td></td></tr>`;
    html +=`<tr><td></td><td style="padding:2px 5px;text-align:right;vertical-align:top;width:2px"></td>`;
        html+=`<td style="padding:2px 5px;vertical-align:top">4) Berkas Dokumen Mutasi</td><td style="vertical-align:top;width:.5%">:</td>
        <td style="padding:2px 5px 2px 5px;border-bottom:.5pt dotted black;vertical-align:top;" class="td_deteksi_semester">`;
        html +=`<button class="w3-hide-small" onclick="alert('unggah file')"><i class="fa fa-upload"></i> Unggah File</button>`;
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
    html +=`<tr><td rowspan="8"></td>`;
        html +=`<td style="padding:2px 1px;vertical-align:top">1.</td>
        <td colspan="6" style="padding:2px 5px;vertical-align:top">
        TINGGI DAN BERAT BADAN PESERTA DIDIK
        </tr>`;

    // TINGGI DAN BERAT BADAN
    html += `<tr><td colspan="8">`;
    // Start Tinggi Badan dan berat Badan
    let thd_bb = ``;
    let thd_ss = ``;
    let td_tb = ``;
    let td_bb = ``;
    let rentang = syarat.rentang ;
    let tapelakhir = syarat.tapel;//2122 atau thlulu 1819
    let int_tapelakhir = parseInt(tapelakhir);
    let tapelawal = db.nis.substring(0,4);//1617
    let int_tapelawal = parseInt(db.nis.substring(0,4));//1617
    let selisih = syarat.selisih;
    let riwayat_kelas =db.riwayat_tapel==""?[]: JSON.parse(db.riwayat_tapel);
    console.log(db);
    console.log(riwayat_kelas);
    // let tekstapel = "20"+tapelakhir.substring(0,2) +"/";
    // let pengurang = (i+1) * 101;
    //         let tapeljalan = intShorttapel-pengurang;
    //         let tekstapel = "20"+tapeljalan.toString().substring(0,2)+"/20"+tapeljalan.toString().substring(2,4);
    
    let tapeljalan, tekstapel;
    if(syarat.asalsiswa == "PPDB" && syarat.kenaikankelas == "Selalu Naik Kelas"){
        // siswa asal, selalu naik kelas;
        for(i = 0 ; i < 6 ; i++){
            tapeljalan = int_tapelawal+(101*i);
            tekstapel = "20"+tapeljalan.toString().substring(0,2)+"/20"+tapeljalan.toString().substring(2,4);
            if(i == (selisih)){
                thd_bb += `<th colspan="2" style="height:43px;background-color:#7FFF00">Kelas ${i+1}<br>${tekstapel}</th>`;
                thd_ss +=`<th style="height:43px">1</th><th>2</th>`;
                td_tb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="1" data-tbbb="tb"></td>`;
                td_tb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="2" data-tbbb="tb"></td>`;
                td_bb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="1" data-tbbb="bb"></td>`;
                td_bb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="2" data-tbbb="bb"></td>`;
            }else{
                thd_bb += `<th colspan="2" style="height:43px">Kelas ${i+1}<br>${tekstapel}</th>`;
                thd_ss +=`<th style="height:43px">1</th><th>2</th>`;
                if(tapeljalan > int_tapelakhir){
                    td_tb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" disabled></td>`;
                    td_tb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" disabled></td>`;
                    td_bb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" disabled></td>`;
                    td_bb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" disabled></td>`;
                }else{
                    td_tb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="1" data-tbbb="tb"></td>`;
                    td_tb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="2" data-tbbb="tb"></td>`;
                    td_bb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="1" data-tbbb="bb"></td>`;
                    td_bb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="2" data-tbbb="bb"></td>`;

                }
            }
        }
        console.log(tapeljalan, int_tapelakhir);
    }else if(syarat.asalsiswa == "PPDB" && syarat.kenaikankelas !== "Selalu Naik Kelas"){
        // siswa asal pernah tidak naik kelas
        tapeljalan = int_tapelawal;
        tekstapel = "20"+tapeljalan.toString().substring(0,2)+"/20"+tapeljalan.toString().substring(2,4);
        let cekawal = riwayat_kelas.filter(s=> s.tapel == int_tapelawal);
        if(cekawal.length == 0){
            thd_bb += `<th colspan="2" style="height:43px;background-color:#7FFF00">Kelas ${dbutamasiswa(token).jenjangsaatini}<br>${tekstapel}</th>`;
            thd_ss +=`<th style="height:43px">1</th><th>2</th>`;
        }
        riwayat_kelas.reverse();
        for(i = 0 ; i < riwayat_kelas.length ; i++){
            tekstapel = "20"+riwayat_kelas[i].tapel.toString().substring(0,2)+"/20"+riwayat_kelas[i].tapel.toString().substring(2,4);
            if(tekstapel == idTeksTapel){
                thd_bb += `<th colspan="2" style="height:43px;background-color:#7FFF00">Kelas ${riwayat_kelas[i].kelas}<br>${tekstapel}</th>`;
            
            }else{
                thd_bb += `<th colspan="2" style="height:43px">Kelas ${riwayat_kelas[i].kelas}<br>${tekstapel}</th>`;

            }
            thd_ss +=`<th style="height:43px">1</th><th>2</th>`;
            td_tb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="1" data-tbbb="tb"></td>`;
            td_tb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="2" data-tbbb="tb"></td>`;
            td_bb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="1" data-tbbb="bb"></td>`;
            td_bb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="2" data-tbbb="bb"></td>`;
        }
    }else if(syarat.asalsiswa == "Pindahan" && syarat.kenaikankelas == "Selalu Naik Kelas"){
        let k_nis = parseInt(db.nis.substring(4,6));
        let s = ceksemesteranakpindahan(new Date(db.masuk_tgl))
        let i = 0;
        do{
            tapeljalan = int_tapelawal+(101*i);
            tekstapel = "20"+tapeljalan.toString().substring(0,2)+"/20"+tapeljalan.toString().substring(2,4);
            if(i == 0){
                thd_bb += `<th ${s.length==1?"":"colspan='2'"} style="height:43px">Kelas ${k_nis}<br>${tekstapel}</th>`;
                for(l = 0 ; l < s.length ; l++){
                    if(l == 0){
                        thd_ss +=`<th style="height:43px">${s[l]}</th>`;
                        // thd_ss +=`<th style="height:43px">${s[l]}</th>`;
                    }else{
                        thd_ss +=`<th>${s[l]}</th>`;
                        // thd_ss +=`<th>${s[l]}</th>`;
                    }
                
                    td_tb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="${s[l]}" data-tbbb="tb"></td>`;
                    td_bb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="${s[l]}" data-tbbb="bb"></td>`;
                }
            }else{
                thd_bb += `<th colspan='2'>Kelas ${k_nis}<br>${tekstapel}</th>`;
                if(k_nis > dbutamasiswa(token).jenjangsaatini){
                    for(l = 0 ; l < 2 ; l++){
                        thd_ss +=`<th style="background-color:#000;color:#fff">${s[l]}</th>`;
                        // thd_ss +=`<th style="background-color:#000;color:#fff">${s[l]}</th>`;
                        td_tb +=`<td style="padding:2px 5px"><input disabled type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="${s[l]}" data-tbbb="tb"></td>`;
                        td_bb +=`<td style="padding:2px 5px"><input disabled type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="${s[l]}" data-tbbb="bb"></td>`;
                    }
                }else{
                    for(l = 0 ; l < 2 ; l++){
                        thd_ss +=`<th>${s[l]}</th>`;
                        td_tb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="${s[l]}" data-tbbb="tb"></td>`;
                        td_bb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="${s[l]}" data-tbbb="bb"></td>`;
                    }
                }
            }
            i++;
            k_nis++;
        }
        while(k_nis <= 6 )
        // for(i = 0 ; i < 6 ; i++){
        //     tapeljalan = int_tapelawal+(101*i);
        //     tekstapel = "20"+tapeljalan.toString().substring(0,2)+"/20"+tapeljalan.toString().substring(2,4);
        //     if(i == (selisih)){
        //         thd_bb += `<th colspan="2" style="height:43px;background-color:#7FFF00">Kelas ${i+1}<br>${tekstapel}</th>`;
        //         thd_ss +=`<th style="height:43px">1</th><th>2</th>`;
        //     }else{
        //         if(k_nis > 6){
                    
        //             thd_bb += `<th colspan="2" style="height:43px">${k_nis}</th>`;
        //             thd_ss +=`<th style="height:43px">1</th><th>2</th>`;
        //         }else{
        //             thd_bb += `<th colspan="2" style="height:43px">Kelas ${k_nis}<br>${tekstapel}</th>`;
        //             thd_ss +=`<th style="height:43px">1</th><th>2</th>`;

        //         }
        //     }
        //     k_nis++;
        // }
    }else if(syarat.asalsiswa == "Pindahan" && syarat.kenaikankelas !== "Selalu Naik Kelas"){
        tapeljalan = int_tapelawal;
        tekstapel = "20"+tapeljalan.toString().substring(0,2)+"/20"+tapeljalan.toString().substring(2,4);
        let cekawal = riwayat_kelas.filter(s=> s.tapel == int_tapelawal);
        console.log(cekawal);
        if(cekawal.length == 0){
            thd_bb += `<th colspan="2" style="height:43px;background-color:#7FFF00">Kelas ${dbutamasiswa(token).jenjangsaatini}<br>${tekstapel}</th>`;
            thd_ss +=`<th style="height:43px">1</th><th>2</th>`;
        }
        riwayat_kelas.reverse();
        for(i = 0 ; i < riwayat_kelas.length ; i++){
            tekstapel = "20"+riwayat_kelas[i].tapel.toString().substring(0,2)+"/20"+riwayat_kelas[i].tapel.toString().substring(2,4);
            if(tekstapel == idTeksTapel){
                thd_bb += `<th colspan="2" style="height:43px;background-color:#7FFF00">Kelas ${riwayat_kelas[i].kelas}<br>${tekstapel}</th>`;
            
            }else{
                thd_bb += `<th colspan="2" style="height:43px">Kelas ${riwayat_kelas[i].kelas}<br>${tekstapel}</th>`;

            }
            thd_ss +=`<th style="height:43px">1</th><th>2</th>`;
            td_tb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="1" data-tbbb="tb"></td>`;
            td_tb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="2" data-tbbb="tb"></td>`;
            td_bb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="1" data-tbbb="bb"></td>`;
            td_bb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="2" data-tbbb="bb"></td>`;
        }
    }else if(syarat.asalsiswa == "Pindahan" && syarat.kenaikankelas == "Selalu Naik Kelas"){
        let k_nis = parseInt(db.nis.substring(4,6));
        let s = ceksemesteranakpindahan(new Date(db.masuk_tgl))
        let i = 0;
        do{
            tapeljalan = int_tapelawal+(101*i);
            tekstapel = "20"+tapeljalan.toString().substring(0,2)+"/20"+tapeljalan.toString().substring(2,4);
            if(i == 0){
                thd_bb += `<th ${s.length==1?"":"colspan='2'"} style="height:43px">Kelas ${k_nis}<br>${tekstapel}</th>`;
                for(l = 0 ; l < s.length ; l++){
                    if(l == 0){
                        thd_ss +=`<th style="height:43px">${s[l]}</th>`;
                        // thd_ss +=`<th style="height:43px">${s[l]}</th>`;
                    }else{
                        thd_ss +=`<th>${s[l]}</th>`;
                        // thd_ss +=`<th>${s[l]}</th>`;
                    }
                
                    td_tb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="${s[l]}" data-tbbb="tb"></td>`;
                    td_bb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="${s[l]}" data-tbbb="bb"></td>`;
                }
            }else{
                thd_bb += `<th colspan='2'>Kelas ${k_nis}<br>${tekstapel}</th>`;
                if(k_nis > dbutamasiswa(token).jenjangsaatini){
                    for(l = 0 ; l < 2 ; l++){
                        thd_ss +=`<th style="background-color:#000;color:#fff">${s[l]}</th>`;
                        // thd_ss +=`<th style="background-color:#000;color:#fff">${s[l]}</th>`;
                        td_tb +=`<td style="padding:2px 5px"><input disabled type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="${s[l]}" data-tbbb="tb"></td>`;
                        td_bb +=`<td style="padding:2px 5px"><input disabled type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="${s[l]}" data-tbbb="bb"></td>`;
                    }
                }else{
                    for(l = 0 ; l < 2 ; l++){
                        thd_ss +=`<th>${s[l]}</th>`;
                        td_tb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="${s[l]}" data-tbbb="tb"></td>`;
                        td_bb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="${s[l]}" data-tbbb="bb"></td>`;
                    }
                }
            }
            i++;
            k_nis++;
        }
        while(k_nis <= 6 )
        // tapeljalan = int_tapelawal;
        // tekstapel = "20"+tapeljalan.toString().substring(0,2)+"/20"+tapeljalan.toString().substring(2,4);
        // let cekawal = riwayat_kelas.filter(s=> s.tapel == int_tapelawal);
        // if(cekawal.length > 0){
        //     thd_bb += `<th colspan="2" style="height:43px;background-color:#7FFF00">Kelas ${i+1}<br>${tekstapel}</th>`;
        //     thd_ss +=`<th style="height:43px">1</th><th>2</th>`;
        // }
        // riwayat_kelas.reverse();
        // for(i = 0 ; i < riwayat_kelas.length ; i++){
        //     tekstapel = "20"+riwayat_kelas[i].tapel.toString().substring(0,2)+"/20"+riwayat_kelas[i].tapel.toString().substring(2,4);
        //     let riwayatsemester = riwayat_kelas[i].semester;
        //     //if(riwayatsemester.length )
        //     thd_bb += `<th ${riwayatsemester.length==1?"":"colspan='2'"} style="height:43px">Kelas ${riwayat_kelas[i].kelas}<br>${tekstapel}</th>`;
            
        //     for(let u = 0 ; u < riwayatsemester.length ; u++ ){
        //         if(u == 0){
        //             thd_ss +=`<th style="height:43px">${riwayatsemester[u]}</th>`;
        //         }else{
        //             thd_ss +=`<th>${riwayatsemester[u]}</th>`;
        //         }
        //         td_tb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="${riwayatsemester[u]}" data-tbbb="tb"></td>`;
        //         td_bb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="${riwayatsemester[u]}" data-tbbb="bb"></td>`;
        //     }
        //     // td_tb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="1" data-tbbb="tb"></td>`;
        //     //         td_tb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="2" data-tbbb="tb"></td>`;
        //     //         td_bb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="1" data-tbbb="bb"></td>`;
        //     //         td_bb +=`<td style="padding:2px 5px"><input type="number" style="border: none transparent;outline: none;width:100%" data-tapeltbbb="${tapeljalan}" data-tbbbsemester="2" data-tbbb="bb"></td>`;
        // }
    }
    

    html +=`<table style="width:99%;margin:5px auto;border-collapse:collapse;border-spacing:0;font-size:10px" border="1"><thead>
    <tr style="background-color:#f1f1f1">
        <th rowspan="2">No</th>
        <th rowspan="2" style="width:15%">Aspek yang Dinilai</th>
        <th style="font-size:8px;padding:5px:1px;width:1px;-ms-transform: rotate(-90deg);transform: rotate(-45deg);">Tapel</th>`;
    html +=thd_bb;
    html +=`</tr><tr style="background-color:#f1f1f1">
    <th  style="font-size:8px;padding:5px:1px;width:1px;-ms-transform: rotate(-90deg);transform: rotate(-45deg);">Semester</th>`;
    html +=thd_ss;
    html+=`</tr></thead><tbody>`;
    html +=`<tr><td style="padding:2px 5px">1</td><td style="padding:2px 5px" colspan="2">Tinggi Badan</td>`
    html +=td_tb;
    html+=`</tr><tr><td style="padding:2px 5px">2</td><td colspan="2" style="padding:2px 5px">Berat Badan</td>`;
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
        <th rowspan="2">Aspek yang Dinilai</th>
        <th>Tapel<br>20XX/20YY</th>
        <th>Tapel<br>20XX/20YY</th>
        <th>Tapel<br>20XX/20YY</th>
        <th>Tapel<br>20XX/20YY</th>
        <th>Tapel<br>20XX/20YY</th>
        <th>Tapel<br>20XX/20YY</th>
    </tr>
    <tr style="background-color:#f1f1f1">
        <th>Keterangan</th><th>Keterangan</th><th>Keterangan</th><th>Keterangan</th><th>Keterangan</th><th>Keterangan</th>
    </tr>
    </thead><tbody>`;
    html +=`<tr>
    <td style="padding:2px 5px">1.</td><td style="padding:2px 5px">Pendengaran</td><td style="padding:2px 5px"></td><td style="padding:2px 5px"></td><td style="padding:2px 5px"></td><td style="padding:2px 5px"></td><td style="padding:2px 5px"></td><td style="padding:2px 5px"></td>
    </tr><tr>
    <td style="padding:2px 5px">2.</td><td style="padding:2px 5px">Penglihatan</td><td style="padding:2px 5px"></td><td style="padding:2px 5px"></td><td style="padding:2px 5px"></td><td style="padding:2px 5px"></td><td style="padding:2px 5px"></td><td style="padding:2px 5px"></td>
    </tr><tr>
    <td style="padding:2px 5px">3.</td><td style="padding:2px 5px">Gigi</td><td style="padding:2px 5px"></td><td style="padding:2px 5px"></td><td style="padding:2px 5px"></td><td style="padding:2px 5px"></td><td style="padding:2px 5px"></td><td style="padding:2px 5px"></td>
    </tr><tr>
    <td style="padding:2px 5px">4.</td><td style="padding:2px 5px">Penyakit</td><td style="padding:2px 5px"></td><td style="padding:2px 5px"></td><td style="padding:2px 5px"></td><td style="padding:2px 5px"></td><td style="padding:2px 5px"></td><td style="padding:2px 5px"></td>
    </tr>`;
    html +=`</tbody></table>`
    // END START KONDISI KESEHATAN
    html +=`</td></tr>`;

    html +=`<tr><td colspan="8">&nbsp;</td></tr>`;
    
    html +=`<tr><td style="padding:2px 1px;vertical-align:top">3.</td>
        <td colspan="6" style="padding:2px 5px;vertical-align:top">DOKUMEN LAINNYA</tr>`;
    
    html += `<tr><td colspan="8">`;
    html +=`<table style="width:99%;margin:5px auto;border-collapse:collapse;border-spacing:0;font-size:10px" border="1"><thead>
    <tr style="background-color:#f1f1f1">
        <th>No.</th><th style="width:15%">Dokumen</th><th style="width:30%">URL</th><th class="w3-hide-small" style="width:5%">Aksi</th>
        <th>No.</th><th style="width:15%">Dokumen</th><th style="width:30%">URL</th><th class="w3-hide-small" style="width:5%">Aksi</th>
    </tr></thead><tbody>`;
    html +=`<tr><td style="padding:2px 5px">1.</td><td style="padding:2px 5px">Akte Kelahiran <sup>(s)</sup></td><td style="padding:2px 5px"></td><td class="w3-hide-small" style="padding:2px 5px">Download</td>`;
    html +=`<td style="padding:2px 5px">6.</td><td style="padding:2px 5px">KIP <sup>(s)</sup></td><td style="padding:2px 5px"></td><td class="w3-hide-small" style="padding:2px 5px">Download</td></tr>`;

    html +=`<tr><td style="padding:2px 5px">2.</td><td style="padding:2px 5px">Kartu Keluarga <sup>(s)</sup></td><td style="padding:2px 5px"></td><td class="w3-hide-small" style="padding:2px 5px">Download</td>`;
    html +=`<td style="padding:2px 5px">7.</td><td style="padding:2px 5px">KKS <sup>(s)</sup></td><td style="padding:2px 5px"></td><td class="w3-hide-small" style="padding:2px 5px">Download</td></tr>`;

    html +=`<tr><td style="padding:2px 5px">3.</td><td style="padding:2px 5px">Kartu NISN <sup>(m)</sup></td><td style="padding:2px 5px"></td><td class="w3-hide-small" style="padding:2px 5px">Download</td>`;
    html +=`<td style="padding:2px 5px">8.</td><td style="padding:2px 5px">Sertifikat/Piagam <sup>(m)</sup></td><td style="padding:2px 5px"></td><td class="w3-hide-small" style="padding:2px 5px">Download</td></tr>`;
    
    html +=`<tr><td style="padding:2px 5px">4.</td><td style="padding:2px 5px">KPS / PKH <sup>(s)</sup></td><td style="padding:2px 5px"></td><td class="w3-hide-small" style="padding:2px 5px">Download</td>`;
    html +=`<td style="padding:2px 5px">9.</td><td style="padding:2px 5px">Ijazah SD <sup>(s)</sup></td><td style="padding:2px 5px"></td><td class="w3-hide-small" style="padding:2px 5px">Download</td></tr>`;
    
    html +=`<tr><td style="padding:2px 5px">5.</td><td style="padding:2px 5px">Raport <sup>(m)</sup></td><td style="padding:2px 5px"></td><td class="w3-hide-small" style="padding:2px 5px">Download</td>`;
    html +=`<td style="padding:2px 5px">10.</td><td style="padding:2px 5px">Lainnya <sup>(m)</sup></td><td style="padding:2px 5px"></td><td class="w3-hide-small" style="padding:2px 5px">Download</td></tr>`;
    html +=`</tbody></table>`

    html +=`</td></tr>`;
    html += `</table>`;
    
    
    //html +=`<tr><td></td><td colspan="3" style="padding:2px 5px;text-align:right">a.</td><td style="padding:2px 5px;vertical-align:top">Lengkap</td><td style="border-bottom:.5pt dotted black;padding:2px 5px 2px 0">: ${db.pd_nama}</td></tr>`;
    
    // html +=`<tr><td></td><td style="padding:2px 0;text-align:right">b.</td><td style="padding:2px 5px;vertical-align:top">Panggilan</td><td style="border-bottom:.5pt dotted black;padding:2px 5px 2px 0">: </td></td><td style="width:1px"></td></tr>`;
    // html +=`<tr><td style="padding:2px 1px;">2.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Jenis Kelamain</td><td style="border-bottom:.5pt dotted black;padding:2px 5px 2px 0">: ${db.pd_jk == "L"?"Laki-laki":"Perempuan"}</td></td><td style="width:1px"></tr>`;
    // html +=`<tr><td style="padding:2px 5px;">3.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Kelahiran</td><td style="padding:2px 5px;vertical-align:top"></td></td><td style="width:1px"></tr>`;
    // html +=`<tr><td></td><td style="padding:2px 0;text-align:right">a.</td><td style="padding:2px 5px;vertical-align:top">Tanggal Lahir</td><td style="border-bottom:.5pt dotted black;padding:2px 5px 2px 0">: ${db.pd_tanggallahir == ""?"":tanggalfull(new Date(db.pd_tanggallahir))}</td><td></td></td><td style="width:1px"></td><td rowspan="5" style="border:.5pt solid black;text-align:center;font-size:8px;padding:2px 5px">Poto Lagi</td></tr>`;
    // html +=`<tr><td></td><td style="padding:2px 0;text-align:right">b.</td><td style="padding:2px 5px;vertical-align:top">Tempat Lahir</td><td style="border-bottom:.5pt dotted black;padding:2px 5px 2px 0">: ${db.pd_tl}</td></td><td style="width:1px"></td></tr>`;
    
    // html +=`<tr><td style="padding:2px 5px;">4.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Agama</td><td border-bottom:.5pt dotted black;padding:2px 5px 2px 0">${db.pd_agama}</td></td><td style="width:1px"></td></tr>`;
    // html +=`<tr><td style="padding:2px 5px;">5.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Kewarganegaraan</td><td border-bottom:.5pt dotted black;padding:2px 5px 2px 0">WNI</td></td><td style="width:1px"></td></tr>`;
    // html +=`<tr><td style="padding:2px 5px;">6.</td><td colspan="2" style="padding:2px 5px;vertical-align:top">Anak Ke</td><td border-bottom:.5pt dotted black;padding:2px 5px 2px 0">${db.dapo_anakkeberapa}</td></td><td style="width:1px"></td></tr>`;


    //html +=`</div>`
    formulirkirim.innerHTML = html;
    let eldata = document.querySelectorAll("[data-dbindukutama]");
    let koleksiundefine = [];
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
        }
    }
    console.log(koleksiundefine);
    tempattombol_formulirkirim.innerHTML =`<div class="w3-tiny w3-center"><button class="w3-btn w3-yellow w3-round-xlarge w3-bottombar w3-border-black" onclick="printadm('formulirkirim')">PRINT</button></div>`
}
const tambahkanpotoinduk  = (el)=>{
    let gmbr = el.querySelector("img");
    let src = gmbr.getAttribute("src");
    alert(src)
}

const syarat_riwayatkelas = (tokensiswa) =>{ 
    let result = {};
    
    let db = db_utama_siswa.filter(s => s.id == tokensiswa).length == 0? dbsiswa_bukuinduk.filter(s => s.id == tokensiswa)[0]: db_utama_siswa.filter(s => s.id == tokensiswa)[0];
    let dbinduk = dbsiswa_bukuinduk.filter(s => s.id == tokensiswa)[0];
    //let rentang = 6;//banyak kelas
    //let banyaksemester = 12;
    //let konstanta_rentang = 0;
    let nis_siswa = db.nis;
    let d2nisawal = db.nis.substring(0,2);// 161701001 -> 16 --> string;
    let d2niskelas = db.nis.substring(4,6);// 01 
    let int_2nisawal = parseInt(db.nis.substring(0,2));// 161701001 -> 16;
    
    let riwayattapel = dbinduk.riwayat_tapel == ""?[]:JSON.parse(dbinduk.riwayat_tapel);
    let shortTapel, intShorttapel, duatapel;
    let s_kelas = db.aktif == "lulus"?6:parseInt(db.jenjang); // kelas siswa saat ini dari db utama, patokannya dikurangi 1
    let k_kelas = db.aktif == "lulus"?5:parseInt(db.jenjang)-1; // kelas siswa saat ini dari db utama, patokannya dikurangi 1;
    let rentang = s_kelas - 2;
    let utama_nis = dbutamasiswa(tokensiswa).nis; // Nis siswa utama full => contoh: 161701008;
    let int_4nissiswa = parseInt(utama_nis.substring(0,4));
    let k_nis = parseInt(utama_nis.substring(0,2)); //Nis siswa utama dua angka awal => contoh: 161701008 --> 16
    
    if(db.aktif == "lulus"){
        let tapellulus = db.keluar_tgl ==""?idTeksTapel:(new Date(db.keluar_tgl).getFullYear()-1)+"/"+(new Date(db.keluar_tgl).getFullYear());
        shortTapel = tapellulus.substring(2,4)+tapellulus.substring(7,9);// 2021/2022 ==> 2122 --> string
        intShorttapel = parseInt(shortTapel);// 2122 --> number
        duatapel = parseInt(tapellulus.substring(2,4)); // 2 awal dari Tapel 2021/2022 => 21
    }else if(db.aktif == "non-aktif"){
        let tapellulus = db.keluar_tgl ==""?idTeksTapel:(new Date(db.keluar_tgl).getFullYear()-1)+"/"+(new Date(db.keluar_tgl).getFullYear());
        shortTapel = tapellulus.substring(2,4)+tapellulus.substring(7,9);// 2021/2022 ==> 2122 --> string
        intShorttapel = parseInt(shortTapel);// 2122 --> number
        duatapel = parseInt(tapellulus.substring(2,4)); // 2 awal dari Tapel 2021/2022 => 21
    }else{
        shortTapel = idTeksTapel.substring(2,4)+idTeksTapel.substring(7,9);// 2021/2022 ==> 2122 --> string
        intShorttapel = parseInt(shortTapel);// 2122 --> number
        duatapel = parseInt(idTeksTapel.substring(2,4)); // 2 awal dari Tapel 2021/2022 => 21
    }
    
    result.tapel = shortTapel;
    //result.aktif = db.aktif;
    let selisih = duatapel - k_nis;
    result.selisih = selisih;

    //result.kelasakhir = k_kelas;
    //result.riwayattapel = [];
    let koleksiwarning = [];
    let solusiwarning = [];
    let koleksiperbaikan = [], objekperbaikan = {}

    if(d2niskelas == "01"){
        let objekawal = {}
        if(db.masuk_tgl ==""){
            result.asalsiswa = "PPDB";
            //objekawal.tapel = int_4nissiswa;
            objekperbaikan.isipindahan = ""
        }else{
            result.asalsiswa = "Pindahan";
            rentang -= (k_kelas - selisih);
            solusiwarning.push("pindahan");
            objekperbaikan.isipindahan = "isiada";
          
        }
        if(selisih == k_kelas){
            result.kenaikankelas = "Selalu Naik Kelas";
            objekperbaikan.isikenaikan = "";
        }else{
            result.kenaikankelas = `Pernah ${(selisih - k_kelas)} kali tidak naik kelas`;
            rentang +=(selisih - k_kelas);
            if(riwayattapel.length == 0){
                koleksiwarning.push("pernah tidak naik kelas");
                objekperbaikan.isikenaikan = "isi";
            }else{
                solusiwarning.push("pernah tidak naik kelas");
                objekperbaikan.isikenaikan = "isiada";
            }
            

            //tidaknaikkelas;
        }
        koleksiperbaikan.push(objekperbaikan)
        result.rentang = rentang;
        result.objekperbaikan = koleksiperbaikan;
    }else{
        //pindahan
        result.asalsiswa = "Pindahan";
        rentang = s_kelas - parseInt(d2niskelas)
        // rentang -= (k_kelas - selisih);
        if(db.masuk_tgl == ""){
            koleksiwarning.push("pindahan");
            objekperbaikan.isipindahan = "isi";
        }else{
            solusiwarning.push("pindahan");
            objekperbaikan.isipindahan = "isiada";
        }
        if(selisih == rentang){
            result.kenaikankelas = "selalu Naik Kelas";
            objekperbaikan.isikenaikan = "";
        }else{
            result.kenaikankelas = `Pernah ${selisih-rentang} kali tidak naik kelas`;
            if(riwayattapel.length == 0){
                koleksiwarning.push("pernah tidak naik kelas");
                objekperbaikan.isikenaikan = "isi";
            }else{
                solusiwarning.push("pernah tidak naik kelas");
                objekperbaikan.isikenaikan = "isiada";
            }
        }
        // if(selisih < k_kelas){
        //     result.kenaikankelas = "Selalu Naik Kelas";
        //     objekperbaikan.isikenaikan = "";
        // }else{
        //     //tidaknaikkelas
        //     rentang +=(selisih - k_kelas);
        //     result.kenaikankelas = `Pernah ${(selisih - k_kelas)} kali tidak naik kelas`;
        //     // result.kenaikankelas = `Pernah ${(selisih - rentang)} kali tidak naik kelas`;
        //     if(riwayattapel.length == 0){
        //         koleksiwarning.push("pernah tidak naik kelas");
        //         objekperbaikan.isikenaikan = "isi";
        //     }else{
        //         solusiwarning.push("pernah tidak naik kelas");
        //         objekperbaikan.isikenaikan = "isiada";
        //     }
        // }

        koleksiperbaikan.push(objekperbaikan)
        // result.k_kelas = k_kelas;
        // result.rumus = k_kelas - (parseInt(d2niskelas)-1);
        result.rentang = rentang;
        result.objekperbaikan = koleksiperbaikan;
    }
    result.warning = koleksiwarning;
    result.solusiwarning = solusiwarning;
    return result
    
}
const tapelbukuinduk = (d)=>{
    //let d = new Date(dd);
    let result = "";
    let m = d.getMonth();
    let y = d.getFullYear();
    if(m > 6){
        // s1:
        result = y +"/" (y+1)
    }else{
        result = (y-1) +"/"+ y
    }
    return result
}
const PerbaruidataInduk = (kondisi, tokensiswa) => {
    modaledit_bukuinduk.style.display = "block";
    judulmodal_editnomorinduk.innerHTML = "RESUME DATA BUKU INDUK SISWA";
    //alert("Token siswa "+ tokensiswa);
    let html="";
    let menu = "";
    men_induk_info.innerHTML = "";
    menu_editinduk.innerHTML = "";
    tempattombol_formulirkirim.innerHTML = "";
    formulirkirim.innerHTML ="";
    let ceksyarat = syarat_riwayatkelas(tokensiswa);//
    let db = dbsiswa_bukuinduk.filter(s => s.id == tokensiswa)[0];
    if(kondisi=="aktif"){
        html =`Ananda ${db.pd_nama} terdeteksi sebagai siswa ${ceksyarat.asalsiswa == "PPDB"?"Asal (terdaftar di PPDB)":ceksyarat.asalsiswa}`;
        if(ceksyarat.warning.length > 0){
            html +=`<br>Mohon untuk mengecek dan melengkapi data berikut:`
        }
            let perbaikan = ceksyarat.objekperbaikan[0];
            if(perbaikan.isipindahan =="" && perbaikan.isikenaikan == ""){
                menu = html_tombolupdateinduk(tokensiswa).html;
            }else{
                if(perbaikan.isipindahan == "isi"){
                    menu = `Lengkapi data berikut terlebih dahulu untuk melanjutkan ke proses pengadministrasian Buku Induk`;
                    menu +=`<div class="w3-border w3-padding w3-round-large">`;
                    menu +=`<label for="isiduludatapindahan_sekolahasal">Nama Sekolah Asal:<input id="isiduludatapindahan_sekolahasal" data-isiduludatapindahan="masuk_dari" type="text" class="w3-input w3-border w3-border-green"></label><br>`;
                    menu +=`<label for="isiduludatapindahan_masuktgl">Tanggal Masuk Sekolah ini<input id="isiduludatapindahan_masuktgl" data-isiduludatapindahan="masuk_tgl" type="date" class="w3-input w3-border w3-border-green"></label><br>`;
                    menu +=`</div>`
                }else if(perbaikan.isipindahan == "isiada"){
                    menu = "";//`Lengkapi data berikut terlebih dahulu untuk melanjutkan ke proses pengadministrasian Buku Induk`;
                    menu +=`<div class="w3-border w3-padding w3-round-large">`;
                    menu +=html_tombolupdateinduk(tokensiswa).html; 
                    // menu +=`<label for="isiduludatapindahan_sekolahasal">Nama Sekolah Asal:<input id="isiduludatapindahan_sekolahasal" data-isiduludatapindahan="masuk_dari" type="text" class="w3-input w3-border w3-border-green"></label><br>`;
                    // menu +=`<label for="isiduludatapindahan_masuktgl">Tanggal Masuk Sekolah ini<input id="isiduludatapindahan_masuktgl" data-isiduludatapindahan="masuk_tgl" type="date" class="w3-input w3-border w3-border-green"></label><br>`;
                    menu +=`</div>`
                    
                }else{

                }
                if(perbaikan.isikenaikan == "isi"){
                    menu = "";//`Lengkapi data berikut terlebih dahulu untuk melanjutkan ke proses pengadministrasian Buku Induk`;
                    menu +=`<div class="w3-border w3-padding w3-round-large">`;
                    menu += ceksyarat.kenaikankelas;
                    menu += `<table class="w3-table garis w3-tiny" style="width:350px;margin:15px auto"><thead><tr class="w3-light-grey"><th>Tahun Pelajaran</th><th>Kelas<br><button onclick="editinputriwayat(this)">Edit</button></th><th>Semester</th></tr></thead><tbody>`;
                    //html +=`<tr><td>${idTeksTapel}<br>(Saat ini)</td><td><input type="number" min="1" max="6" class="w3-input w3-border" data-riwayat_tapel="${intShorttapel}" value="${s_kelas}"></td></tr>`;
                    let tapeljalan = ceksyarat.tapel;
                    let v = dbutamasiswa(tokensiswa).jenjangsaatini;
                    for(let i  = 0 ; i <(ceksyarat.rentang+2); i ++){
                        let tekstapel = "20"+tapeljalan.toString().substring(0,2)+"/20"+tapeljalan.toString().substring(2,4);
                        if(i==0){
                            menu +=`<tr><td>${tekstapel}</td><td><input value="${v}" disabled type="number" min="1" max="6" class="w3-input w3-border" data-riwayat_tapel="${tapeljalan}"></td><td>`;
                            menu +=`<label for="cekbox_semester_${tapeljalan}1"><input type="checkbox" disabled name="cekbox_semester_${tapeljalan}" class="disablecheckbox" id="cekbox_semester_${tapeljalan}1" value="1">1</label><br>`;
                            menu +=`<label for="cekbox_semester_${tapeljalan}2"><input type="checkbox" disabled name="cekbox_semester_${tapeljalan}" class="disablecheckbox" id="cekbox_semester_${tapeljalan}2" value="2">2</label>`;;
                            menu +=`</td></tr>`;
                        }else if(i == (ceksyarat.rentang+1)){
                            menu +=`<tr><td>${tekstapel}</td><td><input value="${parseInt(db.nis.substring(4,6))}"  disabled type="number" min="1" max="6" class="w3-input w3-border" data-riwayat_tapel="${tapeljalan}"></td><td>`;
                            if(ceksyarat.asalsiswa == "Pindahan" && db.masuk_tgl !==""){
                                let ar = ceksemesteranakpindahan(new Date(db.masuk_tgl));
                                for(x = 0 ; x < ar.length ; x++){
                                    menu +=`<label for="cekbox_semester_${tapeljalan}${ar[x]}"><input type="checkbox" disabled name="cekbox_semester_${tapeljalan}" class="disablecheckbox" id="cekbox_semester_${tapeljalan}${ar[x]}" value="${ar[x]}" checked>${ar[x]}</label><br>`;
                                }
                                menu+=`Masuk Tgl ${tanggalfull(db.masuk_tgl)}`;
                            // menu +=`<label for="cekbox_semester_${tapeljalan}2"><input type="checkbox" disabled name="cekbox_semester_${tapeljalan}" class="disablecheckbox" id="cekbox_semester_${tapeljalan}2" value="2">2</label>`;;
                            } else{
                                menu +=`<label for="cekbox_semester_${tapeljalan}1"><input type="checkbox" disabled name="cekbox_semester_${tapeljalan}" class="disablecheckbox" id="cekbox_semester_${tapeljalan}1" value="1">1</label><br>`;
                                menu +=`<label for="cekbox_semester_${tapeljalan}2"><input type="checkbox" disabled name="cekbox_semester_${tapeljalan}" class="disablecheckbox" id="cekbox_semester_${tapeljalan}2" value="2">2</label>`;;
                            }
                            menu +=`</td></tr>`;
                        }else{
                            menu +=`<tr><td>${tekstapel}</td><td><input  disabled type="number" min="1" max="6" class="w3-input w3-border" data-riwayat_tapel="${tapeljalan}"></td><td>`;
                            menu +=`<label for="cekbox_semester_${tapeljalan}1"><input type="checkbox" disabled name="cekbox_semester_${tapeljalan}" class="disablecheckbox" id="cekbox_semester_${tapeljalan}1" value="1">1</label><br>`;
                            menu +=`<label for="cekbox_semester_${tapeljalan}2"><input type="checkbox" disabled name="cekbox_semester_${tapeljalan}" class="disablecheckbox" id="cekbox_semester_${tapeljalan}2" value="2">2</label>`;;
                            menu +=`</td></tr>`;                           
                        }
                        v--;
                        tapeljalan -=101;
                    }
                    menu +=`</tbody></table><div id="tombolsementarariwayat" class="w3-center">Klik tombol Edit untuk mengedit isian<br>`;
                    menu +=`<button class="tangan sementarasimpanriwayat w3-hide" onclick="simpanserverinduk(this,'single','${tokensiswa}')">Update Riwayat</button>`
                    menu +=`<button class="tangan" onclick="PerbaruidataInduk('aktif','${tokensiswa}')">Kembali</button>`;
                    menu +=`</div>`;

                    menu +=`</div>`
                }else if(perbaikan.isikenaikan == "isiada"){
                    menu = "";//`Lengkapi data berikut terlebih dahulu untuk melanjutkan ke proses pengadministrasian Buku Induk`;
                    menu +=`<div class="w3-border w3-padding w3-round-large">`;
                    menu +=ceksyarat.kenaikankelas;
                    menu +=` Cek Lihat Riwayat Kelas <br>`;
                    menu += html_tombolupdateinduk(tokensiswa).html;
                    // menu +=`<label for="isiduludatapindahan_sekolahasal">Nama Sekolah Asal:<input id="isiduludatapindahan_sekolahasal" data-isiduludatapindahan="masuk_dari" type="text" class="w3-input w3-border w3-border-green"></label><br>`;
                    // menu +=`<label for="isiduludatapindahan_masuktgl">Tanggal Masuk Sekolah ini<input id="isiduludatapindahan_masuktgl" data-isiduludatapindahan="masuk_tgl" type="date" class="w3-input w3-border w3-border-green"></label><br>`;
                    menu +=`</div>`
                    
                }else{

                }
                // menu =`isipindahan = ${perbaikan.isipindahan}<br>`;
                // menu +=`isikenaikan = ${perbaikan.isikenaikan}<br>`;

            }

        men_induk_info.innerHTML = html;
        menu_editinduk.innerHTML = menu;
        console.log(ceksyarat);
       
    }else if(kondisi =="non-aktif"){
        html ="Anda harus memperbaiki data tentang siswa ini. Terutama apakah dia pindah, meninggal dunia, atau yang lainnya";
        men_induk_info.innerHTML = html;
        menu_editinduk.innerHTML = menu;
        console.log(ceksyarat)
        
    }else if(kondisi =="pindah"){
        html = "Anda harus mengisi kemana siswa ini pindah";
        men_induk_info.innerHTML = html;
        menu_editinduk.innerHTML = menu;
        console.log(ceksyarat);
    }else if(kondisi =="pindahan"){
        html ="Anda harus mengisi dari mana siswa ini bersekolah sebelumnya, kapan siswa ini masuk di sekolah ini"
        men_induk_info.innerHTML = html;
        menu_editinduk.innerHTML = menu;
        console.log(ceksyarat);
    }else if(kondisi =="lulus"){
        html =`Ananda ${db.pd_nama} terdeteksi sebagai siswa ${ceksyarat.asalsiswa == "PPDB"?"Asal (terdaftar di PPDB)":ceksyarat.asalsiswa}`;
        if(ceksyarat.warning.length > 0){
            html +=`<br>Mohon untuk mengecek dan melengkapi data berikut:`
        }
            let perbaikan = ceksyarat.objekperbaikan[0];
            if(perbaikan.isipindahan =="" && perbaikan.isikenaikan == ""){
                if(db.aktif == "lulus"){
                    menu = html_tombolupdatelulusan(tokensiswa).html;
                }else{
                    menu = html_tombolupdateinduk(tokensiswa).html;
                }
            }else{
                if(perbaikan.isipindahan == "isi"){
                    menu = `Lengkapi data berikut terlebih dahulu untuk melanjutkan ke proses pengadministrasian Buku Induk`;
                    menu +=`<div class="w3-border w3-padding w3-round-large">`;
                    menu +=`<label for="isiduludatapindahan_sekolahasal">Nama Sekolah Asal:<input id="isiduludatapindahan_sekolahasal" data-isiduludatapindahan="masuk_dari" type="text" class="w3-input w3-border w3-border-green"></label><br>`;
                    menu +=`<label for="isiduludatapindahan_masuktgl">Tanggal Masuk Sekolah ini<input id="isiduludatapindahan_masuktgl" data-isiduludatapindahan="masuk_tgl" type="date" class="w3-input w3-border w3-border-green"></label><br>`;
                    menu +=`</div>`
                }else if(perbaikan.isipindahan == "isiada"){
                    menu = "";//`Lengkapi data berikut terlebih dahulu untuk melanjutkan ke proses pengadministrasian Buku Induk`;
                    menu +=`<div class="w3-border w3-padding w3-round-large">`;
                    if(db.aktif == "lulus"){
                        menu = html_tombolupdatelulusan(tokensiswa).html;
                    }else{
                        menu = html_tombolupdateinduk(tokensiswa).html;
                    }
                   menu +=`</div>`
                    
                }else{

                }
                if(perbaikan.isikenaikan == "isi"){
                    menu = "";//`Lengkapi data berikut terlebih dahulu untuk melanjutkan ke proses pengadministrasian Buku Induk`;
                    menu +=`<div class="w3-border w3-padding w3-round-large">`;
                    menu += ceksyarat.kenaikankelas;
                    menu += `<table class="w3-table garis w3-tiny" style="width:350px;margin:15px auto"><thead><tr class="w3-light-grey"><th>Tahun Pelajaran</th><th>Kelas<br><button onclick="editinputriwayat(this)">Edit</button></th><th>Semester</th></tr></thead><tbody>`;
                    //html +=`<tr><td>${idTeksTapel}<br>(Saat ini)</td><td><input type="number" min="1" max="6" class="w3-input w3-border" data-riwayat_tapel="${intShorttapel}" value="${s_kelas}"></td></tr>`;
                    let tapeljalan = ceksyarat.tapel;
                    let v = dbutamasiswa(tokensiswa).jenjangsaatini;
                    for(let i  = 0 ; i <(ceksyarat.rentang+2); i ++){
                        let tekstapel = "20"+tapeljalan.toString().substring(0,2)+"/20"+tapeljalan.toString().substring(2,4);
                        menu +=`<tr><td>${tekstapel}</td><td><input  disabled type="number" min="1" max="6" class="w3-input w3-border" data-riwayat_tapel="${tapeljalan}"></td><td>`;
                        menu +=`<label for="cekbox_semester_${tapeljalan}1"><input type="checkbox" disabled name="cekbox_semester_${tapeljalan}" class="disablecheckbox" id="cekbox_semester_${tapeljalan}1" value="1">1</label><br>`;
                        menu +=`<label for="cekbox_semester_${tapeljalan}2"><input type="checkbox" disabled name="cekbox_semester_${tapeljalan}" class="disablecheckbox" id="cekbox_semester_${tapeljalan}2" value="2">2</label>`;;
                        menu +=`</td></tr>`;
                        v--;
                        tapeljalan -=101;
                    }
                    menu +=`</tbody></table><div id="tombolsementarariwayat" class="w3-center">Klik tombol Edit untuk mengedit isian<br>`;
                    menu +=`<button class="tangan sementarasimpanriwayat w3-hide" onclick="simpanserverinduk(this,'single','${tokensiswa}')">Update Riwayat</button>`
                    menu +=`<button class="tangan" onclick="PerbaruidataInduk('aktif','${tokensiswa}')">Kembali</button>`;
                    menu +=`</div>`;

                    menu +=`</div>`
                }else if(perbaikan.isikenaikan == "isiada"){
                    menu = "";//`Lengkapi data berikut terlebih dahulu untuk melanjutkan ke proses pengadministrasian Buku Induk`;
                    menu +=`<div class="w3-border w3-padding w3-round-large">`;
                    menu +=ceksyarat.kenaikankelas;
                    menu +=` Cek Lihat Riwayat Kelas <br>`;
                    if(db.aktif == "lulus"){
                        menu = html_tombolupdatelulusan(tokensiswa).html;
                    }else{
                        menu = html_tombolupdateinduk(tokensiswa).html;
                    }
                    menu +=`</div>`
                    
                }else{

                }
                
            }

        
        men_induk_info.innerHTML = html;
        menu_editinduk.innerHTML = menu;
        console.log(ceksyarat);
        
        
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
const html_tombolupdateinduk = (tokensiswa,tombolriwayat,tapelakhir)=>{ // hanya berlaku jika siswa aktif dan ga bermasalah
    let html ="";
    footer_editnomorinduk.innerHTML ="<br>";
    
    let dbakun = db_utama_siswa.filter(s => s.id == tokensiswa)[0];
    let dbinduk = dbsiswa_bukuinduk.filter(s => s.id == tokensiswa)[0];
    let riwayattapel = dbinduk.riwayat_tapel == ""?[]:JSON.parse(dbinduk.riwayat_tapel);
    let ssw_nis = dbakun.nis;
    let ssw_kelasawal = ssw_nis.substring(4,6);
    let int_kelasawal = parseInt(ssw_kelasawal);
    let tapelawal = 
    html +=`<button onclick="showdserverinduk('identitas','${tokensiswa}')" class="w3-pale-green tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">IDENTITAS</button>`;
    
    if(tombolriwayat){
        html +=`<button class="w3-pale-blue w3-bottombar w3-border-black tangan" onclick="riwayatkenaikankelas('${tokensiswa}')" style="padding:5px;font-size:10px;border-radius:10px">Lihat Riwayat Kelas</button>`;
    }
    // berdasarkan: no induk
    // rentangkelas = kelas akhir - kelas awal;
    // selisihtahun = tapel akhir - tapel awal
    // riwayat_tapel = ... untuk siswa pindahan, tidak naik kelas, mutasi keluar,
    
    
    return html;
}
const html_resumedulu = (tokensiswa) =>{
    let html = "";
    let db = db_utama_siswa.filter(s => s.id == tokensiswa)[0];
    html =`Ananda ${db.pd_nama}`
    return html
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

const ceksemesteranakpindahan = (tglmasuk) =>{
    let s, m = tglmasuk.getMonth();
    if(m < 6){
        s = [2]
    }else{
        s = [1,2]
    }
    return s
}
