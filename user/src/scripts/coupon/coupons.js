import { fetchDataFromDataBase } from "../../../../general/data.js";

const activeId = localStorage.getItem("activeID");
const customer_Id = Number(activeId);

const no__coupon = document.querySelector("#no__coupon");
const coupons__wrapper = document.querySelector(".coupons__wrapper");
const couponContainer = document.querySelector(".coupons__body");
const copy__successText = document.querySelector(".copy__successText");

//fetch all the  user  coupons if he has any hehe
async function getAllCoupons() {
  const coupons = await fetchDataFromDataBase(
    "coupons",
    "customer_id",
    activeId
  );
  if (coupons.length !== 0) {
    renderCouponsDetails(coupons);
  } else {
    coupons__wrapper.classList.add("hideCounpons");
    no__coupon.classList.remove("hideNoCoupon");
  }
}
getAllCoupons();
//render the coupons details
function renderCouponsDetails(data) {
  const coupons = data.sort((a, b) =>b.id - a.id);
  coupons.forEach(coupon => {
    const date = new Date(coupon.expire_date);
    const expireDate = date.toLocaleString().split(",")[0];
    couponContainer.innerHTML += ` <div class="coupons__item">
                <div class="coupon__item--header">
                 
                   <div class="coupon__item--right">
                      <div class="coupon__item--right-top">
                       
                      <p class="coupon__item--right-text">Thanks for ordering 10 times! Enjoy a <span class="coupon__discount">${coupon.coupon_percentage}%</span> discount from Jandar Kitchen.</p>
 
                      </div>
                    
                   </div>
                </div>
                 <div class="coupons__footer">
                     <div class="coupon__item--right-bottom">
                         <li class="coupon__list-item">
                             <span class="coupon__list--text">Expire date:</span>
                             <span class="coupon__date">${expireDate}</span>
                         </li>
                         <li class="coupon__list-item">
                             <span class="coupon__list--text">Status:</span>
                             <span class="${checkStatus(
                               coupon.status
                             )}">${coupon.status}</span>
                         </li>
                        </div>
                     <div class="coupon-section">
                         <div class="coupon__code">
                             <input id='coupon_code' type="text" value="${coupon.coupon_code}" readOnly>
                          </div>
                          <button  class="copyBtn">Copy code</button>
                         </div>
                     </div>
                  
               </div>`;
  });
  const coupon_code = document.querySelectorAll(".coupons__item");
  const copyBtn = document.querySelectorAll(".copyBtn");
  copyCouponValue(copyBtn, coupon_code);
}
// //copy the coupon into clipboard
function copyCouponValue(copyBtns, coupon__codes) {
  coupon__codes.forEach(item=>{
  const copyBtn = item.querySelector('.copyBtn');
  const couponValueInput = item.querySelector('#coupon_code');
  copyBtn.addEventListener('click', function(e){
  getCouponInput(couponValueInput);
  })
 
  })
}

//get the coupon input
function getCouponInput(couponValueInput) {
  
  couponValueInput.select();
  couponValueInput.setSelectionRange(0, 99999);
    //copy the coupon code inside the input field;
    navigator.clipboard.writeText(couponValueInput.value);
    copy__successText.classList.remove("hideCopied");
    setTimeout(() => {
      copy__successText.classList.add("hideCopied");
    }, 1500);
  
}

//check if the status has exire or not
function checkStatus(status) {
  if (status === "Expire") {
    return "coupon__status expire";
  } else {
    return "coupon__status";
  }
}
