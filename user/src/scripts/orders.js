import { fetchDataFromDataBase } from "../../../../general/data.js";
import { formatAmout } from "../../../../general/data.js";
import { saveDateIntoDataBase } from "../../../../general/data.js";
import { incrementCart } from "../../../../general/data.js";
import { deletDataInDataBase } from "../../../../general/data.js";
import { decrementCart } from "../../../../general/data.js";
const orders__wrapper = document.querySelector(".orders__wrapper");
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
  orders.forEach(order => {
    const time = order.created_at.split("T")[0];

    orders__wrapper.innerHTML += ` <div class="order__items">
       
          <div class="order__header">
            <P >
              <span>Order Number:</span>
              <span>${order.order_number}</span>
            </P>
            <P>
              <span>Order date:</span>
              <span>${order.time}</span>
            </P>
          </div>
          <div class="order__content">
            <div class="order__item--body">
              <P>
                <span>Quantity:</span>
                <span >
                ${order.quantity}</span>
              </P>
              <P>
                <span>Price:</span>
                <span >${formatAmout(order.amount)}</span>
              </P>
                <span class="status_text">Order Status:</span>
                <span class="${changeOrderStatusClassName(order.status)}">${order.status}</span>
              </P>
            </div>
            <div class="order__item--footer">
              <div class="order__buttons">
                <a href = '/user/pages/order-invoice.html?id=${order.id}' class="see-details">See more</a>
                <button class="cancel-order">Cancel Order</button>
              </div>
            </div>
          </div>
       
       </div>`;
  });
}

function changeOrderStatusClassName(status){
 if(status === 'Processing'){
    return 'state processing'
 }
 else if(status === 'Delivery'){
    return 'state deliver';
 }else{
    return 'state';
 }
}















