const welcomeBtn = document.querySelector('.welcomebtn');
import { fetchDataFromDataBase } from "../../../../general/data.js";
const activeId = localStorage.getItem("activeID");
const id = Number(activeId);
welcomeBtn.addEventListener('click', function(e){
   setTimeout(function(){
    location.href = '/user/pages/auth/account.html'

   }, 2000)
})

//check if the user have login or not
async function checkIfAuserHaveLogin() {
   if (!activeId) {
     location.href = `/user/pages/auth/account.html`;
     return;
   } else {
     const data = await fetchDataFromDataBase("users", "id", activeId);
     
     if (data[0].id === id) {
      location.href = `/user/pages/dashboard.html`;
      return
     } 
     
   }
 }
 checkIfAuserHaveLogin();