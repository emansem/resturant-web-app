const orderContainer = document.querySelector('.order__list--container');
import { fetchDataFromDataBase } from "../../../general/data.js";
import { fetchAllDataFromDataBase } from "../../../general/data.js";
import { formatAmout } from "../../../general/data.js";
import { saveDateIntoDataBase } from "../../../general/data.js";
import { incrementCart } from "../../../general/data.js";
import { deletDataInDataBase } from "../../../general/data.js";
import { decrementCart } from "../../../general/data.js";
const orders__wrapper = document.querySelector("#ordersContainer");
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

function renderOrdersOnWebPage(data){
const orders = data.sort((a, b)=>b.created_at - a.created_at);
orders.forEach(order=> {
    
    orders__wrapper.innerHTML+=`  
        <tr>
        <td>${order.customer_name}</td>
        <td>${order.customer__phone}</td>
        <td>
        <span class="${checkOrderStatus(order.status)}">${order.status}</span>
        </td>
        <td>
        <a href="/admin/pages/order-details.html?id=${order.id}" class="seemore">
        <i class=" fas far fa-arrow-right"></i>
        </a>
        </td>
        </tr>`
});
}

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

