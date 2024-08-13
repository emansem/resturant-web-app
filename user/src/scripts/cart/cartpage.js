//selectors to render contents on the web page

const cartContainer = document.querySelector(".cart-body");
const activeId = localStorage.getItem("activeID");
const orderCount = document.querySelector(".order-count");
const totalContainer = document.querySelector(".price-section");
const placeOrderBtn = document.getElementById("add__cart");
const customer_Id = Number(activeId);

// import all the functions from data js
import { fetchDataFromDataBase } from "../../../../general/data.js";
import { formatAmout } from "../../../../general/data.js";
import { saveDateIntoDataBase } from "../../../../general/data.js";
import { incrementCart } from "../../../../general/data.js";
import { deletDataInDataBase } from "../../../../general/data.js";
import { decrementCart } from "../../../../general/data.js";

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
    getCartItemId(cart__item);
  });
  priceSection(data);
}

//get the item id and update it or delete the item from the database;

function getCartItemId(cart__item) {
  cart__item.forEach(catITem => {
    catITem.addEventListener("click", function(e) {
      const cartItemId = this.getAttribute("id");
      const actionBtn = e.target.textContent;
      const deletBtbn = e.target.className;
      const cartItemQty = this.querySelector(".quanty__amount").textContent;
      const cartItemQtyEl = this.querySelector(".quanty__amount");
      performActions(
        cartItemId,
        deletBtbn,
        actionBtn,
        cartItemQty,
        cartItemQtyEl,
        catITem,
        cart__item
      );
    });
  });
}

//get the buttons and perform the actions in the data base;

async function performActions(
  id,
  deletBtbn,
  actionBtn,
  cartItemQty,
  cartItemQtyEl,
  cartItem,
  cart__item
) {
  let cartQty = Number(cartItemQty);
  const strSubTotalEl = document.querySelector(".cart_subTotal");
  const strSubTotal = document.querySelector(".cart_subTotal").textContent;
  const matchSubTotal = strSubTotal.replace(/\D/g, "");
  let subTotal = parseInt(matchSubTotal);
  const carItemPriceStr = cartItem.querySelector(".cart__item-price")
    .textContent;
  const matchCartItemPrice = carItemPriceStr.replace(/\D/g, "");
  const cartItemrice = parseInt(matchCartItemPrice);
  console.log(cart__item);
  if (actionBtn === "+") {
    cartItemQtyEl.innerHTML = cartQty + 1;
    strSubTotalEl.innerHTML = `${formatAmout((subTotal += cartItemrice))}`;
    await incrementCart(cartItemrice, id);
    document.querySelector(".totalAmount").innerHTML = `${formatAmout(
      subTotal
    )}`;
  } else if (actionBtn === "-") {
    if (cartQty === 0) {
      cartItem.style.display = "none";
      deletDataInDataBase("cart", "id", id);
      return;
    } else {
      cartItemQtyEl.innerHTML = cartQty - 1;
      await decrementCart(cartItemrice, id);
      console.log(
        (strSubTotalEl.innerHTML = `${formatAmout((subTotal -= cartItemrice))}`)
      );
      document.querySelector(".totalAmount").innerHTML = `${formatAmout(
        subTotal
      )}`;
    }
  } else if (deletBtbn === "fas fa-times") {
    cartItem.style.display = "none";
    console.log(
      (strSubTotalEl.innerHTML = `${formatAmout((subTotal -= cartItemrice))}`)
    );
    document.querySelector(".totalAmount").innerHTML = `${formatAmout(
      subTotal
    )}`;
  }
}
// all the slectors to use

renderCartDetails();

//render the total quantity price

function priceSection(data) {
  const SubTotal = data.reduce((sum, amount) => sum + amount.product_price, 0);
  console.log(SubTotal);

  localStorage.setItem("subTotal", SubTotal);

  totalContainer.innerHTML = `<li  class="price__section--item">
										<span class="price-section-text">Sub Total:</span>
										<span class="cart__amount cart_subTotal">${formatAmout(
                      SubTotal
                    )}</span>
									</li>
									<li class="price__section--item">
										<span class="price-section-text">Discount:</span>
										<span class="cart__amount"> 123CFA</span>
									</li>
									<li class="price__section--item">
										<span class="price-section-text"> Total Amount:</span>
										<span class="cart__amount totalAmount">${formatAmout(SubTotal)}</span>
									</li>`;
}

placeOrderBtn.addEventListener("click", function(e) {
  location.href = "/user/pages/checkout.html";
});
