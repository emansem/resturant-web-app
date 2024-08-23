const notification__container = document.getElementById(
  "notification__items"
);
const notificationWrapper = document.querySelector("#notification__container--items");
import { fetchDataFromDataBase } from "../../../../general/data.js";
async function renderNotifications() {
  const notifications = await fetchDataFromDataBase(
    "notifications",
    "customer_ID",
    activeId
  );

  if (notifications.length !== 0) {
    const totalNotificationsData = notifications.sort((a, b) => b.id - a.id).slice(0, 5);
    totalNotificationsData.forEach(notification => {
      const time = timeAgo(notification.created_at);
      notification__container.innerHTML += `  <div class="notifications__item">
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
    notificationWrapper.innerHTML=`  <h1 class="primary-heading">
             No notifications
             </h1>
          <p class="primary-text">
            You have not received any notification
          </p>`
  }
}
renderNotifications()
console.log('hello world')