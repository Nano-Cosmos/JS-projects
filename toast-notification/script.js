const container = document.querySelector(".container");
const submitBtn = container.querySelector(".submit-btn");
const failedBtn = container.querySelector(".failed-btn");
const infoBtn = container.querySelector(".info-btn");
const warningBtn = container.querySelector('.warning-btn');


const icons = {
    "submit":'<i class="fa-regular fa-circle-check"></i>',
    "failed":'<i class="fa-solid fa-circle-exclamation"></i>',
    "info":'<i class="fa-solid fa-circle-info"></i>',
    "warning":'<i class="fa-solid fa-triangle-exclamation"></i>'
}

let duration = 4000;
let toastTimeOut = null;

function showToast(toastType,message,duration=3000){

    let box = document.createElement("div");
    box.classList.add("toast",`toast-${toastType}`);
    box.innerHTML = `<div class="toast-content">
    <span class="toast-icon">${icons[toastType]}</span>
    <p class="toast-text">${message}</p>
    </div>
    <div class="toast-progress"></div>`

    let toastAlready = 
        document.body.querySelector(".toast");
    if (toastAlready) {
        toastAlready.remove();
    }

    document.body.appendChild(box);

    let progressBar = document.querySelector('.toast-progress');
    progressBar.style.animationDuration = `${duration/1000}s`;

    setTimeout(() => {
      box.classList.add("exit");
      box.addEventListener('animationend', () => {
        box.remove();
      }, { once: true });
  }, duration);

}

submitBtn.addEventListener("click",()=> showToast(
    "submit",
    "Form submitted successfully!",duration
));
failedBtn.addEventListener("click",()=> showToast(
    "failed","Something went wrong. Please try again.",duration
));
infoBtn.addEventListener("click",()=> showToast(
    "info",
    "Here’s some information you might need.",duration
));
warningBtn.addEventListener("click",()=> showToast(
    "warning",
    "Warning! Please check your input.",duration
));