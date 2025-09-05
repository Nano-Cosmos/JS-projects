const phoneLabel = document.getElementById("phone-label");
const formInputWrapper = document.querySelector(".form-input-wrapper");
const phone = document.getElementById("phone");
const countryCode = document.getElementById("country-code");
const loginForm = document.getElementById("login-form");
const requestOtpContainer = document.querySelector(".request-otp-container");
const verifyOtpContainer = document.querySelector(".verify-otp-container");
const otpInputContainer = document.querySelector(".otp-input-container");
const otpInputFields = document.querySelectorAll(".otp-fields");
const changeLink = document.querySelector(".verify-otp-container h3 a");
verifyBtn = document.getElementById("verify-otp-btn");
const toastIcons = {
    "submit":`<i class="fa-solid fa-circle-check submit-icon"></i>`,
    "error":`<i class="fa-solid fa-circle-exclamation error-icon"></i>`
}
const userData = {
    "otp": 123456
}

function validatePhoneNumber(phone){
    return /^[6-9]\d{9}$/.test(phone);
}
function createToast(message,type)
{   let toastAlready = document.querySelector(".toast");
    if(toastAlready) toastAlready.remove();

   let toast =  document.createElement('div');
   toast.classList.add("toast");
   toast.innerHTML = `
   <div class="toast-icon-box">${toastIcons[type]}</div>
   <p>${message}</P>`;
   document.body.appendChild(toast);
   
}
phoneLabel.addEventListener("click",(e)=>{
    phone.style.display = "block";
    e.target.style.fontSize = "0.4rem";
    formInputWrapper.style.borderBottomColor = "#2874f0";
});
phone.addEventListener("blur",(e)=>{
    if(!(e.target.value.length > 0))
    { e.target.style.display = "none";
        countryCode.style.display = "none";
    }

    phoneLabel.style.fontSize = "0.5rem";
    formInputWrapper.style.borderBottomColor = "#e0e0e0";
});
phone.addEventListener("input",()=>{
    phone.value = phone.value.replace(/[^0-9]/g,"");

    if(phone.value.length > 0){
    countryCode.style.display = "block";
    }else{
        countryCode.style.display = "none";
    }

    const oldError = document.querySelector(".error-msg");
    if(oldError){
        oldError.remove();
    }
     formInputWrapper.style.borderBottomColor = "#2874f0";
});

loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    const isValid = validatePhoneNumber(phone.value);
    const oldError = document.querySelector(".error-msg");
    if (oldError) oldError.remove();

    if(!isValid){
        const error = document.createElement('div');
        formInputWrapper.insertAdjacentElement("afterend",error);
        error.classList.add("error-msg");
        error.innerHTML = "Please enter valid Mobile number";
        formInputWrapper.style.borderBottomColor = "#ff6161";
    }
    else{
        let phoneNumber = '+91' + phone.value;
        const toastMessage = `Verfication code sent to ${phoneNumber}`;
        createToast(toastMessage,"submit");
        requestOtpContainer.style.display = "none";
        verifyOtpContainer.style.display = "flex";
        verifyOtpContainer.classList.add("right-side");
        verifyOtpContainer.querySelector("h3 span").innerHTML = `${phoneNumber}`;

        otpInputFields.forEach((element)=>{
            element.setAttribute("maxLength","1");
            element.setAttribute("pattern","[0-9]*");
            element.setAttribute("inputMode","numeric");
        });

        otpInputContainer.addEventListener("click",()=>{

            otpInputFields.forEach((field,index)=>{
               field.addEventListener("input",(e)=>{
                const value = e.target.value;
                if(isNaN(value))
                {
                    e.target.value = "";
                    return;
                }

                if(value != ""){
                    const next = e.target.nextElementSibling;
                    if(next) next.focus();
                }
               });
               
               field.addEventListener("keyup",(e)=>{
                const key = e.key.toLowerCase();

                if(key === "backspace" || key === "delete")
                {   e.target.value = "";
                   const prev = e.target.previousElementSibling;
                    if(prev) prev.focus();
                }
                return;

               });
            });
        });

    }
});

changeLink.addEventListener("click",()=>{

    otpInputFields.forEach((field,index)=>{
        field.value = "";
    })
    verifyOtpContainer.style.display = "none";
    requestOtpContainer.style.display = "flex";
});

verifyBtn.addEventListener("click",()=>{
    let temp = "";

    otpInputFields.forEach((field,index)=>{
        temp += field.value;
    });

    if(userData.otp === parseInt(temp))
    {
        alert("You successfully logged in.");
    }
    else{
        createToast("OTP is incorrect. please try again!","error");
    }

});
