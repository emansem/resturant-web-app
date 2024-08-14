const orderContainer = document.querySelector('.order__list--container');
import { fetchDataFromDataBase } from "../../../general/data.js";
import { fetchAllDataFromDataBase } from "../../../general/data.js";
import { formatAmout } from "../../../general/data.js";
import { saveDateIntoDataBase } from "../../../general/data.js";
import { incrementCart } from "../../../general/data.js";
import { deletDataInDataBase } from "../../../general/data.js";
import { decrementCart } from "../../../general/data.js";
const orders__wrapper = document.querySelector(".orders__wrapper");
const noResultContainer = document.querySelector(".empty-cart");

//fetch all the orders from the database and render them on the wep page

async function getAllOrders(){
    const dataResult = await fetchAllDataFromDataBase('orders');
    if(dataResult.length !==0){
       renderOrdersOnWebPage(dataResult)
    }
}
getAllOrders();

//render the orders on the  web page

function renderOrdersOnWebPage(orders){
orders.forEach(order=> {
    orderContainer.innerHTML+=`  
                          <li class="order__list-items newOrder">
                            <span>${order.customer_name}</span>
                            <span class="pending-order">Pending</span>
                            <span>${formatAmout(order.amount)}</span>
                            <a href="/admin/pages/order-details.html?id=${order.id}" class="seemore">
                                <i class=" fas far fa-arrow-right"></i>
                            </a>
                          </li>
                          `
});
}

