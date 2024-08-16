import { fetchDataFromDataBase } from "../../../../general/data.js";
import { formatAmout } from "../../../../general/data.js";
import { saveDateIntoDataBase } from "../../../../general/data.js";

import { deletDataInDataBase } from "../../../../general/data.js";
const orderItemsContainer = document.querySelector("#order__dataContainer");

const totalPrice = document.getElementById("totalPrice");
const orderDetails = document.querySelector(".order__invoice--header");
const activeId = localStorage.getItem("activeID");
const customer_Id = Number(activeId);
const orderId = location.search.split('=')[1];

//fetch all the orders from database
async function fetchAllOrders() {
  const dataResult = await fetchDataFromDataBase(
    "orders",
    "customer_id",
    customer_Id
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
fetchAllOrdersItems()
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
function displayTotalAmount(data) {
  const amount = data.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  totalPrice.innerHTML = `
<span>Total Price:</span>
<span class="totalItemPrice">${formatAmout(amount)}</span>
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
                      <span class="${checkOrderStatus(data[0].status)}">${data[0].status}</span>
                    </p>
                    <button class="cancel-order">Reject</button>`;
}
//check other status

function checkOrderStatus(status){
    if(status === 'Processing'){
        return 'state processing'
    }
    else if( status === 'Delivery'){
        return 'state deliver';
    }else{
        return 'state';
    }
}

