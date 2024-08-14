//here we will carry out the type of each message to

const url = `https://mboadeals.net/api/v1/sms/sendsms`;

//a function to send a  messages and display them

async function sendAnewNotification(message, phone){
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

// sendAnewNotification('New order is ready', '678766477');