let linkyangsedangaktif = window.location.href;

const yyyyxmmxdd = (tgl) => {
    let m = tgl.getMonth() + 1;
    let d = tgl.getDate();
    let y = tgl.getFullYear();
    let string = y + "-" + nolxx(m) + "-" + nolxx(d);
    return string
}
const nolxx = (i) => {
    if (i < 10) {
        i = "0" + i;
    };
    return i;
};

if (linkyangsedangaktif.indexOf("guru.html") > -1) {
    document.getElementById("pilihbulanrekap").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek0" value="2022-01-01">Januari 2022</option>
    <option id="indek1" value="2022-02-01">Februari 2022</option>
    <option id="indek2" value="2022-03-01">Maret 2022</option>
    <option id="indek3" value="2022-04-01">April 2022</option>
    <option id="indek4" value="2022-05-01">Mei 2022</option>
    <option id="indek5" value="2022-06-01">Juni 2022</option>`;

    document.getElementById("daftarpilihbulankehadiranguru").innerHTML = `
    <option id="indekaa" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek10a" value="2022-01-01">Januari 2022</option>
    <option id="indek11a" value="2022-02-01">Februari 2022</option>
    <option id="indek12a" value="2022-03-01">Maret 2022</option>
    <option id="indek13a" value="2022-04-01">April 2022</option>
    <option id="indek14a" value="2022-05-01">Mei 2022</option>
    <option id="indek15a" value="2022-06-01">Juni 2022</option>`;

    let kodebarismateriyangdikerjakan = "belumdisi";
    let parameterbantuisiljk = "belumdisi";
    sumber_repository.innerHTML = `
        <option id="repo0" value="0" selected>Silakan Pilih Repository</option>
        <option id="repo1" value="1">Repository dari Sekolah Lain</option>
        <option id="repo2" value="2">Cara Membuat Konten Materi</option>
        <option id="repo3" value="3">Download File KKM dan KD</option>
        `;

    // let teksalamat = "JL. SMP Ratujaya No. 41 RT.005/003 Kel. Ratujaya Kec. Cipayung";
    document.getElementById("editalamatkopsurat").innerHTML = teksalamat;
    if (idJenjang == 6) {
        document.querySelector(".tabolahijazah").style.display = "block";
        document.querySelector(".tabpengumumankelulusan").style.display = "block";
    } else {
        document.querySelector(".tabolahijazah").style.display = "none";
        document.querySelector(".tabpengumumankelulusan").style.display = "none";
    }


} else if (linkyangsedangaktif.indexOf("siswa.html") > -1) {

    if (jlo.id !== pelanggan_id) {
        alert("Maaf, sedang terjadi pembaruan. Silakan login kembali ...." + jlo.id);
        window.localStorage.clear();
        window.location.replace("/index.html")

    }
    if (jenjang == 6) {
        document.querySelector(".menukelulusan").style.display = "block";
        document.querySelector(".barkelulusanku").style.display = "block";
    } else {
        document.querySelector(".menukelulusan").style.display = "none";
        document.querySelector(".barkelulusanku").style.display = "none";

    }

    document.getElementById("siswapilihbulan").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek0" value="2022-01-01">Januari 2022</option>
    <option id="indek1" value="2022-02-01">Februari 2022</option>
    <option id="indek2" value="2022-03-01">Maret 2022</option>
    <option id="indek3" value="2022-04-01">April 2022</option>
    <option id="indek4" value="2022-05-01">Mei 2022</option>
    <option id="indek5" value="2022-06-01">Juni 2022</option>`;


} else if (linkyangsedangaktif.indexOf("gmp.html") > -1) {
    document.getElementById("pilihbulanrekap").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek0" value="2022-01-01">Januari 2022</option>
    <option id="indek1" value="2022-02-01">Februari 2022</option>
    <option id="indek2" value="2022-03-01">Maret 2022</option>
    <option id="indek3" value="2022-04-01">April 2022</option>
    <option id="indek4" value="2022-05-01">Mei 2022</option>
    <option id="indek5" value="2022-06-01">Juni 2022</option>`;

    document.getElementById("daftarpilihbulankehadiranguru").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek10" value="2022-01-01">Januari 2022</option>
    <option id="indek11" value="2022-02-01">Februari 2022</option>
    <option id="indek12" value="2022-03-01">Maret 2022</option>
    <option id="indek13" value="2022-04-01">April 2022</option>
    <option id="indek14" value="2022-05-01">Mei 2022</option>
    <option id="indek15" value="2022-06-01">Juni 2022</option>`;

    let kodebarismateriyangdikerjakan = "belumdisi";
    let parameterbantuisiljk = "belumdisi";
    sumber_repository.innerHTML = `
    <option id="repo0" value="0" selected>Silakan Pilih Repository</option>
    <option id="repo1" value="1">Repository dari Sekolah Lain</option>
    <option id="repo2" value="2">Cara Membuat Konten Materi</option>
    <option id="repo3" value="3">Download File KKM dan KD</option>`;


} else if (linkyangsedangaktif.indexOf("kepsek.html") > -1) {

    document.getElementById("daftarpilihbulankehadiranguru").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek0" value="2022-01-01">Januari 2022</option>
    <option id="indek1" value="2022-02-01">Februari 2022</option>
    <option id="indek2" value="2022-03-01">Maret 2022</option>
    <option id="indek3" value="2022-04-01">April 2022</option>
    <option id="indek4" value="2022-05-01">Mei 2022</option>
    <option id="indek5" value="2022-06-01">Juni 2022</option>`;

} else if (linkyangsedangaktif.indexOf("staff.html") > -1) {

    document.getElementById("daftarpilihbulankehadiranguru").innerHTML = `
    <option id="indeka" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek0" value="2022-01-01">Januari 2022</option>
    <option id="indek1" value="2022-02-01">Februari 2022</option>
    <option id="indek2" value="2022-03-01">Maret 2022</option>
    <option id="indek3" value="2022-04-01">April 2022</option>
    <option id="indek4" value="2022-05-01">Mei 2022</option>
    <option id="indek5" value="2022-06-01">Juni 2022</option>`;
    
    document.getElementById("daftarpilihbulankehadirangurupribadi").innerHTML = `
    <option id="indekab" value="${yyyyxmmxdd(new Date())}">Pilih Bulan</option>
    <option id="indek10" value="2022-01-01">Januari 2022</option>
    <option id="indek11" value="2022-02-01">Februari 2022</option>
    <option id="indek21" value="2022-03-01">Maret 2022</option>
    <option id="indek31" value="2022-04-01">April 2022</option>
    <option id="indek41" value="2022-05-01">Mei 2022</option>
    <option id="indek51" value="2022-06-01">Juni 2022</option>`;

}

var tapel_bulan_ini = new Date().getMonth();
var tapel_bar, semester_bar;
if (tapel_bulan_ini >= 6) {
    tapel_bar = new Date().getFullYear() + "/" + (new Date().getFullYear() + 1);
    semester_bar = 1
} else {
    tapel_bar = (new Date().getFullYear() - 1) + "/" + new Date().getFullYear();
    semester_bar = 2;
}
document.getElementById("tapel").innerHTML = tapel_bar
document.querySelectorAll(".bar_tapel").forEach(k => k.innerHTML = tapel_bar);
document.querySelectorAll(".bar_semester").forEach(k => k.innerHTML = semester_bar);

const timekbm_arraybulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

const pilihrepository = () => {
    //alert("Maaf, fitur belum tersedia dipindah");
    let x = document.getElementById("sumber_repository").selectedIndex;
    let y = document.getElementById("sumber_repository").options;
    let valupilih = y[x].value;
    let idskrip = jlo.id;

    let objsekolah = [
        { "id": 12, "namasekolah": "SDN Ratujaya 1", "url": "https://script.google.com/macros/s/AKfycbxPqrolHWfCdSnRNlNtHIEohGZYejuMrMlvkk5LgrjCoRVlZjH3WQYa39opZGYyZelL/exec?idss=1eRhnBwhHM-WHB3IqnHVjgXrIv5uy2uYOUlZtsGLBClg" },
        { "id": 13, "namasekolah": "SDN Ratujaya 2", "url": "https://script.google.com/macros/s/AKfycby8f-hgB2_EPKSMY0TfOLdnoDbtFIu-G6F7DgKjswA7LgNmZFYGnX1rJMnRRjID27aj/exec?idss=1qtpr5TP2MddbXQWNqRaC33NRVCFc5aeKq419t25UUOU" },
        { "id": 14, "namasekolah": "SDN Pondok Terong 1", "url": "https://script.google.com/macros/s/AKfycbxuUPFfPucrnNqyudaV2yeiNZwVzvVPtMyPBJu83FwXqSMlEEycMBEOy7siSuP0sjZT/exec?idss=1DrveZQ1sVkRj0xzLj40rPyV5MgVi-tHg57RluVWGXk8" },
        { "id": 15, "namasekolah": "SDN Utan Jaya", "url": "https://script.google.com/macros/s/AKfycbx0FVQWA4B7XyVHZcOKRN8vDdnS8cSYcO9m3Ou0eojphUZGqaWNG___7GC2GVw5yE4W/exec?idss=1AlIrI8UAKeJ6v0S4m1F7nHOOZ_B78xSWi054IQOpteA" },
        { "id": 17, "namasekolah": "SDN Cyber Lamaso", "url": "https://script.google.com/macros/s/AKfycbxC3oJhUqUysBZOhg0raOv3EfIlQsMP1yBMBe3g3RTtMnXUQEw-m9Bm1akt6n6gJzSPBQ/exec?idss=1bU1CfElaMKlJkolKphX4JuyDycMHhASwgwjXQIegRik" }
    ];
    let arrsekolah = objsekolah.filter(k => k.id !== idskrip).map(m => m.namasekolah);

    let htmlopt = "";
    for (i = 0; i < arrsekolah.length; i++) {
        htmlopt += `<option id="sekolah${i + 1}" value="${i}">${arrsekolah[i]}</option>`
    };
    urlmaterisekolahlain = objsekolah.filter(s => s.id !== idskrip).map(m => m.url);


    if (valupilih == 0) {
        alert('Silakan pilih opsi repository');
        tabel_repository_sendiri.innerHTML = "";
    } else if (valupilih == 2) {
        tabel_repository_sendiri.innerHTML = `<h4>Cara membuat Konten Materi</h4><div class='containerbaru w3-center'><iframe class='responsive-iframebaru' src='https://www.youtube.com/embed/Kr--xBecwOI' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div>`;

    } else if (valupilih == 1) {
        tabel_repository_sendiri.innerHTML = `<hr/><select onchange='fn7selectreposistory()' id='pilihanrepositorysekolahlain' class='w3-select w3-yellow w3-hover-khaki' >
        <option id='sekolah0' value="" selected>Pilih Sekolah</option>
        ${htmlopt}
        </select>
        <div id="tempatrepositorysekolahlain"></div>
        `
    } else if (valupilih == 3) {
        //<a href="https://drive.google.com/uc?id=11ms2DpGpr71ja5ScL7eVbPnF4dUXANY0&amp;export=download" target="_blank"> DOWNLOAD FILE DI SINI </a>
        tabel_repository_sendiri.innerHTML = `
        <hr>Tabel berikut ini adalah file unggah untuk mengisi data KKM dan KD. Silakan unduh kemudian upload pada menu KURIKULUM tab UPLOAD KURIKULUM di tombol UNGGAH FILE FORMAT
        <table class='versi-table'>
            <tr>
                <th>Jenjang</th>
                <th>Aksi</th>
            </tr>
            <tr>
                <td> Kelas 1 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1OiOKNuU_KOLS5Osg8j9sPnaq7SsE7DI8&export=download' target='_blank'> UNDUH Kelas 1</a></button></td>
            </tr>
            <tr>
                <td> Kelas 2 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1LuSF4YRgNP1AXMxCfWUdzqw2dyk0L655&export=download' target='_blank'> UNDUH Kelas 2</a></button></td>
            </tr>
            <tr>
                <td> Kelas 3 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1QTa6pklrukQzuhurJU5AQGWDqautNQzO&export=download' target='_blank'> UNDUH Kelas 3</a></button></td>
            </tr>
             <tr>
                <td> Kelas 4 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=18-vYgLHb6CgSzmGsB2oloTbd3mH6-TvT&export=download' target='_blank'> UNDUH Kelas 4</a></button></td>
            </tr>
            <tr>
                <td> Kelas 5 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1mW1ag1e1V_DmhtO15xcSD7jH3o2N92SX&export=download' target='_blank'> UNDUH Kelas 5</a></button></td>
            </tr>
            <tr>
                <td> Kelas 6 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1xjM7DsTJCgN6DAqfblk0mi0sjcgvkPji&export=download' target='_blank'> UNDUH Kelas 6</a></button></td>
            </tr>
        </table>
        Keterangan:<br>
        <ul>
            <li>Silakan pilih salah satu file KKM dan KD di atas, lalu Unduh.  Kemudian file diunggah.
            </li><li>Sangat tidak disarankan Anda mengedit langsung dari filenya. Sebab akan mempengaruhi proses rekap nilai Raport
            </li><li>Anda boleh mengeditnya (jika berbeda dengan repository dari Tim Elamaso di Menu UPLOAD KURIKULUM. Di sana tabel KKM dan KD bisa diedit secara manual
            </li><li>Data Indikator pada file-file di tabel di atas adalah data indikator yang telah disusun oleh Tim ELamaso sesuai dengan PERMENDIKBUD No. 37 Tahun 2018
            </li>
        </ul>
        `;
    }

};
const pilihrepositorymapel = () => {
    let x = document.getElementById("sumber_repository").selectedIndex;
    let y = document.getElementById("sumber_repository").options;
    let valupilih = y[x].value;
    let idskrip = jlo.id;

    let objsekolah = [
        { "id": 12, "namasekolah": "SDN Ratujaya 1", "url": "https://script.google.com/macros/s/AKfycbxPqrolHWfCdSnRNlNtHIEohGZYejuMrMlvkk5LgrjCoRVlZjH3WQYa39opZGYyZelL/exec?idss=1eRhnBwhHM-WHB3IqnHVjgXrIv5uy2uYOUlZtsGLBClg" },
        { "id": 13, "namasekolah": "SDN Ratujaya 2", "url": "https://script.google.com/macros/s/AKfycby8f-hgB2_EPKSMY0TfOLdnoDbtFIu-G6F7DgKjswA7LgNmZFYGnX1rJMnRRjID27aj/exec?idss=1qtpr5TP2MddbXQWNqRaC33NRVCFc5aeKq419t25UUOU" },
        { "id": 14, "namasekolah": "SDN Pondok Terong 1", "url": "https://script.google.com/macros/s/AKfycbxuUPFfPucrnNqyudaV2yeiNZwVzvVPtMyPBJu83FwXqSMlEEycMBEOy7siSuP0sjZT/exec?idss=1DrveZQ1sVkRj0xzLj40rPyV5MgVi-tHg57RluVWGXk8" },
        { "id": 15, "namasekolah": "SDN Utan Jaya", "url": "https://script.google.com/macros/s/AKfycbx0FVQWA4B7XyVHZcOKRN8vDdnS8cSYcO9m3Ou0eojphUZGqaWNG___7GC2GVw5yE4W/exec?idss=1AlIrI8UAKeJ6v0S4m1F7nHOOZ_B78xSWi054IQOpteA" },
        { "id": 17, "namasekolah": "SDN Cyber Lamaso", "url": "https://script.google.com/macros/s/AKfycbxC3oJhUqUysBZOhg0raOv3EfIlQsMP1yBMBe3g3RTtMnXUQEw-m9Bm1akt6n6gJzSPBQ/exec?idss=1bU1CfElaMKlJkolKphX4JuyDycMHhASwgwjXQIegRik" }
    ];
    let arrsekolah = objsekolah.filter(k => k.id !== idskrip).map(m => m.namasekolah);

    let htmlopt = "";
    for (i = 0; i < arrsekolah.length; i++) {
        htmlopt += `<option id="sekolah${i + 1}" value="${i}">${arrsekolah[i]}</option>`
    };
    urlmaterisekolahlain = objsekolah.filter(s => s.id !== idskrip).map(m => m.url);


    if (valupilih == 0) {
        alert('Silakan pilih opsi repository');
        tabel_repository_sendiri.innerHTML = "";
    } else if (valupilih == 2) {
        tabel_repository_sendiri.innerHTML = `<h4>Cara membuat Konten Materi</h4><div class='containerbaru w3-center'><iframe class='responsive-iframebaru' src='https://www.youtube.com/embed/Kr--xBecwOI' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div>`;

    } else if (valupilih == 1) {
        tabel_repository_sendiri.innerHTML = `<hr/><select onchange='fn7selectreposistorymapel()' id='pilihanrepositorysekolahlain' class='w3-select w3-blue w3-hover-khaki' >
        <option id='sekolah0' value="" selected>Pilih Sekolah</option>
        ${htmlopt}
        </select>
        <div id="tempatrepositorysekolahlain"></div>
        `;
    } else if (valupilih == 3) {
        //<a href="https://drive.google.com/uc?id=11ms2DpGpr71ja5ScL7eVbPnF4dUXANY0&amp;export=download" target="_blank"> DOWNLOAD FILE DI SINI </a>
        tabel_repository_sendiri.innerHTML = `
        <hr>Tabel berikut ini adalah file unggah untuk mengisi data KKM dan KD. Silakan unduh kemudian upload pada menu KURIKULUM tab UPLOAD KURIKULUM di tombol UNGGAH FILE FORMAT
        <table class='versi-table'>
            <tr>
                <th>Jenjang</th>
                <th>Aksi</th>
            </tr>
            <tr>
                <td> Kelas 1 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1OiOKNuU_KOLS5Osg8j9sPnaq7SsE7DI8&export=download' target='_blank'> UNDUH Kelas 1</a></button></td>
            </tr>
            <tr>
                <td> Kelas 2 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1LuSF4YRgNP1AXMxCfWUdzqw2dyk0L655&export=download' target='_blank'> UNDUH Kelas 2</a></button></td>
            </tr>
            <tr>
                <td> Kelas 3 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1QTa6pklrukQzuhurJU5AQGWDqautNQzO&export=download' target='_blank'> UNDUH Kelas 3</a></button></td>
            </tr>
             <tr>
                <td> Kelas 4 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=18-vYgLHb6CgSzmGsB2oloTbd3mH6-TvT&export=download' target='_blank'> UNDUH Kelas 4</a></button></td>
            </tr>
            <tr>
                <td> Kelas 5 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1mW1ag1e1V_DmhtO15xcSD7jH3o2N92SX&export=download' target='_blank'> UNDUH Kelas 5</a></button></td>
            </tr>
            <tr>
                <td> Kelas 6 </td>
                <td><button class='w3-button w3-blue'><a href='https://drive.google.com/uc?id=1xjM7DsTJCgN6DAqfblk0mi0sjcgvkPji&export=download' target='_blank'> UNDUH Kelas 6</a></button></td>
            </tr>
        </table>
        Keterangan:<br>
        <ul>
            <li>Silakan pilih salah satu file KKM dan KD di atas, lalu Unduh.  Kemudian file diunggah.
            </li><li>Sangat tidak disarankan Anda mengedit langsung dari filenya. Sebab akan mempengaruhi proses rekap nilai Raport
            </li><li>Anda boleh mengeditnya (jika berbeda dengan repository dari Tim Elamaso di Menu UPLOAD KURIKULUM. Di sana tabel KKM dan KD bisa diedit secara manual
            </li><li>Data Indikator pada file-file di tabel di atas adalah data indikator yang telah disusun oleh Tim ELamaso sesuai dengan PERMENDIKBUD No. 37 Tahun 2018
            </li>
        </ul>
        `;
    }

};
function hariefektif(indekbulan, y) {

    let holiday = JSON.parse(localStorage.getItem("TglLibur"));
    let arrLibur = holiday.map(s => Object.keys(s)[0])// result ["2021-5-7","2021-5-8", dst]
        .filter(d => new Date(d).getMonth() == indekbulan && new Date(d).getFullYear() == y && new Date(d).getDay() !== 0 && new Date(d).getDay() !== 6);
    let arrKalender = [];
    let bulanke = (indekbulan + 1);

    let jmlHariKalender = daysInMonth(bulanke, y);
    let weekend;
    for (let i = 1; i <= jmlHariKalender; i++) {
        weekend = new Date(y, indekbulan, i).getDay();
       if(weekend == 0 || weekend == 6){

       }else{
           arrKalender.push(weekend)
       }
    }
    let kal = arrKalender.length;
    let lib = arrLibur.length
    return kal - lib;


};
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

  
const infoupdate = () => {
    loadingljk.style.display = "block";
    fetch("/statis/update.json").then(m => m.json())
        .then(k => {

            // console.log(k.data);

            let html = "<h3 class='w3-center'>Perbaikan beberapa versi </h3><ul class='w3-ul'>";
            for (let i = k.length - 1; i >= 0; i--) {
                html += `<li>Nama Versi ${k[i].namaversi} (Update ${k[i].tanggal})
                <br/><ul style="type-list-style:decimal">`;
                let ket = k[i].ket;
                for (j = 0; j < ket.length; j++) {
                    html += `<li>${ket[j]}</li>`
                }

                html += `</ul></li>`
            };
            html += "</ul>"
            infoloadingljk.innerHTML = html;
        })
        .catch(er => {
            console.log(er);

        })
}

const DataKDKurtilas ={
    "kelas1":[
        {"Tema 1":"Diriku","Subtema 1":"Aku dan Teman Baru","Subtema 2":"Tubuhku","Subtema 3":"Aku Merawat Tubuhku","Subtema 4":"Aku Istimewa"},
        {"Tema 2":"Kegemaranku ","Subtema 1":"Gemar Berolahraga","Subtema 2":"Gemar Bernyanyi dan Menari","Subtema 3":"Gemar Menggambar","Subtema 4":"Gemar Membaca"},
        {"Tema 3":"Kegiatanku ","Subtema 1":"Kegiatan Pagi Hari","Subtema 2":"Kegiatan Siang Hari","Subtema 3":"Kegiatan Sore Hari","Subtema 4":"Kegiatan Malam Hari"},
        {"Tema 4":"Keluargaku","Subtema 1":"Anggota Keluargaku","Subtema 2":"Kegiatan Keluargaku","Subtema 3":"Keluarga Besarku","Subtema 4":"Kebersamaan dalam Keluarga"},
        {"Tema 5":"Pengalamanku","Subtema 1":"Pengalaman Masa Kecil","Subtema 2":"Pengalaman Bersama Teman","Subtema 3":"Pengalaman di Sekolah","Subtema 4":"Pengalaman yang berkesan"},
        {"Tema 6":"Lingkungan Bersih, Sehat, dan Asri","Subtema 1":"Lingkungan Rumahku","Subtema 2":"Lingkungan Sekitar Rumahku","Subtema 3":"Lingkungan Sekolahku","Subtema 4":"Bekerja Sama Menjaga Kebersihan dan Kesehatan Lingkungan"},
        {"Tema 7":"Benda, Hewan, dan Tanaman di Sekitarku","Subtema 1":"Benda Hidup dan Tak Hidup di Sekitarku","Subtema 2":"Hewan di Sekitarku","Subtema 3":"Tanaman di Sekitarku","Subtema 4":"Bentuk, warna, Ukuran, dan Permukaan Benda"},
        {"Tema 8":"Peristiwa Alam","Subtema 1":"Peristiwa Siang dan Malam","Subtema 2":"Kemarau","Subtema 3":"Penghujan","Subtema 4":"Bencana Alam"}
    ],
    "kelas2":[
        {"Tema 1":"Hidup Rukun ","Subtema 1":"Hidup Rukun di Rumah","Subtema 2":"Hidup Rukun dengan Teman Bermain","Subtema 3":"Hidup Rukun di Sekolah","Subtema 4":"Hidup Rukun di Masyarakat"},
        {"Tema 2":"Bermain di Lingkunganku","Subtema 1":"Bermain di Lingkungan Rumah","Subtema 2":"Bermain di Rumah Teman","Subtema 3":"Bermain di Lingkungan Sekolah","Subtema 4":"Bermain di Tempat Wisata"},
        {"Tema 3":"Tugasku Sehari-hari","Subtema 1":"Tugasku Sehari-hari di Rumah","Subtema 2":"Tugasku Sehari-hari di Sekolah","Subtema 3":"Tugasku Sebagai Umat Beragama","Subtema 4":"Tugasku dalam Kehidupan Sosial"},
        {"Tema 4":"Hidup Bersih dan Sehat","Subtema 1":"Hidup Bersih dan Sehat di Rumah","Subtema 2":"Hidup Bersih dan Sehat di Sekolah","Subtema 3":"Hidup Bersih dan Sehat di Tempat Bermain","Subtema 4":"Hidup Bersih dan Sehat di Tempat Umum"},
        {"Tema 5":"Pengalaman ","Subtema 1":"Pengalamanku di Rumah","Subtema 2":"Pengalamanku di Sekolah","Subtema 3":"Pengalamanku di Tempat Bermain","Subtema 4":"Pengalamanku di Tempat Wisata"},
        {"Tema 6":"Merawat Hewan dan Tumbuhan ","Subtema 1":"Hewan di Sekitarku","Subtema 2":"Merawat Hewan di Sekitarku","Subtema 3":"Tumbuhan di Sekitarku","Subtema 4":"Merawat Tumbuhan"},
        {"Tema 7":"Kebersamaan ","Subtema 1":"Kebersamaan di Rumah","Subtema 2":"Kebersamaan di Sekolah","Subtema 3":"Kebersamaan di tempat bermain ","Subtema 4":"Kebersamaan di Tempat Wisata"},
        {"Tema 8":"Keselamatan di rumah dan Perjalanan ","Subtema 1":"Aturan Keselamatan di Rumah","Subtema 2":"Menjaga Keselamatan di Rumah","Subtema 3":"Aturan Keselamatan di Perjalanan","Subtema 4":"Menjaga Keselamatan di Perjalanan"}
    ],
    "kelas3":[
        {"Tema 1":"Pertumbuhan dan Perkembangan Makhluk Hidup  ","Subtema 1":"Ciri-ciri Makhluk Hidup","Subtema 2":"Pertumbuhan dan Perkembangan Manusia","Subtema 3":"Pertumbuhan Hewan","Subtema 4":"Pertumbuhan dan Perkembangan Tumbuhan"},
        {"Tema 2":"Menyayangi Tumbuhan dan Hewan ","Subtema 1":"Manfaat Tumbuhan bagi Kehidupan Manusia","Subtema 2":"Manfaat Hewan bagi Kehidupan Manusia","Subtema 3":"Menyayangi Tumbuhan","Subtema 4":"Menyayangi Hewan"},
        {"Tema 3":"Benda si Sekitarku ","Subtema 1":"Aneka Benda di sekitarku","Subtema 2":"Wujud Benda","Subtema 3":"Perubahan Wujud Benda","Subtema 4":"Keajaiban Perubahan Wujud di Sekitarku"},
        {"Tema 4":"Kewajiban dan Hakku  ","Subtema 1":"Kewajiban dan Hakku di Rumah","Subtema 2":"Kewajiban dan Hakku di Sekolah","Subtema 3":"Kewajiban dan Hakku dalam Bertetangga","Subtema 4":"Kewajiban dan Hakku sebagai Warga Negara"},
        {"Tema 5":"Cuaca","Subtema 1":"Keadaan Cuaca","Subtema 2":"Perubahan Cuaca","Subtema 3":"Pengaruh Perubahan Cuaca Terhadap Kehidupan Manusia","Subtema 4":"Cuaca, Musim, dan Iklim"},
        {"Tema 6":"Energi dan Perubahannya","Subtema 1":"Sumber Energi","Subtema 2":"Perubahan Energi","Subtema 3":"Energi Alternatif","Subtema 4":"Penghematan Energi"},
        {"Tema 7":"Perkembangan Teknologi","Subtema 1":"Perkembangan Teknologi Produksi Pangan","Subtema 2":"Perkembangan Teknologi Produksi Sandang","Subtema 3":"Perkembangan Teknologi Komunikasi","Subtema 4":"Perkembangan Teknologi Transportasi"},
        {"Tema 8":"Praja Muda Karana","Subtema 1":"Aku Anggota Pramuka","Subtema 2":"Aku Anak Mandiri","Subtema 3":"Aku Suka Berpetualang","Subtema 4":"Aku Suka Berkarya"}
    ],
    "kelas 4":[
        {"Tema 1":"Indahnya kebersamaan ","Subtema 1":"Keberagaman Budaya Bangsaku","Subtema 2":"Kebersamaan dalam keberagaman","Subtema 3":"Bersyukur atas Keberagaman"},
        {"Tema 2":"Selalu Berhemat Energi","Subtema 1":"Sumber Energi","Subtema 2":"Manfaat Energi","Subtema 3":"Energi Alternatif"},
        {"Tema 3":"Peduli Terhadap Makhluk Hidup ","Subtema 1":"Hewan dan Tumbuhan di Lingkungan Rumahku","Subtema 2":"Keberagaman Makhluk Hidup di Lingkunganku","Subtema 3":"Ayo, Cintai Lingkungan"},
        {"Tema 4":"Berbagai Pekerjaan ","Subtema 1":"Jenis-jenis Pekerjaan","Subtema 2":"Pekerjaan di Sekitarku","Subtema 3":"Pekerjaan Orang Tuaku"},
        {"Tema 5":"Pahlawanku ","Subtema 1":"Perjuangan Para Pahlawan","Subtema 2":"Pahlawanku Kebanggaanku","Subtema 3":"Sikap Kepahlawanan"},
        {"Tema 6":"Cita-citaku ","Subtema 1":"Aku dan Cita-citaku","Subtema 2":"Hebatnya Cita-citaku ","Subtema 3":"Giat Berusaha Meraih Cita-cita"},
        {"Tema 7":"Indahnya Keragaman di Negeriku ","Subtema 1":"Keberagaman Suku Bangsa dan Agama di Negeriku","Subtema 2":"Indahnya Keragaman Budaya Negeriku","Subtema 3":"Indahnya Persatuan dan Kesatuan Negeriku"},
        {"Tema 8":"Daerah Tempat Tinggalku ","Subtema 1":"Lingkungan Tempat Tinggalku","Subtema 2":"Keunikan Daerah Tempat Tinggalku","Subtema 3":"Bangga Terhadap Daerah Tempat Tinggalku"},
        {"Tema 9":"Kayanya Negeriku","Subtema 1":"Kekayaan Sumber energi di Indonesia","Subtema 2":"Pemanfaatan Kekayaan Alam di Indonesia","Subtema 3":"Pelestaraian Kekayaan Sumber Daya Alam di Indonesia"}
    ],
    "kelas5":[
        {"Tema 1":"Organ gerak hewan dan manusia","Subtema 1":"organ gerak hewan","Subtema 2":"manusia dan lingkungan","Subtema 3":"lingkungan dan manfaatnya"},
        {"Tema 2":"Udara bersih bagi kesehatan","Subtema 1":"cara tubuh mengolah udara bersih","Subtema 2":"pentingnya udara bersih bagi pernapasan","Subtema 3":"memelihara kesehatan organ pernapasan manusia"},
        {"Tema 3":"Makanan sehat","Subtema 1":"bagaimana tubuh mengolah makanan?","Subtema 2":"pentingnya makanan sehat bagi tubuh","Subtema 3":"pentingnya menjaga asupan makanan sehat","Subtema 4":"karyaku prestasiku"},
        {"Tema 4":"Sehat itu penting","Subtema 1":"peredaran darahku sehat","Subtema 2":"gangguan kesehatan pada organ peredaran darah","Subtema 3":"cara memelihara kesehatan organ peredaran darah manusia","Subtema 4":"kegiatan berbasis proyek dan literasi"},
        {"Tema 5":"Ekosistem","Subtema 1":"komponen ekosistem","Subtema 2":"hubungan antarmakhluk hidup dalam ekosistem","Subtema 3":"keseimbangan ekosistem"},
        {"Tema 6":"Panas dan perpindahannya","Subtema 1":"Suhu dan kalor","Subtema 2":"perpindahan kalor di sekitar kita","Subtema 3":"pengaruh kalor terhadap kehidupan","Subtema 4":"literasi"},
        {"Tema 7":"peristiwa dalam kehidupan","Subtema 1":"peristiwa kebangsaan masa penjajahan","Subtema 2":"peristiwa kebangsaan seputar proklamasi kemerdekaan","Subtema 3":"peristiwa mengisi kemerdekaan"},
        {"Tema 8":"lingkungan sahabat kita","Subtema 1":"manusia dan lingkungan","Subtema 2":"perubahan lingkungan","Subtema 3":"usaha pelestarian lingkungan","Subtema 4":"kegiatan berbasis proyek dan literasi"},
        {"Tema 9":"benda-benda di sekitar kita","Subtema 1":"benda tunggal dan campuran","Subtema 2":"benda dalam kegiatan ekonomi","Subtema 3":"manusia dan benda di lingkungannya","Subtema 4":"kegiatan berbasis literasi"}
    ],
    "kelas6":[
        {"Tema 1":"Selamatkan makhluk hkidup","Subtema 1":"tumbuhan sahabatku","Subtema 2":"hewan sahabatku","Subtema 3":"ayo selamatkan hewan dan tumbuhan"},
        {"Tema 2":"Persatuan dalam perbedaan","Subtema 1":"rukun dalam perbedaan","Subtema 2":"bekerja sama mencapai tujuan","Subtema 3":"bersatu kita teguh"},
        {"Tema 3":"Tokoh dan penemuan","Subtema 1":"Penemu yang mengubah dunia","Subtema 2":"penemu dan manfaatnya","Subtema 3":"Ayo, menjadi penemu"},
        {"Tema 4":"Globalisasi","Subtema 1":"globalisasi di sekitarku","Subtema 2":"globalisasi dan manfaatnya","Subtema 3":"globalisasi dan cinta tanah air"},
        {"Tema 5":"Wirausaha","Subtema 1":"kerja keras berbuah kesuksesan","Subtema 2":"usaha di sekitarku","Subtema 3":"ayo, belajar berwirausaha"},
        {"Tema 6":"Menuju masyarakat sejahtera","Subtema 1":"Masyarakat peduli lingkungan","Subtema 2":"membangun masyarakat sejahtera","Subtema 3":"masyarakat sejahtera, negara kuat"},
        {"Tema 7":"Kepemimpinan ","Subtema 1":"Pemimpin di sekitarku","Subtema 2":"pemimpin idolaku","Subtema 3":"ayo, memimpin"},
        {"Tema 8":"Bumiku","Subtema 1":"Perbedaan waktu dan pengaruhnya","Subtema 2":"bumiku dan musimnya","Subtema 3":"bumi, matahari, dan bulan"},
        {"Tema 9":"Menjelajah angkasa luar","Subtema 1":"Keteraturan yang menakjubkna","Subtema 2":"Benda angkasa luar dan rahasianya ","Subtema 3":"Tokoh penjelajah ruang angkasa"}
    ]

}
const LingkupMateri = {
    "PAI":["Al-Quran dan Hadits","Akidah","Akhlak","Fiqih","Sejarah peradaban Islam"],
    "PKRIS":["Allah tritunggal dan karyanya","Nilai-nilai Kristiani"],
    "PKATO":["Pribadi Siswa","Yesus Kristus","Gereja","Masyarakat"],
    "PKN":["Persatuan dan Kesatuan","HAM","Pancasila"],
    "BINDO":["Membaca nonsastra", "Membaca Sastra","Menulis terbatas","Menyunting kata/istilah, frase, kalimat, paragraf, ejaan, dan tanda baca"],
    "MTK":["Bilangan","Geometri dan Pengukuran","Statistika Penyajian Data"],
    "IPA":["Makhluk hidup dan lingkungannya","Struktur dan fungsi makhluk hidup","Benda dan sifatnya","Energi dan Perubahannya","Bumi dan Alam Semesta"],
    "IPS":["Geografi","Ekonomi","Sosiologi","Sejarah"],
    "SBDP":["Seni rupa","Seni musik","Seni Tari","Seni Drama", "Keterampilan"],
    "PJOK":["Aktivitas permainan bola besar dan bola kecil","Aktivitas Atletik","Aktivitas Beladiri","Aktivitas Pengembangan Kebugaran Jasmani","Aktivitas Senam","Aktivitas gerak berirama","Aktivitas Air dan Keselamatan Diri","Kesehatan"],
    "BSUND":["Membaca nonsastra", "Membaca Sastra","Menulis terbatas","Menyunting kata/istilah, frase, kalimat, paragraf, ejaan, dan tanda baca"]

}

function findDuplicateIds() {
    var ids = {};
    var all = document.all || document.getElementsByTagName("*");
    for (var i = 0, l = all.length; i < l; i++) {
        var id = all[i].id;
        if (id) {
            if (ids[id]) {
                console.log("Duplicate id: #" + id);
            } else {
                ids[id] = 1;
            }
        }
    }
};