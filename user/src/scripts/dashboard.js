const foodItime__container = document.querySelector('.dashboard__body');
const greetMessage = document.querySelector('.greeting');


// import the functions to use here.
 import { getUserData } from "../scripts/data.js";
const userData = await getUserData();
  const userName =  userData[0].name.split(' ')[0];

//function to greet the user depending on the time.

function greetUser(){
    const hours =  new Date().getHours();
    if(hours >=6 && hours < 12){
       greetMessage.innerHTML = `Hi <span>${userName}, </span> Good morning!`
    }
    else if(hours >= 12 && hours < 18){
      greetMessage.innerHTML = `Hi <span>${userName}, </span> Good afternoon!`
    }else{
        greetMessage.innerHTML = `Hi <span>${userName}, </span> Good evening!`
    }
}
greetUser();