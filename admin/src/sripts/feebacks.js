const feedbacks__container = document.querySelector('.feedbacks__container');
const dashboard__reports = document.querySelector('.dashboard__reports');
import { fetchAllDataFromDataBase, fetchUsersNames } from "../../../../general/data.js";
// import { supabase } from ".";


async function getAllFeedBacks(){
   try {
    const data = await fetchAllDataFromDataBase('feedbacks');
    if(data.length!==0){
     const customer_ids = data.map(item=>item.customer_id);
     const dataResult = await fetchUsersNames('users', 'id', customer_ids);
     renderFeebacks(data, dataResult);
    }else{
     dashboard__reports.innerHTML =`<h1 class="primary-heading">No feedbacks found here</h1>`
    }
   } catch (error) {
    console.log('error occure here', error);
    dashboard__reports.innerHTML =`<h1 class="primary-heading">Something went wrong, try again later</h1>`
   }
   
}
getAllFeedBacks();

//render the feedback details on the web page
async function renderFeebacks(dataResult, data){
   const names = new Map();
   for(let user of data){
    names.set(user.id, user.name);
   }

 const feedbacks = dataResult.sort((a, b)=>b.id-a.id);
 feedbacks.forEach(feedback => {
    const name = names.get(feedback.customer_id);
    const date = new Date(feedback.created_at).toLocaleDateString()
    feedbacks__container.innerHTML+=`<div class="feedbacks__item">
    <div class="feedback__item--header">
        <span>${name}</span>
        <span>${date}</span>
    </div>
    <div class="feedback__item--footer">
        <p class="feed__back--item-message">
          ${feedback.message}
        </p>
    </div>
</div>
`
 });
}