const welcomeBtn = document.querySelector('.welcomebtn');
welcomeBtn.addEventListener('click', function(e){
   setTimeout(function(){
    location.href = '/user/pages/auth/account.html'

   }, 2000)
})
