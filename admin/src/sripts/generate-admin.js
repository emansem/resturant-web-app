
import { fetchAllDataFromDataBase, saveDateIntoDataBase } from "../../../../general/data.js";
const  register__form = document.querySelector('.register__form');
const register__button = document.querySelector('.register__button');
const admin__success = document.querySelector('.admin__success');

//get all admin details and check if there is data already there
async function getAdminLogin(){
    const data  = await fetchAllDataFromDataBase('admin');
    if(data.length !==0){
        location.href= '/admin/pages/adminlogin.html';
       return
    }
}
getAdminLogin();

//get all admin account details.
async function getAllAdminRegisterInputs(){
    const saveData = {
        email: register__form.email.value,
        password: register__form.password.value,
    }
   const data = await saveDateIntoDataBase(saveData, 'admin');
   if(data.length !==0){
    location.href= '/admin/pages/adminlogin.html';
    register__button.innerHTML = `Register now`;
    register__form.reset();
   }
}

//add event to save the data to the database
register__form.addEventListener('submit', (e)=>{
e.preventDefault();
getAllAdminRegisterInputs();
register__button.disabled =true;
register__button.innerHTML = `Please wait...`

});