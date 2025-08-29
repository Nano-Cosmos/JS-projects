document.addEventListener("DOMContentLoaded",()=>{

const minRange = document.getElementById('min-range');
const maxRange = document.getElementById('max-range');
const priceSlider = document.querySelector('.price-slider');
const minInput = document.getElementById('minimum');
const maxInput = document.getElementById('maximum');


function updateSlider(){
    let minValue = parseInt(minRange.value);
    let maxValue = parseInt(maxRange.value);

    if(minValue > maxValue - 100){
        minValue = maxValue - 100;
        minRange.value = minValue;
    }

    if(maxValue < minValue + 100 ){
        maxValue = minValue + 100;
        maxRange.value = maxValue;
    }

    const min = parseInt(minRange.min);
    const max = parseInt(minRange.max);

    const leftPercent = ((minValue - min)/(max - min))* 100;
    const rightPercent = ((maxValue - min)/(max - min))* 100;

    priceSlider.style.left = leftPercent + '%';
    priceSlider.style.width = (rightPercent - leftPercent) + '%';

    minInput.value = minValue;
    maxInput.value = maxValue;
}

function handleMinInputChange(){
    
    const value = parseInt(minInput.value);
    if((value === "") || isNaN(value)) return;

    const minLimit = parseInt(minRange.min);
    const maxLimit = parseInt(maxRange.value);

    if(!isNaN(value)){
        
        if(value < minLimit){
            minRange.value = minLimit;
        }
        else if(value > maxLimit){
            minRange.value = maxLimit;
        }
        else{
            minRange.value = value;
        }
    }
    updateSlider();
}

function handleMaxInputChange(){
   
    const value = parseInt(maxInput.value);
    if((value === "") || isNaN(value)) return;

    const minLimit = parseInt(minRange.value);
    const maxLimit = parseInt(maxRange.max);

    if(!isNaN(value)){

        if(value < minLimit){
            maxRange.value = minLimit;
        }
        else if(value > maxLimit){
            maxRange.value = maxLimit;
        }
        else{
            maxRange.value = value;
        }
    }
    updateSlider();
}

let minTimer;
let maxTimer;

minRange.addEventListener('input',updateSlider);
maxRange.addEventListener('input',updateSlider);
minInput.addEventListener("input", ()=>{
    clearTimeout(minTimer);
    minTimer = setTimeout(handleMinInputChange,1000);
});
maxInput.addEventListener("input", ()=>{
    clearTimeout(maxTimer);
    maxTimer = setTimeout(handleMaxInputChange,1000);
});
minInput.addEventListener("blur", handleMinInputChange);
maxInput.addEventListener("blur", handleMaxInputChange);

updateSlider();

});