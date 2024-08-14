import { fetchDataFromDataBase } from "../../../../general/data.js";
import { formatAmout } from "../../../../general/data.js";
const orders__wrapper = document.querySelector(".order__table--container");
const noResultContainer = document.querySelector(".empty-cart");
const activeId = localStorage.getItem("activeID");
const customer_Id = Number(activeId);

//fetch the order data and render them to the web page
async function getAllOrders() {
  const dataResult = await fetchDataFromDataBase(
    "orders",
    "customer_id",
    customer_Id
  );
  if (dataResult.length !== 0) {
    console.log(dataResult);
    renderOrders(dataResult);
  }
}
getAllOrders();

//render the all orders to the web page.

function renderOrders(orders) {
  orders.forEach((order, index) => {
    const time = order.created_at.split("T")[0];

    orders__wrapper.innerHTML += ` 
      <div class="order__data--item">
                <!-- Order details header -->
                <div class="order__data--header">
                  <li class="data__items">
                    <span class="data__text">Order Number:</span>
                    <span class="data__value">${order.order_number}</span>
                  </li>
                  <li class="data__items">
                    <span class="data__text">Order date:</span>
                    <span class="data__value">${time}</span>
                  </li>
                </div>
                <!-- Order details body -->
                <div class="order__data--body">
                  <div>
                    <li class="data__items">
                      <span class="data__text">Quantity:</span>
                      <span class="data__value">${order.quantity}</span>
                    </li>
                    <li class="data__items">
                      <span class="data__text">Price:</span>
                      <span class="data__value">${formatAmout(order.amount)}</span>
                    </li>
                    <li class="data__items">
                      <span class="data__text">Order status:</span>
                      <span class="${changeOrderStatusClassName(
                        order.status
                      )}">${order.status}</span>
                    </li>
                    <!-- Button to view order details -->
                    <div class="view-more">
                      <button class="primary-button view__order-details">
                      <a href="/user/pages/order-invoice.html?id=${order.id}">View details</a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
    
              `;
  });





}

function changeOrderStatusClassName(status) {
  if (status === "Processing") {
    return "state processing";
  } else if (status === "Delivery") {
    return "state deliver";
  } else {
    return "state";
  }
}
