// the functions to operate cruds operations;
import { saveDateIntoDataBase } from "../../../../general/data.js";
import { updateDataIntoDataBase } from "../../../../general/data.js";
import { deletDataInDataBase } from "../../../../general/data.js";
import { fetchDataFromDataBase } from "../../../../general/data.js";
import { fetchAllDataFromDataBase } from "../../../../general/data.js";
import { supabase } from "../../../general/config.js";
import { formatAmout } from "../../../../general/data.js";


//the selectors to render this in the dom
const foodItime__container = document.querySelector('.dashboard__body');
const greetMessage = document.querySelector('.greeting');


// import the functions to use here.
 import { getUserData } from "../scripts/data.js";
const userData = await getUserData();
  const userName =  userData[0].name.split(' ')[0];

//function to greet the user depending on the time.
function greetUser(){
    const hours =  new Date().getHours();
    if(hours >=6 && hours < 12){
       greetMessage.innerHTML = `Hi <span>${userName}, </span> Good morning!`
    }
    else if(hours >= 12 && hours < 18){
      greetMessage.innerHTML = `Hi <span>${userName}, </span> Good afternoon!`
    }else{
        greetMessage.innerHTML = `Hi <span>${userName}, </span> Good evening!`
    }
}
greetUser();

//get all the menus from the admin and render to the users.
async function getAllMenusItems(){
  foodItime__container.innerHTML = '';
  const data = await fetchAllDataFromDataBase('menus');
  console.log(data)
  const filterData = data.filter(menu=>menu.status === 'Active');

  if(filterData && filterData.length !==0){
   renderFoodMenuItems(filterData);
  }else{
    foodItime__container.innerHTML = '<div class ="primary-heading">No item found here</div>';
  
  }
}
getAllMenusItems();

//render the food item to the users 
function renderFoodMenuItems(menus){
  menus.forEach(menu => {
    foodItime__container.innerHTML+= `   <div class="food-item">
              <div class="food__photo">
                <img src="${menu.image}" alt="${menu.name}" />
              </div>
              <div class="food__info">
                <div class="food__name">${menu.name}</div>
                <div class="food__price--btn">
                  <div class="food__price">
                    <span class="price-text">Price:</span
                    ><span class="price">${formatAmout(menu.price)}</span>
                  </div>
                  <div>
                   <a  href='/user/pages/meal-details.html?id=${menu.id}' class="food__btn">Order now</a>
                  </div>
                </div>
              </div>
            </div>` 
  });

}












