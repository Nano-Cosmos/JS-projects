const userBtn = document.getElementById("user-rating-btn");

const poster = document.getElementById("poster");
const video = document.querySelector(".video-preview iframe");

window.addEventListener("load",()=>{
    setTimeout(() => {
        poster.style.display = "none";
        video.style.display  = "block";
        video.src += "&autoplay=1";
        
    }, 2000);
});



function createPopUp(){

    const isAlready = document.querySelector(".pop-up");
    if(isAlready) isAlready.innerHTML = "";

    const container = document.createElement("div");
    container.classList.add("pop-up");
    container.innerHTML = `
        <div class="star-box">?</div>
        <h3>RATE THIS</h3>
        <h2 class="movie-title">Nobody 2</h2>
        <div class="close-btn">
        <i class="fa-solid fa-xmark"></i>
        </div>
    `;
    document.body.appendChild(container);
    const rateBox = document.createElement("div");
    rateBox.classList.add("rate-section");
    container.appendChild(rateBox);
    
    for(let i = 0; i < 10; i++){
        const stars = document.createElement("span");
        stars.classList.add("stars");
        stars.innerHTML = `<i class="fa-regular fa-star"></i>`;
        stars.setAttribute("data-star",i);
        rateBox.appendChild(stars);
    }
    const submitRateBtn = document.createElement("button");
    submitRateBtn.innerHTML  = "Rate";
    submitRateBtn.id = "submit-rate-btn";
    submitRateBtn.disabled = true;
    submitRateBtn.classList.add("submit-btn-disabled");
    container.appendChild(submitRateBtn);


    const stars = document.querySelectorAll(".stars");

    function highlighStars(index){
        stars.forEach((s,i)=>{
            const icon = s.querySelector("i");
            if(i <= index)
            {
                icon.classList.replace("fa-regular","fa-solid");
            }
            else{
                icon.classList.replace("fa-solid","fa-regular");
            }
        });
    }

    function resetStars(){
        stars.forEach(s => {
            const icon = s.querySelector("i");
            icon.classList.replace("fa-solid","fa-regular");
        });
    }

    const mouseOutHandler = () =>{
            resetStars();
        };

    let ratingLocked = false;
    let activeStarIndex = null;

    stars.forEach((star,index)=>{
        star.addEventListener("mouseover",()=>{
            highlighStars(index);
            if(ratingLocked){
                star.addEventListener("mouseout",()=>{
                    highlighStars(activeStarIndex);
                });
            }
        });

        star.addEventListener("mouseout",mouseOutHandler);

        star.addEventListener("click",()=>{
            submitRateBtn.classList.replace("submit-btn-disabled","submit-btn-active");
            submitRateBtn.disabled = false;
            highlighStars(index);
            ratingLocked = true;
            activeStarIndex = index;

            stars.forEach(s => {
                s.removeEventListener("mouseout",mouseOutHandler);
            });

            const mainStar = document.querySelector(".star-box");
            mainStar.innerHTML = activeStarIndex + 1;
            let scale = (activeStarIndex + 1) * 0.05;
            mainStar.style.transform = `translate(-50%,0%) scale(${1 + scale})`;
        });

    });   
}

let already = false;
userBtn.addEventListener("click",()=>{
    if(already) return;
    createPopUp();
    already = true;
    const submitBtn = document.getElementById("submit-rate-btn");

    submitBtn.addEventListener("click",()=>{
    alert("Thank's for Rating! :)");
    });

    const closeBtn = document.querySelector(".close-btn");
    closeBtn.addEventListener("click",()=>{
    const popUp = document.querySelector(".pop-up");
    document.body.removeChild(popUp);
    already = false;
});

});



