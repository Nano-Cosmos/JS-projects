const display = document.getElementById("display");
const slider = document.getElementById("slider");
const toolTip = document.getElementById("tooltip");
const includeUpperCase = document.getElementById("include-upper");
const includeLowerCase = document.getElementById("include-lower");
const includeNumbers = document.getElementById("include-numbers");
const includeSymbols = document.getElementById("include-symbols");
const checkboxes = document.querySelectorAll(".switch input[type='checkbox']");;
const generateBtn = document.getElementById("generate-pswrd");

const passwordStrengthObj = {
    "moderate":`<i class="fa-solid fa-shield"></i>`,
    "weak":`<svg class="weak-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clip-rule="evenodd" />
</svg>
`,
    "strong":`<svg class="strong-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
</svg>
`
}

function updateSlider(){
    const value = slider.value;
    const perCentLeft = (slider.value - slider.min)/(slider.max - slider.min)*100;

    toolTip.textContent = value;
    slider.style.background = `linear-gradient(to right, #0b1edf ${perCentLeft}%, #4e516a ${perCentLeft}%)`;
}

function updateStrength(){
    const strengthText = document.querySelector(".strength .strength-text");
    const strengthIcon = document.querySelector(".strength .strength-icon");
    const length = parseInt(toolTip.textContent);

    if(strengthIcon.classList.contains["moderate"]){
        strengthIcon.classList.remove("moderate");
    }
    if(strengthIcon.classList.contains["weak"]){
        strengthIcon.classList.remove("weak");
    }
    if(strengthIcon.classList.contains["strong"]){
        strengthIcon.classList.remove("strong");
    }

    if(length < 8){
        strengthText.textContent = "weak";
        strengthIcon.classList.add("weak");
        strengthIcon.innerHTML = passwordStrengthObj["weak"];
    }
    else if(length >= 8 && length <= 11){
        strengthText.textContent = "moderate";
        strengthIcon.classList.add("moderate");
        strengthIcon.innerHTML = passwordStrengthObj["moderate"];
    }
    else{
        strengthText.textContent = "strong";
        strengthIcon.classList.add("strong");
        strengthIcon.innerHTML = passwordStrengthObj["strong"];
    }

}

const charSets = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%&*?"
}


function generatePassword(length,allowedCharacters){

    let charPool = "";
    let intialChars = "";

    allowedCharacters.forEach((entity)=>{
        charSets[entity].split("").forEach((element)=>{
            charPool += element;
        });
        const len = charSets[entity].length;
        const randomIndex = Math.floor(Math.random()*len);
        intialChars += charSets[entity][randomIndex];
    });
    
    let remainingLen = length - intialChars.length;
    
    let randomGeneration = "";

    for(let i = 0; i < remainingLen; i++){
        const random = Math.floor(Math.random()*charPool.length);
        randomGeneration += charPool[random];
    }
    
    let initalPassword = (intialChars + randomGeneration).split("");
    console.log(initalPassword);
    
    for(let i = length - 1 ; i > 0; i--)
    {
        const random = Math.floor(Math.random()* (i + 1));
        [initalPassword[i],initalPassword[random]]= [initalPassword[random],initalPassword[i]];
    }

    const finalPassword = initalPassword.join("");
    
    return finalPassword;
    
}

checkboxes.forEach((cb)=>{
    cb.addEventListener("change",()=>{
        const checked = [...checkboxes].filter((c)=> c.checked);
        if(checked.length === 0)
        {
            cb.checked = true;
        }
    });
});

updateStrength();
updateSlider();
slider.addEventListener("input",()=>{
    updateSlider();
    updateStrength();
});

generateBtn.addEventListener("click",()=>{
    let userChoices = [];
    
    checkboxes.forEach((cb)=>{
        if(cb.checked){
            const value = cb.dataset.value;
            userChoices.push(value);
        }
    });
    const length = parseInt(toolTip.textContent);

    const password = generatePassword(length,userChoices);
    display.textContent = password;
});
