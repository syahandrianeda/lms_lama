const pelanggan_id = 18;//
/**
 * data pelangganid 
 
 * = 6  --> tapel: 2021 (2)
 * = 18 --> tapel: 2122 (1)
 * = 22 --> tapel: 2122 (2)
 * 
 * 
 */
const idlogo = "1BZwicOBix4eILY0IQrJs4H825w2k4g-3";

const arrayheadsumber = ['id', 'jenjang', 'nama_rombel', 'nis', 'nisn', 'nik', 'nokk', 'pd_nama', 'pd_jk', 'pd_tl', 'pd_tanggallahir', 'pd_agama', 'pd_namaayah', 'pd_namaibu', 'pd_alamat', 'pd_hp', 'aktif', 'dieditoleh', 'action', 'usulanperubahandata', 'dapo_rt', 'dapo_rw', 'dapo_dusun', 'dapo_kelurahan', 'dapo_kecamatan', 'dapo_kodepos', 'dapo_jenistinggal', 'dapo_alattransportasi', 'dapo_telepon', 'dapo_email', 'dapo_skhun', 'dapo_penerimakps', 'dapo_nokps', 'dapo_tahunlahirayah', 'dapo_jenjangpendidikanayah', 'dapo_pekerjaanayah', 'dapo_penghasilanayah', 'dapo_nikayah', 'dapo_tahunlahiribu', 'dapo_jenjangpendidikanibu', 'dapo_pekerjaanibu', 'dapo_penghasilanibu', 'dapo_nikibu', 'dapo_namawali', 'dapo_tahunlahirwali', 'dapo_jenjangpendidikanwali', 'dapo_pekerjaanwali', 'dapo_penghasilanwali', 'dapo_nikwali', 'dapo_nopesertaujiannasional', 'dapo_noseriijazah', 'dapo_penerimakip', 'dapo_nomorkip', 'dapo_namadikip', 'dapo_nomorkks', 'dapo_noregistrasiaktalahir', 'dapo_bank', 'dapo_nomorrekeningbank', 'dapo_rekeningatasnama', 'dapo_layakpip', 'dapo_alasanlayakpip', 'dapo_kebutuhankhusus', 'dapo_sekolahasal', 'dapo_anakkeberapa', 'dapo_lintang', 'dapo_bujur', 'dapo_beratbadan', 'dapo_tinggibadan', 'dapo_lingkarkepala', 'dapo_jumlahsaudarakandung', 'dapo_jarakrumahkesekolah', 'dok_akte', 'dok_kk', 'dok_kip', 'dok_kks', 'dok_kpspkh', 'dapo_kota', 'dapo_provinsi'];
const lat2 = -6.419750106636168; //-6.434479849479324;//-6.416464808712735;//-6.4198454;
const lon2 = 106.81287155720607; //106.81127175474957;//106.80206417637098;//106.8134214;
const teksalamat = "JL. SMP Ratujaya No. 41 RT.05/RW.03 Kel. Ratujaya - Kec. Cipayung";

const web2122semester1 = "https://tapel2122semester1.edurasa.com/";
const web2021semester2 = "https://tapel2021semester2.edurasa.com/";
const webnow = "https://edurasa.com";

//ratujaya1 -6.419750106636168, 106.81287155720607
const arrayeduraprofilsekolah = ["kodesekolah", "nis", "nss", "npsn", "statussekolah", "akreditasi", "tahunpendirian", "noijin", "tanggal", "alamat", "kelurahan", "telepon", "email", "visi", "misi", "mampu", "kurangmampu", "tidakmampu", "hakmilik_luastanah", "bukanhakmilik_luastanah", "hakmilik_digunakanbangunan", "bukanhakmilik_digunakanbangunan", "asaltanah", "hakmilik_surathakmilik", "bukanhakmilik_surathakmilik", "luastanahrkb", "br_jumlahbangunan_jumlah", "br_jumlahbangunan_b", "br_jumlahbangunan_s", "br_jumlahbangunan_rr", "br_jumlahbangunan_rb", "br_jumlahbangunan_rt", "br_jumlahruangankelas_jumlah", "br_jumlahruangankelas_b", "br_jumlahruangankelas_s", "br_jumlahruangankelas_rr", "br_jumlahruangankelas_rb", "br_jumlahruangankelas_rt", "br_jumlahruanganperpustakaan_jumlah",
"br_jumlahruanganperpustakaan_b", "br_jumlahruanganperpustakaan_s", "br_jumlahruanganperpustakaan_rr", "br_jumlahruanganperpustakaan_rb", "br_jumlahruanganperpustakaan_rt", "br_jumlahruangankomputer_jumlah", "br_jumlahruangankomputer_b", "br_jumlahruangankomputer_s", "br_jumlahruangankomputer_rr", "br_jumlahruangankomputer_rb", "br_jumlahruangankomputer_rt", "br_jumlahruanganlaboratorium_jumlah", "br_jumlahruanganlaboratorium_b", "br_jumlahruanganlaboratorium_s", "br_jumlahruanganlaboratorium_rr", "br_jumlahruanganlaboratorium_rb", "br_jumlahruanganlaboratorium_rt", "br_jumlahruanggurutu_jumlah", "br_jumlahruanggurutu_b", "br_jumlahruanggurutu_s", "br_jumlahruanggurutu_rr", "br_jumlahruanggurutu_rb", "br_jumlahruanggurutu_rt", "br_wcsiswa_jumlah", "br_wcsiswa_b", "br_wcsiswa_s", "br_wcsiswa_rr", "br_wcsiswa_rb", "br_wcsiswa_rt", "br_wcguru_jumlah", "br_wcguru_b", "br_wcguru_s", "br_wcguru_rr", "br_wcguru_rb", "br_wcguru_rt", "br_rumahdinaskepsek_jumlah", "br_rumahdinaskepsek_b", "br_rumahdinaskepsek_s", "br_rumahdinaskepsek_rr", "br_rumahdinaskepsek_rb", "br_rumahdinaskepsek_rt", "br_rumahdinasguru_jumlah", "br_rumahdinasguru_b", "br_rumahdinasguru_s", "br_rumahdinasguru_rr", "br_rumahdinasguru_rb", "br_rumahdinasguru_rt", "br_rumahdinaspenjaga_jumlah", "br_rumahdinaspenjaga_b", "br_rumahdinaspenjaga_s", "br_rumahdinaspenjaga_rr", "br_rumahdinaspenjaga_rb", "br_rumahdinaspenjaga_rt", "br_saranaairbersih", "br_saranalistrik", "sd_mejasiswadouble_jumlah", "sd_mejasiswadouble_b", "sd_mejasiswadouble_ok", "sd_mejasiswadouble_r", "sd_bangkudouble_jumlah", "sd_bangkudouble_b", "sd_bangkudouble_ok", "sd_bangkudouble_r", "sd_mejasiswasingle_jumlah", "sd_mejasiswasingle_b", "sd_mejasiswasingle_ok", "sd_mejasiswasingle_r", "sd_kursisingle_jumlah", "sd_kursisingle_b", "sd_kursisingle_ok", "sd_kursisingle_r", "sd_lemari_jumlah", "sd_lemari_b", "sd_lemari_ok", "sd_lemari_r", "sd_mejaguru_jumlah", "sd_mejaguru_b", "sd_mejaguru_ok", "sd_mejaguru_r", "sd_kursiguru_jumlah", "sd_kursiguru_b", "sd_kursiguru_ok", "sd_kursiguru_r", "sd_papantulis_jumlah", "sd_papantulis_b", "sd_papantulis_ok", "sd_papantulis_r", "sd_kursitamu_jumlah", "sd_kursitamu_b", "sd_kursitamu_ok", "sd_kursitamu_r", "sd_rakbuku_jumlah", "sd_rakbuku_b", "sd_rakbuku_ok", "sd_rakbuku_r", "sd_komputer_jumlah", "sd_komputer_b", "sd_komputer_ok", "sd_komputer_r"];
const angkadistring = ["nis", "nisn", "nik", "nokk", "pd_hp", "dapo_nikayah", "dapo_nikibu", "dapo_nikwali", "dapo_jarakrumahkesekolah"];

//const linkdatabaseinduk = "https://script.google.com/macros/s/AKfycbwPW2_0HTb2QwiN00dbds8v6D4iyNggGCerGUOFrU4ZLNCvu9-1P20QoIxN-QjPRfJ0eA/exec"; // dari gmail akun belajar
const linkdatabaseinduk = "https://script.google.com/macros/s/AKfycbxvMhDHAQaMvpxPcgbsu3SJ3hEMx4Rwz_8n9b4NsRmnvGvjoWYL1A7m49kTyctFYyU/exec";
const ss_induk = "1C79fJQx4F1bCUAbUvaFcpaNSyRMQd4k0-xq1ot2sB7k";
const dbinduk_tapel_teks = "2021/2022";
const dbinduk_tapel_integer = 2122;
const objek_spreadsheet_absen = {"kelas1":"1YojISyuTT2zMlTdS-WPRJPQ-EV2dJs7jWPotLcYUSuc","kelas2":"1o1qdBrNoDGphyf4azrwFLwVGoysa_BqdY11Q3Ea_cns","kelas3":"1x8HMlgoCkgkav5WQThX7GdDVJ6CLC3pSndF53zIvfYk","kelas4":"1-OBGzapLRlMdU93iYqr8UTTF1jhNwl1P5GNMNNavxQ4","kelas5":"1QdhTEJTOZJqT1hB2iPx0yNusYK0i12H0L0Le43JaKdo","kelas6":"16_JoT4Y045Siua6PXeKftiFEaf8x4hOr7oyiapQk-lA"};
const tanggalpengumumankenaikankelulusan = new Date(2022, 5, 15, 9, 0, 0);