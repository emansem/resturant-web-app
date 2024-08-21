import { fetchDataFromDataBase } from "../../../../general/data.js";
import { formatAmout } from "../../../../general/data.js";
import { saveDateIntoDataBase } from "../../../../general/data.js";

import { deletDataInDataBase } from "../../../../general/data.js";
const orderItemsContainer = document.querySelector("#order__dataContainer");
const close__feedbackPopup = document.querySelector(".close__feedback-popup");
const completed_message = document.querySelector(
  ".show__order--comple-message"
);
const open__feebackForm = document.querySelector(".open__feeback-form");
const feedback__form = document.querySelector(".feedback__form");
const feedback__popup = document.querySelector(".feedback__popup");
const feedback__buttons = document.querySelector("#feedback__buttons");
const totalPrice = document.getElementById("totalPrice");
const orderDetails = document.querySelector(".order__invoice--header");
const activeId = localStorage.getItem("activeID");
const customer_Id = Number(activeId);
const orderidString = location.search.split("=")[1];
const orderId = Number(orderidString);

//fetch all the orders from database
async function fetchAllOrders() {
  const dataResult = await fetchDataFromDataBase(
    "orders",
    "id",
    orderId
  );
  if (dataResult.length !== 0) {
    console.log("this is the orders fetched from the database", dataResult);

    console.log(dataResult[0].id);
    displayOrderItemInfo(dataResult);
  }
}

fetchAllOrders();

//fetch all the order items from the database
async function fetchAllOrdersItems() {
  const dataResult = await fetchDataFromDataBase(
    "order_items",
    "order_id",
    orderId
  );
  console.log("this is the orders items", dataResult);
  renderOrderItems(dataResult);
}
fetchAllOrdersItems();
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
  const order = await fetchDataFromDataBase("orders", "id", orderId);
  const transport = order[0].transport_price;
  const discount = order[0].discount;
  const amount = data.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalAmount = transport + amount - discount;
  totalPrice.innerHTML = `
 <li class="price__list">
                        <span>Discount:</span>
                     <span class="totalItemPrice">-${formatAmout(
                       discount
                     )}</span>
                       </li>
                        
<li class="price__list">
  <span>Delivery Cost:</span>
<span class="totalItemPrice">${formatAmout(transport)}</span>
                       </li>
                       <li class="price__list">
                         <span>Total Price:</span>
<span class="totalItemPrice">${formatAmout(totalAmount)}</span>
                       </li>

                    `;
}

//display orders header details

function displayOrderItemInfo(data) {
  orderDetails.innerHTML = `  <p class="order__item--name">
                      <span class="order_key">Order Number:</span>
                      <span class="order__value">${data[0].order_number}</span>
                    </p>
                   
                    <p class="order__item--name">
                      <span class="order_key">Order Status:</span>
                      <span class="${checkOrderStatus(
                        data[0].status
                      )}">${data[0].status}</span>
                    </p>
                   `;
}
//check other status

function checkOrderStatus(status) {
  if (status === "Processing") {
    return "state processing";
  } else if (status === "Delivery") {
    return "state deliver";
  } else if (status === "Completed") {
    return "state complete";
  } else {
    return "state";
  }
}
//function check if the user have already given a feedback or the order is completed
async function getFeebacksAndOrder() {
  const feedbacks = await fetchDataFromDataBase(
    "feedbacks",
    "order_id",
    orderId
  );
  
  const order = await fetchDataFromDataBase("orders", "id", orderId);
  console.log(order)
  if (feedbacks.length <=0 && order[0].status === "Completed") {
    completed_message.classList.remove("hide__complete_status");
    return
  }
}
getFeebacksAndOrder();

//add event listener to open the feedback form.
open__feebackForm.addEventListener("click", function(e) {
  feedback__popup.classList.remove("hide__feedbackForm");
});
//close the feedback form
close__feedbackPopup.addEventListener("click", function(e) {
  e.preventDefault();
  feedback__popup.classList.add("hide__feedbackForm");
});

//add event to the form to sumbit the feedback
feedback__form.addEventListener("submit", async function(e) {
  e.preventDefault();
  feedback__buttons.innerHTML = `<p class="primary-text">Submitting your feedback....</p>`;
  const saveData = {
    order_id: orderId,
    customer_id: activeId,
    message: feedback__form.feedback.value
  };
  const data = await saveDateIntoDataBase(saveData, "feedbacks");
  if (data.length !== 0) {
    feedback__buttons.innerHTML = ` <p class="primary-text success__message">Thanks a lot! We’ve got your feedback and truly appreciate your contribution.</p>`;
    setTimeout(() => {
      location.reload();
    }, 2000);
  }

  console.log(saveData);
});
