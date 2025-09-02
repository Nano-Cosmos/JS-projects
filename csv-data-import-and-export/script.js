const rows = document.getElementById('rows');
const columns = document.getElementById('columns');
const tableContainer = document.querySelector(".table-container");
const downloadBtn = document.getElementById('download-btn');
const copyBtn = document.getElementById('copy-btn');
const inputDataPreview = document.getElementById("preview-import");
const placeholderText = document.querySelector(".placeholder-text");
const uploadBtn = document.getElementById("upload-btn");
const generateBtn = document.getElementById('generate-btn');
const initRowCount = 5;
const initColCount = 4;

function validateRowInput(row){
    let value = row.value;
    let isWholeNumber = function (num){
        return (Math.floor(num) == num);
    }
    if(value < 0 || !isWholeNumber(value)){
        row.value  = 3;
    }
    if(value > 100) row.value = 100;
}
function validateColInput(col){
    let value = col.value;
    let isWholeNumber = function (num){
        return (Math.floor(num) == num);
    }
    if(value < 0 || !isWholeNumber(value)){
        col.value  = 4;
    }
    if(value > 26) col.value = 26;
}

let headerLabels = [];
for(let i = 65 ; i <= 90 ; i++){
    headerLabels.push(String.fromCharCode(i));
}

const measureSpan = document.createElement('span');
measureSpan.classList.add("measure-span")
measureSpan.style.visibility = 'hidden';
measureSpan.style.whiteSpace = "pre";
measureSpan.style.position = "absolute";
measureSpan.style.fontSize = "0.4rem";
document.body.appendChild(measureSpan);

let colWidths = [];

function updatePreview(rowCount,colCount){
    const previewArea = document.getElementById("preview-csv");
    previewArea.textContent = "";
    let csvRows = [];

    for(let i = 1; i < rowCount + 1; i++){
        let rowValues = [];
        for(let j = 1; j< colCount + 1; j++){
            const cell = document.querySelector(`.cell[data-row="${i}"][data-col="${j}"]`);
            let value = cell ? cell.value: "";

            rowValues.push(`"${value}"`);
        }
        csvRows.push(rowValues.join(","));
    }


    const csvString = csvRows.join("\n");
    console.log(csvString)
    
    
    if(previewArea){
        previewArea.innerHTML = csvString;
    }
}
function generateTable(rowCount,colCount){

    // create table 
    tableContainer.innerHTML = "";
    let table = document.createElement('table');
    table.classList.add('editor-table');
    tableContainer.appendChild(table);

    for(let i = 0 ; i < rowCount + 1; i++){
        const tableRow = document.createElement('tr');

        for(let j = 0 ; j < colCount + 1; j++){
            const tableCol = document.createElement('td');
            tableCol.classList.add('table-col');

            if(i == 0 && j == 0){
                tableCol.textContent = "#";
                tableCol.classList.add('corner-cell');
            }
            else if (i == 0){
                tableCol.textContent = headerLabels[j-1];
                tableCol.classList.add('header-cells');
            }
            else if(j == 0){
                tableCol.textContent = i;
                tableCol.classList.add('sider-cells');
            }
            else{
                const cell = document.createElement('input');
                cell.classList.add('cell');
                colWidths[j] = 60;
                cell.style.width = colWidths[j] + 'px';

                tableCol.appendChild(cell);
                cell.dataset.row = i;
                cell.dataset.col = j;

                cell.addEventListener('input', function(){
                    const colIndex = this.dataset.col;
                    let maxWidth = 60;

                    document.querySelectorAll(`[data-col="${colIndex}"]`)
                        .forEach( c =>{
                            const text = c.value || " ";
                            measureSpan.textContent = text;
                            const newWidth = measureSpan.offsetWidth + 4;
                            if(newWidth > maxWidth){
                                maxWidth = newWidth;
                            }
                        });
                    colWidths[colIndex] = maxWidth;
                    document.querySelectorAll(`[data-col="${colIndex}"]`)
                    .forEach(c => {
                        c.style.width = maxWidth + "px";
                    });
                    updatePreview(rowCount,colCount);   

                });          
            }
            tableRow.appendChild(tableCol);
        }
        table.appendChild(tableRow);
    }
    updatePreview(rowCount,colCount);
}
function generateCsvTable(csvText){
    const rows = csvText.trim().split('\n');
    const rowCount = rows.length;
    const colCount = rows[0].split(',').length;
    
    generateTable(rowCount,colCount);

    rows.forEach((row,i)=>{
        const values = row.split(',');
        values.forEach((value,j)=>{
            const cell = document.querySelector(`.cell[data-row="${i+1}"][data-col="${j+1}"]`);
            if(cell){
                cell.value = value.replace(/^"|"$/g,'');
            }
        });
    });
    updatePreview(rowCount,colCount);
}
function exportCsv(){
    const previewArea = document.getElementById('preview-csv');
    if(!previewArea) return;

    const csvString = previewArea.textContent;

    // creating an wrapper for the raw data
    // binary large object
    // used to download files of types : image,text,video,audio,gif,application etc.
    // here we are downloading text file with extension csv
    const blob = new Blob([csvString],{type: "text/csv;charset=utf-8;"});

    // creating temporary link for download the file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob); // create url for the object
    link.download = "data.csv"; // giving filename


    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    // this will free  the space that we used for the link url

}

function copyToClipBoard(){
    const csvString = document.getElementById("preview-csv").textContent;
    navigator.clipboard.writeText(csvString);
}
function getInput(){
    const input = document.createElement('input');
    input.accept = '.csv';
    input.style.display = 'none';
    input.type = "file";

    input.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e){
                const fileContent = e.target.result;
                inputDataPreview.value = '';
                inputDataPreview.value = fileContent;
                if(inputDataPreview.value !== ""){
                    placeholderText.style.display = "none";
                }
                else{
                    placeholderText.style.display = "block";
                }
            }
            reader.readAsText(file);
        }
    });
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
}



generateTable(initRowCount,initColCount);
rows.addEventListener('input',(event)=> {
    validateRowInput(rows);
    let rowCount = parseInt(rows.value);
    let colCount = parseInt(columns.value) || 4;
    generateTable(rowCount,colCount);
});
columns.addEventListener('input',(event)=>{
    validateColInput(columns);
    let rowCount = parseInt(rows.value) || 3;
    let colCount = parseInt(columns.value);
    generateTable(rowCount,colCount);
});
downloadBtn.addEventListener('click',()=>{
    console.log('button clicked !');
    exportCsv();
});
copyBtn.addEventListener("click",()=>{
    copyToClipBoard();
});
inputDataPreview.addEventListener('input',()=>{
    if(inputDataPreview.value.trim() !== ""){
        placeholderText.style.display = 'none';
    }
    else{
        placeholderText.style.display = 'block';
    }
});
uploadBtn.addEventListener('click',()=>{
    getInput();
});
generateBtn.addEventListener('click',()=>{
    const csvString = inputDataPreview.value;
    console.log(csvString);
    generateCsvTable(csvString);
});