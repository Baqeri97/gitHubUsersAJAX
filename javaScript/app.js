const video = document.getElementById('bgVideo');
const overlay = document.querySelector('.overlay');
const tittel = document.getElementById('titel');
const titelText = "gitHub Users";
const charTitel = titelText.split(""); // create array from titelText characters
const desc = document.querySelector('.descriPtion');
let lineIndex = 0;
let charIndex = 0;
let closeBtn = document.createElement("button");
closeBtn.textContent = "X";
desc.appendChild(closeBtn);
let getUsers = loadUsersIfNeeded();
var slider = document.querySelector(".swiper-wrapper");
const lines = [ 
  "Hello Dear",
  "Thanks for attention,",
  "This is a simple project to get users from github API.",
  "This program save API info in localStorage,",
  "and show them in a slider.",
  "You can click on go to profile button to visit user profile.",
];


// swiper slider

 var swiper = new Swiper(".mySwiper", {
       effect: "coverflow",
       grabCursor: true,
       centeredSlides: true,
       slidesPerView: "auto",
       coverflowEffect: {
         rotate: 0,
         stretch: 0,
         depth: 100,
         modifier: 1,
         slideShadows: true

       },
       loop: true,
       autoplay: {
       delay: 300,            
       disableOnInteraction: true},
       speed: 2000,
       spaceBetween: 8,
       navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev'
       },
     });

/////// show tittel as typeWriter after smoke ///////

video.addEventListener('canplay', ()=> {
  video.play().catch(() => {});
  charTitel.forEach((char , index)=>{
    setTimeout(() =>{
      tittel.textContent += char;
    }, index * 350);
  });
});



// show description function as typeWriter

function typeWriter(){

  if(lineIndex < lines.length){
    if(charIndex < lines[lineIndex].length){

      // use textNode instead .innerHTML , .textContent because of performance on closeBtn
      desc.appendChild(document.createTextNode(lines[lineIndex].charAt(charIndex)));
      charIndex++;
      setTimeout(typeWriter, 50);
    }else{
      desc.appendChild(document.createElement("br"));
      lineIndex++;
      charIndex = 0;
      setTimeout(typeWriter, 500);
    }
  }
  
};


// show descriptionBox after 8.5s

window.onload = () =>{
  setTimeout(() =>{
  overlay.style.display = "block";
  desc.style.display = "block";
  setTimeout(typeWriter, 500);
}, 6800);
}  

closeBtn.addEventListener("click", () =>{
  desc.style.display = "none";
  overlay.style.display = "none";
});

overlay.addEventListener("click", () =>{
  desc.style.display = "none";
  overlay.style.display = "none";
});
 


 //Get information from github

 function loadUsers(){
   var xhr = new XMLHttpRequest();
   xhr.open("GET",'https://api.github.com/users', true);
   xhr.onload = function(){
     if(this.status == 200){
       users = JSON.parse(this.responseText);
       localStorage.setItem("githubUsers",JSON.stringify(users));
       console.log("Users fetched and saved to localStorage");
       
     }else{
       console.error("Error fetching users:", xhr.statusText)
     }
   };
   xhr.send();
 };

// Check localStorage for cached users or fetch new ones

  function loadUsersIfNeeded() {
    let cached = localStorage.getItem("githubUsers");
    if (cached) {
      console.log("Using cached users from localStorage");
      return JSON.parse(cached);
    } else {
      console.log("Fetching users from GitHub API...");
      loadUsers();
      return []; // فعلاً خالی تا بعد از fetch
    }
  }
// Create user cards and append to slider

getUsers.forEach(user =>{
  const card = document.createElement("div");
  card.className = "gallery swiper-slide";
  card.innerHTML= 
  `<img class="profilePic" src="${user.avatar_url}" alt="${user.login}">
          <div class="description">
              <h3 class="name">${user.login}</h3>
              <button class="goGithub">Go to Profile</button>
          </div>`;
  card.querySelector(".goGithub").addEventListener('click', () =>{
    window.open(user.html_url, "_blank");
  });
  slider.appendChild(card);
});
  swiper.update();

