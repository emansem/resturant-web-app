import { fetchAllDataFromDataBase } from "../../../../general/data.js";
const customers__wrapper = document.querySelector(
  "#customers__wrapper"
);
const customers__container = document.querySelector('.dashboard__reports');

//get all the users from the database
async function getAllUsers(){
    const data = await fetchAllDataFromDataBase('users');
    if(data.length !==0){
    renderUsers(data);
    }else{
        customers__container.innerHTML =` <h1 class="primary-heading">NO data found</h1>` ;
    }
}
getAllUsers();
//render the users on the web page;
function renderUsers(data){
    const users = data.sort((a, b)=> b.id-a.id);
    users.forEach(user => {
    const date = new Date(user.created_at).toLocaleDateString();
    customers__wrapper.innerHTML+=`  <tr>
                  <td>${user.name}</td>
                  <td>${user.phone}</td>
                  <td>${date}</td>
                </tr>`
    });
    
}