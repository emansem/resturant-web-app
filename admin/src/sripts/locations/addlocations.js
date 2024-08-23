const locationsContainer = document.querySelector(".dashboard__reports");
const locationsWrapper = document.querySelector("#locations");
const close_location_form = document.querySelector(".close_location_form");
const add__locationPopup = document.querySelector(".add__location--popup");
const location_form = document.querySelector(".location_form");
const openLocationForm = document.querySelectorAll(".openLocationForm");
const no__locations = document.querySelector(".no__locations");
const addLocationBtn = document.querySelector(".addLocationBtn");
const quatersWrapper = document.querySelector("#quater");
const locationButtons = document.querySelectorAll(".locationButtons");
const form__alert = document.querySelector(".form__alert");

//imports all the functions the do the crud operations
import {
  fetchAllDataFromDataBase,
  fetchDataFromDataBase,
  formatAmout,
  saveDateIntoDataBase
} from "../../../../general/data.js";

//a function to check if there is already some quarters and price set already.
async function getAllTransportSettings() {
  const data = await fetchAllDataFromDataBase("transport_settings");
  if (data.length !== 0) {
    no__locations.classList.add("hideNolocation");
    locationsContainer.classList.remove("hideLocationsContainer");
    renderLocations(data);
  }
}
getAllTransportSettings();

//get all the quarters and render in the select fileds.
async function getAllQuarters() {
  const data = await fetchAllDataFromDataBase("quarters");
  if (data.length !== 0) {
    data.forEach(quarter => {
      quatersWrapper.innerHTML += `
                        <option dataId="${quarter.id}" value="${quarter.name}">${quarter.name}</option>
        
        `;
    });
    console.log(quatersWrapper);
  } else {
    console.log("no data found here");
  }
}
getAllQuarters();

//open the location form
openLocationForm.forEach(button => {
  button.addEventListener("click", function(e) {
    e.preventDefault();
    add__locationPopup.classList.remove("hideLocationsForm");
  });
});

//get the quarter id and keep it.
function getQuarterId() {
  quatersWrapper.addEventListener("input", function(e) {
    e.preventDefault();
    const option = this.options[this.selectedIndex];
    const quarterid = option.getAttribute("dataid");
    localStorage.setItem("quarterid", quarterid);
  });
}

getQuarterId();

//get all the  transport settings inputs
function getAllTransportSettingsInputs() {
  const quarter_id = parseInt(localStorage.getItem("quarterid"));
  const saveData = {
    quarter: location_form.quarter.value,
    price: location_form.amount.value,
    quarter_id: quarter_id
  };
  saveTransportSettingsData(saveData);
}
//add data into the database
async function saveTransportSettingsData(saveData) {
  const data = await saveDateIntoDataBase(saveData, "transport_settings");
  if (data.length !== 0) {
    successAlertMsg(`'${data[0].quarter}' was successfully saved`, "success_alert");
    setTimeout(()=>{
     form__alert.style.display = 'none';
    }, 1500)
    locationButtons.forEach(button => {
      button.disabled = false;
      button.id = "";
    });
    location_form.reset();
  }
}
//add event to add new locations and transport form
location_form.addEventListener("submit", function(e) {
  e.preventDefault();
  getAllTransportSettingsInputs();
  locationButtons.forEach(button => {
    button.disabled = true;
    button.id = "locationButtons";
  });
  successAlertMsg("Saving please wait...");
});

//success alert message
function successAlertMsg(message, className) {
  form__alert.classList.add(`${className}`);
  form__alert.innerHTML = message;
}

//close the popop form
close_location_form.addEventListener("click", function(e) {
  e.preventDefault();
  add__locationPopup.classList.add("hideLocationsForm");
});

//render the locations and the transport on the web page
function renderLocations(data){
    data.forEach((location, index)=>{
        locationsWrapper.innerHTML+=` <tr>
                    <td>${index +1}</td>
                    <td>${location.quarter}</td>
                    <td>${formatAmout(location.price)}</td>
                    <td>update</td>
                  </tr>`
    })
}