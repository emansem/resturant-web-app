import {
  fetchAllDataFromDataBase,
  saveDateIntoDataBase
} from "../../../../general/data.js";
const admin_loginForm = document.querySelector(".admin__login");
const login__button = document.querySelector(".login__button");
const admin__success = document.querySelector(".admin__success");

//get all admin details and check if there is data already there
async function getAdminLogin() {
  const data = await fetchAllDataFromDataBase("admin");
  if (data.length !== 0) {
    getAllAdminRegisterInputs(data);
    return;
  }
}
//display succes and failed message to the users
function displayMessage(message, className='admin__success') {
  admin__success.style.display = "block";
  admin__success.innerHTML = `${message}`;
  admin__success.classList.add(`${className}`);
  setTimeout(function() {
    admin__success.style.display = "none";
  }, 2000);
}

//get all admin account details.
async function getAllAdminRegisterInputs(data) {
  const email = admin_loginForm.email.value;
  const password = admin_loginForm.password.value;
  if (data[1].email !== email) {
    displayMessage("Invalide email", "faild__message");
    login__button.disabled = false;
    login__button.innerHTML = `Login`;
    return;
  } else if (data[1].password !== password) {
    displayMessage("Invalide password", "faild__message");
    login__button.disabled = false;
    login__button.innerHTML = `Login`;
    
    return;
  } else {
    displayMessage("Successfully login");
    localStorage.setItem('adminlogin', data[1].id);
    login__button.innerHTML = `Login `;
    admin_loginForm.reset();
    setTimeout(function() {
      location.href = "/admin/pages/dashboard.html";
    }, 2000);
  }
}

//add event to save the data to the database
admin_loginForm.addEventListener("submit", e => {
  e.preventDefault();
  getAdminLogin();
  login__button.disabled = true;
  login__button.innerHTML = `Please wait...`;
});

//check if the user is login already;
async function checkIfUserIsLoggedIn(){
    const adminId = parseInt(localStorage.getItem('adminlogin'))
    const data = await fetchAllDataFromDataBase('admin');
   
    if(adminId && adminId === data[1].id){
        setTimeout(function() {
            location.href = "/admin/pages/dashboard.html";
          }, 1000);
          return;
    }


}
checkIfUserIsLoggedIn();