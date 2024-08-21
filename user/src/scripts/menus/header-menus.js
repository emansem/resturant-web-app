const dashboard__header = document.querySelector(".header__top");
import { saveDateIntoDataBase } from "../../../../general/data.js";
import { updateDataIntoDataBase } from "../../../../general/data.js";
import { deletDataInDataBase } from "../../../../general/data.js";
import { fetchDataFromDataBase } from "../../../../general/data.js";
import { fetchAllDataFromDataBase } from "../../../../general/data.js";
import { timeAgo } from "../../../../general/helper.js";
const notification__popup = document.querySelector(".notification__popup");
const closeNotPopup = document.querySelectorAll(".closeNotPopup");
const notification__items = document.querySelector(".notification__items");
const no__notifications = document.querySelector(".no__notifications");
const notification__container = document.querySelector(
  ".notification__container"
);
const deleteAllNotications = document.querySelector(".mark__all--read");

const activeId = localStorage.getItem("activeID");
const id = Number(activeId);

//get total notifications and total items in the cart;
async function getNotificationsTotalAndCartTotal() {
  dashboard__header.innerHTML = "";
  const cart = await fetchAllDataFromDataBase("cart");
  const notificationsLength = await fetchDataFromDataBase(
    "notifications_number",
    "client_id",
    activeId
  );
  const notifications = await fetchDataFromDataBase(
    "notifications",
    "customer_ID",
    activeId
  );
  renderHeaderMenus(cart.length, notificationsLength[0].length);
  renderNotifications(notifications);
}
getNotificationsTotalAndCartTotal();

//render the header top bar menus
function renderHeaderMenus(cart, notifications) {
  dashboard__header.innerHTML = `<div class="logo-header">
                  <img
                    src="/user/src/images/logo.png"
                    alt="Jandar kitchen logo"
                  />
                </div>
                <div class="header__menu">
                  <span class="notice"
                    ><i class="fas fa-bell"></i>
                    <span class="notice_count">${notifications}</span></span
                  >
                  <a href='/user/pages/cart.html'>
                  <span class="cart"
                    ><i class="fas fa-cart-plus"></i>
                    <span class="order-count"> ${cart} </span></span
                  ></a>
                 
                    <i class=" fas fa-bars"></i>
                  
                </div>`;
  const notificationsIcon = document.querySelector(".notice");
  showNotificationsPopup(notificationsIcon);
}

//add event listener to show the notifications popup;
async function showNotificationsPopup(notificationsIcon) {
  notificationsIcon.addEventListener("click", event => {
    document.querySelector(".notice_count").innerHTML = 0;
    //update the notification length
    const saveData = {
      length: 0
    };
    updateDataIntoDataBase(
      saveData,
      "notifications_number",
      "client_id",
      activeId
    );
    notification__popup.classList.remove("hideNotificationPopup");
    notification__popup.id = "";
  });
}
//close the notification popup
closeNotPopup.forEach(button=>{
  button.addEventListener("click", function(e) {
    notification__popup.id = "notification__popup";
    setTimeout(() => {
      notification__popup.classList.add("hideNotificationPopup");
    }, 700);
  });
})

//render all notifications on the page
function renderNotifications(data) {
  const totalNotificationsData = data.sort((a, b) => b.id - a.id).slice(0, 5);
  if (totalNotificationsData.length !== 0) {
    totalNotificationsData.forEach(notification => {
      const time = timeAgo(notification.created_at);
      notification__items.innerHTML += `  <div class="notifications__item">
      <div class="notification__item-header">
        <h2 class="notification__heading">${notification.action}</h2>
        <span class="read_time">${time}</span>
      </div>
      <div class="notification__item-body">
        <p class="notification__message">${notification.description}</p>
      </div>
    </div>`;
    });
  } else {
    no__notifications.classList.remove("hideNotifications");
    notification__container.classList.add("hideNotficationsContainer");
  }
}

//delete all notifications when is mark all as read.
deleteAllNotications.addEventListener("click", async () => {
  notification__container.classList.add("hideNotficationsContainer");
  no__notifications.classList.remove("hideNotifications");
  const data = await deletDataInDataBase('notifications', 'customer_ID', activeId);
  if(data.length !==0){
    notification__container.classList.add("hideNotficationsContainer");
    no__notifications.classList.remove("hideNotifications");
  }
});
