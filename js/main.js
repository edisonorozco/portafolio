const btnSendEmail = document.querySelector("#send-button");
const formContact = document.querySelector("#form-contact-now");
const urlEmail =
  "https://back-portafolio-web.herokuapp.com/api/email/contact-me-now";
const urlComments = "http://localhost:9999/api/comments/list";
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
window.addEventListener("load", () => initLoadWindow());
overlay.addEventListener("click", (event) => overlayClick(event));
btnCloseImage.addEventListener("click", () => btnCloseImageClick());
btnClose.addEventListener("click", () => closeWindowConfirmSendEmail());
btnSendEmail.addEventListener("click", (event) => btnSendEmailClick(event));
txtSubject.addEventListener("keyup", (event) => pressHandlerInputs(event));
txtMessage.addEventListener("keyup", (event) => pressHandlerInputs(event));
txtNameClient.addEventListener("keyup", (event) => pressHandlerInputs(event));
txtEmailClient.addEventListener("keyup", (event) => pressHandlerInputs(event));

function initLoadWindow() {
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
  //getAllComments();
  let emailDto = getEmailDTOFromFrom();

  if (emailDto != null) {
    showLoading();
    sendEmail(emailDto);
  }
}

function sendEmail(emailDto) {
  const settings = {
    method: "POST",
    timeout: 6000,
    body: JSON.stringify(emailDto),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(urlEmail, settings)
    .then((response) => response.json())
    .then(() => {
      hideLoading();
    })
    .catch((err) => {
      hideLoading();
      console.log(err);
    });
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

  return new EmailDTO(nameClient, emailClient, subject, message);
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

function getAllComments() {
  const settings = {
    method: "GET",
    timeout: 6000,
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(urlComments, settings)
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => console.log(error));
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
