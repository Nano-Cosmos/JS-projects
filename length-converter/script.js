const inputBox = document.getElementById("user-input");
const delBtn = document.getElementById("delete-btn");
const fromUnitBox = document.getElementById("from-unit");
const toUnitBox = document.getElementById("to-unit");

const fromUnitInput = fromUnitBox.querySelector(".selected");
const toUnitInput = toUnitBox.querySelector(".selected");

const fromAndToInput = document.querySelectorAll(".custom-dropdown .selected");

const dropdown = document.querySelectorAll(".custom-dropdown .options");

const convertBtn = document.getElementById("convert-btn");


inputBox.addEventListener("input",()=>{

    const maxDigits = 14;
    if(inputBox.value.length > maxDigits){
        inputBox.value = inputBox.value.slice(0,maxDigits);
    }
});
inputBox.addEventListener("keypress",(e)=>{
        if(e.key === "-" || e.key === "+"){
            e.preventDefault();
        }
});
delBtn.addEventListener("click",()=>{
    inputBox.value = "";
});

fromAndToInput.forEach((selected) => {
  selected.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelectorAll(".custom-dropdown .selected")
      .forEach((el) => el.classList.remove("active"));
    selected.classList.add("active");
    selected.classList.toggle("open");

    const dropdownOpt = selected.parentElement.querySelector(".options");
    dropdownOpt.classList.toggle("show-dropdown");
  });
});
document.addEventListener("click", () => {
  fromAndToInput.forEach((el) => el.classList.remove("active"));
});


dropdown.forEach((drop)=>{
    const selected = drop.parentElement.querySelector(".selected")
    drop.querySelectorAll("li").forEach((item)=>{
        item.addEventListener("click",()=>{
            const value = item.textContent;
            const dataValue = item.dataset.value;
            selected.textContent = value;
            selected.dataset.stored = dataValue;
            selected.style.color = "#ffffff";

            drop.classList.remove("show-dropdown");
            selected.classList.toggle("open");
        });
    });
});

const lengthFactors = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.34
};

function convert(length,fromUnit,toUnit){
    const display = document.querySelector(".output-display");
    const title  = document.getElementById("output-display-title");

    console.log(`Length : ${length}\n
        from : ${fromUnit}\n
        to : ${toUnit}`);

    let output = (length*lengthFactors[fromUnit]) / lengthFactors[toUnit];
    
    title.textContent = `From ${fromUnit} to ${toUnit}`;
    display.innerHTML = output;


}
convertBtn.addEventListener("click",()=>{
    const length = parseInt(inputBox.value);
    const fromUnit = fromUnitBox.querySelector(".selected").dataset.stored;
    const toUnit = toUnitBox.querySelector(".selected").dataset.stored;

    console.log(typeof fromUnit);

    convert(length,fromUnit,toUnit);
});