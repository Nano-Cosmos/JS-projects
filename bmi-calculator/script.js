const metricRadio = document.getElementById("metric-units");
const usRadio = document.getElementById("us-units");
const metricCmWrapper = document.querySelector(".metric-height-cm-wrapper");
const usFeetWrapper = document.querySelector(".us-height-feet-wrapper");
const usInchWrapper = document.querySelector(".us-height-inch-wrapper");
const metricKgWrapper = document.querySelector(".metric-weight-kg-wrapper");
const usPoundWrapper = document.querySelector(".us-weight-pound-wrapper");

const ageBox = document.querySelector(".age-wrapper");

const ageInput = document.getElementById("age");
const genderInput = document.getElementById("gender");
const cmInput = document.getElementById("metric-height-cm");
const feetInput = document.getElementById("us-height-feet");
const inchInput = document.getElementById("us-height-inch");
const kgInput = document.getElementById("metric-weight-kg");
const poundInput = document.getElementById("us-weight-pound"); 

const calculateBtn = document.getElementById("calculate-btn");

function toggleHeightAndWeight(){
       if(metricRadio.checked){
        metricCmWrapper.style.display = "flex";
        metricKgWrapper.style.display = "flex";
        usFeetWrapper.style.display = "none";
        usInchWrapper.style.display  = "none";
        usPoundWrapper.style.display = "none";
       }
       else{
         metricCmWrapper.style.display = "none";
        metricKgWrapper.style.display = "none";
        usFeetWrapper.style.display = "flex";
        usInchWrapper.style.display  = "flex";
        usPoundWrapper.style.display = "flex";
       }
}
const errorObj = {
    "age": "Enter a valid age.",
    "weight": "Enter a valid weight.",
    "height": "Enter a valid height."

}
function createErroMsg(type,wrapper)
{
     const error = document.createElement("div");
     error.classList.add("error");
     error.textContent = errorObj[type];
     wrapper.style.position = "relative";
     wrapper.appendChild(error);
}

function validateAge(){
     const age = parseInt(ageInput.value);
     if(!age || age < 2 || age > 120){
          createErroMsg("age",ageBox);
     }
}
function validateHeight(){
    if(metricRadio.checked){
        const cm = parseFloat(cmInput.value);
        
        if(cm < 50 || cm > 300 || !cm){
            createErroMsg("height",metricCmWrapper);
        }
    }
    else{
        const feet = parseInt(feetInput.value);
        const inch = parseInt(inchInput.value);

        if(!feet || feet < 1 || feet > 8 || inch < 0 || inch > 11){
            createErroMsg("height",usFeetWrapper);
        }
    }
}

function validateWeight(){
    if(metricRadio.checked){
        const kg = parseFloat(kgInput.value);
        if(!kg || kg < 10 || kg > 300){
            createErroMsg("weight",metricKgWrapper);
        }
    }
    else{
        const pound = parseFloat(poundInput.value);
        if(!pound || pound < 22 || pound > 660){
            createErroMsg("weight",usPoundWrapper);
        }
    }
}
function convertMetrictoUs(){
    const cm = parseFloat(cmInput.value);
    const kg = parseFloat(kgInput.value);

    if(!isNaN(cm)){
        const totalInches = cm / 2.54;
        feetInput.value = Math.floor(totalInches / 12);
        inchInput.value = Math.round(totalInches % 12);
    }
    if(!isNaN(kg)){
        poundInput.value = (kg * 2.20462).toFixed(1);
    }
}

function convertUstoMetric(){
    const feet = parseFloat(feetInput.value) || 0;
    const inch = parseFloat(inchInput.value) || 0;
    const pound = parseFloat(poundInput.value);

    const totalInches = feet * 12 + inch;
    if(totalInches > 0){
        cmInput.value = ((totalInches) * 2.54).toFixed(1);
    }

    if(!isNaN(pound)){
        kgInput.value = (pound / 2.20462).toFixed(1);
    }
}
function calculateBMI(
    isMetric,
    isImperial,
    cm,
    feet,
    inch,
    kg,
    lb
){
    let bmi;
     const display = document.getElementById("bmi");
     const bmiClass = document.getElementById("bmiclass");
     if(isMetric){
         bmi = kg / Math.pow((cm / 100),2);
        bmi = bmi.toFixed(1);
        display.textContent = `BMI = ${bmi}`;
     }
     if(isImperial){
        const totalInches = (feet * 12 ) + inch;
        bmi = (703 * lb)/ Math.pow((totalInches),2);
        bmi = bmi.toFixed(1);
        display.textContent = `BMI = ${bmi}`;
     }

            if (bmi < 16) {
            bmiClass.textContent = "Severe Thinness";
            bmiClass.style.color = "#bc2020";
        } else if (bmi >= 16 && bmi < 17) {
            bmiClass.textContent = "Moderate Thinness";
            bmiClass.style.color = "#d38888";
        } else if (bmi >= 17 && bmi < 18.5) {
            bmiClass.textContent = "Mild Thinness";
            bmiClass.style.color = "#ffe400";
        } else if (bmi >= 18.5 && bmi < 25) {
            bmiClass.textContent = "Normal";
            bmiClass.style.color = "#008137";
        } else if (bmi >= 25 && bmi < 30) {
            bmiClass.textContent = "Overweight";
            bmiClass.style.color = "#ffe400";
        } else if (bmi >= 30 && bmi < 35) {
            bmiClass.textContent = "Obese Class I";
            bmiClass.style.color = "#d38888";
        } else if (bmi >= 35 && bmi < 40) {
            bmiClass.textContent = "Obese Class II";
            bmiClass.style.color = "#bc2020";
        } else {
            bmiClass.textContent = "Obese Class III";
            bmiClass.style.color = "#8a0101";
        }

        let text = bmiClass.textContent;
        text = text.split("");
        text.unshift("(");
        text.push(")");
        text = text.join("");
        bmiClass.textContent = text;

    const anglePerUnitBmi = 3.6;
    let angle = -90 + (bmi * anglePerUnitBmi);
    if(angle > 90){
        angle = 90;
    }
    const pointer = document.querySelector(".pointer");
    pointer.style.transform = `rotateZ(${angle}deg)`;
}

metricRadio.addEventListener("change",toggleHeightAndWeight);
usRadio.addEventListener("change",toggleHeightAndWeight);

toggleHeightAndWeight();
validateAge();
validateHeight();
validateWeight();
calculateBMI(
    metricRadio.checked,
    usRadio.checked,
    parseFloat(cmInput.value),
    parseFloat(feetInput.value),
    parseFloat(inchInput.value),
    parseFloat(kgInput.value),
    parseFloat(poundInput.value)
);

ageInput.addEventListener("input",()=>{
      const errorAlready = document.querySelector(".error");
      if(errorAlready) errorAlready.remove();
});
ageInput.addEventListener("blur",()=>{
      validateAge();
});
cmInput.addEventListener("input",()=>{
      const errorAlready = document.querySelector(".error");
      if(errorAlready) errorAlready.remove();
});
cmInput.addEventListener("blur",()=>{
      validateHeight();
});
feetInput.addEventListener("input",()=>{
      const errorAlready = document.querySelector(".error");
      if(errorAlready) errorAlready.remove();
});
feetInput.addEventListener("blur",()=>{
      validateHeight();
});
inchInput.addEventListener("input",()=>{
      const errorAlready = document.querySelector(".error");
      if(errorAlready) errorAlready.remove();
});
inchInput.addEventListener("blur",()=>{
      validateHeight();
});
kgInput.addEventListener("input",()=>{
      const errorAlready = document.querySelector(".error");
      if(errorAlready) errorAlready.remove();
});
kgInput.addEventListener("blur",()=>{
      validateWeight();
});
poundInput.addEventListener("input",()=>{
      const errorAlready = document.querySelector(".error");
      if(errorAlready) errorAlready.remove();
});
poundInput.addEventListener("blur",()=>{
      validateWeight();
});

metricRadio.addEventListener("change",()=>{
     if(metricRadio.checked){
        convertUstoMetric();
     }
});
usRadio.addEventListener("change",()=>{
    if(usRadio.checked){
        convertMetrictoUs();
    }
});

calculateBtn.addEventListener("click",()=>{

    const errorAlready = document.querySelector(".error");
    if(errorAlready) return;

      calculateBMI(
    metricRadio.checked,
    usRadio.checked,
   parseFloat(cmInput.value),
    parseFloat(feetInput.value),
    parseFloat(inchInput.value),
    parseFloat(kgInput.value),
    parseFloat(poundInput.value)
    );
});
