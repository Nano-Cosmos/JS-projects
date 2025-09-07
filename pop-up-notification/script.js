const btn = document.getElementById("book-now-btn");
const closeBtn = document.getElementById("ok-btn");
const popUp = document.querySelector(".pop-up");
function createText(text){
    
    let arr = text.split("");
    let delay = 0;
    arr.forEach((element,index)=>{
        const span = document.createElement('span');
        span.innerHTML = arr[index];
        span.classList.add("char");
        span.style.animationDelay = `${delay += 0.25}s`;
        btn.appendChild(span);
    });
}
createText("Book Now");
btn.addEventListener("click",()=>{
       popUp.classList.add("active");

});
closeBtn.addEventListener("click",()=>{
    popUp.classList.remove("active");
});