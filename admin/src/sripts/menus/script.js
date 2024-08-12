// import all  crud functions
import { Buffer } from "https://jspm.dev/buffer";
import { saveDateIntoDataBase } from "../data.js";
import { updateDataIntoDataBase } from "../data.js";
import { deletDataInDataBase } from "../data.js";
import { fetchDataFromDataBase } from "../data.js";
import { fetchAllDataFromDataBase } from "../data.js";
import { supabase } from "../../../../config.js";
import { formatAmout } from "../data.js";

//selectors to render the contents into the dom

const menus_list = document.querySelector(".menus__container--list");
const menus_container = document.querySelector(".menus__items--lists");
const menusLength = document.querySelector(".total__menus");
const menus_popupContainer = document.querySelector(".menu__overlay--popup");
const addNewMenu_form = document.getElementById("add__menuForm");
const addNewMenuBtn = document.querySelector(".add__new--menu-button");
const addNew_food_button = document.querySelector(".add-food");
const close_form = document.querySelector(".close_form");
const foodImage = document.getElementById("menu-image");
const noResult_container = document.getElementById("no_menu--item");
const menus__wrapper = document.querySelector(".menus__items--lists");
const menusConatiner = document.querySelector(".menus__container--list");
const success__wrapper = document.querySelector(".success-container");
const success_message = document.querySelector(".success_message");
const close__successMsg = document.querySelector("#close_succes-popup");
const update_menuForm = document.getElementById("update_menuForm");

//function to create a success alert message for the admin.

function successMessage(message) {
  success_message.innerHTML = message;
  success__wrapper.classList.remove("hideSuccessForm");

  //remove it after 2 seconds
  setTimeout(function() {
    success__wrapper.classList.add("hideSuccessForm");
  }, 3000);
}

//close the success message popup
close__successMsg.addEventListener("click", function() {
  success__wrapper.classList.add("hideSuccessForm");
});

//select the image and convert the image to base64;
foodImage.addEventListener("change", function(e) {
  const imageFile = foodImage.files[0];
  if (imageFile) {
    const render = new FileReader();
    render.onload = function(e) {
      const imageFiles = e.target.result;
      const preview_image = document.getElementById("preview_image");

      if(preview_image){
        preview_image.src = imageFiles;
      }
      localStorage.setItem("imageUrl", imageFiles);
    };
    render.readAsDataURL(imageFile);
  } else {
    console.log(" no image found");
    return;
  }
});

//add event to show the popop and form to add new menu.
addNewMenuBtn.addEventListener("click", function(e) {
  menus_popupContainer.classList.remove("hide_popup");
  addNewMenu_form.classList.remove("hide_add-newForm");
});

//event to close the popup forms
close_form.addEventListener("click", function(e) {
  e.preventDefault();
  setTimeout(function() {
    menus_popupContainer.classList.add("hide_popup");
    addNewMenu_form.classList.add("hide_add-newForm");
    location.reload();
  }, 2000);
});

//new food item inputs
async function addNewFoodInputs() {
  const image = localStorage.getItem("imageUrl");
  const addNewfoodData = {
    name: addNewMenu_form.name.value,
    price: addNewMenu_form.price.value,
    details: addNewMenu_form.description.value,
    image: image
  };
  const data = await saveDateIntoDataBase(addNewfoodData, "menus");
  if (data.length !== 0) {
    successMessage("Your item was added successfully");
    addNewMenu_form.reset();
    addNew_food_button.innerHTML = "Add now";
  }
}

//add eventlistener to submit the food inputs into the database

addNewMenu_form.addEventListener("submit", function(e) {
  e.preventDefault();
  addNew_food_button.innerHTML = "Please wait...";
  addNewFoodInputs();
});

//fetch all the menu items from the data base.....

async function getAllMenuItems() {
  menusConatiner.innerHTML = "";
  const menusItems = await fetchAllDataFromDataBase("menus");

  if (menusItems.length === 0 || menusItems === "underfined") {
    noResult_container.classList.remove("hide__nomenu");
    menus__wrapper.classList.add("hide__menus");
    return;
  } else {
    addNewMenu_form.reset();
    renderMenuItems(menusItems);
    addNew_food_button.innerHTML = "Add now";
  }
}
getAllMenuItems();

// render the menus items fetch from the data base

function renderMenuItems(menus) {
  menusLength.innerHTML = `Total menus : ${menus.length}`;
  menus.forEach((menu, index) => {
    menusConatiner.innerHTML += `  <li id=${menu.id} class="menus__item--list menu__item--list--body">
                  <span>${index + 1}</span>
                  <span>${menu.name}</span>
                  <span>${formatAmout(menu.price)}</span>
                  <span class="menu__status">${menu.status}</span>
                  <div class="action__buttons">
                    <button class="update">Update</button>
                    <button class="delete">Delete</button>
                  </div>
                </li>`;
  });
  const menusItem = document.querySelectorAll(".menus__item--list ");
  getMenusItemEl(menusItem);
}

//fuction get the menus item id

function getMenusItemEl(menusItem) {
  menusItem.forEach(menuItem => {
    menuItem.addEventListener("click", function(e) {
      const menuID = this.getAttribute("id");
      const actionBtn = e.target.textContent;
      getMenusInformation(menuID, actionBtn);
    });
  });
}

//get the menus infomation

async function getMenusInformation(menuID, actionBtn) {
  if (actionBtn === "Update") {
    const data = await fetchDataFromDataBase("menus", "id", menuID);
    menus_popupContainer.classList.remove("hide_popup");
    update_menuForm.classList.remove("hide__update--form");
    renderDetails(data);
    return;
  }
  if (actionBtn === "Delete") {
    deleteFoodMenuItem(menuID);
  }
}

// ...render the infomation on the update form.......

function renderDetails(data) {
  localStorage.setItem("menuID", data[0].id);
  update_menuForm.innerHTML = ` <div class="menu__input--group">
              <h1 class="primary-heading">Update <span>Fried rice</span></h1>
              
            </div>
            <div class="menu__input--group update__image">
              <img id='preview_image' src="${data[0].image}" alt="" />

              <label class="menu-image primary-button" for="menu-image">
                <input name="menu-image" id="menu-image" type="file" hidden />
                Update image
              </label>
            </div>
            <div class="menu__input--group">
              <label for="name">Food name</label>
              <input
                name="name"
                type="text"
                class="menu__form--input"
                value="${data[0].name}"
                required
              />
            </div>
            <div class="menu__input--group">
              <label for="amount">Food price</label>
              <input
                name="amount"
                type="number"
                class="menu__form--input"
                value="${data[0].price}"
                required
              />
            </div>
            <div class="menu__input--group">
              <label for="price">Change Status</label>
              <select name="status" id="status">
                <option value="${data[0].status}">${data[0].status}</option>
                 <option value="Inactive">Inactive</option>
              
              </select>
            </div>

            <div class="menu__input--group">
              <label for="description">Update Item details</label>
              <textarea
                name="description"
                id="description"
                cols="10"
                rows="5"
                required
                spellcheck="false"
              >
        
              ${data[0].details}
              </textarea>
            </div>

            <div class="menu__input--group popup__buttons">
              <button class="delete updatedCancelBtn">Close</button>
              <button class="add-food updateBtn">Update now</button>
            </div>`;
  const updatedCancelBtn = document.querySelector(".updatedCancelBtn");
  getCancelEl(updatedCancelBtn);
}
//get the all the updated inputs

async function getAllUupdatedInputs(data) {
  const id = localStorage.getItem("menuID");
  const updatedData = await updateDataIntoDataBase(data, "menus", "id", id);
  if (data.length !== 0) {
    successMessage("The menu item was successfully updated");
    update_menuForm.reset();
    const updateBtn = document.querySelector(".updateBtn");
    updateBtn.innerHTML = "Update now";
    setTimeout(() => {
      menus_popupContainer.classList.add("hide_popup");
      update_menuForm.classList.add("hide__update--form");
    }, 2000);
  }
}

//get the cancel button element and add event to close the form.

function getCancelEl(updatedCancelBtn) {
  updatedCancelBtn.addEventListener("click", function(e) {
    e.preventDefault();
    menus_popupContainer.classList.add("hide_popup");
    update_menuForm.classList.add("hide__update--form");
  });
}

//add event to update food item.
update_menuForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const image = localStorage.getItem("imageUrl");
  const updateBtn = document.querySelector(".updateBtn");
  const menuUpdatedDataInputs = {
    name: update_menuForm.name.value,
    price: update_menuForm.amount.value,
    details: update_menuForm.description.value,
    status: update_menuForm.status.value,
    image: image
  };
  getAllUupdatedInputs(menuUpdatedDataInputs);
  updateBtn.innerHTML = "Updating....";
});

// delete the item from the dom and also the database.

async function deleteFoodMenuItem(id) {
  const deleteResults = await deletDataInDataBase("menus", "id", id);
  if (deleteResults.length !== 0) {
    successMessage("The item was successfully deleted.");
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
}
