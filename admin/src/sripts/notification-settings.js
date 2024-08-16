import { fetchDataFromDataBase } from "../../../../general/data.js";
import { fetchAllDataFromDataBase } from "../../../../general/data.js";
import { formatAmout } from "../../../../general/data.js";
import { saveDateIntoDataBase } from "../../../../general/data.js";
import { updateDataIntoDataBase } from "../../../../general/data.js";
import { deletDataInDataBase } from "../../../../general/data.js";
const no__messageAdded = document.querySelector(".no__message--added");
const updateNoticationsForm = document.querySelector(
  "#update__notifications--message-form"
);
const addNewNotificationMessage = document.querySelector(
  "#addNewNotificationMessage"
);
const addNewNotificationForm = document.querySelector(
  "#addNewNotificationForm"
);
const sucessMessage = document.querySelector("#sucessMessage");
const close__AddnewNotifcationForm = document.querySelector(
  "#close__order--status-form"
);
const setupBtn = document.querySelector(".setupBtn");
const submitBtnContainer = document.querySelector(".change__orderBtn");
const closePopUp = document.querySelector("#closePopUp");

// `<p class="sucess-text">Order status was successfully Rejecetd`

//cehck if there is any  notification message in the database

async function checkForNotificationsMessage() {
  const data = await fetchAllDataFromDataBase("notifications_settings");
  if (data.length === 0) {
    no__messageAdded.classList.remove("hideNoNoticationsMessage");
    return;
  } else {
    updateNoticationsForm.classList.remove("hidechangestatusForm");
    renderNotificationsMessage(data);
  }
}
checkForNotificationsMessage();

//add event to open the add new notifications messsage popup form
setupBtn.addEventListener("click", function(e) {
  e.preventDefault();
  setTimeout(() => {
    addNewNotificationMessage.classList.remove("hideAction-popup");
  }, 500);
});

function getAllNoticationsMsgInputs() {
  const saveData = {
    processing_message: addNewNotificationForm.processing.value,
    delivery_message: addNewNotificationForm.deliver.value,
    completed_message: addNewNotificationForm.complete.value,
    sms_message: addNewNotificationForm.smsmessage.value,
    reject_message: addNewNotificationForm.reject.value,
    coupon_message: addNewNotificationForm.coupon.value
  };
  saveNotificationsMessage(saveData);
}

//add a event to submit the add new notifcation form
addNewNotificationForm.addEventListener("submit", function(e) {
  e.preventDefault();
  submitBtnContainer.innerHTML = `<p class='primary-text'>Saving please wait......</p>`;
  getAllNoticationsMsgInputs();
});

//save the notications information the database
async function saveNotificationsMessage(saveData) {
  const data = await saveDateIntoDataBase(saveData, "notifications_settings");
  if (data.length !== 0) {
    submitBtnContainer.innerHTML = `<p class="sucess-text"> Your notifications message was successfully saved</p>`;
    addNewNotificationForm.reset();
    //show success message here
    setTimeout(() => {
      submitBtnContainer.innerHTML = `<button id="close__order--status-form" class="cancel close__order--status-form">Close</button>
         <button class="save__status">Add now</button>`;
    }, 1500);
  }
}

//close the popup form
closePopUp.addEventListener("click", function(e) {
  e.preventDefault();
  addNewNotificationMessage.classList.add("hideAction-popup");
});

//render the notifications messages on the web page
function renderNotificationsMessage(data) {
  updateNoticationsForm.setAttribute("data_id", data[0].id);
  updateNoticationsForm.innerHTML = ` <h1 class="primary-heading notifications__heading">Update notifications message</h1>
            <div class="form__groud-textarea">
              <label for="processing">Add order processing message</label>
              <textarea name="processing" id="processing" cols="50"  required>
              ${data[0].processing_message}</textarea>
            </div>
            <div class="form__groud-textarea">
              <label for="deliver">Add order in delivery message</label>
              <textarea name="deliver" id="deliver" cols="50" required>
              ${data[0].delivery_message}
              </textarea>
            </div>
            <div class="form__groud-textarea">
              <label for="complete">Add order complete message</label>
              <textarea name="complete" id="complete" cols="50"  required>
               ${data[0].completed_message}
              </textarea>
            </div>
            <div class="form__groud-textarea">
              <label for="smsmessage">Add order SMS message</label>
              <textarea name="smsmessage" id="smsmessage" cols="50" required>
              ${data[0].sms_message}
              </textarea>
            </div>
            <div class="form__groud-textarea">
              <label for="reject">Add order reject message</label>
              <textarea name="reject" id="reject" cols="50"  required>
              ${data[0].reject_message}
              </textarea>
            </div>
            <div class="form__groud-textarea">
              <label for="coupon">Add coupon  message</label>
              <textarea name="coupon" id="coupon" cols="50"  required>
              ${data[0].coupon_message};
              </textarea>
            </div>
            <div  id='saveBtn' class="save__message--Btn-wrapper">
              <button  id=${data[0]
                .id} class=" primary-button save__message--button ">Save message</button>
              </div>`;
}

//get all the update form notifications message inputs
function getAllNotificationsUpdateInputs(id, saveBtn) {
  const saveData = {
    processing_message: updateNoticationsForm.processing.value,
    delivery_message: updateNoticationsForm.deliver.value,
    completed_message: updateNoticationsForm.complete.value,
    sms_message: updateNoticationsForm.smsmessage.value,
    reject_message: updateNoticationsForm.reject.value,
    coupon_message: updateNoticationsForm.coupon.value
  };
  updateNoticationsMessage(saveData, id, saveBtn);
}

//add event to the update form to update the data in the database
updateNoticationsForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const saveBtn = document.getElementById("saveBtn");
  saveBtn.innerHTML = `<p class='primary-text'>Saving please wait......</p>`;

  const id = this.getAttribute("data_id");
  getAllNotificationsUpdateInputs(id, saveBtn);
});

//update the notifications messages data in the database;
async function updateNoticationsMessage(saveData, id, saveBtn) {
  const data = await updateDataIntoDataBase(
    saveData,
    "notifications_settings",
    "id",
    id
  );
  if (data.length !== 0) {
    //show success message here
    saveBtn.innerHTML = `<p class="sucess-text"> Your notifications message was successfully updated</p>`;
    addNewNotificationForm.reset();

    setTimeout(() => {
      saveBtn.innerHTML =
        ' <button  id=${data[0].id} class=" primary-button save__message--button ">Save message</button>';
    }, 3000);
  }
}
