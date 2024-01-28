var msgs = document.querySelectorAll(".message");
var msgArea = document.querySelector(".message-area");

msgs.forEach(m => {
    m.addEventListener("click", () => {
        bottomMenu.classList.toggle("close");
        msgArea.classList.toggle("o");
    });
});

msgBack.addEventListener("click", () => {
    bottomMenu.classList.toggle("close");
    msgArea.classList.toggle("o");
    msg.value = "";
});