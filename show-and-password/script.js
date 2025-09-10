const inputBox = document.querySelectorAll(".input-boxes");
const eyeBtn = document.querySelector(".eye-icon-container");

inputBox.forEach((box)=>{
    const input = box.querySelector("input");
    const label = box.querySelector("label");

    input.addEventListener("focus",()=>{
        label.classList.add("active-label");
    });

    input.addEventListener("blur",()=>{
        if(input.value === ""){
            label.classList.remove("active-label");
        }
    });
});

eyeBtn.addEventListener("click",()=>{
    const inputType = document.getElementById("password");
    const light = document.querySelector(".light");
    if(inputType.type === "text")
    {
        inputType.type = "password";
        inputType.style.color = "#2c2c2c";
        eyeBtn.querySelector(".flash-on").style.display = "none";
        eyeBtn.querySelector(".flash-off").style.display = "block";
        light.classList.remove("light-on");
    }
    else{
        inputType.type = "text";
        inputType.style.color = "black";
        eyeBtn.querySelector(".flash-on").style.display = "block";
        eyeBtn.querySelector(".flash-off").style.display = "none";
        light.classList.add("light-on");
    }
});