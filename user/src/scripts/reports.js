import { fetchDataFromDataBase } from "../../../../general/data.js";
const reports__itemsWrapper = document.querySelector('.reports__items--wrapper');
const activeId = localStorage.getItem("activeID");
const customer_Id = Number(activeId);


//fetch the total orders details and the coupon details
async function getOrdersDetailsAndCoupons(){
    const coupons = await fetchDataFromDataBase('coupons', 'customer_id', customer_Id);
    const orders = await fetchDataFromDataBase('orders', 'customer_id', customer_Id);
    const totalCoupons = coupons.length;
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(item=>item.status==='Pending');
    const rejectedOrders = orders.filter(item=>item.status==='Rejected');
    const processingOrders = orders.filter(item=>item.status==='Processing');
    const completedOrders = orders.filter(item=>item.status==='Completed');
    renderReortsDetails(completedOrders.length, processingOrders.length, rejectedOrders.length ,pendingOrders.length, totalCoupons, totalOrders)
}
getOrdersDetailsAndCoupons();

//render the total user reports on the web page
function renderReortsDetails(completed, processing, rejected, pending, totalCoupons, totalOrders){
reports__itemsWrapper.innerHTML = `<div class="reports__item">
                    <div class="report__item--left">
                        <i class="fas fa-shopping-cart"></i>

                    </div>
                    <div class="report__item--right">
                        <span class="report__item-text">
                            Total Orders
                        </span>
                        <span class="report__item-amount">
                            ${totalOrders}
                        </span>
                    </div>
                </div>
                <div class="reports__item">
                    <div class="report__item--left">
                        <i class="fas fa-ticket-alt"></i>
                    </div>
                    <div class="report__item--right">
                        <span class="report__item-text">
                            Total coupons
                        </span>
                        <span class="report__item-amount">
                            ${totalCoupons}
                        </span>
                    </div>
                </div>
              
                <div class="reports__item">
                    <div class="report__item--left">
                        <i class="fas fa-hourglass-half"></i>
                    </div>
                    <div class="report__item--right">
                        <span class="report__item-text">
                           Pending orders
                        </span>
                        <span class="report__item-amount">
                            ${pending}
                        </span>
                    </div>
                </div>
                <div class="reports__item">
                    <div class="report__item--left">
                        <i class="fas fa-times-circle"></i>
                    </div>
                    <div class="report__item--right">
                        <span class="report__item-text">
                          Rejected orders
                        </span>
                        <span class="report__item-amount">
                            ${rejected}
                        </span>
                    </div>
                </div>
                <div class="reports__item">
                    <div class="report__item--left">
                        <i class="fas fa-spinner"></i>
                    </div>
                    <div class="report__item--right">
                        <span class="report__item-text">
                          Processing orders
                        </span>
                        <span class="report__item-amount">
                            ${processing}
                        </span>
                    </div>
                </div>
                <div class="reports__item">
                    <div class="report__item--left">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="report__item--right">
                        <span class="report__item-text">
                            Completed orders
                        </span>
                        <span class="report__item-amount">
                            ${completed}
                        </span>
                    </div>
                </div>
               `
}