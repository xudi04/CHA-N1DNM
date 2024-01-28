class Screen{
    constructor(w,h,bg, el, xal, yal){
        this.w = w;
        this.h = h;
        this.bg = bg;
        this.el = el;
        this.xal = "";
    }

    make(){

        var inner = `
                <div  class="theScreen">merhaba</div>
        `;

        this.xal = document.createElement("div");

        var style = `
            position: fixed;
            background-color: `+ this.bg +`;
            width:  `+ this.w +`; 
            height:  `+ this.h +`;
            margin: 0px;
            z-Index: 9999;
        `;

        this.xal.style.cssText += style;
        this.el.appendChild(this.xal);
    }

    close() {
        var style = `display: none`;

        this.xal.style.cssText += style;
    }

    open() {
        var style = `display: block`;

        this.xal.style.cssText += style;
    }

    add(type, css, text, el) {
        
       this.yal = document.createElement(type);
       this.yal.innerText = text;
       this.yal.id ="btn1";

       this.yal.classList.add(css);

       el.appendChild(this.yal);

    }
}





