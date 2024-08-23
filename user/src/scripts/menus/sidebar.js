const sideBar = document.querySelector(".side-bar");
// import { fetchDataFromDataBase } from "../../../../general/data.js";

const activeId = localStorage.getItem("activeID");
const customer_Id = Number(activeId);
//render the sidebar menus on the web page
function renderSideBarMenus() {
  sideBar.innerHTML = `    <div class="side__bar-menus">
          <div class="side__bar--menus-items">
            <span id='close__sidebar'>
            <i class="fas fa-times-circle"></i>
            </span>
            <a href="/user/pages/dashboard.html" class="menu__list-item">
              <i class="fas fa-home"></i>
              <span>Dashboard</span>
            </a>
            <a href="/user/pages/orders.html" class="menu__list-item">
              <i class="fas fa-shopping-bag"></i>
              <span>Orders</span>
            </a>
            <a href="/user/pages/account.html" class="menu__list-item">
              <i class="fas fa-user"></i>
              <span>Account</span>
            </a>
            <a href="/user/pages/counpons.html" class="menu__list-item">
              <i class="fas fas fa-gift"></i>
              <span>Coupons</span>
            </a>
           
            <a href="/user/pages/notifications.html" class="menu__list-item">
            <i class="fas fa-bell"></i>
              <span>Notifications</span>
            </a>
          </div>
          <div>
            <p id='logoutBtn' class="menu__list-item">
              <i class="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </p>
          </div>
        </div>`;
  const logoutBtn = document.getElementById("logoutBtn");
  const close__sidebar = document.getElementById('close__sidebar');
  logoutAuser(logoutBtn);
  closeTheSideBar(close__sidebar);
}
renderSideBarMenus();

//implement the logout section
function logoutAuser(logoutBtn) {
  logoutBtn.addEventListener("click", function(e) {
    localStorage.removeItem("activeID");
    setTimeout(() => {
      location.href = `/user/pages/auth/account.html`;
    }, 2000);
  });
}

//add event to close the side bar
function closeTheSideBar(close__sidebar) {
  close__sidebar.addEventListener("click", function(e) {
    sideBar.id = 'sidebar__slideback';
    setTimeout(() => {
      sideBar.style.display = "none";
    }, 800);
  });
}










