var partBtn = document.querySelectorAll(".bottom-menu div");
var screens = document.querySelectorAll(".screen");

partBtn.forEach((p)=>{
    p.addEventListener("click", ()=> {
         partBtn.forEach(pp => { pp.classList.remove("a")});
         p.classList.toggle("a");

         screens.forEach(s => {
            if (s.title == p.title) {
            screens.forEach(s => { s.classList.remove("c")});

              s.classList.toggle("c")
            }
         });

    });
});
