//selectors to render contents on the web page

const cartContainer = document.querySelector(".cart-body");
const activeId = localStorage.getItem("activeID");
const orderCount = document.querySelector(".order-count");
const totalContainer = document.querySelector(".price-section");
const placeOrderBtn = document.getElementById("add__cart");
const emptyCartPage = document.querySelector(".empty-cart");
const mainCartContainer = document.querySelector(".main-cart__wrapper");
const couponInput = document.querySelector(".coupon_code");
const customer_Id = Number(activeId);
const discountAmount =  await fetchDataFromDataBase('users', 'id', customer_Id);

// import all the functions from data js
import {
  fetchAllDataFromDataBase,
  fetchDataFromDataBase
} from "../../../../general/data.js";
import { formatAmout } from "../../../../general/data.js";
import { saveDateIntoDataBase } from "../../../../general/data.js";
import { incrementCart } from "../../../../general/data.js";
import { deletDataInDataBase } from "../../../../general/data.js";
import { decrementCart } from "../../../../general/data.js";
import { updateDataIntoDataBase } from "../../../../general/data.js";

//render the cart items on the web page
async function renderCartDetails() {
  const data = await fetchDataFromDataBase("cart", "customer_Id", customer_Id);
  console.log(data);
  data.forEach(cartItem => {
    cartContainer.innerHTML += `<div id=${cartItem.id} class="cart__item">
									<div class="cart__item1">
										<div class="cart__imag">
											<img src="${cartItem.product_image}" alt="">
										</div>
										<div class="cart__name-price">
											<div class="cart__item--name">
												${cartItem.product_name}
											</div>
											<div class="cart__item--price">
												Price:<span class="cart__item-price">${formatAmout(
                          cartItem.product_price
                        )}</span>
											</div>
										</div>
									</div>
	
									<div class="cart__item2">
										<div class="total__quantity">
											<span class="reduce__qty">-</span>
											<span dataId=${cartItem.product_quantity} class="quanty__amount">${cartItem.product_quantity}</span>
											<span class="add_quanty">+</span>
										</div>
										<span class="delete-btn">
											<i class="fas fa-times"></i>
										</span>
									</div>
								</div>`;

    const cart__item = document.querySelectorAll(".cart__item");
    getCartItemId(cart__item, data);
  });
  priceSection(data);
}
renderCartDetails();

// Function to attach event listeners to each cart item for handling clicks
function getCartItemId(cart__item, data) {
  cart__item.forEach(cartItem => {
    cartItem.addEventListener("click", function(e) {
      const cartItemId = this.getAttribute("id"); // Get the ID of the clicked cart item
      const actionBtn = e.target.textContent; // Get the action button text (+, -)
      const deleteBtbn = e.target.className;
      const cartItemQty = this.querySelector(".quanty__amount").textContent;
      const cartItemQtyEl = this.querySelector(".quanty__amount");
      performActions(
        cartItemId,
        deleteBtbn,
        actionBtn,
        cartItemQty,
        cartItemQtyEl,
        cartItem,
        data
      );
    });
  });
}

// Function to handle various actions on the cart (increase, decrease, delete)
async function performActions(
  id,
  deleteBtbn,
  actionBtn,
  cartItemQty,
  cartItemQtyEl,
  cartItem,
  data
) {
  let cartQty = Number(cartItemQty); // Convert quantity to a number
  const strSubTotalEl = document.querySelector(".cart_subTotal"); // Get the subtotal element
  const strSubTotal = document.querySelector(".cart_subTotal").textContent;
  const matchSubTotal = strSubTotal.replace(/\D/g, ""); // Extract numbers from the subtotal string
  let subTotal = parseInt(matchSubTotal);

  const carItemPriceStr = cartItem.querySelector(".cart__item-price")
    .textContent;
  const matchCartItemPrice = carItemPriceStr.replace(/\D/g, ""); // Extract numbers from the price string
  const cartItemPrice = parseInt(matchCartItemPrice);

  // Handle the quantity increase or decrease
  await decreaseCartQuantity(
    actionBtn,
    cartItemQtyEl,
    cartQty,
    cartItemPrice,
    id,
    strSubTotalEl,
    subTotal,
    cartItem
  );

  await increaseCartQuantity(
    actionBtn,
    cartItemQtyEl,
    cartQty,
    cartItemPrice,
    id,
    strSubTotalEl,
    subTotal
  );
  //Handle item deletion if the delete button was clicked
  await deleteCartItem(
    deleteBtbn,
    cartItem,
    cartItemPrice,
    id,
    strSubTotalEl,
    subTotal,
    data
  );
}

// Function to increase the quantity of a cart item
async function increaseCartQuantity(
  actionBtn,
  cartItemQtyEl,
  cartQty,
  cartItemPrice,
  id,
  strSubTotalEl,
  subTotal
) {
  if (actionBtn === "+") {
    cartItemQtyEl.innerHTML = cartQty + 1; // Increase the      quantity displayed

    increaseSubBalanceUi(strSubTotalEl, subTotal, cartItemPrice, cartQty + 1); // Update the UI subtotal
    await incrementCart(id);
  }
}

// Function to decrease the quantity of a cart item
async function decreaseCartQuantity(
  actionBtn,
  cartItemQtyEl,
  cartQty,
  cartItemPrice,
  id,
  strSubTotalEl,
  subTotal,
  cartItem
) {
  if (actionBtn === "-") {
    if (cartQty === 0) {
      cartItem.style.display = "none"; // Hide the item if the quantity is zero
      await deletDataInDataBase("cart", "id", id); // Remove the item from the database
      return;
    } else {
      cartItemQtyEl.innerHTML = cartQty - 1; // Decrease the quantity displayed
      await decrementCart(id); // Update the quantity in the database
      updateTotalBalanceUi(strSubTotalEl, subTotal, cartItemPrice);
      decreaseSubBalanceUi(strSubTotalEl, subTotal, cartItemPrice, cartQty);
    }
  }
}

// Function to delete a cart item
async function deleteCartItem(
  deleteBtbn,
  cartItem,
  cartItemPrice,
  id,
  strSubTotalEl,
  subTotal,
  data
) {
  if (deleteBtbn === "fas fa-times") {
    cartItem.style.display = "none";

    decreaseSubBalanceUi(strSubTotalEl, subTotal, cartItemPrice);
    await deletDataInDataBase("cart", "id", id);

    setTimeout(function() {
      location.reload();
    }, 1500);
  }
}

// Function to update the subtotal in the UI
function increaseSubBalanceUi(strSubTotalEl, subTotal, cartItemPrice) {
  strSubTotalEl.innerHTML = "";
  strSubTotalEl.innerHTML = `${formatAmout((subTotal += cartItemPrice))}`;
  updateTotalBalanceUi(subTotal);
}

// Function to update the subtotal in the UI
function decreaseSubBalanceUi(strSubTotalEl, subTotal, cartItemPrice) {
  strSubTotalEl.innerHTML = `${formatAmout((subTotal -= cartItemPrice))}`;
  updateTotalBalanceUi(subTotal);
}

// Function to update the total balance in the UI
function updateTotalBalanceUi(subTotal) {
  document.querySelector(".totalAmount").innerHTML = `${formatAmout(subTotal)}`;
}

// all the slectors to use
//render the total quantity price
function priceSection(data) {
  const totalPrice = data.reduce(
    (sum, item) => sum + item.product_price * item.product_quantity,
    0
  );
  const totalSubtotal = totalPrice 

  totalContainer.innerHTML = `
 
  <li  class="price__section--item">
										<span class="price-section-text">Sub Total:</span>
										<span class="cart__amount cart_subTotal">${formatAmout(
                      totalSubtotal
                    )}</span>
									</li>
									
									<li class="price__section--item">
										<span class="price-section-text"> Total Amount:</span>
										<span class="cart__amount totalAmount">${formatAmout(
                      totalSubtotal
                    )}</span>
									</li>`;
  // const sub_total = localStorage.getItem('saveData')|| SubTotal;
  // console.log(, 'this is localStorage')
}

placeOrderBtn.addEventListener("click", function(e) {
  location.href = "/user/pages/checkout.html";
});


















