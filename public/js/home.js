var tkpNotif = document.querySelector(".tkp-notif");
var home = document.querySelector(".home");


tkpNotif.addEventListener("click", ()=> {
    var nutfi = new Screen("100%", "100%", "blue", home);
    if(!nutfi.xal){
        nutfi.make();
        nutfi.add("button", "btn", "btn", nutfi.xal)
    } else {nutfi.open()}
    nutfi.yal.addEventListener("click", ()=> {
        nutfi.close();
    });


});

