 export function timeAgo(date) {
    //convert the date in to seconds by dividing the  df in milisecond to seconds;
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
    return showTimeAgo(seconds);
  }
  
  //now show the time ago lable
  function showTimeAgo(seconds) {
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 }
    ];
    //loop through the time and diplay the time stamp
    for(let i  = 0; intervals.length;  i++){
      const interval = intervals[i];
       const count = Math.floor(seconds / interval.seconds);
       if(count >=1){
        return `${count === 1 ? `1 ${interval.label} ago` : `${count} ${interval.label}s ago`}`;
  
       }
       
    }
  }

  //here we will carry out the type of each message to

const url = `https://mboadeals.net/api/v1/sms/sendsms`;

//a function to send a  messages and display them

export async function sendAnewNotification(message, phone){
    const smsData = {
        user_id : "66b88c3e4e56e50021fb54a9",
        message : message,
        password: 'Bungsem45@',
        phone_str : phone,
        snender_name:  "Jandar Kitchen",
    }
    try {
        const respons =  await fetch(url, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(smsData)
        })
        const data = await respons.json();
        console.log(data);
        
    } catch (error) {
        
    }


}