import { fetchDataFromDataBase } from "../../../../general/data.js";
import { fetchAllDataFromDataBase } from "../../../../general/data.js";
import { formatAmout } from "../../../../general/data.js";
import { saveDateIntoDataBase } from "../../../../general/data.js";
import { updateDataIntoDataBase } from "../../../../general/data.js";
import { deletDataInDataBase } from "../../../../general/data.js";
import { incrementNotificationLength } from "../../../general/data.js";
const orderItemsContainer = document.querySelector("#order__dataContainer");
import { sendAnewNotification } from "../../../../general/helper.js";

const totalPrice = document.getElementById("totalPrice");
const orderDetails = document.querySelector(".order__invoice--header");
const orderITemWrapper = document.querySelector(".invoice__container");
const order__popup = document.querySelector(".order__popup--container");
const closeOrderStatusForm = document.querySelector(
  ".close__order--status-form"
);

const statusSelectInput = document.querySelector("#status");
const save__statusBtn = document.querySelector(".save__status");

const success__messagWrapper = document.querySelector(
  ".success__message--container"
);
const warning__popup = document.querySelector("#warning__popup");
const rejectPopup = document.querySelector("#rejectPopup");
const rejectedMessage = document.querySelector("#rejectedMessage");
const orderId = location.search.split("=")[1];


async function fetchAllOrders() {
  if (orderId === "undefined") {
    orderITemWrapper.innerHTML =
      '<h1 class="primary-heading">No item found</h1>';
    return;
  } else {
    const dataResult = await fetchDataFromDataBase("orders", "id", orderId);

    if (dataResult.length !== 0) {
      console.log("this is the orders fetched from the database", dataResult);
      localStorage.setItem('client_id', dataResult[0].customer_id);
      console.log(dataResult[0].id);
      displayOrderItemInfo(dataResult);
    }
  }
}
fetchAllOrders();
const activeId = localStorage.getItem("client_id");
const id = Number(activeId);

//fetch all the order items from the database
async function fetchAllOrdersItems() {
  
    const dataResult = await fetchDataFromDataBase(
      "order_items",
      "order_id",
      orderId
    );
   renderOrderItems(dataResult);

   return dataResult[0].user_id;
}
const customerID = await fetchAllOrdersItems();

//render the order items details
async function renderOrderItems(data) {
  data.forEach(item => {
    orderItemsContainer.innerHTML += ` <tr>
                              <td>${item.product_name}</td>
                              <td>${item.quantity}</td>
                              <td>${item.price}F</td>
                            </tr>
                      `;
  });
  displayTotalAmount(data);
}

//display the total amount here
async function displayTotalAmount(data) {
  const order = await fetchDataFromDataBase('orders', 'id', orderId);
  const transport = order[0].transport_price
  const discount = order[0].discount;
  
   
  const amount = data.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalAmount = transport + amount - (discount);
  totalPrice.innerHTML = `
   <li class="price__list">
                        <span>Discount:</span>
                     <span class="totalItemPrice">-${formatAmout(discount)}</span>
                       </li>
                        
<li class="price__list">
  <span>Delivery Cost:</span>
<span class="totalItemPrice">${formatAmout(transport)}</span>
                       </li>
                       <li class="price__list">
                         <span>Total Price:</span>
<span class="totalItemPrice">${formatAmout(totalAmount)}</span>
                       </li>
                   `
                      
}

//display orders header details

function displayOrderItemInfo(data) {
  const date = data[0].created_at.split("T")[0];
  console.log(date);
  orderDetails.innerHTML = `  <p class="order__item--name">
                        <span class="order_key">Order Number:</span>
                        <span class="order__value">${data[0]
                          .order_number}</span>
                      </p>
                      <p class="order__item--name">
                        <span class="order_key">Order date:</span>
                        <span class="order__value">${date}</span>
                      </p>
                      <p class="order__item--name">
                        <span class="order_key">Location:</span>
                        <span class="order__value">${data[0].location}</span>
                      </p>
                    
                     
                      <p class="order__item--name">
                        <span class="order_key">Order Status:</span>
                        <span class="${checkOrderStatus(
                          data[0].status
                        )}">${data[0].status}</span>
                      </p>
                      <div class="order__buttons">
                      <button  id="approve" class="approve">Change status</button>
                      <button class="cancel-order">Reject</button>
                    </div>
                    `;
  const actionButtonEl = document.querySelector(".order__buttons");
  getActionButtonEl(actionButtonEl);
}

//add  event to show the change status form or reject page.
function getActionButtonEl(actionButtonEl) {
  actionButtonEl.addEventListener("click", async function(e) {
    //get the text content for the button to perform the action to it.
    const actionButton = e.target.textContent;
    if (actionButton === "Change status") {
      order__popup.classList.remove("hideChangeOrderPopup");
    } else if (actionButton === "Reject") {
      warning__popup.classList.remove("hideAction-popup");
    }
  });
}

//add event to get the reject value
rejectPopup.addEventListener("click", function(e) {
  const rejectActionBtn = e.target.textContent;
  if (rejectActionBtn === "Close") {
    warning__popup.classList.add("hideAction-popup");
  } else if (rejectActionBtn === "Yes") {
    const saveData = {
      status: "Rejected"
    };
    saveRejectedStatus(saveData);
  }
});

//save reject status in the database
async function saveRejectedStatus(saveData) {
  const data = await updateDataIntoDataBase(saveData, "orders", "id", orderId);

  if (data.length !== 0) {
    rejectedMessage.innerHTML = `<p class="sucess-text">Order status was successfully Rejecetd`;
    // setTimeout(() => {
    //   warning__popup.classList.add("hideAction-popup");
    //   location.reload();
    // }, 3000);
    createRejecetNotifications();
  } else {
    console.log("there is no data here bro");
  }
}
//save reject notifications when admin reject the order,
async function createRejecetNotifications() {
  const data = await fetchAllDataFromDataBase("notifications_settings");
  const saveData = {
    customer_ID: id,
    description: data[0].reject_message,
    action: "Order Rejected"
  };
  await saveDateIntoDataBase(saveData, "notifications");
  await incrementNotificationLength(customerID);
}
//save order processing notifications when admin change  the order status,
async function createOrderProcessNotifications() {
  const data = await fetchAllDataFromDataBase("notifications_settings");
  
  const saveData = {
    customer_ID: id,
    description: data[0].processing_message,
    action: "Order processing"
  };
 const dataResult = await saveDateIntoDataBase(saveData, "notifications");
 await incrementNotificationLength(customerID);
 if(dataResult !==0){
  const phone = await fetchDataFromDataBase('users', 'id', id);
 
await sendAnewNotification(saveData.description, phone[0].phone);
 }
 
}
//save order delivery notifications when admin change  the order status,
async function createOrderCompleteNotifications() {
  const data = await fetchAllDataFromDataBase("notifications_settings");
  const saveData = {
    customer_ID: id,
    description: data[0].completed_message,
    action: "Order on the way"
  };
  await saveDateIntoDataBase(saveData, "notifications");
  await incrementNotificationLength(customerID);
}

//save order delivery notifications when admin change  the order status,
async function createOrderDeliveryNotifications() {
  const data = await fetchAllDataFromDataBase("notifications_settings");
  const saveData = {
    customer_ID: id,
    description: data[0].delivery_message,
    action: "Order on the way"
  };
  await saveDateIntoDataBase(saveData, "notifications");
  await incrementNotificationLength(customerID);
  if(data.length!==0){
    const phone = await fetchDataFromDataBase('users', 'id', id);
  
await sendAnewNotification(saveData.description, phone[0].phone);
  }
}
//close the order status popup
closeOrderStatusForm.addEventListener("click", () => {
  setTimeout(() => {
    order__popup.classList.add("hideChangeOrderPopup");
    location.reload();
  }, 1000);
});

//save the order status in the database
async function changeOrderStatus(saveData) {
  const data = await updateDataIntoDataBase(saveData, "orders", "id", orderId);
  if (data.length !== 0) {
    checkOrderStatusToSave(data[0].status);
    success__messagWrapper.innerHTML = `<p class="sucess-text">Order status was successfully change to
            <span class="order-state">${data[0].status}</span> </p>`;
    setTimeout(() => {
      order__popup.classList.add("hideChangeOrderPopup");
      location.reload();
    }, 3000);
  } else {
    console.log("there is no data here bro");
  }
}
//check other status
function checkOrderStatus(status) {
  if (status === "Processing") {
    return "state processing";
  } else if (status === "Delivery") {
    return "state deliver";
  } else {
    return "state";
  }
}

save__statusBtn.addEventListener("click", async function(e) {
  const saveData = {
    status: statusSelectInput.value
  };
  changeOrderStatus(saveData);
});

//check order status
function checkOrderStatusToSave(status) {
  if (status === "Processing") {
    createOrderProcessNotifications();
  } else if (status === "Delivery") {
    createOrderDeliveryNotifications();
  } else {
    createOrderCompleteNotifications();
  }
}






























