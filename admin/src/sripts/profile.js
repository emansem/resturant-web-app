import { fetchAllDataFromDataBase } from "../../../../general/data.js";
import { updateDataIntoDataBase } from "../../../../general/data.js";
const profile__wrapperForm = document.querySelector(".profile__wrapper");
const update__profileMessage = document.querySelector(
  ".update__profile--message"
);
//show success message
function showFailOrSuccessMsg(message, className = "update__profile--message") {
    update__profileMessage.style.display = 'block';
  update__profileMessage.classList.add(`${className}`);
  update__profileMessage.innerHTML = `${message}`;
  setTimeout(() => {
    update__profileMessage.style.display = 'none';
  }, 1500);
}

//get all admin login
async function getAdminLogin() {
  const data = await fetchAllDataFromDataBase("admin");
  if (data.length !== 0) {
    profile__wrapperForm.email.value = data[1].email;
  }
}
getAdminLogin();
//get all admin update inputs
async function getAllAdminInput() {
  const data = await fetchAllDataFromDataBase("admin");
  if (data.length !== 0) {
    const oldPassword = profile__wrapperForm.password.value;
    const saveData = {
      email: profile__wrapperForm.email.value,
      password: profile__wrapperForm.newPassword.value
    };
    
    if (data[1].password !== oldPassword) {
      showFailOrSuccessMsg("Password donot match", 'faild__message');
      console.log(oldPassword, data[1].password)
      return
    }else{
     const updatedData  = await updateDataIntoDataBase(saveData, 'admin','id', data[1].id);
     if(updatedData.length !==0){
        showFailOrSuccessMsg('Your information was successfully updated');
        profile__wrapperForm.reset();
     }
        
    }
  }
}
profile__wrapperForm.addEventListener('submit', function(e){
    e.preventDefault();
    getAllAdminInput();
})
