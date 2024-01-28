// functions
function setClass(el, type, cls) {

    if (type == "add") {
        el.classList.add(cls);
    } else if(type == "remove") {
        el.classList.remove(cls);
    } if(type == "toggle") {
        el.classList.toggle(cls);
    }
}

// for adder buttons Events
const adderMenu = document.querySelector(".adder-menu");
const classAdder = document.querySelector(".class-adder-screen");




addClassBtn.addEventListener("click", () => {
    setClass(adderMenu,"add", "close");
    setClass(classAdder,"toggle", "close");
});


addCardBtn.addEventListener("click", () => {
    setClass(adderMenu,"add", "close");
});