let urladm = jlo.ss_datanilai;
let petakd_semster="";
let tagrppserver;

const arrTagAdm = ["0","prota","prosem","silabus","rpp","kisi-kisi","petakd","sebarankd","soal","ph","pts","pak","pat","perbaikan","pengayaan","kkm","notularapat","kaldik"];
const arrVersi = ["0","Mata Pelajaran","Tematik","Subtema","Pembelajaran","sebaran KD per tema","sebaran KD per semester","kaldik","HBE"]


let editore = document.querySelector("#editor_ade");
const doc = editore.contentDocument || editore.contentWindow.document;
        doc.body.designMode = "on";
        doc.body.setAttribute("spellcheck","false");
        doc.body.setAttribute("contenteditable","true");
        doc.body.setAttribute("id","edt");
        // let divdulu = doc.createElement("div");
        // divdulu.innerHTML = " ";
        // doc.body.appendChild(divdulu);
        // let divbayangan = doc.createElement("div");
        // doc.body.appendChild(divbayangan);
        
    // tambahkan style edurasa;
    var root = window.location.origin;
    doc.head.innerHTML = `<link rel="stylesheet" href="${root}/css/w3.css">
    <link href="https://fonts.googleapis.com/css?family=Raleway">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <link rel="stylesheet" href="${root}/css/cssiframe_stylegurukelas.css">`;
    
doc.addEventListener("input",(e)=>{
    
    let v = e.target;//.innerHTML;
    // console.log(v)
    //console.log(v.children.length)
    //console.log(v.childNodes[0].nodeName)
    //console.log(v.innerHTML);
    let v0 = v.innerHTML;
    if(v.childNodes[0].nodeName == "#text"){
        //alert("Tekan enter dulu")
        //console.log("true")
        //return;//
        //e.preventDefault()
        doc.body.innerHTML = "<div>"+v.innerHTML+"</div>";
        
    }else{
       // console.log("false")

    }
    // let sel = doc.getSelection();
    // let selrange = sel.getRangeAt(0);
    // let selectiondom = selrange.cloneContents();
    let dom = v.querySelectorAll(".calcnosoal");
    //console.log(dom)
    let div = document.querySelector(".tekeditorpg");
    let divradiopg = document.getElementById("divbantu_kuncijawaban");
    let html = "Belum Terdeteksi adanya Pilihan Ganda/Essay";
    let el_input = "";
    let cekkunci = deteksikuncipg();
    document.getElementById("barukuncipgtemporary").value = cekkunci;
    if(dom.length>0){
        let datapg = [];
        for(i = 0 ; i < dom.length ; i ++){
            let pg = {};
            let cekno = dom[i].getAttribute("id");
            let no = cekno.match(/(\d+)/)[0];
            pg["no"] = no;
            let opsipg = [];
            let cekabcd = []
            let sibling = dom[i].querySelectorAll(".calc")

            for(j = 0 ; j < sibling.length; j++){
                let inpgg = sibling[j].getAttribute("id");
                let inpg = inpgg.match(/[ABCD]/)[0];
                let tck = inpgg.match(/[ABCD]/)["input"];
                opsipg.push(inpg)
                cekabcd.push(tck);
            }
            pg["datapg"] = opsipg;
            pg["abcd"] = cekabcd;
            datapg.push(pg);
        }
        //console.log(datapg);
        html = `<table class="w3-table-all w3-tiny garis w3-centered"><tr><th>No Soal</th><th colspan="4">Opsi Jawaban<br/><sub>(Klik hurufny, huruf yang menyala adalah kunci jawaban pilihan Anda</sub></th></tr>`;
        for(k = 0 ; k <datapg.length ; k++){
            html +=`<tr><td class="warnaeka">${datapg[k].no}</td>`;
            let arrayabcd = datapg[k].datapg;
            let arrayopsi = datapg[k].abcd;
            for(l = 0 ; l <arrayopsi.length ; l++){
                let kelastambahan = " ";
                if(cekkunci.indexOf(arrayopsi[l])>-1){
kelastambahan = "w3-light-blue"
                }
                html += `<td class="tdpg_pgeditor_${arrayopsi[l]} tdnosoal_editor_${datapg[k].no} td_ke${l} ${kelastambahan}" style="cursor:pointer">
                <label for="tomboleditor_bantuopsi${arrayopsi[l]}" class="lbl_pgeditor_${arrayopsi[l]}">${arrayabcd[l]}</label>
                </td>`;
                el_input += `<br/><input type="radio" id="tomboleditor_bantuopsi${arrayopsi[l]}" name="rdsoal_${datapg[k].no}" class="pg_buatkuncikd" value="${arrayopsi[l]}" onchange="checked_buatkunci(this)"/>${arrayopsi[l]}`;

            }
            html+=`</tr>`
        }
        html +=`</table>`;

    }

    // div.innerHTML = html;
    // divradiopg.innerHTML = el_input;
    //jika sudah membuat ceklis jawaban, ketika ada PG baru jangan dihapus lagi
    // for(n = 0 ; n < cekkunci.length ; n++){
    //     let mm = document.getElementById("tomboleditor_bantuopsi"+cekkunci[n]);
    //     if(mm !== null ||mm !== undefined){
    //         // document.getElementById("tomboleditor_bantuopsi"+cekkunci[n]).checked = true;
    //         let rd = document.getElementById("tomboleditor_bantuopsi"+cekkunci[n]);
    //         checked_buatkunci(rd);
    //     }
    // }
    //MENDETEKSI SOAL PG
    let arrsoalpg = deteksinomorsoalpg()
    document.formuploadmateri.jumlahpg.value = arrsoalpg.length;
    
    let arrsoalessay = deteksinomorsoalessay()
    document.formuploadmateri.jumlahessay.value = arrsoalessay.length;

    // //ketika menekan enter pada template soal, maka
    
    // doc.addEventListener("keyup",(ev)=>{
    //     //
    //     if(ev.keyCode === 13) {
    //        //let d = document.querySelectorAll("refuseenter")
    //        let ee = e.target.lastChild;;
    //        let eed = e.target.lastChild.parentNode;;
    //        console.log(ee)
    //        console.log(eee)
    //     }else{
    //         console.log("tidak terdeteksi enter")
    //     }
    // })
    deteksiAllsoal();
    
    //console.log(v);
    let tt = v.querySelectorAll("div")
    //console.log(tt);
    let inteks, teksSebaran,str_kd_kunci;;

    for(j = 0 ; j < tt.length; j++){
        inteks = tt[j].innerHTML
        //val_jt +=inteks;
        if(inteks.indexOf("_KUNCI-KD_")>-1){
            str_kd_kunci = inteks.replace(/&lt;\|\|&gt;/g," <||> ");;//.replace("_KUNCI-KD_",""); 
            teksSebaran = inteks.replace("_KUNCI-KD_","").split("&lt;||&gt;");
            break;

        }
    }
    //console.log(teksSebaran);
                    //mengurutkan soal;
        let jtKD4 = ["kpraktik", "kproduk", "kproyek", "uspraktek"];
        let seljt = document.getElementById("jenistagihan");
        let valjt = seljt.options[seljt.selectedIndex].value;

        let htmlsebaran ="Belum terdeksi";
        if(teksSebaran !== undefined ){
        // if(str_kd_kunci !== undefined || str_kd_kunci !== null){
             let arr0 = str_kd_kunci.replace("_KUNCI-KD_", "");
                 let arr1 = arr0.replace(/\s+/gm, "")
                let grup = arr1.split("<||>");//split(/&lt;\|\|&gt;/);//
                //console.log(grup)
                //let htmlsebaran = ""
                if (valjt == "") {
                    htmlsebaran = `Anda Akan membuat konten materi jenis tagihan tanpa menerima respon jawaban siswa namun sebaran KD sifatnya wajib. Untuk membantu menggenerate sebaran KD, klik tombol <label for="modal_generate_sebarankd" class="w3-button warnaeka w3-border-bottom w3-border-black w3-round-large">Generate Sebaran KD</label>.(Jika belum Berubah, ketikan sesuatu di teks area materi)`;
                } else {

                }

                let indekjt = jtKD4.indexOf(valjt);
                // console.log(indekjt);
                // console.log(valjt);

                let stKD3apaKD4 = ""
                if (indekjt == -1) {
                    stKD3apaKD4 = " Kompetensi Pengetahuan (KD-3) "
                } else {
                    stKD3apaKD4 = " Kompetensi Keterampilan (KD-4) "

                }

                htmlsebaran = "SEBARAN KD TERDETEKSI<br/>"
                htmlsebaran += `Anda memilih jenis Tagihan <span class="w3-card-4 w3-margin-bottom warnaeka"> ${stKD3apaKD4}</span>.<br/><br/>
                    Atau Jika Anda perlu membuat sebaran KD dari fitur elamaso, silakan klik <label for="modal_generate_sebarankd" class="w3-button warnaeka w3-border-bottom w3-border-black w3-round-large">Generate Sebaran KD</label>
                    <br/><br/>
                    Berikut hasil tabel Sebran KD pada konten materi Anda yang terbaca oleh sistem:
                    <table class="w3-table-all w3-bordered"><tr>
                    <th>Mata Pelajaran (Kode)</th>
                    <th>No KD</th>
                    <th>Nomor Soal</th>
                    </tr>`;
                for (let g = 0; g < grup.length; g++) {
                    let grupmapel = grup[g].split(":");
                    htmlsebaran += `<tr>
                        <td>${grupmapel[0].split("_")[0]}</td>
                        <td>${grupmapel[0].split("_")[1]}</td>
                        <td>${grupmapel[1]}</td>
                        <td></td></tr>`
                }
                htmlsebaran += `</table><hr/> Berdasarkan Urutan Soal
                   <div class="w3-card-4">
                    `;
                //mengurutkan soal;
                let mod_str = JSON.parse(objekKD(str_kd_kunci));
                let mod_obj = ubahjsonkuncikd(mod_str);

                let oo = Object.keys(mod_obj);

                for (h = 0; h < oo.length; h++) {
                    htmlsebaran += `<div class="w3-left w3-margin warnaeka w3-border-bottom w3-border-black w3-padding w3-round w3-text-black">
                        <span class="w3-badge w3-margin-right w3-white">${oo[h]}</span> ${mod_obj[oo[h]].split("_")[0]} KD ${mod_obj[oo[h]].split("_")[1]}
                        </div>`

                }


                // console.log(mod_str);
                // console.log(mod_obj);
                htmlsebaran += `</div>`

        }else{
            htmlsebaran = `Anda Akan membuat konten materi jenis tagihan tanpa menerima respon jawaban siswa namun sebaran KD sifatnya wajib. Untuk membantu menggenerate sebaran KD, klik tombol <label for="modal_generate_sebarankd" class="w3-button warnaeka w3-border-bottom w3-border-black w3-round-large">Generate Sebaran KD</label>.(Jika belum Berubah, ketikan sesuatu di teks area materi)`;
        }
        document.querySelector(".tekesebarankd").innerHTML = htmlsebaran

    let ketesay ="<hr>";
    if (arrsoalessay.length == 0) {
            ketesay += "TIDAK TERDETEKSI ADANYA SOAL ESSAY"
        } else {
            ketesay += "SOAL ESSAY TERDETEKSI:<br/>"
            ketesay += `Nomor-nomor soal Essay<br/><br/>`;
            arrsoalessay.forEach(element => {
                ketesay += `<span class="w3-badge warnaeka w3-border-bottom w3-border-black w3-margin w3-text-black">${element}</span>`
            });

        }   
        div.innerHTML = html + ketesay;
        divradiopg.innerHTML = el_input; 
    //mendeteksi KD yang teredetksi
    // let adakd = v.indexOf("_KUNCI-KD_");
    // let htmlsebaran ="";
    // let jtKD4 = ["kpraktik", "kproduk", "kproyek", "uspraktek"];
    // if(adakd == -1){
    //     htmlsebaran = `Anda Akan membuat konten materi jenis tagihan tanpa menerima respon jawaban siswa namun sebaran KD sifatnya wajib. Untuk membantu menggenerate sebaran KD, klik tombol <label for="modal_generate_sebarankd" class="w3-button warnaeka w3-border-bottom w3-border-black w3-round-large">Generate Sebaran KD</label>.(Jika belum Berubah, ketikan sesuatu di teks area materi)`

    // }else{
    //     //tentukan KD-KD-nya: dari _KUNCI-KD_ IPA_3.1:1, 2, 3 <||> IPS_3.2:4,5, jadi : IPA_3.1 :

    //     //jika Ada, cek apakah KD3 apa KD4

    // }
    // for(n = 0 ; n < cekkunci.length ; n++){
    //     let mm = document.getElementById("tomboleditor_bantuopsi"+cekkunci[n]);
    //     if(mm !== null ||mm !== undefined){
    //         // document.getElementById("tomboleditor_bantuopsi"+cekkunci[n]).checked = true;
    //         let rd = document.getElementById("tomboleditor_bantuopsi"+cekkunci[n]);
    //         checked_buatkunci(rd);
    //     }
    // }
    let divdeteksi = doc.querySelectorAll("[data-sourcebanksoalid]");
    if(divdeteksi.length == 0){
        document.getElementById("infosementarakdbanksoal").innerHTML ="Tidak ada soal yang diambil dari fitur Bank Soal"
    }
})
 
const deteksikuncipg = () =>{
      //cari teks yang ada _KUNCI-PG_
        let cekpg = doc.body.querySelectorAll("div");
        let bol = false;
        let tekscek;
        let arraykunci = [];
        for(m = 0 ; m < cekpg.length ; m++){
            tekscek = cekpg[m].innerHTML;
            if(tekscek.indexOf("_KUNCI-PG_")>-1){
                bol = true;
                let s_to_array = tekscek.replace("_KUNCI-PG_","");//
                let space = s_to_array.replace(/\s+|<br>|&nbsp;|\r|\n|\r\n/gm,"");//.replace(/<br>/g,"");
                arraykunci = space.split(",");
                break;
            }
        };
        return arraykunci
        // console.log(bol);
        // console.log(arraykunci);
        // if(bol){
        //     for(a = 0 ; a < arraykunci.length ; a++){
        //         console.log(arraykunci[a]);
        //         let tdjwb = document.querySelector(".tdpg_pgeditor_" + arraykunci[a]);//
        //         let tdjwbd = tdjwb.className;
        //         console.log(tdjwbd)
        //         if(tdjwbd.indexOf("w3-light-blue")>-1){
        //             tdjwb.className = tdjwbd + " w3-light-blue";
        //         } 
        //     }
        // }
}
const objeksebarankd = () =>{

}
const checked_buatkunci = (el) => {
    if(el== null){
        console.log("belum terdeteksi");
        return
    }
    
    let opsilengkap = el.value; //1A
    let no = el.value.match(/\d+/); //1A
    let ele = document.querySelectorAll(".tdnosoal_editor_" + no);
    let elaktif = document.querySelector(".tdpg_pgeditor_" + opsilengkap);
    //hapus dulu bg warannya;
    for (i = 0; i < ele.length; i++) {
        // ele[i].className = ele[i].className.replace("w3-light-blue", "");
        ele[i].classList.remove("w3-light-blue");
    };
    // elaktif.className += " w3-light-blue";
    elaktif.classList.add("w3-light-blue");

    // let textarea = document.getElementById("idmateri");
    // let val = textarea.value;
    // let n = val.length;
    // let awal = val.indexOf("_KUNCI-PG_");
    // let batasawal = val.substring(awal, n)

    // let str_pg_kunci = batasawal.split("\n")[0];

    //let ceklis = document.querySelectorAll(".pg_buatkuncikd");
    // for (j = 0; j < ceklis.length; j++) {
        //     if (ceklis[j].checked) {
            //         let n = ceklis[j].value;
            
            //         arrceklis.push(n)
            
            //     }
            
            // }
    let arrceklis = []
    let inputkuncidenganspasi= document.getElementById("barukuncipgtemporary").value;
    let arrinput = [];
    let arropsilengkap = [];
    let arraySplit = [];
    let arrNosoalaja = [];
    let arrUbah =[] ;
    let arrAwal =[];

    let inputkunciTANPAspasi
    if(inputkuncidenganspasi ==""){
        
        inputkuncidenganspasi = el.value;
        inputkunciTANPAspasi = inputkuncidenganspasi.replace(/\s+/,"");
        arrceklis.push(inputkunciTANPAspasi);
        
    }else{
        inputkunciTANPAspasi = inputkuncidenganspasi.replace(/\s+/,"");
        arrAwal = inputkunciTANPAspasi.split(",");
        //arrAwal.sort();//(a, b)=> a - b)
        
        //ubah arrinput menjadi nosoalnya aja;
        arrNosoalaja = arrAwal.map(m=>m.match(/(\d+)/)[0]);
        let nosoalaktif = el.value.match(/(\d+)/)[0];
        
        let cek_indek_nosoal_di_arrNosoalaja = arrNosoalaja.indexOf(nosoalaktif);
        if(cek_indek_nosoal_di_arrNosoalaja >-1){
            arrAwal.splice(cek_indek_nosoal_di_arrNosoalaja,1,el.value);
            arrUbah = arrAwal
        }else{
            arrAwal.push(el.value)
            arrUbah = arrAwal;
            
        }
        
        arrceklis = arrUbah;


    }
    
   
    // arrceklis.sort()
    arrceklis.sort((a,b)=> parseInt(a.match(/(\d+)/)==null?0:a.match(/(\d+)/)[0]) - parseInt(b.match(/(\d+)/)==null?0:b.match(/(\d+)/)[0]));
    //console.log(arrceklis.sort())
    document.getElementById("barukuncipgtemporary").value = arrceklis;//.join(",");
     //console.log(arrceklis)
    // let teksnya = "_KUNCI-PG_" + arrceklis.join(",")
    // // console.log(str_pg_kunci)
    // // console.log(teksnya);
    // // textarea.value = textarea.value.substring(0, awal) + teksnya + textarea.value.substring(end, len);
    // let teksganti = str_pg_kunci;
    // // console.log(awal)
    // if (awal == -1) {
    //     textarea.value = textarea.value + "\n\n" + teksnya; //+ textarea.value.substring(end, len);
    // } else {
    //     textarea.value = textarea.value.replace(str_pg_kunci, teksnya);

    // }
    //let selection = doc.getSelection();
    let divs = doc.getElementsByTagName('div');
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
   
    
    if(bol){
        divs[cek].innerHTML = "_KUNCI-PG_" + arrceklis.join(",");
        
    }else{
        let creatediv = doc.createElement("div");
        creatediv.innerHTML = "_KUNCI-PG_" + arrceklis.join(",")
        doc.body.appendChild(creatediv);
        
    }
    

    // if (selection.rangeCount > 0) {
    // selection.removeAllRanges();
    // }

    // for (let i = 0; i < strongs.length; i++) {
    //     let range = doc.createRange();
    //     range.selectNode(strongs[i]);
    //     selection.addRange(range);
    //     range.selectNode(strongs[i]);
    // }
    




};


const btn = document.querySelectorAll(".btn_edt");//
const allowhtml = document.querySelector("#html_edt");

let show = false;
allowhtml.addEventListener("change", ()=>{
    if(!allowhtml.checked){
        //asli
        doc.body.innerHTML = doc.body.textContent;
        
        show = false;
         
         
        }else{
            // asli
            doc.body.textContent =doc.body.innerHTML;
            //modifikasi untuk mengantisipasi pengeditan saol
           
            show =true;
         

    }
})
for (let i = 0 ; i < btn.length ; i++){
    let cmd = btn[i].getAttribute("data-keycmd");
    let owngrup = btn[i].hasAttribute("data-grup");
    
    btn[i].addEventListener("click",()=>{
        if(show){
            alert("Hilangkan dulu Ceklisnya")
        }else{
            if(cmd === "fontname"){
                let val = btn[i].innerHTML;
                document.querySelector(".dropdown_jenishuruf").innerHTML = val;
                doc.execCommand(cmd,false,val);

            }else if(cmd==="removeFormat"){ 
                doc.execCommand(cmd, false, null);
                document.querySelector(".dropdown_jenishuruf").innerHTML = "Pilih Jenis Huruf"
            }else if(cmd == "createLink"){
                let prom = prompt("Masukkan link","");
                if(!prom){return};
                doc.execCommand(cmd, false, prom);
                console.log(doc.body.designMode)
                const linkifram = doc.querySelectorAll("a");
linkifram.forEach(el =>{
    el.target = "_blank";
    console.log(el);
    el.addEventListener("mouseover", () =>{
        doc.body.designMode = "Off";
    });
    el.addEventListener("mouseout", () =>{
        doc.body.designMode = "On";
    })
    console.log(doc.body.designMode)
})   
            }else if(owngrup){
                let grup = btn[i].getAttribute("data-grup");
                if(grup == "Paragraf"){
                    //paragraf:
                    let dom = document.querySelector(".dropdown_jenisparagraf");
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
                    doc.execCommand(cmd, false, null)
                    }else if (grup == "ukuranfont") {
                    let val = btn[i].getAttribute("data-keyval");
                    document.querySelector(".grup_ukuranfont").innerHTML = btn[i].innerHTML;
                    doc.execCommand(cmd, false, val);


                }else if(grup == "heading"){
                    let val = btn[i].getAttribute("data-keyval");
                    document.querySelector(".grup_heading").innerHTML = btn[i].innerHTML;
                    doc.execCommand(cmd, false, val);
                }else{
                        let teks = btn[i].innerHTML;
                        doc.execCommand(cmd,false,teks);
                    }
            } else{
                doc.execCommand(cmd, false, null)
                btn[i].classList.toggle("active");
                                        
            }
        }
                        
    })

};

const inputankuncijawabantemporary = document.getElementById("barukuncipgtemporary");
inputankuncijawabantemporary.addEventListener("input",(e)=>{
    let el = e.target;
   
    let buangspasi = el.value.replace(/\s+/,"");
    let arrayisiAwal = buangspasi.split(",");
   
    
    //cek tabel:
    for(i = 0 ; i< arrayisiAwal.length ; i++){
        let no = arrayisiAwal[i].match(/\d+/); //1A
        let ele = document.querySelectorAll(".tdnosoal_editor_" + no);
        
        if(ele.length>0){
            for (j = 0; j < ele.length; j++) {
                // ele[i].className = ele[i].className.replace("w3-light-blue", "");
                ele[j].classList.remove("w3-light-blue");
            };
        }
        let elaktif = document.querySelector(".tdpg_pgeditor_" + arrayisiAwal[i]);
        if(elaktif !== null){
            elaktif.classList.add("w3-light-blue");
        }

    }




    let arrceklis = arrayisiAwal;
    let noaja = arrayisiAwal.map(m=>m.match(/(\d+)/)!==null?m.match(/(\d+)/)[0]:m);
    let ceknomoredoble = noaja.filter((x,i,a)=>a.indexOf(x) !== i);
    let spanisi = document.getElementById("kalosalahketik");
    spanisi.innerHTML ="";
    if(ceknomoredoble.length > 0){
        spanisi.innerHTML = "Ada nomor soal yang terisi ganda, yaitu: "+ceknomoredoble.join() +"<br>Periksa kembali ketikan kunci jawaban Anda"
    }
    // arrceklis.sort();
    arrceklis.sort((a,b)=> parseInt(a.match(/(\d+)/)==null?0:a.match(/(\d+)/)[0]) - parseInt(b.match(/(\d+)/)==null?0:b.match(/(\d+)/)[0]));


    
    //console.log(arrceklis.sort())
    document.getElementById("barukuncipgtemporary").value = arrceklis;//.join(",");
     
    let divs = doc.getElementsByTagName('div');
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
   
    
    if(bol){
        if(el.value ==""){
            divs[cek].innerHTML = "";
            
        }else{
            divs[cek].innerHTML = "_KUNCI-PG_" + arrceklis.join(",");
        }
        
    }else{
        let creatediv = doc.createElement("div");
        console.log("cekdisini",arrceklis.length, arrceklis)
        creatediv.innerHTML = "_KUNCI-PG_" + arrceklis.join(",")
        doc.body.appendChild(creatediv);
        
    }
    
    

})

let fcolor = document.querySelector("#fontcolor");
let bcolor = document.querySelector("#backcolor");
let edtbl = document.querySelector("#edt_table");
let sPchBiasa = document.querySelector("#simpan_pecahanbiasa");
let sPchCamp = document.querySelector("#simpan_pecahancampuran");
let sAkarKdrat = document.querySelector("#simpan_akarkuadrat");
let sAkartiga = document.querySelector("#simpan_akarpangkattiga");
let keyKopSekolah = document.getElementById("kopsekolah_edt");
let insertHTML_div = document.getElementById("inserthtml_edt");
let keypastekangambar_edt = document.getElementById("pastekangambar_edt");
keypastekangambar_edt.addEventListener("click",()=>{
    let teksCopy = yangluCopy;
    if(teksCopy == ""){
        alert("Ga ada yang dicopy, Mas/Mis Bro....")
        return
    }
    doc.execCommand("insertHTML",null, teksCopy)
    })
insertHTML_div.addEventListener("click",()=>{
    let pr = prompt("masukkan html:","<p>Hello World</p>")

    if(pr == null){
        alert("Ga ada yang dicopy, Mas/Mis Bro....")
        return
    }
    doc.execCommand("insertHTML",null, pr)
})
keyKopSekolah.addEventListener("click",()=>{
        let teks = `<div class="w3-row w3-bottombar w3-border-black"><div class="w3-col l2 s2"><img src="/img/kotadepok.png" width="80px" style="width: 77px; height: 88px;"></div><div class="w3-col l10 s10 w3-center">PEMERINTAH DAERAH KOTA DEPOK<br>DINAS PENDIDIKAN<br><font size="5"><b>${idNamaSekolah.toUpperCase()}</b></font><br><font size="1">${teksalamat}</font></div></div><div><br></div>`;
        doc.execCommand("insertHTML",null, teks)
})
fcolor.addEventListener("input", () =>{
    let v =  fcolor.value
        doc.execCommand("forecolor", false, v);
       
});
bcolor.addEventListener("input", () =>{
    let bv = bcolor.value;
    doc.execCommand("hiliteColor",false, bv);
   
})
edtbl.addEventListener("click", () => {
    try{
    let promp = prompt("Masukkan jumlah baris, contoh 3 x 4 (3 baris, 4 kolom) tanpa spasi","3x4");
    if(!promp){return }
    let teks = promp.replace(/\s+/g,"");
    let ang = teks.toLowerCase().split("x");
    let brs = parseInt(ang[0]);
    let cols = parseInt(ang[1]);
    let html = `&nbsp;<table class="w3-table garis">`
    for(i = 0 ; i < brs ; i++){
        html +=`<tr>`
        for (j = 0 ; j <cols; j++){
            html +=`<td>teks</td>`
        }
        html +=`</tr>`
    }
    html +=`</table>&nbsp;`;
    doc.execCommand("insertHTML",null, html);
    }
    catch(er){
        console.log(er);    
    }
});
sPchBiasa.addEventListener("click", () =>{
    let a = document.querySelector("#inpecbiasa_pembilang").innerHTML;
    let b = document.querySelector("#inpecbiasa_penyebut").innerHTML;
    let teks = htmlpecahanbiasa(a,b);
    doc.execCommand("insertHTML",null, teks);
})
sPchCamp.addEventListener("click",()=>{
    let a = document.querySelector("#inpecCamp_satuan").innerHTML;
    let b = document.querySelector("#inpecCamp_pembilang").innerHTML;
    let c = document.querySelector("#inpecCamp_penyebut").innerHTML;
    let teks = htmlpecahancampuran(a,b,c);
    doc.execCommand("insertHTML",null, teks);
})
sAkarKdrat.addEventListener("click",()=>{
    let a = "";
    let b = document.querySelector("#inakar_kuadrat").innerHTML;
    let teks = htmlakarpangkatn(a,b);
    doc.execCommand("insertHTML",null, teks);

})
sAkartiga.addEventListener("click",()=>{
    let a = "3";
    let b = document.querySelector("#inakar_tiga").innerHTML;
    let teks = htmlakarpangkatn(a,b);
    doc.execCommand("insertHTML",null, teks);
});
let fileInput = document.querySelector("#uploadgambar_edt");
fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    if (!files || !files.length) {
    //          console.log('No files selected');
    return;
    }
        let ketval = document.formuploadmateri.idmapel.value
        let val = (ketval == "") ? "e-lamaso" : ketval;
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
        doc.execCommand("insertImage",false, url);
        let imgs = doc.querySelectorAll("img");
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


const btn_edtyt = document.querySelector("#btn_edtyt");
btn_edtyt.addEventListener("click", () => {
    let prom = prompt("Masukkan link youtube","");
    if(!prom){return};
    let reg = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    let url = prom.match(reg)
    let html=`<iframe style="resize: both;" src='https://www.youtube.com/embed/${url[1]}'  frameborder='1' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe><br/><br/>`;
    let ch = document.querySelector("#html_edt");
    if(!ch.checked){
        ch.checked = true;
        doc.execCommand("insertHTML",false,html);
        ch.checked = false
    }else{
        doc.execCommand("insertText",false,html);
    }
})


function enableImageResizeInDiv(id) {
    if (!(/chrome/i.test(navigator.userAgent) && /google/i.test(window.navigator.vendor))) {
        return;
    }
    var editor = doc.getElementById(id);
    
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
        doc.querySelectorAll(".resize-frame,.resizer").forEach((item) => item.parentNode.removeChild(item));
    };
    var offset = function offset(el) {
         const rect = el.getBoundingClientRect();
        // scrollLeft = window.pageXOffset ||doc.documentElement.scrollLeft,
        // scrollTop = window.pageYOffset || doc.documentElement.scrollTop;
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

        doc.querySelector('.resize-frame').onmousedown = () => {
            resizing = true;
            return false;
        };

        editor.onmouseup = () => {
            if (resizing) {
                currentImage.style.width = doc.querySelector('.top-border').offsetWidth + 'px';
                currentImage.style.height = doc.querySelector('.left-border').offsetHeight + 'px';
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
                setStyle(doc.querySelector('.resize-frame'), {
top: (top + height - 10) + 'px',
left: (left + width - 10) + "px"
                });
               
                setStyle(doc.querySelector('.top-border'), { width: width + "px" });
                setStyle(doc.querySelector('.left-border'), { height: height + "px" });
                setStyle(doc.querySelector('.right-border'), {
left: (left + width) + 'px',
height: height + "px"
                });
                setStyle(doc.querySelector('.bottom-border'), {
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
            let mouseUpElement = doc.elementFromPoint(x, y);
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
enableImageResizeInDiv("edt");
function bubbleIframeMouseMove(iframe){
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
bubbleIframeMouseMove(editore);
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

const htmlpecahanbiasa = (a,b)=>{
   // return `&nbsp;<div style="position:relative;display:inline-block;margin:2px 5px;height:35px;font-size:12px;vertical-align:middle;text-align:center;font-family:'Times New Roman', times, serif; ">&nbsp;${a}&nbsp;<div style="border-bottom:1px solid black"></div>&nbsp;${b}&nbsp;</div>&nbsp;`
   return `<img src="https://chart.apis.google.com/chart?cht=tx&chl=%7B%5Cfrac%20%7B${a}%7D%20%7B${b}%7D%7D" alt="pecahan ${a} per ${b} per"/>`
} 
const htmlpecahancampuran = (a, b, c) =>{
    //return `&nbsp;<div style="display:inline-block;margin:2px 3px;height:35px;position:relative;font-size:12px;font-family:'Times New Roman', times, serif;vertical-align:middle;text-align:center;"><div style="float:left;padding-top:7px">&nbsp;${a}</div><div style="top:-3px;position:relative;float:left;">&nbsp;${b}&nbsp;<div style="border-bottom:1px solid black"></div>&nbsp;${c}&nbsp;</div></div>&nbsp;`
    return `<img src="https://chart.apis.google.com/chart?cht=tx&chl=${a}%7B%5Cfrac%20%7B${b}%7D%20%7B${c}%7D%7D" alt="pecahan ${a} ${b} per ${c}"/>`

}
const htmlakarpangkatn = (a=3,b) =>{
   
    //return `&nbsp;<div style="position:relative;display:inline-block;vertical-align:middle;"><div style="position:relative;float:left;top:-4px;font-size:18px"><sup style="font-size:10px;left:5px;top:-10px;position:relative">${a}</sup>√</div><div style="border-top:1px solid black;position:relative;float:left;font-size:12px;left:-1px;font-family:'Times New Roman',times,serif;">&nbsp;${b}&nbsp;</div></div>&nbsp;`
    return `<img src="https://chart.apis.google.com/chart?cht=tx&chl=%7B%5Csqrt%5B%7B${a}%7D%5D%20%7B${b}%7D%7D" alt="akar pangkat ${a} dari ${b}">`;
}
const nodeselection = () =>{
    let sel = doc.getSelection();
    console.log(sel.rangeCount);
    let selrange = sel.getRangeAt(0);
   
    
    let selectiondom = selrange.cloneContents();
    let dom = selectiondom.querySelectorAll("div");
    let ar = [];
    dom.forEach(el =>{
        ar.push(el.innerHTML)
    })
    console.log(ar)
    //console.log(selectiondom.querySelectorAll("div"));
    // let arraydom = selectiondom.split("<div>");
    // console.log(arraydom);
    let string = sel.toString();
    let removetab = string.replace(/\t+/g," ")
    let arraystring = removetab.split(/[\n|\r|\r\n]/);
    let objsoal = {};
    let pertanyaan = [];
    let opsiA = [];
    let opsiB = [];
    let opsiC = [];
    let opsiD = [];
    let tag = true;
    let tagA = false;
    let tagB = false;
    let tagC = false;
    let tagD = false;
    let tekstanpaA
    let tekstanpaB
    let tekstanpaC
    let tekstanpaD

let no;
let nosoal;
    for(i=0 ; i < arraystring.length ; i++){
        let teks = arraystring[i];
        let nno = teks.match(/\d+/);
        no = nno;
        if(teks.indexOf(no)==0){
            if(tag){
                if(i==0){
let tekstanpano = teks.replace(no+". ","");
nosoal = no[0];
objsoal.no = nosoal
pertanyaan.push(tekstanpano);
                }else{
pertanyaan.push(teks);
                }
            } ///else untukm opsi
            
        }else{
            if(tagA){
                //tag =false;
                
                //tekstanpaA = teks.replace(/^[A]. /,"")
                if(teks.indexOf("B. ")==0){
tagA = false;
tagB = true;
tekstanpaB = teks.replace("B. ","");
opsiB.push(tekstanpaB);

                }else{
opsiA.push(teks);
                }

            }else{
                if(teks.indexOf("A. ")==0){
tagA = true;
tag =false;
tekstanpaA = teks.replace("A. ","")
opsiA.push(tekstanpaA);
                }else{
if(tag){
    pertanyaan.push(teks) ;//1,
}

if(tagB){
    if(teks.indexOf("C. ")==0){
        tagB = false;
        tagC = true;
        tekstanpaC = teks.replace("C. ","");
        opsiC.push(tekstanpaC);
        
    }else{
        opsiB.push(teks);
    }
}else if(tagC){
    if(teks.indexOf("D. ")==0){
        tagD = true;
        tagC = false;
        tekstanpaD = teks.replace("D. ","");
        opsiD.push(tekstanpaD);
    }else{
        opsiC.push(teks)

    }
}else{
    if(tagD){
        opsiD.push(teks);
    }
}

                }
            }
        }


    }; 
    if(nosoal !== undefined && opsiA.length !== 0 && opsiB.length !== 0 && opsiC.length !== 0 && opsiD.length !== 0){
        if(nosoal == null){
            alert("Mohon berikan enter di konten yang akan dipilih");
            return
        }else{

            objsoal.valid = true;
        }
    }else{
        objsoal.valid = false;
    }
    objsoal.pertanyaan = pertanyaan.join("<br>");
    objsoal.opsiA = opsiA.join("<br>");
    objsoal.opsiB = opsiB.join("<br>");
    objsoal.opsiC = opsiC.join("<br>");
    objsoal.opsiD = opsiD.join("<br>");
    console.log(objsoal);
}
const select_pg_abcd = document.querySelector(".edt_soal2") 
select_pg_abcd.addEventListener("click",()=>{
    let ceksoal = deteksiAllsoal();
    let ceknosoal = ceksoal.map(s => s.match(/\d+/)[0]);

    let sel = doc.getSelection();
    let selrange = sel.getRangeAt(0);
    let selectiondom = selrange.cloneContents();
    let dom = selectiondom.querySelectorAll("div");
    let teks, nosoal ;
    let objeksoal = {};
    let pertanyaan = [];
    let opsiA = [];
    let opsiB = [];
    let opsiC = [];
    let opsiD = [];
    let tag = true;
    let tagA = false;
    let tagB = false;
    let tagC = false;
    let tagD = false;
    let txt_nono, txt_noA, txt_noB, txt_noC, txt_noD;
    for(i=0;i < dom.length ; i++){
        teks = dom[i].innerHTML;
        if(i == 0){
            nosoal = teks.match(/\d+/)[0];
            let patt_nosoal = nosoal + ". ";
            txt_nono = teks.replace(patt_nosoal,"")
            
            objeksoal.no = nosoal;
            pertanyaan.push(txt_nono);
        }

        if(tag){
            if(teks.indexOf("A. ")== 0 ){
                tag = false;
                tagA = true;
                txt_noA = teks.replace("A. ","");
                opsiA.push(txt_noA);
            }else{
                if(i !== 0){
pertanyaan.push(teks);
                }
            }
        }else{
            if(tagA){
                if(teks.indexOf("B. ")==0){
tagA = false;
tagB = true;
txt_noB = teks.replace("B. ","")
opsiB.push(txt_noB)
                }else{
opsiA.push(teks);
                }
            }else{
                if(tagB){
if(teks.indexOf("C. ")==0){
    tagB = false;
    tagC = true;
    txt_noC = teks.replace("C. ","");
    opsiC.push(txt_noC);
}else{
    opsiB.push(teks)
}
                }else{
if(tagC){
    if(teks.indexOf("D. ")==0){
        tagC = false;
        tagD = true;
        txt_noD = teks.replace("D. ","");
        opsiD.push(txt_noD);

    }else{
        opsiC.push(teks)
    }
}else{
    if(tagD){
        opsiD.push(teks)
    }
}
                }
            }

        }
    }
    
    if(nosoal !== null && opsiA.length !== 0 && opsiB.length !== 0 && opsiC.length !== 0 && opsiD.length !== 0){
        if(nosoal == null){
            alert("Mohon berikan enter di konten yang akan dipilih");
            return
        }
    }else{
        alert("Ada yang salah dengan format yang dipilih. \n\n Opsi berformat abjad-titik-spasi (A.<spasi>) \n Pastikan opsi terletak di paling kanan (tanpa spasi)")
        return
    }
    // objeksoal.valid = valid;
    let tsoal = pertanyaan.join("<br>");
    let topsiA = opsiA.join("<br>");
    let topsiB = opsiB.join("<br>");
    let topsiC = opsiC.join("<br>");
    let topsiD = opsiD.join("<br>");
    //console.log(objeksoal);
    if(ceknosoal.indexOf(nosoal)==-1){
        let html = `<div class="w3-badge w3-left">${nosoal}</div><ol style="list-style-type:decimal" start="${nosoal}" class="w3-padding w3-card-4"><li id="soalke-${nosoal}" class="calcnosoal" style="list-style-type:none">${tsoal}<hr style="border-top:1px solid olive"><ol style="list-style-type:upper-alpha;margin:5px 5px 0px 20px;padding:0"><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}A"><label class="opsi" for="${nosoal}A">${topsiA}</label></li><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}B"><label class="opsi" for="${nosoal}B">${topsiB}</label></li><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}C"><label class="opsi" for="${nosoal}C">${topsiC}</label></li><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}D"><label class="opsi" for="${nosoal}D">${topsiD}</label></li></ol></li></ol><br><br>`;
        
        let ch = document.querySelector("#html_edt");
        if(!ch.checked){
            ch.checked = true;
            doc.execCommand("insertHTML",false,html);
            ch.checked = false
        }else{
            doc.execCommand("insertText",false,html);
        }
    }else{
        alert("Nomor soal " + nosoal + " sudah Anda buat!")
    }
});
const select_pg_abc = document.querySelector(".edt_soal");
select_pg_abc.addEventListener("click",()=>{
    let ceksoal = deteksiAllsoal();//;
    let ceknosoal = ceksoal.map(s => s.match(/\d+/)[0]);

    let sel = doc.getSelection();
    let selrange = sel.getRangeAt(0);
    let selectiondom = selrange.cloneContents();
    let dom = selectiondom.querySelectorAll("div");
    let teks, nosoal ;
    let objeksoal = {};
    let pertanyaan = [];
    let opsiA = [];
    let opsiB = [];
    let opsiC = [];
    // let opsiD = [];
    let tag = true;
    let tagA = false;
    let tagB = false;
    let tagC = false;
    // let tagD = false;
    let txt_nono, txt_noA, txt_noB, txt_noC;//, txt_noD;
    for(i=0;i < dom.length ; i++){
        teks = dom[i].innerHTML;
        if(i == 0){
            nosoal = teks.match(/(\d+)/)[0];//(\d+)/
            let patt_nosoal = nosoal + ". ";
            txt_nono = teks.replace(patt_nosoal,"")
            console.log(nosoal);
            objeksoal.no = nosoal;
            pertanyaan.push(txt_nono);
        }

        if(tag){
            if(teks.indexOf("A. ")== 0 ){
                tag = false;
                tagA = true;
                txt_noA = teks.replace("A. ","");
                opsiA.push(txt_noA);
            }else{
                if(i !== 0){
pertanyaan.push(teks);
                }
            }
        }else{
            if(tagA){
                if(teks.indexOf("B. ")==0){
tagA = false;
tagB = true;
txt_noB = teks.replace("B. ","")
opsiB.push(txt_noB)
                }else{
opsiA.push(teks);
                }
            }else{
                if(tagB){
if(teks.indexOf("C. ")==0){
    tagB = false;
    tagC = true;
    txt_noC = teks.replace("C. ","");
    opsiC.push(txt_noC);
}else{
    opsiB.push(teks)
}
                }else{
if(tagC){
    opsiC.push(teks)
}
                }
            }

        }
    }
    if(nosoal !== undefined && opsiA.length !== 0 && opsiB.length !== 0 && opsiC.length !== 0 ){
        if(nosoal == null){
            alert("Mohon berikan enter di konten yang akan dipilih");
            return
        }
    }else{
        
        alert("Ada yang salah dengan format yang dipilih. \n\n Opsi berformat abjad-titik-spasi (A.<spasi>) \n Pastikan opsi terletak di paling kanan (tanpa spasi)")
        return
    }
    // objeksoal.valid = valid;
    let tsoal = pertanyaan.join("<br>");
    let topsiA = opsiA.join("<br>");
    let topsiB = opsiB.join("<br>");
    let topsiC = opsiC.join("<br>");
    //console.log(objeksoal);
    if(ceknosoal.indexOf(nosoal)== -1){
            let html = `<div class="w3-badge w3-left">${nosoal}</div><ol style="list-style-type:decimal" start="${nosoal}" class="w3-padding w3-card-4"><li id="soalke-${nosoal}" class="calcnosoal" style="list-style-type:none">${tsoal}<hr style="border-top:1px solid olive"><ol style="list-style-type:upper-alpha;margin:5px 5px 0px 20px;padding:0"><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}A"><label class="opsi" for="${nosoal}A">${topsiA}</label></li><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}B"><label class="opsi" for="${nosoal}B">${topsiB}</label></li><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}C"><label class="opsi" for="${nosoal}C">${topsiC}</label></li></ol></li></ol>&nbsp;&nbsp;`;
          
            
            let ch = document.querySelector("#html_edt");
            if(!ch.checked){
                ch.checked = true;
                doc.execCommand("insertHTML",false,html);
                ch.checked = false
            }else{
                doc.execCommand("insertText",false,html);
            }
        }else{
            alert("Nomor soal " + nosoal + " Sudah Anda buat!")    
        }        

});

const templatemulti_pg_abc = document.querySelector(".multi_soal");
templatemulti_pg_abc.addEventListener("click", () =>{
   let prom = prompt("Masukan no soal dari -  sampai no soal","");
    if(!prom){
        return
    }
    //alert("Anda memasukan " + prom);
    let nosoal, topsiA, topsiB, topsiC, topsiD;
    let buangspasi = prom.replace(/\s+/g,"");
    let array = buangspasi.split("-");
    let tunggal = buangspasi.indexOf("-")<0?true:false;
    let awal, akhir;
    let ceksoal = deteksiAllsoal();//;
    let ceknosoal = ceksoal.map(s => s.match(/\d+/)[0]);

    if(tunggal){
        awal = array[0];
        akhir = array[0];
    }else{
        awal = array[0];
        akhir = array[array.length - 1]
    }
    let html ="";
    let tsoal = "Pertanyaan Pilihan Ganda ...."
    topsiA =`A          `;
    topsiB =`B          `;
    topsiC =`C          `;
   
    for(i = awal ; i <= akhir ; i++){
        nosoal = i;
        if(ceknosoal.indexOf(nosoal)==-1){
        html += `<div class="w3-badge w3-left">${nosoal}</div><ol style="list-style-type:decimal" start="${nosoal}" class="w3-padding w3-card-4"><li id="soalke-${nosoal}" class="calcnosoal" style="list-style-type:none">${tsoal}<hr style="border-top:1px solid olive"><ol style="list-style-type:upper-alpha;margin:5px 5px 0px 20px;padding:0"><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}A"><label class="opsi" for="${nosoal}A">${topsiA}</label></li><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}B"><label class="opsi" for="${nosoal}B">${topsiB}</label></li><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}C"><label class="opsi" for="${nosoal}C">${topsiC}</label></li></ol></li></ol><br>`;
        }else{
            alert("Nomor soal " + nosoal + " sudah Anda buat!");
        }
    }
    let ch = document.querySelector("#html_edt");
    if(!ch.checked){
        ch.checked = true;
        doc.execCommand("insertHTML",false,html);
        ch.checked = false
    }else{
        doc.execCommand("insertText",false,html);
    }

})
const templatemulti_pg_abcd = document.querySelector(".multi_soal2");
templatemulti_pg_abcd.addEventListener("click", () =>{
    let prom = prompt("Masukan no soal dari -  sampai no soal","");
    if(!prom){
        return
    }
    //alert("Anda memasukan " + prom);
    let nosoal, topsiA, topsiB, topsiC, topsiD;
    let buangspasi = prom.replace(/\s+/g,"");
    let array = buangspasi.split("-");
    let tunggal = buangspasi.indexOf("-")<0?true:false;
    let awal, akhir;
    let ceksoal = deteksiAllsoal();//;
    let ceknosoal = ceksoal.map(s => s.match(/\d+/)[0]);
    if(tunggal){
        awal = array[0]
        akhir = awal;
    }else{
        awal = array[0];
        akhir = array[array.length - 1]
    }
    let html ="";
    let tsoal = "Pertanyaan Pilihan Ganda ...."
    topsiA =`A          `;
    topsiB =`B          `;
    topsiC =`C          `;
       topsiD =`D          `;
    for(i = awal ; i <= akhir ; i++){
        nosoal = i;
        if(ceknosoal.indexOf(nosoal)==-1){
            html += `<div class="w3-badge w3-left">${nosoal}</div><ol style="list-style-type:decimal" start="${nosoal}" class="w3-padding w3-card-4"><li id="soalke-${nosoal}" class="calcnosoal" style="list-style-type:none">${tsoal}<hr style="border-top:1px solid olive"><ol style="list-style-type:upper-alpha;margin:5px 5px 0px 20px;padding:0"><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}A"><label class="opsi" for="${nosoal}A">${topsiA}</label></li><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}B"><label class="opsi" for="${nosoal}B">${topsiB}</label></li><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}C"><label class="opsi" for="${nosoal}C">${topsiC}</label></li><li><input class="calc" type="radio"  name="soal${nosoal}" id="${nosoal}D"><label class="opsi" for="${nosoal}D">${topsiD}</label></li></ol></li></ol><br><br>`;
        }else{
            alert("Nomor soal " + nosoal + " sudah Anda buat!");
        }
    }
    let ch = document.querySelector("#html_edt");
    if(!ch.checked){
        ch.checked = true;
        doc.execCommand("insertHTML",false,html);
        ch.checked = false
    }else{
        doc.execCommand("insertText",false,html);
    }

    //
    
})
const templatemulti_essay = document.querySelector(".multi_essay");
templatemulti_essay.addEventListener("click", () =>{
    let prom = prompt("Masukan no soal dari -  sampai no soal","");
    if(!prom){
        return
    }
    //alert("Anda memasukan " + prom);
    let nosoal, topsiA, topsiB, topsiC, topsiD;
    
    let buangspasi = prom.replace(/\s+/g,"");
    let array = buangspasi.split("-");
    let tunggal = buangspasi.indexOf("-")<0?true:false;
    let awal, akhir;
    let ceksoal = deteksiAllsoal();//;
    let ceknosoal = ceksoal.map(s => s.match(/\d+/)[0]);
    if(tunggal){
        awal = array[0]
        akhir = awal;
    }else{
        awal = array[0];
        akhir = array[array.length - 1]
    }

    let html = "";
    for(i = awal ; i <= akhir ; i++){
        nosoal = i;
        let soaljoin = "Pertanyaan Soal Essay No. " + nosoal;
        if(ceknosoal.indexOf(nosoal)==-1){
             html += `<div class="w3-badge w3-aqua w3-left">${nosoal}</div><ol style="list-style-type:none" start="${nosoal}" class="w3-padding w3-card-4"><li id="essay${nosoal}" class="soalessay" style="border-bottom:1px solid blue"><div id="pertanyaanessay_${nosoal}">${soaljoin}</div><div id="tomboljawaban${nosoal}"><hr><button onclick="tombolketikjawaban('${nosoal}')">Ketik Jawaban No ${nosoal}</button><br><br><sub>atau</sub><br><br> <button onclick="tomboluploadjawaban('${nosoal}')">Upload Media No ${nosoal}</button><br><br><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub></div><br></li></ol><br><br><div><br></div>`;
        }else{
            alert("No soal "+ nosoal +" Sudah Anda buat!")
        }
    }
    let ch = document.querySelector("#html_edt");
    if(!ch.checked){
        ch.checked = true;
        doc.execCommand("insertHTML",false,html);
        ch.checked = false
    }else{
        doc.execCommand("insertText",false,html);
    }

})

const daftarGambar_edt = document.querySelector("#daftarGambar_edt");
daftarGambar_edt.addEventListener("click", () =>{
    daftarGambar();
})

const deteksinomorsoalpg = () =>{
    let arr = [];
    let ceknosoal = doc.body.querySelectorAll(".calcnosoal");
    for(i = 0 ; i < ceknosoal.length ; i++){
        let html = ceknosoal[i].getAttribute("id");
        let no = html.match(/\d+/)[0];
        arr.push(no)
    }
    
    return arr
}

const deteksinomorsoalessay = () =>{
    let arr = [];
    let ceknosoal = doc.body.querySelectorAll(".soalessay");
    for(i = 0 ; i < ceknosoal.length ; i++){
        let html = ceknosoal[i].getAttribute("id");
        let no = html.match(/\d+/)[0];
        arr.push(no)
    }
    
    return arr
}


function fn_mbs_simpansebarankd() {
    let divs = doc.getElementsByTagName('div');
    let cek = divs.length;
    let bol = false;
    for(a = 0 ; a < divs.length ; a++){
        let teks = divs[a].innerHTML;
        if(teks.indexOf("_KUNCI-KD_")>-1){
          
            bol = true;
            cek = a;
            break;
        }else{
            //console.log("none");
        }
    }
    
    // let teksarea = document.getElementById("idmateri");
    // let val = teksarea.value;
    // let n = val.length;
    // let awal = val.indexOf("_KUNCI-KD_");
    // let batasawal = val.substring(awal, n)
    // let cari = batasawal.split("\n")[0];
    let arr = "_KUNCI-KD_";


    let elkd = document.querySelectorAll(".mbs_selectkd");
    //brsnosoal_${r}
    let inputobjekkd = {};
    let ar = [];
    let armpkd = {};
    for (i = 0; i < elkd.length; i++) {
        
        
        let elinput = elkd[i].value + ":";
        let attr = elkd[i].className; //.indexOf("brsmapel_");
        let baris = attr.match(/(\d+)/gm)[1];
        let nomorinput = document.querySelector(".brsnosoal_" + baris);
        let valno = nomorinput.value
        elinput += valno;
        ar.push(elinput);
        var indekno = valno.replace(/\s+/g,"").split(",");
        armpkd[elkd[i].value] = indekno;
    }

    // console.log(armpkd);
    // console.log(JSON.stringify(armpkd));
    document.formuploadmateri.kuncikd.value = JSON.stringify(armpkd)    
    arr += ar.join("<||>")



    // if (awal == -1) {
    //     teksarea.value += "\n\n" + arr;
    // } else {
    //     teksarea.value = teksarea.value.replace(cari, arr);
    // }

    //console.log(divs)
    //let kuncinya =  "_KUNCI-PG_" ;//+ arrceklis.join(",");
    //console.log(cek);
    if(bol){
        divs[cek].innerHTML = arr;//"_KUNCI-PD_" + arrceklis.join(",");
    }else{
        let creatediv = doc.createElement("div");
        creatediv.innerHTML = arr;//"_KUNCI-PG_" + arrceklis.join(",")
        doc.body.appendChild(creatediv);
        
    }
    


    alert("Sebaran KD Berhasil Tersimpan.")
    // pratinjaubuatmateri();
    // barufindkuncipgkd(val);
};

const publikasikanmateribarut = () =>{
    let isi = doc.body.children;//("div")
    let div = "";
    for(i = 0 ; i < isi.length ; i ++){
        
        //console.log(i)
        let teks = isi[i].outerHTML;
        //console.log(teks);
        let m = teks.match(/<div>(.*)<\/div>/)[1];
        //console.log(m);
        let tekmatch = m;//teks.replace("<div>","").replace("</div>","") ;//
        div += tekmatch +"\r\n";
    }
    tes = div;
  
   console.log(tes)
}
const publikasikanmateribaru = () => {
  
   // document.formuploadmateri.kuncikd.value = oo;
        // document.formuploadmateri.jumlahpg.value = countpg;
        // document.formuploadmateri.jumlahessay.value = countess;
        document.formuploadmateri.idkelas.value = idNamaKelas;
        document.formuploadmateri.idtoken.value = idJenjang;
        document.formuploadmateri.idSekolah.value = idNamaSekolah;
        document.formuploadmateri.dibuatoleh.value = namauser;
        document.formuploadmateri.versi.value = "baru";

    document.getElementById("materiimport").innerHTML = "";
    let tglkosong = document.formuploadmateri.idtgl.value;
    let boltgl = (tglkosong == "") ? alert('Waktu Mulai tidak boleh kosong') : true;
    let mapel = document.formuploadmateri.idmapel.value;
    let bolmapel = (mapel == "") ? alert('Identitas pembelajaran tidak boleh kosong') : true;

    let kuncikosong = document.formuploadmateri.kuncikd.value;
    let bolkd = (kuncikosong == "") ? alert("Anda belum membuat sebaran KD") : true;
    let dom = document.getElementById("formuploadmateri");
    //buatkan dalam baris lain untuk _KUNCI-PG_ dan _KUNCI-KD_

   
    // console.log(data);
    // console.log(data);
    if (bolmapel && boltgl && bolkd) {
        let data = new FormData(dom);
        let t = sebelumkirimmateri();
        data.append("idmateri",t)
        // for (var pair of data.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }
        pranalamateri.style.display = "block";
        dom.reset();
        //dom.idmateri.value = "";
        doc.body.innerHTML="";
        idpracetak.innerHTML = `<i class="fa fa-spin fa-spinner w3-xxxlarge"></i> On Proess kirim`
        let url = linkmateri + "&action=materibaru"
        fetch(url, {
            method: 'post',
            body: data
        })
            .then(m => m.json())
            .then(f => {
                idpracetak.innerHTML = f.result;
                loadketkunci.innerHTML = "";

                loadketKD.innerHTML = "";
                //console.log(f)
                pembelajaran();
                updatematerikan();
                localStorage.removeItem("draftmateri")

            })
            .catch(er => idpracetak.innerHTML = "Maaf, terjadi kesalahan: <br> Error Code" + er)

    }

}

function generaterasebarankd() {
    // alert("modal generate sebaran KD");
    modalbuatsebarankd.style.display = "block";
    let datakd = buateditorkdaktif
    let seljt = document.getElementById("jenistagihan");
    let valjt = seljt.options[seljt.selectedIndex].value;
    let jtKD4 = ["kpraktik", "kproduk", "kproyek", "uspraktek"];
    let indekjt = jtKD4.indexOf(valjt);
    let indekkd = "";
    let colkd = "kd3";
    // console.log(indekjt);
    // console.log(valjt);

    let stKD3apaKD4 = ""
    if (indekjt == -1) {
        stKD3apaKD4 = " Kompetensi Pengetahuan (KD-3) ";
        indekkd = "cekliskd3";
        colkd = "kd3"
    } else {
        stKD3apaKD4 = " Kompetensi Keterampilan (KD-4) ";
        indekkd = "cekliskd4";
        colkd = "kd4";
    };
    msb_obje = {}
    let datakdaktif = datakd.filter(s => s[indekkd] === true);
    //datakd.filter(s => Object.keys(s).filter(d => datakd[indekkd] == true)); //Object.entries(datakd).filter(([k, v]) => k === indekkd && v === true)
    //console.table(datakdaktif);
    let datamapelaktiff = [];

    if (window.location.href.indexOf("gmp.html") > -1) {
        msb_obje["datamapel"] = idgurumapelmapel;
        datamapelaktiff = [idgurumapelmapel];

    } else {
        datamapelaktiff = datakdaktif.map(s => s["mapel"]).filter((x, i, a) => a.indexOf(x) == i);
        msb_obje["datamapel"] = datamapelaktiff;

    };
    //mengkoleksi KD yang terceklis untuk setiap mapel
    datamapelaktiff.forEach(s => {
        msb_obje[s] = datakdaktif.filter(d => d["mapel"] == s).map(m => m[colkd]);
    })
    let datamapelaktif = datamapelaktiff;
    //console.log(datamapelaktif)
    //console.log(msb_obje) //
    let tabel = document.querySelector(".mbs_tabelbantusebarankd").getElementsByTagName("tbody")[0];
    let isihtml = "";
    let opsihtmlmapel = `<option value="" selected>PILIH MAPEL</option>`;
    let opsihtmlkd = "";
    //deteksi sebaranKD di textarea

    // let teksarea = document.getElementById("idmateri");
    // let val = teksarea.value;
    // let n = val.length;
    let ada = -1;//val.indexOf("_KUNCI-KD_");
    //let batasawal = val.substring(ada, n);

    let divs = doc.getElementsByTagName('div');
    let cek = divs.length;
    let bol = false;
    for(a = 0 ; a < divs.length ; a++){
        let teks = divs[a].innerHTML;
        if(teks.indexOf("_KUNCI-KD_")>-1){
           
            bol = true;
            cek = a;
            ada = a;
            break;
        }else{
           // console.log("none");
            
        }
    }
    let str_pg_d="";
    if(bol){
        str_pg_d = divs[cek].textContent;
        //console.log(str_pg_d)

    }

    if (ada == -1) {
        for (let i = 0; i < datamapelaktif.length; i++) {
            if (i == 0) {
                opsihtmlmapel += `<option value="${datamapelaktif[i]}">${datamapelaktif[i]}</option>`;
            } else {
                opsihtmlmapel += `<option value="${datamapelaktif[i]}">${datamapelaktif[i]}</option>`;
            }
        };
        let selectmap = datamapelaktif[0];
        let kdmapelpertama = msb_obje[selectmap];
        for (i = 0; i < kdmapelpertama.length; i++) {
            opsihtmlkd += `<option value="${selectmap}_${kdmapelpertama[i]}">${kdmapelpertama[i]}<option>`;
        }
        document.querySelector(".brsmapel_0").innerHTML = opsihtmlmapel;
        document.querySelector(".brskd_0").innerHTML = opsihtmlkd;
    } else {
        let arr0 = str_pg_d.replace("_KUNCI-KD_", "");
        let arr1 = arr0.replace(/\s+/gm, "")
        let mgrup = arr1.split("<||>");
        //console.log(mgrup);
        let mapelsesuai = [];
        let mapeltidaksesuai = [];
        let nosoalngaco;

        let tr, td;
        let rr = mgrup.length - tabel.rows.length;
        let htmlrow = ""
        //update dulu tabel formatnya ...)
        for (let g = 0; g < mgrup.length; g++) {
            let r = g
            htmlrow += `<tr>
                <td>
<select class="w3-select mbs_selectmapel brsmapel_${r}" onchange="fn_mbs_selectmapel(this)">
    <option value="" selected>PILIH MAPEL</option>
</select>
                </td>
                <td>
<select class="w3-select mbs_selectkd brskd_${r}" onchange="fn_mbs_selectkd(this)">
    <option value="" selected>PILIH KD</option>
</select>
                </td>
                <td>
<input class="w3-input w3-border w3-border-teal mbs_textarea brsnosoal_${r}" placeholder="Contoh pengisian: 1,2,3 (di akhir nomor jangan diberi koma)"/>
                </td></tr>`;
        }

        tabel.innerHTML = htmlrow;

        //ambil data sebaran kd dari teks area
        for (g = 0; g < mgrup.length; g++) {
            let grup = mgrup[g].split(":");
            opsihtmlmapel = `<option value="" selected>PILIH MAPEL</option>`;
            opsihtmlkd = "";
            let nmp = grup[0].split("_")[0];
            let nkd = grup[0].split("_")[1];
            let valnosoal = grup[1]

            nosoalngaco = nkd.match(/(\d+[A-Za-z.])/);
            if (datamapelaktif.indexOf(nmp) > -1) {

                for (let i = 0; i < datamapelaktif.length; i++) {
opsihtmlmapel += `<option value="${datamapelaktif[i]}">${datamapelaktif[i]}</option>`;
                };
                let selectmap = nmp;
                let kdmapelpertama = msb_obje[selectmap];
                for (i = 0; i < kdmapelpertama.length; i++) {
opsihtmlkd += `<option value="${selectmap}_${kdmapelpertama[i]}">${kdmapelpertama[i]}</option>`;
                }

                if (kdmapelpertama.indexOf(nkd) == -1) {
tabel.rows[g].cells[1].style.backgroundColor = "red";
                }
                document.querySelector(".brsmapel_" + g).innerHTML = opsihtmlmapel;
                document.querySelector(".brskd_" + g).innerHTML = opsihtmlkd;
                //
                document.querySelector(".brsmapel_" + g).value = nmp;
                document.querySelector(".brskd_" + g).value = nmp + "_" + nkd;

                document.querySelector(".brsnosoal_" + g).value = valnosoal.replace(/[azAZ.]/gm, ",");



            } else {
                //mapeltidaksesuai.push(nmp);
                for (let i = 0; i < datamapelaktif.length; i++) {
if (i == 0) {
    opsihtmlmapel += `<option value="${datamapelaktif[i]}">${datamapelaktif[i]}</option>`;
} else {
    opsihtmlmapel += `<option value="${datamapelaktif[i]}">${datamapelaktif[i]}</option>`;
}
                };
                let selectmap = datamapelaktif[0];
                let kdmapelpertama = msb_obje[selectmap];

                for (i = 0; i < kdmapelpertama.length; i++) {
opsihtmlkd += `<option value="${selectmap}_${kdmapelpertama[i]}">${kdmapelpertama[i]}</option>`;

                }
                tabel.rows[g].cells[0].style.backgroundColor = "red";
                document.querySelector(".brsmapel_" + g).innerHTML = opsihtmlmapel;

                document.querySelector(".brskd_" + g).innerHTML = opsihtmlkd;

                document.querySelector(".brsmapel_" + g).value = nmp;
                document.querySelector(".brskd_" + g).value = nmp + "_" + nkd;

                document.querySelector(".brsnosoal_" + g).value = valnosoal.replace(/[azAZ.]/gm, ",");
            }
        }
    }

};

const sebelumkirimmateri = () =>{
    let isi = doc.body.children;//("div")
    let div = "";
    for(i = 0 ; i < isi.length ; i ++){
        
        //console.log(i)
        let teks = isi[i].outerHTML;
        //console.log(teks.match(/<div>(.*)<\/div>/));
        let perkaramatch = teks.match(/<div>(.*)<\/div>/);
        if(perkaramatch !== null){

            let m = teks.match(/<div>(.*)<\/div>/)[1];
            //console.log(m);
            let tekmatch = m.replace(/&lt;\|\|&gt;/g,"<||>");;//teks.replace("<div>","").replace("</div>","") ;//
            div += tekmatch +"\r\n";
        }else{
            div += teks;
        }
    }
    tes = div
   // console.log(tes);
    return tes
    
}
const edt_esay = document.querySelector(".edt_esay");
edt_esay.addEventListener("click",()=>{
    select_essay();
});
const select_essay = () =>{
    let sel = doc.getSelection();
    let selrange = sel.getRangeAt(0);
    let selectiondom = selrange.cloneContents();
    let dom = selectiondom.querySelectorAll("div");
    let teks, nosoal, soalExNo;
    let pertanyaan = [];
    for(i = 0 ; i < dom.length ; i++){
        teks = dom[i].innerHTML;
        if(i == 0){
            nosoal = teks.match(/(\d+)/)[0]
            soalExNo = teks.replace(nosoal+". ","");
            pertanyaan.push(soalExNo);
        }else{
            pertanyaan.push(teks);
        }
    }

    let soaljoin = pertanyaan.join("<br>")
    let html = `<div class="w3-badge w3-aqua w3-left">${nosoal}</div><ol style="list-style-type:none" start="${nosoal}" class="w3-padding w3-card-4"><li id="essay${nosoal}" class="soalessay" style="border-bottom:1px solid blue"><div id="pertanyaanessay_${nosoal}">${soaljoin}</div><div id="tomboljawaban${nosoal}"><hr><button onclick="tombolketikjawaban('${nosoal}')">Ketik Jawaban No ${nosoal}</button><br><br><sub>atau</sub><br><br> <button onclick="tomboluploadjawaban('${nosoal}')">Upload Media No ${nosoal}</button><br><br><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub></div><br></li></ol>`
    let ceksoal = deteksiAllsoal();//;
    if(ceksoal.indexOf(nosoal) == -1){
        let ch = document.querySelector("#html_edt");
                if(!ch.checked){
ch.checked = true;
doc.execCommand("insertHTML",false,html);
ch.checked = false
                }else{
doc.execCommand("insertText",false,html);
                }
    }else{
        alert("Nomor soal " + nosoal + " sudah dibuat, nomor soal essay sebaiknya berurutan dari nomor sebelumnya")
    }
    
}

const deteksiAllsoal = () =>{
    let array1 = deteksinomorsoalpg();
    let array2 = deteksinomorsoalessay();
    let all = array1.concat(array2);
   // console.log(all);
    return all
  
    
}

function tanpasebarankd() {
    //let teksarea = document.getElementById("idmateri");
    let divs = doc.getElementsByTagName('div');
    let cek = divs.length;
    let bol = false;
    for(a = 0 ; a < divs.length ; a++){
        let teks = divs[a].innerHTML;
        if(teks.indexOf("_KUNCI-KD_")>-1){
           // console.log(a +" = "+ teks);
            bol = true;
            cek = a;
            break;
        }else{
            console.log("none");
        }
    }

    let arr;
    let jsS = {};
    if (window.location.href.indexOf("gmp.html") > -1) {
        arr = `_KUNCI-KD_${idgurumapelmapel}_5.1:1`;
        let gmp = `${idgurumapelmapel}_5.1`
        jsS[gmp] = ["1"];
    } else {
        arr = "_KUNCI-KD_NONKD_5.1:1";
        let Ngmp = `NONKD_5.1`
        jsS[Ngmp] =  ["1"];;

    }

    if(bol){
        divs[cek].innerHTML = arr;//"_KUNCI-PD_" + arrceklis.join(",");
    }else{
        let creatediv = doc.createElement("div");
        creatediv.innerHTML = arr;//"_KUNCI-PG_" + arrceklis.join(",")
        doc.body.appendChild(creatediv);
        
    }
    document.formuploadmateri.kuncikd.value = JSON.stringify(jsS)   ;
    
    alert("Non Sebaran KD sudah disimpan")
};


const editfilemateri = (id) => {

    let file = kronologijson[id]; //.idmateri;
    let versi = file.versi
    //console.log(versi);
    let idbaris = file.idbaris;
    let validmapel = file.idmapel
    let time = new Date(file.idtgl).getTime()
    let now = new Date().getTime()
    if (now > time) {
        alert("Perhatian! Materi ini sedang/Sudah/Telah lewat dipublikasikan saat ini. Mungkin saja siswa Anda sudah mengirimkan pekejaannya dari materi ini. Jika mengedit alokasi waktu awal Anda akan kehilangan data REKAP PENILAIAN yang berlangsung, dan Materi akan diganti dengan materi yang Anda Edit (overwrite). Hindari mengubah Alokasi Waktu Awal jika Alokasi awal sudah berlangsung karena Rekap Penilaian Anda tidak sinkron.");
        // return
    }
    // document.getElementsByClassName("tablinks")[2].click();
    //openCity(event, 'upload_materi')
    // lainnya tutup
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById("upload_materi").style.display = "block";

    let idmapel = document.formuploadmateri.idmapel;
    let iddurasi = document.formuploadmateri.iddurasi;
    let idaksessiswa = document.formuploadmateri.idaksessiswa;
    let jenistagihan = document.formuploadmateri.jenistagihan;
    let idtgl = document.formuploadmateri.idtgl;
    let idtglend = document.formuploadmateri.idtglend;

    // let isiteks = document.formuploadmateri.idmateri;
    let isiteks = doc.body;;

    idmapel.value = file.idmapel;
    iddurasi.value = file.iddurasi;
    idaksessiswa.value = file.idaksessiswa;
    jenistagihan.value = file.jenistagihan;
    idtgl.value = stringForDateTimeLocal(file.idtgl);//file.idtgl;
    idtglend.value = stringForDateTimeLocal(file.idtglend);//file.idtglend;
    let botakin = file.idmateri;
    let idm = encodeURIComponent(botakin)

    //generatetoken datamateri[par].crtToken
    document.formuploadmateri.crtToken.value = file.crtToken;




    tombolpublikasikan.setAttribute("onclick", `editfilematerikeserver('${idbaris}')`)
    tombolpublikasikan.removeAttribute("class"); //.wa w3-deep-purple w3-hover-aqua);
    tombolpublikasikan.setAttribute("class", "wa w3-red w3-hover-aqua");
    tombolpublikasikan.innerHTML = "EDIT KONTEN MATERI"

    // $.getJSON(linkmateri + "&idmateri=" + idm + "&action=previewriwayat", function (json) { })
    fetch(linkmateri + "&action=previewriwayat&idmateri=" + idm).then(m => m.json())
        .then(k => {

            //isiteks.textContent = k;
            //console.log(k);
            let katob = versi == "baru"?brkline(k).kunci:brkline2(k).kunci;
            let kunci =window.atob(katob)
            let kdd = versi == "baru"? brkline(k).kd :brkline2(k).kd;
            let kd = kdd.split("<br>").join("<||>");
            // isiteks.innerHTML = brkline(k).teks + "" + kunci +  kd
            //doc.focus();
            //console.log(kd);
            let crd = doc.createElement("div");
            crd.innerHTML =  versi == "baru"?brkline(k).teks:brkline2(k).teks;
            doc.body.appendChild(crd);
            crd = doc.createElement("div");
            crd.innerHTML = "_KUNCI-PG_" + kunci;
            doc.body.appendChild(crd);
            crd = doc.createElement("div");
            crd.innerHTML = "_KUNCI-KD_" +kd;
            doc.body.appendChild(crd);
            
            // doc.execCommand("insertText",false,brkline(k).teks)
            //doc.execCommand("insertText",false,kunci)
            //doc.execCommand("insertText",false,kd)


            let ingindownload = confirm("Apakah Anda ingin mendownload materi ini juga?");
            if (ingindownload) {
                downloadfiledraft(k, validmapel);
            }
            //pratinjaubuatmateri();
        }).catch(er => {
            isiteks.textContent = er
        })
    //alert("Anda membuka link upload materi")
}


const editfilematerikeserver = (id) => {
    document.getElementById("materiimport").innerHTML = "";
    document.formuploadmateri.idkelas.value = idNamaKelas;
    document.formuploadmateri.idtoken.value = idJenjang;
    document.formuploadmateri.idSekolah.value = idNamaSekolah;
    document.formuploadmateri.dibuatoleh.value = namauser;
    document.formuploadmateri.versi.value = "baru";
    let tglkosong = document.formuploadmateri.idtgl.value;
    let boltgl = (tglkosong == "") ? alert('Waktu Mulai tidak boleh kosong') : true;
    let mapel = document.formuploadmateri.idmapel.value;
    let bolmapel = (mapel == "") ? alert('Identitas pembelajaran tidak boleh kosong') : true;

    let kuncikosong = document.formuploadmateri.kuncikd.value;
    let bolkd = (kuncikosong == "") ? alert("Anda belum membuat sebaran KD") : true;
    if (bolmapel && boltgl && bolkd) {
        let dom = document.getElementById("formuploadmateri");

        let data = new FormData(dom);
        let t = sebelumkirimmateri();
        data.append("idmateri",t)
        data.append("idbaris", id)

        pranalamateri.style.display = "block";
        dom.reset();
        // dom.idmateri.value = "";
        doc.body.innerHTML = "";
        idpracetak.innerHTML = `<i class="fa fa-spin fa-spinner w3-xxxlarge"></i> On Proess kirim`
        let url = linkmateri + "&action=materiedit"
        fetch(url, {
            method: 'post',
            body: data
        })
            .then(m => m.json())
            .then(f => {
                idpracetak.innerHTML = f.result;
                loadketkunci.innerHTML = "";

                loadketKD.innerHTML = "";
                //console.log(f)
                pembelajaran();
                updatematerikan();
                localStorage.removeItem("draftmateri");
                tombolpublikasikan.setAttribute("onclick", "publikasikanmateribaru()")
                tombolpublikasikan.removeAttribute("class"); //.wa w3-deep-purple w3-hover-aqua);
                tombolpublikasikan.setAttribute("class", "wa w3-deep-purple w3-hover-aqua");
                tombolpublikasikan.innerHTML = "PUBLIKASIKAN";




            })
            .catch(er => idpracetak.innerHTML = "Maaf, terjadi kesalahan: <br> Error Code" + er);



    }
    // localStorage.removeItem("draftmateri")
    // tombolpublikasikan.setAttribute("onclick", "publikasikanmateribaru()")
    // tombolpublikasikan.removeAttribute("class"); //.wa w3-deep-purple w3-hover-aqua);
    // tombolpublikasikan.setAttribute("class", "wa w3-deep-purple w3-hover-aqua");
    // tombolpublikasikan.innerHTML = "PUBLIKASIKAN";
}

const tombolketikjawaban = (p) =>{
    alert("Siswa mencoba menjawab essay no " + p + " dengan cara mengetik")
}
const tomboluploadjawaban = (p) =>{
    alert("Siswa mencoba menjawab essay no " + p + " dengan cara mengunggah dokumen")
}

function brkline2(teks) { //coba
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


            katajadi += "</div><div id='tomboljawaban" + tekspisah[0] + "'><hr/>";//</div>";
            katajadi +=`<button onclick="tombolketikjawaban('${tekspisah[0]}')">Ketik Jawaban No ${tekspisah[0]}</button><br><br><sub>atau</sub><br><br> <button onclick="tomboluploadjawaban('${tekspisah[0]}')">Upload Media No ${tekspisah[0]}</button><br><br><sub>Pilih Salah satu cara Kalian menjawab soal ini</sub></div>`
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

    // return inn
    return data
}


async function openCityy(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        
    }
    let tutupsemuaisiadmdulu = document.querySelectorAll(".isiadm");
    tutupsemuaisiadmdulu.forEach(t=>{t.style.display="none"});

    let frst = document.querySelectorAll(".first_isiadm");
    let tab = document.querySelectorAll(".btnadm");
    let btn;// = frst.getAttribute("id"); //
    for(a = 0 ; a < frst.length ; a++){
        btn = frst[a].getAttribute("id");
        frst[a].style.display = "block";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";

    tab.forEach(el => {el.classList.remove("w3-green")})
    //if(cityName == "buat_prota"){
        tab[0].classList.add("w3-green")
        // tab[].classList.add("w3-green")
        tab[4].classList.add("w3-green");
        tab[8].classList.add("w3-green");
        tab[12].classList.add("w3-green");
        tab[16].classList.add("w3-green");
        tab[18].classList.add("w3-green");
        document.getElementById("tooltipkd1").style.display = 'none';
        document.getElementById("tooltipkdmapel").style.display = 'none';
        document.getElementById("tooltiptabelall").style.display = 'none';
        document.getElementById("tooltiptabel").style.display = 'none';
        let tooltipkaldik =document.querySelectorAll(".tooltipkaldik");
        tooltipkaldik.forEach(el => el.style.display = "none");
        let tooltipHBE = document.getElementById("tooltipHBE");
        tooltipHBE.style.display="none";

        
    let tesinner = evt.currentTarget.innerHTML;
    if(tesinner == "Desain RPP"){
        klikawaldesainrpp();
    }else if(tesinner =="SPPD-ku"){
        // await rekapsppdku();
        rekapsppdku();
    }else if(evt.currentTarget.innerHTML == "Notula Rapat"){
        await cektagdbrapat();
        rekapRapatSekolahuntukku();
       
    }else if(tesinner == "Desain Evaluasi"){
        tampilanawaldesainevaluasi()
    }else if(tesinner == "Buku Induk"){
        
        awalbukuinduk()
    }
    document.getElementById(cityName).style.display = "block";
    
}

const select_prota  = document.querySelector(".select_prota");
select_prota.addEventListener("change",async()=>{
    let opsi = select_prota.options;
    let select = opsi.selectedIndex;
    let val_opsi = opsi[select].value;
    let teks_opsi = opsi[select].text;
    //alert(val_opsi);
    //hapus dulu elementduplikat
    let dup = document.querySelectorAll(".result_hapus");
    dup.forEach(hp => hp.innerHTML="");
    // isikan identitas dulu;
    document.querySelector(".tdprota_sekolah").innerHTML = idNamaSekolah;
    document.querySelector(".tdprota_mapel").innerHTML = teks_opsi;
    document.querySelector(".tdprota_tapel").innerHTML = idTeksTapel;
    document.querySelector(".spanprota_namasekolah").innerHTML = idNamaSekolah;
    document.querySelector(".spanprota_namakepsek").innerHTML = idNamaKepsek;
    document.querySelector(".spanprota_nipkepsek").innerHTML = "NIP. " + idNipKepsek;
    document.querySelector(".spanprota_titimangsa").innerHTML = "14 Juli 2021";
    document.querySelector(".spanprota_gmpkelas").innerHTML = idJenisGuru +" " + idgurumapelmapel;
    document.querySelector(".spanprota_namaguru").innerHTML = namauser;
    document.querySelector(".spanprota_nipguru").innerHTML = idNipGuruKelas==""?"-":"NIP. "+idNipGuruKelas;
    /// Untuk parameter Tombol Simpan Server ;
    //onclick="serveradm('prt_prota_mapel',1,2)" class="btnserver_protatematik
    let btnserver = document.querySelector(".btnserver_protamapel");
    let judulserver = "PROGRAM TAHUNAN MAPEL "+ teks_opsi;
    btnserver.setAttribute("onclick",`serveradm('prt_prota_mapel','${judulserver}',1,1)`);
    
    /// INI MENGAMBIL DATA YANG BELUM PERNAH DIBUAT
    //sumber data KD;
    if(buateditorkdaktif.length === 0){
        loadingtopbarin("loadingtopbar");
        await kurikulumdiamdiam();
        clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
            setTimeout(() => {
                divlod.style.width = "1px"
                divlod.className += " w3-hide";

            }, 3000);
    };
    //konfig data:
    let dataKD3 = buateditorkdaktif.filter(s => s["indikatorkd3"] !== "" && s["mapel"] === val_opsi);
    //let dataKD4 = buateditorkdaktif.filter(s => s["mapel"] === val_opsi);
    //tolak untuk default;
    let tabel = document.querySelector(".tabel_prota");//
    let tbody = tabel.getElementsByTagName("tbody")[0];
    let crtd = "";
    let no = 1;
    if(val_opsi !=="default"){
        for(i=0 ; i < dataKD3.length ; i++){
            crtd +=`<tr><td>${no}</td><td>${dataKD3[i].kd3} ${dataKD3[i].indikatorkd3}</td><td contenteditable="true" class="w3-center"></td></tr><tr><td>${(no + 1)}</td><td>${dataKD3[i].kd4} ${dataKD3[i].indikatorkd4}</td><td contenteditable="true" class="w3-center"></td></tr>`;
            no = no + 2;
        }
        tbody.innerHTML = crtd;
    }
})



const select_prosem  = document.querySelector(".select_prosem");
select_prosem.addEventListener("change",async()=>{
    let opsi = select_prosem.options;
    let select = opsi.selectedIndex;
    let val_opsi = opsi[select].value;
    let teks_opsi = opsi[select].text;
    //alert(val_opsi);
    // isikan identitas dulu;
    //jaga-jaga jika udah buka simpan server adm
    let dup = document.querySelectorAll(".result_hapus");
    dup.forEach(hp => hp.innerHTML="");

    document.querySelector(".tdprosem_sekolah").innerHTML = idNamaSekolah;
    document.querySelector(".tdprosem_mapel").innerHTML = teks_opsi;
    document.querySelector(".tdprosem_semester").innerHTML = idSemester + (idSemester==1?" (Ganjil)":" (Genap)");
    document.querySelector(".h_tapel").innerHTML = "TAHUN PELAJARAN "+ idTeksTapel;
    document.querySelector(".spanprosemmapel_namasekolah").innerHTML = idNamaSekolah;
    document.querySelector(".spanprosemmapel_namakepsek").innerHTML = idNamaKepsek;
    document.querySelector(".spanprosemmapel_nipkepsek").innerHTML = "NIP. " + idNipKepsek;
    document.querySelector(".spanprosemmapel_titimangsa").innerHTML = "14 Juli 2021";
    document.querySelector(".spanprosemmapel_gmpkelas").innerHTML = idJenisGuru +" " + idgurumapelmapel;
    document.querySelector(".spanprosemmapel_namaguru").innerHTML = namauser;
    document.querySelector(".spanprosemmapel_nipguru").innerHTML = idNipGuruKelas==""?"-":"NIP. "+idNipGuruKelas;
    
    /// INI MENGAMBIL DATA YANG BELUM PERNAH DIBUAT
    let btnserver = document.querySelector(".btnserver_prosemmapel");
    let judulserver = "PROGRAM SEMESTER MAPEL "+ teks_opsi;
    btnserver.setAttribute("onclick",`serveradm('prt_prosem_mapel','${judulserver}',2,1)`);

    //sumber data KD;
    if(buateditorkdaktif.length === 0){
        loadingtopbarin("loadingtopbar");
        await kurikulumdiamdiam();
        clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
            setTimeout(() => {
                divlod.style.width = "1px"
                divlod.className += " w3-hide";

            }, 3000);
    };
    //konfig data:
    let dataKD3 = buateditorkdaktif.filter(s => s["indikatorkd3"] !== "" && s["mapel"] === val_opsi);
    //let dataKD4 = buateditorkdaktif.filter(s => s["mapel"] === val_opsi);
    //tolak untuk default;
    let tabel = document.querySelector(".tabel_prosem_mapel");//
    let tbody = tabel.getElementsByTagName("tbody")[0];
    let crtd = "";
    let no = 1;
    if(val_opsi !=="default"){
        for(i=0 ; i < dataKD3.length ; i++){
            //crtd +=`<tr><td>${no}</td><td>${dataKD3[i].kd3} ${dataKD3[i].indikatorkd3}</td><td contenteditable="true" class="w3-center"></td></tr><tr><td>${(no + 1)}</td><td>${dataKD3[i].kd4} ${dataKD3[i].indikatorkd4}</td><td contenteditable="true" class="w3-center"></td></tr>`;
            crtd +=`<tr><td>${no}</td><td>${dataKD3[i].kd3} ${dataKD3[i].indikatorkd3}<hr class="w3-border-bottom">${dataKD3[i].kd4} ${dataKD3[i].indikatorkd4}</td><td>Materi Pokok ${no}</td><td>...JP</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>`
            no = no + 1;
        }
        tbody.innerHTML = crtd;
    };

    //configTooltip()
    let classN = "tabel_prosem_mapel";
    tooltiplengkap(classN,true);

})

const select_prosemtematik  = document.querySelector(".select_prosemtematik");
select_prosemtematik.addEventListener("change",async()=>{
    let opsi = select_prosemtematik.options;
    let select = opsi.selectedIndex;
    let val_opsi = opsi[select].value;
    let teks_opsi = opsi[select].text;
    //alert(val_opsi);
    // isikan identitas dulu;
    //jaga-jaga jika udah buka simpan server adm
    let dup = document.querySelectorAll(".result_hapus");
    dup.forEach(hp => hp.innerHTML="");

    document.querySelector(".tdprosemtematik_sekolah").innerHTML = idNamaSekolah;
    document.querySelector(".tdprosemtematik_kelasmapel").innerHTML = idJenjang +" / " + detectSemesterBerdasarkan("tema",teks_opsi);
    document.querySelector(".tdprosemtematik_tapel").innerHTML = idTeksTapel;
    // document.querySelector(".tdprosem_semester").innerHTML = 
    document.querySelector(".spanprosemtematik_namasekolah").innerHTML = idNamaSekolah;
    document.querySelector(".spanprosemtematik_namakepsek").innerHTML = idNamaKepsek;
    document.querySelector(".spanprosemtematik_nipkepsek").innerHTML = "NIP. " + idNipKepsek;
    document.querySelector(".spanprosemtematik_titimangsa").innerHTML = "14 Juli 2021";
    document.querySelector(".spanprosemtematik_gmpkelas").innerHTML = idJenisGuru +" " + idgurumapelmapel;
    document.querySelector(".spanprosemtematik_namaguru").innerHTML = namauser;
    document.querySelector(".spanprosemtematik_nipguru").innerHTML = idNipGuruKelas==""?"-":"NIP. "+idNipGuruKelas;
    
    /// INI MENGAMBIL DATA YANG BELUM PERNAH DIBUAT
    let btnserver = document.querySelector(".btnserver_prosemtematik");
    let judulserver = "PROGRAM SEMESTER  "+ teks_opsi.toUpperCase();
    btnserver.setAttribute("onclick",`serveradm('prt_prosem_tematik','${judulserver}',2,2)`);

    //sumber data KD;
    if(buateditorkdaktif.length === 0){
        loadingtopbarin("loadingtopbar");
        await kurikulumdiamdiam();
        clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
            setTimeout(() => {
                divlod.style.width = "1px"
                divlod.className += " w3-hide";

            }, 3000);
    };
    //konfig data:
    let dataKD3 = buateditorkdaktif.filter(s => s["indikatorkd3"] !== "" && s["mapel"] === val_opsi);
    //let dataKD4 = buateditorkdaktif.filter(s => s["mapel"] === val_opsi);
    //tolak untuk default;
    let tabel = document.querySelector(".tabel_prosem_tematik");//
    let tbody = tabel.getElementsByTagName("tbody")[0];
    let crtd = "";
    let no = 1;
    let data = DataKDKurtilas["kelas"+idJenjang];
    if(val_opsi !=="default"){
        // for(i=0 ; i < dataKD3.length ; i++){
        //     //crtd +=`<tr><td>${no}</td><td>${dataKD3[i].kd3} ${dataKD3[i].indikatorkd3}</td><td contenteditable="true" class="w3-center"></td></tr><tr><td>${(no + 1)}</td><td>${dataKD3[i].kd4} ${dataKD3[i].indikatorkd4}</td><td contenteditable="true" class="w3-center"></td></tr>`;
        //     crtd +=`<tr><td>${no}</td><td>${dataKD3[i].kd3} ${dataKD3[i].indikatorkd3}<hr class="w3-border-bottom">${dataKD3[i].kd4} ${dataKD3[i].indikatorkd4}</td><td>Materi Pokok ${no}</td><td>...JP</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>`
        //     no = no + 1;
        // }
        // let b = col + 1;
        // let c = col - 1
        let teks = data.filter(s => s[val_opsi])[0];
        tabel.rows[3].cells[1].innerHTML= val_opsi +"<br>" + teks[val_opsi];
        tabel.rows[3].cells[2].innerHTML= "Subtema 1 <br>" + teks["Subtema 1"];
        tabel.rows[10].cells[0].innerHTML= "Subtema 2 <br>" + teks["Subtema 2"];
        tabel.rows[17].cells[0].innerHTML= "Subtema 3 <br>" + teks["Subtema 3"];
        if(idJenjang>3){
            tabel.rows[24].cells[0].innerHTML= "Pembiasaan / Literasi / Proyek" ;//+ teks["Subtema 4"];
            
        }else{
            tabel.rows[24].cells[0].innerHTML= "Subtema 4 <br>" + teks["Subtema 4"]; ;//+ teks["Subtema 4"];

        }
        //tabel.rows[].cells[].innerHTML= data[]
        //tbody.innerHTML = crtd;
    };

    //configTooltip()
    let classN = "tabel_prosem_tematik";
    tooltiplengkap(classN,true);

})

const configTooltip = () =>{
    let tabler = document.querySelector(".tabel_prosem_mapel");//.getElementsByTagName("tbody")[0];
    let tbody = tabler.getElementsByTagName("tbody")[0]
    let rIndex; 
    let cIndex,parenta,kolo,brs
            // table rows
    for(var i = 1; i < tabler.rows.length; i++){
        // row cells
        for(var j = 0; j < tabler.rows[i].cells.length; j++){
            
            tabler.rows[i].cells[j].onmouseover = function(){
            //let baris = this.parentElement.nodeName;
            brs = this.parentElement.rowIndex - 1;
            kolo = this.cellIndex +1;
            let tekstitle = "Klik baris " + brs +" kolom "+ kolo;
            this.setAttribute("title",tekstitle);
            };
            
            tabler.rows[i].cells[j].onmouseout = function(){
            this.removeAttribute("title")
            //console.log("onmouseout")
            // document.querySelector("#tooltiptabel").style.display="none"
            };
        
            tabler.rows[i].cells[j].onclick = function(){      
                parenta = this.parentElement.nodeName;
                rIndex = this.parentElement.rowIndex;
                cIndex = this.cellIndex;//+1;
    
                //tampilkan tooltip
                let tdfokus = this;
    
                let tagclass = this.hasAttribute("class");
                let ttop = (tabler.offsetTop + this.offsetTop  ) +"px";//this.offsetTop +"px";
                let lleft =  (tabler.offsetLeft+ this.offsetLeft + this.offsetWidth +10) +"px";
                document.querySelector("#tooltiptabel").style.top=ttop;
                document.querySelector("#tooltiptabel").style.left=lleft;
                document.querySelector("#tooltiptabel").style.display="block";
                
                let tomboltd1 = document.querySelector(".btntooltip1")
                let tomboltd2 = document.querySelector(".btntooltip2");
                let tdtombol3 = document.querySelector(".btntooltip3");
                let tdtombol4 = document.querySelector(".btntooltip4");
                let tdtombol5 = document.querySelector(".btntooltip5");
                let cekHijau = false; /// anggap semuanya tidak punya class hijau
                let cekMerah = false;
                let dataclassname = this.className;
                if(this.hasAttribute("class")){
                    let dataclassnamee = this.className;
                    if(dataclassnamee.indexOf("w3-green")== -1){
                        cekHijau = true;
                    }else{
                        cekHijau = false;
                    }
                    
                    if(dataclassnamee.indexOf("w3-red")== -1){
                        cekMerah = true;
                    }else{
                        cekMerah = false
                    }
                }else{
                    cekHijau = true;
                    cekMerah = true
                }

                if(cekHijau){
                    document.querySelector(".btntooltip1").innerHTML = "Warna Hijau"
                    document.querySelector(".btntooltip1").className = document.querySelector(".btntooltip1").className.replace("w3-light-gray","w3-green");
                }else{
                    document.querySelector(".btntooltip1").innerHTML = "Hapus Warna Hijau"
                    document.querySelector(".btntooltip1").className = document.querySelector(".btntooltip1").className.replace("w3-green","w3-light-gray");
                }
                
                tomboltd1.onclick=function(){
                    if(tagclass === false && tdfokus.className ==="" && dataclassname.indexOf("w3-green")==-1){
                        tdfokus.setAttribute("class","w3-green");
                        tomboltd1.innerHTML ="Hapus Warna Hijau";
                        tomboltd1.className = tomboltd1.className.replace("w3-green","w3-light-gray");
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-green")>-1 ){
                        tdfokus.removeAttribute("class");
                        tomboltd1.innerHTML ="Warna Hijau";
                        tomboltd1.className = tomboltd1.className.replace("w3-light-gray","w3-green");
                    }else if(tagclass == true && tdfokus.className =="" && dataclassname.indexOf("w3-green")==-1){
                        tdfokus.removeAttribute("class");
                        tomboltd1.innerHTML ="Warna Hijau";
                        tomboltd1.className = tomboltd1.className.replace("w3-light-gray","w3-green");
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-green")== -1){
                        tdfokus.className = tdfokus.className.replace("w3-red","w3-green");
                        tomboltd1.innerHTML ="Hapus Warna Hijau";
                        tomboltd1.className = tomboltd1.className.replace("w3-green","w3-light-gray");
                    }else{
                        tdfokus.classList.add("w3-green");
                    }
                }


                if(cekMerah){
                    tomboltd2.innerHTML = "Warna Merah";
                    tomboltd2.className = tomboltd2.className.replace("w3-light-gray","w3-red");
                }else{
                    tomboltd2.innerHTML = "Hapus Warna Merah";
                    tomboltd2.className = tomboltd2.className.replace("w3-red","w3-light-gray");
                }

                tomboltd2.onclick = function (){
                    if(tagclass === false && tdfokus.className ==="" && dataclassname.indexOf("w3-red")==-1){
                        tdfokus.setAttribute("class","w3-red");
                        tomboltd1.innerHTML ="Hapus Warna Merah";
                        tomboltd1.className = tomboltd1.className.replace("w3-red","w3-light-gray");
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-red")>-1 ){
                        tdfokus.removeAttribute("class");
                        tomboltd1.innerHTML ="Warna Merah";
                        tomboltd1.className = tomboltd1.className.replace("w3-light-gray","w3-red");
                    }else if(tagclass == true && tdfokus.className =="" && dataclassname.indexOf("w3-red")==-1){
                        tdfokus.removeAttribute("class");
                        tomboltd1.innerHTML ="Warna Merah";
                        tomboltd1.className = tomboltd1.className.replace("w3-light-gray","w3-red");
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-green")> -1){
                        tdfokus.className = tdfokus.className.replace("w3-green","w3-red");
                        tomboltd1.innerHTML ="Hapus Warna Merah";
                        tomboltd1.className = tomboltd1.className.replace("w3-red","w3-light-gray");
                    }else{
                        tdfokus.classList.add("w3-red");
                    }
                }

                if(kolo > 4){

                
                        if(this.innerHTML == ""){
                            tdtombol3.innerHTML = "&checkmark;"
                        }else{
                            tdtombol3.innerHTML = "Hapus &checkmark;";
                        }

                        tdtombol3.onclick = function(){
                            if(tdfokus.innerHTML ==""){
                                tdfokus.innerHTML = "&checkmark;"
                                tdtombol3.innerHTML = "Hapus &checkmark;";
                            }else{
                                tdfokus.innerHTML = "";
                                tdtombol3.innerHTML = "&checkmark;";
                                
                            }
                        }
                }else{
                    if(this.hasAttribute("contenteditable")){
                        tdtombol3.innerHTML ="Kunci Edit";
                    }else{
                        tdtombol3.innerHTML ="Buka Edit";
                    }
                    tdtombol3.onclick= function (){
                        //console.log(tdfokus);
                        if(tdfokus.hasAttribute("contenteditable")){
                            tdfokus.removeAttribute("contenteditable");
                            tdtombol3.innerHTML ="Buka Edit";
                        }else{
                            
                            tdfokus.setAttribute("contenteditable","true");
                            tdtombol3.innerHTML ="Kunci Edit";
                        }
                    }
                }
                tbody = tabler.getElementsByTagName("tbody")[0];
                let nlr;
                tdtombol4.onclick = function(){
                    let indekbaris = brs - 1
                    let conf = confirm("Anda yakin akan menghapus baris ke-" + brs +"?")
                    if(conf){
                        tbody.deleteRow(indekbaris);//
                        //perbaiki nourut
                        tabler = document.querySelector(".tabel_prosem_mapel")
                        tbody = tabler.getElementsByTagName("tbody")[0];
                        
                        for(a=0;a<tbody.rows.length;a++){
                            tbody.rows[a].cells[0].innerHTML = (a+1);
                        }
                       
                    } 
                    
                }
                tdtombol5.onclick = function(){
                    let indekbaris = brs - 1
                    let conf = confirm("Anda yakin akan ingin menambahkan baris lagi setelah bari ini?")
                    let nlr;
                    if(conf){
                         nlr = tbody.insertRow(brs);
                    

                        let ntable = document.querySelector(".tabel_prosem_mapel")
                        let ntbody = ntable.getElementsByTagName("tbody")[0];
                        for(a=0;a<ntbody.rows[0].cells.length;a++){
                            let tdd = nlr.insertCell(a);
                            tdd.innerHTML="";
                        }
                        for(b = 0 ; b < ntbody.rows.length ; b++){
                            tbody.rows[b].cells[0].innerHTML = (b+1);
                        }
                        configTooltip();
                    }
                }
                //tabler = document.querySelector(".tabel_prosem_mapel")
            };
        }
    }
}


const dataadmsimpananguru = async (tag,output) =>{
    
    // let hps = document.querySelectorAll(".result_hapus");
    // hps.forEach(el=>el.innerHTML="")
    loadingtopbarin("loadingtopbar");
    //alert("tag = " +tag +"\r\n output class= "+output);
    let div = document.querySelector("."+output);
    //let divv = document.querySelector(".ket_"+output);
    div.innerHTML = "<i class='fa fa-spin fa-spinner w3-large'></i>";
    let tab = "simpanAdm"
        let tabel = [[["barisini"],["tag"],["html"],["oleh"],["judul"],["idguru"],["versi"]]];
        let head = tabel[0];
        let key = JSON.stringify(head);
        let datakirim = new FormData();
        
        datakirim.append("tab",tab);
        datakirim.append("key",key);
        // //sekarang ujicoba untuk post
        // let isii = ["prota","taghtmltes",namauser,"judul tes",idguru,"mapel tes"];
        // let isi = JSON.stringify(isii);
        // datakirim.append("tabel",isi);
        // //datakirim.append("tipe",tipe); kalo ada format tanggal, kasih aja
        // fetch(urladm+"?action=simpanbarisketaburut",{
        //     method:"post",
        //     body:datakirim
        // }).then(m => m.json())
        // .then(r => {
        //    console.log(r);
        // })
        // .catch(er => console.log(er))


        //dibawah ini get udah fix
        await fetch(urladm+"?action=getpostdatafromtab",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
           // console.log(r);
            let dt = r.data;
            div = document.querySelector("."+output);
            let filter = dt.filter(s => s.tag == tag && s.idguru == idguru && s.status !== "hapus");
            if(filter.length>0){
                let tt = "result"+tag+"simpananguru" ;//resultprotasimpanangur
                div.innerHTML  = `<a href="javascript:firstPage()" Title="Halaman Awal" class="w3-btn w3-border w3-green firstpagination">Awal</a><a href="javascript:prevPage()" class="previewpagination w3-btn w3-border warnaeka"> &lt;&lt; Sebelumnya </a> Halaman <span class="allpagepagination"></span> <a href="javascript:nextPage()" class="nextpagination w3-btn w3-border warnaeka">Berikutnya &gt;&gt;</a> <a href="javascript:lastPage()" Title="Halaman Awal" class="w3-btn w3-border w3-green lastpagination">Akhir</a> | <a href="javascript:deletePage('kliklihatsimpan${tag}')" class="w3-red w3-btn w3-border warnaeka" title="Hapus Administrasi ini"><i class="fa fa-trash"></i> </a>`;
                tespagination ("nextpagination", "previewpagination",tt,"allpagepagination",filter);
                changePage(1);
            }else{
                div.innerHTML ="Tidak ada data administrasi ini yang tersimpan di server."
            }
            //div.innerHTML = html;
            //console.log(filter);
            clearInterval(stoploadingtopbar);
                let divlod = document.querySelector(".loadingtopbar");
                divlod.style.width = "100%";
                setTimeout(() => {
                    divlod.style.width = "1px"
                    divlod.className += " w3-hide";
    
                }, 3000);
        }).catch(er=>console.log(er));

}


const printadm = (c,portr=true) =>{
        //jaga-jaga untuk element class yang duplikat?
        let dom = document.querySelector("."+c);
        let indom = dom.innerHTML;//.textContent;
        
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
        
        
    
        body.innerHTML = indom;//noSpace;
    
        window.frames["iframeprint"].focus();
        window.frames["iframeprint"].print();
}
const serveradm = (c,judul, indek_tag=0, indek_versi=0) =>{
        loadingtopbarin("loadingtopbar");
        let dom = document.querySelector("."+c);
        let teksTag =arrTagAdm[indek_tag];
        let teksVersi = arrVersi[indek_versi];    
        let indom = dom.innerHTML;
        let nospaceE =indom.replace(/(\r\n|\n|\r)/gm, "").replace(/\s\s/gm,"");
        let noSpace = nospaceE.replace(/contenteditable="true"|contenteditable='true'/gm, "")
        //console.log(noSpace);
        //console.log(teksTag);
        //console.log(teksVersi);
        let tab = "simpanAdm";//[[["barisini"],["tag"],["html"],["oleh"],["judul"],["idguru"],["versi"]]];
        let tabel = [[["barisini"],["tag"],["html"],["oleh"],["judul"],["idguru"],["versi"],["tanggal"],["status"]]];
        let head = tabel[0];
        let key = JSON.stringify(head);
        let datakirim = new FormData();
        
        datakirim.append("tab",tab);
        datakirim.append("key",key);
        //sekarang ujicoba untuk post
        let isii = [teksTag,noSpace,namauser,judul,idguru,teksVersi,new Date()];
        let isi = JSON.stringify(isii);
        datakirim.append("tabel",isi);
        //datakirim.append("tipe",tipe); kalo ada format tanggal, kasih aja
        fetch(urladm+"?action=simpanbarisketaburut",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
           //console.log(r);
           clearInterval(stoploadingtopbar);
                let divlod = document.querySelector(".loadingtopbar");
                divlod.style.width = "100%";
                setTimeout(() => {
                    divlod.style.width = "1px"
                    divlod.className += " w3-hide";
    
                }, 3000);
           alert("Data berhasil disimpan!")
        })
        .catch(er => console.log(er))
    
    
}
//////////////////script test pagination
///https://stackoverflow.com/questions/25434813/simple-pagination-in-javascript
var btn_next;// = document.querySelector("."+next);
    var btn_prev;// = document.querySelector("."+prev);
    var listing_table;// = document.querySelector("."+output)
    var ket_listing_table;
    var page_span;// = document.querySelector("."+spanpage);
    var current_page ;//= 1;
    var records_per_page;// = 1;
    var lastpagination;
    var firstpagination;
    
    var objJson;// = obj;// another source, such as your objJson variable

const tespagination = (next, prev,output,spanpage,obj)=>{
current_page = 1;
records_per_page = 1;

objJson = obj;// another source, such as your objJson variable

btn_next = document.querySelector("."+next);
btn_prev = document.querySelector("."+prev);
lastpagination = document.querySelector(".lastpagination");
firstpagination = document.querySelector(".firstpagination");
listing_table = document.querySelector("."+output);
ket_listing_table = document.querySelector(".ket_"+output);
page_span = document.querySelector("."+spanpage);
}
function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
   
}
function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
    
}
function deletePage(fokus){
    let kon = confirm("Anda yakin akan menghapus Administrasi ini?")
    if(!kon){
        return;
    }
    loadingtopbarin("loadingtopbar");
    let ind = current_page - 1;
    let cekob = objJson[ind].barisini;
    let tag = objJson[ind].tag;
    let html =  objJson[ind].html;
    let oleh = namauser;
    let judul = objJson[ind].judul;
    let guru = objJson[ind].idguru;
    let vers = objJson[ind].versi;
    let tanggal = new Date();

    // console.log(cekob)
    // console.log(current_page);
    let key = ["barisini","tag","html","oleh","judul","idguru","versi","tanggal","status"];
    let val = [cekob,tag,html,oleh,judul,guru,vers,tanggal,"hapus"];
    let tabel = JSON.stringify(val);
    let keyy = JSON.stringify(key);
    //let tipe = JSON.stringify(type);
    
    let datakirim = new FormData();

    datakirim.append("key",keyy);
    datakirim.append("idbaris",cekob);
    datakirim.append("tab","simpanAdm");
    datakirim.append("tabel",tabel);
    //datakirim.append("tipe",tipe);
    fetch(urladm+"?action=simpanbarisketabidbaris",{
        method:"post",
        body:datakirim
    }).then(m => m.json())
    .then(r => {
        //console.log(r);
        clearInterval(stoploadingtopbar);
                let divlod = document.querySelector(".loadingtopbar");
                divlod.style.width = "100%";
                setTimeout(() => {
                    divlod.style.width = "1px"
                    divlod.className += " w3-hide";
    
                }, 3000);
        alert("Data Berhasil dihapus, Anda akan diarahkan untuk merefresh data tersimpan Anda.");
        document.querySelector("."+fokus).click();
    }).catch(er=>{console.log(er)})
}    
function changePage(page)
{
    // var btn_next = document.querySelector("."+next);
    // var btn_prev = document.querySelector("."+prev);
    // var listing_table = document.querySelector("."+output)
    // var page_span = document.querySelector("."+spanpage);
 
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";
    let teks =`<table class="w3-small w3-table-all ">`;

    // for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {
        //   for(i = dt.length-1 ;  i>=0;i--){
        //  for(i = 0 ; i < dt.length ; i++)
     for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {
        listing_table.innerHTML += objJson[i].html + "<br>";
        teks += `<tr><td>Jenis Administrasi</td><td>:</td><td>${(objJson[i].tag).toUpperCase()}</td></tr>
        <tr><td>Versi</td><td>:</td><td>${objJson[i].versi}</td></tr>
        <tr><td>Keterangan</td><td>:</td><td>${objJson[i].judul}</td></tr>
        <tr><td>Dibuat pada</td><td>:</td><td>${tanggalfulllengkap(objJson[i].tanggal)}</td></tr>
        `;
    }
    teks +="</table>";
    ket_listing_table.innerHTML = teks;

    page_span.innerHTML = page + " dari " + numPages();

    if (page == 1) {
        btn_prev.style.display = "none";
        firstpagination.style.display = "none";
        // btn_prev.style.visibility = "hidden";
        // lastpagination.style.visibility = "visible";
        // firstpagination.style.visibility = "hidden";
    } else {
        // lastpagination.style.visibility = "visible";
        // firstpagination.style.visibility = "visible";
        // btn_prev.style.visibility = "visible";
        firstpagination.style.display = "inline-block"
        btn_prev.style.display = "inline-block";
    }

    if (page == numPages()) {
        btn_next.style.display = "none";
        lastpagination.style.display = "none";
        // btn_next.style.visibility = "hidden";
        // lastpagination.style.visibility = "hidden";
        //firstpagination.style.visibility = "visible";
    } else {
        lastpagination.style.display = "inline-block";
        btn_next.style.display = "inline-block";
        // lastpagination.style.visibility = "visible";
        //firstpagination.style.visibility = "hidden";
        // btn_next.style.visibility = "visible";
    }

    // console.log(page)
    // console.log(numPages())
}
function numPages()
{
    return Math.ceil(objJson.length / records_per_page);
}

function lastPage(){
    let hal = numPages();
    current_page = hal;
    changePage(hal);

}
function firstPage(){
    current_page = 1;
    changePage(1);
     // Validate page
    //  if (page < 1) page = 1;
    //  if (page > numPages()) page = numPages();

}
/// Bantuan tooltip semua jenis kelas tabel

const configTooltipAlltable = (classN,batas,hapus=true ) =>{
    let tabler = document.querySelector("."+ classN);//.getElementsByTagName("tbody")[0];
    let tbody = tabler.getElementsByTagName("tbody")[0]
    let rIndex; 
    let cIndex,parenta,kolo, brs
            // table rows
    for(var i = 1; i < tabler.rows.length; i++){
        // row cells
        for(var j = 0; j < tabler.rows[i].cells.length; j++){
            
            tabler.rows[i].cells[j].onmouseover = function(){
            //let baris = this.parentElement.nodeName;
            brs = this.parentElement.rowIndex - 1;
            kolo = this.cellIndex +1;
            let tekstitle = "Klik baris " + brs +" kolom "+ kolo;
            this.setAttribute("title",tekstitle);
            };
            
            tabler.rows[i].cells[j].onmouseout = function(){
            this.removeAttribute("title")
            //console.log("onmouseout")
            // document.querySelector("#tooltiptabel").style.display="none"
            };
        
            tabler.rows[i].cells[j].onclick = function(){      
                parenta = this.parentElement.nodeName;
                rIndex = this.parentElement.rowIndex;
                cIndex = this.cellIndex;//+1;
    
                //tampilkan tooltip
                let tdfokus = this;
    
                let tagclass = this.hasAttribute("class");
                let ttop = (tabler.offsetTop + this.offsetTop  ) +"px";//this.offsetTop +"px";
                let lleft =  (tabler.offsetLeft+ this.offsetLeft + this.offsetWidth +10) +"px";
                document.querySelector("#tooltiptabel").style.top=ttop;
                document.querySelector("#tooltiptabel").style.left=lleft;
                document.querySelector("#tooltiptabel").style.display="block";
                
                let tomboltd1 = document.querySelector(".btntooltip1")
                let tomboltd2 = document.querySelector(".btntooltip2");
                let tdtombol3 = document.querySelector(".btntooltip3");
                let tdtombol4 = document.querySelector(".btntooltip4");
                let tdtombol5 = document.querySelector(".btntooltip5");
                if(hapus){
                    tdtombol4.style.display = "block";
                    tdtombol5.style.display = "block";
                }else{
                    tdtombol4.style.display = "none";
                    tdtombol5.style.display = "none";
                }
                let cekHijau = false; /// anggap semuanya tidak punya class hijau
                let cekMerah = false;
                let dataclassname = this.className;
                if(this.hasAttribute("class")){
                    let dataclassnamee = this.className;
                    if(dataclassnamee.indexOf("w3-green")== -1){
                        cekHijau = true;
                    }else{
                        cekHijau = false;
                    }
                    
                    if(dataclassnamee.indexOf("w3-red")== -1){
                        cekMerah = true;
                    }else{
                        cekMerah = false
                    }
                }else{
                    cekHijau = true;
                    cekMerah = true
                }

                if(cekHijau){
                    document.querySelector(".btntooltip1").innerHTML = "Warna Hijau"
                    document.querySelector(".btntooltip1").className = document.querySelector(".btntooltip1").className.replace("w3-light-gray","w3-green");
                }else{
                    document.querySelector(".btntooltip1").innerHTML = "Hapus Warna Hijau"
                    document.querySelector(".btntooltip1").className = document.querySelector(".btntooltip1").className.replace("w3-green","w3-light-gray");
                }
                
                tomboltd1.onclick=function(){
                    if(tagclass === false && tdfokus.className ==="" && dataclassname.indexOf("w3-green")==-1){
                        tdfokus.setAttribute("class","w3-green");
                        tomboltd1.innerHTML ="Hapus Warna Hijau";
                        tomboltd1.className = tomboltd1.className.replace("w3-green","w3-light-gray");
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-green")>-1 ){
                        tdfokus.removeAttribute("class");
                        tomboltd1.innerHTML ="Warna Hijau";
                        tomboltd1.className = tomboltd1.className.replace("w3-light-gray","w3-green");
                    }else if(tagclass == true && tdfokus.className =="" && dataclassname.indexOf("w3-green")==-1){
                        tdfokus.removeAttribute("class");
                        tomboltd1.innerHTML ="Warna Hijau";
                        tomboltd1.className = tomboltd1.className.replace("w3-light-gray","w3-green");
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-green")== -1){
                        tdfokus.className = tdfokus.className.replace("w3-red","w3-green");
                        tomboltd1.innerHTML ="Hapus Warna Hijau";
                        tomboltd1.className = tomboltd1.className.replace("w3-green","w3-light-gray");
                    }else{
                        tdfokus.classList.add("w3-green");
                    }
                }


                if(cekMerah){
                    tomboltd2.innerHTML = "Warna Merah";
                    tomboltd2.className = tomboltd2.className.replace("w3-light-gray","w3-red");
                }else{
                    tomboltd2.innerHTML = "Hapus Warna Merah";
                    tomboltd2.className = tomboltd2.className.replace("w3-red","w3-light-gray");
                }

                tomboltd2.onclick = function (){
                    if(tagclass === false && tdfokus.className ==="" && dataclassname.indexOf("w3-red")==-1){
                        tdfokus.setAttribute("class","w3-red");
                        tomboltd1.innerHTML ="Hapus Warna Merah";
                        tomboltd1.className = tomboltd1.className.replace("w3-red","w3-light-gray");
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-red")>-1 ){
                        tdfokus.removeAttribute("class");
                        tomboltd1.innerHTML ="Warna Merah";
                        tomboltd1.className = tomboltd1.className.replace("w3-light-gray","w3-red");
                    }else if(tagclass == true && tdfokus.className =="" && dataclassname.indexOf("w3-red")==-1){
                        tdfokus.removeAttribute("class");
                        tomboltd1.innerHTML ="Warna Merah";
                        tomboltd1.className = tomboltd1.className.replace("w3-light-gray","w3-red");
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-green")> -1){
                        tdfokus.className = tdfokus.className.replace("w3-green","w3-red");
                        tomboltd1.innerHTML ="Hapus Warna Merah";
                        tomboltd1.className = tomboltd1.className.replace("w3-red","w3-light-gray");
                    }else{
                        tdfokus.classList.add("w3-red");
                    }
                }

                if(kolo > batas){

                
                        if(this.innerHTML == ""){
                            tdtombol3.innerHTML = "&checkmark;"
                        }else{
                            tdtombol3.innerHTML = "Hapus &checkmark;";
                        }

                        tdtombol3.onclick = function(){
                            if(tdfokus.innerHTML ==""){
                                tdfokus.innerHTML = "&checkmark;"
                                tdtombol3.innerHTML = "Hapus &checkmark;";
                            }else{
                                tdfokus.innerHTML = "";
                                tdtombol3.innerHTML = "&checkmark;";
                                
                            }
                        }
                }else{
                    if(this.hasAttribute("contenteditable")){
                        tdtombol3.innerHTML ="Kunci Edit";
                    }else{
                        tdtombol3.innerHTML ="Buka Edit";
                    }
                    tdtombol3.onclick= function (){
                        //console.log(tdfokus);
                        if(tdfokus.hasAttribute("contenteditable")){
                            tdfokus.removeAttribute("contenteditable");
                            tdtombol3.innerHTML ="Buka Edit";
                        }else{
                            
                            tdfokus.setAttribute("contenteditable","true");
                            tdtombol3.innerHTML ="Kunci Edit";
                        }
                    }
                }
                tbody = tabler.getElementsByTagName("tbody")[0];
                let nlr;
                tdtombol4.onclick = function(){
                    let indekbaris = brs - 1
                    let conf = confirm("Anda yakin akan menghapus baris ke-" + brs +"?")
                    if(conf){
                        tbody.deleteRow(indekbaris);//
                        //perbaiki nourut
                        tabler = document.querySelector("."+ classN)
                        tbody = tabler.getElementsByTagName("tbody")[0];
                        
                        for(a=0;a<tbody.rows.length;a++){
                            tbody.rows[a].cells[0].innerHTML = (a+1);
                        }
                       
                    } 
                    
                }
                tdtombol5.onclick = function(){
                    let indekbaris = brs - 1
                    let conf = confirm("Anda yakin akan ingin menambahkan baris lagi setelah bari ini?")
                    let nlr;
                    if(conf){
                         nlr = tbody.insertRow(brs);
                    

                        let ntable = document.querySelector("."+ classN)
                        let ntbody = ntable.getElementsByTagName("tbody")[0];
                        for(a=0;a<ntbody.rows[0].cells.length;a++){
                            let tdd = nlr.insertCell(a);
                            tdd.innerHTML="";
                        }
                        for(b = 0 ; b < ntbody.rows.length ; b++){
                            tbody.rows[b].cells[0].innerHTML = (b+1);
                        }
                        configTooltipAlltable(classN,kolo,hapus);
                    }
                }
                //tabler = document.querySelector("."+ classN))
            };
        }
    }
};
const select_protatematik = document.querySelector(".selectprotaversi_tematik");
select_protatematik.addEventListener("change",()=>{
    //.tabel_prota_tematik;
    let opsi = select_protatematik.options;
    let select = opsi.selectedIndex;
    let val_opsi = opsi[select].value;
    let teks_opsi = opsi[select].text;
    //alert(val_opsi);
    // isikan identitas dulu;
    //jaga-jaga jika udah buka simpan server adm
    let dup = document.querySelectorAll(".result_hapus");
    dup.forEach(hp => hp.innerHTML="");
    document.querySelector(".tdversitematik_namasekolah").innerHTML = idNamaSekolah;
    document.querySelector(".tdversitematik_kelassemester").innerHTML = idJenjang +" / " + detectSemesterBerdasarkan("tema",teks_opsi);
    document.querySelector(".tdversitematik_tapel").innerHTML = idTeksTapel;

   

    document.querySelector(".spanprotatematik_namasekolah").innerHTML = idNamaSekolah;
    document.querySelector(".spanprotatematik_namakepsek").innerHTML = idNamaKepsek;
    document.querySelector(".spanprotatematik_nipkepsek").innerHTML = "NIP. " + idNipKepsek;
    document.querySelector(".spanprotatematik_titimangsa").innerHTML = "14 Juli 2021";
    document.querySelector(".spanprotatematik_gmpkelas").innerHTML = idJenisGuru +" " + idgurumapelmapel;
    document.querySelector(".spanprotatematik_namaguru").innerHTML = namauser;
    document.querySelector(".spanprotatematik_nipguru").innerHTML = idNipGuruKelas==""?"-":"NIP. "+idNipGuruKelas;
    //configTooltipAlltable('tabel_prota_tematik',8,false);
    configTooltip("tabel_prota_tematik",true)
    /// Untuk parameter Tombol Simpan Server ;
    //onclick="serveradm('prt_prota_mapel',1,2)" class="btnserver_protatematik
    let btnserver = document.querySelector(".btnserver_protatematik");
    let judulserver = "PROGRAM TAHUNAN "+ teks_opsi;
    btnserver.setAttribute("onclick",`serveradm('prt_prota_tematik','${judulserver.toUpperCase()}',1,2)`);
    let data = DataKDKurtilas["kelas"+idJenjang];
    //console.log(data);
    let tabelnya = document.querySelector(".tabel_prota_tematik");//.getElementsByClassName("tbody")[0];
    if(val_opsi !== "default"){
        let teks = data.filter(s => s[val_opsi])[0];
        // let b = col + 1;
        // let c = col - 1
        tabelnya.rows[1].cells[0].innerHTML= val_opsi +"<br>" + teks[val_opsi];
        tabelnya.rows[1].cells[1].innerHTML= "Subtema 1 <br>" + teks["Subtema 1"];
        tabelnya.rows[7].cells[0].innerHTML= "Subtema 2 <br>" + teks["Subtema 2"];
        tabelnya.rows[13].cells[0].innerHTML= "Subtema 3 <br>" + teks["Subtema 3"];
        if(idJenjang>3){
            tabelnya.rows[19].cells[0].innerHTML= "Pembiasaan / Literasi / Proyek" ;//+ teks["Subtema 4"];
            
        }else{
            tabelnya.rows[19].cells[0].innerHTML= "Subtema 4 <br>" + teks["Subtema 4"]; ;//+ teks["Subtema 4"];

        }
    }

})
//selectprotaversi_tematik;
const detectSemesterBerdasarkan = (kriteria, namatema)=>{
    let teks ="";
    let notema = namatema.replace("Tema ","");
    let indekstema = parseInt(notema);
    let jenjang = idJenjang;
    if(jenjang >= 4 && indekstema >= 6){
        teks = "2 (Genap)"
    }else if(jenjang <= 3 && indekstema >= 5){
        teks = "2 (Genap)"
    }else{
        teks = "1 (Ganjil)"
    }
    return teks

}
const simpandraftedurasa = document.querySelector(".refrensi_simpandraft");
simpandraftedurasa.addEventListener("click", ()=>{
    let isiteks = sebelumkirimmateri();//document.formuploadmateri.idmateri.value
    //console.log(isiteks)
    if (isiteks == "") {
        alert("Maaf, Draft Anda kosong .... :(");
        return
    }
    let idmapel = document.formuploadmateri.idmapel.value;
    let iddurasi = document.formuploadmateri.iddurasi.value;
    let idaksessiswa = document.formuploadmateri.idaksessiswa.value;
    let jenistagihan = document.formuploadmateri.jenistagihan.value;
    let idtgl = document.formuploadmateri.idtgl.value;
    let idtglend = document.formuploadmateri.idtglend.value;
    let botakin = window.btoa(unescape(encodeURIComponent(isiteks)));
    let obj = {};
    obj.idmapel = idmapel;
    obj.iddurasi = iddurasi;
    obj.jenistagihan = jenistagihan;
    obj.idaksessiswa = idaksessiswa;
    obj.idtgl = idtgl;
    obj.idtglend = idtglend;
    obj.botakin = botakin;



    window.localStorage.setItem("drafmateri", JSON.stringify(obj));
    let ingindownload = confirm("Apakah Anda ingin mendownload materi ini juga?");
    if (ingindownload) {
        downloadfiledraft(isiteks, idmapel);

        alert("Draf, berhasil disimpan dan File telah Anda unduh");
    } else {
        alert("Draf, berhasil disimpan dan File tidak Anda unduh");

    }
});

const edurasataruhdraft = document.querySelector(".refrensi_taruhdraft");
edurasataruhdraft.addEventListener("click",()=>{
    let idmapel = document.formuploadmateri.idmapel;
    let iddurasi = document.formuploadmateri.iddurasi;
    let idaksessiswa = document.formuploadmateri.idaksessiswa;
    let jenistagihan = document.formuploadmateri.jenistagihan;
    let idtgl = document.formuploadmateri.idtgl;
    let idtglend = document.formuploadmateri.idtglend;
    let br = document.formuploadmateri.crtToken;

    let html = "";//doc.body;//document.formuploadmateri.idmateri

    if (localStorage.hasOwnProperty("drafmateri")) {
        let teks = JSON.parse(localStorage.getItem("drafmateri"))
        idmapel.value = teks.idmapel;
        iddurasi.value = teks.iddurasi;
        idaksessiswa.value = teks.idaksessiswa;
        jenistagihan.value = teks.jenistagihan;


        idtgl.value = getlocalDateTime(teks.idtgl);
        idtglend.value = getlocalDateTime(teks.idtglend);
        br.value = tglStringZeroparam(idtgl.value);
        let botakin = teks.botakin;
        //console.log(botakin);
        html = window.atob(unescape(encodeURIComponent(botakin)));
        //isiteks.textContent = window.atob(botakin);
        let ch = document.querySelector("#html_edt");
        if(!ch.checked){
            ch.checked = true;
            doc.execCommand("insertHTML",false,html);
            ch.checked = false
        }else{
            doc.execCommand("insertText",false,html);
        }

        alert("Anda mempunyai Draft")
    } else {
        alert("Maaf, Anda tidak memiliki Draft.")
    }
    //pratinjaubuatmateri();
});
const ref_editorsoal = document.querySelector(".refrensi_soal");
ref_editorsoal.addEventListener("click",()=>{
    // document.querySelector("#modalbanksoal").style.display = "block";
    let elemeniframe = document.getElementById("editor_ade");
    let docelemeniframe = elemeniframe.contentDocument || elemeniframe.contentWindow.document;
    aktifkanmodalkontenmateri_banksoal(docelemeniframe)
    
});
const refrensi_desainnaskah = document.querySelector(".refrensi_desainnaskah");
refrensi_desainnaskah.addEventListener("click",()=>{
    alert("Fitur Belum diaktifkan")
})

const btn_tdall =() =>{
    let modal = document.querySelector("#tooltiptabelall");
    let tgl = document.querySelector("#btntooltiptgl");
    var d = new Date().toLocaleDateString().split('/');
    var today = d[2]+"-"+("0"+d[0]).slice(-2)+"-"+("0"+d[1]).slice(-2);
    tgl.value = today;
    modal.style.display="block";

}


const tooltiplengkap = (classN,hapus) =>{
    let tabler = document.querySelector("."+ classN);//.getElementsByTagName("tbody")[0];
    let tbody = tabler.getElementsByTagName("tbody")[0];
    let tgl = document.querySelector("#btntooltiptgl");
    var d = new Date().toLocaleDateString().split('/');
    var today = d[2]+"-"+("0"+d[0]).slice(-2)+"-"+("0"+d[1]).slice(-2);
    tgl.value = today;

    let rIndex; 
    let cIndex,parenta,kolo, brs
            // table rows
    for(var i = 1; i < tabler.rows.length; i++){
        // row cells
        for(var j = 0; j < tabler.rows[i].cells.length; j++){
            
            tabler.rows[i].cells[j].onmouseover = function(){
            //let baris = this.parentElement.nodeName;
            brs = this.parentElement.rowIndex - 1;
            kolo = this.cellIndex +1;
            let tekstitle = "Klik baris " + brs +" kolom "+ kolo;
            this.setAttribute("title",tekstitle);
            };
            
            tabler.rows[i].cells[j].onmouseout = function(){
            this.removeAttribute("title")
            //console.log("onmouseout")
            // document.querySelector("#tooltiptabel").style.display="none"
            };
        
            tabler.rows[i].cells[j].onclick = function(){      
                parenta = this.parentElement.nodeName;
                rIndex = this.parentElement.rowIndex;
                cIndex = this.cellIndex;//+1;
    
                //tampilkan tooltip
                let tdfokus = this;
    
                let tagclass = this.hasAttribute("class");
                let ttop = (tabler.offsetTop + this.offsetTop  ) +"px";//this.offsetTop +"px";
                let lleft =  (tabler.offsetLeft+ this.offsetLeft + this.offsetWidth +10) +"px";
                document.querySelector("#tooltiptabelall").style.top=ttop;
                document.querySelector("#tooltiptabelall").style.left=lleft;
                document.querySelector("#tooltiptabelall").style.display="block";
                
                let tomboltd1 = document.querySelector(".btntooltipall1");//hijau
                let tomboltd2 = document.querySelector(".btntooltipall2");//merah
                let tomboltd3 = document.querySelector(".btntooltipall3");//biru
                let tomboltd4 = document.querySelector(".btntooltipall4");//kuning

                let tdtombol5 = document.querySelector(".btntooltipall5");//ceklis
                let tdtombol6 = document.querySelector(".btntooltipall6");//edit
                let tdtombol7 = document.querySelector(".btntooltipall7");//tambah baris
                let tdtombol8 = document.querySelector(".btntooltipall8");//hapusbaris baris
                let tdtombol9 = document.querySelector(".btntooltiptgl");//tanggal baris
                if(hapus){
                    tdtombol7.style.display = "block";
                    tdtombol8.style.display = "block";
                }else{
                    tdtombol7.style.display = "none";
                    tdtombol8.style.display = "none";
                }

                let cekHijau = false; /// anggap semuanya tidak punya class hijau
                let cekMerah = false;
                let cekBiru = false;
                let cekKuning = false;

                let dataclassname = this.className;
                if(this.hasAttribute("class")){
                    let dataclassnamee = this.className;
                    if(dataclassnamee.indexOf("w3-green")== -1){
                        cekHijau = true;
                    }else{
                        cekHijau = false;
                    }
                    
                    if(dataclassnamee.indexOf("w3-red")== -1){
                        cekMerah = true;
                    }else{
                        cekMerah = false
                    }
                    if(dataclassnamee.indexOf("w3-blue")== -1){
                        cekBiru = true;
                    }else{
                        cekBiru = false
                    }
                    if(dataclassnamee.indexOf("w3-yellow")== -1){
                        cekKuning = true;
                    }else{
                        cekKuning = false;
                    }
                }else{
                    cekHijau = true;
                    cekMerah = true;
                    cekBiru = true;
                    cekKuning = true;
                }

                if(cekHijau){
                    document.querySelector(".btntooltipall1").innerHTML = "Hijau"
                    document.querySelector(".btntooltipall1").className = document.querySelector(".btntooltipall1").className.replace("w3-light-gray","w3-green");
                }else{
                    document.querySelector(".btntooltipall1").innerHTML = "Hapus"
                    document.querySelector(".btntooltipall1").className = document.querySelector(".btntooltipall1").className.replace("w3-green","w3-light-gray");
                }
                
                tomboltd1.onclick=function(){
                    if(tagclass === false && tdfokus.className ==="" && dataclassname.indexOf("w3-green")==-1){
                        tdfokus.setAttribute("class","w3-green");
                        tomboltd1.innerHTML ="Hapus";
                        tomboltd1.className = tomboltd1.className.replace("w3-green","w3-light-gray");
                        tdfokus.click();
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-green")>-1 ){
                        tdfokus.removeAttribute("class");
                        tomboltd1.innerHTML ="Hijau";
                        tomboltd1.className = tomboltd1.className.replace("w3-green","w3-green");
                        tdfokus.click();
                    }else if(tagclass == true && tdfokus.className =="" && dataclassname.indexOf("w3-green")==-1){
                        tdfokus.removeAttribute("class");
                        tdfokus.classList.add("w3-green");
                        tomboltd1.innerHTML ="Hijau";
                        tomboltd1.className = tomboltd1.className.replace("w3-light-gray","w3-green");
                        tdfokus.click();
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-green")== -1){
                        tdfokus.className = tdfokus.className.replace("w3-red","w3-green").replace("w3-blue","w3-green").replace("w3-yellow","w3-green");
                        tomboltd1.innerHTML ="Hapus";
                        tomboltd1.className = tomboltd1.className.replace("w3-green","w3-light-gray");
                        tdfokus.click();
                    }else{
                        tdfokus.removeAttribute("class");
                        tdfokus.classList.add("w3-green");
                        tdfokus.click();
                    }
                }


                if(cekMerah){
                    tomboltd2.innerHTML = "Merah";
                    tomboltd2.className = tomboltd2.className.replace("w3-light-gray","w3-red");
                }else{
                    tomboltd2.innerHTML = "Hapus";
                    tomboltd2.className = tomboltd2.className.replace("w3-red","w3-light-gray");
                }



                tomboltd2.onclick = function (){
                    if(tagclass === false && tdfokus.className ==="" && dataclassname.indexOf("w3-red")==-1){
                        tdfokus.setAttribute("class","w3-red");
                        tomboltd2.innerHTML ="Merah";
                        tomboltd2.className = tomboltd2.className.replace("w3-red","w3-light-gray");
                        tdfokus.click();
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-red")>-1 ){
                        tdfokus.removeAttribute("class");
                        tomboltd2.innerHTML ="Merah";
                        tomboltd2.className = tomboltd2.className.replace("w3-light-gray","w3-red");
                        tdfokus.click();
                    }else if(tagclass == true && tdfokus.className =="" && dataclassname.indexOf("w3-red")==-1){
                        tdfokus.removeAttribute("class");
                        tdfokus.classList.add("w3-red");
                        tomboltd2.innerHTML ="Merah";
                        tomboltd2.className = tomboltd2.className.replace("w3-light-gray","w3-red");
                        tdfokus.click();
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-red")> -1){
                        tdfokus.className = tdfokus.className.replace("w3-green","w3-red").replace("w3-blue","w3-red").replace("w3-yellow","w3-red");
                        tomboltd2.innerHTML ="Hapus";
                        tomboltd2.className = tomboltd2.className.replace("w3-red","w3-light-gray");
                        tdfokus.click();
                    }else{
                        tdfokus.removeAttribute("class");
                        tdfokus.classList.add("w3-red");
                        tdfokus.click();
                    }
                }
                //biru
                if(cekBiru){
                    tomboltd3.innerHTML = "Biru";
                    tomboltd3.className = tomboltd3.className.replace("w3-light-gray","w3-blue");
                }else{
                    tomboltd3.innerHTML = "Hapus";
                    tomboltd3.className = tomboltd3.className.replace("w3-blue","w3-light-gray");
                }



                tomboltd3.onclick = function (){
                    if(tagclass === false && tdfokus.className ==="" && dataclassname.indexOf("w3-blue")==-1){
                        tdfokus.setAttribute("class","w3-blue");
                        tomboltd3.innerHTML ="Hapus";
                        tomboltd3.className = tomboltd3.className.replace("w3-blue","w3-light-gray");
                        tdfokus.click();
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-blue")>-1 ){
                        tdfokus.removeAttribute("class");
                        tomboltd3.innerHTML ="Biru";
                        tomboltd3.className = tomboltd3.className.replace("w3-light-gray","w3-blue");
                        tdfokus.click();
                    }else if(tagclass == true && tdfokus.className =="" && dataclassname.indexOf("w3-blue")==-1){
                        tdfokus.removeAttribute("class");
                        tdfokus.classList.add("w3-blue");
                        tomboltd3.innerHTML ="Biru";
                        tomboltd3.className = tomboltd3.className.replace("w3-light-gray","w3-blue");
                        tdfokus.click();
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-blue")> -1){
                        tdfokus.className = tdfokus.className.replace("w3-green","w3-blue").replace("w3-red","w3-blue").replace("w3-yellow","w3-blue");
                        tomboltd3.innerHTML ="Hapus";
                        tomboltd3.className = tomboltd3.className.replace("w3-blue","w3-light-gray");
                        tdfokus.click();
                    }else{
                        
                        tdfokus.removeAttribute("class");
                        tdfokus.classList.add("w3-blue");
                        tdfokus.click();
                    }
                }
                // //yellow
                if(cekKuning){
                    tomboltd4.innerHTML = "Kuning";
                    tomboltd4.className = tomboltd4.className.replace("w3-light-gray","w3-yellow");
                }else{
                    tomboltd4.innerHTML = "Hapus";
                    tomboltd4.className = tomboltd4.className.replace("w3-yellow","w3-light-gray");
                }



                tomboltd4.onclick = function (){
                    if(tagclass === false && tdfokus.className ==="" && dataclassname.indexOf("w3-yellow")==-1){
                        tdfokus.setAttribute("class","w3-yellow");
                        tomboltd4.innerHTML ="Hapus";
                        tomboltd4.className = tomboltd4.className.replace("w3-yellow","w3-light-gray");
                        tdfokus.click();
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-yellow")>-1 ){
                        tdfokus.removeAttribute("class");
                        tomboltd4.innerHTML ="Warna";
                        tomboltd4.className = tomboltd4.className.replace("w3-light-gray","w3-yellow");
                        tdfokus.click();
                    }else if(tagclass == true && tdfokus.className =="" && dataclassname.indexOf("w3-yellow")==-1){
                        tdfokus.removeAttribute("class");
                        tdfokus.classList.add("w3-yellow");
                        tomboltd4.innerHTML ="Kuning";
                        tomboltd4.className = tomboltd4.className.replace("w3-light-gray","w3-yellow");
                        tdfokus.click();
                    }else if(tagclass === true && tdfokus.className !=="" && dataclassname.indexOf("w3-yellow")> -1){
                        tdfokus.className = tdfokus.className.replace("w3-green","w3-yellow").replace("w3-red","w3-yellow").replace("w3-blue","w3-yellow");
                        tomboltd4.innerHTML ="Hapus";
                        tomboltd4.className = tomboltd4.className.replace("w3-yellow","w3-light-gray");
                        tdfokus.click();
                    }else{
                        
                        tdfokus.removeAttribute("class");
                        tdfokus.classList.add("w3-yellow");
                        tdfokus.click();
                    }
                }
                // //yellow

                
                
                        if(this.innerHTML == ""){
                            tdtombol5.innerHTML = "&checkmark;"
                        }else{
                            tdtombol5.innerHTML = "Hapus";
                        }

                        tdtombol5.onclick = function(){
                            if(tdfokus.innerHTML ==""){
                                tdfokus.innerHTML = "&checkmark;"
                                tdtombol5.innerHTML = "Hapus";
                            }else{
                                tdfokus.innerHTML = "";
                                tdtombol5.innerHTML = "&checkmark;";
                                
                            }
                        }
                if(this.hasAttribute("contenteditable")){
                    tdtombol6.innerHTML ="Kunci Edit";
                }else{
                    tdtombol6.innerHTML ="Buka Edit";
                }
                tdtombol6.onclick= function (){
                     //console.log(tdfokus);
                    if(tdfokus.hasAttribute("contenteditable")){
                        tdfokus.removeAttribute("contenteditable");
                        tdtombol6.innerHTML ="Buka Edit";
                    }else{
                        tdfokus.setAttribute("contenteditable","true");
                        tdtombol6.innerHTML ="Kunci Edit";
                    }
                }
                
                tbody = tabler.getElementsByTagName("tbody")[0];
                //hapus
                let nlr;
                tdtombol8.onclick = function(){
                    let indekbaris = brs - 1
                    let conf = confirm("Anda yakin akan menghapus baris ke-" + brs +"?")
                    if(conf){
                        tbody.deleteRow(indekbaris);//
                        //perbaiki nourut
                        tabler = document.querySelector("."+ classN)
                        tbody = tabler.getElementsByTagName("tbody")[0];
                        
                        for(a=0;a<tbody.rows.length;a++){
                            tbody.rows[a].cells[0].innerHTML = (a+1);
                        }
                       
                    } 
                    tooltiplengkap(classN,hapus);
                }
                tdtombol7.onclick = function(){
                    let indekbaris = brs - 1
                    let conf = confirm("Anda yakin akan ingin menambahkan baris lagi setelah bari ini?")
                    let nlr;
                    if(conf){
                         nlr = tbody.insertRow(brs);
                    

                        let ntable = document.querySelector("."+ classN)
                        let ntbody = ntable.getElementsByTagName("tbody")[0];
                        for(a=0;a<ntbody.rows[0].cells.length;a++){
                            let tdd = nlr.insertCell(a);
                            tdd.innerHTML="";
                        }
                        for(b = 0 ; b < ntbody.rows.length ; b++){
                            tbody.rows[b].cells[0].innerHTML = (b+1);
                        }
                        tooltiplengkap(classN,hapus);
                    }
                }
                tgl.onchange=function(){
                    let rd = document.querySelectorAll("input[name=formattgltooltip]");
                    let bol = "";
                    
                    for(i=0;i<rd.length;i++){

                        if(rd[i].checked){
                            bol = rd[i].getAttribute("data-tooltiptgl");

                        }
                    }
                    
                    if(bol == "lengkap"){
                        tdfokus.innerHTML = tanggalfull(tgl.value);
                    }else{
                        let t = new Date(tgl.value);
                        let d = addZero(t.getDate());
                        let m = addZero(t.getMonth()+1);
                        let y = t.getFullYear();
                        // let vak = "<sup>" + d +"</sup>/<sub>"+ m + "</sub><span class='w3-tiny'>" + y +"</span>";
                        let vak = d +"/"+m+"/"+y;
                        tdfokus.innerHTML = vak;
                    }
                }
                //tabler = document.querySelector("."+ classN))
            };
        }
    }
    dragElement(document.getElementById("tooltiptabelall"));
};

const HeaderserverKD = () =>{

   var arrserverKD = [[["row"],["kelas"],["mapel"],["kd"],["koleksitema"],["semester"],["indikator3"],["indikator4"],["materi3"],["materi4"],["jp3"],["jp4"],["t1_st1_pb1"],["t1_st1_pb2"],["t1_st1_pb3"],["t1_st1_pb4"],["t1_st1_pb5"],["t1_st1_pb6"],["t1_st2_pb1"],["t1_st2_pb2"],["t1_st2_pb3"],["t1_st2_pb4"],["t1_st2_pb5"],["t1_st2_pb6"],["t1_st3_pb1"],["t1_st3_pb2"],["t1_st3_pb3"],["t1_st3_pb4"],["t1_st3_pb5"],["t1_st3_pb6"],["t1_st4_pb1"],["t1_st4_pb2"],["t1_st4_pb3"],["t1_st4_pb4"],["t1_st4_pb5"],["t1_st4_pb6"],["t2_st1_pb1"],["t2_st1_pb2"],["t2_st1_pb3"],["t2_st1_pb4"],["t2_st1_pb5"],["t2_st1_pb6"],["t2_st2_pb1"],["t2_st2_pb2"],["t2_st2_pb3"],["t2_st2_pb4"],["t2_st2_pb5"],["t2_st2_pb6"],["t2_st3_pb1"],["t2_st3_pb2"],["t2_st3_pb3"],["t2_st3_pb4"],["t2_st3_pb5"],["t2_st3_pb6"],["t2_st4_pb1"],["t2_st4_pb2"],["t2_st4_pb3"],["t2_st4_pb4"],["t2_st4_pb5"],["t2_st4_pb6"],["t3_st1_pb1"],["t3_st1_pb2"],["t3_st1_pb3"],["t3_st1_pb4"],["t3_st1_pb5"],["t3_st1_pb6"],["t3_st2_pb1"],["t3_st2_pb2"],["t3_st2_pb3"],["t3_st2_pb4"],["t3_st2_pb5"],["t3_st2_pb6"],
   ["t3_st3_pb1"],["t3_st3_pb2"],["t3_st3_pb3"],["t3_st3_pb4"],["t3_st3_pb5"],["t3_st3_pb6"],["t3_st4_pb1"],["t3_st4_pb2"],["t3_st4_pb3"],["t3_st4_pb4"],["t3_st4_pb5"],["t3_st4_pb6"],["t4_st1_pb1"],["t4_st1_pb2"],["t4_st1_pb3"],["t4_st1_pb4"],["t4_st1_pb5"],["t4_st1_pb6"],["t4_st2_pb1"],["t4_st2_pb2"],["t4_st2_pb3"],["t4_st2_pb4"],["t4_st2_pb5"],["t4_st2_pb6"],["t4_st3_pb1"],["t4_st3_pb2"],["t4_st3_pb3"],["t4_st3_pb4"],["t4_st3_pb5"],["t4_st3_pb6"],["t4_st4_pb1"],["t4_st4_pb2"],["t4_st4_pb3"],["t4_st4_pb4"],["t4_st4_pb5"],["t4_st4_pb6"],["t5_st1_pb1"],["t5_st1_pb2"],["t5_st1_pb3"],["t5_st1_pb4"],["t5_st1_pb5"],["t5_st1_pb6"],["t5_st2_pb1"],["t5_st2_pb2"],["t5_st2_pb3"],["t5_st2_pb4"],["t5_st2_pb5"],["t5_st2_pb6"],["t5_st3_pb1"],["t5_st3_pb2"],["t5_st3_pb3"],["t5_st3_pb4"],["t5_st3_pb5"],["t5_st3_pb6"],["t5_st4_pb1"],["t5_st4_pb2"],["t5_st4_pb3"],["t5_st4_pb4"],["t5_st4_pb5"],["t5_st4_pb6"],["t6_st1_pb1"],["t6_st1_pb2"],["t6_st1_pb3"],["t6_st1_pb4"],["t6_st1_pb5"],["t6_st1_pb6"],["t6_st2_pb1"],["t6_st2_pb2"],["t6_st2_pb3"],["t6_st2_pb4"],["t6_st2_pb5"],["t6_st2_pb6"],["t6_st3_pb1"],["t6_st3_pb2"],["t6_st3_pb3"],["t6_st3_pb4"],["t6_st3_pb5"],["t6_st3_pb6"],["t6_st4_pb1"],["t6_st4_pb2"],["t6_st4_pb3"],["t6_st4_pb4"],["t6_st4_pb5"],["t6_st4_pb6"],["t7_st1_pb1"],["t7_st1_pb2"],["t7_st1_pb3"],["t7_st1_pb4"],["t7_st1_pb5"],["t7_st1_pb6"],["t7_st2_pb1"],["t7_st2_pb2"],["t7_st2_pb3"],["t7_st2_pb4"],["t7_st2_pb5"],["t7_st2_pb6"],["t7_st3_pb1"],["t7_st3_pb2"],["t7_st3_pb3"],["t7_st3_pb4"],["t7_st3_pb5"],["t7_st3_pb6"],["t7_st4_pb1"],["t7_st4_pb2"],["t7_st4_pb3"],["t7_st4_pb4"],["t7_st4_pb5"],["t7_st4_pb6"],["t8_st1_pb1"],["t8_st1_pb2"],["t8_st1_pb3"],["t8_st1_pb4"],["t8_st1_pb5"],["t8_st1_pb6"],["t8_st2_pb1"],["t8_st2_pb2"],["t8_st2_pb3"],["t8_st2_pb4"],["t8_st2_pb5"],["t8_st2_pb6"],["t8_st3_pb1"],["t8_st3_pb2"],["t8_st3_pb3"],["t8_st3_pb4"],["t8_st3_pb5"],["t8_st3_pb6"],["t8_st4_pb1"],["t8_st4_pb2"],["t8_st4_pb3"],["t8_st4_pb4"],["t8_st4_pb5"],["t8_st4_pb6"],["t9_st1_pb1"],["t9_st1_pb2"],["t9_st1_pb3"],["t9_st1_pb4"],["t9_st1_pb5"],["t9_st1_pb6"],["t9_st2_pb1"],["t9_st2_pb2"],["t9_st2_pb3"],["t9_st2_pb4"],["t9_st2_pb5"],["t9_st2_pb6"],["t9_st3_pb1"],["t9_st3_pb2"],["t9_st3_pb3"],["t9_st3_pb4"],["t9_st3_pb5"],["t9_st3_pb6"],["t9_st4_pb1"],["t9_st4_pb2"],["t9_st4_pb3"],["t9_st4_pb4"],["t9_st4_pb5"],["t9_st4_pb6"]]];
   return arrserverKD
} 

const rd_kdsemester = document.querySelectorAll("input[name=petakd_rd_semester]");
const rd_tipesebaran = document.querySelectorAll("input[name=petakd_rd_tipesebaran]");
const rd_tipekd = document.querySelectorAll("input[name=petakd_rd_tipekd]");


const cekApiSebaranKD = () =>{
    loadingtopbarin("loadingtopbar");
    
    let tab = "serverkd";
        let tabel = HeaderserverKD();//[[["barisini"],["tag"],["html"],["oleh"],["judul"],["idguru"],["versi"]]];
        let head = tabel[0];
        let key = JSON.stringify(head);
        let datakirim = new FormData();
        
        datakirim.append("tab",tab);
        datakirim.append("key",key);
    fetch(urladm+"?action=getpostdatafromtab",{
        method:"post",
        body:datakirim
    }).then(m => m.json())
    .then(r => {
       //console.log(r);
        let dd = r.data;
        alltagkdserver = dd;
        let fil_kelas = dd.filter(s => s.kelas == idJenjang);
        tagkdserver = fil_kelas;
        let filt_mapelkd = fil_kelas.filter(s => s.mapel=="MTK");
        clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
            setTimeout(() => {
                divlod.style.width = "1px"
                divlod.className += " w3-hide";

            }, 3000);
    }).catch(er=>console.log(er));

};

function rdpetakd_semester (x){
    if(tagkdserver == undefined){
        alert("... sedang menggenerate, silakan coba lagi.")
        return
    }
    let v;
    let kd34;
        v = x.value;
        let tipe
        for(i = 0 ; i < rd_tipesebaran.length; i++){
            let rad = rd_tipesebaran[i];
            if(rad.checked){
                tipe = rad.value;
            }
        }
        if(tipe === undefined){
            let uncek = document.querySelector("#petakd_rd3")
            uncek.checked = true;
            tipe = uncek.value;
        }
        let dd1 = document.querySelector(".h_petakd1");
        let dd2 = document.querySelector(".h_petakd2");
        let tabel = document.querySelector(".tbl_distribusi_kd");
        let tbody = tabel.getElementsByTagName("tbody")[0];
        let thead = tabel.getElementsByTagName("thead")[0];

        let ttd_sekolah = document.querySelector(".spanpetakd_namasekolah");
        let ttd_namakepsek = document.querySelector(".spanpetakd_namakepsek");
        let ttd_nipkepsek = document.querySelector(".spanpetakd_nipkepsek");
        let ttd_titimangsa = document.querySelector(".spanpetakd_titimangsa");
        let ttd_ketguru = document.querySelector(".spanpetakd_gmpkelas");
        let ttd_ketampukelas = document.querySelector(".spanpetakd_kelasnya");
        let ttd_namaguru = document.querySelector(".spanpetakd_namaguru");
        let ttd_nipguru = document.querySelector(".spanpetakd_nipguru");
        dd1.innerHTML = "DISTRIBUSI KOMPETENSI PENGETAHUAN (KD-3)" ;//+ (v==1?"PENGETAHUAN":"KETERAMPILAN");
        dd2.innerHTML = "SEMESTER " + v + " TAHUN PELAJARAN " + idTeksTapel;
        ttd_sekolah.innerHTML = idNamaSekolah;
        ttd_namakepsek.innerHTML = idNamaKepsek;
        ttd_nipkepsek.innerHTML = "NIP. "+ idNipKepsek;
        ttd_titimangsa.innerHTML = tanggalfull(new Date());
        ttd_ketguru.innerHTML = idJenisGuru +" "+ idgurumapelmapel;
        ttd_namaguru.innerHTML = namauser;
        ttd_nipguru.innerHTML = idNipGuruKelas==""?"-":"NIP. "+idNipGuruKelas;

        let html = "";
        let tbh = "";
        if(idJenjang > 3){
            if(tipe == "Tematik"){
                
                tbh=`<tr class="w3-light-gray"><th rowspan="2">TEMA</th><th colspan="20">MATA PELAJARAN</th></tr><tr class="w3-light-gray"><th colspan="4">PKN</th><th colspan="4">Bahasa Indonesia</th><th colspan="4">IPA</th><th colspan="4">IPS</th><th colspan="4">SBDP</th></tr>`;
                html = htmldistribusikd_tematik(v,"tinggi")
                
            }else{
                tbh =`<tr class="w3-light-gray"><th>Ruang Lingkup</th><th>Materi Pokok</th><th>Kompetensi Dasar</th><th>Indikator</th><th>Alokasi Waktu</th></tr>`;
                html +=`<tr><td colspan="5">Pilih Mata Pelajaran terlebih dahulu</d></tr>`;
            
            }
        }else{
            if(tipe == "Tematik"){
                ;
                tbh=`<tr class="w3-light-gray"><th rowspan="2">TEMA</th><th colspan="20">MATA PELAJARAN</th></tr><tr class="w3-light-gray"><th colspan="4">PKN</th><th colspan="4">Bahasa Indonesia</th><th colspan="4">MATEMATIKA</th><th colspan="4">SBDP</th><th colspan="4">PJOK</th></tr>`;
                html = htmldistribusikd_tematik(v, "rendah")
            }else{
                tbh =`<tr class="w3-light-gray"><th>Ruang Lingkup</th><th>Materi Pokok</th><th>Kompetensi Dasar</th><th>Indikator</th><th>Alokasi Waktu</th></tr>`;
                html +=`<tr><td colspan="5">Pilih Mata Pelajaran terlebih dahulu</d></tr>`;
            
            
            }
        }
        thead.innerHTML = tbh;
        tbody.innerHTML = html;
        if(tipe=="Tematik"){
            tooltipkd_config("tbl_distribusi_kd",v)
        }

}
function rdpetakd_temamapel  (x){
    let v;
    let tipe;
    let divsel = document.querySelector(".divselectpetakd_mapelmulok");
    let pengubahkd = document.getElementById("Ubahkddistribusi")
    
        tipe = x.value;
        for(i = 0 ; i < rd_kdsemester.length; i++){
            let rad = rd_kdsemester[i];
            if(rad.checked){
                v = rad.value;
            }
        }
        
        if(v === undefined){
            let uncek = document.querySelector("#petakd_rd2")
            uncek.checked = true;
            v = uncek.value;
        }
        

        let dd1 = document.querySelector(".h_petakd1");
        let dd2 = document.querySelector(".h_petakd2");
        let tabel = document.querySelector(".tbl_distribusi_kd");
        let tbody = tabel.getElementsByTagName("tbody")[0];
        let thead = tabel.getElementsByTagName("thead")[0];

        let ttd_sekolah = document.querySelector(".spanpetakd_namasekolah");
        let ttd_namakepsek = document.querySelector(".spanpetakd_namakepsek");
        let ttd_nipkepsek = document.querySelector(".spanpetakd_nipkepsek");
        let ttd_titimangsa = document.querySelector(".spanpetakd_titimangsa");
        let ttd_ketguru = document.querySelector(".spanpetakd_gmpkelas");
        let ttd_namaguru = document.querySelector(".spanpetakd_namaguru");
        let ttd_nipguru = document.querySelector(".spanpetakd_nipguru");
        dd1.innerHTML = "DISTRIBUSI KOMPETENSI PENGETAHUAN (KD-3)" ;//+ (v==1?"PENGETAHUAN":"KETERAMPILAN");
        dd2.innerHTML = "SEMESTER " + v + " TAHUN PELAJARAN " + idTeksTapel;
        ttd_sekolah.innerHTML = idNamaSekolah;
        ttd_namakepsek.innerHTML = idNamaKepsek;
        ttd_nipkepsek.innerHTML = "NIP. " + idNipKepsek;
        ttd_titimangsa.innerHTML = tanggalfull(new Date());
        ttd_ketguru.innerHTML = idJenisGuru +" "+ idgurumapelmapel;
        ttd_namaguru.innerHTML = namauser;
        ttd_nipguru.innerHTML = idNipGuruKelas==""?"-":"NIP. "+idNipGuruKelas;

        let html = "";
        let tbh = "";
        if(idJenjang > 3){
            if(tipe == "Tematik"){
                
                if(divsel.className.indexOf("w3-hide") == -1 ){
                    divsel.classList.add("w3-hide");
                }
                pengubahkd.style.display ="block"
                tbh=`<tr class="w3-light-gray"><th rowspan="2">TEMA</th><th colspan="20">MATA PELAJARAN</th></tr><tr class="w3-light-gray"><th colspan="4">PKN</th><th colspan="4">Bahasa Indonesia</th><th colspan="4">IPA</th><th colspan="4">IPS</th><th colspan="4">SBDP</th></tr>`;
                html = htmldistribusikd_tematik(v,"tinggi")
            }else{
                if(divsel.className.indexOf("w3-hide") > -1 ){
                    divsel.classList.remove("w3-hide");
                }
                pengubahkd.style.display ="none"
                tbh =`<tr class="w3-light-gray"><th>Ruang Lingkup</th><th>Materi Pokok</th><th>Kompetensi Dasar</th><th>Indikator</th><th>Alokasi Waktu</th></tr>`;
                html +=`<tr><td colspan="5">Pilih Mata Pelajaran terlebih dahulu</td></tr>`;
            }
        }else{
            if(tipe == "Tematik"){
                pengubahkd.style.display ="block"
                if(divsel.className.indexOf("w3-hide") == -1 ){
                    divsel.classList.add("w3-hide");

                }
                tbh=`<tr class="w3-light-gray"><th rowspan="2">TEMA</th><th colspan="20">MATA PELAJARAN</th></tr><tr class="w3-light-gray"><th colspan="4">PKN</th><th colspan="4">Bahasa Indonesia</th><th colspan="4">MATEMATIKA</th><th colspan="4">SBDP</th><th colspan="4">PJOK</th></tr>`;
                html = htmldistribusikd_tematik(v,"tinggi")
            }else{
                pengubahkd.style.display ="none"
                if(divsel.className.indexOf("w3-hide") > -1 ){
                    divsel.classList.remove("w3-hide");
                }
                tbh =`<tr class="w3-light-gray"><th>Ruang Lingkup</th><th>Materi Pokok</th><th>Kompetensi Dasar</th><th>Indikator</th><th>Alokasi Waktu</th></tr>`;
                html +=`<tr><td colspan="5">Pilih Mata Pelajaran terlebih dahulu</d></tr>`;
            
            }
        }
        thead.innerHTML = tbh;
        tbody.innerHTML = html;
        if(tipe=="Tematik"){
            tooltipkd_config("tbl_distribusi_kd",v)
        }
        

};
const tooltipkd_config = (kelas,semester) =>{
    let brs,kolo;
    let tabler = document.querySelector("."+ kelas);
    
    
    for(var i = 1; i < tabler.rows.length; i++){
        for(var j = 0; j < tabler.rows[i].cells.length; j++){
            tabler.rows[i].cells[j].onmouseover = function(){
            //let baris = this.parentElement.nodeName;
            brs = this.parentElement.rowIndex - 1;
            kolo = this.cellIndex +1;
            let tekstitle = "Klik baris " + brs +" kolom "+ kolo;
            this.setAttribute("title",tekstitle);
            };
            tabler.rows[i].cells[j].onmouseout = function(){
            this.removeAttribute("title")
            //console.log("onmouseout")
            // document.querySelector("#tooltiptabel").style.display="none"
            };
            tabler.rows[i].cells[j].onclick = function(){     
                let parenta = this.parentElement.nodeName;
                let rIndex = this.parentElement.rowIndex;
                let cIndex = this.cellIndex;//+1;

                let arrCodeMap = ["PKN","BINDO","MTK","IPA","IPS","SBDP","PJOK"];//tagkdserver;;
                let arrket = ["PKN","Bahasa Indonesia","MATEMATIKA","IPA","IPS","SBDP","PJOK"];//tagkdserver;;
                let o,p,q;
                let arrKDmapel

                if(kolo >= 2 && kolo <= 5){
                    // arrMapelKD = tagkdserver.filter(f => f.mapel == )
                    o = tabler.rows[1].cells[0].innerHTML;
                    p=arrket.indexOf(o);
                    q = arrCodeMap[p];
                    arrKDmapel = tagkdserver.filter(s => s.mapel == q)
                
                    
                    
                }else if(kolo >= 6 && kolo <= 9){
                    o = tabler.rows[1].cells[1].innerHTML;
                    p=arrket.indexOf(o);
                    q = arrCodeMap[p];
                    arrKDmapel = tagkdserver.filter(s => s.mapel == q)
                    
                    
                }else if(kolo >= 10 && kolo <= 13){
                    o = tabler.rows[1].cells[2].innerHTML;
                    p=arrket.indexOf(o);
                    q = arrCodeMap[p];
                    arrKDmapel = tagkdserver.filter(s => s.mapel == q)
                    
                    
                }else if(kolo >=14 && kolo <= 17){
                    o = tabler.rows[1].cells[3].innerHTML;
                    p=arrket.indexOf(o);
                    q = arrCodeMap[p];
                    arrKDmapel = tagkdserver.filter(s => s.mapel == q)
                    
                    
                }else if(kolo >=18 && kolo <= 21){
                    o = tabler.rows[1].cells[4].innerHTML;
                    p=arrket.indexOf(o);
                    q = arrCodeMap[p];
                    arrKDmapel = tagkdserver.filter(s => s.mapel == q)
                    
                }else{
                    
                    q = [];
                    
                    arrKDmapel = tagkdserver.filter(s => s.mapel == q)
                }
                //console.log(arrKDmapel);
        
                //tampilkan tooltip
                let tdfokus = this;
                
                let ttop = (tabler.offsetTop + this.offsetTop  ) +"px";//this.offsetTop +"px";
                let lleft =  (tabler.offsetLeft+ this.offsetLeft + this.offsetWidth +10) +"px";
                document.querySelector("#tooltipkd1").style.top=ttop;
                document.querySelector("#tooltipkd1").style.left=lleft;
                document.querySelector("#tooltipkd1").style.display="block";
                let btn = document.querySelectorAll(".badge_kd");
                let hapus_tooltipkd1 =  document.querySelector(".hapus_tooltipkd1");
                
                for(a = 0 ; a < btn.length ; a++){
                    //console.log(arrKDmapel)
                    let btnklik = btn[a];
                    let barisserver
                    btnklik.style.display ="none";
                    if(a < arrKDmapel.length){
                        btnklik.style.display ="inline-block";
                        btnklik.innerHTML =arrKDmapel[a].kd;//tagkd34 +"."+(a+1);
                        barisserver = arrKDmapel[a].row;
                    }
                    btnklik.onclick = function(){
                        let cek = btnklik.innerHTML;
                        if(tdfokus.innerHTML !==""){
                            alert("Ager tidak duplikasi, Sebaiknya Anda hapus KD ini terlebih dahulu!")
                            return
                        }
                        tdfokus.innerHTML = cek;
                        let namatema = tabler.rows[rIndex].cells[0].innerHTML
                        simpandistribusi_koleksitema(barisserver,namatema,semester);
                        document.querySelector("#tooltipkd1").style.display="none";
                        // let serverkdupdate = arrKDmapel.filter(up => up.row == barisserver)[0];
                        // console.log(serverkdupdate);
                        
                        //console.log(brs +" / "+ kolo);
                    }
                }
                hapus_tooltipkd1.onclick = function(){
                    if(tdfokus.innerHTML ==""){
                        return;
                    }
                    let namatema = tabler.rows[rIndex].cells[0].innerHTML
                    let cekTeks = tdfokus.innerHTML;
                    if(cekTeks.indexOf("4.") > -1){
                        cekTeks.replace("4.","3.")
                    }
                    barisserver = arrKDmapel.filter(s=> s.kd == cekTeks)[0].row;
                    hapusdistribusi_koleksitema(barisserver,namatema,semester);
                    tdfokus.innerHTML = "";
                    document.querySelector("#tooltipkd1").style.display="none";
                }
            }
        }
    }
    dragElement(document.getElementById("tooltipkd1"));
    let btnserver = document.querySelector(".btnserver_petakd_distribusi");
        let judulserver = "PEMETAAN KD SEMESTER "+ semester;
        btnserver.setAttribute("onclick",`serveradm('prt_petakd_distribusi','${judulserver}',6,2)`);
};
const simpandistribusi_koleksitema = (row, val, semester) =>{
    let objekBarisini = tagkdserver.filter(s => s.row == row)[0];
    let objekserverkdsebelumnya = Object.assign({},objekBarisini);
    let server_koleksitema = objekserverkdsebelumnya.koleksitema; 
    let rest_koleksitema = [];
    if(server_koleksitema !== ""){  
        let arrserver_koleksitema = JSON.parse(server_koleksitema);
        let cekIndekVal = arrserver_koleksitema.indexOf(val);
        if(cekIndekVal == -1){
            arrserver_koleksitema.push(val)
        }
        rest_koleksitema = arrserver_koleksitema;
    }else{
        rest_koleksitema.push(val);// kalo isian koleksi tema di server kosong, tambahkan langsung
    }
    let rest_semester = [];
    let arrTemaRendahGanjil = ["TEMA 1","TEMA 2","TEMA 3","TEMA 4"];
    let arrTemaRendahGenap = ["TEMA 5","TEMA 6","TEMA 7","TEMA 8"];
    let arrTemaTinggiGanjil = ["TEMA 1","TEMA 2","TEMA 3","TEMA 4","TEMA 5"];
    let arrTemaTinggiGenap = ["TEMA 6","TEMA 7","TEMA 8","TEMA 9"];
    let obj = {};
        obj.tinggi =  {"1":arrTemaTinggiGanjil,"2":arrTemaTinggiGenap};
        obj.rendah = {"1":arrTemaRendahGanjil, "2":arrTemaRendahGenap}
    let konftema;
    if(idJenjang > 3){
            konftema = obj.tinggi;
        }else{
            konftema = obj.rendah;
        }
    for(i = 0 ; i < rest_koleksitema.length ; i++){
        let namaTema = rest_koleksitema[i];
        let cektema = Object.keys(konftema).filter(s => konftema[s].indexOf(namaTema)>-1)[0];
        if(rest_semester.indexOf(cektema)==-1){
            rest_semester.push(cektema)
        }
    }
    
    let objekjadikirim = Object.assign(objekserverkdsebelumnya, {"koleksitema":JSON.stringify(rest_koleksitema),"semester":JSON.stringify(rest_semester)});
    let keyy = JSON.stringify(Object.keys(objekjadikirim));
    let tabel= JSON.stringify(Object.values(objekjadikirim))
        
    let datakirim = new FormData();
        datakirim.append("key",keyy);
        datakirim.append("idbaris",row);
        datakirim.append("tab","serverkd");
        datakirim.append("tabel",tabel);
    
    fetch(urladm+"?action=simpanbarisketabidbaris",{
            method:"post",
            body:datakirim
    }).then(m=>m.json())
    .then(r => {
            let result = r.data;
            alltagkdserver = r.data;
            tagkdserver = result.filter(s => s.kelas == idJenjang);
            let html="";
            let tabel = document.querySelector(".tbl_distribusi_kd");
            let tbody = tabel.getElementsByTagName("tbody")[0];
            if(idJenjang>3){
                html = htmldistribusikd_tematik(semester, "tinggi");
                
            }else{
                
                html = htmldistribusikd_tematik(semester, "rendah")
            }
            tbody.innerHTML = html;
            tooltipkd_config("tbl_distribusi_kd",semester)
            clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
            setTimeout(() => {
                divlod.style.width = "1px"
                divlod.className += " w3-hide";
            }, 3000);
            alert("Berhasil disimpan")
    })
    .catch(er => console.log(er))
        
}
const hapusdistribusi_koleksitema = (row, val,semester) =>{
    let objekBarisini = tagkdserver.filter(s => s.row == row)[0];
    let objekserverkdsebelumnya = Object.assign({},objekBarisini);
    let server_koleksitema = objekserverkdsebelumnya.koleksitema; 
    let rest_koleksitema = [];
    
    let arrserver_koleksitema = JSON.parse(server_koleksitema);
    let cekIndekVal = arrserver_koleksitema.indexOf(val);
    
    if(arrserver_koleksitema.length == 1 && cekIndekVal == -1){
        rest_koleksitema = JSON.stringify(arrserver_koleksitema);
    }else if(arrserver_koleksitema.length == 1 && cekIndekVal > -1){
        rest_koleksitema = ""
    }else{
        arrserver_koleksitema.splice(cekIndekVal,1); 
        rest_koleksitema = JSON.stringify(arrserver_koleksitema);
    }
    
    let arrTemaRendahGanjil = ["TEMA 1","TEMA 2","TEMA 3","TEMA 4"];
    let arrTemaRendahGenap = ["TEMA 5","TEMA 6","TEMA 7","TEMA 8"];
    let arrTemaTinggiGanjil = ["TEMA 1","TEMA 2","TEMA 3","TEMA 4","TEMA 5"];
    let arrTemaTinggiGenap = ["TEMA 6","TEMA 7","TEMA 8","TEMA 9"];
    let obj = {};
        obj.tinggi =  {"1":arrTemaTinggiGanjil,"2":arrTemaTinggiGenap};
        obj.rendah = {"1":arrTemaRendahGanjil, "2":arrTemaRendahGenap}
    let konftema;
    if(idJenjang > 3){
        konftema = obj.tinggi;
    }else{
        konftema = obj.rendah;
    }
    let rest_semester; 
    let arrCekKol = [];
    let arr_sem = []; 
    if(rest_koleksitema == ""){
        rest_semester = "";
    }else{
        arrCekKol = JSON.parse(rest_koleksitema);
        for(i = 0 ; i < arrCekKol.length ; i++){
            let namaTema = arrCekKol[i];
            let ceknamaTema = Object.keys(konftema).filter(s => konftema[s].indexOf(namaTema)>-1)[0];
            if(arr_sem.indexOf(ceknamaTema)==-1){
                arr_sem.push(ceknamaTema);
            }
        }
        rest_semester = JSON.stringify(arr_sem);

    }
    
    let objekjadikirim = Object.assign(objekserverkdsebelumnya, {"koleksitema":rest_koleksitema,"semester":rest_semester});
    let keyy = JSON.stringify(Object.keys(objekjadikirim));
    let tabel= JSON.stringify(Object.values(objekjadikirim));
    let datakirim = new FormData();
        datakirim.append("key",keyy);
        datakirim.append("idbaris",row);
        datakirim.append("tab","serverkd");
        datakirim.append("tabel",tabel);
    
    fetch(urladm+"?action=simpanbarisketabidbaris",{
            method:"post",
            body:datakirim
    }).then(m=>m.json())
    .then(r => {
        let result = r.data;
            alltagkdserver = r.data;
            tagkdserver = result.filter(s => s.kelas == idJenjang);
        let html="";
        let tabel = document.querySelector(".tbl_distribusi_kd");
        let tbody = tabel.getElementsByTagName("tbody")[0];
        
        if(idJenjang>3){
            html = htmldistribusikd_tematik(semester, "tinggi");
        }else{
            html = htmldistribusikd_tematik(semester, "rendah")
        }
        
        tbody.innerHTML = html;
        
        tooltipkd_config("tbl_distribusi_kd",semester)
        
        clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
            setTimeout(() => {
                divlod.style.width = "1px"
                divlod.className += " w3-hide";
    
            }, 3000);
        alert("Berhasil dihapus")
    })
    .catch(er => console.log(er))
        
    
}
function htmldistribusikd_tematik (semester, jjg){
    
    let arrTemaRendahGanjil = ["TEMA 1","TEMA 2","TEMA 3","TEMA 4"];
    let arrTemaRendahGenap = ["TEMA 5","TEMA 6","TEMA 7","TEMA 8"];
    let arrTemaTinggiGanjil = ["TEMA 1","TEMA 2","TEMA 3","TEMA 4","TEMA 5"];
    let arrTemaTinggiGenap = ["TEMA 6","TEMA 7","TEMA 8","TEMA 9"];
    let arrCodeMapelRendah = ["PKN","BINDO","MTK","SBDP","PJOK"];
    let arrCodeMapelTinggi = ["PKN","BINDO","IPA","IPS","SBDP"];
    let arrHeaderTinggi = ["PKN","Bahasa Indonesia","IPA","IPS","SBDP"]
    let arrHeaderRendah = ["PKN","Bahasa Indonesia","MATEMATIKA","SBDP","PJOK"];
    let longtd = 12;
    let fl;
    let html = "";

    let konftema;
    let konfmapel;
    let konfheader;
    if(semester == 1 && jjg == "tinggi"){
        konftema = arrTemaTinggiGanjil;
        konfmapel = arrCodeMapelTinggi;
        konfheader = arrHeaderTinggi
    }else if(semester == 2 && jjg == "tinggi"){
        konftema = arrTemaTinggiGenap;
        konfmapel = arrCodeMapelTinggi;
        konfheader = arrHeaderTinggi
    }else if(semester == 1 && jjg == "rendah"){
        konftema = arrTemaRendahGanjil
        konfmapel = arrCodeMapelRendah;
        konfheader = arrHeaderRendah
    }else if(semester == 2 && jjg == "rendah"){
        konftema = arrTemaRendahGenap
        konfmapel = arrCodeMapelRendah;
        konfheader = arrHeaderRendah
    }
    //loop per baris dulu
    let looptema, loopmapel, loopkd, tdgruplong;
    for(a=0 ; a < konftema.length ; a++){
        looptema = konftema[a];
            html +=`<tr><td>${looptema}</td>`;
            
            loopkd = tagkdserver.filter(s => s.mapel == konfmapel[0] && s["koleksitema"].indexOf(looptema)>-1).map(m => m.kd);
            if(loopkd.length>0){
                tdgruplong = 4
                for(b = 0 ; b < loopkd.length ; b++){
                    html +=`<td>${loopkd[b]}</td>`;
            
                    tdgruplong--;
                }
                if(tdgruplong !== 0){
                    for(c = 0 ; c < tdgruplong ; c++){
                        html +=`<td></td>`
                    }
                }

            
            }else{
                html +=`<td></td><td></td><td></td><td></td>`
            }   
            
            loopkd = tagkdserver.filter(s => s.mapel == konfmapel[1] && s["koleksitema"].indexOf(looptema)>-1).map(m => m.kd);
            if(loopkd.length>0){
                tdgruplong = 4
                for(b = 0 ; b < loopkd.length ; b++){
                    html +=`<td>${loopkd[b]}</td>`;
            
                    tdgruplong--;
                }
                if(tdgruplong !== 0){
                    for(c = 0 ; c < tdgruplong ; c++){
                        html +=`<td></td>`
                    }
                }

            
            }else{
                html +=`<td></td><td></td><td></td><td></td>`
            }
            
            loopkd = tagkdserver.filter(s => s.mapel == konfmapel[2] && s["koleksitema"].indexOf(looptema)>-1).map(m => m.kd);
            if(loopkd.length>0){
                tdgruplong = 4
                for(b = 0 ; b < loopkd.length ; b++){
                    html +=`<td>${loopkd[b]}</td>`;
            
                    tdgruplong--;
                }
                if(tdgruplong !== 0){
                    for(c = 0 ; c < tdgruplong ; c++){
                        html +=`<td></td>`
                    }
                }

            
            }else{
                html +=`<td></td><td></td><td></td><td></td>`
            }   

            loopkd = tagkdserver.filter(s => s.mapel == konfmapel[3] && s["koleksitema"].indexOf(looptema)>-1).map(m => m.kd);
            if(loopkd.length>0){
                tdgruplong = 4
                for(b = 0 ; b < loopkd.length ; b++){
                    html +=`<td>${loopkd[b]}</td>`;
            
                    tdgruplong--;
                }
                if(tdgruplong !== 0){
                    for(c = 0 ; c < tdgruplong ; c++){
                        html +=`<td></td>`
                    }
                }

            
            }else{
                html +=`<td></td><td></td><td></td><td></td>`
            }   

            loopkd = tagkdserver.filter(s => s.mapel == konfmapel[4] && s["koleksitema"].indexOf(looptema)>-1).map(m => m.kd);
            if(loopkd.length>0){
                tdgruplong = 4
                for(b = 0 ; b < loopkd.length ; b++){
                    html +=`<td>${loopkd[b]}</td>`;
            
                    tdgruplong--;
                }
                if(tdgruplong !== 0){
                    for(c = 0 ; c < tdgruplong ; c++){
                        html +=`<td></td>`
                    }
                }

            
            }else{
                html +=`<td></td><td></td><td></td><td></td>`
            }   

            html +=`</tr>`;
            
    }
    
    return html;
}
const tampilkandistribusidalam_tipekd = (ele) =>{
    let namatabel = document.getElementById("dist_replacekd");
    let bodytabel = namatabel.getElementsByTagName("tbody")[0];
    let divjudul = document.querySelector(".h_petakd1");//.innerHTML;
    let tipeKompetensi = (ele.value == "3" ? "PENGETAHUAN (KD-3)":"KETERAMPILAN (KD-4)");
    divjudul.innerHTML = "DISTRIBUSI KOMPETENSI "+tipeKompetensi;
    if(divjudul.innerHTML.indexOf("PADA")==-1){
        for(r = 0 ; r < bodytabel.rows.length ; r++){
            let lr = bodytabel.rows[r];
            for(c = 0 ; c < lr.cells.length ; c++){
                if(ele.value  == 4){
                    lr.cells[c].innerHTML = lr.cells[c].innerHTML.replace(/^(3\.)/g,"4.")
                    
                }else{
                    lr.cells[c].innerHTML = lr.cells[c].innerHTML.replace(/^(4\.)/g,"3.")
                    
                }
            }
        }
    }
}

//cek semester yang dipilih saat peta kd mapel berlangsung
const petakd_mapelormulok = document.getElementById("petakd_mapelormulok");
petakd_mapelormulok.addEventListener("change",()=>{
    //cek semester
    let dom = document.querySelectorAll("input[name=petakd_rd_semester]");
    let yy
    for(z = 0 ; z < dom.length ; z++){
        if(dom[z].checked){
            yy = dom[z].value;
        }
    }
    let dup = document.querySelectorAll(".result_hapus");
    dup.forEach(hp => hp.innerHTML="");
    
    let dbkd = gabungdataserverkd();
    let op = petakd_mapelormulok.options;
    let sel = op.selectedIndex;
    let v = op[sel].value
    let t = op[sel].text;
    let j = idJenjang;
    let x = document.querySelector("#switchpetakd_mapel").checked;
    
    if(v === "default"){
        return
    }
    if(j > 3){
        
    }else{
        if(v == "MTK"){
            alert("Mata pelajaran Matematika sudah ada di TEMA. Anda tidak bisa memilihnya.")
            return
        }else if(v == "PJOK"){
            alert("Mata pelajaran PJOK sudah ada di TEMA. Anda tidak bisa memilihnya.")
            return
        }
    }
    
    htmlpetakd_generate("tbl_distribusi_kd", v,x)
    //
    dragElement(document.getElementById("tooltipkdmapel"))
});
const switchpetakd_mapel = (el) =>{
    let dom = document.querySelectorAll("input[name=petakd_rd_semester]");
    let dup = document.querySelectorAll(".result_hapus");
    dup.forEach(hp => hp.innerHTML="");
    
    let x = el.checked;
    let dbkd = gabungdataserverkd();
    let op = petakd_mapelormulok.options;
    let sel = op.selectedIndex;
    let v = op[sel].value
    let t = op[sel].text;
    let j = idJenjang;
    if(v === "default"){
        return
    }
    if(j > 3){
        
    }else{
        if(v == "MTK"){
            alert("Mata pelajaran Matematika sudah ada di TEMA. Anda tidak bisa memilihnya.")
            return
        }else if(v == "PJOK"){
            alert("Mata pelajaran PJOK sudah ada di TEMA. Anda tidak bisa memilihnya.")
            return
        }
    }
    htmlpetakd_generate("tbl_distribusi_kd", v,x);
    
    dragElement(document.getElementById("tooltipkdmapel"))
}

const gabungdataserverkd =()=>{
    
    let newObjek = tagkdserver.map((item,i)=>Object.assign({},item,buateditorkdaktif[i]))
    //console.log(newObjek);
    return newObjek
}

let acuanRowServer
const tooltip_petakdmapel = (cl, mapel,bol) =>{
    let brs,kolo;
    let tabler = document.querySelector("."+ cl);
    let sumberdata = gabungdataserverkd();
    let key_nokd = bol?"kd3":"kd4";
    let key_tekskd = bol?"indikatorkd3":"indikatorkd4";
    let key_materi = bol?"materi3":"materi4";
    let key_indikator = bol?"indikator3":"indikator4";
    let key_jp = bol?"jp3":"jp4"
    // let key_materikd= bol?
    let tooltipspin = document.getElementById("loadingtooltipmapel")
    tooltipspin.style.display = "none";
    
    for(var i = 1; i < tabler.rows.length; i++){
        // row cells
        for(var j = 0; j < tabler.rows[i].cells.length; j++){
            let tmbl_kd = document.querySelector(".tempattooltipbtnkd");
            let tmbl_editor = document.querySelector(".tempattooltipeditor")
            let tmbl_jp = document.querySelector(".tempattooltipjp");
            
            
            tabler.rows[i].cells[j].onmouseover = function(){
            //let baris = this.parentElement.nodeName;
            brs = this.parentElement.rowIndex - 1;
            kolo = this.cellIndex +1;
            let tekstitle = "Klik baris " + brs +" kolom "+ kolo;
            this.setAttribute("title",tekstitle);
            };
            
            tabler.rows[i].cells[j].onmouseout = function(){
            this.removeAttribute("title")
            //console.log("onmouseout")
            // document.querySelector("#tooltiptabel").style.display="none"
            };
            tabler.rows[i].cells[j].onclick = function(){
                let tdfokus = this;
                let diklik = tdfokus.getAttribute("data-fokus");
                let ttop ;
                let lleft ;
                let llright;
                
                if(diklik == 0 ){
                    tmbl_kd.style.display = "none";
                    tmbl_editor.style.display = "none";
                    tmbl_jp.style.display = "none";
                    
                    ttop = (tabler.offsetTop + this.offsetTop  ) +"px";//this.offsetTop +"px";
                    lleft =  (tabler.offsetLeft+ this.offsetLeft + this.offsetWidth +10) +"px";
                    document.querySelector("#tooltipkdmapel").style.top=ttop;
                    document.querySelector("#tooltipkdmapel").style.left=lleft;
                    document.querySelector(".tooltiparahatas").style.display = "none";
                    document.querySelector(".tooltiparahkanan").style.display = "none";
                    document.querySelector(".tooltiparahkiri").style.display = "block";
                }else if(diklik == 1){
                    tmbl_kd.style.display = "none";
                    tmbl_editor.style.display = "block";
                    tmbl_jp.style.display = "none";

                    ttop = (tabler.offsetTop + this.offsetTop  ) +"px";//this.offsetTop +"px";
                    lleft =  (tabler.offsetLeft+ this.offsetLeft + this.offsetWidth +10) +"px";
                    document.querySelector("#tooltipkdmapel").style.top=ttop;
                    document.querySelector("#tooltipkdmapel").style.left=lleft;
                    document.querySelector(".tooltiparahatas").style.display = "none";
                    document.querySelector(".tooltiparahkanan").style.display = "none";
                    document.querySelector(".tooltiparahkiri").style.display = "block";
                }else if(diklik == 2){
                    tmbl_kd.style.display = "block";
                    tmbl_editor.style.display = "none";
                    tmbl_jp.style.display = "none";
                    ttop = (tabler.offsetTop + this.offsetTop+ 30) +"px";//this.offsetTop +"px";
                    lleft =  (tabler.offsetLeft+ this.offsetLeft + 10) +"px";
                    document.querySelector("#tooltipkdmapel").style.top=ttop;
                    document.querySelector("#tooltipkdmapel").style.left=lleft;
                    document.querySelector(".tooltiparahatas").style.display = "block";
                    document.querySelector(".tooltiparahkanan").style.display = "none";
                    document.querySelector(".tooltiparahkiri").style.display = "none";
                }else if(diklik == 3){
                    tmbl_kd.style.display = "none";
                    tmbl_editor.style.display = "block";
                    tmbl_jp.style.display = "none";
                    ttop = (tabler.offsetTop + this.offsetTop) +"px";//this.offsetTop +"px";
                    lleft =  (tabler.offsetLeft+ this.offsetLeft - 360) +"px";
                    document.querySelector("#tooltipkdmapel").style.top=ttop;
                    document.querySelector("#tooltipkdmapel").style.left=lleft;

                    document.querySelector(".tooltiparahkanan").style.display = "block";
                    document.querySelector(".tooltiparahatas").style.display = "none";
                    document.querySelector(".tooltiparahkiri").style.display = "none";
                }else{
                    tmbl_kd.style.display = "none";
                    tmbl_editor.style.display = "none";
                    tmbl_jp.style.display = "block";
                    ttop = (tabler.offsetTop + this.offsetTop) +"px";//this.offsetTop +"px";
                    lleft =  (tabler.offsetLeft+ this.offsetLeft - 360) +"px";
                    document.querySelector("#tooltipkdmapel").style.top=ttop;
                    document.querySelector("#tooltipkdmapel").style.left =lleft;
                    document.querySelector(".tooltiparahkanan").style.display = "block";
                    document.querySelector(".tooltiparahatas").style.display = "none";
                    document.querySelector(".tooltiparahkiri").style.display = "none";    
                }
                let rIndex = this.parentElement.rowIndex;
                let cIndex = this.cellIndex;//+1;
                let arrKDmapel = sumberdata.filter(s=>s.mapel == mapel && s[key_tekskd] !== "");//tagkdserver.filter(s => s.mapel==mapel);
                //tampilkan tooltip
                document.querySelector("#tooltipkdmapel").style.display="block";
                let fokuskolom = tdfokus.getAttribute("data-fokus")
                let fokuslm = tdfokus.getAttribute("data-col");
                let teksKolomLM = document.querySelectorAll("[data-col='"+ fokuslm +"']");
                let fokusbaris;
                let tooltiphapuskolom =document.querySelector(".tooltiphapuskolom");
                let tooltiptambahkolom =document.querySelector(".tooltiptambahkolom");
                let kirimtooltipeditor = document.querySelector(".kirimtooltipeditor");
                let kirimtooltipjam = document.querySelector(".kirimtooltipjam");
                let tooltiphapusruanglingkup = document.querySelector(".tooltiphapusruanglingkup")
                let inputjp = document.querySelector("#inputjp");
                let inputmateri = document.querySelector("#tooltipeditor");
                let val;
                let btn = document.querySelectorAll(".badge_mapel");
                //console.log(tagkd34);
                
                let barisserver;
                for(a = 0 ; a < btn.length ; a++){
                    //console.log(arrKDmapel)
                    let btnklik = btn[a];
                    btnklik.style.display ="none";
                    let info; let dataconsole
                    if(a < arrKDmapel.length){
                        btnklik.style.display ="inline-block";
                        if(arrKDmapel[a].koleksitema !== ""){
                            btnklik.className = btnklik.className.replace("w3-sand","w3-red")
                            info = "Sudah dikelompokkan ke Lingkup Materi " + JSON.parse(arrKDmapel[a].koleksitema)[0];
                            btnklik.innerHTML = "<s>" + arrKDmapel[a][key_nokd]+"</s>";
                            btnklik.disabled = true;
                        }else{
                            btnklik.className = btnklik.className.replace("w3-red","w3-sand")
                            btnklik.disabled = false;
                            btnklik.innerHTML =arrKDmapel[a][key_nokd];
                            info = arrKDmapel[a][key_tekskd];
                        }
                        //barisserver = arrKDmapel[a].row;
                        dataconsole = arrKDmapel[a];
                    }
                    btnklik.onmouseover = function(){
                            this.setAttribute("title",info);
                    }
                    btnklik.onmouseout = function(){
                        this.removeAttribute("title")
                    }
                    btnklik.onclick = function(){
                        //let fokuskolom = tdfokus.getAttribute("data-fokus")
                        if(fokuskolom==2){
                            if(tdfokus.innerHTML!==""){
                                alert("Fitur ini hanya berfungsi ketika Kolom Kompetensi Dasar belum terisi (kosong). Jika Anda tidak membutuhkan KD ini, sebaiknya Anda hapus kolom.\n\n Tambah kolom untuk membuat KD baru di Lingkup Materi ini.");
                                return
                            }
                            tdfokus.innerHTML = dataconsole[key_nokd]+" "+dataconsole[key_tekskd];
                            val = teksKolomLM[0].innerHTML;
                            barisserver = dataconsole.row;
                            update_dataserverpetakdmapel(cl, mapel,bol, barisserver, val,fokuskolom,0)
                        }else{
                            alert("KD hanya untuk kolom KD");
                        }
                    }

                }
                tooltiphapuskolom.onclick = function (){
                    if(fokuskolom==0){
                        alert("Maaf, untuk menghapus Lingkup Materi, gunakan tombol Lingkup Materi.")
                    }else{
                        let konf;// = confirm("Anda yakin ingin menghapus kolom ini?");
                        let datayangdihapus = tdfokus.innerHTML;
                        let indeknol= tdfokus.getAttribute("data-indek");
                        
                        
                        if(fokuskolom == 1 || fokuskolom == 2){
                            konf = confirm("Anda yakin ingin menghapus kolom ini? Semua data yang sudah tersimpan baik KD3 maupun KD4 untuk Lingkup Materi ini akan terhapus semua dari server.");
                            if(!konf){
                                return
                            }
                            // dihapus semua LM di KD ini;
                        }else if(fokuskolom == 3||fokuskolom == 4){
                            konf = confirm("Anda yakin ingin menghapus kolom ini? Anda masih bisa mengedit ini dengan menu pilihan tooltip yang telah disediakan.");
                            if(!konf){
                                return
                            }
                            
                        }
                        let cekcol = tdfokus.getAttribute("data-col");
                        let cekbaris = tdfokus.getAttribute("data-baris")
                        let cekparam =  `[data-col="${cekcol}"][data-fokus="2"][data-baris="${cekbaris}"]`;
                        let cekarrind =  `[data-col="${cekcol}"][data-fokus="${fokuskolom}"][data-baris="${cekbaris}"][data-indek]`;
                        let cektunggal = document.querySelector(cekparam);
                        let cekIndik = document.querySelectorAll(cekarrind);
                        let prs = cektunggal.innerHTML;
                        if(prs == ""){
                            alert("Isikan terlebih dahulu KD-nya");
                            return
                        }
                        let mprs = prs.match(/^([34]\.\d+)/g);
                        let barisserver = arrKDmapel.filter(s=> s[key_nokd] == mprs)[0].row;
                        
                        let pushindik=[];
                        for(k = 0 ; k < cekIndik.length ; k++){
                            let dt = cekIndik[k].innerHTML;
                            if(fokuskolom==4){
                                let psJP = dt.replace(" JP.","");
                                pushindik.push(psJP);

                            }else{
                                pushindik.push(dt);
                            }

                        }
                        
                        let posisidihapus = pushindik.indexOf(datayangdihapus);
                        console.log(posisidihapus);
                        if(indeknol == 0){
                            pushindik.splice(posisidihapus, 1,"");
                            tdfokus.innerHTML="";
                        }else{
                            pushindik.splice(posisidihapus, 1);
                            
                        }
                        
                        val = JSON.stringify(pushindik);
                        let idx = posisidihapus;
                        update_hapusdataserver(cl, mapel,bol, barisserver, val,fokuskolom,idx)
                       // tooltip_petakdmapel(cl, mapel,bol);
                    }
                    document.getElementById('tooltipkdmapel').style.display='none';
                }
                tooltiptambahkolom.onclick = function (){
                    if(fokuskolom == 0){ // ketika mengeklik kolom Lingkup Materi
                        alert("Maaf, Anda tidak bisa menambahkan satu baris lagi. Anda hanya bisa menghapusnya satu baris ini.")
                    }else if(fokuskolom == 1 || fokuskolom ==2 ){//KD atau materi
                        //menentukan indexRow berdasarkan rIndex dan jumlah Span;
                        let fbrs = new Date().getMilliseconds()+1;//tdfokus.getAttribute("data-baris")
                        let rws,x
                        if(tdfokus.hasAttribute("rowspan")){
                            rws = tdfokus.getAttribute("rowspan")
                        }else{
                            rws = 1
                        }
                        x = (parseInt(rws) + parseInt(rIndex));//
                        //kedua, carikan element dengan data-col=fokuslm yang index-nya pertama
                        let tdrowspan = document.querySelectorAll(`[data-col="${fokuslm}"]`);
                        let llm = tdrowspan[0].innerHTML;
                        let rwsBefore 
                        if(tdrowspan[0].hasAttribute("rowspan")){
                            rwsBefore = tdrowspan[0].getAttribute("rowspan");
                        }else{
                            rwsBefore = 1
                        }
                        let z = (parseInt(rwsBefore) + 1)
                        tdrowspan[0].setAttribute("rowspan",z);
                        let findex = new Date().getMilliseconds()+2;
                        let g = tabler.insertRow(x);//rIndex
                        let h = g.insertCell(-1);
                        h.setAttribute("data-col",fokuslm);
                        h.setAttribute("data-fokus","1");
                        h.setAttribute("data-baris",fbrs);
                        h = g.insertCell(-1);
                        h.setAttribute("data-col",fokuslm);
                        h.setAttribute("data-fokus","2");
                        h.setAttribute("data-baris",fbrs);
                        h = g.insertCell(-1);
                        h.setAttribute("data-col",fokuslm);
                        h.setAttribute("data-fokus","3");
                        h.setAttribute("data-baris",fbrs);
                        h.setAttribute("data-indek",findex);
                        h = g.insertCell(-1);
                        h.setAttribute("data-col",fokuslm);
                        h.setAttribute("data-fokus","4");
                        h.setAttribute("data-baris",fbrs);
                        h.setAttribute("data-indek",findex);
                    }else if(fokuskolom == 3 || fokuskolom == 4){
                        let tdrowspan = document.querySelectorAll(`[data-col="${fokuslm}"]`);
                        let llm = tdrowspan[0].innerHTML;
                        let rwsBefore 
                        if(tdrowspan[0].hasAttribute("rowspan")){
                            rwsBefore = tdrowspan[0].getAttribute("rowspan");
                        }else{
                            rwsBefore = 1
                        }
                        let z = (parseInt(rwsBefore) + 1)
                        tdrowspan[0].setAttribute("rowspan",z);
                        //
                        let rowspankdmateri;
                        let eldomtd=[]; 
                        
                        let kodebaris = tdfokus.getAttribute("data-baris");
                        let param = `[data-baris="${kodebaris}"]`;
                        tdrowspan = document.querySelectorAll(`[data-col="${fokuslm}"]${param}`);
                        for(l = 0 ; l < tdrowspan.length; l++){
                            if(tdrowspan[l].hasAttribute("rowspan")){
                                    rowspankdmateri = tdrowspan[l].getAttribute("rowspan");
                                    let c = parseInt(rowspankdmateri)+1
                                    if(!tdrowspan[l].hasAttribute("data-indek")){
                                        tdrowspan[l].setAttribute("rowspan",c)
                                    }else{
                                        let d = l-1;
                                        

                                        eldomtd.push(d);
                                    }
                            }else{
                                    if(!tdrowspan[l].hasAttribute("data-indek")){
                                        tdrowspan[l].setAttribute("rowspan",2)
                                    }else{
                                        let d = l-1;
                                        
                                        eldomtd.push(d);
                                    }   
                                    
                            }
                        }
                        let tx = eldomtd.length/2
                        let xyz = parseInt(rIndex)+1
                        let g = tabler.insertRow(xyz);//rIndex
                        let h = g.insertCell(-1);
                        let dtbrs = tdfokus.getAttribute("data-baris");
                        h.setAttribute("data-col",fokuslm);
                        h.setAttribute("data-fokus","3");
                        h.setAttribute("data-baris",dtbrs);
                        h.setAttribute("data-indek",tx);
                        h = g.insertCell(-1);
                        
                        h.setAttribute("data-col",fokuslm);
                        h.setAttribute("data-fokus","4");
                        h.setAttribute("data-baris",dtbrs);
                        h.setAttribute("data-indek",tx);
                        /// format dibuatkan dulu untuk menentukan urutan arraynya, kemudian kirim ke server sebagai data array;
                        //cek barisserver dulu:
                        // let cekcol = tdfokus.getAttribute("data-col");
                        // let cekbaris = tdfokus.getAttribute("data-baris")
                        
                       

                   // update_dataserverpetakdmapel(cl, mapel,bol, barisserver, "",fokuskolom,idx)
                        // selesai tes
                    }
                    tooltip_petakdmapel(cl, mapel,bol);
                    document.getElementById('tooltipkdmapel').style.display='none';
                }
                kirimtooltipeditor.onclick = function (){
                    let cekcol = tdfokus.getAttribute("data-col");
                    let cekbaris = tdfokus.getAttribute("data-baris")
                    let cekparam =  `[data-col="${cekcol}"][data-fokus="2"][data-baris="${cekbaris}"]`;
                    let cektunggal = document.querySelector(cekparam);
                    let prs = cektunggal.innerHTML;
                    if(prs == ""){
                        alert("Isikan terlebih dahulu KD-nya");
                        return
                    }
                    let mprs = prs.match(/^([34]\.\d+)/g);
                    let barisserver = arrKDmapel.filter(s=> s[key_nokd] == mprs)[0].row;
                    let idx;
                    tdfokus.innerHTML = inputmateri.innerHTML;
                    let indekfokus;
                    if(fokuskolom == 1){
                        idx = 0
                        val = inputmateri.innerHTML;
                    } else{
                        idx= tdfokus.getAttribute("data-index");
                        let ps = [];
                        let elcari = document.querySelectorAll(`[data-col="${cekcol}"][data-fokus="3"][data-baris="${cekbaris}"][data-indek]`);
                        for(r = 0 ; r < elcari.length ; r++){
                            if(elcari[r].innerHTML == tdfokus.innerHTML){
                                indekfokus = r;
                            }
                            ps.push(elcari[r].innerHTML)
                        }
                        val = JSON.stringify(ps);
                    }
                    
                    update_dataserverpetakdmapel(cl, mapel,bol, barisserver, val,fokuskolom,indekfokus)

                }
                kirimtooltipjam.onclick = function (){
                    tdfokus.innerHTML = inputjp.value +" JP.";
                    
                    let cekcol = tdfokus.getAttribute("data-col");
                    let cekbaris = tdfokus.getAttribute("data-baris")
                    let cekparam =  `[data-col="${cekcol}"][data-fokus="2"][data-baris="${cekbaris}"]`;
                    let cektunggal = document.querySelector(cekparam);
                    let prs = cektunggal.innerHTML;
                    if(prs == ""){
                        alert("Isikan terlebih dahulu KD-nya");
                        return
                    }
                    let mprs = prs.match(/^([34]\.\d+)/g);
                    let barisserver = arrKDmapel.filter(s=> s[key_nokd] == mprs)[0].row;
                    let ps = [];
                    let indekfokus
                        let elcari = document.querySelectorAll(`[data-col="${cekcol}"][data-fokus="4"][data-baris="${cekbaris}"][data-indek]`);
                        for(r = 0 ; r < elcari.length ; r++){
                            ps.push(elcari[r].innerHTML.replace(" JP.",""))
                            if(elcari[r].innerHTML == tdfokus.innerHTML){
                                indekfokus = r;
                            }
                        }
                        val = JSON.stringify(ps);
                        update_dataserverpetakdmapel(cl, mapel,bol, barisserver, val,fokuskolom,indekfokus);
                       
                }
                tooltiphapusruanglingkup.onclick = function (){
                    alert("Anda tidak dapat menghapus Ruang Lingkup Materi. Lingkup materi ini disesuaikan untuk keperluan penyusunan Test Blue Print Ujian sekolah.")
                }
            }
        }
    }
    // document.getElementById('tooltipkdmapel').style.display='none';
};
const update_dataserverpetakdmapel = (cl, mapel,bol,row, val,fokus,indek)=>{
    let tooltipspin = document.getElementById("loadingtooltipmapel")
    tooltipspin.style.display ="block";
    let dom = document.querySelectorAll("input[name=petakd_rd_semester]");
    let smstr
    for(z = 0 ; z < dom.length ; z++){
        if(dom[z].checked){
            smstr= dom[z].value;
        }
    }
    let dbAsal = tagkdserver.filter(s=>s.mapel == mapel && s.row == row)[0];//object
    let key_fokus=[0,1,2,3,4];
    let key_keyHeader = bol?["koleksitema","indikator3","materi3","jp3"]:["koleksitema","indikator4","materi4","jp4"];
    let key_keyHeader2 = bol?["koleksitema","indikator4","materi4","jp4"]:["koleksitema","indikator3","materi3","jp3"];

    let objKirim = {};
    let pushkoleksitema=[];
    let pushsemester=[];
    let pushindikator3 = [];
    let pushindikator4 = [];
    let pushmateri3 = [];
    let pushmateri4 = [];
    let pushjp3 = [];
    let pushjp4 = [];
    /* 
    0 => fokus untuk Lingkup Materi, biasanya gigunakan untuk menghapus seluruh info KD yang diisi di baris server ini
    1 => fokus untuk mengisi/mengedit Materi
    2 => fokus untuk mengisi KD
    3 => fokus untuk mengisi array indikator
    4 => fokus untuk mengisi array Jam tayang
    */
    // console.log(cl)
    // console.log(mapel)
    // console.log(bol)
    //   console.log(row)
    //  console.log(dbAsal)
    // console.log(val)
    // console.log(fokus)
    // console.log("dbAsal:")
    
    //variable untuk mengecek isian array
    let dif_indikator3 ;
    let dif_indikator4 ;
    let dif_materi3;
    let dif_materi4;
    let dif_jp3;
    let dif_jp4;
    
    
    // console.log(dbAsal)
    if(fokus == 1){
        let dif_materi = val;
        //console.log(dif_materi);
        objKirim[key_keyHeader[2]] = dif_materi;
        

    }else if(fokus == 2){
        /// jika ingin mengisi/mengubah KD, maka pada baris ini akan hilang!
        pushkoleksitema.push(val);
        pushsemester.push(smstr);
        objKirim.semester = JSON.stringify(pushsemester);
        objKirim.koleksitema = JSON.stringify(pushkoleksitema);
        objKirim.materi3 = "";
        objKirim.materi4 = "";
        objKirim.indikator3 = JSON.stringify([""]);
        objKirim.indikator4 = JSON.stringify([""]);
        objKirim.jp3 = JSON.stringify([""]);
        objKirim.jp4 = JSON.stringify([""]);
    }else if(fokus == 3){
        objKirim[key_keyHeader[1]]=val;
        let jpsebelumnya =dbAsal[key_keyHeader[3]];
        // console.log("jpsebelumnya")
        // console.log(jpsebelumnya)
        // console.log("indek");
        // console.log(indek);
        let prsf = JSON.parse(val);
        let ajp = []
        let prs = JSON.parse(jpsebelumnya);
        // console.log("prs");
        // console.log(prs);
        if(prsf.length == prs.length){
            ajp = prs;
            
        }else{
            prs.splice(indek,0,"");
            ajp = prs

        }
        // console.log(ajp);
        objKirim[key_keyHeader[3]] = JSON.stringify(ajp);
        //cek kd JP
        // let inversindik = dbAsal[key_keyHeader[3]];
        // let lawan
        // // nyari lawan KD ternyata ga pengaruh
        // // if(inversindik == ""){
        // //     let des = JSON.parse(val);
        // //     let arinv = []
        // //     for(i = 0 ; i < des.length;i++){
        // //         arinv.push("")
        // //     }
        // //     lawan = JSON.stringify(arinv)
        // // }else{
        // //     lawan = inversindik;
        // // }
        // objKirim[key_keyHeader[3]]=lawan;
        // //objKirim[key_keyHeader[1]]=val;
    }else {
        objKirim[key_keyHeader[3]] = val;
        let jpsebelumnya =dbAsal[key_keyHeader[1]];
        // console.log("jpsebelumnya")
        // console.log(jpsebelumnya)
        // console.log("indek");
        // console.log(indek);
        let prsf = JSON.parse(val);
        let ajp = []
        let prs = JSON.parse(jpsebelumnya);
        // console.log("prs");
        // console.log(prs);
        if(prsf.length == prs.length){
            ajp = prs;
            
        }else{
            prs.splice(indek,0,"");
            ajp = prs

        }
        // console.log(ajp);
        objKirim[key_keyHeader[1]] = JSON.stringify(ajp);

        // let inversindik = dbAsal[key_keyHeader2[3]];
        // let lawan
        // if(inversindik == ""){
        //     let des = JSON.parse(val);
        //     let arinv = []
        //     for(i = 0 ; i < des.length;i++){
        //         arinv.push("")
        //     }
        //     lawan = JSON.stringify(arinv)
        // }else{
        //     lawan = inversindik;
        // }
        // objKirim[key_keyHeader2[3]] = lawan;
    }
    //console.log(objKirim);
     let objekjadikirim = Object.assign(dbAsal,objKirim);
     //console.log(objekjadikirim);
    let keyy = JSON.stringify(Object.keys(objekjadikirim));
    ///idbaris = row;
    let tabel= JSON.stringify(Object.values(objekjadikirim))
    
    let datakirim = new FormData();
    datakirim.append("key",keyy);
    datakirim.append("idbaris",row);
    datakirim.append("tab","serverkd");
    datakirim.append("tabel",tabel);
    //datakirim.append("tipe",tipe);
    fetch(urladm+"?action=simpanbarisketabidbaris",{
        method:"post",
        body:datakirim
    }).then(m=>m.json())
    .then(r => {
        let result = r.data;
        alltagkdserver = result;
        tagkdserver = result.filter(s => s.kelas == idJenjang);
        // console.log("distribusi  kd berhasil tersimpan");
        tooltipspin.style.display = "none";
        
        htmlpetakd_generate(cl, mapel,bol,row);
        document.getElementById('tooltipkdmapel').style.display='none';
        //tooltip_petakdmapel(cl, mapel,bol,row)
    })
    .catch(er => console.log(er))

};
const update_hapusdataserver = (cl, mapel,bol,row, val,fokus,indek) =>{
    let tooltipspin = document.getElementById("loadingtooltipmapel")
    tooltipspin.style.display ="block";
    let dom = document.querySelectorAll("input[name=petakd_rd_semester]");
    let smstr
    for(z = 0 ; z < dom.length ; z++){
        if(dom[z].checked){
            smstr= dom[z].value;
        }
    }
    let dbAsal = tagkdserver.filter(s=>s.mapel == mapel && s.row == row)[0];//object
    let key_fokus=[0,1,2,3,4];
    let key_keyHeader = bol?["koleksitema","indikator3","materi3","jp3"]:["koleksitema","indikator4","materi4","jp4"];
    let key_keyHeader2 = bol?["koleksitema","indikator4","materi4","jp4"]:["koleksitema","indikator3","materi3","jp3"];

    let objKirim = {};
    let pushkoleksitema=[];
    let pushsemester=[];
    let pushindikator3 = [];
    let pushindikator4 = [];
    let pushmateri3 = [];
    let pushmateri4 = [];
    let pushjp3 = [];
    let pushjp4 = [];
    /* 
    0 => fokus untuk Lingkup Materi, biasanya gigunakan untuk menghapus seluruh info KD yang diisi di baris server ini
    1 => fokus untuk mengisi/mengedit Materi
    2 => fokus untuk mengisi KD
    3 => fokus untuk mengisi array indikator
    4 => fokus untuk mengisi array Jam tayang
    */
    // console.log(cl)
    // console.log(mapel)
    // console.log(bol)
    //   console.log(row)
    //  console.log(dbAsal)
    // console.log(val)
    // console.log(fokus)
    // console.log("dbAsal:")
    
    //variable untuk mengecek isian array
    let dif_indikator3 ;
    let dif_indikator4 ;
    let dif_materi3;
    let dif_materi4;
    let dif_jp3;
    let dif_jp4;
    
    
    // console.log(dbAsal)
    if(fokus == 1|| fokus == 2){
        /// jika ingin mengisi/mengubah KD, maka pada baris ini akan hilang!
        // pushkoleksitema.push(val);
        // pushsemester.push(smstr);
        objKirim.semester = "";//JSON.stringify(pushsemester);
        objKirim.koleksitema = "";//JSON.stringify(pushkoleksitema);
        objKirim.materi3 = "";
        objKirim.materi4 = "";
        objKirim.indikator3 = "";//JSON.stringify([""]);
        objKirim.indikator4 = "";//JSON.stringify([""]);
        objKirim.jp3 = "";//JSON.stringify([""]);
        objKirim.jp4 = "";//JSON.stringify([""]);
    }else if(fokus == 3|| fokus==4){
        objKirim[key_keyHeader[1]]=val;
        //cek kd sebaliknya:
        let inversindik = dbAsal[key_keyHeader2[1]];
        let lawan
        if(inversindik == ""){
            let des = JSON.parse(val);
            let arinv = []
            for(i = 0 ; i < des.length;i++){
                arinv.push("")
            }
            lawan = JSON.stringify(arinv)
        }else{
            lawan = inversindik;
        }
        objKirim[key_keyHeader2[1]]=lawan;
        objKirim[key_keyHeader[1]]=val;
    }else {
        alert("Anda menghapus Lingkup Materi");
        tooltipspin.style.display = "none";
        return
    }
    // console.log(objKirim);
     let objekjadikirim = Object.assign(dbAsal,objKirim);
    //  console.log(objekjadikirim);
    let keyy = JSON.stringify(Object.keys(objekjadikirim));
    //idbaris = row;
    let tabel= JSON.stringify(Object.values(objekjadikirim))
    
    let datakirim = new FormData();
    datakirim.append("key",keyy);
    datakirim.append("idbaris",row);
    datakirim.append("tab","serverkd");
    datakirim.append("tabel",tabel);
    ////datakirim.append("tipe",tipe);
    fetch(urladm+"?action=simpanbarisketabidbaris",{
        method:"post",
        body:datakirim
    }).then(m=>m.json())
    .then(r => {
        let result = r.data;
        alltagkdserver = r.data;
        tagkdserver = result.filter(s => s.kelas == idJenjang);
        htmlpetakd_generate(cl, mapel,bol,row);
        // console.log("distribusi  kd berhasil tersimpan");
        tooltipspin.style.display = "none";
        
        document.getElementById('tooltipkdmapel').style.display='none';
        
    })
    .catch(er => console.log(er))
}
const htmlpetakd_generate = (cl, mapel,bol,row) =>{
    let dom = document.querySelectorAll("input[name=petakd_rd_semester]");
    let yy
    for(z = 0 ; z < dom.length ; z++){
        if(dom[z].checked){
            yy = dom[z].value;
        }
    }
    
    let domm = document.querySelector("#switchpetakd_mapel")
    let x = domm.checked; ///true untuk KD3
    for(y = 0 ; y <dom.length ; y++){
        if(dom[y].checked){
            yy = dom[y].value;
        }
    }
    let key_indikator = x?"indikator3":"indikator4";
    let key_indikatorkd = x?"indikatorkd3":"indikatorkd4";
    let key_jp = x?"jp3":"jp4";
    let key_materi = x?"materi3":"materi4";
    let key_kd =x?"kd3":"kd4";

    let dbkd = gabungdataserverkd();
    let op = petakd_mapelormulok.options;
    let sel = op.selectedIndex;
    let v = op[sel].value
    let t = op[sel].text;
    let j = idJenjang;
    let tbl = document.getElementById("dist_replacekd")
    let tbdy = tbl.getElementsByTagName("tbody")[0];
    
    let dbMP = dbkd.filter(s=> s.mapel == v && s["semester"].indexOf(yy)>-1);
    //console.log(dbMP);
    let dbLM = LingkupMateri[v];
    let html="";
    let LM;

        document.querySelector(".h_petakd1").innerHTML = x?"DISTRIBUSI KOMPETENSI PENGETAHUAN (KD-3)<br>MATA PELAJARAN " + t.toUpperCase():"DISTRIBUSI KOMPETENSI KETERAMPILAN (KD-4)<br>MATA PELAJARAN " + t.toUpperCase();;
        document.querySelector("#ketswitchpetakd_mapel").innerHTML = x?"Kompetensi Pengetahuan (KD-3)": "Kompetensi Pengetahuan (KD-3)";

        for(a = 0  ; a < dbLM.length; a++){
            LM = dbLM[a];
            // console.log("LM");
            // console.log(LM);
            
            
            let dbKT = dbMP.filter(s => s.koleksitema.indexOf(LM)>-1)
            if(dbKT.length > 0){
                
                let brs = dbKT.map(m => JSON.parse(m[key_indikator])).reduce((a,b)=>a.concat(b));//
                
                
                let brsTotal = brs.length;//integer
                let brsperKD = dbKT.map(m => JSON.parse(m[key_indikator]).length);//array [1,2]
                    // console.log("brsperKD")
                    // console.log(brsperKD);
                let indik = dbKT.map(m => JSON.parse(m[key_indikator]));
                let jp = dbKT.map(m=>JSON.parse(m[key_jp]))
               
                for(b = 0 ; b < dbKT.length ; b++){
                    // console.log("brsperKD[b]")
                    // console.log(brsperKD[b]);

                    if(b == 0 && brsperKD.length==1){
                        html +=`<tr><td data-col="${a}" data-fokus="0">${LM}</td>`;
                    }else if(b == 0 && brsperKD.length>1){
                        html +=`<tr><td rowspan="${brsTotal}" data-col="${a}" data-fokus="0">${LM}</td>`;
                    }
                    if(brsperKD[b]==1){
                        
                        html +=`<td  data-col="${a}" data-fokus="1" data-baris="${b}">${dbKT[b][key_materi]}</td>`;//materi
                        html +=`<td data-col="${a}" data-fokus="2" data-baris="${b}">${dbKT[b][key_kd]} ${dbKT[b][key_indikatorkd]}</td>`;//kd
                        
                        html +=`<td  data-col="${a}" data-fokus="3" data-baris="${b}" data-indek="0">${indik[b][0]}</td>`;//materi
                        let gara2jp2 = jp[b][0] == ""?"":jp[b][0] +" JP.";
                        html +=`<td  data-col="${a}" data-fokus="4" data-baris="${b}" data-indek="0">${gara2jp2}</td></tr>`;//materi
                        
                        
                        
                    }else{
                        html +=`<td rowspan="${brsperKD[b]}" data-col="${a}" data-fokus="1" data-baris="${b}">${dbKT[b][key_materi]}</td>`;//materi
                        html +=`<td rowspan="${brsperKD[b]}" data-col="${a}" data-fokus="2" data-baris="${b}">${dbKT[b][key_kd]} ${dbKT[b][key_indikatorkd]}</td>`;//kd
                        for(c=0 ; c < indik[b].length ; c++){
                            if(c==0){
                                html +=`<td  data-col="${a}" data-fokus="3" data-baris="${b}" data-indek="0">${indik[b][0]}</td>`;
                                let gara2jp = jp[b][0] == ""?"":jp[b][0] +" JP.";
                                html +=`<td  data-col="${a}" data-fokus="4" data-baris="${b}" data-indek="0">${gara2jp}</td></tr>`;
                            }else{
                                
                                html +=`<tr><td  data-col="${a}" data-fokus="3" data-baris="${b}" data-indek="${c}">${indik[b][c]}</td>`;
                                let garagarajp = jp[b][c] == ""?"":jp[b][c] +" JP.";
                                html +=`<td  data-col="${a}" data-fokus="4" data-baris="${b}" data-indek="${c}">${garagarajp}</td></tr>`;
                            }
                        }
                    }
                    //
                }
            }else{
                html +=`<tr><td data-col="${a}" data-fokus="0">${LM}</td><td data-col="${a}" data-fokus="1" data-baris="0"></td><td data-col="${a}" data-fokus="2" data-baris="0"></td><td data-col="${a}" data-fokus="3" data-baris="0" data-indek="0"></td><td data-col="${a}" data-fokus="4" data-baris="0" data-indek="0"></td></tr>`;
            }
        }
        tbdy.innerHTML = html;
        tooltip_petakdmapel(cl, mapel,bol,row);
        let btnserver = document.querySelector(".btnserver_petakd_distribusi");
        let judulserver = "PEMETAAN KD MAPEL "+ mapel;
        btnserver.setAttribute("onclick",`serveradm('prt_petakd_distribusi','${judulserver}',6,1)`);
}

const select_sebarankdpertema = document.querySelector(".select_sebarankdpertema");
const ckbox_sebarankdpertema = document.querySelector("#checkboxkd_sebarankdpertema");
select_sebarankdpertema.addEventListener("change",()=>{
    let opsi = select_sebarankdpertema.options;
    let indSel = opsi.selectedIndex;
    let v = opsi[indSel].value;
    let t = opsi[indSel].text;
    let u = indSel - 1;
    if(v =="default"){
        return
    }
    let w = v.match(/(\d+)/)[0];
    let x = "Tema "+w;
    let j = idJenjang;
    let bolkd = ckbox_sebarankdpertema.checked; 
    let tcaps_kd = bolkd?"PENGETAHUAN (KD-3)":"KETERAMPILAN (KD-4)";
    let sms = bolkd?2:1;
    let TinggiTemaRendahGanjil = ["TEMA 1","TEMA 2","TEMA 3","TEMA 4"];
    let TinggiTemaRendahGenap = ["TEMA 5","TEMA 6","TEMA 7","TEMA 8"];
    let arrTemaTinggiGanjil = ["TEMA 1","TEMA 2","TEMA 3","TEMA 4","TEMA 5"];
    let arrTemaTinggiGenap = ["TEMA 6","TEMA 7","TEMA 8","TEMA 9"];
    let arrCodeMapelRendah = ["PKN","BINDO","MTK","SBDP","PJOK"];
    let arrCodeMapelTinggi = ["PKN","BINDO","IPA","IPS","SBDP"];
    let arrHeaderTinggi = ["PKN","Bahasa Indonesia","IPA","IPS","SBDP"]
    let arrHeaderRendah = ["PKN","Bahasa Indonesia","MATEMATIKA","SBDP","PJOK"];
    let koleksiTema, koleksiCodeMP, koleksiHeader
    let idTema = DataKDKurtilas["kelas"+j];
    let dB = gabungdataserverkd();
    

    //DOM
    let sembunyikan = document.querySelectorAll(".kelastinggirendah_sebarankdpertema");
    let h1_sebarankdpertema = document.querySelector(".h1_sebarankdpertema");
    let h2_sebarankdpertema = document.querySelector(".h2_sebarankdpertema");
    let namasekolah_sebarankdpertema = document.querySelector(".namasekolah_sebarankdpertema");
    let namakelas_sebarankdpertema = document.querySelector(".namakelas_sebarankdpertema");
    let tapel_sebarankdpertema = document.querySelector(".tapel_sebarankdpertema");
    let semester_sebarankdpertema = document.querySelector(".semester_sebarankdpertema");
    let kurikulum_sebarankdpertema = document.querySelector(".kurikulum_sebarankdpertema");
    let subtema1_sebarankdpertema = document.querySelector(".subtema1_sebarankdpertema");
    let subtema2_sebarankdpertema = document.querySelector(".subtema2_sebarankdpertema");
    let subtema3_sebarankdpertema = document.querySelector(".subtema3_sebarankdpertema");
    let subtema4_sebarankdpertema = document.querySelector(".subtema4_sebarankdpertema");
    
    let ttdnamasekolah_sebarankdpertema = document.querySelector(".ttdnamasekolah_sebarankdpertema");
    let ttdnamakepsek_sebarankdpertema = document.querySelector(".ttdnamakepsek_sebarankdpertema");
    let ttdnipkepsek_sebarankdpertema = document.querySelector(".nipkepsek_sebarankdpertema");
    let titimangsa_sebarankdpertema = document.querySelector(".titimangsa_sebarankdpertema");
    let gmpkelas_sebarankdpertema = document.querySelector(".gmpkelas_sebarankdpertema");
    let kelasnya_sebarankdpertema = document.querySelector(".kelasnya_sebarankdpertema");
    let namaguru_sebarankdpertema = document.querySelector(".namaguru_sebarankdpertema");
    let nipguru_sebarankdpertema = document.querySelector(".nipguru_sebarankdpertema");
    
    if(idJenjang > 3){
        sembunyikan.forEach(el => el.style.display="none");
        // koleksiCodeMP = arrCodeMapelTinggi;
        // koleksiHeader = arrHeaderTinggi;
    }else{
        subtema4_sebarankdpertema.innerHTML = idTema[u]["Subtema 4"];
        // koleksiCodeMP = arrCodeMapelRendah;
        // koleksiHeader = arrHeaderRendah;
    }
    let ttdTersimpan =document.querySelectorAll(".result_hapus");
    ttdTersimpan.forEach(ed => ed.innerHTML = "");

    h1_sebarankdpertema.innerHTML = "PEMETAAN KOMPETENSI DASAR "+tcaps_kd+" PER SUBTEMA DAN PER PEMBELAJARAN";
    h2_sebarankdpertema.innerHTML = t +": " + idTema[u][x].toUpperCase();
    namasekolah_sebarankdpertema.innerHTML = idNamaSekolah.toUpperCase();
    namakelas_sebarankdpertema.innerHTML = idgurumapelmapel;
    tapel_sebarankdpertema.innerHTML = idTeksTapel;
    semester_sebarankdpertema.innerHTML = detectSemesterBerdasarkan("tema",x);
    subtema1_sebarankdpertema.innerHTML = idTema[u]["Subtema 1"];
    subtema2_sebarankdpertema.innerHTML = idTema[u]["Subtema 2"];
    subtema3_sebarankdpertema.innerHTML = idTema[u]["Subtema 3"];
    ttdnamasekolah_sebarankdpertema.innerHTML = idNamaSekolah;
    ttdnamakepsek_sebarankdpertema.innerHTML = idNamaKepsek;
    ttdnipkepsek_sebarankdpertema.innerHTML = "NIP. "+idNipKepsek;
    titimangsa_sebarankdpertema.innerHTML = tanggalfull(new Date());
    gmpkelas_sebarankdpertema.innerHTML = idJenisGuru +" " + idgurumapelmapel;
    namaguru_sebarankdpertema.innerHTML = namauser;
    nipguru_sebarankdpertema.innerHTML = idNipGuruKelas==""?"-":"NIP. "+idNipGuruKelas;
    ttdnipkepsek_sebarankdpertema.innerHTML = "NIP. "+idNipKepsek;

    htmlpetakd_sebaranpertema(v,bolkd);
    


});
const ubahkd_sebarankdpertema = (el)=>{
    let bol = el.checked;
    let codeKD = bol?"kd3":"kd4";
    document.querySelector(".checkboxkd_sebarankdpertema").innerHTML = bol?" KOMPETENSI PENGETAHUAN (KD-3)":" KOMPETENSI KETERAMPILAN (KD-4)"
    let opsi = select_sebarankdpertema.options;
    let indSel = opsi.selectedIndex;
    let v = opsi[indSel].value;
    let t = opsi[indSel].text;
    if(v !== "default"){
        htmlpetakd_sebaranpertema(v, bol);
    }
}
const htmlpetakd_sebaranpertema = (T,bol)=>{
    let tabel = document.querySelector(".tabelsebaran_sebarankdpertema");
    let no_t = T.match(/(\d+)/)[0];
    let tbody = tabel.getElementsByTagName("tbody")[0];
    let tfoot = tabel.getElementsByTagName("tbody")[1];
    let dBS = gabungdataserverkd();
    let dB = dBS.filter(s => s["koleksitema"].indexOf(T)>-1);
    let arrCodeMapelRendah = ["PKN","BINDO","MTK","SBDP","PJOK"];
    let arrCodeMapelTinggi = ["PKN","BINDO","IPA","IPS","SBDP"];
    let arrHeaderTinggi = ["PKN","Bahasa Indonesia","IPA","IPS","SBDP"]
    let arrHeaderRendah = ["PKN","Bahasa Indonesia","MATEMATIKA","SBDP","PJOK"];
    let krt_tekskd = bol?"indikatorkd3":"indikatorkd4";
    let krt_nokd = bol?"kd3":"kd4";

    let koleksiCodeMP, koleksiHeader, ltd
    if(idJenjang > 3){
        koleksiCodeMP = arrCodeMapelTinggi;
        koleksiHeader = arrHeaderTinggi;
        ltd = 3;
    }else{
        koleksiCodeMP = arrCodeMapelRendah;
        koleksiHeader = arrHeaderRendah;
        ltd = 4;
    }
    let html = "";
    let arrResult = [];
    let countKol; 
    let idkd;
    let arrJumlahperkolom = [];
    let c_perbaris = 0;
    let tc_perbaris = "";
    for(a = 0 ; a < koleksiCodeMP.length ; a++){
        let MP = koleksiCodeMP[a];
        let dt = dB.filter(s => s.mapel == MP);
        let objekKolom = {}, keyOK ;
        //let attRowspan = dt.length==1?"":"rowspan="+dt.length;
        let bolRowspan = dt.length ==1? false: true;
        for(b = 0 ; b < dt.length ; b++){
            if(bolRowspan){
                if(b == 0){
                    html +=`<tr><td rowspan="${dt.length}">${a+1}</td><td rowspan="${dt.length}">${koleksiHeader[a]}</td><td>${dt[b][krt_nokd]} ${dt[b][krt_tekskd]}</td>`;
                }else{
                    html +=`<tr><td>${dt[b][krt_nokd]} ${dt[b][krt_tekskd]}</td>`;
                }
            }else{
                html +=`<tr><td>${a+1}</td><td>${koleksiHeader[a]}</td><td>${dt[b][krt_nokd]} ${dt[b][krt_tekskd]}</td>`;
            }
            
            c_perbaris = 0;
            for(c = 0 ; c <ltd ; c++){
                for(d = 0 ; d < 6 ; d++){
                    let key_v = `t${no_t}_st${c+1}_pb${d+1}`;
                    let ceklis = dt[b][key_v];
                    if(ceklis == ""){
                        html +=`<td data-skrow="${dt[b].row}" data-keyskrow="t${no_t}_st${c+1}_pb${d+1}">${ceklis}</td>`
                    }else{
                        html +=`<td data-skrow="${dt[b].row}" data-keyskrow="t${no_t}_st${c+1}_pb${d+1}" class="w3-light-green w3-large">${ceklis}</td>`
                        c_perbaris++
                    }
                }
            }
            tc_perbaris = c_perbaris==0?"":c_perbaris;
            html +=`<td>${tc_perbaris}</td></tr>`
            
        }
        
        

    }
    
    tbody.innerHTML = html;
    let countBottomH = document.querySelector(".jumlahkdditemaini_sebarankdpertema");
    countBottomH.innerHTML ="Jumlah KD di " + T + " ini ada " + dB.length;
    
    let tdf = tfoot.rows[0].cells[2];
    let lasttdf = tfoot.rows[0].cells.length
    let tdff = tfoot.rows[1].cells[1];
    let lasttdft = tfoot.rows[1].cells.length;
    let m = 0;
    let total = 0;
    for(f = 1 ; f <= ltd ; f++){
        for(g = 1 ; g <= 6 ; g++){
            let namakey =  "kolom_" + no_t + "_" + f + "_" + g;
            let key_nama = "t"+no_t +"_st"+f+"_pb"+g;
            // let con = arrJumlahperkolom.filter(s => s[namakey] == "&checkmark;"|| s[namakey] == "✓");
            let con = dB.filter(s => s[key_nama] == "&checkmark;"|| s[key_nama] == "✓")
            let teks = con.length == 0?"": con.length;
            m += con.length;
            tdf.innerHTML = teks;
            tdf = tdf.nextSibling;


            let conTotal = dB.filter(s => s[key_nama] == "&checkmark;"|| s[key_nama] == "✓");
            total += conTotal.length;
        }
        tdff.innerHTML = m==0?"":m;
        tdff = tdff.nextSibling;
        m=0;
    }
    tfoot.rows[0].cells[lasttdf-1].innerHTML = total;
    tfoot.rows[1].cells[lasttdft-1].innerHTML = total;
    klikconfigceklis(T,bol);
    let btnserversimpan = document.querySelector(".btnserver_sebarankdpertama");
    btnserversimpan.setAttribute("onclick",`serveradm('prt_petakd_sebarankdpertema','SEBARAN KD ${T}',6,5)`)




}
const klikconfigceklis = (T,bol) =>{
    let table = document.querySelector(".tabelsebaran_sebarankdpertema");
    let tbody = table.getElementsByTagName("tbody")[0];
    let lrb = tbody.rows;
    for(i = 0 ; i <lrb.length; i ++){
        lrc = lrb[i].cells;
        for(j = 0 ; j < lrc.length ; j++){
            lrc[j].onmouseover = function (){
                let indRow = this.parentElement.rowIndex
                let indCol = this.cellIndex;
                let teks = "Index baris " + indRow +" kolom " + indCol;
                this.setAttribute("title", teks);

            }
            lrc[j].onmouseout = function (){
                this.removeAttribute("title")
            }
            lrc[j].onclick = function (){
                let rr = this.parentElement.rowIndex
                let cc = this.cellIndex;
                let tdfokus = this;
                if(tdfokus.hasAttribute("data-skrow")){

                    if(tdfokus.innerHTML == "" ){
                        tdfokus.setAttribute("class","w3-light-green w3-large");
                        tdfokus.innerHTML = "&checkmark;"
                        // this.break;
                    }else{
                        tdfokus.removeAttribute("class");
                        tdfokus.innerHTML = "";
                    };
                    let row = tdfokus.getAttribute("data-skrow");
                    let key = tdfokus.getAttribute("data-keyskrow");
                    let val = tdfokus.innerHTML;
                    kirimceklissebarankd(row,val,key,T,bol)
                }else{
                    alert("Kolom ini tidak bisa Anda klik")
                }
            }
        }
    }
};
const kirimceklissebarankd = (r, v,k,T,bol)=>{
    loadingtopbarin("loadingtopbar");
    let dbAsal = tagkdserver.filter(s => s.row == r)[0];
    
    let obj = {}
    
    obj[k] = v;
    
    let objekjadikirim = Object.assign(dbAsal,obj);
    
    let keyy = JSON.stringify(Object.keys(objekjadikirim));
    ///idbaris = row;
    let tabel= JSON.stringify(Object.values(objekjadikirim))
    
    let datakirim = new FormData();
    datakirim.append("key",keyy);
    datakirim.append("idbaris",r);
    datakirim.append("tab","serverkd");
    datakirim.append("tabel",tabel);
    //datakirim.append("tipe",tipe);
    fetch(urladm+"?action=simpanbarisketabidbaris",{
        method:"post",
        body:datakirim
    }).then(m=>m.json())
    .then(r => {
        let result = r.data;
        alltagkdserver = r.data
        tagkdserver = result.filter(s => s.kelas == idJenjang);
        htmlpetakd_sebaranpertema(T, bol);

        clearInterval(stoploadingtopbar);
        let divlod = document.querySelector(".loadingtopbar");
        divlod.style.width = "100%";
        setTimeout(() => {
            divlod.style.width = "1px"
            divlod.className += " w3-hide";

        }, 3000);
    })
    .catch(er => console.log(er))
}
const sebkdpersms_radiosemester =  (el)=>{
    
    let v = 1;
    if(el.checked){
        v = el.value;
    }
    let checkbox_ubahkdpersemester = document.querySelector(".checkbox_ubahkdpersemester");
    let x 
    if(checkbox_ubahkdpersemester.checked){
        x = true
    }else{
        x = false;
    }
    
    htmlsebaransemester(v,x)
    
}
const htmlsebaransemester = (semester,booleankd) =>{
    try{

        let tabel = document.querySelector(".tabelsebaran_sebarankdpersemester");
        let tbody = tabel.getElementsByTagName("tbody")[0];
        let thead = tabel.getElementsByTagName("thead")[0];
        let tfoot = tabel.getElementsByTagName("tbody")[1];
        
        let jjg;
        if(idJenjang > 3){
        jjg ="tinggi";
    }else{
        jjg = "rendah";
    }
    let arrTemaRendahGanjil = ["TEMA 1","TEMA 2","TEMA 3","TEMA 4"];
    let arrTemaRendahGenap = ["TEMA 5","TEMA 6","TEMA 7","TEMA 8"];
    let arrTemaTinggiGanjil = ["TEMA 1","TEMA 2","TEMA 3","TEMA 4","TEMA 5"];
    let arrTemaTinggiGenap = ["TEMA 6","TEMA 7","TEMA 8","TEMA 9"];
    let arrCodeMapelRendah = ["PKN","BINDO","MTK","SBDP","PJOK"];
    let arrCodeMapelTinggi = ["PKN","BINDO","IPA","IPS","SBDP"];
    let arrHeaderTinggi = ["PKN","Bahasa Indonesia","IPA","IPS","SBDP"]
    let arrHeaderRendah = ["PKN","Bahasa Indonesia","MATEMATIKA","SBDP","PJOK"];
    let ltd;
    let fl;
    
    let konftema;
    let konfmapel;
    let konfheader;
    if(semester == 1 && jjg == "tinggi"){
        konftema = arrTemaTinggiGanjil;
        konfmapel = arrCodeMapelTinggi;
        konfheader = arrHeaderTinggi;
        ltd = 3
    }else if(semester == 2 && jjg == "tinggi"){
        konftema = arrTemaTinggiGenap;
        konfmapel = arrCodeMapelTinggi;
        konfheader = arrHeaderTinggi
        ltd = 3
    }else if(semester == 1 && jjg == "rendah"){
        ltd = 4
        konftema = arrTemaRendahGanjil
        konfmapel = arrCodeMapelRendah;
        konfheader = arrHeaderRendah
    }else if(semester == 2 && jjg == "rendah"){
        ltd = 4
        konftema = arrTemaRendahGenap
        konfmapel = arrCodeMapelRendah;
        konfheader = arrHeaderRendah
    }
    //Bekerja dengan Keterangan identitas:
    let h1_sebarankdpersemester = document.querySelector(".h1_sebarankdpersemester");
    let ttdnamasekolah_sebarankdpersemester = document.querySelector(".ttdnamasekolah_sebarankdpersemester");
    let ttdnamakepsek_sebarankdpersemester = document.querySelector(".ttdnamakepsek_sebarankdpersemester");
    let nipkepsek_sebarankdpersemester = document.querySelector(".nipkepsek_sebarankdpersemester");
    let titimangsa_sebarankdpersemester = document.querySelector(".titimangsa_sebarankdpersemester");
    let gmpkelas_sebarankdpersemester = document.querySelector(".gmpkelas_sebarankdpersemester");
    let namaguru_sebarankdpersemester = document.querySelector(".namaguru_sebarankdpersemester");
    let nipguru_sebarankdpersemester = document.querySelector(".nipguru_sebarankdpersemester");
    if(booleankd){
        h1_sebarankdpersemester = "PEMETAAN KOMPETENSI DASAR PENGETAHUAN ( KI-3)<br> SEMESTER " + semester +" TAHUN PELAJARAN " + idTeksTapel;
    }else{
        h1_sebarankdpersemester = "PEMETAAN KOMPETENSI DASAR KETERAMPILAN ( KI-3)<br> SEMESTER " + semester +" TAHUN PELAJARAN " + idTeksTapel;
    }
    ttdnamasekolah_sebarankdpersemester.innerHTML = idNamaSekolah;
    ttdnamakepsek_sebarankdpersemester.innerHTML = idNamaKepsek;
    nipkepsek_sebarankdpersemester.innerHTML = "NIP. "+idNipKepsek;
    titimangsa_sebarankdpersemester.innerHTML = tanggalfull(new Date());
    gmpkelas_sebarankdpersemester.innerHTML = idJenisGuru +" " + idgurumapelmapel;
    namaguru_sebarankdpersemester.innerHTML = namauser;
    nipguru_sebarankdpersemester.innerHTML = idNipGuruKelas==""?"-":"NIP. "+idNipGuruKelas;
    let htmlT = "";
    let htmlB = "";
    let htmlFt = "";
    let loopThead;
    let loopPb;
    let loopTbody;
    //Bekerja dengan tabel identitas:
    let tabel_identitas = document.querySelector(".tabelkoleksitema_sebarankdpersemester");
    let html_tabelID = "";
    let identitas_kd = DataKDKurtilas["kelas"+idJenjang];
    for(a = 0 ; a < konftema.length ; a++){
        let tsss = konftema[a].replace("TEMA","Tema")
        
        let tekskdkd = identitas_kd.filter(m => m[tsss])[0][tsss];
        html_tabelID +=`<tr><td>${konftema[a]}</td><td>:</td><td>${tekskdkd}</td></tr>`;
    }
    tabel_identitas.innerHTML = html_tabelID;
    //Thead dulu;
    htmlT +=`<tr class="w3-light-gray"><th valign="center" class="w3-center" rowspan="3">No</th><th valign="center" class="w3-center" rowspan="3">MATA PELAJARAN</th><th valign="center" class="w3-center" rowspan="3">KOMPETENSI DASAR</th>`;
    htmlFt +=`<tr class="w3-light-grey"><th rowspan="2" colspan="2">JUMLAH KD DI TEMA INI ADA</th><th>Jumlah KD tiap Subtema</th>`;
    loopThead = "";
    loopPb = "";
    let loopFt = "";
    let loopTft = "";
    for(h = 0 ; h <konftema.length; h++){
        htmlT +=`<th colspan="${ltd}">${konftema[h]}</th>`
        loopThead +=`<th colspan="${ltd}">SUBTEMA</th>`;
        loopTft +=`<th colspan="${ltd}"></th>`;
        
        for(i = 0 ; i < ltd ; i++){
            loopPb += `<th>${i+1}</th>`;
            loopFt += `<th></th>`;
        }
    }
    htmlT +=`<th rowspan="${ltd}" valign="center" class="w3-center">JUMLAH</th></tr>
    <tr class="w3-light-gray">${loopThead}</tr><tr class="w3-light-gray">${loopPb}</tr>`;
    htmlFt +=`${loopFt}<th></th></tr><tr class="w3-light-grey"><th>Jumlah KD pada masing-masing Tema</th>
    ${loopTft}<th></th></tr>`;
    let dbAsal = gabungdataserverkd();
    let dbCeklis = dbAsal.filter(s=> s.semester.indexOf(semester)>-1 && konfmapel.indexOf(s.mapel)>-1);
    let no_kd = booleankd?"kd3":"kd4";
    let teks_kd = booleankd?"indikatorkd3":"indikatorkd4";
    let arro = [];
    let count_n;
    let tagcekrow = 0;
    let mapelawal = dbCeklis[0].mapel == undefined? "PKN":dbCeklis[0].mapel;
    let frek = dbCeklis.map(m => m.mapel).reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {});
    let ccFrek = frek[mapelawal];
    let nourut= 1;
    for(j=0; j < dbCeklis.length ; j++){
        let mapelini = dbCeklis[j].mapel;
        let posisiM = konfmapel.indexOf(mapelini);
        let convertmapel = konfheader[posisiM];
        if(tagcekrow == 0 ){
            if(ccFrek == 1){
                htmlB += `<tr><td>${nourut}</td><td>${convertmapel}</td>`;
                htmlB += `<td>${dbCeklis[j][no_kd]} ${dbCeklis[j][teks_kd]}</td>`;
            }else{
                htmlB += `<tr><td rowspan="${ccFrek}">${nourut}</td><td rowspan="${ccFrek}">${convertmapel}</td>`;
                htmlB += `<td>${dbCeklis[j][no_kd]} ${dbCeklis[j][teks_kd]}</td>`;
            }
                tagcekrow++;
                nourut++
        }else{
            if(tagcekrow == ccFrek){
                ccFrek = frek[mapelini];
                htmlB += `<tr><td rowspan="${ccFrek}">${nourut}</td><td rowspan="${ccFrek}">${convertmapel}</td>`;
                htmlB += `<td>${dbCeklis[j][no_kd]} ${dbCeklis[j][teks_kd]}</td>`;
                tagcekrow = 1;
                nourut++
            }else{
                
                htmlB += `<tr><td>${dbCeklis[j][no_kd]} ${dbCeklis[j][teks_kd]}</td>`;
                tagcekrow++;
            }
        }
        let bolwarna; let o; 
        o = 0;
        count_n = 0
        let objSTini={};
        let q = 0;
        for(k=0;k< konftema.length ; k++){
            let notema = konftema[k].match(/(\d+)/)[0];
            bolwarna = false;
            for(l=0;l< ltd ; l++){
                let st = l+1;
                let ky = "";
                let keyperst = "t"+notema+"_st"+st;
                let n=0;
                bolwarna = false;
                //objSTini = {}
                for (m=1 ; m <= 6 ; m++){
                    ky = "t"+notema+"_st"+st+"_pb"+m;
                    let cekcelis = dbCeklis[j][ky];
                    if(cekcelis !== ""){
                        n++;
                        o++;
                        bolwarna = true;
                    }else{
                    }
                }
                
                let isinya = n==0?"":n;
                if(bolwarna){
                    htmlB +=`<td class="w3-green">${isinya}</td>`;
                    q++;
                }else{
                    htmlB +=`<td>${isinya}</td>`;
                }
                objSTini[keyperst]= n;
            }
        }
        let isiq = q == 0 ? "" : q+" ST";
        let isio = o == 0?"":o+" Pb";
        htmlB +=`<td>${isiq}<br>${isio}</td></tr>`;
        arro.push(objSTini);
    }
    indra = arro;
    thead.innerHTML = htmlT;
    tbody.innerHTML = htmlB;
    tfoot.innerHTML = htmlFt;
    
    let tabelx = document.querySelector(".tabelsebaran_sebarankdpersemester");
    let tfootx = tabelx.getElementsByTagName("tbody")[1];
    
    tfootx.rows[0].cells[0].innerHTML = "JUMLAH KD DI SEMESTER " + semester +" INI SEBANYAK "+ dbCeklis.length;
    let td = tfootx.rows[0].cells[2];
    let td2 = tfootx.rows[1].cells[1];
    let count_tema
    for(x = 0 ; x < konftema.length ; x++){
        count_tema = 0; let count_pb = 0
        let no = konftema[x].match(/(\d+)/)[0]
        for(y = 1 ; y <= ltd ; y++){
            let keysubtema = "t"+no+"_st"+y;
            let n_kolom = arro.map(s=> s[keysubtema]).reduce((a,b)=> a+b);
            let n_kolomm = arro.map(s=> s[keysubtema]).map(m => m==0?0:1).reduce((a,b)=>a+b);
            let isi_n = n_kolomm == 0?"":"<span class='w3-tiny'>"+n_kolomm +" KD</span>"
            let isi_m = n_kolom == 0?"":"<span class='w3-tiny'>"+n_kolom +" Pb</span>";
            let isi_nm= isi_n +"<br>"+ isi_m;
            td.innerHTML = isi_nm;
            td = td.nextSibling;
            count_tema = count_tema + n_kolom;
            count_pb = count_pb + n_kolomm;
        }
        let ctb = count_pb == 0 ? "": count_pb + " KD";
        let ctbb = count_tema == 0? "" : count_tema+" Pb";
        td2.innerHTML = ctb+"<br>"+ctbb;
        td2 = td2.nextSibling;
    }
    
    let lastcol = tfootx.rows[0].cells.length;
    let last2col = tfootx.rows[1].cells.length;
    let nA = arro.map(m => Object.values(m)).map(mm => mm.reduce((a,b)=>a+b)).reduce((c,d)=> c+d);
    let nB = arro.map(m => Object.values(m)).map(mm => mm.reduce((a,b)=>a+b)).map(n=>n==0?0:1).reduce((c,d)=> c+d);
    let nAA = nA == 0?"":nA + " Pb";
    let nBB = nB == 0?"":nB+ " KD";
    tfootx.rows[0].cells[lastcol-1].innerHTML = nAA+"<br>"+nBB;
    tfootx.rows[1].cells[last2col-1].innerHTML = nAA+"<br>"+nBB;
    
    let btnserversimpan = document.querySelector(".btnserver_sebarankdpersemester");
    btnserversimpan.setAttribute("onclick",`serveradm('prt_petakd_sebarankdpersemester','SEBARAN KD SEMESTER ${semester}',6,6)`);
    }catch(er){
        alert("Pengaturan KD untuk semester ini biasanya belum pernah diisi. Silakan cek di Menu Distribusi KD!")
    }
}
const ubahkd_sebarankdpersemester =  (el) =>{
    let ket = document.querySelector(".keterangankd34_sebarankdpersemester");
    let x = false;
    if(el.checked){
        ket.innerHTML = "Kompetensi Pengetahuan (KD-3)";
        x = el.checked;
    }else{
        ket.innerHTML = "Kompetensi Keterampilan (KD-4)";
        x = false;
    }
    let v = 1
    let dom = document.querySelectorAll("input[name=sebkdpersms_radiosemester]");
    for(i = 0 ; i < dom.length; i++){
        if(dom[i].checked){
            v = dom[i].value
        }
    }
    htmlsebaransemester(v,x)

}


const printadmKaldik = (c,portr=true) =>{
    //jaga-jaga untuk element class yang duplikat?
    let dom = document.querySelector("."+c);
    let indom = dom.innerHTML;//.textContent;
    
    let noSpace =indom.replace(/(\r\n|\n|\r)/gm, "").replace(/\s\s/g,"");
    let isirep = noSpace.replace(/\ss12\s/gm," s3 ")
    
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
    //head.innerHTML += `<style type="text/css"> .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000} .garis td,.garis th,.garis tr{border:0.5px solid rgb(119, 116, 116)} .garis th{border:1px solid #000;text-align:center;vertical-align:middle} </style>`;

    if(portr){
        head.innerHTML += `<style type="text/css" media="print">
        @media print {
            html,body{height:100%;width:100%;margin:0;padding:0}
            
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
    
    

    body.innerHTML = isirep;//noSpace;
    // body.innerHTML += `<div class="w3-row w3-margin-top"><div class="w3-col l6 s6 w3-center">Mengetahui,<br>Kepala ${idNamaSekolah}<br><br><br><br><u><b>${idNamaKepsek}</b></u><br>NIP. ${idNipKepsek}</div><div class="w3-col l6 s6 w3-center">Depok, ${tanggalfull(new Date())}<br>${idJenisGuru} ${idgurumapelmapel}<br><br><br><br><u><b>${namauser}</b></u><br>NIP. ${idNipGuruKelas}</div>`;

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();
}

const admkaldik_pilihSemester = document.querySelectorAll("input[name=admkaldik_pilihSemester]");
const admkaldik_keterangan = document.querySelector(".admkaldik_keterangan");
const kelaswarnalibur = (tgl)=>{
        let datalibur = JSON.parse(localStorage.getItem("Kaldik"));
        let cekini = keteranganlibur(tgl);
        let filter = datalibur.filter(s => s.keterangan == cekini)[0].warna;
        return filter;
    
}
const cekbariskaldik = (tgl)=>{
    let datalibur = JSON.parse(localStorage.getItem("Kaldik"));
        let cekini = keteranganlibur(tgl);
        let filter = datalibur.filter(s => s.keterangan == cekini)[0].idbaris;
        return filter;
}
admkaldik_pilihSemester.forEach(el=>{
    el.addEventListener("click", function(){
        let v = el.value;
        let th = idTeksTapel.split("/");
        let thfokus = th[v-1];
        let indekbulan1 = [0,1,2,3,4,5];
        let indekbulan0 = [6,7,8,9,10,11];
        let arrIndeks = v==1 ?indekbulan0:indekbulan1;
        let tabel = document.querySelectorAll(".admtabel_kaldik");
        let h3_admkaldik = document.querySelector(".h3_admkaldik");
        let h4_admkaldik = document.querySelector(".h4_admkaldik");
        let div_ttd = document.querySelector(".ttd_admkaldik")
        div_ttd.innerHTML = `<div class="w3-row w3-margin-top"><div class="w3-col l6 s6 w3-center">Mengetahui,<br>Kepala ${idNamaSekolah}<br><br><br><br><u><b>${idNamaKepsek}</b></u><br>NIP. ${idNipKepsek}</div><div class="w3-col l6 s6 w3-center">Depok, ${tanggalfull(new Date())}<br>${idJenisGuru} ${idgurumapelmapel}<br><br><br><br><u><b>${namauser}</b></u><br>${idNipGuruKelas==""?"-":"NIP. "+idNipGuruKelas}</div>`;
        h3_admkaldik.innerHTML = "KALENDER PENDIDIKAN "+idNamaSekolah.toUpperCase();
        h4_admkaldik.innerHTML = "TAHUN PELAJARAN "+idTeksTapel+" SEMESTER " + v;


        let bulan;
        for(i =0 ; i < tabel.length ; i++){
            //kasih id :
            let idtabel = "tabelkaldikindex-" + i;
            //tabel[i].classList.add(idtabel);
            
            let thead = tabel[i].getElementsByTagName("thead")[0];
            let tbody = tabel[i].getElementsByTagName("tbody")[0];
            
            
            tbody.innerHTML = "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            
            let ind = arrIndeks[i]
            bulan = NamaBulandariIndex(ind)
            thead.rows[0].cells[0].innerHTML = bulan + " " + thfokus;
            let tgl0 = new Date(thfokus,ind,1);
            let tglLast = daysInMonth((ind+1), thfokus)
            let r0 = 0;
            let c0;
            let d;
            let dd;
            let lr ="";
            let x;
            let y;
            let str_d;
            for(j = 0 ; j < tglLast ; j++){
                d = new Date(thfokus, ind, (j+1));
                str_d = StringTanggal(d);
                //tandai ini tanggalnya:
                
                c0= d.getDay();
                dd = d.getDate();
                if(cocoklibur(d)){
                    tbody.rows[r0].cells[c0].innerHTML = dd;
                    let clr = kelaswarnalibur(d);
                    if(clr !==""){
                        tbody.rows[r0].cells[c0].setAttribute("class",clr);
                    }else{
                        tbody.rows[r0].cells[c0].setAttribute("class","w3-red");
                    }
                    x = cekbariskaldik(d);
                    y = keteranganlibur(d)
                    tbody.rows[r0].cells[c0].setAttribute("data-bariskalidk",x);
                    tbody.rows[r0].cells[c0].setAttribute("data-keterangankaldik",y);
                }else{
                    tbody.rows[r0].cells[c0].innerHTML = dd;
                    if(tbody.rows[r0].cells[c0].hasAttribute("class")){
                        tbody.rows[r0].cells[c0].removeAttribute("class");
                    }
                }
                tbody.rows[r0].cells[c0].setAttribute("data-stringTgl", str_d);

                if(c0 == 0 || c0 == 6){
                    tbody.rows[r0].cells[c0].setAttribute("class","w3-red");
                }
                if(c0 == 6){
                    r0++
                }
                lr = r0;
            }
            let cellakkhir =  tbody.rows[5].cells[0];
            if(cellakkhir.innerHTML ==""){
                tbody.deleteRow(-1);
            }
        }
        
        let datalibur = localStorage.getItem("Kaldik");
        let arrLibur = JSON.parse(datalibur);
        let dat = arrLibur.filter(s => arrIndeks.indexOf(new Date(s.start_tgl).getMonth()) > -1 && new Date(s.start_tgl).getFullYear() == thfokus);
        let kelompok = Math.ceil(dat.length/2);
        let html = `<table class="w3-table-all w3-tiny"><tr class="w3-cyan"><td colspan="2">Tanggal</td><td>Keterangan</td></tr>`;
        //tabel pertama: 
        for(l=0 ; l < (kelompok-1);l++){
            if(dat[l].lama == 1){
                html+=`<tr><td>${tanggalfull(dat[l].start_tgl)}</td><td>:</td><td>${dat[l].keterangan}</td></tr>`
            }else{
                html+=`<tr><td>${tanggalfull(dat[l].start_tgl)} - ${tanggalfull(dat[l].end_tgl)}</td><td>:</td><td>${dat[l].keterangan}</td></tr>`
            }
            
        }
        html +=`</table>`;
        let html0 = `<table class="w3-table-all w3-tiny"><tr class="w3-cyan"><td colspan="2">Tanggal</td><td>Keterangan</td></tr>`;
        for(m= kelompok; m < dat.length ; m++){
            if(dat[m].lama == 1){
                html0+=`<tr><td>${tanggalfull(dat[m].start_tgl)}</td><td>:</td><td>${dat[m].keterangan}</td></tr>`
            }else{
                html0+=`<tr><td>${tanggalfull(dat[m].start_tgl)} - ${tanggalfull(dat[m].end_tgl)}</td><td>:</td><td>${dat[m].keterangan}</td></tr>`
            }
        }
        html0 +=`</table>`;
        
        document.querySelectorAll(".admkaldik_keterangan")[0].innerHTML = "Keterangan:<br>" + html;
        document.querySelectorAll(".admkaldik_keterangan")[1].innerHTML =  "<br>"+html0;
        tabel =  document.querySelectorAll(".admtabel_kaldik");
        for(u = 0 ; u < tabel.length ; u++){
            
            tooltipkaldik_config(u,v)    

        }
        
    })
});
const KalendarPerSemester = (v)=>{
        let th = idTeksTapel.split("/");
        let thfokus = th[v-1];
        let indekbulan1 = [0,1,2,3,4,5];
        let indekbulan0 = [6,7,8,9,10,11];
        let arrIndeks = v==1 ?indekbulan0:indekbulan1;
        let tabel = document.querySelectorAll(".admtabel_kaldik");
        let h3_admkaldik = document.querySelector(".h3_admkaldik");
        let h4_admkaldik = document.querySelector(".h4_admkaldik");
        h3_admkaldik.innerHTML = "KALENDER PENDIDIKAN "+idNamaSekolah.toUpperCase();
        h4_admkaldik.innerHTML = "TAHUN PELAJARAN "+idTeksTapel+" SEMESTER " + v;
        let div_ttd = document.querySelector(".ttd_admkaldik")
        div_ttd.innerHTML = `<div class="w3-row w3-margin-top"><div class="w3-col l6 s6 w3-center">Mengetahui,<br>Kepala ${idNamaSekolah}<br><br><br><br><u><b>${idNamaKepsek}</b></u><br>NIP. ${idNipKepsek}</div><div class="w3-col l6 s6 w3-center">Depok, ${tanggalfull(new Date())}<br>${idJenisGuru} ${idgurumapelmapel}<br><br><br><br><u><b>${namauser}</b></u><br>${idNipGuruKelas==""?"-":"NIP. "+idNipGuruKelas}</div>`;

        let bulan;
        for(i =0 ; i < tabel.length ; i++){
            //kasih id :
            let idtabel = "tabelkaldikindex-" + i;
            //tabel[i].classList.add(idtabel);
            
            let thead = tabel[i].getElementsByTagName("thead")[0];
            let tbody = tabel[i].getElementsByTagName("tbody")[0];
            
            
            tbody.innerHTML = "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
            
            let ind = arrIndeks[i]
            bulan = NamaBulandariIndex(ind)
            thead.rows[0].cells[0].innerHTML = bulan + " " + thfokus;
            let tgl0 = new Date(thfokus,ind,1);
            let tglLast = daysInMonth((ind+1), thfokus)
            let r0 = 0;
            let c0;
            let d;
            let dd;
            let lr ="";
            let x;
            let y;
            let str_d;
            for(j = 0 ; j < tglLast ; j++){
                d = new Date(thfokus, ind, (j+1));
                str_d = StringTanggal(d);
                //tandai ini tanggalnya:
                
                c0= d.getDay();
                dd = d.getDate();
                if(cocoklibur(d)){
                    tbody.rows[r0].cells[c0].innerHTML = dd;
                    let clr = kelaswarnalibur(d);
                    if(clr !==""){
                        tbody.rows[r0].cells[c0].setAttribute("class",clr);
                    }else{
                        tbody.rows[r0].cells[c0].setAttribute("class","w3-red");
                    }
                    x = cekbariskaldik(d);
                    y = keteranganlibur(d)
                    tbody.rows[r0].cells[c0].setAttribute("data-bariskalidk",x);
                    tbody.rows[r0].cells[c0].setAttribute("data-keterangankaldik",y);
                }else{
                    tbody.rows[r0].cells[c0].innerHTML = dd;
                    if(tbody.rows[r0].cells[c0].hasAttribute("class")){
                        tbody.rows[r0].cells[c0].removeAttribute("class");
                    }
                }
                tbody.rows[r0].cells[c0].setAttribute("data-stringTgl", str_d);

                if(c0 == 0 || c0 == 6){
                    tbody.rows[r0].cells[c0].setAttribute("class","w3-red");
                }
                if(c0 == 6){
                    r0++
                }
                lr = r0;
            }
            let cellakkhir =  tbody.rows[5].cells[0];
            if(cellakkhir.innerHTML ==""){
                tbody.deleteRow(-1);
            }
        }
        
        let datalibur = localStorage.getItem("Kaldik");
        let arrLibur = JSON.parse(datalibur);
        let dat = arrLibur.filter(s => arrIndeks.indexOf(new Date(s.start_tgl).getMonth()) > -1 && new Date(s.start_tgl).getFullYear() == thfokus);
        let kelompok = Math.ceil(dat.length/2);
        let html = `<table class="w3-table-all w3-tiny"><tr class="w3-cyan"><td colspan="2">Tanggal</td><td>Keterangan</td></tr>`;
        //tabel pertama: 
        for(l=0 ; l < (kelompok-1);l++){
            if(dat[l].lama == 1){
                html+=`<tr><td>${tanggalfull(dat[l].start_tgl)}</td><td>:</td><td>${dat[l].keterangan}</td></tr>`
            }else{
                html+=`<tr><td>${tanggalfull(dat[l].start_tgl)} - ${tanggalfull(dat[l].end_tgl)}</td><td>:</td><td>${dat[l].keterangan}</td></tr>`
            }
            
        }
        html +=`</table>`;
        let html0 = `<table class="w3-table-all w3-tiny"><tr class="w3-cyan"><td colspan="2">Tanggal</td><td>Keterangan</td></tr>`;
        for(m= kelompok; m < dat.length ; m++){
            if(dat[m].lama == 1){
                html0+=`<tr><td>${tanggalfull(dat[m].start_tgl)}</td><td>:</td><td>${dat[m].keterangan}</td></tr>`
            }else{
                html0+=`<tr><td>${tanggalfull(dat[m].start_tgl)} - ${tanggalfull(dat[m].end_tgl)}</td><td>:</td><td>${dat[m].keterangan}</td></tr>`
            }
        }
        html0 +=`</table>`;
        
        document.querySelectorAll(".admkaldik_keterangan")[0].innerHTML = "Keterangan:<br>" + html;
        document.querySelectorAll(".admkaldik_keterangan")[1].innerHTML =  "<br>"+html0;
        tabel =  document.querySelectorAll(".admtabel_kaldik");
        for(u = 0 ; u < tabel.length ; u++){
            
            tooltipkaldik_config(u,v)    

        }
        
    
}

const tooltipkaldik_config = (inek,semester) =>{
    let db = JSON.parse(localStorage.getItem("Kaldik"));
    let cls ="tabelkaldikindex" + inek;
    let idd = ".tooltipkaldik_tempattgl"+inek;
    let clEdt = ".kirimedit_tooltipkaldik"+inek;
    let clTmbh = ".kirimtambah_tooltipkaldik"+inek;
    let clHps = ".tooltipkaldik_hapus"+inek;
    
    let divtool = document.getElementById("tooltipkaldik"+inek);
    let divkanan = document.querySelector(".tooltiparahkanan"+inek);
    let divkiri = document.querySelector(".tooltiparahkiri"+inek);
    //posisi sembunyikan formdata untuk mengedit kalendar;
    //definisikan terlebih dahulu untuk tombol tambah dan edit kalendar\
    let div_datakirim0 = document.querySelector(idd);
    // let div_kirimedit = document.querySelector(clEdt);
    // let div_kirimtambah = document.querySelector(clTmbh);
    // let div_kirimhapus = document.querySelector(clHps);
    
    div_datakirim0.style.display = "none";
    
    let tabel = document.getElementById(cls);
    //console.log(tabel);
    let tbody = tabel.getElementsByTagName("tbody")[0];
    let lr = tbody.rows;
    for(i = 0 ; i < lr.length ; i++){
        let lc = lr[i].cells;
        for(j=0 ; j < lc.length ; j++){
            let td = lc[j];
            
            let rowIndek, cellIndek, tekstitle
            let keterangan;
            td.onmouseover = function (){
                rowIndek = this.parentElement.rowIndex;
                cellIndek = this.cellIndex;
                if(this.hasAttribute("data-keterangankaldik")){
                    keterangan = this.getAttribute("data-keterangankaldik");
                }else{
                    keterangan = "Tgl " + this.innerHTML;
                }
                this.setAttribute("title", keterangan);
            }
            td.onmouseout = function (){
                this.removeAttribute("title")
            }
            td.onclick = function (){
                let tooltipkaldik =document.querySelectorAll(".tooltipkaldik");
                    tooltipkaldik.forEach(el => el.style.display = "none");

                let ttop = (tabel.offsetTop + this.offsetTop  ) +"px";//this.offsetTop +"px";
                let lleft =  (tabel.offsetLeft+ this.offsetLeft + this.offsetWidth +20) +"px";
                let lleftt =  (tabel.offsetLeft+ this.offsetLeft + this.offsetWidth +20) ;
                let lebarwindow = document.querySelector(".tesbody").offsetWidth;
                let bataskanan = lebarwindow * 0.5 ;//- (tabel.offsetLeft+ this.offsetLeft + this.offsetWidth +10);
                //console.log("left="+lleft +" lebar ="+lebarwindow+" batas ke kanan="+bataskanan);
                
                let div_datakirim = document.querySelector(idd);
                let div_kirimedit = document.querySelector(clEdt);
                let div_kirimtambah = document.querySelector(clTmbh);
                let div_kirimhapus = document.querySelector(clHps);
    
                div_datakirim.style.display = "none";
                div_kirimedit.style.display = "none";
                div_kirimtambah.style.display = "none";

                if(lleftt > bataskanan){
                    divtool.style.top=ttop;
                    divtool.style.left= (tabel.offsetLeft+ this.offsetLeft - 360)+"px" ;
                    divkanan.style.display="block";
                    divkiri.style.display="none";
                }else{
                    
                    divtool.style.top=ttop;
                    divtool.style.left= lleft;
                    divkanan.style.display="none";
                    divkiri.style.display="block";
                }
                let tdfokus = this;
                if(tdfokus.innerHTML==""){
                    alert("Maaf, Anda tidak bisa mengedit kalendar kosong!");
                    return
                }
                divtool.style.display = "block";
                let isisel = tdfokus.innerHTML;
                let celedit = tdfokus.hasAttribute("class");
                let btn_merah = document.querySelector(".tooltipkaldik_merah"+inek);
                let btn_biru = document.querySelector(".tooltipkaldik_biru"+inek);
                let btn_hijau = document.querySelector(".tooltipkaldik_hijau"+inek);
                let btn_kuning = document.querySelector(".tooltipkaldik_kuning"+inek);
                let ketedit = document.querySelector("#ket_tooltipkaldik"+inek);
                //let tgledit = document.querySelector("#date_tooltipkaldik"+inek);
                let spanubahtambah = document.querySelector(".ubahtambah_tooltipkaldik"+inek);
                
                btn_merah.onclick =async function (){
                        let ttgl = tdfokus.getAttribute("data-stringTgl");
                        div_datakirim.style.display = "block";
                        if(celedit && tdfokus.hasAttribute("data-bariskalidk")){
                            let r = tdfokus.getAttribute("data-bariskalidk");
                            // ... console.log("Anda mengedit tanggal ini dgn idbaris= "+r);
                            div_kirimedit.style.display = "block";
                            div_kirimtambah.style.display = "none";
                            spanubahtambah.innerHTML ="Anda akan mengedit Kaldik ini";
                            let dbS = db.filter(s=> s.idbaris == r)[0];
                            //let lama = dbS.lama;
                            let dbTglAwal = StringTanggal2(new Date(dbS.start_tgl));
                            let dbTglAkhir = StringTanggal2(new Date(dbS.end_tgl));

                            let ketBefore = dbS.keterangan;
                            ketedit.value = ketBefore;
                            
                            
                            div_kirimedit.onclick=  function(){
                                let kolor = "w3-red";
                                let valueKet  = ketedit.value;
                                let TglAwal = dbTglAwal;
                                let TglAkhir = dbTglAkhir;
                                serveredit_tooltipkaldik(r, valueKet, TglAwal, TglAkhir,kolor,semester);
                                divtool.style.display = "none";
                            }
                        }else{
                            //... console.log("Anda akan menambahkan kaldik di tanggal ini tgl " + ttgl);

                            div_kirimedit.style.display = "none";
                            div_kirimtambah.style.display = "block";
                            spanubahtambah.innerHTML ="Anda akan menambahkan Keterangan Kaldik ini"
                            div_kirimtambah.onclick = function (){
                                let d = StringTanggal2(new Date(ttgl))
                                // var d = new Date(ttgl).toLocaleDateString().split('/');
                                // var showTgl = d[2]+"-"+("0"+d[0]).slice(-2)+"-"+("0"+d[1]).slice(-2);
                                // tgledit.value = showTgl;
                                
                                
                                    let kolor = "w3-red";
                                    let valueKet  = ketedit.value;
                                    let valueTgl = d;
                                    servertambah_tooltipkaldik("", valueKet, valueTgl,kolor,semester);
                                    divtool.style.display = "none";
                                
                            }
                        }   
                        tdfokus.setAttribute("class","w3-red");
                        
                }
                btn_biru.onclick = function (){
                    let ttgl = tdfokus.getAttribute("data-stringTgl");
                    div_datakirim.style.display = "block";
                    if(celedit && tdfokus.hasAttribute("data-bariskalidk")){
                        let r = tdfokus.getAttribute("data-bariskalidk");
                        // ... console.log("Anda mengedit tanggal ini dgn idbaris= "+r);
                        div_kirimedit.style.display = "block";
                        div_kirimtambah.style.display = "none";
                        spanubahtambah.innerHTML ="Anda akan mengedit Kaldik ini";
                        let dbS = db.filter(s=> s.idbaris == r)[0];
                        //let lama = dbS.lama;
                        let dbTglAwal = StringTanggal2(new Date(dbS.start_tgl));
                        let dbTglAkhir = StringTanggal2(new Date(dbS.end_tgl));

                        let ketBefore = dbS.keterangan;
                        ketedit.value = ketBefore;
                        
                        
                        div_kirimedit.onclick=  function(){
                            let kolor = "w3-blue";
                            let valueKet  = ketedit.value;
                            let TglAwal = dbTglAwal;
                            let TglAkhir = dbTglAkhir;
                            serveredit_tooltipkaldik(r, valueKet, TglAwal, TglAkhir,kolor,semester);
                            divtool.style.display = "none";
                        }
                    }else{
                        //... console.log("Anda akan menambahkan kaldik di tanggal ini tgl " + ttgl);
                        div_kirimedit.style.display = "none";
                        div_kirimtambah.style.display = "block";
                        spanubahtambah.innerHTML ="Anda akan menambahkan Keterangan Kaldik ini"
                        div_kirimtambah.onclick = function (){
                            
                            let d = StringTanggal2(new Date(ttgl))
                            // var d = new Date(ttgl).toLocaleDateString().split('/');
                            // var showTgl = d[2]+"-"+("0"+d[0]).slice(-2)+"-"+("0"+d[1]).slice(-2);
                            // tgledit.value = showTgl;
                            
                            
                                let kolor = "w3-blue";
                                let valueKet  = ketedit.value;
                                let valueTgl = d;
                                servertambah_tooltipkaldik("", valueKet, valueTgl,kolor,semester);
                                divtool.style.display = "none";
                            
                        }
                    }   
                    tdfokus.setAttribute("class","w3-blue");    
                }
                btn_hijau.onclick = function (){
                    let ttgl = tdfokus.getAttribute("data-stringTgl");
                    div_datakirim.style.display = "block";
                    if(celedit && tdfokus.hasAttribute("data-bariskalidk")){
                        let r = tdfokus.getAttribute("data-bariskalidk");
                        // ... console.log("Anda mengedit tanggal ini dgn idbaris= "+r);
                        div_kirimedit.style.display = "block";
                        div_kirimtambah.style.display = "none";
                        spanubahtambah.innerHTML ="Anda akan mengedit Kaldik ini";
                        let dbS = db.filter(s=> s.idbaris == r)[0];
                        //let lama = dbS.lama;
                        let dbTglAwal = StringTanggal2(new Date(dbS.start_tgl));
                        let dbTglAkhir = StringTanggal2(new Date(dbS.end_tgl));

                        let ketBefore = dbS.keterangan;
                        ketedit.value = ketBefore;
                        
                        
                        div_kirimedit.onclick=  function(){
                            let kolor = "w3-green";
                            let valueKet  = ketedit.value;
                            let TglAwal = dbTglAwal;
                            let TglAkhir = dbTglAkhir;
                            serveredit_tooltipkaldik(r, valueKet, TglAwal, TglAkhir,kolor,semester);
                            divtool.style.display = "none";
                        }
                    }else{
                        //... console.log("Anda akan menambahkan kaldik di tanggal ini tgl " + ttgl);
                        div_kirimedit.style.display = "none";
                        div_kirimtambah.style.display = "block";
                        spanubahtambah.innerHTML ="Anda akan menambahkan Keterangan Kaldik ini"
                        div_kirimtambah.onclick = function (){

                            
                            let d = StringTanggal2(new Date(ttgl))
                            // var d = new Date(ttgl).toLocaleDateString().split('/');
                            // var showTgl = d[2]+"-"+("0"+d[0]).slice(-2)+"-"+("0"+d[1]).slice(-2);
                            // tgledit.value = showTgl;
                            
                                let kolor = "w3-green";
                                let valueKet  = ketedit.value;
                                let valueTgl = d;
                                servertambah_tooltipkaldik("", valueKet, valueTgl,kolor,semester);
                                divtool.style.display = "none";
                            }
                    }   
                    tdfokus.setAttribute("class","w3-green");
                }
                btn_kuning.onclick = function (){
                    let ttgl = tdfokus.getAttribute("data-stringTgl");
                    div_datakirim.style.display = "block";
                    if(celedit && tdfokus.hasAttribute("data-bariskalidk")){
                        let r = tdfokus.getAttribute("data-bariskalidk");
                        // ... console.log("Anda mengedit tanggal ini dgn idbaris= "+r);
                        div_kirimedit.style.display = "block";
                        div_kirimtambah.style.display = "none";
                        spanubahtambah.innerHTML ="Anda akan mengedit Kaldik ini";
                        let dbS = db.filter(s=> s.idbaris == r)[0];
                        //let lama = dbS.lama;
                        let dbTglAwal = StringTanggal2(new Date(dbS.start_tgl));
                        let dbTglAkhir = StringTanggal2(new Date(dbS.end_tgl));

                        let ketBefore = dbS.keterangan;
                        ketedit.value = ketBefore;
                        
                        
                        div_kirimedit.onclick=  function(){
                            let kolor = "w3-yellow";
                            let valueKet  = ketedit.value;
                            let TglAwal = dbTglAwal;
                            let TglAkhir = dbTglAkhir;
                            serveredit_tooltipkaldik(r, valueKet, TglAwal, TglAkhir,kolor,semester);
                            divtool.style.display = "none";
                        }
                    }else{
                        //... console.log("Anda akan menambahkan kaldik di tanggal ini tgl " + ttgl);
                        div_kirimedit.style.display = "none";
                        div_kirimtambah.style.display = "block";
                        spanubahtambah.innerHTML ="Anda akan menambahkan Keterangan Kaldik ini"
                        div_kirimtambah.onclick = function (){
                            let d = StringTanggal2(new Date(ttgl))
                            
                                let kolor = "w3-yellow";
                                let valueKet  = ketedit.value;
                                let valueTgl = d;
                                servertambah_tooltipkaldik("", valueKet, valueTgl,kolor,semester);
                                divtool.style.display = "none";
                            
                        }
                    }   
                    tdfokus.setAttribute("class","w3-yellow");    
                }
                div_kirimhapus.onclick= function (){
                    if(celedit && tdfokus.hasAttribute("data-bariskalidk")){
                        let r = tdfokus.getAttribute("data-bariskalidk");
                        let konfirmasi = confirm("Anda yakin ingin menghapus keterangan tanggal ini?")
                        if(konfirmasi){
                            let datakaldikdihapus = db.filter(s => s.idbaris == r)[0];
                            
                            serverhapus_tooltipkaldik(r,semester);
                            divtool.style.display = "none";
                        }
                        
                    }else{
                        alert("Tidak ada keterangan kalender di tanggal ini! Anda tidak bisa menghapusnya");
                     
                    }
                }
            }
        }
    }
    dragElement(divtool);
};

const serveredit_tooltipkaldik = async (iRow, valueKet, valueTgl, valueTgl1, ColoR,v) =>{
    url_absenkaldik = jlo.url_dataabsen + "?action=datakaldik&idss=" + jlo.ss_dataabsen;
    let dbS = JSON.parse(localStorage.getItem("Kaldik"));
    let db = dbS.filter(s => s.idbaris)[0];
    
    let link = url_kaldikaja + "?action=editkaldik";
    let data = new FormData();
    data.append("idbariskaldik",iRow);
    data.append("keterangan", valueKet);
    data.append("start_tgl", valueTgl)
    data.append("end_tgl", valueTgl1);
    data.append("warna", ColoR)
    data.append('oleh', namauser);
    await fetch(link, {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {
           alert("Berhasil diedit ("+k+")");
           //console.log(k);
        })
        .catch(err => console.log(err));

    await fetch(url_absenkaldik).then(m => m.json()).then(k => {

        
        //console.log(k)
        arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
        arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

        localStorage.setItem('Kaldik', JSON.stringify(k.records));

        localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl))
        KalendarPerSemester(v)

        
    });


}

const servertambah_tooltipkaldik = async (iRow, valueKet, valueTgl,ColoR,v) =>{
    url_absenkaldik = jlo.url_dataabsen + "?action=datakaldik&idss=" + jlo.ss_dataabsen;
    let dbS = JSON.parse(localStorage.getItem("Kaldik"));
    //let db = dbS.filter(s => s.idbaris)[0];
    
    
    let link = url_kaldikaja + "?action=tambahkaldik";
    let data = new FormData();
    data.append("idbariskaldik","");
    data.append("keterangan", valueKet);
    data.append("start_tgl", valueTgl)
    data.append("end_tgl", valueTgl);
    data.append("warna", ColoR)
    data.append('oleh', namauser);
    await fetch(link, {
        method: 'post',
        body: data
    }).then(m => m.json())
        .then(k => {
            alert(k)
        })
        .catch(err => console.log(err));

    await fetch(url_absenkaldik).then(m => m.json()).then(k => {

        
        console.log(k)
        arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
        arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

        localStorage.setItem('Kaldik', JSON.stringify(k.records));

        localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl))

        KalendarPerSemester(v)
        
    });


}
const serverhapus_tooltipkaldik = async (iRow,v) =>{
    // let konfirm = confirm("Anda yakin ingin menghapus kalender pendidikan tertanggal ini? \n\n Klik OK untuk menghapus \n Klik CANCEL untuk membatalkan")
    // if (!konfirm) {
    //     alert("Anda membatalkan penghapusan tanggal kalender");
    //     return;
    // }
    //alert("Anda menghapus tanggal pada baris di idss = " + (ind + 2))
    let brs = iRow;
    await fetch(url_kaldikaja + "?action=hapuskaldik&idbaris=" + brs, {
        method: "post"
    }).then(m => m.json())
        .then(k => {
            alert(k);

        })
        .catch(f => alert(f))

    await fetch(url_absenkaldik).then(m => m.json()).then(k => {

        
        //console.log(k)
        arrayStringTglLibur = k.stringTgl.map(m => Object.keys(m)).reduce((a, b) => a.concat(b));
        arrayKetLibur = k.stringTgl.map(m => Object.keys(m).map(n => m[n])).reduce((a, b) => a.concat(b));

        localStorage.setItem('Kaldik', JSON.stringify(k.records));

        localStorage.setItem('TglLibur', JSON.stringify(k.stringTgl))
        KalendarPerSemester(v);

        
    });


}
let tagJPserver;
let tagJPkey;
const cekJPserver =  async (v) =>{
    let tab = "HEB"
        let tabel = [[["idbaris"]]];
        let head = tabel[0];
        let key = JSON.stringify(head);
        let datakirim = new FormData();
        
        datakirim.append("tab",tab);
        datakirim.append("key",key);
    try {
        let m = await fetch(url_kaldikaja + "?action=getpostdatafromtab", {
            method: "post",
            body: datakirim
        });
        let k = await m.json();
        //console.log(k);
        tagJPserver = k.data.filter(s => s.semester == v && s.jenjangkelas == idJenjang);
        localStorage.setItem("loc_tagJPserver_"+v,JSON.stringify(tagJPserver));
        if(tagJPserver.length == 0){
            tagJPkey = {"idbaris":"0","jenjangkelas":"0","semester":"","mapeltema":"","kodemapel":"","jp_sn":"","jp_sl":"","jp_rb":"","jp_km":"","jp_jm":""};
        }else{
            tagJPkey = k.data[0];

        }

    } catch (er) {
        return console.log(er);
    }
}
let semesterfokusheb 
const admkaldikHEB_pilihSemester = document.querySelectorAll("input[name=admkaldikHEB_pilihSemester]");
admkaldikHEB_pilihSemester.forEach(el =>{
    
    
    el.addEventListener("click", async function(){
        let v = el.value;
        loadingtopbarin("loadingtopbar");
        await cekJPserver(v)
        

        html_admkaldikHEB_pilihSemester(v);
        
        clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
            setTimeout(() => {
                divlod.style.width = "1px"
                divlod.className += " w3-hide";

            }, 3000);
    })
});
const html_admkaldikHEB_pilihSemester = (semester)=>{
    try{

            let v = semester;
            let th = idTeksTapel.split("/");
            let thfokus = th[v-1];
            let indekbulan1 = [0,1,2,3,4,5];
            let indekbulan0 = [6,7,8,9,10,11];
            let arrIndeks = v ==1 ?indekbulan0:indekbulan1;
            document.querySelector(".h2_admHBE").innerHTML = "TAHUN PELAJARAN " + idTeksTapel + " SEMESTER " + semester;
            document.querySelector(".h3_admHBE").innerHTML = "KELAS " + idNamaKelas;
        document.querySelector(".namasekolah_admHBE").innerHTML = idNamaSekolah;
        document.querySelector(".namakepsek_admHBE").innerHTML = idNamaKepsek;
        document.querySelector(".nipkesek_admHBE").innerHTML = idNipKepsek;
        document.querySelector(".titimangsa_admHBE").innerHTML = tanggalfull(new Date());
        document.querySelector(".jenisguru_admHBE").innerHTML = idJenisGuru + " " + idgurumapelmapel;
        document.querySelector(".namaguru_admHBE").innerHTML = namauser;
        document.querySelector(".nipguru_admHBE").innerHTML = idNipGuruKelas==""?"-":"NIP. "+idNipGuruKelas;
        
        
        
        let tabel1 = document.querySelector(".tabelhari_admHBE");
        let tbody1 = tabel1.getElementsByTagName("tbody")[0];
        let tfoot1 = tabel1.getElementsByTagName("tbody")[1];
        let tabel2 = document.querySelector(".tabelhari_admJBE");
        let tbody2 = tabel2.getElementsByTagName("tbody")[0];
        let tfoot2 = tabel2.getElementsByTagName("tbody")[1];
        
        let jjg;
        if(idJenjang > 3){
            jjg ="tinggi";
        }else{
            jjg = "rendah";
        }
        let arrTemaRendahGanjil = ["TEMA 1","TEMA 2","TEMA 3","TEMA 4"];
        let arrTemaRendahGenap = ["TEMA 5","TEMA 6","TEMA 7","TEMA 8"];
        let arrTemaTinggiGanjil = ["TEMA 1","TEMA 2","TEMA 3","TEMA 4","TEMA 5"];
        let arrTemaTinggiGenap = ["TEMA 6","TEMA 7","TEMA 8","TEMA 9"];
        let arrCodeMapelRendah = ["PKN","BINDO","MTK","SBDP","PJOK"];
        let arrCodeMapelTinggi = ["PKN","BINDO","IPA","IPS","SBDP"];
        let arrHeaderTinggi = ["PKN","Bahasa Indonesia","IPA","IPS","SBDP"]
        let arrHeaderRendah = ["PKN","Bahasa Indonesia","MATEMATIKA","SBDP","PJOK"];
        let ltd;
        let fl;
        
        let konftema;
        let konfmapel;
        let konfheader;
        if(semester == 1 && jjg == "tinggi"){
            konftema = arrTemaTinggiGanjil;
            konfmapel = arrCodeMapelTinggi;
            konfheader = arrHeaderTinggi;
            // ltd = 3
        }else if(semester == 2 && jjg == "tinggi"){
            konftema = arrTemaTinggiGenap;
            konfmapel = arrCodeMapelTinggi;
            konfheader = arrHeaderTinggi
            // ltd = 3
        }else if(semester == 1 && jjg == "rendah"){
            // ltd = 4
            konftema = arrTemaRendahGanjil
            konfmapel = arrCodeMapelRendah;
            konfheader = arrHeaderRendah
        }else if(semester == 2 && jjg == "rendah"){
            // ltd = 4
            konftema = arrTemaRendahGenap
            konfmapel = arrCodeMapelRendah;
            konfheader = arrHeaderRendah
        }
        let objHEB = {};
        let bulan = [];
        let r = 0;
        let col_sn = 0;
        let col_sl = 0;
        let col_rb = 0;
        let col_km = 0;
        let col_jm = 0;
        let col_total = 0
        for(a = 0 ; a < arrIndeks.length ; a++){ //array semester = tabel
            let indekbulan = arrIndeks[a];
            let bln = parseInt(indekbulan+1);
            let namaBulan = NamaBulandariIndex(indekbulan);
            //isikan ke tabel';
            tbody1.rows[r].cells[0].innerHTML = namaBulan + " " + thfokus;
            let lr = daysInMonth(bln, thfokus);
            let sn = 0, sl=0, rb=0,km=0,jm=0;
            let tot = 0;
            for(b = 0 ; b < lr; b++){ // tgl dalam bulan
                let dt = new Date(thfokus, indekbulan, (b+1));
                let d = dt.getDay();
                if(d == 1 && cocoklibur(dt)== false){
                    sn++;
                    tot++;
                }
                if(d == 2 && cocoklibur(dt) == false){
                    sl++;
                    tot++;
                }
                
                if(d == 3 && cocoklibur(dt)==false){
                    rb++;
                    tot++;
                }
                
                if(d == 4 && cocoklibur(dt)==false){
                    km++;
                    tot++;
                }
                
                if(d == 5 && cocoklibur(dt)==false){
                    jm++;
                    tot++;
                }
                
                
            }
            tbody1.rows[r].cells[1].innerHTML = sn;
            tbody1.rows[r].cells[2].innerHTML = sl;
            tbody1.rows[r].cells[3].innerHTML = rb;
            tbody1.rows[r].cells[4].innerHTML = km;
            tbody1.rows[r].cells[5].innerHTML = jm;
            tbody1.rows[r].cells[6].innerHTML = tot +" hari.";
            // isiuntuk kolom baris akhir;
            let hari = {};
            hari.sn = sn;
            hari.sl = sl;
            hari.rb = rb;
            hari.km = km;
            hari.jm = jm;
            hari.total = tot;

            // isikan kolom
            col_sn += sn;
            col_sl += sl;
            col_rb += rb;
            col_km += km;
            col_jm += jm;
            col_total += tot;
            // isikan untuk objek 
            //bulan.push(hari);
            objHEB[namaBulan]=hari;
            r++;
        }
        tfoot1.rows[0].cells[1].innerHTML = col_sn +" hari.";
        tfoot1.rows[0].cells[2].innerHTML = col_sl +" hari.";
        tfoot1.rows[0].cells[3].innerHTML = col_rb +" hari.";
        tfoot1.rows[0].cells[4].innerHTML = col_km +" hari.";
        tfoot1.rows[0].cells[5].innerHTML = col_jm +" hari.";
        tfoot1.rows[0].cells[6].innerHTML = col_total +" hari.";

        tfoot1.rows[1].cells[1].innerHTML = (col_sn * 7) +" JP.";
        tfoot1.rows[1].cells[2].innerHTML = (col_sl * 7) +" JP.";
        tfoot1.rows[1].cells[3].innerHTML = (col_rb * 7) +" JP.";
        tfoot1.rows[1].cells[4].innerHTML = (col_km * 7) +" JP.";
        tfoot1.rows[1].cells[5].innerHTML = (col_jm * 7) +" JP.";
        tfoot1.rows[1].cells[6].innerHTML = (col_total * 7) +" JP.";
        let objTotal = {};
        objTotal.sn = col_sn;
        objTotal.sl = col_sl;
        objTotal.rb = col_rb;
        objTotal.km = col_km;
        objTotal.jm = col_jm;
        objTotal.total = col_total;
        
        //asumsikan data server di sini belum ada:
        //tabel kedua
        let html = "";
        // pelajaran agama:
        let dbT = tagkdserver.filter(s => s.semester.indexOf(v)>-1 && s.koleksitema !== "");
        let dBT_PAI = dbT.filter(s => s.mapel == "PAI").length;
        let dBT_PKRIS = dbT.filter(s => s.mapel == "PKRIS").length;
        let dBT_PKATO = dbT.filter(s => s.mapel == "PKATO").length;
        let dBT_PKN = dbT.filter(s => s.mapel == "PKN").length;
        let dBT_BINDO = dbT.filter(s => s.mapel == "BINDO").length;
        let dBT_MTK = dbT.filter(s => s.mapel == "MTK").length;
        let dBT_IPA = dbT.filter(s => s.mapel == "IPA").length;
        let dBT_IPS = dbT.filter(s => s.mapel == "IPS").length;
        let dBT_SBDP = dbT.filter(s => s.mapel == "SBDP").length;
        let dBT_PJOK = dbT.filter(s => s.mapel == "PJOK").length;
        let dBT_BSUND = dbT.filter(s => s.mapel == "BSUND").length;
        let sRow_PAI = tagJPserver.filter(s => s.kodemapel == "PAI" && s.semester == v);
        
        let rBol = sRow_PAI.length == 0 ? false : true;
        let sn1, sl2, rb3, km4, jm5,tot6
        // Buat global:
        let MPfokus, sRow_MP,rBool;
        if(idgurumapelmapel == "PAI"){
            html += `<tr class="w3-yellow"><td>PA Islam & BP</td><td>${dBT_PAI}</td><td>Nontematik</td>`;
        }else{
            html += `<tr><td>PA Islam & BP</td><td>${dBT_PAI}</td><td>Nontematik</td>`
        }
        if(rBol){
            html+=`<td data-jpCodeMapel="PAI" data-jpDay="jp_sn" data-jpRow="${sRow_PAI[0].idbaris}">${sRow_PAI[0].jp_sn}</td>
                <td data-jpCodeMapel="PAI" data-jpDay="jp_sl" data-jpRow="${sRow_PAI[0].idbaris}">${sRow_PAI[0].jp_sl}</td>
                <td data-jpCodeMapel="PAI" data-jpDay="jp_rb" data-jpRow="${sRow_PAI[0].idbaris}">${sRow_PAI[0].jp_rb}</td>
                <td data-jpCodeMapel="PAI" data-jpDay="jp_km" data-jpRow="${sRow_PAI[0].idbaris}">${sRow_PAI[0].jp_km}</td>
                <td data-jpCodeMapel="PAI" data-jpDay="jp_jm" data-jpRow="${sRow_PAI[0].idbaris}">${sRow_PAI[0].jp_jm}</td>
                <td> ${sRow_PAI[0].jp_sn==""?"":sRow_PAI[0].jp_sn * col_sn}</td>
                <td> ${sRow_PAI[0].jp_sl==""?"":sRow_PAI[0].jp_sl * col_sl}</td>
                <td> ${sRow_PAI[0].jp_rb==""?"":sRow_PAI[0].jp_rb * col_rb}</td>
                <td> ${sRow_PAI[0].jp_km==""?"":sRow_PAI[0].jp_km * col_km}</td>
                <td> ${sRow_PAI[0].jp_jm==""?"":sRow_PAI[0].jp_jm * col_jm}</td>`;
            sn1 = sRow_PAI[0].jp_sn==""?0:sRow_PAI[0].jp_sn * col_sn;
            sl2 = sRow_PAI[0].jp_sl==""?0:sRow_PAI[0].jp_sl * col_sl;
            rb3 = sRow_PAI[0].jp_rb==""?0:sRow_PAI[0].jp_rb * col_rb;
            km4 = sRow_PAI[0].jp_km==""?0:sRow_PAI[0].jp_km * col_km;
            jm5 = sRow_PAI[0].jp_jm==""?0:sRow_PAI[0].jp_jm * col_jm;
            tot6 = (parseInt(sn1) + parseInt(sl2) + parseInt(rb3) + parseInt(km4) + parseInt(jm5));
            
            html +=`<td>${tot6}</td></tr>`;
        }else{
            html+=`<td data-jpCodeMapel="PAI" data-jpDay="jp_sn"></td>
            <td data-jpCodeMapel="PAI"  data-jpDay="jp_sl"></td>
            <td data-jpCodeMapel="PAI" data-jpDay="jp_rb"></td>
            <td data-jpCodeMapel="PAI" data-jpDay="jp_km" ></td>
            <td data-jpCodeMapel="PAI" data-jpDay="jp_jm"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td></tr>`;
        }


        
        MPfokus = "PKRIS";
        sRow_MP = tagJPserver.filter(s => s.kodemapel == MPfokus && s.semester == v);
        rBool = sRow_MP.length == 0 ? false : true;
        
        if(idgurumapelmapel == MPfokus){
            html += `<tr class="w3-yellow"><td>PA Kristen & BP</td><td>${dBT_PKRIS}</td><td>Nontematik</td>`;
        }else{
            html += `<tr><td>PA Kristen & BP</td><td>${dBT_PKRIS}</td><td>Nontematik</td>`
        }
        if(rBool){
            html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sn}</td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sl" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sl}</td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_rb}</td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_km}</td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_jm}</td>
                <td> ${sRow_MP[0].jp_sn==""?"":sRow_MP[0].jp_sn * col_sn}</td>
                <td> ${sRow_MP[0].jp_sl==""?"":sRow_MP[0].jp_sl * col_sl}</td>
                <td> ${sRow_MP[0].jp_rb==""?"":sRow_MP[0].jp_rb * col_rb}</td>
                <td> ${sRow_MP[0].jp_km==""?"":sRow_MP[0].jp_km * col_km}</td>
                <td> ${sRow_MP[0].jp_jm==""?"":sRow_MP[0].jp_jm * col_jm}</td>`;
            sn1 = sRow_MP[0].jp_sn==""?0:sRow_MP[0].jp_sn * col_sn;
            sl2 = sRow_MP[0].jp_sl==""?0:sRow_MP[0].jp_sl * col_sl;
            rb3 = sRow_MP[0].jp_rb==""?0:sRow_MP[0].jp_rb * col_rb;
            km4 = sRow_MP[0].jp_km==""?0:sRow_MP[0].jp_km * col_km;
            jm5 = sRow_MP[0].jp_jm==""?0:sRow_MP[0].jp_jm * col_jm;
            tot6 = (parseInt(sn1) + parseInt(sl2) + parseInt(rb3) + parseInt(km4) + parseInt(jm5));
            
            html +=`<td>${tot6}</td></tr>`;
        }else{
            html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn"></td>
            <td data-jpCodeMapel="${MPfokus}"  data-jpDay="jp_sl"></td>
            <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb"></td>
            <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" ></td>
            <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td></tr>`;
        }

        MPfokus = "PKATO";
        sRow_MP = tagJPserver.filter(s => s.kodemapel == MPfokus && s.semester == v);
        rBool = sRow_MP.length == 0 ? false : true;
        
        if(idgurumapelmapel == MPfokus){
            html += `<tr class="w3-yellow"><td>PA Katolik & BP</td><td>${dBT_PKRIS}</td><td>Nontematik</td>`;
        }else{
            html += `<tr><td>PA Katolik & BP</td><td>${dBT_PKRIS}</td><td>Nontematik</td>`
        }
        if(rBool){
            html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sn}</td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sl" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sl}</td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_rb}</td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_km}</td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_jm}</td>
                <td> ${sRow_MP[0].jp_sn==""?"":sRow_MP[0].jp_sn * col_sn}</td>
                <td> ${sRow_MP[0].jp_sl==""?"":sRow_MP[0].jp_sl * col_sl}</td>
                <td> ${sRow_MP[0].jp_rb==""?"":sRow_MP[0].jp_rb * col_rb}</td>
                <td> ${sRow_MP[0].jp_km==""?"":sRow_MP[0].jp_km * col_km}</td>
                <td> ${sRow_MP[0].jp_jm==""?"":sRow_MP[0].jp_jm * col_jm}</td>`;
            sn1 = sRow_MP[0].jp_sn==""?0:sRow_MP[0].jp_sn * col_sn;
            sl2 = sRow_MP[0].jp_sl==""?0:sRow_MP[0].jp_sl * col_sl;
            rb3 = sRow_MP[0].jp_rb==""?0:sRow_MP[0].jp_rb * col_rb;
            km4 = sRow_MP[0].jp_km==""?0:sRow_MP[0].jp_km * col_km;
            jm5 = sRow_MP[0].jp_jm==""?0:sRow_MP[0].jp_jm * col_jm;
            tot6 = (parseInt(sn1) + parseInt(sl2) + parseInt(rb3) + parseInt(km4) + parseInt(jm5));
            
            html +=`<td>${tot6}</td></tr>`;
        }else{
            html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn"></td>
            <td data-jpCodeMapel="${MPfokus}"  data-jpDay="jp_sl"></td>
            <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb"></td>
            <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" ></td>
            <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td></tr>`;
        }
        //pkn
        MPfokus = "PKN";
        sRow_MP = tagJPserver.filter(s => s.kodemapel == MPfokus && s.semester == v);
        rBool = sRow_MP.length == 0 ? false : true;
    let collTemaPKN = dbT.filter(s => s.mapel == "PKN").map(m=> JSON.parse(m.koleksitema)).reduce((a,b)=>a.concat(b)).filter(s => konftema.indexOf(s)>-1).filter((a, b, c) => c.indexOf(a) == b).sort().join(", ")
        
        html += `<tr><td>${MPfokus}</td><td>${dBT_PKN}</td><td>${collTemaPKN}</td>`;
        if(rBool){
            html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sn}</td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sl" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sl}</td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_rb}</td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_km}</td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_jm}</td>
                <td> ${sRow_MP[0].jp_sn==""?"":sRow_MP[0].jp_sn * col_sn}</td>
                <td> ${sRow_MP[0].jp_sl==""?"":sRow_MP[0].jp_sl * col_sl}</td>
                <td> ${sRow_MP[0].jp_rb==""?"":sRow_MP[0].jp_rb * col_rb}</td>
                <td> ${sRow_MP[0].jp_km==""?"":sRow_MP[0].jp_km * col_km}</td>
                <td> ${sRow_MP[0].jp_jm==""?"":sRow_MP[0].jp_jm * col_jm}</td>`;
            sn1 = sRow_MP[0].jp_sn==""?0:sRow_MP[0].jp_sn * col_sn;
            sl2 = sRow_MP[0].jp_sl==""?0:sRow_MP[0].jp_sl * col_sl;
            rb3 = sRow_MP[0].jp_rb==""?0:sRow_MP[0].jp_rb * col_rb;
            km4 = sRow_MP[0].jp_km==""?0:sRow_MP[0].jp_km * col_km;
            jm5 = sRow_MP[0].jp_jm==""?0:sRow_MP[0].jp_jm * col_jm;
            tot6 = (parseInt(sn1) + parseInt(sl2) + parseInt(rb3) + parseInt(km4) + parseInt(jm5));
            
            html +=`<td>${tot6}</td></tr>`;
        }else{
            html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn"></td>
            <td data-jpCodeMapel="${MPfokus}"  data-jpDay="jp_sl"></td>
            <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb"></td>
            <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" ></td>
            <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td></tr>`;
        }
        
        
        //bindo
        let collTemaBINDO = dbT.filter(s => s.mapel == "BINDO").map(m=> JSON.parse(m.koleksitema)).reduce((a,b)=>a.concat(b)).filter(s => konftema.indexOf(s)>-1).filter((a, b, c) => c.indexOf(a) == b).sort().join(", ")
        MPfokus = "BINDO";
        sRow_MP = tagJPserver.filter(s => s.kodemapel == MPfokus && s.semester == v);
        rBool = sRow_MP.length == 0 ? false : true;
        html += `<tr><td>Bahasa Indonesia</td><td>${dBT_BINDO}</td><td>${collTemaBINDO}</td>`;
        if(rBool){
            html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sn}</td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sl" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sl}</td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_rb}</td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_km}</td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_jm}</td>
                <td> ${sRow_MP[0].jp_sn==""?"":sRow_MP[0].jp_sn * col_sn}</td>
                <td> ${sRow_MP[0].jp_sl==""?"":sRow_MP[0].jp_sl * col_sl}</td>
                <td> ${sRow_MP[0].jp_rb==""?"":sRow_MP[0].jp_rb * col_rb}</td>
                <td> ${sRow_MP[0].jp_km==""?"":sRow_MP[0].jp_km * col_km}</td>
                <td> ${sRow_MP[0].jp_jm==""?"":sRow_MP[0].jp_jm * col_jm}</td>`;
            sn1 = sRow_MP[0].jp_sn==""?0:sRow_MP[0].jp_sn * col_sn;
            sl2 = sRow_MP[0].jp_sl==""?0:sRow_MP[0].jp_sl * col_sl;
            rb3 = sRow_MP[0].jp_rb==""?0:sRow_MP[0].jp_rb * col_rb;
            km4 = sRow_MP[0].jp_km==""?0:sRow_MP[0].jp_km * col_km;
            jm5 = sRow_MP[0].jp_jm==""?0:sRow_MP[0].jp_jm * col_jm;
            tot6 = (parseInt(sn1) + parseInt(sl2) + parseInt(rb3) + parseInt(km4) + parseInt(jm5));
            
            html +=`<td>${tot6}</td></tr>`;
        }else{
            html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn"></td>
            <td data-jpCodeMapel="${MPfokus}"  data-jpDay="jp_sl"></td>
            <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb"></td>
            <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" ></td>
            <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td></tr>`;
        }
        
            //MTK
        if(jjg == "tinggi"){
            MPfokus = "MTK";
            sRow_MP = tagJPserver.filter(s => s.kodemapel == MPfokus && s.semester == v);
            rBool = sRow_MP.length == 0 ? false : true;
            
            
            html += `<tr><td>Matematika</td><td>${dBT_MTK}</td><td>Nontematik</td>`
                
                if(rBool){
                    html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sn}</td>
                        <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sl" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sl}</td>
                        <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_rb}</td>
                        <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_km}</td>
                        <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_jm}</td>
                        <td> ${sRow_MP[0].jp_sn==""?"":sRow_MP[0].jp_sn * col_sn}</td>
                        <td> ${sRow_MP[0].jp_sl==""?"":sRow_MP[0].jp_sl * col_sl}</td>
                        <td> ${sRow_MP[0].jp_rb==""?"":sRow_MP[0].jp_rb * col_rb}</td>
                        <td> ${sRow_MP[0].jp_km==""?"":sRow_MP[0].jp_km * col_km}</td>
                        <td> ${sRow_MP[0].jp_jm==""?"":sRow_MP[0].jp_jm * col_jm}</td>`;
                    sn1 = sRow_MP[0].jp_sn==""?0:sRow_MP[0].jp_sn * col_sn;
                    sl2 = sRow_MP[0].jp_sl==""?0:sRow_MP[0].jp_sl * col_sl;
                    rb3 = sRow_MP[0].jp_rb==""?0:sRow_MP[0].jp_rb * col_rb;
                    km4 = sRow_MP[0].jp_km==""?0:sRow_MP[0].jp_km * col_km;
                    jm5 = sRow_MP[0].jp_jm==""?0:sRow_MP[0].jp_jm * col_jm;
                    tot6 = (parseInt(sn1) + parseInt(sl2) + parseInt(rb3) + parseInt(km4) + parseInt(jm5));
                    
                    html +=`<td>${tot6}</td></tr>`;
                }else{
                    html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn"></td>
                    <td data-jpCodeMapel="${MPfokus}"  data-jpDay="jp_sl"></td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb"></td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" ></td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td></tr>`;
                }
        }else{
            let collTemaMTK = dbT.filter(s => s.mapel == "MTK").map(m=> JSON.parse(m.koleksitema)).reduce((a,b)=>a.concat(b)).filter(s => konftema.indexOf(s)>-1).filter((a, b, c) => c.indexOf(a) == b).sort().join(", ")
                MPfokus = "MTK";
                sRow_MP = tagJPserver.filter(s => s.kodemapel == MPfokus && s.semester == v);
                rBool = sRow_MP.length == 0 ? false : true;
            
                
                html += `<tr><td>Matematika</td><td>${dBT_MTK}</td><td>${collTemaMTK}</td>`;
                if(rBool){
                    html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sn}</td>
                        <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sl" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sl}</td>
                        <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_rb}</td>
                        <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_km}</td>
                        <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_jm}</td>
                        <td> ${sRow_MP[0].jp_sn==""?"":sRow_MP[0].jp_sn * col_sn}</td>
                        <td> ${sRow_MP[0].jp_sl==""?"":sRow_MP[0].jp_sl * col_sl}</td>
                        <td> ${sRow_MP[0].jp_rb==""?"":sRow_MP[0].jp_rb * col_rb}</td>
                        <td> ${sRow_MP[0].jp_km==""?"":sRow_MP[0].jp_km * col_km}</td>
                        <td> ${sRow_MP[0].jp_jm==""?"":sRow_MP[0].jp_jm * col_jm}</td>`;
                    sn1 = sRow_MP[0].jp_sn==""?0:sRow_MP[0].jp_sn * col_sn;
                    sl2 = sRow_MP[0].jp_sl==""?0:sRow_MP[0].jp_sl * col_sl;
                    rb3 = sRow_MP[0].jp_rb==""?0:sRow_MP[0].jp_rb * col_rb;
                    km4 = sRow_MP[0].jp_km==""?0:sRow_MP[0].jp_km * col_km;
                    jm5 = sRow_MP[0].jp_jm==""?0:sRow_MP[0].jp_jm * col_jm;
                    tot6 = (parseInt(sn1) + parseInt(sl2) + parseInt(rb3) + parseInt(km4) + parseInt(jm5));
                    
                    html +=`<td>${tot6}</td></tr>`;
                }else{
                    html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn"></td>
                    <td data-jpCodeMapel="${MPfokus}"  data-jpDay="jp_sl"></td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb"></td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" ></td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td></tr>`;
                }
        };
        
        //IPA dan IPS (KELAS TINGGI ONLY)
        if(jjg == "tinggi"){   
            let collTemaIPA = dbT.filter(s => s.mapel == "IPA").map(m=> JSON.parse(m.koleksitema)).reduce((a,b)=>a.concat(b)).filter(s => konftema.indexOf(s)>-1).filter((a, b, c) => c.indexOf(a) == b).sort().join(", ")
            MPfokus = "IPA";
            sRow_MP = tagJPserver.filter(s => s.kodemapel == MPfokus && s.semester == v);
            rBool = sRow_MP.length == 0 ? false : true;
            html += `<tr><td>IPA</td><td>${dBT_IPA}</td><td>${collTemaIPA}</td>`;
            if(rBool){
                html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sn}</td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sl" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sl}</td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_rb}</td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_km}</td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_jm}</td>
                    <td> ${sRow_MP[0].jp_sn==""?"":sRow_MP[0].jp_sn * col_sn}</td>
                    <td> ${sRow_MP[0].jp_sl==""?"":sRow_MP[0].jp_sl * col_sl}</td>
                    <td> ${sRow_MP[0].jp_rb==""?"":sRow_MP[0].jp_rb * col_rb}</td>
                    <td> ${sRow_MP[0].jp_km==""?"":sRow_MP[0].jp_km * col_km}</td>
                    <td> ${sRow_MP[0].jp_jm==""?"":sRow_MP[0].jp_jm * col_jm}</td>`;
                sn1 = sRow_MP[0].jp_sn==""?0:sRow_MP[0].jp_sn * col_sn;
                sl2 = sRow_MP[0].jp_sl==""?0:sRow_MP[0].jp_sl * col_sl;
                rb3 = sRow_MP[0].jp_rb==""?0:sRow_MP[0].jp_rb * col_rb;
                km4 = sRow_MP[0].jp_km==""?0:sRow_MP[0].jp_km * col_km;
                jm5 = sRow_MP[0].jp_jm==""?0:sRow_MP[0].jp_jm * col_jm;
                tot6 = (parseInt(sn1) + parseInt(sl2) + parseInt(rb3) + parseInt(km4) + parseInt(jm5));
                
                html +=`<td>${tot6}</td></tr>`;
            }else{
                html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn"></td>
                <td data-jpCodeMapel="${MPfokus}"  data-jpDay="jp_sl"></td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb"></td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" ></td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td></tr>`;
            }
            let collTemaIPS = dbT.filter(s => s.mapel == "IPS").map(m=> JSON.parse(m.koleksitema)).reduce((a,b)=>a.concat(b)).filter(s => konftema.indexOf(s)>-1).filter((a, b, c) => c.indexOf(a) == b).sort().join(", ");
            MPfokus = "IPS";
            sRow_MP = tagJPserver.filter(s => s.kodemapel == MPfokus && s.semester == v);
            rBool = sRow_MP.length == 0 ? false : true;
            html += `<tr><td>IPS</td><td>${dBT_IPS}</td><td>${collTemaIPS}</td>`;
            if(rBool){
                html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sn}</td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sl" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sl}</td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_rb}</td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_km}</td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_jm}</td>
                    <td> ${sRow_MP[0].jp_sn==""?"":sRow_MP[0].jp_sn * col_sn}</td>
                    <td> ${sRow_MP[0].jp_sl==""?"":sRow_MP[0].jp_sl * col_sl}</td>
                    <td> ${sRow_MP[0].jp_rb==""?"":sRow_MP[0].jp_rb * col_rb}</td>
                    <td> ${sRow_MP[0].jp_km==""?"":sRow_MP[0].jp_km * col_km}</td>
                    <td> ${sRow_MP[0].jp_jm==""?"":sRow_MP[0].jp_jm * col_jm}</td>`;
                sn1 = sRow_MP[0].jp_sn==""?0:sRow_MP[0].jp_sn * col_sn;
                sl2 = sRow_MP[0].jp_sl==""?0:sRow_MP[0].jp_sl * col_sl;
                rb3 = sRow_MP[0].jp_rb==""?0:sRow_MP[0].jp_rb * col_rb;
                km4 = sRow_MP[0].jp_km==""?0:sRow_MP[0].jp_km * col_km;
                jm5 = sRow_MP[0].jp_jm==""?0:sRow_MP[0].jp_jm * col_jm;
                tot6 = (parseInt(sn1) + parseInt(sl2) + parseInt(rb3) + parseInt(km4) + parseInt(jm5));
                
                html +=`<td>${tot6}</td></tr>`;
            }else{
                html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn"></td>
                <td data-jpCodeMapel="${MPfokus}"  data-jpDay="jp_sl"></td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb"></td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" ></td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td></tr>`;
            }
        }
        //SBDP
        let collTemaSBDP = dbT.filter(s => s.mapel == "SBDP").map(m=> JSON.parse(m.koleksitema)).reduce((a,b)=>a.concat(b)).filter(s => konftema.indexOf(s)>-1).filter((a, b, c) => c.indexOf(a) == b).sort().join(", ")
            MPfokus = "SBDP";
            sRow_MP = tagJPserver.filter(s => s.kodemapel == MPfokus && s.semester == v);
            rBool = sRow_MP.length == 0 ? false : true;
            html += `<tr><td>SBDP</td><td>${dBT_SBDP}</td><td>${collTemaSBDP}</td>`;
            if(rBool){
                html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sn}</td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sl" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sl}</td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_rb}</td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_km}</td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_jm}</td>
                    <td> ${sRow_MP[0].jp_sn==""?"":sRow_MP[0].jp_sn * col_sn}</td>
                    <td> ${sRow_MP[0].jp_sl==""?"":sRow_MP[0].jp_sl * col_sl}</td>
                    <td> ${sRow_MP[0].jp_rb==""?"":sRow_MP[0].jp_rb * col_rb}</td>
                    <td> ${sRow_MP[0].jp_km==""?"":sRow_MP[0].jp_km * col_km}</td>
                    <td> ${sRow_MP[0].jp_jm==""?"":sRow_MP[0].jp_jm * col_jm}</td>`;
                sn1 = sRow_MP[0].jp_sn==""?0:sRow_MP[0].jp_sn * col_sn;
                sl2 = sRow_MP[0].jp_sl==""?0:sRow_MP[0].jp_sl * col_sl;
                rb3 = sRow_MP[0].jp_rb==""?0:sRow_MP[0].jp_rb * col_rb;
                km4 = sRow_MP[0].jp_km==""?0:sRow_MP[0].jp_km * col_km;
                jm5 = sRow_MP[0].jp_jm==""?0:sRow_MP[0].jp_jm * col_jm;
                tot6 = (parseInt(sn1) + parseInt(sl2) + parseInt(rb3) + parseInt(km4) + parseInt(jm5));
                
                html +=`<td>${tot6}</td></tr>`;
            }else{
                html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn"></td>
                <td data-jpCodeMapel="${MPfokus}"  data-jpDay="jp_sl"></td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb"></td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" ></td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td></tr>`;
            }

        if(jjg == "tinggi"){
            html += `<tr><td>PJOK</td><td>${dBT_PJOK}</td><td>Nontematik</td>`;
            MPfokus = "PJOK";
            sRow_MP = tagJPserver.filter(s => s.kodemapel == MPfokus && s.semester == v);
            rBool = sRow_MP.length == 0 ? false : true;
            if(rBool){
                html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sn}</td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sl" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sl}</td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_rb}</td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_km}</td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_jm}</td>
                    <td> ${sRow_MP[0].jp_sn==""?"":sRow_MP[0].jp_sn * col_sn}</td>
                    <td> ${sRow_MP[0].jp_sl==""?"":sRow_MP[0].jp_sl * col_sl}</td>
                    <td> ${sRow_MP[0].jp_rb==""?"":sRow_MP[0].jp_rb * col_rb}</td>
                    <td> ${sRow_MP[0].jp_km==""?"":sRow_MP[0].jp_km * col_km}</td>
                    <td> ${sRow_MP[0].jp_jm==""?"":sRow_MP[0].jp_jm * col_jm}</td>`;
                sn1 = sRow_MP[0].jp_sn==""?0:sRow_MP[0].jp_sn * col_sn;
                sl2 = sRow_MP[0].jp_sl==""?0:sRow_MP[0].jp_sl * col_sl;
                rb3 = sRow_MP[0].jp_rb==""?0:sRow_MP[0].jp_rb * col_rb;
                km4 = sRow_MP[0].jp_km==""?0:sRow_MP[0].jp_km * col_km;
                jm5 = sRow_MP[0].jp_jm==""?0:sRow_MP[0].jp_jm * col_jm;
                tot6 = (parseInt(sn1) + parseInt(sl2) + parseInt(rb3) + parseInt(km4) + parseInt(jm5));
                
                html +=`<td>${tot6}</td></tr>`;
            }else{
                html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn"></td>
                <td data-jpCodeMapel="${MPfokus}"  data-jpDay="jp_sl"></td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb"></td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" ></td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td></tr>`;
            }
        }else{
            let collTemaPJOK = dbT.filter(s => s.mapel == "PJOK").map(m=> JSON.parse(m.koleksitema)).reduce((a,b)=>a.concat(b)).filter(s => konftema.indexOf(s)>-1).filter((a, b, c) => c.indexOf(a) == b).sort().join(", ")
            MPfokus = "PJOK";
            sRow_MP = tagJPserver.filter(s => s.kodemapel == MPfokus && s.semester == v);
            rBool = sRow_MP.length == 0 ? false : true;
            html += `<tr><td>PJOK</td><td>${dBT_PJOK}</td><td>${collTemaPJOK}</td>`;
            if(rBool){
                html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sn}</td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sl" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sl}</td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_rb}</td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_km}</td>
                    <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_jm}</td>
                    <td> ${sRow_MP[0].jp_sn==""?"":sRow_MP[0].jp_sn * col_sn}</td>
                    <td> ${sRow_MP[0].jp_sl==""?"":sRow_MP[0].jp_sl * col_sl}</td>
                    <td> ${sRow_MP[0].jp_rb==""?"":sRow_MP[0].jp_rb * col_rb}</td>
                    <td> ${sRow_MP[0].jp_km==""?"":sRow_MP[0].jp_km * col_km}</td>
                    <td> ${sRow_MP[0].jp_jm==""?"":sRow_MP[0].jp_jm * col_jm}</td>`;
                sn1 = sRow_MP[0].jp_sn==""?0:sRow_MP[0].jp_sn * col_sn;
                sl2 = sRow_MP[0].jp_sl==""?0:sRow_MP[0].jp_sl * col_sl;
                rb3 = sRow_MP[0].jp_rb==""?0:sRow_MP[0].jp_rb * col_rb;
                km4 = sRow_MP[0].jp_km==""?0:sRow_MP[0].jp_km * col_km;
                jm5 = sRow_MP[0].jp_jm==""?0:sRow_MP[0].jp_jm * col_jm;
                tot6 = (parseInt(sn1) + parseInt(sl2) + parseInt(rb3) + parseInt(km4) + parseInt(jm5));
                
                html +=`<td>${tot6}</td></tr>`;
            }else{
                html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn"></td>
                <td data-jpCodeMapel="${MPfokus}"  data-jpDay="jp_sl"></td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb"></td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" ></td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td></tr>`;
            }
        }
        // BSUND
        MPfokus = "BSUND";
        sRow_MP = tagJPserver.filter(s => s.kodemapel == MPfokus && s.semester == v);
        rBool = sRow_MP.length == 0 ? false : true;
        html += `<tr><td>Bahasa dan Sastra Sunda</td><td>${dBT_BSUND}</td><td>Nontematik</td>`;
        if(rBool){
            html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sn}</td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sl" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_sl}</td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_rb}</td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_km}</td>
                <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm" data-jpRow="${sRow_MP[0].idbaris}">${sRow_MP[0].jp_jm}</td>
                <td> ${sRow_MP[0].jp_sn==""?"":sRow_MP[0].jp_sn * col_sn}</td>
                <td> ${sRow_MP[0].jp_sl==""?"":sRow_MP[0].jp_sl * col_sl}</td>
                <td> ${sRow_MP[0].jp_rb==""?"":sRow_MP[0].jp_rb * col_rb}</td>
                <td> ${sRow_MP[0].jp_km==""?"":sRow_MP[0].jp_km * col_km}</td>
                <td> ${sRow_MP[0].jp_jm==""?"":sRow_MP[0].jp_jm * col_jm}</td>`;
            sn1 = sRow_MP[0].jp_sn==""?0:sRow_MP[0].jp_sn * col_sn;
            sl2 = sRow_MP[0].jp_sl==""?0:sRow_MP[0].jp_sl * col_sl;
            rb3 = sRow_MP[0].jp_rb==""?0:sRow_MP[0].jp_rb * col_rb;
            km4 = sRow_MP[0].jp_km==""?0:sRow_MP[0].jp_km * col_km;
            jm5 = sRow_MP[0].jp_jm==""?0:sRow_MP[0].jp_jm * col_jm;
            tot6 = (parseInt(sn1) + parseInt(sl2) + parseInt(rb3) + parseInt(km4) + parseInt(jm5));
            
            html +=`<td>${tot6}</td></tr>`;
        }else{
            html+=`<td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_sn"></td>
            <td data-jpCodeMapel="${MPfokus}"  data-jpDay="jp_sl"></td>
            <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_rb"></td>
            <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_km" ></td>
            <td data-jpCodeMapel="${MPfokus}" data-jpDay="jp_jm"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td></tr>`;
        }
        
        
        tbody2.innerHTML = html;
        
        config_tabelhari_admJBE(true, semester);
        
    }catch(er){
        let tabel2 = document.querySelector(".tabelhari_admJBE");
        let tbody2 = tabel2.getElementsByTagName("tbody")[0];
        tbody2.innerHTML = "<tr><td colspan='14'>Belum bisa diakses, lengkapi KD di setiap mapel tematik. Minimal Anda isi satu tema.</td></tr>";
        config_tabelhari_admJBE(false, semester);
        alert("Pemetaan KD untuk semester ini belum diatur. Silakan atur, di menu Pemetaan KD pada sub 'Distribusi KD' ");
    }
}

let config_tabelhari_admJBE = (bol,semester) => {
    let tabel = document.querySelector(".tabelhari_admJBE");
    let tbody= tabel.getElementsByTagName("tbody")[0];
    let lRow = tbody.rows;
    for(i = 0 ; i < lRow.length ; i++){
        let lCol = lRow[i].cells;
        for(j = 0 ; j < lCol.length ; j++){
            let td = lCol[j];
            
            let iRow;// = this.parentElement.rowIndex;
            let iCol;// = this.cellIndex;
            if(bol){
                        
                        td.onmouseover = function(){
                            iRow = this.parentElement.rowIndex-2;
                            iCol = this.cellIndex;
                            let title = "Indek baris= " + iRow +" Indek kolom= " + iCol;
                            this.setAttribute("title",title);
                        }
                        td.onmouseout = function(){
                            this.removeAttribute("title");
                        }
                        td.onclick = function () {
                            iRow = this.parentElement.rowIndex-2;
                            iCol = this.cellIndex;
                            let tdfokus = this;
                            let tool = document.getElementById("tooltipHBE");
                            let lTop = (tabel.offsetTop + this.offsetTop+ this.offsetHeight +10) +"px";
                            let lLeft = (tabel.offsetLeft + this.offsetLeft + this.offsetWidth - 90) + "px";
                            let lebarwindow = document.querySelector(".tesbody").offsetWidth;
                            let inJP = document.getElementById("num_JP");
                            let svJP = document.querySelector(".btn_simpanJP");
                            let hpsJP = document.querySelector(".btn_hapusJP");
                            
                            tool.style.left = lLeft;
                            tool.style.top = lTop;
                            if(iCol > 2 && iCol < 8){
                            tool.style.display = "block";
                        }else{
                            tool.style.display = "none";
                        }
                        svJP.onclick = function(){
                            //jika tidak ada databaris, maka ditambahkan
                            //jika ada databaris, maka diedit
                            let val = inJP.value;
                            let rr, keyhari = tdfokus.getAttribute("data-jpDay");
                            let rCM =tdfokus.getAttribute("data-jpcodemapel");
                            let colThm = tbody.rows[iRow].cells[2].innerHTML;
                            if(tdfokus.hasAttribute("data-jprow")){
                                //edit:
                                rr = tdfokus.getAttribute("data-jprow");
                                saveServerJP(semester,rr,val,keyhari,rCM, colThm);
                            }else{
                                rr = "";
                                saveServerJP(semester,rr,val,keyhari,rCM, colThm);
                                tool.style.display = "none";
                            }
                            
                        }
                        //jika hapus!
                        hpsJP.onclick = function (){
                            let val = ""
                            let rr, keyhari = tdfokus.getAttribute("data-jpDay");
                            let rCM =tdfokus.getAttribute("data-jpcodemapel");
                            let colThm = tbody.rows[iRow].cells[2].innerHTML;
                            if(tdfokus.hasAttribute("data-jprow")){
                                //edit:
                                rr = tdfokus.getAttribute("data-jprow");
                                saveServerJP(semester,rr,val,keyhari,rCM, colThm);
                                tool.style.display = "none";
                                
                            }else{
                                rr = "";
                                tool.style.display = "none";
                                alert("Anda tidak bisa menghapus data ini sebab tidak ada informasi di server kami!")
                                //saveServerJP(semester,rr,val,keyhari,rCM, colThm);
                            }
                        }

                        }
            }///end
        }
        
    }
    let toold = document.getElementById("tooltipHBE");
    dragElement(toold);
}
const saveServerJP = async(semester,baris, nilai,keyhari,rCM, colThm) =>{
    loadingtopbarin("loadingtopbar");
    let aksi ;
    let oKey = Object.keys(tagJPkey);
    let isibaru = {};
    if(baris == ""){
        aksi = url_kaldikaja +"?action=simpanbarisketaburut";
        
        for(i=0;i<oKey.length ; i++){
            let tkey = oKey[i];
            isibaru[tkey]="";
        }
        isibaru[keyhari] = nilai;
        isibaru.jenjangkelas=idJenjang;
        isibaru.semester = semester;
        isibaru.mapeltema= colThm;
        isibaru.kodemapel = rCM;
        //delete isibaru.idbaris;
        

    }else{
        aksi = url_kaldikaja +"?action=simpanbarisketabidbaris";
        let objek = tagJPserver.filter(s=> s.idbaris== baris)[0];
        let obb = {};
        obb[keyhari] = nilai;
        isibaru = Object.assign(objek,obb);

    }
        let tab = "HEB"
        //let tabel = [[["idbaris"],["kelas"],["jenjangkelas"],["semester"],["mapeltema"],["kodemapel"],["jp_sn"],["jp_sl"],["jp_rb"],["jp_km"],["jp_jm"],["indek_jadpel"]]];
        let head = Object.keys(isibaru);
        let isii = Object.values(isibaru);
        let key = JSON.stringify(head);
        let datakirim = new FormData();
        
        datakirim.append("tab",tab);
        datakirim.append("key",key);
        if(baris !== ""){
            datakirim.append("idbaris", baris)
        }else{
            isii.shift()
        }
        let isi = JSON.stringify(isii);
        datakirim.append("tabel",isi);
        //datakirim.append("tipe",tipe); kalo ada format tanggal, kasih aja
        fetch(aksi,{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
            
            console.log(r);
            tagJPserver = r.data.filter(s => s.semester == semester && s.jenjangkelas == idJenjang);
            localStorage.setItem("loc_tagJPserver_"+semester,JSON.stringify(tagJPserver));
            if(tagJPserver.length == 0){
                tagJPkey = {"idbaris":"0","jenjangkelas":"0","semester":"","mapeltema":"","kodemapel":"","jp_sn":"","jp_sl":"","jp_rb":"","jp_km":"","jp_jm":""};
            }else{
                tagJPkey = r.data[0];

            }
            html_admkaldikHEB_pilihSemester(semester);
            clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
            setTimeout(() => {
                divlod.style.width = "1px"
                divlod.className += " w3-hide";

            }, 3000);

        })
        .catch(er => console.log(er))
    
}


const printadm_admHBE = (c,portr=true) =>{
    //jaga-jaga untuk element class yang duplikat?
    let dom = document.querySelector("."+c);
    let indom = dom.innerHTML;//.textContent;
    
    let noSpace =indom.replace(/(\r\n|\n|\r)/gm, "").replace(/\s\s/g,"");
    let cCls = noSpace.replace("w3-col l5 s12 w3-tiny","w3-col l5 s4 w3-tiny")
    let cClss = cCls.replace("w3-col l7 s12 w3-tiny","w3-col l7 s8 w3-tiny")
    
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
    //head.innerHTML += `<style type="text/css"> .versii-table{width:950px;max-width:100%;border-collapse:collapse}.versi-table{width:auto;max-width:100%;border-collapse:collapse}.versi-table td,.versi-table th,.versi-table tr,.versii-table td,.versii-table th,.versii-table tr{border:1px solid #000;color:#000;padding:5px 10px 5px 10px}.versi-table th,.versii-table th{background-color:#eee;color:#00f;vertical-align:middle;text-align:center}.versi-table tr:nth-of-type(even) td,.versii-table tr:nth-of-type(even) td{border:0;background-color:#fff;border:1px solid #000}.versi-table tr:nth-of-type(odd) td,.versii-table tr:nth-of-type(odd) td{border:0;background-color:#eef;border:1px solid #000} .garis td,.garis th,.garis tr{border:0.5px solid rgb(119, 116, 116)} .garis th{border:1px solid #000;text-align:center;vertical-align:middle} </style>`;

    if(portr){
        head.innerHTML += `<style type="text/css" media="print">
        @media print {
            html,body{height:100%;width:100%;margin:0;padding:0}
            
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
    
    

    body.innerHTML = cClss//indom;//noSpace;

    window.frames["iframeprint"].focus();
    window.frames["iframeprint"].print();
}
let switch_jadwalmpelkalender = true; // true untuk Tematik, false untuk Mapel
let switch_jadpem_semester;
let switch_htmlsubtema4;
let switch_jikamapel;
const admtentatif_pilihSemester = document.querySelectorAll("input[name=admtentatif_pilihSemester]");
const rd_problemsubtema4 = document.querySelectorAll("input[name=rd_problemsubtema4]");
const rd_nontematik = document.querySelectorAll("input[name=rd_switchjadpemb");
const problem_subtema4 = document.querySelector(".problem_subtema4");
if(idJenjang>3){
    problem_subtema4.classList.remove("w3-hide");
    document.getElementById("rd_problemsubtema4Not").checked = true;
}else{
    document.getElementById("rd_problemsubtema4With").checked = true;
}
admtentatif_pilihSemester.forEach(el=>{
    if(el.checked){
        switch_jadpem_semester = el.value;
    }
    el.addEventListener("change",()=>{
        // khusus gmp
        if(window.location.href.indexOf("gmp.html")>-1){
            rd_nontematik.forEach(el=>{
                if(el.checked){
                    switch_jikamapel = el.value
                }
            })
            switch_jadwalmpelkalender = false;
        }
        // selesai khusus gmp
        switch_jadpem_semester = el.value;

        // console.log(switch_jadpem_semester);
        // console.log(switch_jadwalmpelkalender);
        html_jadwalpelajaran_kaldik(switch_jadwalmpelkalender,switch_jadpem_semester,switch_htmlsubtema4,switch_jikamapel);

    })
})
const switchjadpemb = (el)=>{
    let pilihanmapel = document.querySelector(".mapelswitchjadpemb");
    if(el.checked){
        switch_jadwalmpelkalender = true;
        document.getElementById("ketswitchjadpemb").innerHTML = "TEMATIK";
        switch_jikamapel ="TEMATIK";
        pilihanmapel.classList.add("w3-hide");
        if(idJenjang > 3){
            problem_subtema4.classList.remove("w3-hide");
        }else{
            if(problem_subtema4.className.indexOf("w3-hide")==-1){
                problem_subtema4.classList.add("w3-hide");
            }
        }
        
    }else{
        switch_jadwalmpelkalender = false;
        document.getElementById("ketswitchjadpemb").innerHTML = "MATA PELAJARAN";
        
        pilihanmapel.classList.remove("w3-hide");
        
        if(problem_subtema4.className.indexOf("w3-hide")==-1){
            problem_subtema4.classList.add("w3-hide");
        }
       
    }

    if(switch_jadpem_semester == undefined){
        document.querySelector("#admtentatif_pilihSemester2").checked = true;
    }
    html_jadwalpelajaran_kaldik(switch_jadwalmpelkalender,switch_jadpem_semester,switch_htmlsubtema4,switch_jikamapel);
        
}
//jika kelas tinggi yang ga ada subtema 4
rd_problemsubtema4.forEach(el=>{
    if(el.checked){
        switch_htmlsubtema4 = el.value
    }
    el.addEventListener("change",()=>{
        if(switch_jadpem_semester == undefined){
            document.querySelector("#admtentatif_pilihSemester2").checked = true;
        }
        if(el.checked){
            switch_htmlsubtema4 = el.value
        }
        html_jadwalpelajaran_kaldik(switch_jadwalmpelkalender,switch_jadpem_semester,switch_htmlsubtema4,switch_jikamapel);
        
        
    })
    //console.log("disini tnpa event kita akan membuat html untuk true(tema) ="+switch_jadwalmpelkalender+" di semester "+switch_jadpem_semester +" khusus subtema4 kls tinggi bernilai: "+switch_htmlsubtema4 +" ini Mapel:"+ switch_jikamapel)
})
rd_nontematik.forEach(el=>{
    if(el.checked){
        switch_jikamapel = el.value;
    }
    el.addEventListener("change",()=>{
        if(switch_jadpem_semester == undefined){
            document.querySelector("#admtentatif_pilihSemester2").checked = true;
        }
        // karena kita memilih mapel maka seharusnya nilai 
        if(el.checked){
            switch_jikamapel = el.value;
        }
        html_jadwalpelajaran_kaldik(switch_jadwalmpelkalender,switch_jadpem_semester,switch_htmlsubtema4,switch_jikamapel);
    })
    //
})

const html_jadwalpelajaran_kaldik = async (booleanTema, semester, w_st4, n_mapel) =>{
    let v = semester;
            let th = idTeksTapel.split("/");
            let thfokus = th[v-1];
            let indekbulan1 = [0,1,2,3,4,5];
            let indekbulan0 = [6,7,8,9,10,11];
            let arCodeBulan = v ==1 ?indekbulan0:indekbulan1;
        document.querySelector(".namasekolah_jadwalkadik").innerHTML = idNamaSekolah;
        document.querySelector(".namakepsek_jadwalkadik").innerHTML = idNamaKepsek;
        document.querySelector(".nipkesek_jadwalkadik").innerHTML = idNipKepsek;
        document.querySelector(".titimangsa_jadwalkadik").innerHTML = tanggalfull(new Date());
        document.querySelector(".jenisguru_jadwalkadik").innerHTML = idJenisGuru + " " + idgurumapelmapel;
        document.querySelector(".namaguru_jadwalkadik").innerHTML = namauser;
        document.querySelector(".nipguru_jadwalkadik").innerHTML = idNipGuruKelas==""?"-":"NIP. "+idNipGuruKelas;
    let divHtml = document.querySelector(".tentatif_sebarantematik");
    
    let html ="";
    
    if(booleanTema){
        //console.log("Anda akan membuat tema untuk semester " + semester + " dengan " + w_st4);
        document.querySelector(".h3_jadwaltentatif").innerHTML="TEMATIK BERDASARKAN KALENDER PENDIDIKAN DI SEMESTER "+ semester +"<br> KELAS "+idNamaKelas+" TAHUN PELAJARAN " + idTeksTapel;
        let arrTemaRendahGanjil = ["TEMA 1","TEMA 2","TEMA 3","TEMA 4"];
        let arrTemaRendahGenap = ["TEMA 5","TEMA 6","TEMA 7","TEMA 8"];
        let arrTemaTinggiGanjil = ["TEMA 1","TEMA 2","TEMA 3","TEMA 4","TEMA 5"];
        let arrTemaTinggiGenap = ["TEMA 6","TEMA 7","TEMA 8","TEMA 9"];
        // let arrCodeMapelRendah = ["PKN","BINDO","MTK","SBDP","PJOK"];
        // let arrCodeMapelTinggi = ["PKN","BINDO","IPA","IPS","SBDP"];
        // let arrHeaderTinggi = ["PKN","Bahasa Indonesia","IPA","IPS","SBDP"]
        // let arrHeaderRendah = ["PKN","Bahasa Indonesia","MATEMATIKA","SBDP","PJOK"];
        let ltd;
        let fl;
        
        let konftema;
        let konfmapel;
        let konfheader;
        if(idJenjang > 3 && semester == 1){
            konftema = arrTemaTinggiGanjil;
            if(w_st4 == "Tanpa Subtema4"){
                ltd = 3;
            }else{
                ltd = 4
            }
        }else if(idJenjang > 3 && semester == 2){
            konftema = arrTemaTinggiGenap;
            if(w_st4 == "Tanpa Subtema4"){
                ltd = 3;
            }else{
                ltd = 4
            }
        }else if(idJenjang <= 3 && semester == 1){
            konftema = arrTemaRendahGanjil;
            ltd = 4
        }else if(idJenjang <= 3 && semester == 2){
            konftema = arrTemaRendahGenap;
            ltd = 4
        }
        // ltd untuk subtema (bisa berupa indek untuk for, dan bernilai integer)
        let ac_tema = 0; // acuan untuk looping tema berupa indek
        let ac_tgl = 1 ;//acuan untuk looping tanggal 1 (bukan indek)
        let ac_bulan = 0 ;//acuan untuk looping bulan berupa indek;
        let ac_lr = 0;
        let ac_pb = 1;
        let ac_maksPb = (ltd * 6);
        let nama_tema, a_tgl, a_day, a_date, sebulan, nama_bulan;
        let arrColor = ["w3-pale-red", "w3-pale-green", "w3-pale-yellow","w3-pale-blue"]///warna subtema

        sebulan = daysInMonth((arCodeBulan[ac_bulan]+1),thfokus);// jumlah hari di bulan pertama sebelum looping;
        a_tgl = new Date(thfokus, arCodeBulan[ac_bulan],ac_tgl); //tanggal pertama (0)
        a_day = a_tgl.getDay();
        a_date = a_tgl.getDate();
        nama_bulan = NamaBulandariIndex(arCodeBulan[ac_bulan]);
        html+=``;
        let arrHTML = [];
        let awalbulan = false;
        let no_tema;
        let obJadwalKaldik = {};
        let keyT = "";
        for(a=0; a < konftema.length ; a++){
            nama_tema = konftema[a];
            no_tema = nama_tema.match(/(\d+)/)[0];
            
        
            html +=`<table class="w3-table garis w3-centered"><tr class="w3-dark-grey"><th colspan="7">${nama_bulan} ${thfokus}</th></tr><tr class="w3-dark-grey"><th>Mg</th><th>Sn</th><th>Sl</th><th>Rb</th><th>Km</th><th>Jm</th><th>Sb</th></tr>`;
            
            for(b=0 ; b <ltd ; b++){ // looping subtema:
                let ddd = 0;
                
                do {
                    if(a_date == 1){ // jika tgl 1, tentukan sel sebelumnya berdasarrkan indeknya;
                        if(a_day !== 0){
                            html +=`<tr>`;
                            for(c = 0 ; c < (a_day); c++){
                                html +=`<td class="w3-light-gray"></td>`;
                            }
                        }
                        //isikan tanggalnya
                        if(cocoklibur(a_tgl)){
                            //cek keterangan libur
                            //cek warna libur
                            //koleksikan untuk keterangan di tabel ini
                            let cclr = kelaswarnalibur(a_tgl);
                            let wrn = cclr == ""? "w3-red":cclr;
                            
                            let ketlb = keteranganlibur(a_tgl)
                            
                            html +=`<td class="${wrn}" title="${ketlb}">${a_date}</td>`;
                        
                        }else{
                            if( a_day == 0 || a_day == 6){
                                html +=`<td class="w3-red">${a_date}</td>`;
                            }else{
                                let ww = arrColor[b];
                                html +=`<td class="${ww} w3-display-container"><span class="w3-small w3-display-topleft ">${a_date}</span><span class="w3-tiny w3-display-bottomright">Pb${ddd+1}</span></td>`;
                                keyT = "t"+no_tema +"_st"+(b+1)+"_pb" + (ddd+1);
                                obJadwalKaldik[keyT] = StringTanggal2(a_tgl);
                                ac_pb++;
                                ddd++

                            }
                        }
                        
                        if(a_day == 6){
                            html +=`</tr><tr>`;
                            
                        }
                    }else{
                        
                        if(awalbulan){
                            
                                html +=`<tr>`;
                                for(c = 0 ; c < (a_day); c++){
                                    html +=`<td class="w3-light-gray"></td>`;
                                }
                            
                        }
                        if(cocoklibur(a_tgl)){
                            let cclr = kelaswarnalibur(a_tgl);
                            let wrn = cclr == ""? "w3-red":cclr;
                            let ketlb = keteranganlibur(a_tgl)
                            
                            html +=`<td class="${wrn}" title="${ketlb}">${a_date}</td>`;
                        }else{
                            if( a_day == 0 || a_day == 6){
                                
                                html +=`<td class="w3-red">${a_date}</td>`;
                            }else{
                                
                                let ww = arrColor[b];
                                html +=`<td class="${ww} w3-display-container"><span class="w3-small w3-display-topleft ">${a_date}</span><span class="w3-tiny w3-display-bottomright">Pb${ddd+1}</span></td>`;let keyT = "t"+no_tema +"_st"+(b+1)+"_pb" + ddd;
                                keyT = "t"+no_tema +"_st"+(b+1)+"_pb" + (ddd+1);
                                obJadwalKaldik[keyT] = StringTanggal2(a_tgl);
                                ac_pb++;
                                ddd++
                            }
                        }
                        
                        if(a_day == 6){
                            html +=`</tr><tr>`;
                            
                        }
                    }
                    awalbulan = false;
                    
                    if(ac_tgl == sebulan){
                        awalbulan = true;
                        for(c = 0 ; c < (6 - a_day); c++){
                            html +=`<td class="w3-light-gray"></td>`;
                        }
                        html+=`</tr></table>`;
                        
                        ac_tgl++
                        ac_bulan++;
                        ac_tgl = 1;
                        a_tgl = new Date(thfokus, arCodeBulan[ac_bulan],ac_tgl); //tanggal pertama (0)
                        a_day = a_tgl.getDay();
                        a_date = a_tgl.getDate();
                        nama_bulan = NamaBulandariIndex(arCodeBulan[ac_bulan]);
                        sebulan = daysInMonth((arCodeBulan[ac_bulan]+1),thfokus);
                        html +=`<table class="w3-table garis w3-centered"><tr class="w3-dark-grey"><th colspan="7">${nama_bulan} ${thfokus}</th></tr><tr class="w3-dark-grey"><th>Mg</th><th>Sn</th><th>Sl</th><th>Rb</th><th>Km</th><th>Jm</th><th>Sb</th></tr>`;

                    }else{
                        ac_tgl++
                        a_tgl = new Date(thfokus, arCodeBulan[ac_bulan],ac_tgl); //tanggal pertama (0)
                        a_day = a_tgl.getDay();
                        a_date = a_tgl.getDate();
                        
                    }
                    
                    // ddd++
                }
                while(ddd < 6)
                
            } 
            awalbulan = true;
            for(c = 0 ; c < (7 - a_day); c++){
                html +=`<td class="w3-light-gray"></td>`;

            }
            html+="</tr></table>";

            

            arrHTML.push(html)
            html ="";

        }
        // divHtml.innerHTML = html;
        // console.log(arrHTML);
        // console.log(arrHTML[0])
        let divdom = document.querySelectorAll(".jadwal_kaldik");
        divdom.forEach(el=>{el.innerHTML=""});
        for ( i = 0 ; i < arrHTML.length ; i++){
            divdom[i].innerHTML = `<h3 class="w3-center">${konftema[i]}</h3>${arrHTML[i]}`;
            divdom[i].innerHTML += `<br><span class="w3-pale-red">&nbsp;&nbsp;</span> Subtema 1<br><span class="w3-pale-green">&nbsp;&nbsp;</span> Subtema 2<br><span class="w3-pale-yellow">&nbsp;&nbsp;</span> Subtema 3<br>`;
            if(idJenjang>3){
                if(ltd == 4){
                    divdom[i].innerHTML +=`<span class="w3-pale-blue">&nbsp;&nbsp;</span> Pembiasan/Literasi`
                }

            }else{
                divdom[i].innerHTML +=`<span class="w3-pale-blue">&nbsp;&nbsp;</span>Subtema 4`
            }
            //["w3-pale-red", "w3-pale-green", "w3-pale-yellow","w3-pale-blue"]
        }
        let jst = JSON.stringify(obJadwalKaldik);
        localStorage.setItem("jadwaltematik_"+semester, jst);

        
        
        
    }else{
        let teksmapel
        switch (n_mapel){
            case "PAI":
                teksmapel = "PENDIDIKAN AGAMA ISLAM DAN BUDI PEKERTI"
            break;
            case "PKRIS":
                teksmapel = "PENDIDIKAN AGAMA KRISTEN DAN BUDI PEKERTI"
            break;
            case "PKATO":
                teksmapel = "PENDIDIKAN AGAMA KATHOLIK DAN BUDI PEKERTI"
            break;
            case "MTK":
                teksmapel = "MATEMATIKA"
            break;
            case "PJOK":
                teksmapel = "PENDIDIKAN JASMANI, OLAHRAGA, DAN KESEHATAN"
            break;
            case "BSUND":
                teksmapel = "BAHASA DAN SASTRA SUNDA"
            break;
            default:
                teskmapel = "PILIH MATA PELAJARAN NONTEMATIK LAINNYA"

        }
        let divdom = document.querySelectorAll(".jadwal_kaldik");
        divdom.forEach(el=>{el.innerHTML=""});
        document.querySelector(".h3_jadwaltentatif").innerHTML= "Memproses ...."
        if(idJenjang>3){
            
        }else{
            if(n_mapel=="MTK" || n_mapel == "PJOK"){
                alert("Pelajaran ini sudah ada di Tema");
                document.querySelector(".h3_jadwaltentatif").innerHTML="PILIH MATA PELAJARAN NONTEMATIK LAINNYA"
                return
            }
        }
        document.querySelector(".h3_jadwaltentatif").innerHTML="MATA PELAJARAN "+ teksmapel+"<br> BERDASARKAN KALENDER PENDIDIKAN DI SEMESTER "+ semester +"<br> KELAS "+idNamaKelas+" TAHUN PELAJARAN " + idTeksTapel;;
        loadingtopbarin("loadingtopbar");
        await cekJPserver(semester)
        clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
            setTimeout(() => {
                divlod.style.width = "1px"
                divlod.className += " w3-hide";

            }, 3000);

        let data_hariJadwal = tagJPserver;
        let JPMP = data_hariJadwal.filter(s=>s.kodemapel == n_mapel);
        if(JPMP.length == 0){
            alert("Maaf, Anda tidak bisa melihat Jadwal Pelajaran mata pelajaran ini karena Anda belum mengatur PERHITUNGAN JUMLAH BELAJAR EFEKTIF TIAP MATA PELAJARAN di submenu 'SEBARAN HARI EFEKTIF'")
            return
        }
        //console.log(JPMP);
        let hrBljr = JPMP.map(m => Object.fromEntries(Object.entries(m).filter(([k,v])=> k.indexOf("jp_")>-1 && v !=="")))[0];
        let kodehari = Object.keys(hrBljr);
        if(kodehari.length == 0){
            alert("Maaf, Anda tidak bisa melihat Jadwal Pelajaran mata pelajaran ini karena Anda belum mengatur PERHITUNGAN JUMLAH BELAJAR EFEKTIF TIAP MATA PELAJARAN di submenu 'SEBARAN HARI EFEKTIF'")
            return
        }
        //console.log(kodehari);
        let dayCode = [1,2,3,4,5];
        let jpCode = ["jp_sn","jp_sl","jp_rb","jp_km","jp_jm"];
        let dayKal = kodehari.map(s => dayCode[jpCode.indexOf(s)])
        //console.log(dayKal);
        let day, date, longDate, dd, imonth, kmonth, namabulan, wrn, ket;
        let pushHTML = []
        let html = "";
        for(i = 0 ; i < arCodeBulan.length ; i++){
            imonth = arCodeBulan[i];
            kmonth = (imonth+1);
            namabulan = NamaBulandariIndex(imonth);
            longDate = daysInMonth(kmonth, thfokus);
            html = `<table class="w3-table garis w3-centered"><tr class="w3-dark-grey"><th colspan="7">${namabulan} ${thfokus}</th></tr><tr class="w3-dark-grey"><th>Mg</th><th>Sn</th><th>Sl</th><th>Rb</th><th>Km</th><th>Jm</th><th>Sb</th></tr>`;
            for(j = 0 ; j < longDate ; j++){
                dd = new Date(thfokus, imonth, (j+1))
                day = dd.getDay();
                date = dd.getDate();
                if(date == 1){
                    html +="<tr>"
                    for(k = 0 ; k < (day);k++)
                    html +=`<td class="w3-light-gray"></td>`
                }
                if(cocoklibur(dd)){
                    wrn = kelaswarnalibur(dd) ==""?"w3-red":kelaswarnalibur(dd);
                    ket = keteranganlibur(dd);
                    html+=`<td class="${wrn}" title="${ket}">${date}</td>`
                }else{
                    if(dayKal.indexOf(day)>-1){
                        html +=`<td class="w3-pale-green">${date}</td>`
                    }else{
                        if(day == 0 || day == 6){
                            html +=`<td class="w3-red">${date}</td>`;

                        }else{
                            html +=`<td class="w3-light-gray">${date}</td>`;
                        }

                    }

                }
                
                if(date == longDate){
                    if(day == 6){
                        html +=`</tr></table>`;
                    }else{
                        for(c=0 ; c < (6 - day);c++){
                            html +=`<td class="w3-light-gray"></td>`;
                        }
                        html +=`</tr></table>`

                    }
                }else{
                    if(day == 6){
                        html += `</tr><tr>`;
                        
                    }
                }
            }
            pushHTML.push(html)
        }
        for(h = 0 ; h < pushHTML.length ; h++){
            divdom[h].innerHTML = pushHTML[h];
        }

        

        
    }
}
let hideall = document.querySelectorAll(".rp_hide");
const klikawaldesainrpp = async () =>{
    hideall.forEach(el=> el.classList.add("w3-hide"));
    await dB_serverRPP();
    let inrppsubtema4 =document.querySelector(".inrppsubtema4");
    if(idJenjang > 3){
        inrppsubtema4.classList.add("w3-hide");
    }

}
const dB_serverRPP = async () => {
    loadingtopbarin("loadingtopbar");
    
    let tab = "rpp";
        let tabel =[[["idbaris"]]];
        let head = tabel[0];
        let key = JSON.stringify(head);
        let datakirim = new FormData();
        
        datakirim.append("tab",tab);
        datakirim.append("key",key);
    await fetch(url_kaldikaja+"?action=getpostdatafromtab",{
        method:"post",
        body:datakirim
    }).then(m => m.json())
    .then(r => {
        let cekdulu = r.data.filter(s=>s.jenjang_kelas == idJenjang);
        if(cekdulu.length == 0){
            tagrppserver = [{"idbaris":"","jenjang_kelas":"","tematik_nontematik":"","tema_mapel":"","subtema_materipokok":"","semester":"","muatan_terpadu":"","alokasi_waktu":"","tujuan_pembelajaran":"","kegiatan_pendahuluan":"","kegiatan_inti":"","kegiatan_penutup":"","penilaian":"","rubrik_0":"","rubrik_1":"","rubrik_2":"","rubrik_3":"","rubrik_4":"","rubrik_5":"","rubriktipe_0":"","rubriktipe_1":"","rubriktipe_2":"","rubriktipe_3":"","rubriktipe_4":"","rubriktipe_5":"","aw_awal":"","aw_inti":"","aw_penutup":""}];
        }else{
            tagrppserver = r.data.filter(s=>s.jenjang_kelas == idJenjang);

        }

        clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
            setTimeout(() => {
                divlod.style.width = "1px"
                divlod.className += " w3-hide";

            }, 3000);
    }).catch(er=>console.log(er));

}

let tagrpp_semester
let tagfokusrpp ; // jika tema: t6_t5_pb1 atau MTK PAI, dll
let tagfokustema, tagfokussubtema, tagfokuspb, tagfokusmapel,tagfokustextarea;
let tagrpp_temanontema = true;// isikan tema/nontematik ; true untuk tematik;
const createrpp_semester = document.querySelectorAll("input[name=createrpp_semester]");
createrpp_semester.forEach(el=>{
    let arrTemaRendahGanjil = [1,2,3,4];
        let arrTemaRendahGenap = [5,6,7,8];
        let arrTemaTinggiGanjil = [1,2,3,4,5];
        let arrTemaTinggiGenap = [6,7,8,9];
        
        let konftema;
        el.addEventListener("change",()=>{
            if(el.checked){
                tagrpp_semester = el.value;
                let semester = el.value;
                if(idJenjang > 3 && semester == 1){
                    konftema = arrTemaTinggiGanjil;
                }else if(idJenjang > 3 && semester == 2){
                    konftema = arrTemaTinggiGenap;
                }else if(idJenjang <= 3 && semester == 1){
                    konftema = arrTemaRendahGanjil;
                }else if(idJenjang <= 3 && semester == 2){
                    konftema = arrTemaRendahGenap;
                }

            
                let html = "";
                for(i = 0 ; i < konftema.length ; i++){
                    html += `<input type="radio" class="inprpp" name="createrpp_tema" id="createrpp_tema${konftema[i]}" value="${konftema[i]}"><label for="createrpp_tema${konftema[i]}" class="lblinrpp">Tema ${konftema[i]}</label><br>`;
                }
                document.querySelector(".createrpp_koleksitema").innerHTML = html;
                let subtemas = document.querySelectorAll("input[name=createrpp_subtema]");
                subtemas.forEach(st => st.checked = false)
                let pbs = document.querySelectorAll("input[name=createrpp_pb]");
                pbs.forEach(pb => pb.checked = false)
                tagfokustema = undefined;
                tagfokussubtema = undefined;
                tagfokuspb = undefined;
                const createrpp_tema = document.querySelectorAll("input[name=createrpp_tema]");
                createrpp_tema.forEach(el=> {
                    el.addEventListener("change",()=>{
                        let t = el.value;
                        tagfokustema = t;
                        let desainarea_rpp = document.querySelector(".desainarea_rpp");
                        if(desainarea_rpp.className.indexOf("w3-hide")==-1){
                            desainarea_rpp.classList.add("w3-hide");
                        }
                        tagfokusrpp = alt_tagfokusrpp();
                        cek_tagdarirppserver(tagfokusrpp);
                    })
                });
                tagfokusrpp = alt_tagfokusrpp();
                cek_tagdarirppserver(tagfokusrpp);
                
            }
        let desainarea_rpp = document.querySelector(".desainarea_rpp");
        if(desainarea_rpp.className.indexOf("w3-hide")==-1){
            desainarea_rpp.classList.add("w3-hide");
        }
        tagfokusrpp = alt_tagfokusrpp();
        cek_tagdarirppserver(tagfokusrpp);
    });
})
const creatrpp_tematiknontematik = document.querySelectorAll("input[name=creatrpp_tematiknontematik]");
const rp_tema0 = document.querySelectorAll(".rp_tema0");
const rp_nontema0 = document.querySelectorAll(".rp_nontema0");
creatrpp_tematiknontematik.forEach(el=>{
    el.addEventListener("change",()=>{
        if(el.checked){
            let value = el.value;
            if(value == "tematik"){
                tagrpp_temanontema = true
                rp_tema0.forEach(d=> {
                    if(d.className.indexOf("w3-hide")>-1){
                        d.classList.remove("w3-hide")
                    }
                });
                rp_nontema0.forEach(h=> {
                    if(h.className.indexOf("w3-hide")==-1){
                        h.classList.add("w3-hide")
                    }
                })
            }else{
                tagrpp_temanontema = false;
                rp_tema0.forEach(d=> {
                    if(d.className.indexOf("w3-hide")==-1){
                        d.classList.add("w3-hide")
                    }
                });
                rp_nontema0.forEach(h=> {
                    if(h.className.indexOf("w3-hide")>-1){
                        h.classList.remove("w3-hide")
                    }
                })
            }
            let desainarea_rpp = document.querySelector(".desainarea_rpp");
            if(desainarea_rpp.className.indexOf("w3-hide")==-1){
                desainarea_rpp.classList.add("w3-hide");
            }               
            tagfokusrpp = alt_tagfokusrpp();
            cek_tagdarirppserver(tagfokusrpp);
        }
    })
});
const createrpp_nontematik = document.querySelectorAll("input[name=createrpp_nontematik]");
createrpp_nontematik.forEach(el=> {
    el.addEventListener("change",()=>{
        let mapel = el.value;
        createrpp_textarea.value = "";
        tagfokusmapel = mapel;
        let desainarea_rpp = document.querySelector(".desainarea_rpp");
        if(desainarea_rpp.className.indexOf("w3-hide")==-1){
            desainarea_rpp.classList.add("w3-hide");
        }
        tagfokusrpp = alt_tagfokusrpp();
        cek_tagdarirppserver(tagfokusrpp);
    })
})
const createrpp_pb = document.querySelectorAll("input[name=createrpp_pb]");
createrpp_pb.forEach(el=> {
    el.addEventListener("change",()=>{
        let pb = el.value;
        tagfokuspb = pb;
        let desainarea_rpp = document.querySelector(".desainarea_rpp");
        if(desainarea_rpp.className.indexOf("w3-hide")==-1){
            desainarea_rpp.classList.add("w3-hide");
        }
        tagfokusrpp = alt_tagfokusrpp();
        cek_tagdarirppserver(tagfokusrpp);
    })
})
const createrpp_subtema = document.querySelectorAll("input[name=createrpp_subtema]");
createrpp_subtema.forEach(el=> {
    el.addEventListener("change",()=>{
        let st = el.value;
        tagfokussubtema = st;
        let desainarea_rpp = document.querySelector(".desainarea_rpp");
        if(desainarea_rpp.className.indexOf("w3-hide")==-1){
            desainarea_rpp.classList.add("w3-hide");
        }
        tagfokusrpp = alt_tagfokusrpp();
        cek_tagdarirppserver(tagfokusrpp);
    })
})

const cek_tagdarirppserver = (tg) =>{
    let datacekcocok = gabungdataserverkd();

    let divdom = document.querySelector(".resultcreatepilihrpp");
    let divsebarkd = document.querySelector(".kecocokan_tagserverkd");
    let divjadwalkaldik = document.querySelector(".kecocokan_jadwalkaldik");
    divdom.innerHTML = "Anda belum siap membuat database RPP. Silakan ceklis atau isikan semua data identitas RPP.";
    divsebarkd.innerHTML ="Memfilter data di sebaran KD ..."
    divjadwalkaldik.innerHTML ="Memfilter data jadwal RPP berdasarkan Kaldik ...";
    let desainarea_rpp = document.querySelector(".desainarea_rpp");
    if(tg == undefined){
        if(desainarea_rpp.className.indexOf("w3-hide")==-1){
            desainarea_rpp.classList.add("w3-hide");
        }
        return
    }
    let bol = Array.isArray(tg);
    
    let kriteria, tema_mapel, subtema_materi
    if(bol){
        kriteria = tg[1]
        tema_mapel = tg[0];
        subtema_materi = createrpp_textarea.value;
    }else{
        kriteria = tg;
        let sPlit = tg.split("_");
        let teks0 = "Tema " + sPlit[0].match(/(\d+)/)[0];
        let teks1 = ", Subtema " + sPlit[1].match(/(\d+)/)[0];
        let teks2 = ", Pembelajaran " + sPlit[2].match(/(\d+)/)[0];
        tema_mapel = teks0 +teks1 +teks2 
        subtema_materi =""
    }
    // cek! localStorage!
    let cekObJadwalTematik;
    let infoSebaranKD=""; // info Sebaran KD (tematik) dan  Distribusi KD Nontematik
    //let dTCekllisKD = tagJPserver;
    let tglKetemutematik;
    
    if(tagrpp_temanontema){
        if(localStorage.hasOwnProperty("jadwaltematik_"+tagrpp_semester)){
            cekObJadwalTematik  = JSON.parse(localStorage.getItem("jadwaltematik_"+tagrpp_semester));
            tglKetemutematik = cekObJadwalTematik[kriteria];
            divjadwalkaldik.innerHTML = tema_mapel + " berdasarkan Jadwal Pembelajaran Tentatif di Kalender Pendidikan dilaksanakan pada " + Tanggaldenganhari(tglKetemutematik);
        }else{
            divjadwalkaldik.innerHTML = tema_mapel + " berdasarkan Kalender Pendidikan belum terdeteksi. Silakan cek di Menu Kalender Pendidikan dan Submenu Jadwal Pembelajaran Tentatif";
        }
        let cekTSTPBini = datacekcocok.filter(s => s.semester.indexOf(tagrpp_semester)>-1 && s[kriteria] !=="");
        
        if(cekTSTPBini.length == 0){
            infoSebaranKD = "Kami melacak Anda belum melengkapi Sebaran KD untuk " + tema_mapel + " ini. Silakan Anda atur melalui menu 'Sebaran KD' di submenu 'Per Tema', tetapi sebelumnya Anda harus memastikan terlebih dahulu Distribusi KD di menu Kalender.";
        }else if(cekTSTPBini == 1){
            infoSebaranKD ="Kami melacak Anda hanya mengisi satu muatan pelajaran saja untuk " + tema_mapel + " ini. Silakan Anda atur melalui menu 'Sebaran KD' di submenu 'Per Tema', tetapi sebelumnya Anda harus memastikan terlebih dahulu Distribusi KD di menu Kalender. <br>";
            let m_MP = cekTSTPBini[0].mapel;
            let m_KD = cekTSTPBini[0].kd +"/"+ cekTSTPBini[0].kd4
            infoSebaranKD += "Yaitu " + convertcodemapelkemapel(m_MP) +" KD = " + m_KD;
        }else{
            infoSebaranKD = "Kami melacak bahwa Anda membuat Pemetaan KD pertema di " + tema_mapel + " ini memuat:<br><ol>";
            for(m = 0 ; m < cekTSTPBini.length ; m++){
                infoSebaranKD += "<li>" + convertcodemapelkemapel(cekTSTPBini[m].mapel) + " KD = " + cekTSTPBini[m].kd +" / "+ cekTSTPBini[m].kd4 +"</li>";
            }
            infoSebaranKD +="</ol>"
        }
        divsebarkd.innerHTML = infoSebaranKD;
        divsebarkd.innerHTML += `<br><div class="w3-border w3-padding">Cek di: <br><br>Menu Tab 'Kalender Pendidikan' &gt;&gt; Submenu 'Distribusi KD'<br>Menu 'Sebaran KD' &gt;&gt; Submenu 'Pertema'</div>`;
        
    }else{
        if(localStorage.hasOwnProperty("loc_tagJPserver_"+tagrpp_semester)){
            let hr_nontematik = JSON.parse(localStorage.getItem("loc_tagJPserver_"+tagrpp_semester));
            let arrSrcIndex = ["jp_sn","jp_sl", "jp_rb","jp_km","jp_jm"];
            let arrHari = ["Senin","Selasa", "Rabu","Kamis","Jumat"];
            let srcMapl = hr_nontematik.filter(s=>s.kodemapel == tema_mapel);
            if(srcMapl.length >0){
                let cekHarinya = srcMapl.map(s=> Object.fromEntries(Object.entries(s).filter(([k,v])=> k.indexOf("jp_")>-1 && v !=="")));
                let keyOB = Object.keys(cekHarinya);
                if(keyOB.length ==0){
                    divjadwalkaldik.innerHTML = "Pelaksanaan KBM Mata Pelajaran "+ tema_mapel +" Belum Anda atur untuk semester "+ tagrpp_semester+" ini. Silakan Anda atur dulu di Menu 'Kalender Pendidikan' pada submenu 'Sebaran Hari Efektif' dengan memilih Mata Pelajaran ini!";
                }else{
                    // let hariOknontematik = cekHarinya.map(m => Object.entries(m).map(([k,v])=> arrHari[arrSrcIndex.indexOf(k)])).join().split(",")
                    let hariOknontematik = srcMapl.map(s=> Object.fromEntries(Object.entries(s).filter(([k,v])=> k.indexOf("jp_")>-1 && v !==""))).map(m => Object.entries(m).map(([k,v])=> arrHari[arrSrcIndex.indexOf(k)] +" "+ v+" jp")).join().split(",");
                    divjadwalkaldik.innerHTML = "Pelaksanaan KBM Mata Pelajaran "+ convertcodemapelkemapel(tema_mapel) +" di semester "+tagrpp_semester+" ini dilaksanakan setiap hari " + hariOknontematik.join(", ");
                }
            }else{
                divjadwalkaldik.innerHTML = "Pelaksanaan KBM Mata Pelajaran "+ convertcodemapelkemapel(tema_mapel)  +" Belum Anda atur semester "+ tagrpp_semester+" ini. Silakan Anda atur dulu di Menu 'Kalender Pendidikan' pada submenu 'Sebaran Hari Efektif' dengan memilih Mata Pelajaran ini!";
            }

        }else{
            divjadwalkaldik.innerHTML = "Coba Anda buka terlebih dahulu Menu di 'Kalender Pendidikan' pada submenu 'Sebaran Hari Efektif'. cek setiap semester, kemudian kembali lagi di sini!";
        }
        let dat0 = datacekcocok.filter(s => s.semester.indexOf(tagrpp_semester)>-1 && s.mapel == tema_mapel);
        let teksKetMapel ="";// = "Kami melacak berdasarkan fitur Distribusi KD bahwa Anda mengatur distribusi KD di semester " + tagrpp_semester + " untuk Mata Pelajaran " + tema_mapel;
        if(dat0.length == 0){
            teksKetMapel = "Anda belum mengatur pendistribusian KD untuk mata pelajaran "+ convertcodemapelkemapel(tema_mapel)+ " ini. Silakan Anda setting di Menu 'Kalender Pendidikan' melalui submenu 'Distribusi KD' dengan memilih 'Nontematik'"
        }else{
            teksKetMapel ="Kami melacak bahwa Mata Pelajaran " + convertcodemapelkemapel(tema_mapel) + " di semester " + tagrpp_semester + " ini memuat:<ol>"
            for(n = 0  ; n <dat0.length ; n++){
                teksKetMapel += "<li> KD = " +dat0[n].kd + "/" + dat0[0].kd4;
            }
            teksKetMapel += "</ol>"
        }
        divsebarkd.innerHTML = teksKetMapel;
    
    }

    let temanontema = tagrpp_temanontema?"TEMATIK":"NONTEMATIK";
    let tema_mapell = tagrpp_temanontema?tema_mapel:convertcodemapelkemapel(tema_mapel);
    let k_tm = tagrpp_temanontema?kriteria:tema_mapel;

    let data = tagrppserver.filter(s =>s.tema_mapel == k_tm && s.semester == tagrpp_semester && s.subtema_materipokok == subtema_materi);
    
    let boleanT = tagrpp_temanontema;
    if(data.length == 0){
        divdom.innerHTML=`Anda sudah siap untuk membuat baru database RPP dengan ketentuan:<br>RPP ${temanontema} ${tema_mapell} ${subtema_materi}<hr><div class="w3-center w3-padding"><button class="w3-btn w3-green" onclick="buatrppawal()"><i class="fa fa-pencil"></i> Buat RPP</button></div>`;
    }else{
        let baristerlacak = data[0].idbaris;
        
        divdom.innerHTML=`Materi ini sudah Ada di server kami, Anda dapat mengedit database RPP ${temanontema} ${tema_mapell} ${subtema_materi}<hr><div class="w3-center w3-padding"><button class="w3-btn w3-blue" onclick="Editrppawal('${baristerlacak}')"><i class="fa fa-pencil"></i> Edit RPP</button></div>`;
    };


}

const createrpp_textarea = document.querySelector("#createrpp_textarea");
createrpp_textarea.addEventListener("input",()=>{
    let desainarea_rpp = document.querySelector(".desainarea_rpp");
    if(desainarea_rpp.className.indexOf("w3-hide")==-1){
        desainarea_rpp.classList.add("w3-hide");
    }
    let v = createrpp_textarea.value;
    let dsgn_materipokok = document.querySelector(".dsgn_materipokok");
    dsgn_materipokok.innerHTML = v;
    tagfokustextarea = v;
    tagfokusrpp = alt_tagfokusrpp();
    cek_tagdarirppserver(tagfokusrpp);

})

const alt_tagfokusrpp = () =>{
    let fokus;
    if(tagrpp_temanontema){
        if(tagfokustema == undefined || tagfokussubtema == undefined || tagfokuspb == undefined){
            fokus = undefined
        }else{
            fokus = "t"+tagfokustema + "_st" + tagfokussubtema  + "_pb" +  tagfokuspb;
        }
    }else{
        if(tagfokusmapel == undefined || tagfokustextarea == undefined || tagfokustextarea ==""){
            fokus = undefined
        }else{
            fokus = [tagfokusmapel,tagfokustextarea]
        }
    }
    return fokus;
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

const convertcodemapelkemapel = (kode) =>{
    let teksmapel 
    switch(kode){
            case "PAI":
                teksmapel = "PENDIDIKAN AGAMA ISLAM DAN BUDI PEKERTI"
            break;
            case "PKRIS":
                teksmapel = "PENDIDIKAN AGAMA KRISTEN DAN BUDI PEKERTI"
            break;
            case "PKATO":
                teksmapel = "PENDIDIKAN AGAMA KATHOLIK DAN BUDI PEKERTI"
            break;
            case "MTK":
                teksmapel = "MATEMATIKA"
            break;
            case "PJOK":
                teksmapel = "PENDIDIKAN JASMANI, OLAHRAGA, DAN KESEHATAN"
            break;
            case "BSUND":
                teksmapel = "BAHASA DAN SASTRA SUNDA"
            break;
            case "PKN":
                teksmapel = "PKN"
            break;
            case "BINDO":
                teksmapel = "BAHASA INDONESIA"
            break;
            case "IPA":
                teksmapel = "IPA"
            break;
            case "IPS":
                teksmapel = "IPS"
            break;
            case "SBDP":
                teksmapel = "SBDP"
            break;
            case "PJOK":
                teksmapel = "PJOK"
            break;
            default:
                teskmapel = kode
    }
    return teksmapel

}

const convertlong_mapelkecodemapel = (kode) =>{
    let teksmapel 
    switch(kode){
            case "PENDIDIKAN AGAMA ISLAM DAN BUDI PEKERTI":
                teksmapel = "PAI"
            break;
            case "PENDIDIKAN AGAMA KRISTEN DAN BUDI PEKERTI":
                teksmapel = "PKRIS"
            break;
            case "PENDIDIKAN AGAMA KATHOLIK DAN BUDI PEKERTI":
                teksmapel = "PKATO"
            break;
            case "MATEMATIKA":
                teksmapel = "MTK"
            break;
            case "PENDIDIKAN JASMANI, OLAHRAGA, DAN KESEHATAN":
                teksmapel = "PJOK"
            break;
            case "BAHASA DAN SASTRA SUNDA":
                teksmapel = "BSUND"
            break;
            case "PKN":
                teksmapel = "PKN"
            break;
            case "BAHASA INDONESIA":
                teksmapel = "BAHASA INDONESIA"
            break;
            case "IPA":
                teksmapel = "IPA"
            break;
            case "IPS":
                teksmapel = "IPS"
            break;
            case "SBDP":
                teksmapel = "SBDP"
            break;
            case "PJOK":
                teksmapel = "PJOK"
            break;
            default:
                teskmapel = kode
    }
    return teksmapel

}

const convertshort_mapelkecodemapel = (kode) =>{
    let teksmapel 
    switch(kode){
            case "PA ISLAM":
                teksmapel = "PAI"
            break;
            case "PA KRISTEN":
                teksmapel = "PKRIS"
            break;
            case "PA KATHOLIK":
                teksmapel = "PKATO"
            break;
            case "MATEMATIKA":
                teksmapel = "MTK"
            break;
            case "PJOK":
                teksmapel = "PJOK"
            break;
            case "BAHASA SUNDA":
                teksmapel = "BSUND"
            break;
            case "PKN":
                teksmapel = "PKN"
            break;
            case "BAHASA INDONESIA":
                teksmapel = "BAHASA INDONESIA"
            break;
            case "IPA":
                teksmapel = "IPA"
            break;
            case "IPS":
                teksmapel = "IPS"
            break;
            case "SBDP":
                teksmapel = "SBDP"
            break;
            case "PJOK":
                teksmapel = "PJOK"
            break;
            default:
                teskmapel = kode
    }
    return teksmapel

}

const buatrppawal = () =>{
    let tombolAwal = document.querySelector(".resultcreatepilihrpp");//.innerHTML = "Anda sekarang dalam situasi membuat RPP pertama kali untuk T"

    let tbl = document.querySelector(".tabel_lampiran1");
    let tb = tbl.getElementsByTagName("tbody")[0];
    
    let desainarea_rpp = document.querySelector(".desainarea_rpp");
    let div_rppnontematik = document.querySelector(".clue_dsgnrpp_nontematik");
    div_rppnontematik.classList.add("w3-hide");
    let div_rpptematik = document.querySelector(".clue_dsgnrpp_tematik");
    div_rpptematik.classList.add("w3-hide");

    let html1="";
    let html="";
    for(i = 0 ; i < jsondatasiswa.length ; i++){
        html +=`<tr><td>${i+1}</td><td>${jsondatasiswa[i].pd_nama}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`;
        
    }
    tb.innerHTML = html;

    desainarea_rpp.classList.remove("w3-hide");
    //IDENTITAS UMUM:
    let dsgnrpp_namasekolah = document.querySelectorAll(".dsgnrpp_namasekolah");
    dsgnrpp_namasekolah.forEach(el=> el.innerHTML = idNamaSekolah);
    let dsgnrpp_namakepsek = document.querySelectorAll(".dsgnrpp_namakepsek");
    dsgnrpp_namakepsek.forEach(el=> el.innerHTML = idNamaKepsek);
    
    let dsgnrpp_nipkepsek = document.querySelectorAll(".dsgnrpp_nipkepsek");
    dsgnrpp_nipkepsek.forEach(el=> el.innerHTML = idNipKepsek);

    let dsgnrpp_namaguru = document.querySelectorAll(".dsgnrpp_namaguru");
    dsgnrpp_namaguru.forEach(el=> el.innerHTML = namauser);
    
    let dsgnrpp_nipguru = document.querySelectorAll(".dsgnrpp_nipguru");
    dsgnrpp_nipguru.forEach(el=> el.innerHTML = idNipGuruKelas==""?"-":"NIP. "+idNipGuruKelas);
    /// FOKUS INFO
    // console.log("tagrpp_semester")
    // console.log(tagrpp_semester)
    // console.log("tagfokusrpp") /// sama aja dengan tag (tg)
    // console.log(tagfokusrpp)
    // console.log("tagfokustema")
    // console.log(tagfokustema)
    // console.log("tagfokussubtema")
    // console.log(tagfokussubtema)
    // console.log("tagfokuspb")
    // console.log(tagfokuspb)
    // console.log("tagfokusmapel")
    // console.log(tagfokusmapel)
    // console.log("tagfokustextarea");
    // console.log(tagfokustextarea);
    // console.log("tagrpp_temanontema");
    // console.log(tagrpp_temanontema);
    let datacekcocok = gabungdataserverkd();
    //IDENTITAS GLOBAL (Ada di Tematik maupun Nontematik)!
    let dsgnrpp_kelasini = document.querySelectorAll(".dsgnrpp_kelasini");
    let dsgnrpp_semester =document.querySelector(".dsgnrpp_semester");
    let dsgnrpp_alokasiwaktu = document.querySelector(".dsgnrpp_alokasiwaktu");
    let prt_judul = document.querySelector(".prt_judul");
    let tujuanpembelajaran = document.querySelector(".prt_tujuanpembelajaran");
    let langkahpendahuluan = document.querySelector(".langkahpendahuluan");
    let langkahinti = document.querySelector(".langkahinti")
    let langkahpenutup = document.querySelector(".langkahpenutup")
    let tambahkanrubrik = document.querySelector(".tambahkanrubrik");
    let dsgnrpp_tgl = document.querySelectorAll(".dsgnrpp_tgl")[0];
    //let langkahpembelajaran = document.querySelector(".prt_langkahpembelajaran");
    let penilaian = document.querySelector(".prt_penilaian");
    
    let MuatanPelajaran = document.querySelectorAll(".koleksimapel_muatanterpaduMP");
    MuatanPelajaran.forEach(el => el.innerHTML = "");

        dsgnrpp_kelasini.forEach(el => el.innerHTML = idgurumapelmapel);
        dsgnrpp_semester.innerHTML = tagrpp_semester;

    //console.log("KESIMPULAN:");
    let kesimpulan ="";
    let kriteria
        let sPlit
        let teks0
        let teks1
        let teks2
        let cekTSTPBini
        let tema_mapel
        let cekObJadwalTematik,tglKetemutematik,spantanggal
        spantanggal = document.querySelectorAll(".dsgnrpp_tgl");
        let teksKD = DataKDKurtilas["kelas"+idJenjang];

    
    tambahkanrubrik.onclick = function(){
        alert("Anda belum siap untuk menambahkan rubrik. Pastikan Anda dalam posisi mengedit RPP (minimal rpp yang Anda kerjakan sudah tersimpan di server)")
    }
    if(tagrpp_temanontema){
        if(div_rpptematik.className.indexOf("w3-hide")>-1){
            div_rpptematik.classList.remove("w3-hide")
        }
        if(div_rppnontematik.className.indexOf("w3-hide")==-1){
            div_rppnontematik.classList.add("w3-hide")
        }
        kriteria = tagfokusrpp;
        sPlit = kriteria.split("_");
        teks0 = "TEMA " + sPlit[0].match(/(\d+)/)[0];
        teks1 = " SUBTEMA " + sPlit[1].match(/(\d+)/)[0];
        teks2 = " PEMBELAJARAN " + sPlit[2].match(/(\d+)/)[0];
        tema_mapel = teks0 +teks1 +teks2 ;

        tombolAwal.innerHTML = "Anda dalam situasi membuat RPP untuk "+tema_mapel + " pertama kali. Keadaan ini akan berubah ketika Anda mengirimkan informasi lagi di setiap komponen RPP.";
        
        cekTSTPBini = datacekcocok.filter(s => s.semester.indexOf(tagrpp_semester)>-1 && s[kriteria] !=="");
        //console.log(cekTSTPBini);
        kesimpulan +="Anda membuat Tema, yang akan dibuat kodenya: t"+tagfokustema +"_st"+tagfokussubtema +"_pb"+tagfokuspb;
        kesimpulan +="tambahan mapel objek yang terdeteksi ada setelah console ini." ;
        let isitema = teksKD.filter(s=> s["Tema "+tagfokustema])[0]
        document.querySelector(".dsgnrpp_tema").innerHTML ="TEMA " + tagfokustema +"<br>" + isitema["Tema "+tagfokustema];
        document.querySelector(".dsgnrpp_subtema").innerHTML ="SUBTEMA " + tagfokussubtema +"<br>" + isitema["Subtema "+tagfokussubtema];
        document.querySelector(".dsgnrpp_pembelajaran").innerHTML ="Pembelajaran " + tagfokuspb;
        document.querySelector(".dsgnrpp_semester").innerHTML =tagrpp_semester;
        // IDENTITAS RPP:
        dsgnrpp_alokasiwaktu.innerHTML = "1 Hari";
        prt_judul.innerHTML = tema_mapel;
        let judullampiran = document.querySelectorAll(".h_judullampiran");
        let JUDULTEMA = "TEMA " + tagfokustema +" SUBTEMA " + tagfokussubtema + " PEMBELAJARAN " + tagfokuspb;
        judullampiran.forEach(el => el.innerHTML = JUDULTEMA);
        let arrMuatan = cekTSTPBini.filter(s => s[tagfokusrpp] !=="").map(m => Object.fromEntries(Object.entries(m).filter(([k,v])=>k == "mapel" || k == "kd" ||  k =="kd4")));
        
        for(m = 0 ; m < MuatanPelajaran.length && m < arrMuatan.length ; m++){
            MuatanPelajaran[m].innerHTML = convertcodemapelkemapel(arrMuatan[m].mapel) + " (" + arrMuatan[m].kd +"/" + arrMuatan[m].kd4+")"
        };

        
        //arrMuatan[i].mapel  +
        //filter(s => s.t1_st1_pb1 !=="").map(m => Object.fromEntries(Object.entries(m).filter(([k,v])=>k == "mapel" || k == "kd")))


        // tanggal pelaksanaan RPP tema st pb ini:
        if(localStorage.hasOwnProperty("jadwaltematik_"+tagrpp_semester)){
            cekObJadwalTematik  = JSON.parse(localStorage.getItem("jadwaltematik_"+tagrpp_semester));
            tglKetemutematik = cekObJadwalTematik[kriteria];
            spantanggal.forEach((el,i) => i == 0? el.innerHTML = Tanggaldenganhari(tglKetemutematik):el.innerHTML = tanggalfull(tglKetemutematik));
            //console.log(cekObJadwalTematik);
        }else{
            spantanggal.forEach(el => el.innerHTML = "isi manual atau cek di Menu Kalender Pendidikan dan Submenu Jadwal Pembelajaran Tentatif");
        }
        //konvirmasi tooltip untuk Muatan Mapel;
        let tambahmuatankduntukrppini = document.querySelector(".tambahmuatankduntukrppini");
        tambahmuatankduntukrppini.onclick = function(){
            tooltipMuatanMapel("TEMA "+tagfokustema,tagrpp_semester,tagfokusrpp);
        }
        /// TOOLTIP
        tujuanpembelajaran.onclick=function(){
            tooltipIsianRPP ("baru","prt_tujuanpembelajaran", tagfokusrpp, "tematik", tagrpp_semester, "", "","")
        }
        langkahpendahuluan.onclick=function(){
            tooltipIsianRPP ("baru","langkahpendahuluan", tagfokusrpp, "tematik", tagrpp_semester, "", "","aw_awal")
        }

        langkahinti.onclick=function(){
            tooltipIsianRPP ("baru","langkahinti", tagfokusrpp, "tematik", tagrpp_semester, "", "","aw_inti")
        }

        langkahpenutup.onclick=function(){
            tooltipIsianRPP ("baru","langkahpenutup", tagfokusrpp, "tematik", tagrpp_semester, "")

        }
        penilaian.onclick=function(){
            tooltipIsianRPP ("baru","prt_penilaian", tagfokusrpp, "tematik", tagrpp_semester, "", "","aw_penutup")
        }
        
        dsgnrpp_tgl.onclick = null;
        
    }else{
        if(div_rppnontematik.className.indexOf("w3-hide")>-1){
            div_rppnontematik.classList.remove("w3-hide")
        }
        if(div_rpptematik.className.indexOf("w3-hide")==-1){
            div_rpptematik.classList.add("w3-hide")
        }
        kriteria = tagfokusrpp[1]
        tema_mapel = tagfokusrpp[0];
        
        let dsgn_matapelajaran = document.querySelector(".dsgn_matapelajaran");
        dsgn_matapelajaran.innerHTML = convertcodemapelkemapel(tema_mapel);

        

        // let dat0 = datacekcocok.filter(s => s.semester.indexOf(tagrpp_semester)>-1 && s.mapel == tema_mapel);
        kesimpulan +="Anda membuat rpp nontematik dengan mata pelajaran code "+tagfokusmapel + " dengan judul " +tagfokustextarea;
        // //informasi untuk RPP nontematik:

        // //console.log(dat0);
        // let hr_nontematik = JSON.parse(localStorage.getItem("loc_tagJPserver_"+tagrpp_semester));
        //     let arrSrcIndex = ["jp_sn","jp_sl", "jp_rb","jp_km","jp_jm"];
        //     let arrHari = ["Senin","Selasa", "Rabu","Kamis","Jumat"];
        //     let srcMapl = hr_nontematik.filter(s=>s.kodemapel == tema_mapel);
        //  console.log(srcMapl);
        /// TOOLTIP
        tujuanpembelajaran.onclick=function(){
            tooltipIsianRPP ("baru","prt_tujuanpembelajaran", tema_mapel, "nontematik", tagrpp_semester, "", "","");
        }
        langkahpendahuluan.onclick=function(){
            tooltipIsianRPP ("baru","langkahpendahuluan", tema_mapel, "nontematik", tagrpp_semester, "", "","aw_awal");
        }

        langkahinti.onclick=function(){
            tooltipIsianRPP ("baru","langkahinti", tema_mapel, "nontematik", tagrpp_semester, "", "","aw_inti");
        }

        langkahpenutup.onclick=function(){
            tooltipIsianRPP ("baru","langkahpenutup", tema_mapel, "nontematik", tagrpp_semester, "", "","aw_penutup");

        }
        penilaian.onclick=function(){
            tooltipIsianRPP ("baru","prt_penilaian", tema_mapel, "nontematik", tagrpp_semester, "", "","");
        }
        
        dsgnrpp_tgl.onclick=function(){
            tooltip_tgljppelaksanaanrpp("",tema_mapel,tagrpp_semester,this)

        }

    }
    //console.log(kesimpulan);

}

const tooltipMuatanMapel = (theme,semester,ceklis) =>{ //tooltip yang muncul ketika user membuat RPP pertama kali (baru bikin)
    let tambahmuatankduntukrppini = document.querySelector(".tambahmuatankduntukrppini");
        let lLeft = (tambahmuatankduntukrppini.offsetLeft + tambahmuatankduntukrppini.offsetWidth + 10) + "px"
        let lTop = (tambahmuatankduntukrppini.offsetTop) + "px";
        // console.log("Left tool " + lLeft)
        // console.log("top tool " + lTop)
    let tool = document.getElementById("tooltipMuatanMapelTematik");
    let modal = document.getElementById("prev_rpp");
    tool.style.left = lLeft;
    tool.style.top = lTop;
    tool.style.display = "block";

    //nama-nama mapel dalam tema di jenjang
    let TinggiTemaRendahGanjil = ["TEMA 1","TEMA 2","TEMA 3","TEMA 4"];
    let TinggiTemaRendahGenap = ["TEMA 5","TEMA 6","TEMA 7","TEMA 8"];
    let arrTemaTinggiGanjil = ["TEMA 1","TEMA 2","TEMA 3","TEMA 4","TEMA 5"];
    let arrTemaTinggiGenap = ["TEMA 6","TEMA 7","TEMA 8","TEMA 9"];
    let arrCodeMapelRendah = ["PKN","BINDO","MTK","SBDP","PJOK"];
    let arrCodeMapelTinggi = ["PKN","BINDO","IPA","IPS","SBDP"];
    let arrHeaderTinggi = ["PKN","Bahasa Indonesia","IPA","IPS","SBDP"]
    let arrHeaderRendah = ["PKN","Bahasa Indonesia","MATEMATIKA","SBDP","PJOK"];

    let kolNamaMapel;
    let kolCodeMapel
    if(idJenjang > 3){
        kolCodeMapel = arrCodeMapelTinggi;
        kolNamaMapel = arrHeaderTinggi;
    }else{
        kolCodeMapel = arrCodeMapelRendah;
        kolNamaMapel = arrHeaderRendah;
    }
    //bekerja dengan Select
    let op = "";
    let divop = document.querySelector(".muatanmapeltematik");
    divop.innerHTML = "";
    op = `<option value="default" selected>Pilih Mapel</option>`;
    for(i = 0 ; i < kolCodeMapel.length ; i++){
        op += `<option value="${kolCodeMapel[i]}">${kolNamaMapel[i]}</option>`;
    }
    divop.innerHTML = op;

    let dbSebaranKD = gabungdataserverkd();
    let tempattombolkdmuatanmapel = document.querySelector(".tempattombolkdmuatanmapel");
    if(tempattombolkdmuatanmapel.className.indexOf("w3-hide")==-1){
        tempattombolkdmuatanmapel.classList.add("w3-hide")
    }

    divop.addEventListener("change",()=>{
        let sel = document.querySelector(".muatanmapeltematik");
        let ops = sel.options;
        let ind = ops.selectedIndex;
        let v = ops[ind].value;
        let T = ops[ind].text;
        if(v =="default"){
            return
        }
        tempattombolkdmuatanmapel.classList.remove("w3-hide");
        // console.log("Nama Mapel : "+T)
        // console.log("Nama Mapel : "+v);
        let koleksiKDselect = dbSebaranKD.filter(s => (s.indikatorkd4 !=="" || s.indikatorkd3 !=="") && s.mapel==v);
        //let isikan koleksi tiap-tiap KD:
        let tombol = document.querySelectorAll(".rppbadge_kd");
        let infowajarkd = document.querySelector(".infowajarkd");
        infowajarkd.innerHTML = "";
        
        let count_coret = 0
        for(j=0; j< koleksiKDselect.length ; j++){
            let adaceklis = koleksiKDselect[j][ceklis]
            if(adaceklis !==""){
                tombol[j].setAttribute("title","KD sudah digunakan di RPP ini")
                tombol[j].setAttribute("disabled","true")
                tombol[j].innerHTML = "<s>"+koleksiKDselect[j].kd+"</s>";
                count_coret++
            }else{
                tombol[j].innerHTML = koleksiKDselect[j].kd;
                let infoTeksInd = koleksiKDselect[j].indikatorkd3;
                tombol[j].setAttribute("data-infokdini",infoTeksInd)
                if(tombol[j].hasAttribute("disabled")){
                    tombol[j].removeAttribute("disabled")
                }
                if(tombol[j].hasAttribute("title")){
                    tombol[j].removeAttribute("title")
                }
            }
            if(tombol[j].className.indexOf("w3-hide")>-1){
                tombol[j].classList.remove("w3-hide");
                if(tombol[j].hasAttribute("disabled")){
                    tombol[j].removeAttribute("disabled")
                }
            }
        }
        if(count_coret >=4){
            infowajarkd.innerHTML = "KD dalam Mata Pelajaran " + convertcodemapelkemapel(v) + " di RPP ini tidak wajar! Seharusnya, KD dalam mata pelajaran yang sama paling banyak berjumlah 4 KD. Anda tidak bisa menambahkan KD untuk mata pelajaran ini lagi.";
        }
        //sisa tombol tolong disembunyikan
        for(k=koleksiKDselect.length ; k < tombol.length ; k++){
            tombol[k].classList.add("w3-hide");
        }

        //jika sudah dikenakan kd, tinggal berikan event tiap-tiap tombol, tapi deklarasi dulu biar aman jika ada perubahan terjadi
        let tmb = document.querySelectorAll(".rppbadge_kd");
        for(l = 0 ; l < tmb.length ; l++){
            tmb[l].onmouseover = function(){
                let tekstitle = this.getAttribute("data-infokdini")
                infowajarkd.innerHTML = tekstitle;
            }
            tmb[l].onmouseout = function(){
                infowajarkd.innerHTML = ""
            }
            tmb[l].onclick = async function(){
                // let kdklik = tmb[l].innerHTML;
                let kdklik = this.innerHTML;
                        let dbServer = koleksiKDselect.filter(s => s.kd == kdklik)
                        let barisServer = dbServer[0].row;
                    
                        tool.style.display = "none";
                        modal.style.display = "block";
                        
                        await cekserverAdmKD(barisServer, theme, semester,ceklis);
                        await simpanserverrppbaru (ceklis,"tematik", semester)
                        modal.style.display = "none";
            }
        }


    })
dragElement(tool)

}

const modagantieditrpp = (brs, theme,semester,ceklis) => {
    console.log(brs)
    console.log(theme)
    console.log(semester)
    console.log(ceklis)
    let modal = document.getElementById("prev_rpp");
    modal.style.display = "none";

    // simpan ke Sheet Adm Kepsek tab serverkd => result updatenya tagserverkd
    // lalu simpan lagi ke sheet Kaldik di tab rpp
    let srv_brs = tagrppserver.filter(s=> s.jenjang_kelas == idJenjang && s.tema_mapel == ceklis);
    console.log("srv_brs pasti kosong jika dalam moda baru dibikin untuk thema :" + ceklis )
    console.log(srv_brs)
    console.log("sumber asli:" )
    let sAsli = tagrppserver.filter(s=> s.jenjang_kelas == idJenjang);
    console.log(sAsli);
    let tombolAwal = document.querySelector(".resultcreatepilihrpp")
    tombolAwal.innerHTML = "Anda dalam situasi mengedit RPP dari server secara langsung.";
}

const cekserverAdmKD = async (row,tema,semester,ceklis) =>{ // untuk TEMATIK

    let obSource = Object.assign({},tagkdserver.filter(s => s.row == row)[0]);
    let cekKoleksitema = obSource.koleksitema;
    let cekSemester = obSource.semester;
    let resTema = [];
    let resSemester = [];
    
    if(cekKoleksitema !== ""){
        let arrKolTema = JSON.parse(cekKoleksitema);
        let cekParamTema = arrKolTema.indexOf(tema);
        resTema = arrKolTema;
        if(cekParamTema == -1){
            //ga ada, maka push:
            resTema.push(tema)
        }else{
            resTema = arrKolTema;
        }
    }else{
        resTema.push(tema)
    }

    if(cekSemester !== ""){
        let arSrc = JSON.parse(cekSemester);
        resSemester = arSrc;
        let cekS = arSrc.indexOf(semester);
        if(cekS == -1){
            resSemester.push(semester)
        }else{
            resSemester = arSrc;
        }
    }else{
        resSemester.push(semester)
    }
    
    //await fetch(url) //s[key_nama] == "✓"
    let objekBaru = {};
    objekBaru.koleksitema = JSON.stringify(resTema);
    objekBaru.semester = JSON.stringify(resSemester);
    objekBaru[ceklis] = "✓";
    
    let objekKirim = Object.assign(obSource,objekBaru);
    let tab = "serverkd";
    let key = Object.keys(objekKirim);
    let val = Object.values(objekKirim);
    let dataform = new FormData();
    dataform.append("idbaris", row);
    dataform.append("tab", tab);
    dataform.append("key", JSON.stringify(key))
    dataform.append("tabel", JSON.stringify(val))
    await fetch(urladm+"?action=simpanbarisketabidbaris",{
        method:"post",
        body:dataform
    }).then(m=>m.json())
    .then(r => {
        let result = r.data;
        alltagkdserver = result;
        tagkdserver = result.filter(s => s.kelas == idJenjang);
    }).catch(er=> console.log(er));


    
}
const simpanserverrppbaru = async (ceklis,pilihantematik, semester) =>{
    let tagrpundf = {"idbaris":"","jenjang_kelas":"","tematik_nontematik":"","tema_mapel":"","subtema_materipokok":"","semester":"","muatan_terpadu":"","alokasi_waktu":"","tujuan_pembelajaran":"","kegiatan_pendahuluan":"","kegiatan_inti":"","kegiatan_penutup":"","penilaian":"","rubrik_0":"","rubrik_1":"","rubrik_2":"","rubrik_3":"","rubrik_4":"","rubrik_5":"","rubriktipe_0":"","rubriktipe_1":"","rubriktipe_2":"","rubriktipe_3":"","rubriktipe_4":"","rubriktipe_5":"","aw_awal":"","aw_inti":"","aw_penutup":""};
    let cektgrpp = tagrppserver.length == 0|| tagrppserver == undefined?tagrpundf : tagrppserver[0];
            
    let pinjemObjek = Object.assign({},cektgrpp);
    let keyHeader = Object.keys(pinjemObjek);
    let obPram = {};
    for(let key in keyHeader){
        obPram[keyHeader[key]] = "";
    }
        obPram.tema_mapel = ceklis;
        obPram.jenjang_kelas = idJenjang;
        obPram.tematik_nontematik = pilihantematik;
        obPram.semester = semester;
        obPram.alokasi_waktu = document.querySelector(".dsgnrpp_alokasiwaktu").innerHTML;

    let ObjekKirim = Object.assign(pinjemObjek, obPram);
    let objekVal = Object.values(ObjekKirim);
    objekVal.shift();
    let objekKey = Object.keys(ObjekKirim);


//sekarang ujicoba untuk post
        let key = JSON.stringify(objekKey);
        let isi = JSON.stringify(objekVal);
        let datakirim = new FormData();
        datakirim.append("tabel",isi);
        datakirim.append("key",key);
        datakirim.append("tab","rpp");
        //datakirim.append("tipe",tipe); kalo ada format tanggal, kasih aja
        fetch(url_kaldikaja+"?action=simpanbarisketaburut",{
            method:"post",
            body:datakirim
        }).then(m => m.json())
        .then(r => {
            tagrppserver = r.data.filter(s=>s.jenjang_kelas == idJenjang);
            let rServer = tagrppserver.filter(s=> s.tema_mapel == ceklis)[0].idbaris;
            htmlrpp_dariserver(rServer);
            let tombolAwal = document.querySelector(".resultcreatepilihrpp");
            tombolAwal.innerHTML = "Anda dalam situasi pengeditan RPP dari pembuatan RPP yang belum pernah ada di server. Saat ini, RPP ini sudah berada di database ke-" + rServer;

        })
        .catch(er => console.log(er))    
        //datakirim.append("tab",tab);
        //datakirim.append("key",key);"simpanAdm"
}

const Editrppawal = (row) =>{ //seharusnya editrppawal = rpp yang dipanggil dari server (tagrppserver)
    let db = tagrppserver.filter(s=> s.idbaris == row)[0];
    
    let rw =db.idbaris;
    htmlrpp_dariserver(rw);
    

}

const htmlrpp_dariserver = (row) =>{
    //database dari server dan local_storage
    //console.log(row)
    let db = tagrppserver.filter(s => s.idbaris == row)[0];
    //console.log(db)
    
    let teksKD = DataKDKurtilas["kelas"+idJenjang];
    let kurikulum = gabungdataserverkd();
    let cekObJadwalTematik,tglKetemutematik;
    let spantanggal = document.querySelectorAll(".dsgnrpp_tgl");

    // DISPLAY DESAIN
    let desainarea_rpp = document.querySelector(".desainarea_rpp");
    let div_rppnontematik = document.querySelector(".clue_dsgnrpp_nontematik");
    desainarea_rpp.classList.remove("w3-hide");
    let div_rpptematik = document.querySelector(".clue_dsgnrpp_tematik");
    div_rpptematik.classList.add("w3-hide");
    div_rppnontematik.classList.add("w3-hide");
    // paramater:
    /**
     * 
        tagrpp_semester
        tagrpp_temanontema
        tagfokusrpp:
            tagfokusmapel
            tagfokustextarea
            tagfokustema
            tagfokussubtema
            tagfokuspb
        konversi tagfokusrpp:
        //rpp tematik:
        tagfokusrpp = "t6_st1_pb" => string
        // rpp nontematik
        tagfokusrpp = [tagfokusmapel, tagfokustexare]
     */

    // IDENTITAS GLOBAL
    let div_namasekolah = document.querySelectorAll(".dsgnrpp_namasekolah");
    let div_kelasini = document.querySelectorAll(".dsgnrpp_kelasini");
    let div_judullampiran = document.querySelectorAll(".h_judullampiran");
    let div_semester =document.querySelector(".dsgnrpp_semester");
    let prt_judul = document.querySelector(".prt_judul");

    let div_alokasiwaktu = document.querySelector(".dsgnrpp_alokasiwaktu");
    let div_tgl = document.querySelectorAll(".dsgnrpp_tgl")[0]
    
    let tema_mapel = Array.isArray(tagfokusrpp)?tagfokusrpp[0]:tagfokusrpp; // t6_st1_pb1 atau MTK
    let tekstema_mapel = Array.isArray(tagfokusrpp)?convertcodemapelkemapel(tagfokusrpp[0]):"TEMA "+tagfokusrpp.split("_")[0].match(/(\d+)/)[0]+" SUBTEMA "+tagfokusrpp.split("_")[1].match(/(\d+)/)[0]+" PEMBELAJARAN "+tagfokusrpp.split("_")[2].match(/(\d+)/)[0];

    // isi identitas global
    div_alokasiwaktu.innerHTML = db.alokasi_waktu;
    prt_judul.innerHTML = tekstema_mapel;
    div_semester.innerHTML = tagrpp_semester;
    div_kelasini.forEach(el =>el.innerHTML = idNamaKelas);
    div_namasekolah.forEach(el =>el.innerHTML = idNamaSekolah);
    div_judullampiran.forEach(el=> el.innerHTML = tekstema_mapel);

    //identitas TANDA TANGAN
    let dsgnrpp_namakepsek = document.querySelectorAll(".dsgnrpp_namakepsek");
    let dsgnrpp_nipkepsek = document.querySelectorAll(".dsgnrpp_nipkepsek");
    let dsgnrpp_namaguru = document.querySelectorAll(".dsgnrpp_namaguru");
    let dsgnrpp_nipguru = document.querySelectorAll(".dsgnrpp_nipguru");
    
    dsgnrpp_namakepsek.forEach(el=> el.innerHTML = idNamaKepsek);
    dsgnrpp_nipkepsek.forEach(el=> el.innerHTML = idNipKepsek);
    dsgnrpp_namaguru.forEach(el=> el.innerHTML = namauser);
    dsgnrpp_nipguru.forEach(el=> el.innerHTML = idNipGuruKelas==""?"-":"NIP. "+idNipGuruKelas);
    
    // IDENTITAS BERDASARKAN TEMATIK/NONTEMATIK
    let div_muatanterpadu =  document.querySelectorAll(".koleksimapel_muatanterpaduMP");
    let tujuanpembelajaran = document.querySelector(".prt_tujuanpembelajaran");
    let tambahkanrubrik = document.querySelector(".tambahkanrubrik");
    let penilaian = document.querySelector(".prt_penilaian");
    // elemen ini bertugas sebagai tombol, tidak bisa diisi dengan innerHTML
    let langkahpendahuluan = document.querySelector(".langkahpendahuluan");
    let langkahinti = document.querySelector(".langkahinti");
    let langkahpenutup = document.querySelector(".langkahpenutup");
    // part muatan:
    let judullangkahpendahuluan = document.querySelector(".judul_langkahpendahuluan");
    let isilangkahpendahuluan = document.querySelector(".isi_langkahpendahuluan");
    let judullangkahinti = document.querySelector(".judul_langkahinti");
    let isilangkahinti = document.querySelector(".isi_langkahinti");
    let judullangkahpenutup = document.querySelector(".judul_langkahpenutup");
    let isilangkahpenutup = document.querySelector(".isi_langkahpenutup");

    // ISI MUATAN INTI (TUJUAN, KEGIATAN, PENUTUP BERDASARKAN DB)
    tujuanpembelajaran.innerHTML = db.tujuan_pembelajaran==""?"KLIK DI SINI UNTUK MENAMBAHKAN TUJUAN PEMBELAJARAN": db.tujuan_pembelajaran;
    penilaian.innerHTML =  db.penilaian ==""?"KLIK DI SINI UNTUK MENAMBAHKAN PENILAIAN" : db.penilaian;

    judullangkahpendahuluan.innerHTML = db.aw_awal==""?"... Menit.": db.aw_awal+" Menit.";
    judullangkahinti.innerHTML = db.aw_inti==""?"... Menit.": db.aw_inti+" Menit.";
    judullangkahpenutup.innerHTML = db.aw_penutup==""?"... Menit.":db.aw_penutup+" Menit.";
    
    isilangkahpendahuluan.innerHTML = db.kegiatan_pendahuluan==""?"KLIK DI SINI UNTUK MENAMBAHKAN KEGIATAN PENDAHULUAN DAN ALOKASI WAKTUNYA": db.kegiatan_pendahuluan;
    isilangkahinti.innerHTML = db.kegiatan_inti==""?"KLIK DI SINI UNTUK MENAMBAHKAN KEGIATAN INTI DAN ALOKASI WAKTUNYA": db.kegiatan_inti;
    isilangkahpenutup.innerHTML = db.kegiatan_penutup==""?"KLIK DI SINI UNTUK MENAMBAHKAN KEGIATAN INTI DAN ALOKASI WAKTUNYA": db.kegiatan_penutup;

    // IDENTITAS KHUSUS TEMATIK
    div_muatanterpadu.forEach(el => el.innerHTML = "");

    // IDENTITAS KHUSUS NONTEMATIK
    let div_materipokok = document.querySelector(".dsgn_materipokok");
    let div_matapelajaran = document.querySelector(".dsgn_matapelajaran");
    div_matapelajaran.innerHTML = "";
    div_materipokok.innerHTML = "";

    // khusus tabel Lampiran Penilaian sikap. Tabel lampiran lain sesuai dengan jumlah rubrik yang dibuat
    let tbl = document.querySelector(".tabel_lampiran1");
    let tb = tbl.getElementsByTagName("tbody")[0];
    let html="";
    for(i = 0 ; i < jsondatasiswa.length ; i++){
        html +=`<tr><td>${i+1}</td><td>${jsondatasiswa[i].pd_nama}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`;
    }
    tb.innerHTML = html;

    /// masalahrubrik;
    let rubrik_rpp = document.querySelector(".rubrik_rpp");
    let lampiranrubrik = document.querySelector(".lampirantambahanrubrik");
    let objekrubrik = Object.fromEntries(Object.entries(db).filter(([k,v])=> k.indexOf("rubrik_")>-1));
    let arrObjekrubrik = Object.keys(objekrubrik);
    let htm = "";
    let ar_htm =[];
    
    for(j = 0 ; j < arrObjekrubrik.length ; j++){
        let ke = arrObjekrubrik[j];
        let t_ke = ke.replace("rubrik","rubriktipe")
        let isidbke = db[ke];
        if(isidbke !== ""){
            htm +=`<div class="w3-border w3-round-large w3-padding w3-margin-bottom"><div class="w3-button w3-hide-small w3-right" data-barisrubrik="${row}" data-fokuskeyrubrik="${ke}" onclick="hapusrubrikini(this)"><i class="fa fa-trash" title="Hapus rubrik ini"></i></div>${db[ke]}</div>`;
            ar_htm.push(db[t_ke])
        }

    }
    if(htm !== ""){
        rubrik_rpp.innerHTML = htm;
    }
    let ht_rb = "";
    if(ar_htm.length > 0){
        for(u = 0 ; u < ar_htm.length ; u++){
            let rubrikkode = ar_htm[u];
            ht_rb += htmllampiran_rubrik(rubrikkode,u)
        }
        lampiranrubrik.innerHTML = ht_rb;
    }

    
    spantanggal = document.querySelectorAll(".dsgnrpp_tgl");
    

    if(tagrpp_temanontema){
        //identitas TEMATIK by db RPP
        let isitema = teksKD.filter(s=> s["Tema "+tagfokustema])[0]
        document.querySelector(".dsgnrpp_tema").innerHTML ="TEMA " + tagfokustema +"<br>" + isitema["Tema "+tagfokustema];
        document.querySelector(".dsgnrpp_subtema").innerHTML ="SUBTEMA " + tagfokussubtema +"<br>" + isitema["Subtema "+tagfokussubtema];
        document.querySelector(".dsgnrpp_pembelajaran").innerHTML ="Pembelajaran " + tagfokuspb;
        //Muatan Terpadu berdasarkan data ceklis di data kurikulum:
        let dataCeklis = kurikulum.filter(s => s.semester.indexOf(tagrpp_semester)>-1 && s[tema_mapel] !=="");
        let objekData_this = dataCeklis.filter(s => s[tagfokusrpp] !=="").map(m => Object.fromEntries(Object.entries(m).filter(([k,v])=>k == "mapel" || k == "kd" ||  k =="kd4")));
        
        for(i = 0 ; i < objekData_this.length && i < div_muatanterpadu.length ; i++){
            div_muatanterpadu[i].innerHTML = convertcodemapelkemapel(objekData_this[i].mapel) + " (" + objekData_this[i].kd +"/" + objekData_this[i].kd4 + ")";
        }
        //DISPLAY TEMATIK
        if(div_rpptematik.className.indexOf("w3-hide")>-1){
            div_rpptematik.classList.remove("w3-hide")
        }
        if(div_rppnontematik.className.indexOf("w3-hide")==-1){
            div_rppnontematik.classList.add("w3-hide")
        }
        // MASALAH TANGGAL PELAKSANAAN TEMATIK SESUAI KALDIK
        if(localStorage.hasOwnProperty("jadwaltematik_"+tagrpp_semester)){
            cekObJadwalTematik  = JSON.parse(localStorage.getItem("jadwaltematik_"+tagrpp_semester));
            tglKetemutematik = cekObJadwalTematik[tema_mapel];
            spantanggal.forEach((el,i) => i == 0? el.innerHTML = Tanggaldenganhari(tglKetemutematik):el.innerHTML = tanggalfull(tglKetemutematik));
            //console.log(cekObJadwalTematik);
        }else{
            spantanggal.forEach(el => el.innerHTML = "isi manual atau cek di Menu Kalender Pendidikan dan Submenu Jadwal Pembelajaran Tentatif");
        }
        //konfirmasi tooltip:
        let tambahmuatankduntukrppini = document.querySelector(".tambahmuatankduntukrppini");
        tambahmuatankduntukrppini.onclick = function(){
            tooltipMuatanMapel("TEMA "+tagfokustema,tagrpp_semester,tagfokusrpp);
        }
        /// TOOLTIP
        tujuanpembelajaran.onclick=function(){
            tooltipIsianRPP ("ada","prt_tujuanpembelajaran", tagfokusrpp, "tematik", tagrpp_semester, row,"","")
            
        }
        langkahpendahuluan.onclick=function(){
            tooltipIsianRPP ("ada","langkahpendahuluan", tagfokusrpp, "tematik", tagrpp_semester, row,"","aw_awal")
        }

        langkahinti.onclick=function(){
            tooltipIsianRPP ("ada","langkahinti", tagfokusrpp, "tematik", tagrpp_semester, row,"","aw_inti")
        }

        langkahpenutup.onclick=function(){
            tooltipIsianRPP ("ada","langkahpenutup", tagfokusrpp, "tematik", tagrpp_semester, row,"","aw_penutup")

        }
        penilaian.onclick=function(){
            tooltipIsianRPP ("ada","prt_penilaian", tagfokusrpp, "tematik", tagrpp_semester, row,"","")
        }
        tambahkanrubrik.onclick = function () {
            tooltipIsianRPP ("rubrik","tambahkanrubrik", tagfokusrpp, "tematik", tagrpp_semester, row,ar_htm.length,"");
        }


    }else{
        if(div_rppnontematik.className.indexOf("w3-hide")>-1){
            div_rppnontematik.classList.remove("w3-hide")
        }
        if(div_rpptematik.className.indexOf("w3-hide")==-1){
            div_rpptematik.classList.add("w3-hide")
        }
        let t_p = new Date(db.muatan_terpadu);
        div_matapelajaran = convertcodemapelkemapel(db.tema_mapel);
        div_materipokok = db.subtema_materipokok;
        spantanggal.forEach((el,i) => i == 0? el.innerHTML = Tanggaldenganhari(t_p):el.innerHTML = tanggalfull(t_p));

        div_tgl.onclick=function(){
            tooltip_tgljppelaksanaanrpp(row,tema_mapel,tagrpp_semester,this)

        }
        /// TOOLTIP
        tujuanpembelajaran.onclick=function(){
            tooltipIsianRPP ("edit","prt_tujuanpembelajaran", tema_mapel, "nontematik", tagrpp_semester, row,"","")
        }
        langkahpendahuluan.onclick=function(){
            tooltipIsianRPP ("edit","langkahpendahuluan", tema_mapel, "nontematik", tagrpp_semester, row,"","aw_awal")
        }

        langkahinti.onclick=function(){
            tooltipIsianRPP ("edit","langkahinti", tema_mapel, "nontematik", tagrpp_semester, row,"","aw_inti")
        }

        langkahpenutup.onclick=function(){
            tooltipIsianRPP ("edit","langkahpenutup", tema_mapel, "nontematik", tagrpp_semester, row,"","aw_penutup")

        }
        penilaian.onclick=function(){
            tooltipIsianRPP ("edit","prt_penilaian", tema_mapel, "nontematik", tagrpp_semester, row,"","")
        }
        tambahkanrubrik.onclick = function () {
            tooltipIsianRPP ("rubrik","tambahkanrubrik", tema_mapel, "nontematik", tagrpp_semester, row, ar_htm.length,"");
        }
        //div_materipokok.innerHTML = tekstema_mapel;
    }
}
let valtiperubrik
const tooltipIsianRPP =  (situasi,kelastarget, temamapel, pilihantematik, semester, row, indekrubrik,fokus_aw) =>{
    //definisi:
    /** Parameter:
     * situasi: Baru buat RPP atau mengedit RPP dari server
     * kelastarget: kelas yang akan dimasukkan termasuk keyHeader yang bakal dikirim
     * temampel : jika tematik, maka result akhirnya t6_st1_pb1, jika nontematik resultnya MTK, PAI, PJOK, dll
     * pilihantematik: tematik atau nontematik
     * semester: pilihan isian yang sedang dibuat semesternya
     * row: baris dari database tagrppserver
     */
    //bekerja dengan aksiserver:
    let tool = document.getElementById("tooltipketikanrpp");
    let simpanserver_tooltipketikanrpp = document.querySelector(".simpanserver_tooltipketikanrpp");
    let iframebody = doctooltip.getElementById("edt2");//document.querySelector("#iframe_tooltipketikanrpp")
    let info = document.querySelector(".informasi_tooltiprpp");
    //sebelum bekerja, hapus dulu isian bodynya
    iframebody.innerHTML = "";
    //bekerja dengan display input JP
    let infut = document.querySelector(".tooltipketikanrpp_inputjp");
    infut.value = "";
    let div_infut = document.querySelector(".tooltipketikanrpp_jp");
    if(kelastarget.indexOf("langkah")==-1){
        div_infut.classList.add("w3-hide");
    }else{
        if(div_infut.className.indexOf("w3-hide")>-1){
            div_infut.classList.remove("w3-hide");
        }
    }
    let aksiserver;
    let param_tab = "rpp";
    let pilihRubrik = document.querySelector(".sampelrubrik")
    if(situasi == "baru"){
        aksiserver =url_kaldikaja + "?action=simpanbarisketaburut";
        if(pilihRubrik.className.indexOf("w3-hide")==-1){
            pilihRubrik.classList.add("w3-hide");
        }
        
    }else if(situasi == "rubrik"){
        aksiserver = url_kaldikaja + "?action=simpanbarisketabidbaris";
        if(pilihRubrik.className.indexOf("w3-hide")>-1){
            pilihRubrik.classList.remove("w3-hide");
        }
        if(indekrubrik >=6){
            alert("Maaf, Anda sudah mencapai ambang batas dalam pembuatan rubrik di rpp ini. Maksimal jumlah rubrik adalah 6 di setiap RPP.");
            tool.style.display = none;
            return
        }
    }else{
        aksiserver = url_kaldikaja + "?action=simpanbarisketabidbaris";
        if(pilihRubrik.className.indexOf("w3-hide")==-1){
            pilihRubrik.classList.add("w3-hide");
        }
    }
    //

    //bekerja dengan tag pada tooltip;
    let tagsituasi = document.querySelector(".situasibuat_tooltipketikanrpp");
    let tagtematiknon = document.querySelector(".tematiknontematik_tooltipketikanrpp");
    let tagsemester = document.querySelector(".semester_tooltipketikanrpp");
    let tagfokus = document.querySelector(".temammapel_tooltipketikanrpp");
    let tagBarisdb = document.querySelector(".barisdatabase_tooltipketikanrpp");
    tagsituasi.innerHTML = situasi;
    tagtematiknon.innerHTML = pilihantematik;
    tagsemester.innerHTML = semester;
    tagfokus.innerHTML = temamapel;
    tagBarisdb.innerHTML = row ==""?"Baru":row;
    info.innerHTML ="Saat ini Anda akan mengetik pada kompononen RPP " + pilihantematik + " dengan tema/mapel " + temamapel;
    // Bekerja dengan tooltip
    
    let posisiTarget = document.querySelector("." +kelastarget);
    //bekerja dengan Display tooltip;
    let lTop = (posisiTarget.offsetTop + 30)+"px";
    let lLeft = (posisiTarget.offsetLeft + 10)+"px";
    tool.style.left = lLeft;
    tool.style.top = lTop;
    tool.style.display = "block";
    
    //bekerja dengan db dan reQuest
    // cari Key untuk server
    let keykirimketikan = keyRPPServer(kelastarget);
    let ChecedRubrik = document.querySelectorAll("input[name=piihansampelrubrik]");
    
    
    simpanserver_tooltipketikanrpp.onclick = async function (){
        let isiframe = iframebody.innerHTML;
        if(isiframe ==""){
            alert("Anda tidak boleh mengirimkan nilai ini dengan isian kosong!");
            return
        }
        
        let resultframe = isiframe.replace(/(\r\n|\n|\r)/gm, "").replace(/\s\s/g,"");
        
        /// sekarang ujicoba pengisianyya
        //khsusu kelastarget yang ada kata langkah-nya, maka itu dipastikan ga perlu isian
        if(kelastarget == "tambahkanrubrik"){
            document.querySelector(".rubrik_rpp").innerHTML = resultframe;
        }else if(kelastarget.indexOf("langkah")==-1){
            document.querySelector("."+kelastarget).innerHTML = resultframe;
        }else{
            document.querySelector(".isi_"+kelastarget).innerHTML = resultframe;
            document.querySelector(".judul_"+kelastarget).innerHTML = infut.value + " Menit.";
        }
        // start dari sini 
        let datakirim = new FormData();
        let objekServer;
        if(row ==""){
            objekServer={"idbaris":"","jenjang_kelas":"","tematik_nontematik":"","tema_mapel":"","subtema_materipokok":"","semester":"","muatan_terpadu":"","alokasi_waktu":"","tujuan_pembelajaran":"","kegiatan_pendahuluan":"","kegiatan_inti":"","kegiatan_penutup":"","penilaian":"","rubrik_0":"","rubrik_1":"","rubrik_2":"","rubrik_3":"","rubrik_4":"","rubrik_5":"","rubriktipe_0":"","rubriktipe_1":"","rubriktipe_2":"","rubriktipe_3":"","rubriktipe_4":"","rubriktipe_5":"","aw_awal":"","aw_inti":"","aw_penutup":""};
        }else{
            objekServer = tagrppserver.filter(s=> s.idbaris == row)[0];
        }
        let pinjemObjek = Object.assign({}, objekServer);
        let keyHeader = Object.keys(pinjemObjek);
        let ObjekKirim ={};
        let aksitool;
        let objekVal = [];
        if(situasi == "baru"){
            aksitool = url_kaldikaja+"?action=simpanbarisketaburut";
            let obPram = {};
            for(let key in keyHeader){
                obPram[keyHeader[key]] = "";
            }
            if(fokus_aw !==""){
                obPram[fokus_aw]=infut.value;
            }
            obPram.tema_mapel = temamapel;
            obPram.jenjang_kelas = idJenjang;
            obPram.tematik_nontematik = pilihantematik;
            obPram.semester = semester;
            
            obPram[keykirimketikan] = resultframe;
            obPram.alokasi_waktu = document.querySelector(".dsgnrpp_alokasiwaktu").innerHTML;
            ObjekKirim = Object.assign(pinjemObjek, obPram);
            objekVal = Object.values(ObjekKirim);
            objekVal.shift();
        }else if(situasi=="rubrik"){
            if(valtiperubrik == undefined){
                alert("Seharusnya Anda memilih tipe rubrik yang akan dibuat untuk membantu Anda dalam pengisian data rubrik!");
                return
            }
            aksitool = url_kaldikaja+"?action=simpanbarisketabidbaris"
            let oR = {};
            oR["rubriktipe_"+indekrubrik] = valtiperubrik;
            oR["rubrik_"+indekrubrik] = resultframe;
            ObjekKirim = Object.assign(pinjemObjek, oR);
            objekVal = Object.values(ObjekKirim);
            datakirim.append("idbaris",row);
        }else{
            let ob = {}
            ob[keykirimketikan] = resultframe;
            if(fokus_aw !==""){
                ob[fokus_aw]=infut.value;
            }
            ob.alokasi_waktu = document.querySelector(".dsgnrpp_alokasiwaktu").innerHTML;
            ObjekKirim = Object.assign(pinjemObjek, ob);
            objekVal = Object.values(ObjekKirim);
            aksitool = url_kaldikaja+"?action=simpanbarisketabidbaris";
            datakirim.append("idbaris",row);
        }
            let objekKey = Object.keys(ObjekKirim);
            //console.log(ObjekKirim);
            info.innerHTML =`<img src="/img/barloading.gif"/> Sedang proses menyimpan, mohon tunggu hingga selesai ...`
            //sekarang ujicoba untuk post
            let key = JSON.stringify(objekKey);
            let isi = JSON.stringify(objekVal);
        
            datakirim.append("tabel",isi);
            datakirim.append("key",key);
            datakirim.append("tab","rpp");
            //agar proses request menunggu, lebih baik ini dibikin async await saat fetching
        await fetch(aksitool,{
                method:"post",
                body:datakirim
            }).then(m => m.json())
            .then(r => {
            tagrppserver = r.data.filter(s=>s.jenjang_kelas == idJenjang);
            let rServer = tagrppserver.filter(s=> s.tema_mapel == temamapel)[0].idbaris;
            htmlrpp_dariserver(rServer);
            let tombolAwal = document.querySelector(".resultcreatepilihrpp");
            tombolAwal.innerHTML = "Anda dalam situasi pengeditan RPP dari pembuatan RPP yang belum pernah ada di server. Saat ini, RPP ini sudah berada di database ke-" + rServer +"("+row+")";
            info.innerHTML = "Berhasil tersimpan"
            }).catch(er => {
                info.innerHTML="Terjadi kesalahan!"
                console.log(er)
            })    

        // // setelah proses fetching selesai maka, tutup tool ini
        tool.style.display="none";
        
        
    }
    
    dragElement(tool);
}


//////////////////tes tooltip
const keyRPPServer = (kelastarget) => {
    let result 
    switch(kelastarget){
        case "prt_tujuanpembelajaran": 
        result = "tujuan_pembelajaran"
        break;
        case "langkahpendahuluan":
            result = "kegiatan_pendahuluan"
            break;
        case "langkahinti":
            result="kegiatan_inti"
            break;
        case "langkahpenutup":
            result="kegiatan_penutup"
            break;
        case "prt_penilaian":
            result ="penilaian"
            break;
        
        default:
            result = kelastarget

    }
    return result;
}

const onC_rubrik = (el) =>{
    let val = el.value;
    valtiperubrik = val;
    let Radios = document.querySelectorAll(".gambarseluruhrubrik");
    let dRadios = document.querySelector(".previewpilihanrubrik")
    if(dRadios.className.indexOf("w3-hide")>-1){
        dRadios.classList.remove("w3-hide")
    }
    Radios.forEach(img => {
        img.classList.add("w3-hide")
    })
    let idImg = document.getElementById("sampelrubrik"+val);
    idImg.classList.remove("w3-hide");
}

const tooltip_tgljppelaksanaanrpp =  (barisrpp, tema_mapel,semester,targetkelas) =>{
    let div_alokasiwaktu = document.querySelector(".dsgnrpp_alokasiwaktu");
    let namakelas = targetkelas.className;
    let tool = document.getElementById("tooltipkalendernontematik");
    let b_jp = document.querySelector(".jprpp_pelaksanaannontematik");
    b_jp.value = "";
    let b_dt = document.querySelector(".daterpp_pelaksanaannontematik");
    var Dd = new Date().toLocaleDateString().split('/');
    var today = Dd[2]+"-"+("0"+Dd[0]).slice(-2)+"-"+("0"+Dd[1]).slice(-2);
    b_dt.value = today;
    let save = document.querySelector(".simpandaterpp_pelaksanaannontematik");
    let info = document.querySelector(".tooltipkalendernontematik_info")
    let arrSrcIndex = ["","jp_sn","jp_sl", "jp_rb","jp_km","jp_jm",""];
    let arrHari = ["","Senin","Selasa", "Rabu","Kamis","Jumat",""];
    let arrDayHari = [0,1,2,3,4,5,6];
    let cekHarinya;
    let srcMapl =[];
    let arrCodeHari;
    let arrCodeJPterdeteksi;
    let hariOknontematik;
    let ob_sebaranHariEfektif
    if(localStorage.hasOwnProperty("loc_tagJPserver_"+semester)){
        let hr_nontematik = JSON.parse(localStorage.getItem("loc_tagJPserver_"+semester));
        tagJPserver = hr_nontematik;
        // tagJPkey = hr_nontematik[0];
        tagJPkey = {"idbaris":"","jenjangkelas":"","semester":"","mapeltema":"","kodemapel":"","jp_sn":"","jp_sl":"","jp_rb":"","jp_km":"","jp_jm":""};
        srcMapl = hr_nontematik.filter(s=>s.kodemapel == tema_mapel);
        if(srcMapl.length >0){
            cekHarinya = srcMapl.map(s=> Object.fromEntries(Object.entries(s).filter(([k,v])=> k.indexOf("jp_")>-1 && v !=="")));
            let keyOB = Object.keys(cekHarinya);
            if(keyOB.length ==0){
                info.innerHTML = "Pelaksanaan KBM Mata Pelajaran "+ tema_mapel +" Belum Anda atur untuk semester "+ tagrpp_semester+" ini. Silakan Anda atur dulu di Menu 'Kalender Pendidikan' pada submenu 'Sebaran Hari Efektif' dengan memilih Mata Pelajaran ini!";
                arrCodeHari=[];
                arrCodeJPterdeteksi = []
            }else{
                // let hariOknontematik = cekHarinya.map(m => Object.entries(m).map(([k,v])=> arrHari[arrSrcIndex.indexOf(k)])).join().split(",")
                hariOknontematik = srcMapl.map(s=> Object.fromEntries(Object.entries(s).filter(([k,v])=> k.indexOf("jp_")>-1 && v !==""))).map(m => Object.entries(m).map(([k,v])=> arrHari[arrSrcIndex.indexOf(k)] +" "+ v+" jp")).join().split(",");
                arrCodeHari = srcMapl.map(s=> Object.fromEntries(Object.entries(s).filter(([k,v])=> k.indexOf("jp_")>-1 && v !==""))).map(m => Object.entries(m).map(([k,v])=> arrDayHari[arrSrcIndex.indexOf(k)]))
                arrCodeJPterdeteksi = srcMapl.map(s=> Object.fromEntries(Object.entries(s).filter(([k,v])=> k.indexOf("jp_")>-1 && v !=="")));//
                info.innerHTML = "Pelaksanaan KBM Mata Pelajaran "+ convertcodemapelkemapel(tema_mapel) +" di semester "+tagrpp_semester+" ini dilaksanakan setiap hari " + hariOknontematik.join(", ");
            }
        }else{
            info.innerHTML = "Pelaksanaan KBM Mata Pelajaran "+ convertcodemapelkemapel(tema_mapel)  +" Belum Anda atur di semester "+ tagrpp_semester+" ini. Silakan Anda atur dulu di Menu 'Kalender Pendidikan' pada submenu 'Sebaran Hari Efektif' dengan memilih Mata Pelajaran ini!";
        }
        ob_sebaranHariEfektif = srcMapl[0];
    }else{
        info.innerHTML = "Pelaksanaan KBM Mata Pelajaran "+ convertcodemapelkemapel(tema_mapel)  +" Belum Anda atur di semester "+ tagrpp_semester+" ini. Silakan Anda atur dulu di Menu 'Kalender Pendidikan' pada submenu 'Sebaran Hari Efektif' dengan memilih Mata Pelajaran ini!";
        info.innerHTML +="<br><br>Jika Anda atur dari sini, semua database di menu Kalender Pendidikan sub Menu Sebaran hari Efektif akan berpengaruh (terupdate).";
        tagJPkey = {"idbaris":"","jenjangkelas":"","semester":"","mapeltema":"","kodemapel":"","jp_sn":"","jp_sl":"","jp_rb":"","jp_km":"","jp_jm":""};
        
    }
    
    let dLeft = (targetkelas.offsetLeft + targetkelas.offsetWidth + 10)+"px";
    let dTop = (targetkelas.offsetTop)+"px";
    tool.style.left = dLeft;
    tool.style.top = dTop;
    tool.style.display = "block";
    //// KONDISI:
        // console.log("srcMapl");
        // console.log(srcMapl);
        // console.log("cekHarinya")
        // console.log(cekHarinya);
        let aksiserver
        let idbarisServer = "";
        
        // console.log("srcMapl.length");
        // console.log(srcMapl.length);
        if(srcMapl.length==0){
            // kondisi dimana jenjang kelas belum pernah bikin sebaran hari efektif
            aksiserver = "akseiserver baru urut";
            // console.log("kondisi dimana mapel ini belum pernah dibuatkan jumlah JP");
            b_jp.setAttribute("title","masukkan angka JP!")
            b_jp.setAttribute("placeholder","data di server belum ada, masukkan angka JP!")
            
        }else{
            //kondisi dimana jenjang kelas sudah bikin sebaran hari efektif
            // tapi kita belum memastikan apakah user sudah menetapkan JP di hari-harinya
            aksiserver = " aksiserver di idbaris";
            // console.log(arrCodeHari[0])
            idbarisServer = srcMapl[0].idbaris
            if(arrCodeHari[0].length == 0){
                // console.log("jenjang kelas ini sudah ada data, tapi jp di hari-harinya ga ada yang diisi")
                //artinya, jenjang kelas ini sudah ada data, tapi jp di hari-harinya ga ada yang diisi
                b_jp.setAttribute("title","data di server ada, tapi belum menentukan hari dan JP")
                b_jp.setAttribute("placeholder","di server ada, masukkan angka JP")
            }else{
                // console.log(arrCodeHari[0]);
                // console.log(arrCodeJPterdeteksi[0]);
                let joinJPserver = Object.values(arrCodeJPterdeteksi[0]).join(", ")
                b_jp.setAttribute("title","angka yang boleh "+joinJPserver);
                b_jp.setAttribute("placeholder",hariOknontematik.join(", "));
                // console.log("jenjang kelas ini sudah ada data, dan data kode day hari-harinya yang terisi adalah")
            }
            // console.log(idbarisServer);


        }
    save.onclick = async function(){
        if(b_jp.value == ""){
            alert("Masukkan jumlah jam pelajaran (JP) untuk mata pelajaran ini!")
            return
        }
        let d = new Date(b_dt.value);
        
        if(d == undefined || d == "Invalid Date"){
            alert("Masukkan tanggal dengan benar")
            return
        }
        let hr = d.getDay();
        if(hr == 0 || hr == 6){
            alert("Hari Minggu dan Sabtu tidak bisa dibuatkan pelaksanaan RPP ini!");
            return
        }
        //console.log(arrCodeHari);
        
        if(arrCodeHari !== undefined && arrCodeHari[0].length !== 0){
            // kondisi dimana aplikasi tidak mengirimkan update di tab HEB
            if( arrCodeHari[0].indexOf(hr)==-1){
                let ko = confirm("Anda memasukkan jadwal hari untuk Mapel ini tidak sesuai denggan Sebaran hari Efektif. Seharusnya Anda memilih hari "+ hariOknontematik.join(", ") +" untuk mata pelajaran ini. Abaikan pesan ini?")
                if(!ko){
                    return
                }
                //console.log(hariOknontematik)
            }
        }else{
            info.innerHTML = `<img src="/img/barloading.gif"/> sedang mengupdate Sebaran Hari Efektif`;
            //kondisi dimana aplikasi mengirimkan update di tab HEB
            // console.log(idbarisServer);
            let aksi ;

            let datakirim = new FormData();
            //
            
            let otjp = Object.keys(tagJPkey);
            let oKey = Object.keys(tagJPkey);
            
            //localStorage.setItem("loc_tagJPserver_"+semester,
            // if(localStorage.hasOwnProperty("loc_tagJPserver_"+semester)){
            //     let lc_data = JSON.parse(localStorage.getItem("loc_tagJPserver_"+semester));
            //     if(lc_data.length == 0){
            //         alert("Maaf, sistem menolak. Anda harus melengkapi Distribusi KD di semester ini dengan lengkap!")
            //         return    
            //     }else{
            //         oKey = Object.keys(lc_data[0]);
            //     }
            // }else{
            //     alert("Maaf, sistem menolak. Anda harus melengkapi Distribusi KD di semester ini dengan lengkap!")
            //     return
            // }
            //
            
            
            let isibaru = {};
            let HEB_jp = arrSrcIndex[hr];
            let HEB_jpValue= b_jp.value;
            
            let head;
            let isii;
            let tab = "HEB";
            //console.log(idbarisServer);
            if(idbarisServer ==""){
                // console.log("kondisi dimana aplikasi mengirimkan update di tab HEB pertama kali");
                aksi = url_kaldikaja +"?action=simpanbarisketaburut";
                    for(i=0;i<oKey.length ; i++){
                        let tkey = oKey[i];
                        isibaru[tkey]="";
                    }
                    isibaru[HEB_jp] = HEB_jpValue;
                    isibaru.jenjangkelas=idJenjang;
                    isibaru.semester = semester;
                    isibaru.mapeltema= "nontematik";
                    isibaru.kodemapel = tema_mapel;
                    
                    head = Object.keys(isibaru);
                    isii = Object.values(isibaru);
                    isii.shift();                    
            }else{
                // console.log("kondisi dimana aplikasi mengirimkan update di tab HEB di baris " + idbarisServer );
                aksi = url_kaldikaja +"?action=simpanbarisketabidbaris";
                    let objek = Object.assign({},tagJPserver.filter(s=> s.idbaris== idbarisServer)[0]);
                    let obb = {};
                    obb[HEB_jp] = HEB_jpValue;
                    isibaru = Object.assign(objek,obb);
                    head = Object.keys(isibaru);
                    isii = Object.values(isibaru);
                    datakirim.append("idbaris",idbarisServer)
            }
            let key = JSON.stringify(head);
            datakirim.append("tab",tab);
            datakirim.append("key",key);
            
                let isi = JSON.stringify(isii);
                datakirim.append("tabel",isi);
            await fetch(aksi,{
                    method:"post",
                    body:datakirim
                }).then(m => m.json())
                .then(r => {
                    tagJPserver = r.data.filter(s => s.semester == semester && s.jenjangkelas == idJenjang);
                    localStorage.setItem("loc_tagJPserver_"+semester,JSON.stringify(tagJPserver));
                    tagJPkey = r.data[0];
                    info.innerHTML = `Selesai mengupdate Sebaran Hari Efektif`;
                }).catch(er => console.log(er))
        }
        //apapun hasilnya, isikan ditarget isian JP dan harinya
        // hari dikirim ke server tab rpp di kolom muatan_terpadu
        // jp dikirimkan ke server tab rpp pada kolom alokasi waktu
        // setelah terkirim, maka situasinya dalam keadaan edit
        div_alokasiwaktu.innerHTML = b_jp.value + " JP.";
        let koleksidivtanggal = document.querySelectorAll("."+namakelas);
        koleksidivtanggal.forEach((el,i) => i == 0? el.innerHTML = Tanggaldenganhari(b_dt.value):el.innerHTML = tanggalfull(b_dt.value));

        if(barisrpp == ""){
            //console.log("INI BUAT RPP BARU")
            let tagrpundf = {"idbaris":"","jenjang_kelas":"","tematik_nontematik":"","tema_mapel":"","subtema_materipokok":"","semester":"","muatan_terpadu":"","alokasi_waktu":"","tujuan_pembelajaran":"","kegiatan_pendahuluan":"","kegiatan_inti":"","kegiatan_penutup":"","penilaian":"","rubrik_0":"","rubrik_1":"","rubrik_2":"","rubrik_3":"","rubrik_4":"","rubrik_5":"","rubriktipe_0":"","rubriktipe_1":"","rubriktipe_2":"","rubriktipe_3":"","rubriktipe_4":"","rubriktipe_5":"","aw_awal":"","aw_inti":"","aw_penutup":""};
            let cektgrpp = tagrppserver.length == 0|| tagrppserver == undefined?tagrpundf : tagrppserver[0];
            let pinjemObjek = Object.assign({},cektgrpp);
            let keyHeader = Object.keys(pinjemObjek);
            let obPram = {};
            for(let key in keyHeader){
                obPram[keyHeader[key]] = "";
            }
                obPram.tema_mapel = tema_mapel;
                obPram.jenjang_kelas = idJenjang;
                obPram.tematik_nontematik = "nontematik";
                obPram.semester = semester;
                obPram.alokasi_waktu = b_jp.value + " JP.";
                obPram.muatan_terpadu = b_dt.value;
                obPram.subtema_materipokok = createrpp_textarea.value;
        
            let ObjekKirim = Object.assign(pinjemObjek, obPram);
            let objekVal = Object.values(ObjekKirim);
            objekVal.shift();
            let objekKey = Object.keys(ObjekKirim);
        
        
        
                let key = JSON.stringify(objekKey);
                let isi = JSON.stringify(objekVal);
                let datakirim = new FormData();
                datakirim.append("tabel",isi);
                datakirim.append("key",key);
                datakirim.append("tab","rpp");
                //datakirim.append("tipe",tipe); kalo ada format tanggal, kasih aja
                await fetch(url_kaldikaja+"?action=simpanbarisketaburut",{
                    method:"post",
                    body:datakirim
                }).then(m => m.json())
                .then(r => {
                    tagrppserver = r.data.filter(s=>s.jenjang_kelas == idJenjang);
                    let rServer = tagrppserver.filter(s=> s.tema_mapel == tema_mapel && s.subtema_materipokok == createrpp_textarea.value)[0].idbaris;
                    htmlrpp_dariserver(rServer);
                    let tombolAwal = document.querySelector(".resultcreatepilihrpp");
                    tombolAwal.innerHTML = "Anda dalam situasi pengeditan RPP dari pembuatan RPP yang belum pernah ada di server. Saat ini, RPP ini sudah berada di database ke-"+rServer;
        
                })
                .catch(er => console.log(er))            
        }else{
            //console.log("INI EDIT RPP BARU DI BARIS ROW " + barisrpp)
            let tt = tagrppserver.filter(s=> s.idbaris == barisrpp)[0];
            let pinjemObjek = Object.assign({},tt);
            let keyHeader = Object.keys(pinjemObjek);
            let obPram = {};
                obPram.alokasi_waktu = b_jp.value + " JP.";
                obPram.muatan_terpadu = b_dt.value;
        
            let ObjekKirim = Object.assign(pinjemObjek, obPram);
            let objekVal = Object.values(ObjekKirim);
        
            let objekKey = Object.keys(ObjekKirim);
        
        
        
                let key = JSON.stringify(objekKey);
                let isi = JSON.stringify(objekVal);
                let datakirim = new FormData();
                datakirim.append("tabel",isi);
                datakirim.append("key",key);
                datakirim.append("tab","rpp");
                datakirim.append("idbaris",barisrpp);
                //datakirim.append("tipe",tipe); kalo ada format tanggal, kasih aja
                await fetch(url_kaldikaja + "?action=simpanbarisketabidbaris",{
                    method:"post",
                    body:datakirim
                }).then(m => m.json())
                .then(r => {
                    tagrppserver = r.data.filter(s=>s.jenjang_kelas == idJenjang);
                    console.log(tagrppserver)
                    //let rServer = tagrppserver.filter(s=> s.tema_mapel == ceklis)[0].idbaris;
                    htmlrpp_dariserver(barisrpp);
                    let tombolAwal = document.querySelector(".resultcreatepilihrpp");
                    tombolAwal.innerHTML = "Anda dalam situasi pengeditan RPP dari pembuatan RPP yang belum pernah ada di server. Saat ini, RPP ini sudah berada di database di urutan ke-" + barisrpp;
        
                })
                .catch(er => console.log(er))   
        }
        tool.style.display = "none";
    }


}

const htmllampiran_rubrik = (rubrikkode,indekrubrik) =>{
    let html = `<div class="w3-col l2 s2 w3-sand w3-padding">
    <div class="flag w3-blue">Lampiran ${(indekrubrik+3)}</div>
    <h6>Daftar Nilai Rubrik ke-${(indekrubrik+1)}</h6>
    <div class="w3-border w3-round-large w3-margin-bottom w3-tiny w3-padding">
        Kriteria rubrik ada di Lampiran Rubrik RPP ini</div></div>
    <div class="w3-col l10 s10 w3-padding">
    <h4 class="w3-center">Daftar Nilai Rubrik ke-${(indekrubrik+1)}</h4>
        <div style="overflow-x:auto">`;

    let head, col;
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

    html +=`</div></div>
    <div class="w3-col l6 s6 m6 w3-center" style="visibility: hidden;">Mengetahui</div>
    <div class="w3-col l6 s6 m6 w3-center"><span class="dsgnrpp_kota">Depok</span>, <span class="dsgnrpp_tgl">RUBAH GA?</span><br><span class="jenisguru">Guru Kelas</span> <span class="dsgnrpp_kelasini">6A</span><br><br><br><br><br><u><b class="dsgnrpp_namaguru">Ade Andriansyah</b></u><br>NIP. <span class="dsgnrpp_nipguru">19870710 201403 1 002</span></div><div class="w3-hide-small w3-clear  w3-border-bottom"><div class="w3-center w3-border-top ">Lampiran Daftar Nilai Rubrik</div></div>`;
    return html
}

const hapusrubrikini = (el) =>{
    //data-barisrubrik="${row}" data-fokuskeyrubrik="${ke}"
    let ko = confirm("Anda yakin ingin menghapus rubrik ini? Rubik yang terhapus tidak bisa dikembalikan lagi.")
    if(!ko){
        return
    }
    let rRow = el.getAttribute("data-barisrubrik");// baris db rpp
    let kKey = el.getAttribute("data-fokuskeyrubrik");// rubrik_0, dll
    let kKey2 = kKey.replace("rubrik", "rubriktipe");//.replace("rubrik","rubriktipe")
    // console.log("baris db yang diedit " + rRow);
    // console.log("key yang dihapus" + kKey + " dan tipe " + kKey2);
    let dbAsal = tagrppserver[rRow-2];
    let obKirim = Object.assign({},dbAsal);
    obKirim[kKey]="";
    obKirim[kKey2]="";
    let datakirim = new FormData();
    datakirim.append("idbaris",rRow);
    datakirim.append("tabel", JSON.stringify(Object.values(obKirim)));
    datakirim.append("key", JSON.stringify(Object.keys(obKirim)));
    datakirim.append("tab","rpp");
    fetch(url_kaldikaja +"?action=simpanbarisketabidbaris",{
        method:"post",
        body:datakirim}).then(m => m.json())
        .then(r => {
            tagrppserver = r.data.filter(s=>s.jenjang_kelas == idJenjang);
            //let rServer = tagrppserver.filter(s=> s.tema_mapel == temamapel)[0].idbaris;
            htmlrpp_dariserver(rRow);
           alert("Rubrik berhasil dihapus!")
        })

}

////////////////////////////// SPPD ///////////////////////////////////

/// INI UNTUK SPPD PTK YANG AKAN/BELUM MENGISI RESUME PERJALANAN DAPAT DIGUNAKAN UNTUK GURU.HTML MAUPUN YANG LAINNYA
let dataapiguru
fetch(jlo.url_datauser + "?action=dataguruall&idss=" + jlo.ss_datauser)
        .then(m => m.json())
        .then(k => {
            dataapiguru = k.result;
    }).catch(er => {console.log("error dataapiguru "+er)})

///////////////////////// selesai SPPD /////////////////////////////////
///////////////////////////////new script sppd dan notula rapat

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
    head.innerHTML += '<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">';

    //head.innerHTML += `<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">`;
    head.innerHTML += '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">';

    head.innerHTML += '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lobster">';
    head.innerHTML += '<link  rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">'

    head.innerHTML +='<link rel="stylesheet" href="https://syahandrianeda.github.io/syahandrianeda/css/stylegurukelas.css">'
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

let tagdbsppd
let teksdefaultinfosppd = "Anda berhak membuatkan SPPD untuk diri Anda dan PTK lain. Fitur ini digunakan untuk membuatkan SPPD yang ditujukan kepada PTK. Jika Anda membuatkan SPPD untuk PTK lain, maka akan otomatis SPPD akan diinformasikan di menu SPPD-ku di masing-masing laman Edurasa PTK (edurasa guru, edurasa GMP, edurasa staff, dan edurasa Kepala sekolah).";

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
        let udahdiunggah = dataku[i].versiupload;
        let btnn = udahdiunggah ==""?`<button class="tangan" onclick="uploadscan_sppd('${brs}')"><i class="fa fa-upload"></i></button>` :`<button class="tangan" onclick="uploadscan_sppd('${brs}')"><i class="fa fa-upload"></i></button><button class="tangan" onclick="window.open('https://drive.google.com/file/d/${dataku[i].versiupload}/view?usp=drivesdk','', 'width=720,height=600')"><i class="fa fa-eye"></i></button>` ;
        html +=`<tr>
        <td>${(i+1)}</td>
        <td>${dataku[i]["ptk_maksudsppd"]}</td>
        <td>${dataku[i]["ptk_tempatsppd"]}</td>
        <td>${Tanggaldenganhari(dataku[i]["ptk_starttgl"])}</td>
        <td class="w3-center"><button class="tangan" onclick="preview_sppd('${brs}')"><i class="fa fa-print"></i></button></td>
        <td>${dataku[i]["resume"]==""?"Resume belum diisi":"Resume Sudah Diisi"}</td>
        <td class="w3-center">${dataku[i]["resume"]==""?`<button class="tangan" onclick="isiresumebaris('${brs}')" title="Isi resume"><i class="fa fa-pencil"></i></button>`:`<button onclick="isiresumebaris('${brs}')" title="Editresume" class="tangan"><i class="fa fa-edit"></i></button>`}</td>
        <td class="w3-center">${btnn}</td>
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
        <link rel="stylesheet" href="https://syahandrianeda.github.io/syahandrianeda/css/stylegurukelas.css">`;
        
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
        let cols = parseInt(ang[1]);
        let html = `&nbsp;<table style="border-collapse:collapse;border:.5pt solid #000;width:98%">`
        for(i = 0 ; i < brs ; i++){
            html +=`<tr style="style="background-color:#f1f1f1;;border:.5pt solid #000">`
            for (j = 0 ; j <cols; j++){
                html +=`<td style="border:.5pt solid #000;padding:5px">#</td>`
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
            let id_guru = idguru;
            let dataku = tagdbsppd.filter(s=> s.ptk_diperintah == id_guru);
            
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
                let udahdiunggah = dataku[i].versiupload;
                let btnn = udahdiunggah ==""?`<button class="tangan" onclick="uploadscan_sppd('${brs}')"><i class="fa fa-upload"></i></button>` :`<button class="tangan" onclick="uploadscan_sppd('${brs}')"><i class="fa fa-upload"></i></button><button class="tangan" onclick="window.open('https://drive.google.com/file/d/${dataku[i].versiupload}/view?usp=drivesdk','', 'width=720,height=600')"><i class="fa fa-eye"></i></button>` ;
                html +=`<tr>
                <td>${(i+1)}</td>
                <td>${dataku[i]["ptk_maksudsppd"]}</td>
                <td>${dataku[i]["ptk_tempatsppd"]}</td>
                <td>${Tanggaldenganhari(dataku[i]["ptk_starttgl"])}</td>
                <td class="w3-center"><button class="tangan" onclick="preview_sppd('${brs}')"><i class="fa fa-print"></i></button></td>
                <td>${dataku[i]["resume"]==""?"Resume belum diisi":"Resume Sudah Diisi"}</td>
                <td class="w3-center">${dataku[i]["resume"]==""?`<button class="tangan" onclick="isiresumebaris('${brs}')" title="Isi resume"><i class="fa fa-pencil"></i></button>`:`<button onclick="isiresumebaris('${brs}')" title="Editresume" class="tangan"><i class="fa fa-edit"></i></button>`}</td>
                <td class="w3-center">${btnn}</td>
                </tr>`;
            }
            tbody.innerHTML = html;
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
    
    keyboard.style.top = tTop;
    keyboard.style.left = lLeft;
    keyboard.style.display="block";
    simpan.onclick =async ()=>{
        elemen.innerHTML = body.innerHTML;
        //simpan ke tab = sppd di baris
        if(baris ==""){
            alert("Perubahan tidak bisa disimpan di server")
            return
        }
//         let idbaris = e.parameter.idbaris;
//   let htmlnotula = e.parameter.htmlnotularapat
//   let keynotula = e.parameter.keynotula;

        // let par = parseInt(baris);
        // let data = tagdbrapat.filter(s => s.idbaris == par)[0];//
        // let objekKirim = Object.assign({},data);
        // let iBaris = objekKirim.idbaris;
        // let key = Object.keys(objekKirim);
        // let val = Object.values(objekKirim);
        let htmlbody = body.innerHTML;
        //val.shift();
        let datakirim = new FormData();
        datakirim.append("idbaris",baris);
        datakirim.append("htmlnotularapat", htmlbody);
        datakirim.append("keynotula",keynotula);
        //animasi loading:
        loadingtopbarin("loadingtopbar");
        await fetch(url_kaldikaja+"?action=kirimnotularapat",{
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
                    tagdbsppd = r.data;
                    let dataku = tagdbsppd.filter(s=> s.ptk_diperintah == id_guru);
                    // let datahariini = dataku.filter(s => StringTanggal(new Date(s.ptk_starttgl)) == StringTanggal(new Date()));
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
                        let udahdiunggah = dataku[i].versiupload;
                        let btnn = udahdiunggah ==""?`<button class="tangan" onclick="uploadscan_sppd('${brs}')"><i class="fa fa-upload"></i></button>` :`<button class="tangan" onclick="uploadscan_sppd('${brs}')"><i class="fa fa-upload"></i></button><button class="tangan" onclick="window.open('https://drive.google.com/file/d/${dataku[i].versiupload}/view?usp=drivesdk','', 'width=720,height=600')"><i class="fa fa-eye"></i></button>` ;
                        html +=`<tr>
                        <td>${(i+1)}</td>
                        <td>${dataku[i]["ptk_maksudsppd"]}</td>
                        <td>${dataku[i]["ptk_tempatsppd"]}</td>
                        <td>${Tanggaldenganhari(dataku[i]["ptk_starttgl"])}</td>
                        <td class="w3-center"><button class="tangan" onclick="preview_sppd('${brs}')"><i class="fa fa-print"></i></button></td>
                        <td>${dataku[i]["resume"]==""?"Resume belum diisi":"Resume Sudah Diisi"}</td>
                        <td class="w3-center">${dataku[i]["resume"]==""?`<button class="tangan" onclick="isiresumebaris('${brs}')" title="Isi resume"><i class="fa fa-pencil"></i></button>`:`<button onclick="isiresumebaris('${brs}')" title="Editresume" class="tangan"><i class="fa fa-edit"></i></button>`}</td>
                        <td class="w3-center">${btnn}</td>
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
///// NOTULA RAPAT

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

const menu_melayang = document.getElementById("menu_melayang");
menu_melayang.addEventListener("change",()=>{
    let div = document.querySelector(".divmenumelayang")
    if(menu_melayang.checked){
        let st = `position:sticky;position:-webkit-sticky;top:33px`;
        div.setAttribute("style", st)
    }else{
        if(div.hasAttribute("style")){
            div.removeAttribute("style")
        }
    }
})