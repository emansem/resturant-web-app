const sideBar = document.querySelector('.side-bar');

//render the sidebar menus on the web page
function renderSideBarMenus(){
  return  sideBar.innerHTML = `    <div class="side__bar-menus">
          <div class="side__bar--menus-items">
            <span>
              <i class="fas fa-times"></i>
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
            <a href="/user/pages/feedback.html" class="menu__list-item">
              <i class="fas fa-comment"></i>
              <span>Feedback</span>
            </a>
            <a href="/user/pages/notifications.html" class="menu__list-item">
            <i class="fas fa-bell"></i>
              <span>Notifications</span>
            </a>
          </div>
          <div>
            <a href="" class="menu__list-item">
              <i class="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </a>
          </div>
        </div>`
}
renderSideBarMenus();

