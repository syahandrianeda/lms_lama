

    let tooltipeditor = document.querySelector("#iframe_tooltipketikanrpp");
    const doctooltip = tooltipeditor.contentDocument || tooltipeditor.contentWindow.document;
            doctooltip.body.designMode = "on";
            doctooltip.body.setAttribute("spellcheck","false");
            doctooltip.body.setAttribute("contenteditable","true");
            doctooltip.body.setAttribute("id","edt2");
            doctooltip.body.setAttribute("style","font-size:12px");
        var root = window.location.origin;
        doctooltip.head.innerHTML = `<link rel="stylesheet" href="${root}/css/w3.css">
        <link href="https://fonts.googleapis.com/css?family=Raleway">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link rel="stylesheet" href="${root}/css/cssiframe_stylegurukelas.css">`;
        
    doctooltip.addEventListener("input",(e)=>{
    })
    
    
    const btnn = document.querySelectorAll(".btn_edttooltip");//
    const allowhtmll = document.querySelector("#html_edttooltip");
    
    let show2 = false;
    allowhtmll.addEventListener("change", ()=>{
        if(!allowhtmll.checked){
            //asli
            doctooltip.body.innerHTML = doctooltip.body.textContent;
            
            show2 = false;
        }else{
                // asli
                doctooltip.body.textContent =doctooltip.body.innerHTML;
            show2 =true;
        }
    })
    for (let i = 0 ; i < btnn.length ; i++){
        let cmd = btnn[i].getAttribute("data-keycmdtooltip");
        let owngrup = btnn[i].hasAttribute("data-gruptooltip");
        
        btnn[i].addEventListener("click",()=>{
            if(show2){
                alert("Hilangkan dulu Ceklisnya")
            }else{
            
                if(cmd === "fontname"){
                    let val = btnn[i].innerHTML;
                    document.querySelector(".dropdown_jenishuruftooltip").innerHTML = val;
                    doctooltip.execCommand(cmd,false,val);
    
                }else if(cmd==="removeFormat"){ 
                    doctooltip.execCommand(cmd, false, null);
                    document.querySelector(".dropdown_jenishuruftooltip").innerHTML = "Pilih Jenis Huruf"
                }else if(cmd == "createLink"){
                    let prom = prompt("Masukkan link","");
                    if(!prom){return};
                    doctooltip.execCommand(cmd, false, prom);
                    //console.log(doctooltip.body.designMode)
                    const linkifram = doctooltip.querySelectorAll("a");
    linkifram.forEach(el =>{
        el.target = "_blank";
        //console.log(el);
        el.addEventListener("mouseover", () =>{
            doctooltip.body.designMode = "Off";
        });
        el.addEventListener("mouseout", () =>{
            doctooltip.body.designMode = "On";
        })
        //console.log(doctooltip.body.designMode)
    })   
                }else if(owngrup){
                    let grup = btnn[i].getAttribute("data-gruptooltip");
                    if(grup == "Paragraf"){
    //paragraf:
    let dom = document.querySelector(".dropdown_jenisparagraftooltip");
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
    doctooltip.execCommand(cmd, false, null)
                    }else if (grup == "ukuranfont") {
    let val = btnn[i].getAttribute("data-keyval");
    document.querySelector(".grup_ukuranfont").innerHTML = btnn[i].innerHTML;
    doctooltip.execCommand(cmd, false, val);
    
    
                    }else if(grup == "heading"){
    let val = btnn[i].getAttribute("data-keyval");
    document.querySelector(".grup_heading").innerHTML = btnn[i].innerHTML;
    doctooltip.execCommand(cmd, false, val);
    
                    }
                    else{
    let teks = btnn[i].innerHTML;
    doctooltip.execCommand(cmd,false,teks)
    // doctooltip.execCommand("insertText",false,"&nbsp;")
                    }
                } else{
                    doctooltip.execCommand(cmd, false, null)
                    // doctooltip.execCommand("insertText",false,"&nbsp;")
                    btnn[i].classList.toggle("active");
                    
                }
    
    
    
                
            }
          
        })
    
    };
    let tooltipedtbl = document.querySelector("#tooltipedt_table");
    let tooltipsPchBiasa = document.querySelector("#tooltipsimpan_pecahanbiasa");
    let tooltipsPchCamp = document.querySelector("#tooltipsimpan_pecahancampuran");
    let tooltipsAkarKdrat = document.querySelector("#tooltipsimpan_akarkuadrat");
    let tooltipsAkartiga = document.querySelector("#tooltipsimpan_akarpangkattiga");
    
    
    tooltipedtbl.addEventListener("click", () => {
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
        doctooltip.execCommand("insertHTML",null, html);
        }
        catch(er){
            console.log(er);    
        }
    });
    tooltipsPchBiasa.addEventListener("click", () =>{
        let a = document.querySelector("#inpecbiasa_pembilang").innerHTML;
        let b = document.querySelector("#inpecbiasa_penyebut").innerHTML;
        let teks = htmlpecahanbiasa(a,b);
        doctooltip.execCommand("insertHTML",null, teks);
    })
    tooltipsPchCamp.addEventListener("click",()=>{
        let a = document.querySelector("#inpecCamp_satuan").innerHTML;
        let b = document.querySelector("#inpecCamp_pembilang").innerHTML;
        let c = document.querySelector("#inpecCamp_penyebut").innerHTML;
        let teks = htmlpecahancampuran(a,b,c);
        doctooltip.execCommand("insertHTML",null, teks);
    })
    tooltipsAkarKdrat.addEventListener("click",()=>{
        let a = "";
        let b = document.querySelector("#inakar_kuadrat").innerHTML;
        let teks = htmlakarpangkatn(a,b);
        doctooltip.execCommand("insertHTML",null, teks);
    
    })
    tooltipsAkartiga.addEventListener("click",()=>{
        let a = "3";
        let b = document.querySelector("#inakar_tiga").innerHTML;
        let teks = htmlakarpangkatn(a,b);
        doctooltip.execCommand("insertHTML",null, teks);
    });
    let tooltipfileInput = document.querySelector("#tooltipuploadgambar_edt");
    
    tooltipfileInput.addEventListener('change', () => {
        const files = tooltipfileInput.files;
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
            doctooltip.execCommand("insertImage",false, url);
            
            let imgs = doctooltip.querySelectorAll("img");
            imgs.forEach(item => {
                item.style.maxWidth ="1000px";
            })
            clearInterval(stoploadingtopbar);
            let divlod = document.querySelector(".loadingtopbar");
            divlod.style.width = "100%";
            setTimeout(() => {
                divlod.style.width = "1px"
                divlod.className += " w3-hide";
    
            }, 3000);
            enableImageResizeInDiv2("edt2");
        })
        .catch(er => {
        console.log(er);
        
        })
    }
    });
    
    
    const tooltipbtnn_edtyt = document.querySelector("#tooltipbtn_edttooltipyt");
    tooltipbtnn_edtyt.addEventListener("click", () => {
        let prom = prompt("Masukkan link youtube","");
        if(!prom){return};
        let reg = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        let url = prom.match(reg)
        let html=`<iframe style="resize: both;" src='https://www.youtube.com/embed/${url[1]}'  frameborder='1' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe><br/><br/>`;
        let ch = document.querySelector("#html_edt");
        if(!ch.checked){
            ch.checked = true;
            doctooltip.execCommand("insertHTML",false,html);
            ch.checked = false
        }else{
            doctooltip.execCommand("insertText",false,html);
        }
    })
    
    
    
    
    function enableImageResizeInDiv2(id) {
        if (!(/chrome/i.test(navigator.userAgent) && /google/i.test(window.navigator.vendor))) {
            return;
        }
        var editor = doctooltip.getElementById(id);
        
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
            doctooltip.querySelectorAll(".resize-frame,.resizer").forEach((item) => item.parentNode.removeChild(item));
        };
        var offset = function offset(el) {
             const rect = el.getBoundingClientRect();
            // scrollLeft = window.pageXOffset ||doctooltip.documentElement.scrollLeft,
            // scrollTop = window.pageYOffset || doctooltip.documentElement.scrollTop;
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
    
            doctooltip.querySelector('.resize-frame').onmousedown = () => {
                resizing = true;
                return false;
            };
    
            editor.onmouseup = () => {
                if (resizing) {
                    currentImage.style.width = doctooltip.querySelector('.top-border').offsetWidth + 'px';
                    currentImage.style.height = doctooltip.querySelector('.left-border').offsetHeight + 'px';
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
                    setStyle(doctooltip.querySelector('.resize-frame'), {
    top: (top + height - 10) + 'px',
    left: (left + width - 10) + "px"
                    });
                   
                    setStyle(doctooltip.querySelector('.top-border'), { width: width + "px" });
                    setStyle(doctooltip.querySelector('.left-border'), { height: height + "px" });
                    setStyle(doctooltip.querySelector('.right-border'), {
    left: (left + width) + 'px',
    height: height + "px"
                    });
                    setStyle(doctooltip.querySelector('.bottom-border'), {
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
                let mouseUpElement = doctooltip.elementFromPoint(x, y);
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
    enableImageResizeInDiv2("edt2");
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
    bubbleIframeMouseMove2(tooltipeditor);
function currentFrameAbsolutePosition2() {
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
   

