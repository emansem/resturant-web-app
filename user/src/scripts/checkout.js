import { fetchDataFromDataBase } from "../../../../general/data.js";
import { formatAmout } from "../../../../general/data.js";
import { saveDateIntoDataBase } from "../../../../general/data.js";
import { incrementCart } from "../../../../general/data.js";
import { deletDataInDataBase } from "../../../../general/data.js";
import { decrementCart } from "../../../../general/data.js";
const delivery = document.getElementById("delivery");
const totalAmount = document.querySelector(".totalAmount");
const location = document.getElementById("location");
const checkout__btn = document.querySelector(".checkout__btn");
const successContainer = document.querySelector(".success-container");
const checkout__main = document.querySelector(".checkout__main");
const emptyCartPage = document.querySelector(".empty-cart");
const checkout_successBtn = document.getElementById("checkout_successBtn");
const checkout__noResult = document.querySelector("#checkout__no-result");
const activeId = localStorage.getItem("activeID");
const customer_Id = Number(activeId);

//check if there is no item in the cart, and show no message.
async function checkIfCartIsEmpty() {
  const dataResult = await fetchDataFromDataBase(
    "cart",
    "customer_Id",
    customer_Id
  );
  if (dataResult.length === 0) {
    checkout__main.classList.add("hideCheckout");
    emptyCartPage.classList.remove("hide-noresult");
  }
}
checkIfCartIsEmpty();
//increment the  quantity value and price value;

async function newOrderQauntityAndPrice() {
  totalAmount.innerHTML = "loading...";
  const dataResult = await fetchDataFromDataBase(
    "cart",
    "customer_Id",
    customer_Id
  );
  let sum = 0;
  let totalQty = 0;
  dataResult.forEach(item => {
    sum += item.product_price;
    totalAmount.innerHTML = `${formatAmout(sum)}`;
    totalQty += item.product_quantity;
    localStorage.setItem("totalAmount", sum);
    localStorage.setItem("totalQty", totalQty);
  });
  createANewOrder();
}
//generate a unique order numbe

function generateOrderNUmber() {
  let orderNumber = "#JK";

  for (let i = 0; i < 5; i++) {
    const randaomNumbers = Math.floor(Math.random() * 10);
    orderNumber += randaomNumbers;
  }
  return orderNumber;
}

// newOrderQauntityAndPrice();
// create a new order function, when the user click the checkout button, create an order.
async function createANewOrder() {
  const userData = await fetchDataFromDataBase("users", "id", customer_Id);
  const totalQty = localStorage.getItem("totalQty");
  const totalAmount = localStorage.getItem("totalAmount");
  console.log("this is the total amount and qty", totalAmount, totalQty);
  const newOrderData = {
    customer_name: userData[0].name,
    customer__phone: userData[0].phone,
    customer_id: customer_Id,
    amount: Number(totalAmount),
    quantity: Number(totalQty),
    status: "Pending",
    location: location.value,
    delvery_type: delivery.value,
    order_number: generateOrderNUmber()
  };
  if (newOrderData.location === "") {
    location.setAttribute("required", true);
    return;
  }else{
    saveOrderDetails(newOrderData);
  }

 
  
}

checkout__btn.addEventListener("click", async function(e) {
  checkout__btn.innerHTML = "Please wait...";
  checkout__btn.disabled = true;
  await newOrderQauntityAndPrice();
});

//save new order details in the database

async function saveOrderDetails(saveInfo) {
  const dataResult = await saveDateIntoDataBase(saveInfo, "orders");
  if (dataResult.length !== 0) {
    getAllOrdersItems(dataResult[0].id)
    checkout__btn.innerHTML = "Place an order";
    successContainer.classList.remove("hidePopup");
     
  setTimeout(async function(){
    await deletDataInDataBase("cart", "customer_Id", customer_Id);
  }, 5000);
  }
}
checkout_successBtn.addEventListener("click", function(e) {
  successContainer.classList.add("hidePopup");
  setTimeout(() => {
    window.location.reload();
  }, 1500);
});

//new order function to  save the orders in the database;

async function getAllOrdersItems(order_id){
  const dataResult = await fetchDataFromDataBase('cart', 'customer_Id', customer_Id);
  dataResult.forEach(item=>{
    const orderData = {
      quantity : item.product_quantity,
      product_image : item.product_image,
      product_name : item.product_name,
       price : item.product_price,
      user_id: item.customer_Id,
      order_id : order_id,
    }
    saveOrderItemsDetails(orderData);
  })

}


//save cart items in the order items table for reference to get it back letter.

async function saveOrderItemsDetails(saveData){
  const data = await saveDateIntoDataBase(saveData, 'order_items');
  console.log('this is the save order datails here', data);
}
































