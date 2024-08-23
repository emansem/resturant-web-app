//selectors to render things in the dom;
const cartIcon = document.querySelector(".cart");
const menuDetailsConatiner = document.querySelector(".meal__details--wrapper");

const activeId = localStorage.getItem("activeID");
const orderCount = document.querySelector(".order-count");
const customer_Id = Number(activeId);

// import all the functions from data js
import { fetchDataFromDataBase } from "../../../../general/data.js";
import { formatAmout } from "../../../../general/data.js";
import { saveDateIntoDataBase } from "../../../../general/data.js";
import { incrementCart } from "../../../../general/data.js";
const menuProductId = location.search.split("=")[1];
const menuID = parseInt(menuProductId);

//fetch the product and render its infomation here
async function fetchMenuDeatils() {
  const menuDetails = await fetchDataFromDataBase("menus", "id", menuID);
  if (menuDetails.length !== 0) {
    renderMenuDetails(menuDetails);
  }
}

fetchMenuDeatils();

//render the menu details on the web page
function renderMenuDetails(details) {
  menuDetailsConatiner.innerHTML = `  <!-- Meal Image and Header -->
          <div class="meal__details--header">
            <div class="meal__details--image">
              <img src="${details[0].image}" alt="Fried Rice" />
            </div>
          </div>

          <!-- Meal Description and Actions -->
          <div class="meal__details--footer">
            <!-- Meal Title -->
            <div class="meal__details--heading">
              <h2 class="primary-heading meal-heading">
               ${details[0].name}
              </h2>
            </div>

            <!-- Meal Description -->
            <div class="meal__paragraph">
              <p class="primary-text">
                ${details[0].details}
              </p>
            </div>

            <!-- Meal Price and Add to Cart Button -->
            <div class="meal__details--amount">
              <div class="total__amount">
                <div class="total__amount--text">Amount:</div>
                <div class="total__amount--value">${formatAmout(
                  details[0].price
                )}</div>
              </div>
              <div class="meal__details--cart-btn">
                <button class="primary-button cart__btn">Add to cart</button>
              </div>
            </div>
          </div>`;
  const addTocartBtn = document.querySelector(".cart__btn");
  const meal__details = document.querySelector(".meal__details--cart-btn");
  getAllCartItems(meal__details);
  addProductTocart(addTocartBtn, details);
}

// a function check if there is a product in the cart already;
async function addProductTocart(addTocartBtn, details) {
  addTocartBtn.addEventListener("click", async function(e) {
    addTocartBtn.innerHTML = "Please wait..";
    const data = await fetchDataFromDataBase("cart", "menu_id", menuID);

    if (data.length !== 0 && !data[0].customer_Id) {
      await updateCartItem(data[0].product_price, data[0].id, addTocartBtn);
      await getAllCartItems();

      return;
    } else {
      console.log("the is no product found in the cart");
      cartMenuDetails(details, addTocartBtn);

      return;
    }
  });
}

// product details to be added in the cart table
function cartMenuDetails(details, addTocartBtn) {
  const saveData = {
    product_name: details[0].name,
    product_price: details[0].price,
    product_image: details[0].image,
    product_quantity: 1,
    menu_id: menuID,
    customer_Id: customer_Id
  };
  addNewProuctTotheCart(saveData, addTocartBtn);
}

// a function to add product to cart
async function addNewProuctTotheCart(menuDetails, addTocartBtn) {
  const results = await saveDateIntoDataBase(menuDetails, "cart");
  if (results.length !== 0) {
    addTocartBtn.innerHTML = "Add to cart";
    location.reload();
  }
}

//update the product if it exist in the cart already.
async function updateCartItem(amount, id, addTocartBtn) {
  const results = await incrementCart(amount, id);
  console.log("this is the updated data", results);
  addTocartBtn.innerHTML = "Add to cart";
}

//update the cart ui icon with thetotal cart item length.

export async function getAllCartItems(meal__details) {
  const results = await fetchDataFromDataBase(
    "cart",
    "customer_Id",
    customer_Id
  );
  console.log("this is cart items", results);
  if (results.length === 0) {
    orderCount.innerHTML = 0;
    localStorage.setItem("totaItems", results.length);
  } else {
    results.forEach(item => {
      if (item.menu_id === menuID) {
        meal__details.innerHTML = ` <button class="primary-button"> <a href='/user/pages/cart.html'>Go to cart</a></button>`;
        return;
      }
    });
  }
}
// getAllCartItems();

cartIcon.addEventListener("click", () => {
  location.href = "/user/pages/cart.html";
});
