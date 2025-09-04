const form = document.getElementById("sign-in-form");
let password = document.getElementById('password');
const email = document.getElementById("email");
const eyeBtn = document.querySelector(".eye-btns");
const eyeOpen = document.querySelector(".eye-open");
const eyeSlash = document.querySelector(".eye-slash");
const signInBtn = document.getElementById("sign-in-btn");
const emailWrapper = document.querySelector(".email-wrapper");
const passwordWrapper = document.querySelector(".password-wrapper");
const invalidCredentials = document.querySelector(".invalid-credentials-msg");
const loader = document.querySelector(".loader");


const storedUserData = {
    "userEmail": "fakeuser@gmail.com",
    "userPassword" : "Password@123"
};


function validateEmail(){
    let value = email.value;
    value =  value.trim().toLowerCase();
    let valid = value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)? true : false;
    
    let error = emailWrapper.querySelector(".error-msg");
    if(!valid){
        error.innerHTML = "Please enter an valid email.";
        return false;
    }
    else{
        error.innerHTML= "";
        return true;
    }
}
function validatePassword(){
    let value = password.value;
    value = value.trim();

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    let valid = regex.test(value)? true:false;
    
    let error = passwordWrapper.querySelector(".error-msg");

    if(!valid){
        error.innerHTML = "Please enter a valid password";
        return false;
    }
    else{
        error.innerHTML= "";
        return true;
    }
}

function runLoadingAnimation({isPlaying = false,duration=0}){
    let iterationCount;
    let animationDuration = loader.style.animationDuration = "0.5s";
    animationDuration = animationDuration.slice(0,animationDuration.indexOf("s"));
    animationDuration = parseFloat(animationDuration);
    
    if(duration <= 0){
        iterationCount = "infinite";
    }
    else{
        iterationCount =parseInt(duration / (animationDuration * 1000));
    }

    if(isPlaying){
       form.classList.add("playing");
       loader.style.display = "block";
       loader.style.animationIterationCount = iterationCount;
    }
    else{
        form.classList.remove("playing");
        loader.style.display = "none";
    }
}

eyeBtn.addEventListener("click",()=>{
    if(password.type == "password")
    {
        password.type = "text";
        eyeSlash.style.display = "none";
        eyeOpen.style.display = "block";
    }
    else{
        password.type = "password";
        eyeSlash.style.display = "block";
        eyeOpen.style.display = "none";
    }
});

email.addEventListener('blur',()=>{
    validateEmail();
});
password.addEventListener('blur',()=>{
    validatePassword();
});

email.addEventListener('input',()=>{
     email.style.outline = "none";
     invalidCredentials.innerHTML = "";
     invalidCredentials.style.padding = "0";
});
password.addEventListener('input',()=>{
    password.style.outline = "none";
    invalidCredentials.innerHTML = "";
    invalidCredentials.style.padding = "0";
});
form.addEventListener("submit",function(e){
    e.preventDefault();
    let valid = false;
    let emailVal = validateEmail();
    let passwordVal = validatePassword();

    if(emailVal && passwordVal){
        valid  = true;
        setTimeout(() => {
            runLoadingAnimation({isPlaying:true,duration:0});
        }, 500);
    }
    
    if(valid){
        let inputEmail = email.value;
        let inputPassword = password.value;

        email.style.outline = "none";
        password.style.outline = "none";
        const duration = 2000;
        setTimeout(() => {
            runLoadingAnimation({isPlaying:false});

            if((inputEmail === storedUserData.userEmail)
            && (inputPassword === storedUserData.userPassword)){
                setTimeout(() => {
                    alert("You loggged in!");
                }, 500);
            }
            else{
                email.style.outline = "0.05rem double orange";
                password.style.outline = "0.05rem double orange";

                invalidCredentials.classList.add("invalid-error");
                invalidCredentials.innerHTML = "You’ve entered an invalid email or password. Try again!";
            }
        }, duration);
        
    }
})