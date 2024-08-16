import { fetchDataFromDataBase } from "../../../../general/data.js";
import { formatAmout } from "../../../../general/data.js";
import { saveDateIntoDataBase } from "../../../../general/data.js";
import { updateDataIntoDataBase } from "../../../../general/data.js";
import { deletDataInDataBase } from "../../../../general/data.js";
const orderItemsContainer = document.querySelector("#order__dataContainer");

const totalPrice = document.getElementById("totalPrice");
const orderDetails = document.querySelector(".order__invoice--header");
const orderITemWrapper = document.querySelector(".invoice__container");
const order__popup = document.querySelector('.order__popup--container');
const closeOrderStatusForm = document.querySelector('.close__order--status-form');
const statusSelectInput = document.querySelector('#status');
const save__statusBtn = document.querySelector('.save__status');
const success__messagWrapper = document.querySelector('.success__message--container');
const warning__popup = document.querySelector('#warning__popup');
const rejectPopup = document.querySelector('#rejectPopup');
const rejectedMessage = document.querySelector('#rejectedMessage');
const orderId = location.search.split("=")[1];


async function fetchAllOrders() {
  if (orderId === "undefined") {
    orderITemWrapper.innerHTML =
      '<h1 class="primary-heading">No item found</h1>';
      return
  } else {
    const dataResult = await fetchDataFromDataBase("orders", "id", orderId);

    if (dataResult.length !== 0) {
      console.log("this is the orders fetched from the database", dataResult);

      console.log(dataResult[0].id);
      displayOrderItemInfo(dataResult);
    }
  }
}
fetchAllOrders();

//fetch all the order items from the database
async function fetchAllOrdersItems() {
    if (orderId === "undefined") {
        orderITemWrapper.innerHTML =
          '<h1 class="primary-heading">No item found</h1>';
          return
      }
 
   else {
    const dataResult = await fetchDataFromDataBase(
        "order_items",
        "order_id",
        orderId
      );
    renderOrderItems(dataResult);
  }
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
                        <span class="order_key">Delivery Type:</span>
                        <span class="order__value">${data[0].delvery_type}</span>
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
                    const actionButtonEl = document.querySelector('.order__buttons');
                    getActionButtonEl(actionButtonEl);
}

//add  event to show the change status form or reject page.
function getActionButtonEl(actionButtonEl){
actionButtonEl.addEventListener('click', async function(e){
    //get the text content for the button to perform the action to it.
    const actionButton =  e.target.textContent;
    if(actionButton === 'Change status'){
      order__popup.classList.remove('hideChangeOrderPopup');
    }else if(actionButton === 'Reject'){
        warning__popup.classList.remove('hideAction-popup');
    }
})
}

//add event to get the reject value
rejectPopup.addEventListener('click', function(e){
    const rejectActionBtn =  e.target.textContent;
    if(rejectActionBtn === 'Close'){
        warning__popup.classList.add('hideAction-popup');
    }else if(rejectActionBtn === 'Yes'){
        const saveData = {
            status : 'Rejected'
        }
        saveRejectedStatus(saveData);
    }
})

//save reject status in the database 
async function saveRejectedStatus(saveData){
    const data = await updateDataIntoDataBase(saveData, 'orders', 'id', orderId);
    if(data.length !==0){
      rejectedMessage.innerHTML =`<p class="sucess-text">Order status was successfully Rejecetd`
                setTimeout(()=>{
                    warning__popup.classList.add('hideAction-popup');
                    location.reload()
                }, 3000)
    }else{
        console.log('there is no data here bro');
    }
    }

//close the order status popup
closeOrderStatusForm.addEventListener('click', ()=>{
    setTimeout(()=>{
        order__popup.classList.add('hideChangeOrderPopup');
        location.reload()
    }, 1000)
})

//save the order status in the database
async function changeOrderStatus(saveData){
const data = await updateDataIntoDataBase(saveData, 'orders', 'id', orderId);
if(data.length !==0){
   success__messagWrapper.innerHTML =`<p class="sucess-text">Order status was successfully change to
            <span class="order-state">${data[0].status}</span> </p>`
            setTimeout(()=>{
                order__popup.classList.add('hideChangeOrderPopup');
                location.reload()
            }, 3000)
}else{
    console.log('there is no data here bro');
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

save__statusBtn.addEventListener('click', async function(e){
  
    const saveData = {
        status : statusSelectInput.value
    }
   changeOrderStatus(saveData);
})























