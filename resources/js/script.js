
let height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;
//document.querySelector('header').style.minHeight = height;


// SLIDESHOW
let slide = document.getElementsByClassName("carousel-cell");
let slideHeight = slide[0].offsetHeight;
slide[1].style.height = slideHeight + "px";

// REVIEW ANIMATION

const targets = document.querySelectorAll(".reviews");

const lazyLoad = (target) => {
  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const review = entry.target;

          review.classList.add("animate__fadeInRightBig");
          review.style.opacity = "1";
          observer.disconnect();
        }
      });
    },
    { threshold: [0.3] }
  );

  io.observe(target);
};
targets.forEach(lazyLoad);

// SHOP ANIMATION
const shop = document.querySelectorAll(".shop");
const buyNow = document.querySelectorAll(".buy-now");

const attention = (target) => {
  const object = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          buyNow[0].classList.add("animate__rubberBand");
          observer.disconnect();
        }
      });
    },
    { threshold: [1] }
  );

  object.observe(target);
};
shop.forEach(attention);

// CONTACT FORM

const form = document.querySelector(".contact-form"),
  statusTxt = form.querySelector(".contact-submit span"),
  statusBtn = form.querySelector(".contact-submit input"),
  contactName = form.querySelector("#contact-name"),
  contactEmail = form.querySelector("#contact-email"),
  contactMessage = form.querySelector("#contact-message");


const clearError = function(field, i) {
  form.querySelectorAll(".contact-field span")[i].classList.remove("error-text");
  form.querySelectorAll(".contact-field span")[i].innerText = "";
  field.style.borderColor = "#000";
}

const isEmpty = function(str) {
  return !str.trim().length;
}

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};


form.onsubmit = (e) => {

  if (isEmpty(contactName.value) ) {
    contactName.style.borderColor = "#cc0000";
    form.querySelectorAll(".contact-field span")[0].classList.add("error-text");
    form.querySelectorAll(".contact-field span")[0].innerText = "Name is required"
  } else{
    clearError(contactName, 0);
  };
  
  if (isEmpty(contactEmail.value)) {
    contactEmail.style.borderColor = "#cc0000";
    form.querySelectorAll(".contact-field span")[1].classList.add("error-text");
    form.querySelectorAll(".contact-field span")[1].innerText = "Email is required";
  } else if(!validateEmail(contactEmail.value)){
    contactEmail.style.borderColor = "#cc0000";
    form.querySelectorAll(".contact-field span")[1].classList.add("error-text");
    form.querySelectorAll(".contact-field span")[1].innerText = "Enter a valid email";
  } else{
    clearError(contactEmail, 1);
    statusBtn.value = "Sending..."
    statusBtn.classList.add("disabled")
  };


  e.preventDefault();
  form.classList.add("disabled");
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "resources/php/contact.php", true);
  xhr.onload = () => {
    let responseText = xhr.responseText;

    if (xhr.readyState == 4 && xhr.status == 200) {

      if (responseText == "Sent") {
        statusBtn.value = "Sent"
        statusBtn.style.backgroundColor = "#000";

      } else if (!(responseText == "Email field required" || responseText == "Enter a valid email address!")){
        //statusTxt.style.display = "block"
        statusTxt.innerText = "Your message failed to send, Please try again later"

        setTimeout(() => {
          //statusTxt.style.display = "none";
          statusTxt.innerText = ""
        }, 5000);

        statusBtn.value = "Send"
        statusBtn.classList.remove("disabled")
        statusBtn.style.backgroundColor = "#095e48";
      } 
      form.reset();    
      form.classList.remove("disabled");
    } 
    console.log(xhr.response);
  };
  
  let formData = new FormData(form);
  xhr.send(formData);
  xhr.res;
};


// NEWSLETTER
const newsForm = document.querySelector(".news-form"),
  newsEmail = document.querySelector("#news-email"),
  signUp = document.querySelector(".news-btn input"),
  newsStatus = document.querySelector(".news-error");


newsForm.onsubmit = (e) => {

  const clearError = function(){
    setTimeout(() => {
      newsStatus.innerText = ""
    }, 5000);
  
    signUp.value = "Sign Up"
    signUp.classList.remove("disabled")
    signUp.style.backgroundColor = "#f39c12";
    signUp.style.color = "#000"
  }

  if (isEmpty(newsEmail.value)) {
    newsStatus.innerText = "Email is required";
  } else if(!validateEmail(newsEmail.value)){
    newsStatus.innerText = "Enter a valid email";
  } else{
    newsStatus.innerText = "";
    newsEmail.style.border = "none";
    
    signUp.value = "Sending..."
    signUp.classList.add("disabled")
  };

  e.preventDefault();
  newsForm.classList.add("disabled");
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "resources/php/news.php", true);
  xhr.onload = () => {
    let responseText = xhr.responseText;

    if (xhr.readyState == 4 && xhr.status == 200) {

      if (responseText == "Saved") {
        signUp.value = "Done"
        signUp.style.backgroundColor = "#000";
        signUp.style.color = "#fff"
        newsForm.reset();
        setTimeout(() => {
          document.querySelector('.news-inner').classList.add('flip')
        }, 1500);
        

      } else if (responseText == "Email already exists") {
        newsStatus.innerText = "This email address has already been subscribed"
        clearError()
       }
      
      else if (!(responseText == "Email field required" || responseText == "Enter a valid email address!")){
        newsStatus.innerText = "Something went wrong, please try again later"
        clearError()
        newsForm.reset();
      }      
      newsForm.classList.remove("disabled");
    } 
    console.log(xhr.response);
  };
  
  let formData = new FormData(newsForm);
  xhr.send(formData);
  xhr.res;
};

const menuButton = document.querySelector('#menu-button');
const crossButton = document.querySelector('.times');
const sideMenu = document.querySelector('#menu');
const content = document.querySelector('.content');
const darkness = document.querySelector('#darkness');

menuButton.addEventListener('click', () => {
  sideMenu.classList.toggle('open');
  menuButton.style.display = 'none';
  crossButton.style.display = 'block';
  darkness.style.display = 'block';
  document.body.style.overflow = 'hidden';
  // content.style.opacity = 0.5;
});

crossButton.addEventListener('click', () => {
  sideMenu.classList.toggle('open');
  menuButton.style.display = 'block';
  crossButton.style.display = 'none';
  darkness.style.display = 'none';
  document.body.style.overflow = 'auto';
  // content.style.opacity = 1;
});

// menuButton.hover(function(){
//   $('#darkness').fadeTo(200, 1);
// }, function(){
//   $('#darkness').fadeTo(200, 0, function(){
//       $(this).hide();
//   });
// });
