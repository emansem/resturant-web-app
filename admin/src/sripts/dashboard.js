import { fetchAllDataFromDataBase } from "../../../../general/data.js";
const reports__itemsWrapper = document.querySelector(
  ".reports__items--wrapper"
);

const dashboard__reportContainer = document.querySelector(
  ".dashboard__report--container"
);

//fetch the total orders details and the coupon details
async function getReportDetails() {
    const users = await fetchAllDataFromDataBase('users');
  const orders = await fetchAllDataFromDataBase("orders");
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(item => item.status === "Pending");
  const rejectedOrders = orders.filter(item => item.status === "Rejected");
  const processingOrders = orders.filter(item => item.status === "Processing");
  const completedOrders = orders.filter(item => item.status === "Completed");
  renderReortsDetails(
    completedOrders.length,
    processingOrders.length,
    rejectedOrders.length,
    pendingOrders.length,
    users.length,
    totalOrders
  );
}
getReportDetails()

//render the report details
function renderReortsDetails(completed, processing, rejected, pending, users, totalOrders){
    dashboard__reportContainer.innerHTML = `  <div class="report__list">
                            <h3 class="report__value">${totalOrders}</h3>
                            <div class="span report__text">
                                orders Received
                            </div>
                        </div>
                        <div class="report__list">
                            <h3 class="report__value">${completed}</h3>
                            <div class="span report__text served">
                                orders Served
                            </div>
                        </div>
                        <div class="report__list">
                            <h3 class="report__value">${pending}</h3>
                            <div class="span report__text pending">
                                Pending Orders
                            </div>
                        </div>
                        <div class="report__list">
                            <h3 class="report__value">${rejected}</h3>
                            <div class="span report__text cancelled">
                               Orders rejected
                            </div>
                        </div>
                        <div class="report__list">
                            <h3 class="report__value">${users}</h3>
                            <div class="span report__text newcustomers">
                               New customers
                            </div>
                        </div>`
};
