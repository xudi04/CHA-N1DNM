var tabBtn = document.querySelectorAll(".tab-btn");
var tabs = document.querySelectorAll(".tabs div");

tabBtn.forEach(tb => {
    tb.addEventListener("click", ()=> {
        tabBtn.forEach(tb1 => tb1.classList.remove("o"))
        tb.classList.toggle("o");
        tabs.forEach(t => {
            t.classList.remove("o");
            if (t.title == tb.title) {
                t.classList.toggle("o");   
            }
        })
    });
});



// pass share 
var rightBtn = document.querySelectorAll("#rightClass");
var leftBtn = document.querySelectorAll("#leftClass");
var shares = document.querySelectorAll(".theArea");

var a = 0;

// rightClass.addEventListener("click", () => {
//     if(a < shares.length -1 ){a++;}
//     shares.forEach(s => s.classList.remove("o"));
//     shares[a].classList.toggle("o");
// });

// leftClass.addEventListener("click", () => {
//     if( a > 0 )a--;
//     shares.forEach(s => s.classList.remove("o"));
//     shares[a].classList.toggle("o");
// });
