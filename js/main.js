/*const btnSendEmail = document.querySelector("#send-button");
const formContact = document.querySelector("#form-contact-now");
const urlEmail =
  "https://back-portafolio-web.herokuapp.com/api/email/contact-me-now";
const urlComments = "http://localhost:9999/api/comments/list";
const headerRequest = () => {
  return {
    "Content-Type": "application/json",
  };
};
const txtNameClient = document.getElementById("txtName");
const txtEmailClient = document.getElementById("txtEmail");
const txtSubject = document.getElementById("subject");
const txtMessage = document.getElementById("message");
const divDendingEmailAnimation = document.getElementById(
  "sending-email-animation"
);
const gitDiv = document.getElementById("git");
const overlay = document.getElementById("overlay");
const desingDiv = document.getElementById("desing");
const laguajesDiv = document.getElementById("laguajes");
const btnClose = document.getElementById("close-button");
const divMessageSendSuccess = document.getElementById("message-send-success");
const btnCloseImage = document.querySelector("#btn-close-image");

//Events
window.addEventListener("load", () => loadWindow());
overlay.addEventListener("click", (event) => overlayClick(event));
btnCloseImage.addEventListener("click", () => btnCloseImageClick());
btnClose.addEventListener("click", () => closeWindowConfirmSendEmail());
btnSendEmail.addEventListener("click", (event) => btnSendEmailClick(event));
txtSubject.addEventListener("keyup", (event) => pressHandlerInputs(event));
txtMessage.addEventListener("keyup", (event) => pressHandlerInputs(event));
txtNameClient.addEventListener("keyup", (event) => pressHandlerInputs(event));
txtEmailClient.addEventListener("keyup", (event) => pressHandlerInputs(event));

function loadWindow() {
  document
    .querySelectorAll(
      ".main .portafolio .container .container-text-portafolio .container-portafolio .item img"
    )
    .forEach((element) => {
      element.addEventListener("click", () => {
        const path = element.getAttribute("src");
        const category = element.parentNode.dataset.category;
        overlay.classList.add("active");
        document.querySelector("#overlay img").src = path;

        gitDiv.classList.remove("active-item");
        desingDiv.classList.remove("active-item");
        laguajesDiv.classList.remove("active-item");

        if (category == "languajes") {
          laguajesDiv.classList.add("active-item");
        }

        if (category == "git") {
          gitDiv.classList.add("active-item");
        }

        if (category == "desing") {
          desingDiv.classList.add("active-item");
        }
      });
    });
}

function btnCloseImageClick() {
  overlay.classList.remove("active");
}

function overlayClick(event) {
  event.target.id === "overlay" ? overlay.classList.remove("active") : "";
}

function btnSendEmailClick(event) {
  event.preventDefault();
  let emailDto = getEmailDTOFromFrom();

  if (emailDto != null) {
    showLoading();
    sendEmail(emailDto);
  }
}

async function sendEmail(emailDto) {
  const authRequest = new RequestAPI(
    "https://back-portafolio-web.herokuapp.com/api",
    { headers: headerRequest },
    intercept
  );

  const [error, response] = await authRequest.post(
    "/email/contact-me-now",
    emailDto
  );

  if (error) {
    hideLoading();
    console.log("Error list comments");
  } else if (response) {
    hideLoading();
    console.log(response);
  }
}

function getEmailDTOFromFrom() {
  const nameClient = txtNameClient.value.trim();
  const emailClient = txtEmailClient.value.trim();
  const subject = txtSubject.value.trim();
  const message = txtMessage.value.trim();

  if (nameClient === "") {
    setErrorFrom(
      document.getElementById("txtName"),
      "Por favor ingrese un nombre !"
    );
    return null;
  } else {
    setSuccessFrom(document.getElementById("txtName"));
  }

  if (emailClient === "") {
    setErrorFrom(
      document.getElementById("txtEmail"),
      "Por favor ingrese un email !"
    );
    return null;
  } else if (!isEmil(emailClient)) {
    setErrorFrom(
      document.getElementById("txtEmail"),
      "Por favor ingrese un email valido!"
    );
    return null;
  } else {
    setSuccessFrom(document.getElementById("txtEmail"));
  }

  if (subject === "") {
    setErrorFrom(
      document.getElementById("subject"),
      "Por favor ingrese un asunto !"
    );
    return null;
  } else {
    setSuccessFrom(document.getElementById("subject"));
  }

  if (message === "") {
    setErrorFrom(
      document.getElementById("message"),
      "Por favor ingrese un mensaje !"
    );
    return null;
  } else {
    setSuccessFrom(document.getElementById("message"));
  }

  return new EmailModel(nameClient, emailClient, subject, message);
}

function setErrorFrom(input, message) {
  const formControl = input.parentNode;
  const small = formControl.querySelector("small");
  small.innerHTML = message;
  formControl.className = "form-control error";
}

function setSuccessFrom(input) {
  const formControl = input.parentNode;
  formControl.className = "form-control success";
}

function isEmil(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

async function getAllComments() {
  const authRequest = new RequestAPI(
    "http://localhost:9999/api",
    { headers: headerRequest },
    intercept
  );

  const [error, response] = await authRequest.get("/comments/list");

  if (error) console.log("Error list comments");
  else console.log(response);
}

function pressHandlerInputs(event) {
  //Name
  if (event.target.id == txtNameClient.id) {
    const nameClient = txtNameClient.value.trim();

    if (nameClient === "") {
      setErrorFrom(
        document.getElementById("txtName"),
        "Por favor ingrese un nombre !"
      );
    } else {
      setSuccessFrom(document.getElementById("txtName"));
    }
  }

  //Email
  if (event.target.id == txtEmailClient.id) {
    const emailClient = txtEmailClient.value.trim();

    if (emailClient === "") {
      setErrorFrom(
        document.getElementById("txtEmail"),
        "Por favor ingrese un email !"
      );
    } else if (!isEmil(emailClient)) {
      setErrorFrom(
        document.getElementById("txtEmail"),
        "Por favor ingrese un email valido!"
      );
    } else {
      setSuccessFrom(document.getElementById("txtEmail"));
    }
  }

  //Subject
  if (event.target.id == txtSubject.id) {
    const subject = txtSubject.value.trim();

    if (subject === "") {
      setErrorFrom(
        document.getElementById("subject"),
        "Por favor ingrese un asunto !"
      );
    } else {
      setSuccessFrom(document.getElementById("subject"));
    }
  }

  //Message
  if (event.target.id == txtMessage.id) {
    const message = txtMessage.value.trim();

    if (message === "") {
      setErrorFrom(
        document.getElementById("message"),
        "Por favor ingrese un mensaje !"
      );
    } else {
      setSuccessFrom(document.getElementById("message"));
    }
  }
}

function showLoading() {
  divDendingEmailAnimation.classList.add("sending-email-animation--active");
}

function hideLoading() {
  divDendingEmailAnimation.classList.remove("sending-email-animation--active");
  divMessageSendSuccess.classList.add("message-send-success--active");
  txtEmailClient.value = "";
  txtNameClient.value = "";
  txtMessage.value = "";
  txtSubject.value = "";

  txtEmailClient.parentNode.className = "form-control";
  txtNameClient.parentNode.className = "form-control";
  txtMessage.parentNode.className = "form-control";
  txtSubject.parentNode.className = "form-control";
}

function closeWindowConfirmSendEmail() {
  divMessageSendSuccess.classList.remove("message-send-success--active");
}

const intercept = async (request) => {
  const { status } = request;

  switch (true) {
    case status === 419:
      throw new Error((await request.json()).message);
    case status === 400:
      throw new Error((await request.json()).message);
    case status === 401:
      throw new Error((await request.json()).message);
    case status === 404:
      throw new Error((await request.json()).message || "Not foud");
    case status === 500:
      throw new Error("Somenthing went wrong");
    case status === 204:
      return { status: "OK" };
    default:
      return request.json();
  }
};*/

/*============== MENU SHOW AND HIDDE ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToogle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*============== MENU SHOW ===============*/

if (navToogle) {
  navToogle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

/*================ ACCORDION SKILLS =====================*/
const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }

  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/*================= QUALIFICATION TABS =====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });

    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });

    tab.classList.add("qualification__active");
  });
});

/*========================== SERVICES MODAL ================================*/

const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*==================== PORTFOLIO ====================*/
let swiperPortafolio = new Swiper(".portafolio__container", {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper(".testimonial__container", {
  loop: true,
  grabCursor: true,
  spaceBetween: 48,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      const value = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

      if (null != value) {
        value.classList.add("active-link");
      }
    } else {
      const value = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

      if (null != value) {
        value.classList.remove("active-link");
      }
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL TOP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
