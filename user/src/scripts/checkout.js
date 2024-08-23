import {
  fetchDataFromDataBase,
  fetchAllDataFromDataBase
} from "../../../../general/data.js";
import { formatAmout } from "../../../../general/data.js";
import { saveDateIntoDataBase } from "../../../../general/data.js";
import { incrementCart } from "../../../../general/data.js";
import { deletDataInDataBase } from "../../../../general/data.js";
import { decrementCart } from "../../../../general/data.js";
import { incrementNumberOfOrders } from "../../../../general/data.js";
import { incrementNumberoftimes } from "../../../general/data.js";
import { updateDataIntoDataBase } from "../../../general/data.js";
const deliveryLocation = document.getElementById("delivery");
const totalAmount = document.querySelector(".totalAmount");
const discount_amount = document.querySelector(".discount_amount");
const location = document.getElementById("location");
const checkout__btn = document.querySelector("#checkout__form");
const successContainer = document.querySelector(".success-container");
const checkout__main = document.querySelector(".checkout__main");
const emptyCartPage = document.querySelector(".empty-cart");
const checkout_successBtn = document.getElementById("checkout_successBtn");
const checkout__noResult = document.querySelector("#checkout__no-result");
const activeId = localStorage.getItem("activeID");
const couponInput = document.querySelector(".coupon_code");
const transport__alert = document.querySelector(".transport__alert");
const coupon__message = document.querySelector(".coupon__message");
const checkout__button = document.querySelector(".checkout__button");
const customer_Id = Number(activeId);
//fetch the total dsicout aamount
async function getTotalDiscountAmount() {
  const data1 = await await fetchDataFromDataBase("users", "id", customer_Id);
  let discountAmount = data1[0].discount;
  discount_amount.value = formatAmout(discountAmount);
  return discountAmount;
}
//show total amount and discount price
async function getOrdresAndCounponAmount() {
  const data = await fetchDataFromDataBase("cart", "customer_Id", customer_Id);
  const discountAmount = await getTotalDiscountAmount();
  const transport = parseInt(localStorage.getItem("transport")) || 0;
  data.forEach(item => {
    const total = item.product_price * item.product_quantity;
    totalAmount.value = formatAmout(total - discountAmount + transport);
    localStorage.setItem("totalAmount", total - discountAmount);
  });
}
getOrdresAndCounponAmount();

//check if there is no item in the cart, and show no message.
async function checkIfCartIsEmpty() {
  const dataResult = await fetchDataFromDataBase(
    "cart",
    "customer_Id",
    customer_Id
  );
  console.log(dataResult);
  if (dataResult.length === 0) {
    checkout__main.classList.add("hideCheckout");
    emptyCartPage.classList.remove("hide-noresult");
  } else {
    dataResult.forEach(item => {
      const price = item.product_price * item.product_quantity;
      localStorage.setItem("amount", price);
    });
  }
}
checkIfCartIsEmpty();

//generate a unique order number

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
  const discountAmount = await getTotalDiscountAmount();
  const price = parseInt(localStorage.getItem("transport"));
  const quarter = localStorage.getItem("quarter");
  const newOrderData = {
    customer_name: userData[0].name,
    customer__phone: userData[0].phone,
    customer_id: customer_Id,
    status: "Pending",
    order_number: generateOrderNUmber(),
    discount: discountAmount,
    location: quarter,
    transport_price: price,
    amount: parseInt(localStorage.getItem("amount"))
  };
  if (newOrderData.location === "") {
    return;
  } else {
    saveOrderDetails(newOrderData);
  }
}

checkout__btn.addEventListener("submit", async function(e) {
  e.preventDefault();
  checkout__button.innerHTML = `<br><br><p class="primary-text">Creating order please wait....<br><br></p>`;

  await createANewOrder();
});

//save new order details in the database

async function saveOrderDetails(saveInfo) {
  const dataResult = await saveDateIntoDataBase(saveInfo, "orders");
  const coupon_id = parseInt(localStorage.getItem("coupon_id"));
  if (dataResult.length !== 0) {
    getAllOrdersItems(dataResult[0].id);
    await incrementNumberOfOrders(customer_Id);
    await updateDataIntoDataBase({ discount: 0 }, "users", "id", customer_Id);
    await incrementNumberoftimes(coupon_id);
    localStorage.removeItem("amount");
    localStorage.removeItem('discount');
    localStorage.removeItem('quarterid');
    localStorage.removeItem('quarter');
  }
}
checkout_successBtn.addEventListener("click", function(e) {
  successContainer.classList.add("hidePopup");
  setTimeout(() => {
    window.location.reload();
  }, 1500);
});

//new order function to  save the orders in the database;

async function getAllOrdersItems(order_id) {
  const dataResult = await fetchDataFromDataBase(
    "cart",
    "customer_Id",
    customer_Id
  );
  dataResult.forEach(item => {
    const orderData = {
      quantity: item.product_quantity,
      product_image: item.product_image,
      product_name: item.product_name,
      price: item.product_price,
      user_id: item.customer_Id,
      order_id: order_id
    };
    saveOrderItemsDetails(orderData);
  });
}

//save cart items in the order items table for reference to get it back letter.

async function saveOrderItemsDetails(saveData) {
  const data = await saveDateIntoDataBase(saveData, "order_items");
  getTotalNoticationLength();
  if (data.length !== 0) {
    setTimeout(async function() {
     await deletDataInDataBase(
        "cart",
        "customer_Id",
        data[0].user_id
      );
      localStorage.removeItem("transport");
      localStorage.removeItem("coupon_id");
      checkout__button.innerHTML =` <button class="primary-button checkout__btn">Place Order</button>`
      successContainer.classList.remove("hidePopup");
     
    }, 2000);
  }
}

//create a new a notification length
async function getTotalNoticationLength() {
  const data = await fetchDataFromDataBase(
    "notifications_number",
    "client_id",
    customer_Id
  );
  if (data.length === 0) {
    const saveData = {
      client_id: customer_Id,
      length: 0
    };
    await saveDateIntoDataBase(saveData, "notifications_number");
    return;
  }
}

async function getUserCoupons(coupon_codeValue) {
  const data = await fetchDataFromDataBase("coupons", "customer_id", activeId);
  if (data.length !== 0) {
    console.log("this is the user coupon", data);

    validateCouponCode(data, coupon_codeValue);
  }
}

couponInput.addEventListener("change", async function(e) {
  e.preventDefault();
  const coupon_codeValue = couponInput.value;
  await getUserCoupons(coupon_codeValue);
});

//validate the user coupon code
async function validateCouponCode(data, coupon_codeValue) {
  validateExpireDate(data);

  checkCouponMatch(data, coupon_codeValue);
}

//validate if the coupon has expire or not

function validateExpireDate(data) {
  for (let coupon of data) {
    if (Date.now() >= new Date(coupon.expire_date)) {
      showCouponMessage("Your coupon have expired");

      return true;
    }
  }
  console.log("Your date is still active");
  return false;
}

//check if coupon code match the real one in the database;
async function checkCouponMatch(data, coupon_codeValue) {
  const discountAmount = await getTotalDiscountAmount();
  const couponSettings = await fetchAllDataFromDataBase("coupon_settings");
  const number_of_times = couponSettings[0].numberOfTimes;
  const totalAmount = parseInt(localStorage.getItem("totalAmount"));

  let couponFound = false;

  data.forEach(item => {
    if (item.coupon_code === coupon_codeValue) {
      couponFound = true;
      localStorage.setItem("coupon_id", item.id);

      if (item.numberOfTimes >= number_of_times) {
        showCouponMessage("You have exceeded the limit to use this coupon");
        setTimeout(function() {
          coupon__message.style.display = "none";
        }, 5000);
      } else if (discountAmount > 0) {
        showCouponMessage("Coupon already applied", "success__coupon--message");
      } else {
        calculateDiscountAmount(item.coupon_percentage, totalAmount);
      }
    }
  });

  // If no matching coupon was found, show invalid coupon message
  if (!couponFound) {
    showCouponMessage("Invalid coupon code, try again");
    setTimeout(function() {
      coupon__message.style.display = "none";
    }, 5000);
  }
}

//calculate the discount amount here
function calculateDiscountAmount(couponPercentage, amount) {
  const discount = couponPercentage / 100 * amount;
  const total_amount = amount - discount;
  console.log(`discount: ${discount}, total : ${total_amount}`);
  totalAmount.value = formatAmout(total_amount);
  discount_amount.value = formatAmout(discount);
  updateDataIntoDataBase({ discount: discount }, "users", "id", customer_Id);
  showCouponMessage(
    `You have saved ${discount} with this coupon`,
    "success__coupon--message"
  );
}

//render the transport settings on the web page
async function getAllTransportLocations() {
  const data = await fetchAllDataFromDataBase("transport_settings");
  if (data.length !== 0) {
    data.forEach(item => {
      deliveryLocation.innerHTML += `  <option data-id="${item.id}" value="${item.name}">${item.quarter}</option>`;
    });
  }
}
getAllTransportLocations();

//get the transport location  id and fetch the price and render
async function getQuarterId() {
  deliveryLocation.addEventListener("change", function(e) {
    e.preventDefault();
    const option = this.options[this.selectedIndex];
    const id = option.getAttribute("data-id");
    getQuarterTransportPrice(id);
  });
}
getQuarterId();

//fetch the transport location price and calculate
async function getQuarterTransportPrice(id) {
  const data = await fetchDataFromDataBase("transport_settings", "id", id);
  if (data.length !== 0) {
    localStorage.setItem("transport", data[0].price);
    localStorage.setItem("quarter", data[0].quarter);
    getOrdresAndCounponAmount();
    showTransportAlert();
  }
}

function showTransportAlert() {
  const price = parseInt(localStorage.getItem("transport"));
  const quarter = localStorage.getItem("quarter");
  transport__alert.style.display = "block";
  transport__alert.innerHTML = `Transport to <span>${quarter}</span> is
  <span>${formatAmout(price)}</span>`;
}

//show coupon message when is valid or not
function showCouponMessage(message, className) {
  coupon__message.style.display = "block";
  coupon__message.classList.add(`${className}`);
  coupon__message.innerHTML = `<span>${message}</span>`;
}
