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

const divbukuinduk_infoawal = document.querySelector(".informasiawaldatabasebukuinduk");
const divbukuinduk_ketinfoawal = document.querySelector(".keteranganinforekapinduk");
const divbukuinduk_koleksi = document.querySelector(".divbukuinduk_koleksibukuinduk");
const divbukuinduk_koleksibukuindukperkelas = document.querySelector(".koleksibukuindukperkelas");
const divbukuinduk_previewbukuinduk = document.querySelector(".previewbukuinduk");

let data = new FormData();

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
        let html2  =`<table class="w3-table garis w3-white w3-small">`
            html2 += `<tr class="w3-light-gray"><td colspan="2" class="w3-center">Buku Induk Kelas Terakhir Tapel ${idTeksTapel}</td></tr>`;
        let txtAwal = idTeksTapel.split("/")[0].substring(2,4);
        let txtAkhir = idTeksTapel.split("/")[1].substring(2,4);
        let n_txtawal = parseInt(txtAwal);
        let n_txtAkhir = parseInt(txtAkhir);
        for(let j = 0 ; j < 6 ; j++){   
            html2 +=`<tr><td>Kelas ${j+1}</td><td>${n_txtawal-j}${n_txtAkhir-j}</td></tr>`;
        }
        html2 +=`</table>`
        divbukuinduk_ketinfoawal.innerHTML = html2;let html3 = "";
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
        let html2  =`<table class="w3-table garis w3-white w3-small">`
        html2 += `<tr class="w3-light-gray"><td colspan="2" class="w3-center">Buku Induk Kelas Terakhir Tapel ${idTeksTapel}</td></tr>`;
        let txtAwal = idTeksTapel.split("/")[0].substring(2,4);
        let txtAkhir = idTeksTapel.split("/")[1].substring(2,4);
        let n_txtawal = parseInt(txtAwal);
        let n_txtAkhir = parseInt(txtAkhir);
        for(let j = 0 ; j < 6 ; j++){   
            html2 +=`<tr><td>Kelas ${j+1}</td><td>${n_txtawal-j}${n_txtAkhir-j}</td></tr>`;
        
        }
        html2 +=`</table>`
        divbukuinduk_ketinfoawal.innerHTML = html2;
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
    let db = df[0];
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
        head.innerHTML += `<style type="text/css" media="print">@media print {html,body{margin:0;padding:0}@page {size: A4 portrait;}}</style>`;
    }else{
        head.innerHTML += `<style type="text/css" media="print">@media print {html,body{margin:0;padding:0}@page {size: A4 landscape;}}</style>`;
    }
    
    body.innerHTML="";
    if(c == "formulirkirim"){
        let dupp = document.querySelector("."+c);
        let dup= dupp.cloneNode(true);
        let cariinput = dup.querySelectorAll("[data-dbindukutama]"); 
        // console.log(cariinput.length);
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

            if(i == kelasawal){
                for(let j = 0; j < semesterawal.length ; j++){
                    let teks_semester = semesterawal[j];
                    html +=`<button title="Tahun Pelajaran ${tekstapel}" onclick="showdserverinduk('${tapeljalan}',${tokensiswa},'${teks_semester}',${i})" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${i} Semester ${teks_semester}</button>`;
                }
                
            }else if(i == kelasakhir){
                for(let j = 0; j < semesterawal.length ; j++){
                    let teks_semester = semesterawal[j];
                    html +=`<button title="Tahun Pelajaran ${tekstapel}" onclick="showdserverinduk('${tapeljalan}',${tokensiswa},'${teks_semester}',${i})" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${i} Semester ${teks_semester}</button>`;
                }
            }else{
                html +=`<button title="Tahun Pelajaran ${tekstapel}" onclick="showdserverinduk('${tapeljalan}',${tokensiswa},'1',${i})" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${i} Semester 1</button>`;
                html +=`<button title="Tahun Pelajaran ${tekstapel}" onclick="showdserverinduk('${tapeljalan}',${tokensiswa},'2',${i})" class="w3-yellow tangan w3-bottombar w3-border-black" style="padding:5px;font-size:10px;border-radius:10px">Kelas ${i} Semester 2</button>`;
            }
            tapeljalan = tapelawal + (101 * i);
            tekstapel = string_tapel_darinis(tapeljalan);
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
    let db =dbsiswa_bukuinduk.filter(s => s.id == token)[0];
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
         console.log(datainputgada)
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
    html +=`</tr><tr><td style="padding:2px 5px">4.</td><td style="padding:2px 5px">Penyakit</td>`;
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
    <button class="w3-btn w3-yellow w3-round-xlarge w3-bottombar w3-border-black" onclick="printadm('formulirkirim')">PRINT</button>
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
            console.log(f);
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