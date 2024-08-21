import { fetchDataFromDataBase } from "../../../../general/data.js";
import { fetchAllDataFromDataBase } from "../../../../general/data.js";

import { saveDateIntoDataBase } from "../../../../general/data.js";
import { updateDataIntoDataBase } from "../../../../general/data.js";
import { deletDataInDataBase } from "../../../../general/data.js";

const coupon__form = document.querySelector(".coupon__form");

//fetch the coupons settings and render here..................
async function getAllCouponSettings(saveData) {
  const data = await fetchAllDataFromDataBase("coupon_settings");
  if (data.length !== 0) {
    //update coupon settiing if there is  settings already in the database
    await updateDataIntoDataBase(saveData, "coupon_settings", "id", data[0].id);
    return;
  } else {
    //save coupon settiing if there is not settings already  in the database
saveDateIntoDataBase(saveData, 'coupon_settings');
  }
}

//render the  coupon settings details here.
async function getAllCouponSettingsData() {
  const data = await fetchAllDataFromDataBase("coupon_settings");
  if(data.length !==0){
 renderCouponsettingsIfData(data);
 return
  }else{
    renderCouponsettingsIfNotData();
  }
}
getAllCouponSettingsData();


//get all the  coupon settings details
function getAllCouponSettingsInuts() {
  const data = {
    coupon_percentage: coupon__form.percentage.value,
    numberOfTimes: coupon__form.numberOftimes.value,
    numberOfOrders: coupon__form.numberOfOrders.value,
    expireDate: coupon__form.expireDate.value
  };
  getAllCouponSettings(data);
}

//add event listener to submit the form
coupon__form.addEventListener("submit", function(e) {
  e.preventDefault();
  getAllCouponSettingsInuts();
});
//render coupon settings if  data
function renderCouponsettingsIfData(data){
    coupon__form.innerHTML = `<div class="coupon__form--items">
                       <div class="coupon_group-item">
                           <label for="coupon">Counpon percentage</label>
                           <input name='percentage' type="number" value="${data[0]
                             .coupon_percentage || 0}">
                       </div>
                       <div class="coupon_group-item">
                           <label for="coupon">Number of times it can be use</label>
                           <input name= 'numberOftimes' type="number" value="${data[0]
                             .numberOfTimes || 0}">
                       </div>
                      </div>
                        <div class="coupon__form--items">
                           <div class="coupon_group-item">
                               <label for="coupon">Expires after?</label>
                               <input name = 'numberOfOrders' type="number" value="${data[0]
                                 .numberOfOrders || 0}">
                           </div>
                           <div class="coupon_group-item">
                               <label for="coupon">Number of orders</label>
                               <input name = 'expireDate' type="number" value="${data[0]
                                 .expireDate || 0}">
                           </div>
                        </div>
                        <div class="coupon__form--items">
                           <button class="primary-button save__coupon--details"> Save details</button>
                         </div>`;
}

//render coupon settings if not data
function renderCouponsettingsIfNotData(){
    coupon__form.innerHTML = `<div class="coupon__form--items">
                       <div class="coupon_group-item">
                           <label for="coupon">Counpon percentage</label>
                           <input name='percentage' type="number" value="0">
                       </div>
                       <div class="coupon_group-item">
                           <label for="coupon">Number of times it can be use</label>
                           <input name= 'numberOftimes' type="number" value="0">
                       </div>
                      </div>
                        <div class="coupon__form--items">
                           <div class="coupon_group-item">
                               <label for="coupon">Expires after?</label>
                               <input name = 'numberOfOrders' type="number" value="0">
                           </div>
                           <div class="coupon_group-item">
                               <label for="coupon">Number of orders</label>
                               <input name = 'expireDate' type="number" value="0">
                           </div>
                        </div>
                        <div class="coupon__form--items">
                           <button class="primary-button save__coupon--details"> Save details</button>
                         </div>`;
                       
}