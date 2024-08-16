const actionBtn = document.querySelector(".action-Btn");
const account__wrapper = document.querySelector(".account__wrapper");
const register__form = document.getElementById("register__form");
const show__register = document.querySelector(".show__register--page");
const registerForm = document.querySelector(".registerForm");
const loginForm = document.querySelector(".loginForm");
import { supabase } from "../../../../general/config.js";
const login__successMsg = document.querySelector("#login__success--message");
const register__message = document.querySelector("#register__message");
const signBtn = document.querySelector(".signBtn");
const error__message = document.querySelector("#error__message");
const faild__message = document.querySelector(".hideError");
const register__errorMsg = document.getElementById('register__error--message');
// const loginBtn = document.querySelector('.loginBtn');

const activeId = localStorage.getItem("activeID");
const loggedUser = Number(activeId);
// a function to hide the login form and show the register form
actionBtn.addEventListener("click", function(e) {
  const actionText = e.target.textContent;
  if (actionText === "Register Now") {
    account__wrapper.classList.add("hidelogin");

    register__form.classList.remove("hideregister");
  }
});

//the error message here

function errorMessage(message) {
  error__message.classList.remove("hideError");
  error__message.innerHTML = message;

  setTimeout(function() {
    error__message.classList.add("hideError");
  }, 5000);
  return message;
}
function registerErrorMsg(message) {
 register__errorMsg.classList.remove("hide__register--error");
  register__errorMsg.innerHTML = message;

  setTimeout(function() {
  register__errorMsg.classList.add("hide__register--error");
  }, 5000);
  return message;
}

//A function hide the regsiter form and show the login form
show__register.addEventListener("click", function(e) {
  register__form.classList.add("hideregister");

  account__wrapper.classList.remove("hidelogin");
});

//collect all the register infup files here

function getAllRegisterForm() {
  const registerData = {
    name: registerForm.name.value,
    phone: registerForm.phone.value,
    password: registerForm.password.value
  };
  signUpUser(registerData.phone, registerData.password, registerData);
  console.log(registerData);
}
//add submit event to handle the form

registerForm.addEventListener("submit", function(e) {
  e.preventDefault();
  getAllRegisterForm();
  signBtn.innerHTML = "Please wait...";
});

async function signUpUser(phone, password, registerData) {
  const { data, error } = await supabase.auth.signUp({
    phone: phone,
    password: password
  });

  if (error) {
  registerErrorMsg(`${error.message}`);
  console.error('this is user error', error);
    signBtn.innerHTML = 'Sign up';
  }

  if (data && data.user) {
    const user_id = data.user.id;
    console.log("User ID:", user_id);
    saveUserData(user_id, registerData);
  }
}

//function to insert user information into the website
async function saveUserData(user_id, registerData) {
  signBtn.disabled = true;
  const { data, error } = await supabase
    .from("users")
    .insert({ ...registerData, user_id })
    .select();
  if (data && data.length) {
    console.log("this is the inserted data", data);
    register__message.classList.remove("register__success--message");
    registerForm.reset();
    signBtn.innerHTML = "Sign up";
    signBtn.disabled = false;
    setTimeout(function() {
      window.location.href = "/user/pages/dashboard.html";
      storeUserActiveId(data[0].id);
    }, 2000);
  }
  if (error) {
    console.log("this is the error we had", error);
  }
}

//function to keep the active user id in the browser.

function storeUserActiveId(id) {
  return localStorage.setItem("activeID", id);
}

//let us work on the login page now.a

function getAllLoginInput() {
  const phone = loginForm.phone.value;
  const password = loginForm.password.value;
  if (phone === "" || password === "") {
    error__message.classList.remove("hideError");
    errorMessage("All fields are required");

    setTimeout(function() {
      error__message.classList.add("hideError");
    }, 1200);
    return;
  } else {
    getUserId(phone, password);
  }
}

//get the user input and id  to check if the  user credentials are ok

async function getUserId(phone, password) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("phone", phone);
  validateLogin(data, phone, password);
  if (error) {
    console.log("this is the error", error);
  }
}
//validate the login credentails
function validateLogin(data, phone, password) {
  if (data && data.length !== 0) {
   
    const user = data.find(
      user => user.phone === phone && user.password === password
    );
    if (user) {
      login__successMsg.classList.remove('login__success-text');
      setTimeout(function(){
        location.href = '/user/pages/dashboard.html';
      }, 1500);
      localStorage.setItem('activeID', user.id);
    } else {
      errorMessage("Wrong credentials, try again.");
    }
    return;
  } else {
    errorMessage("No found, create an account");
  }
}

//addd event to login the users.

loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  getAllLoginInput();
});
