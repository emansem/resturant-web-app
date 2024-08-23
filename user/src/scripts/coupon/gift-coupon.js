import {
  fetchAllDataFromDataBase,
  fetchDataFromDataBase,
  updateDataIntoDataBase,
  saveDateIntoDataBase
} from "../../../../general/data.js";
import { sendAnewNotification } from "../../../../general/helper.js";

const activeId = localStorage.getItem("activeID");
const customer_Id = Number(activeId);

//function get all coupon settings
async function getAllCouponSettings() {
  const couponSettings = await fetchAllDataFromDataBase("coupon_settings");
  const user = await fetchDataFromDataBase("users", "id", customer_Id);
  const numberOfOrders = user[0].numberOfOrders;
  const status = user[0].is_eligible;
  const totalNumberOfOrders = couponSettings[0].numberOfOrders;
  const coupon_percentage = couponSettings[0].coupon_percentage;
  const days = couponSettings[0].expireDate;
  const  numberOfTimes = couponSettings[0].numberOfTimes;
 
  const expireDate = couponExpireDate(days);
  const couponCode = generateCouponNumber();
  const saveData = {
    coupon_code: couponCode,
    coupon_percentage: coupon_percentage,
    customer_id: activeId,
    numberOfTimes: 0,
    expire_date : expireDate,
  };
  createANewCoupon(numberOfOrders, totalNumberOfOrders, saveData);
}
getAllCouponSettings();

//validate and create a coupon for a user when he meet all the conditions;
async function createANewCoupon(numberOfOrders, totalNumberOfOrders, saveData) {
  if (numberOfOrders >= totalNumberOfOrders) {
    const data = await saveDateIntoDataBase(saveData, 'coupons');
    const message = `Jandar Kitchen: Thanks for being a valued customer! Enjoy ${data[0].coupon_percentage}% off your next order with the code ${data[0].coupon_code}. We can’t wait to serve you again!;
`;
    const phone = await fetchDataFromDataBase('users', 'id', activeId);
  if(data.length !==0){
    sendAnewNotification(message, phone[0].phone);
  }
   //reset the number of orders back to zero
   updateDataIntoDataBase({numberOfOrders: 0}, 'users', 'id', activeId);
   return;
  } else {
    return
  }
}

//create the expire date for the coupon.
function couponExpireDate(days) {
  const newDate = Date.now();
  const expireDate = newDate + days * 24 * 60 * 60 * 1000;
  updateCouponStatus(expireDate);
  return expireDate;
}

//generate the coupon 6 digit number
function generateCouponNumber() {
  const numberArray = ["J", "K", 5, 9, 1, 9, "K", "T"];
  let couponNumber = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * numberArray.length);
    couponNumber += numberArray[randomIndex];
    
  }
  return couponNumber;
}

//update the coupon status when the coupon expire
function updateCouponStatus(expireDate){
  if(Date.now() >= expireDate){
    updateDataIntoDataBase({status:'Expired'}, 'coupons', 'customer_id', activeId);
  }
}























