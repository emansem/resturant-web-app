const sideBar = document.querySelector(".side-bar");
import {
  fetchAllDataFromDataBase,
  saveDateIntoDataBase
} from "../../../../general/data.js";
//render the sidebars to the web page
function renderSidebarMenus() {
  sideBar.innerHTML = `<div class="side__bar-menus">
					<div class="side__bar--menus-items">
						<!-- Home Menu Item -->
						<a href="/admin/pages/dashboard.html" class="menu__list-item">
							<i class="fas fa-home"></i>
							<span>Dasboard</span>
						</a>
                        <!-- Feedback Menu Item -->
						<a href="/admin/pages/customers.html" class="menu__list-item">
							<i class="fas fa-users"></i>
							<span>Customers</span>
						</a>

						<!-- Orders Menu Item -->
						<a href="/admin/pages/orders.html" class="menu__list-item">
							<i class="fas fa-shopping-bag"></i>
							<span>Orders</span>
						</a>
                         <p id='open__settings--dropdown' class="menu__list-item">
                           <i class="fas fa-cog"></i>
                           <span>Settings</span>
<!-- Dropdown Toggle -->
<i class="fas fa-chevron-down"></i>
<!-- Dropdown Menu -->
<ul class="dropdown-menu ">
<li><a href="/admin/pages/coupon-settings.html">Coupons</a></li>
<li><a href="/admin/pages/notifications-settings.html">Notifications</a></li>
<li><a href="/admin/pages/locations.html">Locations</a></li>
</ul>
</p>

                          <a href="/admin/pages/menus.html" class="menu__list-item">
							<i class="fas far fa-file-archive"></i>
							<span>Menus</span>
						</a>


						<!-- Account Menu Item -->
						<a href="" class="menu__list-item">
							<i class="fas fa-user"></i>
							<span>Profile</span>
						</a>
  
						<!-- Feedback Menu Item -->
						<a href="/admin/pages/feedbacks.html" class="menu__list-item">
							<i class="fas fa-comment"></i>
							<span>Feedback</span>
						</a>

						
					</div>

					<!-- Logout Menu Item -->
					<div>
						<p id='logoutBtn' class="menu__list-item">
							<i class="fas fa-sign-out-alt"></i>
							<span>Logout</span>
						</p>
					</div>
				</div>`;
  const open__settings = document.querySelector("#open__settings--dropdown");
  const dropdown = document.querySelector(".dropdown-menu ");
  const logoutBtn = document.getElementById("logoutBtn");

  openDropDownSettings(open__settings, dropdown);
  logoutAdminOut(logoutBtn);
}
renderSidebarMenus();

//open the settinsg dropdown menus
function openDropDownSettings(btn, dropdown) {
  btn.addEventListener("click", function(e) {
    dropdown.classList.toggle("hidesettings");
  });
}

//logout admin out of the admin panel
function logoutAdminOut(logoutBtn) {
  logoutBtn.addEventListener("click", function(e) {
    localStorage.removeItem("adminlogin");
    setTimeout(() => {
      location.href = `/admin/pages/adminlogin.html`;
    }, 1500);
  });
}

async function checkIfUserIsLoggedIn() {
  const adminId = parseInt(localStorage.getItem("adminlogin"));
  const data = await fetchAllDataFromDataBase("admin");

  if (!adminId && adminId !== data[1].id) {
    location.href = `/admin/pages/adminlogin.html`;
    return;
  }
}
checkIfUserIsLoggedIn();
